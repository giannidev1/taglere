'use client';

import { useEffect, useRef } from 'react';
import type { gsap as GsapType } from 'gsap';

let pluginPromise: Promise<typeof GsapType> | null = null;

/**
 * Loads GSAP and ScrollTrigger on demand, once, and registers the plugin.
 *
 * Deliberately a dynamic import. GSAP plus ScrollTrigger is around 100kB of
 * JavaScript, and statically importing it put the whole library on the
 * critical path — competing for bandwidth with the hero photograph it exists
 * to animate. Motion code should never delay the first paint of the thing it
 * moves, so it now arrives in its own chunk after the page is interactive.
 */
async function loadGsap() {
  if (!pluginPromise) {
    pluginPromise = (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      // Pin and scrub positions are measured from laid-out boxes. Images
      // finishing late would leave every trigger measured against the wrong
      // height, so re-measure once the load event lands.
      if (document.readyState !== 'complete') {
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
      } else {
        ScrollTrigger.refresh();
      }

      return gsap;
    })();
  }

  return pluginPromise;
}

/**
 * Runs GSAP setup inside a context scoped to the returned ref, and reverts it
 * on unmount. `ctx.revert()` kills every tween AND every ScrollTrigger created
 * inside the callback, which is what stops pinned or scrubbed sections leaking
 * scroll handlers across navigations.
 *
 * Pass `enabled: false` — reduced motion, or a viewport where the effect
 * shouldn't run — and GSAP is never even fetched. The element keeps whatever
 * static styles it already has.
 */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  setup: (scope: T, gsap: typeof GsapType) => void,
  enabled: boolean = true
) {
  const ref = useRef<T>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const scope = ref.current;
    if (!enabled || !scope) return;

    let context: { revert: () => void } | undefined;
    let cancelled = false;

    loadGsap().then((gsap) => {
      // The component may have unmounted, or the preference may have flipped,
      // while the chunk was in flight.
      if (cancelled || !ref.current) return;
      context = gsap.context(() => setupRef.current(scope, gsap), scope);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [enabled]);

  return ref;
}
