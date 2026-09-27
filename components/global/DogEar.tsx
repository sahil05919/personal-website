'use client';

import { useEffect, useId, useState } from 'react';
import { usePathname } from 'next/navigation';

import { chromeHi } from '@/data/hinglish';
import { folio, navigation } from '@/data/navigation';
import { DOG_EAR_GLYPH, useDogEars } from '@/hooks/use-dog-ears';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';
import { useVariant } from '@/hooks/use-reading-mode';

/**
 * TURN DOWN THE CORNER.
 *
 * ---------------------------------------------------------------------------
 * THE ARGUMENT
 *
 * This site has spent a great deal of care on being a book that was made, and
 * none at all on being a book that was READ. A copy somebody has actually read
 * is not identical to a copy off the press: it is open at a particular place,
 * and somewhere in it a corner is turned down.
 *
 * That is the one thing a printed book has that no website does — not the
 * typography, not the folios, not even the binding, all of which a screen can
 * imitate. A book REMEMBERS BEING HANDLED, physically, in a way you can see from
 * across the room. So the corner of this sheet folds, it stays folded when the
 * reader comes back tomorrow, and the fore-edge index and the colophon both show
 * which chapters have been turned down. The copy stops being pristine.
 *
 * It is also, and not incidentally, the most useful control on the site. A
 * chapter here runs to eight or fifteen thousand pixels; "where was I" is a real
 * question, and every previous answer to it on the web is a browser feature the
 * reader has to know about.
 *
 * ---------------------------------------------------------------------------
 * THE GEOMETRY, WHICH IS NOT DECORATIVE
 *
 * Fold the bottom-right corner of a sheet up and to the left along the diagonal
 * and two things happen, both of which are drawn here:
 *
 *   the flap   the corner piece reflects across the fold line. In a square
 *              region with the page corner at (S, S) and the fold running
 *              (0, S) → (S, 0), the point (S, S) lands on (0, 0) — so the flap
 *              occupies the UPPER-LEFT triangle, not the corner it came from.
 *              It shows the back of the sheet, which is why it is `--vellum`
 *              rather than `--paper`.
 *
 *   the gap    the lower-right triangle is now a hole in the page, and what
 *              shows through it is the next leaf, one step further from the
 *              light. That is `--well`, the site's existing token for a surface
 *              sunk into the page rather than raised off it.
 *
 * The flap's own free edges — the sheet's trim edges, before the fold — cast a
 * shadow onto the page. `filter: drop-shadow()` rather than `box-shadow`,
 * because the flap is a `clip-path` triangle and a box shadow would draw the
 * shadow of a square that is not there.
 *
 * At rest none of this is drawn. There is a single hairline across the corner —
 * a scored line, waiting — and it lifts into a real fold on hover or focus. A
 * page that has not been read should not look read.
 *
 * ---------------------------------------------------------------------------
 * THE RETURN
 *
 * Arriving at the top of a page you have folded, the corner offers to take you
 * back. It appears only when all three things are true — a fold exists, it is
 * far enough down the page to be worth a journey, and you are still at the top —
 * and it leaves as soon as the reader starts reading on their own, because an
 * offer that stays after it has been declined is nagging.
 *
 * ---------------------------------------------------------------------------
 * WHY IT IS A BUTTON AND NOT A GESTURE
 *
 * A drag on the corner would be a better imitation of the physical act and a
 * worse control: undiscoverable, impossible to do with a keyboard, and
 * ambiguous against text selection. This is a real `<button>` with
 * `aria-pressed`, reachable by tab, and its label says what will happen rather
 * than what it looks like. The fold is the picture; the button is the mechanism.
 */

/** Resting, lifted, and folded. Three sizes, one square region. */
const SCORE = 34;
const LIFT = 54;
const FOLD = 48;

/** A fold nearer the top than this is not worth offering to return to. */
const WORTH_RETURNING = 420;

/** Above this scroll position the reader is reading, and the offer withdraws. */
const READING_FROM = 400;

/** How close to the fold counts as being at it. */
const AT_THE_FOLD = 160;

export default function DogEar() {
  const pathname = usePathname();
  const reduced = useReducedMotionSafe();
  const { ears, fold, flatten } = useDogEars();

  const [hovered, setHovered] = useState(false);

  /* One gradient per instance. There is only ever one corner on a page, but an
     id in a `url(#…)` is a document-wide name and this component has no claim
     on a nice one. */
  const gradient = `dog-ear-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  /* Two booleans rather than a scroll position. The corner only ever asks
     "still at the top?" and "standing at the fold?", and storing the pixel
     value instead would re-render this component every forty pixels of every
     chapter to answer two questions that change three times. */
  const [atTop, setAtTop] = useState(true);
  const [nearFold, setNearFold] = useState(false);

  const t = {
    turnDown: useVariant('Turn down this corner', chromeHi.dogEarFold),
    flatten: useVariant('Flatten this corner', chromeHi.dogEarFlatten),
    turned: useVariant('Turned down', chromeHi.dogEarTurned),
    back: useVariant('Back to where you stopped', chromeHi.dogEarReturn),
  };

  const ear = ears[pathname];
  const folded = Boolean(ear);
  const foldedAt = ear ? ear.y : -1;

  /* Where the reader is. Nothing else here knows, and the two answers are
     cheap enough to keep in React state. */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setAtTop(y < READING_FROM);
      setNearFold(foldedAt >= 0 && Math.abs(y - foldedAt) < AT_THE_FOLD);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname, foldedAt]);

  /* No mount flag and no `suppressHydrationWarning`. `useDogEars` is built on
     `useSyncExternalStore`, whose server snapshot is empty, so the corner
     renders unfolded during hydration and folds a tick later — which is the
     hook's contract rather than a mismatch. An earlier version gated the whole
     component behind a `mounted` state set inside an effect; that is a
     cascading render, and this codebase has removed every one of them. */
  const here = navigation.find((d) => d.href === pathname);

  const offering = folded && ear.y > WORTH_RETURNING && atTop;

  const size = folded ? FOLD : hovered ? LIFT : SCORE;
  const showFold = folded || hovered;

  const onClick = () => {
    if (folded) flatten(pathname);
    else fold(pathname, window.scrollY);
  };

  const returnToFold = () => {
    window.scrollTo({
      top: ear ? ear.y : 0,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* ── THE OFFER ────────────────────────────────────────────────────
          Above the corner, ruled like everything else that annotates on this
          site rather than speaks. It is a separate control from the fold
          because it does a separate thing, and conflating the two would make
          one button mean "go there" or "undo" depending on a scroll position
          the reader cannot see. */}
      <div
        /* Stacked directly above the corner rather than beside it. Beside it,
           the panel and the corner's own hover label competed for the same
           sixty pixels of the bottom-right and overlapped by six of them. */
        className={`fixed bottom-[70px] right-3 z-[41] transition-all duration-500 ease-editorial sm:right-5 ${
          offering
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-1 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={returnToFold}
          tabIndex={offering ? 0 : -1}
          className="group flex items-center gap-2.5 border border-hairline bg-vellum/95 px-3 py-2.5 font-mono text-apparatus-xs uppercase text-graphite shadow-plate backdrop-blur-sm transition-colors duration-300 ease-editorial hover:text-ink"
        >
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] shrink-0 bg-through-line/80"
            style={{ clipPath: DOG_EAR_GLYPH }}
          />
          {t.back}
          {here ? (
            <span className="text-graphite/60 transition-colors duration-300 group-hover:text-through-line">
              {folio(here.href)}
            </span>
          ) : null}
        </button>
      </div>

      {/* ── THE CORNER ───────────────────────────────────────────────────
          z-30, under the paper grain, so the fold takes the same tooth as the
          rest of the sheet. The grain layer is pointer-events-none, so being
          beneath it costs nothing in reach. */}
      <button
        type="button"
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-pressed={folded}
        aria-label={folded ? t.flatten : t.turnDown}
        /* A handle for the verification pass. The reading switch also carries
           `aria-pressed`, and the aria-label is translated, so neither the role
           nor the name identifies this control across both readings — the first
           run of the sitewide check quietly measured the EN/HI toggle on all
           thirteen routes and reported the corner as present. Same reason
           SewnSpine carries `data-spine`. */
        data-dog-ear=""
        /* `transition-[width,height]`, not `transition-all`. With `all`, the
           focus ring the sitewide `:focus-visible` rule draws was itself
           transitioned — outline-width easing from 0 to 2px over 450ms — so a
           keyboard reader got a ring that faded in a beat after they arrived.
           Measured, not guessed: reading `outlineWidth` immediately after a real
           Tab reported 0px on this button and 2px on every other control on the
           site. A focus ring is feedback and has to be instant. */
        className="fixed bottom-0 right-0 z-30 transition-[width,height] duration-[450ms] ease-editorial"
        style={{ width: size, height: size }}
      >
        {/* THE TARGET, not the mark.

            At rest the corner is drawn at 34px, which is the right size for a
            scored line and 10px short of a thumb. This is the same move
            globals.css's `.tap-target` makes for the 26px controls in the
            running head: a transparent child overflowing its button extends the
            button's hit area without changing anything that is painted, so the
            mark stays 34px and the target is 44x44 — WCAG 2.5.5, at the one
            corner of the screen a phone reader is most likely to be reaching
            with the hand already holding the device.

            Anchored bottom-right and grown up and to the left only: down and
            right is the trim edge, and there is nothing there to grow into. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0"
          style={{ width: 44, height: 44 }}
        />

        {/* The gap: the page is missing here, and the next leaf shows through. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[450ms] ease-editorial"
          style={{
            clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%)',
            backgroundColor: 'rgb(var(--well))',
            opacity: showFold ? 1 : 0,
          }}
        />

        {/* The flap, and the shadow its trim edges cast on the page.
            The filter lives on this wrapper rather than on the polygon so its
            blur radius is in CSS pixels; inside the SVG it would be in user
            units and would shrink as the corner scales. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[450ms] ease-editorial"
          style={{
            filter: 'drop-shadow(-1px -1px 2.5px rgb(var(--shade) / 0.26))',
            opacity: showFold ? 1 : 0,
          }}
        >
          {/*
            SVG rather than a clip-path, and the reason is the three dark
            stocks. A clipped div can be filled but not stroked, so the fold was
            a tone against a tone: on Paper the difference between --vellum and
            --paper is nine values and the drop-shadow does the rest, but on Ink
            it is eight values against a ground where a black shadow is
            invisible, and the fold read as a vague square. It needed an EDGE,
            which is also what it has in life — a lifted corner catches light
            along its cut edges and creases along its fold.

            `preserveAspectRatio="none"` with a fixed 100×100 viewBox is what
            lets the corner grow from 34 to 54 as a plain CSS transition on the
            parent, and `vectorEffect="non-scaling-stroke"` is what keeps the
            edge exactly one pixel while it does.
          */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            focusable="false"
          >
            <defs>
              <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
                {/* Lit at the free corner, sinking towards the crease — the
                    same light from the top left that Grain's wash establishes
                    for the whole page. */}
                <stop offset="0%" style={{ stopColor: 'rgb(var(--vellum))' }} />
                <stop offset="28%" style={{ stopColor: 'rgb(var(--vellum))' }} />
                <stop offset="100%" style={{ stopColor: 'rgb(var(--well))' }} />
              </linearGradient>
            </defs>

            <polygon
              points="0,0 100,0 0,100"
              vectorEffect="non-scaling-stroke"
              strokeWidth="1"
              strokeLinejoin="round"
              style={{
                fill: `url(#${gradient})`,
                stroke: 'rgb(var(--hairline))',
              }}
            />
          </svg>
        </span>

        {/* At rest: a scored line across the corner. Not a fold — an intention
            to fold, which is all an unread page should show. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-px origin-bottom-right -rotate-45 transition-opacity duration-300 ease-editorial"
          style={{
            width: SCORE * Math.SQRT2,
            backgroundColor: 'rgb(var(--hairline))',
            opacity: showFold ? 0 : 1,
          }}
        />

        {/* The label, out on the paper beside the corner. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-1 right-full mr-3 hidden whitespace-nowrap font-mono text-apparatus-xs uppercase text-graphite transition-opacity duration-300 ease-editorial sm:block ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {folded ? t.flatten : t.turnDown}
        </span>

        {/* Folded and standing at the fold: say so, once, quietly. The reader
            has arrived where they left off and nothing else needs to happen. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-1 right-full mr-3 hidden whitespace-nowrap font-mono text-apparatus-xs uppercase text-through-line transition-opacity duration-500 ease-editorial sm:block ${
            nearFold && !hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {t.turned}
        </span>
      </button>
    </>
  );
}
