'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2, CheckCircle, ShieldCheck } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import Button from '../ui/Button';
import AddressAutocomplete from '../ui/AddressAutocomplete';
import { SITE } from '@/lib/site';
import { CONDITION_OPTIONS, TIMELINE_OPTIONS } from '@/lib/leadForm';
import { trackLead } from '@/lib/analytics';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  timeline: string;
  condition: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues: { timeline: '', condition: '' },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          propertyAddress: data.address?.trim(),
          timeline: data.timeline,
          condition: data.condition,
          message: data.message?.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send your request');
      }

      setIsSuccess(true);
      trackLead();
      reset();
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again, or just call me.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: SITE.phoneDisplay,
      href: SITE.phoneHref,
    },
    {
      icon: Mail,
      label: 'Email',
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: MapPin,
      label: 'Where I buy',
      value: `${SITE.neighborhood}, ${SITE.city}`,
      href: null,
    },
  ];

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-lg border ${
      hasError ? 'border-red-500' : 'border-gray-300'
    } focus:ring-2 focus:ring-accent focus:border-transparent transition-all`;

  const FieldError = ({ message }: { message?: string }) =>
    message ? (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1 text-sm text-red-500"
      >
        {message}
      </motion.p>
    ) : null;

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-section text-center mb-4">Get your cash offer</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            No fee, no obligation, no pressure. I&rsquo;ll come back to you within one business
            day.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Or just call me
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Some people would rather talk it through than fill in a form. That&rsquo;s
                  completely fine &mdash; call or text and you&rsquo;ll get me, not a receptionist.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <motion.div
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent-deep" />
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
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              <div className="pt-8 border-t border-gray-300">
                <div className="flex items-start gap-3 text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-accent-deep flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">
                    Your details go to me and nowhere else. I don&rsquo;t sell leads, I
                    don&rsquo;t pass your information to a network of investors, and I
                    won&rsquo;t hound you if you decide not to sell.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.4}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-white rounded-2xl p-8 shadow-lift"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                  className={inputClasses(!!errors.name)}
                  placeholder="Your name"
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'That doesn’t look like a valid email address',
                    },
                  })}
                  type="email"
                  id="email"
                  className={inputClasses(!!errors.email)}
                  placeholder="you@email.com"
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  type="tel"
                  id="phone"
                  className={inputClasses(!!errors.phone)}
                  placeholder="(619) 555-0123"
                />
                <FieldError message={errors.phone?.message} />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Property address *
                </label>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'I need the address to make you an offer' }}
                  render={({ field }) => (
                    <AddressAutocomplete
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={!!errors.address}
                      id="address"
                    />
                  )}
                />
                <FieldError message={errors.address?.message} />
              </div>

              <div>
                <label
                  htmlFor="timeline"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  When are you looking to sell? *
                </label>
                <select
                  {...register('timeline', { required: 'Please pick a timeline' })}
                  id="timeline"
                  className={`${inputClasses(!!errors.timeline)} bg-white`}
                >
                  <option value="">Select a timeline</option>
                  {TIMELINE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.timeline?.message} />
              </div>

              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What condition is it in? *
                </label>
                <select
                  {...register('condition', { required: 'Please pick a condition' })}
                  id="condition"
                  className={`${inputClasses(!!errors.condition)} bg-white`}
                >
                  <option value="">Select a condition</option>
                  {CONDITION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Be honest &mdash; a rough answer won&rsquo;t lower your offer, and it saves us
                  both a renegotiation later.
                </p>
                <FieldError message={errors.condition?.message} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Anything I should know?
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  placeholder="Tenants in place, an inherited property, a deadline you're working toward…"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending…
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Request sent
                  </span>
                ) : (
                  'Get my cash offer'
                )}
              </Button>

              {isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-700 font-medium"
                >
                  Got it &mdash; check your email for confirmation. I&rsquo;ll be in touch within
                  one business day.
                </motion.p>
              )}

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-600 font-medium"
                >
                  {error}
                </motion.p>
              )}

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Submitting this form doesn&rsquo;t commit you to anything, and it isn&rsquo;t a
                listing agreement.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
