'use client';

import { useEffect, useState } from 'react';

const STOPS = [
  { id: 'top', label: 'Bay Park' },
  { id: 'ledger', label: 'The arithmetic' },
  { id: 'terms', label: 'Terms' },
  { id: 'gianni', label: 'Who I am' },
  { id: 'how', label: 'How it goes' },
  { id: 'questions', label: 'Questions' },
  { id: 'offer', label: 'Ask for a number' },
];

/**
 * The left margin of a plat map: a drawn line, tick marks, and a marker that
 * tracks position. On narrow screens it collapses to a hairline progress bar.
 *
 * This is the page's only scroll-driven motion — everything else stays still.
 */
export default function Rail() {
  const [active, setActive] = useState('top');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);

      // The stop whose top edge is closest to a third of the way down.
      const line = window.innerHeight * 0.34;
      let current = STOPS[0].id;
      for (const stop of STOPS) {
        const el = document.getElementById(stop.id);
        if (el && el.getBoundingClientRect().top <= line) current = stop.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const go = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="s-progress" style={{ width: `${progress}%` }} />

      <nav className="s-rail" aria-label="Sections" data-dark={active === 'top'}>
        {STOPS.map((stop, i) => (
          <button
            key={stop.id}
            type="button"
            className="s-rail-item"
            data-on={active === stop.id}
            style={{ animationDelay: `${0.5 + i * 0.06}s` }}
            onClick={() => go(stop.id)}
          >
            {stop.label}
          </button>
        ))}
      </nav>
    </>
  );
}
