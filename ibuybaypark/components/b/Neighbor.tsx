import Image from 'next/image';
import { SITE } from '@/lib/site';

export default function Neighbor() {
  return (
    <section className="s-section" id="gianni">
      <div className="s-wrap s-wrap--wide">
        <span className="s-stake" aria-hidden="true" />
        <span className="s-tag">Principal</span>
        <h2 className="s-h2" style={{ marginTop: '0.75rem' }}>
          You are not writing to a call centre.
        </h2>

        <div className="s-neighbor">
          <div className="s-portrait">
            <Image
              src="/headshot.jpg"
              alt="Gianni Tagle"
              fill
              sizes="(min-width: 820px) 15rem, 100vw"
              quality={90}
            />
          </div>

          <div>
            <p style={{ marginBottom: '1.25rem' }}>
              I&rsquo;m Gianni. I lived in Bay Park before I started buying here, so I
              know which blocks catch the bay and which ones catch the freeway. I
              know what the post-war stock hides &mdash; the galvanised supply lines,
              the slab that has moved, the addition somebody framed themselves in
              1974 without pulling a permit.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              I am a licensed California broker, but I am not your agent here. I am
              the buyer, using my own money, for my own account. That is precisely
              why there is no commission: there is no listing and no third party
              to pay.
            </p>
            <p>
              Whoever answers your first message is the same person who walks your
              house, writes the offer, and picks up the phone when something comes
              up two days before closing.
            </p>

            <dl className="s-creds">
              <div className="s-cred">
                <dt>Licence</dt>
                <dd>CA DRE #{SITE.dreLicense}</dd>
              </div>
              <div className="s-cred">
                <dt>Capacity</dt>
                <dd>Buyer, own account</dd>
              </div>
              <div className="s-cred">
                <dt>Where</dt>
                <dd>Bay Park &amp; adjacent</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
