/** Az 1.5 szakasz közös segédeszközei: alapfüggvények, intervallumhalmazok metszete és kizárt pontjai. */
import { tex } from './M';
import type { Iv } from './funcs13';

export type { Iv };
const I = Infinity;

export const ALL: Iv[] = [{ a: -I, b: I, ac: false, bc: false }];

export type BF = {
  id: string;
  tex: string;
  f: (x: number) => number;
  dom: Iv[];
  /** a függvény zérushelyei (az osztásnál kizárandó pontok) */
  zeros: number[];
};

export const BASE: BF[] = [
  { id: 'p', tex: '\\sqrt{x+2}', f: (x) => Math.sqrt(x + 2), dom: [{ a: -2, b: I, ac: true, bc: false }], zeros: [-2] },
  { id: 'q', tex: '\\sqrt{4-x}', f: (x) => Math.sqrt(4 - x), dom: [{ a: -I, b: 4, ac: false, bc: true }], zeros: [4] },
  { id: 'r', tex: 'x^2-1', f: (x) => x * x - 1, dom: ALL, zeros: [-1, 1] },
  {
    id: 's',
    tex: '\\dfrac{1}{x-1}',
    f: (x) => 1 / (x - 1),
    dom: [
      { a: -I, b: 1, ac: false, bc: false },
      { a: 1, b: I, ac: false, bc: false },
    ],
    zeros: [],
  },
  { id: 't', tex: '|x|', f: (x) => Math.abs(x), dom: ALL, zeros: [0] },
  { id: 'u', tex: 'x-3', f: (x) => x - 3, dom: ALL, zeros: [3] },
];

export function inDom(list: Iv[], x: number): boolean {
  return list.some((v) => (x > v.a || (v.ac && x === v.a)) && (x < v.b || (v.bc && x === v.b)));
}

/** Két intervallumlista metszete. */
export function intersect(A: Iv[], B: Iv[]): Iv[] {
  const out: Iv[] = [];
  for (const p of A) {
    for (const q of B) {
      let a = p.a;
      let ac = p.ac;
      if (q.a > a) {
        a = q.a;
        ac = q.ac;
      } else if (q.a === a) ac = p.ac && q.ac;
      let b = p.b;
      let bc = p.bc;
      if (q.b < b) {
        b = q.b;
        bc = q.bc;
      } else if (q.b === b) bc = p.bc && q.bc;
      if (a < b || (a === b && ac && bc)) out.push({ a, b, ac, bc });
    }
  }
  return out;
}

/** Pontok kizárása az intervallumlistából. */
export function removePoints(list: Iv[], pts: number[]): Iv[] {
  let cur = list;
  for (const c of pts) {
    const next: Iv[] = [];
    for (const v of cur) {
      if (c < v.a || c > v.b) next.push(v);
      else if (c === v.a && c === v.b) continue;
      else if (c === v.a) next.push({ ...v, ac: false });
      else if (c === v.b) next.push({ ...v, bc: false });
      else {
        next.push({ a: v.a, b: c, ac: v.ac, bc: false });
        next.push({ a: c, b: v.b, ac: false, bc: v.bc });
      }
    }
    cur = next;
  }
  return cur;
}

function numTex(n: number): string {
  if (n === I) return '\\infty';
  if (n === -I) return '-\\infty';
  return tex(n);
}

export function ivTex(list: Iv[]): string {
  if (list.length === 0) return '\\varnothing';
  return list
    .map((v) => {
      if (v.a === v.b) return `\\{${numTex(v.a)}\\}`;
      const l = v.ac && Number.isFinite(v.a) ? '[' : '(';
      const r = v.bc && Number.isFinite(v.b) ? ']' : ')';
      return `${l}${numTex(v.a)};\\,${numTex(v.b)}${r}`;
    })
    .join('\\cup ');
}

/** Az összetett függvény vizsgálatához: a pár két függvénye és a kézzel megadott (mintavétellel ellenőrzött) tartományok. */
export type Pair = {
  label: string;
  fTex: string;
  gTex: string;
  f: (x: number) => number;
  g: (x: number) => number;
  fogTex: string;
  fogDom: Iv[];
  gofTex: string;
  gofDom: Iv[];
};

const POS: Iv[] = [{ a: 0, b: I, ac: true, bc: false }];

export const PAIRS: Pair[] = [
  {
    label: 'f = √x, g = x − 3',
    fTex: '\\sqrt{x}',
    gTex: 'x-3',
    f: Math.sqrt,
    g: (x) => x - 3,
    fogTex: '\\sqrt{x-3}',
    fogDom: [{ a: 3, b: I, ac: true, bc: false }],
    gofTex: '\\sqrt{x}-3',
    gofDom: POS,
  },
  {
    label: 'f = 1/x, g = x² − 1',
    fTex: '\\dfrac1x',
    gTex: 'x^2-1',
    f: (x) => 1 / x,
    g: (x) => x * x - 1,
    fogTex: '\\dfrac{1}{x^2-1}',
    fogDom: [
      { a: -I, b: -1, ac: false, bc: false },
      { a: -1, b: 1, ac: false, bc: false },
      { a: 1, b: I, ac: false, bc: false },
    ],
    gofTex: '\\dfrac{1}{x^2}-1',
    gofDom: [
      { a: -I, b: 0, ac: false, bc: false },
      { a: 0, b: I, ac: false, bc: false },
    ],
  },
  {
    label: 'f = √x, g = 4 − x²',
    fTex: '\\sqrt{x}',
    gTex: '4-x^2',
    f: Math.sqrt,
    g: (x) => 4 - x * x,
    fogTex: '\\sqrt{4-x^2}',
    fogDom: [{ a: -2, b: 2, ac: true, bc: true }],
    gofTex: '4-\\left(\\sqrt{x}\\right)^2',
    gofDom: POS,
  },
  {
    label: 'f = x², g = √(x + 1)',
    fTex: 'x^2',
    gTex: '\\sqrt{x+1}',
    f: (x) => x * x,
    g: (x) => Math.sqrt(x + 1),
    fogTex: '\\left(\\sqrt{x+1}\\right)^2',
    fogDom: [{ a: -1, b: I, ac: true, bc: false }],
    gofTex: '\\sqrt{x^2+1}',
    gofDom: ALL,
  },
  {
    label: 'f = |x|, g = x − 2',
    fTex: '|x|',
    gTex: 'x-2',
    f: Math.abs,
    g: (x) => x - 2,
    fogTex: '|x-2|',
    fogDom: ALL,
    gofTex: '|x|-2',
    gofDom: ALL,
  },
  {
    label: 'f = 1/x, g = √x',
    fTex: '\\dfrac1x',
    gTex: '\\sqrt{x}',
    f: (x) => 1 / x,
    g: Math.sqrt,
    fogTex: '\\dfrac{1}{\\sqrt{x}}',
    fogDom: [{ a: 0, b: I, ac: false, bc: false }],
    gofTex: '\\sqrt{\\dfrac1x}',
    gofDom: [{ a: 0, b: I, ac: false, bc: false }],
  },
];

/** Átalakítandó alapfüggvények a transzformációs eszközökhöz. Az arg a már behelyettesített KaTeX-argumentum. */
export type TBase = { id: string; name: string; f: (x: number) => number; tex: (arg: string) => string };

const wrap = (arg: string) => (arg === 'x' ? arg : `\\left(${arg}\\right)`);

export const TBASES: TBase[] = [
  { id: 'sq', name: 'x²', f: (x) => x * x, tex: (u) => `${wrap(u)}^2` },
  { id: 'ab', name: '|x|', f: Math.abs, tex: (u) => `\\left|${u}\\right|` },
  { id: 'rt', name: '√x', f: Math.sqrt, tex: (u) => `\\sqrt{${u}}` },
  { id: 'cu', name: 'x³', f: (x) => x * x * x, tex: (u) => `${wrap(u)}^3` },
  { id: 'iv', name: '1/x', f: (x) => 1 / x, tex: (u) => `\\dfrac{1}{${u}}` },
];

/** Skálázási tényezők (a nulla szándékosan hiányzik: az degenerált, konstans függvényt adna). */
export const SC = [-3, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 3];
export const SC1 = SC.indexOf(1);

/** A b·(x − h) argumentum KaTeX-alakja. */
export function argTex(b: number, h: number): string {
  const sh = h === 0 ? 'x' : `x ${h > 0 ? '-' : '+'} ${tex(Math.abs(h))}`;
  if (b === 1) return sh;
  const bs = b === -1 ? '-' : tex(b);
  return h === 0 ? `${bs}x` : `${bs}\\left(${sh}\\right)`;
}

/** a·F + k KaTeX-alakja, ahol F a már felírt kifejezés. */
export function outerTex(a: number, F: string, k: number): string {
  const as = a === 1 ? '' : a === -1 ? '-' : `${tex(a)}\\,`;
  const ks = k === 0 ? '' : k > 0 ? ` + ${tex(k)}` : ` - ${tex(-k)}`;
  return `${as}${F}${ks}`;
}
