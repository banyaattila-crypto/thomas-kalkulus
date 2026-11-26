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

/* ── 1. DensityCube3DWidget: [0,2]³ cube with 3 density profiles ── */
type Dens3D = 'const' | 'vertical' | 'diag';
const DENS3D: Record<Dens3D, { label: string; formula: string; M: number; cm: [number, number, number]; note: string }> = {
  const: { label: 'Homogén (δ = 1)', formula: 'δ(x,y,z) = 1', M: 8, cm: [1, 1, 1], note: 'A tömegközéppont pontosan a kocka geometriai közepe: (1, 1, 1).' },
  vertical: { label: 'Felfelé sűrűsödik (δ = 1 + z)', formula: 'δ(x,y,z) = 1 + z', M: 16, cm: [1, 1, 7 / 6], note: 'Csak z-től függ ⇒ x̄ = ȳ = 1 marad, de z̄ megemelkedik 7/6 ≈ 1,17-re!' },
  diag: { label: 'Átlósan sűrűsödik (δ = x + y + z)', formula: 'δ(x,y,z) = x + y + z', M: 24, cm: [10 / 9, 10 / 9, 10 / 9], note: 'Szimmetrikus x, y, z-ben ⇒ a súlypont a testátlón csúszik (10/9, 10/9, 10/9)-be!' },
};

export function DensityCube3DWidget() {
  const [mode, setMode] = useState<Dens3D>('vertical');
  const [yawDeg, setYawDeg] = useState(34);
  const d = DENS3D[mode];
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = 0.45;
  const cx = 175, cy = 125, sc = 50;
  const p = (x: number, y: number, z: number) => proj3D(x - 1, y - 1, z - 1, yaw, pitch, cx, cy, sc);
  const poly = (...pts: { sx: number; sy: number }[]) => pts.map((q) => `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`).join(' ');

  const c000 = p(0, 0, 0), c100 = p(2, 0, 0), c110 = p(2, 2, 0), c010 = p(0, 2, 0);
  const c001 = p(0, 0, 2), c101 = p(2, 0, 2), c111 = p(2, 2, 2), c011 = p(0, 2, 2);
  const geo = p(1, 1, 1);
  const cm = p(d.cm[0], d.cm[1], d.cm[2]);

  return (
    <div className="widget">
      <div className="widget-title">3D változó sűrűségű kocka [0, 2]³: tömeg és súlypont-eltolódás</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {(Object.keys(DENS3D) as Dens3D[]).map((k) => (
          <button key={k} onClick={() => setMode(k)} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${mode === k ? '#38bdf8' : '#334155'}`, background: mode === k ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: mode === k ? '#38bdf8' : '#cbd5e1', fontWeight: 700, fontSize: 11.5, cursor: 'pointer' }}>
            {DENS3D[k].label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 340 225" style={{ width: '100%', maxWidth: 340, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <polygon points={poly(c000, c100, c110, c010)} fill="rgba(56,189,248,0.1)" stroke="#475569" strokeWidth={1.2} />
          <polygon points={poly(c001, c101, c111, c011)} fill={mode === 'vertical' ? 'rgba(251,146,60,0.22)' : 'rgba(56,189,248,0.16)'} stroke="#38bdf8" strokeWidth={1.5} />
          <line x1={c000.sx} y1={c000.sy} x2={c001.sx} y2={c001.sy} stroke="#475569" />
          <line x1={c100.sx} y1={c100.sy} x2={c101.sx} y2={c101.sy} stroke="#64748b" />
          <line x1={c110.sx} y1={c110.sy} x2={c111.sx} y2={c111.sy} stroke="#64748b" />
          <line x1={c010.sx} y1={c010.sy} x2={c011.sx} y2={c011.sy} stroke="#64748b" />
          <circle cx={geo.sx} cy={geo.sy} r={4} fill="#94a3b8" />
          <line x1={geo.sx} y1={geo.sy} x2={cm.sx} y2={cm.sy} stroke="#fbbf24" strokeDasharray="3 2" strokeWidth={1.5} />
          <circle cx={cm.sx} cy={cm.sy} r={6.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
          <text x={cm.sx + 9} y={cm.sy - 4} fill="#fbbf24" fontSize={11.5} fontWeight={700}>CM</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #38bdf8', lineHeight: 1.65 }}>
            <div><strong>Sűrűség:</strong> <span style={{ color: '#38bdf8' }}>{d.formula}</span></div>
            <div><strong>Össztömeg:</strong> M = <strong style={{ color: '#34d399' }}>{d.M}</strong></div>
            <div><strong>CM:</strong> <strong style={{ color: '#fbbf24' }}>({d.cm[0].toFixed(2)}, {d.cm[1].toFixed(2)}, {d.cm[2].toFixed(2)})</strong></div>
          </div>
          <label>Forgatás ({yawDeg}°):<input type="range" min={-140} max={140} value={yawDeg} onChange={(e) => setYawDeg(Number(e.target.value))} style={{ width: '100%' }} /></label>
          <div style={{ fontSize: 11.5, color: '#94a3b8' }}>{d.note}</div>
        </div>
      </div>
    </div>
  );
}

/* ── 2. MissingLetterPlanesWidget: M_yz (x), M_xz (y), M_xy (z) visual mnemonic ── */
export function MissingLetterPlanesWidget() {
  const [plane, setPlane] = useState<'yz' | 'xz' | 'xy'>('yz');
  const yaw = 0.56, pitch = 0.44, cx = 155, cy = 145, sc = 56;
  const p = (x: number, y: number, z: number) => proj3D(x, y, z, yaw, pitch, cx, cy, sc);
  const poly = (...pts: { sx: number; sy: number }[]) => pts.map((q) => `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`).join(' ');

  const o = p(0, 0, 0), px = p(1.8, 0, 0), py = p(0, 1.8, 0), pz = p(0, 0, 1.8);
  const pt = p(1.2, 1.1, 1.2);
  const foot = plane === 'yz' ? p(0, 1.1, 1.2) : plane === 'xz' ? p(1.2, 0, 1.2) : p(1.2, 1.1, 0);
  const planePoly = plane === 'yz'
    ? poly(o, py, p(0, 1.8, 1.8), pz)
    : plane === 'xz'
    ? poly(o, px, p(1.8, 0, 1.8), pz)
    : poly(o, px, p(1.8, 1.8, 0), py);
  const col = plane === 'yz' ? '#38bdf8' : plane === 'xz' ? '#34d399' : '#fbbf24';

  return (
    <div className="widget">
      <div className="widget-title">A „hiányzó betű” szabálya: koordinátasík és az erőkar</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        {[
          { k: 'yz', l: 'M_yz (erőkar: x)', c: '#38bdf8' },
          { k: 'xz', l: 'M_xz (erőkar: y)', c: '#34d399' },
          { k: 'xy', l: 'M_xy (erőkar: z)', c: '#fbbf24' },
        ].map((b) => (
          <button key={b.k} onClick={() => setPlane(b.k as 'yz' | 'xz' | 'xy')} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${plane === b.k ? b.c : '#334155'}`, background: plane === b.k ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.55)', color: plane === b.k ? b.c : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {b.l}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 300 215" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <polygon points={planePoly} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={1.6} />
          <line x1={o.sx} y1={o.sy} x2={px.sx} y2={px.sy} stroke="#94a3b8" />
          <line x1={o.sx} y1={o.sy} x2={py.sx} y2={py.sy} stroke="#94a3b8" />
          <line x1={o.sx} y1={o.sy} x2={pz.sx} y2={pz.sy} stroke="#94a3b8" />
          <line x1={foot.sx} y1={foot.sy} x2={pt.sx} y2={pt.sy} stroke="#f87171" strokeWidth={2.8} />
          <circle cx={pt.sx} cy={pt.sy} r={5.5} fill="#f87171" stroke="#fff" strokeWidth={1.4} />
          <text x={pt.sx + 8} y={pt.sy - 4} fill="#f8fafc" fontSize={11.5} fontWeight={700}>P(x, y, z)</text>
          <text x={px.sx + 4} y={px.sy + 4} fill="#94a3b8" fontSize={11}>x</text>
          <text x={py.sx - 12} y={py.sy + 4} fill="#94a3b8" fontSize={11}>y</text>
          <text x={pz.sx + 5} y={pz.sy} fill="#94a3b8" fontSize={11}>z</text>
        </svg>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: `1px solid ${col}`, fontSize: 13, color: '#e2e8f0', lineHeight: 1.7 }}>
          {plane === 'yz' && <><div><strong style={{ color: '#38bdf8' }}>M_yz = ∭ x · δ dV</strong></div><div>x̄ = M_yz / M (az yz-síktól való távolság az x!)</div></>}
          {plane === 'xz' && <><div><strong style={{ color: '#34d399' }}>M_xz = ∭ y · δ dV</strong></div><div>ȳ = M_xz / M (az xz-síktól való távolság az y!)</div></>}
          {plane === 'xy' && <><div><strong style={{ color: '#fbbf24' }}>M_xy = ∭ z · δ dV</strong></div><div>z̄ = M_xy / M (az xy-síktól való távolság a z!)</div></>}
        </div>
      </div>
    </div>
  );
}

/* ── 3. Classic3DCentroidsWidget: 4 classic 3D homogeneous solids ── */
type SolidKey = 'cone' | 'hemi' | 'para' | 'tetra';
const SOLIDS: Record<SolidKey, { label: string; zbar: string; frac: number; note: string }> = {
  cone: { label: 'Kúp (mag. h)', zbar: 'z̄ = h / 4 = 0,25 h', frac: 0.25, note: 'A kúp alja sokkal szélesebb, mint a csúcsa ⇒ súlypontja a magasság alsó negyedénél van!' },
  hemi: { label: 'Félgömb (sugár R)', zbar: 'z̄ = 3R / 8 = 0,375 R', frac: 0.375, note: 'Klasszikus arány: a félköré 4R/(3π) ≈ 0,424R, a 3D félgömbé 3R/8 = 0,375R!' },
  para: { label: 'Paraboloid (mag. h)', zbar: 'z̄ = h / 3 ≈ 0,333 h', frac: 1 / 3, note: 'A paraboloid teltebb, mint a kúp ⇒ súlypontja magasabban (h/3-nál) van.' },
  tetra: { label: 'Tetraéder (a, b, c)', zbar: '(a/4, b/4, c/4)', frac: 0.25, note: 'A 4 csúcs számtani közepe: minden koordináta az él negyede!' },
};

export function Classic3DCentroidsWidget() {
  const [s, setS] = useState<SolidKey>('hemi');
  const cur = SOLIDS[s];
  const cx = 135, baseY = 175, H = 125, R = 80;
  const zY = baseY - cur.frac * (s === 'hemi' ? R : H);

  return (
    <div className="widget">
      <div className="widget-title">Klasszikus homogén 3D testek súlypont-magassága (z̄)</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {(Object.keys(SOLIDS) as SolidKey[]).map((k) => (
          <button key={k} onClick={() => setS(k)} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${s === k ? '#34d399' : '#334155'}`, background: s === k ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: s === k ? '#34d399' : '#cbd5e1', fontWeight: 700, fontSize: 11.5, cursor: 'pointer' }}>
            {SOLIDS[k].label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 270 200" style={{ width: '100%', maxWidth: 270, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={cx} y1={18} x2={cx} y2={190} stroke="#fbbf24" strokeDasharray="4 3" />
          <line x1={25} y1={baseY} x2={245} y2={baseY} stroke="#64748b" />
          {s === 'cone' && <polygon points={`${cx - R},${baseY} ${cx + R},${baseY} ${cx},${baseY - H}`} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
          {s === 'hemi' && <path d={`M ${cx - R} ${baseY} A ${R} ${R} 0 0 1 ${cx + R} ${baseY} Z`} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
          {s === 'para' && <path d={`M ${cx - R} ${baseY} Q ${cx} ${baseY - 2 * H} ${cx + R} ${baseY} Z`} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
          {s === 'tetra' && <polygon points={`${cx - 60},${baseY} ${cx + 75},${baseY} ${cx - 25},${baseY - H}`} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
          <circle cx={s === 'tetra' ? cx - 2 : cx} cy={zY} r={6} fill="#34d399" stroke="#fff" strokeWidth={1.6} />
          <text x={cx + 12} y={zY + 4} fill="#34d399" fontSize={11.5} fontWeight={700}>CM</text>
        </svg>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399', fontSize: 13, color: '#e2e8f0', lineHeight: 1.65 }}>
          <div style={{ color: '#34d399', fontWeight: 700, fontSize: 15 }}>{cur.zbar}</div>
          <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 6 }}>{cur.note}</div>
        </div>
      </div>
    </div>
  );
}

/* ── 4. AxisDistance3DWidget: Distance squared from x, y, z axes ── */
export function AxisDistance3DWidget() {
  const [axis, setAxis] = useState<'x' | 'y' | 'z'>('z');
  const yaw = 0.56, pitch = 0.44, cx = 155, cy = 145, sc = 56;
  const p = (x: number, y: number, z: number) => proj3D(x, y, z, yaw, pitch, cx, cy, sc);

  const o = p(0, 0, 0), px = p(1.8, 0, 0), py = p(0, 1.8, 0), pz = p(0, 0, 1.8);
  const pt = p(1.2, 1.1, 1.2);
  const foot = axis === 'x' ? p(1.2, 0, 0) : axis === 'y' ? p(0, 1.1, 0) : p(0, 0, 1.2);
  const col = axis === 'x' ? '#38bdf8' : axis === 'y' ? '#34d399' : '#fbbf24';

  return (
    <div className="widget">
      <div className="widget-title">Távolság a forgástengelytől 3D-ben: r² = a „másik két koordináta” négyzetösszege!</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        {[
          { k: 'x', l: 'x-tengely: r² = y² + z²', c: '#38bdf8' },
          { k: 'y', l: 'y-tengely: r² = x² + z²', c: '#34d399' },
          { k: 'z', l: 'z-tengely: r² = x² + y²', c: '#fbbf24' },
        ].map((b) => (
          <button key={b.k} onClick={() => setAxis(b.k as 'x' | 'y' | 'z')} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${axis === b.k ? b.c : '#334155'}`, background: axis === b.k ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.55)', color: axis === b.k ? b.c : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {b.l}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 320 205" style={{ width: '100%', maxWidth: 340, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        <line x1={o.sx} y1={o.sy} x2={px.sx} y2={px.sy} stroke={axis === 'x' ? '#38bdf8' : '#64748b'} strokeWidth={axis === 'x' ? 3 : 1.3} />
        <line x1={o.sx} y1={o.sy} x2={py.sx} y2={py.sy} stroke={axis === 'y' ? '#34d399' : '#64748b'} strokeWidth={axis === 'y' ? 3 : 1.3} />
        <line x1={o.sx} y1={o.sy} x2={pz.sx} y2={pz.sy} stroke={axis === 'z' ? '#fbbf24' : '#64748b'} strokeWidth={axis === 'z' ? 3 : 1.3} />
        <line x1={foot.sx} y1={foot.sy} x2={pt.sx} y2={pt.sy} stroke="#f87171" strokeWidth={2.8} />
        <circle cx={foot.sx} cy={foot.sy} r={4} fill={col} />
        <circle cx={pt.sx} cy={pt.sy} r={5.5} fill="#f87171" stroke="#fff" strokeWidth={1.4} />
        <text x={pt.sx + 8} y={pt.sy - 4} fill="#f8fafc" fontSize={11.5} fontWeight={700}>P(x, y, z)</text>
        <text x={14} y={24} fill={col} fontSize={12.5} fontWeight={700}>
          {axis === 'x' ? 'I_x = ∭ (y² + z²) δ dV' : axis === 'y' ? 'I_y = ∭ (x² + z²) δ dV' : 'I_z = ∭ (x² + y²) δ dV'}
        </text>
      </svg>
    </div>
  );
}

/* ── 5. BoxSpinAxisWidget: Comparing spin axes of a 3D box (Steiner) ── */
export function BoxSpinAxisWidget() {
  const [pos, setPos] = useState<'center' | 'edge' | 'face'>('center');
  // Box a=4, b=2, c=2, M=12
  const a = 4, b = 2, M = 12;
  const Icm = (M * (a * a + b * b)) / 12; // 20
  const Iedge = Icm + M * ((a / 2) ** 2 + (b / 2) ** 2); // 20 + 12*5 = 80 = M(a²+b²)/3
  const Iface = Icm + M * ((a / 2) ** 2); // 20 + 12*4 = 68

  const curI = pos === 'center' ? Icm : pos === 'edge' ? Iedge : Iface;
  const curR = Math.sqrt(curI / M);

  return (
    <div className="widget">
      <div className="widget-title">3D Steiner-tétel: 4 × 2 × 2 téglatest (M = 12) forgatása különböző z-párhuzamos tengelyek körül</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {[
          { k: 'center', l: 'Súlyponton át (d = 0)', c: '#34d399' },
          { k: 'face', l: 'Oldallap közepén (d = 2)', c: '#38bdf8' },
          { k: 'edge', l: 'Sarokélen át (d = √5)', c: '#fb923c' },
        ].map((item) => (
          <button key={item.k} onClick={() => setPos(item.k as 'center' | 'edge' | 'face')} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${pos === item.k ? item.c : '#334155'}`, background: pos === item.k ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.55)', color: pos === item.k ? item.c : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {item.l}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center', fontSize: 12.5 }}>
        <div style={{ padding: 10, borderRadius: 9, background: 'rgba(52,211,153,0.14)', border: '1px solid #34d399' }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>I_cm (minimum)</div>
          <div style={{ color: '#34d399', fontWeight: 700, fontSize: 15 }}>{Icm.toFixed(1)}</div>
        </div>
        <div style={{ padding: 10, borderRadius: 9, background: 'rgba(56,189,248,0.16)', border: '1px solid #38bdf8' }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>Aktuális I_L = I_cm + Md²</div>
          <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 15 }}>{curI.toFixed(1)}</div>
        </div>
        <div style={{ padding: 10, borderRadius: 9, background: 'rgba(251,191,36,0.14)', border: '1px solid #fbbf24' }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>Inerciálissugár R = √(I/M)</div>
          <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: 15 }}>{curR.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

/* ── 6. RollingRaceWidget: Solid sphere vs Solid cylinder vs Hollow hoop on an incline ── */
export function RollingRaceWidget() {
  const [t, setT] = useState(0.75); // normalized time 0..1
  // Distance along ramp s(t) ∝ 1 / (1 + k)
  const items = [
    { name: '1. Tömör gömb (I = 2/5 MR²)', k: 0.4, col: '#34d399' },
    { name: '2. Tömör henger (I = 1/2 MR²)', k: 0.5, col: '#38bdf8' },
    { name: '3. Üreges cső (I = MR²)', k: 1.0, col: '#fb923c' },
  ];
  // Normalize so solid sphere reaches 100% at t=1
  const maxAccel = 1 / 1.4;

  return (
    <div className="widget">
      <div className="widget-title">A lejtő-verseny: ki ér le először? (Tömegtől és sugártól függetlenül!)</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
        {items.map((it) => {
          const pct = Math.min(100, ((1 / (1 + it.k)) / maxAccel) * t * t * 100);
          return (
            <div key={it.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#e2e8f0', marginBottom: 3 }}>
                <strong style={{ color: it.col }}>{it.name}</strong>
                <span>{pct.toFixed(0)}%</span>
              </div>
              <div style={{ height: 10, borderRadius: 5, background: 'rgba(15,23,42,0.75)', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: it.col, borderRadius: 5 }} />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Idő t = {t.toFixed(2)}:</span>
        <input type="range" min={0} max={1} step={0.02} value={t} onChange={(e) => setT(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 7. PlanetaryCoreDensityWidget: Layered planet δ(r) = 1 - c·(r/R) ── */
export function PlanetaryCoreDensityWidget() {
  const [c, setC] = useState(0.75);
  // For sphere of radius R=1 with δ(r) = 1 - c*r:
  // M = 4π ∫_0^1 (1 - cr) r² dr = 4π (1/3 - c/4)
  // I_z = (8π/3) ∫_0^1 (1 - cr) r⁴ dr = (8π/3) (1/5 - c/6)
  // Ratio I/(M R²) = (2/3) * (1/5 - c/6) / (1/3 - c/4)
  const factor = (2 / 3) * (1 / 5 - c / 6) / (1 / 3 - c / 4);

  return (
    <div className="widget">
      <div className="widget-title">Bolygófizika: honnan tudjuk, hogy a Földnek nehéz vasmagja van?</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Mag-sűrűsödés c = <strong style={{ color: '#fbbf24' }}>{c.toFixed(2)}</strong> (δ(r) = δ₀(1 − c·r/R)):</span>
        <input type="range" min={0} max={1} step={0.05} value={c} onChange={(e) => setC(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <div style={{ padding: '11px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #38bdf8', fontSize: 13, color: '#e2e8f0', lineHeight: 1.65 }}>
        <div>Dimenziótlan tehetetlenségi tényező: <strong style={{ color: '#34d399', fontSize: 16 }}>I / (M R²) = {factor.toFixed(3)}</strong></div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
          Homogén gömb: <strong>0,400</strong> · Föld mért értéke: <strong>0,331</strong> (erősen sűrűsödő vasmag!) · Mars: 0,364.
        </div>
      </div>
    </div>
  );
}

/* ── 8. Moments3DMasterDiagram: Visual 3D formula sheet ── */
export function Moments3DMasterDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">15.5 Mester-képlettár: 3D tömeg, tömegközéppont és tehetetlenségi nyomaték</div>
      <svg viewBox="0 0 520 225" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        <rect x={14} y={14} width={238} height={92} rx={10} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.4} />
        <text x={133} y={35} textAnchor="middle" fill="#38bdf8" fontSize={12.5} fontWeight={700}>Tömeg & 1. nyomatékok</text>
        <text x={133} y={58} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>M = ∭_D δ(x,y,z) dV</text>
        <text x={133} y={82} textAnchor="middle" fill="#cbd5e1" fontSize={11}>M_yz = ∭ xδ · M_xz = ∭ yδ · M_xy = ∭ zδ</text>

        <rect x={268} y={14} width={238} height={92} rx={10} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.4} />
        <text x={387} y={35} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>3D Tömegközéppont</text>
        <text x={387} y={62} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>x̄ = M_yz/M · ȳ = M_xz/M · z̄ = M_xy/M</text>
        <text x={387} y={86} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>Használd ki a 3D szimmetriát!</text>

        <rect x={14} y={120} width={238} height={90} rx={10} fill="rgba(251,146,60,0.14)" stroke="#fb923c" strokeWidth={1.4} />
        <text x={133} y={141} textAnchor="middle" fill="#fb923c" fontSize={12.5} fontWeight={700}>Tehetetlenségi nyomatékok</text>
        <text x={133} y={163} textAnchor="middle" fill="#f8fafc" fontSize={11}>I_x = ∭ (y²+z²)δ · I_y = ∭ (x²+z²)δ</text>
        <text x={133} y={185} textAnchor="middle" fill="#f8fafc" fontSize={11}>I_z = ∭ (x²+y²)δ dV</text>

        <rect x={268} y={120} width={238} height={90} rx={10} fill="rgba(45,212,191,0.14)" stroke="#2dd4bf" strokeWidth={1.4} />
        <text x={387} y={141} textAnchor="middle" fill="#2dd4bf" fontSize={12.5} fontWeight={700}>Inerciálissugár & Steiner</text>
        <text x={387} y={163} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>R_L = √(I_L / M)</text>
        <text x={387} y={185} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>I_L = I_cm + M·d²</text>
      </svg>
    </div>
  );
}
