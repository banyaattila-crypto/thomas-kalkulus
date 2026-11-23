import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: erő-elmozdulás görbe alatti terület = munka */

type ForceEx = {
  id: string;
  label: string;
  fTex: string;
  a: number;
  bMin: number;
  bMax: number;
  xr: [number, number];
  yr: [number, number];
  fn: Fn;
  work: (b: number) => number;
};

const FORCE_EX: ForceEx[] = [
  {
    id: 'const',
    label: 'Állandó: F(x) = 30 N',
    fTex: '30',
    a: 0,
    bMin: 0.5,
    bMax: 5,
    xr: [-0.2, 5.4],
    yr: [-3, 45],
    fn: () => 30,
    work: (b) => 30 * b,
  },
  {
    id: 'lin',
    label: 'Lineáris (rugó): F(x) = 10x',
    fTex: '10x',
    a: 0,
    bMin: 0.5,
    bMax: 4,
    xr: [-0.2, 4.4],
    yr: [-3, 45],
    fn: (x) => 10 * x,
    work: (b) => 5 * b * b,
  },
  {
    id: 'invsq',
    label: 'Fordított négyzet: F(x) = 40/x²',
    fTex: '\\dfrac{40}{x^2}',
    a: 1,
    bMin: 1.2,
    bMax: 5,
    xr: [0.5, 5.4],
    yr: [-3, 45],
    fn: (x) => 40 / (x * x),
    work: (b) => 40 * (1 - 1 / b),
  },
];

export function WorkForceGraphWidget() {
  const [idx, setIdx] = useState(1);
  const p = FORCE_EX[idx];
  const [b, setB] = useState(3.0);

  const selectP = (i: number) => {
    setIdx(i);
    setB(3.0);
  };

  const W = p.work(b);

  return (
    <div className="widget">
      <div className="widget-title">Munka = az F(x) erő–elmozdulás görbe alatti terület</div>
      <div className="relbuttons chips" role="tablist" aria-label="Erőtörvény választása">
        {FORCE_EX.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => selectP(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <label>
        Elmozdulás vége: <M t={`b = ${tx(b, 1)}\\text{ m}`} /> (intervallum: <M t={`[${p.a};\\,${tx(b, 1)}]`} />)
        <input type="range" min={p.bMin} max={p.bMax} step={0.2} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>

      <Chart xmin={p.xr[0]} xmax={p.xr[1]} ymin={p.yr[0]} ymax={p.yr[1]} h={215}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 60;
          const pts: string[] = [`M ${sx(p.a)} ${sy(0)}`];
          for (let i = 0; i <= st; i++) {
            const x = p.a + ((b - p.a) * i) / st;
            pts.push(`L ${sx(x)} ${sy(p.fn(x))}`);
          }
          pts.push(`L ${sx(b)} ${sy(0)} Z`);
          return (
            <>
              <path d={pts.join(' ')} fill="rgba(56,189,248,0.28)" />
              <line x1={sx(b)} y1={sy(0)} x2={sx(b)} y2={sy(p.fn(b))} stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />
              <path d={curve(p.fn, m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <circle cx={sx(b)} cy={sy(p.fn(b))} r={4} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Elvégzett munka: <M t={`W = \\displaystyle\\int_{${p.a}}^{${tx(b, 1)}} ${p.fTex}\\,dx = \\mathbf{${tx(W, 2)}\\text{ J}}`} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Hooke-törvény interaktív rugó */

export function HookeSpringWidget() {
  const [k, setK] = useState(200);
  const [xCm, setXCm] = useState(15);
  const x = xCm / 100;
  const F = k * x;
  const W = 0.5 * k * x * x;

  // Rugó SVG: fal x=30, nyugalmi vég x=200, nyújtott vég 200 + xCm*8
  const x0 = 200;
  const xEnd = x0 + xCm * 8;
  const coils = 10;
  const springPts: string[] = ['M 30 62 L 50 62'];
  const span = xEnd - 70;
  for (let i = 0; i < coils; i++) {
    const cx1 = 50 + ((i + 0.25) / coils) * span;
    const cx2 = 50 + ((i + 0.75) / coils) * span;
    springPts.push(`L ${cx1.toFixed(1)} 40 L ${cx2.toFixed(1)} 84`);
  }
  springPts.push(`L ${(xEnd - 20).toFixed(1)} 62 L ${xEnd.toFixed(1)} 62`);

  return (
    <div className="widget">
      <div className="widget-title">Hooke-törvény szimulátor: F(x) = kx és W = ½kx²</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Rugóállandó: <strong>k = {k} N/m</strong>
          <input type="range" min={50} max={500} step={50} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
        <label>
          Megnyúlás: <strong>x = {xCm} cm ({round(x, 2)} m)</strong>
          <input type="range" min={0} max={30} step={2} value={xCm} onChange={(e) => setXCm(Number(e.target.value))} />
        </label>
      </div>

      <svg viewBox="0 0 500 125" className="plane" role="img" aria-label="Nyújtott rugó">
        <rect width={500} height={125} className="pl-bg" />
        {/* Fal */}
        <rect x={16} y={24} width={14} height={76} fill="#334155" stroke="#64748b" />
        {/* Nyugalmi vonal */}
        <line x1={x0} y1={20} x2={x0} y2={106} stroke="#64748b" strokeWidth={1.4} strokeDasharray="4 3" />
        <text x={x0} y={118} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>x = 0 (nyugalmi)</text>
        {/* Rugó */}
        <path d={springPts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.4} strokeLinejoin="round" />
        {/* Tömeg a végén */}
        <rect x={xEnd} y={42} width={32} height={40} rx={5} fill="rgba(251,191,36,0.4)" stroke="#fbbf24" strokeWidth={2} />
        {/* Megnyúlás nyíl */}
        {xCm > 0 && (
          <>
            <line x1={x0} y1={100} x2={xEnd} y2={100} stroke="#34d399" strokeWidth={2} />
            <text x={(x0 + xEnd) / 2} y={96} textAnchor="middle" fill="#a7f3d0" fontSize={11} fontWeight={700}>
              x = {xCm} cm
            </text>
          </>
        )}
      </svg>

      <div className="result">
        <p>
          Pillanatnyi erő: <M t={`F = kx = ${tx(F, 1)}\\text{ N}`} /> · Összes nyújtási munka:{' '}
          <M t={`W = \\dfrac{1}{2}kx^2 = \\mathbf{${tx(W, 2)}\\text{ J}}`} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: lógó lánc felhúzása */

export function HangingChainWidget() {
  const L = 20; // m
  const lambda = 15; // N/m
  const [pulled, setPulled] = useState(8); // m felhúzva
  const rem = L - pulled;
  const Fnow = lambda * rem;
  // W(pulled) = ∫_0^pulled lambda*(L - x) dx = lambda*(L*pulled - pulled²/2)
  const Wdone = lambda * (L * pulled - 0.5 * pulled * pulled);
  const Wtotal = 0.5 * lambda * L * L; // 3000 J

  const chainLenPx = (rem / L) * 115;

  return (
    <div className="widget">
      <div className="widget-title">Lógó lánc felhúzása (L = 20 m, λ = 15 N/m) — egyre könnyebb!</div>
      <label>
        Felhúzott hossz: <strong>{pulled} m</strong> (még lóg: <strong>{rem} m</strong>)
        <input type="range" min={0} max={20} step={1} value={pulled} onChange={(e) => setPulled(Number(e.target.value))} />
      </label>

      <svg viewBox="0 0 520 170" className="plane" role="img" aria-label="Tetőről lelógó lánc felhúzása">
        <rect width={520} height={170} className="pl-bg" />

        {/* Épület tető */}
        <rect x={24} y={32} width={135} height={125} fill="#1e293b" stroke="#475569" strokeWidth={1.6} />
        <text x={92} y={56} textAnchor="middle" fill="#cbd5e1" fontSize={11.5} fontWeight={700}>Tető (csörlő)</text>
        {/* Feltekert lánc a tetőn */}
        {pulled > 0 && (
          <rect
            x={110}
            y={22}
            width={40}
            height={10}
            rx={3}
            fill="rgba(52,211,153,0.55)"
            stroke="#34d399"
            strokeWidth={1.4}
          />
        )}
        {/* Lelógó lánc */}
        {rem > 0 && (
          <line x1={174} y1={32} x2={174} y2={32 + chainLenPx} stroke="#fbbf24" strokeWidth={5} strokeDasharray="6 3" />
        )}
        <circle cx={166} cy={32} r={7} fill="#0f172a" stroke="#38bdf8" strokeWidth={2} />
        <text x={190} y={32 + chainLenPx / 2 + 4} fill="#fde68a" fontSize={11.5} fontWeight={700}>
          {rem > 0 ? `${rem} m (${Fnow} N)` : 'Fent van!'}
        </text>

        {/* Jobb oldal: élő összefoglaló doboz */}
        <rect x={282} y={24} width={220} height={122} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={392} y={46} textAnchor="middle" fill="#7dd3fc" fontSize={12} fontWeight={700}>Pillanatnyi állapot</text>
        <text x={296} y={72} fill="#e2e8f0" fontSize={11.5}>• Lógó súly: F(x) = {Fnow} N</text>
        <text x={296} y={96} fill="#a7f3d0" fontSize={11.5}>• Eddigi munka: {Wdone} J</text>
        <text x={296} y={120} fill="#fde68a" fontSize={11.5}>• Teljes munka (20 m): {Wtotal} J</text>
      </svg>

      <div className="result">
        <p>
          <M t="W_{\text{teljes}} = \displaystyle\int_0^{20} 15(20-x)\,dx = 3000\text{ J} = (300\text{ N})\cdot(10\text{ m})" /> (mintha a súlypontot emelnénk fel!)
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: tartály kiszivattyúzása */

type TankType = 'cyl' | 'cone' | 'hemi';

export function TankPumpingWidget() {
  const [tank, setTank] = useState<TankType>('cone');
  const [y, setY] = useState(3.0);

  const H = tank === 'hemi' ? 3 : 6;
  const clampedY = Math.min(H - 0.2, Math.max(0.2, y));
  // Aljától mérve y ∈ [0, H]
  const radius =
    tank === 'cyl'
      ? 2
      : tank === 'cone'
      ? clampedY * 0.5 // R = 3 at y = 6
      : Math.sqrt(Math.max(0, 9 - (3 - clampedY) ** 2)); // R = 3 at y = 3
  const lift = H - clampedY;
  const area = Math.PI * radius * radius;

  const selectTank = (t: TankType) => {
    setTank(t);
    setY(t === 'hemi' ? 1.5 : 3.0);
  };

  return (
    <div className="widget">
      <div className="widget-title">Folyadék kiszivattyúzása tartályból — rétegről rétegre!</div>
      <div className="relbuttons chips">
        <button type="button" className={tank === 'cyl' ? 'on' : ''} onClick={() => selectTank('cyl')}>
          Henger (r = 2, H = 6)
        </button>
        <button type="button" className={tank === 'cone' ? 'on' : ''} onClick={() => selectTank('cone')}>
          Kúp (R = 3, H = 6)
        </button>
        <button type="button" className={tank === 'hemi' ? 'on' : ''} onClick={() => selectTank('hemi')}>
          Félgömb (R = 3)
        </button>
      </div>

      <label>
        Vízréteg magassága az aljától: <M t={`y = ${tx(clampedY, 1)}\\text{ m}`} /> (emelés a peremig:{' '}
        <M t={`H - y = ${tx(lift, 1)}\\text{ m}`} />)
        <input
          type="range"
          min={0.3}
          max={H - 0.2}
          step={0.2}
          value={clampedY}
          onChange={(e) => setY(Number(e.target.value))}
        />
      </label>

      <Chart xmin={-3.6} xmax={3.6} ymin={-0.4} ymax={H + 0.6} h={210}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const outline =
            tank === 'cyl'
              ? `M ${sx(-2)} ${sy(6)} L ${sx(-2)} ${sy(0)} L ${sx(2)} ${sy(0)} L ${sx(2)} ${sy(6)} Z`
              : tank === 'cone'
              ? `M ${sx(-3)} ${sy(6)} L ${sx(0)} ${sy(0)} L ${sx(3)} ${sy(6)} Z`
              : (() => {
                  const pts: string[] = [];
                  for (let i = 0; i <= 60; i++) {
                    const ang = Math.PI + (Math.PI * i) / 60;
                    pts.push(`${i === 0 ? 'M' : 'L'} ${sx(3 * Math.cos(ang))} ${sy(3 + 3 * Math.sin(ang))}`);
                  }
                  pts.push('Z');
                  return pts.join(' ');
                })();

          return (
            <>
              <path d={outline} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={2.2} />
              {/* Kiemelt vízréteg */}
              <rect
                x={sx(-radius)}
                y={sy(clampedY) - 4}
                width={sx(radius) - sx(-radius)}
                height={8}
                fill="rgba(251,191,36,0.72)"
                stroke="#fbbf24"
                strokeWidth={1.4}
              />
              {/* Emelési távolság nyíl */}
              <line x1={sx(0)} y1={sy(clampedY)} x2={sx(0)} y2={sy(H)} stroke="#34d399" strokeWidth={2.4} />
              <circle cx={sx(0)} cy={sy(H)} r={3.5} fill="#34d399" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Réteg sugara: <M t={`r(y) = ${tx(radius, 2)}\\text{ m}`} /> · Réteg területe: <M t={`A(y) \\approx ${tx(area, 2)}\\text{ m}^2`} />
        </p>
        <p>
          {tank === 'cyl' && <M t="W = \rho g\cdot 4\pi\int_0^6 (6-y)\,dy = \mathbf{72\pi\rho g}" />}
          {tank === 'cone' && <M t="W = \rho g\cdot\pi\int_0^6 \dfrac{y^2}{4}(6-y)\,dy = \mathbf{27\pi\rho g}" />}
          {tank === 'hemi' && <M t="W = \rho g\cdot\pi\int_0^3 (9-u^2)u\,du = \mathbf{\dfrac{81\pi}{4}\rho g}" />}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: gravitációs munka (űrbe emelés) */

export function GravityEscapeDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Gravitációs munka és a véges szökési energia (F(r) = GMm / r²)</div>
      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="Gravitációs erő és véges szökési munka">
        <rect width={540} height={165} className="pl-bg" />

        {/* Tengelyek */}
        <line x1={42} y1={132} x2={310} y2={132} stroke="#64748b" strokeWidth={1.3} />
        <line x1={42} y1={18} x2={42} y2={138} stroke="#64748b" strokeWidth={1.3} />
        {/* 1/r² görbe és alatta lévő véges terület */}
        <path d="M 86 132 L 86 30 Q 130 98 188 115 T 302 127 L 302 132 Z" fill="rgba(56,189,248,0.28)" />
        <path d="M 86 30 Q 130 98 188 115 T 302 127" fill="none" stroke="#38bdf8" strokeWidth={2.5} />
        <line x1={86} y1={28} x2={86} y2={132} stroke="#34d399" strokeWidth={2} strokeDasharray="4 3" />
        <line x1={164} y1={105} x2={164} y2={132} stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="4 3" />
        <text x={86} y={148} textAnchor="middle" fill="#a7f3d0" fontSize={11} fontWeight={700}>R_F</text>
        <text x={164} y={148} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>2R_F</text>
        <text x={295} y={148} textAnchor="middle" fill="#94a3b8" fontSize={11}>∞</text>
        <text x={125} y={118} textAnchor="middle" fill="#bae6fd" fontSize={11} fontWeight={700}>50%</text>
        <text x={215} y={125} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>50%</text>

        {/* Jobb doboz */}
        <rect x={324} y={16} width={202} height={132} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={425} y={38} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>Szökési munka (R_F → ∞)</text>
        <text x={425} y={66} textAnchor="middle" fill="#7dd3fc" fontSize={13} fontWeight={700}>W_∞ = GMm / R_F</text>
        <text x={336} y={94} fill="#a7f3d0" fontSize={11}>• A teljes munka FELE elmegy</text>
        <text x={344} y={110} fill="#a7f3d0" fontSize={11}>már R_F-től 2R_F-ig!</text>
        <text x={336} y={134} fill="#fde68a" fontSize={11} fontWeight={700}>v_szök = √(2GM/R_F) ≈ 11,2 km/s</text>
      </svg>
    </div>
  );
}
