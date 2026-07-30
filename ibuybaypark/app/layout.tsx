import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";
import Analytics from "@/components/Analytics";
import { SITE } from "@/lib/site";

/**
 * Display: Fraunces, for its genuine optical-size axis — headline sizes get
 * different letterforms rather than a scaled-up text cut. SOFT and WONK are
 * dialled toward the warm, slightly irregular end.
 */
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

/** Body: Archivo, a quiet wide-set grotesque. Carries small caps well. */
const body = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Sell Your Bay Park Home for Cash | I Buy Bay Park",
  description:
    "I buy homes in Bay Park, San Diego for cash — no commissions, no repairs, no showings, and you pick the close date. Licensed CA broker buying for his own account. Get a no-obligation offer.",
  keywords: [
    "sell my house fast Bay Park",
    "cash home buyer Bay Park San Diego",
    "sell house as-is San Diego",
    "Bay Park 92110",
    "Bay Park 92117",
    "no commission home sale San Diego",
    "we buy houses San Diego",
    "sell house without a realtor San Diego",
    "Gianni Tagle",
  ],
  authors: [{ name: SITE.ownerName }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Sell Your Bay Park Home for Cash | I Buy Bay Park",
    description:
      "No commissions, no repairs, no showings. A cash offer on your Bay Park home from a licensed local broker — and you pick the close date.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Bay Park Home for Cash | I Buy Bay Park",
    description:
      "No commissions, no repairs, no showings. A cash offer on your Bay Park home, closed on your timeline.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Marks the document as scripted before first paint. Every hidden-then-revealed
 * state in globals.css is scoped to `.js`, so with JavaScript disabled this
 * class never lands and the page renders fully visible instead of blank.
 */
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <SchemaMarkup />
      </head>
      <body className="font-sans">
        {children}

        {/*
          Places autocomplete enhances one optional convenience field, so it
          must not block first paint. `afterInteractive` keeps it off the
          critical path; AddressAutocomplete waits for it and degrades to a
          plain text input if it never arrives.
        */}
        {process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY && (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
            strategy="afterInteractive"
          />
        )}
        <Analytics />
      </body>
    </html>
  );
}
