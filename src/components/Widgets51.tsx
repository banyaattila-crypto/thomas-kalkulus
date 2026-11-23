import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: Téglalap-közelítések (Lₙ, Rₙ, Mₙ) */

type MethodId = 'left' | 'right' | 'mid';

export function RiemannRectsWidget() {
  const [fnId, setFnId] = useState<'dec' | 'inc'>('dec');
  const [method, setMethod] = useState<MethodId>('mid');
  const [n, setN] = useState(6);

  const isDec = fnId === 'dec';
  // dec: f(x) = 1 - x² az [0, 1]-en (pontos = 2/3)
  // inc: f(x) = x² az [0, 1]-en (pontos = 1/3)
  const f = isDec ? (x: number) => 1 - x * x : (x: number) => x * x;
  const exact = isDec ? 2 / 3 : 1 / 3;
  const dx = 1 / n;

  const rects = Array.from({ length: n }, (_, k) => {
    const xL = k * dx;
    const xR = (k + 1) * dx;
    const sample = method === 'left' ? xL : method === 'right' ? xR : (xL + xR) / 2;
    return { xL, xR, h: f(sample) };
  });
  const approx = rects.reduce((s, r) => s + r.h * dx, 0);
  const err = Math.abs(approx - exact);

  return (
    <div className="widget">
      <div className="widget-title">Görbe alatti terület közelítése téglalapokkal az [0; 1] intervallumon</div>
      <div className="relbuttons chips">
        <button className={isDec ? 'on' : ''} onClick={() => setFnId('dec')}>f(x) = 1 − x² (pontos: 2/3)</button>
        <button className={!isDec ? 'on' : ''} onClick={() => setFnId('inc')}>f(x) = x² (pontos: 1/3)</button>
      </div>
      <div className="relbuttons chips">
        <button className={method === 'left' ? 'on' : ''} onClick={() => setMethod('left')}>Bal végpont (Lₙ)</button>
        <button className={method === 'mid' ? 'on' : ''} onClick={() => setMethod('mid')}>Középpont (Mₙ)</button>
        <button className={method === 'right' ? 'on' : ''} onClick={() => setMethod('right')}>Jobb végpont (Rₙ)</button>
      </div>
      <label>
        téglalapok száma: n = {n} (szélesség: Δx = 1/{n} ≈ {round(dx, 3)})
        <input type="range" min={2} max={32} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <Plane xmin={-0.15} xmax={1.15} ymin={-0.15} ymax={1.15}>
        {(m) => (
          <>
            {rects.map((r, i) => (
              <rect
                key={i}
                x={m.X(r.xL)}
                y={m.Y(Math.max(0, r.h))}
                width={Math.max(0, m.X(r.xR) - m.X(r.xL))}
                height={Math.max(0, m.Y(0) - m.Y(Math.max(0, r.h)))}
                fill={method === 'mid' ? 'rgba(52, 211, 153, 0.28)' : 'rgba(56, 189, 248, 0.26)'}
                stroke={method === 'mid' ? '#34d399' : '#38bdf8'}
                strokeWidth={1.2}
              />
            ))}
            <PFunc map={m} fn={f} from={0} to={1} cls="pl-alt" />
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={`\\text{Közelítés} = ${tx(approx, 5)}, \\quad \\text{Pontos} = ${tx(exact, 5)}, \\quad \\text{Hiba} = ${tx(err, 5)}`}
        />
        <p>
          Növeld <M t="n" />-t 32-re, és válts a <strong>Középpont (<M t="M_n" />)</strong> módra: láthatod, mennyivel gyorsabban eltűnik a hiba!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Felső és alsó összeg különbsége */

export function UpperLowerDiffWidget() {
  const [n, setN] = useState(5);
  // f(x) = x²/2 az [0, 2]-n (f(0)=0, f(2)=2) → pontos = 4/3
  const f = (x: number) => 0.5 * x * x;
  const dx = 2 / n;
  const rects = Array.from({ length: n }, (_, k) => ({
    xL: k * dx,
    xR: (k + 1) * dx,
    hLo: f(k * dx),
    hHi: f((k + 1) * dx),
  }));
  const L = rects.reduce((s, r) => s + r.hLo * dx, 0);
  const R = rects.reduce((s, r) => s + r.hHi * dx, 0);
  const diff = R - L; // = (f(2)-f(0)) * dx = 2 * (2/n) = 4/n

  return (
    <div className="widget">
      <div className="widget-title">A hibakorlát geometriája: Rₙ − Lₙ = (f(b) − f(a)) · Δx = 4 / n</div>
      <label>
        felosztás: n = {n} (Δx = {round(dx, 3)})
        <input type="range" min={2} max={20} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <Plane xmin={-0.3} xmax={2.4} ymin={-0.3} ymax={2.4}>
        {(m) => (
          <>
            {rects.map((r, i) => (
              <g key={i}>
                {/* Alsó téglalap */}
                <rect
                  x={m.X(r.xL)}
                  y={m.Y(r.hLo)}
                  width={m.X(r.xR) - m.X(r.xL)}
                  height={m.Y(0) - m.Y(r.hLo)}
                  fill="rgba(52, 211, 153, 0.25)"
                  stroke="#34d399"
                  strokeWidth={1.1}
                />
                {/* Különbség téglalap (felső - alsó) */}
                <rect
                  x={m.X(r.xL)}
                  y={m.Y(r.hHi)}
                  width={m.X(r.xR) - m.X(r.xL)}
                  height={m.Y(r.hLo) - m.Y(r.hHi)}
                  fill="rgba(251, 146, 60, 0.35)"
                  stroke="#fb923c"
                  strokeWidth={1.2}
                />
              </g>
            ))}
            <PFunc map={m} fn={f} from={0} to={2} cls="pl-main" />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`L_{${n}} = ${tx(L, 4)} \\le \\frac{4}{3} \\le R_{${n}} = ${tx(R, 4)}, \\qquad R_{${n}} - L_{${n}} = ${tx(diff, 4)} = \\frac{4}{${n}}`} />
        <p>
          Ha a narancssárga téglalapokat mind jobbra tolod az <M t="x=2" /> falhoz, <strong>egyetlen <M t="\Delta x" /> széles, <M t="f(2)-f(0)=2" /> magas oszlopba</strong> állnak össze!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: Megtett út sebességből */

export function VelocityDistanceWidget() {
  const [n, setN] = useState(4);
  // Fékező autó: v(t) = 24 - 3t, t ∈ [0, 8] s → pontos megtett út = 24*8/2 = 96 m
  const v = (t: number) => 24 - 3 * t;
  const dt = 8 / n;
  let upper = 0;
  let lower = 0;
  for (let k = 0; k < n; k++) {
    upper += v(k * dt) * dt; // csökkenő v miatt bal = felső
    lower += v((k + 1) * dt) * dt; // jobb = alsó
  }

  return (
    <div className="widget">
      <div className="widget-title">Fékező autó megtett útja: v(t) = 24 − 3t (t ∈ [0; 8] s, pontos út: 96 m)</div>
      <label>
        mérési időközök száma: n = {n} (Δt = {round(dt, 2)} s)
        <input type="range" min={2} max={24} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 160" className="plane" role="img" aria-label="Sebesség-idő görbe és téglalapok">
        <rect width={540} height={160} className="pl-bg" />
        <line x1={45} y1={135} x2={345} y2={135} stroke="#94a3b8" strokeWidth={1.6} />
        <line x1={45} y1={18} x2={45} y2={135} stroke="#94a3b8" strokeWidth={1.6} />
        {Array.from({ length: n }, (_, k) => {
          const x1 = 45 + (k / n) * 290;
          const w = 290 / n;
          const hUp = (v(k * dt) / 24) * 110;
          const hLo = (v((k + 1) * dt) / 24) * 110;
          return (
            <g key={k}>
              <rect x={x1} y={135 - hUp} width={w} height={hUp} fill="rgba(251, 146, 60, 0.22)" stroke="#fb923c" strokeWidth={1} />
              <rect x={x1} y={135 - hLo} width={w} height={hLo} fill="rgba(52, 211, 153, 0.28)" stroke="#34d399" strokeWidth={1} />
            </g>
          );
        })}
        <line x1={45} y1={25} x2={335} y2={135} stroke="#38bdf8" strokeWidth={2.6} />
        <text x={38} y={28} textAnchor="end" fill="#94a3b8" fontSize={11}>24</text>
        <text x={335} y={150} textAnchor="middle" fill="#94a3b8" fontSize={11}>8 s</text>
        {/* Jobb oldali összegző */}
        <rect x={360} y={20} width={166} height={115} rx={10} fill="rgba(255,255,255,0.04)" stroke="#38bdf8" strokeWidth={1.4} />
        <text x={374} y={44} fill="#fb923c" fontSize={12} fontWeight={700}>Felső (Lₙ): {round(upper, 1)} m</text>
        <text x={374} y={70} fill="#38bdf8" fontSize={13} fontWeight={700}>Pontos út: 96,0 m</text>
        <text x={374} y={96} fill="#34d399" fontSize={12} fontWeight={700}>Alsó (Rₙ): {round(lower, 1)} m</text>
        <text x={374} y={120} fill="#94a3b8" fontSize={10.5}>Eltérés: ±{round((upper - lower) / 2, 1)} m</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Félgömb térfogata hengerkorongokkal */

export function CylinderSlicesWidget() {
  const [n, setN] = useState(5);
  const dx = 1 / n;
  let vol = 0;
  const slices = Array.from({ length: n }, (_, k) => {
    const mid = (k + 0.5) * dx;
    const r = Math.sqrt(Math.max(0, 1 - mid * mid));
    vol += Math.PI * r * r * dx;
    return { y0: k * dx, y1: (k + 1) * dx, r };
  });
  const exact = (2 / 3) * Math.PI;

  const cx = 155;
  const bot = 165;
  const Rpx = 125;

  return (
    <div className="widget">
      <div className="widget-title">Egységnyi sugarú félgömb (R = 1) szeletelése n középponti hengerkorongra</div>
      <label>
        korongok száma: n = {n} (szeletvastagság: Δy = {round(dx, 3)})
        <input type="range" min={2} max={20} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 185" className="plane" role="img" aria-label="Félgömb szeletelése korongokra">
        <rect width={540} height={185} className="pl-bg" />
        {slices.map((s, i) => (
          <rect
            key={i}
            x={cx - s.r * Rpx}
            y={bot - s.y1 * Rpx}
            width={2 * s.r * Rpx}
            height={(s.y1 - s.y0) * Rpx}
            fill="rgba(56, 189, 248, 0.28)"
            stroke="#38bdf8"
            strokeWidth={1.3}
          />
        ))}
        {/* Félkör ív */}
        <path
          d={`M ${cx - Rpx} ${bot} A ${Rpx} ${Rpx} 0 0 1 ${cx + Rpx} ${bot}`}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={2.4}
        />
        <line x1={cx - Rpx - 10} y1={bot} x2={cx + Rpx + 10} y2={bot} stroke="#94a3b8" strokeWidth={1.5} />
        {/* Jobb oldal */}
        <rect x={310} y={28} width={212} height={125} rx={10} fill="rgba(255,255,255,0.04)" stroke="#fbbf24" strokeWidth={1.4} />
        <text x={324} y={56} fill="#94a3b8" fontSize={11.5}>Korongok össztérfogata:</text>
        <text x={324} y={84} fill="#38bdf8" fontSize={20} fontWeight={700}>{round(vol, 4)}</text>
        <text x={324} y={114} fill="#cbd5e1" fontSize={12}>Pontos (⅔π): {round(exact, 4)}</text>
        <text x={324} y={138} fill="#34d399" fontSize={11.5}>Eltérés: {round(Math.abs(vol - exact), 4)}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Függvény átlagértéke */

export function AverageValueWidget() {
  const [kind, setKind] = useState<'quad' | 'sin'>('sin');
  const isSin = kind === 'sin';
  const f = isSin ? (x: number) => Math.sin(x) : (x: number) => 0.5 * x * x;
  const b = isSin ? Math.PI : 2;
  const avg = isSin ? 2 / Math.PI : 2 / 3;

  return (
    <div className="widget">
      <div className="widget-title">A függvény átlagértéke = az azonos területű téglalap magassága</div>
      <div className="relbuttons chips">
        <button className={isSin ? 'on' : ''} onClick={() => setKind('sin')}>f(x) = sin x az [0; π]-n (átlag: 2/π ≈ 0,637)</button>
        <button className={!isSin ? 'on' : ''} onClick={() => setKind('quad')}>f(x) = ½x² az [0; 2]-n (átlag: 2/3 ≈ 0,667)</button>
      </div>
      <Plane xmin={-0.3} xmax={isSin ? 3.5 : 2.5} ymin={-0.3} ymax={isSin ? 1.4 : 2.3}>
        {(m) => (
          <>
            <rect
              x={m.X(0)}
              y={m.Y(avg)}
              width={m.X(b) - m.X(0)}
              height={m.Y(0) - m.Y(avg)}
              fill="rgba(52, 211, 153, 0.22)"
              stroke="#34d399"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            <PFunc map={m} fn={f} from={0} to={b} cls="pl-main" />
            <text x={m.X(b / 2)} y={m.Y(avg) - 8} textAnchor="middle" fill="#34d399" className="pl-label">
              átlag = {round(avg, 3)}
            </text>
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          A zöld téglalap területe <strong>pontosan megegyezik</strong> a kék görbe alatti területtel: ha „elsimítanád” a görbe alatti homokot, pontosan az <M t={`y = ${tx(avg, 3)}`} /> magasságban állna meg!
        </p>
      </div>
    </div>
  );
}
