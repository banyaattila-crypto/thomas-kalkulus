import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');

/* ------------------------------------------------------------------ 1. oldal: határérték és műveletek */

const lf = (x: number) => 2 * x + 1;
const lg = (x: number) => x * x - 4;
type Op = { id: string; name: string; tex: string; fn: (a: number, b: number) => number };
const OPS: Op[] = [
  { id: 'add', name: 'f + g', tex: 'L+M', fn: (a, b) => a + b },
  { id: 'sub', name: 'f − g', tex: 'L-M', fn: (a, b) => a - b },
  { id: 'mul', name: 'f · g', tex: 'L\\cdot M', fn: (a, b) => a * b },
  { id: 'k', name: '3f', tex: '3L', fn: (a) => 3 * a },
  { id: 'div', name: 'f / g', tex: 'L/M', fn: (a, b) => a / b },
];
const CS = [-2, -1, 0, 1, 2, 3];
const DS = [1, 0.5, 0.1, 0.01, 0.001];

export function LawsWidget() {
  const [oi, setOi] = useState(0);
  const [c, setC] = useState(1);
  const [di, setDi] = useState(1);
  const O = OPS[oi];
  const d = DS[di];
  const L = lf(c);
  const Mv = lg(c);
  const bad = O.id === 'div' && Mv === 0;
  const row = (x: number) => ({ x, a: lf(x), b: lg(x), r: O.fn(lf(x), lg(x)) });
  const rows = [row(c - d), row(c + d)];
  return (
    <div className="widget">
      <div className="widget-title">Határérték és műveletek: f(x) = 2x + 1, g(x) = x² − 4</div>
      <div className="relbuttons chips">
        {OPS.map((q, i) => (
          <button key={q.id} className={oi === i ? 'on' : ''} onClick={() => setOi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {CS.map((v) => (
          <button key={v} className={c === v ? 'on' : ''} onClick={() => setC(v)}>
            c = {sg(v)}
          </button>
        ))}
      </div>
      <label>
        távolság c-től: δ = {sg(d)}
        <input type="range" min={0} max={DS.length - 1} step={1} value={di} onChange={(e) => setDi(Number(e.target.value))} />
      </label>
      <table className="tbl">
        <thead>
          <tr>
            <th>x</th>
            <th>f(x)</th>
            <th>g(x)</th>
            <th>{O.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.x}>
              <td>{round(r.x, 4)}</td>
              <td>{round(r.a, 5)}</td>
              <td>{round(r.b, 5)}</td>
              <td>{Number.isFinite(r.r) ? round(r.r, 5) : '–'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result">
        <M block t={`L=\\lim f=${L},\\quad M=\\lim g=${Mv}`} />
        {bad ? <p>M = 0, ezért a hányadosszabály nem alkalmazható: a nevező határértéke nulla.</p> : <M block t={`\\text{a szabály szerint: }${O.tex}=${round(O.fn(L, Mv), 5).replace(',', '{,}')}`} />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: racionális törtfüggvény */

type RF = { id: string; tex: string; num: (x: number) => number; den: (x: number) => number; simp: (x: number) => number; zeros: [number, number]; yr: [number, number] };
const RFS: RF[] = [
  { id: 'r1', tex: '\\dfrac{x^2-x-6}{x^2-9}', num: (x) => x * x - x - 6, den: (x) => x * x - 9, simp: (x) => (x + 2) / (x + 3), zeros: [-3, 3], yr: [-6, 6] },
  { id: 'r2', tex: '\\dfrac{x^2+x-2}{x^2-1}', num: (x) => x * x + x - 2, den: (x) => x * x - 1, simp: (x) => (x + 2) / (x + 1), zeros: [-1, 1], yr: [-6, 6] },
];

export function RationalWidget() {
  const [fi, setFi] = useState(0);
  const [c, setC] = useState(1);
  const F = RFS[fi];
  const pn = F.num(c);
  const qd = F.den(c);
  const kind = qd !== 0 ? 'sub' : pn === 0 ? 'hole' : 'pole';
  const L = F.simp(c);
  return (
    <div className="widget">
      <div className="widget-title">Behelyettesítés racionális törtfüggvénynél</div>
      <div className="relbuttons chips">
        {RFS.map((q, i) => (
          <button key={q.id} className={fi === i ? 'on' : ''} onClick={() => setFi(i)}>
            <M t={q.tex} />
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((v) => (
          <button key={v} className={c === v ? 'on' : ''} onClick={() => setC(v)}>
            c = {sg(v)}
          </button>
        ))}
      </div>
      <Chart xmin={-5} xmax={5} ymin={F.yr[0]} ymax={F.yr[1]} h={300}>
        {(m) => {
          const raw = (x: number) => F.num(x) / F.den(x);
          return (
            <>
              <path d={curve(raw, m, 1000)} className="pl-main" />
              {kind === 'pole' && <line x1={m.X(c)} y1={0} x2={m.X(c)} y2={m.h} className="pl-dash" />}
              {kind !== 'pole' && <circle cx={m.X(c)} cy={m.Y(L)} r={5.5} fill={kind === 'sub' ? '#fb923c' : '#0b1020'} stroke="#f59e0b" strokeWidth={2} />}
            </>
          );
        }}
      </Chart>
      <div className="result">
        <M block t={`P(c)=${pn},\\quad Q(c)=${qd}`} />
      </div>
      <div className="explain">
        {kind === 'sub' && (
          <p>
            A nevező nem nulla, ezért a 3. tétel szerint egyszerű behelyettesítés elég: a határérték {sg(pn)}/{sg(qd)} = {round(pn / qd, 4)}.
          </p>
        )}
        {kind === 'hole' && (
          <p>
            Mindkettő nulla (0/0 alak): a számlálóból és a nevezőből is kiemelhető (x − c). Egyszerűsítés után a határérték {round(L, 4)}; a grafikonon „lyuk” van.
          </p>
        )}
        {kind === 'pole' && (
          <p>
            A nevező nulla, a számláló nem: az értékek c közelében minden határon túl nőnek, ezért nincs (véges) határérték. A grafikonnak itt függőleges „aszimptotája” van (2.5).
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: algebrai lépések */

type SX = {
  id: string;
  tex: string;
  f: (x: number) => number;
  c: number;
  L: number;
  xr: [number, number];
  yr: [number, number];
  steps: { tex: string; note: string }[];
};
const SXS: SX[] = [
  {
    id: 'fac',
    tex: '\\dfrac{x^2+x-6}{x^2-2x},\\ x\\to2',
    f: (x) => (x * x + x - 6) / (x * x - 2 * x),
    c: 2,
    L: 2.5,
    xr: [1, 5],
    yr: [1, 5],
    steps: [
      { tex: '\\dfrac{2^2+2-6}{2^2-2\\cdot2}=\\dfrac00', note: 'Behelyettesítve 0/0 adódik, ezért tovább kell alakítani.' },
      { tex: '\\dfrac{(x-2)(x+3)}{x(x-2)}', note: 'Szorzattá bontjuk a számlálót és a nevezőt.' },
      { tex: '=\\dfrac{x+3}{x}\\qquad(x\\ne2)', note: 'Egyszerűsítünk a közös tényezővel (x ≠ 2).' },
      { tex: '\\to\\dfrac{2+3}{2}=\\dfrac52', note: 'Az egyszerűsített alakba behelyettesítünk.' },
    ],
  },
  {
    id: 'conj',
    tex: '\\dfrac{\\sqrt{x+1}-1}{x},\\ x\\to0',
    f: (x) => (Math.sqrt(x + 1) - 1) / x,
    c: 0,
    L: 0.5,
    xr: [-1, 5],
    yr: [0, 1.1],
    steps: [
      { tex: '\\dfrac{\\sqrt{0+1}-1}{0}=\\dfrac00', note: 'Behelyettesítve 0/0 adódik, szorzattá bontani nem tudunk.' },
      { tex: '\\dfrac{\\sqrt{x+1}-1}{x}\\cdot\\dfrac{\\sqrt{x+1}+1}{\\sqrt{x+1}+1}', note: 'Bővítünk a számláló konjugáltjával.' },
      { tex: '=\\dfrac{(x+1)-1}{x(\\sqrt{x+1}+1)}=\\dfrac{1}{\\sqrt{x+1}+1}\\quad(x\\ne0)', note: 'A gyökjel eltűnik, x kiesik.' },
      { tex: '\\to\\dfrac{1}{1+1}=\\dfrac12', note: 'Behelyettesítünk.' },
    ],
  },
  {
    id: 'den',
    tex: '\\dfrac{\\frac1x-\\frac14}{x-4},\\ x\\to4',
    f: (x) => (1 / x - 0.25) / (x - 4),
    c: 4,
    L: -1 / 16,
    xr: [1, 8],
    yr: [-0.3, 0.02],
    steps: [
      { tex: '\\dfrac{\\frac14-\\frac14}{0}=\\dfrac00', note: 'Behelyettesítve 0/0.' },
      { tex: '\\dfrac1x-\\dfrac14=\\dfrac{4-x}{4x}', note: 'A számlálót közös nevezőre hozzuk.' },
      { tex: '\\dfrac{4-x}{4x(x-4)}=-\\dfrac{1}{4x}\\quad(x\\ne4)', note: 'A 4 − x = −(x − 4), így egyszerűsíthetünk.' },
      { tex: '\\to-\\dfrac{1}{16}', note: 'Behelyettesítünk: −1/(4·4).' },
    ],
  },
];

export function StepsWidget() {
  const [ei, setEi] = useState(0);
  const [st, setSt] = useState(0);
  const E = SXS[ei];
  return (
    <div className="widget">
      <div className="widget-title">0/0 alak feloldása lépésről lépésre</div>
      <div className="relbuttons chips">
        {SXS.map((q, i) => (
          <button
            key={q.id}
            className={ei === i ? 'on' : ''}
            onClick={() => {
              setEi(i);
              setSt(0);
            }}
          >
            <M t={q.tex} />
          </button>
        ))}
      </div>
      <Chart xmin={E.xr[0]} xmax={E.xr[1]} ymin={E.yr[0]} ymax={E.yr[1]} h={260}>
        {(m) => (
          <>
            <path d={curve(E.f, m, 800)} className="pl-main" />
            <circle cx={m.X(E.c)} cy={m.Y(E.L)} r={5.5} fill="#0b1020" stroke="#f59e0b" strokeWidth={2} />
          </>
        )}
      </Chart>
      <div className="legend">üres kör: a „lyuk”, ahol az eredeti formula nem értelmezett, de a határérték létezik</div>
      <div className="relbuttons chips">
        <button onClick={() => setSt(Math.max(0, st - 1))}>← vissza</button>
        <button className="on" onClick={() => setSt(Math.min(E.steps.length - 1, st + 1))}>
          következő lépés →
        </button>
      </div>
      {E.steps.slice(0, st + 1).map((s, i) => (
        <div key={i} className="result">
          <M block t={s.tex} />
          <p style={{ textAlign: 'center', opacity: 0.85 }}>{s.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: szendvicstétel */

type SW = { id: string; name: string; f: (x: number) => number; lo: (x: number) => number; hi: (x: number) => number; L: number; yr: (w: number) => [number, number] };
const SWS: SW[] = [
  { id: 'a', name: 'x² · sin(1/x), korlátok: ±x²', f: (x) => (x === 0 ? NaN : x * x * Math.sin(1 / x)), lo: (x) => -x * x, hi: (x) => x * x, L: 0, yr: (w) => [-1.3 * w * w, 1.3 * w * w] },
  { id: 'b', name: '2 + x · cos(5/x), korlátok: 2 ± |x|', f: (x) => (x === 0 ? NaN : 2 + x * Math.cos(5 / x)), lo: (x) => 2 - Math.abs(x), hi: (x) => 2 + Math.abs(x), L: 2, yr: (w) => [2 - 1.3 * w, 2 + 1.3 * w] },
];
const WS = [1, 0.5, 0.2, 0.1, 0.05];

export function SandwichWidget() {
  const [si, setSi] = useState(0);
  const [wi, setWi] = useState(0);
  const S = SWS[si];
  const w = WS[wi];
  return (
    <div className="widget">
      <div className="widget-title">Szendvicstétel: közrefogott függvény</div>
      <div className="relbuttons chips">
        {SWS.map((q, i) => (
          <button key={q.id} className={si === i ? 'on' : ''} onClick={() => setSi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <label>
        az ablak fél szélessége: {sg(w)}
        <input type="range" min={0} max={WS.length - 1} step={1} value={wi} onChange={(e) => setWi(Number(e.target.value))} />
      </label>
      <Chart xmin={-w} xmax={w} ymin={S.yr(w)[0]} ymax={S.yr(w)[1]} h={300}>
        {(m) => (
          <>
            <line x1={0} y1={m.Y(S.L)} x2={m.w} y2={m.Y(S.L)} className="pl-ok" strokeDasharray="3 4" />
            <path d={curve(S.f, m, 4000)} className="pl-main" />
            <path d={curve(S.lo, m, 200)} className="pl-dash" />
            <path d={curve(S.hi, m, 200)} className="pl-dash" />
          </>
        )}
      </Chart>
      <div className="legend">kék: a vizsgált függvény · szaggatott: az alsó és a felső korlát · zöld: a közös határérték ({sg(S.L)})</div>
      <div className="explain">
        <p>
          A függvény bármilyen hevesen ingadozik, az alsó és a felső korlát ugyanahhoz a számhoz, {sg(S.L)}-hoz tart, ezért a közrefogott függvény is oda tart.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: amikor a szabály nem alkalmazható */

type FX = {
  id: string;
  name: string;
  f: (x: number) => number;
  g: (x: number) => number;
  comb: (x: number) => number;
  combName: string;
  yr: [number, number];
  xr: [number, number];
  text: string;
};
const FXS: FX[] = [
  {
    id: 'sum',
    name: 'összeg, de f és g határértéke nincs',
    f: (x) => (x === 0 ? NaN : 1 / x),
    g: (x) => (x === 0 ? NaN : -1 / x),
    comb: (x) => (x === 0 ? NaN : 1 / x - 1 / x),
    combName: 'f + g',
    yr: [-6, 6],
    xr: [-3, 3],
    text: 'f(x) = 1/x és g(x) = −1/x egyikének sincs határértéke 0-ban, az összegük viszont minden x ≠ 0-ra 0, tehát az összeg határértéke 0. A szabály feltétele elégséges, nem szükséges.',
  },
  {
    id: 'quot',
    name: 'hányados, M = 0',
    f: (x) => x,
    g: (x) => x * x,
    comb: (x) => (x === 0 ? NaN : x / (x * x)),
    combName: 'f / g',
    yr: [-6, 6],
    xr: [-2, 2],
    text: 'f(x) = x és g(x) = x² is nullához tart, de a hányadosuk, 1/x, nem tart semmilyen számhoz. Ha a nevező határértéke 0, a hányadosszabály nem használható, és a végeredmény bármi lehet.',
  },
  {
    id: 'strict',
    name: 'egyenlőtlenség és határérték',
    f: (x) => x * x,
    g: () => 0,
    comb: (x) => x * x,
    combName: 'f',
    yr: [-0.5, 4],
    xr: [-2, 2],
    text: 'Itt x ≠ 0 esetén x² > 0 (szigorú egyenlőtlenség), a határértékek mégis egyenlők: mindkettő 0. A határértékképzés a ≤ egyenlőtlenséget megtartja, a < egyenlőtlenséget nem.',
  },
];

export function FailWidget() {
  const [i, setI] = useState(0);
  const E = FXS[i];
  return (
    <div className="widget">
      <div className="widget-title">Mire kell vigyázni a szabályoknál?</div>
      <div className="relbuttons chips">
        {FXS.map((q, j) => (
          <button key={q.id} className={i === j ? 'on' : ''} onClick={() => setI(j)}>
            {q.name}
          </button>
        ))}
      </div>
      <Chart xmin={E.xr[0]} xmax={E.xr[1]} ymin={E.yr[0]} ymax={E.yr[1]} h={280}>
        {(m) => (
          <>
            {E.id !== 'strict' && <path d={curve(E.f, m, 800)} className="pl-main" />}
            <path d={curve(E.g, m, 800)} className="pl-alt" />
            {E.id === 'strict' ? <path d={curve(E.comb, m, 800)} className="pl-main" /> : <path d={curve(E.comb, m, 800)} className="pl-ok" strokeWidth={3} />}
          </>
        )}
      </Chart>
      <div className="legend">
        {E.id === 'strict' ? 'kék: f(x) = x² · narancs: g(x) = 0' : `kék: f · narancs: g · zöld: ${E.combName}`}
      </div>
      <div className="explain">
        <p>{E.text}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal: stratégia */

type ST = { id: string; tex: string; node: 0 | 1 | 2 | 3; sol: string; ans: string };
const STS: ST[] = [
  { id: '1', tex: '\\lim_{x\\to2}(x^2+3x-1)', node: 0, sol: '2^2+3\\cdot2-1', ans: '9' },
  { id: '2', tex: '\\lim_{x\\to3}\\dfrac{x^2-9}{x-3}', node: 1, sol: '\\dfrac{(x-3)(x+3)}{x-3}=x+3\\to6', ans: '6' },
  { id: '3', tex: '\\lim_{x\\to0}\\dfrac{\\sqrt{x+4}-2}{x}', node: 1, sol: '\\dfrac{1}{\\sqrt{x+4}+2}\\to\\dfrac14\\ \\text{(konjugálttal bővítve)}', ans: '\\tfrac14' },
  { id: '4', tex: '\\lim_{x\\to1}\\dfrac{x+2}{x-1}', node: 2, sol: '\\text{számláló}\\to3\\ne0,\\ \\text{nevező}\\to0', ans: '\\text{nincs véges határérték}' },
  { id: '5', tex: '\\lim_{x\\to0}x\\cos\\dfrac1x', node: 3, sol: '-|x|\\le x\\cos\\tfrac1x\\le|x|,\\ \\text{mindkét korlát }0\\text{-hoz tart}', ans: '0' },
];
const NODES = [
  { t: '1. Behelyettesítés', d: 'Ha a nevező nem nulla (és a kifejezés értelmes), a határérték a helyettesítési érték.' },
  { t: '2. 0/0 alak: algebrai átalakítás', d: 'Szorzattá bontás és egyszerűsítés, konjugálttal bővítés, közös nevezőre hozás. Utána újra behelyettesítünk.' },
  { t: '3. Szám/0 (a szám nem 0)', d: 'Nincs véges határérték: az értékek minden határon túl nőnek (2.5).' },
  { t: '4. Korlátos ingadozás × nullához tartó tényező', d: 'Szendvicstétellel: az abszolút értéket felülről egy nullához tartó függvény korlátozza.' },
];

export function StrategyWidget() {
  const [i, setI] = useState(1);
  const S = STS[i];
  return (
    <div className="widget">
      <div className="widget-title">Melyik módszert válasszam?</div>
      <div className="relbuttons chips">
        {STS.map((q, j) => (
          <button key={q.id} className={i === j ? 'on' : ''} onClick={() => setI(j)}>
            <M t={q.tex} />
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 8, margin: '10px 0' }}>
        {NODES.map((n, j) => (
          <div
            key={j}
            style={{
              padding: '8px 12px',
              borderRadius: 10,
              border: `1px solid ${S.node === j ? '#f59e0b' : 'rgba(148,163,184,0.25)'}`,
              background: S.node === j ? 'rgba(245,158,11,0.12)' : 'rgba(15,23,42,0.5)',
              opacity: S.node === j ? 1 : 0.6,
            }}
          >
            <strong>{n.t}</strong>
            <div style={{ fontSize: '0.9rem' }}>{n.d}</div>
          </div>
        ))}
      </div>
      <div className="result">
        <M block t={`${S.sol}\\ \\Rightarrow\\ ${S.ans}`} />
      </div>
    </div>
  );
}
