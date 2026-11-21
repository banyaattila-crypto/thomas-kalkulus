/** Az 1.3 szakasz widgetjeinek közös függvénykészlete: képlet, természetes értelmezési tartomány és értékkészlet. */
export type Iv = { a: number; b: number; ac: boolean; bc: boolean };
export type Fn = {
  id: string;
  tex: string;
  f: (x: number) => number;
  dom: Iv[];
  rng: Iv[];
  domTex: string;
  rngTex: string;
  why: string;
};

const I = Infinity;

export const FUNCS: Fn[] = [
  {
    id: 'sqrt3',
    tex: '\\sqrt{x-3}',
    f: (x) => Math.sqrt(x - 3),
    dom: [{ a: 3, b: I, ac: true, bc: false }],
    rng: [{ a: 0, b: I, ac: true, bc: false }],
    domTex: '[3;\\,\\infty)',
    rngTex: '[0;\\,\\infty)',
    why: 'A gyök alatt nem lehet negatív szám, tehát x − 3 ≥ 0, azaz x ≥ 3. A gyök értéke nemnegatív, és minden nemnegatív szám előáll (y = √(x−3), ha x = y² + 3).',
  },
  {
    id: 'inv4',
    tex: '\\dfrac{1}{x^2-4}',
    f: (x) => 1 / (x * x - 4),
    dom: [
      { a: -I, b: -2, ac: false, bc: false },
      { a: -2, b: 2, ac: false, bc: false },
      { a: 2, b: I, ac: false, bc: false },
    ],
    rng: [
      { a: -I, b: -0.25, ac: false, bc: true },
      { a: 0, b: I, ac: false, bc: false },
    ],
    domTex: '\\mathbb{R}\\setminus\\{-2;\\,2\\}',
    rngTex: '(-\\infty;\\,-\\tfrac14]\\cup(0;\\,\\infty)',
    why: 'A nevező x = ±2-nél nulla, ott nincs érték. Az x² − 4 értéke −4-nél kisebb nem lehet, a reciproka tehát a [−4; 0) részen legfeljebb −1/4, a pozitív részen pedig bármely pozitív szám.',
  },
  {
    id: 'circ',
    tex: '\\sqrt{9-x^2}',
    f: (x) => Math.sqrt(9 - x * x),
    dom: [{ a: -3, b: 3, ac: true, bc: true }],
    rng: [{ a: 0, b: 3, ac: true, bc: true }],
    domTex: '[-3;\\,3]',
    rngTex: '[0;\\,3]',
    why: 'Kell, hogy 9 − x² ≥ 0, vagyis |x| ≤ 3. A gyök alatti érték 0 és 9 között mozog, így a gyök 0 és 3 között.',
  },
  {
    id: 'inv1',
    tex: '\\dfrac{1}{\\sqrt{x+1}}',
    f: (x) => 1 / Math.sqrt(x + 1),
    dom: [{ a: -1, b: I, ac: false, bc: false }],
    rng: [{ a: 0, b: I, ac: false, bc: false }],
    domTex: '(-1;\\,\\infty)',
    rngTex: '(0;\\,\\infty)',
    why: 'A gyök alatt x + 1 ≥ 0 kell, de a gyök a nevezőben áll, ezért nem lehet nulla: x + 1 > 0, azaz x > −1. Az érték mindig pozitív, és minden pozitív számot felvesz.',
  },
  {
    id: 'sq1',
    tex: '\\sqrt{x^2-1}',
    f: (x) => Math.sqrt(x * x - 1),
    dom: [
      { a: -I, b: -1, ac: false, bc: true },
      { a: 1, b: I, ac: true, bc: false },
    ],
    rng: [{ a: 0, b: I, ac: true, bc: false }],
    domTex: '(-\\infty;\\,-1]\\cup[1;\\,\\infty)',
    rngTex: '[0;\\,\\infty)',
    why: 'Az x² − 1 ≥ 0 egyenlőtlenség megoldása |x| ≥ 1. A gyök alatti érték a [0; ∞) minden elemét felveszi, tehát a gyök is.',
  },
];
