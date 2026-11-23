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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): y = y0 * e^(kt) szimulátor */

export function ExpChangeLawWidget() {
  const [y0, setY0] = useState(2.0);
  const [k, setK] = useState(0.35);
  const t0 = 2.0;
  const yt = y0 * Math.exp(k * t0);
  const slope = k * yt;

  return (
    <div className="widget">
      <div className="widget-title">Az exponenciális változás törvénye: y(t) = y₀ · eᵏᵗ (ahol y′ = k·y)</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Kezdeti érték: <M t={`y_0 = ${tx(y0, 1)}`} />
          <input type="range" min={0.5} max={4.0} step={0.5} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
        </label>
        <label>
          Növekedési / csökkenési ráta: <M t={`k = ${tx(k, 2)}`} />
          <input type="range" min={-0.6} max={0.6} step={0.05} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={5.0} ymin={0} ymax={9.5} h={210}>
        {(m) => {
          const dCurve = buildPath((t) => y0 * Math.exp(k * t), 0, 5.0, m.X, m.Y, 160);
          const span = 0.85;
          return (
            <>
              <path
                d={dCurve}
                fill="none"
                stroke={k > 0.01 ? '#38bdf8' : k < -0.01 ? '#f87171' : '#fbbf24'}
                strokeWidth={2.7}
              />
              {/* Érintő t0 = 2-nél */}
              <line
                x1={m.X(t0 - span)}
                y1={m.Y(yt - slope * span)}
                x2={m.X(t0 + span)}
                y2={m.Y(yt + slope * span)}
                stroke="#34d399"
                strokeWidth={2}
              />
              <circle cx={m.X(0)} cy={m.Y(y0)} r={4.8} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.3} />
              <circle cx={m.X(t0)} cy={m.Y(Math.min(9.5, yt))} r={5.2} fill="#34d399" stroke="#0f172a" strokeWidth={1.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          A <M t="t = 2" /> pillanatban <M t={`y(2) = ${tx(yt, 2)}`} />, az érintő meredeksége pedig pontosan{' '}
          <M t={`y'(2) = k\\cdot y(2) = (${tx(k, 2)})\\cdot ${tx(yt, 2)} = \\mathbf{${tx(slope, 2)}}`} />!
          {k > 0.01 ? ' (Exponenciális növekedés)' : k < -0.01 ? ' (Exponenciális csökkenés)' : ' (Állandó egyensúly)'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Duplázódás vs. járvány-csökkenés */

export function DoublingAndDecayWidget() {
  const [mode, setMode] = useState<'grow' | 'disease'>('grow');
  const [T2, setT2] = useState(2.0); // duplázódási idő
  const [dropPct, setDropPct] = useState(20); // évi csökkenés %

  const kGrow = Math.LN2 / T2;
  const kDis = Math.log(1 - dropPct / 100);
  const tTo1000 = Math.log(0.1) / kDis;

  return (
    <div className="widget">
      <div className="widget-title">Duplázódási idő (baktériumok) és járvány visszaszorítása (Thomas 1. példa)</div>
      <div className="relbuttons chips">
        <button type="button" className={mode === 'grow' ? 'on' : ''} onClick={() => setMode('grow')}>
          1. Duplázódás: T₂ = ln 2 / k
        </button>
        <button type="button" className={mode === 'disease' ? 'on' : ''} onClick={() => setMode('disease')}>
          2. Betegség csökkenése (10 000 → 1 000)
        </button>
      </div>

      {mode === 'grow' ? (
        <>
          <label>
            Duplázódási idő: <strong>T₂ = {round(T2, 1)} óra</strong> (<M t={`k = \\ln 2 / ${tx(T2, 1)} = ${tx(kGrow, 3)}`} />)
            <input type="range" min={1.0} max={4.0} step={0.5} value={T2} onChange={(e) => setT2(Number(e.target.value))} />
          </label>
          <Chart xmin={0} xmax={8.5} ymin={0} ymax={9.0} h={200}>
            {(m) => {
              const dCurve = buildPath((t) => Math.exp(kGrow * t), 0, 8.5, m.X, m.Y, 150);
              const marks = [0, 1, 2, 3].map((j) => ({ t: j * T2, y: 2 ** j })).filter((p) => p.t <= 8.5);
              return (
                <>
                  <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
                  {marks.map((p, i) => (
                    <g key={i}>
                      <line x1={m.X(p.t)} y1={m.Y(0)} x2={m.X(p.t)} y2={m.Y(p.y)} stroke="#fbbf24" strokeWidth={1.3} strokeDasharray="3 3" />
                      <circle cx={m.X(p.t)} cy={m.Y(p.y)} r={4.8} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.3} />
                    </g>
                  ))}
                </>
              );
            }}
          </Chart>
          <div className="result">
            <p>
              Minden <strong>{round(T2, 1)} órában</strong> megduplázódik az állomány: <M t="1 \to 2 \to 4 \to 8" /> (a kiinduló{' '}
              <M t="y_0" /> mennyiségtől teljesen függetlenül!).
            </p>
          </div>
        </>
      ) : (
        <>
          <label>
            Éves csökkenés: <strong>{dropPct}% / év</strong> (megmarad: {100 - dropPct}% ⇒{' '}
            <M t={`k = \\ln(${tx(1 - dropPct / 100, 2)}) = ${tx(kDis, 3)}`} />)
            <input type="range" min={10} max={50} step={5} value={dropPct} onChange={(e) => setDropPct(Number(e.target.value))} />
          </label>
          <Chart xmin={0} xmax={24} ymin={0} ymax={11} h={200}>
            {(m) => {
              const dCurve = buildPath((t) => 10 * Math.exp(kDis * t), 0, 24, m.X, m.Y, 160);
              return (
                <>
                  <line x1={m.X(0)} y1={m.Y(1)} x2={m.X(24)} y2={m.Y(1)} stroke="#34d399" strokeWidth={1.6} strokeDasharray="5 4" />
                  <path d={dCurve} fill="none" stroke="#f87171" strokeWidth={2.5} />
                  {tTo1000 <= 24 && (
                    <>
                      <line x1={m.X(tTo1000)} y1={m.Y(0)} x2={m.X(tTo1000)} y2={m.Y(1)} stroke="#fbbf24" strokeWidth={1.6} strokeDasharray="4 3" />
                      <circle cx={m.X(tTo1000)} cy={m.Y(1)} r={5.2} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
                    </>
                  )}
                  <text x={m.X(20)} y={m.Y(1.45)} fill="#6ee7b7" fontSize={11} fontWeight={700}>cél: 1 ezer</text>
                </>
              );
            }}
          </Chart>
          <div className="result">
            <p>
              10 000 betegről 1 000-re való csökkenés ideje:{' '}
              <strong>
                <M t={`t = \\dfrac{\\ln 0{,}1}{\\ln(${tx(1 - dropPct / 100, 2)})} \\approx ${tx(tTo1000, 2)}`} /> év
              </strong>
              {dropPct === 20 && ' (Pontosan Thomas 1. példája: 10,32 év!)'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Folytonos kamatozás */

export function ContinuousInterestWidget() {
  const [ratePct, setRatePct] = useState(8);
  const [years, setYears] = useState(15);
  const r = ratePct / 100;
  const A0 = 1000;
  const simple = A0 * (1 + r * years);
  const annual = A0 * (1 + r) ** years;
  const cont = A0 * Math.exp(r * years);
  const tDouble = Math.LN2 / r;

  return (
    <div className="widget">
      <div className="widget-title">Folytonos kamatozás (A = A₀·eʳᵗ) vs. egyszerű és éves kamat (A₀ = 1 000 €)</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Éves kamatláb: <strong>r = {ratePct}%</strong> (duplázódás: ~{round(tDouble, 1)} év)
          <input type="range" min={2} max={15} step={1} value={ratePct} onChange={(e) => setRatePct(Number(e.target.value))} />
        </label>
        <label>
          Futamidő: <strong>t = {years} év</strong>
          <input type="range" min={1} max={25} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={26} ymin={0} ymax={12} h={205}>
        {(m) => {
          const dSimple = buildPath((t) => 1 + r * t, 0, 25, m.X, m.Y, 60);
          const dAnnual = buildPath((t) => (1 + r) ** t, 0, 25, m.X, m.Y, 120);
          const dCont = buildPath((t) => Math.exp(r * t), 0, 25, m.X, m.Y, 140);
          return (
            <>
              <path d={dSimple} fill="none" stroke="#94a3b8" strokeWidth={1.8} strokeDasharray="5 4" />
              <path d={dAnnual} fill="none" stroke="#fbbf24" strokeWidth={2.2} />
              <path d={dCont} fill="none" stroke="#34d399" strokeWidth={2.6} />
              <line x1={m.X(years)} y1={m.Y(0)} x2={m.X(years)} y2={m.Y(Math.min(12, cont / 1000))} stroke="#38bdf8" strokeWidth={1.3} strokeDasharray="3 3" />
              <circle cx={m.X(years)} cy={m.Y(Math.min(12, cont / 1000))} r={5} fill="#34d399" stroke="#0f172a" strokeWidth={1.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>{years} év után:</strong>{' '}
          <span style={{ color: '#cbd5e1' }}>Egyszerű: {Math.round(simple)} €</span> ·{' '}
          <span style={{ color: '#fde68a' }}>Éves tőkésítés: {Math.round(annual)} €</span> ·{' '}
          <span style={{ color: '#6ee7b7', fontWeight: 700 }}>Folytonos (eʳᵗ): {Math.round(cont)} €</span> (tengely: ezer €).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Radioaktív felezési idő */

export function HalfLifeDecayWidget() {
  const [halfLives, setHalfLives] = useState(1.5);
  const frac = 0.5 ** halfLives;
  const totalDots = 40;
  const aliveDots = Math.round(totalDots * frac);

  return (
    <div className="widget">
      <div className="widget-title">Radioaktív bomlás: minden T₁/₂ felezési idő után a megmaradt atomok FELE elbomlik!</div>
      <label>
        Eltelt idő felezési időkben: <strong>t = {round(halfLives, 2)} · T₁/₂</strong> ⇒ megmaradt arány:{' '}
        <strong>{round(frac * 100, 1)}%</strong>
        <input type="range" min={0} max={4.5} step={0.25} value={halfLives} onChange={(e) => setHalfLives(Number(e.target.value))} />
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '10px', alignItems: 'center' }}>
        <Chart xmin={0} xmax={4.6} ymin={0} ymax={1.1} w={330} h={190}>
          {(m) => {
            const dCurve = buildPath((u) => 0.5 ** u, 0, 4.6, m.X, m.Y, 140);
            return (
              <>
                <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
                {[1, 2, 3, 4].map((n) => (
                  <g key={n}>
                    <line x1={m.X(n)} y1={m.Y(0)} x2={m.X(n)} y2={m.Y(0.5 ** n)} stroke="#64748b" strokeWidth={1.2} strokeDasharray="3 3" />
                    <circle cx={m.X(n)} cy={m.Y(0.5 ** n)} r={3.6} fill="#34d399" />
                  </g>
                ))}
                <circle cx={m.X(halfLives)} cy={m.Y(frac)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
              </>
            );
          }}
        </Chart>

        <svg viewBox="0 0 210 170" className="plane" role="img" aria-label="40 atommagból megmaradt radioaktív atomok aránya">
          <rect width={210} height={170} className="pl-bg" />
          <text x={105} y={20} textAnchor="middle" fill="#cbd5e1" fontSize={11} fontWeight={700}>
            40 atomból aktív: {aliveDots} db
          </text>
          {Array.from({ length: totalDots }, (_, idx) => {
            const col = idx % 8;
            const row = Math.floor(idx / 8);
            const active = idx < aliveDots;
            return (
              <circle
                key={idx}
                cx={24 + col * 23}
                cy={42 + row * 24}
                r={7}
                fill={active ? '#38bdf8' : '#334155'}
                stroke={active ? '#bae6fd' : '#475569'}
                strokeWidth={1.2}
              />
            );
          })}
          <text x={105} y={160} textAnchor="middle" fill="#94a3b8" fontSize={10}>
            Kék: radioaktív · Szürke: elbomlott
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Karbon-14 kormeghatározás */

export function CarbonDatingWidget() {
  const [pct, setPct] = useState(90); // megmaradt C-14 %
  const T12 = 5700;
  const age = (-T12 * Math.log(pct / 100)) / Math.LN2;

  return (
    <div className="widget">
      <div className="widget-title">Radiokarbonos (¹⁴C) kormeghatározó labor (T₁/₂ = 5 700 év)</div>
      <div className="relbuttons chips">
        <button type="button" className={pct === 90 ? 'on' : ''} onClick={() => setPct(90)}>
          90% (Thomas 5. példa: ~866 év)
        </button>
        <button type="button" className={pct === 78 ? 'on' : ''} onClick={() => setPct(78)}>
          78% (Holt-tengeri tekercsek: ~2 040 év)
        </button>
        <button type="button" className={pct === 50 ? 'on' : ''} onClick={() => setPct(50)}>
          50% (1 felezési idő: 5 700 év)
        </button>
        <button type="button" className={pct === 15 ? 'on' : ''} onClick={() => setPct(15)}>
          15% (Lascaux: ~15 600 év)
        </button>
      </div>

      <label>
        A leletben megmaradt <M t="^{14}\text{C}" /> arány: <strong>{pct}%</strong> (elbomlott: {100 - pct}%)
        <input type="range" min={5} max={98} step={1} value={pct} onChange={(e) => setPct(Number(e.target.value))} />
      </label>

      <div className="result">
        <p>
          Becsült kor:{' '}
          <strong>
            <M t={`t = -5700\\cdot\\dfrac{\\ln(${tx(pct / 100, 2)})}{\\ln 2} \\approx ${Math.round(age).toLocaleString('hu-HU')}`} /> év!
          </strong>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Newton hűlési törvénye */

export function NewtonCoolingWidget() {
  const [H0, setH0] = useState(98); // kezdeti hőmérséklet (°C)
  const [HS, setHS] = useState(18); // környezet (°C)
  const [t, setT] = useState(5); // perc
  const k = Math.log(4) / 5; // Thomas 6. példa: 98 -> 38 5 perc alatt 18 fokos vízben
  const Ht = HS + (H0 - HS) * Math.exp(-k * t);

  return (
    <div className="widget">
      <div className="widget-title">Newton hűlési törvénye: H(t) = Hₛ + (H₀ − Hₛ)·e⁻ᵏᵗ (hűlésre ÉS melegedésre is!)</div>
      <div className="relbuttons chips">
        <button type="button" className={H0 === 98 && HS === 18 ? 'on' : ''} onClick={() => { setH0(98); setHS(18); setT(5); }}>
          Thomas 6. példa: főtt tojás (98 °C → 18 °C)
        </button>
        <button type="button" className={H0 === 4 && HS === 24 ? 'on' : ''} onClick={() => { setH0(4); setHS(24); setT(5); }}>
          Hideg üdítő melegedése (4 °C → 24 °C)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Kezdeti hőmérséklet: <strong>H₀ = {H0} °C</strong> (környezet: Hₛ = {HS} °C)
          <input type="range" min={0} max={100} step={2} value={H0} onChange={(e) => setH0(Number(e.target.value))} />
        </label>
        <label>
          Eltelt idő: <strong>t = {round(t, 1)} perc</strong> ⇒ <strong>H(t) = {round(Ht, 1)} °C</strong>
          <input type="range" min={0} max={18} step={0.5} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={18.5} ymin={0} ymax={105} h={205}>
        {(m) => {
          const dCurve = buildPath((u) => HS + (H0 - HS) * Math.exp(-k * u), 0, 18.5, m.X, m.Y, 150);
          return (
            <>
              <line x1={m.X(0)} y1={m.Y(HS)} x2={m.X(18.5)} y2={m.Y(HS)} stroke="#34d399" strokeWidth={1.8} strokeDasharray="6 4" />
              <text x={m.X(14.5)} y={m.Y(HS + 4)} fill="#6ee7b7" fontSize={11} fontWeight={700}>
                Hₛ = {HS} °C (aszimptota)
              </text>
              <path d={dCurve} fill="none" stroke={H0 >= HS ? '#f87171' : '#38bdf8'} strokeWidth={2.6} />
              <circle cx={m.X(t)} cy={m.Y(Ht)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): 5 modell összehasonlító térképe */

export function ModelsMapDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Egyetlen differenciálegyenlet, öt különböző világ — az exponenciális modellek térképe</div>
      <svg viewBox="0 0 560 198" className="plane" role="img" aria-label="Exponenciális növekedési és csökkenési modellek összefoglalása">
        <rect width={560} height={198} className="pl-bg" />

        <rect x={10} y={10} width={540} height={26} rx={6} fill="#1e293b" />
        <text x={96} y={27} textAnchor="middle" fill="#cbd5e1" fontSize={11} fontWeight={700}>Jelenség</text>
        <text x={252} y={27} textAnchor="middle" fill="#7dd3fc" fontSize={11} fontWeight={700}>Megoldás</text>
        <text x={442} y={27} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>Kulcsmennyiség</text>

        {[
          { y: 42, name: 'Populáció / baktérium', eq: 'y = y₀ · eᵏᵗ  (k > 0)', key: 'Duplázódási idő: T₂ = ln 2 / k', col: '#38bdf8' },
          { y: 72, name: 'Folytonos kamat', eq: 'A = A₀ · eʳᵗ', key: '70-es szabály: T₂ ≈ 70 / p%', col: '#34d399' },
          { y: 102, name: 'Radioaktív bomlás', eq: 'y = y₀ · e⁻ᵏᵗ  (k > 0)', key: 'Felezési idő: T₁/₂ = ln 2 / k', col: '#f87171' },
          { y: 132, name: 'Karbon-14 kormeghat.', eq: 't = −5700 · ln(y/y₀)/ln 2', key: 'T₁/₂ = 5 700 év (élőből indul)', col: '#c4b5fd' },
          { y: 162, name: 'Newton-féle hűlés', eq: 'H = Hₛ + (H₀−Hₛ)e⁻ᵏᵗ', key: 'Hₛ a vízszintes aszimptota!', col: '#fbbf24' },
        ].map((row, idx) => (
          <g key={idx}>
            <rect x={10} y={row.y} width={540} height={26} rx={5} fill="#0f172a" stroke="#1e293b" />
            <text x={18} y={row.y + 17} fill={row.col} fontSize={11} fontWeight={700}>{row.name}</text>
            <text x={252} y={row.y + 17} textAnchor="middle" fill="#e2e8f0" fontSize={11}>{row.eq}</text>
            <text x={442} y={row.y + 17} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>{row.key}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): Féllogaritmikus (semi-log) egyenesítés */

export function SemiLogLinearityWidget() {
  const [scale, setScale] = useState<'linear' | 'semilog'>('semilog');
  const k = 0.5;
  const y0 = 1.5;

  return (
    <div className="widget">
      <div className="widget-title">Hogyan ismerik fel a tudósok az exponenciális adatokat? — Féllogaritmikus skála!</div>
      <div className="relbuttons chips">
        <button type="button" className={scale === 'linear' ? 'on' : ''} onClick={() => setScale('linear')}>
          Normál tengely: y = 1,5·e⁰·⁵ᵗ (görbe)
        </button>
        <button type="button" className={scale === 'semilog' ? 'on' : ''} onClick={() => setScale('semilog')}>
          Féllogaritmikus: ln y = ln(1,5) + 0,5t (EGYENES!)
        </button>
      </div>

      {scale === 'linear' ? (
        <Chart xmin={0} xmax={5.2} ymin={0} ymax={20} h={185}>
          {(m) => (
            <path d={buildPath((t) => y0 * Math.exp(k * t), 0, 5.1, m.X, m.Y, 120)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          )}
        </Chart>
      ) : (
        <Chart xmin={0} xmax={5.2} ymin={0} ymax={3.3} h={185}>
          {(m) => (
            <path
              d={buildPath((t) => Math.log(y0) + k * t, 0, 5.1, m.X, m.Y, 60)}
              fill="none"
              stroke="#34d399"
              strokeWidth={2.6}
            />
          )}
        </Chart>
      )}

      <div className="result">
        <p>
          Ha <M t="\ln y" />-t ábrázoljuk <M t="t" /> függvényében, az exponenciális görbe pontosan{' '}
          <M t="m = k = 0{,}5" /> meredekségű <strong>egyenessé</strong> egyenesedik ki!
        </p>
      </div>
    </div>
  );
}
