'use client';

import { useCountUp } from '@/lib/hooks/useCountUp';
import Reveal from '../motion/Reveal';
import {
  BAY_PARK_MEDIAN_PRICE,
  calculateTraditionalSaleCosts,
  formatCurrency,
} from '@/lib/sellingCosts';

const LISTING_COSTS = [
  'Agent commissions',
  'Escrow, title & transfer tax',
  'Repairs, cleaning & staging',
  'Buyer credits after inspection',
  'Two months of carrying costs',
  'Showings, open houses, and no certainty',
];

const DIRECT_COSTS = [
  'No commission — there’s no agent in the middle',
  'I cover standard closing costs',
  'No repairs, no cleaning, no staging',
  'No inspection renegotiation',
  'No carrying months — you pick the date',
  'No showings and no open houses',
];

/**
 * The first section the visitor meets after the hero, and the one that slides
 * across it. Opaque background and a stacking context above the fixed hero
 * stage are both load-bearing.
 *
 * The two columns are set as facing pages rather than cards: a hairline rule
 * between them, no shadows, no badge circles.
 */
export default function Problem() {
  const salePrice = BAY_PARK_MEDIAN_PRICE;
  const { total } = calculateTraditionalSaleCosts(salePrice);
  const { ref: figureRef, count } = useCountUp<HTMLParagraphElement>(total);

  return (
    <section
      id="why-cash"
      className="relative z-10 bg-sand px-6 py-24 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <Reveal as="h2" className="text-section">
            Selling the usual way isn&rsquo;t free.
          </Reveal>
          <Reveal as="p" delay={90} className="mt-6 text-lg text-ink-muted">
            On a median Bay Park home, here&rsquo;s roughly what comes off the top before
            you see a dollar.
          </Reveal>
        </header>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-0">
          {/* Listing it */}
          <Reveal delay={140} className="md:pr-14">
            <p className="text-eyebrow uppercase text-ink-muted">Listing it</p>

            <p
              ref={figureRef}
              data-figure
              className="text-figure mt-5 font-display text-ink"
            >
              {formatCurrency(count)}
            </p>

            <p className="mt-4 text-ink-muted">
              Estimated cost on a {formatCurrency(salePrice)} sale
            </p>

            <ul className="mt-8 space-y-0">
              {LISTING_COSTS.map((item) => (
                <li
                  key={item}
                  className="border-t border-stucco py-3 text-ink-soft last:border-b"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Selling to me — the same structure, so the comparison is honest. */}
          <Reveal
            delay={220}
            className="md:border-l md:border-stucco md:pl-14"
          >
            <p className="text-eyebrow uppercase text-accent-deep">Selling to me</p>

            <p data-figure className="text-figure mt-5 font-display text-ink">
              $0
            </p>

            <p className="mt-4 text-ink-muted">None of it comes out of your side</p>

            <ul className="mt-8 space-y-0">
              {DIRECT_COSTS.map((item) => (
                <li
                  key={item}
                  className="border-t border-stucco py-3 text-ink-soft last:border-b"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="mx-auto mt-20 max-w-measure text-center">
          <p className="text-lg leading-relaxed text-ink-soft">
            The reason there&rsquo;s no commission is simple: I&rsquo;m not listing your
            house, I&rsquo;m buying it. No agent in the middle, no marketing budget,
            nobody to pay out of your proceeds.
          </p>
          <p className="mt-6 text-sm text-ink-muted">
            Figures are estimates for illustration only. Your actual costs will differ.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
