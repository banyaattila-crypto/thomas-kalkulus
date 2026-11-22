import { useState } from 'react';
import { M } from './M';
import { Plane, PEnd, PFunc, PLine, PPoint } from './Plane';
import { round } from './fmt';

const tx = (n: number, d = 2) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: f(x) = x² különböző tartományokon */

type DomCase = {
  id: string;
  label: string;
  from: number;
  to: number;
  leftClosed: boolean;
  rightClosed: boolean;
  minText: string;
  maxText: string;
  note: string;
};

const DOM_CASES: DomCase[] = [
  {
    id: 'all',
    label: '(−∞; ∞)',
    from: -3,
    to: 3,
    leftClosed: false,
    rightClosed: false,
    minText: 'van: f(0) = 0',
    maxText: 'NINCS (∞-be tart)',
    note: 'A teljes valós számegyenesen alulról korlátos (minimum 0), de felülről nem.',
  },
  {
    id: 'closed',
    label: '[0; 2]',
    from: 0,
    to: 2,
    leftClosed: true,
    rightClosed: true,
    minText: 'van: f(0) = 0',
    maxText: 'van: f(2) = 4',
    note: 'Zárt, korlátos intervallumon a folytonos x² mindkét abszolút szélsőértékét felveszi!',
  },
  {
    id: 'half',
    label: '(0; 2]',
    from: 0,
    to: 2,
    leftClosed: false,
    rightClosed: true,
    minText: 'NINCS (0-hoz tart)',
    maxText: 'van: f(2) = 4',
    note: 'A 0 már nincs benne a tartományban: akármilyen kicsi pozitív értéket veszel, van nála kisebb!',
  },
  {
    id: 'open',
    label: '(0; 2)',
    from: 0,
    to: 2,
    leftClosed: false,
    rightClosed: false,
    minText: 'NINCS',
    maxText: 'NINCS',
    note: 'Nyílt intervallumon mindkét végpont hiányzik, így sem abszolút minimum, sem maximum nincs.',
  },
];

export function DomainExtremaWidget() {
  const [cid, setCid] = useState('closed');
  const c = DOM_CASES.find((d) => d.id === cid) ?? DOM_CASES[1];
  const f = (x: number) => x * x;

  return (
    <div className="widget">
      <div className="widget-title">Ugyanaz az f(x) = x² függvény, négy különböző értelmezési tartományon</div>
      <div className="relbuttons chips">
        {DOM_CASES.map((d) => (
          <button key={d.id} className={cid === d.id ? 'on' : ''} onClick={() => setCid(d.id)}>
            {d.label}
          </button>
        ))}
      </div>
      <Plane xmin={-2.5} xmax={3} ymin={-0.6} ymax={4.8}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} cls="pl-ghost" />
            <PFunc map={m} fn={f} from={c.from} to={c.to} cls="pl-main" />
            {c.id !== 'all' && (
              <>
                <PEnd map={m} x={c.from} y={f(c.from)} closed={c.leftClosed} color="#34d399" />
                <PEnd map={m} x={c.to} y={f(c.to)} closed={c.rightClosed} color="#fbbf24" />
              </>
            )}
            {c.id === 'all' && <PPoint map={m} x={0} y={0} color="#34d399" label="abs. min (0; 0)" dx={10} dy={-8} />}
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          <strong>Abszolút minimum:</strong> {c.minText} &nbsp;|&nbsp; <strong>Abszolút maximum:</strong> {c.maxText}
        </p>
        <p>{c.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: Weierstrass-tétel feltételei */

type WCase = 'ok' | 'jump' | 'open';

export function WeierstrassCounterexampleWidget() {
  const [wc, setWc] = useState<WCase>('ok');

  return (
    <div className="widget">
      <div className="widget-title">Miért kell a Weierstrass-tétel mindkét feltétele (folytonos ÉS zárt)?</div>
      <div className="relbuttons chips">
        <button className={wc === 'ok' ? 'on' : ''} onClick={() => setWc('ok')}>
          1. Folytonos, zárt [0; 3]
        </button>
        <button className={wc === 'jump' ? 'on' : ''} onClick={() => setWc('jump')}>
          2. Szakadás [0; 3]-on
        </button>
        <button className={wc === 'open' ? 'on' : ''} onClick={() => setWc('open')}>
          3. Nyílt (0; 3)
        </button>
      </div>
      <Plane xmin={-0.6} xmax={3.8} ymin={-0.5} ymax={3.6}>
        {(m) => (
          <>
            {wc === 'ok' && (
              <>
                <PFunc map={m} fn={(x) => 1.5 + Math.sin(x * 1.4)} from={0} to={3} cls="pl-main" />
                <PEnd map={m} x={0} y={1.5} closed color="#38bdf8" />
                <PEnd map={m} x={3} y={1.5 + Math.sin(4.2)} closed color="#34d399" />
                <PPoint map={m} x={Math.PI / 2.8} y={2.5} color="#fbbf24" label="abs. max" dx={8} dy={-6} />
                <PPoint map={m} x={3} y={1.5 + Math.sin(4.2)} color="#34d399" label="abs. min" dx={-62} dy={16} />
              </>
            )}
            {wc === 'jump' && (
              <>
                <PFunc map={m} fn={(x) => (x < 2 ? x + 0.5 : 1)} from={0} to={3} cls="pl-main" />
                <PEnd map={m} x={0} y={0.5} closed color="#34d399" />
                <PEnd map={m} x={2} y={2.5} closed={false} color="#f87171" />
                <PEnd map={m} x={2} y={1} closed color="#38bdf8" />
                <PEnd map={m} x={3} y={1} closed color="#38bdf8" />
              </>
            )}
            {wc === 'open' && (
              <>
                <PFunc map={m} fn={(x) => x} from={0} to={3} cls="pl-main" />
                <PEnd map={m} x={0} y={0} closed={false} color="#f87171" />
                <PEnd map={m} x={3} y={3} closed={false} color="#f87171" />
              </>
            )}
          </>
        )}
      </Plane>
      <div className="result">
        {wc === 'ok' && (
          <p>
            <strong>Mindkét feltétel teljesül:</strong> a folytonos függvény a zárt <M t="[0;\,3]" /> intervallumon garantáltan felveszi az abszolút maximumát és minimumát is!
          </p>
        )}
        {wc === 'jump' && (
          <p>
            <strong>Megsérült a folytonosság:</strong> a <M t="2{,}5" />-ös csúcs helyén üres kör van (a függvény <M t="x=2" />-nél leugrik <M t="1" />-re), ezért <strong>nincs abszolút maximum</strong>!
          </p>
        )}
        {wc === 'open' && (
          <p>
            <strong>Megsérült a zártság:</strong> a nyílt <M t="(0;\,3)" /> intervallumon <M t="f(x)=x" /> folytonos, még sincs sem abszolút maximuma, sem abszolút minimuma!
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: Lokális vs. abszolút és Fermat-tétel */

export function LocalVsGlobalWidget() {
  const [x, setX] = useState(-1);
  // f(x) = (1/3)x³ - x² - 3x + 4 → f'(x) = x² - 2x - 3 = (x-3)(x+1)
  // Skálázva 0.4-gyel, hogy szépen elférjen a síkon:
  const f = (t: number) => 0.35 * ((t ** 3) / 3 - t * t - 3 * t + 4) + 1.5;
  const df = (t: number) => 0.35 * (t * t - 2 * t - 3);
  const y = f(x);
  const mVal = df(x);
  const isFlat = Math.abs(mVal) < 0.08;

  return (
    <div className="widget">
      <div className="widget-title">Fermat tétele: lokális szélsőértékben a sima érintő vízszintes (f′ = 0)</div>
      <label>
        mozgó pont: x = {round(x, 2)} (érintő meredeksége: f′(x) = {round(mVal, 2)})
        <input type="range" min={-2.2} max={4.4} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <Plane xmin={-2.8} xmax={5} ymin={-2.2} ymax={4.2}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} from={-2.2} to={4.4} cls="pl-main" />
            <PLine map={m} k={mVal} b={y - mVal * x} cls={isFlat ? 'pl-ok' : 'pl-alt'} />
            <PPoint map={m} x={-1} y={f(-1)} color="#fbbf24" label="lok. max (f′=0)" dx={-42} dy={-12} />
            <PPoint map={m} x={3} y={f(3)} color="#34d399" label="lok. & abs. min (f′=0)" dx={-55} dy={20} />
            <PEnd map={m} x={-2.2} y={f(-2.2)} closed color="#38bdf8" />
            <PEnd map={m} x={4.4} y={f(4.4)} closed color="#38bdf8" />
            <PPoint map={m} x={x} y={y} color={isFlat ? '#34d399' : '#fb923c'} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={`x = ${tx(x, 2)}, \\quad f'(x) = ${tx(mVal, 2)} ${isFlat ? '\\;\\approx 0 \\;(\\text{vízszintes érintő!})' : ''}`} />
        <p>
          Húzd <M t="x" />-et <M t="-1" />-re és <M t="3" />-ra: mindkettőnél zöldre vált a vízszintes érintő! A jobb végpont (<M t="x=4{,}4" />) magasabb a helyi csúcsnál, így az lesz az <strong>abszolút maximum</strong>.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: Kritikus pontok galériája */

type CritId = 'smooth' | 'corner' | 'cusp' | 'terrace';

const CRIT_INFO: Record<CritId, { title: string; f: (x: number) => number; tex: string; desc: string }> = {
  smooth: {
    title: 'f(x) = 2 − x² (f′(0) = 0)',
    f: (x) => 2 - x * x,
    tex: "f'(0) = 0 \\;\\Longrightarrow\\; \\text{sima lokális (és abszolút) maximum}",
    desc: 'Vízszintes érintő: a leggyakoribb kritikus pont.',
  },
  corner: {
    title: 'f(x) = |x| (töréspont)',
    f: (x) => Math.abs(x),
    tex: "f'(0) \\text{ nem létezik} \\;\\Longrightarrow\\; \\text{töréspont, abszolút minimum!}",
    desc: 'Balról −1, jobbról +1 a meredekség — nincs derivált, mégis kritikus pont és minimum!',
  },
  cusp: {
    title: 'f(x) = x^(2/3) (tüske)',
    f: (x) => Math.cbrt(x * x),
    tex: "f'(x)=\\tfrac{2}{3}x^{-1/3} \\text{ nem létezik } x=0\\text{-ban} \\;\\Longrightarrow\\; \\text{abszolút minimum!}",
    desc: 'A nevező 0 lesz, az érintő függőleges — mégis egyértelmű minimumpont!',
  },
  terrace: {
    title: 'f(x) = x³ (CSAPDA!)',
    f: (x) => x * x * x,
    tex: "f'(0) = 0, \\text{ DE NINCS SZÉLSŐÉRTÉK!}",
    desc: 'Kritikus pont, mert f′(0) = 0, de a függvény végig szigorúan növekszik (teraszpont).',
  },
};

export function CriticalPointsGalleryWidget() {
  const [cid, setCid] = useState<CritId>('corner');
  const cur = CRIT_INFO[cid];

  return (
    <div className="widget">
      <div className="widget-title">A kritikus pontok 4 arca az x = 0 helyen</div>
      <div className="relbuttons chips">
        {(Object.keys(CRIT_INFO) as CritId[]).map((k) => (
          <button key={k} className={cid === k ? 'on' : ''} onClick={() => setCid(k)}>
            {CRIT_INFO[k].title}
          </button>
        ))}
      </div>
      <Plane xmin={-2.6} xmax={2.6} ymin={-1.8} ymax={2.8}>
        {(m) => (
          <>
            <PFunc map={m} fn={cur.f} cls="pl-main" />
            {(cid === 'smooth' || cid === 'terrace') && <PLine map={m} k={0} b={cur.f(0)} cls="pl-alt" />}
            <PPoint map={m} x={0} y={cur.f(0)} color={cid === 'terrace' ? '#f87171' : '#34d399'} label="kritikus pont (x = 0)" dx={10} dy={-10} />
          </>
        )}
      </Plane>
      <div className="result">
        <M block t={cur.tex} />
        <p>{cur.desc}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 5. oldal: Zárt intervallumos módszer */

export function ClosedIntervalMethodWidget() {
  const [a, setA] = useState(-1.8);
  const [b, setB] = useState(2.0);
  // f(x) = x³ - 3x + 1 → f'(x) = 3x² - 3 = 0 → kritikus pontok: x = -1 és x = 1
  const f = (x: number) => x * x * x - 3 * x + 1;

  const candidates: { x: number; y: number; kind: string }[] = [{ x: a, y: f(a), kind: 'bal végpont' }];
  if (-1 > a && -1 < b) candidates.push({ x: -1, y: f(-1), kind: 'kritikus (f′=0)' });
  if (1 > a && 1 < b) candidates.push({ x: 1, y: f(1), kind: 'kritikus (f′=0)' });
  candidates.push({ x: b, y: f(b), kind: 'jobb végpont' });

  const maxC = candidates.reduce((best, cur) => (cur.y > best.y ? cur : best), candidates[0]);
  const minC = candidates.reduce((best, cur) => (cur.y < best.y ? cur : best), candidates[0]);

  return (
    <div className="widget">
      <div className="widget-title">A zárt intervallumos módszer élőben: f(x) = x³ − 3x + 1 az [a; b] intervallumon</div>
      <label>
        bal végpont: a = {round(a, 1)}
        <input type="range" min={-2.2} max={0.4} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label>
        jobb végpont: b = {round(b, 1)}
        <input type="range" min={0.6} max={2.3} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
      <Plane xmin={-2.6} xmax={2.6} ymin={-3.5} ymax={6.5}>
        {(m) => (
          <>
            <PFunc map={m} fn={f} cls="pl-ghost" />
            <PFunc map={m} fn={f} from={a} to={b} cls="pl-main" />
            {candidates.map((c) => (
              <PPoint
                key={`${c.kind}-${c.x}`}
                map={m}
                x={c.x}
                y={c.y}
                color={c === maxC ? '#fbbf24' : c === minC ? '#34d399' : '#94a3b8'}
                label={c === maxC ? 'ABS. MAX' : c === minC ? 'ABS. MIN' : undefined}
                dx={8}
                dy={c === maxC ? -10 : 16}
              />
            ))}
          </>
        )}
      </Plane>
      <div className="result">
        <p>
          <strong>Jelöltek listája:</strong>{' '}
          {candidates.map((c, i) => (
            <span key={`${c.kind}-${c.x}`}>
              {i > 0 ? ' · ' : ''}
              <strong style={{ color: c === maxC ? '#fbbf24' : c === minC ? '#34d399' : undefined }}>
                f({round(c.x, 1)}) = {round(c.y, 2)}
              </strong>{' '}
              ({c.kind})
            </span>
          ))}
        </p>
        <p>
          Csúsztasd <M t="b" />-t <M t="2{,}0" /> fölé: az abszolút maximum átugrik a kritikus <M t="x=-1" /> pontról a jobb végpontra!
        </p>
      </div>
    </div>
  );
}
