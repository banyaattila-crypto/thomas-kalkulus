import katex from 'katex';
import 'katex/dist/katex.min.css';

type Props = { t: string; block?: boolean };

/** KaTeX-renderelt képlet. A hibás LaTeX nem dob kivételt, hanem piros nyers szöveget mutat. */
export function M({ t, block = false }: Props) {
  let html: string;
  try {
    html = katex.renderToString(t, { displayMode: block, throwOnError: false, strict: 'ignore' });
  } catch {
    html = t;
  }
  return block ? (
    <div className="math-block" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/** Szám magyar tizedesvesszővel, KaTeX-barát formában. */
export function tex(n: number): string {
  const r = Math.round(n * 1000) / 1000;
  return String(r).replace('.', '{,}');
}

/** Szám magyar tizedesvesszővel, sima szövegként. */
export function hu(n: number): string {
  const r = Math.round(n * 1000) / 1000;
  return String(r).replace('.', ',').replace('-', '−');
}
