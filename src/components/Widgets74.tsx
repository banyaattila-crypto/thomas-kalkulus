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

/* ------------------------------------------------------------------ 1. oldal (1. ábra): a^x érintője (0; 1)-ben = ln a */

export function AxSlopeAtZeroWidget() {
  const [a, setA] = useState(2.0);
  const lna = Math.log(a);
  const isNearE = Math.abs(a - Math.E) < 0.04;

  return (
    <div className="widget">
      <div className="widget-title">Miért jelenik meg az ln a szorzó? — Az y = aˣ érintőjének meredeksége (0; 1)-ben pontosan ln a!</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(a - 0.5) < 0.03 ? 'on' : ''} onClick={() => setA(0.5)}>
          a = 0,5 (ln a &lt; 0)
        </button>
        <button type="button" className={Math.abs(a - 2) < 0.03 ? 'on' : ''} onClick={() => setA(2.0)}>
          a = 2 (ln 2 ≈ 0,69)
        </button>
        <button type="button" className={isNearE ? 'on' : ''} onClick={() => setA(Math.E)}>
          a = e (ln e = 1!)
        </button>
        <button type="button" className={Math.abs(a - 4) < 0.03 ? 'on' : ''} onClick={() => setA(4.0)}>
          a = 4 (ln 4 ≈ 1,39)
        </button>
      </div>

      <label>
        Alap: <M t={`a = ${tx(a, 2)}`} /> ⇒ meredekség <M t="(0;\,1)" />-ben: <M t={`\\ln(${tx(a, 2)}) = ${tx(lna, 3)}`} />
        <input type="range" min={0.25} max={4.5} step={0.05} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.2} xmax={2.4} ymin={-0.6} ymax={5.2} h={215}>
        {(m) => {
          const dExp = buildPath((x) => Math.exp(x * lna), -2.2, 2.4, m.X, m.Y, 160);
          return (
            <>
              {/* 45 fokos referencia érintő (y = 1 + x) */}
              <line x1={m.X(-1.6)} y1={m.Y(-0.6)} x2={m.X(2.4)} y2={m.Y(3.4)} stroke="#64748b" strokeWidth={1.3} strokeDasharray="5 4" />
              <path d={dExp} fill="none" stroke={a > 1 ? '#38bdf8' : a < 1 ? '#f87171' : '#fbbf24'} strokeWidth={2.6} />
              {/* Aktuális érintő (0; 1)-ben: y = 1 + (ln a) x */}
              <line
                x1={m.X(-2.2)}
                y1={m.Y(1 - 2.2 * lna)}
                x2={m.X(2.4)}
                y2={m.Y(1 + 2.4 * lna)}
                stroke="#fbbf24"
                strokeWidth={2.2}
              />
              <circle cx={m.X(0)} cy={m.Y(1)} r={5.5} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          {isNearE ? (
            <span style={{ color: '#34d399', fontWeight: 700 }}>
              ★ Pontosan a = e esetén az érintő 45°-os (m = ln e = 1) — ezért nincs korrekciós szorzó (eˣ)′-nél!
            </span>
          ) : (
            <>
              Mivel <M t={`(a^x)' = a^x\\ln a`} />, az <M t="x=0" /> helyen a meredekség{' '}
              <M t={`\\ln(${tx(a, 2)}) = ${tx(lna, 3)}`} /> (a szaggatott vonal a <M t="45^\circ" />-os <M t="y=1+x" /> referencia).
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): ∫ a^x dx = a^x / ln a terület */

export function AxIntegralAreaWidget() {
  const [a, setA] = useState(2.0);
  const [b, setB] = useState(2.0);
  const lna = Math.log(a);
  const area = Math.abs(lna) < 1e-6 ? b : (a ** b - 1) / lna;

  return (
    <div className="widget">
      <div className="widget-title">Az y = aˣ alatti terület: ∫₀ᵇ aˣ dx = (aᵇ − 1) / ln a</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Alap: <M t={`a = ${tx(a, 1)}`} /> (<M t={`\\ln a = ${tx(lna, 3)}`} />)
          <input type="range" min={1.2} max={3.5} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Felső határ: <M t={`b = ${tx(b, 2)}`} />
          <input type="range" min={0.3} max={2.2} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={-0.3} xmax={2.5} ymin={-0.3} ymax={8.5} h={205}>
        {(m) => {
          const dCurve = buildPath((x) => a ** x, -0.3, 2.4, m.X, m.Y, 140);
          let poly = `M ${m.X(0).toFixed(1)},${m.Y(0).toFixed(1)} `;
          for (let i = 0; i <= 50; i++) {
            const x = (b * i) / 50;
            poly += `L ${m.X(x).toFixed(1)},${m.Y(Math.min(8.6, a ** x)).toFixed(1)} `;
          }
          poly += `L ${m.X(b).toFixed(1)},${m.Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={poly} fill="rgba(52,211,153,0.34)" stroke="#34d399" strokeWidth={1.6} />
              <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <circle cx={m.X(b)} cy={m.Y(0)} r={4.5} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Terület: <M t={`\\int_0^{${tx(b, 1)}} ${tx(a, 1)}^x\\,dx = \\dfrac{${tx(a, 1)}^{${tx(b, 1)}} - 1}{\\ln(${tx(a, 1)})} = \\mathbf{${tx(area, 3)}}`} />.
          (Integráláskor <strong>osztunk</strong> <M t="\ln a" />-val!)
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): a^x és log_a x tükrözése */

export function LogBaseMirrorWidget() {
  const [a, setA] = useState(2.0);
  const lna = Math.log(a);

  return (
    <div className="widget">
      <div className="widget-title">Az y = aˣ és y = logₐ x egymás tükörképei — még 0 &lt; a &lt; 1 esetén is!</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(a - 0.5) < 0.02 ? 'on' : ''} onClick={() => setA(0.5)}>
          a = ½ (csökkenő pár!)
        </button>
        <button type="button" className={Math.abs(a - 2) < 0.02 ? 'on' : ''} onClick={() => setA(2.0)}>
          a = 2 (2ˣ ↔ log₂ x)
        </button>
        <button type="button" className={Math.abs(a - Math.E) < 0.03 ? 'on' : ''} onClick={() => setA(Math.E)}>
          a = e (eˣ ↔ ln x)
        </button>
        <button type="button" className={Math.abs(a - 10) < 0.1 ? 'on' : ''} onClick={() => setA(10)}>
          a = 10 (10ˣ ↔ log₁₀ x)
        </button>
      </div>

      <Chart xmin={-2.5} xmax={5.0} ymin={-2.5} ymax={5.0} w={340} h={320}>
        {(m) => {
          const dExp = buildPath((x) => Math.exp(x * lna), -2.5, 5.0, m.X, m.Y, 200);
          const dLog = buildPath((x) => (x > 0.05 ? Math.log(x) / lna : Number.NaN), 0.06, 5.0, m.X, m.Y, 200);
          return (
            <>
              <line x1={m.X(-2.5)} y1={m.Y(-2.5)} x2={m.X(5.0)} y2={m.Y(5.0)} stroke="#94a3b8" strokeWidth={1.4} strokeDasharray="6 4" />
              <path d={dExp} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={dLog} fill="none" stroke="#34d399" strokeWidth={2.5} />
              {/* (0; 1) <-> (1; 0) */}
              <circle cx={m.X(0)} cy={m.Y(1)} r={4.8} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.3} />
              <circle cx={m.X(1)} cy={m.Y(0)} r={4.8} fill="#34d399" stroke="#0f172a" strokeWidth={1.3} />
              {/* (1; a) <-> (a; 1) ha belefér */}
              {a <= 4.8 && (
                <>
                  <circle cx={m.X(1)} cy={m.Y(a)} r={4.5} fill="#fbbf24" />
                  <circle cx={m.X(a)} cy={m.Y(1)} r={4.5} fill="#fbbf24" />
                  <line x1={m.X(1)} y1={m.Y(a)} x2={m.X(a)} y2={m.Y(1)} stroke="#fbbf24" strokeWidth={1.4} strokeDasharray="3 3" />
                </>
              )}
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék:</strong> <M t={`y = ${tx(a, 2)}^x`} /> · <strong>Zöld:</strong>{' '}
          <M t={`y = \\log_{${tx(a, 2)}} x = \\dfrac{\\ln x}{${tx(lna, 3)}}`} />.
          {a < 1 && ' Figyeld meg: 0 < a < 1 esetén a két görbe még az y = x egyenesen is metszi egymást!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): log_a x függvénycsalád */

export function LogBaseFamilyWidget() {
  const [x0, setX0] = useState(2.0);
  const bases = [
    { a: 2, label: 'log₂ x', color: '#38bdf8' },
    { a: Math.E, label: 'ln x', color: '#34d399' },
    { a: 10, label: 'log₁₀ x', color: '#fbbf24' },
    { a: 0.5, label: 'log₁/₂ x', color: '#f472b6' },
  ];

  return (
    <div className="widget">
      <div className="widget-title">Minden logₐ x egyszerűen az ln x konstansszorosa: (1 / ln a) · ln x</div>
      <label>
        Vizsgált pont: <M t={`x_0 = ${tx(x0, 2)}`} />
        <input type="range" min={0.4} max={8.0} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={0} xmax={8.4} ymin={-3.2} ymax={3.2} h={215}>
        {(m) => (
          <>
            <line x1={m.X(x0)} y1={m.Y(-3.2)} x2={m.X(x0)} y2={m.Y(3.2)} stroke="#94a3b8" strokeWidth={1.2} strokeDasharray="4 3" />
            {bases.map((b) => {
              const d = buildPath((x) => (x > 0.05 ? Math.log(x) / Math.log(b.a) : Number.NaN), 0.08, 8.4, m.X, m.Y, 160);
              const yv = Math.log(x0) / Math.log(b.a);
              return (
                <g key={b.label}>
                  <path d={d} fill="none" stroke={b.color} strokeWidth={2.3} />
                  <circle cx={m.X(x0)} cy={m.Y(yv)} r={4.5} fill={b.color} stroke="#0f172a" strokeWidth={1.3} />
                </g>
              );
            })}
            <circle cx={m.X(1)} cy={m.Y(0)} r={4.5} fill="#f8fafc" />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          Meredekségek <M t={`x_0 = ${tx(x0, 1)}`} />-nál (<M t="1/(x_0\ln a)" />):{' '}
          {bases.map((b, i) => (
            <span key={b.label} style={{ color: b.color, fontWeight: 700, marginRight: i < bases.length - 1 ? 10 : 0 }}>
              {b.label}: {round(1 / (x0 * Math.log(b.a)), 3)}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Kettős változós hatványok labor */

type GpKind = 'xx' | 'xsin' | 'xln';

export function GeneralPowerLabWidget() {
  const [kind, setKind] = useState<GpKind>('xx');
  const [x0, setX0] = useState(1.2);

  const cfg =
    kind === 'xx'
      ? {
          name: 'y = xˣ',
          f: (x: number) => x ** x,
          df: (x: number) => x ** x * (Math.log(x) + 1),
          xmin: 0.15,
          xmax: 2.3,
          ymin: 0,
          ymax: 6.5,
          smin: 0.25,
          smax: 2.1,
        }
      : kind === 'xsin'
      ? {
          name: 'y = x^(sin x)',
          f: (x: number) => x ** Math.sin(x),
          df: (x: number) => x ** Math.sin(x) * (Math.cos(x) * Math.log(x) + Math.sin(x) / x),
          xmin: 0.15,
          xmax: 4.5,
          ymin: 0,
          ymax: 3.2,
          smin: 0.3,
          smax: 4.0,
        }
      : {
          name: 'y = x^(ln x)',
          f: (x: number) => x ** Math.log(x),
          df: (x: number) => x ** Math.log(x) * ((2 * Math.log(x)) / x),
          xmin: 0.15,
          xmax: 3.8,
          ymin: 0,
          ymax: 6.0,
          smin: 0.3,
          smax: 3.4,
        };

  const safeX = Math.min(cfg.smax, Math.max(cfg.smin, x0));
  const y0 = cfg.f(safeX);
  const m0 = cfg.df(safeX);

  const selectKind = (k: GpKind) => {
    setKind(k);
    setX0(1.4);
  };

  return (
    <div className="widget">
      <div className="widget-title">Kettős változós hatványok (u(x)ᵛ⁽ˣ⁾) — interaktív görbe- és érintővizsgáló</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'xx' ? 'on' : ''} onClick={() => selectKind('xx')}>
          y = xˣ
        </button>
        <button type="button" className={kind === 'xsin' ? 'on' : ''} onClick={() => selectKind('xsin')}>
          y = x^(sin x)
        </button>
        <button type="button" className={kind === 'xln' ? 'on' : ''} onClick={() => selectKind('xln')}>
          y = x^(ln x)
        </button>
      </div>

      <label>
        Pont: <M t={`x_0 = ${tx(safeX, 2)}`} /> ⇒ <M t={`y = ${tx(y0, 3)},\\; y' = ${tx(m0, 3)}`} />
        <input
          type="range"
          min={cfg.smin}
          max={cfg.smax}
          step={0.05}
          value={safeX}
          onChange={(e) => setX0(Number(e.target.value))}
        />
      </label>

      <Chart xmin={0} xmax={cfg.xmax} ymin={cfg.ymin} ymax={cfg.ymax} h={205}>
        {(m) => {
          const dCurve = buildPath(cfg.f, cfg.xmin, cfg.xmax, m.X, m.Y, 170);
          const span = 0.55;
          return (
            <>
              <path d={dCurve} fill="none" stroke="#f472b6" strokeWidth={2.6} />
              <line
                x1={m.X(safeX - span)}
                y1={m.Y(y0 - m0 * span)}
                x2={m.X(safeX + span)}
                y2={m.Y(y0 + m0 * span)}
                stroke="#fbbf24"
                strokeWidth={2}
              />
              <circle cx={m.X(safeX)} cy={m.Y(y0)} r={5.2} fill="#fbbf24" stroke="#0f172a" strokeWidth={1.5} />
            </>
          );
        }}
      </Chart>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): Richter, Decibel, pH skála */

export function LogScalesRealWorldWidget() {
  const [tab, setTab] = useState<'richter' | 'db' | 'ph'>('richter');
  const [R, setR] = useState(6.0);
  const [dB, setDB] = useState(70);
  const [pH, setPH] = useState(7.0);

  return (
    <div className="widget">
      <div className="widget-title">A 10-es alapú logaritmus a való életben: minden +1 lépés = 10-szeres különbség!</div>
      <div className="relbuttons chips">
        <button type="button" className={tab === 'richter' ? 'on' : ''} onClick={() => setTab('richter')}>
          Földrengés (Richter)
        </button>
        <button type="button" className={tab === 'db' ? 'on' : ''} onClick={() => setTab('db')}>
          Hangerősség (Decibel)
        </button>
        <button type="button" className={tab === 'ph' ? 'on' : ''} onClick={() => setTab('ph')}>
          Savasság (pH-skála)
        </button>
      </div>

      {tab === 'richter' && (
        <>
          <label>
            Richter-fokozat (összehasonlítva egy R = 4,0-es rengéssel): <strong>R = {round(R, 1)}</strong>
            <input type="range" min={4.0} max={8.5} step={0.5} value={R} onChange={(e) => setR(Number(e.target.value))} />
          </label>
          <div className="result">
            <p>
              Különbség: <M t={`\\Delta R = ${tx(R - 4, 1)}`} /> ⇒ a szeizmikus kilengés amplitúdója{' '}
              <strong>
                <M t={`10^{${tx(R - 4, 1)}} \\approx ${Math.round(10 ** (R - 4)).toLocaleString('hu-HU')}`} />-szerese
              </strong>{' '}
              egy 4,0-es rengésének!
            </p>
          </div>
        </>
      )}

      {tab === 'db' && (
        <>
          <label>
            Hangerősség (β = 10·log₁₀(I/I₀)): <strong>{dB} dB</strong>
            <input type="range" min={10} max={120} step={10} value={dB} onChange={(e) => setDB(Number(e.target.value))} />
          </label>
          <div className="result">
            <p>
              Hangintenzitás a hallásküszöbhöz (<M t="I_0" />) képest:{' '}
              <strong>
                <M t={`10^{${dB / 10}}`} />-szeres
              </strong>{' '}
              (
              {dB <= 20
                ? 'suttogás'
                : dB <= 50
                ? 'csendes szoba / halk eső'
                : dB <= 70
                ? 'normál beszélgetés'
                : dB <= 90
                ? 'forgalmas utca / fűnyíró'
                : dB <= 110
                ? 'rockkoncert'
                : 'sugárhajtómű — fájdalomküszöb!'}
              ). Minden +10 dB pontosan <strong>10×</strong> nagyobb intenzitás!
            </p>
          </div>
        </>
      )}

      {tab === 'ph' && (
        <>
          <label>
            Oldat pH-értéke (pH = −log₁₀[H₃O⁺]): <strong>pH = {round(pH, 1)}</strong>
            <input type="range" min={1.0} max={13.0} step={0.5} value={pH} onChange={(e) => setPH(Number(e.target.value))} />
          </label>
          <div className="result">
            <p>
              Oxóniumion-koncentráció: <M t={`[\\text{H}_3\\text{O}^+] = 10^{-${tx(pH, 1)}}\\text{ mol/l}`} /> —{' '}
              <strong>
                {pH < 6.8 ? 'savas' : pH > 7.2 ? 'lúgos' : 'semleges (tiszta víz / vér ≈ 7,4)'}
              </strong>
              . (1 pH-egység csökkenés = <strong>10-szer</strong> nagyobb savkoncentráció!)
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): e-alapú vs a-alapú mátrix */

export function BaseEandBaseAMatrixDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A teljes szimmetria-mátrix: e-alapú vs. a-alapú képletek (hol szorzunk és hol osztunk ln a-val?)</div>
      <svg viewBox="0 0 560 176" className="plane" role="img" aria-label="Összehasonlító táblázat e^u, a^u, ln u és log_a u deriváltjairól és integráljairól">
        <rect width={560} height={176} className="pl-bg" />

        {/* Fejléc */}
        <rect x={12} y={12} width={536} height={28} rx={6} fill="#1e293b" />
        <text x={96} y={30} textAnchor="middle" fill="#cbd5e1" fontSize={11.5} fontWeight={700}>Művelet</text>
        <text x={256} y={30} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>Természetes alap (e)</text>
        <text x={446} y={30} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>Általános alap (a &gt; 0, a ≠ 1)</text>

        {/* Sor 1: Exponenciális derivált */}
        <rect x={12} y={46} width={536} height={38} rx={6} fill="#0f172a" stroke="#1e293b" />
        <text x={96} y={69} textAnchor="middle" fill="#7dd3fc" fontSize={11} fontWeight={700}>Exp. derivált</text>
        <text x={256} y={69} textAnchor="middle" fill="#e2e8f0" fontSize={12}>(eᵘ)′ = eᵘ · u′</text>
        <text x={446} y={69} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>(aᵘ)′ = aᵘ · (ln a) · u′   [× ln a]</text>

        {/* Sor 2: Exponenciális integrál */}
        <rect x={12} y={88} width={536} height={38} rx={6} fill="#0f172a" stroke="#1e293b" />
        <text x={96} y={111} textAnchor="middle" fill="#7dd3fc" fontSize={11} fontWeight={700}>Exp. integrál</text>
        <text x={256} y={111} textAnchor="middle" fill="#e2e8f0" fontSize={12}>∫ eᵘ du = eᵘ + C</text>
        <text x={446} y={111} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>∫ aᵘ du = aᵘ / (ln a) + C   [÷ ln a]</text>

        {/* Sor 3: Logaritmus derivált */}
        <rect x={12} y={130} width={536} height={38} rx={6} fill="#0f172a" stroke="#1e293b" />
        <text x={96} y={153} textAnchor="middle" fill="#c4b5fd" fontSize={11} fontWeight={700}>Log. derivált</text>
        <text x={256} y={153} textAnchor="middle" fill="#e2e8f0" fontSize={12}>(ln u)′ = u′ / u</text>
        <text x={446} y={153} textAnchor="middle" fill="#f9a8d4" fontSize={12} fontWeight={700}>(logₐ u)′ = u′ / (u · ln a)   [÷ ln a]</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): x^2 = 2^x három metszéspontja */

export function X2vs2XIntersectionWidget() {
  const [x, setX] = useState(-0.77);
  const v1 = x * x;
  const v2 = 2 ** x;

  return (
    <div className="widget">
      <div className="widget-title">Thomas 83. feladat élőben: az x² = 2ˣ egyenlet HÁROM megoldása!</div>
      <div className="relbuttons chips">
        <button type="button" className={Math.abs(x - -0.767) < 0.04 ? 'on' : ''} onClick={() => setX(-0.77)}>
          1. gyök: x ≈ −0,767
        </button>
        <button type="button" className={Math.abs(x - 2) < 0.04 ? 'on' : ''} onClick={() => setX(2)}>
          2. gyök: x = 2
        </button>
        <button type="button" className={Math.abs(x - 4) < 0.04 ? 'on' : ''} onClick={() => setX(4)}>
          3. gyök: x = 4
        </button>
      </div>

      <label>
        Vizsgált <M t={`x = ${tx(x, 2)}`} /> ⇒ <M t={`x^2 = ${tx(v1, 3)}`} /> vs. <M t={`2^x = ${tx(v2, 3)}`} />
        <input type="range" min={-1.8} max={4.4} step={0.01} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.0} xmax={4.6} ymin={-0.5} ymax={18.5} h={210}>
        {(m) => {
          const dSq = buildPath((u) => u * u, -2.0, 4.4, m.X, m.Y, 160);
          const d2x = buildPath((u) => 2 ** u, -2.0, 4.3, m.X, m.Y, 160);
          return (
            <>
              <path d={dSq} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={d2x} fill="none" stroke="#34d399" strokeWidth={2.5} />
              {/* 3 metszéspont */}
              <circle cx={m.X(-0.7667)} cy={m.Y(0.5878)} r={4.5} fill="#fbbf24" />
              <circle cx={m.X(2)} cy={m.Y(4)} r={4.5} fill="#fbbf24" />
              <circle cx={m.X(4)} cy={m.Y(16)} r={4.5} fill="#fbbf24" />
              {/* Aktuális x */}
              <line x1={m.X(x)} y1={m.Y(0)} x2={m.X(x)} y2={m.Y(Math.min(18.5, Math.max(v1, v2)))} stroke="#f472b6" strokeWidth={1.6} strokeDasharray="4 3" />
              <circle cx={m.X(x)} cy={m.Y(Math.min(18.5, v1))} r={4.5} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.2} />
              <circle cx={m.X(x)} cy={m.Y(Math.min(18.5, v2))} r={4.5} fill="#34d399" stroke="#0f172a" strokeWidth={1.2} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>Kék:</strong> <M t="y = x^2" /> · <strong>Zöld:</strong> <M t="y = 2^x" /> ·{' '}
          <M t="x > 4" /> után az exponenciális <M t="2^x" /> végleg lehagyja a parabolát!
        </p>
      </div>
    </div>
  );
}
