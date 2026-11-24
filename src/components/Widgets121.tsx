import { useState } from 'react';

/* ============================================================================
   12.1. Háromdimenziós koordináta-rendszerek — 8 interaktív 3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

/** Egyszerű ortografikus 3D -> 2D vetítő jobbsodrású (x előre-balra, y jobbra, z fel) rendszerhez. */
function makeProj(cx: number, cy: number, scale: number, yawDeg: number, pitchDeg = 22) {
  const yaw = (yawDeg * Math.PI) / 180;
  const pit = (pitchDeg * Math.PI) / 180;
  const cyw = Math.cos(yaw);
  const syw = Math.sin(yaw);
  const cp = Math.cos(pit);
  const sp = Math.sin(pit);
  return (x: number, y: number, z: number): [number, number] => {
    // Forgatás z tengely körül, majd enyhe billentés
    const xr = -x * syw + y * cyw;
    const yr = x * cyw + y * syw;
    return [cx + xr * scale, cy + (yr * sp - z * cp) * scale];
  };
}

function Axes3D({ P, len = 4.2 }: { P: (x: number, y: number, z: number) => [number, number]; len?: number }) {
  const o = P(0, 0, 0);
  const ax = P(len, 0, 0);
  const axn = P(-len * 0.65, 0, 0);
  const ay = P(0, len, 0);
  const ayn = P(0, -len * 0.65, 0);
  const az = P(0, 0, len);
  const azn = P(0, 0, -len * 0.55);
  return (
    <g>
      <line x1={axn[0]} y1={axn[1]} x2={o[0]} y2={o[1]} stroke="rgba(148,163,184,0.28)" strokeDasharray="3 3" />
      <line x1={ayn[0]} y1={ayn[1]} x2={o[0]} y2={o[1]} stroke="rgba(148,163,184,0.28)" strokeDasharray="3 3" />
      <line x1={azn[0]} y1={azn[1]} x2={o[0]} y2={o[1]} stroke="rgba(148,163,184,0.28)" strokeDasharray="3 3" />
      <line x1={o[0]} y1={o[1]} x2={ax[0]} y2={ax[1]} stroke="#38bdf8" strokeWidth={1.8} />
      <line x1={o[0]} y1={o[1]} x2={ay[0]} y2={ay[1]} stroke="#34d399" strokeWidth={1.8} />
      <line x1={o[0]} y1={o[1]} x2={az[0]} y2={az[1]} stroke="#fbbf24" strokeWidth={1.8} />
      <text x={ax[0] + 6} y={ax[1] + 4} fill="#38bdf8" fontSize={12} fontWeight={700}>x</text>
      <text x={ay[0] + 6} y={ay[1] + 4} fill="#34d399" fontSize={12} fontWeight={700}>y</text>
      <text x={az[0] + 5} y={az[1] - 4} fill="#fbbf24" fontSize={12} fontWeight={700}>z</text>
    </g>
  );
}

/* ------------------------------------------------------------------ 1. Forgatható 3D pont és téglatest-vetület */
export function Space3DPointWidget() {
  const [x, setX] = useState(2);
  const [y, setY] = useState(3);
  const [z, setZ] = useState(2.5);
  const [yaw, setYaw] = useState(34);

  const P = makeProj(270, 145, 28, yaw, 24);
  const o = P(0, 0, 0);
  const px = P(x, 0, 0);
  const py = P(0, y, 0);
  const pz = P(0, 0, z);
  const pxy = P(x, y, 0);
  const pxz = P(x, 0, z);
  const pyz = P(0, y, z);
  const p = P(x, y, z);

  const dOrigin = Math.hypot(x, y, z);
  const oct =
    x === 0 || y === 0 || z === 0
      ? 'koordinátasíkon / tengelyen'
      : x > 0 && y > 0 && z > 0
        ? 'I. oktáns (+, +, +)'
        : `${x > 0 ? '+' : '−'}, ${y > 0 ? '+' : '−'}, ${z > 0 ? '+' : '−'} oktáns`;

  return (
    <div className="widget">
      <div className="wtitle">Interaktív, forgatható 3D koordináta-rendszer: P(x; y; z)</div>
      <div className="wcontrols">
        <label>
          x = <b>{x}</b>
          <input type="range" min={-3} max={3} step={0.5} value={x} onChange={(e) => setX(+e.target.value)} />
        </label>
        <label>
          y = <b>{y}</b>
          <input type="range" min={-3} max={3} step={0.5} value={y} onChange={(e) => setY(+e.target.value)} />
        </label>
        <label>
          z = <b>{z}</b>
          <input type="range" min={-3} max={3} step={0.5} value={z} onChange={(e) => setZ(+e.target.value)} />
        </label>
        <label>
          Forgatás <b>{yaw}°</b>
          <input type="range" min={-60} max={120} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 260" className="plot">
        {/* xy-sík alaprács */}
        {[-3, -2, -1, 1, 2, 3].map((k) => {
          const a1 = P(k, -3, 0);
          const a2 = P(k, 3, 0);
          const b1 = P(-3, k, 0);
          const b2 = P(3, k, 0);
          return (
            <g key={k} opacity={0.18}>
              <line x1={a1[0]} y1={a1[1]} x2={a2[0]} y2={a2[1]} stroke="#94a3b8" />
              <line x1={b1[0]} y1={b1[1]} x2={b2[0]} y2={b2[1]} stroke="#94a3b8" />
            </g>
          );
        })}
        <Axes3D P={P} />
        {/* Téglatest vetítővonalak */}
        <g stroke="rgba(148,163,184,0.55)" strokeDasharray="3 3" strokeWidth={1.2}>
          <line x1={px[0]} y1={px[1]} x2={pxy[0]} y2={pxy[1]} />
          <line x1={py[0]} y1={py[1]} x2={pxy[0]} y2={pxy[1]} />
          <line x1={pxy[0]} y1={pxy[1]} x2={p[0]} y2={p[1]} />
          <line x1={pz[0]} y1={pz[1]} x2={pxz[0]} y2={pxz[1]} />
          <line x1={pz[0]} y1={pz[1]} x2={pyz[0]} y2={pyz[1]} />
          <line x1={pxz[0]} y1={pxz[1]} x2={p[0]} y2={p[1]} />
          <line x1={pyz[0]} y1={pyz[1]} x2={p[0]} y2={p[1]} />
          <line x1={px[0]} y1={px[1]} x2={pxz[0]} y2={pxz[1]} />
          <line x1={py[0]} y1={py[1]} x2={pyz[0]} y2={pyz[1]} />
        </g>
        {/* Origóból P-be szakasz */}
        <line x1={o[0]} y1={o[1]} x2={p[0]} y2={p[1]} stroke="#fb923c" strokeWidth={2.3} />
        <circle cx={pxy[0]} cy={pxy[1]} r={3.5} fill="#2dd4bf" />
        <circle cx={p[0]} cy={p[1]} r={6} fill="#fbbf24" stroke="#fff" strokeWidth={1.6} />
        <text x={p[0] + 10} y={p[1] - 8} fill="#fbbf24" fontSize={12} fontWeight={700}>
          P({x}; {y}; {z})
        </text>
      </svg>
      <div className="readout">
        Helyzet: <b>{oct}</b> · Origótól mért távolság: <b>|OP| = √(x² + y² + z²) = {dOrigin.toFixed(2)}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Koordinátasíkok és metszésegyenes */
export function CoordinatePlanesWidget() {
  const [mode, setMode] = useState<'z' | 'x' | 'y' | 'line'>('z');
  const [val, setVal] = useState(2);
  const P = makeProj(270, 140, 28, 36, 22);

  const quad = (pts: [number, number, number][]) =>
    pts.map((q) => P(q[0], q[1], q[2]).map((v) => v.toFixed(1)).join(',')).join(' ');

  const r = 3;
  return (
    <div className="widget">
      <div className="wtitle">Egyenletek a térben: egy egyenlet = sík · két egyenlet = egyenes!</div>
      <div className="relbuttons chips">
        <button className={mode === 'z' ? 'on' : ''} onClick={() => setMode('z')}>z = c (vízszintes sík)</button>
        <button className={mode === 'x' ? 'on' : ''} onClick={() => setMode('x')}>x = a (függőleges sík)</button>
        <button className={mode === 'y' ? 'on' : ''} onClick={() => setMode('y')}>y = b (függőleges sík)</button>
        <button className={mode === 'line' ? 'on' : ''} onClick={() => setMode('line')}>x = 2 és y = c (egyenes)</button>
      </div>
      <div className="wcontrols">
        <label>
          Paraméter <b>c = {val}</b>
          <input type="range" min={-2.5} max={2.5} step={0.5} value={val} onChange={(e) => setVal(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 245" className="plot">
        <Axes3D P={P} />
        {mode === 'z' && (
          <polygon points={quad([[-r, -r, val], [r, -r, val], [r, r, val], [-r, r, val]])} fill="rgba(251,191,36,0.22)" stroke="#fbbf24" strokeWidth={1.6} />
        )}
        {mode === 'x' && (
          <polygon points={quad([[val, -r, -r], [val, r, -r], [val, r, r], [val, -r, r]])} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={1.6} />
        )}
        {mode === 'y' && (
          <polygon points={quad([[-r, val, -r], [r, val, -r], [r, val, r], [-r, val, r]])} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={1.6} />
        )}
        {mode === 'line' && (
          <>
            <polygon points={quad([[2, -r, -r], [2, r, -r], [2, r, r], [2, -r, r]])} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={1.2} />
            <polygon points={quad([[-r, val, -r], [r, val, -r], [r, val, r], [-r, val, r]])} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={1.2} />
            <line
              x1={P(2, val, -r)[0]}
              y1={P(2, val, -r)[1]}
              x2={P(2, val, r)[0]}
              y2={P(2, val, r)[1]}
              stroke="#fbbf24"
              strokeWidth={3.2}
            />
          </>
        )}
      </svg>
      <div className="readout">
        {mode === 'line'
          ? `Az x = 2 és y = ${val} síkok metszésvonala egy z-tengellyel párhuzamos függőleges egyenes!`
          : `Minden pont, amelynek ${mode}-koordinátája ${val}, erre a síkra esik — a másik két koordináta tetszőleges!`}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Kétszeres Pitagorasz-tétel 3D téglatestben */
export function DistanceBox3DWidget() {
  const [dx, setDx] = useState(3);
  const [dy, setDy] = useState(4);
  const [dz, setDz] = useState(2);

  const P = makeProj(240, 165, 28, 32, 22);
  const p1 = P(0, 0, 0);
  const px = P(dx, 0, 0);
  const pxy = P(dx, dy, 0);
  const p2 = P(dx, dy, dz);

  const baseDiag = Math.hypot(dx, dy);
  const spaceDiag = Math.hypot(dx, dy, dz);

  return (
    <div className="widget">
      <div className="wtitle">Kétszeres Pitagorasz-tétel: alapátló → testátló |P₁P₂|</div>
      <div className="wcontrols">
        <label>Δx = <b>{dx}</b><input type="range" min={1} max={4} step={0.5} value={dx} onChange={(e) => setDx(+e.target.value)} /></label>
        <label>Δy = <b>{dy}</b><input type="range" min={1} max={4} step={0.5} value={dy} onChange={(e) => setDy(+e.target.value)} /></label>
        <label>Δz = <b>{dz}</b><input type="range" min={1} max={4} step={0.5} value={dz} onChange={(e) => setDz(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 235" className="plot">
        {/* Téglatest élek */}
        <g stroke="rgba(148,163,184,0.35)" strokeWidth={1.2}>
          <line x1={p1[0]} y1={p1[1]} x2={px[0]} y2={px[1]} />
          <line x1={px[0]} y1={px[1]} x2={pxy[0]} y2={pxy[1]} />
          <line x1={p1[0]} y1={p1[1]} x2={P(0, dy, 0)[0]} y2={P(0, dy, 0)[1]} />
          <line x1={P(0, dy, 0)[0]} y1={P(0, dy, 0)[1]} x2={pxy[0]} y2={pxy[1]} />
          <line x1={P(0, 0, dz)[0]} y1={P(0, 0, dz)[1]} x2={P(dx, 0, dz)[0]} y2={P(dx, 0, dz)[1]} />
          <line x1={P(dx, 0, dz)[0]} y1={P(dx, 0, dz)[1]} x2={p2[0]} y2={p2[1]} />
          <line x1={P(0, 0, dz)[0]} y1={P(0, 0, dz)[1]} x2={P(0, dy, dz)[0]} y2={P(0, dy, dz)[1]} />
          <line x1={P(0, dy, dz)[0]} y1={P(0, dy, dz)[1]} x2={p2[0]} y2={p2[1]} />
          <line x1={p1[0]} y1={p1[1]} x2={P(0, 0, dz)[0]} y2={P(0, 0, dz)[1]} />
          <line x1={px[0]} y1={px[1]} x2={P(dx, 0, dz)[0]} y2={P(dx, 0, dz)[1]} />
          <line x1={P(0, dy, 0)[0]} y1={P(0, dy, 0)[1]} x2={P(0, dy, dz)[0]} y2={P(0, dy, dz)[1]} />
        </g>
        {/* 1. derékszögű háromszög (alap): Δx, Δy, alapátló */}
        <line x1={p1[0]} y1={p1[1]} x2={px[0]} y2={px[1]} stroke="#38bdf8" strokeWidth={2.5} />
        <line x1={px[0]} y1={px[1]} x2={pxy[0]} y2={pxy[1]} stroke="#34d399" strokeWidth={2.5} />
        <line x1={p1[0]} y1={p1[1]} x2={pxy[0]} y2={pxy[1]} stroke="#2dd4bf" strokeWidth={2.4} strokeDasharray="5 3" />
        {/* 2. derékszögű háromszög: alapátló, Δz, testátló */}
        <line x1={pxy[0]} y1={pxy[1]} x2={p2[0]} y2={p2[1]} stroke="#fb923c" strokeWidth={2.5} />
        <line x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke="#fbbf24" strokeWidth={3} />
        <circle cx={p1[0]} cy={p1[1]} r={4.5} fill="#38bdf8" />
        <circle cx={p2[0]} cy={p2[1]} r={5} fill="#fbbf24" stroke="#fff" strokeWidth={1.4} />
        <text x={p1[0] - 24} y={p1[1] + 16} fill="#7dd3fc" fontSize={12} fontWeight={700}>P₁</text>
        <text x={p2[0] + 8} y={p2[1] - 6} fill="#fbbf24" fontSize={12} fontWeight={700}>P₂</text>
      </svg>
      <div className="readout">
        1. Alapátló: √(Δx² + Δy²) = <b>{baseDiag.toFixed(2)}</b> · 2. Testátló: √({baseDiag.toFixed(2)}² + {dz}²) ={' '}
        <b>{spaceDiag.toFixed(2)}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Forgatható 3D drótváz-gömb */
export function Sphere3DWidget() {
  const [x0, setX0] = useState(1);
  const [y0, setY0] = useState(0);
  const [z0, setZ0] = useState(0.5);
  const [a, setA] = useState(2);
  const P = makeProj(270, 140, 28, 35, 22);

  const ring = (pts: [number, number, number][]) =>
    pts.map((q, i) => `${i ? 'L' : 'M'}${P(q[0], q[1], q[2]).map((v) => v.toFixed(1)).join(',')}`).join(' ') + ' Z';

  const N = 48;
  const eqPts: [number, number, number][] = [];
  const m1Pts: [number, number, number][] = [];
  const m2Pts: [number, number, number][] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    eqPts.push([x0 + a * Math.cos(t), y0 + a * Math.sin(t), z0]);
    m1Pts.push([x0 + a * Math.cos(t), y0, z0 + a * Math.sin(t)]);
    m2Pts.push([x0, y0 + a * Math.cos(t), z0 + a * Math.sin(t)]);
  }
  const c2 = P(x0, y0, z0);

  return (
    <div className="widget">
      <div className="wtitle">A gömb egyenlete a térben: (x − x₀)² + (y − y₀)² + (z − z₀)² = a²</div>
      <div className="wcontrols">
        <label>x₀ = <b>{x0}</b><input type="range" min={-2} max={2} step={0.5} value={x0} onChange={(e) => setX0(+e.target.value)} /></label>
        <label>y₀ = <b>{y0}</b><input type="range" min={-2} max={2} step={0.5} value={y0} onChange={(e) => setY0(+e.target.value)} /></label>
        <label>z₀ = <b>{z0}</b><input type="range" min={-2} max={2} step={0.5} value={z0} onChange={(e) => setZ0(+e.target.value)} /></label>
        <label>sugár a = <b>{a}</b><input type="range" min={1} max={3} step={0.5} value={a} onChange={(e) => setA(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 245" className="plot">
        <Axes3D P={P} />
        <circle cx={c2[0]} cy={c2[1]} r={a * 28} fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" strokeWidth={2} />
        <path d={ring(eqPts)} fill="none" stroke="#34d399" strokeWidth={1.8} />
        <path d={ring(m1Pts)} fill="none" stroke="rgba(125,211,252,0.55)" strokeWidth={1.3} strokeDasharray="4 3" />
        <path d={ring(m2Pts)} fill="none" stroke="rgba(125,211,252,0.55)" strokeWidth={1.3} strokeDasharray="4 3" />
        <circle cx={c2[0]} cy={c2[1]} r={4.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.2} />
        <text x={c2[0] + 8} y={c2[1] - 8} fill="#fbbf24" fontSize={11.5} fontWeight={700}>
          C({x0}; {y0}; {z0})
        </text>
      </svg>
      <div className="readout">
        Kanonikus egyenlet: <b>(x − {x0})² + (y − {y0})² + (z − {z0})² = {(a * a).toFixed(2).replace('.00', '')}</b> ·
        sugár a = <b>{a}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Kör vs. henger vs. félgömb a térben */
export function CylinderVsCircle3DWidget() {
  const [kind, setKind] = useState<'cyl' | 'circ' | 'hemi'>('cyl');
  const P = makeProj(270, 148, 28, 36, 22);

  const circlePath = (z: number, r = 2) => {
    let d = '';
    for (let i = 0; i <= 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      const pt = P(r * Math.cos(t), r * Math.sin(t), z);
      d += `${i ? 'L' : 'M'}${pt[0].toFixed(1)},${pt[1].toFixed(1)} `;
    }
    return d + 'Z';
  };

  return (
    <div className="widget">
      <div className="wtitle">Vigyázat 3D-ben! Mit ír le x² + y² = 4 a térben?</div>
      <div className="relbuttons chips">
        <button className={kind === 'cyl' ? 'on' : ''} onClick={() => setKind('cyl')}>x² + y² = 4 (henger!)</button>
        <button className={kind === 'circ' ? 'on' : ''} onClick={() => setKind('circ')}>x² + y² = 4, z = 2 (kör)</button>
        <button className={kind === 'hemi' ? 'on' : ''} onClick={() => setKind('hemi')}>x²+y²+z²=4, z ≥ 0 (félgömb)</button>
      </div>
      <svg viewBox="0 0 540 245" className="plot">
        <Axes3D P={P} />
        {kind === 'cyl' && (
          <>
            {[-2, -1, 0, 1, 2].map((z) => (
              <path key={z} d={circlePath(z, 2)} fill={z === 2 ? 'rgba(56,189,248,0.12)' : 'none'} stroke="#38bdf8" strokeWidth={z === -2 || z === 2 ? 2 : 1.1} opacity={z === -2 || z === 2 ? 0.95 : 0.45} />
            ))}
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((a, i) => {
              const p1 = P(2 * Math.cos(a), 2 * Math.sin(a), -2.2);
              const p2 = P(2 * Math.cos(a), 2 * Math.sin(a), 2.2);
              return <line key={i} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke="#2dd4bf" strokeWidth={1.6} />;
            })}
          </>
        )}
        {kind === 'circ' && (
          <path d={circlePath(2, 2)} fill="rgba(251,191,36,0.16)" stroke="#fbbf24" strokeWidth={2.6} />
        )}
        {kind === 'hemi' && (
          <>
            <path d={circlePath(0, 2)} fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth={2.2} />
            <path d={circlePath(1, Math.sqrt(3))} fill="none" stroke="#34d399" strokeWidth={1.4} opacity={0.7} />
            <path d={circlePath(1.6, Math.sqrt(4 - 2.56))} fill="none" stroke="#34d399" strokeWidth={1.2} opacity={0.6} />
            <circle cx={P(0, 0, 2)[0]} cy={P(0, 0, 2)[1]} r={3.5} fill="#fbbf24" />
          </>
        )}
      </svg>
      <div className="readout">
        {kind === 'cyl'
          ? 'Mivel z nem szerepel az x² + y² = 4 egyenletben, z bármi lehet → végtelen magas körhenger a z-tengely körül!'
          : kind === 'circ'
            ? 'Ha rögzítjük z = 2-t is, a henger és a z = 2 sík metszete már egyetlen kör!'
            : 'A z ≥ 0 feltétel a gömb felső felét (északi félgömb) vágja ki!'}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Gömb metszete z = k síkkal */
export function SphereSlice3DWidget() {
  const [k, setK] = useState(1.5);
  const a = 3;
  const P = makeProj(270, 140, 28, 35, 22);
  const hits = Math.abs(k) <= a;
  const r = hits ? Math.sqrt(Math.max(0, a * a - k * k)) : 0;

  let sliceD = '';
  if (hits && r > 0.05) {
    for (let i = 0; i <= 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      const pt = P(r * Math.cos(t), r * Math.sin(t), k);
      sliceD += `${i ? 'L' : 'M'}${pt[0].toFixed(1)},${pt[1].toFixed(1)} `;
    }
    sliceD += 'Z';
  }
  const c0 = P(0, 0, 0);

  return (
    <div className="widget">
      <div className="wtitle">Gömb szeletelése a z = k síkkal: x² + y² + z² = 9</div>
      <div className="wcontrols">
        <label>
          Sík magassága <b>z = {k.toFixed(1)}</b>
          <input type="range" min={-3.5} max={3.5} step={0.25} value={k} onChange={(e) => setK(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 245" className="plot">
        <Axes3D P={P} />
        <circle cx={c0[0]} cy={c0[1]} r={a * 28} fill="rgba(56,189,248,0.08)" stroke="#38bdf8" strokeWidth={1.8} />
        {hits && r > 0.05 && <path d={sliceD} fill="rgba(251,191,36,0.22)" stroke="#fbbf24" strokeWidth={2.6} />}
        {hits && r <= 0.05 && <circle cx={P(0, 0, k)[0]} cy={P(0, 0, k)[1]} r={5} fill="#fbbf24" />}
      </svg>
      <div className="readout">
        {Math.abs(k) < a
          ? `Metszetkör sugara: r = √(9 − ${k.toFixed(2)}²) = ${r.toFixed(2)} (x² + y² = ${(9 - k * k).toFixed(2)} a z = ${k.toFixed(1)} síkban).`
          : Math.abs(k) === a
            ? `Érintősík! Egyetlen közös pont: (0; 0; ${k}).`
            : 'Nincs metszet: a sík kívül esik a gömbön (|k| > 3).'}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. 6 alapvető távolság 3D-ben */
export function AxesDistanceDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">Egy P(x; y; z) pont távolságai a 3 síktól és a 3 tengelytől</div>
      <svg viewBox="0 0 540 165" className="plot">
        <rect x={14} y={16} width={246} height={132} rx={12} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={137} y={40} textAnchor="middle" fill="#7dd3fc" fontSize={12.5} fontWeight={700}>Koordinátasíkoktól</text>
        <text x={32} y={68} fill="#e2e8f0" fontSize={12}>• xy-síktól (z = 0):  |z|</text>
        <text x={32} y={94} fill="#e2e8f0" fontSize={12}>• yz-síktól (x = 0):  |x|</text>
        <text x={32} y={120} fill="#e2e8f0" fontSize={12}>• xz-síktól (y = 0):  |y|</text>

        <rect x={280} y={16} width={246} height={132} rx={12} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.5} />
        <text x={403} y={40} textAnchor="middle" fill="#6ee7b7" fontSize={12.5} fontWeight={700}>Koordinátatengelyektől</text>
        <text x={298} y={68} fill="#e2e8f0" fontSize={12}>• x-tengelytől:  √(y² + z²)</text>
        <text x={298} y={94} fill="#e2e8f0" fontSize={12}>• y-tengelytől:  √(x² + z²)</text>
        <text x={298} y={120} fill="#e2e8f0" fontSize={12}>• z-tengelytől:  √(x² + y²)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. 2D vs. 3D koordinátageometria összehasonlítás */
export function Map2Dvs3DDiagram() {
  const rows = [
    { k: 'Térrészek', d2: '4 síknegyed', d3: '8 oktáns (I.: +, +, +)' },
    { k: 'x = a egyenlet', d2: 'Függőleges egyenes', d3: 'yz-síkkal párhuzamos SÍK' },
    { k: 'x² + y² = r²', d2: 'Kör az origó körül', d3: 'Végtelen KÖRHENGER (z szabad!)' },
    { k: 'Távolság', d2: '√(Δx² + Δy²)', d3: '√(Δx² + Δy² + Δz²)' },
    { k: 'Gömb / kör', d2: '(x−h)² + (y−k)² = r²', d3: '(x−x₀)²+(y−y₀)²+(z−z₀)² = a²' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">Ugrás 2D-ből 3D-be: mi változik meg a térben?</div>
      <svg viewBox="0 0 540 212" className="plot">
        <text x={18} y={22} fill="#94a3b8" fontSize={11} fontWeight={700}>FOGALOM</text>
        <text x={148} y={22} fill="#38bdf8" fontSize={11.5} fontWeight={700}>SÍK (ℝ², 1.2)</text>
        <text x={324} y={22} fill="#fbbf24" fontSize={11.5} fontWeight={700}>TÉR (ℝ³, 12.1)</text>
        {rows.map((r, i) => {
          const y = 32 + i * 35;
          return (
            <g key={r.k}>
              <rect x={12} y={y} width={516} height={29} rx={7} fill="rgba(255,255,255,0.04)" stroke="rgba(148,163,184,0.18)" />
              <text x={20} y={y + 19} fill="#6ee7b7" fontSize={11} fontWeight={700}>{r.k}</text>
              <text x={148} y={y + 19} fill="#e2e8f0" fontSize={11}>{r.d2}</text>
              <text x={324} y={y + 19} fill="#fde68a" fontSize={11} fontWeight={600}>{r.d3}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
