import { useState } from 'react';

/* ============================================================================
   11.9. A Taylor-sorok konvergenciája, Taylor tétele — 8 interaktív SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const fact = (n: number) => {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};

/* ------------------------------------------------------------------ 1. Taylor-maradéktag vizualizáció (e^x) */
export function TaylorRemainderVisualWidget() {
  const [n, setN] = useState(2);
  const [xVal, setXVal] = useState(1.2);
  const W = 540;
  const H = 235;
  const xMin = -0.6;
  const xMax = 2.1;
  const yMin = -0.2;
  const yMax = 8.2;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const clampY = (y: number) => Math.max(yMin - 1, Math.min(yMax + 1, y));

  const P = (x: number) => {
    let s = 0;
    for (let k = 0; k <= n; k++) s += Math.pow(x, k) / fact(k);
    return s;
  };

  let dF = '';
  let dP = '';
  for (let i = 0; i <= 140; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 140;
    dF += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(Math.exp(xv))).toFixed(1)} `;
    dP += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(clampY(P(xv))).toFixed(1)} `;
  }

  const fx = Math.exp(xVal);
  const px = P(xVal);
  const Rn = fx - px;
  // Lagrange c pont meghatározása: e^c * x^(n+1)/(n+1)! = Rn => c = ln(Rn * (n+1)! / x^(n+1))
  const cVal = xVal > 0.05 && Rn > 1e-12 ? Math.log((Rn * fact(n + 1)) / Math.pow(xVal, n + 1)) : 0;

  return (
    <div className="widget">
      <div className="wtitle">Taylor tétele (22. tétel): f(x) = Pₙ(x) + Rₙ(x) — a maradéktag és a közbülső c pont</div>
      <div className="wcontrols">
        <label>
          Fokszám <b>n = {n}</b>
          <input type="range" min={0} max={4} value={n} onChange={(e) => setN(+e.target.value)} />
        </label>
        <label>
          Kiértékelési pont <b>x = {xVal.toFixed(1)}</b>
          <input type="range" min={0.2} max={1.9} step={0.1} value={xVal} onChange={(e) => setXVal(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <defs>
          <clipPath id="remClip119">
            <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
          </clipPath>
        </defs>
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <g clipPath="url(#remClip119)">
          <path d={dF} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
          <path d={dP} fill="none" stroke="#34d399" strokeWidth={2.3} />
          {/* Maradéktag függőleges szakasz */}
          <line x1={X(xVal)} y1={Y(fx)} x2={X(xVal)} y2={Y(px)} stroke="#f87171" strokeWidth={3.2} />
          <circle cx={X(xVal)} cy={Y(fx)} r={4.2} fill="#38bdf8" />
          <circle cx={X(xVal)} cy={Y(px)} r={4.2} fill="#34d399" />
          {/* Közbülső c pont az x-tengelyen */}
          <circle cx={X(cVal)} cy={Y(0)} r={4.8} fill="#fbbf24" stroke="#fff" strokeWidth={1.2} />
        </g>
        <text x={X(cVal)} y={H - 12} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>
          c ≈ {cVal.toFixed(2)}
        </text>
        <text x={X(xVal)} y={H - 12} textAnchor="middle" fill="#f87171" fontSize={11} fontWeight={700}>
          x = {xVal.toFixed(1)}
        </text>
        <text x={padL + 10} y={padT + 18} fill="#38bdf8" fontSize={11}>— eˣ</text>
        <text x={padL + 10} y={padT + 34} fill="#34d399" fontSize={11}>— P_{n}(x)</text>
        <text x={padL + 10} y={padT + 50} fill="#f87171" fontSize={11}>| R_{n}(x) = {Rn.toFixed(4)}</text>
      </svg>
      <div className="readout">
        Valódi maradéktag <b>R<sub>{n}</sub>({xVal.toFixed(1)}) = {Rn.toFixed(4)}</b>, amely pontosan megegyezik{' '}
        <b>eᶜ · x^{n + 1}/(n+1)!</b> értékkel a <b>c ≈ {cVal.toFixed(2)} ∈ (0, {xVal.toFixed(1)})</b> közbülső pontban!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. |x|^(n+1)/(n+1)! lecsengése */
export function RemainderDecayWidget() {
  const [xVal, setXVal] = useState(3);
  const terms = Array.from({ length: 14 }, (_, k) => {
    const n = k + 1;
    return { n, val: Math.pow(xVal, n) / fact(n) };
  });
  const maxVal = Math.max(...terms.map((t) => t.val), 1);

  const W = 540;
  const H = 200;
  const padL = 42;
  const padR = 18;
  const padT = 24;
  const padB = 34;

  return (
    <div className="widget">
      <div className="wtitle">Miért tart 0-hoz minden x-re az |x|ⁿ / n! maradékfaktor?</div>
      <div className="wcontrols">
        <label>
          Választott <b>|x| = {xVal}</b>
          <input type="range" min={1} max={5} step={1} value={xVal} onChange={(e) => setXVal(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} className="ax" />
        {terms.map((t, i) => {
          const bw = (W - padL - padR) / terms.length;
          const x = padL + i * bw + 4;
          const h = Math.max(2, (t.val / maxVal) * (H - padT - padB - 10));
          const y = H - padB - h;
          const shrinking = t.n > xVal;
          return (
            <g key={t.n}>
              <rect
                x={x}
                y={y}
                width={bw - 8}
                height={h}
                rx={4}
                fill={shrinking ? 'rgba(52, 211, 153, 0.35)' : 'rgba(251, 146, 60, 0.38)'}
                stroke={shrinking ? '#34d399' : '#fb923c'}
                strokeWidth={1.3}
              />
              <text x={x + (bw - 8) / 2} y={H - 14} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>
                {t.n}
              </text>
            </g>
          );
        })}
        <text x={padL + 8} y={16} fill="#fb923c" fontSize={11}>■ n ≤ |x|: még nőhet</text>
        <text x={padL + 160} y={16} fill="#34d399" fontSize={11}>■ n &gt; |x|: a faktoriális 0-ba nyomja!</text>
      </svg>
      <div className="readout">
        |x| = {xVal} esetén a csúcs n = {xVal}-nél van ({(Math.pow(xVal, xVal) / fact(xVal)).toFixed(2)}), utána minden
        lépésben |x|/n &lt; 1-gyel szorozzuk — a 14. tag már csak <b>{terms[13].val.toExponential(2)}</b>!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Pontosság-kalibrátor */
const PREC_OPTIONS = [
  { id: 'exp', label: 'e¹ ≈ e (M = 3)', M: 3, step: 1, exact: Math.E },
  { id: 'sin', label: 'sin(1) (M = 1)', M: 1, step: 2, exact: Math.sin(1) },
  { id: 'cos', label: 'cos(1) (M = 1)', M: 1, step: 2, exact: Math.cos(1) },
];

export function PrecisionCalibratorWidget() {
  const [fnIdx, setFnIdx] = useState(0);
  const [expPow, setExpPow] = useState(4); // 10^-4
  const eps = Math.pow(10, -expPow);
  const cfg = PREC_OPTIONS[fnIdx];

  const rows: { n: number; bound: number; ok: boolean }[] = [];
  for (let n = 1; n <= 10; n++) {
    const b = cfg.M / fact(n + 1);
    rows.push({ n, bound: b, ok: b < eps });
  }
  const firstOk = rows.find((r) => r.ok)?.n ?? 10;

  return (
    <div className="widget">
      <div className="wtitle">Hányadik fokú Taylor-polinom kell 10⁻ᵏ pontossághoz?</div>
      <div className="relbuttons chips">
        {PREC_OPTIONS.map((o, i) => (
          <button key={o.id} className={i === fnIdx ? 'on' : ''} onClick={() => setFnIdx(i)}>
            {o.label}
          </button>
        ))}
      </div>
      <div className="wcontrols">
        <label>
          Célhiba <b>ε = 10⁻{expPow}</b> ({eps})
          <input type="range" min={2} max={7} value={expPow} onChange={(e) => setExpPow(+e.target.value)} />
        </label>
      </div>
      <svg viewBox="0 0 540 160" className="plot">
        {rows.map((r, i) => {
          const x = 14 + i * 51.5;
          const isFirst = r.n === firstOk;
          return (
            <g key={r.n}>
              <rect
                x={x}
                y={22}
                width={46}
                height={112}
                rx={8}
                fill={isFirst ? 'rgba(52, 211, 153, 0.25)' : r.ok ? 'rgba(56, 189, 248, 0.12)' : 'rgba(248, 113, 113, 0.1)'}
                stroke={isFirst ? '#34d399' : r.ok ? '#38bdf8' : 'rgba(248,113,113,0.45)'}
                strokeWidth={isFirst ? 2.2 : 1.1}
              />
              <text x={x + 23} y={44} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>
                n={r.n}
              </text>
              <text x={x + 23} y={76} textAnchor="middle" fill="#e2e8f0" fontSize={9.5}>
                {r.bound < 0.001 ? r.bound.toExponential(0) : r.bound.toFixed(3)}
              </text>
              <text x={x + 23} y={114} textAnchor="middle" fill={r.ok ? '#6ee7b7' : '#fca5a5'} fontSize={13} fontWeight={700}>
                {r.ok ? '✓' : '✗'}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="readout">
        A Lagrange-korlát <M_txt>{`M/(n+1)! < 10⁻${expPow}`}</M_txt> először <b>n = {firstOk}</b> fokszámnál teljesül!
      </div>
    </div>
  );
}

function M_txt({ children }: { children: string }) {
  return <span>{children}</span>;
}

/* ------------------------------------------------------------------ 4. Kis szögek közelítése: sin x ≈ x */
export function SmallAngleErrorWidget() {
  const [x, setX] = useState(0.35);
  const actual = Math.abs(Math.sin(x) - x);
  const bound = (x * x * x) / 6;
  const deg = (x * 180) / Math.PI;

  const W = 540;
  const H = 215;
  const xMax = 1.2;
  const yMax = 0.3;
  const padL = 52;
  const padR = 20;
  const padT = 20;
  const padB = 34;
  const X = (v: number) => padL + (v / xMax) * (W - padL - padR);
  const Y = (v: number) => padT + ((yMax - v) / yMax) * (H - padT - padB);

  let dAct = '';
  let dBnd = '';
  for (let i = 0; i <= 100; i++) {
    const xv = (xMax * i) / 100;
    dAct += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(Math.abs(Math.sin(xv) - xv)).toFixed(1)} `;
    dBnd += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(Math.min(yMax, (xv * xv * xv) / 6)).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">A sin x ≈ x közelítés valódi hibája vs. a |x|³/6 elméleti felső korlát</div>
      <div className="wcontrols">
        <label>
          Szög <b>x = {x.toFixed(2)} rad</b> ({deg.toFixed(1)}°)
          <input type="range" min={0.05} max={1.15} step={0.05} value={x} onChange={(e) => setX(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} className="ax" />
        <path d={dBnd} fill="none" stroke="#fb923c" strokeWidth={2.2} strokeDasharray="5 4" />
        <path d={dAct} fill="none" stroke="#38bdf8" strokeWidth={2.6} />
        <line x1={X(x)} y1={Y(0)} x2={X(x)} y2={Y(Math.min(yMax, bound))} stroke="#fbbf24" strokeDasharray="3 3" />
        <circle cx={X(x)} cy={Y(actual)} r={4.5} fill="#38bdf8" />
        <circle cx={X(x)} cy={Y(Math.min(yMax, bound))} r={4.5} fill="#fb923c" />
        <text x={padL + 10} y={padT + 16} fill="#fb923c" fontSize={11}>-- Felső korlát: |x|³/6</text>
        <text x={padL + 10} y={padT + 32} fill="#38bdf8" fontSize={11}>— Valódi hiba: |sin x − x|</text>
        <text x={X(x)} y={H - 12} textAnchor="middle" fill="#fbbf24" fontSize={11}>x = {x.toFixed(2)}</text>
      </svg>
      <div className="readout">
        Valódi hiba = <b>{actual.toFixed(5)}</b> ≤ felső korlát |x|³/6 = <b>{bound.toFixed(5)}</b> (még 20°-nál is
        kisebb mint 0,007!).
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Páratlan/páros „ingyen fokszám” diagram */
export function EvenOddZeroTermDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">A „bónusz fokszám” trükk: miért |x|³/6 a sin x ≈ x hibája, nem |x|²/2?</div>
      <svg viewBox="0 0 540 135" className="plot">
        <rect x={14} y={16} width={160} height={100} rx={10} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={94} y={40} textAnchor="middle" fill="#7dd3fc" fontSize={12} fontWeight={700}>P₁(x) = x</text>
        <text x={94} y={64} textAnchor="middle" fill="#cbd5e1" fontSize={11}>Naiv n = 1 korlát:</text>
        <text x={94} y={86} textAnchor="middle" fill="#fb923c" fontSize={12.5} fontWeight={700}>|R₁| ≤ |x|² / 2!</text>

        <text x={196} y={70} textAnchor="middle" fill="#34d399" fontSize={18} fontWeight={700}>⇒</text>

        <rect x={218} y={16} width={308} height={100} rx={10} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.6} />
        <text x={372} y={40} textAnchor="middle" fill="#6ee7b7" fontSize={12} fontWeight={700}>
          Mivel f″(0) = −sin 0 = 0, valójában P₁(x) ≡ P₂(x)!
        </text>
        <text x={372} y={66} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>
          Használhatjuk az n = 2 maradéktagot:
        </text>
        <text x={372} y={92} textAnchor="middle" fill="#fbbf24" fontSize={13.5} fontWeight={700}>
          |R₂(x)| ≤ 1 · |x|³ / 3! = |x|³ / 6   (sokkal élesebb!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Lagrange vs. Leibniz hibabecslés */
export function LagrangeVsLeibnizWidget() {
  const [caseId, setCaseId] = useState<'sin' | 'ln'>('sin');
  const x = caseId === 'sin' ? 0.8 : 0.3;
  // sin(0.8) P3 = x - x^3/6: next term x^5/120 (Leibniz), Lagrange R4 = x^5/120 (ugyanaz, mert M=1!)
  // ln(1.3) P3 = x - x^2/2 + x^3/3: Leibniz = x^4/4, Lagrange = M*x^4/4! ahol f^(4)(t) = -6/(1+t)^4 <= 6 => 6*x^4/24 = x^4/4
  // Nézzük ln(1.3) vs sin(0.8) P2-re, vagy mutassuk meg a tényleges hibát vs korlátokat!
  const actual =
    caseId === 'sin'
      ? Math.abs(Math.sin(x) - (x - Math.pow(x, 3) / 6))
      : Math.abs(Math.log(1 + x) - (x - (x * x) / 2 + Math.pow(x, 3) / 3));
  const leibniz = caseId === 'sin' ? Math.pow(x, 5) / 120 : Math.pow(x, 4) / 4;
  // Lagrange naiv (ha n=3-at használunk sin-nél, M=1 => x^4/24; okosan n=4 => x^5/120)
  const lagrangeNaive = caseId === 'sin' ? Math.pow(x, 4) / 24 : Math.pow(x, 4) / 4;
  const maxB = Math.max(actual, leibniz, lagrangeNaive) * 1.15;

  const bars = [
    { label: 'Valódi hiba |f − P₃|', val: actual, color: '#38bdf8' },
    { label: 'Leibniz-korlát (első elhagyott tag)', val: leibniz, color: '#34d399' },
    { label: caseId === 'sin' ? 'Lagrange-korlát (n = 3: |x|⁴/24)' : 'Lagrange-korlát (M = 6: 6|x|⁴/4!)', val: lagrangeNaive, color: '#fbbf24' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">Két hibabecslés összehasonlítása: Leibniz vs. Lagrange (P₃ közelítésnél)</div>
      <div className="relbuttons chips">
        <button className={caseId === 'sin' ? 'on' : ''} onClick={() => setCaseId('sin')}>
          sin(0,8) ≈ x − x³/6
        </button>
        <button className={caseId === 'ln' ? 'on' : ''} onClick={() => setCaseId('ln')}>
          ln(1,3) ≈ x − x²/2 + x³/3
        </button>
      </div>
      <svg viewBox="0 0 540 150" className="plot">
        {bars.map((b, i) => {
          const y = 20 + i * 42;
          const w = Math.max(8, (b.val / maxB) * 320);
          return (
            <g key={b.label}>
              <text x={14} y={y + 10} fill="#cbd5e1" fontSize={11.5}>{b.label}</text>
              <rect x={14} y={y + 16} width={w} height={14} rx={5} fill={b.color} opacity={0.8} />
              <text x={14 + w + 8} y={y + 27} fill={b.color} fontSize={11.5} fontWeight={700}>
                {b.val.toFixed(5)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="readout">
        Alternáló sornál a <b>Leibniz-korlát</b> szuper gyors és éles; ha viszont a sor <b>nem alternál</b> (pl.{' '}
        <M_txt>eˣ</M_txt> pozitív x-re), akkor a <b>Lagrange-maradéktag</b> az egyetlen biztos fegyver!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Taylor tételének bizonyítási útja */
export function TaylorProofDiagram() {
  const steps = [
    { t: '1. Newton–Leibniz', f: 'f(x) = f(a) + ∫ₐˣ f′(t) dt', c: '#38bdf8' },
    { t: '2. Parciális integrálás', f: 'u = f′(t),  dv = dt  (v = t − x!)', c: '#2dd4bf' },
    { t: '3. n-szeri ismétlés', f: 'Rₙ(x) = (1/n!) ∫ₐˣ (x − t)ⁿ f⁽ⁿ⁺¹⁾(t) dt', c: '#34d399' },
    { t: '4. Középértéktétel', f: 'Rₙ(x) = f⁽ⁿ⁺¹⁾(c) · (x − a)ⁿ⁺¹ / (n+1)!', c: '#fbbf24' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">Hogyan bizonyítható Taylor tétele? — A parciális integrálás láncreakciója</div>
      <svg viewBox="0 0 540 205" className="plot">
        {steps.map((s, i) => {
          const y = 12 + i * 48;
          return (
            <g key={s.t}>
              <rect x={18} y={y} width={504} height={36} rx={9} fill="rgba(255,255,255,0.04)" stroke={s.c} strokeWidth={1.4} />
              <text x={32} y={y + 22} fill={s.c} fontSize={12} fontWeight={700}>{s.t}</text>
              <text x={208} y={y + 22} fill="#e2e8f0" fontSize={12} fontWeight={600}>{s.f}</text>
              {i < steps.length - 1 && (
                <text x={270} y={y + 47} textAnchor="middle" fill="#64748b" fontSize={11}>↓</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. 11.9 hibabecslési döntési térkép */
export function ErrorStrategyDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">Hibabecslési iránytű: melyik képletet vedd elő?</div>
      <svg viewBox="0 0 540 180" className="plot">
        <rect x={14} y={18} width={246} height={144} rx={12} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.6} />
        <text x={137} y={42} textAnchor="middle" fill="#6ee7b7" fontSize={13} fontWeight={700}>
          Alternáló sor (Leibniz)
        </text>
        <text x={28} y={68} fill="#e2e8f0" fontSize={11.5}>Mikor? Előjelváltás + uₙ ↓ 0</text>
        <text x={28} y={92} fill="#fbbf24" fontSize={12} fontWeight={700}>|Rₙ| ≤ |első elhagyott tag|</text>
        <text x={28} y={118} fill="#94a3b8" fontSize={11}>Pl.: sin x, cos x, ln(1+x) (x&gt;0),</text>
        <text x={28} y={136} fill="#94a3b8" fontSize={11}>arctg x, e⁻ˣ (x &gt; 0)</text>

        <rect x={280} y={18} width={246} height={144} rx={12} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={403} y={42} textAnchor="middle" fill="#7dd3fc" fontSize={13} fontWeight={700}>
          Általános (Lagrange-maradék)
        </text>
        <text x={294} y={68} fill="#e2e8f0" fontSize={11.5}>Mikor? Mindig működik!</text>
        <text x={294} y={92} fill="#fbbf24" fontSize={12} fontWeight={700}>|Rₙ| ≤ M · |x − a|ⁿ⁺¹ / (n+1)!</text>
        <text x={294} y={118} fill="#94a3b8" fontSize={11}>ahol M = max |f⁽ⁿ⁺¹⁾(t)|</text>
        <text x={294} y={136} fill="#94a3b8" fontSize={11}>a és x között (pl. eˣ, x &gt; 0)</text>
      </svg>
    </div>
  );
}
