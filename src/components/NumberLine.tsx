import { hu } from './M';

/** Egy szakasz a számegyenesen. A null végpont a végtelent jelenti. */
export type Seg = {
  from: number | null;
  to: number | null;
  fromClosed: boolean;
  toClosed: boolean;
};

export type Mark = { x: number; label: string; color?: string };

type Props = {
  min: number;
  max: number;
  segs?: Seg[];
  marks?: Mark[];
  step?: number;
  height?: number;
};

const W = 680;
const PAD = 28;

/** SVG számegyenes: kiemelt szakaszok (nyílt/zárt végponttal) és címkézett pontok. */
export function NumberLine({ min, max, segs = [], marks = [], step = 1, height = 96 }: Props) {
  const px = (x: number) => PAD + ((Math.min(max, Math.max(min, x)) - min) / (max - min)) * (W - 2 * PAD);
  const y0 = height - 34;
  const ticks: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) ticks.push(Math.round(v * 1e6) / 1e6);

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="numline" role="img" aria-label="számegyenes">
      <line x1={PAD - 10} y1={y0} x2={W - PAD + 10} y2={y0} className="nl-axis" />
      <polygon points={`${W - PAD + 14},${y0} ${W - PAD + 4},${y0 - 4} ${W - PAD + 4},${y0 + 4}`} className="nl-arrow" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={y0 - 4} x2={px(t)} y2={y0 + 4} className="nl-axis" />
          <text x={px(t)} y={y0 + 20} className="nl-tick" textAnchor="middle">
            {hu(t)}
          </text>
        </g>
      ))}
      {segs.map((s, i) => {
        const a = s.from === null ? min : s.from;
        const b = s.to === null ? max : s.to;
        const degenerate = s.from !== null && s.to !== null && Math.abs(s.from - s.to) < 1e-9;
        return (
          <g key={i}>
            {!degenerate && <line x1={px(a)} y1={y0} x2={px(b)} y2={y0} className="nl-seg" />}
            {s.from === null && <polygon points={`${px(min) - 8},${y0} ${px(min) + 2},${y0 - 6} ${px(min) + 2},${y0 + 6}`} className="nl-segfill" />}
            {s.to === null && <polygon points={`${px(max) + 8},${y0} ${px(max) - 2},${y0 - 6} ${px(max) - 2},${y0 + 6}`} className="nl-segfill" />}
            {s.from !== null && (
              <circle cx={px(a)} cy={y0} r={6} className={s.fromClosed ? 'nl-dot-closed' : 'nl-dot-open'} />
            )}
            {s.to !== null && !degenerate && (
              <circle cx={px(b)} cy={y0} r={6} className={s.toClosed ? 'nl-dot-closed' : 'nl-dot-open'} />
            )}
          </g>
        );
      })}
      {marks.map((m, i) => (
        <g key={`m${i}`}>
          <line x1={px(m.x)} y1={y0} x2={px(m.x)} y2={y0 - 26} stroke={m.color ?? '#f59e0b'} strokeWidth={2} />
          <circle cx={px(m.x)} cy={y0} r={4} fill={m.color ?? '#f59e0b'} />
          <text x={px(m.x)} y={y0 - 31} textAnchor="middle" className="nl-mark" fill={m.color ?? '#f59e0b'}>
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
