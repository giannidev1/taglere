# Tagle Real Estate

Premium real estate website for Tagle Real Estate — San Diego's only 0.5% commission full-service brokerage.

## Features

- **Premium Design**: Apple-level design with smooth animations and micro-interactions
- **Interactive Calculator**: Real-time commission savings calculator
- **Responsive**: Mobile-first design, optimized for all devices
- **Performance**: Built with Next.js 14 for optimal performance
- **SEO Optimized**: Meta tags, schema markup, and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

- Form submission endpoint (Formspree, Resend, etc.)
- Email service configuration
- Analytics tracking ID

### Contact Form Integration

The contact form is ready to integrate with your preferred service:

1. **Formspree**: Update `components/sections/Contact.tsx` with your Formspree endpoint
2. **Resend**: Create an API route and integrate with Resend API
3. **Custom**: Implement your own form handling logic

### Content Updates

Key areas to customize:

- **DRE License**: Update in `components/Footer.tsx`
- **Contact Info**: Update phone/email in `components/sections/Contact.tsx`
- **Bio**: Update Gianni's bio in `components/sections/About.tsx`
- **Headshot**: Add professional photo to `public/` and update `About.tsx`
- **SEO Meta**: Update in `app/layout.tsx`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Custom Deployment

```bash
npm run build
# Deploy the .next folder and package.json
```

## Performance

- Target: 90+ Lighthouse score
- Optimizations included:
  - Image optimization with Next.js Image
  - Font optimization with next/font
  - Lazy loading for animations
  - Code splitting
  - CSS optimization

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

All rights reserved © 2025 Tagle Real Estate

---

Built with precision. Designed for conversion.
