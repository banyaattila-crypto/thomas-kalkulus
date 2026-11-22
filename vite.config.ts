import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const singleFile = process.env.SINGLE_FILE === '1';

// Alapértelmezett webes build: code-split chunkok szakaszonként (dist/), GitHub Actions-szel publikálva.
// Opcionális offline export: `npm run build:single` (egyetlen önálló HTML fájl a dist/ mappában).
export default defineConfig({
  base: './',
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  plugins: singleFile ? [react(), viteSingleFile()] : [react()],
  build: singleFile
    ? { outDir: 'dist', emptyOutDir: true, assetsInlineLimit: 100_000_000, cssCodeSplit: false }
    : { outDir: 'dist', emptyOutDir: true },
});
