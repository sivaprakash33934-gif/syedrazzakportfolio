import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { E_EXPO } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type CursorMode = "default" | "link" | "view" | "play";

/**
 * SECTION 3.2 — 6px dot + 34px focus ring, lerp .18.
 * Ring scales 1.4 & turns amber over links; shows VIEW / PLAY over media.
 * Pointer:fine only, native cursor hidden via .cursor-none-custom.
 */
export default function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-custom");
    return () => document.documentElement.classList.remove("cursor-none-custom");
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      dotX.set(mx);
      dotY.set(my);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hit = target?.closest?.("a, button, [data-cursor]") as HTMLElement | null;
      if (!hit) {
        setMode("default");
        return;
      }
      const label = hit.getAttribute("data-cursor");
      setMode(label === "view" || label === "play" ? (label as CursorMode) : "link");
    };
    const onLeave = () => setVisible(false);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ringX.set(rx);
      ringY.set(ry);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, dotX, dotY, ringX, ringY]);

  if (!enabled) return null;

  const isMedia = mode === "view" || mode === "play";
  const size = isMedia ? 64 : mode === "link" ? 48 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      <motion.div
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
      />
      <motion.div style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }} className="absolute">
        <motion.div
          animate={{
            width: size,
            height: size,
            backgroundColor: isMedia ? "rgba(5,5,5,0.72)" : "rgba(5,5,5,0)",
            borderColor: mode === "default" ? "rgba(245,242,236,0.42)" : "#ff7a1a",
          }}
          transition={{ duration: 0.28, ease: E_EXPO }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        >
          {isMedia && (
            <span className="font-mono text-[9px] font-semibold tracking-[0.28em] text-accent">
              {mode === "view" ? "VIEW" : "PLAY"}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
