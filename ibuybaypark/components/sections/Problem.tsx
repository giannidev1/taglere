'use client';

import { useCountUp } from '@/lib/hooks/useCountUp';
import FadeIn from '../animations/FadeIn';
import { X } from 'lucide-react';
import {
  BAY_PARK_MEDIAN_PRICE,
  calculateTraditionalSaleCosts,
  formatCurrency,
} from '@/lib/sellingCosts';

export default function Problem() {
  const salePrice = BAY_PARK_MEDIAN_PRICE;
  const { total } = calculateTraditionalSaleCosts(salePrice);

  const { ref: traditionalRef, count: traditionalCount } = useCountUp(total, 2000);

  return (
    <section id="why-cash" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">
            Selling the usual way isn&rsquo;t free.
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            On a median Bay Park home, here&rsquo;s roughly what comes off the top before you
            see a dollar.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Traditional listing */}
          <FadeIn delay={0.2} direction="left">
            <div
              ref={traditionalRef}
              className="relative h-full p-8 lg:p-12 rounded-2xl bg-gray-100 border-2 border-gray-300"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>

              <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                Listing it
              </div>
              <div className="text-5xl lg:text-6xl font-bold text-gray-400 mb-4">
                {formatCurrency(traditionalCount)}
              </div>
              <p className="text-gray-600 mb-6">
                Estimated cost on a {formatCurrency(salePrice)} sale
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>Agent commissions</li>
                <li>Escrow, title &amp; transfer tax</li>
                <li>Repairs, cleaning &amp; staging</li>
                <li>Buyer credits after inspection</li>
                <li>Two months of carrying costs</li>
                <li>Showings, open houses, and no certainty</li>
              </ul>
            </div>
          </FadeIn>

          {/* Selling direct */}
          <FadeIn delay={0.4} direction="right">
            <div className="relative h-full p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent shadow-glow">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-2xl text-brand">✓</span>
              </div>

              <div className="text-sm uppercase tracking-wider text-accent-deep mb-2">
                Selling to me
              </div>
              <div className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                $0
              </div>
              <p className="text-gray-600 mb-6">
                None of it comes out of your side
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>No commission — there&rsquo;s no agent in the middle</li>
                <li>I cover standard closing costs</li>
                <li>No repairs, no cleaning, no staging</li>
                <li>No inspection renegotiation</li>
                <li>No carrying months — you pick the date</li>
                <li>No showings and no open houses</li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-16 max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              The reason there&rsquo;s no commission is simple: I&rsquo;m not listing your house,
              I&rsquo;m buying it. No agent in the middle, no marketing budget, nobody to pay
              out of your proceeds.
            </p>
            <p className="mt-6 text-sm text-gray-400 text-center">
              Figures are estimates for illustration only. Your actual costs will differ.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
