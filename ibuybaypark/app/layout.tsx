import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";
import Analytics from "@/components/Analytics";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <SchemaMarkup />
        {process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY && (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
