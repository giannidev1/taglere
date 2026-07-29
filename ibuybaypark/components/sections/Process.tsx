'use client';

import { MessageCircle, Home, FileText, Key } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
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
  ];

  return (
    <section id="process" className="py-24 lg:py-32 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">How it works.</h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Four steps, and you can stop after any of them.
          </p>
        </FadeIn>

        <div className="max-w-6xl mx-auto">
          {/* Desktop */}
          <StaggerContainer className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    className="relative group"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="relative mb-6">
                      <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Icon className="w-16 h-16 text-accent" strokeWidth={1.5} />
                        </motion.div>
                      </div>
                      <div className="absolute -top-2 right-2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-brand font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="absolute top-20 -right-4 w-2 h-2 rounded-full bg-accent z-10" />
                    )}
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Mobile */}
          <StaggerContainer className="lg:hidden space-y-8 relative">
            <div className="absolute top-0 bottom-0 left-16 w-0.5 bg-gradient-to-b from-transparent via-accent to-transparent opacity-30" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={index}>
                  <div className="relative flex gap-6">
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center">
                        <Icon className="w-12 h-12 text-accent" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-brand font-bold shadow-lg">
                        {step.number}
                      </div>
                    </motion.div>

                    <div className="flex-1 pt-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
