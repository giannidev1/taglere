'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';
import { CONDITION_OPTIONS, TIMELINE_OPTIONS } from '@/lib/leadForm';
import { trackLead } from '@/lib/analytics';
import { SITE } from '@/lib/site';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  timeline: string;
  condition: string;
  message: string;
}

/**
 * The form as a request slip. Same fields and same API as Plan A — only the
 * treatment and the wording change.
 */
export default function Slip() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>({ defaultValues: { timeline: '', condition: '' } });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
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

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'That did not send.');

      setIsSent(true);
      trackLead();
      reset();
      setTimeout(() => setIsSent(false), 10000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `That did not send. Try again, or call ${SITE.phoneDisplay}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="s-section" id="offer">
      <div className="s-wrap">
        <span className="s-stake" aria-hidden="true" />
        <span className="s-tag">Request</span>
        <h2 className="s-h2" style={{ marginTop: '0.75rem' }}>
          Ask me for a number.
        </h2>
        <p className="s-lede">
          No fee, no obligation, and no sequence of follow-up emails. I reply
          within one business day, usually sooner.
        </p>

        <form className="s-slip" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="s-field" data-bad={!!errors.name}>
            <label htmlFor="b-name">Your name</label>
            <input id="b-name" type="text" {...register('name', { required: 'Required' })} />
            {errors.name && <span className="s-err">{errors.name.message}</span>}
          </div>

          <div className="s-two">
            <div className="s-field" data-bad={!!errors.email}>
              <label htmlFor="b-email">Email</label>
              <input
                id="b-email"
                type="email"
                {...register('email', {
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Check this address',
                  },
                })}
              />
              {errors.email && <span className="s-err">{errors.email.message}</span>}
            </div>

            <div className="s-field" data-bad={!!errors.phone}>
              <label htmlFor="b-phone">Phone</label>
              <input id="b-phone" type="tel" {...register('phone', { required: 'Required' })} />
              {errors.phone && <span className="s-err">{errors.phone.message}</span>}
            </div>
          </div>

          <div className="s-field" data-bad={!!errors.address}>
            <label htmlFor="b-address">The address</label>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: 'I need the address to give you a number' }}
              render={({ field }) => (
                <AddressAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!errors.address}
                  id="b-address"
                  showIcon={false}
                />
              )}
            />
            {errors.address && <span className="s-err">{errors.address.message}</span>}
          </div>

          <div className="s-two">
            <div className="s-field" data-bad={!!errors.timeline}>
              <label htmlFor="b-timeline">When</label>
              <select id="b-timeline" {...register('timeline', { required: 'Required' })}>
                <option value="">Choose one</option>
                {TIMELINE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {errors.timeline && <span className="s-err">{errors.timeline.message}</span>}
            </div>

            <div className="s-field" data-bad={!!errors.condition}>
              <label htmlFor="b-condition">Condition</label>
              <select id="b-condition" {...register('condition', { required: 'Required' })}>
                <option value="">Choose one</option>
                {CONDITION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {errors.condition && <span className="s-err">{errors.condition.message}</span>}
            </div>
          </div>

          <p className="s-hint" style={{ marginTop: '-0.5rem' }}>
            Be blunt about the condition. A rough answer does not lower the
            number &mdash; it stops me revising it later.
          </p>

          <div className="s-field">
            <label htmlFor="b-message">Anything I should know</label>
            <textarea
              id="b-message"
              rows={4}
              {...register('message')}
              placeholder="Tenants, an inherited house, a date you are working toward…"
            />
          </div>

          <div>
            <button type="submit" className="s-btn s-btn--flag" disabled={isSubmitting || isSent}>
              {isSubmitting ? 'Sending' : isSent ? 'Sent' : 'Send it'}
            </button>
          </div>

          {isSent && (
            <p className="s-fig" style={{ color: 'var(--bay)', fontSize: '0.875rem' }}>
              Received. Check your email for confirmation — I will be in touch
              within one business day.
            </p>
          )}

          {error && (
            <p className="s-err" style={{ fontSize: '0.875rem' }}>
              {error}
            </p>
          )}

          <p className="s-hint">
            Sending this commits you to nothing. It is not a listing agreement.
          </p>
        </form>

        <div className="s-reach">
          <a href={SITE.phoneHref}>
            <span className="s-tag">Or call</span>
            <strong>{SITE.phoneDisplay}</strong>
          </a>
          <a href={`mailto:${SITE.email}`}>
            <span className="s-tag">Or write</span>
            <strong>{SITE.email}</strong>
          </a>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--ink-faint)' }}>
          What you send reaches me and nobody else. I do not sell leads and I do
          not pass your details to a network of investors.
        </p>
      </div>
    </section>
  );
}
