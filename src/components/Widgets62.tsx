import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;
const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: hengerhéj kiterítése */

export function ShellUnrollDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A hengerhéj kiterítése — innen jön a 2π · sugár · magasság · dx képlet!</div>
      <svg viewBox="0 0 540 175" className="plane" role="img" aria-label="Hengerhéj kiterítése téglalappá">
        <rect width={540} height={175} className="pl-bg" />

        {/* Bal oldal: 3D vékony hengerhéj */}
        <g transform="translate(30, 18)">
          {/* Hátsó palást */}
          <path d="M 30 34 L 30 116 A 52 16 0 0 0 134 116 L 134 34 Z" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth={1.8} />
          {/* Felső ellipszis (külső és belső) */}
          <ellipse cx={82} cy={34} rx={52} ry={16} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.8} />
          <ellipse cx={82} cy={34} rx={45} ry={13} fill="#0f172a" stroke="#7dd3fc" strokeWidth={1.2} />
          {/* Sugár r */}
          <line x1={82} y1={34} x2={134} y2={34} stroke="#34d399" strokeWidth={2} />
          <text x={108} y={28} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>r</text>
          {/* Magasság h */}
          <line x1={144} y1={34} x2={144} y2={116} stroke="#fbbf24" strokeWidth={1.8} />
          <text x={152} y={79} fill="#fde68a" fontSize={12} fontWeight={700}>h</text>
          {/* Vágásvonal */}
          <line x1={82} y1={50} x2={82} y2={132} stroke="#fb7185" strokeWidth={2} strokeDasharray="4 3" />
          <text x={82} y={148} textAnchor="middle" fill="#fecdd3" fontSize={10.5}>itt elvágjuk és kiterítjük</text>
        </g>

        {/* Nyíl */}
        <line x1={208} y1={92} x2={252} y2={92} stroke="#fbbf24" strokeWidth={2.4} />
        <polygon points="256,92 246,86 246,98" fill="#fbbf24" />
        <text x={230} y={82} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>kiterítés</text>

        {/* Jobb oldal: Kiterített vékony téglatest */}
        <g transform="translate(272, 24)">
          {/* Elülső lap */}
          <rect x={10} y={32} width={215} height={82} fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth={2} />
          {/* Felső 3D vastagság */}
          <polygon points="10,32 22,20 237,20 225,32" fill="rgba(251,191,36,0.35)" stroke="#fbbf24" strokeWidth={1.5} />
          {/* Jobb oldali 3D él */}
          <polygon points="225,32 237,20 237,102 225,114" fill="rgba(56,189,248,0.45)" stroke="#38bdf8" strokeWidth={1.5} />

          {/* Méretfeliratok */}
          <text x={118} y={132} textAnchor="middle" fill="#a7f3d0" fontSize={12.5} fontWeight={700}>kerület = 2πr</text>
          <text x={118} y={78} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={700}>ΔV ≈ 2πr · h · Δx</text>
          <text x={244} y={76} fill="#fde68a" fontSize={12} fontWeight={700}>h</text>
          <text x={232} y={14} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>Δx</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: függőleges tengelyek (y = 3x - x²) */

type VAxisOpt = {
  id: string;
  label: string;
  L: number;
  rTex: string;
  volTex: string;
  note: string;
};

const V_AXES: VAxisOpt[] = [
  {
    id: 'x0',
    label: 'x = 0 (y-tengely)',
    L: 0,
    rTex: 'x',
    volTex: '\\dfrac{27\\pi}{2}',
    note: 'Az y-tengelytől a távolság egyszerűen x.',
  },
  {
    id: 'xm1',
    label: 'x = −1 (balra eltolva)',
    L: -1,
    rTex: 'x + 1',
    volTex: '\\dfrac{45\\pi}{2}',
    note: 'A tartomány a tengelytől jobbra van: sugár = x − (−1) = x + 1.',
  },
  {
    id: 'x4',
    label: 'x = 4 (jobbra eltolva!)',
    L: 4,
    rTex: '4 - x',
    volTex: '\\dfrac{45\\pi}{2}',
    note: 'A tartomány a tengelytől balra van: sugár = 4 − x! (Szimmetria miatt pont ugyanakkora térfogat, mint x = −1-nél!)',
  },
];

export function VerticalShellExplorerWidget() {
  const [idx, setIdx] = useState(0);
  const [x0, setX0] = useState(1.6);
  const opt = V_AXES[idx];
  const f: Fn = (x) => 3 * x - x * x;

  const rad = Math.abs(x0 - opt.L);
  const h = f(x0);

  return (
    <div className="widget">
      <div className="widget-title">Hengerhéj függőleges tengely körül: y = 3x − x² [0; 3]</div>
      <div className="relbuttons chips" role="tablist" aria-label="Függőleges forgástengely">
        {V_AXES.map((q, i) => (
          <button key={q.id} type="button" className={idx === i ? 'on' : ''} onClick={() => setIdx(i)}>
            {q.label}
          </button>
        ))}
      </div>

      <label>
        Hengerhéj helye: <M t={`x = ${tx(x0, 2)}`} /> (sugár: <M t={`r = ${tx(rad, 2)}`} />, magasság:{' '}
        <M t={`h = ${tx(h, 2)}`} />)
        <input type="range" min={0.2} max={2.8} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>

      <Chart xmin={-1.4} xmax={4.4} ymin={-0.3} ymax={2.7} h={220}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 60;
          const pts: string[] = [`M ${sx(0)} ${sy(0)}`];
          for (let i = 0; i <= st; i++) {
            const x = (3 * i) / st;
            pts.push(`L ${sx(x)} ${sy(f(x))}`);
          }
          pts.push(`L ${sx(3)} ${sy(0)} Z`);
          return (
            <>
              <path d={pts.join(' ')} fill="rgba(56,189,248,0.24)" />
              {/* Forgástengely */}
              <line x1={sx(opt.L)} y1={sy(-0.3)} x2={sx(opt.L)} y2={sy(2.7)} stroke="#fbbf24" strokeWidth={2.2} strokeDasharray="6 3" />
              {/* Hengerhéj függőleges csík */}
              <rect x={sx(x0) - 4} y={sy(h)} width={8} height={sy(0) - sy(h)} fill="rgba(251,191,36,0.7)" stroke="#fbbf24" strokeWidth={1.5} />
              {/* Sugár nyíl */}
              <line x1={sx(opt.L)} y1={sy(h * 0.5)} x2={sx(x0)} y2={sy(h * 0.5)} stroke="#34d399" strokeWidth={2.4} />
              <path d={curve(f, m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Sugár: <M t={`r(x) = ${opt.rTex}`} /> · Magasság: <M t="h(x) = 3x - x^2" /> · Térfogat:{' '}
          <M t={`V = ${opt.volTex}`} />
        </p>
        <p>{opt.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: vízszintes héj (dy) */

export function HorizontalShellWidget() {
  const [axis, setAxis] = useState<'y0' | 'y2'>('y0');
  const [y0, setY0] = useState(1.1);

  // Tartomány: y = sqrt(x) (x = y²), y = 0, x = 4 -> y in [0, 2]
  const rad = axis === 'y0' ? y0 : 2 - y0;
  const len = 4 - y0 * y0;

  return (
    <div className="widget">
      <div className="widget-title">Vízszintes hengerhéjak (dy): y = √x, y = 0, x = 4</div>
      <div className="relbuttons chips">
        <button type="button" className={axis === 'y0' ? 'on' : ''} onClick={() => setAxis('y0')}>
          Forgatás x-tengely (y = 0) körül
        </button>
        <button type="button" className={axis === 'y2' ? 'on' : ''} onClick={() => setAxis('y2')}>
          Forgatás y = 2 egyenes körül
        </button>
      </div>

      <label>
        Vízszintes csík magassága: <M t={`y = ${tx(y0, 2)}`} /> (sugár: <M t={`r = ${tx(rad, 2)}`} />, hossz:{' '}
        <M t={`h = 4 - y^2 = ${tx(len, 2)}`} />)
        <input type="range" min={0.15} max={1.85} step={0.1} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
      </label>

      <Chart xmin={-0.3} xmax={4.4} ymin={-0.3} ymax={2.4} h={215}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 60;
          const pts: string[] = [`M ${sx(0)} ${sy(0)}`];
          for (let i = 0; i <= st; i++) {
            const x = (4 * i) / st;
            pts.push(`L ${sx(x)} ${sy(Math.sqrt(x))}`);
          }
          pts.push(`L ${sx(4)} ${sy(0)} Z`);
          const axisY = axis === 'y0' ? 0 : 2;
          return (
            <>
              <path d={pts.join(' ')} fill="rgba(56,189,248,0.24)" />
              <line x1={sx(-0.3)} y1={sy(axisY)} x2={sx(4.4)} y2={sy(axisY)} stroke="#fbbf24" strokeWidth={2.2} strokeDasharray="6 3" />
              {/* Vízszintes héj csík */}
              <rect
                x={sx(y0 * y0)}
                y={sy(y0) - 4}
                width={Math.max(1, sx(4) - sx(y0 * y0))}
                height={8}
                fill="rgba(251,191,36,0.7)"
                stroke="#fbbf24"
                strokeWidth={1.5}
              />
              {/* Sugár */}
              <line x1={sx(3.6)} y1={sy(axisY)} x2={sx(3.6)} y2={sy(y0)} stroke="#34d399" strokeWidth={2.4} />
              <path d={curve((x) => Math.sqrt(Math.max(0, x)), m, 240)} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        {axis === 'y0' ? (
          <p>
            <M t="V = 2\pi\displaystyle\int_0^2 y(4-y^2)\,dy = \mathbf{8\pi}" /> — pontosan ugyanaz, mint a 6.1 korong-módszerrel!
          </p>
        ) : (
          <p>
            <M t="V = 2\pi\displaystyle\int_0^2 (2-y)(4-y^2)\,dy = \mathbf{\dfrac{40\pi}{3}}" />
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Gyűrű vs. Hengerhéj mátrix */

export function WasherVsShellTableDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Melyik módszert válaszd? — Gyűrű (6.1) vs. Hengerhéj (6.2)</div>
      <svg viewBox="0 0 540 185" className="plane" role="img" aria-label="Gyűrű és hengerhéj módszer összehasonlítása">
        <rect width={540} height={185} className="pl-bg" />

        {/* Bal oszlop: Korong / Gyűrű */}
        <rect x={14} y={14} width={248} height={156} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.8} />
        <text x={138} y={36} textAnchor="middle" fill="#7dd3fc" fontSize={13} fontWeight={700}>Korong / Gyűrű (6.1)</text>
        <text x={138} y={54} textAnchor="middle" fill="#94a3b8" fontSize={11}>Csík MERŐLEGES a tengelyre</text>
        <line x1={28} y1={66} x2={248} y2={66} stroke="#1e293b" strokeWidth={1.5} />
        <text x={28} y={90} fill="#e2e8f0" fontSize={11.5} fontWeight={700}>• Vízszintes tengely → dx</text>
        <text x={40} y={108} fill="#bae6fd" fontSize={11}>V = π ∫ (R(x)² − r(x)²) dx</text>
        <text x={28} y={136} fill="#e2e8f0" fontSize={11.5} fontWeight={700}>• Függőleges tengely → dy</text>
        <text x={40} y={154} fill="#bae6fd" fontSize={11}>V = π ∫ (R(y)² − r(y)²) dy</text>

        {/* Jobb oszlop: Hengerhéj */}
        <rect x={278} y={14} width={248} height={156} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.8} />
        <text x={402} y={36} textAnchor="middle" fill="#a7f3d0" fontSize={13} fontWeight={700}>Hengerhéj (6.2)</text>
        <text x={402} y={54} textAnchor="middle" fill="#94a3b8" fontSize={11}>Csík PÁRHUZAMOS a tengellyel</text>
        <line x1={292} y1={66} x2={512} y2={66} stroke="#1e293b" strokeWidth={1.5} />
        <text x={292} y={90} fill="#e2e8f0" fontSize={11.5} fontWeight={700}>• Függőleges tengely → dx</text>
        <text x={304} y={108} fill="#a7f3d0" fontSize={11}>V = 2π ∫ r(x)·h(x) dx</text>
        <text x={292} y={136} fill="#e2e8f0" fontSize={11.5} fontWeight={700}>• Vízszintes tengely → dy</text>
        <text x={304} y={154} fill="#a7f3d0" fontSize={11}>V = 2π ∫ r(y)·h(y) dy</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Szalvétagyűrű-paradoxon */

export function NapkinRingWidget() {
  // Rögzített gyűrűmagasság h = 2, gömbsugár R változtatható [1.1, 3.0]
  const [R, setR] = useState(1.6);
  const h = 2;
  const rHole = Math.sqrt(R * R - 1); // mert (h/2)² = 1
  const vol = (Math.PI * h ** 3) / 6; // mindig 4π/3 ≈ 4.189!

  return (
    <div className="widget">
      <div className="widget-title">A szalvétagyűrű-paradoxon — a térfogat NEM függ a gömb sugarától!</div>
      <label>
        Gömb sugara: <M t={`R = ${tx(R, 2)}`} /> (fúrt lyuk sugara: <M t={`r = \\sqrt{R^2-1} = ${tx(rHole, 2)}`} />, magasság rögzített: <M t="h = 2" />)
        <input type="range" min={1.1} max={3.0} step={0.1} value={R} onChange={(e) => setR(Number(e.target.value))} />
      </label>

      <Chart xmin={-3.3} xmax={3.3} ymin={-3.2} ymax={3.2} h={215}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 40;
          // Jobb és bal szalvétagyűrű metszet: x in [rHole, R], y in [-sqrt(R²-x²), +sqrt(R²-x²)]
          const buildWing = (sign: 1 | -1) => {
            const pts: string[] = [];
            for (let i = 0; i <= st; i++) {
              const x = rHole + ((R - rHole) * i) / st;
              const y = Math.sqrt(Math.max(0, R * R - x * x));
              pts.push(`${i === 0 ? 'M' : 'L'} ${sx(sign * x)} ${sy(y)}`);
            }
            for (let i = st; i >= 0; i--) {
              const x = rHole + ((R - rHole) * i) / st;
              const y = -Math.sqrt(Math.max(0, R * R - x * x));
              pts.push(`L ${sx(sign * x)} ${sy(y)}`);
            }
            pts.push('Z');
            return pts.join(' ');
          };

          return (
            <>
              {/* Teljes gömb kontúr szaggatottan */}
              <circle
                cx={sx(0)}
                cy={sy(0)}
                r={sx(R) - sx(0)}
                fill="none"
                stroke="#475569"
                strokeWidth={1.4}
                strokeDasharray="4 4"
              />
              {/* Fúrt lyuk falai */}
              <line x1={sx(rHole)} y1={sy(-1)} x2={sx(rHole)} y2={sy(1)} stroke="#fb7185" strokeWidth={2} />
              <line x1={sx(-rHole)} y1={sy(-1)} x2={sx(-rHole)} y2={sy(1)} stroke="#fb7185" strokeWidth={2} />
              {/* Maradó gyűrű keresztmetszete */}
              <path d={buildWing(1)} fill="rgba(52,211,153,0.42)" stroke="#34d399" strokeWidth={2} />
              <path d={buildWing(-1)} fill="rgba(52,211,153,0.42)" stroke="#34d399" strokeWidth={2} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Gömb sugara <M t={`R = ${tx(R, 2)}`} />, falvastagság <M t={`R-r = ${tx(R - rHole, 2)}`} />, de a térfogat <strong>mindig pontosan</strong>:{' '}
          <M t={`V = \\dfrac{\\pi h^3}{6} = \\dfrac{4\\pi}{3} \\approx ${tx(vol, 3)}`} />!
        </p>
      </div>
    </div>
  );
}
