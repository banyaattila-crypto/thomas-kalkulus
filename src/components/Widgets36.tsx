import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: kör implicit deriváltja (-x/y) */

export function CircleImplicitWidget() {
  const [ang, setAng] = useState(-0.927); // kb (3; -4)
  const r = 5;
  const px = r * Math.cos(ang);
  const py = r * Math.sin(ang);
  const vert = Math.abs(py) < 0.15;
  const m = vert ? NaN : -px / py;

  const circ = (cm: { X: (v: number) => number; Y: (v: number) => number }) => {
    let d = '';
    for (let i = 0; i <= 180; i++) {
      const t = (2 * Math.PI * i) / 180;
      d += `${i ? 'L' : 'M'}${cm.X(r * Math.cos(t)).toFixed(1)},${cm.Y(r * Math.sin(t)).toFixed(1)} `;
    }
    return d;
  };

  return (
    <div className="widget">
      <div className="widget-title">Egyetlen formula a teljes körre: y&apos; = −x / y</div>
      <label>
        pont a körön (x² + y² = 25): P({round(px, 2)}; {round(py, 2)})
        <input type="range" min={-3.14} max={3.14} step={0.05} value={ang} onChange={(e) => setAng(Number(e.target.value))} />
      </label>
      <Chart xmin={-7} xmax={7} ymin={-7} ymax={7} h={260}>
        {(cm) => (
          <>
            <path d={circ(cm)} className="pl-main" />
            {/* Sugár (normális) */}
            <line x1={cm.X(0)} y1={cm.Y(0)} x2={cm.X(px)} y2={cm.Y(py)} className="pl-ok" strokeDasharray="5 4" />
            {/* Érintő */}
            {vert ? (
              <line x1={cm.X(px)} y1={0} x2={cm.X(px)} y2={cm.h} className="pl-alt" />
            ) : (
              <path d={curve((x) => py + m * (x - px), cm, 60)} className="pl-alt" />
            )}
            <circle cx={cm.X(px)} cy={cm.Y(py)} r={6} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <p className="legend">Kék: x² + y² = 25. Narancs: érintő. Zöld szaggatott: sugár (normális).</p>
      <div className="result">
        <M block t={`\\frac{dy}{dx} = -\\frac{x}{y} = ${vert ? '\\text{függőleges (y=0)}' : tx(m, 3)}`} />
        <p>
          Felső és alsó félkörön egyaránt ugyanaz az egyetlen <M t="-x/y" /> képlet működik — nem kellett gyököt vonnunk!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: 3 lépéses implicit séma */

export function ImplicitStepsDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Az implicit deriválás 3 lépése</div>
      <svg viewBox="0 0 540 115" className="plane" role="img" aria-label="Implicit deriválás 3 lépése">
        <rect width={540} height={115} className="pl-bg" />
        {[
          { x: 14, n: '1. lépés', a: 'Mindkét oldal deriválása', b: 'x szerint (y-nál → y′!)', c: '#38bdf8' },
          { x: 194, n: '2. lépés', a: 'y′-s tagok egy oldalra', b: 'többi tag a másikra', c: '#34d399' },
          { x: 374, n: '3. lépés', a: 'y′ kiemelése és osztás', b: 'megvan dy/dx (x, y-nal)', c: '#fb923c' },
        ].map((s, i) => (
          <g key={s.n}>
            <rect x={s.x} y={16} width={152} height={82} rx={12} fill="rgba(255,255,255,0.04)" stroke={s.c} strokeWidth={1.8} />
            <text x={s.x + 76} y={38} textAnchor="middle" fill={s.c} className="pl-label">{s.n}</text>
            <text x={s.x + 76} y={60} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>{s.a}</text>
            <text x={s.x + 76} y={79} textAnchor="middle" fill="#94a3b8" fontSize={11}>{s.b}</text>
            {i < 2 && (
              <>
                <line x1={s.x + 154} y1={57} x2={s.x + 178} y2={57} stroke="#cbd5e1" strokeWidth={2} />
                <polygon points={`${s.x + 178},57 ${s.x + 171},52 ${s.x + 171},62`} fill="#cbd5e1" />
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: Descartes-féle levél */

export function FoliumWidget() {
  const [t, setT] = useState(2); // t=2 → (2; 4)
  const fx = (u: number) => (9 * u) / (1 + u * u * u);
  const fy = (u: number) => (9 * u * u) / (1 + u * u * u);

  const px = fx(t);
  const py = fy(t);
  const denom = py * py - 3 * px;
  const vert = Math.abs(denom) < 0.08;
  const m = vert ? NaN : (3 * py - px * px) / denom;
  const mNorm = vert ? 0 : Math.abs(m) < 0.02 ? NaN : -1 / m;

  const branch = (a: number, b: number, cm: { X: (v: number) => number; Y: (v: number) => number }, N = 160) => {
    let d = '';
    for (let i = 0; i <= N; i++) {
      const u = a + ((b - a) * i) / N;
      const x = fx(u);
      const y = fy(u);
      if (Math.abs(x) > 12 || Math.abs(y) > 12) continue;
      d += `${d === '' ? 'M' : 'L'}${cm.X(x).toFixed(1)},${cm.Y(y).toFixed(1)} `;
    }
    return d;
  };

  return (
    <div className="widget">
      <div className="widget-title">A Descartes-féle levél: x³ + y³ = 9xy</div>
      <div className="relbuttons chips">
        <button className={Math.abs(t - 2) < 0.05 ? 'on' : ''} onClick={() => setT(2)}>P(2; 4)</button>
        <button className={Math.abs(t - 0.5) < 0.05 ? 'on' : ''} onClick={() => setT(0.5)}>Q(4; 2)</button>
        <button className={Math.abs(t - 1) < 0.05 ? 'on' : ''} onClick={() => setT(1)}>csúcs (4,5; 4,5)</button>
      </div>
      <label>
        pont a hurkon: P({round(px, 2)}; {round(py, 2)})
        <input type="range" min={0.15} max={4} step={0.05} value={t} onChange={(e) => setT(Number(e.target.value))} />
      </label>
      <Chart xmin={-3} xmax={7} ymin={-3} ymax={7} h={260}>
        {(cm) => (
          <>
            <path d={branch(0, 18, cm, 300)} className="pl-main" />
            <path d={branch(-0.85, -0.02, cm, 120)} className="pl-main" />
            <path d={branch(-12, -1.18, cm, 120)} className="pl-main" />
            {vert ? (
              <line x1={cm.X(px)} y1={0} x2={cm.X(px)} y2={cm.h} className="pl-alt" />
            ) : (
              <path d={curve((x) => py + m * (x - px), cm, 60)} className="pl-alt" />
            )}
            {Number.isFinite(mNorm) && (
              <path d={curve((x) => py + mNorm * (x - px), cm, 60)} className="pl-ok" strokeDasharray="5 4" />
            )}
            <circle cx={cm.X(px)} cy={cm.Y(py)} r={6} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <p className="legend">Kék: x³ + y³ = 9xy. Narancs: érintő. Zöld szaggatott: normális (merőleges az érintőre).</p>
      <div className="result">
        <M block t={`\\frac{dy}{dx} = \\frac{3y-x^2}{y^2-3x} = ${vert ? '\\text{függőleges}' : tx(m, 3)}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: implicit második derivált léptető */

type SecImp = {
  id: string;
  name: string;
  steps: { title: string; tex: string; note: string }[];
};

const SEC_IMP: SecImp[] = [
  {
    id: 'circ',
    name: 'x² + y² = 25',
    steps: [
      { title: '1. Első derivált (y′)', tex: "2x + 2yy' = 0 \\;\\Longrightarrow\\; y' = -\\frac{x}{y}", note: 'Már ismert a kör meredeksége.' },
      { title: '2. Újabb deriválás x szerint', tex: "y'' = -\\frac{y\\cdot 1 - x\\cdot y'}{y^2}", note: 'Hányadosszabály az −x/y törtre (y deriváltja y′!).' },
      { title: '3. Visszahelyettesítés', tex: "y'' = -\\frac{y - x(-x/y)}{y^2} = -\\frac{y^2+x^2}{y^3} = -\\frac{25}{y^3}", note: 'Behelyettesítettük y′ = −x/y-t, majd az eredeti x² + y² = 25 egyenletet!' },
    ],
  },
  {
    id: 'cub',
    name: '2x³ − 3y² = 8',
    steps: [
      { title: '1. Első derivált (y′)', tex: "6x^2 - 6yy' = 0 \\;\\Longrightarrow\\; y' = \\frac{x^2}{y}", note: 'Elosztottunk 6-tal, majd kifejeztük y′-t.' },
      { title: '2. Újabb deriválás x szerint', tex: "y'' = \\frac{y\\cdot 2x - x^2\\cdot y'}{y^2}", note: 'Hányadosszabály az x²/y törtre.' },
      { title: '3. Visszahelyettesítés', tex: "y'' = \\frac{2xy - x^2(x^2/y)}{y^2} = \\frac{2xy^2 - x^4}{y^3}", note: 'A végleges válaszban már csak x és y szerepel, y′ nem!' },
    ],
  },
];

export function ImplicitSecondWidget() {
  const [si, setSi] = useState(0);
  const [st, setSt] = useState(0);
  const ex = SEC_IMP[si];

  return (
    <div className="widget">
      <div className="widget-title">Implicit második derivált: a visszahelyettesítés művészete</div>
      <div className="relbuttons chips">
        {SEC_IMP.map((q, i) => (
          <button key={q.id} className={si === i ? 'on' : ''} onClick={() => { setSi(i); setSt(0); }}>
            {q.name}
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {ex.steps.map((s, i) => (
          <button key={s.title} className={st === i ? 'on' : ''} onClick={() => setSt(i)}>
            {s.title}
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

/* ------------------------------------------------------------------ 5. oldal: racionális hatványfüggvény és értelmezési tartomány */

type RatPow = {
  id: string;
  name: string;
  tex: string;
  f: (x: number) => number;
  df: (x: number) => number;
  xr: [number, number];
  yr: [number, number];
  note: string;
};

const RAT_POW: RatPow[] = [
  {
    id: 'p32',
    name: 'x^(3/2)',
    tex: "f(x)=x^{3/2},\\quad f'(x)=\\tfrac{3}{2}x^{1/2}",
    f: (x) => (x < 0 ? NaN : Math.pow(x, 1.5)),
    df: (x) => (x < 0 ? NaN : 1.5 * Math.sqrt(x)),
    xr: [-0.4, 4],
    yr: [-0.5, 6],
    note: 'Itt a kitevő > 1, ezért a derivált még 0-ban is létezik (jobb oldali deriváltja 0).',
  },
  {
    id: 'p13',
    name: 'x^(1/3)',
    tex: "f(x)=x^{1/3},\\quad f'(x)=\\tfrac{1}{3}x^{-2/3}=\\dfrac{1}{3x^{2/3}}",
    f: (x) => Math.cbrt(x),
    df: (x) => (Math.abs(x) < 0.03 ? NaN : 1 / (3 * Math.cbrt(x * x))),
    xr: [-3, 3],
    yr: [-2.5, 5],
    note: 'A függvény mindenütt értelmezett, de a derivált 0-ban nem (függőleges érintő, +∞)!',
  },
  {
    id: 'p14',
    name: '(1 − x²)^(1/4)',
    tex: "f(x)=(1-x^2)^{1/4},\\quad f'(x)=\\dfrac{-x}{2(1-x^2)^{3/4}}",
    f: (x) => (Math.abs(x) > 1 ? NaN : Math.pow(Math.max(0, 1 - x * x), 0.25)),
    df: (x) => (Math.abs(x) >= 0.98 ? NaN : -x / (2 * Math.pow(1 - x * x, 0.75))),
    xr: [-1.4, 1.4],
    yr: [-3, 3],
    note: 'Az eredeti függvény a [−1; 1] zárt intervallumon, deriváltja viszont csak a (−1; 1) nyílt intervallumon értelmezett!',
  },
];

export function RationalPowerWidget() {
  const [ri, setRi] = useState(2);
  const ex = RAT_POW[ri];

  return (
    <div className="widget">
      <div className="widget-title">Racionális hatványok: mikor szűkül le a derivált tartománya?</div>
      <div className="relbuttons chips">
        {RAT_POW.map((q, i) => (
          <button key={q.id} className={ri === i ? 'on' : ''} onClick={() => setRi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={230}>
        {(m) => (
          <>
            <path d={curve(ex.df, m, 500)} className="pl-ok" strokeDasharray="6 4" />
            <path d={curve(ex.f, m, 500)} className="pl-main" />
          </>
        )}
      </Chart>
      <p className="legend">Kék: f(x). Zöld szaggatott: f′(x).</p>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}
