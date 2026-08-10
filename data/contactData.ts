/**
 * Contact — the last room.
 *
 * Copy lives here, not in the components. Same rule as every other chapter.
 *
 * ---------------------------------------------------------------------------
 * NOT ON THIS PAGE, DELIBERATELY:
 *
 *   1. "looking for business and data analyst roles." Removed. /experience and
 *      /projects carry the professional direction; saying it here turned the
 *      last page of the record into a job application.
 *
 *   2. "The CV is the same record as the Experience page, compressed to one."
 *      Drafted, then cut, because it is false today. The PDF at
 *      /public/documents/Sahil_Kumar_CV.pdf is an HR / People Analyst CV:
 *      Middlesex dated Jan 2026 against April 2026 on /experience, Enhanceer
 *      Aug 2022–Sep 2023 against Sep 2023–Aug 2024, SolutionTech Jan 2021–
 *      Jul 2022 against Jul 2021–Sep 2023, hiring efficiency 20% against 30%.
 *      Restore it only once the PDF matches.
 *
 *   3. "I believe ambition gives us direction..." Moved out, not lost. Two
 *      closing statements compete; the note under `lastNote` is now the thing
 *      the page ends on, and it was written for this position. The ambition
 *      line is a belief rather than an ending — it belongs on About or as a
 *      Questions essay, where a belief can be argued rather than pronounced.
 * ---------------------------------------------------------------------------
 */

export const contactInfo = {
  email: 'sahil05919@gmail.com',
  phone: '+447562267371',
  whatsapp: 'https://wa.me/447562267371',
  location: 'London',
  linkedin: 'https://www.linkedin.com/in/sahil-business-analyst/',
  github: 'https://github.com/sahil05919',
  instagram: 'https://www.instagram.com/driftwithsahil/',
  resume: { fileName: 'Sahil_Kumar_CV.pdf' },
} as const;

/** Which mark a channel row carries. Keyed, not free-form, so the brand-colour
 *  map in ChannelRow can be exhaustive and Tailwind can see literal classes. */
export type MarkName = 'email' | 'linkedin' | 'whatsapp' | 'instagram' | 'github';

export interface Channel {
  mark: MarkName;
  /** Mono label. The platform, named in words as well as in the mark, because
   *  a logo alone is not an accessible name. */
  label: string;
  /** The row's display line. For email this is the address itself — the one
   *  row where the destination and the invitation are the same string. */
  title: string;
  href: string;
  /** Appended to the accessible name where the title alone is ambiguous. */
  ariaSuffix?: string;
  external?: boolean;
}

export interface ChannelGroup {
  /** Mono section label. */
  eyebrow: string;
  /** One reading-register line. Not instructions — a reason. */
  line: string;
  channels: readonly Channel[];
}

export interface ContactContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; body: readonly string[] };
  groups: readonly ChannelGroup[];
  apparatus: { telephoneLabel: string; cvLabel: string };
  walk: { eyebrow: string; lines: readonly string[] };
  lastNote: {
    eyebrow: string;
    prompt: string;
    action: string;
    /** Four lines. The first three in reading register, the fourth at display
     *  scale — the reveal escalates rather than repeating. */
    lines: readonly string[];
  };
  close: { signature: string; place: string; returnLabel: string };
}

export const contactContent: ContactContent = {
  meta: {
    title: 'Contact',
    description:
      'The end of the record. Where to find me, and one last thing to take with you.',
  },

  hero: {
    eyebrow: 'Endpaper',
    headline: 'Write back.',
    body: [
      "You've reached the end of the record. If something in it caught your attention, I'm glad you stayed.",
      "There are a few ways to find me. Which one depends on why you're writing.",
    ],
  },

  groups: [
    {
      eyebrow: 'For work',
      line: 'An opportunity, a project, or something worth building together. Email reaches me first and I read all of it.',
      channels: [
        {
          mark: 'email',
          label: 'Email',
          title: contactInfo.email,
          href: `mailto:${contactInfo.email}?subject=Connecting%20from%20your%20website`,
          ariaSuffix: 'Send an email',
        },
        {
          mark: 'linkedin',
          label: 'LinkedIn',
          title: 'Where the working record stays current',
          href: contactInfo.linkedin,
          external: true,
        },
      ],
    },
    {
      eyebrow: 'For everything else',
      line: 'An idea, a question, or something here you read and disagreed with.',
      channels: [
        {
          mark: 'whatsapp',
          label: 'WhatsApp',
          title: 'Send me a message',
          href: contactInfo.whatsapp,
          external: true,
        },
        {
          mark: 'instagram',
          label: 'Instagram',
          title: "See what I'm noticing",
          href: contactInfo.instagram,
          external: true,
        },
        {
          mark: 'github',
          label: 'GitHub',
          title: "See what I'm building",
          href: contactInfo.github,
          external: true,
        },
      ],
    },
  ],

  apparatus: {
    telephoneLabel: 'By telephone',
    cvLabel: 'Download CV',
  },

  walk: {
    eyebrow: 'In person',
    lines: [
      "If you'd rather talk properly, send a message. Coffee works.",
      "So does a long walk — London explains itself better on foot, and I've found most people do too.",
    ],
  },

  lastNote: {
    eyebrow: 'Before you go',
    prompt: "There's one last thing I'd like you to take with you.",
    action: 'Read it',
    lines: [
      'I moved countries expecting it to feel like a decision. It mostly felt like a Tuesday.',
      'Almost everything I know now arrived while I was busy with something else. I noticed late, or not at all.',
      "I still don't know what this is adding up to. I've stopped needing to know that before I begin.",
      "If anything here stays with you, let it be this: the number that doesn't reconcile is worth writing down, and so is the afternoon you didn't think to photograph.",
    ],
  },

  close: {
    signature: 'Sahil Kumar',
    place: 'London.',
    returnLabel: 'Back to the beginning',
  },
};
