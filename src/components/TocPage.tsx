import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { TOC, VOLUME_TITLES } from '../data/toc';
import { SECTIONS } from '../content';

type Props = { go: (section: string, page?: number) => void; done?: Set<string> };

export const SUB: Record<number, string> = {
  1: 'Függvények, határérték, derivált',
  2: 'Integrálás és sorok alapjai',
  3: 'Több változó és vektoranalízis',
};

/** Kötetek színezete: [kezdő, vég]. Nincs rózsaszín és lila. */
export const VOL_COLORS: Record<number, [string, string]> = {
  1: ['#38bdf8', '#60a5fa'],
  2: ['#2dd4bf', '#4ade80'],
  3: ['#fbbf24', '#fb923c'],
};

/** Fejezetszínek (1–16). */
export const CH_COLORS = [
  '#38bdf8', '#22d3ee', '#60a5fa', '#7dd3fc',
  '#2dd4bf', '#34d399', '#4ade80', '#a3e635', '#86efac',
  '#fbbf24', '#fb923c', '#f59e0b', '#fcd34d', '#fdba74', '#fde047', '#f97316',
];

/* ------------------------------------------------------------------ fejezet-emblémák (apró SVG-rajzok) */

const L = ({ d, cls = 'em-l' }: { d: string; cls?: string }) => <path d={d} className={cls} pathLength={1} />;
const Dot = ({ x, y, r = 3 }: { x: number; y: number; r?: number }) => <circle cx={x} cy={y} r={r} className="em-dot" />;

const poly = (pts: [number, number][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

function emblem(n: number): ReactNode {
  switch (n) {
    case 1:
      return (
        <>
          <L d="M10,62 L112,62 M22,6 L22,66" cls="em-f" />
          <L d="M26,8 Q62,104 98,8" />
          <Dot x={62} y={33} />
        </>
      );
    case 2:
      return (
        <>
          <L d="M10,62 L112,62 M22,6 L22,66" cls="em-f" />
          <L d="M14,54 C32,52 44,40 58,31" />
          <L d="M70,26 C84,18 96,14 110,12" />
          <circle cx={64} cy={28.5} r={4} className="em-ring" />
        </>
      );
    case 3:
      return (
        <>
          <L d="M12,56 Q58,-10 108,50" />
          <L d="M22,24 L98,19" cls="em-a" />
          <Dot x={59} y={21.5} />
        </>
      );
    case 4:
      return (
        <>
          <L d="M8,36 C24,-4 40,-4 56,36 S88,76 112,36" />
          <circle cx={32} cy={6} r={4} className="em-ring" />
          <circle cx={81} cy={66} r={4} className="em-ring" />
        </>
      );
    case 5:
      return (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={14 + i * 12} y={26 + i * 3.6} width={11} height={62 - 26 - i * 3.6} className="em-bar" style={{ animationDelay: `${i * 70}ms` }} />
          ))}
          <L d="M12,24 C40,12 74,24 108,50" />
        </>
      );
    case 6:
      return (
        <>
          <L d="M20,22 C45,8 74,34 100,24 M20,50 C45,64 74,38 100,48" />
          <ellipse cx={20} cy={36} rx={6} ry={14} className="em-f2" />
          <ellipse cx={100} cy={36} rx={6} ry={12} className="em-f2" />
          <L d="M8,36 L112,36" cls="em-f" />
        </>
      );
    case 7:
      return (
        <>
          <L d="M12,62 L108,10" cls="em-f" />
          <L d="M12,62 C54,60 82,44 104,8" />
          <L d="M18,62 C22,30 40,22 108,16" cls="em-a" />
        </>
      );
    case 8:
      return (
        <>
          <L d="M74,8 C62,4 60,14 58,30 L54,48 C52,62 46,66 40,60" />
          <L d="M82,36 L108,36 M90,28 L90,44" cls="em-f" />
        </>
      );
    case 9:
      return (
        <>
          <path d="M14,12 C30,40 50,54 108,58 L108,64 L14,64 Z" className="em-fill" />
          <L d="M14,12 C30,40 50,54 108,58" />
          <L d="M96,38 L112,38 M107,33 L112,38 L107,43" cls="em-a" />
        </>
      );
    case 10: {
      const sp: [number, number][] = [];
      for (let i = 0; i <= 80; i++) {
        const t = (i / 80) * 4 * Math.PI;
        sp.push([86 + 3.1 * t * Math.cos(t) * 0.8, 36 + 3.1 * t * Math.sin(t) * 0.8]);
      }
      return (
        <>
          <ellipse cx={34} cy={36} rx={26} ry={16} className="em-ring2" />
          <L d={poly(sp)} cls="em-a" />
          <Dot x={34} y={36} r={2.5} />
        </>
      );
    }
    case 11: {
      const pts: [number, number][] = [];
      for (let i = 0; i < 11; i++) pts.push([12 + i * 9.6, 36 + 26 * Math.pow(-0.62, i)]);
      return (
        <>
          <L d="M8,36 L112,36" cls="em-f" />
          <L d={poly(pts)} cls="em-a" />
          {pts.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={2.6} className="em-dot" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </>
      );
    }
    case 12:
      return (
        <>
          <L d="M50,42 L50,6 M50,42 L102,62 M50,42 L8,62" cls="em-f" />
          <L d="M50,42 L88,20" />
          <L d="M80,19 L90,19 L87,28" />
          <L d="M88,20 L88,50 L50,42 M88,50 L102,62" cls="em-a" />
        </>
      );
    case 13: {
      const h: [number, number][] = [];
      for (let i = 0; i <= 120; i++) {
        const t = (i / 120) * 14;
        h.push([14 + 6.2 * t + 9 * Math.cos(t), 36 + 22 * Math.sin(t)]);
      }
      return <L d={poly(h)} />;
    }
    case 14: {
      const lines: string[] = [];
      const P = (u: number, v: number): [number, number] => {
        const z = 0.5 * (u * u - v * v);
        return [60 + 26 * (u - v) * 0.9, 38 + 11 * (u + v) - 18 * z];
      };
      for (let k = -2; k <= 2; k++) {
        const a: [number, number][] = [];
        const b: [number, number][] = [];
        for (let i = 0; i <= 20; i++) {
          const t = -1 + (i / 20) * 2;
          a.push(P(k / 2, t));
          b.push(P(t, k / 2));
        }
        lines.push(poly(a), poly(b));
      }
      return (
        <>
          {lines.map((d, i) => (
            <L key={i} d={d} cls={i % 2 ? 'em-a' : 'em-l'} />
          ))}
        </>
      );
    }
    case 15:
      return (
        <>
          <L d="M42,10 L98,10 L98,46 L42,46 Z M22,26 L78,26 L78,62 L22,62 Z M22,26 L42,10 M78,26 L98,10 M78,62 L98,46 M22,62 L42,46" />
          <L d="M36.7,26 L36.7,62 M50,26 L50,62 M64,26 L64,62 M22,38 L78,38 M22,50 L78,50" cls="em-f" />
        </>
      );
    case 16: {
      const arr: ReactNode[] = [];
      let k = 0;
      for (let gx = 0; gx < 5; gx++) {
        for (let gy = 0; gy < 3; gy++) {
          const x = 18 + gx * 21;
          const y = 14 + gy * 22;
          const vx = y - 36;
          const vy = -(x - 60);
          const a = Math.atan2(vy, vx);
          const len = 9;
          const x2 = x + Math.cos(a) * len;
          const y2 = y + Math.sin(a) * len;
          const hx1 = x2 - Math.cos(a - 0.5) * 4;
          const hy1 = y2 - Math.sin(a - 0.5) * 4;
          const hx2 = x2 - Math.cos(a + 0.5) * 4;
          const hy2 = y2 - Math.sin(a + 0.5) * 4;
          arr.push(<L key={k++} d={`M${x - Math.cos(a) * 5},${y - Math.sin(a) * 5} L${x2},${y2} M${hx1},${hy1} L${x2},${y2} L${hx2},${hy2}`} />);
        }
      }
      return <>{arr}</>;
    }
    default:
      return <L d="M10,50 Q60,-10 110,50" />;
  }
}

/* ------------------------------------------------------------------ hero animáció: élő kalkulus-panoráma (Canvas 2D) */

type Particle = { x: number; y: number; life: number; maxLife: number; hue: 'cyan' | 'teal' | 'amber' };

function HeroCanvas({ mouseXRef }: { mouseXRef: React.MutableRefObject<number | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let time = 0;
    let last = performance.now();
    let smoothX = 0.6;

    // Áramló vektormező-részecskék
    const particles: Particle[] = Array.from({ length: 42 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      life: Math.random() * 5,
      maxLife: 3.5 + Math.random() * 3.5,
      hue: i % 5 === 0 ? 'amber' : i % 2 === 0 ? 'cyan' : 'teal',
    }));

    const draw = (tm: number, dt: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(rect.width, 320);
      const h = Math.max(rect.height, 180);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const t = reduce ? 4.2 : tm;

      // 1. Mély háttér + lassan lélegző aurora fényfoltok (cián, teal, arany)
      ctx.clearRect(0, 0, w, h);
      const g1 = ctx.createRadialGradient(
        w * (0.22 + 0.06 * Math.sin(t * 0.25)),
        h * (0.35 + 0.12 * Math.cos(t * 0.3)),
        10,
        w * 0.22,
        h * 0.35,
        w * 0.45
      );
      g1.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
      g1.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(
        w * (0.78 + 0.05 * Math.cos(t * 0.22)),
        h * (0.62 + 0.1 * Math.sin(t * 0.28)),
        10,
        w * 0.78,
        h * 0.62,
        w * 0.42
      );
      g2.addColorStop(0, 'rgba(251, 191, 36, 0.16)');
      g2.addColorStop(0.55, 'rgba(45, 212, 191, 0.09)');
      g2.addColorStop(1, 'rgba(45, 212, 191, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // 2. Finom koordinátarács
      ctx.strokeStyle = 'rgba(148, 197, 255, 0.065)';
      ctx.lineWidth = 1;
      const step = 36;
      for (let x = step; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = step; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 3. Áramló vektormező-részecskék (III. kötet hangulat)
      for (const p of particles) {
        if (!reduce) {
          p.life += dt;
          const vx = 0.045 + 0.025 * Math.cos(p.y * 6.2 + t * 0.6);
          const vy = 0.032 * Math.sin(p.x * 8.0 - t * 0.7);
          p.x += vx * dt;
          p.y += vy * dt;
          if (p.x > 1.05 || p.y < -0.05 || p.y > 1.05 || p.life > p.maxLife) {
            p.x = -0.02 + Math.random() * 0.4;
            p.y = 0.08 + Math.random() * 0.84;
            p.life = 0;
          }
        }
        const fade = Math.sin(Math.min(1, p.life / p.maxLife) * Math.PI);
        const alpha = (0.15 + 0.42 * fade).toFixed(3);
        const px = p.x * w;
        const py = p.y * h;
        const color =
          p.hue === 'amber'
            ? `rgba(251, 191, 36, ${alpha})`
            : p.hue === 'teal'
              ? `rgba(45, 212, 191, ${alpha})`
              : `rgba(56, 189, 248, ${alpha})`;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(px - 10, py - Math.sin(p.x * 8 - t * 0.7) * 3.5);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Forgó 3D Lissajous-szalag a jobb oldalon (finom háttérelem)
      const cx3 = w * 0.84;
      const cy3 = h * 0.5;
      const r3 = Math.min(w * 0.13, h * 0.44);
      const yaw = t * 0.35;
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      ctx.save();
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.2)';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      const N3 = 140;
      for (let i = 0; i <= N3; i++) {
        const u = (i / N3) * Math.PI * 2;
        const x3 = Math.sin(3 * u + t * 0.25);
        const y3 = Math.cos(2 * u);
        const z3 = Math.sin(5 * u - t * 0.18) * 0.55;
        const xr = x3 * cyw - z3 * syw;
        const sx3 = cx3 + xr * r3;
        const sy3 = cy3 + y3 * r3 * 0.72;
        if (i === 0) ctx.moveTo(sx3, sy3);
        else ctx.lineTo(sx3, sy3);
      }
      ctx.stroke();
      ctx.restore();

      // 5. Fő kalkulus-görbe koordináta-rendszere
      const midY = h * 0.56;
      const xMin = -5.6;
      const xMax = 5.6;
      const sx = w / (xMax - xMin);
      const sy = h * 0.24;
      const X = (x: number) => (x - xMin) * sx;
      const Y = (y: number) => midY - y * sy;

      // x-tengely
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      const f = (x: number) => Math.sin(0.85 * x + 0.35 * t) + 0.36 * Math.cos(1.75 * x - 0.25 * t);
      const df = (x: number) => 0.85 * Math.cos(0.85 * x + 0.35 * t) - 0.36 * 1.75 * Math.sin(1.75 * x - 0.25 * t);
      const ddf = (x: number) => -0.85 * 0.85 * Math.sin(0.85 * x + 0.35 * t) - 0.36 * 1.75 * 1.75 * Math.cos(1.75 * x - 0.25 * t);

      // Mozgó x₀ pont: egérkövetés (ha a hero fölött van) vagy lágy önálló siklás
      const autoX = -3.8 + ((Math.sin(t * 0.42) + 1) / 2) * 7.6;
      const targetX = mouseXRef.current !== null ? xMin + mouseXRef.current * (xMax - xMin) : autoX;
      smoothX = reduce ? 0.8 : smoothX + (targetX - smoothX) * Math.min(1, dt * 6);
      const x0 = Math.max(-4.9, Math.min(4.9, smoothX));
      const y0 = f(x0);
      const m0 = df(x0);
      const dd0 = ddf(x0);

      // 6. Integrál-téglalapok (Riemann-összeg) -5-től x₀-ig + lágy területkitöltés
      const a = -5.0;
      if (x0 > a + 0.35) {
        ctx.beginPath();
        ctx.moveTo(X(a), midY);
        const stepsArea = 70;
        for (let i = 0; i <= stepsArea; i++) {
          const xv = a + ((x0 - a) * i) / stepsArea;
          ctx.lineTo(X(xv), Y(f(xv)));
        }
        ctx.lineTo(X(x0), midY);
        ctx.closePath();
        const areaGrad = ctx.createLinearGradient(0, midY - sy * 1.4, 0, midY + sy);
        areaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        areaGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.1)');
        areaGrad.addColorStop(1, 'rgba(56, 189, 248, 0.02)');
        ctx.fillStyle = areaGrad;
        ctx.fill();

        const bars = 26;
        const dx = (x0 - a) / bars;
        for (let i = 0; i < bars; i++) {
          const xm = a + (i + 0.5) * dx;
          const yv = f(xm);
          const top = Y(Math.max(yv, 0));
          const bot = Y(Math.min(yv, 0));
          const bw = Math.max(1.5, dx * sx - 1.5);
          ctx.fillStyle = 'rgba(251, 191, 36, 0.085)';
          ctx.fillRect(X(a + i * dx), top, bw, bot - top);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.24)';
          ctx.lineWidth = 0.9;
          ctx.strokeRect(X(a + i * dx), top, bw, bot - top);
        }
      }

      // 7. Szaggatott deriváltgörbe f′(x) (halvány smaragd szellemvonal)
      ctx.save();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.32)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 6]);
      ctx.beginPath();
      for (let px = 0; px <= w; px += 4) {
        const xv = xMin + (px / w) * (xMax - xMin);
        const py = Y(df(xv) * 0.72);
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      // 8. Fő ragyogó f(x) görbe (cián–teal–arany gradienssel és glow-val)
      const curveGrad = ctx.createLinearGradient(0, 0, w, 0);
      curveGrad.addColorStop(0, '#38bdf8');
      curveGrad.addColorStop(0.55, '#2dd4bf');
      curveGrad.addColorStop(1, '#fbbf24');
      ctx.save();
      ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = curveGrad;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      for (let px = 0; px <= w; px += 3) {
        const xv = xMin + (px / w) * (xMax - xMin);
        const py = Y(f(xv));
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      // 9. Lokális simulókör (görbületi kör) az x₀ pontban!
      const px0 = X(x0);
      const py0 = Y(y0);
      // Képernyő-koordinátás deriváltak a pontos kör-illeszkedéshez
      const sp = (-m0 * sy) / sx;
      const spp = (-dd0 * sy) / (sx * sx);
      if (Math.abs(spp) > 1e-4) {
        const denom = Math.pow(1 + sp * sp, 1.5);
        const Rpx = Math.abs(denom / spp);
        if (Rpx < 220 && Rpx > 12) {
          const factor = (1 + sp * sp) / spp;
          const cx = px0 - sp * factor;
          const cy = py0 + factor;
          ctx.save();
          ctx.strokeStyle = 'rgba(45, 212, 191, 0.38)';
          ctx.lineWidth = 1.4;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(cx, cy, Rpx, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          // Görbületi sugár (normálvektor) a középpontba
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(px0, py0);
          ctx.lineTo(cx, cy);
          ctx.stroke();
          ctx.fillStyle = 'rgba(52, 211, 153, 0.75)';
          ctx.beginPath();
          ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 10. Vetítővonal az x-tengelyre
      ctx.save();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.32)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(px0, midY);
      ctx.lineTo(px0, py0);
      ctx.stroke();
      ctx.restore();

      // 11. Ragyogó érintőegyenes és mozgó pont
      const L = 125;
      const norm = Math.hypot(1, sp);
      const tx = (1 / norm) * L;
      const ty = (sp / norm) * L;
      ctx.save();
      ctx.shadowColor = 'rgba(251, 146, 60, 0.7)';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(px0 - tx, py0 - ty);
      ctx.lineTo(px0 + tx, py0 + ty);
      ctx.stroke();
      ctx.restore();

      // Pulzáló dupla glória
      const pulse = 10 + 4 * Math.sin(t * 3.2);
      ctx.beginPath();
      ctx.arc(px0, py0, pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px0, py0, 5.2, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      // Élő f′(x₀) felirat a pont mellett
      ctx.font = '600 11px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillStyle = 'rgba(253, 230, 138, 0.85)';
      const mTxt = m0.toFixed(2).replace('.', ',').replace('-', '−');
      const labelX = px0 > w - 130 ? px0 - 98 : px0 + 12;
      const labelY = py0 < 28 ? py0 + 20 : py0 - 12;
      ctx.fillText(`f′(x₀) = ${mTxt}`, labelX, labelY);
    };

    const frame = (ts: number) => {
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      time += dt;
      draw(time, dt);
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
      if (reduce) draw(0, 0);
    };

    if (reduce) {
      draw(0, 0);
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
  }, [mouseXRef]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden />;
}

/* ------------------------------------------------------------------ fő oldal */

function Ring({ value, size = 120, stroke = 10 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="ring">
      <defs>
        <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} className="ring-bg" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        className="ring-fg"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        stroke="url(#ringg)"
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="ring-t">
        {Math.round(value * 100)}%
      </text>
    </svg>
  );
}

/** Élő, kötetenként tagolt tartalomjegyzék: haladásjelzés, fejezet-emblémák, időtengelyes szakaszlista. */
export function TocPage({ go, done: completed = new Set() }: Props) {
  const [onlyReady, setOnlyReady] = useState(false);
  const mouseXRef = useRef<number | null>(null);
  const all = TOC.flatMap((c) => c.sections);
  const ready = all.filter((s) => SECTIONS[s.id]);
  const pagesTotal = ready.reduce((a, s) => a + SECTIONS[s.id].pages, 0);
  const chStarted = TOC.filter((c) => c.sections.some((s) => SECTIONS[s.id])).length;
  const last = ready[ready.length - 1];
  let idx = 0;
  return (
    <div className="toc-page">
      <header
        className="toc-hero"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mouseXRef.current = (e.clientX - r.left) / Math.max(r.width, 1);
        }}
        onMouseLeave={() => {
          mouseXRef.current = null;
        }}
      >
        <HeroCanvas mouseXRef={mouseXRef} />
        <div className="hero-scrim" aria-hidden />
        <div className="hero-body">
          <div className="hero-text">
            <div className="hero-kicker">Thomas-féle Kalkulus · I–III. kötet</div>
            <h1 className="hero-title">Tartalomjegyzék</h1>
            <p className="hero-lead">
              Három kötet, tizenhat fejezet, egy út a függvényektől a vektormezőkig. Minden szakasz önálló, interaktív ábrákkal és megoldott feladatokkal.
            </p>
            <div className="hero-actions">
              {last && (
                <button className="cta" onClick={() => go(last.id)}>
                  Folytatás: {last.id} {last.title}
                  <span aria-hidden> →</span>
                </button>
              )}
              <button className="cta ghost" onClick={() => go('1.1')}>
                Kezdés az elejétől
              </button>
            </div>
          </div>
          <div className="hero-stats">
            <Ring value={ready.length / all.length} />
            <ul className="stats">
              <li>
                <b>{ready.length}</b>
                <span>kész szakasz / {all.length}</span>
              </li>
              <li>
                <b>{pagesTotal}</b>
                <span>oldal</span>
              </li>
              <li>
                <b>{chStarted}</b>
                <span>megkezdett fejezet / {TOC.length}</span>
              </li>
              {completed.size > 0 && (
                <li>
                  <b>{completed.size}</b>
                  <span>elvégezve / {ready.length}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>

      <div className="toc-filter">
        <button className={!onlyReady ? 'on' : ''} onClick={() => setOnlyReady(false)}>
          Minden szakasz
        </button>
        <button className={onlyReady ? 'on' : ''} onClick={() => setOnlyReady(true)}>
          Csak a kész szakaszok
        </button>
      </div>

      {[1, 2, 3].map((v) => {
        const chs = TOC.filter((c) => c.volume === v);
        const secs = chs.flatMap((c) => c.sections);
        const d = secs.filter((s) => SECTIONS[s.id]).length;
        const [c1, c2] = VOL_COLORS[v];
        const style = { '--va': c1, '--vb': c2 } as CSSProperties;
        return (
          <section key={v} className="toc-vol" style={style}>
            <div className="toc-vol-head">
              <div className="toc-vol-n">{'I'.repeat(v)}</div>
              <div className="toc-vol-txt">
                <h2>{VOLUME_TITLES[v]}</h2>
                <div className="toc-vol-sub">{SUB[v]}</div>
              </div>
              <div className="toc-vol-prog">
                <div className="vbar">
                  <i style={{ width: `${(d / secs.length) * 100}%` }} />
                </div>
                <span>
                  {d} / {secs.length} szakasz
                </span>
              </div>
            </div>
            <div className="toc-grid">
              {chs.map((ch) => {
                const done = ch.sections.filter((s) => SECTIONS[s.id]).length;
                const shown = onlyReady ? ch.sections.filter((s) => SECTIONS[s.id]) : ch.sections;
                if (onlyReady && done === 0) return null;
                const cs = { '--c': CH_COLORS[(ch.n - 1) % CH_COLORS.length], '--i': idx++ } as CSSProperties;
                return (
                  <div key={ch.n} className={`toc-ch ${done ? 'started' : 'idle'}`} style={cs}>
                    <div className="toc-ch-top">
                      <svg className="emblem" viewBox="0 0 120 72" aria-hidden>
                        {emblem(ch.n)}
                      </svg>
                      <span className="toc-ch-n">{ch.n}</span>
                    </div>
                    <div className="toc-ch-t">{ch.title}</div>
                    <div className="pips" title={`${done} / ${ch.sections.length} szakasz kész`}>
                      {ch.sections.map((s) => (
                        <i key={s.id} className={SECTIONS[s.id] ? 'on' : ''} />
                      ))}
                      <span>
                        {done}/{ch.sections.length}
                      </span>
                    </div>
                    <ol className="tl">
                      {shown.map((s) => {
                        const rdy = Boolean(SECTIONS[s.id]);
                        return (
                          <li key={s.id} className={rdy ? 'ready' : 'soon'}>
                            <button disabled={!rdy} onClick={() => go(s.id)}>
                              <span className="node" />
                              <span className="id">{s.id}</span>
                              <span className="t">{s.title}</span>
                              {completed.has(s.id) && (
                                <span className="done-check" title="Elvégezve" aria-label="Elvégezve">
                                  ✓
                                </span>
                              )}
                              {rdy ? <span className="pg">{SECTIONS[s.id].pages} old.</span> : <span className="pg soon-t">hamarosan</span>}
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
