import { useState } from 'react';
import { M } from './M';
import { Plane, PEnd, PFunc, PLine, PPoint, PSeg } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: Rolle-tétel és feltételei */

type RolleMode = 'ok' | 'corner' | 'jump';

export function RolleWidget() {
  const [mode, setMode] = useState<RolleMode>('ok');

  return (
    <div className="widget">
      <div className="widget-title">Rolle tétele: mikor garantált a vízszintes érintő (f′(c) = 0)?</div>
      <div className="relbuttons chips">
        <button className={mode === 'ok' ? 'on' : ''} onClick={() => setMode('ok')}>
          1. Minden feltétel teljesül
        </button>
        <button className={mode === 'corner' ? 'on' : ''} onClick={() => setMode('corner')}>
          2. Töréspont belül
        </button>
        <button className={mode === 'jump' ? 'on' : ''} onClick={() => setMode('jump')}>
          3. Szakadás a végpontban
        </button>
      </div>
      <Plane xmin={-0.6} xmax={2.8} ymin={-0.6} ymax={2.4}>
        {(m) => (
          <>
            {mode === 'ok' && (
              <>
                <PFunc map={m} fn={(x) => 2 * x - x * x} from={0} to={2} cls="pl-main" />
                <PLine map={m} k={0} b={1} cls="pl-ok" />
                <PEnd map={m} x={0} y={0} closed color="#38bdf8" />
                <PEnd map={m} x={2} y={0} closed color="#38bdf8" />
                <PPoint map={m} x={1} y={1} color="#34d399" label="c = 1 (f′(1) = 0)" dx={10} dy={-10} />
              </>
            )}
            {mode === 'corner' && (
              <>
                <PFunc map={m} fn={(x) => 1.2 - 1.2 * Math.abs(x - 1)} from={0} to={2} cls="pl-main" />
                <PEnd map={m} x={0} y={0} closed color="#38bdf8" />
                <PEnd map={m} x={2} y={0} closed color="#38bdf8" />
                <PPoint map={m} x={1} y={1.2} color="#f87171" label="f′(1) nem létezik!" dx={10} dy={-8} />
              </>
            )}
            {mode === 'jump' && (
              <>
                <PFunc map={m} fn={(x) => 0.8 * x} from={0} to={1.99} cls="pl-main" />
                <PEnd map={m} x={0} y={0} closed color="#38bdf8" />
                <PEnd map={m} x={2} y={1.6} closed={false} color="#f87171" />
                <PEnd map={m} x={2} y={0} closed color="#38bdf8" />
              </>
            )}
          </>
        )}
      </Plane>
      <div className="result">
        {mode === 'ok' && (
          <p>
            <strong>Folytonos <M t="[0;\,2]" />-n, differenciálható <M t="(0;\,2)" />-n és <M t="f(0)=f(2)=0" />:</strong> biztosan van vízszintes érintő (<M t="c=1" />)!
          </p>
        )}
        {mode === 'corner' && (
          <p>
            <strong>Hiányzik a differenciálhatóság:</strong> <M t="f(x)=1{,}2-1{,}2|x-1|" /> folytonos és <M t="f(0)=f(2)=0" />, de <M t="x=1" />-nél töréspont van — sehol sincs vízszintes érintő!
          </p>
        )}
        {mode === 'jump' && (
          <p>
            <strong>Hiányzik a végponti folytonosság:</strong> <M t="f(0)=f(2)=0" /> és belül végig <M t="f'(x)=0{,}8" />, de <M t="x=2" />-nél leugrik — nincs vízszintes érintő!
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Egyetlen gyök bizonyítása */

export function UniqueRootDiagram() {
  const f = (x: number) => x * x * x + 3 * x + 1;
  // Közelítő gyök: x ≈ -0.3222
  const root = -0.3222;
  return (
    <div className="widget">
      <div className="widget-title">Bolzano + Rolle párosa: f(x) = x³ + 3x + 1 pontosan 1 valós gyökkel rendelkezik</div>
      <Plane xmin={-1.6} xmax={1.4} ymin={-3.5} ymax={3.5}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} cls="pl-main" />
            <PPoint map={m} x={-1} y={-3} color="#fb923c" label="f(−1) = −3 < 0" dx={10} dy={6} />
            <PPoint map={m} x={0} y={1} color="#34d399" label="f(0) = +1 > 0" dx={10} dy={-8} />
            <PPoint map={m} x={root} y={0} color="#fbbf24" label="egyetlen gyök" dx={-88} dy={-12} />
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          <strong>1. Bolzano-tétel:</strong> <M t="f(-1)=-3 < 0 < 1=f(0)" /> → <em>legalább 1</em> gyök van.{' '}
          <strong>2. Rolle tétele:</strong> ha lenne 2 gyök, köztük lenne <M t="f'(c)=0" />, de <M t="f'(x)=3x^2+3 \ge 3 > 0" />! → <em>legfeljebb 1</em> gyök!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: Lagrange-féle középértéktétel */

type MvtCase = {
  id: string;
  label: string;
  f: (x: number) => number;
  df: (x: number) => number;
  a: number;
  b: number;
  cExact: number;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
};

const MVT_CASES: MvtCase[] = [
  {
    id: 'quad',
    label: 'f(x) = x²  az [0; 2]-n',
    f: (x) => x * x,
    df: (x) => 2 * x,
    a: 0,
    b: 2,
    cExact: 1,
    xmin: -0.6,
    xmax: 2.6,
    ymin: -0.6,
    ymax: 4.6,
  },
  {
    id: 'sqrt',
    label: 'f(x) = √x  az [0; 4]-en',
    f: (x) => (x >= 0 ? Math.sqrt(x) : NaN),
    df: (x) => 1 / (2 * Math.sqrt(x)),
    a: 0,
    b: 4,
    cExact: 1,
    xmin: -0.5,
    xmax: 4.5,
    ymin: -0.5,
    ymax: 2.8,
  },
  {
    id: 'cubic',
    label: 'f(x) = ½x³ − x  az [0; 2]-n',
    f: (x) => 0.5 * x * x * x - x,
    df: (x) => 1.5 * x * x - 1,
    a: 0,
    b: 2,
    cExact: Math.sqrt(4 / 3), // ≈ 1.155
    xmin: -0.5,
    xmax: 2.5,
    ymin: -1.0,
    ymax: 2.8,
  },
];

export function LagrangeSecantWidget() {
  const [cid, setCid] = useState('quad');
  const cur = MVT_CASES.find((k) => k.id === cid) ?? MVT_CASES[0];
  const [x, setX] = useState(0.5);

  const fa = cur.f(cur.a);
  const fb = cur.f(cur.b);
  const secSlope = (fb - fa) / (cur.b - cur.a);
  const clampedX = Math.max(cur.a + 0.1, Math.min(cur.b - 0.1, x));
  const fx = cur.f(clampedX);
  const tanSlope = cur.df(clampedX);
  const match = Math.abs(tanSlope - secSlope) < 0.08;

  return (
    <div className="widget">
      <div className="widget-title">Lagrange-tétel: találd meg a c pontot, ahol az érintő párhuzamos a szelővel!</div>
      <div className="relbuttons chips">
        {MVT_CASES.map((k) => (
          <button
            key={k.id}
            className={cid === k.id ? 'on' : ''}
            onClick={() => {
              setCid(k.id);
              setX(k.a + (k.b - k.a) * 0.25);
            }}
          >
            {k.label}
          </button>
        ))}
      </div>
      <label>
        mozgó pont: x = {round(clampedX, 2)} (érintő: f′(x) = {round(tanSlope, 2)} | szelő: {round(secSlope, 2)})
        <input
          type="range"
          min={cur.a + 0.1}
          max={cur.b - 0.1}
          step={0.05}
          value={clampedX}
          onChange={(e) => setX(Number(e.target.value))}
        />
      </label>
      <Plane xmin={cur.xmin} xmax={cur.xmax} ymin={cur.ymin} ymax={cur.ymax}>
        {(m) => (
          <>
            <PFunc map={m} fn={cur.f} from={cur.a} to={cur.b} cls="pl-main" />
            <PSeg map={m} x1={cur.a} y1={fa} x2={cur.b} y2={fb} cls="pl-dash" />
            <PLine map={m} k={tanSlope} b={fx - tanSlope * clampedX} cls={match ? 'pl-ok' : 'pl-alt'} />
            <PEnd map={m} x={cur.a} y={fa} closed color="#38bdf8" />
            <PEnd map={m} x={cur.b} y={fb} closed color="#38bdf8" />
            <PPoint map={m} x={clampedX} y={fx} color={match ? '#34d399' : '#fb923c'} label={match ? 'PÁRHUZAMOS!' : 'x'} dx={10} dy={-10} />
          </>
        )}
      </Plane>
      <div className="result">
        <M
          block
          t={`\\text{Szelő: } \\frac{f(b)-f(a)}{b-a} = ${tx(secSlope, 2)}, \\quad f'(${tx(clampedX, 2)}) = ${tx(tanSlope, 2)} \\quad (\\text{pontos } c \\approx ${tx(cur.cExact, 2)})`}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Szekciókontroll (átlagsebesség) */

export function SpeedTrapWidget() {
  const [mins, setMins] = useState(4.2); // perc 10 km-re
  const dist = 10; // km
  const avgSpeed = (dist / mins) * 60; // km/h
  const speeding = avgSpeed > 130;

  // Sima út-idő görbe s(t) a [0, mins] intervallumon, ami gyorsít majd lassít:
  // s(t) = dist * (u + 0.18 * sin(2*pi*u) / (2*pi)) ahol u = t / mins
  const s = (u: number) => dist * (u + (0.28 * Math.sin(2 * Math.PI * u)) / (2 * Math.PI));
  // s'(u) = dist * (1 + 0.28 * cos(2*pi*u)) → átlaggal egyenlő: cos(2*pi*u) = 0 → u = 0.25 és u = 0.75!

  return (
    <div className="widget">
      <div className="widget-title">A középértéktétel az autópályán: átlagsebesség-mérő kapu (10 km-es szakasz)</div>
      <label>
        a 10 km-es szakasz megtételének ideje: {round(mins, 1)} perc (átlagsebesség: {round(avgSpeed, 1)} km/h)
        <input type="range" min={3.5} max={7.5} step={0.1} value={mins} onChange={(e) => setMins(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="Átlagsebesség és pillanatnyi sebesség">
        <rect width={540} height={165} className="pl-bg" />
        {/* Tengelyek */}
        <line x1={55} y1={135} x2={340} y2={135} stroke="#94a3b8" strokeWidth={1.6} />
        <line x1={55} y1={20} x2={55} y2={135} stroke="#94a3b8" strokeWidth={1.6} />
        {/* Szelő (átlagsebesség) */}
        <line x1={55} y1={135} x2={325} y2={30} stroke="#f59e0b" strokeWidth={1.8} strokeDasharray="6 4" />
        {/* Út-idő görbe */}
        <path
          d={Array.from({ length: 61 }, (_, i) => {
            const u = i / 60;
            const px = 55 + u * 270;
            const py = 135 - (s(u) / dist) * 105;
            return `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`;
          }).join(' ')}
          className="pl-main"
        />
        {/* Két c pont (u = 0.25 és u = 0.75) */}
        {[0.25, 0.75].map((u) => {
          const px = 55 + u * 270;
          const py = 135 - (s(u) / dist) * 105;
          return <circle key={u} cx={px} cy={py} r={5.5} fill={speeding ? '#f87171' : '#34d399'} stroke="#0b0e24" strokeWidth={1.5} />;
        })}
        <text x={190} y={155} textAnchor="middle" fill="#94a3b8" fontSize={11.5}>idő (0 → {round(mins, 1)} perc)</text>
        <text x={45} y={32} textAnchor="end" fill="#94a3b8" fontSize={11}>10 km</text>
        {/* Jobb oldali ítéletkártya */}
        <rect
          x={358}
          y={24}
          width={166}
          height={115}
          rx={10}
          fill={speeding ? 'rgba(248, 113, 113, 0.14)' : 'rgba(52, 211, 153, 0.14)'}
          stroke={speeding ? '#f87171' : '#34d399'}
          strokeWidth={1.6}
        />
        <text x={441} y={50} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>Átlagsebesség:</text>
        <text x={441} y={78} textAnchor="middle" fill={speeding ? '#fca5a5' : '#6ee7b7'} fontSize={20} fontWeight={700}>
          {round(avgSpeed, 1)} km/h
        </text>
        <text x={441} y={104} textAnchor="middle" fill={speeding ? '#f87171' : '#34d399'} fontSize={12} fontWeight={700}>
          {speeding ? 'BÍRSÁG! (> 130 km/h)' : 'SZABÁLYOS (≤ 130)'}
        </text>
        <text x={441} y={124} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>
          Lagrange: biztosan ment ennyivel!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Azonos derivált → konstans eltérés */

export function ParallelCurvesWidget() {
  const [c, setC] = useState(1);
  const f = (x: number, k: number) => 0.4 * x * x + k;
  const x0 = 1.5;
  const slope = 0.8 * x0; // 1.2

  return (
    <div className="widget">
      <div className="widget-title">2. következmény: ha f′(x) = g′(x), a görbék csak egy +C eltolásban különböznek</div>
      <label>
        eltolási konstans: C = {round(c, 1)} (mindegyik görbe deriváltja f′(x) = 0,8x)
        <input type="range" min={-2.5} max={2.5} step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
      </label>
      <Plane xmin={-3} xmax={3} ymin={-3} ymax={4.5}>
        {(m) => (
          <>
            {[-2, 0, 2].map((k) => (
              <PFunc key={k} map={m} fn={(x) => f(x, k)} cls="pl-ghost" />
            ))}
            <PFunc map={m} fn={(x) => f(x, c)} cls="pl-main" />
            <PLine map={m} k={slope} b={f(x0, c) - slope * x0} cls="pl-alt" />
            <PPoint map={m} x={x0} y={f(x0, c)} color="#fbbf24" label={`f′(1,5) = ${round(slope, 1)}`} dx={10} dy={-8} />
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          Akármennyire tolod fel-le a <M t="C" /> konstanst, <M t="x=1{,}5" />-nél az érintő meredeksége <strong>mindig pontosan <M t="1{,}2" /></strong> marad! Egyetlen kezdeti pont megadása rögzíti <M t="C" />-t.
        </p>
      </div>
    </div>
  );
}
