import { useState } from 'react';
import { hu } from './M';

type F = { name: string; label: string; f: (x: number) => number; why: (x: number) => string };

const LIST: F[] = [
  { name: 'négyzet', label: 'f(x) = x²', f: (x) => x * x, why: () => '' },
  {
    name: 'reciprok',
    label: 'f(x) = 1/x',
    f: (x) => 1 / x,
    why: () => 'a 0-val nem lehet osztani',
  },
  {
    name: 'gyök',
    label: 'f(x) = √x',
    f: (x) => Math.sqrt(x),
    why: () => 'negatív szám valós négyzetgyöke nem létezik',
  },
  {
    name: 'gyök(4−x)',
    label: 'f(x) = √(4 − x)',
    f: (x) => Math.sqrt(4 - x),
    why: (x) => `4 − x = ${hu(4 - x)} negatív`,
  },
];

/** Függvény mint automata: bemenet → szabály → kimenet; ha a bemenet nem megengedett, az automata „elakad”. */
export function FuncMachineWidget() {
  const [i, setI] = useState(0);
  const [x, setX] = useState(3);
  const fn = LIST[i];
  const y = fn.f(x);
  const ok = Number.isFinite(y);
  return (
    <div className="widget">
      <div className="widget-title">A függvény mint automata</div>
      <div className="relbuttons">
        {LIST.map((g, k) => (
          <button key={g.name} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            {g.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          bemenet x = {hu(x)}
          <input type="range" min={-6} max={6} step={0.5} value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
      </div>
      <div className="machine">
        <div className="mc-box in">{hu(x)}</div>
        <div className="mc-arrow">→</div>
        <div className={`mc-box fn ${ok ? '' : 'bad'}`}>{fn.label}</div>
        <div className="mc-arrow">→</div>
        <div className={`mc-box out ${ok ? '' : 'bad'}`}>{ok ? hu(Math.round(y * 1e6) / 1e6) : 'nincs érték'}</div>
      </div>
      <div className="explain">
        {ok ? (
          <p>Az x = {hu(x)} megengedett bemenet, a kimenet {hu(Math.round(y * 1e6) / 1e6)}.</p>
        ) : (
          <p>Az x = {hu(x)} nem tartozik az értelmezési tartományhoz: {fn.why(x)}.</p>
        )}
      </div>
    </div>
  );
}
