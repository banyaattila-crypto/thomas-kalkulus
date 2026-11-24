import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PLine, PPoint, PSeg } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal (1. ábra): A 4 kúpszelet */

export function ConicSlicesDiagram() {
  const items = [
    { name: 'Kör', eq: 'x² + y² = r²', sub: 'vízszintes metszet', c: '#38bdf8', kind: 'circ' },
    { name: 'Ellipszis', eq: 'x²/a² + y²/b² = 1', sub: 'enyhén ferde sík', c: '#34d399', kind: 'ell' },
    { name: 'Parabola', eq: 'x² = 4py', sub: 'alkotóval párhuzamos', c: '#fbbf24', kind: 'par' },
    { name: 'Hiperbola', eq: 'x²/a² − y²/b² = 1', sub: 'mindkét palástot metszi', c: '#fb923c', kind: 'hyp' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">A négy nem elfajult kúpszelet (kettős forgáskúp metszetei síkkal)</div>
      <svg viewBox="0 0 560 148" className="plane" role="img" aria-label="Kör, ellipszis, parabola, hiperbola">
        <rect width={560} height={148} className="pl-bg" />
        {items.map((it, i) => (
          <g key={it.name} transform={`translate(${10 + i * 137}, 10)`}>
            <rect width={128} height={128} rx={8} fill="#0f172a" stroke={it.c} strokeWidth={1.5} />
            <text x={64} y={20} textAnchor="middle" fill={it.c} fontSize={11.5} fontWeight={700}>{it.name}</text>
            {it.kind === 'circ' && <circle cx={64} cy={60} r={22} fill="none" stroke={it.c} strokeWidth={2.2} />}
            {it.kind === 'ell' && <ellipse cx={64} cy={60} rx={30} ry={17} fill="none" stroke={it.c} strokeWidth={2.2} />}
            {it.kind === 'par' && <path d="M 32 42 Q 64 98 96 42" fill="none" stroke={it.c} strokeWidth={2.2} />}
            {it.kind === 'hyp' && (
              <>
                <path d="M 34 38 Q 56 60 34 82" fill="none" stroke={it.c} strokeWidth={2.2} />
                <path d="M 94 38 Q 72 60 94 82" fill="none" stroke={it.c} strokeWidth={2.2} />
              </>
            )}
            <text x={64} y={102} textAnchor="middle" fill="#e2e8f0" fontSize={10}>{it.eq}</text>
            <text x={64} y={118} textAnchor="middle" fill="#94a3b8" fontSize={9.2}>{it.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal (2. ábra): Interaktív parabola + fókusz */

export function ParabolaFocusWidget() {
  const [p, setP] = useState(1.2);
  const [px, setPx] = useState(2.4);
  const py = (px * px) / (4 * p);
  const distF = Math.hypot(px, py - p);
  const distL = py + p;

  return (
    <div className="widget">
      <div className="widget-title">Parabola definíciója: minden P pont egyenlő távol van F-től és L-től!</div>
      <label>
        fókusztávolság: p = {round(p, 1)} (egyenlet: x² = {round(4 * p, 1)}y, fókusz: F(0; {round(p, 1)}), direktrix: y = −{round(p, 1)})
        <input type="range" min={0.5} max={2.2} step={0.1} value={p} onChange={(e) => setP(Number(e.target.value))} />
      </label>
      <label>
        mozgó pont x-koordinátája: x = {round(px, 1)}
        <input type="range" min={-3.4} max={3.4} step={0.2} value={px} onChange={(e) => setPx(Number(e.target.value))} />
      </label>
      <Plane xmin={-4.5} xmax={4.5} ymin={-2.8} ymax={4.6}>
        {(m) => (
          <>
            <PLine map={m} k={0} b={-p} cls="pl-alt" />
            <PFunc map={m} fn={(x) => (x * x) / (4 * p)} cls="pl-main" />
            <PSeg map={m} x1={px} y1={py} x2={0} y2={p} cls="pl-ok" />
            <PSeg map={m} x1={px} y1={py} x2={px} y2={-p} cls="pl-ok" />
            <PPoint map={m} x={0} y={p} color="#fbbf24" label="F(0; p)" dx={10} dy={-6} />
            <PPoint map={m} x={px} y={py} color="#34d399" label="P" dx={8} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`PF = ${tx(distF, 3)} \\;\\mathbf{=}\\; d(P, L) = ${tx(distL, 3)}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal (3. ábra): Interaktív ellipszis */

export function EllipseFocusWidget() {
  const [a, setA] = useState(4.0);
  const [b, setB] = useState(2.5);
  const [ang, setAng] = useState(0.9);

  const big = Math.max(a, b);
  const small = Math.min(a, b);
  const c = Math.sqrt(Math.max(0, big * big - small * small));
  const horiz = a >= b;
  const px = a * Math.cos(ang);
  const py = b * Math.sin(ang);
  const f1: [number, number] = horiz ? [-c, 0] : [0, -c];
  const f2: [number, number] = horiz ? [c, 0] : [0, c];
  const d1 = Math.hypot(px - f1[0], py - f1[1]);
  const d2 = Math.hypot(px - f2[0], py - f2[1]);

  return (
    <div className="widget">
      <div className="widget-title">Ellipszis: a két fókusztól mért távolságok ÖSSZEGE állandó (PF₁ + PF₂ = 2a)</div>
      <label>
        vízszintes féltengely: a = {round(a, 1)} · függőleges féltengely: b = {round(b, 1)} (c = {round(c, 2)})
        <input type="range" min={1.2} max={4.5} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label>
        függőleges féltengely: b = {round(b, 1)}
        <input type="range" min={1.0} max={3.6} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
      <label>
        mozgó P pont helyzete az ellipszisen
        <input type="range" min={0} max={6.28} step={0.1} value={ang} onChange={(e) => setAng(Number(e.target.value))} />
      </label>
      <Plane xmin={-5.2} xmax={5.2} ymin={-4.0} ymax={4.0}>
        {(m) => (
          <>
            <ellipse
              cx={m.X(0)}
              cy={m.Y(0)}
              rx={a * m.sx}
              ry={b * m.sx}
              fill="rgba(56, 189, 248, 0.08)"
              stroke="#38bdf8"
              strokeWidth={2.5}
            />
            <PSeg map={m} x1={px} y1={py} x2={f1[0]} y2={f1[1]} cls="pl-ok" />
            <PSeg map={m} x1={px} y1={py} x2={f2[0]} y2={f2[1]} cls="pl-alt" />
            <PPoint map={m} x={f1[0]} y={f1[1]} color="#fbbf24" label="F₁" dx={-18} dy={16} />
            <PPoint map={m} x={f2[0]} y={f2[1]} color="#fbbf24" label="F₂" dx={8} dy={16} />
            <PPoint map={m} x={px} y={py} color="#34d399" label="P" dx={8} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`PF_1 + PF_2 = ${tx(d1, 2)} + ${tx(d2, 2)} = \\mathbf{${tx(d1 + d2, 2)}} = 2\\cdot ${tx(big, 1)}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (4. ábra): Interaktív hiperbola */

export function HyperbolaFocusWidget() {
  const [a, setA] = useState(2.0);
  const [b, setB] = useState(1.5);
  const c = Math.hypot(a, b);
  const slope = b / a;

  return (
    <div className="widget">
      <div className="widget-title">Hiperbola: x²/a² − y²/b² = 1, központi téglalap és aszimptoták (y = ±(b/a)x)</div>
      <label>
        a = {round(a, 1)} (csúcsok: ±{round(a, 1)}) · b = {round(b, 1)} · fókuszok: c = √(a²+b²) = {round(c, 2)}
        <input type="range" min={0.8} max={3.0} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label>
        b = {round(b, 1)} (aszimptoták meredeksége: ±{round(slope, 2)})
        <input type="range" min={0.8} max={3.0} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
      <Plane xmin={-5.5} xmax={5.5} ymin={-4.0} ymax={4.0}>
        {(m) => (
          <>
            {/* Központi téglalap */}
            <rect
              x={m.X(-a)}
              y={m.Y(b)}
              width={2 * a * m.sx}
              height={2 * b * m.sx}
              fill="rgba(52, 211, 153, 0.1)"
              stroke="#34d399"
              strokeWidth={1.4}
              strokeDasharray="5 3"
            />
            <PLine map={m} k={slope} b={0} cls="pl-dash" />
            <PLine map={m} k={-slope} b={0} cls="pl-dash" />
            <PFunc map={m} fn={(x) => (x >= a ? b * Math.sqrt((x * x) / (a * a) - 1) : NaN)} from={a} to={5.5} cls="pl-main" />
            <PFunc map={m} fn={(x) => (x >= a ? -b * Math.sqrt((x * x) / (a * a) - 1) : NaN)} from={a} to={5.5} cls="pl-main" />
            <PFunc map={m} fn={(x) => (x <= -a ? b * Math.sqrt((x * x) / (a * a) - 1) : NaN)} from={-5.5} to={-a} cls="pl-main" />
            <PFunc map={m} fn={(x) => (x <= -a ? -b * Math.sqrt((x * x) / (a * a) - 1) : NaN)} from={-5.5} to={-a} cls="pl-main" />
            <PPoint map={m} x={-c} y={0} color="#fbbf24" label="F₁" dx={-18} dy={16} />
            <PPoint map={m} x={c} y={0} color="#fbbf24" label="F₂" dx={8} dy={16} />
            <PPoint map={m} x={a} y={0} color="#34d399" />
            <PPoint map={m} x={-a} y={0} color="#34d399" />
          </>
        )}
      </Plane>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal (5. ábra): Ellipszis vs. Hiperbola */

export function EllipseVsHyperbolaDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A két leggyakrabban összekevert előjel: Ellipszis vs. Hiperbola</div>
      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Ellipszis és hiperbola összehasonlítása">
        <rect width={560} height={132} className="pl-bg" />
        <g transform="translate(12, 12)">
          <rect width={262} height={108} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#34d399" fontSize={11.5} fontWeight={700}>ELLIPSZIS (x²/a² + y²/b² = 1)</text>
          <text x={16} y={48} fill="#e2e8f0" fontSize={10.5}>• Távolságok ÖSSZEGE: PF₁ + PF₂ = 2a</text>
          <text x={16} y={72} fill="#fde68a" fontSize={11} fontWeight={700}>• Fókusz: c² = a² − b²  (MÍNUSZ!)</text>
          <text x={16} y={94} fill="#94a3b8" fontSize={9.8}>A fókuszok a görbén BELÜL vannak (c &lt; a).</text>
        </g>
        <g transform="translate(286, 12)">
          <rect width={262} height={108} rx={8} fill="#0f172a" stroke="#fb923c" strokeWidth={1.6} />
          <text x={131} y={22} textAnchor="middle" fill="#fb923c" fontSize={11.5} fontWeight={700}>HIPERBOLA (x²/a² − y²/b² = 1)</text>
          <text x={16} y={48} fill="#e2e8f0" fontSize={10.5}>• KÜLÖNBSÉG: |PF₁ − PF₂| = 2a</text>
          <text x={16} y={72} fill="#fde68a" fontSize={11} fontWeight={700}>• Fókusz: c² = a² + b²  (PLUSZ!)</text>
          <text x={16} y={94} fill="#94a3b8" fontSize={9.8}>A fókuszok a csúcsokon KÍVÜL vannak (c &gt; a).</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal (6. ábra): Eltolt ellipszis */

export function ShiftedConicWidget() {
  const [h, setH] = useState(1.5);
  const [k, setK] = useState(-1.0);
  // (x-h)²/4 + (y-k)²/1 = 1 → x² + 4y² - 2hx - 8ky + (h² + 4k² - 4) = 0
  const D = -2 * h;
  const E = -8 * k;
  const F = h * h + 4 * k * k - 4;
  const sgn = (v: number) => (v >= 0 ? `+ ${tx(v, 1)}` : `- ${tx(-v, 1)}`);

  return (
    <div className="widget">
      <div className="widget-title">Eltolt kúpszelet: (x − h)²/4 + (y − k)²/1 = 1</div>
      <label>
        középpont x-koordinátája: h = {round(h, 1)}
        <input type="range" min={-2.5} max={2.5} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} />
      </label>
      <label>
        középpont y-koordinátája: k = {round(k, 1)}
        <input type="range" min={-2.0} max={2.0} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} />
      </label>
      <Plane xmin={-5} xmax={5} ymin={-3.5} ymax={3.5}>
        {(m) => (
          <>
            <ellipse cx={m.X(h)} cy={m.Y(k)} rx={2 * m.sx} ry={1 * m.sx} fill="rgba(56, 189, 248, 0.14)" stroke="#38bdf8" strokeWidth={2.4} />
            <PPoint map={m} x={h} y={k} color="#fbbf24" label={`O(${round(h, 1)}; ${round(k, 1)})`} dx={8} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`\\text{Kibontva: } x^2 + 4y^2 ${sgn(D)}x ${sgn(E)}y ${sgn(F)} = 0`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal (7. ábra): Fényvisszaverési tulajdonságok */

export function ReflectivePropertiesDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A kúpszeletek csodás fény- és hangvisszaverési tulajdonságai</div>
      <svg viewBox="0 0 560 132" className="plane" role="img" aria-label="Parabola, ellipszis, hiperbola visszaverési tulajdonságai">
        <rect width={560} height={132} className="pl-bg" />
        <g transform="translate(10, 10)">
          <rect width={172} height={112} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.5} />
          <text x={86} y={20} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>PARABOLA (antenna)</text>
          <path d="M 38 34 Q 16 64 38 94" fill="none" stroke="#38bdf8" strokeWidth={2.2} />
          <line x1={150} y1={46} x2={30} y2={46} stroke="#fbbf24" strokeWidth={1.5} />
          <line x1={30} y1={46} x2={68} y2={64} stroke="#fbbf24" strokeWidth={1.5} />
          <line x1={150} y1={82} x2={30} y2={82} stroke="#fbbf24" strokeWidth={1.5} />
          <line x1={30} y1={82} x2={68} y2={64} stroke="#fbbf24" strokeWidth={1.5} />
          <circle cx={68} cy={64} r={4} fill="#34d399" />
          <text x={86} y={104} textAnchor="middle" fill="#cbd5e1" fontSize={9.3}>Párhuzamos sugarak → F</text>
        </g>
        <g transform="translate(194, 10)">
          <rect width={172} height={112} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.5} />
          <text x={86} y={20} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>ELLIPSZIS (suttogó)</text>
          <ellipse cx={86} cy={62} rx={62} ry={28} fill="none" stroke="#38bdf8" strokeWidth={2.2} />
          <line x1={50} y1={62} x2={98} y2={35} stroke="#34d399" strokeWidth={1.5} />
          <line x1={98} y1={35} x2={122} y2={62} stroke="#34d399" strokeWidth={1.5} />
          <circle cx={50} cy={62} r={3.8} fill="#fbbf24" />
          <circle cx={122} cy={62} r={3.8} fill="#fbbf24" />
          <text x={86} y={104} textAnchor="middle" fill="#cbd5e1" fontSize={9.3}>F₁-ből induló sugár → F₂</text>
        </g>
        <g transform="translate(378, 10)">
          <rect width={172} height={112} rx={8} fill="#0f172a" stroke="#fb923c" strokeWidth={1.5} />
          <text x={86} y={20} textAnchor="middle" fill="#fb923c" fontSize={11} fontWeight={700}>HIPERBOLA (távcső)</text>
          <path d="M 102 36 Q 82 62 102 88" fill="none" stroke="#38bdf8" strokeWidth={2.2} />
          <line x1={32} y1={42} x2={92} y2={54} stroke="#fb923c" strokeWidth={1.5} />
          <line x1={92} y1={54} x2={44} y2={76} stroke="#fb923c" strokeWidth={1.5} />
          <circle cx={44} cy={76} r={3.8} fill="#fbbf24" />
          <circle cx={132} cy={62} r={3.8} fill="#fbbf24" />
          <text x={86} y={104} textAnchor="middle" fill="#cbd5e1" fontSize={9.3}>F₂ felé tartó sugár → F₁</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. oldal (8. ábra): Gyors típusfelismerő */

export function ConicIdentifierDiagram() {
  const rows = [
    { cond: 'A = C  (≠ 0)', res: 'Kör (vagy pont / üres)', c: '#38bdf8' },
    { cond: 'A · C > 0  (A ≠ C)', res: 'Ellipszis (azonos előjelűek!)', c: '#34d399' },
    { cond: 'A · C = 0  (egyik 0)', res: 'Parabola (csak 1 négyzetes tag!)', c: '#fbbf24' },
    { cond: 'A · C < 0  (ellentétes)', res: 'Hiperbola (különböző előjel!)', c: '#fb923c' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">Villámfelismerő az Ax² + Cy² + Dx + Ey + F = 0 egyenlethez (B = 0)</div>
      <svg viewBox="0 0 560 156" className="plane" role="img" aria-label="Kúpszelet típusfelismerő">
        <rect width={560} height={156} className="pl-bg" />
        {rows.map((r, i) => {
          const y = 14 + i * 34;
          return (
            <g key={r.cond}>
              <rect x={16} y={y} width={180} height={26} rx={6} fill="#0f172a" stroke={r.c} strokeWidth={1.4} />
              <text x={106} y={y + 17} textAnchor="middle" fill={r.c} fontSize={11.5} fontWeight={700}>{r.cond}</text>
              <text x={210} y={y + 17} fill="#94a3b8" fontSize={12}>→</text>
              <text x={230} y={y + 17} fill="#e2e8f0" fontSize={11.5}>{r.res}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
