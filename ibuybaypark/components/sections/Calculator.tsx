'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FadeIn from '../animations/FadeIn';
import Button from '../ui/Button';
import {
  BAY_PARK_MEDIAN_PRICE,
  CALCULATOR_MAX_PRICE,
  CALCULATOR_MIN_PRICE,
  CALCULATOR_STEP,
  calculateTraditionalSaleCosts,
  formatCurrency,
  formatRate,
} from '@/lib/sellingCosts';

export default function Calculator() {
  const [salePrice, setSalePrice] = useState(BAY_PARK_MEDIAN_PRICE);

  const { lines, total, netProceeds } = calculateTraditionalSaleCosts(salePrice);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="calculator" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bay-park-street.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-20"
          quality={85}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 via-white/50 to-gray-100/60 z-[1]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <FadeIn>
          <h2 className="text-section text-center mb-4">
            What does a traditional sale cost?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Move the slider to your home&rsquo;s value. These are the costs that come out
            between the price on the sign and the money in your account.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lift p-8 lg:p-12">
            {/* Slider */}
            <div className="mb-12">
              <label
                htmlFor="salePrice"
                className="block text-lg font-semibold text-gray-900 mb-4"
              >
                Your home&rsquo;s value
              </label>
              <input
                id="salePrice"
                type="range"
                min={CALCULATOR_MIN_PRICE}
                max={CALCULATOR_MAX_PRICE}
                step={CALCULATOR_STEP}
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                aria-valuetext={formatCurrency(salePrice)}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>{formatCurrency(CALCULATOR_MIN_PRICE)}</span>
                <span>{formatCurrency(CALCULATOR_MAX_PRICE)}</span>
              </div>
              <div className="mt-6 text-center">
                <motion.div
                  key={salePrice}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  className="text-5xl lg:text-6xl font-bold text-gray-900"
                >
                  {formatCurrency(salePrice)}
                </motion.div>
              </div>
            </div>

            {/* Itemised deductions */}
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {lines.map((line) => (
                <div
                  key={line.key}
                  className="flex items-baseline justify-between gap-4 py-4"
                >
                  <div>
                    <div className="text-gray-900 font-medium">{line.label}</div>
                    <div className="text-sm text-gray-400">{formatRate(line.rate)}</div>
                  </div>
                  <motion.div
                    key={`${line.key}-${line.amount}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-semibold text-gray-600 whitespace-nowrap"
                  >
                    &minus;{formatCurrency(line.amount)}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-8 relative overflow-hidden p-8 bg-gradient-to-br from-brand to-brand-light rounded-xl">
              <div className="relative z-10">
                <div className="text-sm uppercase tracking-wider text-accent mb-2">
                  Estimated cost to sell traditionally
                </div>
                <motion.div
                  key={`total-${total}`}
                  initial={{ scale: 1.04, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl lg:text-5xl font-bold text-white mb-6"
                >
                  {formatCurrency(total)}
                </motion.div>

                <div className="pt-6 border-t border-white/15">
                  <div className="text-sm uppercase tracking-wider text-gray-400 mb-1">
                    Which would leave you roughly
                  </div>
                  <motion.div
                    key={`net-${netProceeds}`}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl lg:text-3xl font-semibold text-white"
                  >
                    {formatCurrency(netProceeds)}
                  </motion.div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            </div>

            {/* The contrast */}
            <div className="mt-8 p-6 rounded-xl border-2 border-accent bg-accent/5">
              <div className="text-sm uppercase tracking-wider text-accent-deep mb-2">
                My offer has none of these
              </div>
              <p className="text-gray-600 leading-relaxed">
                No commission, no repairs, no staging, no buyer credits, and no months of
                carrying costs while you wait. I won&rsquo;t put a number on your house from a
                slider though &mdash; I&rsquo;ll walk the property and put it in writing.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button size="lg" onClick={scrollToContact}>
                Get an offer with none of these
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Assumptions, stated plainly and in public */}
        <FadeIn delay={0.4}>
          <div className="mt-10 max-w-3xl mx-auto">
            <details className="group rounded-xl bg-white/70 border border-gray-200 p-6">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900 marker:text-accent">
                How these numbers are calculated
              </summary>
              <ul className="mt-4 space-y-3">
                {lines.map((line) => (
                  <li key={line.key} className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">
                      {line.label} &mdash; {formatRate(line.rate)}.
                    </span>{' '}
                    {line.note}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-gray-500 leading-relaxed">
                These are estimates for illustration only, not a quote, an appraisal, or a
                promise about your specific home. Real costs vary with your property, your
                lender, how long it takes to sell, and what you negotiate. Nothing here is a
                guarantee that a cash sale nets you more &mdash; for some sellers the open
                market is the better answer, and I&rsquo;ll tell you if I think that&rsquo;s you.
              </p>
            </details>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
