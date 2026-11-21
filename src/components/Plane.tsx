import { ReactNode, useId } from 'react';

export type PMap = {
  X: (x: number) => number;
  Y: (y: number) => number;
  sx: number;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
};

type Props = {
  xmin?: number;
  xmax?: number;
  ymin?: number;
  ymax?: number;
  children?: (m: PMap) => ReactNode;
};

const W = 560;

/**
 * Derékszögű koordináta-sík SVG-ben. A két tengely skálája mindig egyenlő (a magasság a tartományokból adódik),
 * így a körök körök, a merőleges egyenesek valóban merőlegesnek látszanak.
 */
export function Plane({ xmin = -7, xmax = 7, ymin = -7, ymax = 7, children }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const sx = W / (xmax - xmin);
  const H = (ymax - ymin) * sx;
  const X = (x: number) => (x - xmin) * sx;
  const Y = (y: number) => H - (y - ymin) * sx;
  const map: PMap = { X, Y, sx, xmin, xmax, ymin, ymax };

  const xs: number[] = [];
  for (let v = Math.ceil(xmin); v <= xmax; v++) xs.push(v);
  const ys: number[] = [];
  for (let v = Math.ceil(ymin); v <= ymax; v++) ys.push(v);
  const showY = xmin <= 0 && 0 <= xmax;
  const showX = ymin <= 0 && 0 <= ymax;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="plane" role="img" aria-label="koordináta-rendszer">
      <defs>
        <clipPath id={uid}>
          <rect x={0} y={0} width={W} height={H} />
        </clipPath>
      </defs>
      <rect width={W} height={H} className="pl-bg" />
      {xs.map((v) => (
        <line key={`gx${v}`} x1={X(v)} y1={0} x2={X(v)} y2={H} className="pl-grid" />
      ))}
      {ys.map((v) => (
        <line key={`gy${v}`} x1={0} y1={Y(v)} x2={W} y2={Y(v)} className="pl-grid" />
      ))}
      {showX && <line x1={0} y1={Y(0)} x2={W} y2={Y(0)} className="pl-axis" />}
      {showY && <line x1={X(0)} y1={0} x2={X(0)} y2={H} className="pl-axis" />}
      {xs
        .filter((v) => v !== 0)
        .map((v) => (
          <text key={`tx${v}`} x={X(v)} y={showX ? Y(0) + 15 : H - 4} textAnchor="middle" className="pl-tick">
            {String(v).replace('-', '−')}
          </text>
        ))}
      {ys
        .filter((v) => v !== 0)
        .map((v) => (
          <text key={`ty${v}`} x={showY ? X(0) - 6 : 4} y={Y(v) + 4} textAnchor={showY ? 'end' : 'start'} className="pl-tick">
            {String(v).replace('-', '−')}
          </text>
        ))}
      {showX && showY && (
        <text x={X(0) - 6} y={Y(0) + 15} textAnchor="end" className="pl-tick">
          O
        </text>
      )}
      {showX && (
        <text x={W - 6} y={Y(0) - 7} textAnchor="end" className="pl-axname">
          x
        </text>
      )}
      {showY && (
        <text x={X(0) + 8} y={14} className="pl-axname">
          y
        </text>
      )}
      <g clipPath={`url(#${uid})`}>{children?.(map)}</g>
    </svg>
  );
}

type Base = { map: PMap };

/** Az y = k·x + b egyenes a teljes látható tartományban. */
export function PLine({ map, k, b, cls = 'pl-main' }: Base & { k: number; b: number; cls?: string }) {
  return (
    <line
      x1={map.X(map.xmin)}
      y1={map.Y(k * map.xmin + b)}
      x2={map.X(map.xmax)}
      y2={map.Y(k * map.xmax + b)}
      className={cls}
    />
  );
}

/** Az x = c függőleges egyenes. */
export function PVLine({ map, x, cls = 'pl-main' }: Base & { x: number; cls?: string }) {
  return <line x1={map.X(x)} y1={map.Y(map.ymin)} x2={map.X(x)} y2={map.Y(map.ymax)} className={cls} />;
}

export function PSeg({
  map,
  x1,
  y1,
  x2,
  y2,
  cls = 'pl-dash',
}: Base & { x1: number; y1: number; x2: number; y2: number; cls?: string }) {
  return <line x1={map.X(x1)} y1={map.Y(y1)} x2={map.X(x2)} y2={map.Y(y2)} className={cls} />;
}

export function PPoint({
  map,
  x,
  y,
  label,
  color = '#f59e0b',
  dx = 9,
  dy = -9,
}: Base & { x: number; y: number; label?: string; color?: string; dx?: number; dy?: number }) {
  return (
    <g>
      <circle cx={map.X(x)} cy={map.Y(y)} r={6} fill={color} stroke="#0b0e24" strokeWidth={1.5} />
      {label && (
        <text x={map.X(x) + dx} y={map.Y(y) + dy} fill={color} className="pl-label">
          {label}
        </text>
      )}
    </g>
  );
}

export function PCircle({ map, h, k, r, cls = 'pl-main' }: Base & { h: number; k: number; r: number; cls?: string }) {
  return <circle cx={map.X(h)} cy={map.Y(k)} r={Math.max(0, r) * map.sx} className={cls} />;
}

/** Az y = a·x² + b·x + c parabola mintavételezett útvonala. */
export function PParabola({ map, a, b, c, cls = 'pl-main' }: Base & { a: number; b: number; c: number; cls?: string }) {
  const N = 240;
  let d = '';
  for (let i = 0; i <= N; i++) {
    const x = map.xmin + ((map.xmax - map.xmin) * i) / N;
    const y = a * x * x + b * x + c;
    d += `${i === 0 ? 'M' : 'L'}${map.X(x).toFixed(1)},${map.Y(y).toFixed(1)} `;
  }
  return <path d={d} className={cls} />;
}
