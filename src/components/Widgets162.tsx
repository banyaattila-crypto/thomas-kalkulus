import { useState } from 'react';

/* ============================================================================
   16.2. Vektormezők, cirkuláció, munka, áramlás — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 5.5): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1e-3) return '';
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const b1x = x2 - ux * size + px * (size * 0.45);
  const b1y = y2 - uy * size + py * (size * 0.45);
  const b2x = x2 - ux * size - px * (size * 0.45);
  const b2y = y2 - uy * size - py * (size * 0.45);
  return `M${b1x.toFixed(1)},${b1y.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${b2x.toFixed(1)},${b2y.toFixed(1)}`;
}

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

/* ------------------------------------------------------------------ 1. Vektormező galéria */
export function VectorFieldGalleryWidget() {
  const [kind, setKind] = useState<'vortex' | 'radial' | 'shear' | 'grav'>('vortex');

  const field = (x: number, y: number): [number, number] => {
    if (kind === 'vortex') return [-y, x];
    if (kind === 'radial') return [x, y];
    if (kind === 'shear') return [y, 0];
    const r3 = Math.pow(x * x + y * y + 0.25, 1.5);
    return [(-2.2 * x) / r3, (-2.2 * y) / r3];
  };

  const arrows: { x1: number; y1: number; x2: number; y2: number; col: string }[] = [];
  for (let gx = -3; gx <= 3; gx++) {
    for (let gy = -2; gy <= 2; gy++) {
      if (gx === 0 && gy === 0) continue;
      const [fx, fy] = field(gx, gy);
      const mag = Math.hypot(fx, fy);
      if (mag < 1e-3) continue;
      const len = Math.min(26, 9 + mag * 5.2);
      const sx = 270 + gx * 58;
      const sy = 140 - gy * 44;
      const ex = sx + (fx / mag) * len;
      const ey = sy - (fy / mag) * len;
      const col = mag > 2.2 ? '#fb923c' : mag > 1.2 ? '#38bdf8' : '#2dd4bf';
      arrows.push({ x1: sx, y1: sy, x2: ex, y2: ey, col });
    }
  }

  const label = {
    vortex: 'F(x, y) = ⟨−y, x⟩  (örvénymező: körbe-körbe forog!)',
    radial: 'F(x, y) = ⟨x, y⟩  (radiális forrás: kifelé sugárzik)',
    shear: 'F(x, y) = ⟨y, 0⟩  (nyíró áramlás: felül jobbra, alul balra)',
    grav: 'F(x, y) = −k r / |r|³  (gravitációs / Coulomb-vonzás)',
  }[kind];

  return (
    <div className="widget">
      <div className="wtitle">2D vektormezők galériája: minden (x, y) ponthoz egy F(x, y) nyíl tartozik!</div>
      <div className="controls">
        <button className={kind === 'vortex' ? 'active' : ''} onClick={() => setKind('vortex')}>Örvény</button>
        <button className={kind === 'radial' ? 'active' : ''} onClick={() => setKind('radial')}>Radiális</button>
        <button className={kind === 'shear' ? 'active' : ''} onClick={() => setKind('shear')}>Nyírás</button>
        <button className={kind === 'grav' ? 'active' : ''} onClick={() => setKind('grav')}>Gravitáció</button>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <line x1="50" y1="140" x2="490" y2="140" stroke="#475569" strokeWidth="1" />
        <line x1="270" y1="28" x2="270" y2="250" stroke="#475569" strokeWidth="1" />
        {arrows.map((a, i) => (
          <g key={i}>
            <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={a.col} strokeWidth="1.8" />
            <path d={arrowHead(a.x1, a.y1, a.x2, a.y2, 5)} fill="none" stroke={a.col} strokeWidth="1.6" />
          </g>
        ))}
        <circle cx="270" cy="140" r="3.5" fill="#fbbf24" />
        <text x="16" y="20" fill="#e2e8f0" fontSize="12.5" fontWeight="600">{label}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Munka egy görbe mentén: F · T */
export function WorkAlongCurveWidget() {
  const [t, setT] = useState(0.9);
  // Körív x = 1.6 cos t, y = 1.6 sin t, állandó szél F = <1.5, 0.5>
  const cx = 270;
  const cy = 150;
  const R = 84;
  const px = cx + R * Math.cos(t);
  const py = cy - R * Math.sin(t);

  // T = <-sin t, cos t> (matematikai), F = <1.5, 0.5>
  const tx = -Math.sin(t);
  const ty = Math.cos(t);
  const fx = 1.5;
  const fy = 0.5;
  const dot = fx * tx + fy * ty;

  const sc = 46;

  return (
    <div className="widget">
      <div className="wtitle">Munka görbe mentén: csak az érintőirányú F · T komponens végez munkát!</div>
      <div className="controls">
        <label>
          Pozíció t = {((t * 180) / Math.PI).toFixed(0)}°
          <input type="range" min={0} max={6.28} step={0.08} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 260" className="wsvg">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#38bdf8" strokeWidth="2.3" />

        {/* F vektor */}
        <line x1={px} y1={py} x2={px + fx * 32} y2={py - fy * 32} stroke="#fb923c" strokeWidth="2.8" />
        <path d={arrowHead(px, py, px + fx * 32, py - fy * 32, 7)} fill="none" stroke="#fb923c" strokeWidth="2.4" />
        <text x={px + fx * 32 + 6} y={py - fy * 32} fill="#fb923c" fontSize="12.5" fontWeight="700">F</text>

        {/* T vektor */}
        <line x1={px} y1={py} x2={px + tx * sc} y2={py - ty * sc} stroke="#34d399" strokeWidth="2.8" />
        <path d={arrowHead(px, py, px + tx * sc, py - ty * sc, 7)} fill="none" stroke="#34d399" strokeWidth="2.4" />
        <text x={px + tx * sc + 6} y={py - ty * sc - 4} fill="#34d399" fontSize="12.5" fontWeight="700">T</text>

        <circle cx={px} cy={py} r="5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill={dot > 0.05 ? '#34d399' : dot < -0.05 ? '#f87171' : '#fbbf24'} fontSize="12.5" fontWeight="700">
          F · T = {dot.toFixed(2)} — {dot > 0.05 ? 'Hátszél: pozitív munka (+)' : dot < -0.05 ? 'Szembeszél: negatív munka (−)' : 'Merőleges: nulla munka!'}
        </text>
        <text x="16" y="250" fill="#94a3b8" fontSize="11.5">
          W = ∫_C F · T ds = ∫_C F · dr (mert T ds = dr — eltűnik a négyzetgyök!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Útfüggés munkánál: F = <y, 2x> */
export function PathDependenceWorkWidget() {
  const [mode, setMode] = useState<'line' | 'parab'>('parab');
  const mapX = (x: number) => 85 + x * 175;
  const mapY = (y: number) => 205 - y * 145;

  const pPts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    pPts.push([mapX(t), mapY(t * t)]);
  }

  return (
    <div className="widget">
      <div className="wtitle">Nem konzervatív erőtérben (F = ⟨y, 2x⟩) a munka FÜGG az útvonaltól!</div>
      <div className="controls">
        <button className={mode === 'line' ? 'active' : ''} onClick={() => setMode('line')}>Egyenes y = x (W = 3/2 = 1,50)</button>
        <button className={mode === 'parab' ? 'active' : ''} onClick={() => setMode('parab')}>Parabola y = x² (W = 5/3 ≈ 1,67)</button>
      </div>
      <svg viewBox="0 0 540 235" className="wsvg">
        <line x1="60" y1={mapY(0)} x2="290" y2={mapY(0)} stroke="#475569" strokeWidth="1.2" />
        <line x1={mapX(0)} y1="35" x2={mapX(0)} y2="220" stroke="#475569" strokeWidth="1.2" />

        <line x1={mapX(0)} y1={mapY(0)} x2={mapX(1)} y2={mapY(1)} stroke="#38bdf8" strokeOpacity={mode === 'line' ? 1 : 0.28} strokeWidth={mode === 'line' ? 3 : 1.5} />
        <path d={pathFrom(pPts)} fill="none" stroke="#fb923c" strokeOpacity={mode === 'parab' ? 1 : 0.28} strokeWidth={mode === 'parab' ? 3 : 1.5} />

        <circle cx={mapX(0)} cy={mapY(0)} r="5" fill="#fbbf24" />
        <circle cx={mapX(1)} cy={mapY(1)} r="5" fill="#34d399" />

        <rect x="315" y="42" width="208" height="150" rx="10" fill="#0f172a" stroke={mode === 'line' ? '#38bdf8' : '#fb923c'} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="330" y="68" fill="#e2e8f0" fontSize="12" fontWeight="700">∫_C (y dx + 2x dy)</text>
        {mode === 'line' ? (
          <>
            <text x="330" y="98" fill="#38bdf8" fontSize="12">x = t, y = t, dx = dy = dt</text>
            <text x="330" y="124" fill="#38bdf8" fontSize="12">∫₀¹ (t + 2t) dt = 3/2</text>
            <text x="330" y="160" fill="#fbbf24" fontSize="14" fontWeight="700">W₁ = 1,500</text>
          </>
        ) : (
          <>
            <text x="330" y="98" fill="#fb923c" fontSize="12">x = t, y = t², dy = 2t dt</text>
            <text x="330" y="124" fill="#fb923c" fontSize="12">∫₀¹ (t² + 4t²) dt = 5/3</text>
            <text x="330" y="160" fill="#fbbf24" fontSize="14" fontWeight="700">W₂ ≈ 1,667 ≠ W₁!</text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Cirkuláció zárt körön */
export function CirculationVortexWidget() {
  const [kind, setKind] = useState<'vortex' | 'radial' | 'const'>('vortex');
  const cx = 200;
  const cy = 128;
  const R = 74;

  const pts = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
    const a = (k / 8) * Math.PI * 2;
    const x = Math.cos(a), y = Math.sin(a);
    const [fx, fy] = kind === 'vortex' ? [-y, x] : kind === 'radial' ? [x, y] : [1, 0];
    return { px: cx + R * x, py: cy - R * y, ex: cx + R * x + fx * 30, ey: cy - R * y - fy * 30 };
  });

  const info = {
    vortex: { val: '+2π R²', col: '#34d399', desc: 'F végig érintőirányú (F ∥ T) → maximális pozitív cirkuláció!' },
    radial: { val: '0', col: '#38bdf8', desc: 'F végig merőleges a körre (F ⊥ T) → nulla cirkuláció!' },
    const: { val: '0', col: '#fbbf24', desc: 'Az alsó (+) és felső (−) félkör pontosan kioltja egymást!' },
  }[kind];

  return (
    <div className="widget">
      <div className="wtitle">Cirkuláció (keringés) zárt körön: ∮_C F · T ds = ∮_C (M dx + N dy)</div>
      <div className="controls">
        <button className={kind === 'vortex' ? 'active' : ''} onClick={() => setKind('vortex')}>Örvény ⟨−y, x⟩</button>
        <button className={kind === 'radial' ? 'active' : ''} onClick={() => setKind('radial')}>Forrás ⟨x, y⟩</button>
        <button className={kind === 'const' ? 'active' : ''} onClick={() => setKind('const')}>Állandó ⟨1, 0⟩</button>
      </div>
      <svg viewBox="0 0 540 235" className="wsvg">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#38bdf8" strokeWidth="2.2" />
        {pts.map((p, i) => (
          <g key={i}>
            <line x1={p.px} y1={p.py} x2={p.ex} y2={p.ey} stroke={info.col} strokeWidth="2.2" />
            <path d={arrowHead(p.px, p.py, p.ex, p.ey, 6)} fill="none" stroke={info.col} strokeWidth="2" />
          </g>
        ))}
        <rect x="315" y="45" width="208" height="145" rx="10" fill="#0f172a" stroke={info.col} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="330" y="76" fill={info.col} fontSize="16" fontWeight="700">Cirkuláció = {info.val}</text>
        <text x="330" y="112" fill="#cbd5e1" fontSize="11.5">{info.desc.slice(0, 32)}</text>
        <text x="330" y="130" fill="#cbd5e1" fontSize="11.5">{info.desc.slice(32)}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Fluxus (áramlás) zárt körön keresztül */
export function FluxAcrossCircleWidget() {
  const [kind, setKind] = useState<'source' | 'sink' | 'vortex'>('source');
  const cx = 200;
  const cy = 128;
  const R = 74;

  const pts = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
    const a = (k / 8) * Math.PI * 2;
    const x = Math.cos(a), y = Math.sin(a);
    const [fx, fy] = kind === 'source' ? [x, y] : kind === 'sink' ? [-x, -y] : [-y, x];
    return { px: cx + R * x, py: cy - R * y, ex: cx + R * x + fx * 30, ey: cy - R * y - fy * 30 };
  });

  const info = {
    source: { val: '+2π R²', col: '#fb923c', desc: 'Mindenhol kifelé áramlik (F ∥ n) → pozitív fluxus (forrás)!' },
    sink: { val: '−2π R²', col: '#f87171', desc: 'Mindenhol befelé áramlik (F ∥ −n) → negatív fluxus (nyelő)!' },
    vortex: { val: '0', col: '#34d399', desc: 'Csak körbeforog, semmi nem lép ki/be (F ⊥ n) → nulla fluxus!' },
  }[kind];

  return (
    <div className="widget">
      <div className="wtitle">Fluxus (kiáramlás) zárt görbén át: ∮_C F · n ds = ∮_C (M dy − N dx)</div>
      <div className="controls">
        <button className={kind === 'source' ? 'active' : ''} onClick={() => setKind('source')}>Forrás ⟨x, y⟩</button>
        <button className={kind === 'sink' ? 'active' : ''} onClick={() => setKind('sink')}>Nyelő ⟨−x, −y⟩</button>
        <button className={kind === 'vortex' ? 'active' : ''} onClick={() => setKind('vortex')}>Örvény ⟨−y, x⟩</button>
      </div>
      <svg viewBox="0 0 540 235" className="wsvg">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2dd4bf" strokeWidth="2.2" />
        {pts.map((p, i) => (
          <g key={i}>
            <line x1={p.px} y1={p.py} x2={p.ex} y2={p.ey} stroke={info.col} strokeWidth="2.2" />
            <path d={arrowHead(p.px, p.py, p.ex, p.ey, 6)} fill="none" stroke={info.col} strokeWidth="2" />
          </g>
        ))}
        <rect x="315" y="45" width="208" height="145" rx="10" fill="#0f172a" stroke={info.col} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="330" y="76" fill={info.col} fontSize="16" fontWeight="700">Fluxus = {info.val}</text>
        <text x="330" y="112" fill="#cbd5e1" fontSize="11.5">{info.desc.slice(0, 32)}</text>
        <text x="330" y="130" fill="#cbd5e1" fontSize="11.5">{info.desc.slice(32)}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Kevert forrás + örvény: Cirkuláció & Fluxus együtt */
export function CircVsFluxDualWidget() {
  const [alpha, setAlpha] = useState(1.0); // forrás erősség
  const [beta, setBeta] = useState(1.0); // örvény erősség
  const cx = 190;
  const cy = 128;
  const R = 72;

  const pts = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
    const a = (k / 8) * Math.PI * 2;
    const x = Math.cos(a), y = Math.sin(a);
    const fx = alpha * x - beta * y;
    const fy = alpha * y + beta * x;
    const sc = 16;
    return { px: cx + R * x, py: cy - R * y, ex: cx + R * x + fx * sc, ey: cy - R * y - fy * sc };
  });

  return (
    <div className="widget">
      <div className="wtitle">Kevert áramlás F = α⟨x, y⟩ + β⟨−y, x⟩: a fluxus α-t, a cirkuláció β-t méri!</div>
      <div className="controls">
        <label>
          Forrás α = {alpha.toFixed(1)}
          <input type="range" min={-1.5} max={1.5} step={0.1} value={alpha} onChange={(e) => setAlpha(+e.target.value)} />
        </label>
        <label>
          Örvény β = {beta.toFixed(1)}
          <input type="range" min={-1.5} max={1.5} step={0.1} value={beta} onChange={(e) => setBeta(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 235" className="wsvg">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#38bdf8" strokeWidth="2.2" />
        {pts.map((p, i) => (
          <g key={i}>
            <line x1={p.px} y1={p.py} x2={p.ex} y2={p.ey} stroke="#fbbf24" strokeWidth="2.1" />
            <path d={arrowHead(p.px, p.py, p.ex, p.ey, 5.5)} fill="none" stroke="#fbbf24" strokeWidth="1.9" />
          </g>
        ))}
        <rect x="305" y="42" width="218" height="150" rx="10" fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="1.4" />
        <text x="320" y="72" fill="#34d399" fontSize="13.5" fontWeight="700">Cirkuláció = {(2 * Math.PI * beta).toFixed(2)}</text>
        <text x="320" y="92" fill="#94a3b8" fontSize="11">(2π β — csak az örvény számít!)</text>
        <text x="320" y="128" fill="#fb923c" fontSize="13.5" fontWeight="700">Fluxus = {(2 * Math.PI * alpha).toFixed(2)}</text>
        <text x="320" y="148" fill="#94a3b8" fontSize="11">(2π α — csak a forrás számít!)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. 3D munka csavarvonalon */
export function Work3DHelixWidget() {
  const [c, setC] = useState(1.0);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 200, 44, yaw, 20);

  // r(t) = <1.4 cos t, 1.4 sin t, 0.4 t>, F = <-y, x, c>
  const pts: [number, number][] = [];
  for (let i = 0; i <= 70; i++) {
    const t = (i / 70) * Math.PI * 2;
    pts.push(P(1.4 * Math.cos(t), 1.4 * Math.sin(t), 0.4 * t));
  }
  const W = 2 * Math.PI * (1.4 * 1.4 + c * 0.4);

  return (
    <div className="widget">
      <div className="wtitle">3D munka csavarvonalon: r(t) = ⟨1,4 cos t, 1,4 sin t, 0,4 t⟩, F = ⟨−y, x, c⟩</div>
      <div className="controls">
        <label>
          Függőleges erő c = {c.toFixed(1)}
          <input type="range" min={-2.0} max={2.5} step={0.1} value={c} onChange={(e) => setC(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 250" className="wsvg">
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.6" />
        <text x="16" y="24" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          F(r(t)) · r′(t) = 1,4² + 0,4 c = {(1.96 + 0.4 * c).toFixed(2)}  ⇒  W = 2π(1,96 + 0,4c) = {W.toFixed(2)}
        </text>
        <text x="16" y="238" fill="#94a3b8" fontSize="11.5">
          3D-ben ugyanúgy: W = ∫_a^b (M x′ + N y′ + P z′) dt — nincs szükség négyzetgyökre!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-képlettár */
export function VectorFieldMasterMapDiagram() {
  const rows = [
    { label: 'Munka / Vektoros int.', expr: 'W = ∫_C F · dr = ∫_C (M dx + N dy + P dz)', color: '#38bdf8' },
    { label: 'Paraméteres képlet', expr: '∫_a^b F(r(t)) · r′(t) dt   (nincs |v| négyzetgyök!)', color: '#34d399' },
    { label: 'Cirkuláció (zárt C)', expr: '∮_C F · T ds = ∮_C (M dx + N dy)   (keringés)', color: '#fbbf24' },
    { label: 'Fluxus (zárt 2D C)', expr: '∮_C F · n ds = ∮_C (M dy − N dx)   (kiáramlás)', color: '#fb923c' },
    { label: 'Irányfordítás (−C)', expr: '∫_(−C) F · dr = −∫_C F · dr   (előjelet vált!)', color: '#f87171' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 16.2 fejezet mester-képlettára — munka, cirkuláció és fluxus</div>
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
