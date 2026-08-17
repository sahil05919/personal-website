import { answering } from '@/app/now/now-content';

import { Leaf, LeafRow, LeafHeading, MarginNote } from './Leaf';
import { Pile } from './Pile';

/**
 * ANSWERING — Community and Writing, merged.
 *
 * They were never two things. St Luke's was sitting beside someone while they
 * worked out what a form was asking them for; the LinkedIn messages are the
 * same act with the room removed. Separating them is precisely what turned
 * Writing into a bibliography and Community into a single sentence about
 * volunteering.
 *
 * The questions are set large, in Fraunces, and left unanswered. Fraunces is
 * reserved on this page for other people's voices and for stillness — the
 * questions, the couplet, the Gita line, the season — so a question arriving
 * at display scale is legible as somebody else speaking without any label
 * saying so. Unanswered because the answer is the pile underneath, and because
 * a question with an answer stapled to it stops being a question.
 *
 * The St Luke's continuity is a margin note, not a heading and not a three-box
 * process diagram. "Someone asks → I help → something becomes clearer" drawn
 * as steps is a dashboard object; written as one sentence it is a life.
 *
 * This section carries the page's largest interaction budget, and it is the
 * only one that carries any.
 */
export function Answering() {
  return (
    <Leaf className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[62rem]">
        <LeafRow note={<LeafHeading>{answering.heading}</LeafHeading>}>
          <p className="max-w-[36rem] font-reading text-[1.0625rem] leading-[1.75] text-ink md:text-[1.1875rem]">
            {answering.standfirst}
          </p>
        </LeafRow>

        <ul className="m-0 mt-16 list-none space-y-14 p-0 md:mt-24 md:space-y-20">
          {answering.questions.map((question) => (
            <li key={question.text}>
              <LeafRow
                note={<MarginNote>{question.attribution}</MarginNote>}
              >
                <p className="max-w-[46rem] font-serif-display text-[1.625rem] font-normal leading-[1.25] tracking-[-0.02em] text-ink md:text-[2.375rem] lg:text-[2.75rem]">
                  {question.text}
                </p>
              </LeafRow>
            </li>
          ))}
        </ul>

        <LeafRow
          className="mt-20 md:mt-28"
          note={<MarginNote>where this started</MarginNote>}
        >
          <p className="max-w-[36rem] font-reading text-[1rem] leading-[1.8] text-graphite">
            {answering.context}
          </p>
        </LeafRow>

        <LeafRow
          className="mt-20 md:mt-28"
          note={<MarginNote>{answering.pileHeading}</MarginNote>}
        >
          <div>
            <p className="mb-8 max-w-[36rem] font-reading text-[1rem] leading-[1.8] text-graphite">
              {answering.pileNote}
            </p>
            <Pile fragments={answering.pile} />
          </div>
        </LeafRow>

        <LeafRow
          className="mt-16"
          note={<MarginNote>{answering.publishedNote}</MarginNote>}
        >
          <ul className="m-0 max-w-[36rem] list-none space-y-3 p-0">
            {answering.published.map((piece) => (
              <li key={piece.href} className="flex items-baseline gap-4">
                <span className="w-[3.75rem] shrink-0 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-graphite">
                  {piece.source}
                </span>
                <a
                  href={piece.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-rule font-reading text-[1rem] leading-[1.6] text-ink"
                >
                  {piece.text}
                </a>
              </li>
            ))}
          </ul>
        </LeafRow>
      </div>
    </Leaf>
  );
}
