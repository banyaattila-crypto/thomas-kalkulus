import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

/* -------------------------------------------------------------------------- */
/* 1. PolarSectorRiemannWidget: körszektorok Riemann-összege                  */
/* -------------------------------------------------------------------------- */
export function PolarSectorRiemannWidget() {
  const [n, setN] = useState(8);

  // r(θ) = 2 + cos θ, θ ∈ [0, π/2]
  // Pontos terület: 1/2 ∫_0^(π/2) (4 + 4cos θ + cos²θ) dθ = 1/2 [4θ + 4sin θ + θ/2 + sin(2θ)/4]_0^(π/2)
  // = 1/2 (9π/4 + 4) = 9π/8 + 2 ≈ 5.5343
  const exact = (9 * Math.PI) / 8 + 2;
  const f = (t: number) => 2 + Math.cos(t);
  const dth = Math.PI / 2 / n;

  const W = 540;
  const H = 260;
  const ox = 150;
  const oy = 220;
  const sc = 64;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy - v * sc;

  let approx = 0;
  const wedges: string[] = [];
  for (let k = 0; k < n; k++) {
    const t0 = k * dth;
    const t1 = (k + 1) * dth;
    const tm = 0.5 * (t0 + t1);
    const rk = f(tm);
    approx += 0.5 * rk * rk * dth;
    const x1 = X(rk * Math.cos(t0));
    const y1 = Y(rk * Math.sin(t0));
    const x2 = X(rk * Math.cos(t1));
    const y2 = Y(rk * Math.sin(t1));
    wedges.push(`M ${ox} ${oy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${(rk * sc).toFixed(1)} ${(rk * sc).toFixed(1)} 0 0 0 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`);
  }

  const curvePts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * (Math.PI / 2);
    const rv = f(t);
    curvePts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Poláris terület közelítése n darab körszektorral: r = 2 + cos θ, θ ∈ [0; π/2]</div>
      <div className="sliders">
        <label>
          körszektorok száma n = {n}
          <input type="range" min={3} max={24} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={30} y1={oy} x2={W - 20} y2={oy} className="pl-axis" />
        <line x1={ox} y1={16} x2={ox} y2={H - 12} className="pl-axis" />

        {wedges.map((d, i) => (
          <path key={i} d={d} fill="rgba(56,189,248,0.22)" stroke="rgba(56,189,248,0.65)" strokeWidth={1.1} />
        ))}
        <path d={curvePts.join(' ')} stroke="#fbbf24" strokeWidth={2.7} fill="none" />

        <text x={W - 14} y={28} textAnchor="end" className="pl-label" fill="#38bdf8">
          Közelítés (n={n}): {fmt(approx, 4)}
        </text>
        <text x={W - 14} y={48} textAnchor="end" className="pl-label" fill="#34d399">
          Pontos érték (9π/8 + 2): {fmt(exact, 4)}
        </text>
      </svg>
      <div className="explain">
        <p>
          Egy vékony, <M t="r_k" /> sugarú és <M t="\Delta\theta" /> nyílásszögű körszektor területe{' '}
          <M t="\tfrac{1}{2}r_k^2\Delta\theta" /> — összegük <M t="n \to \infty" /> mellett pontosan az{' '}
          <M t="\int_\alpha^\beta \tfrac{1}{2}r^2\,d\theta" /> integrálhoz tart!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. CardioidAreaWidget: r = 2(1 + cos θ) kisöpört területe                  */
/* -------------------------------------------------------------------------- */
export function CardioidAreaWidget() {
  const [deg, setDeg] = useState(180);
  const beta = (deg * Math.PI) / 180;
  // A(β) = ∫_0^β 2(1 + cos t)^2 dt = 3β + 4 sin β + 0.5 sin(2β)
  const area = 3 * beta + 4 * Math.sin(beta) + 0.5 * Math.sin(2 * beta);

  const W = 540;
  const H = 250;
  const cx = 205;
  const cy = H / 2;
  const sc = 42;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const fullPts: string[] = [];
  const sweepPts: string[] = [`M ${cx} ${cy}`];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * 2 * Math.PI;
    const rv = 2 * (1 + Math.cos(t));
    const px = X(rv * Math.cos(t)).toFixed(1);
    const py = Y(rv * Math.sin(t)).toFixed(1);
    fullPts.push(`${i ? 'L' : 'M'}${px},${py}`);
    if (t <= beta + 0.01) sweepPts.push(`L ${px} ${py}`);
  }
  sweepPts.push('Z');

  return (
    <div className="widget">
      <div className="widget-title">Kardioid területe: r = 2(1 + cos θ), kisöpört tartomány 0-tól β-ig</div>
      <div className="sliders">
        <label>
          felső szög β = {deg}° (teljes kör: 360° → A = 6π ≈ 18,85)
          <input type="range" min={15} max={360} step={15} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />
        <path d={sweepPts.join(' ')} fill="rgba(52,211,153,0.26)" stroke="#34d399" strokeWidth={1.6} />
        <path d={fullPts.join(' ')} className="pl-main" />
        <text x={W - 14} y={26} textAnchor="end" className="pl-label" fill="#34d399">
          Eddigi terület: {fmt(area, 2)}
        </text>
      </svg>
      <div className="explain">
        <p>
          Az <M t="x" />-tengelyre való szimmetria miatt a felső fél (<M t="0 \le \theta \le \pi" />) területe pontosan{' '}
          <M t="3\pi" />, a teljes kardioidé pedig <M t="2 \cdot 3\pi = 6\pi \approx 18{,}85" />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. RoseAndLoopAreaWidget: rózsaszirom és csigavonal belső hurok határai    */
/* -------------------------------------------------------------------------- */
export function RoseAndLoopAreaWidget() {
  const [mode, setMode] = useState<'rose' | 'loop'>('rose');
  const W = 540;
  const H = 250;
  const cx = mode === 'rose' ? W / 2 : 210;
  const cy = H / 2;
  const sc = mode === 'rose' ? 35 : 58;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const fullPts: string[] = [];
  const hiPts: string[] = [`M ${cx} ${cy}`];
  if (mode === 'rose') {
    for (let i = 0; i <= 180; i++) {
      const t = (i / 180) * Math.PI;
      const rv = 3 * Math.cos(3 * t);
      fullPts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
    }
    for (let i = 0; i <= 60; i++) {
      const t = -Math.PI / 6 + ((Math.PI / 3) * i) / 60;
      const rv = 3 * Math.cos(3 * t);
      hiPts.push(`L ${X(rv * Math.cos(t)).toFixed(1)} ${Y(rv * Math.sin(t)).toFixed(1)}`);
    }
  } else {
    for (let i = 0; i <= 180; i++) {
      const t = (i / 180) * 2 * Math.PI;
      const rv = 1 + 2 * Math.cos(t);
      fullPts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
    }
    for (let i = 0; i <= 60; i++) {
      const t = (2 * Math.PI) / 3 + (((2 * Math.PI) / 3) * i) / 60;
      const rv = 1 + 2 * Math.cos(t);
      hiPts.push(`L ${X(rv * Math.cos(t)).toFixed(1)} ${Y(rv * Math.sin(t)).toFixed(1)}`);
    }
  }
  hiPts.push('Z');

  return (
    <div className="widget">
      <div className="widget-title">Integrálási határok megtalálása pólusátmenetekből (r = 0)</div>
      <div className="relbuttons chips">
        <button className={mode === 'rose' ? 'on' : ''} onClick={() => setMode('rose')}>
          Egy szirom: r = 3 cos(3θ), θ ∈ [−π/6; π/6]
        </button>
        <button className={mode === 'loop' ? 'on' : ''} onClick={() => setMode('loop')}>
          Belső hurok: r = 1 + 2 cos θ, θ ∈ [2π/3; 4π/3]
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />
        <path d={fullPts.join(' ')} fill="none" stroke="rgba(148,163,184,0.45)" strokeWidth={2} />
        <path
          d={hiPts.join(' ')}
          fill={mode === 'rose' ? 'rgba(52,211,153,0.28)' : 'rgba(251,146,60,0.32)'}
          stroke={mode === 'rose' ? '#34d399' : '#fb923c'}
          strokeWidth={2.5}
        />
      </svg>
      <div className="explain">
        <p>
          {mode === 'rose' ? (
            <>
              Egyetlen szirom határai két szomszédos zérushely: <M t="\cos(3\theta) = 0 \Rightarrow \theta = \pm\tfrac{\pi}{6}" />.
              Területe <M t="\tfrac{1}{2}\int_{-\pi/6}^{\pi/6} 9\cos^2(3\theta)\,d\theta = \tfrac{3\pi}{4}" />, így mindhárom
              szirom együtt <M t="\tfrac{9\pi}{4}" />!
            </>
          ) : (
            <>
              A belső hurok két zérushelye <M t="1+2\cos\theta=0 \Rightarrow \theta = \tfrac{2\pi}{3}" /> és{' '}
              <M t="\tfrac{4\pi}{3}" />. Területe <M t="A = \pi - \tfrac{3\sqrt{3}}{2} \approx 0{,}54" />!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. PolarBetweenCurvesWidget: r = 1 és r = 1 + cos θ közötti tartományok    */
/* -------------------------------------------------------------------------- */
export function PolarBetweenCurvesWidget() {
  const [reg, setReg] = useState<'out' | 'both' | 'in'>('out');
  const W = 540;
  const H = 250;
  const cx = 225;
  const cy = H / 2;
  const sc = 76;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const cardPts: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * 2 * Math.PI;
    const rv = 1 + Math.cos(t);
    cardPts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
  }

  // Különböző tartományok poligonális kitöltése
  const buildBetween = (t0: number, t1: number, rOut: (t: number) => number, rIn: (t: number) => number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = t0 + ((t1 - t0) * i) / 80;
      const rv = rOut(t);
      pts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
    }
    for (let i = 80; i >= 0; i--) {
      const t = t0 + ((t1 - t0) * i) / 80;
      const rv = rIn(t);
      pts.push(`L ${X(rv * Math.cos(t)).toFixed(1)} ${Y(rv * Math.sin(t)).toFixed(1)}`);
    }
    return pts.join(' ') + ' Z';
  };

  const shadePath =
    reg === 'out'
      ? buildBetween(-Math.PI / 2, Math.PI / 2, (t) => 1 + Math.cos(t), () => 1)
      : reg === 'in'
        ? buildBetween(Math.PI / 2, (3 * Math.PI) / 2, () => 1, (t) => 1 + Math.cos(t))
        : buildBetween(0, 2 * Math.PI, (t) => Math.min(1, 1 + Math.cos(t)), () => 0);

  return (
    <div className="widget">
      <div className="widget-title">Két polárgörbe közötti terület: r = 1 + cos θ és r = 1</div>
      <div className="relbuttons chips">
        <button className={reg === 'out' ? 'on' : ''} onClick={() => setReg('out')}>
          Kardioidon belül, körön kívül
        </button>
        <button className={reg === 'both' ? 'on' : ''} onClick={() => setReg('both')}>
          Közös belső rész (metszet)
        </button>
        <button className={reg === 'in' ? 'on' : ''} onClick={() => setReg('in')}>
          Körön belül, kardioidon kívül
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        <path d={shadePath} fill="rgba(56,189,248,0.28)" stroke="none" />
        <circle cx={cx} cy={cy} r={sc} className="pl-alt" />
        <path d={cardPts.join(' ')} className="pl-main" />
      </svg>
      <div className="explain">
        <p>
          {reg === 'out' && (
            <>
              Határok <M t="-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}" />, külső görbe <M t="1+\cos\theta" />,
              belső görbe <M t="1" />. Terület: <M t="\tfrac{1}{2}\int_{-\pi/2}^{\pi/2}((1+\cos\theta)^2 - 1^2)\,d\theta = 2 + \tfrac{\pi}{4} \approx 2{,}79" />.
            </>
          )}
          {reg === 'both' && (
            <>
              Két darabból áll: jobb oldalon a kör (<M t="\tfrac{\pi}{2}" />), bal oldalon a kardioid (
              <M t="\tfrac{3\pi}{4} - 2" />). Összesen <M t="\tfrac{5\pi}{4} - 2 \approx 1{,}93" />.
            </>
          )}
          {reg === 'in' && (
            <>
              Határok <M t="\tfrac{\pi}{2} \le \theta \le \tfrac{3\pi}{2}" />, itt a <strong>kör</strong> a külső!
              Terület: <M t="\tfrac{1}{2}\int_{\pi/2}^{3\pi/2}(1^2 - (1+\cos\theta)^2)\,d\theta = 2 - \tfrac{\pi}{4} \approx 1{,}21" />.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. PolarArcElementDiagram: ds² = dr² + (r dθ)² derékszögű háromszöge       */
/* -------------------------------------------------------------------------- */
export function PolarArcElementDiagram() {
  const [deg, setDeg] = useState(40);
  const t0 = (deg * Math.PI) / 180;
  const dt = 0.28;
  const f = (t: number) => 1.2 + 0.45 * t;
  const r0 = f(t0);
  const r1 = f(t0 + dt);

  const W = 540;
  const H = 250;
  const ox = 140;
  const oy = 215;
  const sc = 88;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy - v * sc;

  const p0x = r0 * Math.cos(t0);
  const p0y = r0 * Math.sin(t0);
  const qx = r0 * Math.cos(t0 + dt);
  const qy = r0 * Math.sin(t0 + dt);
  const p1x = r1 * Math.cos(t0 + dt);
  const p1y = r1 * Math.sin(t0 + dt);

  const spPts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * 1.9;
    const rv = f(t);
    spPts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">A poláris ívelem geometriája: ds² = (dr)² + (r dθ)²</div>
      <div className="sliders">
        <label>
          kiinduló szög θ = {deg}°
          <input type="range" min={10} max={70} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={30} y1={oy} x2={W - 20} y2={oy} className="pl-axis" />
        <line x1={ox} y1={16} x2={ox} y2={H - 12} className="pl-axis" />
        <path d={spPts.join(' ')} fill="none" stroke="rgba(148,163,184,0.45)" strokeWidth={2} />

        {/* Két sugár */}
        <line x1={ox} y1={oy} x2={X(p0x)} y2={Y(p0y)} className="pl-dash2" />
        <line x1={ox} y1={oy} x2={X(p1x)} y2={Y(p1y)} className="pl-dash2" />

        {/* Háromszög: r dθ (cián ív), dr (narancs), ds (zöld) */}
        <path
          d={`M ${X(p0x).toFixed(1)} ${Y(p0y).toFixed(1)} A ${(r0 * sc).toFixed(1)} ${(r0 * sc).toFixed(1)} 0 0 0 ${X(qx).toFixed(1)} ${Y(qy).toFixed(1)}`}
          fill="none"
          stroke="#38bdf8"
          strokeWidth={3}
        />
        <line x1={X(qx)} y1={Y(qy)} x2={X(p1x)} y2={Y(p1y)} stroke="#fb923c" strokeWidth={3} />
        <line x1={X(p0x)} y1={Y(p0y)} x2={X(p1x)} y2={Y(p1y)} stroke="#34d399" strokeWidth={3} />

        <text x={W - 14} y={28} textAnchor="end" className="pl-label" fill="#38bdf8">
          Körív befogó: r dθ
        </text>
        <text x={W - 14} y={48} textAnchor="end" className="pl-label" fill="#fb923c">
          Sugárirányú befogó: dr
        </text>
        <text x={W - 14} y={68} textAnchor="end" className="pl-label" fill="#34d399">
          Átfogó: ds = √(r² + (dr/dθ)²) dθ
        </text>
      </svg>
      <div className="explain">
        <p>
          A sugárirányú <M t="dr" /> elmozdulás merőleges az <M t="r\,d\theta" /> körívre — így Pitagorasz-tétellel
          azonnal adódik <M t="ds = \sqrt{r^2 + (r')^2}\,d\theta" />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. CardioidArcLengthWidget: r = 1 - cos θ ívhossza L = 8                   */
/* -------------------------------------------------------------------------- */
export function CardioidArcLengthWidget() {
  const [deg, setDeg] = useState(180);
  const beta = (deg * Math.PI) / 180;
  const len = 4 * (1 - Math.cos(beta / 2));

  const W = 540;
  const H = 240;
  const cx = 330;
  const cy = H / 2;
  const sc = 80;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const fullPts: string[] = [];
  const tracedPts: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * 2 * Math.PI;
    const rv = 1 - Math.cos(t);
    const cmd = `${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`;
    fullPts.push(cmd);
    if (t <= beta + 0.01) tracedPts.push(cmd);
  }

  return (
    <div className="widget">
      <div className="widget-title">A kardioid ívhossza: r = 1 − cos θ → L = 8 (π nélkül!)</div>
      <div className="sliders">
        <label>
          bejárás θ = 0°-tól {deg}°-ig
          <input type="range" min={10} max={360} step={10} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />
        <path d={fullPts.join(' ')} fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth={2} />
        <path d={tracedPts.join(' ')} stroke="#34d399" strokeWidth={3} fill="none" />
        <text x={24} y={28} className="pl-label" fill="#34d399">
          Eddigi ívhossz: {fmt(len, 2)} / 8,00
        </text>
      </svg>
      <div className="explain">
        <p>
          Akárcsak a ciklois egy ívénél, az <M t="r = a(1-\cos\theta)" /> kardioid teljes kerülete is racionális
          többszöröse <M t="a" />-nak: pontosan <M t="L = 8a" />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. PolarSurfaceRevolutionWidget: forgástest felszíne polárkoordinátákban   */
/* -------------------------------------------------------------------------- */
export function PolarSurfaceRevolutionWidget() {
  const [solid, setSolid] = useState<'sphere' | 'apple'>('sphere');
  const W = 540;
  const H = 240;
  const cx = solid === 'sphere' ? 210 : 230;
  const cy = H / 2;
  const sc = 74;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const topPts: string[] = [];
  const botPts: string[] = [];
  if (solid === 'sphere') {
    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * (Math.PI / 2);
      const rv = 2 * Math.cos(t);
      const x = rv * Math.cos(t);
      const y = rv * Math.sin(t);
      topPts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
      botPts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(-y).toFixed(1)}`);
    }
  } else {
    for (let i = 0; i <= 90; i++) {
      const t = (i / 90) * Math.PI;
      const rv = 1 + Math.cos(t);
      const x = rv * Math.cos(t);
      const y = rv * Math.sin(t);
      topPts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
      botPts.push(`${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(-y).toFixed(1)}`);
    }
  }

  // Egy kiemelt körgyűrű (forgási sugár y = r sin θ)
  const thS = solid === 'sphere' ? Math.PI / 5 : Math.PI / 3;
  const rS = solid === 'sphere' ? 2 * Math.cos(thS) : 1 + Math.cos(thS);
  const rxS = rS * Math.cos(thS);
  const ryS = rS * Math.sin(thS);

  return (
    <div className="widget">
      <div className="widget-title">Forgástest felszíne a polártengely (x-tengely) körül</div>
      <div className="relbuttons chips">
        <button className={solid === 'sphere' ? 'on' : ''} onClick={() => setSolid('sphere')}>
          r = 2 cos θ (gömb, S = 4π)
        </button>
        <button className={solid === 'apple' ? 'on' : ''} onClick={() => setSolid('apple')}>
          r = 1 + cos θ (kardioid-test, S = 32π/5)
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <path d={topPts.join(' ')} className="pl-main" />
        <path d={botPts.join(' ')} fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth={2} strokeDasharray="5 4" />

        {/* Kiemelt forgási öv */}
        <ellipse cx={X(rxS)} cy={cy} rx={12} ry={ryS * sc} fill="rgba(251,191,36,0.16)" stroke="#fbbf24" strokeWidth={2.2} />
        <line x1={X(rxS)} y1={cy} x2={X(rxS)} y2={Y(ryS)} stroke="#34d399" strokeWidth={2} />
        <text x={X(rxS) + 16} y={Y(ryS / 2)} className="pl-label" fill="#34d399">
          y = r sin θ
        </text>
      </svg>
      <div className="explain">
        <p>
          Az <M t="x" />-tengely körüli forgatásnál a gyűrű sugara <M t="y = r\sin\theta" />, szélessége{' '}
          <M t="ds = \sqrt{r^2+(r')^2}\,d\theta" />, így <M t="S = \int_\alpha^\beta 2\pi r\sin\theta\sqrt{r^2+(r')^2}\,d\theta" />.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. PolarIntegralsSummaryDiagram: 3 poláris integrálelem összképe           */
/* -------------------------------------------------------------------------- */
export function PolarIntegralsSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A poláris integrálszámítás három alapeleme</div>
      <svg className="plane" viewBox="0 0 540 135">
        <rect width={540} height={135} className="pl-bg" />

        <rect x={14} y={18} width={158} height={98} rx={12} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={93} y={42} textAnchor="middle" className="pl-label" fill="#38bdf8">
          Terület (szektor)
        </text>
        <text x={93} y={68} textAnchor="middle" className="pl-tick">
          dA = ½ r² dθ
        </text>
        <text x={93} y={92} textAnchor="middle" className="pl-tick">
          között: ½(r₂² − r₁²) dθ
        </text>

        <rect x={191} y={18} width={158} height={98} rx={12} fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth={1.6} />
        <text x={270} y={42} textAnchor="middle" className="pl-label" fill="#34d399">
          Ívhossz
        </text>
        <text x={270} y={68} textAnchor="middle" className="pl-tick">
          ds = √(r² + (r′)²) dθ
        </text>
        <text x={270} y={92} textAnchor="middle" className="pl-tick">
          kardioid: L = 8a
        </text>

        <rect x={368} y={18} width={158} height={98} rx={12} fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth={1.6} />
        <text x={447} y={42} textAnchor="middle" className="pl-label" fill="#fbbf24">
          Forgásfelszín
        </text>
        <text x={447} y={68} textAnchor="middle" className="pl-tick">
          x-teng.: 2π r sin θ ds
        </text>
        <text x={447} y={92} textAnchor="middle" className="pl-tick">
          y-teng.: 2π r cos θ ds
        </text>
      </svg>
    </div>
  );
}
