# Photography

**Current state: all three photos are placeholders carried over from taglere.com.** They are
generic San Diego coastline, not Bay Park. The site builds and looks finished, but swapping
these for real neighborhood photography is the single highest-impact improvement you can make —
a seller who recognises their own streets trusts the page far more than one looking at stock
coastline.

Drop replacements into `public/` using the exact filenames below. No code changes needed.

| File | Where it appears | Currently | What it wants |
|---|---|---|---|
| `bay-park-hero.jpg` | Full-bleed hero, behind the headline | taglere's `hero-bg.jpg` | Bay Park hillside looking west over Mission Bay at golden hour. Shot from the Morena/Bay Park ridge. Landscape, at least 2400px wide. Keep the centre reasonably uncluttered — the headline sits on top of it under a dark overlay. |
| `mission-bay.jpg` | About section, 25% opacity | taglere's `mission-beach.jpg` | Mission Bay water or the view from the neighborhood. Heavily faded in use, so mood matters more than sharpness. Landscape, 1800px+. |
| `bay-park-street.jpg` | Calculator section, 20% opacity | taglere's `la-jolla.jpg` | A residential Bay Park street — the single-storey post-war stock, mature trees, cars in driveways. Recognisably a real neighborhood, not a listing photo. Landscape, 1800px+. |
| `headshot.jpg` | About section | generated "GT" placeholder card | Gianni, friendly rather than corporate. This is the "I'm a neighbor, not a call centre" proof point. 800×800 or larger. |

## The headshot

**Already wired up.** `components/sections/About.tsx` renders `/headshot.jpg` directly, so
replacing the file is the only step — no code change.

```bash
cp ~/path/to/your-photo.jpg ibuybaypark/public/headshot.jpg
npm run dev   # check the About section
```

The file currently committed is a generated placeholder card (dark blue, "GT" monogram, the
word PLACEHOLDER). It exists only so the build stays green — `next/image` throws on a missing
file. It is obviously not a photo, so it can't be mistaken for finished work.

### One thing to check after you swap it

The frame is a **square** (`aspect-square` with `object-cover`). A landscape photo will be
cropped to its centre, losing the left and right edges. If your photo has the head high in the
frame and the square crop cuts the chin or leaves too much headroom, adjust the object position
in `About.tsx`:

```tsx
className="object-cover object-center"        // default
className="object-cover object-[center_25%]"  // pulls the crop upward
className="object-cover object-top"           // aligns to the top edge
```

A head-and-shoulders shot on a plain light background works best here — it sits next to body
copy on a pale section, so a busy background competes with the text.

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
