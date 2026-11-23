import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

function buildPath(
  fn: (x: number) => number,
  xmin: number,
  xmax: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
  steps = 160,
) {
  let d = '';
  let pen = false;
  for (let i = 0; i <= steps; i++) {
    const x = xmin + ((xmax - xmin) * i) / steps;
    const y = fn(x);
    if (!Number.isFinite(y)) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
    pen = true;
  }
  return d;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Integrálási eszköztár térkép */

export function IntegralToolkitOverviewDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 8.1-es szakasz térképe: 7 algebrai trükk → 22 + 2 alapintegrál!</div>
      <svg viewBox="0 0 560 198" className="plane" role="img" aria-label="Hét integrálási átalakítás és az alapintegrálok kapcsolata">
        <rect width={560} height={198} className="pl-bg" />

        {/* Bal oszlop: 7 trükk */}
        <text x={140} y={20} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>7 átalakítási technika</text>
        {[
          '1. u-helyettesítés (belső derivált)',
          '2. Teljes négyzetté alakítás',
          '3. Trigonometrikus azonosságok',
          '4. Gyökjel eltüntetése (√u² = |u|)',
          '5. Maradékos polinomosztás',
          '6. Tört szétbontása (számlálóban!)',
          '7. Szorzás ügyes 1-gyel (konjugált / sec)',
        ].map((txt, i) => (
          <g key={i}>
            <rect x={12} y={28 + i * 23} width={256} height={19} rx={4} fill="#0f172a" stroke="#334155" />
            <text x={20} y={41 + i * 23} fill="#e2e8f0" fontSize={10.5}>{txt}</text>
          </g>
        ))}

        {/* Középső nyíl */}
        <line x1={276} y1={108} x2={316} y2={108} stroke="#34d399" strokeWidth={2.6} />
        <polygon points="322,108 312,102 312,114" fill="#34d399" />

        {/* Jobb oszlop: 5 alapintegrál család */}
        <text x={436} y={20} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>Alapintegrál-családok (8.1. tábl.)</text>
        {[
          { t: 'Hatvány & Logaritmus', s: 'uⁿ,  1/u → ln|u|', c: '#38bdf8' },
          { t: 'Exponenciális', s: 'eᵘ,  aᵘ → aᵘ/ln a', c: '#34d399' },
          { t: 'Trigonometrikus (+ sec, csc!)', s: 'sin, cos, tg, ctg, sec, csc', c: '#fbbf24' },
          { t: 'Hiperbolikus', s: 'sh, ch, sech², csch²', c: '#a78bfa' },
          { t: 'Inverz trig. & hiperbolikus', s: 'arcsin, arctg, arcsec, arsh, arch', c: '#f472b6' },
        ].map((g, i) => (
          <g key={i}>
            <rect x={328} y={30 + i * 32} width={220} height={27} rx={6} fill="#0f172a" stroke={g.c} strokeWidth={1.4} />
            <text x={338} y={42 + i * 32} fill={g.c} fontSize={10} fontWeight={700}>{g.t}</text>
            <text x={338} y={53 + i * 32} fill="#cbd5e1" fontSize={9.5}>{g.s}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Teljes négyzet: 1 / √(bx - x^2) */

export function CompleteSquareVisualWidget() {
  const [b, setB] = useState(8);
  const a = b / 2;

  return (
    <div className="widget">
      <div className="widget-title">Teljes négyzet: bx − x² = a² − (x − a)² (Thomas 2. példa: b = 8 ⇒ 16 − (x − 4)²)</div>
      <label>
        Paraméter: <M t={`b = ${b}`} /> (<M t={`a = b/2 = ${tx(a, 1)}`} />) ⇒{' '}
        <M t={`${b}x - x^2 = ${tx(a * a, 1)} - (x - ${tx(a, 1)})^2`} />
        <input type="range" min={2} max={10} step={2} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.5} xmax={10.5} ymin={-0.2} ymax={3.2} h={195}>
        {(m) => {
          const dCurve = buildPath(
            (x) => (x > 0.08 && x < b - 0.08 ? 1 / Math.sqrt(b * x - x * x) : Number.NaN),
            0.05,
            b - 0.05,
            m.X,
            m.Y,
            180,
          );
          return (
            <>
              <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(0)} y2={m.Y(3.2)} stroke="#f87171" strokeWidth={1.4} strokeDasharray="5 4" />
              <line x1={m.X(b)} y1={m.Y(0)} x2={m.X(b)} y2={m.Y(3.2)} stroke="#f87171" strokeWidth={1.4} strokeDasharray="5 4" />
              <line x1={m.X(a)} y1={m.Y(0)} x2={m.X(a)} y2={m.Y(1 / a)} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 3" />
              <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <circle cx={m.X(a)} cy={m.Y(1 / a)} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Primitív függvény: <M t={`\\int\\dfrac{dx}{\\sqrt{${b}x - x^2}} = \\arcsin\\!\\left(\\dfrac{x - ${tx(a, 1)}}{${tx(a, 1)}}\\right) + C`} />.
          (Érdekesség: a teljes <M t={`(0;\\,${b})`} /> alatti terület <strong>minden <M t="b > 0" />-ra pontosan <M t="\pi" /></strong>!)
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): √(1 + cos 2x) = √2 |cos x| */

export function SqrtAbsSignWidget() {
  const [b, setB] = useState(Math.PI);
  // Helyes: ∫_0^b √2 |cos x| dx
  const correctArea =
    b <= Math.PI / 2
      ? Math.SQRT2 * Math.sin(b)
      : Math.SQRT2 * (1 + (1 - Math.sin(b)));
  // Hibás (abszolútérték nélkül): ∫_0^b √2 cos x dx = √2 sin b
  const wrongArea = Math.SQRT2 * Math.sin(b);

  return (
    <div className="widget">
      <div className="widget-title">A gyökjel-csapda: √(1 + cos 2x) = √2·|cos x| — miért végzetes elhagyni az abszolútértéket?</div>
      <label>
        Felső határ: <M t={`b = ${tx(b, 2)}\\text{ rad}`} /> (húzd át <M t="\pi/2 \approx 1{,}57" /> fölé!)
        <input type="range" min={0.2} max={Math.PI} step={0.05} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.15} xmax={3.35} ymin={-1.6} ymax={1.7} h={200}>
        {(m) => {
          const dAbs = buildPath((x) => Math.SQRT2 * Math.abs(Math.cos(x)), 0, Math.PI, m.X, m.Y, 160);
          const dNoAbs = buildPath((x) => Math.SQRT2 * Math.cos(x), 0, Math.PI, m.X, m.Y, 160);
          let poly = `M ${m.X(0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 70; i++) {
            const x = (b * i) / 70;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(Math.SQRT2 * Math.abs(Math.cos(x))).toFixed(1)} `;
          }
          poly += `L ${m.X(b).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={poly} fill="rgba(56,189,248,0.30)" stroke="#38bdf8" strokeWidth={1.3} />
              <path d={dNoAbs} fill="none" stroke="#f87171" strokeWidth={1.8} strokeDasharray="5 4" />
              <path d={dAbs} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <line x1={m.X(Math.PI / 2)} y1={m.Y(-1.6)} x2={m.X(Math.PI / 2)} y2={m.Y(1.7)} stroke="#fbbf24" strokeWidth={1.3} strokeDasharray="3 3" />
              <circle cx={m.X(b)} cy={m.Y(Math.SQRT2 * Math.abs(Math.cos(b)))} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <span style={{ color: '#7dd3fc', fontWeight: 700 }}>Helyes (|cos x|-szel): {round(correctArea, 3)}</span> ·{' '}
          <span style={{ color: '#fca5a5', fontWeight: 700 }}>Hibás (|·| nélkül): {round(wrongArea, 3)}</span>
          {b > Math.PI / 2 + 0.05 && ' — Látod? π/2 után a piros görbe negatívba megy és kivonja a területet!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Polinomosztás vizuálisan */

export function PolyDivVisualWidget() {
  const [x0, setX0] = useState(3.0);
  const f = (x: number) => (3 * x * x - 7 * x) / (3 * x + 2);
  const q = (x: number) => x - 3;
  const r = (x: number) => 6 / (3 * x + 2);

  return (
    <div className="widget">
      <div className="widget-title">Polinomosztás vizuálisan: (3x² − 7x)/(3x + 2) = (x − 3) + 6/(3x + 2) (Thomas 5. példa)</div>
      <label>
        Pont (<M t="x > 0" />): <M t={`x_0 = ${tx(x0, 2)}`} /> ⇒ teljes: <M t={tx(f(x0), 3)} /> = egyenes:{' '}
        <M t={tx(q(x0), 2)} /> + maradék: <M t={tx(r(x0), 3)} />
        <input type="range" min={0.4} max={7.0} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={7.5} ymin={-3.5} ymax={5.2} h={200}>
        {(m) => (
          <>
            <path d={buildPath(q, 0, 7.5, m.X, m.Y, 60)} fill="none" stroke="#fbbf24" strokeWidth={2} strokeDasharray="6 4" />
            <path d={buildPath(r, 0.1, 7.5, m.X, m.Y, 120)} fill="none" stroke="#34d399" strokeWidth={1.9} />
            <path d={buildPath(f, 0.1, 7.5, m.X, m.Y, 140)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
            <line x1={m.X(x0)} y1={m.Y(q(x0))} x2={m.X(x0)} y2={m.Y(f(x0))} stroke="#f472b6" strokeWidth={2.2} />
            <circle cx={m.X(x0)} cy={m.Y(f(x0))} r={4.8} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.3} />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék:</strong> eredeti tört · <strong>Sárga:</strong> <M t="x - 3" /> (polinom, triviális integrálni!) ·{' '}
          <strong>Zöld:</strong> <M t="\frac{6}{3x+2}" /> (maradék, azonnal <M t="2\ln|3x+2|" />!).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Tört szétbontása diagram */

export function SplitFractionDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Tört szétbontása: egyetlen integrálból két barátságos alapintegrál!</div>
      <svg viewBox="0 0 560 152" className="plane" role="img" aria-label="Tört szétbontása két alapintegrálra">
        <rect width={560} height={152} className="pl-bg" />

        {/* Bal doboz */}
        <rect x={14} y={48} width={150} height={54} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.8} />
        <text x={89} y={71} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>∫ (3x + 2) / √(1 − x²) dx</text>
        <text x={89} y={90} textAnchor="middle" fill="#94a3b8" fontSize={10}>(számláló = x-es + konstans)</text>

        {/* Nyilak */}
        <line x1={164} y1={64} x2={212} y2={40} stroke="#38bdf8" strokeWidth={2} />
        <line x1={164} y1={86} x2={212} y2={110} stroke="#34d399" strokeWidth={2} />

        {/* Felső ág */}
        <rect x={216} y={14} width={330} height={54} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={230} y={35} fill="#38bdf8" fontSize={11.5} fontWeight={700}>1. ág (x-es tag → u = 1 − x² helyettesítés!):</text>
        <text x={230} y={56} fill="#e2e8f0" fontSize={12}>3 ∫ x / √(1 − x²) dx  =  −3√(1 − x²)</text>

        {/* Alsó ág */}
        <rect x={216} y={84} width={330} height={54} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={230} y={105} fill="#34d399" fontSize={11.5} fontWeight={700}>2. ág (konstans tag → közvetlen alapintegrál!):</text>
        <text x={230} y={126} fill="#e2e8f0" fontSize={12}>2 ∫ 1 / √(1 − x²) dx  =  2 arcsin x</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): ∫ sec x dx terület */

export function SecantAreaWidget() {
  const [b, setB] = useState(Math.PI / 4);
  const val = Math.log(1 / Math.cos(b) + Math.tan(b));

  return (
    <div className="widget">
      <div className="widget-title">A szekáns görbe alatti terület: ∫₀ᵇ sec x dx = ln(sec b + tg b)</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(b - Math.PI / 6) < 0.02 ? 'on' : ''} onClick={() => setB(Math.PI / 6)}>b = π/6</button>
        <button type="button" className={Math.abs(b - Math.PI / 4) < 0.02 ? 'on' : ''} onClick={() => setB(Math.PI / 4)}>b = π/4 (ln(√2+1))</button>
        <button type="button" className={Math.abs(b - Math.PI / 3) < 0.02 ? 'on' : ''} onClick={() => setB(Math.PI / 3)}>b = π/3 (ln(2+√3))</button>
      </div>

      <label>
        Felső határ: <M t={`b = ${tx(b, 3)}`} /> ⇒ terület: <M t={`\\ln(\\sec b + \\operatorname{tg} b) = \\mathbf{${tx(val, 3)}}`} />
        <input type="range" min={0.1} max={1.38} step={0.02} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.15} xmax={1.75} ymin={0} ymax={5.5} h={195}>
        {(m) => {
          const dSec = buildPath((x) => 1 / Math.cos(x), 0, 1.4, m.X, m.Y, 130);
          let poly = `M ${m.X(0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 50; i++) {
            const x = (b * i) / 50;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(Math.min(5.6, 1 / Math.cos(x))).toFixed(1)} `;
          }
          poly += `L ${m.X(b).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <line x1={m.X(Math.PI / 2)} y1={m.Y(0)} x2={m.X(Math.PI / 2)} y2={m.Y(5.5)} stroke="#f87171" strokeWidth={1.6} strokeDasharray="5 4" />
              <path d={poly} fill="rgba(52,211,153,0.34)" stroke="#34d399" strokeWidth={1.5} />
              <path d={dSec} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <circle cx={m.X(b)} cy={m.Y(Math.min(5.5, 1 / Math.cos(b)))} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (7. ábra): 1-gyel való szorzás puskakártya */

export function MultiplyByOneCheatDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 3 legfontosabb „szorzás 1-gyel” mestertrükk</div>
      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Három 1-gyel való szorzási minta integráláshoz">
        <rect width={560} height={132} className="pl-bg" />

        <rect x={10} y={14} width={174} height={104} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={97} y={36} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>1. ∫ sec x dx</text>
        <text x={97} y={62} textAnchor="middle" fill="#fde68a" fontSize={11}>× (sec x + tg x)/(sec x + tg x)</text>
        <text x={97} y={92} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>ln|sec x + tg x| + C</text>

        <rect x={193} y={14} width={174} height={104} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={280} y={36} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>2. ∫ dx / (1 + sin x)</text>
        <text x={280} y={62} textAnchor="middle" fill="#fde68a" fontSize={11}>× (1 − sin x)/(1 − sin x)</text>
        <text x={280} y={92} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>tg x − sec x + C</text>

        <rect x={376} y={14} width={174} height={104} rx={8} fill="#0f172a" stroke="#f472b6" strokeWidth={1.6} />
        <text x={463} y={36} textAnchor="middle" fill="#f472b6" fontSize={11.5} fontWeight={700}>3. ∫ dx / (eˣ + e⁻ˣ)</text>
        <text x={463} y={62} textAnchor="middle" fill="#fde68a" fontSize={11}>× eˣ / eˣ  ⇒  eˣ / (e²ˣ + 1)</text>
        <text x={463} y={92} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>arctg(eˣ) + C</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): Stratégiai kvíz-labor */

export function IntegrationStrategyLabWidget() {
  const [idx, setIdx] = useState(0);
  const items = [
    {
      q: '\\int \\frac{x^2}{x^2 + 1}\\,dx',
      trick: 'Maradékos polinomosztás (vagy +1 − 1 trükk)',
      step: '\\frac{x^2}{x^2+1} = 1 - \\frac{1}{x^2+1}',
      ans: 'x - \\operatorname{arctg} x + C',
    },
    {
      q: '\\int \\frac{1}{1 + \\cos x}\\,dx',
      trick: 'Szorzás 1-gyel (konjugálttal: (1 − cos x)/(1 − cos x))',
      step: '\\frac{1 - \\cos x}{\\sin^2 x} = \\csc^2 x - \\csc x\\operatorname{ctg} x',
      ans: '-\\operatorname{ctg} x + \\csc x + C',
    },
    {
      q: '\\int \\frac{2x + 5}{x^2 + 9}\\,dx',
      trick: 'Tört szétbontása a számláló mentén',
      step: '\\frac{2x}{x^2+9} + \\frac{5}{x^2+3^2}',
      ans: '\\ln(x^2 + 9) + \\frac{5}{3}\\operatorname{arctg}\\!\\left(\\frac{x}{3}\\right) + C',
    },
    {
      q: '\\int \\frac{dx}{\\sqrt{2x - x^2}}',
      trick: 'Kiegészítés teljes négyzetté',
      step: '2x - x^2 = 1 - (x - 1)^2',
      ans: '\\arcsin(x - 1) + C',
    },
    {
      q: '\\int \\frac{2^{\\ln x}}{x}\\,dx',
      trick: 'u-helyettesítés (u = ln x, du = dx/x)',
      step: '\\int 2^u\\,du',
      ans: '\\frac{2^{\\ln x}}{\\ln 2} + C',
    },
  ];
  const cur = items[idx];

  return (
    <div className="widget">
      <div className="widget-title">Stratégiai edzőterem — felismered 3 másodperc alatt a nyerő technikát?</div>
      <div className="relbuttons chips">
        {items.map((_, i) => (
          <button key={i} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {i + 1}. feladat
          </button>
        ))}
      </div>

      <div className="result">
        <p><strong>Integrál:</strong> <M t={cur.q} /></p>
        <p><strong>Nyerő technika:</strong> <span style={{ color: '#fde68a', fontWeight: 700 }}>{cur.trick}</span></p>
        <p><strong>Kulcslépés:</strong> <M t={cur.step} /> ⇒ <strong>Eredmény:</strong> <M t={cur.ans} /></p>
      </div>
    </div>
  );
}
