import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { E_EXPO } from "../../lib/motion";

interface ApertureProps {
  size?: number;
  /** When true the iris starts closed and opens after `openDelay` seconds. */
  autoOpen?: boolean;
  openDelay?: number;
  /** Static open/closed state when autoOpen is false. */
  open?: boolean;
  className?: string;
}

const R = 52;
const WEDGE = `M 0 0 L ${R} 0 A ${R} ${R} 0 0 1 ${R * 0.5} ${R * 0.866} Z`;
const TX = 15 * 0.866;
const TY = 15 * 0.5;

/** Six-blade camera iris — the site's signature glyph. */
export default function Aperture({ size = 120, autoOpen = false, openDelay = 0.4, open = true, className }: ApertureProps) {
  const [opened, setOpened] = useState(!autoOpen ? open : false);

  useEffect(() => {
    if (!autoOpen) {
      setOpened(open);
      return;
    }
    const t = setTimeout(() => setOpened(true), openDelay * 1000);
    return () => clearTimeout(t);
  }, [autoOpen, open, openDelay]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="-60 -60 120 120"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="0" cy="0" r="56" fill="none" stroke="rgba(245,242,236,0.14)" strokeWidth="1.5" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 60})`}>
          <motion.g
            animate={{ x: opened ? TX : 0, y: opened ? TY : 0 }}
            transition={{ duration: 0.7, ease: E_EXPO }}
          >
            <path d={WEDGE} fill="#0c0c0f" stroke="rgba(255,122,26,0.4)" strokeWidth="1" />
          </motion.g>
        </g>
      ))}
      <motion.circle
        cx="0"
        cy="0"
        r="5"
        fill="#ff7a1a"
        animate={{ opacity: opened ? 1 : 0, scale: opened ? 1 : 0.2 }}
        transition={{ duration: 0.5, ease: E_EXPO, delay: opened ? 0.25 : 0 }}
      />
    </svg>
  );
}
