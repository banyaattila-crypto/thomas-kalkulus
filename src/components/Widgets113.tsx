import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 3) => v.toFixed(d).replace('.', ',').replace('-0,000', '0,000');

/* -------------------------------------------------------------------------- */
/* 1. NonnegativeSeriesWidget: nemnegatív sor részletösszegei monoton nőnek   */
/* -------------------------------------------------------------------------- */
export function NonnegativeSeriesWidget() {
  const [kind, setKind] = useState<'conv' | 'div'>('conv');
  const N = 16;
  const sums: number[] = [];
  let acc = 0;
  for (let k = 1; k <= N; k++) {
    acc += kind === 'conv' ? 1 / (k * k) : 1 / Math.sqrt(k);
    sums.push(acc);
  }
  const yMax = kind === 'conv' ? 2.15 : 7.0;

  const W = 540;
  const H = 220;
  const ox = 46;
  const xEnd = W - 20;
  const yTop = 22;
  const yBot = H - 28;
  const X = (i: number) => ox + (i / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / yMax) * (yBot - yTop);

  const path = sums.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Nemnegatív tagú sorok (aₙ ≥ 0): s₁ ≤ s₂ ≤ s₃ ≤ … sosem oszcillál!</div>
      <div className="relbuttons chips">
        <button className={kind === 'conv' ? 'on' : ''} onClick={() => setKind('conv')}>
          ∑ 1/n² (korlátos → konvergens, π²/6 ≈ 1,645)
        </button>
        <button className={kind === 'div' ? 'on' : ''} onClick={() => setKind('div')}>
          ∑ 1/√n (nem korlátos → +∞)
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />
        {kind === 'conv' && (
          <>
            <line x1={ox} y1={Y(2)} x2={xEnd} y2={Y(2)} stroke="#fb923c" strokeWidth={1.6} strokeDasharray="5 4" />
            <text x={xEnd} y={Y(2) - 5} textAnchor="end" className="pl-tick">
              felső korlát M = 2
            </text>
            <line x1={ox} y1={Y((Math.PI * Math.PI) / 6)} x2={xEnd} y2={Y((Math.PI * Math.PI) / 6)} stroke="#34d399" strokeWidth={1.8} />
            <text x={xEnd} y={Y((Math.PI * Math.PI) / 6) + 14} textAnchor="end" className="pl-label" fill="#34d399">
              S = π²/6 ≈ 1,645
            </text>
          </>
        )}
        <path d={path} stroke={kind === 'conv' ? '#38bdf8' : '#fb923c'} strokeWidth={2.3} fill="none" />
        {sums.map((v, i) => (
          <circle key={i} cx={X(i)} cy={Y(v)} r={3.8} fill={kind === 'conv' ? '#38bdf8' : '#fb923c'} />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. IntegralTestProofWidget: alsó vs felső téglalapok f(x) = 1/x² alatt     */
/* -------------------------------------------------------------------------- */
export function IntegralTestProofWidget() {
  const [mode, setMode] = useState<'lower' | 'upper'>('lower');
  const [n, setN] = useState(6);

  const W = 540;
  const H = 240;
  const ox = 44;
  const xEnd = W - 24;
  const yTop = 22;
  const yBot = H - 30;
  const xMax = n + 1.4;
  const X = (x: number) => ox + ((x - 0.5) / (xMax - 0.5)) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / 1.15) * (yBot - yTop);

  // Görbe y = 1/x² (x ∈ [1, n+1])
  const curvePts: string[] = [];
  const areaPts: string[] = [`M ${X(1).toFixed(1)} ${yBot}`];
  for (let i = 0; i <= 100; i++) {
    const x = 1 + ((n + (mode === 'upper' ? 0 : -1)) * i) / 100;
    const y = 1 / (x * x);
    curvePts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    areaPts.push(`L ${X(x).toFixed(1)} ${Y(y).toFixed(1)}`);
  }
  const intRight = mode === 'upper' ? n + 1 : n;
  areaPts.push(`L ${X(intRight).toFixed(1)} ${yBot} Z`);

  const rects: { x1: number; x2: number; h: number; lbl: string }[] = [];
  let rectSum = 0;
  if (mode === 'lower') {
    // Jobb végpontú téglalapok [1,2]..[n-1,n]: a₂ + ... + aₙ <= ∫_1^n f(x) dx
    for (let k = 2; k <= n; k++) {
      const h = 1 / (k * k);
      rectSum += h;
      rects.push({ x1: k - 1, x2: k, h, lbl: `a${k}` });
    }
  } else {
    // Bal végpontú téglalapok [1,2]..[n,n+1]: a₁ + ... + aₙ >= ∫_1^{n+1} f(x) dx
    for (let k = 1; k <= n; k++) {
      const h = 1 / (k * k);
      rectSum += h;
      rects.push({ x1: k, x2: k + 1, h, lbl: `a${k}` });
    }
  }
  const intVal = 1 - 1 / intRight;

  return (
    <div className="widget">
      <div className="widget-title">Az integrálkritérium bizonyítása: téglalapok vs. görbe alatti terület</div>
      <div className="relbuttons chips">
        <button className={mode === 'lower' ? 'on' : ''} onClick={() => setMode('lower')}>
          Alsó téglalapok (a₂ + … + aₙ ≤ ∫₁ⁿ f)
        </button>
        <button className={mode === 'upper' ? 'on' : ''} onClick={() => setMode('upper')}>
          Felső téglalapok (∫₁ⁿ⁺¹ f ≤ a₁ + … + aₙ)
        </button>
      </div>
      <div className="sliders">
        <label>
          n = {n}
          <input type="range" min={3} max={9} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <path d={areaPts.join(' ')} fill="rgba(251,191,36,0.16)" stroke="none" />
        {rects.map((r) => (
          <rect
            key={r.lbl}
            x={X(r.x1)}
            y={Y(r.h)}
            width={X(r.x2) - X(r.x1)}
            height={yBot - Y(r.h)}
            fill="rgba(56,189,248,0.25)"
            stroke="#38bdf8"
            strokeWidth={1.5}
          />
        ))}
        <path d={curvePts.join(' ')} stroke="#fbbf24" strokeWidth={2.5} fill="none" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />

        <text x={W - 14} y={26} textAnchor="end" className="pl-label" fill="#38bdf8">
          Téglalapok: {fmt(rectSum, 3)}
        </text>
        <text x={W - 14} y={46} textAnchor="end" className="pl-label" fill="#fbbf24">
          Integrál: {fmt(intVal, 3)}
        </text>
      </svg>
      <div className="explain">
        <p>
          {mode === 'lower'
            ? 'Mivel a téglalapok a görbe alatt maradnak, ha az integrál véges, a részletösszegek felülről korlátosak → a sor KONVERGENS!'
            : 'Mivel a téglalapok a görbe fölé nyúlnak, ha az integrál +∞, a részletösszegek is +∞-be mennek → a sor DIVERGENS!'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. PSeriesExplorerWidget: ∑ 1/n^p kritikus p = 1 határa                    */
/* -------------------------------------------------------------------------- */
export function PSeriesExplorerWidget() {
  const [p, setP] = useState(1.5);
  const conv = p > 1.001;
  const intVal = conv ? 1 / (p - 1) : null;
  let s15 = 0;
  for (let k = 1; k <= 15; k++) s15 += Math.pow(k, -p);

  const W = 540;
  const H = 225;
  const ox = 42;
  const xEnd = W - 20;
  const yTop = 20;
  const yBot = H - 28;
  const X = (x: number) => ox + ((x - 1) / 9) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / 1.15) * (yBot - yTop);

  const curvePts: string[] = [];
  const areaPts: string[] = [`M ${X(1)} ${yBot}`];
  for (let i = 0; i <= 100; i++) {
    const x = 1 + (9 * i) / 100;
    const y = Math.pow(x, -p);
    curvePts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    areaPts.push(`L ${X(x).toFixed(1)} ${Y(y).toFixed(1)}`);
  }
  areaPts.push(`L ${X(10)} ${yBot} Z`);

  return (
    <div className="widget">
      <div className="widget-title">p-sor labor: ∑ 1 / nᵖ — a kritikus határ pontosan p = 1!</div>
      <div className="sliders">
        <label>
          kitevő p = {fmt(p, 1)} ({conv ? 'p > 1 → KONVERGENS' : 'p ≤ 1 → DIVERGENS'})
          <input type="range" min={0.4} max={3.0} step={0.1} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        {[
          { l: 'p = 0,5 (1/√n)', v: 0.5 },
          { l: 'p = 1,0 (harmonikus)', v: 1.0 },
          { l: 'p = 1,2 (lassú konv.)', v: 1.2 },
          { l: 'p = 2,0 (1/n²)', v: 2.0 },
        ].map((pr) => (
          <button key={pr.l} className={Math.abs(p - pr.v) < 0.05 ? 'on' : ''} onClick={() => setP(pr.v)}>
            {pr.l}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <path d={areaPts.join(' ')} fill={conv ? 'rgba(52,211,153,0.22)' : 'rgba(248,113,113,0.2)'} />
        <path d={curvePts.join(' ')} stroke={conv ? '#34d399' : '#f87171'} strokeWidth={2.6} fill="none" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />
        <text x={W - 14} y={26} textAnchor="end" className="pl-label" fill={conv ? '#34d399' : '#f87171'}>
          {conv ? `∫₁^∞ x⁻ᵖ dx = 1/(p−1) = ${fmt(intVal!, 2)}` : '∫₁^∞ x⁻ᵖ dx = +∞ (divergens)'}
        </text>
        <text x={W - 14} y={46} textAnchor="end" className="pl-tick">
          s₁₅ ≈ {fmt(s15, 3)}
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. HarmonicSlowGrowthWidget: a harmonikus sor Hₙ ≈ ln n + γ növekedése     */
/* -------------------------------------------------------------------------- */
export function HarmonicSlowGrowthWidget() {
  const milestones = [
    { lbl: '10', h: 2.93 },
    { lbl: '100', h: 5.19 },
    { lbl: '10³', h: 7.49 },
    { lbl: '10⁶', h: 14.39 },
    { lbl: '2,7·10⁸', h: 20.0 },
    { lbl: '10¹²', h: 28.21 },
  ];

  return (
    <div className="widget">
      <div className="widget-title">Milyen lassan nő a harmonikus sor? Hₙ ≈ ln n + 0,5772</div>
      <svg className="plane" viewBox="0 0 540 165">
        <rect width={540} height={165} className="pl-bg" />
        <line x1={32} y1={134} x2={520} y2={134} className="pl-axis" />
        {milestones.map((m, i) => {
          const x = 44 + i * 79;
          const bh = (m.h / 30) * 102;
          return (
            <g key={m.lbl}>
              <rect x={x} y={134 - bh} width={52} height={bh} rx={6} fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth={1.6} />
              <text x={x + 26} y={134 - bh - 6} textAnchor="middle" className="pl-label" fill="#38bdf8">
                {fmt(m.h, 1)}
              </text>
              <text x={x + 26} y={152} textAnchor="middle" className="pl-tick">
                n={m.lbl}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="explain">
        <p>
          Bár a harmonikus sor a végtelenbe tart, <strong>272 millió</strong> tag kell ahhoz, hogy átlépje a 20-at — és{' '}
          <M t="H_n - \ln n \to \gamma \approx 0{,}5772" /> (Euler–Mascheroni-állandó)!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. LogSeriesComparisonWidget: ∑ 1 / (n (ln n)^p)                           */
/* -------------------------------------------------------------------------- */
export function LogSeriesComparisonWidget() {
  const [p, setP] = useState(1.4);
  const conv = p > 1.001;
  const intVal = conv ? Math.pow(Math.log(2), 1 - p) / (p - 1) : null;

  const W = 540;
  const H = 175;
  const ox = 42;
  const xEnd = W - 20;
  const yBot = H - 26;
  const yTop = 26;
  const X = (x: number) => ox + ((x - 2) / 18) * (xEnd - ox);
  const f = (x: number) => 1 / (x * Math.pow(Math.log(x), p));
  const fMax = f(2);
  const Y = (v: number) => yBot - (v / (fMax * 1.15)) * (yBot - yTop);

  const pts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = 2 + (18 * i) / 100;
    pts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Logaritmikus sorok: ∑ 1 / (n (ln n)ᵖ), n ≥ 2</div>
      <div className="sliders">
        <label>
          kitevő p = {fmt(p, 1)} ({conv ? 'KONVERGENS' : 'DIVERGENS'})
          <input type="range" min={0.5} max={2.5} step={0.1} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop - 8} x2={ox} y2={yBot} className="pl-axis" />
        <path d={pts.join(' ')} stroke={conv ? '#34d399' : '#fb923c'} strokeWidth={2.5} fill="none" />
        <text x={W - 14} y={28} textAnchor="end" className="pl-label" fill={conv ? '#34d399' : '#fb923c'}>
          {conv ? `∫₂^∞ dx/(x(ln x)ᵖ) ≈ ${fmt(intVal!, 2)}` : '∫₂^∞ dx/(x(ln x)ᵖ) = +∞'}
        </text>
      </svg>
      <div className="explain">
        <p>
          Az <M t="u = \ln x,\ du = \tfrac{dx}{x}" /> helyettesítés pontosan a <M t="\int_{\ln 2}^\infty u^{-p}\,du" />{' '}
          integrálra vezeti vissza — ezért ez a sor is pontosan <M t="p > 1" /> esetén konvergens!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. RemainderEstimateWidget: sₙ + ∫_{n+1}^∞ ≤ S ≤ sₙ + ∫_n^∞                */
/* -------------------------------------------------------------------------- */
export function RemainderEstimateWidget() {
  const [n, setN] = useState(6);
  let sn = 0;
  for (let k = 1; k <= n; k++) sn += 1 / (k * k);
  const low = sn + 1 / (n + 1);
  const high = sn + 1 / n;
  const exact = (Math.PI * Math.PI) / 6;

  // Számegyenes szakasz [1.50, 1.75]
  const W = 540;
  const H = 130;
  const X = (v: number) => 40 + ((v - 1.45) / 0.35) * 460;

  return (
    <div className="widget">
      <div className="widget-title">Maradéktag-becslés a ∑ 1/n² = π²/6 ≈ 1,64493 soron</div>
      <div className="sliders">
        <label>
          kiszámolt tagok száma n = {n} → s_{n} = {fmt(sn, 4)}
          <input type="range" min={2} max={20} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={30} y1={68} x2={510} y2={68} className="pl-axis" />

        {/* Becslési intervallum [low, high] */}
        <rect x={X(low)} y={52} width={Math.max(4, X(high) - X(low))} height={32} rx={6} fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth={2} />

        {/* s_n pont (ha látható) */}
        {sn >= 1.45 && (
          <>
            <circle cx={X(sn)} cy={68} r={4.5} fill="#fb923c" />
            <text x={X(sn)} y={102} textAnchor="middle" className="pl-tick" fill="#fb923c">
              sₙ={fmt(sn, 3)}
            </text>
          </>
        )}

        {/* Pontos S = π²/6 */}
        <line x1={X(exact)} y1={34} x2={X(exact)} y2={98} stroke="#34d399" strokeWidth={2.2} />
        <text x={X(exact)} y={26} textAnchor="middle" className="pl-label" fill="#34d399">
          S = π²/6 ≈ 1,6449
        </text>
      </svg>
      <div className="explain">
        <p>
          Korlátok: <M t={`${fmt(low, 4)} \\le S \\le ${fmt(high, 4)}`} /> — mindössze{' '}
          <strong>{n} taggal</strong> a hiba már legfeljebb <M t={`\\tfrac{1}{${n}(${n + 1})} \\approx ${fmt(high - low, 4)}`} />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. SumVsIntegralTrapDiagram: a sor összege ≠ az integrál értéke!           */
/* -------------------------------------------------------------------------- */
export function SumVsIntegralTrapDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Vigyázat: a sor összege NEM egyenlő az integrál értékével!</div>
      <svg className="plane" viewBox="0 0 540 130">
        <rect width={540} height={130} className="pl-bg" />

        <rect x={18} y={18} width={242} height={94} rx={12} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={139} y={42} textAnchor="middle" className="pl-label" fill="#38bdf8">
          f(x) = 1 / x²
        </text>
        <text x={139} y={68} textAnchor="middle" className="pl-tick">
          Integrál: ∫₁^∞ dx/x² = 1,000
        </text>
        <text x={139} y={92} textAnchor="middle" className="pl-label" fill="#34d399">
          Sor összege: π²/6 ≈ 1,645
        </text>

        <rect x={280} y={18} width={242} height={94} rx={12} fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={401} y={42} textAnchor="middle" className="pl-label" fill="#fbbf24">
          f(x) = 1 / (x² + 1)
        </text>
        <text x={401} y={68} textAnchor="middle" className="pl-tick">
          Integrál: ∫₁^∞ dx/(x²+1) = π/4 ≈ 0,785
        </text>
        <text x={401} y={92} textAnchor="middle" className="pl-label" fill="#34d399">
          Sor összege: ≈ 1,077
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. IntegralTestChecklistDiagram: 3 feltétel + döntés                       */
/* -------------------------------------------------------------------------- */
export function IntegralTestChecklistDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Az integrálkritérium 3 belépési feltétele (x ≥ N)</div>
      <svg className="plane" viewBox="0 0 540 124">
        <rect width={540} height={124} className="pl-bg" />
        {[
          { x: 14, t: '1. Pozitív', s: 'f(x) > 0', c: '#38bdf8' },
          { x: 146, t: '2. Folytonos', s: 'nincs szakadás', c: '#34d399' },
          { x: 278, t: '3. Csökkenő', s: 'f′(x) ≤ 0', c: '#fbbf24' },
          { x: 410, t: '⇒ Közös sors', s: '∑ aₙ ⇔ ∫ f dx', c: '#fb923c' },
        ].map((b) => (
          <g key={b.t}>
            <rect x={b.x} y={20} width={116} height={82} rx={11} fill="rgba(255,255,255,0.04)" stroke={b.c} strokeWidth={1.6} />
            <text x={b.x + 58} y={50} textAnchor="middle" className="pl-label" fill={b.c}>
              {b.t}
            </text>
            <text x={b.x + 58} y={76} textAnchor="middle" className="pl-tick">
              {b.s}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
