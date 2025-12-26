'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Button from '../ui/Button';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Layer with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Image
          src="/hero-bg.jpg"
          alt="San Diego"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </motion.div>

      {/* Gradient Overlay - Navy with opacity for readability */}
      <div className="absolute inset-0 bg-navy/75 z-[1]" />

      {/* Grain texture */}
      <div className="absolute inset-0 grain z-[2]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Headline with staggered animation */}
          <div className="space-y-4 mb-6">
            <motion.h1
              className="text-hero text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Sell your home.
            </motion.h1>
            <motion.h1
              className="text-hero text-gradient leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Keep your equity.
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            className="text-subheading text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            0.5% commission. Full service. No compromises.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              size="lg"
              onClick={scrollToCalculator}
              className="text-lg"
            >
              See what you'd save
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            className="mt-16 text-sm text-gray-400 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            San Diego's only 0.5% full-service brokerage
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.3,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
      >
        <ChevronDown className="w-8 h-8 text-gold" />
      </motion.div>
    </section>
  );
}
