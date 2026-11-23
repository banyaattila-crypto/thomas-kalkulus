import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: csonkakúp-öv (frustum band) */

export function FrustumBandDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Miért kell a ds ívelem? — A ferde csonkakúp-öv felszíne</div>
      <svg viewBox="0 0 540 175" className="plane" role="img" aria-label="Csonkakúp-öv felszíne 2πy* Δs">
        <rect width={540} height={175} className="pl-bg" />

        {/* Bal oldal: 3D csonkakúp-öv */}
        <g transform="translate(16, 16)">
          <line x1={8} y1={80} x2={228} y2={80} stroke="#64748b" strokeWidth={1.3} strokeDasharray="5 3" />
          {/* Csonkakúp palást */}
          <path d="M 65 44 L 165 26 A 18 54 0 0 1 165 134 L 65 116 A 12 36 0 0 1 65 44 Z" fill="rgba(56,189,248,0.24)" stroke="#38bdf8" strokeWidth={1.8} />
          <ellipse cx={65} cy={80} rx={12} ry={36} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth={1.6} />
          <ellipse cx={165} cy={80} rx={18} ry={54} fill="none" stroke="#7dd3fc" strokeWidth={1.6} strokeDasharray="4 3" />
          {/* Ferde alkotó Δs */}
          <line x1={65} y1={44} x2={165} y2={26} stroke="#fbbf24" strokeWidth={3} />
          <text x={112} y={24} textAnchor="middle" fill="#fde68a" fontSize={12.5} fontWeight={700}>Δs (alkotó)</text>
          {/* Átlagsugár y* */}
          <line x1={115} y1={80} x2={115} y2={35} stroke="#34d399" strokeWidth={2} />
          <text x={122} y={62} fill="#a7f3d0" fontSize={12} fontWeight={700}>y*</text>
          {/* Vízszintes Δx összehasonlítás */}
          <line x1={65} y1={146} x2={165} y2={146} stroke="#fb7185" strokeWidth={1.6} />
          <text x={115} y={160} textAnchor="middle" fill="#fecdd3" fontSize={10.5}>Δx ≠ Δs (rövidebb!)</text>
        </g>

        {/* Jobb oldal: képlet magyarázat */}
        <rect x={264} y={18} width={260} height={138} rx={8} fill="#0f172a" stroke="#1e293b" />
        <text x={394} y={40} textAnchor="middle" fill="#fbbf24" fontSize={12.5} fontWeight={700}>
          Egy csonkakúp-öv felszíne:
        </text>
        <text x={394} y={68} textAnchor="middle" fill="#7dd3fc" fontSize={14} fontWeight={700}>
          ΔS = 2π · y* · Δs
        </text>
        <text x={278} y={96} fill="#a7f3d0" fontSize={11.5}>• 2πy* = az öv átlagos kerülete</text>
        <text x={278} y={116} fill="#fde68a" fontSize={11.5}>• Δs = √(1 + (y′)²) Δx (a ferde él!)</text>
        <text x={278} y={140} fill="#94a3b8" fontSize={10.5}>Ha Δx-et írnál Δs helyett, elrontanád a meredekséget!</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: gömböv (kenyérszeletelés csoda) */

export function SphereBandSliceWidget() {
  const R = 2;
  const h = 0.8;
  const [x1, setX1] = useState(-0.4); // x1 in [-2, 1.2], band is [x1, x1 + h]
  const x2 = x1 + h;

  // Középpont sugara és meredeksége
  const xm = (x1 + x2) / 2;
  const ym = Math.sqrt(Math.max(0.01, R * R - xm * xm));
  const bandArea = 2 * Math.PI * R * h; // Mindig 3.2π ≈ 10.05!

  return (
    <div className="widget">
      <div className="widget-title">A kerek cipó csodája — minden azonos szélességű szeleten ugyanannyi a héj!</div>
      <label>
        Szelet helye a gömbön (<M t="R = 2,\; h = 0{,}8" />): <M t={`[${tx(x1, 2)};\\,${tx(x2, 2)}]`} />
        <input type="range" min={-2.0} max={1.2} step={0.1} value={x1} onChange={(e) => setX1(Number(e.target.value))} />
      </label>

      <Chart xmin={-2.4} xmax={2.4} ymin={-2.3} ymax={2.3} h={215}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const st = 50;
          const topPts: string[] = [];
          const botPts: string[] = [];
          for (let i = 0; i <= st; i++) {
            const x = x1 + (h * i) / st;
            const y = Math.sqrt(Math.max(0, R * R - x * x));
            topPts.push(`${i === 0 ? 'M' : 'L'} ${sx(x)} ${sy(y)}`);
            botPts.push(`L ${sx(x)} ${sy(-y)}`);
          }
          const bandPath = [...topPts, ...botPts.reverse(), 'Z'].join(' ');

          return (
            <>
              <circle cx={sx(0)} cy={sy(0)} r={sx(R) - sx(0)} fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth={2} />
              <path d={bandPath} fill="rgba(251,191,36,0.42)" stroke="#fbbf24" strokeWidth={2} />
              <line x1={sx(xm)} y1={sy(0)} x2={sx(xm)} y2={sy(ym)} stroke="#34d399" strokeWidth={2} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          Sugár középen: <M t={`y = ${tx(ym, 2)}`} /> · Gömböv felszíne:{' '}
          <M t={`S = 2\\pi R h = 3{,}2\\pi \\approx ${tx(bandArea, 2)}`} /> (teljesen független a helyétől!)
        </p>
        <p>
          A pólusnál kisebb a sugár (<M t="y" />), de meredekebb az ív (nagyobb <M t="ds" />) — a szorzatuk pontosan <M t="R\,dx" /> marad!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: S = ∫ 2πρ ds összefoglaló kártya */

export function SurfaceFormulasCardDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Egyetlen univerzális képlet három ruhában: S = ∫ 2πρ ds</div>
      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="Forgásfelület felszínének 3 alakja">
        <rect width={540} height={165} className="pl-bg" />

        {/* 1. y = f(x) */}
        <rect x={12} y={14} width={166} height={136} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={95} y={36} textAnchor="middle" fill="#7dd3fc" fontSize={12} fontWeight={700}>1. y = f(x) görbe</text>
        <text x={95} y={62} textAnchor="middle" fill="#fde68a" fontSize={11.5}>ds = √(1 + (y′)²) dx</text>
        <text x={95} y={92} textAnchor="middle" fill="#e2e8f0" fontSize={11}>x-tengely: ρ = y = f(x)</text>
        <text x={95} y={114} textAnchor="middle" fill="#e2e8f0" fontSize={11}>y-tengely: ρ = x</text>
        <text x={95} y={138} textAnchor="middle" fill="#94a3b8" fontSize={10}>határok: x ∈ [a; b]</text>

        {/* 2. x = g(y) */}
        <rect x={187} y={14} width={166} height={136} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={270} y={36} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontWeight={700}>2. x = g(y) görbe</text>
        <text x={270} y={62} textAnchor="middle" fill="#fde68a" fontSize={11.5}>ds = √(1 + (x′)²) dy</text>
        <text x={270} y={92} textAnchor="middle" fill="#e2e8f0" fontSize={11}>y-tengely: ρ = x = g(y)</text>
        <text x={270} y={114} textAnchor="middle" fill="#e2e8f0" fontSize={11}>x-tengely: ρ = y</text>
        <text x={270} y={138} textAnchor="middle" fill="#94a3b8" fontSize={10}>határok: y ∈ [c; d]</text>

        {/* 3. Paraméteres */}
        <rect x={362} y={14} width={166} height={136} rx={8} fill="#0f172a" stroke="#fbbf24" strokeWidth={1.6} />
        <text x={445} y={36} textAnchor="middle" fill="#fde68a" fontSize={12} fontWeight={700}>3. Paraméteres (t)</text>
        <text x={445} y={62} textAnchor="middle" fill="#fde68a" fontSize={11.5}>ds = √((x′)² + (y′)²) dt</text>
        <text x={445} y={92} textAnchor="middle" fill="#e2e8f0" fontSize={11}>x-tengely: ρ = y(t)</text>
        <text x={445} y={114} textAnchor="middle" fill="#e2e8f0" fontSize={11}>y-tengely: ρ = x(t)</text>
        <text x={445} y={138} textAnchor="middle" fill="#94a3b8" fontSize={10}>határok: t ∈ [a; b]</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Papposz tételei + Tórusz */

export function PappusTorusWidget() {
  const [a, setA] = useState(1.0); // cső sugara
  const [b, setB] = useState(2.6); // középkör sugara (b > a)

  const V = 2 * Math.PI * Math.PI * a * a * b;
  const S = 4 * Math.PI * Math.PI * a * b;

  return (
    <div className="widget">
      <div className="widget-title">Papposz tételei akcióban: a tórusz (fánk) integrálás nélkül!</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <label>
          Körlap sugara: <M t={`a = ${tx(a, 1)}`} />
          <input type="range" min={0.4} max={1.4} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Súlypont távolsága: <M t={`b = ${tx(b, 1)}`} />
          <input type="range" min={1.8} max={3.6} step={0.2} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>

      <Chart xmin={-5.2} xmax={5.2} ymin={-2.0} ymax={2.0} h={195}>
        {(m) => {
          const sx = m.X;
          const sy = m.Y;
          const rPx = sx(a) - sx(0);
          return (
            <>
              {/* Forgástengely (y-tengely) */}
              <line x1={sx(0)} y1={sy(-2)} x2={sx(0)} y2={sy(2)} stroke="#fbbf24" strokeWidth={2} strokeDasharray="6 3" />
              {/* Jobb oldali generáló kör */}
              <circle cx={sx(b)} cy={sy(0)} r={rPx} fill="rgba(56,189,248,0.34)" stroke="#38bdf8" strokeWidth={2.4} />
              {/* Bal oldali tükörkép kör */}
              <circle cx={sx(-b)} cy={sy(0)} r={rPx} fill="rgba(56,189,248,0.16)" stroke="#38bdf8" strokeWidth={1.6} strokeDasharray="4 3" />
              {/* Súlypont útja (2πb) */}
              <ellipse cx={sx(0)} cy={sy(0)} rx={sx(b) - sx(0)} ry={18} fill="none" stroke="#34d399" strokeWidth={2} strokeDasharray="5 3" />
              <circle cx={sx(b)} cy={sy(0)} r={4.5} fill="#34d399" />
              <line x1={sx(0)} y1={sy(0)} x2={sx(b)} y2={sy(0)} stroke="#34d399" strokeWidth={2} />
            </>
          );
        }}
      </Chart>

      <div className="result">
        <p>
          <strong>Térfogat (Papposz I.):</strong> <M t={`V = (2\\pi b)(\\pi a^2) = 2\\pi^2 a^2 b \\approx ${tx(V, 2)}`} />
        </p>
        <p>
          <strong>Felszín (Papposz II.):</strong> <M t={`S = (2\\pi b)(2\\pi a) = 4\\pi^2 a b \\approx ${tx(S, 2)}`} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Papposz oda-vissza hídja */

export function PappusReverseDiagram() {
  return (
    <div className="widget">
      <div className="widget-title">Papposz tételei kétirányú utcák — súlypont 1 sorban!</div>
      <svg viewBox="0 0 540 165" className="plane" role="img" aria-label="Papposz tételek oda és visszafelé">
        <rect width={540} height={165} className="pl-bg" />

        {/* Bal oldal: Oda */}
        <rect x={14} y={14} width={246} height={136} rx={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
        <text x={137} y={36} textAnchor="middle" fill="#7dd3fc" fontSize={12.5} fontWeight={700}>Előrefelé: Súlypont → V, S</text>
        <text x={28} y={64} fill="#e2e8f0" fontSize={11.5}>Ismert a súlypont (ρ) és A vagy L:</text>
        <text x={137} y={94} textAnchor="middle" fill="#fde68a" fontSize={13} fontWeight={700}>V = 2πρ · A</text>
        <text x={137} y={118} textAnchor="middle" fill="#a7f3d0" fontSize={13} fontWeight={700}>S = 2πρ · L</text>
        <text x={137} y={140} textAnchor="middle" fill="#94a3b8" fontSize={10}>pl. tórusz, forgatott háromszög</text>

        {/* Jobb oldal: Vissza */}
        <rect x={280} y={14} width={246} height={136} rx={8} fill="#0f172a" stroke="#34d399" strokeWidth={1.6} />
        <text x={403} y={36} textAnchor="middle" fill="#a7f3d0" fontSize={12.5} fontWeight={700}>Visszafelé: V, S → Súlypont!</text>
        <text x={294} y={64} fill="#e2e8f0" fontSize={11.5}>Ismert a gömb (V = 4πr³/3, S = 4πr²):</text>
        <text x={403} y={94} textAnchor="middle" fill="#fde68a" fontSize={12.5} fontWeight={700}>ρ_lemez = V / (2πA) = 4r / (3π)</text>
        <text x={403} y={118} textAnchor="middle" fill="#7dd3fc" fontSize={12.5} fontWeight={700}>ρ_huzal = S / (2πL) = 2r / π</text>
        <text x={403} y={140} textAnchor="middle" fill="#94a3b8" fontSize={10}>egyetlen integrál nélkül!</text>
      </svg>
    </div>
  );
}
