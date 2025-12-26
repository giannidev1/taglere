'use client';

import { MessageCircle, Camera as CameraIcon, HandshakeIcon, Key } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    {
      number: '01',
      icon: MessageCircle,
      title: 'Consultation',
      description: "We discuss your goals, timeline, and expectations. I'll provide a detailed market analysis and pricing strategy.",
    },
    {
      number: '02',
      icon: CameraIcon,
      title: 'Listing',
      description: 'Professional photos, strategic pricing, and full MLS exposure. Your home goes live on all major platforms.',
    },
    {
      number: '03',
      icon: HandshakeIcon,
      title: 'Negotiation',
      description: 'I handle all offers, negotiate the best terms, and guide you through inspections and contingencies.',
    },
    {
      number: '04',
      icon: Key,
      title: 'Closing',
      description: 'Smooth coordination of all closing tasks. I ensure everything is handled properly until you hand over the keys.',
    },
  ];

  return (
    <section id="process" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">
            Simple. Transparent. Fast.
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Four steps to selling your home for less
          </p>
        </FadeIn>

        <div className="max-w-6xl mx-auto">
          {/* Desktop: Horizontal layout */}
          <StaggerContainer className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
            {/* Connection line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    className="relative group"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Step number circle */}
                    <div className="relative mb-6">
                      <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Icon className="w-16 h-16 text-gold" strokeWidth={1.5} />
                        </motion.div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Connecting dot */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-20 -right-4 w-2 h-2 rounded-full bg-gold z-10" />
                    )}
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Mobile: Vertical layout */}
          <StaggerContainer className="lg:hidden space-y-8 relative">
            {/* Connection line */}
            <div className="absolute top-0 bottom-0 left-16 w-0.5 bg-gradient-to-b from-transparent via-gold to-transparent opacity-30" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={index}>
                  <div className="relative flex gap-6">
                    {/* Icon circle */}
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Icon className="w-12 h-12 text-gold" strokeWidth={1.5} />
                        </motion.div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold shadow-lg">
                        {step.number}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 pt-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
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
