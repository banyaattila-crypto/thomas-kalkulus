import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

/* -------------------------------------------------------------------------- */
/* 1. ParametricEllipseWidget: x = 3 cos t, y = 2 sin t irányítással          */
/* -------------------------------------------------------------------------- */
export function ParametricEllipseWidget() {
  const [deg, setDeg] = useState(50);
  const [cw, setCw] = useState(false);

  const t = (deg * Math.PI) / 180;
  const s = cw ? -1 : 1;
  const x = 3 * Math.cos(t);
  const y = 2 * Math.sin(s * t);
  const vx = -3 * Math.sin(t);
  const vy = 2 * s * Math.cos(s * t);

  const W = 540;
  const H = 260;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 48;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  // Megtett ív 0-tól t-ig
  const arcPts: string[] = [];
  const N = Math.max(2, Math.round(deg / 3));
  for (let i = 0; i <= N; i++) {
    const th = (t * i) / N;
    arcPts.push(`${i ? 'L' : 'M'}${X(3 * Math.cos(th)).toFixed(1)},${Y(2 * Math.sin(s * th)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Paraméterezett ellipszis: helyzet és sebességvektor</div>
      <div className="sliders">
        <label>
          paraméter t = {deg}° ({fmt(t, 2)} rad)
          <input type="range" min={0} max={360} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        <button className={!cw ? 'on' : ''} onClick={() => setCw(false)}>
          Pozitív (x = 3 cos t, y = 2 sin t)
        </button>
        <button className={cw ? 'on' : ''} onClick={() => setCw(true)}>
          Óramutatóval (x = 3 cos t, y = −2 sin t)
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        <ellipse cx={cx} cy={cy} rx={3 * sc} ry={2 * sc} fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth={2} />
        <path d={arcPts.join(' ')} className="pl-main" />

        {/* Sebességvektor (skálázva) */}
        <line x1={X(x)} y1={Y(y)} x2={X(x + vx * 0.42)} y2={Y(y + vy * 0.42)} stroke="#fbbf24" strokeWidth={2.4} />
        <circle cx={X(x + vx * 0.42)} cy={Y(y + vy * 0.42)} r={3} fill="#fbbf24" />

        <circle cx={X(3)} cy={Y(0)} r={4} fill="#94a3b8" />
        <circle cx={X(x)} cy={Y(y)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(x) + 10} y={Y(y) - 8} className="pl-label" fill="#34d399">
          P({fmt(x, 2)}; {fmt(y, 2)})
        </text>
      </svg>
      <div className="explain">
        <p>
          A pont mindig az <M t="\tfrac{x^2}{9}+\tfrac{y^2}{4}=1" /> ellipszisen halad, de a paraméterezés a{' '}
          <strong>bejárás irányát</strong> és a <strong>sebességet</strong> is megadja: itt{' '}
          <M t={`(x'(t);\\,y'(t)) = (${fmt(vx, 2)};\\,${fmt(vy, 2)})`} />.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. ParametricParabolaWidget: ferde hajítás parabolapályája                 */
/* -------------------------------------------------------------------------- */
export function ParametricParabolaWidget() {
  const [angle, setAngle] = useState(50);
  const [t, setT] = useState(1.6);

  const v0 = 20;
  const g = 10;
  const rad = (angle * Math.PI) / 180;
  const vx0 = v0 * Math.cos(rad);
  const vy0 = v0 * Math.sin(rad);
  const tFlight = (2 * vy0) / g;
  const tc = Math.min(t, tFlight);
  const px = vx0 * tc;
  const py = vy0 * tc - 0.5 * g * tc * tc;
  const range = vx0 * tFlight;
  const hMax = (vy0 * vy0) / (2 * g);

  const W = 540;
  const H = 250;
  const ox = 45;
  const oy = 215;
  const sc = 10.5;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy - v * sc;

  const fullPts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const ti = (tFlight * i) / 80;
    fullPts.push(`${i ? 'L' : 'M'}${X(vx0 * ti).toFixed(1)},${Y(vy0 * ti - 0.5 * g * ti * ti).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Ferde hajítás: x(t) = (v₀ cos α)t, y(t) = (v₀ sin α)t − ½gt² (v₀ = 20, g = 10)</div>
      <div className="sliders">
        <label>
          kilövési szög α = {angle}°
          <input type="range" min={20} max={75} step={5} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
        </label>
        <label>
          idő t = {fmt(tc, 2)} s (repülési idő: {fmt(tFlight, 2)} s)
          <input type="range" min={0} max={4} step={0.05} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={oy} x2={W - 20} y2={oy} className="pl-axis" />
        <line x1={ox} y1={15} x2={ox} y2={H - 15} className="pl-axis" />
        <path d={fullPts.join(' ')} className="pl-main" />
        <line x1={X(px)} y1={oy} x2={X(px)} y2={Y(py)} className="pl-dash2" />
        <circle cx={X(px)} cy={Y(py)} r={5.5} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(px) + 8} y={Y(py) - 8} className="pl-label" fill="#fb923c">
          ({fmt(px, 1)}; {fmt(py, 1)})
        </text>
        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill="#38bdf8">
          Hatótáv: {fmt(range, 1)} m · Csúcs: {fmt(hMax, 1)} m
        </text>
      </svg>
      <div className="explain">
        <p>
          A <M t="t = \dfrac{x}{v_0\cos\alpha}" /> időt kiküszöbölve mindig lefelé nyíló{' '}
          <strong>parabolát</strong> kapunk: <M t="y = x\tan\alpha - \dfrac{g}{2v_0^2\cos^2\alpha}x^2" />. A legnagyobb
          hatótávot <M t="\alpha = 45^\circ" />-nál éri el!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. ParametricHyperbolaWidget: trigonometrikus vs. hiperbolikus             */
/* -------------------------------------------------------------------------- */
export function ParametricHyperbolaWidget() {
  const [mode, setMode] = useState<'trig' | 'hyp'>('trig');
  const [u, setU] = useState(0.75);

  // x^2/4 - y^2/9 = 1 (a=2, b=3)
  const a = 2;
  const b = 3;
  const px = mode === 'trig' ? a / Math.cos(u) : a * Math.cosh(u);
  const py = mode === 'trig' ? b * Math.tan(u) : b * Math.sinh(u);

  const W = 540;
  const H = 260;
  const cx = 210;
  const cy = H / 2;
  const sc = 28;
  const X = (v: number) => cx + v * sc;
  const Y = (v: number) => cy - v * sc;

  const branch = (sign: number) => {
    const pts: string[] = [];
    for (let i = -40; i <= 40; i++) {
      const s = (i / 40) * 1.65;
      const x = sign * a * Math.cosh(s);
      const y = b * Math.sinh(s);
      if (X(x) < 12 || X(x) > W - 12 || Y(y) < 8 || Y(y) > H - 8) continue;
      pts.push(`${pts.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const uMin = mode === 'trig' ? -1.15 : -1.5;
  const uMax = mode === 'trig' ? 1.15 : 1.5;
  const uc = Math.max(uMin, Math.min(uMax, u));
  const cpx = mode === 'trig' ? a / Math.cos(uc) : a * Math.cosh(uc);
  const cpy = mode === 'trig' ? b * Math.tan(uc) : b * Math.sinh(uc);

  return (
    <div className="widget">
      <div className="widget-title">A x²/4 − y²/9 = 1 hiperbola jobb ágának két paraméterezése</div>
      <div className="relbuttons chips">
        <button className={mode === 'trig' ? 'on' : ''} onClick={() => setMode('trig')}>
          Trigonometrikus: (2 / cos t, 3 tan t)
        </button>
        <button className={mode === 'hyp' ? 'on' : ''} onClick={() => setMode('hyp')}>
          Hiperbolikus: (2 ch t, 3 sh t)
        </button>
      </div>
      <div className="sliders">
        <label>
          paraméter t = {fmt(uc, 2)} {mode === 'trig' ? '(−π/2 < t < π/2)' : '(t ∈ ℝ)'}
          <input type="range" min={uMin} max={uMax} step={0.05} value={uc} onChange={(e) => setU(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />
        <line x1={X(-6)} y1={Y(-9)} x2={X(6)} y2={Y(9)} className="pl-dash2" />
        <line x1={X(-6)} y1={Y(9)} x2={X(6)} y2={Y(-9)} className="pl-dash2" />

        <path d={branch(1)} className="pl-alt" />
        <path d={branch(-1)} className="pl-alt" opacity={0.35} />

        <circle cx={X(a)} cy={cy} r={4} fill="#34d399" />
        {X(cpx) < W - 8 && Y(cpy) > 8 && Y(cpy) < H - 8 && (
          <>
            <circle cx={X(cpx)} cy={Y(cpy)} r={5.5} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />
            <text x={X(cpx) + 10} y={Y(cpy) - 6} className="pl-label" fill="#38bdf8">
              P({fmt(cpx, 2)}; {fmt(cpy, 2)})
            </text>
          </>
        )}
      </svg>
      <div className="explain">
        <p>
          Ellenőrzés: <M t={`\\frac{x^2}{4} - \\frac{y^2}{9} = ${fmt((px * px) / 4 - (py * py) / 9, 2)}`} />.{' '}
          {mode === 'trig'
            ? 'A 1/cos²t − tan²t = 1 azonosság a (−π/2; π/2) tartományon a jobb, a (π/2; 3π/2) tartományon a bal ágat adja.'
            : 'A ch²t − sh²t = 1 azonosság minden t ∈ ℝ értékre szakadásmentesen járja be a jobb ágat!'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. CycloidRollingWidget: guruló kerék és ciklois keletkezése               */
/* -------------------------------------------------------------------------- */
export function CycloidRollingWidget() {
  const [t, setT] = useState(2.2);
  const a = 1;
  const px = a * (t - Math.sin(t));
  const py = a * (1 - Math.cos(t));

  const W = 540;
  const H = 220;
  const ox = 36;
  const oy = 178;
  const sc = 37;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy - v * sc;

  const fullCyc: string[] = [];
  const tracedCyc: string[] = [];
  for (let i = 0; i <= 160; i++) {
    const s = (i / 160) * 4 * Math.PI;
    const cmd = `${i ? 'L' : 'M'}${X(s - Math.sin(s)).toFixed(1)},${Y(1 - Math.cos(s)).toFixed(1)}`;
    fullCyc.push(cmd);
    if (s <= t + 0.02) tracedCyc.push(cmd);
  }

  return (
    <div className="widget">
      <div className="widget-title">A ciklois keletkezése: guruló korong (a = 1) peremének P pontja</div>
      <div className="sliders">
        <label>
          elfordulási szög t = {fmt(t, 2)} rad ({Math.round((t * 180) / Math.PI)}°)
          <input type="range" min={0} max={12.56} step={0.08} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={12} y1={oy} x2={W - 12} y2={oy} className="pl-axis" />

        {/* Teljes két ív halványan */}
        <path d={fullCyc.join(' ')} fill="none" stroke="rgba(148,163,184,0.28)" strokeWidth={2} strokeDasharray="5 4" />
        {/* Megtett ciklois */}
        <path d={tracedCyc.join(' ')} className="pl-main" />

        {/* Guruló kerék */}
        <circle cx={X(t)} cy={Y(1)} r={sc} fill="rgba(56,189,248,0.08)" stroke="#fbbf24" strokeWidth={2} />
        <line x1={X(t)} y1={Y(1)} x2={X(px)} y2={Y(py)} stroke="#fbbf24" strokeWidth={2} />
        <line x1={X(t)} y1={Y(1)} x2={X(t)} y2={oy} className="pl-dash2" />

        {/* Középpont, talajpont, P pont */}
        <circle cx={X(t)} cy={Y(1)} r={3.5} fill="#fbbf24" />
        <circle cx={X(t)} cy={oy} r={3.5} fill="#94a3b8" />
        <circle cx={X(px)} cy={Y(py)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />

        {/* Csúcsok és 2π jelölések */}
        <text x={X(Math.PI)} y={oy + 18} textAnchor="middle" className="pl-tick">
          π
        </text>
        <text x={X(2 * Math.PI)} y={oy + 18} textAnchor="middle" className="pl-tick">
          2π
        </text>
        <text x={X(4 * Math.PI)} y={oy + 18} textAnchor="middle" className="pl-tick">
          4π
        </text>
      </svg>
      <div className="explain">
        <p>
          <M t={`x = t - \\sin t = ${fmt(px, 2)}`} />, <M t={`y = 1 - \\cos t = ${fmt(py, 2)}`} />. A{' '}
          <M t="t = 0,\,2\pi,\,4\pi" /> helyeken a kerék pontja megáll, és éles <strong>csúcspontot (kuszpist)</strong>{' '}
          rajzol függőleges érintővel!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. CycloidCalculusWidget: érintő, ívhossz (8a) és terület (3πa²)           */
/* -------------------------------------------------------------------------- */
export function CycloidCalculusWidget() {
  const [t, setT] = useState(2.1);
  const px = t - Math.sin(t);
  const py = 1 - Math.cos(t);
  const sAcc = 4 * (1 - Math.cos(t / 2)); // int_0^t 2 sin(u/2) du
  const slope = Math.abs(1 - Math.cos(t)) > 0.04 ? Math.sin(t) / (1 - Math.cos(t)) : null;

  const W = 540;
  const H = 235;
  const ox = 56;
  const oy = 192;
  const sc = 68;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy - v * sc;

  const fullPts: string[] = [];
  const areaPts: string[] = [`M${X(0).toFixed(1)},${oy}`];
  for (let i = 0; i <= 100; i++) {
    const s = (i / 100) * 2 * Math.PI;
    const x = s - Math.sin(s);
    const y = 1 - Math.cos(s);
    fullPts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    if (s <= t + 0.01) areaPts.push(`L${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
  }
  areaPts.push(`L${X(px).toFixed(1)},${oy} Z`);

  return (
    <div className="widget">
      <div className="widget-title">Egy cikloisív érintője, ívhossza (8a) és területe (3πa²)</div>
      <div className="sliders">
        <label>
          paraméter t = {fmt(t, 2)} rad (0 &lt; t &lt; 2π)
          <input type="range" min={0.15} max={6.13} step={0.08} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={oy} x2={W - 20} y2={oy} className="pl-axis" />

        {/* Terület 0-tól t-ig */}
        <path d={areaPts.join(' ')} className="pl-fill" />
        <path d={fullPts.join(' ')} className="pl-main" />

        {/* Érintő P-ben */}
        {slope !== null && (
          <line
            x1={X(px - 0.9)}
            y1={Y(py - 0.9 * slope)}
            x2={X(px + 0.9)}
            y2={Y(py + 0.9 * slope)}
            stroke="#fb923c"
            strokeWidth={2.2}
          />
        )}

        <circle cx={X(px)} cy={Y(py)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill="#38bdf8">
          Eddigi ívhossz: {fmt(sAcc, 2)} / 8,00
        </text>
        <text x={W - 14} y={44} textAnchor="end" className="pl-label" fill="#fb923c">
          Meredekség cot(t/2) = {slope !== null ? fmt(slope, 2) : '∞'}
        </text>
      </svg>
      <div className="explain">
        <p>
          Egy teljes ív hossza pontosan <M t="L = 8a" /> (a kerék átmérőjének négyszerese — nincs benne <M t="\pi" />!),
          az alatta lévő terület pedig <M t="T = 3\pi a^2" /> (pontosan háromszorosa a guruló kör területének).
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. BrachistochroneRaceWidget: 3 pálya versenye O(0,0) -> B(π, 2)           */
/* -------------------------------------------------------------------------- */
export function BrachistochroneRaceWidget() {
  const [tau, setTau] = useState(0.75); // 0 .. 1.25 (ciklois 1.0-nál ér célba)

  const W = 540;
  const H = 250;
  const ox = 80;
  const oy = 38;
  const sc = 88;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy + v * sc; // y lefelé nő!

  // 1. Ciklois: x = t - sin t, y = 1 - cos t, t ∈ [0, π].
  // Fizikailag t = π * tau (mivel dt/d(idő) = const a cikloison!).
  const tCyc = Math.min(1, tau) * Math.PI;
  const cx1 = tCyc - Math.sin(tCyc);
  const cy1 = 1 - Math.cos(tCyc);

  // 2. Egyenes O(0,0) -> B(π, 2): egyenletesen gyorsuló mozgás, s(tau) = (tau / 1.21)^2
  const kLine = Math.min(1, Math.pow(tau / 1.21, 2));
  const lx = kLine * Math.PI;
  const ly = kLine * 2;

  // 3. Parabolikus / körív jellegű köztes pálya: y = 2 * sin( (π/2) * (x/π) ), célba ér ~1.06-nál
  const kMid = Math.min(1, Math.pow(tau / 1.06, 1.55));
  const mx = kMid * Math.PI;
  const my = 2 * Math.sin((Math.PI / 2) * kMid);

  const cycPath: string[] = [];
  const midPath: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const s = (i / 60) * Math.PI;
    cycPath.push(`${i ? 'L' : 'M'}${X(s - Math.sin(s)).toFixed(1)},${Y(1 - Math.cos(s)).toFixed(1)}`);
    const u = i / 60;
    midPath.push(`${i ? 'L' : 'M'}${X(u * Math.PI).toFixed(1)},${Y(2 * Math.sin((Math.PI / 2) * u)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Brachisztochron-verseny: melyik golyó ér le leggyorsabban O-ból B-be?</div>
      <div className="sliders">
        <label>
          eltelt idő τ = {fmt(tau, 2)} (a ciklois τ = 1,00-nál célba ér!)
          <input type="range" min={0} max={1.25} step={0.02} value={tau} onChange={(e) => setTau(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {/* Pályák */}
        <line x1={X(0)} y1={Y(0)} x2={X(Math.PI)} y2={Y(2)} stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 4" />
        <path d={midPath.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2} />
        <path d={cycPath.join(' ')} fill="none" stroke="#34d399" strokeWidth={2.8} />

        {/* Végpontok */}
        <circle cx={X(0)} cy={Y(0)} r={4} fill="#e2e8f0" />
        <text x={X(0) - 10} y={Y(0) + 4} textAnchor="end" className="pl-label" fill="#e2e8f0">
          O(0; 0)
        </text>
        <circle cx={X(Math.PI)} cy={Y(2)} r={5} fill="#fbbf24" />
        <text x={X(Math.PI) + 10} y={Y(2) + 4} className="pl-label" fill="#fbbf24">
          B(π; 2)
        </text>

        {/* Golyók */}
        <circle cx={X(lx)} cy={Y(ly)} r={6} fill="#94a3b8" stroke="#0b0e24" strokeWidth={1.5} />
        <circle cx={X(mx)} cy={Y(my)} r={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />
        <circle cx={X(cx1)} cy={Y(cy1)} r={6.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />

        {/* Jelmagyarázat */}
        <text x={W - 14} y={26} textAnchor="end" className="pl-label" fill="#34d399">
          ● Ciklois (1,00× idő)
        </text>
        <text x={W - 14} y={46} textAnchor="end" className="pl-label" fill="#38bdf8">
          ● Ívelt pálya (1,06×)
        </text>
        <text x={W - 14} y={66} textAnchor="end" className="pl-label" fill="#94a3b8">
          ● Egyenes (1,21×)
        </text>
      </svg>
      <div className="explain">
        <p>
          Bár az egyenes a <em>legrövidebb</em> út, a <strong>ciklois</strong> (zöld) az elején meredeken esik, így
          gyorsan nagy sebességre tesz szert, és behozhatatlanul megelőzi a többi pályát!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. TautochroneDropWidget: 3 golyó egyszerre ér alulra                      */
/* -------------------------------------------------------------------------- */
export function TautochroneDropWidget() {
  const [tau, setTau] = useState(0.6); // 0 .. 1

  const W = 540;
  const H = 220;
  const ox = 85;
  const oy = 32;
  const sc = 58;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy + v * sc;

  const fullPts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const s = (i / 80) * 2 * Math.PI;
    fullPts.push(`${i ? 'L' : 'M'}${X(s - Math.sin(s)).toFixed(1)},${Y(1 - Math.cos(s)).toFixed(1)}`);
  }

  // A tautochronon az ívhossz s = -4a cos(t/2) harmonikus rezgést végez: cos(t/2) = cos(t0/2) * cos((π/2)*tau)
  const starts = [
    { t0: 0.25 * Math.PI, col: '#38bdf8', lbl: 'Magasról' },
    { t0: 0.55 * Math.PI, col: '#fbbf24', lbl: 'Középről' },
    { t0: 0.8 * Math.PI, col: '#fb923c', lbl: 'Alacsonyról' },
  ];

  const beads = starts.map((b) => {
    const cHalf = Math.cos(b.t0 / 2) * Math.cos((Math.PI / 2) * tau);
    const tNow = 2 * Math.acos(Math.max(-1, Math.min(1, cHalf)));
    return { ...b, x: tNow - Math.sin(tNow), y: 1 - Math.cos(tNow) };
  });

  return (
    <div className="widget">
      <div className="widget-title">Tautochron tulajdonság: 3 különböző magasságból egyszerre indított golyó</div>
      <div className="sliders">
        <label>
          idő aránya τ = {fmt(tau, 2)} (τ = 1,00-nál mindhárom pontban egyszerre ér alulra!)
          <input type="range" min={0} max={1} step={0.02} value={tau} onChange={(e) => setTau(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <path d={fullPts.join(' ')} fill="none" stroke="rgba(148,163,184,0.45)" strokeWidth={2.4} />
        <circle cx={X(Math.PI)} cy={Y(2)} r={5} fill="#34d399" />
        <text x={X(Math.PI)} y={Y(2) + 22} textAnchor="middle" className="pl-label" fill="#34d399">
          Legmélyebb pont B(πa; 2a)
        </text>
        {beads.map((b) => (
          <circle key={b.lbl} cx={X(b.x)} cy={Y(b.y)} r={6.5} fill={b.col} stroke="#0b0e24" strokeWidth={1.5} />
        ))}
      </svg>
      <div className="explain">
        <p>
          Akár a ciklois tetejéről, akár a közepéről engedjük el a golyót, pontosan ugyanannyi{' '}
          <M t="T = \pi\sqrt{a/g}" /> idő alatt érkezik meg a legmélyebb pontba — ezért tökéletes az ingaórához!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. ParametricConicsSummaryDiagram: 4 paraméterezés összképe                */
/* -------------------------------------------------------------------------- */
export function ParametricConicsSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Négy alapvető paraméteres görbe egy pillantásra</div>
      <svg className="plane" viewBox="0 0 540 155">
        <rect width={540} height={155} className="pl-bg" />

        <g transform="translate(0, 0)">
          <text x={67} y={22} textAnchor="middle" className="pl-label" fill="#38bdf8">
            Ellipszis
          </text>
          <ellipse cx={67} cy={78} rx={42} ry={24} className="pl-main" />
          <text x={67} y={128} textAnchor="middle" className="pl-tick">
            a cos t, b sin t
          </text>
          <text x={67} y={144} textAnchor="middle" className="pl-tick">
            0 ≤ t ≤ 2π
          </text>
        </g>

        <line x1={135} y1={14} x2={135} y2={146} className="pl-grid" />

        <g transform="translate(135, 0)">
          <text x={67} y={22} textAnchor="middle" className="pl-label" fill="#fbbf24">
            Parabola
          </text>
          <path d="M 28 45 Q 67 135 106 45" fill="none" stroke="#fbbf24" strokeWidth={2.5} />
          <text x={67} y={128} textAnchor="middle" className="pl-tick">
            x = t, y = t²
          </text>
          <text x={67} y={144} textAnchor="middle" className="pl-tick">
            t ∈ ℝ
          </text>
        </g>

        <line x1={270} y1={14} x2={270} y2={146} className="pl-grid" />

        <g transform="translate(270, 0)">
          <text x={67} y={22} textAnchor="middle" className="pl-label" fill="#fb923c">
            Hiperbola
          </text>
          <path d="M 30 46 Q 55 78 30 110 M 104 46 Q 79 78 104 110" fill="none" stroke="#fb923c" strokeWidth={2.5} />
          <text x={67} y={128} textAnchor="middle" className="pl-tick">
            a/cos t, b tan t
          </text>
          <text x={67} y={144} textAnchor="middle" className="pl-tick">
            vagy a ch t, b sh t
          </text>
        </g>

        <line x1={405} y1={14} x2={405} y2={146} className="pl-grid" />

        <g transform="translate(405, 0)">
          <text x={67} y={22} textAnchor="middle" className="pl-label" fill="#34d399">
            Ciklois
          </text>
          <path d="M 16 104 Q 42 36 67 104 Q 93 36 118 104" fill="none" stroke="#34d399" strokeWidth={2.5} />
          <text x={67} y={128} textAnchor="middle" className="pl-tick">
            a(t−sin t), a(1−cos t)
          </text>
          <text x={67} y={144} textAnchor="middle" className="pl-tick">
            L = 8a, T = 3πa²
          </text>
        </g>
      </svg>
    </div>
  );
}
