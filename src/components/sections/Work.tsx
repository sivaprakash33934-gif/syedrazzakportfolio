import { motion } from "framer-motion";
import SectionShell from "../ui/SectionShell";
import ScrambleText from "../motion/ScrambleText";
import GlowHeading from "../motion/GlowHeading";
import { PlayIcon } from "../ui/icons";
import { CONTENT } from "../../lib/content";
import { fadeItem, staggerParent, viewportOnce } from "../../lib/motion";

/**
 * CARD 06 — SELECTED FRAMES.
 * Placeholder grid — replace src in lib/content.ts with real photos /
 * showreel stills. Hover runs the signature grayscale→color grade sweep.
 */
export default function Work() {
  return (
    <SectionShell id="work">
      <header className="flex items-start justify-between gap-6">
        <div>
          <ScrambleText text="THE · ARCHIVE" className="kicker" />
          <GlowHeading className="mt-3">
            <h2
              className="font-display leading-none tracking-[0.01em] text-ink"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              SELECTED FRAMES
            </h2>
          </GlowHeading>
        </div>
        <span aria-hidden="true" className="text-outline select-none font-display text-6xl leading-none lg:text-7xl">
          06
        </span>
      </header>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerParent(0.07, 0.1)}
        className="mt-5 grid min-h-0 flex-1 grid-cols-2 gap-3 lg:mt-7 lg:grid-cols-3 lg:grid-rows-2"
      >
        {CONTENT.workSlots.map((slot) => (
          <motion.article
            key={slot.tag}
            variants={fadeItem}
            data-cursor={slot.cursor}
            className="group relative aspect-[4/3] min-h-0 overflow-hidden rounded-[16px] border border-line bg-void lg:aspect-auto lg:h-full"
          >
            {/* [CLIENT IMAGE SLOT] */}
            <img
              src={slot.src}
              alt={slot.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,scale] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            {/* color-grade sweep */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(255,122,26,0.16)] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(5,5,5,0.85)] to-transparent"
            />
            <span className="absolute left-3 top-3 rounded-full border border-line bg-[rgba(5,5,5,0.6)] px-2.5 py-1 font-mono text-[9px] tracking-[0.25em] text-accent-soft">
              {slot.tag}
            </span>
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
              <span className="font-display text-[13px] tracking-[0.1em] text-ink">{slot.label.toUpperCase()}</span>
              {slot.cursor === "play" ? (
                <PlayIcon size={14} className="shrink-0 text-accent" />
              ) : (
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/50 transition-colors duration-300 group-hover:bg-accent" />
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
