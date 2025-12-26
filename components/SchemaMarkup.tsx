export default function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Tagle Real Estate',
    description: 'San Diego\'s only 0.5% commission full-service real estate brokerage',
    url: 'https://taglere.com',
    telephone: '+1-619-555-0100',
    email: 'gianni@taglere.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: 'San Diego',
    },
    priceRange: '0.5% commission',
    founder: {
      '@type': 'Person',
      name: 'Gianni Tagle',
      jobTitle: 'Principal Broker',
    },
    sameAs: [
      // Add social media profiles here when available
      // 'https://www.linkedin.com/in/giannitagle',
      // 'https://www.facebook.com/taglerealestate',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
