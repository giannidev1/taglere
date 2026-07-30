import Script from 'next/script';

/**
 * Renders nothing at all — no script tags, no cookies, no third-party request
 * — until NEXT_PUBLIC_GA_ID is set in the environment.
 *
 * The env var is read here directly and deliberately. This is a server
 * component, and importing the shared `GA_ID` from lib/analytics.ts (which is
 * a 'use client' module) does not give you the string: across that boundary
 * the import resolves to a client-reference object, which is always truthy and
 * stringifies to "[object Object]". That made this component load
 * googletagmanager.com with `id=[object Object]` on every page view even when
 * no analytics ID was configured.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
