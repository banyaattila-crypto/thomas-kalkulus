import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: 3 fogaskerék (láncszabály) */

export function GearChainWidget() {
  const [xTurn, setXTurn] = useState(0.4);
  const g1 = 3; // du/dx = 3
  const g2 = 0.5; // dy/du = 1/2
  const uTurn = g1 * xTurn;
  const yTurn = g2 * uTurn;

  const gear = (cx: number, cy: number, r: number, turns: number, color: string, label: string, sub: string) => {
    const ang = turns * 2 * Math.PI;
    const x2 = cx + (r - 6) * Math.cos(ang - Math.PI / 2);
    const y2 = cy + (r - 6) * Math.sin(ang - Math.PI / 2);
    const ticks = Array.from({ length: 12 }, (_, i) => {
      const a = ang + (i * 2 * Math.PI) / 12;
      return (
        <line
          key={i}
          x1={cx + (r - 3) * Math.cos(a)}
          y1={cy + (r - 3) * Math.sin(a)}
          x2={cx + (r + 5) * Math.cos(a)}
          y2={cy + (r + 5) * Math.sin(a)}
          stroke={color}
          strokeWidth={2.4}
        />
      );
    });
    return (
      <g>
        {ticks}
        <circle cx={cx} cy={cy} r={r} fill="rgba(255,255,255,0.05)" stroke={color} strokeWidth={2.2} />
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth={3} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={4} fill={color} />
        <text x={cx} y={cy + r + 22} textAnchor="middle" fill={color} className="pl-label">{label}</text>
        <text x={cx} y={cy + r + 38} textAnchor="middle" fill="#94a3b8" fontSize={11}>{sub}</text>
      </g>
    );
  };

  return (
    <div className="widget">
      <div className="widget-title">Három fogaskerék: miért szorzódnak össze a deriváltak?</div>
      <label>
        A kerék elfordulása: x = {round(xTurn, 2)} fordulat
        <input type="range" min={0} max={2} step={0.05} value={xTurn} onChange={(e) => setXTurn(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 460 190" className="plane" role="img" aria-label="Három összekapcsolt fogaskerék">
        <rect width={460} height={190} className="pl-bg" />
        {gear(95, 78, 48, xTurn, '#38bdf8', `A: x = ${round(xTurn, 2)}`, 'bemenet')}
        {gear(215, 78, 22, -uTurn, '#34d399', `B: u = ${round(uTurn, 2)}`, 'du/dx = 3')}
        {gear(340, 78, 42, yTurn, '#fb923c', `C: y = ${round(yTurn, 2)}`, 'dy/du = 1/2')}
      </svg>
      <div className="result">
        <M block t={`\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx} = \\frac{1}{2}\\cdot 3 = \\frac{3}{2}`} />
        <p>
          Ha <M t="A" /> egyet fordul, <M t="B" /> hármat pörög; ha <M t="B" /> hármat pörög, <M t="C" /> másfelet fordul — a két áttétel pontosan összeszorzódik!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: kívülről befelé réteg-diagram */

export function OutsideInsideDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A „kívülről befelé” szabály (hagyma-modell)</div>
      <svg viewBox="0 0 520 135" className="plane" role="img" aria-label="Kívülről befelé deriválás diagram">
        <rect width={520} height={135} className="pl-bg" />
        {/* Eredeti */}
        <rect x={14} y={28} width={145} height={52} rx={12} fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={45} y={60} fill="#7dd3fc" fontSize={16} fontWeight={700}>sin(</text>
        <rect x={80} y={38} width={62} height={32} rx={8} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={1.5} />
        <text x={111} y={59} textAnchor="middle" fill="#6ee7b7" fontSize={14} fontWeight={700}>x² + x</text>
        <text x={146} y={60} fill="#7dd3fc" fontSize={16} fontWeight={700}>)</text>
        <text x={86} y={102} textAnchor="middle" fill="#94a3b8" fontSize={11}>külső: sin(·), belső: x²+x</text>

        <text x={178} y={61} textAnchor="middle" fill="#fbbf24" fontSize={20} fontWeight={700}>→</text>

        {/* Derivált */}
        <rect x={198} y={28} width={160} height={52} rx={12} fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={228} y={60} fill="#7dd3fc" fontSize={16} fontWeight={700}>cos(</text>
        <rect x={268} y={38} width={64} height={32} rx={8} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={1.5} />
        <text x={300} y={59} textAnchor="middle" fill="#6ee7b7" fontSize={14} fontWeight={700}>x² + x</text>
        <text x={338} y={60} fill="#7dd3fc" fontSize={16} fontWeight={700}>)</text>
        <text x={278} y={102} textAnchor="middle" fill="#7dd3fc" fontSize={11}>külső derivált (belső marad!)</text>

        <text x={374} y={61} textAnchor="middle" fill="#e2e8f0" fontSize={20} fontWeight={700}>·</text>

        <rect x={390} y={28} width={114} height={52} rx={12} fill="rgba(251,146,60,0.2)" stroke="#fb923c" strokeWidth={1.8} />
        <text x={447} y={60} textAnchor="middle" fill="#fed7aa" fontSize={15} fontWeight={700}>(2x + 1)</text>
        <text x={447} y={102} textAnchor="middle" fill="#fb923c" fontSize={11}>belső deriváltja</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: láncszabály-léptető */

type ChainEx = {
  id: string;
  name: string;
  steps: { label: string; tex: string; note: string }[];
};

const CHAIN_EX: ChainEx[] = [
  {
    id: 'pow',
    name: '(5x³ − x⁴)⁷',
    steps: [
      { label: '1. Rétegek azonosítása', tex: 'y = u^7,\\qquad u = 5x^3 - x^4', note: 'Külső függvény: 7. hatvány. Belső függvény: 5x³ − x⁴.' },
      { label: '2. Külső derivált (u marad!)', tex: '7u^6\\cdot u\' = 7(5x^3 - x^4)^6 \\cdot (5x^3 - x^4)\'', note: 'A kitevőt lehozzuk és csökkentjük, de a zárójel belsejét érintetlenül hagyjuk.' },
      { label: '3. Szorzás a belső deriváltjával', tex: 'y\' = 7(5x^3 - x^4)^6 (15x^2 - 4x^3)', note: 'Kész! Nem kell felbontani a 6. hatványt.' },
    ],
  },
  {
    id: 'sin5',
    name: 'sin⁵ x',
    steps: [
      { label: '1. Átírás zárójellel', tex: 'y = (\\sin x)^5 \\;\\Longrightarrow\\; u = \\sin x', note: 'A sin⁵ x jelentése (sin x)⁵ — tehát a külső függvény az 5. hatvány!' },
      { label: '2. Külső derivált', tex: '5(\\sin x)^4 \\cdot (\\sin x)\'', note: 'A hatványszabályt alkalmazzuk az egész (sin x) blokkra.' },
      { label: '3. Belső derivált', tex: 'y\' = 5\\sin^4 x\\,\\cos x', note: 'A szinusz deriváltja cos x.' },
    ],
  },
  {
    id: 'triple',
    name: 'cos³(2x)',
    steps: [
      { label: '1. Három réteg!', tex: 'y = (\\cos(2x))^3', note: '1. réteg: (·)³, 2. réteg: cos(·), 3. réteg: 2x.' },
      { label: '2. Első két réteg', tex: '3\\cos^2(2x) \\cdot (-\\sin(2x)) \\cdot (2x)\'', note: 'Először a köböt deriváljuk, majd a koszinuszt (mínuszjel!).' },
      { label: '3. Legbelső réteg', tex: 'y\' = -6\\cos^2(2x)\\sin(2x)', note: 'A (2x)′ = 2 szorzóval összerendezve.' },
    ],
  },
];

export function ChainStepperWidget() {
  const [ci, setCi] = useState(1);
  const [st, setSt] = useState(0);
  const ex = CHAIN_EX[ci];

  return (
    <div className="widget">
      <div className="widget-title">Hatványláncszabály lépésről lépésre</div>
      <div className="relbuttons chips">
        {CHAIN_EX.map((q, i) => (
          <button key={q.id} className={ci === i ? 'on' : ''} onClick={() => { setCi(i); setSt(0); }}>
            {q.name}
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {ex.steps.map((s, i) => (
          <button key={s.label} className={st === i ? 'on' : ''} onClick={() => setSt(i)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="result">
        <M block t={ex.steps[st].tex} />
        <p>{ex.steps[st].note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: paraméteres görbék szimulátora */

type ParamEx = {
  id: string;
  name: string;
  tex: string;
  x: (t: number) => number;
  y: (t: number) => number;
  tMin: number;
  tMax: number;
  xr: [number, number];
  yr: [number, number];
  note: string;
};

const PARAM_EX: ParamEx[] = [
  {
    id: 'circ',
    name: 'Kör (2 cos t; 2 sin t)',
    tex: 'x=2\\cos t,\\; y=2\\sin t,\\; t\\in[0;\\,2\\pi]',
    x: (t) => 2 * Math.cos(t),
    y: (t) => 2 * Math.sin(t),
    tMin: 0,
    tMax: 2 * Math.PI,
    xr: [-3.2, 3.2],
    yr: [-3.2, 3.2],
    note: 'A (2; 0) pontból indulva az óramutató járásával ellentétesen járja be az x² + y² = 4 kört.',
  },
  {
    id: 'ell',
    name: 'Ellipszis (3 cos t; 1,5 sin t)',
    tex: 'x=3\\cos t,\\; y=1{,}5\\sin t,\\; t\\in[0;\\,2\\pi]',
    x: (t) => 3 * Math.cos(t),
    y: (t) => 1.5 * Math.sin(t),
    tMin: 0,
    tMax: 2 * Math.PI,
    xr: [-3.8, 3.8],
    yr: [-2.5, 2.5],
    note: 'Descartes-egyenlete x²/9 + y²/2,25 = 1 — nem egyetlen y = f(x) függvény, paraméteresen mégis könnyen kezelhető!',
  },
  {
    id: 'liss',
    name: 'Nyolcas (2 sin 2t; 2 sin t)',
    tex: 'x=2\\sin(2t),\\; y=2\\sin t,\\; t\\in[0;\\,2\\pi]',
    x: (t) => 2 * Math.sin(2 * t),
    y: (t) => 2 * Math.sin(t),
    tMin: 0,
    tMax: 2 * Math.PI,
    xr: [-3, 3],
    yr: [-2.8, 2.8],
    note: 'Önmagát metsző Lissajous-görbe: az origón kétszer, két különböző iránnyal halad át!',
  },
];

function paramPath(fx: (t: number) => number, fy: (t: number) => number, a: number, b: number, m: { X: (v: number) => number; Y: (v: number) => number }, N = 240): string {
  let d = '';
  for (let i = 0; i <= N; i++) {
    const t = a + ((b - a) * i) / N;
    d += `${i === 0 ? 'M' : 'L'}${m.X(fx(t)).toFixed(1)},${m.Y(fy(t)).toFixed(1)} `;
  }
  return d;
}

export function ParamCurveWidget() {
  const [pi, setPi] = useState(1);
  const [t, setT] = useState(1.2);
  const ex = PARAM_EX[pi];
  const tc = Math.min(ex.tMax, Math.max(ex.tMin, t));
  const px = ex.x(tc);
  const py = ex.y(tc);

  return (
    <div className="widget">
      <div className="widget-title">Paraméteres görbe: egy részecske pályája a síkban</div>
      <div className="relbuttons chips">
        {PARAM_EX.map((q, i) => (
          <button key={q.id} className={pi === i ? 'on' : ''} onClick={() => { setPi(i); setT(1.0); }}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <label>
        paraméter (idő): t = {round(tc, 2)} (helyzet: ({round(px, 2)}; {round(py, 2)}))
        <input type="range" min={ex.tMin} max={ex.tMax} step={0.05} value={tc} onChange={(e) => setT(Number(e.target.value))} />
      </label>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={250}>
        {(m) => (
          <>
            <path d={paramPath(ex.x, ex.y, ex.tMin, ex.tMax, m)} className="pl-dash2" />
            <path d={paramPath(ex.x, ex.y, ex.tMin, tc, m)} className="pl-main" />
            <circle cx={m.X(ex.x(ex.tMin))} cy={m.Y(ex.y(ex.tMin))} r={4.5} fill="#34d399" />
            <circle cx={m.X(px)} cy={m.Y(py)} r={6.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: paraméteres érintő és meredekség */

export function ParamSlopeWidget() {
  const [t, setT] = useState(0.8);
  // Ellipszis: x = 3 cos t, y = 2 sin t
  const px = 3 * Math.cos(t);
  const py = 2 * Math.sin(t);
  const dxdt = -3 * Math.sin(t);
  const dydt = 2 * Math.cos(t);
  const vertical = Math.abs(dxdt) < 0.08;
  const slope = vertical ? NaN : dydt / dxdt;

  return (
    <div className="widget">
      <div className="widget-title">Paraméteres érintő: dy/dx = (dy/dt) / (dx/dt)</div>
      <p className="legend">
        <M t="x=3\cos t,\; y=2\sin t \;\Longrightarrow\; \dfrac{dx}{dt}=-3\sin t,\; \dfrac{dy}{dt}=2\cos t" />
      </p>
      <label>
        t = {round(t, 2)} rad
        <input type="range" min={0} max={6.28} step={0.05} value={t} onChange={(e) => setT(Number(e.target.value))} />
      </label>
      <Chart xmin={-4} xmax={4} ymin={-3} ymax={3} h={240}>
        {(m) => (
          <>
            <path d={paramPath((u) => 3 * Math.cos(u), (u) => 2 * Math.sin(u), 0, 2 * Math.PI, m)} className="pl-main" />
            {vertical ? (
              <line x1={m.X(px)} y1={0} x2={m.X(px)} y2={m.h} className="pl-alt" />
            ) : (
              <path d={curve((x) => py + slope * (x - px), m, 60)} className="pl-alt" />
            )}
            <circle cx={m.X(px)} cy={m.Y(py)} r={6} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="result">
        <M block t={`\\frac{dx}{dt}=${tx(dxdt, 2)},\\quad \\frac{dy}{dt}=${tx(dydt, 2)},\\quad \\frac{dy}{dx}=${vertical ? '\\text{függőleges!}' : tx(slope, 3)}`} />
        <p>
          Amikor <M t="dy/dt=0" /> (<M t="t=\pi/2" />), az érintő <strong>vízszintes</strong>; amikor <M t="dx/dt=0" /> (<M t="t=0;\,\pi" />), az érintő <strong>függőleges</strong>!
        </p>
      </div>
    </div>
  );
}
