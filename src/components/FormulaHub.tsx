import { useEffect, useMemo, useRef, useState } from 'react';
import { TOC, VOLUME_TITLES } from '../data/toc';
import { SECTIONS } from '../content';
import { FORMULAS, FORMULA_CATEGORIES, FormulaCategory } from '../data/formulas';
import { VOL_COLORS } from './TocPage';
import { M } from './M';

type Props = {
  go: (section: string, page?: number) => void;
  done?: Set<string>;
};

/** Ékezet- és kis/nagybetű-érzéketlen normalizálás magyar kereséshez. */
function norm(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function FormulaHub({ go, done }: Props) {
  const [query, setQuery] = useState('');
  const [volFilter, setVolFilter] = useState<0 | 1 | 2 | 3>(0);
  const [catFilter, setCatFilter] = useState<FormulaCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const tokens = useMemo(
    () =>
      norm(query)
        .split(/\s+/)
        .filter(Boolean),
    [query]
  );

  const matchedSections = useMemo(() => {
    if (tokens.length === 0) return [];
    const out: { id: string; title: string; chN: number; chTitle: string; volume: 1 | 2 | 3 }[] = [];
    for (const ch of TOC) {
      if (volFilter !== 0 && ch.volume !== volFilter) continue;
      for (const sec of ch.sections) {
        if (!SECTIONS[sec.id]) continue;
        const hay = norm(`${sec.id} ${sec.title} ${ch.n} ${ch.title} ${VOLUME_TITLES[ch.volume]}`);
        if (tokens.every((t) => hay.includes(t))) {
          out.push({ id: sec.id, title: sec.title, chN: ch.n, chTitle: ch.title, volume: ch.volume });
        }
      }
    }
    return out;
  }, [tokens, volFilter]);

  const matchedFormulas = useMemo(() => {
    return FORMULAS.filter((f) => {
      if (volFilter !== 0 && f.volume !== volFilter) return false;
      if (catFilter !== 'all' && f.category !== catFilter) return false;
      if (tokens.length === 0) return true;
      const hay = norm(`${f.section} ${f.title} ${f.note} ${f.tags} ${f.tex}`);
      return tokens.every((t) => hay.includes(t));
    });
  }, [tokens, volFilter, catFilter]);

  const catColor = (id: FormulaCategory) =>
    FORMULA_CATEGORIES.find((c) => c.id === id)?.color ?? '#38bdf8';

  const catLabel = (id: FormulaCategory) =>
    FORMULA_CATEGORIES.find((c) => c.id === id)?.label ?? id;

  const copyTex = (id: string, tex: string) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(tex).catch(() => {});
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1500);
  };

  return (
    <div className="fhub">
      <div className="fhub-hero">
        <h1>Kereső és képletgyűjtemény</h1>
        <p className="fhub-sub">
          Azonnali ékezet-független keresés mind a <b>120 szakasz</b> és a <b>{FORMULAS.length} legfontosabb tétel / képlet</b> között (I–III. kötet). Gyorsbillentyű: <kbd>Ctrl</kbd>+<kbd>K</kbd>.
        </p>

        <div className="fhub-search-wrap">
          <span className="fhub-search-ico" aria-hidden>⌕</span>
          <input
            ref={inputRef}
            type="search"
            className="fhub-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && query) {
                e.preventDefault();
                setQuery('');
              }
            }}
            placeholder="Keresés szakaszra, tételre vagy képletre… (pl. Gauss, Stokes, 15.6, Taylor, parciális)"
            aria-label="Keresés szakaszok és képletek között"
          />
          {query && (
            <button type="button" className="fhub-clear" onClick={() => setQuery('')} aria-label="Törlés">
              ✕
            </button>
          )}
        </div>

        <div className="fhub-filters">
          <div className="fhub-pill-row" role="group" aria-label="Kötet szűrő">
            {([0, 1, 2, 3] as const).map((v) => (
              <button
                key={v}
                type="button"
                className={`fhub-pill ${volFilter === v ? 'on' : ''}`}
                style={v !== 0 ? { ['--pc' as string]: VOL_COLORS[v][0] } : undefined}
                onClick={() => setVolFilter(v)}
              >
                {v === 0 ? 'Mind a 3 kötet' : `${'I'.repeat(v)}. kötet`}
              </button>
            ))}
          </div>

          <div className="fhub-pill-row" role="group" aria-label="Témakör szűrő">
            <button
              type="button"
              className={`fhub-pill ${catFilter === 'all' ? 'on' : ''}`}
              onClick={() => setCatFilter('all')}
            >
              Minden témakör
            </button>
            {FORMULA_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`fhub-pill ${catFilter === c.id ? 'on' : ''}`}
                style={{ ['--pc' as string]: c.color }}
                onClick={() => setCatFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tokens.length > 0 && (
        <section className="fhub-sec-results">
          <h2 className="fhub-h2">
            Talált szakaszok <span className="fhub-cnt">{matchedSections.length}</span>
          </h2>
          {matchedSections.length === 0 ? (
            <p className="hint">Nincs a keresésnek megfelelő szakaszcím.</p>
          ) : (
            <div className="fhub-sec-grid">
              {matchedSections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="fhub-sec-card"
                  style={{ ['--vc' as string]: VOL_COLORS[s.volume][0] }}
                  onClick={() => go(s.id)}
                >
                  <span className="fhub-sec-id">{s.id}</span>
                  <span className="fhub-sec-body">
                    <b>{s.title}</b>
                    <small>
                      {s.chN}. fejezet: {s.chTitle}
                    </small>
                  </span>
                  {done?.has(s.id) && <span className="done-check" title="Elvégezve">✓</span>}
                  <span className="fhub-arrow">→</span>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="fhub-formulas">
        <h2 className="fhub-h2">
          Képletek és alaptételek <span className="fhub-cnt">{matchedFormulas.length}</span>
        </h2>
        {matchedFormulas.length === 0 ? (
          <div className="card">
            <p className="hint">Nincs a szűrőknek megfelelő képlet. Próbálj másik kulcsszót vagy töröld a szűrőt!</p>
          </div>
        ) : (
          <div className="fhub-grid">
            {matchedFormulas.map((f) => (
              <article
                key={f.id}
                className="fcard"
                style={{ ['--fc' as string]: catColor(f.category) }}
              >
                <div className="fcard-head">
                  <span className="fcard-cat">{catLabel(f.category)}</span>
                  <button
                    type="button"
                    className="fcard-sec-btn"
                    onClick={() => go(f.section)}
                    title={`Ugrás a ${f.section}. szakaszhoz`}
                  >
                    {f.section}. szakasz →
                  </button>
                </div>
                <h3 className="fcard-title">{f.title}</h3>
                <div className="fcard-math">
                  <M t={f.tex} block />
                </div>
                <div className="fcard-foot">
                  <p className="fcard-note">{f.note}</p>
                  <button
                    type="button"
                    className={`fcard-copy ${copiedId === f.id ? 'ok' : ''}`}
                    onClick={() => copyTex(f.id, f.tex)}
                    title="LaTeX képlet másolása vágólapra"
                  >
                    {copiedId === f.id ? '✓ Másolva' : 'LaTeX'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
