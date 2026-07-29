/**
 * Site-wide constants. Change contact details here and they update everywhere:
 * nav, footer, contact section, schema markup, and both transactional emails.
 */

export const SITE = {
  name: 'I Buy Bay Park',
  domain: 'ibuybaypark.com',
  url: 'https://ibuybaypark.com',
  tagline: 'Cash offers on Bay Park homes — no commissions, no repairs, no showings.',

  ownerName: 'Gianni Tagle',
  ownerTitle: 'Licensed California Real Estate Broker',
  dreLicense: '02250353',

  email: 'gianni@ibuybaypark.com',
  phoneDisplay: '(619) 363-6347',
  phoneHref: 'tel:+16193636347',
  phoneE164: '+1-619-363-6347',

  /** Resend sending identity. Verify this subdomain in Resend before going live. */
  emailFromDomain: 'updates.ibuybaypark.com',

  neighborhood: 'Bay Park',
  city: 'San Diego',
  region: 'CA',
  /** Bay Park spans both of these — 92110 is the southern half, 92117 the northern. */
  postalCodes: ['92110', '92117'],
  nearbyAreas: ['Morena', 'Bay Ho', 'Clairemont', 'Linda Vista', 'Old Town'],
} as const;

/** Distinguishes these leads from taglere.com leads in HubSpot. */
export const HUBSPOT_LEAD_SOURCE = 'Website - ibuybaypark.com Cash Offer';
