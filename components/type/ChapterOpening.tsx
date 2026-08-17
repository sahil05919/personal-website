/**
 * THE CHAPTER OPENING — a drop cap and a lead-in.
 *
 * The oldest signal in book typography, and the site had none of it. Nine
 * chapters on /journey, five essays on /projects and eleven entries on
 * /experience all began the same way a paragraph in the middle of a page
 * begins: at reading size, flush left, indistinguishable from the paragraph
 * above it except for the space. On a site whose entire argument is that it is
 * a book, that is the most conspicuous thing it was not doing.
 *
 * A drop cap is not decoration. It does one specific job — it tells the eye
 * where a piece of writing STARTS, from across the room, before a single word
 * is read — and it is the reason you can flip through a printed book and find
 * the beginning of a chapter without reading anything. The site's own comments
 * are suspicious of ornament, correctly; this passes that test because remove
 * it and something is genuinely lost.
 *
 * ---------------------------------------------------------------------------
 * THE TWO PARTS
 *
 *   THE CAP     The first letter, in Fraunces, three lines deep, floated so
 *               the prose wraps around it. `WONK 1` is doing real work at this
 *               size — the flared alternates are the face's whole personality
 *               and they only show above about 40px, which until now happened
 *               on roughly six strings across the entire site.
 *
 *   THE LEAD-IN The next few words, set in letter-spaced capitals at a size
 *               below the prose. This is what stops the cap from looking like
 *               a floating ornament: it carries the eye from the big letter
 *               back down into the reading size instead of dropping it off a
 *               cliff.
 *
 * Real small caps are not used, deliberately. Newsreader's variable build has
 * no smcp axis, so `font-variant-caps: small-caps` would be synthesised by the
 * browser — squashed capitals with wrong stem weights, which looks like a bug
 * on a page set this carefully. Letter-spaced full capitals at 0.82em are the
 * honest version of the same gesture.
 *
 * ---------------------------------------------------------------------------
 * WHEN IT DECLINES
 *
 * A drop cap on the wrong first character is worse than none, so it renders as
 * an ordinary paragraph when:
 *
 *   · the paragraph does not begin with a letter — an opening quotation mark
 *     or a numeral as a three-line cap reads as a rendering fault
 *   · the paragraph is shorter than the cap is deep, which would leave the
 *     letter hanging past the end of its own text with the next block wrapped
 *     awkwardly around it
 *
 * Both cases exist in this content. "Equinor said 11.0." is eighteen
 * characters, and the Now page's fragments open on quotation marks.
 */

/** Words set in capitals after the cap. Three is enough to read as a lead-in
 *  and short enough that it never runs past the first line. */
const LEAD_WORDS = 3;

/**
 * Below this many characters the paragraph cannot wrap the cap at all.
 *
 * This was 140 in the first version and it was measured from nothing. The nine
 * Journey chapters actually open on paragraphs of 258, 93, 49, 74, 108, 61,
 * 130, 91 and 43 characters — so a 140 threshold silently declined SEVEN of
 * the nine, and the feature shipped invisible on the page it was built for. It
 * was a screenshot that caught it, not the build.
 *
 * 44 is the width of roughly one line at the reading measure. Below it there
 * is genuinely nothing for the cap to sit beside; at or above it the float
 * does what floats do — if the first paragraph runs out, the text that follows
 * wraps around the letter, which is exactly what happens on a printed page and
 * is the reason this is a float and not a grid.
 */
const MIN_LENGTH = 44;

export function ChapterOpening({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const first = text.charAt(0);
  const eligible = /\p{L}/u.test(first) && text.length >= MIN_LENGTH;

  if (!eligible) {
    return <p className={className}>{text}</p>;
  }

  const rest = text.slice(1);

  /* Split off the lead-in words. The regex keeps the whitespace with the word
     that follows it, so re-joining is lossless and no space is invented or
     lost at the seam. */
  const words = rest.split(/(\s+)/);
  const leadTokens: string[] = [];
  let wordCount = 0;
  let index = 0;

  while (index < words.length && wordCount < LEAD_WORDS) {
    const token = words[index];
    leadTokens.push(token);
    if (token.trim() !== "") wordCount += 1;
    index += 1;
  }

  const lead = leadTokens.join("");
  const remainder = words.slice(index).join("");

  return (
    <p className={className}>
      {/*
        The cap. `float` rather than a grid or absolute position, because float
        is the only mechanism in CSS that makes running text wrap around a
        shape — which is the entire effect. It has been the correct tool for
        this since 1996 and there is still no replacement.

        Sized in `em` so it tracks whatever measure it is dropped into.

        TWO LINES DEEP, not three. The reading face runs at line-height 1.74,
        so a line is 1.74em and a two-line cap needs a box of ~3.48em — which
        at line-height 0.76 means a font-size of about 4.6em. Three lines would
        need 7.2em, and against openers as short as forty-three characters a
        cap that deep is taller than the paragraph it introduces.

        aria-hidden with the letter restored in a visually-hidden span: without
        that, a screen reader announces the capital as its own sentence, so the
        chapter opens "M. AHENDRAGARH IS…".
      */}
      <span
        aria-hidden="true"
        /*
          The right margin is in em of the CAP, which is 4.6× the prose — so
          0.07em here rendered as roughly a third of an em of body text and the
          opening read as "S CHOOL WASN'T ONLY", two words. A drop cap should
          very nearly touch the letters that follow it. 0.02em of the cap is
          about 0.09em of prose, which is a normal letter gap.
        */
        className="float-left mr-[0.02em] mt-[0.06em] font-serif-display text-[4.6em] font-normal leading-[0.76] text-ink"
      >
        {first}
      </span>
      <span className="sr-only">{first}</span>

      <span className="text-[0.82em] uppercase tracking-[0.07em] text-ink">
        {lead}
      </span>
      {remainder}
    </p>
  );
}
