import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface ShellCtx {
  ref: RefObject<HTMLElement | null>;
  sticky: boolean;
}

const Ctx = createContext<ShellCtx>({ ref: { current: null }, sticky: false });
export const useSectionShell = () => useContext(Ctx);

interface SectionShellProps {
  id: string;
  children: ReactNode;
  /** Final panel — no exit scrub, no oversized wrapper. */
  last?: boolean;
}

/**
 * SECTION 4.3 — STACKED CARD ENGINE (desktop ≥1024px).
 * Wrapper is 175vh so the card pins (sticky top-0 h-screen) while the next
 * card slides over it; the departing card scrubs to scale .92, blur(6px),
 * brightness(.45), radius 24→32. Incoming card rises y 8%→0, scale .96→1.
 * Below 1024px (and on reduced-motion) the stack collapses to normal flow.
 */
export default function SectionShell({ id, children, last = false }: SectionShellProps) {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sticky = isDesktop && !reduced;
  const wrapperRef = useRef<HTMLElement | null>(null);

  const exit = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const enter = useScroll({ target: wrapperRef, offset: ["start end", "start start"] });

  const scaleOut = useTransform(exit.scrollYProgress, [0, 1], [1, 0.92]);
  const blurOut = useTransform(exit.scrollYProgress, [0, 0.55, 1], [0, 0, 6]);
  const brightOut = useTransform(exit.scrollYProgress, [0, 0.55, 1], [1, 1, 0.45]);
  const radiusOut = useTransform(exit.scrollYProgress, [0, 1], [24, 32]);
  const filterOut = useMotionTemplate`blur(${blurOut}px) brightness(${brightOut})`;

  const yIn = useTransform(enter.scrollYProgress, [0, 1], ["8%", "0%"]);
  const scaleIn = useTransform(enter.scrollYProgress, [0, 1], [0.96, 1]);

  const applyStack = sticky && !last;

  return (
    <Ctx.Provider value={{ ref: wrapperRef, sticky }}>
      <section
        id={id}
        data-section={id}
        ref={wrapperRef}
        className={sticky ? (last ? "relative h-screen" : "relative h-[175vh]") : "relative px-5 py-6 sm:px-8"}
      >
        <div
          className={
            sticky
              ? "sticky top-0 flex h-screen items-center justify-center px-5 lg:px-10"
              : "mx-auto w-full max-w-[1200px]"
          }
        >
          <motion.div
            style={applyStack ? { y: yIn, scale: scaleIn } : undefined}
            className={sticky ? "flex h-full w-full items-center justify-center" : undefined}
          >
            <motion.div
              style={applyStack ? { scale: scaleOut, filter: filterOut, borderRadius: radiusOut } : undefined}
              className={`relative flex w-full max-w-[1200px] flex-col overflow-hidden border border-line bg-card shadow-card ${
                sticky ? "h-[min(84vh,780px)] rounded-card" : "min-h-[420px] rounded-card"
              }`}
            >
              {/* top inner highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[28%]"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent)" }}
              />
              <div className="relative z-10 flex h-full min-h-0 flex-col p-6 md:p-9">{children}</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Ctx.Provider>
  );
}
