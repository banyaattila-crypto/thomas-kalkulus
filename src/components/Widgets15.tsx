import { useState } from 'react';
import { Plane, PFunc } from './Plane';
import type { PMap } from './Plane';
import { M, tex } from './M';
import { round } from './fmt';
import {
  BASE,
  PAIRS,
  SC,
  SC1,
  TBASES,
  argTex,
  inDom,
  intersect,
  ivTex,
  outerTex,
  removePoints,
} from './ops15';
import type { Iv } from './ops15';

const fin = (v: number) => (Number.isFinite(v) ? v : NaN);
const sgn = (n: number) => String(n).replace('.', ',').replace('-', '−');

/** Az értelmezési tartomány kiemelése az x-tengely mentén. */
function DomainBar({ map, dom }: { map: PMap; dom: Iv[] }) {
  return (
    <g>
      {dom.map((v, i) => {
        const a = Math.max(v.a, map.xmin);
        const b = Math.min(v.b, map.xmax);
        if (a > b) return null;
        const y = map.Y(0);
        return <line key={i} x1={map.X(a)} y1={y} x2={map.X(b)} y2={y} stroke="#f59e0b" strokeWidth={7} strokeOpacity={0.55} strokeLinecap="butt" />;
      })}
    </g>
  );
}

/* ------------------------------------------------------------------ 1. oldal */

type Op = '+' | '-' | '*' | '/';
const OPS: { id: Op; label: string }[] = [
  { id: '+', label: 'f + g' },
  { id: '-', label: 'f − g' },
  { id: '*', label: 'f · g' },
  { id: '/', label: 'f / g' },
];

/** Két függvény összege, különbsége, szorzata, hányadosa: az eredmény képlete, grafikonja és értelmezési tartománya. */
export function ArithWidget() {
  const [fi, setFi] = useState(0);
  const [gi, setGi] = useState(1);
  const [op, setOp] = useState<Op>('+');
  const [x0, setX0] = useState(1);
  const F = BASE[fi];
  const G = BASE[gi];
  let dom = intersect(F.dom, G.dom);
  if (op === '/') dom = removePoints(dom, G.zeros);
  const calc = (x: number) => {
    const a = F.f(x);
    const b = G.f(x);
    return op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : a / b;
  };
  const res = (x: number) => (inDom(dom, x) ? fin(calc(x)) : NaN);
  const P = (s: string) => `\\left(${s}\\right)`;
  const formula =
    op === '+' ? `${F.tex}+${G.tex}` : op === '-' ? `${F.tex}-${P(G.tex)}` : op === '*' ? `${P(F.tex)}${P(G.tex)}` : `\\dfrac{${F.tex}}{${G.tex}}`;
  const inF = inDom(F.dom, x0);
  const inG = inDom(G.dom, x0);
  const val = res(x0);
  let probe: string;
  if (!inF) probe = `Az x = ${sgn(x0)} nincs benne f értelmezési tartományában, ezért az eredményfüggvény itt nincs értelmezve.`;
  else if (!inG) probe = `Az x = ${sgn(x0)} nincs benne g értelmezési tartományában, ezért az eredményfüggvény itt nincs értelmezve.`;
  else if (op === '/' && G.f(x0) === 0) probe = `Itt g(x) = 0, a hányados nevezője nulla: az eredményfüggvény nincs értelmezve.`;
  else probe = `f(${sgn(x0)}) = ${round(F.f(x0), 3)}, g(${sgn(x0)}) = ${round(G.f(x0), 3)}, az eredmény: ${round(val, 3)}.`;
  return (
    <div className="widget">
      <div className="widget-title">Műveletek függvényekkel</div>
      <div className="row">
        <div>
          <div className="mini">f</div>
          <div className="relbuttons chips">
            {BASE.map((b, k) => (
              <button key={b.id} className={fi === k ? 'on' : ''} onClick={() => setFi(k)}>
                <M t={b.tex} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mini">g</div>
          <div className="relbuttons chips">
            {BASE.map((b, k) => (
              <button key={b.id} className={gi === k ? 'on' : ''} onClick={() => setGi(k)}>
                <M t={b.tex} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="relbuttons chips">
        {OPS.map((o) => (
          <button key={o.id} className={op === o.id ? 'on' : ''} onClick={() => setOp(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <label>
        x = {sgn(x0)}
        <input type="range" min={-6} max={6} step={0.5} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <Plane xmin={-6} xmax={6} ymin={-6} ymax={6}>
        {(m) => (
          <>
            <DomainBar map={m} dom={dom} />
            <PFunc map={m} fn={(x) => (inDom(F.dom, x) ? fin(F.f(x)) : NaN)} cls="pl-alt" />
            <PFunc map={m} fn={(x) => (inDom(G.dom, x) ? fin(G.f(x)) : NaN)} cls="pl-ok" />
            <PFunc map={m} fn={res} />
            {Number.isFinite(val) && <circle cx={m.X(x0)} cy={m.Y(val)} r={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />}
          </>
        )}
      </Plane>
      <div className="legend">
        <span style={{ color: '#fb923c' }}>f</span> · <span style={{ color: '#34d399' }}>g</span> · <span style={{ color: '#38bdf8' }}>eredmény</span> · a sárga sáv az eredmény értelmezési tartománya
      </div>
      <div className="result">
        <M block t={`${OPS.find((o) => o.id === op)!.label.replace('−', '-').replace('·', '\\cdot')}\\ :\\ ${formula}`} />
        <M block t={`D=${ivTex(dom)}`} />
      </div>
      <div className="explain">
        <p>{probe}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal */

/** Összetett függvény: mindkét sorrend képlete, tartománya, grafikonja és a számolás lépései. */
export function CompositeWidget() {
  const [pi, setPi] = useState(0);
  const [x0, setX0] = useState(2);
  const P = PAIRS[pi];
  const fog = (x: number) => fin(P.f(P.g(x)));
  const gof = (x: number) => fin(P.g(P.f(x)));
  const gx = fin(P.g(x0));
  const fx = fin(P.f(x0));
  const stepA = Number.isNaN(gx) ? `g(${sgn(x0)}) nincs értelmezve` : `g(${sgn(x0)}) = ${round(gx, 3)} → f(${round(gx, 3)}) ${Number.isFinite(fin(P.f(gx))) ? '= ' + round(P.f(gx), 3) : 'nincs értelmezve'}`;
  const stepB = Number.isNaN(fx) ? `f(${sgn(x0)}) nincs értelmezve` : `f(${sgn(x0)}) = ${round(fx, 3)} → g(${round(fx, 3)}) ${Number.isFinite(fin(P.g(fx))) ? '= ' + round(P.g(fx), 3) : 'nincs értelmezve'}`;
  return (
    <div className="widget">
      <div className="widget-title">Összetett függvény: mindkét sorrend</div>
      <div className="relbuttons chips">
        {PAIRS.map((p, k) => (
          <button key={p.label} className={pi === k ? 'on' : ''} onClick={() => setPi(k)}>
            {p.label}
          </button>
        ))}
      </div>
      <label>
        x = {sgn(x0)}
        <input type="range" min={-5} max={5} step={0.5} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <Plane xmin={-6} xmax={6} ymin={-6} ymax={6}>
        {(m) => (
          <>
            <PFunc map={m} fn={fog} />
            <PFunc map={m} fn={gof} cls="pl-alt" />
            {Number.isFinite(fog(x0)) && <circle cx={m.X(x0)} cy={m.Y(fog(x0))} r={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />}
            {Number.isFinite(gof(x0)) && <circle cx={m.X(x0)} cy={m.Y(gof(x0))} r={6} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />}
          </>
        )}
      </Plane>
      <div className="legend">
        <span style={{ color: '#38bdf8' }}>f∘g</span> · <span style={{ color: '#fb923c' }}>g∘f</span>
      </div>
      <div className="result">
        <M block t={`(f\\circ g)(x)=${P.fogTex},\\qquad D=${ivTex(P.fogDom)}`} />
        <M block t={`(g\\circ f)(x)=${P.gofTex},\\qquad D=${ivTex(P.gofDom)}`} />
      </div>
      <div className="explain">
        <p>
          f∘g az x = {sgn(x0)} helyen: {stepA}.
        </p>
        <p>
          g∘f az x = {sgn(x0)} helyen: {stepB}.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3–5. oldal */

function describe(a: number, b: number, h: number, k: number): string[] {
  const out: string[] = [];
  if (b !== 1) out.push(`Vízszintesen minden távolság ${round(1 / Math.abs(b), 2)}-szeresére változik${b < 0 ? ', és a grafikon tükröződik az y-tengelyre' : ''}.`);
  if (h !== 0) out.push(`Vízszintes eltolás: ${round(Math.abs(h), 1)} egység ${h > 0 ? 'jobbra' : 'balra'}.`);
  if (a !== 1) out.push(`Függőlegesen minden távolság ${round(Math.abs(a), 2)}-szeresére változik${a < 0 ? ', és a grafikon tükröződik az x-tengelyre' : ''}.`);
  if (k !== 0) out.push(`Függőleges eltolás: ${round(Math.abs(k), 1)} egység ${k > 0 ? 'fel' : 'le'}.`);
  return out;
}

/** Az y = a·f(b·(x − h)) + k transzformáció. A mód dönti el, melyik csúszkák látszanak. */
export function TransformWidget({ mode }: { mode: 'shift' | 'scale' | 'full' }) {
  const [bi, setBi] = useState(0);
  const [h, setH] = useState(mode === 'scale' ? 0 : 2);
  const [k, setK] = useState(mode === 'scale' ? 0 : -1);
  const [ai, setAi] = useState(SC1);
  const [bj, setBj] = useState(SC1);
  const base = TBASES[bi];
  const a = mode === 'shift' ? 1 : SC[ai];
  const b = mode === 'shift' ? 1 : SC[bj];
  const hh = mode === 'scale' ? 0 : h;
  const kk = mode === 'scale' ? 0 : k;
  const fn = (x: number) => fin(a * base.f(b * (x - hh)) + kk);
  const formula = `y=${outerTex(a, base.tex(argTex(b, hh)), kk)}`;
  const ax = hh + 1 / b;
  const ay = a + kk;
  const eff = describe(a, b, hh, kk);
  return (
    <div className="widget">
      <div className="widget-title">
        {mode === 'shift' ? 'Eltolás' : mode === 'scale' ? 'Nyújtás, zsugorítás, tükrözés' : 'Összetett transzformáció'}: y = {mode === 'shift' ? 'f(x − h) + k' : mode === 'scale' ? 'a·f(b·x)' : 'a·f(b(x − h)) + k'}
      </div>
      <div className="relbuttons chips">
        {TBASES.map((t, i) => (
          <button key={t.id} className={bi === i ? 'on' : ''} onClick={() => setBi(i)}>
            f(x) = {t.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        {mode !== 'scale' && (
          <>
            <label>
              h = {sgn(h)} (jobbra +)
              <input type="range" min={-4} max={4} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} />
            </label>
            <label>
              k = {sgn(k)} (felfelé +)
              <input type="range" min={-4} max={4} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} />
            </label>
          </>
        )}
        {mode !== 'shift' && (
          <>
            <label>
              b = {sgn(b)} (vízszintes)
              <input type="range" min={0} max={SC.length - 1} step={1} value={bj} onChange={(e) => setBj(Number(e.target.value))} />
            </label>
            <label>
              a = {sgn(a)} (függőleges)
              <input type="range" min={0} max={SC.length - 1} step={1} value={ai} onChange={(e) => setAi(Number(e.target.value))} />
            </label>
          </>
        )}
      </div>
      <Plane xmin={-6} xmax={6} ymin={-6} ymax={6}>
        {(m) => (
          <>
            <PFunc map={m} fn={(x) => fin(base.f(x))} cls="pl-ghost" />
            <PFunc map={m} fn={fn} />
            <circle cx={m.X(1)} cy={m.Y(1)} r={5} fill="none" stroke="rgba(226,232,240,0.8)" strokeWidth={2} />
            <circle cx={m.X(ax)} cy={m.Y(ay)} r={6} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Plane>
      <div className="legend">
        szürke: eredeti f · kék: az átalakított görbe · a szürke karika az (1; 1) pont, a narancs pont a képe
      </div>
      <div className="result">
        <M block t={formula} />
        <M block t={`(1;\\,1)\\ \\longmapsto\\ (${tex(Math.round(ax * 1000) / 1000)};\\,${tex(Math.round(ay * 1000) / 1000)})`} />
      </div>
      <div className="explain">
        {eff.length === 0 ? <p>Nincs átalakítás, a görbe az eredeti.</p> : eff.map((t) => <p key={t}>{t}</p>)}
      </div>
    </div>
  );
}

/** A két sorrend összehasonlítása: előbb tolás, aztán méretezés, vagy fordítva. */
export function OrderWidget() {
  const [bi, setBi] = useState(0);
  const [h, setH] = useState(1);
  const [bj, setBj] = useState(SC.indexOf(2));
  const base = TBASES[bi];
  const b = SC[bj];
  const A = (x: number) => fin(base.f(b * x - h)); // előbb jobbra h, utána x → b·x
  const B = (x: number) => fin(base.f(b * (x - h))); // előbb x → b·x, utána jobbra h
  const aX = (h + 1) / b;
  const bX = h + 1 / b;
  const bs = b === 1 ? '' : b === -1 ? '-' : tex(b);
  const argA = h === 0 ? `${bs}x` : `${bs}x ${h > 0 ? '-' : '+'} ${tex(Math.abs(h))}`;
  const tA = `y=${base.tex(argA)}`;
  const tB = `y=${base.tex(argTex(b, h))}`;
  const same = h === 0 || b === 1;
  return (
    <div className="widget">
      <div className="widget-title">A sorrend számít: tolás és méretezés</div>
      <div className="relbuttons chips">
        {TBASES.slice(0, 3).map((t, i) => (
          <button key={t.id} className={bi === i ? 'on' : ''} onClick={() => setBi(i)}>
            f(x) = {t.name}
          </button>
        ))}
      </div>
      <div className="sliders">
        <label>
          h = {sgn(h)} (tolás jobbra)
          <input type="range" min={-3} max={3} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
        <label>
          b = {sgn(b)} (vízszintes méretezés)
          <input type="range" min={0} max={SC.length - 1} step={1} value={bj} onChange={(e) => setBj(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-6} xmax={6} ymin={-4} ymax={8}>
        {(m) => (
          <>
            <PFunc map={m} fn={(x) => fin(base.f(x))} cls="pl-ghost" />
            <PFunc map={m} fn={A} cls="pl-alt" />
            <PFunc map={m} fn={B} />
            <circle cx={m.X(aX)} cy={m.Y(1)} r={6} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
            <circle cx={m.X(bX)} cy={m.Y(1)} r={6} fill="#38bdf8" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Plane>
      <div className="legend">
        <span style={{ color: '#fb923c' }}>A: előbb tolás, utána méretezés</span> · <span style={{ color: '#38bdf8' }}>B: előbb méretezés, utána tolás</span> · a pontok az eredeti (1; 1) pont képei
      </div>
      <div className="result">
        <M block t={`\\text{A: }${tA},\\qquad x_A=${tex(Math.round(aX * 1000) / 1000)}`} />
        <M block t={`\\text{B: }${tB},\\qquad x_B=${tex(Math.round(bX * 1000) / 1000)}`} />
      </div>
      <div className="explain">
        <p>
          {same
            ? 'Most a két sorrend ugyanazt a görbét adja, mert vagy nincs tolás (h = 0), vagy nincs méretezés (b = 1).'
            : 'A két görbe különbözik: a méretezés a tolás nagyságát is átskálázza. Az A-nál a tolás mértéke h/b, a B-nél h.'}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 6. oldal */

/** Ellipszis az egységkörből: x irányú a-szoros, y irányú b-szeres nyújtás, majd eltolás (h; k). */
export function EllipseWidget() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [h, setH] = useState(1);
  const [k, setK] = useState(-1);
  const pts = (cx: number, cy: number, rx: number, ry: number, m: PMap) => {
    let d = '';
    const N = 180;
    for (let i = 0; i <= N; i++) {
      const t = (2 * Math.PI * i) / N;
      d += `${i === 0 ? 'M' : 'L'}${m.X(cx + rx * Math.cos(t)).toFixed(1)},${m.Y(cy + ry * Math.sin(t)).toFixed(1)} `;
    }
    return d + 'Z';
  };
  const hor = a >= b;
  const big = Math.max(a, b);
  const small = Math.min(a, b);
  const sh = (v: number, n: string) => (v === 0 ? `${n}^2` : `\\left(${n} ${v > 0 ? '-' : '+'} ${tex(Math.abs(v))}\\right)^2`);
  const eq = `\\dfrac{${sh(h, 'x')}}{${tex(a * a)}}+\\dfrac{${sh(k, 'y')}}{${tex(b * b)}}=1`;
  return (
    <div className="widget">
      <div className="widget-title">Ellipszis: nyújtott és eltolt egységkör</div>
      <div className="sliders">
        <label>
          a = {sgn(a)} (vízszintes félátmérő)
          <input type="range" min={0.5} max={4} step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          b = {sgn(b)} (függőleges félátmérő)
          <input type="range" min={0.5} max={4} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          h = {sgn(h)}
          <input type="range" min={-3} max={3} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
        <label>
          k = {sgn(k)}
          <input type="range" min={-3} max={3} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
      </div>
      <Plane xmin={-8} xmax={8} ymin={-8} ymax={8}>
        {(m) => (
          <>
            <path d={pts(0, 0, 1, 1, m)} className="pl-ghost" />
            <path d={pts(h, k, a, b, m)} className="pl-main" />
            <line x1={m.X(h - a)} y1={m.Y(k)} x2={m.X(h + a)} y2={m.Y(k)} className="pl-dash" />
            <line x1={m.X(h)} y1={m.Y(k - b)} x2={m.X(h)} y2={m.Y(k + b)} className="pl-dash" />
            <circle cx={m.X(h)} cy={m.Y(k)} r={5} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Plane>
      <div className="legend">szürke: az x² + y² = 1 egységkör · kék: az ellipszis · narancs pont: a középpont</div>
      <div className="result">
        <M block t={eq} />
      </div>
      <div className="explain">
        {a === b ? (
          <p>Ha a = b, az ellipszis kör, sugara {sgn(a)}.</p>
        ) : (
          <p>
            A nagytengely {hor ? 'vízszintes' : 'függőleges'}, hossza {sgn(2 * big)}; a kistengely hossza {sgn(2 * small)}. Terület: π·a·b ≈ {round(Math.PI * a * b, 2)}.
          </p>
        )}
      </div>
    </div>
  );
}

