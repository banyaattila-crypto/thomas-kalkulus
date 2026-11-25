import { useState } from 'react';

/* ============================================================================
   13.2. Egy lövedék röppályájának leírása — 8 interaktív 2D/3D SVG widget
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

/* ------------------------------------------------------------------ 1. Ideális lövedék indítása és sebesség-felbontás */
export function ProjectileLaunchWidget() {
  const [v0, setV0] = useState(24);
  const [deg, setDeg] = useState(50);
  const [frac, setFrac] = useState(0.35);
  const g = 10;
  const rad = (deg * Math.PI) / 180;
  const vx0 = v0 * Math.cos(rad);
  const vy0 = v0 * Math.sin(rad);
  const T = (2 * vy0) / g;
  const R = vx0 * T;
  const H = (vy0 * vy0) / (2 * g);
  const t = frac * T;

  const mapX = (x: number) => 44 + x * 4.5;
  const mapY = (y: number) => 230 - y * 4.5;

  const pts: [number, number][] = [];
  for (let i = 0; i <= 70; i++) {
    const u = (i / 70) * T;
    pts.push([mapX(vx0 * u), mapY(vy0 * u - 0.5 * g * u * u)]);
  }

  const px = vx0 * t;
  const py = vy0 * t - 0.5 * g * t * t;
  const vy = vy0 - g * t;

  const P = [mapX(px), mapY(py)];
  const Pv = [mapX(px + vx0 * 0.42), mapY(py + vy * 0.42)];
  const Pvx = [mapX(px + vx0 * 0.42), mapY(py)];
  const Pvy = [mapX(px), mapY(py + vy * 0.42)];

  return (
    <div className="widget">
      <div className="wtitle">Ideális lövedék: vₓ állandó, csak vᵧ változik a gravitáció miatt (g = 10 m/s²)</div>
      <div className="controls">
        <label>
          v₀ = {v0} m/s
          <input type="range" min={12} max={32} step={1} value={v0} onChange={(e) => setV0(+e.target.value)} />
        </label>
        <label>
          α = {deg}°
          <input type="range" min={15} max={80} step={1} value={deg} onChange={(e) => setDeg(+e.target.value)} />
        </label>
        <label>
          t / T = {(frac * 100).toFixed(0)}%
          <input type="range" min={0} max={1} step={0.02} value={frac} onChange={(e) => setFrac(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <line x1="30" y1={mapY(0)} x2="520" y2={mapY(0)} stroke="#475569" strokeWidth="1.4" />
        <line x1={mapX(0)} y1="20" x2={mapX(0)} y2="245" stroke="#475569" strokeWidth="1.2" />

        {/* Pálya */}
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.4" />

        {/* Sebesség komponensek */}
        <line x1={P[0]} y1={P[1]} x2={Pvx[0]} y2={Pvx[1]} stroke="#2dd4bf" strokeWidth="2" strokeDasharray="4 2" />
        <line x1={P[0]} y1={P[1]} x2={Pvy[0]} y2={Pvy[1]} stroke="#fb923c" strokeWidth="2" strokeDasharray="4 2" />
        <line x1={P[0]} y1={P[1]} x2={Pv[0]} y2={Pv[1]} stroke="#34d399" strokeWidth="2.6" />
        <path d={arrowHead(P[0], P[1], Pv[0], Pv[1], 7)} fill="none" stroke="#34d399" strokeWidth="2.3" />
        <circle cx={P[0]} cy={P[1]} r="5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          t = {t.toFixed(2)} s · v(t) = ⟨{vx0.toFixed(1)}; {vy.toFixed(1)}⟩ m/s · H = {H.toFixed(1)} m · R = {R.toFixed(1)} m
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Zöld: v(t) · Teal: állandó vₓ · Narancs: vᵧ(t) = v₀ sin α − gt (a csúcsponton 0!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Kiegészítő szögek és 45°-os maximum */
export function RangeComplementaryWidget() {
  const [deg, setDeg] = useState(30);
  const v0 = 26;
  const g = 10;
  const comp = 90 - deg;

  const mapX = (x: number) => 42 + x * 6.4;
  const mapY = (y: number) => 232 - y * 5.2;

  const makeCurve = (angleDeg: number) => {
    const a = (angleDeg * Math.PI) / 180;
    const vx = v0 * Math.cos(a);
    const vy = v0 * Math.sin(a);
    const T = (2 * vy) / g;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 60; i++) {
      const u = (i / 60) * T;
      pts.push([mapX(vx * u), mapY(vy * u - 0.5 * g * u * u)]);
    }
    return { pts, R: vx * T, H: (vy * vy) / (2 * g), T };
  };

  const c1 = makeCurve(deg);
  const c2 = makeCurve(comp);
  const c45 = makeCurve(45);

  return (
    <div className="widget">
      <div className="wtitle">Kiegészítő hajlásszögek (α és 90° − α): azonos lőtávolság, eltérő magasság és repülési idő!</div>
      <div className="controls">
        <label>
          α = {deg}° (párja: {comp}°)
          <input type="range" min={15} max={75} step={1} value={deg} onChange={(e) => setDeg(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <line x1="30" y1={mapY(0)} x2="520" y2={mapY(0)} stroke="#475569" strokeWidth="1.4" />
        <line x1={mapX(0)} y1="20" x2={mapX(0)} y2="245" stroke="#475569" strokeWidth="1.2" />

        {/* 45°-os referencia */}
        <path d={pathFrom(c45.pts)} fill="none" stroke="#64748b" strokeDasharray="5 4" strokeWidth="1.5" />
        {/* α és 90-α görbék */}
        <path d={pathFrom(c1.pts)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <path d={pathFrom(c2.pts)} fill="none" stroke="#fb923c" strokeWidth="2.5" />

        <circle cx={mapX(c1.R)} cy={mapY(0)} r="5" fill="#fbbf24" />
        <circle cx={mapX(c45.R)} cy={mapY(0)} r="4" fill="#94a3b8" />

        <text x="16" y="22" fill="#38bdf8" fontSize="12">
          α = {deg}°: R = {c1.R.toFixed(1)} m · H = {c1.H.toFixed(1)} m · T = {c1.T.toFixed(2)} s
        </text>
        <text x="16" y="40" fill="#fb923c" fontSize="12">
          90°−α = {comp}°: R = {c2.R.toFixed(1)} m · H = {c2.H.toFixed(1)} m · T = {c2.T.toFixed(2)} s
        </text>
        <text x="16" y="255" fill="#94a3b8" fontSize="11.5">
          Szaggatott szürke: α = 45° maximális lőtávolság (R_max = {c45.R.toFixed(1)} m)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Célpont eltalálása és biztonsági parabola */
export function TargetParabolaWidget() {
  const [tx, setTx] = useState(40);
  const [ty, setTy] = useState(14);
  const v0 = 26;
  const g = 10;

  const mapX = (x: number) => 42 + x * 6.4;
  const mapY = (y: number) => 232 - y * 5.2;

  // Biztonsági parabola: y = v0^2/(2g) - g/(2 v0^2) x^2
  const envPts: [number, number][] = [];
  const xMax = (v0 * v0) / g;
  for (let i = 0; i <= 70; i++) {
    const x = (i / 70) * xMax;
    const y = (v0 * v0) / (2 * g) - (g / (2 * v0 * v0)) * x * x;
    envPts.push([mapX(x), mapY(y)]);
  }

  // Kvadratikus egyenlet u = tan(alpha)-ra: (g x^2 / (2 v0^2)) u^2 - x u + (y + g x^2 / (2 v0^2)) = 0
  const A = (g * tx * tx) / (2 * v0 * v0);
  const B = -tx;
  const C = ty + A;
  const disc = B * B - 4 * A * C;

  const solCurves: { pts: [number, number][]; deg: number; color: string }[] = [];
  if (disc >= 0 && tx > 0.5) {
    const roots = [(-B - Math.sqrt(disc)) / (2 * A), (-B + Math.sqrt(disc)) / (2 * A)];
    const colors = ['#34d399', '#38bdf8'];
    roots.forEach((u, idx) => {
      const a = Math.atan(u);
      const pts: [number, number][] = [];
      for (let i = 0; i <= 60; i++) {
        const x = (i / 60) * tx;
        const y = u * x - (g * (1 + u * u) * x * x) / (2 * v0 * v0);
        pts.push([mapX(x), mapY(y)]);
      }
      solCurves.push({ pts, deg: (a * 180) / Math.PI, color: colors[idx] });
    });
  }

  return (
    <div className="widget">
      <div className="wtitle">Célpont eltalálása (x₁, y₁) és a biztonsági parabola burkológörbéje (v₀ = 26 m/s)</div>
      <div className="controls">
        <label>
          x₁ = {tx} m
          <input type="range" min={10} max={66} step={1} value={tx} onChange={(e) => setTx(+e.target.value)} />
        </label>
        <label>
          y₁ = {ty} m
          <input type="range" min={0} max={36} step={1} value={ty} onChange={(e) => setTy(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <line x1="30" y1={mapY(0)} x2="520" y2={mapY(0)} stroke="#475569" strokeWidth="1.4" />
        <line x1={mapX(0)} y1="18" x2={mapX(0)} y2="245" stroke="#475569" strokeWidth="1.2" />

        {/* Biztonsági parabola */}
        <path d={pathFrom(envPts)} fill="none" stroke="#f87171" strokeDasharray="5 4" strokeWidth="1.8" />

        {/* Megoldáspályák */}
        {solCurves.map((c, i) => (
          <path key={i} d={pathFrom(c.pts)} fill="none" stroke={c.color} strokeWidth="2.4" />
        ))}

        {/* Célpont */}
        <circle cx={mapX(tx)} cy={mapY(ty)} r="5.5" fill={disc >= 0 ? '#fbbf24' : '#f87171'} stroke="#0f172a" strokeWidth="1.5" />

        <text x="16" y="22" fill={disc >= 0 ? '#34d399' : '#f87171'} fontSize="12" fontWeight="600">
          {disc >= 0
            ? `Elérhető! Lapos ív: ${solCurves[0]?.deg.toFixed(1)}° · Magas ív: ${solCurves[1]?.deg.toFixed(1)}°`
            : 'A célpont a biztonsági parabolán KÍVÜL esik (nem érhető el v₀ = 26 m/s-mal)!'}
        </text>
        <text x="16" y="255" fill="#94a3b8" fontSize="11.5">
          Piros szaggatott: biztonsági parabola y = v₀²/(2g) − g/(2v₀²)·x² (az elérhető tartomány határa)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Magasabbról indított dobás (y0 > 0) */
export function ElevatedLaunchWidget() {
  const [y0, setY0] = useState(20);
  const [deg, setDeg] = useState(35);
  const v0 = 20;
  const g = 10;

  const mapX = (x: number) => 46 + x * 6.5;
  const mapY = (y: number) => 232 - y * 3.8;

  const evalThrow = (angleDeg: number) => {
    const a = (angleDeg * Math.PI) / 180;
    const vx = v0 * Math.cos(a);
    const vy = v0 * Math.sin(a);
    const T = (vy + Math.sqrt(vy * vy + 2 * g * y0)) / g;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 60; i++) {
      const u = (i / 60) * T;
      pts.push([mapX(vx * u), mapY(y0 + vy * u - 0.5 * g * u * u)]);
    }
    return { pts, R: vx * T, T };
  };

  // Optimális szög magasabbról: sin(a_opt) = 1 / sqrt(2 + 2 g y0 / v0^2)
  const optRad = Math.asin(1 / Math.sqrt(2 + (2 * g * y0) / (v0 * v0)));
  const optDeg = (optRad * 180) / Math.PI;
  const cur = evalThrow(deg);
  const opt = evalThrow(optDeg);

  return (
    <div className="widget">
      <div className="wtitle">Dobás y₀ magasságból: az optimális hajlásszög 45°-nál KISEBB!</div>
      <div className="controls">
        <label>
          y₀ = {y0} m
          <input type="range" min={0} max={35} step={1} value={y0} onChange={(e) => setY0(+e.target.value)} />
        </label>
        <label>
          α = {deg}°
          <input type="range" min={0} max={75} step={1} value={deg} onChange={(e) => setDeg(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {/* Szikla / emelvény */}
        <rect x="20" y={mapY(y0)} width="26" height={mapY(0) - mapY(y0)} fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
        <line x1="20" y1={mapY(0)} x2="520" y2={mapY(0)} stroke="#475569" strokeWidth="1.4" />

        {/* Optimális pálya */}
        <path d={pathFrom(opt.pts)} fill="none" stroke="#34d399" strokeDasharray="5 3" strokeWidth="1.8" />
        {/* Választott pálya */}
        <path d={pathFrom(cur.pts)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

        <circle cx={mapX(0)} cy={mapY(y0)} r="4.5" fill="#fbbf24" />
        <circle cx={mapX(cur.R)} cy={mapY(0)} r="4.5" fill="#38bdf8" />
        <circle cx={mapX(opt.R)} cy={mapY(0)} r="4" fill="#34d399" />

        <text x="58" y="24" fill="#38bdf8" fontSize="12">
          α = {deg}°: R = {cur.R.toFixed(1)} m · T = {cur.T.toFixed(2)} s
        </text>
        <text x="58" y="42" fill="#34d399" fontSize="12">
          Optimális α_opt = {optDeg.toFixed(1)}°: R_max = {opt.R.toFixed(1)} m
        </text>
        <text x="58" y="254" fill="#94a3b8" fontSize="11.5">
          Minél magasabbról dobunk (y₀ ↑), annál laposabb szög adja a legnagyobb távolságot!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Dobás ferde síkra (lejtő / emelkedő) */
export function InclineLaunchWidget() {
  const [beta, setBeta] = useState(18);
  const [alpha, setAlpha] = useState(54);
  const v0 = 24;
  const g = 10;

  const optAlpha = 45 + beta / 2;
  const mapX = (x: number) => 46 + x * 6.5;
  const mapY = (y: number) => 185 - y * 4.2;

  const bRad = (beta * Math.PI) / 180;
  const aRad = (alpha * Math.PI) / 180;
  const vx = v0 * Math.cos(aRad);
  const vy = v0 * Math.sin(aRad);
  // Becsapódás a y = x tan(beta) egyenesre: (vy - vx tan beta) t - 0.5 g t^2 = 0
  const T = Math.max(0, (2 * (vy - vx * Math.tan(bRad))) / g);
  const xHit = vx * T;
  const yHit = xHit * Math.tan(bRad);
  const distAlong = Math.hypot(xHit, yHit);

  const pts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const u = (i / 60) * T;
    pts.push([mapX(vx * u), mapY(vy * u - 0.5 * g * u * u)]);
  }

  return (
    <div className="widget">
      <div className="wtitle">Dobás β hajlásszögű ferde síkra: az optimális szög α_opt = 45° + β/2</div>
      <div className="controls">
        <label>
          Lejtő β = {beta}°
          <input type="range" min={-20} max={28} step={1} value={beta} onChange={(e) => setBeta(+e.target.value)} />
        </label>
        <label>
          Dobásszög α = {alpha}°
          <input type="range" min={Math.max(5, beta + 4)} max={82} step={1} value={Math.max(alpha, beta + 4)} onChange={(e) => setAlpha(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {/* Vízszintes referencia */}
        <line x1="30" y1={mapY(0)} x2="520" y2={mapY(0)} stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />
        {/* Ferde sík */}
        <line
          x1={mapX(0)}
          y1={mapY(0)}
          x2={mapX(72)}
          y2={mapY(72 * Math.tan(bRad))}
          stroke="#fb923c"
          strokeWidth="2.4"
        />
        {/* Pálya */}
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <circle cx={mapX(xHit)} cy={mapY(yHit)} r="5" fill="#fbbf24" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          Lejtő menti táv: d = {distAlong.toFixed(1)} m · Repülési idő: T = {T.toFixed(2)} s
        </text>
        <text x="16" y="40" fill="#34d399" fontSize="12">
          Optimális dobásszög ehhez a lejtőhöz: α_opt = 45° + ({beta}°)/2 = {optAlpha.toFixed(1)}°
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Narancs: ferde talaj (y = x tan β) · Emelkedőnél α_opt &gt; 45°, lejtőnél α_opt &lt; 45°.
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Légellenállás vs. vákuum */
export function AirDragCompareWidget() {
  const [k, setK] = useState(0.22);
  const v0 = 28;
  const deg = 45;
  const g = 10;
  const rad = (deg * Math.PI) / 180;
  const vx0 = v0 * Math.cos(rad);
  const vy0 = v0 * Math.sin(rad);

  const mapX = (x: number) => 42 + x * 5.6;
  const mapY = (y: number) => 232 - y * 6.4;

  // Vákuum pálya
  const Tvac = (2 * vy0) / g;
  const vacPts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const u = (i / 60) * Tvac;
    vacPts.push([mapX(vx0 * u), mapY(vy0 * u - 0.5 * g * u * u)]);
  }

  // Lineáris légellenállás: a = -k v - g j
  const dragPts: [number, number][] = [];
  let rDrag = 0;
  for (let i = 0; i <= 140; i++) {
    const u = (i / 140) * Tvac;
    const x = k < 1e-3 ? vx0 * u : (vx0 / k) * (1 - Math.exp(-k * u));
    const y =
      k < 1e-3
        ? vy0 * u - 0.5 * g * u * u
        : (1 / k) * (vy0 + g / k) * (1 - Math.exp(-k * u)) - (g / k) * u;
    if (y >= 0) {
      dragPts.push([mapX(x), mapY(y)]);
      rDrag = x;
    } else if (i > 0) {
      break;
    }
  }
  const xAsym = k > 0.02 ? vx0 / k : null;

  return (
    <div className="widget">
      <div className="wtitle">Lineáris légellenállás (a = −kv − gj): aszimmetrikus pálya és függőleges aszimptota!</div>
      <div className="controls">
        <label>
          Fékezési tényező k = {k.toFixed(2)} s⁻¹
          <input type="range" min={0} max={0.5} step={0.02} value={k} onChange={(e) => setK(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <line x1="30" y1={mapY(0)} x2="520" y2={mapY(0)} stroke="#475569" strokeWidth="1.4" />
        <line x1={mapX(0)} y1="18" x2={mapX(0)} y2="245" stroke="#475569" strokeWidth="1.2" />

        {/* Függőleges aszimptota x = vx0 / k */}
        {xAsym && mapX(xAsym) < 515 && (
          <>
            <line x1={mapX(xAsym)} y1="24" x2={mapX(xAsym)} y2={mapY(0)} stroke="#f87171" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x={mapX(xAsym) + 5} y="42" fill="#f87171" fontSize="11">x_max = {xAsym.toFixed(1)} m</text>
          </>
        )}

        {/* Vákuum vs. légellenállás */}
        <path d={pathFrom(vacPts)} fill="none" stroke="#64748b" strokeDasharray="5 4" strokeWidth="1.8" />
        <path d={pathFrom(dragPts)} fill="none" stroke="#38bdf8" strokeWidth="2.6" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          Vákuum R = {(vx0 * Tvac).toFixed(1)} m · Légellenállással R ≈ {rDrag.toFixed(1)} m
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Szaggatott szürke: szimmetrikus vákuum-parabola · Cián: meredekebben lefelé zuhanó valós pálya
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. 3D lövedék oldalszéllel */
export function Wind3DProjectileWidget() {
  const [aw, setAw] = useState(2.2);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(140, 210, 12, yaw, 22);

  const vx0 = 14;
  const vz0 = 16;
  const g = 10;
  const T = (2 * vz0) / g; // 3.2 s

  const noWind: [number, number][] = [];
  const withWind: [number, number][] = [];
  const shadowWind: [number, number][] = [];

  for (let i = 0; i <= 50; i++) {
    const t = (i / 50) * T;
    const x = vx0 * t * 0.45;
    const z = (vz0 * t - 0.5 * g * t * t) * 0.65;
    const y = 0.5 * aw * t * t * 0.55;
    noWind.push(P(x, 0, z));
    withWind.push(P(x, y, z));
    shadowWind.push(P(x, y, 0));
  }

  const O = P(0, 0, 0);
  const axX = P(24, 0, 0);
  const axY = P(0, 14, 0);
  const axZ = P(0, 0, 12);
  const drift = 0.5 * aw * T * T;

  return (
    <div className="widget">
      <div className="wtitle">3D lövedék oldalszélben: a repülési idő változatlan, a pálya oldalra sodródik!</div>
      <div className="controls">
        <label>
          Oldalszél gyorsulás a_y = {aw.toFixed(1)} m/s²
          <input type="range" min={-3} max={3.5} step={0.1} value={aw} onChange={(e) => setAw(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-20} max={75} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 275" className="wsvg">
        <line x1={O[0]} y1={O[1]} x2={axX[0]} y2={axX[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={axY[0]} y2={axY[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={axZ[0]} y2={axZ[1]} stroke="#64748b" strokeWidth="1.2" />
        <text x={axX[0] + 6} y={axX[1] + 4} fill="#94a3b8" fontSize="11.5">x (előre)</text>
        <text x={axY[0] + 6} y={axY[1] + 4} fill="#94a3b8" fontSize="11.5">y (szél)</text>
        <text x={axZ[0] + 6} y={axZ[1] + 4} fill="#94a3b8" fontSize="11.5">z (magasság)</text>

        <path d={pathFrom(noWind)} fill="none" stroke="#64748b" strokeDasharray="5 4" strokeWidth="1.8" />
        <path d={pathFrom(shadowWind)} fill="none" stroke="#fb923c" strokeOpacity="0.45" strokeDasharray="3 3" strokeWidth="1.6" />
        <path d={pathFrom(withWind)} fill="none" stroke="#38bdf8" strokeWidth="2.6" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          T = {T.toFixed(1)} s · Oldalsodródás: Δy = ½ a_y T² = {drift.toFixed(1)} m
        </text>
        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          Szürke: szélcsendes pálya · Cián: 3D pálya oldalszélben · Narancs: földre vetített árnyék
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló képlettár */
export function ProjectileFormulaMapDiagram() {
  const cards = [
    { title: 'Vektoros pálya (vákuum)', body: 'r(t) = (v₀ cos α)t i + (y₀ + v₀ sin α·t − ½gt²) j', color: '#38bdf8' },
    { title: 'Csúcspont & magasság', body: 't_cs = (v₀ sin α)/g  ·  y_max = (v₀ sin α)² / (2g)', color: '#34d399' },
    { title: 'Repülési idő & lőtávolság', body: 'T = (2v₀ sin α)/g  ·  R = (v₀² sin 2α)/g  (max: 45°)', color: '#fbbf24' },
    { title: 'Descartes-parabola', body: 'y = (tan α)x − [g / (2v₀² cos²α)] x²', color: '#2dd4bf' },
    { title: 'Lineáris légellenállás', body: 'a = −kv − gj  →  x_max = (v₀ cos α)/k,  v_∞ = −g/k', color: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 13.2 fejezet képlettára — az ideális és fékezett lövedék mozgása</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {cards.map((c, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={c.title}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={c.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={c.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="12" fontWeight="600">{c.title}</text>
              <text x="205" y={y + 23} fill={c.color} fontSize="12" fontWeight="700" fontFamily="monospace">{c.body}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
