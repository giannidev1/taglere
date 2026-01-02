import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tagle Real Estate | 0.5% Commission • San Diego",
  description: "Sell your home with Tagle Real Estate and keep your equity. 0.5% commission, full service, no compromises. San Diego's only 0.5% full-service brokerage.",
  keywords: ["San Diego real estate", "low commission", "0.5% commission", "real estate broker", "Gianni Tagle"],
  authors: [{ name: "Gianni Tagle" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Tagle Real Estate | 0.5% Full-Service Real Estate",
    description: "San Diego's only 0.5% commission full-service brokerage. Sell your home and keep your equity. No compromises.",
    url: "https://taglere.com",
    siteName: "Tagle Real Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tagle Real Estate | 0.5% Full-Service Real Estate",
    description: "San Diego's only 0.5% commission full-service brokerage. Sell your home and keep your equity.",
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
      </body>
    </html>
  );
}
