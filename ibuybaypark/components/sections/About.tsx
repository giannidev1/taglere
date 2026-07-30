'use client';

import Image from 'next/image';
import { Award, MapPin, User } from 'lucide-react';
import Reveal from '../motion/Reveal';
import ParallaxPlate from '../motion/ParallaxPlate';
import { PLATES } from '@/lib/imagery';

const CREDENTIALS = [
  { icon: Award, label: 'Licensed Broker', value: 'DRE #02250353' },
  { icon: MapPin, label: 'Local', value: 'Lived in Bay Park' },
  { icon: User, label: 'Direct', value: 'You deal with me' },
] as const;

/**
 * The person, on an asymmetric split: portrait in the narrow column, the
 * argument in the wide one. Late light on stucco sits behind it, translating
 * slower than the section.
 *
 * The portrait is a real photograph of a real broker. It is the one image on
 * this page that must never be generated.
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden bg-sand-deep px-6 py-24 lg:px-8 lg:py-36"
    >
      <ParallaxPlate
        plate={PLATES.stucco}
        strength={10}
        opacity={0.3}
        overlayClassName="bg-gradient-to-b from-sand-deep/90 via-sand-deep/78 to-sand-deep/92"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <Reveal as="h2" className="text-section">
            A neighbor, not an out-of-town investor.
          </Reveal>
          <Reveal as="p" delay={90} className="mt-6 text-lg text-ink-muted">
            No call center, no lead-buying network, no algorithm in another state.
          </Reveal>
        </header>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={140} className="lg:col-span-5">
            {/* Fixed aspect box: the portrait's space is reserved before it
                loads, so it cannot shift the column. */}
            <div className="relative aspect-[4/5] overflow-hidden bg-brand">
              <Image
                src={PLATES.portrait.src}
                alt={PLATES.portrait.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                quality={88}
                className="object-cover object-[center_28%]"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal as="h3" delay={180} className="text-3xl lg:text-4xl">
              Meet Gianni Tagle
            </Reveal>

            <Reveal delay={230} className="mt-7 space-y-6 text-lg leading-relaxed text-ink-soft">
              <p>
                I&rsquo;ve lived in Bay Park. I know the canyon streets, the bay views you
                only get from certain blocks, and the 1950s and &rsquo;60s housing stock
                &mdash; including what it actually costs to fix a foundation on a hillside
                lot or re-pipe a house that&rsquo;s never been touched.
              </p>
              <p>
                I&rsquo;m a licensed California real estate broker, and on this site
                I&rsquo;m not acting as anyone&rsquo;s agent &mdash; I&rsquo;m the buyer,
                purchasing for my own account with my own funds. That&rsquo;s exactly why
                there&rsquo;s no commission and no listing: there&rsquo;s no third party
                to pay.
              </p>
              <p>
                When you reach out, you get me. I&rsquo;m the one who walks your property,
                the one who writes the offer, and the one who answers the phone when you
                have a question at closing.
              </p>
            </Reveal>

            <dl className="mt-12 grid gap-px border-y border-stucco bg-stucco sm:grid-cols-3">
              {CREDENTIALS.map((credential, index) => {
                const Icon = credential.icon;
                return (
                  <Reveal
                    key={credential.label}
                    delay={300 + index * 70}
                    className="bg-sand-deep px-5 py-6"
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="h-6 w-6 text-accent-deep"
                    />
                    <dt className="mt-4 text-eyebrow uppercase text-ink-muted">
                      {credential.label}
                    </dt>
                    <dd className="mt-2 font-medium text-ink">{credential.value}</dd>
                  </Reveal>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
