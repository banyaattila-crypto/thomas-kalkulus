import { useEffect, useRef } from 'react';
import { VERSION } from '../version';
import { TOC } from '../data/toc';
import { SECTIONS } from '../content';

type Props = { onToc: () => void; onStart: () => void; doneCount?: number };

const SYMBOLS: { t: string; x: number; y: number; s: number; d: number }[] = [
  { t: '∫', x: 7, y: 20, s: 74, d: 0 },
  { t: 'Σ', x: 86, y: 78, s: 58, d: 2 },
  { t: 'lim', x: 90, y: 56, s: 38, d: 4 },
  { t: 'dx', x: 6, y: 68, s: 42, d: 1 },
  { t: 'π', x: 72, y: 86, s: 54, d: 3 },
  { t: '∞', x: 20, y: 86, s: 58, d: 5 },
  { t: '∇f', x: 46, y: 8, s: 32, d: 2.5 },
  { t: '√', x: 16, y: 40, s: 48, d: 1.5 },
];

const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
const surf = (x: number, y: number) => {
  const r = Math.hypot(x, y);
  return r < 1e-3 ? 1 : Math.sin(r * 1.25) / (r * 1.25);
};

/**
 * Kombinált animált nyitóoldal (I–III. kötet egyszerre):
 * - I. kötet: hullámzó görbe, lélegző ε-sáv, mozgó érintő és élő f′(x₀) érték + narancs parabola-ív
 * - II. kötet: fokozatosan kirajzolódó Riemann-téglalapok (∫ f dx) és árnyékolt integrálterület
 * - III. kötet: forgó 3D hullámfelület (sin r / r) a rajta keringő ∇f gradiensvektorral
 * - Plusz a lebegő matematikai szimbólumok és a csillogó Kalkulus borító
 */
export function Cover({ onToc, onStart, doneCount = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalSecs = TOC.reduce((a, c) => a + c.sections.length, 0);
  const readySecs = Object.keys(SECTIONS).length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let time = 0;
    let last = performance.now();

    const draw = (tm: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(rect.width, 300);
      const h = Math.max(rect.height, 300);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const t = reduce ? 7 : tm;

      // Mélykék ragyogó háttér (a projekt eredeti palettája)
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.45, Math.max(w, h) * 0.7);
      bg.addColorStop(0, '#0f2c47');
      bg.addColorStop(0.55, '#081022');
      bg.addColorStop(1, '#060914');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Finom koordinátarács
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.065)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const midY = h * 0.54;
      const sx = w / 11;
      const sy = Math.min(h * 0.155, 125);
      const X = (x: number) => w * 0.5 + x * sx;
      const Y = (y: number) => midY - y * sy;

      // Főtengelyek
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.22)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.moveTo(w * 0.5, 0);
      ctx.lineTo(w * 0.5, h);
      ctx.stroke();

      const f = (x: number) => Math.sin(0.9 * x + 0.3 * t) + 0.35 * Math.cos(1.8 * x - 0.2 * t);
      const df = (x: number) => 0.9 * Math.cos(0.9 * x + 0.3 * t) - 0.63 * Math.sin(1.8 * x - 0.2 * t);
      const g = (x: number) => 0.095 * x * x - 1.95;

      const intro = reduce ? 1 : ease(t / 2.4);
      const x0 = reduce ? 1.1 : 0.6 + 1.7 * Math.sin(t * 0.38);
      const a = -4.2;

      // Másodlagos narancs parabola (eredeti borító öröksége)
      const xEndG = -5.6 + 11.2 * (reduce ? 1 : ease((t - 0.3) / 2.6));
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.35)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      let startedG = false;
      for (let px = 0; px <= w; px += 5) {
        const x = (px - w * 0.5) / sx;
        if (x > xEndG) break;
        const py = Y(g(x));
        if (!startedG) {
          ctx.moveTo(px, py);
          startedG = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      // II. kötet: Riemann-téglalapok + lágy területkitöltés a görbe alatt
      const barsK = reduce ? 1 : ease((t - 1.5) / 1.5);
      if (barsK > 0 && x0 > a + 0.5) {
        // Finom cián aláárnyékolás
        ctx.beginPath();
        ctx.moveTo(X(a), midY);
        for (let i = 0; i <= 60; i++) {
          const xv = a + ((x0 - a) * i) / 60;
          ctx.lineTo(X(xv), Y(f(xv) * barsK));
        }
        ctx.lineTo(X(x0), midY);
        ctx.closePath();
        const areaGrad = ctx.createLinearGradient(0, midY - sy * 1.5, 0, midY + sy);
        areaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
        areaGrad.addColorStop(1, 'rgba(56, 189, 248, 0.02)');
        ctx.fillStyle = areaGrad;
        ctx.fill();

        // 28 arany-borostyán Riemann-téglalap
        const N = 28;
        const dx = (x0 - a) / N;
        for (let i = 0; i < N; i++) {
          const xm = a + (i + 0.5) * dx;
          const y = f(xm) * barsK;
          const top = Y(Math.max(y, 0));
          const bot = Y(Math.min(y, 0));
          ctx.fillStyle = 'rgba(245, 158, 11, 0.11)';
          ctx.fillRect(X(a + i * dx), top, Math.max(1, dx * sx - 1), bot - top);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.28)';
          ctx.lineWidth = 1;
          ctx.strokeRect(X(a + i * dx), top, Math.max(1, dx * sx - 1), bot - top);
        }
      }

      // I. kötet: lélegző ε-sáv a mozgó pont körül
      const y0 = f(x0);
      const py0 = Y(y0);
      const eps = 32 + 9 * Math.sin(t * 0.8);
      if (intro > 0.55) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.05)';
        ctx.fillRect(0, py0 - eps, w, eps * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 6]);
        ctx.beginPath();
        ctx.moveTo(0, py0 - eps);
        ctx.lineTo(w, py0 - eps);
        ctx.moveTo(0, py0 + eps);
        ctx.lineTo(w, py0 + eps);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Fő cián görbe ragyogással
      const xEnd = -5.6 + 11.2 * intro;
      ctx.save();
      ctx.shadowColor = 'rgba(56, 189, 248, 0.55)';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.88)';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      let started = false;
      for (let px = 0; px <= w; px += 4) {
        const x = (px - w * 0.5) / sx;
        if (x > xEnd) break;
        const py = Y(f(x));
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
      ctx.restore();

      // Érintő, mozgó pont és élő f′(x₀) érték
      if (intro > 0.82) {
        const k = reduce ? 1 : ease((intro - 0.82) / 0.18);
        const m = df(x0);
        const L = 210 * k;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.88)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(X(x0) - L, py0 + (L / sx) * m * sy);
        ctx.lineTo(X(x0) + L, py0 - (L / sx) * m * sy);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(X(x0), py0, 13, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(X(x0), py0, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();

        ctx.font = '600 12px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillStyle = 'rgba(253, 230, 138, 0.9)';
        const mTxt = m.toFixed(2).replace('.', ',').replace('-', '−');
        ctx.fillText(`f′(x₀) = ${mTxt}`, X(x0) + 14, py0 - 14);
        if (barsK > 0.85 && x0 > a + 0.5) {
          ctx.fillStyle = 'rgba(251, 191, 36, 0.72)';
          ctx.fillText('∫ f(x) dx', X(a) + 8, midY + 20);
        }
      }

      // III. kötet: forgó 3D drótváz-felület és ∇f gradiensvektor a jobb felső sarokban
      const s3 = reduce ? 1 : ease((t - 1.2) / 2.0);
      if (s3 > 0) {
        const cx = w * 0.81;
        const cy = h * 0.27;
        const k = Math.min(w, h) * 0.031;
        const yaw = reduce ? 0.7 : 0.6 + t * 0.22;
        const pit = 1.0;
        const cyw = Math.cos(yaw);
        const syw = Math.sin(yaw);
        const P = (x: number, y: number, z: number): [number, number] => {
          const x1 = x * cyw - y * syw;
          const y1 = x * syw + y * cyw;
          return [cx + x1 * k, cy + (y1 * Math.sin(pit) - z * 3.2 * Math.cos(pit)) * k * 0.9];
        };
        const n = 15;
        const R = 4.2;
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(45, 212, 191, ${(0.38 * s3).toFixed(3)})`;
        for (let i = 0; i <= n; i++) {
          ctx.beginPath();
          for (let j = 0; j <= n; j++) {
            const xv = -R + (2 * R * i) / n;
            const yv = -R + (2 * R * j) / n;
            const p = P(xv, yv, surf(xv, yv) * s3);
            if (j) ctx.lineTo(p[0], p[1]);
            else ctx.moveTo(p[0], p[1]);
          }
          ctx.stroke();

          ctx.beginPath();
          for (let j = 0; j <= n; j++) {
            const xv = -R + (2 * R * j) / n;
            const yv = -R + (2 * R * i) / n;
            const p = P(xv, yv, surf(xv, yv) * s3);
            if (j) ctx.lineTo(p[0], p[1]);
            else ctx.moveTo(p[0], p[1]);
          }
          ctx.stroke();
        }

        // Gradiensvektor (∇f) a felületen keringő pontban — arany-cián színnel
        const ang = reduce ? 0.8 : t * 0.45;
        const rr = 2.4;
        const gx0 = rr * Math.cos(ang);
        const gy0 = rr * Math.sin(ang);
        const e = 1e-3;
        const gx = (surf(gx0 + e, gy0) - surf(gx0 - e, gy0)) / (2 * e);
        const gy = (surf(gx0, gy0 + e) - surf(gx0, gy0 - e)) / (2 * e);
        const p0 = P(gx0, gy0, surf(gx0, gy0));
        const p1 = P(gx0 + gx * 2.3, gy0 + gy * 2.3, surf(gx0, gy0));

        ctx.strokeStyle = `rgba(251, 191, 36, ${(0.92 * s3).toFixed(3)})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.lineTo(p1[0], p1[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p0[0], p0[1], 4.2, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();

        ctx.font = '600 12px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillStyle = `rgba(253, 230, 138, ${(0.88 * s3).toFixed(3)})`;
        ctx.fillText('∇f', p1[0] + 7, p1[1] - 6);
      }
    };

    const frame = (ts: number) => {
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      time += dt;
      draw(time);
      raf = requestAnimationFrame(frame);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduce && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onResize = () => {
      if (reduce) draw(0);
    };

    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(frame);
    }
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="cover">
      <canvas ref={canvasRef} className="cover-art" aria-hidden />
      <div className="cover-vignette" aria-hidden />

      {SYMBOLS.map((m) => (
        <span
          key={m.t}
          className="cv-sym"
          aria-hidden
          style={{ left: `${m.x}%`, top: `${m.y}%`, fontSize: m.s, animationDelay: `${-m.d * 2}s` }}
        >
          {m.t}
        </span>
      ))}

      <div className="cover-body">
        <div className="cover-kicker">Thomas-féle tematika nyomán · I–III. kötet</div>
        <h1 className="cover-title">Kalkulus</h1>
        <p className="cover-sub">
          Látványos, interaktív tananyag a határértéktől a vektoranalízisig. Saját magyarázatokkal, élő ábrákkal és
          lépcsőzetes gyakorlófeladatokkal.
        </p>
        <div className="cover-actions">
          <button className="btn-primary" onClick={onStart}>
            Kezdés
          </button>
          <button className="btn-ghost" onClick={onToc}>
            Tartalomjegyzék
          </button>
        </div>
        <div className="cover-meta">
          <span className="ver">v{VERSION}</span>
          <span>
            {readySecs} / {totalSecs} szakasz kész · 3 kötet · 16 fejezet
            {doneCount > 0 ? ` · ${doneCount} elvégezve` : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
