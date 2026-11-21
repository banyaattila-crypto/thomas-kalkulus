import { useEffect, useRef } from 'react';
import { VERSION } from '../version';

type Props = { onToc: () => void; onStart: () => void };

const W = 1200;
const H = 700;
const OX = W / 2;
const OY = 400;
const S = 85; // px / egység
const px = (x: number) => OX + x * S;
const py = (y: number) => OY - y * S;

const f = (x: number) => 1.8 * Math.sin(0.8 * x);
const df = (x: number) => 1.8 * 0.8 * Math.cos(0.8 * x);
const g = (x: number) => 0.11 * x * x - 2.4;

function path(fn: (x: number) => number, a: number, b: number, n = 160) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    d += `${i ? 'L' : 'M'}${px(x).toFixed(1)},${py(fn(x)).toFixed(1)} `;
  }
  return d;
}

function area(fn: (x: number) => number, a: number, b: number, n = 80) {
  let d = `M${px(a)},${py(0)} `;
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    d += `L${px(x).toFixed(1)},${py(fn(x)).toFixed(1)} `;
  }
  return d + `L${px(b)},${py(0)} Z`;
}

const SYMBOLS: { t: string; x: number; y: number; s: number; d: number }[] = [
  { t: '∫', x: 8, y: 22, s: 76, d: 0 },
  { t: 'Σ', x: 84, y: 16, s: 60, d: 2 },
  { t: 'lim', x: 90, y: 62, s: 40, d: 4 },
  { t: 'dx', x: 6, y: 66, s: 44, d: 1 },
  { t: 'π', x: 70, y: 84, s: 56, d: 3 },
  { t: '∞', x: 22, y: 86, s: 60, d: 5 },
  { t: "f′(x)", x: 48, y: 8, s: 34, d: 2.5 },
  { t: '√', x: 93, y: 38, s: 52, d: 1.5 },
];

/** Animált nyitóoldal: önmagát megrajzoló grafikonok, egy görbén futó érintő és lebegő jelek. */
export function Cover({ onToc, onStart }: Props) {
  const tan = useRef<SVGLineElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const label = useRef<SVGTextElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = reduce ? 1.2 : (now - t0) / 1000;
      const x = -4.2 + ((Math.sin(t * 0.45) + 1) / 2) * 8.4; // oda-vissza fut
      const y = f(x);
      const m = df(x);
      const L = 2.1;
      const dx = L / Math.sqrt(1 + m * m);
      tan.current?.setAttribute('x1', String(px(x - dx)));
      tan.current?.setAttribute('y1', String(py(y - m * dx)));
      tan.current?.setAttribute('x2', String(px(x + dx)));
      tan.current?.setAttribute('y2', String(py(y + m * dx)));
      dot.current?.setAttribute('cx', String(px(x)));
      dot.current?.setAttribute('cy', String(py(y)));
      label.current?.setAttribute('x', String(px(x) + 14));
      label.current?.setAttribute('y', String(py(y) - 16));
      if (label.current) label.current.textContent = `f′ = ${m.toFixed(2).replace('.', ',').replace('-', '−')}`;
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const gridX = Array.from({ length: 29 }, (_, i) => i - 14);
  const gridY = Array.from({ length: 17 }, (_, i) => i - 8);

  return (
    <div className="cover">
      <svg className="cover-art" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="cv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="cv-glow" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="#0f3a5a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#070b14" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#cv-glow)" />
        {gridX.map((v) => (
          <line key={`x${v}`} x1={px(v)} y1={0} x2={px(v)} y2={H} className="cv-grid" />
        ))}
        {gridY.map((v) => (
          <line key={`y${v}`} x1={0} y1={py(v)} x2={W} y2={py(v)} className="cv-grid" />
        ))}
        <line x1={0} y1={OY} x2={W} y2={OY} className="cv-axis" />
        <line x1={OX} y1={0} x2={OX} y2={H} className="cv-axis" />
        <path d={area(f, 0.2, 3.9)} fill="url(#cv-area)" className="cv-area" />
        <path d={path(g, -7, 7)} className="cv-curve cv-curve2" pathLength={1} />
        <path d={path(f, -7, 7)} className="cv-curve cv-curve1" pathLength={1} />
        <line ref={tan} className="cv-tan" />
        <circle ref={dot} r={7} className="cv-dot" />
        <text ref={label} className="cv-lab" />
      </svg>

      {SYMBOLS.map((m) => (
        <span
          key={m.t}
          className="cv-sym"
          aria-hidden
          style={{ left: `${m.x}%`, top: `${m.y}%`, fontSize: m.s, animationDelay: `${-m.d * 2}s` }}
        >
          {m.t}
        </span>
      ))}

      <div className="cover-body">
        <div className="cover-kicker">Thomas-féle tematika nyomán</div>
        <h1 className="cover-title">Kalkulus</h1>
        <p className="cover-sub">
          Látványos, interaktív tananyag a határértéktől a vektoranalízisig. Saját magyarázatokkal, ábrákkal és gyakorló
          feladatokkal.
        </p>
        <div className="cover-actions">
          <button className="btn-primary" onClick={onStart}>
            Kezdés
          </button>
          <button className="btn-ghost" onClick={onToc}>
            Tartalomjegyzék
          </button>
        </div>
        <div className="cover-meta">
          <span className="ver">v{VERSION}</span>
          <span>3 kötet · 16 fejezet</span>
        </div>
      </div>
    </div>
  );
}
