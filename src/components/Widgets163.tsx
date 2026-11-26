import { useState } from 'react';

/* ============================================================================
   16.3. Útfüggetlenség, potenciálfüggvény, konzervatív vektormező — 8 SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 5.5): string {
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

/* ------------------------------------------------------------------ 1. Szintvonalak és gradiensmező F = ∇f */
export function PotentialContourWidget() {
  const [rB, setRB] = useState(2.0);
  const cx = 270;
  const cy = 138;
  const sc = 44;

  // f(x, y) = 0.5 (x^2 + y^2), szintvonalak körök, F = <x, y> merőleges rájuk
  const rA = 0.8;
  const ax = cx + rA * sc * Math.cos(0.4);
  const ay = cy - rA * sc * Math.sin(0.4);
  const bx = cx + rB * sc * Math.cos(2.3);
  const by = cy - rB * sc * Math.sin(2.3);

  const fA = 0.5 * rA * rA;
  const fB = 0.5 * rB * rB;

  const arrows = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
    const a = (k / 8) * Math.PI * 2;
    const x1 = cx + 1.2 * sc * Math.cos(a);
    const y1 = cy - 1.2 * sc * Math.sin(a);
    const x2 = cx + 1.65 * sc * Math.cos(a);
    const y2 = cy - 1.65 * sc * Math.sin(a);
    return { x1, y1, x2, y2 };
  });

  return (
    <div className="widget">
      <div className="wtitle">Konzervatív erőtér F = ∇f: a szintvonalak „magassági vonalak”, a munka csak f(B) − f(A)!</div>
      <div className="controls">
        <label>
          B pont sugara r_B = {rB.toFixed(1)}
          <input type="range" min={1.0} max={2.3} step={0.1} value={rB} onChange={(e) => setRB(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 265" className="wsvg">
        {[0.8, 1.3, 1.8, 2.3].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r * sc} fill="none" stroke="#38bdf8" strokeOpacity="0.32" strokeDasharray="4 4" strokeWidth="1.2" />
        ))}
        {arrows.map((a, i) => (
          <g key={i}>
            <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#2dd4bf" strokeOpacity="0.6" strokeWidth="1.8" />
            <path d={arrowHead(a.x1, a.y1, a.x2, a.y2, 5)} fill="none" stroke="#2dd4bf" strokeOpacity="0.6" strokeWidth="1.6" />
          </g>
        ))}

        {/* Két teljesen eltérő út A-ból B-be */}
        <path d={`M${ax},${ay} Q${cx + 10},${cy - 85} ${bx},${by}`} fill="none" stroke="#34d399" strokeWidth="2.4" />
        <path d={`M${ax},${ay} Q${cx - 20},${cy + 95} ${bx},${by}`} fill="none" stroke="#fb923c" strokeWidth="2.4" />

        <circle cx={ax} cy={ay} r="5.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.4" />
        <circle cx={bx} cy={by} r="5.5" fill="#34d399" stroke="#0f172a" strokeWidth="1.4" />
        <text x={ax + 8} y={ay + 4} fill="#fbbf24" fontSize="12" fontWeight="700">A</text>
        <text x={bx - 18} y={by - 6} fill="#34d399" fontSize="12" fontWeight="700">B</text>

        <text x="16" y="22" fill="#e2e8f0" fontSize="12.5" fontWeight="600">
          f(x, y) = ½(x² + y²) · f(A) = {fA.toFixed(2)}, f(B) = {fB.toFixed(2)} ⇒ W = f(B) − f(A) = {(fB - fA).toFixed(2)}
        </text>
        <text x="16" y="254" fill="#94a3b8" fontSize="11.5">
          Zöld és narancs út teljesen különböző, mégis pontosan ugyanannyi szintvonalat keresztez ⇒ azonos munka!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Útfüggetlenség és zárt hurok */
export function PathIndependenceDemoWidget() {
  const [path, setPath] = useState<'line' | 'detour' | 'loop'>('detour');
  const A: [number, number] = [90, 180];
  const B: [number, number] = [270, 72];

  const pathD =
    path === 'line'
      ? `M${A[0]},${A[1]} L${B[0]},${B[1]}`
      : path === 'detour'
        ? `M${A[0]},${A[1]} C140,220 240,180 190,120 S290,130 ${B[0]},${B[1]}`
        : `M${A[0]},${A[1]} C120,40 280,50 260,150 C240,220 120,210 ${A[0]},${A[1]}`;

  return (
    <div className="widget">
      <div className="wtitle">A vonalintegrálok alaptétele: ∫_C ∇f · dr = f(B) − f(A) (zárt hurkon mindig 0!)</div>
      <div className="controls">
        <button className={path === 'line' ? 'active' : ''} onClick={() => setPath('line')}>Egyenes A → B</button>
        <button className={path === 'detour' ? 'active' : ''} onClick={() => setPath('detour')}>Vad kitérő A → B</button>
        <button className={path === 'loop' ? 'active' : ''} onClick={() => setPath('loop')}>Zárt hurok A → A</button>
      </div>
      <svg viewBox="0 0 540 230" className="wsvg">
        <path d={pathD} fill="none" stroke={path === 'loop' ? '#fbbf24' : '#38bdf8'} strokeWidth="2.8" />
        <circle cx={A[0]} cy={A[1]} r="5.5" fill="#fbbf24" />
        <text x={A[0] - 28} y={A[1] + 16} fill="#fbbf24" fontSize="11.5" fontWeight="700">A(0;0)</text>
        {path !== 'loop' && (
          <>
            <circle cx={B[0]} cy={B[1]} r="5.5" fill="#34d399" />
            <text x={B[0] + 8} y={B[1] + 4} fill="#34d399" fontSize="11.5" fontWeight="700">B(2;1)</text>
          </>
        )}

        <rect x="325" y="42" width="198" height="145" rx="10" fill="#0f172a" stroke="#34d399" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="340" y="68" fill="#e2e8f0" fontSize="12" fontWeight="700">f(x, y) = x²y + x</text>
        <text x="340" y="96" fill="#cbd5e1" fontSize="12">F = ⟨2xy + 1, x²⟩</text>
        <text x="340" y="132" fill="#34d399" fontSize="14.5" fontWeight="700">
          {path === 'loop' ? '∮ F · dr = 0' : '∫ F · dr = f(2,1) − f(0,0) = 6'}
        </text>
        <text x="340" y="162" fill="#94a3b8" fontSize="11">
          {path === 'loop' ? 'Visszatérve A-ba: f(A)−f(A)=0!' : 'A kitérő egyáltalán nem számít!'}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Komponens-teszt ellenőrző */
export function ComponentTestCheckerWidget() {
  const fields = [
    {
      name: '⟨2x cos y, −x² sin y⟩',
      my: '∂M/∂y = −2x sin y',
      nx: '∂N/∂x = −2x sin y',
      ok: true,
      pot: 'f(x, y) = x² cos y + C',
    },
    {
      name: '⟨y, 2x⟩',
      my: '∂M/∂y = 1',
      nx: '∂N/∂x = 2',
      ok: false,
      pot: '1 ≠ 2 → NEM létezik potenciálfüggvény!',
    },
    {
      name: '⟨3x² + y, x − 2y⟩',
      my: '∂M/∂y = 1',
      nx: '∂N/∂x = 1',
      ok: true,
      pot: 'f(x, y) = x³ + xy − y² + C',
    },
    {
      name: '⟨−y, x⟩ (örvény)',
      my: '∂M/∂y = −1',
      nx: '∂N/∂x = +1',
      ok: false,
      pot: '−1 ≠ +1 → NEM konzervatív (örvénylik!)',
    },
  ];
  const [sel, setSel] = useState(0);
  const cur = fields[sel];

  return (
    <div className="widget">
      <div className="wtitle">A 2D komponens-teszt (egyszeresen összefüggő tartományon): ∂M/∂y = ∂N/∂x?</div>
      <div className="controls">
        {fields.map((f, i) => (
          <button key={f.name} className={sel === i ? 'active' : ''} onClick={() => setSel(i)}>
            {f.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 175" className="wsvg">
        <rect x="16" y="14" width="508" height="146" rx="10" fill="#0f172a" stroke={cur.ok ? '#34d399' : '#f87171'} strokeOpacity="0.65" strokeWidth="1.6" />
        <text x="34" y="44" fill="#38bdf8" fontSize="14" fontWeight="700" fontFamily="monospace">F(x, y) = {cur.name}</text>
        <text x="34" y="76" fill="#cbd5e1" fontSize="13" fontFamily="monospace">{cur.my}    vs.    {cur.nx}</text>
        <text x="34" y="110" fill={cur.ok ? '#34d399' : '#f87171'} fontSize="14.5" fontWeight="700">
          {cur.ok ? '✓ KONZERVATÍV (egyeznek!)' : '✗ NEM KONZERVATÍV (eltérnek!)'}
        </text>
        <text x="34" y="140" fill="#fbbf24" fontSize="12.5" fontFamily="monospace">{cur.pot}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Potenciál-építő 3 lépéses folyamatábra */
export function PotentialBuilderWidget() {
  return (
    <div className="widget">
      <div className="wtitle">Hogyan építjük fel f(x, y, z)-t parciális integrálással? — A 3 lépcsős lánc</div>
      <svg viewBox="0 0 540 185" className="wsvg">
        <rect x="16" y="28" width="152" height="106" rx="9" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
        <text x="92" y="54" textAnchor="middle" fill="#38bdf8" fontSize="12.5" fontWeight="700">1. Integráld M-et x-re</text>
        <text x="92" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="11.5" fontFamily="monospace">f = ∫ M dx + g(y, z)</text>
        <text x="92" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10.5">„állandó” itt y, z-től</text>
        <text x="92" y="122" textAnchor="middle" fill="#94a3b8" fontSize="10.5">függő függvény!</text>

        <line x1="170" y1="81" x2="192" y2="81" stroke="#fbbf24" strokeWidth="2.2" />
        <path d={arrowHead(170, 81, 192, 81, 6)} fill="none" stroke="#fbbf24" strokeWidth="2" />

        <rect x="194" y="28" width="152" height="106" rx="9" fill="#0f172a" stroke="#34d399" strokeWidth="1.6" />
        <text x="270" y="54" textAnchor="middle" fill="#34d399" fontSize="12.5" fontWeight="700">2. Deriváld y-ra = N</text>
        <text x="270" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="11.5" fontFamily="monospace">f_y = N ⇒ g_y</text>
        <text x="270" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10.5">Integráld y-ra:</text>
        <text x="270" y="122" textAnchor="middle" fill="#94a3b8" fontSize="10.5">kapod g + h(z)!</text>

        <line x1="348" y1="81" x2="370" y2="81" stroke="#fbbf24" strokeWidth="2.2" />
        <path d={arrowHead(348, 81, 370, 81, 6)} fill="none" stroke="#fbbf24" strokeWidth="2" />

        <rect x="372" y="28" width="152" height="106" rx="9" fill="#0f172a" stroke="#fb923c" strokeWidth="1.6" />
        <text x="448" y="54" textAnchor="middle" fill="#fb923c" fontSize="12.5" fontWeight="700">3. Deriváld z-re = P</text>
        <text x="448" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="11.5" fontFamily="monospace">f_z = P ⇒ h′(z)</text>
        <text x="448" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10.5">Integráld z-re:</text>
        <text x="448" y="122" textAnchor="middle" fill="#94a3b8" fontSize="10.5">kész f(x,y,z) + C!</text>

        <text x="16" y="168" fill="#fbbf24" fontSize="11.5">
          Tipp: minden lépésben az „idegen” változóknak (pl. x a g_y-ban) KI KELL ESNIÜK — ez azonnali önellenőrzés!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. A lyukas tartomány csapdája */
export function PuncturedPlaneTrapWidget() {
  const [holed, setHoled] = useState(true);

  return (
    <div className="widget">
      <div className="wtitle">Egyszeresen összefüggő (nincs lyuk) vs. lyukas tartomány: miért bukik el a teszt az origó körül?</div>
      <div className="controls">
        <button className={!holed ? 'active' : ''} onClick={() => setHoled(false)}>Egyszeresen összefüggő (nincs lyuk)</button>
        <button className={holed ? 'active' : ''} onClick={() => setHoled(true)}>Lyukas sík ℝ² \ {'{(0,0)}'}</button>
      </div>
      <svg viewBox="0 0 540 220" className="wsvg">
        <rect x="36" y="34" width="210" height="152" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.8" />
        {/* Hurok */}
        <circle cx="141" cy="110" r="50" fill="none" stroke={holed ? '#f87171' : '#34d399'} strokeWidth="2.6" strokeDasharray={holed ? 'none' : '5 3'} />
        {holed && <circle cx="141" cy="110" r="9" fill="#0f172a" stroke="#f87171" strokeWidth="2.4" />}
        <text x="141" y="114" textAnchor="middle" fill={holed ? '#f87171' : '#34d399'} fontSize="11" fontWeight="700">
          {holed ? 'LYUK' : 'összehúzható'}
        </text>

        <rect x="268" y="34" width="252" height="152" rx="10" fill="#0f172a" stroke={holed ? '#f87171' : '#34d399'} strokeOpacity="0.6" strokeWidth="1.4" />
        {holed ? (
          <>
            <text x="284" y="64" fill="#f87171" fontSize="13" fontWeight="700">F = ⟨−y/(x²+y²), x/(x²+y²)⟩</text>
            <text x="284" y="92" fill="#cbd5e1" fontSize="12">M_y = N_x mindenhol teljesül,</text>
            <text x="284" y="114" fill="#cbd5e1" fontSize="12">MÉGIS ∮ F · dr = 2π ≠ 0!</text>
            <text x="284" y="144" fill="#fbbf24" fontSize="11.5">A hurok „fennakad” az origó lyukán,</text>
            <text x="284" y="162" fill="#fbbf24" fontSize="11.5">θ egy kör után 2π-t ugrik!</text>
          </>
        ) : (
          <>
            <text x="284" y="64" fill="#34d399" fontSize="13" fontWeight="700">Nincs lyuk a tartományban!</text>
            <text x="284" y="92" fill="#cbd5e1" fontSize="12">Minden zárt hurok egyetlen pontba</text>
            <text x="284" y="114" fill="#cbd5e1" fontSize="12">összehúzható a tartományon belül.</text>
            <text x="284" y="144" fill="#34d399" fontSize="11.5">Itt a komponens-teszt (M_y = N_x)</text>
            <text x="284" y="162" fill="#34d399" fontSize="11.5">100%-ban GARANTÁLJA a potenciált!</text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Egzakt differenciálforma */
export function ExactDiffFormWidget() {
  const [exact, setExact] = useState(true);

  return (
    <div className="widget">
      <div className="wtitle">Egzakt differenciálforma: M dx + N dy = df ⇔ az integrál egyetlen f(B) − f(A) kivonás!</div>
      <div className="controls">
        <button className={exact ? 'active' : ''} onClick={() => setExact(true)}>Egzakt: y dx + x dy = d(xy)</button>
        <button className={!exact ? 'active' : ''} onClick={() => setExact(false)}>Nem egzakt: y dx + 2x dy</button>
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke={exact ? '#34d399' : '#fb923c'} strokeOpacity="0.6" strokeWidth="1.5" />
        {exact ? (
          <>
            <text x="34" y="48" fill="#34d399" fontSize="14.5" fontWeight="700" fontFamily="monospace">∫_(1,2)^(3,4) (y dx + x dy) = [ x·y ]_(1,2)^(3,4) = 12 − 2 = 10</text>
            <text x="34" y="84" fill="#cbd5e1" fontSize="12.5">Mivel M_y = 1 = N_x, a kifejezés pontosan f(x, y) = xy teljes differenciálja!</text>
            <text x="34" y="116" fill="#94a3b8" fontSize="11.5">Az egzakt differenciálegyenlet y dx + x dy = 0 általános megoldása egyszerűen xy = C!</text>
          </>
        ) : (
          <>
            <text x="34" y="48" fill="#fb923c" fontSize="14.5" fontWeight="700" fontFamily="monospace">y dx + 2x dy  ≠  df   (mert M_y = 1 ≠ 2 = N_x)</text>
            <text x="34" y="84" fill="#cbd5e1" fontSize="12.5">Nincs olyan f(x, y) függvény, amelynek ez a teljes differenciálja lenne!</text>
            <text x="34" y="116" fill="#94a3b8" fontSize="11.5">A vonalintegrál kiszámításához meg KELL adni a konkrét C görbét (paraméterezéssel).</text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Energiamegmaradás hullámvasúton */
export function EnergyConservationRollerWidget() {
  const [x, setX] = useState(0.35);
  // Domborzat: h(x) = 0.55 + 0.35 cos(2 pi x) in [0.2, 0.9], összenergia E = 1.0
  const h = (u: number) => 0.52 + 0.36 * Math.cos(2 * Math.PI * u);
  const U = h(x);
  const K = 1.0 - U;

  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const u = i / 60;
    pts.push(`${i ? 'L' : 'M'}${(35 + u * 270).toFixed(1)},${(200 - h(u) * 145).toFixed(1)}`);
  }
  const px = 35 + x * 270;
  const py = 200 - U * 145;

  return (
    <div className="widget">
      <div className="wtitle">Energiamegmaradás: konzervatív erőtérben (F = −∇U) a K + U összenergia mindig állandó!</div>
      <div className="controls">
        <label>
          Kocsi pozíciója: {(x * 100).toFixed(0)}%
          <input type="range" min={0} max={1} step={0.02} value={x} onChange={(e) => setX(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 230" className="wsvg">
        <line x1="30" y1="200" x2="315" y2="200" stroke="#475569" strokeWidth="1.2" />
        <path d={pts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth="2.8" />
        <circle cx={px} cy={py} r="6" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />

        {/* Energia sávok jobb oldalon */}
        <rect x="355" y="45" width="46" height="155" rx="5" fill="#1e293b" />
        <rect x="355" y={200 - K * 155} width="46" height={K * 155} rx="5" fill="#34d399" />
        <text x="378" y="218" textAnchor="middle" fill="#34d399" fontSize="11.5" fontWeight="700">K</text>

        <rect x="418" y="45" width="46" height="155" rx="5" fill="#1e293b" />
        <rect x="418" y={200 - U * 155} width="46" height={U * 155} rx="5" fill="#fb923c" />
        <text x="441" y="218" textAnchor="middle" fill="#fb923c" fontSize="11.5" fontWeight="700">U</text>

        <rect x="481" y="45" width="46" height="155" rx="5" fill="#38bdf8" fillOpacity="0.85" />
        <text x="504" y="218" textAnchor="middle" fill="#38bdf8" fontSize="11.5" fontWeight="700">K+U</text>

        <text x="20" y="24" fill="#e2e8f0" fontSize="12">
          K = {(K * 100).toFixed(0)}% · U = {(U * 100).toFixed(0)}% · E = K + U = 100% (állandó!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-térkép */
export function ConservativeMasterMapDiagram() {
  const rows = [
    { label: 'Alaptétel (Newton–L.)', expr: '∫_C ∇f · dr = f(B) − f(A)   (útfüggetlen!)', color: '#34d399' },
    { label: 'Zárt hurok tulajdons.', expr: 'F konzervatív  ⇔  ∮_C F · dr = 0 minden zárt C-n', color: '#38bdf8' },
    { label: '2D komponens-teszt', expr: '∂M/∂y = ∂N/∂x   (egyszeresen összefüggő tartományon!)', color: '#fbbf24' },
    { label: '3D komponens-teszt', expr: 'P_y = N_z,  M_z = P_x,  N_x = M_y   (rot F = 0)', color: '#2dd4bf' },
    { label: 'Energiamegmaradás', expr: 'F = −∇U  ⇒  K(A) + U(A) = K(B) + U(B)', color: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 16.3 fejezet mester-képlettára — konzervatív vektormezők és potenciálfüggvény</div>
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
