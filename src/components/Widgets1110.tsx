import { useState } from 'react';

/* ============================================================================
   11.10. Hatványsorok alkalmazása — 8 interaktív és szemléltető SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const binom = (m: number, k: number) => {
  let r = 1;
  for (let i = 0; i < k; i++) r *= (m - i) / (i + 1);
  return r;
};

/* ------------------------------------------------------------------ 1. Binomiális sor (1 + x)^m */
const BINOM_CASES = [
  { id: 'sqrt', label: 'm = 1/2 : √(1+x)', m: 0.5 },
  { id: 'invsqrt', label: 'm = −1/2 : 1/√(1+x)', m: -0.5 },
  { id: 'cbrt', label: 'm = 1/3 : ∛(1+x)', m: 1 / 3 },
  { id: 'invsq', label: 'm = −2 : 1/(1+x)²', m: -2 },
];

export function BinomialSeriesWidget() {
  const [cIdx, setCIdx] = useState(0);
  const [N, setN] = useState(3);
  const cfg = BINOM_CASES[cIdx];

  const W = 540;
  const H = 230;
  const xMin = -1.1;
  const xMax = 1.4;
  const yMin = -0.3;
  const yMax = 3.2;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 1, Math.min(yMax + 1, y));

  const polyVal = (x: number) => {
    let s = 0;
    for (let k = 0; k <= N; k++) s += binom(cfg.m, k) * Math.pow(x, k);
    return s;
  };

  let dExact = '';
  for (let i = 0; i <= 120; i++) {
    const xv = -0.92 + ((xMax + 0.92) * i) / 120;
    dExact += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(Math.pow(1 + xv, cfg.m))).toFixed(1)} `;
  }
  let dPoly = '';
  for (let i = 0; i <= 140; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 140;
    dPoly += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(polyVal(xv))).toFixed(1)} `;
  }

  const x0 = 0.5;
  const ex0 = Math.pow(1 + x0, cfg.m);
  const ap0 = polyVal(x0);

  return (
    <div className="widget">
      <div className="wtitle">A binomiális sor: (1 + x)ᵐ = ∑ C(m, k) xᵏ (|x| &lt; 1)</div>
      <div className="relbuttons chips">
        {BINOM_CASES.map((b, i) => (
          <button key={b.id} className={i === cIdx ? 'on' : ''} onClick={() => setCIdx(i)}>
            {b.label}
          </button>
        ))}
      </div>
      <div className="wcontrols">
        <label>
          Fokszám <b>N = {N}</b>
          <input type="range" min={1} max={8} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="binClip1110">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <rect x={X(-1)} y={padT} width={X(1) - X(-1)} height={H - padT - padB} fill="rgba(52, 211, 153, 0.09)" />
        <line x1={X(-1)} y1={padT} x2={X(-1)} y2={H - padB} stroke="#f87171" strokeDasharray="4 4" opacity={0.7} />
        <line x1={X(1)} y1={padT} x2={X(1)} y2={H - padB} stroke="#34d399" strokeDasharray="4 4" opacity={0.7} />
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <g clipPath="url(#binClip1110)">
          <path d={dExact} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          <path d={dPoly} fill="none" stroke="#fbbf24" strokeWidth={2.3} />
          <circle cx={X(x0)} cy={Y(ex0)} r={4.2} fill="#38bdf8" />
          <circle cx={X(x0)} cy={Y(ap0)} r={4.2} fill="#fbbf24" />
        </g>
        <text x={X(-1)} y={H - 12} textAnchor="middle" fill="#f87171" fontSize={11}>−1</text>
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(1)} y={H - 12} textAnchor="middle" fill="#34d399" fontSize={11}>1</text>
      </svg>
      <div className="readout">
        x = 0,5-nél: pontos érték = <b>{ex0.toFixed(5)}</b> · P<sub>{N}</sub>(0,5) = <b>{ap0.toFixed(5)}</b> · hiba ={' '}
        <b>{Math.abs(ex0 - ap0).toFixed(5)}</b>.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Relativisztikus mozgási energia */
export function RelativityEnergyWidget() {
  const [beta, setBeta] = useState(0.5); // v / c
  const W = 540;
  const H = 220;
  const xMin = 0;
  const xMax = 0.88;
  const yMin = 0;
  const yMax = 1.2;
  const padL = 48;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (b: number) => padL + ((b - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (e: number) => padT + ((yMax - e) / (yMax - yMin)) * (H - padT - padB);

  const exact = (b: number) => 1 / Math.sqrt(1 - b * b) - 1;
  const newton = (b: number) => 0.5 * b * b;
  const corr = (b: number) => 0.5 * b * b + 0.375 * Math.pow(b, 4);

  let dEx = '';
  let dNw = '';
  let dCr = '';
  for (let i = 0; i <= 100; i++) {
    const b = (xMax * i) / 100;
    dEx += `${i ? 'L' : 'M'}${X(b).toFixed(1)},${Y(Math.min(yMax, exact(b))).toFixed(1)} `;
    dNw += `${i ? 'L' : 'M'}${X(b).toFixed(1)},${Y(newton(b)).toFixed(1)} `;
    dCr += `${i ? 'L' : 'M'}${X(b).toFixed(1)},${Y(Math.min(yMax, corr(b))).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">Einstein vs. Newton: Eₖ / (mc²) = (1 − β²)⁻¹/² − 1 = ½β² + ⅜β⁴ + …</div>
      <div className="wcontrols">
        <label>
          Sebességarány <b>v / c = {beta.toFixed(2)}</b> ({Math.round(beta * 100)}% fénysebesség)
          <input type="range" min={0.05} max={0.85} step={0.05} value={beta} onChange={(e) => setBeta(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} className="ax" />
        <path d={dEx} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
        <path d={dCr} fill="none" stroke="#34d399" strokeWidth={2.2} strokeDasharray="5 4" />
        <path d={dNw} fill="none" stroke="#fb923c" strokeWidth={2.1} strokeDasharray="3 3" />
        <circle cx={X(beta)} cy={Y(exact(beta))} r={4.5} fill="#38bdf8" />
        <circle cx={X(beta)} cy={Y(corr(beta))} r={4.5} fill="#34d399" />
        <circle cx={X(beta)} cy={Y(newton(beta))} r={4.5} fill="#fb923c" />
        <text x={padL + 10} y={padT + 16} fill="#38bdf8" fontSize={11}>— Einstein (pontos): {exact(beta).toFixed(4)}</text>
        <text x={padL + 10} y={padT + 32} fill="#34d399" fontSize={11}>-- 2 tagos binomiális: {corr(beta).toFixed(4)}</text>
        <text x={padL + 10} y={padT + 48} fill="#fb923c" fontSize={11}>·· Newton (½β²): {newton(beta).toFixed(4)}</text>
        <text x={X(beta)} y={H - 12} textAnchor="middle" fill="#fbbf24" fontSize={11}>β = {beta.toFixed(2)}</text>
      </svg>
      <div className="readout">
        Kis sebességnél (β ≤ 0,1) Newton képlete 1%-on belül pontos; <b>v = 0,5c</b>-nél már a <b>⅜β⁴</b> korrekció
        drámaian javítja a pontosságot!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. arcsin x levezetési lánc */
export function ArcsinDerivationDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">Hogyan születik az arcsin x Maclaurin-sora a binomiális sorból?</div>
      <svg viewBox="0 0 540 120" className="plot">
        <rect x={12} y={20} width={154} height={78} rx={10} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={89} y={44} textAnchor="middle" fill="#7dd3fc" fontSize={11.5} fontWeight={700}>1. Binomiális (m=−½)</text>
        <text x={89} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>(1 + u)⁻¹/² =</text>
        <text x={89} y={84} textAnchor="middle" fill="#fbbf24" fontSize={11}>1 − ½u + ⅜u² − …</text>

        <text x={182} y={63} textAnchor="middle" fill="#34d399" fontSize={16} fontWeight={700}>→</text>

        <rect x={198} y={20} width={154} height={78} rx={10} fill="rgba(45,212,191,0.12)" stroke="#2dd4bf" strokeWidth={1.5} />
        <text x={275} y={44} textAnchor="middle" fill="#5eead4" fontSize={11.5} fontWeight={700}>2. u = −t² csere</text>
        <text x={275} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>1 / √(1 − t²) =</text>
        <text x={275} y={84} textAnchor="middle" fill="#fbbf24" fontSize={11}>1 + ½t² + ⅜t⁴ + …</text>

        <text x={368} y={63} textAnchor="middle" fill="#34d399" fontSize={16} fontWeight={700}>→</text>

        <rect x={384} y={20} width={144} height={78} rx={10} fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth={1.5} />
        <text x={456} y={44} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>3. Integrálás 0→x</text>
        <text x={456} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>arcsin x =</text>
        <text x={456} y={84} textAnchor="middle" fill="#fbbf24" fontSize={11}>x + x³/6 + 3x⁵/40 + …</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Airy-egyenlet (y'' = xy) hatványsoros megoldása */
export function PowerSeriesODEWidget() {
  const [K, setK] = useState(4); // hány 3k-s tag
  const W = 540;
  const H = 225;
  const xMin = -4.2;
  const xMax = 2.6;
  const yMin = -1.4;
  const yMax = 3.2;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 1, Math.min(yMax + 1, y));

  // y'' = x y, y(0)=1, y'(0)=0 => c_0 = 1, c_{3k} = c_{3k-3} / (3k*(3k-1))
  const coeffs = [1];
  for (let k = 1; k <= 12; k++) {
    coeffs.push(coeffs[k - 1] / (3 * k * (3 * k - 1)));
  }
  const evalAiry = (x: number, terms: number) => {
    let s = 0;
    for (let k = 0; k < terms; k++) s += coeffs[k] * Math.pow(x, 3 * k);
    return s;
  };

  let dRef = '';
  let dApprox = '';
  for (let i = 0; i <= 160; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 160;
    dRef += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(evalAiry(xv, 12))).toFixed(1)} `;
    dApprox += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(evalAiry(xv, K))).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">Airy-egyenlet (y″ = x·y, y(0)=1, y′(0)=0): nincs elemi képlete, csak hatványsora!</div>
      <div className="wcontrols">
        <label>
          Megtartott tagok száma <b>k = {K}</b> (fokszám: {3 * (K - 1)})
          <input type="range" min={1} max={8} value={K} onChange={(e) => setK(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="airyClip1110">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <g clipPath="url(#airyClip1110)">
          <path d={dRef} fill="none" stroke="#38bdf8" strokeWidth={2.5} opacity={0.7} />
          <path d={dApprox} fill="none" stroke="#fbbf24" strokeWidth={2.4} />
          <circle cx={X(0)} cy={Y(1)} r={4.5} fill="#34d399" stroke="#fff" strokeWidth={1.2} />
        </g>
        <text x={padL + 10} y={padT + 18} fill="#38bdf8" fontSize={11}>— Pontos Airy-megoldás (kvantummechanika)</text>
        <text x={padL + 10} y={padT + 34} fill="#fbbf24" fontSize={11}>— Hatványsor-közelítés ({K} tag)</text>
      </svg>
      <div className="readout">
        y(x) = <b>1 + x³/6 + x⁶/180 + x⁹/12960 + …</b> — x &lt; 0-ra hullámzik, x &gt; 0-ra exponenciálisan nő!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Nem-elemi integrálok közelítése */
const INT_CASES = [
  {
    id: 'gauss',
    label: '∫₀¹ e^(−x²) dx',
    fn: (x: number) => Math.exp(-x * x),
    term: (k: number) => Math.pow(-1, k) / (fact(k) * (2 * k + 1)),
    exact: 0.74682413,
  },
  {
    id: 'si',
    label: '∫₀¹ (sin x / x) dx',
    fn: (x: number) => (Math.abs(x) < 1e-5 ? 1 : Math.sin(x) / x),
    term: (k: number) => Math.pow(-1, k) / (fact(2 * k + 1) * (2 * k + 1)),
    exact: 0.94608307,
  },
  {
    id: 'fresnel',
    label: '∫₀¹ cos(x²) dx',
    fn: (x: number) => Math.cos(x * x),
    term: (k: number) => Math.pow(-1, k) / (fact(2 * k) * (4 * k + 1)),
    exact: 0.90452424,
  },
];

function fact(n: number) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function NonElementaryIntegralWidget() {
  const [idx, setIdx] = useState(0);
  const [N, setN] = useState(3);
  const c = INT_CASES[idx];

  let approx = 0;
  for (let k = 0; k < N; k++) approx += c.term(k);
  const leibnizBound = Math.abs(c.term(N));

  const W = 540;
  const H = 195;
  const padL = 44;
  const padR = 24;
  const padT = 20;
  const padB = 34;
  const X = (x: number) => padL + x * (W - padL - padR);
  const Y = (y: number) => padT + ((1.15 - y) / 1.15) * (H - padT - padB);

  let dCurve = '';
  let dArea = `M${X(0).toFixed(1)},${Y(0).toFixed(1)} `;
  for (let i = 0; i <= 80; i++) {
    const xv = i / 80;
    const yv = c.fn(xv);
    dCurve += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yv).toFixed(1)} `;
    dArea += `L${X(xv).toFixed(1)},${Y(yv).toFixed(1)} `;
  }
  dArea += `L${X(1).toFixed(1)},${Y(0).toFixed(1)} Z`;

  return (
    <div className="widget">
      <div className="wtitle">Nem-elemi határozott integrálok kiszámítása hatványsorral</div>
      <div className="relbuttons chips">
        {INT_CASES.map((item, i) => (
          <button key={item.id} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="wcontrols">
        <label>
          Összeadott tagok száma <b>N = {N}</b>
          <input type="range" min={1} max={6} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <path d={dArea} fill="rgba(56, 189, 248, 0.18)" />
        <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={padL} y1={padT} x2={padL} y2={Y(0)} className="ax" />
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(0.5)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0,5</text>
        <text x={X(1)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>1</text>
        <text x={X(0.5)} y={Y(0.35)} textAnchor="middle" fill="#6ee7b7" fontSize={13} fontWeight={700}>
          Terület ≈ {approx.toFixed(6)}
        </text>
      </svg>
      <div className="readout">
        {N} taggal: <b>{approx.toFixed(6)}</b> · pontos érték = <b>{c.exact.toFixed(6)}</b> · Leibniz-hibakorlát ≤{' '}
        <b>{leibnizBound.toFixed(6)}</b>!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Határértékek Taylor-sorral */
export function SeriesLimitVisualWidget() {
  return (
    <div className="widget">
      <div className="wtitle">L’Hôpital-szabály (5 kör) vs. Taylor-sor (1 sor!): lim (sin x − x + x³/6) / x⁵</div>
      <svg viewBox="0 0 540 140" className="plot">
        <rect x={14} y={16} width={512} height={108} rx={12} fill="rgba(56,189,248,0.09)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={30} y={42} fill="#7dd3fc" fontSize={12.5} fontWeight={700}>
          sin x = x − x³/6 + x⁵/120 − x⁷/5040 + …
        </text>
        <text x={30} y={68} fill="#fb923c" fontSize={12}>
          Kivonjuk (x − x³/6)-ot  ⇒  a két alacsonyabb tag KIESIK!
        </text>
        <text x={30} y={96} fill="#6ee7b7" fontSize={13} fontWeight={700}>
          (x⁵/120 − x⁷/5040 + …) / x⁵ = 1/120 − x²/5040 + …  →  1/120   (x → 0)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. π számítási verseny (Leibniz vs. Sharp vs. Machin) */
export function PiConvergenceRaceWidget() {
  const [N, setN] = useState(4);

  const atanSum = (x: number, terms: number) => {
    let s = 0;
    for (let k = 0; k < terms; k++) s += (Math.pow(-1, k) * Math.pow(x, 2 * k + 1)) / (2 * k + 1);
    return s;
  };

  const piLeibniz = 4 * atanSum(1, N);
  const piSharp = 6 * atanSum(1 / Math.sqrt(3), N);
  const piMachin = 16 * atanSum(1 / 5, N) - 4 * atanSum(1 / 239, N);

  const digits = (val: number) => {
    const err = Math.abs(Math.PI - val);
    if (err < 1e-14) return 14;
    return Math.max(0, -Math.log10(err));
  };

  const racers = [
    { name: 'Leibniz: 4·arctg(1)', val: piLeibniz, d: digits(piLeibniz), c: '#fb923c' },
    { name: 'Sharp: 6·arctg(1/√3)', val: piSharp, d: digits(piSharp), c: '#38bdf8' },
    { name: 'Machin: 16·arctg(1/5) − 4·arctg(1/239)', val: piMachin, d: digits(piMachin), c: '#34d399' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A π-verseny: hány pontos tizedesjegyet ad N tag?</div>
      <div className="wcontrols">
        <label>
          Tagok száma <b>N = {N}</b>
          <input type="range" min={1} max={10} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 165" className="plot">
        {racers.map((r, i) => {
          const y = 18 + i * 48;
          const barW = Math.min(340, (r.d / 14) * 340);
          return (
            <g key={r.name}>
              <text x={14} y={y + 12} fill="#e2e8f0" fontSize={11.5} fontWeight={600}>
                {r.name}  →  {r.val.toFixed(7)}
              </text>
              <rect x={14} y={y + 19} width={Math.max(8, barW)} height={14} rx={5} fill={r.c} opacity={0.85} />
              <text x={22 + Math.max(8, barW)} y={y + 30} fill={r.c} fontSize={11.5} fontWeight={700}>
                ~{r.d.toFixed(1)} pontos jegy
              </text>
            </g>
          );
        })}
      </svg>
      <div className="readout">
        Pontos π = <b>3,1415927…</b> — Machin képlete már <b>N = 5</b> taggal 7 tizedesjegyig pontos, míg Leibnizhez
        ugyanehhez <b>5 millió tag</b> kellene!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. 11.10 négy alkalmazási pillér térkép */
export function ApplicationsMapDiagram() {
  const cards = [
    { t: '1. Binomiális sor', b: '(1+x)ᵐ = ∑ C(m,k)xᵏ', s: 'Gyökök, relativitás, arcsin x', c: '#38bdf8' },
    { t: '2. Differenciálegyenletek', b: 'y = ∑ cₙ xⁿ próba', s: 'Airy-egyenlet, rekurziók', c: '#34d399' },
    { t: '3. Nem-elemi integrálok', b: '∫ e⁻ˣ², ∫ sin(x)/x', s: 'Tagonkénti integrálás + Leibniz', c: '#fbbf24' },
    { t: '4. Villám-határértékek', b: '0/0 alakok L’Hôpital nélkül', s: 'Főtag leolvasása azonnal', c: '#fb923c' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A hatványsorok négy szuperereje (11.10 összefoglaló)</div>
      <svg viewBox="0 0 540 164" className="plot">
        {cards.map((k, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = 14 + col * 260;
          const y = 14 + row * 74;
          return (
            <g key={k.t}>
              <rect x={x} y={y} width={250} height={64} rx={10} fill="rgba(255,255,255,0.04)" stroke={k.c} strokeWidth={1.5} />
              <text x={x + 14} y={y + 22} fill={k.c} fontSize={12.5} fontWeight={700}>{k.t}</text>
              <text x={x + 14} y={y + 40} fill="#e2e8f0" fontSize={11.5}>{k.b}</text>
              <text x={x + 14} y={y + 56} fill="#94a3b8" fontSize={10.5}>{k.s}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
