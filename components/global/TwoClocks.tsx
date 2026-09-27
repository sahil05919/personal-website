"use client";

import { useEffect, useState } from "react";

/**
 * THE TWO CLOCKS.
 *
 * Twin faces, hung side by side, the way they are behind a hotel reception
 * desk: one for where you are, one for somewhere that matters to the person
 * who put them up. Here that is London, and Mahendragarh — where Pooja Saree
 * Centre is, and the reason the whole Experience chapter opens where it does.
 *
 * The idea is already the last paragraph of /experience, written long before
 * this component existed:
 *
 *   "It is mid-afternoon here, which makes it evening in Mahendragarh,
 *    which means the shop is open."
 *
 * ---------------------------------------------------------------------------
 * WHY IT IS NOT A DIGITAL READOUT
 *
 * The first version of this was "LONDON 19:43 / MAHENDRAGARH 00:13" in mono at
 * the foot of the page, and it was wrong in a way that had nothing to do with
 * how it looked. Two four-digit numbers are a lookup — you read them, subtract
 * them, and learn a fact you did not come here for. This is not a site anyone
 * visits to find out what time it is.
 *
 * Two dials do something a readout cannot: the gap between the two places is a
 * VISIBLE ANGLE. You see that London is early evening and Mahendragarh is deep
 * into the night, and you understand the distance between them without reading
 * a single digit — which is the only genuinely educative thing a clock on a
 * personal website could be doing. The digits are still there underneath, for
 * anyone who wants the number rather than the shape.
 *
 * THE ARRIVAL. On load the hands sweep from twelve to the present time, once,
 * over a second and a bit — the gesture of a clock being wound and set rather
 * than a page element fading in. It is the only reason this is worth looking at
 * twice, and it is also why there is no pop-up: an interruption you have to
 * dismiss is a tax on every page view, and a thing that quietly winds itself in
 * the corner is a reward for noticing.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT DELIBERATELY DOES NOT DO
 *
 *   · No second hand. A sweeping second hand is a demand for attention that
 *     never stops, on every page, for as long as the tab is open.
 *   · No aria-live. A clock that announces itself every minute to a screen
 *     reader is unusable. The block carries one static label; the times are
 *     also written out in text beneath the faces, so nothing is locked inside
 *     a picture.
 *   · No ticking, no numerals, no branding on the dial. Two hairline circles
 *     and two hands, at the line weight the rest of the site is drawn in.
 *
 * ---------------------------------------------------------------------------
 * HYDRATION
 *
 * Every page here is static, so the server has no idea what time it is when a
 * reader arrives. The markup ships with both dials at twelve o'clock and the
 * digits as `--:--`, then winds itself after mount. That placeholder is not a
 * loading state to apologise for — it is a stopped clock, which is what an
 * unwound one looks like.
 *
 * THE GAP SENTENCE is computed, never hardcoded: four and a half hours from
 * late March to late October, five and a half for the rest of the year.
 * Writing "four and a half" into the copy would make the site quietly wrong
 * for five months in every twelve.
 */

const LONDON = "Europe/London";
const MAHENDRAGARH = "Asia/Kolkata";

/**
 * Wall-clock offset of a zone from UTC, in minutes, at a given instant.
 *
 * Read back out of `Intl` rather than kept in a table of offsets — a table
 * needs maintaining every time a government moves its clocks, and India and
 * the UK do not shift on the same dates or by the same amount.
 */
function zoneOffsetMinutes(at: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(at);

  const field: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") field[part.type] = part.value;
  }

  // `hour12: false` yields "24" for midnight in some engines. Normalising it
  // is the difference between a correct offset and one that is exactly a day
  // out, once a day, in one of the two zones.
  const hour = field.hour === "24" ? 0 : Number(field.hour);

  const wallClockAsUTC = Date.UTC(
    Number(field.year),
    Number(field.month) - 1,
    Number(field.day),
    hour,
    Number(field.minute),
    Number(field.second),
  );

  return Math.round((wallClockAsUTC - at.getTime()) / 60_000);
}

/** Hours and minutes in a zone, as numbers, for driving the hands. */
function clockIn(at: Date, timeZone: string): { hours: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(at);

  const field: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") field[part.type] = part.value;
  }

  return {
    hours: field.hour === "24" ? 0 : Number(field.hour),
    minutes: Number(field.minute),
  };
}

const NUMBER_WORD = [
  "no",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
] as const;

/** 270 -> "four and a half hours". 330 -> "five and a half hours". */
function spellGap(minutes: number): string | null {
  if (minutes <= 0) return null;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const hourWord = NUMBER_WORD[hours] ?? String(hours);

  if (rest === 0) return `${hourWord} ${hours === 1 ? "hour" : "hours"}`;
  if (rest === 30) return `${hourWord} and a half hours`;

  // Neither zone currently produces this, but a spelled-out sentence that
  // silently drops a remainder is worse than one that is slightly clumsy.
  return `${hourWord} ${hours === 1 ? "hour" : "hours"} and ${rest} minutes`;
}

/** Which part of the day a dial is showing. The dial cannot say this itself —
 *  an analogue face has no idea whether it is ten in the morning or at night,
 *  and on a two-city clock that is exactly the ambiguity worth resolving. */
function partOfDay(hours: number): string {
  if (hours < 5) return "night";
  if (hours < 12) return "morning";
  if (hours < 17) return "afternoon";
  if (hours < 21) return "evening";
  return "night";
}

type Dial = {
  hours: number;
  minutes: number;
  /** Written out, for anyone who wants the number rather than the shape. */
  digits: string;
  period: string;
};

type Reading = {
  london: Dial;
  mahendragarh: Dial;
  gap: string | null;
  /** False until the clock has been wound, i.e. until after mount. */
  set: boolean;
};

const STOPPED: Dial = { hours: 0, minutes: 0, digits: "--:--", period: "" };

const UNWOUND: Reading = {
  london: STOPPED,
  mahendragarh: STOPPED,
  gap: null,
  set: false,
};

function dial(at: Date, timeZone: string): Dial {
  const { hours, minutes } = clockIn(at, timeZone);
  return {
    hours,
    minutes,
    digits: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
    period: partOfDay(hours),
  };
}

function read(at: Date): Reading {
  return {
    london: dial(at, LONDON),
    mahendragarh: dial(at, MAHENDRAGARH),
    gap: spellGap(
      zoneOffsetMinutes(at, MAHENDRAGARH) - zoneOffsetMinutes(at, LONDON),
    ),
    set: true,
  };
}

/**
 * One face.
 *
 * Drawn in a 100-unit box and scaled by CSS, so the dial is resolution
 * independent — but every piece of TYPE around it is real DOM text at a real
 * size, never SVG <text>, which shrinks with the viewBox and becomes
 * unreadable at small sizes.
 *
 * `currentColor` throughout, so the whole object inherits the theme's ink and
 * needs no per-theme values of its own.
 */
function Face({
  place,
  dial,
  set,
}: {
  place: string;
  dial: Dial;
  set: boolean;
}) {
  // 30° per hour plus half a degree per minute, so the hour hand creeps the way
  // a real one does instead of jumping on the hour.
  const hourAngle = (dial.hours % 12) * 30 + dial.minutes * 0.5;
  const minuteAngle = dial.minutes * 6;

  return (
    <div className="flex flex-col items-center">
      {/* The cord it hangs from. A hairline and a small ring — the reason the
          pair reads as two objects on a wall rather than two icons in a row. */}
      <span aria-hidden="true" className="block h-4 w-px bg-hairline" />
      <span
        aria-hidden="true"
        className="mb-[-3px] block h-[3px] w-[3px] rounded-full bg-graphite"
      />

      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16 text-graphite"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
        />

        {/* Four marks, at the quarters. Twelve would turn a quiet object into
            a dial you are meant to read precisely, which is not the job. */}
        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="8"
            x2="50"
            y2="15"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.5"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        {/*
          The hands. Both animate from 0° — twelve o'clock — to their real
          angle on the first render after mount, which is the winding gesture.
          `transition` is on `transform` only, so nothing here can shift layout.
          The minute hand is given a slightly longer duration than the hour hand
          so the two do not arrive in lockstep, which reads mechanical.
        */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="27"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="text-ink [transition:transform_1100ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{
            transform: `rotate(${set ? hourAngle : 0}deg)`,
            transformOrigin: "50px 50px",
          }}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-ink [transition:transform_1400ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{
            transform: `rotate(${set ? minuteAngle : 0}deg)`,
            transformOrigin: "50px 50px",
          }}
        />

        <circle cx="50" cy="50" r="3" fill="currentColor" className="text-ink" />
      </svg>

      <p className="mt-3 text-center font-mono text-apparatus-xs uppercase leading-[1.7] text-graphite">
        {place}
        <br />
        <span className="tabular-nums text-ink">{dial.digits}</span>
        {dial.period ? (
          <>
            <br />
            <span className="normal-case tracking-normal">{dial.period}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}

export default function TwoClocks() {
  const [reading, setReading] = useState<Reading>(UNWOUND);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const update = () => {
      const now = new Date();
      setReading(read(now));

      // Re-schedule onto the next minute boundary rather than polling. A
      // setInterval(1000) would wake sixty times for every change a reader can
      // see. The +250ms is slack so a slightly early fire does not render the
      // same minute twice and then wait a full minute for the next one.
      const msToNextMinute =
        60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      timer = setTimeout(update, msToNextMinute + 250);
    };

    update();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      // One static description. The times are not announced as they change,
      // which is the correct behaviour for something ambient.
      aria-label="The time in London and in Mahendragarh"
      className="inline-block"
    >
      <div className="flex items-start gap-8">
        <Face place="London" dial={reading.london} set={reading.set} />
        <Face
          place="Mahendragarh"
          dial={reading.mahendragarh}
          set={reading.set}
        />
      </div>

      {/*
        Reading register, not apparatus — the one line here that is a sentence
        rather than a label, and the reason for showing two clocks instead of
        one. Rendered only once the real offset is known, so it never flashes a
        wrong number.
      */}
      {reading.gap ? (
        <p className="mt-5 max-w-[16rem] font-reading text-fluid-aside text-graphite">
          {reading.gap.charAt(0).toUpperCase() + reading.gap.slice(1)} between
          them.
        </p>
      ) : null}
    </div>
  );
}
