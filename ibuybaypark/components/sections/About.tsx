'use client';

import FadeIn from '../animations/FadeIn';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, MapPin, User } from 'lucide-react';

export default function About() {
  const credentials = [
    {
      icon: Award,
      label: 'Licensed Broker',
      value: 'DRE #02250353',
    },
    {
      icon: MapPin,
      label: 'Local',
      value: 'Lived in Bay Park',
    },
    {
      icon: User,
      label: 'Direct',
      value: 'You deal with me',
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden min-h-[600px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/mission-bay.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-25"
          quality={85}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-50/50 to-white/60 z-[1]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-[2]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl z-[2]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <FadeIn>
          <h2 className="text-section text-center mb-4">
            A neighbor, not an out-of-town investor.
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            No call center, no lead-buying network, no algorithm in another state.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Headshot — see IMAGES.md to swap in the real photo */}
          <FadeIn direction="left" delay={0.2}>
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand to-brand-light shadow-lift"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-16 h-16" />
                  </div>
                  <p className="text-sm uppercase tracking-wider">
                    Professional Headshot
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-accent/20 rounded-2xl" />
            </motion.div>
          </FadeIn>

          <FadeIn direction="right" delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900">
                Meet Gianni Tagle
              </h3>

              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  I&rsquo;ve lived in Bay Park. I know the canyon streets, the bay views you only
                  get from certain blocks, and the 1950s and &rsquo;60s housing stock &mdash;
                  including what it actually costs to fix a foundation on a hillside lot or
                  re-pipe a house that&rsquo;s never been touched.
                </p>
                <p>
                  I&rsquo;m a licensed California real estate broker, and on this site I&rsquo;m
                  not acting as anyone&rsquo;s agent &mdash; I&rsquo;m the buyer, purchasing for
                  my own account with my own funds. That&rsquo;s exactly why there&rsquo;s no
                  commission and no listing: there&rsquo;s no third party to pay.
                </p>
                <p>
                  When you reach out, you get me. I&rsquo;m the one who walks your property, the
                  one who writes the offer, and the one who answers the phone when you have a
                  question at closing.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6">
                {credentials.map((cred, index) => {
                  const Icon = cred.icon;
                  return (
                    <motion.div
                      key={index}
                      className="text-center p-4 rounded-xl bg-white border border-gray-200"
                      whileHover={{ y: -2, borderColor: '#e08b4c' }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-8 h-8 text-accent-deep mx-auto mb-2" />
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
