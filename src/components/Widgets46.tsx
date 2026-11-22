import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PLine, PPoint } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: L'Hospital nagyító */

export function LHospitalZoomWidget() {
  const [x, setX] = useState(0.5);
  const [span, setSpan] = useState(1.6);

  // f(x) = sin(2x), g(x) = x + x² → f(0)=0, g(0)=0, f'(0)=2, g'(0)=1 → határérték = 2
  const f = (t: number) => Math.sin(2 * t);
  const g = (t: number) => t + t * t;
  const fx = f(x);
  const gx = g(x);
  const ratio = Math.abs(gx) > 1e-6 ? fx / gx : 2;

  return (
    <div className="widget">
      <div className="widget-title">Miért működik a L’Hospital-szabály? Közelről a görbék egyenesek!</div>
      <label>
        közelítő pont: x = {round(x, 2)} (f(x) = sin 2x, g(x) = x + x²)
        <input type="range" min={0.04} max={1.2} step={0.04} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <label>
        nagyítás (ablak): ±{round(span, 2)}
        <input type="range" min={0.25} max={2.0} step={0.05} value={span} onChange={(e) => setSpan(Number(e.target.value))} />
      </label>
      <Plane xmin={-span} xmax={span} ymin={-span} ymax={span}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} cls="pl-main" />
            <PFunc map={m} fn={g} cls="pl-alt" />
            <PLine map={m} k={2} b={0} cls="pl-dash2" />
            <PLine map={m} k={1} b={0} cls="pl-dash" />
            <PPoint map={m} x={x} y={fx} color="#38bdf8" label="f(x)" dx={8} dy={-8} />
            <PPoint map={m} x={x} y={gx} color="#fb923c" label="g(x)" dx={8} dy={14} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`\\frac{f(${tx(x, 2)})}{g(${tx(x, 2)})} = \\frac{${tx(fx, 4)}}{${tx(gx, 4)}} = ${tx(ratio, 4)} \\;\\xrightarrow{x\\to 0}\\; \\frac{f'(0)}{g'(0)} = \\frac{2}{1} = 2`} />
        <p>
          Nagyíts rá <M t="\pm 0{,}25" />-re: a kék görbe beleolvad a <M t="2x" /> érintőjébe, a narancs az <M t="1x" /> érintőjébe — a hányadosuk pedig egyszerűen a két meredekség aránya (<M t="2/1=2" />)!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Lépésenkénti L'Hospital-gép */

type LhExample = {
  id: string;
  label: string;
  steps: { tag: string; tex: string; note: string }[];
};

const LH_EXAMPLES: LhExample[] = [
  {
    id: 'cos',
    label: '(1 − cos x) / x²',
    steps: [
      { tag: '0. Kiindulás', tex: '\\lim_{x\\to 0}\\frac{1-\\cos x}{x^2} \\quad \\left[\\frac{0}{0}\\right]', note: 'Mindkettő 0-hoz tart → alkalmazható L’Hospital!' },
      { tag: '1. L’Hospital', tex: '= \\lim_{x\\to 0}\\frac{\\sin x}{2x} \\quad \\left[\\frac{0}{0}\\right]', note: 'Még mindig 0/0 alak! Alkalmazzuk még egyszer (vagy a nevezetes határértéket)!' },
      { tag: '2. L’Hospital → STOP!', tex: '= \\lim_{x\\to 0}\\frac{\\cos x}{2} = \\frac{1}{2}', note: 'Már NEM 0/0! Behelyettesítünk és MEGÁLLUNK!' },
    ],
  },
  {
    id: 'sin',
    label: '(x − sin x) / x³',
    steps: [
      { tag: '0. Kiindulás', tex: '\\lim_{x\\to 0}\\frac{x-\\sin x}{x^3} \\quad \\left[\\frac{0}{0}\\right]', note: '0/0 alak → 1. deriválás.' },
      { tag: '1. L’Hospital', tex: '= \\lim_{x\\to 0}\\frac{1-\\cos x}{3x^2} \\quad \\left[\\frac{0}{0}\\right]', note: 'Még mindig 0/0 → 2. deriválás.' },
      { tag: '2. L’Hospital', tex: '= \\lim_{x\\to 0}\\frac{\\sin x}{6x} \\quad \\left[\\frac{0}{0}\\right]', note: 'Még mindig 0/0 → 3. deriválás.' },
      { tag: '3. L’Hospital → STOP!', tex: '= \\lim_{x\\to 0}\\frac{\\cos x}{6} = \\frac{1}{6}', note: 'Kész! Behelyettesítéssel 1/6.' },
    ],
  },
  {
    id: 'inf',
    label: '(3x² + 5x) / (2x² − 1)',
    steps: [
      { tag: '0. Kiindulás', tex: '\\lim_{x\\to\\infty}\\frac{3x^2+5x}{2x^2-1} \\quad \\left[\\frac{\\infty}{\\infty}\\right]', note: '∞/∞ alak → alkalmazható L’Hospital!' },
      { tag: '1. L’Hospital', tex: '= \\lim_{x\\to\\infty}\\frac{6x+5}{4x} \\quad \\left[\\frac{\\infty}{\\infty}\\right]', note: 'Még mindig ∞/∞ → deriváljunk még egyszer!' },
      { tag: '2. L’Hospital → STOP!', tex: '= \\lim_{x\\to\\infty}\\frac{6}{4} = \\frac{3}{2}', note: 'Konstansok hányadosa → kész!' },
    ],
  },
];

export function StepByStepLHospitalWidget() {
  const [eid, setEid] = useState('cos');
  const [stepIdx, setStepIdx] = useState(0);
  const ex = LH_EXAMPLES.find((e) => e.id === eid) ?? LH_EXAMPLES[0];
  const s = ex.steps[Math.min(stepIdx, ex.steps.length - 1)];

  return (
    <div className="widget">
      <div className="widget-title">Ismételt L’Hospital-szabály lépésről lépésre</div>
      <div className="relbuttons chips">
        {LH_EXAMPLES.map((e) => (
          <button
            key={e.id}
            className={eid === e.id ? 'on' : ''}
            onClick={() => {
              setEid(e.id);
              setStepIdx(0);
            }}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className="relbuttons chips">
        {ex.steps.map((st, i) => (
          <button key={st.tag} className={stepIdx === i ? 'on' : ''} onClick={() => setStepIdx(i)}>
            {st.tag}
          </button>
        ))}
      </div>
      <div className="result">
        <M block t={s.tex} />
        <p>{s.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: Csapda-detektor */

type TrapId = 'not00' | 'loop' | 'osc';

const TRAPS: Record<TrapId, { label: string; badTex: string; goodTex: string; why: string }> = {
  not00: {
    label: '1. Túl-deriválás (nem 0/0!)',
    badTex: '\\lim_{x\\to 0}\\frac{1-\\cos x}{x+x^2} \\xrightarrow{0/0} \\lim\\frac{\\sin x}{1+2x} \\;\\xrightarrow{\\text{HIBÁS!}}\\ \\lim\\frac{\\cos x}{2} = \\frac{1}{2}',
    goodTex: '\\lim_{x\\to 0}\\frac{\\sin x}{1+2x} = \\frac{0}{1} = 0 \\quad (\\text{már NEM } 0/0!)',
    why: 'Az első lépés után a nevező 1-hez tart, nem 0-hoz! Ha tovább deriválsz, hamis eredményt kapsz!',
  },
  loop: {
    label: '2. Végtelen ciklus',
    badTex: '\\lim_{x\\to\\infty}\\frac{x}{\\sqrt{x^2+1}} \\xrightarrow{\\text{L’H}} \\lim\\frac{\\sqrt{x^2+1}}{x} \\xrightarrow{\\text{L’H}} \\lim\\frac{x}{\\sqrt{x^2+1}} \\;\\cdots',
    goodTex: '\\lim_{x\\to\\infty}\\frac{x}{x\\sqrt{1+1/x^2}} = \\lim_{x\\to\\infty}\\frac{1}{\\sqrt{1+1/x^2}} = 1',
    why: 'A L’Hospital-szabály oda-vissza pattog! Ilyenkor a régi jó x-szel való osztás 1 lépésben megoldja.',
  },
  osc: {
    label: '3. Oszcilláló f′/g′',
    badTex: '\\lim_{x\\to\\infty}\\frac{x+\\sin x}{x} \\xrightarrow{\\text{L’H}} \\lim_{x\\to\\infty}\\frac{1+\\cos x}{1} \\;(\\text{NEM létezik!})',
    goodTex: '\\lim_{x\\to\\infty}\\left(1 + \\frac{\\sin x}{x}\\right) = 1 + 0 = 1',
    why: 'A szabály csak akkor érvényes, ha lim(f′/g′) LÉTEZIK! Ha nem létezik, az eredeti határérték még létezhet!',
  },
};

export function TrapDetectorWidget() {
  const [tid, setTid] = useState<TrapId>('not00');
  const t = TRAPS[tid];

  return (
    <div className="widget">
      <div className="widget-title">Mikor NE használd a L’Hospital-szabályt? A 3 legnagyobb csapda</div>
      <div className="relbuttons chips">
        {(Object.keys(TRAPS) as TrapId[]).map((k) => (
          <button key={k} className={tid === k ? 'on' : ''} onClick={() => setTid(k)}>
            {TRAPS[k].label}
          </button>
        ))}
      </div>
      <div className="result">
        <p style={{ color: '#fca5a5', fontWeight: 600 }}>Hibás / elakadó próba:</p>
        <M block t={t.badTex} />
        <p style={{ color: '#6ee7b7', fontWeight: 600 }}>Helyes megoldás:</p>
        <M block t={t.goodTex} />
        <p>{t.why}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: A 7 határozatlan alak térképe */

export function IndeterminateMapDiagram() {
  const rows = [
    { form: '0 / 0   és   ∞ / ∞', action: 'Közvetlenül L’Hospital!', c: '#34d399' },
    { form: '0 · ∞', action: 'Írd törtbe: f / (1/g)  →  0/0 vagy ∞/∞', c: '#38bdf8' },
    { form: '∞ − ∞', action: 'Közös nevező / kiemelés / konjugált  →  0/0 vagy ∞/∞', c: '#fbbf24' },
    { form: '1^∞,  0^0,  ∞^0', action: 'Vegyél ln-t: ln y = g·ln f  →  0·∞  (7. fejezet)', c: '#fb923c' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">A 7 határozatlan alak teljes stratégiatérképe</div>
      <svg viewBox="0 0 540 195" className="plane" role="img" aria-label="7 határozatlan alak térképe">
        <rect width={540} height={195} className="pl-bg" />
        {rows.map((r, i) => {
          const y = 14 + i * 34;
          return (
            <g key={r.form}>
              <rect x={16} y={y} width={150} height={26} rx={6} fill="rgba(255,255,255,0.05)" stroke={r.c} strokeWidth={1.4} />
              <text x={91} y={y + 17} textAnchor="middle" fill={r.c} fontSize={12} fontWeight={700}>{r.form}</text>
              <text x={178} y={y + 17} fill="#94a3b8" fontSize={12}>→</text>
              <text x={196} y={y + 17} fill="#e2e8f0" fontSize={11.8}>{r.action}</text>
            </g>
          );
        })}
        {/* Nem határozatlan doboz */}
        <rect x={16} y={154} width={508} height={30} rx={7} fill="rgba(248, 113, 113, 0.12)" stroke="#f87171" strokeWidth={1.3} />
        <text x={270} y={173} textAnchor="middle" fill="#fca5a5" fontSize={11.5} fontWeight={600}>
          NEM határozatlan alakok:  0/∞ = 0   ·   ∞/0 = ±∞   ·   ∞ + ∞ = ∞   ·   0^∞ = 0
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: 1^∞ alak — (1 + a/x)^x → e^a */

export function EulerLimitWidget() {
  const [a, setA] = useState(1);
  const [x, setX] = useState(20);
  const val = Math.pow(1 + a / x, x);
  const lim = Math.exp(a);

  return (
    <div className="widget">
      <div className="widget-title">Miért határozatlan az 1^∞ alak? (1 + a/x)ˣ → eᵃ</div>
      <div className="relbuttons chips">
        {[1, 2, -1].map((av) => (
          <button key={av} className={a === av ? 'on' : ''} onClick={() => setA(av)}>
            a = {av > 0 ? `+${av}` : '−1'} (határérték: e^{av === 1 ? '1' : av} ≈ {round(Math.exp(av), 3)})
          </button>
        ))}
      </div>
      <label>
        x = {x} (az alap 1 + {a}/{x} = {round(1 + a / x, 4)} → 1, a kitevő x → ∞)
        <input type="range" min={2} max={200} step={2} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <div className="result">
        <M block t={`\\left(1 + \\frac{${a}}{${x}}\\right)^{${x}} = ${tx(val, 5)} \\;\\xrightarrow{x\\to\\infty}\\; e^{${a}} \\approx ${tx(lim, 5)}`} />
        <p>
          Hiába tart az alap mindhárom esetben <M t="1" />-hez és a kitevő <M t="\infty" />-be, a határérték más és más (<M t="e \approx 2{,}718" />, <M t="e^2 \approx 7{,}389" />, <M t="e^{-1} \approx 0{,}368" />)!
        </p>
      </div>
    </div>
  );
}
