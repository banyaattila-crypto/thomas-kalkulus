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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): A 3 segédháromszög egyben */

export function TrigSubThreeTrianglesDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 3 trigonometrikus helyettesítés és segédháromszögeik (Thomas 8.2. ábra)</div>
      <svg viewBox="0 0 560 176" className="plane" role="img" aria-label="Három segédháromszög trigonometrikus helyettesítéshez">
        <rect width={560} height={176} className="pl-bg" />

        {/* 1. sin */}
        <g transform="translate(12, 10)">
          <rect width={172} height={156} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={86} y={20} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>√(a² − x²)  →  x = a sin θ</text>
          <polygon points="34,114 134,114 134,54" fill="rgba(56,189,248,0.20)" stroke="#38bdf8" strokeWidth={2} />
          <text x={52} y={108} fill="#fbbf24" fontSize={11} fontWeight={700}>θ</text>
          <text x={144} y={88} fill="#fde68a" fontSize={11} fontWeight={700}>x</text>
          <text x={78} y={76} fill="#7dd3fc" fontSize={11} fontWeight={700}>a</text>
          <text x={84} y={128} textAnchor="middle" fill="#6ee7b7" fontSize={10.5}>√(a² − x²)</text>
          <text x={86} y={146} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>gyök = a cos θ (−π/2 ≤ θ ≤ π/2)</text>
        </g>

        {/* 2. tg */}
        <g transform="translate(194, 10)">
          <rect width={172} height={156} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={86} y={20} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>√(a² + x²)  →  x = a tg θ</text>
          <polygon points="34,114 134,114 134,54" fill="rgba(52,211,153,0.20)" stroke="#34d399" strokeWidth={2} />
          <text x={52} y={108} fill="#fbbf24" fontSize={11} fontWeight={700}>θ</text>
          <text x={144} y={88} fill="#fde68a" fontSize={11} fontWeight={700}>x</text>
          <text x={76} y={72} textAnchor="end" fill="#6ee7b7" fontSize={10} fontWeight={700}>√(a²+x²)</text>
          <text x={84} y={128} textAnchor="middle" fill="#7dd3fc" fontSize={11}>a</text>
          <text x={86} y={146} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>gyök = a sec θ (−π/2 &lt; θ &lt; π/2)</text>
        </g>

        {/* 3. sec */}
        <g transform="translate(376, 10)">
          <rect width={172} height={156} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
          <text x={86} y={20} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>√(x² − a²)  →  x = a sec θ</text>
          <polygon points="34,114 134,114 134,54" fill="rgba(251,191,36,0.20)" stroke="#fbbf24" strokeWidth={2} />
          <text x={52} y={108} fill="#fbbf24" fontSize={11} fontWeight={700}>θ</text>
          <text x={142} y={88} fill="#6ee7b7" fontSize={9.5} fontWeight={700}>√(x²−a²)</text>
          <text x={78} y={76} fill="#fde68a" fontSize={11} fontWeight={700}>x</text>
          <text x={84} y={128} textAnchor="middle" fill="#7dd3fc" fontSize={11}>a</text>
          <text x={86} y={146} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>gyök = a tg θ (0 ≤ θ &lt; π/2)</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): x = a sin θ és a körszelet területe */

export function SinSubTriangleWidget() {
  const [thetaDeg, setThetaDeg] = useState(45);
  const th = (thetaDeg * Math.PI) / 180;
  const a = 3;
  const x = a * Math.sin(th);
  const y = a * Math.cos(th);
  // ∫_0^x √(9 - t^2) dt = 9/2 * (th + sin th cos th)
  const area = 0.5 * a * a * (th + Math.sin(th) * Math.cos(th));

  return (
    <div className="widget">
      <div className="widget-title">Az x = a sin θ helyettesítés geometriája: ∫₀ˣ √(9 − t²) dt = ½·9θ + ½·x√(9−x²)!</div>
      <label>
        Szög: <strong>θ = {thetaDeg}°</strong> ⇒ <M t={`x = 3\\sin\\theta = ${tx(x, 2)}`} />,{' '}
        <M t={`\\sqrt{9 - x^2} = 3\\cos\\theta = ${tx(y, 2)}`} />
        <input type="range" min={5} max={90} step={5} value={thetaDeg} onChange={(e) => setThetaDeg(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.3} xmax={3.4} ymin={-0.2} ymax={3.4} w={300} h={210}>
        {(m) => {
          const dArc = buildPath((t) => Math.sqrt(Math.max(0, 9 - t * t)), 0, 3, m.X, m.Y, 120);
          let poly = `M ${m.X(0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 40; i++) {
            const t = (x * i) / 40;
            poly += `L ${m.X(t).toFixed(1)},${m.Y(Math.sqrt(Math.max(0, 9 - t * t))).toFixed(1)} `;
          }
          poly += `L ${m.X(x).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={poly} fill="rgba(56,189,248,0.30)" stroke="#38bdf8" strokeWidth={1.3} />
              <line x1={m.X(0)} y1={m.Y(0)} x2={m.X(x)} y2={m.Y(y)} stroke="#fbbf24" strokeWidth={2} />
              <path d={dArc} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <circle cx={m.X(x)} cy={m.Y(y)} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          A kék terület pontosan a <strong>körcikk</strong> (<M t="\frac{9}{2}\theta" />) + a <strong>derékszögű háromszög</strong> (
          <M t="\frac{1}{2}x\sqrt{9-x^2}" />) összege = <strong>{round(area, 3)}</strong>! (<M t="\theta = 90^\circ" />-nál pontosan{' '}
          <M t="\frac{9\pi}{4} \approx 7{,}069" /> — a negyedkör területe!)
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): x = 2 tg θ segédháromszög élőben */

export function TanSubTriangleWidget() {
  const [x, setX] = useState(2.0);
  const hyp = Math.sqrt(4 + x * x);
  const thDeg = (Math.atan(x / 2) * 180) / Math.PI;

  return (
    <div className="widget">
      <div className="widget-title">Thomas 1. példája (x = 2 tg θ): visszaolvasás a segédháromszögből!</div>
      <label>
        Próbapont: <M t={`x = ${tx(x, 2)}`} /> ⇒ <M t={`\\theta = \\operatorname{arctg}(x/2) \\approx ${round(thDeg, 1)}^\\circ`} />
        <input type="range" min={0.4} max={5.0} step={0.2} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <div className="result">
        <p>
          <M t={`\\operatorname{tg}\\theta = \\dfrac{x}{2} = ${tx(x / 2, 2)}`} /> ·{' '}
          <M t={`\\sec\\theta = \\dfrac{\\sqrt{4+x^2}}{2} = ${tx(hyp / 2, 3)}`} /> ⇒{' '}
          <M t={`\\ln(\\sec\\theta + \\operatorname{tg}\\theta) = \\ln\\!\\left(\\dfrac{\\sqrt{4+x^2}+x}{2}\\right) = \\mathbf{${tx(Math.log((hyp + x) / 2), 3)}}`} />.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): x = a sec θ és a hiperbola-terület */

export function SecSubTriangleWidget() {
  const [x, setX] = useState(3.0);
  const a = 2;
  const opp = Math.sqrt(x * x - a * a);
  const thDeg = (Math.acos(a / x) * 180) / Math.PI;

  return (
    <div className="widget">
      <div className="widget-title">Az x = a sec θ helyettesítés (a = 2, x &gt; 2) — segédháromszög élőben!</div>
      <label>
        Bemenet (<M t="x > 2" />): <M t={`x = ${tx(x, 2)}`} /> ⇒ <M t={`\\theta = \\operatorname{arcsec}(x/2) \\approx ${round(thDeg, 1)}^\\circ`} />
        <input type="range" min={2.1} max={6.0} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <div className="result">
        <p>
          <M t={`\\sec\\theta = \\dfrac{x}{2} = ${tx(x / 2, 2)}`} /> ·{' '}
          <M t={`\\operatorname{tg}\\theta = \\dfrac{\\sqrt{x^2-4}}{2} = ${tx(opp / 2, 3)}`} /> ·{' '}
          <M t={`\\sin\\theta = \\dfrac{\\sqrt{x^2-4}}{x} = ${tx(opp / x, 3)}`} />.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Határok átszámítása θ-ra */

export function DefiniteThetaBoundsDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Határozott integrálnál NE írj vissza x-re — számold át a határokat θ-ra!</div>
      <svg viewBox="0 0 560 118" className="plane" role="img" aria-label="Határozott integrál határainak átszámítása trigonometrikus helyettesítésnél">
        <rect width={560} height={118} className="pl-bg" />

        <rect x={10} y={14} width={150} height={90} rx={7} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={85} y={36} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Eredeti integrál</text>
        <text x={85} y={64} textAnchor="middle" fill="#e2e8f0" fontSize={12}>∫₀² dx / (4 + x²)³/²</text>
        <text x={85} y={88} textAnchor="middle" fill="#94a3b8" fontSize={10}>x = 2 tg θ</text>

        <text x={174} y={64} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>→</text>

        <rect x={188} y={14} width={164} height={90} rx={7} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={270} y={36} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>Új határok (θ!)</text>
        <text x={270} y={60} textAnchor="middle" fill="#e2e8f0" fontSize={11}>x = 0 ⇒ θ = 0</text>
        <text x={270} y={82} textAnchor="middle" fill="#e2e8f0" fontSize={11}>x = 2 ⇒ θ = π/4</text>

        <text x={366} y={64} textAnchor="middle" fill="#34d399" fontSize={14} fontWeight={700}>→</text>

        <rect x={380} y={14} width={170} height={90} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={465} y={36} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>1 soros kiértékelés!</text>
        <text x={465} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>¼ ∫₀^(π/4) cos θ dθ</text>
        <text x={465} y={88} textAnchor="middle" fill="#6ee7b7" fontSize={12} fontWeight={700}>= ¼ sin(π/4) = √2 / 8 ✓</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Teljes négyzet + trig. helyettesítés */

export function SquareThenTrigSubDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Kettős kombó: először teljes négyzetté alakítás, utána trigonometrikus helyettesítés!</div>
      <svg viewBox="0 0 560 92" className="plane" role="img" aria-label="Teljes négyzet majd trigonometrikus helyettesítés">
        <rect width={560} height={92} className="pl-bg" />
        <rect x={10} y={16} width={145} height={60} rx={7} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={82} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={12}>√(x² + 2x + 5)</text>
        <text x={170} y={50} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>→</text>
        <rect x={184} y={16} width={166} height={60} rx={7} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={267} y={50} textAnchor="middle" fill="#fde68a" fontSize={12}>√((x + 1)² + 2²)</text>
        <text x={365} y={50} textAnchor="middle" fill="#34d399" fontSize={14} fontWeight={700}>→</text>
        <rect x={379} y={16} width={171} height={60} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={464} y={42} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={700}>x + 1 = 2 tg θ</text>
        <text x={464} y={62} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>gyök = 2 sec θ!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Ellipszis területe A = πab */

export function EllipseAndParabolaWidget() {
  const [a, setA] = useState(3.0);
  const [b, setB] = useState(2.0);

  return (
    <div className="widget">
      <div className="widget-title">Geometriai diadal: az ellipszis területe A = 4(b/a) ∫₀ᵃ √(a² − x²) dx = π·a·b!</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Fél-nagytengely: <M t={`a = ${tx(a, 1)}`} />
          <input type="range" min={1.0} max={4.5} step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Fél-kistengely: <M t={`b = ${tx(b, 1)}`} />
          <input type="range" min={0.5} max={3.5} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={-5} xmax={5} ymin={-4} ymax={4} w={360} h={195}>
        {(m) => (
          <ellipse
            cx={m.X(0)}
            cy={m.Y(0)}
            rx={m.X(a) - m.X(0)}
            ry={m.Y(0) - m.Y(b)}
            fill="rgba(52,211,153,0.28)"
            stroke="#34d399"
            strokeWidth={2.5}
          />
        )}
      </Chart>

      <div className="result">
        <p>
          Az <M t={`\\dfrac{x^2}{${tx(a * a, 1)}} + \\dfrac{y^2}{${tx(b * b, 1)}} = 1`} /> ellipszis területe:{' '}
          <strong>
            <M t={`A = \\pi\\cdot ${tx(a, 1)}\\cdot ${tx(b, 1)} = ${tx(a * b, 2)}\\pi \\approx ${tx(Math.PI * a * b, 2)}`} />
          </strong>!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): Mikor NEM kell trig. helyettesítés? */

export function TrigSubDecisionDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Ne ágyúval verébre! — Mikor elég sima u-helyettesítés, és mikor kell trig. helyettesítés?</div>
      <svg viewBox="0 0 560 112" className="plane" role="img" aria-label="Összehasonlítás sima helyettesítés és trigonometrikus helyettesítés között">
        <rect width={560} height={112} className="pl-bg" />

        <rect x={12} y={12} width={262} height={88} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={143} y={33} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>✓ Sima u-helyettesítés (5 mp!)</text>
        <text x={143} y={58} textAnchor="middle" fill="#e2e8f0" fontSize={12}>∫ x / √(9 − x²) dx   (van x a számlálóban!)</text>
        <text x={143} y={82} textAnchor="middle" fill="#6ee7b7" fontSize={11}>u = 9 − x²  ⇒  −√(9 − x²) + C</text>

        <rect x={286} y={12} width={262} height={88} rx={7} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
        <text x={417} y={33} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>★ Trigonometrikus helyettesítés kell!</text>
        <text x={417} y={58} textAnchor="middle" fill="#e2e8f0" fontSize={12}>∫ x² / √(9 − x²) dx   (páros x² van!)</text>
        <text x={417} y={82} textAnchor="middle" fill="#fde68a" fontSize={11}>x = 3 sin θ  ⇒  9/2 arcsin(x/3) − …</text>
      </svg>
    </div>
  );
}
