import { useState } from 'react';

/* ============================================================================
   11.7. Hatványsorok — 8 interaktív és szemléltető SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

/* ------------------------------------------------------------------ 1. Mértani hatványsor közelítése */
export function GeometricPowerSeriesWidget() {
  const [N, setN] = useState(4);
  const W = 540;
  const H = 250;
  const xMin = -1.6;
  const xMax = 1.6;
  const yMin = -2.5;
  const yMax = 5.5;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);

  const clampY = (y: number) => Math.max(yMin - 0.8, Math.min(yMax + 0.8, y));

  const polyVal = (x: number, deg: number) => {
    let s = 0;
    let p = 1;
    for (let k = 0; k <= deg; k++) {
      s += p;
      p *= x;
    }
    return s;
  };

  // f(x) = 1/(1-x) két ága (x < 0.88 és x > 1.12)
  const buildPath = (fn: (x: number) => number, a: number, b: number, steps = 120) => {
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const xv = a + ((b - a) * i) / steps;
      const yv = clampY(fn(xv));
      d += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yv).toFixed(1)} `;
    }
    return d;
  };

  const fLeft = buildPath((x) => 1 / (1 - x), xMin, 0.82, 100);
  const fRight = buildPath((x) => 1 / (1 - x), 1.25, xMax, 40);
  const pPath = buildPath((x) => polyVal(x, N), xMin, xMax, 160);

  const xSample = 0.6;
  const exact = 1 / (1 - xSample);
  const approx = polyVal(xSample, N);
  const err = Math.abs(exact - approx);

  return (
    <div className="widget">
      <div className="wtitle">A mértani hatványsor részletösszegei: Pₙ(x) = 1 + x + … + xⁿ vs. 1/(1 − x)</div>
      <div className="wcontrols">
        <label>
          Fokszám <b>N = {N}</b>
          <input type="range" min={0} max={12} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="geoClip117">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        {/* Konvergenciasáv (-1, 1) */}
        <rect
          x={X(-1)}
          y={padT}
          width={X(1) - X(-1)}
          height={H - padT - padB}
          fill="rgba(52, 211, 153, 0.1)"
        />
        <line x1={X(-1)} y1={padT} x2={X(-1)} y2={H - padB} stroke="#34d399" strokeDasharray="4 4" opacity={0.6} />
        <line x1={X(1)} y1={padT} x2={X(1)} y2={H - padB} stroke="#f87171" strokeDasharray="4 4" opacity={0.75} />

        {/* Tengelyek */}
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />

        <g clipPath="url(#geoClip117)">
          <path d={fLeft} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          <path d={fRight} fill="none" stroke="#38bdf8" strokeWidth={2} strokeDasharray="4 4" opacity={0.55} />
          <path d={pPath} fill="none" stroke="#fb923c" strokeWidth={2.4} />
          <circle cx={X(xSample)} cy={Y(exact)} r={4.2} fill="#38bdf8" />
          <circle cx={X(xSample)} cy={Y(approx)} r={4.2} fill="#fbbf24" />
        </g>

        {/* Feliratok */}
        <text x={X(-1)} y={H - 12} textAnchor="middle" fill="#34d399" fontSize={11}>−1</text>
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(1)} y={H - 12} textAnchor="middle" fill="#f87171" fontSize={11}>1 (aszimptota)</text>
        <text x={X(0)} y={padT + 14} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={600}>
          konvergenciasáv (−1, 1)
        </text>
        <text x={padL + 8} y={padT + 30} fill="#38bdf8" fontSize={11}>— 1/(1−x)</text>
        <text x={padL + 8} y={padT + 45} fill="#fb923c" fontSize={11}>— P_{N}(x)</text>
      </svg>
      <div className="readout">
        x = 0,6-nál: <b>1/(1 − 0,6) = 2,5000</b> · P<sub>{N}</sub>(0,6) = <b>{approx.toFixed(4)}</b> · hiba ={' '}
        <b>{err.toFixed(4)}</b>. Figyeld meg: |x| &lt; 1 esetén rásimul, |x| ≥ 1-nél szétrobban!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Konvergenciasugár 3 esete (18. tétel) */
type RadiusCase = {
  id: string;
  label: string;
  formula: string;
  a: number;
  R: number | 'inf';
  leftClosed: boolean;
  rightClosed: boolean;
  interval: string;
  note: string;
};

const RADIUS_CASES: RadiusCase[] = [
  {
    id: 'r0',
    label: 'R = 0 (csak középpont)',
    formula: '∑ n! · xⁿ',
    a: 0,
    R: 0,
    leftClosed: true,
    rightClosed: true,
    interval: '{0}',
    note: 'A faktoriális minden x ≠ 0 esetén legyőzi xⁿ-t: csak x = 0-ban konvergens.',
  },
  {
    id: 'r1',
    label: 'R = 1, a = 0',
    formula: '∑ xⁿ / n',
    a: 0,
    R: 1,
    leftClosed: true,
    rightClosed: false,
    interval: '[−1, 1)',
    note: 'Belsejében (−1, 1) abszolút konvergens; x = −1-nél Leibniz miatt konvergens, x = 1-nél harmonikus (divergens).',
  },
  {
    id: 'r3',
    label: 'R = 3, a = 2',
    formula: '∑ (x − 2)ⁿ / 3ⁿ',
    a: 2,
    R: 3,
    leftClosed: false,
    rightClosed: false,
    interval: '(−1, 5)',
    note: 'Az a = 2 középpont körül szimmetrikus: |x − 2| < 3 ⇔ −1 < x < 5. Mindkét végpontban a tagok nem tartanak 0-hoz.',
  },
  {
    id: 'rinf',
    label: 'R = ∞ (teljes ℝ)',
    formula: '∑ xⁿ / n!',
    a: 0,
    R: 'inf',
    leftClosed: false,
    rightClosed: false,
    interval: '(−∞, ∞)',
    note: 'Az exponenciális sor (eˣ) minden valós x-re abszolút konvergens: R = ∞.',
  },
];

export function RadiusOfConvergenceWidget() {
  const [idx, setIdx] = useState(2);
  const c = RADIUS_CASES[idx];
  const W = 540;
  const H = 155;
  const xMin = -4;
  const xMax = 6;
  const X = (v: number) => 36 + ((v - xMin) / (xMax - xMin)) * (W - 72);
  const yLine = 84;

  return (
    <div className="widget">
      <div className="wtitle">A konvergenciasugár (R) és a szimmetrikus konvergenciaintervallum</div>
      <div className="relbuttons chips">
        {RADIUS_CASES.map((rc, i) => (
          <button key={rc.id} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {rc.label}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        {/* Divergencia háttérvonal */}
        <line x1={26} y1={yLine} x2={W - 26} y2={yLine} stroke="#f87171" strokeWidth={3} opacity={0.45} />
        {/* Beosztások */}
        {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={yLine - 6} x2={X(t)} y2={yLine + 6} stroke="#64748b" strokeWidth={1.2} />
            <text x={X(t)} y={yLine + 24} textAnchor="middle" fill="#94a3b8" fontSize={11}>
              {t}
            </text>
          </g>
        ))}

        {/* Konvergenciatartomány */}
        {c.R === 'inf' ? (
          <>
            <line x1={26} y1={yLine} x2={W - 26} y2={yLine} stroke="#34d399" strokeWidth={6} />
            <text x={W / 2} y={42} textAnchor="middle" fill="#6ee7b7" fontSize={13} fontWeight={700}>
              Minden x ∈ ℝ esetén abszolút konvergens (R = ∞)
            </text>
          </>
        ) : c.R === 0 ? (
          <>
            <circle cx={X(c.a)} cy={yLine} r={7} fill="#34d399" stroke="#fff" strokeWidth={2} />
            <text x={X(c.a)} y={42} textAnchor="middle" fill="#fbbf24" fontSize={13} fontWeight={700}>
              Csak a = {c.a} pontban konvergens (R = 0)
            </text>
          </>
        ) : (
          <>
            <line
              x1={X(c.a - c.R)}
              y1={yLine}
              x2={X(c.a + c.R)}
              y2={yLine}
              stroke="#34d399"
              strokeWidth={6}
            />
            {/* R nyilak */}
            <line x1={X(c.a - c.R) + 4} y1={52} x2={X(c.a) - 4} y2={52} stroke="#38bdf8" strokeWidth={1.6} />
            <line x1={X(c.a) + 4} y1={52} x2={X(c.a + c.R) - 4} y2={52} stroke="#38bdf8" strokeWidth={1.6} />
            <text x={X(c.a - c.R / 2)} y={45} textAnchor="middle" fill="#7dd3fc" fontSize={11}>R = {c.R}</text>
            <text x={X(c.a + c.R / 2)} y={45} textAnchor="middle" fill="#7dd3fc" fontSize={11}>R = {c.R}</text>

            {/* Bal és jobb végpont */}
            <circle
              cx={X(c.a - c.R)}
              cy={yLine}
              r={6.5}
              fill={c.leftClosed ? '#34d399' : '#0f172a'}
              stroke={c.leftClosed ? '#fff' : '#fb923c'}
              strokeWidth={2.2}
            />
            <circle
              cx={X(c.a + c.R)}
              cy={yLine}
              r={6.5}
              fill={c.rightClosed ? '#34d399' : '#0f172a'}
              stroke={c.rightClosed ? '#fff' : '#fb923c'}
              strokeWidth={2.2}
            />
          </>
        )}

        {/* Középpont */}
        <circle cx={X(c.a)} cy={yLine} r={4.5} fill="#fbbf24" />
        <text x={X(c.a)} y={yLine + 44} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>
          középpont a = {c.a}
        </text>
        <text x={W - 26} y={24} textAnchor="end" fill="#e2e8f0" fontSize={12} fontWeight={700}>
          {c.formula}  ⇒  I = {c.interval}
        </text>
      </svg>
      <div className="readout">{c.note}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Végpont-vizsgáló: a 4 lehetséges intervallumtípus */
const ENDPOINT_CASES = [
  {
    name: '∑ xⁿ',
    interval: '(−1, 1)',
    leftSeries: '∑ (−1)ⁿ',
    leftOk: false,
    leftWhy: 'aₙ ↛ 0 (oszcillál)',
    rightSeries: '∑ 1',
    rightOk: false,
    rightWhy: 'aₙ ↛ 0 (divergens)',
  },
  {
    name: '∑ xⁿ / n',
    interval: '[−1, 1)',
    leftSeries: '∑ (−1)ⁿ / n',
    leftOk: true,
    leftWhy: 'alternáló harmonikus (Leibniz ✓)',
    rightSeries: '∑ 1 / n',
    rightOk: false,
    rightWhy: 'harmonikus sor (p = 1 ✗)',
  },
  {
    name: '∑ (−1)ⁿ xⁿ / n',
    interval: '(−1, 1]',
    leftSeries: '∑ 1 / n',
    leftOk: false,
    leftWhy: 'harmonikus sor (p = 1 ✗)',
    rightSeries: '∑ (−1)ⁿ / n',
    rightOk: true,
    rightWhy: 'alternáló harmonikus (Leibniz ✓)',
  },
  {
    name: '∑ xⁿ / n²',
    interval: '[−1, 1]',
    leftSeries: '∑ (−1)ⁿ / n²',
    leftOk: true,
    leftWhy: 'abszolút konvergens (p = 2 ✓)',
    rightSeries: '∑ 1 / n²',
    rightOk: true,
    rightWhy: 'p-sor, p = 2 > 1 (✓)',
  },
];

export function EndpointTesterWidget() {
  const [sel, setSel] = useState(1);
  const e = ENDPOINT_CASES[sel];
  const W = 540;
  const H = 160;

  return (
    <div className="widget">
      <div className="wtitle">Azonos sugár (R = 1), négy különböző konvergenciaintervallum</div>
      <div className="relbuttons chips">
        {ENDPOINT_CASES.map((item, i) => (
          <button key={item.name} className={i === sel ? 'on' : ''} onClick={() => setSel(i)}>
            {item.name} → {item.interval}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        {/* Bal végpont kártya */}
        <rect
          x={16}
          y={20}
          width={235}
          height={120}
          rx={12}
          fill={e.leftOk ? 'rgba(52, 211, 153, 0.12)' : 'rgba(248, 113, 113, 0.12)'}
          stroke={e.leftOk ? '#34d399' : '#f87171'}
          strokeWidth={1.6}
        />
        <text x={32} y={44} fill="#fbbf24" fontSize={12} fontWeight={700}>Bal végpont: x = −1</text>
        <text x={32} y={68} fill="#e2e8f0" fontSize={14} fontWeight={700}>{e.leftSeries}</text>
        <text x={32} y={92} fill={e.leftOk ? '#6ee7b7' : '#fca5a5'} fontSize={12} fontWeight={700}>
          {e.leftOk ? '✓ KONVERGENS (zárt végpont)' : '✗ DIVERGENS (nyitott végpont)'}
        </text>
        <text x={32} y={116} fill="#cbd5e1" fontSize={11}>{e.leftWhy}</text>

        {/* Jobb végpont kártya */}
        <rect
          x={289}
          y={20}
          width={235}
          height={120}
          rx={12}
          fill={e.rightOk ? 'rgba(52, 211, 153, 0.12)' : 'rgba(248, 113, 113, 0.12)'}
          stroke={e.rightOk ? '#34d399' : '#f87171'}
          strokeWidth={1.6}
        />
        <text x={305} y={44} fill="#fbbf24" fontSize={12} fontWeight={700}>Jobb végpont: x = +1</text>
        <text x={305} y={68} fill="#e2e8f0" fontSize={14} fontWeight={700}>{e.rightSeries}</text>
        <text x={305} y={92} fill={e.rightOk ? '#6ee7b7' : '#fca5a5'} fontSize={12} fontWeight={700}>
          {e.rightOk ? '✓ KONVERGENS (zárt végpont)' : '✗ DIVERGENS (nyitott végpont)'}
        </text>
        <text x={305} y={116} fill="#cbd5e1" fontSize={11}>{e.rightWhy}</text>

        {/* Összekötő nyíl */}
        <text x={270} y={84} textAnchor="middle" fill="#38bdf8" fontSize={14} fontWeight={700}>↔</text>
      </svg>
      <div className="readout">
        A hányados- és gyökkritérium a végpontokban mindig <b>ρ = 1</b>-et ad, ezért a két végpontot{' '}
        <b>mindig külön behelyettesítéssel</b> kell ellenőrizni!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Tagonkénti differenciálás: 1/(1-x)² */
export function TermByTermDiffWidget() {
  const [N, setN] = useState(4);
  const W = 540;
  const H = 240;
  const xMin = -1.2;
  const xMax = 1.0;
  const yMin = -0.5;
  const yMax = 9.0;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 1, Math.min(yMax + 1, y));

  const diffPoly = (x: number, nMax: number) => {
    let s = 0;
    let p = 1;
    for (let n = 1; n <= nMax; n++) {
      s += n * p;
      p *= x;
    }
    return s;
  };

  let dExact = '';
  for (let i = 0; i <= 110; i++) {
    const xv = xMin + ((0.7 - xMin) * i) / 110;
    const yv = clampY(1 / Math.pow(1 - xv, 2));
    dExact += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yv).toFixed(1)} `;
  }
  let dApprox = '';
  for (let i = 0; i <= 130; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 130;
    const yv = clampY(diffPoly(xv, N));
    dApprox += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yv).toFixed(1)} `;
  }

  const x0 = 0.5;
  const ex0 = 1 / Math.pow(1 - x0, 2); // 4
  const ap0 = diffPoly(x0, N);

  return (
    <div className="widget">
      <div className="wtitle">Tagonkénti differenciálás: d/dx [1/(1−x)] = 1/(1−x)² = ∑ n·xⁿ⁻¹</div>
      <div className="wcontrols">
        <label>
          Tagok száma <b>N = {N}</b>
          <input type="range" min={1} max={12} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="diffClip117">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <rect x={X(-1)} y={padT} width={X(1) - X(-1)} height={H - padT - padB} fill="rgba(56, 189, 248, 0.09)" />
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <g clipPath="url(#diffClip117)">
          <path d={dExact} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          <path d={dApprox} fill="none" stroke="#fbbf24" strokeWidth={2.3} />
          <circle cx={X(x0)} cy={Y(ex0)} r={4.2} fill="#38bdf8" />
          <circle cx={X(x0)} cy={Y(ap0)} r={4.2} fill="#fbbf24" />
        </g>
        <text x={X(-1)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>−1</text>
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(0.5)} y={H - 12} textAnchor="middle" fill="#fbbf24" fontSize={11}>0,5</text>
        <text x={padL + 10} y={padT + 18} fill="#38bdf8" fontSize={11}>— 1/(1−x)²</text>
        <text x={padL + 10} y={padT + 34} fill="#fbbf24" fontSize={11}>— ∑(n=1..{N}) n·xⁿ⁻¹</text>
      </svg>
      <div className="readout">
        x = 0,5-nél: <b>1/(1−0,5)² = 4,0000</b> · P<sub>{N}</sub>(0,5) = <b>{ap0.toFixed(4)}</b>. A konvergenciasugár
        változatlanul <b>R = 1</b>!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Tagonkénti integrálás: ln(1+x) és arctg(x) */
export function TermByTermIntWidget() {
  const [mode, setMode] = useState<'ln' | 'atan'>('ln');
  const [N, setN] = useState(5);
  const W = 540;
  const H = 240;
  const xMin = -1.35;
  const xMax = 1.45;
  const yMin = -1.6;
  const yMax = 1.6;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 0.8, Math.min(yMax + 0.8, y));

  const exactFn = (x: number) => (mode === 'ln' ? Math.log(1 + x) : Math.atan(x));
  const approxFn = (x: number) => {
    let s = 0;
    if (mode === 'ln') {
      for (let n = 1; n <= N; n++) s += (Math.pow(-1, n - 1) * Math.pow(x, n)) / n;
    } else {
      for (let n = 0; n < N; n++) s += (Math.pow(-1, n) * Math.pow(x, 2 * n + 1)) / (2 * n + 1);
    }
    return s;
  };

  let dExact = '';
  const startX = mode === 'ln' ? -0.82 : xMin;
  for (let i = 0; i <= 120; i++) {
    const xv = startX + ((xMax - startX) * i) / 120;
    dExact += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(exactFn(xv))).toFixed(1)} `;
  }
  let dApprox = '';
  for (let i = 0; i <= 140; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 140;
    dApprox += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(approxFn(xv))).toFixed(1)} `;
  }

  const endExact = exactFn(1);
  const endApprox = approxFn(1);

  return (
    <div className="widget">
      <div className="wtitle">Tagonkénti integrálás: új hatványsorok (−1, 1)-en és végponti bónusz!</div>
      <div className="relbuttons chips">
        <button className={mode === 'ln' ? 'on' : ''} onClick={() => setMode('ln')}>
          ln(1 + x) = ∑ (−1)ⁿ⁻¹ xⁿ / n
        </button>
        <button className={mode === 'atan' ? 'on' : ''} onClick={() => setMode('atan')}>
          arctg x = ∑ (−1)ⁿ x²ⁿ⁺¹ / (2n + 1)
        </button>
      </div>
      <div className="wcontrols">
        <label>
          Tagok száma <b>N = {N}</b>
          <input type="range" min={1} max={15} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="intClip117">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <rect x={X(-1)} y={padT} width={X(1) - X(-1)} height={H - padT - padB} fill="rgba(45, 212, 191, 0.1)" />
        <line x1={X(-1)} y1={padT} x2={X(-1)} y2={H - padB} stroke="#2dd4bf" strokeDasharray="4 4" opacity={0.55} />
        <line x1={X(1)} y1={padT} x2={X(1)} y2={H - padB} stroke="#34d399" strokeDasharray="4 4" opacity={0.75} />
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <g clipPath="url(#intClip117)">
          <path d={dExact} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          <path d={dApprox} fill="none" stroke="#34d399" strokeWidth={2.3} />
          <circle cx={X(1)} cy={Y(endExact)} r={4.5} fill="#38bdf8" />
          <circle cx={X(1)} cy={Y(endApprox)} r={4.5} fill="#fbbf24" />
        </g>
        <text x={X(-1)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>−1</text>
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(1)} y={H - 12} textAnchor="middle" fill="#34d399" fontSize={11}>1 (konvergens!)</text>
      </svg>
      <div className="readout">
        x = 1 végpontban: <b>{mode === 'ln' ? 'ln 2' : 'π/4'} ≈ {endExact.toFixed(4)}</b> · P<sub>{N}</sub>(1) ={' '}
        <b>{endApprox.toFixed(4)}</b>. Az integrálás az x = 1 végpontot <b>behozta</b> a konvergenciaintervallumba!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Hatványsor-gyár: helyettesítés és átalakítás */
const SUB_RECIPES = [
  {
    id: 's1',
    title: '1 / (1 + x²)',
    step1: 'u = −x² helyettesítés 1/(1 − u)-ba',
    series: '∑ (−1)ⁿ x²ⁿ = 1 − x² + x⁴ − x⁶ + …',
    cond: '|−x²| < 1  ⇔  |x| < 1',
    R: 'R = 1',
  },
  {
    id: 's2',
    title: 'x / (1 − 2x)',
    step1: 'u = 2x helyettesítés, majd szorzás x-szel',
    series: '∑ 2ⁿ xⁿ⁺¹ = x + 2x² + 4x³ + 8x⁴ + …',
    cond: '|2x| < 1  ⇔  |x| < 1/2',
    R: 'R = 1/2',
  },
  {
    id: 's3',
    title: '1 / (4 − x)',
    step1: '4 kiemelése: (1/4) · 1/(1 − x/4), u = x/4',
    series: '∑ xⁿ / 4ⁿ⁺¹ = 1/4 + x/16 + x²/64 + …',
    cond: '|x/4| < 1  ⇔  |x| < 4',
    R: 'R = 4',
  },
  {
    id: 's4',
    title: '1 / (1 − (x − 2))',
    step1: 'Középpont eltolása a = 2-be: u = x − 2',
    series: '∑ (x − 2)ⁿ = 1 + (x−2) + (x−2)² + …',
    cond: '|x − 2| < 1  ⇔  1 < x < 3',
    R: 'R = 1 (a = 2)',
  },
];

export function SeriesSubstitutionDiagram() {
  const [sel, setSel] = useState(0);
  const r = SUB_RECIPES[sel];
  return (
    <div className="widget">
      <div className="wtitle">Hatványsor-gyár: új sorok az 1/(1 − u) = ∑ uⁿ alapsorból</div>
      <div className="relbuttons chips">
        {SUB_RECIPES.map((item, i) => (
          <button key={item.id} className={i === sel ? 'on' : ''} onClick={() => setSel(i)}>
            {item.title}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 155" className="plot">
        {/* Bal doboz: alapsor */}
        <rect x={14} y={28} width={142} height={96} rx={12} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={85} y={54} textAnchor="middle" fill="#7dd3fc" fontSize={11} fontWeight={700}>ALAPSOR</text>
        <text x={85} y={78} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700}>1 / (1 − u)</text>
        <text x={85} y={102} textAnchor="middle" fill="#94a3b8" fontSize={11}>= ∑ uⁿ  (|u| &lt; 1)</text>

        {/* Nyíl */}
        <line x1={162} y1={76} x2={208} y2={76} stroke="#fbbf24" strokeWidth={2.2} />
        <polygon points="208,71 218,76 208,81" fill="#fbbf24" />
        <text x={188} y={64} textAnchor="middle" fill="#fbbf24" fontSize={10} fontWeight={700}>átalakítás</text>

        {/* Jobb doboz: eredmény */}
        <rect x={224} y={16} width={302} height={122} rx={12} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.6} />
        <text x={240} y={40} fill="#fbbf24" fontSize={12} fontWeight={700}>Cél: {r.title}</text>
        <text x={240} y={62} fill="#cbd5e1" fontSize={11.5}>{r.step1}</text>
        <text x={240} y={88} fill="#6ee7b7" fontSize={13} fontWeight={700}>{r.series}</text>
        <text x={240} y={114} fill="#7dd3fc" fontSize={11.5}>Feltétel: {r.cond}   ({r.R})</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Cauchy-szorzat vizuális tábla (21. tétel) */
export function CauchyProductDiagram() {
  const [nSel, setNSel] = useState(2);
  const terms = [0, 1, 2, 3];
  const cell = 52;
  const startX = 115;
  const startY = 34;

  return (
    <div className="widget">
      <div className="wtitle">Hatványsorok szorzása (21. tétel — Cauchy-szorzat): cₙ = ∑ aₖ bₙ₋ₖ</div>
      <div className="relbuttons chips">
        {terms.map((n) => (
          <button key={n} className={n === nSel ? 'on' : ''} onClick={() => setNSel(n)}>
            c<sub>{n}</sub> (x<sup>{n}</sup> együtthatója)
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 250" className="plot">
        {/* Oszlop- és sorfejlécek */}
        {terms.map((j) => (
          <text key={`col${j}`} x={startX + j * cell + cell / 2} y={24} textAnchor="middle" fill="#7dd3fc" fontSize={12} fontWeight={700}>
            b{j}x^{j}
          </text>
        ))}
        {terms.map((i) => (
          <text key={`row${i}`} x={startX - 14} y={startY + i * cell + cell / 2 + 4} textAnchor="end" fill="#fbbf24" fontSize={12} fontWeight={700}>
            a{i}x^{i}
          </text>
        ))}

        {/* Rács */}
        {terms.map((i) =>
          terms.map((j) => {
            const onDiag = i + j === nSel;
            return (
              <g key={`${i}-${j}`}>
                <rect
                  x={startX + j * cell + 3}
                  y={startY + i * cell + 3}
                  width={cell - 6}
                  height={cell - 6}
                  rx={8}
                  fill={onDiag ? 'rgba(52, 211, 153, 0.25)' : 'rgba(255,255,255,0.04)'}
                  stroke={onDiag ? '#34d399' : 'rgba(148,163,184,0.22)'}
                  strokeWidth={onDiag ? 2 : 1}
                />
                <text
                  x={startX + j * cell + cell / 2}
                  y={startY + i * cell + cell / 2 + 4}
                  textAnchor="middle"
                  fill={onDiag ? '#fff' : '#94a3b8'}
                  fontSize={11.5}
                  fontWeight={onDiag ? 700 : 400}
                >
                  a{i}b{j}
                </text>
              </g>
            );
          })
        )}

        {/* Jobb oldali összegző doboz */}
        <rect x={340} y={48} width={186} height={140} rx={12} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={354} y={76} fill="#7dd3fc" fontSize={12} fontWeight={700}>
          Az x^{nSel} átló összege:
        </text>
        <text x={354} y={104} fill="#6ee7b7" fontSize={13} fontWeight={700}>
          c{nSel} = {Array.from({ length: nSel + 1 }, (_, k) => `a${k}b${nSel - k}`).join(' + ')}
        </text>
        <text x={354} y={136} fill="#cbd5e1" fontSize={11}>
          A szorzatsor legalább a két
        </text>
        <text x={354} y={154} fill="#cbd5e1" fontSize={11}>
          konvergenciasugár kisebbikéig
        </text>
        <text x={354} y={172} fill="#fbbf24" fontSize={11.5} fontWeight={700}>
          (min(R₁, R₂)) biztosan konvergens!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. 11.7 nagy összefoglaló térkép */
export function PowerSeriesToolkitDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">A hatványsorok műveleti térképe: mi történik R-rel és a végpontokkal?</div>
      <svg viewBox="0 0 540 205" className="plot">
        {/* 3 műveleti doboz */}
        <rect x={12} y={16} width={164} height={172} rx={12} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={94} y={40} textAnchor="middle" fill="#7dd3fc" fontSize={12.5} fontWeight={700}>1. Deriválás (19. tétel)</text>
        <text x={24} y={66} fill="#e2e8f0" fontSize={11.5}>∑ n cₙ (x−a)ⁿ⁻¹</text>
        <text x={24} y={92} fill="#6ee7b7" fontSize={11.5} fontWeight={700}>• Sugár: R változatlan</text>
        <text x={24} y={114} fill="#fb923c" fontSize={11}>• Végpontok: elromolhatnak!</text>
        <text x={24} y={142} fill="#94a3b8" fontSize={10.5}>Példa: ln(1+x) → 1/(1+x)</text>
        <text x={24} y={160} fill="#94a3b8" fontSize={10.5}>(−1, 1] → (−1, 1)</text>

        <rect x={188} y={16} width={164} height={172} rx={12} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.5} />
        <text x={270} y={40} textAnchor="middle" fill="#6ee7b7" fontSize={12.5} fontWeight={700}>2. Integrálás (20. tétel)</text>
        <text x={200} y={66} fill="#e2e8f0" fontSize={11.5}>C + ∑ cₙ (x−a)ⁿ⁺¹/(n+1)</text>
        <text x={200} y={92} fill="#6ee7b7" fontSize={11.5} fontWeight={700}>• Sugár: R változatlan</text>
        <text x={200} y={114} fill="#38bdf8" fontSize={11}>• Végpontok: javulhatnak!</text>
        <text x={200} y={142} fill="#94a3b8" fontSize={10.5}>Példa: 1/(1+x²) → arctg x</text>
        <text x={200} y={160} fill="#94a3b8" fontSize={10.5}>(−1, 1) → [−1, 1]</text>

        <rect x={364} y={16} width={164} height={172} rx={12} fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={446} y={40} textAnchor="middle" fill="#fde68a" fontSize={12.5} fontWeight={700}>3. Algebra &amp; szorzás</text>
        <text x={376} y={66} fill="#e2e8f0" fontSize={11.5}>Helyettesítés: u = g(x)</text>
        <text x={376} y={92} fill="#fbbf24" fontSize={11.5} fontWeight={700}>• |g(x)| &lt; R₀ megoldása</text>
        <text x={376} y={114} fill="#cbd5e1" fontSize={11}>• Összeg / Cauchy-szorzat:</text>
        <text x={376} y={136} fill="#6ee7b7" fontSize={11}>  legalább min(R₁, R₂)</text>
        <text x={376} y={160} fill="#94a3b8" fontSize={10.5}>  (21. tétel)</text>
      </svg>
    </div>
  );
}
