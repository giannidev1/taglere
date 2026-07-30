'use client';

import { Ban, Banknote, CalendarClock, Wrench, EyeOff, FileCheck } from 'lucide-react';
import Reveal from '../motion/Reveal';

const BENEFITS = [
  {
    icon: Ban,
    title: 'No commissions',
    description:
      'There’s no agent in the middle, so nothing comes off the top. What we agree on is what you get.',
  },
  {
    icon: Banknote,
    title: 'All cash',
    description:
      'No loan, no appraisal contingency, no financing falling through two weeks before closing.',
  },
  {
    icon: CalendarClock,
    title: 'Close on your date',
    description:
      'As fast as about a week, or months out if you need time to find your next place. You choose.',
  },
  {
    icon: Wrench,
    title: 'Sell as-is',
    description:
      'No repairs, no cleaning, no staging, no punch list. Leave what you don’t want to move.',
  },
  {
    icon: EyeOff,
    title: 'No showings',
    description:
      'No open houses, no lockbox, no strangers walking through your home on a Sunday afternoon.',
  },
  {
    icon: FileCheck,
    title: 'Complicated is fine',
    description:
      'Tenants in place, probate or trust sales, deferred maintenance, liens. Just tell me up front.',
  },
] as const;

/**
 * Six plain statements on a rule grid. No cards, no shadows, no hover lift —
 * the reveal staggers in reading order and then the section sits still.
 */
export default function Benefits() {
  return (
    <section id="benefits" className="relative z-10 bg-sand px-6 py-24 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <Reveal as="h2" className="text-section">
            What you don&rsquo;t deal with.
          </Reveal>
          <Reveal as="p" delay={90} className="mt-6 text-lg text-ink-muted">
            The whole point is that selling shouldn&rsquo;t take over your life.
          </Reveal>
        </header>

        {/* One-pixel grid gaps over a stucco background draw the rules, so the
            hairlines stay correct at every breakpoint without per-cell border
            juggling. */}
        <ul className="mt-16 grid gap-px border-y border-stucco bg-stucco sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal
                as="li"
                key={benefit.title}
                delay={index * 70}
                className="bg-sand p-8 lg:p-9"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="h-7 w-7 text-accent-deep"
                />
                <h3 className="mt-5 text-xl text-ink">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {benefit.description}
                </p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120} className="mx-auto mt-20 max-w-measure text-center">
          <p className="text-lg leading-relaxed text-ink-soft">
            A cash sale isn&rsquo;t right for everyone. If listing your home on the open
            market would genuinely net you more, I&rsquo;ll say so rather than waste your
            time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
