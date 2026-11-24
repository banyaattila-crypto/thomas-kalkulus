import { useState } from 'react';
import { NumberLine, Seg } from './NumberLine';
import { M, tex } from './M';

type Rel = '<' | '≤' | '>' | '≥' | '=';

function solve(rel: Rel, c: number, r: number): { segs: Seg[]; tex: string } {
  const a = c - r;
  const b = c + r;
  const A = tex(a);
  const B = tex(b);
  switch (rel) {
    case '<':
      return { segs: [{ from: a, to: b, fromClosed: false, toClosed: false }], tex: `(${A};\\ ${B})` };
    case '≤':
      return { segs: [{ from: a, to: b, fromClosed: true, toClosed: true }], tex: `[${A};\\ ${B}]` };
    case '>':
      return {
        segs: [
          { from: null, to: a, fromClosed: false, toClosed: false },
          { from: b, to: null, fromClosed: false, toClosed: false },
        ],
        tex: `(-\\infty;\\ ${A})\\cup(${B};\\ \\infty)`,
      };
    case '≥':
      return {
        segs: [
          { from: null, to: a, fromClosed: false, toClosed: true },
          { from: b, to: null, fromClosed: true, toClosed: false },
        ],
        tex: `(-\\infty;\\ ${A}]\\cup[${B};\\ \\infty)`,
      };
    default:
      return {
        segs: [
          { from: a, to: a, fromClosed: true, toClosed: true },
          { from: b, to: b, fromClosed: true, toClosed: true },
        ],
        tex: `\\{${A};\\ ${B}\\}`,
      };
  }
}

const REL_TEX: Record<Rel, string> = { '<': '<', '≤': '\\le', '>': '>', '≥': '\\ge', '=': '=' };
const COMPLEMENT: Partial<Record<Rel, Rel>> = { '<': '≥', '≥': '<', '≤': '>', '>': '≤' };

/** |x − c| ⋚ r megoldáshalmaza, a „c-től mért távolság” szemléletével és komplementer-váltóval. */
export function AbsWidget() {
  const [rel, setRel] = useState<Rel>('<');
  const [c, setC] = useState(1);
  const [r, setR] = useState(2);

  const sol = solve(rel, c, r);
  const compRel = COMPLEMENT[rel];
  const compSol = compRel ? solve(compRel, c, r) : null;
  const inside = c === 0 ? 'x' : c > 0 ? `x-${tex(c)}` : `x+${tex(-c)}`;

  return (
    <div className="widget">
      <div className="widget-title">Abszolútértékes egyenlőtlenség: távolság és komplementer</div>
      <div className="sliders">
        <label>
          középpont c = {tex(c).replace('{,}', ',')}
          <input type="range" min={-5} max={5} step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
        <label>
          sugár r = {tex(r).replace('{,}', ',')}
          <input type="range" min={0.5} max={5} step={0.5} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
      </div>
      <div className="relbuttons">
        {(['<', '≤', '>', '≥', '='] as Rel[]).map((x) => (
          <button key={x} className={x === rel ? 'on' : ''} onClick={() => setRel(x)}>
            {x}
          </button>
        ))}
        {compRel && (
          <button
            type="button"
            className="comp-btn"
            onClick={() => setRel(compRel)}
            title="Váltás a komplementer egyenlőtlenségre"
          >
            Komplementer ({compRel})
          </button>
        )}
      </div>
      <M t={`|${inside}| ${REL_TEX[rel]} ${tex(r)}`} block />
      <NumberLine min={-12} max={12} step={2} segs={sol.segs} marks={[{ x: c, label: 'c', color: '#38bdf8' }]} />
      <div className="result">
        <M t={`x \\in ${sol.tex}`} block />
      </div>
      <div className="explain">
        <p>
          Olvasat: az <em>x</em> távolsága a <em>c</em> ponttól{' '}
          {rel === '<'
            ? 'kisebb, mint'
            : rel === '≤'
              ? 'legfeljebb'
              : rel === '>'
                ? 'nagyobb, mint'
                : rel === '≥'
                  ? 'legalább'
                  : 'pontosan'}{' '}
          {tex(r).replace('{,}', ',')}.
        </p>
        {compSol && compRel && (
          <p>
            Komplementer (<M t={`|${inside}| ${REL_TEX[compRel]} ${tex(r)}`} />): <M t={compSol.tex} /> — a két halmaz
            egyesítése a teljes <M t="\mathbb{R}" />, metszetük üres.
          </p>
        )}
      </div>
    </div>
  );
}
