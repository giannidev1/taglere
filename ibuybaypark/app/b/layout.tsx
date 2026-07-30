import type { Metadata } from 'next';
import { Instrument_Serif, Public_Sans, IBM_Plex_Mono } from 'next/font/google';
import './survey.css';

/**
 * Plan B runs its own type system, so it gets a nested layout rather than
 * inheriting Inter from the root. A nested layout can't replace <body>, so the
 * font variables are applied to a wrapper element instead.
 */

// Display: high-contrast, characterful, used with restraint.
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--f-display',
});

// Body: the US federal design system face — literally the typeface of public records.
const body = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--f-body',
});

// Data: every figure, label and coordinate on the page.
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--f-mono',
});

export const metadata: Metadata = {
  title: 'I buy houses in Bay Park | I Buy Bay Park',
  description:
    'A cash offer on your Bay Park house from someone who has lived here. No commission, no repairs, no showings, and you name the closing date.',
  robots: {
    // An internal design comparison, not a page that should be indexed.
    index: false,
    follow: false,
  },
};

export default function SurveyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`survey ${display.variable} ${body.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
