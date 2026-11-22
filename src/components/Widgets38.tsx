import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PLine, PPoint } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: Linearizáció és nagyítás */

type CurveOpt = {
  id: string;
  label: string;
  f: (x: number) => number;
  df: (x: number) => number;
  a: number;
  aTex: string;
  fTex: string;
  lTex: string;
};

const CURVES: CurveOpt[] = [
  {
    id: 'sqrt',
    label: 'f(x) = √x  (a = 4)',
    f: (x) => (x >= 0 ? Math.sqrt(x) : NaN),
    df: (x) => 1 / (2 * Math.sqrt(x)),
    a: 4,
    aTex: '4',
    fTex: '\\sqrt{x}',
    lTex: '2 + \\tfrac{1}{4}(x-4)',
  },
  {
    id: 'sin',
    label: 'f(x) = sin x  (a = 0)',
    f: (x) => Math.sin(x),
    df: (x) => Math.cos(x),
    a: 0,
    aTex: '0',
    fTex: '\\sin x',
    lTex: 'x',
  },
  {
    id: 'quad',
    label: 'f(x) = x²/2  (a = 1)',
    f: (x) => 0.5 * x * x,
    df: (x) => x,
    a: 1,
    aTex: '1',
    fTex: '\\tfrac{1}{2}x^2',
    lTex: '0{,}5 + (x-1)',
  },
];

export function LinearizationZoomWidget() {
  const [cid, setCid] = useState('sqrt');
  const [dx, setDx] = useState(0.4);
  const [span, setSpan] = useState(3);

  const cur = CURVES.find((c) => c.id === cid) ?? CURVES[0];
  const a = cur.a;
  const fa = cur.f(a);
  const dfa = cur.df(a);
  const x = a + dx;
  const fx = cur.f(x);
  const lx = fa + dfa * dx;
  const err = Math.abs(fx - lx);

  return (
    <div className="widget">
      <div className="widget-title">Lokális linearitás: közelről a görbe és az érintő összeolvad</div>
      <div className="relbuttons chips">
        {CURVES.map((c) => (
          <button key={c.id} className={cid === c.id ? 'on' : ''} onClick={() => { setCid(c.id); setDx(0.4); }}>
            {c.label}
          </button>
        ))}
      </div>
      <label>
        eltérés az érintési ponttól: x − a = {round(dx, 2)} (x = {round(x, 2)})
        <input type="range" min={-1.5} max={1.5} step={0.05} value={dx} onChange={(e) => setDx(Number(e.target.value))} />
      </label>
      <label>
        ablak mérete (nagyítás): ±{round(span, 2)} egység
        <input type="range" min={0.4} max={3.5} step={0.1} value={span} onChange={(e) => setSpan(Number(e.target.value))} />
      </label>
      <Plane xmin={a - span} xmax={a + span} ymin={fa - span * 0.65} ymax={fa + span * 0.65}>
        {(m) => (
          <>
            <PFunc map={m} fn={cur.f} cls="pl-main" />
            <PLine map={m} k={dfa} b={fa - dfa * a} cls="pl-alt" />
            <line x1={m.X(x)} y1={m.Y(fx)} x2={m.X(x)} y2={m.Y(lx)} stroke="#f87171" strokeWidth={3} />
            <PPoint map={m} x={a} y={fa} color="#34d399" label={`a = ${cur.aTex}`} dy={18} dx={8} />
            <PPoint map={m} x={x} y={fx} color="#38bdf8" label="f(x)" dx={8} dy={-8} />
            <PPoint map={m} x={x} y={lx} color="#fb923c" label="L(x)" dx={-34} dy={14} />
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={`L(x) = ${cur.lTex}, \\quad f(${tx(x, 2)}) = ${tx(fx, 4)}, \\quad L(${tx(x, 2)}) = ${tx(lx, 4)}, \\quad |f(x)-L(x)| = ${tx(err, 4)}`}
        />
        <p>
          Húzd a nagyítást <M t="\pm 0{,}4" /> felé, vagy vidd <M t="x" />-et közel <M t="a" />-hoz: a piros hibaszakasz szinte eltűnik!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Binomiális közelítés (1+x)^k ≈ 1+kx */

const K_OPTS = [-2, -1, -0.5, 0.5, 2, 3];

export function BinomialApproxWidget() {
  const [k, setK] = useState(0.5);
  const [x, setX] = useState(0.1);

  const exact = Math.pow(1 + x, k);
  const lin = 1 + k * x;
  const absErr = Math.abs(exact - lin);
  const relPct = exact !== 0 ? (absErr / Math.abs(exact)) * 100 : 0;
  const barW = Math.min(100, relPct * 4);

  return (
    <div className="widget">
      <div className="widget-title">A binomiális közelítés próbája: (1 + x)ᵏ ≈ 1 + kx</div>
      <div className="relbuttons chips">
        {K_OPTS.map((kv) => (
          <button key={kv} className={k === kv ? 'on' : ''} onClick={() => setK(kv)}>
            k = {round(kv, 1)}
          </button>
        ))}
      </div>
      <label>
        kis eltérés: x = {round(x, 2)}
        <input type="range" min={-0.4} max={0.4} step={0.02} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 96" className="plane" role="img" aria-label="Pontosság összehasonlítás">
        <rect width={540} height={96} className="pl-bg" />
        <text x={20} y={28} fill="#38bdf8" className="pl-label">Pontos érték (1 + x)ᵏ = {round(exact, 5)}</text>
        <text x={20} y={52} fill="#fb923c" className="pl-label">Lineáris közelítés 1 + kx = {round(lin, 5)}</text>
        <text x={20} y={78} fill="#e2e8f0" fontSize={12}>Relatív hiba: {round(relPct, 3)}%</text>
        <rect x={180} y={66} width={330} height={14} rx={7} fill="rgba(255,255,255,0.08)" />
        <rect
          x={180}
          y={66}
          width={(barW / 100) * 330}
          height={14}
          rx={7}
          fill={relPct < 1 ? '#34d399' : relPct < 5 ? '#fbbf24' : '#f87171'}
        />
      </svg>
      <div className="result">
        <M block t={`(1 ${x >= 0 ? '+' : ''} ${tx(x, 2)})^{${tx(k, 1)}} = ${tx(exact, 5)} \\;\\approx\\; 1 + (${tx(k, 1)})(${tx(x, 2)}) = ${tx(lin, 5)}`} />
        <p>
          Figyeld meg: ha <M t="|x|\le 0{,}1" />, a relatív hiba jellemzően <strong>1% alatt</strong> marad — nagy <M t="|x|" />-nél viszont gyorsan romlik!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: dy és Δy geometriája */

export function DifferentialGeometryWidget() {
  const [dx, setDx] = useState(1.2);
  const f = (t: number) => 0.25 * t * t + 0.5;
  const df = (t: number) => 0.5 * t;

  const x0 = 2;
  const y0 = f(x0); // 1.5
  const m0 = df(x0); // 1
  const x1 = x0 + dx;
  const y1 = f(x1);
  const yTan = y0 + m0 * dx;
  const dy = m0 * dx;
  const dY = y1 - y0;
  const err = dY - dy;

  return (
    <div className="widget">
      <div className="widget-title">A differenciál (dy) és a tényleges változás (Δy) különbsége</div>
      <label>
        lépésköz: dx = Δx = {round(dx, 2)} (f(x) = ¼x² + 0,5, x₀ = 2)
        <input type="range" min={0.2} max={2.4} step={0.1} value={dx} onChange={(e) => setDx(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={5.5} ymin={0} ymax={5.5}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} cls="pl-main" />
            <PLine map={m} k={m0} b={y0 - m0 * x0} cls="pl-alt" />
            {/* dx vízszintes */}
            <line x1={m.X(x0)} y1={m.Y(y0)} x2={m.X(x1)} y2={m.Y(y0)} stroke="#34d399" strokeWidth={2.5} />
            {/* dy az érintőig */}
            <line x1={m.X(x1)} y1={m.Y(y0)} x2={m.X(x1)} y2={m.Y(yTan)} stroke="#fb923c" strokeWidth={3} />
            {/* Δy - dy hiba a görbéig */}
            <line x1={m.X(x1)} y1={m.Y(yTan)} x2={m.X(x1)} y2={m.Y(y1)} stroke="#f87171" strokeWidth={3} />
            <PPoint map={m} x={x0} y={y0} color="#34d399" label="P(2; 1,5)" dx={-58} dy={-10} />
            <PPoint map={m} x={x1} y={yTan} color="#fb923c" label="érintő" dx={8} dy={14} />
            <PPoint map={m} x={x1} y={y1} color="#38bdf8" label="görbe" dx={8} dy={-8} />
            <text x={m.X((x0 + x1) / 2)} y={m.Y(y0) + 18} textAnchor="middle" fill="#34d399" className="pl-label">
              dx = {round(dx, 1)}
            </text>
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={`dy = f'(2)\\,dx = ${tx(dy, 3)}, \\quad \\Delta y = f(2+dx)-f(2) = ${tx(dY, 3)}, \\quad \\Delta y - dy = ${tx(err, 3)}`}
        />
        <p>
          Narancs: az érintő emelkedése (<M t="dy" />). Piros: a közelítési hiba (<M t="\Delta y - dy = \frac{1}{4}(dx)^2" />). Ha <M t="dx" />-et felezed, a hiba <strong>negyedére</strong> csökken!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Derivált ↔ Differenciál séma */

export function DifferentialFlowDiagram() {
  const rows = [
    { name: 'Konstansszoros', der: '(cu)′ = c·u′', dif: 'd(cu) = c·du', c: '#38bdf8' },
    { name: 'Összeg / különbség', der: '(u ± v)′ = u′ ± v′', dif: 'd(u ± v) = du ± dv', c: '#38bdf8' },
    { name: 'Szorzatszabály', der: '(uv)′ = u′v + uv′', dif: 'd(uv) = v·du + u·dv', c: '#34d399' },
    { name: 'Hányadosszabály', der: '(u/v)′ = (u′v − uv′)/v²', dif: 'd(u/v) = (v·du − u·dv)/v²', c: '#34d399' },
    { name: 'Hatvány / lánc', der: '(uⁿ)′ = n·uⁿ⁻¹·u′', dif: 'd(uⁿ) = n·uⁿ⁻¹·du', c: '#fb923c' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">Deriválási szabályok differenciál-alakban (szorozz meg dx-szel!)</div>
      <svg viewBox="0 0 540 190" className="plane" role="img" aria-label="Derivált és differenciál alakok összehasonlítása">
        <rect width={540} height={190} className="pl-bg" />
        <text x={20} y={24} fill="#94a3b8" fontSize={11.5} fontWeight={700}>SZABÁLY</text>
        <text x={175} y={24} fill="#94a3b8" fontSize={11.5} fontWeight={700}>DERIVÁLT-ALAK</text>
        <text x={355} y={24} fill="#fbbf24" fontSize={11.5} fontWeight={700}>DIFFERENCIÁL-ALAK</text>
        <line x1={16} y1={32} x2={524} y2={32} stroke="rgba(255,255,255,0.12)" />
        {rows.map((r, i) => {
          const y = 55 + i * 30;
          return (
            <g key={r.name}>
              <rect x={16} y={y - 17} width={508} height={24} rx={6} fill={i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent'} />
              <text x={22} y={y} fill={r.c} fontSize={11.5} fontWeight={600}>{r.name}</text>
              <text x={175} y={y} fill="#cbd5e1" fontSize={12}>{r.der}</text>
              <text x={335} y={y} fill="#64748b" fontSize={12}>→</text>
              <text x={355} y={y} fill="#fde68a" fontSize={12} fontWeight={600}>{r.dif}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Hibaterjedés (kör / gömb) */

type ShapeId = 'circle' | 'sphereV';

export function ErrorPropagationWidget() {
  const [shape, setShape] = useState<ShapeId>('circle');
  const [pct, setPct] = useState(2); // % hiba r-ben

  const r = 10; // cm
  const dr = (r * pct) / 100;
  const isCircle = shape === 'circle';
  const power = isCircle ? 2 : 3;
  const q0 = isCircle ? Math.PI * r * r : (4 / 3) * Math.PI * r * r * r;
  const q1 = isCircle ? Math.PI * (r + dr) ** 2 : (4 / 3) * Math.PI * (r + dr) ** 3;
  const exactDelta = q1 - q0;
  const diffEst = isCircle ? 2 * Math.PI * r * dr : 4 * Math.PI * r * r * dr;
  const exactPct = (exactDelta / q0) * 100;
  const approxPct = power * pct;

  const Rpx = 68;
  const dRpx = Math.max(3, (pct / 5) * 18);

  return (
    <div className="widget">
      <div className="widget-title">Hibaterjedés: hányszorosára nő a százalékos mérési hiba?</div>
      <div className="relbuttons chips">
        <button className={isCircle ? 'on' : ''} onClick={() => setShape('circle')}>
          Kör területe (A = πr², 2×)
        </button>
        <button className={!isCircle ? 'on' : ''} onClick={() => setShape('sphereV')}>
          Gömb térfogata (V = ⁴⁄₃πr³, 3×)
        </button>
      </div>
      <label>
        a sugár mérési hibája: dr / r = {round(pct, 1)}% (r = 10 cm, dr = {round(dr, 2)} cm)
        <input type="range" min={0.5} max={5} step={0.5} value={pct} onChange={(e) => setPct(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 360 195" className="plane" role="img" aria-label="Hibagyűrű szemléltetése">
        <rect width={360} height={195} className="pl-bg" />
        {/* Külső hibagyűrű */}
        <circle cx={115} cy={98} r={Rpx + dRpx} fill="rgba(251, 146, 60, 0.28)" stroke="#fb923c" strokeWidth={1.8} strokeDasharray="5 3" />
        {/* Eredeti kör/gömb */}
        <circle cx={115} cy={98} r={Rpx} fill="rgba(56, 189, 248, 0.22)" stroke="#38bdf8" strokeWidth={2.2} />
        <line x1={115} y1={98} x2={115 + Rpx} y2={98} stroke="#e2e8f0" strokeWidth={1.8} />
        <line x1={115 + Rpx} y1={98} x2={115 + Rpx + dRpx} y2={98} stroke="#fb923c" strokeWidth={3} />
        <text x={115 + Rpx / 2} y={92} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>r = 10</text>
        <text x={115 + Rpx + dRpx + 6} y={102} fill="#fb923c" fontSize={11.5} fontWeight={700}>+dr</text>
        {/* Jobb oldali összegzés */}
        <text x={225} y={62} fill="#94a3b8" fontSize={11.5}>Differenciális becslés:</text>
        <text x={225} y={84} fill="#fbbf24" fontSize={16} fontWeight={700}>≈ {round(approxPct, 1)}% ({power} × {round(pct, 1)}%)</text>
        <text x={225} y={118} fill="#94a3b8" fontSize={11.5}>Pontos százalékos eltérés:</text>
        <text x={225} y={140} fill="#38bdf8" fontSize={15} fontWeight={700}>{round(exactPct, 2)}%</text>
      </svg>
      <div className="result">
        <M
          block
          t={
            isCircle
              ? `dA = 2\\pi r\\,dr \\approx ${tx(diffEst, 1)}\\;\\text{cm}^2 \\quad (\\Delta A \\approx ${tx(exactDelta, 1)}\\;\\text{cm}^2), \\quad \\frac{dA}{A} = 2\\frac{dr}{r}`
              : `dV = 4\\pi r^2\\,dr \\approx ${tx(diffEst, 1)}\\;\\text{cm}^3 \\quad (\\Delta V \\approx ${tx(exactDelta, 1)}\\;\\text{cm}^3), \\quad \\frac{dV}{V} = 3\\frac{dr}{r}`
          }
        />
      </div>
    </div>
  );
}
