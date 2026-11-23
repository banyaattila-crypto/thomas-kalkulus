import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PLine, PPoint } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: Primitív függvények családja */

export function AntiderivFamilyWidget() {
  const [kind, setKind] = useState<'poly' | 'trig'>('poly');
  const [c, setC] = useState(1);
  const [x, setX] = useState(1);

  const isPoly = kind === 'poly';
  // poly: f(x) = x → F(x) = 0.5x² + C
  // trig: f(x) = cos x → F(x) = sin x + C
  const F = (t: number, k: number) => (isPoly ? 0.5 * t * t + k : Math.sin(t) + k);
  const f = (t: number) => (isPoly ? t : Math.cos(t));
  const y = F(x, c);
  const slope = f(x);

  return (
    <div className="widget">
      <div className="widget-title">Primitív függvények családja: minden +C eltoltnak azonos a deriváltja!</div>
      <div className="relbuttons chips">
        <button className={isPoly ? 'on' : ''} onClick={() => setKind('poly')}>
          f(x) = x  →  F(x) = ½x² + C
        </button>
        <button className={!isPoly ? 'on' : ''} onClick={() => setKind('trig')}>
          f(x) = cos x  →  F(x) = sin x + C
        </button>
      </div>
      <label>
        integrációs állandó: C = {round(c, 1)}
        <input type="range" min={-2.5} max={2.5} step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
      </label>
      <label>
        vizsgált pont: x = {round(x, 1)} (érintő meredeksége: F′(x) = f(x) = {round(slope, 2)})
        <input type="range" min={-2.2} max={2.2} step={0.2} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <Plane xmin={-3} xmax={3} ymin={-3} ymax={4.2}>
        {(m) => (
          <>
            {[-2, -1, 0, 1, 2].map((k) => (
              <PFunc key={k} map={m} fn={(t) => F(t, k)} cls="pl-ghost" />
            ))}
            <PFunc map={m} fn={(t) => F(t, c)} cls="pl-main" />
            <PLine map={m} k={slope} b={y - slope * x} cls="pl-alt" />
            <PPoint map={m} x={x} y={y} color="#fbbf24" label={`F′ = ${round(slope, 2)}`} dx={10} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={
            isPoly
              ? `F(x) = \\frac{1}{2}x^2 ${c >= 0 ? '+' : ''} ${tx(c, 1)} \\;\\Longrightarrow\\; F'(x) = x = f(x)`
              : `F(x) = \\sin x ${c >= 0 ? '+' : ''} ${tx(c, 1)} \\;\\Longrightarrow\\; F'(x) = \\cos x = f(x)`
          }
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Hatványszabály visszafelé */

type PowOpt = { n: string; fTex: string; FTex: string; checkTex: string; forbidden?: boolean };

const POW_OPTS: PowOpt[] = [
  { n: 'n = 3', fTex: 'x^3', FTex: '\\frac{x^4}{4} + C', checkTex: '\\left(\\frac{x^4}{4}\\right)\' = x^3' },
  { n: 'n = 1', fTex: 'x', FTex: '\\frac{x^2}{2} + C', checkTex: '\\left(\\frac{x^2}{2}\\right)\' = x' },
  { n: 'n = 1/2 (√x)', fTex: 'x^{1/2}', FTex: '\\frac{2}{3}x^{3/2} + C', checkTex: '\\left(\\frac{2}{3}x^{3/2}\\right)\' = x^{1/2}' },
  { n: 'n = −1/2', fTex: 'x^{-1/2}', FTex: '2x^{1/2} + C = 2\\sqrt{x} + C', checkTex: '(2\\sqrt{x})\' = \\frac{1}{\\sqrt{x}}' },
  { n: 'n = −1 (1/x)', fTex: 'x^{-1} = \\frac{1}{x}', FTex: '\\text{TILOS a hatványszabály! } (\\to \\ln|x|+C,\\text{ 7. fej.})', checkTex: 'n+1 = 0 \\text{ (nullával osztás!)}', forbidden: true },
  { n: 'n = −2', fTex: 'x^{-2} = \\frac{1}{x^2}', FTex: '\\frac{x^{-1}}{-1} + C = -\\frac{1}{x} + C', checkTex: '\\left(-\\frac{1}{x}\\right)\' = \\frac{1}{x^2}' },
];

export function PowerRuleReverseWidget() {
  const [idx, setIdx] = useState(2);
  const cur = POW_OPTS[idx];

  return (
    <div className="widget">
      <div className="widget-title">A hatványszabály visszafelé: növeld a kitevőt 1-gyel, és ossz az új kitevővel!</div>
      <div className="relbuttons chips">
        {POW_OPTS.map((p, i) => (
          <button key={p.n} className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {p.n}
          </button>
        ))}
      </div>
      <div className="result">
        <M block t={`\\int ${cur.fTex}\\,dx = ${cur.FTex}`} />
        <p style={{ color: cur.forbidden ? '#fca5a5' : '#6ee7b7' }}>
          <strong>{cur.forbidden ? 'Figyelem:' : 'Ellenőrzés deriválással:'}</strong> <M t={cur.checkTex} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: Az integrál anatómiája */

export function IntegralAnatomyDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A határozatlan integrál anatómiája: ∫ f(x) dx = F(x) + C</div>
      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="Határozatlan integrál részei">
        <rect width={540} height={165} className="pl-bg" />
        {/* Nagy képlet középen */}
        <text x={82} y={88} fill="#38bdf8" fontSize={44} fontFamily="serif">∫</text>
        <text x={115} y={82} fill="#34d399" fontSize={28} fontStyle="italic">f(x)</text>
        <text x={175} y={82} fill="#fb923c" fontSize={26} fontStyle="italic">dx</text>
        <text x={225} y={82} fill="#94a3b8" fontSize={28}>=</text>
        <text x={265} y={82} fill="#fbbf24" fontSize={28} fontStyle="italic">F(x)</text>
        <text x={335} y={82} fill="#94a3b8" fontSize={28}>+</text>
        <text x={372} y={82} fill="#f87171" fontSize={28} fontStyle="italic">C</text>

        {/* Mutató vonalak és címkék */}
        <line x1={90} y1={42} x2={90} y2={24} stroke="#38bdf8" strokeWidth={1.4} />
        <text x={90} y={18} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>integráljel</text>

        <line x1={138} y1={95} x2={138} y2={132} stroke="#34d399" strokeWidth={1.4} />
        <text x={138} y={148} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>integrandus</text>

        <line x1={188} y1={52} x2={215} y2={26} stroke="#fb923c" strokeWidth={1.4} />
        <text x={225} y={18} textAnchor="middle" fill="#fb923c" fontSize={11.5} fontWeight={700}>változó (x szerint!)</text>

        <line x1={290} y1={95} x2={290} y2={132} stroke="#fbbf24" strokeWidth={1.4} />
        <text x={290} y={148} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>egy primitív fv. (F′=f)</text>

        <line x1={382} y1={52} x2={425} y2={26} stroke="#f87171" strokeWidth={1.4} />
        <text x={445} y={18} textAnchor="middle" fill="#f87171" fontSize={11.5} fontWeight={700}>integrációs állandó</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Kezdetiérték-feladat (IVP) */

export function InitialValueWidget() {
  const [y0, setY0] = useState(1);
  // y' = 2x - 2 → y = x² - 2x + C. Ha y(1) = y0 → 1 - 2 + C = y0 → C = y0 + 1
  const C = y0 + 1;
  const f = (x: number, k: number) => x * x - 2 * x + k;

  return (
    <div className="widget">
      <div className="widget-title">Kezdetiérték-feladat: y′ = 2x − 2 és y(1) = {round(y0, 1)}</div>
      <label>
        kezdeti feltétel az x₀ = 1 helyen: y(1) = {round(y0, 1)} (ez rögzíti: C = {round(C, 1)})
        <input type="range" min={-2.5} max={3.0} step={0.5} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
      </label>
      <Plane xmin={-1.5} xmax={3.5} ymin={-3} ymax={4.5}>
        {(m) => (
          <>
            {[-1, 0, 1, 2, 3].map((k) => (
              <PFunc key={k} map={m} fn={(t) => f(t, k)} cls="pl-ghost" />
            ))}
            <PFunc map={m} fn={(t) => f(t, C)} cls="pl-ok" />
            <PPoint map={m} x={1} y={y0} color="#fbbf24" label={`(1; ${round(y0, 1)})`} dx={10} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`y(x) = x^2 - 2x + C, \\quad y(1) = -1 + C = ${tx(y0, 1)} \\;\\Longrightarrow\\; y(x) = x^2 - 2x ${C >= 0 ? '+' : ''} ${tx(C, 1)}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Függőleges hajítás a → v → s */

export function ProjectileAntiderivWidget() {
  const [s0, setS0] = useState(15);
  const [v0, setV0] = useState(20);
  // a(t) = -10 m/s² → v(t) = v0 - 10t → s(t) = s0 + v0*t - 5t²
  const tPeak = v0 / 10;
  const hMax = s0 + v0 * tPeak - 5 * tPeak * tPeak;
  const tHit = (v0 + Math.sqrt(v0 * v0 + 20 * s0)) / 10;

  const gx = (t: number) => 45 + (t / 7) * 465;
  const gy = (h: number) => 165 - (h / 95) * 135;

  return (
    <div className="widget">
      <div className="widget-title">Mozgásegyenlet kétszeres integrálással (g = 10 m/s²): s(t) = s₀ + v₀t − 5t²</div>
      <label>
        kezdőmagasság: s₀ = {s0} m
        <input type="range" min={0} max={40} step={5} value={s0} onChange={(e) => setS0(Number(e.target.value))} />
      </label>
      <label>
        kezdősebesség felfelé: v₀ = {v0} m/s
        <input type="range" min={5} max={30} step={5} value={v0} onChange={(e) => setV0(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 185" className="plane" role="img" aria-label="Függőleges hajítás magasság-idő görbéje">
        <rect width={540} height={185} className="pl-bg" />
        <line x1={45} y1={165} x2={520} y2={165} stroke="#94a3b8" strokeWidth={1.6} />
        <line x1={45} y1={18} x2={45} y2={165} stroke="#94a3b8" strokeWidth={1.6} />
        <path
          d={Array.from({ length: 61 }, (_, i) => {
            const t = (i / 60) * tHit;
            const h = Math.max(0, s0 + v0 * t - 5 * t * t);
            return `${i === 0 ? 'M' : 'L'}${gx(t).toFixed(1)},${gy(h).toFixed(1)}`;
          }).join(' ')}
          className="pl-main"
        />
        <circle cx={gx(0)} cy={gy(s0)} r={5} fill="#38bdf8" />
        <circle cx={gx(tPeak)} cy={gy(hMax)} r={6} fill="#fbbf24" />
        <circle cx={gx(tHit)} cy={gy(0)} r={5.5} fill="#f87171" />
        <text x={gx(tPeak) + 8} y={gy(hMax) - 6} fill="#fbbf24" fontSize={11.5} fontWeight={700}>
          Csúcs: {round(hMax, 1)} m (t = {round(tPeak, 1)} s)
        </text>
        <text x={gx(tHit) - 10} y={156} textAnchor="end" fill="#fca5a5" fontSize={11}>
          Földet érés: {round(tHit, 2)} s
        </text>
      </svg>
      <div className="result">
        <M block t={`a(t)=-10 \\;\\xrightarrow{\\int}\\; v(t)=${v0}-10t \\;\\xrightarrow{\\int}\\; s(t)=${s0}+${v0}t-5t^2`} />
      </div>
    </div>
  );
}
