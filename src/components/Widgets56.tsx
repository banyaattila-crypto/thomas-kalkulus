import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: határozott helyettesítés két útja */

export function DefiniteSubCompareDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Határozott integrál helyettesítése — a két helyes út</div>
      <svg viewBox="0 0 540 195" className="plane" role="img" aria-label="Határozott integrál helyettesítés két módszere">
        <rect width={540} height={195} className="pl-bg" />

        {/* Közös indulás */}
        <rect x={140} y={10} width={260} height={36} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={270} y={33} textAnchor="middle" fill="#bae6fd" fontSize={13} fontWeight={700}>
          ∫₋₁¹ 3x²√(x³+1) dx   (u = x³+1, du = 3x² dx)
        </text>

        {/* Elágazó nyilak */}
        <line x1={210} y1={46} x2={135} y2={68} stroke="#34d399" strokeWidth={1.8} />
        <line x1={330} y1={46} x2={405} y2={68} stroke="#fbbf24" strokeWidth={1.8} />

        {/* Bal út: Határok átszámítása (ajánlott) */}
        <rect x={14} y={70} width={246} height={112} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.8} />
        <text x={137} y={90} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight={700}>
          A út: Határok átszámítása (gyorsabb!)
        </text>
        <text x={26} y={112} fill="#e2e8f0" fontSize={11.5}>• x = −1 → u = (−1)³+1 = 0</text>
        <text x={26} y={130} fill="#e2e8f0" fontSize={11.5}>• x = 1  → u = 1³+1 = 2</text>
        <text x={26} y={150} fill="#a7f3d0" fontSize={12} fontWeight={700}>∫₀² √u du = [⅔ u³ᐟ²]₀² = 4√2 / 3</text>
        <text x={26} y={170} fill="#94a3b8" fontSize={10.5}>Nem kell visszatérni x-re!</text>

        {/* Jobb út: Visszahelyettesítés x-re */}
        <rect x={280} y={70} width={246} height={112} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.8} />
        <text x={403} y={90} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>
          B út: Visszaírás x-re
        </text>
        <text x={292} y={112} fill="#e2e8f0" fontSize={11.5}>• Határozatlan: ∫ √u du = ⅔ u³ᐟ²</text>
        <text x={292} y={130} fill="#e2e8f0" fontSize={11.5}>• Vissza x-re: ⅔ (x³+1)³ᐟ²</text>
        <text x={292} y={150} fill="#fde68a" fontSize={12} fontWeight={700}>[⅔ (x³+1)³ᐟ²]₋₁¹ = 4√2 / 3</text>
        <text x={292} y={170} fill="#94a3b8" fontSize={10.5}>Eredeti x-határokat használjuk!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: szimmetria (páros vs. páratlan) */

type SymEx = {
  id: string;
  label: string;
  even: boolean;
  fn: Fn;
  yr: [number, number];
  halfIntegral: (a: number) => number;
};

const SYM_EX: SymEx[] = [
  {
    id: 'x2',
    label: 'f(x) = x² (páros)',
    even: true,
    fn: (x) => x * x,
    yr: [-0.4, 5.2],
    halfIntegral: (a) => (a * a * a) / 3,
  },
  {
    id: 'cos',
    label: 'f(x) = cos x (páros)',
    even: true,
    fn: (x) => Math.cos(x),
    yr: [-1.2, 1.3],
    halfIntegral: (a) => Math.sin(a),
  },
  {
    id: 'x3',
    label: 'f(x) = 0,5 x³ (páratlan)',
    even: false,
    fn: (x) => 0.5 * x * x * x,
    yr: [-4.5, 4.5],
    halfIntegral: (a) => (a ** 4) / 8,
  },
  {
    id: 'sin',
    label: 'f(x) = sin x (páratlan)',
    even: false,
    fn: (x) => Math.sin(x),
    yr: [-1.3, 1.3],
    halfIntegral: (a) => 1 - Math.cos(a),
  },
];

export function SymmetryIntegralWidget() {
  const [idx, setIdx] = useState(0);
  const [a, setA] = useState(1.8);
  const ex = SYM_EX[idx];
  const rightVal = ex.halfIntegral(a);
  const leftVal = ex.even ? rightVal : -rightVal;
  const total = leftVal + rightVal;

  return (
    <div className="widget">
      <div className="widget-title">Szimmetria a [−a; a] intervallumon: duplázás vagy kioltás</div>
      <div className="relbuttons chips" role="tablist" aria-label="Szimmetrikus függvények">
        {SYM_EX.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <label>
        Félintervallum hossza: <M t={`a = ${tx(a, 2)}`} /> (intervallum: <M t={`[-${tx(a, 2)};\\,${tx(a, 2)}]`} />)
        <input type="range" min={0.4} max={2.1} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.4} xmax={2.4} ymin={ex.yr[0]} ymax={ex.yr[1]} h={215}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const build = (x0: number, x1: number) => {
            const pts: string[] = [`M ${sx(x0)} ${sy(0)}`];
            const st = 50;
            for (let i = 0; i <= st; i++) {
              const x = x0 + ((x1 - x0) * i) / st;
              pts.push(`L ${sx(x)} ${sy(ex.fn(x))}`);
            }
            pts.push(`L ${sx(x1)} ${sy(0)} Z`);
            return pts.join(' ');
          };
          return (
            <>
              <path
                d={build(-a, 0)}
                fill={ex.even ? 'rgba(56,189,248,0.28)' : 'rgba(251,113,133,0.32)'}
              />
              <path d={build(0, a)} fill="rgba(52,211,153,0.30)" />
              <path d={curve(ex.fn, m, 260)} fill="none" stroke="#e2e8f0" strokeWidth={2.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Bal fél (<M t={`[-a;\\,0]`} />): <strong>{round(leftVal, 3)}</strong> · Jobb fél (<M t={`[0;\\,a]`} />):{' '}
          <strong>{round(rightVal, 3)}</strong> · Teljes integrál:{' '}
          <strong>{round(total, 3)}</strong>
        </p>
        <p>
          {ex.even
            ? 'Páros függvény (y-tengelyre szimmetrikus): a két fél egyforma, ezért elég a [0; a] integrál kétszerese!'
            : 'Páratlan függvény (origóra szimmetrikus): a két fél pontosan ellentett, ezért az integrál azonnal 0!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: két görbe közti terület (dx) */

type CurvePair = {
  id: string;
  label: string;
  a: number;
  b: number;
  xr: [number, number];
  yr: [number, number];
  top: Fn;
  bot: Fn;
  topLabel: string;
  botLabel: string;
  areaTex: string;
};

const CURVE_PAIRS: CurvePair[] = [
  {
    id: 'parlin',
    label: 'y = 2 − x² és y = −x',
    a: -1,
    b: 2,
    xr: [-1.6, 2.6],
    yr: [-2.4, 2.5],
    top: (x) => 2 - x * x,
    bot: (x) => -x,
    topLabel: '2 − x²',
    botLabel: '−x',
    areaTex: '\\int_{-1}^{2}(2 - x^2 + x)\\,dx = \\dfrac{9}{2} = 4{,}5',
  },
  {
    id: 'rootsq',
    label: 'y = √x és y = x²',
    a: 0,
    b: 1,
    xr: [-0.2, 1.3],
    yr: [-0.2, 1.25],
    top: (x) => Math.sqrt(Math.max(0, x)),
    bot: (x) => x * x,
    topLabel: '√x',
    botLabel: 'x²',
    areaTex: '\\int_{0}^{1}(\\sqrt{x} - x^2)\\,dx = \\dfrac{1}{3}',
  },
  {
    id: 'below',
    label: 'y = −x² és y = x² − 2 (tengely alatt!)',
    a: -1,
    b: 1,
    xr: [-1.5, 1.5],
    yr: [-2.4, 0.5],
    top: (x) => -(x * x),
    bot: (x) => x * x - 2,
    topLabel: '−x²',
    botLabel: 'x² − 2',
    areaTex: '\\int_{-1}^{1}(-x^2 - (x^2-2))\\,dx = \\dfrac{8}{3}',
  },
];

export function AreaBetweenCurvesWidget() {
  const [idx, setIdx] = useState(0);
  const p = CURVE_PAIRS[idx];
  const [x0, setX0] = useState((p.a + p.b) / 2);

  const selectP = (i: number) => {
    setIdx(i);
    setX0((CURVE_PAIRS[i].a + CURVE_PAIRS[i].b) / 2);
  };

  const yTop = p.top(x0);
  const yBot = p.bot(x0);
  const sliceH = yTop - yBot;

  return (
    <div className="widget">
      <div className="widget-title">Két görbe közötti terület — függőleges szelet (felső − alsó)</div>
      <div className="relbuttons chips" role="tablist" aria-label="Görbepárok">
        {CURVE_PAIRS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => selectP(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <label>
        Mintaszelet helye: <M t={`x = ${tx(x0, 2)}`} /> (magasság: <M t={`f(x)-g(x) = ${tx(sliceH, 3)}`} />)
        <input type="range" min={p.a + 0.05} max={p.b - 0.05} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={p.xr[0]} xmax={p.xr[1]} ymin={p.yr[0]} ymax={p.yr[1]} h={230}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 70;
          const pts: string[] = [];
          for (let i = 0; i <= st; i++) {
            const x = p.a + ((p.b - p.a) * i) / st;
            pts.push(`${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(p.top(x))}`);
          }
          for (let i = st; i >= 0; i--) {
            const x = p.a + ((p.b - p.a) * i) / st;
            pts.push(`L ${sx(x)} ${sy(p.bot(x))}`);
          }
          pts.push('Z');

          return (
            <>
              <path d={pts.join(' ')} fill="rgba(56,189,248,0.26)" />
              {/* Szelet */}
              <rect
                x={sx(x0) - 4}
                y={sy(yTop)}
                width={8}
                height={Math.max(1, sy(yBot) - sy(yTop))}
                fill="rgba(251,191,36,0.65)"
                stroke="#fbbf24"
                strokeWidth={1.5}
              />
              <path d={curve(p.top, m, 260)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={curve(p.bot, m, 260)} fill="none" stroke="#fb923c" strokeWidth={2.5} />
              <circle cx={sx(p.a)} cy={sy(p.top(p.a))} r={4} fill="#34d399" />
              <circle cx={sx(p.b)} cy={sy(p.top(p.b))} r={4} fill="#34d399" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <span style={{ color: '#38bdf8' }}>■</span> Felső: <strong>{p.topLabel}</strong> ·{' '}
          <span style={{ color: '#fb923c' }}>■</span> Alsó: <strong>{p.botLabel}</strong>
        </p>
        <p>
          Pontos terület: <M t={p.areaTex} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: egymást metsző görbék */

export function CrossingCurvesWidget() {
  const [which, setWhich] = useState<'cubic' | 'trig'>('cubic');

  const f: Fn = which === 'cubic' ? (x) => x * x * x : (x) => Math.sin(x);
  const g: Fn = which === 'cubic' ? (x) => x : (x) => Math.cos(x);
  const xr: [number, number] = which === 'cubic' ? [-1.3, 1.3] : [-0.1, Math.PI / 2 + 0.15];
  const yr: [number, number] = which === 'cubic' ? [-1.2, 1.2] : [-0.2, 1.2];
  const a = which === 'cubic' ? -1 : 0;
  const mid = which === 'cubic' ? 0 : Math.PI / 4;
  const b = which === 'cubic' ? 1 : Math.PI / 2;

  return (
    <div className="widget">
      <div className="widget-title">Metsző görbék — szerepcsere a metszéspontnál!</div>
      <div className="relbuttons chips">
        <button type="button" className={which === 'cubic' ? 'on' : ''} onClick={() => setWhich('cubic')}>
          y = x³ és y = x  [−1; 1]
        </button>
        <button type="button" className={which === 'trig' ? 'on' : ''} onClick={() => setWhich('trig')}>
          y = sin x és y = cos x  [0; π/2]
        </button>
      </div>

      <Chart xmin={xr[0]} xmax={xr[1]} ymin={yr[0]} ymax={yr[1]} h={220}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const buildBetween = (x0: number, x1: number) => {
            const st = 50;
            const pts: string[] = [];
            for (let i = 0; i <= st; i++) {
              const x = x0 + ((x1 - x0) * i) / st;
              pts.push(`${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(f(x))}`);
            }
            for (let i = st; i >= 0; i--) {
              const x = x0 + ((x1 - x0) * i) / st;
              pts.push(`L ${sx(x)} ${sy(g(x))}`);
            }
            pts.push('Z');
            return pts.join(' ');
          };

          return (
            <>
              <path d={buildBetween(a, mid)} fill="rgba(56,189,248,0.28)" />
              <path d={buildBetween(mid, b)} fill="rgba(52,211,153,0.28)" />
              <path d={curve(f, m, 260)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={curve(g, m, 260)} fill="none" stroke="#fb923c" strokeWidth={2.5} />
              <circle cx={sx(mid)} cy={sy(f(mid))} r={5} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        {which === 'cubic' ? (
          <p>
            <M t="[-1;\,0]" />-n <M t="x^3 \ge x" /> (<M t="A_1 = \frac{1}{4}" />), <M t="[0;\,1]" />-en{' '}
            <M t="x \ge x^3" /> (<M t="A_2 = \frac{1}{4}" />). Teljes terület: <M t="\mathbf{\frac{1}{2}}" /> (bontás nélkül <M t="0" /> jönne ki!).
          </p>
        ) : (
          <p>
            <M t="[0;\,\frac{\pi}{4}]" />-n <M t="\cos x \ge \sin x" /> (<M t="\sqrt{2}-1" />),{' '}
            <M t="[\frac{\pi}{4};\,\frac{\pi}{2}]" />-n <M t="\sin x \ge \cos x" /> (<M t="\sqrt{2}-1" />). Teljes terület:{' '}
            <M t="\mathbf{2\sqrt{2}-2}" />!
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: dy vs. dx szeletelés */

export function HorizontalVsVerticalWidget() {
  const [mode, setMode] = useState<'dy' | 'dx'>('dy');
  const [y0, setY0] = useState(0.5);

  // Tartomány: x = y² (balra) és x = y + 2 (jobbra), y in [-1, 2]
  const xLeft = y0 * y0;
  const xRight = y0 + 2;

  return (
    <div className="widget">
      <div className="widget-title">Vízszintes (dy) vs. függőleges (dx) szeletelés: x = y² és x = y + 2</div>
      <div className="relbuttons chips">
        <button type="button" className={mode === 'dy' ? 'on' : ''} onClick={() => setMode('dy')}>
          Vízszintes szeletek (dy — 1 integrál!)
        </button>
        <button type="button" className={mode === 'dx' ? 'on' : ''} onClick={() => setMode('dx')}>
          Függőleges szeletek (dx — 2 részre kell vágni!)
        </button>
      </div>

      {mode === 'dy' && (
        <label>
          Vízszintes csík magassága: <M t={`y = ${tx(y0, 2)}`} /> (szélesség: <M t={`(y+2) - y^2 = ${tx(xRight - xLeft, 2)}`} />)
          <input type="range" min={-0.9} max={1.9} step={0.1} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
        </label>
      )}

      <Chart xmin={-0.4} xmax={4.6} ymin={-1.5} ymax={2.4} h={235}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 80;
          const pts: string[] = [];
          for (let i = 0; i <= st; i++) {
            const y = -1 + (3 * i) / st;
            pts.push(`${i === 0 ? 'M' : 'L'} ${sx(y * y)} ${sy(y)}`);
          }
          pts.push(`L ${sx(4)} ${sy(2)} L ${sx(1)} ${sy(-1)} Z`);

          // Parabola x = y² paraméteres görbe y in [-1.3, 2.2]
          const parPts: string[] = [];
          for (let i = 0; i <= 80; i++) {
            const y = -1.3 + (3.5 * i) / 80;
            parPts.push(`${i === 0 ? 'M' : 'L'} ${sx(y * y)} ${sy(y)}`);
          }

          return (
            <>
              <path d={pts.join(' ')} fill="rgba(56,189,248,0.24)" />
              {mode === 'dy' ? (
                <rect
                  x={sx(xLeft)}
                  y={sy(y0) - 4}
                  width={Math.max(1, sx(xRight) - sx(xLeft))}
                  height={8}
                  fill="rgba(52,211,153,0.72)"
                  stroke="#34d399"
                  strokeWidth={1.5}
                />
              ) : (
                <>
                  {/* Függőleges vágóvonal x = 1-nél */}
                  <line x1={sx(1)} y1={sy(-1.3)} x2={sx(1)} y2={sy(2.2)} stroke="#fb7185" strokeWidth={2} strokeDasharray="5 3" />
                  <rect x={sx(0.45) - 3} y={sy(Math.sqrt(0.45))} width={6} height={sy(-Math.sqrt(0.45)) - sy(Math.sqrt(0.45))} fill="rgba(251,191,36,0.6)" />
                  <rect x={sx(2.4) - 3} y={sy(Math.sqrt(2.4))} width={6} height={sy(0.4) - sy(Math.sqrt(2.4))} fill="rgba(251,113,133,0.6)" />
                  <text x={sx(1.08)} y={sy(-1.25)} fill="#fecdd3" fontSize={11} fontWeight={700}>x = 1 (vágás!)</text>
                </>
              )}
              <path d={parPts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <line x1={sx(0.5)} y1={sy(-1.5)} x2={sx(4.4)} y2={sy(2.4)} stroke="#fb923c" strokeWidth={2.5} />
              <circle cx={sx(1)} cy={sy(-1)} r={4} fill="#fbbf24" />
              <circle cx={sx(4)} cy={sy(2)} r={4} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        {mode === 'dy' ? (
          <p>
            <strong>Egyetlen tiszta integrál:</strong> <M t="A = \displaystyle\int_{-1}^{2}\bigl((y+2) - y^2\bigr)\,dy = \mathbf{\dfrac{9}{2}}" /> (mindig az egyenes van jobbra, a parabola balra!).
          </p>
        ) : (
          <p>
            <strong>Két darabra kell vágni <M t="x=1" />-nél:</strong> <M t="\int_0^1 2\sqrt{x}\,dx + \int_1^4(\sqrt{x}-(x-2))\,dx = \frac{4}{3}+\frac{19}{6} = \frac{9}{2}" /> — sokkal macerásabb!
          </p>
        )}
      </div>
    </div>
  );
}
