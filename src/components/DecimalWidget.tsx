import { useMemo, useState } from 'react';

type Expansion = {
  sign: string;
  intPart: number;
  pre: number[];
  period: number[];
  truncated: boolean;
};

/** Hosszú osztással előállítja m/n tizedes alakját; a maradékokból ismeri fel a szakaszt. */
export function expand(m: number, n: number): Expansion {
  const sign = m < 0 ? '−' : '';
  const a = Math.abs(m);
  const intPart = Math.floor(a / n);
  let r = a % n;
  const digits: number[] = [];
  const seen = new Map<number, number>();
  const LIMIT = 240;
  while (r !== 0 && !seen.has(r) && digits.length < LIMIT) {
    seen.set(r, digits.length);
    r *= 10;
    digits.push(Math.floor(r / n));
    r %= n;
  }
  if (r === 0) return { sign, intPart, pre: digits, period: [], truncated: false };
  if (seen.has(r)) {
    const start = seen.get(r) as number;
    return { sign, intPart, pre: digits.slice(0, start), period: digits.slice(start), truncated: false };
  }
  return { sign, intPart, pre: digits, period: [], truncated: true };
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

export function DecimalWidget() {
  const [m, setM] = useState(5);
  const [n, setN] = useState(7);
  const safeN = Math.max(1, Math.min(9999, Math.round(n) || 1));
  const safeM = Math.max(-99999, Math.min(99999, Math.round(m) || 0));
  const ex = useMemo(() => expand(safeM, safeN), [safeM, safeN]);
  const g = gcd(safeM, safeN) || 1;

  const shown = ex.period.length > 0 ? ex.period.slice(0, 40) : [];
  return (
    <div className="widget">
      <div className="widget-title">Tört → tizedes tört (hosszú osztás)</div>
      <div className="row">
        <label>
          számláló
          <input type="number" value={m} onChange={(e) => setM(Number(e.target.value))} />
        </label>
        <span className="frac-bar">/</span>
        <label>
          nevező
          <input type="number" min={1} max={9999} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <div className="result big">
        {ex.sign}
        {ex.intPart}
        {(ex.pre.length > 0 || ex.period.length > 0) && ','}
        {ex.pre.join('')}
        {ex.period.length > 0 && <span className="overline">{shown.join('')}{ex.period.length > 40 ? '…' : ''}</span>}
        {ex.period.length > 0 && <span className="dots">…</span>}
      </div>
      <div className="explain">
        {safeN !== n || safeM !== m ? <p>(A bemenetet a megengedett tartományra korlátoztam.)</p> : null}
        {ex.truncated && <p>A szakasz hosszabb a megjelenítési határnál.</p>}
        {!ex.truncated && ex.period.length === 0 && (
          <p>
            Véges tizedes tört: az osztás {ex.pre.length} lépés után maradék nélkül véget ért.
          </p>
        )}
        {ex.period.length > 0 && (
          <p>
            Végtelen szakaszos tizedes tört. A szakasz előtt {ex.pre.length} számjegy áll, a szakasz hossza{' '}
            {ex.period.length}. Mivel a maradék csak {safeN} féle lehet (0-val együtt), legfeljebb {safeN - 1} nem nulla maradék
            fordulhat elő, ezért az ismétlődés elkerülhetetlen.
          </p>
        )}
        {g > 1 && (
          <p>
            A tört egyszerűsíthető: {safeM / g}/{safeN / g}.
          </p>
        )}
      </div>
    </div>
  );
}
