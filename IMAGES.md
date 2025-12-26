# Hero Background Image Setup

## Quick Setup

1. **Download a San Diego image from Unsplash:**
   - Go to: https://unsplash.com/s/photos/san-diego-skyline
   - Recommended searches:
     - "san diego skyline sunset"
     - "coronado bridge golden hour"
     - "san diego bay aerial"
     - "la jolla coastline sunset"

2. **Select image criteria:**
   - High resolution (at least 1920x1080, preferably 4K)
   - Landscape orientation
   - Golden hour / sunset lighting (warm tones work best with gold accent color)
   - Clear, uncluttered composition
   - Good contrast areas for text overlay

3. **Download and optimize:**
   - Download the highest quality version
   - Rename to `hero-bg.jpg`
   - Place in `/public/` directory

4. **Optional optimization (recommended):**
   ```bash
   # Install ImageMagick or use an online compressor
   # Resize to 1920px width, optimize quality
   convert hero-bg.jpg -resize 1920x -quality 85 public/hero-bg.jpg
   ```

## Recommended Images

**Search Terms:**
- "san diego skyline sunset" - Classic city view
- "coronado bridge golden hour" - Iconic San Diego landmark
- "san diego harbor aerial" - Comprehensive bay view
- "la jolla cove sunset" - Natural coastal beauty

**Photographers to check:**
- @californiabagger (San Diego specialist)
- @danielkordan (Landscape specialist)
- @paola_andrea (Sunset specialist)

## Alternative: Use a Placeholder

If you want to launch without an image first, the site works beautifully with just the gradient. The image is an enhancement, not a requirement.

## License

All Unsplash images are free for commercial use. No attribution required, though appreciated.

---

**Once downloaded, the image will automatically appear with:**
- Subtle parallax scroll
- Ken Burns zoom animation
- Navy gradient overlay for text readability
- Optimized loading with Next.js Image
