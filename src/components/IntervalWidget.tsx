import { useState } from 'react';
import { NumberLine, Seg } from './NumberLine';
import { M, tex } from './M';

/** Intervallum-építő: végpontok, nyílt/zárt, végtelen oldalak; kiírja a jelölést és a típust. */
export function IntervalWidget() {
  const [l, setL] = useState(-2);
  const [r, setR] = useState(3);
  const [lClosed, setLClosed] = useState(true);
  const [rClosed, setRClosed] = useState(false);
  const [lInf, setLInf] = useState(false);
  const [rInf, setRInf] = useState(false);

  const right = Math.max(r, l + 0.5);
  const lc = lInf ? false : lClosed;
  const rc = rInf ? false : rClosed;

  const seg: Seg = {
    from: lInf ? null : l,
    to: rInf ? null : right,
    fromClosed: lc,
    toClosed: rc,
  };

  const left = lInf ? '(-\\infty' : `${lc ? '[' : '('}${tex(l)}`;
  const rgt = rInf ? '\\infty)' : `${tex(right)}${rc ? ']' : ')'}`;
  const notation = `${left};\\ ${rgt}`;

  const lo = lInf ? '' : `${tex(l)} ${lc ? '\\le' : '<'} `;
  const hi = rInf ? '' : ` ${rc ? '\\le' : '<'} ${tex(right)}`;
  const setForm = lInf && rInf ? '\\mathbb{R}' : `\\{x\\in\\mathbb{R} : ${lo}x${hi}\\}`;

  let kind: string;
  if (lInf && rInf) kind = 'a teljes számegyenes, egyszerre nyílt és zárt';
  else if (lInf || rInf) kind = (lInf ? rc : lc) ? 'végtelen, zárt (van végpontja, és az hozzátartozik)' : 'végtelen, nyílt';
  else if (lc && rc) kind = 'véges, zárt';
  else if (!lc && !rc) kind = 'véges, nyílt';
  else kind = 'véges, félig nyílt';

  return (
    <div className="widget">
      <div className="widget-title">Intervallum-építő</div>
      <div className="sliders">
        <label>
          bal végpont {lInf ? '(−∞)' : tex(l).replace('{,}', ',')}
          <input type="range" min={-6} max={6} step={0.5} value={l} disabled={lInf} onChange={(e) => setL(Number(e.target.value))} />
        </label>
        <label>
          jobb végpont {rInf ? '(+∞)' : tex(right).replace('{,}', ',')}
          <input type="range" min={-5.5} max={6.5} step={0.5} value={right} disabled={rInf} onChange={(e) => setR(Number(e.target.value))} />
        </label>
      </div>
      <div className="checks">
        <label><input type="checkbox" checked={lClosed} disabled={lInf} onChange={(e) => setLClosed(e.target.checked)} /> bal végpont hozzátartozik</label>
        <label><input type="checkbox" checked={rClosed} disabled={rInf} onChange={(e) => setRClosed(e.target.checked)} /> jobb végpont hozzátartozik</label>
        <label><input type="checkbox" checked={lInf} onChange={(e) => setLInf(e.target.checked)} /> balra végtelen</label>
        <label><input type="checkbox" checked={rInf} onChange={(e) => setRInf(e.target.checked)} /> jobbra végtelen</label>
      </div>
      <NumberLine min={-7} max={7} segs={[seg]} />
      <div className="result">
        <M t={notation} block />
        <M t={setForm} block />
      </div>
      <div className="explain">
        <p>Típus: {kind}. Tömör kör = hozzátartozik, üres kör = nem tartozik hozzá.</p>
      </div>
    </div>
  );
}
