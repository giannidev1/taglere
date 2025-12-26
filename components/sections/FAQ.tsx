'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How can you charge only 0.5%?',
      answer: 'Traditional brokerages have massive overhead: large offices, extensive staff, and high marketing budgets. As a solo broker, I eliminate these costs and pass the savings directly to you. You still get expert service and full MLS exposure — just without the inflated commission.',
    },
    {
      question: 'What\'s not included?',
      answer: 'Everything you need to successfully sell your home is included. The only additional costs might be optional services like staging or repairs, which you would control and decide on. There are no hidden fees in my commission.',
    },
    {
      question: 'Do I still pay the buyer\'s agent?',
      answer: 'Yes, the buyer\'s agent commission (typically 2-3%) is separate and comes out of the sale price, as is standard in real estate transactions. The 0.5% commission is what you pay me as your listing agent — a savings of 2.5-3% compared to traditional brokerages.',
    },
    {
      question: 'What areas do you cover?',
      answer: 'I serve all of San Diego County for both residential and commercial properties. If you\'re outside this area but interested in my services, reach out and we can discuss options.',
    },
    {
      question: 'What if my home doesn\'t sell?',
      answer: 'You pay nothing unless your home sells. My commission is only collected at closing. Additionally, listing agreements are typically 6 months, and we can adjust our strategy if needed to get your home sold.',
    },
    {
      question: 'How is this different from discount brokers?',
      answer: 'Many discount brokers cut their commission by cutting services — limited marketing, no staging advice, minimal communication. With Tagle Real Estate, you get full-service representation from an experienced broker who handles everything personally. Low cost doesn\'t mean low quality.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 lg:py-32 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">Questions</h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Everything you need to know
          </p>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gold transition-colors"
                initial={false}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 lg:px-8 py-6 flex items-center justify-between gap-4 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-gold transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-gold" />
                    ) : (
                      <Plus className="w-6 h-6 text-gray-400 group-hover:text-gold transition-colors" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 lg:px-8 pb-6">
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
