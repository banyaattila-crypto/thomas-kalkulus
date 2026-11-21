import { useState } from 'react';
import { Plane, PPoint, PSeg } from './Plane';
import { pt } from './fmt';
import { hu } from './M';

function quadrant(x: number, y: number): string {
  if (x === 0 && y === 0) return 'az origó';
  if (x === 0) return 'az y-tengelyen van (nincs síknegyedben)';
  if (y === 0) return 'az x-tengelyen van (nincs síknegyedben)';
  if (x > 0 && y > 0) return 'az I. síknegyedben van';
  if (x < 0 && y > 0) return 'a II. síknegyedben van';
  if (x < 0 && y < 0) return 'a III. síknegyedben van';
  return 'a IV. síknegyedben van';
}

/** Egy pont két koordinátájának állítása; a pont helye, síknegyede és origótól mért távolsága. */
export function CoordWidget() {
  const [x, setX] = useState(3);
  const [y, setY] = useState(-2);
  return (
    <div className="widget">
      <div className="widget-title">Pont a síkon</div>
      <div className="sliders">
        <label>
          x = {hu(x)}
          <input type="range" min={-6} max={6} step={0.5} value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
        <label>
          y = {hu(y)}
          <input type="range" min={-6} max={6} step={0.5} value={y} onChange={(e) => setY(Number(e.target.value))} />
        </label>
      </div>
      <Plane>
        {(m) => (
          <>
            <PSeg map={m} x1={x} y1={0} x2={x} y2={y} />
            <PSeg map={m} x1={0} y1={y} x2={x} y2={y} />
            <PPoint map={m} x={x} y={y} label={`P${pt(x, y)}`} dx={10} dy={-10} />
          </>
        )}
      </Plane>
      <div className="explain">
        <p>
          A P pont {quadrant(x, y)}. Az origótól mért távolsága {hu(Math.hypot(x, y))} egység.
        </p>
        <p>A szaggatott vonalak a pontból a tengelyekre bocsátott merőlegesek: a talppontjuk adja a két koordinátát.</p>
      </div>
    </div>
  );
}
