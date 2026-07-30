'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Home, FileText, Key } from 'lucide-react';
import ParallaxPlate from '../motion/ParallaxPlate';
import { PLATES } from '@/lib/imagery';

const STEPS = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Tell me about your home',
    description:
      'The form below takes about two minutes. No obligation and no cost — you can stop at any point.',
  },
  {
    number: '02',
    icon: Home,
    title: 'I walk the property',
    description:
      'Usually within 48 hours, at a time that suits you. Just me — no crew of inspectors, no contractors traipsing through.',
  },
  {
    number: '03',
    icon: FileText,
    title: 'A written cash offer',
    description:
      'Clear numbers with nothing buried in the fine print, and I will walk you through how I got to them.',
  },
  {
    number: '04',
    icon: Key,
    title: 'You pick the close date',
    description:
      'Normal escrow and title through a local company. About a week if you are in a hurry, or months out if you are not.',
  },
] as const;

/**
 * The page's single pinned moment.
 *
 * The pin is CSS `position: sticky`, not a ScrollTrigger pin — no pin-spacer
 * is injected, nothing is removed from flow, and the effect degrades to a
 * plain stacked list on small screens and with JavaScript disabled. That is
 * also what keeps it smooth on mid-range Android, where ScrollTrigger's pin
 * is the usual source of jank.
 *
 * Advancing through the steps is emphasis only: every step is always in the
 * DOM, always readable, and inactive steps stay above the AA contrast floor.
 * Nothing is hidden, so tab order and screen-reader order are untouched.
 */
export default function Process() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Fires as each step crosses the vertical middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const observed = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    observed.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      className="on-dark relative z-10 overflow-hidden bg-brand px-6 text-sand lg:px-8"
    >
      <ParallaxPlate
        plate={PLATES.canopy}
        strength={16}
        opacity={0.22}
        overlayClassName="bg-gradient-to-b from-brand via-brand/88 to-brand"
      />

      <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16">
        {/* The pinned panel. */}
        <div className="py-20 lg:col-span-5 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
          <h2 className="text-section text-sand-light">How it works.</h2>
          <p className="mt-6 text-lg text-sand/70">
            Four steps, and you can stop after any of them.
          </p>

          {/* Step counter, desktop only — it is a visual echo of the list
              beside it, so it is hidden from assistive tech. */}
          <div aria-hidden="true" className="mt-14 hidden lg:block">
            <span
              data-figure
              className="block font-display text-7xl leading-none text-accent transition-opacity duration-500 ease-settle"
            >
              {STEPS[active].number}
            </span>

            <div className="mt-8 flex gap-2">
              {STEPS.map((step, index) => (
                <span
                  key={step.number}
                  className={`h-px flex-1 origin-left transition-colors duration-500 ease-settle ${
                    index <= active ? 'bg-accent' : 'bg-sand/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* The advancing column. */}
        <ol className="lg:col-span-7 lg:py-[30svh]">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === active;

            return (
              <li
                key={step.number}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className="border-t border-sand/15 py-12 first:border-t-0 lg:flex lg:min-h-[52svh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0"
              >
                <div
                  className={`transition-opacity duration-700 ease-settle ${
                    isActive ? 'lg:opacity-100' : 'lg:opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className={`h-7 w-7 transition-colors duration-500 ease-settle ${
                        isActive ? 'text-accent' : 'text-sand/60'
                      }`}
                    />
                    <span data-figure className="text-eyebrow text-sand/60 lg:hidden">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl text-sand-light lg:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-measure text-lg leading-relaxed text-sand/75">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
