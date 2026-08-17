'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';

import { contactContent, contactInfo } from '@/data/contactData';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

/**
 * Unsigned — the door with no name on it.
 *
 * Every other row on this page asks the reader to identify themselves in order
 * to use it. An email carries their address, LinkedIn tells him who looked,
 * WhatsApp is a phone number. This is the one way through that costs nothing,
 * and it exists because the most useful things people send are often the ones
 * they would not put their name to.
 *
 * ---------------------------------------------------------------------------
 * WHY IT LOOKS LIKE THIS
 *
 * It is the same motif as Imprint directly above it: ruled letterhead. Each
 * field sits under a full-width hairline with a short ink tick at its left
 * end, and on focus the ink draws across the whole rule, left to right — the
 * identical gesture ChannelRow performs on hover, on the identical curve. The
 * two sections then read as one sheet of stationery with a form set into it,
 * rather than as a page that had a contact widget bolted onto the bottom.
 *
 * NOT A CARD. No box, no fill, no rounded container, no drop shadow. The only
 * bounded shape in either section is a brand mark. A boxed form here would
 * undo the un-carding both sections were built around.
 *
 * NO PLACEHOLDER-AS-LABEL. Every field has a real <label>. Placeholder text
 * that disappears when you type is a label you can no longer read once you
 * need it, and it fails at exactly the moment someone is composing something
 * difficult — which is the whole use case for this section.
 *
 * ---------------------------------------------------------------------------
 * THE PROMISE
 *
 * The copy says nothing is stored and nothing is logged. That is enforced in
 * app/api/unsigned/route.ts, not here, and it is a real constraint on that
 * file rather than a marketing line: no database, no logging of the message or
 * the address, and the rate limiter holds a hash of the IP in volatile memory
 * and nothing else.
 *
 * The reply field is optional and is said to be optional twice — in its label
 * and in its hint. A "how can I reach you" box that looks compulsory would
 * defeat the section entirely.
 *
 * ---------------------------------------------------------------------------
 * SPAM, without a CAPTCHA
 *
 * A CAPTCHA on a page about writing to someone anonymously is the wrong object
 * in every sense, and the third-party script would watch the reader on the one
 * page that promises nothing is watching. Two quieter checks instead:
 *
 *   1. A honeypot field, off-screen, hidden from assistive technology and from
 *      tab order, that no person will ever fill in.
 *   2. How long the form was open. The server discards anything submitted in
 *      under two and a half seconds.
 *
 * Both are enforced server-side, and both return a cheerful 200 when tripped
 * so a script learns nothing about which check caught it.
 */

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

const SWEEP =
  'transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

const MAX_MESSAGE = 4_000;
/** Below this many characters remaining, the count appears. */
const COUNT_FROM = 400;

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * The ruled field. A hairline across the top, an ink tick at the left end, and
 * the ink completing the rule when anything inside takes focus.
 *
 * `focus-within` rather than a focus handler on the control: the rule belongs
 * to the field, and the field contains a label the reader may well click.
 */
function Ruled({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative pt-6 md:pt-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-hairline"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-7 bg-ink"
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ink group-focus-within:scale-x-100 ${SWEEP}`}
      />
      {children}
    </div>
  );
}

const FIELD_LABEL =
  'block font-mono text-[11px] uppercase tracking-[0.08em] text-graphite transition-colors duration-500 group-focus-within:text-ink motion-reduce:transition-none';

/**
 * Shared by the textarea and the reply input. Transparent ground, and the
 * site's own focus ring suppressed here because the drawing rule above the
 * field already says where focus is, far more quietly than a 2px outline
 * around a full-width box.
 *
 * Deliberately sets NO border utility. Each control declares its own below —
 * `border-0` here and `border-b` there are both border-width utilities in the
 * same Tailwind layer, so which one won would come down to their order in the
 * generated stylesheet rather than to anything written here.
 */
const FIELD_CONTROL =
  'mt-3 w-full resize-none bg-transparent p-0 font-reading text-fluid-read text-ink outline-none placeholder:text-graphite/55 focus:outline-none focus:ring-0';

export default function Unsigned({
  /**
   * Whether the delivery endpoint is configured. Decided on the server (see
   * app/contact/page.tsx) so the check never ships to the browser.
   *
   * When false the section still renders in full — heading, promise, the
   * whole argument for why this door exists — and only the controls are
   * replaced, by a line saying it is not connected yet and the email address
   * that is. Showing a working-looking Send button that could only fail would
   * be the one genuinely cruel state for a form people use to say difficult
   * things.
   */
  configured = true,
}: {
  configured?: boolean;
}) {
  const prefersReducedMotion = useReducedMotionSafe();
  const copy = contactContent.unsigned;

  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const openedAt = useRef<number>(0);
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  /**
   * Grow with the content. A note that outruns a fixed four-row box makes the
   * reader scroll inside a scrolling page to re-read what they wrote, which is
   * the point at which people give up and send the shorter version.
   */
  useEffect(() => {
    const node = textarea.current;
    if (!node) return;
    node.style.height = 'auto';
    node.style.height = `${node.scrollHeight}px`;
  }, [message]);

  const remaining = MAX_MESSAGE - message.length;
  const canSend = message.trim().length > 0 && status !== 'sending';

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;

    setStatus('sending');
    setError(null);

    try {
      const response = await fetch('/api/unsigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          reply,
          company,
          elapsed: Date.now() - openedAt.current,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        setError(result?.error ?? copy.failure);
        setStatus('error');
        return;
      }

      setMessage('');
      setReply('');
      setStatus('sent');
    } catch {
      setError(copy.failure);
      setStatus('error');
    }
  }

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: REVEAL_EASE },
    },
  };

  return (
    <section aria-label="Send an unsigned message" className="mt-20 px-6 md:mt-28 md:px-8">
      <motion.div
        initial={prefersReducedMotion ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={group}
        className="mx-auto max-w-2xl"
      >
        <motion.p
          variants={rise}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-graphite"
        >
          {copy.eyebrow}
        </motion.p>

        <motion.h2
          variants={rise}
          className="mt-6 font-serif-display text-[1.375rem] leading-[1.35] tracking-[-0.01em] text-ink text-balance md:text-[1.75rem]"
        >
          {copy.heading}
        </motion.h2>

        <motion.p
          variants={rise}
          className="mt-5 max-w-[34rem] font-reading text-fluid-read text-graphite text-pretty"
        >
          {copy.line}
        </motion.p>

        {!configured ? (
          /* Not connected. Stated plainly, in the apparatus register, with the
             door that does work named right next to it. */
          <motion.div variants={rise} className="mt-12">
            <span aria-hidden="true" className="block h-px w-7 bg-ink" />
            <p className="mt-6 max-w-[34rem] font-reading text-fluid-read text-graphite text-pretty">
              {copy.unconfigured}{' '}
              <a href={`mailto:${contactInfo.email}`} className="link-rule">
                {contactInfo.email}
              </a>
              .
            </p>
          </motion.div>
        ) : status === 'sent' ? (
          /*
            The form is replaced rather than reset-in-place. A cleared textarea
            with a green tick above it reads as "type another one"; this reads
            as an ending, which is what it is. `role="status"` announces it once
            to a screen reader without stealing focus.
          */
          <motion.div variants={rise} role="status" className="mt-12">
            <span aria-hidden="true" className="block h-px w-7 bg-ink" />
            <p className="mt-6 font-serif-display text-[1.375rem] leading-[1.35] text-ink md:text-[1.75rem]">
              {copy.sentHeading}
            </p>
            <p className="mt-4 max-w-[34rem] font-reading text-fluid-read text-graphite text-pretty">
              {copy.sentLine}
            </p>
            <button
              type="button"
              onClick={() => {
                openedAt.current = Date.now();
                setStatus('idle');
              }}
              className="link-rule group mt-8 font-mono text-[11px] uppercase tracking-[0.08em] text-graphite"
            >
              {copy.again}
              <span
                aria-hidden="true"
                className={`ml-2 inline-block group-hover:translate-x-[3px] ${SWEEP}`}
              >
                &rarr;
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.form variants={rise} onSubmit={onSubmit} className="mt-12" noValidate>
            {/*
              The honeypot. Off-screen rather than display:none, out of the tab
              order, hidden from assistive technology, and with autocomplete
              off so a browser never helpfully fills it in on a real person's
              behalf — which would silently discard their message.
            */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
              <label htmlFor="unsigned-company">Company</label>
              <input
                id="unsigned-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </div>

            <Ruled>
              <label htmlFor="unsigned-message" className={FIELD_LABEL}>
                {copy.messageLabel}
              </label>
              <textarea
                ref={textarea}
                id="unsigned-message"
                name="message"
                required
                rows={4}
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={copy.messagePlaceholder}
                className={`${FIELD_CONTROL} border-0 min-h-[7.5rem] overflow-hidden`}
              />
              {/*
                The count appears only near the ceiling. A live counter from
                zero turns writing into a budget, and this is the one form on
                the site where the reader should feel unhurried.
              */}
              {remaining < COUNT_FROM ? (
                <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-graphite">
                  {remaining} left
                </p>
              ) : null}
            </Ruled>

            <div className="mt-10">
              <Ruled>
                <label htmlFor="unsigned-reply" className={FIELD_LABEL}>
                  {copy.replyLabel}{' '}
                  <span className="text-graphite/70">— optional</span>
                </label>
                {/*
                  The one field that needs an edge of its own. The textarea
                  above has enough mass to read as a place to type; a single
                  empty line with a rule only above it and a paragraph of hint
                  below it reads as a gap between two bits of text — verified
                  in a screenshot, where the field was genuinely invisible.

                  So: a hairline under this control alone, resolving to ink on
                  focus. The placeholder does the rest, and it names what could
                  go there rather than repeating the label.
                */}
                <input
                  id="unsigned-reply"
                  name="reply"
                  type="text"
                  inputMode="email"
                  autoComplete="off"
                  maxLength={200}
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  aria-describedby="unsigned-reply-hint"
                  placeholder="An email, or anything that reaches you."
                  className={`${FIELD_CONTROL} border-x-0 border-t-0 border-b border-hairline pb-2 transition-colors duration-500 focus:border-ink motion-reduce:transition-none`}
                />
                <p
                  id="unsigned-reply-hint"
                  className="mt-4 max-w-[30rem] font-reading text-fluid-aside text-graphite text-pretty"
                >
                  {copy.replyHint}
                </p>
              </Ruled>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <button
                type="submit"
                disabled={!canSend}
                className="link-rule group font-mono text-[11px] uppercase tracking-[0.08em] text-ink disabled:cursor-not-allowed disabled:text-graphite/50"
              >
                {status === 'sending' ? copy.sending : copy.action}
                <span
                  aria-hidden="true"
                  className={`ml-2 inline-block ${
                    status === 'sending'
                      ? 'pulse-soft'
                      : `group-hover:translate-x-[3px] ${SWEEP}`
                  }`}
                >
                  {status === 'sending' ? '·  ·  ·' : '→'}
                </span>
              </button>

              {/*
                Errors are stated, not styled red-on-pink. There is no error
                colour in this design system — cobalt is spoken for on /now —
                and a sentence in ink that says what happened is more useful
                than a colour the reader has to interpret.
              */}
              <p
                role="alert"
                aria-live="polite"
                className="max-w-[26rem] font-reading text-fluid-aside text-ink text-pretty"
              >
                {status === 'error' ? error : ''}
              </p>
            </div>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
}
