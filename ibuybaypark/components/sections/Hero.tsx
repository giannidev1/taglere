'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Button from '../ui/Button';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background with slow Ken Burns push */}
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
          src="/bay-park-hero.jpg"
          alt="Bay Park, San Diego, looking out over Mission Bay"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </motion.div>

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-brand/75 z-[1]" />
      <div className="absolute inset-0 grain z-[2]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Neighborhood eyebrow — signals immediately that this is local */}
          <motion.p
            className="text-sm uppercase tracking-[0.2em] text-accent-soft mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Bay Park · San Diego · 92110 &amp; 92117
          </motion.p>

          <div className="space-y-4 mb-6">
            <motion.h1
              className="text-hero text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Sell your Bay Park home.
            </motion.h1>
            <motion.h1
              className="text-hero text-gradient leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Cash, on your timeline.
            </motion.h1>
          </div>

          <motion.p
            className="text-subheading text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            No commissions. No repairs. No showings.
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button size="lg" onClick={() => scrollTo('contact')} className="text-lg">
              Get my cash offer
            </Button>
            <button
              onClick={() => scrollTo('calculator')}
              className="text-sm text-gray-300 underline decoration-accent/50 decoration-2 underline-offset-4 hover:text-white hover:decoration-accent transition-colors"
            >
              See what a traditional sale actually costs
            </button>
          </motion.div>

          <motion.p
            className="mt-16 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
          >
            I&rsquo;ve lived in Bay Park. Licensed California broker, DRE #02250353.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll cue */}
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
        <ChevronDown className="w-8 h-8 text-accent" />
      </motion.div>
    </section>
  );
}
