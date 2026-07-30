import Reveal from '../motion/Reveal';
import { FAQS } from '@/lib/faqs';

/**
 * Native <details> rather than a JavaScript accordion.
 *
 * Three things fall out of that: it opens and closes with JavaScript disabled,
 * it is keyboard- and screen-reader-correct without any ARIA of our own, and
 * nothing has to animate height — the answer fades and rises into the space
 * instead, so no layout property is ever animated.
 *
 * This is a server component; there is no client JavaScript here at all.
 */
export default function FAQ() {
  return (
    <section id="faq" className="relative z-10 bg-sand px-6 py-24 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-4xl">
        <header className="max-w-2xl">
          <Reveal as="h2" className="text-section">
            Questions
          </Reveal>
          <Reveal as="p" delay={90} className="mt-6 text-lg text-ink-muted">
            Straight answers, including the awkward one.
          </Reveal>
        </header>

        <div className="mt-14 border-t border-stucco">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={Math.min(index * 60, 240)}>
              <details
                className="faq group border-b border-stucco"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
                  <span className="text-lg font-medium text-ink transition-colors duration-300 group-hover:text-accent-deep lg:text-xl">
                    {faq.question}
                  </span>

                  {/* Decorative: <details> already announces its own state. */}
                  <span
                    aria-hidden="true"
                    className="relative mt-2 h-3 w-3 flex-shrink-0"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-accent-deep" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-accent-deep transition-transform duration-300 ease-settle group-open:scale-y-0" />
                  </span>
                </summary>

                <div className="faq-body pb-7">
                  <p className="max-w-measure text-lg leading-relaxed text-ink-soft">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
