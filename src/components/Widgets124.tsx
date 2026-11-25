import { useState } from 'react';

/* ============================================================================
   12.4. Vektoriális szorzat — 8 interaktív és szemléltető SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

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

function Arrow({ x1, y1, x2, y2, color, width = 2.6, dash }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number; dash?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  if (Math.hypot(x2 - x1, y2 - y1) < 3) return null;
  const h1x = x2 - Math.cos(a - 0.42) * 9;
  const h1y = y2 - Math.sin(a - 0.42) * 9;
  const h2x = x2 - Math.cos(a + 0.42) * 9;
  const h2y = y2 - Math.sin(a + 0.42) * 9;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${h1x},${h1y} ${h2x},${h2y}`} fill={color} />
    </g>
  );
}

/* ------------------------------------------------------------------ 1. 3D vektoriális szorzat és jobbkéz-szabály */
export function CrossProduct3DWidget() {
  const [deg, setDeg] = useState(65);
  const [swap, setSwap] = useState(false);
  const [yaw, setYaw] = useState(32);

  const rad = (deg * Math.PI) / 180;
  const u: [number, number, number] = [2.2, 0, 0];
  const v: [number, number, number] = [2.0 * Math.cos(rad), 2.0 * Math.sin(rad), 0];
  const zMag = 2.2 * 2.0 * Math.sin(rad) * 0.65; // skálázott megjelenítéshez
  const zSign = swap ? -1 : 1;
  const c: [number, number, number] = [0, 0, zSign * zMag];

  const P = makeProj(270, 130, 32, yaw, 24);
  const o = P(0, 0, 0);
  const pu = P(...u);
  const pv = P(...v);
  const puv = P(u[0] + v[0], u[1] + v[1], 0);
  const pc = P(...c);

  const area = 2.2 * 2.0 * Math.sin(rad);

  return (
    <div className="widget">
      <div className="wtitle">Jobbkéz-szabály és antikommutativitás: v × u = −(u × v)</div>
      <div className="relbuttons chips">
        <button className={!swap ? 'on' : ''} onClick={() => setSwap(false)}>u × v (felfelé, +z)</button>
        <button className={swap ? 'on' : ''} onClick={() => setSwap(true)}>v × u (lefelé, −z)</button>
      </div>
      <div className="wcontrols">
        <label>Hajlásszög <b>θ = {deg}°</b><input type="range" min={0} max={180} step={5} value={deg} onChange={(e) => setDeg(+e.target.value)} /></label>
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-30} max={110} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 245" className="plot">
        {/* Kifeszített paralelogramma */}
        <polygon
          points={`${o[0]},${o[1]} ${pu[0]},${pu[1]} ${puv[0]},${puv[1]} ${pv[0]},${pv[1]}`}
          fill="rgba(56, 189, 248, 0.14)"
          stroke="rgba(56, 189, 248, 0.45)"
          strokeDasharray="4 3"
        />
        <Arrow x1={o[0]} y1={o[1]} x2={pu[0]} y2={pu[1]} color="#38bdf8" width={2.8} />
        <Arrow x1={o[0]} y1={o[1]} x2={pv[0]} y2={pv[1]} color="#34d399" width={2.8} />
        <Arrow x1={o[0]} y1={o[1]} x2={pc[0]} y2={pc[1]} color={swap ? '#fb923c' : '#fbbf24'} width={3.2} />
        <text x={pu[0] + 8} y={pu[1] + 6} fill="#38bdf8" fontSize={12} fontWeight={700}>u</text>
        <text x={pv[0] + 8} y={pv[1] + 6} fill="#34d399" fontSize={12} fontWeight={700}>v</text>
        <text x={pc[0] + 10} y={pc[1] + (swap ? 10 : -6)} fill={swap ? '#fb923c' : '#fbbf24'} fontSize={12.5} fontWeight={700}>
          {swap ? 'v × u' : 'u × v'}
        </text>
      </svg>
      <div className="readout">
        Hossz (paralelogramma területe): <b>|u × v| = |u|·|v|·sin({deg}°) = {area.toFixed(2)}</b>. Figyeld meg: θ = 0°
        és 180°-nál a szorzat <b>0</b>!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. i -> j -> k körforgás */
export function IjkCycleDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">A standard bázisvektorok körforgása: óramutató irányában (+), visszafelé (−)</div>
      <svg viewBox="0 0 540 165" className="plot">
        {/* Kör */}
        <circle cx={155} cy={86} r={52} fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth={2} strokeDasharray="5 4" />
        {/* i, j, k csomópontok */}
        <circle cx={155} cy={34} r={18} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={2} />
        <text x={155} y={39} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700}>i</text>

        <circle cx={200} cy={112} r={18} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={2} />
        <text x={200} y={117} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700}>j</text>

        <circle cx={110} cy={112} r={18} fill="rgba(251,191,36,0.22)" stroke="#fbbf24" strokeWidth={2} />
        <text x={110} y={117} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700}>k</text>

        <text x={155} y={91} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={700}>↻ (+)</text>

        {/* Jobb oldali képletlista */}
        <rect x={265} y={18} width={258} height={130} rx={12} fill="rgba(255,255,255,0.04)" stroke="rgba(148,163,184,0.25)" />
        <text x={282} y={44} fill="#6ee7b7" fontSize={12} fontWeight={700}>Pozitív irány (↻):</text>
        <text x={282} y={66} fill="#e2e8f0" fontSize={12}>i × j = k   ·   j × k = i   ·   k × i = j</text>
        <text x={282} y={96} fill="#fb923c" fontSize={12} fontWeight={700}>Fordított irány (↺):</text>
        <text x={282} y={118} fill="#e2e8f0" fontSize={12}>j × i = −k  ·   k × j = −i  ·   i × k = −j</text>
        <text x={282} y={139} fill="#94a3b8" fontSize={11}>Önmagával: i × i = j × j = k × k = 0</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Interaktív 3x3 determináns-számoló */
export function DeterminantCrossWidget() {
  const [u1, setU1] = useState(2);
  const [u2, setU2] = useState(1);
  const [u3, setU3] = useState(-1);
  const v = [-3, 4, 1];

  const cx = u2 * v[2] - u3 * v[1];
  const cy = -(u1 * v[2] - u3 * v[0]);
  const cz = u1 * v[1] - u2 * v[0];

  return (
    <div className="widget">
      <div className="wtitle">3×3-as determináns-számoló: figyelj a középső (−j) mínuszjelre!</div>
      <div className="wcontrols">
        <label>u₁ = <b>{u1}</b><input type="range" min={-3} max={3} step={1} value={u1} onChange={(e) => setU1(+e.target.value)} /></label>
        <label>u₂ = <b>{u2}</b><input type="range" min={-3} max={3} step={1} value={u2} onChange={(e) => setU2(+e.target.value)} /></label>
        <label>u₃ = <b>{u3}</b><input type="range" min={-3} max={3} step={1} value={u3} onChange={(e) => setU3(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 135" className="plot">
        {/* Determináns doboz */}
        <rect x={14} y={14} width={156} height={106} rx={10} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={52} y={38} textAnchor="middle" fill="#38bdf8" fontSize={13} fontWeight={700}>i</text>
        <text x={92} y={38} textAnchor="middle" fill="#fb923c" fontSize={13} fontWeight={700}>−j</text>
        <text x={132} y={38} textAnchor="middle" fill="#34d399" fontSize={13} fontWeight={700}>k</text>
        <text x={52} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={13}>{u1}</text>
        <text x={92} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={13}>{u2}</text>
        <text x={132} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={13}>{u3}</text>
        <text x={52} y={98} textAnchor="middle" fill="#94a3b8" fontSize={13}>{v[0]}</text>
        <text x={92} y={98} textAnchor="middle" fill="#94a3b8" fontSize={13}>{v[1]}</text>
        <text x={132} y={98} textAnchor="middle" fill="#94a3b8" fontSize={13}>{v[2]}</text>

        {/* Eredmény */}
        <rect x={188} y={14} width={338} height={106} rx={10} fill="rgba(52,211,153,0.09)" stroke="#34d399" strokeWidth={1.5} />
        <text x={204} y={40} fill="#7dd3fc" fontSize={12}>i-komponens: ({u2})·1 − ({u3})·4 = <b>{cx}</b></text>
        <text x={204} y={64} fill="#fb923c" fontSize={12}>j-komponens: −[({u1})·1 − ({u3})·(−3)] = <b>{cy}</b></text>
        <text x={204} y={88} fill="#6ee7b7" fontSize={12}>k-komponens: ({u1})·4 − ({u2})·(−3) = <b>{cz}</b></text>
        <text x={204} y={110} fill="#fbbf24" fontSize={12.5} fontWeight={700}>
          u × v = ⟨{cx}, {cy}, {cz}⟩  (ellenőrzés: (u×v)·u = 0 ✓)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Paralelogramma és háromszög területe */
export function ParallelogramAreaWidget() {
  const [deg, setDeg] = useState(55);
  const [b, setB] = useState(5);
  const a = 4;
  const rad = (deg * Math.PI) / 180;
  const h = a * Math.sin(rad);
  const areaP = b * h;

  const ox = 110;
  const oy = 175;
  const sc = 36;
  const bx = ox + b * sc;
  const by = oy;
  const ax = ox + a * sc * Math.cos(rad);
  const ay = oy - a * sc * Math.sin(rad);
  const abx = bx + (ax - ox);
  const aby = ay;

  return (
    <div className="widget">
      <div className="wtitle">Geometriai jelentés: |u × v| = paralelogramma területe · ½|u × v| = háromszög területe</div>
      <div className="wcontrols">
        <label>Szög <b>θ = {deg}°</b><input type="range" min={10} max={170} step={5} value={deg} onChange={(e) => setDeg(+e.target.value)} /></label>
        <label>Alap |u| = <b>{b}</b><input type="range" min={2} max={7} step={0.5} value={b} onChange={(e) => setB(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 210" className="plot">
        <polygon points={`${ox},${oy} ${bx},${by} ${abx},${aby} ${ax},${ay}`} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.5} />
        <polygon points={`${ox},${oy} ${bx},${by} ${ax},${ay}`} fill="rgba(52,211,153,0.18)" stroke="#34d399" strokeWidth={1.5} strokeDasharray="4 3" />
        {/* Magasság */}
        <line x1={ax} y1={ay} x2={ax} y2={oy} stroke="#fbbf24" strokeDasharray="3 3" strokeWidth={1.8} />
        <Arrow x1={ox} y1={oy} x2={bx} y2={by} color="#38bdf8" width={2.8} />
        <Arrow x1={ox} y1={oy} x2={ax} y2={ay} color="#34d399" width={2.8} />
        <text x={ax + 6} y={(ay + oy) / 2} fill="#fbbf24" fontSize={11.5} fontWeight={700}>h = |v|sin θ = {h.toFixed(2)}</text>
      </svg>
      <div className="readout">
        Paralelogramma területe = <b>{areaP.toFixed(2)}</b> · Háromszög területe (zöld) = <b>{(areaP / 2).toFixed(2)}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Forgatónyomaték (villáskulcs) */
export function TorqueWrenchWidget() {
  const [deg, setDeg] = useState(90);
  const [r, setR] = useState(0.3); // méter
  const F = 80; // N
  const rad = (deg * Math.PI) / 180;
  const tau = r * F * Math.sin(rad);

  const ox = 120;
  const oy = 125;
  const rx = ox + r * 620;
  const fx = rx + 95 * Math.cos(rad);
  const fy = oy - 95 * Math.sin(rad);

  return (
    <div className="widget">
      <div className="wtitle">Fizikai alkalmazás: forgatónyomaték τ = r × F (|τ| = |r|·|F|·sin θ)</div>
      <div className="wcontrols">
        <label>Kar hossza <b>r = {r.toFixed(2)} m</b><input type="range" min={0.15} max={0.45} step={0.05} value={r} onChange={(e) => setR(+e.target.value)} /></label>
        <label>Húzási szög <b>θ = {deg}°</b> (F = 80 N)<input type="range" min={0} max={180} step={5} value={deg} onChange={(e) => setDeg(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 205" className="plot">
        {/* Csavar */}
        <circle cx={ox} cy={oy} r={14} fill="rgba(251,191,36,0.22)" stroke="#fbbf24" strokeWidth={2.2} />
        <circle cx={ox} cy={oy} r={4} fill="#fbbf24" />
        {/* Villáskulcs r */}
        <Arrow x1={ox} y1={oy} x2={rx} y2={oy} color="#38bdf8" width={4} />
        {/* F erő */}
        <Arrow x1={rx} y1={oy} x2={fx} y2={fy} color="#fb923c" width={2.8} />
        {/* Hatékony F sin θ */}
        <Arrow x1={rx} y1={oy} x2={rx} y2={fy} color="#34d399" width={2.2} dash="4 3" />
        <text x={(ox + rx) / 2} y={oy + 22} textAnchor="middle" fill="#38bdf8" fontSize={12} fontWeight={700}>r = {r.toFixed(2)} m</text>
        <text x={fx + 8} y={fy - 4} fill="#fb923c" fontSize={12} fontWeight={700}>F = 80 N</text>
        <text x={24} y={28} fill="#6ee7b7" fontSize={13} fontWeight={700}>
          |τ| = {tau.toFixed(2)} N·m  {deg === 90 ? '(MAXIMÁLIS nyomaték!)' : deg === 0 || deg === 180 ? '(0 — csak húzod/nyomod a csavart!)' : ''}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Paralelepipedon térfogata (vegyes szorzat) */
export function ParallelepipedVolumeWidget() {
  const [wz, setWz] = useState(2.2);
  const P = makeProj(240, 170, 30, 34, 22);
  const u: [number, number, number] = [3, 0, 0];
  const v: [number, number, number] = [1, 2.5, 0];
  const w: [number, number, number] = [0.6, 0.8, wz];

  const o = P(0, 0, 0);
  const pu = P(...u);
  const pv = P(...v);
  const puv = P(u[0] + v[0], u[1] + v[1], 0);
  const pw = P(...w);
  const puw = P(u[0] + w[0], u[1] + w[1], w[2]);
  const pvw = P(v[0] + w[0], v[1] + w[1], w[2]);
  const puvw = P(u[0] + v[0] + w[0], u[1] + v[1] + w[1], w[2]);

  const vol = Math.abs(3 * 2.5 * wz);

  return (
    <div className="widget">
      <div className="wtitle">Vegyes szorzat: V = |(u × v) · w| = paralelepipedon térfogata</div>
      <div className="wcontrols">
        <label>
          w magassága <b>w₃ = {wz.toFixed(1)}</b> {Math.abs(wz) < 0.05 ? '(KOMPLANÁRIS!)' : ''}
          <input type="range" min={0} max={3} step={0.2} value={wz} onChange={(e) => setWz(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 230" className="plot">
        {/* Alaplap */}
        <polygon points={`${o[0]},${o[1]} ${pu[0]},${pu[1]} ${puv[0]},${puv[1]} ${pv[0]},${pv[1]}`} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.3} />
        {/* Fedőlap */}
        <polygon points={`${pw[0]},${pw[1]} ${puw[0]},${puw[1]} ${puvw[0]},${puvw[1]} ${pvw[0]},${pvw[1]}`} fill="rgba(52,211,153,0.16)" stroke="#34d399" strokeWidth={1.3} />
        {/* Oldalélek */}
        <g stroke="rgba(148,163,184,0.45)" strokeWidth={1.2}>
          <line x1={pu[0]} y1={pu[1]} x2={puw[0]} y2={puw[1]} />
          <line x1={pv[0]} y1={pv[1]} x2={pvw[0]} y2={pvw[1]} />
          <line x1={puv[0]} y1={puv[1]} x2={puvw[0]} y2={puvw[1]} />
        </g>
        <Arrow x1={o[0]} y1={o[1]} x2={pu[0]} y2={pu[1]} color="#38bdf8" width={2.6} />
        <Arrow x1={o[0]} y1={o[1]} x2={pv[0]} y2={pv[1]} color="#34d399" width={2.6} />
        <Arrow x1={o[0]} y1={o[1]} x2={pw[0]} y2={pw[1]} color="#fbbf24" width={2.8} />
        <text x={pu[0] + 6} y={pu[1] + 8} fill="#38bdf8" fontSize={12} fontWeight={700}>u</text>
        <text x={pv[0] + 6} y={pv[1] + 8} fill="#34d399" fontSize={12} fontWeight={700}>v</text>
        <text x={pw[0] - 18} y={pw[1] - 4} fill="#fbbf24" fontSize={12} fontWeight={700}>w</text>
      </svg>
      <div className="readout">
        Térfogat: <b>V = |(u × v) · w| = {vol.toFixed(2)}</b>. Ha w₃ = 0, a test ellapul és V = 0: a három vektor{' '}
        <b>egy síkban fekszik (komplanáris)</b>!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Skalárszorzat vs. vektoriális szorzat */
export function DotVsCrossDiagram() {
  const rows = [
    { k: 'Eredmény típusa', d: 'Skalár (szám)', c: 'Vektor (⊥ u és ⊥ v)' },
    { k: 'Geometriai képlet', d: '|u|·|v|·cos θ', c: '|u|·|v|·sin θ · n' },
    { k: 'Sorrend (kommutatív?)', d: 'Igen: u·v = v·u', c: 'NEM: v×u = −(u×v)' },
    { k: 'Mikor nulla?', d: 'Merőlegesek (θ = 90°)', c: 'Párhuzamosak (θ = 0° / 180°)' },
    { k: 'Fizikai példa', d: 'Munka: W = F · D', c: 'Nyomaték: τ = r × F' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A két szorzás összehasonlítása: u · v vs. u × v</div>
      <svg viewBox="0 0 540 212" className="plot">
        <text x={18} y={22} fill="#94a3b8" fontSize={11} fontWeight={700}>SZEMPONT</text>
        <text x={165} y={22} fill="#38bdf8" fontSize={11.5} fontWeight={700}>SKALÁRSZORZAT (u · v)</text>
        <text x={352} y={22} fill="#fbbf24" fontSize={11.5} fontWeight={700}>VEKTORIÁLIS (u × v)</text>
        {rows.map((r, i) => {
          const y = 32 + i * 35;
          return (
            <g key={r.k}>
              <rect x={12} y={y} width={516} height={29} rx={7} fill="rgba(255,255,255,0.04)" stroke="rgba(148,163,184,0.18)" />
              <text x={20} y={y + 19} fill="#6ee7b7" fontSize={11} fontWeight={700}>{r.k}</text>
              <text x={165} y={y + 19} fill="#e2e8f0" fontSize={11}>{r.d}</text>
              <text x={352} y={y + 19} fill="#fde68a" fontSize={11} fontWeight={600}>{r.c}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Három „nulla-teszt” 3D-ben */
export function CrossZeroTestsDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">A három geometria-detektor (nemnulla vektorokra)</div>
      <svg viewBox="0 0 540 120" className="plot">
        <rect x={12} y={16} width={164} height={88} rx={10} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={94} y={42} textAnchor="middle" fill="#7dd3fc" fontSize={12.5} fontWeight={700}>u · v = 0</text>
        <text x={94} y={70} textAnchor="middle" fill="#fff" fontSize={12}>Merőlegesek (⊥)</text>

        <rect x={188} y={16} width={164} height={88} rx={10} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.5} />
        <text x={270} y={42} textAnchor="middle" fill="#6ee7b7" fontSize={12.5} fontWeight={700}>u × v = 0</text>
        <text x={270} y={70} textAnchor="middle" fill="#fff" fontSize={12}>Párhuzamosak (∥)</text>

        <rect x={364} y={16} width={164} height={88} rx={10} fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={446} y={42} textAnchor="middle" fill="#fde68a" fontSize={12.5} fontWeight={700}>(u × v) · w = 0</text>
        <text x={446} y={70} textAnchor="middle" fill="#fff" fontSize={12}>Egy síkban vannak</text>
      </svg>
    </div>
  );
}
