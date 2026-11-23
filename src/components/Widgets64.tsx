import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: interaktív libikóka */

export function SeesawBalanceWidget() {
  const [m1, setM1] = useState(4);
  const [x1, setX1] = useState(-3);
  const [m2, setM2] = useState(6);
  const [x2, setX2] = useState(2);

  const Mtot = m1 + m2;
  const M0 = m1 * x1 + m2 * x2;
  const xbar = M0 / Mtot;

  // x in [-5, 5] -> px in [40, 480]
  const px = (x: number) => 260 + x * 44;

  return (
    <div className="widget">
      <div className="widget-title">Libikóka-szimulátor: hol van az egyensúlyi pont (x̄)?</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Bal tömeg: <strong>m₁ = {m1} kg</strong> (x₁ = {x1})
          <input type="range" min={1} max={10} step={1} value={m1} onChange={(e) => setM1(Number(e.target.value))} />
          <input type="range" min={-5} max={0} step={1} value={x1} onChange={(e) => setX1(Number(e.target.value))} />
        </label>
        <label>
          Jobb tömeg: <strong>m₂ = {m2} kg</strong> (x₂ = {x2})
          <input type="range" min={1} max={10} step={1} value={m2} onChange={(e) => setM2(Number(e.target.value))} />
          <input type="range" min={0} max={5} step={1} value={x2} onChange={(e) => setX2(Number(e.target.value))} />
        </label>
      </div>

      <svg viewBox="0 0 520 145" className="plane" role="img" aria-label="Libikóka egyensúlyi pontja">
        <rect width={520} height={145} className="pl-bg" />

        {/* Skála */}
        {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={82} x2={px(t)} y2={90} stroke="#475569" strokeWidth={1.2} />
            <text x={px(t)} y={136} textAnchor="middle" fill="#64748b" fontSize={10}>{t}</text>
          </g>
        ))}

        {/* Rúd */}
        <line x1={32} y1={82} x2={488} y2={82} stroke="#94a3b8" strokeWidth={4} strokeLinecap="round" />

        {/* Alátámasztás (fulcrum) az x̄ pontban */}
        <polygon
          points={`${px(xbar)},84 ${px(xbar) - 14},116 ${px(xbar) + 14},116`}
          fill="rgba(52,211,153,0.35)"
          stroke="#34d399"
          strokeWidth={2}
        />
        <text x={px(xbar)} y={128} textAnchor="middle" fill="#a7f3d0" fontSize={11} fontWeight={700}>
          x̄ = {round(xbar, 2)}
        </text>

        {/* Tömeg 1 */}
        <circle cx={px(x1)} cy={62} r={10 + m1 * 1.4} fill="rgba(56,189,248,0.45)" stroke="#38bdf8" strokeWidth={2} />
        <text x={px(x1)} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={11.5} fontWeight={700}>{m1} kg</text>

        {/* Tömeg 2 */}
        <circle cx={px(x2)} cy={62} r={10 + m2 * 1.4} fill="rgba(251,146,60,0.45)" stroke="#fb923c" strokeWidth={2} />
        <text x={px(x2)} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={11.5} fontWeight={700}>{m2} kg</text>
      </svg>

      <div className="result">
        <p>
          Össztömeg: <M t={`M = ${Mtot}\\text{ kg}`} /> · Nyomaték: <M t={`M_0 = ${M0}`} /> · Tömegközéppont:{' '}
          <M t={`\\bar{x} = \\dfrac{${M0}}{${Mtot}} = ${tx(xbar, 2)}`} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: változó sűrűségű rúd */

type RodOpt = {
  id: string;
  label: string;
  deltaTex: string;
  M: number;
  xbar: number;
  xbarTex: string;
  density: (x: number) => number;
};

const ROD_OPTS: RodOpt[] = [
  {
    id: 'const',
    label: 'Állandó: δ(x) = 1',
    deltaTex: '1',
    M: 10,
    xbar: 5,
    xbarTex: '5',
    density: () => 1,
  },
  {
    id: 'lin',
    label: 'Lineáris: δ(x) = 1 + x/10',
    deltaTex: '1 + \\dfrac{x}{10}',
    M: 15,
    xbar: 50 / 9,
    xbarTex: '\\dfrac{50}{9} \\approx 5{,}56',
    density: (x) => 1 + x / 10,
  },
  {
    id: 'quad',
    label: 'Négyzetes: δ(x) = 1 + 0,06 x²',
    deltaTex: '1 + 0{,}06x^2',
    M: 30,
    xbar: 20 / 3,
    xbarTex: '\\dfrac{20}{3} \\approx 6{,}67',
    density: (x) => 1 + 0.06 * x * x,
  },
];

export function VariableDensityRodWidget() {
  const [idx, setIdx] = useState(1);
  const p = ROD_OPTS[idx];
  const px = (x: number) => 40 + x * 44;

  return (
    <div className="widget">
      <div className="widget-title">Változó sűrűségű rúd a [0; 10] intervallumon — merre tolódik el x̄?</div>
      <div className="relbuttons chips" role="tablist" aria-label="Sűrűség profil">
        {ROD_OPTS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 520 135" className="plane" role="img" aria-label="Változó sűrűségű rúd tömegközéppontja">
        <rect width={520} height={135} className="pl-bg" />

        {/* Rúd 40 szegmensben: vastagság és színintenzitás a sűrűség arányában */}
        {Array.from({ length: 40 }, (_, i) => {
          const x = (i + 0.5) * 0.25;
          const d = p.density(x);
          const norm = Math.min(1, (d - 0.8) / 6.2);
          const h = 14 + norm * 24;
          return (
            <rect
              key={i}
              x={px(i * 0.25)}
              y={56 - h / 2}
              width={11.5}
              height={h}
              fill={`rgba(56, 189, 248, ${0.28 + norm * 0.65})`}
            />
          );
        })}

        {/* Felezőpont x = 5 jelölés */}
        <line x1={px(5)} y1={24} x2={px(5)} y2={92} stroke="#64748b" strokeWidth={1.4} strokeDasharray="4 3" />
        <text x={px(5)} y={18} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>felező (x = 5)</text>

        {/* Tömegközéppont háromszög */}
        <polygon
          points={`${px(p.xbar)},78 ${px(p.xbar) - 12},106 ${px(p.xbar) + 12},106`}
          fill="rgba(251,191,36,0.45)"
          stroke="#fbbf24"
          strokeWidth={2}
        />
        <text x={px(p.xbar)} y={122} textAnchor="middle" fill="#fde68a" fontSize={11.5} fontWeight={700}>
          x̄ = {round(p.xbar, 2)}
        </text>
        <text x={px(0)} y={102} textAnchor="middle" fill="#64748b" fontSize={10}>0</text>
        <text x={px(10)} y={102} textAnchor="middle" fill="#64748b" fontSize={10}>10</text>
      </svg>

      <div className="result">
        <p>
          Sűrűség: <M t={`\\delta(x) = ${p.deltaTex}`} /> · Össztömeg: <M t={`M = ${p.M}`} /> · Tömegközéppont:{' '}
          <M t={`\\bar{x} = ${p.xbarTex}`} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: függőleges csík súlypontja */

export function StripCentroidDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Egy vékony függőleges lemezcsík saját tömegközéppontja</div>
      <svg viewBox="0 0 540 175" className="plane" role="img" aria-label="Függőleges csík tömegközéppontja">
        <rect width={540} height={175} className="pl-bg" />

        {/* Koordinátatengelyek */}
        <line x1={32} y1={145} x2={255} y2={145} stroke="#64748b" strokeWidth={1.3} />
        <line x1={48} y1={20} x2={48} y2={155} stroke="#64748b" strokeWidth={1.3} />

        {/* Görbék és tartomány */}
        <path d="M 70 68 Q 145 20 225 56 L 225 112 Q 145 128 70 105 Z" fill="rgba(56,189,248,0.18)" />
        <path d="M 60 72 Q 145 18 235 58" fill="none" stroke="#38bdf8" strokeWidth={2.4} />
        <path d="M 60 102 Q 145 130 235 110" fill="none" stroke="#fb923c" strokeWidth={2.4} />

        {/* Csík */}
        <rect x={140} y={44} width={12} height={74} fill="rgba(251,191,36,0.45)" stroke="#fbbf24" strokeWidth={1.6} />
        {/* Csík középpontja */}
        <circle cx={146} cy={81} r={4.5} fill="#34d399" />
        <line x1={48} y1={81} x2={146} y2={81} stroke="#34d399" strokeWidth={1.4} strokeDasharray="4 3" />
        <text x={146} y={160} textAnchor="middle" fill="#fde68a" fontSize={11.5} fontWeight={700}>x</text>
        <text x={38} y={85} textAnchor="end" fill="#a7f3d0" fontSize={11.5} fontWeight={700}>ỹ</text>

        {/* Jobb oldal: képlet magyarázat */}
        <rect x={274} y={16} width={250} height={142} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={399} y={38} textAnchor="middle" fill="#fbbf24" fontSize={12.5} fontWeight={700}>
          Csík méretei az x helyen:
        </text>
        <text x={288} y={64} fill="#e2e8f0" fontSize={11.5}>• Magasság: h = f(x) − g(x)</text>
        <text x={288} y={86} fill="#7dd3fc" fontSize={11.5}>• Tömeg: dm = δ(x)·[f(x) − g(x)] dx</text>
        <text x={288} y={108} fill="#a7f3d0" fontSize={11.5}>• Közepe: x̃ = x,  ỹ = (f(x) + g(x)) / 2</text>
        <text x={288} y={136} fill="#fed7aa" fontSize={11.5} fontWeight={700}>
          ⇒ dMₓ = ỹ·dm = ½δ(f² − g²) dx!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: híres síkidomok súlypontja */

type PlatePreset = {
  id: string;
  label: string;
  xr: [number, number];
  yr: [number, number];
  a: number;
  b: number;
  top: (x: number) => number;
  bot: (x: number) => number;
  cx: number;
  cy: number;
  coordTex: string;
};

const PLATE_PRESETS: PlatePreset[] = [
  {
    id: 'semi',
    label: 'Félkör (r = 3)',
    xr: [-3.4, 3.4],
    yr: [-0.4, 3.4],
    a: -3,
    b: 3,
    top: (x) => Math.sqrt(Math.max(0, 9 - x * x)),
    bot: () => 0,
    cx: 0,
    cy: 4 / Math.PI,
    coordTex: '\\left(0;\\;\\dfrac{4r}{3\\pi}\\right) = \\left(0;\\;\\dfrac{4}{\\pi}\\right) \\approx (0;\\,1{,}27)',
  },
  {
    id: 'parab',
    label: 'Parabola: y = 4 − x²',
    xr: [-2.4, 2.4],
    yr: [-0.4, 4.4],
    a: -2,
    b: 2,
    top: (x) => 4 - x * x,
    bot: () => 0,
    cx: 0,
    cy: 1.6,
    coordTex: '\\left(0;\\;\\dfrac{8}{5}\\right) = (0;\\,1{,}60)',
  },
  {
    id: 'tri',
    label: 'Derékszögű háromszög',
    xr: [-0.4, 3.4],
    yr: [-0.4, 3.4],
    a: 0,
    b: 3,
    top: (x) => 3 - x,
    bot: () => 0,
    cx: 1,
    cy: 1,
    coordTex: '\\left(\\dfrac{b}{3};\\;\\dfrac{h}{3}\\right) = (1;\\,1)',
  },
  {
    id: 'lens',
    label: 'y = x és y = x² köze',
    xr: [-0.15, 1.2],
    yr: [-0.15, 1.2],
    a: 0,
    b: 1,
    top: (x) => x,
    bot: (x) => x * x,
    cx: 0.5,
    cy: 0.4,
    coordTex: '\\left(\\dfrac{1}{2};\\;\\dfrac{2}{5}\\right) = (0{,}50;\\,0{,}40)',
  },
];

export function PlateCentroidExplorerWidget() {
  const [idx, setIdx] = useState(0);
  const p = PLATE_PRESETS[idx];

  return (
    <div className="widget">
      <div className="widget-title">Híres homogén síkidomok súlypontja (centroid)</div>
      <div className="relbuttons chips" role="tablist" aria-label="Síkidom választása">
        {PLATE_PRESETS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <Chart xmin={p.xr[0]} xmax={p.xr[1]} ymin={p.yr[0]} ymax={p.yr[1]} h={215}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 70;
          const pts: string[] = [];
          for (let i = 0; i <= st; i++) {
            const x = p.a + ((p.b - p.a) * i) / st;
            pts.push(`${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(p.top(x))}`);
          }
          for (let i = st; i >= 0; i--) {
            const x = p.a + ((p.b - p.a) * i) / st;
            pts.push(`L ${sx(x)} ${sy(p.bot(x))}`);
          }
          pts.push('Z');
          return (
            <>
              <path d={pts.join(' ')} fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth={2.2} />
              <line x1={sx(p.cx) - 10} y1={sy(p.cy)} x2={sx(p.cx) + 10} y2={sy(p.cy)} stroke="#fbbf24" strokeWidth={2} />
              <line x1={sx(p.cx)} y1={sy(p.cy) - 10} x2={sx(p.cx)} y2={sy(p.cy) + 10} stroke="#fbbf24" strokeWidth={2} />
              <circle cx={sx(p.cx)} cy={sy(p.cy)} r={5} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Pontos súlypont: <M t={`(\\bar{x};\\,\\bar{y}) = ${p.coordTex}`} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: félkör lemez vs. huzal */

export function WireVsPlateCentroidDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Félkörlemez vs. félkörhuzal — a súlypont akár a testen KÍVÜL is lehet!</div>
      <svg viewBox="0 0 540 175" className="plane" role="img" aria-label="Félkörlemez és félkörhuzal súlypontjának összehasonlítása">
        <rect width={540} height={175} className="pl-bg" />

        {/* Bal oldal: Félkörlemez */}
        <g transform="translate(18, 12)">
          <rect width={244} height={150} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={122} y={20} textAnchor="middle" fill="#7dd3fc" fontSize={12} fontWeight={700}>Teli félkörlemez</text>
          <path d="M 42 122 A 80 80 0 0 1 202 122 Z" fill="rgba(56,189,248,0.30)" stroke="#38bdf8" strokeWidth={2.2} />
          <circle cx={122} cy={122 - 80 * 0.424} r={5} fill="#fbbf24" />
          <text x={132} y={122 - 80 * 0.424 + 4} fill="#fde68a" fontSize={11} fontWeight={700}>ȳ = 4r/(3π) ≈ 0,424r</text>
          <text x={122} y={142} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>a lemez belsejében van</text>
        </g>

        {/* Jobb oldal: Félkörhuzal */}
        <g transform="translate(278, 12)">
          <rect width={244} height={150} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={122} y={20} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>Vékony félkörhuzal (ív)</text>
          <line x1={42} y1={122} x2={202} y2={122} stroke="#475569" strokeWidth={1.2} strokeDasharray="4 3" />
          <path d="M 42 122 A 80 80 0 0 1 202 122" fill="none" stroke="#34d399" strokeWidth={4} />
          <circle cx={122} cy={122 - 80 * 0.637} r={5} fill="#fbbf24" />
          <text x={122} y={122 - 80 * 0.637 + 18} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>ȳ = 2r/π ≈ 0,637r</text>
          <text x={122} y={142} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>az üres térben lebeg (magasabban!)</text>
        </g>
      </svg>
    </div>
  );
}
