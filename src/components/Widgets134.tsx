import { useState } from 'react';

/* ============================================================================
   13.4. Görbület és a normált főnormális — 8 interaktív 2D/3D SVG widget
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

/* ------------------------------------------------------------------ 1. Kör görbülete κ = 1/a */
export function CurvatureCircleCompareWidget() {
  const [a, setA] = useState(1.6);
  const kappa = 1 / a;
  const cx = 270;
  const cy = 152;
  const rPx = a * 34;

  // Egységnyi ívhossz Δs = 1.0 mentén elfordulás Δθ = 1 / a
  const th1 = -0.35;
  const th2 = th1 + 1.0 / a;
  const p1: [number, number] = [cx + rPx * Math.cos(th1), cy - rPx * Math.sin(th1)];
  const p2: [number, number] = [cx + rPx * Math.cos(th2), cy - rPx * Math.sin(th2)];

  const t1: [number, number] = [-Math.sin(th1) * 44, -Math.cos(th1) * 44];
  const t2: [number, number] = [-Math.sin(th2) * 44, -Math.cos(th2) * 44];

  // Ív p1 és p2 között
  const arcPts: [number, number][] = [];
  for (let i = 0; i <= 30; i++) {
    const th = th1 + (i / 30) * (th2 - th1);
    arcPts.push([cx + rPx * Math.cos(th), cy - rPx * Math.sin(th)]);
  }

  return (
    <div className="widget">
      <div className="wtitle">Kör görbülete κ = 1/a: kisebb sugár ⇒ gyorsabban elfordul T egységnyi íven!</div>
      <div className="controls">
        <label>
          Sugár a = {a.toFixed(1)}
          <input type="range" min={0.7} max={3.0} step={0.1} value={a} onChange={(e) => setA(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 275" className="wsvg">
        <circle cx={cx} cy={cy} r={rPx} fill="none" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="2" />
        <path d={pathFrom(arcPts)} fill="none" stroke="#fbbf24" strokeWidth="3.2" />

        {/* T1 és T2 */}
        <line x1={p1[0]} y1={p1[1]} x2={p1[0] + t1[0]} y2={p1[1] + t1[1]} stroke="#34d399" strokeWidth="2.6" />
        <path d={arrowHead(p1[0], p1[1], p1[0] + t1[0], p1[1] + t1[1], 7)} fill="none" stroke="#34d399" strokeWidth="2.4" />
        <line x1={p2[0]} y1={p2[1]} x2={p2[0] + t2[0]} y2={p2[1] + t2[1]} stroke="#fb923c" strokeWidth="2.6" />
        <path d={arrowHead(p2[0], p2[1], p2[0] + t2[0], p2[1] + t2[1], 7)} fill="none" stroke="#fb923c" strokeWidth="2.4" />

        <circle cx={cx} cy={cy} r="3.5" fill="#94a3b8" />
        <line x1={cx} y1={cy} x2={p1[0]} y2={p1[1]} stroke="#64748b" strokeDasharray="3 3" strokeWidth="1.2" />
        <circle cx={p1[0]} cy={p1[1]} r="4" fill="#34d399" />
        <circle cx={p2[0]} cy={p2[1]} r="4" fill="#fb923c" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          Sugár a = {a.toFixed(1)}  ⇒  Görbület κ = 1/a = {kappa.toFixed(3)} · Δθ (Δs = 1-en) = {((kappa * 180) / Math.PI).toFixed(1)}°
        </text>
        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          Arany: egységnyi Δs = 1 ívdarab · Zöld → Narancs: mennyit fordul el T(s) ezen az egységnyi úton
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Főnormális vektor N(t) mindig befelé mutat */
export function PrincipalNormalWidget() {
  const [x0, setX0] = useState(0.9);

  // y = sin(x) a [-3, 3]-on: inflexiós pont x = 0-nál N átugrik a másik oldalra!
  const mapX = (x: number) => 270 + x * 72;
  const mapY = (y: number) => 145 - y * 72;

  const pts: [number, number][] = [];
  for (let i = -90; i <= 90; i++) {
    const x = (i / 90) * 3.1;
    pts.push([mapX(x), mapY(Math.sin(x))]);
  }

  const y0 = Math.sin(x0);
  const dy = Math.cos(x0);
  const ddy = -Math.sin(x0);
  const spd = Math.hypot(1, dy);
  const tx = 1 / spd;
  const ty = dy / spd;
  // N irány: merőleges T-re, és y'' előjelének oldalára mutat!
  const sgn = ddy >= 0 ? 1 : -1;
  const nx = -ty * sgn;
  const ny = tx * sgn;

  const P: [number, number] = [mapX(x0), mapY(y0)];
  const len = 54;
  const PT: [number, number] = [P[0] + tx * len, P[1] - ty * len];
  const PN: [number, number] = [P[0] + nx * len, P[1] - ny * len];
  const kappa = Math.abs(ddy) / Math.pow(1 + dy * dy, 1.5);

  return (
    <div className="widget">
      <div className="wtitle">Normált főnormális N(t): mindig merőleges T(t)-re és a görbe KONKÁV oldala felé mutat!</div>
      <div className="controls">
        <label>
          x₀ = {x0.toFixed(2)} (próbáld x₀ = 0 körül!)
          <input type="range" min={-2.8} max={2.8} step={0.05} value={x0} onChange={(e) => setX0(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <line x1="35" y1={mapY(0)} x2="505" y2={mapY(0)} stroke="#475569" strokeWidth="1.2" />
        <line x1={mapX(0)} y1="20" x2={mapX(0)} y2="245" stroke="#475569" strokeWidth="1.2" />

        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

        {/* T vektor */}
        <line x1={P[0]} y1={P[1]} x2={PT[0]} y2={PT[1]} stroke="#34d399" strokeWidth="2.8" />
        <path d={arrowHead(P[0], P[1], PT[0], PT[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.5" />
        <text x={PT[0] + 6} y={PT[1] - 4} fill="#34d399" fontSize="12.5" fontWeight="700">T</text>

        {/* N vektor (ha kappa > 0.02) */}
        {kappa > 0.02 && (
          <>
            <line x1={P[0]} y1={P[1]} x2={PN[0]} y2={PN[1]} stroke="#fb923c" strokeWidth="2.8" />
            <path d={arrowHead(P[0], P[1], PN[0], PN[1], 8)} fill="none" stroke="#fb923c" strokeWidth="2.5" />
            <text x={PN[0] + 6} y={PN[1] + 12} fill="#fb923c" fontSize="12.5" fontWeight="700">N</text>
          </>
        )}

        <circle cx={P[0]} cy={P[1]} r="4.8" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          y = sin x · κ({x0.toFixed(2)}) = {kappa.toFixed(3)} · {kappa <= 0.02 ? 'Inflexiós pont: κ = 0, N nem értelmezett!' : 'T · N = 0 (90°)'}
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Húzd át x₀-t az origón (inflexiós pont): N átugrik a görbe egyik oldaláról a másikra!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Simulókör és görbületi sugár */
export function OsculatingCircleWidget() {
  const [x0, setX0] = useState(0.5);

  // y = 0.6 x^2
  const mapX = (x: number) => 270 + x * 64;
  const mapY = (y: number) => 222 - y * 64;

  const pts: [number, number][] = [];
  for (let i = -80; i <= 80; i++) {
    const x = (i / 80) * 2.5;
    pts.push([mapX(x), mapY(0.6 * x * x)]);
  }

  const y0 = 0.6 * x0 * x0;
  const dy = 1.2 * x0;
  const ddy = 1.2;
  const kappa = ddy / Math.pow(1 + dy * dy, 1.5);
  const rho = 1 / kappa;

  // N egységvektor felfelé-befelé: <-dy, 1> / sqrt(1 + dy^2)
  const spd = Math.hypot(1, dy);
  const nx = -dy / spd;
  const ny = 1 / spd;
  const cx = x0 + rho * nx;
  const cy = y0 + rho * ny;

  const P: [number, number] = [mapX(x0), mapY(y0)];
  const C: [number, number] = [mapX(cx), mapY(cy)];

  return (
    <div className="widget">
      <div className="wtitle">Simulókör a y = 0,6x² parabolán: sugara ρ = 1/κ, középpontja r + ρN</div>
      <div className="controls">
        <label>
          x₀ = {x0.toFixed(2)}
          <input type="range" min={-1.6} max={1.6} step={0.05} value={x0} onChange={(e) => setX0(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <clipPath id="oscClip134">
          <rect x="10" y="10" width="520" height="250" />
        </clipPath>
        <g clipPath="url(#oscClip134)">
          <line x1="30" y1={mapY(0)} x2="510" y2={mapY(0)} stroke="#475569" strokeWidth="1.2" />
          <line x1={mapX(0)} y1="15" x2={mapX(0)} y2="245" stroke="#475569" strokeWidth="1.2" />

          {/* Simulókör */}
          <circle cx={C[0]} cy={C[1]} r={rho * 64} fill="#34d399" fillOpacity="0.08" stroke="#34d399" strokeWidth="2" strokeDasharray="5 3" />
          {/* Sugár */}
          <line x1={P[0]} y1={P[1]} x2={C[0]} y2={C[1]} stroke="#fb923c" strokeWidth="2" />
          <circle cx={C[0]} cy={C[1]} r="4" fill="#fb923c" />

          {/* Parabola */}
          <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.6" />
          <circle cx={P[0]} cy={P[1]} r="5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />
        </g>

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          κ({x0.toFixed(2)}) = {kappa.toFixed(3)} · Görbületi sugár ρ = 1/κ = {rho.toFixed(2)}
        </text>
        <text x="16" y="256" fill="#94a3b8" fontSize="11.5">
          A parabola csúcsában (x₀ = 0) a simulókör a legkisebb (legélesebb kanyar); kifelé haladva egyre nagyobb!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. f(x) és κ(x) összehangolt grafikonja */
export function GraphCurvaturePlotWidget() {
  const [kind, setKind] = useState<'exp' | 'parab' | 'sin'>('exp');
  const [x0, setX0] = useState(-0.35);

  const fn = (x: number) => (kind === 'exp' ? Math.exp(x) : kind === 'parab' ? 0.5 * x * x : Math.sin(x));
  const d1 = (x: number) => (kind === 'exp' ? Math.exp(x) : kind === 'parab' ? x : Math.cos(x));
  const d2 = (x: number) => (kind === 'exp' ? Math.exp(x) : kind === 'parab' ? 1 : -Math.sin(x));
  const kap = (x: number) => Math.abs(d2(x)) / Math.pow(1 + d1(x) * d1(x), 1.5);

  const mapX = (x: number) => 270 + x * 78;
  const mapYTop = (y: number) => 112 - y * 24;
  const mapYBot = (k: number) => 235 - k * 90;

  const fPts: [number, number][] = [];
  const kPts: [number, number][] = [];
  for (let i = -90; i <= 90; i++) {
    const x = (i / 90) * 2.8;
    const y = fn(x);
    if (y > -3 && y < 4.2) fPts.push([mapX(x), mapYTop(y)]);
    kPts.push([mapX(x), mapYBot(kap(x))]);
  }

  const kVal = kap(x0);

  return (
    <div className="widget">
      <div className="wtitle">Függvénygörbe y = f(x) (felül) és görbületfüggvénye κ(x) (alul)</div>
      <div className="controls">
        <button className={kind === 'exp' ? 'active' : ''} onClick={() => setKind('exp')}>y = eˣ</button>
        <button className={kind === 'parab' ? 'active' : ''} onClick={() => setKind('parab')}>y = ½x²</button>
        <button className={kind === 'sin' ? 'active' : ''} onClick={() => setKind('sin')}>y = sin x</button>
        <label>
          x₀ = {x0.toFixed(2)}
          <input type="range" min={-2.5} max={2.5} step={0.05} value={x0} onChange={(e) => setX0(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {/* Felső sáv: f(x) */}
        <line x1="35" y1={mapYTop(0)} x2="505" y2={mapYTop(0)} stroke="#475569" strokeWidth="1" />
        <path d={pathFrom(fPts)} fill="none" stroke="#38bdf8" strokeWidth="2.3" />
        {/* Alsó sáv: kappa(x) */}
        <line x1="35" y1={mapYBot(0)} x2="505" y2={mapYBot(0)} stroke="#475569" strokeWidth="1" />
        <path d={pathFrom(kPts)} fill="none" stroke="#34d399" strokeWidth="2.3" />

        {/* Szinkron függőleges vonal */}
        <line x1={mapX(x0)} y1="22" x2={mapX(x0)} y2="242" stroke="#fbbf24" strokeDasharray="3 3" strokeWidth="1.3" />
        <circle cx={mapX(x0)} cy={mapYBot(kVal)} r="4.5" fill="#fbbf24" />
        {fn(x0) > -3 && fn(x0) < 4.2 && <circle cx={mapX(x0)} cy={mapYTop(fn(x0))} r="4.5" fill="#fbbf24" />}

        <text x="16" y="20" fill="#38bdf8" fontSize="11.5" fontWeight="600">f(x)</text>
        <text x="16" y="158" fill="#34d399" fontSize="11.5" fontWeight="600">κ(x) = |f″| / (1 + (f′)²)^(3/2)</text>
        <text x="520" y="20" textAnchor="end" fill="#fbbf24" fontSize="12" fontWeight="600">
          κ({x0.toFixed(2)}) = {kVal.toFixed(3)}
        </text>
        <text x="16" y="256" fill="#94a3b8" fontSize="11.5">
          {kind === 'exp'
            ? 'Tipp: y = eˣ görbülete x = −½ ln 2 ≈ −0,35-nél maximális (κ_max ≈ 0,385)!'
            : kind === 'parab'
              ? 'A parabola csúcsában maximális a görbület (κ(0) = 1), távolabb 0-hoz tart.'
              : 'A szinusz görbülete a csúcsokban 1, az inflexiós pontokban (0, ±π) pontosan 0.'}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Csavarvonal görbülete 3D-ben */
export function HelixCurvature3DWidget() {
  const [a, setA] = useState(1.4);
  const [b, setB] = useState(0.5);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 155, 38, yaw, 20);

  const kappa = a / (a * a + b * b);
  const pts: [number, number][] = [];
  for (let i = 0; i <= 110; i++) {
    const t = (i / 110) * Math.PI * 3;
    const z = b * (t - Math.PI * 1.5) * 0.45;
    pts.push(P(a * Math.cos(t), a * Math.sin(t), z));
  }

  return (
    <div className="widget">
      <div className="wtitle">Csavarvonal görbülete: κ = a / (a² + b²) — ha széthúzzuk (b ↑), kiegyenesedik (κ → 0)!</div>
      <div className="controls">
        <label>
          Sugár a = {a.toFixed(1)}
          <input type="range" min={0.6} max={2.2} step={0.1} value={a} onChange={(e) => setA(+e.target.value)} />
        </label>
        <label>
          Emelkedés b = {b.toFixed(1)}
          <input type="range" min={0} max={2.2} step={0.1} value={b} onChange={(e) => setB(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          r(t) = ⟨{a.toFixed(1)} cos t, {a.toFixed(1)} sin t, {b.toFixed(1)} t⟩  ⇒  κ = {kappa.toFixed(3)} (állandó!)
        </text>
        <text x="16" y="42" fill="#34d399" fontSize="12">
          Görbületi sugár ρ = 1/κ = {(1 / kappa).toFixed(2)} (b = 0-nál visszakapjuk a kört: κ = 1/a!)
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          Képzelj el egy rugót: ha kifeszíted (b növekszik), a kanyarodása ellaposodik és κ csökken!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Kanyarodó autó és centripetális gyorsulás */
export function HighwayTurnPhysicsWidget() {
  const [v, setV] = useState(20); // m/s
  const [rho, setRho] = useState(80); // m
  const aN = (v * v) / rho;
  const gUnits = aN / 9.81;
  const safe = gUnits <= 0.4;

  const cx = 270;
  const cy = 230;
  const rDraw = 70 + rho * 0.65;
  const px = cx;
  const py = cy - rDraw;

  const arrowLen = Math.min(105, aN * 14);

  return (
    <div className="widget">
      <div className="wtitle">Útépítés és fizika: a kanyarban ható oldalirányú gyorsulás a_N = κv² = v²/ρ!</div>
      <div className="controls">
        <label>
          Sebesség v = {v} m/s ({(v * 3.6).toFixed(0)} km/h)
          <input type="range" min={10} max={36} step={1} value={v} onChange={(e) => setV(+e.target.value)} />
        </label>
        <label>
          Kanyarsugár ρ = {rho} m
          <input type="range" min={35} max={180} step={5} value={rho} onChange={(e) => setRho(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 245" className="wsvg">
        <clipPath id="roadClip134">
          <rect x="10" y="10" width="520" height="225" />
        </clipPath>
        <g clipPath="url(#roadClip134)">
          <circle cx={cx} cy={cy} r={rDraw} fill="none" stroke="#334155" strokeWidth="26" />
          <circle cx={cx} cy={cy} r={rDraw} fill="none" stroke="#38bdf8" strokeDasharray="8 6" strokeWidth="1.8" />
          {/* Sebességvektor T irányban */}
          <line x1={px} y1={py} x2={px + v * 2.6} y2={py} stroke="#34d399" strokeWidth="2.8" />
          <path d={arrowHead(px, py, px + v * 2.6, py, 8)} fill="none" stroke="#34d399" strokeWidth="2.5" />
          <text x={px + v * 2.6 + 6} y={py + 4} fill="#34d399" fontSize="12" fontWeight="700">v (T)</text>

          {/* Normális gyorsulás N irányban */}
          <line x1={px} y1={py} x2={px} y2={py + arrowLen} stroke={safe ? '#fb923c' : '#f87171'} strokeWidth="3" />
          <path d={arrowHead(px, py, px, py + arrowLen, 8)} fill="none" stroke={safe ? '#fb923c' : '#f87171'} strokeWidth="2.6" />
          <text x={px + 8} y={py + arrowLen} fill={safe ? '#fb923c' : '#f87171'} fontSize="12" fontWeight="700">a_N (N)</text>

          <circle cx={px} cy={py} r="5.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
        </g>

        <text x="16" y="24" fill={safe ? '#34d399' : '#f87171'} fontSize="12.5" fontWeight="600">
          κ = {(1 / rho).toFixed(4)} m⁻¹ · a_N = v²/ρ = {aN.toFixed(2)} m/s² ({gUnits.toFixed(2)} g) — {safe ? 'Biztonságos tapadás' : 'Túl gyors: kisodródásveszély!'}
        </text>
        <text x="16" y="236" fill="#94a3b8" fontSize="11.5">
          Ha a sebesség megduplázódik, a normális gyorsulás négyszeresére nő (a_N = κv²)!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Simulósík (T-N sík) 3D-ben */
export function TNFrameOscPlane3DWidget() {
  const [t, setT] = useState(1.5);
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 155, 42, yaw, 20);

  const R = 1.4;
  const c = 0.45;
  const spd = Math.hypot(R, c);
  const r = (u: number): [number, number, number] => [R * Math.cos(u), R * Math.sin(u), c * u - 1.1];
  const Tvec = (u: number): [number, number, number] => [(-R * Math.sin(u)) / spd, (R * Math.cos(u)) / spd, c / spd];
  const Nvec = (u: number): [number, number, number] => [-Math.cos(u), -Math.sin(u), 0];

  const pts: [number, number][] = [];
  for (let i = 0; i <= 90; i++) pts.push(P(...r((i / 90) * 5.6)));

  const [rx, ry, rz] = r(t);
  const [tx, ty, tz] = Tvec(t);
  const [nx, ny, nz] = Nvec(t);

  const s = 0.78;
  const oscPlane: [number, number][] = [
    P(rx + s * (tx + nx), ry + s * (ty + ny), rz + s * (tz + nz)),
    P(rx + s * (-tx + nx), ry + s * (-ty + ny), rz + s * (-tz + nz)),
    P(rx + s * (-tx - nx), ry + s * (-ty - ny), rz + s * (-tz - nz)),
    P(rx + s * (tx - nx), ry + s * (ty - ny), rz + s * (tz - nz)),
  ];

  const Pt = P(rx, ry, rz);
  const PT = P(rx + tx * 0.95, ry + ty * 0.95, rz + tz * 0.95);
  const PN = P(rx + nx * 0.95, ry + ny * 0.95, rz + nz * 0.95);

  return (
    <div className="widget">
      <div className="wtitle">A T és N által kifeszített simulósík: ebben a síkban kanyarodik a görbe a t₀ pillanatban!</div>
      <div className="controls">
        <label>
          t = {t.toFixed(2)}
          <input type="range" min={0.4} max={5.0} step={0.05} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 275" className="wsvg">
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.3" />
        {/* Simulósík */}
        <path d={`${pathFrom(oscPlane)} Z`} fill="#fbbf24" fillOpacity="0.14" stroke="#fbbf24" strokeOpacity="0.65" strokeWidth="1.4" />
        {/* T és N */}
        <line x1={Pt[0]} y1={Pt[1]} x2={PT[0]} y2={PT[1]} stroke="#34d399" strokeWidth="3" />
        <path d={arrowHead(Pt[0], Pt[1], PT[0], PT[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.6" />
        <text x={PT[0] + 6} y={PT[1] - 4} fill="#34d399" fontSize="12.5" fontWeight="700">T</text>

        <line x1={Pt[0]} y1={Pt[1]} x2={PN[0]} y2={PN[1]} stroke="#fb923c" strokeWidth="3" />
        <path d={arrowHead(Pt[0], Pt[1], PN[0], PN[1], 8)} fill="none" stroke="#fb923c" strokeWidth="2.6" />
        <text x={PN[0] + 6} y={PN[1] + 12} fill="#fb923c" fontSize="12.5" fontWeight="700">N</text>

        <circle cx={Pt[0]} cy={Pt[1]} r="4.5" fill="#fbbf24" />
        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          A simulósík normálvektora B = T × N lesz (13.5 fejezet: binormális és torzió)!
        </text>
        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          Zöld: T (haladás iránya) · Narancs: N (kanyarodás iránya) · Arany: a kettő által kifeszített simulósík
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló térkép */
export function CurvatureMapDiagram() {
  const rows = [
    { label: 'Görbület definíciója', expr: 'κ = |dT/ds| = |T′(t)| / |v(t)|', color: '#38bdf8' },
    { label: 'Normált főnormális', expr: 'N(t) = T′(t) / |T′(t)|   (N ⊥ T, befelé mutat)', color: '#fb923c' },
    { label: '3D keresztszorzatos', expr: 'κ(t) = |v(t) × a(t)| / |v(t)|³', color: '#34d399' },
    { label: 'Függvénygrafikon', expr: 'κ(x) = |f″(x)| / (1 + [f′(x)]²)^(3/2)', color: '#2dd4bf' },
    { label: 'Simulókör & sugár', expr: 'ρ = 1/κ   ·   középpont: r(t) + ρ N(t)', color: '#fbbf24' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 13.4 fejezet összefoglaló képlettára — görbület és főnormális</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="12" fontWeight="600">{r.label}</text>
              <text x="195" y={y + 23} fill={r.color} fontSize="12.5" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
