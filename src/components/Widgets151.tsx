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

/* ── 1. RiemannSum3DWidget: 3D columns under z = 4 - 0.5x² - 0.5y² on [0,2]×[0,2] ── */
export function RiemannSum3DWidget() {
  const [n, setN] = useState(3);
  const [yawDeg, setYawDeg] = useState(36);
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = 0.48;
  const cx = 195, cy = 175, sc = 42;
  const p = (x: number, y: number, z: number) => proj3D(x - 1, y - 1, z * 0.55, yaw, pitch, cx, cy, sc);

  const f = (x: number, y: number) => 4 - 0.5 * x * x - 0.5 * y * y;
  const step = 2 / n;
  const dA = step * step;
  let riemann = 0;

  const cols: { key: string; depth: number; el: JSX.Element }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x0 = i * step, x1 = (i + 1) * step;
      const y0 = j * step, y1 = (j + 1) * step;
      const xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      const h = f(xm, ym);
      riemann += h * dA;

      const b00 = p(x0, y0, 0), b10 = p(x1, y0, 0), b11 = p(x1, y1, 0), b01 = p(x0, y1, 0);
      const t00 = p(x0, y0, h), t10 = p(x1, y0, h), t11 = p(x1, y1, h), t01 = p(x0, y1, h);
      const poly = (...pts: { sx: number; sy: number }[]) => pts.map((q) => `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`).join(' ');
      const depth = (xm - 1) * Math.sin(yaw) + (ym - 1) * Math.cos(yaw);

      cols.push({
        key: `${i}-${j}`,
        depth,
        el: (
          <g key={`${i}-${j}`}>
            <polygon points={poly(b00, b10, t10, t00)} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={0.8} />
            <polygon points={poly(b10, b11, t11, t10)} fill="rgba(45,212,191,0.25)" stroke="#2dd4bf" strokeWidth={0.8} />
            <polygon points={poly(b01, b11, t11, t01)} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={0.8} />
            <polygon points={poly(t00, t10, t11, t01)} fill="rgba(52,211,153,0.42)" stroke="#34d399" strokeWidth={1} />
          </g>
        ),
      });
    }
  }
  cols.sort((a, b) => a.depth - b.depth);
  const exact = 32 / 3; // ∫_0^2 ∫_0^2 (4 - 0.5x^2 - 0.5y^2) dx dy = 16 - 8/3 - 8/3 = 32/3

  return (
    <div className="widget">
      <div className="widget-title">Kétváltozós Riemann-összeg: {n}×{n} = {n * n} hasáb a z = 4 − ½x² − ½y² felület alatt</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {[2, 3, 4, 6].map((k) => (
          <button key={k} onClick={() => setN(k)} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${n === k ? '#34d399' : '#334155'}`, background: n === k ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: n === k ? '#34d399' : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {k}×{k} felosztás
          </button>
        ))}
      </div>
      <svg viewBox="0 0 390 235" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {cols.map((c) => c.el)}
        <text x={14} y={24} fill="#34d399" fontSize={12.5} fontWeight={700}>
          Középponti Riemann-összeg: S = {riemann.toFixed(4)}
        </text>
        <text x={14} y={42} fill="#fbbf24" fontSize={11.5}>
          Pontos térfogat V = 32/3 ≈ {exact.toFixed(4)} · Hiba: {Math.abs(riemann - exact).toFixed(4)}
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Forgatás ({yawDeg}°):</span>
        <input type="range" min={-140} max={140} value={yawDeg} onChange={(e) => setYawDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 2. FubiniSlicing3DWidget: Interactive cross-section slicing dy dx vs dx dy ── */
export function FubiniSlicing3DWidget() {
  const [order, setOrder] = useState<'dydx' | 'dxdy'>('dydx');
  const [pos, setPos] = useState(1.0); // 0..2
  const yaw = 0.62, pitch = 0.45, cx = 190, cy = 165, sc = 44;
  const p = (x: number, y: number, z: number) => proj3D(x - 1, y - 1, z * 0.6, yaw, pitch, cx, cy, sc);
  const f = (x: number, y: number) => 3 - 0.5 * x * x - 0.5 * y;

  // Surface wireframe
  const grid = [0, 0.5, 1, 1.5, 2];
  const wire: JSX.Element[] = [];
  grid.forEach((u, i) => {
    const pts1 = grid.map((v) => { const q = p(u, v, f(u, v)); return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`; }).join(' ');
    const pts2 = grid.map((v) => { const q = p(v, u, f(v, u)); return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`; }).join(' ');
    wire.push(
      <polyline key={`a-${i}`} points={pts1} fill="none" stroke="#64748b" strokeOpacity={0.55} />,
      <polyline key={`b-${i}`} points={pts2} fill="none" stroke="#64748b" strokeOpacity={0.55} />
    );
  });

  // Active slice polygon
  const slicePts: string[] = [];
  if (order === 'dydx') {
    const b0 = p(pos, 0, 0);
    slicePts.push(`${b0.sx.toFixed(1)},${b0.sy.toFixed(1)}`);
    for (let j = 0; j <= 20; j++) {
      const y = (j / 20) * 2;
      const q = p(pos, y, f(pos, y));
      slicePts.push(`${q.sx.toFixed(1)},${q.sy.toFixed(1)}`);
    }
    const b1 = p(pos, 2, 0);
    slicePts.push(`${b1.sx.toFixed(1)},${b1.sy.toFixed(1)}`);
  } else {
    const b0 = p(0, pos, 0);
    slicePts.push(`${b0.sx.toFixed(1)},${b0.sy.toFixed(1)}`);
    for (let j = 0; j <= 20; j++) {
      const x = (j / 20) * 2;
      const q = p(x, pos, f(x, pos));
      slicePts.push(`${q.sx.toFixed(1)},${q.sy.toFixed(1)}`);
    }
    const b1 = p(2, pos, 0);
    slicePts.push(`${b1.sx.toFixed(1)},${b1.sy.toFixed(1)}`);
  }

  // Exact slice area:
  // If x=pos fixed: ∫_0^2 (3 - 0.5x^2 - 0.5y) dy = 6 - x^2 - 1 = 5 - x^2
  // If y=pos fixed: ∫_0^2 (3 - 0.5x^2 - 0.5y) dx = 6 - 4/3 - y = 14/3 - y
  const area = order === 'dydx' ? 5 - pos * pos : 14 / 3 - pos;

  return (
    <div className="widget">
      <div className="widget-title">Fubini-szeletelés: z = 3 − ½x² − ½y az [0, 2]×[0, 2] négyzeten</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <button onClick={() => setOrder('dydx')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${order === 'dydx' ? '#38bdf8' : '#334155'}`, background: order === 'dydx' ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: '#38bdf8', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Előbb y, majd x (dy dx): A(x) = 5 − x²
        </button>
        <button onClick={() => setOrder('dxdy')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${order === 'dxdy' ? '#fbbf24' : '#334155'}`, background: order === 'dxdy' ? 'rgba(251,191,36,0.16)' : 'rgba(15,23,42,0.55)', color: '#fbbf24', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Előbb x, majd y (dx dy): A(y) = 14/3 − y
        </button>
      </div>
      <svg viewBox="0 0 380 225" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {wire}
        <polygon points={slicePts.join(' ')} fill={order === 'dydx' ? 'rgba(56,189,248,0.35)' : 'rgba(251,191,36,0.35)'} stroke={order === 'dydx' ? '#38bdf8' : '#fbbf24'} strokeWidth={2} />
        <text x={14} y={24} fill={order === 'dydx' ? '#38bdf8' : '#fbbf24'} fontSize={12.5} fontWeight={700}>
          {order === 'dydx' ? `Szelet x = ${pos.toFixed(2)}-nél: A(x) = ${area.toFixed(2)}` : `Szelet y = ${pos.toFixed(2)}-nél: A(y) = ${area.toFixed(2)}`}
        </text>
        <text x={14} y={42} fill="#34d399" fontSize={11.5}>
          Mindkét sorrendben a teljes térfogat: V = 22/3 ≈ 7,333
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>{order === 'dydx' ? `x = ${pos.toFixed(2)}` : `y = ${pos.toFixed(2)}`}:</span>
        <input type="range" min={0} max={2} step={0.05} value={pos} onChange={(e) => setPos(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 3. Type1VsType2DomainWidget: Lens between y = x² and y = x ── */
export function Type1VsType2DomainWidget() {
  const [tp, setTp] = useState<1 | 2>(1);
  const mx = (x: number) => 45 + x * 195;
  const my = (y: number) => 205 - y * 170;

  const regionPts: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const x = i / 30;
    regionPts.push(`${mx(x).toFixed(1)},${my(x * x).toFixed(1)}`);
  }
  for (let i = 30; i >= 0; i--) {
    const x = i / 30;
    regionPts.push(`${mx(x).toFixed(1)},${my(x).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">I. típus (dy dx) vs. II. típus (dx dy): az y = x² és y = x közötti tartomány</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <button onClick={() => setTp(1)} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${tp === 1 ? '#34d399' : '#334155'}`, background: tp === 1 ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: '#34d399', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          I. típus: függőleges nyilak (dy dx)
        </button>
        <button onClick={() => setTp(2)} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${tp === 2 ? '#fb923c' : '#334155'}`, background: tp === 2 ? 'rgba(251,146,60,0.16)' : 'rgba(15,23,42,0.55)', color: '#fb923c', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          II. típus: vízszintes nyilak (dx dy)
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 275 230" style={{ width: '100%', maxWidth: 280, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={30} y1={my(0)} x2={258} y2={my(0)} stroke="#64748b" />
          <line x1={mx(0)} y1={20} x2={mx(0)} y2={215} stroke="#64748b" />
          <polygon points={regionPts.join(' ')} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={2} />
          {tp === 1 ? (
            [0.2, 0.4, 0.6, 0.8].map((x) => (
              <g key={x}>
                <line x1={mx(x)} y1={my(x * x)} x2={mx(x)} y2={my(x)} stroke="#34d399" strokeWidth={2.2} />
                <circle cx={mx(x)} cy={my(x * x)} r={3} fill="#fbbf24" />
                <circle cx={mx(x)} cy={my(x)} r={3} fill="#34d399" />
              </g>
            ))
          ) : (
            [0.15, 0.35, 0.55, 0.78].map((y) => (
              <g key={y}>
                <line x1={mx(y)} y1={my(y)} x2={mx(Math.sqrt(y))} y2={my(y)} stroke="#fb923c" strokeWidth={2.2} />
                <circle cx={mx(y)} cy={my(y)} r={3} fill="#fbbf24" />
                <circle cx={mx(Math.sqrt(y))} cy={my(y)} r={3} fill="#fb923c" />
              </g>
            ))
          )}
          <text x={mx(1) - 18} y={my(1) - 8} fill="#e2e8f0" fontSize={11} fontWeight={700}>(1, 1)</text>
          <text x={mx(0.5) - 32} y={my(0.72)} fill="#38bdf8" fontSize={11}>y = x</text>
          <text x={mx(0.68)} y={my(0.28)} fill="#38bdf8" fontSize={11}>y = x²</text>
        </svg>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: `1px solid ${tp === 1 ? '#34d399' : '#fb923c'}`, fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.7 }}>
          {tp === 1 ? (
            <>
              <div style={{ color: '#34d399', fontWeight: 700 }}>I. típusú felírás (dy dx):</div>
              <div>• Külső (x): <strong>0 → 1</strong></div>
              <div>• Belső belépés (alul): <strong>y = x²</strong></div>
              <div>• Belső kilépés (felül): <strong>y = x</strong></div>
              <div style={{ marginTop: 6, color: '#38bdf8' }}>∫₀¹ ∫_(x²)^x f(x, y) dy dx</div>
            </>
          ) : (
            <>
              <div style={{ color: '#fb923c', fontWeight: 700 }}>II. típusú felírás (dx dy):</div>
              <div>• Külső (y): <strong>0 → 1</strong></div>
              <div>• Belső belépés (balról): <strong>x = y</strong></div>
              <div>• Belső kilépés (jobbról): <strong>x = √y</strong></div>
              <div style={{ marginTop: 6, color: '#38bdf8' }}>∫₀¹ ∫_y^(√y) f(x, y) dx dy</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 4. ArrowSweepBoundsWidget: Interactive ray sweeping y = x to y = 2 - x² ── */
export function ArrowSweepBoundsWidget() {
  const [x0, setX0] = useState(-0.5);
  const yLow = x0;
  const yHigh = 2 - x0 * x0;
  const mx = (x: number) => 175 + x * 62;
  const my = (y: number) => 150 - y * 44;

  const regPts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = -2 + (i / 40) * 3;
    regPts.push(`${mx(x).toFixed(1)},${my(2 - x * x).toFixed(1)}`);
  }
  regPts.push(`${mx(1).toFixed(1)},${my(1).toFixed(1)}`, `${mx(-2).toFixed(1)},${my(-2).toFixed(1)}`);

  return (
    <div className="widget">
      <div className="widget-title">„Lőj nyilat!” — belépési és kilépési határok az y = x és y = 2 − x² között</div>
      <svg viewBox="0 0 320 250" style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        <line x1={25} y1={my(0)} x2={295} y2={my(0)} stroke="#475569" strokeDasharray="3 3" />
        <line x1={mx(0)} y1={18} x2={mx(0)} y2={240} stroke="#475569" strokeDasharray="3 3" />
        <polygon points={regPts.join(' ')} fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth={2} />
        {/* Vertical arrow at x0 */}
        <line x1={mx(x0)} y1={my(yLow)} x2={mx(x0)} y2={my(yHigh)} stroke="#34d399" strokeWidth={2.8} />
        <circle cx={mx(x0)} cy={my(yLow)} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.3} />
        <circle cx={mx(x0)} cy={my(yHigh)} r={5} fill="#34d399" stroke="#0f172a" strokeWidth={1.3} />
        <text x={14} y={24} fill="#34d399" fontSize={12} fontWeight={700}>
          x = {x0.toFixed(2)}: belép y = {yLow.toFixed(2)} → kilép y = {yHigh.toFixed(2)}
        </text>
        <text x={14} y={42} fill="#cbd5e1" fontSize={11}>
          Metszéspontok: x = 2 − x² ⇒ x = −2 és x = 1
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Nyíl helye x = {x0.toFixed(2)} (−2 ≤ x ≤ 1):</span>
        <input type="range" min={-1.95} max={0.95} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 5. OrderSwapMagicWidget: Swapping ∫_0^1 ∫_x^1 (sin y)/y dy dx ── */
export function OrderSwapMagicWidget() {
  const [swapped, setSwapped] = useState(false);
  const mx = (x: number) => 45 + x * 170;
  const my = (y: number) => 195 - y * 155;

  return (
    <div className="widget">
      <div className="widget-title">Sorrendcsere-varázslat: ∫₀¹ ∫ₓ¹ (sin y / y) dy dx</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <button onClick={() => setSwapped(false)} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${!swapped ? '#f87171' : '#334155'}`, background: !swapped ? 'rgba(248,113,113,0.16)' : 'rgba(15,23,42,0.55)', color: '#f87171', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          1. Eredeti sorrend (dy dx — ELAKAD!)
        </button>
        <button onClick={() => setSwapped(true)} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${swapped ? '#34d399' : '#334155'}`, background: swapped ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: '#34d399', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          2. Felcserélt sorrend (dx dy — 2 SOR!)
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 250 220" style={{ width: '100%', maxWidth: 260, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={30} y1={my(0)} x2={230} y2={my(0)} stroke="#64748b" />
          <line x1={mx(0)} y1={20} x2={mx(0)} y2={205} stroke="#64748b" />
          {/* Triangle 0 <= x <= y <= 1 */}
          <polygon points={`${mx(0)},${my(0)} ${mx(0)},${my(1)} ${mx(1)},${my(1)}`} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={2} />
          {!swapped ? (
            [0.2, 0.45, 0.7].map((x) => (
              <line key={x} x1={mx(x)} y1={my(x)} x2={mx(x)} y2={my(1)} stroke="#f87171" strokeWidth={2.2} />
            ))
          ) : (
            [0.25, 0.5, 0.75].map((y) => (
              <line key={y} x1={mx(0)} y1={my(y)} x2={mx(y)} y2={my(y)} stroke="#34d399" strokeWidth={2.2} />
            ))
          )}
          <text x={mx(1) - 18} y={my(1) - 6} fill="#e2e8f0" fontSize={11} fontWeight={700}>(1, 1)</text>
          <text x={mx(0.55)} y={my(0.35)} fill="#38bdf8" fontSize={11}>y = x</text>
        </svg>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: `1px solid ${swapped ? '#34d399' : '#f87171'}`, fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.7 }}>
          {!swapped ? (
            <>
              <div style={{ color: '#f87171', fontWeight: 700 }}>Eredeti: 0 ≤ x ≤ 1, x ≤ y ≤ 1</div>
              <div>A belső ∫ (sin y / y) dy integrálnak <strong>nincs elemi primitív függvénye</strong>!</div>
            </>
          ) : (
            <>
              <div style={{ color: '#34d399', fontWeight: 700 }}>Felcserélve: 0 ≤ y ≤ 1, 0 ≤ x ≤ y</div>
              <div>Belső: ∫₀ʸ (sin y / y) dx = (sin y / y) · y = <strong>sin y</strong>!</div>
              <div>Külső: ∫₀¹ sin y dy = <strong>1 − cos 1 ≈ 0,4597</strong>!</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 6. AverageValueTankWidget: Melting z = x² + y² into flat average level ── */
export function AverageValueTankWidget() {
  const [melt, setMelt] = useState(0); // 0 = exact surface, 1 = flat average
  const avg = 8 / 3; // (1/4) * ∫_0^2 ∫_0^2 (x^2+y^2) dx dy = (1/4)*(32/3) = 8/3
  const yaw = 0.58, pitch = 0.46, cx = 190, cy = 175, sc = 42;
  const p = (x: number, y: number, z: number) => proj3D(x - 1, y - 1, z * 0.32, yaw, pitch, cx, cy, sc);
  const f = (x: number, y: number) => (1 - melt) * (x * x + y * y) + melt * avg;

  const grid = [0, 0.5, 1, 1.5, 2];
  const lines: JSX.Element[] = [];
  grid.forEach((u, i) => {
    const pts1 = grid.map((v) => { const q = p(u, v, f(u, v)); return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`; }).join(' ');
    const pts2 = grid.map((v) => { const q = p(v, u, f(v, u)); return `${q.sx.toFixed(1)},${q.sy.toFixed(1)}`; }).join(' ');
    lines.push(
      <polyline key={`u-${i}`} points={pts1} fill="none" stroke={melt > 0.9 ? '#34d399' : '#38bdf8'} strokeWidth={1.6} />,
      <polyline key={`v-${i}`} points={pts2} fill="none" stroke={melt > 0.9 ? '#34d399' : '#38bdf8'} strokeWidth={1.6} />
    );
  });

  return (
    <div className="widget">
      <div className="widget-title">2D átlagérték = „vízszint-kiegyenlítés” (z = x² + y² az [0, 2]×[0, 2] négyzeten)</div>
      <svg viewBox="0 0 380 225" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {lines}
        <text x={14} y={24} fill={melt > 0.9 ? '#34d399' : '#38bdf8'} fontSize={12.5} fontWeight={700}>
          Térfogat állandó: V = 32/3 ≈ 10,67 · Átlagmagasság f̄ = V / 4 = 8/3 ≈ 2,67
        </text>
        <text x={14} y={42} fill="#cbd5e1" fontSize={11.5}>
          {melt > 0.9 ? 'Teljesen kisimult vízfelszín: magassága pontosan az átlagérték!' : 'Húzd a csúszkát, és „olvaszd szét” a paraboloidot állandó térfogat mellett!'}
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Kiegyenlítés ({Math.round(melt * 100)}%):</span>
        <input type="range" min={0} max={1} step={0.05} value={melt} onChange={(e) => setMelt(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 7. SplitVsSingleOrderWidget: Triangle (0,0)-(2,0)-(1,1) needs 2 pieces in dy dx, 1 in dx dy ── */
export function SplitVsSingleOrderWidget() {
  const [ord, setOrd] = useState<'dydx' | 'dxdy'>('dxdy');
  const mx = (x: number) => 40 + x * 105;
  const my = (y: number) => 175 - y * 125;

  return (
    <div className="widget">
      <div className="widget-title">Okos sorrendválasztás: 2 részintegrál helyett 1etlen!</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <button onClick={() => setOrd('dydx')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${ord === 'dydx' ? '#fb923c' : '#334155'}`, background: ord === 'dydx' ? 'rgba(251,146,60,0.16)' : 'rgba(15,23,42,0.55)', color: '#fb923c', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          dy dx: 2 DARABRA KELL VÁGNI!
        </button>
        <button onClick={() => setOrd('dxdy')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${ord === 'dxdy' ? '#34d399' : '#334155'}`, background: ord === 'dxdy' ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: '#34d399', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          dx dy: EGYETLEN INTEGRÁL!
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 280 205" style={{ width: '100%', maxWidth: 290, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={20} y1={my(0)} x2={265} y2={my(0)} stroke="#64748b" />
          <line x1={mx(0)} y1={20} x2={mx(0)} y2={190} stroke="#64748b" />
          <polygon points={`${mx(0)},${my(0)} ${mx(2)},${my(0)} ${mx(1)},${my(1)}`} fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth={2} />
          {ord === 'dydx' ? (
            <>
              <line x1={mx(1)} y1={my(0)} x2={mx(1)} y2={my(1)} stroke="#f87171" strokeWidth={2} strokeDasharray="4 3" />
              {[0.35, 0.7].map((x) => <line key={x} x1={mx(x)} y1={my(0)} x2={mx(x)} y2={my(x)} stroke="#fb923c" strokeWidth={2} />)}
              {[1.3, 1.65].map((x) => <line key={x} x1={mx(x)} y1={my(0)} x2={mx(x)} y2={my(2 - x)} stroke="#fbbf24" strokeWidth={2} />)}
            </>
          ) : (
            [0.25, 0.5, 0.75].map((y) => (
              <line key={y} x1={mx(y)} y1={my(y)} x2={mx(2 - y)} y2={my(y)} stroke="#34d399" strokeWidth={2.2} />
            ))
          )}
          <text x={mx(1) - 16} y={my(1) - 8} fill="#e2e8f0" fontSize={11} fontWeight={700}>(1, 1)</text>
          <text x={mx(2) - 12} y={my(0) + 16} fill="#e2e8f0" fontSize={11}>(2, 0)</text>
        </svg>
        <div style={{ padding: '11px 13px', borderRadius: 10, background: 'rgba(15,23,42,0.68)', border: `1px solid ${ord === 'dxdy' ? '#34d399' : '#fb923c'}`, fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.65 }}>
          {ord === 'dydx' ? (
            <>
              <strong style={{ color: '#fb923c' }}>dy dx esetén a felső határ megtörik x = 1-nél:</strong><br />
              ∫₀¹ ∫₀ˣ f dy dx + ∫₁² ∫₀^(2−x) f dy dx
            </>
          ) : (
            <>
              <strong style={{ color: '#34d399' }}>dx dy esetén végig egyetlen bal és jobb él:</strong><br />
              ∫₀¹ ∫_y^(2−y) f(x, y) dx dy — feleannyi munka!
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 8. DoubleIntegralSummaryDiagram: Master roadmap ── */
export function DoubleIntegralSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">15.1 Mester-térkép: Kettős integrálok felállítása és kiszámítása</div>
      <svg viewBox="0 0 520 220" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.5)', borderRadius: 12 }}>
        <rect x={14} y={14} width={238} height={88} rx={10} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.4} />
        <text x={133} y={35} textAnchor="middle" fill="#38bdf8" fontSize={12.5} fontWeight={700}>1. Téglalap (Fubini)</text>
        <text x={133} y={56} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>∫ₐᵇ ∫_cᵈ f dy dx = ∫_cᵈ ∫ₐᵇ f dx dy</text>
        <text x={133} y={78} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>Szorzat: g(x)h(y) → két 1D integrál szorzata!</text>

        <rect x={268} y={14} width={238} height={88} rx={10} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.4} />
        <text x={387} y={35} textAnchor="middle" fill="#34d399" fontSize={12.5} fontWeight={700}>2. Általános R tartomány</text>
        <text x={387} y={56} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>Rajzold → Lőj nyilat → Olvasd le!</text>
        <text x={387} y={78} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>Külső határok MINDIG konstansok!</text>

        <rect x={14} y={118} width={238} height={88} rx={10} fill="rgba(251,191,36,0.14)" stroke="#fbbf24" strokeWidth={1.4} />
        <text x={133} y={140} textAnchor="middle" fill="#fbbf24" fontSize={12.5} fontWeight={700}>3. Sorrendcsere</text>
        <text x={133} y={162} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>Rajzold fel R-et az egyenlőtlenségekből!</text>
        <text x={133} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>Pl. sin(y)/y vagy e^(x²) integrálásához!</text>

        <rect x={268} y={118} width={238} height={88} rx={10} fill="rgba(45,212,191,0.14)" stroke="#2dd4bf" strokeWidth={1.4} />
        <text x={387} y={140} textAnchor="middle" fill="#2dd4bf" fontSize={12.5} fontWeight={700}>4. Térfogat és átlagérték</text>
        <text x={387} y={162} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>V = ∬ (f_felső − f_alsó) dA</text>
        <text x={387} y={184} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>f̄ = (1 / Ter(R)) ∬_R f dA</text>
      </svg>
    </div>
  );
}
