import { SITE } from '@/lib/site';

/**
 * A server component — the year is resolved at render time and the two
 * "back to top" affordances are anchors rather than scroll handlers, so the
 * footer ships no client JavaScript at all.
 *
 * The disclosures are the legal spine of a licensed broker buying for his own
 * account, so they get real type rather than being shrunk into invisibility.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="on-dark relative z-10 bg-brand px-6 py-16 text-sand lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 border-b border-sand/20 pb-10 md:flex-row md:items-end md:justify-between">
          <a href="#top" className="font-display text-3xl tracking-tight">
            <span className="text-sand-light">I Buy </span>
            <span className="italic text-accent">Bay Park</span>
          </a>

          <p className="max-w-sm text-sand/70">
            Cash offers on Bay Park homes. No commissions, no repairs, no showings.
          </p>
        </div>

        <div className="flex flex-col gap-6 border-b border-sand/20 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={SITE.phoneHref}
              className="wipe-link text-lg text-sand-light transition-colors duration-300 hover:text-accent-soft"
            >
              {SITE.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="wipe-link text-lg text-sand-light transition-colors duration-300 hover:text-accent-soft"
            >
              {SITE.email}
            </a>
          </div>

          <div className="flex items-center gap-8 text-sm text-sand/70">
            <span>DRE License #{SITE.dreLicense}</span>
            <a
              href="#top"
              className="wipe-link transition-colors duration-300 hover:text-accent-soft"
            >
              Back to top
            </a>
          </div>
        </div>

        <div className="space-y-4 pt-8 text-sm leading-relaxed text-sand/70">
          <p className="max-w-3xl">
            {SITE.ownerName} is a licensed California real estate broker (DRE #
            {SITE.dreLicense}) purchasing property for his own account. He is not acting
            as your agent and does not represent you in a transaction arising from this
            site. You are encouraged to seek independent representation or legal advice.
          </p>
          <p className="max-w-3xl">
            If your home is currently listed for sale with a real estate broker, this is
            not a solicitation of that listing.
          </p>
          <p className="max-w-3xl">
            Any figures shown on this site are estimates for illustration only and are
            not an appraisal, a quote, or an offer. Equal Housing Opportunity.
          </p>
          <p className="pt-4">
            © {currentYear} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
