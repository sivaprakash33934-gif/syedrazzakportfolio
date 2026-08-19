import SectionShell from "../ui/SectionShell";
import ScrambleText from "../motion/ScrambleText";
import GlowHeading from "../motion/GlowHeading";
import MaskLines from "../motion/MaskLines";
import Pill from "../ui/Pill";
import { motion } from "framer-motion";
import { CONTENT } from "../../lib/content";
import { staggerParent, viewportOnce } from "../../lib/motion";

/** CARD 01 — WHO I AM */
export default function About() {
  return (
    <SectionShell id="about">
      <header className="flex items-start justify-between gap-6">
        <div>
          <ScrambleText text="ABOUT · PROFILE" className="kicker" />
          <GlowHeading className="mt-3">
            <h2
              className="font-display leading-none tracking-[0.01em] text-ink"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              WHO I AM
            </h2>
          </GlowHeading>
        </div>
        <span aria-hidden="true" className="text-outline select-none font-display text-6xl leading-none lg:text-7xl">
          01
        </span>
      </header>

      <MaskLines
        className="mt-7 max-w-[70ch] text-[15px] leading-[1.7] text-ink/85 lg:mt-9 lg:text-[17px]"
        lines={CONTENT.aboutLines.map((segments) =>
          segments.map((s, i) => (
            <span key={i} className={s.hl ? "font-semibold text-accent" : undefined}>
              {s.text}
            </span>
          )),
        )}
      />

      <div className="mt-auto pt-8">
        <p className="kicker mb-4">Signature services</p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerParent(0.06)}
          className="flex flex-wrap gap-2.5"
        >
          {CONTENT.aboutPills.map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
