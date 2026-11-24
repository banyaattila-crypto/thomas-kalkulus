import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

/* -------------------------------------------------------------------------- */
/* 1. EccentricitySpectrumDiagram: kör → ellipszis → parabola → hiperbola      */
/* -------------------------------------------------------------------------- */
export function EccentricitySpectrumDiagram() {
  const [e, setE] = useState(0.6);

  const W = 540;
  const H = 290;
  const cx = 215;
  const cy = H / 2;
  const sc = 42;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  // Fókusz F(0,0), legközelebbi csúcs V(-1,0) minden e >= 0 esetén:
  // r(theta) = (1 + e) / (1 - e cos(theta))
  // Vezéregyenes: x = -(1 + 1/e) (ha e > 0)
  const buildPath = (thetaMin: number, thetaMax: number, steps: number, sign = 1) => {
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const th = thetaMin + ((thetaMax - thetaMin) * i) / steps;
      const denom = 1 - e * Math.cos(th);
      if (Math.abs(denom) < 0.04) continue;
      const r = (1 + e) / denom;
      if (sign > 0 && r < 0) continue;
      if (sign < 0 && r > 0) continue;
      const x = r * Math.cos(th);
      const y = r * Math.sin(th);
      if (x < -5.5 || x > 8.5 || Math.abs(y) > 4.2) continue;
      pts.push(`${pts.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  let mainPaths: string[] = [];
  if (e < 0.999) {
    mainPaths = [buildPath(0, Math.PI * 2, 240, 1)];
  } else if (Math.abs(e - 1) <= 0.001) {
    mainPaths = [buildPath(0.28, Math.PI * 2 - 0.28, 220, 1)];
  } else {
    const asym = Math.acos(1 / e);
    const eps = 0.06;
    mainPaths = [
      buildPath(asym + eps, Math.PI * 2 - asym - eps, 180, 1),
      buildPath(-asym + eps, asym - eps, 140, -1),
    ];
  }

  const kind =
    e < 0.001 ? 'Kör (e = 0)' : e < 0.999 ? 'Ellipszis (0 < e < 1)' : Math.abs(e - 1) <= 0.001 ? 'Parabola (e = 1)' : 'Hiperbola (e > 1)';
  const col = e < 0.001 ? '#34d399' : e < 0.999 ? '#38bdf8' : Math.abs(e - 1) <= 0.001 ? '#fbbf24' : '#fb923c';
  const dirX = e > 0.15 ? -(1 + 1 / e) : null;

  return (
    <div className="widget">
      <div className="widget-title">Excentricitás-spektrum: közös fókusz F(0; 0) és csúcs V(−1; 0)</div>
      <div className="sliders">
        <label>
          excentricitás e = {fmt(e, 2)}
          <input type="range" min={0} max={2.4} step={0.05} value={e} onChange={(ev) => setE(Number(ev.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        {[
          { l: 'Kör (0)', v: 0 },
          { l: 'Ellipszis (0,6)', v: 0.6 },
          { l: 'Nyújtott (0,85)', v: 0.85 },
          { l: 'Parabola (1)', v: 1 },
          { l: 'Hiperbola (1,5)', v: 1.5 },
          { l: 'Tág (2,2)', v: 2.2 },
        ].map((p) => (
          <button key={p.l} className={Math.abs(e - p.v) < 0.025 ? 'on' : ''} onClick={() => setE(p.v)}>
            {p.l}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((gx) => (
          <line key={`gx${gx}`} x1={X(gx)} y1={0} x2={X(gx)} y2={H} className="pl-grid" />
        ))}
        {[-3, -2, -1, 0, 1, 2, 3].map((gy) => (
          <line key={`gy${gy}`} x1={0} y1={Y(gy)} x2={W} y2={Y(gy)} className="pl-grid" />
        ))}
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        {dirX !== null && X(dirX) > 10 && X(dirX) < W - 10 && (
          <>
            <line x1={X(dirX)} y1={8} x2={X(dirX)} y2={H - 8} className="pl-dash" />
            <text x={X(dirX) + 6} y={24} className="pl-label" fill="#fbbf24">
              vezéregyenes
            </text>
          </>
        )}

        {mainPaths.map((d, idx) => (
          <path key={idx} d={d} fill="none" stroke={col} strokeWidth={2.8} />
        ))}

        <circle cx={X(0)} cy={Y(0)} r={5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(0) + 8} y={Y(0) - 8} className="pl-label" fill="#fbbf24">
          F(0; 0)
        </text>
        <circle cx={X(-1)} cy={Y(0)} r={4.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(-1) - 10} y={Y(0) + 18} textAnchor="end" className="pl-label" fill="#34d399">
          V(−1; 0)
        </text>

        <text x={W - 14} y={26} textAnchor="end" className="pl-label" fill={col}>
          {kind}
        </text>
      </svg>
      <div className="explain">
        <p>
          Húzd végig az <em>e</em> csúszkát <M t="0" />-tól <M t="2{,}4" />-ig: a körből egyre nyújtottabb ellipszis lesz,{' '}
          <M t="e=1" />-nél a jobb oldali csúcs a végtelenbe szakad (parabola), <M t="e>1" /> esetén pedig megjelenik a
          hiperbola második ága!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. EllipseEccentricityWidget: rögzített a=4, változó c -> alak és e        */
/* -------------------------------------------------------------------------- */
export function EllipseEccentricityWidget() {
  const [c, setC] = useState(2.4);
  const a = 4;
  const b = Math.sqrt(Math.max(0.01, a * a - c * c));
  const e = c / a;
  const dir = c > 0.05 ? a / e : null;

  const W = 540;
  const H = 280;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 28;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  return (
    <div className="widget">
      <div className="widget-title">Ellipszis alakja rögzített a = 4 félnagytengely mellett</div>
      <div className="sliders">
        <label>
          fókusztávolság c = {fmt(c, 2)} (0 ≤ c &lt; 4)
          <input type="range" min={0} max={3.9} step={0.1} value={c} onChange={(ev) => setC(Number(ev.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map((gx) => (
          <line key={`gx${gx}`} x1={X(gx)} y1={0} x2={X(gx)} y2={H} className="pl-grid" />
        ))}
        {[-4, -2, 0, 2, 4].map((gy) => (
          <line key={`gy${gy}`} x1={0} y1={Y(gy)} x2={W} y2={Y(gy)} className="pl-grid" />
        ))}
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        {dir !== null && dir <= 9.2 && (
          <>
            <line x1={X(dir)} y1={10} x2={X(dir)} y2={H - 10} className="pl-dash" />
            <line x1={X(-dir)} y1={10} x2={X(-dir)} y2={H - 10} className="pl-dash" />
            <text x={X(dir) + 5} y={24} className="pl-label" fill="#fbbf24">
              x = {fmt(dir, 2)}
            </text>
          </>
        )}

        <ellipse cx={cx} cy={cy} rx={a * sc} ry={b * sc} className="pl-main" />

        {/* Fókuszok */}
        <circle cx={X(-c)} cy={cy} r={4.5} fill="#fb923c" />
        <circle cx={X(c)} cy={cy} r={4.5} fill="#fb923c" />
        <text x={X(c)} y={cy - 10} textAnchor="middle" className="pl-label" fill="#fb923c">
          F₂({fmt(c, 1)}; 0)
        </text>

        {/* Csúcsok */}
        <circle cx={X(-a)} cy={cy} r={4} fill="#34d399" />
        <circle cx={X(a)} cy={cy} r={4} fill="#34d399" />
        <circle cx={cx} cy={Y(b)} r={4} fill="#38bdf8" />
        <text x={cx + 8} y={Y(b) - 6} className="pl-label" fill="#38bdf8">
          b = {fmt(b, 2)}
        </text>
      </svg>
      <div className="explain">
        <p>
          <M t={`e = \\frac{c}{a} = \\frac{${fmt(c, 2)}}{4} = ${fmt(e, 3)}`} />, félkistengely{' '}
          <M t={`b = \\sqrt{16 - c^2} \\approx ${fmt(b, 2)}`} />.{' '}
          {c < 0.05
            ? 'Amikor c = 0, a két fókusz egybeesik az origóval: az ellipszis pontosan kör!'
            : dir !== null && dir <= 9.2
              ? `Vezéregyenesek: x = ±a/e ≈ ±${fmt(dir, 2)}.`
              : 'Kis excentricitásnál a vezéregyenesek nagyon messzire (a/e → ∞) távolodnak.'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. OrbitEccentricityDiagram: bolygók és üstökösök pályái                   */
/* -------------------------------------------------------------------------- */
const ORBITS = [
  { name: 'Föld', e: 0.017, aText: '1,00 CSE', note: 'Szinte tökéletes kör; a két fókusz a Nap belsejébe esik.' },
  { name: 'Mars', e: 0.093, aText: '1,52 CSE', note: 'Kepler a Mars megfigyeléseiből fedezte fel az ellipszispályát.' },
  { name: 'Merkúr', e: 0.206, aText: '0,39 CSE', note: 'A belső bolygók közül a legexcentrikusabb pálya.' },
  { name: 'Plútó', e: 0.249, aText: '39,5 CSE', note: 'Napközelben beljebb jár, mint a Neptunusz.' },
  { name: 'Ikarosz', e: 0.827, aText: '1,08 CSE', note: 'Földközeli kisbolygó, rendkívül nyújtott pályával.' },
  { name: 'Halley-üstökös', e: 0.967, aText: '17,8 CSE', note: 'Naptávolban 60-szor messzebb van a Naptól, mint napközelben!' },
];

export function OrbitEccentricityDiagram() {
  const [idx, setIdx] = useState(5);
  const orb = ORBITS[idx];
  const a = 175;
  const c = a * orb.e;
  const b = Math.sqrt(a * a - c * c);
  const W = 540;
  const H = 260;
  const cx = W / 2 - 20;
  const cy = H / 2;
  const sunX = cx + c;
  const ratio = (1 + orb.e) / (1 - orb.e);

  return (
    <div className="widget">
      <div className="widget-title">Égitestek ellipszispályái (azonos ábrázolt nagytengellyel)</div>
      <div className="relbuttons chips">
        {ORBITS.map((o, i) => (
          <button key={o.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {o.name} ({fmt(o.e, 2)})
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-grid" />
        <ellipse cx={cx} cy={cy} rx={a} ry={Math.max(b, 8)} className="pl-main" />
        {/* Naptávol és napközel szakaszok */}
        <line x1={cx - a} y1={cy} x2={sunX} y2={cy} stroke="#38bdf8" strokeWidth={2} strokeDasharray="5 4" />
        <line x1={sunX} y1={cy} x2={cx + a} y2={cy} stroke="#fb923c" strokeWidth={2.5} />

        {/* Nap a jobb oldali fókuszban */}
        <circle cx={sunX} cy={cy} r={11} fill="rgba(251, 191, 36, 0.25)" />
        <circle cx={sunX} cy={cy} r={5.5} fill="#fbbf24" />
        <text x={sunX} y={cy - 15} textAnchor="middle" className="pl-label" fill="#fbbf24">
          Nap (F₂)
        </text>

        {/* Naptávol és napközel pontok */}
        <circle cx={cx - a} cy={cy} r={4} fill="#38bdf8" />
        <text x={cx - a + 4} y={cy + 20} className="pl-label" fill="#38bdf8">
          naptávol: a(1+e)
        </text>
        <circle cx={cx + a} cy={cy} r={4} fill="#fb923c" />
        <text x={cx + a} y={cy + 20} textAnchor="end" className="pl-label" fill="#fb923c">
          napközel: a(1−e)
        </text>
      </svg>
      <div className="explain">
        <p>
          <strong>{orb.name}</strong> (<M t={`e\\approx ${fmt(orb.e, 3)}`} />, <M t={`a\\approx \\text{${orb.aText}}`} />):{' '}
          {orb.note} Naptávol / napközel arány:{' '}
          <M t={`\\frac{1+e}{1-e} \\approx ${fmt(ratio, 2)}`} />.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. EllipseDirectrixWidget: PF2 = e * PD2 élő ellenőrzése                   */
/* -------------------------------------------------------------------------- */
export function EllipseDirectrixWidget() {
  const [deg, setDeg] = useState(55);
  const a = 4;
  const b = 2.4;
  const c = Math.sqrt(a * a - b * b); // 3.2
  const e = c / a; // 0.8
  const dir = a / e; // 5.0

  const th = (deg * Math.PI) / 180;
  const px = a * Math.cos(th);
  const py = b * Math.sin(th);
  const pf = Math.hypot(px - c, py);
  const pd = Math.abs(dir - px);

  const W = 540;
  const H = 270;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 36;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  return (
    <div className="widget">
      <div className="widget-title">Élő ellenőrzés: PF₂ = e · PD₂ az ellipszisen (a = 4, b = 2,4, e = 0,8)</div>
      <div className="sliders">
        <label>
          P pont szöge: {deg}°
          <input type="range" min={0} max={360} step={5} value={deg} onChange={(ev) => setDeg(Number(ev.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        {/* Vezéregyenesek */}
        <line x1={X(-dir)} y1={10} x2={X(-dir)} y2={H - 10} className="pl-dash" />
        <line x1={X(dir)} y1={10} x2={X(dir)} y2={H - 10} className="pl-dash" />
        <text x={X(dir) + 6} y={24} className="pl-label" fill="#fbbf24">
          x = 5
        </text>
        <text x={X(-dir) - 6} y={24} textAnchor="end" className="pl-label" fill="#fbbf24">
          x = −5
        </text>

        <ellipse cx={cx} cy={cy} rx={a * sc} ry={b * sc} className="pl-main" />

        {/* PF2 és PD2 szakaszok */}
        <line x1={X(px)} y1={Y(py)} x2={X(c)} y2={cy} stroke="#34d399" strokeWidth={2.5} />
        <line x1={X(px)} y1={Y(py)} x2={X(dir)} y2={Y(py)} stroke="#fbbf24" strokeWidth={2.5} />

        {/* Pontok */}
        <circle cx={X(-c)} cy={cy} r={4} fill="#94a3b8" />
        <circle cx={X(c)} cy={cy} r={5} fill="#fb923c" />
        <text x={X(c)} y={cy + 18} textAnchor="middle" className="pl-label" fill="#fb923c">
          F₂(3,2; 0)
        </text>
        <circle cx={X(px)} cy={Y(py)} r={5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(px) - 8} y={Y(py) - 10} className="pl-label" fill="#34d399">
          P
        </text>
        <circle cx={X(dir)} cy={Y(py)} r={4.5} fill="#fbbf24" />
        <text x={X(dir) + 8} y={Y(py) + 4} className="pl-label" fill="#fbbf24">
          D₂
        </text>
      </svg>
      <div className="explain">
        <p>
          <M t={`PF_2 = ${fmt(pf, 2)}`} />, <M t={`PD_2 = ${fmt(pd, 2)}`} /> <M t="\Longrightarrow" />{' '}
          <strong>
            <M t={`\\frac{PF_2}{PD_2} = ${fmt(pf / pd, 2)} = e`} />
          </strong>{' '}
          (a pont helyzetétől függetlenül állandó!).
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. HyperbolaEccentricityWidget: hiperbola alakja, aszimptotái, direktrixei */
/* -------------------------------------------------------------------------- */
export function HyperbolaEccentricityWidget() {
  const [b, setB] = useState(2.2);
  const a = 2;
  const c = Math.sqrt(a * a + b * b);
  const e = c / a;
  const dir = a / e;

  const W = 540;
  const H = 280;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 34;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const branch = (sign: number) => {
    const pts: string[] = [];
    for (let i = -40; i <= 40; i++) {
      const t = (i / 40) * 1.9;
      const x = sign * a * Math.cosh(t);
      const y = b * Math.sinh(t);
      if (Math.abs(x) > 8.2 || Math.abs(y) > 4.4) continue;
      pts.push(`${pts.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const slope = b / a;

  return (
    <div className="widget">
      <div className="widget-title">Hiperbola excentricitása és aszimptotái (rögzített a = 2)</div>
      <div className="sliders">
        <label>
          képzetes féltengely b = {fmt(b, 2)}
          <input type="range" min={0.8} max={4.8} step={0.1} value={b} onChange={(ev) => setB(Number(ev.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        {/* Aszimptoták */}
        <line x1={X(-8)} y1={Y(-8 * slope)} x2={X(8)} y2={Y(8 * slope)} className="pl-dash2" />
        <line x1={X(-8)} y1={Y(8 * slope)} x2={X(8)} y2={Y(-8 * slope)} className="pl-dash2" />

        {/* Vezéregyenesek: az origó és a csúcsok között! */}
        <line x1={X(-dir)} y1={10} x2={X(-dir)} y2={H - 10} className="pl-dash" />
        <line x1={X(dir)} y1={10} x2={X(dir)} y2={H - 10} className="pl-dash" />

        <path d={branch(1)} className="pl-alt" />
        <path d={branch(-1)} className="pl-alt" />

        {/* Csúcsok és fókuszok */}
        <circle cx={X(-a)} cy={cy} r={4} fill="#34d399" />
        <circle cx={X(a)} cy={cy} r={4} fill="#34d399" />
        <circle cx={X(-c)} cy={cy} r={4.5} fill="#38bdf8" />
        <circle cx={X(c)} cy={cy} r={4.5} fill="#38bdf8" />
        <text x={X(c)} y={cy - 10} textAnchor="middle" className="pl-label" fill="#38bdf8">
          F₂({fmt(c, 2)}; 0)
        </text>
        <text x={X(dir) - 4} y={24} textAnchor="end" className="pl-label" fill="#fbbf24">
          x = {fmt(dir, 2)}
        </text>
      </svg>
      <div className="explain">
        <p>
          <M t={`e = \\frac{c}{a} = ${fmt(e, 2)} > 1`} />, aszimptoták meredeksége{' '}
          <M t={`\\pm\\frac{b}{a} = \\pm\\sqrt{e^2-1} = \\pm ${fmt(slope, 2)}`} />. Figyeld meg: a hiperbola
          vezéregyenesei (<M t={`x=\\pm ${fmt(dir, 2)}`} />) a két csúcs <em>között</em> helyezkednek el, mert{' '}
          <M t="a/e < a" />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. HyperbolaDirectrixWidget: PF2 = e * PD2 élő ellenőrzése hiperbolán      */
/* -------------------------------------------------------------------------- */
export function HyperbolaDirectrixWidget() {
  const [t, setT] = useState(0.85);
  const a = 2;
  const b = Math.sqrt(5);
  const c = 3;
  const e = c / a; // 1.5
  const dir = a / e; // 4/3

  const px = a * Math.cosh(t);
  const py = b * Math.sinh(t);
  const pf = Math.hypot(px - c, py);
  const pd = Math.abs(px - dir);

  const W = 540;
  const H = 260;
  const cx = 190;
  const cy = H / 2;
  const sc = 42;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const branch = (sign: number) => {
    const pts: string[] = [];
    for (let i = -36; i <= 36; i++) {
      const s = (i / 36) * 1.45;
      const x = sign * a * Math.cosh(s);
      const y = b * Math.sinh(s);
      if (X(x) < 10 || X(x) > W - 10 || Y(y) < 5 || Y(y) > H - 5) continue;
      pts.push(`${pts.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return (
    <div className="widget">
      <div className="widget-title">Élő ellenőrzés: PF₂ = e · PD₂ a x²/4 − y²/5 = 1 hiperbolán (e = 1,5)</div>
      <div className="sliders">
        <label>
          P pont paramétere t = {fmt(t, 2)}
          <input type="range" min={-1.15} max={1.15} step={0.05} value={t} onChange={(ev) => setT(Number(ev.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        <line x1={X(dir)} y1={10} x2={X(dir)} y2={H - 10} className="pl-dash" />
        <text x={X(dir) - 6} y={24} textAnchor="end" className="pl-label" fill="#fbbf24">
          x = 4/3
        </text>

        <path d={branch(1)} className="pl-alt" />
        <path d={branch(-1)} className="pl-alt" opacity={0.45} />

        {/* PF2 és PD2 */}
        <line x1={X(px)} y1={Y(py)} x2={X(c)} y2={cy} stroke="#34d399" strokeWidth={2.5} />
        <line x1={X(px)} y1={Y(py)} x2={X(dir)} y2={Y(py)} stroke="#fbbf24" strokeWidth={2.5} />

        <circle cx={X(c)} cy={cy} r={5} fill="#38bdf8" />
        <text x={X(c)} y={cy + 18} textAnchor="middle" className="pl-label" fill="#38bdf8">
          F₂(3; 0)
        </text>
        <circle cx={X(px)} cy={Y(py)} r={5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(px) + 9} y={Y(py) - 6} className="pl-label" fill="#34d399">
          P
        </text>
        <circle cx={X(dir)} cy={Y(py)} r={4.5} fill="#fbbf24" />
        <text x={X(dir) - 8} y={Y(py) - 6} textAnchor="end" className="pl-label" fill="#fbbf24">
          D₂
        </text>
      </svg>
      <div className="explain">
        <p>
          <M t={`PF_2 = ${fmt(pf, 2)}`} />, <M t={`PD_2 = ${fmt(pd, 2)}`} /> <M t="\Longrightarrow" />{' '}
          <strong>
            <M t={`\\frac{PF_2}{PD_2} = ${fmt(pf / pd, 2)} = 1{,}50 = e`} />
          </strong>
          . A hiperbolán a pont mindig <em>messzebb</em> van a fókusztól, mint a hozzá tartozó vezéregyenestől!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. FocusDirectrixLabWidget: PF = e * PD egységes generátor                 */
/* -------------------------------------------------------------------------- */
export function FocusDirectrixLabWidget() {
  const [e, setE] = useState(1.0);
  const d = 2; // F(0,0), vezéregyenes x = -2 -> r(theta) = e*d / (1 - e*cos(theta))

  const W = 540;
  const H = 270;
  const cx = 240;
  const cy = H / 2;
  const sc = 36;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const buildBranch = (t0: number, t1: number, steps: number, sign = 1) => {
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const th = t0 + ((t1 - t0) * i) / steps;
      const den = 1 - e * Math.cos(th);
      if (Math.abs(den) < 0.04) continue;
      const r = (e * d) / den;
      if (sign > 0 && r < 0) continue;
      if (sign < 0 && r > 0) continue;
      const x = r * Math.cos(th);
      const y = r * Math.sin(th);
      if (x < -6.4 || x > 8.2 || Math.abs(y) > 3.9) continue;
      pts.push(`${pts.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  let paths: string[] = [];
  if (e < 0.999) {
    paths = [buildBranch(0, Math.PI * 2, 240, 1)];
  } else if (Math.abs(e - 1) <= 0.001) {
    paths = [buildBranch(0.32, Math.PI * 2 - 0.32, 220, 1)];
  } else {
    const asym = Math.acos(1 / e);
    paths = [
      buildBranch(asym + 0.06, Math.PI * 2 - asym - 0.06, 180, 1),
      buildBranch(-asym + 0.06, asym - 0.06, 150, -1),
    ];
  }

  const col = e < 0.999 ? '#38bdf8' : Math.abs(e - 1) <= 0.001 ? '#fbbf24' : '#fb923c';
  const vx = -(e * d) / (1 + e);
  const coeffX2 = 1 - e * e;

  return (
    <div className="widget">
      <div className="widget-title">Egységes fókusz–vezéregyenes labor: PF = e · PD (F(0; 0), x = −2)</div>
      <div className="sliders">
        <label>
          excentricitás e = {fmt(e, 2)}
          <input type="range" min={0.35} max={1.9} step={0.05} value={e} onChange={(ev) => setE(Number(ev.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        <line x1={X(-d)} y1={10} x2={X(-d)} y2={H - 10} className="pl-dash" />
        <text x={X(-d) - 6} y={24} textAnchor="end" className="pl-label" fill="#fbbf24">
          x = −2
        </text>

        {paths.map((p, i) => (
          <path key={i} d={p} fill="none" stroke={col} strokeWidth={2.7} />
        ))}

        <circle cx={X(0)} cy={cy} r={5} fill="#fbbf24" />
        <text x={X(0) + 8} y={cy - 8} className="pl-label" fill="#fbbf24">
          F(0; 0)
        </text>
        <circle cx={X(vx)} cy={cy} r={4} fill="#34d399" />
      </svg>
      <div className="explain">
        <p>
          A <M t="\sqrt{x^2+y^2}=e|x+2|" /> négyzetre emelt egyenlete:{' '}
          <M t={`${fmt(coeffX2, 2)}x^2 + y^2 - ${fmt(4 * e * e, 2)}x = ${fmt(4 * e * e, 2)}`} />. Az{' '}
          <M t="x^2" /> együtthatója (<M t="1-e^2" />) dönti el a típust:{' '}
          {coeffX2 > 0.005 ? 'pozitív → ellipszis' : coeffX2 < -0.005 ? 'negatív → hiperbola' : 'nulla → parabola'}!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. ConicSummaryDiagram: három kúpszelet vezéregyenes-helyzetének összképe  */
/* -------------------------------------------------------------------------- */
export function ConicSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Összehasonlító ábra: fókusz, csúcs és vezéregyenes sorrendje</div>
      <svg className="plane" viewBox="0 0 540 190">
        <rect width={540} height={190} className="pl-bg" />

        {/* 1. Ellipszis */}
        <g transform="translate(0, 0)">
          <text x={90} y={24} textAnchor="middle" className="pl-label" fill="#38bdf8">
            Ellipszis (0 &lt; e &lt; 1)
          </text>
          <line x1={18} y1={105} x2={162} y2={105} className="pl-axis" />
          <line x1={150} y1={42} x2={150} y2={162} className="pl-dash" />
          <line x1={30} y1={42} x2={30} y2={162} className="pl-dash" />
          <ellipse cx={90} cy={105} rx={44} ry={28} className="pl-main" />
          <circle cx={64} cy={105} r={3.5} fill="#fb923c" />
          <circle cx={116} cy={105} r={3.5} fill="#fb923c" />
          <text x={90} y={178} textAnchor="middle" className="pl-tick">
            c &lt; a &lt; a/e (direktrix kívül)
          </text>
        </g>

        <line x1={180} y1={16} x2={180} y2={176} className="pl-grid" />

        {/* 2. Parabola */}
        <g transform="translate(180, 0)">
          <text x={90} y={24} textAnchor="middle" className="pl-label" fill="#fbbf24">
            Parabola (e = 1)
          </text>
          <line x1={18} y1={105} x2={162} y2={105} className="pl-axis" />
          <line x1={48} y1={42} x2={48} y2={162} className="pl-dash" />
          <path d="M 145 48 Q 18 105 145 162" fill="none" stroke="#fbbf24" strokeWidth={2.6} />
          <circle cx={115} cy={105} r={3.5} fill="#fb923c" />
          <circle cx={81.5} cy={105} r={3.5} fill="#34d399" />
          <text x={90} y={178} textAnchor="middle" className="pl-tick">
            VF = VD (egyetlen direktrix)
          </text>
        </g>

        <line x1={360} y1={16} x2={360} y2={176} className="pl-grid" />

        {/* 3. Hiperbola */}
        <g transform="translate(360, 0)">
          <text x={90} y={24} textAnchor="middle" className="pl-label" fill="#fb923c">
            Hiperbola (e &gt; 1)
          </text>
          <line x1={18} y1={105} x2={162} y2={105} className="pl-axis" />
          <line x1={74} y1={42} x2={74} y2={162} className="pl-dash" />
          <line x1={106} y1={42} x2={106} y2={162} className="pl-dash" />
          <path d="M 150 52 Q 102 105 150 158" fill="none" stroke="#fb923c" strokeWidth={2.6} />
          <path d="M 30 52 Q 78 105 30 158" fill="none" stroke="#fb923c" strokeWidth={2.6} />
          <circle cx={42} cy={105} r={3.5} fill="#38bdf8" />
          <circle cx={138} cy={105} r={3.5} fill="#38bdf8" />
          <text x={90} y={178} textAnchor="middle" className="pl-tick">
            a/e &lt; a &lt; c (direktrix belül)
          </text>
        </g>
      </svg>
    </div>
  );
}
