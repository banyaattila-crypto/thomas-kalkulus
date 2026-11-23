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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): sh x és ch x építése e^x-ből */

export function SinhCoshBuildWidget() {
  const [x0, setX0] = useState(1.0);
  const halfPos = 0.5 * Math.exp(x0);
  const halfNeg = 0.5 * Math.exp(-x0);
  const ch = Math.cosh(x0);
  const sh = Math.sinh(x0);

  return (
    <div className="widget">
      <div className="widget-title">Az eˣ felbontása páros (ch x) és páratlan (sh x) részre — ½eˣ ± ½e⁻ˣ</div>
      <label>
        Pont: <M t={`x_0 = ${tx(x0, 2)}`} /> ⇒ <M t={`\\tfrac{1}{2}e^{x_0} = ${tx(halfPos, 2)},\\; \\tfrac{1}{2}e^{-x_0} = ${tx(halfNeg, 2)}`} />
        <input type="range" min={-2.0} max={2.0} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.4} xmax={2.4} ymin={-4.2} ymax={5.2} h={215}>
        {(m) => (
          <>
            <path d={buildPath((x) => 0.5 * Math.exp(x), -2.4, 2.4, m.X, m.Y, 140)} fill="none" stroke="#64748b" strokeWidth={1.5} strokeDasharray="5 4" />
            <path d={buildPath((x) => 0.5 * Math.exp(-x), -2.4, 2.4, m.X, m.Y, 140)} fill="none" stroke="#64748b" strokeWidth={1.5} strokeDasharray="3 3" />
            <path d={buildPath((x) => Math.cosh(x), -2.4, 2.4, m.X, m.Y, 160)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
            <path d={buildPath((x) => Math.sinh(x), -2.4, 2.4, m.X, m.Y, 160)} fill="none" stroke="#34d399" strokeWidth={2.6} />

            <line x1={m.X(x0)} y1={m.Y(sh)} x2={m.X(x0)} y2={m.Y(ch)} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={m.X(x0)} cy={m.Y(ch)} r={5.2} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.4} />
            <circle cx={m.X(x0)} cy={m.Y(sh)} r={5.2} fill="#34d399" stroke="#0f172a" strokeWidth={1.4} />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <span style={{ color: '#7dd3fc', fontWeight: 700 }}>ch({round(x0, 2)}) = {round(ch, 3)}</span> (összeg, páros, mindig ≥ 1) ·{' '}
          <span style={{ color: '#6ee7b7', fontWeight: 700 }}>sh({round(x0, 2)}) = {round(sh, 3)}</span> (különbség, páratlan) ·{' '}
          <strong>ch + sh = eˣ ≈ {round(ch + sh, 3)} ✓</strong>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Egységkör vs. Egységhiperbola */

export function UnitCircleVsHyperbolaWidget() {
  const [t, setT] = useState(0.8);
  const cx = Math.cos(t);
  const cy = Math.sin(t);
  const hx = Math.cosh(t);
  const hy = Math.sinh(t);

  return (
    <div className="widget">
      <div className="widget-title">Miért „hiperbolikusak”? — Kör (x² + y² = 1) vs. Hiperbola (x² − y² = 1)</div>
      <label>
        Paraméter: <M t={`t = ${tx(t, 2)}`} />
        <input type="range" min={-1.4} max={1.4} step={0.05} value={t} onChange={(e) => setT(Number(e.target.value))} />
      </label>

      <svg viewBox="0 0 560 190" className="plane" role="img" aria-label="Egységkör és egységhiperbola összehasonlítása">
        <rect width={560} height={190} className="pl-bg" />

        {/* Bal: Egységkör */}
        <g transform="translate(135, 98)">
          <line x1={-95} y1={0} x2={95} y2={0} stroke="#475569" strokeWidth={1.2} />
          <line x1={0} y1={-75} x2={0} y2={75} stroke="#475569" strokeWidth={1.2} />
          <circle cx={0} cy={0} r={58} fill="rgba(56,189,248,0.10)" stroke="#38bdf8" strokeWidth={2.2} />
          <line x1={0} y1={0} x2={cx * 58} y2={-cy * 58} stroke="#fbbf24" strokeWidth={1.8} />
          <circle cx={cx * 58} cy={-cy * 58} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.3} />
          <text x={0} y={-80} textAnchor="middle" fill="#7dd3fc" fontSize={11.5} fontWeight={700}>
            Kör: cos²t + sin²t = 1
          </text>
          <text x={0} y={82} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>
            ({round(cx, 2)}; {round(cy, 2)})
          </text>
        </g>

        <line x1={280} y1={14} x2={280} y2={176} stroke="#334155" strokeWidth={1.4} strokeDasharray="4 4" />

        {/* Jobb: Egységhiperbola */}
        <g transform="translate(365, 98)">
          <line x1={-55} y1={0} x2={165} y2={0} stroke="#475569" strokeWidth={1.2} />
          <line x1={0} y1={-75} x2={0} y2={75} stroke="#475569" strokeWidth={1.2} />
          {/* Aszimptoták y = ±x */}
          <line x1={-50} y1={50} x2={75} y2={-75} stroke="#64748b" strokeWidth={1} strokeDasharray="3 3" />
          <line x1={-50} y1={-50} x2={75} y2={75} stroke="#64748b" strokeWidth={1} strokeDasharray="3 3" />
          {/* Hiperbola jobb ága: x = ch u, y = sh u, lépték 36 */}
          <path
            d={Array.from({ length: 61 }, (_, i) => {
              const u = -1.5 + (3 * i) / 60;
              return `${i === 0 ? 'M' : 'L'}${(Math.cosh(u) * 36).toFixed(1)},${(-Math.sinh(u) * 36).toFixed(1)}`;
            }).join(' ')}
            fill="none"
            stroke="#34d399"
            strokeWidth={2.4}
          />
          <line x1={0} y1={0} x2={hx * 36} y2={-hy * 36} stroke="#fbbf24" strokeWidth={1.8} />
          <circle cx={hx * 36} cy={-hy * 36} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.3} />
          <text x={55} y={-80} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>
            Hiperbola: ch²t − sh²t = 1
          </text>
          <text x={55} y={82} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>
            ({round(hx, 2)}; {round(hy, 2)}) ⇒ {round(hx * hx - hy * hy, 2)}
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (3. ábra): th, sech, cth, csch */

type HypOther = 'th' | 'sech' | 'cth';

export function TanhSechGalleryWidget() {
  const [kind, setKind] = useState<HypOther>('th');

  return (
    <div className="widget">
      <div className="widget-title">A többi hiperbolikus függvény grafikonja: th x, sech x és cth x</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'th' ? 'on' : ''} onClick={() => setKind('th')}>
          y = th x (aszimptoták: y = ±1)
        </button>
        <button type="button" className={kind === 'sech' ? 'on' : ''} onClick={() => setKind('sech')}>
          y = sech x = 1/ch x (haranggörbe!)
        </button>
        <button type="button" className={kind === 'cth' ? 'on' : ''} onClick={() => setKind('cth')}>
          y = cth x = ch x / sh x
        </button>
      </div>

      <Chart xmin={-4} xmax={4} ymin={kind === 'sech' ? -0.2 : -2.6} ymax={kind === 'sech' ? 1.3 : 2.6} h={190}>
        {(m) => {
          const d =
            kind === 'th'
              ? buildPath((x) => Math.tanh(x), -4, 4, m.X, m.Y, 160)
              : kind === 'sech'
              ? buildPath((x) => 1 / Math.cosh(x), -4, 4, m.X, m.Y, 160)
              : buildPath((x) => (Math.abs(x) > 0.12 ? 1 / Math.tanh(x) : Number.NaN), -4, 4, m.X, m.Y, 200);
          return (
            <>
              {(kind === 'th' || kind === 'cth') && (
                <>
                  <line x1={m.X(-4)} y1={m.Y(1)} x2={m.X(4)} y2={m.Y(1)} stroke="#f87171" strokeWidth={1.4} strokeDasharray="5 4" />
                  <line x1={m.X(-4)} y1={m.Y(-1)} x2={m.X(4)} y2={m.Y(-1)} stroke="#f87171" strokeWidth={1.4} strokeDasharray="5 4" />
                </>
              )}
              <path d={d} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (4. ábra): Trigonometrikus vs. hiperbolikus deriváltak */

export function TrigVsHypSignDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Előjel-memóriatrükk: a 3 alap hiperbolikus derivált (+), a 3 reciprok (−)!</div>
      <svg viewBox="0 0 560 150" className="plane" role="img" aria-label="Hiperbolikus deriváltak előjelszabálya">
        <rect width={560} height={150} className="pl-bg" />

        <rect x={14} y={14} width={258} height={122} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.8} />
        <text x={143} y={36} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight={700}>POZITÍV derivált (az 3 fő függvény)</text>
        <text x={32} y={66} fill="#e2e8f0" fontSize={12.5}>• (sh u)′ = + ch u · u′</text>
        <text x={32} y={92} fill="#fde68a" fontSize={12.5} fontWeight={700}>• (ch u)′ = + sh u · u′   ← NINCS mínusz!</text>
        <text x={32} y={118} fill="#e2e8f0" fontSize={12.5}>• (th u)′ = + sech² u · u′</text>

        <rect x={288} y={14} width={258} height={122} rx={8} fill="#0f172a" stroke="#f87171" strokeWidth={1.8} />
        <text x={417} y={36} textAnchor="middle" fill="#f87171" fontSize={12} fontWeight={700}>NEGATÍV derivált (a 3 reciprok)</text>
        <text x={306} y={66} fill="#e2e8f0" fontSize={12.5}>• (cth u)′ = − csch² u · u′</text>
        <text x={306} y={92} fill="#fca5a5" fontSize={12.5} fontWeight={700}>• (sech u)′ = − sech u · th u · u′</text>
        <text x={306} y={118} fill="#e2e8f0" fontSize={12.5}>• (csch u)′ = − csch u · cth u · u′</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (5. ábra): Láncgörbe vs. Parabola */

export function CatenaryVsParabolaWidget() {
  const [a, setA] = useState(1.2);
  const b = 2.0;
  const cableLen = 2 * a * Math.sinh(b / a);

  return (
    <div className="widget">
      <div className="widget-title">A láncgörbe (y = a·ch(x/a)) vs. a csúcsban rásimuló parabola (y = a + x²/(2a))</div>
      <label>
        Feszesség paraméter: <M t={`a = ${tx(a, 2)}`} /> (fesztáv: <M t="[-2;\,2]" />) ⇒ kábelhossz:{' '}
        <M t={`L = 2a\\operatorname{sh}(2/a) = \\mathbf{${tx(cableLen, 2)}}`} />
        <input type="range" min={0.7} max={2.5} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.5} xmax={2.5} ymin={0} ymax={6.5} h={205}>
        {(m) => (
          <>
            <path d={buildPath((x) => a * Math.cosh(x / a), -2.2, 2.2, m.X, m.Y, 150)} fill="none" stroke="#38bdf8" strokeWidth={2.7} />
            <path
              d={buildPath((x) => a + (x * x) / (2 * a), -2.2, 2.2, m.X, m.Y, 150)}
              fill="none"
              stroke="#fbbf24"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            <circle cx={m.X(-b)} cy={m.Y(Math.min(6.5, a * Math.cosh(b / a)))} r={4.8} fill="#34d399" />
            <circle cx={m.X(b)} cy={m.Y(Math.min(6.5, a * Math.cosh(b / a)))} r={4.8} fill="#34d399" />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék:</strong> valódi lógó kábel (<M t="a\operatorname{ch}(x/a)" />) · <strong>Sárga szaggatott:</strong> parabola (<M t="a + \frac{x^2}{2a}" />). Középen szinte egybeesnek, de a széleken a láncgörbe meredekebben emelkedik!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (6. ábra): Inverz hiperbolikus függvények */

type InvHypKind = 'arsh' | 'arch' | 'arth';

export function InvHypGraphsWidget() {
  const [kind, setKind] = useState<InvHypKind>('arsh');
  const [x, setX] = useState(1.5);

  const safeX =
    kind === 'arch' ? Math.max(1.02, x) : kind === 'arth' ? Math.min(0.95, Math.max(-0.95, x)) : x;

  const y =
    kind === 'arsh'
      ? Math.asinh(safeX)
      : kind === 'arch'
      ? Math.acosh(safeX)
      : Math.atanh(safeX);

  const selectKind = (k: InvHypKind) => {
    setKind(k);
    setX(k === 'arch' ? 2.0 : k === 'arth' ? 0.6 : 1.5);
  };

  return (
    <div className="widget">
      <div className="widget-title">Az inverz hiperbolikus (area-) függvények: arsh x, arch x és arth x</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'arsh' ? 'on' : ''} onClick={() => selectKind('arsh')}>
          y = arsh x = ln(x + √(x²+1))
        </button>
        <button type="button" className={kind === 'arch' ? 'on' : ''} onClick={() => selectKind('arch')}>
          y = arch x = ln(x + √(x²−1))
        </button>
        <button type="button" className={kind === 'arth' ? 'on' : ''} onClick={() => selectKind('arth')}>
          y = arth x = ½ ln((1+x)/(1−x))
        </button>
      </div>

      <label>
        Bemenet: <M t={`x = ${tx(safeX, 2)}`} /> ⇒ <M t={`y = ${tx(y, 3)}`} />
        <input
          type="range"
          min={kind === 'arch' ? 1.05 : kind === 'arth' ? -0.92 : -3.5}
          max={kind === 'arth' ? 0.92 : 4.0}
          step={0.05}
          value={safeX}
          onChange={(e) => setX(Number(e.target.value))}
        />
      </label>

      <Chart
        xmin={kind === 'arth' ? -1.4 : -3.8}
        xmax={kind === 'arth' ? 1.4 : 4.4}
        ymin={kind === 'arch' ? -0.3 : -2.6}
        ymax={2.6}
        h={205}
      >
        {(m) => {
          const d =
            kind === 'arsh'
              ? buildPath((u) => Math.asinh(u), -3.8, 4.4, m.X, m.Y, 160)
              : kind === 'arch'
              ? buildPath((u) => (u >= 1 ? Math.acosh(u) : Number.NaN), 1.0, 4.4, m.X, m.Y, 140)
              : buildPath((u) => (Math.abs(u) < 0.99 ? Math.atanh(u) : Number.NaN), -0.98, 0.98, m.X, m.Y, 160);
          return (
            <>
              {kind === 'arth' && (
                <>
                  <line x1={m.X(-1)} y1={m.Y(-2.6)} x2={m.X(-1)} y2={m.Y(2.6)} stroke="#f87171" strokeWidth={1.5} strokeDasharray="5 4" />
                  <line x1={m.X(1)} y1={m.Y(-2.6)} x2={m.X(1)} y2={m.Y(2.6)} stroke="#f87171" strokeWidth={1.5} strokeDasharray="5 4" />
                </>
              )}
              <path d={d} fill="none" stroke="#34d399" strokeWidth={2.6} />
              <circle cx={m.X(safeX)} cy={m.Y(y)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (7. ábra): Inverz hiperbolikus derivált */

export function InvHypDerivWidget() {
  const [x0, setX0] = useState(1.0);
  const y0 = Math.asinh(x0);
  const m0 = 1 / Math.sqrt(1 + x0 * x0);

  return (
    <div className="widget">
      <div className="widget-title">Az y = arsh x (kék) és deriváltja: y′ = 1 / √(1 + x²) (zöld)</div>
      <label>
        Pont: <M t={`x_0 = ${tx(x0, 2)}`} /> ⇒ meredekség: <M t={`(\\operatorname{arsh})'(x_0) = ${tx(m0, 3)}`} />
        <input type="range" min={-3.0} max={3.0} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={-3.5} xmax={3.5} ymin={-2.2} ymax={2.2} h={195}>
        {(m) => {
          const span = 0.9;
          return (
            <>
              <path d={buildPath((x) => Math.asinh(x), -3.5, 3.5, m.X, m.Y, 150)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={buildPath((x) => 1 / Math.sqrt(1 + x * x), -3.5, 3.5, m.X, m.Y, 150)} fill="none" stroke="#34d399" strokeWidth={2.3} />
              <line
                x1={m.X(x0 - span)}
                y1={m.Y(y0 - m0 * span)}
                x2={m.X(x0 + span)}
                y2={m.Y(y0 + m0 * span)}
                stroke="#fbbf24"
                strokeWidth={2}
              />
              <circle cx={m.X(x0)} cy={m.Y(y0)} r={5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.3} />
              <circle cx={m.X(x0)} cy={m.Y(m0)} r={5} fill="#34d399" stroke="#0f172a" strokeWidth={1.3} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): 7.7 vs 7.8 integrál-térkép */

export function InvTrigVsInvHypIntegralsDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A nagy szimmetria-térkép: 7.7 (inverz trig.) vs. 7.8 (inverz hiperbolikus) integrálok!</div>
      <svg viewBox="0 0 560 174" className="plane" role="img" aria-label="Inverz trigonometrikus és inverz hiperbolikus integrálképletek összevetése">
        <rect width={560} height={174} className="pl-bg" />

        <rect x={10} y={10} width={540} height={26} rx={6} fill="#1e293b" />
        <text x={145} y={27} textAnchor="middle" fill="#7dd3fc" fontSize={11.5} fontWeight={700}>7.7 Inverz trigonometrikus</text>
        <text x={415} y={27} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>7.8 Inverz hiperbolikus (és ln alak!)</text>

        {/* Sor 1 */}
        <rect x={10} y={42} width={264} height={38} rx={6} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.3} />
        <text x={142} y={65} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>∫ du / √(a² − u²) = arcsin(u/a)</text>
        <rect x={286} y={42} width={264} height={38} rx={6} fill="#0f172a" stroke="#34d399" strokeWidth={1.3} />
        <text x={418} y={65} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>∫ du / √(a² + u²) = arsh(u/a)</text>

        {/* Sor 2 */}
        <rect x={10} y={86} width={264} height={38} rx={6} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.3} />
        <text x={142} y={109} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>∫ du / (a² + u²) = (1/a) arctg(u/a)</text>
        <rect x={286} y={86} width={264} height={38} rx={6} fill="#0f172a" stroke="#34d399" strokeWidth={1.3} />
        <text x={418} y={109} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>∫ du / (a² − u²) = (1/a) arth(u/a)  (|u|&lt;a)</text>

        {/* Sor 3 */}
        <rect x={10} y={130} width={264} height={36} rx={6} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.3} />
        <text x={142} y={152} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>∫ du / (u√(u²−a²)) = (1/a) arcsec|u/a|</text>
        <rect x={286} y={130} width={264} height={36} rx={6} fill="#0f172a" stroke="#34d399" strokeWidth={1.3} />
        <text x={418} y={152} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>∫ du / √(u² − a²) = arch(u/a)  (u &gt; a)</text>
      </svg>
    </div>
  );
}
