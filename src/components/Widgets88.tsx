import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';

const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

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
    if (!Number.isFinite(y) || Math.abs(y) > 40) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
    pen = true;
  }
  return d;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): I. típusú integrál határértéke */

export function Type1LimitAreaWidget() {
  const [kind, setKind] = useState<'exp' | 'atan' | 'inv'>('exp');
  const [b, setB] = useState(4);

  const cfg = {
    exp: {
      fn: (x: number) => Math.exp(-x),
      a: 0,
      area: (B: number) => 1 - Math.exp(-B),
      limitTex: '1 \\text{ (konvergens)}',
      xmin: -0.3,
      xmax: 10.5,
      ymin: -0.1,
      ymax: 1.15,
      color: '#34d399',
    },
    atan: {
      fn: (x: number) => 1 / (1 + x * x),
      a: 0,
      area: (B: number) => Math.atan(B),
      limitTex: '\\frac{\\pi}{2} \\approx 1{,}571 \\text{ (konvergens)}',
      xmin: -0.3,
      xmax: 10.5,
      ymin: -0.1,
      ymax: 1.15,
      color: '#38bdf8',
    },
    inv: {
      fn: (x: number) => (x <= 0.05 ? NaN : 1 / x),
      a: 1,
      area: (B: number) => Math.log(B),
      limitTex: '+\\infty \\text{ (divergens!)}',
      xmin: 0.5,
      xmax: 10.5,
      ymin: -0.1,
      ymax: 1.15,
      color: '#fb7185',
    },
  }[kind];

  const bClamped = Math.max(cfg.a + 0.5, b);
  const val = cfg.area(bClamped);

  return (
    <div className="widget">
      <div className="widget-title">I. típusú improprius integrál: hogyan alakul a terület, ha b → ∞?</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <button type="button" className={kind === 'exp' ? 'btn-active' : ''} onClick={() => setKind('exp')}>
          ∫₀^b e⁻ˣ dx → 1
        </button>
        <button type="button" className={kind === 'atan' ? 'btn-active' : ''} onClick={() => setKind('atan')}>
          ∫₀^b 1/(1+x²) dx → π/2
        </button>
        <button type="button" className={kind === 'inv' ? 'btn-active' : ''} onClick={() => setKind('inv')}>
          ∫₁^b (1/x) dx → ∞
        </button>
        <label style={{ fontSize: 13 }}>
          b = {round(bClamped, 1)}{' '}
          <input type="range" min={1.5} max={10} step={0.5} value={bClamped} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={cfg.xmin} xmax={cfg.xmax} ymin={cfg.ymin} ymax={cfg.ymax} w={560} h={185}>
        {({ X, Y }) => {
          let fillD = `M${X(cfg.a).toFixed(1)},${Y(0).toFixed(1)} `;
          for (let i = 0; i <= 80; i++) {
            const x = cfg.a + ((bClamped - cfg.a) * i) / 80;
            fillD += `L${X(x).toFixed(1)},${Y(cfg.fn(x)).toFixed(1)} `;
          }
          fillD += `L${X(bClamped).toFixed(1)},${Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={fillD} fill={`${cfg.color}33`} />
              <path d={buildPath(cfg.fn, cfg.a, 10.5, X, Y, 160)} fill="none" stroke={cfg.color} strokeWidth={2.4} />
              <line x1={X(bClamped)} x2={X(bClamped)} y1={Y(0)} y2={Y(cfg.fn(bClamped))} stroke="#fbbf24" strokeWidth={2} />
            </>
          );
        }}
      </Chart>

      <div style={{ marginTop: 6, fontSize: 13 }}>
        <M t={`A(${tx(bClamped, 1)}) = ${tx(val, 4)} \\qquad \\xrightarrow{b\\to\\infty} \\qquad ${cfg.limitTex}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): p-integrál végtelenben */

export function PIntegralInfinityWidget() {
  const [p, setP] = useState(2.0);
  const conv = p > 1;

  return (
    <div className="widget">
      <div className="widget-title">
        A p-skála végtelenben: <M t={`\\int_1^{\\infty} \\frac{dx}{x^{${tx(p, 1)}}}`} /> — a <M t="p=1" /> a határ!
      </div>
      <div className="widget-controls" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ fontSize: 13 }}>
          Kitevő p = <strong>{round(p, 1)}</strong>{' '}
          <input type="range" min={0.5} max={3.0} step={0.1} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
        <span style={{ fontSize: 13, fontWeight: 700, color: conv ? '#34d399' : '#fb7185' }}>
          {conv ? `KONVERGENS: 1/(p−1) = ${round(1 / (p - 1), 3)}` : 'DIVERGENS (+∞)'}
        </span>
      </div>

      <Chart xmin={0.8} xmax={8.2} ymin={-0.1} ymax={1.15} w={560} h={185}>
        {({ X, Y }) => (
          <>
            <path d={buildPath((x) => 1 / x, 1, 8.2, X, Y, 140)} fill="none" stroke="#94a3b8" strokeWidth={1.6} strokeDasharray="5 4" />
            <path
              d={buildPath((x) => 1 / x ** p, 1, 8.2, X, Y, 140)}
              fill="none"
              stroke={conv ? '#34d399' : '#fb7185'}
              strokeWidth={2.6}
            />
            <text x={X(5.6)} y={Y(1 / 5.6) - 8} fill="#94a3b8" fontSize={10}>
              1/x (határvonal, p=1)
            </text>
          </>
        )}
      </Chart>
      <div className="widget-note">
        Ha p &gt; 1, a görbe gyorsabban simul a tengelyhez, mint 1/x (zöld → véges terület). Ha p ≤ 1, túl lassan csökken (piros → végtelen terület).
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): p-integrál nullában (fordított!) */

export function PIntegralZeroWidget() {
  const [p, setP] = useState(0.5);
  const conv = p < 1;

  return (
    <div className="widget">
      <div className="widget-title">
        A p-skála 0-nál FORDÍTOTT: <M t={`\\int_0^1 \\frac{dx}{x^{${tx(p, 1)}}}`} />
      </div>
      <div className="widget-controls" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ fontSize: 13 }}>
          Kitevő p = <strong>{round(p, 1)}</strong>{' '}
          <input type="range" min={0.2} max={2.0} step={0.1} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
        <span style={{ fontSize: 13, fontWeight: 700, color: conv ? '#34d399' : '#fb7185' }}>
          {conv ? `KONVERGENS: 1/(1−p) = ${round(1 / (1 - p), 3)}` : 'DIVERGENS (+∞)'}
        </span>
      </div>

      <Chart xmin={-0.05} xmax={1.15} ymin={-0.2} ymax={6.2} w={560} h={185}>
        {({ X, Y }) => (
          <>
            <path d={buildPath((x) => (x < 0.16 ? NaN : 1 / x), 0.16, 1.0, X, Y, 120)} fill="none" stroke="#94a3b8" strokeWidth={1.6} strokeDasharray="5 4" />
            <path
              d={buildPath((x) => (x < 0.01 || 1 / x ** p > 6.2 ? NaN : 1 / x ** p), 0.01, 1.0, X, Y, 180)}
              fill="none"
              stroke={conv ? '#34d399' : '#fb7185'}
              strokeWidth={2.6}
            />
            <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(6.2)} stroke="#fbbf24" strokeDasharray="3 3" />
          </>
        )}
      </Chart>
      <div className="widget-note">
        0 közelében pontosan fordítva igaz: p &lt; 1 esetén „elég vékony” a végtelen csúcs ahhoz, hogy véges területe legyen!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Belső aszimptota csapda */

export function InteriorAsymptoteTrapWidget() {
  const [mode, setMode] = useState<'conv' | 'trap'>('trap');

  return (
    <div className="widget">
      <div className="widget-title">Belső aszimptota: ketté kell vágni, különben a Newton–Leibniz hazudik!</div>
      <div className="widget-controls" style={{ display: 'flex', gap: 8 }}>
        <button type="button" className={mode === 'trap' ? 'btn-active' : ''} onClick={() => setMode('trap')}>
          Csapda: ∫₋₁¹ (1/x²) dx = +∞ (NEM −2!)
        </button>
        <button type="button" className={mode === 'conv' ? 'btn-active' : ''} onClick={() => setMode('conv')}>
          Konvergens: ∫₀³ (x−1)⁻²/³ dx = 3+3∛2
        </button>
      </div>

      {mode === 'trap' ? (
        <Chart xmin={-1.2} xmax={1.2} ymin={-0.3} ymax={8.5} w={560} h={185}>
          {({ X, Y }) => (
            <>
              <path d={buildPath((x) => (Math.abs(x) < 0.34 ? NaN : 1 / (x * x)), -1, -0.34, X, Y, 100)} fill="none" stroke="#fb7185" strokeWidth={2.5} />
              <path d={buildPath((x) => (Math.abs(x) < 0.34 ? NaN : 1 / (x * x)), 0.34, 1, X, Y, 100)} fill="none" stroke="#fb7185" strokeWidth={2.5} />
              <line x1={X(0)} x2={X(0)} y1={Y(-0.3)} y2={Y(8.5)} stroke="#fbbf24" strokeDasharray="4 3" strokeWidth={1.8} />
              <text x={X(0.06)} y={Y(7.4)} fill="#fbbf24" fontSize={10.5} fontWeight={700}>x = 0: aszimptota!</text>
            </>
          )}
        </Chart>
      ) : (
        <Chart xmin={-0.2} xmax={3.2} ymin={-0.3} ymax={6.5} w={560} h={185}>
          {({ X, Y }) => (
            <>
              <path d={buildPath((x) => (Math.abs(x - 1) < 0.06 ? NaN : Math.abs(x - 1) ** (-2 / 3)), 0, 0.94, X, Y, 100)} fill="none" stroke="#34d399" strokeWidth={2.5} />
              <path d={buildPath((x) => (Math.abs(x - 1) < 0.06 ? NaN : Math.abs(x - 1) ** (-2 / 3)), 1.06, 3, X, Y, 120)} fill="none" stroke="#34d399" strokeWidth={2.5} />
              <line x1={X(1)} x2={X(1)} y1={Y(-0.3)} y2={Y(6.5)} stroke="#fbbf24" strokeDasharray="4 3" strokeWidth={1.8} />
              <text x={X(1.08)} y={Y(5.6)} fill="#fbbf24" fontSize={10.5} fontWeight={700}>x = 1: kettévágás!</text>
            </>
          )}
        </Chart>
      )}
      <div className="widget-note">
        {mode === 'trap'
          ? 'Ha vakon írod: [−1/x]₋₁¹ = −1 − 1 = −2 — nyilvánvaló képtelenség, hiszen 1/x² > 0! A 0-nál kettévágva mindkét fél +∞.'
          : 'Thomas 5. példa: 0-tól 1-ig 3, 1-től 3-ig 3∛2 — mivel p = 2/3 < 1, mindkét fél véges, az összeg 3 + 3∛2 ≈ 6,78.'}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Direkt összehasonlítás */

export function DirectComparisonWidget() {
  const [idx, setIdx] = useState(0);
  const cases = [
    {
      label: 'e⁻ˣ² ≤ e⁻ˣ (Konvergens)',
      f: (x: number) => Math.exp(-x * x),
      g: (x: number) => Math.exp(-x),
      fName: 'e⁻ˣ²',
      gName: 'e⁻ˣ (konvergens)',
      verdict: 'Mivel 0 ≤ e⁻ˣ² ≤ e⁻ˣ (x ≥ 1) és ∫₁^∞ e⁻ˣ dx = 1/e véges, ∫₁^∞ e⁻ˣ² dx is KONVERGENS!',
      conv: true,
    },
    {
      label: 'sin²x / x² ≤ 1/x² (Konvergens)',
      f: (x: number) => Math.sin(x) ** 2 / (x * x),
      g: (x: number) => 1 / (x * x),
      fName: 'sin²x / x²',
      gName: '1/x² (konvergens)',
      verdict: 'Mivel 0 ≤ sin²x/x² ≤ 1/x² és ∫₁^∞ (1/x²) dx = 1 véges, a kisebb is KONVERGENS!',
      conv: true,
    },
    {
      label: '1/√(x²−0,1) ≥ 1/x (Divergens)',
      f: (x: number) => 1 / Math.sqrt(x * x - 0.1),
      g: (x: number) => 1 / x,
      fName: '1/√(x²−0,1)',
      gName: '1/x (divergens)',
      verdict: 'Mivel 1/√(x²−0,1) ≥ 1/x > 0 és ∫₁^∞ (1/x) dx = ∞, a nagyobb is DIVERGENS!',
      conv: false,
    },
  ];
  const c = cases[idx];

  return (
    <div className="widget">
      <div className="widget-title">Direkt összehasonlító kritérium vizuálisan</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {cases.map((item, i) => (
          <button key={item.label} type="button" className={idx === i ? 'btn-active' : ''} onClick={() => setIdx(i)}>
            {item.label}
          </button>
        ))}
      </div>

      <Chart xmin={0.8} xmax={6.2} ymin={-0.08} ymax={1.15} w={560} h={185}>
        {({ X, Y }) => (
          <>
            <path d={buildPath(c.g, 1, 6.2, X, Y, 150)} fill="none" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 3" />
            <path d={buildPath(c.f, 1, 6.2, X, Y, 150)} fill="none" stroke={c.conv ? '#34d399' : '#fb7185'} strokeWidth={2.6} />
          </>
        )}
      </Chart>
      <div className="widget-note" style={{ color: c.conv ? '#a7f3d0' : '#fda4af' }}>
        Szaggatott szürke: {c.gName} · Folytonos: {c.fName}. {c.verdict}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Hányadosteszt */

export function LimitComparisonRatioWidget() {
  const [idx, setIdx] = useState(0);
  const cases = [
    {
      label: '1/(1+x²) vs. 1/x² (L=1)',
      ratio: (x: number) => (x * x) / (1 + x * x),
      L: 1,
      desc: 'L = 1 ∈ (0, ∞), ∫₁^∞ (1/x²) dx konvergens ⇒ ∫₁^∞ 1/(1+x²) dx is KONVERGENS (értéke π/4, míg 1/x²-é 1).',
      ymax: 1.4,
    },
    {
      label: '3/(eˣ+5) vs. 1/eˣ (L=3)',
      ratio: (x: number) => (3 * Math.exp(x)) / (Math.exp(x) + 5),
      L: 3,
      desc: 'L = 3 ∈ (0, ∞), ∫₁^∞ e⁻ˣ dx konvergens ⇒ ∫₁^∞ 3/(eˣ+5) dx is KONVERGENS!',
      ymax: 3.6,
    },
    {
      label: 'x/(x²+3) vs. 1/x (L=1)',
      ratio: (x: number) => (x * x) / (x * x + 3),
      L: 1,
      desc: 'L = 1 ∈ (0, ∞), ∫₁^∞ (1/x) dx divergens ⇒ ∫₁^∞ x/(x²+3) dx is DIVERGENS!',
      ymax: 1.4,
    },
  ];
  const c = cases[idx];

  return (
    <div className="widget">
      <div className="widget-title">Hányadosteszt: a f(x)/g(x) arány stabilizálódik egy 0 &lt; L &lt; ∞ számnál</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {cases.map((item, i) => (
          <button key={item.label} type="button" className={idx === i ? 'btn-active' : ''} onClick={() => setIdx(i)}>
            {item.label}
          </button>
        ))}
      </div>

      <Chart xmin={0.5} xmax={10.5} ymin={-0.1} ymax={c.ymax} w={560} h={175}>
        {({ X, Y }) => (
          <>
            <line x1={X(0.5)} x2={X(10.5)} y1={Y(c.L)} y2={Y(c.L)} stroke="#fbbf24" strokeDasharray="5 4" strokeWidth={1.6} />
            <path d={buildPath(c.ratio, 1, 10.5, X, Y, 150)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            <text x={X(8.6)} y={Y(c.L) - 7} fill="#fbbf24" fontSize={11} fontWeight={700}>
              L = {c.L}
            </text>
          </>
        )}
      </Chart>
      <div className="widget-note">{c.desc}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): A 6 improprius típus térképe */

export function SixImproperTypesDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Az improprius integrálok mind a 6 fajtája (Thomas 287. oldal)</div>
      <svg viewBox="0 0 560 180" className="plane" role="img" aria-label="Hat improprius integrál típus">
        <rect width={560} height={180} className="pl-bg" />

        {/* Bal oszlop: I. típus */}
        <g transform="translate(12, 12)">
          <rect width={262} height={156} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>I. TÍPUS: Végtelen intervallum</text>
          <text x={16} y={48} fill="#e2e8f0" fontSize={10.5}>1. [a, ∞):  lim(b→∞) ∫ₐᵇ f(x) dx</text>
          <text x={16} y={76} fill="#e2e8f0" fontSize={10.5}>2. (−∞, b]: lim(a→−∞) ∫ₐᵇ f(x) dx</text>
          <text x={16} y={104} fill="#fde68a" fontSize={10.5}>3. (−∞, ∞): ∫₋∞ᶜ + ∫ᶜ∞  (két külön határ!)</text>
          <text x={16} y={136} fill="#94a3b8" fontSize={9.5}>Mintaskála: ∫₁^∞ 1/xᵖ konvergens ⇔ p &gt; 1</text>
        </g>

        {/* Jobb oszlop: II. típus */}
        <g transform="translate(286, 12)">
          <rect width={262} height={156} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#f59e0b" fontSize={11.5} fontWeight={700}>II. TÍPUS: Nem korlátos integrandus</text>
          <text x={16} y={48} fill="#e2e8f0" fontSize={10.5}>4. Felső végpont b: lim(c→b⁻) ∫ₐᶜ f(x) dx</text>
          <text x={16} y={76} fill="#e2e8f0" fontSize={10.5}>5. Alsó végpont a:  lim(c→a⁺) ∫ᶜᵇ f(x) dx</text>
          <text x={16} y={104} fill="#fb7185" fontSize={10.5}>6. Belső pont c:    ∫ₐᶜ + ∫ᶜᵇ  (kettévágás!)</text>
          <text x={16} y={136} fill="#94a3b8" fontSize={9.5}>Mintaskála: ∫₀¹ 1/xᵖ konvergens ⇔ p &lt; 1</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. oldal (8. ábra): Döntési fa */

export function ImproperDecisionTreeDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Improprius integrálok döntési fája (vizsgastratégia)</div>
      <svg viewBox="0 0 560 176" className="plane" role="img" aria-label="Improprius integrálok döntési fája">
        <rect width={560} height={176} className="pl-bg" />

        <g transform="translate(14, 14)">
          <rect width={166} height={64} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
          <text x={83} y={22} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>1. Baj-pontok keresése</text>
          <text x={83} y={40} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>∞, −∞ vagy 0 nevező?</text>
          <text x={83} y={55} textAnchor="middle" fill="#fb7185" fontSize={9.5}>Ha több van → vágd szét!</text>
        </g>

        <path d="M183,46 L201,46" stroke="#64748b" strokeWidth={2} />
        <polygon points="201,42 208,46 201,50" fill="#64748b" />

        <g transform="translate(210, 14)">
          <rect width={160} height={64} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={80} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>2. Kell a pontos érték?</text>
          <text x={80} y={40} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>IGEN → Primitív + lim</text>
          <text x={80} y={55} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>(L’Hospital, arctg, ln…)</text>
        </g>

        <path d="M373,46 L391,46" stroke="#64748b" strokeWidth={2} />
        <polygon points="391,42 398,46 391,50" fill="#64748b" />

        <g transform="translate(400, 14)">
          <rect width={146} height={64} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={73} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>3. Csak konvergencia?</text>
          <text x={73} y={40} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>Direkt vagy Hányados-</text>
          <text x={73} y={55} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>teszt (1/xᵖ, e⁻ˣ)</text>
        </g>

        <g transform="translate(40, 102)">
          <rect width={480} height={58} rx={8} fill="rgba(52,211,153,0.10)" stroke="#34d399" strokeWidth={1.4} />
          <text x={240} y={22} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>
            ARANY TÖRVÉNY: Ha a darabolásnál BÁRMELYIK rész divergens ⇒ az egész DIVERGENS!
          </text>
          <text x={240} y={44} textAnchor="middle" fill="#cbd5e1" fontSize={10}>
            ∞-nél p &gt; 1 konvergens · 0-nál p &lt; 1 konvergens · p = 1 (1/x) MINDKÉT helyen divergens!
          </text>
        </g>
      </svg>
    </div>
  );
}
