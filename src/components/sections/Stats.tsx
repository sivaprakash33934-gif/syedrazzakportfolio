import SectionShell from "../ui/SectionShell";
import ScrambleText from "../motion/ScrambleText";
import GlowHeading from "../motion/GlowHeading";
import Reveal from "../motion/Reveal";
import StatCard from "../ui/StatCard";
import { CONTENT } from "../../lib/content";

/** CARD 05 — BY THE NUMBERS: 6+ / 3 / 4 / 14 with CountUp. */
export default function Stats() {
  return (
    <SectionShell id="stats">
      <header className="flex items-start justify-between gap-6">
        <div>
          <ScrambleText text="REEL · METRICS" className="kicker" />
          <GlowHeading className="mt-3">
            <h2
              className="font-display leading-none tracking-[0.01em] text-ink"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              BY THE NUMBERS
            </h2>
          </GlowHeading>
        </div>
        <span aria-hidden="true" className="text-outline select-none font-display text-6xl leading-none lg:text-7xl">
          05
        </span>
      </header>

      <div className="flex min-h-0 flex-1 items-center">
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {CONTENT.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <StatCard value={s.value} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
