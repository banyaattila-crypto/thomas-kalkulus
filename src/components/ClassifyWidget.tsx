import { useState } from 'react';
import { M } from './M';

const TYPES = ['konstans', 'lineáris', 'másodfokú polinom', 'magasabb fokú polinom', 'racionális', 'hatvány (törtkitevős)', 'algebrai (gyökös)', 'exponenciális', 'logaritmus', 'trigonometrikus'];
const ITEMS: { t: string; type: string; why: string }[] = [
  { t: 'f(x)=-7', type: 'konstans', why: 'Nem függ x-től; ez az m = 0 esete a lineárisnak.' },
  { t: 'f(x)=3x-7', type: 'lineáris', why: 'mx + b alak, m = 3, b = −7.' },
  { t: 'f(x)=4x^2-x+5', type: 'másodfokú polinom', why: 'A legnagyobb kitevő 2.' },
  { t: 'f(x)=x^5-2x+1', type: 'magasabb fokú polinom', why: 'Ötödfokú polinom.' },
  { t: 'f(x)=\\dfrac{x^2+1}{x-3}', type: 'racionális', why: 'Két polinom hányadosa.' },
  { t: 'f(x)=x^{3/2}', type: 'hatvány (törtkitevős)', why: 'x^a alak, ahol a = 3/2 nem egész szám.' },
  { t: 'f(x)=\\sqrt{1+x^2}', type: 'algebrai (gyökös)', why: 'Algebrai műveletekkel (gyökvonás) áll elő, de nem racionális és nem hatványfüggvény.' },
  { t: 'f(x)=2^x', type: 'exponenciális', why: 'Az x a kitevőben áll, az alap állandó.' },
  { t: 'f(x)=\\log_3 x', type: 'logaritmus', why: 'Az exponenciális függvény inverze.' },
  { t: 'f(x)=\\sin(2x)', type: 'trigonometrikus', why: 'Szögfüggvény.' },
];

/** Típusfelismerő: a legpontosabb besorolás kiválasztása, azonnali visszajelzéssel. */
export function ClassifyWidget() {
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const it = ITEMS[i];
  const done = i >= ITEMS.length;
  const pick = (t: string) => {
    if (ans) return;
    setAns(t);
    if (t === it.type) setScore((s) => s + 1);
  };
  const next = () => {
    setAns(null);
    setI(i + 1);
  };
  if (done)
    return (
      <div className="widget">
        <div className="widget-title">Típusfelismerő</div>
        <p>
          Eredmény: {score} / {ITEMS.length}.
        </p>
        <button className="reveal" onClick={() => { setI(0); setScore(0); setAns(null); }}>Újra</button>
      </div>
    );
  return (
    <div className="widget">
      <div className="widget-title">Típusfelismerő ({i + 1}/{ITEMS.length})</div>
      <div className="result"><M block t={it.t} /></div>
      <div className="relbuttons chips">
        {TYPES.map((t) => (
          <button
            key={t}
            className={ans === t ? (t === it.type ? 'right' : 'wrong') : ans && t === it.type ? 'right' : ''}
            onClick={() => pick(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {ans && (
        <div className="explain">
          <p>{ans === it.type ? 'Helyes. ' : `Nem ez: a helyes besorolás ${it.type}. `}{it.why}</p>
          <button className="reveal" onClick={next}>{i + 1 < ITEMS.length ? 'Következő' : 'Eredmény'}</button>
        </div>
      )}
    </div>
  );
}
