'use client';

import { useEffect, useState } from 'react';

/**
 * The hero's scroll indicator. Fades out permanently on the first scroll
 * input of any kind — wheel, touch, keyboard, or a jump from the nav.
 *
 * Decorative, so it is hidden from assistive tech; the nav and the hero CTAs
 * are the real navigation affordances.
 */
export default function ScrollCue() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (window.scrollY > 4) {
      setDismissed(true);
      return;
    }

    const dismiss = () => setDismissed(true);
    window.addEventListener('scroll', dismiss, { passive: true, once: true });
    return () => window.removeEventListener('scroll', dismiss);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-700 ease-drift ${
        dismissed ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span className="flex flex-col items-center gap-3">
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-sand/70">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-sand/25">
          <span className="cue-run absolute inset-x-0 top-0 block h-4 bg-accent" />
        </span>
      </span>
    </div>
  );
}
