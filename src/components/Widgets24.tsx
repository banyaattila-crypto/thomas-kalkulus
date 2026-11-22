import { useMemo, useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');
const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: jobb és bal oldali határérték */

type OneSidedEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  c: number;
  left: number | null;
  right: number | null;
  fAtC?: number;
  xr: [number, number];
  yr: [number, number];
  holes?: [number, number][];
  dots?: [number, number][];
  note: string;
};

const OS_EX: OneSidedEx[] = [
  {
    id: 'sign',
    name: '(x − 1) / |x − 1|',
    tex: 'f(x)=\\dfrac{x-1}{|x-1|},\\quad c=1',
    f: (x) => (Math.abs(x - 1) < 1e-12 ? NaN : (x - 1) / Math.abs(x - 1)),
    c: 1,
    left: -1,
    right: 1,
    xr: [-2, 4],
    yr: [-2, 2],
    holes: [
      [1, -1],
      [1, 1],
    ],
    note: 'A bal oldali határérték −1, a jobb oldali +1. Mivel a két féloldali határérték nem egyezik meg, az x = 1 helyen nincs kétoldali határérték.',
  },
  {
    id: 'semi',
    name: '√(9 − x²) (félkör)',
    tex: 'f(x)=\\sqrt{9-x^2},\\quad c=3',
    f: (x) => (x < -3 || x > 3 ? NaN : Math.sqrt(Math.max(0, 9 - x * x))),
    c: 3,
    left: 0,
    right: null,
    fAtC: 0,
    xr: [-4, 4.5],
    yr: [-0.8, 3.8],
    dots: [
      [-3, 0],
      [3, 0],
    ],
    note: 'A függvény 3-tól jobbra nincs értelmezve, ezért x = 3-ban csak bal oldali határérték létezik (értéke 0); kétoldali határérték nincs.',
  },
  {
    id: 'piece',
    name: 'kiugró pont (egyeznek)',
    tex: 'f(x)=\\begin{cases}x^2-1,&x<2\\\\ 5,&x=2\\\\ 5-x,&x>2\\end{cases},\\quad c=2',
    f: (x) => (Math.abs(x - 2) < 1e-12 ? NaN : x < 2 ? x * x - 1 : 5 - x),
    c: 2,
    left: 3,
    right: 3,
    fAtC: 5,
    xr: [-0.5, 4.5],
    yr: [-1.5, 6],
    holes: [[2, 3]],
    dots: [[2, 5]],
    note: 'Balról is és jobbról is 3-hoz tart a függvény, ezért a kétoldali határérték 3 — hiába ugrott el maga az f(2) = 5 érték.',
  },
  {
    id: 'osc',
    name: 'sin(1/x) (0-ban)',
    tex: 'f(x)=\\sin\\!\\left(\\tfrac{1}{x}\\right),\\quad c=0',
    f: (x) => (Math.abs(x) < 1e-7 ? NaN : Math.sin(1 / x)),
    c: 0,
    left: null,
    right: null,
    xr: [-1.5, 1.5],
    yr: [-1.5, 1.5],
    note: 'Akár jobbról, akár balról közelítünk 0-hoz, 1/x minden határon túl nő vagy csökken, a szinusz pedig végtelen sokszor befutja a [−1; 1] intervallumot: egyik féloldali határérték sem létezik.',
  },
];

const H_STEPS = [0.8, 0.4, 0.2, 0.1, 0.05, 0.02, 0.005];

export function OneSidedWidget() {
  const [idx, setIdx] = useState(0);
  const [hi, setHi] = useState(2);
  const ex = OS_EX[idx];
  const h = H_STEPS[hi];
  const xl = ex.c - h;
  const xr = ex.c + h;
  const yl = ex.f(xl);
  const yr = ex.f(xr);
  const twoSided = ex.left !== null && ex.right !== null && Math.abs(ex.left - ex.right) < 1e-9;

  return (
    <div className="widget">
      <div className="widget-title">Közelítés balról (x → c⁻) és jobbról (x → c⁺)</div>
      <div className="relbuttons chips">
        {OS_EX.map((item, i) => (
          <button key={item.id} className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {item.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <label>
        távolság c-től: h = {sg(h)} (bal pont: {round(xl, 3)}, jobb pont: {round(xr, 3)})
        <input type="range" min={0} max={H_STEPS.length - 1} step={1} value={hi} onChange={(e) => setHi(Number(e.target.value))} />
      </label>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={280}>
        {(m) => (
          <>
            <line x1={m.X(ex.c)} y1={0} x2={m.X(ex.c)} y2={m.h} className="pl-dash2" />
            <path d={curve(ex.f, m, ex.id === 'osc' ? 1400 : 500)} className="pl-main" />
            {ex.holes?.map((p, i) => (
              <circle key={`h${i}`} cx={m.X(p[0])} cy={m.Y(p[1])} r={5} className="pl-hole" stroke="#38bdf8" strokeWidth={2} />
            ))}
            {ex.dots?.map((p, i) => (
              <circle key={`d${i}`} cx={m.X(p[0])} cy={m.Y(p[1])} r={5} fill="#fbbf24" />
            ))}
            {Number.isFinite(yl) && (
              <>
                <line x1={m.X(xl)} y1={m.Y(0)} x2={m.X(xl)} y2={m.Y(yl)} className="pl-dash" />
                <circle cx={m.X(xl)} cy={m.Y(yl)} r={6} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
              </>
            )}
            {Number.isFinite(yr) && (
              <>
                <line x1={m.X(xr)} y1={m.Y(0)} x2={m.X(xr)} y2={m.Y(yr)} className="pl-dash" />
                <circle cx={m.X(xr)} cy={m.Y(yr)} r={6} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
              </>
            )}
          </>
        )}
      </Chart>
      <p className="legend">Narancs pont: közelítés balról (c − h). Zöld pont: közelítés jobbról (c + h).</p>
      <div className={`result verdict ${twoSided ? 'ok' : 'no'}`}>
        <table className="tbl">
          <thead>
            <tr>
              <th>irány</th>
              <th>aktuális érték</th>
              <th>határérték</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>balról (<M t={`x\\to ${tx(ex.c)}^-`} />)</td>
              <td>{Number.isFinite(yl) ? `f(${round(xl, 3)}) = ${round(yl, 4)}` : 'nincs értelmezve'}</td>
              <td>{ex.left === null ? 'nem létezik' : sg(ex.left)}</td>
            </tr>
            <tr>
              <td>jobbról (<M t={`x\\to ${tx(ex.c)}^+`} />)</td>
              <td>{Number.isFinite(yr) ? `f(${round(xr, 3)}) = ${round(yr, 4)}` : 'nincs értelmezve'}</td>
              <td>{ex.right === null ? 'nem létezik' : sg(ex.right)}</td>
            </tr>
            <tr>
              <td>kétoldali (<M t={`x\\to ${tx(ex.c)}`} />)</td>
              <td>{ex.fAtC !== undefined ? `f(${sg(ex.c)}) = ${sg(ex.fAtC)}` : `f(${sg(ex.c)}) nincs értelmezve`}</td>
              <td>
                <strong>{twoSided ? sg(ex.left!) : 'nem létezik'}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: féloldali ε–δ játék */

type SideEpsEx = {
  id: string;
  name: string;
  side: 'right' | 'left';
  tex: string;
  f: Fn;
  x0: number;
  L: number;
  xr: [number, number];
  yr: [number, number];
  cap: number;
  holes?: [number, number][];
  note: string;
};

const SIDE_EX: SideEpsEx[] = [
  {
    id: 'sqrtr',
    name: '√(x − 1), x → 1⁺',
    side: 'right',
    tex: '\\lim_{x\\to1^+}\\sqrt{x-1}=0',
    f: (x) => (x < 1 ? NaN : Math.sqrt(x - 1)),
    x0: 1,
    L: 0,
    xr: [0.4, 3.2],
    yr: [-0.6, 1.8],
    cap: 2,
    note: 'A 1 < x < 1 + δ feltételből √(x − 1) < √δ < ε, tehát δ = ε² pontosan a legnagyobb jó választás.',
  },
  {
    id: 'sqrtl',
    name: '√(4 − x), x → 4⁻',
    side: 'left',
    tex: '\\lim_{x\\to4^-}\\sqrt{4-x}=0',
    f: (x) => (x > 4 ? NaN : Math.sqrt(4 - x)),
    x0: 4,
    L: 0,
    xr: [1.8, 4.6],
    yr: [-0.6, 1.8],
    cap: 2,
    note: 'Bal oldali határértéknél a 4 − δ < x < 4 sávot vizsgáljuk: itt 0 < 4 − x < δ, így ismét δ = ε² adja a pontos határt.',
  },
  {
    id: 'stepr',
    name: 'ugrás jobbról (jó)',
    side: 'right',
    tex: 'f(x)=\\begin{cases}-1,&x<0\\\\ x+1,&x>0\\end{cases},\\quad \\lim_{x\\to0^+}f(x)=1',
    f: (x) => (Math.abs(x) < 1e-12 ? NaN : x < 0 ? -1 : x + 1),
    x0: 0,
    L: 1,
    xr: [-1.5, 2],
    yr: [-1.6, 2.8],
    cap: 1.8,
    holes: [
      [0, -1],
      [0, 1],
    ],
    note: 'Mivel csak a jobb oldali 0 < x < δ sáv számít, a bal oldali −1 ág nem rontja el az eredményt: δ = ε minden ε > 0-ra megfelel.',
  },
];

const SIDE_EPS = [1, 0.5, 0.3, 0.2, 0.1];

function firstBadSide(f: Fn, x0: number, L: number, eps: number, d: number, side: 'right' | 'left'): number | null {
  const N = 1200;
  const s = side === 'right' ? 1 : -1;
  for (let i = 1; i <= N; i++) {
    const x = x0 + s * ((d * i) / N);
    const y = f(x);
    if (!Number.isFinite(y) || !(Math.abs(y - L) < eps)) return x;
  }
  return null;
}

function maxDeltaSide(f: Fn, x0: number, L: number, eps: number, cap: number, side: 'right' | 'left'): number {
  if (firstBadSide(f, x0, L, eps, cap, side) === null) return cap;
  let lo = 0;
  let hi = cap;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (firstBadSide(f, x0, L, eps, mid, side) === null) lo = mid;
    else hi = mid;
  }
  return lo;
}

export function OneSidedEpsDeltaWidget() {
  const [si, setSi] = useState(0);
  const [ei, setEi] = useState(1);
  const [t, setT] = useState(55);
  const ex = SIDE_EX[si];
  const eps = SIDE_EPS[ei];
  const delta = ex.cap * Math.pow(t / 100, 3);
  const bad = firstBadSide(ex.f, ex.x0, ex.L, eps, delta, ex.side);
  const md = useMemo(() => maxDeltaSide(ex.f, ex.x0, ex.L, eps, ex.cap, ex.side), [si, ei]);

  return (
    <div className="widget">
      <div className="widget-title">Féloldali ε–δ ablak</div>
      <div className="relbuttons chips">
        {SIDE_EX.map((q, i) => (
          <button key={q.id} className={si === i ? 'on' : ''} onClick={() => setSi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <div className="sliders">
        <label>
          ε = {sg(eps)}
          <input type="range" min={0} max={SIDE_EPS.length - 1} step={1} value={ei} onChange={(e) => setEi(Number(e.target.value))} />
        </label>
        <label>
          δ = {round(delta, 4)} (legnagyobb jó δ ≈ {round(md, 4)})
          <input type="range" min={1} max={100} step={0.5} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={270}>
        {(m) => {
          const yT = Math.max(0, m.Y(ex.L + eps));
          const yB = Math.min(m.h, m.Y(ex.L - eps));
          const xa = ex.side === 'right' ? m.X(ex.x0) : Math.max(0, m.X(ex.x0 - delta));
          const xb = ex.side === 'right' ? Math.min(m.w, m.X(ex.x0 + delta)) : m.X(ex.x0);
          return (
            <>
              <rect x={0} y={yT} width={m.w} height={Math.max(0, yB - yT)} className="band-eps" />
              <rect x={xa} y={0} width={Math.max(0, xb - xa)} height={m.h} className="band-delta" />
              <line x1={0} y1={m.Y(ex.L)} x2={m.w} y2={m.Y(ex.L)} className="pl-dash2" />
              <line x1={m.X(ex.x0)} y1={0} x2={m.X(ex.x0)} y2={m.h} className="pl-dash2" />
              <path d={curve(ex.f, m, 500)} className="pl-main" />
              {ex.holes?.map((p, i) => (
                <circle key={`h${i}`} cx={m.X(p[0])} cy={m.Y(p[1])} r={5} className="pl-hole" stroke="#38bdf8" strokeWidth={2} />
              ))}
              {bad !== null && Number.isFinite(ex.f(bad)) && (
                <circle cx={m.X(bad)} cy={m.Y(ex.f(bad))} r={6} fill="#f87171" stroke="#fff" strokeWidth={1.5} />
              )}
            </>
          );
        }}
      </Chart>
      <p className="legend">
        Kék sáv: a féloldali {ex.side === 'right' ? '(x₀; x₀ + δ)' : '(x₀ − δ; x₀)'} ablak. Narancs sáv: az ε-sáv.
      </p>
      <div className={`result verdict ${bad === null ? 'ok' : 'no'}`}>
        {bad === null ? (
          <p>
            <strong>Megfelel.</strong> A féloldali ablak minden pontjában a görbe a narancs ε-sávon belül marad.
          </p>
        ) : (
          <p>
            <strong>Nem felel meg.</strong> Az <M t={`x=${tx(bad)}`} /> helyen az eltérés legalább ε. Csökkentsd δ-t!
          </p>
        )}
      </div>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: (sin θ)/θ geometriai szendvics */

export function SinThetaWidget() {
  const [theta, setTheta] = useState(0.75);
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const tg = Math.tan(theta);
  const ratio = s / theta;

  // Egységkör rajzolása SVG-ben: O = (70, 230), R = 175
  const ox = 70;
  const oy = 230;
  const R = 175;
  const ax = ox + R;
  const ay = oy;
  const px = ox + R * c;
  const py = oy - R * s;
  const txp = ax;
  const typ = oy - R * Math.min(tg, 2.2);

  const sectorPath = `M ${ox} ${oy} L ${ax} ${ay} A ${R} ${R} 0 0 0 ${px.toFixed(1)} ${py.toFixed(1)} Z`;

  return (
    <div className="widget">
      <div className="widget-title">A (sin θ) / θ határérték geometriai szendvicse</div>
      <label>
        középponti szög: θ = {round(theta, 3)} rad ({round((theta * 180) / Math.PI, 1)}°)
        <input type="range" min={0.05} max={1.15} step={0.01} value={theta} onChange={(e) => setTheta(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 420 270" className="plane" role="img" aria-label="Egységkör három területe">
        <rect width={420} height={270} className="pl-bg" />
        {/* Tengelyek */}
        <line x1={20} y1={oy} x2={400} y2={oy} className="pl-axis" />
        <line x1={ox} y1={15} x2={ox} y2={255} className="pl-axis" />
        {/* Negyedkörív */}
        <path d={`M ${ax} ${ay} A ${R} ${R} 0 0 0 ${ox} ${oy - R}`} className="pl-dash2" />
        {/* Külső háromszög OAT */}
        <polygon points={`${ox},${oy} ${ax},${ay} ${txp},${typ}`} fill="rgba(251, 146, 60, 0.16)" stroke="#fb923c" strokeWidth={1.8} />
        {/* Körcikk OAP */}
        <path d={sectorPath} fill="rgba(56, 189, 248, 0.22)" stroke="#38bdf8" strokeWidth={2} />
        {/* Belső háromszög OAP */}
        <polygon points={`${ox},${oy} ${ax},${ay} ${px},${py}`} fill="rgba(52, 211, 153, 0.28)" stroke="#34d399" strokeWidth={2} />
        {/* Magasság P-ből */}
        <line x1={px} y1={py} x2={px} y2={oy} className="pl-dash" />
        {/* Pontok és feliratok */}
        <circle cx={ox} cy={oy} r={4} fill="#e2e8f0" />
        <text x={ox - 16} y={oy + 16} fill="#e2e8f0" className="pl-label">O</text>
        <circle cx={ax} cy={ay} r={4.5} fill="#fbbf24" />
        <text x={ax + 8} y={ay + 16} fill="#fbbf24" className="pl-label">A(1; 0)</text>
        <circle cx={px} cy={py} r={5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.2} />
        <text x={px - 18} y={py - 10} fill="#34d399" className="pl-label">P(cos θ; sin θ)</text>
        <circle cx={txp} cy={typ} r={5} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.2} />
        <text x={txp + 8} y={Math.max(22, typ + 4)} fill="#fb923c" className="pl-label">T(1; tg θ)</text>
      </svg>
      <p className="legend">Zöld: OAP háromszög (½ sin θ). Kék: OAP körcikk (½ θ). Narancs: OAT háromszög (½ tg θ).</p>
      <div className="result">
        <table className="tbl">
          <thead>
            <tr>
              <th>mennyiség</th>
              <th>képlet</th>
              <th>érték</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>belső háromszög területe</td>
              <td><M t="\frac{1}{2}\sin\theta" /></td>
              <td>{round(0.5 * s, 5)}</td>
            </tr>
            <tr>
              <td>körcikk területe (radián!)</td>
              <td><M t="\frac{1}{2}\theta" /></td>
              <td>{round(0.5 * theta, 5)}</td>
            </tr>
            <tr>
              <td>külső háromszög területe</td>
              <td><M t="\frac{1}{2}\operatorname{tg}\theta" /></td>
              <td>{round(0.5 * tg, 5)}</td>
            </tr>
          </tbody>
        </table>
        <M block t={`\\cos\\theta = ${tx(c, 5)} \\; < \\; \\dfrac{\\sin\\theta}{\\theta} = ${tx(ratio, 5)} \\; < \\; 1`} />
        <p>
          Húzd θ-t 0 felé: a három alakzat gyakorlatilag egybeesik, és a két szélső korlát (<M t="\cos\theta" /> és <M t="1" />) 1-nél összezárja a hányadost.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: határérték a végtelenben (ε–M játék) */

type InfEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  Lpos: number;
  Lneg: number;
  yr: [number, number];
  note: string;
};

const INF_EX: InfEx[] = [
  {
    id: 'inv',
    name: '1 / x',
    tex: 'f(x)=\\dfrac{1}{x}',
    f: (x) => (Math.abs(x) < 1e-6 ? NaN : 1 / x),
    Lpos: 0,
    Lneg: 0,
    yr: [-1.5, 1.5],
    note: 'Az 1/x mindkét irányban 0-hoz tart. A pontos küszöb M = 1/ε (illetve N = −1/ε).',
  },
  {
    id: 'rat',
    name: '(3x − 1) / (x + 2)',
    tex: 'f(x)=\\dfrac{3x-1}{x+2}',
    f: (x) => (Math.abs(x + 2) < 1e-6 ? NaN : (3 * x - 1) / (x + 2)),
    Lpos: 3,
    Lneg: 3,
    yr: [-1, 6],
    note: 'Mindkét irányban az y = 3 vízszintes egyeneshez simul: |f(x) − 3| = 7/|x + 2| < ε, amint |x + 2| > 7/ε.',
  },
  {
    id: 'osc',
    name: '2 + (sin x) / x',
    tex: 'f(x)=2+\\dfrac{\\sin x}{x}',
    f: (x) => (Math.abs(x) < 1e-6 ? 3 : 2 + Math.sin(x) / x),
    Lpos: 2,
    Lneg: 2,
    yr: [0.5, 3.5],
    note: 'A függvény végtelen sokszor metszi saját vízszintes aszimptotáját (y = 2), de a kilengés 1/|x| alá szorul, így a határérték mégis 2.',
  },
  {
    id: 'sqrt2',
    name: '2x / √(x² + 1)',
    tex: 'f(x)=\\dfrac{2x}{\\sqrt{x^2+1}}',
    f: (x) => (2 * x) / Math.sqrt(x * x + 1),
    Lpos: 2,
    Lneg: -2,
    yr: [-3, 3],
    note: 'Két különböző vízszintes aszimptota! Ha x → +∞, akkor √(x²) = x, ezért a határérték +2; ha x → −∞, akkor √(x²) = −x, ezért −2.',
  },
];

const INF_EPS = [0.8, 0.4, 0.2, 0.1];

export function InfLimitWidget() {
  const [ii, setIi] = useState(0);
  const [dir, setDir] = useState<'pos' | 'neg'>('pos');
  const [ei, setEi] = useState(1);
  const [Mval, setMval] = useState(6);
  const ex = INF_EX[ii];
  const eps = INF_EPS[ei];
  const L = dir === 'pos' ? ex.Lpos : ex.Lneg;
  const maxX = 25;

  // Ellenőrzés a [M, 80] (vagy [-80, -M]) szakaszon
  const bad = useMemo(() => {
    const N = 2000;
    for (let i = 1; i <= N; i++) {
      const dist = Mval + ((80 - Mval) * i) / N;
      const x = dir === 'pos' ? dist : -dist;
      const y = ex.f(x);
      if (!Number.isFinite(y) || !(Math.abs(y - L) < eps)) return x;
    }
    return null;
  }, [ii, dir, ei, Mval]);

  return (
    <div className="widget">
      <div className="widget-title">Határérték a végtelenben: ε–M (és ε–N) küszöb</div>
      <div className="relbuttons chips">
        {INF_EX.map((q, i) => (
          <button key={q.id} className={ii === i ? 'on' : ''} onClick={() => setIi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        <button className={dir === 'pos' ? 'on' : ''} onClick={() => setDir('pos')}>
          x → +∞ (keress M-et)
        </button>
        <button className={dir === 'neg' ? 'on' : ''} onClick={() => setDir('neg')}>
          x → −∞ (keress N-et)
        </button>
      </div>
      <p className="legend">
        <M t={`${ex.tex},\\quad \\lim_{x\\to ${dir === 'pos' ? '\\infty' : '-\\infty'}} f(x) = ${tx(L, 2)}`} />
      </p>
      <div className="sliders">
        <label>
          hibahatár: ε = {sg(eps)}
          <input type="range" min={0} max={INF_EPS.length - 1} step={1} value={ei} onChange={(e) => setEi(Number(e.target.value))} />
        </label>
        <label>
          küszöb: {dir === 'pos' ? `M = ${sg(Mval)}` : `N = ${sg(-Mval)}`}
          <input type="range" min={1} max={22} step={0.5} value={Mval} onChange={(e) => setMval(Number(e.target.value))} />
        </label>
      </div>
      <Chart xmin={dir === 'pos' ? -2 : -maxX} xmax={dir === 'pos' ? maxX : 2} ymin={ex.yr[0]} ymax={ex.yr[1]} h={270}>
        {(m) => {
          const yT = Math.max(0, m.Y(L + eps));
          const yB = Math.min(m.h, m.Y(L - eps));
          const bx = dir === 'pos' ? m.X(Mval) : 0;
          const bw = dir === 'pos' ? Math.max(0, m.w - m.X(Mval)) : Math.max(0, m.X(-Mval));
          return (
            <>
              <rect x={0} y={yT} width={m.w} height={Math.max(0, yB - yT)} className="band-eps" />
              <rect x={bx} y={0} width={bw} height={m.h} className="band-delta" />
              <line x1={0} y1={m.Y(L)} x2={m.w} y2={m.Y(L)} className="pl-dash2" />
              <line x1={m.X(dir === 'pos' ? Mval : -Mval)} y1={0} x2={m.X(dir === 'pos' ? Mval : -Mval)} y2={m.h} className="pl-dash" />
              <path d={curve(ex.f, m, 700)} className="pl-main" />
              {bad !== null && Math.abs(bad) <= maxX && Number.isFinite(ex.f(bad)) && (
                <circle cx={m.X(bad)} cy={m.Y(ex.f(bad))} r={6} fill="#f87171" stroke="#fff" strokeWidth={1.5} />
              )}
            </>
          );
        }}
      </Chart>
      <p className="legend">
        Narancs sáv: (L − ε; L + ε). Kék tartomány: {dir === 'pos' ? 'x > M' : 'x < N'}.
      </p>
      <div className={`result verdict ${bad === null ? 'ok' : 'no'}`}>
        {bad === null ? (
          <p>
            <strong>Megfelel.</strong> A küszöbön túl ({dir === 'pos' ? `x > ${sg(Mval)}` : `x < ${sg(-Mval)}`}) a grafikon végig a narancs ε-sávban marad.
          </p>
        ) : (
          <p>
            <strong>Még nem elég messze.</strong> Az <M t={`x=${tx(bad, 2)}`} /> helyen még kilóg a sávból — toljd kijjebb a küszöböt!
          </p>
        )}
      </div>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: vízszintes és ferde aszimptoták */

type AsymEx = {
  id: string;
  name: string;
  tex: string;
  asymTex: string;
  f: Fn;
  g: Fn;
  note: string;
};

const ASYM_EX: AsymEx[] = [
  {
    id: 'same',
    name: 'azonos fok (vízszintes)',
    tex: 'f(x)=\\dfrac{4x^2-3x+1}{2x^2+5}',
    asymTex: 'y = 2',
    f: (x) => (4 * x * x - 3 * x + 1) / (2 * x * x + 5),
    g: () => 2,
    note: 'A számláló és a nevező is másodfokú: x²-tel osztva a főegyütthatók hányadosa 4/2 = 2 marad.',
  },
  {
    id: 'low',
    name: 'kisebb számlálófok (y = 0)',
    tex: 'f(x)=\\dfrac{5x-4}{x^2+3}',
    asymTex: 'y = 0',
    f: (x) => (5 * x - 4) / (x * x + 3),
    g: () => 0,
    note: 'A nevező fokszáma nagyobb, ezért x²-tel osztva a számláló 0-hoz, a nevező 1-hez tart: a vízszintes aszimptota az x-tengely.',
  },
  {
    id: 'oblique',
    name: 'ferde aszimptota',
    tex: 'f(x)=\\dfrac{x^2-2x+3}{x+1} = x - 3 + \\dfrac{6}{x+1}',
    asymTex: 'y = x - 3',
    f: (x) => (Math.abs(x + 1) < 1e-4 ? NaN : (x * x - 2 * x + 3) / (x + 1)),
    g: (x) => x - 3,
    note: 'A számláló eggyel magasabb fokú, mint a nevező. Polinomosztással lineáris rész + 0-hoz tartó maradék: a függőleges távolság |f(x) − (x − 3)| = 6/|x + 1| → 0.',
  },
  {
    id: 'cross',
    name: 'aszimptotát metsző',
    tex: 'f(x)=1+\\dfrac{2\\sin x}{x}',
    asymTex: 'y = 1',
    f: (x) => (Math.abs(x) < 1e-5 ? 3 : 1 + (2 * Math.sin(x)) / x),
    g: () => 1,
    note: 'A görbe minden x = kπ pontban metszi az y = 1 aszimptotát, mégis tetszőlegesen közel simul hozzá, mert |2 sin x / x| ≤ 2/|x| → 0.',
  },
];

export function AsymptoteWidget() {
  const [ai, setAi] = useState(2);
  const [R, setR] = useState(14);
  const [probe, setProbe] = useState(8);
  const ex = ASYM_EX[ai];
  const px = Math.min(R * 0.9, Math.max(-R * 0.9, probe));
  const fx = ex.f(px);
  const gx = ex.g(px);
  const gap = Math.abs(fx - gx);
  const ymax = ex.id === 'oblique' ? R + 2 : 5;
  const ymin = ex.id === 'oblique' ? -R - 4 : -3;

  return (
    <div className="widget">
      <div className="widget-title">Vízszintes és ferde aszimptoták: távolodás a végtelenbe</div>
      <div className="relbuttons chips">
        {ASYM_EX.map((q, i) => (
          <button key={q.id} className={ai === i ? 'on' : ''} onClick={() => setAi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={`${ex.tex},\\qquad \\text{aszimptota: } ${ex.asymTex}`} />
      </p>
      <div className="sliders">
        <label>
          látótér: [−{R}; {R}]
          <input type="range" min={6} max={40} step={2} value={R} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          mérőpont: x = {round(px, 1)}
          <input type="range" min={-36} max={36} step={1} value={probe} onChange={(e) => setProbe(Number(e.target.value))} />
        </label>
      </div>
      <Chart xmin={-R} xmax={R} ymin={ymin} ymax={ymax} h={280}>
        {(m) => (
          <>
            <path d={curve(ex.g, m, 100)} className="pl-alt" strokeDasharray="7 5" />
            <path d={curve(ex.f, m, 700)} className="pl-main" />
            {Number.isFinite(fx) && (
              <>
                <line x1={m.X(px)} y1={m.Y(fx)} x2={m.X(px)} y2={m.Y(gx)} stroke="#34d399" strokeWidth={2.5} />
                <circle cx={m.X(px)} cy={m.Y(fx)} r={5} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />
                <circle cx={m.X(px)} cy={m.Y(gx)} r={5} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
              </>
            )}
          </>
        )}
      </Chart>
      <p className="legend">Kék: y = f(x). Narancs szaggatott: aszimptota. Zöld szakasz: függőleges távolság |f(x) − g(x)|.</p>
      <div className="result">
        {Number.isFinite(fx) ? (
          <M block t={`x=${tx(px, 1)}:\\quad f(x)=${tx(fx, 3)},\\quad g(x)=${tx(gx, 3)},\\quad |f(x)-g(x)|=${tx(gap, 4)}`} />
        ) : (
          <p>A mérőpont épp a függőleges pólusra esik; mozdítsd el x-et!</p>
        )}
      </div>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}
