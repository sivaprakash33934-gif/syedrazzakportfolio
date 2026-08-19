import { motion } from "framer-motion";
import type { ExperienceEntry } from "../../lib/content";
import { E_EXPO, T_SLOW } from "../../lib/motion";
import { scrollToId } from "../../lib/lenis";

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
}

/** Experience entry — alternates in from ±40px, node glows amber on view. */
export default function TimelineEntry({ entry, index }: TimelineEntryProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: T_SLOW, ease: E_EXPO }}
      className="group relative rounded-xl py-3 pl-8 transition-colors duration-300 last:pb-0 hover:bg-card-glass lg:pl-12"
    >
      {/* spine node */}
      <motion.span
        aria-hidden="true"
        initial={{ boxShadow: "0 0 0 rgba(255,122,26,0)" }}
        whileInView={{ boxShadow: "0 0 16px rgba(255,122,26,0.55)" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="absolute left-0 top-5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-void lg:top-6"
      />

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-[11px] font-semibold tracking-[0.22em] text-accent">{entry.period}</span>
        <button
          type="button"
          onClick={() => scrollToId("#work")}
          className="ml-auto hidden font-mono text-[10px] tracking-[0.25em] text-muted opacity-0 transition-all duration-300 hover:text-accent group-hover:opacity-100 md:block"
        >
          VIEW WORK →
        </button>
      </div>

      <h3 className="mt-1.5 font-display text-xl tracking-[0.03em] text-ink lg:text-[22px]">{entry.role}</h3>
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">{entry.company}</p>

      {entry.tasks && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {entry.tasks.map((task) => (
            <li
              key={task}
              className="rounded-full border border-line bg-card-glass px-2.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-ink/70 transition-colors duration-300 hover:border-accent/60 hover:text-ink"
            >
              {task}
            </li>
          ))}
        </ul>
      )}

      {entry.description && (
        <p className="mt-2.5 max-w-[62ch] text-sm leading-relaxed text-muted lg:text-[13px] lg:leading-snug">
          {entry.description}
        </p>
      )}
    </motion.article>
  );
}
