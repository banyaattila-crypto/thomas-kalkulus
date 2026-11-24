import { useState } from 'react';

/* ============================================================================
   12.3. Skalárszorzat — 8 interaktív és szemléltető SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

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

/* ------------------------------------------------------------------ 1. Skalárszorzat előjele és hajlásszög */
export function DotAngleSignWidget() {
  const [deg, setDeg] = useState(50);
  const [lenU, setLenU] = useState(4);
  const lenV = 5;
  const rad = (deg * Math.PI) / 180;
  const dot = lenU * lenV * Math.cos(rad);

  const ox = 250;
  const oy = 170;
  const sc = 30;
  const vx = ox + lenV * sc;
  const vy = oy;
  const ux = ox + lenU * sc * Math.cos(rad);
  const uy = oy - lenU * sc * Math.sin(rad);

  const stateColor = Math.abs(dot) < 1e-6 ? '#fbbf24' : dot > 0 ? '#34d399' : '#fb923c';
  const stateLabel =
    Math.abs(dot) < 1e-6
      ? 'MERŐLEGESEK (θ = 90°, u·v = 0)'
      : dot > 0
        ? 'HEGYESSZÖG (θ < 90°, u·v > 0)'
        : 'TOMPASZÖG (θ > 90°, u·v < 0)';

  const arcR = 34;
  const ax = ox + arcR * Math.cos(rad);
  const ay = oy - arcR * Math.sin(rad);

  return (
    <div className="widget">
      <div className="wtitle">A skalárszorzat előjele elárulja a szöget: u · v = |u|·|v|·cos θ</div>
      <div className="wcontrols">
        <label>Hajlásszög <b>θ = {deg}°</b><input type="range" min={0} max={180} step={5} value={deg} onChange={(e) => setDeg(+e.target.value)} /></label>
        <label>|u| hossza <b>{lenU}</b><input type="range" min={1} max={5} step={0.5} value={lenU} onChange={(e) => setLenU(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 215" className="plot">
        <line x1={30} y1={oy} x2={510} y2={oy} className="ax" />
        <path d={`M ${ox + arcR},${oy} A ${arcR} ${arcR} 0 0 0 ${ax.toFixed(1)},${ay.toFixed(1)}`} fill="none" stroke={stateColor} strokeWidth={2} />
        <Arrow x1={ox} y1={oy} x2={vx} y2={vy} color="#38bdf8" width={3} />
        <Arrow x1={ox} y1={oy} x2={ux} y2={uy} color={stateColor} width={3} />
        <text x={vx + 8} y={vy + 4} fill="#38bdf8" fontSize={12} fontWeight={700}>v (|v|=5)</text>
        <text x={ux + 8} y={uy - 6} fill={stateColor} fontSize={12} fontWeight={700}>u (|u|={lenU})</text>
        <text x={24} y={28} fill={stateColor} fontSize={13} fontWeight={700}>{stateLabel}</text>
      </svg>
      <div className="readout">
        <b>u · v = {lenU} · 5 · cos({deg}°) = {dot.toFixed(2)}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. 3D hajlásszög kalkulátor */
export function Angle3DCalcWidget() {
  const [u1, setU1] = useState(2);
  const [u2, setU2] = useState(1);
  const [u3, setU3] = useState(2);
  const v = [1, 2, -1];

  const dot = u1 * v[0] + u2 * v[1] + u3 * v[2];
  const lu = Math.hypot(u1, u2, u3);
  const lv = Math.hypot(v[0], v[1], v[2]);
  const cosT = lu > 0 ? Math.max(-1, Math.min(1, dot / (lu * lv))) : 0;
  const deg = (Math.acos(cosT) * 180) / Math.PI;

  return (
    <div className="widget">
      <div className="wtitle">Két 3D vektor hajlásszöge: cos θ = (u · v) / (|u|·|v|)</div>
      <div className="wcontrols">
        <label>u₁ = <b>{u1}</b><input type="range" min={-3} max={3} step={1} value={u1} onChange={(e) => setU1(+e.target.value)} /></label>
        <label>u₂ = <b>{u2}</b><input type="range" min={-3} max={3} step={1} value={u2} onChange={(e) => setU2(+e.target.value)} /></label>
        <label>u₃ = <b>{u3}</b><input type="range" min={-3} max={3} step={1} value={u3} onChange={(e) => setU3(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 135" className="plot">
        <rect x={14} y={16} width={160} height={102} rx={10} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={94} y={40} textAnchor="middle" fill="#7dd3fc" fontSize={12} fontWeight={700}>Vektorok</text>
        <text x={94} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={12}>u = ⟨{u1}, {u2}, {u3}⟩</text>
        <text x={94} y={92} textAnchor="middle" fill="#6ee7b7" fontSize={12}>v = ⟨1, 2, −1⟩</text>

        <rect x={190} y={16} width={160} height={102} rx={10} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.5} />
        <text x={270} y={40} textAnchor="middle" fill="#6ee7b7" fontSize={12} fontWeight={700}>Skalárszorzat</text>
        <text x={270} y={68} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700}>u · v = {dot}</text>
        <text x={270} y={96} textAnchor="middle" fill="#94a3b8" fontSize={11}>|u|={lu.toFixed(2)}, |v|={lv.toFixed(2)}</text>

        <rect x={366} y={16} width={160} height={102} rx={10} fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={446} y={40} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>Hajlásszög</text>
        <text x={446} y={68} textAnchor="middle" fill="#fbbf24" fontSize={15} fontWeight={700}>
          {lu === 0 ? '—' : `${deg.toFixed(1)}°`}
        </text>
        <text x={446} y={96} textAnchor="middle" fill="#cbd5e1" fontSize={11}>
          cos θ = {lu === 0 ? '—' : cosT.toFixed(3)}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Merőlegesség-kereső */
export function OrthogonalSearchWidget() {
  const [k, setK] = useState(-3);
  // u = <2, 3>, v = <k, 2> => u·v = 2k + 6 = 0 <=> k = -3
  const dot = 2 * k + 6;
  const isOrtho = dot === 0;
  const ox = 270;
  const oy = 145;
  const sc = 26;

  return (
    <div className="widget">
      <div className="wtitle">Merőlegességi teszt: u = ⟨2, 3⟩ és v = ⟨k, 2⟩ — mikor lesz u · v = 0?</div>
      <div className="wcontrols">
        <label>
          Paraméter <b>k = {k}</b>
          <input type="range" min={-6} max={4} step={0.5} value={k} onChange={(e) => setK(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 205" className="plot">
        <line x1={30} y1={oy} x2={510} y2={oy} className="ax" />
        <line x1={ox} y1={16} x2={ox} y2={192} className="ax" />
        <Arrow x1={ox} y1={oy} x2={ox + 2 * sc} y2={oy - 3 * sc} color="#38bdf8" width={2.8} />
        <Arrow x1={ox} y1={oy} x2={ox + k * sc} y2={oy - 2 * sc} color={isOrtho ? '#34d399' : '#fb923c'} width={2.8} />
        <text x={ox + 2 * sc + 8} y={oy - 3 * sc} fill="#38bdf8" fontSize={12} fontWeight={700}>u = ⟨2, 3⟩</text>
        <text x={ox + k * sc - 8} y={oy - 2 * sc - 8} textAnchor="end" fill={isOrtho ? '#34d399' : '#fb923c'} fontSize={12} fontWeight={700}>
          v = ⟨{k}, 2⟩
        </text>
        <text x={24} y={28} fill={isOrtho ? '#34d399' : '#fbbf24'} fontSize={13} fontWeight={700}>
          u · v = 2·({k}) + 3·2 = {dot.toFixed(1)} {isOrtho ? ' ✓ MERŐLEGESEK!' : ''}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Merőleges vektorvetület és felbontás */
export function VectorProjectionWidget() {
  const [ux, setUx] = useState(3);
  const [uy, setUy] = useState(3.5);
  const vx = 5;
  const vy = 1;

  const dot = ux * vx + uy * vy;
  const v2 = vx * vx + vy * vy;
  const scalar = dot / v2;
  const px = scalar * vx;
  const py = scalar * vy;
  const comp = dot / Math.hypot(vx, vy);

  const ox = 150;
  const oy = 175;
  const sc = 42;

  return (
    <div className="widget">
      <div className="wtitle">Ortogonális felbontás: u = proj_v(u) + u_⊥</div>
      <div className="wcontrols">
        <label>u₁ = <b>{ux}</b><input type="range" min={-2} max={5} step={0.5} value={ux} onChange={(e) => setUx(+e.target.value)} /></label>
        <label>u₂ = <b>{uy}</b><input type="range" min={-1} max={4} step={0.5} value={uy} onChange={(e) => setUy(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 225" className="plot">
        {/* v tartóegyenese */}
        <line x1={ox - vx * sc * 0.6} y1={oy + vy * sc * 0.6} x2={ox + vx * sc * 1.4} y2={oy - vy * sc * 1.4} stroke="rgba(148,163,184,0.28)" strokeDasharray="4 4" />
        {/* v vektor */}
        <Arrow x1={ox} y1={oy} x2={ox + vx * sc} y2={oy - vy * sc} color="#60a5fa" width={2.2} />
        {/* u vektor */}
        <Arrow x1={ox} y1={oy} x2={ox + ux * sc} y2={oy - uy * sc} color="#38bdf8" width={2.8} />
        {/* Vetület proj_v(u) */}
        <Arrow x1={ox} y1={oy} x2={ox + px * sc} y2={oy - py * sc} color="#34d399" width={3.4} />
        {/* Merőleges komponens u_perp */}
        <Arrow x1={ox + px * sc} y1={oy - py * sc} x2={ox + ux * sc} y2={oy - uy * sc} color="#fb923c" width={2.3} dash="4 3" />

        <text x={ox + vx * sc + 8} y={oy - vy * sc + 4} fill="#60a5fa" fontSize={12} fontWeight={700}>v = ⟨5, 1⟩</text>
        <text x={ox + ux * sc + 8} y={oy - uy * sc - 6} fill="#38bdf8" fontSize={12} fontWeight={700}>u</text>
        <text x={ox + (px * sc) / 2} y={oy - (py * sc) / 2 + 18} fill="#34d399" fontSize={11.5} fontWeight={700}>proj_v(u)</text>
        <text x={ox + ((px + ux) * sc) / 2 + 8} y={oy - ((py + uy) * sc) / 2} fill="#fb923c" fontSize={11.5} fontWeight={700}>u_⊥</text>
      </svg>
      <div className="readout">
        Skalárkomponens: <b>comp_v(u) = {comp.toFixed(2)}</b> · Vektorvetület: <b>proj_v(u) = ⟨{px.toFixed(2)}, {py.toFixed(2)}⟩</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Fizikai munka: W = F · D */
export function WorkDotProductWidget() {
  const [deg, setDeg] = useState(35);
  const F = 50; // N
  const D = 10; // m
  const rad = (deg * Math.PI) / 180;
  const fPar = F * Math.cos(rad);
  const fPerp = F * Math.sin(rad);
  const Wval = fPar * D;

  const ox = 150;
  const oy = 150;
  const fx = ox + 110 * Math.cos(rad);
  const fy = oy - 110 * Math.sin(rad);

  return (
    <div className="widget">
      <div className="wtitle">Munka skalárszorzattal: W = F · D = |F|·|D|·cos θ</div>
      <div className="wcontrols">
        <label>Húzás szöge <b>θ = {deg}°</b> (|F| = 50 N, |D| = 10 m)<input type="range" min={0} max={180} step={5} value={deg} onChange={(e) => setDeg(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 195" className="plot">
        <line x1={30} y1={oy + 18} x2={510} y2={oy + 18} stroke="#64748b" strokeWidth={2} />
        <rect x={ox - 24} y={oy - 14} width={48} height={32} rx={6} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={1.6} />
        {/* Elmozdulás D */}
        <Arrow x1={ox + 26} y1={oy + 6} x2={ox + 220} y2={oy + 6} color="#94a3b8" width={2.4} />
        <text x={ox + 226} y={oy + 10} fill="#cbd5e1" fontSize={12} fontWeight={700}>D (10 m)</text>
        {/* F erő */}
        <Arrow x1={ox} y1={oy} x2={fx} y2={fy} color="#fbbf24" width={3} />
        {/* Hasznos komponens */}
        <Arrow x1={ox} y1={oy} x2={fx} y2={oy} color={fPar >= 0 ? '#34d399' : '#f87171'} width={2.6} />
        <line x1={fx} y1={fy} x2={fx} y2={oy} stroke="rgba(251,146,60,0.6)" strokeDasharray="3 3" />
        <text x={fx + 8} y={fy - 4} fill="#fbbf24" fontSize={12} fontWeight={700}>F = 50 N</text>
        <text x={24} y={28} fill={Wval > 0 ? '#34d399' : Wval < 0 ? '#f87171' : '#fbbf24'} fontSize={13} fontWeight={700}>
          W = {Wval.toFixed(1)} J  ({Wval > 0 ? 'gyorsító munka' : Wval < 0 ? 'fékező (negatív) munka' : '0 munka!'})
        </text>
      </svg>
      <div className="readout">
        Hasznos erőkomponens: <b>F_∥ = {fPar.toFixed(1)} N</b> · Merőleges (munkát nem végző) erő: <b>F_⊥ = {fPerp.toFixed(1)} N</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Pont–egyenes távolság normálvektorral */
export function PointLineDistDotWidget() {
  const [px, setPx] = useState(5);
  const [py, setPy] = useState(4);
  // Egyenes: 3x + 4y = 12 => n = <3, 4>, |n| = 5
  const dist = Math.abs(3 * px + 4 * py - 12) / 5;
  const X = (x: number) => 110 + x * 48;
  const Y = (y: number) => 185 - y * 34;

  // Talppont: P - ((3px+4py-12)/25)*<3,4>
  const t = (3 * px + 4 * py - 12) / 25;
  const fx = px - 3 * t;
  const fy = py - 4 * t;

  return (
    <div className="widget">
      <div className="wtitle">Pont–egyenes távolság skalárszorzattal: 3x + 4y = 12 (n = ⟨3, 4⟩)</div>
      <div className="wcontrols">
        <label>P_x = <b>{px}</b><input type="range" min={-1} max={7} step={0.5} value={px} onChange={(e) => setPx(+e.target.value)} /></label>
        <label>P_y = <b>{py}</b><input type="range" min={-1} max={5} step={0.5} value={py} onChange={(e) => setPy(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 215" className="plot">
        <line x1={30} y1={Y(0)} x2={510} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={14} x2={X(0)} y2={200} className="ax" />
        {/* 3x + 4y = 12 egyenes: (-1, 3.75) -> (6, -1.5) */}
        <line x1={X(-1)} y1={Y(3.75)} x2={X(6)} y2={Y(-1.5)} stroke="#38bdf8" strokeWidth={2.6} />
        {/* Normálvektor az (4,0)-ból */}
        <Arrow x1={X(4)} y1={Y(0)} x2={X(4 + 1.2)} y2={Y(1.6)} color="#34d399" width={2.2} />
        <text x={X(5.3)} y={Y(1.7)} fill="#34d399" fontSize={11.5} fontWeight={700}>n = ⟨3, 4⟩</text>
        {/* Merőleges távolságszakasz */}
        <line x1={X(px)} y1={Y(py)} x2={X(fx)} y2={Y(fy)} stroke="#fbbf24" strokeWidth={2.5} strokeDasharray="4 3" />
        <circle cx={X(px)} cy={Y(py)} r={5} fill="#fbbf24" stroke="#fff" strokeWidth={1.3} />
        <circle cx={X(fx)} cy={Y(fy)} r={3.5} fill="#38bdf8" />
        <text x={X(px) + 8} y={Y(py) - 6} fill="#fbbf24" fontSize={12} fontWeight={700}>P({px}; {py})</text>
      </svg>
      <div className="readout">
        Távolság: <b>d = |3·{px} + 4·{py} − 12| / √(3² + 4²) = {dist.toFixed(2)}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. A skalárszorzat 5 szuperereje */
export function DotProductFiveUsesDiagram() {
  const uses = [
    { k: '1. Hossz', f: '|v| = √(v · v)', c: '#38bdf8' },
    { k: '2. Hajlásszög', f: 'cos θ = (u · v) / (|u|·|v|)', c: '#2dd4bf' },
    { k: '3. Merőlegesség', f: 'u ⊥ v  ⇔  u · v = 0', c: '#34d399' },
    { k: '4. Vektorvetület', f: 'proj_v(u) = ((u · v) / |v|²) · v', c: '#fbbf24' },
    { k: '5. Fizikai munka', f: 'W = F · D = |F|·|D|·cos θ', c: '#fb923c' },
  ];
  return (
    <div className="widget">
      <div className="wtitle">A skalárszorzat 5 szuperereje (12.3 összefoglaló)</div>
      <svg viewBox="0 0 540 192" className="plot">
        {uses.map((u, i) => {
          const y = 10 + i * 35;
          return (
            <g key={u.k}>
              <rect x={12} y={y} width={516} height={29} rx={7} fill="rgba(255,255,255,0.04)" stroke={u.c} strokeWidth={1.3} />
              <text x={24} y={y + 19} fill={u.c} fontSize={12} fontWeight={700}>{u.k}</text>
              <text x={176} y={y + 19} fill="#e2e8f0" fontSize={12} fontWeight={600}>{u.f}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Cauchy–Schwarz-egyenlőtlenség */
export function CauchySchwarzDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">Cauchy–Schwarz-egyenlőtlenség: |u · v| ≤ |u|·|v|</div>
      <svg viewBox="0 0 540 115" className="plot">
        <rect x={14} y={14} width={512} height={86} rx={12} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={270} y={42} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>
          |u · v| = |u|·|v|·|cos θ|  ≤  |u|·|v|   (mert |cos θ| ≤ 1)
        </text>
        <text x={270} y={70} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>
          Egyenlőség pontosan akkor áll fenn, ha u és v párhuzamosak (θ = 0° vagy 180°)!
        </text>
      </svg>
    </div>
  );
}
