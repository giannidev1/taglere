'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FadeIn from '../animations/FadeIn';
import Button from '../ui/Button';

export default function Calculator() {
  const [homeValue, setHomeValue] = useState(1000000);

  const traditionalRate = 0.03;
  const tagleRate = 0.005;

  const traditionalCommission = homeValue * traditionalRate;
  const tagleCommission = homeValue * tagleRate;
  const savings = traditionalCommission - tagleCommission;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="calculator" className="py-24 lg:py-32 relative overflow-hidden min-h-[700px]">
      {/* Mission Beach Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mission-beach.jpg"
          alt="Mission Beach San Diego"
          fill
          className="object-cover opacity-25"
          quality={85}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 via-white/40 to-gray-100/50 z-[1]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <FadeIn>
          <h2 className="text-section text-center mb-4">
            Calculate your savings
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            See how much you'd keep with Tagle Real Estate
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lift p-8 lg:p-12">
            {/* Slider Input */}
            <div className="mb-12">
              <label htmlFor="homeValue" className="block text-lg font-semibold text-gray-900 mb-4">
                Your home's value
              </label>
              <div className="relative">
                <input
                  id="homeValue"
                  type="range"
                  min="200000"
                  max="5000000"
                  step="50000"
                  value={homeValue}
                  onChange={(e) => setHomeValue(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold slider"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>$200K</span>
                  <span>$5M</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <motion.div
                  key={homeValue}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-5xl lg:text-6xl font-bold text-gray-900"
                >
                  {formatCurrency(homeValue)}
                </motion.div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Traditional Commission */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                <div>
                  <div className="text-sm uppercase tracking-wider text-gray-400 mb-1">
                    Traditional commission (3%)
                  </div>
                  <motion.div
                    key={`traditional-${traditionalCommission}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold text-gray-400 line-through"
                  >
                    {formatCurrency(traditionalCommission)}
                  </motion.div>
                </div>
              </div>

              {/* Tagle Commission */}
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl border-2 border-gold">
                <div>
                  <div className="text-sm uppercase tracking-wider text-gold mb-1">
                    Tagle commission (0.5%)
                  </div>
                  <motion.div
                    key={`tagle-${tagleCommission}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    {formatCurrency(tagleCommission)}
                  </motion.div>
                </div>
              </div>

              {/* Savings */}
              <div className="relative overflow-hidden p-8 bg-gradient-to-br from-navy to-navy-light rounded-xl">
                <div className="relative z-10">
                  <div className="text-sm uppercase tracking-wider text-gold mb-2">
                    You keep
                  </div>
                  <motion.div
                    key={`savings-${savings}`}
                    initial={{ scale: 1.05, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-white mb-2"
                  >
                    {formatCurrency(savings)} more
                  </motion.div>
                  <div className="text-gray-300">
                    in your pocket at closing
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <Button size="lg" onClick={scrollToContact}>
                Let's talk about your home
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
