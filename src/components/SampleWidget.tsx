import { useState } from 'react';
import { Plane, PFunc, PPoint } from './Plane';
import { M, hu } from './M';

const LIST = [
  { id: 'sq', tex: 'x^2', f: (x: number) => x * x, a: -3, b: 3 },
  { id: 'cub', tex: 'x^3-3x', f: (x: number) => x ** 3 - 3 * x, a: -2.5, b: 2.5 },
  { id: 'sin', tex: '2\\sin(3x)', f: (x: number) => 2 * Math.sin(3 * x), a: -3, b: 3 },
];

/** Hány pontot kell kiszámolni? A szakaszokkal összekötött mintapontok és az igazi görbe összevetése. */
export function SampleWidget() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(4);
  const F = LIST[i];
  const pts = Array.from({ length: n + 1 }, (_, k) => {
    const x = F.a + ((F.b - F.a) * k) / n;
    return { x, y: F.f(x) };
  });
  return (
    <div className="widget">
      <div className="widget-title">Pontokból görbe: hány pont elég?</div>
      <div className="relbuttons">
        {LIST.map((g, k) => (
          <button key={g.id} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <M t={g.tex} />
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          osztások száma: {n} ({n + 1} pont)
          <input type="range" min={2} max={40} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-4} xmax={4} ymin={-5} ymax={5}>
        {(m) => (
          <>
            <PFunc map={m} fn={F.f} from={F.a} to={F.b} cls="pl-ghost" />
            <polyline
              points={pts.map((p) => `${m.X(p.x).toFixed(1)},${m.Y(p.y).toFixed(1)}`).join(' ')}
              className="pl-main"
            />
            {pts.map((p, k) => (
              <circle key={k} cx={m.X(p.x)} cy={m.Y(p.y)} r={4} fill="#fbbf24" />
            ))}
            <PPoint map={m} x={F.a} y={F.f(F.a)} color="#fbbf24" />
          </>
        )}
      </Plane>
      <div className="explain">
        <p>
          A halvány vonal a függvény valódi grafikonja, a kék a mintapontok összekötése. Az osztások száma {n}, a lépésköz{' '}
          {hu(Math.round(((F.b - F.a) / n) * 1000) / 1000)}. Kevés pontnál a „lecsiszolt” szakaszvonal elnyeli a
          hullámokat, sok pontnál alig különböztethető meg a valódi görbétől. Az a kérdés, hogy a pontok között mit csinál a
          függvény, a deriváltnál kapja meg a pontos választ.
        </p>
      </div>
    </div>
  );
}
