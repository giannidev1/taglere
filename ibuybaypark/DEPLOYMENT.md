# Deployment

## 1. Give it its own repository (recommended first step)

This app currently lives at `ibuybaypark/` inside the `taglere` repo because repository
creation wasn't available in the session that built it. It's fully self-contained, so moving it
out is a copy:

```bash
cp -r taglere/ibuybaypark ~/ibuybaypark
cd ~/ibuybaypark
git init && git add -A && git commit -m "Initial commit: ibuybaypark.com"
git remote add origin git@github.com:giannidev1/ibuybaypark.git
git push -u origin main
```

Then tidy the parent repo: remove the `/ibuybaypark/*` lines from `taglere/.gitignore`, drop
`"ibuybaypark"` from the `exclude` array in `taglere/tsconfig.json`, and delete the directory.

**If you'd rather leave it where it is**, that works too — just set Vercel's **Root
Directory** to `ibuybaypark` (step 2).

## 2. Vercel project

New project, imported from whichever repo the code ends up in.

| Setting | Value |
|---|---|
| Framework preset | Next.js (auto-detected) |
| Root Directory | *(blank if its own repo, else `ibuybaypark`)* |
| Build command | `npm run build` |
| Install command | `npm install` |

This must be a **separate Vercel project** from taglere.com — separate domain, separate env
vars, separate analytics.

### Environment variables

Add under Settings → Environment Variables, for Production *and* Preview:

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | Required for the form to send |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | Same key as taglere.com. Add `ibuybaypark.com` to the key's HTTP referrer restrictions, or autocomplete will silently fail in production |
| `HUBSPOT_ACCESS_TOKEN` | Same token as taglere.com |
| `NEXT_PUBLIC_GA_ID` | Optional. Use a **separate GA4 property** from taglere.com |

The `NEXT_PUBLIC_*` values are compiled into the client bundle, so changing one needs a
redeploy, not just a restart.

## 3. Domain

Point `ibuybaypark.com` at the Vercel project and let it issue the certificate. Add both the
apex and `www` (Vercel redirects one to the other automatically).

## 4. Resend sending domain

**This is the step most likely to bite you.** The site sends from
`updates@updates.ibuybaypark.com`, which is a *different* domain from taglere's sending domain,
so taglere's existing verification does not carry over.

1. Resend → Domains → Add Domain → `updates.ibuybaypark.com`
2. Add the DKIM and SPF records it gives you to the `ibuybaypark.com` DNS zone
3. Wait for Resend to show **Verified**

Until that's green, every submission returns a 500 and the seller sees the error message. Test
with a real submission before sending any traffic at the site.

The sending identity is built from `SITE.emailFromDomain` in `lib/site.ts` if you'd rather use
a different subdomain.

## 5. HubSpot

The existing private app works — it needs `crm.objects.contacts.read`,
`crm.objects.contacts.write`, and notes write scope. Leads from this site arrive with:

```
lead_source = "Website - ibuybaypark.com Cash Offer"
```

which is what keeps them separable from taglere.com leads. Consider a saved list or workflow
filtered on that value.

HubSpot failures are caught and logged, never fatal — if the CRM call fails, the emails have
already gone out and the lead isn't lost.

## 6. Pre-launch checklist

- [ ] `npm run build` passes locally
- [ ] Real submission arrives at `gianni@ibuybaypark.com`, carrying timeline and condition
- [ ] Confirmation email arrives at the submitter's address and isn't in spam
- [ ] HubSpot contact created with the right `lead_source`, note attached
- [ ] Submit twice with the same email to exercise the existing-contact update path
- [ ] Address autocomplete suggests Bay Park addresses in production
- [ ] `/sitemap.xml`, `/robots.txt`, `/icon`, `/opengraph-image` all load
- [ ] Both JSON-LD blocks pass Google's Rich Results Test (LocalBusiness + FAQPage)
- [ ] Broker / E&O review of the footer disclosures — see README
- [ ] Confirm the wholesaling question from the README, and fix the copy if needed
- [ ] Swap the placeholder photography — see `IMAGES.md`
- [ ] Submit the site to Google Search Console and request indexing

## Note on the shared Google Places key

The Places key is `NEXT_PUBLIC_`, so it ships to the browser on both sites — that's unavoidable
for client-side autocomplete and is why HTTP referrer restrictions matter. Restrict the key to
`taglere.com/*` and `ibuybaypark.com/*` (plus `localhost` for development) so a leaked key
can't be used to run up billing elsewhere.
