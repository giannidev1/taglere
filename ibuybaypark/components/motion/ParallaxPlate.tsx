'use client';

import Image from 'next/image';
import type { Plate } from '@/lib/imagery';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { useGsapScope, gsap } from '@/lib/hooks/useGsapScope';

interface ParallaxPlateProps {
  plate: Plate;
  /** How far the photograph travels across the section, in percent. */
  strength?: number;
  /** Tailwind classes for the wash laid over the photograph. */
  overlayClassName?: string;
  className?: string;
  /** Opacity of the photograph itself. */
  opacity?: number;
  priority?: boolean;
}

/**
 * A full-bleed photograph that translates more slowly than the section it sits
 * in. The image layer is overscanned top and bottom so the travel can never
 * expose an edge, which is also what keeps this from ever shifting layout.
 *
 * Decorative by default: plates whose `alt` is empty are hidden from assistive
 * technology entirely.
 */
export default function ParallaxPlate({
  plate,
  strength = 12,
  overlayClassName = '',
  className = '',
  opacity = 1,
  priority = false,
}: ParallaxPlateProps) {
  const prefersReduced = usePrefersReducedMotion();

  const scope = useGsapScope<HTMLDivElement>((root) => {
    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: '(min-width: 768px)', isMobile: '(max-width: 767px)' },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        // Touch gets a gentler version of the same idea, never a 1:1 port.
        const travel = strength * (isMobile ? 0.4 : 1);

        gsap.fromTo(
          root.querySelector('[data-plate]'),
          { yPercent: -travel / 2 },
          {
            yPercent: travel / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    );
  }, !prefersReduced);

  const decorative = plate.alt === '';

  return (
    <div
      ref={scope}
      aria-hidden={decorative ? 'true' : undefined}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Overscanned so parallax travel never reveals the container edge. */}
      <div data-plate className="absolute -top-[14%] -bottom-[14%] left-0 right-0">
        <Image
          src={plate.src}
          alt={plate.alt}
          fill
          sizes="100vw"
          quality={72}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-cover"
          style={{ opacity }}
        />
      </div>

      {overlayClassName ? (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      ) : null}
    </div>
  );
}
