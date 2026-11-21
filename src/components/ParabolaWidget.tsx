import { useState } from 'react';
import { Plane, PLine, PParabola, PPoint, PVLine } from './Plane';
import { M, hu, tex } from './M';
import { pt, sgnTerm } from './fmt';

const q = (n: number) => Math.round(n * 1000) / 1000;

/** y = ax² + bx + c: nyílás, tengely, csúcs, diszkrimináns és zérushelyek. */
export function ParabolaWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);

  const degenerate = Math.abs(a) < 1e-9;
  const xv = degenerate ? 0 : -b / (2 * a);
  const yv = degenerate ? 0 : c - (b * b) / (4 * a);
  const D = b * b - 4 * a * c;
  const roots: number[] = degenerate
    ? b === 0
      ? []
      : [-c / b]
    : D > 0
      ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)]
      : D === 0
        ? [xv]
        : [];

  const eq = `y = ${a === 1 ? '' : a === -1 ? '-' : tex(a)}x^2${sgnTerm(b, 'x')}${sgnTerm(c)}`;

  return (
    <div className="widget">
      <div className="widget-title">Az y = ax² + bx + c parabola</div>
      <div className="sliders">
        <label>
          a = {hu(a)}
          <input type="range" min={-3} max={3} step={0.25} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          b = {hu(b)}
          <input type="range" min={-6} max={6} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          c = {hu(c)}
          <input type="range" min={-6} max={6} step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-8} xmax={8} ymin={-8} ymax={8}>
        {(m) => (
          <>
            {degenerate ? <PLine map={m} k={b} b={c} /> : <PParabola map={m} a={a} b={b} c={c} />}
            {!degenerate && <PVLine map={m} x={xv} cls="pl-dash" />}
            {!degenerate && <PPoint map={m} x={xv} y={yv} label={`csúcs ${pt(q(xv), q(yv))}`} color="#f59e0b" dx={10} dy={-10} />}
            {roots.map((x0, i) => (
              <PPoint key={i} map={m} x={x0} y={0} color="#34d399" />
            ))}
            <PPoint map={m} x={0} y={c} color="#fb923c" />
          </>
        )}
      </Plane>
      <div className="result">
        <M t={eq} block />
      </div>
      <div className="explain">
        {degenerate ? (
          <p>a = 0 esetén nincs másodfokú tag: ez már egyenes (y = bx + c).</p>
        ) : (
          <>
            <p>
              A szárak {a > 0 ? 'felfelé' : 'lefelé'} nyílnak. A tengely: x = −b/(2a) = {hu(q(xv))}. A csúcs: {pt(q(xv), q(yv))}.
            </p>
            <p>
              Diszkrimináns: D = b² − 4ac = {hu(q(D))}.{' '}
              {D > 0
                ? `Két zérushely van (az x-tengelyt két pontban metszi): ${roots.map((x0) => hu(q(x0))).join(' és ')}.`
                : D === 0
                  ? `Egy zérushely van: a csúcs éppen az x-tengelyen fekszik (x = ${hu(q(xv))}).`
                  : 'Nincs valós zérushely: a parabola nem metszi az x-tengelyt.'}{' '}
              Az y-tengelyt az y = {hu(c)} pontban metszi.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
