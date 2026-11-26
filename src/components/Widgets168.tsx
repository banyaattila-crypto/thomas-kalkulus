import { useState } from 'react';

/* ============================================================================
   16.8. A Gauss–Osztrogradszkij-tétel — 8 interaktív 2D/3D SVG widget
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

/* ------------------------------------------------------------------ 1. 3D divergencia: forrás / nyelő / forrásmentes */
export function Div3DSourceSinkWidget() {
  const fields = [
    { name: 'Forrás ⟨x, y, z⟩', div: '1 + 1 + 1 = +3', col: '#fb923c', desc: 'Minden pontban egyenletesen tágul (forrás): pozitív kifelé fluxus!' },
    { name: 'Örvény ⟨−y, x, 0⟩', div: '0 + 0 + 0 = 0', col: '#34d399', desc: 'Összenyomhatatlan áramlás: pontosan annyi lép ki, mint amennyi be!' },
    { name: 'Nyelő ⟨−x, −y, −2z⟩', div: '−1 − 1 − 2 = −4', col: '#f87171', desc: 'Minden pontban összehúzódik (nyelő): negatív kifelé fluxus!' },
    { name: 'Változó ⟨x², y², z²⟩', div: '2(x + y + z)', col: '#38bdf8', desc: 'Az x+y+z > 0 féltérben forrás, az x+y+z < 0 féltérben nyelő!' },
  ];
  const [sel, setSel] = useState(0);
  const cur = fields[sel];

  return (
    <div className="widget">
      <div className="wtitle">A 3D divergencia (∇ · F = M_x + N_y + P_z): a térfogategységre jutó kiáramlás (skalár)!</div>
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
        <text x="34" y="84" fill={cur.col} fontSize="15.5" fontWeight="700" fontFamily="monospace">div F = ∇ · F = {cur.div}</text>
        <text x="34" y="124" fill="#cbd5e1" fontSize="12">{cur.desc}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. 3D voxel-kioltódás */
export function VoxelFluxCancel3DWidget() {
  const [yaw, setYaw] = useState(32);
  const P = makeProj(205, 140, 48, yaw, 22);

  // Két egymás melletti kocka: [-1, 0]x[-0.6,0.6]x[-0.6,0.6] és [0, 1]x[-0.6,0.6]x[-0.6,0.6]
  const drawBox = (x1: number, x2: number, col: string) => {
    const c = [
      P(x1, -0.6, -0.6), P(x2, -0.6, -0.6), P(x2, 0.6, -0.6), P(x1, 0.6, -0.6),
      P(x1, -0.6, 0.6), P(x2, -0.6, 0.6), P(x2, 0.6, 0.6), P(x1, 0.6, 0.6),
    ];
    const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    return edges.map(([a, b], i) => (
      <line key={`${x1}-${i}`} x1={c[a][0]} y1={c[a][1]} x2={c[b][0]} y2={c[b][1]} stroke={col} strokeOpacity="0.65" strokeWidth="1.5" />
    ));
  };

  // Közös belső fal (x = 0) kioltódő nyilak
  const M = P(0, 0, 0);
  const M1 = P(0.45, 0, 0);
  const M2 = P(-0.45, 0, 0);
  // Külső falak kifelé nyilak
  const L1 = P(-1, 0, 0), L2 = P(-1.55, 0, 0);
  const R1 = P(1, 0, 0), R2 = P(1.55, 0, 0);

  return (
    <div className="widget">
      <div className="wtitle">Miért igaz Gauss–Osztrogradszkij tétele? A belső közös falakon a fluxusok kioltják egymást!</div>
      <div className="controls">
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-40} max={90} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 240" className="wsvg">
        {drawBox(-1, 0, '#38bdf8')}
        {drawBox(0, 1, '#34d399')}

        {/* Közös fal kioltódó nyilak */}
        <line x1={M[0]} y1={M[1]} x2={M1[0]} y2={M1[1]} stroke="#f87171" strokeWidth="2.4" />
        <path d={arrowHead(M[0], M[1], M1[0], M1[1], 6)} fill="none" stroke="#f87171" strokeWidth="2" />
        <line x1={M[0]} y1={M[1]} x2={M2[0]} y2={M2[1]} stroke="#f87171" strokeWidth="2.4" />
        <path d={arrowHead(M[0], M[1], M2[0], M2[1], 6)} fill="none" stroke="#f87171" strokeWidth="2" />

        {/* Külső kifelé nyilak */}
        <line x1={L1[0]} y1={L1[1]} x2={L2[0]} y2={L2[1]} stroke="#fbbf24" strokeWidth="2.8" />
        <path d={arrowHead(L1[0], L1[1], L2[0], L2[1], 7)} fill="none" stroke="#fbbf24" strokeWidth="2.4" />
        <line x1={R1[0]} y1={R1[1]} x2={R2[0]} y2={R2[1]} stroke="#fbbf24" strokeWidth="2.8" />
        <path d={arrowHead(R1[0], R1[1], R2[0], R2[1], 7)} fill="none" stroke="#fbbf24" strokeWidth="2.4" />

        <rect x="330" y="34" width="194" height="164" rx="10" fill="#0f172a" stroke="#34d399" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="344" y="64" fill="#fbbf24" fontSize="13" fontWeight="700">Külső burok S = ∂D:</text>
        <text x="344" y="86" fill="#cbd5e1" fontSize="11.5">megmarad → ∯ F · n dσ</text>
        <text x="344" y="122" fill="#f87171" fontSize="13" fontWeight="700">Belső közös falak:</text>
        <text x="344" y="144" fill="#cbd5e1" fontSize="11.5">ellentétes normálisok,</text>
        <text x="344" y="162" fill="#cbd5e1" fontSize="11.5">tökéletes kioltódás!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Gauss-tétel 3 lépéses varázslat */
export function GaussShortcutStepsWidget() {
  const [step, setStep] = useState<0 | 1 | 2>(1);

  return (
    <div className="widget">
      <div className="wtitle">Gauss-tétel szuperereje: bonyolult felületi fluxusból 1 gömbi hármas integrál!</div>
      <div className="controls">
        <button className={step === 0 ? 'active' : ''} onClick={() => setStep(0)}>1. Ijesztő F a gömbön</button>
        <button className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>2. div F kiszámítása</button>
        <button className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>3. Gömbi integrál!</button>
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="1.5" />
        {step === 0 && (
          <>
            <text x="30" y="54" fill="#f87171" fontSize="13.5" fontWeight="700" fontFamily="monospace">F = ⟨x³ + sin(yz),  y³ − e^(xz),  z³ + x²y⟩</text>
            <text x="30" y="96" fill="#cbd5e1" fontSize="12.5">Közvetlen felületi integrállal az x²+y²+z² = R² gömbön szinte megoldhatatlan!</text>
          </>
        )}
        {step === 1 && (
          <>
            <text x="30" y="54" fill="#34d399" fontSize="14.5" fontWeight="700" fontFamily="monospace">div F = (3x² + 0) + (3y² − 0) + (3z² + 0) = 3ρ² !</text>
            <text x="30" y="96" fill="#cbd5e1" fontSize="12.5">A sin(yz), e^(xz) és x²y tagok mind eltűntek a parciális deriválással!</text>
          </>
        )}
        {step === 2 && (
          <>
            <text x="30" y="54" fill="#fbbf24" fontSize="15" fontWeight="700" fontFamily="monospace">∭_D 3ρ² dV = 4π ∫₀^R 3ρ⁴ dρ = (12π / 5) R⁵ !</text>
            <text x="30" y="96" fill="#cbd5e1" fontSize="12.5">Három soros gömbi integrál a 15.6 fejezetből — kész is a pontos fluxus!</text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Nyitott kupola lezárása fedőlappal */
export function CapTrickClosedDome3DWidget() {
  const [capped, setCapped] = useState(true);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(200, 195, 58, yaw, 22);

  const R = 1.5;
  const basePts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) {
    const th = (i / 40) * Math.PI * 2;
    basePts.push(P(R * Math.cos(th), R * Math.sin(th), 0));
  }
  const ribs: string[] = [];
  for (let k = 0; k < 8; k++) {
    const th = (k / 8) * Math.PI * 2;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 14; i++) {
      const r = (R * i) / 14;
      pts.push(P(r * Math.cos(th), r * Math.sin(th), 1.6 * (1 - (r * r) / (R * R))));
    }
    ribs.push(pathFrom(pts));
  }
  const O = P(0, 0, 0);
  const Down = P(0, 0, -0.75);

  return (
    <div className="widget">
      <div className="wtitle">A „fedőlap-trükk”: nyitott S₁ kupolát zárd le S₂ alaplappal (−k!), majd vond ki S₂ fluxusát!</div>
      <div className="controls">
        <button className={!capped ? 'active' : ''} onClick={() => setCapped(false)}>Nyitott S₁ (nincs Gauss!)</button>
        <button className={capped ? 'active' : ''} onClick={() => setCapped(true)}>Lezárva S₂-vel (Gauss OK!)</button>
        <label>
          Forgatás: {yaw}°
          <input type="range" min={-50} max={110} step={2} value={yaw} onChange={(e) => setYaw(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 250" className="wsvg">
        {capped && <path d={`${pathFrom(basePts)} Z`} fill="#fb923c" fillOpacity="0.28" stroke="#fb923c" strokeWidth="2.2" />}
        {ribs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="1.5" />
        ))}
        <path d={`${pathFrom(basePts)} Z`} fill="none" stroke="#38bdf8" strokeWidth="2.2" />

        {capped && (
          <>
            <line x1={O[0]} y1={O[1]} x2={Down[0]} y2={Down[1]} stroke="#fb923c" strokeWidth="2.8" />
            <path d={arrowHead(O[0], O[1], Down[0], Down[1], 7)} fill="none" stroke="#fb923c" strokeWidth="2.4" />
            <text x={Down[0] + 8} y={Down[1] + 4} fill="#fb923c" fontSize="12" fontWeight="700">n₂ = −k</text>
          </>
        )}

        <rect x="315" y="42" width="210" height="156" rx="10" fill="#0f172a" stroke={capped ? '#34d399' : '#f87171'} strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="330" y="72" fill={capped ? '#34d399' : '#f87171'} fontSize="13" fontWeight="700">
          {capped ? 'Lezárt test D:' : 'Figyelem: nyitott S₁!'}
        </text>
        <text x="330" y="104" fill="#cbd5e1" fontSize="11.5" fontFamily="monospace">
          {capped ? 'Flux(S₁) = ∭ div F dV' : 'Nyitott felületre NEM'}
        </text>
        <text x="330" y="124" fill="#fb923c" fontSize="11.5" fontFamily="monospace">
          {capped ? '         − Flux(S₂, −k)' : 'alkalmazható közvetlenül'}
        </text>
        <text x="330" y="156" fill="#94a3b8" fontSize="11">
          {capped ? 'S₂ lapos (z=0), 2 mp kiszámolni!' : 'a Gauss–Osztrogradszkij-tétel!'}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Elektrosztatika: Gauss-törvény */
export function GaussElectrostaticsShellWidget() {
  return (
    <div className="widget">
      <div className="wtitle">Gauss törvénye az elektrosztatikában: bármely q-t bezáró S₁ felületen a fluxus q / ε₀!</div>
      <svg viewBox="0 0 540 210" className="wsvg">
        {/* Szabálytalan külső krumpli-felület S1 */}
        <path d="M 75,110 C 70,40 230,25 255,95 C 275,155 190,190 120,175 C 85,168 78,145 75,110 Z" fill="#38bdf8" fillOpacity="0.14" stroke="#34d399" strokeWidth="2.6" />
        {/* Belső kis gömb S2 */}
        <circle cx="165" cy="108" r="32" fill="#0f172a" stroke="#fbbf24" strokeDasharray="4 3" strokeWidth="2" />
        <circle cx="165" cy="108" r="7" fill="#f87171" />
        <text x="165" y="112" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">+q</text>

        <rect x="288" y="28" width="236" height="154" rx="10" fill="#0f172a" stroke="#34d399" strokeOpacity="0.6" strokeWidth="1.4" />
        <text x="304" y="56" fill="#34d399" fontSize="13.5" fontWeight="700">Üreges héj S₁ és S₂ között:</text>
        <text x="304" y="84" fill="#cbd5e1" fontSize="12">div E = 0 mindenhol a héjban!</text>
        <text x="304" y="114" fill="#fbbf24" fontSize="13" fontWeight="700" fontFamily="monospace">∯_{'{S₁}'} E·n dσ = ∯_{'{S₂}'} E·n dσ</text>
        <text x="304" y="144" fill="#38bdf8" fontSize="14.5" fontWeight="700" fontFamily="monospace">= q / ε₀   (alakfüggetlen!)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. A 4 Maxwell-egyenlet */
export function MaxwellFourEquationsWidget() {
  const eqs = [
    { name: 'I. Gauss (elektromos)', diff: '∇ · E = ρ / ε₀', integ: '∯ E · n dσ = Q / ε₀', thm: 'Gauss-tétel (16.8)', col: '#fb923c' },
    { name: 'II. Gauss (mágneses)', diff: '∇ · B = 0', integ: '∯ B · n dσ = 0', thm: 'Gauss-tétel (16.8) — nincs monopólus!', col: '#38bdf8' },
    { name: 'III. Faraday indukció', diff: '∇ × E = −∂B/∂t', integ: '∮ E · dr = −dΦ_B/dt', thm: 'Stokes-tétel (16.7)', col: '#34d399' },
    { name: 'IV. Ampère–Maxwell', diff: '∇ × B = μ₀J + μ₀ε₀ ∂E/∂t', integ: '∮ B · dr = μ₀I + μ₀ε₀ dΦ_E/dt', thm: 'Stokes-tétel (16.7) → fényhullámok!', col: '#fbbf24' },
  ];
  const [sel, setSel] = useState(0);
  const cur = eqs[sel];

  return (
    <div className="widget">
      <div className="wtitle">A fizika koronája: mind a 4 Maxwell-egyenlet Stokes- és Gauss-tételen nyugszik!</div>
      <div className="controls">
        {eqs.map((e, i) => (
          <button key={e.name} className={sel === i ? 'active' : ''} onClick={() => setSel(i)}>
            {e.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 165" className="wsvg">
        <rect x="16" y="14" width="508" height="136" rx="10" fill="#0f172a" stroke={cur.col} strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="34" y="44" fill={cur.col} fontSize="14" fontWeight="700">{cur.name}</text>
        <text x="34" y="76" fill="#e2e8f0" fontSize="13.5" fontFamily="monospace">Differenciális: {cur.diff}</text>
        <text x="34" y="106" fill="#cbd5e1" fontSize="13.5" fontFamily="monospace">Integrális:     {cur.integ}</text>
        <text x="34" y="136" fill="#94a3b8" fontSize="12">Matematikai híd: {cur.thm}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. A kalkulus 4 nagy alaptételének egyesítése */
export function UnifiedFundamentalTheoremsWidget() {
  const rows = [
    { dim: '1D (5.4)', name: 'Newton–Leibniz', eq: '∫_a^b f′(x) dx = f(b) − f(a)', col: '#38bdf8' },
    { dim: '1D→3D (16.3)', name: 'Vonalintegrál alapt.', eq: '∫_C ∇f · dr = f(B) − f(A)', col: '#2dd4bf' },
    { dim: '2D/3D (16.4, 16.7)', name: 'Green & Stokes', eq: '∬_S (∇ × F) · n dσ = ∮_{∂S} F · dr', col: '#34d399' },
    { dim: '3D (16.8)', name: 'Gauss–Osztrogradszkij', eq: '∭_D (∇ · F) dV = ∯_{∂D} F · n dσ', col: '#fbbf24' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A NAGY EGYESÍTÉS: mind a 4 alaptétel egyetlen mondat — ∫_M dω = ∫_{'{∂M}'} ω !</div>
      <svg viewBox="0 0 540 235" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 46;
          return (
            <g key={r.name}>
              <rect x="14" y={y} width="512" height="38" rx="7" fill="#0f172a" stroke={r.col} strokeOpacity="0.6" strokeWidth="1.4" />
              <rect x="14" y={y} width="6" height="38" rx="3" fill={r.col} />
              <text x="30" y={y + 23} fill="#e2e8f0" fontSize="11.5" fontWeight="700">{r.name}</text>
              <text x="190" y={y + 23} fill={r.col} fontSize="12" fontWeight="700" fontFamily="monospace">{r.eq}</text>
            </g>
          );
        })}
        <text x="270" y="220" textAnchor="middle" fill="#fb923c" fontSize="13" fontWeight="700">
          „A belsejében vett derivált integrálja mindig egyenlő a peremén vett érték integráljával!”
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Záró mester-képlettár (120/120!) */
export function GaussGrandFinaleDiagram() {
  const rows = [
    { label: '3D divergencia', expr: 'div F = ∇ · F = ∂M/∂x + ∂N/∂y + ∂P/∂z  (skalár)', color: '#38bdf8' },
    { label: 'Gauss–Osztrogradszkij', expr: '∯_S F · n dσ = ∭_D (∇ · F) dV   (zárt S, kifelé n!)', color: '#34d399' },
    { label: 'Fedőlap-trükk', expr: 'Nyitott S₁: Flux(S₁) = ∭ div F dV − Flux(S₂, kifelé)', color: '#fb923c' },
    { label: 'Térfogat fluxussal', expr: 'F = ⟨x, y, z⟩ ⇒ div F = 3 ⇒ V(D) = ⅓ ∯ r · n dσ', color: '#fbbf24' },
    { label: '120 / 120 TELJES!', expr: 'I–III. kötet: 1.1-től 16.8-ig minden szakasz elkészült!', color: '#2dd4bf' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 16.8 fejezet (és a teljes 3 kötetes Thomas-kalkulus!) záró mester-képlettára</div>
      <svg viewBox="0 0 540 245" className="wsvg">
        {rows.map((r, idx) => {
          const y = 14 + idx * 45;
          return (
            <g key={r.label}>
              <rect x="14" y={y} width="512" height="37" rx="7" fill="#0f172a" stroke={r.color} strokeOpacity="0.6" strokeWidth="1.4" />
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
