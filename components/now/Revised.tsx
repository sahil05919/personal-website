'use client';

import { useState, type KeyboardEvent } from 'react';

import type { Revision } from '@/app/now/now-content';

/**
 * THE VISIBLE REVISION — the signature of this page.
 *
 * Every other page on the site states what is true. This one also states what
 * stopped being true, and when. A crossing-out is kept in public: the old
 * wording stays on the page, struck, beside the wording that replaced it.
 *
 * Two rules, and they are the whole design:
 *
 *   1. NOTHING IS HIDDEN. Both versions and the date are always rendered, at
 *      every breakpoint. The interaction does not reveal text — it brings the
 *      struck version *forward*, from faint to full. An interaction is earned
 *      only if what it reveals is better than what it hides, and this one
 *      hides nothing at all. It therefore also survives with JavaScript off,
 *      with hover unavailable, and in a screen reader.
 *
 *   2. COBALT MEANS CHANGE. On this page the accent has exactly one job. If
 *      something is blue, it changed. That makes the palette a legend rather
 *      than decoration, and it is why no other element here may use it.
 *
 * `<del>`/`<ins>` are not stylistic choices. They are the semantics of an
 * edited document, which is what this page is.
 *
 * WHY A SPAN AND NOT A BUTTON. A revision sits mid-sentence and must break
 * across lines like any other run of text. Chrome treats form controls as
 * atomic inline-level boxes regardless of `display: inline`, so a <button>
 * refuses to wrap and forces a line break before and after itself — verified
 * on this page before this was changed. The span carries the full button
 * contract instead: role, tabindex, aria-pressed, and Enter/Space.
 *
 * The press is held rather than momentary because focus is lost the instant a
 * touch reader scrolls, and the emphasis should survive that.
 *
 * NOTHING INSIDE THIS COMPONENT MAY CARRY aria-hidden. globals.css ships a
 * blanket `@media print { [aria-hidden='true'] { display: none } }`, so an
 * aria-hidden date silently disappears from a printed or PDF-exported page —
 * which is exactly where a document of record most needs its dates. The
 * wrapper's aria-label already supplies the accessible name for a
 * role="button", so aria-hidden on the children was redundant anyway.
 */
export function Revised({ struck, now, until }: Revision) {
  const [held, setHeld] = useState(false);

  function toggle() {
    setHeld((v) => !v);
  }

  function onKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-pressed={held}
      aria-label={`Revised: was “${struck}”, ${until}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      data-held={held ? '' : undefined}
      className="group/rev cursor-pointer rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-through-line focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <del
        className="
          text-graphite/70 no-underline
          [text-decoration-line:line-through]
          [text-decoration-color:rgb(var(--through-line)/0.45)]
          [text-decoration-thickness:1px]
          motion-safe:transition-colors motion-safe:duration-300
          group-hover/rev:text-through-line
          group-focus-visible/rev:text-through-line
          group-data-[held]/rev:text-through-line
          group-hover/rev:[text-decoration-color:rgb(var(--through-line))]
          group-focus-visible/rev:[text-decoration-color:rgb(var(--through-line))]
          group-data-[held]/rev:[text-decoration-color:rgb(var(--through-line))]
          lg:text-graphite/45
        "
      >
        {struck}
      </del>{' '}
      <ins className="text-ink no-underline">{now}</ins>
      <span
        className="
          ml-1.5 whitespace-nowrap font-mono text-[0.5625rem] uppercase tracking-[0.16em]
          text-through-line/75 lg:text-through-line/45
          motion-safe:transition-colors motion-safe:duration-300
          group-hover/rev:text-through-line
          group-focus-visible/rev:text-through-line
          group-data-[held]/rev:text-through-line
        "
      >
        {until}
      </span>
    </span>
  );
}
