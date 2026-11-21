import { useState } from 'react';
import { Plane, PFunc, PPoint, PSeg } from './Plane';
import { M, hu } from './M';
import { FUNCS, Iv } from './funcs13';

function Intervals({ map, ivs, axis, color }: { map: import('./Plane').PMap; ivs: Iv[]; axis: 'x' | 'y'; color: string }) {
  const lo = axis === 'x' ? map.xmin : map.ymin;
  const hi = axis === 'x' ? map.xmax : map.ymax;
  const off = axis === 'x' ? 0 : 0;
  return (
    <g>
      {ivs.map((v, k) => {
        const a = Math.max(v.a, lo);
        const b = Math.min(v.b, hi);
        if (b < a) return null;
        const seg =
          axis === 'x' ? (
            <line x1={map.X(a)} y1={map.Y(0) + off} x2={map.X(b)} y2={map.Y(0) + off} stroke={color} strokeWidth={7} strokeLinecap="butt" opacity={0.85} />
          ) : (
            <line x1={map.X(0)} y1={map.Y(a)} x2={map.X(0)} y2={map.Y(b)} stroke={color} strokeWidth={7} strokeLinecap="butt" opacity={0.85} />
          );
        const dot = (val: number, closed: boolean, key: string) =>
          val > lo && val < hi ? (
            <circle
              key={key}
              cx={axis === 'x' ? map.X(val) : map.X(0)}
              cy={axis === 'x' ? map.Y(0) : map.Y(val)}
              r={5.5}
              fill={closed ? color : '#0b0e24'}
              stroke={color}
              strokeWidth={2.2}
            />
          ) : null;
        return (
          <g key={k}>
            {seg}
            {dot(v.a, v.ac, 'a')}
            {dot(v.b, v.bc, 'b')}
          </g>
        );
      })}
    </g>
  );
}

/** Függvény grafikonja, természetes értelmezési tartománya (narancs, x-tengely) és értékkészlete (zöld, y-tengely). */
export function DomainWidget() {
  const [i, setI] = useState(0);
  const [tx, setTx] = useState(4);
  const F = FUNCS[i];
  const ty = F.f(tx);
  const ok = Number.isFinite(ty);
  return (
    <div className="widget">
      <div className="widget-title">Értelmezési tartomány és értékkészlet</div>
      <div className="relbuttons">
        {FUNCS.map((g, k) => (
          <button key={g.id} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <M t={g.tex} />
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          próbahely x = {hu(tx)}
          <input type="range" min={-6} max={6} step={0.5} value={tx} onChange={(e) => setTx(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-7} xmax={7} ymin={-5} ymax={5}>
        {(m) => (
          <>
            <PFunc map={m} fn={F.f} />
            <Intervals map={m} ivs={F.dom} axis="x" color="#fb923c" />
            <Intervals map={m} ivs={F.rng} axis="y" color="#34d399" />
            {ok ? (
              <>
                <PSeg map={m} x1={tx} y1={0} x2={tx} y2={Math.max(-5, Math.min(5, ty))} />
                <PPoint map={m} x={tx} y={Math.max(-5, Math.min(5, ty))} color="#fbbf24" />
              </>
            ) : (
              <PPoint map={m} x={tx} y={0} color="#ef4444" />
            )}
          </>
        )}
      </Plane>
      <div className="result">
        <M t={`f(x)=${F.tex}`} block />
        <M t={`D(f)=${F.domTex}\\qquad R(f)=${F.rngTex}`} block />
      </div>
      <div className="explain">
        <p>
          {ok
            ? `Az x = ${hu(tx)} helyen f = ${hu(Math.round(ty * 1000) / 1000)}.`
            : `Az x = ${hu(tx)} helyen a függvény nincs értelmezve (piros pont).`}{' '}
          A narancs jel az x-tengelyen az értelmezési tartomány, a zöld jel az y-tengelyen az értékkészlet; a teli pont
          hozzátartozik, az üres nem.
        </p>
        <p>{F.why}</p>
      </div>
    </div>
  );
}
