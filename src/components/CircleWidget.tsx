import { useState } from 'react';
import { Plane, PCircle, PPoint, PSeg } from './Plane';
import { M, hu, tex } from './M';
import { pt, shiftTex, sgnTerm } from './fmt';

/** Kör középponttal és sugárral; próbapont helyzete (belül, rajta, kívül); kanonikus és kifejtett egyenlet. */
export function CircleWidget() {
  const [h, setH] = useState(1);
  const [k, setK] = useState(-1);
  const [r, setR] = useState(3);
  const [px, setPx] = useState(3);
  const [py, setPy] = useState(1);

  const d = Math.hypot(px - h, py - k);
  const eps = 1e-9;
  const pos = Math.abs(d - r) < eps ? 'rajta van a körvonalon' : d < r ? 'a kör belsejében van' : 'a körön kívül van';
  const color = Math.abs(d - r) < eps ? '#34d399' : d < r ? '#38bdf8' : '#fb923c';
  const canon = `${shiftTex(h, 'x')}^2 + ${shiftTex(k, 'y')}^2 = ${tex(r * r)}`;
  const expanded = `x^2 + y^2${sgnTerm(-2 * h, 'x')}${sgnTerm(-2 * k, 'y')}${sgnTerm(h * h + k * k - r * r)} = 0`;

  return (
    <div className="widget">
      <div className="widget-title">Kör és próbapont</div>
      <div className="sliders">
        <label>
          középpont x-koordinátája h = {hu(h)}
          <input type="range" min={-4} max={4} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
        <label>
          középpont y-koordinátája k = {hu(k)}
          <input type="range" min={-4} max={4} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
        <label>
          sugár r = {hu(r)}
          <input type="range" min={0.5} max={5} step={0.5} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          próbapont x = {hu(px)}
          <input type="range" min={-6} max={6} step={0.5} value={px} onChange={(e) => setPx(Number(e.target.value))} />
        </label>
        <label>
          próbapont y = {hu(py)}
          <input type="range" min={-6} max={6} step={0.5} value={py} onChange={(e) => setPy(Number(e.target.value))} />
        </label>
      </div>
      <Plane>
        {(m) => (
          <>
            <PCircle map={m} h={h} k={k} r={r} />
            <PSeg map={m} x1={h} y1={k} x2={px} y2={py} />
            <PPoint map={m} x={h} y={k} label={`C${pt(h, k)}`} color="#38bdf8" />
            <PPoint map={m} x={px} y={py} label="P" color={color} />
          </>
        )}
      </Plane>
      <div className="result">
        <M t={canon} block />
        <M t={expanded} block />
      </div>
      <div className="explain">
        <p>
          A P pont távolsága a középponttól {hu(d)}, a sugár {hu(r)}, ezért a P pont {pos}. Az egyenlőtlenség nyelvén: a belső
          pontokra (x − h)² + (y − k)² &lt; r², a külsőkre &gt; r².
        </p>
      </div>
    </div>
  );
}
