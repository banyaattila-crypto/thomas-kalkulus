import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 3) => v.toFixed(d).replace('.', ',').replace('-0,000', '0,000');

/* -------------------------------------------------------------------------- */
/* 1. DirectComparisonWidget: majoráns (konv.) és minoráns (div.) élőben      */
/* -------------------------------------------------------------------------- */
export function DirectComparisonWidget() {
  const [mode, setMode] = useState<'maj' | 'min'>('maj');
  const [n, setN] = useState(10);

  const W = 540;
  const H = 225;
  const ox = 42;
  const xEnd = W - 20;
  const yBot = H - 28;
  const yTop = 28;

  const items = Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    if (mode === 'maj') {
      return { k, a: 1 / (k * k + 3), ref: 1 / (k * k) };
    }
    return { k, a: 1 / (Math.sqrt(k) - 0.3), ref: 1 / Math.sqrt(k) };
  });
  const yMax = mode === 'maj' ? 1.1 : 1.55;
  const X = (k: number) => ox + ((k - 0.5) / n) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / yMax) * (yBot - yTop);
  const bw = Math.max(8, (xEnd - ox) / n - 8);

  return (
    <div className="widget">
      <div className="widget-title">Közvetlen összehasonlító kritérium (10. tétel)</div>
      <div className="relbuttons chips">
        <button className={mode === 'maj' ? 'on' : ''} onClick={() => setMode('maj')}>
          Majoráns: 1/(n²+3) ≤ 1/n² (KONV.)
        </button>
        <button className={mode === 'min' ? 'on' : ''} onClick={() => setMode('min')}>
          Minoráns: 1/(√n − 0,3) ≥ 1/√n (DIV.)
        </button>
      </div>
      <div className="sliders">
        <label>
          tagok száma n = {n}
          <input type="range" min={5} max={14} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 8} x2={ox} y2={yBot} className="pl-axis" />

        {items.map((it) => {
          const x = X(it.k);
          return (
            <g key={it.k}>
              {/* Referencia oszlop */}
              <rect
                x={x - bw / 2}
                y={Y(it.ref)}
                width={bw}
                height={yBot - Y(it.ref)}
                fill="none"
                stroke={mode === 'maj' ? '#34d399' : '#f87171'}
                strokeWidth={1.6}
                strokeDasharray="4 2"
              />
              {/* Saját a_k oszlop */}
              <rect
                x={x - bw * 0.35}
                y={Y(it.a)}
                width={bw * 0.7}
                height={yBot - Y(it.a)}
                fill={mode === 'maj' ? 'rgba(56,189,248,0.45)' : 'rgba(251,146,60,0.45)'}
                stroke={mode === 'maj' ? '#38bdf8' : '#fb923c'}
                strokeWidth={1.4}
              />
            </g>
          );
        })}

        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill={mode === 'maj' ? '#34d399' : '#f87171'}>
          {mode === 'maj' ? 'aₙ ≤ cₙ (konvergens plafon)' : 'aₙ ≥ dₙ (divergens padló)'}
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. FactorialVsGeometricWidget: ∑ 1/n! ≤ 1 + ∑ 1/2^(n-1) = 3                */
/* -------------------------------------------------------------------------- */
export function FactorialVsGeometricWidget() {
  const [n, setN] = useState(7);

  const sFact: number[] = [];
  const sGeom: number[] = [];
  let af = 0;
  let ag = 0;
  let fact = 1;
  for (let k = 0; k <= n; k++) {
    if (k > 1) fact *= k;
    af += 1 / fact;
    ag += k === 0 ? 1 : 1 / Math.pow(2, k - 1);
    sFact.push(af);
    sGeom.push(ag);
  }

  const W = 540;
  const H = 215;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 20;
  const yBot = H - 26;
  const X = (k: number) => ox + (k / Math.max(1, n)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((v - 0.8) / 2.4) * (yBot - yTop);

  const pF = sFact.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  const pG = sGeom.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Klasszikus majorálás: ∑ 1/n! = e ≈ 2,71828 ≤ 1 + ∑ (½)ⁿ⁻¹ = 3</div>
      <div className="sliders">
        <label>
          k = 0 … {n} → ∑ 1/k! = {fmt(af, 5)} ≤ {fmt(ag, 5)}
          <input type="range" min={2} max={10} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />

        <line x1={ox} y1={Y(3)} x2={xEnd} y2={Y(3)} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="5 4" />
        <text x={xEnd} y={Y(3) - 5} textAnchor="end" className="pl-tick" fill="#fbbf24">
          3 (mértani plafon)
        </text>
        <line x1={ox} y1={Y(Math.E)} x2={xEnd} y2={Y(Math.E)} stroke="#34d399" strokeWidth={1.6} />
        <text x={xEnd} y={Y(Math.E) + 14} textAnchor="end" className="pl-label" fill="#34d399">
          e ≈ 2,7183
        </text>

        <path d={pG} stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" fill="none" />
        <path d={pF} stroke="#38bdf8" strokeWidth={2.5} fill="none" />
        {sFact.map((v, i) => (
          <circle key={i} cx={X(i)} cy={Y(v)} r={3.8} fill="#38bdf8" />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. WrongDirectionTrapDiagram: a 2 haszontalan összehasonlítási irány       */
/* -------------------------------------------------------------------------- */
export function WrongDirectionTrapDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A „rossz irány” csapdája: ez a két egyenlőtlenség SEMMIT nem bizonyít!</div>
      <svg className="plane" viewBox="0 0 540 130">
        <rect width={540} height={130} className="pl-bg" />

        <rect x={16} y={16} width={246} height={96} rx={12} fill="rgba(248,113,113,0.1)" stroke="#f87171" strokeWidth={1.6} />
        <text x={139} y={40} textAnchor="middle" className="pl-label" fill="#f87171">
          ✗ Kisebb, mint egy divergens
        </text>
        <text x={139} y={64} textAnchor="middle" className="pl-tick">
          aₙ ≤ dₙ (ahol ∑ dₙ = ∞)
        </text>
        <text x={139} y={88} textAnchor="middle" className="pl-tick">
          pl. 1/n² ≤ 1/n (konv.), 1/(n+1) ≤ 1/n (div.)
        </text>

        <rect x={278} y={16} width={246} height={96} rx={12} fill="rgba(248,113,113,0.1)" stroke="#f87171" strokeWidth={1.6} />
        <text x={401} y={40} textAnchor="middle" className="pl-label" fill="#f87171">
          ✗ Nagyobb, mint egy konvergens
        </text>
        <text x={401} y={64} textAnchor="middle" className="pl-tick">
          aₙ ≥ cₙ (ahol ∑ cₙ &lt; ∞)
        </text>
        <text x={401} y={88} textAnchor="middle" className="pl-tick">
          pl. 2/n² ≥ 1/n² (konv.), 1/n ≥ 1/n² (div.)
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. LimitComparisonWidget: aₙ / bₙ → c > 0 hányados-sorozat élőben          */
/* -------------------------------------------------------------------------- */
const LCT_PRESETS = [
  {
    name: '(3n+1)/(2n³−n+5) vs 1/n²',
    ratio: (n: number) => ((3 * n + 1) / (2 * n * n * n - n + 5)) * n * n,
    c: 1.5,
    yMax: 2.3,
    verdict: 'c = 1,5 > 0 → mindkettő KONVERGENS!',
    col: '#34d399',
  },
  {
    name: '(2n+5)/√(n⁴+1) vs 1/n',
    ratio: (n: number) => ((2 * n + 5) / Math.sqrt(n * n * n * n + 1)) * n,
    c: 2,
    yMax: 5.5,
    verdict: 'c = 2 > 0 → mindkettő DIVERGENS!',
    col: '#fb923c',
  },
  {
    name: 'sin(1/n²) vs 1/n²',
    ratio: (n: number) => Math.sin(1 / (n * n)) * n * n,
    c: 1,
    yMax: 1.3,
    verdict: 'c = 1 > 0 → mindkettő KONVERGENS!',
    col: '#38bdf8',
  },
];

export function LimitComparisonWidget() {
  const [idx, setIdx] = useState(0);
  const item = LCT_PRESETS[idx];
  const N = 18;

  const W = 540;
  const H = 220;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 28;
  const yBot = H - 28;
  const X = (k: number) => ox + ((k - 1) / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - (Math.min(item.yMax, v) / item.yMax) * (yBot - yTop);

  const pts = Array.from({ length: N }, (_, i) => ({ k: i + 1, v: item.ratio(i + 1) }));

  return (
    <div className="widget">
      <div className="widget-title">Limeszes összehasonlítás: az aₙ / bₙ hányados pozitív c-hez tart</div>
      <div className="relbuttons chips">
        {LCT_PRESETS.map((p, i) => (
          <button key={p.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {p.name}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 8} x2={ox} y2={yBot} className="pl-axis" />

        <line x1={ox} y1={Y(item.c)} x2={xEnd} y2={Y(item.c)} className="pl-dash" />
        <text x={W - 14} y={22} textAnchor="end" className="pl-label" fill={item.col}>
          {item.verdict}
        </text>
        {pts.map((p) => (
          <circle key={p.k} cx={X(p.k)} cy={Y(p.v)} r={4} fill={item.col} />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. LimitComparisonEdgeCasesWidget: c = 0 és c = ∞ esetek                   */
/* -------------------------------------------------------------------------- */
export function LimitComparisonEdgeCasesWidget() {
  const [edge, setEdge] = useState<'zero' | 'inf'>('zero');
  return (
    <div className="widget">
      <div className="widget-title">A limeszes összehasonlítás két határesete (c = 0 és c = ∞)</div>
      <div className="relbuttons chips">
        <button className={edge === 'zero' ? 'on' : ''} onClick={() => setEdge('zero')}>
          lim aₙ/bₙ = 0 (aₙ sokkal kisebb)
        </button>
        <button className={edge === 'inf' ? 'on' : ''} onClick={() => setEdge('inf')}>
          lim aₙ/bₙ = ∞ (aₙ sokkal nagyobb)
        </button>
      </div>
      <div className="explain" style={{ marginTop: 10 }}>
        {edge === 'zero' ? (
          <p>
            Ha <M t="\lim \tfrac{a_n}{b_n} = 0" />, akkor egy <M t="N" />-től kezdve <M t="a_n < b_n" />. Tehát ha{' '}
            <M t="\sum b_n" /> <strong>konvergens</strong>, akkor <M t="\sum a_n" /> is <strong>konvergens</strong>!
            (Példa: <M t="a_n = \tfrac{\ln n}{n^3},\ b_n = \tfrac{1}{n^2} \Rightarrow \tfrac{a_n}{b_n} = \tfrac{\ln n}{n} \to 0" />,
            tehát <M t="\sum \tfrac{\ln n}{n^3}" /> konvergens!)
          </p>
        ) : (
          <p>
            Ha <M t="\lim \tfrac{a_n}{b_n} = \infty" />, akkor egy <M t="N" />-től kezdve <M t="a_n > b_n" />. Tehát ha{' '}
            <M t="\sum b_n" /> <strong>divergens</strong>, akkor <M t="\sum a_n" /> is <strong>divergens</strong>!
            (Példa: <M t="a_n = \tfrac{\ln n}{n},\ b_n = \tfrac{1}{n} \Rightarrow \tfrac{a_n}{b_n} = \ln n \to \infty" />,
            tehát <M t="\sum \tfrac{\ln n}{n}" /> divergens!)
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. DominantTermPickerWidget: főtag kiválasztása bₙ-hez                     */
/* -------------------------------------------------------------------------- */
const DOM_EXAMPLES = [
  { expr: '(4n² − 3n + 7) / (5n⁴ + n² − 1)', top: '4n²', bot: '5n⁴', bn: '1 / n²', res: 'KONVERGENS (p = 2 > 1)' },
  { expr: '√(n² + 5) / (3n² − 2n)', top: 'n', bot: '3n²', bn: '1 / n', res: 'DIVERGENS (harmonikus)' },
  { expr: '(2ⁿ + n³) / (5ⁿ − 3ⁿ)', top: '2ⁿ', bot: '5ⁿ', bn: '(2/5)ⁿ', res: 'KONVERGENS (mértani, r = 2/5)' },
  { expr: '(n + 1) / (n√n + 4)', top: 'n', bot: 'n^(3/2)', bn: '1 / √n', res: 'DIVERGENS (p = 1/2 ≤ 1)' },
];

export function DominantTermPickerWidget() {
  const [i, setI] = useState(0);
  const ex = DOM_EXAMPLES[i];
  return (
    <div className="widget">
      <div className="widget-title">Főtag-vadász: hogyan válasszunk pillanatok alatt bₙ referenciasort?</div>
      <div className="relbuttons chips">
        {DOM_EXAMPLES.map((e, idx) => (
          <button key={e.expr} className={idx === i ? 'on' : ''} onClick={() => setI(idx)}>
            {idx + 1}. példa
          </button>
        ))}
      </div>
      <svg className="plane" viewBox="0 0 540 120">
        <rect width={540} height={120} className="pl-bg" />
        <text x={270} y={32} textAnchor="middle" className="pl-label" fill="#e8ecf8">
          aₙ = {ex.expr}
        </text>
        <text x={140} y={68} textAnchor="middle" className="pl-tick" fill="#38bdf8">
          Számláló főtag: {ex.top}
        </text>
        <text x={400} y={68} textAnchor="middle" className="pl-tick" fill="#fbbf24">
          Nevező főtag: {ex.bot}
        </text>
        <text x={270} y={100} textAnchor="middle" className="pl-label" fill="#34d399">
          Választott bₙ = {ex.bn}  ⇒  {ex.res}
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. AsymptoticEquivalenceDiagram: kis argumentumú ekvivalenciák             */
/* -------------------------------------------------------------------------- */
export function AsymptoticEquivalenceDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Aranyat érő aszimptotikus ekvivalenciák (u = 1/n → 0)</div>
      <svg className="plane" viewBox="0 0 540 124">
        <rect width={540} height={124} className="pl-bg" />
        {[
          { x: 12, t: 'sin(u) ~ u', s: '∑ sin(1/n) div.', c: '#fb923c' },
          { x: 144, t: '1 − cos(u) ~ u²/2', s: '∑(1−cos(1/n)) konv.', c: '#34d399' },
          { x: 276, t: 'ln(1 + u) ~ u', s: '∑ ln(1+1/n) div.', c: '#38bdf8' },
          { x: 408, t: 'eᵘ − 1 ~ u', s: '∑ (e^(1/n)−1) div.', c: '#fbbf24' },
        ].map((b) => (
          <g key={b.t}>
            <rect x={b.x} y={18} width={120} height={86} rx={11} fill="rgba(255,255,255,0.04)" stroke={b.c} strokeWidth={1.5} />
            <text x={b.x + 60} y={48} textAnchor="middle" className="pl-label" fill={b.c}>
              {b.t}
            </text>
            <text x={b.x + 60} y={76} textAnchor="middle" className="pl-tick">
              {b.s}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. ComparisonDecisionTreeDiagram: összefoglaló döntési térkép              */
/* -------------------------------------------------------------------------- */
export function ComparisonDecisionTreeDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Összehasonlító kritériumok összképe (pozitív tagú sorokra)</div>
      <svg className="plane" viewBox="0 0 540 128">
        <rect width={540} height={128} className="pl-bg" />
        <rect x={14} y={18} width={160} height={90} rx={11} fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth={1.5} />
        <text x={94} y={42} textAnchor="middle" className="pl-label" fill="#34d399">
          Majoráns (10a)
        </text>
        <text x={94} y={66} textAnchor="middle" className="pl-tick">
          0 ≤ aₙ ≤ cₙ
        </text>
        <text x={94} y={86} textAnchor="middle" className="pl-tick">
          ∑ cₙ konv. ⇒ ∑ aₙ konv.
        </text>

        <rect x={190} y={18} width={160} height={90} rx={11} fill="rgba(251,146,60,0.12)" stroke="#fb923c" strokeWidth={1.5} />
        <text x={270} y={42} textAnchor="middle" className="pl-label" fill="#fb923c">
          Minoráns (10b)
        </text>
        <text x={270} y={66} textAnchor="middle" className="pl-tick">
          0 ≤ dₙ ≤ aₙ
        </text>
        <text x={270} y={86} textAnchor="middle" className="pl-tick">
          ∑ dₙ div. ⇒ ∑ aₙ div.
        </text>

        <rect x={366} y={18} width={160} height={90} rx={11} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={446} y={42} textAnchor="middle" className="pl-label" fill="#38bdf8">
          Limeszes (11)
        </text>
        <text x={446} y={66} textAnchor="middle" className="pl-tick">
          lim aₙ / bₙ = c &gt; 0
        </text>
        <text x={446} y={86} textAnchor="middle" className="pl-tick">
          ∑ aₙ ⇔ ∑ bₙ
        </text>
      </svg>
    </div>
  );
}
