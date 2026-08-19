import SectionShell, { useSectionShell } from "../ui/SectionShell";
import ScrambleText from "../motion/ScrambleText";
import GlowHeading from "../motion/GlowHeading";
import DrawLine from "../motion/DrawLine";
import TimelineEntry from "../ui/TimelineEntry";
import { CONTENT } from "../../lib/content";

/** CARD 03 — THE JOURNEY: scrub-drawn spine + three exact entries. */
export default function Experience() {
  const shell = useSectionShell();

  return (
    <SectionShell id="experience">
      <header className="flex items-start justify-between gap-6">
        <div>
          <ScrambleText text="EXPERIENCE · LOG" className="kicker" />
          <GlowHeading className="mt-3">
            <h2
              className="font-display leading-none tracking-[0.01em] text-ink"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              THE JOURNEY
            </h2>
          </GlowHeading>
        </div>
        <span aria-hidden="true" className="text-outline select-none font-display text-6xl leading-none lg:text-7xl">
          03
        </span>
      </header>

      <div className="relative mt-6 min-h-0 flex-1">
        {/* faint full spine + scrub-drawn accent overlay */}
        <div aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-line" />
        <DrawLine targetRef={shell.ref} className="absolute bottom-2 left-0 top-2 w-px bg-accent/70" />

        <div className="relative lg:space-y-1">
          {CONTENT.experience.map((entry, i) => (
            <TimelineEntry key={entry.company} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
