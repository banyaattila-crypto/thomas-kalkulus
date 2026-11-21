import { S1_1, Page } from './s1_1';
import { S1_2 } from './s1_2';
import { S1_3 } from './s1_3';
import { S1_4 } from './s1_4';
import { S1_5 } from './s1_5';
import { S1_6 } from './s1_6';
import { S1_7 } from './s1_7';
import { S2_1 } from './s2_1';
import { S2_2 } from './s2_2';
import { S2_3 } from './s2_3';

/** Elkészült szakaszok: azonosító → oldalak. A többi szakasz a menüben „hamarosan” állapotú. */
export const CONTENT: Record<string, Page[]> = {
  '1.1': S1_1,
  '1.2': S1_2,
  '1.3': S1_3,
  '1.4': S1_4,
  '1.5': S1_5,
  '1.6': S1_6,
  '1.7': S1_7,
  '2.1': S2_1,
  '2.2': S2_2,
  '2.3': S2_3,
};
