import { useState } from 'react';
import { Plane, PEnd, PFunc, PPoint, PSeg } from './Plane';
import { M, hu } from './M';

type Seg = { a: number; b: number; ac: boolean; bc: boolean; f: (x: number) => number };
type P = { id: string; tex: string; value: (x: number) => number; segs: Seg[]; rule: string };

const stepSegs = (kind: 'floor' | 'ceil'): Seg[] => {
  const out: Seg[] = [];
  for (let k = -7; k <= 6; k++) {
    out.push(
      kind === 'floor'
        ? { a: k, b: k + 1, ac: true, bc: false, f: () => k }
        : { a: k, b: k + 1, ac: false, bc: true, f: () => k + 1 },
    );
  }
  return out;
};

const LIST: P[] = [
  {
    id: 'abs',
    tex: '|x|',
    value: Math.abs,
    segs: [
      { a: -8, b: 0, ac: true, bc: true, f: (x) => -x },
      { a: 0, b: 8, ac: true, bc: true, f: (x) => x },
    ],
    rule: 'x ≥ 0 esetén x, x < 0 esetén −x',
  },
  {
    id: 'floor',
    tex: '\\lfloor x\\rfloor',
    value: Math.floor,
    segs: stepSegs('floor'),
    rule: 'a legnagyobb egész szám, amely nem nagyobb x-nél',
  },
  {
    id: 'ceil',
    tex: '\\lceil x\\rceil',
    value: Math.ceil,
    segs: stepSegs('ceil'),
    rule: 'a legkisebb egész szám, amely nem kisebb x-nél',
  },
  {
    id: 'g',
    tex: 'g(x)',
    value: (x) => (x < -1 ? x + 3 : x <= 1 ? 2 : 4 - x),
    segs: [
      { a: -8, b: -1, ac: true, bc: false, f: (x) => x + 3 },
      { a: -1, b: 1, ac: true, bc: true, f: () => 2 },
      { a: 1, b: 8, ac: false, bc: true, f: (x) => 4 - x },
    ],
    rule: 'x + 3, ha x < −1; 2, ha −1 ≤ x ≤ 1; 4 − x, ha x > 1',
  },
];

/** Szakaszonként definiált függvények: grafikon nyílt/zárt végpontokkal, és a függvényérték egy próbahelyen. */
export function PiecewiseWidget() {
  const [i, setI] = useState(0);
  const [x, setX] = useState(1.5);
  const P = LIST[i];
  const y = P.value(x);
  return (
    <div className="widget">
      <div className="widget-title">Szakaszonként definiált függvények</div>
      <div className="relbuttons">
        {LIST.map((g, k) => (
          <button key={g.id} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <M t={g.tex} />
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          x = {hu(x)}
          <input type="range" min={-6} max={6} step={0.25} value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-7} xmax={7} ymin={-5} ymax={5}>
        {(m) => (
          <>
            {P.segs.map((s, k) => {
              const lo = Math.max(s.a, m.xmin);
              const hi = Math.min(s.b, m.xmax);
              if (hi < lo) return null;
              return (
                <g key={k}>
                  <PFunc map={m} fn={s.f} from={lo} to={hi} n={40} />
                  {s.a >= m.xmin && <PEnd map={m} x={s.a} y={s.f(s.a)} closed={s.ac} />}
                  {s.b <= m.xmax && <PEnd map={m} x={s.b} y={s.f(s.b)} closed={s.bc} />}
                </g>
              );
            })}
            <PSeg map={m} x1={x} y1={0} x2={x} y2={y} />
            <PPoint map={m} x={x} y={y} color="#fbbf24" />
          </>
        )}
      </Plane>
      <div className="explain">
        <p>
          Szabály: {P.rule}. Az x = {hu(x)} helyen a függvényérték {hu(Math.round(y * 1000) / 1000)}.
        </p>
        <p>A teli pont hozzátartozik a grafikonhoz, az üres nem; az ugrásnál ez dönti el, melyik érték érvényes.</p>
      </div>
    </div>
  );
}
