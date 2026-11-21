import { useState } from 'react';
import { Plane, PLine, PPoint } from './Plane';
import { M, hu, tex } from './M';
import { lineTex, pt, round } from './fmt';

/** y = mx + b: a meredekség és az y-tengelymetszet hatása; tengelymetszetek és irányszög. */
export function LineWidget() {
  const [k, setK] = useState(0.5);
  const [b, setB] = useState(-2);

  const phi = (() => {
    const p = (Math.atan(k) * 180) / Math.PI;
    return p < 0 ? p + 180 : p;
  })();
  const xi = k === 0 ? null : -b / k;

  return (
    <div className="widget">
      <div className="widget-title">Az y = mx + b egyenes</div>
      <div className="sliders">
        <label>
          meredekség m = {hu(k)}
          <input type="range" min={-4} max={4} step={0.25} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
        <label>
          y-tengelymetszet b = {hu(b)}
          <input type="range" min={-6} max={6} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>
      <Plane>
        {(m) => (
          <>
            <PLine map={m} k={k} b={b} />
            <PPoint map={m} x={0} y={b} label={`y-metszet ${pt(0, b)}`} color="#fb923c" dx={10} dy={-10} />
            {xi !== null && <PPoint map={m} x={xi} y={0} label={`x-metszet ${pt(xi, 0)}`} color="#34d399" dx={10} dy={18} />}
          </>
        )}
      </Plane>
      <div className="result">
        <M t={lineTex(k, b)} block />
      </div>
      <div className="explain">
        <p>
          Az y-tengelyt az y = {hu(b)} helyen metszi.{' '}
          {xi === null
            ? b === 0
              ? 'Vízszintes egyenes, amely éppen az x-tengely.'
              : 'Vízszintes egyenes, az x-tengelyt nem metszi.'
            : `Az x-tengelyt ott metszi, ahol mx + b = 0, vagyis x = −b/m = ${tex(Math.round(xi * 1000) / 1000).replace('{,}', ',')} helyen.`}{' '}
          Irányszög: φ ≈ {round(phi, 1)}°.
        </p>
      </div>
    </div>
  );
}
