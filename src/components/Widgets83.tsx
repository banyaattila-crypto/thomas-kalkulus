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
  steps = 200,
) {
  let d = '';
  let pen = false;
  let prev: number | null = null;
  for (let i = 0; i <= steps; i++) {
    const x = xmin + ((xmax - xmin) * i) / steps;
    const y = fn(x);
    if (!Number.isFinite(y) || Math.abs(y) > 40) {
      pen = false;
      prev = null;
      continue;
    }
    const jump = prev !== null && Math.abs(y - prev) > 12;
    d += `${pen && !jump ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
    pen = true;
    prev = y;
  }
  return d;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Résztörtek összege vizuálisan */

export function PartialFractionSumWidget() {
  const [x0, setX0] = useState(1.0);
  const safeX =
    Math.abs(x0 + 1) < 0.2 ? -0.75 : Math.abs(x0 - 3) < 0.2 ? 2.75 : x0;

  const p1 = (x: number) => 2 / (x + 1);
  const p2 = (x: number) => 3 / (x - 3);
  const sum = (x: number) => p1(x) + p2(x);

  return (
    <div className="widget">
      <div className="widget-title">A parciális törtekre bontás vizuálisan: (5x−3)/(x²−2x−3) = 2/(x+1) + 3/(x−3)</div>
      <label>
        Próbapont: <M t={`x_0 = ${tx(safeX, 2)}`} /> ⇒{' '}
        <span style={{ color: '#6ee7b7' }}>{round(p1(safeX), 2)}</span> +{' '}
        <span style={{ color: '#fde68a' }}>({round(p2(safeX), 2)})</span> ={' '}
        <span style={{ color: '#7dd3fc', fontWeight: 700 }}>{round(sum(safeX), 2)}</span>
        <input type="range" min={-3.5} max={5.5} step={0.1} value={safeX} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={-3.8} xmax={5.8} ymin={-7} ymax={7} h={210}>
        {(m) => (
          <>
            <line x1={m.X(-1)} y1={m.Y(-7)} x2={m.X(-1)} y2={m.Y(7)} stroke="#f87171" strokeWidth={1.3} strokeDasharray="4 3" />
            <line x1={m.X(3)} y1={m.Y(-7)} x2={m.X(3)} y2={m.Y(7)} stroke="#f87171" strokeWidth={1.3} strokeDasharray="4 3" />
            <path d={buildPath(p1, -3.8, 5.8, m.X, m.Y, 220)} fill="none" stroke="#34d399" strokeWidth={1.8} strokeDasharray="5 3" />
            <path d={buildPath(p2, -3.8, 5.8, m.X, m.Y, 220)} fill="none" stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="5 3" />
            <path d={buildPath(sum, -3.8, 5.8, m.X, m.Y, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
            <circle cx={m.X(safeX)} cy={m.Y(Math.max(-7, Math.min(7, sum(safeX))))} r={5.2} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.4} />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék:</strong> az eredeti tört · <strong>Zöld &amp; Sárga:</strong> a két egyszerű résztört (mindkettő 1 soros <M t="\ln" /> integrál!).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): A 4 felbontási eset térképe */

export function FourCasesTemplateDiagram() {
  const rows = [
    { t: '1. Egyszerű lineáris', f: '(x − r)', tpl: 'A / (x − r)', int: 'A · ln|x − r|', c: '#38bdf8' },
    { t: '2. Többszörös lineáris', f: '(x − r)ᵐ', tpl: 'A₁/(x−r) + … + Aₘ/(x−r)ᵐ', int: 'ln + hatványok', c: '#34d399' },
    { t: '3. Egyszerű másodfokú', f: 'ax²+bx+c (Δ<0)', tpl: '(Ax + B) / (ax²+bx+c)', int: 'ln + arctg!', c: '#fbbf24' },
    { t: '4. Többszörös másodfokú', f: '(ax²+bx+c)ᵐ', tpl: '(A₁x+B₁)/(…) + … + (Aₘx+Bₘ)/(…)ᵐ', int: 'u-helyett. + red.', c: '#f472b6' },
  ];

  return (
    <div className="widget">
      <div className="widget-title">A parciális törtekre bontás 4 alapesete (csak valódi törtnél: deg P &lt; deg Q!)</div>
      <svg viewBox="0 0 560 164" className="plane" role="img" aria-label="A parciális törtekre bontás négy esete">
        <rect width={560} height={164} className="pl-bg" />
        <rect x={10} y={8} width={540} height={24} rx={5} fill="#1e293b" />
        <text x={78} y={24} textAnchor="middle" fill="#cbd5e1" fontSize={10.5} fontWeight={700}>Eset</text>
        <text x={198} y={24} textAnchor="middle" fill="#7dd3fc" fontSize={10.5} fontWeight={700}>Nevező tényező</text>
        <text x={360} y={24} textAnchor="middle" fill="#fde68a" fontSize={10.5} fontWeight={700}>Résztört-sablon</text>
        <text x={502} y={24} textAnchor="middle" fill="#6ee7b7" fontSize={10.5} fontWeight={700}>Integrál</text>

        {rows.map((r, i) => {
          const y = 38 + i * 30;
          return (
            <g key={i}>
              <rect x={10} y={y} width={540} height={26} rx={5} fill="#0f172a" stroke={r.c} strokeWidth={1.1} />
              <text x={16} y={y + 17} fill={r.c} fontSize={10} fontWeight={700}>{r.t}</text>
              <text x={198} y={y + 17} textAnchor="middle" fill="#e2e8f0" fontSize={10}>{r.f}</text>
              <text x={360} y={y + 17} textAnchor="middle" fill="#fde68a" fontSize={10}>{r.tpl}</text>
              <text x={502} y={y + 17} textAnchor="middle" fill="#6ee7b7" fontSize={10}>{r.int}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Heaviside letakarásos szimulátor */

export function HeavisideCoverUpWidget() {
  const [which, setWhich] = useState<'A' | 'B' | 'C'>('A');

  const info =
    which === 'A'
      ? { root: 1, num: '1² + 1 = 2', den: '(1 − 2)(1 − 3) = (−1)(−2) = 2', val: 'A = 2 / 2 = 1', coverIdx: 0 }
      : which === 'B'
      ? { root: 2, num: '2² + 1 = 5', den: '(2 − 1)(2 − 3) = (1)(−1) = −1', val: 'B = 5 / (−1) = −5', coverIdx: 1 }
      : { root: 3, num: '3² + 1 = 10', den: '(3 − 1)(3 − 2) = (2)(1) = 2', val: 'C = 10 / 2 = 5', coverIdx: 2 };

  const factors = ['(x − 1)', '(x − 2)', '(x − 3)'];

  return (
    <div className="widget">
      <div className="widget-title">Heaviside „letakarásos” módszere (Thomas 6. példa) — egyenletrendszer nélkül!</div>
      <div className="relbuttons chips">
        <button type="button" className={which === 'A' ? 'on' : ''} onClick={() => setWhich('A')}>
          A kiszámítása (x = 1)
        </button>
        <button type="button" className={which === 'B' ? 'on' : ''} onClick={() => setWhich('B')}>
          B kiszámítása (x = 2)
        </button>
        <button type="button" className={which === 'C' ? 'on' : ''} onClick={() => setWhich('C')}>
          C kiszámítása (x = 3)
        </button>
      </div>

      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Heaviside letakarásos módszer vizualizációja">
        <rect width={560} height={132} className="pl-bg" />

        {/* Bal oldal: a tört, letakarva az egyik tényezővel */}
        <text x={140} y={42} textAnchor="middle" fill="#e2e8f0" fontSize={14} fontWeight={700}>x² + 1</text>
        <line x1={26} y1={54} x2={254} y2={54} stroke="#94a3b8" strokeWidth={1.8} />

        {factors.map((f, i) => {
          const cx = 64 + i * 76;
          const covered = i === info.coverIdx;
          return (
            <g key={f}>
              {covered ? (
                <>
                  <rect x={cx - 32} y={62} width={64} height={26} rx={5} fill="#fbbf24" />
                  <text x={cx} y={79} textAnchor="middle" fill="#0f172a" fontSize={10.5} fontWeight={700}>LETAKARVA</text>
                </>
              ) : (
                <text x={cx} y={80} textAnchor="middle" fill="#7dd3fc" fontSize={13} fontWeight={700}>{f}</text>
              )}
            </g>
          );
        })}
        <text x={140} y={114} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>
          Helyettesíts x = {info.root}-t a maradékba!
        </text>

        {/* Jobb oldal: számolás */}
        <rect x={282} y={16} width={264} height={100} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={414} y={38} textAnchor="middle" fill="#fde68a" fontSize={11.5} fontWeight={700}>
          x = {info.root} behelyettesítése:
        </text>
        <text x={296} y={62} fill="#e2e8f0" fontSize={11.5}>Számláló: {info.num}</text>
        <text x={296} y={82} fill="#e2e8f0" fontSize={11.5}>Nevező: {info.den}</text>
        <text x={414} y={106} textAnchor="middle" fill="#34d399" fontSize={13} fontWeight={700}>{info.val} ✓</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): 1/(x-1) vs 1/(x-1)^2 */

export function RepeatedRootCompareWidget() {
  return (
    <div className="widget">
      <div className="widget-title">Egyszerű pólus 1/(x−1) (kék → ln|x−1|) vs. dupla pólus 1/(x−1)² (sárga → −1/(x−1))</div>
      <Chart xmin={-2} xmax={4} ymin={-6} ymax={6} h={195}>
        {(m) => (
          <>
            <line x1={m.X(1)} y1={m.Y(-6)} x2={m.X(1)} y2={m.Y(6)} stroke="#f87171" strokeWidth={1.4} strokeDasharray="5 4" />
            <path d={buildPath((x) => 1 / (x - 1), -2, 4, m.X, m.Y, 200)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            <path d={buildPath((x) => 1 / ((x - 1) * (x - 1)), -2, 4, m.X, m.Y, 200)} fill="none" stroke="#fbbf24" strokeWidth={2.4} />
          </>
        )}
      </Chart>
      <div className="result">
        <p>
          <strong>Kék:</strong> <M t="\frac{1}{x-1}" /> (előjelet vált a pólusnál, integrálja <M t="\ln|x-1|" />) ·{' '}
          <strong>Sárga:</strong> <M t="\frac{1}{(x-1)^2}" /> (mindig pozitív, integrálja sima hatvány: <M t="-\frac{1}{x-1}" />!).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Másodfokú tényező felbontása */

export function QuadraticFactorSplitDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Thomas 4. példája: (−2x + 4) / ((x² + 1)(x − 1)²) szétbontása 4 elemi integrálra!</div>
      <svg viewBox="0 0 560 116" className="plane" role="img" aria-label="Másodfokú és dupla lineáris tényező integrálása">
        <rect width={560} height={116} className="pl-bg" />

        {[
          { x: 10, t: '2x / (x² + 1)', res: 'ln(x² + 1)', c: '#38bdf8' },
          { x: 148, t: '+ 1 / (x² + 1)', res: '+ arctg x', c: '#34d399' },
          { x: 286, t: '− 2 / (x − 1)', res: '− 2 ln|x − 1|', c: '#fbbf24' },
          { x: 424, t: '+ 1 / (x − 1)²', res: '− 1 / (x − 1)', c: '#f472b6' },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={14} width={126} height={88} rx={7} fill="#0f172a" stroke={b.c} strokeWidth={1.5} />
            <text x={b.x + 63} y={38} textAnchor="middle" fill={b.c} fontSize={11.5} fontWeight={700}>{b.t}</text>
            <text x={b.x + 63} y={62} textAnchor="middle" fill="#94a3b8" fontSize={12}>↓ ∫</text>
            <text x={b.x + 63} y={86} textAnchor="middle" fill="#e2e8f0" fontSize={11.5} fontWeight={700}>{b.res}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): 5 lépéses mester-algoritmus */

export function FullPipelineFlowDiagram() {
  const steps = [
    { n: '0.', t: 'deg P ≥ deg Q?', s: 'Ha igen: polinomosztás!', c: '#f87171' },
    { n: '1.', t: 'Szorzattá bontás', s: 'Q(x) → lineáris + másodfokú', c: '#38bdf8' },
    { n: '2.', t: 'Sablon felírása', s: '4 eset szabályai szerint', c: '#fbbf24' },
    { n: '3.', t: 'A, B, C keresése', s: 'Heaviside / egyenletrendszer', c: '#a78bfa' },
    { n: '4.', t: 'Integrálás', s: 'ln, hatvány, arctg + C', c: '#34d399' },
  ];

  return (
    <div className="widget">
      <div className="widget-title">A racionális törtek integrálásának 5 lépéses mester-algoritmusa</div>
      <svg viewBox="0 0 560 98" className="plane" role="img" aria-label="Öt lépéses algoritmus parciális törtekre bontáshoz">
        <rect width={560} height={98} className="pl-bg" />
        {steps.map((s, i) => {
          const x = 10 + i * 110;
          return (
            <g key={s.n}>
              <rect x={x} y={14} width={100} height={70} rx={7} fill="#0f172a" stroke={s.c} strokeWidth={1.5} />
              <text x={x + 50} y={33} textAnchor="middle" fill={s.c} fontSize={11} fontWeight={700}>{s.n} {s.t}</text>
              <text x={x + 50} y={62} textAnchor="middle" fill="#cbd5e1" fontSize={9.2}>{s.s}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Logisztikus növekedési görbe */

export function LogisticCurvePreviewWidget() {
  const [Mcap, setMcap] = useState(10);
  const [k, setK] = useState(0.12);
  const y0 = 1.0;
  const A = (Mcap - y0) / y0;
  const tInf = Math.log(A) / (k * Mcap);

  return (
    <div className="widget">
      <div className="widget-title">Valós alkalmazás: a logisztikus görbe (dy/dt = k·y·(M − y) → parciális törtekkel!)</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Eltartóképesség: <strong>M = {Mcap}</strong> (inflexió: M/2 = {round(Mcap / 2, 1)})
          <input type="range" min={4} max={14} step={2} value={Mcap} onChange={(e) => setMcap(Number(e.target.value))} />
        </label>
        <label>
          Növekedési paraméter: <M t={`k = ${tx(k, 2)}`} />
          <input type="range" min={0.05} max={0.25} step={0.02} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={8} ymin={0} ymax={15} h={195}>
        {(m) => {
          const fn = (t: number) => Mcap / (1 + A * Math.exp(-k * Mcap * t));
          return (
            <>
              <line x1={m.X(0)} y1={m.Y(Mcap)} x2={m.X(8)} y2={m.Y(Mcap)} stroke="#34d399" strokeWidth={1.6} strokeDasharray="6 4" />
              <path d={buildPath(fn, 0, 8, m.X, m.Y, 150)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              {tInf >= 0 && tInf <= 8 && (
                <circle cx={m.X(tInf)} cy={m.Y(Mcap / 2)} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
              )}
              <text x={m.X(6.2)} y={m.Y(Mcap + 0.5)} fill="#6ee7b7" fontSize={11} fontWeight={700}>plafon: M = {Mcap}</text>
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): Rejtett parciális törtek */

export function HiddenRationalCheatDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Álcázott parciális törtek — 3 klasszikus helyettesítés, amely racionális törtet ad!</div>
      <svg viewBox="0 0 560 112" className="plane" role="img" aria-label="Három helyettesítés rejtett parciális törtekhez">
        <rect width={560} height={112} className="pl-bg" />

        <rect x={10} y={12} width={174} height={88} rx={7} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={97} y={34} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>∫ cos x / (sin²x − sin x) dx</text>
        <text x={97} y={58} textAnchor="middle" fill="#fde68a" fontSize={10.5}>u = sin x, du = cos x dx</text>
        <text x={97} y={82} textAnchor="middle" fill="#6ee7b7" fontSize={11}>→ ∫ du / (u(u − 1))</text>

        <rect x={193} y={12} width={174} height={88} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
        <text x={280} y={34} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>∫ eˣ / (e²ˣ − 1) dx</text>
        <text x={280} y={58} textAnchor="middle" fill="#fde68a" fontSize={10.5}>u = eˣ, du = eˣ dx</text>
        <text x={280} y={82} textAnchor="middle" fill="#6ee7b7" fontSize={11}>→ ∫ du / ((u−1)(u+1))</text>

        <rect x={376} y={12} width={174} height={88} rx={7} fill="#0f172a" stroke="#f472b6" strokeWidth={1.5} />
        <text x={463} y={34} textAnchor="middle" fill="#f472b6" fontSize={11} fontWeight={700}>∫ dx / (x − √x)</text>
        <text x={463} y={58} textAnchor="middle" fill="#fde68a" fontSize={10.5}>u = √x, dx = 2u du</text>
        <text x={463} y={82} textAnchor="middle" fill="#6ee7b7" fontSize={11}>→ ∫ 2 du / (u − 1)</text>
      </svg>
    </div>
  );
}
