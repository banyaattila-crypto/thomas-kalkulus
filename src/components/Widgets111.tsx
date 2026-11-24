import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 3) => v.toFixed(d).replace('.', ',').replace('-0,000', '0,000');

/* -------------------------------------------------------------------------- */
/* 1. SequencePlotterWidget: 4 klasszikus sorozat grafikonja                  */
/* -------------------------------------------------------------------------- */
const SEQ_PRESETS = [
  {
    name: 'n / (n + 1)',
    fn: (n: number) => n / (n + 1),
    L: 1 as number | null,
    yMin: 0,
    yMax: 1.25,
    desc: 'Monoton nő és alulról simul az L = 1 határértékhez (konvergens).',
  },
  {
    name: '(−1)ⁿ⁺¹ / n',
    fn: (n: number) => (n % 2 === 1 ? 1 : -1) / n,
    L: 0 as number | null,
    yMin: -1.1,
    yMax: 1.15,
    desc: 'Váltakozó előjellel (alternálva) tart az L = 0 határértékhez (konvergens).',
  },
  {
    name: '(−1)ⁿ',
    fn: (n: number) => (n % 2 === 0 ? 1 : -1),
    L: null as number | null,
    yMin: -1.4,
    yMax: 1.4,
    desc: 'Korlátos, de két érték (−1 és +1) között ugrál: oszcillálva divergens!',
  },
  {
    name: '√n',
    fn: (n: number) => Math.sqrt(n),
    L: null as number | null,
    yMin: 0,
    yMax: 5,
    desc: 'Lassan, de minden határon túl növekszik (+∞-be divergens).',
  },
];

export function SequencePlotterWidget() {
  const [idx, setIdx] = useState(0);
  const [nMax, setNMax] = useState(16);
  const s = SEQ_PRESETS[idx];

  const W = 540;
  const H = 245;
  const ox = 46;
  const xEnd = W - 22;
  const yTop = 22;
  const yBot = H - 30;
  const X = (n: number) => ox + ((n - 1) / Math.max(1, nMax - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((v - s.yMin) / (s.yMax - s.yMin)) * (yBot - yTop);
  const y0 = Y(0);

  const pts = Array.from({ length: nMax }, (_, i) => ({ n: i + 1, v: s.fn(i + 1) }));
  const last = pts[pts.length - 1];

  return (
    <div className="widget">
      <div className="widget-title">Sorozatok grafikonja: diszkrét pontok az (n, aₙ) síkon</div>
      <div className="relbuttons chips">
        {SEQ_PRESETS.map((p, i) => (
          <button key={p.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            aₙ = {p.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          megjelenített tagok száma: n = 1 … {nMax} (a_{nMax} = {fmt(last.v, 3)})
          <input type="range" min={6} max={24} step={1} value={nMax} onChange={(e) => setNMax(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {y0 >= yTop && y0 <= yBot && <line x1={ox} y1={y0} x2={xEnd + 8} y2={y0} className="pl-axis" />}
        <line x1={ox} y1={yTop - 6} x2={ox} y2={yBot + 6} className="pl-axis" />

        {s.L !== null && (
          <>
            <line x1={ox} y1={Y(s.L)} x2={xEnd} y2={Y(s.L)} className="pl-dash" />
            <text x={xEnd} y={Y(s.L) - 7} textAnchor="end" className="pl-label" fill="#fbbf24">
              L = {s.L}
            </text>
          </>
        )}

        {pts.map((p) => (
          <g key={p.n}>
            <line x1={X(p.n)} y1={Math.min(yBot, Math.max(yTop, y0))} x2={X(p.n)} y2={Y(p.v)} stroke="rgba(56,189,248,0.25)" strokeWidth={1.4} />
            <circle cx={X(p.n)} cy={Y(p.v)} r={4.2} fill={s.L !== null ? '#38bdf8' : '#fb923c'} />
          </g>
        ))}

        <text x={ox} y={H - 8} className="pl-tick">
          n = 1
        </text>
        <text x={xEnd} y={H - 8} textAnchor="end" className="pl-tick">
          n = {nMax}
        </text>
      </svg>
      <div className="explain">
        <p>{s.desc}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. EpsilonNWidget: ε-sáv és N küszöbindex aₙ = 1 + (-1)ⁿ / n sorozaton     */
/* -------------------------------------------------------------------------- */
export function EpsilonNWidget() {
  const [eps, setEps] = useState(0.2);
  const N = Math.floor(1 / eps) + 1;
  const maxN = 22;

  const W = 540;
  const H = 250;
  const ox = 46;
  const xEnd = W - 20;
  const yTop = 20;
  const yBot = H - 30;
  const X = (n: number) => ox + ((n - 1) / (maxN - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((v - 0) / 2.15) * (yBot - yTop);

  const pts = Array.from({ length: maxN }, (_, i) => {
    const n = i + 1;
    return { n, v: 1 + (n % 2 === 0 ? 1 : -1) / n };
  });

  return (
    <div className="widget">
      <div className="widget-title">Az ε–N definíció élőben: aₙ = 1 + (−1)ⁿ / n → L = 1</div>
      <div className="sliders">
        <label>
          hibasáv sugara ε = {fmt(eps, 2)} → küszöbindex N = {N} (minden n ≥ {N} bent van!)
          <input type="range" min={0.06} max={0.5} step={0.02} value={eps} onChange={(e) => setEps(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {/* ε-sáv */}
        <rect x={ox} y={Y(1 + eps)} width={xEnd - ox} height={Y(1 - eps) - Y(1 + eps)} className="band-eps" />
        <line x1={ox} y1={Y(1 + eps)} x2={xEnd} y2={Y(1 + eps)} stroke="#fb923c" strokeWidth={1.2} strokeDasharray="4 4" />
        <line x1={ox} y1={Y(1 - eps)} x2={xEnd} y2={Y(1 - eps)} stroke="#fb923c" strokeWidth={1.2} strokeDasharray="4 4" />
        <line x1={ox} y1={Y(1)} x2={xEnd} y2={Y(1)} stroke="#34d399" strokeWidth={1.8} />

        {/* N függőleges határvonal */}
        {N <= maxN && (
          <>
            <line x1={X(N)} y1={yTop} x2={X(N)} y2={yBot} stroke="#38bdf8" strokeWidth={1.8} strokeDasharray="5 4" />
            <text x={X(N) + 5} y={yTop + 14} className="pl-label" fill="#38bdf8">
              N = {N}
            </text>
          </>
        )}

        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />

        {pts.map((p) => {
          const inside = p.n >= N;
          return <circle key={p.n} cx={X(p.n)} cy={Y(p.v)} r={4.2} fill={inside ? '#34d399' : '#fb923c'} />;
        })}

        <text x={ox - 6} y={Y(1) + 4} textAnchor="end" className="pl-tick">
          1
        </text>
        <text x={ox - 6} y={Y(1 + eps) + 4} textAnchor="end" className="pl-tick">
          1+ε
        </text>
        <text x={ox - 6} y={Y(1 - eps) + 4} textAnchor="end" className="pl-tick">
          1−ε
        </text>
      </svg>
      <div className="explain">
        <p>
          Bármilyen keskenyre húzod az <M t="\varepsilon" /> sávot, mindig létezik egy <M t="N" /> index (itt{' '}
          <M t={`N = \\lfloor 1/\\varepsilon \\rfloor + 1 = ${N}`} />), amelytől kezdve <strong>minden</strong> zöld pont
          a sáv belsejében marad: <M t="|a_n - 1| = \tfrac{1}{n} < \varepsilon" />!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. SqueezeSequenceWidget: -1/n <= cos(n)/n <= 1/n szendvicstétel           */
/* -------------------------------------------------------------------------- */
export function SqueezeSequenceWidget() {
  const [nMax, setNMax] = useState(20);
  const W = 540;
  const H = 240;
  const ox = 42;
  const xEnd = W - 20;
  const cy = H / 2;
  const scY = 92;
  const X = (n: number) => ox + ((n - 1) / (nMax - 1)) * (xEnd - ox);
  const Y = (v: number) => cy - v * scY;

  const upper: string[] = [];
  const lower: string[] = [];
  const pts = Array.from({ length: nMax }, (_, i) => {
    const n = i + 1;
    upper.push(`${i ? 'L' : 'M'}${X(n).toFixed(1)},${Y(1 / n).toFixed(1)}`);
    lower.push(`${i ? 'L' : 'M'}${X(n).toFixed(1)},${Y(-1 / n).toFixed(1)}`);
    return { n, v: Math.cos(n) / n };
  });

  return (
    <div className="widget">
      <div className="widget-title">Szendvicstétel sorozatokra: −1/n ≤ cos(n)/n ≤ +1/n → 0</div>
      <div className="sliders">
        <label>
          tagok száma n = 1 … {nMax}
          <input type="range" min={8} max={32} step={2} value={nMax} onChange={(e) => setNMax(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={cy} x2={xEnd} y2={cy} className="pl-axis" />
        <line x1={ox} y1={14} x2={ox} y2={H - 14} className="pl-axis" />

        <path d={upper.join(' ')} stroke="#38bdf8" strokeWidth={2} strokeDasharray="5 4" fill="none" />
        <path d={lower.join(' ')} stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 4" fill="none" />

        {pts.map((p) => (
          <circle key={p.n} cx={X(p.n)} cy={Y(p.v)} r={4} fill="#34d399" />
        ))}

        <text x={W - 14} y={26} textAnchor="end" className="pl-label" fill="#38bdf8">
          +1/n → 0
        </text>
        <text x={W - 14} y={H - 14} textAnchor="end" className="pl-label" fill="#fbbf24">
          −1/n → 0
        </text>
      </svg>
      <div className="explain">
        <p>
          Bár <M t="\cos n" /> rendszertelenül ugrál <M t="[-1;\,1]" />-ben, a két „szendvicskenyér” (<M t="\pm 1/n" />)
          összenyomja a zöld <M t="\cos(n)/n" /> sorozatot pontosan a <M t="0" /> határértékbe!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. FamousLimitsWidget: a 6 nevezetes sorozat-határérték                    */
/* -------------------------------------------------------------------------- */
const FAMOUS = [
  { name: 'ln(n) / n → 0', fn: (n: number) => Math.log(n) / n, L: 0, yMax: 0.5 },
  { name: 'n^(1/n) → 1', fn: (n: number) => Math.pow(n, 1 / n), L: 1, yMax: 1.6 },
  { name: '5^(1/n) → 1', fn: (n: number) => Math.pow(5, 1 / n), L: 1, yMax: 5.2 },
  { name: '0,8ⁿ → 0', fn: (n: number) => Math.pow(0.8, n), L: 0, yMax: 1.0 },
  { name: '(1 + 1/n)ⁿ → e', fn: (n: number) => Math.pow(1 + 1 / n, n), L: Math.E, yMax: 3.0 },
  {
    name: '3ⁿ / n! → 0',
    fn: (n: number) => {
      let f = 1;
      for (let i = 2; i <= n; i++) f *= i;
      return Math.pow(3, n) / f;
    },
    L: 0,
    yMax: 5.0,
  },
];

export function FamousLimitsWidget() {
  const [idx, setIdx] = useState(4);
  const item = FAMOUS[idx];
  const N = 20;

  const W = 540;
  const H = 235;
  const ox = 46;
  const xEnd = W - 20;
  const yTop = 20;
  const yBot = H - 28;
  const X = (n: number) => ox + ((n - 1) / (N - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / item.yMax) * (yBot - yTop);

  const vals = Array.from({ length: N }, (_, i) => ({ n: i + 1, v: item.fn(i + 1) }));

  return (
    <div className="widget">
      <div className="widget-title">A hat nevezetes sorozat-határérték élőben (n = 1 … 20)</div>
      <div className="relbuttons chips">
        {FAMOUS.map((f, i) => (
          <button key={f.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {f.name}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />

        <line x1={ox} y1={Y(item.L)} x2={xEnd} y2={Y(item.L)} className="pl-dash" />
        <text x={xEnd} y={Math.max(yTop + 14, Y(item.L) - 6)} textAnchor="end" className="pl-label" fill="#fbbf24">
          L = {fmt(item.L, 4)}
        </text>

        {vals.map((p) => (
          <circle key={p.n} cx={X(p.n)} cy={Y(Math.min(item.yMax, p.v))} r={4} fill="#38bdf8" />
        ))}
      </svg>
      <div className="explain">
        <p>
          20. tag: <M t={`a_{20} \\approx ${fmt(vals[N - 1].v, 4)}`} />, pontos határérték:{' '}
          <M t={`L = ${fmt(item.L, 4)}`} />.{' '}
          {idx === 5 && 'Figyeld meg: a 3ⁿ/n! előbb 4,5-ig nő (n=3), aztán a faktoriális könyörtelenül lenullázza!'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. GrowthHierarchyWidget: ln n << n² << 2ⁿ << n! log-skálás verseny        */
/* -------------------------------------------------------------------------- */
export function GrowthHierarchyWidget() {
  const [n, setN] = useState(8);
  let fact = 1;
  for (let i = 2; i <= n; i++) fact *= i;

  const bars = [
    { lbl: 'ln n', val: Math.log(n), col: '#38bdf8' },
    { lbl: 'n²', val: n * n, col: '#34d399' },
    { lbl: '2ⁿ', val: Math.pow(2, n), col: '#fbbf24' },
    { lbl: 'n!', val: fact, col: '#fb923c' },
  ];
  const maxLog = Math.log10(Math.max(10, fact));

  return (
    <div className="widget">
      <div className="widget-title">Növekedési verseny (logaritmikus skálán): ln n ≪ n² ≪ 2ⁿ ≪ n!</div>
      <div className="sliders">
        <label>
          n = {n}
          <input type="range" min={3} max={12} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox="0 0 540 165">
        <rect width={540} height={165} className="pl-bg" />
        {bars.map((b, i) => {
          const y = 20 + i * 34;
          const w = Math.max(8, (Math.log10(Math.max(1.2, b.val)) / maxLog) * 330);
          return (
            <g key={b.lbl}>
              <text x={54} y={y + 16} textAnchor="end" className="pl-label" fill={b.col}>
                {b.lbl}
              </text>
              <rect x={64} y={y + 2} width={w} height={20} rx={6} fill={b.col} opacity={0.82} />
              <text x={72 + w} y={y + 16} className="pl-tick">
                {b.val > 9999 ? b.val.toExponential(2).replace('.', ',') : fmt(b.val, 1)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. RecursiveSequenceWidget: rekurzív sorozatok konvergenciája              */
/* -------------------------------------------------------------------------- */
const REC_PRESETS = [
  {
    name: 'Hérón √2: aₙ₊₁ = ½(aₙ + 2/aₙ)',
    gen: () => {
      const a = [3];
      for (let i = 1; i < 8; i++) a.push(0.5 * (a[i - 1] + 2 / a[i - 1]));
      return a;
    },
    L: Math.SQRT2,
    yMin: 1,
    yMax: 3.1,
    note: 'Már az 5. lépésben 10 tizedesjegyre pontosan megadja √2 ≈ 1,4142 értékét!',
  },
  {
    name: 'Beágyazott gyök: aₙ₊₁ = √(2 + aₙ)',
    gen: () => {
      const a = [Math.SQRT2];
      for (let i = 1; i < 8; i++) a.push(Math.sqrt(2 + a[i - 1]));
      return a;
    },
    L: 2,
    yMin: 1.2,
    yMax: 2.15,
    note: 'Szigorúan növekszik és felülről korlátos (2), fixpontja L = √(2 + L) → L = 2.',
  },
  {
    name: 'Fibonacci-hányados: Fₙ₊₁ / Fₙ',
    gen: () => {
      const F = [1, 1];
      for (let i = 2; i < 10; i++) F.push(F[i - 1] + F[i - 2]);
      return F.slice(0, 8).map((_, i) => F[i + 1] / F[i]);
    },
    L: (1 + Math.sqrt(5)) / 2,
    yMin: 0.9,
    yMax: 2.1,
    note: 'Alternálva közelít az aranymetszéshez: φ = (1 + √5) / 2 ≈ 1,6180!',
  },
];

export function RecursiveSequenceWidget() {
  const [idx, setIdx] = useState(1);
  const [k, setK] = useState(6);
  const item = REC_PRESETS[idx];
  const vals = item.gen();

  const W = 540;
  const H = 220;
  const ox = 48;
  const xEnd = W - 22;
  const yTop = 20;
  const yBot = H - 28;
  const X = (i: number) => ox + (i / (vals.length - 1)) * (xEnd - ox);
  const Y = (v: number) => yBot - ((v - item.yMin) / (item.yMax - item.yMin)) * (yBot - yTop);

  return (
    <div className="widget">
      <div className="widget-title">Rekurzív sorozatok: az előző tagból születik a következő</div>
      <div className="relbuttons chips">
        {REC_PRESETS.map((r, i) => (
          <button key={r.name} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {r.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          lépések száma k = {k} (a_{k} = {fmt(vals[k - 1], 4)})
          <input type="range" min={1} max={8} step={1} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={Y(item.L)} x2={xEnd} y2={Y(item.L)} className="pl-dash" />
        <text x={xEnd} y={Y(item.L) - 7} textAnchor="end" className="pl-label" fill="#fbbf24">
          L ≈ {fmt(item.L, 4)}
        </text>

        {vals.slice(0, k).map((v, i) => (
          <g key={i}>
            {i > 0 && <line x1={X(i - 1)} y1={Y(vals[i - 1])} x2={X(i)} y2={Y(v)} stroke="rgba(52,211,153,0.4)" strokeWidth={1.8} />}
            <circle cx={X(i)} cy={Y(v)} r={5} fill="#34d399" />
          </g>
        ))}
      </svg>
      <div className="explain">
        <p>{item.note}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. MonotoneBoundedWidget: felső korlát M vs legkisebb felső korlát (sup)   */
/* -------------------------------------------------------------------------- */
export function MonotoneBoundedWidget() {
  const [Mval, setMval] = useState(3.6);
  // a_n = 3 - 2/n (növekvő, sup = 3)
  const W = 540;
  const H = 225;
  const ox = 44;
  const xEnd = W - 20;
  const yTop = 18;
  const yBot = H - 26;
  const X = (n: number) => ox + ((n - 1) / 17) * (xEnd - ox);
  const Y = (v: number) => yBot - (v / 4.2) * (yBot - yTop);

  const pts = Array.from({ length: 18 }, (_, i) => ({ n: i + 1, v: 3 - 2 / (i + 1) }));

  return (
    <div className="widget">
      <div className="widget-title">Weierstrass tétele: növekvő és felülről korlátos → konvergens (aₙ = 3 − 2/n)</div>
      <div className="sliders">
        <label>
          egy felső korlát M = {fmt(Mval, 2)} (a legkisebb felső korlát: sup = 3,00)
          <input type="range" min={3.0} max={4.0} step={0.1} value={Mval} onChange={(e) => setMval(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={ox} y1={yBot} x2={xEnd} y2={yBot} className="pl-axis" />
        <line x1={ox} y1={yTop} x2={ox} y2={yBot} className="pl-axis" />

        <line x1={ox} y1={Y(Mval)} x2={xEnd} y2={Y(Mval)} stroke="#fb923c" strokeWidth={1.8} strokeDasharray="6 4" />
        <text x={xEnd} y={Y(Mval) - 5} textAnchor="end" className="pl-label" fill="#fb923c">
          felső korlát M = {fmt(Mval, 1)}
        </text>

        <line x1={ox} y1={Y(3)} x2={xEnd} y2={Y(3)} stroke="#34d399" strokeWidth={2} />
        <text x={ox + 8} y={Y(3) - 6} className="pl-label" fill="#34d399">
          sup = L = 3 (legkisebb felső korlát!)
        </text>

        {pts.map((p) => (
          <circle key={p.n} cx={X(p.n)} cy={Y(p.v)} r={4} fill="#38bdf8" />
        ))}
      </svg>
      <div className="explain">
        <p>
          A sorozatnak végtelen sok felső korlátja van (minden <M t="M \ge 3" />), de a <strong>legkisebb felső
          korlát</strong> (<M t="\sup = 3" />) pontosan a határértéke!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. SequenceToolsSummaryDiagram: 4 eszköz sorozatok határértékéhez          */
/* -------------------------------------------------------------------------- */
export function SequenceToolsSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Eszköztár sorozatok határértékéhez (lim aₙ)</div>
      <svg className="plane" viewBox="0 0 540 135">
        <rect width={540} height={135} className="pl-bg" />

        <rect x={12} y={20} width={120} height={94} rx={11} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={72} y={44} textAnchor="middle" className="pl-label" fill="#38bdf8">
          1. Algebra
        </text>
        <text x={72} y={68} textAnchor="middle" className="pl-tick">
          legmagasabb
        </text>
        <text x={72} y={86} textAnchor="middle" className="pl-tick">
          hatvánnyal oszt
        </text>

        <rect x={144} y={20} width={120} height={94} rx={11} fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth={1.5} />
        <text x={204} y={44} textAnchor="middle" className="pl-label" fill="#34d399">
          2. Szendvics
        </text>
        <text x={204} y={68} textAnchor="middle" className="pl-tick">
          aₙ ≤ bₙ ≤ cₙ
        </text>
        <text x={204} y={86} textAnchor="middle" className="pl-tick">
          (sin n, (−1)ⁿ, n!)
        </text>

        <rect x={276} y={20} width={120} height={94} rx={11} fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={336} y={44} textAnchor="middle" className="pl-label" fill="#fbbf24">
          3. L'Hôpital
        </text>
        <text x={336} y={68} textAnchor="middle" className="pl-tick">
          f(x)-re áttérés
        </text>
        <text x={336} y={86} textAnchor="middle" className="pl-tick">
          (∞/∞, 1^∞, 0·∞)
        </text>

        <rect x={408} y={20} width={120} height={94} rx={11} fill="rgba(251,146,60,0.12)" stroke="#fb923c" strokeWidth={1.5} />
        <text x={468} y={44} textAnchor="middle" className="pl-label" fill="#fb923c">
          4. Weierstrass
        </text>
        <text x={468} y={68} textAnchor="middle" className="pl-tick">
          monoton +
        </text>
        <text x={468} y={86} textAnchor="middle" className="pl-tick">
          korlátos ⇒ konv.
        </text>
      </svg>
    </div>
  );
}
