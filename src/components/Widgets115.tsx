import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 3) => v.toFixed(d).replace('.', ',').replace('-0,000', '0,000');

/* -------------------------------------------------------------------------- */
/* 1. RatioTestVisualizerWidget: aₙ₊₁ / aₙ sorozat és a ρ = 1 határ           */
/* -------------------------------------------------------------------------- */
const RATIO_CASES = [
  {
    name: '∑ n / 2ⁿ',
    fn: (n: number) => (n + 1) / (2 * n),
    rho: 0.5,
    yMax: 1.5,
    verdict: 'ρ = 0,5 < 1 → KONVERGENS',
    col: '#34d399',
  },
  {
    name: '∑ 2ⁿ / n²',
    fn: (n: number) => 2 * Math.pow(n / (n + 1), 2),
    rho: 2.0,
    yMax: 2.3,
    verdict: 'ρ = 2 > 1 → DIVERGENS',
    col: '#f87171',
  },
  {
    name: '∑ 1 / n²',
    fn: (n: number) => Math.pow(n / (n + 1), 2),
    rho: 1.0,
    yMax: 1.4,
    verdict: 'ρ = 1 → NEM DÖNT!',
    col: '#fbbf24',
  },
];

export function RatioTestVisualizerWidget() {
  const [idx, setIdx] = useState(0);
  const item = RATIO_CASES[idx];
  const N = 16;

  const W = 540;
  const H = 220;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 28;
  const yBot = H - 28;
  const X = (k: number) => ox + ((k - 1) / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / item.yMax) * (yBot - yTop);

  const pts = Array.from({ length: N }, (_, i) => ({ k: i + 1, v: item.fn(i + 1) }));

  return (
    <div className="widget">
      <div className="widget-title">Hányadoskritérium: az aₙ₊₁ / aₙ sorozat viselkedése</div>
      <div className="relbuttons chips">
        {RATIO_CASES.map((c, i) => (
          <button key={c.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {c.name}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 8} x2={ox} y2={yBot} className="pl-axis" />

        {/* Kritikus 1-es vonal */}
        <line x1={ox} y1={Y(1)} x2={xEnd} y2={Y(1)} stroke="#fbbf24" strokeWidth={1.6} strokeDasharray="6 4" />
        <text x={ox + 6} y={Y(1) - 5} className="pl-tick" fill="#fbbf24">
          kritikus határ: 1
        </text>

        {pts.map((p) => (
          <circle key={p.k} cx={X(p.k)} cy={Y(p.v)} r={4.2} fill={item.col} />
        ))}
        <text x={W - 14} y={22} textAnchor="end" className="pl-label" fill={item.col}>
          {item.verdict}
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. RatioGeometricProofDiagram: miért működik ρ < 1?                        */
/* -------------------------------------------------------------------------- */
export function RatioGeometricProofDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A bizonyítás lényege: ha ρ &lt; 1, egy mértani sor (r &lt; 1) „befogja” a farkát!</div>
      <svg className="plane" viewBox="0 0 540 120">
        <rect width={540} height={120} className="pl-bg" />
        <line x1={30} y1={68} x2={510} y2={68} className="pl-axis" />

        <circle cx={190} cy={68} r={5} fill="#34d399" />
        <text x={190} y={48} textAnchor="middle" className="pl-label" fill="#34d399">
          ρ
        </text>

        <circle cx={290} cy={68} r={5} fill="#38bdf8" />
        <text x={290} y={48} textAnchor="middle" className="pl-label" fill="#38bdf8">
          r (köztes)
        </text>

        <circle cx={390} cy={68} r={5} fill="#fbbf24" />
        <text x={390} y={48} textAnchor="middle" className="pl-label" fill="#fbbf24">
          1
        </text>

        <text x={270} y={102} textAnchor="middle" className="pl-tick">
          n ≥ N-től aₙ₊₁ / aₙ &lt; r &lt; 1  ⇒  aₙ₊ₘ &lt; aₙ · rᵐ  ⇒  konvergens mértani majoráns!
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. FactorialCancellationWidget: 4 klasszikus faktoriális-egyszerűsítés     */
/* -------------------------------------------------------------------------- */
const FACT_TRICKS = [
  { name: '(n+1)! / n!', simp: 'n + 1', desc: 'Minden 1…n tényező kiesik, csak az utolsó (n+1) marad.' },
  { name: '(2n+2)! / (2n)!', simp: '(2n + 2)(2n + 1)', desc: 'Vigyázz: (2(n+1))! = (2n+2)!, tehát KÉT tényező marad!' },
  { name: '(2n)! / (n!)² hányadosa', simp: '(2n+2)(2n+1) / (n+1)² → 4', desc: 'A számlálóban 4n², a nevezőben n² a főtag → határérték 4 > 1 (divergens).' },
  { name: 'n! / nⁿ hányadosa', simp: '(n / (n+1))ⁿ = 1/(1+1/n)ⁿ → 1/e', desc: 'Mivel 1/e ≈ 0,368 < 1, a ∑ n!/nⁿ sor konvergens!' },
];

export function FactorialCancellationWidget() {
  const [i, setI] = useState(1);
  const f = FACT_TRICKS[i];
  return (
    <div className="widget">
      <div className="widget-title">Faktoriális-egyszerűsítő zsebkalauz</div>
      <div className="relbuttons chips">
        {FACT_TRICKS.map((t, idx) => (
          <button key={t.name} className={idx === i ? 'on' : ''} onClick={() => setI(idx)}>
            {t.name}
          </button>
        ))}
      </div>
      <div className="explain" style={{ marginTop: 10 }}>
        <p>
          <strong>Eredmény:</strong> <code>{f.simp}</code> — {f.desc}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. RootTestVisualizerWidget: n-edik gyök sorozata és ρ = 1 határ           */
/* -------------------------------------------------------------------------- */
const ROOT_CASES = [
  {
    name: '∑ n² / 2ⁿ',
    fn: (n: number) => Math.pow(n * n, 1 / n) / 2,
    rho: 0.5,
    yMax: 1.4,
    verdict: 'ρ = 0,5 < 1 → KONVERGENS',
    col: '#34d399',
  },
  {
    name: '∑ ((3n+1)/(2n+5))ⁿ',
    fn: (n: number) => (3 * n + 1) / (2 * n + 5),
    rho: 1.5,
    yMax: 1.8,
    verdict: 'ρ = 1,5 > 1 → DIVERGENS',
    col: '#f87171',
  },
  {
    name: '∑ (1 + 1/n)⁻ⁿ²',
    fn: (n: number) => Math.pow(1 + 1 / n, -n),
    rho: 1 / Math.E,
    yMax: 1.3,
    verdict: 'ρ = 1/e ≈ 0,368 < 1 → KONVERGENS',
    col: '#38bdf8',
  },
];

export function RootTestVisualizerWidget() {
  const [idx, setIdx] = useState(0);
  const item = ROOT_CASES[idx];
  const N = 16;

  const W = 540;
  const H = 220;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 28;
  const yBot = H - 28;
  const X = (k: number) => ox + ((k - 1) / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / item.yMax) * (yBot - yTop);

  const pts = Array.from({ length: N }, (_, i) => ({ k: i + 1, v: item.fn(i + 1) }));

  return (
    <div className="widget">
      <div className="widget-title">Gyökkritérium: az ⁿ√aₙ sorozat határértéke</div>
      <div className="relbuttons chips">
        {ROOT_CASES.map((c, i) => (
          <button key={c.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {c.name}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 8} x2={ox} y2={yBot} className="pl-axis" />

        <line x1={ox} y1={Y(1)} x2={xEnd} y2={Y(1)} stroke="#fbbf24" strokeWidth={1.6} strokeDasharray="6 4" />
        <text x={ox + 6} y={Y(1) - 5} className="pl-tick" fill="#fbbf24">
          kritikus határ: 1
        </text>

        {pts.map((p) => (
          <circle key={p.k} cx={X(p.k)} cy={Y(p.v)} r={4.2} fill={item.col} />
        ))}
        <text x={W - 14} y={22} textAnchor="end" className="pl-label" fill={item.col}>
          {item.verdict}
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. InconclusiveOneTrapDiagram: miért nem dönt ρ = 1?                       */
/* -------------------------------------------------------------------------- */
export function InconclusiveOneTrapDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Miért NEM dönt ρ = 1? Két ellentétes sorsú sor azonos ρ = 1 értékkel!</div>
      <svg className="plane" viewBox="0 0 540 128">
        <rect width={540} height={128} className="pl-bg" />

        <rect x={16} y={16} width={246} height={94} rx={12} fill="rgba(248,113,113,0.1)" stroke="#f87171" strokeWidth={1.6} />
        <text x={139} y={40} textAnchor="middle" className="pl-label" fill="#f87171">
          ∑ 1/n — DIVERGENS
        </text>
        <text x={139} y={66} textAnchor="middle" className="pl-tick">
          Hányados: n/(n+1) → 1
        </text>
        <text x={139} y={88} textAnchor="middle" className="pl-tick">
          Gyök: (1/n)^(1/n) → 1
        </text>

        <rect x={278} y={16} width={246} height={94} rx={12} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.6} />
        <text x={401} y={40} textAnchor="middle" className="pl-label" fill="#34d399">
          ∑ 1/n² — KONVERGENS
        </text>
        <text x={401} y={66} textAnchor="middle" className="pl-tick">
          Hányados: n²/(n+1)² → 1
        </text>
        <text x={401} y={88} textAnchor="middle" className="pl-tick">
          Gyök: (1/n²)^(1/n) → 1
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. RatioVsRootSelectorWidget: melyik teszt a leggyorsabb?                  */
/* -------------------------------------------------------------------------- */
const CHOICES = [
  { s: '∑ n! / 5ⁿ', best: 'Hányadoskritérium', why: 'Faktoriális van benne → aₙ₊₁/aₙ = (n+1)/5 → ∞ (divergens).' },
  { s: '∑ (n / (2n+1))ⁿ', best: 'Gyökkritérium', why: 'Egész kifejezés n-edik hatványon → ⁿ√aₙ = n/(2n+1) → 1/2 < 1 (konvergens).' },
  { s: '∑ (3n+1) / (n³+2)', best: 'Limeszes összehasonlítás', why: 'Racionális függvény → hányados és gyök is ρ = 1-et adna! bₙ = 1/n² azonnal eldönti.' },
  { s: '∑ 2ⁿ / (3ⁿ + n)', best: 'Limeszes vagy gyök', why: 'Mértani főtag (2/3)ⁿ → mindkettő gyorsan 2/3 < 1-et ad (konvergens).' },
];

export function RatioVsRootSelectorWidget() {
  const [i, setI] = useState(0);
  const c = CHOICES[i];
  return (
    <div className="widget">
      <div className="widget-title">Stratégia: mikor válaszd a hányados-, a gyök- vagy az összehasonlító kritériumot?</div>
      <div className="relbuttons chips">
        {CHOICES.map((ch, idx) => (
          <button key={ch.s} className={idx === i ? 'on' : ''} onClick={() => setI(idx)}>
            {ch.s}
          </button>
        ))}
      </div>
      <div className="explain" style={{ marginTop: 10 }}>
        <p>
          <strong>Legjobb eszköz: {c.best}.</strong> {c.why}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. ExponentialVsFactorialRaceWidget: ∑ xⁿ / n! hányadosa x/(n+1)           */
/* -------------------------------------------------------------------------- */
export function ExponentialVsFactorialRaceWidget() {
  const [x, setX] = useState(4);
  const N = 16;

  const W = 540;
  const H = 205;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 24;
  const yBot = H - 28;
  const yMax = Math.max(2.2, x * 0.65);
  const X = (k: number) => ox + ((k - 1) / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - (Math.min(yMax, v) / yMax) * (yBot - yTop);

  const pts = Array.from({ length: N }, (_, i) => ({ k: i + 1, v: x / (i + 2) }));

  return (
    <div className="widget">
      <div className="widget-title">Miért konvergens ∑ xⁿ / n! MINDEN x-re? (aₙ₊₁ / aₙ = x / (n+1) → 0)</div>
      <div className="sliders">
        <label>
          paraméter x = {fmt(x, 1)} (n ≥ {Math.floor(x)}-től a hányados már &lt; 1!)
          <input type="range" min={1} max={10} step={0.5} value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 6} x2={ox} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={Y(1)} x2={xEnd} y2={Y(1)} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="6 4" />
        {pts.map((p) => (
          <circle key={p.k} cx={X(p.k)} cy={Y(p.v)} r={4.2} fill={p.v < 1 ? '#34d399' : '#fb923c'} />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. RatioRootSummaryDiagram: ρ számegyenes 3 zónája                         */
/* -------------------------------------------------------------------------- */
export function RatioRootSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Döntési számegyenes mindkét kritériumhoz (ρ = lim aₙ₊₁/aₙ vagy lim ⁿ√aₙ)</div>
      <svg className="plane" viewBox="0 0 540 110">
        <rect width={540} height={110} className="pl-bg" />
        <rect x={24} y={32} width={220} height={44} rx={8} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={1.6} />
        <text x={134} y={59} textAnchor="middle" className="pl-label" fill="#34d399">
          0 ≤ ρ &lt; 1 : KONVERGENS
        </text>

        <circle cx={270} cy={54} r={18} fill="rgba(251,191,36,0.25)" stroke="#fbbf24" strokeWidth={2} />
        <text x={270} y={59} textAnchor="middle" className="pl-label" fill="#fbbf24">
          1
        </text>
        <text x={270} y={92} textAnchor="middle" className="pl-tick" fill="#fbbf24">
          nem dönt!
        </text>

        <rect x={296} y={32} width={220} height={44} rx={8} fill="rgba(248,113,113,0.22)" stroke="#f87171" strokeWidth={1.6} />
        <text x={406} y={59} textAnchor="middle" className="pl-label" fill="#f87171">
          ρ &gt; 1 (vagy ∞) : DIVERGENS
        </text>
      </svg>
    </div>
  );
}
