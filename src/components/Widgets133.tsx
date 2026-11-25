import { useState } from 'react';

/* ============================================================================
   13.3. Ívhossz és a normált érintővektor — 8 interaktív 2D/3D SVG widget
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

/* ------------------------------------------------------------------ 1. Térgörbe töröttvonalas közelítése 3D-ben */
export function ArcLengthPoly3DWidget() {
  const [n, setN] = useState(6);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 155, 38, yaw, 20);

  // Csavarvonal: r(t) = <1.5 cos t, 1.5 sin t, 0.45 t - 1.4>, t in [0, 2pi]
  const R = 1.5;
  const c = 0.45;
  const r = (t: number): [number, number, number] => [R * Math.cos(t), R * Math.sin(t), c * t - 1.4];

  const smoothPts: [number, number][] = [];
  for (let i = 0; i <= 100; i++) {
    smoothPts.push(P(...r((i / 100) * Math.PI * 2)));
  }

  const polyPts: [number, number][] = [];
  let lenPoly = 0;
  let prev = r(0);
  polyPts.push(P(...prev));
  for (let i = 1; i <= n; i++) {
    const cur = r((i / n) * Math.PI * 2);
    lenPoly += Math.hypot(cur[0] - prev[0], cur[1] - prev[1], cur[2] - prev[2]);
    polyPts.push(P(...cur));
    prev = cur;
  }
  const lenExact = 2 * Math.PI * Math.hypot(R, c);

  return (
    <div className="widget">
      <div className="wtitle">Térgörbe ívhossza = a töröttvonalak hosszának határértéke (n → ∞)</div>
      <div className="controls">
        <label>
          Szakaszok száma n = {n}
          <input type="range" min={3} max={36} step={1} value={n} onChange={(e) => setN(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 275" className="wsvg">
        <path d={pathFrom(smoothPts)} fill="none" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="2.2" />
        <path d={pathFrom(polyPts)} fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        {polyPts.map((pt, i) => (
          <circle key={i} cx={pt[0]} cy={pt[1]} r="3.2" fill="#fb923c" />
        ))}
        <text x="16" y="22" fill="#fbbf24" fontSize="12.5" fontWeight="600">
          Töröttvonal L_{n} = {lenPoly.toFixed(3)} · Pontos ívhossz L = 2π√(R²+c²) = {lenExact.toFixed(3)}
        </text>
        <text x="16" y="42" fill="#34d399" fontSize="12">
          Eltérés: {(lenExact - lenPoly).toFixed(4)} ({(((lenExact - lenPoly) / lenExact) * 100).toFixed(2)}%)
        </text>
        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          Cián: sima csavarvonal · Arany: {n} húrból álló közelítő töröttvonal
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Ívhosszparaméter vs. egyenetlen paraméter */
export function ArcLengthParamWidget() {
  const [mode, setMode] = useState<'arc' | 'fast'>('arc');
  const cx = 270;
  const cy = 148;
  const rad = 92;

  const ticks: { x: number; y: number; label: string }[] = [];
  for (let i = 0; i <= 8; i++) {
    const u = (i / 8) * Math.PI * 1.5;
    // 'arc': szög = u (egyenletes), 'fast': szög = (u / 1.5pi)^2 * 1.5pi (gyorsuló)
    const ang = mode === 'arc' ? u : Math.pow(i / 8, 2) * Math.PI * 1.5;
    ticks.push({
      x: cx + rad * Math.cos(ang),
      y: cy - rad * Math.sin(ang),
      label: mode === 'arc' ? `s=${i}` : `t=${i}`,
    });
  }

  return (
    <div className="widget">
      <div className="wtitle">Természetes (ívhossz-) paraméterezés: egységnyi Δs-re mindig egységnyi ív jut!</div>
      <div className="controls">
        <button className={mode === 'arc' ? 'active' : ''} onClick={() => setMode('arc')}>
          Ívhosszparaméter s (|dr/ds| = 1)
        </button>
        <button className={mode === 'fast' ? 'active' : ''} onClick={() => setMode('fast')}>
          Gyorsuló t paraméter (|dr/dt| = 2t)
        </button>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <circle cx={cx} cy={cy} r={rad} fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="2.2" />
        {/* Aktív 3/4 körív */}
        <path
          d={`M${cx + rad},${cy} A${rad},${rad} 0 1,0 ${cx},${cy + rad}`}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.8"
        />
        {ticks.map((tk, i) => (
          <g key={i}>
            <circle cx={tk.x} cy={tk.y} r="4.8" fill={mode === 'arc' ? '#34d399' : '#fb923c'} stroke="#0f172a" strokeWidth="1.4" />
            <text
              x={tk.x + (tk.x >= cx ? 9 : -32)}
              y={tk.y + (tk.y <= cy ? -6 : 14)}
              fill={mode === 'arc' ? '#34d399' : '#fb923c'}
              fontSize="11"
              fontWeight="600"
            >
              {tk.label}
            </text>
          </g>
        ))}
        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          {mode === 'arc'
            ? 'Egyenletes 1-es sebesség: a kilométeróra-jelek pontosan egyenlő távolságra vannak!'
            : 'Gyorsuló paraméter: az elején sűrűsödnek, a végén széthúzódnak a t = 0, 1, …, 8 pontok.'}
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          Ugyanaz a geometriai görbe végtelen sokféleképpen paraméterezhető — de a természetes paraméter egyértelmű.
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Teljes négyzet trükk 3D-ben */
export function PerfectSquareCurve3DWidget() {
  const [kind, setKind] = useState<'cubic' | 'spiral'>('cubic');
  const [b, setB] = useState(2.0);
  const [yaw, setYaw] = useState(34);
  const P = makeProj(250, 175, 42, yaw, 22);

  const evalR = (t: number): [number, number, number] => {
    if (kind === 'cubic') return [t * 0.7, t * t * 0.35, (t * t * t) / 9];
    const et = Math.exp(t * 0.55);
    return [et * Math.cos(t * 2.2) * 0.7, et * Math.sin(t * 2.2) * 0.7, et * 0.7 - 1.2];
  };

  const tMax = kind === 'cubic' ? 3 : 2;
  const bClamped = Math.min(b, tMax);

  const fullPts: [number, number][] = [];
  const activePts: [number, number][] = [];
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * tMax;
    const pt = P(...evalR(t));
    fullPts.push(pt);
    if (t <= bClamped + 1e-6) activePts.push(pt);
  }
  activePts.push(P(...evalR(bClamped)));

  // Pontos képlet a kiíráshoz:
  // cubic: r(t) = <2t, t^2, t^3/3> -> L(b) = 2b + b^3/3
  // spiral: r(t) = <e^t cos t, e^t sin t, e^t> -> L(b) = sqrt(3)(e^b - 1)
  const exactL = kind === 'cubic' ? 2 * bClamped + Math.pow(bClamped, 3) / 3 : Math.sqrt(3) * (Math.exp(bClamped) - 1);

  return (
    <div className="widget">
      <div className="wtitle">Teljes négyzet és exponenciális trükk: zárt alakban integrálható 3D ívhossz!</div>
      <div className="controls">
        <button className={kind === 'cubic' ? 'active' : ''} onClick={() => setKind('cubic')}>
          ⟨2t, t², t³/3⟩
        </button>
        <button className={kind === 'spiral' ? 'active' : ''} onClick={() => setKind('spiral')}>
          ⟨eᵗ cos t, eᵗ sin t, eᵗ⟩
        </button>
        <label>
          Felső határ b = {bClamped.toFixed(2)}
          <input type="range" min={0.2} max={tMax} step={0.05} value={bClamped} onChange={(e) => setB(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <path d={pathFrom(fullPts)} fill="none" stroke="#64748b" strokeOpacity="0.4" strokeDasharray="4 4" strokeWidth="1.8" />
        <path d={pathFrom(activePts)} fill="none" stroke="#34d399" strokeWidth="3" />
        <circle cx={activePts[0][0]} cy={activePts[0][1]} r="4" fill="#38bdf8" />
        <circle cx={activePts[activePts.length - 1][0]} cy={activePts[activePts.length - 1][1]} r="5" fill="#fbbf24" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          {kind === 'cubic'
            ? '|v(t)| = √(4 + 4t² + t⁴) = 2 + t²  ⇒  L(b) = 2b + b³/3'
            : '|v(t)| = √(3 e²ᵗ) = √3 · eᵗ  ⇒  L(b) = √3 (eᵇ − 1)'}
        </text>
        <text x="16" y="42" fill="#34d399" fontSize="12">
          [0; {bClamped.toFixed(2)}] szakaszon a pontos ívhossz: L = {exactL.toFixed(3)}
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          Ha a gyökjel alatti kifejezés teljes négyzetre hozható, a gyök eltűnik és elemien integrálható!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Normált érintővektor T(t) vs v(t) */
export function UnitTangent3DWidget() {
  const [t, setT] = useState(1.2);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(260, 175, 42, yaw, 20);

  // r(t) = <t, 0.5 t^2, 0.2 t^3> (t in [-1.5, 2.2]) -> változó sebesség!
  const r = (u: number): [number, number, number] => [u, 0.5 * u * u - 0.6, 0.2 * u * u * u];
  const v = (u: number): [number, number, number] => [1, u, 0.6 * u * u];

  const pts: [number, number][] = [];
  for (let i = 0; i <= 80; i++) {
    pts.push(P(...r(-1.4 + (3.4 * i) / 80)));
  }

  const [rx, ry, rz] = r(t);
  const [vx, vy, vz] = v(t);
  const speed = Math.hypot(vx, vy, vz);
  const tx = vx / speed;
  const ty = vy / speed;
  const tz = vz / speed;

  const Pt = P(rx, ry, rz);
  const Pv = P(rx + vx * 0.7, ry + vy * 0.7, rz + vz * 0.7);
  const PT = P(rx + tx * 0.9, ry + ty * 0.9, rz + tz * 0.9);

  return (
    <div className="widget">
      <div className="wtitle">Sebességvektor v(t) (változó hossz) vs. normált érintővektor T(t) = v/|v| (mindig 1!)</div>
      <div className="controls">
        <label>
          t = {t.toFixed(2)}
          <input type="range" min={-1.3} max={1.9} step={0.05} value={t} onChange={(e) => setT(+e.target.value)} />
        </label>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-60} max={120} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 270" className="wsvg">
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.4" />

        {/* v(t) */}
        <line x1={Pt[0]} y1={Pt[1]} x2={Pv[0]} y2={Pv[1]} stroke="#fb923c" strokeWidth="2.4" strokeDasharray="5 3" />
        <path d={arrowHead(Pt[0], Pt[1], Pv[0], Pv[1], 7)} fill="none" stroke="#fb923c" strokeWidth="2.2" />
        <text x={Pv[0] + 6} y={Pv[1] + 12} fill="#fb923c" fontSize="12" fontWeight="700">v(t)</text>

        {/* T(t) */}
        <line x1={Pt[0]} y1={Pt[1]} x2={PT[0]} y2={PT[1]} stroke="#34d399" strokeWidth="3" />
        <path d={arrowHead(Pt[0], Pt[1], PT[0], PT[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.6" />
        <text x={PT[0] + 6} y={PT[1] - 6} fill="#34d399" fontSize="12.5" fontWeight="700">T(t)</text>

        <circle cx={Pt[0]} cy={Pt[1]} r="4.8" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#fb923c" fontSize="12">
          |v({t.toFixed(2)})| = {speed.toFixed(2)} (változik a sebességgel)
        </text>
        <text x="16" y="42" fill="#34d399" fontSize="12">
          T({t.toFixed(2)}) = ⟨{tx.toFixed(2)}; {ty.toFixed(2)}; {tz.toFixed(2)}⟩ · |T| = 1,00 (állandó!)
        </text>
        <text x="16" y="258" fill="#94a3b8" fontSize="11.5">
          T(t) ugyanabba az irányba mutat, mint v(t), de „lecsupaszítja” a sebesség nagyságát: tiszta irány!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Orientáció, sebesség-skálázás és T ⊥ T' */
export function OrientationReversalWidget() {
  const [rev, setRev] = useState(false);
  const [speedMul, setSpeedMul] = useState(1.5);
  const [ang, setAng] = useState(0.8);

  const cx = 270;
  const cy = 148;
  const R = 84;
  const dir = rev ? -1 : 1;

  const px = cx + R * Math.cos(ang);
  const py = cy - R * Math.sin(ang);

  // T irány: dir * <-sin ang, cos ang> (SVG-ben y lefelé!)
  const tx = -dir * Math.sin(ang);
  const ty = -dir * Math.cos(ang);
  // T' irány: mindig a kör középpontja felé! <-cos ang, sin ang> (SVG: -cos, +sin)
  const nx = -Math.cos(ang);
  const ny = Math.sin(ang);

  const vLen = 46 * speedMul;
  const tLen = 58;

  return (
    <div className="widget">
      <div className="wtitle">T(t) nem függ a tempótól, megfordítva −T lesz, és T′(t) mindig merőleges T(t)-re!</div>
      <div className="controls">
        <button className={!rev ? 'active' : ''} onClick={() => setRev(false)}>
          Pozitív körüljárás (+t)
        </button>
        <button className={rev ? 'active' : ''} onClick={() => setRev(true)}>
          Fordított irány (−t)
        </button>
        <label>
          Tempó: {speedMul.toFixed(1)}×
          <input type="range" min={0.5} max={2.2} step={0.1} value={speedMul} onChange={(e) => setSpeedMul(+e.target.value)} />
        </label>
        <label>
          Pont: {((ang * 180) / Math.PI).toFixed(0)}°
          <input type="range" min={0} max={6.28} step={0.08} value={ang} onChange={(e) => setAng(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#38bdf8" strokeWidth="2.2" />

        {/* v(t) */}
        <line x1={px} y1={py} x2={px + tx * vLen} y2={py + ty * vLen} stroke="#fb923c" strokeWidth="2.4" strokeDasharray="4 3" />
        <path d={arrowHead(px, py, px + tx * vLen, py + ty * vLen, 7)} fill="none" stroke="#fb923c" strokeWidth="2.2" />

        {/* T(t) */}
        <line x1={px} y1={py} x2={px + tx * tLen} y2={py + ty * tLen} stroke="#34d399" strokeWidth="3" />
        <path d={arrowHead(px, py, px + tx * tLen, py + ty * tLen, 8)} fill="none" stroke="#34d399" strokeWidth="2.6" />
        <text x={px + tx * (tLen + 14) - 6} y={py + ty * (tLen + 14) + 4} fill="#34d399" fontSize="12.5" fontWeight="700">T</text>

        {/* T'(t) merőleges befelé */}
        <line x1={px} y1={py} x2={px + nx * 52} y2={py + ny * 52} stroke="#fbbf24" strokeWidth="2.4" />
        <path d={arrowHead(px, py, px + nx * 52, py + ny * 52, 7)} fill="none" stroke="#fbbf24" strokeWidth="2.2" />
        <text x={px + nx * 64 - 6} y={py + ny * 64 + 4} fill="#fbbf24" fontSize="12" fontWeight="700">T′</text>

        <circle cx={px} cy={py} r="4.8" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          |T| = 1 (állandó)  ⇒  T · T′ = 0  (előrevetíti a 13.4 főnormális vektorát!)
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Narancs: skálázott v(t) · Zöld: változatlan hosszúságú T(t) · Arany: T′(t) ⊥ T(t)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Egységesített ívhossz-képlet */
export function UnifiedArcLengthWidget() {
  const [tab, setTab] = useState<'cart' | 'param' | 'polar'>('cart');

  const info = {
    cart: {
      title: 'Descartes-függvény y = f(x)',
      r: 'r(x) = ⟨x, f(x)⟩',
      v: 'r′(x) = ⟨1, f′(x)⟩',
      ds: 'ds = √(1 + [f′(x)]²) dx',
      color: '#38bdf8',
      note: 'A 6.3 fejezet képlete egyetlen speciális esete a vektoros ívhossznak!',
    },
    param: {
      title: 'Térgörbe r(t) = ⟨f(t), g(t), h(t)⟩',
      r: 'r(t) = ⟨x(t), y(t), z(t)⟩',
      v: 'v(t) = ⟨x′(t), y′(t), z′(t)⟩',
      ds: 'ds = √((x′)² + (y′)² + (z′)²) dt = |v(t)| dt',
      color: '#34d399',
      note: 'Bármely dimenzióban (2D, 3D, nD) működik: az ívhossz a sebességnagyság integrálja!',
    },
    polar: {
      title: 'Polárgörbe r = r(θ)',
      r: 'R(θ) = ⟨r(θ) cos θ, r(θ) sin θ⟩',
      v: '|R′(θ)|² = (r′ cos θ − r sin θ)² + (r′ sin θ + r cos θ)²',
      ds: 'ds = √(r² + (dr/dθ)²) dθ',
      color: '#fbbf24',
      note: 'A 10.7 fejezet polár ívhossz-képlete is azonnal kijön a vektoros deriválásból!',
    },
  }[tab];

  return (
    <div className="widget">
      <div className="wtitle">Minden ívhossz-képlet egyetlen tőből ered: ds = |r′(t)| dt</div>
      <div className="controls">
        <button className={tab === 'cart' ? 'active' : ''} onClick={() => setTab('cart')}>Descartes (6.3)</button>
        <button className={tab === 'param' ? 'active' : ''} onClick={() => setTab('param')}>Vektoros 3D (13.3)</button>
        <button className={tab === 'polar' ? 'active' : ''} onClick={() => setTab('polar')}>Polár (10.7)</button>
      </div>
      <svg viewBox="0 0 540 185" className="wsvg">
        <rect x="18" y="14" width="504" height="156" rx="10" fill="#0f172a" stroke={info.color} strokeOpacity="0.6" strokeWidth="1.6" />
        <text x="36" y="42" fill={info.color} fontSize="14.5" fontWeight="700">{info.title}</text>
        <text x="36" y="72" fill="#cbd5e1" fontSize="12.5" fontFamily="monospace">Helyvektor:  {info.r}</text>
        <text x="36" y="98" fill="#cbd5e1" fontSize="12.5" fontFamily="monospace">Derivált:    {info.v}</text>
        <text x="36" y="128" fill="#fbbf24" fontSize="13.5" fontWeight="700" fontFamily="monospace">Ívelem:      {info.ds}</text>
        <text x="36" y="154" fill="#94a3b8" fontSize="11.5">{info.note}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Normálsík és T(t) 3D-ben */
export function TangentNormalPlane3DWidget() {
  const [t, setT] = useState(1.4);
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 155, 42, yaw, 20);

  // r(t) = <1.4 cos t, 1.4 sin t, 0.45 t - 1.1>
  const R = 1.4;
  const c = 0.45;
  const r = (u: number): [number, number, number] => [R * Math.cos(u), R * Math.sin(u), c * u - 1.1];
  const spd = Math.hypot(R, c);
  const Tvec = (u: number): [number, number, number] => [(-R * Math.sin(u)) / spd, (R * Math.cos(u)) / spd, c / spd];
  // Két ortogonális egységvektor a normálsíkban (N és B):
  const Nvec = (u: number): [number, number, number] => [-Math.cos(u), -Math.sin(u), 0];
  const Bvec = (u: number): [number, number, number] => [(c * Math.sin(u)) / spd, (-c * Math.cos(u)) / spd, R / spd];

  const pts: [number, number][] = [];
  for (let i = 0; i <= 90; i++) pts.push(P(...r((i / 90) * 5.6)));

  const [rx, ry, rz] = r(t);
  const [tx, ty, tz] = Tvec(t);
  const [nx, ny, nz] = Nvec(t);
  const [bx, by, bz] = Bvec(t);

  const s = 0.72;
  const planeCorners: [number, number][] = [
    P(rx + s * (nx + bx), ry + s * (ny + by), rz + s * (nz + bz)),
    P(rx + s * (-nx + bx), ry + s * (-ny + by), rz + s * (-nz + bz)),
    P(rx + s * (-nx - bx), ry + s * (-ny - by), rz + s * (-nz - bz)),
    P(rx + s * (nx - bx), ry + s * (ny - by), rz + s * (nz - bz)),
  ];
  const planePath = `${pathFrom(planeCorners)} Z`;

  const Pt = P(rx, ry, rz);
  const PT = P(rx + tx * 0.95, ry + ty * 0.95, rz + tz * 0.95);

  return (
    <div className="widget">
      <div className="wtitle">A görbe normálsíkja: T(t₀) a sík normálvektora, tehát T(t₀) · (r − r(t₀)) = 0</div>
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
        <path d={pathFrom(pts)} fill="none" stroke="#38bdf8" strokeWidth="2.4" />
        {/* Normálsík */}
        <path d={planePath} fill="#2dd4bf" fillOpacity="0.16" stroke="#2dd4bf" strokeOpacity="0.7" strokeWidth="1.4" />
        {/* T(t) normálvektor */}
        <line x1={Pt[0]} y1={Pt[1]} x2={PT[0]} y2={PT[1]} stroke="#34d399" strokeWidth="3" />
        <path d={arrowHead(Pt[0], Pt[1], PT[0], PT[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.6" />
        <text x={PT[0] + 6} y={PT[1] - 4} fill="#34d399" fontSize="12.5" fontWeight="700">T(t₀)</text>
        <circle cx={Pt[0]} cy={Pt[1]} r="4.5" fill="#fbbf24" />

        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          A teal normálsík minden pontja merőleges T(t₀)-ra — ez a 12.5 síkegyenlet alkalmazása!
        </text>
        <text x="16" y="264" fill="#94a3b8" fontSize="11.5">
          Gondolj rá úgy, mint a görbére fűzött, mindig merőlegesen álló gyöngy-korongra!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló térkép */
export function ArcLengthTangentMapDiagram() {
  const rows = [
    { label: 'Ívhossz [a, b]-n', expr: 'L = ∫_a^b |v(t)| dt', color: '#38bdf8' },
    { label: 'Ívhosszfüggvény', expr: 's(t) = ∫_{t₀}^t |v(τ)| dτ   ⇒   ds/dt = |v(t)|', color: '#2dd4bf' },
    { label: 'Normált érintővektor', expr: 'T(t) = v(t) / |v(t)| = dr / ds   (|T| = 1)', color: '#34d399' },
    { label: 'Sebesség felbontása', expr: 'v(t) = (ds/dt) · T(t)', color: '#fbbf24' },
    { label: 'Ortogonalitási kulcs', expr: 'T(t) · T′(t) = 0   (13.4 főnormális alapja!)', color: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 13.3 fejezet összefoglaló térképe — ívhossz és normált érintővektor</div>
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
