"use client";

import Image from "next/image";
import type { MediaMoment as MediaMomentType } from "@/data/mediaData";
import { useRevealOnView } from "./use-reveal-on-view";

interface MediaMomentProps {
  moment: MediaMomentType;
}

export function MediaMoment({ moment }: MediaMomentProps) {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();
  const {
    image,
    widthPercent,
    aspectRatio,
    caption,
    alignEnd,
    captionFirst,
    secondary,
  } = moment;

  const figureBlock = (
    <div
      className="relative"
      style={{
        width: `${widthPercent}%`,
        maxWidth: "100%",
        marginLeft: alignEnd ? "auto" : undefined,
      }}
    >
      <div
        className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900"
        style={{ aspectRatio }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 560px, 100vw"
          className="object-cover"
        />
      </div>

      {secondary && (
        <div className="mt-3 flex items-center gap-3">
          <div
            className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900"
            aria-hidden={secondary.note ? undefined : true}
          >
            <Image
              src={secondary.image.src}
              alt={secondary.image.alt}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <span className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
            {secondary.note}
          </span>
        </div>
      )}
    </div>
  );

  const captionBlock = (
    <p
      className="max-w-prose font-serif text-base leading-[1.75] text-neutral-800 dark:text-neutral-200"
      style={{ marginLeft: alignEnd ? "auto" : undefined }}
    >
      {caption}
    </p>
  );

  return (
    <figure
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0",
      ].join(" ")}
    >
      {captionFirst ? (
        <figcaption className="mb-4">{captionBlock}</figcaption>
      ) : null}

      {figureBlock}

      {!captionFirst ? (
        <figcaption className="mt-4">{captionBlock}</figcaption>
      ) : null}
    </figure>
  );
}
