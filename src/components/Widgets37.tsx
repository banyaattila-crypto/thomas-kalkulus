import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';

const tx = (n: number, d = 3) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: 6 lépéses folyamatábra */

export function RelatedRatesStepsDiagram() {
  const steps = [
    { n: '1. Rajz', t: 'Ábra + jelölések', s: 't az idő!', c: '#38bdf8' },
    { n: '2. Adatok', t: 'Ismert deriváltak', s: 'csökken → negatív', c: '#38bdf8' },
    { n: '3. Cél', t: 'Mit keresünk?', s: 'melyik pillanatban?', c: '#34d399' },
    { n: '4. Egyenlet', t: 'Geometriai kapcsolat', s: 'Pitagorasz, V, tg…', c: '#34d399' },
    { n: '5. Deriválj!', t: 't szerint (láncszab.)', s: 'NE írj be előre!', c: '#fb923c' },
    { n: '6. Számolj', t: 'Behelyettesítés', s: 'egységek + előjel', c: '#fbbf24' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">A kapcsolt deriváltak 6 lépéses receptje</div>
      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="6 lépéses folyamatábra">
        <rect width={540} height={165} className="pl-bg" />
        {steps.map((st, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = 16 + col * 176;
          const y = 14 + row * 76;
          return (
            <g key={st.n}>
              <rect x={x} y={y} width={156} height={62} rx={10} fill="rgba(255,255,255,0.04)" stroke={st.c} strokeWidth={1.6} />
              <text x={x + 78} y={y + 20} textAnchor="middle" fill={st.c} className="pl-label">{st.n}</text>
              <text x={x + 78} y={y + 38} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>{st.t}</text>
              <text x={x + 78} y={y + 53} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>{st.s}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: falnak támasztott csúszó létra */

export function SlidingLadderWidget() {
  const [x, setX] = useState(3);
  const L = 5;
  const dxdt = 0.6; // m/s
  const y = Math.sqrt(Math.max(0.01, L * L - x * x));
  const dydt = -(x / y) * dxdt;

  const ox = 80;
  const oy = 215;
  const sc = 36;
  const xPx = ox + x * sc;
  const yPx = oy - y * sc;

  return (
    <div className="widget">
      <div className="widget-title">A csúszó 5 méteres létra: x² + y² = 25</div>
      <label>
        a létra aljának távolsága a faltól: x = {round(x, 2)} m (állandó kihúzás: dx/dt = +0,6 m/s)
        <input type="range" min={0.6} max={4.8} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 360 245" className="plane" role="img" aria-label="Falnak támasztott csúszó létra">
        <rect width={360} height={245} className="pl-bg" />
        {/* Fal és padló */}
        <line x1={ox} y1={20} x2={ox} y2={oy} stroke="#94a3b8" strokeWidth={3} />
        <line x1={ox} y1={oy} x2={320} y2={oy} stroke="#94a3b8" strokeWidth={3} />
        {/* Létra */}
        <line x1={ox} y1={yPx} x2={xPx} y2={oy} stroke="#fbbf24" strokeWidth={5} strokeLinecap="round" />
        <circle cx={ox} cy={yPx} r={5.5} fill="#fb923c" />
        <circle cx={xPx} cy={oy} r={5.5} fill="#34d399" />
        {/* Feliratok */}
        <text x={ox - 12} y={(oy + yPx) / 2} textAnchor="end" fill="#fb923c" className="pl-label">
          y = {round(y, 2)} m
        </text>
        <text x={(ox + xPx) / 2} y={oy + 18} textAnchor="middle" fill="#34d399" className="pl-label">
          x = {round(x, 2)} m
        </text>
        <text x={(ox + xPx) / 2 + 16} y={(oy + yPx) / 2 - 8} fill="#fde68a" className="pl-label">
          L = 5 m
        </text>
      </svg>
      <div className="result">
        <M block t={`\\frac{dy}{dt} = -\\frac{x}{y}\\frac{dx}{dt} = -\\frac{${tx(x, 2)}}{${tx(y, 2)}}\\cdot 0{,}6 = ${tx(dydt, 3)}\\text{ m/s}`} />
        <p>
          Húzd <M t="x" />-et 4,8 m felé: bár az alját egyenletesen húzzuk, a teteje a padlóhoz érve <strong>egyre gyorsabban</strong> csapódik le!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: kúpos tartály töltése */

export function ConeTankWidget() {
  const [h, setH] = useState(60); // cm, H = 100 cm, R = 50 cm → r = h/2
  const r = h / 2;
  const dVdt = 9000; // 9 liter/perc = 9000 cm³/perc
  // V = (pi/12) h³ → dV/dt = (pi/4) h² dh/dt → dh/dt = 4 dV/dt / (pi h²)
  const dhdt = (4 * dVdt) / (Math.PI * h * h);

  const cx = 180;
  const yTop = 30;
  const yBot = 210;
  const Hpx = yBot - yTop; // 180 px = 100 cm
  const Rpx = 90; // 90 px = 50 cm
  const yWater = yBot - (h / 100) * Hpx;
  const rWater = (r / 50) * Rpx;

  return (
    <div className="widget">
      <div className="widget-title">Kúpos tartály (R = 50 cm, H = 100 cm): hasonlósággal r = h / 2</div>
      <label>
        vízmagasság: h = {h} cm (vízfelszín sugara: r = {round(r, 1)} cm, befolyás: 9 liter/perc)
        <input type="range" min={15} max={95} step={5} value={h} onChange={(e) => setH(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 360 235" className="plane" role="img" aria-label="Kúpos tartály vízzel">
        <rect width={360} height={235} className="pl-bg" />
        {/* Víz */}
        <polygon points={`${cx},${yBot} ${cx - rWater},${yWater} ${cx + rWater},${yWater}`} fill="rgba(56, 189, 248, 0.32)" stroke="#38bdf8" strokeWidth={1.8} />
        {/* Kúp körvonala */}
        <polygon points={`${cx},${yBot} ${cx - Rpx},${yTop} ${cx + Rpx},${yTop}`} fill="none" stroke="#cbd5e1" strokeWidth={2.2} />
        {/* Tengely és r */}
        <line x1={cx} y1={yTop} x2={cx} y2={yBot} className="pl-dash2" />
        <line x1={cx} y1={yWater} x2={cx + rWater} y2={yWater} stroke="#fbbf24" strokeWidth={2.2} />
        <text x={cx + rWater / 2} y={yWater - 6} textAnchor="middle" fill="#fbbf24" className="pl-label">r = {round(r, 0)}</text>
        <text x={cx - 8} y={(yBot + yWater) / 2} textAnchor="end" fill="#7dd3fc" className="pl-label">h = {h}</text>
      </svg>
      <div className="result">
        <M block t={`V=\\frac{\\pi}{12}h^3 \\;\\Longrightarrow\\; \\frac{dh}{dt}=\\frac{4}{\\pi h^2}\\frac{dV}{dt} = ${tx(dhdt, 2)}\\text{ cm/perc}`} />
        <p>
          Alul (kis <M t="h" />-nál) szűk a kúp, ezért a vízszint rohamosan emelkedik; felül kiszélesedik, így az emelkedés lelassul!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: emelkedő hőlégballon és szög */

export function BalloonAngleWidget() {
  const [theta, setTheta] = useState(0.785); // pi/4
  const dist = 500; // m
  const dthdt = 0.14; // rad/perc
  const y = dist * Math.tan(theta);
  const sec2 = 1 / (Math.cos(theta) ** 2);
  const dydt = dist * sec2 * dthdt;

  const ox = 50;
  const oy = 210;
  const bx = 270;
  const by = Math.max(24, oy - Math.min(185, (y / 1200) * 180));

  return (
    <div className="widget">
      <div className="widget-title">Emelkedő hőlégballon: y = 500 · tg θ</div>
      <label>
        látószög: θ = {round(theta, 2)} rad ({round((theta * 180) / Math.PI, 1)}°), dθ/dt = 0,14 rad/perc
        <input type="range" min={0.15} max={1.25} step={0.05} value={theta} onChange={(e) => setTheta(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 360 235" className="plane" role="img" aria-label="Emelkedő hőlégballon szöge">
        <rect width={360} height={235} className="pl-bg" />
        <line x1={ox} y1={oy} x2={bx} y2={oy} stroke="#94a3b8" strokeWidth={2.2} />
        <line x1={bx} y1={oy} x2={bx} y2={by} stroke="#38bdf8" strokeWidth={2.2} strokeDasharray="5 4" />
        <line x1={ox} y1={oy} x2={bx} y2={by} stroke="#fb923c" strokeWidth={2.2} />
        <circle cx={bx} cy={by} r={12} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
        <circle cx={ox} cy={oy} r={5} fill="#34d399" />
        <text x={(ox + bx) / 2} y={oy + 18} textAnchor="middle" fill="#cbd5e1" className="pl-label">500 m</text>
        <text x={bx + 10} y={(oy + by) / 2} fill="#7dd3fc" className="pl-label">y ≈ {round(y, 0)} m</text>
        <text x={ox + 32} y={oy - 8} fill="#fb923c" className="pl-label">θ</text>
      </svg>
      <div className="result">
        <M block t={`\\frac{dy}{dt} = 500\\sec^2\\theta\\cdot\\frac{d\\theta}{dt} = 500\\cdot ${tx(sec2, 2)}\\cdot 0{,}14 \\approx ${tx(dydt, 1)}\\text{ m/perc}`} />
      </div>
    </div>
  );
}
