import { hu, tex } from './M';

/** (x; y) alakú pontjelölés magyar tizedesvesszővel. */
export function pt(x: number, y: number): string {
  return `(${hu(x)}; ${hu(y)})`;
}

/** Előjeles tag KaTeX-ben: 0 → üres, pozitív → " + 3x", negatív → " - 3x". */
export function sgnTerm(n: number, v = ''): string {
  const r = Math.round(n * 1000) / 1000;
  if (r === 0) return '';
  if (r > 0) return ` + ${tex(r)}${v}`;
  return ` - ${tex(-r)}${v}`;
}

/** Az y = kx + b egyenlet KaTeX-alakja. */
export function lineTex(k: number, b: number): string {
  const kk = Math.round(k * 1000) / 1000;
  const bb = Math.round(b * 1000) / 1000;
  if (kk === 0) return `y = ${tex(bb)}`;
  const kx = kk === 1 ? 'x' : kk === -1 ? '-x' : `${tex(kk)}x`;
  return `y = ${kx}${sgnTerm(bb)}`;
}

/** (x − h) alak KaTeX-ben; h = 0 esetén csak x. */
export function shiftTex(h: number, name: string): string {
  const r = Math.round(h * 1000) / 1000;
  if (r === 0) return name;
  return `(${name} ${r > 0 ? '-' : '+'} ${tex(Math.abs(r))})`;
}

/** Kerekítés n tizedesre, magyar tizedesvesszővel. */
export function round(n: number, digits = 1): string {
  const f = 10 ** digits;
  return String(Math.round(n * f) / f).replace('.', ',').replace('-', '−');
}
