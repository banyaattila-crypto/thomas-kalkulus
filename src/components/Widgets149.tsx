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

/* ── 1. ConstrainedSlice3DWidget: z = x² + y² surface at (1,1,2), y fixed vs z fixed ── */
export function ConstrainedSlice3DWidget() {
  const [hold, setHold] = useState<'y' | 'z'>('y');
  const [yawDeg, setYawDeg] = useState(34);
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = 0.46;
  const cx = 185, cy = 175, sc = 48;
  const p = (x: number, y: number, z: number) => proj3D(x, y, z, yaw, pitch, cx, cy, sc);

  // Paraboloid rings z = x^2 + y^2 for z = 0.5, 1, 2, 3
  const rings = [0.5, 1, 2, 3].map((zv) => {
    const r = Math.sqrt(zv);
    const pts = Array.from({ length: 49 }, (_, i) => {
      const t = (i / 48) * 2 * Math.PI;
      const q = p(r * Math.cos(t), r * Math.sin(t), zv);
      return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
    }).join(' ');
    return (
      <polyline
        key={zv}
        points={pts}
        fill="none"
        stroke={hold === 'z' && zv === 2 ? '#fbbf24' : '#475569'}
        strokeWidth={hold === 'z' && zv === 2 ? 2.8 : 1}
        strokeOpacity={hold === 'z' && zv === 2 ? 1 : 0.6}
      />
    );
  });

  // Vertical slice y = 1: z = x^2 + 1
  const sliceY = Array.from({ length: 41 }, (_, i) => {
    const x = -1.4 + (i / 40) * 2.8;
    const q = p(x, 1, x * x + 1);
    return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`;
  }).join(' ');

  const p0 = p(1, 1, 2);
  // Tangent vector at (1,1,2): if y=1 fixed => (1, 0, 2); if z=2 fixed => (1, -1, 0)
  const dir = hold === 'y' ? { dx: 0.45, dy: 0, dz: 0.9 } : { dx: 0.55, dy: -0.55, dz: 0 };
  const pEnd = p(1 + dir.dx, 1 + dir.dy, 2 + dir.dz);

  return (
    <div className="widget">
      <div className="widget-title">Ugyanaz a P₀(1, 1, 2) pont, két teljesen más út a z = x² + y² felületen!</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <button onClick={() => setHold('y')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${hold === 'y' ? '#38bdf8' : '#334155'}`, background: hold === 'y' ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: '#38bdf8', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          y = 1 rögzítve → (∂w/∂x)_y = 10
        </button>
        <button onClick={() => setHold('z')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${hold === 'z' ? '#fbbf24' : '#334155'}`, background: hold === 'z' ? 'rgba(251,191,36,0.16)' : 'rgba(15,23,42,0.55)', color: '#fbbf24', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          z = 2 rögzítve → (∂w/∂x)_z = 0
        </button>
      </div>
      <svg viewBox="0 0 380 235" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {rings}
        <polyline points={sliceY} fill="none" stroke={hold === 'y' ? '#38bdf8' : '#64748b'} strokeWidth={hold === 'y' ? 2.8 : 1.1} strokeDasharray={hold === 'y' ? undefined : '3 3'} />
        <line x1={p0.sx} y1={p0.sy} x2={pEnd.sx} y2={pEnd.sy} stroke="#34d399" strokeWidth={2.8} />
        <circle cx={p0.sx} cy={p0.sy} r={5.5} fill="#f87171" stroke="#fff" strokeWidth={1.5} />
        <text x={p0.sx + 8} y={p0.sy - 6} fill="#f8fafc" fontSize={11.5} fontWeight={700}>P₀(1, 1, 2)</text>
        <text x={14} y={24} fill="#cbd5e1" fontSize={12} fontWeight={700}>w = x² + y² + z², feltétel: z = x² + y²</text>
        <text x={14} y={42} fill={hold === 'y' ? '#38bdf8' : '#fbbf24'} fontSize={11.5}>
          {hold === 'y' ? 'y rögzítve: z is nő x-szel → w = z + z² meredeken emelkedik!' : 'z = 2 rögzítve: körön mozgunk → w = 2 + 2² = 6 ÁLLANDÓ!'}
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Forgatás ({yawDeg}°):</span>
        <input type="range" min={-120} max={120} value={yawDeg} onChange={(e) => setYawDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 2. IndependentDependentSwitchWidget: Switchboard for w = x²+y²+z², x+y+z=1 ── */
type PairChoice = 'xy' | 'xz' | 'yz';
const PAIRS: Record<PairChoice, {
  label: string;
  dep: string;
  expr: string;
  derivs: string;
  atPt: string;
  color: string;
}> = {
  xy: {
    label: 'Független: (x, y) · Függő: z',
    dep: 'z = 1 − x − y',
    expr: 'w(x, y) = x² + y² + (1 − x − y)²',
    derivs: '(∂w/∂x)_y = 2x − 2(1 − x − y) = 4x + 2y − 2\n(∂w/∂y)_x = 2y − 2(1 − x − y) = 2x + 4y − 2',
    atPt: 'A (1, 1, −1) pontban: (∂w/∂x)_y = 4, (∂w/∂y)_x = 4',
    color: '#38bdf8',
  },
  xz: {
    label: 'Független: (x, z) · Függő: y',
    dep: 'y = 1 − x − z',
    expr: 'w(x, z) = x² + (1 − x − z)² + z²',
    derivs: '(∂w/∂x)_z = 2x − 2(1 − x − z) = 4x + 2z − 2\n(∂w/∂z)_x = 2z − 2(1 − x − z) = 2x + 4z − 2',
    atPt: 'A (1, 1, −1) pontban: (∂w/∂x)_z = 0, (∂w/∂z)_x = −4',
    color: '#34d399',
  },
  yz: {
    label: 'Független: (y, z) · Függő: x',
    dep: 'x = 1 − y − z',
    expr: 'w(y, z) = (1 − y − z)² + y² + z²',
    derivs: '(∂w/∂y)_z = 2y − 2(1 − y − z) = 4y + 2z − 2\n(∂w/∂z)_y = 2z − 2(1 − y − z) = 2y + 4z − 2',
    atPt: 'A (1, 1, −1) pontban: (∂w/∂y)_z = 0, (∂w/∂z)_y = −4',
    color: '#fbbf24',
  },
};

export function IndependentDependentSwitchWidget() {
  const [pair, setPair] = useState<PairChoice>('xy');
  const cur = PAIRS[pair];
  return (
    <div className="widget">
      <div className="widget-title">Kapcsolótábla: w = x² + y² + z² az x + y + z = 1 síkon, a (1, 1, −1) pontban</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {(Object.keys(PAIRS) as PairChoice[]).map((k) => (
          <button
            key={k}
            onClick={() => setPair(k)}
            style={{
              padding: '5px 10px',
              borderRadius: 8,
              border: `1px solid ${pair === k ? PAIRS[k].color : '#334155'}`,
              background: pair === k ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.55)',
              color: pair === k ? PAIRS[k].color : '#cbd5e1',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {PAIRS[k].label}
          </button>
        ))}
      </div>
      <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.65)', border: `1px solid ${cur.color}`, fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.7 }}>
        <div><strong>1. Függő változó kifejezése:</strong> <span style={{ color: cur.color }}>{cur.dep}</span></div>
        <div><strong>2. Behelyettesítés:</strong> {cur.expr}</div>
        <div style={{ whiteSpace: 'pre-line', marginTop: 4 }}><strong>3. Parciális deriváltak:</strong><br />{cur.derivs}</div>
        <div style={{ marginTop: 6, color: cur.color, fontWeight: 700 }}>{cur.atPt}</div>
      </div>
    </div>
  );
}

/* ── 3. DifferentialEliminationWidget: Interactive differential machine ── */
export function DifferentialEliminationWidget() {
  const [fixedVar, setFixedVar] = useState<'y' | 'z'>('y');
  return (
    <div className="widget">
      <div className="widget-title">Totális differenciál-gépezet: w = x² − y² + z², feltétel: z³ − xy + yz = 1 a (1, 1, 1) pontban</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <button onClick={() => setFixedVar('y')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${fixedVar === 'y' ? '#38bdf8' : '#334155'}`, background: fixedVar === 'y' ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: '#38bdf8', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Keressük (∂w/∂x)_y-t (dy = 0)
        </button>
        <button onClick={() => setFixedVar('z')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${fixedVar === 'z' ? '#34d399' : '#334155'}`, background: fixedVar === 'z' ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: '#34d399', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Keressük (∂w/∂x)_z-t (dz = 0)
        </button>
      </div>
      <svg viewBox="0 0 500 185" style={{ width: '100%', maxWidth: 520, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        <rect x={16} y={14} width={468} height={44} rx={8} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.2} />
        <text x={28} y={32} fill="#e2e8f0" fontSize={12}>dw = 2x dx − 2y dy + 2z dz   ⇒   (1,1,1)-ben:  dw = 2 dx − 2 dy + 2 dz</text>
        <text x={28} y={50} fill="#fbbf24" fontSize={12}>dg = −y dx + (z − x) dy + (3z² + y) dz = 0   ⇒   −dx + 0·dy + 4 dz = 0</text>

        <rect x={16} y={70} width={468} height={46} rx={8} fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth={1.2} />
        {fixedVar === 'y' ? (
          <>
            <text x={28} y={89} fill="#38bdf8" fontSize={12} fontWeight={700}>Ha y rögzített (dy = 0): a feltételből −dx + 4 dz = 0 ⇒ dz = ¼ dx</text>
            <text x={28} y={107} fill="#e2e8f0" fontSize={12}>Beírva dw-be: dw = 2 dx − 0 + 2(¼ dx) = 2,5 dx</text>
          </>
        ) : (
          <>
            <text x={28} y={89} fill="#34d399" fontSize={12} fontWeight={700}>Ha z rögzített (dz = 0): a feltételből −dx + 0·dy = 0 ⇒ dx = 0!</text>
            <text x={28} y={107} fill="#f87171" fontSize={12}>Mivel g_y(1,1,1) = z − x = 0, itt x nem változhat szabadon z = 1 mellett!</text>
          </>
        )}

        <rect x={16} y={128} width={468} height={42} rx={8} fill={fixedVar === 'y' ? 'rgba(52,211,153,0.16)' : 'rgba(248,113,113,0.16)'} stroke={fixedVar === 'y' ? '#34d399' : '#f87171'} strokeWidth={1.4} />
        <text x={250} y={154} textAnchor="middle" fill={fixedVar === 'y' ? '#34d399' : '#f87171'} fontSize={13.5} fontWeight={700}>
          {fixedVar === 'y' ? 'Eredmény: (∂w/∂x)_y (1, 1, 1) = 5/2 = 2,5' : 'Figyelmeztetés: (∂w/∂x)_z nem létezik (1,1,1)-ben, mert g_y = 0!'}
        </text>
      </svg>
    </div>
  );
}

/* ── 4. TwoConstraintsSystemWidget: Degrees of freedom calculator ── */
export function TwoConstraintsSystemWidget() {
  const [nVars, setNVars] = useState(4);
  const [nCons, setNCons] = useState(2);
  const safeCons = Math.min(nCons, nVars - 1);
  const dof = nVars - safeCons;

  return (
    <div className="widget">
      <div className="widget-title">Szabadsági fokok száma: hány változót választhatunk függetlennek?</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label>
            Összes változó száma n = <strong style={{ color: '#38bdf8' }}>{nVars}</strong>
            <input type="range" min={2} max={6} value={nVars} onChange={(e) => setNVars(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <label>
            Független mellékfeltételek száma m = <strong style={{ color: '#fbbf24' }}>{safeCons}</strong>
            <input type="range" min={1} max={nVars - 1} value={safeCons} onChange={(e) => setNCons(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399', fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 }}>
          <div>Szabadsági fok: <strong style={{ color: '#34d399', fontSize: 16 }}>k = n − m = {dof}</strong></div>
          <div style={{ marginTop: 4, fontSize: 12, color: '#cbd5e1' }}>
            • <strong>{dof} független változó</strong> (ebből 1 szerint deriválunk, <strong>{dof - 1}</strong> darabot rögzítünk alsó indexben!)<br />
            • <strong>{safeCons} függő változó</strong> (ezek differenciálját küszöböljük ki a {safeCons} feltételből).
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 5. PolarParadoxWidget: Why (∂x/∂r)_θ = cos θ AND (∂r/∂x)_y = cos θ! ── */
export function PolarParadoxWidget() {
  const [deg, setDeg] = useState(35);
  const rad = (deg * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const ox = 45, oy = 185, R = 120;
  const px = ox + R * c, py = oy - R * s;

  // Step 1: θ fixed (radial step dr = 42)
  const pRad = { x: ox + (R + 42) * c, y: oy - (R + 42) * s };
  // Step 2: y fixed (horizontal step dx = 42)
  const pHor = { x: px + 42, y: py };

  return (
    <div className="widget">
      <div className="widget-title">A polár-paradoxon: miért (∂x/∂r)_θ = cos θ ÉS (∂r/∂x)_y = cos θ?</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 280 215" style={{ width: '100%', maxWidth: 290, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={25} y1={oy} x2={265} y2={oy} stroke="#64748b" />
          <line x1={ox} y1={20} x2={ox} y2={200} stroke="#64748b" />
          <line x1={ox} y1={oy} x2={px} y2={py} stroke="#94a3b8" strokeWidth={1.8} />
          {/* Radial step (θ fixed) */}
          <line x1={px} y1={py} x2={pRad.x} y2={pRad.y} stroke="#38bdf8" strokeWidth={2.6} />
          <line x1={px} y1={py} x2={pRad.x} y2={py} stroke="#38bdf8" strokeDasharray="3 2" strokeWidth={1.5} />
          <line x1={pRad.x} y1={py} x2={pRad.x} y2={pRad.y} stroke="#38bdf8" strokeDasharray="3 2" strokeWidth={1.2} />
          {/* Horizontal step (y fixed) */}
          <line x1={px} y1={py} x2={pHor.x} y2={pHor.y} stroke="#fbbf24" strokeWidth={2.6} />
          <circle cx={px} cy={py} r={5} fill="#34d399" stroke="#fff" strokeWidth={1.4} />
          <text x={14} y={24} fill="#38bdf8" fontSize={11} fontWeight={700}>Cián (θ fix): dx = cos θ · dr</text>
          <text x={14} y={40} fill="#fbbf24" fontSize={11} fontWeight={700}>Sárga (y fix): dr = cos θ · dx</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            Szög θ = <strong style={{ color: '#34d399' }}>{deg}°</strong>
            <input type="range" min={15} max={75} value={deg} onChange={(e) => setDeg(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #38bdf8', lineHeight: 1.6 }}>
            <div>(∂x/∂r)_θ = cos {deg}° = <strong style={{ color: '#38bdf8' }}>{c.toFixed(3)}</strong></div>
            <div>(∂r/∂x)_y = cos {deg}° = <strong style={{ color: '#fbbf24' }}>{c.toFixed(3)}</strong></div>
            <div>(∂r/∂x)_θ = 1/cos {deg}° = <strong style={{ color: '#34d399' }}>{(1 / c).toFixed(3)}</strong></div>
          </div>
          <div style={{ fontSize: 11.5, color: '#94a3b8' }}>
            A két háromszögben felcserélődik az átfogó és a befogó! Reciprok csak azonos rögzített változó esetén teljesül.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 6. CyclicRuleThermodynamicsWidget: Ideal gas PV = nRT cyclic product = -1 ── */
export function CyclicRuleThermodynamicsWidget() {
  const [V, setV] = useState(2.0);
  const [T, setT] = useState(300);
  const nR = 1.0; // normalized units
  const P = (nR * T) / V;
  const dPdV_T = -(nR * T) / (V * V); // -P/V
  const dVdT_P = nR / P;              // V/T
  const dTdP_V = V / nR;              // T/P
  const prod = dPdV_T * dVdT_P * dTdP_V;

  return (
    <div className="widget">
      <div className="widget-title">A ciklikus szabály élőben: ideális gáz (PV = nRT, nR = 1)</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label>
            Térfogat V = <strong style={{ color: '#38bdf8' }}>{V.toFixed(1)}</strong>
            <input type="range" min={0.8} max={5.0} step={0.1} value={V} onChange={(e) => setV(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <label>
            Hőmérséklet T = <strong style={{ color: '#fb923c' }}>{T} K</strong>
            <input type="range" min={150} max={600} step={10} value={T} onChange={(e) => setT(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div>Nyomás P = nRT / V = <strong style={{ color: '#fbbf24' }}>{P.toFixed(1)}</strong></div>
        </div>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #2dd4bf', fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.7 }}>
          <div>(∂P/∂V)_T = −T/V² = <strong style={{ color: '#f87171' }}>{dPdV_T.toFixed(2)}</strong></div>
          <div>(∂V/∂T)_P = 1/P = <strong style={{ color: '#38bdf8' }}>{dVdT_P.toFixed(4)}</strong></div>
          <div>(∂T/∂P)_V = V = <strong style={{ color: '#34d399' }}>{dTdP_V.toFixed(2)}</strong></div>
          <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid #334155', fontWeight: 700, color: '#fbbf24' }}>
            Szorzatuk = {prod.toFixed(6)} = −1 !
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. IsochoricVsIsobaricWidget: Constant V vs Constant P heating ── */
export function IsochoricVsIsobaricWidget() {
  const [proc, setProc] = useState<'V' | 'P'>('V');
  const [heat, setHeat] = useState(50); // 0..100
  const pistonY = proc === 'V' ? 80 : 80 - heat * 0.42;
  const tempColor = heat > 65 ? '#f87171' : heat > 30 ? '#fb923c' : '#38bdf8';

  return (
    <div className="widget">
      <div className="widget-title">Termodinamika: állandó térfogat (C_V) vs. állandó nyomás (C_P)</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <button onClick={() => setProc('V')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${proc === 'V' ? '#38bdf8' : '#334155'}`, background: proc === 'V' ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: '#38bdf8', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Izochor (V rögzítve: rögzített dugattyú)
        </button>
        <button onClick={() => setProc('P')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${proc === 'P' ? '#fb923c' : '#334155'}`, background: proc === 'P' ? 'rgba(251,146,60,0.16)' : 'rgba(15,23,42,0.55)', color: '#fb923c', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Izobár (P rögzítve: mozgó dugattyú)
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 240 190" style={{ width: '100%', maxWidth: 250, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          {/* Gas chamber */}
          <rect x={60} y={pistonY + 12} width={120} height={158 - (pistonY + 12)} fill={tempColor} fillOpacity={0.22} />
          {/* Cylinder walls */}
          <polyline points="60,25 60,170 180,170 180,25" fill="none" stroke="#94a3b8" strokeWidth={3} />
          {/* Piston */}
          <rect x={62} y={pistonY} width={116} height={12} fill={proc === 'V' ? '#64748b' : '#fbbf24'} stroke="#e2e8f0" strokeWidth={1.2} />
          {proc === 'V' && (
            <>
              <circle cx={56} cy={pistonY + 6} r={3.5} fill="#f87171" />
              <circle cx={184} cy={pistonY + 6} r={3.5} fill="#f87171" />
            </>
          )}
          <text x={120} y={145} textAnchor="middle" fill="#f8fafc" fontSize={12} fontWeight={700}>
            T = {300 + heat * 2} K
          </text>
          <text x={120} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>
            {proc === 'V' ? 'Minden hő belső energiára megy (dW = 0)' : 'Tágulási munkát is végez ⇒ C_P = C_V + nR'}
          </text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            Melegítés (ΔT = +{heat * 2} K):
            <input type="range" min={0} max={100} value={heat} onChange={(e) => setHeat(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #334155', lineHeight: 1.6 }}>
            <div><strong>C_V = (∂U/∂T)_V</strong> — csak a gáz melegedése</div>
            <div><strong>C_P = (∂H/∂T)_P = C_V + nR</strong> — melegedés + tágulási munka!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 8. ConstrainedDiffSummaryDiagram: Master cheat-sheet ── */
export function ConstrainedDiffSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">14.9 Mester-térkép: Feltételes parciális deriváltak</div>
      <svg viewBox="0 0 520 220" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        <rect x={14} y={14} width={238} height={90} rx={10} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.4} />
        <text x={133} y={35} textAnchor="middle" fill="#38bdf8" fontSize={12.5} fontWeight={700}>1. Jelölés és jelentés</text>
        <text x={133} y={56} textAnchor="middle" fill="#f8fafc" fontSize={12}>(∂w / ∂x)_y</text>
        <text x={133} y={76} textAnchor="middle" fill="#cbd5e1" fontSize={11}>x, y független (y fix), z függő!</text>
        <text x={133} y={93} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>(∂w/∂x)_y ≠ (∂w/∂x)_z !</text>

        <rect x={268} y={14} width={238} height={90} rx={10} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.4} />
        <text x={387} y={35} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>2. Differenciálos módszer</text>
        <text x={387} y={56} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>Írd fel dw-t és dg = 0-t!</text>
        <text x={387} y={76} textAnchor="middle" fill="#cbd5e1" fontSize={11}>Rögzített változó: dy = 0</text>
        <text x={387} y={93} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>Függő dz kiküszöbölése → dw/dx</text>

        <rect x={14} y={118} width={238} height={88} rx={10} fill="rgba(251,191,36,0.14)" stroke="#fbbf24" strokeWidth={1.4} />
        <text x={133} y={140} textAnchor="middle" fill="#fbbf24" fontSize={12.5} fontWeight={700}>3. Reciprok-szabály</text>
        <text x={133} y={162} textAnchor="middle" fill="#f8fafc" fontSize={12}>(∂x/∂y)_z = 1 / (∂y/∂x)_z</text>
        <text x={133} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>CSAK azonos rögzített változóval!</text>

        <rect x={268} y={118} width={238} height={88} rx={10} fill="rgba(248,113,113,0.14)" stroke="#f87171" strokeWidth={1.4} />
        <text x={387} y={140} textAnchor="middle" fill="#f87171" fontSize={12.5} fontWeight={700}>4. Ciklikus szabály</text>
        <text x={387} y={162} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>(∂x/∂y)_z · (∂y/∂z)_x · (∂z/∂x)_y = −1</text>
        <text x={387} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>Figyelj a MÍNUSZ előjelre!</text>
      </svg>
    </div>
  );
}
