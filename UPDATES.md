# Site Updates - December 2025

## Latest Refinements

### Commission Rate Update (2.5% → 3%)
**Impact: More accurate comparison, stronger value proposition**

- **The Problem section**: Now shows $30,000 vs $5,000 (was $25,000 vs $5,000)
- **Calculator**: Default comparison updated to 3% traditional rate
- **FAQ**: Updated text to reflect "2.5-3% savings"
- **Result**: $25,000 savings on $1M home (up from $20,000)

### San Diego Hero Background
**Impact: Premium, location-branded feel**

**What was added:**
- Conditional background image detection
- Ken Burns zoom animation (1.0 → 1.05 scale over 20s)
- Parallax scroll effect (already existed, enhanced with image layer)
- Navy gradient overlay (75% opacity) for text readability
- Graceful fallback to original gradient if no image

**How to activate:**
1. Download San Diego image from Unsplash (see `IMAGES.md`)
2. Rename to `hero-bg.jpg`
3. Place in `public/` folder
4. Site automatically detects and uses it

**Recommended images:**
- Search: "san diego skyline sunset"
- Search: "coronado bridge golden hour"
- Search: "san diego bay aerial"

**Files changed:**
- `components/sections/Hero.tsx` - Added Image component, Ken Burns effect
- `IMAGES.md` - Comprehensive guide created
- `CUSTOMIZATION.md` - Updated with hero image instructions

### Enhanced Icon Animations
**Impact: More interactive, premium feel**

**Services section:**
- Added independent icon float animation (`translateY -4px`)
- Icons now have separate hover effect from cards
- Smooth spring easing for polished feel

**Process section:**
- Desktop: Icon scales 1.1x and rotates 5° on hover
- Mobile: Icon scales 1.05x on tap/hover
- Both versions have smooth, consistent animations

**FAQ section:**
- Already premium (kept as-is with Plus/Minus rotation)

**Files changed:**
- `components/sections/Services.tsx`
- `components/sections/Process.tsx`

## Performance Impact

**Build stats:**
- Page size: 28.9 kB (optimized)
- First Load JS: 154 kB
- All pages static (optimal SEO)
- Hero image lazy-loads with Next.js Image optimization

**Before/After:**
- Commission: $20K → $25K savings highlighted
- Hero: Static gradient → Dynamic San Diego imagery (when image added)
- Icons: Static → Interactive with float/rotate effects

## Testing Checklist

- [x] Build compiles successfully
- [x] All animations smooth
- [x] Responsive across breakpoints
- [x] Graceful fallback if hero-bg.jpg missing
- [ ] Download hero image (manual step for user)
- [ ] Test on mobile devices
- [ ] Verify Lighthouse score 90+

## Next Steps

1. **Download hero background** (see `IMAGES.md`)
2. **Update content** (DRE, contact info, bio)
3. **Test animations** on local dev server
4. **Deploy to Vercel**

---

**Result:** Site now has stronger value proposition (3% comparison), San Diego-branded premium feel, and polished micro-interactions throughout.
