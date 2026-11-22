import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PLine, PPoint, PVLine } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: Konvexitás és az érintők tánca */

export function ConcavityTangentWidget() {
  const [x, setX] = useState(-1.0);
  // f(x) = 0.25*x³ - 1.5*x → f'(x) = 0.75*x² - 1.5 → f''(x) = 1.5*x
  // x < 0: konkáv (f'' < 0), x > 0: konvex (f'' > 0), x = 0: inflexiós pont
  const f = (t: number) => 0.25 * t * t * t - 1.5 * t;
  const df = (t: number) => 0.75 * t * t - 1.5;
  const d2f = (t: number) => 1.5 * t;

  const y = f(x);
  const mVal = df(x);
  const cVal = d2f(x);
  const kind = Math.abs(cVal) < 0.08 ? 'inf' : cVal > 0 ? 'convex' : 'concave';

  return (
    <div className="widget">
      <div className="widget-title">Az érintő helyzete és a konvexitás: f(x) = ¼x³ − 1,5x</div>
      <label>
        mozgó pont: x = {round(x, 2)} (érintő meredeksége: f′ = {round(mVal, 2)} | második derivált: f″ = {round(cVal, 2)})
        <input type="range" min={-2.5} max={2.5} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <Plane xmin={-3} xmax={3} ymin={-2.8} ymax={2.8}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} from={-3} to={0} cls="pl-alt" />
            <PFunc map={m} fn={f} from={0} to={3} cls="pl-ok" />
            <PLine map={m} k={mVal} b={y - mVal * x} cls="pl-main" />
            <PPoint map={m} x={0} y={0} color="#fbbf24" label="inflexió (0; 0)" dx={10} dy={-10} />
            <PPoint map={m} x={x} y={y} color={kind === 'convex' ? '#34d399' : kind === 'concave' ? '#fb923c' : '#fbbf24'} />
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={`f''(${tx(x, 2)}) = ${tx(cVal, 2)} ${
            kind === 'convex'
              ? '> 0 \\;(\\text{konvex: az érintő ALULRÓL támaszt!})'
              : kind === 'concave'
                ? '< 0 \\;(\\text{konkáv: az érintő FELÜLRŐL támaszt!})'
                : '= 0 \\;(\\text{inflexiós pont: az érintő ÁTMETSZI a görbét!})'
          }`}
        />
        <p>
          Húzd végig <M t="x" />-et balról jobbra! Narancs részen (<M t="x<0" />) az érintő óramutató járása szerint <em>lefelé billen</em> (<M t="f'" /> csökken), zöld részen (<M t="x>0" />) <em>felfelé billen</em> (<M t="f'" /> nő)!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: A 4 görbe-alapforma (2×2 rács) */

export function FourShapesDiagram() {
  const boxes = [
    {
      title: 'f′ > 0,  f″ > 0',
      sub: 'növekvő + konvex',
      ex: 'gyorsuló növekedés (pl. kamatos kamat)',
      path: 'M 24 88 Q 86 84 118 22',
      color: '#34d399',
      x: 16,
      y: 14,
    },
    {
      title: 'f′ > 0,  f″ < 0',
      sub: 'növekvő + konkáv',
      ex: 'lassuló növekedés (pl. telítődés)',
      path: 'M 24 88 Q 48 26 118 22',
      color: '#38bdf8',
      x: 280,
      y: 14,
    },
    {
      title: 'f′ < 0,  f″ > 0',
      sub: 'csökkenő + konvex',
      ex: 'fékeződő csökkenés (pl. lehűlés)',
      path: 'M 24 22 Q 48 84 118 88',
      color: '#fbbf24',
      x: 16,
      y: 132,
    },
    {
      title: 'f′ < 0,  f″ < 0',
      sub: 'csökkenő + konkáv',
      ex: 'gyorsuló zuhanás (pl. szabadesés)',
      path: 'M 24 22 Q 86 26 118 88',
      color: '#fb923c',
      x: 280,
      y: 132,
    },
  ];

  return (
    <div className="widget">
      <div className="widget-title">A függvénygörbék 4 alapformája f′ és f″ előjele szerint</div>
      <svg viewBox="0 0 540 248" className="plane" role="img" aria-label="4 görbe alapforma">
        <rect width={540} height={248} className="pl-bg" />
        {boxes.map((b) => (
          <g key={b.title} transform={`translate(${b.x}, ${b.y})`}>
            <rect width={244} height={104} rx={10} fill="rgba(255,255,255,0.04)" stroke={b.color} strokeWidth={1.4} />
            <path d={b.path} fill="none" stroke={b.color} strokeWidth={3} strokeLinecap="round" />
            <text x={132} y={32} fill={b.color} fontSize={13} fontWeight={700}>{b.title}</text>
            <text x={132} y={52} fill="#e2e8f0" fontSize={11.5} fontWeight={600}>{b.sub}</text>
            <text x={132} y={72} fill="#94a3b8" fontSize={10}>{b.ex.split(' (')[0]}</text>
            <text x={132} y={86} fill="#94a3b8" fontSize={10}>({b.ex.split(' (')[1]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: Inflexiós pontok galériája */

type InfId = 'cubic' | 'cbrt' | 'quartic';

const INF_CASES: Record<
  InfId,
  { label: string; f: (x: number) => number; tex: string; desc: string; isInf: boolean; vert?: boolean }
> = {
  cubic: {
    label: 'f(x) = x³ − x (sima inflexió)',
    f: (x) => x * x * x - x,
    tex: "f''(x)=6x \\;\\Longrightarrow\\; f''(0)=0,\\; \\text{előjel: } -\\to + \\;\\Rightarrow\\; \\text{INFLEXIÓ!}",
    desc: 'Az érintő (y = −x) pontosan az origóban metszi át a görbét: balra konkáv, jobbra konvex.',
    isInf: true,
  },
  cbrt: {
    label: 'f(x) = ∛x (függőleges érintő)',
    f: (x) => Math.cbrt(x),
    tex: "f''(x)=-\\tfrac{2}{9}x^{-5/3} \\;\\Longrightarrow\\; f''(0) \\text{ nem létezik, } +\\to - \\;\\Rightarrow\\; \\text{INFLEXIÓ!}",
    desc: 'Bár f′(0) és f″(0) sem létezik, a görbe folytonos, van függőleges érintője, és konvexitást vált!',
    isInf: true,
    vert: true,
  },
  quartic: {
    label: 'f(x) = x⁴ (CSAPDA!)',
    f: (x) => x ** 4,
    tex: "f''(x)=12x^2 \\;\\Longrightarrow\\; f''(0)=0, \\text{ DE } +\\to + \\;\\Rightarrow\\; \\text{NEM inflexió!}",
    desc: 'Hiába nulla a második derivált x = 0-nál, a görbe mindkét oldalon konvex marad (lapos minimum).',
    isInf: false,
  },
};

export function InflectionGalleryWidget() {
  const [id, setId] = useState<InfId>('cubic');
  const cur = INF_CASES[id];

  return (
    <div className="widget">
      <div className="widget-title">Inflexiós pont vagy hamis riasztás? Három kulcspélda az x = 0 helyen</div>
      <div className="relbuttons chips">
        {(Object.keys(INF_CASES) as InfId[]).map((k) => (
          <button key={k} className={id === k ? 'on' : ''} onClick={() => setId(k)}>
            {INF_CASES[k].label}
          </button>
        ))}
      </div>
      <Plane xmin={-2.4} xmax={2.4} ymin={-2.2} ymax={2.6}>
        {(m) => (
          <>
            <PFunc map={m} fn={cur.f} from={-2.4} to={0} cls={id === 'cubic' ? 'pl-alt' : 'pl-ok'} />
            <PFunc map={m} fn={cur.f} from={0} to={2.4} cls={id === 'cbrt' ? 'pl-alt' : 'pl-ok'} />
            {id === 'cubic' && <PLine map={m} k={-1} b={0} cls="pl-dash" />}
            {cur.vert && <PVLine map={m} x={0} cls="pl-dash" />}
            {id === 'quartic' && <PLine map={m} k={0} b={0} cls="pl-dash" />}
            <PPoint map={m} x={0} y={0} color={cur.isInf ? '#fbbf24' : '#f87171'} label={cur.isInf ? 'inflexiós pont' : 'NEM inflexió'} dx={10} dy={-10} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={cur.tex} />
        <p>{cur.desc}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Második derivált teszt */

export function SecondDerivTestWidget() {
  const [fnId, setFnId] = useState<'cubic' | 'quartic'>('cubic');
  // cubic: f(x) = x³/3 - x → f'=x²-1 (krit: -1, 1), f''=2x → f''(-1)=-2 (max), f''(1)=+2 (min)
  // quartic: f(x) = x⁴/4 - x²/2 → f'=x³-x (krit: -1, 0, 1), f''=3x²-1 → f''(±1)=+2 (min), f''(0)=-1 (max)
  const isCubic = fnId === 'cubic';
  const f = isCubic ? (x: number) => (x ** 3) / 3 - x : (x: number) => 0.25 * x ** 4 - 0.5 * x * x;
  const pts = isCubic
    ? [
        { x: -1, y: f(-1), d2: -2, kind: 'max' as const },
        { x: 1, y: f(1), d2: 2, kind: 'min' as const },
      ]
    : [
        { x: -1, y: f(-1), d2: 2, kind: 'min' as const },
        { x: 0, y: f(0), d2: -1, kind: 'max' as const },
        { x: 1, y: f(1), d2: 2, kind: 'min' as const },
      ];

  return (
    <div className="widget">
      <div className="widget-title">Második derivált teszt: „kupola” (f″ &lt; 0) vs. „tál” (f″ &gt; 0)</div>
      <div className="relbuttons chips">
        <button className={isCubic ? 'on' : ''} onClick={() => setFnId('cubic')}>
          f(x) = ⅓x³ − x
        </button>
        <button className={!isCubic ? 'on' : ''} onClick={() => setFnId('quartic')}>
          f(x) = ¼x⁴ − ½x²
        </button>
      </div>
      <Plane xmin={-2.5} xmax={2.5} ymin={-1.8} ymax={2.0}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} cls="pl-main" />
            {pts.map((p) => (
              <PPoint
                key={p.x}
                map={m}
                x={p.x}
                y={p.y}
                color={p.kind === 'max' ? '#fbbf24' : '#34d399'}
                label={`f″=${p.d2 > 0 ? '+' : '−'}${Math.abs(p.d2)} (${p.kind})`}
                dx={-38}
                dy={p.kind === 'max' ? -12 : 18}
              />
            ))}
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={
            isCubic
              ? "f'(x)=x^2-1=0 \\Rightarrow x=\\pm 1; \\quad f''(-1)=-2 < 0 \\;(\\text{max}), \\quad f''(1)=+2 > 0 \\;(\\text{min})"
              : "f'(x)=x(x^2-1)=0 \\Rightarrow x=0,\\pm 1; \\quad f''(0)=-1 < 0 \\;(\\text{max}), \\quad f''(\\pm 1)=+2 > 0 \\;(\\text{min})"
          }
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: 7 lépéses függvényvizsgálat séma */

export function CurveSketchStepsDiagram() {
  const steps = [
    { n: '1. Tartomány', t: 'D + szimmetria', c: '#38bdf8' },
    { n: '2. Metszéspont', t: 'f(0) és f(x)=0', c: '#38bdf8' },
    { n: '3. Aszimptoták', t: 'x→±∞ és pólusok', c: '#38bdf8' },
    { n: '4. Első derivált', t: 'f′=0, monotonitás', c: '#34d399' },
    { n: '5. Második der.', t: 'f″=0, konvexitás', c: '#fb923c' },
    { n: '6. Közös tábla', t: '⤴ ↱ ↳ ⤵ szakaszok', c: '#fbbf24' },
    { n: '7. Rajz!', t: 'kulcspontok + ív', c: '#fbbf24' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">A teljes függvényvizsgálat 7 lépéses térképe</div>
      <svg viewBox="0 0 540 155" className="plane" role="img" aria-label="7 lépéses függvényvizsgálat">
        <rect width={540} height={155} className="pl-bg" />
        {steps.map((s, i) => {
          const row = i < 4 ? 0 : 1;
          const col = i < 4 ? i : i - 4;
          const w = row === 0 ? 122 : 164;
          const gap = 10;
          const x = 12 + col * (w + gap);
          const y = 14 + row * 72;
          return (
            <g key={s.n}>
              <rect x={x} y={y} width={w} height={58} rx={9} fill="rgba(255,255,255,0.04)" stroke={s.c} strokeWidth={1.5} />
              <text x={x + w / 2} y={y + 23} textAnchor="middle" fill={s.c} fontSize={12} fontWeight={700}>{s.n}</text>
              <text x={x + w / 2} y={y + 43} textAnchor="middle" fill="#cbd5e1" fontSize={11}>{s.t}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal: Réteges függvényvizsgálat */

export function FullAnalysisWidget() {
  const [layer, setLayer] = useState(3);
  // f(x) = (x⁴ - 4x³ + 10) / 5 skálázva a rajzhoz, feliratokban az eredeti értékek!
  // Eredeti: f(x) = x⁴ - 4x³ + 10 → f(0)=10, f(2)=-6, f(3)=-17
  // Rajzhoz: g(x) = (x⁴ - 4x³ + 10) / 6 → g(0)=1.67, g(2)=-1.0, g(3)=-2.83
  const g = (x: number) => (x ** 4 - 4 * x ** 3 + 10) / 6;

  return (
    <div className="widget">
      <div className="widget-title">Rétegről rétegre: f(x) = x⁴ − 4x³ + 10 (függőlegesen 1:6 arányban)</div>
      <div className="relbuttons chips">
        <button className={layer === 1 ? 'on' : ''} onClick={() => setLayer(1)}>1. Alapgörbe</button>
        <button className={layer === 2 ? 'on' : ''} onClick={() => setLayer(2)}>2. + Kritikus pontok (f′=0)</button>
        <button className={layer === 3 ? 'on' : ''} onClick={() => setLayer(3)}>3. + Inflexió és konvexitás</button>
      </div>
      <Plane xmin={-1.6} xmax={4.6} ymin={-3.5} ymax={3.2}>
        {(m) => (
          <>
            {layer < 3 ? (
              <PFunc map={m} fn={g} cls="pl-main" />
            ) : (
              <>
                <PFunc map={m} fn={g} from={-1.6} to={0} cls="pl-ok" />
                <PFunc map={m} fn={g} from={0} to={2} cls="pl-alt" />
                <PFunc map={m} fn={g} from={2} to={4.6} cls="pl-ok" />
              </>
            )}
            {layer >= 2 && (
              <>
                <PPoint map={m} x={3} y={g(3)} color="#34d399" label="abs. min (3; −17)" dx={-42} dy={18} />
                <PPoint map={m} x={0} y={g(0)} color="#fbbf24" label="terasz + inflexió (0; 10)" dx={10} dy={-10} />
              </>
            )}
            {layer >= 3 && (
              <PPoint map={m} x={2} y={g(2)} color="#fbbf24" label="inflexió (2; −6)" dx={10} dy={-6} />
            )}
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          <strong>Zöld (<M t="x<0" /> és <M t="x>2" />):</strong> konvex (<M t="f''>0" />).{' '}
          <strong>Narancs (<M t="0<x<2" />):</strong> konkáv (<M t="f''<0" />). Az <M t="x=0" /> pont különleges: egyszerre <M t="f'(0)=0" /> és <M t="f''(0)=0" />!
        </p>
      </div>
    </div>
  );
}
