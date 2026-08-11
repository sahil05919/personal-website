import type { Metadata } from 'next';

import {
  Answering,
  Close,
  Exploring,
  Leaf,
  LeafRow,
  Making,
  MarginNote,
  QuietCentre,
  SeasonProse,
  Stamp,
  Workbench,
} from '@/components/now';
import { opening } from './now-content';

// Bare title only. The root layout applies the "%s | Sahil Kumar" template, so
// anything more here double-suffixes the tab.
export const metadata: Metadata = {
  title: 'Now',
  description:
    'One season, written in the present tense and kept with its crossings-out showing. Summer 2026.',
};

/**
 * NOW — the leaf.
 *
 * Every other page on this site is bound into the book: Journey, About,
 * Projects, Media, printed and permanent. Now is tipped in — a sheet printed
 * separately, on its own date, replaceable without touching the binding.
 *
 * Three rules govern the whole page:
 *
 *   1. THE MARGIN IS WHERE TIME LIVES. Dates, states, counters, section
 *      headings and prior versions all sit in the margin column. The main
 *      column carries the season. That division is the visual signature and
 *      the thing that stops this reading as another chapter.
 *
 *   2. COBALT MEANS CHANGE, and nothing else. Crossings-out, their dates, and
 *      the stamp. It is a legend, not an accent — a reader can scan the page
 *      and see in blue exactly what stopped being true.
 *
 *   3. NOTHING IS EQUAL. Not sections, not photographs, not vertical space,
 *      and least of all the interaction budget: Answering carries all of it,
 *      Becoming and Exploring and the quiet centre carry none. Equal weight is
 *      what made the old Doing / Becoming / Living page a filing system.
 *
 * <article>, not <main> — the root layout already renders <main>.
 */
export default function NowPage() {
  return (
    <article className="bg-paper text-ink">
      <Stamp />

      {/* The season. The hinge — April 2026 — is a revision inside the first
          sentence rather than a note about one, so a reader meets the page's
          whole idea within about three seconds of arriving. */}
      <Leaf className="px-6 pb-4 md:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <LeafRow note={<MarginNote tone="change">what changed</MarginNote>}>
            <SeasonProse paragraphs={opening} />
          </LeafRow>
        </div>
      </Leaf>

      <Making />
      <Workbench />

      {/* The caesura. Placed at the middle: before it the entry is about things
          made, after it about people and places. */}
      <QuietCentre />

      <Answering />
      <Exploring />
      <Close />
    </article>
  );
}
