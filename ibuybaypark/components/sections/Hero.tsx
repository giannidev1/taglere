'use client';

import Image from 'next/image';
import { ButtonLink } from '../ui/Button';
import MaskedLines from '../motion/MaskedLines';
import ScrollCue from '../motion/ScrollCue';
import { PLATES } from '@/lib/imagery';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { useGsapScope } from '@/lib/hooks/useGsapScope';

/**
 * The hero is a fixed backdrop with a spacer of the same height in normal
 * flow. Scrolling moves the page over it, so the next section genuinely slides
 * across the hero rather than the hero scrolling away — the brief's
 * first-preference transition, scrubbed to scroll progress rather than timed.
 *
 * Three depth planes move at different rates: the photograph slowest, the
 * atmospheric haze at roughly double that, the type fastest. On top of the
 * scroll-linked motion the photograph carries a slow continuous drift, so the
 * hero is never dead when idle.
 *
 * The spacer reserves the hero's full height before anything animates, so none
 * of this can shift layout.
 */
export default function Hero() {
  const prefersReduced = usePrefersReducedMotion();

  const scope = useGsapScope<HTMLDivElement>((root, gsap) => {
    const stage = root.querySelector<HTMLElement>('[data-stage]');
    if (!stage) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        // Parallax on touch is reduced in amplitude, not ported one for one.
        const amp = isMobile ? 0.4 : 1;

        // Ambient drift: light moving across a hillside, not a Ken Burns zoom.
        // It lives on its own element so it never fights the scroll tween.
        gsap.to('[data-ambient]', {
          scale: 1.06,
          xPercent: -1.4,
          yPercent: -0.8,
          duration: 22,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
          .to('[data-plane="far"]', { yPercent: 6 * amp, ease: 'none' }, 0)
          .to('[data-plane="mid"]', { yPercent: 14 * amp, ease: 'none' }, 0)
          .to(
            '[data-plane="near"]',
            { yPercent: 26 * amp, scale: 0.96, opacity: 0, ease: 'none' },
            0
          )
          .to('[data-dim]', { opacity: 0.75, ease: 'none' }, 0);

        // Once the page has fully covered the hero there is nothing left to
        // paint, so drop it out of the compositor until it scrolls back.
        gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'bottom top',
            onEnter: () => stage.style.setProperty('visibility', 'hidden'),
            onLeaveBack: () => stage.style.removeProperty('visibility'),
          },
        });
      }
    );
  }, !prefersReduced);

  return (
    // Spacer in normal flow. Reserves the hero's height so the fixed stage
    // behind it can never cause a shift.
    <div ref={scope} className="relative h-svh">
      <section
        data-stage
        className="on-dark hero-gradient fixed inset-0 z-0 h-svh overflow-hidden bg-brand-deep"
      >
        {/* Plane 1 — the photograph. Slowest. */}
        <div data-plane="far" className="absolute inset-0">
          <div data-ambient className="absolute inset-0">
            <Image
              src={PLATES.hero.src}
              alt={PLATES.hero.alt}
              fill
              priority
              sizes="100vw"
              quality={64}
              className="object-cover object-[center_60%]"
            />
          </div>
        </div>

        {/* Plane 2 — atmospheric haze and the readability scrim. */}
        <div
          data-plane="mid"
          aria-hidden="true"
          className="hero-scrim absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="grain pointer-events-none absolute inset-0"
        />

        {/* Dimmer, driven by scroll progress as the page slides over. */}
        <div
          data-dim
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-brand-deep opacity-0"
        />

        {/* Plane 3 — the type. Fastest. */}
        <div
          data-plane="near"
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center lg:px-8"
        >
          <p className="text-eyebrow mb-7 uppercase text-accent-soft">
            Bay Park · San Diego · 92110 &amp; 92117
          </p>

          <h1 className="text-hero max-w-5xl text-sand-light">
            <MaskedLines
              lines={['Sell your Bay Park home.', 'Cash, on your timeline.']}
              lineClassName={(index) => (index === 1 ? 'text-accent-soft italic' : '')}
            />
          </h1>

          <p className="text-subheading mt-7 max-w-xl text-sand/85">
            No commissions. No repairs. No showings.
          </p>

          <div className="mt-11 flex flex-col items-center gap-6">
            <ButtonLink href="#contact" size="lg">
              Get my cash offer
            </ButtonLink>

            <a
              href="#calculator"
              className="wipe-link text-sm text-sand/80 transition-colors duration-300 hover:text-sand-light"
            >
              See what a traditional sale actually costs
            </a>
          </div>

          <p className="mt-14 max-w-md text-sm text-sand/70">
            I&rsquo;ve lived in Bay Park. Licensed California broker, DRE #02250353.
          </p>
        </div>

        <ScrollCue />
      </section>
    </div>
  );
}
