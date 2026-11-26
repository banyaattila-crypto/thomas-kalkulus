import { useState } from 'react';

/* ============================================================================
   16.1. Vonalintegrál — 8 interaktív 2D/3D és magyarázó SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const pathFrom = (pts: [number, number][]) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

function makeProj(cx: number, cy: number, scale: number, yawDeg: number, pitchDeg = 22) {
  const yaw = (yawDeg * Math.PI) / 180;
  const pit = (pitchDeg * Math.PI) / 180;
  const cyw = Math.cos(yaw);
  const syw = Math.sin(yaw);
  const cp = Math.cos(pit);
  const sp = Math.sin(pit);
  return (x: number, y: number, z: number): [number, number] => {
    const xr = -x * syw + y * cyw;
    const yr = x * cyw + y * syw;
    return [cx + xr * scale, cy + (yr * sp - z * cp) * scale];
  };
}

/* ------------------------------------------------------------------ 1. 3D „Függöny területe” vonalintegrál */
export function CurtainLineIntegral3DWidget() {
  const [n, setN] = useState(12);
  const [yaw, setYaw] = useState(34);
  const P = makeProj(250, 200, 62, yaw, 22);

  // Negyedkörív C: x = 1.8 cos t, y = 1.8 sin t, t in [0, pi/2]
  // Magasság: f(x, y) = 0.8 + 0.35 x + 0.45 y
  const R = 1.8;
  const f = (x: number, y: number) => 0.8 + 0.35 * x + 0.45 * y;

  const panels: string[] = [];
  let sumArea = 0;
  const dt = (Math.PI / 2) / n;
  for (let i = 0; i < n; i++) {
    const t1 = i * dt;
    const t2 = (i + 1) * dt;
    const tm = (t1 + t2) / 2;
    const x1 = R * Math.cos(t1), y1 = R * Math.sin(t1);
    const x2 = R * Math.cos(t2), y2 = R * Math.sin(t2);
    const xm = R * Math.cos(tm), ym = R * Math.sin(tm);
    const h = f(xm, ym);
    sumArea += h * (R * dt);
    const poly = `${pathFrom([P(x1, y1, 0), P(x2, y2, 0), P(x2, y2, h), P(x1, y1, h)])} Z`;
    panels.push(poly);
  }

  const basePts: [number, number][] = [];
  const topPts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * (Math.PI / 2);
    const x = R * Math.cos(t), y = R * Math.sin(t);
    basePts.push(P(x, y, 0));
    topPts.push(P(x, y, f(x, y)));
  }

  const O = P(0, 0, 0);

  return (
    <div className="widget">
      <div className="wtitle">A vonalintegrál geometriai jelentése: a C görbe fölötti függöny (kerítés) területe!</div>
      <div className="controls">
        <label>
          Függönycsíkok száma n = {n}
          <input type="range" min={4} max={28} step={2} value={n} onChange={(e) => setN(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-30} max={90} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 275" className="wsvg">
        <line x1={O[0]} y1={O[1]} x2={P(2.3, 0, 0)[0]} y2={P(2.3, 0, 0)[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={P(0, 2.3, 0)[0]} y2={P(0, 2.3, 0)[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={P(0, 0, 2.2)[0]} y2={P(0, 0, 2.2)[1]} stroke="#64748b" strokeWidth="1.2" />

        {panels.map((d, i) => (
          <path key={i} d={d} fill="#38bdf8" fillOpacity="0.22" stroke="#38bdf8" strokeOpacity="0.65" strokeWidth="1.1" />
        ))}
        <path d={pathFrom(basePts)} fill="none" stroke="#fb923c" strokeWidth="2.8" />
        <path d={pathFrom(topPts)} fill="none" stroke="#34d399" strokeWidth="2.4" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          Riemann-összeg ({n} csík): ∑ f(xₖ, yₖ) Δsₖ ≈ {sumArea.toFixed(3)}
        </text>
        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          Narancs: az alapgörbe C · Zöld: a z = f(x, y) felső él · Cián: a függöny területe = ∫_C f ds
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. 3 lépéses vonalintegrál recept */
export function LineIntegralStepWidget() {
  const [kind, setKind] = useState<'seg' | 'arc' | 'parab'>('arc');
  const data = {
    seg: {
      title: 'Szakasz (0,0) → (3,4) · f(x, y) = x + y',
      r: 'r(t) = ⟨3t, 4t⟩,  0 ≤ t ≤ 1',
      ds: 'ds = √(3² + 4²) dt = 5 dt',
      integ: '∫₀¹ (7t) · 5 dt = 35 · ½ = 17,5',
      color: '#38bdf8',
    },
    arc: {
      title: 'Negyedkör (R = 2) · f(x, y) = xy',
      r: 'r(t) = ⟨2 cos t, 2 sin t⟩,  0 ≤ t ≤ π/2',
      ds: 'ds = √(4 sin²t + 4 cos²t) dt = 2 dt',
      integ: '∫₀^(π/2) (4 cos t sin t) · 2 dt = 4',
      color: '#34d399',
    },
    parab: {
      title: 'Parabolaív y = x² (0 ≤ x ≤ 1) · f(x, y) = x',
      r: 'r(t) = ⟨t, t²⟩,  0 ≤ t ≤ 1',
      ds: 'ds = √(1 + 4t²) dt',
      integ: '∫₀¹ t √(1 + 4t²) dt = (5√5 − 1) / 12',
      color: '#fbbf24',
    },
  }[kind];

  return (
    <div className="widget">
      <div className="wtitle">A 3 lépéses recept: (1) Paraméterezz! (2) Számold ki ds = |v|dt! (3) Helyettesíts és integrálj!</div>
      <div className="controls">
        <button className={kind === 'seg' ? 'active' : ''} onClick={() => setKind('seg')}>Szakasz</button>
        <button className={kind === 'arc' ? 'active' : ''} onClick={() => setKind('arc')}>Negyedkör</button>
        <button className={kind === 'parab' ? 'active' : ''} onClick={() => setKind('parab')}>Parabolaív</button>
      </div>
      <svg viewBox="0 0 540 190" className="wsvg">
        <rect x="16" y="14" width="508" height="162" rx="10" fill="#0f172a" stroke={data.color} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="32" y="42" fill={data.color} fontSize="13.5" fontWeight="700">{data.title}</text>
        <text x="32" y="74" fill="#cbd5e1" fontSize="12.5" fontFamily="monospace">1. Paraméterezés:  {data.r}</text>
        <text x="32" y="104" fill="#fb923c" fontSize="12.5" fontFamily="monospace">2. Ívelem:         {data.ds}</text>
        <text x="32" y="138" fill="#34d399" fontSize="13" fontWeight="700" fontFamily="monospace">3. Integrál:       {data.integ}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Szakaszonként sima görbék és útfüggés */
export function PiecewisePathWidget() {
  const [path, setPath] = useState<'diag' | 'L'>('L');
  // f(x, y) = x + y az (0,0)-ból (2,2)-be:
  // Átló: r(t) = <2t, 2t>, t in [0,1], |v| = 2 sqrt(2), int_0^1 4t * 2 sqrt(2) dt = 4 sqrt(2) ≈ 5.657
  // L-út: C1: (0,0)->(2,0) int_0^2 x dx = 2; C2: (2,0)->(2,2) int_0^2 (2+y) dy = 6 -> összesen 8!
  const mapX = (x: number) => 95 + x * 95;
  const mapY = (y: number) => 205 - y * 75;

  return (
    <div className="widget">
      <div className="wtitle">A skalár vonalintegrál ÚTFÜGGŐ: ugyanaz a két végpont, más görbe ⇒ más érték!</div>
      <div className="controls">
        <button className={path === 'L' ? 'active' : ''} onClick={() => setPath('L')}>Törtvonal C₁ ∪ C₂ (érték = 8)</button>
        <button className={path === 'diag' ? 'active' : ''} onClick={() => setPath('diag')}>Egyenes átló C (érték = 4√2 ≈ 5,66)</button>
      </div>
      <svg viewBox="0 0 540 240" className="wsvg">
        <line x1="60" y1={mapY(0)} x2="360" y2={mapY(0)} stroke="#475569" strokeWidth="1.2" />
        <line x1={mapX(0)} y1="30" x2={mapX(0)} y2="220" stroke="#475569" strokeWidth="1.2" />

        {/* Mindkét út halványan */}
        <line x1={mapX(0)} y1={mapY(0)} x2={mapX(2)} y2={mapY(2)} stroke="#38bdf8" strokeOpacity={path === 'diag' ? 1 : 0.25} strokeWidth={path === 'diag' ? 3 : 1.5} />
        <polyline
          points={`${mapX(0)},${mapY(0)} ${mapX(2)},${mapY(0)} ${mapX(2)},${mapY(2)}`}
          fill="none"
          stroke="#fb923c"
          strokeOpacity={path === 'L' ? 1 : 0.25}
          strokeWidth={path === 'L' ? 3 : 1.5}
        />

        <circle cx={mapX(0)} cy={mapY(0)} r="5" fill="#fbbf24" />
        <circle cx={mapX(2)} cy={mapY(2)} r="5" fill="#34d399" />
        <text x={mapX(0) - 24} y={mapY(0) + 16} fill="#fbbf24" fontSize="11.5">(0;0)</text>
        <text x={mapX(2) + 8} y={mapY(2) + 4} fill="#34d399" fontSize="11.5">(2;2)</text>

        <rect x="335" y="42" width="190" height="145" rx="10" fill="#0f172a" stroke={path === 'L' ? '#fb923c' : '#38bdf8'} strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="350" y="68" fill="#e2e8f0" fontSize="12" fontWeight="700">Integrandus: f = x + y</text>
        {path === 'L' ? (
          <>
            <text x="350" y="96" fill="#fb923c" fontSize="12">C₁: ∫₀² x dx = 2</text>
            <text x="350" y="120" fill="#fb923c" fontSize="12">C₂: ∫₀² (2 + y) dy = 6</text>
            <text x="350" y="152" fill="#fbbf24" fontSize="13.5" fontWeight="700">Összesen = 8,00</text>
          </>
        ) : (
          <>
            <text x="350" y="96" fill="#38bdf8" fontSize="12">r(t) = ⟨2t, 2t⟩, 0 ≤ t ≤ 1</text>
            <text x="350" y="120" fill="#38bdf8" fontSize="12">ds = 2√2 dt</text>
            <text x="350" y="152" fill="#fbbf24" fontSize="13.5" fontWeight="700">Érték = 4√2 ≈ 5,66</text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. 3D csavarvonal vonalintegrál */
export function HelixLineIntegral3DWidget() {
  const [turns, setTurns] = useState(1.0);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 210, 42, yaw, 20);

  const tMax = turns * Math.PI * 2;
  const segs: { d: string; color: string }[] = [];
  const N = 64;
  for (let i = 0; i < N; i++) {
    const t1 = (i / N) * tMax;
    const t2 = ((i + 1) / N) * tMax;
    const frac = i / N;
    const col = frac < 0.33 ? '#38bdf8' : frac < 0.66 ? '#34d399' : '#fb923c';
    segs.push({
      d: pathFrom([P(1.5 * Math.cos(t1), 1.5 * Math.sin(t1), t1 * 0.36), P(1.5 * Math.cos(t2), 1.5 * Math.sin(t2), t2 * 0.36)]),
      color: col,
    });
  }
  // r(t) = <cos t, sin t, t>, |v| = sqrt(2), int_0^{tMax} z ds = sqrt(2) * tMax^2 / 2
  const exact = (Math.SQRT2 * tMax * tMax) / 2;

  return (
    <div className="widget">
      <div className="wtitle">3D vonalintegrál csavarvonalon: r(t) = ⟨cos t, sin t, t⟩, f(x, y, z) = z (felfelé növekvő sűrűség!)</div>
      <div className="controls">
        <label>
          Menetszám: {turns.toFixed(1)} (0 ≤ t ≤ {(turns * 2).toFixed(1)}π)
          <input type="range" min={0.5} max={2.0} step={0.25} value={turns} onChange={(e) => setTurns(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        {segs.map((s, i) => (
          <path key={i} d={s.d} fill="none" stroke={s.color} strokeWidth="3" />
        ))}
        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          ∫_C z ds = ∫₀^{'{2πN}'} t · √2 dt = (√2 / 2) (2πN)² = {exact.toFixed(2)}
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          Kék (alul, z kicsi) → Zöld → Narancs (felül, z nagy): a drót tömege felfelé nő!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Félkör-drót tömegközéppontja */
export function WireCentroidWidget() {
  const [mode, setMode] = useState<'const' | 'y'>('const');
  const cx = 270;
  const cy = 205;
  const R = 108;

  // Félkör ív
  const yBarRatio = mode === 'const' ? 2 / Math.PI : Math.PI / 4;
  const yBarPx = cy - R * yBarRatio;

  return (
    <div className="widget">
      <div className="wtitle">Félkör alakú drót tömegközéppontja: vigyázz, NEM azonos a tömör félkörlemezével!</div>
      <div className="controls">
        <button className={mode === 'const' ? 'active' : ''} onClick={() => setMode('const')}>Homogén drót (δ = 1)</button>
        <button className={mode === 'y' ? 'active' : ''} onClick={() => setMode('y')}>Felül nehezebb drót (δ = y)</button>
      </div>
      <svg viewBox="0 0 540 245" className="wsvg">
        <line x1="80" y1={cy} x2="460" y2={cy} stroke="#475569" strokeWidth="1.2" />
        <line x1={cx} y1="40" x2={cx} y2="225" stroke="#475569" strokeWidth="1.2" />

        {/* Félkör drót */}
        <path
          d={`M ${cx - R},${cy} A ${R},${R} 0 0,1 ${cx + R},${cy}`}
          fill="none"
          stroke={mode === 'const' ? '#38bdf8' : '#fb923c'}
          strokeWidth="4.5"
        />

        {/* Tömör félkörlemez súlypont referencia (4R / 3pi ≈ 0.424 R) */}
        <circle cx={cx} cy={cy - R * (4 / (3 * Math.PI))} r="4" fill="#64748b" />
        <text x={cx + 10} y={cy - R * (4 / (3 * Math.PI)) + 4} fill="#94a3b8" fontSize="11">
          Tömör lemez: 4R/(3π) ≈ 0,424 R
        </text>

        {/* Drót súlypontja */}
        <circle cx={cx} cy={yBarPx} r="6" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.6" />
        <text x={cx + 12} y={yBarPx + 4} fill="#fbbf24" fontSize="12.5" fontWeight="700">
          Drót ȳ = {mode === 'const' ? '2R/π ≈ 0,637 R' : 'πR/4 ≈ 0,785 R'}
        </text>

        <text x="16" y="24" fill="#e2e8f0" fontSize="12">
          A tömegközéppont a dróton KÍVÜL (a levegőben!) helyezkedik el!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Szimmetria-trükkök körön */
export function CurveSymmetryShortcutWidget() {
  const cases = [
    { label: '∫ x ds', val: '0', color: '#38bdf8', note: 'Páratlan x-ben: a jobb (+x) és bal (−x) félkör pontosan kioltja egymást!' },
    { label: '∫ y ds', val: '0', color: '#2dd4bf', note: 'Páratlan y-ban: a felső (+y) és alsó (−y) félkör pontosan kioltja egymást!' },
    { label: '∫ (x² + y²) ds', val: '2π R³', color: '#34d399', note: 'A körön x² + y² = R² állandó, így egyszerűen R² · L = R² · 2πR = 2πR³!' },
    { label: '∫ x² ds', val: 'π R³', color: '#fbbf24', note: 'Szimmetriából ∫ x² ds = ∫ y² ds = ½ ∫ (x² + y²) ds = ½ (2πR³) = πR³!' },
  ];
  const [sel, setSel] = useState(3);
  const cur = cases[sel];

  return (
    <div className="widget">
      <div className="wtitle">Villámgyors szimmetria-trükkök az x² + y² = R² körön — integrálás nélkül!</div>
      <div className="controls">
        {cases.map((c, i) => (
          <button key={c.label} className={sel === i ? 'active' : ''} onClick={() => setSel(i)}>
            {c.label}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke={cur.color} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="36" y="54" fill={cur.color} fontSize="18" fontWeight="700" fontFamily="monospace">
          ∮_{'{x²+y²=R²}'} {cur.label.replace('∫ ', '')}  =  {cur.val}
        </text>
        <text x="36" y="96" fill="#e2e8f0" fontSize="12.5">{cur.note}</text>
        <text x="36" y="130" fill="#94a3b8" fontSize="11.5">
          Vizsgán percek helyett 5 másodperc alatt megoldható, ha észreveszed a szimmetriát!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Skalár vs. vektoros vonalintegrál (előretekintés 16.2) */
export function ScalarVsVectorPreviewWidget() {
  const [rev, setRev] = useState(false);

  return (
    <div className="widget">
      <div className="wtitle">Irányfordítás (+C → −C): a skalár vonalintegrál VÁLTOZATLAN, a vektoros ELŐJELET VÁLT!</div>
      <div className="controls">
        <button className={!rev ? 'active' : ''} onClick={() => setRev(false)}>Eredeti irány (+C: A → B)</button>
        <button className={rev ? 'active' : ''} onClick={() => setRev(true)}>Fordított irány (−C: B → A)</button>
      </div>
      <svg viewBox="0 0 540 175" className="wsvg">
        <rect x="18" y="16" width="244" height="142" rx="10" fill="#0f172a" stroke="#34d399" strokeWidth="1.6" />
        <text x="34" y="42" fill="#34d399" fontSize="13.5" fontWeight="700">Skalár vonalintegrál (16.1)</text>
        <text x="34" y="72" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
          {rev ? '∫_(−C) f ds  =  +∫_C f ds' : '∫_C f ds  =  +12,0'}
        </text>
        <text x="34" y="104" fill="#cbd5e1" fontSize="11.5">Pl. drót tömege, függöny területe:</text>
        <text x="34" y="122" fill="#cbd5e1" fontSize="11.5">mindegy, melyik végéről méred,</text>
        <text x="34" y="140" fill="#34d399" fontSize="11.5" fontWeight="600">mert ds = |v|dt mindig pozitív!</text>

        <rect x="278" y="16" width="244" height="142" rx="10" fill="#0f172a" stroke="#fb923c" strokeWidth="1.6" />
        <text x="294" y="42" fill="#fb923c" fontSize="13.5" fontWeight="700">Vektoros munka-integrál (16.2)</text>
        <text x="294" y="72" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
          {rev ? '∫_(−C) F · dr  =  −∫_C F · dr' : '∫_C F · dr  =  +12,0'}
        </text>
        <text x="294" y="104" fill="#cbd5e1" fontSize="11.5">Pl. szélben való biciklizés munkája:</text>
        <text x="294" y="122" fill="#cbd5e1" fontSize="11.5">hátszél (+) ↔ szembeszél (−),</text>
        <text x="294" y="140" fill="#fb923c" fontSize="11.5" fontWeight="600">fordított irányban −1-szeres lesz!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-térkép */
export function LineIntegralMasterMapDiagram() {
  const rows = [
    { label: 'Skalár vonalintegrál', expr: '∫_C f(x,y,z) ds = ∫_a^b f(r(t)) |v(t)| dt', color: '#38bdf8' },
    { label: 'Függöny & ívhossz', expr: 'f ≥ 0: függöny területe  ·  f ≡ 1: görbe hossza L', color: '#34d399' },
    { label: 'Drót tömege & súlyp.', expr: 'M = ∫_C δ ds  ·  x̄ = (1/M) ∫_C xδ ds  (ugyanígy ȳ, z̄)', color: '#fbbf24' },
    { label: 'Tehetetlenség & átlag', expr: 'I_L = ∫_C r_L² δ ds  ·  f_átl = (1/L) ∫_C f ds', color: '#2dd4bf' },
    { label: 'Irányfüggetlenség', expr: '∫_(−C) f ds = +∫_C f ds   (mert ds > 0 mindig!)', color: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 16.1 fejezet mester-képlettára — skalárfüggvények vonalintegrálja</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="600">{r.label}</text>
              <text x="180" y={y + 23} fill={r.color} fontSize="11.2" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
