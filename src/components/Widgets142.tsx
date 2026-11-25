import { useState } from 'react';
import { M } from './M';

/* ============================================================================
   14.2. Határérték és folytonosság magasabb dimenzióban — 8 interaktív SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

/* ------------------------------------------------------------------ 1. 1D vs 2D megközelítés */
export function LimitPaths2DVs1DDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Miért nehezebb a 2D határérték? 2 irány helyett végtelen sok út!</div>
      <svg className="plane" viewBox="0 0 540 170">
        <rect width={540} height={170} className="pl-bg" />

        {/* Bal: 1D */}
        <g transform="translate(12, 12)">
          <rect width={246} height={146} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={123} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>1D: csak 2 irány</text>
          <line x1={26} y1={78} x2={220} y2={78} stroke="#64748b" strokeWidth={2} />
          <circle cx={123} cy={78} r={5} fill="#0f172a" stroke="#fbbf24" strokeWidth={2.2} />
          <path d="M52,78 L108,78 M102,73 L108,78 L102,83" stroke="#34d399" strokeWidth={2.2} fill="none" />
          <path d="M194,78 L138,78 M144,73 L138,78 L144,83" stroke="#fb923c" strokeWidth={2.2} fill="none" />
          <text x={74} y={66} textAnchor="middle" fill="#34d399" fontSize={10}>balról (x₀⁻)</text>
          <text x={172} y={66} textAnchor="middle" fill="#fb923c" fontSize={10}>jobbról (x₀⁺)</text>
          <text x={123} y={124} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Ha bal = jobb ⇒ létezik!</text>
        </g>

        {/* Jobb: 2D */}
        <g transform="translate(282, 12)">
          <rect width={246} height={146} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
          <text x={123} y={22} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>2D: végtelen sok út!</text>
          <circle cx={123} cy={78} r={42} fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeDasharray="4 3" strokeWidth={1.6} />
          {/* Különféle utak */}
          <line x1={62} y1={78} x2={116} y2={78} stroke="#38bdf8" strokeWidth={1.8} />
          <line x1={168} y1={42} x2={128} y2={74} stroke="#34d399" strokeWidth={1.8} />
          <path d="M74,112 Q100,110 120,82" fill="none" stroke="#fb923c" strokeWidth={1.8} />
          <path d="M178,108 Q154,84 129,80" fill="none" stroke="#f87171" strokeWidth={1.8} />
          <circle cx={123} cy={78} r={4.5} fill="#0f172a" stroke="#fbbf24" strokeWidth={2} />
          <text x={123} y={134} textAnchor="middle" fill="#cbd5e1" fontSize={9.5}>MINDEN görbén ugyanaz az L kell!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. ε–δ körlap demonstrátor (Thomas 3. példa) */
export function EpsilonDeltaDiskWidget() {
  const [eps, setEps] = useState(0.8);
  const delta = eps / 4; // |4xy^2/(x^2+y^2)| <= 4 sqrt(x^2+y^2) < 4*delta = eps

  const W = 540;
  const H = 200;
  const cx = 165;
  const cy = 104;
  const sc = 135;

  return (
    <div className="widget">
      <div className="widget-title">
        ε–δ próba: <M t="\lim_{(x,y)\to(0,0)} \frac{4xy^2}{x^2+y^2} = 0" /> (Thomas 3. példa)
      </div>
      <div className="sliders">
        <label>
          Előírt pontosság ε = <strong>{fmt(eps, 2)}</strong> → elég a <strong>δ = ε / 4 = {fmt(delta, 3)}</strong> sugarú körlap!
          <input type="range" min={0.2} max={2.0} step={0.1} value={eps} onChange={(e) => setEps(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={30} y1={cy} x2={300} y2={cy} className="pl-axis" />
        <line x1={cx} y1={16} x2={cx} y2={190} className="pl-axis" />
        <circle cx={cx} cy={cy} r={delta * sc} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={2.2} strokeDasharray="5 3" />
        <circle cx={cx} cy={cy} r={4} fill="#0f172a" stroke="#fbbf24" strokeWidth={2} />
        <line x1={cx} y1={cy} x2={cx + delta * sc} y2={cy} stroke="#fbbf24" strokeWidth={1.8} />
        <text x={cx + (delta * sc) / 2} y={cy - 6} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>
          δ = {fmt(delta, 2)}
        </text>

        <rect x={320} y={20} width={206} height={160} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={423} y={48} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>Szendvics-becslés:</text>
        <text x={423} y={76} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>y² / (x² + y²) ≤ 1</text>
        <text x={423} y={102} textAnchor="middle" fill="#38bdf8" fontSize={10.5}>|f(x,y)| ≤ 4|x| ≤ 4√(x²+y²)</text>
        <text x={423} y={132} textAnchor="middle" fill="#fbbf24" fontSize={10.5}>r &lt; δ = {fmt(delta, 3)} ⇒</text>
        <text x={423} y={156} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>|f(x,y) − 0| &lt; {fmt(eps, 2)} = ε ✓</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Kétutas próba: 2xy/(x^2+y^2) */
export function TwoPathTestWidget() {
  const [deg, setDeg] = useState(45);
  const rad = (deg * Math.PI) / 180;
  const limVal = Math.sin(2 * rad); // 2 cos θ sin θ = sin(2θ)

  const W = 540;
  const H = 215;
  const cx = 145;
  const cy = 112;
  const R = 82;

  // Jobb oldal: sin(2θ) görbe
  const gx0 = 285;
  const gx1 = 515;
  const gcy = 112;
  let sinPath = '';
  for (let i = 0; i <= 90; i++) {
    const d = i * 2;
    const x = gx0 + ((gx1 - gx0) * d) / 180;
    const y = gcy - Math.sin((2 * d * Math.PI) / 180) * 66;
    sinPath += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
  }
  const curX = gx0 + ((gx1 - gx0) * deg) / 180;
  const curY = gcy - limVal * 66;

  return (
    <div className="widget">
      <div className="widget-title">
        Kétutas próba: <M t="f(x,y) = \frac{2xy}{x^2+y^2}" /> az <M t="y = mx" /> egyenes mentén (Thomas 4. példa)
      </div>
      <div className="sliders">
        <label>
          Megközelítési szög θ = <strong>{deg}°</strong> → határérték ezen az egyenesen: <strong>sin(2θ) = {fmt(limVal, 3)}</strong>
          <input type="range" min={0} max={180} step={3} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />

        {/* Bal: irány az xy-síkban */}
        <line x1={cx - R - 10} y1={cy} x2={cx + R + 10} y2={cy} className="pl-axis" />
        <line x1={cx} y1={cy - R - 10} x2={cx} y2={cy + R + 10} className="pl-axis" />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(148,163,184,0.3)" />
        <line
          x1={cx - R * Math.cos(rad)}
          y1={cy + R * Math.sin(rad)}
          x2={cx + R * Math.cos(rad)}
          y2={cy - R * Math.sin(rad)}
          stroke="#fb923c"
          strokeWidth={2.5}
        />
        <circle cx={cx} cy={cy} r={4} fill="#fbbf24" />
        <text x={cx} y={20} textAnchor="middle" fill="#38bdf8" fontSize={10.5} fontWeight={700}>
          Út: y = (tg θ)·x
        </text>

        {/* Jobb: határérték θ függvényében */}
        <text x={(gx0 + gx1) / 2} y={20} textAnchor="middle" fill="#f87171" fontSize={10.5} fontWeight={700}>
          Határérték = sin(2θ) ∈ [−1; 1]
        </text>
        <line x1={gx0} y1={gcy} x2={gx1} y2={gcy} className="pl-axis" />
        <line x1={gx0} y1={38} x2={gx0} y2={186} className="pl-axis" />
        <path d={sinPath} fill="none" stroke="#f87171" strokeWidth={2.3} />
        <circle cx={curX} cy={curY} r={5} fill="#fbbf24" />
        <text x={gx0 + 4} y={48} fill="#94a3b8" fontSize={9.5}>+1</text>
        <text x={gx0 + 4} y={182} fill="#94a3b8" fontSize={9.5}>−1</text>
      </svg>
      <div className="explain">
        <p>
          Mivel <M t="\theta = 0^\circ" /> mentén <M t="0" />, <M t="\theta = 45^\circ" /> mentén <M t="+1" />,{' '}
          <M t="\theta = 135^\circ" /> mentén pedig <M t="-1" /> a határérték, a kétváltozós határérték{' '}
          <strong>NEM LÉTEZIK</strong>!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Parabola-csapda: x^2 y / (x^4 + y^2) */
export function ParabolaTrapWidget() {
  const [pathType, setPathType] = useState<'line1' | 'line2' | 'parabPos' | 'parabNeg'>('parabPos');

  const cfg = {
    line1: { label: 'y = x egyenes', fn: (x: number) => (x * x * x) / (x ** 4 + x * x), lim: '0', col: '#38bdf8' },
    line2: { label: 'y = 3x egyenes', fn: (x: number) => (3 * x ** 3) / (x ** 4 + 9 * x * x), lim: '0', col: '#34d399' },
    parabPos: { label: 'y = x² parabola!', fn: () => 0.5, lim: '+0,5 ≠ 0!', col: '#f87171' },
    parabNeg: { label: 'y = −x² parabola!', fn: () => -0.5, lim: '−0,5 ≠ 0!', col: '#fb923c' },
  }[pathType];

  const W = 540;
  const H = 195;
  const x0 = 45;
  const x1 = 515;
  const cy = 104;
  let d = '';
  for (let i = 0; i <= 100; i++) {
    const x = -1.5 + (3.0 * i) / 100;
    if (Math.abs(x) < 0.02) continue;
    const y = cfg.fn(x);
    const px = x0 + ((x + 1.5) / 3.0) * (x1 - x0);
    const py = cy - y * 115;
    d += `${d ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="widget-title">
        A parabola-csapda: <M t="f(x, y) = \frac{x^2 y}{x^4 + y^2}" /> — minden egyenes 0-t ad, a parabola lebuktatja!
      </div>
      <div className="relbuttons chips">
        <button type="button" className={pathType === 'line1' ? 'on' : ''} onClick={() => setPathType('line1')}>y = x → 0</button>
        <button type="button" className={pathType === 'line2' ? 'on' : ''} onClick={() => setPathType('line2')}>y = 3x → 0</button>
        <button type="button" className={pathType === 'parabPos' ? 'on' : ''} onClick={() => setPathType('parabPos')}>y = x² → +0,5!</button>
        <button type="button" className={pathType === 'parabNeg' ? 'on' : ''} onClick={() => setPathType('parabNeg')}>y = −x² → −0,5!</button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={x0} y1={cy} x2={x1} y2={cy} className="pl-axis" />
        <line x1={(x0 + x1) / 2} y1={22} x2={(x0 + x1) / 2} y2={182} className="pl-axis" />
        <path d={d} fill="none" stroke={cfg.col} strokeWidth={2.6} />
        <circle cx={(x0 + x1) / 2} cy={cy - (pathType === 'parabPos' ? 0.5 : pathType === 'parabNeg' ? -0.5 : 0) * 115} r={5} fill="#0f172a" stroke="#fbbf24" strokeWidth={2.2} />
        <text x={x1 - 8} y={32} textAnchor="end" fill={cfg.col} fontSize={11.5} fontWeight={700}>
          Út: {cfg.label} ⇒ lim = {cfg.lim}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Polárkoordinátás határérték-vizsgáló */
export function PolarLimitWidget() {
  const [fnId, setFnId] = useState<'cubic' | 'sinc' | 'bad'>('cubic');
  const [r, setR] = useState(0.6);

  const cfg = {
    cubic: {
      name: '(x³+y³)/(x²+y²) = r(cos³θ+sin³θ)',
      evalR: (rv: number, th: number) => rv * (Math.cos(th) ** 3 + Math.sin(th) ** 3),
      verdict: 'KONVERGENS (→ 0): a sáv szélessége r → 0-ra 0-ba zsugorodik!',
      ok: true,
    },
    sinc: {
      name: 'sin(x²+y²)/(x²+y²) = sin(r²)/r²',
      evalR: (rv: number) => Math.sin(rv * rv) / (rv * rv),
      verdict: 'KONVERGENS (→ 1): teljesen θ-független, r → 0-ra 1-hez tart!',
      ok: true,
    },
    bad: {
      name: 'xy/(x²+y²) = ½ sin(2θ)',
      evalR: (_rv: number, th: number) => 0.5 * Math.sin(2 * th),
      verdict: 'DIVERGENS: a [−0,5; +0,5] sáv r → 0-ra SEM zsugorodik össze!',
      ok: false,
    },
  }[fnId];

  let mn = Infinity;
  let mx = -Infinity;
  for (let i = 0; i < 180; i++) {
    const v = cfg.evalR(r, (i / 180) * Math.PI * 2);
    if (v < mn) mn = v;
    if (v > mx) mx = v;
  }

  const W = 540;
  const H = 152;
  const barX = (v: number) => 70 + ((v + 1.5) / 3.0) * 400;

  return (
    <div className="widget">
      <div className="widget-title">Polár-próba: mi történik az r sugarú körön felvett értékekkel, ha r → 0⁺?</div>
      <div className="relbuttons chips">
        <button type="button" className={fnId === 'cubic' ? 'on' : ''} onClick={() => setFnId('cubic')}>(x³+y³)/(x²+y²)</button>
        <button type="button" className={fnId === 'sinc' ? 'on' : ''} onClick={() => setFnId('sinc')}>sin(r²)/r²</button>
        <button type="button" className={fnId === 'bad' ? 'on' : ''} onClick={() => setFnId('bad')}>xy/(x²+y²)</button>
      </div>
      <div className="sliders">
        <label>
          Sugár r = <strong>{fmt(r, 2)}</strong> (húzd balra 0 felé!)
          <input type="range" min={0.05} max={1.4} step={0.05} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <text x={W / 2} y={24} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>{cfg.name}</text>
        <line x1={70} y1={78} x2={470} y2={78} stroke="#64748b" strokeWidth={2} />
        {[-1, -0.5, 0, 0.5, 1].map((v) => (
          <g key={v}>
            <line x1={barX(v)} y1={72} x2={barX(v)} y2={84} stroke="#94a3b8" />
            <text x={barX(v)} y={100} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>{fmt(v, 1)}</text>
          </g>
        ))}
        <rect
          x={barX(mn)}
          y={66}
          width={Math.max(6, barX(mx) - barX(mn))}
          height={24}
          rx={4}
          fill={cfg.ok ? 'rgba(52,211,153,0.4)' : 'rgba(248,113,113,0.4)'}
          stroke={cfg.ok ? '#34d399' : '#f87171'}
          strokeWidth={2}
        />
        <text x={W / 2} y={134} textAnchor="middle" fill={cfg.ok ? '#34d399' : '#f87171'} fontSize={10.5} fontWeight={700}>
          [{fmt(mn, 3)}; {fmt(mx, 3)}] — {cfg.verdict}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Megszüntethető vs. javíthatatlan szakadás */
export function ContinuityRepairWidget() {
  return (
    <div className="widget">
      <div className="widget-title">Folytonos kiterjesztés: melyik szakadás javítható ki?</div>
      <svg className="plane" viewBox="0 0 540 154">
        <rect width={540} height={154} className="pl-bg" />

        <g transform="translate(12, 12)">
          <rect width={250} height={130} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={125} y={22} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>JAVÍTHATÓ (megszüntethető) ✓</text>
          <text x={125} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={11}>f(x,y) = sin(x²+y²) / (x²+y²)</text>
          <text x={125} y={76} textAnchor="middle" fill="#38bdf8" fontSize={10}>lim = 1 (minden irányból!)</text>
          <text x={125} y={104} textAnchor="middle" fill="#a7f3d0" fontSize={10}>Definiáljuk: f(0, 0) := 1 ⇒ FOLYTONOS!</text>
        </g>

        <g transform="translate(278, 12)">
          <rect width={250} height={130} rx={8} fill="#0f172a" stroke="#f87171" strokeWidth={1.6} />
          <text x={125} y={22} textAnchor="middle" fill="#f87171" fontSize={11.5} fontWeight={700}>JAVÍTHATATLAN ✗</text>
          <text x={125} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={11}>f(x,y) = 2xy / (x²+y²)</text>
          <text x={125} y={76} textAnchor="middle" fill="#fb923c" fontSize={10}>Nincs határérték (−1 és +1 közt ugrál)</text>
          <text x={125} y={104} textAnchor="middle" fill="#fca5a5" fontSize={10}>Bármit adsz f(0,0)-nak, szakadás marad!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. 3D δ-gömb és térbeli utak */
export function Sphere3DLimitDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Háromváltozós határérték: lyukas δ-gömb az (x₀, y₀, z₀) pont körül</div>
      <svg className="plane" viewBox="0 0 540 165">
        <rect width={540} height={165} className="pl-bg" />

        {/* Bal: 3D gömb */}
        <circle cx={135} cy={86} r={54} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeDasharray="5 3" strokeWidth={1.8} />
        <ellipse cx={135} cy={86} rx={54} ry={18} fill="none" stroke="rgba(56,189,248,0.45)" strokeDasharray="3 3" />
        <circle cx={135} cy={86} r={4} fill="#0f172a" stroke="#fbbf24" strokeWidth={2} />
        <line x1={135} y1={86} x2={189} y2={86} stroke="#fbbf24" strokeWidth={1.6} />
        <text x={162} y={79} textAnchor="middle" fill="#fbbf24" fontSize={10} fontWeight={700}>δ</text>
        <text x={135} y={154} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>0 &lt; √((x−x₀)²+(y−y₀)²+(z−z₀)²) &lt; δ</text>

        {/* Jobb: 2 klasszikus 3D példa */}
        <g transform="translate(245, 16)">
          <rect width={282} height={60} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.4} />
          <text x={141} y={22} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>Létezik (→ 0): xyz / (x² + y² + z²)</text>
          <text x={141} y={44} textAnchor="middle" fill="#cbd5e1" fontSize={9.8}>|xy| ≤ ½(x²+y²) ⇒ |f| ≤ ½|z| → 0 ✓</text>
        </g>

        <g transform="translate(245, 88)">
          <rect width={282} height={60} rx={8} fill="#0f172a" stroke="#f87171" strokeWidth={1.4} />
          <text x={141} y={22} textAnchor="middle" fill="#f87171" fontSize={10.5} fontWeight={700}>Nem létezik: (xy+yz+zx)/(x²+y²+z²)</text>
          <text x={141} y={44} textAnchor="middle" fill="#cbd5e1" fontSize={9.8}>x-tengelyen 0, míg x=y=z átlón 1 ≠ 0 ✗</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. 2D határérték-döntési fa */
export function Limit2DDecisionTreeDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">4 lépéses vizsgastratégia: hogyan támadj meg egy 2D határértéket?</div>
      <svg className="plane" viewBox="0 0 540 132">
        <rect width={540} height={132} className="pl-bg" />

        <g transform="translate(10, 18)">
          <rect width={118} height={94} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={59} y={22} textAnchor="middle" fill="#38bdf8" fontSize={10.5} fontWeight={700}>1. Behelyettesítés</text>
          <text x={59} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>Nevező ≠ 0?</text>
          <text x={59} y={70} textAnchor="middle" fill="#34d399" fontSize={9.5} fontWeight={700}>Kész! f(x₀, y₀)</text>
        </g>
        <path d="M130,65 L143,65" stroke="#64748b" strokeWidth={2} />

        <g transform="translate(145, 18)">
          <rect width={118} height={94} rx={8} fill="#0f172a" stroke="#2dd4bf" strokeWidth={1.5} />
          <text x={59} y={22} textAnchor="middle" fill="#2dd4bf" fontSize={10.5} fontWeight={700}>2. Algebra</text>
          <text x={59} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>Kiemelés, gyök-</text>
          <text x={59} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>telenítés (0/0)</text>
        </g>
        <path d="M265,65 L278,65" stroke="#64748b" strokeWidth={2} />

        <g transform="translate(280, 18)">
          <rect width={118} height={94} rx={8} fill="#0f172a" stroke="#f87171" strokeWidth={1.5} />
          <text x={59} y={22} textAnchor="middle" fill="#f87171" fontSize={10.5} fontWeight={700}>3. Utak próbája</text>
          <text x={59} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>y = mx, y = kx²</text>
          <text x={59} y={70} textAnchor="middle" fill="#f87171" fontSize={9.5} fontWeight={700}>Eltér ⇒ NINCS!</text>
        </g>
        <path d="M400,65 L413,65" stroke="#64748b" strokeWidth={2} />

        <g transform="translate(415, 18)">
          <rect width={115} height={94} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={57} y={22} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>4. Bizonyítás</text>
          <text x={57} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>Polár (r → 0⁺)</text>
          <text x={57} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>v. Szendvicstétel</text>
        </g>
      </svg>
    </div>
  );
}
