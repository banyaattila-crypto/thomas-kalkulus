import { useState } from 'react';

/* ============================================================================
   12.2. Vektorok — 8 interaktív és szemléltető SVG widget
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

function Arrow2D({ x1, y1, x2, y2, color, width = 2.4, dash }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number; dash?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 3) return null;
  const hx1 = x2 - Math.cos(a - 0.42) * 9;
  const hy1 = y2 - Math.sin(a - 0.42) * 9;
  const hx2 = x2 - Math.cos(a + 0.42) * 9;
  const hy2 = y2 - Math.sin(a + 0.42) * 9;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${hx1},${hy1} ${hx2},${hy2}`} fill={color} />
    </g>
  );
}

/* ------------------------------------------------------------------ 1. Ekvivalens eltolt vektor és helyvektor */
export function VectorShift2DWidget() {
  const [px, setPx] = useState(1);
  const [py, setPy] = useState(1);
  const [vx, setVx] = useState(3);
  const [vy, setVy] = useState(2);

  const W = 540;
  const H = 225;
  const X = (x: number) => 220 + x * 34;
  const Y = (y: number) => 150 - y * 34;

  const qx = px + vx;
  const qy = py + vy;
  const len = Math.hypot(vx, vy);

  return (
    <div className="widget">
      <div className="wtitle">A vektor szabadon eltolható: PQ és a helyvektoros v = ⟨v₁, v₂⟩ alak azonos!</div>
      <div className="wcontrols">
        <label>P kezdőpont x = <b>{px}</b><input type="range" min={-3} max={3} step={1} value={px} onChange={(e) => setPx(+e.target.value)} /></label>
        <label>P kezdőpont y = <b>{py}</b><input type="range" min={-2} max={2} step={1} value={py} onChange={(e) => setPy(+e.target.value)} /></label>
        <label>v₁ = <b>{vx}</b><input type="range" min={-3} max={4} step={1} value={vx} onChange={(e) => setVx(+e.target.value)} /></label>
        <label>v₂ = <b>{vy}</b><input type="range" min={-2} max={3} step={1} value={vy} onChange={(e) => setVy(+e.target.value)} /></label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={20} y1={Y(0)} x2={W - 20} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={16} x2={X(0)} y2={H - 16} className="ax" />
        {/* Helyvektor origóból */}
        <Arrow2D x1={X(0)} y1={Y(0)} x2={X(vx)} y2={Y(vy)} color="#38bdf8" width={2.8} />
        <text x={X(vx) + 8} y={Y(vy) - 6} fill="#38bdf8" fontSize={12} fontWeight={700}>v = ⟨{vx}, {vy}⟩</text>
        {/* Eltolt PQ vektor */}
        <Arrow2D x1={X(px)} y1={Y(py)} x2={X(qx)} y2={Y(qy)} color="#fbbf24" width={2.6} />
        <circle cx={X(px)} cy={Y(py)} r={4} fill="#fb923c" />
        <text x={X(px) - 8} y={Y(py) + 15} textAnchor="end" fill="#fb923c" fontSize={11}>P({px};{py})</text>
        <text x={X(qx) + 8} y={Y(qy) + 14} fill="#fbbf24" fontSize={11} fontWeight={700}>Q({qx};{qy})</text>
      </svg>
      <div className="readout">
        <b>PQ = ⟨{qx} − ({px}), {qy} − ({py})⟩ = ⟨{vx}, {vy}⟩</b> · hossza: <b>|v| = {len.toFixed(2)}</b>. Bárhová
        tolod P-t, a komponensek változatlanok!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Forgatható 3D vektorösszeadás */
export function VectorAdd3DWidget() {
  const [ux, setUx] = useState(2);
  const [vy, setVy] = useState(2.5);
  const [vz, setVz] = useState(2);
  const [showDiff, setShowDiff] = useState(false);
  const [yaw, setYaw] = useState(32);

  const u: [number, number, number] = [ux, 1, 0.5];
  const v: [number, number, number] = [0.5, vy, vz];
  const s: [number, number, number] = [u[0] + v[0], u[1] + v[1], u[2] + v[2]];

  const P = makeProj(270, 155, 28, yaw, 22);
  const o = P(0, 0, 0);
  const pu = P(u[0], u[1], u[2]);
  const pv = P(v[0], v[1], v[2]);
  const ps = P(s[0], s[1], s[2]);

  return (
    <div className="widget">
      <div className="wtitle">3D vektorösszeadás (paralelogramma-szabály) és kivonás</div>
      <div className="relbuttons chips">
        <button className={!showDiff ? 'on' : ''} onClick={() => setShowDiff(false)}>Összeg: u + v</button>
        <button className={showDiff ? 'on' : ''} onClick={() => setShowDiff(true)}>Különbség is: u − v</button>
      </div>
      <div className="wcontrols">
        <label>u₁ = <b>{ux}</b><input type="range" min={-2} max={3} step={0.5} value={ux} onChange={(e) => setUx(+e.target.value)} /></label>
        <label>v₂ = <b>{vy}</b><input type="range" min={-2} max={3} step={0.5} value={vy} onChange={(e) => setVy(+e.target.value)} /></label>
        <label>v₃ = <b>{vz}</b><input type="range" min={-2} max={3} step={0.5} value={vz} onChange={(e) => setVz(+e.target.value)} /></label>
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-40} max={110} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 245" className="plot">
        {/* Tengelyek */}
        <line x1={o[0]} y1={o[1]} x2={P(4, 0, 0)[0]} y2={P(4, 0, 0)[1]} stroke="rgba(148,163,184,0.35)" />
        <line x1={o[0]} y1={o[1]} x2={P(0, 4, 0)[0]} y2={P(0, 4, 0)[1]} stroke="rgba(148,163,184,0.35)" />
        <line x1={o[0]} y1={o[1]} x2={P(0, 0, 4)[0]} y2={P(0, 0, 4)[1]} stroke="rgba(148,163,184,0.35)" />
        {/* Paralelogramma szaggatott oldalai */}
        <line x1={pu[0]} y1={pu[1]} x2={ps[0]} y2={ps[1]} stroke="rgba(52,211,153,0.45)" strokeDasharray="4 3" />
        <line x1={pv[0]} y1={pv[1]} x2={ps[0]} y2={ps[1]} stroke="rgba(56,189,248,0.45)" strokeDasharray="4 3" />
        {/* Vektorok */}
        <Arrow2D x1={o[0]} y1={o[1]} x2={pu[0]} y2={pu[1]} color="#38bdf8" width={2.6} />
        <Arrow2D x1={o[0]} y1={o[1]} x2={pv[0]} y2={pv[1]} color="#34d399" width={2.6} />
        <Arrow2D x1={o[0]} y1={o[1]} x2={ps[0]} y2={ps[1]} color="#fbbf24" width={3} />
        {showDiff && <Arrow2D x1={pv[0]} y1={pv[1]} x2={pu[0]} y2={pu[1]} color="#fb923c" width={2.4} dash="4 3" />}
        <text x={pu[0] + 6} y={pu[1] - 4} fill="#38bdf8" fontSize={12} fontWeight={700}>u</text>
        <text x={pv[0] + 6} y={pv[1] - 4} fill="#34d399" fontSize={12} fontWeight={700}>v</text>
        <text x={ps[0] + 8} y={ps[1] - 6} fill="#fbbf24" fontSize={12} fontWeight={700}>u + v</text>
        {showDiff && <text x={(pu[0] + pv[0]) / 2} y={(pu[1] + pv[1]) / 2 - 8} fill="#fb923c" fontSize={11.5} fontWeight={700}>u − v</text>}
      </svg>
      <div className="readout">
        <b>u + v = ⟨{s[0].toFixed(1)}, {s[1].toFixed(1)}, {s[2].toFixed(1)}⟩</b> · hossz: |u+v| ={' '}
        <b>{Math.hypot(...s).toFixed(2)}</b> ≤ |u| + |v| = <b>{(Math.hypot(...u) + Math.hypot(...v)).toFixed(2)}</b>{' '}
        (háromszög-egyenlőtlenség!).
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Egységvektor normálása */
export function UnitVector3DWidget() {
  const [vx, setVx] = useState(2);
  const [vy, setVy] = useState(1);
  const [vz, setVz] = useState(2);

  const len = Math.hypot(vx, vy, vz);
  const ux = len > 0 ? vx / len : 0;
  const uy = len > 0 ? vy / len : 0;
  const uz = len > 0 ? vz / len : 0;

  const P = makeProj(270, 140, 38, 36, 22);
  const o = P(0, 0, 0);
  const pv = P(vx, vy, vz);
  const pu = P(ux, uy, uz);

  return (
    <div className="widget">
      <div className="wtitle">Normálás: az u = v / |v| egységvektor csúcsa mindig az egységgömbön fekszik</div>
      <div className="wcontrols">
        <label>v₁ = <b>{vx}</b><input type="range" min={-3} max={3} step={1} value={vx} onChange={(e) => setVx(+e.target.value)} /></label>
        <label>v₂ = <b>{vy}</b><input type="range" min={-3} max={3} step={1} value={vy} onChange={(e) => setVy(+e.target.value)} /></label>
        <label>v₃ = <b>{vz}</b><input type="range" min={-3} max={3} step={1} value={vz} onChange={(e) => setVz(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 235" className="plot">
        {/* Egységgömb */}
        <circle cx={o[0]} cy={o[1]} r={38} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeDasharray="4 3" strokeWidth={1.6} />
        <line x1={o[0]} y1={o[1]} x2={P(3, 0, 0)[0]} y2={P(3, 0, 0)[1]} stroke="rgba(148,163,184,0.3)" />
        <line x1={o[0]} y1={o[1]} x2={P(0, 3, 0)[0]} y2={P(0, 3, 0)[1]} stroke="rgba(148,163,184,0.3)" />
        <line x1={o[0]} y1={o[1]} x2={P(0, 0, 3)[0]} y2={P(0, 0, 3)[1]} stroke="rgba(148,163,184,0.3)" />
        {len > 0 && (
          <>
            <Arrow2D x1={o[0]} y1={o[1]} x2={pv[0]} y2={pv[1]} color="#38bdf8" width={2.3} />
            <Arrow2D x1={o[0]} y1={o[1]} x2={pu[0]} y2={pu[1]} color="#fbbf24" width={3.2} />
            <text x={pv[0] + 8} y={pv[1] - 4} fill="#38bdf8" fontSize={12} fontWeight={700}>v (|v|={len.toFixed(2)})</text>
            <text x={pu[0] + 8} y={pu[1] + 12} fill="#fbbf24" fontSize={12} fontWeight={700}>u (|u|=1)</text>
          </>
        )}
      </svg>
      <div className="readout">
        {len === 0
          ? 'A nullvektornak nincs iránya, ezért nincs egységvektora!'
          : `u = v / |v| = ⟨${ux.toFixed(2)}, ${uy.toFixed(2)}, ${uz.toFixed(2)}⟩ · hossza pontosan 1,00!`}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Felező- és osztópont vektorosan */
export function MidpointVectorWidget() {
  const [t, setT] = useState(0.5);
  const p1 = [1, 1];
  const p2 = [7, 4];
  const mx = (1 - t) * p1[0] + t * p2[0];
  const my = (1 - t) * p1[1] + t * p2[1];

  const X = (x: number) => 60 + x * 52;
  const Y = (y: number) => 195 - y * 36;

  return (
    <div className="widget">
      <div className="wtitle">Szakasz osztópontja és felezőpontja: r(t) = (1 − t)p₁ + t·p₂</div>
      <div className="wcontrols">
        <label>
          Arány <b>t = {t.toFixed(2)}</b> {Math.abs(t - 0.5) < 0.01 ? '(felezőpont!)' : ''}
          <input type="range" min={0} max={1} step={0.05} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 220" className="plot">
        <line x1={30} y1={Y(0)} x2={510} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={16} x2={X(0)} y2={208} className="ax" />
        <line x1={X(p1[0])} y1={Y(p1[1])} x2={X(p2[0])} y2={Y(p2[1])} stroke="#94a3b8" strokeDasharray="5 3" strokeWidth={2} />
        <Arrow2D x1={X(0)} y1={Y(0)} x2={X(p1[0])} y2={Y(p1[1])} color="#38bdf8" width={2.2} />
        <Arrow2D x1={X(0)} y1={Y(0)} x2={X(p2[0])} y2={Y(p2[1])} color="#34d399" width={2.2} />
        <Arrow2D x1={X(0)} y1={Y(0)} x2={X(mx)} y2={Y(my)} color="#fbbf24" width={2.8} />
        <circle cx={X(mx)} cy={Y(my)} r={5} fill="#fbbf24" stroke="#fff" strokeWidth={1.4} />
        <text x={X(p1[0]) - 6} y={Y(p1[1]) - 10} fill="#38bdf8" fontSize={11.5} fontWeight={700}>P₁(1; 1)</text>
        <text x={X(p2[0]) + 6} y={Y(p2[1]) - 8} fill="#34d399" fontSize={11.5} fontWeight={700}>P₂(7; 4)</text>
        <text x={X(mx) + 8} y={Y(my) + 16} fill="#fbbf24" fontSize={11.5} fontWeight={700}>
          M({mx.toFixed(1)}; {my.toFixed(1)})
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Repülőgép és szél eredő sebessége */
export function WindVelocityWidget() {
  const [windSpd, setWindSpd] = useState(80);
  const [windDeg, setWindDeg] = useState(45);
  const planeSpd = 300; // keletre (0°)

  const rad = (windDeg * Math.PI) / 180;
  const wx = windSpd * Math.cos(rad);
  const wy = windSpd * Math.sin(rad);
  const rx = planeSpd + wx;
  const ry = wy;
  const rSpd = Math.hypot(rx, ry);
  const rDeg = (Math.atan2(ry, rx) * 180) / Math.PI;

  const ox = 85;
  const oy = 130;
  const sc = 0.85;

  return (
    <div className="widget">
      <div className="wtitle">Fizikai alkalmazás: repülőgép eredő sebessége szélben (v_föld = v_gép + v_szél)</div>
      <div className="wcontrols">
        <label>Szélsebesség <b>{windSpd} km/h</b><input type="range" min={0} max={150} step={10} value={windSpd} onChange={(e) => setWindSpd(+e.target.value)} /></label>
        <label>Szél iránya <b>{windDeg}°</b><input type="range" min={-180} max={180} step={15} value={windDeg} onChange={(e) => setWindDeg(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 220" className="plot">
        <line x1={30} y1={oy} x2={510} y2={oy} className="ax" />
        <Arrow2D x1={ox} y1={oy} x2={ox + planeSpd * sc} y2={oy} color="#38bdf8" width={2.8} />
        <Arrow2D x1={ox + planeSpd * sc} y1={oy} x2={ox + rx * sc} y2={oy - ry * sc} color="#fb923c" width={2.5} />
        <Arrow2D x1={ox} y1={oy} x2={ox + rx * sc} y2={oy - ry * sc} color="#34d399" width={3.1} />
        <text x={ox + 120} y={oy + 18} fill="#38bdf8" fontSize={11.5} fontWeight={700}>v_gép = 300 km/h →</text>
        <text x={ox + rx * sc + 8} y={oy - ry * sc - 6} fill="#34d399" fontSize={12} fontWeight={700}>
          v_föld = {rSpd.toFixed(0)} km/h
        </text>
      </svg>
      <div className="readout">
        Eredő sebesség: <b>{rSpd.toFixed(1)} km/h</b> · eltérési szög a keleti iránytól: <b>{rDeg.toFixed(1)}°</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Kötélerők egyensúlya */
export function ForceEquilibriumWidget() {
  const [alpha, setAlpha] = useState(45);
  const [beta, setBeta] = useState(30);
  const G = 100; // N

  const a = (alpha * Math.PI) / 180;
  const b = (beta * Math.PI) / 180;
  // T1 cos a = T2 cos b, T1 sin a + T2 sin b = G
  const denom = Math.sin(a + b);
  const T1 = (G * Math.cos(b)) / denom;
  const T2 = (G * Math.cos(a)) / denom;

  const cx = 270;
  const cy = 128;
  const L1 = 120;
  const L2 = 120;
  const x1 = cx - L1 * Math.cos(a);
  const y1 = cy - L1 * Math.sin(a);
  const x2 = cx + L2 * Math.cos(b);
  const y2 = cy - L2 * Math.sin(b);

  return (
    <div className="widget">
      <div className="wtitle">Statikai egyensúly (T₁ + T₂ + G = 0): 100 N súly két kötélen</div>
      <div className="wcontrols">
        <label>Bal szög α = <b>{alpha}°</b><input type="range" min={15} max={75} step={5} value={alpha} onChange={(e) => setAlpha(+e.target.value)} /></label>
        <label>Jobb szög β = <b>{beta}°</b><input type="range" min={15} max={75} step={5} value={beta} onChange={(e) => setBeta(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 215" className="plot">
        <line x1={60} y1={24} x2={480} y2={24} stroke="#64748b" strokeWidth={2.5} />
        <Arrow2D x1={cx} y1={cy} x2={x1} y2={y1} color="#38bdf8" width={2.8} />
        <Arrow2D x1={cx} y1={cy} x2={x2} y2={y2} color="#34d399" width={2.8} />
        <Arrow2D x1={cx} y1={cy} x2={cx} y2={cy + 65} color="#fb923c" width={3} />
        <circle cx={cx} cy={cy} r={6} fill="#fbbf24" />
        <text x={x1 - 8} y={y1 + 14} textAnchor="end" fill="#38bdf8" fontSize={12} fontWeight={700}>|T₁| = {T1.toFixed(1)} N</text>
        <text x={x2 + 8} y={y2 + 14} fill="#34d399" fontSize={12} fontWeight={700}>|T₂| = {T2.toFixed(1)} N</text>
        <text x={cx + 10} y={cy + 64} fill="#fb923c" fontSize={12} fontWeight={700}>G = 100 N</text>
      </svg>
      <div className="readout">
        Figyeld meg: ha a kötelek laposak (α, β kicsi), a kötélerők a súly <b>többszörösére</b> ugranak!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Skaláris vs. vektoros áttekintés */
export function ScalarVsVectorDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">Jelölési térkép: pont vs. vektor vs. hossz</div>
      <svg viewBox="0 0 540 135" className="plot">
        <rect x={12} y={16} width={164} height={102} rx={10} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={94} y={40} textAnchor="middle" fill="#7dd3fc" fontSize={12} fontWeight={700}>Pont a térben</text>
        <text x={94} y={66} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700}>P(x; y; z)</text>
        <text x={94} y={92} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>Fix hely, kerek zárójel</text>

        <rect x={188} y={16} width={164} height={102} rx={10} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.5} />
        <text x={270} y={40} textAnchor="middle" fill="#6ee7b7" fontSize={12} fontWeight={700}>Vektor (irány + hossz)</text>
        <text x={270} y={66} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700}>v = ⟨v₁, v₂, v₃⟩</text>
        <text x={270} y={92} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>= v₁i + v₂j + v₃k</text>

        <rect x={364} y={16} width={164} height={102} rx={10} fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={446} y={40} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>Skalár (hossz)</text>
        <text x={446} y={66} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700}>|v| = √(v₁²+v₂²+v₃²)</text>
        <text x={446} y={92} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>Egyetlen nemnegatív szám</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Vektor-algebrai szabályok */
export function VectorOpsSummaryDiagram() {
  const rules = [
    { k: 'Összeadás', f: 'u + v = ⟨u₁+v₁, u₂+v₂, u₃+v₃⟩ (kommutatív, asszociatív)', c: '#38bdf8' },
    { k: 'Skalárszoros', f: 'k·v = ⟨kv₁, kv₂, kv₃⟩ · hossz: |k·v| = |k|·|v|', c: '#34d399' },
    { k: 'Egységvektor', f: 'u = v / |v|  ⇒  v = |v| · u  (hossz × irány!)', c: '#fbbf24' },
    { k: 'Párhuzamosság', f: 'u ∥ v  ⇔  u = k·v valamely k ≠ 0 skalárral', c: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 12.2 négy legfontosabb vektor-szabálya</div>
      <svg viewBox="0 0 540 162" className="plot">
        {rules.map((r, i) => {
          const y = 12 + i * 36;
          return (
            <g key={r.k}>
              <rect x={12} y={y} width={516} height={29} rx={7} fill="rgba(255,255,255,0.04)" stroke={r.c} strokeWidth={1.3} />
              <text x={24} y={y + 19} fill={r.c} fontSize={11.5} fontWeight={700}>{r.k}</text>
              <text x={140} y={y + 19} fill="#e2e8f0" fontSize={11.5}>{r.f}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
