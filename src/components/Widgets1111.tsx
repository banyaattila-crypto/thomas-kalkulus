import { useState } from 'react';

/* ============================================================================
   11.11. Fourier-sorok — 8 interaktív és szemléltető SVG widget
   Színpaletta: cián #38bdf8, smaragd #34d399, teal #2dd4bf, arany #fbbf24,
   narancs #fb923c, piros #f87171, kék #60a5fa (rózsaszín/lila nélkül).
   ============================================================================ */

/* ------------------------------------------------------------------ 1. Interaktív Fourier-szintetizátor */
type WaveKind = 'square' | 'saw' | 'tri';

export function FourierSynthWidget() {
  const [kind, setKind] = useState<WaveKind>('square');
  const [N, setN] = useState(5);

  const W = 540;
  const H = 235;
  const xMin = -Math.PI;
  const xMax = Math.PI;
  const yMin = -1.6;
  const yMax = 1.6;
  const padL = 40;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);

  const target = (x: number) => {
    if (kind === 'square') return x >= 0 ? 1 : -1;
    if (kind === 'saw') return x / Math.PI;
    return 1 - (2 * Math.abs(x)) / Math.PI;
  };

  const synth = (x: number, terms: number) => {
    let s = 0;
    if (kind === 'square') {
      for (let k = 0; k < terms; k++) {
        const m = 2 * k + 1;
        s += (4 / (Math.PI * m)) * Math.sin(m * x);
      }
    } else if (kind === 'saw') {
      for (let n = 1; n <= terms; n++) {
        s += ((2 * Math.pow(-1, n + 1)) / (Math.PI * n)) * Math.sin(n * x);
      }
    } else {
      for (let k = 0; k < terms; k++) {
        const m = 2 * k + 1;
        s += (8 / (Math.PI * Math.PI * m * m)) * Math.cos(m * x);
      }
    }
    return s;
  };

  let dTarget = '';
  let dSynth = '';
  for (let i = 0; i <= 200; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 200;
    const yt = target(xv);
    const ys = synth(xv, N);
    dTarget += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yt).toFixed(1)} `;
    dSynth += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(ys).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">Fourier-szintetizátor: hullámformák építése szinuszokból és koszinuszokból</div>
      <div className="relbuttons chips">
        <button className={kind === 'square' ? 'on' : ''} onClick={() => setKind('square')}>
          Négyszögjel
        </button>
        <button className={kind === 'saw' ? 'on' : ''} onClick={() => setKind('saw')}>
          Fűrészfog
        </button>
        <button className={kind === 'tri' ? 'on' : ''} onClick={() => setKind('tri')}>
          Háromszöghullám
        </button>
      </div>
      <div className="wcontrols">
        <label>
          Harmonikusok száma <b>N = {N}</b>
          <input type="range" min={1} max={15} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <path d={dTarget} fill="none" stroke="rgba(148, 163, 184, 0.55)" strokeWidth={2} strokeDasharray="5 4" />
        <path d={dSynth} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
        <text x={X(-Math.PI)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>−π</text>
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(Math.PI)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>π</text>
        <text x={padL + 10} y={padT + 16} fill="#94a3b8" fontSize={11}>-- Célfüggvény f(x)</text>
        <text x={padL + 10} y={padT + 32} fill="#38bdf8" fontSize={11}>— Fourier-részletösszeg S_{N}(x)</text>
      </svg>
      <div className="readout">
        {kind === 'tri'
          ? 'A folytonos háromszöghullámhoz már 3–4 koszinusz-tag is szinte tökéletesen simul!'
          : 'Az ugrásos hullámformákhoz sok felharmonikus kell — és a szakadásnál apró „fülecskék” maradnak (Gibbs-jelenség)!'}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. Ortogonalitás-vizsgáló */
export function OrthogonalityWidget() {
  const [m, setM] = useState(1);
  const [n, setN] = useState(2);

  const W = 540;
  const H = 200;
  const padL = 40;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x + Math.PI) / (2 * Math.PI)) * (W - padL - padR);
  const Y = (y: number) => padT + ((1.2 - y) / 2.4) * (H - padT - padB);

  const same = m === n;
  // Pozitív és negatív kitöltési poligonok
  const steps = 180;
  const posRects: { x: number; y: number; h: number; w: number; pos: boolean }[] = [];
  const dx = (2 * Math.PI) / steps;
  const bw = (W - padL - padR) / steps;
  for (let i = 0; i < steps; i++) {
    const xv = -Math.PI + (i + 0.5) * dx;
    const yv = Math.sin(m * xv) * Math.sin(n * xv);
    const y0 = Y(0);
    const y1 = Y(yv);
    posRects.push({
      x: padL + i * bw,
      y: Math.min(y0, y1),
      h: Math.abs(y1 - y0),
      w: bw + 0.4,
      pos: yv >= 0,
    });
  }

  let dCurve = '';
  for (let i = 0; i <= 180; i++) {
    const xv = -Math.PI + (2 * Math.PI * i) / 180;
    const yv = Math.sin(m * xv) * Math.sin(n * xv);
    dCurve += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yv).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">Ortogonalitás: ∫ sin(mx)·sin(nx) dx a [−π, π] intervallumon</div>
      <div className="wcontrols">
        <label>
          <b>m = {m}</b>
          <input type="range" min={1} max={4} value={m} onChange={(e) => setM(+e.target.value)} />
        </label>
        <label>
          <b>n = {n}</b>
          <input type="range" min={1} max={4} value={n} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        {posRects.map((r, i) => (
          <rect
            key={i}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill={r.pos ? 'rgba(52, 211, 153, 0.35)' : 'rgba(251, 146, 60, 0.35)'}
          />
        ))}
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <path d={dCurve} fill="none" stroke="#38bdf8" strokeWidth={2} />
        <text x={X(-Math.PI)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>−π</text>
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(Math.PI)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>π</text>
      </svg>
      <div className="readout">
        {same ? (
          <>
            <b>m = n = {m}:</b> a görbe végig nemnegatív (sin²({m}x) ≥ 0), a teljes integrál pontosan <b>π</b>!
          </>
        ) : (
          <>
            <b>m = {m} ≠ n = {n}:</b> a zöld (+) és narancs (−) területek <b>tökéletesen kioltják egymást</b>, az integrál pontosan <b>0</b>!
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Gibbs-jelenség ráközelítés */
export function SquareWaveGibbsWidget() {
  const [K, setK] = useState(8); // hány páratlan tag
  const W = 540;
  const H = 220;
  const xMin = -0.6;
  const xMax = 2.0;
  const yMin = -1.35;
  const yMax = 1.35;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);

  const sq = (x: number) => {
    let s = 0;
    for (let k = 0; k < K; k++) {
      const m = 2 * k + 1;
      s += (4 / (Math.PI * m)) * Math.sin(m * x);
    }
    return s;
  };

  let dS = '';
  let maxVal = 0;
  for (let i = 0; i <= 220; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 220;
    const yv = sq(xv);
    if (xv > 0 && yv > maxVal) maxVal = yv;
    dS += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(yv).toFixed(1)} `;
  }

  const overshootPct = ((maxVal - 1) / 2) * 100; // ugrás magassága 2 (-1-ről +1-re)

  return (
    <div className="widget">
      <div className="wtitle">A Gibbs-jelenség: az ugrásnál a ~9%-os túllendülés sosem tűnik el!</div>
      <div className="wcontrols">
        <label>
          Páratlan tagok száma <b>K = {K}</b> (legmagasabb frekvencia: {2 * K - 1}x)
          <input type="range" min={1} max={25} value={K} onChange={(e) => setK(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        {/* Cél négyszögjel */}
        <path d={`M${X(xMin)},${Y(-1)} L${X(0)},${Y(-1)} M${X(0)},${Y(1)} L${X(xMax)},${Y(1)}`} stroke="#94a3b8" strokeWidth={1.8} strokeDasharray="4 4" />
        {/* Gibbs csúcs referencia 1.179 */}
        <line x1={X(0)} y1={Y(1.179)} x2={W - padR} y2={Y(1.179)} stroke="#fb923c" strokeDasharray="3 3" opacity={0.75} />
        <text x={W - padR - 4} y={Y(1.179) - 5} textAnchor="end" fill="#fb923c" fontSize={10.5}>
          Gibbs-határ ≈ 1,179 (+8,95% az ugrásból)
        </text>
        <path d={dS} fill="none" stroke="#38bdf8" strokeWidth={2.3} />
        <circle cx={X(0)} cy={Y(0)} r={4.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.3} />
      </svg>
      <div className="readout">
        Csúcsérték = <b>{maxVal.toFixed(4)}</b> (túllendülés az ugrás arányában: <b>{overshootPct.toFixed(1)}%</b>).
        Ahogy K nő, a csúcs csak összenyomódik x = 0 felé, de a magassága ~8,95%-nál megáll!
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Dirichlet-féle felezőpont ugrásoknál */
export function DirichletMidpointWidget() {
  const W = 540;
  const H = 185;
  const xMin = -Math.PI;
  const xMax = 3 * Math.PI;
  const padL = 42;
  const padR = 20;
  const padT = 22;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((2.6 - y) / 2.6) * (H - padT - padB);

  const segs: [number, number, number][] = [
    [-Math.PI, 0, 2],
    [0, Math.PI, 1],
    [Math.PI, 2 * Math.PI, 2],
    [2 * Math.PI, 3 * Math.PI, 1],
  ];
  const jumps = [0, Math.PI, 2 * Math.PI];

  return (
    <div className="widget">
      <div className="wtitle">Dirichlet konvergenciatétele: ugráspontokban a Fourier-sor a felezőponthoz konvergál</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        {segs.map(([a, b, y], i) => (
          <g key={i}>
            <line x1={X(a)} y1={Y(y)} x2={X(b)} y2={Y(y)} stroke="#38bdf8" strokeWidth={3} />
            <circle cx={X(a)} cy={Y(y)} r={3.5} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
            <circle cx={X(b)} cy={Y(y)} r={3.5} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.6} />
          </g>
        ))}
        {jumps.map((xj, i) => (
          <g key={i}>
            <line x1={X(xj)} y1={Y(1)} x2={X(xj)} y2={Y(2)} stroke="#fbbf24" strokeDasharray="3 3" opacity={0.7} />
            <circle cx={X(xj)} cy={Y(1.5)} r={5.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.6} />
          </g>
        ))}
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(Math.PI)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>π</text>
        <text x={X(2 * Math.PI)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>2π</text>
        <text x={padL - 8} y={Y(1) + 4} textAnchor="end" fill="#94a3b8" fontSize={11}>1</text>
        <text x={padL - 8} y={Y(1.5) + 4} textAnchor="end" fill="#fbbf24" fontSize={11} fontWeight={700}>1,5</text>
        <text x={padL - 8} y={Y(2) + 4} textAnchor="end" fill="#94a3b8" fontSize={11}>2</text>
      </svg>
      <div className="readout">
        Az ugrási helyeken (<M_t>x = nπ</M_t>) a Fourier-sor összege pontosan az átlag: <b>(1 + 2)/2 = 1,5</b> (arany
        pontok)!
      </div>
    </div>
  );
}

function M_t({ children }: { children: string }) {
  return <span>{children}</span>;
}

/* ------------------------------------------------------------------ 5. Páros vs. páratlan szimmetria */
export function EvenOddFourierWidget() {
  const [mode, setMode] = useState<'even' | 'odd'>('even');
  const [N, setN] = useState(4);
  const W = 540;
  const H = 220;
  const xMin = -Math.PI;
  const xMax = Math.PI;
  const yMin = mode === 'even' ? -0.3 : -3.6;
  const yMax = 3.6;
  const padL = 42;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);

  const exact = (x: number) => (mode === 'even' ? Math.abs(x) : x);
  const approx = (x: number) => {
    if (mode === 'even') {
      let s = Math.PI / 2;
      for (let k = 0; k < N; k++) {
        const m = 2 * k + 1;
        s -= (4 / (Math.PI * m * m)) * Math.cos(m * x);
      }
      return s;
    } else {
      let s = 0;
      for (let n = 1; n <= N; n++) {
        s += ((2 * Math.pow(-1, n + 1)) / n) * Math.sin(n * x);
      }
      return s;
    }
  };

  let dE = '';
  let dA = '';
  for (let i = 0; i <= 180; i++) {
    const xv = xMin + ((xMax - xMin) * i) / 180;
    dE += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(exact(xv)).toFixed(1)} `;
    dA += `${i ? 'L' : 'M'}${X(xv).toFixed(1)},${Y(approx(xv)).toFixed(1)} `;
  }

  return (
    <div className="widget">
      <div className="wtitle">Szimmetria-rövidítés: páros → csak koszinuszok · páratlan → csak szinuszok</div>
      <div className="relbuttons chips">
        <button className={mode === 'even' ? 'on' : ''} onClick={() => setMode('even')}>
          Páros: f(x) = |x| (bₙ = 0)
        </button>
        <button className={mode === 'odd' ? 'on' : ''} onClick={() => setMode('odd')}>
          Páratlan: f(x) = x (a₀ = aₙ = 0)
        </button>
      </div>
      <div className="wcontrols">
        <label>
          Tagok száma <b>N = {N}</b>
          <input type="range" min={1} max={10} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="ax" />
        <line x1={X(0)} y1={padT} x2={X(0)} y2={H - padB} className="ax" />
        <path d={dE} fill="none" stroke="rgba(148,163,184,0.55)" strokeWidth={2} strokeDasharray="4 4" />
        <path d={dA} fill="none" stroke={mode === 'even' ? '#34d399' : '#fb923c'} strokeWidth={2.5} />
        <text x={X(-Math.PI)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>−π</text>
        <text x={X(0)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>0</text>
        <text x={X(Math.PI)} y={H - 12} textAnchor="middle" fill="#94a3b8" fontSize={11}>π</text>
      </svg>
      <div className="readout">
        {mode === 'even'
          ? 'Páros függvénynél f(x)·sin(nx) páratlan, ezért minden bₙ = 0! Feleannyi integrálást spórolsz!'
          : 'Páratlan függvénynél f(x)·cos(nx) páratlan, ezért a₀ = 0 és minden aₙ = 0!'}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. Frekvenciaspektrum összehasonlítása */
export function SpectrumComparisonWidget() {
  const freqs = [1, 3, 5, 7, 9, 11];
  const W = 540;
  const H = 185;
  const padL = 42;
  const padB = 34;

  return (
    <div className="widget">
      <div className="wtitle">Frekvenciaspektrum: miért cseng le gyorsabban a folytonos jel?</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot">
        <line x1={padL} y1={H - padB} x2={W - 20} y2={H - padB} className="ax" />
        {freqs.map((n, i) => {
          const cx = 82 + i * 76;
          const hSq = (1 / n) * 115;
          const hTri = (1 / (n * n)) * 115;
          return (
            <g key={n}>
              <rect x={cx - 18} y={H - padB - hSq} width={16} height={hSq} rx={4} fill="rgba(56, 189, 248, 0.45)" stroke="#38bdf8" strokeWidth={1.3} />
              <rect x={cx + 2} y={H - padB - hTri} width={16} height={hTri} rx={4} fill="rgba(52, 211, 153, 0.5)" stroke="#34d399" strokeWidth={1.3} />
              <text x={cx} y={H - 14} textAnchor="middle" fill="#94a3b8" fontSize={11}>n={n}</text>
            </g>
          );
        })}
        <text x={padL + 10} y={20} fill="#38bdf8" fontSize={11.5} fontWeight={700}>■ Négyszögjel (szakadásos): ~ 1/n</text>
        <text x={padL + 250} y={20} fill="#34d399" fontSize={11.5} fontWeight={700}>■ Háromszög (folytonos): ~ 1/n²</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. Általános 2L periódus diagram */
export function PeriodScalingDiagram() {
  return (
    <div className="widget">
      <div className="wtitle">Áttérés 2π periódusról tetszőleges 2L periódusra (x ∈ [−L, L])</div>
      <svg viewBox="0 0 540 132" className="plot">
        <rect x={14} y={16} width={230} height={100} rx={10} fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={129} y={38} textAnchor="middle" fill="#7dd3fc" fontSize={12} fontWeight={700}>Alapeset: [−π, π] (T = 2π)</text>
        <text x={129} y={64} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>cos(nx),  sin(nx)</text>
        <text x={129} y={88} textAnchor="middle" fill="#94a3b8" fontSize={11}>aₙ = (1/π) ∫ f(x) cos(nx) dx</text>

        <text x={265} y={70} textAnchor="middle" fill="#fbbf24" fontSize={18} fontWeight={700}>⇒</text>

        <rect x={286} y={16} width={240} height={100} rx={10} fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth={1.5} />
        <text x={406} y={38} textAnchor="middle" fill="#6ee7b7" fontSize={12} fontWeight={700}>Általános: [−L, L] (T = 2L)</text>
        <text x={406} y={64} textAnchor="middle" fill="#e2e8f0" fontSize={11.5}>cos(nπx/L),  sin(nπx/L)</text>
        <text x={406} y={88} textAnchor="middle" fill="#fbbf24" fontSize={11}>aₙ = (1/L) ∫ f(x) cos(nπx/L) dx</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ 8. Taylor vs. Fourier összehasonlítás */
export function TaylorVsFourierDiagram() {
  const rows = [
    { k: 'Bázisfüggvények', t: 'Hatványok: 1, (x−a), (x−a)²…', f: 'Rezgések: 1, cos(nx), sin(nx)' },
    { k: 'Együtthatók', t: 'Lokális deriváltak: f⁽ⁿ⁾(a)/n!', f: 'Globális integrálok: (1/π)∫ f·cos/sin' },
    { k: 'Sima függvény kell?', t: 'Igen (végtelen sokszor diff.)', f: 'Nem! Szakadásos jelekre is működik!' },
    { k: 'Érvényesség', t: 'Egy pont környezete (R sugár)', f: 'Az egész ℝ (periodikusan!)' },
  ];

  return (
    <div className="widget">
      <div className="wtitle">A 11. fejezet két óriása: Taylor-sor vs. Fourier-sor</div>
      <svg viewBox="0 0 540 190" className="plot">
        <text x={18} y={24} fill="#94a3b8" fontSize={11} fontWeight={700}>SZEMPONT</text>
        <text x={156} y={24} fill="#38bdf8" fontSize={11.5} fontWeight={700}>TAYLOR-SOR (11.8–11.10)</text>
        <text x={356} y={24} fill="#34d399" fontSize={11.5} fontWeight={700}>FOURIER-SOR (11.11)</text>
        {rows.map((r, i) => {
          const y = 34 + i * 37;
          return (
            <g key={r.k}>
              <rect x={12} y={y} width={516} height={31} rx={7} fill="rgba(255,255,255,0.04)" stroke="rgba(148,163,184,0.18)" />
              <text x={20} y={y + 20} fill="#fbbf24" fontSize={11} fontWeight={700}>{r.k}</text>
              <text x={156} y={y + 20} fill="#e2e8f0" fontSize={10.8}>{r.t}</text>
              <text x={356} y={y + 20} fill="#e2e8f0" fontSize={10.8}>{r.f}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
