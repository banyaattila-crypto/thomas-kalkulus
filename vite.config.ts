import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// A fejlesztői sablon az app.html; a kimenet a docs/ mappába kerül (a finish.mjs docs/index.html-t és gyökér index.html-t készít) (egyetlen önálló HTML-fájl, a KaTeX-betűk beágyazva),
// így a GitHub Pages közvetlenül a main ág /docs mappájából szolgálhatja ki.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { rollupOptions: { input: 'app.html' }, outDir: 'docs', emptyOutDir: true, assetsInlineLimit: 100_000_000, cssCodeSplit: false },
});
