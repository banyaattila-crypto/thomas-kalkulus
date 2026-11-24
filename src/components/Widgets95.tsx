import { useState } from 'react';
import { M } from './M';
import { Plane, PCircle, PFunc, PLine } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal (1. ábra): Siklás a jégen */

export function IceGlidingWidget() {
  const [v0, setV0] = useState(8);
  const [km, setKm] = useState(0.4); // k/m (1/s)

  const sMax = v0 / km;
  const s = (t: number) => sMax * (1 - Math.exp(-km * t));
  const v = (t: number) => v0 * Math.exp(-km * t);

  return (
    <div className="widget">
      <div className="widget-title">Siklás a jégen (Thomas 1. példa): m·dv/dt = −kv ⇒ véges siklási út!</div>
      <label>
        kezdősebesség: v₀ = {v0} m/s · ellenállási tényező: k/m = {round(km, 2)} s⁻¹
        <input type="range" min={2} max={12} step={1} value={v0} onChange={(e) => setV0(Number(e.target.value))} />
      </label>
      <label>
        közegellenállás / tömeg (k/m): {round(km, 2)} s⁻¹ (s_max = v₀ / (k/m) = {round(sMax, 1)} m)
        <input type="range" min={0.2} max={0.8} step={0.1} value={km} onChange={(e) => setKm(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={12} ymin={0} ymax={Math.max(15, Math.min(65, sMax + 6))}>
        {(m) => (
          <>
            <PLine map={m} k={0} b={sMax} cls="pl-ok" />
            <PFunc map={m} fn={s} from={0} to={12} cls="pl-main" />
            <PFunc map={m} fn={v} from={0} to={12} cls="pl-alt" />
            <text x={m.X(7.5)} y={m.Y(sMax) - 7} fill="#34d399" fontSize={11} fontWeight={700}>
              s_max = {round(sMax, 1)} m
            </text>
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`v(t) = ${v0}e^{-${tx(km, 1)}t}, \\qquad s(t) = ${tx(sMax, 1)}\\bigl(1 - e^{-${tx(km, 1)}t}\\bigr) \\xrightarrow{t\\to\\infty} ${tx(sMax, 1)}\\text{ m}`} />
        <p>
          <strong>Kék:</strong> megtett út <M t="s(t)" />; <strong>narancs:</strong> sebesség <M t="v(t)" />. Bár a sebesség sosem lesz pontosan 0, a teljes megtett út mégis <strong>véges</strong> (<M t="mv_0/k" />)!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Exponenciális vs. Logisztikus */

export function ExpVsLogisticWidget() {
  const [rM, setRM] = useState(0.15); // r*M (1/év)
  const Mmax = 100;
  const P0 = 10;
  const A = (Mmax - P0) / P0; // 9
  const tInf = Math.log(A) / rM;

  const pLog = (t: number) => Mmax / (1 + A * Math.exp(-rM * t));
  const pExp = (t: number) => P0 * Math.exp(rM * t);

  return (
    <div className="widget">
      <div className="widget-title">Exponenciális vs. Logisztikus modell (Thomas 2. példa: M = 100, P₀ = 10)</div>
      <label>
        kezdeti növekedési ütem: rM = {round(rM, 2)} / év (inflexiós időpont P = 50-nél: t = {round(tInf, 1)} év)
        <input type="range" min={0.05} max={0.30} step={0.05} value={rM} onChange={(e) => setRM(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={35} ymin={0} ymax={120}>
        {(m) => (
          <>
            <PLine map={m} k={0} b={100} cls="pl-ok" />
            <PLine map={m} k={0} b={50} cls="pl-dash2" />
            <PFunc map={m} fn={pExp} from={0} to={35} cls="pl-alt" />
            <PFunc map={m} fn={pLog} from={0} to={35} cls="pl-main" />
            <text x={m.X(24)} y={m.Y(100) - 7} fill="#34d399" fontSize={11} fontWeight={700}>M = 100</text>
            <text x={m.X(22)} y={m.Y(50) - 6} fill="#94a3b8" fontSize={10.5}>M/2 = 50</text>
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`P(t) = \\frac{100}{1 + 9e^{-${tx(rM, 2)}t}} \\quad (\\text{narancs: } 10e^{${tx(rM, 2)}t}\\text{ elszáll!})`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Logisztikus DE megoldásának 4 lépése */

export function LogisticSolveDiagram() {
  const steps = [
    { n: '1. Szétválasztás', t: 'dP / [P(M−P)] = r dt', c: '#38bdf8' },
    { n: '2. Parciális törtek', t: '(1/M)[1/P + 1/(M−P)]', c: '#34d399' },
    { n: '3. Integrálás', t: 'ln|P/(M−P)| = rMt + C', c: '#fb923c' },
    { n: '4. Rendezés', t: 'P(t) = M / (1 + Ae⁻ʳᴹᵗ)', c: '#fbbf24' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">A logisztikus differenciálegyenlet pontos megoldása 4 lépésben</div>
      <svg viewBox="0 0 560 96" className="plane" role="img" aria-label="Logisztikus egyenlet megoldásának 4 lépése">
        <rect width={560} height={96} className="pl-bg" />
        {steps.map((s, i) => {
          const x = 10 + i * 137;
          return (
            <g key={s.n} transform={`translate(${x}, 14)`}>
              <rect width={128} height={68} rx={8} fill="#0f172a" stroke={s.c} strokeWidth={1.5} />
              <text x={64} y={24} textAnchor="middle" fill={s.c} fontSize={11} fontWeight={700}>{s.n}</text>
              <text x={64} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={10}>{s.t}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Folyamatos hiteltörlesztés */

export function LoanPayoffWidget() {
  const [mPay, setMPay] = useState(1.0); // millió Ft / év
  const r = 0.06; // 6% kamat
  const y0 = 10; // 10 M Ft hitel
  // y' = 0.06*y - mPay → y(t) = mPay/r + (y0 - mPay/r)*e^(rt)
  const eq = mPay / r;
  const y = (t: number) => eq + (y0 - eq) * Math.exp(r * t);
  const canPay = mPay > r * y0;
  const tPay = canPay ? Math.log(mPay / (mPay - r * y0)) / r : Infinity;

  return (
    <div className="widget">
      <div className="widget-title">Folyamatos hiteltörlesztés: y′ = 0,06y − m (y₀ = 10 M Ft, kamat: 6%/év)</div>
      <label>
        éves törlesztés: m = {round(mPay, 2)} M Ft/év (éves induló kamat: 0,60 M Ft/év)
        <input type="range" min={0.4} max={1.6} step={0.1} value={mPay} onChange={(e) => setMPay(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={25} ymin={0} ymax={16}>
        {(m) => (
          <>
            <PFunc map={m} fn={(t) => { const v = y(t); return v >= 0 ? v : NaN; }} from={0} to={25} cls={canPay ? 'pl-ok' : 'pl-alt'} />
          </>
        )}
      </Plane>
      <div className="result">
        <p style={{ color: canPay ? '#6ee7b7' : '#fca5a5' }}>
          {canPay
            ? `A hitel pontosan ${round(tPay, 1)} év alatt elfogy! (Összesen befizetve: ${round(tPay * mPay, 1)} M Ft.)`
            : 'FIGYELEM: m ≤ 0,60 M Ft/év — a törlesztés még a kamatot sem fedezi, a tartozás soha nem fogy el!'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (5. ábra): Szökési sebesség */

export function EscapeVelocityDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Szökési sebesség szétválasztható DE-ből: v · dv/dr = −GM / r²</div>
      <svg viewBox="0 0 560 112" className="plane" role="img" aria-label="Szökési sebesség levezetése">
        <rect width={560} height={112} className="pl-bg" />
        <g transform="translate(12, 14)">
          <rect width={262} height={84} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
          <text x={131} y={24} textAnchor="middle" fill="#38bdf8" fontSize={11.5} fontWeight={700}>Szétválasztás + integrálás</text>
          <text x={131} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={11}>½v² = GM/r + C</text>
          <text x={131} y={70} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>v_szökés = √(2GM / R)</text>
        </g>
        <g transform="translate(286, 14)">
          <rect width={262} height={84} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={131} y={24} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>Konkrét értékek a Naprendszerben</text>
          <text x={131} y={48} textAnchor="middle" fill="#e2e8f0" fontSize={11}>Föld: ≈ 11,2 km/s</text>
          <text x={131} y={70} textAnchor="middle" fill="#a7f3d0" fontSize={11}>Hold: ≈ 2,38 km/s (Thomas feladat!)</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (6. ábra): Ortogonális trajektória 4 lépése */

export function OrthogonalStepsDiagram() {
  const steps = [
    { n: '1. DE felírása', t: 'Deriválj, ejtsd ki a-t!', s: 'y′ = f(x, y)', c: '#38bdf8' },
    { n: '2. Merőleges irány', t: 'Negatív reciprok!', s: 'y′ = −1 / f(x, y)', c: '#fb923c' },
    { n: '3. Megoldás', t: 'Integráld az új DE-t!', s: 'szeparábilis / lin.', c: '#34d399' },
    { n: '4. Merőleges háló', t: 'Minden metszés 90°!', s: 'erővonal ⊥ szintvonal', c: '#fbbf24' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">Ortogonális trajektóriák meghatározásának 4 lépése</div>
      <svg viewBox="0 0 560 100" className="plane" role="img" aria-label="Ortogonális trajektóriák 4 lépése">
        <rect width={560} height={100} className="pl-bg" />
        {steps.map((s, i) => {
          const x = 10 + i * 137;
          return (
            <g key={s.n} transform={`translate(${x}, 12)`}>
              <rect width={128} height={76} rx={8} fill="#0f172a" stroke={s.c} strokeWidth={1.5} />
              <text x={64} y={22} textAnchor="middle" fill={s.c} fontSize={11} fontWeight={700}>{s.n}</text>
              <text x={64} y={44} textAnchor="middle" fill="#e2e8f0" fontSize={10.2}>{s.t}</text>
              <text x={64} y={64} textAnchor="middle" fill="#94a3b8" fontSize={9.8}>{s.s}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (7. ábra): Ortogonális trajektória-galéria */

type OrthId = 'circles' | 'hyper' | 'parab';

export function OrthogonalFamilyWidget() {
  const [oid, setOid] = useState<OrthId>('hyper');

  return (
    <div className="widget">
      <div className="widget-title">Egymást derékszögben metsző görbeseregek (ortogonális trajektóriák)</div>
      <div className="relbuttons chips">
        <button className={oid === 'circles' ? 'on' : ''} onClick={() => setOid('circles')}>Körök ⊥ Egyenesek</button>
        <button className={oid === 'hyper' ? 'on' : ''} onClick={() => setOid('hyper')}>xy = a ⊥ x² − y² = b (Thomas 3.)</button>
        <button className={oid === 'parab' ? 'on' : ''} onClick={() => setOid('parab')}>y = ax² ⊥ ½x² + y² = b</button>
      </div>
      <Plane xmin={-3.5} xmax={3.5} ymin={-3.5} ymax={3.5}>
        {(m) => (
          <>
            {oid === 'circles' && (
              <>
                {[0.8, 1.6, 2.4, 3.1].map((r) => (
                  <PCircle key={r} map={m} h={0} k={0} r={r} cls="pl-main" />
                ))}
                {[-2, -0.8, 0, 0.8, 2].map((k) => (
                  <PLine key={k} map={m} k={k} b={0} cls="pl-alt" />
                ))}
              </>
            )}
            {oid === 'hyper' && (
              <>
                {[-2, -1, 1, 2].map((a) => (
                  <g key={`h${a}`}>
                    <PFunc map={m} fn={(x) => (Math.abs(x) > 0.15 ? a / x : NaN)} from={-3.5} to={-0.15} cls="pl-main" />
                    <PFunc map={m} fn={(x) => (Math.abs(x) > 0.15 ? a / x : NaN)} from={0.15} to={3.5} cls="pl-main" />
                  </g>
                ))}
                {/* x² - y² = b → y = ±√(x² - b) */}
                {[-2, -0.8, 0.8, 2].map((b) => (
                  <g key={`o${b}`}>
                    <PFunc map={m} fn={(x) => (x * x - b >= 0 ? Math.sqrt(x * x - b) : NaN)} cls="pl-alt" />
                    <PFunc map={m} fn={(x) => (x * x - b >= 0 ? -Math.sqrt(x * x - b) : NaN)} cls="pl-alt" />
                  </g>
                ))}
              </>
            )}
            {oid === 'parab' && (
              <>
                {[-1.2, -0.4, 0.4, 1.2].map((a) => (
                  <PFunc key={`p${a}`} map={m} fn={(x) => a * x * x} cls="pl-main" />
                ))}
                {[1, 2.5, 4.5].map((b) => (
                  <g key={`e${b}`}>
                    <PFunc map={m} fn={(x) => (b - 0.5 * x * x >= 0 ? Math.sqrt(b - 0.5 * x * x) : NaN)} cls="pl-alt" />
                    <PFunc map={m} fn={(x) => (b - 0.5 * x * x >= 0 ? -Math.sqrt(b - 0.5 * x * x) : NaN)} cls="pl-alt" />
                  </g>
                ))}
              </>
            )}
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          <strong>Kék:</strong> az eredeti görbesereg. <strong>Narancs:</strong> az ortogonális trajektóriák — minden egyes metszéspontjukban pontosan <M t="90^\circ" />-os szöget zárnak be!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): A teljes II. kötet térképe */

export function Volume2SummaryDiagram() {
  const chs = [
    { n: '5. fejezet', t: 'Integrálszámítás', s: 'Riemann + Newton–Leibniz', c: '#38bdf8' },
    { n: '6. fejezet', t: 'Alkalmazások', s: 'Térfogat, ívhossz, munka', c: '#2dd4bf' },
    { n: '7. fejezet', t: 'Transzcendens fv.', s: 'ln, exp, inverz trig, sh/ch', c: '#34d399' },
    { n: '8. fejezet', t: 'Technikák', s: 'Parciális, tört, improprius', c: '#fbbf24' },
    { n: '9. fejezet', t: 'Differenciálegy.', s: 'Szep., lin., Euler, fázis', c: '#fb923c' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">🎉 A teljes II. kötet (5–9. fejezet, 34 / 34 szakasz) lezárva! (v2.0.0)</div>
      <svg viewBox="0 0 560 96" className="plane" role="img" aria-label="II. kötet összefoglaló térképe">
        <rect width={560} height={96} className="pl-bg" />
        {chs.map((ch, i) => {
          const x = 10 + i * 109;
          return (
            <g key={ch.n} transform={`translate(${x}, 12)`}>
              <rect width={102} height={72} rx={8} fill="#0f172a" stroke={ch.c} strokeWidth={1.6} />
              <text x={51} y={20} textAnchor="middle" fill={ch.c} fontSize={10.8} fontWeight={700}>{ch.n}</text>
              <text x={51} y={39} textAnchor="middle" fill="#e2e8f0" fontSize={10.2}>{ch.t}</text>
              <text x={51} y={58} textAnchor="middle" fill="#94a3b8" fontSize={8.8}>{ch.s}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
