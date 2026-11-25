import { useState } from 'react';

/* ============================================================================
   12.6. Hengerek és másodrendű felületek — 8 interaktív 3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

function makeProj(cx: number, cy: number, scale: number, yawDeg: number, pitchDeg = 22) {
  const yaw = (yawDeg * Math.PI) / 180;
  const pit = (pitchDeg * Math.PI) / 180;
  const cyw = Math.cos(yaw);
  const syw = Math.sin(yaw);
  const cp = Math.cos(pit);
  const sp = Math.sin(pit);
  return (x: number, y: number, z: number): [number, number] => {
    const xr = -x * syw + y * cyw;
    const yr = x * cyw + y * syw;
    return [cx + xr * scale, cy + (yr * sp - z * cp) * scale];
  };
}

const pathFrom = (pts: [number, number][]) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

/* ------------------------------------------------------------------ 1. Hengerek 3D-ben */
export function Cylinders3DWidget() {
  const [kind, setKind] = useState<'parab' | 'ellip' | 'wave'>('parab');
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 145, 32, yaw, 22);

  const curves: string[] = [];
  const gens: string[] = [];

  if (kind === 'parab') {
    // z = 0.5 x^2, y szabad [-2, 2]
    for (const yv of [-2, -1, 0, 1, 2]) {
      const pts: [number, number][] = [];
      for (let i = 0; i <= 24; i++) {
        const xv = -2 + (4 * i) / 24;
        pts.push(P(xv, yv, 0.5 * xv * xv - 0.8));
      }
      curves.push(pathFrom(pts));
    }
    for (const xv of [-2, -1, 0, 1, 2]) {
      gens.push(pathFrom([P(xv, -2, 0.5 * xv * xv - 0.8), P(xv, 2, 0.5 * xv * xv - 0.8)]));
    }
  } else if (kind === 'ellip') {
    // x^2/4 + y^2/1 = 1, z szabad [-1.8, 1.8]
    for (const zv of [-1.8, -0.9, 0, 0.9, 1.8]) {
      const pts: [number, number][] = [];
      for (let i = 0; i <= 36; i++) {
        const t = (i / 36) * Math.PI * 2;
        pts.push(P(2 * Math.cos(t), 1.1 * Math.sin(t), zv));
      }
      curves.push(pathFrom(pts));
    }
    for (let i = 0; i < 8; i++) {
      const t = (i / 8) * Math.PI * 2;
      gens.push(pathFrom([P(2 * Math.cos(t), 1.1 * Math.sin(t), -1.8), P(2 * Math.cos(t), 1.1 * Math.sin(t), 1.8)]));
    }
  } else {
    // z = sin(1.3 x), y szabad
    for (const yv of [-2, -1, 0, 1, 2]) {
      const pts: [number, number][] = [];
      for (let i = 0; i <= 32; i++) {
        const xv = -2.4 + (4.8 * i) / 32;
        pts.push(P(xv, yv, Math.sin(1.3 * xv)));
      }
      curves.push(pathFrom(pts));
    }
    for (let i = 0; i <= 6; i++) {
      const xv = -2.4 + (4.8 * i) / 6;
      gens.push(pathFrom([P(xv, -2, Math.sin(1.3 * xv)), P(xv, 2, Math.sin(1.3 * xv))]));
    }
  }

  return (
    <div className="widget">
      <div className="wtitle">Általános hengerek: ha egy változó hiányzik, a görbe elcsúszik a hiányzó tengely mentén!</div>
      <div className="relbuttons chips">
        <button className={kind === 'parab' ? 'on' : ''} onClick={() => setKind('parab')}>Parabolikus (z = x²)</button>
        <button className={kind === 'ellip' ? 'on' : ''} onClick={() => setKind('ellip')}>Elliptikus (x²/4 + y² = 1)</button>
        <button className={kind === 'wave' ? 'on' : ''} onClick={() => setKind('wave')}>Hullámlemez (z = sin x)</button>
      </div>
      <div className="wcontrols">
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-30} max={110} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 225" className="plot">
        {gens.map((d, i) => <path key={`g${i}`} d={d} fill="none" stroke="rgba(45, 212, 191, 0.45)" strokeWidth={1.3} />)}
        {curves.map((d, i) => <path key={`c${i}`} d={d} fill="none" stroke="#38bdf8" strokeWidth={i === 2 ? 2.4 : 1.5} opacity={i === 2 ? 1 : 0.7} />)}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Forgatható 3D ellipszoid */
export function Ellipsoid3DWidget() {
  const [a, setA] = useState(2.6);
  const [b, setB] = useState(1.8);
  const [c, setC] = useState(1.3);
  const [yaw, setYaw] = useState(34);
  const P = makeProj(270, 130, 32, yaw, 22);

  const rings: string[] = [];
  for (const phi of [-0.9, -0.45, 0, 0.45, 0.9]) {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const th = (i / 40) * Math.PI * 2;
      pts.push(P(a * Math.cos(phi) * Math.cos(th), b * Math.cos(phi) * Math.sin(th), c * Math.sin(phi)));
    }
    rings.push(pathFrom(pts));
  }
  const merids: string[] = [];
  for (let m = 0; m < 6; m++) {
    const th = (m / 6) * Math.PI;
    const pts: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const phi = (i / 40) * Math.PI * 2;
      pts.push(P(a * Math.cos(phi) * Math.cos(th), b * Math.cos(phi) * Math.sin(th), c * Math.sin(phi)));
    }
    merids.push(pathFrom(pts));
  }

  return (
    <div className="widget">
      <div className="wtitle">Ellipszoid: x²/a² + y²/b² + z²/c² = 1 (mindhárom metszete ellipszis!)</div>
      <div className="wcontrols">
        <label>a = <b>{a.toFixed(1)}</b><input type="range" min={1} max={3} step={0.2} value={a} onChange={(e) => setA(+e.target.value)} /></label>
        <label>b = <b>{b.toFixed(1)}</b><input type="range" min={1} max={3} step={0.2} value={b} onChange={(e) => setB(+e.target.value)} /></label>
        <label>c = <b>{c.toFixed(1)}</b><input type="range" min={1} max={2.4} step={0.2} value={c} onChange={(e) => setC(+e.target.value)} /></label>
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-30} max={110} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 225" className="plot">
        {merids.map((d, i) => <path key={`m${i}`} d={d} fill="none" stroke="rgba(56,189,248,0.45)" strokeWidth={1.3} />)}
        {rings.map((d, i) => <path key={`r${i}`} d={d} fill="none" stroke={i === 2 ? '#fbbf24' : '#34d399'} strokeWidth={i === 2 ? 2.4 : 1.4} opacity={i === 2 ? 1 : 0.7} />)}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Elliptikus paraboloid és kúp */
export function ParaboloidCone3DWidget() {
  const [kind, setKind] = useState<'parab' | 'cone'>('parab');
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, kind === 'parab' ? 185 : 122, 30, yaw, 22);

  const rings: string[] = [];
  const ribs: string[] = [];

  if (kind === 'parab') {
    for (const zv of [0.4, 1.0, 1.8, 2.8, 3.8]) {
      const r = Math.sqrt(zv);
      const pts: [number, number][] = [];
      for (let i = 0; i <= 40; i++) {
        const t = (i / 40) * Math.PI * 2;
        pts.push(P(r * Math.cos(t), r * Math.sin(t), zv));
      }
      rings.push(pathFrom(pts));
    }
    for (let k = 0; k < 8; k++) {
      const t = (k / 8) * Math.PI * 2;
      const pts: [number, number][] = [];
      for (let i = 0; i <= 16; i++) {
        const r = (2 * i) / 16;
        pts.push(P(r * Math.cos(t), r * Math.sin(t), r * r));
      }
      ribs.push(pathFrom(pts));
    }
  } else {
    for (const zv of [-2.4, -1.6, -0.8, 0.8, 1.6, 2.4]) {
      const r = Math.abs(zv) * 0.85;
      const pts: [number, number][] = [];
      for (let i = 0; i <= 40; i++) {
        const t = (i / 40) * Math.PI * 2;
        pts.push(P(r * Math.cos(t), r * Math.sin(t), zv));
      }
      rings.push(pathFrom(pts));
    }
    for (let k = 0; k < 8; k++) {
      const t = (k / 8) * Math.PI * 2;
      ribs.push(pathFrom([P(-2.04 * Math.cos(t), -2.04 * Math.sin(t), -2.4), P(2.04 * Math.cos(t), 2.04 * Math.sin(t), 2.4)]));
    }
  }

  return (
    <div className="widget">
      <div className="wtitle">Elliptikus paraboloid (csésze) vs. elliptikus kúp (dupla tölcsér)</div>
      <div className="relbuttons chips">
        <button className={kind === 'parab' ? 'on' : ''} onClick={() => setKind('parab')}>Paraboloid: z = x² + y²</button>
        <button className={kind === 'cone' ? 'on' : ''} onClick={() => setKind('cone')}>Kúp: z² = x² + y²</button>
      </div>
      <div className="wcontrols">
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-30} max={110} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 225" className="plot">
        {ribs.map((d, i) => <path key={`rb${i}`} d={d} fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth={1.3} />)}
        {rings.map((d, i) => <path key={`rg${i}`} d={d} fill="none" stroke="#34d399" strokeWidth={1.7} />)}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Egyköpenyű vs. kétköpenyű hiperboloid */
export function Hyperboloid3DWidget() {
  const [sheets, setSheets] = useState<1 | 2>(1);
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 122, 28, yaw, 22);

  const rings: string[] = [];
  const ribs: string[] = [];

  if (sheets === 1) {
    // x^2 + y^2 - z^2 = 1 => r(z) = sqrt(1 + z^2)
    for (const zv of [-2, -1, 0, 1, 2]) {
      const r = Math.sqrt(1 + zv * zv);
      const pts: [number, number][] = [];
      for (let i = 0; i <= 40; i++) {
        const t = (i / 40) * Math.PI * 2;
        pts.push(P(r * Math.cos(t), r * Math.sin(t), zv));
      }
      rings.push(pathFrom(pts));
    }
    for (let k = 0; k < 8; k++) {
      const t = (k / 8) * Math.PI * 2;
      const pts: [number, number][] = [];
      for (let i = 0; i <= 20; i++) {
        const zv = -2 + (4 * i) / 20;
        const r = Math.sqrt(1 + zv * zv);
        pts.push(P(r * Math.cos(t), r * Math.sin(t), zv));
      }
      ribs.push(pathFrom(pts));
    }
  } else {
    // z^2 - x^2 - y^2 = 1 => |z| >= 1, r(z) = sqrt(z^2 - 1)
    for (const zv of [-2.4, -1.8, -1.3, 1.3, 1.8, 2.4]) {
      const r = Math.sqrt(zv * zv - 1);
      const pts: [number, number][] = [];
      for (let i = 0; i <= 40; i++) {
        const t = (i / 40) * Math.PI * 2;
        pts.push(P(r * Math.cos(t), r * Math.sin(t), zv));
      }
      rings.push(pathFrom(pts));
    }
    for (const sign of [-1, 1]) {
      for (let k = 0; k < 6; k++) {
        const t = (k / 6) * Math.PI * 2;
        const pts: [number, number][] = [];
        for (let i = 0; i <= 12; i++) {
          const r = (2.18 * i) / 12;
          const zv = sign * Math.sqrt(1 + r * r);
          pts.push(P(r * Math.cos(t), r * Math.sin(t), zv));
        }
        ribs.push(pathFrom(pts));
      }
    }
  }

  return (
    <div className="widget">
      <div className="wtitle">Mínuszjelek száma = köpenyek száma! (1 mínusz: hűtőtorony · 2 mínusz: két csésze)</div>
      <div className="relbuttons chips">
        <button className={sheets === 1 ? 'on' : ''} onClick={() => setSheets(1)}>Egyköpenyű: x² + y² − z² = 1</button>
        <button className={sheets === 2 ? 'on' : ''} onClick={() => setSheets(2)}>Kétköpenyű: z² − x² − y² = 1</button>
      </div>
      <div className="wcontrols">
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-30} max={110} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 225" className="plot">
        {ribs.map((d, i) => <path key={`rb${i}`} d={d} fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth={1.3} />)}
        {rings.map((d, i) => <path key={`rg${i}`} d={d} fill="none" stroke={sheets === 1 && i === 2 ? '#fbbf24' : '#34d399'} strokeWidth={sheets === 1 && i === 2 ? 2.4 : 1.6} />)}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. Hiperbolikus paraboloid (nyeregfelület) */
export function Saddle3DWidget() {
  const [yaw, setYaw] = useState(32);
  const P = makeProj(270, 125, 34, yaw, 22);

  const linesU: string[] = [];
  const linesV: string[] = [];
  for (let k = -4; k <= 4; k++) {
    const u = k * 0.45;
    const pu: [number, number][] = [];
    const pv: [number, number][] = [];
    for (let i = 0; i <= 24; i++) {
      const t = -1.8 + (3.6 * i) / 24;
      pu.push(P(u, t, 0.45 * (t * t - u * u)));
      pv.push(P(t, u, 0.45 * (u * u - t * t)));
    }
    linesU.push(pathFrom(pu));
    linesV.push(pathFrom(pv));
  }

  return (
    <div className="widget">
      <div className="wtitle">Hiperbolikus paraboloid (nyeregfelület): z = y² − x²</div>
      <div className="wcontrols">
        <label>Forgatás <b>{yaw}°</b><input type="range" min={-40} max={120} value={yaw} onChange={(e) => setYaw(+e.target.value)} /></label>
      </div>
      <svg viewBox="0 0 540 225" className="plot">
        {linesU.map((d, i) => <path key={`u${i}`} d={d} fill="none" stroke={i === 4 ? '#34d399' : 'rgba(52,211,153,0.45)'} strokeWidth={i === 4 ? 2.8 : 1.2} />)}
        {linesV.map((d, i) => <path key={`v${i}`} d={d} fill="none" stroke={i === 4 ? '#fb923c' : 'rgba(56,189,248,0.45)'} strokeWidth={i === 4 ? 2.8 : 1.2} />)}
        <circle cx={P(0, 0, 0)[0]} cy={P(0, 0, 0)[1]} r={5} fill="#fbbf24" stroke="#fff" strokeWidth={1.4} />
      </svg>
      <div className="readout">
        Zöld főparabola (x = 0): <b>z = y²</b> felfelé nyílik · Narancs főparabola (y = 0): <b>z = −x²</b> lefelé nyílik ·
        Origó: <b>nyeregpont</b>!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Metszet-detektív (nyomok) */
const TRACES = [
  { name: 'Ellipszoid', eq: 'x²/a² + y²/b² + z²/c² = 1', xy: 'Ellipszis', xz: 'Ellipszis', yz: 'Ellipszis' },
  { name: 'Elliptikus paraboloid', eq: 'z = x²/a² + y²/b²', xy: 'Ellipszis (z > 0)', xz: 'Parabola', yz: 'Parabola' },
  { name: 'Elliptikus kúp', eq: 'z²/c² = x²/a² + y²/b²', xy: 'Ellipszis (z=0: pont)', xz: 'Két egyenes / hiperb.', yz: 'Két egyenes / hiperb.' },
  { name: 'Egyköpenyű hiperb.', eq: 'x²/a² + y²/b² − z²/c² = 1', xy: 'Ellipszis (minden z)', xz: 'Hiperbola', yz: 'Hiperbola' },
  { name: 'Kétköpenyű hiperb.', eq: 'z²/c² − x²/a² − y²/b² = 1', xy: 'Ellipszis (|z| > c)', xz: 'Hiperbola', yz: 'Hiperbola' },
  { name: 'Hiperb. paraboloid', eq: 'z = y²/b² − x²/a²', xy: 'Hiperbola (z=0: 2 egy.)', xz: 'Parabola (lefelé)', yz: 'Parabola (felfelé)' },
];

export function TraceSlicerDiagram() {
  const [sel, setSel] = useState(5);
  const t = TRACES[sel];
  return (
    <div className="widget">
      <div className="wtitle">Metszet-detektív: hogyan ismerd fel a 6 kvadrikot a síkmetszeteiből?</div>
      <div className="relbuttons chips">
        {TRACES.map((item, i) => (
          <button key={item.name} className={i === sel ? 'on' : ''} onClick={() => setSel(i)}>
            {item.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 540 135" className="plot">
        <rect x={14} y={12} width={512} height={32} rx={8} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.3} />
        <text x={270} y={33} textAnchor="middle" fill="#fbbf24" fontSize={13} fontWeight={700}>{t.eq}</text>

        <rect x={14} y={54} width={164} height={68} rx={10} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.3} />
        <text x={96} y={76} textAnchor="middle" fill="#6ee7b7" fontSize={11.5} fontWeight={700}>z = k (vízszintes)</text>
        <text x={96} y={102} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>{t.xy}</text>

        <rect x={188} y={54} width={164} height={68} rx={10} fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth={1.3} />
        <text x={270} y={76} textAnchor="middle" fill="#fde68a" fontSize={11.5} fontWeight={700}>y = k (xz-sík)</text>
        <text x={270} y={102} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>{t.xz}</text>

        <rect x={362} y={54} width={164} height={68} rx={10} fill="rgba(251,146,60,0.1)" stroke="#fb923c" strokeWidth={1.3} />
        <text x={444} y={76} textAnchor="middle" fill="#fdba74" fontSize={11.5} fontWeight={700}>x = k (yz-sík)</text>
        <text x={444} y={102} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>{t.yz}</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. A 6 kvadrik teljes katalógusa */
export function QuadricCatalogDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">A 6 kanonikus másodrendű felület egy pillantásra</div>
      <svg viewBox="0 0 540 220" className="plot">
        {TRACES.map((r, i) => {
          const y = 12 + i * 34;
          const colors = ['#38bdf8', '#34d399', '#2dd4bf', '#fbbf24', '#fb923c', '#60a5fa'];
          return (
            <g key={r.name}>
              <rect x={12} y={y} width={516} height={28} rx={7} fill="rgba(255,255,255,0.04)" stroke="rgba(148,163,184,0.18)" />
              <rect x={12} y={y} width={5} height={28} rx={2} fill={colors[i]} />
              <text x={26} y={y + 18} fill={colors[i]} fontSize={11.5} fontWeight={700}>{r.name}</text>
              <text x={195} y={y + 18} fill="#e2e8f0" fontSize={11.5} fontWeight={600}>{r.eq}</text>
              <text x={516} y={y + 18} textAnchor="end" fill="#94a3b8" fontSize={10.5}>{r.xy}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. „Kakukktojás-tengely” szabály */
export function AxisIdentifierDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">Villámtrükk: melyik koordinátatengely a felület szimmetriatengelye?</div>
      <svg viewBox="0 0 540 120" className="plot">
        <rect x={14} y={14} width={512} height={92} rx={12} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={270} y={42} textAnchor="middle" fill="#fbbf24" fontSize={13.5} fontWeight={700}>
          Mindig a „KAKUKKTOJÁS” változó adja a szimmetriatengelyt!
        </text>
        <text x={270} y={68} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>
          • Paraboloidnál: amelyik 1. hatványon van (pl. y = x² + z² → y-tengely!)
        </text>
        <text x={270} y={90} textAnchor="middle" fill="#6ee7b7" fontSize={11.5}>
          • Hiperboloidnál / kúpnál: amelyiknek eltérő az előjele (pl. x² − y² − z² = 1 → x-tengely!)
        </text>
      </svg>
    </div>
  );
}
