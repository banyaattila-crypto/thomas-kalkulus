import { useState } from 'react';
import { Plane, PFunc, PCircle } from './Plane';
import type { PMap } from './Plane';
import { M, tex } from './M';
import { round } from './fmt';
import { argTex, outerTex, SC, SC1 } from './ops15';
import { exactTrig, piTex } from './ops16';

const RAD = Math.PI / 180;
const fin = (v: number) => (Number.isFinite(v) ? v : NaN);
const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');
const r6 = (v: number) => (Math.round(v * 1e6) / 1e6 === 0 ? 0 : v).toFixed(6).replace('.', ',').replace('-', '−');

/* ------------------------------------------------------------------ 1. oldal */

/** Ívmérték: a θ szög, a sugár és az ív hossza (s = r·θ). */
export function RadianWidget() {
  const [k, setK] = useState(5); // θ = k·π/12
  const [r, setR] = useState(3);
  const th = (k * Math.PI) / 12;
  const arc = (m: PMap) => {
    const N = Math.max(2, Math.ceil(Math.abs(k) * 6));
    let d = '';
    for (let i = 0; i <= N; i++) {
      const t = (th * i) / N;
      d += `${i === 0 ? 'M' : 'L'}${m.X(r * Math.cos(t)).toFixed(1)},${m.Y(r * Math.sin(t)).toFixed(1)} `;
    }
    return d;
  };
  const turns = Math.abs(th) / (2 * Math.PI);
  return (
    <div className="widget">
      <div className="widget-title">Szög radiánban és az ív hossza</div>
      <div className="sliders">
        <label>
          θ = {sg(Math.round(th * 1000) / 1000)} rad = {sg(k * 15)}°
          <input type="range" min={-24} max={48} step={1} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
        <label>
          r = {sg(r)}
          <input type="range" min={1} max={5} step={0.5} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-6} xmax={6} ymin={-6} ymax={6}>
        {(m) => (
          <>
            <PCircle map={m} h={0} k={0} r={r} cls="pl-dash2" />
            <path d={arc(m)} fill="none" stroke="#f59e0b" strokeWidth={5} strokeLinecap="round" />
            <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(r)} y2={m.Y(0)} className="pl-ok" />
            <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(r * Math.cos(th))} y2={m.Y(r * Math.sin(th))} className="pl-main" />
            <circle cx={m.X(r * Math.cos(th))} cy={m.Y(r * Math.sin(th))} r={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Plane>
      <div className="legend">zöld: kezdő szár (pozitív x-tengely) · kék: elforgatott szár · sárga: a szöghöz tartozó ív</div>
      <div className="result">
        <M block t={`\\theta=${piTex(k)}\\ \\text{rad}=${k * 15}^\\circ`} />
        <M block t={`s=r\\theta=${tex(r)}\\cdot${tex(Math.round(th * 1000) / 1000)}\\approx${tex(Math.round(r * th * 1000) / 1000)}`} />
      </div>
      <div className="explain">
        <p>
          Az ív előjeles hossza {round(r * th, 2)} egység. {th < 0 && 'A negatív szög az óramutató járásával egyező irányba forgat. '}
          {turns > 1 && `A szög ${round(turns, 2)} teljes fordulatnak felel meg, az ív többször befutja a kört. `}A hossz a sugárral arányosan nő, a szög viszont nem függ a sugártól: ezért tiszta mérőszám.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal */

/** Egységkör: a szög koszinusza, szinusza és tangense szakaszként, mind a hat függvény értéke. */
export function UnitCircleWidget() {
  const [deg, setDeg] = useState(60);
  const t = deg * RAD;
  const c = Math.cos(t);
  const s = Math.sin(t);
  const small = (v: number) => Math.abs(v) < 1e-9;
  const val = (ok: boolean, v: number) => (ok ? round(v, 3) : 'nincs értelmezve');
  const ex = exactTrig(deg);
  const tn = small(c) ? NaN : s / c;
  const quad = deg === 0 || deg === 360 ? 'az x-tengelyen' : deg < 90 ? 'I. síknegyed' : deg === 90 ? 'az y-tengelyen' : deg < 180 ? 'II. síknegyed' : deg === 180 ? 'az x-tengelyen' : deg < 270 ? 'III. síknegyed' : deg === 270 ? 'az y-tengelyen' : 'IV. síknegyed';
  const k15 = deg % 15 === 0 ? deg / 15 : null;
  return (
    <div className="widget">
      <div className="widget-title">Egységkör: a hat szögfüggvény</div>
      <label>
        θ = {sg(deg)}° {k15 !== null ? '' : `(${round(t, 3)} rad)`}
        <input type="range" min={0} max={360} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
      </label>
      <Plane xmin={-3} xmax={3} ymin={-3} ymax={3}>
        {(m) => {
          const ty = Number.isNaN(tn) ? 0 : Math.max(-3, Math.min(3, tn));
          return (
            <>
              <PCircle map={m} h={0} k={0} r={1} cls="pl-dash2" />
              <line x1={m.X(1)} y1={m.Y(-3)} x2={m.X(1)} y2={m.Y(3)} className="pl-dash2" />
              {!Number.isNaN(tn) && <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(1)} y2={m.Y(tn)} stroke="rgba(226,232,240,0.35)" strokeWidth={1.4} strokeDasharray="5 5" />}
              {!Number.isNaN(tn) && <line x1={m.X(1)} y1={m.Y(0)} x2={m.X(1)} y2={m.Y(ty)} stroke="#f59e0b" strokeWidth={4} />}
              <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(c)} y2={m.Y(0)} stroke="#fb923c" strokeWidth={4} />
              <line x1={m.X(c)} y1={m.Y(0)} x2={m.X(c)} y2={m.Y(s)} stroke="#34d399" strokeWidth={4} />
              <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(c)} y2={m.Y(s)} className="pl-main" />
              <circle cx={m.X(c)} cy={m.Y(s)} r={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />
            </>
          );
        }}
      </Plane>
      <div className="legend">
        <span style={{ color: '#fb923c' }}>cos θ</span> (vízszintes szakasz) · <span style={{ color: '#34d399' }}>sin θ</span> (függőleges szakasz) ·{' '}
        <span style={{ color: '#f59e0b' }}>tg θ</span> (az x = 1 egyenesen, előjeles hossz) · a pont {quad} van
      </div>
      <table className="tbl">
        <tbody>
          <tr>
            <td>sin θ</td>
            <td>{round(s, 3)}</td>
            <td>cos θ</td>
            <td>{round(c, 3)}</td>
            <td>tg θ</td>
            <td>{val(!small(c), s / c)}</td>
          </tr>
          <tr>
            <td>csc θ</td>
            <td>{val(!small(s), 1 / s)}</td>
            <td>sec θ</td>
            <td>{val(!small(c), 1 / c)}</td>
            <td>ctg θ</td>
            <td>{val(!small(s), c / s)}</td>
          </tr>
        </tbody>
      </table>
      {ex && (
        <div className="result">
          <M block t={`\\sin\\theta=${ex.sin},\\quad \\cos\\theta=${ex.cos},\\quad \\operatorname{tg}\\theta=${ex.tan ?? '\\text{nincs}'}`} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal */

type TF = { id: string; name: string; tex: string; f: (x: number) => number; period: number; periodTex: string; parity: 'páros' | 'páratlan' };
const TFS: TF[] = [
  { id: 'sin', name: 'sin x', tex: '\\sin x', f: Math.sin, period: 2 * Math.PI, periodTex: '2\\pi', parity: 'páratlan' },
  { id: 'cos', name: 'cos x', tex: '\\cos x', f: Math.cos, period: 2 * Math.PI, periodTex: '2\\pi', parity: 'páros' },
  { id: 'tan', name: 'tg x', tex: '\\operatorname{tg}x', f: Math.tan, period: Math.PI, periodTex: '\\pi', parity: 'páratlan' },
  { id: 'cot', name: 'ctg x', tex: '\\operatorname{ctg}x', f: (x) => Math.cos(x) / Math.sin(x), period: Math.PI, periodTex: '\\pi', parity: 'páratlan' },
  { id: 'sec', name: 'sec x', tex: '\\sec x', f: (x) => 1 / Math.cos(x), period: 2 * Math.PI, periodTex: '2\\pi', parity: 'páros' },
  { id: 'csc', name: 'csc x', tex: '\\csc x', f: (x) => 1 / Math.sin(x), period: 2 * Math.PI, periodTex: '2\\pi', parity: 'páratlan' },
];

/** A hat függvény grafikonja, periódussáv, és a periodicitás és paritás számszerű próbája. */
export function TrigGraphWidget() {
  const [id, setId] = useState('sin');
  const [x0, setX0] = useState(1);
  const F = TFS.find((t) => t.id === id)!;
  const f = (x: number) => fin(F.f(x));
  const v = (x: number) => {
    const y = f(x);
    return Number.isFinite(y) && Math.abs(y) < 1e6 ? round(y, 4) : 'nincs értelmezve';
  };
  return (
    <div className="widget">
      <div className="widget-title">A hat trigonometrikus függvény</div>
      <div className="relbuttons chips">
        {TFS.map((t) => (
          <button key={t.id} className={id === t.id ? 'on' : ''} onClick={() => setId(t.id)}>
            {t.name}
          </button>
        ))}
      </div>
      <label>
        x = {sg(x0)}
        <input type="range" min={-3.5} max={3.5} step={0.25} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <Plane xmin={-7} xmax={7} ymin={-4} ymax={4}>
        {(m) => (
          <>
            <rect x={m.X(0)} y={m.Y(4)} width={m.X(F.period) - m.X(0)} height={m.Y(-4) - m.Y(4)} className="pl-fill" opacity={0.35} />
            <PFunc map={m} fn={f} />
            {Number.isFinite(f(x0)) && Math.abs(f(x0)) < 4 && <circle cx={m.X(x0)} cy={m.Y(f(x0))} r={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />}
            {Number.isFinite(f(x0 + F.period)) && Math.abs(f(x0 + F.period)) < 4 && x0 + F.period < 7 && (
              <circle cx={m.X(x0 + F.period)} cy={m.Y(f(x0 + F.period))} r={5} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
            )}
            {Number.isFinite(f(-x0)) && Math.abs(f(-x0)) < 4 && <circle cx={m.X(-x0)} cy={m.Y(f(-x0))} r={5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />}
          </>
        )}
      </Plane>
      <div className="legend">
        árnyékolt sáv: egy periódus · kék pont: f(x) · narancs: f(x + p) · zöld: f(−x)
      </div>
      <div className="result">
        <M block t={`${F.tex}:\\quad \\text{periódus}=${F.periodTex},\\quad \\text{${F.parity}}`} />
      </div>
      <div className="explain">
        <p>
          f({sg(x0)}) = {v(x0)}; f({sg(x0)} + p) = {v(x0 + F.period)}; f({sg(-x0)}) = {v(-x0)}. Az első két érték megegyezik (periodicitás); a harmadik{' '}
          {F.parity === 'páros' ? 'megegyezik az elsővel' : 'az első ellentettje'} ({F.parity} függvény).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal */

const OM = [0.5, 1, 1.5, 2, 3, 4];
const OM_PERIOD: Record<number, string> = { 0.5: '4\\pi', 1: '2\\pi', 1.5: '\\dfrac{4\\pi}{3}', 2: '\\pi', 3: '\\dfrac{2\\pi}{3}', 4: '\\dfrac{\\pi}{2}' };

/** Általános szinusz- és koszinuszfüggvény: d + A·f(ω(x − c)). */
export function SineWidget() {
  const [cosine, setCosine] = useState(false);
  const [ai, setAi] = useState(SC.indexOf(2));
  const [oi, setOi] = useState(1);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const A = SC[ai];
  const w = OM[oi];
  const base = cosine ? Math.cos : Math.sin;
  const f = (x: number) => d + A * base(w * (x - c));
  const P = (2 * Math.PI) / w;
  const name = cosine ? '\\cos' : '\\sin';
  const formula = `y=${outerTex(A, `${name}\\left(${argTex(w, c)}\\right)`, d)}`;
  return (
    <div className="widget">
      <div className="widget-title">Általános szinuszgörbe: y = d + A·{cosine ? 'cos' : 'sin'}(ω(x − c))</div>
      <div className="relbuttons chips">
        <button className={!cosine ? 'on' : ''} onClick={() => setCosine(false)}>
          szinusz
        </button>
        <button className={cosine ? 'on' : ''} onClick={() => setCosine(true)}>
          koszinusz
        </button>
      </div>
      <div className="sliders">
        <label>
          A = {sg(A)} (amplitúdó, előjellel)
          <input type="range" min={0} max={SC.length - 1} step={1} value={ai} onChange={(e) => setAi(Number(e.target.value))} />
        </label>
        <label>
          ω = {sg(w)} (szögsebesség)
          <input type="range" min={0} max={OM.length - 1} step={1} value={oi} onChange={(e) => setOi(Number(e.target.value))} />
        </label>
        <label>
          c = {sg(c)} (vízszintes eltolás)
          <input type="range" min={-3} max={3} step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
        <label>
          d = {sg(d)} (középvonal)
          <input type="range" min={-2} max={2} step={0.5} value={d} onChange={(e) => setD(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-7} xmax={7} ymin={-6} ymax={6}>
        {(m) => (
          <>
            <PFunc map={m} fn={(x) => base(x)} cls="pl-ghost" />
            <rect x={m.X(c)} y={m.Y(6)} width={m.X(c + P) - m.X(c)} height={m.Y(-6) - m.Y(6)} className="pl-fill" opacity={0.3} />
            <line x1={m.X(-7)} y1={m.Y(d)} x2={m.X(7)} y2={m.Y(d)} className="pl-dash" />
            <PFunc map={m} fn={f} />
          </>
        )}
      </Plane>
      <div className="legend">szürke: az alapgörbe · kék: az átalakított · sárga szaggatott: középvonal · árnyékolt sáv: egy periódus, a c helytől</div>
      <div className="result">
        <M block t={formula} />
        <M block t={`\\text{amplitúdó}=${tex(Math.abs(A))},\\quad \\text{periódus}=${OM_PERIOD[w]},\\quad \\text{értékkészlet}=[${tex(d - Math.abs(A))};\\,${tex(d + Math.abs(A))}]`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal */

type Ident = { id: string; tex: string; two: boolean; L: (a: number, b: number) => number; R: (a: number, b: number) => number };
const IDENTS: Ident[] = [
  { id: 'pyth', tex: '\\sin^2 a+\\cos^2 a=1', two: false, L: (a) => Math.sin(a) ** 2 + Math.cos(a) ** 2, R: () => 1 },
  { id: 'ds', tex: '\\sin 2a=2\\sin a\\cos a', two: false, L: (a) => Math.sin(2 * a), R: (a) => 2 * Math.sin(a) * Math.cos(a) },
  { id: 'dc', tex: '\\cos 2a=\\cos^2 a-\\sin^2 a', two: false, L: (a) => Math.cos(2 * a), R: (a) => Math.cos(a) ** 2 - Math.sin(a) ** 2 },
  { id: 'hc', tex: '\\cos^2 a=\\dfrac{1+\\cos 2a}{2}', two: false, L: (a) => Math.cos(a) ** 2, R: (a) => (1 + Math.cos(2 * a)) / 2 },
  { id: 'hs', tex: '\\sin^2 a=\\dfrac{1-\\cos 2a}{2}', two: false, L: (a) => Math.sin(a) ** 2, R: (a) => (1 - Math.cos(2 * a)) / 2 },
  { id: 'as', tex: '\\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b', two: true, L: (a, b) => Math.sin(a + b), R: (a, b) => Math.sin(a) * Math.cos(b) + Math.cos(a) * Math.sin(b) },
  { id: 'ac', tex: '\\cos(a+b)=\\cos a\\cos b-\\sin a\\sin b', two: true, L: (a, b) => Math.cos(a + b), R: (a, b) => Math.cos(a) * Math.cos(b) - Math.sin(a) * Math.sin(b) },
];

/** Azonosságok numerikus és grafikus próbája: a két oldal értéke és görbéje. */
export function IdentityWidget() {
  const [id, setId] = useState('pyth');
  const [da, setDa] = useState(40);
  const [db, setDb] = useState(25);
  const I = IDENTS.find((q) => q.id === id)!;
  const a = da * RAD;
  const b = db * RAD;
  return (
    <div className="widget">
      <div className="widget-title">Azonosság-próba: bal oldal és jobb oldal</div>
      <div className="relbuttons chips">
        {IDENTS.map((q) => (
          <button key={q.id} className={id === q.id ? 'on' : ''} onClick={() => setId(q.id)}>
            <M t={q.tex.split('=')[0]} />
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          a = {sg(da)}°
          <input type="range" min={0} max={360} step={5} value={da} onChange={(e) => setDa(Number(e.target.value))} />
        </label>
        {I.two && (
          <label>
            b = {sg(db)}°
            <input type="range" min={0} max={360} step={5} value={db} onChange={(e) => setDb(Number(e.target.value))} />
          </label>
        )}
      </div>
      <Plane xmin={-7} xmax={7} ymin={-3} ymax={3}>
        {(m) => (
          <>
            <PFunc map={m} fn={(x) => I.L(x, b)} />
            <g strokeDasharray="9 7">
              <PFunc map={m} fn={(x) => I.R(x, b)} cls="pl-alt" />
            </g>
            <circle cx={m.X(a)} cy={m.Y(I.L(a, b))} r={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Plane>
      <div className="legend">
        <span style={{ color: '#38bdf8' }}>bal oldal</span> (folytonos) · <span style={{ color: '#fb923c' }}>jobb oldal</span> (szaggatott); az x tengelyen az a szög radiánban
        {I.two && ' (b rögzített)'}
      </div>
      <div className="result">
        <M block t={I.tex} />
      </div>
      <div className="explain">
        <p>
          Bal oldal: {r6(I.L(a, b))}. Jobb oldal: {r6(I.R(a, b))}. A különbség {Math.abs(I.L(a, b) - I.R(a, b)) < 1e-12 ? 'nulla (a kerekítési hibán belül)' : r6(I.L(a, b) - I.R(a, b))}. A két görbe minden szögnél egybeesik: ez
          különbözteti meg az azonosságot az egyenlettől.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal */

/** Koszinusztétel: háromszög két oldalból és a közbezárt szögből. */
export function CosineLawWidget() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(6);
  const [g, setG] = useState(70);
  const t = g * RAD;
  const c2 = a * a + b * b - 2 * a * b * Math.cos(t);
  const c = Math.sqrt(c2);
  const Ax = b;
  const Bx = a * Math.cos(t);
  const By = a * Math.sin(t);
  const kind = g === 90 ? 'derékszög: a koszinusztétel Pitagorasz tételévé egyszerűsödik' : g < 90 ? 'hegyesszög: c² < a² + b²' : 'tompaszög: c² > a² + b²';
  return (
    <div className="widget">
      <div className="widget-title">Koszinusztétel: c² = a² + b² − 2ab·cos γ</div>
      <div className="sliders">
        <label>
          a = {sg(a)}
          <input type="range" min={1} max={8} step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          b = {sg(b)}
          <input type="range" min={1} max={8} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          γ = {sg(g)}°
          <input type="range" min={10} max={170} step={5} value={g} onChange={(e) => setG(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-8} xmax={9} ymin={-1} ymax={9}>
        {(m) => (
          <>
            <polygon points={`${m.X(0)},${m.Y(0)} ${m.X(Ax)},${m.Y(0)} ${m.X(Bx)},${m.Y(By)}`} className="pl-fill" />
            <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(Ax)} y2={m.Y(0)} className="pl-ok" />
            <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(Bx)} y2={m.Y(By)} className="pl-alt" />
            <line x1={m.X(Ax)} y1={m.Y(0)} x2={m.X(Bx)} y2={m.Y(By)} className="pl-main" />
            <text x={m.X(Ax / 2)} y={m.Y(0) + 16} textAnchor="middle" fill="#34d399" className="pl-label">
              b
            </text>
            <text x={m.X(Bx / 2) - 12} y={m.Y(By / 2)} textAnchor="middle" fill="#fb923c" className="pl-label">
              a
            </text>
            <text x={m.X((Ax + Bx) / 2) + 12} y={m.Y(By / 2)} fill="#38bdf8" className="pl-label">
              c
            </text>
            <text x={m.X(0) + 8} y={m.Y(0) - 6} fill="#f59e0b" className="pl-label">
              γ
            </text>
          </>
        )}
      </Plane>
      <div className="legend">a és b zárják közre a γ szöget (a C csúcsban), c a szöggel szemközti oldal</div>
      <div className="result">
        <M block t={`c^2=${tex(a * a)}+${tex(b * b)}-2\\cdot${tex(a)}\\cdot${tex(b)}\\cdot\\cos${g}^\\circ\\approx${tex(Math.round(c2 * 1000) / 1000)}`} />
        <M block t={`c\\approx${tex(Math.round(c * 1000) / 1000)}`} />
      </div>
      <div className="explain">
        <p>
          a² + b² = {round(a * a + b * b, 2)}, c² = {round(c2, 2)}: {kind}.
        </p>
      </div>
    </div>
  );
}
