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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): sin^m x cos^n x 3 esete */

export function SinCosCasesDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A ∫ sinᵐ x cosⁿ x dx integrál 3 alapesete — nézd meg a kitevők paritását!</div>
      <svg viewBox="0 0 560 144" className="plane" role="img" aria-label="Három eset szinusz és koszinusz hatványok szorzatához">
        <rect width={560} height={144} className="pl-bg" />

        <rect x={10} y={12} width={174} height={120} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={97} y={32} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>1. m PÁRATLAN</text>
        <text x={97} y={56} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>Válassz le egy sin x-et!</text>
        <text x={97} y={80} textAnchor="middle" fill="#fde68a" fontSize={10.5}>sin²x = 1 − cos²x</text>
        <text x={97} y={108} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={700}>u = cos x (du = −sin x dx)</text>

        <rect x={193} y={12} width={174} height={120} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={280} y={32} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>2. n PÁRATLAN</text>
        <text x={280} y={56} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>Válassz le egy cos x-et!</text>
        <text x={280} y={80} textAnchor="middle" fill="#fde68a" fontSize={10.5}>cos²x = 1 − sin²x</text>
        <text x={280} y={108} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={700}>u = sin x (du = cos x dx)</text>

        <rect x={376} y={12} width={174} height={120} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
        <text x={463} y={32} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>3. Mindkettő PÁROS</text>
        <text x={463} y={56} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>Félszög-képletek!</text>
        <text x={463} y={80} textAnchor="middle" fill="#fde68a" fontSize={10.5}>sin²x = (1 − cos 2x)/2</text>
        <text x={463} y={108} textAnchor="middle" fill="#fde68a" fontSize={10.5}>cos²x = (1 + cos 2x)/2</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): sin^m x cos^n x interaktív görbe és terület */

export function SinCosPowerAreaWidget() {
  const [mPow, setMPow] = useState(3);
  const [nPow, setNPow] = useState(2);

  // Numerikus integrál [0, π/2]
  const N = 200;
  let area = 0;
  for (let i = 0; i < N; i++) {
    const x = ((i + 0.5) * (Math.PI / 2)) / N;
    area += Math.sin(x) ** mPow * Math.cos(x) ** nPow;
  }
  area *= Math.PI / 2 / N;

  const strategy =
    mPow % 2 === 1
      ? 'm páratlan → u = cos x!'
      : nPow % 2 === 1
      ? 'n páratlan → u = sin x!'
      : 'mindkettő páros → félszög-képlet!';

  return (
    <div className="widget">
      <div className="widget-title">sinᵐ x · cosⁿ x a [0; π/2] szakaszon — élő stratégia és terület!</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Szinusz kitevője: <strong>m = {mPow}</strong>
          <input type="range" min={0} max={5} step={1} value={mPow} onChange={(e) => setMPow(Number(e.target.value))} />
        </label>
        <label>
          Koszinusz kitevője: <strong>n = {nPow}</strong>
          <input type="range" min={0} max={5} step={1} value={nPow} onChange={(e) => setNPow(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={1.65} ymin={0} ymax={1.12} h={185}>
        {(m) => {
          const fn = (x: number) => Math.sin(x) ** mPow * Math.cos(x) ** nPow;
          let poly = `M ${m.X(0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 60; i++) {
            const x = ((Math.PI / 2) * i) / 60;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(fn(x)).toFixed(1)} `;
          }
          poly += `L ${m.X(Math.PI / 2).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={poly} fill="rgba(56,189,248,0.32)" stroke="#38bdf8" strokeWidth={1.3} />
              <path d={buildPath(fn, 0, Math.PI / 2, m.X, m.Y, 120)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>Stratégia:</strong> <span style={{ color: '#fde68a', fontWeight: 700 }}>{strategy}</span> ·{' '}
          <strong>Terület [0; π/2]-n:</strong> <M t={`\\approx ${tx(area, 4)}`} />.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Páros hatványok és a félszög-átlag */

export function EvenPowerAverageWidget() {
  const [p, setP] = useState<2 | 4>(2);
  const avg = p === 2 ? 0.5 : 0.375;

  return (
    <div className="widget">
      <div className="widget-title">Miért működik a félszög-képlet? — A sin²x és sin⁴x átlaga egy teljes perióduson!</div>
      <div className="relbuttons chips">
        <button type="button" className={p === 2 ? 'on' : ''} onClick={() => setP(2)}>
          y = sin² x = ½ − ½ cos(2x)  (átlag = ½)
        </button>
        <button type="button" className={p === 4 ? 'on' : ''} onClick={() => setP(4)}>
          y = sin⁴ x = ⅜ − ½ cos(2x) + ⅛ cos(4x)  (átlag = ⅜)
        </button>
      </div>

      <Chart xmin={0} xmax={6.4} ymin={-0.1} ymax={1.15} h={185}>
        {(m) => (
          <>
            <line x1={m.X(0)} y1={m.Y(avg)} x2={m.X(2 * Math.PI)} y2={m.Y(avg)} stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="6 4" />
            <path d={buildPath((x) => Math.sin(x) ** p, 0, 2 * Math.PI, m.X, m.Y, 180)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            <text x={m.X(5.4)} y={m.Y(avg + 0.08)} fill="#fde68a" fontSize={11} fontWeight={700}>
              átlag = {p === 2 ? '1/2' : '3/8'}
            </text>
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          A koszinuszos rezgő tagok integrálja <M t="[0;\,2\pi]" />-n <strong>pontosan 0</strong>, ezért a teljes terület egyszerűen{' '}
          <M t={p === 2 ? '2\\pi\\cdot\\frac{1}{2} = \\mathbf{\\pi}' : '2\\pi\\cdot\\frac{3}{8} = \\mathbf{\\frac{3\\pi}{4}}'} />!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): tg^m x sec^n x 3 esete */

export function TanSecCasesDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A ∫ tgᵐ x secⁿ x dx integrál 3 alapesete — a két mágikus deriváltpár!</div>
      <svg viewBox="0 0 560 144" className="plane" role="img" aria-label="Tangens és szekáns hatványok integrálásának három esete">
        <rect width={560} height={144} className="pl-bg" />

        <rect x={10} y={12} width={174} height={120} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={97} y={32} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>1. n PÁROS (n ≥ 2)</text>
        <text x={97} y={56} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>Válassz le egy sec²x-et!</text>
        <text x={97} y={80} textAnchor="middle" fill="#fde68a" fontSize={10.5}>sec²x = 1 + tg²x</text>
        <text x={97} y={108} textAnchor="middle" fill="#6ee7b7" fontSize={11} fontWeight={700}>u = tg x (du = sec²x dx)</text>

        <rect x={193} y={12} width={174} height={120} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={280} y={32} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>2. m PÁRATLAN (n ≥ 1)</text>
        <text x={280} y={56} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>Válassz le sec x·tg x-et!</text>
        <text x={280} y={80} textAnchor="middle" fill="#fde68a" fontSize={10.5}>tg²x = sec²x − 1</text>
        <text x={280} y={108} textAnchor="middle" fill="#7dd3fc" fontSize={10.5} fontWeight={700}>u = sec x (du = sec tg dx)</text>

        <rect x={376} y={12} width={174} height={120} rx={8} fill="#0f172a" stroke="#f472b6" strokeWidth={1.6} />
        <text x={463} y={32} textAnchor="middle" fill="#f472b6" fontSize={11.5} fontWeight={700}>3. m páros, n páratlan</text>
        <text x={463} y={56} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>Írd át sec hatványokra!</text>
        <text x={463} y={80} textAnchor="middle" fill="#fde68a" fontSize={10.5}>tg²x = sec²x − 1</text>
        <text x={463} y={108} textAnchor="middle" fill="#f9a8d4" fontSize={10.5} fontWeight={700}>Parciális (mint ∫ sec³x)!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): ∫ sec^3 x dx bumerángja */

export function SecCubedBoomerangDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A legendás ∫ sec³ x dx integrál — parciális integrálás + bumeráng!</div>
      <svg viewBox="0 0 560 116" className="plane" role="img" aria-label="Szekáns köb integrálásának lépései">
        <rect width={560} height={116} className="pl-bg" />

        <rect x={10} y={14} width={120} height={88} rx={7} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={70} y={38} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Szétbontás</text>
        <text x={70} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={11}>u = sec x</text>
        <text x={70} y={82} textAnchor="middle" fill="#e2e8f0" fontSize={11}>dv = sec²x dx</text>

        <text x={142} y={62} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={700}>→</text>

        <rect x={154} y={14} width={166} height={88} rx={7} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={237} y={36} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>tg²x = sec²x − 1</text>
        <text x={237} y={60} textAnchor="middle" fill="#e2e8f0" fontSize={11}>I = sec x tg x</text>
        <text x={237} y={82} textAnchor="middle" fill="#f9a8d4" fontSize={11} fontWeight={700}>− I + ∫ sec x dx</text>

        <text x={332} y={62} textAnchor="middle" fill="#34d399" fontSize={14} fontWeight={700}>⇒</text>

        <rect x={344} y={14} width={206} height={88} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.8} />
        <text x={447} y={36} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>+I és ÷2 (KÉSZ!)</text>
        <text x={447} y={62} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>½ sec x tg x</text>
        <text x={447} y={84} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>+ ½ ln|sec x + tg x| + C</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Különböző frekvenciák szorzata & ortogonalitás */

export function ProductToSumOrthoWidget() {
  const [mFreq, setMFreq] = useState(2);
  const [nFreq, setNFreq] = useState(3);

  // ∫_{-π}^{π} sin(mx) sin(nx) dx
  const isEqual = mFreq === nFreq;
  const val = isEqual ? Math.PI : 0;

  return (
    <div className="widget">
      <div className="widget-title">Fourier-ortogonalitás élőben: ∫₋π^π sin(mx)·sin(nx) dx — ha m ≠ n, PONTOSAN NULLA!</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Első frekvencia: <strong>m = {mFreq}</strong>
          <input type="range" min={1} max={5} step={1} value={mFreq} onChange={(e) => setMFreq(Number(e.target.value))} />
        </label>
        <label>
          Második frekvencia: <strong>n = {nFreq}</strong>
          <input type="range" min={1} max={5} step={1} value={nFreq} onChange={(e) => setNFreq(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={-Math.PI} xmax={Math.PI} ymin={-1.15} ymax={1.15} h={190}>
        {(m) => {
          const fn = (x: number) => Math.sin(mFreq * x) * Math.sin(nFreq * x);
          return (
            <>
              <path d={buildPath(fn, -Math.PI, Math.PI, m.X, m.Y, 240)} fill="none" stroke={isEqual ? '#34d399' : '#38bdf8'} strokeWidth={2.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <M t={`\\int_{-\\pi}^{\\pi} \\sin(${mFreq}x)\\sin(${nFreq}x)\\,dx = \\mathbf{${isEqual ? '\\pi \\approx 3{,}142' : '0'}}`} />{' '}
          {isEqual
            ? '(m = n esetén a függvény végig nemnegatív: sin²(mx) ≥ 0, területe π!)'
            : '(m ≠ n esetén a pozitív és negatív hullámhegyek hajszálpontosan kioltják egymást — ortogonálisak!)'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Szorzat-összeg képletek kártya */

export function ProductToSumCheatDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A 3 szorzat → összeg azonosság (különböző frekvenciákhoz: mx és nx)</div>
      <svg viewBox="0 0 560 116" className="plane" role="img" aria-label="Három trigonometrikus szorzat-összeg azonosság">
        <rect width={560} height={116} className="pl-bg" />
        {[
          { y: 12, txt: 'sin(mx) · sin(nx)  =  ½ [ cos((m − n)x) − cos((m + n)x) ]', c: '#38bdf8' },
          { y: 46, txt: 'sin(mx) · cos(nx)  =  ½ [ sin((m − n)x) + sin((m + n)x) ]', c: '#34d399' },
          { y: 80, txt: 'cos(mx) · cos(nx)  =  ½ [ cos((m − n)x) + cos((m + n)x) ]', c: '#fbbf24' },
        ].map((r, i) => (
          <g key={i}>
            <rect x={14} y={r.y} width={532} height={26} rx={5} fill="#0f172a" stroke={r.c} strokeWidth={1.3} />
            <text x={280} y={r.y + 17} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={700}>{r.txt}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): y = ln(sec x) ívhossz-csoda */

export function LnSecArcLengthWidget() {
  const [b, setB] = useState(Math.PI / 4);
  const L = Math.log(1 / Math.cos(b) + Math.tan(b));

  return (
    <div className="widget">
      <div className="widget-title">Geometriai alkalmazás (Thomas 41. feladat): az y = ln(sec x) ívhossza pontosan ∫ sec x dx!</div>
      <label>
        Felső határ: <M t={`b = ${tx(b, 2)}`} /> ⇒ ívhossz: <M t={`L = \\ln(\\sec b + \\operatorname{tg} b) = \\mathbf{${tx(L, 3)}}`} />
        <input type="range" min={0.2} max={1.3} step={0.05} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={1.45} ymin={0} ymax={1.45} h={175}>
        {(m) => (
          <>
            <path d={buildPath((x) => Math.log(1 / Math.cos(x)), 0, 1.32, m.X, m.Y, 120)} fill="none" stroke="#64748b" strokeWidth={1.6} strokeDasharray="4 3" />
            <path d={buildPath((x) => Math.log(1 / Math.cos(x)), 0, b, m.X, m.Y, 100)} fill="none" stroke="#34d399" strokeWidth={3} />
            <circle cx={m.X(b)} cy={m.Y(Math.log(1 / Math.cos(b)))} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
          </>
        )}
      </Chart>
    </div>
  );
}
