import { useState } from 'react';
import { Plane, PCircle, PFunc, PPoint, PVLine } from './Plane';
import { M, hu } from './M';

type Rel = { id: string; tex: string; ys: (a: number) => number[]; draw: (m: import('./Plane').PMap) => JSX.Element };

const RELS: Rel[] = [
  {
    id: 'par',
    tex: 'y=x^2-2',
    ys: (a) => [a * a - 2],
    draw: (m) => <PFunc map={m} fn={(x) => x * x - 2} />,
  },
  {
    id: 'circ',
    tex: 'x^2+y^2=9',
    ys: (a) => (Math.abs(a) > 3 ? [] : Math.abs(a) === 3 ? [0] : [Math.sqrt(9 - a * a), -Math.sqrt(9 - a * a)]),
    draw: (m) => <PCircle map={m} h={0} k={0} r={3} />,
  },
  {
    id: 'side',
    tex: 'x=y^2',
    ys: (a) => (a < 0 ? [] : a === 0 ? [0] : [Math.sqrt(a), -Math.sqrt(a)]),
    draw: (m) => (
      <>
        <PFunc map={m} fn={(x) => Math.sqrt(x)} />
        <PFunc map={m} fn={(x) => -Math.sqrt(x)} />
      </>
    ),
  },
  {
    id: 'abs',
    tex: '|x|+|y|=3',
    ys: (a) => (Math.abs(a) > 3 ? [] : Math.abs(a) === 3 ? [0] : [3 - Math.abs(a), -(3 - Math.abs(a))]),
    draw: (m) => (
      <>
        <PFunc map={m} fn={(x) => 3 - Math.abs(x)} from={-3} to={3} />
        <PFunc map={m} fn={(x) => -(3 - Math.abs(x))} from={-3} to={3} />
      </>
    ),
  },
];

/** Vertikális teszt: a mozgatott függőleges egyenes legfeljebb hány pontban metszi az alakzatot? */
export function VerticalWidget() {
  const [i, setI] = useState(0);
  const [a, setA] = useState(1.5);
  const R = RELS[i];
  const ys = R.ys(a);
  // a legnagyobb metszéspontszám a teljes tartományon, mintavételezve
  let best = 0;
  for (let x = -6; x <= 6; x += 0.25) best = Math.max(best, R.ys(x).length);
  return (
    <div className="widget">
      <div className="widget-title">Vertikális teszt</div>
      <div className="relbuttons">
        {RELS.map((g, k) => (
          <button key={g.id} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <M t={g.tex} />
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          a függőleges egyenes helye: x = {hu(a)}
          <input type="range" min={-5} max={5} step={0.25} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-6} xmax={6} ymin={-5} ymax={5}>
        {(m) => (
          <>
            {R.draw(m)}
            <PVLine map={m} x={a} cls="pl-alt" />
            {ys.map((y, k) => (
              <PPoint map={m} key={k} x={a} y={y} color="#fbbf24" />
            ))}
          </>
        )}
      </Plane>
      <div className="explain">
        <p>
          Az x = {hu(a)} egyenes {ys.length} pontban metszi az alakzatot. Az alakzat a teljes tartományon legfeljebb {best}{' '}
          pontban metszhető egy függőleges egyenessel,{' '}
          <strong>{best <= 1 ? 'tehát lehet egy függvény grafikonja.' : 'tehát nem lehet egyetlen függvény grafikonja.'}</strong>
        </p>
      </div>
    </div>
  );
}
