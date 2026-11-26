import { useState } from 'react';
import { M } from './M';

/* ============================================================================
   14.5. Iránymenti deriváltak és gradiens vektor — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 7): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1e-3) return '';
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  return `M${(x2 - ux * size + px * size * 0.45).toFixed(1)},${(y2 - uy * size + py * size * 0.45).toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${(x2 - ux * size - px * size * 0.45).toFixed(1)},${(y2 - uy * size - py * size * 0.45).toFixed(1)}`;
}

/* ------------------------------------------------------------------ 1. 360°-os iránytű szimulátor */
export function DirectionalSlopeCompassWidget() {
  const [deg, setDeg] = useState(45);
  const rad = (deg * Math.PI) / 180;
  // f(x,y) = (x^2+y^2)/2 pont (1,1) => grad f = (1, 1), |grad f| = sqrt(2)
  const u1 = Math.cos(rad);
  const u2 = Math.sin(rad);
  const Duf = u1 + u2;
  const col = Duf > 0.08 ? '#34d399' : Duf < -0.08 ? '#f87171' : '#fbbf24';

  const W = 540;
  const H = 205;
  const cx = 145;
  const cy = 104;
  const R = 74;

  const gx2 = cx + 52;
  const gy2 = cy - 52;
  const ux2 = cx + u1 * R;
  const uy2 = cy - u2 * R;

  return (
    <div className="widget">
      <div className="widget-title">
        360°-os iránytű: <M t="f(x,y) = \frac{x^2+y^2}{2}" /> meredeksége az <M t="(1,1)" /> pontban (<M t="\nabla f = \langle 1, 1\rangle" />)
      </div>
      <div className="sliders">
        <label>
          Irányvektor szöge θ = <strong>{deg}°</strong> → u = ⟨{fmt(u1, 2)}; {fmt(u2, 2)}⟩
          <input type="range" min={0} max={360} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={cx - R - 16} y1={cy} x2={cx + R + 16} y2={cy} className="pl-axis" />
        <line x1={cx} y1={cy - R - 16} x2={cx} y2={cy + R + 16} className="pl-axis" />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(148,163,184,0.3)" />

        {/* Gradiens (45°) */}
        <line x1={cx} y1={cy} x2={gx2} y2={gy2} stroke="#38bdf8" strokeWidth={2.4} />
        <path d={arrowHead(cx, cy, gx2, gy2)} fill="none" stroke="#38bdf8" strokeWidth={2.2} />
        <text x={gx2 + 6} y={gy2 - 4} fill="#38bdf8" fontSize={10.5} fontWeight={700}>∇f</text>

        {/* Egységvektor u */}
        <line x1={cx} y1={cy} x2={ux2} y2={uy2} stroke={col} strokeWidth={2.6} />
        <path d={arrowHead(cx, cy, ux2, uy2)} fill="none" stroke={col} strokeWidth={2.4} />
        <circle cx={cx} cy={cy} r={4} fill="#fbbf24" />

        {/* Jobb panel */}
        <rect x={285} y={20} width={242} height={164} rx={8} fill="#0f172a" stroke={col} strokeWidth={1.6} />
        <text x={406} y={48} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>Iránymenti derivált D_u f(1,1):</text>
        <text x={406} y={84} textAnchor="middle" fill={col} fontSize={22} fontWeight={700}>
          {Duf >= 0 ? '+' : ''}{fmt(Duf, 3)}
        </text>
        <text x={406} y={118} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>
          {Duf > 1.38
            ? 'MAXIMÁLIS emelkedés (+√2 ≈ +1,414)!'
            : Duf < -1.38
              ? 'MAXIMÁLIS süllyedés (−√2 ≈ −1,414)!'
              : Math.abs(Duf) < 0.08
                ? 'NULLA változás (szintvonal mentén)!'
                : Duf > 0
                  ? 'Emelkedő irány'
                  : 'Lejtő irány'}
        </text>
        <text x={406} y={154} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>
          Próbáld: 45° (max), 135° (0), 225° (min)!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Skalárszorzat-vetítés */
export function GradientDotProductWidget() {
  const [deg, setDeg] = useState(20);
  const rad = (deg * Math.PI) / 180;
  // grad f = (1, 2)
  const gx = 1;
  const gy = 2;
  const u1 = Math.cos(rad);
  const u2 = Math.sin(rad);
  const dot = gx * u1 + gy * u2;

  const W = 540;
  const H = 195;
  const cx = 190;
  const cy = 128;
  const sc = 42;
  const px = cx + dot * u1 * sc;
  const py = cy - dot * u2 * sc;

  return (
    <div className="widget">
      <div className="widget-title">
        Geometriai kulcs: <M t="D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u} = |\nabla f|\cos\varphi" /> (a gradiens vetülete <M t="\mathbf{u}" />-ra!)
      </div>
      <div className="sliders">
        <label>
          u iránya: {deg}° → D_u f = {fmt(dot, 3)} (|∇f| = √5 ≈ 2,236)
          <input type="range" min={-60} max={240} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={30} y1={cy} x2={380} y2={cy} className="pl-axis" />
        <line x1={cx} y1={16} x2={cx} y2={182} className="pl-axis" />

        {/* u egyenes */}
        <line x1={cx - 140 * u1} y1={cy + 140 * u2} x2={cx + 140 * u1} y2={cy - 140 * u2} stroke="rgba(148,163,184,0.3)" strokeDasharray="4 4" />
        {/* Vetületi derékszög */}
        <line x1={cx + gx * sc} y1={cy - gy * sc} x2={px} y2={py} stroke="#fbbf24" strokeDasharray="3 3" strokeWidth={1.6} />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="#34d399" strokeWidth={4} />

        {/* grad f */}
        <line x1={cx} y1={cy} x2={cx + gx * sc} y2={cy - gy * sc} stroke="#38bdf8" strokeWidth={2.5} />
        <path d={arrowHead(cx, cy, cx + gx * sc, cy - gy * sc)} fill="none" stroke="#38bdf8" strokeWidth={2.2} />
        <text x={cx + gx * sc + 8} y={cy - gy * sc} fill="#38bdf8" fontSize={11} fontWeight={700}>∇f = ⟨1, 2⟩</text>

        {/* u egységvektor */}
        <line x1={cx} y1={cy} x2={cx + u1 * sc} y2={cy - u2 * sc} stroke="#fb923c" strokeWidth={2.4} />
        <path d={arrowHead(cx, cy, cx + u1 * sc, cy - u2 * sc)} fill="none" stroke="#fb923c" strokeWidth={2.2} />

        <text x={W - 14} y={32} textAnchor="end" fill="#34d399" fontSize={12} fontWeight={700}>
          Vetület (D_u f) = {fmt(dot, 2)}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Szintvonalak + legmeredekebb emelkedés/süllyedés */
export function SteepestAscent3DWidget() {
  const [x0, setX0] = useState(1.2);
  const [y0, setY0] = useState(0.8);
  // f(x, y) = 4 - 0.5 x^2 - y^2 => grad f = (-x, -2y)
  const gx = -x0;
  const gy = -2 * y0;
  const mag = Math.hypot(gx, gy);

  const W = 540;
  const H = 225;
  const cx = 200;
  const cy = 114;
  const sc = 44;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const scaleVec = mag > 0.05 ? 46 / mag : 0;
  const ax = gx * scaleVec;
  const ay = -gy * scaleVec;

  return (
    <div className="widget">
      <div className="widget-title">
        Hegytető <M t="f(x,y) = 4 - \frac{1}{2}x^2 - y^2" />: +∇f felfelé, −∇f lefelé (vízfolyás!), ⊥ szintvonal!
      </div>
      <div className="sliders">
        <label>
          x₀ = {fmt(x0, 1)}
          <input type="range" min={-2.2} max={2.2} step={0.2} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
        </label>
        <label>
          y₀ = {fmt(y0, 1)}
          <input type="range" min={-1.6} max={1.6} step={0.2} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={375} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={212} className="pl-axis" />

        {/* Ellipszis szintvonalak */}
        {[3.5, 2.5, 1.5, 0.5].map((c) => {
          const k = 4 - c;
          return (
            <ellipse
              key={c}
              cx={cx}
              cy={cy}
              rx={Math.sqrt(2 * k) * sc}
              ry={Math.sqrt(k) * sc}
              fill="none"
              stroke="rgba(56,189,248,0.4)"
              strokeWidth={1.3}
            />
          );
        })}

        {mag > 0.05 && (
          <>
            {/* +grad (fel) */}
            <line x1={X(x0)} y1={Y(y0)} x2={X(x0) + ax} y2={Y(y0) + ay} stroke="#34d399" strokeWidth={2.6} />
            <path d={arrowHead(X(x0), Y(y0), X(x0) + ax, Y(y0) + ay)} fill="none" stroke="#34d399" strokeWidth={2.3} />
            {/* -grad (le) */}
            <line x1={X(x0)} y1={Y(y0)} x2={X(x0) - ax} y2={Y(y0) - ay} stroke="#f87171" strokeWidth={2.4} />
            <path d={arrowHead(X(x0), Y(y0), X(x0) - ax, Y(y0) - ay)} fill="none" stroke="#f87171" strokeWidth={2.1} />
            {/* érintő (nulla változás) */}
            <line x1={X(x0) - ay * 0.8} y1={Y(y0) + ax * 0.8} x2={X(x0) + ay * 0.8} y2={Y(y0) - ax * 0.8} stroke="#fbbf24" strokeDasharray="4 3" strokeWidth={1.8} />
          </>
        )}
        <circle cx={X(x0)} cy={Y(y0)} r={4.8} fill="#fbbf24" />

        <rect x={384} y={24} width={144} height={176} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={456} y={48} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>P({fmt(x0, 1)}; {fmt(y0, 1)})</text>
        <text x={456} y={78} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>+∇f = ⟨{fmt(gx, 1)}; {fmt(gy, 1)}⟩</text>
        <text x={456} y={102} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Max emelkedés: +{fmt(mag, 2)}</text>
        <text x={456} y={134} textAnchor="middle" fill="#f87171" fontSize={10.5} fontWeight={700}>−∇f: vízfolyás lefelé</text>
        <text x={456} y={168} textAnchor="middle" fill="#fbbf24" fontSize={9.5}>Sárga: szintvonal érintője</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Ellipszis érintője gradienssel (Thomas 4. példa) */
export function LevelCurveNormalWidget() {
  const [deg, setDeg] = useState(135);
  const th = (deg * Math.PI) / 180;
  // x^2/4 + y^2 = 2 => x = sqrt(8) cos th, y = sqrt(2) sin th
  const x0 = Math.sqrt(8) * Math.cos(th);
  const y0 = Math.sqrt(2) * Math.sin(th);
  const gx = x0 / 2;
  const gy = 2 * y0;

  const W = 540;
  const H = 205;
  const cx = 210;
  const cy = 104;
  const sc = 42;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const mag = Math.hypot(gx, gy);
  const nx = (gx / mag) * 48;
  const ny = (-gy / mag) * 48;

  return (
    <div className="widget">
      <div className="widget-title">
        Thomas 4. példa: <M t="\frac{x^2}{4} + y^2 = 2" /> érintője a <M t="\nabla f" /> normálvektorból!
      </div>
      <div className="sliders">
        <label>
          Pont az ellipszisen: θ = {deg}° (P ≈ ({fmt(x0, 2)}; {fmt(y0, 2)}))
          <input type="range" min={0} max={360} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={25} y1={cy} x2={395} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={194} className="pl-axis" />

        <ellipse cx={cx} cy={cy} rx={Math.sqrt(8) * sc} ry={Math.sqrt(2) * sc} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={2.2} />
        {/* Érintőegyenes */}
        <line x1={X(x0) - ny * 1.4} y1={Y(y0) + nx * 1.4} x2={X(x0) + ny * 1.4} y2={Y(y0) - nx * 1.4} stroke="#fbbf24" strokeWidth={2.2} />
        {/* Gradiens */}
        <line x1={X(x0)} y1={Y(y0)} x2={X(x0) + nx} y2={Y(y0) + ny} stroke="#34d399" strokeWidth={2.5} />
        <path d={arrowHead(X(x0), Y(y0), X(x0) + nx, Y(y0) + ny)} fill="none" stroke="#34d399" strokeWidth={2.2} />
        <circle cx={X(x0)} cy={Y(y0)} r={4.8} fill="#fbbf24" />

        <text x={526} y={32} textAnchor="end" fill="#34d399" fontSize={10.5} fontWeight={700}>
          ∇f = ⟨{fmt(gx, 2)}; {fmt(gy, 2)}⟩
        </text>
        <text x={526} y={54} textAnchor="end" fill="#fbbf24" fontSize={10}>
          Érintő ⊥ ∇f (90°!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Gradiens algebrai szabályai */
export function GradientRulesCardDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A gradiens 5 algebrai szabálya (pont mint a közönséges deriváltnál!)</div>
      <svg className="plane" viewBox="0 0 540 132">
        <rect width={540} height={132} className="pl-bg" />
        <g transform="translate(12, 14)">
          <rect width={250} height={104} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={125} y={24} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Linearitás</text>
          <text x={125} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>∇(k f) = k ∇f</text>
          <text x={125} y={74} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>∇(f ± g) = ∇f ± ∇g</text>
          <text x={125} y={95} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Lánc: ∇(h(f)) = h&apos;(f) ∇f</text>
        </g>
        <g transform="translate(278, 14)">
          <rect width={250} height={104} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={125} y={24} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>Szorzat és hányados</text>
          <text x={125} y={52} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>∇(f g) = f ∇g + g ∇f</text>
          <text x={125} y={80} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>∇(f / g) = (g ∇f − f ∇g) / g²</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. 3D szintfelület és normálisa */
export function Gradient3DSurfaceNormalWidget() {
  return (
    <div className="widget">
      <div className="widget-title">3D-ben: ∇f(x, y, z) merőleges az f(x, y, z) = c szintfelületre!</div>
      <svg className="plane" viewBox="0 0 540 165">
        <rect width={540} height={165} className="pl-bg" />

        {/* Gömb */}
        <circle cx={155} cy={92} r={56} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={2} />
        <ellipse cx={155} cy={92} rx={56} ry={18} fill="none" stroke="rgba(56,189,248,0.4)" strokeDasharray="4 3" />

        {/* Pont a gömbön + érintősík-darabka + ∇f */}
        <polygon points="168,46 218,34 226,64 176,76" fill="rgba(251,191,36,0.22)" stroke="#fbbf24" strokeWidth={1.5} />
        <line x1={196} y1={55} x2={236} y2={22} stroke="#34d399" strokeWidth={2.6} />
        <path d={arrowHead(196, 55, 236, 22)} fill="none" stroke="#34d399" strokeWidth={2.3} />
        <circle cx={196} cy={55} r={4.5} fill="#fbbf24" />
        <text x={242} y={24} fill="#34d399" fontSize={11} fontWeight={700}>∇f ⊥ szintfelület</text>

        {/* Jobb oldal: 3D képlet */}
        <rect x={286} y={18} width={240} height={128} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={406} y={42} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Három változóban:</text>
        <text x={406} y={70} textAnchor="middle" fill="#e2e8f0" fontSize={11}>∇f = ⟨fₓ, fᵧ, f_z⟩</text>
        <text x={406} y={96} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>D_u f = ∇f · u</text>
        <text x={406} y={124} textAnchor="middle" fill="#fbbf24" fontSize={9.5}>Következő szakasz (14.6): érintősík!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Gradiens ereszkedés (AI / optimalizálás) */
export function GradientDescentSimWidget() {
  const [lr, setLr] = useState(0.32);
  // L(x, y) = 0.5 x^2 + 2 y^2 => grad L = (x, 4y)
  const pts: [number, number][] = [[2.4, 1.1]];
  let x = 2.4;
  let y = 1.1;
  for (let i = 0; i < 14; i++) {
    x = x - lr * x;
    y = y - lr * 4 * y;
    if (Math.abs(x) > 8 || Math.abs(y) > 8) break;
    pts.push([x, y]);
  }
  const stable = lr < 0.5;

  const W = 540;
  const H = 200;
  const cx = 270;
  const cy = 104;
  const sc = 56;
  const X = (v: number) => cx + v * sc;
  const Y = (v: number) => cy - v * sc;

  const pathD = pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${X(px).toFixed(1)},${Y(py).toFixed(1)}`).join(' ');

  return (
    <div className="widget">
      <div className="widget-title">Gradiens ereszkedés (AI optimalizálás): pₖ₊₁ = pₖ − η · ∇L(pₖ)</div>
      <div className="sliders">
        <label>
          Tanulási ráta η = <strong>{fmt(lr, 2)}</strong> ({stable ? 'konvergál a (0,0) minimumba ✓' : 'TÚL NAGY η → szétrobban! ✗'})
          <input type="range" min={0.08} max={0.54} step={0.02} value={lr} onChange={(e) => setLr(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {[0.4, 1.2, 2.5, 4.5].map((c) => (
          <ellipse key={c} cx={cx} cy={cy} rx={Math.sqrt(2 * c) * sc} ry={Math.sqrt(c / 2) * sc} fill="none" stroke="rgba(56,189,248,0.32)" />
        ))}
        <circle cx={cx} cy={cy} r={4} fill="#34d399" />
        <path d={pathD} fill="none" stroke={stable ? '#fbbf24' : '#f87171'} strokeWidth={2.2} />
        {pts.map(([px, py], i) => (
          <circle key={i} cx={X(px)} cy={Y(py)} r={i === 0 ? 5 : 3.2} fill={i === 0 ? '#38bdf8' : stable ? '#fbbf24' : '#f87171'} />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Összefoglaló kártya */
export function GradientMasterSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A gradiens 4 szuperképessége egy pillantásra (100. szakasz!)</div>
      <svg className="plane" viewBox="0 0 540 138">
        <rect width={540} height={138} className="pl-bg" />

        <g transform="translate(10, 14)">
          <rect width={122} height={110} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={61} y={24} textAnchor="middle" fill="#38bdf8" fontSize={10.5} fontWeight={700}>1. Iránymenti</text>
          <text x={61} y={54} textAnchor="middle" fill="#e2e8f0" fontSize={11} fontWeight={700}>D_u f = ∇f · u</text>
          <text x={61} y={84} textAnchor="middle" fill="#fb7185" fontSize={9.5}>|u| = 1 kötelező!</text>
        </g>

        <g transform="translate(142, 14)">
          <rect width={122} height={110} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={61} y={24} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>2. Legmeredekebb</text>
          <text x={61} y={52} textAnchor="middle" fill="#34d399" fontSize={10}>Fel: +∇f (+|∇f|)</text>
          <text x={61} y={76} textAnchor="middle" fill="#f87171" fontSize={10}>Le: −∇f (−|∇f|)</text>
        </g>

        <g transform="translate(274, 14)">
          <rect width={122} height={110} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
          <text x={61} y={24} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>3. Szintvonal ⊥</text>
          <text x={61} y={52} textAnchor="middle" fill="#e2e8f0" fontSize={10}>∇f ⊥ szintvonal</text>
          <text x={61} y={78} textAnchor="middle" fill="#fbbf24" fontSize={9.5}>fₓΔx + fᵧΔy = 0</text>
        </g>

        <g transform="translate(406, 14)">
          <rect width={124} height={110} rx={8} fill="#0f172a" stroke="#2dd4bf" strokeWidth={1.5} />
          <text x={62} y={24} textAnchor="middle" fill="#2dd4bf" fontSize={10.5} fontWeight={700}>4. 3D normális</text>
          <text x={62} y={52} textAnchor="middle" fill="#e2e8f0" fontSize={10}>∇f = ⟨fₓ, fᵧ, f_z⟩</text>
          <text x={62} y={78} textAnchor="middle" fill="#2dd4bf" fontSize={9.5}>⊥ szintfelületre!</text>
        </g>
      </svg>
    </div>
  );
}
