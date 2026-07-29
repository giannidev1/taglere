'use client';

/**
 * Thin GA4 wrapper. Every function here is a no-op unless
 * NEXT_PUBLIC_GA_ID is set, so nothing breaks in local dev or on a deploy
 * that has no analytics configured.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Fired on a successful cash-offer request — the site's only conversion. */
export function trackLead() {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'generate_lead', {
    event_category: 'engagement',
    event_label: 'cash_offer_request',
  });
}
