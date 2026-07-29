'use client';

import { Ban, Banknote, CalendarClock, Wrench, EyeOff, FileCheck } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import { motion } from 'framer-motion';

export default function Benefits() {
  const benefits = [
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
  ];

  return (
    <section id="benefits" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">What you don&rsquo;t deal with.</h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            The whole point is that selling shouldn&rsquo;t take over your life.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="group relative h-full p-8 rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lift hover:border-accent"
                  whileHover={{ y: -4 }}
                >
                  <motion.div
                    className="mb-6 relative"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-7 h-7 text-accent-deep" strokeWidth={2} />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>

                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-accent to-accent-soft scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.8}>
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600">
              A cash sale isn&rsquo;t right for everyone. If listing your home on the open
              market would genuinely net you more, I&rsquo;ll say so rather than waste your time.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
