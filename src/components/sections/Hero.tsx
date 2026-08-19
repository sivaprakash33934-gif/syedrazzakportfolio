import { motion } from "framer-motion";
import { CONTENT } from "../../lib/content";
import { E_CINE, E_EXPO, LETTER_STAGGER, PILL_STAGGER, SPRING, T_EPIC, staggerParent } from "../../lib/motion";
import Typewriter from "../motion/Typewriter";
import Pill from "../ui/Pill";
import Button from "../ui/Button";
import { ArrowRightIcon } from "../ui/icons";
import { scrollToId } from "../../lib/lenis";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/** SECTION 5.1 — opening sequence: badge → name letters → role typewriter →
 *  software pills → buttons; portrait clip-reveals B&W→color under a
 *  self-drawing viewfinder HUD. */

function HudStrokes({ ready, reduced }: { ready: boolean; reduced: boolean }) {
  const t = { duration: reduced ? 0 : 0.6, ease: E_EXPO, delay: 0.9 };
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {[
        "M2 11 V2 H11",
        "M89 2 H98 V11",
        "M98 89 V98 H89",
        "M11 98 H2 V89",
        "M50 46.5 V53.5 M46.5 50 H53.5",
      ].map((d) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="rgba(245,242,236,0.6)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={ready ? { pathLength: 1, opacity: 1 } : undefined}
          transition={t}
        />
      ))}
    </svg>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion();
  const d = (s: number) => (reduced ? 0 : s);
  const lines = CONTENT.identity.heroNameLines;
  let letterIndex = 0;

  return (
    <section
      id="top"
      data-section="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-24"
    >
      {/* faint dark-shelf gradient, right side */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[52%]"
        style={{ background: "linear-gradient(270deg, rgba(21,17,12,0.9), rgba(21,17,12,0.35) 55%, transparent)" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-14 px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:px-10">
        {/* ── LEFT: type column ── */}
        <div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={ready ? { scale: 1, opacity: 1 } : undefined}
            transition={{ ...SPRING, delay: reduced ? 0 : 0.05 }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card-glass px-4 py-2 font-mono text-[10px] tracking-[0.3em] text-ink/85">
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-jade" aria-hidden="true" />
              {CONTENT.identity.statusBadge}
            </span>
          </motion.div>

          <h1
            className="hero-name mt-7 font-display leading-[0.95] text-ink transition-[text-shadow] duration-500"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9.5rem)", letterSpacing: "0.01em" }}
          >
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                {line.split("").map((ch, ci) => {
                  const idx = letterIndex;
                  letterIndex += 1;
                  return (
                    <motion.span
                      key={`${line}-${ci}`}
                      className="inline-block will-change-transform"
                      initial={{ y: "110%", rotate: 6, filter: "blur(12px)" }}
                      animate={ready ? { y: "0%", rotate: 0, filter: "blur(0px)" } : undefined}
                      transition={{ duration: d(0.9), ease: E_EXPO, delay: reduced ? 0 : 0.1 + idx * LETTER_STAGGER }}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <Typewriter
            text={CONTENT.identity.roleLine}
            start={ready}
            delay={reduced ? 0 : 0.7}
            className="mt-6 block font-mono text-[10px] tracking-[0.24em] text-accent-soft sm:text-[11px] md:text-xs md:tracking-[0.3em]"
          />

          <motion.div
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            variants={staggerParent(PILL_STAGGER, reduced ? 0 : 1.2)}
            className="mt-8 flex flex-wrap gap-2.5"
            aria-label="Software"
          >
            {CONTENT.heroPills.map((p) => (
              <Pill key={p}>{p}</Pill>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={ready ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: d(0.7), ease: E_EXPO, delay: reduced ? 0 : 1.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button onClick={() => scrollToId("#work")}>
              View Work <ArrowRightIcon />
            </Button>
            <Button variant="outline" onClick={() => scrollToId("#contact")}>
              Contact Me
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 1.9 }}
            className="mt-9 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
          >
            {CONTENT.identity.fullName} — {CONTENT.identity.location}
          </motion.p>
        </div>

        {/* ── RIGHT: portrait under viewfinder HUD ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: reduced ? 0.2 : 0.4 }}
          className="relative mx-auto w-full max-w-[430px] lg:max-w-[470px]"
        >
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={ready ? { clipPath: "inset(0 0 0% 0)" } : undefined}
            transition={{ duration: reduced ? 0 : T_EPIC, ease: E_CINE, delay: reduced ? 0 : 0.3 }}
            className="relative overflow-hidden rounded-card border border-line shadow-card"
          >
            {/* the signature move: B&W → color */}
            <motion.img
              src={CONTENT.portrait.src}
              alt={CONTENT.portrait.alt}
              loading="eager"
              decoding="async"
              initial={{ filter: "grayscale(1)", scale: 1.06 }}
              animate={ready ? { filter: "grayscale(0)", scale: 1 } : undefined}
              transition={{
                filter: { duration: reduced ? 0 : 1.2, ease: "easeOut", delay: reduced ? 0 : 0.6 },
                scale: { duration: reduced ? 0 : 4.5, ease: E_EXPO, delay: reduced ? 0 : 0.3 },
              }}
              className="block aspect-[4/5] w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(5,5,5,0.85)] to-transparent"
            />
            <div className="absolute left-4 top-3.5 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-ink/90">
              <span className="animate-blink h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              REC
            </div>
            <div className="absolute right-4 top-3.5 font-mono text-[10px] tracking-[0.25em] text-ink/60">
              A001_C012
            </div>
            <div className="absolute inset-x-4 bottom-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-ink/85">
              <span>ISO 800 · f/2.8 · 24fps</span>
              <span className="text-accent-soft">{CONTENT.identity.location.toUpperCase()}</span>
            </div>
            <HudStrokes ready={ready} reduced={reduced} />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 2.1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-muted">SCROLL TO ROLL</span>
        <span className="animate-drop-line block h-9 w-px bg-accent" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
