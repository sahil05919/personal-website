'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * Fig. 01 — the resolve.
 *
 * WHAT WAS WRONG WITH THE OLD FIGURE
 *
 * The previous version faded in twenty-three scattered dots and then faded in
 * seven *different* dots on a line beneath them. Nothing moved and nothing
 * resolved: the end state held thirty points, not seven, and the caption
 * ("twenty-three points, resolved to seven") described something the picture
 * never did. A first-time visitor could not read the metaphor because the
 * metaphor was not being performed — it was a cross-fade between two unrelated
 * sets.
 *
 * WHAT THIS DOES INSTEAD
 *
 * Eighteen fragments. Every one of them travels: scattered position and angle
 * to aligned position and zero angle. Nothing is added and nothing is left
 * behind, so the count before equals the count after and the caption is true.
 * At rest the fragments butt end to end and read as a single unbroken line —
 * the through-line the rest of the page descends from.
 *
 * The second reading is the interaction. Move a cursor through the resolved
 * line and it fractures locally, then reassembles once you leave. The claim
 * on this page is "I make confusing things simple"; the coda underneath it is
 * "I'm still learning to do it to my own work." Order here is not a state that
 * was reached once — it is maintained against pressure. That is the whole
 * reason the interaction exists, and it is the only one on the page.
 *
 * HOW IT IS DRIVEN
 *
 * Entirely by motion values, and endpoints are computed rather than
 * transformed. Rotating an SVG <g> means depending on transform-origin
 * resolving against the view box, and interpolating endpoints directly makes a
 * rotating stroke change length mid-flight. Lerping centre and angle, then
 * deriving the two endpoints from them, keeps every fragment exactly the same
 * length for the whole journey.
 *
 * Coordinates come from a seeded generator, so server and client produce
 * identical markup and there is no hydration mismatch.
 *
 * Reduced motion: `progress` starts at 1. The figure is simply resolved, the
 * cursor is never bound, and nothing ever moves.
 */

const COUNT = 18;

/** Deterministic. Same sequence on the server and in the browser, forever. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FigureLayout {
  /** viewBox width. The resolved line spans it edge to edge. */
  width: number;
  /** viewBox height. */
  height: number;
  /** y of the resolved line. */
  baselineY: number;
  /** Radius of cursor influence, in view-box units. */
  influence: number;
}

export const FIGURE_WIDE: FigureLayout = {
  width: 1080,
  height: 240,
  baselineY: 202,
  influence: 190,
};

/**
 * Portrait, for narrow viewports. Not the wide figure scaled down: at 340px a
 * 720-unit view box renders the scatter field 140px tall, which compresses the
 * travel until the resolve is illegible. The phone gets a taller field and a
 * longer fall, which is the same idea composed for the space it has.
 */
export const FIGURE_TALL: FigureLayout = {
  width: 380,
  height: 250,
  baselineY: 214,
  influence: 120,
};

interface Fragment {
  restX: number;
  restY: number;
  fromX: number;
  fromY: number;
  fromAngle: number;
  half: number;
  delay: number;
}

function buildFragments(layout: FigureLayout, seed: number): Fragment[] {
  const random = mulberry32(seed);
  const pitch = layout.width / COUNT;
  const ceiling = layout.height * 0.07;
  const floor = layout.baselineY - layout.height * 0.22;

  return Array.from({ length: COUNT }, (_, i) => ({
    restX: pitch * (i + 0.5),
    restY: layout.baselineY,
    fromX: layout.width * 0.04 + random() * layout.width * 0.92,
    fromY: ceiling + random() * (floor - ceiling),
    fromAngle: (random() * 2 - 1) * 78,
    // +0.35 so adjacent fragments overlap by a fraction of a unit. Butted
    // exactly, antialiasing leaves seventeen visible seams in what is meant to
    // read as one continuous line.
    half: pitch / 2 + 0.35,
    delay: 0.2 + i * 0.024,
  }));
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Cursor displacement for one fragment. Zero when the pointer is away. */
function disturb(
  f: Fragment,
  cursorX: number,
  cursorY: number,
  engagement: number,
  influence: number
) {
  if (engagement <= 0.001) return { dx: 0, dy: 0, dAngle: 0 };

  const vx = f.restX - cursorX;
  const vy = f.restY - cursorY;
  const distance = Math.hypot(vx, vy);
  if (distance > influence) return { dx: 0, dy: 0, dAngle: 0 };

  const near = 1 - distance / influence;
  // Smoothstep, so the edge of the influence radius is not a visible boundary.
  const force = near * near * (3 - 2 * near) * engagement;
  const length = distance || 1;

  return {
    dx: (vx / length) * force * 9,
    dy: (vy / length) * force * 30,
    dAngle: (vx / influence) * force * 46,
  };
}

type Endpoint = 'x1' | 'y1' | 'x2' | 'y2';

/**
 * One endpoint of one fragment, as a live motion value.
 *
 * Centre and angle are interpolated, then the endpoints are derived from them.
 * Interpolating the endpoints directly would shorten a rotating fragment
 * mid-flight, because a chord is shorter than the arc it subtends.
 */
function useEndpoint(
  which: Endpoint,
  fragment: Fragment,
  layout: FigureLayout,
  progress: MotionValue<number>,
  cursorX: MotionValue<number>,
  cursorY: MotionValue<number>,
  engagement: MotionValue<number>
): MotionValue<number> {
  return useTransform<number, number>(
    [progress, cursorX, cursorY, engagement],
    ([t, cx, cy, on]) => {
      const centreX = lerp(fragment.fromX, fragment.restX, t);
      const centreY = lerp(fragment.fromY, fragment.restY, t);
      const angle = lerp(fragment.fromAngle, 0, t);

      const { dx, dy, dAngle } = disturb(
        fragment,
        cx,
        cy,
        // Fragments only respond once they have arrived; a fragment still in
        // flight being pushed about reads as a bug rather than as a response.
        on * t,
        layout.influence
      );

      const radians = ((angle + dAngle) * Math.PI) / 180;
      const offsetX = Math.cos(radians) * fragment.half;
      const offsetY = Math.sin(radians) * fragment.half;

      switch (which) {
        case 'x1':
          return centreX + dx - offsetX;
        case 'y1':
          return centreY + dy - offsetY;
        case 'x2':
          return centreX + dx + offsetX;
        default:
          return centreY + dy + offsetY;
      }
    }
  );
}

interface StrokeProps {
  fragment: Fragment;
  layout: FigureLayout;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  engagement: MotionValue<number>;
  resolved: boolean;
}

function Stroke({
  fragment,
  layout,
  cursorX,
  cursorY,
  engagement,
  resolved,
}: StrokeProps) {
  const progress = useMotionValue(resolved ? 1 : 0);

  useEffect(() => {
    if (resolved) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, {
      duration: 1.1,
      delay: fragment.delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [progress, resolved, fragment.delay]);

  const x1 = useEndpoint('x1', fragment, layout, progress, cursorX, cursorY, engagement);
  const y1 = useEndpoint('y1', fragment, layout, progress, cursorX, cursorY, engagement);
  const x2 = useEndpoint('x2', fragment, layout, progress, cursorX, cursorY, engagement);
  const y2 = useEndpoint('y2', fragment, layout, progress, cursorX, cursorY, engagement);

  // The colour turn. Scattered fragments are graphite — undifferentiated
  // material. The resolved line is the through-line, and it is the only cobalt
  // on the homepage.
  const scatteredOpacity = useTransform(progress, [0.5, 0.95], [1, 0]);
  const resolvedOpacity = useTransform(progress, [0.5, 0.95], [0, 1]);

  return (
    <>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={2}
        strokeLinecap="butt"
        className="stroke-graphite"
        style={{ opacity: scatteredOpacity }}
      />
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={2}
        strokeLinecap="butt"
        className="stroke-through-line"
        style={{ opacity: resolvedOpacity }}
      />
    </>
  );
}

/**
 * Fine pointers only. A touch device has no hover state, so binding the
 * disturbance there would mean the line fractures under the reader's thumb
 * while they are trying to scroll past it.
 *
 * `useSyncExternalStore` rather than useState + useEffect: matchMedia is an
 * external store, the server snapshot is unambiguously false, and it avoids
 * the cascading render that setting state inside an effect causes.
 */
const POINTER_QUERY = '(hover: hover) and (pointer: fine)';

function subscribeToPointer(onChange: () => void) {
  const query = window.matchMedia(POINTER_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeToPointer,
    () => window.matchMedia(POINTER_QUERY).matches,
    () => false
  );
}

interface ResolveFigureProps {
  layout: FigureLayout;
  /** Seed for the scatter. Different per layout so the two compositions differ. */
  seed: number;
  /** Bind the cursor. False on the portrait instance and on coarse pointers. */
  interactive: boolean;
  className?: string;
}

export default function ResolveFigure({
  layout,
  seed,
  interactive,
  className = '',
}: ResolveFigureProps) {
  const prefersReducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  const finePointer = useFinePointer();
  const bindCursor = interactive && finePointer && !prefersReducedMotion;

  const rawX = useMotionValue(layout.width / 2);
  const rawY = useMotionValue(-999);
  const rawEngagement = useMotionValue(0);

  // One spring set, shared by all eighteen fragments, rather than three springs
  // per fragment. `engagement` easing back to zero is what makes the line heal
  // rather than snap.
  const cursorX = useSpring(rawX, { stiffness: 320, damping: 34, mass: 0.35 });
  const cursorY = useSpring(rawY, { stiffness: 320, damping: 34, mass: 0.35 });
  const engagement = useSpring(rawEngagement, {
    stiffness: 170,
    damping: 26,
    mass: 0.5,
  });

  const fragments = buildFragments(layout, seed);

  const handleMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!bindCursor) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;

    const x = ((event.clientX - rect.left) / rect.width) * layout.width;
    const y = ((event.clientY - rect.top) / rect.height) * layout.height;

    // Jump on first contact so the cursor does not spring across the figure
    // from wherever it was last seen, dragging a wave through the line.
    if (rawEngagement.get() === 0) {
      cursorX.jump(x);
      cursorY.jump(y);
    }

    rawX.set(x);
    rawY.set(y);
    rawEngagement.set(1);
  };

  const handleLeave = () => {
    if (!bindCursor) return;
    rawEngagement.set(0);
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={className}
      // Reserved by aspect ratio on the wrapper, so the figure occupies its
      // final height from first paint and contributes no layout shift.
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {fragments.map((fragment, i) => (
        <Stroke
          key={i}
          fragment={fragment}
          layout={layout}
          cursorX={cursorX}
          cursorY={cursorY}
          engagement={engagement}
          resolved={Boolean(prefersReducedMotion)}
        />
      ))}
    </svg>
  );
}
