import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: geometriai változási sebesség (kör) */

export function GeoRateWidget() {
  const [D, setD] = useState(6);
  const dD = 0.6;
  const A = (Math.PI / 4) * D * D;
  const dAdD = (Math.PI / 2) * D;
  const dA = (Math.PI / 4) * ((D + dD) ** 2 - D * D);

  const cx = 190;
  const cy = 125;
  const rPx = D * 9.5;
  const r2Px = (D + dD) * 9.5;

  return (
    <div className="widget">
      <div className="widget-title">A kör területének változása az átmérő függvényében</div>
      <label>
        átmérő: D = {round(D, 1)} m (gyűrű vastagsága: ΔD = 0,6 m)
        <input type="range" min={1} max={10} step={0.5} value={D} onChange={(e) => setD(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 380 250" className="plane" role="img" aria-label="Növekvő kör és gyűrűje">
        <rect width={380} height={250} className="pl-bg" />
        <circle cx={cx} cy={cy} r={r2Px} fill="rgba(251, 146, 60, 0.28)" stroke="#fb923c" strokeWidth={1.8} />
        <circle cx={cx} cy={cy} r={rPx} fill="rgba(56, 189, 248, 0.26)" stroke="#38bdf8" strokeWidth={2} />
        <line x1={cx - rPx} y1={cy} x2={cx + rPx} y2={cy} className="pl-dash2" />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#e2e8f0" className="pl-label">
          D = {round(D, 1)} m
        </text>
      </svg>
      <div className="result">
        <M block t={`A(${tx(D, 1)}) = \\frac{\\pi}{4}D^2 \\approx ${tx(A, 2)}\\text{ m}^2,\\qquad \\frac{dA}{dD} = \\frac{\\pi}{2}D \\approx ${tx(dAdD, 2)}\\text{ m}^2/\\text{m}`} />
        <p>
          Ugyanakkora <M t="\Delta D=0{,}6" /> m átmérőnövelés most <M t={`\\Delta A\\approx ${tx(dA, 2)}`} /> m²-rel növeli a területet — mert nagyobb kör körül hosszabb a kerület, így szélesebb a narancs gyűrű!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: mozgáslétra + 1D mozgás v(t)-ből */

export function MotionLadderDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A mozgás négy szintje: a deriválás létrája</div>
      <svg viewBox="0 0 540 120" className="plane" role="img" aria-label="Helyzet, sebesség, gyorsulás, lökés diagram">
        <rect width={540} height={120} className="pl-bg" />
        {[
          { x: 14, t: 'Helyzet', s: 's(t)', u: 'm', c: '#38bdf8' },
          { x: 148, t: 'Sebesség', s: 'v(t) = s′(t)', u: 'm/s', c: '#34d399' },
          { x: 282, t: 'Gyorsulás', s: 'a(t) = v′(t)', u: 'm/s²', c: '#fbbf24' },
          { x: 416, t: 'Lökés', s: 'j(t) = a′(t)', u: 'm/s³', c: '#fb923c' },
        ].map((b, i) => (
          <g key={b.t}>
            <rect x={b.x} y={18} width={110} height={84} rx={12} fill="rgba(255,255,255,0.04)" stroke={b.c} strokeWidth={1.8} />
            <text x={b.x + 55} y={42} textAnchor="middle" fill={b.c} className="pl-label">{b.t}</text>
            <text x={b.x + 55} y={65} textAnchor="middle" fill="#e2e8f0" fontSize={12}>{b.s}</text>
            <text x={b.x + 55} y={88} textAnchor="middle" fill="#94a3b8" fontSize={11}>[{b.u}]</text>
            {i < 3 && (
              <>
                <line x1={b.x + 112} y1={60} x2={b.x + 132} y2={60} stroke="#cbd5e1" strokeWidth={2} />
                <polygon points={`${b.x + 132},60 ${b.x + 125},55 ${b.x + 125},65`} fill="#cbd5e1" />
                <text x={b.x + 122} y={48} textAnchor="middle" fill="#94a3b8" fontSize={10}>d/dt</text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// Darabos v(t) függvény (a 3. példa szellemében): [0,3] pozitív, [3,5] negatív, [5,6] 0, [6,7] pozitív
const vGraph: Fn = (t) => {
  if (t < 0 || t > 7) return NaN;
  if (t <= 1) return 2 * t;
  if (t <= 2) return 2;
  if (t <= 4) return 2 - 2.5 * (t - 2); // t=2: 2, t=2.8: 0, t=4: -3
  if (t <= 5) return -3 + 3 * (t - 4); // t=5: 0
  if (t <= 6) return 0;
  return 2 * (t - 6);
};

const aGraph: Fn = (t) => {
  if (t < 1) return 2;
  if (t < 2) return 0;
  if (t < 4) return -2.5;
  if (t < 5) return 3;
  if (t < 6) return 0;
  return 2;
};

// Numerikus integrál s(t) a részecske 1D helyzetéhez
function posAt(t: number): number {
  const N = 200;
  let sum = 0;
  for (let i = 0; i < N; i++) {
    const x = (t * (i + 0.5)) / N;
    sum += vGraph(x) * (t / N);
  }
  return sum;
}

export function VelocityGraphWidget() {
  const [t, setT] = useState(3.6);
  const v = vGraph(t);
  const spd = Math.abs(v);
  const a = aGraph(t);
  const s = posAt(t);
  const dir = Math.abs(v) < 0.05 ? 'áll (v = 0)' : v > 0 ? 'előre mozog (v > 0)' : 'hátrafelé mozog (v < 0)';

  // 1D sín SVG koordináta: s ∈ [-1, 4.5] → x ∈ [40, 460]
  const sx = 80 + s * 80;

  return (
    <div className="widget">
      <div className="widget-title">Sebesség–idő grafikon olvasása: sebesség vs. gyorsaság</div>
      <label>
        időpillanat: t = {round(t, 2)} s
        <input type="range" min={0} max={7} step={0.1} value={t} onChange={(e) => setT(Number(e.target.value))} />
      </label>
      <div className="mini">A részecske 1D mozgása a számegyenesen (s-tengely):</div>
      <svg viewBox="0 0 500 54" className="plane" role="img" aria-label="1D pálya">
        <rect width={500} height={54} className="pl-bg" />
        <line x1={30} y1={28} x2={470} y2={28} className="pl-axis" />
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k}>
            <line x1={80 + k * 80} y1={23} x2={80 + k * 80} y2={33} className="pl-axis" />
            <text x={80 + k * 80} y={47} textAnchor="middle" className="pl-tick">{k} m</text>
          </g>
        ))}
        <circle cx={Math.max(35, Math.min(465, sx))} cy={28} r={8} fill={v >= 0 ? '#34d399' : '#fb923c'} stroke="#0b0e24" strokeWidth={1.8} />
      </svg>
      <div className="mini">Sebesség–idő grafikon: y = v(t) (m/s)</div>
      <Chart xmin={0} xmax={7} ymin={-3.5} ymax={3} h={200}>
        {(m) => (
          <>
            <line x1={m.X(t)} y1={0} x2={m.X(t)} y2={m.h} className="pl-dash2" />
            <path d={curve(vGraph, m, 400)} className="pl-main" />
            <circle cx={m.X(t)} cy={m.Y(v)} r={6} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="result">
        <p>
          <strong>Irány:</strong> {dir} · <strong>Sebesség:</strong> v = {round(v, 2)} m/s · <strong>Gyorsaság:</strong> |v| = {round(spd, 2)} m/s · <strong>Gyorsulás:</strong> a = {round(a, 1)} m/s²
        </p>
        <p>
          Figyeld meg t = 4 s-nél: a sebesség −3 m/s (negatív, hátrafelé megy), mégis itt a <strong>legnagyobb a gyorsaság</strong> (3 m/s)!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: függőleges hajítás */

export function VerticalThrowWidget() {
  const [v0, setV0] = useState(39.2);
  const [t, setT] = useState(2);
  const g = 9.8;
  const tMax = (2 * v0) / g;
  const tc = Math.min(t, tMax);
  const s = v0 * tc - 0.5 * g * tc * tc;
  const v = v0 - g * tc;
  const hMax = (v0 * v0) / (2 * g);

  const sFn: Fn = (x) => (x < 0 || x > tMax ? NaN : v0 * x - 0.5 * g * x * x);

  return (
    <div className="widget">
      <div className="widget-title">Függőleges hajítás: a kő útja és az s(t) grafikon</div>
      <div className="relbuttons chips">
        {[19.6, 29.4, 39.2].map((val) => (
          <button
            key={val}
            className={v0 === val ? 'on' : ''}
            onClick={() => {
              setV0(val);
              setT(Math.min(t, (2 * val) / g));
            }}
          >
            v₀ = {round(val, 1)} m/s
          </button>
        ))}
      </div>
      <label>
        eltelt idő: t = {round(tc, 2)} s (repülési idő: {round(tMax, 1)} s, csúcsmagasság: {round(hMax, 1)} m)
        <input type="range" min={0} max={tMax} step={0.1} value={tc} onChange={(e) => setT(Number(e.target.value))} />
      </label>
      <Chart xmin={0} xmax={8.5} ymin={-5} ymax={85} h={230}>
        {(m) => (
          <>
            <line x1={0} y1={m.Y(hMax)} x2={m.w} y2={m.Y(hMax)} className="pl-dash2" />
            <path d={curve(sFn, m, 300)} className="pl-main" />
            <circle cx={m.X(tc)} cy={m.Y(s)} r={6.5} fill={v >= 0 ? '#34d399' : '#fb923c'} stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="result">
        <M block t={`s(${tx(tc, 2)}) = ${tx(s, 1)}\\text{ m},\\qquad v(${tx(tc, 2)}) = ${tx(v, 1)}\\text{ m/s},\\qquad a(${tx(tc, 2)}) = -9{,}8\\text{ m/s}^2`} />
        <p>
          A csúcsponton (<M t={`t=${tx(tMax / 2, 1)}`} /> s) a sebesség 0, de a gyorsulás ott is <strong>−9,8 m/s²</strong> (különben a kő fent lebegne!).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: határköltség vs. tényleges többletköltség */

const costFn: Fn = (x) => 0.1 * x ** 3 - 1.2 * x * x + 15 * x + 40;
const mcFn: Fn = (x) => 0.3 * x * x - 2.4 * x + 15;

export function MarginalEconWidget() {
  const [x, setX] = useState(10);
  const c0 = costFn(x);
  const c1 = costFn(x + 1);
  const exactDelta = c1 - c0;
  const marginal = mcFn(x);
  const tan: Fn = (t) => c0 + marginal * (t - x);

  return (
    <div className="widget">
      <div className="widget-title">Határköltség c&apos;(x) vs. a következő darab tényleges költsége</div>
      <label>
        napi gyártás: x = {x} darab (összehasonlítás x + 1 = {x + 1} darabbal)
        <input type="range" min={2} max={18} step={1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <Chart xmin={0} xmax={20} ymin={0} ymax={650} h={240}>
        {(m) => (
          <>
            <path d={curve(tan, m, 80)} className="pl-ok" strokeDasharray="6 4" />
            <path d={curve(costFn, m, 300)} className="pl-main" />
            <line x1={m.X(x)} y1={m.Y(c0)} x2={m.X(x + 1)} y2={m.Y(c0)} stroke="#fb923c" strokeWidth={2} />
            <line x1={m.X(x + 1)} y1={m.Y(c0)} x2={m.X(x + 1)} y2={m.Y(c1)} stroke="#fb923c" strokeWidth={2.5} />
            <circle cx={m.X(x)} cy={m.Y(c0)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="result">
        <table className="tbl">
          <thead>
            <tr>
              <th>mennyiség</th>
              <th>érték (ezer Ft)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Összköltség x = {x} db-nál: c({x})</td>
              <td>{round(c0, 2)}</td>
            </tr>
            <tr>
              <td>Tényleges többletköltség (+1 db): c({x + 1}) − c({x})</td>
              <td><strong>{round(exactDelta, 2)}</strong></td>
            </tr>
            <tr>
              <td>Határköltség (érintő meredeksége): c&apos;({x})</td>
              <td><strong>{round(marginal, 2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Mendel genetikai érzékenység */

const mendelY: Fn = (p) => 2 * p - p * p;
const mendelDy: Fn = (p) => 2 - 2 * p;

export function SensitivityWidget() {
  const [p, setP] = useState(0.15);
  const dp = 0.05;
  const y0 = mendelY(p);
  const y1 = mendelY(Math.min(1, p + dp));
  const dy = y1 - y0;
  const sens = mendelDy(p);

  return (
    <div className="widget">
      <div className="widget-title">Érzékenység a genetikában: y(p) = 2p − p²</div>
      <label>
        domináns arány: p = {round(p, 2)} (beavatkozás: Δp = +0,05)
        <input type="range" min={0} max={0.95} step={0.05} value={p} onChange={(e) => setP(Number(e.target.value))} />
      </label>
      <Chart xmin={0} xmax={1.05} ymin={0} ymax={2.2} h={220}>
        {(m) => (
          <>
            <path d={curve(mendelY, m, 200)} className="pl-main" />
            <path d={curve(mendelDy, m, 100)} className="pl-ok" strokeDasharray="6 4" />
            <circle cx={m.X(p)} cy={m.Y(y0)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
            <circle cx={m.X(p)} cy={m.Y(sens)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <p className="legend">Kék: y(p) = 2p − p² (sima borsók aránya). Zöld szaggatott: dy/dp = 2 − 2p (érzékenység).</p>
      <div className="result">
        <p>
          Az érzékenység p = {round(p, 2)}-nél <strong>dy/dp = {round(sens, 2)}</strong>; egy Δp = +0,05 növelés <strong>Δy = +{round(dy, 4)}</strong> változást okoz.
        </p>
      </div>
    </div>
  );
}
