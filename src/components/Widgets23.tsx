import { useMemo, useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');
/** Szám KaTeX-barát, magyar tizedesvesszős alakban (4 értékes tizedesig). */
const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('-', '-');

/* ------------------------------------------------------------------ közös számoló függvények */

/** Az x0-hoz legközelebbi olyan x (0 < |x − x0| < d), ahol |f(x) − L| < eps NEM teljesül; null, ha nincs ilyen. */
export function firstBad(f: Fn, x0: number, L: number, eps: number, d: number): number | null {
  const N = 1500;
  for (let i = 1; i <= N; i++) {
    const t = (d * i) / N;
    for (const s of [-1, 1]) {
      const x = x0 + s * t;
      if (!(Math.abs(f(x) - L) < eps)) return x;
    }
  }
  return null;
}

/** A legnagyobb δ (a cap-ig), amelyre a definíció feltétele teljesül (felezéssel keresve). */
export function maxDelta(f: Fn, x0: number, L: number, eps: number, cap: number): number {
  if (firstBad(f, x0, L, eps, cap) === null) return cap;
  let lo = 0;
  let hi = cap;
  for (let i = 0; i < 45; i++) {
    const mid = (lo + hi) / 2;
    if (firstBad(f, x0, L, eps, mid) === null) lo = mid;
    else hi = mid;
  }
  return lo;
}

/* ------------------------------------------------------------------ 1–2. oldal: ε–δ játék */

type G = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  x0: number;
  L: number;
  xr: [number, number];
  yr: [number, number];
  cap: number;
  holes?: [number, number][];
  dots?: [number, number][];
  note: string;
};

const GS: G[] = [
  {
    id: 'lin',
    name: '5x − 3',
    tex: '\\lim_{x\\to1}(5x-3)=2',
    f: (x) => 5 * x - 3,
    x0: 1,
    L: 2,
    xr: [-0.5, 2.5],
    yr: [-6, 9],
    cap: 1.5,
    note: 'Meredek egyenes: a függvényérték ötszörös sebességgel változik, ezért kis ε-hoz nagyon kicsi δ kell.',
  },
  {
    id: 'sq',
    name: 'x² (x → 2)',
    tex: '\\lim_{x\\to2}x^2=4',
    f: (x) => x * x,
    x0: 2,
    L: 4,
    xr: [0, 4],
    yr: [-1, 9],
    cap: 2,
    note: 'Az ablak két oldala nem egyforma hosszú: a megengedett x-tartomány az x₀ egyik oldalán szűkebb.',
  },
  {
    id: 'sqrt',
    name: '√(x + 4) (x → 5)',
    tex: '\\lim_{x\\to5}\\sqrt{x+4}=3',
    f: (x) => Math.sqrt(x + 4),
    x0: 5,
    L: 3,
    xr: [-1, 11],
    yr: [0, 5],
    cap: 6,
    note: 'A gyökfüggvény lapul: nagy ε-nál nagy δ is megfelel, de a bal és a jobb oldal ismét más hosszú.',
  },
  {
    id: 'iso',
    name: 'kiugró pont',
    tex: 'f(x)=x^2\\ (x\\ne2),\\ f(2)=-3;\\ \\ L=4',
    f: (x) => x * x,
    x0: 2,
    L: 4,
    xr: [0, 4],
    yr: [-4, 9],
    cap: 2,
    holes: [[2, 4]],
    dots: [[2, -3]],
    note: 'A függvény értéke x₀-ban (−3) nem számít, mert a feltétel 0 < |x − x₀|. A határérték ettől még 4, a függvényérték viszont nem.',
  },
  {
    id: 'step',
    name: 'ugrás (nincs határérték)',
    tex: 'f(x)=\\begin{cases}-1,&x<0\\\\1,&x>0\\end{cases};\\ \\ L=1\\text{ (állítás)}',
    f: (x) => (x === 0 ? NaN : x < 0 ? -1 : 1),
    x0: 0,
    L: 1,
    xr: [-2, 2],
    yr: [-2, 2],
    cap: 2,
    holes: [
      [0, -1],
      [0, 1],
    ],
    note: 'Itt a szkeptikus nyer: kis ε-nál a bal oldali −1 értékek messze vannak az állított 1-től, bármilyen kicsi is az ablak.',
  },
];
const EPS = [3, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

export function EpsDeltaGame({ start = 0 }: { start?: number }) {
  const [gi, setGi] = useState(start);
  const [ei, setEi] = useState(1);
  const [t, setT] = useState(60);
  const [show, setShow] = useState(false);
  const g = GS[gi];
  const eps = EPS[ei];
  const delta = g.cap * Math.pow(t / 100, 3);
  const bad = firstBad(g.f, g.x0, g.L, eps, delta);
  const md = useMemo(() => maxDelta(g.f, g.x0, g.L, eps, g.cap), [gi, ei]);
  const none = md < 1e-9;
  const setDelta = (d: number) => setT(Math.max(0.5, Math.min(100, 100 * Math.cbrt(d / g.cap))));
  return (
    <div className="widget">
      <div className="widget-title">Az ε–δ játék: te vagy a válaszadó</div>
      <div className="relbuttons chips">
        {GS.map((q, i) => (
          <button
            key={q.id}
            className={gi === i ? 'on' : ''}
            onClick={() => {
              setGi(i);
              setShow(false);
            }}
          >
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        Állítás: <M t={g.tex} />
      </p>
      <div className="sliders">
        <label>
          a szkeptikus kihívása: ε = {sg(eps)}
          <input type="range" min={0} max={EPS.length - 1} step={1} value={ei} onChange={(e) => setEi(Number(e.target.value))} />
        </label>
        <label>
          a te válaszod: δ = {round(delta, 5)}
          <input type="range" min={0.5} max={100} step={0.5} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        <button onClick={() => setDelta(delta / 2)}>δ ÷ 2</button>
        <button onClick={() => setDelta(delta * 2)}>δ × 2</button>
        <button
          onClick={() => {
            setShow(true);
            if (!none) setDelta(md * 0.995);
          }}
        >
          mutasd a legnagyobb jó δ-t
        </button>
      </div>
      <Chart xmin={g.xr[0]} xmax={g.xr[1]} ymin={g.yr[0]} ymax={g.yr[1]} h={300}>
        {(m) => {
          const yT = Math.max(0, m.Y(g.L + eps));
          const yB = Math.min(m.h, m.Y(g.L - eps));
          const xa = Math.max(0, m.X(g.x0 - delta));
          const xb = Math.min(m.w, m.X(g.x0 + delta));
          return (
            <>
              <rect x={0} y={yT} width={m.w} height={Math.max(0, yB - yT)} className="band-eps" />
              <rect x={xa} y={0} width={Math.max(0, xb - xa)} height={m.h} className="band-delta" />
              <line x1={0} y1={m.Y(g.L)} x2={m.w} y2={m.Y(g.L)} className="pl-dash2" />
              <line x1={m.X(g.x0)} y1={0} x2={m.X(g.x0)} y2={m.h} className="pl-dash2" />
              <path d={curve(g.f, m, 400)} className="pl-main" />
              {g.holes?.map((p, i) => (
                <circle key={`h${i}`} cx={m.X(p[0])} cy={m.Y(p[1])} r={5} className="pl-hole" stroke="#38bdf8" strokeWidth={2} />
              ))}
              {g.dots?.map((p, i) => (
                <circle key={`d${i}`} cx={m.X(p[0])} cy={m.Y(p[1])} r={5} fill="#fbbf24" />
              ))}
              {bad !== null && Number.isFinite(g.f(bad)) && <circle cx={m.X(bad)} cy={m.Y(g.f(bad))} r={6} fill="#f87171" stroke="#fff" strokeWidth={1.5} />}
            </>
          );
        }}
      </Chart>
      <p className="legend">Narancs sáv: az ε-sáv (L − ε; L + ε). Kék sáv: a δ-ablak (x₀ − δ; x₀ + δ). Piros pont: az első hiba.</p>
      <div className={`result verdict ${bad === null ? 'ok' : 'no'}`}>
        {bad === null ? (
          <p>
            <strong>Megfelel.</strong> A δ-ablak minden, x₀-tól különböző pontjában az eltérés kisebb, mint ε: a függvénygrafikon a narancs sávon belül marad.
          </p>
        ) : (
          <p>
            <strong>Nem felel meg.</strong> Az <M t={`x=${tx(bad)}`} /> helyen az eltérés <M t={`|f(x)-L|=${Number.isFinite(g.f(bad)) ? tx(Math.abs(g.f(bad) - g.L), 4) : '?'}`} />, ez nem kisebb, mint <M t={`\\varepsilon=${tx(eps)}`} />. Kisebb δ kell.
          </p>
        )}
        {show && (
          <p>
            {none ? (
              <>
                Ehhez az ε-hoz <strong>nincs</strong> megfelelő δ: bármilyen szűk is az ablak, találni benne olyan x-et, ahol az eltérés legalább ε. Ezért az állított L nem határérték.
              </>
            ) : (
              <>
                A legnagyobb jó δ ≈ <strong>{round(md, 5)}</strong>
                {md >= g.cap - 1e-9 ? ' (a nézet széléig minden megfelel)' : ''}. Ennél kisebb δ is jó, nagyobb már nem.
              </>
            )}
          </p>
        )}
      </div>
      <div className="explain">
        <p>{g.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: a δ keresésének receptje */

type R = {
  id: string;
  name: string;
  f: Fn;
  x0: number;
  L: number;
  interval: (e: number) => [number, number];
  step1: string;
};
const RS: R[] = [
  {
    id: 'lin',
    name: '3x + 1 (x → 2)',
    f: (x) => 3 * x + 1,
    x0: 2,
    L: 7,
    interval: (e) => [2 - e / 3, 2 + e / 3],
    step1: '|3x+1-7|<\\varepsilon\\iff 3\\,|x-2|<\\varepsilon\\iff 2-\\tfrac{\\varepsilon}{3}<x<2+\\tfrac{\\varepsilon}{3}',
  },
  {
    id: 'sqrt',
    name: '√(x + 4) (x → 5)',
    f: (x) => Math.sqrt(x + 4),
    x0: 5,
    L: 3,
    interval: (e) => [(3 - e) ** 2 - 4, (3 + e) ** 2 - 4],
    step1: '|\\sqrt{x+4}-3|<\\varepsilon\\iff 3-\\varepsilon<\\sqrt{x+4}<3+\\varepsilon\\iff (3-\\varepsilon)^2-4<x<(3+\\varepsilon)^2-4',
  },
  {
    id: 'inv',
    name: '1/x (x → 2)',
    f: (x) => 1 / x,
    x0: 2,
    L: 0.5,
    interval: (e) => [1 / (0.5 + e), 1 / (0.5 - e)],
    step1: '\\left|\\tfrac1x-\\tfrac12\\right|<\\varepsilon\\iff \\tfrac12-\\varepsilon<\\tfrac1x<\\tfrac12+\\varepsilon\\iff \\dfrac{1}{\\frac12+\\varepsilon}<x<\\dfrac{1}{\\frac12-\\varepsilon}',
  },
];
const RE = [0.4, 0.2, 0.1, 0.05, 0.02, 0.01];

export function RecipeWidget() {
  const [ri, setRi] = useState(1);
  const [ei, setEi] = useState(1);
  const R = RS[ri];
  const e = RE[ei];
  const [a, b] = R.interval(e);
  const dl = R.x0 - a;
  const dr = b - R.x0;
  const d = Math.min(dl, dr);
  const W = 1.6 * Math.max(dl, dr);
  return (
    <div className="widget">
      <div className="widget-title">A δ megkeresése két lépésben</div>
      <div className="relbuttons chips">
        {RS.map((q, i) => (
          <button key={q.id} className={ri === i ? 'on' : ''} onClick={() => setRi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <label>
        ε = {sg(e)}
        <input type="range" min={0} max={RE.length - 1} step={1} value={ei} onChange={(ev) => setEi(Number(ev.target.value))} />
      </label>
      <Chart xmin={R.x0 - W} xmax={R.x0 + W} ymin={R.L - 1.8 * e} ymax={R.L + 1.8 * e} h={280}>
        {(m) => {
          const yT = Math.max(0, m.Y(R.L + e));
          const yB = Math.min(m.h, m.Y(R.L - e));
          return (
            <>
              <rect x={0} y={yT} width={m.w} height={Math.max(0, yB - yT)} className="band-eps" />
              <rect x={Math.max(0, m.X(a))} y={0} width={Math.max(0, Math.min(m.w, m.X(b)) - Math.max(0, m.X(a)))} height={m.h} className="band-ab" />
              <rect x={Math.max(0, m.X(R.x0 - d))} y={0} width={Math.max(0, Math.min(m.w, m.X(R.x0 + d)) - Math.max(0, m.X(R.x0 - d)))} height={m.h} className="band-delta" />
              <line x1={0} y1={m.Y(R.L)} x2={m.w} y2={m.Y(R.L)} className="pl-dash2" />
              <line x1={m.X(R.x0)} y1={0} x2={m.X(R.x0)} y2={m.h} className="pl-dash2" />
              <path d={curve(R.f, m, 800)} className="pl-main" />
            </>
          );
        }}
      </Chart>
      <p className="legend">Narancs: ε-sáv. Zöld: az 1. lépés (a; b) intervalluma. Kék: a 2. lépés δ-ablaka, amely x₀ köré szimmetrikusan belefér az (a; b)-be.</p>
      <div className="result">
        <p>
          <strong>1. lépés:</strong> az |f(x) − L| &lt; ε egyenlőtlenség megoldása
        </p>
        <M block t={R.step1} />
        <M block t={`(a;b)=\\left(${tx(a)};\\,${tx(b)}\\right)`} />
        <p>
          <strong>2. lépés:</strong> az x₀ = {R.x0} és az intervallum végpontjainak távolsága
        </p>
        <M block t={`x_0-a=${tx(dl)},\\qquad b-x_0=${tx(dr)},\\qquad \\delta=\\min\\{${tx(dl)};\\,${tx(dr)}\\}=${tx(d)}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: pontos és biztonságos δ (x²) */

const SX = [1, 2, 3, 5];
const SE = [2, 1, 0.5, 0.1, 0.01];
const sq: Fn = (x) => x * x;

export function SafeDeltaWidget() {
  const [xi, setXi] = useState(2);
  const [ei, setEi] = useState(2);
  const x0 = SX[xi];
  const eps = SE[ei];
  const L = x0 * x0;
  const exact = useMemo(() => maxDelta(sq, x0, L, eps, 10), [xi, ei]);
  const safe = Math.min(1, eps / (2 * x0 + 1));
  const W = 2.2 * exact;
  return (
    <div className="widget">
      <div className="widget-title">x² határértéke: pontos és biztonságos δ</div>
      <div className="relbuttons chips">
        {SX.map((v, i) => (
          <button key={v} className={xi === i ? 'on' : ''} onClick={() => setXi(i)}>
            x₀ = {v}
          </button>
        ))}
      </div>
      <label>
        ε = {sg(eps)}
        <input type="range" min={0} max={SE.length - 1} step={1} value={ei} onChange={(e) => setEi(Number(e.target.value))} />
      </label>
      <Chart xmin={x0 - W} xmax={x0 + W} ymin={L - 1.8 * eps} ymax={L + 1.8 * eps} h={280}>
        {(m) => {
          const yT = Math.max(0, m.Y(L + eps));
          const yB = Math.min(m.h, m.Y(L - eps));
          const win = (d: number) => ({ x: Math.max(0, m.X(x0 - d)), w: Math.max(0, Math.min(m.w, m.X(x0 + d)) - Math.max(0, m.X(x0 - d))) });
          const we = win(exact);
          const ws = win(safe);
          return (
            <>
              <rect x={0} y={yT} width={m.w} height={Math.max(0, yB - yT)} className="band-eps" />
              <rect x={we.x} y={0} width={we.w} height={m.h} className="band-delta" />
              <rect x={ws.x} y={0} width={ws.w} height={m.h} className="band-ab" />
              <line x1={0} y1={m.Y(L)} x2={m.w} y2={m.Y(L)} className="pl-dash2" />
              <line x1={m.X(x0)} y1={0} x2={m.X(x0)} y2={m.h} className="pl-dash2" />
              <path d={curve(sq, m, 800)} className="pl-main" />
            </>
          );
        }}
      </Chart>
      <p className="legend">Kék: a pontos (legnagyobb) δ-ablak. Zöld: a biztonságos δ = min{'{'}1; ε/(2x₀ + 1){'}'} ablaka.</p>
      <div className="result">
        <M block t={`\\delta_{\\text{pontos}}=${tx(exact, 5)},\\qquad \\delta_{\\text{biztonságos}}=\\min\\left\\{1;\\ \\dfrac{${tx(eps)}}{${2 * x0 + 1}}\\right\\}=${tx(safe, 5)}`} />
        <p>
          A biztonságos δ a pontosnak {round(safe / exact, 3)}-szerese: kisebb, de a számolása nem igényel gyökvonást. Mindkettő megfelel.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: az összegszabály bizonyítása */

const sf: Fn = (x) => 2 * x - 1;
const sgf: Fn = (x) => x * x;
const sh: Fn = (x) => sf(x) + sgf(x);
const SE2 = [1, 0.5, 0.2, 0.1, 0.02];

export function SumWidget() {
  const [ei, setEi] = useState(1);
  const eps = SE2[ei];
  const d1 = useMemo(() => maxDelta(sf, 1, 1, eps / 2, 3), [ei]);
  const d2 = useMemo(() => maxDelta(sgf, 1, 1, eps / 2, 3), [ei]);
  const d = Math.min(d1, d2);
  let dev = 0;
  for (let i = 1; i <= 2000; i++) {
    const t = (d * i) / 2000;
    dev = Math.max(dev, Math.abs(sh(1 + t) - 2), Math.abs(sh(1 - t) - 2));
  }
  const W = 2.5 * d;
  return (
    <div className="widget">
      <div className="widget-title">Összegszabály: f(x) = 2x − 1, g(x) = x², c = 1</div>
      <label>
        a szkeptikus kihívása az összegre: ε = {sg(eps)}
        <input type="range" min={0} max={SE2.length - 1} step={1} value={ei} onChange={(e) => setEi(Number(e.target.value))} />
      </label>
      <Chart xmin={1 - W} xmax={1 + W} ymin={2 - 1.8 * eps} ymax={2 + 1.8 * eps} h={260}>
        {(m) => {
          const yT = Math.max(0, m.Y(2 + eps));
          const yB = Math.min(m.h, m.Y(2 - eps));
          const xa = Math.max(0, m.X(1 - d));
          const xb = Math.min(m.w, m.X(1 + d));
          return (
            <>
              <rect x={0} y={yT} width={m.w} height={Math.max(0, yB - yT)} className="band-eps" />
              <rect x={xa} y={0} width={Math.max(0, xb - xa)} height={m.h} className="band-delta" />
              <line x1={0} y1={m.Y(2)} x2={m.w} y2={m.Y(2)} className="pl-dash2" />
              <line x1={m.X(1)} y1={0} x2={m.X(1)} y2={m.h} className="pl-dash2" />
              <path d={curve(sh, m, 600)} className="pl-main" />
            </>
          );
        }}
      </Chart>
      <p className="legend">A grafikon az f + g összegfüggvényé, L + M = 1 + 1 = 2.</p>
      <div className="result">
        <table className="tbl">
          <thead>
            <tr>
              <th>lépés</th>
              <th>érték</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                f-hez: δ₁ az ε/2 = {sg(eps / 2)} kihíváshoz
              </td>
              <td>{round(d1, 5)}</td>
            </tr>
            <tr>
              <td>
                g-hez: δ₂ az ε/2 = {sg(eps / 2)} kihíváshoz
              </td>
              <td>{round(d2, 5)}</td>
            </tr>
            <tr>
              <td>az összeghez: δ = min(δ₁; δ₂)</td>
              <td>
                <strong>{round(d, 5)}</strong>
              </td>
            </tr>
            <tr>
              <td>
                a legnagyobb tényleges eltérés |f + g − 2| a δ-ablakban
              </td>
              <td>
                {round(dev, 5)} &lt; {sg(eps)}
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Az ε/2 + ε/2 = ε felosztás szándékosan bőkezű: a ténylegesen mért eltérés kisebb ε-nál, de a bizonyításhoz csak az kell, hogy ε alatt maradjon.
        </p>
      </div>
    </div>
  );
}
