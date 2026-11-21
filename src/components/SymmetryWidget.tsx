import { useState } from 'react';
import { Plane, PFunc, PPoint, PSeg } from './Plane';
import { M, hu } from './M';

type F = { id: string; tex: string; f: (x: number) => number };
const LIST: F[] = [
  { id: 'e1', tex: 'x^4-3x^2+1', f: (x) => x ** 4 - 3 * x * x + 1 },
  { id: 'o1', tex: 'x^3-x', f: (x) => x ** 3 - x },
  { id: 'e2', tex: '|x|', f: Math.abs },
  { id: 'n1', tex: 'x+1', f: (x) => x + 1 },
  { id: 'n2', tex: 'x^2+x', f: (x) => x * x + x },
  { id: 'o2', tex: 'x|x|', f: (x) => x * Math.abs(x) },
  { id: 'o3', tex: '1/x', f: (x) => 1 / x },
  { id: 'e3', tex: '\\dfrac{1}{x^2+1}', f: (x) => 1 / (x * x + 1) },
  { id: 'n3', tex: '\\sqrt{x}', f: (x) => Math.sqrt(x) },
];

export function parity(f: (x: number) => number): 'páros' | 'páratlan' | 'páros és páratlan is' | 'egyik sem' {
  let even = true;
  let odd = true;
  let n = 0;
  for (let x = 0.125; x <= 8; x += 0.125) {
    const a = f(x);
    const b = f(-x);
    if (Number.isFinite(a) !== Number.isFinite(b)) return 'egyik sem'; // a tartomány nem szimmetrikus
    if (!Number.isFinite(a)) continue;
    n++;
    if (Math.abs(a - b) > 1e-9) even = false;
    if (Math.abs(a + b) > 1e-9) odd = false;
  }
  if (n === 0) return 'egyik sem';
  return even && odd ? 'páros és páratlan is' : even ? 'páros' : odd ? 'páratlan' : 'egyik sem';
}

/** Páros/páratlan függvények: a P(x; f(x)) és a Q(−x; f(−x)) pont összevetése, és a kiértékelt besorolás. */
export function SymmetryWidget() {
  const [i, setI] = useState(0);
  const [x, setX] = useState(1.5);
  const F = LIST[i];
  const a = F.f(x);
  const b = F.f(-x);
  const ok = Number.isFinite(a) && Number.isFinite(b);
  return (
    <div className="widget">
      <div className="widget-title">Páros, páratlan vagy egyik sem?</div>
      <div className="relbuttons chips">
        {LIST.map((g, k) => (
          <button key={g.id} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <M t={g.tex} />
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          x = {hu(x)}
          <input type="range" min={0.25} max={3.5} step={0.25} value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-4} xmax={4} ymin={-4} ymax={4}>
        {(m) => (
          <>
            <PFunc map={m} fn={F.f} />
            {Number.isFinite(a) && <PPoint map={m} x={x} y={Math.max(-4, Math.min(4, a))} label="P" color="#fbbf24" />}
            {Number.isFinite(b) && <PPoint map={m} x={-x} y={Math.max(-4, Math.min(4, b))} label="Q" color="#34d399" dx={-18} />}
            {ok && <PSeg map={m} x1={x} y1={Math.max(-4, Math.min(4, a))} x2={-x} y2={Math.max(-4, Math.min(4, b))} />}
          </>
        )}
      </Plane>
      <div className="explain">
        <p>
          f({hu(x)}) = {Number.isFinite(a) ? hu(Math.round(a * 1000) / 1000) : 'nincs értelmezve'}, f({hu(-x)}) ={' '}
          {Number.isFinite(b) ? hu(Math.round(b * 1000) / 1000) : 'nincs értelmezve'}.
        </p>
        <p>
          Besorolás (a [−8; 8] tartományon mintavételezve): <strong>{parity(F.f)}</strong>.
        </p>
      </div>
    </div>
  );
}
