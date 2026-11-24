import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 3) => v.toFixed(d).replace('.', ',').replace('-0,000', '0,000');

/* -------------------------------------------------------------------------- */
/* 1. UnitSquareSeriesDiagram: 1/2 + 1/4 + 1/8 + ... = 1 egységnégyzetben     */
/* -------------------------------------------------------------------------- */
export function UnitSquareSeriesDiagram() {
  const [n, setN] = useState(5);
  const cols = ['#38bdf8', '#34d399', '#fbbf24', '#fb923c', '#2dd4bf', '#60a5fa', '#a3e635', '#f59e0b'];

  // Rekurzív felezés egy 200x200 négyzetben
  let x = 36;
  let y = 18;
  let w = 200;
  let h = 200;
  const rects: { x: number; y: number; w: number; h: number; col: string; lbl: string }[] = [];
  for (let k = 1; k <= n; k++) {
    if (k % 2 === 1) {
      const hw = w / 2;
      rects.push({ x, y, w: hw, h, col: cols[(k - 1) % cols.length], lbl: `1/${1 << k}` });
      x += hw;
      w -= hw;
    } else {
      const hh = h / 2;
      rects.push({ x, y, w, h: hh, col: cols[(k - 1) % cols.length], lbl: `1/${1 << k}` });
      y += hh;
      h -= hh;
    }
  }
  const sum = 1 - 1 / Math.pow(2, n);

  return (
    <div className="widget">
      <div className="widget-title">Geometriai bizonyítás: ½ + ¼ + ⅛ + … = 1</div>
      <div className="sliders">
        <label>
          tagok száma n = {n} → s_{n} = 1 − 1/{1 << n} = {fmt(sum, 4)}
          <input type="range" min={1} max={8} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox="0 0 540 236">
        <rect width={540} height={236} className="pl-bg" />
        {/* Egységnégyzet kerete */}
        <rect x={36} y={18} width={200} height={200} fill="rgba(255,255,255,0.03)" stroke="#cbd5e1" strokeWidth={1.5} />
        {rects.map((r, i) => (
          <g key={i}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={r.col} fillOpacity={0.32} stroke={r.col} strokeWidth={1.6} />
            {r.w >= 26 && r.h >= 22 && (
              <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 4} textAnchor="middle" className="pl-label" fill="#e8ecf8">
                {r.lbl}
              </text>
            )}
          </g>
        ))}

        {/* Jobb oldali összefoglaló */}
        <text x={270} y={66} className="pl-label" fill="#38bdf8">
          Besatírozott terület (sₙ):
        </text>
        <text x={270} y={92} className="pl-label" fill="#34d399">
          {(1 << n) - 1} / {1 << n} ≈ {fmt(sum, 4)}
        </text>
        <text x={270} y={136} className="pl-label" fill="#fb923c">
          Maradék fehér sarok:
        </text>
        <text x={270} y={162} className="pl-tick">
          1 / {1 << n} ≈ {fmt(1 / Math.pow(2, n), 4)} → 0
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. PartialSumsVisualizerWidget: tagok (aₖ) és részletösszegek (sₙ) együtt  */
/* -------------------------------------------------------------------------- */
const PS_SERIES = [
  { name: '∑ 1 / 2ⁿ (konv., S = 1)', fn: (k: number) => Math.pow(0.5, k), S: 1 as number | null, yMax: 1.3 },
  { name: '∑ (−1)ⁿ⁻¹ (oszcillál)', fn: (k: number) => (k % 2 === 1 ? 1 : -1), S: null as number | null, yMax: 1.4 },
  { name: '∑ 1 / n (harmonikus, → ∞)', fn: (k: number) => 1 / k, S: null as number | null, yMax: 3.6 },
];

export function PartialSumsVisualizerWidget() {
  const [idx, setIdx] = useState(0);
  const [n, setN] = useState(12);
  const item = PS_SERIES[idx];

  const terms: number[] = [];
  const sums: number[] = [];
  let acc = 0;
  for (let k = 1; k <= n; k++) {
    const a = item.fn(k);
    acc += a;
    terms.push(a);
    sums.push(acc);
  }

  const W = 540;
  const H = 240;
  const ox = 46;
  const xEnd = W - 22;
  const yTop = 22;
  const yBot = H - 30;
  const yMin = idx === 1 ? -1.2 : 0;
  const X = (k: number) => ox + ((k - 1) / Math.max(1, n - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((v - yMin) / (item.yMax - yMin)) * (yBot - yTop);

  const linePath = sums.map((s, i) => `${i ? 'L' : 'M'}${X(i + 1).toFixed(1)},${Y(s).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Tagok (aₖ, narancs) és részletösszegek (sₙ, cián) különbsége</div>
      <div className="relbuttons chips">
        {PS_SERIES.map((p, i) => (
          <button key={p.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {p.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          tagok száma n = {n} → a_{n} = {fmt(terms[n - 1], 3)}, s_{n} = {fmt(sums[n - 1], 3)}
          <input type="range" min={3} max={18} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={Y(0)} x2={xEnd + 6} y2={Y(0)} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />

        {item.S !== null && (
          <>
            <line x1={ox} y1={Y(item.S)} x2={xEnd} y2={Y(item.S)} className="pl-dash" />
            <text x={xEnd} y={Y(item.S) - 7} textAnchor="end" className="pl-label" fill="#fbbf24">
              S = {item.S}
            </text>
          </>
        )}

        {/* Tagok oszlopai */}
        {terms.map((a, i) => {
          const x = X(i + 1);
          const top = Math.min(Y(0), Y(a));
          const h = Math.abs(Y(a) - Y(0));
          return <rect key={i} x={x - 4} y={top} width={8} height={Math.max(1, h)} fill="rgba(251,146,60,0.45)" />;
        })}

        {/* Részletösszegek görbéje */}
        <path d={linePath} stroke="#38bdf8" strokeWidth={2.3} fill="none" />
        {sums.map((s, i) => (
          <circle key={i} cx={X(i + 1)} cy={Y(s)} r={4} fill="#38bdf8" />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. GeometricSeriesWidget: ∑ rⁿ konvergenciája |r| < 1 esetén               */
/* -------------------------------------------------------------------------- */
export function GeometricSeriesWidget() {
  const [r, setR] = useState(0.6);
  const N = 16;
  const sums: number[] = [];
  let acc = 0;
  for (let k = 0; k < N; k++) {
    acc += Math.pow(r, k);
    sums.push(acc);
  }
  const conv = Math.abs(r) < 0.999;
  const S = conv ? 1 / (1 - r) : null;

  const minV = Math.min(0, ...sums.map((v) => Math.max(-6, v)));
  const maxV = Math.max(2.5, ...sums.map((v) => Math.min(8, v)));

  const W = 540;
  const H = 235;
  const ox = 46;
  const xEnd = W - 20;
  const yTop = 20;
  const yBot = H - 28;
  const X = (i: number) => ox + (i / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((Math.max(minV, Math.min(maxV, v)) - minV) / (maxV - minV)) * (yBot - yTop);

  const path = sums.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Mértani sor labor: ∑ rⁿ (n = 0 … ∞)</div>
      <div className="sliders">
        <label>
          hányados r = {fmt(r, 2)} ({conv ? `|r| < 1 → S = 1/(1−r) = ${fmt(S!, 3)}` : '|r| ≥ 1 → DIVERGENS!'})
          <input type="range" min={-1.15} max={1.15} step={0.05} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={Y(0)} x2={xEnd} y2={Y(0)} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />

        {S !== null && S >= minV && S <= maxV && (
          <>
            <line x1={ox} y1={Y(S)} x2={xEnd} y2={Y(S)} stroke="#34d399" strokeWidth={1.8} strokeDasharray="5 4" />
            <text x={xEnd} y={Y(S) - 6} textAnchor="end" className="pl-label" fill="#34d399">
              S = {fmt(S, 2)}
            </text>
          </>
        )}

        <path d={path} stroke={conv ? '#38bdf8' : '#f87171'} strokeWidth={2.2} fill="none" />
        {sums.map((v, i) => (
          <circle key={i} cx={X(i)} cy={Y(v)} r={3.8} fill={conv ? '#38bdf8' : '#f87171'} />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. BouncingBallWidget: pattogó labda össz-útja H(1+r)/(1-r)                */
/* -------------------------------------------------------------------------- */
export function BouncingBallWidget() {
  const [r, setR] = useState(0.65);
  const H0 = 4;
  const totalD = H0 * ((1 + r) / (1 - r));

  const W = 540;
  const H = 220;
  const oy = 192;
  const scY = 40;
  const Y = (h: number) => oy - h * scY;

  // Parabolikus pattanások rajzolása
  let xCur = 42;
  const paths: string[] = [`M ${xCur} ${Y(H0)} Q ${xCur + 14} ${Y(H0)} ${xCur + 28} ${oy}`];
  xCur += 28;
  let h = H0 * r;
  let dx = 76;
  for (let k = 0; k < 8; k++) {
    paths.push(`M ${xCur.toFixed(1)} ${oy} Q ${(xCur + dx / 2).toFixed(1)} ${(oy - 2 * h * scY).toFixed(1)} ${(xCur + dx).toFixed(1)} ${oy}`);
    xCur += dx;
    h *= r;
    dx *= Math.sqrt(r);
  }

  return (
    <div className="widget">
      <div className="widget-title">Pattogó labda: H = 4 m magasságból, r visszapattanási aránnyal</div>
      <div className="sliders">
        <label>
          visszapattanási arány r = {fmt(r, 2)} → összes megtett út D = {fmt(totalD, 2)} m
          <input type="range" min={0.3} max={0.85} step={0.05} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={oy} x2={W - 20} y2={oy} className="pl-axis" />
        {paths.map((d, i) => (
          <path key={i} d={d} stroke={i === 0 ? '#fbbf24' : '#38bdf8'} strokeWidth={2.4} fill="none" />
        ))}
        <circle cx={42} cy={Y(H0)} r={6} fill="#fb923c" />
        <text x={W - 14} y={28} textAnchor="end" className="pl-label" fill="#34d399">
          D = H · (1 + r)/(1 − r) = {fmt(totalD, 2)} m
        </text>
      </svg>
      <div className="explain">
        <p>
          Az első esés <M t="H" />, majd minden pattanásnál <em>fel és le</em> is megteszi a magasságot:{' '}
          <M t="D = H + 2Hr + 2Hr^2 + \cdots = H + \dfrac{2Hr}{1-r} = H\dfrac{1+r}{1-r}" />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. TelescopingSeriesWidget: ∑ 1/(k(k+1)) kiejtődése                        */
/* -------------------------------------------------------------------------- */
export function TelescopingSeriesWidget() {
  const [n, setN] = useState(5);
  const sum = 1 - 1 / (n + 1);

  return (
    <div className="widget">
      <div className="widget-title">Teleszkopikus kiejtődés: sₙ = ∑ (1/k − 1/(k+1)) = 1 − 1/(n+1)</div>
      <div className="sliders">
        <label>
          tagok száma n = {n} → s_{n} = 1 − 1/{n + 1} = {fmt(sum, 4)}
          <input type="range" min={2} max={7} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox="0 0 540 120">
        <rect width={540} height={120} className="pl-bg" />
        {Array.from({ length: n }, (_, i) => {
          const k = i + 1;
          const x = 18 + i * (504 / n);
          const w = 504 / n - 8;
          return (
            <g key={k}>
              <rect x={x} y={24} width={w} height={58} rx={9} fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.4)" strokeWidth={1.2} />
              <text x={x + w * 0.28} y={58} textAnchor="middle" className="pl-label" fill={k === 1 ? '#34d399' : '#94a3b8'}>
                +1/{k}
              </text>
              <text x={x + w * 0.72} y={58} textAnchor="middle" className="pl-label" fill={k === n ? '#38bdf8' : '#94a3b8'}>
                −1/{k + 1}
              </text>
              {k > 1 && <line x1={x + 6} y1={66} x2={x + w * 0.45} y2={42} stroke="#fb923c" strokeWidth={2} />}
              {k < n && <line x1={x + w * 0.52} y1={66} x2={x + w - 6} y2={42} stroke="#fb923c" strokeWidth={2} />}
            </g>
          );
        })}
        <text x={270} y={106} textAnchor="middle" className="pl-label" fill="#34d399">
          Csak az első (+1) és az utolsó (−1/{n + 1}) tag marad életben → határérték: 1!
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. DivergenceTestWidget: n-edik tag teszt és csapdája                      */
/* -------------------------------------------------------------------------- */
const DIV_CASES = [
  {
    name: '∑ n/(2n+1)',
    verdict: 'DIVERGENS (aₙ → 0,5 ≠ 0)',
    col: '#f87171',
    fn: (k: number) => k / (2 * k + 1),
    note: 'A tagok 0,5-höz tartanak, nem 0-hoz: az n-edik tag teszt azonnal bizonyítja a divergenciát!',
  },
  {
    name: '∑ 1/n (harmonikus)',
    verdict: 'DIVERGENS, pedig aₙ → 0!',
    col: '#fb923c',
    fn: (k: number) => 1 / k,
    note: 'VIGYÁZAT! Bár aₙ = 1/n → 0, a részletösszegek mégis a végtelenbe nőnek (a teszt itt NEM dönt)!',
  },
  {
    name: '∑ 1/(n(n+1))',
    verdict: 'KONVERGENS (aₙ → 0, S = 1)',
    col: '#34d399',
    fn: (k: number) => 1 / (k * (k + 1)),
    note: 'Itt aₙ → 0 elég gyorsan ahhoz, hogy a sor konvergens legyen (teleszkopikus összeg S = 1).',
  },
];

export function DivergenceTestWidget() {
  const [idx, setIdx] = useState(0);
  const item = DIV_CASES[idx];
  const N = 16;

  const W = 540;
  const H = 210;
  const ox = 42;
  const xEnd = W - 20;
  const yBot = H - 28;
  const yTop = 34;
  const X = (k: number) => ox + ((k - 1) / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / 1.05) * (yBot - yTop);

  return (
    <div className="widget">
      <div className="widget-title">Az n-edik tag divergenciatesztje (lim aₙ ≠ 0 ⇒ divergens)</div>
      <div className="relbuttons chips">
        {DIV_CASES.map((c, i) => (
          <button key={c.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {c.name}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 10} x2={ox} y2={yBot} className="pl-axis" />
        {Array.from({ length: N }, (_, i) => {
          const k = i + 1;
          const v = item.fn(k);
          return <circle key={k} cx={X(k)} cy={Y(v)} r={4.5} fill={item.col} />;
        })}
        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill={item.col}>
          {item.verdict}
        </text>
      </svg>
      <div className="explain">
        <p>{item.note}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. HarmonicGroupingDiagram: Oresme csoportosítása (1/n > 1/2 blokkok)      */
/* -------------------------------------------------------------------------- */
export function HarmonicGroupingDiagram() {
  const groups = [
    { lbl: '1', val: 1, col: '#38bdf8' },
    { lbl: '½', val: 0.5, col: '#34d399' },
    { lbl: '⅓ + ¼', val: 1 / 3 + 1 / 4, col: '#fbbf24' },
    { lbl: '⅕ + … + ⅛', val: 1 / 5 + 1 / 6 + 1 / 7 + 1 / 8, col: '#fb923c' },
    { lbl: '1/9 + … + 1/16', val: 0.668, col: '#2dd4bf' },
  ];

  return (
    <div className="widget">
      <div className="widget-title">Oresme (1350) zseniális bizonyítása: a harmonikus sor blokkjai mind &gt; ½!</div>
      <svg className="plane" viewBox="0 0 540 165">
        <rect width={540} height={165} className="pl-bg" />
        {/* 0.5 referencia vonal */}
        <line x1={30} y1={90} x2={520} y2={90} className="pl-dash" />
        <text x={520} y={84} textAnchor="end" className="pl-label" fill="#fbbf24">
          ½ határ
        </text>
        <line x1={30} y1={135} x2={520} y2={135} className="pl-axis" />

        {groups.map((g, i) => {
          const x = 44 + i * 96;
          const h = g.val * 90;
          return (
            <g key={g.lbl}>
              <rect x={x} y={135 - h} width={68} height={h} rx={6} fill={g.col} fillOpacity={0.35} stroke={g.col} strokeWidth={1.8} />
              <text x={x + 34} y={135 - h - 6} textAnchor="middle" className="pl-label" fill={g.col}>
                {fmt(g.val, 2)}
              </text>
              <text x={x + 34} y={152} textAnchor="middle" className="pl-tick">
                {g.lbl}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="explain">
        <p>
          Minden <M t="2^{k-1}" /> tagból álló blokk összege nagyobb, mint <M t="2^{k-1}\cdot\tfrac{1}{2^k} = \tfrac{1}{2}" />!
          Így <M t="s_{2^k} > 1 + \tfrac{k}{2} \to \infty" /> — a harmonikus sor <strong>divergens</strong>!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. SeriesToolboxDiagram: 11.2 döntési fa                                   */
/* -------------------------------------------------------------------------- */
export function SeriesToolboxDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Első négy lépés egy végtelen sor vizsgálatakor (11.2)</div>
      <svg className="plane" viewBox="0 0 540 132">
        <rect width={540} height={132} className="pl-bg" />

        <rect x={12} y={18} width={120} height={94} rx={11} fill="rgba(248,113,113,0.12)" stroke="#f87171" strokeWidth={1.5} />
        <text x={72} y={42} textAnchor="middle" className="pl-label" fill="#f87171">
          1. lim aₙ ≠ 0?
        </text>
        <text x={72} y={66} textAnchor="middle" className="pl-tick">
          Ha igen:
        </text>
        <text x={72} y={84} textAnchor="middle" className="pl-tick">
          azonnal DIVERG.
        </text>

        <rect x={144} y={18} width={120} height={94} rx={11} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={204} y={42} textAnchor="middle" className="pl-label" fill="#38bdf8">
          2. Mértani?
        </text>
        <text x={204} y={66} textAnchor="middle" className="pl-tick">
          |r| &lt; 1 ⇒
        </text>
        <text x={204} y={84} textAnchor="middle" className="pl-tick">
          S = első / (1−r)
        </text>

        <rect x={276} y={18} width={120} height={94} rx={11} fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth={1.5} />
        <text x={336} y={42} textAnchor="middle" className="pl-label" fill="#34d399">
          3. Teleszkóp?
        </text>
        <text x={336} y={66} textAnchor="middle" className="pl-tick">
          parciális törtek
        </text>
        <text x={336} y={84} textAnchor="middle" className="pl-tick">
          lim sₙ pontosan
        </text>

        <rect x={408} y={18} width={120} height={94} rx={11} fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={468} y={42} textAnchor="middle" className="pl-label" fill="#fbbf24">
          4. Linearitás
        </text>
        <text x={468} y={66} textAnchor="middle" className="pl-tick">
          ∑(c aₙ + d bₙ)
        </text>
        <text x={468} y={84} textAnchor="middle" className="pl-tick">
          átindexelés
        </text>
      </svg>
    </div>
  );
}
