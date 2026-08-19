import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import Aperture from "./Aperture";
import ScrambleText from "../motion/ScrambleText";
import { E_CINE } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * SECTION 5.0 — Opening sequence:
 * 0–400 aperture blades close→open · 400–1200 "LOADING REEL…" scramble +
 * frame counter 000→024 · 1200–1400 shutter flash · 1400–1600 letterbox
 * bars retract, hero timeline begins. Instant on prefers-reduced-motion.
 */
export default function Preloader({ onHandoff }: { onHandoff: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState<"boot" | "bars" | "done">("boot");
  const [frame, setFrame] = useState(0);
  const handoffRef = useRef(onHandoff);
  handoffRef.current = onHandoff;

  useEffect(() => {
    if (reduced) {
      handoffRef.current();
      setStage("done");
      return;
    }
    const t1 = setTimeout(() => {
      setStage("bars");
      handoffRef.current();
    }, 1400);
    const t2 = setTimeout(() => setStage("done"), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, 24, {
      delay: 0.4,
      duration: 0.8,
      ease: E_CINE,
      onUpdate: (v) => setFrame(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduced]);

  if (stage === "done") return null;

  const barsOut = stage === "bars";

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-7 bg-void">
      {/* letterbox bars */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[9vh] bg-[#060607]"
        animate={{ y: barsOut ? "-102%" : "0%" }}
        transition={{ duration: 0.32, ease: E_CINE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[9vh] bg-[#060607]"
        animate={{ y: barsOut ? "102%" : "0%" }}
        transition={{ duration: 0.32, ease: E_CINE }}
      />

      <Aperture size={118} autoOpen openDelay={0.35} />

      <ScrambleText text="LOADING REEL…" className="font-mono text-xs tracking-[0.45em] text-ink/80" />

      <motion.p
        className="font-mono text-[11px] tracking-[0.3em] text-muted"
        animate={{ opacity: [0.35, 1, 0.5, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        FRM {String(frame).padStart(3, "0")} / 024
      </motion.p>

      {/* shutter flash — two frames at ~1200ms */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.09, 0] }}
        transition={{ duration: 1.6, times: [0, 0.74, 0.78, 0.84] }}
      />
    </div>
  );
}
