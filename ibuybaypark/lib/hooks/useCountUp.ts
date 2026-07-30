'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Counts a figure up when it first enters view, once.
 *
 * The returned value starts at `end` rather than at zero, so a server render —
 * or a client with JavaScript disabled — shows the real number rather than
 * "$0". The count only ever winds back to its start once we know the element
 * is about to be watched.
 *
 * Under reduced motion the figure simply stays at its final value.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  end: number,
  duration: number = 1600,
  start: number = 0
) {
  const ref = useRef<T>(null);
  const [count, setCount] = useState(end);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReduced) {
      setCount(end);
      return;
    }

    let frame = 0;
    let startedAt = 0;

    const step = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min((now - startedAt) / duration, 1);
      // Quartic ease-out: fast to settle, long tail, no bounce.
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          setCount(start);
          frame = requestAnimationFrame(step);
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 }
    );

    observer.observe(element);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [end, start, duration, prefersReduced]);

  return { ref, count };
}
