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

/* ── 1. PolarAreaElementWidget: Visual proof of dA = r dr dθ ── */
export function PolarAreaElementWidget() {
  const [r, setR] = useState(1.8);
  const dr = 0.45;
  const dthDeg = 22;
  const dth = (dthDeg * Math.PI) / 180;
  const th0 = (32 * Math.PI) / 180;
  const th1 = th0 + dth;

  const ox = 45, oy = 185, sc = 52;
  const pt = (rad: number, ang: number) => ({
    x: ox + rad * sc * Math.cos(ang),
    y: oy - rad * sc * Math.sin(ang),
  });

  const p1 = pt(r, th0), p2 = pt(r + dr, th0), p3 = pt(r + dr, th1), p4 = pt(r, th1);
  const arcLen = r * dth;
  const approxArea = r * dr * dth;
  const exactArea = 0.5 * ((r + dr) ** 2 - r ** 2) * dth;

  return (
    <div className="widget">
      <div className="widget-title">Miért dA = r dr dθ? — A poláris cella ívhossza nő a sugárral!</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 265 205" style={{ width: '100%', maxWidth: 270, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={25} y1={oy} x2={250} y2={oy} stroke="#64748b" />
          <line x1={ox} y1={18} x2={ox} y2={195} stroke="#64748b" />
          {/* Rays */}
          <line x1={ox} y1={oy} x2={pt(3.4, th0).x} y2={pt(3.4, th0).y} stroke="#475569" strokeDasharray="3 3" />
          <line x1={ox} y1={oy} x2={pt(3.4, th1).x} y2={pt(3.4, th1).y} stroke="#475569" strokeDasharray="3 3" />
          {/* Polar patch */}
          <path
            d={`M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} A ${((r + dr) * sc).toFixed(1)} ${((r + dr) * sc).toFixed(1)} 0 0 0 ${p3.x.toFixed(1)} ${p3.y.toFixed(1)} L ${p4.x.toFixed(1)} ${p4.y.toFixed(1)} A ${(r * sc).toFixed(1)} ${(r * sc).toFixed(1)} 0 0 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`}
            fill="rgba(52,211,153,0.3)"
            stroke="#34d399"
            strokeWidth={2}
          />
          <text x={14} y={24} fill="#38bdf8" fontSize={11.5} fontWeight={700}>Ívhossz = r·Δθ = {arcLen.toFixed(2)}</text>
          <text x={14} y={40} fill="#fbbf24" fontSize={11.5}>Sugárméret = Δr = {dr.toFixed(2)}</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            Sugár r = <strong style={{ color: '#38bdf8' }}>{r.toFixed(2)}</strong>
            <input type="range" min={0.5} max={2.8} step={0.1} value={r} onChange={(e) => setR(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399', lineHeight: 1.65 }}>
            <div>r · Δr · Δθ = <strong style={{ color: '#34d399' }}>{approxArea.toFixed(3)}</strong></div>
            <div>Pontos terület = <strong style={{ color: '#fbbf24' }}>{exactArea.toFixed(3)}</strong></div>
            <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 4 }}>
              Húzd r-et nagyobbra: ugyanakkora Δr és Δθ mellett a cella területe r-rel arányosan nő!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2. PolarRaySweepWidget: 3 polar domains with rotating θ-ray ── */
type PolarShape = 'annulus' | 'shifted' | 'cardioid';
export function PolarRaySweepWidget() {
  const [shape, setShape] = useState<PolarShape>('cardioid');
  const [deg, setDeg] = useState(30);
  const rad = (deg * Math.PI) / 180;
  const cx = 135, cy = 115, sc = 42;
  const mx = (x: number) => cx + x * sc;
  const my = (y: number) => cy - y * sc;

  const rIn = shape === 'annulus' ? 1 : shape === 'shifted' ? 0 : 1;
  const rOut = shape === 'annulus' ? 2 : shape === 'shifted' ? Math.max(0, 2 * Math.cos(rad)) : Math.max(1, 1 + Math.cos(rad));

  // Build boundary polygons
  const cardPts = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * 2 * Math.PI;
    const rv = 1 + Math.cos(t);
    return `${mx(rv * Math.cos(t)).toFixed(1)},${my(rv * Math.sin(t)).toFixed(1)}`;
  }).join(' ');
  const shiftPts = Array.from({ length: 73 }, (_, i) => {
    const t = -Math.PI / 2 + (i / 72) * Math.PI;
    const rv = 2 * Math.cos(t);
    return `${mx(rv * Math.cos(t)).toFixed(1)},${my(rv * Math.sin(t)).toFixed(1)}`;
  }).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Sugárnyíl-módszer: honnan lép be és hol lép ki a sugár?</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {[
          { k: 'annulus', l: 'Körgyűrű (1 ≤ r ≤ 2)' },
          { k: 'shifted', l: 'Eltolt kör (r = 2 cos θ)' },
          { k: 'cardioid', l: 'Kardioid − kör (1 ≤ r ≤ 1+cos θ)' },
        ].map((b) => (
          <button key={b.k} onClick={() => setShape(b.k as PolarShape)} style={{ padding: '5px 9px', borderRadius: 8, border: `1px solid ${shape === b.k ? '#38bdf8' : '#334155'}`, background: shape === b.k ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: shape === b.k ? '#38bdf8' : '#cbd5e1', fontWeight: 700, fontSize: 11.5, cursor: 'pointer' }}>
            {b.l}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 295 230" style={{ width: '100%', maxWidth: 330, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        <line x1={18} y1={cy} x2={278} y2={cy} stroke="#475569" strokeDasharray="3 3" />
        <line x1={cx} y1={16} x2={cx} y2={214} stroke="#475569" strokeDasharray="3 3" />
        {shape === 'annulus' && (
          <>
            <circle cx={cx} cy={cy} r={2 * sc} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={2} />
            <circle cx={cx} cy={cy} r={sc} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.8} />
          </>
        )}
        {shape === 'shifted' && <polygon points={shiftPts} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
        {shape === 'cardioid' && (
          <>
            <polygon points={cardPts} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={2} />
            <circle cx={cx} cy={cy} r={sc} fill="rgba(15,23,42,0.75)" stroke="#fbbf24" strokeWidth={1.8} />
          </>
        )}
        {/* Active ray */}
        <line x1={cx} y1={cy} x2={mx(rIn * Math.cos(rad))} y2={my(rIn * Math.sin(rad))} stroke="#64748b" strokeDasharray="3 2" />
        <line x1={mx(rIn * Math.cos(rad))} y1={my(rIn * Math.sin(rad))} x2={mx(rOut * Math.cos(rad))} y2={my(rOut * Math.sin(rad))} stroke="#34d399" strokeWidth={3} />
        <circle cx={mx(rIn * Math.cos(rad))} cy={my(rIn * Math.sin(rad))} r={4.5} fill="#fbbf24" />
        <circle cx={mx(rOut * Math.cos(rad))} cy={my(rOut * Math.sin(rad))} r={4.5} fill="#34d399" />
        <text x={14} y={24} fill="#34d399" fontSize={11.5} fontWeight={700}>
          θ = {deg}°: belép r = {rIn.toFixed(2)} → kilép r = {rOut.toFixed(2)}
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Sugárszög θ = {deg}°:</span>
        <input type="range" min={shape === 'annulus' ? 0 : -85} max={shape === 'annulus' ? 360 : 85} value={deg} onChange={(e) => setDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 3. CartesianToPolarConverterWidget: 4 classic conversions ── */
const CONVS = [
  { label: 'Negyedkör', cart: '0 ≤ x ≤ a, 0 ≤ y ≤ √(a²−x²)', polar: '0 ≤ θ ≤ π/2, 0 ≤ r ≤ a', start: 0, end: Math.PI / 2 },
  { label: 'Felső félkör', cart: '−a ≤ x ≤ a, 0 ≤ y ≤ √(a²−x²)', polar: '0 ≤ θ ≤ π, 0 ≤ r ≤ a', start: 0, end: Math.PI },
  { label: 'Jobb félkör', cart: '0 ≤ x ≤ a, −√(a²−x²) ≤ y ≤ √(a²−x²)', polar: '−π/2 ≤ θ ≤ π/2, 0 ≤ r ≤ a', start: -Math.PI / 2, end: Math.PI / 2 },
  { label: '45°-os körcikk', cart: '0 ≤ y ≤ a/√2, y ≤ x ≤ √(a²−y²)', polar: '0 ≤ θ ≤ π/4, 0 ≤ r ≤ a', start: 0, end: Math.PI / 4 },
];

export function CartesianToPolarConverterWidget() {
  const [idx, setIdx] = useState(0);
  const c = CONVS[idx];
  const cx = 95, cy = 95, r = 68;
  const x1 = cx + r * Math.cos(c.start), y1 = cy - r * Math.sin(c.start);
  const x2 = cx + r * Math.cos(c.end), y2 = cy - r * Math.sin(c.end);

  return (
    <div className="widget">
      <div className="widget-title">Derékszögű → Polár átváltó: 4 klasszikus vizsgatartomány</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {CONVS.map((item, i) => (
          <button key={item.label} onClick={() => setIdx(i)} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${idx === i ? '#34d399' : '#334155'}`, background: idx === i ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: idx === i ? '#34d399' : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 190 190" style={{ width: '100%', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={15} y1={cy} x2={175} y2={cy} stroke="#475569" strokeDasharray="3 3" />
          <line x1={cx} y1={15} x2={cx} y2={175} stroke="#475569" strokeDasharray="3 3" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#475569" strokeDasharray="3 3" />
          <path d={`M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 0 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`} fill="rgba(52,211,153,0.28)" stroke="#34d399" strokeWidth={2} />
        </svg>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399', fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.7 }}>
          <div><strong style={{ color: '#fb923c' }}>Derékszögű:</strong><br />{c.cart}</div>
          <div style={{ marginTop: 8 }}><strong style={{ color: '#34d399' }}>Poláris (sokkal tisztább!):</strong><br />{c.polar}</div>
        </div>
      </div>
    </div>
  );
}

/* ── 4. PolarVolume3DWidget: Paraboloid z = R² - r² volume ── */
export function PolarVolume3DWidget() {
  const [R, setR] = useState(2.0);
  const [yawDeg, setYawDeg] = useState(32);
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = 0.45;
  const cx = 195, cy = 185, sc = 42;
  const p = (x: number, y: number, z: number) => proj3D(x, y, z * 0.45, yaw, pitch, cx, cy, sc);

  const rings = [0.25, 0.5, 0.75, 1.0].map((frac) => {
    const rv = frac * R;
    const zv = R * R - rv * rv;
    const pts = Array.from({ length: 49 }, (_, i) => {
      const t = (i / 48) * 2 * Math.PI;
      const q = p(rv * Math.cos(t), rv * Math.sin(t), zv);
      return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
    }).join(' ');
    return <polyline key={frac} points={pts} fill="none" stroke="#38bdf8" strokeWidth={frac === 1 ? 2.2 : 1.3} strokeOpacity={0.8} />;
  });

  const ribs = [0, 1, 2, 3].map((k) => {
    const ang = (k * Math.PI) / 4;
    const pts = Array.from({ length: 25 }, (_, i) => {
      const u = -R + (i / 24) * 2 * R;
      const q = p(u * Math.cos(ang), u * Math.sin(ang), R * R - u * u);
      return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
    }).join(' ');
    return <polyline key={k} points={pts} fill="none" stroke="#2dd4bf" strokeOpacity={0.55} strokeWidth={1.1} />;
  });

  const vol = (Math.PI * Math.pow(R, 4)) / 2;

  return (
    <div className="widget">
      <div className="widget-title">3D térfogat polárban: z = R² − (x² + y²) paraboloid az xy-sík felett</div>
      <svg viewBox="0 0 390 230" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {ribs}
        {rings}
        <text x={14} y={24} fill="#34d399" fontSize={12.5} fontWeight={700}>
          V = ∫₀^(2π) ∫₀ᴿ (R² − r²) r dr dθ = ½ π R⁴ = {vol.toFixed(2)}
        </text>
        <text x={14} y={42} fill="#cbd5e1" fontSize={11.5}>
          (A körülírt henger térfogata πR⁴ — a paraboloid pontosan a FELE!)
        </text>
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <label>Sugár R = <strong style={{ color: '#38bdf8' }}>{R.toFixed(1)}</strong><input type="range" min={1.0} max={2.5} step={0.1} value={R} onChange={(e) => setR(Number(e.target.value))} style={{ width: '100%' }} /></label>
        <label>Forgatás ({yawDeg}°)<input type="range" min={-140} max={140} value={yawDeg} onChange={(e) => setYawDeg(Number(e.target.value))} style={{ width: '100%' }} /></label>
      </div>
    </div>
  );
}

/* ── 5. ShiftedCirclePolarWidget: r = 2 cos θ swept from -π/2 to π/2 ── */
export function ShiftedCirclePolarWidget() {
  const [deg, setDeg] = useState(40);
  const rad = (deg * Math.PI) / 180;
  const cx = 75, cy = 105, sc = 78;
  const mx = (x: number) => cx + x * sc;
  const my = (y: number) => cy - y * sc;

  const sweptPts: string[] = [`${mx(0)},${my(0)}`];
  for (let d = -90; d <= deg; d += 3) {
    const t = (d * Math.PI) / 180;
    const rv = 2 * Math.cos(t);
    sweptPts.push(`${mx(rv * Math.cos(t)).toFixed(1)},${my(rv * Math.sin(t)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Eltolt kör: r = 2 cos θ már −π/2 ≤ θ ≤ π/2 alatt TELJESEN körbeér!</div>
      <svg viewBox="0 0 280 210" style={{ width: '100%', maxWidth: 320, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        <line x1={20} y1={cy} x2={260} y2={cy} stroke="#475569" strokeDasharray="3 3" />
        <line x1={cx} y1={18} x2={cx} y2={195} stroke="#475569" strokeDasharray="3 3" />
        <circle cx={mx(1)} cy={my(0)} r={sc} fill="none" stroke="#64748b" strokeWidth={1.6} />
        <polygon points={sweptPts.join(' ')} fill="rgba(251,191,36,0.26)" stroke="#fbbf24" strokeWidth={2} />
        <line x1={mx(0)} y1={my(0)} x2={mx(2 * Math.cos(rad) * Math.cos(rad))} y2={my(2 * Math.cos(rad) * Math.sin(rad))} stroke="#34d399" strokeWidth={2.5} />
        <text x={14} y={24} fill="#fbbf24" fontSize={11.5} fontWeight={700}>
          Besöpört tartomány: −90° → {deg}° (r = {(2 * Math.cos(rad)).toFixed(2)})
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>θ = {deg}° (−90° … +90°):</span>
        <input type="range" min={-90} max={90} value={deg} onChange={(e) => setDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 6. GaussianBell3DWidget: 3D Gaussian bell z = e^(-(x²+y²)) ── */
export function GaussianBell3DWidget() {
  const [R, setR] = useState(2.2);
  const yaw = 0.55, pitch = 0.44, cx = 195, cy = 165, sc = 52;
  const p = (x: number, y: number, z: number) => proj3D(x, y, z * 1.9, yaw, pitch, cx, cy, sc);

  const rings = [0.3, 0.7, 1.1, 1.6, R].map((rv, idx) => {
    const zv = Math.exp(-rv * rv);
    const pts = Array.from({ length: 49 }, (_, i) => {
      const t = (i / 48) * 2 * Math.PI;
      const q = p(rv * Math.cos(t), rv * Math.sin(t), zv);
      return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
    }).join(' ');
    return <polyline key={idx} points={pts} fill="none" stroke={idx === 4 ? '#fbbf24' : '#38bdf8'} strokeWidth={idx === 4 ? 2.2 : 1.2} />;
  });

  const volR = Math.PI * (1 - Math.exp(-R * R));
  const sqrtVol = Math.sqrt(volR);

  return (
    <div className="widget">
      <div className="widget-title">A Gauss-harang: z = e^−(x²+y²) térfogata R → ∞ esetén pontosan π!</div>
      <svg viewBox="0 0 390 220" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {rings}
        <text x={14} y={24} fill="#34d399" fontSize={12.5} fontWeight={700}>
          V(R) = π(1 − e^(−R²)) = {volR.toFixed(4)}   (határérték: π ≈ 3,1416)
        </text>
        <text x={14} y={42} fill="#fbbf24" fontSize={12}>
          √V(R) = {sqrtVol.toFixed(4)}   →   ∫_(−∞)^∞ e^(−x²) dx = √π ≈ 1,7725 !
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Körlap sugara R = {R.toFixed(2)}:</span>
        <input type="range" min={0.5} max={3.0} step={0.1} value={R} onChange={(e) => setR(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 7. FlywheelInertiaWidget: Solid disk vs hollow ring (same mass M=10) ── */
export function FlywheelInertiaWidget() {
  const [r1, setR1] = useState(0); // inner radius 0..1.9, outer r2 = 2
  const r2 = 2.0;
  const M = 10;
  const I0 = 0.5 * M * (r1 * r1 + r2 * r2); // 20 for solid disk, 40 for thin ring
  const cx = 110, cy = 95, sc = 36;

  return (
    <div className="widget">
      <div className="widget-title">Lendkerék-tervezés: tömör tárcsa vs. gyűrű (azonos M = 10 tömeg, külső R = 2)</div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 220 190" style={{ width: '100%', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <circle cx={cx} cy={cy} r={r2 * sc} fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth={2} />
          {r1 > 0.05 && <circle cx={cx} cy={cy} r={r1 * sc} fill="#0f172a" stroke="#fbbf24" strokeWidth={2} />}
          <circle cx={cx} cy={cy} r={3.5} fill="#f87171" />
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            Belső lyuk sugara r₁ = <strong style={{ color: '#fbbf24' }}>{r1.toFixed(2)}</strong>
            <input type="range" min={0} max={1.9} step={0.05} value={r1} onChange={(e) => setR1(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399', lineHeight: 1.6 }}>
            <div>I₀ = ½ M (r₁² + r₂²) = <strong style={{ color: '#34d399', fontSize: 15 }}>{I0.toFixed(2)}</strong></div>
            <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 4 }}>
              Ha ugyanazt a 10 kg-ot a peremre toljuk (r₁ → 2), a tehetetlenségi nyomaték megduplázódik (20 → 40)!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 8. PolarIntegralSummaryDiagram: Master cheat-sheet ── */
export function PolarIntegralSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">15.3 Mester-térkép: Kettős integrálás polárkoordinátákkal</div>
      <svg viewBox="0 0 520 220" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        <rect x={14} y={14} width={238} height={90} rx={10} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.4} />
        <text x={133} y={35} textAnchor="middle" fill="#38bdf8" fontSize={12.5} fontWeight={700}>Átváltási szótár</text>
        <text x={133} y={56} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>x = r cos θ · y = r sin θ · x²+y² = r²</text>
        <text x={133} y={80} textAnchor="middle" fill="#fbbf24" fontSize={12.5} fontWeight={700}>dA = r dr dθ  (NE FELEJTSD AZ r-ET!)</text>

        <rect x={268} y={14} width={238} height={90} rx={10} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.4} />
        <text x={387} y={35} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>Mikor válts polárba?</text>
        <text x={387} y={56} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>1. Kör / körgyűrű / körcikk tartomány</text>
        <text x={387} y={78} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>2. Integrandusban x² + y² szerepel</text>

        <rect x={14} y={118} width={238} height={88} rx={10} fill="rgba(251,146,60,0.14)" stroke="#fb923c" strokeWidth={1.4} />
        <text x={133} y={140} textAnchor="middle" fill="#fb923c" fontSize={12.5} fontWeight={700}>Eltolt körök határai!</text>
        <text x={133} y={162} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>r = 2a cos θ ⇒ −π/2 ≤ θ ≤ π/2</text>
        <text x={133} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>r = 2a sin θ ⇒ 0 ≤ θ ≤ π</text>

        <rect x={268} y={118} width={238} height={88} rx={10} fill="rgba(45,212,191,0.14)" stroke="#2dd4bf" strokeWidth={1.4} />
        <text x={387} y={140} textAnchor="middle" fill="#2dd4bf" fontSize={12.5} fontWeight={700}>A Gauss-integrál</text>
        <text x={387} y={162} textAnchor="middle" fill="#f8fafc" fontSize={12}>∫_(−∞)^∞ e^(−x²) dx = √π</text>
        <text x={387} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={11}>Négyzetre emelés + polárkoordináta!</text>
      </svg>
    </div>
  );
}
