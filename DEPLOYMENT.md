# Deployment Guide

## Quick Start

Your site is ready to deploy! Here's how to get it live.

## Deploy to Vercel (Recommended)

### Option 1: GitHub → Vercel (Easiest)

1. **Create a GitHub repository:**
   ```bash
   git add .
   git commit -m "Initial commit: Tagle RE website"
   gh repo create tagle-re --public --source=. --remote=origin --push
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Configure custom domain:**
   - In Vercel dashboard → Settings → Domains
   - Add `taglere.com`
   - Follow DNS instructions from your domain registrar

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Environment Variables

If you integrate a form service later, add these in Vercel dashboard:

```
NEXT_PUBLIC_FORM_ENDPOINT=your_endpoint
```

## Custom Domain Setup

### DNS Configuration for taglere.com

Add these records in your domain registrar (GoDaddy, Namecheap, etc.):

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Post-Deployment Checklist

- [ ] Update DRE license number in `components/Footer.tsx`
- [ ] Add professional headshot to `public/` folder
- [ ] Update contact information (phone, email) in `components/sections/Contact.tsx`
- [ ] Connect form to email service (see below)
- [ ] Set up Google Analytics (optional)
- [ ] Test on mobile devices
- [ ] Share with friends for feedback

## Form Integration Options

### Option 1: Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form endpoint
3. Update `components/sections/Contact.tsx`:

```typescript
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);

  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  // ... rest of the code
};
```

### Option 2: Resend (More Professional)

1. Sign up at [resend.com](https://resend.com)
2. Create API key
3. Create `/app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();

  await resend.emails.send({
    from: 'website@taglere.com',
    to: 'gianni@taglere.com',
    subject: 'New Contact Form Submission',
    html: `<p>Name: ${body.name}</p>...`,
  });

  return NextResponse.json({ success: true });
}
```

## Performance Optimization

The site is already optimized, but for even better scores:

1. **Add images:**
   - Use WebP format
   - Use Next.js Image component
   - Optimize before uploading

2. **Enable Vercel Analytics:**
   - Free in Vercel dashboard
   - No code changes needed

3. **Add caching headers:**
   - Vercel handles this automatically
   - For static assets, already optimized

## Monitoring

### Check Site Health

```bash
# Lighthouse score
npx lighthouse https://taglere.com --view

# Check mobile performance
npx lighthouse https://taglere.com --preset=mobile --view
```

### Analytics Options

- **Vercel Analytics**: Built-in, privacy-friendly
- **Plausible**: Privacy-focused, lightweight
- **Google Analytics**: More features, less privacy

## Troubleshooting

### Build fails on Vercel

Check build logs. Most common issues:
- Environment variables not set
- SSL certificate issues (Vercel handles this)

### Form not working

- Check console for errors
- Verify endpoint URL
- Test with a simple alert first

### Fonts not loading

If you see font errors, the SSL certificate issue is likely system-specific. On Vercel, this won't be a problem.

## Need Help?

Contact information:
- Vercel Support: vercel.com/support
- Next.js Docs: nextjs.org/docs
- This codebase: Check README.md

---

**Your site is production-ready. Deploy with confidence!**
