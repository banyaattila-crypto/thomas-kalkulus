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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Parciális integrálás geometriája */

export function PartsAreaGeometryWidget() {
  const [u2, setU2] = useState(2.2);
  const u1 = 0.6;
  const v = (u: number) => 0.45 * u * u + 0.5;
  const v1 = v(u1);
  const v2 = v(u2);

  // ∫_{u1}^{u2} v(u) du = [0.15 u^3 + 0.5 u]
  const intVdu = 0.15 * (u2 ** 3 - u1 ** 3) + 0.5 * (u2 - u1);
  const rectDiff = u2 * v2 - u1 * v1;
  const intUdv = rectDiff - intVdu;

  return (
    <div className="widget">
      <div className="widget-title">A parciális integrálás geometriája: ∫ u dv + ∫ v du = u₂v₂ − u₁v₁!</div>
      <label>
        Felső sarokpont: <M t={`u_2 = ${tx(u2, 2)}`} /> (<M t={`v_2 = ${tx(v2, 2)}`} />)
        <input type="range" min={1.2} max={2.6} step={0.1} value={u2} onChange={(e) => setU2(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={2.9} ymin={0} ymax={3.9} w={420} h={215}>
        {(m) => {
          let polyBlue = `M ${m.X(u1).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 50; i++) {
            const u = u1 + ((u2 - u1) * i) / 50;
            polyBlue += `L ${m.X(u).toFixed(1)},${m.Y(v(u)).toFixed(1)} `;
          }
          polyBlue += `L ${m.X(u2).toFixed(1)},${m.Y(0).toFixed(1)} Z`;

          let polyGreen = `M ${m.X(0).toFixed(1)},${m.Y(v1).toFixed(1)} `;
          for (let i = 0; i <= 50; i++) {
            const u = u1 + ((u2 - u1) * i) / 50;
            polyGreen += `L ${m.X(u).toFixed(1)},${m.Y(v(u)).toFixed(1)} `;
          }
          polyGreen += `L ${m.X(0).toFixed(1)},${m.Y(v2).toFixed(1)} Z`;

          return (
            <>
              <rect x={m.X(0)} y={m.Y(v1)} width={m.X(u1) - m.X(0)} height={m.Y(0) - m.Y(v1)} fill="rgba(148,163,184,0.22)" stroke="#94a3b8" strokeDasharray="3 2" />
              <path d={polyBlue} fill="rgba(56,189,248,0.32)" stroke="#38bdf8" strokeWidth={1.4} />
              <path d={polyGreen} fill="rgba(52,211,153,0.32)" stroke="#34d399" strokeWidth={1.4} />
              <rect x={m.X(0)} y={m.Y(v2)} width={m.X(u2) - m.X(0)} height={m.Y(0) - m.Y(v2)} fill="none" stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="5 3" />
              <path d={buildPath(v, 0.2, 2.7, m.X, m.Y, 100)} fill="none" stroke="#f8fafc" strokeWidth={2.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <span style={{ color: '#6ee7b7', fontWeight: 700 }}>Zöld (∫ u dv = {round(intUdv, 3)})</span> ={' '}
          <strong>Nagy − kis téglalap ({round(rectDiff, 3)})</strong> −{' '}
          <span style={{ color: '#7dd3fc', fontWeight: 700 }}>Kék (∫ v du = {round(intVdu, 3)})</span> ✓
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): LIATE-választó */

export function LiatePriorityWidget() {
  const [idx, setIdx] = useState(0);
  const cases = [
    {
      name: '∫ x cos x dx',
      goodU: 'u = x  (A — algebrai)',
      goodDv: 'dv = cos x dx  (T — trig.)',
      goodNext: 'x sin x − ∫ sin x dx  →  KÉSZ!',
      badU: 'u = cos x,  dv = x dx',
      badNext: '−∫ (x²/2) sin x dx  (még rosszabb!)',
    },
    {
      name: '∫ x ln x dx',
      goodU: 'u = ln x  (L — logaritmus!)',
      goodDv: 'dv = x dx  (A — algebrai)',
      goodNext: '(x²/2) ln x − ∫ (x/2) dx  →  KÉSZ!',
      badU: 'u = x,  dv = ln x dx',
      badNext: 'v-hez már tudni kéne ∫ ln x dx-et!',
    },
    {
      name: '∫ x² eˣ dx',
      goodU: 'u = x²  (A — algebrai)',
      goodDv: 'dv = eˣ dx  (E — exp.)',
      goodNext: 'x²eˣ − 2∫ xeˣ dx  (fokszám csökken!)',
      badU: 'u = eˣ,  dv = x² dx',
      badNext: '(x³/3)eˣ − ∫ (x³/3)eˣ dx  (fokszám NŐ!)',
    },
    {
      name: '∫ x arctg x dx',
      goodU: 'u = arctg x  (I — inverz trig.)',
      goodDv: 'dv = x dx  (A — algebrai)',
      goodNext: '(x²/2) arctg x − ½∫ x²/(1+x²) dx  →  KÉSZ!',
      badU: 'u = x,  dv = arctg x dx',
      badNext: 'v meghatározása túl nehéz!',
    },
  ];
  const cur = cases[idx];

  return (
    <div className="widget">
      <div className="widget-title">A LIATE-sorrend élőben: Logaritmus → Inverz → Algebrai → Trig → Exp</div>
      <div className="relbuttons chips">
        {cases.map((c, i) => (
          <button key={c.name} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {c.name}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 560 128" className="plane" role="img" aria-label="Jó és rossz u, dv választás összehasonlítása">
        <rect width={560} height={128} className="pl-bg" />

        <rect x={12} y={12} width={262} height={104} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.8} />
        <text x={143} y={33} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>✓ Nyerő (LIATE szerint)</text>
        <text x={24} y={58} fill="#e2e8f0" fontSize={11}>• {cur.goodU}</text>
        <text x={24} y={78} fill="#e2e8f0" fontSize={11}>• {cur.goodDv}</text>
        <text x={24} y={102} fill="#6ee7b7" fontSize={10.5} fontWeight={700}>{cur.goodNext}</text>

        <rect x={286} y={12} width={262} height={104} rx={8} fill="#0f172a" stroke="#f87171" strokeWidth={1.6} />
        <text x={417} y={33} textAnchor="middle" fill="#f87171" fontSize={11.5} fontWeight={700}>✗ Zsákutca (fordított választás)</text>
        <text x={298} y={62} fill="#cbd5e1" fontSize={11}>• {cur.badU}</text>
        <text x={298} y={92} fill="#fca5a5" fontSize={10.5} fontWeight={700}>{cur.badNext}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Láthatatlan 1 primitív függvények */

export function InvisibleOneAntiderivWidget() {
  const [kind, setKind] = useState<'ln' | 'atan' | 'asin'>('ln');
  const [b, setB] = useState(2.5);

  const safeB = kind === 'asin' ? Math.min(0.98, Math.max(0.1, b)) : Math.max(kind === 'ln' ? 1.1 : 0.2, b);
  const f = kind === 'ln' ? (x: number) => Math.log(x) : kind === 'atan' ? (x: number) => Math.atan(x) : (x: number) => Math.asin(x);
  const a0 = kind === 'ln' ? 1 : 0;
  const area =
    kind === 'ln'
      ? safeB * Math.log(safeB) - safeB + 1
      : kind === 'atan'
      ? safeB * Math.atan(safeB) - 0.5 * Math.log(1 + safeB * safeB)
      : safeB * Math.asin(safeB) + Math.sqrt(1 - safeB * safeB) - 1;

  return (
    <div className="widget">
      <div className="widget-title">A „láthatatlan 1” trükk (dv = 1·dx): ln x, arctg x és arcsin x görbe alatti területe</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'ln' ? 'on' : ''} onClick={() => { setKind('ln'); setB(2.72); }}>
          ∫ ln x dx = x ln x − x
        </button>
        <button type="button" className={kind === 'atan' ? 'on' : ''} onClick={() => { setKind('atan'); setB(1.5); }}>
          ∫ arctg x dx = x arctg x − ½ ln(1+x²)
        </button>
        <button type="button" className={kind === 'asin' ? 'on' : ''} onClick={() => { setKind('asin'); setB(0.8); }}>
          ∫ arcsin x dx = x arcsin x + √(1−x²)
        </button>
      </div>

      <label>
        Felső határ: <M t={`b = ${tx(safeB, 2)}`} /> ⇒ terület <M t={`[${a0};\\,${tx(safeB, 2)}]`} />-n:{' '}
        <strong>{round(area, 3)}</strong>
        <input
          type="range"
          min={kind === 'ln' ? 1.1 : 0.1}
          max={kind === 'asin' ? 0.98 : 4.0}
          step={0.05}
          value={safeB}
          onChange={(e) => setB(Number(e.target.value))}
        />
      </label>

      <Chart
        xmin={kind === 'ln' ? 0.5 : 0}
        xmax={kind === 'asin' ? 1.15 : 4.3}
        ymin={-0.2}
        ymax={kind === 'asin' ? 1.75 : 1.7}
        h={190}
      >
        {(m) => {
          const dCurve = buildPath(f, a0, kind === 'asin' ? 1 : 4.2, m.X, m.Y, 140);
          let poly = `M ${m.X(a0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 50; i++) {
            const x = a0 + ((safeB - a0) * i) / 50;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(f(x)).toFixed(1)} `;
          }
          poly += `L ${m.X(safeB).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={poly} fill="rgba(52,211,153,0.32)" stroke="#34d399" strokeWidth={1.4} />
              <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <circle cx={m.X(safeB)} cy={m.Y(f(safeB))} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Táblázatos parciális integrálás */

export function TabularIntegrationWidget() {
  const [ex, setEx] = useState<'x2e' | 'x3sin'>('x3sin');

  const rows =
    ex === 'x2e'
      ? [
          { d: 'x²', i: 'eˣ', s: '+' },
          { d: '2x', i: 'eˣ', s: '−' },
          { d: '2', i: 'eˣ', s: '+' },
          { d: '0', i: 'eˣ', s: '' },
        ]
      : [
          { d: 'x³', i: 'sin x', s: '+' },
          { d: '3x²', i: '−cos x', s: '−' },
          { d: '6x', i: '−sin x', s: '+' },
          { d: '6', i: 'cos x', s: '−' },
          { d: '0', i: 'sin x', s: '' },
        ];

  const h = 52 + rows.length * 30;

  return (
    <div className="widget">
      <div className="widget-title">Táblázatos parciális integrálás (Thomas 7–8. példa) — átlós nyilak, váltakozó előjelek!</div>
      <div className="relbuttons chips">
        <button type="button" className={ex === 'x2e' ? 'on' : ''} onClick={() => setEx('x2e')}>
          ∫ x² eˣ dx (3 nyíl)
        </button>
        <button type="button" className={ex === 'x3sin' ? 'on' : ''} onClick={() => setEx('x3sin')}>
          ∫ x³ sin x dx (4 nyíl)
        </button>
      </div>

      <svg viewBox={`0 0 560 ${h}`} className="plane" role="img" aria-label="Táblázatos parciális integrálás diagramja">
        <rect width={560} height={h} className="pl-bg" />
        <text x={115} y={24} textAnchor="middle" fill="#7dd3fc" fontSize={11.5} fontWeight={700}>Deriválás (u → 0)</text>
        <text x={325} y={24} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>Integrálás (dv → v)</text>
        <text x={470} y={24} textAnchor="middle" fill="#fde68a" fontSize={11.5} fontWeight={700}>Szorzat tag</text>

        {rows.map((r, idx) => {
          const y = 48 + idx * 30;
          const next = rows[idx + 1];
          return (
            <g key={idx}>
              <text x={115} y={y} textAnchor="middle" fill="#e2e8f0" fontSize={12.5} fontWeight={700}>{r.d}</text>
              <text x={325} y={y} textAnchor="middle" fill="#e2e8f0" fontSize={12.5}>{r.i}</text>
              {next && (
                <>
                  <line x1={155} y1={y - 3} x2={275} y2={y + 24} stroke={r.s === '+' ? '#34d399' : '#f87171'} strokeWidth={1.8} />
                  <circle cx={215} cy={y + 10} r={9} fill="#0f172a" stroke={r.s === '+' ? '#34d399' : '#f87171'} strokeWidth={1.3} />
                  <text x={215} y={y + 14} textAnchor="middle" fill={r.s === '+' ? '#34d399' : '#f87171'} fontSize={11} fontWeight={700}>
                    {r.s}
                  </text>
                  <text x={470} y={y + 12} textAnchor="middle" fill="#fde68a" fontSize={11}>
                    ({r.s}) · ({r.d}) · ({next.i})
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      <div className="result">
        <p>
          <strong>Végeredmény:</strong>{' '}
          {ex === 'x2e' ? (
            <M t="\int x^2 e^x\,dx = \mathbf{x^2 e^x - 2xe^x + 2e^x + C}" />
          ) : (
            <M t="\int x^3\sin x\,dx = \mathbf{-x^3\cos x + 3x^2\sin x + 6x\cos x - 6\sin x + C}" />
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Bumeráng-hurok diagram */

export function BoomerangLoopDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A „bumeráng-trükk”: I = ∫ eˣ cos x dx kétszeri parciális integrálással visszatér!</div>
      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Ciklikus parciális integrálás lépései">
        <rect width={560} height={132} className="pl-bg" />

        <rect x={10} y={18} width={118} height={96} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={69} y={40} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Kiindulás</text>
        <text x={69} y={70} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>I = ∫ eˣ cos x dx</text>
        <text x={69} y={96} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>u = eˣ, dv = cos x dx</text>

        <text x={140} y={70} textAnchor="middle" fill="#fbbf24" fontSize={15} fontWeight={700}>→</text>

        <rect x={152} y={18} width={142} height={96} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
        <text x={223} y={40} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>1. parciális</text>
        <text x={223} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>eˣ sin x − ∫ eˣ sin x dx</text>
        <text x={223} y={96} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>újra u = eˣ, dv = sin x dx!</text>

        <text x={306} y={70} textAnchor="middle" fill="#fbbf24" fontSize={15} fontWeight={700}>→</text>

        <rect x={318} y={18} width={118} height={96} rx={8} fill="#0f172a" stroke="#f472b6" strokeWidth={1.6} />
        <text x={377} y={40} textAnchor="middle" fill="#f472b6" fontSize={11} fontWeight={700}>2. parciális</text>
        <text x={377} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={11}>eˣ(sin x + cos x)</text>
        <text x={377} y={88} textAnchor="middle" fill="#f9a8d4" fontSize={12.5} fontWeight={700}>− I  (visszatért!)</text>

        <text x={448} y={70} textAnchor="middle" fill="#34d399" fontSize={15} fontWeight={700}>⇒</text>

        <rect x={460} y={18} width={90} height={96} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={2} />
        <text x={505} y={42} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>+I és ÷2</text>
        <text x={505} y={72} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>½ eˣ(sin x</text>
        <text x={505} y={90} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>+ cos x)+C</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Wallis-redukció cos^n x-re */

export function ReductionStepperWidget() {
  const [n, setN] = useState(4);

  // I_n = ∫_0^{π/2} cos^n x dx
  const wallis = (k: number): number => {
    if (k === 0) return Math.PI / 2;
    if (k === 1) return 1;
    return ((k - 1) / k) * wallis(k - 2);
  };
  const val = wallis(n);

  return (
    <div className="widget">
      <div className="widget-title">Hatványredukció a [0; π/2] szakaszon (Wallis-integrál): Iₙ = ((n−1)/n) · Iₙ₋₂</div>
      <label>
        Kitevő: <strong>n = {n}</strong> ⇒ <M t={`\\int_0^{\\pi/2}\\cos^{${n}} x\\,dx = ${tx(val, 4)}`} />
        <input type="range" min={1} max={8} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={1.68} ymin={0} ymax={1.15} h={185}>
        {(m) => {
          const d = buildPath((x) => Math.cos(x) ** n, 0, Math.PI / 2, m.X, m.Y, 120);
          let poly = `M ${m.X(0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 50; i++) {
            const x = ((Math.PI / 2) * i) / 50;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(Math.cos(x) ** n).toFixed(1)} `;
          }
          poly += `L ${m.X(Math.PI / 2).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={poly} fill="rgba(56,189,248,0.30)" stroke="#38bdf8" strokeWidth={1.4} />
              <path d={d} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Helyettesítés + Parciális */

export function SubThenPartsPipelineDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Kettős kombó: előbb helyettesítés (t = √x), utána parciális integrálás!</div>
      <svg viewBox="0 0 560 92" className="plane" role="img" aria-label="Helyettesítés majd parciális integrálás lépései">
        <rect width={560} height={92} className="pl-bg" />
        <rect x={10} y={18} width={104} height={56} rx={7} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={62} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={12}>∫ e^(√x) dx</text>
        <text x={128} y={50} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>→</text>
        <rect x={142} y={18} width={140} height={56} rx={7} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={212} y={42} textAnchor="middle" fill="#fde68a" fontSize={10.5}>t = √x, dx = 2t dt</text>
        <text x={212} y={60} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>2 ∫ t·eᵗ dt</text>
        <text x={296} y={50} textAnchor="middle" fill="#34d399" fontSize={14} fontWeight={700}>→</text>
        <rect x={310} y={18} width={240} height={56} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={430} y={42} textAnchor="middle" fill="#6ee7b7" fontSize={11}>parciális: 2(t − 1)eᵗ + C</text>
        <text x={430} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>= 2(√x − 1)e^(√x) + C</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): Az 5 archetípus összefoglalása */

export function PartsChoiceCheatDiagram() {
  const rows = [
    { t: 'Polinom × Exp / Trig', ex: 'x² eˣ,  x³ sin x', how: 'Táblázatos parciális integrálás!', c: '#38bdf8' },
    { t: 'Polinom × Log / Inv. trig', ex: 'x ln x,  x arctg x', how: 'LIATE: u = ln / arctg, dv = polinom!', c: '#34d399' },
    { t: 'Önálló Log / Inv. trig', ex: 'ln x,  arcsin x,  arctg x', how: 'Láthatatlan 1: dv = 1·dx!', c: '#fbbf24' },
    { t: 'Exp × Trig (ciklikus)', ex: 'eˣ cos x,  e²ˣ sin x', how: 'Bumeráng-trükk (2× parciális → I)!', c: '#f472b6' },
    { t: 'Magas trig. hatvány', ex: 'cosⁿ x,  sinⁿ x', how: 'Hatványredukciós formula (n → n−2)!', c: '#a78bfa' },
  ];

  return (
    <div className="widget">
      <div className="widget-title">Az 5 parciális integrálási archetípus egyetlen kártyán</div>
      <svg viewBox="0 0 560 176" className="plane" role="img" aria-label="Öt parciális integrálási típus összefoglalása">
        <rect width={560} height={176} className="pl-bg" />
        {rows.map((r, i) => {
          const y = 12 + i * 32;
          return (
            <g key={i}>
              <rect x={10} y={y} width={540} height={27} rx={5} fill="#0f172a" stroke={r.c} strokeWidth={1.2} />
              <text x={20} y={y + 17} fill={r.c} fontSize={10.5} fontWeight={700}>{r.t}</text>
              <text x={215} y={y + 17} fill="#cbd5e1" fontSize={10.5}>{r.ex}</text>
              <text x={355} y={y + 17} fill="#e2e8f0" fontSize={10.5} fontWeight={700}>{r.how}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
