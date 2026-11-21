import { S1_1, Page } from './s1_1';
import { S1_2 } from './s1_2';

/** Elkészült szakaszok: azonosító → oldalak. A többi szakasz a menüben „hamarosan” állapotú. */
export const CONTENT: Record<string, Page[]> = {
  '1.1': S1_1,
  '1.2': S1_2,
};
