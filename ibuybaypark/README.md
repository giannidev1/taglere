# ibuybaypark.com

A single-page lead-generation site for **I Buy Bay Park** — Gianni Tagle buying homes in the
Bay Park neighborhood of San Diego for cash.

The page has one job: turn a Bay Park homeowner into a cash-offer request.

## Positioning

> A cash offer on your Bay Park home from a neighbor who's lived here — no commissions, no
> repairs, no showings, and you pick the close date.

Four pillars, in priority order: **no commissions**, **cash**, **flexible close**, **local**.

### Copy rules

These are deliberate. Please keep to them when editing content:

- Never write "beat the market", "above market value", or "highest price".
- Compare **net proceeds** — what a seller actually walks away with — and always label figures
  as estimates, never promises.
- Never guarantee an offer amount, or that a cash sale nets more in every case. The FAQ says
  plainly that a cash offer is usually below list price, and that listing is sometimes the
  better answer. That honesty is the differentiator against the national "we buy houses"
  operators, so don't sand it off.
- Disclose the licensee-as-principal status wherever it's relevant.

## Relationship to taglere.com

Built from the taglere.com codebase — same stack, same animation primitives, same lead
pipeline. The scaffolding is shared; the content, palette, and lead form are not. It is a
**separate site for a separate business activity**: taglere.com sells listing services at 0.5%,
this site buys houses directly. There is intentionally no cross-sell between them.

This app currently lives in a subdirectory of the `taglere` repository because repository
creation wasn't available when it was built. It is entirely self-contained — its own
`package.json`, its own install, its own build — and can be moved to its own repository by
copying this directory out. When you do, remove the `ibuybaypark` entries from the parent
repo's `.gitignore` and `tsconfig.json` `exclude` array.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion ·
lucide-react · react-hook-form · Resend (email) · HubSpot (CRM) · Google Places (address
autocomplete).

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
npm run build                # production build
```

Every integration is optional in development. With no environment variables set the page
renders and the form validates; only the actual submission needs `RESEND_API_KEY`.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | to submit the form | Sends the lead notification and the seller's confirmation |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | no | Bay Park–biased address autocomplete; degrades to a plain text input |
| `HUBSPOT_ACCESS_TOKEN` | no | Creates/updates the contact and attaches a note. Failures are logged, never fatal |
| `NEXT_PUBLIC_GA_ID` | no | GA4 plus a `generate_lead` event. Nothing loads and no cookies are set while unset |

## Where the content lives

| What | File |
|---|---|
| Contact details, name, DRE licence, ZIPs | `lib/site.ts` |
| Cost-of-selling rates and the median price | `lib/sellingCosts.ts` |
| FAQ questions and answers | `lib/faqs.ts` |
| Form dropdown options | `lib/leadForm.ts` |
| Colours, type scale, shadows | `tailwind.config.ts` |
| Page metadata and SEO keywords | `app/layout.tsx` |
| Section order | `app/page.tsx` |
| Section copy | `components/sections/*.tsx` |
| Disclosures | `components/Footer.tsx` |
| Transactional email templates | `app/api/contact/route.ts` |

`lib/sellingCosts.ts`, `lib/faqs.ts`, and `lib/site.ts` are each a single source of truth
consumed in several places — the calculator and its own assumptions footnote read the same
rates, and the FAQ accordion and the FAQPage structured data read the same answers. Editing
one file updates every place it appears.

See `CUSTOMIZATION.md` for a task-by-task guide and `IMAGES.md` for the photography slots.

## Compliance

The footer carries three disclosures, echoed in the About section, FAQ, and the confirmation
email:

1. **Licensee acting as principal** — Gianni is a licensed California broker (DRE #02250353)
   buying for his own account, not acting as the seller's agent. California expects a licensee
   acting as a principal to disclose that status.
2. **Non-solicitation** — standard cover so the marketing doesn't tread on another broker's
   active listing.
3. **Estimates are not appraisals** — plus Equal Housing Opportunity.

**Please have your broker or E&O carrier review this wording before launch.** It is included
as the safe default, not as legal advice.

### One open item

The copy assumes Gianni is **buying with his own funds, for his own account, to hold or
renovate**. If contracts are instead being assigned to third-party buyers (wholesaling), then
FAQ #3, the second paragraph of the About bio, and the footer disclosure are all inaccurate as
written, and California requires assignment intent to be disclosed. Fix those three places
before launch if that's the model.
