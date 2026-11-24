import { ReactNode, useState } from 'react';

export function Story({ children }: { children: ReactNode }) {
  return (
    <aside className="story">
      <span className="tag">Történet</span>
      {children}
    </aside>
  );
}

export function Def({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="def">
      <div className="def-title">{title}</div>
      {children}
    </div>
  );
}

export function Warn({ children }: { children: ReactNode }) {
  return (
    <div className="warn">
      <strong>Vigyázat. </strong>
      {children}
    </div>
  );
}

/** Feladat, amelynek megoldása külön gombbal nyitható. */
export function Task({ n, q, children }: { n: number; q: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="task">
      <div className="task-q">
        <span className="task-n">{n}.</span>
        <div>{q}</div>
      </div>
      <button className="reveal" onClick={() => setOpen(!open)}>
        {open ? 'Megoldás elrejtése' : 'Megoldás mutatása'}
      </button>
      {open && <div className="task-a">{children}</div>}
    </div>
  );
}

export type QuizOption = { label: ReactNode; ok?: boolean };

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** Azonnali visszajelzéses, feleletválasztós gyorsteszt magyarázattal. */
export function Quiz({
  title = 'Gyorsteszt',
  q,
  options,
  explain,
}: {
  title?: string;
  q: ReactNode;
  options: QuizOption[];
  explain: ReactNode;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const isOk = answered && Boolean(options[picked]?.ok);

  return (
    <div className="quiz">
      <div className="quiz-head">
        <span className="quiz-tag">{title}</span>
        {answered && (
          <button className="quiz-reset" onClick={() => setPicked(null)}>
            Újrapróbálás
          </button>
        )}
      </div>
      <div className="quiz-q">{q}</div>
      <div className="quiz-opts">
        {options.map((opt, i) => {
          const cls = !answered
            ? ''
            : opt.ok
              ? 'ok'
              : i === picked
                ? 'bad'
                : 'dim';
          return (
            <button
              key={i}
              type="button"
              className={`quiz-opt ${cls}`}
              disabled={answered}
              onClick={() => setPicked(i)}
            >
              <span className="quiz-let">{LETTERS[i] ?? i + 1}</span>
              <span className="quiz-lbl">{opt.label}</span>
              {answered && opt.ok && <span className="quiz-mark" aria-hidden>✓</span>}
              {answered && i === picked && !opt.ok && <span className="quiz-mark" aria-hidden>✗</span>}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`quiz-fb ${isOk ? 'ok' : 'bad'}`}>
          <strong>{isOk ? 'Helyes! ' : 'Nem egészen. '}</strong>
          {explain}
        </div>
      )}
    </div>
  );
}

export type StepItem = { title: string; body: ReactNode };

/** Lépésenként kibontható kidolgozott példa-kártya. */
export function Steps({
  title,
  problem,
  steps,
}: {
  title: string;
  problem: ReactNode;
  steps: StepItem[];
}) {
  const [shown, setShown] = useState(1);
  const allOpen = shown >= steps.length;

  return (
    <div className="steps-box">
      <div className="steps-head">
        <span className="steps-tag">Lépésről lépésre</span>
        <span className="steps-title">{title}</span>
      </div>
      <div className="steps-prob">{problem}</div>
      <ol className="steps-list">
        {steps.slice(0, shown).map((st, i) => (
          <li key={i} className="steps-item">
            <span className="steps-num">{i + 1}</span>
            <div className="steps-body">
              <div className="steps-st">{st.title}</div>
              <div>{st.body}</div>
            </div>
          </li>
        ))}
      </ol>
      <div className="steps-ctrl">
        {!allOpen && (
          <button type="button" className="steps-btn primary" onClick={() => setShown((n) => Math.min(steps.length, n + 1))}>
            Következő lépés ({shown}/{steps.length})
          </button>
        )}
        {!allOpen ? (
          <button type="button" className="steps-btn" onClick={() => setShown(steps.length)}>
            Összes lépés mutatása
          </button>
        ) : (
          <button type="button" className="steps-btn" onClick={() => setShown(1)}>
            Vissza az 1. lépéshez
          </button>
        )}
      </div>
    </div>
  );
}
