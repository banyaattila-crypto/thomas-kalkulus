import { useState } from 'react';

/* ============================================================================
   16.4. Green-tétel a síkban — 8 interaktív 2D és magyarázó SVG widget
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

/* ------------------------------------------------------------------ 1. 2D divergencia és 2D rotáció (lapátkerék) */
export function PaddlewheelDivCurlWidget() {
  const fields = [
    { name: 'Örvény ⟨−y, x⟩', div: '0 + 0 = 0', curl: '1 − (−1) = +2', col: '#34d399', desc: 'A kis lapátkerék gyorsan forog CCW (rot = +2), de a folyadék nem tágul (div = 0)!' },
    { name: 'Forrás ⟨x, y⟩', div: '1 + 1 = +2', curl: '0 − 0 = 0', col: '#fb923c', desc: 'A buborék minden irányba tágul (div = +2), de a lapátkerék nem forog (rot = 0)!' },
    { name: 'Nyírás ⟨y, 0⟩', div: '0 + 0 = 0', curl: '0 − 1 = −1', col: '#38bdf8', desc: 'Felül gyorsabb áramlás jobbra → a lapátkerék óramutató irányba forog (rot = −1)!' },
    { name: 'Kevert ⟨x−y, x+y⟩', div: '1 + 1 = +2', curl: '1 − (−1) = +2', col: '#fbbf24', desc: 'Egyszerre tágul (div = +2) és forog (rot = +2) minden pontban!' },
  ];
  const [sel, setSel] = useState(0);
  const cur = fields[sel];

  return (
    <div className="widget">
      <div className="wtitle">Helyi sűrűségek: divergencia (M_x + N_y = tágulás) és 2D rotáció (N_x − M_y = forgás)!</div>
      <div className="controls">
        {fields.map((f, i) => (
          <button key={f.name} className={sel === i ? 'active' : ''} onClick={() => setSel(i)}>
            {f.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 180" className="wsvg">
        <rect x="16" y="14" width="508" height="152" rx="10" fill="#0f172a" stroke={cur.col} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="34" y="44" fill={cur.col} fontSize="14.5" fontWeight="700" fontFamily="monospace">F(x, y) = {cur.name}</text>
        <text x="34" y="80" fill="#fb923c" fontSize="13.5" fontWeight="700" fontFamily="monospace">div F = ∂M/∂x + ∂N/∂y = {cur.div}</text>
        <text x="34" y="110" fill="#34d399" fontSize="13.5" fontWeight="700" fontFamily="monospace">rot_z F = ∂N/∂x − ∂M/∂y = {cur.curl}</text>
        <text x="34" y="146" fill="#cbd5e1" fontSize="12">{cur.desc}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Green-tétel belső él-kioltódása */
export function GreenGridCancellationWidget() {
  const [n, setN] = useState(3);
  const x0 = 155;
  const y0 = 38;
  const size = 180;
  const step = size / n;

  const cells: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      cells.push({ x: x0 + i * step, y: y0 + j * step });
    }
  }

  return (
    <div className="widget">
      <div className="wtitle">Miért igaz Green tétele? A belső éleken az ellentétes nyilak kioltják egymást, csak a C perem marad!</div>
      <div className="controls">
        <label>
          Felosztás {n} × {n} cella ({n * n} kis hurok)
          <input type="range" min={2} max={5} step={1} value={n} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 250" className="wsvg">
        {cells.map((c, idx) => (
          <g key={idx}>
            <rect x={c.x + 3} y={c.y + 3} width={step - 6} height={step - 6} rx="3" fill="#38bdf8" fillOpacity="0.1" stroke="#fb923c" strokeOpacity="0.55" strokeDasharray="3 2" strokeWidth="1.2" />
            <text x={c.x + step / 2} y={c.y + step / 2 + 4} textAnchor="middle" fill="#fb923c" fontSize="12">↺</text>
          </g>
        ))}
        {/* Külső perem C (CCW, világító zöld) */}
        <rect x={x0} y={y0} width={size} height={size} fill="none" stroke="#34d399" strokeWidth="3.2" />
        <path d={arrowHead(x0 + 40, y0 + size, x0 + size - 40, y0 + size, 8)} fill="none" stroke="#34d399" strokeWidth="2.8" />
        <path d={arrowHead(x0 + size, y0 + size - 40, x0 + size, y0 + 40, 8)} fill="none" stroke="#34d399" strokeWidth="2.8" />
        <path d={arrowHead(x0 + size - 40, y0, x0 + 40, y0, 8)} fill="none" stroke="#34d399" strokeWidth="2.8" />
        <path d={arrowHead(x0, y0 + 40, x0, y0 + size - 40, 8)} fill="none" stroke="#34d399" strokeWidth="2.8" />

        <text x="360" y="96" fill="#34d399" fontSize="13" fontWeight="700">Külső perem C (CCW):</text>
        <text x="360" y="118" fill="#cbd5e1" fontSize="12">megmarad → ∮_C F · dr</text>
        <text x="360" y="152" fill="#fb923c" fontSize="13" fontWeight="700">Belső közös élek:</text>
        <text x="360" y="174" fill="#cbd5e1" fontSize="12">→ és ← kioltja egymást!</text>
        <text x="16" y="240" fill="#94a3b8" fontSize="11.5">
          Összegezve az apró hurkokat: ∑ (N_x − M_y) ΔA → ∬_R (N_x − M_y) dA = ∮_C (M dx + N dy)!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Green két alakja körlemezen */
export function GreenTwoFormsCompareWidget() {
  const [R, setR] = useState(2.0);
  const [a, setA] = useState(1.5);
  const [b, setB] = useState(1.0);
  const area = Math.PI * R * R;

  return (
    <div className="widget">
      <div className="wtitle">Green-tétel két alakja az F = ⟨ax − by, bx + ay⟩ mezőre az R sugarú körlemezen</div>
      <div className="controls">
        <label>
          Sugár R = {R.toFixed(1)}
          <input type="range" min={1.0} max={3.0} step={0.2} value={R} onChange={(e) => setR(+e.target.value)} />
        </label>
        <label>
          Forrás a = {a.toFixed(1)}
          <input type="range" min={-2} max={2} step={0.5} value={a} onChange={(e) => setA(+e.target.value)} />
        </label>
        <label>
          Örvény b = {b.toFixed(1)}
          <input type="range" min={-2} max={2} step={0.5} value={b} onChange={(e) => setB(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 185" className="wsvg">
        <rect x="16" y="16" width="246" height="150" rx="10" fill="#0f172a" stroke="#34d399" strokeWidth="1.6" />
        <text x="32" y="42" fill="#34d399" fontSize="13.5" fontWeight="700">Cirkulációs alak (Stokes 2D)</text>
        <text x="32" y="70" fill="#cbd5e1" fontSize="12" fontFamily="monospace">∮ M dx + N dy = ∬ (N_x − M_y) dA</text>
        <text x="32" y="100" fill="#fbbf24" fontSize="12.5" fontFamily="monospace">N_x − M_y = 2b = {(2 * b).toFixed(1)}</text>
        <text x="32" y="138" fill="#34d399" fontSize="14.5" fontWeight="700">Cirkuláció = {(2 * b * area).toFixed(2)}</text>

        <rect x="278" y="16" width="246" height="150" rx="10" fill="#0f172a" stroke="#fb923c" strokeWidth="1.6" />
        <text x="294" y="42" fill="#fb923c" fontSize="13.5" fontWeight="700">Fluxus-alak (Gauss 2D)</text>
        <text x="294" y="70" fill="#cbd5e1" fontSize="12" fontFamily="monospace">∮ M dy − N dx = ∬ (M_x + N_y) dA</text>
        <text x="294" y="100" fill="#fbbf24" fontSize="12.5" fontFamily="monospace">M_x + N_y = 2a = {(2 * a).toFixed(1)}</text>
        <text x="294" y="138" fill="#fb923c" fontSize="14.5" fontWeight="700">Fluxus = {(2 * a * area).toFixed(2)}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. „Ijesztő” tagok eltűnése Green-tétellel */
export function GreenShortcutDemoWidget() {
  const [step, setStep] = useState<0 | 1 | 2>(1);

  return (
    <div className="widget">
      <div className="wtitle">Green-tétel szuperereje: a csak x-től függő M(x) és csak y-tól függő N(y) tagok ELTŰNNEK!</div>
      <div className="controls">
        <button className={step === 0 ? 'active' : ''} onClick={() => setStep(0)}>1. Eredeti ijesztő integrál</button>
        <button className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>2. N_x − M_y kiszámítása</button>
        <button className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>3. Azonnali végeredmény!</button>
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="1.5" />
        {step === 0 && (
          <>
            <text x="32" y="54" fill="#f87171" fontSize="14.5" fontWeight="700" fontFamily="monospace">∮_{'{x²+y²=4}'} [ (e^(x²) + 3y) dx + (5x + sin(y³)) dy ]</text>
            <text x="32" y="96" fill="#cbd5e1" fontSize="12.5">Közvetlen paraméterezéssel reménytelen: e^(x²) és sin(y³) nem integrálható elemien!</text>
          </>
        )}
        {step === 1 && (
          <>
            <text x="32" y="52" fill="#34d399" fontSize="14" fontWeight="700" fontFamily="monospace">∂N/∂x = 5 + 0 = 5     ·     ∂M/∂y = 0 + 3 = 3</text>
            <text x="32" y="88" fill="#fbbf24" fontSize="15" fontWeight="700" fontFamily="monospace">∂N/∂x − ∂M/∂y = 5 − 3 = 2  (KONSTANS!)</text>
            <text x="32" y="124" fill="#94a3b8" fontSize="12">Az e^(x²) és sin(y³) egyetlen deriválással nyomtalanul eltűnt!</text>
          </>
        )}
        {step === 2 && (
          <>
            <text x="32" y="54" fill="#34d399" fontSize="15.5" fontWeight="700" fontFamily="monospace">∬_{'{x²+y²≤4}'} 2 dA = 2 · Ter(kör) = 2 · (4π) = 8π !</text>
            <text x="32" y="100" fill="#cbd5e1" fontSize="12.5">5 másodperces megoldás — ez Green tételének legkedveltebb vizsgaalkalmazása!</text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Területszámítás vonalintegrállal (planiméter) */
export function GreenAreaPlanimeterWidget() {
  const [shape, setShape] = useState<'ellip' | 'astroid' | 'tri'>('ellip');
  const cx = 195;
  const cy = 126;

  let pathD = '';
  let formula = '';
  let areaText = '';
  if (shape === 'ellip') {
    const pts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const t = (i / 60) * Math.PI * 2;
      pts.push(`${i ? 'L' : 'M'}${(cx + 95 * Math.cos(t)).toFixed(1)},${(cy - 62 * Math.sin(t)).toFixed(1)}`);
    }
    pathD = `${pts.join(' ')} Z`;
    formula = 'r(t) = ⟨a cos t, b sin t⟩';
    areaText = '½ ∮ (x dy − y dx) = π a b';
  } else if (shape === 'astroid') {
    const pts: string[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * Math.PI * 2;
      const c = Math.cos(t), s = Math.sin(t);
      pts.push(`${i ? 'L' : 'M'}${(cx + 88 * c * c * c).toFixed(1)},${(cy - 88 * s * s * s).toFixed(1)}`);
    }
    pathD = `${pts.join(' ')} Z`;
    formula = 'r(t) = ⟨a cos³t, a sin³t⟩';
    areaText = '½ ∮ (x dy − y dx) = (3/8) π a²';
  } else {
    pathD = `M${cx - 80},${cy + 58} L${cx + 85},${cy + 58} L${cx - 10},${cy - 70} Z`;
    formula = 'Csúcsok: (x₁,y₁), (x₂,y₂), (x₃,y₃)';
    areaText = 'Cipőfűző-képlet: ½ ∑ (xₖ yₖ₊₁ − xₖ₊₁ yₖ)';
  }

  return (
    <div className="widget">
      <div className="wtitle">Területszámítás csak a perem mentén (planiméter): Ter(R) = ½ ∮_C (x dy − y dx)</div>
      <div className="controls">
        <button className={shape === 'ellip' ? 'active' : ''} onClick={() => setShape('ellip')}>Ellipszis</button>
        <button className={shape === 'astroid' ? 'active' : ''} onClick={() => setShape('astroid')}>Asztroid</button>
        <button className={shape === 'tri' ? 'active' : ''} onClick={() => setShape('tri')}>Sokszög (cipőfűző)</button>
      </div>
      <svg viewBox="0 0 540 235" className="wsvg">
        <path d={pathD} fill="#38bdf8" fillOpacity="0.22" stroke="#34d399" strokeWidth="2.6" />
        <rect x="315" y="45" width="210" height="145" rx="10" fill="#0f172a" stroke="#34d399" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="330" y="76" fill="#38bdf8" fontSize="12" fontWeight="700">{formula}</text>
        <text x="330" y="114" fill="#fbbf24" fontSize="12" fontWeight="700" fontFamily="monospace">{areaText}</text>
        <text x="330" y="154" fill="#94a3b8" fontSize="11">M = −y/2, N = x/2 ⇒ N_x − M_y = 1!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Lyukas tartomány és deformációs elv */
export function GreenHoleBridgeWidget() {
  return (
    <div className="widget">
      <div className="wtitle">Lyukas tartomány: külső perem CCW (↺), belső lyuk CW (↻) — a két hídvágás kioltja egymást!</div>
      <svg viewBox="0 0 540 225" className="wsvg">
        {/* Külső szabálytalan hurok */}
        <ellipse cx="180" cy="112" rx="115" ry="78" fill="#38bdf8" fillOpacity="0.16" stroke="#34d399" strokeWidth="2.6" />
        {/* Belső lyuk */}
        <circle cx="180" cy="112" r="28" fill="#0f172a" stroke="#fb923c" strokeWidth="2.4" />
        {/* Két ellentétes hídvágás */}
        <line x1="208" y1="109" x2="295" y2="109" stroke="#fbbf24" strokeDasharray="4 3" strokeWidth="1.5" />
        <line x1="208" y1="115" x2="295" y2="115" stroke="#fbbf24" strokeDasharray="4 3" strokeWidth="1.5" />

        <text x="180" y="26" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="700">C₁ (külső, CCW ↺)</text>
        <text x="180" y="116" textAnchor="middle" fill="#fb923c" fontSize="11.5" fontWeight="700">C₂ (CW ↻)</text>

        <rect x="320" y="34" width="205" height="156" rx="10" fill="#0f172a" stroke="#fbbf24" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="334" y="62" fill="#fbbf24" fontSize="13" fontWeight="700">Deformációs elv:</text>
        <text x="334" y="90" fill="#cbd5e1" fontSize="11.5">Ha N_x − M_y = 0 a lyukon kívül:</text>
        <text x="334" y="118" fill="#34d399" fontSize="13" fontWeight="700" fontFamily="monospace">∮_{'{C₁}'} = ∮_{'{C₂}'} (CCW)</text>
        <text x="334" y="150" fill="#94a3b8" fontSize="11">Bármely vad C₁ görbe összehúzható</text>
        <text x="334" y="166" fill="#94a3b8" fontSize="11">egy apró körre a lyuk körül!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Green-tétel bizonyítása I. típusú tartományon */
export function GreenProofTypeIWidget() {
  return (
    <div className="widget">
      <div className="wtitle">Bizonyítás 1 pillantással: ∮ M dx = ∫_a^b [M(x, g₁) − M(x, g₂)] dx = −∬_R (∂M/∂y) dA</div>
      <svg viewBox="0 0 540 215" className="wsvg">
        {/* Alsó görbe g1(x) balról jobbra (+dx) */}
        <path d="M 100,155 Q 200,195 300,145" fill="none" stroke="#34d399" strokeWidth="3" />
        <path d={arrowHead(180, 174, 215, 174, 7)} fill="none" stroke="#34d399" strokeWidth="2.6" />
        {/* Felső görbe g2(x) jobbról balra (-dx) */}
        <path d="M 100,75 Q 200,32 300,68" fill="none" stroke="#fb923c" strokeWidth="3" />
        <path d={arrowHead(215, 52, 180, 52, 7)} fill="none" stroke="#fb923c" strokeWidth="2.6" />
        {/* Oldalsó függőleges élek (dx = 0!) */}
        <line x1="100" y1="75" x2="100" y2="155" stroke="#64748b" strokeDasharray="4 3" strokeWidth="1.8" />
        <line x1="300" y1="68" x2="300" y2="145" stroke="#64748b" strokeDasharray="4 3" strokeWidth="1.8" />

        <text x="200" y="118" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="700">R</text>
        <text x="322" y="72" fill="#fb923c" fontSize="12" fontWeight="600">Felső: y = g₂(x) (← −dx)</text>
        <text x="322" y="152" fill="#34d399" fontSize="12" fontWeight="600">Alsó: y = g₁(x) (→ +dx)</text>
        <text x="322" y="112" fill="#94a3b8" fontSize="11.5">Függőleges éleken dx = 0!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló mester-képlettár */
export function GreenMasterMapDiagram() {
  const rows = [
    { label: 'Cirkulációs alak', expr: '∮_C (M dx + N dy) = ∬_R (∂N/∂x − ∂M/∂y) dA   (CCW!)', color: '#34d399' },
    { label: 'Fluxus-alak', expr: '∮_C (M dy − N dx) = ∬_R (∂M/∂x + ∂N/∂y) dA   (kifelé)', color: '#fb923c' },
    { label: 'Területképletek', expr: 'Ter(R) = ∮ x dy = −∮ y dx = ½ ∮ (x dy − y dx)', color: '#fbbf24' },
    { label: 'Lyukas tartomány', expr: 'Külső CCW (+), belső CW (−) · Deformációs elv!', color: '#38bdf8' },
    { label: '3D nagy testvérek', expr: 'Cirkuláció → Stokes (16.7)  ·  Fluxus → Gauss (16.8)', color: '#2dd4bf' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 16.4 fejezet mester-képlettára — Green-tétel a síkban</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.55" strokeWidth="1.3" />
              <rect x="14" y={y} width="6" height="37" rx="3" fill={r.color} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="600">{r.label}</text>
              <text x="172" y={y + 23} fill={r.color} fontSize="11.2" fontWeight="700" fontFamily="monospace">{r.expr}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
