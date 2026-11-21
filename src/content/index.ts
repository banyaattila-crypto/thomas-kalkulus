import { S1_1, Page } from './s1_1';
import { S1_2 } from './s1_2';
import { S1_3 } from './s1_3';
import { S1_4 } from './s1_4';

/** Elkészült szakaszok: azonosító → oldalak. A többi szakasz a menüben „hamarosan” állapotú. */
export const CONTENT: Record<string, Page[]> = {
  '1.1': S1_1,
  '1.2': S1_2,
  '1.3': S1_3,
  '1.4': S1_4,
};
