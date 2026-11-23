import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: szumma jel anatómiája */

export function SigmaAnatomyDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A szumma jel (Σ) anatómiája</div>
      <svg viewBox="0 0 500 165" className="plane" role="img" aria-label="Szumma jel részei">
        <rect width={500} height={165} className="pl-bg" />
        {/* Maga a szumma */}
        <text x={175} y={38} textAnchor="middle" fill="#fb923c" fontSize={18} fontWeight={700}>n</text>
        <text x={175} y={102} textAnchor="middle" fill="#38bdf8" fontSize={68} fontFamily="Georgia, serif">Σ</text>
        <text x={175} y={134} textAnchor="middle" fill="#34d399" fontSize={16} fontWeight={700}>k = m</text>
        <text x={242} y={92} textAnchor="start" fill="#fbbf24" fontSize={28} fontWeight={700}>aₖ</text>

        {/* Feliratok és nyilak */}
        <line x1={194} y1={32} x2={295} y2={32} stroke="#fb923c" strokeWidth={1.6} />
        <text x={302} y={36} fill="#fed7aa" fontSize={12.5}>felső határ (utolsó index)</text>

        <line x1={280} y1={84} x2={325} y2={84} stroke="#fbbf24" strokeWidth={1.6} />
        <text x={332} y={88} fill="#fde68a" fontSize={12.5}>általános tag (képlet)</text>

        <line x1={206} y1={128} x2={295} y2={128} stroke="#34d399" strokeWidth={1.6} />
        <text x={302} y={132} fill="#a7f3d0" fontSize={12.5}>futó index és alsó határ</text>

        <line x1={132} y1={82} x2={98} y2={82} stroke="#38bdf8" strokeWidth={1.6} />
        <text x={92} y={78} textAnchor="end" fill="#7dd3fc" fontSize={12}>összegzés</text>
        <text x={92} y={94} textAnchor="end" fill="#94a3b8" fontSize={11}>(n − m + 1 tag)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Gauss lépcsője */

export function GaussSumWidget() {
  const [n, setN] = useState(5);
  const sum = (n * (n + 1)) / 2;
  const cell = Math.min(26, Math.floor(240 / (n + 1)));
  const w = (n + 1) * cell;
  const h = n * cell;
  const ox = Math.floor((360 - w) / 2);
  const oy = Math.floor((185 - h) / 2);

  const rects: JSX.Element[] = [];
  for (let row = 0; row < n; row++) {
    const k = row + 1;
    for (let col = 0; col < n + 1; col++) {
      const isBlue = col < k;
      rects.push(
        <rect
          key={`${row}-${col}`}
          x={ox + col * cell}
          y={oy + row * cell}
          width={cell - 2}
          height={cell - 2}
          rx={3}
          fill={isBlue ? 'rgba(56,189,248,0.45)' : 'rgba(251,146,60,0.38)'}
          stroke={isBlue ? '#38bdf8' : '#fb923c'}
          strokeWidth={1.2}
        />,
      );
    }
  }

  return (
    <div className="widget">
      <div className="widget-title">Gauss 8 éves kori trükkje: két lépcsőből egy téglalap!</div>
      <label>
        n = {n} (két azonos lépcső: {n} sor × {n + 1} oszlop = {n * (n + 1)} négyzet)
        <input type="range" min={3} max={10} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 360 195" className="plane" role="img" aria-label="Gauss téglalap bizonyítás">
        <rect width={360} height={195} className="pl-bg" />
        {rects}
      </svg>
      <div className="result">
        <M block t={`\\sum_{k=1}^{${n}} k = 1 + 2 + \\dots + ${n} = \\frac{${n}\\cdot(${n}+1)}{2} = ${sum}`} />
        <p>
          A kék és a narancs lépcső együtt egy pontosan <M t={`${n}\\times ${n + 1}`} />-es téglalapot alkot — így egyetlen lépcső területe ennek éppen a fele!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: pontos terület határértéke (n → ∞) */

type AreaEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  a: number;
  b: number;
  exact: number;
  exactTex: string;
  formulaTex: string;
  xr: [number, number];
  yr: [number, number];
};

const AREA_EX: AreaEx[] = [
  {
    id: 'par1',
    name: '1 − x² a [0; 1]-en',
    tex: 'f(x)=1-x^2,\\;[0;\\,1]',
    f: (x) => 1 - x * x,
    a: 0,
    b: 1,
    exact: 2 / 3,
    exactTex: '\\dfrac{2}{3}',
    formulaTex: 'S_n = 1 - \\dfrac{2n^3+3n^2+n}{6n^3} \\;\\xrightarrow{n\\to\\infty}\\; 1 - \\dfrac{2}{6} = \\dfrac{2}{3}',
    xr: [-0.15, 1.15],
    yr: [-0.1, 1.2],
  },
  {
    id: 'sq2',
    name: 'x² a [0; 2]-n',
    tex: 'f(x)=x^2,\\;[0;\\,2]',
    f: (x) => x * x,
    a: 0,
    b: 2,
    exact: 8 / 3,
    exactTex: '\\dfrac{8}{3}',
    formulaTex: 'S_n = \\dfrac{8}{n^3}\\sum_{k=1}^n k^2 = \\dfrac{4(n+1)(2n+1)}{3n^2} \\;\\xrightarrow{n\\to\\infty}\\; \\dfrac{8}{3}',
    xr: [-0.2, 2.2],
    yr: [-0.2, 4.4],
  },
  {
    id: 'cub1',
    name: 'x³ a [0; 1]-en',
    tex: 'f(x)=x^3,\\;[0;\\,1]',
    f: (x) => x * x * x,
    a: 0,
    b: 1,
    exact: 0.25,
    exactTex: '\\dfrac{1}{4}',
    formulaTex: 'S_n = \\dfrac{1}{n^4}\\sum_{k=1}^n k^3 = \\dfrac{(n+1)^2}{4n^2} \\;\\xrightarrow{n\\to\\infty}\\; \\dfrac{1}{4}',
    xr: [-0.15, 1.15],
    yr: [-0.1, 1.2],
  },
];

export function ExactAreaLimitWidget() {
  const [ai, setAi] = useState(0);
  const [n, setN] = useState(10);
  const ex = AREA_EX[ai];
  const dx = (ex.b - ex.a) / n;
  let sn = 0;
  for (let k = 1; k <= n; k++) sn += ex.f(ex.a + k * dx) * dx;
  const err = Math.abs(sn - ex.exact);

  return (
    <div className="widget">
      <div className="widget-title">Véges összegek határértéke (jobb oldali téglalapok, n → ∞)</div>
      <div className="relbuttons chips">
        {AREA_EX.map((q, i) => (
          <button key={q.id} className={ai === i ? 'on' : ''} onClick={() => setAi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <label>
        téglalapok száma: n = {n} (szélesség: Δx = {round(dx, 4)})
        <input type="range" min={2} max={80} step={2} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={235}>
        {(m) => (
          <>
            {Array.from({ length: n }, (_, idx) => {
              const x0 = ex.a + idx * dx;
              const x1 = x0 + dx;
              const h = ex.f(x1);
              return (
                <rect
                  key={idx}
                  x={m.X(x0)}
                  y={m.Y(Math.max(0, h))}
                  width={Math.max(1, m.X(x1) - m.X(x0))}
                  height={Math.abs(m.Y(h) - m.Y(0))}
                  fill="rgba(56, 189, 248, 0.28)"
                  stroke="#38bdf8"
                  strokeWidth={n > 35 ? 0.5 : 1.1}
                />
              );
            })}
            <path d={curve(ex.f, m, 300)} className="pl-alt" />
          </>
        )}
      </Chart>
      <div className="result">
        <M block t={ex.formulaTex} />
        <p>
          Aktuális összeg (<M t={`n=${n}`} />): <strong>{round(sn, 5)}</strong> · Pontos határérték: <M t={ex.exactTex} /> ≈ <strong>{round(ex.exact, 5)}</strong> · Eltérés: {round(err, 5)}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: előjeles Riemann-összeg és norma */

export function RiemannSignedWidget() {
  const [uneven, setUneven] = useState(true);
  const [sample, setSample] = useState<'left' | 'mid' | 'right'>('mid');

  const f: Fn = (x) => x * x - 1;
  const pts = uneven ? [0, 0.25, 0.7, 1.1, 1.6, 2.0] : [0, 0.4, 0.8, 1.2, 1.6, 2.0];

  let posSum = 0;
  let negSum = 0;
  let normP = 0;
  const bars = pts.slice(0, -1).map((x0, i) => {
    const x1 = pts[i + 1];
    const dx = x1 - x0;
    if (dx > normP) normP = dx;
    const ck = sample === 'left' ? x0 : sample === 'right' ? x1 : (x0 + x1) / 2;
    const val = f(ck);
    const area = val * dx;
    if (area >= 0) posSum += area;
    else negSum += area;
    return { x0, x1, ck, val };
  });
  const total = posSum + negSum;

  return (
    <div className="widget">
      <div className="widget-title">Riemann-összeg előjeles téglalapokkal: f(x) = x² − 1 a [0; 2]-n</div>
      <div className="relbuttons chips">
        <button className={!uneven ? 'on' : ''} onClick={() => setUneven(false)}>egyenletes felosztás</button>
        <button className={uneven ? 'on' : ''} onClick={() => setUneven(true)}>egyenetlen felosztás</button>
      </div>
      <div className="relbuttons chips">
        <button className={sample === 'left' ? 'on' : ''} onClick={() => setSample('left')}>bal végpont</button>
        <button className={sample === 'mid' ? 'on' : ''} onClick={() => setSample('mid')}>felezőpont</button>
        <button className={sample === 'right' ? 'on' : ''} onClick={() => setSample('right')}>jobb végpont</button>
      </div>
      <Chart xmin={-0.15} xmax={2.15} ymin={-1.4} ymax={3.4} h={235}>
        {(m) => (
          <>
            {bars.map((b, i) => {
              const pos = b.val >= 0;
              return (
                <g key={i}>
                  <rect
                    x={m.X(b.x0)}
                    y={pos ? m.Y(b.val) : m.Y(0)}
                    width={m.X(b.x1) - m.X(b.x0)}
                    height={Math.abs(m.Y(b.val) - m.Y(0))}
                    fill={pos ? 'rgba(52,211,153,0.3)' : 'rgba(251,146,60,0.32)'}
                    stroke={pos ? '#34d399' : '#fb923c'}
                    strokeWidth={1.5}
                  />
                  <circle cx={m.X(b.ck)} cy={m.Y(b.val)} r={3.5} fill="#fbbf24" />
                </g>
              );
            })}
            <path d={curve(f, m, 300)} className="pl-main" />
          </>
        )}
      </Chart>
      <p className="legend">Zöld: pozitív tagok (f(cₖ) &gt; 0). Narancs: negatív tagok (f(cₖ) &lt; 0). Sárga pontok: a választott cₖ mintapontok.</p>
      <div className="result">
        <M block t={`\\|P\\| = ${tx(normP, 2)},\\qquad S_P = \\underbrace{${tx(posSum, 3)}}_{+} \\underbrace{${tx(negSum, 3)}}_{-} = ${tx(total, 3)}`} />
        <p>
          A pontos előjeles integrál <M t="\frac{2}{3}\approx 0{,}667" /> (a tengely alatti <M t="-\frac{2}{3}" /> és a fölötti <M t="+\frac{4}{3}" /> nettó összege).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: miért ||P|| → 0, és nem elég n → ∞? */

export function NormTrapWidget() {
  const [n, setN] = useState(12);
  const f: Fn = (x) => 0.4 * x * x + 0.3;
  // n-1 darab sáv a [0; 1]-en, és 1 hatalmas sáv a [1; 2]-n!
  const leftN = Math.max(1, n - 1);
  const dxL = 1 / leftN;

  return (
    <div className="widget">
      <div className="widget-title">Csapda: n → ∞ még NEM garantálja, hogy ||P|| → 0!</div>
      <label>
        téglalapok száma: n = {n} (bal fél: {leftN} apró sáv, jobb fél: 1 hatalmas sáv, ||P|| = 1!)
        <input type="range" min={3} max={40} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <Chart xmin={-0.1} xmax={2.15} ymin={-0.1} ymax={2.2} h={210}>
        {(m) => (
          <>
            {Array.from({ length: leftN }, (_, i) => {
              const x0 = i * dxL;
              const h = f(x0 + dxL);
              return (
                <rect
                  key={i}
                  x={m.X(x0)}
                  y={m.Y(h)}
                  width={Math.max(1, m.X(x0 + dxL) - m.X(x0))}
                  height={m.Y(0) - m.Y(h)}
                  fill="rgba(56,189,248,0.28)"
                  stroke="#38bdf8"
                  strokeWidth={0.8}
                />
              );
            })}
            {/* A jobb oldali óriási sáv */}
            <rect
              x={m.X(1)}
              y={m.Y(f(2))}
              width={m.X(2) - m.X(1)}
              height={m.Y(0) - m.Y(f(2))}
              fill="rgba(248,113,113,0.3)"
              stroke="#f87171"
              strokeWidth={2}
            />
            <path d={curve(f, m, 300)} className="pl-alt" />
          </>
        )}
      </Chart>
      <div className="result verdict no">
        <p>
          Bár <M t={`n=${n}`} /> egyre nő, a piros jobb oldali sáv szélessége mindig <strong>1</strong> marad (<M t="\|P\|=1\not\to 0" />), ezért a közelítés hibája soha nem tűnik el! Ezért írjuk elő a pontos elméletben, hogy <strong><M t="\|P\|\to 0" /></strong>!
        </p>
      </div>
    </div>
  );
}
