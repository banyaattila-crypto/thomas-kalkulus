/** Az 1.6 szakasz közös segédeszközei: π-többszörösök, nevezetes szögek pontos értékei. */

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** A k·π/12 szög KaTeX-alakja (k egész). */
export function piTex(k: number): string {
  if (k === 0) return '0';
  const g = gcd(k, 12);
  const n = k / g;
  const d = 12 / g;
  const an = Math.abs(n);
  const neg = n < 0 ? '-' : '';
  if (d === 1) return `${neg}${an === 1 ? '' : an}\\pi`;
  return `${neg}\\dfrac{${an === 1 ? '' : an}\\pi}{${d}}`;
}

const SIN_REF: Record<number, string> = { 0: '0', 30: '\\tfrac12', 45: '\\tfrac{\\sqrt2}{2}', 60: '\\tfrac{\\sqrt3}{2}', 90: '1' };
const COS_REF: Record<number, string> = { 0: '1', 30: '\\tfrac{\\sqrt3}{2}', 45: '\\tfrac{\\sqrt2}{2}', 60: '\\tfrac12', 90: '0' };
const TAN_REF: Record<number, string | null> = { 0: '0', 30: '\\tfrac{\\sqrt3}{3}', 45: '1', 60: '\\sqrt3', 90: null };

/** Pontos érték (KaTeX) az 0°, 30°, 45°, 60°, 90° referenciaszögű szögekre; egyébként null. tan: undefined = nincs értelmezve. */
export function exactTrig(deg: number): { sin: string; cos: string; tan: string | null } | null {
  const n = ((deg % 360) + 360) % 360;
  const ref = n <= 90 ? n : n <= 180 ? 180 - n : n <= 270 ? n - 180 : 360 - n;
  if (!(ref in SIN_REF)) return null;
  const sS = n > 180 && n < 360 ? -1 : 1;
  const cS = n > 90 && n < 270 ? -1 : 1;
  const wrap = (v: string, s: number) => (v === '0' || s > 0 ? v : `-${v}`);
  const t = TAN_REF[ref];
  return {
    sin: wrap(SIN_REF[ref], sS),
    cos: wrap(COS_REF[ref], cS),
    tan: t === null ? null : wrap(t, sS * cS),
  };
}
