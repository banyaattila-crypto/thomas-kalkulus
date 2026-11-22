import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;

const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: hatvány- és konstansszoros-szabály */

export function PowerScaleWidget() {
  const [n, setN] = useState(2);
  const [c, setC] = useState(2);
  const [x0, setX0] = useState(1);

  const base: Fn = (x) => Math.pow(x, n);
  const scaled: Fn = (x) => c * Math.pow(x, n);
  const dBase = n === 0 ? 0 : n * Math.pow(x0, n - 1);
  const dScaled = c * dBase;

  const yBase = base(x0);
  const yScaled = scaled(x0);
  const tanBase: Fn = (x) => yBase + dBase * (x - x0);
  const tanScaled: Fn = (x) => yScaled + dScaled * (x - x0);

  const fTex = n === 0 ? `${tx(c, 1)}` : n === 1 ? `${tx(c, 1)}x` : `${tx(c, 1)}x^{${n}}`;
  const dfTex = n === 0 ? '0' : n === 1 ? `${tx(c, 1)}` : n === 2 ? `${tx(c * 2, 1)}x` : `${tx(c * n, 1)}x^{${n - 1}}`;

  return (
    <div className="widget">
      <div className="widget-title">Hatványszabály és konstansszoros geometriai jelentése</div>
      <div className="relbuttons chips">
        {[0, 1, 2, 3].map((k) => (
          <button key={k} className={n === k ? 'on' : ''} onClick={() => setN(k)}>
            n = {k} ({k === 0 ? 'konstans' : k === 1 ? 'x' : `x^${k}`})
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          szorzó: c = {round(c, 1)}
          <input type="range" min={-3} max={3} step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
        <label>
          érintési pont: x₀ = {round(x0, 1)}
          <input type="range" min={-1.6} max={1.6} step={0.2} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
        </label>
      </div>
      <Chart xmin={-2.5} xmax={2.5} ymin={-6} ymax={6} h={250}>
        {(m) => (
          <>
            <path d={curve(base, m, 300)} className="pl-dash2" />
            <path d={curve(tanBase, m, 60)} className="pl-ok" strokeDasharray="4 4" />
            <path d={curve(tanScaled, m, 60)} className="pl-alt" />
            <path d={curve(scaled, m, 300)} className="pl-main" />
            <circle cx={m.X(x0)} cy={m.Y(yBase)} r={4.5} fill="#34d399" />
            <circle cx={m.X(x0)} cy={m.Y(yScaled)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <p className="legend">Szaggatott fehér: y = xⁿ (zöld érintő). Kék: y = c·xⁿ (narancs érintő).</p>
      <div className="result">
        <M block t={`\\frac{d}{dx}\\left(${fTex}\\right) = ${dfTex},\\qquad x_0=${tx(x0, 1)}:\\; m_{\\text{alap}}=${tx(dBase, 2)},\\; m_{\\text{nyújtott}}=${tx(c, 1)}\\cdot ${tx(dBase, 2)}=${tx(dScaled, 2)}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: vízszintes érintők (f'(x) = 0) */

type HzEx = {
  id: string;
  name: string;
  fTex: string;
  dfTex: string;
  f: Fn;
  df: Fn;
  roots: number[];
  xr: [number, number];
  yr1: [number, number];
  yr2: [number, number];
};

const HZ_EX: HzEx[] = [
  {
    id: 'w4',
    name: 'x⁴ − 2x² + 2',
    fTex: 'f(x)=x^4-2x^2+2',
    dfTex: "f'(x)=4x^3-4x=4x(x-1)(x+1)",
    f: (x) => x ** 4 - 2 * x * x + 2,
    df: (x) => 4 * x ** 3 - 4 * x,
    roots: [-1, 0, 1],
    xr: [-2, 2],
    yr1: [0, 5],
    yr2: [-5, 5],
  },
  {
    id: 'c3',
    name: 'x³ − 3x + 1',
    fTex: 'f(x)=x^3-3x+1',
    dfTex: "f'(x)=3x^2-3=3(x-1)(x+1)",
    f: (x) => x ** 3 - 3 * x + 1,
    df: (x) => 3 * x * x - 3,
    roots: [-1, 1],
    xr: [-2.4, 2.4],
    yr1: [-3, 5],
    yr2: [-5, 8],
  },
];

export function HorizTangentWidget() {
  const [hi, setHi] = useState(0);
  const [x0, setX0] = useState(1);
  const ex = HZ_EX[hi];
  const y0 = ex.f(x0);
  const m0 = ex.df(x0);
  const tan: Fn = (x) => y0 + m0 * (x - x0);

  return (
    <div className="widget">
      <div className="widget-title">Vízszintes érintők: ahol f&apos;(x) = 0</div>
      <div className="relbuttons chips">
        {HZ_EX.map((q, i) => (
          <button key={q.id} className={hi === i ? 'on' : ''} onClick={() => setHi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <label>
        próbapont: x₀ = {round(x0, 2)} (meredekség: f&apos;(x₀) = {round(m0, 2)})
        <input type="range" min={ex.xr[0] + 0.3} max={ex.xr[1] - 0.3} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <div className="mini">
        Felső ábra: <M t={ex.fTex} /> (zöld szaggatott: a vízszintes érintők)
      </div>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr1[0]} ymax={ex.yr1[1]} h={185}>
        {(m) => (
          <>
            {ex.roots.map((r) => (
              <g key={r}>
                <line x1={m.X(r - 0.55)} y1={m.Y(ex.f(r))} x2={m.X(r + 0.55)} y2={m.Y(ex.f(r))} className="pl-ok" strokeDasharray="5 4" />
                <circle cx={m.X(r)} cy={m.Y(ex.f(r))} r={4.5} fill="#34d399" />
              </g>
            ))}
            <path d={curve(tan, m, 60)} className="pl-alt" />
            <path d={curve(ex.f, m, 400)} className="pl-main" />
            <circle cx={m.X(x0)} cy={m.Y(y0)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="mini">
        Alsó ábra: <M t={ex.dfTex} />
      </div>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr2[0]} ymax={ex.yr2[1]} h={160}>
        {(m) => (
          <>
            <path d={curve(ex.df, m, 400)} className="pl-ok" />
            {ex.roots.map((r) => (
              <circle key={r} cx={m.X(r)} cy={m.Y(0)} r={5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
            ))}
            <circle cx={m.X(x0)} cy={m.Y(m0)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: szorzatszabály téglalap-ábra */

export function ProductAreaWidget() {
  const [h, setH] = useState(0.7);
  // u = 4, v = 3 alap téglalap; u' = 1.5, v' = 1.2 → du = 1.5*h, dv = 1.2*h
  const u = 4;
  const v = 3;
  const du = 1.6 * h;
  const dv = 1.2 * h;
  const sc = 42;
  const ox = 60;
  const oy = 215;

  const uPx = u * sc;
  const vPx = v * sc;
  const duPx = du * sc;
  const dvPx = dv * sc;

  const stripU = u * dv; // u * dv
  const stripV = v * du; // v * du
  const corner = du * dv; // du * dv
  const totalRate = (stripU + stripV + corner) / h;
  const exactRate = u * 1.2 + v * 1.6;

  return (
    <div className="widget">
      <div className="widget-title">Miért (uv)&apos; = uv&apos; + vu&apos;? A növekvő téglalap bizonyítása</div>
      <label>
        lépésköz: h = {round(h, 2)} (kicsinyítsd 0 felé, és figyeld a narancs sarkot!)
        <input type="range" min={0.05} max={1.0} step={0.05} value={h} onChange={(e) => setH(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 420 250" className="plane" role="img" aria-label="Szorzatszabály téglalap területe">
        <rect width={420} height={250} className="pl-bg" />
        {/* Alap téglalap u * v */}
        <rect x={ox} y={oy - vPx} width={uPx} height={vPx} fill="rgba(148, 163, 184, 0.2)" stroke="#94a3b8" strokeWidth={1.8} />
        <text x={ox + uPx / 2} y={oy - vPx / 2 + 5} textAnchor="middle" fill="#e2e8f0" className="pl-label">
          u · v
        </text>
        {/* Felső csík: u * dv */}
        <rect x={ox} y={oy - vPx - dvPx} width={uPx} height={dvPx} fill="rgba(56, 189, 248, 0.32)" stroke="#38bdf8" strokeWidth={1.8} />
        {dvPx > 14 && (
          <text x={ox + uPx / 2} y={oy - vPx - dvPx / 2 + 4} textAnchor="middle" fill="#7dd3fc" className="pl-label">
            u · Δv
          </text>
        )}
        {/* Jobb csík: v * du */}
        <rect x={ox + uPx} y={oy - vPx} width={duPx} height={vPx} fill="rgba(52, 211, 153, 0.3)" stroke="#34d399" strokeWidth={1.8} />
        {duPx > 22 && (
          <text x={ox + uPx + duPx / 2} y={oy - vPx / 2 + 5} textAnchor="middle" fill="#6ee7b7" className="pl-label">
            v · Δu
          </text>
        )}
        {/* Saroknégyzet: du * dv */}
        <rect x={ox + uPx} y={oy - vPx - dvPx} width={duPx} height={dvPx} fill="rgba(251, 146, 60, 0.45)" stroke="#fb923c" strokeWidth={1.8} />
        {duPx > 28 && dvPx > 14 && (
          <text x={ox + uPx + duPx / 2} y={oy - vPx - dvPx / 2 + 4} textAnchor="middle" fill="#fed7aa" className="pl-label">
            Δu·Δv
          </text>
        )}
        {/* Oldalfeliratok */}
        <text x={ox + uPx / 2} y={oy + 18} textAnchor="middle" fill="#cbd5e1" className="pl-label">
          u
        </text>
        <text x={ox + uPx + duPx / 2} y={oy + 18} textAnchor="middle" fill="#34d399" className="pl-label">
          Δu
        </text>
        <text x={ox - 16} y={oy - vPx / 2 + 4} textAnchor="end" fill="#cbd5e1" className="pl-label">
          v
        </text>
        <text x={ox - 16} y={oy - vPx - dvPx / 2 + 4} textAnchor="end" fill="#38bdf8" className="pl-label">
          Δv
        </text>
      </svg>
      <div className="result">
        <M block t={`\\frac{\\Delta(uv)}{h} = \\underbrace{u\\frac{\\Delta v}{h}}_{${tx(stripU / h, 2)}} + \\underbrace{v\\frac{\\Delta u}{h}}_{${tx(stripV / h, 2)}} + \\underbrace{\\frac{\\Delta u\\cdot\\Delta v}{h}}_{${tx(corner / h, 3)}} = ${tx(totalRate, 3)} \\;\\xrightarrow{h\\to 0}\\; ${tx(exactRate, 2)}`} />
        <p>
          A narancs sarok területe <strong>h²-tel arányos</strong>, ezért h-val osztva még marad benne egy h tényező, amely <M t="h\to 0" />-ra eltűnik! A két színes csík adja pontosan az <M t="uv'+vu'" /> képletet.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: hányadosszabály vizuális séma */

export function QuotientSchemaDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A hányadosszabály szerkezete (színkódolt emlékeztető)</div>
      <svg viewBox="0 0 520 150" className="plane" role="img" aria-label="Hányadosszabály vizuális sémája">
        <rect width={520} height={150} className="pl-bg" />
        {/* Bal oldal: (u / v)' */}
        <rect x={16} y={32} width={66} height={32} rx={8} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={49} y={53} textAnchor="middle" fill="#7dd3fc" className="pl-label">u (fent)</text>
        <line x1={16} y1={74} x2={82} y2={74} stroke="#cbd5e1" strokeWidth={2} />
        <rect x={16} y={84} width={66} height={32} rx={8} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={1.6} />
        <text x={49} y={105} textAnchor="middle" fill="#6ee7b7" className="pl-label">v (lent)</text>
        <text x={96} y={50} fill="#fbbf24" fontSize={22} fontWeight={700}>′</text>
        <text x={118} y={80} fill="#e2e8f0" fontSize={22} fontWeight={700}>=</text>

        {/* Jobb oldal számláló */}
        <rect x={148} y={24} width={150} height={38} rx={10} fill="rgba(52,211,153,0.16)" stroke="#34d399" strokeWidth={1.6} />
        <text x={223} y={48} textAnchor="middle" fill="#e2e8f0" className="pl-label">lent · (fent)′</text>

        <text x={316} y={51} textAnchor="middle" fill="#f87171" fontSize={26} fontWeight={800}>−</text>

        <rect x={334} y={24} width={166} height={38} rx={10} fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={417} y={48} textAnchor="middle" fill="#e2e8f0" className="pl-label">fent · (lent)′</text>

        {/* Törtvonal */}
        <line x1={148} y1={76} x2={500} y2={76} stroke="#cbd5e1" strokeWidth={2.2} />

        {/* Jobb oldal nevező */}
        <rect x={250} y={88} width={148} height={38} rx={10} fill="rgba(251,146,60,0.18)" stroke="#fb923c" strokeWidth={1.6} />
        <text x={324} y={112} textAnchor="middle" fill="#fed7aa" className="pl-label">(lent)²</text>
      </svg>
      <p className="legend">
        A piros <strong>mínuszjel</strong> miatt a sorrend kötött: mindig a <em>nevező × számláló deriváltja</em> áll elöl!
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: okos szabályválasztás */

type ChoiceEx = {
  id: string;
  name: string;
  expr: string;
  hard: string;
  smart: string;
  tip: string;
};

const CHOICE_EX: ChoiceEx[] = [
  {
    id: 'c1',
    name: '5 / x³',
    expr: 'y=\\dfrac{5}{x^3}',
    hard: '\\text{Hányadosszabály: }\\dfrac{x^3\\cdot 0 - 5\\cdot 3x^2}{(x^3)^2}=\\dfrac{-15x^2}{x^6}=-\\dfrac{15}{x^4}',
    smart: '\\text{Átírás: }y=5x^{-3}\\;\\Longrightarrow\\; y\'=5(-3)x^{-4}=-\\dfrac{15}{x^4}',
    tip: 'Ha a számláló konstans és a nevező egyetlen hatvány, NE használj hányadosszabályt — írd át negatív kitevőre!',
  },
  {
    id: 'c2',
    name: '(x − 1)(x² − 2x) / x⁴',
    expr: 'y=\\dfrac{(x-1)(x^2-2x)}{x^4}',
    hard: '\\text{Hányados + szorzat együtt: hosszú, sok hibalehetőség!}',
    smart: 'y=\\dfrac{x^3-3x^2+2x}{x^4}=x^{-1}-3x^{-2}+2x^{-3}\\;\\Longrightarrow\\; y\'=-x^{-2}+6x^{-3}-6x^{-4}',
    tip: 'Ha a nevező egyetlen x-hatvány, bontsd fel a számlálót és ossz tagonként!',
  },
  {
    id: 'c3',
    name: '(2x + 1) / (x² + 3)',
    expr: 'y=\\dfrac{2x+1}{x^2+3}',
    hard: '\\text{Nem bontható szét egyszerű x-hatványokra!}',
    smart: 'y\'=\\dfrac{(x^2+3)\\cdot 2 - (2x+1)\\cdot 2x}{(x^2+3)^2}=\\dfrac{-2x^2-2x+6}{(x^2+3)^2}',
    tip: 'Itt a nevező összeg (x² + 3), ezért valóban a hányadosszabály a legjobb út.',
  },
];

export function RuleChoiceWidget() {
  const [ci, setCi] = useState(1);
  const ex = CHOICE_EX[ci];

  return (
    <div className="widget">
      <div className="widget-title">Melyik módszer a gyorsabb? Hasonlítsd össze!</div>
      <div className="relbuttons chips">
        {CHOICE_EX.map((q, i) => (
          <button key={q.id} className={ci === i ? 'on' : ''} onClick={() => setCi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <div className="result">
        <M block t={ex.expr} />
        <p>
          <strong>Nehézkes út:</strong>
        </p>
        <M block t={ex.hard} />
        <p>
          <strong>Ajánlott út:</strong>
        </p>
        <M block t={ex.smart} />
        <p>{ex.tip}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal: magasabbrendű deriváltak */

type HighEx = {
  id: string;
  name: string;
  f: Fn;
  f1: Fn;
  f2: Fn;
  chain: string[];
  xr: [number, number];
  yr: [number, number];
  note: string;
};

const HIGH_EX: HighEx[] = [
  {
    id: 'cub',
    name: 'x³ − 3x² + 2',
    f: (x) => x ** 3 - 3 * x * x + 2,
    f1: (x) => 3 * x * x - 6 * x,
    f2: (x) => 6 * x - 6,
    chain: ['f(x) = x^3 - 3x^2 + 2', "f'(x) = 3x^2 - 6x", "f''(x) = 6x - 6", "f'''(x) = 6", 'f^{(4)}(x) = 0'],
    xr: [-1.5, 3.5],
    yr: [-6, 8],
    note: 'Egy harmadfokú polinom 4. deriváltja már azonosan 0. Figyeld meg: ahol f″(x) < 0 (x < 1), ott f lefelé hajlik; ahol f″(x) > 0 (x > 1), ott felfelé!',
  },
  {
    id: 'quart',
    name: '¼x⁴ − 2x²',
    f: (x) => 0.25 * x ** 4 - 2 * x * x,
    f1: (x) => x ** 3 - 4 * x,
    f2: (x) => 3 * x * x - 4,
    chain: ['f(x) = \\tfrac{1}{4}x^4 - 2x^2', "f'(x) = x^3 - 4x", "f''(x) = 3x^2 - 4", "f'''(x) = 6x", 'f^{(4)}(x) = 6,\\; f^{(5)}(x)=0'],
    xr: [-3, 3],
    yr: [-6, 8],
    note: 'Ahol f′(x) = 0 és f″(x) > 0 (x = ±2), ott völgy (minimum) van; ahol f′(x) = 0 és f″(x) < 0 (x = 0), ott hegycsúcs (maximum)!',
  },
];

export function HigherDerivWidget() {
  const [hi, setHi] = useState(0);
  const [x0, setX0] = useState(1);
  const ex = HIGH_EX[hi];

  return (
    <div className="widget">
      <div className="widget-title">A deriváltak létrája: f, f&apos; és f&quot; egyszerre</div>
      <div className="relbuttons chips">
        {HIGH_EX.map((q, i) => (
          <button key={q.id} className={hi === i ? 'on' : ''} onClick={() => setHi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <label>
        vizsgált pont: x₀ = {round(x0, 2)}
        <input type="range" min={ex.xr[0] + 0.3} max={ex.xr[1] - 0.3} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={260}>
        {(m) => (
          <>
            <line x1={m.X(x0)} y1={0} x2={m.X(x0)} y2={m.h} className="pl-dash2" />
            <path d={curve(ex.f, m, 400)} className="pl-main" />
            <path d={curve(ex.f1, m, 400)} className="pl-ok" />
            <path d={curve(ex.f2, m, 400)} className="pl-alt" strokeDasharray="6 4" />
            <circle cx={m.X(x0)} cy={m.Y(ex.f(x0))} r={5} fill="#38bdf8" />
            <circle cx={m.X(x0)} cy={m.Y(ex.f1(x0))} r={5} fill="#34d399" />
            <circle cx={m.X(x0)} cy={m.Y(ex.f2(x0))} r={5} fill="#fb923c" />
          </>
        )}
      </Chart>
      <p className="legend">Kék: f(x). Zöld: f′(x) (meredekség). Narancs szaggatott: f″(x) (a meredekség változási üteme).</p>
      <div className="result">
        <p>
          <strong>x₀ = {round(x0, 2)}:</strong> f = {round(ex.f(x0), 2)}, f&apos; = {round(ex.f1(x0), 2)}, f&quot; = {round(ex.f2(x0), 2)}
        </p>
        <M block t={ex.chain.join(' \\;\\longrightarrow\\; ')} />
        <p>{ex.note}</p>
      </div>
    </div>
  );
}
