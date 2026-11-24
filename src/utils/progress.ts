import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'thomas-kalkulus-done-v1';

function readDone(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

function writeDone(set: Set<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // Privát böngészés vagy korlátozott tároló esetén csendben kihagyjuk.
  }
}

/** A tanuló által elvégzettnek jelölt szakaszok (localStorage-ban tárolva). */
export function useProgress() {
  const [done, setDone] = useState<Set<string>>(readDone);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setDone(readDone());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      writeDone(next);
      return next;
    });
  }, []);

  const isDone = useCallback((id: string) => done.has(id), [done]);

  return { done, toggle, isDone, count: done.size };
}
