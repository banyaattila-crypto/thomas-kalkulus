import { useState } from 'react';
import { M, hu } from './M';

type D = { id: string; name: string; xn: string; yn: string; x: number[]; y: number[]; ptrue: number };
const DATA: D[] = [
  {
    id: 'fall',
    name: 'szabadesés',
    xn: 'idő (s)',
    yn: 'megtett út (m)',
    x: [0.4, 0.8, 1.2, 1.6, 2.0, 2.4],
    y: [0.8, 3.1, 7.1, 12.5, 19.7, 28.1],
    ptrue: 2,
  },
  {
    id: 'pend',
    name: 'inga',
    xn: 'hossz (m)',
    yn: 'lengésidő (s)',
    x: [0.25, 0.5, 1.0, 1.5, 2.0],
    y: [1.0, 1.42, 2.01, 2.46, 2.84],
    ptrue: 0.5,
  },
];

const W = 520;
const H = 280;

function ticks(max: number): number[] {
  const raw = max / 5;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * pow).find((s) => s >= raw) as number;
  const out: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

/** Arányossági hipotézis vizsgálata: a vízszintes tengelyen x^p szerepel; ha a pontok az origón átmenő egyenesre esnek, y ∼ x^p. */
export function ModelFitWidget() {
  const [di, setDi] = useState(0);
  const [p, setP] = useState(1);
  const D = DATA[di];
  const u = D.x.map((v) => v ** p);
  const k = u.reduce((s, v, i) => s + v * D.y[i], 0) / u.reduce((s, v) => s + v * v, 0);
  const ssr = D.y.reduce((s, y, i) => s + (y - k * u[i]) ** 2, 0);
  const sst = D.y.reduce((s, y) => s + y * y, 0);
  const r2 = 1 - ssr / sst;
  const umax = Math.max(...u) * 1.1;
  const ymax = Math.max(...D.y) * 1.1;
  const X = (v: number) => 56 + (v / umax) * (W - 76);
  const Y = (v: number) => H - 34 - (v / ymax) * (H - 54);
  const tx = ticks(umax);
  const ty = ticks(ymax);
  return (
    <div className="widget">
      <div className="widget-title">Arányosság-vizsgálat: y ∼ x<sup>p</sup>?</div>
      <div className="relbuttons">
        {DATA.map((d, j) => (
          <button key={d.id} className={j === di ? 'on' : ''} onClick={() => { setDi(j); setP(1); }}>
            {d.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          kitevő p = {hu(p)}
          <input type="range" min={0.25} max={3} step={0.25} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="scatter" role="img" aria-label="adatpontok és illesztett egyenes">
        <rect width={W} height={H} className="pl-bg" />
        {tx.map((v) => (
          <g key={`x${v}`}>
            <line x1={X(v)} y1={20} x2={X(v)} y2={H - 34} className="pl-grid" />
            <text x={X(v)} y={H - 18} textAnchor="middle" className="pl-tick">{String(v).replace('.', ',')}</text>
          </g>
        ))}
        {ty.map((v) => (
          <g key={`y${v}`}>
            <line x1={56} y1={Y(v)} x2={W - 20} y2={Y(v)} className="pl-grid" />
            <text x={50} y={Y(v) + 4} textAnchor="end" className="pl-tick">{String(v).replace('.', ',')}</text>
          </g>
        ))}
        <line x1={56} y1={H - 34} x2={W - 20} y2={H - 34} className="pl-axis" />
        <line x1={56} y1={20} x2={56} y2={H - 34} className="pl-axis" />
        <line x1={X(0)} y1={Y(0)} x2={X(umax)} y2={Y(k * umax)} className="pl-alt" />
        {u.map((v, i) => (
          <circle key={i} cx={X(v)} cy={Y(D.y[i])} r={5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
        ))}
        <text x={W - 22} y={H - 4} textAnchor="end" className="pl-axname">{`${D.xn.split(' ')[0]}^${String(p).replace('.', ',')}`}</text>
        <text x={62} y={16} className="pl-axname">{D.yn}</text>
      </svg>
      <div className="result">
        <M block t={`y\\approx ${hu(Math.round(k * 1000) / 1000)}\\cdot x^{${hu(p)}},\\qquad R^2=${hu(Math.round(r2 * 10000) / 10000)}`} />
      </div>
      <div className="explain">
        <p>
          A narancs egyenes az origón átmenő legjobb illesztés (legkisebb négyzetes eltérés). Minél jobban közelíti 1-et az{' '}
          <M t="R^2" />, annál kevésbé tér el tőle az adatsor. {r2 > 0.999 ? 'Ez a kitevő az adatokkal kiválóan egyezik.' : r2 > 0.99 ? 'Elfogadható illeszkedés.' : 'Az adatok nem esnek egyenesre: próbálj másik kitevőt.'}
        </p>
        <p className="hint">A mérési adatok szemléltető példák, saját szerkesztésűek.</p>
      </div>
    </div>
  );
}
