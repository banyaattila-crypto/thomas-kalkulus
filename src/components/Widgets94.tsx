import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PLine, PPoint } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Autonóm vs. nem autonóm */

export function AutonomousVsNonDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Autonóm (y′ = g(y)) vs. Nem autonóm (y′ = f(x, y)) differenciálegyenlet</div>
      <svg viewBox="0 0 560 148" className="plane" role="img" aria-label="Autonóm és nem autonóm egyenletek">
        <rect width={560} height={148} className="pl-bg" />
        <g transform="translate(12, 12)">
          <rect width={262} height={124} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>AUTONÓM ✓ (nincs x vagy t!)</text>
          <text x={16} y={48} fill="#e2e8f0" fontSize={10.5}>• y′ = y(2 − y)  (logisztikus)</text>
          <text x={16} y={72} fill="#e2e8f0" fontSize={10.5}>• dH/dt = −k(H − 15)  (hűlés)</text>
          <text x={16} y={96} fill="#e2e8f0" fontSize={10.5}>• dv/dt = g − (k/m)v  (esés)</text>
          <text x={16} y={115} fill="#a7f3d0" fontSize={9.5}>Minden vízszintes sorban azonos a meredekség!</text>
        </g>
        <g transform="translate(286, 12)">
          <rect width={262} height={124} rx={8} fill="#0f172a" stroke="#fb7185" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#fb7185" fontSize={11.5} fontWeight={700}>NEM AUTONÓM ✗ (van x vagy t)</text>
          <text x={16} y={48} fill="#e2e8f0" fontSize={10.5}>• y′ = y − x  (függ x-től)</text>
          <text x={16} y={72} fill="#e2e8f0" fontSize={10.5}>• y′ = t·y²  (függ t-től)</text>
          <text x={16} y={96} fill="#e2e8f0" fontSize={10.5}>• y′ = sin(x) + y</text>
          <text x={16} y={115} fill="#fda4af" fontSize={9.5}>Erre NEM rajzolható 1D fázisegyenes!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): 3 stabilitástípus */

export function StabilityTypesDiagram() {
  const cards = [
    {
      title: 'STABIL (vonzó)',
      rule: 'alulról +, felülről −',
      topArr: '↓',
      botArr: '↑',
      color: '#34d399',
      cTop: 'M 14 28 Q 70 48 148 56',
      cBot: 'M 14 90 Q 70 70 148 62',
    },
    {
      title: 'INSTABIL (taszító)',
      rule: 'alulról −, felülről +',
      topArr: '↑',
      botArr: '↓',
      color: '#f87171',
      cTop: 'M 14 55 Q 88 50 148 26',
      cBot: 'M 14 63 Q 88 68 148 92',
    },
    {
      title: 'FÉLIG STABIL',
      rule: 'mindkét oldalon + (v. −)',
      topArr: '↑',
      botArr: '↑',
      color: '#fbbf24',
      cTop: 'M 14 55 Q 88 50 148 26',
      cBot: 'M 14 90 Q 70 70 148 62',
    },
  ];
  return (
    <div className="widget">
      <div className="widget-title">Egyensúlyi pontok osztályozása a fázisegyenes nyilai alapján</div>
      <svg viewBox="0 0 560 142" className="plane" role="img" aria-label="Stabil, instabil és félig stabil egyensúly">
        <rect width={560} height={142} className="pl-bg" />
        {cards.map((c, i) => (
          <g key={c.title} transform={`translate(${12 + i * 182}, 10)`}>
            <rect width={170} height={122} rx={8} fill="#0f172a" stroke={c.color} strokeWidth={1.5} />
            <text x={85} y={18} textAnchor="middle" fill={c.color} fontSize={11} fontWeight={700}>{c.title}</text>
            {/* Egyensúlyi vonal */}
            <line x1={14} y1={59} x2={156} y2={59} stroke={c.color} strokeWidth={1.8} strokeDasharray="5 3" />
            <path d={c.cTop} fill="none" stroke="#38bdf8" strokeWidth={2} />
            <path d={c.cBot} fill="none" stroke="#38bdf8" strokeWidth={2} />
            {/* Fázisnyilak bal oldalon */}
            <text x={150} y={44} fill={c.color} fontSize={14} fontWeight={700}>{c.topArr}</text>
            <text x={150} y={82} fill={c.color} fontSize={14} fontWeight={700}>{c.botArr}</text>
            <text x={85} y={111} textAnchor="middle" fill="#cbd5e1" fontSize={10}>{c.rule}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Teljes fázisegyenes + görbék */

export function PhaseLineToCurvesWidget() {
  const [y0, setY0] = useState(0.5);
  // y' = (y + 1)(2 - y) → egyensúlyok: y = -1 (instabil), y = 2 (stabil); g'(y) = 1 - 2y = 0 → inflexió: y = 0.5
  const g = (y: number) => (y + 1) * (2 - y);
  // RK4 megoldó t ∈ [0, 3]
  const pts: [number, number][] = [[0, y0]];
  let y = y0;
  const h = 0.05;
  for (let i = 1; i <= 60; i++) {
    const k1 = g(y);
    const k2 = g(y + 0.5 * h * k1);
    const k3 = g(y + 0.5 * h * k2);
    const k4 = g(y + h * k3);
    y = y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    if (!Number.isFinite(y) || Math.abs(y) > 8) break;
    pts.push([i * h, y]);
  }
  const dy0 = g(y0);
  const d2y0 = (1 - 2 * y0) * dy0;

  return (
    <div className="widget">
      <div className="widget-title">Teljes fázisegyenes és megoldásgörbe: y′ = (y + 1)(2 − y)</div>
      <label>
        kezdeti érték: y(0) = {round(y0, 2)} (y′ = {round(dy0, 2)}, y″ = {round(d2y0, 2)})
        <input type="range" min={-1.6} max={3.4} step={0.1} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
      </label>
      <Plane xmin={-0.3} xmax={3.2} ymin={-2.2} ymax={3.6}>
        {(m) => (
          <>
            <PLine map={m} k={0} b={2} cls="pl-ok" />
            <PLine map={m} k={0} b={-1} cls="pl-alt" />
            <PLine map={m} k={0} b={0.5} cls="pl-dash2" />
            <path
              d={pts.map(([tx0, ty0], i) => `${i === 0 ? 'M' : 'L'}${m.X(tx0).toFixed(1)},${m.Y(ty0).toFixed(1)}`).join(' ')}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={2.8}
            />
            <PPoint map={m} x={0} y={y0} color="#fbbf24" label={`y₀=${round(y0, 1)}`} dx={10} dy={-8} />
            <text x={m.X(2.4)} y={m.Y(2) - 6} fill="#34d399" fontSize={11} fontWeight={700}>y = 2 (stabil)</text>
            <text x={m.X(2.15)} y={m.Y(0.5) - 6} fill="#94a3b8" fontSize={10.5}>y = 0,5 (inflexió)</text>
            <text x={m.X(2.3)} y={m.Y(-1) + 14} fill="#fb923c" fontSize={11} fontWeight={700}>y = −1 (instabil)</text>
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          Próbáld ki <M t="y_0 = -0{,}8" /> (S-görbe áthajlik <M t="y=0{,}5" />-nél!), <M t="y_0 = 3" /> (fentről csökken <M t="2" />-höz), és <M t="y_0 = -1{,}2" /> (elrohan <M t="-\infty" />-be)!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Hűlő leves (Newton-hűlés) */

export function CoolingPhaseWidget() {
  const [h0, setH0] = useState(80);
  // dH/dt = -0.25*(H - 20) → H(t) = 20 + (H0 - 20)*e^(-0.25t)
  const H = (t: number) => 20 + (h0 - 20) * Math.exp(-0.25 * t);

  return (
    <div className="widget">
      <div className="widget-title">Newton-féle hűlési törvény (Thomas 3. példa): dH/dt = −0,25(H − 20)</div>
      <label>
        kezdőhőmérséklet: H(0) = {h0} °C (szobahőmérséklet: Hs = 20 °C)
        <input type="range" min={0} max={90} step={5} value={h0} onChange={(e) => setH0(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={16} ymin={0} ymax={95}>
        {(m) => (
          <>
            <PLine map={m} k={0} b={20} cls="pl-ok" />
            <PFunc map={m} fn={H} from={0} to={16} cls="pl-main" />
            <PPoint map={m} x={0} y={h0} color="#fbbf24" label={`${h0}°C`} dx={8} dy={-6} />
            <text x={m.X(11)} y={m.Y(20) - 8} fill="#34d399" fontSize={11.5} fontWeight={700}>Hs = 20 °C (stabil)</text>
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          {h0 > 20
            ? 'Forró leves (H₀ > 20°C): csökkenő és konvex (H′ < 0, H″ > 0) — egyre lassabban hűl 20 °C-ra!'
            : h0 < 20
              ? 'Hideg üdítő (H₀ < 20°C): növekvő és konkáv (H′ > 0, H″ < 0) — lassulva melegszik 20 °C-ra!'
              : 'Pontosan 20 °C-on egyensúlyban van (H′ = 0): a hőmérséklet nem változik!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Szabadesés végsebességgel */

export function TerminalVelocityWidget() {
  const [v0, setV0] = useState(0);
  // dv/dt = 10 - 0.2*v → v_inf = 50 m/s, v(t) = 50 + (v0 - 50)*e^(-0.2t)
  const v = (t: number) => 50 + (v0 - 50) * Math.exp(-0.2 * t);

  return (
    <div className="widget">
      <div className="widget-title">Szabadesés közegellenállással (Thomas 4. példa): dv/dt = 10 − 0,2v</div>
      <label>
        kezdősebesség: v(0) = {v0} m/s (végsebesség: v∞ = mg/k = 50 m/s)
        <input type="range" min={0} max={85} step={5} value={v0} onChange={(e) => setV0(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={20} ymin={0} ymax={90}>
        {(m) => (
          <>
            <PLine map={m} k={0} b={50} cls="pl-ok" />
            <PFunc map={m} fn={v} from={0} to={20} cls="pl-main" />
            <PPoint map={m} x={0} y={v0} color="#fbbf24" label={`v₀=${v0}`} dx={8} dy={-6} />
            <text x={m.X(12)} y={m.Y(50) - 8} fill="#34d399" fontSize={11.5} fontWeight={700}>v∞ = 50 m/s (stabil)</text>
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          Akár <M t="v_0 = 0" />-ról indul (gyorsulva), akár <M t="v_0 = 80" /> m/s-ról (pl. ejtőernyő nyitásakor fékeződve!), a sebesség mindig a <M t="v_\infty = 50" /> m/s <strong>végsebességhez</strong> tart!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Logisztikus növekedés */

export function LogisticPhaseWidget() {
  const [p0, setP0] = useState(0.4);
  // dP/dt = 0.5*P*(4 - P) → M = 4, M/2 = 2. Exact: P(t) = 4 / (1 + ((4-p0)/p0)*e^(-2t))
  const P = (t: number) => 4 / (1 + ((4 - p0) / p0) * Math.exp(-2 * t));

  return (
    <div className="widget">
      <div className="widget-title">Logisztikus növekedés (Thomas 5. példa): dP/dt = 0,5 P(4 − P)</div>
      <label>
        kezdőpopuláció: P(0) = {round(p0, 1)} (eltartóképesség: M = 4, inflexiós szint: M/2 = 2)
        <input type="range" min={0.2} max={6.0} step={0.2} value={p0} onChange={(e) => setP0(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={4.5} ymin={-0.3} ymax={6.4}>
        {(m) => (
          <>
            <PLine map={m} k={0} b={4} cls="pl-ok" />
            <PLine map={m} k={0} b={2} cls="pl-dash2" />
            <PLine map={m} k={0} b={0} cls="pl-alt" />
            <PFunc map={m} fn={P} from={0} to={4.5} cls="pl-main" />
            <PPoint map={m} x={0} y={p0} color="#fbbf24" label={`P₀=${round(p0, 1)}`} dx={8} dy={-6} />
            <text x={m.X(2.8)} y={m.Y(4) - 7} fill="#34d399" fontSize={11} fontWeight={700}>M = 4 (stabil)</text>
            <text x={m.X(2.7)} y={m.Y(2) - 6} fill="#94a3b8" fontSize={10.5}>M/2 = 2 (inflexió!)</text>
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          {p0 < 2
            ? 'P₀ < M/2: klasszikus S-görbe! Először gyorsulva (konvex), majd M/2 = 2-nél átfordulva lassulva (konkáv) tart M = 4-hez!'
            : p0 < 4
              ? 'M/2 ≤ P₀ < M: nincs inflexió, azonnal lassulva (konkáv módon) tart M = 4-hez!'
              : p0 > 4
                ? 'P₀ > M (túlnépesedés): a populáció konvex íven csökken vissza M = 4-re!'
                : 'P₀ = M = 4: stabil egyensúlyi állandó megoldás!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (7. ábra): g(P) = rP(M-P) parabola */

export function LogisticDerivativeDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Miért pontosan P = M/2-nél a leggyorsabb a logisztikus növekedés?</div>
      <Plane xmin={-0.4} xmax={5.2} ymin={-1.5} ymax={2.6}>
        {(m) => (
          <>
            <PFunc map={m} fn={(p) => 0.5 * p * (4 - p)} from={-0.3} to={4.8} cls="pl-main" />
            <PPoint map={m} x={0} y={0} color="#f87171" label="0 (instabil)" dx={6} dy={16} />
            <PPoint map={m} x={2} y={2} color="#fbbf24" label="M/2 = 2 (MAX sebesség!)" dx={-62} dy={-12} />
            <PPoint map={m} x={4} y={0} color="#34d399" label="M = 4 (stabil)" dx={6} dy={-10} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t="g(P) = rP(M-P) \text{ maximuma a parabola csúcsánál, } P = \frac{M}{2}\text{-nél van!}" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): 5 lépéses fázisegyenes-recept */

export function PhaseLineStepsDiagram() {
  const steps = [
    { n: '1. Egyensúlyok', t: 'g(y) = 0', s: 'vízszintes egyenesek', c: '#38bdf8' },
    { n: '2. Monotonitás', t: 'g(y) előjele', s: '+ (↗) és − (↘)', c: '#34d399' },
    { n: '3. Stabilitás', t: 'nyilak iránya', s: 'stabil / inst. / félig', c: '#fbbf24' },
    { n: '4. Konvexitás', t: 'y″ = g′(y)·g(y)', s: 'inflexiós szintek', c: '#fb923c' },
    { n: '5. Görbevázlat', t: 'sávonként rajz', s: 'integrálás nélkül!', c: '#38bdf8' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">Autonóm differenciálegyenletek grafikus elemzésének 5 lépése</div>
      <svg viewBox="0 0 560 96" className="plane" role="img" aria-label="Fázisegyenes 5 lépése">
        <rect width={560} height={96} className="pl-bg" />
        {steps.map((st, i) => {
          const x = 10 + i * 109;
          return (
            <g key={st.n} transform={`translate(${x}, 12)`}>
              <rect width={102} height={72} rx={8} fill="#0f172a" stroke={st.c} strokeWidth={1.5} />
              <text x={51} y={20} textAnchor="middle" fill={st.c} fontSize={10.8} fontWeight={700}>{st.n}</text>
              <text x={51} y={40} textAnchor="middle" fill="#e2e8f0" fontSize={10.3}>{st.t}</text>
              <text x={51} y={58} textAnchor="middle" fill="#94a3b8" fontSize={9.2}>{st.s}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
