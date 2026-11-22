import { useMemo, useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');
const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: végtelen határértékek egy pont körül */

type PoleEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  c: number;
  leftTex: string;
  rightTex: string;
  twoTex: string;
  xr: [number, number];
  yr: [number, number];
  note: string;
};

const POLE_EX: PoleEx[] = [
  {
    id: 'inv1',
    name: '1 / (x − 2)',
    tex: 'f(x)=\\dfrac{1}{x-2},\\quad c=2',
    f: (x) => (Math.abs(x - 2) < 1e-6 ? NaN : 1 / (x - 2)),
    c: 2,
    leftTex: '-\\infty',
    rightTex: '+\\infty',
    twoTex: '\\text{nem létezik (eltérő előjel)}',
    xr: [-1, 5],
    yr: [-12, 12],
    note: 'Ha x → 2⁺, akkor x − 2 pozitív és 0-hoz tart, így reciproka +∞-hez tart. Balról x − 2 negatív, ezért a hányados −∞-hez tart.',
  },
  {
    id: 'sq1',
    name: '1 / (x + 1)²',
    tex: 'f(x)=\\dfrac{1}{(x+1)^2},\\quad c=-1',
    f: (x) => (Math.abs(x + 1) < 1e-6 ? NaN : 1 / ((x + 1) * (x + 1))),
    c: -1,
    leftTex: '+\\infty',
    rightTex: '+\\infty',
    twoTex: '+\\infty',
    xr: [-4, 2],
    yr: [-2, 20],
    note: 'A négyzet miatt a nevező mindkét oldalon pozitív, ezért a görbe mindkét ága felfelé, +∞-be szalad: kétoldali végtelen határérték.',
  },
  {
    id: 'nsq',
    name: '−1 / (x − 1)²',
    tex: 'f(x)=\\dfrac{-1}{(x-1)^2},\\quad c=1',
    f: (x) => (Math.abs(x - 1) < 1e-6 ? NaN : -1 / ((x - 1) * (x - 1))),
    c: 1,
    leftTex: '-\\infty',
    rightTex: '-\\infty',
    twoTex: '-\\infty',
    xr: [-2, 4],
    yr: [-20, 2],
    note: 'A mínuszjel megfordítja az irányt: mindkét oldalról −∞-hez tart a függvény.',
  },
  {
    id: 'cub',
    name: '1 / x³',
    tex: 'f(x)=\\dfrac{1}{x^3},\\quad c=0',
    f: (x) => (Math.abs(x) < 1e-6 ? NaN : 1 / (x * x * x)),
    c: 0,
    leftTex: '-\\infty',
    rightTex: '+\\infty',
    twoTex: '\\text{nem létezik (eltérő előjel)}',
    xr: [-2.5, 2.5],
    yr: [-20, 20],
    note: 'Páratlan hatványnál a nevező előjelet vált a gyökénél: balról −∞, jobbról +∞, ráadásul sokkal gyorsabban nő, mint az 1/x.',
  },
];

const H_VALS = [1, 0.5, 0.25, 0.1, 0.05, 0.01];

export function InfNearPointWidget() {
  const [idx, setIdx] = useState(0);
  const [hi, setHi] = useState(2);
  const ex = POLE_EX[idx];
  const h = H_VALS[hi];
  const xl = ex.c - h;
  const xr = ex.c + h;
  const yl = ex.f(xl);
  const yr = ex.f(xr);

  return (
    <div className="widget">
      <div className="widget-title">Mi történik a nevező zérushelye közelében?</div>
      <div className="relbuttons chips">
        {POLE_EX.map((item, i) => (
          <button key={item.id} className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {item.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <label>
        távolság c-től: h = {sg(h)}
        <input type="range" min={0} max={H_VALS.length - 1} step={1} value={hi} onChange={(e) => setHi(Number(e.target.value))} />
      </label>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={280}>
        {(m) => (
          <>
            <line x1={m.X(ex.c)} y1={0} x2={m.X(ex.c)} y2={m.h} className="pl-dash" />
            <path d={curve(ex.f, m, 700)} className="pl-main" />
            {Number.isFinite(yl) && yl >= ex.yr[0] && yl <= ex.yr[1] && (
              <circle cx={m.X(xl)} cy={m.Y(yl)} r={6} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
            )}
            {Number.isFinite(yr) && yr >= ex.yr[0] && yr <= ex.yr[1] && (
              <circle cx={m.X(xr)} cy={m.Y(yr)} r={6} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
            )}
          </>
        )}
      </Chart>
      <p className="legend">Szaggatott vonal: x = {sg(ex.c)}. Narancs: bal oldali pont (c − h). Zöld: jobb oldali pont (c + h).</p>
      <div className="result">
        <table className="tbl">
          <thead>
            <tr>
              <th>irány</th>
              <th>aktuális érték</th>
              <th>végtelen határérték</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>balról (<M t={`x\\to ${tx(ex.c)}^-`} />)</td>
              <td>f({round(xl, 3)}) = {round(yl, 2)}</td>
              <td><M t={ex.leftTex} /></td>
            </tr>
            <tr>
              <td>jobbról (<M t={`x\\to ${tx(ex.c)}^+`} />)</td>
              <td>f({round(xr, 3)}) = {round(yr, 2)}</td>
              <td><M t={ex.rightTex} /></td>
            </tr>
            <tr>
              <td>kétoldali (<M t={`x\\to ${tx(ex.c)}`} />)</td>
              <td>x = {sg(ex.c)}-ben nincs értelmezve</td>
              <td><strong><M t={ex.twoTex} /></strong></td>
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

/* ------------------------------------------------------------------ 2. oldal: lyuk vagy pólus? */

type RatZeroEx = {
  id: string;
  name: string;
  tex: string;
  simpTex: string;
  f: Fn;
  kind: 'hole' | 'pole';
  holeY?: number;
  verdict: string;
  xr: [number, number];
  yr: [number, number];
};

const RAT_EX: RatZeroEx[] = [
  {
    id: 'hole0',
    name: '(x − 2)² / (x² − 4)',
    tex: 'f(x)=\\dfrac{(x-2)^2}{x^2-4}',
    simpTex: 'f(x)=\\dfrac{x-2}{x+2}\\quad(x\\ne 2)',
    f: (x) => (Math.abs(x - 2) < 1e-6 || Math.abs(x + 2) < 1e-6 ? NaN : ((x - 2) * (x - 2)) / (x * x - 4)),
    kind: 'hole',
    holeY: 0,
    verdict: 'Lyuk az x = 2 helyen: a 0/0 alak egyszerűsödik, a határérték véges (0). Nincs függőleges aszimptota x = 2-ben.',
    xr: [-1, 5],
    yr: [-3, 3],
  },
  {
    id: 'hole1',
    name: '(x − 2) / (x² − 4)',
    tex: 'f(x)=\\dfrac{x-2}{x^2-4}',
    simpTex: 'f(x)=\\dfrac{1}{x+2}\\quad(x\\ne 2)',
    f: (x) => (Math.abs(x - 2) < 1e-6 || Math.abs(x + 2) < 1e-6 ? NaN : (x - 2) / (x * x - 4)),
    kind: 'hole',
    holeY: 0.25,
    verdict: 'Lyuk az x = 2 helyen: a (x − 2) tényező kiesik, a határérték 1/4. (Függőleges aszimptota csak x = −2-ben van.)',
    xr: [-1, 5],
    yr: [-2, 3],
  },
  {
    id: 'pole1',
    name: '(x − 4) / (x² − 4)',
    tex: 'f(x)=\\dfrac{x-4}{x^2-4}',
    simpTex: '\\text{nem egyszerűsíthető: }\\dfrac{x-4}{(x-2)(x+2)}',
    f: (x) => (Math.abs(x * x - 4) < 1e-6 ? NaN : (x - 4) / (x * x - 4)),
    kind: 'pole',
    verdict: 'Pólus az x = 2 helyen! A számláló 2-ben −2 ≠ 0, a nevező 0. Jobbról negatív/pozitív → −∞, balról negatív/negatív → +∞.',
    xr: [-1, 5],
    yr: [-10, 10],
  },
  {
    id: 'pole2',
    name: '(x − 2) / (x − 2)³',
    tex: 'f(x)=\\dfrac{x-2}{(x-2)^3}',
    simpTex: 'f(x)=\\dfrac{1}{(x-2)^2}\\quad(x\\ne 2)',
    f: (x) => (Math.abs(x - 2) < 1e-6 ? NaN : 1 / ((x - 2) * (x - 2))),
    kind: 'pole',
    verdict: 'Egyszerűsítés után is marad (x − 2)² a nevezőben! Ezért x = 2 kétoldali függőleges aszimptota (+∞).',
    xr: [-1, 5],
    yr: [-2, 16],
  },
];

export function ZeroDenomWidget() {
  const [ri, setRi] = useState(0);
  const ex = RAT_EX[ri];

  return (
    <div className="widget">
      <div className="widget-title">Lyuk vagy függőleges aszimptota az x = 2 helyen?</div>
      <div className="relbuttons chips">
        {RAT_EX.map((q, i) => (
          <button key={q.id} className={ri === i ? 'on' : ''} onClick={() => setRi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={`${ex.tex} \\quad\\Longrightarrow\\quad ${ex.simpTex}`} />
      </p>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={270}>
        {(m) => (
          <>
            <line x1={m.X(2)} y1={0} x2={m.X(2)} y2={m.h} className={ex.kind === 'pole' ? 'pl-dash' : 'pl-dash2'} />
            <path d={curve(ex.f, m, 700)} className="pl-main" />
            {ex.kind === 'hole' && ex.holeY !== undefined && (
              <circle cx={m.X(2)} cy={m.Y(ex.holeY)} r={6} className="pl-hole" stroke="#fbbf24" strokeWidth={2.5} />
            )}
          </>
        )}
      </Chart>
      <div className={`result verdict ${ex.kind === 'hole' ? 'ok' : 'no'}`}>
        <p>{ex.verdict}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: B–δ játék */

type BEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  x0: number;
  dir: 'pos' | 'neg';
  side: 'both' | 'right';
  maxD: (B: number) => number;
  xr: [number, number];
  yr: [number, number];
  cap: number;
  note: string;
};

const B_EX: BEx[] = [
  {
    id: 'invsq',
    name: '1 / x² → +∞',
    tex: '\\lim_{x\\to 0}\\dfrac{1}{x^2}=+\\infty',
    f: (x) => (Math.abs(x) < 1e-6 ? NaN : 1 / (x * x)),
    x0: 0,
    dir: 'pos',
    side: 'both',
    maxD: (B) => 1 / Math.sqrt(B),
    xr: [-1.5, 1.5],
    yr: [-2, 30],
    cap: 1.2,
    note: '1/x² > B pontosan akkor, ha |x| < 1/√B. Tehát δ = 1/√B a legnagyobb jó ablak.',
  },
  {
    id: 'shift',
    name: '1 / (x − 1)² → +∞',
    tex: '\\lim_{x\\to 1}\\dfrac{1}{(x-1)^2}=+\\infty',
    f: (x) => (Math.abs(x - 1) < 1e-6 ? NaN : 1 / ((x - 1) * (x - 1))),
    x0: 1,
    dir: 'pos',
    side: 'both',
    maxD: (B) => 1 / Math.sqrt(B),
    xr: [-0.5, 2.5],
    yr: [-2, 30],
    cap: 1.2,
    note: 'Eltolva x₀ = 1-be ugyanez a feltétel: 0 < |x − 1| < 1/√B garantálja, hogy f(x) > B.',
  },
  {
    id: 'negsq',
    name: '−1 / x² → −∞',
    tex: '\\lim_{x\\to 0}\\left(-\\dfrac{1}{x^2}\\right)=-\\infty',
    f: (x) => (Math.abs(x) < 1e-6 ? NaN : -1 / (x * x)),
    x0: 0,
    dir: 'neg',
    side: 'both',
    maxD: (B) => 1 / Math.sqrt(B),
    xr: [-1.5, 1.5],
    yr: [-30, 2],
    cap: 1.2,
    note: 'Negatív végtelennél a szkeptikus egy −B korlátot ad, nekünk pedig f(x) < −B kell: itt is δ = 1/√B a határ.',
  },
  {
    id: 'invr',
    name: '1 / x (x → 0⁺) → +∞',
    tex: '\\lim_{x\\to 0^+}\\dfrac{1}{x}=+\\infty',
    f: (x) => (Math.abs(x) < 1e-6 ? NaN : 1 / x),
    x0: 0,
    dir: 'pos',
    side: 'right',
    maxD: (B) => 1 / B,
    xr: [-0.6, 1.4],
    yr: [-5, 30],
    cap: 1.0,
    note: 'Jobb oldali végtelen határértéknél csak a 0 < x < δ ablak számít: 1/x > B pontosan akkor teljesül, ha δ = 1/B.',
  },
];

const B_VALS = [4, 9, 16, 25];

export function BDeltaWidget() {
  const [bi, setBi] = useState(0);
  const [ki, setKi] = useState(1);
  const [t, setT] = useState(55);
  const ex = B_EX[bi];
  const Babs = B_VALS[ki];
  const B = ex.dir === 'pos' ? Babs : -Babs;
  const delta = ex.cap * Math.pow(t / 100, 2);
  const md = ex.maxD(Babs);

  const bad = useMemo(() => {
    const N = 1200;
    const dirs = ex.side === 'both' ? [-1, 1] : [1];
    for (let i = 1; i <= N; i++) {
      const step = (delta * i) / N;
      for (const s of dirs) {
        const x = ex.x0 + s * step;
        const y = ex.f(x);
        const ok = ex.dir === 'pos' ? y > B : y < B;
        if (!ok) return x;
      }
    }
    return null;
  }, [bi, ki, delta]);

  const setBest = () => setT(Math.max(2, Math.min(100, 100 * Math.sqrt((md * 0.98) / ex.cap))));

  return (
    <div className="widget">
      <div className="widget-title">A B–δ játék: tetszőleges korlát túllépése</div>
      <div className="relbuttons chips">
        {B_EX.map((q, i) => (
          <button key={q.id} className={bi === i ? 'on' : ''} onClick={() => setBi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <div className="sliders">
        <label>
          kitűzött korlát: B = {sg(B)}
          <input type="range" min={0} max={B_VALS.length - 1} step={1} value={ki} onChange={(e) => setKi(Number(e.target.value))} />
        </label>
        <label>
          választott ablak: δ = {round(delta, 4)} (max jó δ ≈ {round(md, 4)})
          <input type="range" min={2} max={100} step={0.5} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        <button onClick={setBest}>állítsd a legnagyobb jó δ-ra</button>
      </div>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={270}>
        {(m) => {
          const yB = m.Y(B);
          const bandY = ex.dir === 'pos' ? 0 : Math.max(0, yB);
          const bandH = ex.dir === 'pos' ? Math.max(0, Math.min(m.h, yB)) : Math.max(0, m.h - Math.max(0, yB));
          const xa = ex.side === 'both' ? Math.max(0, m.X(ex.x0 - delta)) : m.X(ex.x0);
          const xb = Math.min(m.w, m.X(ex.x0 + delta));
          return (
            <>
              <rect x={0} y={bandY} width={m.w} height={bandH} className="band-eps" />
              <rect x={xa} y={0} width={Math.max(0, xb - xa)} height={m.h} className="band-delta" />
              <line x1={0} y1={yB} x2={m.w} y2={yB} className="pl-dash" />
              <line x1={m.X(ex.x0)} y1={0} x2={m.X(ex.x0)} y2={m.h} className="pl-dash2" />
              <path d={curve(ex.f, m, 700)} className="pl-main" />
              {bad !== null && Number.isFinite(ex.f(bad)) && (
                <circle cx={m.X(bad)} cy={m.Y(ex.f(bad))} r={6} fill="#f87171" stroke="#fff" strokeWidth={1.5} />
              )}
            </>
          );
        }}
      </Chart>
      <p className="legend">
        Narancs félsík: a célzóna ({ex.dir === 'pos' ? `y > ${sg(B)}` : `y < ${sg(B)}`}). Kék sáv: a δ-ablak.
      </p>
      <div className={`result verdict ${bad === null ? 'ok' : 'no'}`}>
        {bad === null ? (
          <p>
            <strong>Megfelel!</strong> A kék δ-ablak minden (x₀-tól különböző) pontjában a függvényérték a narancs zónában van.
          </p>
        ) : (
          <p>
            <strong>Még túl széles az ablak.</strong> Az <M t={`x=${tx(bad, 3)}`} /> helyen még nem lépte át a B = {sg(B)} vonalat — csökkentsd δ-t!
          </p>
        )}
      </div>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: függőleges aszimptoták */

type VaEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  vas: number[];
  ha?: number;
  xr: [number, number];
  yr: [number, number];
  summary: string;
};

const VA_EX: VaEx[] = [
  {
    id: 'hyp',
    name: '(x + 5) / (x + 2)',
    tex: 'y=\\dfrac{x+5}{x+2}=1+\\dfrac{3}{x+2}',
    f: (x) => (Math.abs(x + 2) < 1e-4 ? NaN : (x + 5) / (x + 2)),
    vas: [-2],
    ha: 1,
    xr: [-7, 4],
    yr: [-6, 8],
    summary: 'Függőleges aszimptota: x = −2. Vízszintes aszimptota: y = 1. Az 1/x hiperbola eltolt és megnyújtott mása.',
  },
  {
    id: 'even',
    name: '−6 / (x² − 9)',
    tex: 'y=\\dfrac{-6}{x^2-9}',
    f: (x) => (Math.abs(x * x - 9) < 1e-4 ? NaN : -6 / (x * x - 9)),
    vas: [-3, 3],
    ha: 0,
    xr: [-7, 7],
    yr: [-8, 8],
    summary: 'Páros függvény! Két függőleges aszimptota (x = −3 és x = 3) és egy vízszintes aszimptota (y = 0, alulról közelítve).',
  },
  {
    id: 'tan',
    name: 'tg x',
    tex: 'y=\\operatorname{tg} x = \\dfrac{\\sin x}{\\cos x}',
    f: (x) => (Math.abs(Math.cos(x)) < 1e-3 ? NaN : Math.tan(x)),
    vas: [-1.5 * Math.PI, -0.5 * Math.PI, 0.5 * Math.PI, 1.5 * Math.PI],
    xr: [-6.5, 6.5],
    yr: [-6, 6],
    summary: 'Végtelen sok függőleges aszimptota minden x = π/2 + kπ helyen (ahol cos x = 0): balról +∞, jobbról −∞.',
  },
  {
    id: 'sec',
    name: 'sec x = 1 / cos x',
    tex: 'y=\\sec x = \\dfrac{1}{\\cos x}',
    f: (x) => (Math.abs(Math.cos(x)) < 1e-3 ? NaN : 1 / Math.cos(x)),
    vas: [-1.5 * Math.PI, -0.5 * Math.PI, 0.5 * Math.PI, 1.5 * Math.PI],
    xr: [-6.5, 6.5],
    yr: [-6, 6],
    summary: 'Ugyanott vannak a függőleges aszimptotái, mint a tg x-nek (x = π/2 + kπ), a görbe pedig |y| ≥ 1 tartományban fut.',
  },
  {
    id: 'ctg',
    name: 'ctg x = cos x / sin x',
    tex: 'y=\\operatorname{ctg} x = \\dfrac{\\cos x}{\\sin x}',
    f: (x) => (Math.abs(Math.sin(x)) < 1e-3 ? NaN : Math.cos(x) / Math.sin(x)),
    vas: [-2 * Math.PI, -Math.PI, 0, Math.PI, 2 * Math.PI],
    xr: [-6.5, 6.5],
    yr: [-6, 6],
    summary: 'Végtelen sok függőleges aszimptota minden x = kπ helyen (ahol sin x = 0): balról −∞, jobbról +∞.',
  },
];

export function VerticalAsymWidget() {
  const [vi, setVi] = useState(1);
  const ex = VA_EX[vi];

  return (
    <div className="widget">
      <div className="widget-title">Függőleges aszimptoták: racionális és trigonometrikus görbék</div>
      <div className="relbuttons chips">
        {VA_EX.map((q, i) => (
          <button key={q.id} className={vi === i ? 'on' : ''} onClick={() => setVi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={280}>
        {(m) => (
          <>
            {ex.ha !== undefined && <line x1={0} y1={m.Y(ex.ha)} x2={m.w} y2={m.Y(ex.ha)} className="pl-ok" strokeDasharray="6 5" />}
            {ex.vas.map((a, i) => (
              <line key={i} x1={m.X(a)} y1={0} x2={m.X(a)} y2={m.h} className="pl-alt" strokeDasharray="6 5" />
            ))}
            <path d={curve(ex.f, m, 900)} className="pl-main" />
          </>
        )}
      </Chart>
      <p className="legend">Kék: y = f(x). Narancs szaggatott: függőleges aszimptoták. Zöld szaggatott: vízszintes aszimptota (ha van).</p>
      <div className="explain">
        <p>{ex.summary}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: domináns tagok */

export function DominantTermWidget() {
  const [mode, setMode] = useState<'rat' | 'poly'>('rat');
  const [R, setR] = useState(10);

  // 1) f(x) = (x² - 5) / (2x - 2) = (x + 1)/2 - 2/(x - 1)
  const rf: Fn = (x) => (Math.abs(x - 1) < 1e-4 ? NaN : (x * x - 5) / (2 * x - 2));
  const rLin: Fn = (x) => 0.5 * x + 0.5;
  const rPole: Fn = (x) => (Math.abs(x - 1) < 1e-4 ? NaN : -2 / (x - 1));

  // 2) f(x) = 2x³ - 5x² + 4x - 7  vs  g(x) = 2x³
  const pf: Fn = (x) => 2 * x * x * x - 5 * x * x + 4 * x - 7;
  const pg: Fn = (x) => 2 * x * x * x;

  const yMax = mode === 'rat' ? Math.max(8, R * 0.8) : Math.max(20, 2.2 * R * R * R);
  const ratio = pf(R) / pg(R);

  return (
    <div className="widget">
      <div className="widget-title">Domináns tagok: más uralkodik közelről, mint messziről</div>
      <div className="relbuttons chips">
        <button className={mode === 'rat' ? 'on' : ''} onClick={() => { setMode('rat'); setR(8); }}>
          Racionális tört (pólus + ferde)
        </button>
        <button className={mode === 'poly' ? 'on' : ''} onClick={() => { setMode('poly'); setR(4); }}>
          Polinom és főtagja (2x³)
        </button>
      </div>
      <p className="legend">
        {mode === 'rat' ? (
          <M t="f(x)=\dfrac{x^2-5}{2x-2}=\underbrace{\tfrac{1}{2}x+\tfrac{1}{2}}_{\text{nagy }|x|\text{-nél domináns}}+\underbrace{\dfrac{-2}{x-1}}_{x\approx 1\text{-nél domináns}}" />
        ) : (
          <M t="f(x)=2x^3-5x^2+4x-7 \quad\text{és}\quad g(x)=2x^3" />
        )}
      </p>
      <label>
        látótér sugara: R = {R} (tartomány: [−{R}; {R}])
        <input type="range" min={mode === 'rat' ? 3 : 2} max={mode === 'rat' ? 35 : 40} step={1} value={R} onChange={(e) => setR(Number(e.target.value))} />
      </label>
      <Chart xmin={-R} xmax={R} ymin={-yMax} ymax={yMax} h={280}>
        {(m) =>
          mode === 'rat' ? (
            <>
              <line x1={m.X(1)} y1={0} x2={m.X(1)} y2={m.h} className="pl-dash2" />
              <path d={curve(rLin, m, 120)} className="pl-alt" strokeDasharray="7 5" />
              <path d={curve(rPole, m, 600)} className="pl-ok" strokeDasharray="4 4" />
              <path d={curve(rf, m, 800)} className="pl-main" />
            </>
          ) : (
            <>
              <path d={curve(pg, m, 400)} className="pl-alt" strokeDasharray="7 5" />
              <path d={curve(pf, m, 400)} className="pl-main" />
            </>
          )
        }
      </Chart>
      {mode === 'rat' ? (
        <>
          <p className="legend">Kék: f(x). Narancs szaggatott: y = ½x + ½ (ferde aszimptota). Zöld szaggatott: −2/(x − 1) (pólustag).</p>
          <div className="result">
            <p>
              Kicsi R-nél (x = 1 közelében) a kék görbe a <strong>zöld</strong> −2/(x − 1) taghoz tapad. Nagy R-nél a <strong>narancs</strong> ferde egyenes veszi át a főszerepet!
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="legend">Kék: f(x) = 2x³ − 5x² + 4x − 7. Narancs szaggatott: g(x) = 2x³.</p>
          <div className="result">
            <M block t={`x=${R}:\\quad \\dfrac{f(${R})}{g(${R})} = ${tx(ratio, 4)} \\;\\longrightarrow\\; 1`} />
            <p>
              Húzd R-t 40 felé: kis léptékben a két görbe egészen más, nagy léptékben viszont az alsóbb fokú tagok elenyésznek, és a két grafikon egybeesik.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
