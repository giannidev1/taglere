'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the OS reduced-motion preference, and keeps tracking it — a visitor
 * who flips the setting mid-session gets the change without a reload.
 *
 * Defaults to `false` so the server render matches the first client render.
 * The CSS in globals.css independently forces every animated element to its
 * final state under reduced motion, so nothing depends on this hook running.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPrefersReduced(query.matches);

    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return prefersReduced;
}
