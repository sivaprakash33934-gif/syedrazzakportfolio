import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const CHARS = "█▓▒░<>/#";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Total decode time in seconds (default .7) */
  duration?: number;
  delay?: number;
}

/** SECTION 4.2 — charset "█▓▒░<>/#" decode, in-view once. */
export default function ScrambleText({ text, className, duration = 0.7, delay = 0 }: ScrambleTextProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [out, setOut] = useState("");

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (!inView) return;
    const total = Math.max(1, Math.round((duration * 1000) / 40));
    let frame = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const reveal = Math.floor((frame / total) * text.length);
        let s = "";
        for (let i = 0; i < text.length; i += 1) {
          const c = text[i];
          if (c === " ") {
            s += " ";
            continue;
          }
          s += i < reveal ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setOut(s);
        if (frame >= total) {
          setOut(text);
          if (interval) clearInterval(interval);
        }
      }, 40);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduced, text, duration, delay]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{out || "\u00A0"}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
