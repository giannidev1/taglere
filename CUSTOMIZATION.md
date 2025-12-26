# Customization Guide

Quick reference for updating content and customizing your site.

## Essential Updates

### 0. Hero Background Image (NEW!)
**Download San Diego imagery for premium feel**

See `IMAGES.md` for detailed instructions, but quick steps:
1. Go to https://unsplash.com/s/photos/san-diego-skyline
2. Download a high-quality sunset/golden hour image
3. Rename to `hero-bg.jpg`
4. Place in `public/` folder
5. The site will automatically detect and use it with Ken Burns zoom effect

**Result:** Cinematic San Diego-branded hero with parallax scroll and subtle zoom animation.

### 1. DRE License Number
**File:** `components/Footer.tsx`
**Line:** 24

```typescript
DRE License #XXXXXXX  // Replace with your actual DRE number
```

### 2. Contact Information
**File:** `components/sections/Contact.tsx`
**Lines:** 39-53

```typescript
const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(619) 555-0100',        // Update this
    href: 'tel:+16195550100',       // Update this
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'gianni@taglere.com',    // Update this
    href: 'mailto:gianni@taglere.com', // Update this
  },
  // ...
];
```

### 3. Professional Headshot
**Add to:** `public/headshot.jpg`
**Update in:** `components/sections/About.tsx`
**Line:** 59

Replace the placeholder div with:
```typescript
<Image
  src="/headshot.jpg"
  alt="Gianni Tagle"
  fill
  className="object-cover"
/>
```

### 4. Bio Content
**File:** `components/sections/About.tsx`
**Lines:** 80-94

Update the three paragraphs with your actual story and credentials.

### 5. Meta Tags & SEO
**File:** `app/layout.tsx`
**Lines:** 11-33

Review and update:
- Title
- Description
- Keywords
- OpenGraph data

## Color Customization

**File:** `tailwind.config.ts`

```typescript
colors: {
  navy: {
    DEFAULT: '#0a1628',  // Change primary dark color
    light: '#0f1f35',
  },
  gold: {
    DEFAULT: '#c9a962',  // Change accent color
    soft: '#e8dcc4',
  },
}
```

## Content Sections

### Hero Tagline
**File:** `components/sections/Hero.tsx`
**Lines:** 25-35

Update the headline and subheadline text.

### Commission Rates
**File:** `components/sections/Calculator.tsx`
**Lines:** 11-12

```typescript
const traditionalRate = 0.025;  // 2.5%
const tagleRate = 0.005;        // 0.5%
```

### Services List
**File:** `components/sections/Services.tsx`
**Lines:** 10-37

Add, remove, or modify service items.

### Process Steps
**File:** `components/sections/Process.tsx`
**Lines:** 10-31

Customize the 4-step process description.

### FAQ Questions
**File:** `components/sections/FAQ.tsx`
**Lines:** 12-42

Update questions and answers to match your specific situation.

## Adding Social Media Links

### Footer
**File:** `components/Footer.tsx`

Add social icons:
```typescript
import { Instagram, Linkedin, Facebook } from 'lucide-react';

// In the footer, add:
<div className="flex gap-4">
  <a href="https://linkedin.com/in/yourusername">
    <Linkedin className="w-6 h-6" />
  </a>
  {/* etc */}
</div>
```

### Schema Markup
**File:** `components/SchemaMarkup.tsx`
**Lines:** 25-28

Uncomment and update social links.

## Adding Analytics

### Google Analytics

1. **Get tracking ID** from analytics.google.com
2. **Create** `components/Analytics.tsx`:

```typescript
import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </>
  );
}
```

3. **Import in** `app/layout.tsx`

## Logo Customization

### Text Logo (Current)
**File:** `components/Navigation.tsx`
**Line:** 65

```typescript
Tagle <span className="text-gold">RE</span>
```

### Image Logo (If you have one)

1. Add logo to `public/logo.svg`
2. Replace in Navigation.tsx:

```typescript
import Image from 'next/image';

<Image
  src="/logo.svg"
  alt="Tagle RE"
  width={120}
  height={40}
/>
```

## Animation Adjustments

### Reduce Motion (Accessibility)

Add to `app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Speed Up Animations

**Files:** Any component using Framer Motion

Change `duration` values:
```typescript
transition={{ duration: 0.3 }}  // Faster (was 0.6)
```

## Mobile Breakpoints

**File:** `tailwind.config.ts`

Current breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

To add custom:
```typescript
screens: {
  'tablet': '640px',
  'laptop': '1024px',
  'desktop': '1280px',
}
```

## Quick Tips

1. **Test changes locally:**
   ```bash
   npm run dev
   ```

2. **Check build before deploying:**
   ```bash
   npm run build
   ```

3. **Use browser DevTools:**
   - Right-click → Inspect
   - Test responsive design
   - Check console for errors

4. **Keep backups:**
   - Commit to git before major changes
   - Use branches for experiments

---

Need more customization? Check the component files — they're well-commented and easy to modify.
