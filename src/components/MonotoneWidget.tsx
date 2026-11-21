import { useState } from 'react';
import { Plane } from './Plane';
import { M } from './M';

type F = { id: string; tex: string; f: (x: number) => number; up: string; down: string };
const LIST: F[] = [
  { id: 'sq', tex: 'x^2', f: (x) => x * x, up: '[0;\\,\\infty)', down: '(-\\infty;\\,0]' },
  { id: 'cu', tex: 'x^3', f: (x) => x ** 3, up: '(-\\infty;\\,\\infty)', down: '\\text{sehol}' },
  { id: 'inv', tex: '1/x', f: (x) => 1 / x, up: '\\text{sehol}', down: '(-\\infty;0)\\text{ és }(0;\\infty)\\text{ külön-külön}' },
  { id: 'c3', tex: 'x^3-3x', f: (x) => x ** 3 - 3 * x, up: '(-\\infty;-1]\\text{ és }[1;\\infty)', down: '[-1;\\,1]' },
  { id: 'abs', tex: '|x-1|', f: (x) => Math.abs(x - 1), up: '[1;\\,\\infty)', down: '(-\\infty;\\,1]' },
  { id: 'rt', tex: '\\sqrt{x}', f: (x) => Math.sqrt(x), up: '[0;\\,\\infty)', down: '\\text{sehol}' },
  { id: 'i2', tex: '1/x^2', f: (x) => 1 / (x * x), up: '(-\\infty;\\,0)', down: '(0;\\,\\infty)' },
];

/** Növekvő és csökkenő szakaszok: a grafikon jobbra haladva emelkedő része kék, a lejtő része narancs. */
export function MonotoneWidget() {
  const [i, setI] = useState(3);
  const F = LIST[i];
  return (
    <div className="widget">
      <div className="widget-title">Hol növekszik, hol csökken?</div>
      <div className="relbuttons">
        {LIST.map((g, k) => (
          <button key={g.id} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <M t={g.tex} />
          </button>
        ))}
      </div>
      <Plane xmin={-4} xmax={4} ymin={-4} ymax={4}>
        {(m) => {
          const segs: JSX.Element[] = [];
          const N = 400;
          let prev: { x: number; y: number } | null = null;
          for (let k = 0; k <= N; k++) {
            const x = m.xmin + ((m.xmax - m.xmin) * k) / N;
            const y = F.f(x);
            if (!Number.isFinite(y)) {
              prev = null;
              continue;
            }
            if (prev && Math.abs(y - prev.y) < 3) {
              const rising = y > prev.y;
              segs.push(
                <line
                  key={k}
                  x1={m.X(prev.x)}
                  y1={m.Y(prev.y)}
                  x2={m.X(x)}
                  y2={m.Y(y)}
                  stroke={rising ? '#38bdf8' : '#fb923c'}
                  strokeWidth={3}
                  strokeLinecap="round"
                />,
              );
            }
            prev = { x, y };
          }
          return <>{segs}</>;
        }}
      </Plane>
      <div className="result">
        <M block t={`f(x)=${F.tex}`} />
      </div>
      <div className="explain">
        <p>
          <span style={{ color: '#38bdf8' }}>Kék: növekvő szakasz</span> — <M t={F.up} />.
        </p>
        <p>
          <span style={{ color: '#fb923c' }}>Narancs: csökkenő szakasz</span> — <M t={F.down} />.
        </p>
      </div>
    </div>
  );
}
