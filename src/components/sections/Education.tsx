import SectionShell from "../ui/SectionShell";
import ScrambleText from "../motion/ScrambleText";
import GlowHeading from "../motion/GlowHeading";
import Reveal from "../motion/Reveal";
import { CONTENT } from "../../lib/content";

/** CARD 04 — EDUCATION: reference-style rows, 120ms stagger. */
export default function Education() {
  return (
    <SectionShell id="education">
      <header className="flex items-start justify-between gap-6">
        <div>
          <ScrambleText text="ACADEMIC · RECORD" className="kicker" />
          <GlowHeading className="mt-3">
            <h2
              className="font-display leading-none tracking-[0.01em] text-ink"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              EDUCATION
            </h2>
          </GlowHeading>
        </div>
        <span aria-hidden="true" className="text-outline select-none font-display text-6xl leading-none lg:text-7xl">
          04
        </span>
      </header>

      <div className="mt-6 flex min-h-0 flex-1 flex-col justify-center lg:mt-8">
        {CONTENT.education.map((e, i) => (
          <Reveal key={e.period} delay={i * 0.12}>
            <div className="group grid gap-1 border-b border-line py-5 transition-colors duration-300 last:border-0 hover:bg-card-glass md:grid-cols-[150px_1fr_auto] md:items-baseline md:gap-6 lg:py-6">
              <span className="font-mono text-[11px] font-semibold tracking-[0.22em] text-accent">{e.period}</span>
              <p className="max-w-[52ch] text-[15px] font-semibold leading-snug text-ink">{e.degree}</p>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 group-hover:text-ink/70 md:text-right">
                {e.institution}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
