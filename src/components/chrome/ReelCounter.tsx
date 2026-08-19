import { AnimatePresence, motion, useScroll } from "framer-motion";
import { SECTION_IDS, type SectionId } from "../../lib/content";
import { E_EXPO } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/** SECTION 3.4 — fixed right-middle reel counter "01 / 07" + progress line. */
export default function ReelCounter({ active }: { active: SectionId }) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const idx = Math.max(0, SECTION_IDS.indexOf(active));
  const current = String(idx).padStart(2, "0");

  return (
    <div
      aria-hidden="true"
      className="fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      <div className="flex flex-col items-center font-mono text-[11px] leading-none tracking-[0.2em]">
        <span className="relative block h-4 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={current}
              initial={reduced ? false : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: E_EXPO }}
              className="block text-accent"
            >
              {current}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="mt-1.5 text-muted">/ 07</span>
      </div>
      <div className="h-28 w-[2px] overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full w-full origin-top rounded-full bg-accent"
          style={{ scaleY: reduced ? idx / 7 : scrollYProgress }}
        />
      </div>
    </div>
  );
}
