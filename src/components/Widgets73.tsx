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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): e^x és ln x tükörképe */

export function ExpLnMirrorWidget() {
  const [a, setA] = useState(1.0);
  const ea = Math.exp(a);

  return (
    <div className="widget">
      <div className="widget-title">Az y = eˣ és y = ln x egymás tükörképei az y = x egyenesre!</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(a - -0.7) < 0.05 ? 'on' : ''} onClick={() => setA(-0.7)}>
          a = −0,7
        </button>
        <button type="button" className={Math.abs(a) < 0.02 ? 'on' : ''} onClick={() => setA(0)}>
          a = 0 → (0; 1) ↔ (1; 0)
        </button>
        <button type="button" className={Math.abs(a - 1) < 0.02 ? 'on' : ''} onClick={() => setA(1)}>
          a = 1 → (1; e) ↔ (e; 1)
        </button>
        <button type="button" className={Math.abs(a - 1.4) < 0.05 ? 'on' : ''} onClick={() => setA(1.4)}>
          a = 1,4
        </button>
      </div>

      <label>
        Pont az <M t="e^x" /> görbén: <M t={`a = ${tx(a, 2)}`} /> ⇒ <M t={`P(${tx(a, 2)};\\,${tx(ea, 2)})`} /> és tükörképe{' '}
        <M t={`Q(${tx(ea, 2)};\\,${tx(a, 2)})`} />
        <input type="range" min={-1.6} max={1.5} step={0.05} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.2} xmax={4.8} ymin={-2.2} ymax={4.8} w={340} h={340}>
        {(m) => {
          const dExp = buildPath((x) => Math.exp(x), -2.2, 1.65, m.X, m.Y, 160);
          const dLn = buildPath((x) => (x > 0.08 ? Math.log(x) : Number.NaN), 0.1, 4.8, m.X, m.Y, 180);
          return (
            <>
              <line x1={m.X(-2.2)} y1={m.Y(-2.2)} x2={m.X(4.8)} y2={m.Y(4.8)} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="6 4" />
              <path d={dExp} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <path d={dLn} fill="none" stroke="#34d399" strokeWidth={2.6} />

              {/* Összekötő tükörszakasz */}
              <line x1={m.X(a)} y1={m.Y(ea)} x2={m.X(ea)} y2={m.Y(a)} stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="4 3" />
              <circle cx={m.X(a)} cy={m.Y(ea)} r={5.5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.5} />
              <circle cx={m.X(ea)} cy={m.Y(a)} r={5.5} fill="#34d399" stroke="#0f172a" strokeWidth={1.5} />

              <text x={m.X(0.35)} y={m.Y(4.1)} fill="#7dd3fc" fontSize={12} fontWeight={700}>y = eˣ</text>
              <text x={m.X(3.5)} y={m.Y(0.8)} fill="#6ee7b7" fontSize={12} fontWeight={700}>y = ln x</text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>Tartomány ↔ Értékkészlet:</strong> <M t="D_{e^x} = \mathbb{R}" />, <M t="R_{e^x} = (0;\,\infty)" /> (tehát{' '}
          <M t="e^x > 0" /> mindig!). Balra <M t="y = 0" /> a vízszintes aszimptota, jobbra rohamosan nő.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): y = a^x = e^(x ln a) görbecsalád */

export function ExpFamilyGrowthWidget() {
  const [a, setA] = useState(Math.E);
  const lna = Math.log(a);

  return (
    <div className="widget">
      <div className="widget-title">Az általános aˣ = eˣ·ˡⁿ ᵃ függvénycsalád — mi változik az alap szerint?</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(a - 0.5) < 0.03 ? 'on' : ''} onClick={() => setA(0.5)}>
          a = 0,5 (csökkenő!)
        </button>
        <button type="button" className={Math.abs(a - 1) < 0.02 ? 'on' : ''} onClick={() => setA(1.0)}>
          a = 1 (konstans)
        </button>
        <button type="button" className={Math.abs(a - 2) < 0.03 ? 'on' : ''} onClick={() => setA(2.0)}>
          a = 2
        </button>
        <button type="button" className={Math.abs(a - Math.E) < 0.03 ? 'on' : ''} onClick={() => setA(Math.E)}>
          a = e ≈ 2,72
        </button>
        <button type="button" className={Math.abs(a - 3.5) < 0.05 ? 'on' : ''} onClick={() => setA(3.5)}>
          a = 3,5
        </button>
      </div>

      <label>
        Alap: <M t={`a = ${tx(a, 2)}`} /> ⇒ <M t={`a^x = e^{(${tx(lna, 3)})x}`} />
        <input type="range" min={0.25} max={4.0} step={0.05} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.5} xmax={2.5} ymin={-0.3} ymax={6.2} h={215}>
        {(m) => {
          const dRef = buildPath((x) => Math.exp(x), -2.5, 2.0, m.X, m.Y, 140);
          const dCur = buildPath((x) => Math.exp(x * lna), -2.5, 2.5, m.X, m.Y, 160);
          return (
            <>
              <path d={dRef} fill="none" stroke="#64748b" strokeWidth={1.6} strokeDasharray="5 4" />
              <path d={dCur} fill="none" stroke={a > 1 ? '#38bdf8' : a < 1 ? '#f87171' : '#fbbf24'} strokeWidth={2.7} />
              <circle cx={m.X(0)} cy={m.Y(1)} r={5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
              <text x={m.X(0.15)} y={m.Y(0.65)} fill="#fde68a" fontSize={11} fontWeight={700}>(0; 1) közös pont!</text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          {a > 1.01 ? (
            <>
              <M t="a > 1 \implies \ln a > 0" />: <strong>exponenciális növekedés</strong> (a szaggatott vonal <M t="y = e^x" />).
            </>
          ) : a < 0.99 ? (
            <>
              <M t="0 < a < 1 \implies \ln a < 0" />: <strong>exponenciális csökkenés</strong> (<M t="a^x \to 0" />, ha <M t="x\to\infty" />).
            </>
          ) : (
            <>
              <M t="a = 1 \implies \ln 1 = 0" />: állandó <M t="y = 1" /> vízszintes egyenes!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): (e^x)' = e^x és az 1 egységű szubtangens */

export function ExpSelfDerivativeWidget() {
  const [x0, setX0] = useState(1.0);
  const y0 = Math.exp(x0);

  return (
    <div className="widget">
      <div className="widget-title">A csoda: y = eˣ érintőjének meredeksége MINDEN pontban egyenlő a magasságával!</div>
      <label>
        Érintési pont: <M t={`x_0 = ${tx(x0, 2)}`} /> ⇒ magasság = meredekség = <M t={`e^{${tx(x0, 2)}} = ${tx(y0, 3)}`} />
        <input type="range" min={-1.4} max={1.6} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.6} xmax={2.2} ymin={-0.5} ymax={5.6} h={225}>
        {(m) => {
          const dExp = buildPath((x) => Math.exp(x), -2.6, 1.8, m.X, m.Y, 160);
          return (
            <>
              <path d={dExp} fill="none" stroke="#38bdf8" strokeWidth={2.6} />

              {/* Derékszögű szubtangens-háromszög: (x0-1, 0) -> (x0, 0) -> (x0, y0) */}
              <polygon
                points={`${m.X(x0 - 1)},${m.Y(0)} ${m.X(x0)},${m.Y(0)} ${m.X(x0)},${m.Y(y0)}`}
                fill="rgba(251,191,36,0.20)"
                stroke="#fbbf24"
                strokeWidth={1.6}
              />

              {/* Érintőegyenes: y = y0 * (x - x0 + 1) */}
              <line
                x1={m.X(x0 - 1.3)}
                y1={m.Y(y0 * -0.3)}
                x2={m.X(x0 + 0.6)}
                y2={m.Y(y0 * 1.6)}
                stroke="#34d399"
                strokeWidth={2.2}
              />

              <circle cx={m.X(x0)} cy={m.Y(y0)} r={5.5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.5} />
              <circle cx={m.X(x0 - 1)} cy={m.Y(0)} r={4.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.4} />
              <text x={m.X(x0 - 0.5)} y={m.Y(-0.32)} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>
                alap = 1 (állandó!)
              </text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          A sárga háromszög magassága <M t={`e^{${tx(x0, 2)}} = ${tx(y0, 2)}`} />, alapja pedig <strong>mindig pontosan 1</strong> (az érintő{' '}
          <M t={`x_0 - 1 = ${tx(x0 - 1, 2)}`} />-nél metszi az <M t="x" />-tengelyt!), ezért a meredekség{' '}
          <M t={`m = \\dfrac{e^{x_0}}{1} = e^{x_0}`} />!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): xe^-x és Gauss-görbe e^-x^2 */

export function ExpCurvesGalleryWidget() {
  const [kind, setKind] = useState<'xexp' | 'gauss'>('gauss');
  const [x0, setX0] = useState(0.5);

  const fn = kind === 'xexp' ? (x: number) => x * Math.exp(-x) : (x: number) => Math.exp(-x * x);
  const df = kind === 'xexp' ? (x: number) => (1 - x) * Math.exp(-x) : (x: number) => -2 * x * Math.exp(-x * x);
  const d2 =
    kind === 'xexp'
      ? (x: number) => (x - 2) * Math.exp(-x)
      : (x: number) => (4 * x * x - 2) * Math.exp(-x * x);

  const bounds =
    kind === 'xexp'
      ? { xmin: -0.6, xmax: 5.2, ymin: -0.5, ymax: 0.65, sliderMin: -0.3, sliderMax: 4.5 }
      : { xmin: -2.8, xmax: 2.8, ymin: -0.2, ymax: 1.25, sliderMin: -2.2, sliderMax: 2.2 };

  const safeX = Math.min(bounds.sliderMax, Math.max(bounds.sliderMin, x0));
  const y0 = fn(safeX);
  const m0 = df(safeX);
  const c0 = d2(safeX);

  const selectKind = (k: 'xexp' | 'gauss') => {
    setKind(k);
    setX0(k === 'xexp' ? 1.0 : 0.7);
  };

  return (
    <div className="widget">
      <div className="widget-title">Két klasszikus exponenciális görbe elemzése: xe⁻ˣ és a Gauss-haranggörbe e⁻ˣ²</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'gauss' ? 'on' : ''} onClick={() => selectKind('gauss')}>
          Gauss-görbe: y = e⁻ˣ²
        </button>
        <button type="button" className={kind === 'xexp' ? 'on' : ''} onClick={() => selectKind('xexp')}>
          Csillapodó impulzus: y = xe⁻ˣ
        </button>
      </div>

      <label>
        Pont: <M t={`x_0 = ${tx(safeX, 2)}`} /> (<M t={`f'(x_0) = ${tx(m0, 3)},\\; f''(x_0) = ${tx(c0, 3)}`} />)
        <input
          type="range"
          min={bounds.sliderMin}
          max={bounds.sliderMax}
          step={0.05}
          value={safeX}
          onChange={(e) => setX0(Number(e.target.value))}
        />
      </label>

      <Chart xmin={bounds.xmin} xmax={bounds.xmax} ymin={bounds.ymin} ymax={bounds.ymax} h={215}>
        {(m) => {
          const dCurve = buildPath(fn, bounds.xmin, bounds.xmax, m.X, m.Y, 180);
          const span = kind === 'xexp' ? 0.9 : 0.7;
          return (
            <>
              <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              {/* Kulcspontok */}
              {kind === 'gauss' ? (
                <>
                  <circle cx={m.X(0)} cy={m.Y(1)} r={4.2} fill="#34d399" />
                  <circle cx={m.X(-Math.SQRT1_2)} cy={m.Y(Math.exp(-0.5))} r={4.2} fill="#a78bfa" />
                  <circle cx={m.X(Math.SQRT1_2)} cy={m.Y(Math.exp(-0.5))} r={4.2} fill="#a78bfa" />
                </>
              ) : (
                <>
                  <circle cx={m.X(1)} cy={m.Y(Math.exp(-1))} r={4.2} fill="#34d399" />
                  <circle cx={m.X(2)} cy={m.Y(2 * Math.exp(-2))} r={4.2} fill="#a78bfa" />
                </>
              )}
              <line
                x1={m.X(safeX - span)}
                y1={m.Y(y0 - m0 * span)}
                x2={m.X(safeX + span)}
                y2={m.Y(y0 + m0 * span)}
                stroke="#fbbf24"
                strokeWidth={2}
              />
              <circle cx={m.X(safeX)} cy={m.Y(y0)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          {kind === 'gauss' ? (
            <>
              <strong>Zöld:</strong> maximum <M t="x=0" />-ban (<M t="y=1" />) · <strong>Lila:</strong> inflexiós pontok{' '}
              <M t="x = \pm 1/\sqrt{2} \approx \pm 0{,}71" />-nél!
            </>
          ) : (
            <>
              <strong>Zöld:</strong> maximum <M t="x=1" />-ben (<M t="y=1/e \approx 0{,}368" />) · <strong>Lila:</strong> inflexiós pont{' '}
              <M t="x=2" />-nél (<M t="y=2/e^2 \approx 0{,}271" />)!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): e^x alatti terület */

export function ExpAreaWidget() {
  const [a, setA] = useState(-2.0);
  const [b, setB] = useState(1.0);
  const safeA = Math.min(a, b - 0.1);
  const area = Math.exp(b) - Math.exp(safeA);

  return (
    <div className="widget">
      <div className="widget-title">Az y = eˣ alatti terület: ∫ₐᵇ eˣ dx = eᵇ − eᵃ (a teljes bal oldali farok területe = 1!)</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Alsó határ: <M t={`a = ${tx(safeA, 2)}`} /> (<M t={`e^a = ${tx(Math.exp(safeA), 3)}`} />)
          <input type="range" min={-4.0} max={0.8} step={0.1} value={safeA} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Felső határ: <M t={`b = ${tx(b, 2)}`} /> (<M t={`e^b = ${tx(Math.exp(b), 3)}`} />)
          <input type="range" min={-0.5} max={1.6} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={-4.2} xmax={1.8} ymin={-0.3} ymax={5.2} h={205}>
        {(m) => {
          const dExp = buildPath((x) => Math.exp(x), -4.2, 1.7, m.X, m.Y, 160);
          let poly = `M ${m.X(safeA).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 60; i++) {
            const x = safeA + ((b - safeA) * i) / 60;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(Math.exp(x)).toFixed(1)} `;
          }
          poly += `L ${m.X(b).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={poly} fill="rgba(52,211,153,0.34)" stroke="#34d399" strokeWidth={1.6} />
              <path d={dExp} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <circle cx={m.X(safeA)} cy={m.Y(0)} r={4.5} fill="#fbbf24" />
              <circle cx={m.X(b)} cy={m.Y(0)} r={4.5} fill="#34d399" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Terület: <M t={`\\int_{${tx(safeA, 1)}}^{${tx(b, 1)}} e^x\\,dx = e^{${tx(b, 1)}} - e^{${tx(safeA, 1)}} = \\mathbf{${tx(area, 3)}}`} />.
          (Told el <M t="a" />-t <M t="-4" />-ig és <M t="b" />-t <M t="0" />-ra: a terület <M t="0{,}982 \to 1" />!)
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): e = lim (1 + 1/n)^n */

export function EulerLimitWidget() {
  const [n, setN] = useState(12);
  const val = (1 + 1 / n) ** n;
  const err = Math.E - val;

  return (
    <div className="widget">
      <div className="widget-title">Az e szám mint határérték: aₙ = (1 + 1/n)ⁿ → e ≈ 2,71828 (kamatos kamat!)</div>
      <div className="relbuttons chips">
        <button type="button" className={n === 1 ? 'on' : ''} onClick={() => setN(1)}>n = 1 (évi)</button>
        <button type="button" className={n === 4 ? 'on' : ''} onClick={() => setN(4)}>n = 4 (negyedévi)</button>
        <button type="button" className={n === 12 ? 'on' : ''} onClick={() => setN(12)}>n = 12 (havi)</button>
        <button type="button" className={n === 52 ? 'on' : ''} onClick={() => setN(52)}>n = 52 (heti)</button>
        <button type="button" className={n === 365 ? 'on' : ''} onClick={() => setN(365)}>n = 365 (napi)</button>
      </div>

      <label>
        Tőkésítések száma: <strong>n = {n}</strong> ⇒ <M t={`(1 + 1/${n})^{${n}} = ${tx(val, 5)}`} /> (eltérés <M t="e" />-től:{' '}
        <M t={tx(err, 5)} />)
        <input type="range" min={1} max={100} step={1} value={Math.min(100, n)} onChange={(e) => setN(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={42} ymin={1.8} ymax={2.88} h={200}>
        {(m) => {
          const pts = Array.from({ length: 40 }, (_, i) => {
            const k = i + 1;
            return { k, v: (1 + 1 / k) ** k };
          });
          return (
            <>
              <line x1={m.X(0)} y1={m.Y(Math.E)} x2={m.X(42)} y2={m.Y(Math.E)} stroke="#34d399" strokeWidth={2} strokeDasharray="6 4" />
              <text x={m.X(34)} y={m.Y(Math.E + 0.06)} fill="#6ee7b7" fontSize={11.5} fontWeight={700}>
                y = e ≈ 2,71828
              </text>
              {pts.map((p) => (
                <circle
                  key={p.k}
                  cx={m.X(p.k)}
                  cy={m.Y(p.v)}
                  r={p.k === n ? 5.5 : 3.2}
                  fill={p.k === n ? '#fbbf24' : '#38bdf8'}
                  stroke={p.k === n ? '#0f172a' : 'none'}
                  strokeWidth={1.4}
                />
              ))}
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          1 Ft befektetés 100%-os éves kamattal, <strong>{n}-szer</strong> tőkésítve év végére{' '}
          <strong>{round(val, 5)} Ft</strong> lesz — folyamatos tőkésítésnél (<M t="n\to\infty" />) pontosan{' '}
          <strong>e ≈ 2,71828 Ft</strong>!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): x^e vs e^x vs x^x összehasonlítása */

export function PowerVsExpVsXXWidget() {
  const [x0, setX0] = useState(1.8);
  const xe = x0 ** Math.E;
  const ex = Math.exp(x0);
  const xx = x0 ** x0;

  return (
    <div className="widget">
      <div className="widget-title">Hármas verseny: hatványfüggvény (xᵉ) vs. exponenciális (eˣ) vs. xˣ!</div>
      <label>
        Összehasonlítási pont: <M t={`x_0 = ${tx(x0, 2)}`} />
        <input type="range" min={0.3} max={2.8} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={3.1} ymin={-0.3} ymax={16.5} h={215}>
        {(m) => {
          const dXe = buildPath((x) => (x > 0 ? x ** Math.E : 0), 0.01, 2.9, m.X, m.Y, 150);
          const dEx = buildPath((x) => Math.exp(x), 0, 2.85, m.X, m.Y, 150);
          const dXX = buildPath((x) => (x > 0.02 ? x ** x : Number.NaN), 0.04, 2.75, m.X, m.Y, 150);
          return (
            <>
              <line x1={m.X(x0)} y1={m.Y(0)} x2={m.X(x0)} y2={m.Y(16.5)} stroke="#94a3b8" strokeWidth={1.2} strokeDasharray="4 3" />
              <path d={dXe} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
              <path d={dEx} fill="none" stroke="#34d399" strokeWidth={2.4} />
              <path d={dXX} fill="none" stroke="#f472b6" strokeWidth={2.5} />

              <circle cx={m.X(x0)} cy={m.Y(Math.min(16.5, xe))} r={4.8} fill="#38bdf8" />
              <circle cx={m.X(x0)} cy={m.Y(Math.min(16.5, ex))} r={4.8} fill="#34d399" />
              <circle cx={m.X(x0)} cy={m.Y(Math.min(16.5, xx))} r={4.8} fill="#f472b6" />
              <circle cx={m.X(Math.E)} cy={m.Y(Math.exp(Math.E))} r={4.5} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <span style={{ color: '#7dd3fc', fontWeight: 700 }}>● xᵉ = {round(xe, 2)}</span> ·{' '}
          <span style={{ color: '#6ee7b7', fontWeight: 700 }}>● eˣ = {round(ex, 2)}</span> ·{' '}
          <span style={{ color: '#f9a8d4', fontWeight: 700 }}>● xˣ = {round(xx, 2)}</span>{' '}
          (Figyeld meg: <M t="x = e \approx 2{,}72" />-nél mindhárom görbe találkozik az <M t="e^e \approx 15{,}15" /> pontban!)
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): A 3 eset puskadiagramja */

export function ThreeCasesCheatDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Soha ne keverd össze! — A 3 hatvány-típus deriválása egymás mellett</div>
      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Hatványfüggvény, exponenciális függvény és x a x-ediken deriválása">
        <rect width={560} height={132} className="pl-bg" />

        <rect x={12} y={14} width={170} height={104} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={97} y={35} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>1. Hatvány: xⁿ (n állandó)</text>
        <text x={97} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={12}>változó az alapban</text>
        <text x={97} y={88} textAnchor="middle" fill="#7dd3fc" fontSize={12.5} fontWeight={700}>(xⁿ)′ = n · xⁿ⁻¹</text>
        <text x={97} y={108} textAnchor="middle" fill="#94a3b8" fontSize={10}>pl. (x^π)′ = π·x^(π−1)</text>

        <rect x={195} y={14} width={170} height={104} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.8} />
        <text x={280} y={35} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>2. Exponenciális: eˣ</text>
        <text x={280} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={12}>változó a kitevőben</text>
        <text x={280} y={88} textAnchor="middle" fill="#6ee7b7" fontSize={12.5} fontWeight={700}>(eˣ)′ = eˣ</text>
        <text x={280} y={108} textAnchor="middle" fill="#94a3b8" fontSize={10}>(eᵘ)′ = eᵘ · u′</text>

        <rect x={378} y={14} width={170} height={104} rx={8} fill="#0f172a" stroke="#f472b6" strokeWidth={1.8} />
        <text x={463} y={35} textAnchor="middle" fill="#f472b6" fontSize={11.5} fontWeight={700}>3. Mindkettő változó: xˣ</text>
        <text x={463} y={62} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>írd át: xˣ = e^(x ln x)</text>
        <text x={463} y={88} textAnchor="middle" fill="#f9a8d4" fontSize={12} fontWeight={700}>(xˣ)′ = xˣ(ln x + 1)</text>
        <text x={463} y={108} textAnchor="middle" fill="#94a3b8" fontSize={10}>vagy logaritmusos deriválás!</text>
      </svg>
    </div>
  );
}
