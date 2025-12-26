'use client';

import { Camera, TrendingUp, FileText, Handshake, ClipboardCheck, Home } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      icon: Home,
      title: 'MLS Listing',
      description: 'Full exposure on all major real estate platforms including MLS, Zillow, and Realtor.com',
    },
    {
      icon: Camera,
      title: 'Professional Photography',
      description: "High-quality photos that showcase your home's best features and attract serious buyers",
    },
    {
      icon: TrendingUp,
      title: 'Pricing Strategy',
      description: 'Data-driven market analysis to price your home competitively for maximum value',
    },
    {
      icon: Handshake,
      title: 'Contract Negotiation',
      description: 'Expert negotiation to get you the best terms and highest possible price',
    },
    {
      icon: ClipboardCheck,
      title: 'Transaction Coordination',
      description: 'Smooth management of inspections, appraisals, and all necessary paperwork',
    },
    {
      icon: FileText,
      title: 'Closing Support',
      description: 'Guidance through every step until you successfully hand over the keys',
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">
            Everything you need.
          </h2>
          <p className="text-section text-center text-gold mb-16">
            Nothing you don't.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="group relative p-8 rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lift hover:border-gold"
                  whileHover={{ y: -4 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-6 relative"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-7 h-7 text-gold" strokeWidth={2} />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-gold to-gold-soft scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom message */}
        <FadeIn delay={0.8}>
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600">
              You get all the services of a traditional brokerage, delivered by an experienced broker,
              for a fraction of the cost. No catch. No hidden fees. Just honest, expert service.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
