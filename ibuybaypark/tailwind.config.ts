import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep bay blue — dark sections, nav, footer
        brand: {
          DEFAULT: '#0e2a3a',
          light: '#16394d',
        },
        // Sunset orange — CTAs, figures, icons.
        // `deep` is the text-safe variant: DEFAULT only clears ~2.6:1 on white,
        // so use `accent-deep` for any small copy on a light background.
        accent: {
          DEFAULT: '#e08b4c',
          soft: '#f5d9bf',
          deep: '#a3551f',
        },
        gray: {
          100: '#f8f9fa',
          400: '#94a3b8',
          600: '#475569',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'section': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subheading': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3' }],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backdropBlur: {
        'nav': '12px',
      },
      boxShadow: {
        'lift': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 30px rgba(224, 139, 76, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
