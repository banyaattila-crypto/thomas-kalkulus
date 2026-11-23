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
  steps = 150,
) {
  let d = '';
  let pen = false;
  for (let i = 0; i <= steps; i++) {
    const x = xmin + ((xmax - xmin) * i) / steps;
    const y = fn(x);
    if (!Number.isFinite(y) || Math.abs(y) > 40) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
    pen = true;
  }
  return d;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Megoldássereg + partikuláris görbe */

export function SolutionFamilyWidget() {
  const [cVal, setCVal] = useState(-0.33);
  const cs = [-1.5, -0.8, -1 / 3, 0, 0.4, 1.0];

  return (
    <div className="widget">
      <div className="widget-title">
        Az <M t="y' = y - x" /> megoldásserege: <M t="y = x + 1 + C e^x" /> (Thomas 2. példa)
      </div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <label style={{ fontSize: 13 }}>
          Paraméter C = <strong>{round(cVal, 2)}</strong> (kezdeti érték y(0) = {round(1 + cVal, 2)}){' '}
          <input type="range" min={-1.5} max={1.2} step={0.05} value={cVal} onChange={(e) => setCVal(Number(e.target.value))} />
        </label>
        <button type="button" onClick={() => setCVal(-1 / 3)}>
          Thomas 2. példa: y(0) = 2/3 (C = −1/3)
        </button>
      </div>

      <Chart xmin={-2.5} xmax={2.5} ymin={-3.2} ymax={4.2} w={560} h={195}>
        {({ X, Y }) => (
          <>
            {cs.map((c) => (
              <path
                key={c}
                d={buildPath((x) => x + 1 + c * Math.exp(x), -2.5, 2.5, X, Y)}
                fill="none"
                stroke="#475569"
                strokeWidth={1.3}
              />
            ))}
            <path
              d={buildPath((x) => x + 1 + cVal * Math.exp(x), -2.5, 2.5, X, Y)}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={2.8}
            />
            <circle cx={X(0)} cy={Y(1 + cVal)} r={4.8} fill="#fbbf24" />
          </>
        )}
      </Chart>
      <div className="widget-note">
        Szürke: a teljes megoldássereg néhány tagja. Kék: az általad választott partikuláris megoldás, amely áthalad a sárga (0, {round(1 + cVal, 2)}) kezdeti ponton.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Interaktív iránymező + RK4 görbe */

export function SlopeFieldExplorerWidget() {
  const [eq, setEq] = useState<'yx' | 'circle' | 'log' | 'cos'>('yx');
  const [y0, setY0] = useState(0.7);

  const cfg = {
    yx: {
      label: "y' = y − x",
      f: (x: number, y: number) => y - x,
      xmin: -2.5,
      xmax: 2.5,
      ymin: -2.5,
      ymax: 2.5,
      xStart: 0,
    },
    circle: {
      label: "y' = −x / y",
      f: (x: number, y: number) => (Math.abs(y) < 0.12 ? NaN : -x / y),
      xmin: -2.5,
      xmax: 2.5,
      ymin: -2.5,
      ymax: 2.5,
      xStart: 0,
    },
    log: {
      label: "y' = y(2 − y)",
      f: (_x: number, y: number) => y * (2 - y),
      xmin: -2.0,
      xmax: 3.0,
      ymin: -0.5,
      ymax: 2.8,
      xStart: 0,
    },
    cos: {
      label: "y' = cos x",
      f: (x: number, _y: number) => Math.cos(x),
      xmin: -3.2,
      xmax: 3.2,
      ymin: -2.2,
      ymax: 2.2,
      xStart: 0,
    },
  }[eq];

  const traceCurve = (dir: 1 | -1) => {
    const pts: [number, number][] = [];
    let x = cfg.xStart;
    let y = y0;
    const h = 0.04 * dir;
    for (let i = 0; i < 120; i++) {
      if (x < cfg.xmin || x > cfg.xmax || y < cfg.ymin - 0.5 || y > cfg.ymax + 0.5) break;
      pts.push([x, y]);
      const k1 = cfg.f(x, y);
      const k2 = cfg.f(x + h / 2, y + (h * k1) / 2);
      const k3 = cfg.f(x + h / 2, y + (h * k2) / 2);
      const k4 = cfg.f(x + h, y + h * k3);
      if (![k1, k2, k3, k4].every(Number.isFinite)) break;
      y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      x += h;
    }
    return pts;
  };

  const fwd = traceCurve(1);
  const bwd = traceCurve(-1).reverse();
  const fullPts = [...bwd, ...fwd.slice(1)];

  return (
    <div className="widget">
      <div className="widget-title">Interaktív iránymező-felfedező (a megoldás „úszik” az érintődarabkákon!)</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        <button type="button" className={eq === 'yx' ? 'btn-active' : ''} onClick={() => { setEq('yx'); setY0(0.7); }}>
          y&apos; = y − x
        </button>
        <button type="button" className={eq === 'circle' ? 'btn-active' : ''} onClick={() => { setEq('circle'); setY0(1.5); }}>
          y&apos; = −x/y
        </button>
        <button type="button" className={eq === 'log' ? 'btn-active' : ''} onClick={() => { setEq('log'); setY0(0.4); }}>
          y&apos; = y(2−y)
        </button>
        <button type="button" className={eq === 'cos' ? 'btn-active' : ''} onClick={() => { setEq('cos'); setY0(0); }}>
          y&apos; = cos x
        </button>
        <label style={{ fontSize: 13 }}>
          y(0) = <strong>{round(y0, 1)}</strong>{' '}
          <input type="range" min={-1.8} max={2.2} step={0.1} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={cfg.xmin} xmax={cfg.xmax} ymin={cfg.ymin} ymax={cfg.ymax} w={560} h={210}>
        {({ X, Y }) => {
          const segs: JSX.Element[] = [];
          const nx = 16;
          const ny = 10;
          const halfLenPx = 8;
          for (let ix = 0; ix <= nx; ix++) {
            const x = cfg.xmin + ((cfg.xmax - cfg.xmin) * ix) / nx;
            for (let iy = 0; iy <= ny; iy++) {
              const y = cfg.ymin + ((cfg.ymax - cfg.ymin) * iy) / ny;
              const m = cfg.f(x, y);
              if (!Number.isFinite(m)) continue;
              const px = X(x);
              const py = Y(y);
              // pixel slope: dy_px / dx_px = -m * (scaleY / scaleX)
              const scaleX = (X(cfg.xmax) - X(cfg.xmin)) / (cfg.xmax - cfg.xmin);
              const scaleY = (Y(cfg.ymin) - Y(cfg.ymax)) / (cfg.ymax - cfg.ymin);
              const dx = 1;
              const dy = -m * (scaleY / scaleX);
              const norm = Math.hypot(dx, dy);
              const ux = (dx / norm) * halfLenPx;
              const uy = (dy / norm) * halfLenPx;
              segs.push(
                <line
                  key={`${ix}-${iy}`}
                  x1={px - ux}
                  y1={py - uy}
                  x2={px + ux}
                  y2={py + uy}
                  stroke="#64748b"
                  strokeWidth={1.3}
                />,
              );
            }
          }
          const pathD = fullPts
            .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`)
            .join(' ');
          return (
            <>
              {segs}
              {pathD && <path d={pathD} fill="none" stroke="#34d399" strokeWidth={2.6} />}
              <circle cx={X(cfg.xStart)} cy={Y(y0)} r={4.5} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Iránymező-olvasás 3 alapesete */

export function IsoclinePatternDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Iránymező-olvasás 3 másodperc alatt: a szimmetriák elárulják az egyenletet!</div>
      <svg viewBox="0 0 560 154" className="plane" role="img" aria-label="Három iránymező-felismerési szabály">
        <rect width={560} height={154} className="pl-bg" />

        <g transform="translate(12, 12)">
          <rect width={170} height={130} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={85} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Csak x-től függ: y&apos; = g(x)</text>
          <text x={85} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Függőleges oszlopokban</text>
          <text x={85} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={10}>minden pálcika PÁRHUZAMOS!</text>
          <text x={85} y={92} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Pl. y&apos; = cos x, y&apos; = 2x</text>
          <text x={85} y={114} textAnchor="middle" fill="#38bdf8" fontSize={9.5}>Megoldás: sima integrálás!</text>
        </g>

        <g transform="translate(195, 12)">
          <rect width={170} height={130} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={85} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>Csak y-tól függ: y&apos; = H(y)</text>
          <text x={85} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Vízszintes sorokban</text>
          <text x={85} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={10}>minden pálcika PÁRHUZAMOS!</text>
          <text x={85} y={92} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Pl. y&apos; = y(2−y) (autonóm)</text>
          <text x={85} y={114} textAnchor="middle" fill="#34d399" fontSize={9.5}>Egyensúly: H(y) = 0 sorok!</text>
        </g>

        <g transform="translate(378, 12)">
          <rect width={170} height={130} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.5} />
          <text x={85} y={22} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={700}>Mindkettőtől: y&apos; = f(x, y)</text>
          <text x={85} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Keresd a nulla-izoklinát:</text>
          <text x={85} y={62} textAnchor="middle" fill="#fde68a" fontSize={10}>hol vízszintesek (f = 0)?</text>
          <text x={85} y={92} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Pl. y&apos; = y − x ⇒ y = x mentén</text>
          <text x={85} y={114} textAnchor="middle" fill="#f59e0b" fontSize={9.5}>minden érintő vízszintes!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Szeparábilis 4 lépéses recept */

export function SeparationStepFlowDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A szétválasztható differenciálegyenlet 4 lépéses receptje</div>
      <svg viewBox="0 0 560 144" className="plane" role="img" aria-label="Szeparábilis egyenlet 4 lépése">
        <rect width={560} height={144} className="pl-bg" />

        <g transform="translate(12, 18)">
          <rect width={120} height={106} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={60} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>1. Faktorizálás</text>
          <text x={60} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>dy/dx = g(x)·H(y)</text>
          <text x={60} y={76} textAnchor="middle" fill="#94a3b8" fontSize={9}>Szorzattá bontás</text>
          <text x={60} y={92} textAnchor="middle" fill="#94a3b8" fontSize={9}>(csak x) × (csak y)</text>
        </g>

        <path d="M135,71 L150,71" stroke="#64748b" strokeWidth={2} />
        <polygon points="150,67 157,71 150,75" fill="#64748b" />

        <g transform="translate(159, 18)">
          <rect width={124} height={106} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.5} />
          <text x={62} y={22} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={700}>2. Szétválasztás</text>
          <text x={62} y={48} textAnchor="middle" fill="#fde68a" fontSize={10.5}>dy / H(y) = g(x) dx</text>
          <text x={62} y={76} textAnchor="middle" fill="#fb7185" fontSize={9}>H(y) = 0 gyökeit</text>
          <text x={62} y={92} textAnchor="middle" fill="#fb7185" fontSize={9}>külön mentsd el!</text>
        </g>

        <path d="M286,71 L301,71" stroke="#64748b" strokeWidth={2} />
        <polygon points="301,67 308,71 301,75" fill="#64748b" />

        <g transform="translate(310, 18)">
          <rect width={116} height={106} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={58} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>3. Integrálás</text>
          <text x={58} y={48} textAnchor="middle" fill="#a7f3d0" fontSize={10.5}>∫ dy/H = ∫ g dx</text>
          <text x={58} y={76} textAnchor="middle" fill="#e2e8f0" fontSize={9}>Elég EGYETLEN</text>
          <text x={58} y={92} textAnchor="middle" fill="#e2e8f0" fontSize={9}>+ C az x-oldalra!</text>
        </g>

        <path d="M429,71 L444,71" stroke="#64748b" strokeWidth={2} />
        <polygon points="444,67 451,71 444,75" fill="#64748b" />

        <g transform="translate(453, 18)">
          <rect width={96} height={106} rx={8} fill="#0f172a" stroke="#a78bfa" strokeWidth={1.5} />
          <text x={48} y={22} textAnchor="middle" fill="#a78bfa" fontSize={11} fontWeight={700}>4. Kezdeti érték</text>
          <text x={48} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>(x₀, y₀) → C</text>
          <text x={48} y={76} textAnchor="middle" fill="#c4b5fd" fontSize={9}>Ha lehet, fejezd</text>
          <text x={48} y={92} textAnchor="middle" fill="#c4b5fd" fontSize={9}>ki y(x)-et!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Elveszett megoldás + blow-up (y' = y²) */

export function EquilibriumAndBlowupWidget() {
  const [y0, setY0] = useState(0.5);

  const sol = (x: number) => {
    if (Math.abs(y0) < 1e-6) return 0;
    const denom = 1 / y0 - x;
    if (Math.abs(denom) < 0.08) return NaN;
    return 1 / denom;
  };

  return (
    <div className="widget">
      <div className="widget-title">
        Az elveszett <M t="y\equiv 0" /> megoldás és a véges idejű robbanás (<M t="y' = y^2" />)
      </div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <label style={{ fontSize: 13 }}>
          y(0) = <strong>{round(y0, 2)}</strong>{' '}
          <input type="range" min={-1.0} max={1.0} step={0.1} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
        </label>
        <button type="button" onClick={() => setY0(0)}>
          y(0) = 0 (elveszett egyensúly!)
        </button>
      </div>

      <Chart xmin={-2.5} xmax={3.5} ymin={-3.5} ymax={5.5} w={560} h={185}>
        {({ X, Y }) => (
          <>
            <line x1={X(-2.5)} x2={X(3.5)} y1={Y(0)} y2={Y(0)} stroke="#34d399" strokeWidth={1.4} strokeDasharray="4 3" />
            {y0 > 0.05 && (
              <>
                <line x1={X(1 / y0)} x2={X(1 / y0)} y1={Y(-3.5)} y2={Y(5.5)} stroke="#fb7185" strokeDasharray="4 3" strokeWidth={1.6} />
                <text x={X(1 / y0) + 4} y={Y(4.5)} fill="#fb7185" fontSize={10}>
                  robbanás: x = {tx(1 / y0, 2)}
                </text>
              </>
            )}
            <path
              d={buildPath(sol, -2.5, y0 > 0.05 ? Math.min(3.5, 1 / y0 - 0.09) : 3.5, X, Y, 180)}
              fill="none"
              stroke={Math.abs(y0) < 0.05 ? '#34d399' : y0 > 0 ? '#fb7185' : '#38bdf8'}
              strokeWidth={2.6}
            />
            <circle cx={X(0)} cy={Y(y0)} r={4.5} fill="#fbbf24" />
          </>
        )}
      </Chart>
      <div className="widget-note">
        {Math.abs(y0) < 0.05
          ? 'y ≡ 0 az elveszett (szinguláris) megoldás! A y = −1/(x+C) képlet egyetlen véges C-vel sem adja ki.'
          : y0 > 0
            ? `Pozitív y(0) esetén y(x) = 1/(1/y₀ − x) véges idő alatt (x = ${round(1 / y0, 2)}) végtelenbe szökik!`
            : 'Negatív y(0) esetén a megoldás x → +∞-re szelíden 0-hoz tart.'}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Ortogonális trajektóriák */

export function OrthogonalTrajectoriesWidget() {
  const [pair, setPair] = useState<'circles' | 'ellipses'>('circles');

  return (
    <div className="widget">
      <div className="widget-title">Ortogonális trajektóriák: minden metszéspontban pontosan 90°!</div>
      <div className="widget-controls" style={{ display: 'flex', gap: 8 }}>
        <button type="button" className={pair === 'circles' ? 'btn-active' : ''} onClick={() => setPair('circles')}>
          Sugarak y = kx  ⊥  Körök x² + y² = R²
        </button>
        <button type="button" className={pair === 'ellipses' ? 'btn-active' : ''} onClick={() => setPair('ellipses')}>
          Parabolák y = cx²  ⊥  Ellipszisek x² + 2y² = k
        </button>
      </div>

      <Chart xmin={-3.2} xmax={3.2} ymin={-2.6} ymax={2.6} w={560} h={195}>
        {({ X, Y }) =>
          pair === 'circles' ? (
            <>
              {[-2, -0.8, 0, 0.8, 2].map((k) => (
                <path key={k} d={buildPath((x) => k * x, -3.2, 3.2, X, Y, 40)} fill="none" stroke="#38bdf8" strokeWidth={1.6} />
              ))}
              {[0.7, 1.4, 2.1].map((r) => (
                <ellipse
                  key={r}
                  cx={X(0)}
                  cy={Y(0)}
                  rx={Math.abs(X(r) - X(0))}
                  ry={Math.abs(Y(0) - Y(r))}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
              ))}
            </>
          ) : (
            <>
              {[-1.2, -0.5, 0.5, 1.2].map((c) => (
                <path key={c} d={buildPath((x) => c * x * x, -2.8, 2.8, X, Y, 80)} fill="none" stroke="#38bdf8" strokeWidth={1.6} />
              ))}
              {[1.2, 3.0, 5.5].map((k) => (
                <ellipse
                  key={k}
                  cx={X(0)}
                  cy={Y(0)}
                  rx={Math.abs(X(Math.sqrt(k)) - X(0))}
                  ry={Math.abs(Y(0) - Y(Math.sqrt(k / 2)))}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
              ))}
            </>
          )
        }
      </Chart>
      <div className="widget-note">
        Ha az eredeti sereg egyenlete y&apos; = f(x, y), a rá merőleges seregé y&apos; = −1 / f(x, y)!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Torricelli-tartály szimulátor */

export function TorricelliTankWidget() {
  const [t, setT] = useState(80);
  const tMax = 90 * Math.PI; // ~282.74 perc
  const h = Math.max(0, (2 - t / (45 * Math.PI)) ** 2);
  const rate = 0.1 * Math.sqrt(h);

  return (
    <div className="widget">
      <div className="widget-title">Thomas 5. példa — Torricelli törvénye: tartály kiürítése (r = 1,5 m, h₀ = 4 m)</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <label style={{ fontSize: 13 }}>
          Idő t = <strong>{round(t, 0)} perc</strong> (teljes ürülés: 90π ≈ 283 perc){' '}
          <input type="range" min={0} max={283} step={3} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, alignItems: 'center', marginTop: 6 }}>
        <svg viewBox="0 0 130 155" style={{ width: '100%', background: '#0f172a', borderRadius: 8, border: '1px solid #334155' }}>
          <rect x={22} y={18} width={86} height={112} fill="none" stroke="#94a3b8" strokeWidth={2} />
          <rect
            x={23}
            y={18 + 112 * (1 - h / 4)}
            width={84}
            height={112 * (h / 4)}
            fill="rgba(56,189,248,0.45)"
          />
          <text x={65} y={145} textAnchor="middle" fill="#e2e8f0" fontSize={10.5} fontWeight={700}>
            h = {round(h, 2)} m
          </text>
        </svg>

        <Chart xmin={0} xmax={300} ymin={-0.2} ymax={4.4} w={400} h={155}>
          {({ X, Y }) => (
            <>
              <path
                d={buildPath((tt) => (tt >= tMax ? 0 : (2 - tt / (45 * Math.PI)) ** 2), 0, 290, X, Y, 120)}
                fill="none"
                stroke="#38bdf8"
                strokeWidth={2.5}
              />
              <circle cx={X(t)} cy={Y(h)} r={4.8} fill="#fbbf24" />
            </>
          )}
        </Chart>
      </div>
      <div className="widget-note">
        t = {round(t, 0)} percnél a vízmagasság h(t) = {round(h, 2)} m, a kifolyás sebessége 0,1√h = {round(rate, 3)} m³/perc. A víz felső fele (4 m → 2 m) már {round(90 * Math.PI * (1 - Math.SQRT1_2), 0)} perc alatt lefolyik — a teljes időnek kevesebb mint 30%-a!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. oldal (8. ábra): Szeparábilis vagy nem? */

export function SeparableCheckChecklistDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Gyors felismerő: szeparábilis-e az egyenlet?</div>
      <svg viewBox="0 0 560 152" className="plane" role="img" aria-label="Szeparábilis és nem szeparábilis példák">
        <rect width={560} height={152} className="pl-bg" />

        <g transform="translate(12, 12)">
          <rect width={262} height={128} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>SZEPARÁBILIS ✓ (9.1 módszer)</text>
          <text x={18} y={48} fill="#e2e8f0" fontSize={10.5}>• y&apos; = eˣ⁺ʸ = eˣ · eʸ  (hatványozás!)</text>
          <text x={18} y={74} fill="#e2e8f0" fontSize={10.5}>• y&apos; = xy + x + y + 1 = (x+1)(y+1)</text>
          <text x={18} y={100} fill="#e2e8f0" fontSize={10.5}>• y&apos; = (1 + y²) eˣ  (tiszta szorzat)</text>
        </g>

        <g transform="translate(286, 12)">
          <rect width={262} height={128} rx={8} fill="#0f172a" stroke="#fb7185" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#fb7185" fontSize={11.5} fontWeight={700}>NEM SZEPARÁBILIS ✗</text>
          <text x={18} y={48} fill="#e2e8f0" fontSize={10.5}>• y&apos; = y − x  (összeg → 9.2 lineáris!)</text>
          <text x={18} y={74} fill="#e2e8f0" fontSize={10.5}>• y&apos; = x² + y²  (nem bontható szorzatba)</text>
          <text x={18} y={100} fill="#e2e8f0" fontSize={10.5}>• y&apos; = sin(x + y)  (összeg a szinuszban)</text>
        </g>
      </svg>
    </div>
  );
}
