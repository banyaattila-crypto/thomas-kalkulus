import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');
const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 2. oldal: lépésről lépésre deriválás definícióból */

type StepEx = {
  id: string;
  name: string;
  f: Fn;
  df: Fn;
  minX: number;
  maxX: number;
  initX: number;
  xr: [number, number];
  yr: [number, number];
  steps: { title: string; tex: string; explain: string }[];
};

const STEP_EX: StepEx[] = [
  {
    id: 'sq',
    name: 'f(x) = x²',
    f: (x) => x * x,
    df: (x) => 2 * x,
    minX: -2.2,
    maxX: 2.2,
    initX: 1,
    xr: [-3, 3],
    yr: [-1, 7],
    steps: [
      {
        title: '1. Definíció felírása',
        tex: "f'(x)=\\lim_{h\\to 0}\\frac{(x+h)^2-x^2}{h}",
        explain: 'Behelyettesítjük f(x + h) = (x + h)² és f(x) = x² kifejezéseket.',
      },
      {
        title: '2. Zárójel felbontása',
        tex: "f'(x)=\\lim_{h\\to 0}\\frac{x^2+2xh+h^2-x^2}{h}=\\lim_{h\\to 0}\\frac{2xh+h^2}{h}",
        explain: 'A h-mentes x² tagok pontosan kiesnek — ez mindig jó visszajelzés!',
      },
      {
        title: '3. Egyszerűsítés h-val',
        tex: "f'(x)=\\lim_{h\\to 0}\\frac{h(2x+h)}{h}=\\lim_{h\\to 0}(2x+h)",
        explain: 'Mivel h ≠ 0 a határértékben, nyugodtan oszthatunk h-val.',
      },
      {
        title: '4. Határérték (h → 0)',
        tex: "f'(x)=2x",
        explain: 'A h eltűnik, megmarad a kész deriváltfüggvény: bármely x-re 2x a meredekség!',
      },
    ],
  },
  {
    id: 'frac',
    name: 'f(x) = x / (x + 2)',
    f: (x) => (Math.abs(x + 2) < 1e-4 ? NaN : x / (x + 2)),
    df: (x) => 2 / ((x + 2) * (x + 2)),
    minX: -1.2,
    maxX: 4,
    initX: 0,
    xr: [-1.8, 5],
    yr: [-2, 2.5],
    steps: [
      {
        title: '1. Definíció felírása',
        tex: "f'(x)=\\lim_{h\\to 0}\\frac{\\frac{x+h}{x+h+2}-\\frac{x}{x+2}}{h}",
        explain: 'Törtfüggvénynél az első cél, hogy a számlálót közös nevezőre hozzuk.',
      },
      {
        title: '2. Közös nevező a számlálóban',
        tex: "f'(x)=\\lim_{h\\to 0}\\frac{(x+h)(x+2)-x(x+h+2)}{h(x+h+2)(x+2)}",
        explain: 'A számláló kifejtve: (x² + 2x + xh + 2h) − (x² + xh + 2x) = 2h.',
      },
      {
        title: '3. Egyszerűsítés h-val',
        tex: "f'(x)=\\lim_{h\\to 0}\\frac{2h}{h(x+h+2)(x+2)}=\\lim_{h\\to 0}\\frac{2}{(x+h+2)(x+2)}",
        explain: 'A 0/0 alak eltűnt, a nevezőben már nyugodtan beírhatjuk a h = 0-t.',
      },
      {
        title: '4. Határérték (h → 0)',
        tex: "f'(x)=\\frac{2}{(x+2)^2}\\quad(x\\ne -2)",
        explain: 'Mindig pozitív: a függvény a teljes értelmezési tartományán szigorúan növekszik.',
      },
    ],
  },
  {
    id: 'sqrt',
    name: 'f(x) = √x (z → x alakkal)',
    f: (x) => (x < 0 ? NaN : Math.sqrt(x)),
    df: (x) => 1 / (2 * Math.sqrt(x)),
    minX: 0.25,
    maxX: 6,
    initX: 4,
    xr: [-0.4, 7],
    yr: [-0.4, 3.2],
    steps: [
      {
        title: '1. Alternatív alak (z → x)',
        tex: "f'(x)=\\lim_{z\\to x}\\frac{\\sqrt{z}-\\sqrt{x}}{z-x}",
        explain: 'Gyökfüggvénynél különösen elegáns a z → x alak!',
      },
      {
        title: '2. Nevező szorzattá bontása',
        tex: "z-x = (\\sqrt{z}-\\sqrt{x})(\\sqrt{z}+\\sqrt{x})",
        explain: 'Az a² − b² = (a − b)(a + b) azonosságot használjuk a = √z, b = √x-szel.',
      },
      {
        title: '3. Egyszerűsítés',
        tex: "f'(x)=\\lim_{z\\to x}\\frac{\\sqrt{z}-\\sqrt{x}}{(\\sqrt{z}-\\sqrt{x})(\\sqrt{z}+\\sqrt{x})}=\\lim_{z\\to x}\\frac{1}{\\sqrt{z}+\\sqrt{x}}",
        explain: 'A nullává váló tényező kiesett.',
      },
      {
        title: '4. Határérték (z → x)',
        tex: "f'(x)=\\frac{1}{2\\sqrt{x}}\\quad(x>0)",
        explain: 'Nagyon fontos alapképlet! Figyeld meg, hogy x = 0-ban már nincs értelmezve.',
      },
    ],
  },
];

export function DefDerivStepsWidget() {
  const [ei, setEi] = useState(2);
  const [st, setSt] = useState(0);
  const [x0, setX0] = useState(STEP_EX[2].initX);
  const ex = STEP_EX[ei];
  const y0 = ex.f(x0);
  const mVal = ex.df(x0);
  const tan: Fn = (x) => y0 + mVal * (x - x0);

  return (
    <div className="widget">
      <div className="widget-title">Deriváltfüggvény levezetése lépésről lépésre</div>
      <div className="relbuttons chips">
        {STEP_EX.map((q, i) => (
          <button
            key={q.id}
            className={ei === i ? 'on' : ''}
            onClick={() => {
              setEi(i);
              setSt(0);
              setX0(q.initX);
            }}
          >
            {q.name}
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {ex.steps.map((s, i) => (
          <button key={s.title} className={st === i ? 'on' : ''} onClick={() => setSt(i)}>
            {i + 1}. lépés
          </button>
        ))}
      </div>
      <div className="result">
        <p>
          <strong>{ex.steps[st].title}</strong>
        </p>
        <M block t={ex.steps[st].tex} />
        <p>{ex.steps[st].explain}</p>
      </div>
      <label>
        próbáld ki a kész képletet különböző helyeken: x = {round(x0, 2)} → f&apos;(x) = {round(mVal, 3)}
        <input type="range" min={ex.minX} max={ex.maxX} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={230}>
        {(m) => (
          <>
            <path d={curve(tan, m, 80)} className="pl-alt" />
            <path d={curve(ex.f, m, 500)} className="pl-main" />
            <circle cx={m.X(x0)} cy={m.Y(y0)} r={6} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: f és f' szinkronizált grafikonja */

type DualEx = {
  id: string;
  name: string;
  fTex: string;
  dfTex: string;
  f: Fn;
  df: Fn;
  xr: [number, number];
  yr1: [number, number];
  yr2: [number, number];
  note: string;
};

const DUAL_EX: DualEx[] = [
  {
    id: 'par',
    name: 'parabola (x² − 2x)',
    fTex: 'f(x)=x^2-2x',
    dfTex: "f'(x)=2x-2",
    f: (x) => x * x - 2 * x,
    df: (x) => 2 * x - 2,
    xr: [-2, 4],
    yr1: [-2, 6],
    yr2: [-6, 6],
    note: 'x < 1-nél f csökken → f′ negatív. x = 1-nél mélypont (vízszintes érintő) → f′ = 0. x > 1-nél f nő → f′ pozitív.',
  },
  {
    id: 'cub',
    name: 'harmadfokú (⅓x³ − x)',
    fTex: 'f(x)=\\tfrac{1}{3}x^3-x',
    dfTex: "f'(x)=x^2-1",
    f: (x) => (x * x * x) / 3 - x,
    df: (x) => x * x - 1,
    xr: [-2.5, 2.5],
    yr1: [-2.5, 2.5],
    yr2: [-2, 5],
    note: 'A két szélsőértéknél (x = −1 és x = 1) az érintő vízszintes, ezért ott metszi f′ az x-tengelyt!',
  },
  {
    id: 'sin',
    name: 'hullám (sin x)',
    fTex: 'f(x)=\\sin x',
    dfTex: "f'(x)=\\cos x",
    f: (x) => Math.sin(x),
    df: (x) => Math.cos(x),
    xr: [-3.5, 3.5],
    yr1: [-1.5, 1.5],
    yr2: [-1.5, 1.5],
    note: 'A szinusz meredeksége 0-ban 1, a csúcsán (π/2-nél) 0, π-nél −1: a derivált görbéje pontosan a koszinusz!',
  },
  {
    id: 'piece',
    name: 'töröttvonal (lépcsős derivált)',
    fTex: 'f(x)=\\text{szakaszok (pl. mérési adatok)}',
    dfTex: "f'(x)=\\text{lépcsős függvény}",
    f: (x) => (x < 0 ? x + 1 : x < 2 ? 1 + 0.5 * x : 2 - 1.5 * (x - 2)),
    df: (x) => (Math.abs(x) < 0.04 || Math.abs(x - 2) < 0.04 ? NaN : x < 0 ? 1 : x < 2 ? 0.5 : -1.5),
    xr: [-2, 4],
    yr1: [-2, 3],
    yr2: [-2.5, 2],
    note: 'Minden egyenes szakaszon állandó a meredekség (lépcsős derivált), a töréspontokban (x = 0 és x = 2) viszont nincs derivált!',
  },
];

export function GraphOfDerivWidget() {
  const [di, setDi] = useState(1);
  const [x0, setX0] = useState(0);
  const ex = DUAL_EX[di];
  const y0 = ex.f(x0);
  const mVal = ex.df(x0);
  const tan: Fn = (x) => y0 + mVal * (x - x0);

  return (
    <div className="widget">
      <div className="widget-title">Hogyan születik f&apos;(x) grafikonja f(x)-ből?</div>
      <div className="relbuttons chips">
        {DUAL_EX.map((q, i) => (
          <button
            key={q.id}
            className={di === i ? 'on' : ''}
            onClick={() => {
              setDi(i);
              setX0(0.5);
            }}
          >
            {q.name}
          </button>
        ))}
      </div>
      <label>
        vizsgált hely: x₀ = {round(x0, 2)} (meredekség: {Number.isFinite(mVal) ? round(mVal, 3) : 'nincs derivált'})
        <input type="range" min={ex.xr[0] + 0.2} max={ex.xr[1] - 0.2} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <div className="mini">
        Felső ábra — az eredeti függvény: <M t={ex.fTex} />
      </div>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr1[0]} ymax={ex.yr1[1]} h={190}>
        {(m) => (
          <>
            <line x1={m.X(x0)} y1={0} x2={m.X(x0)} y2={m.h} className="pl-dash2" />
            {Number.isFinite(mVal) && <path d={curve(tan, m, 80)} className="pl-alt" />}
            <path d={curve(ex.f, m, 500)} className="pl-main" />
            <circle cx={m.X(x0)} cy={m.Y(y0)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="mini">
        Alsó ábra — a deriváltfüggvény (az érintők meredeksége): <M t={ex.dfTex} />
      </div>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr2[0]} ymax={ex.yr2[1]} h={180}>
        {(m) => (
          <>
            <line x1={m.X(x0)} y1={0} x2={m.X(x0)} y2={m.h} className="pl-dash2" />
            <path d={curve(ex.df, m, 500)} className="pl-ok" />
            {Number.isFinite(mVal) && <circle cx={m.X(x0)} cy={m.Y(mVal)} r={6} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />}
          </>
        )}
      </Chart>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: 4 ok, amiért nincs derivált */

type BadDiff = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  leftD: string;
  rightD: string;
  reason: string;
};

const BAD_DIFF: BadDiff[] = [
  {
    id: 'corner',
    name: '1. Töréspont: |x|',
    tex: 'f(x)=|x|',
    f: (x) => Math.abs(x),
    leftD: '−1',
    rightD: '+1',
    reason: 'Balról és jobbról is létezik a féloldali derivált, de nem egyenlők (−1 ≠ +1): a görbe itt élesen megtörik.',
  },
  {
    id: 'cusp',
    name: '2. Csúcs (tüske): x^(2/3)',
    tex: 'f(x)=x^{2/3}',
    f: (x) => Math.cbrt(x * x),
    leftD: '−∞',
    rightD: '+∞',
    reason: 'Az egyik oldalról −∞, a másikról +∞ a szelők meredeksége: éles tüske.',
  },
  {
    id: 'vert',
    name: '3. Függőleges érintő: x^(1/3)',
    tex: 'f(x)=x^{1/3}',
    f: (x) => Math.cbrt(x),
    leftD: '+∞',
    rightD: '+∞',
    reason: 'Bár van függőleges érintő (x = 0), a derivált nem véges valós szám, ezért a függvény 0-ban NEM differenciálható.',
  },
  {
    id: 'disc',
    name: '4. Szakadás: ugrás',
    tex: 'f(x)=\\begin{cases}0,&x<0\\\\ 1,&x\\ge 0\\end{cases}',
    f: (x) => (Math.abs(x) < 1e-4 ? NaN : x < 0 ? 0 : 1),
    leftD: '+∞ (szakad)',
    rightD: '0',
    reason: 'Ahol a függvény megszakad, ott nem lehet differenciálható (1. Tétel kontrapozíciója).',
  },
];

export function NonDiffWidget() {
  const [bi, setBi] = useState(0);
  const [h, setH] = useState(0.5);
  const ex = BAD_DIFF[bi];
  const f0 = ex.id === 'disc' ? 1 : 0;
  const yl = ex.f(-h);
  const yr = ex.f(h);
  const ml = (yl - f0) / -h;
  const mr = (yr - f0) / h;

  return (
    <div className="widget">
      <div className="widget-title">A négy ok, amiért egy függvény nem differenciálható</div>
      <div className="relbuttons chips">
        {BAD_DIFF.map((q, i) => (
          <button key={q.id} className={bi === i ? 'on' : ''} onClick={() => setBi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <label>
        szelők távolsága: h = {round(h, 2)}
        <input type="range" min={0.04} max={1.2} step={0.02} value={h} onChange={(e) => setH(Number(e.target.value))} />
      </label>
      <Chart xmin={-1.8} xmax={1.8} ymin={-1.5} ymax={2} h={240}>
        {(m) => (
          <>
            <line x1={m.X(-h)} y1={m.Y(yl)} x2={m.X(0)} y2={m.Y(f0)} stroke="#fb923c" strokeWidth={2.2} />
            <line x1={m.X(0)} y1={m.Y(f0)} x2={m.X(h)} y2={m.Y(yr)} stroke="#34d399" strokeWidth={2.2} />
            <path d={curve(ex.f, m, 600)} className="pl-main" />
            <circle cx={m.X(0)} cy={m.Y(f0)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="result verdict no">
        <p>
          Bal oldali szelő: <strong>{round(ml, 2)}</strong> (határérték: {ex.leftD}) · Jobb oldali szelő: <strong>{round(mr, 2)}</strong> (határérték: {ex.rightD})
        </p>
        <p>{ex.reason}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Differenciálható ⊂ Folytonos hierarchia */

type ClassItem = {
  id: string;
  name: string;
  cont0: boolean;
  diff0: boolean;
  darboux: boolean;
  explain: string;
};

const CLASS_ITEMS: ClassItem[] = [
  {
    id: 'x2',
    name: 'x² (0-ban)',
    cont0: true,
    diff0: true,
    darboux: true,
    explain: 'Differenciálható (f′(0) = 0), ezért automatikusan folytonos is. Polinomként mindenütt sima.',
  },
  {
    id: 'abs',
    name: '|x| (0-ban)',
    cont0: true,
    diff0: false,
    darboux: true,
    explain: 'Folytonos, de NEM differenciálható 0-ban! Ez bizonyítja, hogy az 1. Tétel megfordítása hamis.',
  },
  {
    id: 'cbrt',
    name: 'x^(1/3) (0-ban)',
    cont0: true,
    diff0: false,
    darboux: true,
    explain: 'Folytonos, sőt van függőleges érintője is, de mivel a derivált +∞ (nem véges), 0-ban nem differenciálható.',
  },
  {
    id: 'step',
    name: 'egységugrás U(x)',
    cont0: false,
    diff0: false,
    darboux: false,
    explain: 'Nem folytonos 0-ban, így nem is differenciálható. Ráadásul Darboux tétele miatt semmilyen ℝ-en differenciálható függvény deriváltja sem lehet!',
  },
];

export function HierarchyWidget() {
  const [ci, setCi] = useState(1);
  const item = CLASS_ITEMS[ci];

  return (
    <div className="widget">
      <div className="widget-title">Folytonosság, differenciálhatóság és Darboux tétele</div>
      <div className="relbuttons chips">
        {CLASS_ITEMS.map((q, i) => (
          <button key={q.id} className={ci === i ? 'on' : ''} onClick={() => setCi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <div className="result">
        <table className="tbl">
          <thead>
            <tr>
              <th>tulajdonság</th>
              <th>teljesül?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Folytonos x = 0-ban</td>
              <td><strong>{item.cont0 ? 'Igen' : 'Nem'}</strong></td>
            </tr>
            <tr>
              <td>Differenciálható x = 0-ban</td>
              <td><strong>{item.diff0 ? 'Igen' : 'Nem'}</strong></td>
            </tr>
            <tr>
              <td>Lehet-e egy ℝ-en differenciálható függvény deriváltja? (Darboux)</td>
              <td><strong>{item.darboux ? 'Igen' : 'Nem (ugrása van!)'}</strong></td>
            </tr>
          </tbody>
        </table>
        <p>{item.explain}</p>
      </div>
    </div>
  );
}
