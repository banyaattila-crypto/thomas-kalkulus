// Build utáni lépés: a Vite kimenetét (docs/app.html) kész, önálló oldalként másolja
//  - docs/index.html  (GitHub Pages: main ág /docs mappa)
//  - index.html       (GitHub Pages: main ág gyökér)
// A gyökér index.html tehát mindig a KÉSZ oldal, nem a fejlesztői sablon (az az app.html).
import { copyFileSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const built = 'docs/app.html';
let html;
try {
  html = readFileSync(built, 'utf8');
} catch {
  console.error(`Hiba: nincs ${built}; a vite build nem futott le?`);
  process.exit(1);
}
html = html.replace(/^<!doctype html>/i, '<!DOCTYPE html>');
writeFileSync('docs/index.html', html);
writeFileSync('index.html', html);
rmSync(built);
console.log('Kész: docs/index.html és index.html frissítve (' + Math.round(html.length / 1024) + ' kB)');
