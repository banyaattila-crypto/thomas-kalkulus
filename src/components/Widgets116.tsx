import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 4) => v.toFixed(d).replace('.', ',').replace('-0,0000', '0,0000');

/* -------------------------------------------------------------------------- */
/* 1. AlternatingZigZagWidget: alternáló harmonikus sor sₙ cikkcakkja         */
/* -------------------------------------------------------------------------- */
export function AlternatingZigZagWidget() {
  const [n, setN] = useState(12);
  const sums: number[] = [];
  let acc = 0;
  for (let k = 1; k <= n; k++) {
    acc += (k % 2 === 1 ? 1 : -1) / k;
    sums.push(acc);
  }
  const ln2 = Math.LN2;

  const W = 540;
  const H = 225;
  const ox = 46;
  const xEnd = W - 20;
  const yTop = 20;
  const yBot = H - 28;
  const X = (i: number) => ox + (i / Math.max(1, n - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((v - 0.4) / 0.68) * (yBot - yTop);

  const path = sums.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Alternáló harmonikus sor: 1 − ½ + ⅓ − ¼ + … = ln 2 ≈ 0,6931</div>
      <div className="sliders">
        <label>
          tagok száma n = {n} → s_{n} = {fmt(sums[n - 1], 4)}
          <input type="range" min={3} max={18} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />

        <line x1={ox} y1={Y(ln2)} x2={xEnd} y2={Y(ln2)} stroke="#34d399" strokeWidth={1.8} strokeDasharray="5 4" />
        <text x={xEnd} y={Y(ln2) - 6} textAnchor="end" className="pl-label" fill="#34d399">
          ln 2 ≈ 0,6931
        </text>

        <path d={path} stroke="rgba(148,163,184,0.5)" strokeWidth={1.6} fill="none" />
        {sums.map((v, i) => (
          <circle key={i} cx={X(i)} cy={Y(v)} r={4.5} fill={i % 2 === 0 ? '#38bdf8' : '#fb923c'} />
        ))}
      </svg>
      <div className="explain">
        <p>
          A páratlan részletösszegek (cián: <M t="s_1 > s_3 > s_5 > \cdots" />) felülről, a párosak (narancs:{' '}
          <M t="s_2 < s_4 < s_6 < \cdots" />) alulról szorítják közre az <M t="S = \ln 2" /> összeget!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. LeibnizErrorBoundWidget: |S - sₙ| ≤ uₙ₊₁ hibabecslés                    */
/* -------------------------------------------------------------------------- */
export function LeibnizErrorBoundWidget() {
  const [kind, setKind] = useState<'h' | 'c'>('c');
  const [n, setN] = useState(5);

  const exact = kind === 'h' ? Math.LN2 : 0.9015426773696957; // η(3) = 3/4 ζ(3)
  let sn = 0;
  for (let k = 1; k <= n; k++) {
    sn += (k % 2 === 1 ? 1 : -1) / (kind === 'h' ? k : k * k * k);
  }
  const bound = 1 / (kind === 'h' ? n + 1 : Math.pow(n + 1, 3));
  const actualErr = Math.abs(exact - sn);
  const nextSign = (n + 1) % 2 === 1 ? 1 : -1;
  const bLow = Math.min(sn, sn + nextSign * bound);
  const bHigh = Math.max(sn, sn + nextSign * bound);

  const pad = Math.max(0.02, bound * 0.45);
  const lo = bLow - pad;
  const hi = bHigh + pad;
  const X = (v: number) => 40 + ((v - lo) / (hi - lo)) * 460;

  return (
    <div className="widget">
      <div className="widget-title">Leibniz-féle hibabecslés: |S − sₙ| ≤ uₙ₊₁</div>
      <div className="relbuttons chips">
        <button className={kind === 'c' ? 'on' : ''} onClick={() => setKind('c')}>
          ∑ (−1)ⁿ⁺¹ / n³ (gyors!)
        </button>
        <button className={kind === 'h' ? 'on' : ''} onClick={() => setKind('h')}>
          ∑ (−1)ⁿ⁺¹ / n (lassú)
        </button>
      </div>
      <div className="sliders">
        <label>
          n = {n} → s_{n} = {fmt(sn, 5)}
          <input type="range" min={1} max={10} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox="0 0 540 120">
        <rect width={540} height={120} className="pl-bg" />
        <line x1={30} y1={62} x2={510} y2={62} className="pl-axis" />
        <rect x={X(bLow)} y={46} width={Math.max(4, X(bHigh) - X(bLow))} height={32} rx={6} fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeWidth={2} />
        <circle cx={X(sn)} cy={62} r={5} fill="#fb923c" />
        <text x={X(sn)} y={98} textAnchor="middle" className="pl-tick" fill="#fb923c">
          sₙ
        </text>
        <line x1={X(exact)} y1={28} x2={X(exact)} y2={92} stroke="#34d399" strokeWidth={2.2} />
        <text x={X(exact)} y={22} textAnchor="middle" className="pl-label" fill="#34d399">
          S ≈ {fmt(exact, 5)}
        </text>
      </svg>
      <div className="explain">
        <p>
          Valódi hiba: <M t={`|S - s_${n}| \\approx ${fmt(actualErr, 5)}`} />, Leibniz-korlát:{' '}
          <M t={`u_{${n + 1}} = ${fmt(bound, 5)}`} /> (mindig teljesül, hogy <M t="|S - s_n| \le u_{n+1}" />!).
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. AlternatingPSeriesWidget: ∑ (-1)^(n+1)/n^p három zónája                 */
/* -------------------------------------------------------------------------- */
export function AlternatingPSeriesWidget() {
  const [p, setP] = useState(0.7);
  const status =
    p <= 0.001
      ? { txt: 'DIVERGENS (uₙ nem tart 0-hoz)', col: '#f87171' }
      : p <= 1.001
        ? { txt: 'FELTÉTELESEN KONVERGENS (∑ aₙ konv., ∑ |aₙ| div.)', col: '#fbbf24' }
        : { txt: 'ABSZOLÚT KONVERGENS (∑ |aₙ| is konv.)', col: '#34d399' };

  const X = (v: number) => 40 + ((v + 0.5) / 2.7) * 460;

  return (
    <div className="widget">
      <div className="widget-title">Alternáló p-sorok: ∑ (−1)ⁿ⁺¹ / nᵖ osztályozása</div>
      <div className="sliders">
        <label>
          kitevő p = {fmt(p, 2)}
          <input type="range" min={-0.4} max={2.1} step={0.1} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox="0 0 540 115">
        <rect width={540} height={115} className="pl-bg" />
        <rect x={X(-0.5)} y={42} width={X(0) - X(-0.5)} height={26} fill="rgba(248,113,113,0.25)" />
        <rect x={X(0)} y={42} width={X(1) - X(0)} height={26} fill="rgba(251,191,36,0.25)" />
        <rect x={X(1)} y={42} width={X(2.2) - X(1)} height={26} fill="rgba(52,211,153,0.25)" />
        <line x1={30} y1={55} x2={510} y2={55} className="pl-axis" />

        <text x={X(0)} y={86} textAnchor="middle" className="pl-tick">
          0
        </text>
        <text x={X(1)} y={86} textAnchor="middle" className="pl-tick">
          1
        </text>
        <circle cx={X(p)} cy={55} r={6.5} fill={status.col} stroke="#0b0e24" strokeWidth={1.5} />
        <text x={270} y={24} textAnchor="middle" className="pl-label" fill={status.col}>
          {status.txt}
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. AbsoluteConvergenceWidget: ∑ sin(n) / n² abszolút konvergenciája        */
/* -------------------------------------------------------------------------- */
export function AbsoluteConvergenceWidget() {
  const N = 20;
  const sums: number[] = [];
  let acc = 0;
  for (let k = 1; k <= N; k++) {
    acc += Math.sin(k) / (k * k);
    sums.push(acc);
  }

  const W = 540;
  const H = 195;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 24;
  const yBot = H - 26;
  const X = (i: number) => ox + (i / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((v - 0.7) / 0.5) * (yBot - yTop);

  const path = sums.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Nem alternáló, mégis konvergens: ∑ sin(n) / n² (mert |sin n|/n² ≤ 1/n²)</div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 6} x2={ox} y2={yBot} className="pl-axis" />
        <path d={path} stroke="#38bdf8" strokeWidth={2.2} fill="none" />
        {sums.map((v, i) => (
          <circle key={i} cx={X(i)} cy={Y(v)} r={3.6} fill="#34d399" />
        ))}
        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill="#34d399">
          s₂₀ ≈ {fmt(sums[N - 1], 4)} (stabilizálódik!)
        </text>
      </svg>
      <div className="explain">
        <p>
          A <M t="\sin n" /> előjelei szabálytalanul változnak, így a Leibniz-tétel <em>nem</em> használható rá — de{' '}
          <M t="\sum \tfrac{|\sin n|}{n^2} \le \sum \tfrac{1}{n^2} < \infty" />, ezért a 16. tétel szerint{' '}
          <strong>abszolút konvergens</strong>, tehát konvergens!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. RiemannRearrangementWidget: ugyanazok a tagok → 3 különböző összeg!     */
/* -------------------------------------------------------------------------- */
export function RiemannRearrangementWidget() {
  const [order, setOrder] = useState<'orig' | 'half' | 'threeHalf'>('half');
  const N = 24;
  const sums: number[] = [];
  let acc = 0;

  if (order === 'orig') {
    for (let k = 1; k <= N; k++) {
      acc += (k % 2 === 1 ? 1 : -1) / k;
      sums.push(acc);
    }
  } else if (order === 'half') {
    // (1 - 1/2 - 1/4) + (1/3 - 1/6 - 1/8) + ...
    let p = 1;
    let q = 2;
    for (let i = 0; i < N; i++) {
      if (i % 3 === 0) {
        acc += 1 / p;
        p += 2;
      } else {
        acc -= 1 / q;
        q += 2;
      }
      sums.push(acc);
    }
  } else {
    // (1 + 1/3 - 1/2) + (1/5 + 1/7 - 1/4) + ...
    let p = 1;
    let q = 2;
    for (let i = 0; i < N; i++) {
      if (i % 3 === 2) {
        acc -= 1 / q;
        q += 2;
      } else {
        acc += 1 / p;
        p += 2;
      }
      sums.push(acc);
    }
  }

  const target = order === 'orig' ? Math.LN2 : order === 'half' ? 0.5 * Math.LN2 : 1.5 * Math.LN2;
  const W = 540;
  const H = 215;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 22;
  const yBot = H - 26;
  const X = (i: number) => ox + (i / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((v - 0.15) / 1.25) * (yBot - yTop);
  const path = sums.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Riemann-paradoxon: ugyanazon tagok átrendezése 3 különböző összeghez!</div>
      <div className="relbuttons chips">
        <button className={order === 'orig' ? 'on' : ''} onClick={() => setOrder('orig')}>
          1 − ½ + ⅓ − ¼ … (ln 2 ≈ 0,693)
        </button>
        <button className={order === 'half' ? 'on' : ''} onClick={() => setOrder('half')}>
          1 − ½ − ¼ + ⅓ − ⅙ − ⅛ … (½ ln 2 ≈ 0,347)
        </button>
        <button className={order === 'threeHalf' ? 'on' : ''} onClick={() => setOrder('threeHalf')}>
          1 + ⅓ − ½ + ⅕ + ⅐ − ¼ … (3/2 ln 2 ≈ 1,040)
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={Y(target)} x2={xEnd} y2={Y(target)} className="pl-dash" />
        <text x={xEnd} y={Y(target) - 6} textAnchor="end" className="pl-label" fill="#fbbf24">
          Összeg ≈ {fmt(target, 3)}
        </text>
        <path d={path} stroke="#38bdf8" strokeWidth={2} fill="none" />
        {sums.map((v, i) => (
          <circle key={i} cx={X(i)} cy={Y(v)} r={3.4} fill="#38bdf8" />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. MonotoneConditionCounterexampleWidget: miért kell a csökkenés?          */
/* -------------------------------------------------------------------------- */
export function MonotoneConditionCounterexampleWidget() {
  const N = 16;
  const sums: number[] = [];
  let acc = 0;
  for (let i = 0; i < N; i++) {
    const k = Math.floor(i / 2) + 1;
    acc += i % 2 === 0 ? 1 / (k + 1) : -1 / Math.pow(2, k);
    sums.push(acc);
  }
  const W = 540;
  const H = 180;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 24;
  const yBot = H - 24;
  const X = (i: number) => ox + (i / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / 1.5) * (yBot - yTop);
  const path = sums.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Ellenpélda: ½ − ½ + ⅓ − ¼ + ¼ − ⅛ + … (alternál és uₙ → 0, mégis +∞!)</div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 6} x2={ox} y2={yBot} className="pl-axis" />
        <path d={path} stroke="#f87171" strokeWidth={2.2} fill="none" />
        {sums.map((v, i) => (
          <circle key={i} cx={X(i)} cy={Y(v)} r={3.6} fill="#f87171" />
        ))}
      </svg>
      <div className="explain">
        <p>
          A pozitív tagok (<M t="\tfrac{1}{k+1}" />) harmonikus sort alkotnak (<M t="\infty" />), a negatívak (
          <M t="-\tfrac{1}{2^k}" />) csak <M t="-1" />-et vonnak le — mert a tagok <em>nem</em> csökkennek monoton!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. ExtendedRatioRootDiagram: abszolút hányados- és gyökkritérium           */
/* -------------------------------------------------------------------------- */
export function ExtendedRatioRootDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Kiterjesztett (abszolút) hányados- és gyökkritérium tetszőleges előjelre</div>
      <svg className="plane" viewBox="0 0 540 110">
        <rect width={540} height={110} className="pl-bg" />
        <rect x={18} y={18} width={244} height={74} rx={11} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={140} y={44} textAnchor="middle" className="pl-label" fill="#38bdf8">
          lim |aₙ₊₁ / aₙ| &lt; 1
        </text>
        <text x={140} y={70} textAnchor="middle" className="pl-tick">
          ⇒ ABSZOLÚT KONVERGENS
        </text>

        <rect x={278} y={18} width={244} height={74} rx={11} fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth={1.5} />
        <text x={400} y={44} textAnchor="middle" className="pl-label" fill="#34d399">
          lim ⁿ√|aₙ| &lt; 1
        </text>
        <text x={400} y={70} textAnchor="middle" className="pl-tick">
          ⇒ ABSZOLÚT KONVERGENS
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. AllSeriesTestsMasterDiagram: nagy 6-lépéses konvergencia-térkép         */
/* -------------------------------------------------------------------------- */
export function AllSeriesTestsMasterDiagram() {
  const boxes = [
    { x: 14, y: 14, t: '1. n-edik tag', s: 'lim aₙ ≠ 0 ⇒ DIV.', c: '#f87171' },
    { x: 190, y: 14, t: '2. Mértani / p-sor', s: '|r|<1 ill. p>1', c: '#38bdf8' },
    { x: 366, y: 14, t: '3. Összehasonlítás', s: 'főtag bₙ (polinom)', c: '#34d399' },
    { x: 14, y: 84, t: '4. Hányados / Gyök', s: 'n!, cⁿ, (…)ⁿ → |ρ|<1', c: '#fbbf24' },
    { x: 190, y: 84, t: '5. Integrálkritérium', s: 'ln n, e^(−n²)', c: '#2dd4bf' },
    { x: 366, y: 84, t: '6. Leibniz-tétel', s: '(−1)ⁿ uₙ ↓ 0', c: '#fb923c' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">Nagy konvergencia-térkép: mind a 6 fő eszköz egy képen (11.2–11.6)</div>
      <svg className="plane" viewBox="0 0 540 156">
        <rect width={540} height={156} className="pl-bg" />
        {boxes.map((b) => (
          <g key={b.t}>
            <rect x={b.x} y={b.y} width={160} height={58} rx={10} fill="rgba(255,255,255,0.04)" stroke={b.c} strokeWidth={1.5} />
            <text x={b.x + 80} y={b.y + 24} textAnchor="middle" className="pl-label" fill={b.c}>
              {b.t}
            </text>
            <text x={b.x + 80} y={b.y + 44} textAnchor="middle" className="pl-tick">
              {b.s}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
