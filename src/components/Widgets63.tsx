import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: töröttvonalas közelítés */

type PolyPreset = {
  id: string;
  label: string;
  xr: [number, number];
  yr: [number, number];
  t0: number;
  t1: number;
  x: (t: number) => number;
  y: (t: number) => number;
  exact: number;
  exactTex: string;
};

const POLY_PRESETS: PolyPreset[] = [
  {
    id: 'semi',
    label: 'Félkör (r = 2)',
    xr: [-2.4, 2.4],
    yr: [-0.3, 2.4],
    t0: 0,
    t1: Math.PI,
    x: (t) => 2 * Math.cos(t),
    y: (t) => 2 * Math.sin(t),
    exact: 2 * Math.PI,
    exactTex: '2\\pi \\approx 6{,}283',
  },
  {
    id: 'sin',
    label: 'y = sin x  [0; π]',
    xr: [-0.2, 3.35],
    yr: [-0.2, 1.3],
    t0: 0,
    t1: Math.PI,
    x: (t) => t,
    y: (t) => Math.sin(t),
    exact: 3.8202,
    exactTex: '\\approx 3{,}820',
  },
  {
    id: 'ast',
    label: 'Csillaggörbe (1. negyed)',
    xr: [-0.15, 1.2],
    yr: [-0.15, 1.2],
    t0: 0,
    t1: Math.PI / 2,
    x: (t) => Math.cos(t) ** 3,
    y: (t) => Math.sin(t) ** 3,
    exact: 1.5,
    exactTex: '1{,}500',
  },
];

export function PolygonApproxArcWidget() {
  const [idx, setIdx] = useState(0);
  const [n, setN] = useState(5);
  const p = POLY_PRESETS[idx];

  // Töröttvonal csúcsai és hossza
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = p.t0 + ((p.t1 - p.t0) * i) / n;
    pts.push([p.x(t), p.y(t)]);
  }
  let polyLen = 0;
  for (let i = 1; i < pts.length; i++) {
    polyLen += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }

  return (
    <div className="widget">
      <div className="widget-title">Görbe hosszának közelítése n szakaszos töröttvonallal</div>
      <div className="relbuttons chips" role="tablist" aria-label="Görbe választása">
        {POLY_PRESETS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <label>
        Szakaszok száma: <strong>n = {n}</strong>
        <input type="range" min={2} max={32} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>

      <Chart xmin={p.xr[0]} xmax={p.xr[1]} ymin={p.yr[0]} ymax={p.yr[1]} h={220}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          // Sima görbe
          const smooth: string[] = [];
          for (let i = 0; i <= 120; i++) {
            const t = p.t0 + ((p.t1 - p.t0) * i) / 120;
            smooth.push(`${i === 0 ? 'M' : 'L'} ${sx(p.x(t))} ${sy(p.y(t))}`);
          }
          // Töröttvonal
          const polyPath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(y)}`).join(' ');
          return (
            <>
              <path d={smooth.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.4} opacity={0.55} />
              <path d={polyPath} fill="none" stroke="#fbbf24" strokeWidth={2.2} />
              {n <= 14 &&
                pts.map(([x, y], i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={3.2} fill="#34d399" />)}
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Töröttvonal hossza (<M t={`n=${n}`} />): <strong>{round(polyLen, 4)}</strong> · Pontos ívhossz:{' '}
          <M t={`L ${p.exactTex}`} /> · Eltérés: {round(Math.abs(p.exact - polyLen), 4)}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Csillaggörbe és ciklois */

export function ParametricCurvesShowcaseWidget() {
  const [which, setWhich] = useState<'astroid' | 'cycloid'>('astroid');
  const [frac, setFrac] = useState(0.5);

  const tMax = 2 * Math.PI;
  const tCur = frac * tMax;

  // Csillaggörbe: x=cos³t, y=sin³t, teljes hossz = 6
  // Ciklois: x=t-sin t, y=1-cos t (a=1), teljes hossz = 8
  const exactTotal = which === 'astroid' ? 6 : 8;

  // Aktuális ívhossz s(tCur)
  let sCur = 0;
  if (which === 'cycloid') {
    sCur = 4 * (1 - Math.cos(tCur / 2));
  } else {
    // 1 negyed = 1.5
    const q = Math.floor(tCur / (Math.PI / 2));
    const rem = tCur - q * (Math.PI / 2);
    sCur = q * 1.5 + 1.5 * Math.sin(rem) ** 2;
  }

  return (
    <div className="widget">
      <div className="widget-title">Híres paraméteres görbék: csillaggörbe (L = 6) és ciklois (L = 8a)</div>
      <div className="relbuttons chips">
        <button type="button" className={which === 'astroid' ? 'on' : ''} onClick={() => setWhich('astroid')}>
          Csillaggörbe (x = cos³t, y = sin³t)
        </button>
        <button type="button" className={which === 'cycloid' ? 'on' : ''} onClick={() => setWhich('cycloid')}>
          Ciklois (x = t − sin t, y = 1 − cos t)
        </button>
      </div>

      <label>
        Bejárt paraméter: <M t={`t = ${tx(frac * 2, 2)}\\pi`} /> (megtett ívhossz: <M t={`s(t) = ${tx(sCur, 2)} / ${exactTotal}`} />)
        <input type="range" min={0} max={1} step={0.02} value={frac} onChange={(e) => setFrac(Number(e.target.value))} />
      </label>

      <Chart
        xmin={which === 'astroid' ? -1.3 : -0.3}
        xmax={which === 'astroid' ? 1.3 : 6.6}
        ymin={which === 'astroid' ? -1.3 : -0.25}
        ymax={which === 'astroid' ? 1.3 : 2.35}
        h={215}
      >
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const px = (t: number) => (which === 'astroid' ? Math.cos(t) ** 3 : t - Math.sin(t));
          const py = (t: number) => (which === 'astroid' ? Math.sin(t) ** 3 : 1 - Math.cos(t));

          const full: string[] = [];
          const traced: string[] = [];
          for (let i = 0; i <= 140; i++) {
            const t = (tMax * i) / 140;
            full.push(`${i === 0 ? 'M' : 'L'} ${sx(px(t))} ${sy(py(t))}`);
          }
          for (let i = 0; i <= 100; i++) {
            const t = (tCur * i) / 100;
            traced.push(`${i === 0 ? 'M' : 'L'} ${sx(px(t))} ${sy(py(t))}`);
          }

          return (
            <>
              <path d={full.join(' ')} fill="none" stroke="#475569" strokeWidth={2} strokeDasharray="4 3" />
              <path d={traced.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.8} />
              <circle cx={sx(px(tCur))} cy={sy(py(tCur))} r={5} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          {which === 'astroid'
            ? 'A csillaggörbe 4 szimmetrikus ívből áll: egy ív hossza 1,5, a teljes hossz pontosan 6!'
            : 'A ciklois egy teljes gördülési ívének hossza pontosan 8a — meglepő módon nincs benne π!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: ds ívhossz-differenciál */

export function ArcDifferentialDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Az ívhossz-differenciál (ds) Pitagorasz-háromszöge</div>
      <svg viewBox="0 0 540 175" className="plane" role="img" aria-label="Pitagorasz-tétel az ívhossz-differenciálra">
        <rect width={540} height={175} className="pl-bg" />

        {/* Bal oldal: görbe + nagyított differenciális háromszög */}
        <path d="M 28 145 Q 95 120 145 78 T 235 28" fill="none" stroke="#38bdf8" strokeWidth={2.6} />
        {/* Háromszög */}
        <line x1={96} y1={115} x2={176} y2={115} stroke="#34d399" strokeWidth={2.4} />
        <line x1={176} y1={115} x2={176} y2={58} stroke="#fb923c" strokeWidth={2.4} />
        <line x1={96} y1={115} x2={176} y2={58} stroke="#fbbf24" strokeWidth={2.8} />
        <rect x={166} y={105} width={10} height={10} fill="none" stroke="#94a3b8" strokeWidth={1.2} />
        <text x={136} y={132} textAnchor="middle" fill="#a7f3d0" fontSize={13} fontWeight={700}>dx</text>
        <text x={190} y={90} fill="#fed7aa" fontSize={13} fontWeight={700}>dy</text>
        <text x={125} y={78} textAnchor="middle" fill="#fde68a" fontSize={13.5} fontWeight={700}>ds</text>

        {/* Jobb oldal: A 3 alak */}
        <rect x={256} y={16} width={268} height={142} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={390} y={38} textAnchor="middle" fill="#fbbf24" fontSize={13} fontWeight={700}>
          ds = √(dx² + dy²)
        </text>
        <text x={272} y={68} fill="#7dd3fc" fontSize={12} fontWeight={700}>1. Paraméteres (t):</text>
        <text x={400} y={68} fill="#e2e8f0" fontSize={11.5}>√((dx/dt)² + (dy/dt)²) dt</text>

        <text x={272} y={100} fill="#a7f3d0" fontSize={12} fontWeight={700}>2. y = f(x) alak:</text>
        <text x={400} y={100} fill="#e2e8f0" fontSize={11.5}>√(1 + (dy/dx)²) dx</text>

        <text x={272} y={132} fill="#fed7aa" fontSize={12} fontWeight={700}>3. x = g(y) alak:</text>
        <text x={400} y={132} fill="#e2e8f0" fontSize={11.5}>√(1 + (dx/dy)²) dy</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: függőleges érintő -> dy váltás */

export function VerticalTangentSwitchWidget() {
  const [mode, setMode] = useState<'x' | 'y'>('x');

  return (
    <div className="widget">
      <div className="widget-title">Függőleges érintő csapdája: y = (x/2)²ᐟ³  vs.  x = 2y³ᐟ²</div>
      <div className="relbuttons chips">
        <button type="button" className={mode === 'x' ? 'on' : ''} onClick={() => setMode('x')}>
          x szerint (y′ → ∞ az origóban!)
        </button>
        <button type="button" className={mode === 'y' ? 'on' : ''} onClick={() => setMode('y')}>
          y szerint (x′ = 3√y — teljesen sima!)
        </button>
      </div>

      <Chart xmin={-0.25} xmax={2.3} ymin={-0.2} ymax={1.3} h={205}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          return (
            <>
              <path d={curve((x) => (x < 0 ? NaN : (x / 2) ** (2 / 3)), m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              {mode === 'x' ? (
                <>
                  <line x1={sx(0)} y1={sy(-0.15)} x2={sx(0)} y2={sy(0.85)} stroke="#fb7185" strokeWidth={2.4} strokeDasharray="5 3" />
                  <circle cx={sx(0)} cy={sy(0)} r={5} fill="#fb7185" />
                  <text x={sx(0.12)} y={sy(0.75)} fill="#fecdd3" fontSize={11.5} fontWeight={700}>függőleges érintő (y′ = ∞)</text>
                </>
              ) : (
                <>
                  <circle cx={sx(0)} cy={sy(0)} r={5} fill="#34d399" />
                  <circle cx={sx(2)} cy={sy(1)} r={5} fill="#34d399" />
                  <text x={sx(0.18)} y={sy(0.85)} fill="#a7f3d0" fontSize={11.5} fontWeight={700}>dx/dy = 3√y mindenhol véges!</text>
                </>
              )}
            </>
          );
        }}
      </Chart>

      <div className="result">
        {mode === 'x' ? (
          <p>
            <M t="y' = \dfrac{1}{3}(x/2)^{-1/3} \xrightarrow{x\to 0^+} \infty" /> — az <M t="x" /> szerinti integrál improprius és kényelmetlen!
          </p>
        ) : (
          <p>
            Átrendezve <M t="x = 2y^{3/2}" /> (<M t="y\in[0;\,1]" />):{' '}
            <M t="L = \displaystyle\int_0^1 \sqrt{1+9y}\,dy = \mathbf{\dfrac{2}{27}(10\sqrt{10}-1) \approx 2{,}268}" />!
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: húrhossz vs. valódi ívhossz */

export function ArcLengthComparisonWidget() {
  const [b, setB] = useState(1.5);
  // y = x² a [0, b]-n
  const chord = Math.hypot(b, b * b);
  // Numerikus Simpson / trapéz 100 lépéssel
  const steps = 100;
  let arc = 0;
  const dx = b / steps;
  for (let i = 0; i < steps; i++) {
    const xm = (i + 0.5) * dx;
    arc += Math.sqrt(1 + 4 * xm * xm) * dx;
  }

  return (
    <div className="widget">
      <div className="widget-title">Húrhossz vs. valódi ívhossz: y = x² a [0; b] intervallumon</div>
      <label>
        Végpont: <M t={`b = ${tx(b, 2)}`} /> (pont: <M t={`(${tx(b, 2)};\\,${tx(b * b, 2)})`} />)
        <input type="range" min={0.2} max={2.0} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.2} xmax={2.25} ymin={-0.3} ymax={4.4} h={210}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 60;
          const pts: string[] = [];
          for (let i = 0; i <= st; i++) {
            const x = (b * i) / st;
            pts.push(`${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(x * x)}`);
          }
          return (
            <>
              <path d={curve((x) => x * x, m, 220)} fill="none" stroke="#475569" strokeWidth={1.6} strokeDasharray="4 3" />
              <path d={pts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.8} />
              <line x1={sx(0)} y1={sy(0)} x2={sx(b)} y2={sy(b * b)} stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 3" />
              <circle cx={sx(b)} cy={sy(b * b)} r={4.5} fill="#34d399" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Egyenes húr: <strong>{round(chord, 3)}</strong> · Valódi ívhossz (<M t="\int_0^b\sqrt{1+4x^2}\,dx" />):{' '}
          <strong>{round(arc, 3)}</strong> (a görbe mindig hosszabb a húrnál!)
        </p>
      </div>
    </div>
  );
}
