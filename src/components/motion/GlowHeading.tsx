import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { E_EXPO, T_SLOW } from "../../lib/motion";

interface GlowHeadingProps {
  children: ReactNode;
  className?: string;
}

/** SECTION 4.2 — blur(14px)+brightness(2)→sharp, then one 600ms glow pulse. */
export default function GlowHeading({ children, className }: GlowHeadingProps) {
  const [pulsed, setPulsed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(14px) brightness(2)" }}
      whileInView={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: T_SLOW, ease: E_EXPO }}
      onAnimationComplete={() => setPulsed(true)}
      className={className}
    >
      <span className={`block ${pulsed ? "glow-pulse" : ""}`}>{children}</span>
    </motion.div>
  );
}
