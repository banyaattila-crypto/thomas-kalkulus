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
