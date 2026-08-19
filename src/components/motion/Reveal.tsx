import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { E_EXPO, T_SLOW } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/** SECTION 4.2 — y:28→0 · opacity 0→1 · blur(8px)→0 · T_SLOW · E_EXPO · once at -10%. */
export default function Reveal({ children, delay = 0, className, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ y, opacity: 0, filter: "blur(8px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: T_SLOW, ease: E_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
