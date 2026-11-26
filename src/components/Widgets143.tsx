import { useState } from 'react';
import { M } from './M';

/* ============================================================================
   14.3. Parciális deriváltak — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

function makeProj(cx: number, cy: number, scale: number, yawDeg: number, pitchDeg = 24) {
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

/* ------------------------------------------------------------------ 1. 3D szeletek és parciális érintők */
export function PartialSliceTangent3DWidget() {
  const [x0, setX0] = useState(1.0);
  const [y0, setY0] = useState(0.5);
  // z = 3.5 - 0.5 x^2 - 0.8 y^2
  const f = (x: number, y: number) => 3.5 - 0.5 * x * x - 0.8 * y * y;
  const fx = -x0;
  const fy = -1.6 * y0;
  const z0 = f(x0, y0);

  const W = 540;
  const H = 250;
  const proj = makeProj(205, 168, 42, 34, 23);

  const sliceX = (() => {
    let d = '';
    for (let i = 0; i <= 32; i++) {
      const x = -1.8 + (3.6 * i) / 32;
      const [px, py] = proj(x, y0, f(x, y0));
      d += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
    }
    return d;
  })();

  const sliceY = (() => {
    let d = '';
    for (let i = 0; i <= 32; i++) {
      const y = -1.8 + (3.6 * i) / 32;
      const [px, py] = proj(x0, y, f(x0, y));
      d += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
    }
    return d;
  })();

  const [p0x, p0y] = proj(x0, y0, z0);
  const [tx1, ty1] = proj(x0 - 0.9, y0, z0 - 0.9 * fx);
  const [tx2, ty2] = proj(x0 + 0.9, y0, z0 + 0.9 * fx);
  const [tya, tyb] = proj(x0, y0 - 0.9, z0 - 0.9 * fy);
  const [tyc, tyd] = proj(x0, y0 + 0.9, z0 + 0.9 * fy);

  return (
    <div className="widget">
      <div className="widget-title">
        Geometriai jelentés: <M t="z = 3{,}5 - 0{,}5x^2 - 0{,}8y^2" /> két függőleges metszete és érintői
      </div>
      <div className="sliders">
        <label>
          x₀ = {fmt(x0, 1)}
          <input type="range" min={-1.4} max={1.4} step={0.2} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
        </label>
        <label>
          y₀ = {fmt(y0, 1)}
          <input type="range" min={-1.2} max={1.2} step={0.2} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />

        {/* Alaprács */}
        {[-1.5, -0.5, 0.5, 1.5].map((g) => {
          const [a, b] = proj(g, -1.6, 0);
          const [c, d] = proj(g, 1.6, 0);
          const [e, ff] = proj(-1.6, g, 0);
          const [h, k] = proj(1.6, g, 0);
          return (
            <g key={g}>
              <line x1={a} y1={b} x2={c} y2={d} stroke="rgba(148,163,184,0.18)" />
              <line x1={e} y1={ff} x2={h} y2={k} stroke="rgba(148,163,184,0.18)" />
            </g>
          );
        })}

        {/* Metszetgörbék */}
        <path d={sliceX} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
        <path d={sliceY} fill="none" stroke="#34d399" strokeWidth={2.4} />

        {/* Érintőegyenesek */}
        <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#fbbf24" strokeWidth={2.3} strokeDasharray="5 3" />
        <line x1={tya} y1={tyb} x2={tyc} y2={tyd} stroke="#fb923c" strokeWidth={2.3} strokeDasharray="5 3" />
        <circle cx={p0x} cy={p0y} r={5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />

        {/* Jobb panel */}
        <rect x={360} y={20} width={168} height={210} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={444} y={46} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>
          P({fmt(x0, 1)}; {fmt(y0, 1)}; {fmt(z0, 2)})
        </text>
        <text x={444} y={84} textAnchor="middle" fill="#38bdf8" fontSize={10.5} fontWeight={700}>
          y = {fmt(y0, 1)} szelet (kék):
        </text>
        <text x={444} y={106} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>
          fₓ = −x₀ = {fmt(fx, 2)}
        </text>
        <text x={444} y={146} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>
          x = {fmt(x0, 1)} szelet (zöld):
        </text>
        <text x={444} y={168} textAnchor="middle" fill="#fb923c" fontSize={11.5} fontWeight={700}>
          fᵧ = −1,6y₀ = {fmt(fy, 2)}
        </text>
        <text x={444} y={206} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>
          Két érintő → érintősík (14.6)!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Konstans-kiolvasó kártya */
export function HoldConstantVisualizerWidget() {
  const [idx, setIdx] = useState(0);
  const items = [
    {
      name: 'x³ y²',
      fx: '3x^2 y^2',
      fy: '2x^3 y',
      tip: 'x szerint deriválva y² sima szorzókonstans; y szerint x³ a konstans.',
    },
    {
      name: 'e^(xy)',
      fx: 'y\\,e^{xy}',
      fy: 'x\\,e^{xy}',
      tip: 'Láncszabály! A belső (xy) függvény deriváltja x szerint y, y szerint x.',
    },
    {
      name: 'x / (x + y)',
      fx: '\\frac{y}{(x+y)^2}',
      fy: '-\\frac{x}{(x+y)^2}',
      tip: 'x szerint hányadosszabály kell; y szerint viszont x konstans, elég a (u⁻¹)\' = −u⁻²!',
    },
    {
      name: 'x^y (x > 0)',
      fx: 'y\\,x^{y-1}',
      fy: 'x^y \\ln x',
      tip: 'KLASSZIKUS CSAPDA! x szerint hatványfüggvény (y konstans), y szerint exponenciális (x konstans)!',
    },
  ];
  const it = items[idx];

  return (
    <div className="widget">
      <div className="widget-title">„Befagyasztásos” deriválás: egy változó aktív, a másik kővé dermedt konstans!</div>
      <div className="relbuttons chips">
        {items.map((item, i) => (
          <button key={item.name} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            f(x, y) = {item.name}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
        <div style={{ padding: '10px 12px', borderRadius: 8, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <div style={{ color: '#38bdf8', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>y = K konstans → ∂f / ∂x:</div>
          <M block t={`f_x(x, y) = ${it.fx}`} />
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 8, background: '#0f172a', border: '1px solid #34d399' }}>
          <div style={{ color: '#34d399', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>x = K konstans → ∂f / ∂y:</div>
          <M block t={`f_y(x, y) = ${it.fy}`} />
        </div>
      </div>
      <div className="explain">
        <p>{it.tip}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Ideális gáz P(T, V) = T / V */
export function IdealGasPartialWidget() {
  const [T, setT] = useState(3.0);
  const [V, setV] = useState(1.5);
  const P = T / V;
  const dPdT = 1 / V;
  const dPdV = -T / (V * V);

  return (
    <div className="widget">
      <div className="widget-title">Fizikai parciális deriváltak: ideális gáztörvény P(T, V) = T / V (nR = 1)</div>
      <div className="sliders">
        <label>
          Hőmérséklet T = {fmt(T, 1)}
          <input type="range" min={1} max={5} step={0.5} value={T} onChange={(e) => setT(Number(e.target.value))} />
        </label>
        <label>
          Térfogat V = {fmt(V, 1)}
          <input type="range" min={0.8} max={3.0} step={0.2} value={V} onChange={(e) => setV(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, fontSize: 12.5 }}>
        <div style={{ padding: '10px 12px', borderRadius: 8, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Állandó térfogaton (V = {fmt(V, 1)}):</strong>
          <div style={{ marginTop: 4 }}>
            <M t={`\\frac{\\partial P}{\\partial T} = \\frac{1}{V} = +${fmt(dPdT, 2)}`} />
          </div>
          <div style={{ color: '#94a3b8', fontSize: 11.5, marginTop: 4 }}>Melegítésre a nyomás egyenletesen nő!</div>
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 8, background: '#0f172a', border: '1px solid #fb923c' }}>
          <strong style={{ color: '#fb923c' }}>Állandó hőmérsékleten (T = {fmt(T, 1)}):</strong>
          <div style={{ marginTop: 4 }}>
            <M t={`\\frac{\\partial P}{\\partial V} = -\\frac{T}{V^2} = ${fmt(dPdV, 2)}`} />
          </div>
          <div style={{ color: '#94a3b8', fontSize: 11.5, marginTop: 4 }}>Táguláskor a nyomás meredeken esik!</div>
        </div>
      </div>
      <div className="explain">
        <p>Aktuális állapot: <M t={`P = \\frac{${fmt(T, 1)}}{${fmt(V, 1)}} = ${fmt(P, 2)}`} />.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Clairaut-tétel és okos sorrend */
export function ClairautOrderDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Clairaut (Young) tétele: fₓᵧ = fᵧₓ — válaszd a könnyebb utat! (Thomas 10. példa)</div>
      <svg className="plane" viewBox="0 0 540 162">
        <rect width={540} height={162} className="pl-bg" />

        {/* Bal: f */}
        <g transform="translate(14, 52)">
          <rect width={132} height={58} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
          <text x={66} y={24} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>w(x, y)</text>
          <text x={66} y={44} textAnchor="middle" fill="#e2e8f0" fontSize={10}>xy + eʸ / (y² + 1)</text>
        </g>

        {/* Felső út: x majd y (könnyű) */}
        <path d="M148,68 L194,38" stroke="#34d399" strokeWidth={2} />
        <g transform="translate(196, 14)">
          <rect width={156} height={46} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={78} y={19} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>Okos út: ∂w/∂x = y</text>
          <text x={78} y={36} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>Az y-os tört eltűnik! ✓</text>
        </g>
        <path d="M354,38 L398,68" stroke="#34d399" strokeWidth={2} />

        {/* Alsó út: y majd x (nehéz) */}
        <path d="M148,94 L194,124" stroke="#f87171" strokeWidth={2} />
        <g transform="translate(196, 100)">
          <rect width={156} height={46} rx={8} fill="#0f172a" stroke="#f87171" strokeWidth={1.5} />
          <text x={78} y={19} textAnchor="middle" fill="#f87171" fontSize={10.5} fontWeight={700}>Nehéz út: ∂w/∂y =</text>
          <text x={78} y={36} textAnchor="middle" fill="#fca5a5" fontSize={9.5}>x + eʸ(y²−2y+1)/(y²+1)²</text>
        </g>
        <path d="M354,124 L398,94" stroke="#f87171" strokeWidth={2} />

        {/* Jobb: közös eredmény */}
        <g transform="translate(400, 52)">
          <rect width={126} height={58} rx={8} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.8} />
          <text x={63} y={24} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>wₓᵧ = wᵧₓ</text>
          <text x={63} y={46} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>= 1</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Hullámegyenlet u_tt = c^2 u_xx */
export function WaveEquationSliceWidget() {
  const [t, setT] = useState(0.15);
  // u(x, t) = sin(pi x) cos(2 pi t), c = 2
  const W = 540;
  const H = 190;
  const x0 = 40;
  const x1 = 500;
  const cy = 98;
  const amp = 68;

  const cosT = Math.cos(2 * Math.PI * t);
  let d = '';
  for (let i = 0; i <= 80; i++) {
    const x = i / 80;
    const u = Math.sin(Math.PI * x) * cosT;
    d += `${i === 0 ? 'M' : 'L'}${(x0 + x * (x1 - x0)).toFixed(1)},${(cy - u * amp).toFixed(1)} `;
  }
  const midU = cosT;
  const midUtt = -4 * Math.PI * Math.PI * cosT;
  const midUxx = -Math.PI * Math.PI * cosT;

  return (
    <div className="widget">
      <div className="widget-title">
        Hullámegyenlet: <M t="u_{tt} = 4\,u_{xx}" /> a gitárhúron <M t="u(x,t) = \sin(\pi x)\cos(2\pi t)" />
      </div>
      <div className="sliders">
        <label>
          Idő t = {fmt(t, 2)} s
          <input type="range" min={0} max={1} step={0.05} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={x0} y1={cy} x2={x1} y2={cy} className="pl-axis" />
        <path d={d} fill="none" stroke="#38bdf8" strokeWidth={2.8} />
        <circle cx={x0} cy={cy} r={4.5} fill="#fbbf24" />
        <circle cx={x1} cy={cy} r={4.5} fill="#fbbf24" />
        <circle cx={(x0 + x1) / 2} cy={cy - midU * amp} r={5} fill="#34d399" />
        <text x={W - 14} y={24} textAnchor="end" fill="#34d399" fontSize={10.5} fontWeight={700}>
          x = 0,5-nél: u_tt = {fmt(midUtt, 1)} = 4 · ({fmt(midUxx, 1)}) = 4·u_xx ✓
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Thomas 8. példa: parciálisok léteznek, de NEM folytonos! */
export function CrossDiscontinuityWidget() {
  const [dir, setDir] = useState<'x' | 'y' | 'diag'>('diag');

  return (
    <div className="widget">
      <div className="widget-title">Thomas 8. példa: fₓ(0,0) = 0 és fᵧ(0,0) = 0 létezik, mégsem folytonos!</div>
      <div className="relbuttons chips">
        <button type="button" className={dir === 'x' ? 'on' : ''} onClick={() => setDir('x')}>x-tengely (y = 0): f ≡ 1 → fₓ = 0</button>
        <button type="button" className={dir === 'y' ? 'on' : ''} onClick={() => setDir('y')}>y-tengely (x = 0): f ≡ 1 → fᵧ = 0</button>
        <button type="button" className={dir === 'diag' ? 'on' : ''} onClick={() => setDir('diag')}>y = x átló: 0 → 1 SZAKADÁS!</button>
      </div>
      <svg className="plane" viewBox="0 0 540 164">
        <rect width={540} height={164} className="pl-bg" />
        <line x1={40} y1={126} x2={500} y2={126} className="pl-axis" />
        <line x1={270} y1={24} x2={270} y2={146} className="pl-axis" />
        {dir !== 'diag' ? (
          <>
            <line x1={60} y1={56} x2={480} y2={56} stroke="#34d399" strokeWidth={2.8} />
            <circle cx={270} cy={56} r={5} fill="#fbbf24" />
            <text x={270} y={40} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>
              A {dir}-tengelyen végig z = 1 ⇒ meredekség = 0 ✓
            </text>
          </>
        ) : (
          <>
            <line x1={60} y1={126} x2={265} y2={126} stroke="#f87171" strokeWidth={2.8} />
            <line x1={275} y1={126} x2={480} y2={126} stroke="#f87171" strokeWidth={2.8} />
            <circle cx={270} cy={126} r={4.5} fill="#0f172a" stroke="#f87171" strokeWidth={2} />
            <circle cx={270} cy={56} r={5.5} fill="#fbbf24" />
            <text x={270} y={40} textAnchor="middle" fill="#f87171" fontSize={11} fontWeight={700}>
              Az y = x átlón z = 0, de f(0,0) = 1 ⇒ NEM FOLYTONOS! ✗
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Differenciálhatósági lánc */
export function DifferentiabilityChainDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 14.3 arany-lánca: mi következik miből két változóban?</div>
      <svg className="plane" viewBox="0 0 540 132">
        <rect width={540} height={132} className="pl-bg" />

        <g transform="translate(12, 24)">
          <rect width={148} height={82} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={74} y={28} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>fₓ és fᵧ folytonos</text>
          <text x={74} y={50} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>(C¹ függvény)</text>
          <text x={74} y={68} textAnchor="middle" fill="#94a3b8" fontSize={9}>Könnyű ellenőrizni!</text>
        </g>

        <path d="M164,65 L194,65 M188,59 L194,65 L188,71" stroke="#34d399" strokeWidth={2.2} fill="none" />

        <g transform="translate(198, 24)">
          <rect width={144} height={82} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={72} y={28} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Differenciálható</text>
          <text x={72} y={50} textAnchor="middle" fill="#bae6fd" fontSize={9.5}>(van szép érintősíkja)</text>
          <text x={72} y={68} textAnchor="middle" fill="#94a3b8" fontSize={9}>Δz ≈ fₓΔx + fᵧΔy</text>
        </g>

        <path d="M346,65 L376,65 M370,59 L376,65 L370,71" stroke="#38bdf8" strokeWidth={2.2} fill="none" />

        <g transform="translate(380, 24)">
          <rect width={148} height={82} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
          <text x={74} y={26} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>Folytonos ÉS</text>
          <text x={74} y={46} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>létezik fₓ, fᵧ</text>
          <text x={74} y={68} textAnchor="middle" fill="#f87171" fontSize={9}>(Visszafelé NEM igaz!)</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló kártya */
export function PartialDerivativesCheatDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">14.3 Gyors áttekintés: jelölések, Clairaut és a 3 nagy PDE</div>
      <svg className="plane" viewBox="0 0 540 144">
        <rect width={540} height={144} className="pl-bg" />

        <g transform="translate(10, 14)">
          <rect width={166} height={116} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={83} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Jelölési szótár</text>
          <text x={83} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={10}>fₓ = ∂f/∂x  (y konstans)</text>
          <text x={83} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={10}>fₓᵧ = (fₓ)ᵧ = ∂²f / ∂y∂x</text>
          <text x={83} y={94} textAnchor="middle" fill="#fbbf24" fontSize={9.5}>Clairaut: fₓᵧ = fᵧₓ</text>
        </g>

        <g transform="translate(187, 14)">
          <rect width={166} height={116} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={83} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>A 3 nagy fizikai PDE</text>
          <text x={83} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={9.8}>Laplace: uₓₓ + uᵧᵧ = 0</text>
          <text x={83} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={9.8}>Hővezetés: uₜ = k uₓₓ</text>
          <text x={83} y={90} textAnchor="middle" fill="#e2e8f0" fontSize={9.8}>Hullám: uₜₜ = c² uₓₓ</text>
        </g>

        <g transform="translate(364, 14)">
          <rect width={166} height={116} rx={8} fill="#0f172a" stroke="#fb923c" strokeWidth={1.5} />
          <text x={83} y={22} textAnchor="middle" fill="#fb923c" fontSize={11} fontWeight={700}>Kritikus szabály</text>
          <text x={83} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={9.8}>fₓ, fᵧ létezik ⇏ folytonos!</text>
          <text x={83} y={72} textAnchor="middle" fill="#34d399" fontSize={9.8}>fₓ, fᵧ folytonos ⇒ diff.</text>
          <text x={83} y={96} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>diff. ⇒ folytonos ✓</text>
        </g>
      </svg>
    </div>
  );
}
