import { ReactNode, useId, useState } from 'react';
import { M, tex } from './M';
import { round } from './fmt';

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');
const fin = (v: number) => v;

/* ------------------------------------------------------------------ közös: ablakos koordináta-rendszer */

export type CMap = { X: (x: number) => number; Y: (y: number) => number; w: number; h: number; xmin: number; xmax: number; ymin: number; ymax: number };

function niceStep(span: number, target: number): number {
  const raw = span / target;
  const p = 10 ** Math.floor(Math.log10(raw));
  const f = raw / p;
  return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
}

const fmtTick = (v: number) => {
  const r = Math.round(v * 1e6) / 1e6;
  return String(r).replace('.', ',').replace('-', '−');
};

/** Szabad (nem feltétlenül négyzetes) ablak: a két tengely skálája külön adott. */
export function Chart({
  xmin,
  xmax,
  ymin,
  ymax,
  w = 560,
  h = 340,
  children,
}: {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  w?: number;
  h?: number;
  children: (m: CMap) => ReactNode;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const X = (x: number) => ((x - xmin) / (xmax - xmin)) * w;
  const Y = (y: number) => h - ((y - ymin) / (ymax - ymin)) * h;
  const sx = niceStep(xmax - xmin, 7);
  const sy = niceStep(ymax - ymin, 5);
  const xs: number[] = [];
  for (let v = Math.ceil(xmin / sx) * sx; v <= xmax + 1e-9; v += sx) xs.push(Math.round(v / sx) * sx);
  const ys: number[] = [];
  for (let v = Math.ceil(ymin / sy) * sy; v <= ymax + 1e-9; v += sy) ys.push(Math.round(v / sy) * sy);
  const x0 = Math.min(Math.max(0, xmin), xmax);
  const y0 = Math.min(Math.max(0, ymin), ymax);
  return (
    <svg viewBox={`-34 -8 ${w + 46} ${h + 34}`} className="plane" role="img">
      <defs>
        <clipPath id={`c${uid}`}>
          <rect x={0} y={0} width={w} height={h} />
        </clipPath>
      </defs>
      <rect x={0} y={0} width={w} height={h} className="pl-bg" />
      {xs.map((v) => (
        <line key={`gx${v}`} x1={X(v)} y1={0} x2={X(v)} y2={h} className="pl-grid" />
      ))}
      {ys.map((v) => (
        <line key={`gy${v}`} x1={0} y1={Y(v)} x2={w} y2={Y(v)} className="pl-grid" />
      ))}
      <g clipPath={`url(#c${uid})`}>
        <line x1={0} y1={Y(y0)} x2={w} y2={Y(y0)} className="pl-axis" />
        <line x1={X(x0)} y1={0} x2={X(x0)} y2={h} className="pl-axis" />
        {children({ X, Y, w, h, xmin, xmax, ymin, ymax })}
      </g>
      {xs.map((v) => (
        <text key={`tx${v}`} x={X(v)} y={h + 14} textAnchor="middle" className="pl-tick">
          {fmtTick(v)}
        </text>
      ))}
      {ys.map((v) => (
        <text key={`ty${v}`} x={-5} y={Y(v) + 4} textAnchor="end" className="pl-tick">
          {fmtTick(v)}
        </text>
      ))}
    </svg>
  );
}

/**
 * Mintavételezett, szakaszokkal összekötött grafikon. Az értelmezetlen pontnál megszakad a vonal; a szomszédos értelmezett
 * pontokat összeköti akkor is, ha az ablakon kívül esnek (az ablak levágja a lógó részt). A breakAtGap a nagy ugrásnál is megszakít.
 */
function samplePath(f: (x: number) => number, m: CMap, N: number, breakAtGap: boolean): { d: string; pts: [number, number][]; shown: number } {
  let d = '';
  let pen = false;
  let shown = 0;
  const pts: [number, number][] = [];
  let prevY: number | null = null;
  const span = m.ymax - m.ymin;
  for (let i = 0; i <= N; i++) {
    const x = m.xmin + ((m.xmax - m.xmin) * i) / N;
    const y = fin(f(x));
    if (Number.isNaN(y)) {
      pen = false;
      prevY = null;
      continue;
    }
    if (!Number.isFinite(y)) continue; // pontosan a pólusban: a pont kimarad, a szomszédokat a program összeköti
    if (y >= m.ymin && y <= m.ymax) {
      shown++;
      pts.push([x, y]);
    }
    const jump = breakAtGap && prevY !== null && Math.abs(y - prevY) > span * 0.9;
    const yc = Math.max(-1e4, Math.min(1e4, y));
    d += `${pen && !jump ? 'L' : 'M'}${m.X(x).toFixed(1)},${m.Y(yc).toFixed(1)} `;
    pen = true;
    prevY = y;
  }
  return { d, pts, shown };
}

/* ------------------------------------------------------------------ 1. oldal: ablak és mintavétel */

type WF = { id: string; tex: string; f: (x: number) => number };
const WFS: WF[] = [
  { id: 'a', tex: 'x^3-12x', f: (x) => x ** 3 - 12 * x },
  { id: 'b', tex: 'x^4-8x^2+3', f: (x) => x ** 4 - 8 * x * x + 3 },
  { id: 'c', tex: '30\\,\\dfrac{\\sin x}{x}', f: (x) => (30 * Math.sin(x)) / x },
];
const WPRE: { name: string; x: [number, number]; y: [number, number] }[] = [
  { name: 'alapértelmezett [−10; 10] × [−10; 10]', x: [-10, 10], y: [-10, 10] },
  { name: 'túl szűk [−5; 5] × [−5; 5]', x: [-5, 5], y: [-5, 5] },
  { name: 'túl nagy [−50; 50] × [−50; 50]', x: [-50, 50], y: [-50, 50] },
  { name: 'jó [−5; 5] × [−20; 20]', x: [-5, 5], y: [-20, 20] },
];

export function WindowWidget() {
  const [fi, setFi] = useState(0);
  const [pi, setPi] = useState(0);
  const [n, setN] = useState(200);
  const F = WFS[fi];
  const [xa, xb] = WPRE[pi].x;
  const [ya, yb] = WPRE[pi].y;
  return (
    <div className="widget">
      <div className="widget-title">Mit mutat az ablak? Mintavételezés</div>
      <div className="relbuttons chips">
        {WFS.map((q, i) => (
          <button key={q.id} className={fi === i ? 'on' : ''} onClick={() => setFi(i)}>
            <M t={q.tex} />
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {WPRE.map((q, i) => (
          <button key={q.name} className={pi === i ? 'on' : ''} onClick={() => setPi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <label>
        mintapontok száma: {n}
        <input type="range" min={10} max={400} step={10} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <Chart xmin={xa} xmax={xb} ymin={ya} ymax={yb}>
        {(m) => {
          const s = samplePath(F.f, m, n, false);
          return (
            <>
              <path d={s.d} className="pl-main" />
              {n <= 60 && s.pts.map(([x, y], i) => <circle key={i} cx={m.X(x)} cy={m.Y(y)} r={3.5} fill="#fb923c" />)}
            </>
          );
        }}
      </Chart>
      <div className="explain">
        {(() => {
          const m: CMap = { X: (x) => x, Y: (y) => y, w: 1, h: 1, xmin: xa, xmax: xb, ymin: ya, ymax: yb };
          const s = samplePath(F.f, m, n, false);
          return (
            <p>
              A {n + 1} mintapontból {s.shown} esik az ablakba. A program csak ezeket köti össze. Ha az ablak a görbe jellegzetes részeit (zérushelyek, kiugrások) nem tartalmazza, a kép
              félrevezető.
            </p>
          );
        })()}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: négyzetes ablak */

export function AspectWidget() {
  const [xr, setXr] = useState(10);
  const [yr, setYr] = useState(5);
  const W = 560;
  const H = 280;
  const sx = W / (2 * xr);
  const sy = H / (2 * yr);
  const square = Math.abs(sx - sy) < 1e-9;
  const ang = (Math.atan2(sy, sx) * 180) / Math.PI;
  return (
    <div className="widget">
      <div className="widget-title">Négyzetes és nem négyzetes ablak</div>
      <div className="sliders">
        <label>
          x-tartomány: [−{sg(xr)}; {sg(xr)}]
          <input type="range" min={3} max={12} step={1} value={xr} onChange={(e) => setXr(Number(e.target.value))} />
        </label>
        <label>
          y-tartomány: [−{sg(yr)}; {sg(yr)}]
          <input type="range" min={1.5} max={7} step={0.5} value={yr} onChange={(e) => setYr(Number(e.target.value))} />
        </label>
      </div>
      <Chart xmin={-xr} xmax={xr} ymin={-yr} ymax={yr} w={W} h={H}>
        {(m) => (
          <>
            <ellipse cx={m.X(0)} cy={m.Y(0)} rx={3 * sx} ry={3 * sy} className="pl-main" />
            <line x1={m.X(-xr)} y1={m.Y(-xr)} x2={m.X(xr)} y2={m.Y(xr)} className="pl-alt" />
            <line x1={m.X(-xr)} y1={m.Y(xr)} x2={m.X(xr)} y2={m.Y(-xr)} className="pl-ok" />
          </>
        )}
      </Chart>
      <div className="legend">
        kék: az x² + y² = 9 kör · narancs: y = x · zöld: y = −x (a két egyenes merőleges)
      </div>
      <div className="explain">
        <p>
          Egy x-egység {round(sx, 1)} képpont, egy y-egység {round(sy, 1)} képpont hosszú. {square ? 'Az ablak négyzetes: a kör valóban kör, az egyenesek merőlegesnek látszanak.' : `Az ablak nem négyzetes: a kör ellipszisnek látszik, és az y = x egyenes a képen ${round(ang, 1)}°-os, nem 45°-os. A két egyenes sem látszik merőlegesnek.`}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: pólus és hamis függőleges */

type PF = { id: string; tex: string; f: (x: number) => number; xr: number };
const PFS: PF[] = [
  { id: 'r1', tex: '\\dfrac{1}{x-2}', f: (x) => 1 / (x - 2), xr: 6 },
  { id: 'r2', tex: '\\dfrac{1}{x^2-4}', f: (x) => 1 / (x * x - 4), xr: 6 },
  { id: 'tg', tex: '\\operatorname{tg}x', f: Math.tan, xr: 6 },
];

export function PoleWidget() {
  const [fi, setFi] = useState(0);
  const [n, setN] = useState(60);
  const [fix, setFix] = useState(false);
  const F = PFS[fi];
  return (
    <div className="widget">
      <div className="widget-title">Hamis függőleges vonal a pólus környékén</div>
      <div className="relbuttons chips">
        {PFS.map((q, i) => (
          <button key={q.id} className={fi === i ? 'on' : ''} onClick={() => setFi(i)}>
            <M t={q.tex} />
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        <button className={!fix ? 'on' : ''} onClick={() => setFix(false)}>
          naiv: minden szomszédos pontot összeköt
        </button>
        <button className={fix ? 'on' : ''} onClick={() => setFix(true)}>
          javított: nagy ugrásnál megszakít
        </button>
      </div>
      <label>
        mintapontok száma: {n}
        <input type="range" min={20} max={400} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <Chart xmin={-F.xr} xmax={F.xr} ymin={-6} ymax={6}>
        {(m) => {
          const s = samplePath(F.f, m, n, fix);
          return (
            <>
              <path d={s.d} className="pl-main" />
              {n <= 80 && s.pts.map(([x, y], i) => <circle key={i} cx={m.X(x)} cy={m.Y(y)} r={3} fill="#fb923c" />)}
            </>
          );
        }}
      </Chart>
      <div className="explain">
        <p>
          A naiv módszer a pólus két oldalán lévő, az ablakba eső pontot is összeköti, ezért a hézag helyén meredek szakasz jelenik meg, bár a függvény ott nincs értelmezve. A mintapontok
          számával a szakasz alakja változik; a javított módszer az értékek nagy ugrásánál megszakítja a vonalat.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: gyors oszcilláció */

export function AliasWidget() {
  const [mode, setMode] = useState<'sin' | 'mix'>('sin');
  const [wi, setWi] = useState(4);
  const [oi, setOi] = useState(3);
  const [c, setC] = useState(0);
  const WIDTHS = [0.05, 0.1, 0.5, 1, 3, 6, 12];
  const OMEGAS = [1, 5, 20, 50, 100];
  const N = 240;
  const half = WIDTHS[wi];
  const om = OMEGAS[oi];
  const f = mode === 'sin' ? (x: number) => Math.sin(om * x) : (x: number) => Math.cos(x) + Math.sin(50 * x) / 50;
  const x0 = mode === 'sin' ? 0 : c;
  const xmin = x0 - half;
  const xmax = x0 + half;
  // y-tartomány: sinusnál rögzített, a vegyes függvénynél a mintapontokhoz illesztett (mint sok program automatikus skálázása)
  let ymin = -1.5;
  let ymax = 1.5;
  if (mode === 'mix') {
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i <= N; i++) {
      const y = f(xmin + ((xmax - xmin) * i) / N);
      lo = Math.min(lo, y);
      hi = Math.max(hi, y);
    }
    const pad = (hi - lo) * 0.08 || 0.1;
    ymin = lo - pad;
    ymax = hi + pad;
  }
  const period = mode === 'sin' ? (2 * Math.PI) / om : (2 * Math.PI) / 50;
  const perWin = (2 * half) / period;
  const spp = N / perWin;
  return (
    <div className="widget">
      <div className="widget-title">Gyorsan oszcilláló függvény: mit lát a program?</div>
      <div className="relbuttons chips">
        <button className={mode === 'sin' ? 'on' : ''} onClick={() => setMode('sin')}>
          sin(ωx)
        </button>
        <button className={mode === 'mix' ? 'on' : ''} onClick={() => setMode('mix')}>
          cos x + sin(50x)/50
        </button>
      </div>
      <div className="sliders">
        {mode === 'sin' && (
          <label>
            ω = {om}
            <input type="range" min={0} max={OMEGAS.length - 1} step={1} value={oi} onChange={(e) => setOi(Number(e.target.value))} />
          </label>
        )}
        <label>
          az ablak fél szélessége: {sg(half)}
          <input type="range" min={0} max={WIDTHS.length - 1} step={1} value={wi} onChange={(e) => setWi(Number(e.target.value))} />
        </label>
        {mode === 'mix' && (
          <label>
            az ablak közepe: x = {sg(c)}
            <input type="range" min={-3} max={3} step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
          </label>
        )}
      </div>
      <Chart xmin={xmin} xmax={xmax} ymin={ymin} ymax={ymax}>
        {(m) => {
          const s = samplePath(f, m, N, false);
          return <path d={s.d} className="pl-main" />;
        }}
      </Chart>
      <div className="explain">
        <p>
          A gyors tag periódusa {round(period, 4)}. Az ablakban {round(perWin, 1)} periódus fér el, a {N + 1} mintapontból periódusonként átlagosan {round(spp, 1)} jut.{' '}
          {spp < 4 ? 'Ez kevés: a görbe alakja hamis, a program nem látja a valódi hullámot.' : spp < 10 ? 'Ez határeset: a hullám már felismerhető, de szögletes.' : 'Ez elég: a hullám tisztán látszik.'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: törtkitevő és hiányzó ág */

const EXPS: { p: number; q: number }[] = [
  { p: 1, q: 3 },
  { p: 2, q: 3 },
  { p: 3, q: 5 },
  { p: 4, q: 5 },
  { p: 5, q: 3 },
];

export function RootWidget() {
  const [ei, setEi] = useState(0);
  const [fixed, setFixed] = useState(false);
  const { p, q } = EXPS[ei];
  const e = p / q;
  const naive = (x: number) => (x > 0 ? Math.exp(e * Math.log(x)) : NaN);
  const good = (x: number) => (x === 0 ? 0 : Math.abs(x) ** e * (p % 2 === 0 ? 1 : Math.sign(x)));
  const f = fixed ? good : naive;
  return (
    <div className="widget">
      <div className="widget-title">Törtkitevős hatvány: x^(p/q), páratlan q</div>
      <div className="relbuttons chips">
        {EXPS.map((x, i) => (
          <button key={i} className={ei === i ? 'on' : ''} onClick={() => setEi(i)}>
            <M t={`x^{${x.p}/${x.q}}`} />
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        <button className={!fixed ? 'on' : ''} onClick={() => setFixed(false)}>
          gépi: e^((p/q)·ln x)
        </button>
        <button className={fixed ? 'on' : ''} onClick={() => setFixed(true)}>
          javított: előjellel
        </button>
      </div>
      <Chart xmin={-8} xmax={8} ymin={-5} ymax={5}>
        {(m) => <path d={samplePath(f, m, 500, false).d} className="pl-main" />}
      </Chart>
      <div className="result">
        <M
          block
          t={
            fixed
              ? p % 2 === 0
                ? `x^{${p}/${q}}=|x|^{${p}/${q}}`
                : `x^{${p}/${q}}=\\operatorname{sgn}(x)\\,|x|^{${p}/${q}}`
              : `\\text{a gép: } e^{\\frac{${p}}{${q}}\\ln x}\\ \\ (x>0)`
          }
        />
      </div>
      <div className="explain">
        <p>
          {fixed
            ? `A javított képlet az abszolút értékből számol, és ${p % 2 === 0 ? 'a páros számláló miatt a hatvány páros függvény, a bal ág a jobb tükörképe' : 'a páratlan számláló miatt az előjelet visszaadja, a bal ág a jobb ág középpontos tükörképe'}.`
            : 'A logaritmus csak pozitív számokra értelmezett, ezért a gépi képlet a negatív x-ekre semmit nem ad: a bal ág hiányzik, bár a függvény ott értelmezve van.'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal: regresszió */

type DS = { id: string; name: string; xs: number[]; ys: number[]; unit: string };
const DSETS: DS[] = [
  { id: 'A', name: 'Rugó hossza a terheléstől', xs: [0, 1, 2, 3, 4, 5, 6], ys: [10.1, 11.9, 14.2, 16.0, 17.8, 20.1, 22.0], unit: 'cm' },
  { id: 'B', name: 'Tenyészet mérete az időben', xs: Array.from({ length: 17 }, (_, i) => i), ys: [5, 9, 14, 24, 38, 57, 82, 109, 135, 157, 173, 183, 190, 194, 197, 198, 199], unit: 'db' },
];

function fitLinear(xs: number[], ys: number[]): [number, number] {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  xs.forEach((x, i) => {
    sxy += (x - mx) * (ys[i] - my);
    sxx += (x - mx) ** 2;
  });
  const m = sxy / sxx;
  return [m, my - m * mx];
}

function fitQuad(xs: number[], ys: number[]): [number, number, number] {
  // normálegyenletek: 3×3 rendszer Gauss-eliminációval
  const S = (k: number) => xs.reduce((a, x) => a + x ** k, 0);
  const T = (k: number) => xs.reduce((a, x, i) => a + x ** k * ys[i], 0);
  const A = [
    [S(4), S(3), S(2), T(2)],
    [S(3), S(2), S(1), T(1)],
    [S(2), S(1), xs.length, T(0)],
  ];
  for (let i = 0; i < 3; i++) {
    let piv = i;
    for (let r = i + 1; r < 3; r++) if (Math.abs(A[r][i]) > Math.abs(A[piv][i])) piv = r;
    [A[i], A[piv]] = [A[piv], A[i]];
    for (let r = 0; r < 3; r++) {
      if (r === i) continue;
      const k = A[r][i] / A[i][i];
      for (let c = i; c < 4; c++) A[r][c] -= k * A[i][c];
    }
  }
  return [A[0][3] / A[0][0], A[1][3] / A[1][1], A[2][3] / A[2][2]];
}

type Model = 'manual' | 'line' | 'quad' | 'exp';
const MODELS: { id: Model; name: string }[] = [
  { id: 'manual', name: 'kézi egyenes' },
  { id: 'line', name: 'legjobb egyenes' },
  { id: 'quad', name: 'másodfokú' },
  { id: 'exp', name: 'exponenciális' },
];

export function RegressionWidget() {
  const [di, setDi] = useState(0);
  const [model, setModel] = useState<Model>('line');
  const [nUsed, setNUsed] = useState(7);
  const [m0, setM0] = useState(2);
  const [b0, setB0] = useState(10);
  const D = DSETS[di];
  const n = Math.min(nUsed, D.xs.length);
  const ux = D.xs.slice(0, n);
  const uy = D.ys.slice(0, n);
  let f: (x: number) => number;
  let eq = '';
  if (model === 'manual') {
    f = (x) => m0 * x + b0;
    eq = `y=${tex(m0)}x+${tex(b0)}`;
  } else if (model === 'line') {
    const [m, b] = fitLinear(ux, uy);
    f = (x) => m * x + b;
    eq = `y=${tex(Math.round(m * 1000) / 1000)}x${b < 0 ? '-' : '+'}${tex(Math.abs(Math.round(b * 1000) / 1000))}`;
  } else if (model === 'quad') {
    const [a, b, c] = fitQuad(ux, uy);
    f = (x) => a * x * x + b * x + c;
    eq = `y=${tex(Math.round(a * 1000) / 1000)}x^2${b < 0 ? '-' : '+'}${tex(Math.abs(Math.round(b * 1000) / 1000))}x${c < 0 ? '-' : '+'}${tex(Math.abs(Math.round(c * 1000) / 1000))}`;
  } else {
    const [m, b] = fitLinear(ux, uy.map((y) => Math.log(y)));
    const a = Math.exp(b);
    f = (x) => a * Math.exp(m * x);
    eq = `y=${tex(Math.round(a * 1000) / 1000)}\\,e^{${tex(Math.round(m * 1000) / 1000)}x}`;
  }
  const sse = ux.reduce((s, x, i) => s + (uy[i] - f(x)) ** 2, 0);
  const xl = D.xs[D.xs.length - 1];
  const yl = D.ys[D.ys.length - 1];
  const pred = f(xl);
  const ymaxData = Math.max(...D.ys);
  const ymin = di === 0 ? 8 : 0;
  const ymax = di === 0 ? 24 : Math.ceil((ymaxData * 1.2) / 50) * 50;
  return (
    <div className="widget">
      <div className="widget-title">Modellillesztés és előrejelzés</div>
      <div className="relbuttons chips">
        {DSETS.map((s, i) => (
          <button
            key={s.id}
            className={di === i ? 'on' : ''}
            onClick={() => {
              setDi(i);
              setNUsed(i === 0 ? 7 : 8);
              setModel(i === 0 ? 'line' : 'quad');
            }}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {MODELS.map((s) => (
          <button key={s.id} className={model === s.id ? 'on' : ''} onClick={() => setModel(s.id)}>
            {s.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          a modellhez használt pontok: az első {n} / {D.xs.length}
          <input type="range" min={3} max={D.xs.length} step={1} value={nUsed} onChange={(e) => setNUsed(Number(e.target.value))} />
        </label>
        {model === 'manual' && (
          <>
            <label>
              meredekség m = {sg(m0)}
              <input type="range" min={0} max={4} step={0.1} value={m0} onChange={(e) => setM0(Math.round(Number(e.target.value) * 10) / 10)} />
            </label>
            <label>
              tengelymetszet b = {sg(b0)}
              <input type="range" min={5} max={15} step={0.1} value={b0} onChange={(e) => setB0(Math.round(Number(e.target.value) * 10) / 10)} />
            </label>
          </>
        )}
      </div>
      <Chart xmin={-0.5} xmax={xl + 0.5} ymin={ymin} ymax={ymax}>
        {(m) => {
          let d = '';
          const N = 200;
          for (let i = 0; i <= N; i++) {
            const x = m.xmin + ((m.xmax - m.xmin) * i) / N;
            d += `${i === 0 ? 'M' : 'L'}${m.X(x).toFixed(1)},${m.Y(f(x)).toFixed(1)} `;
          }
          return (
            <>
              {ux.map((x, i) => (
                <line key={`r${i}`} x1={m.X(x)} y1={m.Y(uy[i])} x2={m.X(x)} y2={m.Y(f(x))} stroke="#f59e0b" strokeWidth={2} strokeOpacity={0.7} />
              ))}
              <path d={d} className="pl-main" />
              {D.xs.map((x, i) => (
                <circle key={i} cx={m.X(x)} cy={m.Y(D.ys[i])} r={4.5} fill={i < n ? '#fb923c' : 'none'} stroke="#fb923c" strokeWidth={2} />
              ))}
            </>
          );
        }}
      </Chart>
      <div className="legend">
        teli pont: a modellhez használt adat · üres pont: nem használt (ezt kell megjósolni) · sárga szakaszok: a függőleges eltérések
      </div>
      <div className="result">
        <M block t={eq} />
      </div>
      <div className="explain">
        <p>
          Az eltérések négyzetösszege a használt pontokon: {round(sse, 2)}. Az utolsó adatnál (x = {xl}) a modell {round(pred, 1)} {D.unit}-t jósol, a valós érték {yl} {D.unit}
          {Math.abs(pred - yl) > 0.25 * Math.abs(yl) ? ': a jóslat messze eltér, a modell a mintatartományon kívül nem megbízható.' : ': a jóslat jó.'}
        </p>
      </div>
    </div>
  );
}
