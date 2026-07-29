# Customization Guide

Where to change things. Most content edits are in `lib/` — deliberately, so a number or a
phone number is never typed in twice.

## Contact details, name, licence, ZIP codes

**`lib/site.ts`** — one object, read by the nav, footer, contact section, schema markup, and
both transactional emails. Change it here and it changes everywhere.

```ts
export const SITE = {
  email: 'gianni@ibuybaypark.com',
  phoneDisplay: '(619) 363-6347',
  phoneHref: 'tel:+16193636347',
  dreLicense: '02250353',
  postalCodes: ['92110', '92117'],   // Bay Park spans both halves
  ...
}
```

If you ever want a separate tracking number for Bay Park lead attribution, change
`phoneDisplay`, `phoneHref` and `phoneE164` here and nowhere else.

## The cost-of-selling numbers

**`lib/sellingCosts.ts`** — the rates behind the Problem section, the Calculator, the
Calculator's own "how these numbers are calculated" footnote, and the slider bounds.

```ts
export const TRADITIONAL_SALE_COSTS = [
  { key: 'commissions', label: 'Agent commissions', rate: 0.05, note: '…' },
  { key: 'closing',     label: 'Seller closing costs', rate: 0.015, note: '…' },
  { key: 'repairs',     label: 'Repairs & pre-list prep', rate: 0.015, note: '…' },
  { key: 'concessions', label: 'Buyer credits & concessions', rate: 0.01, note: '…' },
  { key: 'carrying',    label: 'Carrying costs while listed', rate: 0.0035 * 2, note: '…' },
];

export const BAY_PARK_MEDIAN_PRICE = 1_400_000;  // slider's starting position
```

Change a `rate` and the animated figure, the itemised row, the total, the net, and the public
assumptions footnote all update together — they cannot drift apart. **Update the matching
`note` too**, since that's what a visitor reads when they open the footnote.

`BAY_PARK_MEDIAN_PRICE` is the slider default and the figure quoted in the Problem section.
Worth refreshing once or twice a year — it was $1,425,000 as of mid-2026.

## FAQ

**`lib/faqs.ts`** — an array of `{ question, answer }`. Rendered by the accordion *and* emitted
as FAQPage structured data for Google, so:

- Keep answers plain text. No HTML, no markdown.
- Keep them honest. FAQ #2 ("will your offer be below what I could list it for?") answers
  *yes*. That candour is the point — don't soften it.

## Section copy

One file per section in `components/sections/`:

| Section | File |
|---|---|
| Headline, subhead, CTAs | `Hero.tsx` |
| Cost-of-selling comparison | `Problem.tsx` |
| Net proceeds calculator | `Calculator.tsx` |
| Six benefit cards | `Benefits.tsx` |
| Bio and credentials | `About.tsx` |
| Four-step process | `Process.tsx` |
| Offer form | `Contact.tsx` |

Section order lives in `app/page.tsx`. The calculator sits third on purpose — the money
argument should land before the visitor has to decide whether they trust Gianni.

## Form fields

**`lib/leadForm.ts`** — the timeline and condition dropdown options, plus their validators.
Shared by the client form and the API route, so adding an option makes it valid on both sides
at once. Adding a whole new field means touching `components/sections/Contact.tsx` (the input),
`lib/leadForm.ts` (the type), and `app/api/contact/route.ts` (email + CRM note).

## Colours

**`tailwind.config.ts`**

```ts
brand:  { DEFAULT: '#0e2a3a', light: '#16394d' },              // deep bay blue
accent: { DEFAULT: '#e08b4c', soft: '#f5d9bf', deep: '#a3551f' } // sunset orange
```

Use `accent-deep` for small text on a light background — plain `accent` only reaches about
2.6:1 against white, which fails contrast for body copy. `accent` is for large text, icons,
fills, and buttons (where the dark `brand` text sits on top of it).

Hard-coded hex values also appear in `app/globals.css` (slider thumb, `.text-gradient`, grain),
`components/OgCard.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `public/favicon.svg`, and the
email templates in `app/api/contact/route.ts`. Those can't read Tailwind tokens, so a palette
change means updating them by hand.

## Emails

**`app/api/contact/route.ts`** — two templates: `getLeadNotificationEmail` (to Gianni) and
`getLeadConfirmationEmail` (to the seller). Both are plain template strings. All interpolated
user input goes through `escapeHtml` — keep it that way.

The `from` addresses are built from `SITE.emailFromDomain` (`updates.ibuybaypark.com`), which
must be verified in Resend before anything sends. See `DEPLOYMENT.md`.

## Metadata and SEO

**`app/layout.tsx`** — title, description, keywords, OpenGraph, Twitter card. Social card
artwork is `components/OgCard.tsx`, shared by `app/opengraph-image.tsx` and
`app/twitter-image.tsx`.

## Analytics

Set `NEXT_PUBLIC_GA_ID` and GA4 loads plus a `generate_lead` event on each successful
submission. Leave it unset and nothing loads at all — no scripts, no cookies.
`components/Analytics.tsx` and `lib/analytics.ts`.

## Quick checks

```bash
npm run dev     # iterate
npm run build   # always run before deploying
```
