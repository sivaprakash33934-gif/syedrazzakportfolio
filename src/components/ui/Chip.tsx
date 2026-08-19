import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { popItem } from "../../lib/motion";

/** Small competency chip — inherits stagger from parent variants. */
export default function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.li
      variants={popItem}
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-card-glass px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/75 transition-colors duration-300 hover:border-accent/60 hover:text-ink ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden="true" />
      {children}
    </motion.li>
  );
}
