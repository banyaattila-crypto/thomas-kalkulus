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
  steps = 150,
) {
  let d = '';
  let pen = false;
  for (let i = 0; i <= steps; i++) {
    const x = xmin + ((xmax - xmin) * i) / steps;
    const y = fn(x);
    if (!Number.isFinite(y) || Math.abs(y) > 80) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
    pen = true;
  }
  return d;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Lineáris vs. Nemlineáris */

export function LinearVsNonlinearDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Lineáris vagy nemlineáris? A standard alak: y&apos; + P(x)y = Q(x)</div>
      <svg viewBox="0 0 560 156" className="plane" role="img" aria-label="Lineáris és nemlineáris differenciálegyenletek">
        <rect width={560} height={156} className="pl-bg" />

        <g transform="translate(12, 12)">
          <rect width={262} height={132} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>LINEÁRIS ✓ (y és y&apos; 1. hatványon)</text>
          <text x={16} y={48} fill="#e2e8f0" fontSize={10.2}>• x y&apos; − 3y = x²  ⇒  P = −3/x, Q = x</text>
          <text x={16} y={74} fill="#e2e8f0" fontSize={10.2}>• y&apos; + (cos x)y = eˣ  (x lehet bonyolult!)</text>
          <text x={16} y={100} fill="#e2e8f0" fontSize={10.2}>• L i&apos; + R i = V  (RL-áramkör)</text>
          <text x={16} y={122} fill="#a7f3d0" fontSize={9.5}>Az x-függvények BÁRMIK lehetnek!</text>
        </g>

        <g transform="translate(286, 12)">
          <rect width={262} height={132} rx={8} fill="#0f172a" stroke="#fb7185" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#fb7185" fontSize={11.5} fontWeight={700}>NEMLINEÁRIS ✗ (tiltott y-tagok)</text>
          <text x={16} y={48} fill="#e2e8f0" fontSize={10.2}>• y&apos; + y² = x  (y négyzetre emelve)</text>
          <text x={16} y={74} fill="#e2e8f0" fontSize={10.2}>• y · y&apos; = 2x  (y és y&apos; szorzata)</text>
          <text x={16} y={100} fill="#e2e8f0" fontSize={10.2}>• y&apos; + sin(y) = 0  (y függvény belsejében)</text>
          <text x={16} y={122} fill="#fda4af" fontSize={9.5}>Ezekre NEM működik az integráló tényező!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Integráló tényező 4 lépése */

export function IntegratingFactorFlowDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Az integráló tényező 4 lépéses mesterreceptje</div>
      <svg viewBox="0 0 560 148" className="plane" role="img" aria-label="Integráló tényező 4 lépése">
        <rect width={560} height={148} className="pl-bg" />

        <g transform="translate(10, 18)">
          <rect width={122} height={110} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={61} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>1. Standard alak</text>
          <text x={61} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>y&apos; + P(x)y = Q(x)</text>
          <text x={61} y={76} textAnchor="middle" fill="#fb7185" fontSize={9.2}>y&apos; együtthatója</text>
          <text x={61} y={92} textAnchor="middle" fill="#fb7185" fontSize={9.2}>kötelezően 1!</text>
        </g>

        <path d="M135,73 L149,73" stroke="#64748b" strokeWidth={2} />
        <polygon points="149,69 156,73 149,77" fill="#64748b" />

        <g transform="translate(158, 18)">
          <rect width={120} height={110} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.5} />
          <text x={60} y={22} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={700}>2. Int. tényező</text>
          <text x={60} y={50} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>v(x) = e^(∫P dx)</text>
          <text x={60} y={78} textAnchor="middle" fill="#94a3b8" fontSize={9}>Elég a +0 konstans</text>
          <text x={60} y={94} textAnchor="middle" fill="#94a3b8" fontSize={9}>a kitevőben!</text>
        </g>

        <path d="M281,73 L295,73" stroke="#64748b" strokeWidth={2} />
        <polygon points="295,69 302,73 295,77" fill="#64748b" />

        <g transform="translate(304, 18)">
          <rect width={118} height={110} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={59} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>3. Szorzatszabály</text>
          <text x={59} y={50} textAnchor="middle" fill="#a7f3d0" fontSize={10.5}>(v · y)&apos; = v · Q</text>
          <text x={59} y={78} textAnchor="middle" fill="#e2e8f0" fontSize={9.2}>Mindkét oldal</text>
          <text x={59} y={94} textAnchor="middle" fill="#e2e8f0" fontSize={9.2}>integrálása!</text>
        </g>

        <path d="M425,73 L439,73" stroke="#64748b" strokeWidth={2} />
        <polygon points="439,69 446,73 439,77" fill="#64748b" />

        <g transform="translate(448, 18)">
          <rect width={102} height={110} rx={8} fill="#0f172a" stroke="#a78bfa" strokeWidth={1.5} />
          <text x={51} y={22} textAnchor="middle" fill="#a78bfa" fontSize={11} fontWeight={700}>4. Osztás v-vel</text>
          <text x={51} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={9.8}>y = (∫vQ + C) / v</text>
          <text x={51} y={78} textAnchor="middle" fill="#fbbf24" fontSize={9}>A +C-t is oszd</text>
          <text x={51} y={94} textAnchor="middle" fill="#fbbf24" fontSize={9}>el v(x)-szel!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Tranziens vs. állandósult */

export function TransientVsSteadyWidget() {
  const [y0, setY0] = useState(5.0);
  const sol = (t: number) => 2 + (y0 - 2) * Math.exp(-2 * t);

  return (
    <div className="widget">
      <div className="widget-title">
        Állandósult állapot vs. tranziens tag: <M t="y' + 2y = 4 \implies y(t) = 2 + (y_0 - 2)e^{-2t}" />
      </div>
      <div className="widget-controls" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ fontSize: 13 }}>
          Kezdeti érték y(0) = <strong>{round(y0, 1)}</strong>{' '}
          <input type="range" min={-2} max={6} step={0.5} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={-0.1} xmax={3.2} ymin={-2.2} ymax={6.2} w={560} h={185}>
        {({ X, Y }) => (
          <>
            {[-1, 0, 1, 3.5, 5].map((yy) => (
              <path
                key={yy}
                d={buildPath((t) => 2 + (yy - 2) * Math.exp(-2 * t), 0, 3.2, X, Y)}
                fill="none"
                stroke="#475569"
                strokeWidth={1.2}
              />
            ))}
            <line x1={X(0)} x2={X(3.2)} y1={Y(2)} y2={Y(2)} stroke="#34d399" strokeDasharray="5 4" strokeWidth={1.8} />
            <path d={buildPath(sol, 0, 3.2, X, Y)} fill="none" stroke="#38bdf8" strokeWidth={2.7} />
            <circle cx={X(0)} cy={Y(y0)} r={4.5} fill="#fbbf24" />
            <text x={X(2.1)} y={Y(2) - 8} fill="#34d399" fontSize={10.5} fontWeight={700}>
              y = 2 (állandósult)
            </text>
          </>
        )}
      </Chart>
      <div className="widget-note">
        Akárhonnan indulsz, a C·e⁻²ᵗ tranziens tag elhal, és minden megoldás a zöld y = 2 egyensúlyhoz simul!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): RL-áramkör szimulátor */

export function RLCircuitSimulatorWidget() {
  const [V, setV] = useState(12);
  const [R, setR] = useState(4);
  const [L, setL] = useState(2);

  const Iinf = V / R;
  const tau = L / R;
  const iFn = (t: number) => Iinf * (1 - Math.exp(-t / tau));
  const tMax = Math.max(3, 5 * tau);

  return (
    <div className="widget">
      <div className="widget-title">
        RL-áramkör: <M t="L\frac{di}{dt} + Ri = V \implies i(t) = \frac{V}{R}(1 - e^{-t/\tau})" />
      </div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <label style={{ fontSize: 12.5 }}>
          V = {V} V <input type="range" min={6} max={24} step={2} value={V} onChange={(e) => setV(Number(e.target.value))} />
        </label>
        <label style={{ fontSize: 12.5 }}>
          R = {R} Ω <input type="range" min={2} max={10} step={1} value={R} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label style={{ fontSize: 12.5 }}>
          L = {L} H <input type="range" min={1} max={6} step={0.5} value={L} onChange={(e) => setL(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={tMax} ymin={-0.2} ymax={Math.max(4, Iinf * 1.2)} w={560} h={185}>
        {({ X, Y }) => (
          <>
            <line x1={X(0)} x2={X(tMax)} y1={Y(Iinf)} y2={Y(Iinf)} stroke="#34d399" strokeDasharray="5 4" strokeWidth={1.6} />
            <path d={buildPath(iFn, 0, tMax, X, Y)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
            {[1, 2, 3].map((k) => (
              <g key={k}>
                <line x1={X(k * tau)} x2={X(k * tau)} y1={Y(0)} y2={Y(iFn(k * tau))} stroke="#fbbf24" strokeDasharray="3 3" />
                <circle cx={X(k * tau)} cy={Y(iFn(k * tau))} r={4} fill="#fbbf24" />
                <text x={X(k * tau) + 3} y={Y(iFn(k * tau)) - 6} fill="#fde68a" fontSize={9.5}>
                  {k}τ ({Math.round((1 - Math.exp(-k)) * 100)}%)
                </text>
              </g>
            ))}
          </>
        )}
      </Chart>
      <div className="widget-note">
        Egyensúlyi áram: I = V/R = <strong>{round(Iinf, 2)} A</strong> · Időállandó: τ = L/R = <strong>{round(tau, 2)} s</strong> (3τ = {round(3 * tau, 2)} s alatt eléri a 95%-ot!).
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Keverési tartály szimulátor */

export function MixingTankSimulatorWidget() {
  const [y0, setY0] = useState(0);
  const [cIn, setCIn] = useState(0.2);
  // V = 100 L, r = 5 L/perc => dy/dt + 0.05 y = 5*cIn => yEq = 100*cIn
  const yEq = 100 * cIn;
  const yFn = (t: number) => yEq + (y0 - yEq) * Math.exp(-0.05 * t);

  return (
    <div className="widget">
      <div className="widget-title">Sóoldat-keverés (V = 100 L, r = 5 L/perc be és ki)</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <label style={{ fontSize: 13 }}>
          Kezdeti só y₀ = <strong>{y0} kg</strong>{' '}
          <input type="range" min={0} max={40} step={2} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
        </label>
        <label style={{ fontSize: 13 }}>
          Befolyó töménység c = <strong>{round(cIn, 2)} kg/L</strong>{' '}
          <input type="range" min={0} max={0.4} step={0.05} value={cIn} onChange={(e) => setCIn(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={80} ymin={-1} ymax={44} w={560} h={185}>
        {({ X, Y }) => (
          <>
            <line x1={X(0)} x2={X(80)} y1={Y(yEq)} y2={Y(yEq)} stroke="#34d399" strokeDasharray="5 4" strokeWidth={1.6} />
            <path d={buildPath(yFn, 0, 80, X, Y)} fill="none" stroke="#f59e0b" strokeWidth={2.6} />
            <circle cx={X(0)} cy={Y(y0)} r={4.5} fill="#fbbf24" />
            <text x={X(54)} y={Y(yEq) - 7} fill="#34d399" fontSize={10}>
              egyensúly: {round(yEq, 1)} kg
            </text>
          </>
        )}
      </Chart>
      <div className="widget-note">
        <M t={`y(t) = ${tx(yEq, 1)} + (${tx(y0 - yEq, 1)})e^{-t/20}`} /> · 20 perc múlva: <strong>{round(yFn(20), 2)} kg</strong> só van a tartályban.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Homogén + Inhomogén szerkezet */

export function HomogeneousInhomogeneousDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A lineáris megoldás univerzális szerkezete: y = yₚ + yₕ</div>
      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Általános megoldás felbontása partikuláris és homogén részre">
        <rect width={560} height={132} className="pl-bg" />

        <g transform="translate(14, 16)">
          <rect width={154} height={100} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={77} y={24} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Általános megoldás</text>
          <text x={77} y={54} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>i(t) = V/R + C e^(−Rt/L)</text>
          <text x={77} y={80} textAnchor="middle" fill="#94a3b8" fontSize={10}>y(x) = −x² + C x³</text>
        </g>

        <text x={184} y={70} textAnchor="middle" fill="#fbbf24" fontSize={18} fontWeight={700}>=</text>

        <g transform="translate(200, 16)">
          <rect width={158} height={100} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={79} y={24} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>Partikuláris rész (yₚ)</text>
          <text x={79} y={54} textAnchor="middle" fill="#a7f3d0" fontSize={11.5}>V/R  vagy  −x²</text>
          <text x={79} y={80} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>A külső hatás (Q) válasza</text>
        </g>

        <text x={374} y={70} textAnchor="middle" fill="#fbbf24" fontSize={18} fontWeight={700}>+</text>

        <g transform="translate(390, 16)">
          <rect width={156} height={100} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.6} />
          <text x={78} y={24} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={700}>Homogén rész (yₕ)</text>
          <text x={78} y={54} textAnchor="middle" fill="#fde68a" fontSize={11.5}>C e^(−Rt/L)  vagy  C x³</text>
          <text x={78} y={80} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>A Q = 0 egyenlet megoldása</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): Bernoulli-átalakítás */

export function BernoulliTransformDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A Bernoulli-egyenlet linearizálása: u = y¹⁻ⁿ</div>
      <svg viewBox="0 0 560 124" className="plane" role="img" aria-label="Bernoulli egyenlet átalakítása lineárissá">
        <rect width={560} height={124} className="pl-bg" />

        <g transform="translate(12, 16)">
          <rect width={154} height={92} rx={8} fill="#0f172a" stroke="#fb7185" strokeWidth={1.6} />
          <text x={77} y={22} textAnchor="middle" fill="#fb7185" fontSize={11} fontWeight={700}>Bernoulli (nemlineáris)</text>
          <text x={77} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={11}>y&apos; + P(x)y = Q(x)yⁿ</text>
          <text x={77} y={74} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>pl. y&apos; − y = e⁻ˣ y² (n=2)</text>
        </g>

        <path d="M169,62 L195,62" stroke="#fbbf24" strokeWidth={2} />
        <polygon points="195,58 202,62 195,66" fill="#fbbf24" />
        <text x={184} y={52} textAnchor="middle" fill="#fbbf24" fontSize={9.5} fontWeight={700}>u=y¹⁻ⁿ</text>

        <g transform="translate(204, 16)">
          <rect width={180} height={92} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={90} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>Lineáris egyenlet u-ra!</text>
          <text x={90} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>u&apos; + (1−n)P u = (1−n)Q</text>
          <text x={90} y={74} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>u&apos; + u = −e⁻ˣ ⇒ u=(C−x)e⁻ˣ</text>
        </g>

        <path d="M387,62 L413,62" stroke="#34d399" strokeWidth={2} />
        <polygon points="413,58 420,62 413,66" fill="#34d399" />

        <g transform="translate(422, 16)">
          <rect width={126} height={92} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={63} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>Vissza y-ra!</text>
          <text x={63} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={11}>y = u^(1/(1−n))</text>
          <text x={63} y={74} textAnchor="middle" fill="#6ee7b7" fontSize={10}>y = eˣ / (C − x)</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. oldal (8. ábra): 9.1–9.3 döntési térkép */

export function FirstOrderDEChoiceDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Elsőrendű differenciálegyenletek stratégiai térképe (9.1–9.3)</div>
      <svg viewBox="0 0 560 144" className="plane" role="img" aria-label="Elsőrendű differenciálegyenletek stratégiai térképe">
        <rect width={560} height={144} className="pl-bg" />

        <g transform="translate(12, 16)">
          <rect width={126} height={110} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={63} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>1. Szeparábilis?</text>
          <text x={63} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10}>y&apos; = g(x)·H(y)</text>
          <text x={63} y={76} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>9.1: szétválasztás</text>
          <text x={63} y={94} textAnchor="middle" fill="#94a3b8" fontSize={9}>(+ H=0 egyensúly)</text>
        </g>

        <g transform="translate(148, 16)">
          <rect width={126} height={110} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={63} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>2. Lineáris?</text>
          <text x={63} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10}>y&apos; + P(x)y = Q(x)</text>
          <text x={63} y={76} textAnchor="middle" fill="#bae6fd" fontSize={9.5}>9.2: v = e^(∫P dx)</text>
          <text x={63} y={94} textAnchor="middle" fill="#94a3b8" fontSize={9}>(vy)&apos; = vQ</text>
        </g>

        <g transform="translate(284, 16)">
          <rect width={126} height={110} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.5} />
          <text x={63} y={22} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={700}>3. Bernoulli?</text>
          <text x={63} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10}>y&apos; + Py = Q yⁿ</text>
          <text x={63} y={76} textAnchor="middle" fill="#fde68a" fontSize={9.5}>9.2: u = y¹⁻ⁿ</text>
          <text x={63} y={94} textAnchor="middle" fill="#94a3b8" fontSize={9}>vissza lineárisra!</text>
        </g>

        <g transform="translate(420, 16)">
          <rect width={128} height={110} rx={8} fill="#0f172a" stroke="#a78bfa" strokeWidth={1.5} />
          <text x={64} y={22} textAnchor="middle" fill="#a78bfa" fontSize={11} fontWeight={700}>4. Egyik sem?</text>
          <text x={64} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Általános y&apos;=f(x,y)</text>
          <text x={64} y={76} textAnchor="middle" fill="#c4b5fd" fontSize={9.5}>9.3: Euler-módszer</text>
          <text x={64} y={94} textAnchor="middle" fill="#94a3b8" fontSize={9}>és iránymező!</text>
        </g>
      </svg>
    </div>
  );
}
