import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { E_EXPO, STAGGER, T_SLOW } from "../../lib/motion";

interface MaskLinesProps {
  lines: ReactNode[];
  baseDelay?: number;
  className?: string;
  lineClassName?: string;
}

/** SECTION 4.2 — per-line overflow masks, inner y:110%→0, stagger .08. */
export default function MaskLines({ lines, baseDelay = 0, className, lineClassName }: MaskLinesProps) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className={`overflow-hidden py-[3px] ${lineClassName ?? ""}`}>
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: T_SLOW, ease: E_EXPO, delay: baseDelay + i * STAGGER }}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
