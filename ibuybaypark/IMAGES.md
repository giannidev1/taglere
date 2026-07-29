# Photography

**Current state: the headshot is real. The three scenic photos are placeholders** carried over
from taglere.com — generic San Diego coastline, not Bay Park. The site builds and looks
finished, but swapping those three for real neighborhood photography is the single
highest-impact improvement left: a seller who recognises their own streets trusts the page far
more than one looking at stock coastline.

Drop replacements into `public/` using the exact filenames below. No code changes needed.

| File | Where it appears | Currently | What it wants |
|---|---|---|---|
| `bay-park-hero.jpg` | Full-bleed hero, behind the headline | taglere's `hero-bg.jpg` | Bay Park hillside looking west over Mission Bay at golden hour. Shot from the Morena/Bay Park ridge. Landscape, at least 2400px wide. Keep the centre reasonably uncluttered — the headline sits on top of it under a dark overlay. |
| `mission-bay.jpg` | About section, 25% opacity | taglere's `mission-beach.jpg` | Mission Bay water or the view from the neighborhood. Heavily faded in use, so mood matters more than sharpness. Landscape, 1800px+. |
| `bay-park-street.jpg` | Calculator section, 20% opacity | taglere's `la-jolla.jpg` | A residential Bay Park street — the single-storey post-war stock, mature trees, cars in driveways. Recognisably a real neighborhood, not a listing photo. Landscape, 1800px+. |
| `headshot.jpg` | About section | ✅ **real photo, done** | — |

## The headshot — done

`public/headshot.jpg` is Gianni's real headshot: 1391×1131, 202 KB, JPEG at quality 92.
`components/sections/About.tsx` renders it via `next/image` with `object-cover object-center`.

The source is landscape (aspect 1.230) and the frame is square, so the centre crop trims about
130px from each side. Checked at 1440px and 390px — the face sits well with a little headroom
and the shoulders still read, so **no `object-position` adjustment is needed.**

If you ever swap in a different photo and the square crop cuts awkwardly, that's the one class
to change in `About.tsx`:

```tsx
className="object-cover object-center"        // current
className="object-cover object-[center_25%]"  // pulls the crop upward
className="object-cover object-top"           // aligns to the top edge
```

A head-and-shoulders shot on a plain light background works best in this slot — it sits next to
body copy on a pale section, so a busy background competes with the text. The current photo's
soft grey studio backdrop is ideal.

## Notes

- `next/image` throws at runtime on a missing file, which is exactly why placeholders are
  committed rather than leaving the slots empty. If you delete one without a replacement, the
  page will break.
- Next.js converts to AVIF/WebP automatically (`next.config.mjs`), so commit good-quality
  JPEGs and let the framework optimise. Don't pre-compress hard.
- The placeholder JPEGs are 1.8–5.3 MB. Real replacements should ideally be under ~1 MB each
  before Next processes them.
- Shooting these yourself on a phone at golden hour will beat stock photography here. Authentic
  and local is the entire point; a polished stock image of the wrong neighborhood actively
  undercuts the pitch.
