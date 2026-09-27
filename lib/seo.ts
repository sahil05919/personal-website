/**
 * SEO — one place that knows how a page announces itself from outside.
 *
 * THE DEFECT THIS REPLACES
 *
 * Every page carried its own `title` and `description`, which was right, and
 * then inherited three things from the root layout that were wrong:
 *
 *   1. `alternates: { canonical: '/' }`. Inherited literally. Every one of the
 *      thirteen routes declared the HOME PAGE as its canonical URL, which is
 *      an instruction to a search engine to treat About, Journey, Projects and
 *      the rest as duplicates of Home and drop them from the index. This was
 *      the single most damaging line in the codebase: nine chapters of writing
 *      were asking not to be found.
 *
 *   2. `openGraph.title` / `openGraph.description` / `openGraph.url`. Also
 *      inherited literally. A shared link to /experience produced the home
 *      page's title, the home page's blurb and the home page's URL. The
 *      per-page `description` never reached a social card, because Next does
 *      not copy `description` into `openGraph.description` and does not apply
 *      the `%s | Sahil Kumar` title template to `openGraph.title`.
 *
 *   3. `twitter.card: 'summary_large_image'` with no image anywhere in the
 *      tree. A large-image card with no image renders as a blank plate — which
 *      is what every share of this site produced. Fixed by `SOCIAL_CARD` below,
 *      attached to both cards on every route; since
 *      September 2026 each chapter carries its own (`cardFor`).
 *
 * THE SHAPE
 *
 * `pageMetadata` takes the two things a page actually knows — where it lives
 * and what it is — and derives everything else. Nothing here is a page's job
 * to remember, so no page can get it wrong by omission. The canonical path is
 * required, not optional, because "forgot to set canonical" is the exact bug
 * this file exists to make impossible.
 */

import type { Metadata } from 'next';
import socialCards from '@/data/socialCards.json';

/** The one absolute origin. `metadataBase` in app/layout.tsx uses the same. */
export const SITE_URL = 'https://sahilarora.vercel.app';

/** Applied to `openGraph.title`, which does NOT inherit the title template. */
const TITLE_SUFFIX = 'Sahil Kumar';

/**
 * The share cards. One per chapter, plus the title page — because a link to
 * /projects that previews as the title page tells the reader nothing about
 * where they are going, and on LinkedIn the card is the first page of the book
 * most people see.
 *
 * What each card says, and its alt text, lives in data/socialCards.json; the
 * PNGs in public/og/ are drawn from that file by scripts/og-cards/render.mjs,
 * in the site's own fonts on the Paper tokens. Every title and line on a card
 * is quoted from its page, not written for the card.
 *
 * The images live in `public/` and are named explicitly rather than dropped in
 * as `opengraph-image.png` files. The file convention looked tidier and was
 * wrong for this tree: a file-based OG image is attached to the segment it sits
 * in, and a page that declares its own `openGraph` block — which every page
 * here does, because that is how it gets a per-page title and URL — replaces
 * the inherited one and loses the image. Verified in the build output: Home
 * carried `og:image`, /experience and /questions did not.
 *
 * They moved from `/og.png` to `/og/<page>.png` in September 2026, when the
 * paper went white. A new URL is what makes LinkedIn and Slack fetch the new
 * image instead of serving the cream one they already cached.
 *
 * `cardFor` is keyed by the same `path` every page already passes to
 * `pageMetadata`, so no page has to remember which card is its own. A route
 * with no card of its own (/writing, /errata, /a-z) gets the title page.
 */
interface CardEntry {
  path: string;
  file: string;
  alt: string;
}

const CARDS = new Map<string, CardEntry>(
  (socialCards.cards as CardEntry[]).map((c) => [c.path, c]),
);

function toCard({ file, alt }: CardEntry) {
  return {
    url: `/og/${file}.png`,
    width: 1200,
    height: 630,
    type: 'image/png',
    alt,
  } as const;
}

/** The title page's card. Also the layout's sitewide default. */
export const SOCIAL_CARD = toCard(CARDS.get('/')!);

/** The card for a route, or the title page's when it has none. */
export function cardFor(path: string) {
  const entry = CARDS.get(path);
  return entry ? toCard(entry) : SOCIAL_CARD;
}

export interface PageMeta {
  /**
   * Route path, leading slash, no trailing slash. `/` for Home.
   * Becomes both `alternates.canonical` and `openGraph.url`.
   */
  path: string;
  /** Tab title. The layout template appends "| Sahil Kumar". */
  title: string;
  description: string;
  /**
   * Set for a page whose title already contains the name, so the layout
   * template does not render "… | Sahil Kumar | Sahil Kumar". Home only.
   */
  absoluteTitle?: boolean;
  /**
   * `article` for the nine chapters and the back matter — they are pieces of
   * writing, and the distinction is the only thing some readers-later use to
   * tell a document from a landing page. `website` for Home.
   */
  type?: 'website' | 'article';
}

export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
  type = 'article',
}: PageMeta): Metadata {
  /* The card headline. A bare chapter title ("Now") is meaningless in a feed,
     so the name is always appended — except where the title already carries
     it, which is Home. */
  const card = cardFor(path);
  const socialTitle = absoluteTitle ? title : `${title} — ${TITLE_SUFFIX}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: socialTitle,
      description,
      siteName: TITLE_SUFFIX,
      locale: 'en_GB',
      images: [card],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [card],
    },
  };
}
