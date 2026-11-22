import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');
const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: pontbeli folytonosság (hármas feltétel) */

type CheckPoint = {
  c: number;
  label: string;
  fVal: string;
  limVal: string;
  c1: boolean;
  c2: boolean;
  c3: boolean;
  note: string;
};

const CP_LIST: CheckPoint[] = [
  {
    c: 0,
    label: 'x = 0 (bal végpont)',
    fVal: 'f(0) = 1',
    limVal: 'lim_{x→0⁺} f(x) = 1',
    c1: true,
    c2: true,
    c3: true,
    note: 'Bal végpontnál a jobb oldali határértéket vizsgáljuk: mivel lim_{x→0⁺} f(x) = 1 = f(0), a függvény x = 0-ban (jobbról) folytonos.',
  },
  {
    c: 1,
    label: 'x = 1 (ugrás)',
    fVal: 'f(1) = 1',
    limVal: 'balról 0, jobbról 1 → nem létezik',
    c1: true,
    c2: false,
    c3: false,
    note: 'Hiába létezik f(1) = 1, a két féloldali határérték eltér (0 ≠ 1), így a kétoldali határérték nem létezik: itt ugrásszakadás van.',
  },
  {
    c: 2,
    label: 'x = 2 (kiugró pont)',
    fVal: 'f(2) = 2',
    limVal: 'lim_{x→2} f(x) = 1',
    c1: true,
    c2: true,
    c3: false,
    note: 'Mind f(2), mind a határérték létezik, de nem egyenlők (1 ≠ 2). A 3. feltétel sérül: megszüntethető szakadás.',
  },
  {
    c: 3,
    label: 'x = 3 (belső pont)',
    fVal: 'f(3) = 2',
    limVal: 'lim_{x→3} f(x) = 2',
    c1: true,
    c2: true,
    c3: true,
    note: 'Mindhárom feltétel teljesül: f(3) = 2 és a határérték is 2, tehát a görbe törés nélkül áthalad a ponton.',
  },
  {
    c: 4,
    label: 'x = 4 (jobb végpont)',
    fVal: 'f(4) = 0,5',
    limVal: 'lim_{x→4⁻} f(x) = 1',
    c1: true,
    c2: true,
    c3: false,
    note: 'Jobb végpontnál a bal oldali határérték számít: lim_{x→4⁻} f(x) = 1, de f(4) = 0,5 ≠ 1, ezért itt nem folytonos.',
  },
];

// [0; 4] darabos függvény: [0,1): 1-x; (1,2): 1; (2,3]: x-1; (3,4): 5-x
const cpFunc: Fn = (x) => {
  if (x < 0 || x > 4) return NaN;
  if (Math.abs(x - 1) < 1e-4 || Math.abs(x - 2) < 1e-4 || Math.abs(x - 4) < 1e-4) return NaN;
  if (x < 1) return 1 - x;
  if (x < 2) return 1;
  if (x <= 3) return x - 1;
  return 5 - x;
};

export function ContinuityCheckWidget() {
  const [ci, setCi] = useState(0);
  const cp = CP_LIST[ci];
  const ok = cp.c1 && cp.c2 && cp.c3;

  return (
    <div className="widget">
      <div className="widget-title">A hármas folytonossági próba vizsgálata</div>
      <div className="relbuttons chips">
        {CP_LIST.map((p, i) => (
          <button key={p.c} className={ci === i ? 'on' : ''} onClick={() => setCi(i)}>
            {p.label}
          </button>
        ))}
      </div>
      <Chart xmin={-0.4} xmax={4.4} ymin={-0.3} ymax={2.6} h={250}>
        {(m) => (
          <>
            <line x1={m.X(cp.c)} y1={0} x2={m.X(cp.c)} y2={m.h} className="pl-dash" />
            <path d={curve(cpFunc, m, 600)} className="pl-main" />
            {/* Üres körök */}
            {[
              [1, 0],
              [2, 1],
              [4, 1],
            ].map((p, i) => (
              <circle key={`h${i}`} cx={m.X(p[0])} cy={m.Y(p[1])} r={5} className="pl-hole" stroke="#38bdf8" strokeWidth={2} />
            ))}
            {/* Teli pontok */}
            {[
              [0, 1],
              [1, 1],
              [2, 2],
              [3, 2],
              [4, 0.5],
            ].map((p, i) => (
              <circle
                key={`d${i}`}
                cx={m.X(p[0])}
                cy={m.Y(p[1])}
                r={p[0] === cp.c ? 7 : 5}
                fill={p[0] === cp.c ? '#fbbf24' : '#38bdf8'}
                stroke="#0b0e24"
                strokeWidth={1.5}
              />
            ))}
          </>
        )}
      </Chart>
      <div className={`result verdict ${ok ? 'ok' : 'no'}`}>
        <table className="tbl">
          <thead>
            <tr>
              <th>feltétel</th>
              <th>érték</th>
              <th>teljesül?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. f({cp.c}) létezik</td>
              <td>{cp.fVal}</td>
              <td>{cp.c1 ? 'igen' : 'nem'}</td>
            </tr>
            <tr>
              <td>2. a határérték létezik</td>
              <td>{cp.limVal}</td>
              <td>{cp.c2 ? 'igen' : 'nem'}</td>
            </tr>
            <tr>
              <td>3. határérték = f({cp.c})</td>
              <td>{ok ? 'megegyezik' : 'nem teljesül'}</td>
              <td>{cp.c3 ? 'igen' : 'nem'}</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>{ok ? 'Folytonos.' : 'Nem folytonos (szakadási hely).'}</strong> {cp.note}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: szakadások katalógusa */

type DiscEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  holes?: [number, number][];
  dots?: [number, number][];
  yr: [number, number];
  fixable: boolean;
  type: string;
  desc: string;
};

const DISC_EX: DiscEx[] = [
  {
    id: 'cont',
    name: 'folytonos',
    tex: 'f(x)=x^2+1',
    f: (x) => x * x + 1,
    dots: [[0, 1]],
    yr: [-0.5, 4],
    fixable: true,
    type: 'Nincs szakadás (folytonos)',
    desc: 'A határérték 1, a függvényérték is 1: a ceruza felemelése nélkül rajzolható.',
  },
  {
    id: 'rem',
    name: 'megszüntethető (lyuk)',
    tex: 'f(x)=\\begin{cases}x^2+1,&x\\ne 0\\\\ 2{,}5,&x=0\\end{cases}',
    f: (x) => (Math.abs(x) < 1e-4 ? NaN : x * x + 1),
    holes: [[0, 1]],
    dots: [[0, 2.5]],
    yr: [-0.5, 4],
    fixable: true,
    type: 'Megszüntethető szakadás',
    desc: 'A kétoldali határérték létezik (1), csak f(0) hiányzik vagy elugrott. Ha f(0) = 1-et választjuk, a szakadás eltűnik.',
  },
  {
    id: 'jump',
    name: 'ugrás',
    tex: 'f(x)=\\begin{cases}0,&x<0\\\\ 1{,}5,&x\\ge 0\\end{cases}',
    f: (x) => (Math.abs(x) < 1e-4 ? NaN : x < 0 ? 0 : 1.5),
    holes: [[0, 0]],
    dots: [[0, 1.5]],
    yr: [-0.8, 3],
    fixable: false,
    type: 'Ugrásszakadás',
    desc: 'A bal oldali határérték 0, a jobb oldali 1,5. Bárhogy választjuk f(0)-t, a két ág nem ér össze.',
  },
  {
    id: 'inf',
    name: 'végtelen szakadás',
    tex: 'f(x)=\\dfrac{1}{x^2}',
    f: (x) => (Math.abs(x) < 1e-4 ? NaN : 1 / (x * x)),
    yr: [-0.5, 10],
    fixable: false,
    type: 'Végtelen szakadás',
    desc: 'A függvényértékek +∞-be szaladnak x = 0 körül: egyetlen véges f(0) sem tudja befoltozni.',
  },
  {
    id: 'osc',
    name: 'oszcilláló szakadás',
    tex: 'f(x)=\\sin\\!\\left(\\dfrac{2}{x}\\right)',
    f: (x) => (Math.abs(x) < 1e-4 ? NaN : Math.sin(2 / x)),
    yr: [-1.5, 1.5],
    fixable: false,
    type: 'Oszcilláló szakadás',
    desc: 'A 0 környezetében a görbe végtelen sokszor ingadozik −1 és +1 között, ezért sem jobb, sem bal oldali határérték nincs.',
  },
];

export function DiscontinuityCatalogWidget() {
  const [di, setDi] = useState(1);
  const ex = DISC_EX[di];

  return (
    <div className="widget">
      <div className="widget-title">A szakadási helyek katalógusa (x = 0-ban)</div>
      <div className="relbuttons chips">
        {DISC_EX.map((q, i) => (
          <button key={q.id} className={di === i ? 'on' : ''} onClick={() => setDi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <Chart xmin={-2} xmax={2} ymin={ex.yr[0]} ymax={ex.yr[1]} h={250}>
        {(m) => (
          <>
            <line x1={m.X(0)} y1={0} x2={m.X(0)} y2={m.h} className="pl-dash2" />
            <path d={curve(ex.f, m, ex.id === 'osc' ? 1400 : 500)} className="pl-main" />
            {ex.holes?.map((p, i) => (
              <circle key={`h${i}`} cx={m.X(p[0])} cy={m.Y(p[1])} r={5.5} className="pl-hole" stroke="#38bdf8" strokeWidth={2.2} />
            ))}
            {ex.dots?.map((p, i) => (
              <circle key={`d${i}`} cx={m.X(p[0])} cy={m.Y(p[1])} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
            ))}
          </>
        )}
      </Chart>
      <div className={`result verdict ${ex.fixable ? 'ok' : 'no'}`}>
        <p>
          <strong>{ex.type}.</strong> {ex.desc}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: összetett függvények lánca */

type CompEx = {
  id: string;
  name: string;
  tex: string;
  fName: string;
  gName: string;
  f: Fn;
  g: Fn;
  c: number;
  note: string;
};

const COMP_EX: CompEx[] = [
  {
    id: 'cosfrac',
    name: 'cos(πx / (x + 1))',
    tex: 'h(x)=\\cos\\!\\left(\\dfrac{\\pi x}{x+1}\\right),\\quad c=1',
    fName: 'u = πx / (x + 1)',
    gName: 'g(u) = cos u',
    f: (x) => (Math.PI * x) / (x + 1),
    g: (u) => Math.cos(u),
    c: 1,
    note: 'A belső függvény x = 1-ben folytonos (értéke π/2), a koszinusz pedig mindenütt folytonos: a határérték egyszerűen cos(π/2) = 0.',
  },
  {
    id: 'sqrtpoly',
    name: '√(x² − 2x + 5)',
    tex: 'h(x)=\\sqrt{x^2-2x+5},\\quad c=2',
    fName: 'u = x² − 2x + 5',
    gName: 'g(u) = √u',
    f: (x) => x * x - 2 * x + 5,
    g: (u) => Math.sqrt(u),
    c: 2,
    note: 'Mivel x² − 2x + 5 = (x − 1)² + 4 ≥ 4 > 0, a gyök alatti polinom mindig pozitív, ezért a kompozíció minden valós számra folytonos.',
  },
  {
    id: 'abssin',
    name: '|x sin x / (x² + 2)|',
    tex: 'h(x)=\\left|\\dfrac{x\\sin x}{x^2+2}\\right|,\\quad c=1',
    fName: 'u = x sin x / (x² + 2)',
    gName: 'g(u) = |u|',
    f: (x) => (x * Math.sin(x)) / (x * x + 2),
    g: (u) => Math.abs(u),
    c: 1,
    note: 'A nevező sosem 0, a számláló két folytonos függvény szorzata, a külső |u| pedig mindenütt folytonos — így az egész függvény mindenütt folytonos.',
  },
];

export function CompositeLimitWidget() {
  const [ci, setCi] = useState(0);
  const [dx, setDx] = useState(0.4);
  const ex = COMP_EX[ci];
  const x = ex.c + dx;
  const u = ex.f(x);
  const y = ex.g(u);
  const u0 = ex.f(ex.c);
  const y0 = ex.g(u0);

  return (
    <div className="widget">
      <div className="widget-title">Folytonos kompozíció: a határérték áthalad a láncon</div>
      <div className="relbuttons chips">
        {COMP_EX.map((q, i) => (
          <button key={q.id} className={ci === i ? 'on' : ''} onClick={() => setCi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <label>
        x eltolása c = {sg(ex.c)} körül: x = {round(x, 3)}
        <input type="range" min={-0.6} max={0.6} step={0.02} value={dx} onChange={(e) => setDx(Number(e.target.value))} />
      </label>
      <div className="machine">
        <div className="mc-box in">x = {round(x, 3)}</div>
        <span className="mc-arrow">→</span>
        <div className="mc-box fn">{ex.fName}</div>
        <span className="mc-arrow">→</span>
        <div className="mc-box in">u = {round(u, 4)}</div>
        <span className="mc-arrow">→</span>
        <div className="mc-box fn">{ex.gName}</div>
        <span className="mc-arrow">→</span>
        <div className="mc-box out">y = {round(y, 4)}</div>
      </div>
      <div className="result">
        <M block t={`x\\to ${tx(ex.c, 2)} \\;\\Longrightarrow\\; u\\to ${tx(u0, 4)} \\;\\Longrightarrow\\; g(f(x))\\to ${tx(y0, 4)}`} />
        <p>{ex.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: folytonos kiterjesztés */

type ExtEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  c: number;
  L: number;
  xr: [number, number];
  yr: [number, number];
  reason: string;
};

const EXT_EX: ExtEx[] = [
  {
    id: 'sinc',
    name: '(sin x) / x (c = 0)',
    tex: 'f(x)=\\dfrac{\\sin x}{x}',
    f: (x) => (Math.abs(x) < 1e-4 ? NaN : Math.sin(x) / x),
    c: 0,
    L: 1,
    xr: [-4, 4],
    yr: [-0.5, 2],
    reason: 'Mivel lim_{x→0} (sin x)/x = 1, az F(0) = 1 választás megszünteti a lyukat.',
  },
  {
    id: 'rat',
    name: '(x² − x − 6) / (x² − 9) (c = 3)',
    tex: 'f(x)=\\dfrac{x^2-x-6}{x^2-9}=\\dfrac{x+2}{x+3}\\ (x\\ne 3)',
    f: (x) => (Math.abs(x - 3) < 1e-4 || Math.abs(x + 3) < 1e-4 ? NaN : (x * x - x - 6) / (x * x - 9)),
    c: 3,
    L: 5 / 6,
    xr: [0, 6],
    yr: [0, 1.8],
    reason: 'Az (x − 3) tényezővel egyszerűsítve F(x) = (x + 2)/(x + 3), tehát F(3) = 5/6 ≈ 0,833.',
  },
  {
    id: 'sqrt',
    name: '(√(x + 4) − 2) / x (c = 0)',
    tex: 'f(x)=\\dfrac{\\sqrt{x+4}-2}{x}=\\dfrac{1}{\\sqrt{x+4}+2}\\ (x\\ne 0)',
    f: (x) => (Math.abs(x) < 1e-4 || x < -4 ? NaN : (Math.sqrt(x + 4) - 2) / x),
    c: 0,
    L: 0.25,
    xr: [-3, 5],
    yr: [-0.2, 1.2],
    reason: 'Konjugálttal bővítve F(x) = 1/(√(x + 4) + 2), amiből F(0) = 1/4 = 0,25.',
  },
];

export function ExtensionWidget() {
  const [ei, setEi] = useState(0);
  const [val, setVal] = useState(0.5);
  const ex = EXT_EX[ei];
  const close = Math.abs(val - ex.L) < 0.03;

  return (
    <div className="widget">
      <div className="widget-title">Foltozd be a lyukat: keresd meg a folytonos kiterjesztést!</div>
      <div className="relbuttons chips">
        {EXT_EX.map((q, i) => (
          <button
            key={q.id}
            className={ei === i ? 'on' : ''}
            onClick={() => {
              setEi(i);
              setVal(0.4);
            }}
          >
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <label>
        választott érték F({sg(ex.c)}) = {round(val, 3)}
        <input type="range" min={ex.yr[0] + 0.1} max={ex.yr[1] - 0.1} step={0.01} value={val} onChange={(e) => setVal(Number(e.target.value))} />
      </label>
      <div className="relbuttons chips">
        <button onClick={() => setVal(ex.L)}>állítsd a pontos határértékre</button>
      </div>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={250}>
        {(m) => (
          <>
            <line x1={m.X(ex.c)} y1={0} x2={m.X(ex.c)} y2={m.h} className="pl-dash2" />
            <path d={curve(ex.f, m, 600)} className="pl-main" />
            <circle cx={m.X(ex.c)} cy={m.Y(ex.L)} r={6} className="pl-hole" stroke="#38bdf8" strokeWidth={2.2} />
            <circle cx={m.X(ex.c)} cy={m.Y(val)} r={6} fill={close ? '#34d399' : '#fbbf24'} stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className={`result verdict ${close ? 'ok' : 'no'}`}>
        {close ? (
          <p>
            <strong>Folytonos kiterjesztés!</strong> A lyuk bezárult. {ex.reason}
          </p>
        ) : (
          <p>
            <strong>Még szakadás van.</strong> A sárga pont nem esik egybe a lyukkal: húzd F({sg(ex.c)})-t a határértékhez!
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Bolzano-tétel és felezés */

const bzCont: Fn = (x) => 0.4 * x * x * x - 1.2 * x + 1.2;
const bzJump: Fn = (x) => (Math.abs(x - 1) < 1e-4 ? NaN : x < 1 ? 0.8 * x + 0.4 : 2.6);
const rootFn: Fn = (x) => x * x * x + x - 3;

export function BolzanoWidget() {
  const [tab, setTab] = useState<'ivt' | 'bisect'>('ivt');
  const [broken, setBroken] = useState(false);
  const [y0, setY0] = useState(1.6);
  const [steps, setSteps] = useState(0);

  // Felező módszer az x³ + x - 3 = 0 egyenletre [1; 2]-n
  const bisectHistory: { a: number; b: number; m: number; fm: number }[] = [];
  let a = 1;
  let b = 2;
  for (let i = 0; i <= steps; i++) {
    const mid = (a + b) / 2;
    const fm = rootFn(mid);
    bisectHistory.push({ a, b, m: mid, fm });
    if (i < steps) {
      if (fm < 0) a = mid;
      else b = mid;
    }
  }
  const cur = bisectHistory[bisectHistory.length - 1];

  // Metszéspontok keresése az IVT ábrán [-1; 2]-n
  const fn = broken ? bzJump : bzCont;
  const hits: number[] = [];
  if (!broken || y0 < 1.2 || Math.abs(y0 - 2.6) < 0.05) {
    const N = 800;
    let px = -1;
    let py = fn(px) - y0;
    for (let i = 1; i <= N; i++) {
      const x = -1 + (3 * i) / N;
      const y = fn(x) - y0;
      if (Number.isFinite(py) && Number.isFinite(y) && Math.abs(x - 1) > 0.02 && py * y <= 0) {
        hits.push(x);
      }
      px = x;
      py = y;
    }
  }

  return (
    <div className="widget">
      <div className="widget-title">A Bolzano-tétel és a felező zérushelykeresés</div>
      <div className="relbuttons chips">
        <button className={tab === 'ivt' ? 'on' : ''} onClick={() => setTab('ivt')}>
          Közbenső érték (y = y₀)
        </button>
        <button className={tab === 'bisect' ? 'on' : ''} onClick={() => setTab('bisect')}>
          Zérushely felezéssel (x³ + x − 3 = 0)
        </button>
      </div>

      {tab === 'ivt' ? (
        <>
          <div className="relbuttons chips">
            <button className={!broken ? 'on' : ''} onClick={() => setBroken(false)}>
              folytonos görbe
            </button>
            <button className={broken ? 'on' : ''} onClick={() => setBroken(true)}>
              ugrásos ellenpélda
            </button>
          </div>
          <label>
            cél-magasság: y₀ = {round(y0, 2)} (f(−1) és f(2) között)
            <input type="range" min={0} max={2.6} step={0.05} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
          </label>
          <Chart xmin={-1.3} xmax={2.3} ymin={-0.6} ymax={3.2} h={250}>
            {(m) => (
              <>
                <line x1={0} y1={m.Y(y0)} x2={m.w} y2={m.Y(y0)} className="pl-alt" strokeDasharray="6 5" />
                <path d={curve(fn, m, 600)} className="pl-main" />
                {broken && (
                  <>
                    <circle cx={m.X(1)} cy={m.Y(1.2)} r={5} className="pl-hole" stroke="#38bdf8" strokeWidth={2} />
                    <circle cx={m.X(1)} cy={m.Y(2.6)} r={5} fill="#38bdf8" />
                  </>
                )}
                {hits.map((hx, i) => (
                  <circle key={i} cx={m.X(hx)} cy={m.Y(y0)} r={6} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
                ))}
              </>
            )}
          </Chart>
          <div className={`result verdict ${hits.length > 0 ? 'ok' : 'no'}`}>
            {hits.length > 0 ? (
              <p>
                <strong>Van metszéspont!</strong> Az <M t={`y=${tx(y0, 2)}`} /> egyenes {hits.length} helyen metszi a görbét a [−1; 2] intervallumon.
              </p>
            ) : (
              <p>
                <strong>Nincs metszéspont!</strong> A (1,2; 2,6) sáv teljes egészében kimaradt az ugrás miatt — ezért nélkülözhetetlen a folytonosság feltétele.
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="relbuttons chips">
            <button disabled={steps >= 8} onClick={() => setSteps((s) => Math.min(8, s + 1))}>
              Következő felezés ({steps}/8)
            </button>
            <button onClick={() => setSteps(0)}>Vissza az elejére</button>
          </div>
          <Chart xmin={0.8} xmax={2.2} ymin={-2} ymax={7} h={240}>
            {(m) => (
              <>
                <rect x={m.X(cur.a)} y={0} width={Math.max(2, m.X(cur.b) - m.X(cur.a))} height={m.h} className="band-delta" />
                <path d={curve(rootFn, m, 400)} className="pl-main" />
                <circle cx={m.X(cur.m)} cy={m.Y(cur.fm)} r={6} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
              </>
            )}
          </Chart>
          <div className="result">
            <p>
              Aktuális záróintervallum: <M t={`[${tx(cur.a, 4)};\\,${tx(cur.b, 4)}]`} />, felezőpont: <M t={`m=${tx(cur.m, 4)}`} />, <M t={`f(m)=${tx(cur.fm, 4)}`} /> ({cur.fm < 0 ? 'negatív → jobb fél' : 'pozitív → bal fél'}).
            </p>
            <p>
              A valódi zérushely ≈ <strong>1,2134</strong>; minden lépés felére csökkenti a bizonytalanságot!
            </p>
          </div>
        </>
      )}
    </div>
  );
}
