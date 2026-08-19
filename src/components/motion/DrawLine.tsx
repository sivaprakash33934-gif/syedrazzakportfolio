import { useRef, type RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface DrawLineProps {
  className?: string;
  /** Scroll target to scrub against (defaults to the line itself). */
  targetRef?: RefObject<HTMLElement | null>;
  /** Progress input range mapped to scaleY 0→1. */
  range?: [number, number];
}

/** SECTION 4.2 — scaleY 0→1 scrub-linked spine. */
export default function DrawLine({ className, targetRef, range = [0.18, 0.62] }: DrawLineProps) {
  const reduced = usePrefersReducedMotion();
  const ownRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: (targetRef ?? ownRef) as RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const scaleY = useTransform(scrollYProgress, range, [0, 1]);

  return (
    <motion.div
      ref={ownRef}
      className={className}
      style={{ scaleY: reduced ? 1 : scaleY, transformOrigin: "top" }}
    />
  );
}
