import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: Cavalieri-elv (érmetorony eltolása) */

export function CavalieriSlicingWidget() {
  const [tilt, setTilt] = useState(0);
  const [slice, setSlice] = useState(6);
  const layers = 11;

  return (
    <div className="widget">
      <div className="widget-title">Cavalieri-elv és szeletelés — dőljön bárhogy, a térfogat azonos!</div>
      <label>
        Ferde eltolás (nyírás): <strong>{tilt === 0 ? 'egyenes' : `${tilt > 0 ? '+' : ''}${tilt} px`}</strong>
        <input type="range" min={-55} max={55} step={5} value={tilt} onChange={(e) => setTilt(Number(e.target.value))} />
      </label>
      <label>
        Kiemelt szelet magassága: <strong>{slice}. réteg</strong>
        <input type="range" min={1} max={layers} step={1} value={slice} onChange={(e) => setSlice(Number(e.target.value))} />
      </label>

      <svg viewBox="0 0 520 185" className="plane" role="img" aria-label="Cavalieri-elv érmetornyokkal">
        <rect width={520} height={185} className="pl-bg" />

        {/* Bal oldal: Egyenes gúla/kúp szeletek */}
        <text x={135} y={20} textAnchor="middle" fill="#bae6fd" fontSize={12} fontWeight={700}>Egyenes test</text>
        {Array.from({ length: layers }, (_, i) => {
          const idx = i + 1; // 1 = csúcs, 11 = alap
          const y = 32 + i * 12;
          const w = 14 + idx * 12;
          const isSel = idx === slice;
          return (
            <rect
              key={`L${i}`}
              x={135 - w / 2}
              y={y}
              width={w}
              height={10}
              rx={2}
              fill={isSel ? 'rgba(251,191,36,0.75)' : 'rgba(56,189,248,0.28)'}
              stroke={isSel ? '#fbbf24' : '#38bdf8'}
              strokeWidth={isSel ? 1.8 : 1}
            />
          );
        })}

        {/* Jobb oldal: Ferde / eltolt test */}
        <text x={375} y={20} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>Eltolt (ferde) test</text>
        {Array.from({ length: layers }, (_, i) => {
          const idx = i + 1;
          const y = 32 + i * 12;
          const w = 14 + idx * 12;
          const shift = ((layers - idx) / layers) * tilt;
          const isSel = idx === slice;
          return (
            <rect
              key={`R${i}`}
              x={375 + shift - w / 2}
              y={y}
              width={w}
              height={10}
              rx={2}
              fill={isSel ? 'rgba(251,191,36,0.75)' : 'rgba(52,211,153,0.28)'}
              stroke={isSel ? '#fbbf24' : '#34d399'}
              strokeWidth={isSel ? 1.8 : 1}
            />
          );
        })}

        {/* Vízszintes összekötő vonal a kiemelt szeletnél */}
        <line
          x1={25}
          y1={32 + (slice - 1) * 12 + 5}
          x2={495}
          y2={32 + (slice - 1) * 12 + 5}
          stroke="#fbbf24"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.7}
        />

        <text x={260} y={176} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>
          Minden x magasságban azonos a keresztmetszet A(x) területe ⇒ V₁ = ∫ A(x) dx = V₂!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: korong-módszer (x-tengely körül) */

type DiskPreset = {
  id: string;
  label: string;
  a: number;
  b: number;
  xr: [number, number];
  yr: [number, number];
  fn: Fn;
  rTex: string;
  volTex: string;
};

const DISK_PRESETS: DiskPreset[] = [
  {
    id: 'parab',
    label: 'Forgásparaboloid: y = √x [0; 4]',
    a: 0,
    b: 4,
    xr: [-0.3, 4.4],
    yr: [-2.4, 2.4],
    fn: (x) => Math.sqrt(Math.max(0, x)),
    rTex: '\\sqrt{x}',
    volTex: '\\pi\\int_0^4 x\\,dx = 8\\pi \\approx 25{,}13',
  },
  {
    id: 'cone',
    label: 'Kúp: y = 0,5 x [0; 4]',
    a: 0,
    b: 4,
    xr: [-0.3, 4.4],
    yr: [-2.4, 2.4],
    fn: (x) => 0.5 * x,
    rTex: '0{,}5x',
    volTex: '\\pi\\int_0^4 0{,}25x^2\\,dx = \\dfrac{16\\pi}{3} \\approx 16{,}76',
  },
  {
    id: 'sphere',
    label: 'Gömb: y = √(4 − x²) [−2; 2]',
    a: -2,
    b: 2,
    xr: [-2.4, 2.4],
    yr: [-2.4, 2.4],
    fn: (x) => Math.sqrt(Math.max(0, 4 - x * x)),
    rTex: '\\sqrt{4-x^2}',
    volTex: '\\pi\\int_{-2}^2 (4-x^2)\\,dx = \\dfrac{32\\pi}{3} \\approx 33{,}51',
  },
];

export function DiskMethodWidget() {
  const [idx, setIdx] = useState(0);
  const p = DISK_PRESETS[idx];
  const [x0, setX0] = useState(2.2);

  const selectP = (i: number) => {
    setIdx(i);
    setX0(DISK_PRESETS[i].id === 'sphere' ? 0.6 : 2.2);
  };

  const r = p.fn(x0);
  const area = Math.PI * r * r;

  return (
    <div className="widget">
      <div className="widget-title">A korong-módszer: forgatás az x-tengely körül</div>
      <div className="relbuttons chips" role="tablist" aria-label="Forgástest választása">
        {DISK_PRESETS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => selectP(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <label>
        Korong helye: <M t={`x = ${tx(x0, 2)}`} /> (sugár: <M t={`R(x) = ${tx(r, 2)}`} />)
        <input type="range" min={p.a + 0.1} max={p.b - 0.1} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={p.xr[0]} xmax={p.xr[1]} ymin={p.yr[0]} ymax={p.yr[1]} h={230}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 70;
          const topPts: string[] = [];
          const botPts: string[] = [];
          for (let i = 0; i <= st; i++) {
            const x = p.a + ((p.b - p.a) * i) / st;
            const y = p.fn(x);
            topPts.push(`${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(y)}`);
            botPts.push(`L ${sx(x)} ${sy(-y)}`);
          }
          const bodyPath = [...topPts, ...botPts.reverse(), 'Z'].join(' ');
          const ry = Math.max(2, sy(0) - sy(r));
          const rx = Math.max(4, ry * 0.28);

          return (
            <>
              {/* Forgástest sziluett */}
              <path d={bodyPath} fill="rgba(56,189,248,0.18)" />
              {/* Felső görbe és tükörképe */}
              <path d={curve(p.fn, m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
              <path d={curve((x) => -p.fn(x), m, 240)} fill="none" stroke="#38bdf8" strokeWidth={1.4} strokeDasharray="5 4" opacity={0.7} />
              {/* 3D korong ellipszis x0-nál */}
              <ellipse
                cx={sx(x0)}
                cy={sy(0)}
                rx={rx}
                ry={ry}
                fill="rgba(251,191,36,0.42)"
                stroke="#fbbf24"
                strokeWidth={2}
              />
              {/* Sugár vonal */}
              <line x1={sx(x0)} y1={sy(0)} x2={sx(x0)} y2={sy(r)} stroke="#34d399" strokeWidth={2.4} />
              <circle cx={sx(x0)} cy={sy(0)} r={3} fill="#e2e8f0" />
              <circle cx={sx(x0)} cy={sy(r)} r={3.5} fill="#34d399" />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Korong területe <M t={`x=${tx(x0, 2)}`} />-nél: <M t={`A(x) = \\pi R(x)^2 = \\pi(${tx(r, 2)})^2 \\approx ${tx(area, 2)}`} />
        </p>
        <p>
          Teljes térfogat: <M t={p.volTex} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: eltolt tengely és y-tengely */

export function ShiftedAxisDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Aranyszabály: a sugár MINDIG a forgástengelytől mért távolság!</div>
      <svg viewBox="0 0 540 185" className="plane" role="img" aria-label="Eltolt tengely és y-tengely körüli forgatás">
        <rect width={540} height={185} className="pl-bg" />

        {/* Bal panel: y = 1 eltolt tengely */}
        <g transform="translate(14, 12)">
          <rect width={250} height={160} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={125} y={20} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>
            Forgatás y = 1 tengely körül (dx)
          </text>
          <line x1={22} y1={126} x2={228} y2={126} stroke="#475569" strokeWidth={1.2} />
          <line x1={38} y1={32} x2={38} y2={138} stroke="#475569" strokeWidth={1.2} />
          {/* y = 1 tengely */}
          <line x1={22} y1={96} x2={228} y2={96} stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="6 3" />
          <text x={224} y={90} textAnchor="end" fill="#fde68a" fontSize={10.5}>y = 1</text>
          {/* y = sqrt(x) görbe x=1..4 -> px 75..210 */}
          <path d="M 75 96 Q 135 66 210 46 L 210 96 Z" fill="rgba(56,189,248,0.24)" />
          <path d="M 38 126 Q 60 105 75 96 Q 135 66 210 46" fill="none" stroke="#38bdf8" strokeWidth={2.4} />
          {/* R(x) = sqrt(x) - 1 */}
          <line x1={155} y1={96} x2={155} y2={62} stroke="#34d399" strokeWidth={2.6} />
          <text x={162} y={82} fill="#a7f3d0" fontSize={11} fontWeight={700}>R(x) = √x − 1</text>
          <text x={125} y={148} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>
            Nem √x, hanem √x − 1 (tengelytől mérve)!
          </text>
        </g>

        {/* Jobb panel: y-tengely körül (dy) */}
        <g transform="translate(276, 12)">
          <rect width={250} height={160} rx={8} fill="#0f172a" stroke="#1e293b" />
          <text x={125} y={20} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight={700}>
            Forgatás y-tengely körül (dy)
          </text>
          <line x1={22} y1={126} x2={228} y2={126} stroke="#475569" strokeWidth={1.2} />
          {/* y-tengely kiemelve */}
          <line x1={60} y1={32} x2={60} y2={138} stroke="#fbbf24" strokeWidth={2} strokeDasharray="6 3" />
          {/* x = sqrt(y) */}
          <path d="M 60 126 Q 140 115 190 46 L 60 46 Z" fill="rgba(52,211,153,0.22)" />
          <path d="M 60 126 Q 140 115 190 46" fill="none" stroke="#34d399" strokeWidth={2.4} />
          {/* Vízszintes korong-sugár */}
          <line x1={60} y1={80} x2={156} y2={80} stroke="#38bdf8" strokeWidth={2.6} />
          <text x={108} y={73} textAnchor="middle" fill="#bae6fd" fontSize={11} fontWeight={700}>R(y) = √y</text>
          <text x={125} y={148} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>
            Vízszintes korong ⇒ V = π ∫ R(y)² dy
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: gyűrű-módszer (washer) */

type WasherPreset = {
  id: string;
  label: string;
  a: number;
  b: number;
  xr: [number, number];
  yr: [number, number];
  R: Fn;
  r: Fn;
  RTex: string;
  rTex: string;
  volTex: string;
};

const WASHER_PRESETS: WasherPreset[] = [
  {
    id: 'xsq',
    label: 'y = x és y = x²  [0; 1]',
    a: 0,
    b: 1,
    xr: [-0.15, 1.2],
    yr: [-0.2, 1.2],
    R: (x) => x,
    r: (x) => x * x,
    RTex: 'x',
    rTex: 'x^2',
    volTex: '\\pi\\int_0^1 (x^2 - x^4)\\,dx = \\dfrac{2\\pi}{15}',
  },
  {
    id: 'root',
    label: 'y = √x és y = x/2  [0; 4]',
    a: 0,
    b: 4,
    xr: [-0.3, 4.4],
    yr: [-0.3, 2.4],
    R: (x) => Math.sqrt(Math.max(0, x)),
    r: (x) => 0.5 * x,
    RTex: '\\sqrt{x}',
    rTex: 'x/2',
    volTex: '\\pi\\int_0^4 \\left(x - \\dfrac{x^2}{4}\\right)dx = \\dfrac{8\\pi}{3}',
  },
];

export function WasherMethodWidget() {
  const [idx, setIdx] = useState(0);
  const p = WASHER_PRESETS[idx];
  const [x0, setX0] = useState(0.6);

  const selectP = (i: number) => {
    setIdx(i);
    setX0(i === 0 ? 0.6 : 1.6);
  };

  const Ro = p.R(x0);
  const ri = p.r(x0);
  const ringArea = Math.PI * (Ro * Ro - ri * ri);
  const maxR = p.R(p.b);
  const scale = 58 / maxR;

  return (
    <div className="widget">
      <div className="widget-title">A gyűrű-módszer (alátét): A(x) = π(R² − r²)</div>
      <div className="relbuttons chips" role="tablist" aria-label="Gyűrű-módszer példák">
        {WASHER_PRESETS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => selectP(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <label>
        Keresztmetszet helye: <M t={`x = ${tx(x0, 2)}`} /> (<M t={`R=${tx(Ro, 2)},\\;r=${tx(ri, 2)}`} />)
        <input
          type="range"
          min={p.a + 0.08}
          max={p.b - 0.08}
          step={idx === 0 ? 0.04 : 0.15}
          value={x0}
          onChange={(e) => setX0(Number(e.target.value))}
        />
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '10px', alignItems: 'center' }}>
        <Chart xmin={p.xr[0]} xmax={p.xr[1]} ymin={p.yr[0]} ymax={p.yr[1]} h={210}>
          {(m) => {
            const sx = m.X;
            const sy = m.Y;
            const st = 60;
            const pts: string[] = [];
            for (let i = 0; i <= st; i++) {
              const x = p.a + ((p.b - p.a) * i) / st;
              pts.push(`${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(p.R(x))}`);
            }
            for (let i = st; i >= 0; i--) {
              const x = p.a + ((p.b - p.a) * i) / st;
              pts.push(`L ${sx(x)} ${sy(p.r(x))}`);
            }
            pts.push('Z');
            return (
              <>
                <path d={pts.join(' ')} fill="rgba(56,189,248,0.25)" />
                <line x1={sx(x0)} y1={sy(0)} x2={sx(x0)} y2={sy(ri)} stroke="#fb7185" strokeWidth={2.5} strokeDasharray="3 2" />
                <line x1={sx(x0)} y1={sy(ri)} x2={sx(x0)} y2={sy(Ro)} stroke="#fbbf24" strokeWidth={4} />
                <path d={curve(p.R, m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
                <path d={curve(p.r, m, 240)} fill="none" stroke="#fb7185" strokeWidth={2.4} />
              </>
            );
          }}
        </Chart>

        {/* Jobb oldal: 2D körgyűrű metszet */}
        <svg viewBox="0 0 150 150" className="plane" role="img" aria-label="Körgyűrű keresztmetszet">
          <rect width={150} height={150} className="pl-bg" />
          <text x={75} y={16} textAnchor="middle" fill="#cbd5e1" fontSize={11} fontWeight={700}>Keresztmetszet (alátét)</text>
          <circle cx={75} cy={82} r={Math.max(2, Ro * scale)} fill="rgba(251,191,36,0.42)" stroke="#38bdf8" strokeWidth={2} />
          <circle cx={75} cy={82} r={Math.max(1, ri * scale)} fill="#0f172a" stroke="#fb7185" strokeWidth={1.8} />
          <line x1={75} y1={82} x2={75 + Ro * scale} y2={82} stroke="#38bdf8" strokeWidth={1.8} />
          <line x1={75} y1={82} x2={75} y2={82 - ri * scale} stroke="#fb7185" strokeWidth={1.8} />
          <circle cx={75} cy={82} r={2.2} fill="#e2e8f0" />
        </svg>
      </div>

      <div className="result">
        <p>
          Gyűrű területe: <M t={`\\pi(R^2-r^2) \\approx ${tx(ringArea, 3)}`} /> · Teljes térfogat: <M t={p.volTex} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: tengelyválasztás hatása R-re és r-re */

type AxisOpt = {
  id: string;
  label: string;
  axisY: number;
  RTex: string;
  rTex: string;
  volTex: string;
  note: string;
};

const AXIS_OPTS: AxisOpt[] = [
  {
    id: 'y0',
    label: 'y = 0 (x-tengely)',
    axisY: 0,
    RTex: 'x',
    rTex: 'x^2',
    volTex: '\\dfrac{2\\pi}{15}',
    note: 'A tengely a tartomány ALATT van: a felső görbe (x) a külső sugár!',
  },
  {
    id: 'ym1',
    label: 'y = −1 (lejjebb)',
    axisY: -1,
    RTex: 'x + 1',
    rTex: 'x^2 + 1',
    volTex: '\\dfrac{7\\pi}{15}',
    note: 'Mindkét sugár +1-gyel nőtt, a forgástest sokkal nagyobb lyukú és nagyobb térfogatú lett!',
  },
  {
    id: 'y2',
    label: 'y = 2 (fölötte!)',
    axisY: 2,
    RTex: '2 - x^2',
    rTex: '2 - x',
    volTex: '\\dfrac{8\\pi}{15}',
    note: 'A tengely FÖLÖTTÜK van, ezért szerepet cserélnek: most az alsó görbe (x²) van MESSZEBB (külső sugár)!',
  },
];

export function AxisChoiceComparatorWidget() {
  const [idx, setIdx] = useState(0);
  const opt = AXIS_OPTS[idx];

  return (
    <div className="widget">
      <div className="widget-title">Ugyanaz a tartomány (y = x és y = x²), három különböző forgástengely!</div>
      <div className="relbuttons chips" role="tablist" aria-label="Forgástengely választása">
        {AXIS_OPTS.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <Chart xmin={-0.2} xmax={1.3} ymin={-1.3} ymax={2.3} h={215}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 50;
          const pts: string[] = [];
          for (let i = 0; i <= st; i++) {
            const x = i / st;
            pts.push(`${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(x)}`);
          }
          for (let i = st; i >= 0; i--) {
            const x = i / st;
            pts.push(`L ${sx(x)} ${sy(x * x)}`);
          }
          pts.push('Z');
          const x0 = 0.55;
          const yTop = x0;
          const yBot = x0 * x0;
          const farY = Math.abs(yTop - opt.axisY) >= Math.abs(yBot - opt.axisY) ? yTop : yBot;
          const nearY = farY === yTop ? yBot : yTop;

          return (
            <>
              <path d={pts.join(' ')} fill="rgba(56,189,248,0.28)" />
              {/* Forgástengely */}
              <line x1={sx(-0.2)} y1={sy(opt.axisY)} x2={sx(1.3)} y2={sy(opt.axisY)} stroke="#fbbf24" strokeWidth={2.2} strokeDasharray="6 3" />
              {/* Külső sugár R */}
              <line x1={sx(x0) - 4} y1={sy(opt.axisY)} x2={sx(x0) - 4} y2={sy(farY)} stroke="#34d399" strokeWidth={2.6} />
              {/* Belső sugár r */}
              <line x1={sx(x0) + 4} y1={sy(opt.axisY)} x2={sx(x0) + 4} y2={sy(nearY)} stroke="#fb7185" strokeWidth={2.6} />
              <path d={curve((x) => x, m, 200)} fill="none" stroke="#38bdf8" strokeWidth={2.4} />
              <path d={curve((x) => x * x, m, 200)} fill="none" stroke="#c084fc" strokeWidth={2.4} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <span style={{ color: '#34d399' }}>■</span> Külső: <M t={`R(x) = ${opt.RTex}`} /> ·{' '}
          <span style={{ color: '#fb7185' }}>■</span> Belső: <M t={`r(x) = ${opt.rTex}`} /> · Térfogat:{' '}
          <M t={`V = ${opt.volTex}`} />
        </p>
        <p>{opt.note}</p>
      </div>
    </div>
  );
}
