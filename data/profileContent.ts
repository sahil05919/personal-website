/**
 * About — content.
 *
 * The prose is LOCKED. `body` is one continuous string.
 *
 * Rendering contract:
 *   blank line  -> new <p>
 *   single line -> <br /> within the same <p>
 *
 * Scale rhythm lives in components/about/Prose.tsx (`RHYTHM`), keyed to
 * paragraph index. If the prose ever changes, that map must be re-checked.
 */

export const aboutContent = {
  name: 'Sahil Kumar',

  /** Sits under the name in the frontispiece. Mono, small, apparatus. */
  standfirst: 'The patterns, not the events.',

  portrait: {
    /**
     * Empty until the right photograph exists. Wanted: portrait orientation,
     * mid-distance, indoors, not a headshot, not looking at the lens.
     * A headshot is a credential; this page wants a person in a room.
     */
    src: '',
    alt: '',
    width: 1200,
    height: 1600,
  },

  revision: {
    stamp: 'First version',
    date: 'August 2026',
    promise: 'I rewrite this page when it stops being true. The old versions stay.',
  },

  previousVersions: [] as Array<{ date: string; body: string }>,

  body: `If I have a completely free day, I'll probably start by organising my room.

It isn't because I enjoy cleaning. I just find it easier to think when the things around me have settled down. By the time the room is in order, my head usually is too. After that I'll continue something I've already started, wander somewhere I've never been before, or disappear into an idea that's been sitting quietly in the back of my mind for a few days. Very little of that is planned. It's simply how I seem to spend time when nobody is asking anything of me.

People often come to me with problems that don't really belong together. One friend wants help choosing a laptop. Another wants to talk through a financial decision. Someone else simply wants another person to think alongside them for a while. The subject changes. The work doesn't. I rarely feel a need to answer quickly. I enjoy untangling things until they make sense.

I built a financial dashboard because I wanted to understand where I stood instead of wondering. At work, I'm usually more interested in finding the step that can disappear than adding another one. Clarity matters to me more than certainty. I don't mind sitting with a problem for longer if I feel like I'm slowly understanding it.

My attention naturally lands on what is unfinished before it lands on what already works.

It's useful when something genuinely needs improving. It also means I don't stay with achievements for very long before I'm already looking at what could be better. My attention has always had a habit of wandering towards loose ends.

If one paragraph stays with me for three days, I don't mind taking three weeks to finish a book.

People usually assume I'm quieter than I really am. Somewhere in the middle of a conversation I'll make a joke that arrives at exactly the right moment. Some of my favourite evenings are the ones where everyone forgets what time it is because the conversation keeps finding somewhere new to go, or because one good joke keeps getting funnier every time someone repeats it.

I can usually remember a city through one meal and the people I shared it with.

I optimise work.
I optimise projects.
I optimise decisions.
I optimise the way I organise my time, my notes and sometimes even my weekends.

I've never done that with my family.

Talking to them every day has never been something I've scheduled, measured or turned into a habit. I've never really made a decision to do it.

It's simply never been something I've negotiated with myself.`,

  /**
   * Card grid. Discrete, comparable items — which is what cards are actually
   * FOR. The old page put prose in cards (wrong) and this puts data in them
   * (right).
   *
   * Removed from the original eight: "Current Focus" (a category, and /now owns
   * it) and "Favourite Book" (third Bhagavad Gita mention on the site).
   */
  facts: [
    { label: 'Originally from', value: 'Haryana, India' },
    { label: 'Based in', value: 'London, United Kingdom' },
    { label: 'Work', value: 'Finance Assistant' },
    { label: 'Studied', value: 'MSc Business Analytics' },
    { label: 'Languages', value: 'English & Hindi' },
    { label: 'Favourite food', value: 'Dishoom pav bhaji' },
  ],

  exit: {
    href: '/journey',
    eyebrow: 'Next',
    heading: 'Every person has a story.',
    headingQuiet: "Here's mine.",
    blurb:
      'Growing up in Haryana, the years that changed direction, and how one became the other.',
    action: 'Turn page',
  },
};
