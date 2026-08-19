import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface MarqueeProps {
  items: string[];
  className?: string;
}

function Star() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0 text-accent">
      <path d="M7 0l1.6 5.4L14 7l-5.4 1.6L7 14 5.4 8.6 0 7l5.4-1.6z" fill="currentColor" />
    </svg>
  );
}

function Row({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 pr-6">
          <span className="font-display text-xl tracking-[0.1em] text-ink/30 md:text-2xl">
            {item.toUpperCase()}
          </span>
          <Star />
        </span>
      ))}
    </div>
  );
}

/** SECTION 4.2 — infinite x-loop 40s linear, pause on hover; static wrap on reduced-motion. */
export default function Marquee({ items, className }: MarqueeProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${className ?? ""}`}>
        <Row items={items} />
      </div>
    );
  }

  return (
    <div className={`group flex overflow-hidden ${className ?? ""}`}>
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}
