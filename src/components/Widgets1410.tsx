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

/* ── 1. Taylor1DTo2DSegmentWidget: g(t) = f(a+th, b+tk) reduction ── */
export function Taylor1DTo2DSegmentWidget() {
  const [h, setH] = useState(0.7);
  const [k, setK] = useState(0.5);
  const [t, setT] = useState(1.0);

  // f(x,y) = e^x * cos(y) around (0,0): f(0,0)=1, fx=1, fy=0, fxx=1, fxy=0, fyy=-1
  const f = (x: number, y: number) => Math.exp(x) * Math.cos(y);
  const gVal = f(t * h, t * k);
  const gLin = 1 + t * h;
  const gQuad = 1 + t * h + 0.5 * (t * h) ** 2 - 0.5 * (t * k) ** 2;

  const sx = (tv: number) => 40 + tv * 240;
  const sy = (v: number) => 170 - (v - 0.5) * 65;

  const exactPts: string[] = [];
  const linPts: string[] = [];
  const quadPts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const tv = i / 40;
    exactPts.push(`${sx(tv).toFixed(1)},${sy(f(tv * h, tv * k)).toFixed(1)}`);
    linPts.push(`${sx(tv).toFixed(1)},${sy(1 + tv * h).toFixed(1)}`);
    quadPts.push(`${sx(tv).toFixed(1)},${sy(1 + tv * h + 0.5 * (tv * h) ** 2 - 0.5 * (tv * k) ** 2).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">1D visszavezetés: g(t) = f(t·h, t·k) az f(x, y) = eˣ cos y függvényre</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, alignItems: 'center' }}>
        <svg viewBox="0 0 310 205" style={{ width: '100%', maxWidth: 320, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
          <line x1={40} y1={170} x2={290} y2={170} stroke="#64748b" />
          <line x1={40} y1={20} x2={40} y2={170} stroke="#64748b" />
          <polyline points={exactPts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
          <polyline points={linPts.join(' ')} fill="none" stroke="#fb923c" strokeWidth={1.8} strokeDasharray="5 3" />
          <polyline points={quadPts.join(' ')} fill="none" stroke="#34d399" strokeWidth={2.2} />
          <circle cx={sx(t)} cy={sy(gVal)} r={4.5} fill="#38bdf8" stroke="#fff" strokeWidth={1.2} />
          <circle cx={sx(t)} cy={sy(gQuad)} r={4} fill="#34d399" />
          <text x={50} y={32} fill="#38bdf8" fontSize={11} fontWeight={700}>Cián: pontos g(t)</text>
          <text x={50} y={48} fill="#34d399" fontSize={11} fontWeight={700}>Zöld: 2. fokú Q(t)</text>
          <text x={50} y={64} fill="#fb923c" fontSize={11} fontWeight={700}>Narancs: 1. fokú L(t)</text>
          <text x={270} y={186} fill="#94a3b8" fontSize={11}>t</text>
        </svg>
        <div style={{ fontSize: 12.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label>h = <strong style={{ color: '#38bdf8' }}>{h.toFixed(2)}</strong><input type="range" min={-0.8} max={0.9} step={0.05} value={h} onChange={(e) => setH(Number(e.target.value))} style={{ width: '100%' }} /></label>
          <label>k = <strong style={{ color: '#2dd4bf' }}>{k.toFixed(2)}</strong><input type="range" min={-1.0} max={1.0} step={0.05} value={k} onChange={(e) => setK(Number(e.target.value))} style={{ width: '100%' }} /></label>
          <label>t = <strong style={{ color: '#fbbf24' }}>{t.toFixed(2)}</strong><input type="range" min={0} max={1} step={0.05} value={t} onChange={(e) => setT(Number(e.target.value))} style={{ width: '100%' }} /></label>
          <div style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(15,23,42,0.68)', border: '1px solid #334155', fontSize: 12 }}>
            Pontos: <strong>{gVal.toFixed(4)}</strong><br />
            Lineáris hiba: <strong style={{ color: '#fb923c' }}>{Math.abs(gVal - gLin).toFixed(4)}</strong><br />
            Kvadratikus hiba: <strong style={{ color: '#34d399' }}>{Math.abs(gVal - gQuad).toFixed(4)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2. QuadraticApprox3DWidget: 3D surface vs Linear vs Quadratic for e^x cos y ── */
export function QuadraticApprox3DWidget() {
  const [showMode, setShowMode] = useState<'quad' | 'lin'>('quad');
  const [yawDeg, setYawDeg] = useState(35);
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = 0.45;
  const cx = 215, cy = 148, sc = 65;
  const grid = [-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9];

  const exactZ = (x: number, y: number) => Math.exp(x) * Math.cos(y) - 1;
  const approxZ = (x: number, y: number) => showMode === 'lin' ? x : x + 0.5 * x * x - 0.5 * y * y;

  const lines: JSX.Element[] = [];
  grid.forEach((u, ui) => {
    const ePts = grid.map((v) => {
      const p = proj3D(u, v, exactZ(u, v), yaw, pitch, cx, cy, sc);
      return `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`;
    }).join(' ');
    const aPts = grid.map((v) => {
      const p = proj3D(u, v, approxZ(u, v), yaw, pitch, cx, cy, sc);
      return `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`;
    }).join(' ');
    lines.push(
      <polyline key={`e-${ui}`} points={ePts} fill="none" stroke="#38bdf8" strokeOpacity={0.65} strokeWidth={1.3} />,
      <polyline key={`a-${ui}`} points={aPts} fill="none" stroke={showMode === 'quad' ? '#34d399' : '#fb923c'} strokeOpacity={0.85} strokeWidth={1.4} strokeDasharray="3 2" />
    );
  });

  const p0 = proj3D(0, 0, 0, yaw, pitch, cx, cy, sc);

  return (
    <div className="widget">
      <div className="widget-title">3D összehasonlítás: f(x, y) = eˣ cos y vs. érintősík és másodfokú paraboloid</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <button onClick={() => setShowMode('lin')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${showMode === 'lin' ? '#fb923c' : '#334155'}`, background: showMode === 'lin' ? 'rgba(251,146,60,0.16)' : 'rgba(15,23,42,0.55)', color: '#fb923c', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          1. fokú: L(x,y) = 1 + x
        </button>
        <button onClick={() => setShowMode('quad')} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${showMode === 'quad' ? '#34d399' : '#334155'}`, background: showMode === 'quad' ? 'rgba(52,211,153,0.16)' : 'rgba(15,23,42,0.55)', color: '#34d399', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          2. fokú: Q(x,y) = 1 + x + ½x² − ½y²
        </button>
      </div>
      <svg viewBox="0 0 430 250" style={{ width: '100%', maxWidth: 450, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {lines}
        <circle cx={p0.sx} cy={p0.sy} r={5} fill="#fbbf24" stroke="#fff" strokeWidth={1.5} />
        <text x={14} y={24} fill="#38bdf8" fontSize={12} fontWeight={700}>Cián rács: pontos f(x, y) = eˣ cos y</text>
        <text x={14} y={42} fill={showMode === 'quad' ? '#34d399' : '#fb923c'} fontSize={12} fontWeight={700}>
          {showMode === 'quad' ? 'Zöld szaggatott: Q(x, y) — együtt hajlik a felülettel!' : 'Narancs szaggatott: L(x, y) — lapos érintősík'}
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Forgatás ({yawDeg}°):</span>
        <input type="range" min={-160} max={160} value={yawDeg} onChange={(e) => setYawDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 3. PascalDerivativeTriangleWidget: m-th order operator expansion ── */
const ORDER_DATA: Record<number, { fact: string; terms: string[]; note: string }> = {
  1: { fact: '1 / 1!', terms: ['1·h f_x', '1·k f_y'], note: 'Elsőrendű (lineáris) tag: az érintősík meredekségei.' },
  2: { fact: '1 / 2!', terms: ['1·h² f_xx', '2·hk f_xy', '1·k² f_yy'], note: 'Másodrendű (kvadratikus) tag: a Hesse-mátrix és a görbületek!' },
  3: { fact: '1 / 3!', terms: ['1·h³ f_xxx', '3·h²k f_xxy', '3·hk² f_xyy', '1·k³ f_yyy'], note: 'Harmadrendű (köbös) tag: Pascal-együtthatók 1, 3, 3, 1.' },
  4: { fact: '1 / 4!', terms: ['1·h⁴ f_xxxx', '4·h³k f_xxxy', '6·h²k² f_xxyy', '4·hk³ f_xyyy', '1·k⁴ f_yyyy'], note: 'Negyedrendű tag: Pascal-együtthatók 1, 4, 6, 4, 1 (Clairaut-szimmetria miatt!).' },
};

export function PascalDerivativeTriangleWidget() {
  const [m, setM] = useState(3);
  const cur = ORDER_DATA[m];
  return (
    <div className="widget">
      <div className="widget-title">A binomiális operátor (h·∂/∂x + k·∂/∂y)ᵐ f / m! kibontása</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        {[1, 2, 3, 4].map((ord) => (
          <button key={ord} onClick={() => setM(ord)} style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${m === ord ? '#38bdf8' : '#334155'}`, background: m === ord ? 'rgba(56,189,248,0.16)' : 'rgba(15,23,42,0.55)', color: m === ord ? '#38bdf8' : '#cbd5e1', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            m = {ord}
          </button>
        ))}
      </div>
      <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(15,23,42,0.65)', border: '1px solid #38bdf8', fontSize: 13, color: '#e2e8f0' }}>
        <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: 8 }}>
          {cur.fact} · ( {cur.terms.join('  +  ')} )
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          {cur.terms.map((t, idx) => (
            <span key={idx} style={{ padding: '4px 9px', borderRadius: 7, background: 'rgba(52,211,153,0.14)', border: '1px solid #34d399', color: '#34d399', fontSize: 12, fontWeight: 600 }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>{cur.note}</div>
      </div>
    </div>
  );
}

/* ── 4. TaylorProductShortcutWidget: Degree filter for (1+x+x²+...)(1+y+y²+...) ── */
export function TaylorProductShortcutWidget() {
  const [deg, setDeg] = useState(2);
  const terms: string[] = [];
  for (let s = 0; s <= deg; s++) {
    for (let i = s; i >= 0; i--) {
      const j = s - i;
      if (i === 0 && j === 0) terms.push('1');
      else {
        const px = i === 0 ? '' : i === 1 ? 'x' : `x^${i}`;
        const py = j === 0 ? '' : j === 1 ? 'y' : `y^${j}`;
        terms.push(`${px}${py}`);
      }
    }
  }

  return (
    <div className="widget">
      <div className="widget-title">Profi trükk: 1 / ((1 − x)(1 − y)) = (1 + x + x² + …)(1 + y + y² + …)</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Összfokszám-határ N = <strong style={{ color: '#34d399' }}>{deg}</strong> (i + j ≤ {deg}):</span>
        <input type="range" min={1} max={3} value={deg} onChange={(e) => setDeg(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, maxWidth: 360, margin: '0 auto 10px' }}>
        {[0, 1, 2, 3].map((i) =>
          [0, 1, 2, 3].map((j) => {
            const kept = i + j <= deg;
            const label = i === 0 && j === 0 ? '1' : `${i ? (i === 1 ? 'x' : `x^${i}`) : ''}${j ? (j === 1 ? 'y' : `y^${j}`) : ''}`;
            return (
              <div key={`${i}-${j}`} style={{
                padding: '7px 4px',
                textAlign: 'center',
                borderRadius: 7,
                background: kept ? 'rgba(52,211,153,0.18)' : 'rgba(15,23,42,0.45)',
                border: `1px solid ${kept ? '#34d399' : '#334155'}`,
                color: kept ? '#34d399' : '#64748b',
                fontSize: 12,
                fontWeight: kept ? 700 : 400,
              }}>
                {label}
              </div>
            );
          })
        )}
      </div>
      <div style={{ padding: '9px 12px', borderRadius: 9, background: 'rgba(15,23,42,0.65)', border: '1px solid #38bdf8', fontSize: 12.5, color: '#e2e8f0' }}>
        <strong style={{ color: '#38bdf8' }}>P_{deg}(x, y) = </strong>{terms.join(' + ')}
      </div>
    </div>
  );
}

/* ── 5. TaylorProofOfHessianWidget: Quadratic dominates cubic near origin ── */
export function TaylorProofOfHessianWidget() {
  const [r, setR] = useState(0.35);
  // Along y=0, x=-r: f(-r, 0) = r² - r³
  const quad = r * r;
  const cubic = -(r * r * r);
  const total = quad + cubic;
  const dominated = total > 0;

  return (
    <div className="widget">
      <div className="widget-title">Miért győz a Hesse-tag? f(x, y) = x² + y² + x³ az (−r, 0) pontban</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Távolság r = <strong style={{ color: '#38bdf8' }}>{r.toFixed(2)}</strong>:</span>
        <input type="range" min={0.05} max={1.4} step={0.05} value={r} onChange={(e) => setR(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center', fontSize: 12.5 }}>
        <div style={{ padding: 10, borderRadius: 9, background: 'rgba(52,211,153,0.14)', border: '1px solid #34d399' }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>2. rendű (Hesse): r²</div>
          <div style={{ color: '#34d399', fontWeight: 700, fontSize: 15 }}>+{quad.toFixed(4)}</div>
        </div>
        <div style={{ padding: 10, borderRadius: 9, background: 'rgba(248,113,113,0.14)', border: '1px solid #f87171' }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>3. rendű (maradék): −r³</div>
          <div style={{ color: '#f87171', fontWeight: 700, fontSize: 15 }}>{cubic.toFixed(4)}</div>
        </div>
        <div style={{ padding: 10, borderRadius: 9, background: dominated ? 'rgba(56,189,248,0.16)' : 'rgba(251,146,60,0.16)', border: `1px solid ${dominated ? '#38bdf8' : '#fb923c'}` }}>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>Összesen f(−r, 0)</div>
          <div style={{ color: dominated ? '#38bdf8' : '#fb923c', fontWeight: 700, fontSize: 15 }}>{total.toFixed(4)}</div>
        </div>
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 12, color: dominated ? '#34d399' : '#fb923c' }}>
        {dominated
          ? 'r < 1 esetén a kvadratikus r² tag nagyobb, mint r³ ⇒ a függvény az origó környezetében pozitív (lokális minimum!).'
          : 'r > 1 esetén a köbös tag legyőzi a kvadratikust — ezért csak LOKÁLIS minimum az origó, nem globális!'}
      </p>
    </div>
  );
}

/* ── 6. ErrorOrder2DWidget: Comparing O(r²), O(r³), O(r⁴) error bounds ── */
export function ErrorOrder2DWidget() {
  const [step, setStep] = useState(0.2);
  // For f(x,y) = e^(x+y) at (0,0) evaluated at (step, step): exact = e^(2*step)
  const u = 2 * step;
  const exact = Math.exp(u);
  const e1 = Math.abs(exact - (1 + u));
  const e2 = Math.abs(exact - (1 + u + u * u / 2));
  const e3 = Math.abs(exact - (1 + u + u * u / 2 + u * u * u / 6));

  return (
    <div className="widget">
      <div className="widget-title">Hiba összeomlása a fokszámmal: f(x, y) = eˣ⁺ʸ a (h, h) pontban</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Lépésköz h = k = <strong style={{ color: '#fbbf24' }}>{step.toFixed(2)}</strong>:</span>
        <input type="range" min={0.05} max={0.5} step={0.05} value={step} onChange={(e) => setStep(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5 }}>
        {[
          { label: '1. fokú (érintősík) hiba — O(r²)', val: e1, col: '#f87171', w: Math.min(100, (e1 / 0.72) * 100) },
          { label: '2. fokú (paraboloid) hiba — O(r³)', val: e2, col: '#fbbf24', w: Math.min(100, (e2 / 0.72) * 100) },
          { label: '3. fokú (köbös) hiba — O(r⁴)', val: e3, col: '#34d399', w: Math.min(100, (e3 / 0.72) * 100) },
        ].map((row) => (
          <div key={row.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', marginBottom: 3 }}>
              <span>{row.label}</span>
              <strong style={{ color: row.col }}>{row.val.toExponential(2)}</strong>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: 'rgba(15,23,42,0.7)', overflow: 'hidden' }}>
              <div style={{ width: `${Math.max(2, row.w)}%`, height: '100%', background: row.col, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 7. NewtonVsGradientDescentWidget: Elongated valley x² + 8y² ── */
export function NewtonVsGradientDescentWidget() {
  const [lr, setLr] = useState(0.11);
  // Start at (1.8, 0.75) on f(x,y) = x² + 8y²
  // Gradient descent: x_{k+1} = x_k - lr*(2 x_k), y_{k+1} = y_k - lr*(16 y_k)
  const gdPts: { x: number; y: number }[] = [{ x: 1.8, y: 0.75 }];
  for (let i = 0; i < 8; i++) {
    const prev = gdPts[gdPts.length - 1];
    gdPts.push({ x: prev.x * (1 - 2 * lr), y: prev.y * (1 - 16 * lr) });
  }
  const cx = 175, cy = 110, sc = 75;
  const mx = (x: number) => cx + x * sc;
  const my = (y: number) => cy - y * sc;

  return (
    <div className="widget">
      <div className="widget-title">2D Newton-módszer vs. Gradiens ereszkedés az f(x, y) = x² + 8y² völgyben</div>
      <svg viewBox="0 0 350 220" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.55)', borderRadius: 12 }}>
        {[0.5, 1.5, 3.2, 5.5].map((c) => (
          <ellipse key={c} cx={cx} cy={cy} rx={Math.sqrt(c) * sc} ry={Math.sqrt(c / 8) * sc} fill="none" stroke="#475569" strokeDasharray="3 3" />
        ))}
        {/* Gradient descent zig-zag */}
        <polyline points={gdPts.map((p) => `${mx(p.x).toFixed(1)},${my(p.y).toFixed(1)}`).join(' ')} fill="none" stroke="#fb923c" strokeWidth={2.2} />
        {gdPts.map((p, i) => (
          <circle key={i} cx={mx(p.x)} cy={my(p.y)} r={3.5} fill="#fb923c" />
        ))}
        {/* Newton direct jump in 1 step */}
        <line x1={mx(1.8)} y1={my(0.75)} x2={mx(0)} y2={my(0)} stroke="#34d399" strokeWidth={2.6} strokeDasharray="5 3" />
        <circle cx={mx(1.8)} cy={my(0.75)} r={5.5} fill="#38bdf8" stroke="#fff" strokeWidth={1.4} />
        <circle cx={mx(0)} cy={my(0)} r={5.5} fill="#34d399" stroke="#fff" strokeWidth={1.4} />
        <text x={14} y={24} fill="#34d399" fontSize={11.5} fontWeight={700}>Zöld (Newton): 1 lépésben a (0,0) minimumba!</text>
        <text x={14} y={40} fill="#fb923c" fontSize={11.5} fontWeight={700}>Narancs (Gradiens ereszkedés): 8 cikk-cakk lépés</text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, fontSize: 12.5, color: '#cbd5e1' }}>
        <span>Gradiens tanulási ráta α = {lr.toFixed(3)}:</span>
        <input type="range" min={0.04} max={0.12} step={0.005} value={lr} onChange={(e) => setLr(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ── 8. Chapter14GrandSynthesisDiagram: Grand map of all Chapter 14 (14.1–14.10) ── */
export function Chapter14GrandSynthesisDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 14. fejezet nagy szintézise (14.1 – 14.10): minden egy képen!</div>
      <svg viewBox="0 0 520 245" style={{ width: '100%', maxWidth: 540, display: 'block', margin: '0 auto', background: 'rgba(15,23,42,0.52)', borderRadius: 12 }}>
        {/* Row 1 */}
        <rect x={16} y={14} width={150} height={54} rx={9} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.3} />
        <text x={91} y={35} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>14.1–14.2 Alapok</text>
        <text x={91} y={53} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>Szintvonalak, lim, folyto.</text>

        <rect x={185} y={14} width={150} height={54} rx={9} fill="rgba(45,212,191,0.14)" stroke="#2dd4bf" strokeWidth={1.3} />
        <text x={260} y={35} textAnchor="middle" fill="#2dd4bf" fontSize={11.5} fontWeight={700}>14.3–14.4 Deriválás</text>
        <text x={260} y={53} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>f_x, f_y, Clairaut, láncszab.</text>

        <rect x={354} y={14} width={150} height={54} rx={9} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.3} />
        <text x={429} y={35} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>14.5–14.6 Geometria</text>
        <text x={429} y={53} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>∇f, érintősík, df, L(x,y)</text>

        {/* Arrows down */}
        <line x1={260} y1={68} x2={260} y2={92} stroke="#94a3b8" strokeWidth={1.4} />
        <line x1={429} y1={68} x2={429} y2={92} stroke="#94a3b8" strokeWidth={1.4} />

        {/* Row 2 */}
        <rect x={16} y={92} width={236} height={60} rx={9} fill="rgba(251,191,36,0.14)" stroke="#fbbf24" strokeWidth={1.4} />
        <text x={134} y={114} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>14.7–14.8 Optimalizálás</text>
        <text x={134} y={134} textAnchor="middle" fill="#e2e8f0" fontSize={10.8}>Hesse D = f_xx f_yy − f_xy² · ∇f = λ∇g</text>

        <rect x={268} y={92} width={236} height={60} rx={9} fill="rgba(251,146,60,0.14)" stroke="#fb923c" strokeWidth={1.4} />
        <text x={386} y={114} textAnchor="middle" fill="#fb923c" fontSize={12} fontWeight={700}>14.9 Feltételes deriváltak</text>
        <text x={386} y={134} textAnchor="middle" fill="#e2e8f0" fontSize={10.8}>(∂w/∂x)_y · Ciklikus szorzat = −1</text>

        {/* Finale */}
        <rect x={40} y={172} width={440} height={58} rx={10} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={260} y={195} textAnchor="middle" fill="#38bdf8" fontSize={13} fontWeight={700}>14.10 Kétváltozós Taylor-formula (A Nagy Korona)</text>
        <text x={260} y={216} textAnchor="middle" fill="#f8fafc" fontSize={11.5}>f(a+h, b+k) = f + ∇f·Δx + ½ Δxᵀ H Δx + … + R_n</text>
      </svg>
    </div>
  );
}
