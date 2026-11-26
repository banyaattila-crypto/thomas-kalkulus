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

/* ── 1. LagrangeTangencyWidget: f(x,y)=xy on x²/8 + y²/2 = 1 ── */
export function LagrangeTangencyWidget() {
  const [deg, setDeg] = useState(45);
  const rad = (deg * Math.PI) / 180;
  const a = Math.SQRT2 * 2; // sqrt(8) ≈ 2.828
  const b = Math.SQRT2;     // sqrt(2) ≈ 1.414
  const px = a * Math.cos(rad);
  const py = b * Math.sin(rad);
  const fVal = px * py; // max is 2 at 45°, 225°; min is -2 at 135°, 315°

  // Gradients: ∇f = (y, x), ∇g = (x/4, y)
  const fx = py, fy = px;
  const gx = px / 4, gy = py;
  const fNorm = Math.hypot(fx, fy) || 1;
  const gNorm = Math.hypot(gx, gy) || 1;
  const cosAng = Math.max(-1, Math.min(1, (fx * gx + fy * gy) / (fNorm * gNorm)));
  const angDeg = (Math.acos(Math.abs(cosAng)) * 180) / Math.PI;
  const isParallel = angDeg < 2.5;

  const cx = 180, cy = 125, sc = 42;
  const mx = (x: number) => cx + x * sc;
  const my = (y: number) => cy - y * sc;

  // Ellipse path
  const ellPts: string[] = [];
  for (let i = 0; i <= 72; i++) {
    const t = (i / 72) * 2 * Math.PI;
    ellPts.push(`${mx(a * Math.cos(t)).toFixed(1)},${my(b * Math.sin(t)).toFixed(1)}`);
  }

  // Hyperbola level curves xy = c
  const levels = [-2, -1, 1, 2];
  const hypPaths: JSX.Element[] = [];
  levels.forEach((c) => {
    const pos: string[] = [];
    const neg: string[] = [];
    for (let x = 0.28; x <= 3.6; x += 0.1) {
      const y = c / x;
      if (Math.abs(y) <= 2.7) pos.push(`${mx(x).toFixed(1)},${my(y).toFixed(1)}`);
      const y2 = c / -x;
      if (Math.abs(y2) <= 2.7) neg.push(`${mx(-x).toFixed(1)},${my(y2).toFixed(1)}`);
    }
    const isTan = Math.abs(c) === 2;
    hypPaths.push(
      <polyline key={`p-${c}`} points={pos.join(' ')} fill="none" stroke={c > 0 ? '#38bdf8' : '#2dd4bf'} strokeOpacity={isTan ? 0.85 : 0.35} strokeWidth={isTan ? 1.8 : 1.1} strokeDasharray={isTan ? undefined : '4 3'} />,
      <polyline key={`n-${c}`} points={neg.join(' ')} fill="none" stroke={c > 0 ? '#38bdf8' : '#2dd4bf'} strokeOpacity={isTan ? 0.85 : 0.35} strokeWidth={isTan ? 1.8 : 1.1} strokeDasharray={isTan ? undefined : '4 3'} />
    );
  });

  const vScale = 28;
  const fEnd = { x: mx(px) + (fx / fNorm) * vScale, y: my(py) - (fy / fNorm) * vScale };
  const gEnd = { x: mx(px) + (gx / gNorm) * vScale, y: my(py) - (gy / gNorm) * vScale };

  return (
    <div className="widget">
      <div className="widget-title">Gradiensek párhuzamossága: f(x, y) = xy az x²/8 + y²/2 = 1 ellipszisen</div>
      <svg viewBox="0 0 360 250" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        <line x1={18} y1={cy} x2={342} y2={cy} stroke="#475569" strokeDasharray="3 3" />
        <line x1={cx} y1={16} x2={cx} y2={234} stroke="#475569" strokeDasharray="3 3" />
        {hypPaths}
        <polygon points={ellPts.join(' ')} fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeWidth={2.2} />
        {/* Gradient arrows */}
        <line x1={mx(px)} y1={my(py)} x2={fEnd.x} y2={fEnd.y} stroke="#38bdf8" strokeWidth={2.6} />
        <line x1={mx(px)} y1={my(py)} x2={gEnd.x} y2={gEnd.y} stroke="#fb923c" strokeWidth={2.6} />
        <circle cx={mx(px)} cy={my(py)} r={5.5} fill={isParallel ? '#34d399' : '#f87171'} stroke="#fff" strokeWidth={1.5} />
        <text x={14} y={24} fill="#38bdf8" fontSize={11.5} fontWeight={700}>Cián: ∇f = (y, x)</text>
        <text x={14} y={40} fill="#fb923c" fontSize={11.5} fontWeight={700}>Narancs: ∇g = (x/4, y)</text>
        <text x={14} y={236} fill={isParallel ? '#34d399' : '#cbd5e1'} fontSize={12} fontWeight={700}>
          f(P) = {fVal.toFixed(2)} · Szög(∇f, ∇g) = {angDeg.toFixed(1)}° {isParallel ? '⇒ PÁRHUZAMOSAK (SZÉLSŐÉRTÉK)!' : ''}
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Pont az ellipszisen (θ = {deg}°):</span>
        <input type="range" min={0} max={360} value={deg} onChange={(e) => setDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
        {[45, 135, 225, 315].map((aDeg) => (
          <button key={aDeg} onClick={() => setDeg(aDeg)} style={{ padding: '4px 9px', borderRadius: 7, background: 'rgba(52,211,153,0.14)', color: '#34d399', border: '1px solid #34d399', fontSize: 11.5, cursor: 'pointer' }}>
            θ = {aDeg}° ({aDeg === 45 || aDeg === 225 ? 'Max = 2' : 'Min = −2'})
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 2. CircleConstraintWidget: f(x,y) = x² + 2y² on x² + y² = 1 ── */
export function CircleConstraintWidget() {
  const [deg, setDeg] = useState(90);
  const rad = (deg * Math.PI) / 180;
  const x = Math.cos(rad);
  const y = Math.sin(rad);
  const val = x * x + 2 * y * y;
  const cx = 140, cy = 120, r = 78;
  const px = cx + x * r, py = cy - y * r;

  return (
    <div className="widget">
      <div className="widget-title">Esetszétválasztás: f(x, y) = x² + 2y² az x² + y² = 1 egységkörön</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 280 240" style={{ width: '100%', maxWidth: 280, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={25} y1={cy} x2={255} y2={cy} stroke="#475569" strokeDasharray="3 3" />
          <line x1={cx} y1={20} x2={cx} y2={220} stroke="#475569" strokeDasharray="3 3" />
          {/* Level ellipses x^2 + 2y^2 = c */}
          {[1, 1.5, 2].map((c) => (
            <ellipse key={c} cx={cx} cy={cy} rx={Math.sqrt(c) * r} ry={Math.sqrt(c / 2) * r} fill="none" stroke={c === 1 ? '#34d399' : c === 2 ? '#38bdf8' : '#64748b'} strokeWidth={c === 1.5 ? 1 : 1.7} strokeDasharray={c === 1.5 ? '4 3' : undefined} />
          ))}
          <circle cx={cx} cy={cy} r={r} fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeWidth={2.2} />
          {/* 4 critical points */}
          <circle cx={cx + r} cy={cy} r={4.5} fill="#34d399" />
          <circle cx={cx - r} cy={cy} r={4.5} fill="#34d399" />
          <circle cx={cx} cy={cy - r} r={4.5} fill="#38bdf8" />
          <circle cx={cx} cy={cy + r} r={4.5} fill="#38bdf8" />
          <circle cx={px} cy={py} r={6} fill="#fb923c" stroke="#fff" strokeWidth={1.6} />
          <text x={14} y={24} fill="#38bdf8" fontSize={11.5} fontWeight={700}>Max = 2: (0, ±1), λ = 2</text>
          <text x={14} y={40} fill="#34d399" fontSize={11.5} fontWeight={700}>Min = 1: (±1, 0), λ = 1</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>Aktuális pont: <strong>({x.toFixed(2)}, {y.toFixed(2)})</strong></div>
          <div>f(x, y) = x² + 2y² = <strong style={{ color: '#fbbf24', fontSize: 15 }}>{val.toFixed(3)}</strong></div>
          <label>
            Szög θ = {deg}°
            <input type="range" min={0} max={360} value={deg} onChange={(e) => setDeg(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(15,23,42,0.65)', border: '1px solid #334155', fontSize: 12 }}>
            2x = 2λx ⇒ x(1−λ) = 0<br />
            4y = 2λy ⇒ y(2−λ) = 0<br />
            <strong>1. eset:</strong> λ = 1 ⇒ y = 0 ⇒ (±1, 0)<br />
            <strong>2. eset:</strong> x = 0 ⇒ λ = 2 ⇒ (0, ±1)
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. EllipsoidBox3DWidget: Largest box inscribed in x²/9 + y²/4 + z²/4 = 1 ── */
export function EllipsoidBox3DWidget() {
  const [ux, setUx] = useState(0.577); // optimal 1/sqrt(3)
  const [uy, setUy] = useState(0.577);
  const a = 3, b = 2, c = 2;
  const sumSq = ux * ux + uy * uy;
  const safeUy = sumSq > 0.96 ? Math.sqrt(Math.max(0.04, 0.96 - ux * ux)) : uy;
  const uz = Math.sqrt(Math.max(0.01, 1 - ux * ux - safeUy * safeUy));
  const x = a * ux, y = b * safeUy, z = c * uz;
  const V = 8 * x * y * z;
  const Vmax = (8 * a * b * c) / (3 * Math.sqrt(3));
  const isOpt = Math.abs(V - Vmax) < 0.35;

  const yaw = 0.62, pitch = 0.45, cx = 170, cy = 125, sc = 36;
  const p = (px: number, py: number, pz: number) => proj3D(px, py, pz, yaw, pitch, cx, cy, sc);

  // Ellipsoid wire rings
  const ringXY = Array.from({ length: 49 }, (_, i) => {
    const t = (i / 48) * 2 * Math.PI;
    const q = p(a * Math.cos(t), b * Math.sin(t), 0);
    return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
  }).join(' ');
  const ringXZ = Array.from({ length: 49 }, (_, i) => {
    const t = (i / 48) * 2 * Math.PI;
    const q = p(a * Math.cos(t), 0, c * Math.sin(t));
    return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
  }).join(' ');

  // Box corners in 1st octant mirrored to [-x,x]x[-y,y]x[-z,z]
  const c000 = p(-x, -y, -z), c100 = p(x, -y, -z), c110 = p(x, y, -z), c010 = p(-x, y, -z);
  const c001 = p(-x, -y, z), c101 = p(x, -y, z), c111 = p(x, y, z), c011 = p(-x, y, z);
  const poly = (...pts: { sx: number; sy: number }[]) => pts.map((q) => `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">3D Lagrange: legnagyobb téglatest az x²/9 + y²/4 + z²/4 = 1 ellipszoidban</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 340 245" style={{ width: '100%', maxWidth: 340, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <polyline points={ringXY} fill="none" stroke="#64748b" strokeOpacity={0.55} strokeDasharray="3 3" />
          <polyline points={ringXZ} fill="none" stroke="#64748b" strokeOpacity={0.55} strokeDasharray="3 3" />
          <polygon points={poly(c000, c100, c110, c010)} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.2} />
          <polygon points={poly(c001, c101, c111, c011)} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={1.5} />
          <polygon points={poly(c100, c110, c111, c101)} fill="rgba(45,212,191,0.18)" stroke="#2dd4bf" strokeWidth={1.4} />
          <polygon points={poly(c010, c110, c111, c011)} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={1.4} />
          <circle cx={c111.sx} cy={c111.sy} r={4.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.3} />
          <text x={14} y={24} fill={isOpt ? '#34d399' : '#fbbf24'} fontSize={12.5} fontWeight={700}>
            V = 8xyz = {V.toFixed(2)} {isOpt ? '(MAXIMÁLIS!)' : `(max: ${Vmax.toFixed(2)})`}
          </text>
          <text x={14} y={42} fill="#cbd5e1" fontSize={11}>
            Sarokpont: ({x.toFixed(2)}, {y.toFixed(2)}, {z.toFixed(2)})
          </text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            x / a = <strong style={{ color: '#38bdf8' }}>{ux.toFixed(2)}</strong>
            <input type="range" min={0.15} max={0.92} step={0.01} value={ux} onChange={(e) => setUx(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <label>
            y / b = <strong style={{ color: '#2dd4bf' }}>{safeUy.toFixed(2)}</strong>
            <input type="range" min={0.15} max={0.92} step={0.01} value={safeUy} onChange={(e) => setUy(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <button
            onClick={() => { setUx(0.577); setUy(0.577); }}
            style={{ padding: '6px 10px', borderRadius: 8, background: 'rgba(52,211,153,0.16)', color: '#34d399', border: '1px solid #34d399', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
          >
            Optimum: x/a = y/b = z/c = 1/√3
          </button>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>
            A Lagrange-egyenletek szerint az optimumban x²/a² = y²/b² = z²/c² = 1/3!
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 4. TwoConstraints3DWidget: Plane x+y+z=1 ∩ Cylinder x²+y²=1 ── */
export function TwoConstraints3DWidget() {
  const [deg, setDeg] = useState(225);
  const rad = (deg * Math.PI) / 180;
  const px = Math.cos(rad);
  const py = Math.sin(rad);
  const pz = 1 - px - py;
  const distSq = px * px + py * py + pz * pz; // 1 + (1 - cos - sin)^2
  const dist = Math.sqrt(distSq);

  const yaw = 0.55, pitch = 0.42, cx = 175, cy = 145, sc = 48;
  const p = (x: number, y: number, z: number) => proj3D(x, y, z, yaw, pitch, cx, cy, sc);

  const cylBot = Array.from({ length: 49 }, (_, i) => {
    const t = (i / 48) * 2 * Math.PI;
    const q = p(Math.cos(t), Math.sin(t), -0.7);
    return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
  }).join(' ');
  const cylTop = Array.from({ length: 49 }, (_, i) => {
    const t = (i / 48) * 2 * Math.PI;
    const q = p(Math.cos(t), Math.sin(t), 2.1);
    return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
  }).join(' ');
  const ellCurve = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * 2 * Math.PI;
    const x = Math.cos(t), y = Math.sin(t), z = 1 - x - y;
    const q = p(x, y, z);
    return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
  }).join(' ');

  const orig = p(0, 0, 0);
  const cur = p(px, py, pz);

  return (
    <div className="widget">
      <div className="widget-title">Két mellékfeltétel: x + y + z = 1 sík és x² + y² = 1 henger metszésellipszise</div>
      <svg viewBox="0 0 360 250" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        <polyline points={cylBot} fill="none" stroke="#475569" strokeDasharray="3 3" />
        <polyline points={cylTop} fill="none" stroke="#475569" strokeDasharray="3 3" />
        <polyline points={ellCurve} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
        <line x1={orig.sx} y1={orig.sy} x2={cur.sx} y2={cur.sy} stroke="#fb923c" strokeWidth={2.3} />
        <circle cx={orig.sx} cy={orig.sy} r={4} fill="#94a3b8" />
        <circle cx={cur.sx} cy={cur.sy} r={6} fill="#34d399" stroke="#fff" strokeWidth={1.5} />
        <text x={orig.sx + 7} y={orig.sy + 4} fill="#94a3b8" fontSize={11}>O(0,0,0)</text>
        <text x={14} y={24} fill="#fbbf24" fontSize={12.5} fontWeight={700}>
          Távolság d = {dist.toFixed(3)} · d² = {distSq.toFixed(3)}
        </text>
        <text x={14} y={42} fill="#cbd5e1" fontSize={11}>
          P = ({px.toFixed(2)}, {py.toFixed(2)}, {pz.toFixed(2)})
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Pont az ellipszisen (θ = {deg}°):</span>
        <input type="range" min={0} max={360} value={deg} onChange={(e) => setDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
        <button onClick={() => setDeg(225)} style={{ padding: '4px 9px', borderRadius: 7, background: 'rgba(248,113,113,0.16)', color: '#f87171', border: '1px solid #f87171', fontSize: 11.5, cursor: 'pointer' }}>
          Legtávolabbi (θ = 225°, d ≈ 2,61)
        </button>
        <button onClick={() => setDeg(0)} style={{ padding: '4px 9px', borderRadius: 7, background: 'rgba(52,211,153,0.16)', color: '#34d399', border: '1px solid #34d399', fontSize: 11.5, cursor: 'pointer' }}>
          Legközelebbi (1, 0, 0) (d = 1)
        </button>
        <button onClick={() => setDeg(90)} style={{ padding: '4px 9px', borderRadius: 7, background: 'rgba(52,211,153,0.16)', color: '#34d399', border: '1px solid #34d399', fontSize: 11.5, cursor: 'pointer' }}>
          Legközelebbi (0, 1, 0) (d = 1)
        </button>
      </div>
    </div>
  );
}

/* ── 5. ShadowPriceWidget: Cobb-Douglas P(L,K)=sqrt(L*K) subject to 2L+4K=B ── */
export function ShadowPriceWidget() {
  const [B, setB] = useState(40);
  // Optimal: 2L = 4K = B/2 => L* = B/4, K* = B/8, P* = B / (4*sqrt(2)) ≈ 0.17678 * B
  // Shadow price λ = dP*/dB = 1 / (4*sqrt(2)) ≈ 0.1768
  const Lstar = B / 4;
  const Kstar = B / 8;
  const Pstar = Math.sqrt(Lstar * Kstar);
  const lambda = 1 / (4 * Math.SQRT2);

  const sx = (L: number) => 38 + (L / 30) * 230;
  const sy = (K: number) => 205 - (K / 18) * 175;

  // Isoquant L*K = Pstar^2
  const isoPts: string[] = [];
  for (let L = 1.5; L <= 29; L += 0.6) {
    const K = (Pstar * Pstar) / L;
    if (K <= 17.5) isoPts.push(`${sx(L).toFixed(1)},${sy(K).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Mi a λ? — Árnyékár (Cobb–Douglas: P = √(LK), korlát: 2L + 4K = B)</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 290 225" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={38} y1={205} x2={275} y2={205} stroke="#64748b" />
          <line x1={38} y1={20} x2={38} y2={205} stroke="#64748b" />
          <text x={255} y={219} fill="#94a3b8" fontSize={11}>L</text>
          <text x={22} y={30} fill="#94a3b8" fontSize={11}>K</text>
          {/* Budget line 2L + 4K = B */}
          <line x1={sx(0)} y1={sy(B / 4)} x2={sx(B / 2)} y2={sy(0)} stroke="#fbbf24" strokeWidth={2.2} />
          {/* Isoquant */}
          <polyline points={isoPts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.2} />
          <circle cx={sx(Lstar)} cy={sy(Kstar)} r={5.5} fill="#34d399" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(Lstar) + 8} y={sy(Kstar) - 6} fill="#34d399" fontSize={11} fontWeight={700}>
            ({Lstar.toFixed(1)}, {Kstar.toFixed(1)})
          </text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label>
            Költségvetés B = <strong style={{ color: '#fbbf24' }}>{B} egység</strong>
            <input type="range" min={16} max={56} step={2} value={B} onChange={(e) => setB(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #38bdf8' }}>
            <div>Optimális termelés: <strong style={{ color: '#34d399' }}>P*(B) = {Pstar.toFixed(2)}</strong></div>
            <div style={{ marginTop: 4 }}>Lagrange-multiplikátor: <strong style={{ color: '#fbbf24' }}>λ = dP*/dB ≈ {lambda.toFixed(4)}</strong></div>
            <div style={{ marginTop: 4, fontSize: 11.5, color: '#94a3b8' }}>
              Ha B-t +10 egységgel növeled, P* pontosan +{(10 * lambda).toFixed(2)} egységgel nő!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 6. InteriorVsBoundaryWidget: f(x,y) = x² + 2y² - x on x² + y² ≤ 1 ── */
export function InteriorVsBoundaryWidget() {
  const [mode, setMode] = useState<'both' | 'interior' | 'boundary'>('both');
  const cx = 145, cy = 120, r = 82;
  const mx = (x: number) => cx + x * r;
  const my = (y: number) => cy - y * r;

  return (
    <div className="widget">
      <div className="widget-title">14.7 + 14.8 együtt: f(x, y) = x² + 2y² − x az x² + y² ≤ 1 körlapon</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {[
          { k: 'both', l: 'Mindkettő együtt', c: '#38bdf8' },
          { k: 'interior', l: '1. Belső (∇f = 0)', c: '#34d399' },
          { k: 'boundary', l: '2. Határ (∇f = λ∇g)', c: '#fbbf24' },
        ].map((b) => (
          <button
            key={b.k}
            onClick={() => setMode(b.k as 'both' | 'interior' | 'boundary')}
            style={{
              padding: '5px 10px',
              borderRadius: 8,
              border: `1px solid ${mode === b.k ? b.c : '#334155'}`,
              background: mode === b.k ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.55)',
              color: mode === b.k ? b.c : '#cbd5e1',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {b.l}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 290 240" style={{ width: '100%', maxWidth: 290, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <circle cx={cx} cy={cy} r={r} fill={mode === 'interior' ? 'rgba(52,211,153,0.16)' : 'rgba(56,189,248,0.1)'} stroke={mode === 'boundary' ? '#fbbf24' : '#64748b'} strokeWidth={mode === 'boundary' ? 3 : 1.6} />
          <line x1={30} y1={cy} x2={260} y2={cy} stroke="#475569" strokeDasharray="3 3" />
          <line x1={cx} y1={20} x2={cx} y2={220} stroke="#475569" strokeDasharray="3 3" />
          {/* Interior critical point (0.5, 0) */}
          {(mode === 'both' || mode === 'interior') && (
            <g>
              <circle cx={mx(0.5)} cy={my(0)} r={6} fill="#34d399" stroke="#fff" strokeWidth={1.5} />
              <text x={mx(0.5) - 24} y={my(0) + 18} fill="#34d399" fontSize={11} fontWeight={700}>(½, 0): −¼</text>
            </g>
          )}
          {/* Boundary Lagrange points */}
          {(mode === 'both' || mode === 'boundary') && (
            <g>
              <circle cx={mx(-0.5)} cy={my(Math.sqrt(3) / 2)} r={6} fill="#f87171" stroke="#fff" strokeWidth={1.5} />
              <circle cx={mx(-0.5)} cy={my(-Math.sqrt(3) / 2)} r={6} fill="#f87171" stroke="#fff" strokeWidth={1.5} />
              <circle cx={mx(1)} cy={my(0)} r={4.5} fill="#fbbf24" />
              <circle cx={mx(-1)} cy={my(0)} r={4.5} fill="#fbbf24" />
              <text x={mx(-0.5) - 62} y={my(Math.sqrt(3) / 2) - 8} fill="#f87171" fontSize={10.5} fontWeight={700}>(−½, √3/2): 9/4</text>
              <text x={mx(-0.5) - 64} y={my(-Math.sqrt(3) / 2) + 16} fill="#f87171" fontSize={10.5} fontWeight={700}>(−½, −√3/2): 9/4</text>
            </g>
          )}
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.6 }}>
          <div><strong style={{ color: '#34d399' }}>Belső (14.7):</strong> <br />2x − 1 = 0, 4y = 0 ⇒ (½, 0), <strong>f = −¼ (Absz. MIN)</strong></div>
          <div style={{ marginTop: 8 }}><strong style={{ color: '#f87171' }}>Határ (14.8):</strong> <br />(−½, ±√3/2)-ben <strong>f = 9/4 = 2,25 (Absz. MAX)</strong>, míg (−1, 0): 2 és (1, 0): 0.</div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. CuspFailureWidget: f(x,y) = x on y² - x³ = 0 where ∇g(0,0) = 0 ── */
export function CuspFailureWidget() {
  const [xVal, setXVal] = useState(0);
  const yVal = Math.pow(xVal, 1.5);
  const mx = (x: number) => 65 + x * 135;
  const my = (y: number) => 115 - y * 55;

  const upper: string[] = [];
  const lower: string[] = [];
  for (let x = 0; x <= 1.55; x += 0.03) {
    const y = Math.pow(x, 1.5);
    upper.push(`${mx(x).toFixed(1)},${my(y).toFixed(1)}`);
    lower.push(`${mx(x).toFixed(1)},${my(-y).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Mikor vall kudarcot Lagrange? — g(x, y) = y² − x³ = 0 csúcspontja</div>
      <svg viewBox="0 0 320 225" style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        <line x1={20} y1={115} x2={300} y2={115} stroke="#475569" strokeDasharray="3 3" />
        <line x1={65} y1={15} x2={65} y2={215} stroke="#475569" strokeDasharray="3 3" />
        {/* Vertical level line f(x,y) = x = xVal */}
        <line x1={mx(xVal)} y1={18} x2={mx(xVal)} y2={212} stroke="#38bdf8" strokeWidth={2} strokeDasharray="5 3" />
        {/* Cusp curve */}
        <polyline points={upper.join(' ')} fill="none" stroke="#fbbf24" strokeWidth={2.4} />
        <polyline points={lower.join(' ')} fill="none" stroke="#fbbf24" strokeWidth={2.4} />
        {/* Point */}
        <circle cx={mx(xVal)} cy={my(yVal)} r={5.5} fill={xVal === 0 ? '#f87171' : '#34d399'} stroke="#fff" strokeWidth={1.5} />
        <text x={14} y={24} fill="#38bdf8" fontSize={11.5} fontWeight={700}>f(x, y) = x = {xVal.toFixed(2)}</text>
        <text x={14} y={42} fill="#f87171" fontSize={11}>
          ∇g = (−3x², 2y) = ({(-3 * xVal * xVal).toFixed(2)}, {(2 * yVal).toFixed(2)})
        </text>
        {xVal === 0 && (
          <text x={74} y={102} fill="#f87171" fontSize={11.5} fontWeight={700}>
            (0,0): Absz. MIN, de ∇g = (0,0)!
          </text>
        )}
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>x = {xVal.toFixed(2)}:</span>
        <input type="range" min={0} max={1.4} step={0.05} value={xVal} onChange={(e) => setXVal(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 12, color: '#94a3b8' }}>
        Az origóban ∇f = (1, 0), míg λ·∇g(0, 0) = (0, 0) — nincs megoldás λ-ra! Ezért mindig ellenőrizd a ∇g = 0 szinguláris pontokat is.
      </p>
    </div>
  );
}

/* ── 8. LagrangeMasterSummaryDiagram: Visual cheat-sheet ── */
export function LagrangeMasterSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">14.8 Mester-térkép: Lagrange-multiplikátorok egyetlen ábrán</div>
      <svg viewBox="0 0 520 225" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        <rect x={14} y={14} width={238} height={92} rx={10} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.4} />
        <text x={133} y={35} textAnchor="middle" fill="#38bdf8" fontSize={12.5} fontWeight={700}>1 mellékfeltétel (2D / 3D)</text>
        <text x={133} y={56} textAnchor="middle" fill="#f8fafc" fontSize={12}>∇f = λ ∇g   és   g = c</text>
        <text x={133} y={76} textAnchor="middle" fill="#cbd5e1" fontSize={11}>Szintvonal / szintfelület érintkezése</text>
        <text x={133} y={94} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>(feltéve, hogy ∇g ≠ 0)</text>

        <rect x={268} y={14} width={238} height={92} rx={10} fill="rgba(45,212,191,0.14)" stroke="#2dd4bf" strokeWidth={1.4} />
        <text x={387} y={35} textAnchor="middle" fill="#2dd4bf" fontSize={12.5} fontWeight={700}>2 mellékfeltétel (3D görbe)</text>
        <text x={387} y={56} textAnchor="middle" fill="#f8fafc" fontSize={12}>∇f = λ ∇g₁ + μ ∇g₂</text>
        <text x={387} y={76} textAnchor="middle" fill="#cbd5e1" fontSize={11}>g₁ = c₁   és   g₂ = c₂</text>
        <text x={387} y={94} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>(feltéve, hogy ∇g₁ × ∇g₂ ≠ 0)</text>

        <rect x={14} y={122} width={238} height={88} rx={10} fill="rgba(251,191,36,0.14)" stroke="#fbbf24" strokeWidth={1.4} />
        <text x={133} y={144} textAnchor="middle" fill="#fbbf24" fontSize={12.5} fontWeight={700}>λ jelentése (Árnyékár)</text>
        <text x={133} y={166} textAnchor="middle" fill="#f8fafc" fontSize={12}>df* / dc = λ</text>
        <text x={133} y={188} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>Mennyit nő az optimum, ha c +1-gyel nő?</text>

        <rect x={268} y={122} width={238} height={88} rx={10} fill="rgba(248,113,113,0.14)" stroke="#f87171" strokeWidth={1.4} />
        <text x={387} y={144} textAnchor="middle" fill="#f87171" fontSize={12.5} fontWeight={700}>Ne feledd ellenőrizni!</text>
        <text x={387} y={166} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>1. Szinguláris pontok (∇g = 0)</text>
        <text x={387} y={188} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>2. Végpontok / Esetszétválasztás (x=0!)</text>
      </svg>
    </div>
  );
}
