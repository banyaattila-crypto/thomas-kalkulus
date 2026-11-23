import { useState } from 'react';
import { M } from './M';
import { Plane, PFunc, PPoint, PSeg } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 6) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: Grafikus Newton-lépések */

export function NewtonStepWidget() {
  const [x0, setX0] = useState(2.6);
  const [steps, setSteps] = useState(2);

  // f(x) = x² - 2 → gyök: √2 ≈ 1.41421356
  const f = (x: number) => x * x - 2;
  const df = (x: number) => 2 * x;

  const xs: number[] = [x0];
  for (let i = 0; i < 4; i++) {
    const cur = xs[xs.length - 1];
    const d = df(cur);
    if (Math.abs(d) < 1e-6) break;
    xs.push(cur - f(cur) / d);
  }
  const shown = xs.slice(0, steps + 1);
  const last = shown[shown.length - 1];

  return (
    <div className="widget">
      <div className="widget-title">A Newton-módszer geometriája: f(x) = x² − 2 (gyök: √2 ≈ 1,414214)</div>
      <label>
        kezdőtipp: x₀ = {round(x0, 2)}
        <input type="range" min={0.6} max={2.8} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <div className="relbuttons chips">
        {[0, 1, 2, 3, 4].map((n) => (
          <button key={n} className={steps === n ? 'on' : ''} onClick={() => setSteps(n)}>
            {n}. lépés (x_{n})
          </button>
        ))}
      </div>
      <Plane xmin={0} xmax={3.2} ymin={-2.5} ymax={6.2}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} cls="pl-main" />
            <PPoint map={m} x={Math.SQRT2} y={0} color="#34d399" label="√2" dx={-18} dy={18} />
            {shown.map((xn, i) => {
              const yn = f(xn);
              const next = shown[i + 1];
              return (
                <g key={i}>
                  <PSeg map={m} x1={xn} y1={0} x2={xn} y2={yn} cls="pl-dash2" />
                  {next !== undefined && <PSeg map={m} x1={xn} y1={yn} x2={next} y2={0} cls="pl-alt" />}
                  <PPoint map={m} x={xn} y={0} color={i === shown.length - 1 ? '#fbbf24' : '#94a3b8'} label={`x${i}`} dx={4} dy={-10} />
                </g>
              );
            })}
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`x_{${steps}} = ${tx(last, 7)}, \\qquad |x_{${steps}} - \\sqrt{2}| = ${tx(Math.abs(last - Math.SQRT2), 7)}`} />
        <p>
          Nézd meg a lépéseket: a szaggatott függőleges felvisz a görbére, a narancs érintő lecsúszik az <M t="x" />-tengelyre — és 3–4 lépésben 7 tizedesjegyig pontos!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Felező vs. Newton verseny */

export function ConvergenceRaceWidget() {
  const [n, setN] = useState(4);
  // √2 keresése:
  // Newton x0 = 2
  const nArr: number[] = [2];
  for (let i = 0; i < 6; i++) {
    const x = nArr[i];
    nArr.push(0.5 * (x + 2 / x));
  }
  // Felező [1, 2]
  let lo = 1;
  let hi = 2;
  const bArr: number[] = [1.5];
  for (let i = 0; i < 6; i++) {
    const mid = (lo + hi) / 2;
    if (mid * mid > 2) hi = mid;
    else lo = mid;
    bArr.push((lo + hi) / 2);
  }

  const nErr = Math.abs(nArr[n] - Math.SQRT2);
  const bErr = Math.abs(bArr[n] - Math.SQRT2);
  const nDigits = nErr < 1e-15 ? 15 : Math.max(0, Math.floor(-Math.log10(nErr)));
  const bDigits = bErr < 1e-15 ? 15 : Math.max(0, Math.floor(-Math.log10(bErr)));

  return (
    <div className="widget">
      <div className="widget-title">Sebességverseny (√2 keresése): Felező módszer vs. Newton-módszer</div>
      <label>
        lépések száma: n = {n}
        <input type="range" min={1} max={5} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <svg viewBox="0 0 540 112" className="plane" role="img" aria-label="Pontosság összehasonlítás">
        <rect width={540} height={112} className="pl-bg" />
        {/* Felező sáv */}
        <text x={20} y={32} fill="#fb923c" fontSize={12} fontWeight={700}>Felező módszer ({bDigits} pontos jegy)</text>
        <rect x={235} y={19} width={285} height={16} rx={8} fill="rgba(255,255,255,0.08)" />
        <rect x={235} y={19} width={Math.max(8, (bDigits / 15) * 285)} height={16} rx={8} fill="#fb923c" />
        {/* Newton sáv */}
        <text x={20} y={76} fill="#34d399" fontSize={12} fontWeight={700}>Newton-módszer ({nDigits} pontos jegy!)</text>
        <rect x={235} y={63} width={285} height={16} rx={8} fill="rgba(255,255,255,0.08)" />
        <rect x={235} y={63} width={Math.max(8, (nDigits / 15) * 285)} height={16} rx={8} fill="#34d399" />
        <text x={270} y={102} textAnchor="middle" fill="#94a3b8" fontSize={10.5}>
          Kvadratikus konvergencia: minden lépésben nagyjából MEGDUPLÁZÓDIK a pontos jegyek száma!
        </text>
      </svg>
      <div className="result">
        <p>
          <strong>{n}. lépés után:</strong> Felező: <M t={tx(bArr[n], 6)} /> | Newton: <M t={tx(nArr[n], 10)} /> (pontos <M t="\sqrt{2}\approx 1{,}4142135624" />).
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: cos x = x (Dottie-szám) */

export function CosEqualsXWidget() {
  const [n, setN] = useState(2);
  const xs: number[] = [1];
  for (let i = 0; i < 4; i++) {
    const x = xs[i];
    xs.push(x + (Math.cos(x) - x) / (Math.sin(x) + 1));
  }
  const cur = xs[n];

  return (
    <div className="widget">
      <div className="widget-title">Transzcendens egyenlet: cos x = x (Dottie-szám ≈ 0,739085)</div>
      <div className="relbuttons chips">
        {[0, 1, 2, 3, 4].map((k) => (
          <button key={k} className={n === k ? 'on' : ''} onClick={() => setN(k)}>
            x_{k} = {round(xs[k], 5)}
          </button>
        ))}
      </div>
      <Plane xmin={-0.3} xmax={1.8} ymin={-0.3} ymax={1.4}>
        {(m) => (
          <>
            <PFunc map={m} fn={(t) => Math.cos(t)} cls="pl-main" />
            <PFunc map={m} fn={(t) => t} cls="pl-alt" />
            <PPoint map={m} x={cur} y={Math.cos(cur)} color="#34d399" label={`x${n}`} dx={8} dy={-10} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`x_{${n}} = ${tx(cur, 7)}, \\qquad \\cos(x_{${n}}) - x_{${n}} = ${tx(Math.cos(cur) - cur, 7)}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Kudarc-laboratórium */

type FailId = 'div' | 'cycle' | 'slow';

export function NewtonFailWidget() {
  const [fid, setFid] = useState<FailId>('div');

  return (
    <div className="widget">
      <div className="widget-title">Kudarc-laboratórium: mikor csődöl be (vagy lassul le) a Newton-módszer?</div>
      <div className="relbuttons chips">
        <button className={fid === 'div' ? 'on' : ''} onClick={() => setFid('div')}>
          1. Elrohanás: ∛x
        </button>
        <button className={fid === 'cycle' ? 'on' : ''} onClick={() => setFid('cycle')}>
          2. 0 ↔ 1 ciklus: x³ − 2x + 2
        </button>
        <button className={fid === 'slow' ? 'on' : ''} onClick={() => setFid('slow')}>
          3. Lassú dupla gyök: x²
        </button>
      </div>
      <Plane xmin={-3} xmax={3} ymin={-2.5} ymax={3.2}>
        {(m) => (
          <>
            {fid === 'div' && (
              <>
                <PFunc map={m} fn={(x) => Math.cbrt(x)} cls="pl-main" />
                <PSeg map={m} x1={0.5} y1={Math.cbrt(0.5)} x2={-1} y2={0} cls="pl-alt" />
                <PSeg map={m} x1={-1} y1={-1} x2={2} y2={0} cls="pl-alt" />
                <PPoint map={m} x={0.5} y={0} color="#fbbf24" label="x0=0,5" dx={4} dy={14} />
                <PPoint map={m} x={-1} y={0} color="#fb923c" label="x1=−1" dx={-28} dy={-10} />
                <PPoint map={m} x={2} y={0} color="#f87171" label="x2=2" dx={6} dy={14} />
              </>
            )}
            {fid === 'cycle' && (
              <>
                <PFunc map={m} fn={(x) => x ** 3 - 2 * x + 2} cls="pl-main" />
                <PSeg map={m} x1={0} y1={2} x2={1} y2={0} cls="pl-alt" />
                <PSeg map={m} x1={1} y1={1} x2={0} y2={0} cls="pl-ok" />
                <PPoint map={m} x={0} y={0} color="#fbbf24" label="x0, x2…" dx={-42} dy={16} />
                <PPoint map={m} x={1} y={0} color="#f87171" label="x1, x3…" dx={6} dy={16} />
              </>
            )}
            {fid === 'slow' && (
              <>
                <PFunc map={m} fn={(x) => x * x} cls="pl-main" />
                <PSeg map={m} x1={2} y1={4} x2={1} y2={0} cls="pl-alt" />
                <PSeg map={m} x1={1} y1={1} x2={0.5} y2={0} cls="pl-alt" />
                <PPoint map={m} x={2} y={0} color="#fbbf24" label="2" dx={4} dy={15} />
                <PPoint map={m} x={1} y={0} color="#fb923c" label="1" dx={4} dy={15} />
                <PPoint map={m} x={0.5} y={0} color="#34d399" label="0,5" dx={-10} dy={-10} />
              </>
            )}
          </>
        )}
      </Plane>
      <div className="result">
        {fid === 'div' && (
          <p>
            <strong>Elrohanás (<M t="f(x)=\sqrt[3]{x}" />):</strong> <M t="x_{n+1} = -2x_n" /> — minden lépésben <strong>kétszer messzebb</strong> pattan a <M t="0" /> gyöktől (<M t="0{,}5 \to -1 \to 2 \to -4 \to \dots" />)!
          </p>
        )}
        {fid === 'cycle' && (
          <p>
            <strong>Végtelen ciklus (<M t="f(x)=x^3-2x+2" />, <M t="x_0=0" />):</strong> <M t="0 \to 1 \to 0 \to 1 \to \dots" /> örökké ugrál, miközben a valódi gyök <M t="-1{,}769" /> körül van! (Másik kezdőtippel, pl. <M t="x_0=-2" />, azonnal konvergál!)
          </p>
        )}
        {fid === 'slow' && (
          <p>
            <strong>Többszörös gyök (<M t="f(x)=x^2" />):</strong> itt <M t="f'(0)=0" />, ezért <M t="x_{n+1} = x_n / 2" /> — elveszíti a másodfokú sebességét, csak felez!
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Biztonságos Newton-recept */

export function NewtonChecklistDiagram() {
  const steps = [
    { n: '1. Alak', t: 'f(x) = 0', s: 'rendezz 0-ra!', c: '#38bdf8' },
    { n: '2. Kezdőtipp', t: 'Válassz jó x₀-t', s: 'Bolzano + f′≠0', c: '#34d399' },
    { n: '3. Képlet', t: 'xₙ₊₁ = xₙ − f/f′', s: 'egyszerűsítsd!', c: '#fb923c' },
    { n: '4. Iterálj', t: 'Számolj x₁, x₂…', s: 'amíg jegyek állnak', c: '#fbbf24' },
    { n: '5. Ellenőrizd', t: 'f(xₙ) ≈ 0?', s: 'radián szögnél!', c: '#fbbf24' },
  ];
  return (
    <div className="widget">
      <div className="widget-title">A biztonságos Newton-iteráció 5 lépése</div>
      <svg viewBox="0 0 540 92" className="plane" role="img" aria-label="Newton-módszer 5 lépése">
        <rect width={540} height={92} className="pl-bg" />
        {steps.map((st, i) => {
          const x = 10 + i * 105;
          return (
            <g key={st.n}>
              <rect x={x} y={12} width={98} height={68} rx={9} fill="rgba(255,255,255,0.04)" stroke={st.c} strokeWidth={1.4} />
              <text x={x + 49} y={31} textAnchor="middle" fill={st.c} fontSize={11} fontWeight={700}>{st.n}</text>
              <text x={x + 49} y={49} textAnchor="middle" fill="#e2e8f0" fontSize={10.5}>{st.t}</text>
              <text x={x + 49} y={66} textAnchor="middle" fill="#94a3b8" fontSize={9.5}>{st.s}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
