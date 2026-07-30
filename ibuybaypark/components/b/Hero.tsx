'use client';

import Image from 'next/image';

/**
 * The thesis: a plain first-person sentence over the actual hillside, with the
 * parcel's coordinates set as a field note. No slogan, no value-prop triplet.
 */
export default function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <header className="s-hero">
      <div className="s-hero-img">
        <Image
          src="/bay-park-hero.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={88}
          sizes="100vw"
        />
      </div>

      <div className="s-hero-inner">
        <div className="s-wrap">
          <div className="s-fieldnote s-set" style={{ animationDelay: '0.15s' }}>
            <span>32°47′N 117°12′W</span>
            <span>Bay Park</span>
            <span>San Diego</span>
            <span>92110 / 92117</span>
          </div>

          <h1 className="s-set" style={{ animationDelay: '0.3s' }}>
            I buy houses
            <br />
            in <em>Bay Park.</em>
          </h1>

          <p className="s-hero-sub s-set" style={{ animationDelay: '0.5s' }}>
            Cash, no commission, and you name the closing date. I lived on these
            streets before I started buying on them.
          </p>

          <div className="s-hero-cta s-set" style={{ animationDelay: '0.65s' }}>
            <button type="button" className="s-btn s-btn--flag" onClick={() => go('offer')}>
              Ask me for a number
            </button>
            <button type="button" className="s-link" onClick={() => go('ledger')}>
              First, the arithmetic
            </button>
          </div>

          <p className="s-hero-note s-set" style={{ animationDelay: '0.8s' }}>
            Gianni Tagle · Licensed CA broker · DRE #02250353
          </p>
        </div>
      </div>
    </header>
  );
}
