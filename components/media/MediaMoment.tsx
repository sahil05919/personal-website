"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type {
  MediaImage,
  MediaMoment as MediaMomentType,
} from "@/data/mediaData";
import { useRevealOnView } from "@/hooks/use-reveal-on-view";

/** Matches max-w-[560px] on the section in MediaChapter. Change one, change both. */
const COLUMN_WIDTH = 560;
/** px-6 on both sides, below the sm breakpoint. */
const COLUMN_PADDING = "3rem";
/** gap-3 between diptych panes. */
const DIPTYCH_GAP = 12;

/**
 * Builds the `sizes` attribute from the entry's own widthPercent.
 *
 * This has to be derived rather than fixed: widthPercent runs from 40 to 100,
 * so a hardcoded value tells the browser the wrong thing for six of the eight
 * entries and quietly defeats the variable-footprint layout.
 *
 * The breakpoint is 640px because the section switches px-6 -> px-0 at `sm`.
 */
function imageSizes(widthPercent: number, panes: 1 | 2): string {
  const fraction = widthPercent / 100;
  const mobileBlock =
    fraction === 1
      ? `100vw - ${COLUMN_PADDING}`
      : `(100vw - ${COLUMN_PADDING}) * ${fraction}`;
  const desktopBlock = COLUMN_WIDTH * fraction;

  if (panes === 1) {
    return `(min-width: 640px) ${Math.round(desktopBlock)}px, calc(${mobileBlock})`;
  }

  const desktopPane = Math.round((desktopBlock - DIPTYCH_GAP) / 2);
  return `(min-width: 640px) ${desktopPane}px, calc((${mobileBlock} - ${DIPTYCH_GAP}px) / 2)`;
}

interface PaneProps {
  image: MediaImage;
  aspectRatio: string;
  sizes: string;
  priority?: boolean;
  onExpand: (image: MediaImage) => void;
}

/**
 * One photograph. A button rather than a bare image so the lightbox is
 * keyboard-reachable — the button takes its accessible name from the alt
 * text, so the alt is announced exactly once and nothing is duplicated.
 */
function Pane({ image, aspectRatio, sizes, priority, onExpand }: PaneProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onExpand(image)}
      style={{ aspectRatio }}
      className="relative block w-full cursor-zoom-in overflow-hidden bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </button>
  );
}

interface MediaMomentProps {
  moment: MediaMomentType;
  priority?: boolean;
}

export function MediaMoment({ moment, priority }: MediaMomentProps) {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();
  const { image, secondary, widthPercent, aspectRatio, caption, alignEnd } =
    moment;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState<MediaImage | null>(null);

  // showModal() makes the dialog inert-to-background and traps focus, but it
  // does not reliably lock body scroll across browsers.
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);

  const openLightbox = (img: MediaImage) => {
    setExpanded(img);
    dialogRef.current?.showModal();
  };

  const closeLightbox = () => dialogRef.current?.close();

  const panes: 1 | 2 = secondary ? 2 : 1;
  const sizes = imageSizes(widthPercent, panes);

  return (
    <figure
      ref={ref}
      className={[
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      ].join(" ")}
    >
      <div
        style={{
          width: `${widthPercent}%`,
          maxWidth: "100%",
          marginLeft: alignEnd ? "auto" : undefined,
        }}
      >
        {secondary ? (
          // A diptych: two frames of equal weight under one reflection.
          // Both panes share the entry's aspectRatio so the pair reads as
          // deliberate rather than as two photographs that happened to land
          // next to each other. Never stacks — the pairing is the point.
          <div className="grid grid-cols-2 gap-3">
            <Pane
              image={image}
              aspectRatio={aspectRatio}
              sizes={sizes}
              priority={priority}
              onExpand={openLightbox}
            />
            <Pane
              image={secondary}
              aspectRatio={aspectRatio}
              sizes={sizes}
              priority={priority}
              onExpand={openLightbox}
            />
          </div>
        ) : (
          <Pane
            image={image}
            aspectRatio={aspectRatio}
            sizes={sizes}
            priority={priority}
            onExpand={openLightbox}
          />
        )}
      </div>

      {/* One rule, applied eight times: the caption always follows its
          photograph. Reflection reads better after the thing it reflects on. */}
      <figcaption className="mt-4">
        <p
          className="max-w-prose font-reading text-[17px] leading-[1.75] text-foreground"
          style={{ marginLeft: alignEnd ? "auto" : undefined }}
        >
          {caption}
        </p>
      </figcaption>

      {/* Native <dialog>: Esc, focus trap and focus restore come free, and it
          renders in the top layer regardless of where it sits in the DOM.
          Click anywhere to close. No carousel, no next/previous — expanding is
          for looking closer, not for skipping the writing. */}
      <dialog
        ref={dialogRef}
        aria-label="Expanded photograph"
        onClose={() => setExpanded(null)}
        onClick={closeLightbox}
        className="m-0 h-screen max-h-screen w-screen max-w-none bg-transparent p-0 backdrop:bg-background/95"
      >
        {expanded && (
          <div className="relative h-full w-full">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-5 top-5 z-10 font-mono text-[11px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Close
            </button>

            <div className="flex h-full w-full items-center justify-center p-6 sm:p-12">
              <div className="relative h-full w-full">
                <Image
                  src={expanded.src}
                  alt={expanded.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </dialog>
    </figure>
  );
}