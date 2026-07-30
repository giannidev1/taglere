'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Mail, Phone, MapPin, Loader2, CheckCircle, ShieldCheck } from 'lucide-react';
import Reveal from '../motion/Reveal';
import ParallaxPlate from '../motion/ParallaxPlate';
import Button from '../ui/Button';
import AddressAutocomplete from '../ui/AddressAutocomplete';
import { SITE } from '@/lib/site';
import { CONDITION_OPTIONS, TIMELINE_OPTIONS, HONEYPOT_FIELD } from '@/lib/leadForm';
import { PLATES } from '@/lib/imagery';
import { trackLead } from '@/lib/analytics';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  timeline: string;
  condition: string;
  message: string;
  /** Honeypot. Never filled in by a person. */
  company: string;
}

/**
 * The destination.
 *
 * The page has been warming from morning light at the hero toward golden hour;
 * this section is where it lands, and it is the only place the palette goes
 * fully dark and warm at once. No urgency mechanics: no countdown, no
 * "instant offer", no progress bar theatre — just the fields, the phone
 * number, and a note that nothing here commits you.
 *
 * The submit contract is untouched: same field names, same JSON body, same
 * POST to /api/contact. The only addition is a honeypot the server checks.
 */
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
    defaultValues: { timeline: '', condition: '', company: '' },
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
          [HONEYPOT_FIELD]: data.company,
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
    { icon: Phone, label: 'Phone', value: SITE.phoneDisplay, href: SITE.phoneHref },
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    {
      icon: MapPin,
      label: 'Where I buy',
      value: `${SITE.neighborhood}, ${SITE.city}`,
      href: null,
    },
  ];

  const fieldClasses = (hasError: boolean) =>
    [
      'w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-ink',
      'placeholder:text-ink-muted',
      'transition-colors duration-300 ease-settle',
      'focus:outline-none focus:ring-0',
      hasError
        ? 'border-red-700 focus:border-red-700'
        : 'border-ink/25 hover:border-ink/45 focus:border-accent',
    ].join(' ');

  /*
   * Deliberately not uppercased, unlike the eyebrow labels elsewhere. These
   * are the highest-stakes reading on the page and one of them is a question;
   * all-caps costs word-shape and makes "When are you looking to sell?" read
   * like shouting rather than asking.
   */
  const labelClasses =
    'mb-2 block text-sm font-medium tracking-wide text-ink-soft';

  return (
    <section
      id="contact"
      className="on-dark relative z-10 overflow-hidden bg-brand-deep px-6 py-24 lg:px-8 lg:py-36"
    >
      <ParallaxPlate
        plate={PLATES.goldenHour}
        strength={12}
        opacity={0.34}
        overlayClassName="bg-gradient-to-b from-brand-deep/92 via-brand-deep/80 to-brand-deep/95"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <Reveal as="h2" className="text-section text-sand-light">
            Get your cash offer
          </Reveal>
          <Reveal as="p" delay={90} className="mt-6 text-lg text-sand/75">
            No fee, no obligation, no pressure. I&rsquo;ll come back to you within one
            business day.
          </Reveal>
        </header>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          {/* The person, given real presence rather than fine print. */}
          <Reveal delay={140} className="lg:col-span-5">
            <h3 className="font-display text-2xl text-sand-light">Or just call me</h3>
            <p className="mt-5 text-lg leading-relaxed text-sand/75">
              Some people would rather talk it through than fill in a form. That&rsquo;s
              completely fine &mdash; call or text and you&rsquo;ll get me, not a
              receptionist.
            </p>

            <dl className="mt-12 space-y-8">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="border-t border-sand/20 pt-6">
                    <dt className="flex items-center gap-3">
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.25}
                        className="h-5 w-5 text-accent"
                      />
                      <span className="text-eyebrow uppercase text-sand/60">
                        {item.label}
                      </span>
                    </dt>
                    <dd className="mt-3">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="wipe-link font-display text-2xl text-sand-light transition-colors duration-300 hover:text-accent-soft lg:text-3xl"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-display text-2xl text-sand-light lg:text-3xl">
                          {item.value}
                        </span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-12 flex items-start gap-3 border-t border-sand/20 pt-6">
              <ShieldCheck
                aria-hidden="true"
                strokeWidth={1.25}
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
              />
              <p className="text-sm leading-relaxed text-sand/70">
                Your details go to me and nowhere else. I don&rsquo;t sell leads, I
                don&rsquo;t pass your information to a network of investors, and I
                won&rsquo;t hound you if you decide not to sell.
              </p>
            </div>
          </Reveal>

          {/* The form. */}
          <Reveal delay={200} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-sand-light p-8 shadow-lift sm:p-10 lg:p-12"
              noValidate
            >
              <div className="space-y-8">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className={fieldClasses(!!errors.name)}
                    placeholder="Your name"
                  />
                  {errors.name && <FieldError message={errors.name.message} />}
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>
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
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={fieldClasses(!!errors.email)}
                    placeholder="you@email.com"
                  />
                  {errors.email && <FieldError message={errors.email.message} />}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone *
                  </label>
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    className={fieldClasses(!!errors.phone)}
                    placeholder="(619) 555-0123"
                  />
                  {errors.phone && <FieldError message={errors.phone.message} />}
                </div>

                <div>
                  <label htmlFor="address" className={labelClasses}>
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
                  {errors.address && <FieldError message={errors.address.message} />}
                </div>

                <div>
                  <label htmlFor="timeline" className={labelClasses}>
                    When are you looking to sell? *
                  </label>
                  <select
                    {...register('timeline', { required: 'Please pick a timeline' })}
                    id="timeline"
                    aria-invalid={!!errors.timeline}
                    className={fieldClasses(!!errors.timeline)}
                  >
                    <option value="">Select a timeline</option>
                    {TIMELINE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.timeline && <FieldError message={errors.timeline.message} />}
                </div>

                <div>
                  <label htmlFor="condition" className={labelClasses}>
                    What condition is it in? *
                  </label>
                  <select
                    {...register('condition', { required: 'Please pick a condition' })}
                    id="condition"
                    aria-invalid={!!errors.condition}
                    className={fieldClasses(!!errors.condition)}
                  >
                    <option value="">Select a condition</option>
                    {CONDITION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-sm text-ink-muted">
                    Be honest &mdash; a rough answer won&rsquo;t lower your offer, and it
                    saves us both a renegotiation later.
                  </p>
                  {errors.condition && <FieldError message={errors.condition.message} />}
                </div>

                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Anything I should know?
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    className={`${fieldClasses(false)} resize-none`}
                    placeholder="Tenants in place, an inherited property, a deadline you're working toward…"
                  />
                </div>

                {/*
                  Honeypot. Positioned off-screen rather than display:none so
                  the more careful bots still fill it in, and taken out of the
                  tab order and the accessibility tree so no person meets it.
                */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor={HONEYPOT_FIELD}>Company</label>
                  <input
                    {...register('company')}
                    type="text"
                    id={HONEYPOT_FIELD}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="mt-10">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
                      Sending…
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle aria-hidden="true" className="h-5 w-5" />
                      Request sent
                    </span>
                  ) : (
                    'Get my cash offer'
                  )}
                </Button>
              </div>

              {/* Reserved live region: it is always in the DOM, so an incoming
                  message cannot push the layout around. */}
              <div aria-live="polite" className="mt-5 min-h-[3rem]">
                {isSuccess && (
                  <p className="fade-up text-center font-medium text-eucalyptus">
                    Got it &mdash; check your email for confirmation. I&rsquo;ll be in
                    touch within one business day.
                  </p>
                )}
                {error && (
                  <p className="fade-up text-center font-medium text-red-700">{error}</p>
                )}
              </div>

              <p className="text-center text-sm leading-relaxed text-ink-muted">
                Submitting this form doesn&rsquo;t commit you to anything, and it
                isn&rsquo;t a listing agreement.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="fade-up mt-2 text-sm text-red-700">{message}</p>;
}
