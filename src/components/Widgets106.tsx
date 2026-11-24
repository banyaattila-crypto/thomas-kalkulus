import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

/* -------------------------------------------------------------------------- */
/* 1. PolarSymmetryDiagram: x-tengely, y-tengely és origó szimmetria          */
/* -------------------------------------------------------------------------- */
export function PolarSymmetryDiagram() {
  const [mode, setMode] = useState<'x' | 'y' | 'o'>('x');
  const W = 540;
  const H = 250;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 36;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const r = 2.6;
  const th = (38 * Math.PI) / 180;
  const px = r * Math.cos(th);
  const py = r * Math.sin(th);
  const qx = mode === 'x' ? px : -px;
  const qy = mode === 'y' ? py : -py;

  const info = {
    x: {
      title: 'x-tengelyre szimmetrikus',
      pair: '(r; −θ)  vagy  (−r; π − θ)',
      col: '#38bdf8',
      note: 'Ha θ helyére −θ-t írva az egyenlet változatlan (pl. csak cos θ szerepel), biztosan x-tengelyre szimmetrikus!',
    },
    y: {
      title: 'y-tengelyre szimmetrikus',
      pair: '(r; π − θ)  vagy  (−r; −θ)',
      col: '#34d399',
      note: 'Ha θ helyére π − θ-t írva az egyenlet változatlan (pl. csak sin θ szerepel), biztosan y-tengelyre szimmetrikus!',
    },
    o: {
      title: 'Origóra (pólusra) szimmetrikus',
      pair: '(−r; θ)  vagy  (r; θ + π)',
      col: '#fb923c',
      note: 'Ha r helyére −r-t írva (pl. r² szerepel) vagy θ helyére θ + π-t írva változatlan, a görbe origóra szimmetrikus!',
    },
  }[mode];

  return (
    <div className="widget">
      <div className="widget-title">Poláris szimmetriatesztek geometriai képe</div>
      <div className="relbuttons chips">
        <button className={mode === 'x' ? 'on' : ''} onClick={() => setMode('x')}>
          x-tengely
        </button>
        <button className={mode === 'y' ? 'on' : ''} onClick={() => setMode('y')}>
          y-tengely
        </button>
        <button className={mode === 'o' ? 'on' : ''} onClick={() => setMode('o')}>
          Origó (pólus)
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <circle cx={cx} cy={cy} r={r * sc} fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth={1.2} />
        <line x1={30} y1={cy} x2={W - 30} y2={cy} stroke={mode === 'x' ? info.col : 'rgba(226,232,240,0.5)'} strokeWidth={mode === 'x' ? 2.4 : 1.4} />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} stroke={mode === 'y' ? info.col : 'rgba(226,232,240,0.5)'} strokeWidth={mode === 'y' ? 2.4 : 1.4} />
        {mode === 'o' && <circle cx={cx} cy={cy} r={8} fill="none" stroke={info.col} strokeWidth={2.2} />}

        {/* Összekötő szaggatott vonal P és tükörképe között */}
        <line x1={X(px)} y1={Y(py)} x2={X(qx)} y2={Y(qy)} stroke={info.col} strokeWidth={1.6} strokeDasharray="5 4" />
        <line x1={cx} y1={cy} x2={X(px)} y2={Y(py)} stroke="#fbbf24" strokeWidth={2} />
        <line x1={cx} y1={cy} x2={X(qx)} y2={Y(qy)} stroke={info.col} strokeWidth={2} />

        <circle cx={X(px)} cy={Y(py)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(px) + 9} y={Y(py) - 6} className="pl-label" fill="#fbbf24">
          P(r; θ)
        </text>
        <circle cx={X(qx)} cy={Y(qy)} r={5.5} fill={info.col} stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(qx) + (qx >= 0 ? 9 : -9)} y={Y(qy) + (qy >= 0 ? -8 : 16)} textAnchor={qx >= 0 ? 'start' : 'end'} className="pl-label" fill={info.col}>
          {info.pair}
        </text>
      </svg>
      <div className="explain">
        <p>
          <strong>{info.title}:</strong> {info.note}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. PolarSlopeWidget: érintő és dy/dx vs dr/dθ a kardioidon                 */
/* -------------------------------------------------------------------------- */
export function PolarSlopeWidget() {
  const [deg, setDeg] = useState(60);
  const th = (deg * Math.PI) / 180;
  // r = 1 + cos θ
  const r = 1 + Math.cos(th);
  const dr = -Math.sin(th);
  const x = r * Math.cos(th);
  const y = r * Math.sin(th);
  const dx = dr * Math.cos(th) - r * Math.sin(th);
  const dy = dr * Math.sin(th) + r * Math.cos(th);
  const norm = Math.hypot(dx, dy);
  const ux = norm > 1e-4 ? dx / norm : 1;
  const uy = norm > 1e-4 ? dy / norm : 0;
  const slope = Math.abs(dx) > 1e-3 ? dy / dx : null;

  const W = 540;
  const H = 260;
  const cx = 210;
  const cy = H / 2;
  const sc = 85;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const pts: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * Math.PI * 2;
    const rt = 1 + Math.cos(t);
    pts.push(`${i ? 'L' : 'M'}${X(rt * Math.cos(t)).toFixed(1)},${Y(rt * Math.sin(t)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Polárgörbe érintője: r = 1 + cos θ (figyeld: dy/dx ≠ dr/dθ!)</div>
      <div className="sliders">
        <label>
          szög θ = {deg}°
          <input type="range" min={0} max={360} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        {[
          { l: 'θ = 0° (függőleges)', v: 0 },
          { l: 'θ = 60° (vízszintes!)', v: 60 },
          { l: 'θ = 120° (függőleges)', v: 120 },
          { l: 'θ = 180° (pólus)', v: 180 },
        ].map((p) => (
          <button key={p.l} className={deg === p.v ? 'on' : ''} onClick={() => setDeg(p.v)}>
            {p.l}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={12} x2={cx} y2={H - 12} className="pl-axis" />
        <path d={pts.join(' ')} className="pl-main" />
        <line x1={cx} y1={cy} x2={X(x)} y2={Y(y)} className="pl-dash2" />
        {norm > 1e-3 && (
          <line
            x1={X(x - 0.85 * ux)}
            y1={Y(y - 0.85 * uy)}
            x2={X(x + 0.85 * ux)}
            y2={Y(y + 0.85 * uy)}
            stroke="#fb923c"
            strokeWidth={2.4}
          />
        )}
        <circle cx={X(x)} cy={Y(y)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={W - 14} y={26} textAnchor="end" className="pl-label" fill="#fb923c">
          dy/dx = {slope !== null ? fmt(slope, 2) : '∞ (függőleges)'}
        </text>
        <text x={W - 14} y={46} textAnchor="end" className="pl-tick">
          dr/dθ = {fmt(dr, 2)}
        </text>
      </svg>
      <div className="explain">
        <p>
          <M t="\theta = 60^\circ" />-nál <M t="dr/d\theta = -\tfrac{\sqrt{3}}{2} \approx -0{,}87" />, mégis{' '}
          <M t="dy/dx = 0" /> (vízszintes érintő)! A meredekség mindig az <M t="x(\theta)=r\cos\theta,\ y(\theta)=r\sin\theta" />{' '}
          paraméteres képletből adódik.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. CartesianToPolarPlotterWidget: bal oldalt r(θ), jobb oldalt polárgörbe  */
/* -------------------------------------------------------------------------- */
export function CartesianToPolarPlotterWidget() {
  const [deg, setDeg] = useState(210);
  const [preset, setPreset] = useState<'card' | 'loop'>('card');
  const thMax = (deg * Math.PI) / 180;

  const fn = (t: number) => (preset === 'card' ? 1 - Math.cos(t) : 1 + 2 * Math.cos(t));

  // Bal panel: (θ, r) Descartes-grafikon, x ∈ [30, 240], y ∈ [30, 210]
  const lx0 = 32;
  const lx1 = 242;
  const lyMid = 135;
  const lScY = 30;
  const LX = (t: number) => lx0 + (t / (2 * Math.PI)) * (lx1 - lx0);
  const LY = (rv: number) => lyMid - rv * lScY;

  // Jobb panel: polár, középpont (400, 125)
  const rx = 400;
  const ry = 125;
  const rSc = preset === 'card' ? 46 : 30;
  const RX = (u: number) => rx + u * rSc;
  const RY = (v: number) => ry - v * rSc;

  const cartFull: string[] = [];
  const cartTraced: string[] = [];
  const polTraced: string[] = [];
  for (let i = 0; i <= 140; i++) {
    const t = (i / 140) * 2 * Math.PI;
    const rv = fn(t);
    const cCmd = `${i ? 'L' : 'M'}${LX(t).toFixed(1)},${LY(rv).toFixed(1)}`;
    cartFull.push(cCmd);
    if (t <= thMax + 0.01) {
      cartTraced.push(cCmd);
      polTraced.push(`${polTraced.length ? 'L' : 'M'}${RX(rv * Math.cos(t)).toFixed(1)},${RY(rv * Math.sin(t)).toFixed(1)}`);
    }
  }
  const rNow = fn(thMax);

  return (
    <div className="widget">
      <div className="widget-title">Ábrázolási módszer: Descartes-féle (θ, r) hullám → polárgörbe</div>
      <div className="relbuttons chips">
        <button className={preset === 'card' ? 'on' : ''} onClick={() => setPreset('card')}>
          r = 1 − cos θ (kardioid)
        </button>
        <button className={preset === 'loop' ? 'on' : ''} onClick={() => setPreset('loop')}>
          r = 1 + 2 cos θ (hurkos csigavonal)
        </button>
      </div>
      <div className="sliders">
        <label>
          bejárás θ = 0°-tól {deg}°-ig (r = {fmt(rNow, 2)})
          <input type="range" min={0} max={360} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox="0 0 540 245">
        <rect width={540} height={245} className="pl-bg" />
        {/* Bal: Descartes (θ, r) */}
        <line x1={lx0} y1={lyMid} x2={lx1 + 8} y2={lyMid} className="pl-axis" />
        <line x1={lx0} y1={28} x2={lx0} y2={215} className="pl-axis" />
        <text x={lx0 + 6} y={24} className="pl-tick">
          r
        </text>
        <text x={lx1 + 10} y={lyMid + 4} className="pl-tick">
          θ
        </text>
        <text x={LX(Math.PI)} y={lyMid + 16} textAnchor="middle" className="pl-tick">
          π
        </text>
        <text x={LX(2 * Math.PI)} y={lyMid + 16} textAnchor="middle" className="pl-tick">
          2π
        </text>
        <path d={cartFull.join(' ')} fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth={1.8} />
        <path d={cartTraced.join(' ')} stroke={rNow < 0 ? '#fb923c' : '#38bdf8'} strokeWidth={2.6} fill="none" />
        <circle cx={LX(thMax)} cy={LY(rNow)} r={5} fill="#34d399" />

        <line x1={270} y1={14} x2={270} y2={230} className="pl-grid" />

        {/* Jobb: polársík */}
        <line x1={285} y1={ry} x2={525} y2={ry} className="pl-axis" />
        <line x1={rx} y1={18} x2={rx} y2={230} className="pl-axis" />
        <path d={polTraced.join(' ')} stroke="#38bdf8" strokeWidth={2.6} fill="none" />
        <line x1={rx} y1={ry} x2={RX(rNow * Math.cos(thMax))} y2={RY(rNow * Math.sin(thMax))} stroke={rNow < 0 ? '#fb923c' : '#fbbf24'} strokeWidth={1.8} strokeDasharray="4 3" />
        <circle cx={RX(rNow * Math.cos(thMax))} cy={RY(rNow * Math.sin(thMax))} r={5} fill="#34d399" />
      </svg>
      <div className="explain">
        <p>
          A bal oldali hullámról azonnal leolvasható, hol nő/csökken <M t="r" />, hol nulla (pólusátmenet!), és hol{' '}
          <strong>negatív</strong> — a hurkos csigavonalnál éppen a negatív <M t="r" /> tartomány rajzolja ki a belső hurkot!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. LimaconExplorerWidget: r = a + 1.5 cos θ négy alakja                    */
/* -------------------------------------------------------------------------- */
export function LimaconExplorerWidget() {
  const [a, setA] = useState(1.5);
  const b = 1.5;

  const W = 540;
  const H = 260;
  const cx = 210;
  const cy = H / 2;
  const sc = 42;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const posPts: string[] = [];
  const negPts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * Math.PI * 2;
    const rv = a + b * Math.cos(t);
    const x = X(rv * Math.cos(t)).toFixed(1);
    const y = Y(rv * Math.sin(t)).toFixed(1);
    if (rv >= 0) {
      posPts.push(`${posPts.length ? 'L' : 'M'}${x},${y}`);
    } else {
      negPts.push(`${negPts.length ? 'L' : 'M'}${x},${y}`);
    }
  }

  const ratio = a / b;
  const kind =
    ratio < 0.98
      ? 'Belső hurkos csigavonal (a < b)'
      : ratio <= 1.02
        ? 'Kardioid (a = b)'
        : ratio < 1.98
          ? 'Behorpadt csigavonal (b < a < 2b)'
          : 'Konvex csigavonal (a ≥ 2b)';
  const col = ratio < 0.98 ? '#fb923c' : ratio <= 1.02 ? '#34d399' : '#38bdf8';

  return (
    <div className="widget">
      <div className="widget-title">A csigavonalak (limaçonok) családja: r = a + 1,5 cos θ</div>
      <div className="sliders">
        <label>
          a = {fmt(a, 2)} (arány a/b = {fmt(ratio, 2)})
          <input type="range" min={0.45} max={3.3} step={0.15} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        {[
          { l: 'Hurkos (0,75)', v: 0.75 },
          { l: 'Kardioid (1,50)', v: 1.5 },
          { l: 'Behorpadt (2,25)', v: 2.25 },
          { l: 'Konvex (3,15)', v: 3.15 },
        ].map((p) => (
          <button key={p.l} className={Math.abs(a - p.v) < 0.05 ? 'on' : ''} onClick={() => setA(p.v)}>
            {p.l}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />
        {posPts.length > 1 && <path d={posPts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.7} />}
        {negPts.length > 1 && <path d={negPts.join(' ')} fill="none" stroke="#fb923c" strokeWidth={2.7} />}
        <circle cx={cx} cy={cy} r={3.5} fill="#fbbf24" />
        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill={col}>
          {kind}
        </text>
      </svg>
      <div className="explain">
        <p>
          Az <M t="a/b" /> arány dönti el a formát! A narancssárga belső hurok pontosan ott jelenik meg, ahol{' '}
          <M t="a + b\cos\theta < 0" /> (vagyis <M t="a < b" />).
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. RoseCurveWidget: r = 3 cos(nθ) és r = 3 sin(nθ)                         */
/* -------------------------------------------------------------------------- */
export function RoseCurveWidget() {
  const [n, setN] = useState(3);
  const [fnType, setFnType] = useState<'cos' | 'sin'>('cos');
  const [degMax, setDegMax] = useState(360);

  const W = 540;
  const H = 260;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 34;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const thLim = (degMax * Math.PI) / 180;
  const pts: string[] = [];
  for (let i = 0; i <= 360; i++) {
    const t = (i / 360) * thLim;
    const rv = 3 * (fnType === 'cos' ? Math.cos(n * t) : Math.sin(n * t));
    pts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
  }

  const petals = n % 2 === 1 ? n : 2 * n;

  return (
    <div className="widget">
      <div className="widget-title">Rózsagörbék: r = 3 {fnType}(nθ) — páratlan n → n szirom, páros n → 2n szirom!</div>
      <div className="relbuttons chips">
        {[2, 3, 4, 5, 6].map((k) => (
          <button key={k} className={n === k ? 'on' : ''} onClick={() => setN(k)}>
            n = {k} ({k % 2 === 1 ? k : 2 * k} szirom)
          </button>
        ))}
        <button className={fnType === 'cos' ? 'on' : ''} onClick={() => setFnType(fnType === 'cos' ? 'sin' : 'cos')}>
          Váltás: {fnType === 'cos' ? 'cos → sin' : 'sin → cos'}
        </button>
      </div>
      <div className="sliders">
        <label>
          bejárás θ ∈ [0°; {degMax}°]
          <input type="range" min={15} max={360} step={15} value={degMax} onChange={(e) => setDegMax(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <circle cx={cx} cy={cy} r={3 * sc} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth={1.2} />
        <line x1={30} y1={cy} x2={W - 30} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />
        <path d={pts.join(' ')} stroke="#34d399" strokeWidth={2.5} fill="none" />
        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill="#34d399">
          {petals} szirom
        </text>
      </svg>
      <div className="explain">
        <p>
          Próbáld ki a csúszkát <M t="180^\circ" />-nál: páratlan <M t="n" /> esetén (pl. <M t="n=3, 5" />) a görbe már{' '}
          <M t="[0;\,\pi]" />-n <strong>teljesen kész</strong>, és <M t="[\pi;\,2\pi]" />-n újra végigmegy rajta! Páros{' '}
          <M t="n" /> esetén viszont kell a teljes <M t="[0;\,2\pi]" /> a <M t="2n" /> sziromhoz.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. LemniscateAndSpiralWidget: lemniszkáták és arkhimédészi spirál          */
/* -------------------------------------------------------------------------- */
export function LemniscateAndSpiralWidget() {
  const [kind, setKind] = useState<'lemCos' | 'lemSin' | 'spiral'>('lemCos');
  const W = 540;
  const H = 250;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 46;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const paths: string[] = [];
  if (kind === 'lemCos') {
    for (const seg of [
      [-Math.PI / 4, Math.PI / 4],
      [(3 * Math.PI) / 4, (5 * Math.PI) / 4],
    ]) {
      const pts: string[] = [];
      for (let i = 0; i <= 80; i++) {
        const t = seg[0] + ((seg[1] - seg[0]) * i) / 80;
        const rv = Math.sqrt(Math.max(0, 4 * Math.cos(2 * t)));
        pts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
      }
      paths.push(pts.join(' '));
    }
  } else if (kind === 'lemSin') {
    for (const seg of [
      [0, Math.PI / 2],
      [Math.PI, (3 * Math.PI) / 2],
    ]) {
      const pts: string[] = [];
      for (let i = 0; i <= 80; i++) {
        const t = seg[0] + ((seg[1] - seg[0]) * i) / 80;
        const rv = Math.sqrt(Math.max(0, 4 * Math.sin(2 * t)));
        pts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
      }
      paths.push(pts.join(' '));
    }
  } else {
    const pts: string[] = [];
    for (let i = 0; i <= 240; i++) {
      const t = (i / 240) * 4 * Math.PI;
      const rv = 0.17 * t;
      pts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
    }
    paths.push(pts.join(' '));
  }

  return (
    <div className="widget">
      <div className="widget-title">Lemniszkáták és arkhimédészi spirál</div>
      <div className="relbuttons chips">
        <button className={kind === 'lemCos' ? 'on' : ''} onClick={() => setKind('lemCos')}>
          r² = 4 cos(2θ)
        </button>
        <button className={kind === 'lemSin' ? 'on' : ''} onClick={() => setKind('lemSin')}>
          r² = 4 sin(2θ)
        </button>
        <button className={kind === 'spiral' ? 'on' : ''} onClick={() => setKind('spiral')}>
          Spirál: r = 0,17 θ (0 ≤ θ ≤ 4π)
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={30} y1={cy} x2={W - 30} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />
        {kind === 'lemCos' && (
          <>
            <line x1={X(-2.2)} y1={Y(-2.2)} x2={X(2.2)} y2={Y(2.2)} className="pl-dash2" />
            <line x1={X(-2.2)} y1={Y(2.2)} x2={X(2.2)} y2={Y(-2.2)} className="pl-dash2" />
          </>
        )}
        {paths.map((d, i) => (
          <path key={i} d={d} stroke={kind === 'spiral' ? '#fbbf24' : '#38bdf8'} strokeWidth={2.7} fill="none" />
        ))}
      </svg>
      <div className="explain">
        <p>
          {kind === 'lemCos' && 'A Bernoulli-lemniszkáta csak ott létezik, ahol cos(2θ) ≥ 0; az origóban a ±45°-os egyenesek érintik.'}
          {kind === 'lemSin' && 'Az r² = 4 sin(2θ) a 45°-kal elforgatott lemniszkáta: az x- és az y-tengely érinti az origóban.'}
          {kind === 'spiral' && 'Az arkhimédészi spirálon minden teljes fordulatnál állandó 2πa távolsággal nő a sugár.'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. PolarIntersectionWidget: r = 1 - cos θ és r = cos θ (3 metszéspont!)    */
/* -------------------------------------------------------------------------- */
export function PolarIntersectionWidget() {
  const [showPole, setShowPole] = useState(true);
  const W = 540;
  const H = 260;
  const cx = 310;
  const cy = H / 2;
  const sc = 92;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const cardPts: string[] = [];
  const circPts: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * 2 * Math.PI;
    const rc = 1 - Math.cos(t);
    cardPts.push(`${i ? 'L' : 'M'}${X(rc * Math.cos(t)).toFixed(1)},${Y(rc * Math.sin(t)).toFixed(1)}`);
    const rk = Math.cos(t);
    circPts.push(`${i ? 'L' : 'M'}${X(rk * Math.cos(t)).toFixed(1)},${Y(rk * Math.sin(t)).toFixed(1)}`);
  }

  // Metszéspontok: (1/2, ±π/3) -> x = 1/4, y = ±√3/4
  const ix = 0.25;
  const iy = Math.sqrt(3) / 4;

  return (
    <div className="widget">
      <div className="widget-title">Metszéspontok csapdája: r = 1 − cos θ és r = cos θ</div>
      <div className="relbuttons chips">
        <button className={!showPole ? 'on' : ''} onClick={() => setShowPole(false)}>
          Csak algebrai egyenlőség (2 pont)
        </button>
        <button className={showPole ? 'on' : ''} onClick={() => setShowPole(true)}>
          Összes valódi metszéspont (+ pólus = 3 pont!)
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        <path d={cardPts.join(' ')} className="pl-main" />
        <path d={circPts.join(' ')} className="pl-alt" />

        {/* Két algebrai metszéspont */}
        <circle cx={X(ix)} cy={Y(iy)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <circle cx={X(ix)} cy={Y(-iy)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(ix) + 10} y={Y(iy) - 8} className="pl-label" fill="#34d399">
          (½; π/3)
        </text>
        <text x={X(ix) + 10} y={Y(-iy) + 16} className="pl-label" fill="#34d399">
          (½; −π/3)
        </text>

        {/* A rejtett pólus metszéspont */}
        {showPole && (
          <>
            <circle cx={cx} cy={cy} r={11} fill="none" stroke="#fbbf24" strokeWidth={2.2} strokeDasharray="3 3" />
            <circle cx={cx} cy={cy} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
            <text x={cx - 12} y={cy - 14} textAnchor="end" className="pl-label" fill="#fbbf24">
              Pólus O (rejtett!)
            </text>
          </>
        )}
      </svg>
      <div className="explain">
        <p>
          Az <M t="1 - \cos\theta = \cos\theta" /> egyenlet csak a <strong>két zöld</strong> pontot adja meg! A{' '}
          <strong>pólus</strong> azért maradt ki, mert a kardioid <M t="\theta = 0" />-nál, a kör viszont{' '}
          <M t="\theta = \tfrac{\pi}{2}" />-nél halad át rajta — eltérő <M t="\theta" /> szögekkel!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. PolarCurveGalleryDiagram: 4 klasszikus polárgörbe katalógusa            */
/* -------------------------------------------------------------------------- */
export function PolarCurveGalleryDiagram() {
  const sample = (fn: (t: number) => number, ox: number, oy: number, sc: number, tMax = 2 * Math.PI) => {
    const pts: string[] = [];
    for (let i = 0; i <= 140; i++) {
      const t = (i / 140) * tMax;
      const rv = fn(t);
      pts.push(`${i ? 'L' : 'M'}${(ox + rv * Math.cos(t) * sc).toFixed(1)},${(oy - rv * Math.sin(t) * sc).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return (
    <div className="widget">
      <div className="widget-title">Polárgörbék kislexikona</div>
      <svg className="plane" viewBox="0 0 540 155">
        <rect width={540} height={155} className="pl-bg" />

        <g>
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#38bdf8">
            Kardioid
          </text>
          <path d={sample((t) => 1 + Math.cos(t), 52, 78, 22)} className="pl-main" />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            r = a(1 ± cos θ)
          </text>
        </g>

        <line x1={135} y1={12} x2={135} y2={144} className="pl-grid" />

        <g>
          <text x={202} y={20} textAnchor="middle" className="pl-label" fill="#fb923c">
            Hurkos csigavonal
          </text>
          <path d={sample((t) => 0.8 + 1.6 * Math.cos(t), 188, 78, 17)} className="pl-alt" />
          <text x={202} y={138} textAnchor="middle" className="pl-tick">
            r = a + b cos θ (a&lt;b)
          </text>
        </g>

        <line x1={270} y1={12} x2={270} y2={144} className="pl-grid" />

        <g>
          <text x={337} y={20} textAnchor="middle" className="pl-label" fill="#34d399">
            Rózsagörbe
          </text>
          <path d={sample((t) => Math.cos(3 * t), 337, 78, 34, Math.PI)} stroke="#34d399" strokeWidth={2.3} fill="none" />
          <text x={337} y={138} textAnchor="middle" className="pl-tick">
            r = a cos(nθ)
          </text>
        </g>

        <line x1={405} y1={12} x2={405} y2={144} className="pl-grid" />

        <g>
          <text x={472} y={20} textAnchor="middle" className="pl-label" fill="#fbbf24">
            Lemniszkáta
          </text>
          <path
            d={
              sample((t) => Math.sqrt(Math.max(0, Math.cos(2 * t))), 472, 78, 36, Math.PI / 4) +
              ' ' +
              sample((t) => Math.sqrt(Math.max(0, Math.cos(2 * t))), 472, 78, 36, (5 * Math.PI) / 4).replace(/^M/, 'M')
            }
            stroke="none"
          />
          {/* Tiszta két hurok */}
          <path
            d={[
              [-Math.PI / 4, Math.PI / 4],
              [(3 * Math.PI) / 4, (5 * Math.PI) / 4],
            ]
              .map(([a, b]) => {
                const ps: string[] = [];
                for (let i = 0; i <= 50; i++) {
                  const t = a + ((b - a) * i) / 50;
                  const rv = Math.sqrt(Math.max(0, Math.cos(2 * t)));
                  ps.push(`${i ? 'L' : 'M'}${(472 + rv * Math.cos(t) * 38).toFixed(1)},${(78 - rv * Math.sin(t) * 38).toFixed(1)}`);
                }
                return ps.join(' ');
              })
              .join(' ')}
            stroke="#fbbf24"
            strokeWidth={2.4}
            fill="none"
          />
          <text x={472} y={138} textAnchor="middle" className="pl-tick">
            r² = a² cos(2θ)
          </text>
        </g>
      </svg>
    </div>
  );
}
