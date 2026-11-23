import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

function buildPath(
  fn: (x: number) => number,
  xmin: number,
  xmax: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
  steps = 160,
) {
  let d = '';
  let pen = false;
  for (let i = 0; i <= steps; i++) {
    const x = xmin + ((xmax - xmin) * i) / steps;
    const y = fn(x);
    if (!Number.isFinite(y)) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
    pen = true;
  }
  return d;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Növekedési verseny grafikon */

export function GrowthRaceWidget() {
  const [xmax, setXmax] = useState(5.0);
  const ymax = Math.min(220, Math.max(12, Math.exp(xmax) * 0.45));

  return (
    <div className="widget">
      <div className="widget-title">A nagy növekedési verseny: ln x vs. x vs. x² vs. 2ˣ vs. eˣ</div>
      <label>
        Vizsgált tartomány vége: <M t={`x_{\\max} = ${tx(xmax, 1)}`} /> (húzd jobbra, és nézd, ki nyer!)
        <input type="range" min={2.5} max={8.0} step={0.5} value={xmax} onChange={(e) => setXmax(Number(e.target.value))} />
      </label>

      <Chart xmin={0.2} xmax={xmax} ymin={0} ymax={ymax} h={215}>
        {(m) => (
          <>
            <path d={buildPath((x) => Math.log(x), 0.3, xmax, m.X, m.Y, 120)} fill="none" stroke="#94a3b8" strokeWidth={2.2} />
            <path d={buildPath((x) => x, 0.2, xmax, m.X, m.Y, 60)} fill="none" stroke="#fbbf24" strokeWidth={2.2} />
            <path d={buildPath((x) => x * x, 0.2, xmax, m.X, m.Y, 120)} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
            <path d={buildPath((x) => 2 ** x, 0.2, xmax, m.X, m.Y, 120)} fill="none" stroke="#34d399" strokeWidth={2.5} />
            <path d={buildPath((x) => Math.exp(x), 0.2, xmax, m.X, m.Y, 140)} fill="none" stroke="#f472b6" strokeWidth={2.7} />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <M t={`x = ${tx(xmax, 1)}`} />-nél:{' '}
          <span style={{ color: '#cbd5e1' }}>ln x = {round(Math.log(xmax), 2)}</span> ·{' '}
          <span style={{ color: '#fde68a' }}>x = {round(xmax, 1)}</span> ·{' '}
          <span style={{ color: '#7dd3fc' }}>x² = {round(xmax * xmax, 1)}</span> ·{' '}
          <span style={{ color: '#6ee7b7' }}>2ˣ = {round(2 ** xmax, 1)}</span> ·{' '}
          <span style={{ color: '#f9a8d4', fontWeight: 700 }}>eˣ = {round(Math.exp(xmax), 1)}</span>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Növekedési ranglétra */

export function GrowthHierarchyLadderDiagram() {
  const tiers = [
    { label: 'Konstans', ex: '1,  5,  1000', color: '#94a3b8', w: 72 },
    { label: 'Logaritmikus', ex: 'ln(ln x)  ≪  ln x  ≈  log₂ x  ≪  (ln x)²', color: '#38bdf8', w: 145 },
    { label: 'Gyök / Hatvány', ex: 'x¹/¹⁰  ≪  √x  ≪  x  ≪  x ln x  ≪  x²  ≪  xⁿ', color: '#34d399', w: 235 },
    { label: 'Exponenciális', ex: '1,1ˣ  ≪  2ˣ  ≪  eˣ  ≪  3ˣ  ≪  10ˣ', color: '#fbbf24', w: 335 },
    { label: 'Szuperexponenciális', ex: 'xˣ  ≪  e^(x²)', color: '#f472b6', w: 420 },
  ];

  return (
    <div className="widget">
      <div className="widget-title">A növekedési ütemek ranglétrája (x → ∞) — fentről lefelé egyre gyorsabb!</div>
      <svg viewBox="0 0 560 198" className="plane" role="img" aria-label="Növekedési ütemek hierarchiája konstansoktól a szuperexponenciálisig">
        <rect width={560} height={198} className="pl-bg" />
        {tiers.map((t, i) => {
          const y = 14 + i * 36;
          return (
            <g key={t.label}>
              <rect x={14} y={y} width={118} height={28} rx={6} fill="#0f172a" stroke={t.color} strokeWidth={1.6} />
              <text x={73} y={y + 18} textAnchor="middle" fill={t.color} fontSize={10.5} fontWeight={700}>{t.label}</text>
              <rect x={140} y={y} width={t.w * 0.96} height={28} rx={6} fill="rgba(15,23,42,0.85)" stroke={t.color} strokeWidth={1.2} />
              <text x={150} y={y + 18} fill="#e2e8f0" fontSize={11}>{t.ex}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): f(x)/g(x) hányados viselkedése */

type RatioKind = 'inf' | 'zero' | 'one' | 'four';

export function RatioConvergenceWidget() {
  const [kind, setKind] = useState<RatioKind>('four');

  const cfg =
    kind === 'inf'
      ? {
          title: 'f(x)/g(x) = eˣ / x² → ∞ (eˣ gyorsabb!)',
          fn: (x: number) => Math.exp(x) / (x * x),
          xmin: 1,
          xmax: 7,
          ymin: 0,
          ymax: 25,
          asym: null as number | null,
          color: '#f472b6',
          note: 'A hányados minden korlát fölé nő ⇒ eˣ gyorsabban növekszik, mint x²!',
        }
      : kind === 'zero'
      ? {
          title: 'f(x)/g(x) = ln x / √x → 0 (ln x lassabb!)',
          fn: (x: number) => Math.log(x) / Math.sqrt(x),
          xmin: 1,
          xmax: 40,
          ymin: 0,
          ymax: 0.9,
          asym: 0,
          color: '#38bdf8',
          note: 'A hányados 0-hoz tart ⇒ ln x lassabban növekszik, mint √x (ln x = o(√x))!',
        }
      : kind === 'one'
      ? {
          title: 'f(x)/g(x) = √(x² + 5) / x → 1 (azonos ütem!)',
          fn: (x: number) => Math.sqrt(x * x + 5) / x,
          xmin: 0.8,
          xmax: 15,
          ymin: 0,
          ymax: 3.0,
          asym: 1,
          color: '#34d399',
          note: 'A hányados a véges, pozitív L = 1 számhoz tart ⇒ azonos növekedési ütem!',
        }
      : {
          title: 'f(x)/g(x) = (2√x − 1)² / x → 4 (azonos ütem!)',
          fn: (x: number) => ((2 * Math.sqrt(x) - 1) ** 2) / x,
          xmin: 1,
          xmax: 25,
          ymin: 0,
          ymax: 4.8,
          asym: 4,
          color: '#fbbf24',
          note: 'A hányados a véges, pozitív L = 4 számhoz tart ⇒ (2√x − 1)² és x azonos ütemben nőnek!',
        };

  return (
    <div className="widget">
      <div className="widget-title">A hányados-teszt (f(x) / g(x)) három lehetséges kimenetele, ha x → ∞</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'inf' ? 'on' : ''} onClick={() => setKind('inf')}>eˣ / x² → ∞</button>
        <button type="button" className={kind === 'zero' ? 'on' : ''} onClick={() => setKind('zero')}>ln x / √x → 0</button>
        <button type="button" className={kind === 'one' ? 'on' : ''} onClick={() => setKind('one')}>√(x²+5) / x → 1</button>
        <button type="button" className={kind === 'four' ? 'on' : ''} onClick={() => setKind('four')}>(2√x−1)² / x → 4</button>
      </div>

      <Chart xmin={cfg.xmin} xmax={cfg.xmax} ymin={cfg.ymin} ymax={cfg.ymax} h={195}>
        {(m) => (
          <>
            {cfg.asym !== null && (
              <line
                x1={m.X(cfg.xmin)}
                y1={m.Y(cfg.asym)}
                x2={m.X(cfg.xmax)}
                y2={m.Y(cfg.asym)}
                stroke="#94a3b8"
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
            )}
            <path d={buildPath(cfg.fn, cfg.xmin, cfg.xmax, m.X, m.Y, 160)} fill="none" stroke={cfg.color} strokeWidth={2.6} />
          </>
        )}
      </Chart>

      <div className="result">
        <p><strong>{cfg.title}:</strong> {cfg.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Nagy ordó (Big-O) burokgörbe */

export function BigOEnvelopeWidget() {
  const [Mval, setMval] = useState(1.8);
  // f(x) = x^2 + 3x + 4 vs M * x^2
  // (M - 1) x^2 - 3x - 4 = 0 -> x0 = (3 + sqrt(9 + 16(M-1))) / (2(M-1))
  const hasX0 = Mval > 1.001;
  const x0 = hasX0 ? (3 + Math.sqrt(9 + 16 * (Mval - 1))) / (2 * (Mval - 1)) : Number.POSITIVE_INFINITY;

  return (
    <div className="widget">
      <div className="widget-title">Mit jelent a „Nagy ordó” (f = O(g))? — Keress M és x₀ korlátot x² + 3x + 4 ≤ M·x²-hez!</div>
      <label>
        Választott szorzókonstans: <M t={`M = ${tx(Mval, 2)}`} />{' '}
        {hasX0 ? (
          <>(innen már végig felette van: <M t={`x_0 \\approx ${tx(x0, 2)}`} />)</>
        ) : (
          <>(M ≤ 1-gyel SOHA nem fogja felülmúlni!)</>
        )}
        <input type="range" min={0.8} max={3.5} step={0.1} value={Mval} onChange={(e) => setMval(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={8.5} ymin={0} ymax={110} h={205}>
        {(m) => (
          <>
            <path d={buildPath((x) => x * x + 3 * x + 4, 0, 8.5, m.X, m.Y, 140)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
            <path
              d={buildPath((x) => Mval * x * x, 0, 8.5, m.X, m.Y, 140)}
              fill="none"
              stroke={hasX0 ? '#34d399' : '#f87171'}
              strokeWidth={2.4}
              strokeDasharray="6 3"
            />
            {hasX0 && x0 <= 8.5 && (
              <>
                <line x1={m.X(x0)} y1={m.Y(0)} x2={m.X(x0)} y2={m.Y(Mval * x0 * x0)} stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="4 3" />
                <circle cx={m.X(x0)} cy={m.Y(Mval * x0 * x0)} r={5.2} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
              </>
            )}
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék:</strong> <M t="f(x) = x^2 + 3x + 4" /> · <strong>Szaggatott:</strong> <M t={`M x^2 = ${tx(Mval, 1)}x^2`} />.{' '}
          {hasX0
            ? `Minden x ≥ ${round(x0, 2)} esetén f(x) ≤ ${round(Mval, 1)}·x² ⇒ x² + 3x + 4 = O(x²) ✓`
            : 'Növeld M-et 1 fölé, hogy a zöld burokgörbe lehagyja f(x)-et!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Szekvenciális vs. bináris keresés */

export function BinaryVsLinearSearchWidget() {
  const [n, setN] = useState(26000);
  const binSteps = Math.ceil(Math.log2(n));

  const presets = [
    { label: '1 000', val: 1000 },
    { label: '26 000 (Thomas)', val: 26000 },
    { label: '450 000 (szótár)', val: 450000 },
    { label: '1 000 000', val: 1000000 },
    { label: '1 000 000 000', val: 1000000000 },
  ];

  return (
    <div className="widget">
      <div className="widget-title">Szekvenciális keresés O(n) vs. Bináris keresés O(log₂ n) — élő lépésszám-összehasonlítás</div>
      <div className="relbuttons chips">
        {presets.map((p) => (
          <button key={p.val} type="button" className={n === p.val ? 'on' : ''} onClick={() => setN(p.val)}>
            n = {p.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Szekvenciális és bináris keresés lépésszáma">
        <rect width={560} height={132} className="pl-bg" />

        {/* Szekvenciális */}
        <text x={18} y={32} fill="#fca5a5" fontSize={12} fontWeight={700}>
          Szekvenciális keresés — O(n): legfeljebb {n.toLocaleString('hu-HU')} lépés
        </text>
        <rect x={18} y={40} width={524} height={20} rx={5} fill="rgba(248,113,113,0.35)" stroke="#f87171" strokeWidth={1.6} />

        {/* Bináris */}
        <text x={18} y={86} fill="#6ee7b7" fontSize={12} fontWeight={700}>
          Bináris keresés — O(log₂ n): legfeljebb {binSteps} lépés!  (⌈log₂({n.toLocaleString('hu-HU')})⌉ = {binSteps})
        </text>
        <rect
          x={18}
          y={94}
          width={Math.max(10, (binSteps / 32) * 80)}
          height={20}
          rx={5}
          fill="rgba(52,211,153,0.55)"
          stroke="#34d399"
          strokeWidth={1.6}
        />
        <text x={115} y={109} fill="#fde68a" fontSize={11.5} fontWeight={700}>
          {Math.round(n / binSteps).toLocaleString('hu-HU')}× gyorsabb a legrosszabb esetben!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Algoritmus-bonyolultságok */

export function AlgorithmComplexityWidget() {
  const [n, setN] = useState(20);
  const rows = [
    { name: 'O(log₂ n)', val: Math.log2(n), color: '#34d399' },
    { name: 'O(n)', val: n, color: '#38bdf8' },
    { name: 'O(n log₂ n)', val: n * Math.log2(n), color: '#a78bfa' },
    { name: 'O(n¹·⁵)', val: n ** 1.5, color: '#fbbf24' },
    { name: 'O(n²)', val: n * n, color: '#fb923c' },
    { name: 'O(2ⁿ)', val: 2 ** n, color: '#f87171' },
  ];

  return (
    <div className="widget">
      <div className="widget-title">Algoritmusok futási lépésszáma n függvényében — miért végzetes az O(2ⁿ)?</div>
      <label>
        Bemenet mérete: <strong>n = {n}</strong>
        <input type="range" min={4} max={30} step={2} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>

      <div className="result">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {rows.map((r) => (
            <div key={r.name} style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: `1px solid ${r.color}` }}>
              <div style={{ color: r.color, fontWeight: 700, fontSize: 12 }}>{r.name}</div>
              <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 700 }}>
                {r.val > 1e6 ? `${round(r.val / 1e6, 2)} millió` : Math.round(r.val).toLocaleString('hu-HU')}
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 8 }}>
          Láthatod: már <strong>n = 30</strong> elemnél az <M t="O(2^n)" /> több mint <strong>1 milliárd</strong> lépés, míg az{' '}
          <M t="O(n\log_2 n)" /> mindössze <strong>147</strong>!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Döntési fa L = lim f/g */

export function LimitDecisionTreeDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Gyors döntési fa: számítsd ki L = lim (f(x) / g(x)) értékét, ha x → ∞!</div>
      <svg viewBox="0 0 560 142" className="plane" role="img" aria-label="Döntési fa a határérték három esetére">
        <rect width={560} height={142} className="pl-bg" />

        <rect x={180} y={10} width={200} height={32} rx={7} fill="#1e293b" stroke="#94a3b8" strokeWidth={1.5} />
        <text x={280} y={30} textAnchor="middle" fill="#f8fafc" fontSize={12} fontWeight={700}>L = lim (f(x) / g(x))</text>

        {/* Ágak */}
        <line x1={220} y1={42} x2={96} y2={68} stroke="#38bdf8" strokeWidth={1.8} />
        <line x1={280} y1={42} x2={280} y2={68} stroke="#34d399" strokeWidth={1.8} />
        <line x1={340} y1={42} x2={464} y2={68} stroke="#f472b6" strokeWidth={1.8} />

        {/* Bal: L = 0 */}
        <rect x={12} y={68} width={168} height={64} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={96} y={88} textAnchor="middle" fill="#38bdf8" fontSize={12} fontWeight={700}>L = 0</text>
        <text x={96} y={106} textAnchor="middle" fill="#e2e8f0" fontSize={11}>f lassabb, mint g</text>
        <text x={96} y={124} textAnchor="middle" fill="#7dd3fc" fontSize={11} fontWeight={700}>f = o(g)  és  f = O(g)</text>

        {/* Közép: 0 < L < inf */}
        <rect x={196} y={68} width={168} height={64} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={280} y={88} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight={700}>0 &lt; L &lt; ∞</text>
        <text x={280} y={106} textAnchor="middle" fill="#e2e8f0" fontSize={11}>azonos ütem!</text>
        <text x={280} y={124} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={700}>f = O(g)  és  g = O(f)</text>

        {/* Jobb: L = inf */}
        <rect x={380} y={68} width={168} height={64} rx={8} fill="#0f172a" stroke="#f472b6" strokeWidth={1.6} />
        <text x={464} y={88} textAnchor="middle" fill="#f472b6" fontSize={12} fontWeight={700}>L = ∞</text>
        <text x={464} y={106} textAnchor="middle" fill="#e2e8f0" fontSize={11}>f gyorsabb, mint g</text>
        <text x={464} y={124} textAnchor="middle" fill="#f9a8d4" fontSize={11} fontWeight={700}>g = o(f)  és  g = O(f)</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): ln x vs x^(1/k) lassú előzés */

export function LogVsRootCrossoverWidget() {
  const [k, setK] = useState(3);
  const xmax = k === 2 ? 20 : k === 3 ? 110 : 600;
  const ymax = Math.log(xmax) * 1.25;

  return (
    <div className="widget">
      <div className="widget-title">A „lassú előzés” csapdája: ln x vs. x¹/ᵏ — a gyökfüggvény MINDIG nyer, de néha későn!</div>
      <div className="relbuttons chips">
        <button type="button" className={k === 2 ? 'on' : ''} onClick={() => setK(2)}>√x = x¹/² (mindig felette!)</button>
        <button type="button" className={k === 3 ? 'on' : ''} onClick={() => setK(3)}>∛x = x¹/³ (x ≈ 93-nál előz!)</button>
        <button type="button" className={k === 4 ? 'on' : ''} onClick={() => setK(4)}>⁴√x = x¹/⁴ (x ≈ 5 500-nál előz!)</button>
      </div>

      <Chart xmin={1} xmax={xmax} ymin={0} ymax={ymax} h={195}>
        {(m) => (
          <>
            <path d={buildPath((x) => Math.log(x), 1, xmax, m.X, m.Y, 160)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            <path d={buildPath((x) => x ** (1 / k), 1, xmax, m.X, m.Y, 160)} fill="none" stroke="#fbbf24" strokeWidth={2.5} />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék:</strong> <M t="\ln x" /> · <strong>Sárga:</strong> <M t={`x^{1/${k}}`} />.{' '}
          {k === 2 && 'A négyzetgyök minden x > 0-ra nagyobb ln x-nél.'}
          {k === 3 && 'Kis x-eken ln x vezet, de x ≈ 93,4-nél ∛x átveszi a vezetést és végleg elhúz!'}
          {k === 4 && 'Ebben az ablakban még ln x van felül — de x ≈ 5 503-nál a negyedik gyök is megelőzi!'}
        </p>
      </div>
    </div>
  );
}
