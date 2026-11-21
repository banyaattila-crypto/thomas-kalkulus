import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart, CMap } from './Widgets17';

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');

/** Folytonos görbe a Chart-ban; a nem értelmezett pontnál megszakad. */
function curve(f: (x: number) => number, m: CMap, N = 400): string {
  let d = '';
  let pen = false;
  for (let i = 0; i <= N; i++) {
    const x = m.xmin + ((m.xmax - m.xmin) * i) / N;
    const y = f(x);
    if (!Number.isFinite(y)) {
      pen = false;
      continue;
    }
    const yc = Math.max(-1e4, Math.min(1e4, y));
    d += `${pen ? 'L' : 'M'}${m.X(x).toFixed(1)},${m.Y(yc).toFixed(1)} `;
    pen = true;
  }
  return d;
}

/** Az egyenes két végpontja a nézet szélén (y = y0 + m (x - x0)). */
function lineEnds(m: CMap, x0: number, y0: number, slope: number) {
  return { x1: m.X(m.xmin), y1: m.Y(y0 + slope * (m.xmin - x0)), x2: m.X(m.xmax), y2: m.Y(y0 + slope * (m.xmax - x0)) };
}

/* ------------------------------------------------------------------ 1. oldal: szelő */

type SF = { id: string; name: string; f: (x: number) => number; xr: [number, number]; yr: [number, number]; t0: { min: number; max: number; step: number; init: number }; hmax: number; unit: string; xl: string };
const SFS: SF[] = [
  { id: 'throw', name: 'felhajított labda: 20t − 5t²', f: (t) => 20 * t - 5 * t * t, xr: [0, 4.6], yr: [-6, 24], t0: { min: 0, max: 3, step: 0.25, init: 0.5 }, hmax: 1.5, unit: 'm/s', xl: 't (s)' },
  { id: 'logi', name: 'tenyészet: 100/(1 + 9e^(−0,5t))', f: (t) => 100 / (1 + 9 * Math.exp(-0.5 * t)), xr: [0, 16], yr: [0, 110], t0: { min: 0, max: 10, step: 1, init: 3 }, hmax: 6, unit: 'egyed/nap', xl: 't (nap)' },
  { id: 'sqrt', name: 'g(x) = √x', f: (x) => Math.sqrt(x), xr: [0, 9], yr: [0, 3.6], t0: { min: 0.5, max: 6, step: 0.5, init: 1 }, hmax: 2.5, unit: '', xl: 'x' },
];
const HF = [1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.005];

export function SecantWidget() {
  const [fi, setFi] = useState(0);
  const [t0, setT0] = useState(SFS[0].t0.init);
  const [hi, setHi] = useState(0);
  const [tan, setTan] = useState(false);
  const F = SFS[fi];
  const h = F.hmax * HF[hi];
  const y0 = F.f(t0);
  const y1 = F.f(t0 + h);
  const slope = (y1 - y0) / h;
  const eps = 1e-6;
  const dslope = (F.f(t0 + eps) - F.f(t0 - eps)) / (2 * eps);
  return (
    <div className="widget">
      <div className="widget-title">Szelő és érintő: átlagos és pillanatnyi változási sebesség</div>
      <div className="relbuttons chips">
        {SFS.map((q, i) => (
          <button
            key={q.id}
            className={fi === i ? 'on' : ''}
            onClick={() => {
              setFi(i);
              setT0(q.t0.init);
              setHi(0);
            }}
          >
            {q.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          a kezdőpont: x₀ = {sg(t0)}
          <input type="range" min={F.t0.min} max={F.t0.max} step={F.t0.step} value={t0} onChange={(e) => setT0(Number(e.target.value))} />
        </label>
        <label>
          az intervallum hossza: h = {sg(Math.round(h * 1e4) / 1e4)}
          <input type="range" min={0} max={HF.length - 1} step={1} value={hi} onChange={(e) => setHi(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        <button className={tan ? 'on' : ''} onClick={() => setTan(!tan)}>
          érintő mutatása
        </button>
      </div>
      <Chart xmin={F.xr[0]} xmax={F.xr[1]} ymin={F.yr[0]} ymax={F.yr[1]} h={300}>
        {(m) => {
          const s = lineEnds(m, t0, y0, slope);
          const tl = lineEnds(m, t0, y0, dslope);
          return (
            <>
              <path d={curve(F.f, m)} className="pl-main" />
              {tan && <line x1={tl.x1} y1={tl.y1} x2={tl.x2} y2={tl.y2} className="pl-dash" />}
              <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} className="pl-alt" />
              <circle cx={m.X(t0)} cy={m.Y(y0)} r={5} fill="#fb923c" />
              <circle cx={m.X(t0 + h)} cy={m.Y(y1)} r={5} fill="#4ade80" />
            </>
          );
        }}
      </Chart>
      <div className="legend">narancs egyenes: a P(x₀) és Q(x₀ + h) pontokat összekötő szelő · szaggatott: az érintő (a szelők határhelyzete)</div>
      <div className="result">
        <M block t={`\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{f(x_0+h)-f(x_0)}{h}=\\dfrac{${round(y1, 3)}-${round(y0, 3)}}{${round(h, 4)}}\\approx ${round(slope, 4)}`} />
      </div>
      <div className="explain">
        <p>
          A szelő meredeksége az átlagos változási sebesség{F.unit ? ` (${F.unit})` : ''} az [x₀; x₀ + h] intervallumon. Ahogy h csökken, a szelő az érintőhöz simul, és a meredeksége a pillanatnyi
          változási sebességhez ({round(dslope, 3)}) tart.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: táblázat h -> 0 */

type TF = { id: string; name: string; f: (x: number) => number; alg: (x0: number) => string; lim: (x0: number) => number; x0s: number[]; unit: string };
const TFS: TF[] = [
  {
    id: 'throw',
    name: 'f(t) = 20t − 5t²',
    f: (t) => 20 * t - 5 * t * t,
    alg: (x0) => `${20 - 10 * x0}-5h`,
    lim: (x0) => 20 - 10 * x0,
    x0s: [0.5, 1, 2, 3],
    unit: 'm/s',
  },
  {
    id: 'cube',
    name: 'f(x) = x³',
    f: (x) => x ** 3,
    alg: (x0) => `${3 * x0 * x0}+${3 * x0}h+h^2`,
    lim: (x0) => 3 * x0 * x0,
    x0s: [1, 2, 3],
    unit: '',
  },
];
const HT = [1, 0.1, 0.01, 0.001, 0.0001, 0.00001];

export function LimitTableWidget() {
  const [fi, setFi] = useState(0);
  const [xi, setXi] = useState(1);
  const F = TFS[fi];
  const x0 = F.x0s[Math.min(xi, F.x0s.length - 1)];
  const rows = HT.map((h) => ({ h, r: (F.f(x0 + h) - F.f(x0)) / h, l: (F.f(x0 - h) - F.f(x0)) / -h }));
  return (
    <div className="widget">
      <div className="widget-title">Átlagos sebességek egyre rövidebb intervallumokon</div>
      <div className="relbuttons chips">
        {TFS.map((q, i) => (
          <button
            key={q.id}
            className={fi === i ? 'on' : ''}
            onClick={() => {
              setFi(i);
              setXi(0);
            }}
          >
            {q.name}
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {F.x0s.map((v, i) => (
          <button key={v} className={xi === i ? 'on' : ''} onClick={() => setXi(i)}>
            x₀ = {sg(v)}
          </button>
        ))}
      </div>
      <table className="tbl">
        <thead>
          <tr>
            <th>h</th>
            <th>jobbról: [x₀; x₀ + h]</th>
            <th>balról: [x₀ − h; x₀]</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.h}>
              <td>{sg(r.h)}</td>
              <td>{round(r.r, 6)}</td>
              <td>{round(r.l, 6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result">
        <M block t={`\\dfrac{f(x_0+h)-f(x_0)}{h}=${F.alg(x0)}\\ \\ (h\\ne0)\\ \\longrightarrow\\ ${round(F.lim(x0), 4)}\\ \\text{ha }h\\to0`} />
      </div>
      <div className="explain">
        <p>
          A táblázat mindkét oszlopa ugyanahhoz a számhoz tart. Az algebrai alak megmutatja, miért: h ≠ 0 esetén a tört egyszerűsíthető, és a megmaradt kifejezésben h-t már „nullára engedhetjük”.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: határérték közelítése */

type LF = { id: string; tex: string; f: (x: number) => number; x0: number; L: number; xr: [number, number]; yr: [number, number] };
const LFS: LF[] = [
  { id: 'a', tex: '\\dfrac{x^3-8}{x-2}', f: (x) => (x ** 3 - 8) / (x - 2), x0: 2, L: 12, xr: [0, 4], yr: [0, 30] },
  { id: 'b', tex: '\\dfrac{\\sqrt{x+4}-2}{x}', f: (x) => (Math.sqrt(x + 4) - 2) / x, x0: 0, L: 0.25, xr: [-3, 4], yr: [0, 0.6] },
  { id: 'c', tex: '\\dfrac{\\frac1{x+1}-\\frac12}{x-1}', f: (x) => (1 / (x + 1) - 0.5) / (x - 1), x0: 1, L: -0.25, xr: [-0.5, 3], yr: [-1.1, 0.1] },
];
const DL = [1, 0.5, 0.2, 0.1, 0.01, 0.001];

export function ApproachWidget() {
  const [fi, setFi] = useState(0);
  const [di, setDi] = useState(1);
  const F = LFS[fi];
  const span = F.xr[1] - F.xr[0];
  const d = DL[di] * (span / 8);
  const xl = F.x0 - d;
  const xr = F.x0 + d;
  return (
    <div className="widget">
      <div className="widget-title">Közelítés a „lyukhoz”: x → x₀ jobbról és balról</div>
      <div className="relbuttons chips">
        {LFS.map((q, i) => (
          <button key={q.id} className={fi === i ? 'on' : ''} onClick={() => setFi(i)}>
            <M t={q.tex} />
          </button>
        ))}
      </div>
      <label>
        távolság az x₀ = {sg(F.x0)} helytől: δ = {sg(Math.round(d * 1e5) / 1e5)}
        <input type="range" min={0} max={DL.length - 1} step={1} value={di} onChange={(e) => setDi(Number(e.target.value))} />
      </label>
      <Chart xmin={F.xr[0]} xmax={F.xr[1]} ymin={F.yr[0]} ymax={F.yr[1]} h={300}>
        {(m) => (
          <>
            <line x1={0} y1={m.Y(F.L)} x2={m.w} y2={m.Y(F.L)} className="pl-ok" strokeDasharray="5 4" />
            <path d={curve(F.f, m, 600)} className="pl-main" />
            <circle cx={m.X(F.x0)} cy={m.Y(F.L)} r={5.5} fill="#0b1020" stroke="#f59e0b" strokeWidth={2} />
            <circle cx={m.X(xl)} cy={m.Y(F.f(xl))} r={4.5} fill="#fb923c" />
            <circle cx={m.X(xr)} cy={m.Y(F.f(xr))} r={4.5} fill="#fb923c" />
          </>
        )}
      </Chart>
      <div className="legend">üres kör: a hely, ahol f nincs értelmezve · zöld szaggatott: az L érték, amelyhez a függvényértékek tartanak</div>
      <table className="tbl">
        <thead>
          <tr>
            <th>x</th>
            <th>f(x)</th>
            <th>|f(x) − L|</th>
          </tr>
        </thead>
        <tbody>
          {[xl, xr].map((x) => (
            <tr key={x}>
              <td>{round(x, 5)}</td>
              <td>{round(F.f(x), 6)}</td>
              <td>{round(Math.abs(F.f(x) - F.L), 6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="explain">
        <p>
          x₀-ban a függvény nem értelmezett (0/0 alakú). Ha a pontok mindkét oldalról közelítenek x₀-hoz, a függvényértékek L = {round(F.L, 3)} felé tartanak, ezért{' '}
          <M t={`\\lim_{x\\to ${F.x0}} f(x)=${round(F.L, 3).replace(',', '{,}')}`} />.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: határérték és függvényérték */

type VV = { id: string; name: string; v: number | null; text: string };
const VVS: VV[] = [
  { id: 'u', name: 'f(1) nincs értelmezve', v: null, text: 'Az x = 1 helyen a függvény nincs értelmezve (lyuk a grafikonon).' },
  { id: 'o', name: 'f(1) más érték', v: 0.5, text: 'Az x = 1 helyen a függvényérték 0,5, ami elüt a körülötte lévő értékektől.' },
  { id: 'e', name: 'f(1) = határérték', v: 3, text: 'Az x = 1 helyen a függvényérték éppen 3, a görbe összefüggő.' },
];

export function ValueWidget() {
  const [vi, setVi] = useState(0);
  const V = VVS[vi];
  const base = (x: number) => x * x + 2;
  return (
    <div className="widget">
      <div className="widget-title">A határérték nem függ a függvényértéktől</div>
      <div className="relbuttons chips">
        {VVS.map((q, i) => (
          <button key={q.id} className={vi === i ? 'on' : ''} onClick={() => setVi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <Chart xmin={-1} xmax={3} ymin={0} ymax={8} h={280}>
        {(m) => (
          <>
            <path d={curve(base, m)} className="pl-main" />
            <circle cx={m.X(1)} cy={m.Y(3)} r={5.5} fill={V.v === 3 ? '#fb923c' : '#0b1020'} stroke="#f59e0b" strokeWidth={2} />
            {V.v === 0.5 && <circle cx={m.X(1)} cy={m.Y(0.5)} r={5} fill="#fb923c" />}
          </>
        )}
      </Chart>
      <div className="explain">
        <p>
          {V.text} A határérték mindhárom esetben ugyanaz: <M t="\lim_{x\to1}f(x)=3" />, mert csak az számít, mit csinál a függvény x₀ <em>közelében</em>, magában x₀-ban nem.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: nem létező határérték */

type NF = { id: string; name: string; f: (x: number) => number; yr: [number, number]; left: string; right: string; verdict: string };
const NFS: NF[] = [
  { id: 'jump', name: 'ugrás: x/|x|', f: (x) => (x === 0 ? NaN : x / Math.abs(x)), yr: [-2, 2], left: '−1', right: '+1', verdict: 'Két különböző szám közül nem választhatunk: a bal és a jobb oldali közelítés más értékhez tart.' },
  { id: 'grow', name: 'növekedés: 1/x²', f: (x) => (x === 0 ? NaN : 1 / (x * x)), yr: [0, 60], left: 'minden határon túl nő', right: 'minden határon túl nő', verdict: 'Az értékek bármely adott számot meghaladnak, nincs olyan valós szám, amelyhez közelítenének.' },
  { id: 'osc', name: 'oszcilláció: sin(π/x)', f: (x) => (x === 0 ? NaN : Math.sin(Math.PI / x)), yr: [-1.4, 1.4], left: 'ingadozik −1 és 1 között', right: 'ingadozik −1 és 1 között', verdict: 'Bármilyen kis intervallumban a függvény −1 és 1 között minden értéket felvesz, így semmilyen számhoz nem simul.' },
];
const WN = [2, 1, 0.5, 0.2, 0.1, 0.05];

export function NoLimitWidget() {
  const [fi, setFi] = useState(0);
  const [wi, setWi] = useState(0);
  const F = NFS[fi];
  const w = WN[wi];
  return (
    <div className="widget">
      <div className="widget-title">Amikor nincs határérték (x → 0)</div>
      <div className="relbuttons chips">
        {NFS.map((q, i) => (
          <button key={q.id} className={fi === i ? 'on' : ''} onClick={() => setFi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <label>
        az ablak fél szélessége: {sg(w)}
        <input type="range" min={0} max={WN.length - 1} step={1} value={wi} onChange={(e) => setWi(Number(e.target.value))} />
      </label>
      <Chart xmin={-w} xmax={w} ymin={F.yr[0]} ymax={F.yr[1]} h={280}>
        {(m) => <path d={curve(F.f, m, 3000)} className="pl-main" />}
      </Chart>
      <div className="explain">
        <p>
          Balról közeledve: <strong>{F.left}</strong>; jobbról közeledve: <strong>{F.right}</strong>. {F.verdict}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal: számítógépes csapda */

type CF = { id: string; tex: string; naive: (x: number) => number; stable: (x: number) => number; stableTex: string };
const CFS: CF[] = [
  {
    id: 's',
    tex: '\\dfrac{\\sqrt{x^2+1}-1}{x^2}',
    naive: (x) => (Math.sqrt(x * x + 1) - 1) / (x * x),
    stable: (x) => 1 / (Math.sqrt(x * x + 1) + 1),
    stableTex: '\\dfrac{1}{\\sqrt{x^2+1}+1}',
  },
  {
    id: 'c',
    tex: '\\dfrac{1-\\cos x}{x^2}',
    naive: (x) => (1 - Math.cos(x)) / (x * x),
    stable: (x) => (2 * Math.sin(x / 2) ** 2) / (x * x),
    stableTex: '\\dfrac{2\\sin^2(x/2)}{x^2}',
  },
];

export function FloatTrapWidget() {
  const [fi, setFi] = useState(0);
  const [k, setK] = useState(5);
  const F = CFS[fi];
  return (
    <div className="widget">
      <div className="widget-title">Mit számol a gép, ha x nagyon kicsi?</div>
      <div className="relbuttons chips">
        {CFS.map((q, i) => (
          <button key={q.id} className={fi === i ? 'on' : ''} onClick={() => setFi(i)}>
            <M t={q.tex} />
          </button>
        ))}
      </div>
      <label>
        <M t={`x=10^{-${k}}`} />
        <input type="range" min={1} max={9} step={1} value={k} onChange={(e) => setK(Number(e.target.value))} />
      </label>
      <table className="tbl">
        <thead>
          <tr>
            <th>x</th>
            <th>eredeti képlet</th>
            <th>átalakított képlet</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => {
            const x = 10 ** -j;
            return (
              <tr key={j} style={j === k ? { background: 'rgba(56,189,248,0.15)' } : undefined}>
                <td>10<sup>−{j}</sup></td>
                <td>{round(F.naive(x), 10)}</td>
                <td>{round(F.stable(x), 10)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="result">
        <M block t={`\\text{átalakítva: }${F.stableTex}\\ \\longrightarrow\\ \\tfrac12`} />
      </div>
      <div className="explain">
        <p>
          Az eredeti képlet számlálójában két majdnem egyenlő számot vonunk ki egymásból, ezért a gép kevés értékes jegyet tart meg, kis x-nél pedig a számláló kerekítve pontosan 0 lesz, és a gép
          hamis „határértéket” ad. Az algebrai átalakítás ugyanazt a függvényt adja, de kivonás nélkül, így x → 0 esetén is pontos marad.
        </p>
      </div>
    </div>
  );
}
