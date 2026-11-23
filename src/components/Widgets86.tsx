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
    if (!Number.isFinite(y) || Math.abs(y) > 40) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
    pen = true;
  }
  return d;
}

function simpson(fn: (t: number) => number, a: number, b: number, n = 80): number {
  if (Math.abs(b - a) < 1e-12) return 0;
  const h = (b - a) / n;
  let sum = fn(a) + fn(b);
  for (let i = 1; i < n; i++) {
    sum += (i % 2 === 0 ? 2 : 4) * fn(a + i * h);
  }
  return (sum * h) / 3;
}

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Táblázati előjel-elágazás */

export function TableBranchSelectorWidget() {
  const [bSign, setBSign] = useState<'pos' | 'neg'>('pos');
  const [a, setA] = useState(2);
  const [bAbs, setBAbs] = useState(4);

  const b = bSign === 'pos' ? bAbs : -bAbs;
  const xMinDom = bSign === 'pos' ? 0.35 : bAbs / a + 0.08;
  const xMaxDom = 6;
  const sqrtB = Math.sqrt(bAbs);
  const sqrtBTex = Number.isInteger(sqrtB) ? `${sqrtB}` : `\\sqrt{${bAbs}}`;

  const fn = (x: number) => {
    const inside = a * x + b;
    if (inside <= 1e-4 || Math.abs(x) < 1e-4) return NaN;
    return 1 / (x * Math.sqrt(inside));
  };

  return (
    <div className="widget">
      <div className="widget-title">
        Egyetlen előjel dönt a táblázatban:{' '}
        <M t={`\\int \\frac{dx}{x\\sqrt{${a}x ${b >= 0 ? '+' : '-'} ${bAbs}}}`} />
      </div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <button type="button" className={bSign === 'pos' ? 'btn-active' : ''} onClick={() => setBSign('pos')}>
          b &gt; 0 → 13(b) logaritmusos ág
        </button>
        <button type="button" className={bSign === 'neg' ? 'btn-active' : ''} onClick={() => setBSign('neg')}>
          b &lt; 0 → 13(a) arctg ág
        </button>
        <label style={{ fontSize: 13 }}>
          a = {a}{' '}
          <input type="range" min={1} max={4} step={1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label style={{ fontSize: 13 }}>
          |b| = {bAbs}{' '}
          <input type="range" min={1} max={9} step={1} value={bAbs} onChange={(e) => setBAbs(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={0} xmax={6.2} ymin={-0.2} ymax={3.2} w={560} h={185}>
        {({ X, Y }) => (
          <>
            {bSign === 'neg' && (
              <>
                <rect
                  x={X(0)}
                  y={Y(3.2)}
                  width={Math.max(0, X(bAbs / a) - X(0))}
                  height={Y(-0.2) - Y(3.2)}
                  fill="rgba(244,63,94,0.12)"
                />
                <line
                  x1={X(bAbs / a)}
                  x2={X(bAbs / a)}
                  y1={Y(-0.2)}
                  y2={Y(3.2)}
                  stroke="#fb7185"
                  strokeDasharray="4 3"
                  strokeWidth={1.6}
                />
                <text x={X(bAbs / a) + 4} y={Y(2.8)} fill="#fb7185" fontSize={10}>
                  x = {tx(bAbs / a, 2)}
                </text>
              </>
            )}
            <path
              d={buildPath(fn, xMinDom, xMaxDom, X, Y, 200)}
              fill="none"
              stroke={bSign === 'pos' ? '#38bdf8' : '#f59e0b'}
              strokeWidth={2.4}
            />
          </>
        )}
      </Chart>
      <div className="widget-note">
        {bSign === 'pos'
          ? `b = +${bAbs} > 0: a gyök x > 0-ra is él, az integrál logaritmusos (13(b) képlet).`
          : `b = −${bAbs} < 0: az értelmezési tartomány x > ${tx(bAbs / a, 2)}, a primitív arctg-es (13(a) képlet).`}
      </div>

      <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(15,23,42,0.75)', border: '1px solid #334155', fontSize: 13 }}>
        {bSign === 'pos' ? (
          <M
            block
            t={`\\text{13(b): } \\int \\frac{dx}{x\\sqrt{${a}x+${bAbs}}} = \\frac{1}{${sqrtBTex}}\\ln\\left|\\frac{\\sqrt{${a}x+${bAbs}}-${sqrtBTex}}{\\sqrt{${a}x+${bAbs}}+${sqrtBTex}}\\right| + C`}
          />
        ) : (
          <M
            block
            t={`\\text{13(a): } \\int \\frac{dx}{x\\sqrt{${a}x-${bAbs}}} = \\frac{2}{${sqrtBTex}}\\operatorname{arctg}\\sqrt{\\frac{${a}x-${bAbs}}{${bAbs}}} + C`}
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Táblázati alakillesztés folyamata */

export function TablePatternMatchDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A táblázat-használat 4 lépéses munkafolyamata</div>
      <svg viewBox="0 0 560 170" className="plane" role="img" aria-label="Táblázati alakillesztés 4 lépése">
        <rect width={560} height={170} className="pl-bg" />

        <g transform="translate(12, 26)">
          <rect width={118} height={116} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={59} y={20} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>1. Fő szerkezet</text>
          <text x={59} y={42} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Milyen blokk dominál?</text>
          <text x={59} y={62} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>• √(ax + b)</text>
          <text x={59} y={78} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>• √(a² ± u²)</text>
          <text x={59} y={94} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>• eᵃᵘ cos bu</text>
          <text x={59} y={108} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>• uⁿ arcsin au</text>
        </g>

        <path d="M133,84 L149,84" stroke="#64748b" strokeWidth={2} />
        <polygon points="149,80 156,84 149,88" fill="#64748b" />

        <g transform="translate(158, 26)">
          <rect width={124} height={116} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.6} />
          <text x={62} y={20} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={700}>2. Előkészítés</text>
          <text x={62} y={42} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Igazítás a sémához:</text>
          <text x={62} y={62} textAnchor="middle" fill="#fde68a" fontSize={9.5}>• u-helyettesítés</text>
          <text x={62} y={78} textAnchor="middle" fill="#fde68a" fontSize={9.5}>• teljes négyzet</text>
          <text x={62} y={94} textAnchor="middle" fill="#fde68a" fontSize={9.5}>• tört szétbontása</text>
          <text x={62} y={108} textAnchor="middle" fill="#fb7185" fontSize={9.5}>+ du szorzója!</text>
        </g>

        <path d="M285,84 L301,84" stroke="#64748b" strokeWidth={2} />
        <polygon points="301,80 308,84 301,88" fill="#64748b" />

        <g transform="translate(310, 26)">
          <rect width={116} height={116} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={58} y={20} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>3. Képlet + feltétel</text>
          <text x={58} y={44} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Paraméterek</text>
          <text x={58} y={60} textAnchor="middle" fill="#a7f3d0" fontSize={9.5}>a, b, n leolvasása</text>
          <text x={58} y={80} textAnchor="middle" fill="#fb7185" fontSize={9.5}>Feltétel-check!</text>
          <text x={58} y={96} textAnchor="middle" fill="#94a3b8" fontSize={9}>n ≠ −1? b &gt; 0?</text>
          <text x={58} y={109} textAnchor="middle" fill="#94a3b8" fontSize={9}>Kell 2. képlet?</text>
        </g>

        <path d="M429,84 L445,84" stroke="#64748b" strokeWidth={2} />
        <polygon points="445,80 452,84 445,88" fill="#64748b" />

        <g transform="translate(454, 26)">
          <rect width={96} height={116} rx={8} fill="#0f172a" stroke="#a78bfa" strokeWidth={1.6} />
          <text x={48} y={20} textAnchor="middle" fill="#a78bfa" fontSize={11} fontWeight={700}>4. Vissza + próba</text>
          <text x={48} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>u → x visszaírás</text>
          <text x={48} y={66} textAnchor="middle" fill="#c4b5fd" fontSize={9.5}>+ C hozzáadása</text>
          <text x={48} y={90} textAnchor="middle" fill="#34d399" fontSize={9.5} fontWeight={700}>F&apos;(x) = f(x)?</text>
          <text x={48} y={106} textAnchor="middle" fill="#94a3b8" fontSize={8.8}>gyors deriválás</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Redukciós léptető */

export function ReductionStepSimulatorWidget() {
  const [family, setFamily] = useState<'tg' | 'ln'>('tg');
  const [n, setN] = useState(5);

  const tgSteps: { from: string; to: string }[] = [];
  let tgFinal = '';
  if (family === 'tg') {
    const terms: string[] = [];
    let k = n;
    let sign = 1;
    while (k >= 2) {
      const s = sign === 1 ? (terms.length ? ' + ' : '') : ' - ';
      terms.push(`${s}\\frac{1}{${k - 1}}\\operatorname{tg}^{${k - 1}} x`);
      tgSteps.push({
        from: `\\int \\operatorname{tg}^{${k}} x\\,dx`,
        to: `\\frac{1}{${k - 1}}\\operatorname{tg}^{${k - 1}} x - \\int \\operatorname{tg}^{${k - 2}} x\\,dx`,
      });
      k -= 2;
      sign *= -1;
    }
    if (k === 1) {
      const s = sign === 1 ? ' - ' : ' + ';
      terms.push(`${s}\\ln|\\cos x|`);
      tgSteps.push({ from: `\\int \\operatorname{tg} x\\,dx`, to: `-\\ln|\\cos x| + C` });
    } else {
      const s = sign === 1 ? ' + ' : ' - ';
      terms.push(`${s}x`);
      tgSteps.push({ from: `\\int 1\\,dx`, to: `x + C` });
    }
    tgFinal = `${terms.join('')} + C`;
  }

  const lnSteps: { from: string; to: string }[] = [];
  let lnFinal = '';
  if (family === 'ln') {
    const terms: string[] = [];
    let coeff = 1;
    let sign = 1;
    for (let k = n; k >= 1; k--) {
      lnSteps.push({
        from: `\\int (\\ln x)^{${k}}\\,dx`,
        to: `x(\\ln x)^{${k}} - ${k}\\int (\\ln x)^{${k - 1}}\\,dx`,
      });
      const s = sign === 1 ? (terms.length ? ' + ' : '') : ' - ';
      const cStr = coeff === 1 ? '' : `${coeff}`;
      terms.push(`${s}${cStr}x(\\ln x)^{${k}}`);
      coeff *= k;
      sign *= -1;
    }
    const s = sign === 1 ? ' + ' : ' - ';
    terms.push(`${s}${coeff}x`);
    lnSteps.push({ from: `\\int 1\\,dx`, to: `x + C` });
    lnFinal = `${terms.join('')} + C`;
  }

  const steps = family === 'tg' ? tgSteps : lnSteps;
  const finalTex = family === 'tg' ? tgFinal : lnFinal;

  return (
    <div className="widget">
      <div className="widget-title">Interaktív redukciós lánc-léptető</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <button
          type="button"
          className={family === 'tg' ? 'btn-active' : ''}
          onClick={() => {
            setFamily('tg');
            setN(5);
          }}
        >
          ∫ tgⁿ x dx (kettesével csökken)
        </button>
        <button
          type="button"
          className={family === 'ln' ? 'btn-active' : ''}
          onClick={() => {
            setFamily('ln');
            setN(3);
          }}
        >
          ∫ (ln x)ⁿ dx (egyesével csökken)
        </button>
        <label style={{ fontSize: 13 }}>
          n = {n}{' '}
          <input
            type="range"
            min={family === 'tg' ? 2 : 1}
            max={family === 'tg' ? 6 : 4}
            step={1}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
        {steps.map((st, idx) => (
          <div
            key={idx}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              background: idx === steps.length - 1 ? 'rgba(52,211,153,0.12)' : 'rgba(15,23,42,0.7)',
              border: `1px solid ${idx === steps.length - 1 ? '#34d399' : '#334155'}`,
              fontSize: 13,
            }}
          >
            <strong style={{ color: idx === steps.length - 1 ? '#34d399' : '#38bdf8', marginRight: 8 }}>
              {idx === steps.length - 1 ? 'Alapintegrál:' : `${idx + 1}. lépés:`}
            </strong>
            <M t={`${st.from} = ${st.to}`} />
          </div>
        ))}
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(245,158,11,0.12)',
            border: '1px solid #f59e0b',
            marginTop: 2,
          }}
        >
          <strong style={{ color: '#fbbf24', fontSize: 12 }}>Összerakva a teljes eredmény:</strong>
          <M
            block
            t={`\\int ${family === 'tg' ? `\\operatorname{tg}^{${n}} x` : `(\\ln x)^{${n}}`}\\,dx = ${finalTex}`}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Három különböző kinézetű, mégis azonos primitív */

export function EquivalentPrimitivesWidget() {
  const [shift, setShift] = useState(0);
  const [xProbe, setXProbe] = useState(1.1);

  const fManual = (x: number) => Math.sin(x) ** 3 / 3 - Math.sin(x) ** 5 / 5;
  const fMaple = (x: number) =>
    (-Math.sin(x) * Math.cos(x) ** 4) / 5 + (2 * Math.cos(x) ** 2 * Math.sin(x)) / 15 + Math.sin(x) / 15;
  const fMathematica = (x: number) => Math.sin(x) / 8 - Math.sin(3 * x) / 48 - Math.sin(5 * x) / 80;

  const v1 = fManual(xProbe);
  const v2 = fMaple(xProbe);
  const v3 = fMathematica(xProbe);

  return (
    <div className="widget">
      <div className="widget-title">
        Három teljesen eltérő képlet ugyanarra az integrálra: <M t="\int \sin^2 x\cos^3 x\,dx" />
      </div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <label style={{ fontSize: 13 }}>
          Függőleges széthúzás (+C): {tx(shift, 2)}{' '}
          <input type="range" min={0} max={0.35} step={0.05} value={shift} onChange={(e) => setShift(Number(e.target.value))} />
        </label>
        <label style={{ fontSize: 13 }}>
          Próbapont x = {tx(xProbe, 2)}{' '}
          <input type="range" min={-3} max={3} step={0.1} value={xProbe} onChange={(e) => setXProbe(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={-3.2} xmax={3.2} ymin={-0.65} ymax={0.65} w={560} h={190}>
        {({ X, Y }) => (
          <>
            <path d={buildPath((x) => fManual(x) + shift, -3.14, 3.14, X, Y)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            <path d={buildPath(fMaple, -3.14, 3.14, X, Y)} fill="none" stroke="#f59e0b" strokeWidth={2.2} strokeDasharray="6 3" />
            <path d={buildPath((x) => fMathematica(x) - shift, -3.14, 3.14, X, Y)} fill="none" stroke="#34d399" strokeWidth={2} strokeDasharray="2 3" />
            <line x1={X(xProbe)} x2={X(xProbe)} y1={Y(-0.65)} y2={Y(0.65)} stroke="#94a3b8" strokeDasharray="3 3" />
            <circle cx={X(xProbe)} cy={Y(v2)} r={4} fill="#fbbf24" />
          </>
        )}
      </Chart>
      <div className="widget-note">
        Amikor a széthúzás 0, a három görbe hajszálpontosan fedi egymást! Minden eltérés legfeljebb konstans (+C).
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: 6, marginTop: 8, fontSize: 12 }}>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: 'rgba(56,189,248,0.1)', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>Kézi (8.4):</strong> <M t={`\\frac{1}{3}\\sin^3 x - \\frac{1}{5}\\sin^5 x`} />
          <div>F₁({tx(xProbe, 1)}) = <strong>{tx(v1, 5)}</strong></div>
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Maple (8.6):</strong> <M t={`-\\frac{1}{5}\\sin x\\cos^4 x + \\dots`} />
          <div>F₂({tx(xProbe, 1)}) = <strong>{tx(v2, 5)}</strong></div>
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: 'rgba(52,211,153,0.1)', border: '1px solid #34d399' }}>
          <strong style={{ color: '#34d399' }}>Mathematica:</strong> <M t={`\\frac{1}{8}\\sin x - \\frac{1}{48}\\sin 3x - \\dots`} />
          <div>F₃({tx(xProbe, 1)}) = <strong>{tx(v3, 5)}</strong></div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (5. ábra): Nem elemi integrálok galériája */

export function NonElementaryGalleryWidget() {
  const [kind, setKind] = useState<'erf' | 'fresnel' | 'si'>('erf');
  const [xEnd, setXEnd] = useState(1.5);

  const meta = {
    erf: {
      integrandTex: '\\frac{2}{\\sqrt{\\pi}} e^{-t^2}',
      fn: (t: number) => (2 / Math.sqrt(Math.PI)) * Math.exp(-t * t),
      xmin: -0.2,
      xmax: 3.2,
      ymin: -0.2,
      ymax: 1.35,
      note: 'Normális eloszlás valószínűségei és hővezetés. Határértéke x → ∞ esetén pontosan 1.',
    },
    fresnel: {
      integrandTex: '\\sin(t^2)',
      fn: (t: number) => Math.sin(t * t),
      xmin: -0.2,
      xmax: 3.2,
      ymin: -1.15,
      ymax: 1.25,
      note: 'Optikai diffrakció és autópálya-átmeneti ívek (klotoid). Határértéke x → ∞ esetén √(π/8) ≈ 0,627.',
    },
    si: {
      integrandTex: '\\frac{\\sin t}{t}',
      fn: (t: number) => (Math.abs(t) < 1e-6 ? 1 : Math.sin(t) / t),
      xmin: -0.2,
      xmax: 6.4,
      ymin: -0.35,
      ymax: 1.85,
      note: 'Jelfeldolgozás és szűrőtervezés (Gibbs-jelenség). Határértéke x → ∞ esetén π/2 ≈ 1,571.',
    },
  }[kind];

  const xmax = meta.xmax;
  const clampedX = Math.min(xEnd, xmax - 0.1);
  const areaVal = simpson(meta.fn, 0, clampedX, 120);

  const integralCurve = (x: number) => (x < 0 ? NaN : simpson(meta.fn, 0, x, 40));

  return (
    <div className="widget">
      <div className="widget-title">Nem elemi integrálok: a terület él, csak zárt képlete nincs</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <button type="button" className={kind === 'erf' ? 'btn-active' : ''} onClick={() => { setKind('erf'); setXEnd(1.5); }}>
          erf(x) (e⁻ᵗ²)
        </button>
        <button type="button" className={kind === 'fresnel' ? 'btn-active' : ''} onClick={() => { setKind('fresnel'); setXEnd(2.0); }}>
          S(x) (sin t²)
        </button>
        <button type="button" className={kind === 'si' ? 'btn-active' : ''} onClick={() => { setKind('si'); setXEnd(3.14); }}>
          Si(x) (sin t / t)
        </button>
        <label style={{ fontSize: 13 }}>
          Felső határ x = {tx(clampedX, 2)}{' '}
          <input
            type="range"
            min={0.1}
            max={Number((xmax - 0.1).toFixed(1))}
            step={0.1}
            value={clampedX}
            onChange={(e) => setXEnd(Number(e.target.value))}
          />
        </label>
      </div>

      <Chart xmin={meta.xmin} xmax={meta.xmax} ymin={meta.ymin} ymax={meta.ymax} w={560} h={195}>
        {({ X, Y }) => {
          let fillD = `M${X(0).toFixed(1)},${Y(0).toFixed(1)} `;
          const steps = 80;
          for (let i = 0; i <= steps; i++) {
            const t = (clampedX * i) / steps;
            fillD += `L${X(t).toFixed(1)},${Y(meta.fn(t)).toFixed(1)} `;
          }
          fillD += `L${X(clampedX).toFixed(1)},${Y(0).toFixed(1)} Z`;
          return (
            <>
              <path d={fillD} fill="rgba(56,189,248,0.22)" />
              <path d={buildPath(meta.fn, 0, xmax, X, Y, 180)} fill="none" stroke="#38bdf8" strokeWidth={2.2} />
              <path d={buildPath(integralCurve, 0, xmax, X, Y, 90)} fill="none" stroke="#f59e0b" strokeWidth={2.4} />
              <circle cx={X(clampedX)} cy={Y(areaVal)} r={4.5} fill="#fbbf24" />
            </>
          );
        }}
      </Chart>
      <div className="widget-note">
        Kék: az integrandus f(t), arany: a nem elemi primitív F(x) = ∫₀ˣ f(t) dt. {meta.note}
      </div>

      <div style={{ marginTop: 6, fontSize: 13 }}>
        <M t={`F(${tx(clampedX, 2)}) = \\int_0^{${tx(clampedX, 2)}} ${meta.integrandTex}\\,dt \\approx ${tx(areaVal, 4)}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (6. ábra): CAS-összehasonlító */

export function CasComparisonDiagram() {
  const [idx, setIdx] = useState(0);
  const cases = [
    {
      label: 'Paraméteres (9. példa)',
      integral: '\\int x^2\\sqrt{a^2+x^2}\\,dx',
      maple: 'int(x^2*sqrt(a^2+x^2), x);',
      mathematica: 'Integrate[x^2 Sqrt[a^2 + x^2], x]',
      sympy: 'integrate(x**2 * sqrt(a**2 + x**2), x)',
      result: '\\frac{x(a^2+2x^2)\\sqrt{a^2+x^2}}{8} - \\frac{a^4}{8}\\ln\\left(x+\\sqrt{a^2+x^2}\\right)',
      tip: 'A CAS nem ír +C-t, és néha arsh(x/a) alakban adja meg a logaritmust (ami a > 0-ra ekvivalens).',
    },
    {
      label: 'Trigonometrikus (10. példa)',
      integral: '\\int \\sin^2 x\\cos^3 x\\,dx',
      maple: 'int(sin(x)^2*cos(x)^3, x);',
      mathematica: 'Integrate[Sin[x]^2 Cos[x]^3, x]',
      sympy: 'integrate(sin(x)**2 * cos(x)**3, x)',
      result: '\\text{Mathematica: } \\frac{\\sin x}{8} - \\frac{\\sin 3x}{48} - \\frac{\\sin 5x}{80}',
      tip: 'A Maple koszinusz-hatványokban, a Mathematica többszörös szögekben, a kézi megoldás sin³x − sin⁵x alakban válaszol.',
    },
    {
      label: 'CAS-különbség (11. példa)',
      integral: '\\int (\\arccos ax)^2\\,dx',
      maple: 'int(arccos(a*x)^2, x);  # régi Maple: visszaadja változtatlanul!',
      mathematica: 'Integrate[ArcCos[a x]^2, x]',
      sympy: 'integrate(acos(a*x)**2, x)',
      result: 'x(\\arccos ax)^2 - \\frac{2\\sqrt{1-a^2x^2}\\arccos ax}{a} - 2x',
      tip: 'Ha az egyik program feladja, attól még létezhet zárt alak (itt kétszeres parciális integrálással kézzel is kijön!).',
    },
    {
      label: 'Nem elemi (erf)',
      integral: '\\int e^{-x^2}\\,dx',
      maple: 'int(exp(-x^2), x);',
      mathematica: 'Integrate[Exp[-x^2], x]',
      sympy: 'integrate(exp(-x**2), x)',
      result: '\\frac{\\sqrt{\\pi}}{2}\\operatorname{erf}(x)',
      tip: 'A modern CAS nem hagyja üresen: speciális függvényekkel (erf, FresnelS, Si, Ei) fejezi ki a választ.',
    },
  ];
  const c = cases[idx];

  return (
    <div className="widget">
      <div className="widget-title">CAS-parancsok és kimenetek összehasonlítása (Maple · Mathematica · SymPy)</div>
      <div className="widget-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {cases.map((item, i) => (
          <button key={item.label} type="button" className={idx === i ? 'btn-active' : ''} onClick={() => setIdx(i)}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 8, padding: '10px 12px', borderRadius: 8, background: '#0f172a', border: '1px solid #334155', fontSize: 12.5 }}>
        <M block t={c.integral} />
        <div style={{ display: 'grid', gap: 4, fontFamily: 'monospace', fontSize: 11.5, marginTop: 6 }}>
          <div><span style={{ color: '#38bdf8' }}>Maple:</span>       {c.maple}</div>
          <div><span style={{ color: '#f59e0b' }}>Mathematica:</span> {c.mathematica}</div>
          <div><span style={{ color: '#34d399' }}>Python/SymPy:</span> {c.sympy}</div>
        </div>
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: '1px solid #1e293b' }}>
          <M block t={c.result} />
        </div>
        <div style={{ color: '#cbd5e1', fontSize: 12, marginTop: 4 }}>
          <strong>Emberi kontroll:</strong> {c.tip}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (7. ábra): CAS-ugrás csapda és 3 aranypróba */

export function CasVerificationChecklistDiagram() {
  const f = (x: number) => 1 / (2 + Math.cos(x));
  const naiveF = (x: number) => (2 / Math.sqrt(3)) * Math.atan(Math.tan(x / 2) / Math.sqrt(3));
  const trueF = (x: number) => {
    const base = naiveF(x);
    return x > Math.PI ? base + (2 * Math.PI) / Math.sqrt(3) : base;
  };

  return (
    <div className="widget">
      <div className="widget-title">
        Klasszikus CAS-csapda: ugró primitív függvény az <M t="\int_0^{2\pi} \frac{dx}{2+\cos x}" /> integrálnál
      </div>
      <Chart xmin={-0.15} xmax={6.45} ymin={-2.2} ymax={4.0} w={560} h={195}>
        {({ X, Y }) => (
          <>
            <path d={buildPath(f, 0, 2 * Math.PI, X, Y)} fill="none" stroke="#38bdf8" strokeWidth={1.8} strokeDasharray="4 3" />
            <path d={buildPath(naiveF, 0, Math.PI - 0.04, X, Y)} fill="none" stroke="#fb7185" strokeWidth={2.4} />
            <path d={buildPath(naiveF, Math.PI + 0.04, 2 * Math.PI, X, Y)} fill="none" stroke="#fb7185" strokeWidth={2.4} />
            <path d={buildPath(trueF, 0, 2 * Math.PI, X, Y, 220)} fill="none" stroke="#34d399" strokeWidth={2.4} />
            <line x1={X(Math.PI)} x2={X(Math.PI)} y1={Y(-2.2)} y2={Y(4.0)} stroke="#fbbf24" strokeDasharray="4 3" />
            <text x={X(Math.PI) + 5} y={Y(3.3)} fill="#fbbf24" fontSize={10} fontWeight={700}>
              x = π: ugrás!
            </text>
          </>
        )}
      </Chart>
      <div className="widget-note">
        Piros: a naiv CAS-képlet ugrással x = π-nél (F(2π) − F(0) = 0 — HAMIS!). Zöld: a folytonos valódi primitív (2π/√3 ≈ 3,628).
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8, fontSize: 11.5 }}>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>1. Deriválás-próba</strong>
          <div>Teljesül-e, hogy <M t="F'(x)=f(x)" />?</div>
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>2. Előjel &amp; folytonosság</strong>
          <div>Pozitív <M t="f" /> integrálja nem lehet 0!</div>
        </div>
        <div style={{ padding: '6px 8px', borderRadius: 6, background: '#0f172a', border: '1px solid #34d399' }}>
          <strong style={{ color: '#34d399' }}>3. Numerikus becslés</strong>
          <div>Gyors középérték-becslés: <M t="\approx 2\pi \cdot 0{,}58" />.</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. oldal (8. ábra): A 8.1–8.6 mester-döntési térkép */

export function IntegrationWorkflowMasterDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A nagy integrálási mestertérkép (8.1–8.7 összekötése)</div>
      <svg viewBox="0 0 560 198" className="plane" role="img" aria-label="Integrálási technikák mestertérképe">
        <rect width={560} height={198} className="pl-bg" />

        <g transform="translate(14, 12)">
          <rect width={166} height={52} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={83} y={21} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>1. Alapintegrál / Algebra</text>
          <text x={83} y={39} textAnchor="middle" fill="#cbd5e1" fontSize={9.5}>8.1: u-hely., osztás, teljes négyzet</text>
        </g>

        <path d="M183,38 L199,38" stroke="#64748b" strokeWidth={2} />
        <polygon points="199,34 206,38 199,42" fill="#64748b" />

        <g transform="translate(208, 12)">
          <rect width={166} height={52} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={83} y={21} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>2. Analitikus technikák</text>
          <text x={83} y={39} textAnchor="middle" fill="#cbd5e1" fontSize={9.5}>8.2–8.5: parc., tört, trig., gyök</text>
        </g>

        <path d="M377,38 L393,38" stroke="#64748b" strokeWidth={2} />
        <polygon points="393,34 400,38 393,42" fill="#64748b" />

        <g transform="translate(402, 12)">
          <rect width={144} height={52} rx={8} fill="#0f172a" stroke="#f59e0b" strokeWidth={1.6} />
          <text x={72} y={21} textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={700}>3. Táblázat &amp; Redukció</text>
          <text x={72} y={39} textAnchor="middle" fill="#cbd5e1" fontSize={9.5}>8.6: mintaillesztés + lánc</text>
        </g>

        <path d="M474,66 L474,88 L140,88 L140,104" fill="none" stroke="#64748b" strokeWidth={1.8} />
        <polygon points="136,104 140,111 144,104" fill="#64748b" />
        <path d="M415,88 L415,104" fill="none" stroke="#64748b" strokeWidth={1.8} />
        <polygon points="411,104 415,111 419,104" fill="#64748b" />

        <g transform="translate(22, 113)">
          <rect width={238} height={70} rx={8} fill="#0f172a" stroke="#a78bfa" strokeWidth={1.6} />
          <text x={119} y={22} textAnchor="middle" fill="#a78bfa" fontSize={11} fontWeight={700}>4. CAS (Maple / Mathematica / SymPy)</text>
          <text x={119} y={40} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>Zárt alak vagy speciális függvény (erf, Si)</text>
          <text x={119} y={57} textAnchor="middle" fill="#fbbf24" fontSize={9.5}>Mindig ellenőrizd: +C, |x|, ugrás, F&apos;=f!</text>
        </g>

        <g transform="translate(292, 113)">
          <rect width={246} height={70} rx={8} fill="#0f172a" stroke="#fb7185" strokeWidth={1.6} />
          <text x={123} y={22} textAnchor="middle" fill="#fb7185" fontSize={11} fontWeight={700}>5. Nem elemi / Határozott számérték</text>
          <text x={123} y={40} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>Numerikus integrálás (8.7: trapéz, Simpson)</text>
          <text x={123} y={57} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>vagy hatványsorba fejtés (11. fejezet)</text>
        </g>
      </svg>
    </div>
  );
}
