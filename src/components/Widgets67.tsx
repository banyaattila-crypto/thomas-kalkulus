import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';

const tx = (n: number, d = 1) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: hidrosztatikai paradoxon */

export function HydrostaticParadoxWidget() {
  const [h, setH] = useState(3.0); // mélység m-ben
  const A = 2.0; // alapterület m²
  const rhoG = 9.8; // kN/m³ (víz)
  const p = rhoG * h; // kPa
  const F = p * A; // kN

  const waterTopY = 135 - (h / 5) * 95;

  return (
    <div className="widget">
      <div className="widget-title">A hidrosztatikai paradoxon — különböző forma, azonos alapnyomás!</div>
      <label>
        Vízmélység mindhárom edényben: <strong>h = {round(h, 1)} m</strong> (alapterület: A = 2 m²)
        <input type="range" min={1.0} max={5.0} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} />
      </label>

      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="Három különböző alakú tartály azonos alapnyomással">
        <rect width={540} height={165} className="pl-bg" />

        {/* 1. Szélesedő edény */}
        <g transform="translate(22, 0)">
          <polygon
            points={`35,135 115,135 ${115 + (135 - waterTopY) * 0.28},${waterTopY} ${35 - (135 - waterTopY) * 0.28},${waterTopY}`}
            fill="rgba(56,189,248,0.34)"
          />
          <polyline points="8,36 35,135 115,135 142,36" fill="none" stroke="#94a3b8" strokeWidth={2.4} />
          <text x={75} y={154} textAnchor="middle" fill="#bae6fd" fontSize={11} fontWeight={700}>F = {round(F, 1)} kN</text>
        </g>

        {/* 2. Egyenes henger */}
        <g transform="translate(195, 0)">
          <rect x={35} y={waterTopY} width={80} height={135 - waterTopY} fill="rgba(56,189,248,0.34)" />
          <polyline points="35,36 35,135 115,135 115,36" fill="none" stroke="#94a3b8" strokeWidth={2.4} />
          <text x={75} y={154} textAnchor="middle" fill="#a7f3d0" fontSize={11} fontWeight={700}>F = {round(F, 1)} kN</text>
        </g>

        {/* 3. Keskenyedő edény */}
        <g transform="translate(368, 0)">
          <polygon
            points={`35,135 115,135 ${115 - (135 - waterTopY) * 0.24},${waterTopY} ${35 + (135 - waterTopY) * 0.24},${waterTopY}`}
            fill="rgba(56,189,248,0.34)"
          />
          <polyline points="59,36 35,135 115,135 91,36" fill="none" stroke="#94a3b8" strokeWidth={2.4} />
          <text x={75} y={154} textAnchor="middle" fill="#fde68a" fontSize={11} fontWeight={700}>F = {round(F, 1)} kN</text>
        </g>

        {/* Közös vízszint vonal */}
        <line x1={18} y1={waterTopY} x2={522} y2={waterTopY} stroke="#38bdf8" strokeWidth={1.3} strokeDasharray="5 4" />
        <text x={270} y={22} textAnchor="middle" fill="#cbd5e1" fontSize={11.5}>
          Nyomás az alapon: p = ρgh = {round(p, 1)} kPa (az edény alakja NEM számít!)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: gát falára ható nyomásprofil */

export function VerticalDamSliceWidget() {
  const [depth, setDepth] = useState(2.0); // csík mélysége [0.2, 3.8], teljes H = 4 m, szélesség w = 5 m
  const H = 4;
  const w = 5;
  const rhoG = 9.8; // kN/m³
  const pAt = rhoG * depth; // kPa
  const Ftot = 0.5 * rhoG * w * H * H; // 392 kN

  const yPx = 28 + (depth / H) * 116;

  return (
    <div className="widget">
      <div className="widget-title">Miért alul legvastagabb egy völgyzáró gát? — Lineáris nyomásprofil</div>
      <label>
        Kiemelt vízszintes csík mélysége: <strong>h = {round(depth, 1)} m</strong> (teljes mélység: H = 4 m, szélesség: 5 m)
        <input type="range" min={0.2} max={3.8} step={0.2} value={depth} onChange={(e) => setDepth(Number(e.target.value))} />
      </label>

      <svg viewBox="0 0 540 175" className="plane" role="img" aria-label="Gát oldalára ható növekvő víznyomás">
        <rect width={540} height={175} className="pl-bg" />

        {/* Víz a gát bal oldalán */}
        <rect x={24} y={28} width={166} height={116} fill="rgba(56,189,248,0.22)" />
        {/* Nyomásnyilak (felül kicsi, alul nagy) */}
        {[0.5, 1.2, 2.0, 2.8, 3.6].map((d, i) => {
          const yy = 28 + (d / H) * 116;
          const len = 14 + (d / H) * 85;
          return (
            <g key={i}>
              <line x1={190 - len} y1={yy} x2={186} y2={yy} stroke="#38bdf8" strokeWidth={2} />
              <polygon points={`190,${yy} 182,${yy - 3.5} 182,${yy + 3.5}`} fill="#38bdf8" />
            </g>
          );
        })}

        {/* Kiemelt csík a gáton */}
        <rect x={190} y={yPx - 4} width={12} height={8} fill="#fbbf24" />
        {/* Gát keresztmetszete (alul széles!) */}
        <polygon points="190,22 222,22 272,144 190,144" fill="#334155" stroke="#64748b" strokeWidth={1.8} />
        <text x={225} y={108} textAnchor="middle" fill="#cbd5e1" fontSize={11} fontWeight={700}>Gát</text>

        {/* Jobb oldal: adatdoboz */}
        <rect x={294} y={22} width={230} height={128} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={409} y={44} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={700}>
          Csík mélysége: h = {round(depth, 1)} m
        </text>
        <text x={308} y={70} fill="#7dd3fc" fontSize={11.5}>• Helyi nyomás: p = {round(pAt, 1)} kPa</text>
        <text x={308} y={94} fill="#a7f3d0" fontSize={11.5}>• Elemi erő: dF = ρg·h·w dh</text>
        <text x={308} y={122} fill="#fde68a" fontSize={12} fontWeight={700}>
          Teljes erő: F = ½ρgwH² = {round(Ftot, 0)} kN
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: háromszög és trapéz lemezek */

type PlateKind = 'triDown' | 'triUp' | 'trap';

export function SubmergedPlateShapesWidget() {
  const [kind, setKind] = useState<PlateKind>('triDown');
  const [y, setY] = useState(1.5); // mélység a vízfelszíntől lefelé

  const H = kind === 'trap' ? 4 : 3;
  const clampedY = Math.min(H - 0.15, Math.max(0.15, y));

  const widthAt = (d: number) => {
    if (kind === 'triDown') return 4 * (1 - d / 3);
    if (kind === 'triUp') return (4 / 3) * d;
    return 6 - d; // trapéz: felül 6, alul 2, magasság 4
  };
  const L = widthAt(clampedY);

  const selectKind = (k: PlateKind) => {
    setKind(k);
    setY(1.5);
  };

  return (
    <div className="widget">
      <div className="widget-title">Háromszög és trapéz gátak — miért számít, merre áll a csúcs?</div>
      <div className="relbuttons chips">
        <button type="button" className={kind === 'triDown' ? 'on' : ''} onClick={() => selectKind('triDown')}>
          Háromszög (csúccsal lefelé)
        </button>
        <button type="button" className={kind === 'triUp' ? 'on' : ''} onClick={() => selectKind('triUp')}>
          Háromszög (csúccsal felfelé!)
        </button>
        <button type="button" className={kind === 'trap' ? 'on' : ''} onClick={() => selectKind('trap')}>
          Trapéz gát (6 m → 2 m)
        </button>
      </div>

      <label>
        Vízszintes csík mélysége: <M t={`h = ${tx(clampedY, 2)}\\text{ m}`} /> (szélesség:{' '}
        <M t={`L(h) = ${tx(L, 2)}\\text{ m}`} />)
        <input
          type="range"
          min={0.2}
          max={H - 0.2}
          step={0.1}
          value={clampedY}
          onChange={(e) => setY(Number(e.target.value))}
        />
      </label>

      <Chart xmin={-3.5} xmax={3.5} ymin={-H - 0.4} ymax={0.5} h={205}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const poly =
            kind === 'triDown'
              ? `M ${sx(-2)} ${sy(0)} L ${sx(2)} ${sy(0)} L ${sx(0)} ${sy(-3)} Z`
              : kind === 'triUp'
              ? `M ${sx(0)} ${sy(0)} L ${sx(2)} ${sy(-3)} L ${sx(-2)} ${sy(-3)} Z`
              : `M ${sx(-3)} ${sy(0)} L ${sx(3)} ${sy(0)} L ${sx(1)} ${sy(-4)} L ${sx(-1)} ${sy(-4)} Z`;

          return (
            <>
              <line x1={sx(-3.5)} y1={sy(0)} x2={sx(3.5)} y2={sy(0)} stroke="#38bdf8" strokeWidth={2} strokeDasharray="6 3" />
              <path d={poly} fill="rgba(56,189,248,0.26)" stroke="#38bdf8" strokeWidth={2.2} />
              <rect
                x={sx(-L / 2)}
                y={sy(-clampedY) - 4}
                width={Math.max(2, sx(L / 2) - sx(-L / 2))}
                height={8}
                fill="rgba(251,191,36,0.78)"
                stroke="#fbbf24"
                strokeWidth={1.4}
              />
            </>
          );
        }}
      </Chart>

      <div className="result">
        {kind === 'triDown' && (
          <p>
            <M t="F = \rho g\int_0^3 h\cdot 4\left(1-\dfrac{h}{3}\right)dh = \mathbf{6\rho g}" /> (a széles rész fent van, kis nyomásnál!).
          </p>
        )}
        {kind === 'triUp' && (
          <p>
            <M t="F = \rho g\int_0^3 h\cdot\dfrac{4}{3}h\,dh = \mathbf{12\rho g}" /> — <strong>kétszer akkora erő</strong>, mert a széles alap mélyen van!
          </p>
        )}
        {kind === 'trap' && (
          <p>
            <M t="F = \rho g\int_0^4 h(6-h)\,dh = \mathbf{\dfrac{80}{3}\rho g} \approx 26{,}7\rho g" />.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: súlypont-csoda (tengeralattjáró ablak) */

export function CentroidForceShortcutWidget() {
  const [r, setR] = useState(1.0);
  const [hbar, setHbar] = useState(6.0);
  const safeH = Math.max(r + 0.5, hbar);
  const A = Math.PI * r * r;
  const FkN = 9.8 * safeH * A;

  return (
    <div className="widget">
      <div className="widget-title">A súlypont-csoda: F = ρg · h̄ · A (tengeralattjáró körablaka integrálás nélkül!)</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Ablak sugara: <strong>r = {round(r, 1)} m</strong>
          <input type="range" min={0.5} max={2.0} step={0.1} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          Középpont mélysége: <strong>h̄ = {round(safeH, 1)} m</strong>
          <input type="range" min={2.5} max={12.0} step={0.5} value={safeH} onChange={(e) => setHbar(Number(e.target.value))} />
        </label>
      </div>

      <svg viewBox="0 0 520 155" className="plane" role="img" aria-label="Kör alakú víz alatti ablak súlyponti nyomása">
        <rect width={520} height={155} className="pl-bg" />
        {/* Vízfelszín */}
        <line x1={20} y1={22} x2={250} y2={22} stroke="#38bdf8" strokeWidth={2} />
        <text x={28} y={16} fill="#7dd3fc" fontSize={10.5}>vízfelszín (h = 0)</text>
        <rect x={20} y={22} width={230} height={122} fill="rgba(56,189,248,0.16)" />
        {/* Körablak */}
        <circle
          cx={135}
          cy={28 + (safeH / 13) * 96}
          r={10 + r * 14}
          fill="rgba(52,211,153,0.30)"
          stroke="#34d399"
          strokeWidth={2.2}
        />
        <circle cx={135} cy={28 + (safeH / 13) * 96} r={4} fill="#fbbf24" />
        <line x1={135} y1={22} x2={135} y2={28 + (safeH / 13) * 96} stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="4 3" />
        <text x={144} y={22 + (safeH / 13) * 48} fill="#fde68a" fontSize={11.5} fontWeight={700}>h̄ = {round(safeH, 1)} m</text>

        {/* Jobb oldal: instant képlet */}
        <rect x={270} y={20} width={234} height={116} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={387} y={42} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>Integrálás nélkül, 1 sorban!</text>
        <text x={284} y={68} fill="#e2e8f0" fontSize={11.5}>• Terület: A = πr² ≈ {round(A, 2)} m²</text>
        <text x={284} y={90} fill="#7dd3fc" fontSize={11.5}>• Súlyponti nyomás: {round(9.8 * safeH, 1)} kPa</text>
        <text x={284} y={118} fill="#fde68a" fontSize={12.5} fontWeight={700}>
          F = ρg·h̄·A ≈ {round(FkN, 1)} kN
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: parabola zsilipkapu kétféleképp */

export function ParabolicGateDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Parabola alakú zsilipkapu (y = x², 0 ≤ y ≤ 4) — két út, ugyanaz az erő!</div>
      <svg viewBox="0 0 540 170" className="plane" role="img" aria-label="Parabola alakú kapura ható vízerő">
        <rect width={540} height={170} className="pl-bg" />

        {/* Bal oldal: parabola kapu */}
        <line x1={26} y1={30} x2={236} y2={30} stroke="#38bdf8" strokeWidth={2} strokeDasharray="5 3" />
        <path d="M 56 30 Q 131 245 206 30 Z" fill="rgba(56,189,248,0.26)" stroke="#38bdf8" strokeWidth={2.2} />
        {/* Vízszintes csík */}
        <rect x={88} y={84} width={86} height={8} fill="rgba(251,191,36,0.75)" stroke="#fbbf24" strokeWidth={1.3} />
        {/* Súlypont */}
        <circle cx={131} cy={74} r={4.5} fill="#34d399" />
        <text x={131} y={20} textAnchor="middle" fill="#7dd3fc" fontSize={11}>vízfelszín (y = 4)</text>
        <text x={131} y={154} textAnchor="middle" fill="#cbd5e1" fontSize={10.5}>csíkszélesség: L(y) = 2√y</text>

        {/* Jobb oldal: két módszer */}
        <rect x={256} y={16} width={268} height={138} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={270} y={38} fill="#fde68a" fontSize={12} fontWeight={700}>1. Közvetlen integrálással:</text>
        <text x={270} y={58} fill="#e2e8f0" fontSize={11.5}>F = ρg ∫₀⁴ (4 − y)·2√y dy = (256/15) ρg</text>
        <line x1={270} y1={74} x2={510} y2={74} stroke="#1e293b" strokeWidth={1.5} />
        <text x={270} y={96} fill="#a7f3d0" fontSize={12} fontWeight={700}>2. Súlypont-tétellel (6.4-ből):</text>
        <text x={270} y={116} fill="#e2e8f0" fontSize={11.5}>A = 32/3,  ȳ = 12/5 ⇒ h̄ = 4 − 12/5 = 8/5</text>
        <text x={270} y={138} fill="#7dd3fc" fontSize={12} fontWeight={700}>
          F = ρg · (8/5) · (32/3) = (256/15) ρg ✓
        </text>
      </svg>
    </div>
  );
}
