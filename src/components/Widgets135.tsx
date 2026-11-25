import { useState } from 'react';

/* ============================================================================
   13.5. Torzió és a normált binormális — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const pathFrom = (pts: [number, number][]) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 7): string {
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

/* ------------------------------------------------------------------ 1. Frenet TNB mozgó triéder 3D-ben */
export function FrenetFrame3DWidget() {
  const [t, setT] = useState(1.6);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 155, 42, yaw, 20);

  const a = 1.4;
  const b = 0.5;
  const spd = Math.hypot(a, b);
  const r = (u: number): [number, number, number] => [a * Math.cos(u), a * Math.sin(u), b * u - 1.3];
  const T = (u: number): [number, number, number] => [(-a * Math.sin(u)) / spd, (a * Math.cos(u)) / spd, b / spd];
  const N = (u: number): [number, number, number] => [-Math.cos(u), -Math.sin(u), 0];
  const B = (u: number): [number, number, number] => [(b * Math.sin(u)) / spd, (-b * Math.cos(u)) / spd, a / spd];

  const pts: [number, number][] = [];
  for (let i = 0; i <= 100; i++) pts.push(P(...r((i / 100) * 6.0)));

  const [rx, ry, rz] = r(t);
  const [tx, ty, tz] = T(t);
  const [nx, ny, nz] = N(t);
  const [bx, by, bz] = B(t);

  const Pt = P(rx, ry, rz);
  const PT = P(rx + tx * 0.95, ry + ty * 0.95, rz + tz * 0.95);
  const PN = P(rx + nx * 0.95, ry + ny * 0.95, rz + nz * 0.95);
  const PB = P(rx + bx * 0.95, ry + by * 0.95, rz + bz * 0.95);

  return (
    <div className="widget">
      <div className="wtitle">A Frenet-féle TNB mozgó triéder: jobbsodrású ortonormált bázis a görbe minden pontjában!</div>
      <div className="controls">
        <label>
          t = {t.toFixed(2)}
          <input type="range" min={0.3} max={5.6} step={0.05} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 280" className="wsvg">
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeOpacity="0.65" strokeWidth="2.3" />

        {/* T */}
        <line x1={Pt[0]} y1={Pt[1]} x2={PT[0]} y2={PT[1]} stroke="#34d399" strokeWidth="3" />
        <path d={arrowHead(Pt[0], Pt[1], PT[0], PT[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.6" />
        <text x={PT[0] + 6} y={PT[1] - 4} fill="#34d399" fontSize="13" fontWeight="700">T</text>

        {/* N */}
        <line x1={Pt[0]} y1={Pt[1]} x2={PN[0]} y2={PN[1]} stroke="#fb923c" strokeWidth="3" />
        <path d={arrowHead(Pt[0], Pt[1], PN[0], PN[1], 8)} fill="none" stroke="#fb923c" strokeWidth="2.6" />
        <text x={PN[0] + 6} y={PN[1] + 12} fill="#fb923c" fontSize="13" fontWeight="700">N</text>

        {/* B */}
        <line x1={Pt[0]} y1={Pt[1]} x2={PB[0]} y2={PB[1]} stroke="#fbbf24" strokeWidth="3" />
        <path d={arrowHead(Pt[0], Pt[1], PB[0], PB[1], 8)} fill="none" stroke="#fbbf24" strokeWidth="2.6" />
        <text x={PB[0] + 6} y={PB[1] - 4} fill="#fbbf24" fontSize="13" fontWeight="700">B = T × N</text>

        <circle cx={Pt[0]} cy={Pt[1]} r="4.8" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          |T| = |N| = |B| = 1 · T ⊥ N ⊥ B (saját „pilótafülke” koordináta-rendszer!)
        </text>
        <text x="16" y="268" fill="#94a3b8" fontSize="11.5">
          Zöld: T (előre) · Narancs: N (kanyar felé) · Arany: B = T × N (a simulósíkra merőleges „felfelé”)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Jobb- vs. balsodrású torzió (csavarvonal) */
export function TorsionHelix3DWidget() {
  const [b, setB] = useState(0.8);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 155, 40, yaw, 20);
  const a = 1.3;
  const kappa = a / (a * a + b * b);
  const tau = b / (a * a + b * b);

  const pts: [number, number][] = [];
  for (let i = 0; i <= 110; i++) {
    const t = (i / 110) * Math.PI * 3;
    const z = b * (t - Math.PI * 1.5) * 0.45;
    pts.push(P(a * Math.cos(t), a * Math.sin(t), z));
  }

  return (
    <div className="widget">
      <div className="wtitle">A torzió előjeles! b &gt; 0: jobbsodrású (τ &gt; 0) · b = 0: síkgörbe (τ = 0) · b &lt; 0: balsodrású (τ &lt; 0)</div>
      <div className="controls">
        <label>
          Emelkedés b = {b.toFixed(1)}
          <input type="range" min={-1.8} max={1.8} step={0.1} value={b} onChange={(e) => setB(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <path
          d={pathFrom(pts)}
          fill="none"
          stroke={Math.abs(b) < 0.05 ? '#34d399' : b > 0 ? '#38bdf8' : '#fb923c'}
          strokeWidth="2.6"
        />
        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          κ = a/(a²+b²) = {kappa.toFixed(3)} (mindig ≥ 0) · τ = b/(a²+b²) = {tau.toFixed(3)}
        </text>
        <text x="16" y="42" fill={Math.abs(b) < 0.05 ? '#34d399' : b > 0 ? '#38bdf8' : '#fb923c'} fontSize="12">
          {Math.abs(b) < 0.05
            ? 'τ = 0 → A görbe teljesen síkban marad (kör)!'
            : b > 0
              ? 'τ > 0 → Jobbsodrású csavarodás (felfelé tekeredik ki a síkból)'
              : 'τ < 0 → Balsodrású csavarodás (lefelé tekeredik ki a síkból)'}
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          A görbület a síkbeli kanyarodást, a torzió a síkból való kicsavarodás sebességét méri.
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Determinánsos torzió-számológép */
export function TorsionDeterminantWidget() {
  const [kind, setKind] = useState<'cubic' | 'helix' | 'planar'>('cubic');
  const [t, setT] = useState(1.0);

  let r1: [number, number, number];
  let r2: [number, number, number];
  let r3: [number, number, number];
  let name: string;

  if (kind === 'cubic') {
    name = 'r(t) = ⟨t, t², t³⟩';
    r1 = [1, 2 * t, 3 * t * t];
    r2 = [0, 2, 6 * t];
    r3 = [0, 0, 6];
  } else if (kind === 'helix') {
    name = 'r(t) = ⟨cos t, sin t, t⟩';
    r1 = [-Math.sin(t), Math.cos(t), 1];
    r2 = [-Math.cos(t), -Math.sin(t), 0];
    r3 = [Math.sin(t), -Math.cos(t), 0];
  } else {
    name = 'r(t) = ⟨t, t², 2t − t²⟩ (síkban: z = 2x − y)';
    r1 = [1, 2 * t, 2 - 2 * t];
    r2 = [0, 2, -2];
    r3 = [0, 0, 0];
  }

  const cx = r1[1] * r2[2] - r1[2] * r2[1];
  const cy = r1[2] * r2[0] - r1[0] * r2[2];
  const cz = r1[0] * r2[1] - r1[1] * r2[0];
  const crossSq = cx * cx + cy * cy + cz * cz;
  const triple = cx * r3[0] + cy * r3[1] + cz * r3[2];
  const tau = triple / crossSq;

  return (
    <div className="widget">
      <div className="wtitle">3D torzió vegyes szorzattal: τ(t) = [(r′ × r″) · r‴] / |r′ × r″|²</div>
      <div className="controls">
        <button className={kind === 'cubic' ? 'active' : ''} onClick={() => setKind('cubic')}>Térbeli köbös</button>
        <button className={kind === 'helix' ? 'active' : ''} onClick={() => setKind('helix')}>Csavarvonal</button>
        <button className={kind === 'planar' ? 'active' : ''} onClick={() => setKind('planar')}>Síkgörbe térben</button>
        <label>
          t = {t.toFixed(2)}
          <input type="range" min={-1.5} max={2.0} step={0.1} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 190" className="wsvg">
        <rect x="16" y="14" width="508" height="162" rx="10" fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x="32" y="40" fill="#38bdf8" fontSize="13.5" fontWeight="700">{name}</text>
        <text x="32" y="66" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
          r′({t.toFixed(1)}) = ⟨{r1[0].toFixed(2)}; {r1[1].toFixed(2)}; {r1[2].toFixed(2)}⟩
        </text>
        <text x="32" y="88" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
          r″({t.toFixed(1)}) = ⟨{r2[0].toFixed(2)}; {r2[1].toFixed(2)}; {r2[2].toFixed(2)}⟩   ·   r‴ = ⟨{r3[0].toFixed(2)}; {r3[1].toFixed(2)}; {r3[2].toFixed(2)}⟩
        </text>
        <text x="32" y="116" fill="#fbbf24" fontSize="12" fontFamily="monospace">
          Vegyes szorzat (r′ × r″) · r‴ = {triple.toFixed(2)}   ·   |r′ × r″|² = {crossSq.toFixed(2)}
        </text>
        <text x="32" y="148" fill="#34d399" fontSize="14.5" fontWeight="700" fontFamily="monospace">
          τ({t.toFixed(1)}) = {tau.toFixed(4)}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Gyorsulás felbontása: a = a_T T + a_N N */
export function AccelDecompositionWidget() {
  const [aT, setAT] = useState(1.6);
  const [aN, setAN] = useState(2.2);

  const ox = 250;
  const oy = 110;
  const scale = 36;

  // T jobbra, N lefelé (befelé a kanyarba)
  const tx = ox + aT * scale;
  const ty = oy;
  const nx = ox;
  const ny = oy + aN * scale;
  const ax = ox + aT * scale;
  const ay = oy + aN * scale;
  const aMag = Math.hypot(aT, aN);

  return (
    <div className="widget">
      <div className="wtitle">A gyorsulás felbontása a simulósíkban: a = a_T T + a_N N (a_B mindig 0!)</div>
      <div className="controls">
        <label>
          Érintőleges a_T = {aT.toFixed(1)} ({aT > 0 ? 'gyorsít' : aT < 0 ? 'fékez' : 'állandó tempó'})
          <input type="range" min={-3} max={3} step={0.1} value={aT} onChange={(e) => setAT(+e.target.value)} />
        </label>
        <label>
          Normális a_N = {aN.toFixed(1)} (kanyarodás ≥ 0)
          <input type="range" min={0} max={3.2} step={0.1} value={aN} onChange={(e) => setAN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 255" className="wsvg">
        {/* Görbe ív */}
        <path d="M 90,175 Q 250,45 410,175" fill="none" stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="2.4" />
        {/* T és N egységirányok halványan */}
        <line x1="120" y1={oy} x2="400" y2={oy} stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />
        <line x1={ox} y1={oy} x2={ox} y2="235" stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />

        {/* Téglalap vetítés */}
        <line x1={tx} y1={ty} x2={ax} y2={ay} stroke="#fbbf24" strokeOpacity="0.45" strokeDasharray="3 3" strokeWidth="1.2" />
        <line x1={nx} y1={ny} x2={ax} y2={ay} stroke="#fbbf24" strokeOpacity="0.45" strokeDasharray="3 3" strokeWidth="1.2" />

        {/* a_T T */}
        {Math.abs(aT) > 0.05 && (
          <>
            <line x1={ox} y1={oy} x2={tx} y2={ty} stroke="#34d399" strokeWidth="2.8" />
            <path d={arrowHead(ox, oy, tx, ty, 7)} fill="none" stroke="#34d399" strokeWidth="2.5" />
            <text x={tx + (aT > 0 ? 6 : -36)} y={ty - 8} fill="#34d399" fontSize="12" fontWeight="700">a_T T</text>
          </>
        )}

        {/* a_N N */}
        {aN > 0.05 && (
          <>
            <line x1={ox} y1={oy} x2={nx} y2={ny} stroke="#fb923c" strokeWidth="2.8" />
            <path d={arrowHead(ox, oy, nx, ny, 7)} fill="none" stroke="#fb923c" strokeWidth="2.5" />
            <text x={nx - 42} y={ny + 4} fill="#fb923c" fontSize="12" fontWeight="700">a_N N</text>
          </>
        )}

        {/* Eredő a */}
        <line x1={ox} y1={oy} x2={ax} y2={ay} stroke="#f87171" strokeWidth="3" />
        <path d={arrowHead(ox, oy, ax, ay, 8)} fill="none" stroke="#f87171" strokeWidth="2.6" />
        <text x={ax + 8} y={ay + 10} fill="#f87171" fontSize="13" fontWeight="700">a</text>

        <circle cx={ox} cy={oy} r="5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          |a| = √(a_T² + a_N²) = {aMag.toFixed(2)} · Pitagorasz: a_N = √(|a|² − a_T²)
        </text>
        <text x="16" y="246" fill="#94a3b8" fontSize="11.5">
          Zöld a_T: a gáz/fék pedál hatása (d|v|/dt) · Narancs a_N: a kormány hatása (κ|v|² ≥ 0)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Frenet-Serret egyenletek mátrixa */
export function FrenetSerretMatrixDiagram() {
  const [sel, setSel] = useState<0 | 1 | 2>(1);
  const eqs = [
    { lhs: 'dT / ds', rhs: '      + κ N', color: '#34d399', desc: 'T csak N irányban fordul el — sebessége a κ görbület!' },
    { lhs: 'dN / ds', rhs: '−κ T        + τ B', color: '#fb923c', desc: 'N egyszerre fordul hátra (−κT) és csavarodik ki (+τB)!' },
    { lhs: 'dB / ds', rhs: '      − τ N', color: '#fbbf24', desc: 'B csak N irányban billen — ez definiálja a τ torziót!' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A Frenet–Serret-egyenletek (ferdeszimmetrikus mátrixszerkezet!)</div>
      <div className="controls">
        <button className={sel === 0 ? 'active' : ''} onClick={() => setSel(0)}>dT/ds</button>
        <button className={sel === 1 ? 'active' : ''} onClick={() => setSel(1)}>dN/ds</button>
        <button className={sel === 2 ? 'active' : ''} onClick={() => setSel(2)}>dB/ds</button>
      </div>
      <svg viewBox="0 0 540 205" className="wsvg">
        {eqs.map((e, idx) => {
          const y = 16 + idx * 44;
          const active = idx === sel;
          return (
            <g key={e.lhs}>
              <rect
                x="18"
                y={y}
                width="504"
                height="36"
                rx="7"
                fill="#0f172a"
                stroke={e.color}
                strokeOpacity={active ? 1 : 0.35}
                strokeWidth={active ? 2 : 1.1}
              />
              <text x="38" y={y + 23} fill={e.color} fontSize="14" fontWeight="700" fontFamily="monospace">
                {e.lhs}  =  {e.rhs}
              </text>
              <text x="506" y={y + 22} textAnchor="end" fill="#94a3b8" fontSize="11">
                {idx === 0 ? '(0, κ, 0)' : idx === 1 ? '(−κ, 0, τ)' : '(0, −τ, 0)'}
              </text>
            </g>
          );
        })}
        <rect x="18" y="152" width="504" height="38" rx="7" fill="#1e293b" stroke={eqs[sel].color} strokeOpacity="0.6" strokeWidth="1.2" />
        <text x="34" y="176" fill="#e2e8f0" fontSize="12.5" fontWeight="600">{eqs[sel].desc}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. A 3 nevezetes sík 3D-ben */
export function ThreePlanes3DWidget() {
  const [plane, setPlane] = useState<'osc' | 'norm' | 'rect'>('osc');
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 148, 68, yaw, 22);

  // Helyi T, N, B keret az origóban (T = x, N = y, B = z)
  const O = P(0, 0, 0);
  const PT = P(1.2, 0, 0);
  const PN = P(0, 1.2, 0);
  const PB = P(0, 0, 1.2);

  const s = 0.85;
  const quad = (u: [number, number, number], v: [number, number, number]) => {
    const c1 = P(s * (u[0] + v[0]), s * (u[1] + v[1]), s * (u[2] + v[2]));
    const c2 = P(s * (-u[0] + v[0]), s * (-u[1] + v[1]), s * (-u[2] + v[2]));
    const c3 = P(s * (-u[0] - v[0]), s * (-u[1] - v[1]), s * (-u[2] - v[2]));
    const c4 = P(s * (u[0] - v[0]), s * (u[1] - v[1]), s * (u[2] - v[2]));
    return `${pathFrom([c1, c2, c3, c4])} Z`;
  };

  const info = {
    osc: { d: quad([1, 0, 0], [0, 1, 0]), color: '#fbbf24', text: 'Simulósík (T–N sík) · Normálvektora: B · Benne fekszik a és a simulókör!' },
    norm: { d: quad([0, 1, 0], [0, 0, 1]), color: '#34d399', text: 'Normálsík (N–B sík) · Normálvektora: T · Merőleges a haladási irányra!' },
    rect: { d: quad([1, 0, 0], [0, 0, 1]), color: '#fb923c', text: 'Egyenesítő sík (T–B sík) · Normálvektora: N · A kanyar „külső fala”!' },
  }[plane];

  return (
    <div className="widget">
      <div className="wtitle">A három nevezetes sík a görbe egy pontjában: simuló-, normál- és egyenesítő sík</div>
      <div className="controls">
        <button className={plane === 'osc' ? 'active' : ''} onClick={() => setPlane('osc')}>Simulósík (⊥ B)</button>
        <button className={plane === 'norm' ? 'active' : ''} onClick={() => setPlane('norm')}>Normálsík (⊥ T)</button>
        <button className={plane === 'rect' ? 'active' : ''} onClick={() => setPlane('rect')}>Egyenesítő (⊥ N)</button>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <path d={info.d} fill={info.color} fillOpacity="0.16" stroke={info.color} strokeOpacity="0.7" strokeWidth="1.6" />

        <line x1={O[0]} y1={O[1]} x2={PT[0]} y2={PT[1]} stroke="#34d399" strokeWidth="2.8" />
        <path d={arrowHead(O[0], O[1], PT[0], PT[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.5" />
        <text x={PT[0] + 6} y={PT[1] + 4} fill="#34d399" fontSize="13" fontWeight="700">T</text>

        <line x1={O[0]} y1={O[1]} x2={PN[0]} y2={PN[1]} stroke="#fb923c" strokeWidth="2.8" />
        <path d={arrowHead(O[0], O[1], PN[0], PN[1], 8)} fill="none" stroke="#fb923c" strokeWidth="2.5" />
        <text x={PN[0] + 6} y={PN[1] + 4} fill="#fb923c" fontSize="13" fontWeight="700">N</text>

        <line x1={O[0]} y1={O[1]} x2={PB[0]} y2={PB[1]} stroke="#fbbf24" strokeWidth="2.8" />
        <path d={arrowHead(O[0], O[1], PB[0], PB[1], 8)} fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        <text x={PB[0] + 6} y={PB[1] - 4} fill="#fbbf24" fontSize="13" fontWeight="700">B</text>

        <circle cx={O[0]} cy={O[1]} r="4.5" fill="#e2e8f0" />
        <text x="16" y="252" fill={info.color} fontSize="12" fontWeight="600">{info.text}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Hullámvasút G-erők és csavarodás */
export function CoasterGForceWidget() {
  const [pos, setPos] = useState(0.45);
  // Szimulált hullámvasút-profil: gyorsulás a_T, kanyar a_N, csavarodás tau
  const aT = 2.4 * Math.sin(pos * Math.PI * 2);
  const aN = 1.2 + 2.6 * Math.pow(Math.sin(pos * Math.PI), 2);
  const tau = 0.8 * Math.cos(pos * Math.PI * 2);

  const bar = (val: number, max: number) => Math.min(180, (Math.abs(val) / max) * 180);

  return (
    <div className="widget">
      <div className="wtitle">Hullámvasút-érzékelő: hogyan hat ránk egyszerre a_T, a_N és a τ torzió?</div>
      <div className="controls">
        <label>
          Pályapozíció: {(pos * 100).toFixed(0)}%
          <input type="range" min={0} max={1} step={0.02} value={pos} onChange={(e) => setPos(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 190" className="wsvg">
        <text x="20" y="42" fill="#34d399" fontSize="12.5" fontWeight="600">Érintőleges a_T (gáz / fék):</text>
        <rect x="235" y="26" width="220" height="22" rx="5" fill="#1e293b" />
        <rect x="235" y="26" width={bar(aT, 3)} height="22" rx="5" fill="#34d399" />
        <text x="465" y="42" fill="#e2e8f0" fontSize="12" fontFamily="monospace">{aT.toFixed(2)} g</text>

        <text x="20" y="92" fill="#fb923c" fontSize="12.5" fontWeight="600">Normális a_N (kanyar G-erő):</text>
        <rect x="235" y="76" width="220" height="22" rx="5" fill="#1e293b" />
        <rect x="235" y="76" width={bar(aN, 4.5)} height="22" rx="5" fill="#fb923c" />
        <text x="465" y="92" fill="#e2e8f0" fontSize="12" fontFamily="monospace">{aN.toFixed(2)} g</text>

        <text x="20" y="142" fill="#fbbf24" fontSize="12.5" fontWeight="600">Torzió τ (sín csavarodása):</text>
        <rect x="235" y="126" width="220" height="22" rx="5" fill="#1e293b" />
        <rect x="235" y="126" width={bar(tau, 1)} height="22" rx="5" fill="#fbbf24" />
        <text x="465" y="142" fill="#e2e8f0" fontSize="12" fontFamily="monospace">{tau.toFixed(2)}</text>

        <text x="20" y="178" fill="#94a3b8" fontSize="11.5">
          Az ülésbe szorító erőt a_N = κv² adja, a sín bedöntésének változását pedig a τ torzió!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló képlettár */
export function TorsionFrenetMapDiagram() {
  const rows = [
    { label: 'Binormális vektor', expr: 'B = T × N   (jobbsodrású TNB bázis)', color: '#fbbf24' },
    { label: 'Torzió definíciója', expr: 'dB/ds = −τ N   ⇒   τ = −(dB/ds) · N', color: '#38bdf8' },
    { label: '3D torzióképlet', expr: 'τ = [(v × a) · r‴] / |v × a|²   (síkban τ ≡ 0)', color: '#2dd4bf' },
    { label: 'Gyorsulás felbontása', expr: 'a = a_T T + a_N N   (a_T = d|v|/dt, a_N = κ|v|²)', color: '#34d399' },
    { label: 'Pitagorasz-trükk', expr: 'a_T = (v · a)/|v|   ·   a_N = √(|a|² − a_T²)', color: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 13.5 fejezet összefoglaló képlettára — binormális, torzió és gyorsulás-felbontás</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="12" fontWeight="600">{r.label}</text>
              <text x="195" y={y + 23} fill={r.color} fontSize="12" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
