import { SITE } from '@/lib/site';

/**
 * The disclosures are unchanged in substance from Plan A — they are a
 * compliance matter, not a design one.
 */
export default function Foot() {
  const year = new Date().getFullYear();

  return (
    <footer className="s-foot">
      <div className="s-wrap">
        <span className="s-tag" style={{ color: 'var(--flag)' }}>
          {SITE.domain}
        </span>
        <h2 style={{ marginTop: '0.75rem' }}>I Buy Bay Park</h2>
        <p style={{ marginTop: '1rem', color: '#9aa39f' }}>
          Bay Park, San Diego &mdash; 92110 and 92117, plus Morena, Bay Ho,
          Clairemont, Linda Vista and Old Town.
        </p>

        <p style={{ marginTop: '1.5rem' }}>
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          {'  ·  '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>

        <div className="s-foot-disc">
          <p>
            {SITE.ownerName} is a licensed California real estate broker (DRE #
            {SITE.dreLicense}) purchasing property for his own account. He is not
            acting as your agent and does not represent you in a transaction
            arising from this site. You are encouraged to seek independent
            representation or legal advice.
          </p>
          <p>
            If your home is currently listed for sale with a real estate broker,
            this is not a solicitation of that listing.
          </p>
          <p>
            Figures shown on this site are estimates for illustration only and
            are not an appraisal, a quote, or an offer. Equal Housing
            Opportunity.
          </p>
          <p style={{ color: '#6f7874' }}>
            © {year} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
