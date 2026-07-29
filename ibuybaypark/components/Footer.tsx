'use client';

import { SITE } from '@/lib/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-3xl font-bold tracking-tight"
            aria-label="Back to top"
          >
            <span className="text-white">I Buy </span>
            <span className="text-accent">Bay Park</span>
          </button>

          <p className="text-gray-400 max-w-md">
            Cash offers on Bay Park homes. No commissions, no repairs, no showings.
          </p>

          <div className="text-sm text-gray-500">
            DRE License #{SITE.dreLicense}
          </div>

          <div className="w-24 h-px bg-accent/30" />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a
              href={SITE.phoneHref}
              className="text-gray-400 hover:text-accent transition-colors"
            >
              {SITE.phoneDisplay}
            </a>
            <span className="text-gray-600">•</span>
            <a
              href={`mailto:${SITE.email}`}
              className="text-gray-400 hover:text-accent transition-colors"
            >
              {SITE.email}
            </a>
            <span className="text-gray-600">•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-accent transition-colors"
            >
              Back to top
            </button>
          </div>

          <div className="text-sm text-gray-500 pt-4">
            © {currentYear} {SITE.name}. All rights reserved.
          </div>

          {/* Disclosures. See README — worth confirming with your broker / E&O carrier. */}
          <div className="text-xs text-gray-600 max-w-2xl leading-relaxed space-y-3 pt-2">
            <p>
              {SITE.ownerName} is a licensed California real estate broker (DRE #
              {SITE.dreLicense}) purchasing property for his own account. He is not acting as
              your agent and does not represent you in a transaction arising from this site.
              You are encouraged to seek independent representation or legal advice.
            </p>
            <p>
              If your home is currently listed for sale with a real estate broker, this is not
              a solicitation of that listing.
            </p>
            <p>
              Any figures shown on this site are estimates for illustration only and are not an
              appraisal, a quote, or an offer. Equal Housing Opportunity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
