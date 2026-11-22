import { useState } from 'react';
import { M } from './M';
import { round } from './fmt';
import { Chart } from './Widgets17';
import { curve } from './Widgets21';

type Fn = (x: number) => number;

const sg = (n: number) => String(n).replace('.', ',').replace('-', '−');
const tx = (n: number, d = 4) => round(n, d).replace(',', '{,}').replace('−', '-');

/* ------------------------------------------------------------------ 1. oldal: dinamikus szelő → érintő */

type SecEx = {
  id: string;
  name: string;
  tex: string;
  f: Fn;
  df: Fn;
  x0: number;
  xr: [number, number];
  yr: [number, number];
  note: string;
};

const SEC_EX: SecEx[] = [
  {
    id: 'parab',
    name: 'x² (x₀ = 1,5)',
    tex: 'f(x)=x^2,\\quad P(1{,}5;\\,2{,}25)',
    f: (x) => x * x,
    df: (x) => 2 * x,
    x0: 1.5,
    xr: [-1.5, 4],
    yr: [-1, 10],
    note: 'Akár jobbról (h > 0), akár balról (h < 0) közelít Q a P-hez, a narancs szelő a zöld y = 3x − 2,25 érintőbe fordul.',
  },
  {
    id: 'cube0',
    name: 'x³ (x₀ = 0, átvágja!)',
    tex: 'f(x)=x^3,\\quad P(0;\\,0)',
    f: (x) => x * x * x,
    df: (x) => 3 * x * x,
    x0: 0,
    xr: [-2.2, 2.2],
    yr: [-4, 4],
    note: 'Tévhit cáfolata: az x-tengely (y = 0) valódi érintője az x³ görbének az origóban, pedig itt át is vágja a görbét!',
  },
  {
    id: 'cubic',
    name: 'x³ − 3x (többször metszi!)',
    tex: 'f(x)=x^3-3x,\\quad P(-1;\\,2)',
    f: (x) => x * x * x - 3 * x,
    df: (x) => 3 * x * x - 3,
    x0: -1,
    xr: [-2.6, 2.8],
    yr: [-4, 5],
    note: 'Tévhit cáfolata: az y = 2 vízszintes érintő nem csak egy pontban találkozik a görbével — az x = 2 helyen újra metszi!',
  },
];

const H_LIST = [-1.5, -1, -0.5, -0.2, -0.05, 0.05, 0.2, 0.5, 1, 1.5];

export function SecantToTangentWidget() {
  const [si, setSi] = useState(0);
  const [hi, setHi] = useState(8);
  const ex = SEC_EX[si];
  const h = H_LIST[hi];
  const y0 = ex.f(ex.x0);
  const qx = ex.x0 + h;
  const qy = ex.f(qx);
  const mSec = (qy - y0) / h;
  const mTan = ex.df(ex.x0);

  const secLine: Fn = (x) => y0 + mSec * (x - ex.x0);
  const tanLine: Fn = (x) => y0 + mTan * (x - ex.x0);

  return (
    <div className="widget">
      <div className="widget-title">A szelőből érintő lesz (Q → P)</div>
      <div className="relbuttons chips">
        {SEC_EX.map((q, i) => (
          <button key={q.id} className={si === i ? 'on' : ''} onClick={() => setSi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={ex.tex} />
      </p>
      <label>
        eltolás: h = {sg(h)} (Q pont: x = {round(qx, 2)})
        <input type="range" min={0} max={H_LIST.length - 1} step={1} value={hi} onChange={(e) => setHi(Number(e.target.value))} />
      </label>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={270}>
        {(m) => (
          <>
            <path d={curve(tanLine, m, 80)} className="pl-ok" strokeDasharray="6 5" />
            <path d={curve(secLine, m, 80)} className="pl-alt" />
            <path d={curve(ex.f, m, 500)} className="pl-main" />
            <circle cx={m.X(ex.x0)} cy={m.Y(y0)} r={6} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
            <circle cx={m.X(qx)} cy={m.Y(qy)} r={6} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <p className="legend">Kék: y = f(x). Narancs: PQ szelő. Zöld szaggatott: P-beli érintő.</p>
      <div className="result">
        <M block t={`m_{\\text{szelő}} = \\dfrac{f(${tx(qx, 2)})-f(${tx(ex.x0, 2)})}{${tx(h, 2)}} = ${tx(mSec, 4)},\\qquad m_{\\text{érintő}} = ${tx(mTan, 3)}`} />
        <p>{ex.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. oldal: érintő-felfedező */

type TanEx = {
  id: string;
  name: string;
  tex: string;
  slopeFormula: string;
  f: Fn;
  df: Fn;
  minX: number;
  maxX: number;
  initX: number;
  xr: [number, number];
  yr: [number, number];
};

const TAN_EX: TanEx[] = [
  {
    id: 'par',
    name: 'x² − 2x',
    tex: 'f(x)=x^2-2x',
    slopeFormula: 'm(x_0)=2x_0-2',
    f: (x) => x * x - 2 * x,
    df: (x) => 2 * x - 2,
    minX: -1.5,
    maxX: 3.5,
    initX: 2,
    xr: [-2, 4],
    yr: [-2, 7],
  },
  {
    id: 'inv',
    name: '1 / x (hiperbola)',
    tex: 'f(x)=\\dfrac{1}{x}',
    slopeFormula: 'm(a)=-\\dfrac{1}{a^2}',
    f: (x) => (Math.abs(x) < 1e-4 ? NaN : 1 / x),
    df: (x) => -1 / (x * x),
    minX: 0.4,
    maxX: 4,
    initX: 2,
    xr: [-1, 5],
    yr: [-1, 4],
  },
  {
    id: 'sqrt',
    name: '√(x + 3)',
    tex: 'f(x)=\\sqrt{x+3}',
    slopeFormula: 'm(x_0)=\\dfrac{1}{2\\sqrt{x_0+3}}',
    f: (x) => (x < -3 ? NaN : Math.sqrt(x + 3)),
    df: (x) => 1 / (2 * Math.sqrt(x + 3)),
    minX: -2.5,
    maxX: 5,
    initX: 1,
    xr: [-3.5, 6],
    yr: [-0.5, 4],
  },
];

export function TangentExplorerWidget() {
  const [ti, setTi] = useState(1);
  const [x0, setX0] = useState(TAN_EX[1].initX);
  const ex = TAN_EX[ti];
  const y0 = ex.f(x0);
  const mVal = ex.df(x0);
  const bVal = y0 - mVal * x0;
  const tanLine: Fn = (x) => y0 + mVal * (x - x0);
  const signB = bVal >= 0 ? `+ ${tx(bVal, 3)}` : `- ${tx(Math.abs(bVal), 3)}`;

  return (
    <div className="widget">
      <div className="widget-title">Mozgó érintő és egyenlete</div>
      <div className="relbuttons chips">
        {TAN_EX.map((q, i) => (
          <button
            key={q.id}
            className={ti === i ? 'on' : ''}
            onClick={() => {
              setTi(i);
              setX0(q.initX);
            }}
          >
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={`${ex.tex},\\qquad ${ex.slopeFormula}`} />
      </p>
      <label>
        érintési pont: x₀ = {round(x0, 2)}
        <input type="range" min={ex.minX} max={ex.maxX} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
      </label>
      <Chart xmin={ex.xr[0]} xmax={ex.xr[1]} ymin={ex.yr[0]} ymax={ex.yr[1]} h={260}>
        {(m) => (
          <>
            <path d={curve(tanLine, m, 80)} className="pl-alt" />
            <path d={curve(ex.f, m, 500)} className="pl-main" />
            <circle cx={m.X(x0)} cy={m.Y(y0)} r={6} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className="result">
        <M block t={`P\\left(${tx(x0, 2)};\\,${tx(y0, 3)}\\right),\\qquad m=${tx(mVal, 3)},\\qquad y = ${tx(mVal, 3)}x ${signB}`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. oldal: pillanatnyi sebesség (felfelé dobott labda) */

const sBall: Fn = (t) => 20 * t - 5 * t * t;
const vBall: Fn = (t) => 20 - 10 * t;

export function VelocityWidget() {
  const [t0, setT0] = useState(1);
  const [h, setH] = useState(0.8);
  const s0 = sBall(t0);
  const t1 = t0 + h;
  const s1 = sBall(t1);
  const vAvg = (s1 - s0) / h;
  const vInst = vBall(t0);
  const sec: Fn = (t) => s0 + vAvg * (t - t0);
  const tan: Fn = (t) => s0 + vInst * (t - t0);

  return (
    <div className="widget">
      <div className="widget-title">Felfelé dobott labda: s(t) = 20t − 5t² (m)</div>
      <div className="sliders">
        <label>
          időpillanat: t₀ = {round(t0, 2)} s
          <input type="range" min={0} max={3.5} step={0.1} value={t0} onChange={(e) => setT0(Number(e.target.value))} />
        </label>
        <label>
          időtartam: h = {round(h, 2)} s
          <input type="range" min={0.02} max={1.2} step={0.02} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
      </div>
      <Chart xmin={-0.2} xmax={4.4} ymin={-4} ymax={24} h={260}>
        {(m) => (
          <>
            <path d={curve(tan, m, 80)} className="pl-ok" strokeDasharray="6 5" />
            <path d={curve(sec, m, 80)} className="pl-alt" />
            <path d={curve(sBall, m, 400)} className="pl-main" />
            <circle cx={m.X(t0)} cy={m.Y(s0)} r={6} fill="#34d399" stroke="#0b0e24" strokeWidth={1.5} />
            <circle cx={m.X(t1)} cy={m.Y(s1)} r={5.5} fill="#fb923c" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <p className="legend">Kék: s(t) magasság. Narancs: átlagsebesség [t₀; t₀ + h]-n. Zöld szaggatott: pillanatnyi sebesség t₀-ban.</p>
      <div className="result">
        <table className="tbl">
          <thead>
            <tr>
              <th>mennyiség</th>
              <th>érték</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>magasság t₀ = {round(t0, 2)} s-kor</td>
              <td>{round(s0, 2)} m</td>
            </tr>
            <tr>
              <td>átlagsebesség a [t₀; t₀ + h] szakaszon</td>
              <td>{round(vAvg, 2)} m/s</td>
            </tr>
            <tr>
              <td>pillanatnyi sebesség v(t₀) = 20 − 10t₀</td>
              <td>
                <strong>{round(vInst, 2)} m/s</strong> ({Math.abs(vInst) < 0.05 ? 'tetőpont!' : vInst > 0 ? 'emelkedik' : 'esik'})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. oldal: függőleges érintő és mikor nincs érintő */

type OrigEx = {
  id: string;
  name: string;
  tex: string;
  dqTex: string;
  f: Fn;
  hasTan: boolean;
  verdict: string;
};

const ORIG_EX: OrigEx[] = [
  {
    id: 'cube',
    name: 'x³ (vízszintes érintő)',
    tex: 'f(x)=x^3',
    dqTex: '\\dfrac{h^3}{h}=h^2\\to 0',
    f: (x) => x * x * x,
    hasTan: true,
    verdict: 'Van érintő (vízszintes, y = 0): a differenciahányados mindkét oldalról 0-hoz tart.',
  },
  {
    id: 'cbrt',
    name: 'x^(1/3) (függőleges érintő)',
    tex: 'f(x)=x^{1/3}',
    dqTex: '\\dfrac{h^{1/3}}{h}=\\dfrac{1}{h^{2/3}}\\to +\\infty',
    f: (x) => Math.cbrt(x),
    hasTan: true,
    verdict: 'Van függőleges érintő (x = 0): a meredekség mindkét oldalról +∞-hez tart.',
  },
  {
    id: 'cusp',
    name: 'x^(2/3) (tüske — nincs)',
    tex: 'f(x)=x^{2/3}',
    dqTex: '\\dfrac{h^{2/3}}{h}=\\dfrac{1}{h^{1/3}}\\to \\pm\\infty',
    f: (x) => Math.cbrt(x * x),
    hasTan: false,
    verdict: 'Nincs érintő! Jobbról +∞, balról −∞ a szelők meredeksége: éles tüske az origóban.',
  },
  {
    id: 'abs',
    name: '|x| (töréspont — nincs)',
    tex: 'f(x)=|x|',
    dqTex: '\\dfrac{|h|}{h}=\\pm 1',
    f: (x) => Math.abs(x),
    hasTan: false,
    verdict: 'Nincs érintő! Balról −1, jobbról +1 a meredekség — nagyítva sem egyenesedik ki a sarok.',
  },
  {
    id: 'xsin',
    name: 'x sin(1/x) (oszcillál — nincs)',
    tex: 'f(x)=x\\sin(1/x)\\ (x\\ne 0),\\ f(0)=0',
    dqTex: '\\dfrac{h\\sin(1/h)}{h}=\\sin(1/h)',
    f: (x) => (Math.abs(x) < 1e-6 ? 0 : x * Math.sin(1 / x)),
    hasTan: false,
    verdict: 'Nincs érintő! A szelők meredeksége sin(1/h), amely végtelen sokszor ingadozik −1 és +1 között.',
  },
];

export function VerticalTangentWidget() {
  const [oi, setOi] = useState(1);
  const [zoom, setZoom] = useState(1.2);
  const ex = ORIG_EX[oi];

  return (
    <div className="widget">
      <div className="widget-title">Van-e érintő az origóban? Nagyíts rá!</div>
      <div className="relbuttons chips">
        {ORIG_EX.map((q, i) => (
          <button key={q.id} className={oi === i ? 'on' : ''} onClick={() => setOi(i)}>
            {q.name}
          </button>
        ))}
      </div>
      <p className="legend">
        <M t={`${ex.tex},\\qquad \\dfrac{f(h)-f(0)}{h}=${ex.dqTex}`} />
      </p>
      <label>
        ablak mérete: [−{round(zoom, 2)}; {round(zoom, 2)}]
        <input type="range" min={0.08} max={2} step={0.04} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
      </label>
      <Chart xmin={-zoom} xmax={zoom} ymin={-zoom} ymax={zoom} h={260}>
        {(m) => (
          <>
            {ex.id === 'cbrt' && <line x1={m.X(0)} y1={0} x2={m.X(0)} y2={m.h} className="pl-ok" strokeDasharray="6 5" />}
            {ex.id === 'cube' && <line x1={0} y1={m.Y(0)} x2={m.w} y2={m.Y(0)} className="pl-ok" strokeDasharray="6 5" />}
            <path d={curve(ex.f, m, ex.id === 'xsin' ? 1400 : 600)} className="pl-main" />
            <circle cx={m.X(0)} cy={m.Y(0)} r={5.5} fill="#fbbf24" stroke="#0b0e24" strokeWidth={1.5} />
          </>
        )}
      </Chart>
      <div className={`result verdict ${ex.hasTan ? 'ok' : 'no'}`}>
        <p>{ex.verdict}</p>
      </div>
    </div>
  );
}
