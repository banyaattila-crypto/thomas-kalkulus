import { useState } from 'react';

/* ============================================================================
   15.7. Helyettesítés többes integráloknál — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

/* ------------------------------------------------------------------ 1. Lineáris leképezés uv -> xy */
export function UVtoXYTransformWidget() {
  const [a, setA] = useState(1.6);
  const [b, setB] = useState(0.6);
  const [c, setC] = useState(0.4);
  const [d, setD] = useState(1.4);

  const det = a * d - b * c;
  // Bal panel (uv-sík): origó (60, 195), skála 64
  const uv = (u: number, v: number): [number, number] => [60 + u * 64, 195 - v * 64];
  // Jobb panel (xy-sík): origó (325, 195), skála 52
  const xy = (u: number, v: number): [number, number] => {
    const x = a * u + b * v;
    const y = c * u + d * v;
    return [325 + x * 52, 195 - y * 52];
  };

  const poly = (pts: [number, number][]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="wtitle">A T(u, v) = (au + bv, cu + dv) leképezés: az egységnégyzet területe |J| = |ad − bc|-szeresére nő!</div>
      <div className="controls">
        <label>
          a = {a.toFixed(1)}
          <input type="range" min={0.4} max={2.2} step={0.1} value={a} onChange={(e) => setA(+e.target.value)} />
        </label>
        <label>
          b = {b.toFixed(1)}
          <input type="range" min={-0.6} max={1.4} step={0.1} value={b} onChange={(e) => setB(+e.target.value)} />
        </label>
        <label>
          c = {c.toFixed(1)}
          <input type="range" min={-0.6} max={1.4} step={0.1} value={c} onChange={(e) => setC(+e.target.value)} />
        </label>
        <label>
          d = {d.toFixed(1)}
          <input type="range" min={0.4} max={2.2} step={0.1} value={d} onChange={(e) => setD(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 240" className="wsvg">
        {/* Bal: uv-sík */}
        <line x1="32" y1="195" x2="180" y2="195" stroke="#475569" strokeWidth="1.2" />
        <line x1="60" y1="65" x2="60" y2="215" stroke="#475569" strokeWidth="1.2" />
        <polygon points={poly([uv(0, 0), uv(1, 0), uv(1, 1), uv(0, 1)])} fill="#38bdf8" fillOpacity="0.24" stroke="#38bdf8" strokeWidth="2.2" />
        <text x="68" y="85" fill="#38bdf8" fontSize="12" fontWeight="700">G (uv-sík) · Ter = 1</text>

        {/* Nyíl */}
        <line x1="195" y1="138" x2="265" y2="138" stroke="#fbbf24" strokeWidth="2.4" />
        <path d="M257,132 L266,138 L257,144" fill="none" stroke="#fbbf24" strokeWidth="2.2" />
        <text x="230" y="128" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="700">T</text>

        {/* Jobb: xy-sík */}
        <line x1="285" y1="195" x2="515" y2="195" stroke="#475569" strokeWidth="1.2" />
        <line x1="325" y1="45" x2="325" y2="215" stroke="#475569" strokeWidth="1.2" />
        <polygon points={poly([xy(0, 0), xy(1, 0), xy(1, 1), xy(0, 1)])} fill="#34d399" fillOpacity="0.24" stroke="#34d399" strokeWidth="2.2" />
        <text x="335" y="62" fill="#34d399" fontSize="12" fontWeight="700">R = T(G) · Ter = |J| = {Math.abs(det).toFixed(2)}</text>

        <text x="16" y="228" fill="#94a3b8" fontSize="11.5">
          J = ad − bc = {det.toFixed(2)} ({det > 0 ? 'orientációtartó' : det < 0 ? 'orientációváltó' : 'elfajuló!'})
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Nemlineáris Jacobi-nyújtás (polár cella) */
export function JacobianAreaStretchWidget() {
  const [r, setR] = useState(1.6);
  const [thDeg, setThDeg] = useState(40);
  const th = (thDeg * Math.PI) / 180;
  const dr = 0.35;
  const dth = 0.35;

  // Bal: (r, theta) téglalap
  const bx = (rv: number) => 42 + rv * 55;
  const by = (tv: number) => 205 - tv * 52;
  // Jobb: (x, y) poláris cella
  const cx = 370;
  const cy = 195;
  const sc = 56;
  const pXY = (rv: number, tv: number): [number, number] => [cx + rv * Math.cos(tv) * sc, cy - rv * Math.sin(tv) * sc];

  const cellPts = [pXY(r, th), pXY(r + dr, th), pXY(r + dr, th + dth), pXY(r, th + dth)]
    .map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(' ');

  return (
    <div className="widget">
      <div className="wtitle">A Jacobi-determináns helyi terület-nagyítási tényező: polárban |J(r, θ)| = r!</div>
      <div className="controls">
        <label>
          r = {r.toFixed(2)} (próbáld kicsi és nagy r-rel!)
          <input type="range" min={0.4} max={2.3} step={0.1} value={r} onChange={(e) => setR(+e.target.value)} />
        </label>
        <label>
          θ = {thDeg}°
          <input type="range" min={10} max={75} step={5} value={thDeg} onChange={(e) => setThDeg(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 235" className="wsvg">
        {/* Bal: r-theta sík */}
        <line x1="35" y1="205" x2="215" y2="205" stroke="#475569" strokeWidth="1.2" />
        <line x1="42" y1="40" x2="42" y2="215" stroke="#475569" strokeWidth="1.2" />
        <rect
          x={bx(r)}
          y={by(th + dth)}
          width={dr * 55}
          height={dth * 52}
          fill="#38bdf8"
          fillOpacity="0.32"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        <text x="48" y="34" fill="#38bdf8" fontSize="12" fontWeight="700">rθ-sík: Δr · Δθ = {(dr * dth).toFixed(3)} (állandó)</text>

        {/* Jobb: xy-sík */}
        <line x1="275" y1={cy} x2="520" y2={cy} stroke="#475569" strokeWidth="1.2" />
        <line x1={cx} y1="35" x2={cx} y2="215" stroke="#475569" strokeWidth="1.2" />
        <polygon points={cellPts} fill="#fbbf24" fillOpacity="0.35" stroke="#fbbf24" strokeWidth="2.2" />
        <text x="275" y="34" fill="#fbbf24" fontSize="12" fontWeight="700">xy-sík: ΔA ≈ r · Δr · Δθ = {(r * dr * dth).toFixed(3)}</text>

        <text x="16" y="226" fill="#94a3b8" fontSize="11.5">
          Ugyanakkora Δr × Δθ téglalap képe r-rel arányosan megnyúlik az xy-síkban: ezért van ott az r = |J| szorzó!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Ferde paralelogramma kiegyenesítése */
export function ParallelogramStraightenerWidget() {
  const [alpha, setAlpha] = useState(0); // 0 = eredeti xy, 1 = kiegyenesített uv

  // 4 csúcs: (x,y) -> (u,v) = (x+y, x-y)
  // Eredeti gyémánt az xy-síkban: (0,0), (1,-1), (2,0), (1,1) -> u in [0,2], v in [0,2]?
  // Pontosabban u=x+y in [0,2], v=x-y in [0,2] => x=(u+v)/2, y=(u-v)/2:
  // (u,v)=(0,0)->(0,0); (2,0)->(1,1); (2,2)->(2,0); (0,2)->(1,-1)
  const xyPts: [number, number][] = [
    [0, 0],
    [1, 1],
    [2, 0],
    [1, -1],
  ];
  const uvPts: [number, number][] = [
    [0, 0],
    [2, 0],
    [2, 2],
    [0, 2],
  ];

  const mapPt = (i: number): [number, number] => {
    const x = xyPts[i][0] * (1 - alpha) + uvPts[i][0] * alpha;
    const y = xyPts[i][1] * (1 - alpha) + uvPts[i][1] * alpha;
    return [180 + x * 72, 145 - y * 52];
  };

  const poly = [0, 1, 2, 3].map((i) => mapPt(i).map((c) => c.toFixed(1)).join(',')).join(' ');

  return (
    <div className="widget">
      <div className="wtitle">Ferde paralelogramma kiegyenesítése: u = x + y, v = x − y (|J| = ½)</div>
      <div className="controls">
        <label>
          Átalakítás: {alpha === 0 ? 'Eredeti xy-sík' : alpha === 1 ? 'Új uv-négyzet [0,2]²' : `${(alpha * 100).toFixed(0)}%`}
          <input type="range" min={0} max={1} step={0.05} value={alpha} onChange={(e) => setAlpha(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 240" className="wsvg">
        <line x1="60" y1="145" x2="480" y2="145" stroke="#475569" strokeWidth="1.2" />
        <line x1="180" y1="25" x2="180" y2="225" stroke="#475569" strokeWidth="1.2" />
        <polygon points={poly} fill={alpha > 0.5 ? '#34d399' : '#38bdf8'} fillOpacity="0.25" stroke={alpha > 0.5 ? '#34d399' : '#38bdf8'} strokeWidth="2.4" />
        <text x="16" y="24" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          {alpha < 0.5
            ? 'xy-síkban ferde határok (2 külön integrálra kéne bontani!)'
            : 'uv-síkban sima [0, 2] × [0, 2] téglalap — egyetlen konstans határú integrál!'}
        </text>
        <text x="16" y="230" fill="#94a3b8" fontSize="11.5">
          Az eredeti terület 2, az uv-négyzet területe 4 → pontosan |J| = ½ kompenzálja a kétszeres nyújtást!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Ellipszis -> Egységkör */
export function EllipseToDiskWidget() {
  const [a, setA] = useState(2.2);
  const [b, setB] = useState(1.3);

  return (
    <div className="widget">
      <div className="wtitle">Ellipszis leképezése az egységkörből: x = au, y = bv ⇒ |J| = ab ⇒ Ter = πab!</div>
      <div className="controls">
        <label>
          a = {a.toFixed(1)}
          <input type="range" min={0.8} max={2.8} step={0.1} value={a} onChange={(e) => setA(+e.target.value)} />
        </label>
        <label>
          b = {b.toFixed(1)}
          <input type="range" min={0.6} max={2.2} step={0.1} value={b} onChange={(e) => setB(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 230" className="wsvg">
        {/* Bal: egységkör */}
        <circle cx="120" cy="122" r="46" fill="#38bdf8" fillOpacity="0.22" stroke="#38bdf8" strokeWidth="2.2" />
        <text x="120" y="196" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="600">u² + v² ≤ 1 (Ter = π)</text>

        {/* Nyíl */}
        <line x1="185" y1="122" x2="245" y2="122" stroke="#fbbf24" strokeWidth="2.4" />
        <path d="M237,116 L246,122 L237,128" fill="none" stroke="#fbbf24" strokeWidth="2.2" />
        <text x="215" y="112" textAnchor="middle" fill="#fbbf24" fontSize="11.5" fontWeight="700">× ab</text>

        {/* Jobb: ellipszis */}
        <ellipse cx="385" cy="122" rx={a * 42} ry={b * 42} fill="#34d399" fillOpacity="0.22" stroke="#34d399" strokeWidth="2.4" />
        <text x="385" y="218" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="700">
          x²/a² + y²/b² ≤ 1 · |J| = {(a * b).toFixed(2)} · Ter = {(Math.PI * a * b).toFixed(2)}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. 3D Jacobi-determináns egyesítő */
export function Jacobian3DUnifierWidget() {
  const [tab, setTab] = useState<'cyl' | 'sph' | 'ellip'>('sph');

  const data = {
    cyl: {
      title: 'Hengerkoordináták: x = r cos θ, y = r sin θ, z = z',
      r1: '[ cos θ   −r sin θ   0 ]',
      r2: '[ sin θ    r cos θ   0 ]',
      r3: '[   0         0      1 ]',
      res: 'J(r, θ, z) = r (cos²θ + sin²θ) = r',
      color: '#34d399',
    },
    sph: {
      title: 'Gömbi koordináták: x = ρ sin φ cos θ, y = ρ sin φ sin θ, z = ρ cos φ',
      r1: '[ sin φ cos θ   ρ cos φ cos θ   −ρ sin φ sin θ ]',
      r2: '[ sin φ sin θ   ρ cos φ sin θ    ρ sin φ cos θ ]',
      r3: '[   cos φ        −ρ sin φ              0        ]',
      res: 'J(ρ, φ, θ) = ρ² sin φ   (pontosan a 15.6 képlete!)',
      color: '#fbbf24',
    },
    ellip: {
      title: 'Ellipszoid-skálázás: x = au, y = bv, z = cw',
      r1: '[ a   0   0 ]',
      r2: '[ 0   b   0 ]',
      r3: '[ 0   0   c ]',
      res: 'J(u, v, w) = abc  ⇒  V_ellipszoid = (4/3) π abc!',
      color: '#38bdf8',
    },
  }[tab];

  return (
    <div className="widget">
      <div className="wtitle">A 3×3-as Jacobi-determináns egyesíti a teljes 15.6 fejezetet!</div>
      <div className="controls">
        <button className={tab === 'cyl' ? 'active' : ''} onClick={() => setTab('cyl')}>Henger (r)</button>
        <button className={tab === 'sph' ? 'active' : ''} onClick={() => setTab('sph')}>Gömbi (ρ² sin φ)</button>
        <button className={tab === 'ellip' ? 'active' : ''} onClick={() => setTab('ellip')}>Ellipszoid (abc)</button>
      </div>
      <svg viewBox="0 0 540 195" className="wsvg">
        <rect x="16" y="14" width="508" height="168" rx="10" fill="#0f172a" stroke={data.color} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="32" y="40" fill={data.color} fontSize="12.5" fontWeight="700">{data.title}</text>
        <text x="48" y="72" fill="#cbd5e1" fontSize="12.5" fontFamily="monospace">{data.r1}</text>
        <text x="48" y="96" fill="#cbd5e1" fontSize="12.5" fontFamily="monospace">{data.r2}</text>
        <text x="48" y="120" fill="#cbd5e1" fontSize="12.5" fontFamily="monospace">{data.r3}</text>
        <text x="32" y="158" fill="#fbbf24" fontSize="13.5" fontWeight="700" fontFamily="monospace">{data.res}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Orientáció és a J előjele */
export function OrientationSignWidget() {
  const [mode, setMode] = useState<'rot' | 'ref' | 'shear' | 'deg'>('rot');

  const info = {
    rot: {
      name: 'Forgatás (J = +1)',
      pts: '350,175 435,150 380,82',
      color: '#34d399',
      note: 'J > 0: az A → B → C körüljárás marad pozitív (óramutatóval ellentétes), terület változatlan.',
    },
    ref: {
      name: 'Tükrözés x ↔ y (J = −1)',
      pts: '350,175 350,95 435,175',
      color: '#fb923c',
      note: 'J < 0: a körüljárás megfordul (tükörkép!), de a terület szorzója |J| = |−1| = 1!',
    },
    shear: {
      name: 'Nyírás x = u + v, y = v (J = +1)',
      pts: '340,175 420,175 460,95',
      color: '#38bdf8',
      note: 'J = +1: elferdül az alakzat, de a területe és az orientációja is pontosan változatlan!',
    },
    deg: {
      name: 'Elfajuló leképezés (J = 0)',
      pts: '345,175 445,115 395,145',
      color: '#f87171',
      note: 'J = 0: a 2D alakzat egyetlen 1D egyenesbe lapul össze — a területe 0 lesz!',
    },
  }[mode];

  return (
    <div className="widget">
      <div className="wtitle">Mit jelent a Jacobi-determináns előjele? (Ezért kell az abszolút érték |J|!)</div>
      <div className="controls">
        <button className={mode === 'rot' ? 'active' : ''} onClick={() => setMode('rot')}>Forgatás (+1)</button>
        <button className={mode === 'ref' ? 'active' : ''} onClick={() => setMode('ref')}>Tükrözés (−1)</button>
        <button className={mode === 'shear' ? 'active' : ''} onClick={() => setMode('shear')}>Nyírás (+1)</button>
        <button className={mode === 'deg' ? 'active' : ''} onClick={() => setMode('deg')}>Elfajuló (0)</button>
      </div>
      <svg viewBox="0 0 540 225" className="wsvg">
        {/* Eredeti háromszög */}
        <polygon points="80,175 160,175 80,95" fill="#38bdf8" fillOpacity="0.22" stroke="#38bdf8" strokeWidth="2.2" />
        <text x="66" y="186" fill="#e2e8f0" fontSize="11.5">A</text>
        <text x="164" y="186" fill="#e2e8f0" fontSize="11.5">B</text>
        <text x="66" y="92" fill="#e2e8f0" fontSize="11.5">C</text>
        <text x="115" y="68" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="600">Eredeti (CCW)</text>

        <line x1="205" y1="135" x2="275" y2="135" stroke="#fbbf24" strokeWidth="2.2" />
        <path d="M267,129 L276,135 L267,141" fill="none" stroke="#fbbf24" strokeWidth="2.2" />

        {/* Kép */}
        <polygon points={info.pts} fill={info.color} fillOpacity="0.26" stroke={info.color} strokeWidth="2.4" />
        <text x="405" y="62" textAnchor="middle" fill={info.color} fontSize="12.5" fontWeight="700">{info.name}</text>

        <text x="16" y="214" fill="#94a3b8" fontSize="11.5">{info.note}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Trapéz átalakítása (u = x+y, v = y-x) */
export function TrapezoidTransformWidget() {
  return (
    <div className="widget">
      <div className="wtitle">Klasszikus vizsgatrükk: trapéz (1 ≤ x+y ≤ 2, x,y ≥ 0) → szimmetrikus uv-trapéz (−u ≤ v ≤ u)!</div>
      <svg viewBox="0 0 540 225" className="wsvg">
        {/* Bal: xy trapéz */}
        <line x1="45" y1="185" x2="215" y2="185" stroke="#475569" strokeWidth="1.2" />
        <line x1="65" y1="40" x2="65" y2="200" stroke="#475569" strokeWidth="1.2" />
        <polygon points="125,185 185,185 65,65 65,125" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.2" />
        <text x="125" y="34" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="700">R: 1 ≤ x+y ≤ 2 (I. negyed)</text>

        <line x1="225" y1="115" x2="285" y2="115" stroke="#fbbf24" strokeWidth="2.2" />
        <path d="M277,109 L286,115 L277,121" fill="none" stroke="#fbbf24" strokeWidth="2.2" />
        <text x="255" y="104" textAnchor="middle" fill="#fbbf24" fontSize="11">|J| = ½</text>

        {/* Jobb: uv trapéz (1 <= u <= 2, -u <= v <= u) */}
        <line x1="305" y1="115" x2="505" y2="115" stroke="#475569" strokeWidth="1.2" />
        <line x1="325" y1="35" x2="325" y2="195" stroke="#475569" strokeWidth="1.2" />
        <polygon points="395,150 465,185 465,45 395,80" fill="#34d399" fillOpacity="0.25" stroke="#34d399" strokeWidth="2.2" />
        <text x="415" y="34" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="700">G: 1 ≤ u ≤ 2, −u ≤ v ≤ u</text>

        <text x="16" y="216" fill="#94a3b8" fontSize="11.5">
          Az új G tartomány szimmetrikus a v = 0 tengelyre, és a (y−x)/(y+x) hányados egyszerűen v/u lesz!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-képlettár */
export function JacobianMasterMapDiagram() {
  const rows = [
    { label: '2D helyettesítés', expr: '∬_R f(x,y) dx dy = ∬_G f(x(u,v), y(u,v)) |J(u,v)| du dv', color: '#38bdf8' },
    { label: 'Reciprok szabály', expr: '∂(x,y)/∂(u,v) = 1 / [ ∂(u,v)/∂(x,y) ]   (időspóroló!)', color: '#fbbf24' },
    { label: '3D helyettesítés', expr: '∭_D f dV = ∭_G f(x,y,z) |∂(x,y,z)/∂(u,v,w)| du dv dw', color: '#34d399' },
    { label: 'Klasszikus J-k', expr: 'Polár/Henger: r  ·  Gömbi: ρ² sin φ  ·  Ellipszoid: abc', color: '#2dd4bf' },
    { label: 'Aranyszabály', expr: 'SOHA ne felejtsd le az ABSZOLÚT ÉRTÉKET: |J| ≥ 0!', color: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 15.7 fejezet (és a teljes 15. fejezet!) mester-képlettára — Jacobi-determináns</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="600">{r.label}</text>
              <text x="168" y={y + 23} fill={r.color} fontSize="11.2" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
