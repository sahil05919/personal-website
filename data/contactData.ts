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
 *      Drafted, then cut, and still cut — but for a different reason than the
 *      one recorded here before.
 *
 *      This note used to list four date conflicts between the PDF and
 *      /experience. Checked against the actual file in August 2026: they are
 *      gone. The PDF has since been replaced and its dates now agree with the
 *      Experience page — Middlesex April 2026, Enhanceer Sep 2023–Aug 2024,
 *      SolutionTech Jul 2021–Aug 2023. The "20% against 30%" was never a
 *      conflict at all; it was a misreading of "time-to-hire from 30 days to
 *      20 days", which is one figure, not two.
 *
 *      What was still true in that note is no longer true either. Re-checked
 *      against the actual file on 17 August 2026: the PDF has been replaced
 *      again and now opens "People Analytics Analyst — People Insights,
 *      Workforce & HR Reporting", leads on headcount, attrition and
 *      recruitment-funnel reporting, and selects Employee Attrition Analysis
 *      and the Recruitment Analytics Dashboard as its two projects. The
 *      condition the note set has been met, and the erratum that recorded the
 *      old positioning is now closed (data/errataData.ts, `cv-description`).
 *
 *      The line is still not on the page, and that is now a choice rather than
 *      a blocker. The two documents no longer describe two people, but they do
 *      not describe the same thing either: the CV selects the professional
 *      spine out of fifteen years, and /experience keeps the saree shop, the
 *      note-taking and the thirty-five first days that the CV has no room for.
 *      "The same record, compressed to one" would overclaim. Restore it only
 *      with wording that is true of both.
 *
 *   3. "I believe ambition gives us direction..." Moved out, not lost. Two
 *      closing statements compete; the note under `lastNote` is now the thing
 *      the page ends on, and it was written for this position. The ambition
 *      line is a belief rather than an ending — it belongs on About or as a
 *      Questions essay, where a belief can be argued rather than pronounced.
 * ---------------------------------------------------------------------------
 */

/**
 * NO PHONE NUMBER HERE, DELIBERATELY (17 August 2026)
 *
 * `phone: '+447562267371'` used to sit on this line and was printed in full on
 * /contact with a `tel:` link on it. A mobile number set as plain text on a
 * public page is scraped within days: it is the one detail on this site that
 * costs something to publish and cannot be taken back once it has been
 * collected. Email and LinkedIn are both reversible; a number is not.
 *
 * WhatsApp stays, because a message request is not a cold call and the reader
 * chooses to open it. The number is inside that URL, which is the trade being
 * made knowingly — it is not on the page as a callable string, and anyone who
 * wants to speak can ask.
 */
export const contactInfo = {
  email: 'sahil05919@gmail.com',
  whatsapp: 'https://wa.me/447562267371',
  location: 'London',
  linkedin: 'https://www.linkedin.com/in/reach-sahil/',
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

/**
 * The unsigned note.
 *
 * Every other door on this page costs the reader something: an email address
 * has their name on it, LinkedIn tells him who looked, WhatsApp is a phone
 * number. This one costs nothing, and the copy has to say so plainly without
 * turning into a privacy policy — the promise is one sentence, and it is a
 * promise the implementation actually keeps.
 *
 * It used to say the promise was kept by `app/api/unsigned/route.ts`. That route
 * does not exist and has not for some time: Web3Forms returns 403 to server-side
 * calls, so the form posts straight from the browser
 * (components/contact/Unsigned.tsx). The promise still holds — nothing on this
 * site stores or logs the message — but it now holds because there is no server
 * of ours in the path at all, which is a stronger version of the same claim and
 * worth stating accurately.
 *
 * `reply` is optional and labelled optional twice, because a "way to reply"
 * field that looks required defeats the entire point of the section.
 */
export interface UnsignedContent {
  eyebrow: string;
  heading: string;
  line: string;
  messageLabel: string;
  messagePlaceholder: string;
  replyLabel: string;
  replyHint: string;
  action: string;
  sending: string;
  /** Shown in place of the form once it has gone. */
  sentHeading: string;
  sentLine: string;
  again: string;
  /** Used when the request fails for any reason we can't be specific about. */
  failure: string;
  /** Shown in place of the controls when no delivery endpoint is configured. */
  unconfigured: string;
}

export interface ContactContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; body: readonly string[] };
  groups: readonly ChannelGroup[];
  apparatus: { cvLabel: string; cvNote: string };
  unsigned: UnsignedContent;
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
    cvLabel: 'Download the CV',
    cvNote: 'PDF · one page · the professional spine of this record',
  },

  unsigned: {
    eyebrow: 'Unsigned',
    heading: "Or say it without saying who you are.",
    line: "Every other way of reaching me here comes with your name attached. This one doesn't. Nothing is stored, nothing is logged, and it arrives with no address on it — so if you have something to tell me that you would not put your name to, this is the door for that.",
    messageLabel: 'Your message',
    messagePlaceholder: 'Type it here.',
    replyLabel: 'A way to reply',
    replyHint:
      "Optional, and the only thing on this page that would identify you. Leave it empty and I'll have no way to write back — which is a fine thing to choose.",
    action: 'Send',
    sending: 'Sending',
    sentHeading: 'Sent.',
    sentLine:
      "It reached me without a name on it. I read all of these, and I don't always know who to thank — so: thank you.",
    again: 'Send another',
    failure:
      "That didn't send, and I'd rather tell you than pretend. Try again in a moment, or use one of the doors above.",
    unconfigured:
      "This one isn't connected yet — I'd rather say so than give you a box that swallows what you wrote. Until it is, the nearest thing is",
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
