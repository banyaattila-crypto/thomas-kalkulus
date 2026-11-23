import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: u-helyettesítés 4 lépése */

export function SubstitutionFlowDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Az u-helyettesítés 4 lépéses munkamenete</div>
      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="u-helyettesítés 4 lépése">
        <rect width={540} height={165} className="pl-bg" />

        {/* 1. doboz */}
        <rect x={12} y={24} width={114} height={96} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.8} />
        <text x={69} y={44} textAnchor="middle" fill="#fde68a" fontSize={11.5} fontWeight={700}>1. Válassz u-t</text>
        <text x={69} y={70} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={700}>u = g(x)</text>
        <text x={69} y={92} textAnchor="middle" fill="#94a3b8" fontSize={10}>belső függvény</text>
        <text x={69} y={106} textAnchor="middle" fill="#94a3b8" fontSize={10}>(gyök, zárójel)</text>

        <line x1={128} y1={72} x2={144} y2={72} stroke="#94a3b8" strokeWidth={1.8} />
        <polygon points="146,72 138,68 138,76" fill="#94a3b8" />

        {/* 2. doboz */}
        <rect x={148} y={24} width={114} height={96} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.8} />
        <text x={205} y={44} textAnchor="middle" fill="#a7f3d0" fontSize={11.5} fontWeight={700}>2. Differenciálj</text>
        <text x={205} y={70} textAnchor="middle" fill="#e2e8f0" fontSize={12.5} fontWeight={700}>du = g′(x) dx</text>
        <text x={205} y={92} textAnchor="middle" fill="#94a3b8" fontSize={10}>szükség esetén</text>
        <text x={205} y={106} textAnchor="middle" fill="#94a3b8" fontSize={10}>konstans-igazítás</text>

        <line x1={264} y1={72} x2={280} y2={72} stroke="#94a3b8" strokeWidth={1.8} />
        <polygon points="282,72 274,68 274,76" fill="#94a3b8" />

        {/* 3. doboz */}
        <rect x={284} y={24} width={114} height={96} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={341} y={44} textAnchor="middle" fill="#7dd3fc" fontSize={11.5} fontWeight={700}>3. Integrálj u-ra</text>
        <text x={341} y={70} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={700}>∫ f(u) du</text>
        <text x={341} y={92} textAnchor="middle" fill="#94a3b8" fontSize={10}>= F(u) + C</text>
        <text x={341} y={106} textAnchor="middle" fill="#94a3b8" fontSize={10}>(már nincs x!)</text>

        <line x1={400} y1={72} x2={416} y2={72} stroke="#94a3b8" strokeWidth={1.8} />
        <polygon points="418,72 410,68 410,76" fill="#94a3b8" />

        {/* 4. doboz */}
        <rect x={420} y={24} width={108} height={96} rx={8} fill="#0f172a" stroke="#c084fc" strokeWidth={1.8} />
        <text x={474} y={44} textAnchor="middle" fill="#e9d5ff" fontSize={11.5} fontWeight={700}>4. Írd vissza</text>
        <text x={474} y={70} textAnchor="middle" fill="#e2e8f0" fontSize={12.5} fontWeight={700}>F(g(x)) + C</text>
        <text x={474} y={92} textAnchor="middle" fill="#94a3b8" fontSize={10}>ellenőrzés:</text>
        <text x={474} y={106} textAnchor="middle" fill="#94a3b8" fontSize={10}>deriváld vissza!</text>

        {/* Alsó tipp */}
        <text x={270} y={148} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>
          Aranyszabály: a 3. lépésben SEMMILYEN x nem maradhat az integráljel alatt!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: 4 arany-minta felismerő */

type PatternEx = {
  id: string;
  label: string;
  integralTex: string;
  uTex: string;
  duTex: string;
  subTex: string;
  resTex: string;
  tip: string;
};

const PATTERNS: PatternEx[] = [
  {
    id: 'root',
    label: '1. Gyök belseje',
    integralTex: '\\int x\\sqrt{x^2+3}\\,dx',
    uTex: 'u = x^2 + 3',
    duTex: 'du = 2x\\,dx \\;\\Rightarrow\\; x\\,dx = \\dfrac{1}{2}\\,du',
    subTex: '\\frac{1}{2}\\int u^{1/2}\\,du = \\frac{1}{2}\\cdot\\frac{2}{3}u^{3/2} + C',
    resTex: '\\dfrac{1}{3}(x^2+3)^{3/2} + C',
    tip: 'A gyök belsejének deriváltja (2x) csak egy 2-es konstansban tér el az előtte álló x-től!',
  },
  {
    id: 'trig',
    label: '2. Szögfüggvény belseje',
    integralTex: '\\int x^2\\cos(x^3-1)\\,dx',
    uTex: 'u = x^3 - 1',
    duTex: 'du = 3x^2\\,dx \\;\\Rightarrow\\; x^2\\,dx = \\dfrac{1}{3}\\,du',
    subTex: '\\frac{1}{3}\\int \\cos u\\,du = \\frac{1}{3}\\sin u + C',
    resTex: '\\dfrac{1}{3}\\sin(x^3-1) + C',
    tip: 'A koszinusz belsejében köbös kifejezés (x³−1) van, kívül pedig éppen a négyzetes deriváltja (x²)!',
  },
  {
    id: 'frac',
    label: '3. Nevező hatványa',
    integralTex: '\\int \\frac{6t}{(t^2+5)^3}\\,dt',
    uTex: 'u = t^2 + 5',
    duTex: 'du = 2t\\,dt \\;\\Rightarrow\\; 6t\\,dt = 3\\,du',
    subTex: '3\\int u^{-3}\\,du = 3\\cdot\\frac{u^{-2}}{-2} + C',
    resTex: '-\\dfrac{3}{2(t^2+5)^2} + C',
    tip: 'Ha a nevezőben egy (·)ᵏ hatvány ül, szinte mindig a zárójel belseje a nyerő u!',
  },
  {
    id: 'trigpow',
    label: '4. Szögfüggvény hatványa',
    integralTex: '\\int \\sin^5 x\\cos x\\,dx',
    uTex: 'u = \\sin x',
    duTex: 'du = \\cos x\\,dx',
    subTex: '\\int u^5\\,du = \\frac{u^6}{6} + C',
    resTex: '\\dfrac{\\sin^6 x}{6} + C',
    tip: 'A magasabb hatványon álló szögfüggvényt (sin x) választjuk u-nak, mert a mellette álló cos x pontosan a du!',
  },
];

export function USubstitutionMatcherWidget() {
  const [idx, setIdx] = useState(0);
  const p = PATTERNS[idx];

  return (
    <div className="widget">
      <div className="widget-title">A 4 leggyakoribb u-helyettesítési minta</div>
      <div className="relbuttons chips" role="tablist" aria-label="Helyettesítési minták">
        {PATTERNS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <div className="result">
        <p><strong>Feladat:</strong></p>
        <M block t={p.integralTex} />
        <p>
          <strong>Választás:</strong> <M t={p.uTex} /> &nbsp;·&nbsp; <strong>Differenciál:</strong> <M t={p.duTex} />
        </p>
        <p><strong>Átírás és integrálás:</strong></p>
        <M block t={`${p.subTex} = ${p.resTex}`} />
        <p><em>Miért működik?</em> {p.tip}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: algebrai visszahelyettesítés */

export function AlgebraicSubStepDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Amikor „marad egy x” — algebrai átírás u-ra</div>
      <svg viewBox="0 0 540 175" className="plane" role="img" aria-label="Algebrai visszahelyettesítés lépései">
        <rect width={540} height={175} className="pl-bg" />

        {/* Eredeti integrál */}
        <text x={185} y={40} textAnchor="end" fill="#e2e8f0" fontSize={20} fontFamily="Georgia, serif">∫</text>
        <text x={208} y={40} textAnchor="middle" fill="#fb923c" fontSize={21} fontWeight={700} fontStyle="italic">x</text>
        <text x={270} y={40} textAnchor="middle" fill="#fbbf24" fontSize={20} fontWeight={700}>√(2x + 1)</text>
        <text x={338} y={40} textAnchor="middle" fill="#34d399" fontSize={20} fontWeight={700} fontStyle="italic">dx</text>

        {/* Nyilak lefelé */}
        <line x1={208} y1={50} x2={110} y2={88} stroke="#fb923c" strokeWidth={1.7} />
        <line x1={270} y1={50} x2={270} y2={88} stroke="#fbbf24" strokeWidth={1.7} />
        <line x1={338} y1={50} x2={430} y2={88} stroke="#34d399" strokeWidth={1.7} />

        {/* 3 csere-doboz */}
        <rect x={28} y={92} width={164} height={46} rx={7} fill="#0f172a" stroke="#fb923c" strokeWidth={1.5} />
        <text x={110} y={111} textAnchor="middle" fill="#fed7aa" fontSize={12} fontWeight={700}>x = (u − 1) / 2</text>
        <text x={110} y={128} textAnchor="middle" fill="#94a3b8" fontSize={10}>kifejeztük u = 2x+1-ből!</text>

        <rect x={204} y={92} width={132} height={46} rx={7} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
        <text x={270} y={111} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>√(2x+1) = u¹ᐟ²</text>
        <text x={270} y={128} textAnchor="middle" fill="#94a3b8" fontSize={10}>gyök → hatvány</text>

        <rect x={348} y={92} width={164} height={46} rx={7} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
        <text x={430} y={111} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>dx = du / 2</text>
        <text x={430} y={128} textAnchor="middle" fill="#94a3b8" fontSize={10}>du = 2 dx-ből</text>

        {/* Eredmény sor */}
        <text x={270} y={162} textAnchor="middle" fill="#7dd3fc" fontSize={13.5} fontWeight={700}>
          ⇒  ¼ ∫ (u − 1)·u¹ᐟ² du  =  ¼ ∫ (u³ᐟ² − u¹ᐟ²) du   (már sima hatványszabály!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: ekvivalens primitív függvények */

export function EquivalentPrimitivesWidget() {
  const [aligned, setAligned] = useState(false);

  const f1: Fn = (x) => Math.sin(x) ** 2;
  const f2: Fn = (x) => -(Math.cos(x) ** 2) + (aligned ? 1 : 0);
  const f3: Fn = (x) => -0.5 * Math.cos(2 * x) + (aligned ? 0.5 : 0);

  return (
    <div className="widget">
      <div className="widget-title">Három különbözőnek tűnő válasz az ∫ 2 sin x cos x dx integrálra</div>
      <div className="relbuttons chips">
        <button type="button" className={!aligned ? 'on' : ''} onClick={() => setAligned(false)}>
          Eredeti alakok (C = 0)
        </button>
        <button type="button" className={aligned ? 'on' : ''} onClick={() => setAligned(true)}>
          Eltolás (+C hozzáadása) → egybeesnek!
        </button>
      </div>

      <Chart xmin={-0.3} xmax={6.6} ymin={-1.25} ymax={1.25} h={215}>
        {(m) => (
          <>
            <path d={curve(f1, m, 260)} fill="none" stroke="#38bdf8" strokeWidth={aligned ? 4.5 : 2.5} />
            <path d={curve(f2, m, 260)} fill="none" stroke="#fb923c" strokeWidth={2.5} strokeDasharray={aligned ? '8 5' : undefined} />
            <path d={curve(f3, m, 260)} fill="none" stroke="#34d399" strokeWidth={2.5} strokeDasharray={aligned ? '3 4' : undefined} />
          </>
        )}
      </Chart>

      <div className="result">
        <p>
          <span style={{ color: '#38bdf8' }}>■</span> <M t="F_1(x) = \sin^2 x" /> ·{' '}
          <span style={{ color: '#fb923c' }}>■</span> <M t={aligned ? 'F_2(x)+1 = -\\cos^2 x + 1' : 'F_2(x) = -\\cos^2 x'} /> ·{' '}
          <span style={{ color: '#34d399' }}>■</span> <M t={aligned ? 'F_3(x)+\\frac{1}{2} = -\\frac{1}{2}\\cos 2x + \\frac{1}{2}' : 'F_3(x) = -\\frac{1}{2}\\cos 2x'} />
        </p>
        <p>
          {aligned
            ? 'Pontosan fedésbe kerültek! Mindhárom ugyanannak a 2 sin x cos x függvénynek a primitív függvénye, csak a +C konstans más.'
            : 'Különböző magasságban futnak, de minden x-nél párhuzamosak (azonos a meredekségük) — a különbségük pontosan állandó!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: háztartási AC feszültség (RMS) */

export function ACVoltageRMSWidget() {
  const [veff, setVeff] = useState(230);
  const [showSq, setShowSq] = useState(false);

  const vmax = veff * Math.SQRT2;
  const vHalfAvg = (2 * vmax) / Math.PI;
  // Normalizált grafikon: t in [0, 1] jelöli a [0, 1/50] s egy teljes periódust
  const wave: Fn = (t) => Math.sin(2 * Math.PI * t);
  const waveSq: Fn = (t) => Math.sin(2 * Math.PI * t) ** 2;

  return (
    <div className="widget">
      <div className="widget-title">Háztartási váltakozó áram: csúcsfeszültség vs. effektív (RMS) érték</div>
      <div className="relbuttons chips">
        <button type="button" className={!showSq ? 'on' : ''} onClick={() => setShowSq(false)}>
          Feszültség V(t) (átlag = 0)
        </button>
        <button type="button" className={showSq ? 'on' : ''} onClick={() => setShowSq(true)}>
          Feszültségnégyzet V²(t) (átlag = V_max² / 2)
        </button>
      </div>

      <label>
        Névleges effektív feszültség: <M t={`V_{\\text{eff}} = ${veff}\\text{ V}`} />
        <input type="range" min={110} max={400} step={10} value={veff} onChange={(e) => setVeff(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.05} xmax={1.08} ymin={showSq ? -0.15 : -1.25} ymax={1.25} h={215}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          return showSq ? (
            <>
              {/* V^2 átlagszint: 0.5 */}
              <rect x={sx(0)} y={sy(0.5)} width={sx(1) - sx(0)} height={sy(0) - sy(0.5)} fill="rgba(52,211,153,0.18)" />
              <line x1={sx(0)} y1={sy(0.5)} x2={sx(1)} y2={sy(0.5)} stroke="#34d399" strokeWidth={2.2} strokeDasharray="6 3" />
              <path d={curve(waveSq, m, 260)} fill="none" stroke="#fbbf24" strokeWidth={2.6} />
              <text x={sx(0.98)} y={sy(0.55)} textAnchor="end" fill="#a7f3d0" fontSize={11.5} fontWeight={700}>
                (V²)átlag = V_max² / 2
              </text>
            </>
          ) : (
            <>
              {/* Effektív szint: 1/sqrt(2) ≈ 0.707 */}
              <line x1={sx(0)} y1={sy(Math.SQRT1_2)} x2={sx(1)} y2={sy(Math.SQRT1_2)} stroke="#34d399" strokeWidth={2} strokeDasharray="6 3" />
              <line x1={sx(0)} y1={sy(1)} x2={sx(1)} y2={sy(1)} stroke="#fb7185" strokeWidth={1.4} strokeDasharray="3 3" />
              <path d={curve(wave, m, 260)} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
              <text x={sx(0.98)} y={sy(1.06)} textAnchor="end" fill="#fecdd3" fontSize={11} fontWeight={700}>
                Csúcs: V_max ≈ {round(vmax, 1)} V
              </text>
              <text x={sx(0.98)} y={sy(Math.SQRT1_2 + 0.06)} textAnchor="end" fill="#a7f3d0" fontSize={11} fontWeight={700}>
                Effektív: V_eff = {veff} V
              </text>
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <M t={`V_{\\text{eff}} = ${veff}\\text{ V}`} /> · Csúcsfeszültség:{' '}
          <M t={`V_{\\max} = \\sqrt{2}\\,V_{\\text{eff}} \\approx ${tx(vmax, 1)}\\text{ V}`} /> · Félperiódus átlaga:{' '}
          <M t={`\\dfrac{2V_{\\max}}{\\pi} \\approx ${tx(vHalfAvg, 1)}\\text{ V}`} />
        </p>
      </div>
    </div>
  );
}
