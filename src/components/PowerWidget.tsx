import { useState } from 'react';
import { Plane, PFunc } from './Plane';
import { M } from './M';

type P = { id: string; tex: string; f: (x: number) => number; dom: string };

const cbrt = Math.cbrt;
export const POWERS: P[] = [
  { id: 'x1', tex: 'x', f: (x) => x, dom: '(-\\infty;\\infty)' },
  { id: 'x2', tex: 'x^2', f: (x) => x * x, dom: '(-\\infty;\\infty)' },
  { id: 'x3', tex: 'x^3', f: (x) => x ** 3, dom: '(-\\infty;\\infty)' },
  { id: 'x4', tex: 'x^4', f: (x) => x ** 4, dom: '(-\\infty;\\infty)' },
  { id: 'x5', tex: 'x^5', f: (x) => x ** 5, dom: '(-\\infty;\\infty)' },
  { id: 'xm1', tex: 'x^{-1}', f: (x) => 1 / x, dom: 'x\\ne0' },
  { id: 'xm2', tex: 'x^{-2}', f: (x) => 1 / (x * x), dom: 'x\\ne0' },
  { id: 'sq', tex: 'x^{1/2}', f: (x) => (x >= 0 ? Math.sqrt(x) : NaN), dom: '[0;\\infty)' },
  { id: 'cb', tex: 'x^{1/3}', f: (x) => cbrt(x), dom: '(-\\infty;\\infty)' },
  { id: 'x32', tex: 'x^{3/2}', f: (x) => (x >= 0 ? x ** 1.5 : NaN), dom: '[0;\\infty)' },
  { id: 'x23', tex: 'x^{2/3}', f: (x) => cbrt(x) ** 2, dom: '(-\\infty;\\infty)' },
];
const COL = ['#38bdf8', '#fb923c', '#34d399', '#fbbf24', '#818cf8', '#f87171', '#2dd4bf', '#a3e635', '#e2e8f0', '#fdba74', '#7dd3fc'];

/** Hatványfüggvények összehasonlítása: tetszőleges kiválasztott függvények közös grafikonon. */
export function PowerWidget() {
  const [on, setOn] = useState<string[]>(['x2', 'x3']);
  const toggle = (id: string) => setOn((o) => (o.includes(id) ? o.filter((v) => v !== id) : [...o, id]));
  return (
    <div className="widget">
      <div className="widget-title">Hatványfüggvények: x<sup>a</sup></div>
      <div className="relbuttons chips">
        {POWERS.map((p, k) => (
          <button
            key={p.id}
            className={on.includes(p.id) ? 'on' : ''}
            style={on.includes(p.id) ? { background: COL[k], color: '#06121f' } : { borderColor: COL[k] }}
            onClick={() => toggle(p.id)}
          >
            <M t={p.tex} />
          </button>
        ))}
      </div>
      <Plane xmin={-4} xmax={4} ymin={-4} ymax={4}>
        {(m) => (
          <>
            {POWERS.map((p, k) => (on.includes(p.id) ? <PFunc key={p.id} map={m} fn={p.f} color={COL[k]} /> : null))}
          </>
        )}
      </Plane>
      <div className="explain">
        {on.length === 0 && <p>Válassz ki legalább egy függvényt.</p>}
        {POWERS.filter((p) => on.includes(p.id)).map((p) => (
          <p key={p.id}>
            <M t={`y=${p.tex}:\\ D=${p.dom}`} />
          </p>
        ))}
        <p>
          Minden kijelölt grafikon átmegy az (1; 1) ponton. A (−1; 1) között a nagyobb kitevő laposabb görbét ad, |x| &gt; 1-nél
          meredekebbet.
        </p>
      </div>
    </div>
  );
}
