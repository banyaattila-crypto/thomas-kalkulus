import { useState } from 'react';

/* ============================================================================
   13.1. Vektorfüggvények — 8 interaktív 2D/3D és magyarázó SVG widget
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

/* ------------------------------------------------------------------ 1. Térgörbék és helyvektor 3D-ben */
export function HelixCurve3DWidget() {
  const [kind, setKind] = useState<'helix' | 'cone' | 'twisted'>('helix');
  const [tVal, setTVal] = useState(4.2);
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 158, 36, yaw, 20);

  const evalR = (t: number): [number, number, number] => {
    if (kind === 'helix') return [1.5 * Math.cos(t), 1.5 * Math.sin(t), -1.8 + 0.36 * t];
    if (kind === 'cone') return [0.18 * t * Math.cos(t), 0.18 * t * Math.sin(t), -1.8 + 0.36 * t];
    return [1.4 * Math.cos(t), 1.4 * Math.sin(t), 0.7 * Math.sin(2 * t)];
  };

  const tMax = kind === 'twisted' ? Math.PI * 2 : 10;
  const tClamped = Math.min(tVal, tMax);

  const curvePts: [number, number][] = [];
  const shadowPts: [number, number][] = [];
  const N = 120;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * tMax;
    const [x, y, z] = evalR(t);
    curvePts.push(P(x, y, z));
    shadowPts.push(P(x, y, -1.8));
  }

  const [px, py, pz] = evalR(tClamped);
  const O = P(0, 0, -1.8);
  const Pt = P(px, py, pz);
  const Ps = P(px, py, -1.8);
  const axX = P(2.4, 0, -1.8);
  const axY = P(0, 2.4, -1.8);
  const axZ = P(0, 0, 2.3);

  const labelFormula =
    kind === 'helix'
      ? 'r(t) = ⟨1,5 cos t, 1,5 sin t, 0,36 t⟩ (csavarvonal)'
      : kind === 'cone'
        ? 'r(t) = ⟨0,18 t cos t, 0,18 t sin t, 0,36 t⟩ (kúpos spirál)'
        : 'r(t) = ⟨1,4 cos t, 1,4 sin t, 0,7 sin 2t⟩ (hullámos zárt térgörbe)';

  return (
    <div className="widget">
      <div className="wtitle">A helyvektor végpontja rajzolja ki a térgörbét: r(t) = ⟨f(t), g(t), h(t)⟩</div>
      <div className="controls">
        <button className={kind === 'helix' ? 'active' : ''} onClick={() => setKind('helix')}>
          Csavarvonal
        </button>
        <button className={kind === 'cone' ? 'active' : ''} onClick={() => setKind('cone')}>
          Kúpos spirál
        </button>
        <button className={kind === 'twisted' ? 'active' : ''} onClick={() => setKind('twisted')}>
          Hullámos gyűrű
        </button>
        <label>
          t = {tClamped.toFixed(2)}
          <input
            type="range"
            min={0}
            max={tMax}
            step={0.05}
            value={tClamped}
            onChange={(e) => setTVal(+e.target.value)}
          />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 285" className="wsvg">
        {/* Tengelyek */}
        <line x1={O[0]} y1={O[1]} x2={axX[0]} y2={axX[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={axY[0]} y2={axY[1]} stroke="#64748b" strokeWidth="1.2" />
        <line x1={O[0]} y1={O[1]} x2={axZ[0]} y2={axZ[1]} stroke="#64748b" strokeWidth="1.2" />
        <text x={axX[0] - 8} y={axX[1] + 13} fill="#94a3b8" fontSize="12">x</text>
        <text x={axY[0] + 6} y={axY[1] + 5} fill="#94a3b8" fontSize="12">y</text>
        <text x={axZ[0] + 6} y={axZ[1] + 4} fill="#94a3b8" fontSize="12">z</text>

        {/* xy-síkbeli vetület (árnyék) */}
        <path d={pathFrom(shadowPts)} fill="none" stroke="#38bdf8" strokeOpacity="0.28" strokeDasharray="4 4" strokeWidth="1.4" />
        {/* Térgörbe */}
        <path d={pathFrom(curvePts)} fill="none" stroke="#38bdf8" strokeWidth="2.4" />

        {/* Függőleges vetítővonal */}
        <line x1={Ps[0]} y1={Ps[1]} x2={Pt[0]} y2={Pt[1]} stroke="#fbbf24" strokeOpacity="0.55" strokeDasharray="3 3" strokeWidth="1.3" />
        <circle cx={Ps[0]} cy={Ps[1]} r="3" fill="#fbbf24" opacity="0.6" />

        {/* Helyvektor r(t) */}
        <line x1={O[0]} y1={O[1]} x2={Pt[0]} y2={Pt[1]} stroke="#fb923c" strokeWidth="2.5" />
        <path d={arrowHead(O[0], O[1], Pt[0], Pt[1], 8)} fill="none" stroke="#fb923c" strokeWidth="2.4" />
        <circle cx={Pt[0]} cy={Pt[1]} r="4.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">{labelFormula}</text>
        <text x="16" y="42" fill="#fb923c" fontSize="12">
          r({tClamped.toFixed(2)}) = ⟨{px.toFixed(2)}; {py.toFixed(2)}; {(pz + 1.8).toFixed(2)}⟩
        </text>
        <text x="16" y="272" fill="#94a3b8" fontSize="11.5">
          Szaggatott cián: xy-vetület · Narancs nyíl: helyvektor az origóból a mozgó P(t) pontba
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Határérték és folytonosság */
export function VectorLimitWidget() {
  const [dt, setDt] = useState(0.55);
  const [removable, setRemovable] = useState(false);

  // 2D görbe: r(t) = <t, sin(t)/t> t -> 0-nál L = <0, 1>
  const mapX = (x: number) => 270 + x * 82;
  const mapY = (y: number) => 225 - y * 130;

  const pts: [number, number][] = [];
  for (let i = -80; i <= 80; i++) {
    const t = i * 0.032;
    const y = Math.abs(t) < 1e-4 ? 1 : Math.sin(t) / t;
    pts.push([mapX(t), mapY(y)]);
  }

  const tNow = Math.abs(dt) < 0.01 ? 0.01 : dt;
  const yNow = Math.sin(tNow) / tNow;
  const O: [number, number] = [mapX(0), mapY(0)];
  const L: [number, number] = [mapX(0), mapY(1)];
  const P: [number, number] = [mapX(tNow), mapY(yNow)];

  return (
    <div className="widget">
      <div className="wtitle">Komponensenkénti határérték: r(t) = ⟨t, (sin t)/t⟩ → L = ⟨0, 1⟩, ha t → 0</div>
      <div className="controls">
        <label>
          t = {tNow.toFixed(2)}
          <input type="range" min={-2.2} max={2.2} step={0.04} value={dt} onChange={(e) => setDt(+e.target.value)} />
        </label>
        <button className={!removable ? 'active' : ''} onClick={() => setRemovable(false)}>
          Határérték (t ≠ 0)
        </button>
        <button className={removable ? 'active' : ''} onClick={() => setRemovable(true)}>
          Ugrás r(0) = ⟨0; 0,4⟩
        </button>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {/* Rács & tengelyek */}
        <line x1="40" y1={mapY(0)} x2="500" y2={mapY(0)} stroke="#475569" strokeWidth="1.2" />
        <line x1={mapX(0)} y1="25" x2={mapX(0)} y2="245" stroke="#475569" strokeWidth="1.2" />
        <line x1="40" y1={mapY(1)} x2="500" y2={mapY(1)} stroke="#34d399" strokeOpacity="0.3" strokeDasharray="4 4" />
        <text x="504" y={mapY(0) + 4} fill="#94a3b8" fontSize="11.5">x</text>
        <text x={mapX(0) + 6} y="34" fill="#94a3b8" fontSize="11.5">y</text>

        {/* Görbe */}
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.3" />

        {/* Határérték-vektor L */}
        <line x1={O[0]} y1={O[1]} x2={L[0]} y2={L[1]} stroke="#34d399" strokeWidth="2.5" strokeDasharray="5 3" />
        <path d={arrowHead(O[0], O[1], L[0], L[1], 7)} fill="none" stroke="#34d399" strokeWidth="2.2" />

        {/* Lyuk a (0,1) pontban */}
        <circle cx={L[0]} cy={L[1]} r="5" fill="#0f172a" stroke="#34d399" strokeWidth="2.2" />
        {removable && (
          <>
            <circle cx={mapX(0)} cy={mapY(0.4)} r="5" fill="#f87171" />
            <text x={mapX(0) + 10} y={mapY(0.4) + 4} fill="#f87171" fontSize="11.5">r(0) = ⟨0; 0,4⟩ ≠ L (nem folytonos!)</text>
          </>
        )}

        {/* Aktuális r(t) vektor és különbségvektor */}
        <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke="#fb923c" strokeWidth="2.4" />
        <path d={arrowHead(O[0], O[1], P[0], P[1], 7)} fill="none" stroke="#fb923c" strokeWidth="2.2" />
        <line x1={L[0]} y1={L[1]} x2={P[0]} y2={P[1]} stroke="#fbbf24" strokeWidth="1.6" strokeDasharray="3 3" />
        <circle cx={P[0]} cy={P[1]} r="4.5" fill="#fbbf24" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          r({tNow.toFixed(2)}) = ⟨{tNow.toFixed(2)}; {yNow.toFixed(3)}⟩ · |r(t) − L| = {Math.hypot(tNow, yNow - 1).toFixed(3)}
        </text>
        <text x="16" y="255" fill="#94a3b8" fontSize="11.5">
          Ahogy t → 0, a sárga |r(t) − L| távolság 0-hoz tart, mert mindkét komponens a határértékéhez tart.
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Sebesség és gyorsulás 3D-ben */
export function VelocityAccel3DWidget() {
  const [t, setT] = useState(1.2);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 155, 38, yaw, 20);

  // r(t) = <1.6 cos t, 1.6 sin t, 0.35 t - 1.2>
  // v(t) = <-1.6 sin t, 1.6 cos t, 0.35>
  // a(t) = <-1.6 cos t, -1.6 sin t, 0>
  const r = (u: number): [number, number, number] => [1.6 * Math.cos(u), 1.6 * Math.sin(u), 0.35 * u - 1.2];
  const v = (u: number): [number, number, number] => [-1.6 * Math.sin(u), 1.6 * Math.cos(u), 0.35];
  const a = (u: number): [number, number, number] => [-1.6 * Math.cos(u), -1.6 * Math.sin(u), 0];

  const pts: [number, number][] = [];
  for (let i = 0; i <= 100; i++) {
    const u = (i / 100) * 7.5;
    pts.push(P(...r(u)));
  }

  const [rx, ry, rz] = r(t);
  const [vx, vy, vz] = v(t);
  const [ax, ay, az] = a(t);
  const speed = Math.hypot(vx, vy, vz);

  const Pt = P(rx, ry, rz);
  const Pv = P(rx + vx * 0.75, ry + vy * 0.75, rz + vz * 0.75);
  const Pa = P(rx + ax * 0.75, ry + ay * 0.75, rz + az * 0.75);
  const Tan1 = P(rx - vx * 0.9, ry - vy * 0.9, rz - vz * 0.9);
  const Tan2 = P(rx + vx * 1.1, ry + vy * 1.1, rz + vz * 1.1);

  return (
    <div className="widget">
      <div className="wtitle">Sebességvektor v(t) = r′(t) (érintő irány) és gyorsulás a(t) = r″(t) (befelé mutat!)</div>
      <div className="controls">
        <label>
          t = {t.toFixed(2)}
          <input type="range" min={0} max={7.2} step={0.05} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 280" className="wsvg">
        {/* Csavarvonal tengelye */}
        <line x1={P(0, 0, -1.5)[0]} y1={P(0, 0, -1.5)[1]} x2={P(0, 0, 1.8)[0]} y2={P(0, 0, 1.8)[1]} stroke="#475569" strokeDasharray="4 4" strokeWidth="1.2" />
        {/* Görbe */}
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.3" />
        {/* Érintőegyenes */}
        <line x1={Tan1[0]} y1={Tan1[1]} x2={Tan2[0]} y2={Tan2[1]} stroke="#34d399" strokeOpacity="0.4" strokeDasharray="4 3" strokeWidth="1.4" />

        {/* Sebességvektor v(t) */}
        <line x1={Pt[0]} y1={Pt[1]} x2={Pv[0]} y2={Pv[1]} stroke="#34d399" strokeWidth="2.7" />
        <path d={arrowHead(Pt[0], Pt[1], Pv[0], Pv[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.5" />
        <text x={Pv[0] + 6} y={Pv[1] - 4} fill="#34d399" fontSize="12.5" fontWeight="700">v(t)</text>

        {/* Gyorsulásvektor a(t) */}
        <line x1={Pt[0]} y1={Pt[1]} x2={Pa[0]} y2={Pa[1]} stroke="#f87171" strokeWidth="2.7" />
        <path d={arrowHead(Pt[0], Pt[1], Pa[0], Pa[1], 8)} fill="none" stroke="#f87171" strokeWidth="2.5" />
        <text x={Pa[0] + 6} y={Pa[1] + 12} fill="#f87171" fontSize="12.5" fontWeight="700">a(t)</text>

        <circle cx={Pt[0]} cy={Pt[1]} r="4.8" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#34d399" fontSize="12">
          v(t) = ⟨{vx.toFixed(2)}; {vy.toFixed(2)}; {vz.toFixed(2)}⟩ · |v(t)| = {speed.toFixed(2)} (állandó!)
        </text>
        <text x="16" y="42" fill="#f87171" fontSize="12">
          a(t) = ⟨{ax.toFixed(2)}; {ay.toFixed(2)}; {az.toFixed(2)}⟩ · v · a = {(vx * ax + vy * ay + vz * az).toFixed(2)}
        </text>
        <text x="16" y="268" fill="#94a3b8" fontSize="11.5">
          Zöld szaggatott: érintőegyenes · Piros a(t) mindig vízszintesen a csavarvonal tengelye felé húz.
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Deriválási szabályok vizuális kártya */
export function DerivRulesDiagram() {
  const rows = [
    { name: 'Skalárszoros', expr: '(c · u)′ = c · u′', color: '#38bdf8', note: 'állandó kiemelhető' },
    { name: 'Skalárfüggvény × vektor', expr: '(f(t) · u(t))′ = f′u + fu′', color: '#2dd4bf', note: 'klasszikus szorzatszabály' },
    { name: 'Skalárszorzat', expr: '(u · v)′ = u′ · v + u · v′', color: '#34d399', note: 'eredménye skalárfüggvény!' },
    { name: 'Vektoriális szorzat', expr: '(u × v)′ = u′ × v + u × v′', color: '#fb923c', note: 'SORREND NEM CSERÉLHETŐ!' },
    { name: 'Láncszabály', expr: '(r(g(t)))′ = g′(t) · r′(g(t))', color: '#fbbf24', note: 'átparaméterezés sebessége' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">Vektorfüggvények deriválási szabályai — egy pillantásra</div>
      <svg viewBox="0 0 540 240" className="wsvg">
        {rows.map((row, idx) => {
          const y = 14 + idx * 44;
          return (
            <g key={row.name}>
              <rect x="14" y={y} width="512" height="36" rx="7" fill="#0f172a" stroke={row.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="36" rx="3" fill={row.color} />
              <text x="30" y={y + 22} fill="#e2e8f0" fontSize="12" fontWeight="600">{row.name}</text>
              <text x="195" y={y + 23} fill={row.color} fontSize="13.5" fontWeight="700" fontFamily="monospace">{row.expr}</text>
              <text x="515" y={y + 22} textAnchor="end" fill="#94a3b8" fontSize="11">{row.note}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Állandó hosszúságú vektor (gömbfelületi mozgás) */
export function SphereMotion3DWidget() {
  const [t, setT] = useState(0.85);
  const [yaw, setYaw] = useState(28);
  const P = makeProj(270, 148, 72, yaw, 20);

  // R = 1.5 sugarú gömbön futó görbe:
  // r(t) = 1.5 * <cos(t) cos(0.5 t), sin(t) cos(0.5 t), sin(0.5 t)>
  const R = 1.45;
  const r = (u: number): [number, number, number] => [
    R * Math.cos(u) * Math.cos(0.5 * u),
    R * Math.sin(u) * Math.cos(0.5 * u),
    R * Math.sin(0.5 * u),
  ];
  const v = (u: number): [number, number, number] => {
    const c1 = Math.cos(u), s1 = Math.sin(u), c2 = Math.cos(0.5 * u), s2 = Math.sin(0.5 * u);
    return [
      R * (-s1 * c2 - 0.5 * c1 * s2),
      R * (c1 * c2 - 0.5 * s1 * s2),
      R * (0.5 * c2),
    ];
  };

  // Gömb drótváz (szélességi és hosszúsági körök)
  const sphereLines: string[] = [];
  for (const lat of [-0.9, -0.45, 0, 0.45, 0.9]) {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const phi = (i / 40) * Math.PI * 2;
      pts.push(P(R * Math.cos(lat) * Math.cos(phi), R * Math.cos(lat) * Math.sin(phi), R * Math.sin(lat)));
    }
    sphereLines.push(pathFrom(pts));
  }
  for (let k = 0; k < 6; k++) {
    const phi = (k / 6) * Math.PI;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const th = (i / 40) * Math.PI * 2;
      pts.push(P(R * Math.cos(th) * Math.cos(phi), R * Math.cos(th) * Math.sin(phi), R * Math.sin(th)));
    }
    sphereLines.push(pathFrom(pts));
  }

  const pathPts: [number, number][] = [];
  for (let i = 0; i <= 120; i++) {
    pathPts.push(P(...r((i / 120) * Math.PI * 4)));
  }

  const [rx, ry, rz] = r(t);
  const [vx, vy, vz] = v(t);
  const dot = rx * vx + ry * vy + rz * vz;

  const O = P(0, 0, 0);
  const Pt = P(rx, ry, rz);
  const Pv = P(rx + vx * 0.65, ry + vy * 0.65, rz + vz * 0.65);

  return (
    <div className="widget">
      <div className="wtitle">Állandó hosszúságú vektorfüggvény: ha |r(t)| = R, akkor r(t) ⊥ r′(t) minden t-re!</div>
      <div className="controls">
        <label>
          t = {t.toFixed(2)}
          <input type="range" min={0} max={6.28} step={0.05} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 285" className="wsvg">
        {sphereLines.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#64748b" strokeOpacity="0.24" strokeWidth="1" />
        ))}
        <path d={pathFrom(pathPts)} fill="none" stroke="#38bdf8" strokeWidth="2.1" />

        {/* Helyvektor r(t) */}
        <line x1={O[0]} y1={O[1]} x2={Pt[0]} y2={Pt[1]} stroke="#fb923c" strokeWidth="2.6" />
        <path d={arrowHead(O[0], O[1], Pt[0], Pt[1], 8)} fill="none" stroke="#fb923c" strokeWidth="2.4" />
        {/* Érintő/sebesség vektor r'(t) */}
        <line x1={Pt[0]} y1={Pt[1]} x2={Pv[0]} y2={Pv[1]} stroke="#34d399" strokeWidth="2.6" />
        <path d={arrowHead(Pt[0], Pt[1], Pv[0], Pv[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.4" />

        <circle cx={O[0]} cy={O[1]} r="3.5" fill="#94a3b8" />
        <circle cx={Pt[0]} cy={Pt[1]} r="4.8" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          |r(t)| = {Math.hypot(rx, ry, rz).toFixed(2)} (állandó gömbsugár)
        </text>
        <text x="16" y="42" fill="#34d399" fontSize="12">
          r(t) · r′(t) = {Math.abs(dot) < 1e-9 ? '0,000' : dot.toFixed(3)} → mindig 90°!
        </text>
        <text x="16" y="272" fill="#94a3b8" fontSize="11.5">
          Narancs: sugárirányú r(t) · Zöld: a gömbhöz simuló érintővektor r′(t)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Integrálás és kezdetiérték-probléma */
export function VectorIntegralIVPWidget() {
  const [vx0, setVx0] = useState(2.2);
  const [vy0, setVy0] = useState(2.6);
  const [y0, setY0] = useState(0.5);

  // a(t) = <0, -1.6> -> v(t) = <vx0, vy0 - 1.6 t> -> r(t) = <vx0 t, y0 + vy0 t - 0.8 t^2>
  const mapX = (x: number) => 55 + x * 46;
  const mapY = (y: number) => 225 - y * 44;

  const pts: [number, number][] = [];
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * 4.2;
    const x = vx0 * t;
    const y = y0 + vy0 * t - 0.8 * t * t;
    if (y >= -0.4 && x <= 10.2) pts.push([mapX(x), mapY(y)]);
  }

  const P0: [number, number] = [mapX(0), mapY(y0)];
  const Pv0: [number, number] = [mapX(vx0 * 0.65), mapY(y0 + vy0 * 0.65)];

  return (
    <div className="widget">
      <div className="wtitle">Kezdetiérték-probléma: ugyanaz az a(t) = ⟨0; −1,6⟩ gyorsulás, más C₁, C₂ integrálási állandók!</div>
      <div className="controls">
        <label>
          vₓ(0) = {vx0.toFixed(1)}
          <input type="range" min={0.6} max={3.5} step={0.1} value={vx0} onChange={(e) => setVx0(+e.target.value)} />
        </label>
        <label>
          vᵧ(0) = {vy0.toFixed(1)}
          <input type="range" min={0.5} max={3.6} step={0.1} value={vy0} onChange={(e) => setVy0(+e.target.value)} />
        </label>
        <label>
          y(0) = {y0.toFixed(1)}
          <input type="range" min={0} max={2.5} step={0.1} value={y0} onChange={(e) => setY0(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 260" className="wsvg">
        <line x1="35" y1={mapY(0)} x2="520" y2={mapY(0)} stroke="#475569" strokeWidth="1.2" />
        <line x1={mapX(0)} y1="20" x2={mapX(0)} y2="245" stroke="#475569" strokeWidth="1.2" />

        {/* Pályagörbe */}
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.6" />

        {/* Kezdeti sebességvektor v(0) */}
        <line x1={P0[0]} y1={P0[1]} x2={Pv0[0]} y2={Pv0[1]} stroke="#34d399" strokeWidth="2.5" />
        <path d={arrowHead(P0[0], P0[1], Pv0[0], Pv0[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.4" />
        <circle cx={P0[0]} cy={P0[1]} r="4.5" fill="#fbbf24" />
        <text x={Pv0[0] + 6} y={Pv0[1] - 4} fill="#34d399" fontSize="12" fontWeight="600">v(0) = C₁</text>

        {/* Gyorsulás nyíl a sarokban */}
        <line x1="475" y1="45" x2="475" y2="90" stroke="#f87171" strokeWidth="2.4" />
        <path d={arrowHead(475, 45, 475, 90, 7)} fill="none" stroke="#f87171" strokeWidth="2.2" />
        <text x="483" y="72" fill="#f87171" fontSize="11.5" fontWeight="600">a(t)</text>

        <text x="72" y="26" fill="#e2e8f0" fontSize="12">
          r(t) = ⟨{vx0.toFixed(1)}t ; {y0.toFixed(1)} + {vy0.toFixed(1)}t − 0,8t²⟩
        </text>
        <text x="72" y="250" fill="#94a3b8" fontSize="11.5">
          Az első integráláskor C₁ = v(0), a másodiknál C₂ = r(0) vektor-állandó rögzíti az egyetlen pályát.
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Felületek metszésgörbéje 3D-ben */
export function SurfaceIntersection3DWidget() {
  const [t, setT] = useState(0.9);
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 158, 38, yaw, 22);

  // Henger x^2 + y^2 = 1.6^2 és sík z = 1.2 - 0.55 x - 0.35 y
  const R = 1.5;
  const zPlane = (x: number, y: number) => 0.5 - 0.5 * x - 0.3 * y;

  const cylCircles: string[] = [];
  for (const zv of [-1.4, 0, 1.5]) {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      pts.push(P(R * Math.cos(a), R * Math.sin(a), zv));
    }
    cylCircles.push(pathFrom(pts));
  }
  const cylGens: string[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    cylGens.push(pathFrom([P(R * Math.cos(a), R * Math.sin(a), -1.4), P(R * Math.cos(a), R * Math.sin(a), 1.5)]));
  }

  // Sík kerete
  const planeQuad = pathFrom([
    P(-2.1, -2.1, zPlane(-2.1, -2.1)),
    P(2.1, -2.1, zPlane(2.1, -2.1)),
    P(2.1, 2.1, zPlane(2.1, 2.1)),
    P(-2.1, 2.1, zPlane(-2.1, 2.1)),
    P(-2.1, -2.1, zPlane(-2.1, -2.1)),
  ]);

  // Metszésgörbe (ellipszis a térben)
  const interPts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const x = R * Math.cos(a);
    const y = R * Math.sin(a);
    interPts.push(P(x, y, zPlane(x, y)));
  }

  const px = R * Math.cos(t);
  const py = R * Math.sin(t);
  const pz = zPlane(px, py);
  const Pt = P(px, py, pz);

  return (
    <div className="widget">
      <div className="wtitle">Henger és ferde sík metszésgörbéje: r(t) = ⟨R cos t, R sin t, c − a cos t − b sin t⟩</div>
      <div className="controls">
        <label>
          t = {t.toFixed(2)}
          <input type="range" min={0} max={6.28} step={0.05} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 285" className="wsvg">
        {/* Henger drótváz */}
        {cylCircles.map((d, i) => (
          <path key={`c${i}`} d={d} fill="none" stroke="#60a5fa" strokeOpacity="0.32" strokeWidth="1.1" />
        ))}
        {cylGens.map((d, i) => (
          <path key={`g${i}`} d={d} fill="none" stroke="#60a5fa" strokeOpacity="0.26" strokeWidth="1" />
        ))}

        {/* Ferde sík */}
        <path d={planeQuad} fill="#2dd4bf" fillOpacity="0.1" stroke="#2dd4bf" strokeOpacity="0.45" strokeWidth="1.3" />

        {/* Metszésgörbe */}
        <path d={pathFrom(interPts)} fill="none" stroke="#fbbf24" strokeWidth="2.8" />
        <circle cx={Pt[0]} cy={Pt[1]} r="5" fill="#fb923c" stroke="#0f172a" strokeWidth="1.5" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          Két felület metszete → 1D térgörbe (paraméterezés: x = R cos t, y = R sin t, z a síkból)
        </text>
        <text x="16" y="272" fill="#94a3b8" fontSize="11.5">
          Kék: körhenger · Teal: ferde sík · Arany: a közös metszés-ellipszis
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló térkép: r(t) <-> v(t) <-> a(t) */
export function VectorCalcMapDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">A 13.1 fejezet térképe: differenciálás, integrálás és simaság</div>
      <svg viewBox="0 0 540 235" className="wsvg">
        {/* Három fő doboz */}
        <rect x="24" y="34" width="138" height="72" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" />
        <text x="93" y="59" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="700">Helyvektor r(t)</text>
        <text x="93" y="79" textAnchor="middle" fill="#cbd5e1" fontSize="11.5">⟨f(t), g(t), h(t)⟩</text>
        <text x="93" y="96" textAnchor="middle" fill="#94a3b8" fontSize="10.5">térgörbe pontjai</text>

        <rect x="201" y="34" width="138" height="72" rx="10" fill="#0f172a" stroke="#34d399" strokeWidth="1.8" />
        <text x="270" y="59" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="700">Sebesség v(t)</text>
        <text x="270" y="79" textAnchor="middle" fill="#cbd5e1" fontSize="11.5">r′(t) · nagysága |v|</text>
        <text x="270" y="96" textAnchor="middle" fill="#94a3b8" fontSize="10.5">érintő + mozgásirány</text>

        <rect x="378" y="34" width="138" height="72" rx="10" fill="#0f172a" stroke="#f87171" strokeWidth="1.8" />
        <text x="447" y="59" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="700">Gyorsulás a(t)</text>
        <text x="447" y="79" textAnchor="middle" fill="#cbd5e1" fontSize="11.5">v′(t) = r″(t)</text>
        <text x="447" y="96" textAnchor="middle" fill="#94a3b8" fontSize="10.5">irány + tempó változás</text>

        {/* Nyilak felül (deriválás) */}
        <line x1="164" y1="54" x2="198" y2="54" stroke="#fbbf24" strokeWidth="2.2" />
        <path d={arrowHead(164, 54, 198, 54, 6)} fill="none" stroke="#fbbf24" strokeWidth="2" />
        <text x="181" y="46" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="600">d/dt</text>

        <line x1="341" y1="54" x2="375" y2="54" stroke="#fbbf24" strokeWidth="2.2" />
        <path d={arrowHead(341, 54, 375, 54, 6)} fill="none" stroke="#fbbf24" strokeWidth="2" />
        <text x="358" y="46" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="600">d/dt</text>

        {/* Nyilak alul (integrálás) */}
        <line x1="198" y1="86" x2="164" y2="86" stroke="#2dd4bf" strokeWidth="2.2" />
        <path d={arrowHead(198, 86, 164, 86, 6)} fill="none" stroke="#2dd4bf" strokeWidth="2" />
        <text x="181" y="101" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="600">∫ + C₂</text>

        <line x1="375" y1="86" x2="341" y2="86" stroke="#2dd4bf" strokeWidth="2.2" />
        <path d={arrowHead(375, 86, 341, 86, 6)} fill="none" stroke="#2dd4bf" strokeWidth="2" />
        <text x="358" y="101" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="600">∫ + C₁</text>

        {/* Alsó két emlékeztető kártya */}
        <rect x="24" y="132" width="236" height="86" rx="9" fill="#0f172a" stroke="#fb923c" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="38" y="155" fill="#fb923c" fontSize="12.5" fontWeight="700">Állandó hosszúság tétele</text>
        <text x="38" y="176" fill="#cbd5e1" fontSize="11.5">|r(t)| = c  ⇔  r(t) · r′(t) = 0</text>
        <text x="38" y="196" fill="#94a3b8" fontSize="11">Gömbfelületen a sebesség mindig</text>
        <text x="38" y="210" fill="#94a3b8" fontSize="11">merőleges a sugárvektorra.</text>

        <rect x="280" y="132" width="236" height="86" rx="9" fill="#0f172a" stroke="#60a5fa" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="294" y="155" fill="#60a5fa" fontSize="12.5" fontWeight="700">Sima görbe vs. csúcspont</text>
        <text x="294" y="176" fill="#cbd5e1" fontSize="11.5">Sima: r′(t) folytonos és r′(t) ≠ 0</text>
        <text x="294" y="196" fill="#94a3b8" fontSize="11">Ha r′(t₀) = 0, a részecske megáll,</text>
        <text x="294" y="210" fill="#94a3b8" fontSize="11">és hirtelen irányt válthat (csúcspont).</text>
      </svg>
    </div>
  );
}
