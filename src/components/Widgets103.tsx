import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

/* Segédfüggvény: középpontos A' x'^2 + C' y'^2 = K görbe elforgatva α szöggel az xy-síkba */
function rotatedCentralConicPaths(
  Ap: number,
  Cp: number,
  K: number,
  alphaRad: number,
  X: (x: number) => number,
  Y: (y: number) => number,
  bound = 6.5,
): string[] {
  const ca = Math.cos(alphaRad);
  const sa = Math.sin(alphaRad);
  const toXY = (xp: number, yp: number): [number, number] => [xp * ca - yp * sa, xp * sa + yp * ca];
  const paths: string[] = [];

  // Két párhuzamos egyenes: Ap * xp^2 = K (Cp ≈ 0) vagy Cp * yp^2 = K (Ap ≈ 0)
  if (Math.abs(Cp) < 1e-3 && Ap * K > 0) {
    const r = Math.sqrt(K / Ap);
    for (const s of [-1, 1]) {
      const [x1, y1] = toXY(s * r, -bound);
      const [x2, y2] = toXY(s * r, bound);
      paths.push(`M${X(x1).toFixed(1)},${Y(y1).toFixed(1)} L${X(x2).toFixed(1)},${Y(y2).toFixed(1)}`);
    }
    return paths;
  }
  if (Math.abs(Ap) < 1e-3 && Cp * K > 0) {
    const r = Math.sqrt(K / Cp);
    for (const s of [-1, 1]) {
      const [x1, y1] = toXY(-bound, s * r);
      const [x2, y2] = toXY(bound, s * r);
      paths.push(`M${X(x1).toFixed(1)},${Y(y1).toFixed(1)} L${X(x2).toFixed(1)},${Y(y2).toFixed(1)}`);
    }
    return paths;
  }

  // Ellipszis: Ap/K > 0 és Cp/K > 0
  if (Ap * K > 1e-4 && Cp * K > 1e-4) {
    const rx = Math.sqrt(K / Ap);
    const ry = Math.sqrt(K / Cp);
    const pts: string[] = [];
    for (let i = 0; i <= 160; i++) {
      const th = (i / 160) * Math.PI * 2;
      const [x, y] = toXY(rx * Math.cos(th), ry * Math.sin(th));
      pts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
    }
    paths.push(pts.join(' '));
    return paths;
  }

  // Hiperbola: Ap és Cp ellentétes előjelű
  if (Ap * Cp < -1e-4 && Math.abs(K) > 1e-4) {
    const alongX = Ap * K > 0;
    const a = Math.sqrt(Math.abs(K / (alongX ? Ap : Cp)));
    const b = Math.sqrt(Math.abs(K / (alongX ? Cp : Ap)));
    for (const s of [-1, 1]) {
      const pts: string[] = [];
      for (let i = -50; i <= 50; i++) {
        const t = (i / 50) * 2.1;
        const u = s * a * Math.cosh(t);
        const v = b * Math.sinh(t);
        const [x, y] = alongX ? toXY(u, v) : toXY(v, u);
        if (Math.abs(x) > bound || Math.abs(y) > bound) continue;
        pts.push(`${pts.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
      }
      if (pts.length > 1) paths.push(pts.join(' '));
    }
    return paths;
  }

  return paths;
}

/* -------------------------------------------------------------------------- */
/* 1. MixedTermEffectWidget: x^2 + Bxy + y^2 = 4 változó B-vel                */
/* -------------------------------------------------------------------------- */
export function MixedTermEffectWidget() {
  const [B, setB] = useState(1.2);
  const Ap = 1 + B / 2;
  const Cp = 1 - B / 2;
  const delta = B * B - 4;

  const W = 540;
  const H = 280;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 36;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const paths = rotatedCentralConicPaths(Ap, Cp, 4, Math.PI / 4, X, Y, 7.5);
  const kind =
    Math.abs(B) < 0.01
      ? 'Kör (B = 0, Δ = −4)'
      : delta < -0.01
        ? `Elforgatott ellipszis (Δ = ${fmt(delta, 2)} < 0)`
        : Math.abs(delta) <= 0.01
          ? 'Párhuzamos egyenespár (Δ = 0)'
          : `Elforgatott hiperbola (Δ = ${fmt(delta, 2)} > 0)`;
  const col = Math.abs(B) < 0.01 ? '#34d399' : delta < -0.01 ? '#38bdf8' : Math.abs(delta) <= 0.01 ? '#fbbf24' : '#fb923c';

  return (
    <div className="widget">
      <div className="widget-title">A vegyes tag hatása: x² + Bxy + y² = 4</div>
      <div className="sliders">
        <label>
          vegyes tag együtthatója B = {fmt(B, 1)}
          <input type="range" min={-3} max={3} step={0.2} value={B} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        {[
          { l: 'B = 0 (kör)', v: 0 },
          { l: 'B = 1,2 (ellipszis)', v: 1.2 },
          { l: 'B = 2 (egyenespár)', v: 2 },
          { l: 'B = 2,6 (hiperbola)', v: 2.6 },
          { l: 'B = −1,4', v: -1.4 },
        ].map((p) => (
          <button key={p.l} className={Math.abs(B - p.v) < 0.05 ? 'on' : ''} onClick={() => setB(p.v)}>
            {p.l}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />
        {/* 45°-os főtengelyek */}
        <line x1={X(-4)} y1={Y(-4)} x2={X(4)} y2={Y(4)} className="pl-dash2" />
        <line x1={X(-4)} y1={Y(4)} x2={X(4)} y2={Y(-4)} className="pl-dash2" />
        <text x={X(3.3)} y={Y(3.3) - 6} className="pl-tick">
          x′ (45°)
        </text>
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={col} strokeWidth={2.7} />
        ))}
        <text x={W - 12} y={24} textAnchor="end" className="pl-label" fill={col}>
          {kind}
        </text>
      </svg>
      <div className="explain">
        <p>
          Amint <M t="B \neq 0" />, a görbe tengelyei elfordulnak a koordinátatengelyekhez képest (itt pontosan{' '}
          <M t="45^\circ" />-kal). A <M t="45^\circ" />-os elforgatott rendszerben az egyenlet vegyes tag nélkül:{' '}
          <M t={`${fmt(Ap, 2)}x'^2 + ${fmt(Cp, 2)}y'^2 = 4`} />.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. AxesRotationDiagram: koordinátarendszer elforgatása α szöggel           */
/* -------------------------------------------------------------------------- */
export function AxesRotationDiagram() {
  const [deg, setDeg] = useState(35);
  const a = (deg * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);

  // Rögzített P(3; 2) pont
  const px = 3.0;
  const py = 2.0;
  const xp = px * ca + py * sa;
  const yp = -px * sa + py * ca;

  const W = 540;
  const H = 290;
  const cx = 200;
  const cy = 205;
  const sc = 48;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  // M' vetület az x'-tengelyre
  const mpx = xp * ca;
  const mpy = xp * sa;

  return (
    <div className="widget">
      <div className="widget-title">Tengelyforgatás α szöggel: ugyanaz a P(3; 2) pont két rendszerben</div>
      <div className="sliders">
        <label>
          forgatási szög α = {deg}°
          <input type="range" min={0} max={75} step={1} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {/* Régi tengelyek */}
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={15} x2={cx} y2={H - 15} className="pl-axis" />
        <text x={W - 26} y={cy - 8} className="pl-axname">
          x
        </text>
        <text x={cx + 8} y={28} className="pl-axname">
          y
        </text>

        {/* Új elforgatott tengelyek */}
        <line x1={X(-2.5 * ca)} y1={Y(-2.5 * sa)} x2={X(5.5 * ca)} y2={Y(5.5 * sa)} stroke="#38bdf8" strokeWidth={2} />
        <line x1={X(2.0 * sa)} y1={Y(-2.0 * ca)} x2={X(-3.6 * sa)} y2={Y(3.6 * ca)} stroke="#34d399" strokeWidth={2} />
        <text x={X(4.8 * ca) + 6} y={Y(4.8 * sa) - 6} className="pl-label" fill="#38bdf8">
          x′
        </text>
        <text x={X(-3.2 * sa) - 10} y={Y(3.2 * ca) + 4} className="pl-label" fill="#34d399">
          y′
        </text>

        {/* α szögív */}
        {deg > 2 && (
          <path
            d={`M ${X(1.1)} ${Y(0)} A ${1.1 * sc} ${1.1 * sc} 0 0 0 ${X(1.1 * ca).toFixed(1)} ${Y(1.1 * sa).toFixed(1)}`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={2}
          />
        )}
        <text x={X(1.35 * Math.cos(a / 2))} y={Y(1.35 * Math.sin(a / 2)) + 4} className="pl-label" fill="#fbbf24">
          α
        </text>

        {/* Vetületek */}
        <line x1={X(px)} y1={Y(py)} x2={X(px)} y2={Y(0)} className="pl-dash2" />
        <line x1={X(px)} y1={Y(py)} x2={X(mpx)} y2={Y(mpy)} stroke="#34d399" strokeWidth={1.8} strokeDasharray="5 4" />
        <line x1={X(0)} y1={Y(0)} x2={X(px)} y2={Y(py)} stroke="#fb923c" strokeWidth={2} />

        <circle cx={X(px)} cy={Y(py)} r={5.5} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(px) + 8} y={Y(py) - 8} className="pl-label" fill="#fb923c">
          P(3; 2)
        </text>
        <circle cx={X(mpx)} cy={Y(mpy)} r={3.5} fill="#38bdf8" />
        <text x={X(mpx) + 6} y={Y(mpy) + 14} className="pl-tick">
          M′
        </text>
      </svg>
      <div className="explain">
        <p>
          Az új rendszerben: <M t={`x' = ${fmt(xp, 2)}`} />, <M t={`y' = ${fmt(yp, 2)}`} />. Visszaszámolva:{' '}
          <M t={`x'\\cos\\alpha - y'\\sin\\alpha = ${fmt(xp * ca - yp * sa, 2)} = x`} /> és{' '}
          <M t={`x'\\sin\\alpha + y'\\cos\\alpha = ${fmt(xp * sa + yp * ca, 2)} = y`} />.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. HyperbolaRotationWidget: 2xy = 8 hiperbola 45°-os forgatása             */
/* -------------------------------------------------------------------------- */
export function HyperbolaRotationWidget() {
  const [deg, setDeg] = useState(45);
  const a = (deg * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);

  // 2xy = 8 -> A=0, B=2, C=0
  const Ap = 2 * ca * sa; // sin(2a)
  const Bp = 2 * Math.cos(2 * a);
  const Cp = -2 * ca * sa; // -sin(2a)

  const W = 540;
  const H = 270;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 34;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const paths = rotatedCentralConicPaths(1, -1, 8, Math.PI / 4, X, Y, 7.5);
  const optimal = Math.abs(deg - 45) <= 1;

  return (
    <div className="widget">
      <div className="widget-title">A 2xy = 8 hiperbola: keresd meg, mikor tűnik el a vegyes tag (B′ = 0)!</div>
      <div className="sliders">
        <label>
          tengelyek elforgatása α = {deg}°
          <input type="range" min={0} max={65} step={1} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        {/* Elforgatott tengelyek */}
        <line
          x1={X(-6 * ca)}
          y1={Y(-6 * sa)}
          x2={X(6 * ca)}
          y2={Y(6 * sa)}
          stroke={optimal ? '#34d399' : '#38bdf8'}
          strokeWidth={optimal ? 2.4 : 1.7}
          strokeDasharray={optimal ? undefined : '6 4'}
        />
        <line
          x1={X(5 * sa)}
          y1={Y(-5 * ca)}
          x2={X(-5 * sa)}
          y2={Y(5 * ca)}
          stroke={optimal ? '#34d399' : '#38bdf8'}
          strokeWidth={optimal ? 2.4 : 1.7}
          strokeDasharray={optimal ? undefined : '6 4'}
        />
        <text x={X(4.4 * ca) + 6} y={Y(4.4 * sa) - 6} className="pl-label" fill={optimal ? '#34d399' : '#38bdf8'}>
          x′
        </text>

        {paths.map((d, i) => (
          <path key={i} d={d} className="pl-alt" />
        ))}

        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill={optimal ? '#34d399' : '#fbbf24'}>
          B′ = 2 cos(2α) = {fmt(Bp, 2)}
        </text>
      </svg>
      <div className="explain">
        <p>
          Az új egyenlet: <M t={`${fmt(Ap, 2)}x'^2 + ${fmt(Bp, 2)}x'y' ${Cp >= 0 ? '+' : ''} ${fmt(Cp, 2)}y'^2 = 8`} />.{' '}
          {optimal
            ? 'Pontosan α = 45°-nál B′ = 0, és az egyenlet normálalakra jut: x′²/8 − y′²/8 = 1!'
            : 'Állítsd α = 45°-ra, hogy a vegyes x′y′ tag teljesen eltűnjön!'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. CrossTermEliminatorWidget: 3 előre beállított elforgatott kúpszelet      */
/* -------------------------------------------------------------------------- */
const ROT_PRESETS = [
  {
    name: '5x² − 6xy + 5y² = 8',
    A: 5,
    B: -6,
    C: 5,
    K: 8,
    alphaOpt: 45,
    note: 'A = C = 5 miatt cot 2α = 0 → 2α = 90°, α = 45°. Új egyenlet: 2x′² + 8y′² = 8 (ellipszis).',
  },
  {
    name: '7x² − 6√3 xy + 13y² = 16',
    A: 7,
    B: -6 * Math.sqrt(3),
    C: 13,
    K: 16,
    alphaOpt: 30,
    note: 'cot 2α = (7−13)/(−6√3) = 1/√3 → 2α = 60°, α = 30°. Új egyenlet: 4x′² + 16y′² = 16 (ellipszis).',
  },
  {
    name: 'x² + 4xy − 2y² = 6',
    A: 1,
    B: 4,
    C: -2,
    K: 6,
    alphaOpt: 26.57,
    note: 'cot 2α = 3/4 → cos 2α = 3/5, α ≈ 26,6°. Új egyenlet: 2x′² − 3y′² = 6 (hiperbola).',
  },
];

export function CrossTermEliminatorWidget() {
  const [pIdx, setPIdx] = useState(1);
  const p = ROT_PRESETS[pIdx];
  const [deg, setDeg] = useState(p.alphaOpt);

  const selectPreset = (i: number) => {
    setPIdx(i);
    setDeg(ROT_PRESETS[i].alphaOpt);
  };

  const a = (deg * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const Ap = p.A * ca * ca + p.B * ca * sa + p.C * sa * sa;
  const Bp = p.B * Math.cos(2 * a) + (p.C - p.A) * Math.sin(2 * a);
  const Cp = p.A * sa * sa - p.B * ca * sa + p.C * ca * ca;

  // Valódi görbe az optimális αOpt-ból rajzolva
  const optRad = (p.alphaOpt * Math.PI) / 180;
  const co = Math.cos(optRad);
  const so = Math.sin(optRad);
  const Aopt = p.A * co * co + p.B * co * so + p.C * so * so;
  const Copt = p.A * so * so - p.B * co * so + p.C * co * co;

  const W = 540;
  const H = 270;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 46;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const paths = rotatedCentralConicPaths(Aopt, Copt, p.K, optRad, X, Y, 6.2);
  const isZero = Math.abs(Bp) < 0.25;

  return (
    <div className="widget">
      <div className="widget-title">Vegyes tag eltüntetése forgatással (cot 2α = (A − C) / B)</div>
      <div className="relbuttons chips">
        {ROT_PRESETS.map((pr, i) => (
          <button key={pr.name} className={i === pIdx ? 'on' : ''} onClick={() => selectPreset(i)}>
            {pr.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          próbált forgatási szög α = {fmt(deg, 1)}° (optimális: {fmt(p.alphaOpt, 1)}°)
          <input type="range" min={0} max={85} step={0.5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />

        <line
          x1={X(-5 * ca)}
          y1={Y(-5 * sa)}
          x2={X(5 * ca)}
          y2={Y(5 * sa)}
          stroke={isZero ? '#34d399' : '#fbbf24'}
          strokeWidth={2}
        />
        <line
          x1={X(4 * sa)}
          y1={Y(-4 * ca)}
          x2={X(-4 * sa)}
          y2={Y(4 * ca)}
          stroke={isZero ? '#34d399' : '#fbbf24'}
          strokeWidth={2}
        />

        {paths.map((d, i) => (
          <path key={i} d={d} className={Aopt * Copt > 0 ? 'pl-main' : 'pl-alt'} />
        ))}

        <text x={W - 12} y={24} textAnchor="end" className="pl-label" fill={isZero ? '#34d399' : '#fbbf24'}>
          B′(α) = {fmt(Bp, 2)}
        </text>
      </svg>
      <div className="explain">
        <p>
          Aktuális együtthatók: <M t={`A'=${fmt(Ap, 2)},\\ B'=${fmt(Bp, 2)},\\ C'=${fmt(Cp, 2)}`} />.
        </p>
        <p>{p.note}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. DiscriminantExplorerWidget: B^2 - 4AC és invariánsok élő vizsgálata     */
/* -------------------------------------------------------------------------- */
export function DiscriminantExplorerWidget() {
  const [A, setA] = useState(2);
  const [B, setB] = useState(2);
  const [C, setC] = useState(1);

  const delta = B * B - 4 * A * C;
  const alpha = Math.abs(B) < 1e-6 ? 0 : 0.5 * Math.atan2(B, A - C);
  const ca = Math.cos(alpha);
  const sa = Math.sin(alpha);
  const Ap = A * ca * ca + B * ca * sa + C * sa * sa;
  const Cp = A * sa * sa - B * ca * sa + C * ca * ca;

  const W = 540;
  const H = 260;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 36;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const paths = rotatedCentralConicPaths(Ap, Cp, 4, alpha, X, Y, 7.2);
  const kind =
    delta < -0.01
      ? Ap < 0 && Cp < 0
        ? 'Üres halmaz (Δ < 0, A′, C′ < 0)'
        : 'Ellipszis (Δ < 0)'
      : Math.abs(delta) <= 0.01
        ? 'Parabola-típus (Δ = 0)'
        : 'Hiperbola (Δ > 0)';
  const col = delta < -0.01 ? '#38bdf8' : Math.abs(delta) <= 0.01 ? '#fbbf24' : '#fb923c';

  return (
    <div className="widget">
      <div className="widget-title">Diszkrimináns-labor: Ax² + Bxy + Cy² = 4</div>
      <div className="sliders">
        <label>
          A = {fmt(A, 1)}
          <input type="range" min={-2} max={3} step={0.5} value={A} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          B = {fmt(B, 1)}
          <input type="range" min={-4} max={4} step={0.5} value={B} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          C = {fmt(C, 1)}
          <input type="range" min={-2} max={3} step={0.5} value={C} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={0} y1={cy} x2={W} y2={cy} className="pl-axis" />
        <line x1={cx} y1={0} x2={cx} y2={H} className="pl-axis" />
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={col} strokeWidth={2.7} />
        ))}
        <text x={W - 12} y={24} textAnchor="end" className="pl-label" fill={col}>
          {kind}
        </text>
      </svg>
      <div className="explain">
        <p>
          Invariánsok: <M t={`B^2 - 4AC = ${fmt(delta, 2)} = -4A'C'`} /> és{' '}
          <M t={`A + C = ${fmt(A + C, 2)} = A' + C'`} /> (itt <M t={`A'\\approx ${fmt(Ap, 2)},\\ C'\\approx ${fmt(Cp, 2)}`} />).
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. DegenerateConicsDiagram: 4 elfajult másodfokú eset                      */
/* -------------------------------------------------------------------------- */
export function DegenerateConicsDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Elfajult másodfokú egyenletek: amikor a diszkrimináns csak a „családot” jelzi</div>
      <svg className="plane" viewBox="0 0 540 165">
        <rect width={540} height={165} className="pl-bg" />

        {/* 1. Egyetlen pont */}
        <g transform="translate(0, 0)">
          <text x={67} y={22} textAnchor="middle" className="pl-label" fill="#38bdf8">
            Pont (Δ &lt; 0)
          </text>
          <line x1={15} y1={88} x2={120} y2={88} className="pl-axis" />
          <line x1={67} y1={38} x2={67} y2={136} className="pl-axis" />
          <circle cx={67} cy={88} r={5} fill="#38bdf8" />
          <text x={67} y={154} textAnchor="middle" className="pl-tick">
            x² + y² = 0
          </text>
        </g>

        <line x1={135} y1={14} x2={135} y2={152} className="pl-grid" />

        {/* 2. Üres halmaz */}
        <g transform="translate(135, 0)">
          <text x={67} y={22} textAnchor="middle" className="pl-label" fill="#94a3b8">
            Üres (Δ &lt; 0)
          </text>
          <line x1={15} y1={88} x2={120} y2={88} className="pl-axis" />
          <line x1={67} y1={38} x2={67} y2={136} className="pl-axis" />
          <text x={67} y={94} textAnchor="middle" fill="#f87171" fontSize={26} fontWeight={700}>
            ∅
          </text>
          <text x={67} y={154} textAnchor="middle" className="pl-tick">
            x² + y² = −4
          </text>
        </g>

        <line x1={270} y1={14} x2={270} y2={152} className="pl-grid" />

        {/* 3. Párhuzamos egyenesek */}
        <g transform="translate(270, 0)">
          <text x={67} y={22} textAnchor="middle" className="pl-label" fill="#fbbf24">
            Párhuzamos (Δ = 0)
          </text>
          <line x1={15} y1={88} x2={120} y2={88} className="pl-axis" />
          <line x1={67} y1={38} x2={67} y2={136} className="pl-axis" />
          <line x1={22} y1={122} x2={98} y2={46} stroke="#fbbf24" strokeWidth={2.5} />
          <line x1={38} y1={136} x2={114} y2={60} stroke="#fbbf24" strokeWidth={2.5} />
          <text x={67} y={154} textAnchor="middle" className="pl-tick">
            (x+y)² = 4
          </text>
        </g>

        <line x1={405} y1={14} x2={405} y2={152} className="pl-grid" />

        {/* 4. Metsző egyenesek */}
        <g transform="translate(405, 0)">
          <text x={67} y={22} textAnchor="middle" className="pl-label" fill="#fb923c">
            Metsző (Δ &gt; 0)
          </text>
          <line x1={15} y1={88} x2={120} y2={88} className="pl-axis" />
          <line x1={67} y1={38} x2={67} y2={136} className="pl-axis" />
          <line x1={25} y1={130} x2={109} y2={46} stroke="#fb923c" strokeWidth={2.5} />
          <line x1={25} y1={46} x2={109} y2={130} stroke="#fb923c" strokeWidth={2.5} />
          <text x={67} y={154} textAnchor="middle" className="pl-tick">
            x² − y² = 0
          </text>
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. CordicRotationDiagram: mikrolépéses forgatás (számológép sin/cos)       */
/* -------------------------------------------------------------------------- */
export function CordicRotationDiagram() {
  const [targetDeg, setTargetDeg] = useState(58);
  const target = (targetDeg * Math.PI) / 180;

  // CORDIC mikroszögek: atan(2^-k)
  const steps: { ang: number; x: number; y: number }[] = [{ ang: 0, x: 1, y: 0 }];
  let cur = 0;
  for (let k = 0; k < 6; k++) {
    const step = Math.atan(Math.pow(2, -k));
    cur += cur < target ? step : -step;
    steps.push({ ang: cur, x: Math.cos(cur), y: Math.sin(cur) });
  }
  const last = steps[steps.length - 1];

  const W = 540;
  const H = 250;
  const cx = 140;
  const cy = 210;
  const R = 165;
  const X = (x: number) => cx + x * R;
  const Y = (y: number) => cy - y * R;

  return (
    <div className="widget">
      <div className="widget-title">Forgatás a gyakorlatban: hogyan számol sin θ-t és cos θ-t egy kalkulátor?</div>
      <div className="sliders">
        <label>
          célszög θ = {targetDeg}°
          <input type="range" min={5} max={85} step={1} value={targetDeg} onChange={(e) => setTargetDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={cx - 25} y1={cy} x2={cx + R + 35} y2={cy} className="pl-axis" />
        <line x1={cx} y1={20} x2={cx} y2={cy + 20} className="pl-axis" />
        {/* Egységkör negyedív */}
        <path d={`M ${X(1)} ${Y(0)} A ${R} ${R} 0 0 0 ${X(0)} ${Y(1)}`} fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth={1.8} />

        {/* Célsugár */}
        <line x1={cx} y1={cy} x2={X(Math.cos(target))} y2={Y(Math.sin(target))} className="pl-dash" />

        {/* Lépések az íven */}
        {steps.map((st, i) => (
          <g key={i}>
            <line
              x1={cx}
              y1={cy}
              x2={X(st.x)}
              y2={Y(st.y)}
              stroke={i === steps.length - 1 ? '#34d399' : 'rgba(56,189,248,0.35)'}
              strokeWidth={i === steps.length - 1 ? 2.4 : 1.2}
            />
            <circle cx={X(st.x)} cy={Y(st.y)} r={i === steps.length - 1 ? 5 : 3.2} fill={i === steps.length - 1 ? '#34d399' : '#38bdf8'} />
          </g>
        ))}

        {/* Jobb oldali adatpanel */}
        <text x={355} y={62} className="pl-label" fill="#fbbf24">
          Cél: θ = {targetDeg}°
        </text>
        <text x={355} y={88} className="pl-tick">
          cos θ = {fmt(Math.cos(target), 4)}
        </text>
        <text x={355} y={108} className="pl-tick">
          sin θ = {fmt(Math.sin(target), 4)}
        </text>
        <text x={355} y={142} className="pl-label" fill="#34d399">
          6 mikrolépés után:
        </text>
        <text x={355} y={166} className="pl-tick">
          x₆ = {fmt(last.x, 4)}
        </text>
        <text x={355} y={186} className="pl-tick">
          y₆ = {fmt(last.y, 4)}
        </text>
      </svg>
      <div className="explain">
        <p>
          Az <M t="(1;\,0)" /> pontot néhány előre eltárolt kis szöggel (<M t="45^\circ,\,26{,}6^\circ,\,14^\circ,\,\ldots" />)
          elforgatva gyorsan megkapjuk a <M t="(\cos\theta;\,\sin\theta)" /> koordinátákat — csupán összeadásokkal és
          forgatási lépésekkel!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. RotationSummaryDiagram: 3 lépéses folyamatábra                          */
/* -------------------------------------------------------------------------- */
export function RotationSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Másodfokú egyenlet azonosításának és egyszerűsítésének menete</div>
      <svg className="plane" viewBox="0 0 540 135">
        <rect width={540} height={135} className="pl-bg" />

        <rect x={14} y={24} width={152} height={84} rx={12} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={90} y={48} textAnchor="middle" className="pl-label" fill="#38bdf8">
          1. Diszkrimináns
        </text>
        <text x={90} y={70} textAnchor="middle" className="pl-tick">
          Δ = B² − 4AC
        </text>
        <text x={90} y={90} textAnchor="middle" className="pl-tick">
          &lt;0 ell. | =0 par. | &gt;0 hip.
        </text>

        <path d="M 170 66 L 192 66 M 186 60 L 192 66 L 186 72" stroke="#fbbf24" strokeWidth={2} fill="none" />

        <rect x={196} y={24} width={152} height={84} rx={12} fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth={1.6} />
        <text x={272} y={48} textAnchor="middle" className="pl-label" fill="#fbbf24">
          2. Forgatás (B ≠ 0)
        </text>
        <text x={272} y={70} textAnchor="middle" className="pl-tick">
          cot 2α = (A − C) / B
        </text>
        <text x={272} y={90} textAnchor="middle" className="pl-tick">
          Eltűnik a B′x′y′ tag
        </text>

        <path d="M 352 66 L 374 66 M 368 60 L 374 66 L 368 72" stroke="#34d399" strokeWidth={2} fill="none" />

        <rect x={378} y={24} width={148} height={84} rx={12} fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth={1.6} />
        <text x={452} y={48} textAnchor="middle" className="pl-label" fill="#34d399">
          3. Teljes négyzet
        </text>
        <text x={452} y={70} textAnchor="middle" className="pl-tick">
          A′x′² + C′y′² + … = 0
        </text>
        <text x={452} y={90} textAnchor="middle" className="pl-tick">
          Normálalak + vázlat
        </text>
      </svg>
    </div>
  );
}
