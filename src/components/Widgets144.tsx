import { useState } from 'react';
import { M } from './M';

/* ============================================================================
   14.4. A láncszabály — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

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

/* ------------------------------------------------------------------ 1. Fadiagram + élő számológép (Thomas 1. példa) */
export function ChainTree1ParamWidget() {
  const [deg, setDeg] = useState(30);
  const t = (deg * Math.PI) / 180;
  const x = Math.cos(t);
  const y = Math.sin(t);
  const wx = y;
  const wy = x;
  const dxdt = -Math.sin(t);
  const dydt = Math.cos(t);
  const branch1 = wx * dxdt;
  const branch2 = wy * dydt;
  const total = branch1 + branch2;

  return (
    <div className="widget">
      <div className="widget-title">
        Interaktív fadiagram: <M t="w = xy,\; x = \cos t,\; y = \sin t" /> (Thomas 1. példa)
      </div>
      <div className="sliders">
        <label>
          Paraméter t = <strong>{deg}°</strong> ({fmt(t, 2)} rad) → dw/dt = cos(2t) = <strong>{fmt(total, 3)}</strong>
          <input type="range" min={0} max={360} step={15} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox="0 0 540 175">
        <rect width={540} height={175} className="pl-bg" />

        {/* Csomópontok */}
        <circle cx={270} cy={28} r={18} fill="#0f172a" stroke="#fbbf24" strokeWidth={2} />
        <text x={270} y={33} textAnchor="middle" fill="#fbbf24" fontSize={13} fontWeight={700}>w</text>

        <line x1={255} y1={42} x2={155} y2={78} stroke="#38bdf8" strokeWidth={2.2} />
        <line x1={285} y1={42} x2={385} y2={78} stroke="#34d399" strokeWidth={2.2} />

        <text x={182} y={54} fill="#38bdf8" fontSize={10.5} fontWeight={700}>∂w/∂x = y = {fmt(wx, 2)}</text>
        <text x={358} y={54} textAnchor="end" fill="#34d399" fontSize={10.5} fontWeight={700}>∂w/∂y = x = {fmt(wy, 2)}</text>

        <circle cx={145} cy={88} r={16} fill="#0f172a" stroke="#38bdf8" strokeWidth={2} />
        <text x={145} y={93} textAnchor="middle" fill="#38bdf8" fontSize={12} fontWeight={700}>x</text>

        <circle cx={395} cy={88} r={16} fill="#0f172a" stroke="#34d399" strokeWidth={2} />
        <text x={395} y={93} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight={700}>y</text>

        <line x1={155} y1={102} x2={255} y2={138} stroke="#38bdf8" strokeWidth={2.2} />
        <line x1={385} y1={102} x2={285} y2={138} stroke="#34d399" strokeWidth={2.2} />

        <text x={175} y={132} fill="#38bdf8" fontSize={10.5}>dx/dt = −sin t = {fmt(dxdt, 2)}</text>
        <text x={365} y={132} textAnchor="end" fill="#34d399" fontSize={10.5}>dy/dt = cos t = {fmt(dydt, 2)}</text>

        <circle cx={270} cy={146} r={18} fill="#0f172a" stroke="#fb923c" strokeWidth={2} />
        <text x={270} y={151} textAnchor="middle" fill="#fb923c" fontSize={13} fontWeight={700}>t</text>

        {/* Ág-értékek oldalt */}
        <text x={16} y={92} fill="#38bdf8" fontSize={10.5} fontWeight={700}>1. ág: {fmt(branch1, 3)}</text>
        <text x={524} y={92} textAnchor="end" fill="#34d399" fontSize={10.5} fontWeight={700}>2. ág: {fmt(branch2, 3)}</text>
      </svg>
      <div className="explain">
        <p>
          Összeg: <M t={`\\frac{dw}{dt} = (${fmt(branch1, 3)}) + (${fmt(branch2, 3)}) = \\mathbf{${fmt(total, 3)}} = \\cos(${2 * deg}^\\circ)`} />!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Csavarvonal menti változás (Thomas 2. példa) */
export function HelixRateWidget() {
  const [t, setT] = useState(1.2);
  // w = xy + z, x = cos t, y = sin t, z = t => dw/dt = cos(2t) + 1
  const dwdt = Math.cos(2 * t) + 1;
  const proj = makeProj(145, 168, 36, 35, 22);

  let helixD = '';
  for (let i = 0; i <= 90; i++) {
    const tt = (i / 90) * 2 * Math.PI;
    const [px, py] = proj(1.4 * Math.cos(tt), 1.4 * Math.sin(tt), tt * 0.55);
    helixD += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
  }
  const [mx, my] = proj(1.4 * Math.cos(t), 1.4 * Math.sin(t), t * 0.55);

  return (
    <div className="widget">
      <div className="widget-title">Thomas 2. példa: w = xy + z változása a (cos t, sin t, t) csavarvonalon</div>
      <div className="sliders">
        <label>
          Idő t = <strong>{fmt(t, 2)}</strong> (0 → 2π)
          <input type="range" min={0} max={6.2} step={0.1} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox="0 0 540 205">
        <rect width={540} height={205} className="pl-bg" />
        <path d={helixD} fill="none" stroke="#38bdf8" strokeWidth={2.3} />
        <circle cx={mx} cy={my} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />

        <rect x={290} y={18} width={236} height={170} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={408} y={42} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>3 ág járuléka t = {fmt(t, 2)}-nél:</text>
        <text x={306} y={72} fill="#38bdf8" fontSize={10.5}>x-ág: y·(−sin t) = {fmt(-(Math.sin(t) ** 2), 3)}</text>
        <text x={306} y={98} fill="#34d399" fontSize={10.5}>y-ág: x·(cos t)  = {fmt(Math.cos(t) ** 2, 3)}</text>
        <text x={306} y={124} fill="#fb923c" fontSize={10.5}>z-ág: 1 · 1      = +1,000</text>
        <line x1={304} y1={138} x2={512} y2={138} stroke="#334155" />
        <text x={408} y={164} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight={700}>
          dw/dt = cos(2t) + 1 = {fmt(dwdt, 3)} ≥ 0
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Több független változós fadiagram */
export function MultiBranchTreeWidget() {
  const [active, setActive] = useState<'r' | 's'>('r');
  const colR = active === 'r' ? '#38bdf8' : '#334155';
  const colS = active === 's' ? '#34d399' : '#334155';

  return (
    <div className="widget">
      <div className="widget-title">Thomas 7. tétel: mely ágakat kell összeadni ∂w/∂r és ∂w/∂s számításánál?</div>
      <div className="relbuttons chips">
        <button type="button" className={active === 'r' ? 'on' : ''} onClick={() => setActive('r')}>
          ∂w/∂r kiemelése (3 út r-hez)
        </button>
        <button type="button" className={active === 's' ? 'on' : ''} onClick={() => setActive('s')}>
          ∂w/∂s kiemelése (3 út s-hez)
        </button>
      </div>
      <svg className="plane" viewBox="0 0 540 175">
        <rect width={540} height={175} className="pl-bg" />

        {/* w */}
        <circle cx={270} cy={26} r={16} fill="#0f172a" stroke="#fbbf24" strokeWidth={2} />
        <text x={270} y={31} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>w</text>

        {/* x, y, z */}
        {[
          { name: 'x', cx: 110 },
          { name: 'y', cx: 270 },
          { name: 'z', cx: 430 },
        ].map((n) => (
          <g key={n.name}>
            <line x1={270} y1={42} x2={n.cx} y2={72} stroke="#fbbf24" strokeWidth={1.8} />
            <circle cx={n.cx} cy={88} r={15} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.8} />
            <text x={n.cx} y={93} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>{n.name}</text>
            {/* r és s leágazás */}
            <line x1={n.cx - 6} y1={103} x2={n.cx - 32} y2={136} stroke={colR} strokeWidth={active === 'r' ? 2.6 : 1.3} />
            <line x1={n.cx + 6} y1={103} x2={n.cx + 32} y2={136} stroke={colS} strokeWidth={active === 's' ? 2.6 : 1.3} />
            <circle cx={n.cx - 34} cy={148} r={12} fill="#0f172a" stroke={colR} strokeWidth={1.8} />
            <text x={n.cx - 34} y={152} textAnchor="middle" fill={active === 'r' ? '#38bdf8' : '#64748b'} fontSize={11} fontWeight={700}>r</text>
            <circle cx={n.cx + 34} cy={148} r={12} fill="#0f172a" stroke={colS} strokeWidth={1.8} />
            <text x={n.cx + 34} y={152} textAnchor="middle" fill={active === 's' ? '#34d399' : '#64748b'} fontSize={11} fontWeight={700}>s</text>
          </g>
        ))}
      </svg>
      <div className="explain">
        <M
          block
          t={
            active === 'r'
              ? '\\frac{\\partial w}{\\partial r} = \\frac{\\partial w}{\\partial x}\\frac{\\partial x}{\\partial r} + \\frac{\\partial w}{\\partial y}\\frac{\\partial y}{\\partial r} + \\frac{\\partial w}{\\partial z}\\frac{\\partial z}{\\partial r}'
              : '\\frac{\\partial w}{\\partial s} = \\frac{\\partial w}{\\partial x}\\frac{\\partial x}{\\partial s} + \\frac{\\partial w}{\\partial y}\\frac{\\partial y}{\\partial s} + \\frac{\\partial w}{\\partial z}\\frac{\\partial z}{\\partial s}'
          }
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Implicit villámképlet -Fx/Fy */
export function ImplicitShortcutWidget() {
  const [idx, setIdx] = useState(1);
  const ex = [
    {
      label: 'Kör: x² + y² − 25 = 0',
      Fx: '2x',
      Fy: '2y',
      res: '-\\frac{x}{y}',
    },
    {
      label: 'Thomas 5.: y² − x² − sin(xy) = 0',
      Fx: '-2x - y\\cos(xy)',
      Fy: '2y - x\\cos(xy)',
      res: '\\frac{2x + y\\cos(xy)}{2y - x\\cos(xy)}',
    },
    {
      label: 'Descartes-levél: x³ + y³ − 6xy = 0',
      Fx: '3x^2 - 6y',
      Fy: '3y^2 - 6x',
      res: '\\frac{2y - x^2}{y^2 - 2x}',
    },
  ][idx];

  return (
    <div className="widget">
      <div className="widget-title">Implicit villámképlet (Thomas 8. tétel): dy/dx = −Fₓ / Fᵧ egyetlen sorban!</div>
      <div className="relbuttons chips">
        {['Kör', 'Thomas 5. példa', 'Descartes-levél'].map((name, i) => (
          <button key={name} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 8, padding: '10px 12px', borderRadius: 8, background: '#0f172a', border: '1px solid #334155' }}>
        <div style={{ color: '#fbbf24', fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>{ex.label}</div>
        <M block t={`F_x = ${ex.Fx}, \\qquad F_y = ${ex.Fy}`} />
        <M block t={`\\frac{dy}{dx} = -\\frac{F_x}{F_y} = ${ex.res}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Polár láncszabály invariáns */
export function PolarChainWidget() {
  const [r, setR] = useState(2.0);
  const [deg, setDeg] = useState(35);
  const th = (deg * Math.PI) / 180;
  // f(x, y) = x^2 + 3 y^2
  const x = r * Math.cos(th);
  const y = r * Math.sin(th);
  const fx = 2 * x;
  const fy = 6 * y;
  const wr = fx * Math.cos(th) + fy * Math.sin(th);
  const wth = -r * fx * Math.sin(th) + r * fy * Math.cos(th);
  const lhs = fx * fx + fy * fy;
  const rhs = wr * wr + (wth * wth) / (r * r);

  return (
    <div className="widget">
      <div className="widget-title">Polár láncszabály invariáns (Thomas 42. feladat): fₓ² + fᵧ² = wᵣ² + (1/r²)w_θ²</div>
      <div className="sliders">
        <label>
          r = {fmt(r, 1)}
          <input type="range" min={0.5} max={3.5} step={0.5} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          θ = {deg}°
          <input type="range" min={0} max={180} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, fontSize: 12.5 }}>
        <div style={{ padding: '8px 10px', borderRadius: 8, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Descartes (f = x² + 3y²):</strong>
          <div>fₓ² + fᵧ² = <strong>{fmt(lhs, 3)}</strong></div>
        </div>
        <div style={{ padding: '8px 10px', borderRadius: 8, background: '#0f172a', border: '1px solid #34d399' }}>
          <strong style={{ color: '#34d399' }}>Polár (r, θ):</strong>
          <div>wᵣ² + w_θ²/r² = <strong>{fmt(rhs, 3)}</strong> ✓</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Másodrendű láncszabály csapdája */
export function SecondOrderChainDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Másodrendű láncszabály: w = f(x² + y²) — a szorzatszabály + láncszabály kombó!</div>
      <svg className="plane" viewBox="0 0 540 124">
        <rect width={540} height={124} className="pl-bg" />

        <g transform="translate(12, 18)">
          <rect width={150} height={86} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={75} y={24} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>1. derivált</text>
          <text x={75} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={11}>wₓ = 2x · f&apos;(u)</text>
          <text x={75} y={72} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>(u = x² + y²)</text>
        </g>

        <path d="M166,61 L196,61 M190,55 L196,61 L190,67" stroke="#fbbf24" strokeWidth={2} fill="none" />

        <g transform="translate(200, 18)">
          <rect width={326} height={86} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={163} y={24} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>2. derivált (szorzat + újabb láncszabály!)</text>
          <text x={163} y={52} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>
            wₓₓ = 2·f&apos;(u) + 2x·[f&apos;&apos;(u)·2x] = 2f&apos;(u) + 4x²f&apos;&apos;(u)
          </text>
          <text x={163} y={74} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>
            Ne felejtsd el a második belső deriváltat (2x)!
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Kapcsolt ütemek: változó henger */
export function CylinderRateWidget() {
  const [dr, setDr] = useState(0.5);
  const [dh, setDh] = useState(-1.0);
  // r = 3, h = 10 => dV/dt = 2 pi r h dr + pi r^2 dh
  const r = 3;
  const h = 10;
  const partR = 2 * Math.PI * r * h * dr;
  const partH = Math.PI * r * r * dh;
  const dV = partR + partH;

  return (
    <div className="widget">
      <div className="widget-title">Kapcsolt ütemek két változóban: V = πr²h (r = 3 cm, h = 10 cm)</div>
      <div className="sliders">
        <label>
          Sugár változása dr/dt = {fmt(dr, 1)} cm/s
          <input type="range" min={-1} max={1} step={0.1} value={dr} onChange={(e) => setDr(Number(e.target.value))} />
        </label>
        <label>
          Magasság változása dh/dt = {fmt(dh, 1)} cm/s
          <input type="range" min={-2} max={2} step={0.2} value={dh} onChange={(e) => setDh(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8, fontSize: 12 }}>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Sugár-hatás:</strong> {fmt(partR, 1)} cm³/s
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #fb923c' }}>
          <strong style={{ color: '#fb923c' }}>Magasság-hatás:</strong> {fmt(partH, 1)} cm³/s
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: `1px solid ${dV >= 0 ? '#34d399' : '#f87171'}` }}>
          <strong style={{ color: dV >= 0 ? '#34d399' : '#f87171' }}>Összes dV/dt:</strong> {fmt(dV, 1)} cm³/s
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló kártya */
export function ChainRuleMasterGalleryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 14.4 láncszabály-térképe: válaszd a megfelelő fadiagramot!</div>
      <svg className="plane" viewBox="0 0 540 138">
        <rect width={540} height={138} className="pl-bg" />

        <g transform="translate(10, 14)">
          <rect width={166} height={110} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={83} y={22} textAnchor="middle" fill="#38bdf8" fontSize={10.5} fontWeight={700}>Görbe mentén (1 param.)</text>
          <text x={83} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10}>w(x(t), y(t))</text>
          <text x={83} y={76} textAnchor="middle" fill="#38bdf8" fontSize={10} fontWeight={700}>dw/dt = wₓx&apos; + wᵧy&apos;</text>
        </g>

        <g transform="translate(187, 14)">
          <rect width={166} height={110} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={83} y={22} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>Több paraméter (r, s)</text>
          <text x={83} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10}>w(x(r,s), y(r,s))</text>
          <text x={83} y={76} textAnchor="middle" fill="#34d399" fontSize={10} fontWeight={700}>wᵣ = wₓxᵣ + wᵧyᵣ</text>
        </g>

        <g transform="translate(364, 14)">
          <rect width={166} height={110} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
          <text x={83} y={22} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>Implicit F(x, y) = 0</text>
          <text x={83} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Fₓ + Fᵧ y&apos; = 0</text>
          <text x={83} y={76} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>dy/dx = −Fₓ / Fᵧ</text>
        </g>
      </svg>
    </div>
  );
}
