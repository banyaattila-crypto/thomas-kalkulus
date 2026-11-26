import { useState } from 'react';

/* ============================================================================
   16.7. Stokes-tétel — 8 interaktív 2D/3D és magyarázó SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const pathFrom = (pts: [number, number][]) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 6): string {
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

/* ------------------------------------------------------------------ 1. 3D rotáció-detektor */
export function Curl3DDetectorWidget() {
  const fields = [
    { name: '⟨−y, x, 0⟩', curl: '⟨0, 0, 2⟩', col: '#34d399', desc: 'Merev test forgása a z-tengely körül (ω = k): rot F = 2ω = 2k!' },
    { name: '⟨0, −z, y⟩', curl: '⟨2, 0, 0⟩', col: '#38bdf8', desc: 'Forgás az x-tengely körül: a rotáció pontosan a forgástengelyre mutat!' },
    { name: '⟨yz, xz, xy⟩', curl: '⟨0, 0, 0⟩', col: '#fbbf24', desc: 'Konzervatív mező (∇(xyz)): a rotációja mindenhol nulla (örvénymentes)!' },
    { name: '⟨z, x, y⟩', curl: '⟨1, 1, 1⟩', col: '#fb923c', desc: 'Állandó ⟨1, 1, 1⟩ forgástengelyű 3D örvénymező!' },
  ];
  const [sel, setSel] = useState(0);
  const cur = fields[sel];

  return (
    <div className="widget">
      <div className="wtitle">A 3D rotáció (∇ × F): iránya a helyi forgástengely, nagysága a szögsebesség kétszerese!</div>
      <div className="controls">
        {fields.map((f, i) => (
          <button key={f.name} className={sel === i ? 'active' : ''} onClick={() => setSel(i)}>
            {f.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke={cur.col} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="34" y="46" fill="#e2e8f0" fontSize="14" fontWeight="700" fontFamily="monospace">F(x, y, z) = {cur.name}</text>
        <text x="34" y="84" fill={cur.col} fontSize="15" fontWeight="700" fontFamily="monospace">rot F = ∇ × F = {cur.curl}</text>
        <text x="34" y="124" fill="#cbd5e1" fontSize="12">{cur.desc}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Stokes-tétel jobbkéz-szabály 3D-ben */
export function StokesDomeRightHand3DWidget() {
  const [up, setUp] = useState(true);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 195, 58, yaw, 22);

  // Félgömb kupola z = sqrt(R^2 - r^2)
  const R = 1.6;
  const rings: string[] = [];
  for (let k = 0; k <= 3; k++) {
    const phi = (k / 3) * (Math.PI / 2);
    const r = R * Math.sin(phi);
    const z = R * Math.cos(phi);
    const pts: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const th = (i / 40) * Math.PI * 2;
      pts.push(P(r * Math.cos(th), r * Math.sin(th), z));
    }
    rings.push(pathFrom(pts));
  }

  const Top = P(0, 0, R);
  const Nend = up ? P(0, 0, R + 0.75) : P(0, 0, R - 0.75);
  // Perem nyíl C-n
  const a1 = 0.2;
  const a2 = up ? 0.65 : -0.25;
  const C1 = P(R * Math.cos(a1), R * Math.sin(a1), 0);
  const C2 = P(R * Math.cos(a2), R * Math.sin(a2), 0);

  return (
    <div className="widget">
      <div className="wtitle">Stokes-tétel jobbkéz-szabálya: ha a hüvelykujj n irányába mutat, az ujjak adják C irányát!</div>
      <div className="controls">
        <button className={up ? 'active' : ''} onClick={() => setUp(true)}>n kifelé/felfelé ⇒ C CCW (↺)</button>
        <button className={!up ? 'active' : ''} onClick={() => setUp(false)}>n befelé/lefelé ⇒ C CW (↻)</button>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {rings.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={i === 3 ? '#34d399' : '#38bdf8'} strokeOpacity={i === 3 ? 1 : 0.45} strokeWidth={i === 3 ? 2.8 : 1.3} />
        ))}
        {/* C iránynyíl */}
        <line x1={C1[0]} y1={C1[1]} x2={C2[0]} y2={C2[1]} stroke="#34d399" strokeWidth="3.2" />
        <path d={arrowHead(C1[0], C1[1], C2[0], C2[1], 8)} fill="none" stroke="#34d399" strokeWidth="2.8" />
        <text x={C2[0] + 10} y={C2[1] + 6} fill="#34d399" fontSize="13" fontWeight="700">C</text>

        {/* n normálvektor */}
        <line x1={Top[0]} y1={Top[1]} x2={Nend[0]} y2={Nend[1]} stroke="#fb923c" strokeWidth="3" />
        <path d={arrowHead(Top[0], Top[1], Nend[0], Nend[1], 8)} fill="none" stroke="#fb923c" strokeWidth="2.6" />
        <text x={Nend[0] + 8} y={Nend[1] + 4} fill="#fb923c" fontSize="13" fontWeight="700">n</text>

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          ∮_C F · dr = ∬_S (∇ × F) · n dσ
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Zöld: C peremgörbe · Cián: S kupolafelület · Narancs: n egységnormális (jobbkéz-szabály!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Ferde sík és henger metszése Stokes-szal */
export function TiltedPlaneStokes3DWidget() {
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 175, 48, yaw, 22);

  const ellPts: [number, number][] = [];
  const basePts: [number, number][] = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    const x = 1.4 * Math.cos(t);
    const y = 1.4 * Math.sin(t);
    ellPts.push(P(x, y, 1.2 - 0.5 * y));
    basePts.push(P(x, y, 0));
  }
  const C0 = P(0, 0, 1.2);
  const Nend = P(0, 0.55, 1.2 + 0.95);

  return (
    <div className="widget">
      <div className="wtitle">Ferde 3D ellipszis C (henger ∩ sík): Stokes-szal egy sima síklap S felületi integrálja!</div>
      <div className="controls">
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 260" className="wsvg">
        <path d={pathFrom(basePts)} fill="none" stroke="#64748b" strokeDasharray="4 4" strokeWidth="1.4" />
        <path d={`${pathFrom(ellPts)} Z`} fill="#38bdf8" fillOpacity="0.22" stroke="#34d399" strokeWidth="2.8" />
        <line x1={C0[0]} y1={C0[1]} x2={Nend[0]} y2={Nend[1]} stroke="#fb923c" strokeWidth="2.8" />
        <path d={arrowHead(C0[0], C0[1], Nend[0], Nend[1], 7)} fill="none" stroke="#fb923c" strokeWidth="2.4" />
        <text x={Nend[0] + 8} y={Nend[1]} fill="#fb923c" fontSize="12.5" fontWeight="700">n ∥ ⟨0, 1, 1⟩</text>
        <text x="16" y="22" fill="#e2e8f0" fontSize="12">
          Ahelyett, hogy 3D-ben paramétereznénk C-t, integráljuk ∇×F-et a ferde z = 2 − y síklapon!
        </text>
        <text x="16" y="248" fill="#94a3b8" fontSize="11.5">
          Szaggatott: xy-árnyék (x² + y² ≤ 1 körlemez) · Zöld: ferde C ellipszis · Cián: S síklap
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Felületfüggetlenség (4 különböző sapka!) */
export function SurfaceIndependence3DWidget() {
  const [cap, setCap] = useState<'disk' | 'hemi' | 'cone' | 'parab'>('hemi');
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 198, 56, yaw, 22);
  const R = 1.6;

  const basePts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) {
    const th = (i / 40) * Math.PI * 2;
    basePts.push(P(R * Math.cos(th), R * Math.sin(th), 0));
  }

  const ribs: string[] = [];
  if (cap !== 'disk') {
    for (let k = 0; k < 8; k++) {
      const th = (k / 8) * Math.PI * 2;
      const pts: [number, number][] = [];
      for (let i = 0; i <= 14; i++) {
        const r = (R * i) / 14;
        const z =
          cap === 'hemi'
            ? Math.sqrt(Math.max(0, R * R - r * r))
            : cap === 'cone'
              ? 1.7 * (1 - r / R)
              : 1.7 * (1 - (r * r) / (R * R));
        pts.push(P(r * Math.cos(th), r * Math.sin(th), z));
      }
      ribs.push(pathFrom(pts));
    }
  }

  return (
    <div className="widget">
      <div className="wtitle">Felületfüggetlenség: bármely S sapkát választod ugyanarra a C peremre, a rotáció fluxusa AZONOS!</div>
      <div className="controls">
        <button className={cap === 'hemi' ? 'active' : ''} onClick={() => setCap('hemi')}>Félgömb</button>
        <button className={cap === 'parab' ? 'active' : ''} onClick={() => setCap('parab')}>Paraboloid</button>
        <button className={cap === 'cone' ? 'active' : ''} onClick={() => setCap('cone')}>Kúp</button>
        <button className={cap === 'disk' ? 'active' : ''} onClick={() => setCap('disk')}>Sík körlemez (legkönnyebb!)</button>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {cap === 'disk' && <path d={`${pathFrom(basePts)} Z`} fill="#34d399" fillOpacity="0.22" />}
        {ribs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="1.5" />
        ))}
        <path d={`${pathFrom(basePts)} Z`} fill="none" stroke="#fbbf24" strokeWidth="3" />
        <text x="16" y="22" fill="#34d399" fontSize="12.5" fontWeight="700">
          Mind a 4 felület pereme ugyanaz az arany C kör ⇒ ∬_S (∇ × F) · n dσ MIND A 4-EN UGYANANNYI!
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Vizsgatrükk: ha egy bonyolult kupolán kell (∇×F) fluxust számolni, cseréld le a lapos z = 0 körlemezre!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Két vektoranalitikai azonosság lánca */
export function VectorIdentitiesChainWidget() {
  return (
    <div className="widget">
      <div className="wtitle">A két nagy null-azonosság: bármely két egymást követő művelet mindig 0-t ad!</div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="18" y="34" width="110" height="58" rx="9" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" />
        <text x="73" y="60" textAnchor="middle" fill="#38bdf8" fontSize="13.5" fontWeight="700">Skalármező f</text>
        <text x="73" y="79" textAnchor="middle" fill="#94a3b8" fontSize="10.5">(potenciál)</text>

        <line x1="130" y1="63" x2="176" y2="63" stroke="#fbbf24" strokeWidth="2.4" />
        <path d={arrowHead(130, 63, 176, 63, 6)} fill="none" stroke="#fbbf24" strokeWidth="2.2" />
        <text x="153" y="53" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="700">grad ∇</text>

        <rect x="178" y="34" width="118" height="58" rx="9" fill="#0f172a" stroke="#34d399" strokeWidth="1.8" />
        <text x="237" y="60" textAnchor="middle" fill="#34d399" fontSize="13.5" fontWeight="700">Vektormező F</text>
        <text x="237" y="79" textAnchor="middle" fill="#94a3b8" fontSize="10.5">(erőtér)</text>

        <line x1="298" y1="63" x2="344" y2="63" stroke="#fb923c" strokeWidth="2.4" />
        <path d={arrowHead(298, 63, 344, 63, 6)} fill="none" stroke="#fb923c" strokeWidth="2.2" />
        <text x="321" y="53" textAnchor="middle" fill="#fb923c" fontSize="12" fontWeight="700">rot ∇×</text>

        <rect x="346" y="34" width="102" height="58" rx="9" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.8" />
        <text x="397" y="60" textAnchor="middle" fill="#2dd4bf" fontSize="13.5" fontWeight="700">∇ × F</text>
        <text x="397" y="79" textAnchor="middle" fill="#94a3b8" fontSize="10.5">(örvény)</text>

        <line x1="450" y1="63" x2="492" y2="63" stroke="#f87171" strokeWidth="2.4" />
        <path d={arrowHead(450, 63, 492, 63, 6)} fill="none" stroke="#f87171" strokeWidth="2.2" />
        <text x="471" y="53" textAnchor="middle" fill="#f87171" fontSize="11.5" fontWeight="700">div ∇·</text>
        <text x="510" y="68" fill="#f87171" fontSize="16" fontWeight="700">0</text>

        <text x="24" y="128" fill="#34d399" fontSize="12.5" fontWeight="700" fontFamily="monospace">1)  ∇ × (∇f) = 0     (minden gradiens örvénymentes)</text>
        <text x="24" y="150" fill="#fb923c" fontSize="12.5" fontWeight="700" fontFamily="monospace">2)  ∇ · (∇ × F) = 0  (minden rotáció forrásmentes)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Zárt gömb felvágása két félgömbre */
export function ClosedSphereCancel3DWidget() {
  return (
    <div className="widget">
      <div className="wtitle">Miért mindig 0 a rotáció fluxusa ZÁRT felületen (pl. gömbön)? Az Egyenlítő kioltja önmagát!</div>
      <svg viewBox="0 0 540 205" className="wsvg">
        {/* Északi félgömb */}
        <path d="M 90,95 A 75,75 0 0,1 240,95" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2.2" />
        <ellipse cx="165" cy="95" rx="75" ry="18" fill="none" stroke="#34d399" strokeWidth="2.4" />
        <text x="165" y="52" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="700">S₁ (észak) · +C (CCW)</text>

        {/* Déli félgömb eltolva */}
        <path d="M 90,122 A 75,75 0 0,0 240,122" fill="#fb923c" fillOpacity="0.2" stroke="#fb923c" strokeWidth="2.2" />
        <ellipse cx="165" cy="122" rx="75" ry="18" fill="none" stroke="#f87171" strokeWidth="2.4" />
        <text x="165" y="168" textAnchor="middle" fill="#fb923c" fontSize="12" fontWeight="700">S₂ (dél) · −C (CW)</text>

        <rect x="278" y="34" width="244" height="138" rx="10" fill="#0f172a" stroke="#fbbf24" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="294" y="64" fill="#fbbf24" fontSize="13.5" fontWeight="700">Zárt felületen nincs perem!</text>
        <text x="294" y="96" fill="#cbd5e1" fontSize="12" fontFamily="monospace">∬(S₁) + ∬(S₂) = ∮(+C) + ∮(−C)</text>
        <text x="294" y="128" fill="#34d399" fontSize="14.5" fontWeight="700" fontFamily="monospace">= ∮_C F·dr − ∮_C F·dr = 0 !</text>
        <text x="294" y="156" fill="#94a3b8" fontSize="11">Ezért ∯ (∇×F) · n dσ = 0 mindig!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Maxwell / Faraday indukció */
export function MaxwellFaradayWidget() {
  const [dBdt, setDBdt] = useState(1.5);

  return (
    <div className="widget">
      <div className="wtitle">Faraday indukciós törvénye = Stokes-tétel! Változó mágneses mező (∂B/∂t) elektromos örvényt (E) kelt!</div>
      <div className="controls">
        <label>
          Mágneses fluxus változás dΦ_B/dt = {dBdt.toFixed(1)}
          <input type="range" min={-2.5} max={2.5} step={0.1} value={dBdt} onChange={(e) => setDBdt(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 190" className="wsvg">
        {/* Dróthurok */}
        <ellipse cx="165" cy="105" rx="95" ry="42" fill="#38bdf8" fillOpacity="0.14" stroke={Math.abs(dBdt) < 0.05 ? '#64748b' : dBdt > 0 ? '#fb923c' : '#34d399'} strokeWidth="3.2" />
        {/* B mező nyilak függőlegesen */}
        {[125, 165, 205].map((x) => (
          <g key={x}>
            <line x1={x} y1="150" x2={x} y2="48" stroke="#38bdf8" strokeWidth="2.2" />
            <path d={arrowHead(x, 150, x, 48, 6)} fill="none" stroke="#38bdf8" strokeWidth="2" />
          </g>
        ))}
        <text x="165" y="34" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="700">B(t) mágneses tér</text>

        <rect x="290" y="30" width="234" height="132" rx="10" fill="#0f172a" stroke="#fbbf24" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="306" y="58" fill="#fbbf24" fontSize="12.5" fontWeight="700" fontFamily="monospace">∮_C E · dr = −dΦ_B / dt</text>
        <text x="306" y="88" fill="#34d399" fontSize="12.5" fontWeight="700" fontFamily="monospace">∇ × E = −∂B / ∂t</text>
        <text x="306" y="122" fill="#e2e8f0" fontSize="12">
          Indukált feszültség: ε = {(-dBdt).toFixed(1)} V
        </text>
        <text x="306" y="146" fill="#94a3b8" fontSize="11">
          {Math.abs(dBdt) < 0.05 ? 'Állandó B-nél nincs indukció!' : 'A köráram iránya a Lenz-törvényt követi!'}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-képlettár */
export function StokesMasterMapDiagram() {
  const rows = [
    { label: '3D rotáció ∇ × F', expr: '⟨P_y − N_z,  M_z − P_x,  N_x − M_y⟩   (forgástengely)', color: '#38bdf8' },
    { label: 'Stokes-tétel', expr: '∮_C F · dr = ∬_S (∇ × F) · n dσ   (jobbkéz-szabály!)', color: '#34d399' },
    { label: 'Felületfüggetlenség', expr: 'Azonos C peremű S₁, S₂ felületeken a rot-fluxus azonos!', color: '#fbbf24' },
    { label: 'Zárt felületen', expr: '∯_S (∇ × F) · n dσ = 0   (mert nincs pereme!)', color: '#fb923c' },
    { label: 'Null-azonosságok', expr: '∇ × (∇f) = 0   és   ∇ · (∇ × F) = 0', color: '#2dd4bf' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 16.7 fejezet mester-képlettára — rotáció és Stokes-tétel</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="600">{r.label}</text>
              <text x="180" y={y + 23} fill={r.color} fontSize="11.2" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
