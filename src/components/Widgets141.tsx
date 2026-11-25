import { useState } from 'react';
import { M } from './M';

/* ============================================================================
   14.1. Többváltozós függvények — 8 interaktív 2D/3D SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

const fmt = (v: number, d = 2) => v.toFixed(d).replace('.', ',').replace('-0,00', '0,00');

function makeProj(cx: number, cy: number, scale: number, yawDeg: number, pitchDeg = 24) {
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

/* ------------------------------------------------------------------ 1. 2D Értelmezési tartomány-felfedező */
export function DomainExplorer2DWidget() {
  const [kind, setKind] = useState<'parab' | 'disk' | 'ln' | 'inv'>('parab');
  const [px, setPx] = useState(1.0);
  const [py, setPy] = useState(2.0);

  const W = 540;
  const H = 250;
  const cx = 200;
  const cy = 135;
  const sc = 28;
  const X = (x: number) => cx + x * sc;
  const Y = (y: number) => cy - y * sc;

  const evalFn = (): { ok: boolean; val: number; cond: string; range: string } => {
    if (kind === 'parab') {
      const ok = py >= px * px - 1e-6;
      return { ok, val: ok ? Math.sqrt(Math.max(0, py - px * px)) : NaN, cond: 'y \\ge x^2', range: '[0,\\,\\infty)' };
    }
    if (kind === 'disk') {
      const ok = px * px + py * py <= 9 + 1e-6;
      return { ok, val: ok ? Math.sqrt(Math.max(0, 9 - px * px - py * py)) : NaN, cond: 'x^2 + y^2 \\le 9', range: '[0,\\,3]' };
    }
    if (kind === 'ln') {
      const ok = px * px + py * py > 4 + 1e-6;
      return { ok, val: ok ? Math.log(px * px + py * py - 4) : NaN, cond: 'x^2 + y^2 > 4', range: '(-\\infty,\\,\\infty)' };
    }
    const ok = Math.abs(px) > 1e-4 && Math.abs(py) > 1e-4;
    return { ok, val: ok ? 1 / (px * py) : NaN, cond: 'x \\neq 0,\\; y \\neq 0', range: '(-\\infty,0)\\cup(0,\\infty)' };
  };

  const info = evalFn();

  // Parabola polygon for y >= x^2
  let parabFill = `M${X(-2.2).toFixed(1)},${Y(4.84).toFixed(1)} `;
  let parabCurve = '';
  for (let i = -22; i <= 22; i++) {
    const x = i * 0.1;
    const y = x * x;
    parabFill += `L${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
    parabCurve += `${i === -22 ? 'M' : 'L'}${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
  }
  parabFill += `L${X(2.2).toFixed(1)},${Y(5).toFixed(1)} L${X(-2.2).toFixed(1)},${Y(5).toFixed(1)} Z`;

  return (
    <div className="widget">
      <div className="widget-title">2D értelmezési tartományok: folytonos határ = hozzátartozik, szaggatott = kizárt!</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'parab' ? 'on' : ''} onClick={() => setKind('parab')}>
          √(y − x²)
        </button>
        <button type="button" className={kind === 'disk' ? 'on' : ''} onClick={() => setKind('disk')}>
          √(9 − x² − y²)
        </button>
        <button type="button" className={kind === 'ln' ? 'on' : ''} onClick={() => setKind('ln')}>
          ln(x² + y² − 4)
        </button>
        <button type="button" className={kind === 'inv' ? 'on' : ''} onClick={() => setKind('inv')}>
          1 / (xy)
        </button>
      </div>
      <div className="sliders">
        <label>
          próbapont x₀ = {fmt(px, 1)}
          <input type="range" min={-3.5} max={3.5} step={0.5} value={px} onChange={(e) => setPx(Number(e.target.value))} />
        </label>
        <label>
          y₀ = {fmt(py, 1)}
          <input type="range" min={-3.5} max={3.5} step={0.5} value={py} onChange={(e) => setPy(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />

        {/* Tartomány árnyékolás */}
        {kind === 'parab' && (
          <>
            <path d={parabFill} fill="rgba(56,189,248,0.22)" />
            <path d={parabCurve} fill="none" stroke="#38bdf8" strokeWidth={2.3} />
          </>
        )}
        {kind === 'disk' && (
          <circle cx={cx} cy={cy} r={3 * sc} fill="rgba(52,211,153,0.22)" stroke="#34d399" strokeWidth={2.3} />
        )}
        {kind === 'ln' && (
          <>
            <rect x={12} y={12} width={376} height={226} fill="rgba(56,189,248,0.16)" />
            <circle cx={cx} cy={cy} r={2 * sc} fill="#0b0e24" stroke="#f87171" strokeWidth={2.2} strokeDasharray="6 4" />
          </>
        )}
        {kind === 'inv' && (
          <rect x={12} y={12} width={376} height={226} fill="rgba(52,211,153,0.14)" />
        )}

        {/* Tengelyek */}
        <line
          x1={12}
          y1={cy}
          x2={388}
          y2={cy}
          stroke={kind === 'inv' ? '#f87171' : '#64748b'}
          strokeWidth={kind === 'inv' ? 2 : 1.3}
          strokeDasharray={kind === 'inv' ? '5 4' : undefined}
        />
        <line
          x1={cx}
          y1={12}
          x2={cx}
          y2={H - 12}
          stroke={kind === 'inv' ? '#f87171' : '#64748b'}
          strokeWidth={kind === 'inv' ? 2 : 1.3}
          strokeDasharray={kind === 'inv' ? '5 4' : undefined}
        />

        {/* Próbapont */}
        <circle cx={X(px)} cy={Y(py)} r={5.5} fill={info.ok ? '#34d399' : '#f87171'} stroke="#0b0e24" strokeWidth={1.6} />

        {/* Jobb oldali adatpanel */}
        <rect x={398} y={18} width={132} height={214} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={464} y={44} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>
          P({fmt(px, 1)}; {fmt(py, 1)})
        </text>
        <text x={464} y={76} textAnchor="middle" fill={info.ok ? '#34d399' : '#f87171'} fontSize={11.5} fontWeight={700}>
          {info.ok ? 'BENNE VAN D-ben ✓' : 'KÍVÜL VAN ✗'}
        </text>
        <text x={464} y={108} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>
          {info.ok ? `f(P) = ${fmt(info.val, 3)}` : 'Nem értelmezett!'}
        </text>
        <text x={464} y={154} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>
          Határ típusa:
        </text>
        <text x={464} y={174} textAnchor="middle" fill={kind === 'parab' || kind === 'disk' ? '#34d399' : '#f87171'} fontSize={10} fontWeight={700}>
          {kind === 'parab' || kind === 'disk' ? 'ZÁRT (folytonos)' : 'NYÍLT (szaggatott)'}
        </text>
      </svg>
      <div className="explain">
        <p>
          Értelmezési tartomány: <M t={info.cond} />, értékkészlet: <M t={info.range} />.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Topológiai nagyító: belső vs. határpont */
export function TopologyDiskProbeWidget() {
  const [closed, setClosed] = useState(true);
  const [rPos, setRPos] = useState(1.2);
  const R = 2.0;

  const W = 540;
  const H = 225;
  const cx = 175;
  const cy = 114;
  const sc = 42;
  const px = cx + rPos * sc;
  const py = cy;

  const state =
    rPos < R - 0.05
      ? { label: 'BELSŐ PONT', color: '#34d399', desc: 'Létezik olyan ε-körlap, amely TELJESEN a tartományon belül van.' }
      : Math.abs(rPos - R) <= 0.05
        ? {
            label: 'HATÁRPONT',
            color: '#fbbf24',
            desc: closed
              ? 'Minden ε-körlap tartalmaz benti ÉS kinti pontot is. Zárt halmaznál a határpont is része T-nek!'
              : 'Minden ε-körlap tartalmaz benti ÉS kinti pontot is. Nyílt halmaznál a határpont NEM része T-nek!',
          }
        : { label: 'KÜLSŐ PONT', color: '#f87171', desc: 'Létezik ε-körlap, amely egyáltalán nem metszi T-t.' };

  return (
    <div className="widget">
      <div className="widget-title">Belső pont vs. határpont: az ε-körlap próba (Thomas 14.1. ábra)</div>
      <div className="relbuttons chips">
        <button type="button" className={closed ? 'on' : ''} onClick={() => setClosed(true)}>
          Zárt körlap (x² + y² ≤ 4)
        </button>
        <button type="button" className={!closed ? 'on' : ''} onClick={() => setClosed(false)}>
          Nyílt körlap (x² + y² &lt; 4)
        </button>
        <button type="button" onClick={() => setRPos(2.0)}>
          Ugrás a határra (r = 2,0)
        </button>
      </div>
      <div className="sliders">
        <label>
          Pont távolsága az origótól: r = {fmt(rPos, 2)} (sugár R = 2,00)
          <input type="range" min={0} max={2.9} step={0.1} value={rPos} onChange={(e) => setRPos(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <circle
          cx={cx}
          cy={cy}
          r={R * sc}
          fill="rgba(56,189,248,0.18)"
          stroke="#38bdf8"
          strokeWidth={2.4}
          strokeDasharray={closed ? undefined : '6 4'}
        />
        <circle cx={px} cy={py} r={20} fill={`${state.color}22`} stroke={state.color} strokeWidth={1.8} strokeDasharray="3 3" />
        <circle cx={px} cy={py} r={4.5} fill={state.color} />

        <rect x={330} y={24} width={196} height={176} rx={8} fill="#0f172a" stroke={state.color} strokeWidth={1.6} />
        <text x={428} y={56} textAnchor="middle" fill={state.color} fontSize={13} fontWeight={700}>
          {state.label}
        </text>
        <text x={428} y={88} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>
          {closed ? 'T = {x² + y² ≤ 4} (ZÁRT)' : 'T = {x² + y² < 4} (NYÍLT)'}
        </text>
        <text x={428} y={118} textAnchor="middle" fill="#94a3b8" fontSize={10}>
          P ∈ T? {rPos < R - 0.05 || (Math.abs(rPos - R) <= 0.05 && closed) ? 'IGEN ✓' : 'NEM ✗'}
        </text>
        <text x={428} y={154} textAnchor="middle" fill="#cbd5e1" fontSize={9.5}>
          Korlátos? IGEN (belefér egy
        </text>
        <text x={428} y={170} textAnchor="middle" fill="#cbd5e1" fontSize={9.5}>
          véges sugarú körbe!)
        </text>
      </svg>
      <div className="explain">
        <p>{state.desc}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Forgatható 3D felület drótháló */
export function Surface3DRotatorWidget() {
  const [surf, setSurf] = useState<'parab' | 'dome' | 'saddle' | 'wave'>('parab');
  const [yaw, setYaw] = useState(38);

  const fn = {
    parab: (x: number, y: number) => 0.35 * (x * x + y * y) - 1.2,
    dome: (x: number, y: number) => 1.8 - 0.38 * (x * x + y * y),
    saddle: (x: number, y: number) => 0.32 * (x * x - y * y),
    wave: (x: number, y: number) => 1.1 * Math.sin(x) * Math.cos(y),
  }[surf];

  const label = {
    parab: 'z = x² + y² (elliptikus paraboloid — csésze)',
    dome: 'z = 4 − x² − y² (lefelé nyíló paraboloid — kupola)',
    saddle: 'z = x² − y² (hiperbolikus paraboloid — nyereg)',
    wave: 'z = sin(x) cos(y) (hullámzó felület — tojástartó)',
  }[surf];

  const W = 540;
  const H = 260;
  const proj = makeProj(W / 2, H / 2 + 12, 42, yaw, 25);

  const grid = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  const lines: string[] = [];
  for (const x of grid) {
    let d = '';
    for (let i = 0; i <= 20; i++) {
      const y = -2 + (4 * i) / 20;
      const [px, py] = proj(x, y, fn(x, y));
      d += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
    }
    lines.push(d);
  }
  for (const y of grid) {
    let d = '';
    for (let i = 0; i <= 20; i++) {
      const x = -2 + (4 * i) / 20;
      const [px, py] = proj(x, y, fn(x, y));
      d += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
    }
    lines.push(d);
  }

  const [ox, oy] = proj(0, 0, 0);
  const [xx, xy] = proj(2.7, 0, 0);
  const [yx, yy] = proj(0, 2.7, 0);
  const [zx, zy] = proj(0, 0, 2.4);

  return (
    <div className="widget">
      <div className="widget-title">3D grafikon-forgató: z = f(x, y) felületek a térben</div>
      <div className="relbuttons chips">
        <button type="button" className={surf === 'parab' ? 'on' : ''} onClick={() => setSurf('parab')}>x² + y²</button>
        <button type="button" className={surf === 'dome' ? 'on' : ''} onClick={() => setSurf('dome')}>4 − x² − y²</button>
        <button type="button" className={surf === 'saddle' ? 'on' : ''} onClick={() => setSurf('saddle')}>x² − y² (nyereg)</button>
        <button type="button" className={surf === 'wave' ? 'on' : ''} onClick={() => setSurf('wave')}>sin x cos y</button>
      </div>
      <div className="sliders">
        <label>
          3D nézőpont forgatása: {yaw}°
          <input type="range" min={-180} max={180} step={4} value={yaw} onChange={(e) => setYaw(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        {/* Tengelyek */}
        <line x1={ox} y1={oy} x2={xx} y2={xy} stroke="#fb923c" strokeWidth={1.6} />
        <line x1={ox} y1={oy} x2={yx} y2={yy} stroke="#34d399" strokeWidth={1.6} />
        <line x1={ox} y1={oy} x2={zx} y2={zy} stroke="#38bdf8" strokeWidth={1.6} />
        <text x={xx + 5} y={xy} fill="#fb923c" fontSize={11} fontWeight={700}>x</text>
        <text x={yx + 5} y={yy} fill="#34d399" fontSize={11} fontWeight={700}>y</text>
        <text x={zx + 5} y={zy} fill="#38bdf8" fontSize={11} fontWeight={700}>z</text>

        {/* Drótháló */}
        {lines.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={i < grid.length ? 'rgba(56,189,248,0.65)' : 'rgba(52,211,153,0.55)'}
            strokeWidth={1.25}
          />
        ))}
        <text x={W - 14} y={22} textAnchor="end" fill="#fbbf24" fontSize={11} fontWeight={700}>
          {label}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. 3D metszősík + 2D szintvonal szinkron */
export function Contour3DSliceWidget() {
  const [c, setC] = useState(2.0);
  // z = 4 - x^2 - y^2 => x^2 + y^2 = 4 - c
  const r = Math.sqrt(Math.max(0, 4 - c));

  const W = 540;
  const H = 235;
  const proj = makeProj(145, 165, 34, 35, 22);

  // 3D kupola körök
  const levels = [0, 1, 2, 3, 3.6];
  const circle3D = (rad: number, z: number) => {
    let d = '';
    for (let i = 0; i <= 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      const [px, py] = proj(rad * Math.cos(t), rad * Math.sin(t), z * 0.75);
      d += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
    }
    return d;
  };

  // Jobb oldali 2D szintvonalas térkép
  const cx2 = 415;
  const cy2 = 122;
  const sc2 = 38;

  return (
    <div className="widget">
      <div className="widget-title">Hogyan születik a szintvonal? z = c metszősík → xy-síkra vetítve!</div>
      <div className="sliders">
        <label>
          Metszősík magassága c = {fmt(c, 1)} (szintvonal sugara r = √(4 − c) = {fmt(r, 2)})
          <input type="range" min={0} max={3.8} step={0.2} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />

        {/* Bal: 3D kupola */}
        <text x={145} y={20} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>
          3D felület: z = 4 − x² − y²
        </text>
        {levels.map((lv) => (
          <path key={lv} d={circle3D(Math.sqrt(4 - lv), lv)} fill="none" stroke="rgba(148,163,184,0.38)" strokeWidth={1.2} />
        ))}
        {/* Aktív metszetkör */}
        <path d={circle3D(r, c)} fill="rgba(251,191,36,0.22)" stroke="#fbbf24" strokeWidth={2.6} />

        {/* Nyíl */}
        <path d="M275,122 L310,122 M304,116 L310,122 L304,128" stroke="#fbbf24" strokeWidth={2} fill="none" />

        {/* Jobb: 2D szintvonalas térkép */}
        <text x={cx2} y={20} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>
          2D szintvonalas térkép (xy-sík)
        </text>
        <line x1={325} y1={cy2} x2={505} y2={cy2} className="pl-axis" />
        <line x1={cx2} y1={34} x2={cx2} y2={212} className="pl-axis" />
        {levels.map((lv) => (
          <circle
            key={lv}
            cx={cx2}
            cy={cy2}
            r={Math.sqrt(4 - lv) * sc2}
            fill="none"
            stroke="rgba(56,189,248,0.45)"
            strokeWidth={1.3}
          />
        ))}
        <circle cx={cx2} cy={cy2} r={r * sc2} fill="none" stroke="#fbbf24" strokeWidth={2.8} />
        <text x={cx2 + r * sc2 + 4} y={cy2 - 4} fill="#fbbf24" fontSize={10} fontWeight={700}>
          c={fmt(c, 1)}
        </text>
      </svg>
      <div className="explain">
        <p>
          Figyeld meg a jobb oldali körök távolságát: a csúcs közelében (<M t="c \to 4" />) a szintvonalak ritkák
          (lapos hegytető), kifelé viszont egyre sűrűsödnek (meredekebb lejtő)!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. 4 klasszikus szintvonal-minta galéria */
export function ContourPatternGalleryWidget() {
  return (
    <div className="widget">
      <div className="widget-title">Szintvonal-olvasás: 4 alapfelület ujjlenyomata (Δc = 1 egyenlő lépésekkel)</div>
      <svg className="plane" viewBox="0 0 540 164">
        <rect width={540} height={164} className="pl-bg" />

        {/* 1. Kúp */}
        <g transform="translate(0,0)">
          <text x={67} y={20} textAnchor="middle" fill="#38bdf8" fontSize={10.5} fontWeight={700}>Kúp: √(x²+y²)</text>
          {[12, 24, 36, 48].map((r) => (
            <circle key={r} cx={67} cy={88} r={r} fill="none" stroke="#38bdf8" strokeWidth={1.5} />
          ))}
          <text x={67} y={154} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Egyenlő közű körök</text>
        </g>

        <line x1={135} y1={12} x2={135} y2={152} className="pl-grid" />

        {/* 2. Paraboloid */}
        <g transform="translate(135,0)">
          <text x={67} y={20} textAnchor="middle" fill="#34d399" fontSize={10.5} fontWeight={700}>Paraboloid: x²+y²</text>
          {[22, 31, 38, 44, 49].map((r) => (
            <circle key={r} cx={67} cy={88} r={r} fill="none" stroke="#34d399" strokeWidth={1.5} />
          ))}
          <text x={67} y={154} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Kifelé sűrűsödő körök</text>
        </g>

        <line x1={270} y1={12} x2={270} y2={152} className="pl-grid" />

        {/* 3. Sík */}
        <g transform="translate(270,0)">
          <text x={67} y={20} textAnchor="middle" fill="#fbbf24" fontSize={10.5} fontWeight={700}>Sík: x + 2y</text>
          {[-36, -18, 0, 18, 36].map((o) => (
            <line key={o} x1={20} y1={96 + o * 0.7} x2={114} y2={62 + o * 0.7} stroke="#fbbf24" strokeWidth={1.5} />
          ))}
          <text x={67} y={154} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Egyenlő közű egyenesek</text>
        </g>

        <line x1={405} y1={12} x2={405} y2={152} className="pl-grid" />

        {/* 4. Nyereg */}
        <g transform="translate(405,0)">
          <text x={67} y={20} textAnchor="middle" fill="#fb923c" fontSize={10.5} fontWeight={700}>Nyereg: x² − y²</text>
          <line x1={25} y1={46} x2={109} y2={130} stroke="#94a3b8" strokeDasharray="4 3" strokeWidth={1.2} />
          <line x1={25} y1={130} x2={109} y2={46} stroke="#94a3b8" strokeDasharray="4 3" strokeWidth={1.2} />
          <path d="M84,48 Q75,88 84,128 M50,48 Q59,88 50,128" fill="none" stroke="#fb923c" strokeWidth={1.7} />
          <path d="M27,71 Q67,80 107,71 M27,105 Q67,96 107,105" fill="none" stroke="#38bdf8" strokeWidth={1.7} />
          <text x={67} y={154} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>Hiperbolák + X (c=0)</text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. 3D szintfelületek (gömbök vs. paraboloidok) */
export function LevelSurface3DWidget() {
  const [kind, setKind] = useState<'sphere' | 'plane'>('sphere');
  const [c, setC] = useState(2.0);

  const W = 540;
  const H = 225;
  const cx = 195;
  const cy = 118;
  const sc = 34;

  return (
    <div className="widget">
      <div className="widget-title">Háromváltozós függvény szintfelületei: f(x, y, z) = c (Thomas 5. példa)</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'sphere' ? 'on' : ''} onClick={() => setKind('sphere')}>
          f(x,y,z) = √(x²+y²+z²) (gömbök)
        </button>
        <button type="button" className={kind === 'plane' ? 'on' : ''} onClick={() => setKind('plane')}>
          f(x,y,z) = x + y + z (síkok)
        </button>
      </div>
      <div className="sliders">
        <label>
          Szintérték c = {fmt(c, 1)}
          <input type="range" min={0.5} max={2.8} step={0.1} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />

        {kind === 'sphere' ? (
          <>
            {[1, 2, 2.7].map((r) => (
              <g key={r}>
                <circle cx={cx} cy={cy} r={r * sc} fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth={1.2} />
                <ellipse cx={cx} cy={cy} rx={r * sc} ry={r * sc * 0.34} fill="none" stroke="rgba(148,163,184,0.28)" strokeDasharray="3 3" />
              </g>
            ))}
            <circle cx={cx} cy={cy} r={c * sc} fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth={2.4} />
            <ellipse cx={cx} cy={cy} rx={c * sc} ry={c * sc * 0.34} fill="none" stroke="#fbbf24" strokeWidth={1.6} />
          </>
        ) : (
          <>
            {[0.5, 1.5, 2.5].map((lv) => {
              const o = (lv - 1.5) * 32;
              return (
                <polygon
                  key={lv}
                  points={`${cx - 75 + o},${cy + 40 - o * 0.4} ${cx + 55 + o},${cy + 65 - o * 0.4} ${cx + 85 + o},${cy - 45 - o * 0.4} ${cx - 45 + o},${cy - 70 - o * 0.4}`}
                  fill="rgba(148,163,184,0.08)"
                  stroke="rgba(148,163,184,0.4)"
                />
              );
            })}
            {(() => {
              const o = (c - 1.5) * 32;
              return (
                <polygon
                  points={`${cx - 75 + o},${cy + 40 - o * 0.4} ${cx + 55 + o},${cy + 65 - o * 0.4} ${cx + 85 + o},${cy - 45 - o * 0.4} ${cx - 45 + o},${cy - 70 - o * 0.4}`}
                  fill="rgba(52,211,153,0.22)"
                  stroke="#34d399"
                  strokeWidth={2.2}
                />
              );
            })()}
          </>
        )}

        <rect x={346} y={24} width={180} height={176} rx={8} fill="#0f172a" stroke="#334155" />
        <text x={436} y={54} textAnchor="middle" fill="#fbbf24" fontSize={11.5} fontWeight={700}>
          Aktív szintfelület
        </text>
        <text x={436} y={84} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>
          {kind === 'sphere' ? `x² + y² + z² = ${fmt(c * c, 2)}` : `x + y + z = ${fmt(c, 1)}`}
        </text>
        <text x={436} y={118} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>
          {kind === 'sphere' ? `r = ${fmt(c, 1)} sugarú gömb` : 'Párhuzamos síkok családja'}
        </text>
        <text x={436} y={156} textAnchor="middle" fill="#34d399" fontSize={9.5}>
          A felületen haladva f(x,y,z)
        </text>
        <text x={436} y={172} textAnchor="middle" fill="#34d399" fontSize={9.5}>
          értéke ÁLLANDÓ (= {fmt(c, 1)})!
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Föld alatti hőmérséklet (Thomas 6. példa) */
export function UndergroundTempWidget() {
  const [depth, setDepth] = useState(3.0);
  // w(x, t) = exp(-0.6 x) * cos(2*pi*t/365 - 0.6 x)
  const amp = Math.exp(-0.6 * depth);
  const lagDays = ((0.6 * depth) / (2 * Math.PI)) * 365;

  const W = 540;
  const H = 215;
  const x0 = 42;
  const x1 = 516;
  const cy = 112;
  const ampPx = 74;

  const wavePath = (d: number) => {
    let p = '';
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * 365;
      const val = Math.exp(-0.6 * d) * Math.cos((2 * Math.PI * t) / 365 - 0.6 * d);
      const px = x0 + ((x1 - x0) * t) / 365;
      const py = cy - val * ampPx;
      p += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
    }
    return p;
  };

  return (
    <div className="widget">
      <div className="widget-title">Thomas 6. példa: Föld alatti hőmérséklet-hullám w(x, t) = e^(−0,6x) cos(ωt − 0,6x)</div>
      <div className="sliders">
        <label>
          Mélység x = <strong>{fmt(depth, 1)} m</strong> (amplitúdó: {fmt(amp * 100, 1)}% · fáziskésés: {fmt(lagDays, 0)} nap)
          <input type="range" min={0} max={7} step={0.2} value={depth} onChange={(e) => setDepth(Number(e.target.value))} />
        </label>
      </div>
      <svg className="plane" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} className="pl-bg" />
        <line x1={x0} y1={cy} x2={x1} y2={cy} className="pl-axis" />
        <line x1={x0} y1={24} x2={x0} y2={198} className="pl-axis" />
        <text x={x0} y={208} fill="#94a3b8" fontSize={9.5}>0 nap (nyár)</text>
        <text x={(x0 + x1) / 2} y={208} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>182 nap (tél)</text>
        <text x={x1} y={208} textAnchor="end" fill="#94a3b8" fontSize={9.5}>365 nap (nyár)</text>

        <path d={wavePath(0)} fill="none" stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="5 4" />
        <path d={wavePath(depth)} fill="none" stroke="#38bdf8" strokeWidth={2.7} />

        <text x={x1 - 6} y={26} textAnchor="end" fill="#fbbf24" fontSize={10}>Szaggatott: felszín (x = 0 m)</text>
        <text x={x1 - 6} y={42} textAnchor="end" fill="#38bdf8" fontSize={10} fontWeight={700}>
          Kék: x = {fmt(depth, 1)} m mélyen
        </text>
      </svg>
      <div className="explain">
        <p>
          <M t="x \approx 5{,}2\text{ m}" /> mélységben a fáziskésés pontosan <strong>fél év</strong> (182 nap): amikor a
          felszínen tél van, lent éppen a nyári csúcs (igaz, már csak ~4,4%-os kilengéssel)!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Dimenziók térképe 1D → 2D → 3D */
export function MultivariableMapDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">A dimenziók létrája: 1, 2 és 3 változós függvények összehasonlítása</div>
      <svg className="plane" viewBox="0 0 540 144">
        <rect width={540} height={144} className="pl-bg" />

        <g transform="translate(10, 14)">
          <rect width={166} height={116} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          <text x={83} y={22} textAnchor="middle" fill="#38bdf8" fontSize={11} fontWeight={700}>1 változó: y = f(x)</text>
          <text x={83} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Tartomány: intervallum (1D)</text>
          <text x={83} y={68} textAnchor="middle" fill="#94a3b8" fontSize={10}>Grafikon: síkgörbe (2D)</text>
          <text x={83} y={94} textAnchor="middle" fill="#38bdf8" fontSize={9.5}>f(x) = c ⇒ pontok</text>
        </g>

        <g transform="translate(187, 14)">
          <rect width={166} height={116} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
          <text x={83} y={22} textAnchor="middle" fill="#34d399" fontSize={11} fontWeight={700}>2 változó: z = f(x, y)</text>
          <text x={83} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Tartomány: síktartomány (2D)</text>
          <text x={83} y={68} textAnchor="middle" fill="#94a3b8" fontSize={10}>Grafikon: 3D felület</text>
          <text x={83} y={94} textAnchor="middle" fill="#34d399" fontSize={9.5}>f(x,y) = c ⇒ SZINTVONAL</text>
        </g>

        <g transform="translate(364, 14)">
          <rect width={166} height={116} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
          <text x={83} y={22} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={700}>3 változó: w = f(x,y,z)</text>
          <text x={83} y={46} textAnchor="middle" fill="#e2e8f0" fontSize={10}>Tartomány: térrész (3D)</text>
          <text x={83} y={68} textAnchor="middle" fill="#94a3b8" fontSize={10}>Grafikon: 4D (nem látható)</text>
          <text x={83} y={94} textAnchor="middle" fill="#fbbf24" fontSize={9.5}>f(x,y,z) = c ⇒ SZINTFELÜLET</text>
        </g>
      </svg>
    </div>
  );
}
