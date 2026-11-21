import { useState } from 'react';
import { Plane, PLine, PPoint, PVLine } from './Plane';
import { M, hu } from './M';
import { lineTex, pt } from './fmt';

type Mode = 'perp' | 'par';

/** Adott egyeneshez és ponthoz megszerkeszti a ponton átmenő párhuzamos vagy merőleges egyenest. */
export function PerpWidget() {
  const [k, setK] = useState(0.5);
  const [b, setB] = useState(1);
  const [px, setPx] = useState(2);
  const [py, setPy] = useState(-2);
  const [mode, setMode] = useState<Mode>('perp');

  // Az új egyenes: párhuzamosnál azonos meredekség; merőlegesnél −1/k (k = 0 esetén függőleges).
  const vertical = mode === 'perp' && k === 0;
  const k2 = mode === 'par' ? k : vertical ? 0 : -1 / k;
  const b2 = mode === 'par' ? py - k * px : vertical ? 0 : py - k2 * px;

  return (
    <div className="widget">
      <div className="widget-title">Párhuzamos és merőleges egyenes egy adott ponton át</div>
      <div className="relbuttons">
        <button className={mode === 'perp' ? 'on' : ''} onClick={() => setMode('perp')}>merőleges</button>
        <button className={mode === 'par' ? 'on' : ''} onClick={() => setMode('par')}>párhuzamos</button>
      </div>
      <div className="sliders">
        <label>
          az adott egyenes meredeksége: {hu(k)}
          <input type="range" min={-3} max={3} step={0.25} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
        <label>
          az adott egyenes y-metszete: {hu(b)}
          <input type="range" min={-4} max={4} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          P x-koordinátája: {hu(px)}
          <input type="range" min={-6} max={6} step={1} value={px} onChange={(e) => setPx(Number(e.target.value))} />
        </label>
        <label>
          P y-koordinátája: {hu(py)}
          <input type="range" min={-6} max={6} step={1} value={py} onChange={(e) => setPy(Number(e.target.value))} />
        </label>
      </div>
      <Plane>
        {(m) => (
          <>
            <PLine map={m} k={k} b={b} />
            {vertical ? <PVLine map={m} x={px} cls="pl-alt" /> : <PLine map={m} k={k2} b={b2} cls="pl-alt" />}
            <PPoint map={m} x={px} y={py} label={`P${pt(px, py)}`} />
          </>
        )}
      </Plane>
      <div className="result">
        <M t={`\\text{adott: } ${lineTex(k, b)}`} block />
        <M t={vertical ? `\\text{${mode === 'perp' ? 'merőleges' : 'párhuzamos'}: } x = ${px}` : `\\text{${mode === 'perp' ? 'merőleges' : 'párhuzamos'}: } ${lineTex(k2, b2)}`} block />
      </div>
      <div className="explain">
        {mode === 'perp' && !vertical && <p>A két meredekség szorzata: {hu(k)} · {hu(Math.round(k2 * 1000) / 1000)} = {hu(Math.round(k * k2 * 1000) / 1000)}.</p>}
        {vertical && <p>Vízszintes egyenesre a merőleges függőleges, ennek nincs meredeksége, ezért a szorzatszabály itt nem használható.</p>}
        {mode === 'par' && <p>Azonos meredekség, tehát a két egyenes párhuzamos (vagy egybeesik, ha éppen átmegy a P ponton).</p>}
      </div>
    </div>
  );
}
