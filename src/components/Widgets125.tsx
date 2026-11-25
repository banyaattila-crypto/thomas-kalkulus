import { useState } from 'react';

/* ============================================================================
   12.5. Egyenesek és síkok a térben — 8 interaktív 3D SVG widget
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

function Arrow({ x1, y1, x2, y2, color, width = 2.6 }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  if (Math.hypot(x2 - x1, y2 - y1) < 3) return null;
  const h1x = x2 - Math.cos(a - 0.42) * 9;
  const h1y = y2 - Math.sin(a - 0.42) * 9;
  const h2x = x2 - Math.cos(a + 0.42) * 9;
  const h2y = y2 - Math.sin(a + 0.42) * 9;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${h1x},${h1y} ${h2x},${h2y}`} fill={color} />
    </g>
  );
}

/* ------------------------------------------------------------------ 1. Paraméteres 3D egyenes */
export function Line3DParamWidget() {
  const [t, setT] = useState(1.2);
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 145, 28, yaw, 22);

  // r(t) = (1, -1, 0.5) + t * <1, 1.5, 1>
  const r = (s: number): [number, number, number] => [1 + s, -1 + 1.5 * s, 0.5 + s];
  const o = P(0, 0, 0);
  const p0 = P(...r(0));
  const p1 = P(...r(1));
  const pt = P(...r(t));
  const lA = P(...r(-1.8));
  const lB = P(...r(2.6));
  const cur = r(t);

  return (
    <div className="widget">
      <div className="wtitle">Térbeli egyenes: r(t) = r₀ + t·v — egy pont + egy irányvektor</div>
      <div className="wcontrols">
        <label>Paraméter <b>t = {t.toFixed(1)}</b><input type="range" min={-1.5} max={2.4} step={0.1} value={t} onChange={(e) => setT(+e.target.value)} /></label>
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-30} max={110} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 235" className="plot">
        <line x1={o[0]} y1={o[1]} x2={P(4, 0, 0)[0]} y2={P(4, 0, 0)[1]} stroke="rgba(148,163,184,0.3)" />
        <line x1={o[0]} y1={o[1]} x2={P(0, 4, 0)[0]} y2={P(0, 4, 0)[1]} stroke="rgba(148,163,184,0.3)" />
        <line x1={o[0]} y1={o[1]} x2={P(0, 0, 4)[0]} y2={P(0, 0, 4)[1]} stroke="rgba(148,163,184,0.3)" />
        {/* Teljes egyenes */}
        <line x1={lA[0]} y1={lA[1]} x2={lB[0]} y2={lB[1]} stroke="#38bdf8" strokeWidth={2.2} strokeDasharray="5 4" />
        {/* r0 és v */}
        <Arrow x1={o[0]} y1={o[1]} x2={p0[0]} y2={p0[1]} color="#94a3b8" width={1.8} />
        <Arrow x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} color="#34d399" width={2.8} />
        <Arrow x1={o[0]} y1={o[1]} x2={pt[0]} y2={pt[1]} color="#fbbf24" width={2.4} />
        <circle cx={p0[0]} cy={p0[1]} r={4.5} fill="#38bdf8" />
        <circle cx={pt[0]} cy={pt[1]} r={5.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.4} />
        <text x={p0[0] + 8} y={p0[1] + 14} fill="#7dd3fc" fontSize={11.5} fontWeight={700}>P₀ (t=0)</text>
        <text x={pt[0] + 8} y={pt[1] - 6} fill="#fbbf24" fontSize={11.5} fontWeight={700}>P({t.toFixed(1)})</text>
      </svg>
      <div className="readout">
        Aktuális pont: <b>P({cur[0].toFixed(1)}; {cur[1].toFixed(1)}; {cur[2].toFixed(1)})</b> · ha 0 ≤ t ≤ 1, pontosan
        egy <b>szakaszt</b> kapunk!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Kitérő vs. metsző egyenesek 3D-ben */
export function SkewLines3DWidget() {
  const [h, setH] = useState(1.8);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 145, 30, yaw, 22);

  // L1: (t, 0, 0) (x-tengely), L2: (0, s, h) (y-nal párhuzamos h magasságban)
  const l1a = P(-3, 0, 0);
  const l1b = P(3, 0, 0);
  const l2a = P(0, -3, h);
  const l2b = P(0, 3, h);
  const p1 = P(0, 0, 0);
  const p2 = P(0, 0, h);
  const hit = Math.abs(h) < 0.05;

  return (
    <div className="widget">
      <div className="wtitle">Metsző vagy kitérő? — Forgasd el a 3D teret, és nézd meg a két egyenes közti rést!</div>
      <div className="wcontrols">
        <label>L₂ magassága <b>h = {h.toFixed(1)}</b><input type="range" min={0} max={2.8} step={0.2} value={h} onChange={(e) => setH(+e.target.value)} /></label>
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-40} max={120} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 225" className="plot">
        <line x1={l1a[0]} y1={l1a[1]} x2={l1b[0]} y2={l1b[1]} stroke="#38bdf8" strokeWidth={3} />
        <line x1={l2a[0]} y1={l2a[1]} x2={l2b[0]} y2={l2b[1]} stroke="#34d399" strokeWidth={3} />
        <line x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke="#fb923c" strokeWidth={2.4} strokeDasharray="4 3" />
        <circle cx={p1[0]} cy={p1[1]} r={4.5} fill="#fbbf24" />
        <circle cx={p2[0]} cy={p2[1]} r={4.5} fill="#fbbf24" />
        <text x={l1b[0] + 6} y={l1b[1] + 4} fill="#38bdf8" fontSize={12} fontWeight={700}>L₁ (z = 0)</text>
        <text x={l2b[0] + 6} y={l2b[1] + 4} fill="#34d399" fontSize={12} fontWeight={700}>L₂ (z = {h.toFixed(1)})</text>
        <text x={24} y={26} fill={hit ? '#34d399' : '#fb923c'} fontSize={13} fontWeight={700}>
          {hit ? 'METSZŐ egyenesek (közös pont: (0; 0; 0))' : `KITÉRŐ egyenesek! (távolságuk d = ${h.toFixed(1)})`}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Pont–egyenes távolság 3D-ben */
export function PointLine3DDistWidget() {
  const [sz, setSz] = useState(2.2);
  const P = makeProj(240, 160, 30, 32, 20);

  // L: x-tengely, v = <3,0,0>, S = (1.5, 1.2, sz)
  const o = P(0, 0, 0);
  const pv = P(3, 0, 0);
  const ps = P(1.5, 1.2, sz);
  const foot = P(1.5, 0, 0);
  const d = Math.hypot(1.2, sz);

  return (
    <div className="widget">
      <div className="wtitle">Pont és egyenes távolsága 3D-ben: d = |PS × v| / |v|</div>
      <div className="wcontrols">
        <label>S magassága <b>z = {sz.toFixed(1)}</b><input type="range" min={0} max={3} step={0.2} value={sz} onChange={(e) => setSz(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 215" className="plot">
        <line x1={P(-1.5, 0, 0)[0]} y1={P(-1.5, 0, 0)[1]} x2={P(4.5, 0, 0)[0]} y2={P(4.5, 0, 0)[1]} stroke="#38bdf8" strokeWidth={2.2} strokeDasharray="5 4" />
        <Arrow x1={o[0]} y1={o[1]} x2={pv[0]} y2={pv[1]} color="#38bdf8" width={3} />
        <Arrow x1={o[0]} y1={o[1]} x2={ps[0]} y2={ps[1]} color="#34d399" width={2.6} />
        <line x1={ps[0]} y1={ps[1]} x2={foot[0]} y2={foot[1]} stroke="#fbbf24" strokeWidth={2.8} strokeDasharray="4 3" />
        <circle cx={ps[0]} cy={ps[1]} r={5} fill="#fbbf24" stroke="#fff" strokeWidth={1.3} />
        <text x={pv[0] + 8} y={pv[1] + 6} fill="#38bdf8" fontSize={12} fontWeight={700}>v</text>
        <text x={ps[0] + 8} y={ps[1] - 6} fill="#fbbf24" fontSize={12} fontWeight={700}>S</text>
        <text x={(ps[0] + foot[0]) / 2 + 8} y={(ps[1] + foot[1]) / 2} fill="#fbbf24" fontSize={12} fontWeight={700}>d = {d.toFixed(2)}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Sík és normálvektora 3D-ben */
export function PlaneNormal3DWidget() {
  const [A, setA] = useState(0.5);
  const [B, setB] = useState(0.4);
  const P = makeProj(270, 145, 28, 34, 22);

  // Sík: A x + B y + z = 1.5  =>  z = 1.5 - A x - B y
  const zPl = (x: number, y: number) => 1.5 - A * x - B * y;
  const r = 2.4;
  const corners: [number, number, number][] = [
    [-r, -r, zPl(-r, -r)],
    [r, -r, zPl(r, -r)],
    [r, r, zPl(r, r)],
    [-r, r, zPl(-r, r)],
  ];
  const poly = corners.map((c) => P(...c).map((v) => v.toFixed(1)).join(',')).join(' ');
  const p0 = P(0, 0, 1.5);
  const pn = P(A * 1.8, B * 1.8, 1.5 + 1.8);

  return (
    <div className="widget">
      <div className="wtitle">A sík és normálvektora: Ax + By + z = 1,5  ⇔  n = ⟨A, B, 1⟩</div>
      <div className="wcontrols">
        <label>A = <b>{A.toFixed(1)}</b><input type="range" min={-1} max={1} step={0.2} value={A} onChange={(e) => setA(+e.target.value)} /></label>
        <label>B = <b>{B.toFixed(1)}</b><input type="range" min={-1} max={1} step={0.2} value={B} onChange={(e) => setB(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 235" className="plot">
        <polygon points={poly} fill="rgba(56, 189, 248, 0.16)" stroke="#38bdf8" strokeWidth={1.8} />
        <Arrow x1={p0[0]} y1={p0[1]} x2={pn[0]} y2={pn[1]} color="#fbbf24" width={3.2} />
        <circle cx={p0[0]} cy={p0[1]} r={4.5} fill="#34d399" />
        <text x={pn[0] + 8} y={pn[1] - 4} fill="#fbbf24" fontSize={12.5} fontWeight={700}>
          n = ⟨{A.toFixed(1)}, {B.toFixed(1)}, 1⟩
        </text>
      </svg>
      <div className="readout">
        A normálvektor <b>n</b> mindig merőleges a sík minden irányára — ahogy döntöd n-et, vele dől az egész sík!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Egyenes és sík döféspontja */
export function LinePlanePierce3DWidget() {
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 145, 28, yaw, 22);

  // Sík: z = 1, Egyenes: r(t) = (-1, -1, -1) + t <1, 1, 1> => döféspont t = 2: (1, 1, 1)
  const r = 2.6;
  const poly = [
    [-r, -r, 1],
    [r, -r, 1],
    [r, r, 1],
    [-r, r, 1],
  ]
    .map((c) => P(c[0], c[1], c[2]).map((v) => v.toFixed(1)).join(','))
    .join(' ');

  const pBot = P(-1.2, -1.2, -1.2);
  const pHit = P(1, 1, 1);
  const pTop = P(2.4, 2.4, 2.4);

  return (
    <div className="widget">
      <div className="wtitle">Egyenes és sík döféspontja: helyettesítsd be x(t), y(t), z(t)-t a sík egyenletébe!</div>
      <div className="wcontrols">
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-30} max={110} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 220" className="plot">
        {/* Alsó (takart) szakasz */}
        <line x1={pBot[0]} y1={pBot[1]} x2={pHit[0]} y2={pHit[1]} stroke="#fb923c" strokeWidth={2.2} strokeDasharray="4 4" />
        {/* Sík */}
        <polygon points={poly} fill="rgba(52, 211, 153, 0.16)" stroke="#34d399" strokeWidth={1.6} />
        {/* Felső (látható) szakasz */}
        <line x1={pHit[0]} y1={pHit[1]} x2={pTop[0]} y2={pTop[1]} stroke="#fb923c" strokeWidth={2.8} />
        <circle cx={pHit[0]} cy={pHit[1]} r={6} fill="#fbbf24" stroke="#fff" strokeWidth={1.6} />
        <text x={pHit[0] + 10} y={pHit[1] - 6} fill="#fbbf24" fontSize={12} fontWeight={700}>Döféspont (t = 2)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Pont és sík távolsága */
export function PointPlaneDist3DWidget() {
  const [sz, setSz] = useState(4);
  // Sík: x + 2y + 2z = 6 => |n| = 3. Pont S = (2, 1, sz)
  const val = 2 + 2 * 1 + 2 * sz - 6; // 2*sz - 2
  const dist = Math.abs(val) / 3;

  return (
    <div className="widget">
      <div className="wtitle">Pont és sík távolsága: d = |Ax₁ + By₁ + Cz₁ − D| / √(A² + B² + C²)</div>
      <div className="wcontrols">
        <label>S(2; 1; z) pont z-koordinátája <b>z = {sz}</b><input type="range" min={-3} max={6} step={0.5} value={sz} onChange={(e) => setSz(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 130" className="plot">
        <rect x={14} y={16} width={512} height={98} rx={12} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={270} y={44} textAnchor="middle" fill="#7dd3fc" fontSize={13} fontWeight={700}>
          Sík: x + 2y + 2z = 6   (normálvektor n = ⟨1, 2, 2⟩, |n| = 3)
        </text>
        <text x={270} y={74} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>
          d = |2 + 2·1 + 2·({sz}) − 6| / 3 = |{val.toFixed(1)}| / 3 = {dist.toFixed(2)}
        </text>
        <text x={270} y={98} textAnchor="middle" fill={Math.abs(val) < 1e-6 ? '#34d399' : '#cbd5e1'} fontSize={11.5}>
          {Math.abs(val) < 1e-6 ? '✓ A pont pontosan a síkon fekszik (d = 0)!' : val > 0 ? 'A pont a sík +n oldalán van.' : 'A pont a sík −n oldalán van.'}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Kitérő egyenesek távolsága */
export function SkewDistanceDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">Bónusz képlet: két kitérő egyenes távolsága (vegyes szorzattal!)</div>
      <svg viewBox="0 0 540 120" className="plot">
        <rect x={14} y={14} width={512} height={92} rx={12} fill="rgba(52,211,153,0.09)" stroke="#34d399" strokeWidth={1.5} />
        <text x={270} y={42} textAnchor="middle" fill="#6ee7b7" fontSize={12.5} fontWeight={700}>
          Közös merőleges irány: n = v₁ × v₂
        </text>
        <text x={270} y={70} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>
          d = |P₁P₂ · (v₁ × v₂)| / |v₁ × v₂|
        </text>
        <text x={270} y={94} textAnchor="middle" fill="#94a3b8" fontSize={11}>
          (A P₁P₂ vektor vetülete a két egyenes közös normálvektorára!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. 12.5 nagy képlettár */
export function LinePlaneMasterDiagram() {
  const rows = [
    { k: 'Egyenes', f: 'r(t) = r₀ + t·v  (pont + irányvektor)', c: '#38bdf8' },
    { k: 'Sík', f: 'n · (r − r₀) = 0  ⇔  Ax + By + Cz = D', c: '#34d399' },
    { k: 'Pont–egyenes d', f: 'd = |PS × v| / |v|', c: '#fbbf24' },
    { k: 'Pont–sík d', f: 'd = |Ax₁ + By₁ + Cz₁ − D| / |n|', c: '#fb923c' },
    { k: 'Két sík metszete', f: 'Irányvektor: v = n₁ × n₂ · szög: cos θ = |n₁·n₂|/(|n₁||n₂|)', c: '#2dd4bf' },
  ];
  return (
    <div className="widget">
      <div className="wtitle">12.5 zsebkalauz: térbeli egyenesek és síkok egy pillantásra</div>
      <svg viewBox="0 0 540 192" className="plot">
        {rows.map((r, i) => {
          const y = 10 + i * 35;
          return (
            <g key={r.k}>
              <rect x={12} y={y} width={516} height={29} rx={7} fill="rgba(255,255,255,0.04)" stroke={r.c} strokeWidth={1.3} />
              <text x={22} y={y + 19} fill={r.c} fontSize={11.5} fontWeight={700}>{r.k}</text>
              <text x={148} y={y + 19} fill="#e2e8f0" fontSize={11.5}>{r.f}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
