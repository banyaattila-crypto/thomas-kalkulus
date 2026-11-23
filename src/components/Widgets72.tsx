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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): ln x mint előjeles terület + e szám */

export function LnAreaDefinitionWidget() {
  const [x, setX] = useState(Math.E);
  const lnX = Math.log(x);
  const isPos = x >= 1;
  const isNearE = Math.abs(x - Math.E) < 0.03;

  return (
    <div className="widget">
      <div className="widget-title">A természetes logaritmus mint előjeles terület az y = 1/t görbe alatt</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(x - 0.5) < 0.03 ? 'on' : ''} onClick={() => setX(0.5)}>
          x = 0,5 (negatív!)
        </button>
        <button type="button" className={Math.abs(x - 1) < 0.02 ? 'on' : ''} onClick={() => setX(1.0)}>
          x = 1 (ln 1 = 0)
        </button>
        <button type="button" className={isNearE ? 'on' : ''} onClick={() => setX(Math.E)}>
          x = e ≈ 2,718 (ln e = 1!)
        </button>
        <button type="button" className={Math.abs(x - 4) < 0.03 ? 'on' : ''} onClick={() => setX(4.0)}>
          x = 4
        </button>
      </div>

      <label>
        Felső integrálási határ: <M t={`x = ${tx(x, 3)}`} /> ⇒ <M t={`\\ln(${tx(x, 3)}) = ${tx(lnX, 3)}`} />
        <input type="range" min={0.2} max={5.0} step={0.02} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={5.3} ymin={-0.3} ymax={3.2} h={220}>
        {(m) => {
          const dCurve = buildPath((t) => (t > 0.05 ? 1 / t : Number.NaN), 0.15, 5.2, m.X, m.Y, 200);
          const lo = Math.min(1, x);
          const hi = Math.max(1, x);
          let poly = `M ${m.X(lo).toFixed(1)},${m.Y(0).toFixed(1)} `;
          const steps = 80;
          for (let i = 0; i <= steps; i++) {
            const t = lo + ((hi - lo) * i) / steps;
            poly += `L ${m.X(t).toFixed(1)},${m.Y(Math.min(3.3, 1 / t)).toFixed(1)} `;
          }
          poly += `L ${m.X(hi).toFixed(1)},${m.Y(0).toFixed(1)} Z`;

          return (
            <>
              {Math.abs(x - 1) > 0.01 && (
                <path
                  d={poly}
                  fill={isPos ? 'rgba(56,189,248,0.34)' : 'rgba(248,113,113,0.34)'}
                  stroke={isPos ? '#38bdf8' : '#f87171'}
                  strokeWidth={1.5}
                />
              )}
              <path d={dCurve} fill="none" stroke="#f8fafc" strokeWidth={2.5} />
              {/* t = 1 referencia */}
              <line x1={m.X(1)} y1={m.Y(0)} x2={m.X(1)} y2={m.Y(1)} stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="4 3" />
              {/* t = e jelölés */}
              <line x1={m.X(Math.E)} y1={m.Y(0)} x2={m.X(Math.E)} y2={m.Y(1 / Math.E)} stroke="#34d399" strokeWidth={1.6} strokeDasharray="3 3" />
              <text x={m.X(Math.E)} y={m.Y(-0.18)} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>
                e
              </text>
              {/* Aktuális x pont */}
              <circle cx={m.X(x)} cy={m.Y(0)} r={5} fill={isPos ? '#38bdf8' : '#f87171'} stroke="#0f172a" strokeWidth={1.4} />
              <text x={m.X(3.8)} y={m.Y(2.4)} fill="#cbd5e1" fontSize={12} fontWeight={700}>
                y = 1/t
              </text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          {isNearE ? (
            <span style={{ color: '#34d399', fontWeight: 700 }}>
              ★ Pontosan x = e ≈ 2,71828 esetén a kék terület 1,000 egység ⇒ ln(e) = 1!
            </span>
          ) : isPos ? (
            <>
              Mivel <M t="x > 1" />, <M t={`\\ln(${tx(x, 2)}) = +${tx(lnX, 3)}`} /> a kék terület az <M t={`[1;\\,${tx(x, 2)}]`} /> intervallumon.
            </>
          ) : (
            <>
              Mivel <M t="0 < x < 1" />, az integrálási határok fordítottak (<M t="1 \to x" />), így{' '}
              <M t={`\\ln(${tx(x, 2)}) = ${tx(lnX, 3)}`} /> a piros terület <strong>ellentettje</strong>!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): ln(x) és ln(ax) párhuzamos érintői */

export function LnDerivativeAndShiftWidget() {
  const [a, setA] = useState(2.5);
  const [x0, setX0] = useState(2.0);

  const y1 = Math.log(x0);
  const y2 = Math.log(a * x0);
  const slope = 1 / x0;

  return (
    <div className="widget">
      <div className="widget-title">Miért egyenlő (ln ax)′ és (ln x)′? — Függőleges eltolás, párhuzamos érintők!</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Szorzó: <M t={`a = ${tx(a, 2)}`} /> (<M t={`\\ln a = ${tx(Math.log(a), 2)}`} />)
          <input type="range" min={0.3} max={5.0} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Érintési pont: <M t={`x_0 = ${tx(x0, 2)}`} /> (<M t={`m = 1/x_0 = ${tx(slope, 2)}`} />)
          <input type="range" min={0.5} max={5.0} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={6.2} ymin={-2.2} ymax={3.6} h={235}>
        {(m) => {
          const dLn = buildPath((x) => (x > 0.05 ? Math.log(x) : Number.NaN), 0.1, 6.2, m.X, m.Y, 180);
          const dLnA = buildPath((x) => (x > 0.05 ? Math.log(a * x) : Number.NaN), 0.1, 6.2, m.X, m.Y, 180);
          const span = 1.4;
          return (
            <>
              <path d={dLn} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={dLnA} fill="none" stroke="#34d399" strokeWidth={2.5} />

              {/* Függőleges eltolás nyíl */}
              <line x1={m.X(x0)} y1={m.Y(y1)} x2={m.X(x0)} y2={m.Y(y2)} stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />

              {/* Párhuzamos érintők */}
              <line
                x1={m.X(x0 - span)}
                y1={m.Y(y1 - slope * span)}
                x2={m.X(x0 + span)}
                y2={m.Y(y1 + slope * span)}
                stroke="#7dd3fc"
                strokeWidth={1.8}
              />
              <line
                x1={m.X(x0 - span)}
                y1={m.Y(y2 - slope * span)}
                x2={m.X(x0 + span)}
                y2={m.Y(y2 + slope * span)}
                stroke="#6ee7b7"
                strokeWidth={1.8}
              />

              <circle cx={m.X(x0)} cy={m.Y(y1)} r={5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.5} />
              <circle cx={m.X(x0)} cy={m.Y(y2)} r={5} fill="#34d399" stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék:</strong> <M t="y = \ln x" /> · <strong>Zöld:</strong> <M t={`y = \\ln(${tx(a, 1)}x) = \\ln x + (${tx(Math.log(a), 2)})`} /> ·
          Mindkét érintő meredeksége <M t={`m = \\dfrac{1}{${tx(x0, 2)}} = ${tx(slope, 3)}`} /> (pontosan párhuzamosak!).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): ln(ab) = ln a + ln b területi bizonyítása */

export function LnProductAreaDiagram() {
  const [a, setA] = useState(2.0);
  const [b, setB] = useState(2.5);
  const ab = a * b;

  return (
    <div className="widget">
      <div className="widget-title">A szorzatszabály (ln(ab) = ln a + ln b) geometriai csodája az y = 1/t alatt</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Első tényező: <M t={`a = ${tx(a, 1)}`} /> (<M t={`\\ln a = ${tx(Math.log(a), 3)}`} />)
          <input type="range" min={1.2} max={3.0} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Második tényező: <M t={`b = ${tx(b, 1)}`} /> (<M t={`\\ln b = ${tx(Math.log(b), 3)}`} />)
          <input type="range" min={1.2} max={3.0} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0.5} xmax={9.4} ymin={-0.15} ymax={1.25} h={205}>
        {(m) => {
          const dCurve = buildPath((t) => 1 / t, 0.75, 9.3, m.X, m.Y, 180);
          const makeArea = (u: number, v: number) => {
            let p = `M ${m.X(u).toFixed(1)},${m.Y(0).toFixed(1)} `;
            for (let i = 0; i <= 50; i++) {
              const t = u + ((v - u) * i) / 50;
              p += `L ${m.X(t).toFixed(1)},${m.Y(1 / t).toFixed(1)} `;
            }
            return `${p} L ${m.X(v).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          };
          return (
            <>
              {/* [1, a] kék terület = ln a */}
              <path d={makeArea(1, a)} fill="rgba(56,189,248,0.38)" stroke="#38bdf8" strokeWidth={1.5} />
              {/* [a, ab] zöld terület = ln b */}
              <path d={makeArea(a, ab)} fill="rgba(52,211,153,0.38)" stroke="#34d399" strokeWidth={1.5} />
              {/* [1, b] sárga szaggatott kontúr = ln b */}
              <path d={makeArea(1, b)} fill="none" stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="5 3" />

              <path d={dCurve} fill="none" stroke="#f8fafc" strokeWidth={2.4} />
              <text x={m.X((1 + a) / 2)} y={m.Y(0.28)} textAnchor="middle" fill="#bae6fd" fontSize={11} fontWeight={700}>
                ln a
              </text>
              <text x={m.X((a + ab) / 2)} y={m.Y(0.14)} textAnchor="middle" fill="#a7f3d0" fontSize={11} fontWeight={700}>
                = ln b
              </text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          A zöld <M t={`[${tx(a, 1)};\\,${tx(ab, 2)}]`} /> tartomány pontosan a sárga <M t={`[1;\\,${tx(b, 1)}]`} /> tartomány{' '}
          <M t={`${tx(a, 1)}`} />-szeres vízszintes nyújtása és <M t={`1/${tx(a, 1)}`} />-szeres függőleges összenyomása, így területük azonos! Ezért{' '}
          <M t={`\\ln(${tx(ab, 2)}) = ${tx(Math.log(a), 3)} + ${tx(Math.log(b), 3)} = ${tx(Math.log(ab), 3)}`} /> ✓
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): ln x elemzése + téglalap-becslés */

export function LnGraphAnalysisWidget() {
  const [mode, setMode] = useState<'curve' | 'rect'>('curve');
  const [x0, setX0] = useState(1.0);

  const y0 = Math.log(x0);
  const m0 = 1 / x0;

  return (
    <div className="widget">
      <div className="widget-title">Az y = ln x grafikonja: konkávitás, érintők és a lim ln x = ∞ bizonyítása</div>
      <div className="relbuttons chips">
        <button type="button" className={mode === 'curve' ? 'on' : ''} onClick={() => setMode('curve')}>
          1. Konkávitás és érintő (ln x ≤ x − 1)
        </button>
        <button type="button" className={mode === 'rect' ? 'on' : ''} onClick={() => setMode('rect')}>
          2. Téglalap-becslés: ln 2 &gt; ½ ⇒ ln(2ⁿ) &gt; n/2
        </button>
      </div>

      {mode === 'curve' ? (
        <>
          <label>
            Érintési pont: <M t={`x_0 = ${tx(x0, 2)}`} /> (<M t={`f'(x_0) = ${tx(m0, 2)},\; f''(x_0) = ${tx(-1 / (x0 * x0), 2)} < 0`} />)
            <input type="range" min={0.3} max={5.0} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
          </label>
          <Chart xmin={-0.3} xmax={6.2} ymin={-2.5} ymax={2.6} h={225}>
            {(m) => {
              const dLn = buildPath((x) => (x > 0.04 ? Math.log(x) : Number.NaN), 0.08, 6.2, m.X, m.Y, 200);
              const dInv = buildPath((x) => (x > 0.3 ? 1 / x : Number.NaN), 0.35, 6.2, m.X, m.Y, 150);
              return (
                <>
                  <path d={dInv} fill="none" stroke="#64748b" strokeWidth={1.6} strokeDasharray="4 4" />
                  <path d={dLn} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
                  {/* Érintő */}
                  <line
                    x1={m.X(0)}
                    y1={m.Y(y0 - m0 * x0)}
                    x2={m.X(6.2)}
                    y2={m.Y(y0 + m0 * (6.2 - x0))}
                    stroke="#fbbf24"
                    strokeWidth={2}
                  />
                  <circle cx={m.X(x0)} cy={m.Y(y0)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
                  <circle cx={m.X(1)} cy={m.Y(0)} r={4} fill="#34d399" />
                </>
              );
            }}
          </Chart>
          <div className="result">
            <p>
              Mivel <M t="(\ln x)'' = -1/x^2 < 0" />, a kék <M t="\ln x" /> görbe <strong>mindenütt az érintője alatt fut</strong>!{' '}
              Speciálisan <M t="x_0 = 1" />-nél az érintő <M t="y = x - 1" />, amiből következik a híres{' '}
              <M t="\ln x \le x - 1" /> egyenlőtlenség!
            </p>
          </div>
        </>
      ) : (
        <>
          <Chart xmin={0.2} xmax={3.2} ymin={-0.1} ymax={1.4} h={210}>
            {(m) => {
              const dCurve = buildPath((t) => 1 / t, 0.7, 3.1, m.X, m.Y, 140);
              let area = `M ${m.X(1).toFixed(1)},${m.Y(0).toFixed(1)} `;
              for (let i = 0; i <= 40; i++) {
                const t = 1 + i / 40;
                area += `L ${m.X(t).toFixed(1)},${m.Y(1 / t).toFixed(1)} `;
              }
              area += `L ${m.X(2).toFixed(1)},${m.Y(0).toFixed(1)} Z`;

              return (
                <>
                  <path d={area} fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth={1.5} />
                  {/* Beírt 1 x 0.5 téglalap */}
                  <rect
                    x={m.X(1)}
                    y={m.Y(0.5)}
                    width={m.X(2) - m.X(1)}
                    height={m.Y(0) - m.Y(0.5)}
                    fill="rgba(251,191,36,0.38)"
                    stroke="#fbbf24"
                    strokeWidth={2}
                  />
                  <path d={dCurve} fill="none" stroke="#f8fafc" strokeWidth={2.5} />
                  <text x={m.X(1.5)} y={m.Y(0.22)} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>
                    Téglalap = ½
                  </text>
                  <text x={m.X(1.5)} y={m.Y(0.95)} textAnchor="middle" fill="#bae6fd" fontSize={11.5} fontWeight={700}>
                    ln 2 ≈ 0,693 &gt; 0,5
                  </text>
                </>
              );
            }}
          </Chart>
          <div className="result">
            <p>
              A sárga téglalap teljesen a görbe alatt van, így <M t="\ln 2 > \frac{1}{2}" />. Ezért{' '}
              <M t="\ln(2^n) = n\ln 2 > \frac{n}{2} \to +\infty" />, és{' '}
              <M t="\ln(2^{-n}) = -n\ln 2 < -\frac{n}{2} \to -\infty" /> — így <M t="\ln x" /> értékkészlete a teljes <M t="\mathbb{R}" />!
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): y = ln|x| két ága */

export function AbsLogBranchesWidget() {
  const [x0, setX0] = useState(-1.5);
  const safeX = Math.abs(x0) < 0.25 ? (x0 < 0 ? -0.25 : 0.25) : x0;
  const y0 = Math.log(Math.abs(safeX));
  const m0 = 1 / safeX;

  return (
    <div className="widget">
      <div className="widget-title">Miért kell az abszolútérték? — Az y = ln|x| két ága és az 1/x meredekség</div>
      <label>
        Próbapont (húzd át a negatív oldalra is!): <M t={`x_0 = ${tx(safeX, 2)}`} /> ⇒ meredekség:{' '}
        <M t={`\\dfrac{1}{x_0} = ${tx(m0, 2)}`} />
        <input type="range" min={-4.0} max={4.0} step={0.1} value={safeX} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={-4.5} xmax={4.5} ymin={-2.2} ymax={2.0} h={220}>
        {(m) => {
          const dLeft = buildPath((x) => (x < -0.05 ? Math.log(-x) : Number.NaN), -4.5, -0.1, m.X, m.Y, 140);
          const dRight = buildPath((x) => (x > 0.05 ? Math.log(x) : Number.NaN), 0.1, 4.5, m.X, m.Y, 140);
          const span = 1.1;
          return (
            <>
              <line x1={m.X(0)} y1={m.Y(-2.2)} x2={m.X(0)} y2={m.Y(2.0)} stroke="#f87171" strokeWidth={1.6} strokeDasharray="5 4" />
              <path d={dLeft} fill="none" stroke="#a78bfa" strokeWidth={2.6} />
              <path d={dRight} fill="none" stroke="#38bdf8" strokeWidth={2.6} />

              {/* Érintő */}
              <line
                x1={m.X(safeX - span)}
                y1={m.Y(y0 - m0 * span)}
                x2={m.X(safeX + span)}
                y2={m.Y(y0 + m0 * span)}
                stroke="#fbbf24"
                strokeWidth={2}
              />
              <circle cx={m.X(safeX)} cy={m.Y(y0)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
              <text x={m.X(-2.8)} y={m.Y(1.45)} fill="#c4b5fd" fontSize={11.5} fontWeight={700}>ln(−x) (x &lt; 0)</text>
              <text x={m.X(2.4)} y={m.Y(1.45)} fill="#7dd3fc" fontSize={11.5} fontWeight={700}>ln(x) (x &gt; 0)</text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          {safeX < 0 ? (
            <>
              <strong>Negatív ág (lila):</strong> <M t="x < 0" /> esetén <M t="(\ln(-x))' = \frac{-1}{-x} = \frac{1}{x} < 0" /> (a görbe csökkenő, az érintő meredeksége <M t={tx(m0, 2)} />)!
            </>
          ) : (
            <>
              <strong>Pozitív ág (kék):</strong> <M t="x > 0" /> esetén <M t="(\ln x)' = \frac{1}{x} > 0" /> (a görbe növekvő, az érintő meredeksége <M t={tx(m0, 2)} />)!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): tg x integrálja */

export function TanIntegralWidget() {
  const [b, setB] = useState(Math.PI / 3);
  const val = -Math.log(Math.cos(b));

  return (
    <div className="widget">
      <div className="widget-title">A tangens görbe alatti területe: ∫₀ᵇ tg x dx = −ln(cos b) = ln(sec b)</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(b - Math.PI / 6) < 0.02 ? 'on' : ''} onClick={() => setB(Math.PI / 6)}>
          b = π/6
        </button>
        <button type="button" className={Math.abs(b - Math.PI / 4) < 0.02 ? 'on' : ''} onClick={() => setB(Math.PI / 4)}>
          b = π/4 (½ ln 2)
        </button>
        <button type="button" className={Math.abs(b - Math.PI / 3) < 0.02 ? 'on' : ''} onClick={() => setB(Math.PI / 3)}>
          b = π/3 (ln 2!)
        </button>
      </div>

      <label>
        Felső határ: <M t={`b = ${tx(b, 3)}\\text{ rad}`} /> (<M t={`\\approx ${round((b * 180) / Math.PI, 1)}^\\circ`} />)
        <input type="range" min={0.1} max={1.42} step={0.02} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.15} xmax={1.75} ymin={-0.3} ymax={5.2} h={215}>
        {(m) => {
          const dTan = buildPath((x) => Math.tan(x), 0, 1.44, m.X, m.Y, 140);
          let poly = `M ${m.X(0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 60; i++) {
            const x = (b * i) / 60;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(Math.min(5.3, Math.tan(x))).toFixed(1)} `;
          }
          poly += `L ${m.X(b).toFixed(1)},${m.Y(0).toFixed(1)} Z`;

          return (
            <>
              <line
                x1={m.X(Math.PI / 2)}
                y1={m.Y(-0.3)}
                x2={m.X(Math.PI / 2)}
                y2={m.Y(5.2)}
                stroke="#f87171"
                strokeWidth={1.7}
                strokeDasharray="5 4"
              />
              <path d={poly} fill="rgba(52,211,153,0.34)" stroke="#34d399" strokeWidth={1.5} />
              <path d={dTan} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <circle cx={m.X(b)} cy={m.Y(Math.min(5.2, Math.tan(b)))} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
              <text x={m.X(Math.PI / 2) + 5} y={m.Y(4.5)} fill="#fca5a5" fontSize={11} fontWeight={700}>
                x = π/2
              </text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Terület: <M t={`\\int_0^{${tx(b, 2)}} \\operatorname{tg} x\\,dx = -\\ln(\\cos ${tx(b, 2)}) = \\mathbf{${tx(val, 3)}}`} />.
          {Math.abs(b - Math.PI / 3) < 0.02 && ' (Pontosan ln 2 ≈ 0,693!)'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Logaritmusos deriválás folyamatábra */

export function LogDiffPipelineDiagram() {
  const [x, setX] = useState(2.0);
  // y = (x^2 + 1) * sqrt(x + 3) / (x - 1), x > 1
  const y = ((x * x + 1) * Math.sqrt(x + 3)) / (x - 1);
  const t1 = (2 * x) / (x * x + 1);
  const t2 = 1 / (2 * (x + 3));
  const t3 = -1 / (x - 1);
  const rel = t1 + t2 + t3;
  const dy = y * rel;

  return (
    <div className="widget">
      <div className="widget-title">Logaritmusos deriválás működés közben — Thomas 6. példája élőben!</div>
      <label>
        Próbapont (<M t="x > 1" />): <M t={`x = ${tx(x, 2)}`} /> ⇒ <M t={`y = ${tx(y, 2)},\\; y' = ${tx(dy, 2)}`} />
        <input type="range" min={1.3} max={5.0} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <svg viewBox="0 0 560 154" className="plane" role="img" aria-label="Logaritmusos deriválás 4 lépése">
        <rect width={560} height={154} className="pl-bg" />

        <rect x={10} y={16} width={124} height={122} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={72} y={36} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>1. Eredeti y(x)</text>
        <text x={72} y={64} textAnchor="middle" fill="#e2e8f0" fontSize={11}>(x²+1)√(x+3)</text>
        <line x1={26} y1={72} x2={118} y2={72} stroke="#94a3b8" strokeWidth={1.2} />
        <text x={72} y={88} textAnchor="middle" fill="#e2e8f0" fontSize={11}>x − 1</text>
        <text x={72} y={120} textAnchor="middle" fill="#7dd3fc" fontSize={11} fontWeight={700}>y = {round(y, 2)}</text>

        <rect x={146} y={16} width={132} height={122} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
        <text x={212} y={36} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>2. Vegyél ln-t!</text>
        <text x={212} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>ln(x²+1)</text>
        <text x={212} y={82} textAnchor="middle" fill="#a7f3d0" fontSize={10.5}>+ ½ ln(x+3)</text>
        <text x={212} y={102} textAnchor="middle" fill="#fca5a5" fontSize={10.5}>− ln(x−1)</text>
        <text x={212} y={124} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>(csak összeg/különbség!)</text>

        <rect x={290} y={16} width={132} height={122} rx={8} fill="#0f172a" stroke="#a78bfa" strokeWidth={1.6} />
        <text x={356} y={36} textAnchor="middle" fill="#c4b5fd" fontSize={11} fontWeight={700}>3. Deriválj: y′/y</text>
        <text x={356} y={60} textAnchor="middle" fill="#7dd3fc" fontSize={10.5}>+{round(t1, 3)}  (x²+1)</text>
        <text x={356} y={80} textAnchor="middle" fill="#6ee7b7" fontSize={10.5}>+{round(t2, 3)}  (√(x+3))</text>
        <text x={356} y={100} textAnchor="middle" fill="#fca5a5" fontSize={10.5}>{round(t3, 3)}  (x−1)</text>
        <text x={356} y={124} textAnchor="middle" fill="#c4b5fd" fontSize={11} fontWeight={700}>y′/y = {round(rel, 3)}</text>

        <rect x={434} y={16} width={116} height={122} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={2} />
        <text x={492} y={36} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>4. Szorozz y-nal!</text>
        <text x={492} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={11}>y′ = y · (y′/y)</text>
        <text x={492} y={92} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>
          {round(y, 2)} · ({round(rel, 3)})
        </text>
        <text x={492} y={122} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>
          y′ = {round(dy, 2)}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): ln(1+x) ≈ x linearizáció */

export function LnLinearizationWidget() {
  const [x, setX] = useState(0.2);
  const exact = Math.log(1 + x);
  const err = Math.abs(x - exact);

  return (
    <div className="widget">
      <div className="widget-title">Kis x-ekre: ln(1 + x) ≈ x — interaktív linearizációs grafikon</div>
      <label>
        Vizsgált pont: <M t={`x = ${tx(x, 2)}`} /> (<M t={`\\ln(1+x) = ${tx(exact, 4)}`} />, hiba:{' '}
        <M t={tx(err, 4)} />)
        <input type="range" min={-0.5} max={1.0} step={0.02} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.7} xmax={1.2} ymin={-0.9} ymax={1.15} h={200}>
        {(m) => {
          const dLn = buildPath((u) => (u > -0.95 ? Math.log(1 + u) : Number.NaN), -0.68, 1.2, m.X, m.Y, 160);
          return (
            <>
              <line x1={m.X(-0.7)} y1={m.Y(-0.7)} x2={m.X(1.15)} y2={m.Y(1.15)} stroke="#fbbf24" strokeWidth={2} strokeDasharray="6 4" />
              <path d={dLn} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <line x1={m.X(x)} y1={m.Y(exact)} x2={m.X(x)} y2={m.Y(x)} stroke="#f87171" strokeWidth={2.2} />
              <circle cx={m.X(x)} cy={m.Y(exact)} r={4.8} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.3} />
              <circle cx={m.X(x)} cy={m.Y(x)} r={4.8} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.3} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Az <M t="x = 0" /> közelében a sárga <M t="y = x" /> érintő szinte rásimul a kék <M t="y = \ln(1+x)" /> görbére (pl.{' '}
          <M t="x = 0{,}01" />-nél a hiba kisebb mint <M t="0{,}00005" />!).
        </p>
      </div>
    </div>
  );
}
