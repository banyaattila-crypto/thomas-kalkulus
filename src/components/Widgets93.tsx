import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PPoint, PSeg } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Euler-lépések geometriája */

export function EulerGeometryDiagram() {
  // y' = y, y(0) = 1 → pontos: e^x; Euler h = 0.5: (0,1) → (0.5, 1.5) → (1, 2.25) → (1.5, 3.375)
  const pts: [number, number][] = [
    [0, 1],
    [0.5, 1.5],
    [1.0, 2.25],
    [1.5, 3.375],
  ];
  return (
    <div className="widget">
      <div className="widget-title">Az Euler-módszer geometriája: érintőszakaszokból épített töröttvonal</div>
      <Plane xmin={-0.2} xmax={1.8} ymin={0.4} ymax={4.8}>
        {(m) => (
          <>
            <PFunc map={m} fn={(x) => Math.exp(x)} from={0} to={1.55} cls="pl-main" />
            {pts.slice(0, -1).map(([x, y], i) => {
              const [nx, ny] = pts[i + 1];
              return (
                <g key={i}>
                  <PSeg map={m} x1={x} y1={y} x2={nx} y2={y} cls="pl-dash2" />
                  <PSeg map={m} x1={nx} y1={y} x2={nx} y2={ny} cls="pl-dash2" />
                  <line x1={m.X(x)} y1={m.Y(y)} x2={m.X(nx)} y2={m.Y(ny)} stroke="#fb923c" strokeWidth={2.8} />
                </g>
              );
            })}
            {pts.map(([x, y], i) => (
              <PPoint key={i} map={m} x={x} y={y} color="#fbbf24" label={`(x${i}; y${i})`} dx={6} dy={14} />
            ))}
            <line x1={m.X(1.5)} y1={m.Y(3.375)} x2={m.X(1.5)} y2={m.Y(Math.exp(1.5))} stroke="#f87171" strokeWidth={2.6} />
            <PPoint map={m} x={1.5} y={Math.exp(1.5)} color="#38bdf8" label="pontos y(x₃)" dx={-86} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          <strong>Kék:</strong> pontos megoldásgörbe. <strong>Narancs:</strong> Euler-töröttvonal (<M t="y_n = y_{n-1} + f(x_{n-1}, y_{n-1})\cdot h" />). <strong>Piros:</strong> a lépések során felhalmozódó hiba!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Interaktív Euler-szimulátor */

export function EulerStepTableWidget() {
  const [eq, setEq] = useState<'thomas' | 'lin'>('thomas');
  const [n, setN] = useState(5);

  const isThomas = eq === 'thomas';
  // thomas: y' = 1 + y, y(0) = 1 → pontos: 2e^x - 1
  // lin:    y' = y - x, y(0) = 2 → pontos: x + 1 + e^x
  const f = isThomas ? (_x: number, y: number) => 1 + y : (x: number, y: number) => y - x;
  const exact = isThomas ? (x: number) => 2 * Math.exp(x) - 1 : (x: number) => x + 1 + Math.exp(x);
  const y0 = isThomas ? 1 : 2;
  const h = 1 / n;

  const pts: [number, number][] = [[0, y0]];
  for (let i = 0; i < n; i++) {
    const [cx, cy] = pts[i];
    pts.push([cx + h, cy + f(cx, cy) * h]);
  }
  const yEnd = pts[pts.length - 1][1];
  const yEx = exact(1);
  const relPct = (Math.abs(yEnd - yEx) / Math.abs(yEx)) * 100;

  return (
    <div className="widget">
      <div className="widget-title">Interaktív Euler-szimulátor az [0; 1] intervallumon</div>
      <div className="relbuttons chips">
        <button className={isThomas ? 'on' : ''} onClick={() => setEq('thomas')}>y′ = 1 + y, y(0) = 1 (Thomas 2. példa)</button>
        <button className={!isThomas ? 'on' : ''} onClick={() => setEq('lin')}>y′ = y − x, y(0) = 2</button>
      </div>
      <div className="relbuttons chips">
        {[2, 4, 5, 10, 20].map((nv) => (
          <button key={nv} className={n === nv ? 'on' : ''} onClick={() => setN(nv)}>
            N = {nv} (h = {round(1 / nv, 2)})
          </button>
        ))}
      </div>
      <Plane xmin={-0.1} xmax={1.15} ymin={0.6} ymax={5.2}>
        {(m) => (
          <>
            <PFunc map={m} fn={exact} from={0} to={1} cls="pl-main" />
            <path
              d={pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${m.X(x).toFixed(1)},${m.Y(y).toFixed(1)}`).join(' ')}
              fill="none"
              stroke="#fb923c"
              strokeWidth={2.5}
            />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={m.X(x)} cy={m.Y(y)} r={n <= 10 ? 3.8 : 2.5} fill="#fbbf24" />
            ))}
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={`\\text{Euler } y(1) \\approx ${tx(yEnd, 4)}, \\quad \\text{Pontos } y(1) = ${tx(yEx, 4)}, \\quad \\text{Relatív hiba: } ${tx(relPct, 2)}\\%`}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Lépésköz-felezés és O(h) hiba */

const H_OPTS = [0.5, 0.25, 0.1, 0.05, 0.025];

export function StepSizeErrorWidget() {
  const [h, setH] = useState(0.1);
  // y' = 1 + y, y(0) = 1 → pontos y(1) = 2e - 1 ≈ 4.43656366
  const steps = Math.round(1 / h);
  let y = 1;
  for (let i = 0; i < steps; i++) y = y + (1 + y) * h;
  const exact = 2 * Math.E - 1;
  const err = Math.abs(exact - y);
  const pct = (err / exact) * 100;
  const barW = Math.min(100, pct * 4);

  return (
    <div className="widget">
      <div className="widget-title">A lépésköz hatása (y′ = 1 + y, y(0) = 1, x = 1): elsőrendű O(h) hiba!</div>
      <div className="relbuttons chips">
        {H_OPTS.map((hv) => (
          <button key={hv} className={h === hv ? 'on' : ''} onClick={() => setH(hv)}>
            h = {round(hv, 3)} ({Math.round(1 / hv)} lépés)
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 94" className="plane" role="img" aria-label="Euler-hiba lépésköz szerint">
        <rect width={540} height={94} className="pl-bg" />
        <text x={20} y={28} fill="#38bdf8" className="pl-label">Pontos y(1) = {round(exact, 5)} &nbsp;|&nbsp; Euler ≈ {round(y, 5)}</text>
        <text x={20} y={54} fill="#fb923c" fontSize={12} fontWeight={700}>Abszolút hiba: {round(err, 4)} ({round(pct, 2)}%)</text>
        <rect x={20} y={66} width={500} height={14} rx={7} fill="rgba(255,255,255,0.08)" />
        <rect x={20} y={66} width={(barW / 100) * 500} height={14} rx={7} fill={pct < 2 ? '#34d399' : pct < 7 ? '#fbbf24' : '#f87171'} />
      </svg>
      <div className="result">
        <p>
          Hasonlítsd össze <M t="h=0{,}1" /> (<M t="5{,}6\%" />) és <M t="h=0{,}05" /> (<M t="2{,}9\%" />) hibáját: <strong>ha felezed <M t="h" />-t, az Euler-hiba pontosan a felére esik!</strong>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (4. ábra): Konvexitási torzítás */

export function ConcavityBiasDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Alulbecsül vagy felülbecsül az Euler-módszer? A konvexitás dönt!</div>
      <svg viewBox="0 0 560 156" className="plane" role="img" aria-label="Konvex és konkáv Euler-torzítás">
        <rect width={560} height={156} className="pl-bg" />

        <g transform="translate(12, 12)">
          <rect width={262} height={132} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={131} y={20} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>KONVEX (y″ &gt; 0) ⇒ ALULBECSÜL</text>
          <path d="M 30 105 Q 140 100 225 32" fill="none" stroke="#38bdf8" strokeWidth={2.5} />
          <polyline points="30,105 110,96 190,68" fill="none" stroke="#fb923c" strokeWidth={2.4} strokeDasharray="5 3" />
          <circle cx={30} cy={105} r={4} fill="#fbbf24" />
          <circle cx={110} cy={96} r={4} fill="#fbbf24" />
          <circle cx={190} cy={68} r={4} fill="#fbbf24" />
          <text x={131} y={122} textAnchor="middle" fill="#cbd5e1" fontSize={10}>Az érintők a görbe ALATT haladnak</text>
        </g>

        <g transform="translate(286, 12)">
          <rect width={262} height={132} rx={8} fill="#0f172a" stroke="#fb923c" strokeWidth={1.5} />
          <text x={131} y={20} textAnchor="middle" fill="#fb923c" fontSize={11.5} fontWeight={700}>KONKÁV (y″ &lt; 0) ⇒ FELÜLBECSÜL</text>
          <path d="M 30 105 Q 90 36 225 34" fill="none" stroke="#38bdf8" strokeWidth={2.5} />
          <polyline points="30,105 110,48 190,26" fill="none" stroke="#fb923c" strokeWidth={2.4} strokeDasharray="5 3" />
          <circle cx={30} cy={105} r={4} fill="#fbbf24" />
          <circle cx={110} cy={48} r={4} fill="#fbbf24" />
          <circle cx={190} cy={26} r={4} fill="#fbbf24" />
          <text x={131} y={122} textAnchor="middle" fill="#cbd5e1" fontSize={10}>Az érintők a görbe FELETT haladnak</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (5. ábra): Prediktor–korrektor (Heun / RK2) */

export function HeunPredictorDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A javított Euler (Heun / RK2) trükkje: két meredekség átlaga!</div>
      <svg viewBox="0 0 560 156" className="plane" role="img" aria-label="Javított Euler prediktor-korrektor séma">
        <rect width={560} height={156} className="pl-bg" />

        <g transform="translate(12, 16)">
          <rect width={166} height={122} rx={8} fill="#0f172a" stroke="#fb923c" strokeWidth={1.5} />
          <text x={83} y={22} textAnchor="middle" fill="#fb923c" fontSize={11} fontWeight={700}>1. Prediktor (próba)</text>
          <text x={83} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>k₁ = f(xₙ₋₁, yₙ₋₁)</text>
          <text x={83} y={74} textAnchor="middle" fill="#fde68a" fontSize={10.8} fontWeight={600}>zₙ = yₙ₋₁ + k₁ · h</text>
          <text x={83} y={102} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>(egyszerű Euler-becslés)</text>
        </g>

        <path d="M181,77 L194,77" stroke="#64748b" strokeWidth={2} />
        <polygon points="194,73 201,77 194,81" fill="#64748b" />

        <g transform="translate(202, 16)">
          <rect width={156} height={122} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={78} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>2. Végponti irány</text>
          <text x={78} y={54} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>k₂ = f(xₙ, zₙ)</text>
          <text x={78} y={84} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>megmérjük a meredekséget</text>
          <text x={78} y={100} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>a célpontnál is!</text>
        </g>

        <path d="M361,77 L374,77" stroke="#64748b" strokeWidth={2} />
        <polygon points="374,73 381,77 374,81" fill="#64748b" />

        <g transform="translate(382, 16)">
          <rect width={166} height={122} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={83} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>3. Korrektor (átlag)</text>
          <text x={83} y={54} textAnchor="middle" fill="#a7f3d0" fontSize={11} fontWeight={700}>yₙ = yₙ₋₁ + ½(k₁+k₂)h</text>
          <text x={83} y={84} textAnchor="middle" fill="#cbd5e1" fontSize={9.8}>Globális hiba: O(h²)!</text>
          <text x={83} y={102} textAnchor="middle" fill="#34d399" fontSize={9.5}>Felezett h ⇒ ¼ hiba!</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (6. ábra): Euler vs. RK2 verseny */

export function EulerVsRK2Widget() {
  const [n, setN] = useState(5);
  // y' = 1 + y, y(0) = 1 → pontos y(1) = 2e - 1
  const h = 1 / n;
  const ePts: [number, number][] = [[0, 1]];
  const rPts: [number, number][] = [[0, 1]];
  for (let i = 0; i < n; i++) {
    const [ex, ey] = ePts[i];
    ePts.push([ex + h, ey + (1 + ey) * h]);

    const [rx, ry] = rPts[i];
    const k1 = 1 + ry;
    const z = ry + k1 * h;
    const k2 = 1 + z;
    rPts.push([rx + h, ry + 0.5 * (k1 + k2) * h]);
  }
  const exact = 2 * Math.E - 1;
  const eEnd = ePts[n][1];
  const rEnd = rPts[n][1];
  const ePct = (Math.abs(exact - eEnd) / exact) * 100;
  const rPct = (Math.abs(exact - rEnd) / exact) * 100;

  return (
    <div className="widget">
      <div className="widget-title">Verseny: Egyszerű Euler (narancs) vs. Javított Euler / RK2 (zöld)</div>
      <div className="relbuttons chips">
        {[2, 4, 5, 10].map((nv) => (
          <button key={nv} className={n === nv ? 'on' : ''} onClick={() => setN(nv)}>
            N = {nv} (h = {round(1 / nv, 2)})
          </button>
        ))}
      </div>
      <Plane xmin={-0.1} xmax={1.15} ymin={0.8} ymax={4.8}>
        {(m) => (
          <>
            <PFunc map={m} fn={(x) => 2 * Math.exp(x) - 1} from={0} to={1} cls="pl-main" />
            <path
              d={ePts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${m.X(x).toFixed(1)},${m.Y(y).toFixed(1)}`).join(' ')}
              fill="none"
              stroke="#fb923c"
              strokeWidth={2.4}
            />
            <path
              d={rPts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${m.X(x).toFixed(1)},${m.Y(y).toFixed(1)}`).join(' ')}
              fill="none"
              stroke="#34d399"
              strokeWidth={2.4}
              strokeDasharray="6 3"
            />
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={`\\text{Euler: } ${tx(eEnd, 4)}\\;(${tx(ePct, 2)}\\%\\text{ hiba}) \\quad|\\quad \\text{RK2: } ${tx(rEnd, 4)}\\;(${tx(rPct, 2)}\\%\\text{ hiba})`}
        />
        <p>
          A zöld RK2-görbe már <M t="N=5" /> lépésnél szinte tökéletesen rásimul a kék pontos megoldásra!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (7. ábra): Numerikus instabilitás */

export function EulerInstabilityWidget() {
  const [h, setH] = useState(0.35);
  // y' = -5y, y(0) = 1 → pontos: e^(-5x). Stabilitási határ: |1 - 5h| < 1 ⇔ h < 0.4!
  const pts: [number, number][] = [[0, 1]];
  let x = 0;
  let y = 1;
  while (x < 2.0 - 1e-6 && pts.length < 45) {
    x += h;
    y = y + -5 * y * h;
    pts.push([x, Math.max(-4, Math.min(4, y))]);
  }
  const unstable = h > 0.4;
  const osc = h > 0.2 && h <= 0.4;

  return (
    <div className="widget">
      <div className="widget-title">Numerikus instabilitás: y′ = −5y, y(0) = 1 (stabilitási határ: h &lt; 0,4)</div>
      <label>
        lépésköz: h = {round(h, 2)} (szorzó tényező: 1 − 5h = {round(1 - 5 * h, 2)})
        <input type="range" min={0.05} max={0.50} step={0.05} value={h} onChange={(e) => setH(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={2.1} ymin={-2.5} ymax={2.5}>
        {(m) => (
          <>
            <PFunc map={m} fn={(t) => Math.exp(-5 * t)} from={0} to={2} cls="pl-main" />
            <path
              d={pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${m.X(px).toFixed(1)},${m.Y(py).toFixed(1)}`).join(' ')}
              fill="none"
              stroke={unstable ? '#f87171' : osc ? '#fbbf24' : '#34d399'}
              strokeWidth={2.4}
            />
          </>
        )}
      </Plane>
      <div className="result">
        <p style={{ color: unstable ? '#fca5a5' : osc ? '#fde68a' : '#6ee7b7' }}>
          <strong>
            {unstable
              ? 'INSTABIL! (h > 0,4): |1 − 5h| > 1, a megoldás oszcillálva felrobban!'
              : osc
                ? 'Oszcillálva csillapodik (0,2 < h ≤ 0,4): előjelet vált, de még 0-hoz tart.'
                : 'STABIL (h ≤ 0,2): simán követi a valódi e⁻⁵ˣ csillapodást!'}
          </strong>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (8. ábra): Módszerek összehasonlítása */

export function MethodComparisonDiagram() {
  const methods = [
    { name: 'Euler', ord: '1. rendű · O(h)', evals: '1 f-kiértékelés / lépés', half: 'h/2 ⇒ ½ hiba', c: '#fb923c' },
    { name: 'Javított Euler (RK2)', ord: '2. rendű · O(h²)', evals: '2 f-kiértékelés / lépés', half: 'h/2 ⇒ ¼ hiba', c: '#38bdf8' },
    { name: 'Klasszikus RK4', ord: '4. rendű · O(h⁴)', evals: '4 f-kiértékelés / lépés', half: 'h/2 ⇒ ¹⁄₁₆ hiba!', c: '#34d399' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">Numerikus DE-megoldók összehasonlítása (pontosság vs. számításigény)</div>
      <svg viewBox="0 0 560 135" className="plane" role="img" aria-label="Euler, RK2 és RK4 összehasonlítása">
        <rect width={560} height={135} className="pl-bg" />
        {methods.map((m, i) => {
          const x = 14 + i * 182;
          return (
            <g key={m.name} transform={`translate(${x}, 14)`}>
              <rect width={168} height={106} rx={9} fill="#0f172a" stroke={m.c} strokeWidth={1.6} />
              <text x={84} y={24} textAnchor="middle" fill={m.c} fontSize={12} fontWeight={700}>{m.name}</text>
              <text x={84} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={11}>{m.ord}</text>
              <text x={84} y={70} textAnchor="middle" fill="#94a3b8" fontSize={10.2}>{m.evals}</text>
              <text x={84} y={93} textAnchor="middle" fill="#fde68a" fontSize={10.8} fontWeight={600}>{m.half}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
