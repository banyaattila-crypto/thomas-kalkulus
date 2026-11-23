import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

function buildPath(fn: (x: number) => number, xmin: number, xmax: number, sx: (x: number) => number, sy: (y: number) => number, steps = 160) {
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

function buildParamPath(
  fx: (t: number) => number,
  fy: (t: number) => number,
  tmin: number,
  tmax: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
  steps = 160,
) {
  let d = '';
  let pen = false;
  for (let i = 0; i <= steps; i++) {
    const t = tmin + ((tmax - tmin) * i) / steps;
    const x = fx(t);
    const y = fy(t);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
    pen = true;
  }
  return d;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Horizontális teszt */

type HltKind = 'x3' | 'sqrt' | 'x2' | 'x2pos' | 'sin';

export function HorizontalLineTestWidget() {
  const [kind, setKind] = useState<HltKind>('x2');
  const [c, setC] = useState(1.5);

  const selectKind = (k: HltKind) => {
    setKind(k);
    if (k === 'sin') setC(0.5);
    else if (k === 'sqrt') setC(1.2);
    else if (k === 'x3') setC(1.0);
    else setC(1.5);
  };

  const bounds =
    kind === 'sin'
      ? { xmin: -3.6, xmax: 3.6, ymin: -1.6, ymax: 1.6, cmin: -1.3, cmax: 1.3 }
      : kind === 'sqrt'
      ? { xmin: -0.6, xmax: 5.5, ymin: -0.6, ymax: 2.8, cmin: -0.3, cmax: 2.3 }
      : { xmin: -2.6, xmax: 2.6, ymin: -2.5, ymax: 4.2, cmin: -2.0, cmax: 3.6 };

  const safeC = Math.min(bounds.cmax, Math.max(bounds.cmin, c));

  // Metszéspontok kiszámítása
  const hits: number[] = [];
  if (kind === 'x3') {
    const r = Math.cbrt(safeC);
    if (r >= bounds.xmin && r <= bounds.xmax) hits.push(r);
  } else if (kind === 'sqrt') {
    if (safeC >= 0) {
      const r = safeC * safeC;
      if (r <= bounds.xmax) hits.push(r);
    }
  } else if (kind === 'x2') {
    if (safeC > 0) {
      const r = Math.sqrt(safeC);
      if (r <= bounds.xmax) {
        hits.push(-r, r);
      }
    } else if (Math.abs(safeC) < 1e-6) {
      hits.push(0);
    }
  } else if (kind === 'x2pos') {
    if (safeC >= 0) {
      const r = Math.sqrt(safeC);
      if (r <= bounds.xmax) hits.push(r);
    }
  } else {
    if (Math.abs(safeC) <= 1) {
      const a0 = Math.asin(safeC);
      const candidates = [a0, Math.PI - a0, -Math.PI - a0, a0 + 2 * Math.PI, a0 - 2 * Math.PI];
      for (const x of candidates) {
        if (x >= bounds.xmin && x <= bounds.xmax && !hits.some((h) => Math.abs(h - x) < 1e-3)) {
          hits.push(x);
        }
      }
      hits.sort((u, v) => u - v);
    }
  }

  const isInjective = kind === 'x3' || kind === 'sqrt' || kind === 'x2pos';

  return (
    <div className="widget">
      <div className="widget-title">Interaktív horizontális teszt — hány pontban metszi az y = c egyenes a grafikont?</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'x2' ? 'on' : ''} onClick={() => selectKind('x2')}>
          y = x² (teljes ℝ)
        </button>
        <button type="button" className={kind === 'x2pos' ? 'on' : ''} onClick={() => selectKind('x2pos')}>
          y = x² (x ≥ 0 szűkítés!)
        </button>
        <button type="button" className={kind === 'x3' ? 'on' : ''} onClick={() => selectKind('x3')}>
          y = x³
        </button>
        <button type="button" className={kind === 'sqrt' ? 'on' : ''} onClick={() => selectKind('sqrt')}>
          y = √x
        </button>
        <button type="button" className={kind === 'sin' ? 'on' : ''} onClick={() => selectKind('sin')}>
          y = sin x
        </button>
      </div>

      <label>
        Vízszintes próbaegyenes magassága: <M t={`y = c = ${tx(safeC, 2)}`} />
        <input
          type="range"
          min={bounds.cmin}
          max={bounds.cmax}
          step={0.1}
          value={safeC}
          onChange={(e) => setC(Number(e.target.value))}
        />
      </label>

      <Chart xmin={bounds.xmin} xmax={bounds.xmax} ymin={bounds.ymin} ymax={bounds.ymax} h={220}>
        {(m) => {
          const fn = (x: number) => {
            if (kind === 'x3') return x * x * x;
            if (kind === 'sqrt') return x >= 0 ? Math.sqrt(x) : Number.NaN;
            if (kind === 'x2') return x * x;
            if (kind === 'x2pos') return x >= 0 ? x * x : Number.NaN;
            return Math.sin(x);
          };
          const dCurve = buildPath(fn, bounds.xmin, bounds.xmax, m.X, m.Y, 200);
          const dGhost =
            kind === 'x2pos' ? buildPath((x) => (x <= 0 ? x * x : Number.NaN), bounds.xmin, 0, m.X, m.Y, 80) : '';
          return (
            <>
              {dGhost && (
                <path d={dGhost} fill="none" stroke="#64748b" strokeWidth={1.6} strokeDasharray="4 4" opacity={0.6} />
              )}
              <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <line
                x1={m.X(bounds.xmin)}
                y1={m.Y(safeC)}
                x2={m.X(bounds.xmax)}
                y2={m.Y(safeC)}
                stroke={hits.length > 1 ? '#f87171' : '#fbbf24'}
                strokeWidth={2}
                strokeDasharray="6 4"
              />
              {hits.map((x, idx) => (
                <g key={idx}>
                  <line
                    x1={m.X(x)}
                    y1={m.Y(safeC)}
                    x2={m.X(x)}
                    y2={m.Y(0)}
                    stroke={hits.length > 1 ? '#f87171' : '#34d399'}
                    strokeWidth={1.3}
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={m.X(x)}
                    cy={m.Y(safeC)}
                    r={5.5}
                    fill={hits.length > 1 ? '#f87171' : '#34d399'}
                    stroke="#0f172a"
                    strokeWidth={1.6}
                  />
                </g>
              ))}
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Metszéspontok száma ennél a magasságnál: <strong>{hits.length}</strong>
          {hits.length > 0 && (
            <>
              {' '}
              (<M t={hits.map((x, i) => `x_${i + 1} \\approx ${tx(x, 2)}`).join(',\\; ')} />)
            </>
          )}
          .{' '}
          {isInjective ? (
            <span style={{ color: '#34d399', fontWeight: 700 }}>
              ✓ Injektív: BÁRMELY vízszintes egyenes legfeljebb 1 pontban metszi!
            </span>
          ) : hits.length > 1 ? (
            <span style={{ color: '#f87171', fontWeight: 700 }}>
              ✗ Nem injektív: több különböző x-hez is ugyanez az y = {round(safeC, 2)} tartozik!
            </span>
          ) : (
            <span style={{ color: '#fbbf24', fontWeight: 700 }}>
              ⚠ Ez a függvény összességében NEM injektív — tologasd feljebb/beljebb a csúszkát, hogy lásd a kettős metszést!
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 1. oldal (2. ábra): Nyíldiagram (injektív vs. nem injektív) */

export function MappingArrowDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Miért csak az injektív függvény fordítható vissza? — Nyíldiagram</div>
      <svg viewBox="0 0 560 185" className="plane" role="img" aria-label="Injektív és nem injektív leképezés összehasonlítása">
        <rect width={560} height={185} className="pl-bg" />

        {/* Bal oldal: Injektív (f(x) = x^3) */}
        <text x={138} y={22} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>
          ✓ Injektív: f(x) = x³ (visszafordítható)
        </text>
        <ellipse cx={68} cy={104} rx={36} ry={62} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.6} />
        <ellipse cx={208} cy={104} rx={36} ry={62} fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth={1.6} />
        <text x={68} y={178} textAnchor="middle" fill="#7dd3fc" fontSize={11}>D (bemenet)</text>
        <text x={208} y={178} textAnchor="middle" fill="#6ee7b7" fontSize={11}>R (kimenet)</text>

        {[
          { y: 68, a: '−2', b: '−8' },
          { y: 104, a: '1', b: '1' },
          { y: 140, a: '2', b: '8' },
        ].map((row, i) => (
          <g key={i}>
            <text x={68} y={row.y + 4} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>{row.a}</text>
            <text x={208} y={row.y + 4} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>{row.b}</text>
            <line x1={88} y1={row.y - 3} x2={184} y2={row.y - 3} stroke="#38bdf8" strokeWidth={1.8} />
            <polygon points={`188,${row.y - 3} 180,${row.y - 7} 180,${row.y + 1}`} fill="#38bdf8" />
            <line x1={188} y1={row.y + 5} x2={92} y2={row.y + 5} stroke="#34d399" strokeWidth={1.5} strokeDasharray="4 2" />
            <polygon points={`88,${row.y + 5} 96,${row.y + 1} 96,${row.y + 9}`} fill="#34d399" />
          </g>
        ))}
        <text x={138} y={54} textAnchor="middle" fill="#38bdf8" fontSize={10.5}>f →</text>
        <text x={138} y={160} textAnchor="middle" fill="#34d399" fontSize={10.5}>← f⁻¹ (egyértelmű!)</text>

        {/* Elválasztó */}
        <line x1={280} y1={16} x2={280} y2={172} stroke="#334155" strokeWidth={1.5} strokeDasharray="4 4" />

        {/* Jobb oldal: Nem injektív (g(x) = x^2) */}
        <text x={422} y={22} textAnchor="middle" fill="#f87171" fontSize={12.5} fontWeight={700}>
          ✗ Nem injektív: g(x) = x² (ütközés!)
        </text>
        <ellipse cx={352} cy={104} rx={36} ry={62} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.6} />
        <ellipse cx={492} cy={104} rx={36} ry={62} fill="rgba(248,113,113,0.12)" stroke="#f87171" strokeWidth={1.6} />
        <text x={352} y={178} textAnchor="middle" fill="#7dd3fc" fontSize={11}>D (bemenet)</text>
        <text x={492} y={178} textAnchor="middle" fill="#fca5a5" fontSize={11}>R (kimenet)</text>

        <text x={352} y={72} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>−2</text>
        <text x={352} y={108} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>+2</text>
        <text x={352} y={144} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>3</text>
        <text x={492} y={90} textAnchor="middle" fill="#fca5a5" fontSize={13} fontWeight={700}>4</text>
        <text x={492} y={144} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>9</text>

        {/* Két nyíl a 4-re */}
        <line x1={372} y1={68} x2={470} y2={84} stroke="#f87171" strokeWidth={2} />
        <polygon points="474,85 465,80 466,88" fill="#f87171" />
        <line x1={372} y1={104} x2={470} y2={90} stroke="#f87171" strokeWidth={2} />
        <polygon points="474,89 465,86 466,94" fill="#f87171" />

        <line x1={372} y1={140} x2={470} y2={140} stroke="#38bdf8" strokeWidth={1.8} />
        <polygon points="474,140 466,136 466,144" fill="#38bdf8" />

        <text x={424} y={122} textAnchor="middle" fill="#fca5a5" fontSize={10.5} fontWeight={700}>
          g⁻¹(4) = −2 vagy +2 ?!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (3. ábra): Függvénygép és inverzgép */

type MachineKind = 'lin' | 'cub' | 'rat';

export function InverseMachineWidget() {
  const [kind, setKind] = useState<MachineKind>('lin');
  const [x, setX] = useState(2.0);

  const info =
    kind === 'lin'
      ? {
          name: 'f(x) = ½x + 1',
          invName: 'f⁻¹(y) = 2y − 2',
          f: (v: number) => 0.5 * v + 1,
          finv: (v: number) => 2 * v - 2,
          xmin: -4,
          xmax: 6,
          dom: 'ℝ',
          rng: 'ℝ',
        }
      : kind === 'cub'
      ? {
          name: 'f(x) = x³ − 2',
          invName: 'f⁻¹(y) = ∛(y + 2)',
          f: (v: number) => v * v * v - 2,
          finv: (v: number) => Math.cbrt(v + 2),
          xmin: -2.5,
          xmax: 2.5,
          dom: 'ℝ',
          rng: 'ℝ',
        }
      : {
          name: 'f(x) = (2x + 1)/(x − 1)',
          invName: 'f⁻¹(y) = (y + 1)/(y − 2)',
          f: (v: number) => (2 * v + 1) / (v - 1),
          finv: (v: number) => (v + 1) / (v - 2),
          xmin: 1.5,
          xmax: 6.0,
          dom: 'ℝ \\ {1}',
          rng: 'ℝ \\ {2}',
        };

  const safeX = Math.min(info.xmax, Math.max(info.xmin, x));
  const y = info.f(safeX);
  const back = info.finv(y);

  const selectKind = (k: MachineKind) => {
    setKind(k);
    setX(k === 'rat' ? 3.0 : 2.0);
  };

  return (
    <div className="widget">
      <div className="widget-title">A kétoldali semlegesítés: f⁻¹(f(x)) = x — interaktív függvénygép</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'lin' ? 'on' : ''} onClick={() => selectKind('lin')}>
          f(x) = ½x + 1
        </button>
        <button type="button" className={kind === 'cub' ? 'on' : ''} onClick={() => selectKind('cub')}>
          f(x) = x³ − 2
        </button>
        <button type="button" className={kind === 'rat' ? 'on' : ''} onClick={() => selectKind('rat')}>
          f(x) = (2x+1)/(x−1)
        </button>
      </div>

      <label>
        Bemeneti szám: <M t={`x = ${tx(safeX, 2)}`} />
        <input
          type="range"
          min={info.xmin}
          max={info.xmax}
          step={0.25}
          value={safeX}
          onChange={(e) => setX(Number(e.target.value))}
        />
      </label>

      <svg viewBox="0 0 560 148" className="plane" role="img" aria-label="Függvénygép és inverz függvénygép folyamatábrája">
        <rect width={560} height={148} className="pl-bg" />

        {/* Bemenet */}
        <circle cx={46} cy={68} r={26} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={2} />
        <text x={46} y={64} textAnchor="middle" fill="#7dd3fc" fontSize={10}>bemenet</text>
        <text x={46} y={79} textAnchor="middle" fill="#f8fafc" fontSize={13} fontWeight={700}>{round(safeX, 2)}</text>

        {/* Nyíl 1 */}
        <line x1={74} y1={68} x2={106} y2={68} stroke="#94a3b8" strokeWidth={2.2} />
        <polygon points="112,68 103,63 103,73" fill="#94a3b8" />

        {/* f doboz */}
        <rect x={114} y={36} width={122} height={64} rx={10} fill="#0f172a" stroke="#38bdf8" strokeWidth={2.2} />
        <text x={175} y={62} textAnchor="middle" fill="#38bdf8" fontSize={12.5} fontWeight={700}>f gép</text>
        <text x={175} y={82} textAnchor="middle" fill="#cbd5e1" fontSize={11}>{info.name}</text>

        {/* Nyíl 2 */}
        <line x1={238} y1={68} x2={262} y2={68} stroke="#fbbf24" strokeWidth={2.2} />
        <polygon points="268,68 259,63 259,73" fill="#fbbf24" />

        {/* Köztes y */}
        <rect x={270} y={44} width={68} height={48} rx={8} fill="rgba(251,191,36,0.16)" stroke="#fbbf24" strokeWidth={1.8} />
        <text x={304} y={62} textAnchor="middle" fill="#fde68a" fontSize={10}>y = f(x)</text>
        <text x={304} y={80} textAnchor="middle" fill="#f8fafc" fontSize={12.5} fontWeight={700}>{round(y, 2)}</text>

        {/* Nyíl 3 */}
        <line x1={340} y1={68} x2={364} y2={68} stroke="#34d399" strokeWidth={2.2} />
        <polygon points="370,68 361,63 361,73" fill="#34d399" />

        {/* f^-1 doboz */}
        <rect x={372} y={36} width={112} height={64} rx={10} fill="#0f172a" stroke="#34d399" strokeWidth={2.2} />
        <text x={428} y={62} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>f⁻¹ gép</text>
        <text x={428} y={82} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>{info.invName}</text>

        {/* Nyíl 4 + Kimenet */}
        <line x1={486} y1={68} x2={502} y2={68} stroke="#34d399" strokeWidth={2.2} />
        <circle cx={528} cy={68} r={24} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={2} />
        <text x={528} y={64} textAnchor="middle" fill="#6ee7b7" fontSize={9.5}>vissza!</text>
        <text x={528} y={79} textAnchor="middle" fill="#f8fafc" fontSize={13} fontWeight={700}>{round(back, 2)}</text>

        {/* Tartománycsere sáv alul */}
        <text x={280} y={128} textAnchor="middle" fill="#94a3b8" fontSize={11.5}>
          Tartománycsere: D(f) = {info.dom} = R(f⁻¹)   ↔   R(f) = {info.rng} = D(f⁻¹)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (4. ábra): Tükrözés az y = x egyenesre */

type ReflKind = 'lin' | 'quad' | 'cub' | 'expLike';

export function ReflectionGraphWidget() {
  const [kind, setKind] = useState<ReflKind>('quad');
  const [a, setA] = useState(1.6);

  const cfg =
    kind === 'lin'
      ? {
          label: 'f(x) = ½x + 1  ↔  f⁻¹(x) = 2x − 2',
          f: (x: number) => 0.5 * x + 1,
          finv: (x: number) => 2 * x - 2,
          amin: -2.0,
          amax: 3.5,
          fmin: -3.5,
          fmax: 4.5,
          imin: -3.5,
          imax: 4.5,
          box: [-3.5, 4.5] as [number, number],
        }
      : kind === 'quad'
      ? {
          label: 'f(x) = x² (x ≥ 0)  ↔  f⁻¹(x) = √x',
          f: (x: number) => (x >= 0 ? x * x : Number.NaN),
          finv: (x: number) => (x >= 0 ? Math.sqrt(x) : Number.NaN),
          amin: 0.1,
          amax: 2.1,
          fmin: 0,
          fmax: 2.3,
          imin: 0,
          imax: 4.5,
          box: [-0.6, 4.5] as [number, number],
        }
      : kind === 'cub'
      ? {
          label: 'f(x) = x³  ↔  f⁻¹(x) = ∛x',
          f: (x: number) => x * x * x,
          finv: (x: number) => Math.cbrt(x),
          amin: -1.5,
          amax: 1.5,
          fmin: -1.7,
          fmax: 1.7,
          imin: -4.2,
          imax: 4.2,
          box: [-3.8, 3.8] as [number, number],
        }
      : {
          label: 'f(x) = x² − 1 (x ≥ 0)  ↔  f⁻¹(x) = √(x + 1)',
          f: (x: number) => (x >= 0 ? x * x - 1 : Number.NaN),
          finv: (x: number) => (x >= -1 ? Math.sqrt(x + 1) : Number.NaN),
          amin: 0.0,
          amax: 2.2,
          fmin: 0,
          fmax: 2.4,
          imin: -1,
          imax: 4.2,
          box: [-1.4, 4.2] as [number, number],
        };

  const safeA = Math.min(cfg.amax, Math.max(cfg.amin, a));
  const b = cfg.f(safeA);
  const [lo, hi] = cfg.box;

  const selectKind = (k: ReflKind) => {
    setKind(k);
    setA(k === 'cub' ? 1.2 : 1.6);
  };

  return (
    <div className="widget">
      <div className="widget-title">Tükrözés az y = x egyenesre — (a; b) ↔ (b; a) pontpárok</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'lin' ? 'on' : ''} onClick={() => selectKind('lin')}>
          ½x + 1 ↔ 2x − 2
        </button>
        <button type="button" className={kind === 'quad' ? 'on' : ''} onClick={() => selectKind('quad')}>
          x² (x ≥ 0) ↔ √x
        </button>
        <button type="button" className={kind === 'cub' ? 'on' : ''} onClick={() => selectKind('cub')}>
          x³ ↔ ∛x
        </button>
        <button type="button" className={kind === 'expLike' ? 'on' : ''} onClick={() => selectKind('expLike')}>
          x² − 1 (x ≥ 0) ↔ √(x+1)
        </button>
      </div>

      <label>
        Pont az f görbén: <M t={`a = ${tx(safeA, 2)}`} /> ⇒ <M t={`P(${tx(safeA, 2)};\\,${tx(b, 2)})`} /> és tükörképe{' '}
        <M t={`Q(${tx(b, 2)};\\,${tx(safeA, 2)})`} />
        <input
          type="range"
          min={cfg.amin}
          max={cfg.amax}
          step={0.05}
          value={safeA}
          onChange={(e) => setA(Number(e.target.value))}
        />
      </label>

      <Chart xmin={lo} xmax={hi} ymin={lo} ymax={hi} w={340} h={340}>
        {(m) => {
          const dF = buildPath(cfg.f, cfg.fmin, cfg.fmax, m.X, m.Y, 180);
          const dInv = buildPath(cfg.finv, cfg.imin, cfg.imax, m.X, m.Y, 180);
          const mid = (safeA + b) / 2;
          return (
            <>
              {/* y = x tükörtengely */}
              <line
                x1={m.X(lo)}
                y1={m.Y(lo)}
                x2={m.X(hi)}
                y2={m.Y(hi)}
                stroke="#94a3b8"
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
              <text x={m.X(hi - 0.65)} y={m.Y(hi - 0.35)} fill="#94a3b8" fontSize={11} fontWeight={700}>
                y = x
              </text>

              {/* f és f^-1 görbe */}
              <path d={dF} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <path d={dInv} fill="none" stroke="#34d399" strokeWidth={2.6} />

              {/* Tükör-összekötő szakasz */}
              <line
                x1={m.X(safeA)}
                y1={m.Y(b)}
                x2={m.X(b)}
                y2={m.Y(safeA)}
                stroke="#fbbf24"
                strokeWidth={1.8}
                strokeDasharray="4 3"
              />
              <circle cx={m.X(mid)} cy={m.Y(mid)} r={3} fill="#fbbf24" />

              {/* P(a, b) és Q(b, a) */}
              <circle cx={m.X(safeA)} cy={m.Y(b)} r={5.5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.6} />
              <circle cx={m.X(b)} cy={m.Y(safeA)} r={5.5} fill="#34d399" stroke="#0f172a" strokeWidth={1.6} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék görbe:</strong> <M t="y = f(x)" /> · <strong>Zöld görbe:</strong> <M t="y = f^{-1}(x)" /> ·{' '}
          <strong>Sárga szakasz:</strong> merőleges az <M t="y=x" /> egyenesre, és felezi azt a{' '}
          <M t={`\\left(${tx((safeA + b) / 2, 2)};\\,${tx((safeA + b) / 2, 2)}\\right)`} /> pontban!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (5. ábra): Reciprok meredekségek */

type SlopeKind = 'quad' | 'cub' | 'lin';

export function ReciprocalSlopeWidget() {
  const [kind, setKind] = useState<SlopeKind>('quad');
  const [a, setA] = useState(1.5);

  const cfg =
    kind === 'quad'
      ? {
          f: (x: number) => (x >= 0 ? x * x : Number.NaN),
          df: (x: number) => 2 * x,
          finv: (x: number) => (x >= 0 ? Math.sqrt(x) : Number.NaN),
          amin: 0.4,
          amax: 2.0,
          box: [-0.4, 4.4] as [number, number],
          fLatex: 'x^2\\;(x\\ge 0)',
          invLatex: '\\sqrt{x}',
        }
      : kind === 'cub'
      ? {
          f: (x: number) => 0.4 * x * x * x + 0.6 * x,
          df: (x: number) => 1.2 * x * x + 0.6,
          finv: null as ((x: number) => number) | null,
          amin: -1.4,
          amax: 1.5,
          box: [-3.2, 3.2] as [number, number],
          fLatex: '0{,}4x^3 + 0{,}6x',
          invLatex: 'f^{-1}(x)',
        }
      : {
          f: (x: number) => 0.5 * x + 1,
          df: () => 0.5,
          finv: (x: number) => 2 * x - 2,
          amin: -1.5,
          amax: 3.0,
          box: [-3.0, 4.2] as [number, number],
          fLatex: '\\tfrac{1}{2}x + 1',
          invLatex: '2x - 2',
        };

  const safeA = Math.min(cfg.amax, Math.max(cfg.amin, a));
  const b = cfg.f(safeA);
  const m1 = cfg.df(safeA);
  const m2 = 1 / m1;
  const [lo, hi] = cfg.box;

  const selectKind = (k: SlopeKind) => {
    setKind(k);
    setA(k === 'cub' ? 1.0 : 1.5);
  };

  // Meredekségi háromszög lépésköze
  const dx = 0.65;
  const dy = m1 * dx;

  return (
    <div className="widget">
      <div className="widget-title">Miért egymás reciprokai az érintők meredekségei? — Δx ↔ Δy csere!</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'quad' ? 'on' : ''} onClick={() => selectKind('quad')}>
          f(x) = x² ↔ √x
        </button>
        <button type="button" className={kind === 'cub' ? 'on' : ''} onClick={() => selectKind('cub')}>
          f(x) = 0,4x³ + 0,6x
        </button>
        <button type="button" className={kind === 'lin' ? 'on' : ''} onClick={() => selectKind('lin')}>
          f(x) = ½x + 1 ↔ 2x − 2
        </button>
      </div>

      <label>
        Érintési pont: <M t={`a = ${tx(safeA, 2)}`} /> (és <M t={`b = f(a) = ${tx(b, 2)}`} />)
        <input
          type="range"
          min={cfg.amin}
          max={cfg.amax}
          step={0.05}
          value={safeA}
          onChange={(e) => setA(Number(e.target.value))}
        />
      </label>

      <Chart xmin={lo} xmax={hi} ymin={lo} ymax={hi} w={340} h={340}>
        {(m) => {
          const dF = buildPath(cfg.f, kind === 'quad' ? 0 : lo, hi, m.X, m.Y, 180);
          const dInv = cfg.finv
            ? buildPath(cfg.finv, kind === 'quad' ? 0 : lo, hi, m.X, m.Y, 180)
            : buildParamPath(cfg.f, (t) => t, -2.2, 2.2, m.X, m.Y, 180);

          // Érintőszakaszok
          const tSpan = 1.1;
          const tan1 = { x1: safeA - tSpan, y1: b - m1 * tSpan, x2: safeA + tSpan, y2: b + m1 * tSpan };
          const tan2 = { x1: b - tSpan, y1: safeA - m2 * tSpan, x2: b + tSpan, y2: safeA + m2 * tSpan };

          return (
            <>
              <line x1={m.X(lo)} y1={m.Y(lo)} x2={m.X(hi)} y2={m.Y(hi)} stroke="#64748b" strokeWidth={1.3} strokeDasharray="5 4" />
              <path d={dF} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={dInv} fill="none" stroke="#34d399" strokeWidth={2.5} />

              {/* f érintője + meredekségi háromszög (Δx vízszintes, Δy függőleges) */}
              <line x1={m.X(tan1.x1)} y1={m.Y(tan1.y1)} x2={m.X(tan1.x2)} y2={m.Y(tan1.y2)} stroke="#7dd3fc" strokeWidth={1.8} />
              <polyline
                points={`${m.X(safeA)},${m.Y(b)} ${m.X(safeA + dx)},${m.Y(b)} ${m.X(safeA + dx)},${m.Y(b + dy)}`}
                fill="none"
                stroke="#fbbf24"
                strokeWidth={2}
              />

              {/* f^-1 érintője + tükrözött háromszög (Δy vízszintes, Δx függőleges!) */}
              <line x1={m.X(tan2.x1)} y1={m.Y(tan2.y1)} x2={m.X(tan2.x2)} y2={m.Y(tan2.y2)} stroke="#6ee7b7" strokeWidth={1.8} />
              <polyline
                points={`${m.X(b)},${m.Y(safeA)} ${m.X(b + dy)},${m.Y(safeA)} ${m.X(b + dy)},${m.Y(safeA + dx)}`}
                fill="none"
                stroke="#fbbf24"
                strokeWidth={2}
              />

              <circle cx={m.X(safeA)} cy={m.Y(b)} r={5.5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.5} />
              <circle cx={m.X(b)} cy={m.Y(safeA)} r={5.5} fill="#34d399" stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>f érintője</strong> az <M t={`(${tx(safeA, 2)};\\,${tx(b, 2)})`} /> pontban:{' '}
          <M t={`f'(${tx(safeA, 2)}) = ${tx(m1, 3)}`} />.
        </p>
        <p>
          <strong>f⁻¹ érintője</strong> a <M t={`(${tx(b, 2)};\\,${tx(safeA, 2)})`} /> pontban:{' '}
          <M t={`(f^{-1})'(${tx(b, 2)}) = \\dfrac{1}{${tx(m1, 3)}} = ${tx(m2, 3)}`} /> · Szorzatuk:{' '}
          <M t={`f'(a)\\cdot (f^{-1})'(b) = ${tx(m1 * m2, 2)}`} /> ✓
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (6. ábra): Vízszintes érintő -> Függőleges érintő */

export function HorizontalToVerticalTangentWidget() {
  const [a, setA] = useState(0.5);
  const b = a * a * a;
  const m1 = 3 * a * a;
  const isZero = Math.abs(a) < 1e-4;
  const m2 = isZero ? Number.POSITIVE_INFINITY : 1 / m1;

  return (
    <div className="widget">
      <div className="widget-title">Miért kell az f′(a) ≠ 0 feltétel? — f(x) = x³ és f⁻¹(x) = ∛x az origó közelében!</div>
      <label>
        Közelítsd a csúszkát 0-hoz: <M t={`a = ${tx(a, 2)}`} /> (<M t={`b = a^3 = ${tx(b, 3)}`} />)
        <input type="range" min={-1.1} max={1.1} step={0.05} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.2} xmax={2.2} ymin={-2.2} ymax={2.2} w={340} h={340}>
        {(m) => {
          const dF = buildPath((x) => x * x * x, -1.35, 1.35, m.X, m.Y, 160);
          const dInv = buildPath((x) => Math.cbrt(x), -2.2, 2.2, m.X, m.Y, 200);
          const len = 0.85;
          // Érintő egységvektorral, hogy függőlegesnél se robbanjon fel
          const n1 = Math.hypot(1, m1);
          const ux1 = 1 / n1;
          const uy1 = m1 / n1;
          const ux2 = uy1; // tükrözés az y=x-re!
          const uy2 = ux1;

          return (
            <>
              <line x1={m.X(-2.2)} y1={m.Y(-2.2)} x2={m.X(2.2)} y2={m.Y(2.2)} stroke="#64748b" strokeWidth={1.2} strokeDasharray="5 4" />
              <path d={dF} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={dInv} fill="none" stroke="#34d399" strokeWidth={2.5} />

              {/* f érintője */}
              <line
                x1={m.X(a - len * ux1)}
                y1={m.Y(b - len * uy1)}
                x2={m.X(a + len * ux1)}
                y2={m.Y(b + len * uy1)}
                stroke={isZero ? '#fbbf24' : '#7dd3fc'}
                strokeWidth={2.3}
              />
              {/* f^-1 érintője */}
              <line
                x1={m.X(b - len * ux2)}
                y1={m.Y(a - len * uy2)}
                x2={m.X(b + len * ux2)}
                y2={m.Y(a + len * uy2)}
                stroke={isZero ? '#f87171' : '#6ee7b7'}
                strokeWidth={2.3}
              />

              <circle cx={m.X(a)} cy={m.Y(b)} r={5.2} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.5} />
              <circle cx={m.X(b)} cy={m.Y(a)} r={5.2} fill={isZero ? '#f87171' : '#34d399'} stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        {isZero ? (
          <p style={{ color: '#fca5a5', fontWeight: 700 }}>
            ⚠ Az a = 0 helyen f′(0) = 0 (vízszintes érintő) ⇒ f⁻¹(x) = ∛x grafikonjának (0; 0)-ban FÜGGŐLEGES érintője van, ezért f⁻¹ itt NEM differenciálható!
          </p>
        ) : (
          <p>
            <M t={`f'(${tx(a, 2)}) = 3(${tx(a, 2)})^2 = ${tx(m1, 3)}`} /> ⇒{' '}
            <M t={`(f^{-1})'(${tx(b, 3)}) = \\dfrac{1}{${tx(m1, 3)}} = ${tx(m2, 2)}`} />.
            {Math.abs(a) <= 0.25 && ' (Nézd, milyen meredek lett a zöld érintő — tart a függőlegeshez!)'}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (7. ábra): Deriválás az inverz képlete NÉLKÜL */

type NoFormKind = 'c1' | 'c2' | 'c3';

export function NoFormulaDerivativeWidget() {
  const [kind, setKind] = useState<NoFormKind>('c2');
  const [a, setA] = useState(1.0);

  const cfg =
    kind === 'c1'
      ? {
          title: 'f(x) = x³ − 2',
          dfStr: '3x^2',
          f: (x: number) => x * x * x - 2,
          df: (x: number) => 3 * x * x,
          amin: 0.5,
          amax: 2.0,
          step: 0.5,
        }
      : kind === 'c2'
      ? {
          title: 'f(x) = x³ + 2x − 1',
          dfStr: '3x^2 + 2',
          f: (x: number) => x * x * x + 2 * x - 1,
          df: (x: number) => 3 * x * x + 2,
          amin: -1.5,
          amax: 1.5,
          step: 0.5,
        }
      : {
          title: 'f(x) = x⁵ + x + 1',
          dfStr: '5x^4 + 1',
          f: (x: number) => x ** 5 + x + 1,
          df: (x: number) => 5 * x ** 4 + 1,
          amin: -1.0,
          amax: 1.0,
          step: 0.5,
        };

  const safeA = Math.min(cfg.amax, Math.max(cfg.amin, a));
  const b = cfg.f(safeA);
  const fpa = cfg.df(safeA);
  const invDeriv = 1 / fpa;

  const selectKind = (k: NoFormKind) => {
    setKind(k);
    setA(k === 'c1' ? 2.0 : 1.0);
  };

  return (
    <div className="widget">
      <div className="widget-title">Deriválás az inverz képlete NÉLKÜL — 4 lépéses élő kalkulátor</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'c1' ? 'on' : ''} onClick={() => selectKind('c1')}>
          f(x) = x³ − 2
        </button>
        <button type="button" className={kind === 'c2' ? 'on' : ''} onClick={() => selectKind('c2')}>
          f(x) = x³ + 2x − 1
        </button>
        <button type="button" className={kind === 'c3' ? 'on' : ''} onClick={() => selectKind('c3')}>
          f(x) = x⁵ + x + 1
        </button>
      </div>

      <label>
        Válassz pontot: <M t={`a = ${tx(safeA, 1)}`} /> ⇒ célpont az inverznél: <M t={`b = f(a) = ${tx(b, 2)}`} />
        <input
          type="range"
          min={cfg.amin}
          max={cfg.amax}
          step={cfg.step}
          value={safeA}
          onChange={(e) => setA(Number(e.target.value))}
        />
      </label>

      <svg viewBox="0 0 560 140" className="plane" role="img" aria-label="4 lépéses recept az inverz deriváltjának képlet nélküli kiszámításához">
        <rect width={560} height={140} className="pl-bg" />

        {/* 1. lépés */}
        <rect x={12} y={18} width={122} height={104} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={73} y={38} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>1. Monoton?</text>
        <text x={73} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={11}>{cfg.title}</text>
        <text x={73} y={84} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>f′(x) &gt; 0</text>
        <text x={73} y={106} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>✓ Injektív!</text>

        {/* 2. lépés */}
        <rect x={148} y={18} width={122} height={104} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
        <text x={209} y={38} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>2. Keresd a-t!</text>
        <text x={209} y={64} textAnchor="middle" fill="#e2e8f0" fontSize={11}>f(a) = {round(b, 2)}</text>
        <text x={209} y={88} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>⇒ a = {round(safeA, 1)}</text>
        <text x={209} y={108} textAnchor="middle" fill="#94a3b8" fontSize={10}>f⁻¹({round(b, 2)}) = {round(safeA, 1)}</text>

        {/* 3. lépés */}
        <rect x={284} y={18} width={122} height={104} rx={8} fill="#0f172a" stroke="#a78bfa" strokeWidth={1.6} />
        <text x={345} y={38} textAnchor="middle" fill="#c4b5fd" fontSize={11} fontWeight={700}>3. f′(a) értéke</text>
        <text x={345} y={64} textAnchor="middle" fill="#e2e8f0" fontSize={11}>Behelyettesítés</text>
        <text x={345} y={84} textAnchor="middle" fill="#e2e8f0" fontSize={11}>a = {round(safeA, 1)}-ben:</text>
        <text x={345} y={106} textAnchor="middle" fill="#c4b5fd" fontSize={12} fontWeight={700}>f′(a) = {round(fpa, 2)}</text>

        {/* 4. lépés */}
        <rect x={420} y={18} width={128} height={104} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={2} />
        <text x={484} y={38} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>4. Reciprok!</text>
        <text x={484} y={64} textAnchor="middle" fill="#e2e8f0" fontSize={11}>(f⁻¹)′({round(b, 2)}) =</text>
        <text x={484} y={88} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>1 / {round(fpa, 2)}</text>
        <text x={484} y={108} textAnchor="middle" fill="#6ee7b7" fontSize={11}>≈ {round(invDeriv, 4)}</text>
      </svg>

      <div className="result">
        <p>
          Az <M t={`f'(x) = ${cfg.dfStr}`} /> deriváltat <strong>nem</strong> <M t={`b=${tx(b, 2)}`} />-ben, hanem{' '}
          <M t={`a=${tx(safeA, 1)}`} />-ban értékeltük ki! Így{' '}
          <M t={`(f^{-1})'(${tx(b, 2)}) = \\dfrac{1}{f'(${tx(safeA, 1)})} = \\dfrac{1}{${tx(fpa, 2)}} \\approx ${tx(invDeriv, 4)}`} />.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): Paraméterezés és Young-féle terület-tétel */

export function ParametricAndAreaWidget() {
  const [mode, setMode] = useState<'param' | 'area'>('param');
  const [t, setT] = useState(1.2);
  const [bVal, setBVal] = useState(2.0);

  // Paraméteres módhoz: f(t) = 0.5 t^3 + 0.5 t (nincs egyszerű inverz képlet!)
  const fP = (u: number) => 0.5 * u * u * u + 0.5 * u;
  // Terület módhoz: f(x) = x^2 az [a=0.5, bVal] szakaszon
  const a0 = 0.5;
  const fa0 = a0 * a0;
  const fb = bVal * bVal;
  const areaF = (bVal ** 3 - a0 ** 3) / 3;
  const areaInv = (2 / 3) * (fb ** 1.5 - fa0 ** 1.5);
  const rectDiff = bVal * fb - a0 * fa0;

  return (
    <div className="widget">
      <div className="widget-title">Paraméteres inverzrajzolás és a két görbe alatti területek összege</div>
      <div className="relbuttons chips">
        <button type="button" className={mode === 'param' ? 'on' : ''} onClick={() => setMode('param')}>
          1. Paraméteres inverz: (t; f(t)) ↔ (f(t); t)
        </button>
        <button type="button" className={mode === 'area' ? 'on' : ''} onClick={() => setMode('area')}>
          2. Terület-összefüggés: ∫ f + ∫ f⁻¹ = b·f(b) − a·f(a)
        </button>
      </div>

      {mode === 'param' ? (
        <>
          <label>
            Paraméter: <M t={`t = ${tx(t, 2)}`} /> ⇒ <M t={`f(t) = 0{,}5t^3 + 0{,}5t = ${tx(fP(t), 2)}`} />
            <input type="range" min={-1.5} max={1.5} step={0.05} value={t} onChange={(e) => setT(Number(e.target.value))} />
          </label>
          <Chart xmin={-3.0} xmax={3.0} ymin={-3.0} ymax={3.0} w={340} h={320}>
            {(m) => {
              const dF = buildParamPath((u) => u, fP, -1.6, 1.6, m.X, m.Y, 160);
              const dInv = buildParamPath(fP, (u) => u, -1.6, 1.6, m.X, m.Y, 160);
              const ft = fP(t);
              return (
                <>
                  <line x1={m.X(-3)} y1={m.Y(-3)} x2={m.X(3)} y2={m.Y(3)} stroke="#64748b" strokeWidth={1.3} strokeDasharray="5 4" />
                  <path d={dF} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
                  <path d={dInv} fill="none" stroke="#34d399" strokeWidth={2.5} />
                  <line x1={m.X(t)} y1={m.Y(ft)} x2={m.X(ft)} y2={m.Y(t)} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 3" />
                  <circle cx={m.X(t)} cy={m.Y(ft)} r={5.5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.5} />
                  <circle cx={m.X(ft)} cy={m.Y(t)} r={5.5} fill="#34d399" stroke="#0f172a" strokeWidth={1.5} />
                  <circle cx={m.X(t)} cy={m.Y(t)} r={4} fill="#fbbf24" />
                </>
              );
            }}
          </Chart>
          <div className="result">
            <p>
              Anélkül rajzoltuk meg a zöld <M t="f^{-1}" /> görbét, hogy felírtuk volna a képletét: egyszerűen{' '}
              <M t={`(x;\\,y) = (f(t);\\,t) = (${tx(fP(t), 2)};\\,${tx(t, 2)})`} />!
            </p>
          </div>
        </>
      ) : (
        <>
          <label>
            Felső határ (<M t="f(x)=x^2,\; a=0{,}5" />): <M t={`b = ${tx(bVal, 2)}`} /> (<M t={`f(b) = ${tx(fb, 2)}`} />)
            <input type="range" min={1.0} max={2.2} step={0.1} value={bVal} onChange={(e) => setBVal(Number(e.target.value))} />
          </label>
          <Chart xmin={-0.2} xmax={2.6} ymin={-0.3} ymax={5.2} w={420} h={240}>
            {(m) => {
              // Kék terület: ∫_a^b x^2 dx (görbe alatti rész)
              let polyBlue = `M ${m.X(a0).toFixed(1)},${m.Y(0).toFixed(1)} `;
              for (let i = 0; i <= 60; i++) {
                const xv = a0 + ((bVal - a0) * i) / 60;
                polyBlue += `L ${m.X(xv).toFixed(1)},${m.Y(xv * xv).toFixed(1)} `;
              }
              polyBlue += `L ${m.X(bVal).toFixed(1)},${m.Y(0).toFixed(1)} Z`;

              // Zöld terület: ∫_{f(a)}^{f(b)} √y dy (görbétől balra, az y-tengelyig)
              let polyGreen = `M ${m.X(0).toFixed(1)},${m.Y(fa0).toFixed(1)} `;
              for (let i = 0; i <= 60; i++) {
                const xv = a0 + ((bVal - a0) * i) / 60;
                polyGreen += `L ${m.X(xv).toFixed(1)},${m.Y(xv * xv).toFixed(1)} `;
              }
              polyGreen += `L ${m.X(0).toFixed(1)},${m.Y(fb).toFixed(1)} Z`;

              const dCurve = buildPath((x) => (x >= 0 ? x * x : Number.NaN), 0, 2.35, m.X, m.Y, 120);

              return (
                <>
                  {/* Kis saroktéglalap a * f(a) */}
                  <rect
                    x={m.X(0)}
                    y={m.Y(fa0)}
                    width={m.X(a0) - m.X(0)}
                    height={m.Y(0) - m.Y(fa0)}
                    fill="rgba(148,163,184,0.22)"
                    stroke="#94a3b8"
                    strokeDasharray="3 2"
                  />
                  {/* Kék és zöld területek */}
                  <path d={polyBlue} fill="rgba(56,189,248,0.32)" stroke="#38bdf8" strokeWidth={1.3} />
                  <path d={polyGreen} fill="rgba(52,211,153,0.32)" stroke="#34d399" strokeWidth={1.3} />
                  {/* Nagy téglalap kerete */}
                  <rect
                    x={m.X(0)}
                    y={m.Y(fb)}
                    width={m.X(bVal) - m.X(0)}
                    height={m.Y(0) - m.Y(fb)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={1.8}
                    strokeDasharray="5 3"
                  />
                  <path d={dCurve} fill="none" stroke="#f8fafc" strokeWidth={2.4} />
                </>
              );
            }}
          </Chart>
          <div className="result">
            <p>
              <strong>Kék</strong> (<M t={`\\int_a^b f(x)\\,dx = ${tx(areaF, 3)}`} />) + <strong>Zöld</strong> (
              <M t={`\\int_{f(a)}^{f(b)} f^{-1}(y)\\,dy = ${tx(areaInv, 3)}`} />) ={' '}
              <strong>{round(areaF + areaInv, 3)}</strong> · <strong>Nagy − kis téglalap:</strong>{' '}
              <M t={`b f(b) - a f(a) = ${tx(rectDiff, 3)}`} /> ✓
            </p>
          </div>
        </>
      )}
    </div>
  );
}
