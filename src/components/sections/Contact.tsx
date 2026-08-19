import { AnimatePresence, motion } from "framer-motion";
import SectionShell from "../ui/SectionShell";
import ScrambleText from "../motion/ScrambleText";
import GlowHeading from "../motion/GlowHeading";
import Aperture from "../chrome/Aperture";
import Button from "../ui/Button";
import { CheckIcon, CopyIcon, MailIcon, PinIcon, WhatsAppIcon } from "../ui/icons";
import { CONTENT } from "../../lib/content";
import { useCopy } from "../../hooks/useCopy";
import { E_EXPO } from "../../lib/motion";

function CopyRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${label.toLowerCase()}: ${value}`}
      className="group -mx-3 flex w-full items-center justify-between gap-4 rounded-xl border-t border-line px-3 py-4 text-left transition-colors duration-300 first:border-t-0 hover:bg-card-glass lg:py-5"
    >
      <span className="min-w-0">
        <span className="kicker mb-1 block">{label}</span>
        <span
          className={`block truncate font-mono text-sm transition-colors duration-300 ${
            copied ? "text-jade" : "text-ink group-hover:text-accent-soft"
          }`}
        >
          {value}
        </span>
      </span>
      <span className="shrink-0 text-muted transition-colors duration-300 group-hover:text-accent">
        {copied ? <CheckIcon className="text-jade" /> : <CopyIcon />}
      </span>
    </button>
  );
}

/** CARD 07 — CONTACT / END TITLES */
export default function Contact() {
  const { copiedKey, copy } = useCopy();
  const { email, phones, address, whatsapp } = CONTENT.contact;

  return (
    <SectionShell id="contact" last>
      <div className="grid min-h-0 flex-1 gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* left — final cut */}
        <div className="flex flex-col">
          <ScrambleText text="FINAL CUT" className="kicker" />
          <GlowHeading className="mt-3">
            <h2
              className="font-display leading-[0.98] tracking-[0.01em] text-ink"
              style={{ fontSize: "clamp(2.3rem, 5.5vw, 4.4rem)" }}
            >
              LET'S CREATE
              <br />
              TOGETHER
            </h2>
          </GlowHeading>

          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Photographs, films, grades and design — if it frames a story, I'm in. Currently open to freelance
            projects from {CONTENT.identity.location}.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Button href={`mailto:${email}`}>
              <MailIcon /> Mail Me
            </Button>
            <Button variant="outline" href={whatsapp} external>
              <WhatsAppIcon /> WhatsApp
            </Button>
          </div>

          <div className="mt-8">
            <p className="kicker mb-3">Languages</p>
            <div className="flex flex-wrap gap-2">
              {CONTENT.languages.map((l) => (
                <span
                  key={l.code}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-ink/75 transition-colors duration-300 hover:border-accent hover:text-ink"
                >
                  {l.code} · {l.name}
                </span>
              ))}
            </div>
          </div>

          {/* TODO: add real social handles — placeholders only, never fabricate */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {CONTENT.socials.map((s) => (
              <span key={s.name} title="Link coming soon" className="font-mono text-[10px] tracking-[0.25em] text-muted/70">
                {s.name.toUpperCase()} — SOON
              </span>
            ))}
          </div>
        </div>

        {/* right — copy rows + address */}
        <div className="flex flex-col justify-center">
          <CopyRow label="Email" value={email} copied={copiedKey === "email"} onCopy={() => copy("email", email)} />
          {phones.map((p, i) => (
            <CopyRow key={p} label={`Phone 0${i + 1}`} value={p} copied={copiedKey === p} onCopy={() => copy(p, p)} />
          ))}
          <div className="border-t border-line py-4 lg:py-5">
            <p className="kicker mb-2">Address</p>
            <p className="flex gap-2.5 font-mono text-xs leading-relaxed text-muted">
              <PinIcon className="mt-0.5 shrink-0 text-accent" />
              {address}
            </p>
          </div>
        </div>
      </div>

      {/* end titles */}
      <div className="mt-7 border-t border-line pt-5 text-center">
        <Aperture size={32} className="mx-auto mb-3 opacity-90" />
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted">{CONTENT.endFrame}</p>
        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-muted/60">{CONTENT.footer}</p>
      </div>

      {/* copy toast */}
      <AnimatePresence>
        {copiedKey && (
          <motion.div
            key="toast"
            role="status"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: E_EXPO }}
            className="fixed bottom-9 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-accent/40 bg-[rgba(8,8,9,0.92)] px-6 py-2.5 font-mono text-[11px] tracking-[0.3em] text-accent shadow-glow-amber backdrop-blur-sm"
          >
            COPIED ✓
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
