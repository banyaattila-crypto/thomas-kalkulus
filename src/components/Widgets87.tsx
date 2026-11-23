import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';

const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

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

function trap(fn: (x: number) => number, a: number, b: number, n: number): number {
  const dx = (b - a) / n;
  let sum = fn(a) + fn(b);
  for (let i = 1; i < n; i++) sum += 2 * fn(a + i * dx);
  return (dx / 2) * sum;
}

function simp(fn: (x: number) => number, a: number, b: number, n: number): number {
  const dx = (b - a) / n;
  let sum = fn(a) + fn(b);
  for (let i = 1; i < n; i++) sum += (i % 2 === 1 ? 4 : 2) * fn(a + i * dx);
  return (dx / 3) * sum;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Trapézformula szimulátor */

export function TrapezoidRuleWidget() {
  const [kind, setKind] = useState<'sq' | 'sin' | 'gauss'>('sq');
  const [n, setN] = useState(4);

  const cfg = {
    sq: {
      label: 'x² az [1, 2]-n (Thomas 1. példa)',
      fn: (x: number) => x * x,
      a: 1,
      b: 2,
      exact: 7 / 3,
      xmin: 0.85,
      xmax: 2.15,
      ymin: -0.2,
      ymax: 4.4,
    },
    sin: {
      label: 'sin x a [0, π]-n',
      fn: (x: number) => Math.sin(x),
      a: 0,
      b: Math.PI,
      exact: 2,
      xmin: -0.2,
      xmax: 3.35,
      ymin: -0.15,
      ymax: 1.2,
    },
    gauss: {
      label: 'e^(−x²) a [0, 2]-n',
      fn: (x: number) => Math.exp(-x * x),
      a: 0,
      b: 2,
      exact: 0.8820813907624216,
      xmin: -0.15,
      xmax: 2.15,
      ymin: -0.1,
      ymax: 1.15,
    },
  }[kind];

  const T = trap(cfg.fn, cfg.a, cfg.b, n);
  const err = Math.abs(T - cfg.exact);
  const relPct = (err / cfg.exact) * 100;
  const dx = (cfg.b - cfg.a) / n;

  return (
    <div className="widget">
      <div className="widget-title">Interaktív trapézformula-szimulátor</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <button type="button" className={kind === 'sq' ? 'btn-active' : ''} onClick={() => setKind('sq')}>
          x² [1,2]
        </button>
        <button type="button" className={kind === 'sin' ? 'btn-active' : ''} onClick={() => setKind('sin')}>
          sin x [0,π]
        </button>
        <button type="button" className={kind === 'gauss' ? 'btn-active' : ''} onClick={() => setKind('gauss')}>
          e⁻ˣ² [0,2]
        </button>
        <label style={{ fontSize: 13 }}>
          n = {n}{' '}
          <input type="range" min={2} max={12} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={cfg.xmin} xmax={cfg.xmax} ymin={cfg.ymin} ymax={cfg.ymax} w={560} h={195}>
        {({ X, Y }) => (
          <>
            {Array.from({ length: n }, (_, i) => {
              const x0 = cfg.a + i * dx;
              const x1 = x0 + dx;
              const y0 = cfg.fn(x0);
              const y1 = cfg.fn(x1);
              const pts = `${X(x0).toFixed(1)},${Y(0).toFixed(1)} ${X(x0).toFixed(1)},${Y(y0).toFixed(1)} ${X(x1).toFixed(1)},${Y(y1).toFixed(1)} ${X(x1).toFixed(1)},${Y(0).toFixed(1)}`;
              return (
                <polygon
                  key={i}
                  points={pts}
                  fill="rgba(56,189,248,0.22)"
                  stroke="#38bdf8"
                  strokeWidth={1.3}
                />
              );
            })}
            <path d={buildPath(cfg.fn, cfg.a, cfg.b, X, Y, 160)} fill="none" stroke="#f59e0b" strokeWidth={2.5} />
          </>
        )}
      </Chart>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8, fontSize: 12.5 }}>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Trapéz <M t={`T_{${n}}`} />:</strong> {round(T, 5)}
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #34d399' }}>
          <strong style={{ color: '#34d399' }}>Pontos érték:</strong> {round(cfg.exact, 5)}
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Hiba:</strong> {round(err, 5)} ({round(relPct, 3)}%)
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Konvex vs. Konkáv előjel */

export function ConvexityOverUnderWidget() {
  const [mode, setMode] = useState<'convex' | 'concave'>('convex');
  const fn = mode === 'convex' ? (x: number) => 0.35 * x * x + 0.4 : (x: number) => 2.2 - 0.32 * (x - 2) * (x - 2);
  const a = 0.5;
  const b = 3.5;

  return (
    <div className="widget">
      <div className="widget-title">Mikor becsül felül és mikor alul a trapézformula?</div>
      <div className="widget-controls" style={{ display: 'flex', gap: 8 }}>
        <button type="button" className={mode === 'convex' ? 'btn-active' : ''} onClick={() => setMode('convex')}>
          Konvex (f&apos;&apos; &gt; 0) → Felülbecslés (T &gt; I)
        </button>
        <button type="button" className={mode === 'concave' ? 'btn-active' : ''} onClick={() => setMode('concave')}>
          Konkáv (f&apos;&apos; &lt; 0) → Alulbecslés (T &lt; I)
        </button>
      </div>

      <Chart xmin={0} xmax={4} ymin={-0.1} ymax={5.1} w={560} h={185}>
        {({ X, Y }) => {
          const pts = `${X(a).toFixed(1)},${Y(0).toFixed(1)} ${X(a).toFixed(1)},${Y(fn(a)).toFixed(1)} ${X(b).toFixed(1)},${Y(fn(b)).toFixed(1)} ${X(b).toFixed(1)},${Y(0).toFixed(1)}`;
          return (
            <>
              <polygon
                points={pts}
                fill={mode === 'convex' ? 'rgba(251,113,133,0.20)' : 'rgba(56,189,248,0.20)'}
                stroke={mode === 'convex' ? '#fb7185' : '#38bdf8'}
                strokeWidth={2}
              />
              <path d={buildPath(fn, a, b, X, Y, 120)} fill="none" stroke="#f59e0b" strokeWidth={2.6} />
              <circle cx={X(a)} cy={Y(fn(a))} r={4} fill="#fbbf24" />
              <circle cx={X(b)} cy={Y(fn(b))} r={4} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>
      <div className="widget-note">
        {mode === 'convex'
          ? 'Konvex görbénél (f\'\' > 0) a két pontot összekötő húr a görbe FÖLÖTT halad, ezért minden trapéz nagyobb a valódi területnél.'
          : 'Konkáv görbénél (f\'\' < 0) a húr a görbe ALATT marad, ezért a trapézformula alulbecsli a valódi integrált.'}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Trapéz hibakorlát és n-kalkulátor */

export function TrapezoidErrorBoundWidget() {
  const [exp, setExp] = useState(4);
  const [Mval, setMval] = useState(2);
  const eps = 10 ** -exp;
  const len = 1; // [a,b] hossza = 1 (pl. [1,2] vagy [0,1])
  const nMin = Math.ceil(Math.sqrt((Mval * len ** 3) / (12 * eps)));

  return (
    <div className="widget">
      <div className="widget-title">
        Mennyi részintervallum kell a <M t="|E_T| \le \frac{M(b-a)^3}{12n^2} \le \varepsilon" /> pontossághoz?
      </div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <label style={{ fontSize: 13 }}>
          Pontosság <M t={`\\varepsilon = 10^{-${exp}}`} />{' '}
          <input type="range" min={1} max={5} step={1} value={exp} onChange={(e) => setExp(Number(e.target.value))} />
        </label>
        <label style={{ fontSize: 13 }}>
          Korlát <M t={`M = ${Mval}`} /> (ahol <M t="|f''|\le M" />){' '}
          <input type="range" min={1} max={10} step={1} value={Mval} onChange={(e) => setMval(Number(e.target.value))} />
        </label>
      </div>

      <div style={{ marginTop: 8, padding: '10px 12px', borderRadius: 8, background: '#0f172a', border: '1px solid #334155', fontSize: 13 }}>
        <M
          block
          t={`\\frac{${Mval}\\cdot 1^3}{12 n^2} \\le 10^{-${exp}} \\implies n \\ge \\sqrt{\\frac{${Mval}\\cdot 10^{${exp}}}{12}} \\approx ${tx(Math.sqrt((Mval * 10 ** exp) / 12), 2)} \\implies \\mathbf{n_{\\min} = ${nMin}}`}
        />
        <div style={{ color: '#cbd5e1', fontSize: 12, marginTop: 4 }}>
          Figyeld meg: minden <strong>100-szor pontosabb</strong> célhoz (<M t="10^{-2} \to 10^{-4}" />) a trapézformulánál{' '}
          <strong>10-szer több</strong> osztópont kell (mert a hiba <M t="1/n^2" />-tel csökken)!
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Simpson parabola-szimulátor */

export function SimpsonRuleWidget() {
  const [kind, setKind] = useState<'x4' | 'pi' | 'gauss'>('x4');
  const [n, setN] = useState(4);

  const cfg = {
    x4: {
      fn: (x: number) => 5 * x ** 4,
      a: 0,
      b: 2,
      exact: 32,
      xmin: -0.1,
      xmax: 2.15,
      ymin: -4,
      ymax: 86,
      label: '5x⁴ a [0, 2]-n (Thomas 5. példa)',
    },
    pi: {
      fn: (x: number) => 4 / (1 + x * x),
      a: 0,
      b: 1,
      exact: Math.PI,
      xmin: -0.05,
      xmax: 1.08,
      ymin: -0.2,
      ymax: 4.3,
      label: '4/(1+x²) a [0, 1]-n (= π)',
    },
    gauss: {
      fn: (x: number) => Math.exp(-x * x),
      a: 0,
      b: 2,
      exact: 0.8820813907624216,
      xmin: -0.1,
      xmax: 2.1,
      ymin: -0.1,
      ymax: 1.15,
      label: 'e⁻ˣ² a [0, 2]-n',
    },
  }[kind];

  const S = simp(cfg.fn, cfg.a, cfg.b, n);
  const err = Math.abs(S - cfg.exact);
  const dx = (cfg.b - cfg.a) / n;

  const lagrangeParabola = (x0: number, x1: number, x2: number) => {
    const y0 = cfg.fn(x0);
    const y1 = cfg.fn(x1);
    const y2 = cfg.fn(x2);
    return (x: number) =>
      (y0 * (x - x1) * (x - x2)) / ((x0 - x1) * (x0 - x2)) +
      (y1 * (x - x0) * (x - x2)) / ((x1 - x0) * (x1 - x2)) +
      (y2 * (x - x0) * (x - x1)) / ((x2 - x0) * (x2 - x1));
  };

  return (
    <div className="widget">
      <div className="widget-title">Interaktív Simpson-parabola szimulátor (páros n!)</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <button type="button" className={kind === 'x4' ? 'btn-active' : ''} onClick={() => setKind('x4')}>
          5x⁴ [0,2]
        </button>
        <button type="button" className={kind === 'pi' ? 'btn-active' : ''} onClick={() => setKind('pi')}>
          4/(1+x²) → π
        </button>
        <button type="button" className={kind === 'gauss' ? 'btn-active' : ''} onClick={() => setKind('gauss')}>
          e⁻ˣ² [0,2]
        </button>
        <label style={{ fontSize: 13 }}>
          páros n = {n}{' '}
          <input type="range" min={2} max={8} step={2} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={cfg.xmin} xmax={cfg.xmax} ymin={cfg.ymin} ymax={cfg.ymax} w={560} h={195}>
        {({ X, Y }) => (
          <>
            {Array.from({ length: n / 2 }, (_, k) => {
              const x0 = cfg.a + 2 * k * dx;
              const x1 = x0 + dx;
              const x2 = x0 + 2 * dx;
              const p = lagrangeParabola(x0, x1, x2);
              const fill = k % 2 === 0 ? 'rgba(52,211,153,0.22)' : 'rgba(56,189,248,0.22)';
              const stroke = k % 2 === 0 ? '#34d399' : '#38bdf8';
              let d = `M${X(x0).toFixed(1)},${Y(0).toFixed(1)} `;
              for (let s = 0; s <= 24; s++) {
                const x = x0 + ((x2 - x0) * s) / 24;
                d += `L${X(x).toFixed(1)},${Y(p(x)).toFixed(1)} `;
              }
              d += `L${X(x2).toFixed(1)},${Y(0).toFixed(1)} Z`;
              return <path key={k} d={d} fill={fill} stroke={stroke} strokeWidth={1.6} />;
            })}
            <path d={buildPath(cfg.fn, cfg.a, cfg.b, X, Y, 160)} fill="none" stroke="#f59e0b" strokeWidth={2.2} strokeDasharray="5 3" />
          </>
        )}
      </Chart>
      <div className="widget-note">
        Minden 2 szomszédos sávot egy közös másodfokú parabola (zöld/kék) fed le — szaggatott arany a valódi görbe (szinte megkülönböztethetetlen!).
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8, fontSize: 12.5 }}>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #34d399' }}>
          <strong style={{ color: '#34d399' }}>Simpson <M t={`S_{${n}}`} />:</strong> {round(S, 6)}
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Pontos érték:</strong> {round(cfg.exact, 6)}
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Hiba <M t="|E_S|" />:</strong> {round(err, 6)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Trapéz vs. Simpson verseny */

export function TrapezoidVsSimpsonRaceWidget() {
  const [target, setTarget] = useState<'ln2' | 'pi'>('ln2');
  const cfg =
    target === 'ln2'
      ? { label: '∫₁² (1/x) dx = ln 2', fn: (x: number) => 1 / x, a: 1, b: 2, exact: Math.LN2 }
      : { label: '∫₀¹ 4/(1+x²) dx = π', fn: (x: number) => 4 / (1 + x * x), a: 0, b: 1, exact: Math.PI };

  const ns = [2, 4, 8, 16];

  return (
    <div className="widget">
      <div className="widget-title">Konvergencia-verseny: Trapéz (1/n²) vs. Simpson (1/n⁴)</div>
      <div className="widget-controls" style={{ display: 'flex', gap: 8 }}>
        <button type="button" className={target === 'ln2' ? 'btn-active' : ''} onClick={() => setTarget('ln2')}>
          ∫₁² (1/x) dx = ln 2 ≈ 0,693147
        </button>
        <button type="button" className={target === 'pi' ? 'btn-active' : ''} onClick={() => setTarget('pi')}>
          ∫₀¹ 4/(1+x²) dx = π ≈ 3,141593
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8, fontSize: 12.5 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
            <th style={{ textAlign: 'left', padding: '5px 6px' }}>n</th>
            <th style={{ textAlign: 'right', padding: '5px 6px' }}>Trapéz Tₙ</th>
            <th style={{ textAlign: 'right', padding: '5px 6px', color: '#fb7185' }}>|E_T| (÷4)</th>
            <th style={{ textAlign: 'right', padding: '5px 6px' }}>Simpson Sₙ</th>
            <th style={{ textAlign: 'right', padding: '5px 6px', color: '#34d399' }}>|E_S| (÷16)</th>
          </tr>
        </thead>
        <tbody>
          {ns.map((n) => {
            const T = trap(cfg.fn, cfg.a, cfg.b, n);
            const S = simp(cfg.fn, cfg.a, cfg.b, n);
            const eT = Math.abs(T - cfg.exact);
            const eS = Math.abs(S - cfg.exact);
            return (
              <tr key={n} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '5px 6px', fontWeight: 700 }}>{n}</td>
                <td style={{ textAlign: 'right', padding: '5px 6px', fontFamily: 'monospace' }}>{T.toFixed(6)}</td>
                <td style={{ textAlign: 'right', padding: '5px 6px', fontFamily: 'monospace', color: '#fb7185' }}>{eT.toExponential(2)}</td>
                <td style={{ textAlign: 'right', padding: '5px 6px', fontFamily: 'monospace' }}>{S.toFixed(6)}</td>
                <td style={{ textAlign: 'right', padding: '5px 6px', fontFamily: 'monospace', color: '#34d399' }}>{eS.toExponential(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="widget-note">
        Már n = 16-nál a Simpson-hiba több nagyságrenddel kisebb: minden n-duplázás 16-odára veri le a hibát!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Középpont-érintő vs. Trapéz-húr */

export function MidpointTangentDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Miért 2× pontosabb a középpont-szabály, és hogyan születik belőle Simpson?</div>
      <svg viewBox="0 0 560 175" className="plane" role="img" aria-label="Középpont és trapéz összehasonlítása">
        <rect width={560} height={175} className="pl-bg" />

        {/* Bal: Trapéz */}
        <g transform="translate(14, 14)">
          <rect width={166} height={146} rx={8} fill="#0f172a" stroke="#fb7185" strokeWidth={1.5} />
          <text x={83} y={20} textAnchor="middle" fill="#fb7185" fontSize={11} fontWeight={700}>Trapéz (Tₙ): húr felül</text>
          <polygon points="28,118 28,96 138,44 138,118" fill="rgba(251,113,133,0.18)" stroke="#fb7185" strokeWidth={1.6} />
          <path d="M28,96 Q83,86 138,44" fill="none" stroke="#f59e0b" strokeWidth={2.4} />
          <text x={83} y={136} textAnchor="middle" fill="#cbd5e1" fontSize={10}>Hiba ≈ +2e (felülbecsül)</text>
        </g>

        {/* Közép: Középpont */}
        <g transform="translate(196, 14)">
          <rect width={166} height={146} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={83} y={20} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Középpont (Mₙ): érintő alul</text>
          <polygon points="28,118 28,104 138,52 138,118" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={1.6} />
          <path d="M28,96 Q83,86 138,44" fill="none" stroke="#f59e0b" strokeWidth={2.4} />
          <circle cx={83} cy={78} r={3.5} fill="#38bdf8" />
          <text x={83} y={136} textAnchor="middle" fill="#cbd5e1" fontSize={10}>Hiba ≈ −e (feleakkora!)</text>
        </g>

        {/* Jobb: Simpson kombináció */}
        <g transform="translate(378, 14)">
          <rect width={168} height={146} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={84} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>Simpson = 2 : 1 átlag!</text>
          <text x={84} y={54} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>S₂ₙ = (2Mₙ + Tₙ) / 3</text>
          <text x={84} y={82} textAnchor="middle" fill="#a7f3d0" fontSize={10}>2·(−e) + (+2e) = 0!</text>
          <text x={84} y={106} textAnchor="middle" fill="#cbd5e1" fontSize={9.5}>A másodfokú hiba kioltódik,</text>
          <text x={84} y={122} textAnchor="middle" fill="#cbd5e1" fontSize={9.5}>csak az O(1/n⁴) marad!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Mérési adatok integrálása */

export function RealWorldDataSimpsonWidget() {
  const [midDepth, setMidDepth] = useState(4.2);
  // Folyómeder mélysége 2 méterenként (x = 0, 2, 4, 6, 8, 10, 12 m)
  const ys = [0, 1.8, 3.4, midDepth, 3.1, 1.5, 0];
  const dx = 2;

  const T = (dx / 2) * (ys[0] + 2 * (ys[1] + ys[2] + ys[3] + ys[4] + ys[5]) + ys[6]);
  const S = (dx / 3) * (ys[0] + 4 * ys[1] + 2 * ys[2] + 4 * ys[3] + 2 * ys[4] + 4 * ys[5] + ys[6]);

  return (
    <div className="widget">
      <div className="widget-title">Mérnöki alkalmazás: folyómeder keresztmetszete mérési pontokból (Δx = 2 m)</div>
      <div className="widget-controls" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ fontSize: 13 }}>
          Középső mélység y₃ (x = 6 m): <strong>{round(midDepth, 1)} m</strong>{' '}
          <input type="range" min={2.0} max={6.0} step={0.2} value={midDepth} onChange={(e) => setMidDepth(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={-0.5} xmax={12.5} ymin={-6.4} ymax={0.6} w={560} h={175}>
        {({ X, Y }) => {
          const polyPts =
            `${X(0).toFixed(1)},${Y(0).toFixed(1)} ` +
            ys.map((d, i) => `${X(i * dx).toFixed(1)},${Y(-d).toFixed(1)}`).join(' ') +
            ` ${X(12).toFixed(1)},${Y(0).toFixed(1)}`;
          return (
            <>
              <polygon points={polyPts} fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth={2} />
              {ys.map((d, i) => (
                <circle key={i} cx={X(i * dx)} cy={Y(-d)} r={i === 3 ? 5 : 3.5} fill={i === 3 ? '#fbbf24' : '#38bdf8'} />
              ))}
            </>
          );
        }}
      </Chart>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, fontSize: 13 }}>
        <div style={{ padding: '6px 10px', borderRadius: 6, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Trapéz-becslés:</strong> {round(T, 2)} m²
        </div>
        <div style={{ padding: '6px 10px', borderRadius: 6, background: '#0f172a', border: '1px solid #34d399' }}>
          <strong style={{ color: '#34d399' }}>Simpson-becslés:</strong> {round(S, 2)} m²
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. oldal (8. ábra): Összehasonlító összefoglaló */

export function NumericalMethodsSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 3 numerikus integrálási szabály egy pillantásra</div>
      <svg viewBox="0 0 560 162" className="plane" role="img" aria-label="Trapéz, Középpont és Simpson szabály összehasonlítása">
        <rect width={560} height={162} className="pl-bg" />

        <g transform="translate(12, 14)">
          <rect width={170} height={134} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={85} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>Trapézformula (Tₙ)</text>
          <text x={85} y={44} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Súlyok: 1, 2, 2, …, 2, 1</text>
          <text x={85} y={64} textAnchor="middle" fill="#94a3b8" fontSize={10}>Szorzó: Δx / 2</text>
          <text x={85} y={84} textAnchor="middle" fill="#fde68a" fontSize={10}>n: bármilyen egész</text>
          <text x={85} y={104} textAnchor="middle" fill="#fb7185" fontSize={10}>|E_T| ≤ M(b−a)³ / (12n²)</text>
          <text x={85} y={122} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>2n ⇒ hiba ÷ 4</text>
        </g>

        <g transform="translate(195, 14)">
          <rect width={170} height={134} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.6} />
          <text x={85} y={22} textAnchor="middle" fill="#f59e0b" fontSize={11.5} fontWeight={700}>Középpont (Mₙ)</text>
          <text x={85} y={44} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Súlyok: 1, 1, …, 1 (középen)</text>
          <text x={85} y={64} textAnchor="middle" fill="#94a3b8" fontSize={10}>Szorzó: Δx</text>
          <text x={85} y={84} textAnchor="middle" fill="#fde68a" fontSize={10}>n: bármilyen egész</text>
          <text x={85} y={104} textAnchor="middle" fill="#fde68a" fontSize={10}>|E_M| ≤ M(b−a)³ / (24n²)</text>
          <text x={85} y={122} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>2× pontosabb, mint Tₙ</text>
        </g>

        <g transform="translate(378, 14)">
          <rect width={170} height={134} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={85} y={22} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>Simpson-formula (Sₙ)</text>
          <text x={85} y={44} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Súlyok: 1, 4, 2, 4, …, 4, 1</text>
          <text x={85} y={64} textAnchor="middle" fill="#94a3b8" fontSize={10}>Szorzó: Δx / 3</text>
          <text x={85} y={84} textAnchor="middle" fill="#fb7185" fontSize={10} fontWeight={700}>n: KÖTELEZŐEN PÁROS!</text>
          <text x={85} y={104} textAnchor="middle" fill="#34d399" fontSize={10}>|E_S| ≤ M(b−a)⁵ / (180n⁴)</text>
          <text x={85} y={122} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>2n ⇒ hiba ÷ 16 (3. fokig pontos!)</text>
        </g>
      </svg>
    </div>
  );
}
