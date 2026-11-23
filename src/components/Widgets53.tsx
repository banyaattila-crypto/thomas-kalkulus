import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: integráljel anatómiája */

export function IntegralAnatomyDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A határozott integrál jelölésének anatómiája</div>
      <svg viewBox="0 0 520 185" className="plane" role="img" aria-label="Határozott integrál részei">
        <rect width={520} height={185} className="pl-bg" />

        {/* Integrál kifejezés */}
        <text x={156} y={36} textAnchor="middle" fill="#fb923c" fontSize={18} fontWeight={700}>b</text>
        <text x={144} y={114} textAnchor="middle" fill="#38bdf8" fontSize={86} fontFamily="Georgia, serif">∫</text>
        <text x={132} y={142} textAnchor="middle" fill="#34d399" fontSize={18} fontWeight={700}>a</text>
        <text x={182} y={96} textAnchor="start" fill="#fbbf24" fontSize={30} fontWeight={700} fontStyle="italic">f(x)</text>
        <text x={242} y={96} textAnchor="start" fill="#c084fc" fontSize={28} fontWeight={700} fontStyle="italic">dx</text>

        {/* Feliratok és mutatóvonalak */}
        <line x1={170} y1={30} x2={305} y2={30} stroke="#fb923c" strokeWidth={1.6} />
        <text x={312} y={34} fill="#fed7aa" fontSize={12.5}>felső integrálási határ</text>

        <line x1={206} y1={68} x2={206} y2={54} stroke="#fbbf24" strokeWidth={1.5} />
        <line x1={206} y1={54} x2={305} y2={54} stroke="#fbbf24" strokeWidth={1.5} />
        <text x={312} y={58} fill="#fde68a" fontSize={12.5}>integrandus (a függvény)</text>

        <line x1={276} y1={88} x2={305} y2={88} stroke="#c084fc" strokeWidth={1.6} />
        <text x={312} y={92} fill="#e9d5ff" fontSize={12.5}>differenciál (x a „néma” változó)</text>

        <line x1={148} y1={136} x2={305} y2={136} stroke="#34d399" strokeWidth={1.6} />
        <text x={312} y={140} fill="#a7f3d0" fontSize={12.5}>alsó integrálási határ</text>

        <line x1={122} y1={86} x2={92} y2={86} stroke="#38bdf8" strokeWidth={1.6} />
        <text x={86} y={82} textAnchor="end" fill="#7dd3fc" fontSize={12}>integráljel</text>
        <text x={86} y={98} textAnchor="end" fill="#94a3b8" fontSize={11}>(megnyújtott S)</text>

        {/* Alsó megjegyzés */}
        <text x={260} y={172} textAnchor="middle" fill="#94a3b8" fontSize={11.5}>
          Leibniz jelölése (1675): a véges Σ f(cₖ)·Δxₖ összeg „folytonos” határértéke
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: integrálható vs. nem integrálható */

export function IntegrabilityCompareDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Mikor integrálható egy függvény? (Három tipikus eset)</div>
      <svg viewBox="0 0 540 185" className="plane" role="img" aria-label="Folytonos, szakaszonként folytonos és Dirichlet-függvény">
        <rect width={540} height={185} className="pl-bg" />

        {/* 1. panel: Folytonos */}
        <g transform="translate(14, 14)">
          <rect width={162} height={156} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={81} y={18} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>1. Folytonos</text>
          <line x1={18} y1={116} x2={146} y2={116} stroke="#64748b" strokeWidth={1.2} />
          <line x1={24} y1={32} x2={24} y2={122} stroke="#64748b" strokeWidth={1.2} />
          {/* Sima görbe alatti terület */}
          <path d="M 32 116 L 32 82 Q 70 36 104 66 T 138 48 L 138 116 Z" fill="rgba(52,211,153,0.22)" />
          <path d="M 32 82 Q 70 36 104 66 T 138 48" fill="none" stroke="#34d399" strokeWidth={2.4} />
          <text x={81} y={136} textAnchor="middle" fill="#a7f3d0" fontSize={10.5}>U − L → 0</text>
          <text x={81} y={150} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>Integrálható ✓</text>
        </g>

        {/* 2. panel: Szakaszonként folytonos */}
        <g transform="translate(189, 14)">
          <rect width={162} height={156} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={81} y={18} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>2. Véges ugrás</text>
          <line x1={18} y1={116} x2={146} y2={116} stroke="#64748b" strokeWidth={1.2} />
          <line x1={24} y1={32} x2={24} y2={122} stroke="#64748b" strokeWidth={1.2} />
          {/* Két lépcső */}
          <rect x={32} y={84} width={48} height={32} fill="rgba(56,189,248,0.22)" />
          <rect x={80} y={48} width={58} height={68} fill="rgba(56,189,248,0.22)" />
          <line x1={32} y1={84} x2={80} y2={84} stroke="#38bdf8" strokeWidth={2.4} />
          <line x1={80} y1={48} x2={138} y2={48} stroke="#38bdf8" strokeWidth={2.4} />
          <circle cx={80} cy={84} r={3} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.8} />
          <circle cx={80} cy={48} r={3} fill="#38bdf8" />
          <text x={81} y={136} textAnchor="middle" fill="#bae6fd" fontSize={10.5}>ugrás sávja → 0</text>
          <text x={81} y={150} textAnchor="middle" fill="#38bdf8" fontSize={10.5} fontWeight={700}>Integrálható ✓</text>
        </g>

        {/* 3. panel: Dirichlet-függvény */}
        <g transform="translate(364, 14)">
          <rect width={162} height={156} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={81} y={18} textAnchor="middle" fill="#fb7185" fontSize={11.5} fontWeight={700}>3. Dirichlet-függvény</text>
          <line x1={18} y1={116} x2={146} y2={116} stroke="#64748b" strokeWidth={1.2} />
          <line x1={24} y1={32} x2={24} y2={122} stroke="#64748b" strokeWidth={1.2} />
          {/* Felső U = 1 doboz */}
          <rect x={32} y={50} width={106} height={66} fill="rgba(251,113,133,0.14)" stroke="#fb7185" strokeWidth={1.2} strokeDasharray="4 3" />
          {/* Sűrű pontok y=1 és y=0 szinten */}
          {Array.from({ length: 18 }, (_, i) => (
            <g key={i}>
              <circle cx={35 + i * 6} cy={50} r={1.8} fill="#fb7185" />
              <circle cx={38 + i * 6} cy={116} r={1.8} fill="#fbbf24" />
            </g>
          ))}
          <text x={142} y={53} fill="#fb7185" fontSize={9.5}>1</text>
          <text x={81} y={136} textAnchor="middle" fill="#fecdd3" fontSize={10.5}>U = 1, L = 0 (eltér!)</text>
          <text x={81} y={150} textAnchor="middle" fill="#fb7185" fontSize={10.5} fontWeight={700}>NEM integrálható ✗</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: integrálási szabályok vizuálisan */

type RuleKey = 'add' | 'const' | 'minmax' | 'dom';

export function IntegralRulesVisualWidget() {
  const [rule, setRule] = useState<RuleKey>('add');

  const f: Fn = (x) => 1.4 + 0.65 * Math.sin(x * 0.9) + 0.12 * x;
  const g: Fn = (x) => 0.7 + 0.35 * Math.cos(x * 0.8);

  return (
    <div className="widget">
      <div className="widget-title">A határozott integrál tulajdonságai geometriailag</div>
      <div className="relbuttons chips" role="tablist" aria-label="Integrálási szabályok">
        <button type="button" className={rule === 'add' ? 'on' : ''} onClick={() => setRule('add')}>
          Additivitás
        </button>
        <button type="button" className={rule === 'const' ? 'on' : ''} onClick={() => setRule('const')}>
          Konstansszorzó
        </button>
        <button type="button" className={rule === 'minmax' ? 'on' : ''} onClick={() => setRule('minmax')}>
          Max–min korlát
        </button>
        <button type="button" className={rule === 'dom' ? 'on' : ''} onClick={() => setRule('dom')}>
          Domináció
        </button>
      </div>

      <Chart xmin={-0.3} xmax={5.4} ymin={-0.4} ymax={4.6} h={230}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const buildArea = (fn: Fn, x0: number, x1: number) => {
            const pts: string[] = [`M ${sx(x0)} ${sy(0)}`];
            const steps = 60;
            for (let i = 0; i <= steps; i++) {
              const x = x0 + ((x1 - x0) * i) / steps;
              pts.push(`L ${sx(x)} ${sy(fn(x))}`);
            }
            pts.push(`L ${sx(x1)} ${sy(0)} Z`);
            return pts.join(' ');
          };

          if (rule === 'add') {
            return (
              <>
                <path d={buildArea(f, 0.6, 2.7)} fill="rgba(56,189,248,0.28)" />
                <path d={buildArea(f, 2.7, 4.6)} fill="rgba(52,211,153,0.28)" />
                <line x1={sx(2.7)} y1={sy(0)} x2={sx(2.7)} y2={sy(f(2.7))} stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />
                <path d={curve(f, m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
                <text x={sx(0.6)} y={sy(-0.28)} textAnchor="middle" fill="#cbd5e1" fontSize={12}>a</text>
                <text x={sx(2.7)} y={sy(-0.28)} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>b</text>
                <text x={sx(4.6)} y={sy(-0.28)} textAnchor="middle" fill="#cbd5e1" fontSize={12}>c</text>
                <text x={sx(1.65)} y={sy(0.85)} textAnchor="middle" fill="#bae6fd" fontSize={12} fontWeight={700}>I₁</text>
                <text x={sx(3.65)} y={sy(0.85)} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>I₂</text>
              </>
            );
          }

          if (rule === 'const') {
            const f2: Fn = (x) => 2 * f(x);
            return (
              <>
                <path d={buildArea(f2, 0.8, 4.2)} fill="rgba(251,146,60,0.22)" />
                <path d={buildArea(f, 0.8, 4.2)} fill="rgba(56,189,248,0.32)" />
                <path d={curve(f2, m, 240)} fill="none" stroke="#fb923c" strokeWidth={2.4} />
                <path d={curve(f, m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
                <text x={sx(4.35)} y={sy(f2(4.3))} fill="#fed7aa" fontSize={12} fontWeight={700}>2f(x)</text>
                <text x={sx(4.35)} y={sy(f(4.3))} fill="#7dd3fc" fontSize={12} fontWeight={700}>f(x)</text>
                <text x={sx(0.8)} y={sy(-0.28)} textAnchor="middle" fill="#cbd5e1" fontSize={12}>a</text>
                <text x={sx(4.2)} y={sy(-0.28)} textAnchor="middle" fill="#cbd5e1" fontSize={12}>b</text>
              </>
            );
          }

          if (rule === 'minmax') {
            let mn = Infinity;
            let mx = -Infinity;
            for (let i = 0; i <= 120; i++) {
              const v = f(0.6 + (3.8 * i) / 120);
              if (v < mn) mn = v;
              if (v > mx) mx = v;
            }
            return (
              <>
                <rect
                  x={sx(0.6)}
                  y={sy(mx)}
                  width={sx(4.4) - sx(0.6)}
                  height={sy(0) - sy(mx)}
                  fill="rgba(251,191,36,0.12)"
                  stroke="#fbbf24"
                  strokeWidth={1.6}
                  strokeDasharray="5 3"
                />
                <path d={buildArea(f, 0.6, 4.4)} fill="rgba(56,189,248,0.28)" />
                <rect
                  x={sx(0.6)}
                  y={sy(mn)}
                  width={sx(4.4) - sx(0.6)}
                  height={sy(0) - sy(mn)}
                  fill="rgba(52,211,153,0.22)"
                  stroke="#34d399"
                  strokeWidth={1.6}
                />
                <path d={curve(f, m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
                <text x={sx(4.5)} y={sy(mx)} fill="#fde68a" fontSize={11.5}>max f</text>
                <text x={sx(4.5)} y={sy(mn)} fill="#a7f3d0" fontSize={11.5}>min f</text>
                <text x={sx(0.6)} y={sy(-0.28)} textAnchor="middle" fill="#cbd5e1" fontSize={12}>a</text>
                <text x={sx(4.4)} y={sy(-0.28)} textAnchor="middle" fill="#cbd5e1" fontSize={12}>b</text>
              </>
            );
          }

          return (
            <>
              <path d={buildArea(f, 0.6, 4.4)} fill="rgba(56,189,248,0.22)" />
              <path d={buildArea(g, 0.6, 4.4)} fill="rgba(168,85,247,0.30)" />
              <path d={curve(f, m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={curve(g, m, 240)} fill="none" stroke="#c084fc" strokeWidth={2.5} />
              <text x={sx(4.55)} y={sy(f(4.4))} fill="#7dd3fc" fontSize={12} fontWeight={700}>f(x)</text>
              <text x={sx(4.55)} y={sy(g(4.4))} fill="#e9d5ff" fontSize={12} fontWeight={700}>g(x)</text>
              <text x={sx(0.6)} y={sy(-0.28)} textAnchor="middle" fill="#cbd5e1" fontSize={12}>a</text>
              <text x={sx(4.4)} y={sy(-0.28)} textAnchor="middle" fill="#cbd5e1" fontSize={12}>b</text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        {rule === 'add' && (
          <M t="\int_a^b f(x)\,dx + \int_b^c f(x)\,dx = \int_a^c f(x)\,dx \quad\text{(a két szomszédos darab összeadódik)}" />
        )}
        {rule === 'const' && (
          <M t="\int_a^b 2f(x)\,dx = 2\int_a^b f(x)\,dx \quad\text{(kétszeres magasság = kétszeres terület)}" />
        )}
        {rule === 'minmax' && (
          <M t="\min f \cdot (b-a) \;\le\; \int_a^b f(x)\,dx \;\le\; \max f \cdot (b-a)" />
        )}
        {rule === 'dom' && (
          <M t="f(x) \ge g(x)\;\text{ az }[a;\,b]\text{-n} \;\implies\; \int_a^b f(x)\,dx \ge \int_a^b g(x)\,dx" />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: előjeles terület felfedező */

type SignedPreset = {
  id: string;
  label: string;
  formula: string;
  a: number;
  bMin: number;
  bMax: number;
  bInit: number;
  step: number;
  domain: [number, number];
  range: [number, number];
  fn: Fn;
  net: (b: number) => number;
  absArea: (b: number) => number;
};

const SIGNED_PRESETS: SignedPreset[] = [
  {
    id: 'lin',
    label: 'f(x) = x − 1',
    formula: 'x - 1',
    a: -1,
    bMin: -1,
    bMax: 3.5,
    bInit: 3,
    step: 0.25,
    domain: [-1.5, 4],
    range: [-2.5, 3],
    fn: (x) => x - 1,
    net: (b) => 0.5 * b * b - b - 1.5,
    absArea: (b) => (b <= 1 ? -(0.5 * b * b - b - 1.5) : 2 + 0.5 * (b - 1) * (b - 1)),
  },
  {
    id: 'tent',
    label: 'f(x) = 2 − |x|',
    formula: '2 - |x|',
    a: -3,
    bMin: -3,
    bMax: 3,
    bInit: 2,
    step: 0.25,
    domain: [-3.5, 3.5],
    range: [-1.6, 2.6],
    fn: (x) => 2 - Math.abs(x),
    net: (b) => {
      // Exact integral of 2 - |x| from -3 to b
      const F = (x: number) => (x < 0 ? 2 * x + 0.5 * x * x : 2 * x - 0.5 * x * x);
      return F(b) - F(-3);
    },
    absArea: (b) => {
      // Negative on [-3, -2], positive on [-2, 2], negative on [2, 3]
      const F = (x: number) => (x < 0 ? 2 * x + 0.5 * x * x : 2 * x - 0.5 * x * x);
      if (b <= -2) return -(F(b) - F(-3));
      if (b <= 2) return 0.5 + (F(b) - F(-2));
      return 0.5 + 4 + -(F(b) - F(2));
    },
  },
  {
    id: 'semi',
    label: 'f(x) = √(4 − x²)',
    formula: '\\sqrt{4-x^2}',
    a: -2,
    bMin: -2,
    bMax: 2,
    bInit: 2,
    step: 0.2,
    domain: [-2.5, 2.5],
    range: [-0.5, 2.5],
    fn: (x) => Math.sqrt(Math.max(0, 4 - x * x)),
    net: (b) => {
      const clamped = Math.max(-2, Math.min(2, b));
      return 0.5 * clamped * Math.sqrt(Math.max(0, 4 - clamped * clamped)) + 2 * Math.asin(clamped / 2) + Math.PI;
    },
    absArea: (b) => {
      const clamped = Math.max(-2, Math.min(2, b));
      return 0.5 * clamped * Math.sqrt(Math.max(0, 4 - clamped * clamped)) + 2 * Math.asin(clamped / 2) + Math.PI;
    },
  },
];

export function SignedAreaExplorerWidget() {
  const [idx, setIdx] = useState(0);
  const preset = SIGNED_PRESETS[idx];
  const [b, setB] = useState(preset.bInit);

  const selectPreset = (i: number) => {
    setIdx(i);
    setB(SIGNED_PRESETS[i].bInit);
  };

  const netVal = preset.net(b);
  const absVal = preset.absArea(b);
  const posVal = (absVal + netVal) / 2;
  const negVal = (absVal - netVal) / 2;

  return (
    <div className="widget">
      <div className="widget-title">Előjeles terület vs. teljes geometriai terület</div>
      <div className="relbuttons chips" role="tablist" aria-label="Függvény választása">
        {SIGNED_PRESETS.map((p, i) => (
          <button key={p.id} type="button" className={idx === i ? 'on' : ''} onClick={() => selectPreset(i)}>
            {p.label}
          </button>
        ))}
      </div>

      <label>
        Felső határ: <M t={`b = ${tx(b, 2)}`} />
        <input
          type="range"
          min={preset.bMin}
          max={preset.bMax}
          step={preset.step}
          value={b}
          onChange={(e) => setB(Number(e.target.value))}
        />
      </label>

      <Chart
        xmin={preset.domain[0]}
        xmax={preset.domain[1]}
        ymin={preset.range[0]}
        ymax={preset.range[1]}
        h={230}
      >
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const steps = 120;
          const posStrips: JSX.Element[] = [];
          const negStrips: JSX.Element[] = [];
          if (b > preset.a) {
            const dx = (b - preset.a) / steps;
            for (let i = 0; i < steps; i++) {
              const x0 = preset.a + i * dx;
              const xm = x0 + dx / 2;
              const y = preset.fn(xm);
              const px = sx(x0);
              const pw = Math.max(0.5, sx(x0 + dx) - px + 0.4);
              if (y >= 0) {
                posStrips.push(
                  <rect key={`p${i}`} x={px} y={sy(y)} width={pw} height={sy(0) - sy(y)} fill="rgba(56,189,248,0.34)" />,
                );
              } else {
                negStrips.push(
                  <rect key={`n${i}`} x={px} y={sy(0)} width={pw} height={sy(y) - sy(0)} fill="rgba(251,113,133,0.34)" />,
                );
              }
            }
          }

          return (
            <>
              {posStrips}
              {negStrips}
              <line x1={sx(b)} y1={sy(0)} x2={sx(b)} y2={sy(preset.fn(b))} stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />
              <path d={curve(preset.fn, m, 260)} fill="none" stroke="#e2e8f0" strokeWidth={2.4} />
              <circle cx={sx(b)} cy={sy(preset.fn(b))} r={4} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <M t={`\\int_{${tx(preset.a, 1)}}^{${tx(b, 2)}} (${preset.formula})\\,dx = ${tx(netVal, 3)}`} />
        </p>
        <p>
          <M t={`A_{\\text{fent}} = ${tx(posVal, 3)}`} /> · <M t={`A_{\\text{lent}} = ${tx(negVal, 3)}`} /> ·{' '}
          <M t={`A_{\\text{össz}} = ${tx(absVal, 3)}`} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal: átlagérték (szintkiegyenlítés) */

type AvgPreset = {
  id: string;
  label: string;
  a: number;
  b: number;
  yMax: number;
  fn: Fn;
  integral: number;
  avgTex: string;
};

const AVG_PRESETS: AvgPreset[] = [
  {
    id: 'parabola',
    label: 'f(x) = x²  [0; 3]',
    a: 0,
    b: 3,
    yMax: 9.5,
    fn: (x) => x * x,
    integral: 9,
    avgTex: '3',
  },
  {
    id: 'semi',
    label: 'f(x) = √(4 − x²)  [−2; 2]',
    a: -2,
    b: 2,
    yMax: 2.5,
    fn: (x) => Math.sqrt(Math.max(0, 4 - x * x)),
    integral: 2 * Math.PI,
    avgTex: '\\dfrac{\\pi}{2} \\approx 1{,}571',
  },
  {
    id: 'wave',
    label: 'f(x) = 1 + 0,5 sin(πx/2)  [0; 4]',
    a: 0,
    b: 4,
    yMax: 2.0,
    fn: (x) => 1 + 0.5 * Math.sin((Math.PI * x) / 2),
    integral: 4,
    avgTex: '1',
  },
];

export function AverageValueWidget() {
  const [idx, setIdx] = useState(0);
  const preset = AVG_PRESETS[idx];
  const exactAvg = preset.integral / (preset.b - preset.a);
  const [level, setLevel] = useState(exactAvg);

  const selectPreset = (i: number) => {
    setIdx(i);
    const p = AVG_PRESETS[i];
    setLevel(p.integral / (p.b - p.a));
  };

  const rectArea = level * (preset.b - preset.a);
  const diff = rectArea - preset.integral;
  const isBalanced = Math.abs(diff) < 0.08;

  return (
    <div className="widget">
      <div className="widget-title">Folytonos függvény átlagértéke — „szintkiegyenlítés”</div>
      <div className="relbuttons chips" role="tablist" aria-label="Átlagérték görbe">
        {AVG_PRESETS.map((p, i) => (
          <button key={p.id} type="button" className={idx === i ? 'on' : ''} onClick={() => selectPreset(i)}>
            {p.label}
          </button>
        ))}
        <button type="button" onClick={() => setLevel(exactAvg)}>
          Pontos átlag (f_átlag)
        </button>
      </div>

      <label>
        Téglalap magassága: <M t={`c = ${tx(level, 3)}`} />
        <input
          type="range"
          min={0.1}
          max={preset.yMax - 0.3}
          step={0.05}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />
      </label>

      <Chart
        xmin={preset.a - 0.3}
        xmax={preset.b + 0.3}
        ymin={-0.3}
        ymax={preset.yMax}
        h={230}
      >
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const steps = 110;
          const dx = (preset.b - preset.a) / steps;
          const strips: JSX.Element[] = [];
          for (let i = 0; i < steps; i++) {
            const x0 = preset.a + i * dx;
            const xm = x0 + dx / 2;
            const y = preset.fn(xm);
            const px = sx(x0);
            const pw = Math.max(0.5, sx(x0 + dx) - px + 0.4);
            const yBase = Math.min(y, level);
            strips.push(
              <rect key={`b${i}`} x={px} y={sy(yBase)} width={pw} height={sy(0) - sy(yBase)} fill="rgba(56,189,248,0.22)" />,
            );
            if (y > level) {
              strips.push(
                <rect key={`hi${i}`} x={px} y={sy(y)} width={pw} height={sy(level) - sy(y)} fill="rgba(251,191,36,0.42)" />,
              );
            } else {
              strips.push(
                <rect key={`lo${i}`} x={px} y={sy(level)} width={pw} height={sy(y) - sy(level)} fill="rgba(251,113,133,0.34)" />,
              );
            }
          }

          return (
            <>
              {strips}
              <line
                x1={sx(preset.a)}
                y1={sy(level)}
                x2={sx(preset.b)}
                y2={sy(level)}
                stroke={isBalanced ? '#34d399' : '#fbbf24'}
                strokeWidth={2.4}
                strokeDasharray="6 3"
              />
              <path d={curve(preset.fn, m, 260)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Téglalap: <M t={`c(b-a) = ${tx(rectArea, 3)}`} /> · Integrál:{' '}
          <M t={`\\int_a^b f(x)\\,dx = ${tx(preset.integral, 3)}`} />
        </p>
        <p>
          Pontos átlag: <M t={`f_{\\text{átlag}} = ${preset.avgTex}`} />{' '}
          {isBalanced ? '— A sárga „hegy” pontosan kitölti a piros „völgyet”!' : ''}
        </p>
      </div>
    </div>
  );
}
