import { useEffect, useMemo, useState } from 'react';
import { TOC, VOLUME_TITLES } from './data/toc';
import { getCachedSection, loadSection, Page, SECTIONS } from './content';
import { Cover } from './components/Cover';
import { TocPage, SUB, VOL_COLORS, CH_COLORS } from './components/TocPage';
import { FormulaHub } from './components/FormulaHub';
import { VERSION } from './version';
import { useProgress } from './utils/progress';

type Route = { view: 'cover' | 'toc' | 'formulas' | 'section'; section: string; page: number };

/** Hash-útvonal: #s1-1-p3  (szakasz 1.1, oldalindex 3, 0-tól). Hibás értéknél a nyitóoldalra esik vissza.
 *  Csak egyszerű #név alakú hash használható (a közzétételi keret nem enged #/útvonalat). */
function parseHash(): Route {
  const h = window.location.hash;
  if (h === '#toc') return { view: 'toc', section: '1.1', page: 0 };
  if (h === '#formulas') return { view: 'formulas', section: '1.1', page: 0 };
  const m = h.match(/^#s(\d+)-(\d+)-p(\d+)$/);
  if (!m) return { view: 'cover', section: '1.1', page: 0 };
  const section = `${m[1]}.${m[2]}`;
  const entry = SECTIONS[section];
  if (!entry) return { view: 'section', section, page: 0 };
  return { view: 'section', section, page: Math.min(Number(m[3]), entry.pages - 1) };
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState<{ id: string; pages: Page[] } | null>(() => {
    const initial = parseHash();
    const cached = initial.view === 'section' ? getCachedSection(initial.section) : undefined;
    return cached ? { id: initial.section, pages: cached } : null;
  });
  const [loadError, setLoadError] = useState<string | null>(null);
  const progress = useProgress();

  const allSecs = TOC.flatMap((c) => c.sections);
  const readyAll = allSecs.filter((s) => SECTIONS[s.id]).length;

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.location.hash = '#formulas';
        setMenuOpen(false);
        window.scrollTo({ top: 0 });
      }
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (route.view !== 'section') return;
    if (!SECTIONS[route.section]) {
      setLoaded(null);
      setLoadError(null);
      return;
    }
    const cached = getCachedSection(route.section);
    if (cached) {
      setLoaded({ id: route.section, pages: cached });
      setLoadError(null);
      return;
    }
    let cancelled = false;
    setLoadError(null);
    loadSection(route.section)
      .then((pages) => {
        if (!cancelled && pages) setLoaded({ id: route.section, pages });
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : 'Nem sikerült betölteni a szakaszt.');
      });
    return () => {
      cancelled = true;
    };
  }, [route.view, route.section]);

  const go = (section: string, page = 0) => {
    window.location.hash = `#s${section.replace('.', '-')}-p${page}`;
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goView = (v: 'cover' | 'toc' | 'formulas') => {
    window.location.hash = v === 'toc' ? '#toc' : v === 'formulas' ? '#formulas' : '#cover';
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  const hasSection = Boolean(SECTIONS[route.section]);
  const pages = loaded?.id === route.section ? loaded.pages : undefined;
  const current = pages?.[Math.min(route.page, (pages?.length ?? 1) - 1)];

  const sectionInfo = useMemo(() => {
    for (const ch of TOC) {
      const sec = ch.sections.find((s) => s.id === route.section);
      if (sec) return { ch, sec };
    }
    return null;
  }, [route.section]);

  if (route.view === 'cover') {
    return (
      <div className="app">
        <div className="bg" aria-hidden />
        <Cover onToc={() => goView('toc')} onStart={() => go('1.1')} doneCount={progress.count} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="bg" aria-hidden />
      <header className="top">
        {route.view === 'section' && (
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü">
            ☰
          </button>
        )}
        <button className="brand" onClick={() => goView('cover')} title="Nyitóoldal">
          <span className="brand-title">Kalkulus</span>
          <span className="brand-sub">látványos tananyag</span>
        </button>
        <span className="top-sp" />
        <button
          className={`top-link ${route.view === 'formulas' ? 'on' : ''}`}
          onClick={() => goView('formulas')}
          title="Gyorskereső és képletgyűjtemény (Ctrl+K)"
        >
          ⌕ Kereső & Képletek
        </button>
        <button className={`top-link ${route.view === 'toc' ? 'on' : ''}`} onClick={() => goView('toc')}>
          Tartalom
        </button>
        <span className="ver">v{VERSION}</span>
      </header>

      {route.view === 'toc' ? (
        <TocPage go={go} done={progress.done} />
      ) : route.view === 'formulas' ? (
        <FormulaHub go={go} done={progress.done} />
      ) : (
        <div className="layout">
          <nav className={`side ${menuOpen ? 'open' : ''}`}>
            <button className="side-all" onClick={() => goView('toc')}>
              <span className="side-all-t">Tartalomjegyzék</span>
              <span className="side-all-bar">
                <i style={{ width: `${(readyAll / allSecs.length) * 100}%` }} />
              </span>
              <span className="side-all-n">
                {readyAll} / {allSecs.length} szakasz kész
                {progress.count > 0 ? ` · ${progress.count} elvégezve` : ''}
              </span>
            </button>
            {[1, 2, 3].map((v) => {
              const chs = TOC.filter((c) => c.volume === v);
              const secs = chs.flatMap((c) => c.sections);
              const d = secs.filter((s) => SECTIONS[s.id]).length;
              const [c1, c2] = VOL_COLORS[v];
              return (
                <div key={v} className="vol" style={{ ['--va' as string]: c1, ['--vb' as string]: c2 }}>
                  <div className="vol-head">
                    <span className="vol-n">{'I'.repeat(v)}</span>
                    <span className="vol-txt">
                      <b>{VOLUME_TITLES[v]}</b>
                      <small>{SUB[v]}</small>
                    </span>
                    <span className="vol-cnt">
                      {d}/{secs.length}
                    </span>
                  </div>
                  {chs.map((ch) => {
                    const done = ch.sections.filter((s) => SECTIONS[s.id]).length;
                    const cur = ch.n === sectionInfo?.ch.n;
                    return (
                      <details
                        key={ch.n}
                        open={cur}
                        className={`chd ${cur ? 'cur' : ''} ${done ? 'started' : ''}`}
                        style={{ ['--c' as string]: CH_COLORS[(ch.n - 1) % CH_COLORS.length] }}
                      >
                        <summary>
                          <span className="ch-badge">{ch.n}</span>
                          <span className="ch-name">{ch.title}</span>
                          <span className="ch-cnt">
                            {done}/{ch.sections.length}
                          </span>
                          <span className="ch-chev" aria-hidden />
                        </summary>
                        <ol className="stl">
                          {ch.sections.map((s) => {
                            const ready = Boolean(SECTIONS[s.id]);
                            return (
                              <li key={s.id} className={ready ? 'ready' : 'soon'}>
                                <button
                                  className={`sec ${s.id === route.section ? 'active' : ''}`}
                                  disabled={!ready}
                                  title={ready ? undefined : 'Hamarosan'}
                                  onClick={() => go(s.id)}
                                >
                                  <span className="snode" />
                                  <span className="sec-id">{s.id}</span>
                                  <span className="sec-t">{s.title}</span>
                                  {progress.isDone(s.id) && (
                                    <span className="done-check" title="Elvégezve" aria-label="Elvégezve">
                                      ✓
                                    </span>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ol>
                      </details>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          <main className="main">
            {sectionInfo && (
              <div className="crumbs">
                {VOLUME_TITLES[sectionInfo.ch.volume]} · {sectionInfo.ch.n}. fejezet: {sectionInfo.ch.title}
              </div>
            )}
            {sectionInfo && (
              <h1>
                <span className="h1-id">{sectionInfo.sec.id}.</span> {sectionInfo.sec.title}
                {progress.isDone(route.section) && <span className="h1-done">✓ Elvégezve</span>}
              </h1>
            )}

            {current && pages ? (
              <>
                <div className="dots-nav">
                  {pages.map((p, i) => (
                    <button
                      key={p.title}
                      className={`dot ${i === route.page ? 'on' : ''}`}
                      onClick={() => go(route.section, i)}
                      title={p.title}
                      aria-label={`${i + 1}. oldal: ${p.title}`}
                    />
                  ))}
                </div>
                <article key={`${route.section}-${route.page}`} className="card">
                  <h2>
                    <span className="pg">
                      {route.page + 1}/{pages.length}
                    </span>{' '}
                    {current.title}
                  </h2>
                  {current.body}
                </article>
                <div className="pager">
                  <button disabled={route.page === 0} onClick={() => go(route.section, route.page - 1)}>
                    ← Előző
                  </button>
                  <button
                    type="button"
                    className={`done-btn ${progress.isDone(route.section) ? 'on' : ''}`}
                    onClick={() => progress.toggle(route.section)}
                  >
                    {progress.isDone(route.section) ? '✓ Szakasz elvégezve' : '○ Megjelölés késznek'}
                  </button>
                  <button disabled={route.page === pages.length - 1} onClick={() => go(route.section, route.page + 1)}>
                    Következő →
                  </button>
                </div>
              </>
            ) : hasSection ? (
              <article className="card">
                {loadError ? (
                  <p>Hiba a szakasz betöltésekor: {loadError}</p>
                ) : (
                  <p>Szakasz betöltése…</p>
                )}
              </article>
            ) : (
              <article className="card">
                <p>Ez a szakasz még készül. A menüből az elkészült szakaszokat érheted el.</p>
              </article>
            )}

            <footer className="foot">
              A tananyag a Thomas-féle Kalkulus (Typotex, 2006) tematikáját követi. A szöveg, a példák, a feladatok és az
              ábrák saját készítésűek; nem hivatalos kiegészítő. Verzió: {VERSION}.
            </footer>
          </main>
        </div>
      )}
    </div>
  );
}
