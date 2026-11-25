import { useState } from 'react';

/* ============================================================================
   13.6. Bolygómozgás és műholdpályák — 8 interaktív 2D/3D SVG widget
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

/* ------------------------------------------------------------------ 1. Polárkoordinátás mozgó bázis (u_r, u_θ) */
export function PolarBasisVectorsWidget() {
  const [deg, setDeg] = useState(50);
  const th = (deg * Math.PI) / 180;
  const cx = 250;
  const cy = 148;

  // Ellipszis fókuszban az origó: r(th) = 85 / (1 + 0.35 cos th)
  const rOf = (a: number) => 82 / (1 + 0.35 * Math.cos(a));
  const orbitPts: [number, number][] = [];
  for (let i = 0; i <= 80; i++) {
    const a = (i / 80) * Math.PI * 2;
    const rv = rOf(a);
    orbitPts.push([cx + rv * Math.cos(a), cy - rv * Math.sin(a)]);
  }

  const rNow = rOf(th);
  const px = cx + rNow * Math.cos(th);
  const py = cy - rNow * Math.sin(th);

  // u_r = <cos th, sin th>, u_th = <-sin th, cos th> (SVG-ben y lefelé!)
  const urx = Math.cos(th) * 48;
  const ury = -Math.sin(th) * 48;
  const utx = -Math.sin(th) * 48;
  const uty = -Math.cos(th) * 48;

  return (
    <div className="widget">
      <div className="wtitle">Polárkoordinátás mozgó egységvektorok: u_r (sugárirányú) és u_θ (merőleges érintőirányú)</div>
      <div className="controls">
        <label>
          θ = {deg}°
          <input type="range" min={0} max={360} step={2} value={deg} onChange={(e) => setDeg(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <line x1="55" y1={cy} x2="485" y2={cy} stroke="#475569" strokeWidth="1" />
        <line x1={cx} y1="22" x2={cx} y2="250" stroke="#475569" strokeWidth="1" />

        <path d={pathFrom(orbitPts)} fill="none" stroke="#38bdf8" strokeOpacity="0.65" strokeWidth="2.2" />

        {/* Helyvektor r = r u_r */}
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="4 3" />

        {/* u_r */}
        <line x1={px} y1={py} x2={px + urx} y2={py + ury} stroke="#fb923c" strokeWidth="2.8" />
        <path d={arrowHead(px, py, px + urx, py + ury, 7)} fill="none" stroke="#fb923c" strokeWidth="2.4" />
        <text x={px + urx * 1.18 - 6} y={py + ury * 1.18 + 4} fill="#fb923c" fontSize="12.5" fontWeight="700">u_r</text>

        {/* u_theta */}
        <line x1={px} y1={py} x2={px + utx} y2={py + uty} stroke="#34d399" strokeWidth="2.8" />
        <path d={arrowHead(px, py, px + utx, py + uty, 7)} fill="none" stroke="#34d399" strokeWidth="2.4" />
        <text x={px + utx * 1.18 - 6} y={py + uty * 1.18 + 4} fill="#34d399" fontSize="12.5" fontWeight="700">u_θ</text>

        <circle cx={cx} cy={cy} r="7" fill="#fbbf24" />
        <circle cx={px} cy={py} r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          du_r/dθ = u_θ · du_θ/dθ = −u_r · v = ṙ u_r + rθ̇ u_θ
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          A gravitációs erő mindig pontosan −u_r irányú (a fókuszban lévő Nap/Föld felé húz)!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Centrális erőtér -> síkbeli pálya 3D-ben */
export function CentralForcePlane3DWidget() {
  const [t, setT] = useState(0.8);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 155, 52, yaw, 24);

  // Ferde pályasík normálvektora h (állandó!)
  const tilt = 0.35;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  const toOrb = (u: number, v: number): [number, number, number] => [u, v * ct, v * st];

  const orbitPts: [number, number][] = [];
  for (let i = 0; i <= 70; i++) {
    const a = (i / 70) * Math.PI * 2;
    const r = 1.4 / (1 + 0.3 * Math.cos(a));
    orbitPts.push(P(...toOrb(r * Math.cos(a), r * Math.sin(a))));
  }

  const rNow = 1.4 / (1 + 0.3 * Math.cos(t));
  const ux = rNow * Math.cos(t);
  const uy = rNow * Math.sin(t);
  const vx = -Math.sin(t);
  const vy = Math.cos(t) + 0.3;
  const vLen = Math.hypot(vx, vy);

  const O = P(0, 0, 0);
  const Pt = P(...toOrb(ux, uy));
  const Pv = P(...toOrb(ux + (vx / vLen) * 0.9, uy + (vy / vLen) * 0.9));
  const Ph = P(0, -1.3 * st, 1.3 * ct);

  // Sík kerete
  const quad = `${pathFrom([
    P(...toOrb(-2.2, -1.8)),
    P(...toOrb(1.6, -1.8)),
    P(...toOrb(1.6, 1.8)),
    P(...toOrb(-2.2, 1.8)),
  ])} Z`;

  return (
    <div className="widget">
      <div className="wtitle">Miért síkbeli minden bolygópálya? Mert h = r × v állandó, így r(t) ⊥ h!</div>
      <div className="controls">
        <label>
          Pályapozíció θ = {((t * 180) / Math.PI).toFixed(0)}°
          <input type="range" min={0} max={6.28} step={0.08} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 275" className="wsvg">
        <path d={quad} fill="#2dd4bf" fillOpacity="0.1" stroke="#2dd4bf" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d={pathFrom(orbitPts)} fill="none" stroke="#38bdf8" strokeWidth="2.4" />

        {/* Állandó h = r x v vektor */}
        <line x1={O[0]} y1={O[1]} x2={Ph[0]} y2={Ph[1]} stroke="#fbbf24" strokeWidth="3" />
        <path d={arrowHead(O[0], O[1], Ph[0], Ph[1], 8)} fill="none" stroke="#fbbf24" strokeWidth="2.6" />
        <text x={Ph[0] + 6} y={Ph[1] - 4} fill="#fbbf24" fontSize="13" fontWeight="700">h = r × v (állandó!)</text>

        {/* r és v */}
        <line x1={O[0]} y1={O[1]} x2={Pt[0]} y2={Pt[1]} stroke="#fb923c" strokeWidth="2.2" />
        <line x1={Pt[0]} y1={Pt[1]} x2={Pv[0]} y2={Pv[1]} stroke="#34d399" strokeWidth="2.5" />
        <path d={arrowHead(Pt[0], Pt[1], Pv[0], Pv[1], 7)} fill="none" stroke="#34d399" strokeWidth="2.2" />

        <circle cx={O[0]} cy={O[1]} r="6.5" fill="#fbbf24" />
        <circle cx={Pt[0]} cy={Pt[1]} r="4.8" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          d(r × v)/dt = r × a = 0  ⇒  h nem változik, így a bolygó sosem hagyhatja el a h-ra merőleges síkot!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Kepler 2. törvénye (egyenlő területek) */
export function KeplerSecondLawWidget() {
  const [e, setE] = useState(0.5);
  const a = 150;
  const b = a * Math.sqrt(1 - e * e);
  const c = a * e;
  const cx = 265;
  const cy = 142;
  const fx = cx + c; // Nap a jobb fókuszban

  // Perihélium közeli és aphélium közeli egyenlő területű cikkek (közelítő Δθ ~ 1/r^2)
  const rOf = (th: number) => (a * (1 - e * e)) / (1 + e * Math.cos(th));
  const wedge = (th1: number, th2: number) => {
    const pts: [number, number][] = [[fx, cy]];
    for (let i = 0; i <= 24; i++) {
      const th = th1 + (i / 24) * (th2 - th1);
      const r = rOf(th);
      pts.push([fx + r * Math.cos(th), cy - r * Math.sin(th)]);
    }
    return `${pathFrom(pts)} Z`;
  };

  // Ugyanakkora Δt -> perihéliumban szélesebb szög, aphéliumban keskenyebb szög (r_p^2 dth_p = r_a^2 dth_a)
  const dthPeri = 0.42;
  const ratio = (1 - e) / (1 + e);
  const dthAph = dthPeri * ratio * ratio;

  const wPeri = wedge(-dthPeri / 2, dthPeri / 2);
  const wAph = wedge(Math.PI - dthAph / 2, Math.PI + dthAph / 2);

  return (
    <div className="widget">
      <div className="wtitle">Kepler II. törvénye: a vezérsugár egyenlő idők alatt egyenlő területeket súrol!</div>
      <div className="controls">
        <label>
          Excentricitás e = {e.toFixed(2)}
          <input type="range" min={0.1} max={0.7} step={0.05} value={e} onChange={(e) => setE(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <ellipse cx={cx} cy={cy} rx={a} ry={b} fill="none" stroke="#38bdf8" strokeWidth="2.2" />

        {/* Egyenlő területű cikkek */}
        <path d={wPeri} fill="#34d399" fillOpacity="0.35" stroke="#34d399" strokeWidth="1.5" />
        <path d={wAph} fill="#fb923c" fillOpacity="0.35" stroke="#fb923c" strokeWidth="1.5" />

        <circle cx={fx} cy={cy} r="7.5" fill="#fbbf24" />
        <text x={fx - 12} y={cy + 20} fill="#fbbf24" fontSize="11.5" fontWeight="600">Nap</text>

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          dA/dt = ½ r²θ̇ = ½|h| = állandó  ⇒  v_peri / v_aph = (1+e)/(1−e) = {((1 + e) / (1 - e)).toFixed(2)}×
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          Zöld (perihélium: gyors, rövid sugár) és narancs (aphélium: lassú, hosszú sugár) területe pontosan egyenlő!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Kúpszelet-pályák v0/v_kör szerint */
export function OrbitConicTypesWidget() {
  const [vr, setVr] = useState(1.15); // v0 / v_kor
  // e = (v0 / v_kor)^2 - 1
  const e = vr * vr - 1;
  const r0 = 72;
  const p = r0 * (1 + e);
  const fx = 285;
  const cy = 148;

  const pts: [number, number][] = [];
  const thMax = e < 1 ? Math.PI : Math.acos(-1 / e) - 0.14;
  for (let i = -90; i <= 90; i++) {
    const th = (i / 90) * thMax;
    const denom = 1 + e * Math.cos(th);
    if (denom > 0.08) {
      const r = p / denom;
      if (r < 320) pts.push([fx + r * Math.cos(th), cy - r * Math.sin(th)]);
    }
  }

  const label =
    Math.abs(e) < 0.04
      ? 'Körpálya (e ≈ 0 · 1. kozmikus sebesség)'
      : e < 0
        ? 'Belső ellipszis (az indítási pont az aphélium!)'
        : e < 0.97
          ? 'Ellipszispálya (0 < e < 1 · zárt, kötött pálya)'
          : e <= 1.04
            ? 'Parabolapálya (e ≈ 1 · 2. kozmikus / szökési sebesség!)'
            : 'Hiperbolapálya (e > 1 · elszökik a végtelenbe!)';

  const col = e < 0.97 ? '#38bdf8' : e <= 1.04 ? '#fbbf24' : '#f87171';

  return (
    <div className="widget">
      <div className="wtitle">Kepler I. törvénye és a kozmikus sebességek: e = (v₀ / v_kör)² − 1</div>
      <div className="controls">
        <label>
          Indítási sebesség v₀ / v_kör = {vr.toFixed(2)} (szökés: √2 ≈ 1,41)
          <input type="range" min={0.75} max={1.65} step={0.02} value={vr} onChange={(e) => setVr(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <clipPath id="orbClip136">
          <rect x="10" y="10" width="520" height="250" />
        </clipPath>
        <g clipPath="url(#orbClip136)">
          {/* Referencia körpálya */}
          <circle cx={fx} cy={cy} r={r0} fill="none" stroke="#64748b" strokeDasharray="4 4" strokeWidth="1.2" />
          <path d={pathFrom(pts)} fill="none" stroke={col} strokeWidth="2.6" />
          <circle cx={fx} cy={cy} r="8" fill="#fbbf24" />
          <circle cx={fx + r0} cy={cy} r="5" fill="#34d399" />
        </g>
        <text x="16" y="22" fill={col} fontSize="12.5" fontWeight="700">
          e = {Math.abs(e).toFixed(2)} — {label}
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          Zöld pont: indítás r₀ távolságból, érintőlegesen · Szürke szaggatott: referencia körpálya (v_kör)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Kepler 3. törvénye (T^2 = a^3) */
export function KeplerThirdLawWidget() {
  const planets = [
    { name: 'Merkúr', a: 0.387, T: 0.241, color: '#94a3b8' },
    { name: 'Vénusz', a: 0.723, T: 0.615, color: '#fbbf24' },
    { name: 'Föld', a: 1.0, T: 1.0, color: '#38bdf8' },
    { name: 'Mars', a: 1.524, T: 1.881, color: '#f87171' },
    { name: 'Jupiter', a: 5.203, T: 11.86, color: '#fb923c' },
    { name: 'Szaturnusz', a: 9.537, T: 29.46, color: '#34d399' },
  ];
  const [sel, setSel] = useState(3);
  const p = planets[sel];

  // Log-log grafikon: log10(a) in [-0.5, 1.1], log10(T) in [-0.7, 1.6]
  const mapX = (a: number) => 90 + ((Math.log10(a) + 0.5) / 1.6) * 400;
  const mapY = (T: number) => 222 - ((Math.log10(T) + 0.7) / 2.35) * 185;

  return (
    <div className="widget">
      <div className="wtitle">Kepler III. törvénye a Naprendszerben: T² = a³ (CSE-ben és földi évben!)</div>
      <div className="controls">
        {planets.map((pl, i) => (
          <button key={pl.name} className={sel === i ? 'active' : ''} onClick={() => setSel(i)}>
            {pl.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 255" className="wsvg">
        <line x1="65" y1="222" x2="505" y2="222" stroke="#475569" strokeWidth="1.2" />
        <line x1="65" y1="26" x2="65" y2="222" stroke="#475569" strokeWidth="1.2" />
        {/* Elméleti egyenes: log T = 1.5 log a */}
        <line
          x1={mapX(0.32)}
          y1={mapY(Math.pow(0.32, 1.5))}
          x2={mapX(11)}
          y2={mapY(Math.pow(11, 1.5))}
          stroke="#38bdf8"
          strokeDasharray="5 4"
          strokeWidth="1.8"
        />
        {planets.map((pl, i) => {
          const x = mapX(pl.a);
          const y = mapY(pl.T);
          const active = i === sel;
          return (
            <g key={pl.name}>
              <circle cx={x} cy={y} r={active ? 7 : 4.5} fill={pl.color} stroke="#0f172a" strokeWidth="1.5" />
              <text x={x + 9} y={y + 4} fill={active ? '#e2e8f0' : '#94a3b8'} fontSize={active ? '12' : '10.5'} fontWeight={active ? '700' : '400'}>
                {pl.name}
              </text>
            </g>
          );
        })}
        <text x="76" y="38" fill={p.color} fontSize="12.5" fontWeight="700">
          {p.name}: a = {p.a} CSE · T = {p.T} év · a³ = {(p.a ** 3).toFixed(2)} ≈ T² = {(p.T ** 2).toFixed(2)}
        </text>
        <text x="65" y="244" fill="#94a3b8" fontSize="11.5">
          Log–log skálán a T² / a³ = 4π² / (GM) törvény tökéletes 3/2 meredekségű egyenesre rendezi a bolygókat!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Föld körüli műholdpályák */
export function SatelliteOrbitsWidget() {
  const [sel, setSel] = useState<'leo' | 'gps' | 'geo'>('geo');
  const data = {
    leo: { name: 'ISS (alacsony pálya, LEO)', h: 400, rDraw: 36, T: '92,6 perc', v: '7,67 km/s', color: '#34d399' },
    gps: { name: 'GPS műhold (közepes, MEO)', h: 20200, rDraw: 70, T: '12,0 óra', v: '3,87 km/s', color: '#38bdf8' },
    geo: { name: 'Geostacionárius (GEO)', h: 35870, rDraw: 102, T: '24,0 óra', v: '3,07 km/s', color: '#fbbf24' },
  }[sel];

  const cx = 190;
  const cy = 132;

  return (
    <div className="widget">
      <div className="wtitle">Föld körüli műholdpályák: magasabb pálya ⇒ hosszabb keringési idő, KISEBB sebesség!</div>
      <div className="controls">
        <button className={sel === 'leo' ? 'active' : ''} onClick={() => setSel('leo')}>ISS (400 km)</button>
        <button className={sel === 'gps' ? 'active' : ''} onClick={() => setSel('gps')}>GPS (20 200 km)</button>
        <button className={sel === 'geo' ? 'active' : ''} onClick={() => setSel('geo')}>GEO (35 870 km)</button>
      </div>
      <svg viewBox="0 0 540 250" className="wsvg">
        {/* Összes referencia pálya */}
        <circle cx={cx} cy={cy} r="36" fill="none" stroke="#34d399" strokeOpacity={sel === 'leo' ? 0.9 : 0.25} strokeWidth={sel === 'leo' ? 2.5 : 1.2} />
        <circle cx={cx} cy={cy} r="70" fill="none" stroke="#38bdf8" strokeOpacity={sel === 'gps' ? 0.9 : 0.25} strokeWidth={sel === 'gps' ? 2.5 : 1.2} />
        <circle cx={cx} cy={cy} r="102" fill="none" stroke="#fbbf24" strokeOpacity={sel === 'geo' ? 0.9 : 0.25} strokeWidth={sel === 'geo' ? 2.5 : 1.2} />

        {/* Föld */}
        <circle cx={cx} cy={cy} r="22" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.8" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="700">Föld</text>

        {/* Műhold */}
        <circle cx={cx + data.rDraw} cy={cy} r="5.5" fill={data.color} stroke="#0f172a" strokeWidth="1.4" />

        {/* Adatkártya jobb oldalon */}
        <rect x="315" y="42" width="208" height="168" rx="10" fill="#0f172a" stroke={data.color} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="330" y="68" fill={data.color} fontSize="12.5" fontWeight="700">{data.name}</text>
        <text x="330" y="98" fill="#cbd5e1" fontSize="12">Magasság: h ≈ {data.h.toLocaleString('hu-HU')} km</text>
        <text x="330" y="124" fill="#cbd5e1" fontSize="12">Keringési idő: T = {data.T}</text>
        <text x="330" y="150" fill="#cbd5e1" fontSize="12">Pályasebesség: v = {data.v}</text>
        <text x="330" y="182" fill="#94a3b8" fontSize="11">v = √(GM / r) csökken, ha r nő!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Hohmann-átmeneti pálya */
export function HohmannTransferWidget() {
  const [ratio, setRatio] = useState(2.2);
  const r1 = 44;
  const r2 = r1 * ratio;
  const a = (r1 + r2) / 2;
  const e = (r2 - r1) / (r2 + r1);
  const cx = 270;
  const cy = 142;

  // Átmeneti fél-ellipszis (r1 jobbra, r2 balra)
  const trPts: [number, number][] = [];
  for (let i = 0; i <= 50; i++) {
    const th = (i / 50) * Math.PI;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(th));
    trPts.push([cx + r * Math.cos(th), cy - r * Math.sin(th)]);
  }

  return (
    <div className="widget">
      <div className="wtitle">Hohmann-átmeneti pálya: két rövid hajtómű-begyújtással (Δv₁, Δv₂) egy fél-ellipszisen!</div>
      <div className="controls">
        <label>
          Külső / belső sugár r₂/r₁ = {ratio.toFixed(1)}
          <input type="range" min={1.4} max={2.6} step={0.1} value={ratio} onChange={(e) => setRatio(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <circle cx={cx} cy={cy} r={r1} fill="none" stroke="#38bdf8" strokeDasharray="4 3" strokeWidth="1.6" />
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke="#34d399" strokeDasharray="4 3" strokeWidth="1.6" />
        <path d={pathFrom(trPts)} fill="none" stroke="#fbbf24" strokeWidth="2.8" />

        <circle cx={cx} cy={cy} r="7" fill="#fbbf24" />
        <circle cx={cx + r1} cy={cy} r="5" fill="#fb923c" />
        <text x={cx + r1 + 8} y={cy + 4} fill="#fb923c" fontSize="11.5" fontWeight="700">Δv₁ (indítás)</text>
        <circle cx={cx - r2} cy={cy} r="5" fill="#34d399" />
        <text x={cx - r2 - 86} y={cy + 4} fill="#34d399" fontSize="11.5" fontWeight="700">Δv₂ (körpálya)</text>

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          Fél nagytengely: a = (r₁ + r₂)/2 = {((1 + ratio) / 2).toFixed(2)} r₁ · e = {e.toFixed(2)}
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Az átmeneti idő pontosan a fél-ellipszis keringési ideje: t = ½ T_ellipszis (Kepler III. törvényéből!).
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló képlettár */
export function KeplerSummaryMapDiagram() {
  const rows = [
    { label: 'Polár sebesség & gyors.', expr: 'v = ṙ u_r + rθ̇ u_θ   ·   a = (r̈ − rθ̇²)u_r + (rθ̈ + 2ṙθ̇)u_θ', color: '#38bdf8' },
    { label: 'Kepler I. törvénye', expr: 'r(θ) = a(1 − e²) / (1 + e cos θ)   (kúpszelet, fókuszban a Nap)', color: '#fbbf24' },
    { label: 'Kepler II. törvénye', expr: 'r × v = h (áll.)   ⇒   dA/dt = ½ r²θ̇ = ½|h| = állandó', color: '#34d399' },
    { label: 'Kepler III. törvénye', expr: 'T² / a³ = 4π² / (GM)   (Naprendszerben: T² = a³)', color: '#2dd4bf' },
    { label: 'Vis-viva & szökés', expr: 'v² = GM(2/r − 1/a)   ·   v_kör = √(GM/r), v_sz = √2·v_kör', color: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 13.6 fejezet összefoglaló képlettára — Kepler törvényei a vektorkalkulusból</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="600">{r.label}</text>
              <text x="180" y={y + 23} fill={r.color} fontSize="11" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
