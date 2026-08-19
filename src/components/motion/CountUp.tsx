import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { E_CINE } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/** SECTION 4.2 — 0→N over 1.2s E_CINE, mono font, accent suffix. */
export default function CountUp({ value, suffix = "", prefix = "", duration = 1.2, className }: CountUpProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: E_CINE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix ? <span className="text-accent">{suffix}</span> : null}
    </span>
  );
}
