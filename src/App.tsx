import { useEffect, useMemo, useState } from 'react';
import { TOC, VOLUME_TITLES } from './data/toc';
import { CONTENT } from './content';

type Route = { section: string; page: number };

/** Hash-útvonal: #s1-1-p3  (szakasz 1.1, oldalindex 3, 0-tól). Hibás értéknél a nyitóoldalra esik vissza.
 *  Csak egyszerű #név alakú hash használható (a közzétételi keret nem enged #/útvonalat). */
function parseHash(): Route {
  const m = window.location.hash.match(/^#s(\d+)-(\d+)-p(\d+)$/);
  if (!m) return { section: '1.1', page: 0 };
  const section = `${m[1]}.${m[2]}`;
  const pages = CONTENT[section];
  if (!pages) return { section, page: 0 };
  return { section, page: Math.min(Number(m[3]), pages.length - 1) };
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (section: string, page = 0) => {
    window.location.hash = `#s${section.replace('.', '-')}-p${page}`;
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = CONTENT[route.section];
  const current = pages?.[route.page];

  const sectionInfo = useMemo(() => {
    for (const ch of TOC) {
      const sec = ch.sections.find((s) => s.id === route.section);
      if (sec) return { ch, sec };
    }
    return null;
  }, [route.section]);

  return (
    <div className="app">
      <div className="bg" aria-hidden />
      <header className="top">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü">
          ☰
        </button>
        <div className="brand">
          <span className="brand-title">Kalkulus</span>
          <span className="brand-sub">látványos tananyag</span>
        </div>
      </header>

      <div className="layout">
        <nav className={`side ${menuOpen ? 'open' : ''}`}>
          {[1, 2, 3].map((v) => (
            <div key={v} className="vol">
              <div className="vol-title">{VOLUME_TITLES[v]}</div>
              {TOC.filter((c) => c.volume === v).map((ch) => (
                <details key={ch.n} open={ch.n === sectionInfo?.ch.n}>
                  <summary>
                    <span className="ch-n">{ch.n}.</span> {ch.title}
                  </summary>
                  <ul>
                    {ch.sections.map((s) => {
                      const ready = Boolean(CONTENT[s.id]);
                      return (
                        <li key={s.id}>
                          <button
                            className={`sec ${s.id === route.section ? 'active' : ''} ${ready ? '' : 'soon'}`}
                            onClick={() => go(s.id)}
                          >
                            <span className="sec-id">{s.id}</span> {s.title}
                            {!ready && <em> · hamarosan</em>}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ))}
            </div>
          ))}
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
              <article className="card">
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
                <button disabled={route.page === pages.length - 1} onClick={() => go(route.section, route.page + 1)}>
                  Következő →
                </button>
              </div>
            </>
          ) : (
            <article className="card">
              <p>Ez a szakasz még készül. A menüből az elkészült szakaszokat érheted el.</p>
            </article>
          )}

          <footer className="foot">
            A tananyag a Thomas-féle Kalkulus (Typotex, 2006) tematikáját követi. A szöveg, a példák, a feladatok és az
            ábrák saját készítésűek; nem hivatalos kiegészítő.
          </footer>
        </main>
      </div>
    </div>
  );
}
