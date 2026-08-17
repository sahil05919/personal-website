/**
 * POST /api/unsigned — the unsigned note.
 *
 * The section on /contact promises the reader three things: nothing stored,
 * nothing logged, no address attached. This file is where that promise is
 * either kept or quietly broken, so it is worth stating what it does:
 *
 *   · It does not write to a database. There isn't one.
 *   · It does not log the message, the reply address, or the IP. The rate
 *     limiter below holds a HASH of the IP in memory and nothing else, and
 *     that memory dies with the serverless instance.
 *   · It forwards the message to one place — whatever `UNSIGNED_ENDPOINT`
 *     points at — and forgets it.
 *
 * If you ever add a `console.log(body)` here for debugging, the page above it
 * starts lying to people. Take it out again.
 *
 * ---------------------------------------------------------------------------
 * CONFIGURATION — two environment variables, both set in Vercel.
 *
 *   UNSIGNED_ENDPOINT    Required. The URL that actually delivers the mail.
 *                        Works with anything that accepts a JSON POST:
 *                          Web3Forms  https://api.web3forms.com/submit
 *                          Formspree  https://formspree.io/f/<your-form-id>
 *
 *   UNSIGNED_ACCESS_KEY  Optional. Sent as `access_key` in the body, which is
 *                        what Web3Forms expects. Formspree doesn't need it —
 *                        leave it unset and it is not sent at all.
 *
 * With UNSIGNED_ENDPOINT unset the section does not render on /contact at all
 * (see app/contact/page.tsx), so this route is never reached in that state.
 * It still refuses politely rather than crashing, because an unset variable in
 * production is exactly when you want a clear answer.
 * ---------------------------------------------------------------------------
 */

/** The note is a note, not an essay. Also the ceiling on what a bot can post. */
const MAX_MESSAGE = 4_000;
const MAX_REPLY = 200;

/**
 * A form filled faster than this was not filled by a person. The client sends
 * how long the form was open; anything under two and a half seconds is a
 * script that found the fields and submitted them.
 */
const MIN_ELAPSED_MS = 2_500;

/** Five notes per window, per address. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1_000;

/**
 * In-memory rate limiting, with its limitation stated rather than hidden:
 * serverless instances are per-region and short-lived, so this catches the
 * naive case (one script, one burst, one instance) and does not pretend to be
 * a distributed limiter. The honeypot and the timing check do the rest of the
 * work. If this ever needs to be real, it needs a shared store — and at that
 * point the "nothing stored" promise on /contact has to be rewritten too.
 */
const hits = new Map<string, number[]>();

/**
 * Non-cryptographic hash. The point is not secrecy against an attacker who has
 * the process memory — it is that the raw IP is never held anywhere, not even
 * transiently in a map that something else might one day serialise.
 */
function fingerprint(value: string): string {
  let hash = 2_166_136_261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16_777_619);
  }
  return (hash >>> 0).toString(36);
}

function overRateLimit(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const address = forwarded.split(",")[0]?.trim();
  if (!address) return false;

  const key = fingerprint(address);
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic sweep. Without it the map grows for the life of the
  // instance, which for a warm one is a long time.
  if (hits.size > 500) {
    for (const [otherKey, times] of hits) {
      if (times.every((at) => now - at >= RATE_WINDOW_MS)) hits.delete(otherKey);
    }
  }

  return false;
}

function refuse(status: number, error: string) {
  return Response.json({ ok: false, error }, { status });
}

/**
 * Diagnostics for a failed hand-off, and the line this file will not cross.
 *
 * The promise on /contact is that nothing is stored and nothing is logged.
 * That promise is about the READER: their message, their reply address, their
 * IP. It has never been a promise to run blind — and running blind is exactly
 * what happened the first time delivery failed in production, where the only
 * signal was a visitor-facing "The message could not be delivered." and no way
 * to tell a wrong URL from a rejected key.
 *
 * So: the provider's HTTP status and a short slice of the provider's own
 * response body. Both are the mail service talking about itself. Neither
 * contains a single character the reader typed.
 *
 * If you ever extend this, the test is: could this line reveal who wrote in, or
 * what they said? If yes, it does not go in.
 */
function logDeliveryFailure(detail: string) {
  console.error(`[unsigned] delivery failed — ${detail}`);
}

export async function POST(request: Request) {
  const endpoint = process.env.UNSIGNED_ENDPOINT;
  if (!endpoint) {
    return refuse(503, "This form is not connected to anything yet.");
  }

  /*
    Validate the endpoint is actually a URL before using it.
    `fetch("some-access-key")` throws a TypeError that lands in the same catch
    as a network failure, so pasting the two environment variables into each
    other's boxes — an easy thing to do, and the first thing to suspect — looked
    identical to the mail provider being down.
  */
  let endpointUrl: URL;
  try {
    endpointUrl = new URL(endpoint);
  } catch {
    logDeliveryFailure(
      "UNSIGNED_ENDPOINT is not a valid absolute URL. It should look like " +
        "https://api.web3forms.com/submit — check the two environment " +
        "variables have not been swapped.",
    );
    return refuse(500, "This form is misconfigured.");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return refuse(400, "That request could not be read.");
  }

  if (typeof payload !== "object" || payload === null) {
    return refuse(400, "That request could not be read.");
  }

  const body = payload as Record<string, unknown>;

  // The honeypot. A field named `company`, hidden from sight and from
  // assistive technology, and left empty by every human being who has ever
  // used this form. Anything that fills it gets a 200 and no delivery —
  // refusing outright tells the script what tripped it.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0;
  if (elapsed < MIN_ELAPSED_MS) {
    return Response.json({ ok: true });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return refuse(400, "The message was empty.");
  }
  if (message.length > MAX_MESSAGE) {
    return refuse(413, "That message is longer than this form accepts.");
  }

  const reply = typeof body.reply === "string" ? body.reply.trim() : "";
  if (reply.length > MAX_REPLY) {
    return refuse(413, "That reply address is longer than this form accepts.");
  }

  if (overRateLimit(request)) {
    return refuse(429, "That's several in a short time. Try again shortly.");
  }

  const accessKey = process.env.UNSIGNED_ACCESS_KEY;

  try {
    const delivery = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...(accessKey ? { access_key: accessKey } : {}),
        subject: reply
          ? "Unsigned note (a reply address was left)"
          : "Unsigned note",
        from_name: "sahilarora.vercel.app",
        message,
        // Only ever sent when the reader typed one. There is no fallback that
        // quietly substitutes something identifying.
        ...(reply ? { reply_to: reply, replyTo: reply, email: reply } : {}),
      }),
      // Without this the request can hang for the whole function timeout and
      // the reader watches a button say "Sending" until it gives up.
      signal: AbortSignal.timeout(10_000),
    });

    if (!delivery.ok) {
      // The provider's own words about its own refusal. Web3Forms returns 400
      // with {"success":false,"message":"..."} for a bad or unverified access
      // key, which is the difference between "your key is wrong" and "the
      // service is down" — and it is not visible anywhere else.
      const said = await delivery.text().catch(() => "");
      logDeliveryFailure(
        `${endpointUrl.host} returned ${delivery.status}. It said: ${said.slice(0, 300)}`,
      );
      return refuse(502, "The message could not be delivered.");
    }
  } catch (error) {
    // Never the error object wholesale — a thrown fetch error can carry the
    // request in some runtimes. Name and message only.
    const name = error instanceof Error ? error.name : "Error";
    const message = error instanceof Error ? error.message : "unknown";
    logDeliveryFailure(
      `request to ${endpointUrl.host} threw ${name}: ${message}`,
    );
    return refuse(502, "The message could not be delivered.");
  }

  return Response.json({ ok: true });
}
