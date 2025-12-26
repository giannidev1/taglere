'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import Button from '../ui/Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // TODO: Integrate with your email service (Formspree, Resend, etc.)
    // For now, we'll simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form data:', data);

    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(619) 555-0100',
      href: 'tel:+16195550100',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'gianni@taglere.com',
      href: 'mailto:gianni@taglere.com',
    },
    {
      icon: MapPin,
      label: 'Service Area',
      value: 'San Diego County',
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">Let's talk</h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Ready to sell for less? Get in touch.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Get in touch
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Fill out the form or reach out directly. I typically respond within a few hours
                  during business hours.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-wider text-gray-400 mb-1">
                          {item.label}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {item.value}
                        </div>
                      </div>
                    </motion.div>
                  );

                  return item.href ? (
                    <a key={index} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    content
                  );
                })}
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-600 italic">
                  "Prefer to talk? Call me directly. I'm always happy to discuss your situation
                  and answer any questions."
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" delay={0.4}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-gold focus:border-transparent transition-all`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-gold focus:border-transparent transition-all`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  type="tel"
                  id="phone"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-gold focus:border-transparent transition-all`}
                  placeholder="(619) 555-0100"
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </div>

              {/* Property Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address
                </label>
                <input
                  {...register('address')}
                  type="text"
                  id="address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="123 Main St, San Diego, CA"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your property and goals..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>

              {isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-600 font-medium"
                >
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
