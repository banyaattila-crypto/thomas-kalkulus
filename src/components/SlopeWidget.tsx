import { useState } from 'react';
import { Plane, PLine, PPoint, PSeg, PVLine } from './Plane';
import { M, hu, tex } from './M';
import { lineTex, pt, round } from './fmt';

/** Két pont → növekmények, meredekség, irányszög, az egyenes egyenlete. */
export function SlopeWidget() {
  const [x1, setX1] = useState(-2);
  const [y1, setY1] = useState(1);
  const [x2, setX2] = useState(3);
  const [y2, setY2] = useState(-4);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const same = dx === 0 && dy === 0;
  const vertical = dx === 0 && dy !== 0;
  const k = vertical || same ? 0 : dy / dx;
  const b = y1 - k * x1;
  let phi = 0;
  if (!same) {
    phi = vertical ? 90 : (Math.atan(k) * 180) / Math.PI;
    if (phi < 0) phi += 180;
  }

  return (
    <div className="widget">
      <div className="widget-title">Két pont, egy egyenes: növekmény és meredekség</div>
      <div className="sliders">
        <label>
          P₁ x-koordinátája: {hu(x1)}
          <input type="range" min={-6} max={6} step={1} value={x1} onChange={(e) => setX1(Number(e.target.value))} />
        </label>
        <label>
          P₁ y-koordinátája: {hu(y1)}
          <input type="range" min={-6} max={6} step={1} value={y1} onChange={(e) => setY1(Number(e.target.value))} />
        </label>
        <label>
          P₂ x-koordinátája: {hu(x2)}
          <input type="range" min={-6} max={6} step={1} value={x2} onChange={(e) => setX2(Number(e.target.value))} />
        </label>
        <label>
          P₂ y-koordinátája: {hu(y2)}
          <input type="range" min={-6} max={6} step={1} value={y2} onChange={(e) => setY2(Number(e.target.value))} />
        </label>
      </div>
      <Plane>
        {(m) => (
          <>
            {!same && (vertical ? <PVLine map={m} x={x1} /> : <PLine map={m} k={k} b={b} />)}
            {!same && !vertical && dy !== 0 && (
              <>
                <PSeg map={m} x1={x1} y1={y1} x2={x2} y2={y1} cls="pl-dash2" />
                <PSeg map={m} x1={x2} y1={y1} x2={x2} y2={y2} cls="pl-dash2" />
              </>
            )}
            <PPoint map={m} x={x1} y={y1} label={`P₁${pt(x1, y1)}`} color="#38bdf8" />
            {!same && <PPoint map={m} x={x2} y={y2} label={`P₂${pt(x2, y2)}`} color="#fb923c" />}
          </>
        )}
      </Plane>
      <div className="result">
        <M t={`\\Delta x = ${tex(x2)} - ${x1 < 0 ? `(${tex(x1)})` : tex(x1)} = ${tex(dx)},\\qquad \\Delta y = ${tex(y2)} - ${y1 < 0 ? `(${tex(y1)})` : tex(y1)} = ${tex(dy)}`} block />
      </div>
      <div className="explain">
        {same && <p>A két pont egybeesik, ezért nem határoznak meg egyenest.</p>}
        {vertical && <p>Δx = 0, vagyis függőleges egyenes: a meredekség nem értelmezett (0-val nem osztunk), az irányszög 90°. Egyenlete x = {hu(x1)}.</p>}
        {!same && !vertical && (
          <>
            <p>
              Meredekség: <M t={`m=\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{${tex(dy)}}{${tex(dx)}}=${tex(Math.round(k * 1000) / 1000)}`} />. Irányszög: φ ≈ {round(phi, 1)}°.
            </p>
            <p>
              Az egyenes egyenlete: <M t={lineTex(k, b)} />. {k > 0 ? 'Pozitív meredekség: jobbra haladva emelkedik.' : k < 0 ? 'Negatív meredekség: jobbra haladva lejt.' : 'Nulla meredekség: vízszintes egyenes.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
