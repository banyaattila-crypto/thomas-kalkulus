import { TOC, VOLUME_TITLES } from '../data/toc';
import { CONTENT } from '../content';

type Props = { go: (section: string, page?: number) => void };

const SUB: Record<number, string> = {
  1: 'Függvények, határérték, derivált',
  2: 'Integrálás és sorok alapjai',
  3: 'Több változó és vektoranalízis',
};

/** Egységes, kötetenként tagolt tartalomjegyzék haladásjelzéssel. */
export function TocPage({ go }: Props) {
  const all = TOC.flatMap((c) => c.sections);
  const done = all.filter((s) => CONTENT[s.id]).length;
  return (
    <div className="toc-page">
      <header className="toc-head">
        <h1>Tartalomjegyzék</h1>
        <div className="toc-total">
          <div className="bar">
            <i style={{ width: `${(done / all.length) * 100}%` }} />
          </div>
          <span>
            {done} / {all.length} szakasz kész
          </span>
        </div>
      </header>

      {[1, 2, 3].map((v) => {
        const chs = TOC.filter((c) => c.volume === v);
        const secs = chs.flatMap((c) => c.sections);
        const d = secs.filter((s) => CONTENT[s.id]).length;
        return (
          <section key={v} className="toc-vol">
            <div className="toc-vol-head">
              <div className="toc-vol-n">{'I'.repeat(v)}</div>
              <div>
                <h2>{VOLUME_TITLES[v]}</h2>
                <div className="toc-vol-sub">{SUB[v]}</div>
              </div>
              <div className="toc-vol-prog">
                {d}/{secs.length}
              </div>
            </div>
            <div className="toc-grid">
              {chs.map((ch) => (
                <div key={ch.n} className="toc-ch">
                  <div className="toc-ch-head">
                    <span className="toc-ch-n">{ch.n}</span>
                    <span className="toc-ch-t">{ch.title}</span>
                  </div>
                  <ul>
                    {ch.sections.map((s) => {
                      const ready = Boolean(CONTENT[s.id]);
                      return (
                        <li key={s.id}>
                          <button className={ready ? 'ready' : 'soon'} disabled={!ready} onClick={() => go(s.id)}>
                            <span className="id">{s.id}</span>
                            <span className="t">{s.title}</span>
                            <span className="st">{ready ? 'kész' : '·'}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
