import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PLine, PPoint, PVLine } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: Monotonitás és f′ előjele */

export function MonotoneDerivativeWidget() {
  const [x, setX] = useState(0.3);
  // f(x) = x³/3 - x → f'(x) = x² - 1 → kritikus: -1 és +1
  const f = (t: number) => (t * t * t) / 3 - t;
  const df = (t: number) => t * t - 1;
  const y = f(x);
  const slope = df(x);
  const state = Math.abs(slope) < 0.06 ? 'zero' : slope > 0 ? 'inc' : 'dec';

  return (
    <div className="widget">
      <div className="widget-title">A derivált előjele mutatja az irányt: f(x) = ⅓x³ − x</div>
      <label>
        mozgó pont: x = {round(x, 2)} (meredekség: f′(x) = {round(slope, 2)})
        <input type="range" min={-2.2} max={2.2} step={0.05} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <Plane xmin={-2.6} xmax={2.6} ymin={-2.2} ymax={2.2}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} from={-2.6} to={-1} cls="pl-ok" />
            <PFunc map={m} fn={f} from={-1} to={1} cls="pl-alt" />
            <PFunc map={m} fn={f} from={1} to={2.6} cls="pl-ok" />
            <PLine map={m} k={slope} b={y - slope * x} cls={state === 'inc' ? 'pl-ok' : state === 'dec' ? 'pl-alt' : 'pl-dash'} />
            <PPoint map={m} x={-1} y={f(-1)} color="#fbbf24" label="−1" dx={-18} dy={-10} />
            <PPoint map={m} x={1} y={f(1)} color="#fbbf24" label="1" dx={10} dy={16} />
            <PPoint map={m} x={x} y={y} color={state === 'inc' ? '#34d399' : state === 'dec' ? '#fb923c' : '#fbbf24'} />
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={`f'(${tx(x, 2)}) = ${tx(slope, 2)} ${
            state === 'inc' ? '> 0 \\;(\\text{növekvő})' : state === 'dec' ? '< 0 \\;(\\text{csökkenő})' : '= 0 \\;(\\text{kritikus pont})'
          }`}
        />
        <p>
          <strong>Zöld szakaszok (<M t="x < -1" /> és <M t="x > 1" />):</strong> <M t="f'>0" />, a görbe felfelé megy.{' '}
          <strong>Narancs szakasz (<M t="-1 < x < 1" />):</strong> <M t="f'<0" />, a görbe lefelé megy!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Az első derivált teszt 4 esete */

type TestCaseId = 'max' | 'min' | 'inc' | 'dec';

const TEST_CASES: Record<
  TestCaseId,
  { label: string; f: (x: number) => number; signL: string; signR: string; verdict: string; color: string }
> = {
  max: {
    label: '+ → − (lok. max)',
    f: (x) => 1.6 - 0.6 * x * x,
    signL: '+',
    signR: '−',
    verdict: 'Előjelváltás + → − : LOKÁLIS MAXIMUM!',
    color: '#fbbf24',
  },
  min: {
    label: '− → + (lok. min)',
    f: (x) => 0.6 * x * x - 1.2,
    signL: '−',
    signR: '+',
    verdict: 'Előjelváltás − → + : LOKÁLIS MINIMUM!',
    color: '#34d399',
  },
  inc: {
    label: '+ → + (nincs)',
    f: (x) => 0.35 * x * x * x,
    signL: '+',
    signR: '+',
    verdict: 'Nincs előjelváltás (+ → +) : NINCS szélsőérték!',
    color: '#f87171',
  },
  dec: {
    label: '− → − (nincs)',
    f: (x) => -0.35 * x * x * x,
    signL: '−',
    signR: '−',
    verdict: 'Nincs előjelváltás (− → −) : NINCS szélsőérték!',
    color: '#f87171',
  },
};

export function FirstDerivTestCasesWidget() {
  const [tid, setTid] = useState<TestCaseId>('max');
  const cur = TEST_CASES[tid];

  return (
    <div className="widget">
      <div className="widget-title">Az első derivált teszt 4 lehetséges esete egy c = 0 kritikus pontban</div>
      <div className="relbuttons chips">
        {(Object.keys(TEST_CASES) as TestCaseId[]).map((k) => (
          <button key={k} className={tid === k ? 'on' : ''} onClick={() => setTid(k)}>
            {TEST_CASES[k].label}
          </button>
        ))}
      </div>
      <Plane xmin={-2.5} xmax={2.5} ymin={-2.2} ymax={2.2}>
        {(m) => (
          <>
            <PFunc map={m} fn={cur.f} from={-2.5} to={0} cls={cur.signL === '+' ? 'pl-ok' : 'pl-alt'} />
            <PFunc map={m} fn={cur.f} from={0} to={2.5} cls={cur.signR === '+' ? 'pl-ok' : 'pl-alt'} />
            <PPoint map={m} x={0} y={cur.f(0)} color={cur.color} label="c = 0" dx={10} dy={-10} />
            <text x={m.X(-1.3)} y={m.Y(1.6)} textAnchor="middle" fill={cur.signL === '+' ? '#34d399' : '#fb923c'} className="pl-label">
              f′: {cur.signL}
            </text>
            <text x={m.X(1.3)} y={m.Y(1.6)} textAnchor="middle" fill={cur.signR === '+' ? '#34d399' : '#fb923c'} className="pl-label">
              f′: {cur.signR}
            </text>
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          <strong style={{ color: cur.color }}>{cur.verdict}</strong>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: Előjeltáblázat 3 függvényre */

type SignEx = {
  id: string;
  label: string;
  f: (x: number) => number;
  dfTex: string;
  crits: { x: number; tag: string; kind: 'max' | 'min' | 'none' }[];
  intervals: { from: string; to: string; sign: '+' | '-' }[];
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
};

const SIGN_EX: SignEx[] = [
  {
    id: 'cubic',
    label: 'x³ − 3x',
    f: (x) => x * x * x - 3 * x,
    dfTex: "f'(x) = 3(x+1)(x-1)",
    crits: [
      { x: -1, tag: 'max', kind: 'max' },
      { x: 1, tag: 'min', kind: 'min' },
    ],
    intervals: [
      { from: '−∞', to: '−1', sign: '+' },
      { from: '−1', to: '1', sign: '-' },
      { from: '1', to: '+∞', sign: '+' },
    ],
    xmin: -2.6,
    xmax: 2.6,
    ymin: -3.2,
    ymax: 3.2,
  },
  {
    id: 'quartic',
    label: '¼x⁴ − x³',
    f: (x) => 0.25 * x ** 4 - x ** 3,
    dfTex: "f'(x) = x^2(x-3)",
    crits: [
      { x: 0, tag: 'nincs (−→−)', kind: 'none' },
      { x: 3, tag: 'min', kind: 'min' },
    ],
    intervals: [
      { from: '−∞', to: '0', sign: '-' },
      { from: '0', to: '3', sign: '-' },
      { from: '3', to: '+∞', sign: '+' },
    ],
    xmin: -1.5,
    xmax: 4.5,
    ymin: -7.5,
    ymax: 3.5,
  },
  {
    id: 'frac',
    label: 'x^(4/3) − 4x^(1/3)',
    f: (x) => Math.cbrt(x) * (x - 4),
    dfTex: "f'(x) = \\frac{4(x-1)}{3x^{2/3}}",
    crits: [
      { x: 0, tag: 'f′ nem létezik (−→−)', kind: 'none' },
      { x: 1, tag: 'min', kind: 'min' },
    ],
    intervals: [
      { from: '−∞', to: '0', sign: '-' },
      { from: '0', to: '1', sign: '-' },
      { from: '1', to: '+∞', sign: '+' },
    ],
    xmin: -1.8,
    xmax: 4.8,
    ymin: -4.2,
    ymax: 4.2,
  },
];

export function SignChartWidget() {
  const [sid, setSid] = useState('cubic');
  const cur = SIGN_EX.find((e) => e.id === sid) ?? SIGN_EX[0];

  return (
    <div className="widget">
      <div className="widget-title">Előjeltáblázat és grafikon összekapcsolva</div>
      <div className="relbuttons chips">
        {SIGN_EX.map((e) => (
          <button key={e.id} className={sid === e.id ? 'on' : ''} onClick={() => setSid(e.id)}>
            f(x) = {e.label}
          </button>
        ))}
      </div>
      {/* Előjelsáv SVG */}
      <svg viewBox="0 0 540 62" className="plane" role="img" aria-label="Előjeltáblázat">
        <rect width={540} height={62} className="pl-bg" />
        <line x1={30} y1={32} x2={510} y2={32} stroke="#94a3b8" strokeWidth={2} />
        {cur.intervals.map((iv, i) => {
          const w = 480 / cur.intervals.length;
          const cx = 30 + i * w + w / 2;
          const isPos = iv.sign === '+';
          return (
            <g key={i}>
              <rect
                x={32 + i * w}
                y={10}
                width={w - 4}
                height={18}
                rx={5}
                fill={isPos ? 'rgba(52, 211, 153, 0.22)' : 'rgba(251, 146, 60, 0.22)'}
              />
              <text x={cx} y={23} textAnchor="middle" fill={isPos ? '#34d399' : '#fb923c'} fontSize={12} fontWeight={700}>
                f′: {isPos ? '+ (↗)' : '− (↘)'}
              </text>
              <text x={cx} y={50} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>
                ({iv.from}; {iv.to})
              </text>
            </g>
          );
        })}
        {cur.crits.map((c, i) => {
          const w = 480 / cur.intervals.length;
          const xPos = 30 + (i + 1) * w;
          return (
            <g key={c.x}>
              <circle cx={xPos} cy={32} r={5} fill={c.kind === 'max' ? '#fbbf24' : c.kind === 'min' ? '#34d399' : '#f87171'} />
              <text x={xPos} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={11.5} fontWeight={700}>
                {c.x}
              </text>
            </g>
          );
        })}
      </svg>
      <Plane xmin={cur.xmin} xmax={cur.xmax} ymin={cur.ymin} ymax={cur.ymax}>
        {(m) => (
          <>
            <PFunc map={m} fn={cur.f} cls="pl-main" />
            {cur.crits.map((c) => (
              <PPoint
                key={c.x}
                map={m}
                x={c.x}
                y={cur.f(c.x)}
                color={c.kind === 'max' ? '#fbbf24' : c.kind === 'min' ? '#34d399' : '#f87171'}
                label={c.tag}
                dx={8}
                dy={c.kind === 'max' ? -10 : 16}
              />
            ))}
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={cur.dfTex} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Szakadási hely az előjeltáblázatban */

export function AsymptoteTrapWidget() {
  const f = (x: number) => (Math.abs(x) < 0.05 ? NaN : x + 1 / x);
  return (
    <div className="widget">
      <div className="widget-title">Ne felejtsd el a szakadási helyet! f(x) = x + 1/x</div>
      <Plane xmin={-4} xmax={4} ymin={-5} ymax={5}>
        {(m) => (
          <>
            <PVLine map={m} x={0} cls="pl-dash" />
            <PFunc map={m} fn={f} from={-4} to={-0.15} cls="pl-main" />
            <PFunc map={m} fn={f} from={0.15} to={4} cls="pl-main" />
            <PPoint map={m} x={-1} y={-2} color="#fbbf24" label="lok. max (−1; −2)" dx={-115} dy={-10} />
            <PPoint map={m} x={1} y={2} color="#34d399" label="lok. min (1; 2)" dx={10} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t="f'(x) = 1 - \frac{1}{x^2} = \frac{(x-1)(x+1)}{x^2}" />
        <p>
          Az <M t="x=0" /> szakadási helyet is fel kell venni a táblázatba! Bár a lokális maximum (<M t="-2" />) kisebb a lokális minimumnál (<M t="+2" />), mindkettő valódi helyi szélsőérték a saját ágán!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Görbe leolvasása f′ grafikonjából */

export function ReadFromFPrimeWidget() {
  const [x, setX] = useState(0.5);
  // f'(x) = 0.5*(x+1)*(x-2) = 0.5x² - 0.5x - 1
  // f(x)  = (1/6)x³ - (1/4)x² - x
  const df = (t: number) => 0.5 * (t + 1) * (t - 2);
  const f = (t: number) => (t ** 3) / 6 - 0.25 * t * t - t;
  const dVal = df(x);
  const fVal = f(x);

  return (
    <div className="widget">
      <div className="widget-title">Olvasd le f viselkedését f′ grafikonjáról! (szinkronizált kettős nézet)</div>
      <label>
        vizsgált hely: x = {round(x, 2)} (f′(x) = {round(dVal, 2)} → f {dVal > 0.05 ? 'NÖVEKSZIK ↗' : dVal < -0.05 ? 'CSÖKKEN ↘' : 'VÍZSZINTES'})
        <input type="range" min={-2.2} max={3.2} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <Plane xmin={-2.5} xmax={3.5} ymin={-2} ymax={2.8}>
        {(m) => (
          <>
            <PVLine map={m} x={x} cls="pl-dash2" />
            <PFunc map={m} fn={df} cls="pl-alt" />
            <PPoint map={m} x={-1} y={0} color="#fbbf24" label="f′: +→−" dx={-34} dy={-12} />
            <PPoint map={m} x={2} y={0} color="#34d399" label="f′: −→+" dx={8} dy={16} />
            <PPoint map={m} x={x} y={dVal} color="#38bdf8" label="f′(x)" dx={8} dy={-8} />
          </>
        )}
      </Plane>
      <Plane xmin={-2.5} xmax={3.5} ymin={-2.6} ymax={1.8}>
        {(m) => (
          <>
            <PVLine map={m} x={x} cls="pl-dash2" />
            <PFunc map={m} fn={f} cls="pl-main" />
            <PPoint map={m} x={-1} y={f(-1)} color="#fbbf24" label="lok. max" dx={-34} dy={-12} />
            <PPoint map={m} x={2} y={f(2)} color="#34d399" label="lok. min" dx={8} dy={16} />
            <PPoint map={m} x={x} y={fVal} color="#38bdf8" label="f(x)" dx={8} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          <strong>Felső ábra (<M t="f'" />):</strong> az <M t="x" />-tengely <em>felett</em> → az alsó görbe (<M t="f" />) emelkedik; a tengely <em>alatt</em> → süllyed; tengelymetszés <M t="+\to -" /> → lokális maximum (<M t="x=-1" />); <M t="-\to +" /> → lokális minimum (<M t="x=2" />)!
        </p>
      </div>
    </div>
  );
}
