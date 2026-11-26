import { useState } from 'react';

/* ============================================================================
   15.6. Hármas integrálok henger- és gömbi koordináta-rendszerben — 8 SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const pathFrom = (pts: [number, number][]) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

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

/* ------------------------------------------------------------------ 1. Hengerkoordináták 3D-ben */
export function CylindricalCoord3DWidget() {
  const [r, setR] = useState(1.5);
  const [thDeg, setThDeg] = useState(50);
  const [z, setZ] = useState(1.4);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 175, 44, yaw, 22);

  const th = (thDeg * Math.PI) / 180;
  const x = r * Math.cos(th);
  const y = r * Math.sin(th);

  const circle0: [number, number][] = [];
  const circleZ: [number, number][] = [];
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    circle0.push(P(r * Math.cos(a), r * Math.sin(a), 0));
    circleZ.push(P(r * Math.cos(a), r * Math.sin(a), z));
  }

  // Kis térfogatelem dV = r dz dr dtheta a pont körül
  const dr = 0.25;
  const dth = 0.28;
  const dz = 0.35;
  const wBot = `${pathFrom([
    P(r * Math.cos(th), r * Math.sin(th), z),
    P((r + dr) * Math.cos(th), (r + dr) * Math.sin(th), z),
    P((r + dr) * Math.cos(th + dth), (r + dr) * Math.sin(th + dth), z),
    P(r * Math.cos(th + dth), r * Math.sin(th + dth), z),
  ])} Z`;
  const wTop = `${pathFrom([
    P(r * Math.cos(th), r * Math.sin(th), z + dz),
    P((r + dr) * Math.cos(th), (r + dr) * Math.sin(th), z + dz),
    P((r + dr) * Math.cos(th + dth), (r + dr) * Math.sin(th + dth), z + dz),
    P(r * Math.cos(th + dth), r * Math.sin(th + dth), z + dz),
  ])} Z`;

  const O = P(0, 0, 0);
  const Pt0 = P(x, y, 0);
  const Pt = P(x, y, z);

  return (
    <div className="widget">
      <div className="wtitle">Hengerkoordináták (r, θ, z): polár a síkban + z magasság, dV = r dz dr dθ</div>
      <div className="controls">
        <label>
          r = {r.toFixed(1)}
          <input type="range" min={0.6} max={2.0} step={0.1} value={r} onChange={(e) => setR(+e.target.value)} />
        </label>
        <label>
          θ = {thDeg}°
          <input type="range" min={0} max={350} step={5} value={thDeg} onChange={(e) => setThDeg(+e.target.value)} />
        </label>
        <label>
          z = {z.toFixed(1)}
          <input type="range" min={0.3} max={2.2} step={0.1} value={z} onChange={(e) => setZ(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 280" className="wsvg">
        {/* Tengelyek */}
        <line x1={O[0]} y1={O[1]} x2={P(2.4, 0, 0)[0]} y2={P(2.4, 0, 0)[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={P(0, 2.4, 0)[0]} y2={P(0, 2.4, 0)[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={P(0, 0, 2.6)[0]} y2={P(0, 0, 2.6)[1]} stroke="#64748b" strokeWidth="1.2" />

        {/* Henger körök */}
        <path d={pathFrom(circle0)} fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeDasharray="4 3" strokeWidth="1.4" />
        <path d={pathFrom(circleZ)} fill="none" stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="1.6" />

        {/* r sugár és z függőleges */}
        <line x1={O[0]} y1={O[1]} x2={Pt0[0]} y2={Pt0[1]} stroke="#fb923c" strokeWidth="2.3" />
        <line x1={Pt0[0]} y1={Pt0[1]} x2={Pt[0]} y2={Pt[1]} stroke="#34d399" strokeWidth="2.3" />

        {/* dV elem */}
        <path d={wBot} fill="#fbbf24" fillOpacity="0.22" stroke="#fbbf24" strokeWidth="1.2" />
        <path d={wTop} fill="#fbbf24" fillOpacity="0.32" stroke="#fbbf24" strokeWidth="1.4" />
        <circle cx={Pt[0]} cy={Pt[1]} r="4.8" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          (x; y; z) = ({x.toFixed(2)}; {y.toFixed(2)}; {z.toFixed(2)}) · r = √(x²+y²) = {r.toFixed(1)}
        </text>
        <text x="16" y="268" fill="#94a3b8" fontSize="11.5">
          Narancs: r sugár az xy-síkban · Zöld: z magasság · Arany dobozka: dV = r dz dr dθ
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Paraboloid és sík hengerkoordinátákban */
export function ParaboloidCyl3DWidget() {
  const [H, setH] = useState(2.5);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 210, 44, yaw, 20);
  const R = Math.sqrt(H);

  // Paraboloid z = r^2 vízszintes körei és alkotói
  const rings: string[] = [];
  for (let k = 1; k <= 4; k++) {
    const rk = (R * k) / 4;
    const zk = rk * rk;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      pts.push(P(rk * Math.cos(a), rk * Math.sin(a), zk * 0.72));
    }
    rings.push(pathFrom(pts));
  }
  const ribs: string[] = [];
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 16; i++) {
      const rk = (R * i) / 16;
      pts.push(P(rk * Math.cos(a), rk * Math.sin(a), rk * rk * 0.72));
    }
    ribs.push(pathFrom(pts));
  }

  // Függőleges z-lándzsa r = 0.6 R-nél
  const rS = 0.6 * R;
  const spear1 = P(rS * Math.cos(0.7), rS * Math.sin(0.7), rS * rS * 0.72);
  const spear2 = P(rS * Math.cos(0.7), rS * Math.sin(0.7), H * 0.72);
  const vol = (Math.PI * H * H) / 2;

  return (
    <div className="widget">
      <div className="wtitle">Henger-integrál paraboloidra: z = r²-től z = H-ig, árnyék: 0 ≤ r ≤ √H</div>
      <div className="controls">
        <label>
          Tetősík H = {H.toFixed(1)} (árnyéksugár √H = {R.toFixed(2)})
          <input type="range" min={1.0} max={3.6} step={0.1} value={H} onChange={(e) => setH(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 275" className="wsvg">
        {ribs.map((d, i) => (
          <path key={`r${i}`} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1.1" />
        ))}
        {rings.map((d, i) => (
          <path key={`c${i}`} d={d} fill="none" stroke={i === 3 ? '#2dd4bf' : '#38bdf8'} strokeOpacity={i === 3 ? 0.9 : 0.45} strokeWidth={i === 3 ? 2.2 : 1.3} />
        ))}
        {/* Függőleges z-lándzsa */}
        <line x1={spear1[0]} y1={spear1[1]} x2={spear2[0]} y2={spear2[1]} stroke="#fbbf24" strokeWidth="3" />
        <circle cx={spear1[0]} cy={spear1[1]} r="4" fill="#fb923c" />
        <circle cx={spear2[0]} cy={spear2[1]} r="4" fill="#34d399" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          V = ∫₀²π ∫₀^√H ∫_{'{r²}'}^H r dz dr dθ = ½ π H² = {vol.toFixed(2)}
        </text>
        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          Arany z-lándzsa: belép a z = r² paraboloidon (narancs), kilép a z = H fedősíkon (zöld)!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Gömbi koordináták (ρ, φ, θ) 3D-ben */
export function SphericalCoord3DWidget() {
  const [rho, setRho] = useState(1.8);
  const [phiDeg, setPhiDeg] = useState(50);
  const [thDeg, setThDeg] = useState(45);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 152, 56, yaw, 20);

  const phi = (phiDeg * Math.PI) / 180;
  const th = (thDeg * Math.PI) / 180;
  const r = rho * Math.sin(phi);
  const x = r * Math.cos(th);
  const y = r * Math.sin(th);
  const z = rho * Math.cos(phi);

  // Egyenlítő és aktuális szélességi kör
  const eqPts: [number, number][] = [];
  const latPts: [number, number][] = [];
  const merPts: [number, number][] = [];
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    eqPts.push(P(rho * Math.cos(a), rho * Math.sin(a), 0));
    latPts.push(P(r * Math.cos(a), r * Math.sin(a), z));
  }
  for (let i = 0; i <= 32; i++) {
    const p = (i / 32) * Math.PI;
    merPts.push(P(rho * Math.sin(p) * Math.cos(th), rho * Math.sin(p) * Math.sin(th), rho * Math.cos(p)));
  }

  const O = P(0, 0, 0);
  const Pt = P(x, y, z);
  const Pt0 = P(x, y, 0);

  return (
    <div className="widget">
      <div className="wtitle">Gömbi koordináták (ρ, φ, θ): ρ távolság · φ a +z-tengelytől [0, π] · θ az xy-síkban [0, 2π]</div>
      <div className="controls">
        <label>
          ρ = {rho.toFixed(1)}
          <input type="range" min={0.8} max={2.0} step={0.1} value={rho} onChange={(e) => setRho(+e.target.value)} />
        </label>
        <label>
          φ = {phiDeg}°
          <input type="range" min={10} max={170} step={5} value={phiDeg} onChange={(e) => setPhiDeg(+e.target.value)} />
        </label>
        <label>
          θ = {thDeg}°
          <input type="range" min={0} max={350} step={5} value={thDeg} onChange={(e) => setThDeg(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 280" className="wsvg">
        {/* Tengelyek */}
        <line x1={O[0]} y1={O[1]} x2={P(2.2, 0, 0)[0]} y2={P(2.2, 0, 0)[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={P(0, 2.2, 0)[0]} y2={P(0, 2.2, 0)[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={P(0, 0, -2.0)[0]} y1={P(0, 0, -2.0)[1]} x2={P(0, 0, 2.2)[0]} y2={P(0, 0, 2.2)[1]} stroke="#64748b" strokeWidth="1.2" />

        <path d={pathFrom(eqPts)} fill="none" stroke="#64748b" strokeOpacity="0.4" strokeDasharray="4 4" strokeWidth="1.2" />
        <path d={pathFrom(latPts)} fill="none" stroke="#2dd4bf" strokeOpacity="0.6" strokeWidth="1.6" />
        <path d={pathFrom(merPts)} fill="none" stroke="#38bdf8" strokeOpacity="0.65" strokeWidth="1.8" />

        {/* ρ sugár és vetület */}
        <line x1={O[0]} y1={O[1]} x2={Pt[0]} y2={Pt[1]} stroke="#fbbf24" strokeWidth="2.8" />
        <line x1={O[0]} y1={O[1]} x2={Pt0[0]} y2={Pt0[1]} stroke="#fb923c" strokeDasharray="3 3" strokeWidth="1.8" />
        <line x1={Pt0[0]} y1={Pt0[1]} x2={Pt[0]} y2={Pt[1]} stroke="#34d399" strokeDasharray="3 3" strokeWidth="1.6" />
        <circle cx={Pt[0]} cy={Pt[1]} r="5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          r = ρ sin φ = {r.toFixed(2)} · (x; y; z) = ({x.toFixed(2)}; {y.toFixed(2)}; {z.toFixed(2)})
        </text>
        <text x="16" y="268" fill="#94a3b8" fontSize="11.5">
          Teal: szélességi kör (sugara ρ sin φ) · Cián: hosszúsági délkör (θ állandó) · Arany: ρ távolság
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Gömbi térfogatelem dV = ρ² sin φ dρ dφ dθ */
export function SphericalWedge3DWidget() {
  const [phiDeg, setPhiDeg] = useState(55);
  const phi = (phiDeg * Math.PI) / 180;
  const sinP = Math.sin(phi);

  // 2D-szerű perspektivikus gömbi kocka szemléltetése, amelynek szélessége ~ sin(phi)
  const wLat = Math.max(10, 95 * sinP);
  const hMer = 72;
  const dRad = 44;
  const x0 = 230 - wLat / 2;
  const y0 = 108;

  return (
    <div className="widget">
      <div className="wtitle">Miért dV = ρ² sin φ dρ dφ dθ? A 3 él: dρ, ρ dφ és (ρ sin φ) dθ!</div>
      <div className="controls">
        <label>
          Polárszög φ = {phiDeg}° (sin φ = {sinP.toFixed(2)} — próbáld 10°-nál és 90°-nál!)
          <input type="range" min={8} max={90} step={2} value={phiDeg} onChange={(e) => setPhiDeg(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {/* Hátsó lap */}
        <rect x={x0 + dRad} y={y0 - dRad * 0.55} width={wLat} height={hMer} fill="#38bdf8" fillOpacity="0.12" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="1.2" />
        {/* Összekötő élek (dρ) */}
        <line x1={x0} y1={y0} x2={x0 + dRad} y2={y0 - dRad * 0.55} stroke="#fbbf24" strokeWidth="2.4" />
        <line x1={x0 + wLat} y1={y0} x2={x0 + wLat + dRad} y2={y0 - dRad * 0.55} stroke="#fbbf24" strokeWidth="2.4" />
        <line x1={x0 + wLat} y1={y0 + hMer} x2={x0 + wLat + dRad} y2={y0 + hMer - dRad * 0.55} stroke="#fbbf24" strokeWidth="2.4" />
        {/* Elülső lap */}
        <rect x={x0} y={y0} width={wLat} height={hMer} fill="#2dd4bf" fillOpacity="0.22" stroke="#2dd4bf" strokeWidth="2" />

        {/* Élhossz feliratok */}
        <text x={x0 + wLat / 2} y={y0 + hMer + 20} textAnchor="middle" fill="#2dd4bf" fontSize="12.5" fontWeight="700">
          ρ sin φ dθ ({(sinP * 100).toFixed(0)}%)
        </text>
        <text x={x0 - 10} y={y0 + hMer / 2 + 4} textAnchor="end" fill="#34d399" fontSize="12.5" fontWeight="700">
          ρ dφ
        </text>
        <text x={x0 + wLat + dRad * 0.5 + 10} y={y0 - dRad * 0.35} fill="#fbbf24" fontSize="12.5" fontWeight="700">
          dρ
        </text>

        <text x="16" y="24" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          dV = (dρ) · (ρ dφ) · (ρ sin φ dθ) = ρ² sin φ dρ dφ dθ
        </text>
        <text x="16" y="232" fill="#94a3b8" fontSize="11.5">
          Az Északi-sarknál (φ → 0) a szélességi kör összezáródik (sin φ → 0), az Egyenlítőnél (φ = 90°) a legszélesebb!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Fagylalttölcsér (kúp + gömb) 3D-ben */
export function IceCreamCone3DWidget() {
  const [phi0Deg, setPhi0Deg] = useState(45);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 215, 76, yaw, 20);
  const phi0 = (phi0Deg * Math.PI) / 180;
  const R = 1.9;

  // Kúp alkotói az origóból a (R sin phi0, R cos phi0) peremre
  const coneEdges: string[] = [];
  const rimPts: [number, number][] = [];
  const capArcs: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    rimPts.push(P(R * Math.sin(phi0) * Math.cos(a), R * Math.sin(phi0) * Math.sin(a), R * Math.cos(phi0)));
  }
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    coneEdges.push(pathFrom([P(0, 0, 0), P(R * Math.sin(phi0) * Math.cos(a), R * Math.sin(phi0) * Math.sin(a), R * Math.cos(phi0))]));
    const pts: [number, number][] = [];
    for (let i = 0; i <= 16; i++) {
      const p = (i / 16) * phi0;
      pts.push(P(R * Math.sin(p) * Math.cos(a), R * Math.sin(p) * Math.sin(a), R * Math.cos(p)));
    }
    capArcs.push(pathFrom(pts));
  }

  const volFactor = (2 / 3) * (1 - Math.cos(phi0));

  return (
    <div className="widget">
      <div className="wtitle">A „fagylalttölcsér” (0 ≤ ρ ≤ R, 0 ≤ φ ≤ φ₀): gömbi koordinátákban téglatest!</div>
      <div className="controls">
        <label>
          Kúp félnyílásszöge φ₀ = {phi0Deg}°
          <input type="range" min={15} max={90} step={5} value={phi0Deg} onChange={(e) => setPhi0Deg(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 275" className="wsvg">
        {coneEdges.map((d, i) => (
          <path key={`e${i}`} d={d} fill="none" stroke="#fb923c" strokeOpacity="0.6" strokeWidth="1.5" />
        ))}
        {capArcs.map((d, i) => (
          <path key={`a${i}`} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.65" strokeWidth="1.5" />
        ))}
        <path d={pathFrom(rimPts)} fill="none" stroke="#fbbf24" strokeWidth="2.4" />
        <circle cx={P(0, 0, 0)[0]} cy={P(0, 0, 0)[1]} r="4" fill="#fb923c" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          V = (2π/3) R³ (1 − cos {phi0Deg}°) = {volFactor.toFixed(3)} · π R³
        </text>
        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          φ₀ = 90°-nál pontosan a félgömb térfogatát kapjuk (0,667 πR³ = ⅔ πR³)!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Koordináta-rendszer választó tanácsadó */
export function CoordSystemChooserWidget() {
  const cases = [
    {
      name: 'Tetraéder / Téglatest',
      best: 'Derékszögű (x, y, z)',
      color: '#60a5fa',
      why: 'A határoló felületek síkok (ax + by + cz = d), az integrálási határok lineárisak.',
      dv: 'dV = dz dy dx',
    },
    {
      name: 'Paraboloid + Sík',
      best: 'Henger (r, θ, z)',
      color: '#34d399',
      why: 'z = r² és z = H tengelyszimmetrikus a z-tengelyre, az xy-árnyék kör!',
      dv: 'dV = r dz dr dθ',
    },
    {
      name: 'Gömb + Kúp (Tölcsér)',
      best: 'Gömbi (ρ, φ, θ)',
      color: '#fbbf24',
      why: 'A gömb ρ = R, a kúp φ = φ₀ — mindhárom határ KONSTANS lesz!',
      dv: 'dV = ρ² sin φ dρ dφ dθ',
    },
    {
      name: 'Kifúrt gömb (gömb − henger)',
      best: 'Henger (r, θ, z)',
      color: '#2dd4bf',
      why: 'A henger r = a, a gömb z = ±√(R² − r²): hengerben egyetlen triviális integrál!',
      dv: 'dV = r dz dr dθ',
    },
  ];
  const [sel, setSel] = useState(2);
  const cur = cases[sel];

  return (
    <div className="widget">
      <div className="wtitle">Melyik koordináta-rendszert válasszam? — 4 klasszikus vizsgatest</div>
      <div className="controls">
        {cases.map((c, i) => (
          <button key={c.name} className={sel === i ? 'active' : ''} onClick={() => setSel(i)}>
            {c.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 175" className="wsvg">
        <rect x="16" y="14" width="508" height="146" rx="10" fill="#0f172a" stroke={cur.color} strokeOpacity="0.65" strokeWidth="1.6" />
        <text x="34" y="44" fill={cur.color} fontSize="15" fontWeight="700">Ajánlott rendszer: {cur.best}</text>
        <text x="34" y="76" fill="#e2e8f0" fontSize="12.5">{cur.why}</text>
        <text x="34" y="112" fill="#fbbf24" fontSize="13.5" fontWeight="700" fontFamily="monospace">Térfogatelem:  {cur.dv}</text>
        <text x="34" y="142" fill="#94a3b8" fontSize="11.5">
          Ökölszabály: x²+y² → henger · x²+y²+z² → gömbi · síkok → derékszögű!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Gömbhéj tehetetlenségi nyomatéka */
export function SphereInertiaShellWidget() {
  const [ratio, setRatio] = useState(0.0); // R1 / R2 in [0, 0.95]
  // I_z / (M R2^2) = (2/5) * (1 - q^5) / (1 - q^3)
  const coeff = ratio < 0.01 ? 0.4 : (0.4 * (1 - Math.pow(ratio, 5))) / (1 - Math.pow(ratio, 3));
  const cx = 165;
  const cy = 128;
  const rOut = 84;
  const rIn = rOut * ratio;

  return (
    <div className="widget">
      <div className="wtitle">Homogén gömbhéj tehetetlenségi nyomatéka: tömör gömbtől (2/5) a vékony héjig (2/3)!</div>
      <div className="controls">
        <label>
          Belső / külső sugár R₁/R₂ = {ratio.toFixed(2)}
          <input type="range" min={0} max={0.95} step={0.05} value={ratio} onChange={(e) => setRatio(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {/* Keresztmetszet */}
        <circle cx={cx} cy={cy} r={rOut} fill="#38bdf8" fillOpacity="0.28" stroke="#38bdf8" strokeWidth="2.4" />
        {rIn > 2 && <circle cx={cx} cy={cy} r={rIn} fill="#0f172a" stroke="#fb923c" strokeDasharray="4 3" strokeWidth="1.8" />}
        {/* Tengely */}
        <line x1={cx} y1="22" x2={cx} y2="232" stroke="#fbbf24" strokeDasharray="5 3" strokeWidth="1.6" />
        <text x={cx + 8} y="34" fill="#fbbf24" fontSize="12" fontWeight="700">z-tengely</text>

        <rect x="285" y="42" width="236" height="166" rx="10" fill="#0f172a" stroke="#34d399" strokeOpacity="0.55" strokeWidth="1.4" />
        <text x="302" y="72" fill="#34d399" fontSize="14" fontWeight="700">I_z = {coeff.toFixed(3)} · M R₂²</text>
        <text x="302" y="102" fill="#cbd5e1" fontSize="12">Tömör gömb (R₁ = 0): 2/5 = 0,400</text>
        <text x="302" y="126" fill="#cbd5e1" fontSize="12">Vékony héj (R₁ → R₂): 2/3 ≈ 0,667</text>
        <text x="302" y="160" fill="#94a3b8" fontSize="11">Minél távolabb kerül a tömeg a</text>
        <text x="302" y="176" fill="#94a3b8" fontSize="11">tengelytől, annál nehezebb forgatni!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-térkép */
export function CylSphMasterMapDiagram() {
  const rows = [
    { label: 'Henger (r, θ, z)', expr: 'x = r cos θ, y = r sin θ, z = z  ·  dV = r dz dr dθ', color: '#34d399' },
    { label: 'Gömbi (ρ, φ, θ)', expr: 'x = ρ sin φ cos θ, y = ρ sin φ sin θ, z = ρ cos φ', color: '#38bdf8' },
    { label: 'Gömbi dV', expr: 'dV = ρ² sin φ dρ dφ dθ   (0 ≤ φ ≤ π, 0 ≤ θ ≤ 2π)', color: '#fbbf24' },
    { label: 'Alapfelületek', expr: 'Gömb: ρ = R · Kúp: φ = φ₀ · Henger: r = a (ρ sin φ = a)', color: '#2dd4bf' },
    { label: 'Klasszikus értékek', expr: 'Gömb V = 4πR³/3 · I_z = 2MR²/5 · Félgömb z̄ = 3R/8', color: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 15.6 fejezet mester-képlettára — henger- és gömbi hármas integrálok</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="600">{r.label}</text>
              <text x="172" y={y + 23} fill={r.color} fontSize="11.2" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
