import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface TypewriterProps {
  text: string;
  start: boolean;
  delay?: number;
  /** ms per character (default 28) */
  speed?: number;
  className?: string;
}

/** SECTION 4.2 — 28ms/char with blinking amber caret; full text on reduced-motion. */
export default function Typewriter({ text, start, delay = 0, speed = 28, className }: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    if (!start) return;
    setCount(0);
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            if (interval) clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [start, reduced, text, delay, speed]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span
        aria-hidden="true"
        className="animate-blink ml-2 inline-block h-[0.95em] w-[7px] translate-y-[0.14em] bg-accent"
      />
    </span>
  );
}
