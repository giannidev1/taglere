/**
 * Every photograph on the page, in one place.
 *
 * ---------------------------------------------------------------------------
 * ASSET SWAP — the only file that changes when the generated stills land.
 *
 * The five replacements have been generated (Higgsfield, Seedream 4.5) but the
 * session's egress policy blocks the Higgsfield CDN host
 * (d8j0ntlcm91z4.cloudfront.net → 403 on CONNECT), so they could not be pulled
 * into the repo. Job ids are recorded against each placement below.
 *
 * To swap: drop the five files into /public under the `target` filename, then
 * change `src` to `target` here. Nothing else in the codebase references an
 * image path, and every placement below is already laid out at the aspect
 * ratio of its replacement, so no layout changes are needed.
 *
 * The current `src` values are the site's inherited stock photographs. They
 * are the wrong neighbourhood — bay-park-street.jpg is byte-identical to
 * taglere.com's la-jolla.jpg, and mission-bay.jpg to its mission-beach.jpg —
 * which is precisely why they are being replaced.
 * ------------------------------------------------------------------------- */

export interface Plate {
  /** Path served today. */
  src: string;
  /** Filename the generated replacement should be saved as. */
  target: string;
  /** Higgsfield job id for the generated replacement. */
  job: string;
  /** Empty string marks the image as decorative; it is aria-hidden at use. */
  alt: string;
  width: number;
  height: number;
}

export const PLATES = {
  /** Hero. The LCP element, and the only preloaded resource on the page. */
  hero: {
    src: '/bay-park-hero.jpg',
    target: '/hero-hillside.jpg',
    job: '3207689e-ebaf-44d4-8795-4e462dd4f6db',
    alt: 'Bay Park, San Diego, looking out over Mission Bay',
    width: 2560,
    height: 1440,
  },

  /** Calculator backdrop — bay water at golden hour. Decorative. */
  water: {
    src: '/bay-park-street.jpg',
    target: '/bay-water.jpg',
    job: '7e6f5ba7-26a8-478c-939b-fca60c3939f4',
    alt: '',
    width: 2560,
    height: 1440,
  },

  /** About — late light on stucco and terracotta. Decorative. */
  stucco: {
    src: '/mission-bay.jpg',
    target: '/stucco-light.jpg',
    job: '8a906bba-9a05-4ef8-947c-c26e331345a3',
    alt: '',
    width: 2496,
    height: 1664,
  },

  /** Process — jacaranda and eucalyptus canopy from below. Decorative. */
  canopy: {
    src: '/mission-bay.jpg',
    target: '/canopy.jpg',
    job: '32fdef5b-bded-4e2a-8603-de2bfd3ba6a5',
    alt: '',
    width: 2304,
    height: 1728,
  },

  /** Contact — golden-hour street. The destination. Decorative. */
  goldenHour: {
    src: '/bay-park-hero.jpg',
    target: '/golden-hour-street.jpg',
    job: 'dfa77f07-13c1-4227-b6f2-da01dc66f7b1',
    alt: '',
    width: 2560,
    height: 1440,
  },

  /** Gianni's real headshot. Not generated, and never should be. */
  portrait: {
    src: '/headshot.jpg',
    target: '/headshot.jpg',
    job: '',
    alt: 'Gianni Tagle',
    width: 1391,
    height: 1131,
  },
} satisfies Record<string, Plate>;
