'use client';

import { useCountUp } from '@/lib/hooks/useCountUp';
import FadeIn from '../animations/FadeIn';
import { X } from 'lucide-react';

export default function Problem() {
  const homeValue = 1000000; // $1M example
  const traditionalRate = 0.03;
  const tagleRate = 0.005;

  const traditionalCommission = Math.round(homeValue * traditionalRate);
  const tagleCommission = Math.round(homeValue * tagleRate);

  const { ref: traditionalRef, count: traditionalCount } = useCountUp(traditionalCommission, 2000);
  const { ref: tagleRef, count: tagleCount } = useCountUp(tagleCommission, 2000);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">
            Traditional brokers take 3%.
          </h2>
          <p className="text-section text-center text-gold mb-16">Why?</p>
        </FadeIn>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Traditional */}
          <FadeIn delay={0.2} direction="left">
            <div ref={traditionalRef} className="relative p-8 lg:p-12 rounded-2xl bg-gray-100 border-2 border-gray-300">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>

              <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                Traditional 3%
              </div>
              <div className="text-5xl lg:text-6xl font-bold text-gray-400 mb-4 line-through">
                {formatCurrency(traditionalCount)}
              </div>
              <p className="text-gray-600">
                On a {formatCurrency(homeValue)} home
              </p>
            </div>
          </FadeIn>

          {/* Tagle */}
          <FadeIn delay={0.4} direction="right">
            <div ref={tagleRef} className="relative p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold shadow-glow">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>

              <div className="text-sm uppercase tracking-wider text-gold mb-2">
                Tagle 0.5%
              </div>
              <div className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                {formatCurrency(tagleCount)}
              </div>
              <p className="text-gray-600">
                On a {formatCurrency(homeValue)} home
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Savings callout */}
        <FadeIn delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-2xl lg:text-3xl font-semibold text-gray-900">
              You keep{' '}
              <span className="text-gold">
                {formatCurrency(traditionalCommission - tagleCommission)} more
              </span>
            </p>
          </div>
        </FadeIn>

        {/* Explanation */}
        <FadeIn delay={0.8}>
          <div className="mt-16 max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              Traditional brokerages justify high commissions with large teams and expensive offices.
              But most sellers don't need that overhead — they need expert guidance, professional marketing,
              and skilled negotiation. That's exactly what you get with Tagle Real Estate, at a fraction of the cost.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
