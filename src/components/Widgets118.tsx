import { useState } from 'react';

/* ============================================================================
   11.8. Taylor- és Maclaurin-sorok — 8 interaktív és szemléltető SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const fact = (n: number) => {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};

/* ------------------------------------------------------------------ 1. Együtthatók illesztése: c_k = f^(k)(0)/k! */
export function TaylorMatchingWidget() {
  const [deg, setDeg] = useState(3);
  const terms = [
    { k: 0, deriv: 'f(0) = 1', coeff: '1 / 0! = 1', term: '1' },
    { k: 1, deriv: 'f′(0) = 1', coeff: '1 / 1! = 1', term: '+ x' },
    { k: 2, deriv: 'f″(0) = 1', coeff: '1 / 2! = 1/2', term: '+ x²/2' },
    { k: 3, deriv: 'f‴(0) = 1', coeff: '1 / 3! = 1/6', term: '+ x³/6' },
    { k: 4, deriv: 'f⁽⁴⁾(0) = 1', coeff: '1 / 4! = 1/24', term: '+ x⁴/24' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">Miért pontosan cₖ = f⁽ᵏ⁾(a) / k!? — Deriváltak illesztése x = 0-ban (f(x) = eˣ)</div>
      <div className="wcontrols">
        <label>
          Illesztett deriváltrend <b>n = {deg}</b>
          <input type="range" min={0} max={4} value={deg} onChange={(e) => setDeg(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 168" className="plot">
        {terms.map((t, i) => {
          const active = i <= deg;
          const x = 14 + i * 104;
          return (
            <g key={t.k}>
              <rect
                x={x}
                y={16}
                width={96}
                height={102}
                rx={10}
                fill={active ? 'rgba(56, 189, 248, 0.14)' : 'rgba(255,255,255,0.03)'}
                stroke={active ? '#38bdf8' : 'rgba(148,163,184,0.22)'}
                strokeWidth={active ? 1.8 : 1}
              />
              <text x={x + 48} y={38} textAnchor="middle" fill={active ? '#fbbf24' : '#64748b'} fontSize={12} fontWeight={700}>
                k = {t.k}
              </text>
              <text x={x + 48} y={60} textAnchor="middle" fill={active ? '#e2e8f0' : '#64748b'} fontSize={11}>
                {t.deriv}
              </text>
              <text x={x + 48} y={82} textAnchor="middle" fill={active ? '#6ee7b7' : '#64748b'} fontSize={10.5}>
                c{t.k} = {t.coeff}
              </text>
              <text x={x + 48} y={106} textAnchor="middle" fill={active ? '#7dd3fc' : '#475569'} fontSize={12} fontWeight={700}>
                {t.term}
              </text>
            </g>
          );
        })}
        <rect x={14} y={128} width={512} height={28} rx={8} fill="rgba(52, 211, 153, 0.12)" stroke="#34d399" strokeWidth={1.2} />
        <text x={270} y={146} textAnchor="middle" fill="#6ee7b7" fontSize={12.5} fontWeight={700}>
          P_{deg}(x) = {terms.slice(0, deg + 1).map((t) => t.term).join(' ')}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Taylor-polinomok simulása (P0..P4) */
export function OsculatingPolynomialWidget() {
  const [fnType, setFnType] = useState<'cos' | 'exp'>('cos');
  const [n, setN] = useState(2);
  const [xProbe, setXProbe] = useState(0.8);

  const W = 540;
  const H = 240;
  const xMin = -3.2;
  const xMax = 3.2;
  const yMin = fnType === 'cos' ? -1.8 : -0.5;
  const yMax = fnType === 'cos' ? 1.8 : 6.0;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 1, Math.min(yMax + 1, y));

  const f = (x: number) => (fnType === 'cos' ? Math.cos(x) : Math.exp(x));
  const P = (x: number, deg: number) => {
    let s = 0;
    if (fnType === 'cos') {
      for (let k = 0; 2 * k <= deg; k++) {
        s += (Math.pow(-1, k) * Math.pow(x, 2 * k)) / fact(2 * k);
      }
    } else {
      for (let k = 0; k <= deg; k++) {
        s += Math.pow(x, k) / fact(k);
      }
    }
    return s;
  };

  let dF = '';
  let dP = '';
  for (let i = 0; i <= 160; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 160;
    dF += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(f(xv))).toFixed(1)} `;
    dP += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(P(xv, n))).toFixed(1)} `;
  }

  const fVal = f(xProbe);
  const pVal = P(xProbe, n);
  const err = Math.abs(fVal - pVal);

  return (
    <div className="widget">
      <div className="wtitle">A Taylor-polinomok mint legjobb lokális közelítések (P₀ → P₆)</div>
      <div className="relbuttons chips">
        <button className={fnType === 'cos' ? 'on' : ''} onClick={() => setFnType('cos')}>
          f(x) = cos x
        </button>
        <button className={fnType === 'exp' ? 'on' : ''} onClick={() => setFnType('exp')}>
          f(x) = eˣ
        </button>
      </div>
      <div className="wcontrols">
        <label>
          Fokszám <b>n = {n}</b>
          <input type="range" min={0} max={6} value={n} onChange={(e) => setN(+e.target.value)} />
        </label>
        <label>
          Tesztpont <b>x = {xProbe.toFixed(1)}</b>
          <input type="range" min={-2.4} max={2.4} step={0.1} value={xProbe} onChange={(e) => setXProbe(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="oscClip118">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <g clipPath="url(#oscClip118)">
          <path d={dF} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          <path d={dP} fill="none" stroke="#fb923c" strokeWidth={2.3} />
          <line x1={X(xProbe)} y1={Y(clampY(fVal))} x2={X(xProbe)} y2={Y(clampY(pVal))} stroke="#fbbf24" strokeDasharray="3 3" strokeWidth={1.6} />
          <circle cx={X(xProbe)} cy={Y(clampY(fVal))} r={4.2} fill="#38bdf8" />
          <circle cx={X(xProbe)} cy={Y(clampY(pVal))} r={4.2} fill="#fbbf24" />
        </g>
        <text x={padL + 10} y={padT + 18} fill="#38bdf8" fontSize={11}>— f(x) = {fnType === 'cos' ? 'cos x' : 'eˣ'}</text>
        <text x={padL + 10} y={padT + 34} fill="#fb923c" fontSize={11}>— P_{n}(x)</text>
      </svg>
      <div className="readout">
        x = {xProbe.toFixed(1)}-nél: <b>f(x) = {fVal.toFixed(4)}</b> · P<sub>{n}</sub>(x) = <b>{pVal.toFixed(4)}</b> ·
        eltérés = <b>{err.toFixed(4)}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. e^x Maclaurin-sora és e közelítése */
export function ExpMaclaurinWidget() {
  const [N, setN] = useState(4);
  const exactE = Math.E;
  const partials: number[] = [];
  let sum = 0;
  for (let k = 0; k <= 8; k++) {
    sum += 1 / fact(k);
    partials.push(sum);
  }

  const W = 540;
  const H = 200;
  const padL = 46;
  const padR = 24;
  const padT = 22;
  const padB = 34;
  const X = (k: number) => padL + (k / 8) * (W - padL - padR);
  const Y = (v: number) => padT + ((3.0 - v) / (3.0 - 0.8)) * (H - padT - padB);

  return (
    <div className="widget">
      <div className="wtitle">Az e = ∑ 1/k! közelítése: elképesztően gyors faktoriális konvergencia</div>
      <div className="wcontrols">
        <label>
          Részletösszeg <b>N = {N}</b>
          <input type="range" min={0} max={8} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        {/* e referencia vonal */}
        <line x1={padL} y1={Y(exactE)} x2={W - padR} y2={Y(exactE)} stroke="#34d399" strokeDasharray="5 4" strokeWidth={1.6} />
        <text x={W - padR} y={Y(exactE) - 6} textAnchor="end" fill="#6ee7b7" fontSize={11} fontWeight={700}>
          e ≈ 2,71828
        </text>
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} className="ax" />

        {partials.map((val, k) => {
          const active = k <= N;
          const x = X(k);
          const y = Y(val);
          return (
            <g key={k}>
              <rect
                x={x - 14}
                y={y}
                width={28}
                height={H - padB - y}
                rx={5}
                fill={k === N ? 'rgba(251, 191, 36, 0.35)' : active ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255,255,255,0.05)'}
                stroke={k === N ? '#fbbf24' : active ? '#38bdf8' : 'rgba(148,163,184,0.2)'}
                strokeWidth={k === N ? 2 : 1.2}
              />
              <text x={x} y={H - 14} textAnchor="middle" fill="#94a3b8" fontSize={11}>n={k}</text>
              {k === N && (
                <text x={x} y={y - 7} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>
                  {val.toFixed(4)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="readout">
        P<sub>{N}</sub>(1) = <b>{partials[N].toFixed(6)}</b> · pontos e = <b>{exactE.toFixed(6)}</b> · hiba ={' '}
        <b>{Math.abs(exactE - partials[N]).toFixed(6)}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. sin x és cos x Maclaurin-sora */
export function TrigDerivativeCycleWidget() {
  const [fn, setFn] = useState<'sin' | 'cos'>('sin');
  const [terms, setTerms] = useState(3);
  const W = 540;
  const H = 240;
  const xMin = -6.5;
  const xMax = 6.5;
  const yMin = -2.2;
  const yMax = 2.2;
  const padL = 40;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 1, Math.min(yMax + 1, y));

  const approx = (x: number) => {
    let s = 0;
    for (let k = 0; k < terms; k++) {
      const p = fn === 'sin' ? 2 * k + 1 : 2 * k;
      s += (Math.pow(-1, k) * Math.pow(x, p)) / fact(p);
    }
    return s;
  };

  let dExact = '';
  let dPoly = '';
  for (let i = 0; i <= 180; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 180;
    const yExact = fn === 'sin' ? Math.sin(xv) : Math.cos(xv);
    dExact += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yExact).toFixed(1)} `;
    dPoly += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(approx(xv))).toFixed(1)} `;
  }

  const maxDeg = fn === 'sin' ? 2 * terms - 1 : 2 * (terms - 1);

  return (
    <div className="widget">
      <div className="wtitle">A sin x és cos x Maclaurin-polinomjai rátekerednek a hullámra (R = ∞)</div>
      <div className="relbuttons chips">
        <button className={fn === 'sin' ? 'on' : ''} onClick={() => setFn('sin')}>
          sin x (páratlan hatványok)
        </button>
        <button className={fn === 'cos' ? 'on' : ''} onClick={() => setFn('cos')}>
          cos x (páros hatványok)
        </button>
      </div>
      <div className="wcontrols">
        <label>
          Tagok száma <b>k = {terms}</b> (fokszám: {maxDeg})
          <input type="range" min={1} max={8} value={terms} onChange={(e) => setTerms(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="trigClip118">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        {[-Math.PI, Math.PI].map((v, i) => (
          <g key={i}>
            <line x1={X(v)} y1={padT} x2={X(v)} y2={H - padB} stroke="rgba(148,163,184,0.22)" strokeDasharray="3 4" />
            <text x={X(v)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>{v < 0 ? '−π' : 'π'}</text>
          </g>
        ))}
        <g clipPath="url(#trigClip118)">
          <path d={dExact} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
          <path d={dPoly} fill="none" stroke="#34d399" strokeWidth={2.3} />
        </g>
        <text x={padL + 10} y={padT + 18} fill="#38bdf8" fontSize={11}>— {fn} x</text>
        <text x={padL + 10} y={padT + 34} fill="#34d399" fontSize={11}>— P_{maxDeg}(x)</text>
      </svg>
      <div className="readout">
        Minden új tag egy újabb félhullámmal távolabbra tolja a tökéletes illeszkedést — mivel <b>R = ∞</b>, az egész
        számegyenesen konvergens!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Nem nulla középpont: ln x az a = 1 körül */
export function NonZeroCenterWidget() {
  const [N, setN] = useState(3);
  const W = 540;
  const H = 235;
  const xMin = -0.2;
  const xMax = 2.8;
  const yMin = -2.2;
  const yMax = 1.4;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 1, Math.min(yMax + 1, y));

  const polyLn = (x: number) => {
    let s = 0;
    const u = x - 1;
    for (let k = 1; k <= N; k++) {
      s += (Math.pow(-1, k - 1) * Math.pow(u, k)) / k;
    }
    return s;
  };

  let dExact = '';
  for (let i = 0; i <= 120; i++) {
    const xv = 0.08 + ((xMax - 0.08) * i) / 120;
    dExact += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(Math.log(xv))).toFixed(1)} `;
  }
  let dPoly = '';
  for (let i = 0; i <= 140; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 140;
    dPoly += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(polyLn(xv))).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">Miért kell a ≠ 0 középpont? — ln x Taylor-sora az a = 1 pont körül</div>
      <div className="wcontrols">
        <label>
          Fokszám <b>N = {N}</b>
          <input type="range" min={1} max={10} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="lnClip118">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <rect x={X(0)} y={padT} width={X(2) - X(0)} height={H - padT - padB} fill="rgba(45, 212, 191, 0.09)" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} stroke="#f87171" strokeDasharray="4 4" />
        <line x1={X(2)} y1={padT} x2={X(2)} y2={H - padB} stroke="#34d399" strokeDasharray="4 4" />
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <g clipPath="url(#lnClip118)">
          <path d={dExact} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          <path d={dPoly} fill="none" stroke="#fbbf24" strokeWidth={2.3} />
          <circle cx={X(1)} cy={Y(0)} r={5} fill="#fbbf24" stroke="#fff" strokeWidth={1.5} />
        </g>
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#f87171" fontSize={11}>0 (pólus)</text>
        <text x={X(1)} y={H - 12} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>a = 1</text>
        <text x={X(2)} y={H - 12} textAnchor="middle" fill="#34d399" fontSize={11}>2 (zárt végpont)</text>
      </svg>
      <div className="readout">
        Mivel ln x nincs értelmezve x = 0-ban, az <b>a = 1</b> körül fejtjük ki: a sugár <b>R = 1</b> (pontosan a
        legközelebbi szakadásig, x = 0-ig ér!), így I = <b>(0, 2]</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Hiperbolikus vs. trigonometrikus összehasonlítás */
export function HyperbolicMaclaurinWidget() {
  const [show, setShow] = useState<'ch' | 'sh'>('ch');
  const [N, setN] = useState(3);
  const W = 540;
  const H = 225;
  const xMin = -3;
  const xMax = 3;
  const yMin = show === 'ch' ? 0 : -10;
  const yMax = 11;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 1, Math.min(yMax + 1, y));

  const exact = (x: number) => (show === 'ch' ? Math.cosh(x) : Math.sinh(x));
  const poly = (x: number) => {
    let s = 0;
    for (let k = 0; k < N; k++) {
      const p = show === 'ch' ? 2 * k : 2 * k + 1;
      s += Math.pow(x, p) / fact(p);
    }
    return s;
  };

  let dE = '';
  let dP = '';
  for (let i = 0; i <= 140; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 140;
    dE += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(exact(xv))).toFixed(1)} `;
    dP += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(poly(xv))).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">Hiperbolikus Maclaurin-sorok: ugyanaz, mint cos/sin, csak csupa + előjellel!</div>
      <div className="relbuttons chips">
        <button className={show === 'ch' ? 'on' : ''} onClick={() => setShow('ch')}>
          ch x = 1 + x²/2! + x⁴/4! + …
        </button>
        <button className={show === 'sh' ? 'on' : ''} onClick={() => setShow('sh')}>
          sh x = x + x³/3! + x⁵/5! + …
        </button>
      </div>
      <div className="wcontrols">
        <label>
          Tagok száma <b>k = {N}</b>
          <input type="range" min={1} max={6} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="hypClip118">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <g clipPath="url(#hypClip118)">
          <path d={dE} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          <path d={dP} fill="none" stroke="#fb923c" strokeWidth={2.3} />
        </g>
        <text x={padL + 10} y={padT + 18} fill="#38bdf8" fontSize={11}>— {show} x</text>
        <text x={padL + 10} y={padT + 34} fill="#fb923c" fontSize={11}>— {N} tagú Maclaurin-polinom</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Cauchy ellenpéldája: e^(-1/x²) */
export function FlatFunctionWarningWidget() {
  const W = 540;
  const H = 185;
  const xMin = -2.2;
  const xMax = 2.2;
  const yMin = -0.15;
  const yMax = 1.1;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);

  let dF = '';
  for (let i = 0; i <= 180; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 180;
    const yv = Math.abs(xv) < 0.01 ? 0 : Math.exp(-1 / (xv * xv));
    dF += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yv).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">Híd a 11.9-hez: f(x) = e^(−1/x²) — a Maclaurin-sor konvergens, mégsem egyenlő f(x)-szel!</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} stroke="#fb923c" strokeWidth={2.5} strokeDasharray="6 4" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <path d={dF} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
        <circle cx={X(0)} cy={Y(0)} r={5} fill="#fbbf24" stroke="#fff" strokeWidth={1.5} />
        <text x={X(0) + 12} y={Y(0) - 10} fill="#fbbf24" fontSize={11} fontWeight={700}>
          f⁽ⁿ⁾(0) = 0 minden n-re!
        </text>
        <text x={padL + 10} y={padT + 18} fill="#38bdf8" fontSize={11}>— f(x) = e^(−1/x²)</text>
        <text x={padL + 10} y={padT + 34} fill="#fb923c" fontSize={11}>-- Maclaurin-sor: 0 + 0x + 0x² + … ≡ 0</text>
      </svg>
      <div className="readout">
        Az origóban annyira „lapos” a görbe, hogy minden deriváltja 0. Ezért kell a <b>11.9-ben Taylor tétele</b>, amely
        a maradéktaggal igazolja, mikor egyezik meg a sor ténylegesen f(x)-szel!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. 6 kanonikus Maclaurin-sor áttekintő kártya */
export function MaclaurinCheatSheetDiagram() {
  const rows = [
    { fn: 'eˣ', ser: '∑ xⁿ / n!', r: 'ℝ (R = ∞)', c: '#38bdf8' },
    { fn: 'sin x', ser: '∑ (−1)ⁿ x²ⁿ⁺¹ / (2n+1)!', r: 'ℝ (R = ∞)', c: '#34d399' },
    { fn: 'cos x', ser: '∑ (−1)ⁿ x²ⁿ / (2n)!', r: 'ℝ (R = ∞)', c: '#2dd4bf' },
    { fn: '1 / (1 − x)', ser: '∑ xⁿ', r: '(−1, 1)', c: '#fbbf24' },
    { fn: 'ln(1 + x)', ser: '∑ (−1)ⁿ⁻¹ xⁿ / n', r: '(−1, 1]', c: '#fb923c' },
    { fn: 'arctg x', ser: '∑ (−1)ⁿ x²ⁿ⁺¹ / (2n+1)', r: '[−1, 1]', c: '#60a5fa' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A hat legfontosabb Maclaurin-sor (11.7–11.8 zsebkalauz)</div>
      <svg viewBox="0 0 540 218" className="plot">
        {rows.map((r, i) => {
          const y = 14 + i * 33;
          return (
            <g key={r.fn}>
              <rect x={12} y={y} width={516} height={27} rx={7} fill="rgba(255,255,255,0.04)" stroke="rgba(148,163,184,0.18)" />
              <rect x={12} y={y} width={5} height={27} rx={2} fill={r.c} />
              <text x={30} y={y + 18} fill={r.c} fontSize={12.5} fontWeight={700}>{r.fn}</text>
              <text x={145} y={y + 18} fill="#e2e8f0" fontSize={12} fontWeight={600}>= {r.ser}</text>
              <text x={516} y={y + 18} textAnchor="end" fill="#94a3b8" fontSize={11.5}>{r.r}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
