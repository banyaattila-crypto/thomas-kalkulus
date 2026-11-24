import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { TOC, VOLUME_TITLES } from '../data/toc';
import { SECTIONS } from '../content';

type Props = { go: (section: string, page?: number) => void; done?: Set<string> };

export const SUB: Record<number, string> = {
  1: 'Függvények, határérték, derivált',
  2: 'Integrálás és sorok alapjai',
  3: 'Több változó és vektoranalízis',
};

/** Kötetek színezete: [kezdő, vég]. Nincs rózsaszín és lila. */
export const VOL_COLORS: Record<number, [string, string]> = {
  1: ['#38bdf8', '#60a5fa'],
  2: ['#2dd4bf', '#4ade80'],
  3: ['#fbbf24', '#fb923c'],
};

/** Fejezetszínek (1–16). */
export const CH_COLORS = [
  '#38bdf8', '#22d3ee', '#60a5fa', '#7dd3fc',
  '#2dd4bf', '#34d399', '#4ade80', '#a3e635', '#86efac',
  '#fbbf24', '#fb923c', '#f59e0b', '#fcd34d', '#fdba74', '#fde047', '#f97316',
];

/* ------------------------------------------------------------------ fejezet-emblémák (apró SVG-rajzok) */

const L = ({ d, cls = 'em-l' }: { d: string; cls?: string }) => <path d={d} className={cls} pathLength={1} />;
const Dot = ({ x, y, r = 3 }: { x: number; y: number; r?: number }) => <circle cx={x} cy={y} r={r} className="em-dot" />;

const poly = (pts: [number, number][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

function emblem(n: number): ReactNode {
  switch (n) {
    case 1:
      return (
        <>
          <L d="M10,62 L112,62 M22,6 L22,66" cls="em-f" />
          <L d="M26,8 Q62,104 98,8" />
          <Dot x={62} y={33} />
        </>
      );
    case 2:
      return (
        <>
          <L d="M10,62 L112,62 M22,6 L22,66" cls="em-f" />
          <L d="M14,54 C32,52 44,40 58,31" />
          <L d="M70,26 C84,18 96,14 110,12" />
          <circle cx={64} cy={28.5} r={4} className="em-ring" />
        </>
      );
    case 3:
      return (
        <>
          <L d="M12,56 Q58,-10 108,50" />
          <L d="M22,24 L98,19" cls="em-a" />
          <Dot x={59} y={21.5} />
        </>
      );
    case 4:
      return (
        <>
          <L d="M8,36 C24,-4 40,-4 56,36 S88,76 112,36" />
          <circle cx={32} cy={6} r={4} className="em-ring" />
          <circle cx={81} cy={66} r={4} className="em-ring" />
        </>
      );
    case 5:
      return (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={14 + i * 12} y={26 + i * 3.6} width={11} height={62 - 26 - i * 3.6} className="em-bar" style={{ animationDelay: `${i * 70}ms` }} />
          ))}
          <L d="M12,24 C40,12 74,24 108,50" />
        </>
      );
    case 6:
      return (
        <>
          <L d="M20,22 C45,8 74,34 100,24 M20,50 C45,64 74,38 100,48" />
          <ellipse cx={20} cy={36} rx={6} ry={14} className="em-f2" />
          <ellipse cx={100} cy={36} rx={6} ry={12} className="em-f2" />
          <L d="M8,36 L112,36" cls="em-f" />
        </>
      );
    case 7:
      return (
        <>
          <L d="M12,62 L108,10" cls="em-f" />
          <L d="M12,62 C54,60 82,44 104,8" />
          <L d="M18,62 C22,30 40,22 108,16" cls="em-a" />
        </>
      );
    case 8:
      return (
        <>
          <L d="M74,8 C62,4 60,14 58,30 L54,48 C52,62 46,66 40,60" />
          <L d="M82,36 L108,36 M90,28 L90,44" cls="em-f" />
        </>
      );
    case 9:
      return (
        <>
          <path d="M14,12 C30,40 50,54 108,58 L108,64 L14,64 Z" className="em-fill" />
          <L d="M14,12 C30,40 50,54 108,58" />
          <L d="M96,38 L112,38 M107,33 L112,38 L107,43" cls="em-a" />
        </>
      );
    case 10: {
      const sp: [number, number][] = [];
      for (let i = 0; i <= 80; i++) {
        const t = (i / 80) * 4 * Math.PI;
        sp.push([86 + 3.1 * t * Math.cos(t) * 0.8, 36 + 3.1 * t * Math.sin(t) * 0.8]);
      }
      return (
        <>
          <ellipse cx={34} cy={36} rx={26} ry={16} className="em-ring2" />
          <L d={poly(sp)} cls="em-a" />
          <Dot x={34} y={36} r={2.5} />
        </>
      );
    }
    case 11: {
      const pts: [number, number][] = [];
      for (let i = 0; i < 11; i++) pts.push([12 + i * 9.6, 36 + 26 * Math.pow(-0.62, i)]);
      return (
        <>
          <L d="M8,36 L112,36" cls="em-f" />
          <L d={poly(pts)} cls="em-a" />
          {pts.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={2.6} className="em-dot" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </>
      );
    }
    case 12:
      return (
        <>
          <L d="M50,42 L50,6 M50,42 L102,62 M50,42 L8,62" cls="em-f" />
          <L d="M50,42 L88,20" />
          <L d="M80,19 L90,19 L87,28" />
          <L d="M88,20 L88,50 L50,42 M88,50 L102,62" cls="em-a" />
        </>
      );
    case 13: {
      const h: [number, number][] = [];
      for (let i = 0; i <= 120; i++) {
        const t = (i / 120) * 14;
        h.push([14 + 6.2 * t + 9 * Math.cos(t), 36 + 22 * Math.sin(t)]);
      }
      return <L d={poly(h)} />;
    }
    case 14: {
      const lines: string[] = [];
      const P = (u: number, v: number): [number, number] => {
        const z = 0.5 * (u * u - v * v);
        return [60 + 26 * (u - v) * 0.9, 38 + 11 * (u + v) - 18 * z];
      };
      for (let k = -2; k <= 2; k++) {
        const a: [number, number][] = [];
        const b: [number, number][] = [];
        for (let i = 0; i <= 20; i++) {
          const t = -1 + (i / 20) * 2;
          a.push(P(k / 2, t));
          b.push(P(t, k / 2));
        }
        lines.push(poly(a), poly(b));
      }
      return (
        <>
          {lines.map((d, i) => (
            <L key={i} d={d} cls={i % 2 ? 'em-a' : 'em-l'} />
          ))}
        </>
      );
    }
    case 15:
      return (
        <>
          <L d="M42,10 L98,10 L98,46 L42,46 Z M22,26 L78,26 L78,62 L22,62 Z M22,26 L42,10 M78,26 L98,10 M78,62 L98,46 M22,62 L42,46" />
          <L d="M36.7,26 L36.7,62 M50,26 L50,62 M64,26 L64,62 M22,38 L78,38 M22,50 L78,50" cls="em-f" />
        </>
      );
    case 16: {
      const arr: ReactNode[] = [];
      let k = 0;
      for (let gx = 0; gx < 5; gx++) {
        for (let gy = 0; gy < 3; gy++) {
          const x = 18 + gx * 21;
          const y = 14 + gy * 22;
          const vx = y - 36;
          const vy = -(x - 60);
          const a = Math.atan2(vy, vx);
          const len = 9;
          const x2 = x + Math.cos(a) * len;
          const y2 = y + Math.sin(a) * len;
          const hx1 = x2 - Math.cos(a - 0.5) * 4;
          const hy1 = y2 - Math.sin(a - 0.5) * 4;
          const hx2 = x2 - Math.cos(a + 0.5) * 4;
          const hy2 = y2 - Math.sin(a + 0.5) * 4;
          arr.push(<L key={k++} d={`M${x - Math.cos(a) * 5},${y - Math.sin(a) * 5} L${x2},${y2} M${hx1},${hy1} L${x2},${y2} L${hx2},${hy2}`} />);
        }
      }
      return <>{arr}</>;
    }
    default:
      return <L d="M10,50 Q60,-10 110,50" />;
  }
}

/* ------------------------------------------------------------------ hero animáció: görbén futó érintő */

const HW = 900;
const HH = 220;
const hx = (x: number) => 60 + (x + 6) * 70;
const hy = (y: number) => 118 - y * 38;
const hf = (x: number) => Math.sin(0.9 * x) + 0.35 * Math.sin(2.1 * x + 1);
const hdf = (x: number) => 0.9 * Math.cos(0.9 * x) + 0.35 * 2.1 * Math.cos(2.1 * x + 1);

function HeroCurve() {
  const tan = useRef<SVGLineElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = reduce ? 3 : (now - t0) / 1000;
      const x = -5 + ((Math.sin(t * 0.4) + 1) / 2) * 10;
      const y = hf(x);
      const m = hdf(x);
      const dx = 1.5;
      if (tan.current) {
        tan.current.setAttribute('x1', String(hx(x - dx)));
        tan.current.setAttribute('y1', String(hy(y - m * dx)));
        tan.current.setAttribute('x2', String(hx(x + dx)));
        tan.current.setAttribute('y2', String(hy(y + m * dx)));
      }
      if (dot.current) {
        dot.current.setAttribute('cx', String(hx(x)));
        dot.current.setAttribute('cy', String(hy(y)));
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);
  let d = '';
  for (let i = 0; i <= 240; i++) {
    const x = -6 + (i / 240) * 12;
    d += `${i ? 'L' : 'M'}${hx(x).toFixed(1)},${hy(hf(x)).toFixed(1)} `;
  }
  return (
    <svg className="hero-curve" viewBox={`0 0 ${HW} ${HH}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <line x1={0} y1={hy(0)} x2={HW} y2={hy(0)} className="hc-axis" />
      <path d={d} className="hc-curve" pathLength={1} />
      <line ref={tan} className="hc-tan" />
      <circle ref={dot} r={6} className="hc-dot" />
    </svg>
  );
}

/* ------------------------------------------------------------------ fő oldal */

function Ring({ value, size = 120, stroke = 10 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="ring">
      <defs>
        <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} className="ring-bg" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        className="ring-fg"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        stroke="url(#ringg)"
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="ring-t">
        {Math.round(value * 100)}%
      </text>
    </svg>
  );
}

/** Élő, kötetenként tagolt tartalomjegyzék: haladásjelzés, fejezet-emblémák, időtengelyes szakaszlista. */
export function TocPage({ go, done: completed = new Set() }: Props) {
  const [onlyReady, setOnlyReady] = useState(false);
  const all = TOC.flatMap((c) => c.sections);
  const ready = all.filter((s) => SECTIONS[s.id]);
  const pagesTotal = ready.reduce((a, s) => a + SECTIONS[s.id].pages, 0);
  const chStarted = TOC.filter((c) => c.sections.some((s) => SECTIONS[s.id])).length;
  const last = ready[ready.length - 1];
  let idx = 0;
  return (
    <div className="toc-page">
      <header className="toc-hero">
        <HeroCurve />
        <div className="hero-body">
          <div className="hero-text">
            <div className="hero-kicker">Thomas-féle Kalkulus · I–III. kötet</div>
            <h1 className="hero-title">Tartalomjegyzék</h1>
            <p className="hero-lead">
              Három kötet, tizenhat fejezet, egy út a függvényektől a vektormezőkig. Minden szakasz önálló, interaktív ábrákkal és megoldott feladatokkal.
            </p>
            <div className="hero-actions">
              {last && (
                <button className="cta" onClick={() => go(last.id)}>
                  Folytatás: {last.id} {last.title}
                  <span aria-hidden> →</span>
                </button>
              )}
              <button className="cta ghost" onClick={() => go('1.1')}>
                Kezdés az elejétől
              </button>
            </div>
          </div>
          <div className="hero-stats">
            <Ring value={ready.length / all.length} />
            <ul className="stats">
              <li>
                <b>{ready.length}</b>
                <span>kész szakasz / {all.length}</span>
              </li>
              <li>
                <b>{pagesTotal}</b>
                <span>oldal</span>
              </li>
              <li>
                <b>{chStarted}</b>
                <span>megkezdett fejezet / {TOC.length}</span>
              </li>
              {completed.size > 0 && (
                <li>
                  <b>{completed.size}</b>
                  <span>elvégezve / {ready.length}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>

      <div className="toc-filter">
        <button className={!onlyReady ? 'on' : ''} onClick={() => setOnlyReady(false)}>
          Minden szakasz
        </button>
        <button className={onlyReady ? 'on' : ''} onClick={() => setOnlyReady(true)}>
          Csak a kész szakaszok
        </button>
      </div>

      {[1, 2, 3].map((v) => {
        const chs = TOC.filter((c) => c.volume === v);
        const secs = chs.flatMap((c) => c.sections);
        const d = secs.filter((s) => SECTIONS[s.id]).length;
        const [c1, c2] = VOL_COLORS[v];
        const style = { '--va': c1, '--vb': c2 } as CSSProperties;
        return (
          <section key={v} className="toc-vol" style={style}>
            <div className="toc-vol-head">
              <div className="toc-vol-n">{'I'.repeat(v)}</div>
              <div className="toc-vol-txt">
                <h2>{VOLUME_TITLES[v]}</h2>
                <div className="toc-vol-sub">{SUB[v]}</div>
              </div>
              <div className="toc-vol-prog">
                <div className="vbar">
                  <i style={{ width: `${(d / secs.length) * 100}%` }} />
                </div>
                <span>
                  {d} / {secs.length} szakasz
                </span>
              </div>
            </div>
            <div className="toc-grid">
              {chs.map((ch) => {
                const done = ch.sections.filter((s) => SECTIONS[s.id]).length;
                const shown = onlyReady ? ch.sections.filter((s) => SECTIONS[s.id]) : ch.sections;
                if (onlyReady && done === 0) return null;
                const cs = { '--c': CH_COLORS[(ch.n - 1) % CH_COLORS.length], '--i': idx++ } as CSSProperties;
                return (
                  <div key={ch.n} className={`toc-ch ${done ? 'started' : 'idle'}`} style={cs}>
                    <div className="toc-ch-top">
                      <svg className="emblem" viewBox="0 0 120 72" aria-hidden>
                        {emblem(ch.n)}
                      </svg>
                      <span className="toc-ch-n">{ch.n}</span>
                    </div>
                    <div className="toc-ch-t">{ch.title}</div>
                    <div className="pips" title={`${done} / ${ch.sections.length} szakasz kész`}>
                      {ch.sections.map((s) => (
                        <i key={s.id} className={SECTIONS[s.id] ? 'on' : ''} />
                      ))}
                      <span>
                        {done}/{ch.sections.length}
                      </span>
                    </div>
                    <ol className="tl">
                      {shown.map((s) => {
                        const rdy = Boolean(SECTIONS[s.id]);
                        return (
                          <li key={s.id} className={rdy ? 'ready' : 'soon'}>
                            <button disabled={!rdy} onClick={() => go(s.id)}>
                              <span className="node" />
                              <span className="id">{s.id}</span>
                              <span className="t">{s.title}</span>
                              {completed.has(s.id) && (
                                <span className="done-check" title="Elvégezve" aria-label="Elvégezve">
                                  ✓
                                </span>
                              )}
                              {rdy ? <span className="pg">{SECTIONS[s.id].pages} old.</span> : <span className="pg soon-t">hamarosan</span>}
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
