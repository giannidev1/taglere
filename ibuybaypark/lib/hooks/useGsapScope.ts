'use client';

import { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** useLayoutEffect warns during SSR; effects never run on the server anyway. */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

let pluginRegistered = false;
let refreshBound = false;

function prepare() {
  if (!pluginRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    pluginRegistered = true;
  }

  // Pin and scrub start positions are measured from laid-out boxes. Images
  // finishing late would otherwise leave every trigger measured against the
  // wrong height, so re-measure once the load event lands.
  if (!refreshBound && typeof window !== 'undefined') {
    refreshBound = true;
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }
}

/**
 * Runs GSAP setup inside a context scoped to the returned ref, and reverts it
 * on unmount. `ctx.revert()` kills every tween AND every ScrollTrigger created
 * inside the callback, which is what keeps pinned sections from leaking
 * scroll handlers across navigations.
 *
 * Pass `enabled: false` (reduced motion, or a viewport where the effect
 * shouldn't run) and no GSAP code executes at all — the element keeps whatever
 * static styles it already has.
 */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  setup: (scope: T) => void,
  enabled: boolean = true
) {
  const ref = useRef<T>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useIsomorphicLayoutEffect(() => {
    const scope = ref.current;
    if (!enabled || !scope) return;

    prepare();

    const ctx = gsap.context(() => setupRef.current(scope), scope);
    return () => ctx.revert();
  }, [enabled]);

  return ref;
}

export { gsap, ScrollTrigger };
