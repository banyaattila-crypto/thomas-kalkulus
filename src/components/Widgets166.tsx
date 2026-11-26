import { useState } from 'react';

/* ============================================================================
   16.6. Paraméteresen adott felületek — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const pathFrom = (pts: [number, number][]) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 6): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1e-3) return '';
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const b1x = x2 - ux * size + px * (size * 0.45);
  const b1y = y2 - uy * size + py * (size * 0.45);
  const b2x = x2 - ux * size - px * (size * 0.45);
  const b2y = y2 - uy * size - py * (size * 0.45);
  return `M${b1x.toFixed(1)},${b1y.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${b2x.toFixed(1)},${b2y.toFixed(1)}`;
}

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

/* ------------------------------------------------------------------ 1. Paraméteres felületek 3D galériája */
export function ParamSurfaceGallery3DWidget() {
  const [kind, setKind] = useState<'sphere' | 'cyl' | 'cone' | 'torus'>('sphere');
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 148, 52, yaw, 22);

  const uLines: string[] = [];
  const vLines: string[] = [];

  const evalS = (u: number, v: number): [number, number, number] => {
    if (kind === 'sphere') return [1.6 * Math.sin(u) * Math.cos(v), 1.6 * Math.sin(u) * Math.sin(v), 1.6 * Math.cos(u)];
    if (kind === 'cyl') return [1.3 * Math.cos(v), 1.3 * Math.sin(v), u];
    if (kind === 'cone') return [u * Math.cos(v), u * Math.sin(v), u - 0.9];
    return [(1.3 + 0.55 * Math.cos(u)) * Math.cos(v), (1.3 + 0.55 * Math.cos(u)) * Math.sin(v), 0.55 * Math.sin(u)];
  };

  const uRange: [number, number] =
    kind === 'sphere' ? [0.2, Math.PI - 0.2] : kind === 'cyl' ? [-1.3, 1.3] : kind === 'cone' ? [0, 1.7] : [0, Math.PI * 2];

  for (let i = 0; i <= 5; i++) {
    const u = uRange[0] + ((uRange[1] - uRange[0]) * i) / 5;
    const pts: [number, number][] = [];
    for (let j = 0; j <= 36; j++) pts.push(P(...evalS(u, (j / 36) * Math.PI * 2)));
    uLines.push(pathFrom(pts));
  }
  for (let j = 0; j < 8; j++) {
    const v = (j / 8) * Math.PI * 2;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 24; i++) {
      const u = uRange[0] + ((uRange[1] - uRange[0]) * i) / 24;
      pts.push(P(...evalS(u, v)));
    }
    vLines.push(pathFrom(pts));
  }

  const label = {
    sphere: 'Gömb: r(φ, θ) = ⟨a sin φ cos θ, a sin φ sin θ, a cos φ⟩',
    cyl: 'Henger: r(θ, z) = ⟨a cos θ, a sin θ, z⟩',
    cone: 'Kúp: r(r, θ) = ⟨r cos θ, r sin θ, r⟩',
    torus: 'Tórusz: r(u, v) = ⟨(R + a cos u) cos v, (R + a cos u) sin v, a sin u⟩',
  }[kind];

  return (
    <div className="widget">
      <div className="wtitle">Paraméteres felületek r(u, v): két paraméterrel (u, v) bármilyen 3D felületet rácsra feszíthetünk!</div>
      <div className="controls">
        <button className={kind === 'sphere' ? 'active' : ''} onClick={() => setKind('sphere')}>Gömb</button>
        <button className={kind === 'cyl' ? 'active' : ''} onClick={() => setKind('cyl')}>Henger</button>
        <button className={kind === 'cone' ? 'active' : ''} onClick={() => setKind('cone')}>Kúp</button>
        <button className={kind === 'torus' ? 'active' : ''} onClick={() => setKind('torus')}>Tórusz</button>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        {uLines.map((d, i) => (
          <path key={`u${i}`} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.58" strokeWidth="1.4" />
        ))}
        {vLines.map((d, i) => (
          <path key={`v${i}`} d={d} fill="none" stroke="#34d399" strokeOpacity="0.45" strokeWidth="1.2" />
        ))}
        <text x="16" y="22" fill="#e2e8f0" fontSize="12" fontWeight="600">{label}</text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          Cián: u = állandó paramétervonalak · Zöld: v = állandó paramétervonalak
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Forgásfelület paraméteres generálása */
export function SurfaceOfRevolution3DWidget() {
  const [sweepDeg, setSweepDeg] = useState(270);
  const [yaw, setYaw] = useState(28);
  const P = makeProj(270, 152, 48, yaw, 20);
  const sweep = (sweepDeg * Math.PI) / 180;

  // y = f(x) = 0.8 + 0.35 sin(1.8 x) forgatva a z-tengely körül: r(z, th) = <f(z) cos th, f(z) sin th, z>
  const rad = (z: number) => 0.85 + 0.35 * Math.sin(2.0 * z);
  const rings: string[] = [];
  for (let k = 0; k <= 6; k++) {
    const z = -1.4 + (2.8 * k) / 6;
    const r = rad(z);
    const pts: [number, number][] = [];
    for (let i = 0; i <= 32; i++) {
      const th = (i / 32) * sweep;
      pts.push(P(r * Math.cos(th), r * Math.sin(th), z));
    }
    rings.push(pathFrom(pts));
  }
  const profPts: [number, number][] = [];
  for (let i = 0; i <= 28; i++) {
    const z = -1.4 + (2.8 * i) / 28;
    profPts.push(P(rad(z), 0, z));
  }

  return (
    <div className="widget">
      <div className="wtitle">Forgásfelület paraméterezése: r(z, θ) = ⟨f(z) cos θ, f(z) sin θ, z⟩</div>
      <div className="controls">
        <label>
          Körbeforgatás θ_max = {sweepDeg}°
          <input type="range" min={60} max={360} step={15} value={sweepDeg} onChange={(e) => setSweepDeg(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {rings.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="1.5" />
        ))}
        <path d={pathFrom(profPts)} fill="none" stroke="#fbbf24" strokeWidth="3" />
        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          Arany: a forgatott profilgörbe r = f(z) · Cián: a θ paraméter által kisöpört körgyűrűk
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Forgásfelület felszíneleme: |r_z × r_θ| = f(z) √(1 + [f′(z)]²) — visszakapjuk a 6.5 fejezet képletét!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Érintővektorok r_u, r_v és normális r_u x r_v */
export function TangentPatchNormal3DWidget() {
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 175, 58, yaw, 22);

  // Kis görbült darab: z = 0.6 - 0.15(u^2 + v^2)
  const f = (u: number, v: number): [number, number, number] => [u, v, 0.8 - 0.18 * (u * u + v * v)];
  const grid: string[] = [];
  for (let i = -2; i <= 2; i++) {
    const u = i * 0.55;
    const p1: [number, number][] = [];
    const p2: [number, number][] = [];
    for (let j = -10; j <= 10; j++) {
      const v = j * 0.11;
      p1.push(P(...f(u, v)));
      p2.push(P(...f(v, u)));
    }
    grid.push(pathFrom(p1), pathFrom(p2));
  }

  const O = P(...f(0, 0));
  const Ru = P(0.95, 0, 0.8);
  const Rv = P(0, 0.95, 0.8);
  const Rn = P(0, 0, 1.85);
  const patch = `${pathFrom([P(0, 0, 0.8), P(0.95, 0, 0.8), P(0.95, 0.95, 0.8), P(0, 0.95, 0.8)])} Z`;

  return (
    <div className="widget">
      <div className="wtitle">Az érintőparalelogramma területe = |r_u × r_v| du dv, normálvektora pedig r_u × r_v!</div>
      <div className="controls">
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {grid.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1.2" />
        ))}
        <path d={patch} fill="#fbbf24" fillOpacity="0.18" stroke="#fbbf24" strokeOpacity="0.7" strokeWidth="1.4" />

        {/* r_u */}
        <line x1={O[0]} y1={O[1]} x2={Ru[0]} y2={Ru[1]} stroke="#34d399" strokeWidth="2.8" />
        <path d={arrowHead(O[0], O[1], Ru[0], Ru[1], 7)} fill="none" stroke="#34d399" strokeWidth="2.5" />
        <text x={Ru[0] - 18} y={Ru[1] + 14} fill="#34d399" fontSize="12.5" fontWeight="700">r_u</text>

        {/* r_v */}
        <line x1={O[0]} y1={O[1]} x2={Rv[0]} y2={Rv[1]} stroke="#fb923c" strokeWidth="2.8" />
        <path d={arrowHead(O[0], O[1], Rv[0], Rv[1], 7)} fill="none" stroke="#fb923c" strokeWidth="2.5" />
        <text x={Rv[0] + 6} y={Rv[1] + 4} fill="#fb923c" fontSize="12.5" fontWeight="700">r_v</text>

        {/* r_u x r_v */}
        <line x1={O[0]} y1={O[1]} x2={Rn[0]} y2={Rn[1]} stroke="#fbbf24" strokeWidth="3" />
        <path d={arrowHead(O[0], O[1], Rn[0], Rn[1], 8)} fill="none" stroke="#fbbf24" strokeWidth="2.6" />
        <text x={Rn[0] + 8} y={Rn[1] + 2} fill="#fbbf24" fontSize="12.5" fontWeight="700">r_u × r_v</text>

        <circle cx={O[0]} cy={O[1]} r="4.5" fill="#e2e8f0" />
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Zöld r_u és narancs r_v kifeszíti az érintősíkot; keresztszorzatuk merőleges rá és hossza a dσ skálázó!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Tórusz felszíne 4π² a R */
export function TorusArea3DWidget() {
  const [R, setR] = useState(1.5);
  const [a, setA] = useState(0.5);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 148, 46, yaw, 26);

  const rings: string[] = [];
  for (let i = 0; i < 10; i++) {
    const v = (i / 10) * Math.PI * 2;
    const pts: [number, number][] = [];
    for (let j = 0; j <= 24; j++) {
      const u = (j / 24) * Math.PI * 2;
      pts.push(P((R + a * Math.cos(u)) * Math.cos(v), (R + a * Math.cos(u)) * Math.sin(v), a * Math.sin(u)));
    }
    rings.push(pathFrom(pts));
  }
  const lat: string[] = [];
  for (let i = 0; i < 6; i++) {
    const u = (i / 6) * Math.PI * 2;
    const pts: [number, number][] = [];
    for (let j = 0; j <= 36; j++) {
      const v = (j / 36) * Math.PI * 2;
      pts.push(P((R + a * Math.cos(u)) * Math.cos(v), (R + a * Math.cos(u)) * Math.sin(v), a * Math.sin(u)));
    }
    lat.push(pathFrom(pts));
  }

  const area = 4 * Math.PI * Math.PI * a * R;

  return (
    <div className="widget">
      <div className="wtitle">A tórusz (fánk) felszíne paraméteres integrállal: Felszín = 4π² a R</div>
      <div className="controls">
        <label>
          Nagy sugár R = {R.toFixed(1)}
          <input type="range" min={1.0} max={2.0} step={0.1} value={R} onChange={(e) => setR(+e.target.value)} />
        </label>
        <label>
          Csősugár a = {a.toFixed(1)}
          <input type="range" min={0.2} max={0.8} step={0.1} value={a} onChange={(e) => setA(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {lat.map((d, i) => (
          <path key={`l${i}`} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.52" strokeWidth="1.3" />
        ))}
        {rings.map((d, i) => (
          <path key={`r${i}`} d={d} fill="none" stroke="#fb923c" strokeOpacity="0.55" strokeWidth="1.2" />
        ))}
        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          |r_u × r_v| = a(R + a cos u)  ⇒  Felszín = 4π² a R = {area.toFixed(2)}
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Gondolj bele: egyetlen z = f(x, y) képlettel a tóruszt még felírni sem lehetne, paraméteresen 3 sor!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Egységesítő: grafikon, henger, gömb */
export function UnifyExplicitParamWidget() {
  const [tab, setTab] = useState<'graph' | 'cyl' | 'sph'>('sph');
  const data = {
    graph: {
      title: 'Függvénygrafikon: r(x, y) = ⟨x, y, f(x, y)⟩',
      cross: 'r_x × r_y = ⟨−f_x, −f_y, 1⟩',
      mag: 'dσ = √(1 + f_x² + f_y²) dx dy  (16.5 képlete!)',
      color: '#38bdf8',
    },
    cyl: {
      title: 'Körhenger (R = a): r(θ, z) = ⟨a cos θ, a sin θ, z⟩',
      cross: 'r_θ × r_z = ⟨a cos θ, a sin θ, 0⟩  (kifelé!)',
      mag: 'dσ = a dθ dz  ⇒  Palást = 2π a h',
      color: '#34d399',
    },
    sph: {
      title: 'Gömb (R = a): r(φ, θ) = ⟨a sin φ cos θ, a sin φ sin θ, a cos φ⟩',
      cross: 'r_φ × r_θ = a² sin φ ⟨sin φ cos θ, sin φ sin θ, cos φ⟩  (kifelé!)',
      mag: 'dσ = a² sin φ dφ dθ  ⇒  Felszín = 4π a²',
      color: '#fbbf24',
    },
  }[tab];

  return (
    <div className="widget">
      <div className="wtitle">Minden felszínelem egyetlen tőből ered: dσ = |r_u × r_v| du dv!</div>
      <div className="controls">
        <button className={tab === 'graph' ? 'active' : ''} onClick={() => setTab('graph')}>Grafikon</button>
        <button className={tab === 'cyl' ? 'active' : ''} onClick={() => setTab('cyl')}>Henger</button>
        <button className={tab === 'sph' ? 'active' : ''} onClick={() => setTab('sph')}>Gömb</button>
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke={data.color} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="32" y="44" fill={data.color} fontSize="13.5" fontWeight="700">{data.title}</text>
        <text x="32" y="80" fill="#cbd5e1" fontSize="12" fontFamily="monospace">{data.cross}</text>
        <text x="32" y="118" fill="#fbbf24" fontSize="13" fontWeight="700" fontFamily="monospace">{data.mag}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Paraméteres fluxus irányítás-ellenőrzés */
export function ParamFluxOrientWidget() {
  const [swapped, setSwapped] = useState(false);

  return (
    <div className="widget">
      <div className="wtitle">Paraméteres fluxus: ∬_S F · n dσ = ±∬_R F · (r_u × r_v) du dv — mindig ellenőrizd az irányt!</div>
      <div className="controls">
        <button className={!swapped ? 'active' : ''} onClick={() => setSwapped(false)}>r_φ × r_θ (kifelé +)</button>
        <button className={swapped ? 'active' : ''} onClick={() => setSwapped(true)}>r_θ × r_φ (befelé −)</button>
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke={swapped ? '#fb923c' : '#34d399'} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="34" y="46" fill={swapped ? '#fb923c' : '#34d399'} fontSize="14" fontWeight="700">
          {swapped ? 'r_θ × r_φ az Egyenlítőn (φ = π/2, θ = 0): ⟨−a², 0, 0⟩ → BEFELÉ!' : 'r_φ × r_θ az Egyenlítőn (φ = π/2, θ = 0): ⟨+a², 0, 0⟩ → KIFELÉ!'}
        </text>
        <text x="34" y="84" fill="#cbd5e1" fontSize="12.5">
          {swapped
            ? 'Ha kifelé irányuló fluxust kér a feladat, tedd ki a mínuszjelet (vagy cseréld meg u ↔ v sorrendjét)!'
            : 'Közvetlenül használható kifelé irányuló fluxushoz: ∬_R F(r(φ, θ)) · (r_φ × r_θ) dφ dθ!'}
        </text>
        <text x="34" y="122" fill="#94a3b8" fontSize="11.5">
          Aranyszabály: mindig teszteld r_u × r_v irányát egyetlen kényelmes pontban!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Helikoid (csavarfelület) 3D-ben */
export function Helicoid3DWidget() {
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 158, 44, yaw, 22);

  const rungs: string[] = [];
  const rails: string[] = [];
  for (let i = 0; i <= 18; i++) {
    const v = -Math.PI + (i / 18) * Math.PI * 2;
    rungs.push(pathFrom([P(0, 0, 0.42 * v), P(1.7 * Math.cos(v), 1.7 * Math.sin(v), 0.42 * v)]));
  }
  for (const u of [0.6, 1.15, 1.7]) {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 48; i++) {
      const v = -Math.PI + (i / 48) * Math.PI * 2;
      pts.push(P(u * Math.cos(v), u * Math.sin(v), 0.42 * v));
    }
    rails.push(pathFrom(pts));
  }

  return (
    <div className="widget">
      <div className="wtitle">A csavarfelület (helikoid): r(u, v) = ⟨u cos v, u sin v, v⟩ — minimálfelület!</div>
      <div className="controls">
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {rungs.map((d, i) => (
          <path key={`r${i}`} d={d} fill="none" stroke="#fb923c" strokeOpacity="0.6" strokeWidth="1.4" />
        ))}
        {rails.map((d, i) => (
          <path key={`h${i}`} d={d} fill="none" stroke="#38bdf8" strokeWidth={i === 2 ? 2.4 : 1.4} />
        ))}
        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          r_u × r_v = ⟨sin v, −cos v, u⟩  ⇒  |r_u × r_v| = √(1 + u²)
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Narancs: egyenes lépcsőfokok (v = áll.) · Cián: csavarvonal-korlátok (u = áll.)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-képlettár */
export function ParamSurfaceMasterMapDiagram() {
  const rows = [
    { label: 'Paraméteres felület', expr: 'r(u, v) = ⟨f(u,v), g(u,v), h(u,v)⟩,  (u,v) ∈ R', color: '#38bdf8' },
    { label: 'Felszínelem dσ', expr: 'dσ = |r_u × r_v| du dv   (érintőparalelogramma)', color: '#34d399' },
    { label: 'Skalár integrál', expr: '∬_S g dσ = ∬_R g(r(u,v)) |r_u × r_v| du dv', color: '#fbbf24' },
    { label: 'Paraméteres fluxus', expr: '∬_S F · n dσ = ±∬_R F(r(u,v)) · (r_u × r_v) du dv', color: '#fb923c' },
    { label: 'Klasszikus |r_u×r_v|', expr: 'Henger: a · Gömb: a² sin φ · Tórusz: a(R + a cos u)', color: '#2dd4bf' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 16.6 fejezet mester-képlettára — paraméteresen adott felületek</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="600">{r.label}</text>
              <text x="176" y={y + 23} fill={r.color} fontSize="11.2" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
