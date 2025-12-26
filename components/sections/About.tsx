'use client';

import FadeIn from '../animations/FadeIn';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Users, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function About() {
  const credentials = [
    {
      icon: Award,
      label: 'Licensed Broker',
      value: 'DRE #XXXXXXX',
    },
    {
      icon: Users,
      label: 'Direct Service',
      value: 'No hand-offs',
    },
    {
      icon: Shield,
      label: 'Full Coverage',
      value: 'Residential & Commercial',
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden min-h-[600px]">
      {/* La Jolla Background Image - Subtle */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/la-jolla.jpg"
          alt="La Jolla Coast"
          fill
          className="object-cover opacity-30"
          quality={85}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-gray-50/40 to-white/50 z-[1]" />

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl z-[2]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl z-[2]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <FadeIn>
          <h2 className="text-section text-center mb-4">
            Work directly with the broker
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            No junior agents. No hand-offs. Just expert guidance from start to finish.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image placeholder */}
          <FadeIn direction="left" delay={0.2}>
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-light shadow-lift"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Placeholder for professional headshot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <Users className="w-16 h-16" />
                  </div>
                  <p className="text-sm uppercase tracking-wider">
                    Professional Headshot
                  </p>
                </div>
              </div>
              {/* Gold accent border */}
              <div className="absolute inset-0 border-4 border-gold/20 rounded-2xl" />
            </motion.div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right" delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900">
                Meet Gianni Tagle
              </h3>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  As principal broker and founder of Tagle Real Estate, I believe the traditional
                  commission model is broken. Sellers deserve expert service without the inflated costs.
                </p>
                <p>
                  With years of experience in both residential and commercial real estate across San Diego,
                  I've helped dozens of clients navigate complex transactions and save thousands in the process.
                </p>
                <p>
                  When you work with Tagle Real Estate, you work directly with me. No assistants, no junior agents,
                  no hand-offs. You get my full attention and expertise from the first consultation to closing day.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {credentials.map((cred, index) => {
                  const Icon = cred.icon;
                  return (
                    <motion.div
                      key={index}
                      className="text-center p-4 rounded-xl bg-white border border-gray-200"
                      whileHover={{ y: -2, borderColor: '#c9a962' }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-8 h-8 text-gold mx-auto mb-2" />
                      <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                        {cred.label}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {cred.value}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
