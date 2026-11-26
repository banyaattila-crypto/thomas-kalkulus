import { useState } from 'react';

/* ============================================================================
   16.5. Felület felszíne és felületi integrál — 8 interaktív 2D/3D SVG widget
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

/* ------------------------------------------------------------------ 1. Ferde felületelem vetülete: dσ = sec(γ) dA */
export function TiltedPatchProjection3DWidget() {
  const [deg, setDeg] = useState(40);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 185, 56, yaw, 20);

  const g = (deg * Math.PI) / 180;
  const sec = 1 / Math.cos(g);
  const slope = Math.tan(g);

  // Árnyék téglalap az xy-síkban: [-0.8, 0.8] x [-0.6, 0.6]
  const sh = [P(-0.8, -0.6, 0), P(0.8, -0.6, 0), P(0.8, 0.6, 0), P(-0.8, 0.6, 0)];
  // Ferde felületelem felette: z = 1.1 + 0.55 * slope * x
  const zOf = (x: number) => 1.2 + Math.min(0.95, 0.55 * slope * x);
  const top = [P(-0.8, -0.6, zOf(-0.8)), P(0.8, -0.6, zOf(0.8)), P(0.8, 0.6, zOf(0.8)), P(-0.8, 0.6, zOf(-0.8))];

  const Ctop = P(0, 0, 1.2);
  const Nend = P(-Math.sin(g) * 0.9, 0, 1.2 + Math.cos(g) * 0.9);
  const Kend = P(0, 0, 2.1);

  return (
    <div className="widget">
      <div className="wtitle">Ferde felületdarab és az árnyéka: dσ = (|∇F| / |∇F · k|) dA = (1 / cos γ) dA!</div>
      <div className="controls">
        <label>
          Dőlésszög γ = {deg}° (1 / cos γ = {sec.toFixed(2)}×)
          <input type="range" min={0} max={68} step={2} value={deg} onChange={(e) => setDeg(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {/* Vetítő vonalak */}
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={sh[i][0]} y1={sh[i][1]} x2={top[i][0]} y2={top[i][1]} stroke="#64748b" strokeDasharray="3 3" strokeWidth="1.2" />
        ))}
        {/* Árnyék dA */}
        <path d={`${pathFrom(sh)} Z`} fill="#2dd4bf" fillOpacity="0.22" stroke="#2dd4bf" strokeWidth="2" />
        {/* Ferde darab dσ */}
        <path d={`${pathFrom(top)} Z`} fill="#38bdf8" fillOpacity="0.28" stroke="#38bdf8" strokeWidth="2.4" />

        {/* k és ∇F */}
        <line x1={Ctop[0]} y1={Ctop[1]} x2={Kend[0]} y2={Kend[1]} stroke="#94a3b8" strokeDasharray="4 2" strokeWidth="1.8" />
        <line x1={Ctop[0]} y1={Ctop[1]} x2={Nend[0]} y2={Nend[1]} stroke="#fb923c" strokeWidth="2.6" />
        <path d={arrowHead(Ctop[0], Ctop[1], Nend[0], Nend[1], 7)} fill="none" stroke="#fb923c" strokeWidth="2.3" />
        <text x={Nend[0] - 26} y={Nend[1] - 4} fill="#fb923c" fontSize="12" fontWeight="700">∇F</text>
        <text x={Kend[0] + 6} y={Kend[1] + 4} fill="#94a3b8" fontSize="11.5">k</text>

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          Minél meredekebb a tető (γ ↑), annál több cserép (dσ = {sec.toFixed(2)} dA) kell ugyanakkora dA alapra!
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Teal: dA alaprajzi árnyék · Cián: dσ ferde felületdarab · Narancs: ∇F normálvektor
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Paraboloid felszíne z = a(x^2+y^2) */
export function ParaboloidCapArea3DWidget() {
  const [a, setA] = useState(1.0);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 215, 58, yaw, 20);

  const rings: string[] = [];
  for (let k = 1; k <= 4; k++) {
    const rk = k / 4;
    const zk = a * rk * rk;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 36; i++) {
      const th = (i / 36) * Math.PI * 2;
      pts.push(P(rk * Math.cos(th), rk * Math.sin(th), zk));
    }
    rings.push(pathFrom(pts));
  }
  const ribs: string[] = [];
  for (let k = 0; k < 8; k++) {
    const th = (k / 8) * Math.PI * 2;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 14; i++) {
      const rk = i / 14;
      pts.push(P(rk * Math.cos(th), rk * Math.sin(th), a * rk * rk));
    }
    ribs.push(pathFrom(pts));
  }

  const area = (Math.PI / (6 * a * a)) * (Math.pow(1 + 4 * a * a, 1.5) - 1);

  return (
    <div className="widget">
      <div className="wtitle">Paraboloid z = a(x² + y²) felszíne az x² + y² ≤ 1 egységkör fölött: dσ = √(1 + 4a²r²) dA</div>
      <div className="controls">
        <label>
          Meredekség a = {a.toFixed(1)}
          <input type="range" min={0.3} max={1.8} step={0.1} value={a} onChange={(e) => setA(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {ribs.map((d, i) => (
          <path key={`r${i}`} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1.2" />
        ))}
        {rings.map((d, i) => (
          <path key={`c${i}`} d={d} fill="none" stroke={i === 3 ? '#34d399' : '#38bdf8'} strokeOpacity={i === 3 ? 0.9 : 0.5} strokeWidth={i === 3 ? 2.2 : 1.3} />
        ))}
        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          Felszín = (π / 6a²) [(1 + 4a²)^(3/2) − 1] = {area.toFixed(2)} (alaplap területe: π ≈ 3,14)
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Ha a → 0, a paraboloid ellaposodik és a felszín pontosan az egységkör π területéhez tart!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Kúp skalár felületi integrálja */
export function ConeSurfaceIntegral3DWidget() {
  const [H, setH] = useState(2.2);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 215, 42, yaw, 20);

  const rings: string[] = [];
  for (let k = 1; k <= 4; k++) {
    const rk = (H * k) / 4;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 36; i++) {
      const th = (i / 36) * Math.PI * 2;
      pts.push(P(rk * Math.cos(th), rk * Math.sin(th), rk));
    }
    rings.push(pathFrom(pts));
  }
  const ribs: string[] = [];
  for (let k = 0; k < 8; k++) {
    const th = (k / 8) * Math.PI * 2;
    ribs.push(pathFrom([P(0, 0, 0), P(H * Math.cos(th), H * Math.sin(th), H)]));
  }

  const val = ((2 * Math.PI * Math.SQRT2) / 3) * Math.pow(H, 3);

  return (
    <div className="widget">
      <div className="wtitle">Skalár felületi integrál a z = √(x² + y²) kúpon (0 ≤ z ≤ H): dσ = √2 dA állandó!</div>
      <div className="controls">
        <label>
          Kúp magassága H = {H.toFixed(1)}
          <input type="range" min={1.0} max={3.0} step={0.1} value={H} onChange={(e) => setH(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {ribs.map((d, i) => (
          <path key={`r${i}`} d={d} fill="none" stroke="#fb923c" strokeOpacity="0.45" strokeWidth="1.2" />
        ))}
        {rings.map((d, i) => (
          <path key={`c${i}`} d={d} fill="none" stroke={i === 3 ? '#fbbf24' : '#38bdf8'} strokeWidth={i === 3 ? 2.4 : 1.4} />
        ))}
        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          ∬_S z dσ = (2π√2 / 3) H³ = {val.toFixed(2)} · Homogén kúphéj súlypontja: z̄ = ⅔ H = {((2 / 3) * H).toFixed(2)}
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          A 45°-os kúp minden pontban azonos meredekségű, ezért dσ = √2 dA (gyökös szorzó konstans)!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Fluxus: n dσ négyzetgyök-kiejtés */
export function SurfaceFluxCancelWidget() {
  const [up, setUp] = useState(true);

  return (
    <div className="widget">
      <div className="wtitle">Fluxus z = f(x, y) felületen át: a négyzetgyök pontosan kiesik az n dσ szorzatban!</div>
      <div className="controls">
        <button className={up ? 'active' : ''} onClick={() => setUp(true)}>Felfelé irányított (+n)</button>
        <button className={!up ? 'active' : ''} onClick={() => setUp(false)}>Lefelé irányított (−n)</button>
      </div>
      <svg viewBox="0 0 540 170" className="wsvg">
        <rect x="16" y="14" width="508" height="142" rx="10" fill="#0f172a" stroke={up ? '#34d399' : '#fb923c'} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="34" y="46" fill={up ? '#34d399' : '#fb923c'} fontSize="14" fontWeight="700" fontFamily="monospace">
          {up ? 'n dσ = ⟨−f_x, −f_y, +1⟩ dA' : 'n dσ = ⟨+f_x, +f_y, −1⟩ dA'}
        </text>
        <text x="34" y="84" fill="#cbd5e1" fontSize="12.5" fontFamily="monospace">
          {up
            ? '∬_S F · n dσ = ∬_R (−M f_x − N f_y + P) dA'
            : '∬_S F · n dσ = ∬_R (+M f_x + N f_y − P) dA'}
        </text>
        <text x="34" y="126" fill="#94a3b8" fontSize="11.5">
          Mivel n nevezőjében √(1+f_x²+f_y²) áll, dσ-ban pedig szorzóként, tökéletesen kiejtik egymást!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Fluxus gömbön: F = r vs Coulomb F = r/r^3 */
export function SphereFlux3DWidget() {
  const [R, setR] = useState(1.5);
  const [kind, setKind] = useState<'linear' | 'coulomb'>('coulomb');
  const cx = 185;
  const cy = 128;
  const rPx = R * 38;

  const flux = kind === 'linear' ? 4 * Math.PI * R * R * R : 4 * Math.PI;
  const arrows = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
    const a = (k / 8) * Math.PI * 2;
    const len = kind === 'linear' ? R * 14 : 34 / (R * R);
    return {
      x1: cx + rPx * Math.cos(a),
      y1: cy - rPx * Math.sin(a),
      x2: cx + (rPx + len) * Math.cos(a),
      y2: cy - (rPx + len) * Math.sin(a),
    };
  });

  return (
    <div className="widget">
      <div className="wtitle">Fluxus R sugarú gömbön: n = r/R, így a Coulomb-tér (r/r³) fluxusa mindig 4π (Gauss-törvény)!</div>
      <div className="controls">
        <button className={kind === 'coulomb' ? 'active' : ''} onClick={() => setKind('coulomb')}>Coulomb F = r / r³</button>
        <button className={kind === 'linear' ? 'active' : ''} onClick={() => setKind('linear')}>Radiális F = r</button>
        <label>
          Gömb sugara R = {R.toFixed(1)}
          <input type="range" min={1.0} max={2.2} step={0.1} value={R} onChange={(e) => setR(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 245" className="wsvg">
        <circle cx={cx} cy={cy} r={rPx} fill="#38bdf8" fillOpacity="0.14" stroke="#38bdf8" strokeWidth="2.2" />
        <ellipse cx={cx} cy={cy} rx={rPx} ry={rPx * 0.32} fill="none" stroke="#38bdf8" strokeOpacity="0.4" strokeDasharray="4 3" />
        {arrows.map((a, i) => (
          <g key={i}>
            <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#fb923c" strokeWidth="2" />
            <path d={arrowHead(a.x1, a.y1, a.x2, a.y2, 5.5)} fill="none" stroke="#fb923c" strokeWidth="1.8" />
          </g>
        ))}
        <circle cx={cx} cy={cy} r="4.5" fill="#fbbf24" />

        <rect x="315" y="42" width="210" height="162" rx="10" fill="#0f172a" stroke="#34d399" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="330" y="70" fill="#38bdf8" fontSize="13" fontWeight="700">
          {kind === 'coulomb' ? 'F · n = 1 / R²' : 'F · n = R'}
        </text>
        <text x="330" y="98" fill="#cbd5e1" fontSize="12">Felszín = 4π R² = {(4 * Math.PI * R * R).toFixed(1)}</text>
        <text x="330" y="136" fill="#34d399" fontSize="15" fontWeight="700">
          Fluxus = {flux.toFixed(2)}
        </text>
        <text x="330" y="168" fill="#fbbf24" fontSize="11.5">
          {kind === 'coulomb' ? 'R² kiesik → mindig 4π!' : '4π R³ (nő R köbével!)'}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Zárt henger 3 lapja */
export function ClosedCylinderFlux3DWidget() {
  const [face, setFace] = useState<'all' | 'top' | 'side' | 'bot'>('all');

  const data = {
    all: { title: 'Teljes zárt henger (x²+y² ≤ 1, 0 ≤ z ≤ 2), F = ⟨x, y, z⟩', val: '2π + 4π + 0 = 6π', col: '#34d399' },
    top: { title: 'Tetőlap (z = 2, n = +k): F · n = z = 2', val: '2 · π(1²) = 2π', col: '#38bdf8' },
    side: { title: 'Palást (r = 1, n = ⟨x, y, 0⟩): F · n = x² + y² = 1', val: '1 · (2π · 1 · 2) = 4π', col: '#fbbf24' },
    bot: { title: 'Alaplap (z = 0, n = −k): F · n = −z = 0', val: '0', col: '#fb923c' },
  }[face];

  return (
    <div className="widget">
      <div className="wtitle">Zárt felület több darabból: a teljes kifelé fluxus a lapok fluxusainak összege!</div>
      <div className="controls">
        <button className={face === 'all' ? 'active' : ''} onClick={() => setFace('all')}>Összesen (6π)</button>
        <button className={face === 'top' ? 'active' : ''} onClick={() => setFace('top')}>Tető (2π)</button>
        <button className={face === 'side' ? 'active' : ''} onClick={() => setFace('side')}>Palást (4π)</button>
        <button className={face === 'bot' ? 'active' : ''} onClick={() => setFace('bot')}>Alap (0)</button>
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke={data.col} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="34" y="48" fill={data.col} fontSize="13.5" fontWeight="700">{data.title}</text>
        <text x="34" y="92" fill="#e2e8f0" fontSize="16" fontWeight="700" fontFamily="monospace">Fluxus = {data.val}</text>
        <text x="34" y="128" fill="#94a3b8" fontSize="11.5">
          (Előretekintés 16.8: Gauss-tétellel div F = 3, és 3 · V_henger = 3 · 2π = 6π egyetlen sorban!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Vetítési sík választó */
export function ProjectionPlanePickerWidget() {
  const [plane, setPlane] = useState<'xy' | 'xz' | 'yz'>('xy');
  const info = {
    xy: { surf: 'z = f(x, y)', p: 'p = k', ds: 'dσ = √(1 + f_x² + f_y²) dx dy', color: '#38bdf8' },
    xz: { surf: 'y = g(x, z)', p: 'p = j', ds: 'dσ = √(1 + g_x² + g_z²) dx dz', color: '#34d399' },
    yz: { surf: 'x = h(y, z)', p: 'p = i', ds: 'dσ = √(1 + h_y² + h_z²) dy dz', color: '#fbbf24' },
  }[plane];

  return (
    <div className="widget">
      <div className="wtitle">Melyik koordinátasíkra vetítsünk? Mindig arra, amelyikre ∇F · p ≠ 0!</div>
      <div className="controls">
        <button className={plane === 'xy' ? 'active' : ''} onClick={() => setPlane('xy')}>xy-sík (z = f(x,y))</button>
        <button className={plane === 'xz' ? 'active' : ''} onClick={() => setPlane('xz')}>xz-sík (y = g(x,z))</button>
        <button className={plane === 'yz' ? 'active' : ''} onClick={() => setPlane('yz')}>yz-sík (x = h(y,z))</button>
      </div>
      <svg viewBox="0 0 540 145" className="wsvg">
        <rect x="16" y="14" width="508" height="116" rx="10" fill="#0f172a" stroke={info.color} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="34" y="48" fill={info.color} fontSize="14.5" fontWeight="700" fontFamily="monospace">Felület: {info.surf}   (vetítési normális: {info.p})</text>
        <text x="34" y="92" fill="#e2e8f0" fontSize="14" fontWeight="700" fontFamily="monospace">{info.ds}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-képlettár */
export function SurfaceIntegralMasterMapDiagram() {
  const rows = [
    { label: 'Implicit felszín', expr: 'dσ = (|∇F| / |∇F · p|) dA   (F(x,y,z) = c)', color: '#38bdf8' },
    { label: 'Grafikon z = f(x,y)', expr: 'dσ = √(1 + f_x² + f_y²) dA   (analóg √(1+(f′)²)!)', color: '#34d399' },
    { label: 'Skalár felületi int.', expr: '∬_S g(x,y,z) dσ   (tömeg M, súlypont, I_z)', color: '#fbbf24' },
    { label: 'Fluxus (vektoros)', expr: '∬_S F · n dσ = ∬_R (−M f_x − N f_y + P) dA  (felfelé)', color: '#fb923c' },
    { label: 'Gömbön (R sugarú)', expr: 'n = r/R  ·  Coulomb fluxus = 4π (Gauss-törvény!)', color: '#2dd4bf' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 16.5 fejezet mester-képlettára — felszín, skalár és fluxus felületi integrál</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="600">{r.label}</text>
              <text x="178" y={y + 23} fill={r.color} fontSize="11.2" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
