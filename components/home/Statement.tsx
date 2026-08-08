import { homeContent } from '@/data/homeContent';

/**
 * Statement — what this site is, in the author's voice.
 *
 * Server component. Deliberately does not animate: prose that fades in on
 * scroll reads as a slide, and this is the one passage on the page that has
 * to arrive as writing rather than as an effect.
 *
 * The claim is set in Fraunces at display scale inside a Newsreader passage.
 * That scale break is the point — it marks the sentence as the page's
 * assertion rather than the end of a paragraph.
 */
export default function Statement() {
  const { beats, claim, coda } = homeContent.statement;

  return (
    <section
      aria-label="What this is"
      className="bg-paper text-ink px-6 md:px-8 pb-20 md:pb-28"
    >
      <div className="mx-auto max-w-2xl">
        <div className="font-reading text-[1.0625rem] md:text-[1.1875rem] leading-[1.7] space-y-6">
          {beats.map((beat, i) => (
            <p key={i}>{beat}</p>
          ))}
        </div>

        <p className="font-serif-display font-normal text-[1.5rem] md:text-[1.75rem] leading-[1.3] tracking-[-0.01em] mt-10 md:mt-12">
          {claim}
        </p>

        <p className="font-reading text-[0.9375rem] leading-[1.6] text-graphite mt-3">
          {coda}
        </p>
      </div>
    </section>
  );
}
