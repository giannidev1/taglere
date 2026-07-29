import { FAQS } from '@/lib/faqs';
import { SITE } from '@/lib/site';

export default function SchemaMarkup() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    telephone: SITE.phoneE164,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: 'US',
    },
    // Bay Park spans two ZIPs — both are declared so neither half of the
    // neighborhood is left out of local results.
    areaServed: [
      {
        '@type': 'Place',
        name: `${SITE.neighborhood}, ${SITE.city}, ${SITE.region}`,
      },
      ...SITE.postalCodes.map((postalCode) => ({
        '@type': 'PostalAddress',
        postalCode,
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: 'US',
      })),
      ...SITE.nearbyAreas.map((name) => ({
        '@type': 'Place',
        name: `${name}, ${SITE.city}, ${SITE.region}`,
      })),
    ],
    founder: {
      '@type': 'Person',
      name: SITE.ownerName,
      jobTitle: SITE.ownerTitle,
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'California DRE License',
      value: SITE.dreLicense,
    },
    sameAs: [
      // Add social profiles here when they exist.
    ],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
