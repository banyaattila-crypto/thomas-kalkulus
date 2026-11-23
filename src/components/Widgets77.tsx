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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): arcsin x és arccos x együtt */

export function ArcsinArccosWidget() {
  const [x, setX] = useState(0.5);
  const as = Math.asin(x);
  const ac = Math.acos(x);

  return (
    <div className="widget">
      <div className="widget-title">Az y = arcsin x és y = arccos x grafikonja — és a pótszög-csoda (összegük mindig π/2!)</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(x + 0.5) < 0.02 ? 'on' : ''} onClick={() => setX(-0.5)}>x = −½</button>
        <button type="button" className={Math.abs(x) < 0.02 ? 'on' : ''} onClick={() => setX(0)}>x = 0</button>
        <button type="button" className={Math.abs(x - 0.5) < 0.02 ? 'on' : ''} onClick={() => setX(0.5)}>x = ½</button>
        <button type="button" className={Math.abs(x - 0.866) < 0.02 ? 'on' : ''} onClick={() => setX(0.866)}>x = √3/2</button>
      </div>

      <label>
        Bemenet (<M t="x \in [-1;\,1]" />): <M t={`x = ${tx(x, 3)}`} />
        <input type="range" min={-1} max={1} step={0.02} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <Chart xmin={-1.25} xmax={1.25} ymin={-1.85} ymax={3.45} h={220}>
        {(m) => (
          <>
            <line x1={m.X(-1.25)} y1={m.Y(Math.PI / 2)} x2={m.X(1.25)} y2={m.Y(Math.PI / 2)} stroke="#64748b" strokeWidth={1.2} strokeDasharray="4 3" />
            <line x1={m.X(-1.25)} y1={m.Y(-Math.PI / 2)} x2={m.X(1.25)} y2={m.Y(-Math.PI / 2)} stroke="#64748b" strokeWidth={1.2} strokeDasharray="4 3" />
            <line x1={m.X(-1.25)} y1={m.Y(Math.PI)} x2={m.X(1.25)} y2={m.Y(Math.PI)} stroke="#64748b" strokeWidth={1.2} strokeDasharray="4 3" />

            <path d={buildPath((u) => Math.asin(u), -1, 1, m.X, m.Y, 140)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
            <path d={buildPath((u) => Math.acos(u), -1, 1, m.X, m.Y, 140)} fill="none" stroke="#34d399" strokeWidth={2.6} />

            <line x1={m.X(x)} y1={m.Y(as)} x2={m.X(x)} y2={m.Y(ac)} stroke="#fbbf24" strokeWidth={1.6} strokeDasharray="4 3" />
            <circle cx={m.X(x)} cy={m.Y(as)} r={5.2} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.4} />
            <circle cx={m.X(x)} cy={m.Y(ac)} r={5.2} fill="#34d399" stroke="#0f172a" strokeWidth={1.4} />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <span style={{ color: '#7dd3fc', fontWeight: 700 }}>
            arcsin({round(x, 2)}) = {round(as, 3)} rad ({round((as * 180) / Math.PI, 1)}°)
          </span>{' '}
          ·{' '}
          <span style={{ color: '#6ee7b7', fontWeight: 700 }}>
            arccos({round(x, 2)}) = {round(ac, 3)} rad ({round((ac * 180) / Math.PI, 1)}°)
          </span>{' '}
          · <strong>Összegük: π/2 ≈ 1,571 rad (90°) ✓</strong>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): arctg, arcctg, arcsec */

type AtKind = 'atan' | 'acot' | 'asec';

export function ArctanArcsecWidget() {
  const [kind, setKind] = useState<AtKind>('atan');
  const [x, setX] = useState(1.0);

  const safeX = kind === 'asec' && Math.abs(x) < 1.02 ? (x >= 0 ? 1.02 : -1.02) : x;
  const y =
    kind === 'atan'
      ? Math.atan(safeX)
      : kind === 'acot'
      ? Math.PI / 2 - Math.atan(safeX)
      : Math.acos(1 / safeX);

  return (
    <div className="widget">
      <div className="widget-title">Az arctg x, arcctg x és arcsec x grafikonjai és vízszintes aszimptotái</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'atan' ? 'on' : ''} onClick={() => { setKind('atan'); setX(1.0); }}>
          y = arctg x (R = (−π/2; π/2))
        </button>
        <button type="button" className={kind === 'acot' ? 'on' : ''} onClick={() => { setKind('acot'); setX(1.0); }}>
          y = arcctg x (R = (0; π))
        </button>
        <button type="button" className={kind === 'asec' ? 'on' : ''} onClick={() => { setKind('asec'); setX(2.0); }}>
          y = arcsec x (|x| ≥ 1)
        </button>
      </div>

      <label>
        Pont: <M t={`x = ${tx(safeX, 2)}`} /> ⇒ <M t={`y = ${tx(y, 3)}\\text{ rad} \\approx ${round((y * 180) / Math.PI, 1)}^\\circ`} />
        <input type="range" min={-5.5} max={5.5} step={0.1} value={safeX} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <Chart xmin={-6} xmax={6} ymin={kind === 'atan' ? -1.9 : -0.3} ymax={kind === 'atan' ? 1.9 : 3.45} h={210}>
        {(m) => {
          const dCurve =
            kind === 'atan'
              ? buildPath((u) => Math.atan(u), -6, 6, m.X, m.Y, 180)
              : kind === 'acot'
              ? buildPath((u) => Math.PI / 2 - Math.atan(u), -6, 6, m.X, m.Y, 180)
              : buildPath((u) => (Math.abs(u) >= 1 ? Math.acos(1 / u) : Number.NaN), -6, 6, m.X, m.Y, 220);

          return (
            <>
              {kind === 'atan' ? (
                <>
                  <line x1={m.X(-6)} y1={m.Y(Math.PI / 2)} x2={m.X(6)} y2={m.Y(Math.PI / 2)} stroke="#f87171" strokeWidth={1.5} strokeDasharray="6 4" />
                  <line x1={m.X(-6)} y1={m.Y(-Math.PI / 2)} x2={m.X(6)} y2={m.Y(-Math.PI / 2)} stroke="#f87171" strokeWidth={1.5} strokeDasharray="6 4" />
                </>
              ) : kind === 'acot' ? (
                <line x1={m.X(-6)} y1={m.Y(Math.PI)} x2={m.X(6)} y2={m.Y(Math.PI)} stroke="#f87171" strokeWidth={1.5} strokeDasharray="6 4" />
              ) : (
                <line x1={m.X(-6)} y1={m.Y(Math.PI / 2)} x2={m.X(6)} y2={m.Y(Math.PI / 2)} stroke="#f87171" strokeWidth={1.5} strokeDasharray="6 4" />
              )}
              <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <circle cx={m.X(safeX)} cy={m.Y(y)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Derékszögű háromszög-trükk */

export function RightTriangleTrigWidget() {
  const [kind, setKind] = useState<'sin' | 'tan'>('sin');
  const [x, setX] = useState(0.6);

  const safeX = kind === 'sin' ? Math.min(0.95, Math.max(0.15, x)) : Math.min(2.8, Math.max(0.25, x));
  const opp = safeX;
  const adj = kind === 'sin' ? Math.sqrt(1 - safeX * safeX) : 1;
  const hyp = kind === 'sin' ? 1 : Math.sqrt(1 + safeX * safeX);

  const scale = 120 / Math.max(adj, opp, 1);
  const bx = 55;
  const by = 148;
  const ax = bx + adj * scale;
  const cy = by - opp * scale;

  return (
    <div className="widget">
      <div className="widget-title">A derékszögű háromszög-trükk — szög nélkül minden szögfüggvény 1 másodperc!</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'sin' ? 'on' : ''} onClick={() => { setKind('sin'); setX(0.6); }}>
          α = arcsin(x)  (sin α = x / 1)
        </button>
        <button type="button" className={kind === 'tan' ? 'on' : ''} onClick={() => { setKind('tan'); setX(1.2); }}>
          α = arctg(x)  (tg α = x / 1)
        </button>
      </div>

      <label>
        Oldalparaméter: <M t={`x = ${tx(safeX, 2)}`} />
        <input
          type="range"
          min={kind === 'sin' ? 0.2 : 0.3}
          max={kind === 'sin' ? 0.94 : 2.5}
          step={0.05}
          value={safeX}
          onChange={(e) => setX(Number(e.target.value))}
        />
      </label>

      <svg viewBox="0 0 560 172" className="plane" role="img" aria-label="Derékszögű háromszög inverz trigonometrikus kifejezésekhez">
        <rect width={560} height={172} className="pl-bg" />

        {/* Háromszög */}
        <polygon points={`${bx},${by} ${ax},${by} ${ax},${cy}`} fill="rgba(56,189,248,0.20)" stroke="#38bdf8" strokeWidth={2.2} />
        <rect x={ax - 10} y={by - 10} width={10} height={10} fill="none" stroke="#94a3b8" strokeWidth={1.2} />
        <text x={bx + 20} y={by - 8} fill="#fbbf24" fontSize={12.5} fontWeight={700}>α</text>

        {/* Oldalfeliratok */}
        <text x={(bx + ax) / 2} y={by + 16} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={700}>
          {kind === 'sin' ? `√(1−x²) ≈ ${round(adj, 2)}` : '1'}
        </text>
        <text x={ax + 8} y={(by + cy) / 2 + 4} fill="#fde68a" fontSize={11} fontWeight={700}>
          x = {round(opp, 2)}
        </text>
        <text x={(bx + ax) / 2 - 14} y={(by + cy) / 2 - 8} textAnchor="end" fill="#7dd3fc" fontSize={11} fontWeight={700}>
          {kind === 'sin' ? '1' : `√(1+x²) ≈ ${round(hyp, 2)}`}
        </text>

        {/* Jobb oldali adatdoboz */}
        <rect x={286} y={16} width={260} height={140} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={416} y={38} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>
          {kind === 'sin' ? 'α = arcsin(x) értékei:' : 'α = arctg(x) értékei:'}
        </text>
        <text x={302} y={66} fill="#7dd3fc" fontSize={11.5}>
          • sin α = {kind === 'sin' ? `x = ${round(opp, 2)}` : `x / √(1+x²) = ${round(opp / hyp, 3)}`}
        </text>
        <text x={302} y={92} fill="#6ee7b7" fontSize={11.5}>
          • cos α = {kind === 'sin' ? `√(1−x²) = ${round(adj, 3)}` : `1 / √(1+x²) = ${round(adj / hyp, 3)}`}
        </text>
        <text x={302} y={118} fill="#fde68a" fontSize={11.5}>
          • tg α = {kind === 'sin' ? `x / √(1−x²) = ${round(opp / adj, 3)}` : `x = ${round(opp, 2)}`}
        </text>
        <text x={302} y={142} fill="#c4b5fd" fontSize={11.5}>
          • sec α = {kind === 'sin' ? `1 / √(1−x²) = ${round(1 / adj, 3)}` : `√(1+x²) = ${round(hyp, 3)}`}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Függvény és deriváltja együtt */

export function InvTrigDerivativeWidget() {
  const [kind, setKind] = useState<'asin' | 'atan'>('atan');
  const [x0, setX0] = useState(0.5);

  const safeX = kind === 'asin' ? Math.min(0.92, Math.max(-0.92, x0)) : x0;
  const f = kind === 'asin' ? (u: number) => Math.asin(u) : (u: number) => Math.atan(u);
  const df = kind === 'asin' ? (u: number) => 1 / Math.sqrt(1 - u * u) : (u: number) => 1 / (1 + u * u);

  const y0 = f(safeX);
  const m0 = df(safeX);

  return (
    <div className="widget">
      <div className="widget-title">Az inverz trigonometrikus függvény (kék) és a deriváltja (zöld) egy közös grafikonon!</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'asin' ? 'on' : ''} onClick={() => { setKind('asin'); setX0(0.5); }}>
          arcsin x  →  1 / √(1 − x²)
        </button>
        <button type="button" className={kind === 'atan' ? 'on' : ''} onClick={() => { setKind('atan'); setX0(1.0); }}>
          arctg x  →  1 / (1 + x²)
        </button>
      </div>

      <label>
        Pont: <M t={`x_0 = ${tx(safeX, 2)}`} /> ⇒ meredekség: <M t={`f'(x_0) = ${tx(m0, 3)}`} />
        <input
          type="range"
          min={kind === 'asin' ? -0.9 : -3.5}
          max={kind === 'asin' ? 0.9 : 3.5}
          step={0.05}
          value={safeX}
          onChange={(e) => setX0(Number(e.target.value))}
        />
      </label>

      <Chart
        xmin={kind === 'asin' ? -1.2 : -4.2}
        xmax={kind === 'asin' ? 1.2 : 4.2}
        ymin={-1.8}
        ymax={kind === 'asin' ? 3.5 : 1.9}
        h={210}
      >
        {(m) => {
          const lo = kind === 'asin' ? -0.98 : -4.2;
          const hi = kind === 'asin' ? 0.98 : 4.2;
          const span = kind === 'asin' ? 0.35 : 0.9;
          return (
            <>
              <path d={buildPath(f, lo, hi, m.X, m.Y, 160)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={buildPath(df, lo, hi, m.X, m.Y, 160)} fill="none" stroke="#34d399" strokeWidth={2.4} />
              <line
                x1={m.X(safeX - span)}
                y1={m.Y(y0 - m0 * span)}
                x2={m.X(safeX + span)}
                y2={m.Y(y0 + m0 * span)}
                stroke="#fbbf24"
                strokeWidth={2}
              />
              <circle cx={m.X(safeX)} cy={m.Y(y0)} r={5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.3} />
              <circle cx={m.X(safeX)} cy={m.Y(Math.min(3.5, m0))} r={5} fill="#34d399" stroke="#0f172a" strokeWidth={1.3} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): ∫ 1/(1+x^2) dx = arctg b */

export function ArctanAreaPiWidget() {
  const [b, setB] = useState(1.0);
  const area = Math.atan(b);

  return (
    <div className="widget">
      <div className="widget-title">A π megjelenése racionális görbe alatt: ∫₀ᵇ 1/(1 + x²) dx = arctg b!</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(b - 1 / Math.sqrt(3)) < 0.03 ? 'on' : ''} onClick={() => setB(0.577)}>
          b = 1/√3 (π/6)
        </button>
        <button type="button" className={Math.abs(b - 1) < 0.02 ? 'on' : ''} onClick={() => setB(1.0)}>
          b = 1 (π/4 ≈ 0,785!)
        </button>
        <button type="button" className={Math.abs(b - Math.sqrt(3)) < 0.03 ? 'on' : ''} onClick={() => setB(1.732)}>
          b = √3 (π/3)
        </button>
        <button type="button" className={Math.abs(b - 5) < 0.1 ? 'on' : ''} onClick={() => setB(5.0)}>
          b = 5 (közelít π/2-höz!)
        </button>
      </div>

      <label>
        Felső határ: <M t={`b = ${tx(b, 2)}`} /> ⇒ terület: <M t={`\\operatorname{arctg}(${tx(b, 2)}) = \\mathbf{${tx(area, 4)}}`} />
        <input type="range" min={0.1} max={5.5} step={0.05} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.3} xmax={5.8} ymin={-0.1} ymax={1.25} h={190}>
        {(m) => {
          const dCurve = buildPath((x) => 1 / (1 + x * x), -0.3, 5.8, m.X, m.Y, 160);
          let poly = `M ${m.X(0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 60; i++) {
            const x = (b * i) / 60;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(1 / (1 + x * x)).toFixed(1)} `;
          }
          poly += `L ${m.X(b).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={poly} fill="rgba(52,211,153,0.34)" stroke="#34d399" strokeWidth={1.5} />
              <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <circle cx={m.X(b)} cy={m.Y(0)} r={4.5} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (6. ábra): A 3 arany integrálképlet */

export function ThreeIntegralsCompareDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 3 arany integrálképlet — figyeld, hol VAN és hol NINCS 1/a szorzó elöl!</div>
      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Három inverz trigonometrikus integrálképlet összehasonlítása">
        <rect width={560} height={132} className="pl-bg" />

        <rect x={10} y={14} width={174} height={104} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={97} y={36} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>1. ∫ du / √(a² − u²)</text>
        <text x={97} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={700}>arcsin(u / a) + C</text>
        <text x={97} y={98} textAnchor="middle" fill="#fca5a5" fontSize={11} fontWeight={700}>✗ NINCS 1/a elöl!</text>

        <rect x={193} y={14} width={174} height={104} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.8} />
        <text x={280} y={36} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>2. ∫ du / (a² + u²)</text>
        <text x={280} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={700}>(1/a)·arctg(u / a) + C</text>
        <text x={280} y={98} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={700}>✓ VAN 1/a elöl!</text>

        <rect x={376} y={14} width={174} height={104} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.8} />
        <text x={463} y={36} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>3. ∫ du / (u√(u² − a²))</text>
        <text x={463} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={12.5} fontWeight={700}>(1/a)·arcsec|u / a| + C</text>
        <text x={463} y={98} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>✓ VAN 1/a elöl!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (7. ábra): Teljes négyzetté alakítás */

export function CompleteSquarePipelineDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Teljes négyzetté alakítás — hogyan leplezzük le a rejtett arcsin és arctg integrálokat?</div>
      <svg viewBox="0 0 560 138" className="plane" role="img" aria-label="Teljes négyzetté alakítás két lépéssora">
        <rect width={560} height={138} className="pl-bg" />

        {/* 1. sor: arcsin */}
        <rect x={10} y={14} width={150} height={46} rx={7} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={85} y={42} textAnchor="middle" fill="#e2e8f0" fontSize={12}>∫ dx / √(4x − x²)</text>
        <text x={175} y={42} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>→</text>
        <rect x={190} y={14} width={175} height={46} rx={7} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={277} y={42} textAnchor="middle" fill="#fde68a" fontSize={12}>∫ dx / √(2² − (x−2)²)</text>
        <text x={380} y={42} textAnchor="middle" fill="#34d399" fontSize={14} fontWeight={700}>→</text>
        <rect x={395} y={14} width={155} height={46} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={472} y={42} textAnchor="middle" fill="#6ee7b7" fontSize={12} fontWeight={700}>arcsin((x−2)/2) + C</text>

        {/* 2. sor: arctg */}
        <rect x={10} y={76} width={150} height={46} rx={7} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={85} y={104} textAnchor="middle" fill="#e2e8f0" fontSize={12}>∫ dx / (x² + 2x + 5)</text>
        <text x={175} y={104} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>→</text>
        <rect x={190} y={76} width={175} height={46} rx={7} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={277} y={104} textAnchor="middle" fill="#fde68a" fontSize={12}>∫ dx / ((x+1)² + 2²)</text>
        <text x={380} y={104} textAnchor="middle" fill="#34d399" fontSize={14} fontWeight={700}>→</text>
        <rect x={395} y={76} width={155} height={46} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={472} y={104} textAnchor="middle" fill="#6ee7b7" fontSize={12} fontWeight={700}>½ arctg((x+1)/2) + C</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): Múzeumi kép / mozivászon látószög-optimalizáció */

export function ViewingAngleMaxWidget() {
  const [x, setX] = useState(2.8);
  const a = 1; // szemmagasság feletti alsó él (m)
  const b = 8; // felső él (m) -> optimális x = sqrt(8) ≈ 2.83 m!
  const theta = Math.atan(b / x) - Math.atan(a / x);
  const deg = (theta * 180) / Math.PI;
  const xOpt = Math.sqrt(a * b);

  return (
    <div className="widget">
      <div className="widget-title">Alkalmazás: honnan látszik legnagyobb szögben a mozivászon? (x_opt = √(ab))</div>
      <label>
        Távolság a faltól: <strong>x = {round(x, 2)} m</strong> (alsó él a = 1 m, felső él b = 8 m) ⇒ látószög:{' '}
        <strong>θ = {round(deg, 1)}°</strong>
        <input type="range" min={0.6} max={9.0} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={9.5} ymin={0} ymax={55} h={190}>
        {(m) => {
          const dCurve = buildPath((u) => ((Math.atan(b / u) - Math.atan(a / u)) * 180) / Math.PI, 0.35, 9.4, m.X, m.Y, 160);
          const optDeg = ((Math.atan(b / xOpt) - Math.atan(a / xOpt)) * 180) / Math.PI;
          return (
            <>
              <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <line x1={m.X(xOpt)} y1={m.Y(0)} x2={m.X(xOpt)} y2={m.Y(optDeg)} stroke="#34d399" strokeWidth={1.6} strokeDasharray="4 3" />
              <circle cx={m.X(xOpt)} cy={m.Y(optDeg)} r={4.5} fill="#34d399" />
              <circle cx={m.X(x)} cy={m.Y(deg)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Az <M t="\theta(x) = \operatorname{arctg}(8/x) - \operatorname{arctg}(1/x)" /> függvény maximuma pontosan{' '}
          <strong>
            <M t="x = \sqrt{1\cdot 8} = 2\sqrt{2} \approx 2{,}83\text{ m}" />
          </strong>{' '}
          távolságban van (maximális látószög: <M t="\approx 51{,}1^\circ" />)!
        </p>
      </div>
    </div>
  );
}
