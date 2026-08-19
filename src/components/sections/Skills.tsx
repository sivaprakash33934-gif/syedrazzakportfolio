import { motion } from "framer-motion";
import SectionShell from "../ui/SectionShell";
import ScrambleText from "../motion/ScrambleText";
import GlowHeading from "../motion/GlowHeading";
import Marquee from "../motion/Marquee";
import Chip from "../ui/Chip";
import { CONTENT } from "../../lib/content";
import { E_EXPO, staggerParent, viewportOnce } from "../../lib/motion";

/** Software proficiency bar — fills on in-view. */
function SkillBar({ name, code, level, index }: { name: string; code: string; level: number; index: number }) {
  return (
    <div className="group">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-ink/90">
          {name} <span className="ml-1 font-mono text-[10px] tracking-[0.2em] text-muted">({code})</span>
        </span>
        <span className="font-mono text-xs font-semibold text-accent">{level}%</span>
      </div>
      <div className="h-[3px] overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${level}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: E_EXPO, delay: index * 0.09 }}
          className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent shadow-glow-amber"
        />
      </div>
    </div>
  );
}

/** CARD 02 — SKILLS & ARSENAL */
export default function Skills() {
  return (
    <SectionShell id="skills">
      <header className="flex items-start justify-between gap-6">
        <div>
          <ScrambleText text="SKILLS · ARSENAL" className="kicker" />
          <GlowHeading className="mt-3">
            <h2
              className="font-display leading-none tracking-[0.01em] text-ink"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              TECHNICAL SKILLS
            </h2>
          </GlowHeading>
        </div>
        <span aria-hidden="true" className="text-outline select-none font-display text-6xl leading-none lg:text-7xl">
          02
        </span>
      </header>

      <div className="mt-7 grid min-h-0 flex-1 gap-9 lg:mt-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="kicker mb-5">Software rack</p>
          <div className="space-y-5 lg:space-y-6">
            {CONTENT.skillBars.map((s, i) => (
              <SkillBar key={s.code} name={s.name} code={s.code} level={s.level} index={i} />
            ))}
          </div>
        </div>

        <div>
          <p className="kicker mb-5">Core competencies — 14</p>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerParent(0.045)}
            className="flex flex-wrap gap-2"
          >
            {CONTENT.services.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </motion.ul>
        </div>
      </div>

      <Marquee items={CONTENT.marqueeItems} className="mt-7 border-t border-line pt-5 lg:mt-8" />
    </SectionShell>
  );
}
