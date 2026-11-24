import { useState } from 'react';
import { M } from './M';

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

/* Segédkomponens: halvány polárrács SVG-ben */
function PolarGrid({ cx, cy, sc, maxR = 4 }: { cx: number; cy: number; sc: number; maxR?: number }) {
  const rings = Array.from({ length: maxR }, (_, i) => i + 1);
  const rays = [0, 30, 60, 90, 120, 150];
  return (
    <g>
      {rings.map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r * sc} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth={1} />
      ))}
      {rays.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const R = maxR * sc + 10;
        return (
          <line
            key={deg}
            x1={cx - R * Math.cos(rad)}
            y1={cy + R * Math.sin(rad)}
            x2={cx + R * Math.cos(rad)}
            y2={cy - R * Math.sin(rad)}
            stroke="rgba(148,163,184,0.16)"
            strokeWidth={1}
          />
        );
      })}
      {/* Polártengely (pozitív x-félegyenes) */}
      <line x1={cx} y1={cy} x2={cx + maxR * sc + 24} y2={cy} stroke="#cbd5e1" strokeWidth={2} />
      <polygon
        points={`${cx + maxR * sc + 28},${cy} ${cx + maxR * sc + 19},${cy - 4} ${cx + maxR * sc + 19},${cy + 4}`}
        fill="#cbd5e1"
      />
      <text x={cx + maxR * sc + 14} y={cy + 16} className="pl-tick">
        polártengely
      </text>
      <circle cx={cx} cy={cy} r={3.5} fill="#e2e8f0" />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. PolarPointExplorerWidget: r (akár negatív!) és θ interaktív felfedező   */
/* -------------------------------------------------------------------------- */
export function PolarPointExplorerWidget() {
  const [r, setR] = useState(3);
  const [deg, setDeg] = useState(45);

  const th = (deg * Math.PI) / 180;
  const x = r * Math.cos(th);
  const y = r * Math.sin(th);

  const W = 540;
  const H = 290;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 30;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  const rayX = 4.2 * Math.cos(th);
  const rayY = 4.2 * Math.sin(th);
  const col = r >= 0 ? '#34d399' : '#fb923c';

  return (
    <div className="widget">
      <div className="widget-title">Polárkoordináták élőben: irányított távolság r és irányszög θ</div>
      <div className="sliders">
        <label>
          sugár r = {fmt(r, 1)} {r < 0 ? '(negatív: ellenkező irány!)' : ''}
          <input type="range" min={-4} max={4} step={0.5} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          irányszög θ = {deg}°
          <input type="range" min={-180} max={360} step={15} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <PolarGrid cx={cx} cy={cy} sc={sc} maxR={4} />

        {/* θ irányú félegyenes */}
        <line x1={cx} y1={cy} x2={X(rayX)} y2={Y(rayY)} stroke="#fbbf24" strokeWidth={1.6} strokeDasharray="6 4" />
        <text x={X(rayX * 0.88)} y={Y(rayY * 0.88) - 8} className="pl-tick" fill="#fbbf24">
          θ = {deg}°
        </text>

        {/* OP szakasz */}
        <line x1={cx} y1={cy} x2={X(x)} y2={Y(y)} stroke={col} strokeWidth={2.6} />
        <circle cx={X(x)} cy={Y(y)} r={5.5} fill={col} stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(x) + 9} y={Y(y) - 8} className="pl-label" fill={col}>
          P({fmt(r, 1)}; {deg}°)
        </text>
      </svg>
      <div className="explain">
        <p>
          Descartes-koordináták: <M t={`x = r\\cos\\theta = ${fmt(x, 2)}`} />,{' '}
          <M t={`y = r\\sin\\theta = ${fmt(y, 2)}`} />.{' '}
          {r < 0
            ? 'Mivel r < 0, a θ irányú félegyenessel ellentétes irányba (θ + 180°) lépünk |r| egységet!'
            : r === 0
              ? 'Ha r = 0, a pont bármilyen θ szög mellett maga a pólus O(0; 0).'
              : 'Pozitív r esetén a θ szögű félegyenesen haladunk előre r egységet.'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. MultiplePolarNamesWidget: egyetlen pont 4 különböző polárneve           */
/* -------------------------------------------------------------------------- */
const NAMES = [
  { label: '(3; π/6)', r: 3, deg: 30, desc: 'Alapalak: 30° elfordulás pozitív irányban, +3 lépés előre.' },
  { label: '(3; −11π/6)', r: 3, deg: -330, desc: 'Óramutatóval megegyezően 330°-ot fordulunk, majd +3 előre.' },
  { label: '(−3; 7π/6)', r: -3, deg: 210, desc: '210°-os (ellenkező) irányba nézünk, majd −3-at hátralépünk.' },
  { label: '(−3; −5π/6)', r: -3, deg: -150, desc: '−150°-os irányba fordulunk, majd −3-at hátralépünk a póluson át.' },
];

export function MultiplePolarNamesWidget() {
  const [idx, setIdx] = useState(0);
  const item = NAMES[idx];
  const th = (item.deg * Math.PI) / 180;
  const px = 3 * Math.cos(Math.PI / 6);
  const py = 3 * Math.sin(Math.PI / 6);

  const W = 540;
  const H = 260;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 30;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  // Szögív rajzolása 0°-tól item.deg-ig
  const arcPts: string[] = [];
  const steps = Math.max(12, Math.round(Math.abs(item.deg) / 6));
  for (let i = 0; i <= steps; i++) {
    const a = (th * i) / steps;
    const rad = 28 + i * 0.12;
    arcPts.push(`${i ? 'L' : 'M'}${(cx + rad * Math.cos(a)).toFixed(1)},${(cy - rad * Math.sin(a)).toFixed(1)}`);
  }

  return (
    <div className="widget">
      <div className="widget-title">Egyetlen pont — végtelen sok polárkoordináta-pár!</div>
      <div className="relbuttons chips">
        {NAMES.map((n, i) => (
          <button key={n.label} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            {n.label}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <PolarGrid cx={cx} cy={cy} sc={sc} maxR={4} />

        {/* A választott θ sugár */}
        <line
          x1={cx}
          y1={cy}
          x2={X(3.8 * Math.cos(th))}
          y2={Y(3.8 * Math.sin(th))}
          stroke="#fbbf24"
          strokeWidth={1.8}
          strokeDasharray="6 4"
        />

        {/* Forgási ív */}
        <path d={arcPts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.2} />

        {/* P pont */}
        <line x1={cx} y1={cy} x2={X(px)} y2={Y(py)} stroke={item.r > 0 ? '#34d399' : '#fb923c'} strokeWidth={2.8} />
        <circle cx={X(px)} cy={Y(py)} r={6} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(px) + 10} y={Y(py) - 8} className="pl-label" fill="#34d399">
          P = {item.label}
        </text>
      </svg>
      <div className="explain">
        <p>{item.desc}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. BasicPolarGraphsWidget: r = a kör és θ = θ0 egyenes                     */
/* -------------------------------------------------------------------------- */
export function BasicPolarGraphsWidget() {
  const [kind, setKind] = useState<'r' | 'th'>('r');
  const [a, setA] = useState(2.5);
  const [deg, setDeg] = useState(60);

  const W = 540;
  const H = 250;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 28;
  const rad = (deg * Math.PI) / 180;

  return (
    <div className="widget">
      <div className="widget-title">A polárrendszer koordinátavonalai: r = a és θ = θ₀</div>
      <div className="relbuttons chips">
        <button className={kind === 'r' ? 'on' : ''} onClick={() => setKind('r')}>
          Állandó sugár: r = a (kör)
        </button>
        <button className={kind === 'th' ? 'on' : ''} onClick={() => setKind('th')}>
          Állandó szög: θ = θ₀ (egyenes)
        </button>
      </div>
      <div className="sliders">
        {kind === 'r' ? (
          <label>
            a = {fmt(a, 1)} (sugár |a| = {fmt(Math.abs(a), 1)})
            <input type="range" min={-3.5} max={3.5} step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
          </label>
        ) : (
          <label>
            θ₀ = {deg}°
            <input type="range" min={0} max={165} step={15} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
          </label>
        )}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <PolarGrid cx={cx} cy={cy} sc={sc} maxR={4} />
        {kind === 'r' ? (
          Math.abs(a) < 0.05 ? (
            <circle cx={cx} cy={cy} r={5} fill="#38bdf8" />
          ) : (
            <circle cx={cx} cy={cy} r={Math.abs(a) * sc} fill="none" stroke="#38bdf8" strokeWidth={2.8} />
          )
        ) : (
          <>
            <line x1={cx} y1={cy} x2={cx + 125 * Math.cos(rad)} y2={cy - 125 * Math.sin(rad)} stroke="#38bdf8" strokeWidth={2.8} />
            <line x1={cx} y1={cy} x2={cx - 125 * Math.cos(rad)} y2={cy + 125 * Math.sin(rad)} stroke="#fb923c" strokeWidth={2.8} />
          </>
        )}
      </svg>
      <div className="explain">
        <p>
          {kind === 'r'
            ? 'Az r = a és az r = −a egyenlet pontosan ugyanazt a |a| sugarú, origó középpontú kört adja!'
            : 'A θ = θ₀ egyenlet a teljes, origón átmenő egyenes: a cián félegyenesen r ≥ 0, a narancs félegyenesen r < 0.'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. PolarRegionsWidget: 4 tipikus poláris egyenlőtlenség-tartomány          */
/* -------------------------------------------------------------------------- */
export function PolarRegionsWidget() {
  const [reg, setReg] = useState(0);
  const W = 540;
  const H = 250;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 28;

  const arcSector = (r1: number, r2: number, a1Deg: number, a2Deg: number) => {
    const a1 = (a1Deg * Math.PI) / 180;
    const a2 = (a2Deg * Math.PI) / 180;
    const large = Math.abs(a2Deg - a1Deg) > 180 ? 1 : 0;
    const x1 = cx + r2 * sc * Math.cos(a1);
    const y1 = cy - r2 * sc * Math.sin(a1);
    const x2 = cx + r2 * sc * Math.cos(a2);
    const y2 = cy - r2 * sc * Math.sin(a2);
    const x3 = cx + r1 * sc * Math.cos(a2);
    const y3 = cy - r1 * sc * Math.sin(a2);
    const x4 = cx + r1 * sc * Math.cos(a1);
    const y4 = cy - r1 * sc * Math.sin(a1);
    return `M ${x1} ${y1} A ${r2 * sc} ${r2 * sc} 0 ${large} 0 ${x2} ${y2} L ${x3} ${y3} A ${r1 * sc} ${r1 * sc} 0 ${large} 1 ${x4} ${y4} Z`;
  };

  const labels = [
    '1 ≤ r ≤ 3 és π/6 ≤ θ ≤ 2π/3',
    '−2 ≤ r ≤ 3 és θ = π/4',
    'r ≤ 0 és θ = π/3',
    'π/6 ≤ θ ≤ π/3 (r ∈ ℝ)',
  ];

  return (
    <div className="widget">
      <div className="widget-title">Poláris tartományok és egyenlőtlenségek ábrázolása</div>
      <div className="relbuttons chips">
        {labels.map((l, i) => (
          <button key={l} className={i === reg ? 'on' : ''} onClick={() => setReg(i)}>
            {l}
          </button>
        ))}
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <PolarGrid cx={cx} cy={cy} sc={sc} maxR={4} />

        {reg === 0 && <path d={arcSector(1, 3, 30, 120)} fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth={2.2} />}
        {reg === 1 && (
          <>
            <line
              x1={cx - 2 * sc * Math.SQRT1_2}
              y1={cy + 2 * sc * Math.SQRT1_2}
              x2={cx + 3 * sc * Math.SQRT1_2}
              y2={cy - 3 * sc * Math.SQRT1_2}
              stroke="#34d399"
              strokeWidth={4}
            />
            <circle cx={cx - 2 * sc * Math.SQRT1_2} cy={cy + 2 * sc * Math.SQRT1_2} r={4.5} fill="#34d399" />
            <circle cx={cx + 3 * sc * Math.SQRT1_2} cy={cy - 3 * sc * Math.SQRT1_2} r={4.5} fill="#34d399" />
          </>
        )}
        {reg === 2 && (
          <>
            <line
              x1={cx}
              y1={cy}
              x2={cx - 4.2 * sc * 0.5}
              y2={cy + 4.2 * sc * (Math.sqrt(3) / 2)}
              stroke="#fb923c"
              strokeWidth={3.5}
            />
            <circle cx={cx} cy={cy} r={4.5} fill="#fb923c" />
          </>
        )}
        {reg === 3 && (
          <>
            <path d={arcSector(0.01, 4, 30, 60)} fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeWidth={1.8} />
            <path d={arcSector(0.01, 4, 210, 240)} fill="rgba(251,146,60,0.25)" stroke="#fb923c" strokeWidth={1.8} />
          </>
        )}
      </svg>
      <div className="explain">
        <p>
          {reg === 0 && 'Gyűrűcikk: a sugár 1 és 3 között, a szög 30° és 120° között mozog.'}
          {reg === 1 && 'A 45°-os egyenes egy 5 egység hosszú szakasza: 3 egység az I. negyedben, 2 egység a III.-ban.'}
          {reg === 2 && 'Mivel r ≤ 0, a 60°-os iránnyal ellentétes (240°-os) félegyenest kapjuk a pólussal együtt.'}
          {reg === 3 && 'Ha r-re nincs megkötés, a negatív r értékek a szemközti (210°–240°) éket is lefedik!'}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. PolarCartesianBridgeWidget: (x, y) <-> (r, θ) + síknegyed-csapda        */
/* -------------------------------------------------------------------------- */
export function PolarCartesianBridgeWidget() {
  const [x, setX] = useState(-3);
  const [y, setY] = useState(2);

  const r = Math.hypot(x, y);
  const trueDeg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const naiveDeg = Math.abs(x) > 1e-4 ? (Math.atan(y / x) * 180) / Math.PI : y >= 0 ? 90 : -90;
  const needsPi = x < 0;

  const W = 540;
  const H = 260;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 28;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  return (
    <div className="widget">
      <div className="widget-title">Descartes ↔ Polár híd és az arctan(y/x) síknegyed-csapdája</div>
      <div className="sliders">
        <label>
          x = {fmt(x, 1)}
          <input type="range" min={-4} max={4} step={0.5} value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
        <label>
          y = {fmt(y, 1)}
          <input type="range" min={-4} max={4} step={0.5} value={y} onChange={(e) => setY(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        {/* Derékszögű háromszög */}
        <line x1={cx} y1={cy} x2={X(x)} y2={cy} stroke="#38bdf8" strokeWidth={2.4} />
        <line x1={X(x)} y1={cy} x2={X(x)} y2={Y(y)} stroke="#34d399" strokeWidth={2.4} />
        <line x1={cx} y1={cy} x2={X(x)} y2={Y(y)} stroke="#fbbf24" strokeWidth={2.6} />

        <circle cx={X(x)} cy={Y(y)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
        <text x={X(x) + (x >= 0 ? 10 : -10)} y={Y(y) - 8} textAnchor={x >= 0 ? 'start' : 'end'} className="pl-label" fill="#fbbf24">
          P({fmt(x, 1)}; {fmt(y, 1)})
        </text>
      </svg>
      <div className="explain">
        <p>
          <M t={`r = \\sqrt{x^2+y^2} = ${fmt(r, 2)}`} />, valódi irányszög: <strong>θ = {fmt(trueDeg, 1)}°</strong>.{' '}
          {needsPi ? (
            <>
              Figyelem! A zsebszámológép <M t={`\\arctan(y/x) = ${fmt(naiveDeg, 1)}^\\circ`} /> értéket adna (IV. vagy
              I. negyed), de mivel <M t="x < 0" />, <strong>+180°-ot (+π-t) hozzá kell adni!</strong>
            </>
          ) : (
            <>Itt <M t="x \ge 0" />, ezért az <M t="\arctan(y/x)" /> közvetlenül a jó félsíkba mutat.</>
          )}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. PolarCircleConverterWidget: r = 2a cos θ + 2b sin θ origón átmenő kör   */
/* -------------------------------------------------------------------------- */
export function PolarCircleConverterWidget() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(0);

  const R = Math.hypot(a, b);
  const W = 540;
  const H = 260;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 36;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  return (
    <div className="widget">
      <div className="widget-title">Origón átmenő körök poláregyenlete: r = 2a cos θ + 2b sin θ</div>
      <div className="sliders">
        <label>
          középpont x-koordinátája a = {fmt(a, 1)}
          <input type="range" min={-2} max={2} step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          középpont y-koordinátája b = {fmt(b, 1)}
          <input type="range" min={-2} max={2} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons chips">
        <button className={a === 2 && b === 0 ? 'on' : ''} onClick={() => { setA(2); setB(0); }}>
          r = 4 cos θ
        </button>
        <button className={a === 0 && b === 1.5 ? 'on' : ''} onClick={() => { setA(0); setB(1.5); }}>
          r = 3 sin θ
        </button>
        <button className={a === 1.5 && b === -1 ? 'on' : ''} onClick={() => { setA(1.5); setB(-1); }}>
          r = 3 cos θ − 2 sin θ
        </button>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        {R > 0.05 && <circle cx={X(a)} cy={Y(b)} r={R * sc} className="pl-main" />}
        <circle cx={cx} cy={cy} r={4} fill="#fbbf24" />
        <circle cx={X(a)} cy={Y(b)} r={4.5} fill="#34d399" />
        <text x={X(a) + 8} y={Y(b) - 8} className="pl-label" fill="#34d399">
          C({fmt(a, 1)}; {fmt(b, 1)})
        </text>
      </svg>
      <div className="explain">
        <p>
          Poláralak: <M t={`r = ${fmt(2 * a, 1)}\\cos\\theta ${b >= 0 ? '+' : ''} ${fmt(2 * b, 1)}\\sin\\theta`} />{' '}
          <M t="\Longleftrightarrow" /> Descartes-alak:{' '}
          <M t={`(x - ${fmt(a, 1)})^2 + (y - ${fmt(b, 1)})^2 = ${fmt(R * R, 2)}`} /> (sugár{' '}
          <M t={`R = ${fmt(R, 2)}`} />).
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. PolarLineConverterWidget: r cos(θ − α) = d egyenes poláregyenlete       */
/* -------------------------------------------------------------------------- */
export function PolarLineConverterWidget() {
  const [d, setD] = useState(2);
  const [deg, setDeg] = useState(30);

  const a = (deg * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const fx = d * ca;
  const fy = d * sa;
  // Egyenes irányvektora (-sa, ca)
  const L = 7;

  const W = 540;
  const H = 250;
  const cx = W / 2;
  const cy = H / 2;
  const sc = 32;
  const X = (u: number) => cx + u * sc;
  const Y = (v: number) => cy - v * sc;

  return (
    <div className="widget">
      <div className="widget-title">Egyenes poláregyenlete: r cos(θ − α) = d  (normálalak)</div>
      <div className="sliders">
        <label>
          távolság a pólustól d = {fmt(d, 1)}
          <input type="range" min={0.5} max={3.5} step={0.5} value={d} onChange={(e) => setD(Number(e.target.value))} />
        </label>
        <label>
          normálvektor szöge α = {deg}°
          <input type="range" min={0} max={330} step={15} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={20} y1={cy} x2={W - 20} y2={cy} className="pl-axis" />
        <line x1={cx} y1={14} x2={cx} y2={H - 14} className="pl-axis" />

        <line
          x1={X(fx - L * sa)}
          y1={Y(fy + L * ca)}
          x2={X(fx + L * sa)}
          y2={Y(fy - L * ca)}
          className="pl-alt"
        />
        <line x1={cx} y1={cy} x2={X(fx)} y2={Y(fy)} stroke="#fbbf24" strokeWidth={2.2} strokeDasharray="5 4" />
        <circle cx={X(fx)} cy={Y(fy)} r={4.5} fill="#fbbf24" />
        <text x={X(fx) + 8} y={Y(fy) - 8} className="pl-label" fill="#fbbf24">
          talppont ({fmt(d, 1)}; {deg}°)
        </text>
      </svg>
      <div className="explain">
        <p>
          Descartes-alak: <M t={`${fmt(ca, 2)}x ${sa >= 0 ? '+' : ''} ${fmt(sa, 2)}y = ${fmt(d, 1)}`} />. Speciálisan{' '}
          <M t="\alpha = 0^\circ" /> esetén <M t="r\cos\theta = d" /> (függőleges <M t="x=d" /> egyenes),{' '}
          <M t="\alpha = 90^\circ" /> esetén <M t="r\sin\theta = d" /> (vízszintes <M t="y=d" /> egyenes)!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. PolarSummaryDiagram: 4 alapvető poláregyenlet egy képen                 */
/* -------------------------------------------------------------------------- */
export function PolarSummaryDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A négy leggyakoribb poláregyenlet képe</div>
      <svg className="plane" viewBox="0 0 540 150">
        <rect width={540} height={150} className="pl-bg" />

        <g transform="translate(0, 0)">
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#38bdf8">
            r = a
          </text>
          <line x1={18} y1={76} x2={116} y2={76} className="pl-axis" />
          <line x1={67} y1={32} x2={67} y2={120} className="pl-axis" />
          <circle cx={67} cy={76} r={30} className="pl-main" />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            x² + y² = a²
          </text>
        </g>

        <line x1={135} y1={12} x2={135} y2={140} className="pl-grid" />

        <g transform="translate(135, 0)">
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#fbbf24">
            θ = θ₀
          </text>
          <line x1={18} y1={76} x2={116} y2={76} className="pl-axis" />
          <line x1={67} y1={32} x2={67} y2={120} className="pl-axis" />
          <line x1={32} y1={108} x2={102} y2={44} stroke="#fbbf24" strokeWidth={2.5} />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            y = (tan θ₀) x
          </text>
        </g>

        <line x1={270} y1={12} x2={270} y2={140} className="pl-grid" />

        <g transform="translate(270, 0)">
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#34d399">
            r = 2a cos θ
          </text>
          <line x1={18} y1={76} x2={116} y2={76} className="pl-axis" />
          <line x1={52} y1={32} x2={52} y2={120} className="pl-axis" />
          <circle cx={78} cy={76} r={26} fill="none" stroke="#34d399" strokeWidth={2.5} />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            (x−a)² + y² = a²
          </text>
        </g>

        <line x1={405} y1={12} x2={405} y2={140} className="pl-grid" />

        <g transform="translate(405, 0)">
          <text x={67} y={20} textAnchor="middle" className="pl-label" fill="#fb923c">
            r cos θ = c
          </text>
          <line x1={18} y1={76} x2={116} y2={76} className="pl-axis" />
          <line x1={52} y1={32} x2={52} y2={120} className="pl-axis" />
          <line x1={88} y1={34} x2={88} y2={118} stroke="#fb923c" strokeWidth={2.5} />
          <text x={67} y={138} textAnchor="middle" className="pl-tick">
            x = c egyenes
          </text>
        </g>
      </svg>
    </div>
  );
}
