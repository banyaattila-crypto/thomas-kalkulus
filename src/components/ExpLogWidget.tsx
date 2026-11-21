import { useState } from 'react';
import { Plane, PFunc, PPoint } from './Plane';
import { M, hu } from './M';

/** Exponenciális és logaritmusfüggvény: egymás tükörképei az y = x egyenesre. */
export function ExpLogWidget() {
  const [a, setA] = useState(2);
  const bad = a === 1;
  return (
    <div className="widget">
      <div className="widget-title">Az a^x és a log_a x függvény</div>
      <div className="sliders">
        <label>
          alap a = {hu(a)}
          <input type="range" min={0.25} max={4} step={0.25} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-5} xmax={5} ymin={-5} ymax={5}>
        {(m) => (
          <>
            <PFunc map={m} fn={(x) => x} cls="pl-dash" />
            {!bad && <PFunc map={m} fn={(x) => a ** x} />}
            {!bad && <PFunc map={m} fn={(x) => (x > 0 ? Math.log(x) / Math.log(a) : NaN)} cls="pl-alt" from={0.001} />}
            <PPoint map={m} x={0} y={1} color="#34d399" />
            <PPoint map={m} x={1} y={0} color="#34d399" />
          </>
        )}
      </Plane>
      <div className="explain">
        {bad ? (
          <p>Az a = 1 nem megengedett alap: az 1<sup>x</sup> mindig 1, tehát konstans függvény, és logaritmusa nincs.</p>
        ) : (
          <>
            <p>
              <M t={`y=${hu(a)}^x`} /> (kék): értelmezési tartománya a teljes számegyenes, értékkészlete (0; ∞); a (0; 1) ponton megy át.{' '}
              {a > 1 ? 'Alap > 1: növekvő.' : 'Alap < 1: csökkenő.'}
            </p>
            <p>
              <M t={`y=\\log_{${hu(a)}}x`} /> (narancs): tartománya (0; ∞), értékkészlete a teljes számegyenes; az (1; 0) ponton megy át.
              A két görbe az y = x szaggatott egyenesre tükrös, mert egymás inverzei.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
