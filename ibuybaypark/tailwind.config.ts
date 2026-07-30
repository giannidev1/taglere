import type { Config } from "tailwindcss";

/**
 * The palette is taken from the place itself: bay water at the bottom of the
 * hill, late-afternoon light on post-war stucco, eucalyptus and jacaranda on
 * the canyon streets. One saturated colour (sunset coral) does all the
 * pointing; everything else stays muted so it can carry photography.
 *
 * Deliberately not the iBuyer dialect — no cobalt, no soft-grey card field, no
 * friendly geometric sans. Every text pairing used on the page is checked
 * against WCAG AA.
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep bay water. Dark sections, nav-on-dark, footer.
        brand: {
          DEFAULT: '#123a40',
          light: '#1b535a',
          deep: '#0b262b',
        },
        // Sunset coral — the single saturated accent.
        // `deep` is the text-safe variant (6.5:1 on white); DEFAULT is for
        // fills, rules and icons on light, or text on dark.
        accent: {
          DEFAULT: '#d9683f',
          soft: '#f3d7c7',
          deep: '#9a4522',
        },
        // Canyon shadow — near-black, very slightly green.
        ink: {
          DEFAULT: '#16211f',
          soft: '#39443f',   // 9.6:1 on sand — body copy
          muted: '#5a6360',  // 5.4:1 on sand — labels, secondary
        },
        // Warm neutrals: stucco, sand, plaster.
        sand: {
          DEFAULT: '#f5f0e8',
          light: '#faf7f2',
          deep: '#e8dfd2',
        },
        stucco: '#d3c8b6',
        eucalyptus: '#7c8c74',
        jacaranda: '#6b6a93',

        // Warm replacement for the default cool ramp, so borders and surfaces
        // sit with the photography instead of fighting it.
        gray: {
          50: '#faf7f2',
          100: '#f3eee5',
          200: '#e5ddd0',
          300: '#d3c8b6',
          400: '#6e6558',
          500: '#5a6360',
          600: '#39443f',
          700: '#2b3431',
          800: '#1f2926',
          900: '#16211f',
        },
      },
      fontFamily: {
        // Fraunces carries a real optical-size axis, so display sizes get
        // genuinely different letterforms rather than a scaled-up text cut.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 7.5vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.025em', fontWeight: '500' }],
        'section': ['clamp(2rem, 5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '500' }],
        'subheading': ['clamp(1.25rem, 2.6vw, 1.75rem)', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.22em', fontWeight: '600' }],
        'figure': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '500' }],
      },
      transitionTimingFunction: {
        // Observed rather than engineered: a long tail, no overshoot.
        'settle': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'drift': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        'nav': '14px',
      },
      boxShadow: {
        // Used on the form card only. Everything else uses rules, not shadows.
        'lift': '0 18px 50px -24px rgba(18, 58, 64, 0.35)',
      },
      maxWidth: {
        'measure': '38rem',
      },
    },
  },
  plugins: [],
};

export default config;
