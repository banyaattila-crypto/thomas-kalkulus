import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: sin/cos és deriváltja + 4-es ciklus */

export function SinCosDerivWidget() {
  const [which, setWhich] = useState<'sin' | 'cos'>('sin');
  const [x0, setX0] = useState(0.7);
  const f: Fn = which === 'sin' ? Math.sin : Math.cos;
  const df: Fn = which === 'sin' ? Math.cos : (x) => -Math.sin(x);
  const y0 = f(x0);
  const m0 = df(x0);
  const tan: Fn = (x) => y0 + m0 * (x - x0);

  return (
    <div className="widget">
      <div className="widget-title">A szinusz és a koszinusz érintőinek meredeksége</div>
      <div className="relbuttons chips">
        <button className={which === 'sin' ? 'on' : ''} onClick={() => setWhich('sin')}>
          f(x) = sin x → f&apos;(x) = cos x
        </button>
        <button className={which === 'cos' ? 'on' : ''} onClick={() => setWhich('cos')}>
          f(x) = cos x → f&apos;(x) = −sin x
        </button>
      </div>
      <label>
        szög (radián!): x₀ = {round(x0, 2)} rad (meredekség: {round(m0, 3)})
        <input type="range" min={-3.1} max={3.1} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <div className="mini">Felső ábra: y = {which === 'sin' ? 'sin x' : 'cos x'}</div>
      <Chart xmin={-3.5} xmax={3.5} ymin={-1.6} ymax={1.6} h={175}>
        {(m) => (
          <>
            <line x1={m.X(x0)} y1={0} x2={m.X(x0)} y2={m.h} className="pl-dash2" />
            <path d={curve(tan, m, 60)} className="pl-alt" />
            <path d={curve(f, m, 300)} className="pl-main" />
            <circle cx={m.X(x0)} cy={m.Y(y0)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="mini">Alsó ábra: y&apos; = {which === 'sin' ? 'cos x' : '−sin x'}</div>
      <Chart xmin={-3.5} xmax={3.5} ymin={-1.6} ymax={1.6} h={165}>
        {(m) => (
          <>
            <line x1={m.X(x0)} y1={0} x2={m.X(x0)} y2={m.h} className="pl-dash2" />
            <path d={curve(df, m, 300)} className="pl-ok" />
            <circle cx={m.X(x0)} cy={m.Y(m0)} r={5.5} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
    </div>
  );
}

export function TrigCycleDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A szinusz és koszinusz 4-es deriválási köre</div>
      <svg viewBox="0 0 420 190" className="plane" role="img" aria-label="4-es deriválási kör">
        <rect width={420} height={190} className="pl-bg" />
        {/* 4 doboz */}
        <rect x={165} y={14} width={90} height={36} rx={10} fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={210} y={37} textAnchor="middle" fill="#7dd3fc" className="pl-label">sin x</text>

        <rect x={305} y={77} width={95} height={36} rx={10} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={1.8} />
        <text x={352} y={100} textAnchor="middle" fill="#6ee7b7" className="pl-label">cos x</text>

        <rect x={165} y={140} width={90} height={36} rx={10} fill="rgba(251,146,60,0.22)" stroke="#fb923c" strokeWidth={1.8} />
        <text x={210} y={163} textAnchor="middle" fill="#fed7aa" className="pl-label">−sin x</text>

        <rect x={20} y={77} width={95} height={36} rx={10} fill="rgba(251,191,36,0.22)" stroke="#fbbf24" strokeWidth={1.8} />
        <text x={67} y={100} textAnchor="middle" fill="#fde68a" className="pl-label">−cos x</text>

        {/* Óramutató járásával megegyező nyilak */}
        <path d="M 260 32 Q 335 32 348 70" fill="none" stroke="#cbd5e1" strokeWidth={2} />
        <polygon points="348,74 342,64 352,65" fill="#cbd5e1" />

        <path d="M 348 118 Q 335 158 260 158" fill="none" stroke="#cbd5e1" strokeWidth={2} />
        <polygon points="258,158 268,153 268,163" fill="#cbd5e1" />

        <path d="M 160 158 Q 85 158 72 118" fill="none" stroke="#cbd5e1" strokeWidth={2} />
        <polygon points="72,115 67,125 77,124" fill="#cbd5e1" />

        <path d="M 72 72 Q 85 32 160 32" fill="none" stroke="#cbd5e1" strokeWidth={2} />
        <polygon points="162,32 152,27 152,37" fill="#cbd5e1" />

        <text x={210} y={99} textAnchor="middle" fill="#94a3b8" fontSize={12}>minden lépés: d/dx</text>
      </svg>
      <p className="legend">4 deriválás után pontosan visszajutsz a kiinduló függvényhez: (sin x)⁽⁴⁾ = sin x és (cos x)⁽⁴⁾ = cos x!</p>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: rugón függő harmonikus rezgőmozgás */

export function SpringOscWidget() {
  const [t, setT] = useState(0.8);
  const s = 5 * Math.cos(t);
  const v = -5 * Math.sin(t);
  const a = -5 * Math.cos(t);

  // Rugó rajza (bal oldalon): y0 = 110 a nyugalmi helyzet, s ∈ [-5, 5] → y ∈ [45, 175]
  const yMid = 115;
  const yBob = yMid - s * 13;
  const coils = 8;
  let springPath = `M 55 18 `;
  for (let i = 1; i <= coils; i++) {
    const yy = 18 + ((yBob - 32) * i) / coils;
    const xx = i === coils ? 55 : i % 2 === 1 ? 38 : 72;
    springPath += `L ${xx} ${yy.toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="widget-title">Harmonikus rezgőmozgás: s(t) = 5 cos t</div>
      <label>
        idő: t = {round(t, 2)} s (egy teljes periódus: 2π ≈ 6,28 s)
        <input type="range" min={0} max={6.3} step={0.1} value={t} onChange={(e) => setT(Number(e.target.value))} />
      </label>
      <div className="row" style={{ alignItems: 'center' }}>
        <svg viewBox="0 0 120 220" style={{ width: 120, flexShrink: 0 }} className="plane" role="img" aria-label="Rugón függő test">
          <rect width={120} height={220} className="pl-bg" />
          <line x1={20} y1={18} x2={90} y2={18} stroke="#cbd5e1" strokeWidth={3} />
          <line x1={12} y1={yMid} x2={108} y2={yMid} className="pl-dash2" />
          <text x={106} y={yMid - 5} textAnchor="end" className="pl-tick">s=0</text>
          <path d={springPath} fill="none" stroke="#94a3b8" strokeWidth={2.2} />
          <rect x={37} y={yBob - 14} width={36} height={28} rx={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />
          {/* Sebességnyíl (zöld) */}
          {Math.abs(v) > 0.3 && (
            <line x1={88} y1={yBob} x2={88} y2={yBob - v * 6} stroke="#34d399" strokeWidth={3} strokeLinecap="round" />
          )}
        </svg>
        <div style={{ flex: 1, minWidth: 260 }}>
          <Chart xmin={0} xmax={6.4} ymin={-6} ymax={6} h={210}>
            {(m) => (
              <>
                <line x1={m.X(t)} y1={0} x2={m.X(t)} y2={m.h} className="pl-dash2" />
                <path d={curve((x) => 5 * Math.cos(x), m, 300)} className="pl-main" />
                <path d={curve((x) => -5 * Math.sin(x), m, 300)} className="pl-ok" />
                <path d={curve((x) => -5 * Math.cos(x), m, 300)} className="pl-alt" strokeDasharray="5 4" />
                <circle cx={m.X(t)} cy={m.Y(s)} r={5} fill="#38bdf8" />
                <circle cx={m.X(t)} cy={m.Y(v)} r={5} fill="#34d399" />
              </>
            )}
          </Chart>
        </div>
      </div>
      <p className="legend">Kék: helyzet s(t) = 5 cos t. Zöld: sebesség v(t) = −5 sin t. Narancs szaggatott: gyorsulás a(t) = −5 cos t.</p>
      <div className="result">
        <M block t={`s=${tx(s, 2)},\\qquad v=${tx(v, 2)},\\qquad a=${tx(a, 2)} = -s`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: tg, ctg, sec, csc és deriváltjaik */

type TrigEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  df: Fn;
  xr: [number, number];
  yr: [number, number];
  note: string;
};

const TRIG_EX: TrigEx[] = [
  {
    id: 'tg',
    name: 'tg x → sec² x',
    tex: '\\dfrac{d}{dx}(\\operatorname{tg} x)=\\sec^2 x = \\dfrac{1}{\\cos^2 x}',
    f: (x) => (Math.abs(Math.cos(x)) < 0.04 ? NaN : Math.tan(x)),
    df: (x) => (Math.abs(Math.cos(x)) < 0.04 ? NaN : 1 / (Math.cos(x) ** 2)),
    xr: [-1.45, 1.45],
    yr: [-5, 7],
    note: 'Mivel sec² x ≥ 1 mindenütt, a tangens minden ágán szigorúan növekszik, és legkisebb meredeksége 1 (x = 0-ban)!',
  },
  {
    id: 'ctg',
    name: 'ctg x → −csc² x',
    tex: '\\dfrac{d}{dx}(\\operatorname{ctg} x)=-\\csc^2 x = -\\dfrac{1}{\\sin^2 x}',
    f: (x) => (Math.abs(Math.sin(x)) < 0.04 ? NaN : Math.cos(x) / Math.sin(x)),
    df: (x) => (Math.abs(Math.sin(x)) < 0.04 ? NaN : -1 / (Math.sin(x) ** 2)),
    xr: [0.1, 3.04],
    yr: [-7, 5],
    note: 'A derivált mindig ≤ −1 (negatív!): a kotangens minden ágán szigorúan csökken.',
  },
  {
    id: 'sec',
    name: 'sec x → sec x tg x',
    tex: '\\dfrac{d}{dx}(\\sec x)=\\sec x\\operatorname{tg} x',
    f: (x) => (Math.abs(Math.cos(x)) < 0.04 ? NaN : 1 / Math.cos(x)),
    df: (x) => (Math.abs(Math.cos(x)) < 0.04 ? NaN : Math.tan(x) / Math.cos(x)),
    xr: [-1.4, 1.4],
    yr: [-6, 6],
    note: 'Az x = 0 pontban a szekáns alján vízszintes az érintő (sec 0 · tg 0 = 0).',
  },
];

export function TrigSixTableWidget() {
  const [ti, setTi] = useState(0);
  const ex = TRIG_EX[ti];

  return (
    <div className="widget">
      <div className="widget-title">A tg, ctg és sec függvények grafikonja és deriváltja</div>
      <div className="relbuttons chips">
        {TRIG_EX.map((q, i) => (
          <button key={q.id} className={ti === i ? 'on' : ''} onClick={() => setTi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={240}>
        {(m) => (
          <>
            <path d={curve(ex.df, m, 500)} className="pl-ok" strokeDasharray="6 4" />
            <path d={curve(ex.f, m, 500)} className="pl-main" />
          </>
        )}
      </Chart>
      <p className="legend">Kék: eredeti függvény. Zöld szaggatott: a deriváltfüggvény.</p>
      <div className="explain">
        <p>{ex.note}</p>
      </div>
    </div>
  );
}
