import type { Page } from './s1_1';

export type { Page };

export type SectionEntry = {
  /** A szakasz oldalainak száma (a tartalomjegyzékhez és az oldalszám-korlátozáshoz). */
  pages: number;
  /** Dinamikus import: minden szakasz külön JS-chunkba kerül és csak megnyitáskor töltődik be. */
  load: () => Promise<Page[]>;
};

/** Elkészült szakaszok: azonosító → metaadat + lusta betöltő. A többi szakasz a menüben „hamarosan” állapotú. */
export const SECTIONS: Record<string, SectionEntry> = {
  '1.1': { pages: 8, load: () => import('./s1_1').then((m) => m.S1_1) },
  '1.2': { pages: 8, load: () => import('./s1_2').then((m) => m.S1_2) },
  '1.3': { pages: 6, load: () => import('./s1_3').then((m) => m.S1_3) },
  '1.4': { pages: 6, load: () => import('./s1_4').then((m) => m.S1_4) },
  '1.5': { pages: 6, load: () => import('./s1_5').then((m) => m.S1_5) },
  '1.6': { pages: 6, load: () => import('./s1_6').then((m) => m.S1_6) },
  '1.7': { pages: 6, load: () => import('./s1_7').then((m) => m.S1_7) },
  '2.1': { pages: 6, load: () => import('./s2_1').then((m) => m.S2_1) },
  '2.2': { pages: 6, load: () => import('./s2_2').then((m) => m.S2_2) },
  '2.3': { pages: 6, load: () => import('./s2_3').then((m) => m.S2_3) },
  '2.4': { pages: 6, load: () => import('./s2_4').then((m) => m.S2_4) },
  '2.5': { pages: 6, load: () => import('./s2_5').then((m) => m.S2_5) },
  '2.6': { pages: 6, load: () => import('./s2_6').then((m) => m.S2_6) },
  '2.7': { pages: 6, load: () => import('./s2_7').then((m) => m.S2_7) },
  '3.1': { pages: 6, load: () => import('./s3_1').then((m) => m.S3_1) },
  '3.2': { pages: 8, load: () => import('./s3_2').then((m) => m.S3_2) },
  '3.3': { pages: 7, load: () => import('./s3_3').then((m) => m.S3_3) },
  '3.4': { pages: 7, load: () => import('./s3_4').then((m) => m.S3_4) },
  '3.5': { pages: 8, load: () => import('./s3_5').then((m) => m.S3_5) },
  '3.6': { pages: 7, load: () => import('./s3_6').then((m) => m.S3_6) },
  '3.7': { pages: 7, load: () => import('./s3_7').then((m) => m.S3_7) },
  '3.8': { pages: 7, load: () => import('./s3_8').then((m) => m.S3_8) },
  '4.1': { pages: 7, load: () => import('./s4_1').then((m) => m.S4_1) },
  '4.2': { pages: 7, load: () => import('./s4_2').then((m) => m.S4_2) },
  '4.3': { pages: 7, load: () => import('./s4_3').then((m) => m.S4_3) },
  '4.4': { pages: 10, load: () => import('./s4_4').then((m) => m.S4_4) },
  '4.5': { pages: 8, load: () => import('./s4_5').then((m) => m.S4_5) },
  '4.6': { pages: 7, load: () => import('./s4_6').then((m) => m.S4_6) },
  '4.7': { pages: 7, load: () => import('./s4_7').then((m) => m.S4_7) },
  '4.8': { pages: 8, load: () => import('./s4_8').then((m) => m.S4_8) },
  '5.1': { pages: 7, load: () => import('./s5_1').then((m) => m.S5_1) },
  '5.2': { pages: 7, load: () => import('./s5_2').then((m) => m.S5_2) },
  '5.3': { pages: 7, load: () => import('./s5_3').then((m) => m.S5_3) },
  '5.4': { pages: 8, load: () => import('./s5_4').then((m) => m.S5_4) },
  '5.5': { pages: 7, load: () => import('./s5_5').then((m) => m.S5_5) },
  '5.6': { pages: 7, load: () => import('./s5_6').then((m) => m.S5_6) },
  '6.1': { pages: 6, load: () => import('./s6_1').then((m) => m.S6_1) },
  '6.2': { pages: 6, load: () => import('./s6_2').then((m) => m.S6_2) },
  '6.3': { pages: 6, load: () => import('./s6_3').then((m) => m.S6_3) },
  '6.4': { pages: 6, load: () => import('./s6_4').then((m) => m.S6_4) },
  '6.5': { pages: 6, load: () => import('./s6_5').then((m) => m.S6_5) },
  '6.6': { pages: 6, load: () => import('./s6_6').then((m) => m.S6_6) },
  '6.7': { pages: 6, load: () => import('./s6_7').then((m) => m.S6_7) },
  '7.1': { pages: 8, load: () => import('./s7_1').then((m) => m.S7_1) },
  '7.2': { pages: 8, load: () => import('./s7_2').then((m) => m.S7_2) },
  '7.3': { pages: 8, load: () => import('./s7_3').then((m) => m.S7_3) },
  '7.4': { pages: 8, load: () => import('./s7_4').then((m) => m.S7_4) },
  '7.5': { pages: 8, load: () => import('./s7_5').then((m) => m.S7_5) },
  '7.6': { pages: 8, load: () => import('./s7_6').then((m) => m.S7_6) },
  '7.7': { pages: 8, load: () => import('./s7_7').then((m) => m.S7_7) },
  '7.8': { pages: 8, load: () => import('./s7_8').then((m) => m.S7_8) },
  '8.1': { pages: 8, load: () => import('./s8_1').then((m) => m.S8_1) },
  '8.2': { pages: 8, load: () => import('./s8_2').then((m) => m.S8_2) },
  '8.3': { pages: 8, load: () => import('./s8_3').then((m) => m.S8_3) },
  '8.4': { pages: 8, load: () => import('./s8_4').then((m) => m.S8_4) },
  '8.5': { pages: 8, load: () => import('./s8_5').then((m) => m.S8_5) },
  '8.6': { pages: 8, load: () => import('./s8_6').then((m) => m.S8_6) },
  '8.7': { pages: 8, load: () => import('./s8_7').then((m) => m.S8_7) },
  '8.8': { pages: 8, load: () => import('./s8_8').then((m) => m.S8_8) },
  '9.1': { pages: 8, load: () => import('./s9_1').then((m) => m.S9_1) },
  '9.2': { pages: 8, load: () => import('./s9_2').then((m) => m.S9_2) },
  '9.3': { pages: 8, load: () => import('./s9_3').then((m) => m.S9_3) },
  '9.4': { pages: 8, load: () => import('./s9_4').then((m) => m.S9_4) },
  '9.5': { pages: 8, load: () => import('./s9_5').then((m) => m.S9_5) },
  '10.1': { pages: 8, load: () => import('./s10_1').then((m) => m.S10_1) },
  '10.2': { pages: 8, load: () => import('./s10_2').then((m) => m.S10_2) },
  '10.3': { pages: 8, load: () => import('./s10_3').then((m) => m.S10_3) },
  '10.4': { pages: 8, load: () => import('./s10_4').then((m) => m.S10_4) },
  '10.5': { pages: 8, load: () => import('./s10_5').then((m) => m.S10_5) },
  '10.6': { pages: 8, load: () => import('./s10_6').then((m) => m.S10_6) },
  '10.7': { pages: 8, load: () => import('./s10_7').then((m) => m.S10_7) },
  '10.8': { pages: 8, load: () => import('./s10_8').then((m) => m.S10_8) },
  '11.1': { pages: 8, load: () => import('./s11_1').then((m) => m.S11_1) },
  '11.2': { pages: 8, load: () => import('./s11_2').then((m) => m.S11_2) },
  '11.3': { pages: 8, load: () => import('./s11_3').then((m) => m.S11_3) },
  '11.4': { pages: 8, load: () => import('./s11_4').then((m) => m.S11_4) },
  '11.5': { pages: 8, load: () => import('./s11_5').then((m) => m.S11_5) },
  '11.6': { pages: 8, load: () => import('./s11_6').then((m) => m.S11_6) },
  '11.7': { pages: 8, load: () => import('./s11_7').then((m) => m.S11_7) },
  '11.8': { pages: 8, load: () => import('./s11_8').then((m) => m.S11_8) },
  '11.9': { pages: 8, load: () => import('./s11_9').then((m) => m.S11_9) },
  '11.10': { pages: 8, load: () => import('./s11_10').then((m) => m.S11_10) },
  '11.11': { pages: 8, load: () => import('./s11_11').then((m) => m.S11_11) },
  '12.1': { pages: 8, load: () => import('./s12_1').then((m) => m.S12_1) },
  '12.2': { pages: 8, load: () => import('./s12_2').then((m) => m.S12_2) },
  '12.3': { pages: 8, load: () => import('./s12_3').then((m) => m.S12_3) },
  '12.4': { pages: 8, load: () => import('./s12_4').then((m) => m.S12_4) },
  '12.5': { pages: 8, load: () => import('./s12_5').then((m) => m.S12_5) },
  '12.6': { pages: 8, load: () => import('./s12_6').then((m) => m.S12_6) },
  '13.1': { pages: 8, load: () => import('./s13_1').then((m) => m.S13_1) },
  '13.2': { pages: 8, load: () => import('./s13_2').then((m) => m.S13_2) },
  '13.3': { pages: 8, load: () => import('./s13_3').then((m) => m.S13_3) },
  '13.4': { pages: 8, load: () => import('./s13_4').then((m) => m.S13_4) },
  '13.5': { pages: 8, load: () => import('./s13_5').then((m) => m.S13_5) },
  '13.6': { pages: 8, load: () => import('./s13_6').then((m) => m.S13_6) },
  '14.1': { pages: 8, load: () => import('./s14_1').then((m) => m.S14_1) },
};

const cache = new Map<string, Page[]>();

export function getCachedSection(id: string): Page[] | undefined {
  return cache.get(id);
}

export async function loadSection(id: string): Promise<Page[] | null> {
  const hit = cache.get(id);
  if (hit) return hit;
  const entry = SECTIONS[id];
  if (!entry) return null;
  const pages = await entry.load();
  cache.set(id, pages);
  return pages;
}
