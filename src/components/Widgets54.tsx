import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: integrál középértéktétel */

type MvtPreset = {
  id: string;
  label: string;
  a: number;
  b: number;
  yr: [number, number];
  fn: Fn;
  avg: number;
  c: number | null;
  avgTex: string;
  cTex: string;
  note: string;
};

const MVT_PRESETS: MvtPreset[] = [
  {
    id: 'lin',
    label: 'f(x) = 4 − x  [0; 3]',
    a: 0,
    b: 3,
    yr: [-0.4, 4.6],
    fn: (x) => 4 - x,
    avg: 2.5,
    c: 1.5,
    avgTex: '2{,}5',
    cTex: 'c = 1{,}5',
    note: 'A 3 × 2,5-ös téglalap területe (7,5) pontosan megegyezik a trapéz területével.',
  },
  {
    id: 'sq',
    label: 'f(x) = x²  [0; 3]',
    a: 0,
    b: 3,
    yr: [-0.5, 9.6],
    fn: (x) => x * x,
    avg: 3,
    c: Math.sqrt(3),
    avgTex: '3',
    cTex: 'c = \\sqrt{3} \\approx 1{,}732',
    note: 'Folytonos, ezért a parabola biztosan átmegy az y = 3 átlagszinten.',
  },
  {
    id: 'sin',
    label: 'f(x) = sin x  [0; π]',
    a: 0,
    b: Math.PI,
    yr: [-0.2, 1.3],
    fn: (x) => Math.sin(x),
    avg: 2 / Math.PI,
    c: Math.asin(2 / Math.PI),
    avgTex: '\\dfrac{2}{\\pi} \\approx 0{,}637',
    cTex: 'c_1 \\approx 0{,}690,\\; c_2 \\approx 2{,}452',
    note: 'Itt nem is egy, hanem KÉT olyan pont van a [0; π]-n, ahol f(c) = f_átlag!',
  },
  {
    id: 'step',
    label: 'Lépcsős (szakadásos!)',
    a: 0,
    b: 2,
    yr: [-0.3, 2.5],
    fn: (x) => (x < 1 ? 0 : 2),
    avg: 1,
    c: null,
    avgTex: '1',
    cTex: '\\text{NINCS ilyen } c!',
    note: 'Szakadásos függvénynél az átlagérték (1) egyetlen pontban sem adódik vissza — ezért kell a folytonosság!',
  },
];

export function IntegralMVTWidget() {
  const [idx, setIdx] = useState(0);
  const p = MVT_PRESETS[idx];

  return (
    <div className="widget">
      <div className="widget-title">Az integrálszámítás középértéktétele — mikor létezik c?</div>
      <div className="relbuttons chips" role="tablist" aria-label="Középértéktétel példák">
        {MVT_PRESETS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <Chart xmin={p.a - 0.3} xmax={p.b + 0.35} ymin={p.yr[0]} ymax={p.yr[1]} h={230}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const steps = 80;
          const pts: string[] = [`M ${sx(p.a)} ${sy(0)}`];
          if (p.id !== 'step') {
            for (let i = 0; i <= steps; i++) {
              const x = p.a + ((p.b - p.a) * i) / steps;
              pts.push(`L ${sx(x)} ${sy(p.fn(x))}`);
            }
            pts.push(`L ${sx(p.b)} ${sy(0)} Z`);
          }
          const c2 = p.id === 'sin' ? Math.PI - (p.c ?? 0) : null;

          return (
            <>
              {/* Görbe alatti terület */}
              {p.id !== 'step' ? (
                <path d={pts.join(' ')} fill="rgba(56,189,248,0.22)" />
              ) : (
                <rect x={sx(1)} y={sy(2)} width={sx(2) - sx(1)} height={sy(0) - sy(2)} fill="rgba(56,189,248,0.22)" />
              )}

              {/* Azonos területű átlag-téglalap */}
              <rect
                x={sx(p.a)}
                y={sy(p.avg)}
                width={sx(p.b) - sx(p.a)}
                height={sy(0) - sy(p.avg)}
                fill="rgba(251,191,36,0.16)"
                stroke="#fbbf24"
                strokeWidth={1.8}
                strokeDasharray="6 3"
              />

              {/* Görbe */}
              {p.id !== 'step' ? (
                <path d={curve(p.fn, m, 260)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              ) : (
                <>
                  <line x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(0)} stroke="#38bdf8" strokeWidth={2.6} />
                  <line x1={sx(1)} y1={sy(2)} x2={sx(2)} y2={sy(2)} stroke="#38bdf8" strokeWidth={2.6} />
                  <circle cx={sx(1)} cy={sy(0)} r={3.5} fill="#0f172a" stroke="#38bdf8" strokeWidth={2} />
                  <circle cx={sx(1)} cy={sy(2)} r={3.5} fill="#38bdf8" />
                </>
              )}

              {/* c pont(ok) jelölése */}
              {p.c !== null && (
                <>
                  <line x1={sx(p.c)} y1={sy(0)} x2={sx(p.c)} y2={sy(p.avg)} stroke="#34d399" strokeWidth={1.8} strokeDasharray="4 3" />
                  <circle cx={sx(p.c)} cy={sy(p.avg)} r={5} fill="#34d399" />
                  <text x={sx(p.c)} y={sy(0) + 15} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>c</text>
                </>
              )}
              {c2 !== null && (
                <>
                  <line x1={sx(c2)} y1={sy(0)} x2={sx(c2)} y2={sy(p.avg)} stroke="#34d399" strokeWidth={1.8} strokeDasharray="4 3" />
                  <circle cx={sx(c2)} cy={sy(p.avg)} r={5} fill="#34d399" />
                  <text x={sx(c2)} y={sy(0) + 15} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>c₂</text>
                </>
              )}
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Átlagérték: <M t={`f_{\\text{átlag}} = ${p.avgTex}`} /> · Középérték-hely: <M t={p.cTex} />
        </p>
        <p>{p.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: területfüggvény F(x) és F'(x) = f(x) */

type AccumPreset = {
  id: string;
  label: string;
  fTex: string;
  FTex: string;
  fn: Fn;
  F: Fn;
  xr: [number, number];
  yr: [number, number];
  xMax: number;
};

const ACCUM_PRESETS: AccumPreset[] = [
  {
    id: 'lin',
    label: 'f(t) = t',
    fTex: 't',
    FTex: '\\dfrac{x^2}{2}',
    fn: (t) => t,
    F: (x) => 0.5 * x * x,
    xr: [-0.2, 4.2],
    yr: [-0.3, 4.4],
    xMax: 3.6,
  },
  {
    id: 'cos',
    label: 'f(t) = cos t',
    fTex: '\\cos t',
    FTex: '\\sin x',
    fn: (t) => Math.cos(t),
    F: (x) => Math.sin(x),
    xr: [-0.2, 4.8],
    yr: [-1.3, 1.4],
    xMax: 4.4,
  },
  {
    id: 'par',
    label: 'f(t) = 0,5 t² + 0,4',
    fTex: '0{,}5t^2+0{,}4',
    FTex: '\\dfrac{x^3}{6}+0{,}4x',
    fn: (t) => 0.5 * t * t + 0.4,
    F: (x) => (x * x * x) / 6 + 0.4 * x,
    xr: [-0.2, 3.2],
    yr: [-0.3, 5.2],
    xMax: 2.8,
  },
];

export function AreaAccumulationWidget() {
  const [idx, setIdx] = useState(0);
  const p = ACCUM_PRESETS[idx];
  const [x, setX] = useState(2.0);
  const [h, setH] = useState(0.35);

  const selectP = (i: number) => {
    setIdx(i);
    setX(Math.min(2.0, ACCUM_PRESETS[i].xMax - 0.5));
  };

  const Fx = p.F(x);
  const Fxh = p.F(x + h);
  const diffQuot = (Fxh - Fx) / h;
  const fx = p.fn(x);

  return (
    <div className="widget">
      <div className="widget-title">A területfüggvény növekedési sebessége: F′(x) = f(x)</div>
      <div className="relbuttons chips" role="tablist" aria-label="Területfüggvény példa">
        {ACCUM_PRESETS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => selectP(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <label>
        Felső határ: <M t={`x = ${tx(x, 2)}`} />
        <input type="range" min={0.2} max={p.xMax} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <label>
        Keskeny sáv szélessége: <M t={`h = ${tx(h, 2)}`} />
        <input type="range" min={0.05} max={0.6} step={0.05} value={h} onChange={(e) => setH(Number(e.target.value))} />
      </label>

      <Chart xmin={p.xr[0]} xmax={p.xr[1]} ymin={p.yr[0]} ymax={p.yr[1]} h={225}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const buildRegion = (x0: number, x1: number) => {
            const pts: string[] = [`M ${sx(x0)} ${sy(0)}`];
            const st = 50;
            for (let i = 0; i <= st; i++) {
              const t = x0 + ((x1 - x0) * i) / st;
              pts.push(`L ${sx(t)} ${sy(p.fn(t))}`);
            }
            pts.push(`L ${sx(x1)} ${sy(0)} Z`);
            return pts.join(' ');
          };

          return (
            <>
              {/* F(x) területe 0-tól x-ig */}
              <path d={buildRegion(0, x)} fill="rgba(56,189,248,0.24)" />
              {/* ΔF = F(x+h) - F(x) sáv */}
              <path d={buildRegion(x, x + h)} fill="rgba(251,191,36,0.48)" stroke="#fbbf24" strokeWidth={1.3} />
              {/* Közelítő f(x)·h téglalap */}
              <rect
                x={sx(x)}
                y={sy(Math.max(0, fx))}
                width={sx(x + h) - sx(x)}
                height={Math.abs(sy(fx) - sy(0))}
                fill="none"
                stroke="#34d399"
                strokeWidth={1.6}
                strokeDasharray="4 2"
              />
              <path d={curve(p.fn, m, 260)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <circle cx={sx(x)} cy={sy(fx)} r={4.5} fill="#34d399" />
              <text x={sx(x)} y={sy(0) + 15} textAnchor="middle" fill="#a7f3d0" fontSize={11.5} fontWeight={700}>x</text>
              <text x={sx(x + h)} y={sy(0) + 15} textAnchor="middle" fill="#fde68a" fontSize={11}>x+h</text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <M t={`F(x) = \\int_0^x (${p.fTex})\\,dt = ${p.FTex} = ${tx(Fx, 3)}`} />
        </p>
        <p>
          Átlagos növekedés: <M t={`\\dfrac{F(x+h)-F(x)}{h} = ${tx(diffQuot, 4)}`} /> · Pontos derivált:{' '}
          <M t={`f(x) = ${tx(fx, 4)}`} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: változó határok deriválása (4 eset) */

export function LeibnizRuleDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Változó határok deriválása — a 4 alapeset térképe</div>
      <svg viewBox="0 0 540 210" className="plane" role="img" aria-label="Leibniz-féle deriválási szabály 4 esete">
        <rect width={540} height={210} className="pl-bg" />

        {/* 1. Alapeset */}
        <g transform="translate(12, 12)">
          <rect width={252} height={88} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={12} y={20} fill="#34d399" fontSize={11.5} fontWeight={700}>1. Alapeset (x felül)</text>
          <text x={12} y={48} fill="#e2e8f0" fontSize={14} fontFamily="Georgia, serif">d/dx [ ∫ₐˣ f(t) dt ] = </text>
          <text x={156} y={48} fill="#34d399" fontSize={15} fontWeight={700} fontFamily="Georgia, serif">f(x)</text>
          <text x={12} y={72} fill="#94a3b8" fontSize={10.5}>Csak behelyettesítjük x-et a t helyére.</text>
        </g>

        {/* 2. Alsó határ x */}
        <g transform="translate(276, 12)">
          <rect width={252} height={88} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={12} y={20} fill="#fb7185" fontSize={11.5} fontWeight={700}>2. x az alsó határon</text>
          <text x={12} y={48} fill="#e2e8f0" fontSize={14} fontFamily="Georgia, serif">d/dx [ ∫ₓᵇ f(t) dt ] = </text>
          <text x={156} y={48} fill="#fb7185" fontSize={15} fontWeight={700} fontFamily="Georgia, serif">−f(x)</text>
          <text x={12} y={72} fill="#94a3b8" fontSize={10.5}>Határcsere miatt előjelváltás!</text>
        </g>

        {/* 3. Láncszabály */}
        <g transform="translate(12, 110)">
          <rect width={252} height={88} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={12} y={20} fill="#fbbf24" fontSize={11.5} fontWeight={700}>3. Összetett felső határ u(x)</text>
          <text x={12} y={48} fill="#e2e8f0" fontSize={13.5} fontFamily="Georgia, serif">d/dx [ ∫ₐᵘ⁽ˣ⁾ f(t) dt ] =</text>
          <text x={12} y={70} fill="#fbbf24" fontSize={14} fontWeight={700} fontFamily="Georgia, serif">f(u(x)) · u′(x)</text>
          <text x={128} y={70} fill="#94a3b8" fontSize={10.5}>(ne felejtsd u′(x)-et!)</text>
        </g>

        {/* 4. Mindkét határ változó */}
        <g transform="translate(276, 110)">
          <rect width={252} height={88} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={12} y={20} fill="#38bdf8" fontSize={11.5} fontWeight={700}>4. Mindkét határ függvény</text>
          <text x={12} y={48} fill="#e2e8f0" fontSize={13.5} fontFamily="Georgia, serif">d/dx [ ∫ᵥ⁽ˣ⁾ᵘ⁽ˣ⁾ f(t) dt ] =</text>
          <text x={12} y={70} fill="#38bdf8" fontSize={13.5} fontWeight={700} fontFamily="Georgia, serif">f(u(x))·u′(x) − f(v(x))·v′(x)</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: az analízis nagy hídja (FTC 1 & 2) */

export function FTCLoopDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Az analízis nagy hídja — deriválás és integrálás kapcsolata</div>
      <svg viewBox="0 0 540 175" className="plane" role="img" aria-label="Newton-Leibniz-tétel 1. és 2. részének összefüggése">
        <rect width={540} height={175} className="pl-bg" />

        {/* Bal doboz: f(x) */}
        <rect x={22} y={54} width={132} height={66} rx={10} fill="#0f172a" stroke="#38bdf8" strokeWidth={2} />
        <text x={88} y={82} textAnchor="middle" fill="#7dd3fc" fontSize={15} fontWeight={700}>f(x)</text>
        <text x={88} y={102} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>folytonos függvény</text>

        {/* Jobb doboz: F(x) */}
        <rect x={386} y={54} width={132} height={66} rx={10} fill="#0f172a" stroke="#34d399" strokeWidth={2} />
        <text x={452} y={82} textAnchor="middle" fill="#a7f3d0" fontSize={15} fontWeight={700}>F(x) = ∫ₐˣ f(t)dt</text>
        <text x={452} y={102} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>primitív függvény</text>

        {/* Felső nyíl: integrálás */}
        <path d="M 158 66 Q 270 14 382 66" fill="none" stroke="#fbbf24" strokeWidth={2.2} />
        <polygon points="384,67 372,66 377,57" fill="#fbbf24" />
        <text x={270} y={26} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>Integrálás: ∫ₐᵇ f(x) dx = G(b) − G(a)</text>
        <text x={270} y={42} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>(2. rész — a +C állandó kiesik!)</text>

        {/* Alsó nyíl: deriválás */}
        <path d="M 382 108 Q 270 160 158 108" fill="none" stroke="#c084fc" strokeWidth={2.2} />
        <polygon points="156,107 168,108 163,117" fill="#c084fc" />
        <text x={270} y={148} textAnchor="middle" fill="#e9d5ff" fontSize={12} fontWeight={700}>Deriválás: d/dx ∫ₐˣ f(t) dt = f(x)</text>
        <text x={270} y={163} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>(1. rész — visszaadja az eredeti f-et)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: teljes terület vs. előjeles integrál */

type SplitPreset = {
  id: string;
  label: string;
  a: number;
  b: number;
  yr: [number, number];
  fn: Fn;
  pieces: { x0: number; x1: number; val: number; label: string }[];
  netTex: string;
  totalTex: string;
};

const SPLIT_PRESETS: SplitPreset[] = [
  {
    id: 'sin',
    label: 'sin x  [0; 2π]',
    a: 0,
    b: 2 * Math.PI,
    yr: [-1.3, 1.3],
    fn: (x) => Math.sin(x),
    pieces: [
      { x0: 0, x1: Math.PI, val: 2, label: '+2' },
      { x0: Math.PI, x1: 2 * Math.PI, val: -2, label: '−2' },
    ],
    netTex: '2 + (-2) = 0',
    totalTex: '|2| + |-2| = 4',
  },
  {
    id: 'quad',
    label: 'x² − 1  [−2; 2]',
    a: -2,
    b: 2,
    yr: [-1.4, 3.4],
    fn: (x) => x * x - 1,
    pieces: [
      { x0: -2, x1: -1, val: 4 / 3, label: '+4/3' },
      { x0: -1, x1: 1, val: -4 / 3, label: '−4/3' },
      { x0: 1, x1: 2, val: 4 / 3, label: '+4/3' },
    ],
    netTex: '\\dfrac{4}{3} - \\dfrac{4}{3} + \\dfrac{4}{3} = \\dfrac{4}{3}',
    totalTex: '\\dfrac{4}{3} + \\dfrac{4}{3} + \\dfrac{4}{3} = 4',
  },
  {
    id: 'cubic',
    label: 'x³ − x  [−1; 1]',
    a: -1,
    b: 1,
    yr: [-0.6, 0.6],
    fn: (x) => x * x * x - x,
    pieces: [
      { x0: -1, x1: 0, val: 0.25, label: '+1/4' },
      { x0: 0, x1: 1, val: -0.25, label: '−1/4' },
    ],
    netTex: '\\dfrac{1}{4} - \\dfrac{1}{4} = 0',
    totalTex: '\\left|\\dfrac{1}{4}\\right| + \\left|-\\dfrac{1}{4}\\right| = \\dfrac{1}{2}',
  },
];

export function TotalAreaSplitWidget() {
  const [idx, setIdx] = useState(0);
  const p = SPLIT_PRESETS[idx];

  return (
    <div className="widget">
      <div className="widget-title">Előjelváltó görbék felbontása zérushelyeknél</div>
      <div className="relbuttons chips" role="tablist" aria-label="Teljes terület példa">
        {SPLIT_PRESETS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <Chart xmin={p.a - 0.25} xmax={p.b + 0.25} ymin={p.yr[0]} ymax={p.yr[1]} h={225}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          return (
            <>
              {p.pieces.map((pc, i) => {
                const st = 50;
                const pts: string[] = [`M ${sx(pc.x0)} ${sy(0)}`];
                for (let k = 0; k <= st; k++) {
                  const x = pc.x0 + ((pc.x1 - pc.x0) * k) / st;
                  pts.push(`L ${sx(x)} ${sy(p.fn(x))}`);
                }
                pts.push(`L ${sx(pc.x1)} ${sy(0)} Z`);
                const xm = (pc.x0 + pc.x1) / 2;
                const ym = p.fn(xm) * 0.5;
                return (
                  <g key={i}>
                    <path
                      d={pts.join(' ')}
                      fill={pc.val >= 0 ? 'rgba(56,189,248,0.30)' : 'rgba(251,113,133,0.30)'}
                    />
                    <text
                      x={sx(xm)}
                      y={sy(ym)}
                      textAnchor="middle"
                      fill={pc.val >= 0 ? '#bae6fd' : '#fecdd3'}
                      fontSize={12}
                      fontWeight={700}
                    >
                      {pc.label}
                    </text>
                  </g>
                );
              })}
              <path d={curve(p.fn, m, 260)} fill="none" stroke="#e2e8f0" strokeWidth={2.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Előjeles (nettó) integrál: <M t={p.netTex} />
        </p>
        <p>
          Teljes geometriai terület: <M t={p.totalTex} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal: sebesség → elmozdulás vs. megtett út */

export function VelocityDisplacementWidget() {
  // v(t) = t² - 3t + 2 = (t-1)(t-2) on [0, T], T in [0.2, 3.2]
  const [T, setT] = useState(2.5);
  const v: Fn = (t) => t * t - 3 * t + 2;
  const F = (t: number) => (t * t * t) / 3 - 1.5 * t * t + 2 * t;

  const disp = F(T) - F(0);
  // v >= 0 on [0,1], v <= 0 on [1,2], v >= 0 on [2, 3.2]
  let dist = 0;
  if (T <= 1) {
    dist = F(T);
  } else if (T <= 2) {
    dist = F(1) + -(F(T) - F(1));
  } else {
    dist = F(1) + -(F(2) - F(1)) + (F(T) - F(2));
  }

  return (
    <div className="widget">
      <div className="widget-title">Nettó változás: elmozdulás vs. megtett út (v(t) = t² − 3t + 2)</div>
      <label>
        Időtartam: <M t={`T = ${tx(T, 2)}\\text{ s}`} />
        <input type="range" min={0.2} max={3.2} step={0.1} value={T} onChange={(e) => setT(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.2} xmax={3.4} ymin={-0.6} ymax={2.7} h={220}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const steps = 100;
          const dx = T / steps;
          const strips: JSX.Element[] = [];
          for (let i = 0; i < steps; i++) {
            const t0 = i * dx;
            const y = v(t0 + dx / 2);
            const px = sx(t0);
            const pw = Math.max(0.6, sx(t0 + dx) - px + 0.4);
            strips.push(
              <rect
                key={i}
                x={px}
                y={y >= 0 ? sy(y) : sy(0)}
                width={pw}
                height={Math.abs(sy(y) - sy(0))}
                fill={y >= 0 ? 'rgba(56,189,248,0.34)' : 'rgba(251,113,133,0.38)'}
              />,
            );
          }
          return (
            <>
              {strips}
              <line x1={sx(T)} y1={sy(0)} x2={sx(T)} y2={sy(v(T))} stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />
              <path d={curve(v, m, 260)} fill="none" stroke="#e2e8f0" strokeWidth={2.4} />
              <circle cx={sx(T)} cy={sy(v(T))} r={4} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Elmozdulás (előjeles): <M t={`\\Delta s = \\int_0^{${tx(T, 2)}} v(t)\\,dt = ${tx(disp, 3)}\\text{ m}`} />
        </p>
        <p>
          Teljes megtett út: <M t={`d = \\int_0^{${tx(T, 2)}} |v(t)|\\,dt = ${tx(dist, 3)}\\text{ m}`} />{' '}
          (az <M t="[1;\,2]" /> szakaszon a test visszafelé halad!)
        </p>
      </div>
    </div>
  );
}
