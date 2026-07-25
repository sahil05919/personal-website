export interface MediaImage {
  src: string;
  alt: string;
}

export interface MediaMoment {
  id: string;
  image: MediaImage;
  /** Width of the image as a percentage of the content column. Lets each
   *  photograph earn its own footprint instead of following a fixed grid. */
  widthPercent: number;
  /** CSS aspect-ratio value, e.g. "4 / 3", "1 / 1", "3 / 4". */
  aspectRatio: string;
  /** Single observational paragraph. Deliberately one block of prose —
   *  no headings, no metadata, no reflection. */
  caption: string;
  /** When true, the image is right-aligned within the column instead of
   *  left/full width. Used sparingly to avoid the page reading as a grid. */
  alignEnd?: boolean;
  /** When true, caption renders before the image rather than after.
   *  Reserved for one entry only — used more than once and it stops
   *  being a surprise and starts being a second template. */
  captionFirst?: boolean;
  /** Optional secondary, clearly subordinate image with a short plain
   *  note instead of a full caption. Never a second equal-weight photo. */
  secondary?: {
    image: MediaImage;
    note: string;
  };
}

// Version 1 — eight moments, chronological-ish, deliberately capped.
// Replace entries over time rather than appending indefinitely.
export const mediaMoments: MediaMoment[] = [
  {
    id: "graduation",
    image: {
      src: "/images/media/graduation.jpg",
      alt: "Standing outside Bayes Business School in a graduation gown.",
    },
    widthPercent: 100,
    aspectRatio: "4 / 3",
    caption:
      "Months of it came down to a few seconds of walking, and then the next name was already being called. There was more waiting than anything else — for the gown, for a seat, for a name to be called. My family was in India, so it was a phone call rather than a hug, but we talked about it properly that evening. The photos outside afterwards are the ones I still go back to.",
  },
  {
    id: "middlesex",
    image: {
      src: "/images/media/middlesex.jpg",
      alt: "At a desk in the Middlesex University finance office, laptop open, university sign on the wall behind.",
    },
    widthPercent: 58,
    aspectRatio: "5 / 4",
    caption:
      "Nobody ever said I was ready. They just stopped explaining everything first. Outlook, the shared inbox, the finance system and two screens had stopped feeling like separate things by then, and started feeling like the shape of an ordinary day. I don't remember when that changed. I only remember that it had.",
  },
  {
    id: "london",
    image: {
      src: "/images/media/london-bridge.jpg",
      alt: "London Bridge on an overcast afternoon.",
    },
    widthPercent: 58,
    aspectRatio: "4 / 3",
    caption:
      "I went to London Bridge and Buckingham Palace first, back when I still wanted to see the places I recognised from films. Everything since has been quieter — a walking tour where the guide talked more about the streets than about Sherlock Holmes, an afternoon in Notting Hill that felt lived-in rather than photographed. I did almost all of it alone, at whatever pace I felt like that day. The weather rarely matched the forecast. Somewhere in two years of ordinary weather and repeated Tube lines, I stopped opening Google Maps between stations — and only noticed once it had already happened.",
    secondary: {
      image: {
        src: "/images/media/notting-hill.jpg",
        alt: "A colourful terraced street in Notting Hill.",
      },
      note: "Notting Hill, one afternoon.",
    },
  },
  {
    id: "ifly",
    image: {
      src: "/images/media/ifly.jpg",
      alt: "Mid-air during an indoor skydiving flight at iFLY.",
    },
    widthPercent: 70,
    aspectRatio: "3 / 4",
    captionFirst: true,
    caption:
      "I watched everyone else go first through the glass, and it looked easier than it turned out to be. Inside, the wind wasn't what I'd pictured — less like floating, more like the air itself was holding me up. I wasn't really in control; the instructor kept making small adjustments I didn't even notice needing. Then, for a few seconds, he let go. That was the closest it got to actually flying. It ended before I was ready for it to.",
  },
  {
    id: "birthday",
    image: {
      src: "/images/media/birthday.jpg",
      alt: "Cutting a small cake at a café table on a birthday evening in London.",
    },
    widthPercent: 40,
    aspectRatio: "4 / 5",
    alignEnd: true,
    caption:
      "Nothing was planned. I went out for a meal, walked around for a while, took a few photos I don't think I've looked at since. My family called in the morning — the kind of call where everyone tries to sound extra cheerful because they're happy for you, even from that far away. Somewhere in the afternoon I stopped and thought: this is my birthday, and I'm in London. Then I kept walking.",
  },
  {
    id: "oxford",
    image: {
      src: "/images/media/oxford.jpg",
      alt: "The Radcliffe Camera in Oxford under an overcast sky.",
    },
    widthPercent: 64,
    aspectRatio: "4 / 3",
    caption:
      "I'd expected facts about famous alumni. Instead the guide talked about doors, walls, small traditions — the kind of detail you'd walk straight past if nobody pointed it out. Whenever the sun came out, the stone went a warm honey colour that none of my photos quite caught. I left thinking there were still stories I hadn't heard.",
  },
  {
    id: "cambridge",
    image: {
      src: "/images/media/cambridge.jpg",
      alt: "The River Cam with a college building behind.",
    },
    widthPercent: 55,
    aspectRatio: "4 / 3",
    alignEnd: true,
    caption:
      "Everyone has an opinion on Oxford versus Cambridge, so I went to have my own. Bicycles passed every few minutes, quietly, until it stopped registering as anything unusual — just the city's ordinary rhythm. After the tour I stopped looking for things to see and just walked along the river instead. Oxford had impressed me. Cambridge felt like somewhere I could come back to with no plan at all.",
  },
  {
    id: "brighton",
    image: {
      src: "/images/media/brighton.jpg",
      alt: "Brighton Pier with the sea behind.",
    },
    widthPercent: 60,
    aspectRatio: "4 / 3",
    caption:
      "The wind reached the promenade before the sea did — you could hear the waves a good few minutes before you saw them. I'd seen photos of the beach for years, but standing on pebbles instead of sand still caught me off guard. The weather cooperated more than England usually allows, and I stayed longer than I'd planned. The train back to London felt quieter than the one there.",
  },
];