'use client';

import { useState } from 'react';
import Reveal from '../motion/Reveal';
import ParallaxPlate from '../motion/ParallaxPlate';
import { ButtonLink } from '../ui/Button';
import { PLATES } from '@/lib/imagery';
import {
  BAY_PARK_MEDIAN_PRICE,
  CALCULATOR_MAX_PRICE,
  CALCULATOR_MIN_PRICE,
  CALCULATOR_STEP,
  calculateTraditionalSaleCosts,
  formatCurrency,
  formatRate,
} from '@/lib/sellingCosts';

/**
 * The arithmetic, over bay water at golden hour.
 *
 * Every figure is set in tabular numerals so dragging the slider changes the
 * digits without changing any element's width — no reflow, no layout shift,
 * and nothing here animates a layout property.
 */
export default function Calculator() {
  const [salePrice, setSalePrice] = useState(BAY_PARK_MEDIAN_PRICE);
  const { lines, total, netProceeds } = calculateTraditionalSaleCosts(salePrice);

  return (
    <section
      id="calculator"
      className="relative z-10 overflow-hidden bg-sand-deep px-6 py-24 lg:px-8 lg:py-36"
    >
      <ParallaxPlate
        plate={PLATES.water}
        strength={14}
        opacity={0.28}
        overlayClassName="bg-gradient-to-b from-sand-deep/85 via-sand-deep/70 to-sand-deep/90"
      />

      <div className="relative mx-auto max-w-4xl">
        <header className="mx-auto max-w-3xl text-center">
          <Reveal as="h2" className="text-section">
            What does a traditional sale cost?
          </Reveal>
          <Reveal as="p" delay={90} className="mx-auto mt-6 max-w-measure text-lg text-ink-soft">
            Move the slider to your home&rsquo;s value. These are the costs that come out
            between the price on the sign and the money in your account.
          </Reveal>
        </header>

        <Reveal delay={140} className="mt-16">
          <div className="border-y border-ink/15 bg-sand-light/80 px-6 py-10 backdrop-blur-sm sm:px-10 lg:px-14">
            {/* Slider */}
            <div>
              <label
                htmlFor="salePrice"
                className="text-eyebrow block uppercase text-ink-muted"
              >
                Your home&rsquo;s value
              </label>

              <p data-figure className="text-figure mt-4 font-display text-ink">
                {formatCurrency(salePrice)}
              </p>

              <input
                id="salePrice"
                type="range"
                min={CALCULATOR_MIN_PRICE}
                max={CALCULATOR_MAX_PRICE}
                step={CALCULATOR_STEP}
                value={salePrice}
                onChange={(event) => setSalePrice(Number(event.target.value))}
                className="slider mt-8 h-6 w-full cursor-pointer"
                aria-valuetext={formatCurrency(salePrice)}
              />

              <div className="mt-1 flex justify-between text-sm text-ink-muted">
                <span>{formatCurrency(CALCULATOR_MIN_PRICE)}</span>
                <span>{formatCurrency(CALCULATOR_MAX_PRICE)}</span>
              </div>
            </div>

            {/* Itemised deductions */}
            <dl className="mt-12">
              {lines.map((line) => (
                <div
                  key={line.key}
                  className="flex items-baseline justify-between gap-6 border-t border-stucco py-4"
                >
                  <dt>
                    <span className="block text-ink">{line.label}</span>
                    <span className="block text-sm text-ink-muted">
                      {formatRate(line.rate)}
                    </span>
                  </dt>
                  <dd data-figure className="whitespace-nowrap text-xl text-ink-soft">
                    &minus;{formatCurrency(line.amount)}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Totals */}
            <div className="mt-10 bg-brand px-6 py-9 sm:px-10">
              <p className="text-eyebrow uppercase text-accent-soft">
                Estimated cost to sell traditionally
              </p>
              <p
                data-figure
                className="mt-3 font-display text-4xl text-sand-light lg:text-5xl"
              >
                {formatCurrency(total)}
              </p>

              <div className="mt-7 border-t border-sand/20 pt-6">
                <p className="text-eyebrow uppercase text-sand/70">
                  Which would leave you roughly
                </p>
                <p
                  data-figure
                  className="mt-3 font-display text-2xl text-sand-light lg:text-3xl"
                >
                  {formatCurrency(netProceeds)}
                </p>
              </div>
            </div>

            {/* The contrast */}
            <div className="mt-8 border-l-2 border-accent pl-6">
              <p className="text-eyebrow uppercase text-accent-deep">
                My offer has none of these
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                No commission, no repairs, no staging, no buyer credits, and no months of
                carrying costs while you wait. I won&rsquo;t put a number on your house
                from a slider though &mdash; I&rsquo;ll walk the property and put it in
                writing.
              </p>
            </div>

            <div className="mt-10 text-center">
              <ButtonLink href="#contact" size="lg">
                Get an offer with none of these
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        {/* Assumptions, stated plainly and in public. A native <details>, so it
            opens with JavaScript disabled. */}
        <Reveal delay={80} className="mt-10">
          <details className="group border-t border-stucco pt-6">
            <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:text-accent">
              <span className="wipe-link">How these numbers are calculated</span>
              <span aria-hidden="true" className="ml-2 text-accent-deep">
                <span className="inline group-open:hidden">+</span>
                <span className="hidden group-open:inline">&minus;</span>
              </span>
            </summary>

            <ul className="mt-5 space-y-3">
              {lines.map((line) => (
                <li key={line.key} className="text-sm text-ink-muted">
                  <span className="font-medium text-ink">
                    {line.label} &mdash; {formatRate(line.rate)}.
                  </span>{' '}
                  {line.note}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              These are estimates for illustration only, not a quote, an appraisal, or a
              promise about your specific home. Real costs vary with your property, your
              lender, how long it takes to sell, and what you negotiate. Nothing here is
              a guarantee that a cash sale nets you more &mdash; for some sellers the
              open market is the better answer, and I&rsquo;ll tell you if I think
              that&rsquo;s you.
            </p>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
