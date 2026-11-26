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

/* ── 1. ExtremaTypes3DWidget: 4 canonical surfaces with rotating 3D wireframe ── */
type SurfaceKind = 'min' | 'max' | 'saddle' | 'cone';
const SURFACES: Record<SurfaceKind, {
  label: string;
  formula: string;
  note: string;
  color: string;
  z: (x: number, y: number) => number;
  z0: number;
  hasPlane: boolean;
}> = {
  min: {
    label: 'Lokális minimum',
    formula: 'z = x² + y²',
    note: '∇f(0,0) = (0,0), a felület az érintősík felett van (D > 0, f_xx > 0).',
    color: '#34d399',
    z: (x, y) => 0.45 * (x * x + y * y) - 0.8,
    z0: -0.8,
    hasPlane: true,
  },
  max: {
    label: 'Lokális maximum',
    formula: 'z = 2 − (x² + y²)',
    note: '∇f(0,0) = (0,0), a felület az érintősík alatt van (D > 0, f_xx < 0).',
    color: '#38bdf8',
    z: (x, y) => 0.9 - 0.45 * (x * x + y * y),
    z0: 0.9,
    hasPlane: true,
  },
  saddle: {
    label: 'Nyeregpont',
    formula: 'z = y² − x²',
    note: '∇f(0,0) = (0,0), de y mentén felfelé, x mentén lefelé hajlik (D < 0).',
    color: '#fb923c',
    z: (x, y) => 0.42 * (y * y - x * x),
    z0: 0,
    hasPlane: true,
  },
  cone: {
    label: 'Nem diff. csúcs',
    formula: 'z = √(x² + y²)',
    note: 'Kritikus pont, ahol f_x, f_y NEM létezik — mégis abszolút minimum!',
    color: '#fbbf24',
    z: (x, y) => 0.72 * Math.sqrt(x * x + y * y) - 0.75,
    z0: -0.75,
    hasPlane: false,
  },
};

export function ExtremaTypes3DWidget() {
  const [kind, setKind] = useState<SurfaceKind>('min');
  const [yawDeg, setYawDeg] = useState(38);
  const surf = SURFACES[kind];
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = 0.48;
  const cx = 230, cy = 148, sc = 56;
  const grid = [-1.4, -1.05, -0.7, -0.35, 0, 0.35, 0.7, 1.05, 1.4];

  const lines: JSX.Element[] = [];
  grid.forEach((u, ui) => {
    const pts1 = grid.map((v) => {
      const p = proj3D(u, v, surf.z(u, v), yaw, pitch, cx, cy, sc);
      return `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`;
    }).join(' ');
    const pts2 = grid.map((v) => {
      const p = proj3D(v, u, surf.z(v, u), yaw, pitch, cx, cy, sc);
      return `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`;
    }).join(' ');
    lines.push(
      <polyline key={`u-${ui}`} points={pts1} fill="none" stroke={surf.color} strokeOpacity={u === 0 ? 0.95 : 0.42} strokeWidth={u === 0 ? 1.8 : 1} />,
      <polyline key={`v-${ui}`} points={pts2} fill="none" stroke={surf.color} strokeOpacity={u === 0 ? 0.95 : 0.42} strokeWidth={u === 0 ? 1.8 : 1} />
    );
  });

  const p0 = proj3D(0, 0, surf.z0, yaw, pitch, cx, cy, sc);
  const planePts = [
    proj3D(-0.9, -0.9, surf.z0, yaw, pitch, cx, cy, sc),
    proj3D(0.9, -0.9, surf.z0, yaw, pitch, cx, cy, sc),
    proj3D(0.9, 0.9, surf.z0, yaw, pitch, cx, cy, sc),
    proj3D(-0.9, 0.9, surf.z0, yaw, pitch, cx, cy, sc),
  ].map((p) => `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">A négy alapvető kritikus pont 3D-ben (forgatható drótháló)</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {(Object.keys(SURFACES) as SurfaceKind[]).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            style={{
              padding: '5px 10px',
              borderRadius: 8,
              border: `1px solid ${kind === k ? SURFACES[k].color : 'rgba(148,163,184,0.28)'}`,
              background: kind === k ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.55)',
              color: kind === k ? SURFACES[k].color : '#cbd5e1',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {SURFACES[k].label}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 460 275" style={{ width: '100%', maxWidth: 480, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        {surf.hasPlane && (
          <polygon points={planePts} fill="#fbbf24" fillOpacity={0.14} stroke="#fbbf24" strokeDasharray="4 3" strokeWidth={1.3} />
        )}
        {lines}
        <circle cx={p0.sx} cy={p0.sy} r={5.5} fill="#f87171" stroke="#fff" strokeWidth={1.6} />
        <text x={p0.sx + 9} y={p0.sy - 6} fill="#f8fafc" fontSize={12} fontWeight={700}>P₀(0, 0)</text>
        <text x={14} y={24} fill={surf.color} fontSize={14} fontWeight={700}>{surf.formula}</text>
        <text x={14} y={42} fill="#cbd5e1" fontSize={11.5}>
          {surf.hasPlane ? 'Sárga lap: vízszintes érintősík (f_x = f_y = 0)' : 'Nincs érintősík (csúcsponthoz nem létezik f_x, f_y)'}
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Forgatás ({yawDeg}°):</span>
        <input type="range" min={-180} max={180} value={yawDeg} onChange={(e) => setYawDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 12.5, color: '#94a3b8' }}>{surf.note}</p>
    </div>
  );
}

/* ── 2. HessianClassifierWidget: Interactive f_xx, f_xy, f_yy sliders + level curves ── */
export function HessianClassifierWidget() {
  const [a, setA] = useState(2.0);
  const [b, setB] = useState(0.5);
  const [c, setC] = useState(1.5);
  const D = a * c - b * b;

  let verdict = 'Nem dönt (D = 0)';
  let vColor = '#fbbf24';
  if (D > 0.05 && a > 0) {
    verdict = 'Lokális MINIMUM (D > 0, f_xx > 0)';
    vColor = '#34d399';
  } else if (D > 0.05 && a < 0) {
    verdict = 'Lokális MAXIMUM (D > 0, f_xx < 0)';
    vColor = '#38bdf8';
  } else if (D < -0.05) {
    verdict = 'NYEREGPONT (D < 0)';
    vColor = '#fb923c';
  }

  // Sample 2D grid of Q(x,y) = 0.5*(a x^2 + 2 b x y + c y^2) for heatmap cells
  const N = 26;
  const cells: JSX.Element[] = [];
  const size = 210 / N;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = -2 + ((i + 0.5) / N) * 4;
      const y = 2 - ((j + 0.5) / N) * 4;
      const q = 0.5 * (a * x * x + 2 * b * x * y + c * y * y);
      const mag = Math.min(1, Math.abs(q) / 4);
      const fill = q >= 0
        ? `rgba(52, 211, 153, ${(0.08 + mag * 0.55).toFixed(2)})`
        : `rgba(248, 113, 113, ${(0.08 + mag * 0.55).toFixed(2)})`;
      cells.push(
        <rect key={`${i}-${j}`} x={20 + i * size} y={20 + j * size} width={size + 0.5} height={size + 0.5} fill={fill} />
      );
    }
  }

  return (
    <div className="widget">
      <div className="widget-title">Hesse-mátrix labor: Q(h, k) = ½(f_xx·h² + 2f_xy·hk + f_yy·k²) előjel-térképe</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 250 250" style={{ width: '100%', maxWidth: 250, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 10 }}>
          {cells}
          <line x1={20} y1={125} x2={230} y2={125} stroke="#94a3b8" strokeOpacity={0.5} strokeDasharray="3 3" />
          <line x1={125} y1={20} x2={125} y2={230} stroke="#94a3b8" strokeOpacity={0.5} strokeDasharray="3 3" />
          <circle cx={125} cy={125} r={4.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
          <text x={24} y={35} fill="#34d399" fontSize={11} fontWeight={700}>Zöld: Q &gt; 0 (felület feljebb)</text>
          <text x={24} y={224} fill="#f87171" fontSize={11} fontWeight={700}>Piros: Q &lt; 0 (felület lejjebb)</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label>
            f_xx = <strong style={{ color: '#38bdf8' }}>{a.toFixed(1)}</strong>
            <input type="range" min={-3} max={3} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <label>
            f_xy = <strong style={{ color: '#fbbf24' }}>{b.toFixed(1)}</strong>
            <input type="range" min={-3} max={3} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <label>
            f_yy = <strong style={{ color: '#2dd4bf' }}>{c.toFixed(1)}</strong>
            <input type="range" min={-3} max={3} step={0.1} value={c} onChange={(e) => setC(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.7)', border: `1px solid ${vColor}` }}>
            <div>D = f_xx·f_yy − (f_xy)² = <strong>{D.toFixed(2)}</strong></div>
            <div style={{ marginTop: 4, color: vColor, fontWeight: 700 }}>{verdict}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => { setA(2); setB(0.5); setC(1.5); }} style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid #34d399', fontSize: 11, cursor: 'pointer' }}>Min</button>
            <button onClick={() => { setA(-2); setB(0.5); setC(-2); }} style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(56,189,248,0.15)', color: '#38bdf8', border: '1px solid #38bdf8', fontSize: 11, cursor: 'pointer' }}>Max</button>
            <button onClick={() => { setA(1); setB(2); setC(1); }} style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(251,146,60,0.15)', color: '#fb923c', border: '1px solid #fb923c', fontSize: 11, cursor: 'pointer' }}>Nyereg</button>
            <button onClick={() => { setA(2); setB(2); setC(2); }} style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid #fbbf24', fontSize: 11, cursor: 'pointer' }}>D = 0</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. TwoCriticalPointsWidget: f(x,y) = x^3 - 3xy + y^3 contour & critical points ── */
export function TwoCriticalPointsWidget() {
  const [focus, setFocus] = useState<'saddle' | 'min'>('saddle');
  const mapX = (x: number) => 45 + ((x + 1.2) / 3.4) * 330;
  const mapY = (y: number) => 225 - ((y + 1.2) / 3.4) * 200;

  // Color grid for f(x,y) = x^3 - 3xy + y^3
  const cells: JSX.Element[] = [];
  const Nx = 34, Ny = 24;
  const dx = 330 / Nx, dy = 200 / Ny;
  for (let i = 0; i < Nx; i++) {
    for (let j = 0; j < Ny; j++) {
      const x = -1.2 + ((i + 0.5) / Nx) * 3.4;
      const y = 2.2 - ((j + 0.5) / Ny) * 3.4;
      const v = x * x * x - 3 * x * y + y * y * y;
      const norm = Math.tanh(v / 2.2);
      const fill = norm >= 0
        ? `rgba(56, 189, 248, ${(0.08 + norm * 0.48).toFixed(2)})`
        : `rgba(52, 211, 153, ${(0.08 + Math.abs(norm) * 0.55).toFixed(2)})`;
      cells.push(<rect key={`${i}-${j}`} x={45 + i * dx} y={25 + j * dy} width={dx + 0.5} height={dy + 0.5} fill={fill} />);
    }
  }

  // Nullclines: f_x = 0 => y = x^2; f_y = 0 => x = y^2
  const nullFx: string[] = [];
  const nullFy: string[] = [];
  for (let t = -1.1; t <= 1.48; t += 0.05) {
    const y1 = t * t;
    if (y1 >= -1.2 && y1 <= 2.2) nullFx.push(`${mapX(t).toFixed(1)},${mapY(y1).toFixed(1)}`);
    const x2 = t * t;
    if (x2 >= -1.2 && x2 <= 2.2) nullFy.push(`${mapX(x2).toFixed(1)},${mapY(t).toFixed(1)}`);
  }

  const info = focus === 'saddle'
    ? { pt: '(0, 0)', val: '0', fxx: '0', fyy: '0', fxy: '−3', D: '−9 < 0', kind: 'NYEREGPONT', col: '#fb923c' }
    : { pt: '(1, 1)', val: '−1', fxx: '6', fyy: '6', fxy: '−3', D: '27 > 0', kind: 'LOKÁLIS MINIMUM', col: '#34d399' };

  return (
    <div className="widget">
      <div className="widget-title">Két kritikus pont egy térképen: f(x, y) = x³ − 3xy + y³</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <button onClick={() => setFocus('saddle')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${focus === 'saddle' ? '#fb923c' : '#334155'}`, background: focus === 'saddle' ? 'rgba(251,146,60,0.16)' : 'rgba(15,23,42,0.5)', color: '#fb923c', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
          (0, 0) — Nyeregpont
        </button>
        <button onClick={() => setFocus('min')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${focus === 'min' ? '#34d399' : '#334155'}`, background: focus === 'min' ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.5)', color: '#34d399', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
          (1, 1) — Lokális minimum
        </button>
      </div>
      <svg viewBox="0 0 420 250" style={{ width: '100%', maxWidth: 440, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {cells}
        <line x1={45} y1={mapY(0)} x2={375} y2={mapY(0)} stroke="#64748b" strokeDasharray="3 3" />
        <line x1={mapX(0)} y1={25} x2={mapX(0)} y2={225} stroke="#64748b" strokeDasharray="3 3" />
        <polyline points={nullFx.join(' ')} fill="none" stroke="#fbbf24" strokeWidth={2} />
        <polyline points={nullFy.join(' ')} fill="none" stroke="#60a5fa" strokeWidth={2} />
        <circle cx={mapX(0)} cy={mapY(0)} r={focus === 'saddle' ? 7 : 5} fill="#fb923c" stroke="#fff" strokeWidth={1.6} />
        <circle cx={mapX(1)} cy={mapY(1)} r={focus === 'min' ? 7 : 5} fill="#34d399" stroke="#fff" strokeWidth={1.6} />
        <text x={mapX(0) - 38} y={mapY(0) + 18} fill="#fb923c" fontSize={11.5} fontWeight={700}>(0, 0)</text>
        <text x={mapX(1) + 10} y={mapY(1) - 6} fill="#34d399" fontSize={11.5} fontWeight={700}>(1, 1)</text>
        <text x={242} y={42} fill="#fbbf24" fontSize={11} fontWeight={700}>Sárga: f_x = 0 (y = x²)</text>
        <text x={242} y={58} fill="#60a5fa" fontSize={11} fontWeight={700}>Kék: f_y = 0 (x = y²)</text>
      </svg>
      <div style={{ marginTop: 10, padding: '9px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.6)', border: `1px solid ${info.col}`, fontSize: 12.5, color: '#e2e8f0' }}>
        <strong style={{ color: info.col }}>{info.pt} → {info.kind}</strong> · f = {info.val} · f_xx = {info.fxx}, f_yy = {info.fyy}, f_xy = {info.fxy} · <strong>D = {info.D}</strong>
      </div>
    </div>
  );
}

/* ── 4. DegenerateDZeroWidget: 4 faces of D = 0 including Peano surface ── */
type DZeroKind = 'min' | 'max' | 'saddle' | 'peano';
const DZERO: Record<DZeroKind, {
  label: string;
  formula: string;
  fn: (x: number, y: number) => number;
  desc: string;
  color: string;
}> = {
  min: {
    label: 'x⁴ + y⁴',
    formula: 'f(x,y) = x⁴ + y⁴',
    fn: (x, y) => x ** 4 + y ** 4,
    desc: 'D = 0 az origóban, de minden (x,y) ≠ (0,0) pontban f > 0 → szigorú lokális minimum!',
    color: '#34d399',
  },
  max: {
    label: '−x⁴ − y⁴',
    formula: 'f(x,y) = −x⁴ − y⁴',
    fn: (x, y) => -(x ** 4 + y ** 4),
    desc: 'D = 0 az origóban, de mindenütt f ≤ 0 → szigorú lokális maximum!',
    color: '#38bdf8',
  },
  saddle: {
    label: 'x³ + y³',
    formula: 'f(x,y) = x³ + y³',
    fn: (x, y) => x ** 3 + y ** 3,
    desc: 'D = 0, de az I. síknegyedben pozitív, a III.-ban negatív → nyeregpont!',
    color: '#fb923c',
  },
  peano: {
    label: 'Peano-csapda',
    formula: 'f(x,y) = (y − x²)(y − 2x²)',
    fn: (x, y) => (y - x * x) * (y - 2 * x * x),
    desc: 'Híres ellenpélda: MINDEN egyenes mentén lokális minimum az origóban, de a y = 1,5x² parabolán negatív → NYEREGPONT!',
    color: '#f87171',
  },
};

export function DegenerateDZeroWidget() {
  const [kind, setKind] = useState<DZeroKind>('peano');
  const item = DZERO[kind];
  const N = 32;
  const size = 200 / N;
  const cells: JSX.Element[] = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = -1.2 + ((i + 0.5) / N) * 2.4;
      const y = 1.2 - ((j + 0.5) / N) * 2.4;
      const v = item.fn(x, y);
      const fill = v > 0.0005 ? 'rgba(52, 211, 153, 0.45)' : v < -0.0005 ? 'rgba(248, 113, 113, 0.55)' : 'rgba(251, 191, 36, 0.7)';
      cells.push(<rect key={`${i}-${j}`} x={30 + i * size} y={20 + j * size} width={size + 0.4} height={size + 0.4} fill={fill} />);
    }
  }

  const paraPts: string[] = [];
  if (kind === 'peano') {
    for (let x = -0.89; x <= 0.89; x += 0.04) {
      const y = 1.5 * x * x;
      const sx = 30 + ((x + 1.2) / 2.4) * 200;
      const sy = 20 + ((1.2 - y) / 2.4) * 200;
      paraPts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
  }

  return (
    <div className="widget">
      <div className="widget-title">Amikor D = 0 nem dönt: előjel-térkép az origó körül (zöld: f &gt; 0, piros: f &lt; 0)</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {(Object.keys(DZERO) as DZeroKind[]).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            style={{
              padding: '5px 10px',
              borderRadius: 8,
              border: `1px solid ${kind === k ? DZERO[k].color : '#334155'}`,
              background: kind === k ? 'rgba(56,189,248,0.12)' : 'rgba(15,23,42,0.55)',
              color: kind === k ? DZERO[k].color : '#cbd5e1',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {DZERO[k].label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 260 240" style={{ width: '100%', maxWidth: 260, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          {cells}
          <line x1={30} y1={120} x2={230} y2={120} stroke="#e2e8f0" strokeOpacity={0.35} />
          <line x1={130} y1={20} x2={130} y2={220} stroke="#e2e8f0" strokeOpacity={0.35} />
          {kind === 'peano' && (
            <polyline points={paraPts.join(' ')} fill="none" stroke="#fbbf24" strokeWidth={2.2} strokeDasharray="4 2" />
          )}
          <circle cx={130} cy={120} r={4.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
        </svg>
        <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.55 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.formula}</div>
          <p style={{ margin: 0 }}>{item.desc}</p>
          {kind === 'peano' && (
            <p style={{ margin: '8px 0 0', fontSize: 12, color: '#fbbf24' }}>
              A szaggatott sárga görbe az y = 1,5x² parabola: ezen keresztül haladva végig a piros (f &lt; 0) „csatornában” maradunk!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 5. ClosedTriangleDomainWidget: Thomas Ex. 5 on triangle (0,0)-(9,0)-(0,9) ── */
type ZoneId = 'interior' | 'bottom' | 'left' | 'hyp' | 'corners';
const ZONES: Record<ZoneId, { title: string; points: string; best: string; color: string }> = {
  interior: {
    title: 'Belső kritikus pont',
    points: 'f_x = 2 − 2x = 0, f_y = 2 − 2y = 0 ⇒ P₁(1, 1)',
    best: 'f(1, 1) = 4  ← ABSZOLÚT MAXIMUM!',
    color: '#34d399',
  },
  bottom: {
    title: 'Alsó él (y = 0, 0 ≤ x ≤ 9)',
    points: 'g(x) = 2 + 2x − x² ⇒ g′(x) = 2 − 2x = 0 ⇒ (1, 0)',
    best: 'f(1, 0) = 3 (élbelső lokális max)',
    color: '#38bdf8',
  },
  left: {
    title: 'Bal él (x = 0, 0 ≤ y ≤ 9)',
    points: 'h(y) = 2 + 2y − y² ⇒ h′(y) = 2 − 2y = 0 ⇒ (0, 1)',
    best: 'f(0, 1) = 3 (élbelső lokális max)',
    color: '#2dd4bf',
  },
  hyp: {
    title: 'Átfogó (x + y = 9, 0 ≤ x ≤ 9)',
    points: 'k(x) = 20 − x² − (9 − x)² = −2x² + 18x − 61 ⇒ x = 9/2',
    best: 'f(9/2, 9/2) = −41/2 = −20,5',
    color: '#fbbf24',
  },
  corners: {
    title: 'Csúcspontok',
    points: 'f(0, 0) = 2 · f(9, 0) = −61 · f(0, 9) = −61',
    best: 'f(9, 0) = f(0, 9) = −61  ← ABSZOLÚT MINIMUM!',
    color: '#f87171',
  },
};

export function ClosedTriangleDomainWidget() {
  const [zone, setZone] = useState<ZoneId>('interior');
  const mx = (x: number) => 45 + (x / 9) * 200;
  const my = (y: number) => 225 - (y / 9) * 195;

  return (
    <div className="widget">
      <div className="widget-title">Abszolút szélsőérték zárt háromszögön: f(x, y) = 2 + 2x + 2y − x² − y²</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {(Object.keys(ZONES) as ZoneId[]).map((z) => (
          <button
            key={z}
            onClick={() => setZone(z)}
            style={{
              padding: '5px 9px',
              borderRadius: 8,
              border: `1px solid ${zone === z ? ZONES[z].color : '#334155'}`,
              background: zone === z ? 'rgba(56,189,248,0.12)' : 'rgba(15,23,42,0.55)',
              color: zone === z ? ZONES[z].color : '#cbd5e1',
              fontSize: 11.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {ZONES[z].title}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 280 250" style={{ width: '100%', maxWidth: 280, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <polygon
            points={`${mx(0)},${my(0)} ${mx(9)},${my(0)} ${mx(0)},${my(9)}`}
            fill={zone === 'interior' ? 'rgba(52,211,153,0.18)' : 'rgba(56,189,248,0.08)'}
            stroke="#64748b"
            strokeWidth={1.5}
          />
          {/* Edges */}
          <line x1={mx(0)} y1={my(0)} x2={mx(9)} y2={my(0)} stroke={zone === 'bottom' ? '#38bdf8' : '#64748b'} strokeWidth={zone === 'bottom' ? 3.5 : 1.5} />
          <line x1={mx(0)} y1={my(0)} x2={mx(0)} y2={my(9)} stroke={zone === 'left' ? '#2dd4bf' : '#64748b'} strokeWidth={zone === 'left' ? 3.5 : 1.5} />
          <line x1={mx(9)} y1={my(0)} x2={mx(0)} y2={my(9)} stroke={zone === 'hyp' ? '#fbbf24' : '#64748b'} strokeWidth={zone === 'hyp' ? 3.5 : 1.5} />
          {/* Candidate points */}
          <circle cx={mx(1)} cy={my(1)} r={zone === 'interior' ? 6.5 : 4.5} fill="#34d399" stroke="#fff" strokeWidth={1.4} />
          <text x={mx(1) + 9} y={my(1) + 4} fill="#34d399" fontSize={11} fontWeight={700}>(1,1): 4</text>

          <circle cx={mx(1)} cy={my(0)} r={zone === 'bottom' ? 6 : 3.5} fill="#38bdf8" />
          <circle cx={mx(0)} cy={my(1)} r={zone === 'left' ? 6 : 3.5} fill="#2dd4bf" />
          <circle cx={mx(4.5)} cy={my(4.5)} r={zone === 'hyp' ? 6 : 4} fill="#fbbf24" />
          <text x={mx(4.5) + 8} y={my(4.5) - 4} fill="#fbbf24" fontSize={10.5}>(4.5, 4.5): −20.5</text>

          <circle cx={mx(0)} cy={my(0)} r={zone === 'corners' ? 5.5 : 3.5} fill="#94a3b8" />
          <circle cx={mx(9)} cy={my(0)} r={zone === 'corners' ? 6.5 : 4.5} fill="#f87171" stroke="#fff" strokeWidth={1.3} />
          <circle cx={mx(0)} cy={my(9)} r={zone === 'corners' ? 6.5 : 4.5} fill="#f87171" stroke="#fff" strokeWidth={1.3} />
          <text x={mx(9) - 34} y={my(0) + 16} fill="#f87171" fontSize={10.5} fontWeight={700}>(9,0): −61</text>
          <text x={mx(0) + 8} y={my(9) + 4} fill="#f87171" fontSize={10.5} fontWeight={700}>(0,9): −61</text>
        </svg>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.65)', border: `1px solid ${ZONES[zone].color}`, fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, color: ZONES[zone].color, marginBottom: 6 }}>{ZONES[zone].title}</div>
          <div>{ZONES[zone].points}</div>
          <div style={{ marginTop: 8, fontWeight: 700, color: '#f8fafc' }}>{ZONES[zone].best}</div>
        </div>
      </div>
    </div>
  );
}

/* ── 6. OpenBoxOptimizationWidget: V = 32 open-top box minimizing surface area ── */
export function OpenBoxOptimizationWidget() {
  const [x, setX] = useState(4.0);
  const [y, setY] = useState(4.0);
  const V = 32;
  const z = V / (x * y);
  const A = x * y + 2 * x * z + 2 * y * z;
  const isOpt = Math.abs(x - 4) < 0.15 && Math.abs(y - 4) < 0.15;

  // Isometric box projection
  const sc = 18;
  const ox = 155, oy = 175;
  const p = (px: number, py: number, pz: number) => ({
    sx: ox + (px - py * 0.72) * sc,
    sy: oy + (px * 0.32 + py * 0.36 - pz * 0.95) * sc,
  });

  const p000 = p(0, 0, 0), p100 = p(x, 0, 0), p110 = p(x, y, 0), p010 = p(0, y, 0);
  const p001 = p(0, 0, z), p101 = p(x, 0, z), p111 = p(x, y, z), p011 = p(0, y, z);
  const poly = (...pts: { sx: number; sy: number }[]) => pts.map((q) => `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Nyitott doboz optimalizálása (V = 32 dm³ rögzítve)</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 320 225" style={{ width: '100%', maxWidth: 320, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <polygon points={poly(p000, p100, p110, p010)} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={1.3} />
          <polygon points={poly(p000, p100, p101, p001)} fill="rgba(45,212,191,0.16)" stroke="#2dd4bf" strokeWidth={1.3} />
          <polygon points={poly(p000, p010, p011, p001)} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.3} />
          <polygon points={poly(p100, p110, p111, p101)} fill="rgba(52,211,153,0.16)" stroke="#34d399" strokeWidth={1.4} />
          <polygon points={poly(p010, p110, p111, p011)} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={1.4} />
          <text x={14} y={24} fill={isOpt ? '#34d399' : '#fbbf24'} fontSize={13} fontWeight={700}>
            Felszín A = {A.toFixed(2)} dm² {isOpt ? '(OPTIMÁLIS!)' : '(min: 48,00)'}
          </text>
          <text x={14} y={42} fill="#cbd5e1" fontSize={11.5}>
            x = {x.toFixed(1)}, y = {y.toFixed(1)}, z = 32/(xy) = {z.toFixed(2)}
          </text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label>
            Szélesség x = <strong style={{ color: '#38bdf8' }}>{x.toFixed(1)} dm</strong>
            <input type="range" min={1.6} max={6.5} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <label>
            Mélység y = <strong style={{ color: '#2dd4bf' }}>{y.toFixed(1)} dm</strong>
            <input type="range" min={1.6} max={6.5} step={0.1} value={y} onChange={(e) => setY(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <button
            onClick={() => { setX(4); setY(4); }}
            style={{ padding: '6px 10px', borderRadius: 8, background: 'rgba(52,211,153,0.16)', color: '#34d399', border: '1px solid #34d399', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
          >
            Ugrás az optimumra (4 × 4 × 2)
          </button>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>
            A(x, y) = xy + 64/x + 64/y minimuma: négyzetes alap, a magasság az alapél fele!
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. LeastSquaresWidget: Interactive linear regression as 2D minimization ── */
const REG_PTS = [
  { x: 1, y: 1.4 },
  { x: 2, y: 2.1 },
  { x: 3, y: 3.6 },
  { x: 4, y: 3.9 },
  { x: 5, y: 5.0 },
];
// Exact OLS: xbar=3, ybar=3.2, sum(x-3)^2=10, sum(x-3)(y-3.2)=9.0 => m*=0.9, b*=0.5
export function LeastSquaresWidget() {
  const [m, setM] = useState(0.5);
  const [b, setB] = useState(1.2);
  const sse = REG_PTS.reduce((acc, p) => acc + (m * p.x + b - p.y) ** 2, 0);
  const isOpt = Math.abs(m - 0.9) < 0.03 && Math.abs(b - 0.5) < 0.05;

  const sx = (x: number) => 42 + (x / 6) * 260;
  const sy = (y: number) => 205 - (y / 6) * 175;

  return (
    <div className="widget">
      <div className="widget-title">Legkisebb négyzetek módszere: S(m, b) = Σ(mxᵢ + b − yᵢ)² minimalizálása</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 320 230" style={{ width: '100%', maxWidth: 330, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={42} y1={205} x2={305} y2={205} stroke="#64748b" />
          <line x1={42} y1={25} x2={42} y2={205} stroke="#64748b" />
          {/* Residual squares */}
          {REG_PTS.map((pt, idx) => {
            const yhat = m * pt.x + b;
            const x0 = sx(pt.x);
            const y0 = sy(pt.y);
            const y1 = sy(yhat);
            const h = Math.abs(y1 - y0);
            const top = Math.min(y0, y1);
            return (
              <g key={idx}>
                <rect x={x0} y={top} width={h} height={h} fill="rgba(251,146,60,0.22)" stroke="#fb923c" strokeWidth={1} />
                <line x1={x0} y1={y0} x2={x0} y2={y1} stroke="#f87171" strokeWidth={1.8} />
                <circle cx={x0} cy={y0} r={4.5} fill="#38bdf8" stroke="#fff" strokeWidth={1.3} />
              </g>
            );
          })}
          {/* Regression line */}
          <line x1={sx(0.3)} y1={sy(m * 0.3 + b)} x2={sx(5.7)} y2={sy(m * 5.7 + b)} stroke={isOpt ? '#34d399' : '#fbbf24'} strokeWidth={2.4} />
          <text x={52} y={38} fill={isOpt ? '#34d399' : '#fb923c'} fontSize={12.5} fontWeight={700}>
            S(m, b) = {sse.toFixed(3)} {isOpt ? '(GLOBÁLIS MIN!)' : '(min: 0,460)'}
          </text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            Meredekség m = <strong style={{ color: '#38bdf8' }}>{m.toFixed(2)}</strong>
            <input type="range" min={0} max={1.6} step={0.02} value={m} onChange={(e) => setM(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <label>
            Tengelymetszet b = <strong style={{ color: '#fbbf24' }}>{b.toFixed(2)}</strong>
            <input type="range" min={-0.5} max={2.5} step={0.05} value={b} onChange={(e) => setB(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <button
            onClick={() => { setM(0.9); setB(0.5); }}
            style={{ padding: '6px 10px', borderRadius: 8, background: 'rgba(52,211,153,0.16)', color: '#34d399', border: '1px solid #34d399', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
          >
            Optimális egyenes (m* = 0,90, b* = 0,50)
          </button>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>
            A narancssárga négyzetek területeinek összege éppen S(m, b). A ∂S/∂m = 0, ∂S/∂b = 0 egyenletrendszer mindig globális minimumot ad!
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 8. ExtremaDecisionTreeDiagram: Visual master decision flowchart ── */
export function ExtremaDecisionTreeDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">14.7 Mester-döntési fa: szélsőérték-keresés lépésről lépésre</div>
      <svg viewBox="0 0 520 265" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        {/* Step 1 */}
        <rect x={145} y={12} width={230} height={36} rx={9} fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={260} y={34} textAnchor="middle" fill="#e0f2fe" fontSize={12.5} fontWeight={700}>1. Kritikus pontok: f_x = 0 és f_y = 0</text>
        <line x1={260} y1={48} x2={260} y2={68} stroke="#94a3b8" strokeWidth={1.5} />

        {/* Step 2 */}
        <rect x={125} y={68} width={270} height={36} rx={9} fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={260} y={90} textAnchor="middle" fill="#fef3c7" fontSize={12.5} fontWeight={700}>2. Hesse-determináns: D = f_xx·f_yy − (f_xy)²</text>

        {/* Branches */}
        <line x1={185} y1={104} x2={85} y2={132} stroke="#34d399" strokeWidth={1.5} />
        <line x1={260} y1={104} x2={260} y2={132} stroke="#fb923c" strokeWidth={1.5} />
        <line x1={335} y1={104} x2={435} y2={132} stroke="#f87171" strokeWidth={1.5} />

        {/* D > 0 */}
        <rect x={14} y={132} width={150} height={62} rx={9} fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth={1.4} />
        <text x={89} y={151} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight={700}>D &gt; 0 (Szélsőérték)</text>
        <text x={89} y={169} textAnchor="middle" fill="#e2e8f0" fontSize={11}>f_xx &gt; 0 ⇒ Lok. MIN</text>
        <text x={89} y={185} textAnchor="middle" fill="#e2e8f0" fontSize={11}>f_xx &lt; 0 ⇒ Lok. MAX</text>

        {/* D < 0 */}
        <rect x={185} y={132} width={150} height={62} rx={9} fill="rgba(251,146,60,0.15)" stroke="#fb923c" strokeWidth={1.4} />
        <text x={260} y={154} textAnchor="middle" fill="#fb923c" fontSize={12} fontWeight={700}>D &lt; 0</text>
        <text x={260} y={176} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>NYEREGPONT</text>

        {/* D = 0 */}
        <rect x={356} y={132} width={150} height={62} rx={9} fill="rgba(248,113,113,0.15)" stroke="#f87171" strokeWidth={1.4} />
        <text x={431} y={151} textAnchor="middle" fill="#f87171" fontSize={12} fontWeight={700}>D = 0 (Nem dönt)</text>
        <text x={431} y={169} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>Közvetlen előjel-elemzés</text>
        <text x={431} y={185} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>(görbék / teljes négyzet)</text>

        {/* Step 3: Closed bounded domain */}
        <rect x={30} y={210} width={460} height={42} rx={9} fill="rgba(45,212,191,0.13)" stroke="#2dd4bf" strokeWidth={1.4} />
        <text x={260} y={228} textAnchor="middle" fill="#2dd4bf" fontSize={12} fontWeight={700}>3. Ha zárt, korlátos R tartományon keresünk ABSZOLÚT szélsőértéket:</text>
        <text x={260} y={244} textAnchor="middle" fill="#cbd5e1" fontSize={11}>Belső kritikus pontok + Határélek 1D szélsőértékei + Csúcspontok → legnagyobb és legkisebb f érték!</text>
      </svg>
    </div>
  );
}
