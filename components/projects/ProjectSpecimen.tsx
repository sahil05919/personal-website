/**
 * Specimens — the two money apps, drawn with sample figures.
 *
 * October 2026. The real apps read Sahil's own Google Sheets and sit behind a
 * login, so a screenshot of either would publish his finances. These are not
 * screenshots. Each is the app's key screen set again in the book's own type,
 * with figures that are invented and say so in the caption — and that add up,
 * because a specimen of a money tool whose sums don't close would be the one
 * thing on the page that lies.
 *
 *   UK money     spent 612.40 = 450 + 86.20 + 41 + 22 + 13.20 + 0
 *                left 387.60 over 18 days = 21.53 a day
 *   India money  net worth 12.40 L = 2.30 + 2.80 + 3.60 + 3.20 + 0.50
 *                within 3 working days = 2.30 + 2.80 = 5.10 L
 *                by year: now 5.60 (2.30 + 2.80 + 0.50), 2027 3.60, 2029 1.40,
 *                2031 1.80  → 12.40
 *
 * Set as figures, not as UI: no hover, no buttons that look pressable, nothing
 * a reader might try to use.
 */

export type SpecimenKind = "uk-money" | "india-money";

function Frame({
  title,
  meta,
  caption,
  children,
}: {
  title: string;
  meta: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-14 sm:my-16">
      <div className="overflow-hidden rounded-[3px] border border-hairline bg-paper shadow-[0_30px_60px_-40px_rgb(var(--ink)/0.35)]">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3 sm:px-6">
          <span className="font-serif-display text-[15px] text-ink">{title}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
            {meta}
          </span>
        </div>
        <div className="px-5 py-6 sm:px-6 sm:py-7">{children}</div>
      </div>
      <figcaption className="mt-4 font-mono text-[11px] leading-[1.7] tracking-[0.06em] text-graphite">
        {caption}
      </figcaption>
    </figure>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
      {children}
    </p>
  );
}

function Bar({ fraction, strong }: { fraction: number; strong?: boolean }) {
  return (
    <span className="relative block h-[3px] w-full bg-hairline/70">
      <span
        className={`absolute inset-y-0 left-0 ${strong ? "bg-through-line" : "bg-ink/70"}`}
        style={{ width: `${Math.min(1, fraction) * 100}%` }}
      />
    </span>
  );
}

function UkMoney() {
  const categories: [string, number, number][] = [
    ["Rent", 450, 450],
    ["Food", 86.2, 150],
    ["Travel", 41, 80],
    ["Tiffin", 22, 60],
    ["Other", 13.2, 60],
    ["Mobile", 0, 15],
  ];
  const gbp = (n: number, dp = 2) =>
    `£${n.toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;

  return (
    <Frame
      title="UK money"
      meta="October"
      caption="Sample figures, not mine. The real page reads my own sheet and opens only for me."
    >
      <div className="grid gap-8 sm:grid-cols-[1fr_1.4fr] sm:gap-10">
        <div>
          <Label>Savings</Label>
          <p className="mt-2 font-serif-display text-[2.25rem] leading-none tracking-[-0.02em] text-ink">
            {gbp(4200)}
          </p>
        </div>
        <div>
          <Label>Spent in October</Label>
          <p className="mt-2 font-serif-display text-[1.75rem] leading-none tracking-[-0.02em] text-ink">
            {gbp(612.4)}
            <span className="text-graphite"> of {gbp(1000)}</span>
          </p>
          <div className="mt-4">
            <Bar fraction={0.6124} strong />
          </div>
          <p className="mt-3 font-reading text-[0.95rem] leading-[1.5] text-ink">
            <span className="text-through-line">{gbp(387.6)} left.</span>{" "}
            <span className="text-graphite">18 days to go, about {gbp(21.53)} a day.</span>
          </p>
        </div>
      </div>

      <div className="mt-9 grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:gap-10">
        <div>
          <Label>By category</Label>
          <ul className="mt-3">
            {categories.map(([name, spent, budget]) => (
              <li
                key={name}
                className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 border-b border-hairline/70 py-2 last:border-b-0"
              >
                <span className="font-reading text-[0.9rem] text-ink">{name}</span>
                <Bar fraction={budget ? spent / budget : 0} />
                <span className="font-mono text-[11px] tabular-nums text-ink">
                  {gbp(spent)}
                  <span className="text-graphite"> / {gbp(budget, 0)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>Owed to you</Label>
          <ul className="mt-3 font-mono text-[11px] tabular-nums">
            <li className="flex justify-between border-b border-hairline/70 py-2">
              <span className="font-reading text-[0.9rem] text-ink">A friend</span>
              <span className="text-ink">{gbp(40)}</span>
            </li>
            <li className="flex justify-between border-b border-hairline/70 py-2">
              <span className="font-reading text-[0.9rem] text-ink">Another</span>
              <span className="text-ink">{gbp(25)}</span>
            </li>
            <li className="flex justify-between py-2">
              <span className="uppercase tracking-[0.14em] text-graphite">Total</span>
              <span className="text-ink">{gbp(65)}</span>
            </li>
          </ul>
        </div>
      </div>
    </Frame>
  );
}

function IndiaMoney() {
  const tiers: [string, number, string][] = [
    ["Savings", 2.3, "Instant"],
    ["Funds & shares", 2.8, "Sell, 1–3 working days"],
    ["Fixed deposits", 3.6, "Break early, small penalty"],
    ["Locked", 3.2, "Gold bond, ULIPs, NPS"],
    ["Owed to you", 0.5, "When friends repay"],
  ];
  const years: [string, number][] = [
    ["Now", 5.6],
    ["2027", 3.6],
    ["2028", 0],
    ["2029", 1.4],
    ["2030", 0],
    ["2031", 1.8],
  ];
  const max = Math.max(...years.map((y) => y[1]));
  const lakh = (n: number) => `₹${n.toFixed(2)} L`;

  return (
    <Frame
      title="India money"
      meta="Net worth"
      caption="Sample figures, not mine. The real page reads my own sheet and opens only for me."
    >
      <p className="font-serif-display text-[2.75rem] leading-none tracking-[-0.03em] text-ink">
        ₹12.40<span className="text-[0.55em] text-graphite"> lakh</span>
      </p>
      <p className="mt-3 max-w-[40ch] font-reading text-[0.95rem] leading-[1.5] text-graphite">
        <span className="text-through-line">₹5.10 L</span> of it you can have in your
        account within 3 working days.
      </p>

      <ul className="mt-7 border-t border-hairline">
        {tiers.map(([name, value, how], i) => (
          <li
            key={name}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-hairline/70 py-2.5 sm:grid-cols-[9rem_1fr_auto]"
          >
            <span className="font-reading text-[0.95rem] text-ink">{name}</span>
            <span className="order-3 col-span-2 font-mono text-[10px] uppercase tracking-[0.1em] text-graphite sm:order-none sm:col-span-1">
              {how}
            </span>
            <span
              className={`font-mono text-[12px] tabular-nums ${i < 2 ? "text-through-line" : "text-ink"}`}
            >
              {lakh(value)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-9 grid gap-8 sm:grid-cols-2 sm:gap-10">
        <div>
          <Label>If I need ₹1,50,000</Label>
          <ul className="mt-3 font-mono text-[11px] tabular-nums">
            <li className="flex justify-between border-b border-hairline/70 py-2">
              <span className="font-reading text-[0.9rem] text-ink">Savings</span>
              <span className="text-through-line">₹1,50,000</span>
            </li>
            <li className="flex justify-between border-b border-hairline/70 py-2">
              <span className="font-reading text-[0.9rem] text-ink">Sell funds or shares</span>
              <span className="text-graphite">₹0</span>
            </li>
            <li className="flex justify-between border-b border-hairline/70 py-2">
              <span className="font-reading text-[0.9rem] text-ink">Break an FD</span>
              <span className="text-graphite">₹0</span>
            </li>
          </ul>
          <p className="mt-3 font-reading text-[0.95rem] text-ink">Covered by savings alone.</p>
        </div>
        <div>
          <Label>When locked money frees up</Label>
          <div className="mt-4 flex h-28 items-end gap-3" aria-hidden="true">
            {years.map(([y, v]) => (
              <div key={y} className="flex flex-1 flex-col items-center gap-2">
                <span
                  className={`w-full ${y === "Now" ? "bg-through-line" : "bg-ink/60"}`}
                  style={{ height: v ? `${(v / max) * 80}px` : "1px", opacity: v ? 1 : 0.35 }}
                />
                <span className="font-mono text-[9px] tabular-nums text-graphite">{y}</span>
              </div>
            ))}
          </div>
          <p className="sr-only">
            By year: now ₹5.60 L, 2027 ₹3.60 L, 2029 ₹1.40 L, 2031 ₹1.80 L.
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function ProjectSpecimen({ kind }: { kind: SpecimenKind }) {
  return kind === "uk-money" ? <UkMoney /> : <IndiaMoney />;
}
