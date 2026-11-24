import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

/* -------------------------------------------------------------------------- */
/* 1. PolarLineNormalWidget: r cos(θ - θ0) = r0 egyenes levezetése            */
/* -------------------------------------------------------------------------- */
export function PolarLineNormalWidget() {
  const [r0, setR0] = useState(2);
  const [deg0, setDeg0] = useState(35);
  const th0 = (deg0 * Math.PI) / 180;
  const c0 = Math.cos(th0);
  const s0 = Math.sin(th0);

  const px0 = r0 * c0;
  const py0 = r0 * s0;
  // Egy tetszőleges P pont az egyenesen (elmozdítva +1.8-cal az irányvektor mentén)
  const px = px0 - 1.8 * s0;
  const py = py0 + 1.8 * c0;

  const W = 540;
  const H = 250;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 32;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  return (
    <div className="widget">
      <div className="widget-title">Egyenes poláregyenlete: r cos(θ − θ₀) = r₀ (OP₀P derékszögű háromszög)</div>
      <div className="sliders">
        <label>
          merőleges távolság r₀ = {fmt(r0, 1)}
          <input type="range" min={0.5} max={3} step={0.5} value={r0} onChange={(e) => setR0(Number(e.target.value))} />
        </label>
        <label>
          normálvektor szöge θ₀ = {deg0}°
          <input type="range" min={0} max={330} step={15} value={deg0} onChange={(e) => setDeg0(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        {/* Az egyenes */}
        <line x1={X(px0 - 7 * s0)} y1={Y(py0 + 7 * c0)} x2={X(px0 + 7 * s0)} y2={Y(py0 - 7 * c0)} className="pl-main" />
        {/* OP0 és OP */}
        <line x1={cx} y1={cy} x2={X(px0)} y2={Y(py0)} stroke="#fbbf24" strokeWidth={2.4} />
        <line x1={cx} y1={cy} x2={X(px)} y2={Y(py)} stroke="#34d399" strokeWidth={2} strokeDasharray="5 4" />

        <circle cx={X(px0)} cy={Y(py0)} r={4.5} fill="#fbbf24" />
        <text x={X(px0) + 8} y={Y(py0) + 14} className="pl-label" fill="#fbbf24">
          P₀({fmt(r0, 1)}; {deg0}°)
        </text>
        <circle cx={X(px)} cy={Y(py)} r={5} fill="#34d399" />
        <text x={X(px) + 8} y={Y(py) - 6} className="pl-label" fill="#34d399">
          P(r; θ)
        </text>
      </svg>
      <div className="explain">
        <p>
          Az <M t="OP_0P" /> derékszögű háromszögben a befogó <M t="r_0 = r\cos(\theta - \theta_0)" />. Kifejtve:{' '}
          <M t={`${fmt(c0, 2)}x ${s0 >= 0 ? '+' : ''} ${fmt(s0, 2)}y = ${fmt(r0, 1)}`} />.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. PolarCircleCosineLawWidget: általános és origón átmenő polárkör         */
/* -------------------------------------------------------------------------- */
export function PolarCircleCosineLawWidget() {
  const [throughOrigin, setThroughOrigin] = useState(false);
  const [a, setA] = useState(1.6);
  const [deg0, setDeg0] = useState(30);
  const r0 = throughOrigin ? a : 2.2;
  const th0 = (deg0 * Math.PI) / 180;
  const cx0 = r0 * Math.cos(th0);
  const cy0 = r0 * Math.sin(th0);

  const W = 540;
  const H = 250;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 30;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  return (
    <div className="widget">
      <div className="widget-title">Kör poláregyenlete a koszinusztételből</div>
      <div className="relbuttons chips">
        <button className={!throughOrigin ? 'on' : ''} onClick={() => setThroughOrigin(false)}>
          Általános kör (r₀ = 2,2)
        </button>
        <button className={throughOrigin ? 'on' : ''} onClick={() => setThroughOrigin(true)}>
          Origón átmenő (r₀ = a → r = 2a cos(θ − θ₀))
        </button>
      </div>
      <div className="sliders">
        <label>
          sugár a = {fmt(a, 1)}
          <input type="range" min={0.8} max={2.2} step={0.2} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          középpont szöge θ₀ = {deg0}°
          <input type="range" min={0} max={330} step={15} value={deg0} onChange={(e) => setDeg0(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        <circle cx={X(cx0)} cy={Y(cy0)} r={a * sc} className="pl-main" />
        <line x1={cx} y1={cy} x2={X(cx0)} y2={Y(cy0)} stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />
        <circle cx={X(cx0)} cy={Y(cy0)} r={4.5} fill="#34d399" />
        <text x={X(cx0) + 8} y={Y(cy0) - 8} className="pl-label" fill="#34d399">
          P₀({fmt(r0, 1)}; {deg0}°)
        </text>
      </svg>
      <div className="explain">
        <p>
          {throughOrigin ? (
            <>
              Origón átmenő kör (<M t="r_0 = a" />): <M t={`r = ${fmt(2 * a, 1)}\\cos(\\theta - ${deg0}^\\circ)`} />.
            </>
          ) : (
            <>
              Általános kör: <M t={`r^2 - ${fmt(2 * r0, 1)}r\\cos(\\theta - ${deg0}^\\circ) + ${fmt(r0 * r0 - a * a, 2)} = 0`} />.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. PolarConicDerivationDiagram: PF = r, PD = k - r cos θ -> r = ke/(1+e cos θ) */
/* -------------------------------------------------------------------------- */
export function PolarConicDerivationDiagram() {
  const [deg, setDeg] = useState(55);
  const e = 0.7;
  const k = 3.2;
  const th = (deg * Math.PI) / 180;
  const r = (k * e) / (1 + e * Math.cos(th));
  const px = r * Math.cos(th);
  const py = r * Math.sin(th);
  const pd = k - px;

  const W = 540;
  const H = 255;
  const cx = 310;
  const cy = H / 2;
  const sc = 42;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const pts: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * 2 * Math.PI;
    const rv = (k * e) / (1 + e * Math.cos(t));
    pts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Levezetés: PF = r és PD = k − r cos θ (e = 0,7, k = 3,2)</div>
      <div className="sliders">
        <label>
          P pont szöge θ = {deg}°
          <input type="range" min={0} max={360} step={5} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        {/* Vezéregyenes x = k */}
        <line x1={X(k)} y1={14} x2={X(k)} y2={H - 14} className="pl-dash" />
        <text x={X(k) + 6} y={26} className="pl-label" fill="#fbbf24">
          x = k
        </text>

        <path d={pts.join(' ')} className="pl-main" />

        {/* PF és PD szakasz */}
        <line x1={cx} y1={cy} x2={X(px)} y2={Y(py)} stroke="#34d399" strokeWidth={2.6} />
        <line x1={X(px)} y1={Y(py)} x2={X(k)} y2={Y(py)} stroke="#fbbf24" strokeWidth={2.6} />

        <circle cx={cx} cy={cy} r={5} fill="#fb923c" />
        <text x={cx - 8} y={cy + 18} textAnchor="end" className="pl-label" fill="#fb923c">
          F(0; 0)
        </text>
        <circle cx={X(px)} cy={Y(py)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <circle cx={X(k)} cy={Y(py)} r={4.5} fill="#fbbf24" />
      </svg>
      <div className="explain">
        <p>
          <M t={`PF = r = ${fmt(r, 2)}`} />, <M t={`PD = k - r\\cos\\theta = ${fmt(pd, 2)}`} /> <M t="\Longrightarrow" />{' '}
          <strong>
            <M t={`\\frac{PF}{PD} = ${fmt(r / pd, 2)} = e`} />
          </strong>
          . Innen <M t="r = e(k - r\cos\theta) \Rightarrow r = \dfrac{ke}{1 + e\cos\theta}" />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. PolarConicFourOrientationsWidget: a vezéregyenes 4 helyzete + e csúszka */
/* -------------------------------------------------------------------------- */
type Orient = 'xp' | 'xm' | 'yp' | 'ym';

export function PolarConicFourOrientationsWidget() {
  const [ori, setOri] = useState<Orient>('xp');
  const [e, setE] = useState(0.75);
  const k = 2.2;

  const W = 540;
  const H = 260;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 34;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const evalR = (t: number) => {
    const den =
      ori === 'xp'
        ? 1 + e * Math.cos(t)
        : ori === 'xm'
          ? 1 - e * Math.cos(t)
          : ori === 'yp'
            ? 1 + e * Math.sin(t)
            : 1 - e * Math.sin(t);
    return Math.abs(den) < 0.05 ? null : (k * e) / den;
  };

  // Külön szakaszokra bontjuk, hogy hiperbolánál ne legyen átugró vonal
  const paths: string[] = [];
  let cur: string[] = [];
  for (let i = 0; i <= 360; i++) {
    const t = (i / 360) * 2 * Math.PI;
    const rv = evalR(t);
    if (rv === null || Math.abs(rv) > 10) {
      if (cur.length > 1) paths.push(cur.join(' '));
      cur = [];
      continue;
    }
    const x = rv * Math.cos(t);
    const y = rv * Math.sin(t);
    if (Math.abs(x) > 8.2 || Math.abs(y) > 4.2) {
      if (cur.length > 1) paths.push(cur.join(' '));
      cur = [];
      continue;
    }
    cur.push(`${cur.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
  }
  if (cur.length > 1) paths.push(cur.join(' '));

  const col = e < 0.99 ? '#38bdf8' : e <= 1.01 ? '#fbbf24' : '#fb923c';
  const kind = e < 0.99 ? 'Ellipszis' : e <= 1.01 ? 'Parabola' : 'Hiperbola';

  return (
    <div className="widget">
      <div className="widget-title">A vezéregyenes négy helyzete és az excentricitás hatása (k = 2,2)</div>
      <div className="relbuttons chips">
        <button className={ori === 'xp' ? 'on' : ''} onClick={() => setOri('xp')}>
          x = +k (1 + e cos θ)
        </button>
        <button className={ori === 'xm' ? 'on' : ''} onClick={() => setOri('xm')}>
          x = −k (1 − e cos θ)
        </button>
        <button className={ori === 'yp' ? 'on' : ''} onClick={() => setOri('yp')}>
          y = +k (1 + e sin θ)
        </button>
        <button className={ori === 'ym' ? 'on' : ''} onClick={() => setOri('ym')}>
          y = −k (1 − e sin θ)
        </button>
      </div>
      <div className="sliders">
        <label>
          excentricitás e = {fmt(e, 2)} ({kind})
          <input type="range" min={0.35} max={1.75} step={0.05} value={e} onChange={(ev) => setE(Number(ev.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        {/* Vezéregyenes */}
        {ori === 'xp' && <line x1={X(k)} y1={10} x2={X(k)} y2={H - 10} className="pl-dash" />}
        {ori === 'xm' && <line x1={X(-k)} y1={10} x2={X(-k)} y2={H - 10} className="pl-dash" />}
        {ori === 'yp' && <line x1={10} y1={Y(k)} x2={W - 10} y2={Y(k)} className="pl-dash" />}
        {ori === 'ym' && <line x1={10} y1={Y(-k)} x2={W - 10} y2={Y(-k)} className="pl-dash" />}

        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={col} strokeWidth={2.6} />
        ))}
        <circle cx={cx} cy={cy} r={4.5} fill="#fbbf24" />
        <text x={W - 14} y={24} textAnchor="end" className="pl-label" fill={col}>
          {kind} (e = {fmt(e, 2)})
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. PolarConicNormalizedLabWidget: p / (A + B cos θ) normalizálása          */
/* -------------------------------------------------------------------------- */
const NORM_PRESETS = [
  {
    name: 'r = 12 / (3 + 2 cos θ)',
    norm: 'r = 4 / (1 + ⅔ cos θ)',
    e: 2 / 3,
    k: 6,
    trig: 'cos' as const,
    sign: 1,
    desc: 'Osztunk 3-mal: e = 2/3 < 1 (ellipszis), ke = 4 → k = 6 (vezéregyenes: x = 6). Csúcsok: (12/5; 0) és (12; π).',
  },
  {
    name: 'r = 6 / (2 − 2 sin θ)',
    norm: 'r = 3 / (1 − sin θ)',
    e: 1,
    k: 3,
    trig: 'sin' as const,
    sign: -1,
    desc: 'Osztunk 2-vel: e = 1 (parabola), k = 3 (vezéregyenes: y = −3). Csúcs: (3/2; −π/2), felfelé nyílik.',
  },
  {
    name: 'r = 10 / (2 + 3 cos θ)',
    norm: 'r = 5 / (1 + 1,5 cos θ)',
    e: 1.5,
    k: 10 / 3,
    trig: 'cos' as const,
    sign: 1,
    desc: 'Osztunk 2-vel: e = 1,5 > 1 (hiperbola), k = 10/3 (vezéregyenes: x = 10/3). Csúcsok: (2; 0) és (−10; π).',
  },
];

export function PolarConicNormalizedLabWidget() {
  const [idx, setIdx] = useState(0);
  const p = NORM_PRESETS[idx];

  const W = 540;
  const H = 240;
  const cx = p.trig === 'cos' ? 350 : W / 2;
  const cy = p.trig === 'sin' ? 145 : H / 2;
  const sc = idx === 0 ? 18 : idx === 1 ? 24 : 15;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const paths: string[] = [];
  let cur: string[] = [];
  for (let i = 0; i <= 360; i++) {
    const t = (i / 360) * 2 * Math.PI;
    const den = 1 + p.sign * p.e * (p.trig === 'cos' ? Math.cos(t) : Math.sin(t));
    if (Math.abs(den) < 0.06) {
      if (cur.length > 1) paths.push(cur.join(' '));
      cur = [];
      continue;
    }
    const rv = (p.k * p.e) / den;
    const x = rv * Math.cos(t);
    const y = rv * Math.sin(t);
    if (X(x) < 10 || X(x) > W - 10 || Y(y) < 10 || Y(y) > H - 10) {
      if (cur.length > 1) paths.push(cur.join(' '));
      cur = [];
      continue;
    }
    cur.push(`${cur.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
  }
  if (cur.length > 1) paths.push(cur.join(' '));

  return (
    <div className="widget">
      <div className="widget-title">Normalizálás: mindig hozzunk létre 1-est a nevezőben!</div>
      <div className="relbuttons chips">
        {NORM_PRESETS.map((pr, i) => (
          <button key={pr.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {pr.name}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={16} y1={cy} x2={W - 16} y2={cy} className="pl-axis" />
        <line x1={cx} y1={12} x2={cx} y2={H - 12} className="pl-axis" />

        {p.trig === 'cos' ? (
          <line x1={X(p.sign * p.k)} y1={12} x2={X(p.sign * p.k)} y2={H - 12} className="pl-dash" />
        ) : (
          <line x1={16} y1={Y(p.sign * p.k)} x2={W - 16} y2={Y(p.sign * p.k)} className="pl-dash" />
        )}

        {paths.map((d, i) => (
          <path key={i} d={d} className={p.e < 1 ? 'pl-main' : p.e === 1 ? 'pl-ok' : 'pl-alt'} />
        ))}
        <circle cx={cx} cy={cy} r={4.5} fill="#fbbf24" />
        <text x={18} y={24} className="pl-label" fill="#34d399">
          {p.norm}
        </text>
      </svg>
      <div className="explain">
        <p>{p.desc}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. RotatedPolarConicWidget: r = ke / (1 + e cos(θ - α)) elforgatás         */
/* -------------------------------------------------------------------------- */
export function RotatedPolarConicWidget() {
  const [alphaDeg, setAlphaDeg] = useState(40);
  const a = (alphaDeg * Math.PI) / 180;
  const e = 0.65;
  const ke = 1.6;

  const W = 540;
  const H = 240;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 36;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const pts: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * 2 * Math.PI;
    const rv = ke / (1 + e * Math.cos(t - a));
    pts.push(`${i ? 'L' : 'M'}${X(rv * Math.cos(t)).toFixed(1)},${Y(rv * Math.sin(t)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Elforgatás polárkoordinátákban: egyszerűen θ → θ − α!</div>
      <div className="sliders">
        <label>
          elforgatási szög α = {alphaDeg}°
          <input type="range" min={0} max={180} step={5} value={alphaDeg} onChange={(ev) => setAlphaDeg(Number(ev.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={12} x2={cx} y2={H - 12} className="pl-axis" />

        <line x1={X(-5 * Math.cos(a))} y1={Y(-5 * Math.sin(a))} x2={X(5 * Math.cos(a))} y2={Y(5 * Math.sin(a))} className="pl-dash2" />
        <path d={pts.join(' ')} className="pl-main" />
        <circle cx={cx} cy={cy} r={4.5} fill="#fbbf24" />
      </svg>
      <div className="explain">
        <p>
          Descartes-koordinátákban az elforgatáshoz vegyes <M t="Bxy" /> tag kellett (10.3). Polárkoordinátákban elég{' '}
          <M t="\theta" /> helyére <M t="\theta - \alpha" />-t írni:{' '}
          <M t={`r = \\dfrac{1{,}6}{1 + 0{,}65\\cos(\\theta - ${alphaDeg}^\\circ)}`} />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. KeplerPolarOrbitWidget: r = a(1-e^2)/(1 + e cos θ) csillagászati pálya  */
/* -------------------------------------------------------------------------- */
const KEPLER = [
  { name: 'Föld (e=0,02)', e: 0.02, a: 2.3, unit: '1,00 CSE' },
  { name: 'Merkúr (e=0,21)', e: 0.21, a: 2.3, unit: '0,39 CSE' },
  { name: 'Ikarosz (e=0,83)', e: 0.83, a: 2.5, unit: '1,08 CSE' },
  { name: 'Szökési hiperbola (e=1,4)', e: 1.4, a: 1.4, unit: 'csillagközi' },
];

export function KeplerPolarOrbitWidget() {
  const [idx, setIdx] = useState(2);
  const [deg, setDeg] = useState(110);
  const orb = KEPLER[idx];
  const th = (deg * Math.PI) / 180;

  const pNum = orb.e < 1 ? orb.a * (1 - orb.e * orb.e) : orb.a * (orb.e * orb.e - 1);
  const W = 540;
  const H = 250;
  const cx = orb.e < 1 ? 350 : 210;
  const cy = H / 2;
  const sc = 48;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const pts: string[] = [];
  const tMin = orb.e < 1 ? 0 : -Math.acos(-1 / orb.e) + 0.14;
  const tMax = orb.e < 1 ? 2 * Math.PI : Math.acos(-1 / orb.e) - 0.14;
  for (let i = 0; i <= 160; i++) {
    const t = tMin + ((tMax - tMin) * i) / 160;
    const rv = pNum / (1 + orb.e * Math.cos(t));
    const x = rv * Math.cos(t);
    const y = rv * Math.sin(t);
    if (X(x) < 12 || X(x) > W - 12 || Y(y) < 10 || Y(y) > H - 10) continue;
    pts.push(`${pts.length ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`);
  }

  const tc = Math.max(tMin + 0.05, Math.min(tMax - 0.05, orb.e < 1 ? th : ((deg - 180) * Math.PI) / 180));
  const rNow = pNum / (1 + orb.e * Math.cos(tc));
  const bx = rNow * Math.cos(tc);
  const by = rNow * Math.sin(tc);

  return (
    <div className="widget">
      <div className="widget-title">Kepler-pályák polárkoordinátákban: r = a(1 − e²) / (1 + e cos θ)</div>
      <div className="relbuttons chips">
        {KEPLER.map((k, i) => (
          <button key={k.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {k.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          valódi anomália θ = {Math.round((tc * 180) / Math.PI)}° · távolság r = {fmt(rNow, 2)}
          <input type="range" min={0} max={360} step={5} value={deg} onChange={(ev) => setDeg(Number(ev.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={18} y1={cy} x2={W - 18} y2={cy} className="pl-axis" />
        <path d={pts.join(' ')} className={orb.e < 1 ? 'pl-main' : 'pl-alt'} />

        {/* Vezérsugár */}
        <line x1={cx} y1={cy} x2={X(bx)} y2={Y(by)} stroke="#34d399" strokeWidth={2} strokeDasharray="4 3" />

        {/* Nap a pólusban */}
        <circle cx={cx} cy={cy} r={11} fill="rgba(251,191,36,0.24)" />
        <circle cx={cx} cy={cy} r={5.5} fill="#fbbf24" />
        <text x={cx} y={cy + 20} textAnchor="middle" className="pl-label" fill="#fbbf24">
          Nap (F)
        </text>

        {X(bx) > 10 && X(bx) < W - 10 && Y(by) > 10 && Y(by) < H - 10 && (
          <circle cx={X(bx)} cy={Y(by)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        )}
      </svg>
      <div className="explain">
        <p>
          {orb.e < 1 ? (
            <>
              Napközel <M t="\theta = 0" />-nál (<M t="r_{\min} = a(1-e)" />), naptávol <M t="\theta = \pi" />-nél (
              <M t="r_{\max} = a(1+e)" />).
            </>
          ) : (
            <>
              <M t="e > 1" /> esetén a test nem kötött pályán kering: egyszer megkerüli a Napot, majd végleg elhagyja a
              Naprendszert!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. PolarConicsSummaryDiagram: 4 irány összefoglaló ábra                    */
/* -------------------------------------------------------------------------- */
export function PolarConicsSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A négy szabványos poláris kúpszelet-orientáció (fókusz a pólusban)</div>
      <svg className="plane" viewBox="0 0 540 155">
        <rect width={540} height={155} className="pl-bg" />

        {/* 1 + e cos θ */}
        <g>
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#38bdf8">
            1 + e cos θ
          </text>
          <line x1={105} y1={34} x2={105} y2={116} className="pl-dash" />
          <ellipse cx={58} cy={75} rx={34} ry={22} className="pl-main" />
          <circle cx={78} cy={75} r={3.5} fill="#fbbf24" />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            direktrix: x = +k
          </text>
        </g>

        <line x1={135} y1={12} x2={135} y2={144} className="pl-grid" />

        {/* 1 - e cos θ */}
        <g transform="translate(135, 0)">
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#38bdf8">
            1 − e cos θ
          </text>
          <line x1={30} y1={34} x2={30} y2={116} className="pl-dash" />
          <ellipse cx={77} cy={75} rx={34} ry={22} className="pl-main" />
          <circle cx={57} cy={75} r={3.5} fill="#fbbf24" />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            direktrix: x = −k
          </text>
        </g>

        <line x1={270} y1={12} x2={270} y2={144} className="pl-grid" />

        {/* 1 + e sin θ */}
        <g transform="translate(270, 0)">
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#34d399">
            1 + e sin θ
          </text>
          <line x1={24} y1={38} x2={110} y2={38} className="pl-dash" />
          <ellipse cx={67} cy={82} rx={22} ry={30} stroke="#34d399" strokeWidth={2.4} fill="none" />
          <circle cx={67} cy={64} r={3.5} fill="#fbbf24" />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            direktrix: y = +k
          </text>
        </g>

        <line x1={405} y1={12} x2={405} y2={144} className="pl-grid" />

        {/* 1 - e sin θ */}
        <g transform="translate(405, 0)">
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#34d399">
            1 − e sin θ
          </text>
          <line x1={24} y1={112} x2={110} y2={112} className="pl-dash" />
          <ellipse cx={67} cy={68} rx={22} ry={30} stroke="#34d399" strokeWidth={2.4} fill="none" />
          <circle cx={67} cy={86} r={3.5} fill="#fbbf24" />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            direktrix: y = −k
          </text>
        </g>
      </svg>
    </div>
  );
}
