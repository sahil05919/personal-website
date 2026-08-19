'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

/**
 * THE SEWN SPINE — the binding this book never had.
 *
 * ---------------------------------------------------------------------------
 * THE ARGUMENT
 *
 * This site is a book in every respect that can be typeset. It has a title
 * page, a table of contents, folios in the running head, standfirsts,
 * marginalia, an errata leaf, a colophon, five choices of paper, a letterpress
 * impression on the display face, and a page you can turn with the arrow keys.
 *
 * What it did not have was a BINDING. Nothing held the leaves together, and the
 * site's accent colour has been called `--through-line` since the first commit
 * — a line running through the whole thing, named everywhere and drawn nowhere.
 * This is that line, drawn the way a bookbinder would draw it: as thread.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS ACTUALLY BEING DEPICTED
 *
 * A sewn signature seen from outside the spine, mid-sewing. Four facts about
 * real binding do all the work, and getting any of them wrong turns this into a
 * decorative squiggle in a margin:
 *
 *   1. THE HOLES ARE PIERCED BEFORE THE THREAD ARRIVES. Stations are punched
 *      through the fold with an awl while the gathering is still loose. So the
 *      holes are drawn down the whole document from the first frame and the
 *      thread is not: ahead of where you have read, the spine is a column of
 *      pierced stations waiting to be sewn.
 *
 *   2. THE THREAD IS ONLY OUTSIDE FOR PART OF ITS RUN. It passes through the
 *      fold at each station, travels along the INSIDE to the next, and comes
 *      back out. From outside you see long spans broken by a short absence at
 *      every station — which is a dash pattern, and it is why the dasharray is
 *      `[PITCH − GAP, GAP]` rather than two numbers that looked about right.
 *      The gap is arithmetically centred on the station: see STATION_ORIGIN.
 *
 *   3. A KETTLE STITCH TIES OFF A GATHERING. Where one signature ends and the
 *      next begins, the binder loops back through the previous stitch and knots
 *      it. Those knots fall on this page's real structural boundaries — the top
 *      of each section, article, figure and h2 in `main`, snapped to the nearest
 *      station — so the spine is a portrait of how the chapter is actually
 *      built. /experience, twelve entries long, is visibly sewn in twelve
 *      gatherings. /writing is visibly a pamphlet.
 *
 *   4. THE NEEDLE IS AHEAD OF THE LAST STITCH. Thread is pulled through, then
 *      seated. So there are two marks and they are not in the same place: the
 *      thread's growing end, which tracks the reader continuously, and the last
 *      completed stitch, which can only ever be at a station. The accent is on
 *      the stitch — the through-line advancing down the spine one station at a
 *      time as the chapter is read. Everything between the two is thread pulled
 *      but not yet sewn, which is what binding in progress looks like.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS NOT THE PROGRESS RULE AGAIN
 *
 * The navbar already carries a scroll rule: one hairline of accent under the
 * header, scaled by `scrollYProgress`. That answers exactly one question — how
 * far through am I — and this deliberately does not repeat it, because a second
 * instrument saying the same thing is the defect this codebase keeps deleting.
 *
 * The spine answers three questions the rule cannot. How long is this chapter:
 * how many stations run off the bottom of the screen. How is it built: where
 * the knots fall. And how far in am I in the units the chapter is actually made
 * of — stitches, not percent. The header rule is a measurement. This is the
 * object being measured.
 *
 * ---------------------------------------------------------------------------
 * WHY IT COSTS NOTHING TO SCROLL
 *
 * Scroll-linked and it never re-renders. React draws the geometry once per
 * route — thread, holes, knots, tie-off — in raw pixel units, because the
 * `<svg>` carries no `viewBox` and one user unit is therefore one CSS pixel and
 * nothing has to be mapped. Everything that changes with scroll is three DOM
 * writes inside one `requestAnimationFrame`: a translate on the sheet, the
 * height of a clip rectangle, and the position of the needle. No state, no
 * React work, no layout read beyond `scrollY`.
 *
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS, AND WHERE IT SITS IN THE STACK
 *
 * Left margin, 30px from the trim edge, which is where a spine is.
 *
 * Gated at 1400px, and the number is measured rather than chosen. The binding
 * constraint is not the widest page but /projects, whose left rail sits further
 * out than any other content on the site: its leftmost text was found at x = 40
 * at 1300px, 48 at 1360, 58 at 1380, 68 at 1400 — ten pixels per twenty of
 * viewport, as the shell re-centres. With the lane at 14–32 that is 36px of
 * clear paper at the gate and more above it.
 *
 * 1360 was tried first and rejected on measurement, not on feel: it put the
 * thread 5px from the "In this chapter" label. The Wayfinder shipped with
 * exactly that class of error once already — a breakpoint whose arithmetic
 * worked at one window size and printed "CONTACT 08" across the prose at every
 * other — and the lesson from it is that the gate belongs to the tightest page,
 * not the widest one. Below the gate the reader loses a decoration and keeps
 * every word.
 *
 * Gated at the MOUNT rather than in CSS — see hooks/use-media-query.ts. A phone
 * should not run a scroll loop for a layer it will never paint.
 *
 * IT SITS ABOVE THE CONTENT, AND IT HAS TO. Behind was tried first, on the
 * reasoning that a binding disappears under the leaf covering it — and it
 * disappeared completely, because every page on this site opens with its own
 * opaque `bg-paper` wrapper spanning the full width. A negative z-index puts the
 * thread behind that wrapper rather than behind the text, so there was nothing
 * to see on any route. Verified in the browser rather than reasoned about: the
 * element painted at the right coordinates with the right geometry and the page
 * ground was on top of it.
 *
 * Above, at z-30, it is under the paper grain (z-39/40) and under the running
 * head (z-50), which is the correct order — the thread is part of the sheet, so
 * the sheet's tooth lies over it and the chrome lies over both. The one
 * consequence, stated so nobody hunts for it: on the two full-bleed blocks that
 * invert to ink — About's closing panel, on hover — the thread is drawn in an
 * ink chosen for paper and simply vanishes for the height of the panel. That is
 * the right failure. A binding you cannot see where a leaf covers it is a
 * binding; a thread that changed colour to stay visible would be a UI element.
 *
 * Reduced motion: the book arrives already bound. The thread is sewn to the
 * foot from the first frame and the needle is at the last station, because a
 * needle that tracks the reader is motion and the rest of this is not.
 *
 * `aria-hidden`, `pointer-events-none`, `data-texture` so the print stylesheet
 * drops it. It is a picture of an object and it says nothing a screen reader
 * needs to hear.
 */

/** Width of the lane the spine is drawn in, and its centre line. */
const LANE = 18;
const CENTRE = 9;

/**
 * Distance from the trim edge to the lane. 14px — closer than any margin on the
 * site, because a binding is not in the margin, it is at the edge of the block.
 */
const INSET = 14;

/** Distance between sewing stations. A real book is pierced every 25–40mm. */
const PITCH = 188;

/** The span at each station where the thread has gone inside the fold. */
const GAP = 15;

/**
 * Where the first station falls, and it is not a taste decision.
 *
 * With a dasharray of `[L, GAP]` the pattern's k-th gap occupies
 * `[k·PITCH + L, k·PITCH + L + GAP]`, so its centre is `k·PITCH + L + GAP/2`.
 * For the gaps to land ON the stations rather than beside them the stations must
 * sit at `k·PITCH + PITCH − GAP/2`. Change PITCH or GAP and this follows.
 */
const STATION_ORIGIN = PITCH - GAP / 2;

/** How far the thread strays from true, and over what period. Linen is not a rule. */
const WANDER = 1.35;
const WAVELENGTH = 430;

/** Polyline resolution for the thread. 28px is smooth at this amplitude. */
const STEP = 28;

/**
 * How far ahead of the reading line the thread has been pulled. A binder works
 * at the station in front of the one just finished, so the growing end is never
 * at the line being read — which would put movement in the reader's eye at the
 * worst possible place on the page.
 */
const LEAD = 0.42;

const WIDE = '(min-width: 1400px)';

/** Structural boundaries. A knot goes at the top of each of these. */
const BOUNDARIES = 'main section, main article, main figure, main h2';

function threadX(y: number): number {
  return CENTRE + Math.sin((y / WAVELENGTH) * Math.PI * 2) * WANDER;
}

function threadPath(height: number): string {
  const parts: string[] = [];
  for (let y = 0; y <= height; y += STEP) {
    parts.push(`${y === 0 ? 'M' : 'L'}${threadX(y).toFixed(2)} ${y}`);
  }
  parts.push(`L${threadX(height).toFixed(2)} ${height}`);
  return parts.join(' ');
}

/** Every pierced station down the document. */
function stationsFor(height: number): number[] {
  const out: number[] = [];
  for (let y = STATION_ORIGIN; y < height - 24; y += PITCH) out.push(y);
  return out;
}

/** The awl marks: a short tick across the fold, centred on the thread. */
function holesPath(stations: number[]): string {
  return stations.map((y) => `M${(threadX(y) - 3).toFixed(2)} ${y}h6`).join(' ');
}

/**
 * A kettle stitch: the thread crossing back over itself and pulled tight.
 *
 * Two arcs that bow in opposite directions and cross twice, enclosing a small
 * lens. The first attempt added a horizontal bar through the crossing, on the
 * reasoning that the thread also passes through the fold there — and at 1.2px on
 * a 9px mark it read unmistakably as `≠`. A knot with a bar through it is a
 * mathematical operator, which is the whole difficulty of drawing one at this
 * size: the eye resolves any small symmetrical mark as type unless it is
 * unmistakably a curve.
 *
 * Written relative to the origin so the same generator serves the static knots
 * (placed by their y) and the needle (translated every frame).
 */
function knot(x: number, y: number): string {
  const f = (n: number) => n.toFixed(2);
  return [
    // Bows right, crosses back.
    `M${f(x - 2.4)} ${f(y - 5.2)}C${f(x + 3.5)} ${f(y - 2.4)} ${f(x + 3.5)} ${f(y + 2.4)} ${f(x - 2.4)} ${f(y + 5.2)}`,
    // Bows left, crosses back. The two together enclose a lens: a loop of
    // thread pulled tight.
    `M${f(x + 2.4)} ${f(y - 5.2)}C${f(x - 3.5)} ${f(y - 2.4)} ${f(x - 3.5)} ${f(y + 2.4)} ${f(x + 2.4)} ${f(y + 5.2)}`,
  ].join(' ');
}

function knotsPath(stations: number[]): string {
  return stations.map((y) => knot(threadX(y), y)).join(' ');
}

/**
 * The tie-off. At the tail station the thread is knotted and the ends are cut
 * long, so a finished book has two short tails hanging past the last stitch.
 * It is the only mark on the spine that is not repeated, and it is the reason
 * reaching the foot of a chapter feels like an end rather than a stop.
 */
function tieOffPath(y: number): string {
  const x = threadX(y);
  return [
    knot(x, y),
    `M${(x - 1.4).toFixed(2)} ${(y + 5).toFixed(2)}q-2.4 5.5 -0.6 11`,
    `M${(x + 1.4).toFixed(2)} ${(y + 5).toFixed(2)}q2.8 4.8 1.2 9.4`,
  ].join(' ');
}

interface Sheet {
  height: number;
  thread: string;
  holes: string;
  knots: string;
  tieOff: string;
  /** Every station, so the needle can only ever sit on one. */
  stations: number[];
}

export default function SewnSpine() {
  const pathname = usePathname();
  const wide = useMediaQuery(WIDE);
  const reduced = useReducedMotionSafe();

  const [sheet, setSheet] = useState<Sheet | null>(null);

  const groupRef = useRef<SVGGElement>(null);
  const sewnRef = useRef<SVGRectElement>(null);
  const needleRef = useRef<SVGGElement>(null);

  /* ---------------------------------------------------------------------
     MEASURE. Once per route, and again whenever the document changes height —
     which it does after the page transition settles, after the fonts swap and
     after any figure without an intrinsic size lands. One ResizeObserver on
     the documentElement catches all three without polling.
  --------------------------------------------------------------------- */
  useEffect(() => {
    if (!wide) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight,
      );

      const stations = stationsFor(height);
      if (stations.length === 0) return;

      /* Sorted before deduping, not after: `querySelectorAll` returns document
         order, and on this site document order is not vertical order — Journey's
         chapter artifacts and the About marginalia are both siblings that render
         above the block they annotate. Deduping an unsorted list drops the wrong
         boundaries and does it invisibly. */
      const tops = Array.from(document.querySelectorAll(BOUNDARIES))
        .map((el) => el.getBoundingClientRect().top + window.scrollY)
        .filter((top) => top > PITCH * 0.6 && top < height - PITCH * 0.6)
        .sort((a, b) => a - b);

      /* Nested boundaries are the norm here — Contact's ruled rows, Now's
         leaves, an h2 inside its own section — so anything closer together than
         three quarters of a gathering collapses. Two knots 30px apart read as a
         fault in the thread, not as two signatures. */
      const gatherings: number[] = [];
      tops.forEach((top) => {
        if (gatherings.length && top - gatherings[gatherings.length - 1] < PITCH * 0.75) return;
        gatherings.push(top);
      });

      /* A knot is always AT a station: a kettle stitch cannot happen between two
         holes, because there is nothing there to loop through. The head station
         is knotted too — sewing starts with one — and the tail gets the tie-off
         instead, so it is excluded here. */
      const tail = stations[stations.length - 1];
      const knotAt = [stations[0], ...gatherings.map((top) =>
        stations.reduce((best, y) => (Math.abs(y - top) < Math.abs(best - top) ? y : best), stations[0]),
      )]
        .filter((y, i, all) => y !== tail && all.indexOf(y) === i)
        .sort((a, b) => a - b);

      setSheet({
        height,
        /* The thread stops just past the tail station, not at the foot of the
           document. A tie-off is where the thread is CUT: leaving the path
           running to `height` left up to two hundred pixels of thread hanging
           below the final knot, which reads as an unfinished binding at the
           exact moment the reader reaches the colophon. */
        thread: threadPath(Math.min(height, tail + 2)),
        holes: holesPath(stations),
        knots: knotsPath(knotAt),
        tieOff: tieOffPath(tail),
        stations,
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    /* A frame now, and again once the page transition has landed: the
       transition fades and translates on mount, so measuring inside it reports
       the height of a page still in flight. */
    schedule();
    const settle = window.setTimeout(measure, 420);

    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    window.addEventListener('resize', schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      window.clearTimeout(settle);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [wide, pathname]);

  /* ---------------------------------------------------------------------
     SEW. Three DOM writes per frame and no React render.

     The effect closes over `sheet` and is keyed on it deliberately: a ref
     holding the same value would be a render-phase write, and the geometry
     changes once per route rather than once per frame.
  --------------------------------------------------------------------- */
  useEffect(() => {
    if (!wide || !sheet) return;

    let frame = 0;

    const draw = () => {
      frame = 0;

      const group = groupRef.current;
      const sewn = sewnRef.current;
      const needle = needleRef.current;
      if (!group || !sewn || !needle) return;

      const y = window.scrollY;
      const vh = window.innerHeight;

      group.setAttribute('transform', `translate(0 ${-y})`);

      /* How much thread has been pulled. Continuous, because pulling is
         continuous — only the stitch below is quantised.

         The lead widens towards the end, and that is a fix rather than a
         flourish. At a constant `vh * LEAD` the furthest the thread could ever
         reach was `height − vh·0.58`, so the last three stations of every page
         stayed pierced and unsewn and the tie-off at the tail was literally
         unreachable — caught by scrolling to the foot of /journey and finding
         bare holes below the thread. Easing the lead to a full viewport by the
         last scroll position makes `pulled` equal `height` exactly when the
         reader hits the bottom, so the knot is tied as the colophon arrives.
         Squared, so the extra thread is paid out at the end rather than
         throughout. */
      const travel = Math.max(1, sheet.height - vh);
      const t = Math.min(1, Math.max(0, y) / travel);
      const lead = LEAD + (1 - LEAD) * t * t;
      const pulled = reduced ? sheet.height : Math.max(0, y + vh * lead);
      sewn.setAttribute('height', String(pulled));

      /* The last stitch actually seated. `stations` is ascending, so the last
         one at or above `pulled` is the answer; before the first station there
         is no stitch to show and the needle is simply absent. */
      let seated = -1;
      for (const station of sheet.stations) {
        if (station > pulled) break;
        seated = station;
      }

      if (seated < 0) {
        needle.style.opacity = '0';
      } else {
        needle.style.opacity = '1';
        needle.style.transform = `translateY(${seated}px)`;
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [wide, sheet, reduced]);

  if (!wide || !sheet) return null;

  const dash = `${PITCH - GAP} ${GAP}`;

  return (
    <div
      aria-hidden="true"
      data-texture=""
      /* `data-spine` is not decoration: /experience already carries decorative
         `role="presentation"` SVGs of its own, so the verification pass that
         measures this lane's clearance was matching a reconciliation chart and
         reporting three hundred text collisions on a phone. A layer that has to
         be measured needs a handle nothing else answers to. */
      data-spine=""
      className="spine-in pointer-events-none fixed inset-y-0 z-30"
      style={{ left: INSET, width: LANE }}
    >
      <svg
        className="h-full w-full overflow-hidden"
        role="presentation"
        focusable="false"
      >
        <defs>
          <clipPath id="spine-sewn">
            <rect ref={sewnRef} x="0" y="0" width={LANE} height="0" />
          </clipPath>
        </defs>

        <g ref={groupRef}>
          {/* Pierced the whole way down, from the first frame. */}
          <path
            d={sheet.holes}
            fill="none"
            strokeWidth="1"
            style={{ stroke: 'rgb(var(--hairline))' }}
          />

          {/* Everything below is thread, and therefore clipped to what has
              been pulled. */}
          <g clipPath="url(#spine-sewn)">
            {/* The catch-light. Real thread is round and lit from above-left,
                like everything else on this paper (see Grain's light wash), so
                a hair-thin highlight riding just off-centre is what stops a
                1.4px stroke reading as a ruled line. Same trick, and the same
                two theme variables, as the letterpress impression on the
                display face. */}
            <path
              d={sheet.thread}
              fill="none"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray={dash}
              transform="translate(-0.5 -0.4)"
              style={{ stroke: 'rgb(var(--impress-high))' }}
            />
            <path
              d={sheet.thread}
              fill="none"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray={dash}
              style={{ stroke: 'rgb(var(--ink) / 0.38)' }}
            />

            <path
              d={sheet.knots}
              fill="none"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ stroke: 'rgb(var(--ink) / 0.55)' }}
            />

            {/* The tie-off, at the tail. Reached rather than shown. */}
            <path
              d={sheet.tieOff}
              fill="none"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ stroke: 'rgb(var(--ink) / 0.55)' }}
            />
          </g>

          {/* The last stitch seated — the through-line, advancing one station
              at a time. Drawn outside the clip because it is always at or
              behind the pulled end by construction, and given a transition so
              a stitch is made rather than teleported. */}
          <g ref={needleRef} className="spine-needle" style={{ opacity: 0 }}>
            <path
              d={knot(threadX(0), 0)}
              fill="none"
              strokeWidth="1.35"
              strokeLinecap="round"
              style={{ stroke: 'rgb(var(--through-line))' }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
