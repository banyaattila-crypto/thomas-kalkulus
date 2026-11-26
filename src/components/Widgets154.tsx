import { useState } from 'react';

/* ── Shared 3D isometric helper ── */
function proj3D(x: number, y: number, z: number, yaw: number, pitch: number, cx: number, cy: number, scale: number) {
  const cyaw = Math.cos(yaw), syaw = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const x1 = x * cyaw - y * syaw;
  const y1 = x * syaw + y * cyaw;
  const x2 = x1;
  const y2 = y1 * sp - z * cp;
  return { sx: cx + x2 * scale, sy: cy + y2 * scale };
}

/* ── 1. VoxelGrid3DWidget: 3D cube subdivided into N×N×N voxels ── */
export function VoxelGrid3DWidget() {
  const [n, setN] = useState(3);
  const [yawDeg, setYawDeg] = useState(35);
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = 0.46;
  const cx = 185, cy = 125, sc = 56;
  const p = (x: number, y: number, z: number) => proj3D(x - 1, y - 1, z - 1, yaw, pitch, cx, cy, sc);
  const poly = (...pts: { sx: number; sy: number }[]) => pts.map((q) => `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`).join(' ');

  // Outer cube wireframe [0,2]^3
  const step = 2 / n;
  const gridLines: JSX.Element[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i * step;
    const a1 = p(t, 0, 0), a2 = p(t, 2, 0), a3 = p(t, 2, 2), a4 = p(t, 0, 2);
    gridLines.push(
      <polyline key={`gx-${i}`} points={poly(a1, a2, a3, a4, a1)} fill="none" stroke="#475569" strokeWidth={i === 0 || i === n ? 1.4 : 0.7} />
    );
    const b1 = p(0, t, 0), b2 = p(2, t, 0), b3 = p(2, t, 2), b4 = p(0, t, 2);
    gridLines.push(
      <polyline key={`gy-${i}`} points={poly(b1, b2, b3, b4, b1)} fill="none" stroke="#475569" strokeWidth={i === 0 || i === n ? 1.4 : 0.7} />
    );
  }

  // Highlight one voxel near the top front corner
  const vx = (n - 1) * step, vy = (n - 1) * step, vz = (n - 1) * step;
  const c000 = p(vx, vy, vz), c100 = p(vx + step, vy, vz), c110 = p(vx + step, vy + step, vz), c010 = p(vx, vy + step, vz);
  const c001 = p(vx, vy, vz + step), c101 = p(vx + step, vy, vz + step), c111 = p(vx + step, vy + step, vz + step), c011 = p(vx, vy + step, vz + step);

  return (
    <div className="widget">
      <div className="widget-title">3D Riemann-felosztás: {n}×{n}×{n} = {n * n * n} darab ΔV = Δx·Δy·Δz voxel</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {[2, 3, 4].map((k) => (
          <button key={k} onClick={() => setN(k)} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${n === k ? '#38bdf8' : '#334155'}`, background: n === k ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: n === k ? '#38bdf8' : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {k}×{k}×{k} = {k ** 3} voxel
          </button>
        ))}
      </div>
      <svg viewBox="0 0 370 235" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {gridLines}
        {/* Highlighted voxel */}
        <polygon points={poly(c001, c101, c111, c011)} fill="rgba(52,211,153,0.48)" stroke="#34d399" strokeWidth={1.6} />
        <polygon points={poly(c100, c110, c111, c101)} fill="rgba(56,189,248,0.42)" stroke="#38bdf8" strokeWidth={1.5} />
        <polygon points={poly(c010, c110, c111, c011)} fill="rgba(45,212,191,0.38)" stroke="#2dd4bf" strokeWidth={1.5} />
        <text x={14} y={24} fill="#34d399" fontSize={12} fontWeight={700}>
          Egy voxel térfogata: ΔV = ({step.toFixed(2)})³ = {(step ** 3).toFixed(3)}
        </text>
        <text x={14} y={42} fill="#cbd5e1" fontSize={11.5}>
          Össztérfogat: {n ** 3} × {(step ** 3).toFixed(3)} = 8,000
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Forgatás ({yawDeg}°):</span>
        <input type="range" min={-150} max={150} value={yawDeg} onChange={(e) => setYawDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 2. ShadowAndSpear3DWidget: Tetrahedron x+y+z ≤ 2 with vertical z-spear & xy-shadow ── */
export function ShadowAndSpear3DWidget() {
  const [x0, setX0] = useState(0.6);
  const [y0, setY0] = useState(0.5);
  const safeY = Math.min(y0, Math.max(0.05, 1.95 - x0));
  const zTop = Math.max(0, 2 - x0 - safeY);

  const yaw = 0.58, pitch = 0.44, cx = 175, cy = 170, sc = 56;
  const p = (x: number, y: number, z: number) => proj3D(x, y, z, yaw, pitch, cx, cy, sc);
  const poly = (...pts: { sx: number; sy: number }[]) => pts.map((q) => `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`).join(' ');

  const o = p(0, 0, 0), px = p(2, 0, 0), py = p(0, 2, 0), pz = p(0, 0, 2);
  const sBot = p(x0, safeY, 0), sTop = p(x0, safeY, zTop);

  return (
    <div className="widget">
      <div className="widget-title">„Árnyék + Lándzsa” módszer: x + y + z ≤ 2 tetraéder (első oktáns)</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 340 230" style={{ width: '100%', maxWidth: 350, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          {/* xy shadow */}
          <polygon points={poly(o, px, py)} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={1.8} />
          {/* Tetrahedron edges */}
          <polygon points={poly(o, px, pz)} fill="rgba(45,212,191,0.09)" stroke="#64748b" strokeWidth={1.2} />
          <polygon points={poly(o, py, pz)} fill="rgba(45,212,191,0.09)" stroke="#64748b" strokeWidth={1.2} />
          <polygon points={poly(px, py, pz)} fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth={1.6} />
          {/* Vertical z-spear */}
          <line x1={sBot.sx} y1={sBot.sy} x2={sTop.sx} y2={sTop.sy} stroke="#34d399" strokeWidth={3} />
          <circle cx={sBot.sx} cy={sBot.sy} r={4.5} fill="#38bdf8" stroke="#fff" strokeWidth={1.2} />
          <circle cx={sTop.sx} cy={sTop.sy} r={4.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.2} />
          <text x={px.sx + 5} y={px.sy + 4} fill="#94a3b8" fontSize={11}>x=2</text>
          <text x={py.sx - 24} y={py.sy + 4} fill="#94a3b8" fontSize={11}>y=2</text>
          <text x={pz.sx + 6} y={pz.sy} fill="#94a3b8" fontSize={11}>z=2</text>
          <text x={14} y={24} fill="#34d399" fontSize={12} fontWeight={700}>
            Lándzsa: z = 0 → z = 2 − x − y = {zTop.toFixed(2)}
          </text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>x₀ = <strong style={{ color: '#38bdf8' }}>{x0.toFixed(2)}</strong><input type="range" min={0.1} max={1.8} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} style={{ width: '100%' }} /></label>
          <label>y₀ = <strong style={{ color: '#2dd4bf' }}>{safeY.toFixed(2)}</strong><input type="range" min={0.1} max={Math.max(0.15, 1.9 - x0)} step={0.05} value={safeY} onChange={(e) => setY0(Number(e.target.value))} style={{ width: '100%' }} /></label>
          <div style={{ padding: '9px 11px', borderRadius: 9, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399', fontSize: 12, lineHeight: 1.6 }}>
            <strong>1. Belső (lándzsa):</strong> 0 ≤ z ≤ 2 − x − y<br />
            <strong>2. Árnyék (xy-sík):</strong> 0 ≤ x ≤ 2, 0 ≤ y ≤ 2 − x
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. SixOrdersTetrahedronWidget: All 6 orders for x + 2y + 3z ≤ 6 ── */
const SIX_ORDERS = [
  { id: 'dzdydx', label: 'dz dy dx', proj: 'xy-sík (x + 2y ≤ 6)', inner: '0 ≤ z ≤ (6 − x − 2y)/3', mid: '0 ≤ y ≤ (6 − x)/2', outer: '0 ≤ x ≤ 6', col: '#38bdf8' },
  { id: 'dzdxdy', label: 'dz dx dy', proj: 'xy-sík (x + 2y ≤ 6)', inner: '0 ≤ z ≤ (6 − x − 2y)/3', mid: '0 ≤ x ≤ 6 − 2y', outer: '0 ≤ y ≤ 3', col: '#38bdf8' },
  { id: 'dydzdx', label: 'dy dz dx', proj: 'xz-sík (x + 3z ≤ 6)', inner: '0 ≤ y ≤ (6 − x − 3z)/2', mid: '0 ≤ z ≤ (6 − x)/3', outer: '0 ≤ x ≤ 6', col: '#34d399' },
  { id: 'dydxdz', label: 'dy dx dz', proj: 'xz-sík (x + 3z ≤ 6)', inner: '0 ≤ y ≤ (6 − x − 3z)/2', mid: '0 ≤ x ≤ 6 − 3z', outer: '0 ≤ z ≤ 2', col: '#34d399' },
  { id: 'dxdzdy', label: 'dx dz dy', proj: 'yz-sík (2y + 3z ≤ 6)', inner: '0 ≤ x ≤ 6 − 2y − 3z', mid: '0 ≤ z ≤ (6 − 2y)/3', outer: '0 ≤ y ≤ 3', col: '#fbbf24' },
  { id: 'dxdydz', label: 'dx dy dz', proj: 'yz-sík (2y + 3z ≤ 6)', inner: '0 ≤ x ≤ 6 − 2y − 3z', mid: '0 ≤ y ≤ (6 − 3z)/2', outer: '0 ≤ z ≤ 2', col: '#fbbf24' },
];

export function SixOrdersTetrahedronWidget() {
  const [idx, setIdx] = useState(5);
  const o = SIX_ORDERS[idx];
  return (
    <div className="widget">
      <div className="widget-title">A 3! = 6 integrálási sorrend az x + 2y + 3z ≤ 6 tetraéderen (x, y, z ≥ 0)</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {SIX_ORDERS.map((item, i) => (
          <button key={item.id} onClick={() => setIdx(i)} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${idx === i ? item.col : '#334155'}`, background: idx === i ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.55)', color: idx === i ? item.col : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: `1px solid ${o.col}`, fontSize: 13, color: '#e2e8f0', lineHeight: 1.75 }}>
        <div><strong>Vetítési sík (árnyék):</strong> <span style={{ color: o.col, fontWeight: 700 }}>{o.proj}</span></div>
        <div>• <strong>Belső határ:</strong> {o.inner}</div>
        <div>• <strong>Középső határ:</strong> {o.mid}</div>
        <div>• <strong>Külső határ (konstans!):</strong> {o.outer}</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
          Tipp: a <strong style={{ color: '#fbbf24' }}>dx dy dz</strong> sorrendben a belső határban egyetlen tört sincs (6 − 2y − 3z)! Mind a 6 sorrend eredménye V = 6.
        </div>
      </div>
    </div>
  );
}

/* ── 4. HorizontalParaboloid3DWidget: y = x² + z² capped by y = 4, projected to xz-plane ── */
export function HorizontalParaboloid3DWidget() {
  const [yawDeg, setYawDeg] = useState(28);
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = 0.42;
  const cx = 195, cy = 120, sc = 40;
  const p = (x: number, y: number, z: number) => proj3D(x, y - 2, z, yaw, pitch, cx, cy, sc);

  const rings = [0.5, 1.5, 2.7, 4.0].map((yv) => {
    const r = Math.sqrt(yv);
    const pts = Array.from({ length: 49 }, (_, i) => {
      const t = (i / 48) * 2 * Math.PI;
      const q = p(r * Math.cos(t), yv, r * Math.sin(t));
      return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
    }).join(' ');
    return <polyline key={yv} points={pts} fill="none" stroke={yv === 4 ? '#fbbf24' : '#38bdf8'} strokeWidth={yv === 4 ? 2.2 : 1.3} />;
  });

  // Horizontal y-spear at (x=0.8, z=0.6) => y from 1.0 to 4.0
  const s1 = p(0.8, 1.0, 0.6), s2 = p(0.8, 4.0, 0.6);

  return (
    <div className="widget">
      <div className="widget-title">Vízszintes lándzsa (dy legbelül!): y = x² + z² paraboloid és y = 4 sík</div>
      <svg viewBox="0 0 390 220" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {rings}
        <line x1={s1.sx} y1={s1.sy} x2={s2.sx} y2={s2.sy} stroke="#34d399" strokeWidth={3} />
        <circle cx={s1.sx} cy={s1.sy} r={4.5} fill="#38bdf8" stroke="#fff" strokeWidth={1.2} />
        <circle cx={s2.sx} cy={s2.sy} r={4.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.2} />
        <text x={14} y={24} fill="#34d399" fontSize={12} fontWeight={700}>
          y-lándzsa: belép y = x² + z² → kilép y = 4
        </text>
        <text x={14} y={42} fill="#fbbf24" fontSize={11.5}>
          xz-árnyék: x² + z² ≤ 4 körlap (polárban r ∈ [0, 2] ⇒ V = 8π!)
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Forgatás ({yawDeg}°):</span>
        <input type="range" min={-120} max={120} value={yawDeg} onChange={(e) => setYawDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 5. TripleOrderSwapWidget: Simplex 0 ≤ z ≤ y ≤ x ≤ 1 ── */
const SIMPLEX_ORDERS = [
  { label: 'dz dy dx', expr: '∫₀¹ ∫₀ˣ ∫₀ʸ F dz dy dx', chain: '0 ≤ x ≤ 1 · 0 ≤ y ≤ x · 0 ≤ z ≤ y' },
  { label: 'dx dy dz', expr: '∫₀¹ ∫_z¹ ∫_y¹ F dx dy dz', chain: '0 ≤ z ≤ 1 · z ≤ y ≤ 1 · y ≤ x ≤ 1' },
  { label: 'dy dz dx', expr: '∫₀¹ ∫₀ˣ ∫_zˣ F dy dz dx', chain: '0 ≤ x ≤ 1 · 0 ≤ z ≤ x · z ≤ y ≤ x' },
];

export function TripleOrderSwapWidget() {
  const [i, setI] = useState(0);
  const cur = SIMPLEX_ORDERS[i];
  return (
    <div className="widget">
      <div className="widget-title">Sorrendcsere egyenlőtlenség-láncból: 0 ≤ z ≤ y ≤ x ≤ 1 szimplex</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        {SIMPLEX_ORDERS.map((o, idx) => (
          <button key={o.label} onClick={() => setI(idx)} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${i === idx ? '#34d399' : '#334155'}`, background: i === idx ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: i === idx ? '#34d399' : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {o.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399', fontSize: 13, color: '#e2e8f0', lineHeight: 1.7 }}>
        <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 14 }}>{cur.expr}</div>
        <div style={{ marginTop: 4 }}>{cur.chain}</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
          A szimplex térfogata 1/3! = 1/6 (6 egybevágó szimplex tölti ki az egységkockát!).
        </div>
      </div>
    </div>
  );
}

/* ── 6. AverageTempCubeWidget: Average temperature in [0,2]³ room ── */
export function AverageTempCubeWidget() {
  const [k, setK] = useState(3); // T(x,y,z) = 15 + k*x + 2*y + z
  // On [0,2]^3: avg of x is 1, avg of y is 1, avg of z is 1 => T_avg = 15 + k + 2 + 1 = 18 + k
  const tAvg = 18 + k;
  const tMin = 15;
  const tMax = 15 + 2 * k + 4 + 2;

  return (
    <div className="widget">
      <div className="widget-title">3D átlagérték: egy 2×2×2 m-es szoba átlaghőmérséklete T(x,y,z) = 15 + kx + 2y + z</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Radiátor-erősség k = <strong style={{ color: '#fb923c' }}>{k} °C/m</strong>:</span>
        <input type="range" min={0} max={8} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center', fontSize: 12.5 }}>
        <div style={{ padding: 10, borderRadius: 9, background: 'rgba(56,189,248,0.14)', border: '1px solid #38bdf8' }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>Hideg sarok (0,0,0)</div>
          <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 15 }}>{tMin.toFixed(1)} °C</div>
        </div>
        <div style={{ padding: 10, borderRadius: 9, background: 'rgba(52,211,153,0.16)', border: '1px solid #34d399' }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>Átlaghőmérséklet T̄</div>
          <div style={{ color: '#34d399', fontWeight: 700, fontSize: 15 }}>{tAvg.toFixed(1)} °C</div>
        </div>
        <div style={{ padding: 10, borderRadius: 9, background: 'rgba(248,113,113,0.14)', border: '1px solid #f87171' }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>Meleg sarok (2,2,2)</div>
          <div style={{ color: '#f87171', fontWeight: 700, fontSize: 15 }}>{tMax.toFixed(1)} °C</div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. SteinmetzSolidWidget: Intersection of x²+y² ≤ 1 and x²+z² ≤ 1 with square slices ── */
export function SteinmetzSolidWidget() {
  const [x, setX] = useState(0.35);
  const s = Math.sqrt(Math.max(0, 1 - x * x)); // half-side of square slice
  const sliceArea = 4 * s * s;

  const yaw = 0.52, pitch = 0.44, cx = 190, cy = 115, sc = 72;
  const p = (px: number, py: number, pz: number) => proj3D(px, py, pz, yaw, pitch, cx, cy, sc);
  const poly = (...pts: { sx: number; sy: number }[]) => pts.map((q) => `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`).join(' ');

  // Draw several square slices along x in [-0.9, 0.9]
  const bgSlices = [-0.85, -0.55, -0.2, 0.2, 0.55, 0.85].map((xv) => {
    const hs = Math.sqrt(1 - xv * xv);
    const pts = poly(p(xv, -hs, -hs), p(xv, hs, -hs), p(xv, hs, hs), p(xv, -hs, hs));
    return <polygon key={xv} points={pts} fill="none" stroke="#475569" strokeWidth={1} />;
  });

  const activePts = poly(p(x, -s, -s), p(x, s, -s), p(x, s, s), p(x, -s, s));

  return (
    <div className="widget">
      <div className="widget-title">Steinmetz-test (x²+y² ≤ 1 és x²+z² ≤ 1 metszete): minden x-szelet NÉGYZET!</div>
      <svg viewBox="0 0 380 220" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {bgSlices}
        <polygon points={activePts} fill="rgba(52,211,153,0.34)" stroke="#34d399" strokeWidth={2.2} />
        <text x={14} y={24} fill="#34d399" fontSize={12} fontWeight={700}>
          x = {x.toFixed(2)}: négyzetszelet oldala 2√(1−x²) = {(2 * s).toFixed(2)} · Terület = {sliceArea.toFixed(2)}
        </text>
        <text x={14} y={42} fill="#fbbf24" fontSize={11.5}>
          Teljes térfogat: V = ∫_(−1)¹ 4(1 − x²) dx = 16/3 ≈ 5,333 (nincs is benne π!)
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Szelet helye x = {x.toFixed(2)}:</span>
        <input type="range" min={-0.95} max={0.95} step={0.05} value={x} onChange={(e) => setX(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 8. TripleIntegralRoadmapDiagram: Master cheat-sheet ── */
export function TripleIntegralRoadmapDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">15.4 Mester-térkép: Hármas integrál derékszögű koordinátákban</div>
      <svg viewBox="0 0 520 220" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        <rect x={14} y={14} width={238} height={90} rx={10} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.4} />
        <text x={133} y={35} textAnchor="middle" fill="#38bdf8" fontSize={12.5} fontWeight={700}>1. Árnyék + Lándzsa</text>
        <text x={133} y={56} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>Belső: z_alsó(x,y) → z_felső(x,y)</text>
        <text x={133} y={78} textAnchor="middle" fill="#cbd5e1" fontSize={11}>Külső kettő: xy-árnyék (15.1!)</text>

        <rect x={268} y={14} width={238} height={90} rx={10} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.4} />
        <text x={387} y={35} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>2. 3! = 6 sorrend</text>
        <text x={387} y={56} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>dz belül → xy · dy belül → xz</text>
        <text x={387} y={78} textAnchor="middle" fill="#cbd5e1" fontSize={11}>dx belül → yz-síkra vetítés!</text>

        <rect x={14} y={118} width={238} height={88} rx={10} fill="rgba(251,191,36,0.14)" stroke="#fbbf24" strokeWidth={1.4} />
        <text x={133} y={140} textAnchor="middle" fill="#fbbf24" fontSize={12.5} fontWeight={700}>3. Térfogat & Átlagérték</text>
        <text x={133} y={162} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>V = ∭_D 1 dV</text>
        <text x={133} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={11}>F̄ = (1 / V) ∭_D F dV</text>

        <rect x={268} y={118} width={238} height={88} rx={10} fill="rgba(248,113,113,0.14)" stroke="#f87171" strokeWidth={1.4} />
        <text x={387} y={140} textAnchor="middle" fill="#f87171" fontSize={12.5} fontWeight={700}>4. Határ-szabály</text>
        <text x={387} y={162} textAnchor="middle" fill="#f8fafc" fontSize={11}>Külső: konstansok</text>
        <text x={387} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={11}>Középső: 1 vált. · Belső: max 2 vált.</text>
      </svg>
    </div>
  );
}
