import { useState } from 'react';
import { Plane, PFunc } from './Plane';
import { M, tex } from './M';

/** Harmadfokú polinom együtthatóinak állítása: fokszám, gyökök száma, viselkedés a széleken. */
export function PolyWidget() {
  const [c, setC] = useState({ a: 1, b: 0, c: -3, d: 1 });
  const f = (x: number) => ((c.a * x + c.b) * x + c.c) * x + c.d;
  const deg = c.a !== 0 ? 3 : c.b !== 0 ? 2 : c.c !== 0 ? 1 : 0;
  let roots = 0;
  let prev = f(-6);
  for (let i = 1; i <= 12000; i++) {
    const v = f(-6 + i * 0.001);
    if (prev === 0 || prev * v < 0) roots++;
    prev = v;
  }
  const lead = [c.d, c.c, c.b, c.a][deg];
  const set = (k: 'a' | 'b' | 'c' | 'd') => (e: React.ChangeEvent<HTMLInputElement>) => setC({ ...c, [k]: Number(e.target.value) });
  const t = (n: number, v: string, first = false) =>
    n === 0 ? '' : `${n < 0 ? (first ? '-' : ' - ') : first ? '' : ' + '}${Math.abs(n) === 1 && v ? '' : tex(Math.abs(n))}${v}`;
  let expr = '';
  [[c.a, 'x^3'], [c.b, 'x^2'], [c.c, 'x'], [c.d, '']].forEach(([n, v]) => {
    expr += t(n as number, v as string, expr === '');
  });
  return (
    <div className="widget">
      <div className="widget-title">Polinomfüggvény: p(x) = ax³ + bx² + cx + d</div>
      <div className="sliders">
        {(['a', 'b', 'c', 'd'] as const).map((k) => (
          <label key={k}>
            {k} = {String(c[k]).replace('.', ',').replace('-', '−')}
            <input type="range" min={-3} max={3} step={0.5} value={c[k]} onChange={set(k)} />
          </label>
        ))}
      </div>
      <Plane xmin={-4} xmax={4} ymin={-6} ymax={6}>{(m) => <PFunc map={m} fn={f} />}</Plane>
      <div className="result">
        <M block t={`p(x)=${expr || '0'}`} />
      </div>
      <div className="explain">
        <p>
          Fokszám: {deg === 0 ? (c.d === 0 ? 'a nulla polinomnak nincs fokszáma' : '0 (konstans)') : deg}. Valós gyökök száma a [−6; 6] intervallumon: {roots}.
          {deg === 3 && ' Háromnál több gyöke egy harmadfokú polinomnak nem lehet; legalább egy mindig van, mert a két szélén ellentétes az előjel.'}
          {deg === 2 && ' A grafikon parabola.'}
          {deg === 1 && ' A grafikon egyenes.'}
        </p>
        {deg > 0 && (
          <p>
            A szélső viselkedést a főtag dönti el: {deg % 2 === 1 ? 'páratlan fokszámnál a két szél ellentétes irányba tart' : 'páros fokszámnál a két szél azonos irányba tart'}
            {`, a főegyüttható ${lead > 0 ? 'pozitív' : 'negatív'}`}.
          </p>
        )}
      </div>
    </div>
  );
}
