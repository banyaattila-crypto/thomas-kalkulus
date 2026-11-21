import { useState } from 'react';
import { NumberLine } from './NumberLine';
import { M, tex, hu } from './M';

/** Megmutatja, mi történik két szám sorrendjével, ha mindkettőt megszorozzuk c-vel. */
export function SignFlipWidget() {
  const [p, setP] = useState(-2);
  const [q, setQ] = useState(3);
  const [c, setC] = useState(-1);

  const lo = Math.min(p, q);
  const hi = Math.max(p, q);
  const same = lo === hi;
  const a2 = c * lo;
  const b2 = c * hi;

  let verdict: string;
  if (same) verdict = 'Válassz két különböző számot.';
  else if (c > 0) verdict = 'c > 0: a sorrend megmarad.';
  else if (c < 0) verdict = 'c < 0: a sorrend megfordul, mintha a számegyenest a 0 körül tükröznénk.';
  else verdict = 'c = 0: mindkét szám 0 lesz, az egyenlőtlenség egyenlőséggé válik.';

  return (
    <div className="widget">
      <div className="widget-title">Mi történik az egyenlőtlenséggel szorzáskor?</div>
      <div className="sliders">
        <label>
          a = {hu(p)}
          <input type="range" min={-5} max={5} step={1} value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
        <label>
          b = {hu(q)}
          <input type="range" min={-5} max={5} step={1} value={q} onChange={(e) => setQ(Number(e.target.value))} />
        </label>
        <label>
          c = {hu(c)}
          <input type="range" min={-3} max={3} step={1} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
      <p className="eq-line">
        <M t={`${tex(lo)} ${same ? '=' : '<'} ${tex(hi)}`} />
        {'  →  '}
        <M t={`${tex(a2)} ${same || c === 0 ? '=' : c > 0 ? '<' : '>'} ${tex(b2)}`} />
      </p>
      <NumberLine
        min={-16}
        max={16}
        step={2}
        marks={[
          { x: lo, label: 'a', color: '#38bdf8' },
          { x: hi, label: 'b', color: '#38bdf8' },
          ...(same ? [] : [
            { x: a2, label: 'c·a', color: '#f59e0b' },
            { x: b2, label: 'c·b', color: '#fb923c' },
          ]),
        ]}
      />
      <div className="explain">
        <p>{verdict}</p>
      </div>
    </div>
  );
}
