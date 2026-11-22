import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PPoint } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: 6 lépéses optimalizálási stratégia */

export function OptStepsDiagram() {
  const steps = [
    { n: '1. Rajz + jelölés', t: 'Ábra, adatok, változók', s: 'Mi a cél?', c: '#38bdf8' },
    { n: '2. Célfüggvény', t: 'Q = f(x, y)', s: 'max vagy min?', c: '#38bdf8' },
    { n: '3. Mellékfeltétel', t: 'y kifejezése x-szel', s: '1 változó marad!', c: '#34d399' },
    { n: '4. Tartomány', t: 'Reális x-intervallum', s: 'zárt vagy nyílt?', c: '#34d399' },
    { n: '5. Deriválás', t: 'f′(x) = 0 keresése', s: 'kritikus pontok', c: '#fb923c' },
    { n: '6. Igazolás!', t: 'Végpontok / f″ teszt', s: 'biztos abs. opt.?', c: '#fbbf24' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">Az alkalmazott optimalizálás 6 lépéses receptje</div>
      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="6 lépéses optimalizálás">
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

/* ------------------------------------------------------------------ 2. oldal: 24×24 cm nyitott doboz */

export function OpenBoxWidget() {
  const [x, setX] = useState(4);
  const side = 24;
  const base = side - 2 * x;
  const vol = x * base * base;
  const isOpt = Math.abs(x - 4) < 0.05;

  // Bal oldali kartonrajz: 150×150 px → 24 cm
  const ox = 32;
  const oy = 25;
  const S = 150;
  const cut = (x / side) * S;

  // Jobb oldali V(x) görbe: x ∈ [0, 12], V ∈ [0, 1100]
  const gx = (t: number) => 235 + (t / 12) * 280;
  const gy = (v: number) => 172 - (v / 1150) * 140;

  return (
    <div className="widget">
      <div className="widget-title">Nyitott doboz 24 × 24 cm-es kartonból: V(x) = x(24 − 2x)²</div>
      <label>
        sarkokból kivágott négyzet oldala: x = {round(x, 1)} cm (alap: {round(base, 1)} × {round(base, 1)} cm)
        <input type="range" min={0.5} max={11.5} step={0.5} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 198" className="plane" role="img" aria-label="Nyitott doboz optimalizálása">
        <rect width={540} height={198} className="pl-bg" />
        {/* Kartonlap */}
        <rect x={ox} y={oy} width={S} height={S} fill="rgba(56, 189, 248, 0.16)" stroke="#38bdf8" strokeWidth={1.8} />
        {/* 4 kivágott sarok */}
        {[
          [ox, oy],
          [ox + S - cut, oy],
          [ox, oy + S - cut],
          [ox + S - cut, oy + S - cut],
        ].map(([cx, cy], i) => (
          <rect key={i} x={cx} y={cy} width={cut} height={cut} fill="rgba(248, 113, 113, 0.35)" stroke="#f87171" strokeWidth={1.3} />
        ))}
        {/* Belső alaplap szaggatott */}
        <rect x={ox + cut} y={oy + cut} width={S - 2 * cut} height={S - 2 * cut} fill="rgba(52, 211, 153, 0.18)" stroke="#34d399" strokeDasharray="4 3" strokeWidth={1.5} />
        <text x={ox + S / 2} y={oy + S + 16} textAnchor="middle" fill="#cbd5e1" fontSize={11}>24 cm (kivágás: x = {round(x, 1)})</text>

        {/* Jobb oldali V(x) grafikon */}
        <line x1={235} y1={172} x2={520} y2={172} stroke="#94a3b8" strokeWidth={1.5} />
        <line x1={235} y1={24} x2={235} y2={172} stroke="#94a3b8" strokeWidth={1.5} />
        <path
          d={Array.from({ length: 61 }, (_, i) => {
            const t = (i / 60) * 12;
            const v = t * (24 - 2 * t) ** 2;
            return `${i === 0 ? 'M' : 'L'}${gx(t).toFixed(1)},${gy(v).toFixed(1)}`;
          }).join(' ')}
          className="pl-main"
        />
        <circle cx={gx(4)} cy={gy(1024)} r={5} fill="#fbbf24" />
        <text x={gx(4) + 8} y={gy(1024) - 6} fill="#fbbf24" fontSize={11} fontWeight={700}>MAX: 1024 cm³ (x=4)</text>
        <circle cx={gx(x)} cy={gy(vol)} r={6} fill={isOpt ? '#34d399' : '#fb923c'} stroke="#0b0e24" strokeWidth={1.5} />
        <text x={375} y={190} textAnchor="middle" fill="#94a3b8" fontSize={11}>x ∈ [0; 12] cm</text>
      </svg>
      <div className="result">
        <M block t={`V(${tx(x, 1)}) = ${tx(x, 1)}\\cdot(${tx(base, 1)})^2 = ${tx(vol, 1)}\\;\\text{cm}^3 ${isOpt ? '\\;\\text{(OPTIMUM!)}' : ''}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: 1 literes konzervdoboz (h = 2r) */

export function CanOptWidget() {
  const [r, setR] = useState(5.4); // cm, V = 1000 cm³
  const V = 1000;
  const h = V / (Math.PI * r * r);
  const S = 2 * Math.PI * r * r + (2 * V) / r;
  const rOpt = Math.cbrt(500 / Math.PI); // ≈ 5.419
  const sOpt = 2 * Math.PI * rOpt * rOpt + (2 * V) / rOpt; // ≈ 553.58
  const isOpt = Math.abs(r - rOpt) < 0.25;

  // Vizuális méret
  const rw = Math.min(82, Math.max(18, r * 8.5));
  const hh = Math.min(132, Math.max(14, h * 4.5));
  const cx = 125;
  const bot = 162;

  return (
    <div className="widget">
      <div className="widget-title">1 literes (1000 cm³) konzervdoboz: minimális fémfelület S(r) = 2πr² + 2000/r</div>
      <label>
        alaplap sugara: r = {round(r, 1)} cm → magasság: h = {round(h, 1)} cm (arány h/d = {round(h / (2 * r), 2)})
        <input type="range" min={3.0} max={9.5} step={0.1} value={r} onChange={(e) => setR(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 190" className="plane" role="img" aria-label="Konzervdoboz optimalizálás">
        <rect width={540} height={190} className="pl-bg" />
        {/* Henger */}
        <rect
          x={cx - rw}
          y={bot - hh}
          width={2 * rw}
          height={hh}
          fill={isOpt ? 'rgba(52, 211, 153, 0.25)' : 'rgba(56, 189, 248, 0.22)'}
          stroke={isOpt ? '#34d399' : '#38bdf8'}
          strokeWidth={2}
        />
        <ellipse cx={cx} cy={bot - hh} rx={rw} ry={10} fill="rgba(56, 189, 248, 0.3)" stroke={isOpt ? '#34d399' : '#38bdf8'} strokeWidth={1.8} />
        <ellipse cx={cx} cy={bot} rx={rw} ry={10} fill="none" stroke={isOpt ? '#34d399' : '#38bdf8'} strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={cx} y={182} textAnchor="middle" fill="#cbd5e1" fontSize={11}>d = {round(2 * r, 1)} cm, h = {round(h, 1)} cm</text>

        {/* Jobb oldali adatpanel */}
        <rect x={255} y={24} width={265} height={140} rx={10} fill="rgba(255,255,255,0.04)" stroke={isOpt ? '#34d399' : '#94a3b8'} strokeWidth={1.5} />
        <text x={272} y={52} fill="#94a3b8" fontSize={12}>Aktuális fémfelület:</text>
        <text x={272} y={80} fill={isOpt ? '#34d399' : '#fbbf24'} fontSize={22} fontWeight={700}>{round(S, 1)} cm²</text>
        <text x={272} y={110} fill="#cbd5e1" fontSize={12}>Elméleti minimum: {round(sOpt, 1)} cm²</text>
        <text x={272} y={132} fill="#cbd5e1" fontSize={11.5}>Optimális sugár: r ≈ 5,42 cm (h = 2r!)</text>
        <text x={272} y={152} fill={isOpt ? '#34d399' : '#94a3b8'} fontSize={11} fontWeight={600}>
          {isOpt ? '✓ Négyzetes metszet: h ≈ d (OPTIMUM!)' : 'Állítsd r ≈ 5,4 cm-re, ahol h = 2r!'}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Félkörbe írt téglalap */

export function InscribedRectWidget() {
  const [x, setX] = useState(2.8);
  const R = 4;
  const y = Math.sqrt(Math.max(0, R * R - x * x));
  const area = 2 * x * y;
  const xOpt = R / Math.SQRT2; // ≈ 2.828
  const isOpt = Math.abs(x - xOpt) < 0.12;

  return (
    <div className="widget">
      <div className="widget-title">Félkörbe (R = 4) írt legnagyobb területű téglalap: A(x) = 2x√(16 − x²)</div>
      <label>
        fél-szélesség: x = {round(x, 2)} (szélesség: {round(2 * x, 2)}, magasság: y = {round(y, 2)})
        <input type="range" min={0.2} max={3.9} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <Plane xmin={-4.8} xmax={4.8} ymin={-0.6} ymax={4.8}>
        {(m) => (
          <>
            <PFunc map={m} fn={(t) => (Math.abs(t) <= R ? Math.sqrt(R * R - t * t) : NaN)} from={-R} to={R} cls="pl-main" />
            <rect
              x={m.X(-x)}
              y={m.Y(y)}
              width={m.X(x) - m.X(-x)}
              height={m.Y(0) - m.Y(y)}
              fill={isOpt ? 'rgba(52, 211, 153, 0.28)' : 'rgba(251, 191, 36, 0.22)'}
              stroke={isOpt ? '#34d399' : '#fbbf24'}
              strokeWidth={2.2}
            />
            <PPoint map={m} x={x} y={y} color={isOpt ? '#34d399' : '#fbbf24'} label={`(${round(x, 1)}; ${round(y, 1)})`} dx={8} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`A(${tx(x, 2)}) = 2\\cdot ${tx(x, 2)}\\cdot ${tx(y, 2)} = ${tx(area, 2)} \\quad (\\text{maximum: } R^2 = 16 \\text{ az } x=2\\sqrt{2}\\approx 2{,}83\\text{ helyen})`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Kábelhúzás / vízimentő */

export function LifeguardWidget() {
  const [x, setX] = useState(2.25); // km a folyó túlpartján
  const w = 3; // folyó szélessége (km)
  const L = 8; // város távolsága (km)
  const waterLen = Math.sqrt(w * w + x * x);
  const landLen = L - x;
  const cost = 5 * waterLen + 3 * landLen; // millió Ft
  const isOpt = Math.abs(x - 2.25) < 0.15;

  const px = (km: number) => 45 + (km / L) * 450;
  const yTop = 36;
  const yBot = 140;

  return (
    <div className="widget">
      <div className="widget-title">Kábelhúzás folyón át: vízben 5 M Ft/km, szárazföldön 3 M Ft/km</div>
      <label>
        partraszállási pont: x = {round(x, 2)} km (víz alatt: {round(waterLen, 2)} km, szárazföldön: {round(landLen, 2)} km)
        <input type="range" min={0} max={8} step={0.25} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 176" className="plane" role="img" aria-label="Kábelhúzás folyón át">
        <rect width={540} height={176} className="pl-bg" />
        {/* Folyó sáv */}
        <rect x={20} y={yTop} width={500} height={yBot - yTop} fill="rgba(56, 189, 248, 0.16)" />
        <line x1={20} y1={yTop} x2={520} y2={yTop} stroke="#38bdf8" strokeWidth={1.6} />
        <line x1={20} y1={yBot} x2={520} y2={yBot} stroke="#34d399" strokeWidth={2} />
        {/* Víz alatti kábel */}
        <line x1={px(0)} y1={yTop} x2={px(x)} y2={yBot} stroke="#fb923c" strokeWidth={3} />
        {/* Szárazföldi kábel */}
        <line x1={px(x)} y1={yBot} x2={px(L)} y2={yBot} stroke="#fbbf24" strokeWidth={3.5} />
        {/* Pontok */}
        <circle cx={px(0)} cy={yTop} r={6} fill="#38bdf8" />
        <circle cx={px(x)} cy={yBot} r={6} fill={isOpt ? '#34d399' : '#fb923c'} />
        <circle cx={px(L)} cy={yBot} r={6} fill="#fbbf24" />
        <text x={px(0) + 10} y={yTop - 8} fill="#7dd3fc" fontSize={11.5}>Erőmű (A)</text>
        <text x={px(L) - 55} y={yBot + 20} fill="#fde68a" fontSize={11.5}>Város (8 km)</text>
        <text x={px(x)} y={yBot + 20} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>x = {round(x, 2)} km</text>
        <text x={28} y={(yTop + yBot) / 2} fill="#7dd3fc" fontSize={11}>3 km</text>
      </svg>
      <div className="result">
        <M block t={`K(${tx(x, 2)}) = 5\\sqrt{9+${tx(x, 2)}^2} + 3(8-${tx(x, 2)}) = ${tx(cost, 2)}\\text{ M Ft} ${isOpt ? '\\;\\text{(MINIMUM: 36 M Ft!)}' : ''}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal: Profitmaximalizálás (MR = MC) */

export function ProfitOptWidget() {
  const [x, setX] = useState(4.6); // ezer db
  // R(x) = 9x, C(x) = x³ - 6x² + 15x → P(x) = -x³ + 6x² - 6x
  // P'(x) = -3x² + 12x - 6 = 0 → x = 2 + √2 ≈ 3.414 (max), 2 - √2 ≈ 0.586 (min)
  // Skálázás a rajzhoz (÷10):
  const R = (t: number) => 9 * t;
  const C = (t: number) => t ** 3 - 6 * t * t + 15 * t;
  const P = (t: number) => R(t) - C(t);
  const xOpt = 2 + Math.SQRT2; // ≈ 3.414
  const isOpt = Math.abs(x - xOpt) < 0.15;

  return (
    <div className="widget">
      <div className="widget-title">Profitmaximalizálás: R(x) = 9x, C(x) = x³ − 6x² + 15x (MR = MC)</div>
      <label>
        termelt mennyiség: x = {round(x, 2)} ezer db (R = {round(R(x), 1)}, C = {round(C(x), 1)}, Profit P = {round(P(x), 2)})
        <input type="range" min={0.2} max={5.6} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <Plane xmin={0} xmax={6} ymin={-1} ymax={6.2}>
        {(m) => (
          <>
            <PFunc map={m} fn={(t) => R(t) / 10} from={0} to={6} cls="pl-ok" />
            <PFunc map={m} fn={(t) => C(t) / 10} from={0} to={6} cls="pl-alt" />
            <line
              x1={m.X(x)}
              y1={m.Y(C(x) / 10)}
              x2={m.X(x)}
              y2={m.Y(R(x) / 10)}
              stroke={P(x) >= 0 ? '#fbbf24' : '#f87171'}
              strokeWidth={3.5}
            />
            <PPoint map={m} x={x} y={R(x) / 10} color="#34d399" label="R" dx={8} dy={-8} />
            <PPoint map={m} x={x} y={C(x) / 10} color="#fb923c" label="C" dx={8} dy={14} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`P(${tx(x, 2)}) = R(${tx(x, 2)}) - C(${tx(x, 2)}) = ${tx(P(x), 2)} \\quad (\\text{max: } x = 2+\\sqrt{2}\\approx 3{,}41,\\; P\\approx 7{,}31)`} />
        <p>
          <strong>Zöld:</strong> bevétel (<M t="R" />), <strong>narancs:</strong> költség (<M t="C" />), <strong>sárga szakasz:</strong> a profit! Pontosan ott a leghosszabb a sárga rés, ahol a két görbe érintője párhuzamos (<M t="R'(x)=C'(x)" />)!
        </p>
      </div>
    </div>
  );
}
