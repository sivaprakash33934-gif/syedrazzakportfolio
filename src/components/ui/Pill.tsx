import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { popItem } from "../../lib/motion";

/** Inherits stagger from a parent with hidden→show variants. */
export default function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      variants={popItem}
      className={`inline-block cursor-default rounded-full border border-line px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-ink ${className}`}
    >
      {children}
    </motion.span>
  );
}
