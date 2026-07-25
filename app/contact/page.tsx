'use client';
import { motion, type Variants } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Send,
  Link,
  Code2,
  Camera,
  MessageCircle,
} from "lucide-react";
import { contactInfo } from '@/data/contactData';
import ClosingSignature from '@/components/contact/ClosingSignature';

const BEYOND_WORK = [
  {
    label: "Professionally",
    width: "max-w-2xl",
    text: "My day-to-day sits at the intersection of business and data — analytics, Power BI, SQL, and Python are the tools I reach for most, alongside a growing interest in how AI is reshaping business strategy. I care as much about personal finance as I do about the spreadsheets I build for other people.",
  },
  {
    label: "Outside of that",
    width: "max-w-xl md:ml-10",
    text: "London is still something I'm exploring — weekend walks, day trips, new coffee shops, and the occasional photograph of something that catches my eye. Travelling further afield is never far from my mind either.",
  },
  {
    label: "Always up for",
    width: "max-w-lg",
    text: "A chess board, a cricket match, or a good discussion about current affairs and economics. I'd rather learn something new than have all the answers — and I'm always glad to meet people who feel the same way.",
  },
];

const rowGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const rowItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-background text-foreground px-6 md:px-24 py-24 select-none">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero — compressed. Reframes the page in one line and gets out
            of the way; contact access stays immediate for anyone who
            came here already knowing why. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-border pb-12"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
            Let&apos;s Connect
          </span>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
            More Than Just Work.
          </h1>

          <p className="mt-6 max-w-2xl text-muted-foreground leading-8 text-base md:text-lg">
            Everything before this page has been about how I think and
            what I&apos;ve built. This part is simply about staying in touch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            {/* Primary CTA — uses the same ink/paper tokens as Hero.tsx's
                "See the work" button, which are proven to render with real
                contrast. bg-primary/text-primary-foreground appear to be a
                stale, uncalibrated token pair left from before the
                Through-Line system — see note to Sahil. Using the known-good
                tokens here rather than the broken ones. */}
            <a
              href={`mailto:${contactInfo.email}?subject=Connecting%20from%20your%20website`}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:opacity-90"
            >
              <Send className="h-4 w-4" />
              Send Email
            </a>

            {/* TODO: replace fileName in contactData.ts and drop the file into
                /public/documents once the final CV is ready. Styling is kept
                identical to the active state so this never reads as disabled. */}
            <a
              href={`/documents/${contactInfo.resume.fileName}`}
              download
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-card px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <Download className="h-4 w-4" />
              Download My CV
            </a>

          </div>
        </motion.div>

        {/* Beyond Work — an editorial numbered index rather than three
            equal cards. Fixed label column, varying paragraph widths,
            hairline dividers, staggered entrance per row. */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={rowGroup}
          className="space-y-0"
        >
          <motion.div variants={rowItem}>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Beyond Work
            </span>

            <h2 className="mt-2 mb-10 text-2xl md:text-3xl font-bold tracking-tight">
              A little more about me.
            </h2>
          </motion.div>

          <div className="border-t border-border">
            {BEYOND_WORK.map((block, i) => (
              <motion.div
                key={block.label}
                variants={rowItem}
                className="grid md:grid-cols-[160px_1fr] gap-3 md:gap-10 py-10 border-b border-border items-baseline"
              >
                <div className="flex items-baseline gap-3 md:block md:space-y-1">
                  <span className="font-mono text-xs text-through-line">
                    0{i + 1}
                  </span>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {block.label}
                  </p>
                </div>

                <p className={`text-muted-foreground leading-8 ${block.width}`}>
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connect — the full channel grid, with location folded in as a
            quiet detail rather than its own bordered section. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Connect With Me
            </span>

            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
              Reach me anytime.
            </h2>

            <p className="mt-3 text-muted-foreground max-w-2xl leading-7">
              Choose whichever platform is most convenient for you. Whether it&apos;s
              a quick message, a professional discussion, or simply saying hello,
              I&apos;m always happy to connect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Email */}
            <a
              href={`mailto:${contactInfo.email}?subject=Connecting%20from%20your%20website`}
              className="group bg-card border border-border rounded-sm p-6 hover:border-primary transition-all duration-300"
            >
              <Mail className="w-6 h-6 mb-5 text-muted-foreground group-hover:text-primary transition-colors" />

              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Email
              </p>

              <h3 className="mt-2 font-semibold">
                {contactInfo.email}
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Best for opportunities, collaborations and longer conversations.
              </p>
            </a>

            {/* Phone */}
            <a
              href={`tel:${contactInfo.phone}`}
              className="group bg-card border border-border rounded-sm p-6 hover:border-primary transition-all duration-300"
            >
              <Phone className="w-6 h-6 mb-5 text-muted-foreground group-hover:text-primary transition-colors" />

              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Phone
              </p>

              <h3 className="mt-2 font-semibold">
                {contactInfo.phone}
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Feel free to give me a call if you&apos;d prefer to speak directly.
              </p>
            </a>

            {/* WhatsApp */}
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-sm p-6 hover:border-primary transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6 mb-5 text-muted-foreground group-hover:text-primary transition-colors" />

              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                WhatsApp
              </p>

              <h3 className="mt-2 font-semibold">
                Quick Chat
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Perfect for quick questions, networking, or staying in touch.
              </p>
            </a>

            {/* Linkedin */}
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-sm p-6 hover:border-primary transition-all duration-300"
            >
              <Link className="w-6 h-6 mb-5 text-muted-foreground group-hover:text-primary transition-colors" />

              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Linkedin
              </p>

              <h3 className="mt-2 font-semibold">
                Professional Network
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Connect with me professionally and follow my career journey.
              </p>
            </a>

            {/* GitHub */}
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-sm p-6 hover:border-primary transition-all duration-300"
            >
              <Code2 className="w-6 h-6 mb-5 text-muted-foreground group-hover:text-primary transition-colors" />

              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                GitHub
              </p>

              <h3 className="mt-2 font-semibold">
                Projects & Code
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Explore my projects, experiments and ongoing technical work.
              </p>
            </a>

            {/* Instagram */}
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-sm p-6 hover:border-primary transition-all duration-300"
            >
              <Camera className="w-6 h-6 mb-5 text-muted-foreground group-hover:text-primary transition-colors" />

              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Instagram
              </p>

              <h3 className="mt-2 font-semibold">
                Life Beyond Work
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Travel, experiences, everyday moments and everything outside my professional life.
              </p>
            </a>

          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>
              Based in {contactInfo.location} — always happy to meet in person.
            </span>
          </div>
        </motion.div>

        {/* Closing — the through-line resolves to a single point here.
            No border, no card, no button. The one deliberate break from
            the bordered-section pattern used everywhere else on this page. */}
        <ClosingSignature />

      </div>
    </section>
  );
}