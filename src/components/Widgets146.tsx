import { useState } from 'react';
import { M } from './M';

/* ============================================================================
   14.6. Érintősíkok és differenciálok — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

function makeProj(cx: number, cy: number, scale: number, yawDeg: number, pitchDeg = 23) {
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

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 7): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1e-3) return '';
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  return `M${(x2 - ux * size + px * size * 0.45).toFixed(1)},${(y2 - uy * size + py * size * 0.45).toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${(x2 - ux * size - px * size * 0.45).toFixed(1)},${(y2 - uy * size - py * size * 0.45).toFixed(1)}`;
}

/* ------------------------------------------------------------------ 1. 3D Érintősík és normálegyenes */
export function TangentPlane3DWidget() {
  const [yaw, setYaw] = useState(32);
  // Paraboloid: z = 3.2 - 0.5(x^2 + y^2), pont P0(1, 0.8, z0)
  const x0 = 1.0;
  const y0 = 0.8;
  const f = (x: number, y: number) => 3.2 - 0.5 * (x * x + y * y);
  const z0 = f(x0, y0);
  const fx = -x0;
  const fy = -y0;

  const W = 540;
  const H = 235;
  const proj = makeProj(215, 168, 44, yaw, 24);

  // Paraboloid vízszintes körei
  const rings = [0.6, 1.3, 2.0, 2.7];
  const ringPath = (z: number) => {
    const r = Math.sqrt(Math.max(0, 2 * (3.2 - z)));
    let d = '';
    for (let i = 0; i <= 40; i++) {
      const th = (i / 40) * Math.PI * 2;
      const [px, py] = proj(r * Math.cos(th), r * Math.sin(th), z);
      d += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
    }
    return d;
  };

  // Érintősík négyzet-patch
  const dP = 0.85;
  const corners: [number, number][] = [
    [-dP, -dP],
    [dP, -dP],
    [dP, dP],
    [-dP, dP],
  ].map(([dx, dy]) => proj(x0 + dx, y0 + dy, z0 + fx * dx + fy * dy));
  const patchPts = corners.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');

  const [p0x, p0y] = proj(x0, y0, z0);
  // Normálvektor: <x0, y0, 1>
  const [nx, ny] = proj(x0 + 0.7 * x0, y0 + 0.7 * y0, z0 + 0.7 * 1);

  return (
    <div className="widget">
      <div className="widget-title">Érintősík és normálegyenes a z = 3,2 − 0,5(x² + y²) felületen</div>
      <div className="sliders">
        <label>
          3D nézőpont forgatása: {yaw}°
          <input type="range" min={-180} max={180} step={5} value={yaw} onChange={(e) => setYaw(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {rings.map((z) => (
          <path key={z} d={ringPath(z)} fill="none" stroke="rgba(56,189,248,0.45)" strokeWidth={1.4} />
        ))}
        <polygon points={patchPts} fill="rgba(251,191,36,0.26)" stroke="#fbbf24" strokeWidth={2} />
        <line x1={p0x} y1={p0y} x2={nx} y2={ny} stroke="#34d399" strokeWidth={2.6} />
        <path d={arrowHead(p0x, p0y, nx, ny)} fill="none" stroke="#34d399" strokeWidth={2.3} />
        <circle cx={p0x} cy={p0y} r={4.8} fill="#fbbf24" />
        <text x={nx + 6} y={ny} fill="#34d399" fontSize={11} fontWeight={700}>∇F (normális)</text>

        <rect x={365} y={24} width={162} height={184} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={446} y={50} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>Érintősík:</text>
        <text x={446} y={74} textAnchor="middle" fill="#e2e8f0" fontSize={10}>∇F(P₀) · (r − r₀) = 0</text>
        <text x={446} y={114} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>Normálegyenes:</text>
        <text x={446} y={138} textAnchor="middle" fill="#e2e8f0" fontSize={10}>r(t) = r₀ + t · ∇F(P₀)</text>
        <text x={446} y={176} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Mindkettő ∇F-ből jön!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Implicit vs Explicit érintősík */
export function ExplicitVsImplicitPlaneDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Két alak, egyetlen gondolat: szintfelület vs. grafikon érintősíkja</div>
      <svg className="plane" viewBox="0 0 540 132">
        <rect width={540} height={132} className="pl-bg" />
        <g transform="translate(12, 14)">
          <rect width={250} height={104} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={125} y={24} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Implicit: F(x, y, z) = c</text>
          <text x={125} y={52} textAnchor="middle" fill="#e2e8f0" fontSize={10.2}>Fₓ(x−x₀) + Fᵧ(y−y₀) + F_z(z−z₀) = 0</text>
          <text x={125} y={82} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Normálvektor: ⟨Fₓ, Fᵧ, F_z⟩</text>
        </g>
        <g transform="translate(278, 14)">
          <rect width={250} height={104} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={125} y={24} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>Explicit: z = f(x, y)</text>
          <text x={125} y={52} textAnchor="middle" fill="#e2e8f0" fontSize={10.2}>z − z₀ = fₓ(x−x₀) + fᵧ(y−y₀)</text>
          <text x={125} y={82} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>F = f(x,y) − z ⇒ normális: ⟨fₓ, fᵧ, −1⟩</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Két felület metszésvonala (Thomas 3. példa) */
export function SurfaceIntersectionTangentWidget() {
  const [yaw, setYaw] = useState(38);
  // Henger x^2+y^2=2 és sík x+z=4, metszetellipszis: (sqrt(2)cos t, sqrt(2)sin t, 4 - sqrt(2)cos t)
  // P0 = (1, 1, 3), grad f = (2,2,0), grad g = (1,0,1), v = grad f x grad g = (2, -2, -2)
  const W = 540;
  const H = 225;
  const proj = makeProj(200, 175, 34, yaw, 22);

  let ellD = '';
  let baseD = '';
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    const x = Math.SQRT2 * Math.cos(t);
    const y = Math.SQRT2 * Math.sin(t);
    const z = 4 - x;
    const [px, py] = proj(x, y, z * 0.75);
    const [bx, by] = proj(x, y, 0);
    ellD += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
    baseD += `${i === 0 ? 'M' : 'L'}${bx.toFixed(1)},${by.toFixed(1)} `;
  }

  const [p0x, p0y] = proj(1, 1, 3 * 0.75);
  const [nfx, nfy] = proj(1 + 0.9, 1 + 0.9, 3 * 0.75);
  const [ngx, ngy] = proj(1 + 0.9, 1, (3 + 0.9) * 0.75);
  const [vx, vy] = proj(1 + 0.9, 1 - 0.9, (3 - 0.9) * 0.75);

  return (
    <div className="widget">
      <div className="widget-title">Thomas 3. példa: henger és sík metszetellipszise — érintő ∥ ∇f × ∇g!</div>
      <div className="sliders">
        <label>
          3D nézőpont forgatása: {yaw}°
          <input type="range" min={-180} max={180} step={5} value={yaw} onChange={(e) => setYaw(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <path d={baseD} fill="none" stroke="rgba(56,189,248,0.35)" strokeDasharray="4 3" />
        <path d={ellD} fill="rgba(251,191,36,0.14)" stroke="#fbbf24" strokeWidth={2.3} />

        {/* ∇f (cián) */}
        <line x1={p0x} y1={p0y} x2={nfx} y2={nfy} stroke="#38bdf8" strokeWidth={2.2} />
        <path d={arrowHead(p0x, p0y, nfx, nfy)} fill="none" stroke="#38bdf8" strokeWidth={2} />
        {/* ∇g (narancs) */}
        <line x1={p0x} y1={p0y} x2={ngx} y2={ngy} stroke="#fb923c" strokeWidth={2.2} />
        <path d={arrowHead(p0x, p0y, ngx, ngy)} fill="none" stroke="#fb923c" strokeWidth={2} />
        {/* v = ∇f × ∇g (smaragd) */}
        <line x1={p0x} y1={p0y} x2={vx} y2={vy} stroke="#34d399" strokeWidth={2.8} />
        <path d={arrowHead(p0x, p0y, vx, vy)} fill="none" stroke="#34d399" strokeWidth={2.4} />
        <circle cx={p0x} cy={p0y} r={4.5} fill="#fbbf24" />

        <rect x={356} y={24} width={172} height={172} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={442} y={48} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>P₀(1, 1, 3)</text>
        <text x={442} y={76} textAnchor="middle" fill="#38bdf8" fontSize={10}>∇f = ⟨2, 2, 0⟩</text>
        <text x={442} y={100} textAnchor="middle" fill="#fb923c" fontSize={10}>∇g = ⟨1, 0, 1⟩</text>
        <text x={442} y={132} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>v = ∇f × ∇g</text>
        <text x={442} y={154} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>= ⟨2, −2, −2⟩</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Linearizáció-labor (Thomas 5. példa) */
export function LinearizationError2DWidget() {
  const [dx, setDx] = useState(0.2);
  const [dy, setDy] = useState(-0.1);
  // f(x, y) = x^2 - xy + 0.5 y^2 + 3 at (3, 2): f(3,2)=8, fx=4, fy=-1
  const x = 3 + dx;
  const y = 2 + dy;
  const fExact = x * x - x * y + 0.5 * y * y + 3;
  const lApprox = 8 + 4 * dx - 1 * dy;
  const err = Math.abs(fExact - lApprox);

  return (
    <div className="widget">
      <div className="widget-title">
        Linearizáció-labor: <M t="f(x,y) = x^2 - xy + \frac{1}{2}y^2 + 3" /> a <M t="(3, 2)" /> pont körül
      </div>
      <div className="sliders">
        <label>
          Δx = {fmt(dx, 2)} (x = {fmt(x, 2)})
          <input type="range" min={-0.5} max={0.5} step={0.05} value={dx} onChange={(e) => setDx(Number(e.target.value))} />
        </label>
        <label>
          Δy = {fmt(dy, 2)} (y = {fmt(y, 2)})
          <input type="range" min={-0.5} max={0.5} step={0.05} value={dy} onChange={(e) => setDy(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8, fontSize: 12.5 }}>
        <div style={{ padding: '8px 10px', borderRadius: 6, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Pontos f(x, y):</strong> {fmt(fExact, 4)}
        </div>
        <div style={{ padding: '8px 10px', borderRadius: 6, background: '#0f172a', border: '1px solid #34d399' }}>
          <strong style={{ color: '#34d399' }}>Lineáris L(x, y):</strong> {fmt(lApprox, 4)}
        </div>
        <div style={{ padding: '8px 10px', borderRadius: 6, background: '#0f172a', border: '1px solid #fbbf24' }}>
          <strong style={{ color: '#fbbf24' }}>Hiba |f − L|:</strong> {fmt(err, 4)}
        </div>
      </div>
      <div className="explain">
        <p>
          <M t="L(x, y) = 8 + 4(x-3) - (y-2) = 4x - y - 2" />. Figyeld meg: ha <M t="\Delta x, \Delta y" /> felére
          csökken, a hiba a <strong>negyedére</strong> esik!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Δz vs dz magyarázó ábra */
export function DeltaZvsDzDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A teljes differenciál (dz) vs. a valódi változás (Δz)</div>
      <svg className="plane" viewBox="0 0 540 156">
        <rect width={540} height={156} className="pl-bg" />

        {/* Görbe + érintő */}
        <path d="M55,126 Q190,112 310,32" fill="none" stroke="#38bdf8" strokeWidth={2.6} />
        <line x1={65} y1={130} x2={325} y2={62} stroke="#fbbf24" strokeWidth={2.2} strokeDasharray="5 3" />

        {/* P0 és eltolt pont */}
        <circle cx={140} cy={110} r={4.5} fill="#fbbf24" />
        <line x1={140} y1={110} x2={275} y2={110} stroke="#64748b" strokeDasharray="3 3" />
        <line x1={275} y1={110} x2={275} y2={75} stroke="#34d399" strokeWidth={3} />
        <line x1={275} y1={75} x2={275} y2={52} stroke="#f87171" strokeWidth={3} />

        <text x={284} y={96} fill="#34d399" fontSize={10.5} fontWeight={700}>dz = fₓdx + fᵧdy</text>
        <text x={284} y={66} fill="#f87171" fontSize={10.5} fontWeight={700}>hiba E = Δz − dz</text>

        <rect x={392} y={20} width={136} height={116} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={460} y={46} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>Hibakorlát:</text>
        <text x={460} y={76} textAnchor="middle" fill="#e2e8f0" fontSize={10}>|E| ≤ ½M(|Δx|+|Δy|)²</text>
        <text x={460} y={108} textAnchor="middle" fill="#94a3b8" fontSize={9.2}>M = max(|fₓₓ|,|fₓᵧ|,|fᵧᵧ|)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Henger érzékenység & hibaszázalék (Thomas 8-9. példa) */
export function SensitivityCylinderWidget() {
  const [r, setR] = useState(1.5);
  const [h, setH] = useState(7.5);
  const [errR, setErrR] = useState(2.0);
  const [errH, setErrH] = useState(0.5);

  const Vr = 2 * Math.PI * r * h;
  const Vh = Math.PI * r * r;
  const ratio = Vr / Vh;
  const maxErrPct = 2 * errR + errH;

  return (
    <div className="widget">
      <div className="widget-title">Thomas 8–9. példa: V = πr²h érzékenysége és mérési hibaszázaléka</div>
      <div className="sliders">
        <label>
          Sugár r = {fmt(r, 1)} m
          <input type="range" min={1} max={8} step={0.5} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          Magasság h = {fmt(h, 1)} m
          <input type="range" min={1} max={8} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
        <label>
          Sugár mérési hibája: ±{fmt(errR, 1)}%
          <input type="range" min={0} max={4} step={0.5} value={errR} onChange={(e) => setErrR(Number(e.target.value))} />
        </label>
        <label>
          Magasság hibája: ±{fmt(errH, 1)}%
          <input type="range" min={0} max={4} step={0.5} value={errH} onChange={(e) => setErrH(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, fontSize: 12.5 }}>
        <div style={{ padding: '8px 10px', borderRadius: 8, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Érzékenység (Vᵣ / Vₕ = 2h/r):</strong>
          <div>
            Vᵣ = {fmt(Vr, 1)}, Vₕ = {fmt(Vh, 1)} →{' '}
            <strong>{ratio >= 1 ? `r-re ${fmt(ratio, 1)}× érzékenyebb` : `h-ra ${fmt(1 / ratio, 1)}× érzékenyebb`}</strong>
          </div>
        </div>
        <div style={{ padding: '8px 10px', borderRadius: 8, background: '#0f172a', border: '1px solid #fbbf24' }}>
          <strong style={{ color: '#fbbf24' }}>Max. térfogathiba (2·δr + δh):</strong>
          <div>
            |dV / V| ≤ 2({fmt(errR, 1)}%) + {fmt(errH, 1)}% = <strong>{fmt(maxErrPct, 1)}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. 3D hibaterjedés V = xyz */
export function ErrorPropagation3DWidget() {
  const [ex, setEx] = useState(1.0);
  const [ey, setEy] = useState(1.5);
  const [ez, setEz] = useState(0.5);
  const tot = ex + ey + ez;

  return (
    <div className="widget">
      <div className="widget-title">3D hibaterjedés: V = xyz téglatest térfogatának relatív hibája</div>
      <div className="sliders">
        <label>
          δx = {fmt(ex, 1)}% <input type="range" min={0} max={3} step={0.5} value={ex} onChange={(e) => setEx(Number(e.target.value))} />
        </label>
        <label>
          δy = {fmt(ey, 1)}% <input type="range" min={0} max={3} step={0.5} value={ey} onChange={(e) => setEy(Number(e.target.value))} />
        </label>
        <label>
          δz = {fmt(ez, 1)}% <input type="range" min={0} max={3} step={0.5} value={ez} onChange={(e) => setEz(Number(e.target.value))} />
        </label>
      </div>
      <div className="explain">
        <M block t={`\\frac{|dV|}{V} \\le \\frac{|dx|}{x} + \\frac{|dy|}{y} + \\frac{|dz|}{z} = ${fmt(ex, 1)}\\% + ${fmt(ey, 1)}\\% + ${fmt(ez, 1)}\\% = \\mathbf{${fmt(tot, 1)}\\%}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló kártya */
export function TangentDiffSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">14.6 Összefoglaló: minden a gradiensből nő ki!</div>
      <svg className="plane" viewBox="0 0 540 132">
        <rect width={540} height={132} className="pl-bg" />
        <g transform="translate(10, 14)">
          <rect width={166} height={104} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={83} y={24} textAnchor="middle" fill="#38bdf8" fontSize={10.5} fontWeight={700}>Érintősík &amp; Normális</text>
          <text x={83} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>∇F(P₀) · (r − r₀) = 0</text>
          <text x={83} y={76} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>r(t) = r₀ + t∇F(P₀)</text>
        </g>
        <g transform="translate(187, 14)">
          <rect width={166} height={104} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={83} y={24} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>Metszésvonal érintője</text>
          <text x={83} y={54} textAnchor="middle" fill="#a7f3d0" fontSize={11} fontWeight={700}>v = ∇f × ∇g</text>
          <text x={83} y={80} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Mindkét síkra illeszkedik</text>
        </g>
        <g transform="translate(364, 14)">
          <rect width={166} height={104} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
          <text x={83} y={24} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>Linearizáció &amp; df</text>
          <text x={83} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>L = f(P₀) + ∇f·(r−r₀)</text>
          <text x={83} y={76} textAnchor="middle" fill="#fde68a" fontSize={9.5}>df = fₓdx + fᵧdy (+ f_zdz)</text>
        </g>
      </svg>
    </div>
  );
}
