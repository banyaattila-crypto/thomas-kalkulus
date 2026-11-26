import { useState } from 'react';

/* ── 1. AreaAsUnitHeightWidget: Area between y = x² and y = a·x ── */
export function AreaAsUnitHeightWidget() {
  const [a, setA] = useState(1.2);
  const area = (a * a * a) / 6;
  const mx = (x: number) => 42 + (x / 2.2) * 215;
  const my = (y: number) => 205 - (y / 4.2) * 175;

  const regPts: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const x = (i / 30) * a;
    regPts.push(`${mx(x).toFixed(1)},${my(x * x).toFixed(1)}`);
  }
  for (let i = 30; i >= 0; i--) {
    const x = (i / 30) * a;
    regPts.push(`${mx(x).toFixed(1)},${my(a * x).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Terület = ∬_R 1 dA: az y = x² és y = a·x görbék közötti tartomány</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 280 225" style={{ width: '100%', maxWidth: 290, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={25} y1={my(0)} x2={265} y2={my(0)} stroke="#64748b" />
          <line x1={mx(0)} y1={18} x2={mx(0)} y2={215} stroke="#64748b" />
          <polygon points={regPts.join(' ')} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={2} />
          {/* Sample vertical strip at x = a/2 */}
          <line x1={mx(a / 2)} y1={my((a * a) / 4)} x2={mx(a / 2)} y2={my((a * a) / 2)} stroke="#34d399" strokeWidth={3} />
          <circle cx={mx(a)} cy={my(a * a)} r={4.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.3} />
          <text x={mx(a) + 7} y={my(a * a) - 5} fill="#fbbf24" fontSize={11} fontWeight={700}>({a.toFixed(1)}, {(a * a).toFixed(2)})</text>
          <text x={14} y={24} fill="#34d399" fontSize={11.5} fontWeight={700}>Ter(R) = ∫₀ᵃ ∫_(x²)^(ax) 1 dy dx = a³/6</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label>
            Meredekség a = <strong style={{ color: '#38bdf8' }}>{a.toFixed(2)}</strong>
            <input type="range" min={0.6} max={2.0} step={0.05} value={a} onChange={(e) => setA(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399' }}>
            <div>Metszéspont: <strong>x = {a.toFixed(2)}</strong></div>
            <div style={{ marginTop: 4 }}>Terület: <strong style={{ color: '#34d399', fontSize: 15 }}>{area.toFixed(3)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2. VariableDensityPlateWidget: 3 density modes on [0,2]×[0,2] ── */
type DensMode = 'const' | 'linear' | 'corner';
const DENS: Record<DensMode, { label: string; formula: string; fn: (x: number, y: number) => number; M: number; xbar: number; ybar: number }> = {
  const: { label: 'Homogén (δ = 1)', formula: 'δ(x,y) = 1', fn: () => 1, M: 4, xbar: 1, ybar: 1 },
  linear: { label: 'Jobbra nehezül (δ = 1 + x)', formula: 'δ(x,y) = 1 + x', fn: (x) => 1 + x, M: 8, xbar: 7 / 6, ybar: 1 },
  corner: { label: 'Sarokba sűrűsödik (δ = 1 + xy)', formula: 'δ(x,y) = 1 + xy', fn: (x, y) => 1 + x * y, M: 8, xbar: 7 / 6, ybar: 7 / 6 },
};

export function VariableDensityPlateWidget() {
  const [mode, setMode] = useState<DensMode>('corner');
  const d = DENS[mode];
  const N = 14;
  const size = 180 / N;
  const cells: JSX.Element[] = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = ((i + 0.5) / N) * 2;
      const y = 2 - ((j + 0.5) / N) * 2;
      const v = d.fn(x, y);
      const alpha = Math.min(0.85, 0.14 + (v / 5) * 0.72);
      cells.push(<rect key={`${i}-${j}`} x={35 + i * size} y={20 + j * size} width={size + 0.5} height={size + 0.5} fill={`rgba(56, 189, 248, ${alpha.toFixed(2)})`} />);
    }
  }
  const cx = 35 + (d.xbar / 2) * 180;
  const cy = 200 - (d.ybar / 2) * 180;

  return (
    <div className="widget">
      <div className="widget-title">Változó sűrűségű lemez az [0, 2]×[0, 2] négyzeten: tömeg és súlypont</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {(Object.keys(DENS) as DensMode[]).map((k) => (
          <button key={k} onClick={() => setMode(k)} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${mode === k ? '#38bdf8' : '#334155'}`, background: mode === k ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: mode === k ? '#38bdf8' : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {DENS[k].label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 245 225" style={{ width: '100%', maxWidth: 250, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          {cells}
          <rect x={35} y={20} width={180} height={180} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
          {/* Geometric center */}
          <circle cx={125} cy={110} r={4} fill="#94a3b8" />
          {/* Center of mass */}
          <circle cx={cx} cy={cy} r={6.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.6} />
          <text x={cx - 28} y={cy - 10} fill="#fbbf24" fontSize={11} fontWeight={700}>(x̄, ȳ)</text>
        </svg>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #38bdf8', fontSize: 13, color: '#e2e8f0', lineHeight: 1.7 }}>
          <div><strong>Sűrűség:</strong> <span style={{ color: '#38bdf8' }}>{d.formula}</span></div>
          <div><strong>Össztömeg:</strong> M = <strong style={{ color: '#34d399' }}>{d.M.toFixed(2)}</strong></div>
          <div><strong>Tömegközéppont:</strong> <strong style={{ color: '#fbbf24' }}>({d.xbar.toFixed(3)}, {d.ybar.toFixed(3)})</strong></div>
          <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 4 }}>
            Szürke pont: geometriai középpont (1, 1). Sárga pont: valódi tömegközéppont (a nehezebb rész felé húzódik!).
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. CenterOfMassBalanceWidget: Triangle (0,0)-(2,0)-(0,2) with δ = 1 + c·x ── */
export function CenterOfMassBalanceWidget() {
  const [c, setC] = useState(1.5);
  // Triangle 0 <= x <= 2, 0 <= y <= 2 - x:
  // ∫∫ 1 dA = 2; ∫∫ x dA = 4/3; ∫∫ x^2 dA = 4/3; ∫∫ y dA = 4/3; ∫∫ xy dA = 2/3
  const M = 2 + c * (4 / 3);
  const My = 4 / 3 + c * (4 / 3);
  const Mx = 4 / 3 + c * (2 / 3);
  const xbar = My / M;
  const ybar = Mx / M;

  const mx = (x: number) => 40 + x * 90;
  const my = (y: number) => 205 - y * 88;

  return (
    <div className="widget">
      <div className="widget-title">Tömegközéppont vándorlása: háromszöglemez δ(x, y) = 1 + c·x sűrűséggel</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 250 225" style={{ width: '100%', maxWidth: 260, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={25} y1={my(0)} x2={235} y2={my(0)} stroke="#64748b" />
          <line x1={mx(0)} y1={18} x2={mx(0)} y2={215} stroke="#64748b" />
          <polygon points={`${mx(0)},${my(0)} ${mx(2)},${my(0)} ${mx(0)},${my(2)}`} fill="rgba(45,212,191,0.18)" stroke="#2dd4bf" strokeWidth={2} />
          {/* Centroid (2/3, 2/3) */}
          <circle cx={mx(2 / 3)} cy={my(2 / 3)} r={4.5} fill="#94a3b8" />
          {/* Center of mass */}
          <circle cx={mx(xbar)} cy={my(ybar)} r={6.5} fill="#fb923c" stroke="#fff" strokeWidth={1.6} />
          <line x1={mx(2 / 3)} y1={my(2 / 3)} x2={mx(xbar)} y2={my(ybar)} stroke="#fbbf24" strokeDasharray="3 2" strokeWidth={1.6} />
          <text x={mx(xbar) + 8} y={my(ybar) - 6} fill="#fb923c" fontSize={11.5} fontWeight={700}>
            ({xbar.toFixed(2)}, {ybar.toFixed(2)})
          </text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            Sűrűség-meredekség c = <strong style={{ color: '#fb923c' }}>{c.toFixed(2)}</strong>
            <input type="range" min={0} max={4} step={0.1} value={c} onChange={(e) => setC(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #2dd4bf', lineHeight: 1.65 }}>
            <div>M = {M.toFixed(2)} · M_y = {My.toFixed(2)} · M_x = {Mx.toFixed(2)}</div>
            <div><strong style={{ color: '#fb923c' }}>x̄ = M_y / M = {xbar.toFixed(3)}</strong></div>
            <div><strong style={{ color: '#38bdf8' }}>ȳ = M_x / M = {ybar.toFixed(3)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 4. SymmetryCentroidWidget: 4 classic homogeneous shapes with centroids ── */
type ShapeKey = 'semi' | 'tri' | 'para' | 'rect';
const SHAPES: Record<ShapeKey, { label: string; xbar: string; ybar: string; note: string }> = {
  semi: { label: 'Félkör (sugár a)', xbar: '0', ybar: '4a / (3π) ≈ 0,424a', note: 'Szimmetriából x̄ = 0; a súlypont a körlap aljához közelebb van!' },
  tri: { label: 'Egyenlő szárú Δ (alap 2a, mag. h)', xbar: '0', ybar: 'h / 3', note: 'Minden homogén háromszög súlypontja a csúcsok átlaga: a magasság alsó harmadánál!' },
  para: { label: 'Parabolikus szelet (y = h(1−x²/a²))', xbar: '0', ybar: '2h / 5 = 0,4h', note: 'Szimmetriából x̄ = 0; a parabolikus „kupola” teltebb, mint a háromszög, így ȳ = 0,4h > h/3.' },
  rect: { label: 'Téglalap (2a × h)', xbar: '0', ybar: 'h / 2', note: 'Két szimmetriatengely metszéspontja: pontosan a középpont.' },
};

export function SymmetryCentroidWidget() {
  const [sh, setSh] = useState<ShapeKey>('semi');
  const cur = SHAPES[sh];
  const cx = 140, baseY = 175, a = 85, h = 115;

  const cy = sh === 'semi' ? baseY - (4 * a) / (3 * Math.PI)
    : sh === 'tri' ? baseY - h / 3
    : sh === 'para' ? baseY - 0.4 * h
    : baseY - h / 2;

  const paraPts = Array.from({ length: 31 }, (_, i) => {
    const u = -1 + (i / 30) * 2;
    return `${(cx + u * a).toFixed(1)},${(baseY - h * (1 - u * u)).toFixed(1)}`;
  }).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Klasszikus homogén síkidomok súlypontja (szimmetria-térkép)</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {(Object.keys(SHAPES) as ShapeKey[]).map((k) => (
          <button key={k} onClick={() => setSh(k)} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${sh === k ? '#34d399' : '#334155'}`, background: sh === k ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: sh === k ? '#34d399' : '#cbd5e1', fontWeight: 700, fontSize: 11.5, cursor: 'pointer' }}>
            {SHAPES[k].label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 280 205" style={{ width: '100%', maxWidth: 280, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={cx} y1={18} x2={cx} y2={190} stroke="#fbbf24" strokeDasharray="4 3" strokeWidth={1.3} />
          <line x1={25} y1={baseY} x2={255} y2={baseY} stroke="#64748b" />
          {sh === 'semi' && <path d={`M ${cx - a} ${baseY} A ${a} ${a} 0 0 1 ${cx + a} ${baseY} Z`} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
          {sh === 'tri' && <polygon points={`${cx - a},${baseY} ${cx + a},${baseY} ${cx},${baseY - h}`} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
          {sh === 'para' && <polygon points={`${cx - a},${baseY} ${paraPts} ${cx + a},${baseY}`} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
          {sh === 'rect' && <rect x={cx - a} y={baseY - h} width={2 * a} height={h} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={2} />}
          <circle cx={cx} cy={cy} r={6} fill="#34d399" stroke="#fff" strokeWidth={1.6} />
          <text x={cx + 10} y={cy + 4} fill="#34d399" fontSize={11.5} fontWeight={700}>Súlypont</text>
        </svg>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #34d399', fontSize: 13, color: '#e2e8f0', lineHeight: 1.65 }}>
          <div><strong>x̄ =</strong> <span style={{ color: '#fbbf24' }}>{cur.xbar}</span></div>
          <div><strong>ȳ =</strong> <span style={{ color: '#34d399' }}>{cur.ybar}</span></div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>{cur.note}</div>
        </div>
      </div>
    </div>
  );
}

/* ── 5. MomentOfInertiaWidget: Rectangle with constant mass M=12, adjustable aspect ratio ── */
export function MomentOfInertiaWidget() {
  const [a, setA] = useState(4.0); // width, area fixed = 12 => b = 12/a
  const M = 12;
  const b = M / a;
  const Ix = (M * b * b) / 12;
  const Iy = (M * a * a) / 12;
  const I0 = Ix + Iy;
  const sc = 24;
  const cx = 140, cy = 105;

  return (
    <div className="widget">
      <div className="widget-title">Tehetetlenségi nyomaték: azonos M = 12 tömegű lemez nyújtása</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 280 210" style={{ width: '100%', maxWidth: 280, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={18} y1={cy} x2={262} y2={cy} stroke="#38bdf8" strokeDasharray="4 3" />
          <line x1={cx} y1={16} x2={cx} y2={194} stroke="#fb923c" strokeDasharray="4 3" />
          <rect x={cx - (a * sc) / 2} y={cy - (b * sc) / 2} width={a * sc} height={b * sc} fill="rgba(52,211,153,0.2)" stroke="#34d399" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={4.5} fill="#fbbf24" />
          <text x={24} y={cy - 6} fill="#38bdf8" fontSize={11}>x-tengely</text>
          <text x={cx + 6} y={28} fill="#fb923c" fontSize={11}>y-tengely</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            Szélesség a = <strong style={{ color: '#34d399' }}>{a.toFixed(1)}</strong> (magasság b = {b.toFixed(2)})
            <input type="range" min={1.8} max={6.5} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #334155', lineHeight: 1.65 }}>
            <div><strong style={{ color: '#38bdf8' }}>I_x = Mb²/12 = {Ix.toFixed(2)}</strong> (x-tengely körül)</div>
            <div><strong style={{ color: '#fb923c' }}>I_y = Ma²/12 = {Iy.toFixed(2)}</strong> (y-tengely körül)</div>
            <div><strong style={{ color: '#fbbf24' }}>I₀ = I_x + I_y = {I0.toFixed(2)}</strong> (origó körül)</div>
          </div>
          <div style={{ fontSize: 11.5, color: '#94a3b8' }}>
            Amint a nő, a tömeg távolabb kerül az y-tengelytől ⇒ I_y négyzetesen megugrik!
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 6. RadiusOfGyrationWidget: Parallel axis theorem I(d) = I_cm + M d² ── */
export function RadiusOfGyrationWidget() {
  const [d, setD] = useState(1.5);
  const M = 6;
  const Icm = 2.0; // e.g. 2x2 square around center: M*4/12 = 2
  const Id = Icm + M * d * d;
  const Rgyr = Math.sqrt(Id / M);

  const sx = (dv: number) => 40 + (dv / 3) * 230;
  const sy = (iv: number) => 175 - (iv / 60) * 145;
  const curve = Array.from({ length: 31 }, (_, i) => {
    const dv = (i / 30) * 3;
    return `${sx(dv).toFixed(1)},${sy(Icm + M * dv * dv).toFixed(1)}`;
  }).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Steiner-tétel (I = I_cm + Md²) és inerciálissugár (R = √(I/M))</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 295 195" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={40} y1={175} x2={278} y2={175} stroke="#64748b" />
          <line x1={40} y1={20} x2={40} y2={175} stroke="#64748b" />
          <polyline points={curve} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
          <circle cx={sx(0)} cy={sy(Icm)} r={4.5} fill="#34d399" />
          <circle cx={sx(d)} cy={sy(Id)} r={5.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.4} />
          <text x={50} y={35} fill="#38bdf8" fontSize={11.5} fontWeight={700}>I(d) = 2 + 6d² = {Id.toFixed(2)}</text>
          <text x={50} y={52} fill="#34d399" fontSize={11}>Minimum mindig a súlypontnál (d = 0)!</text>
          <text x={255} y={189} fill="#94a3b8" fontSize={11}>d</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label>
            Tengelyeltolás d = <strong style={{ color: '#fbbf24' }}>{d.toFixed(2)}</strong>
            <input type="range" min={0} max={3} step={0.1} value={d} onChange={(e) => setD(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: '1px solid #fbbf24', lineHeight: 1.65 }}>
            <div>I_cm = 2,00 · M = 6,00</div>
            <div>I(d) = <strong style={{ color: '#38bdf8' }}>{Id.toFixed(2)}</strong></div>
            <div>Inerciálissugár R = √(I/M) = <strong style={{ color: '#34d399' }}>{Rgyr.toFixed(3)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. ProbabilityCentroidBridgeWidget: Mechanics <-> Probability dictionary ── */
export function ProbabilityCentroidBridgeWidget() {
  const rows = [
    { mech: 'Sűrűség δ(x, y) ≥ 0', prob: 'Együttes sűrűségfüggvény p(x, y) ≥ 0', col: '#38bdf8' },
    { mech: 'Össztömeg M = ∬ δ dA', prob: 'Összvalószínűség ∬ p dA = 1', col: '#34d399' },
    { mech: 'Tömegközéppont (x̄, ȳ)', prob: 'Várható értékek (E[X], E[Y])', col: '#fbbf24' },
    { mech: 'Tehetetlenségi nyomaték I_cm', prob: 'Szórásnégyzet Var(X), Var(Y)', col: '#fb923c' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">A nagy szótár: Mechanika ↔ 2D Valószínűségszámítás</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'center', padding: '8px 12px', borderRadius: 9, background: 'rgba(15,23,42,0.62)', border: `1px solid ${r.col}`, fontSize: 12.5 }}>
            <span style={{ color: r.col, fontWeight: 700 }}>{r.mech}</span>
            <span style={{ color: '#94a3b8', fontWeight: 700 }}>↔</span>
            <span style={{ color: '#e2e8f0' }}>{r.prob}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 8. MomentsMasterTableDiagram: Visual formula sheet ── */
export function MomentsMasterTableDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">15.2 Mester-képlettár: Terület, tömeg, nyomatékok, tehetetlenség</div>
      <svg viewBox="0 0 520 225" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        <rect x={14} y={14} width={238} height={92} rx={10} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.4} />
        <text x={133} y={35} textAnchor="middle" fill="#38bdf8" fontSize={12.5} fontWeight={700}>Terület és Tömeg</text>
        <text x={133} y={58} textAnchor="middle" fill="#f8fafc" fontSize={12}>Ter(R) = ∬_R 1 dA</text>
        <text x={133} y={82} textAnchor="middle" fill="#f8fafc" fontSize={12}>M = ∬_R δ(x, y) dA</text>

        <rect x={268} y={14} width={238} height={92} rx={10} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.4} />
        <text x={387} y={35} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>1. nyomaték & Tömegközéppont</text>
        <text x={387} y={58} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>M_x = ∬ y·δ dA · M_y = ∬ x·δ dA</text>
        <text x={387} y={82} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>x̄ = M_y / M   ·   ȳ = M_x / M</text>

        <rect x={14} y={120} width={238} height={90} rx={10} fill="rgba(251,146,60,0.14)" stroke="#fb923c" strokeWidth={1.4} />
        <text x={133} y={141} textAnchor="middle" fill="#fb923c" fontSize={12.5} fontWeight={700}>Tehetetlenségi nyomatékok</text>
        <text x={133} y={163} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>I_x = ∬ y² δ dA · I_y = ∬ x² δ dA</text>
        <text x={133} y={185} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>I₀ = I_x + I_y = ∬ (x²+y²) δ dA</text>

        <rect x={268} y={120} width={238} height={90} rx={10} fill="rgba(45,212,191,0.14)" stroke="#2dd4bf" strokeWidth={1.4} />
        <text x={387} y={141} textAnchor="middle" fill="#2dd4bf" fontSize={12.5} fontWeight={700}>Inerciálissugár & Steiner</text>
        <text x={387} y={163} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>R_x = √(I_x/M) · R_y = √(I_y/M)</text>
        <text x={387} y={185} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>I_L = I_cm + M·d²</text>
      </svg>
    </div>
  );
}
