import { useEffect, useState } from "react";
import type { SectionId } from "../lib/content";

/** Tracks which [data-section] panel currently owns the viewport. */
export function useActiveSection(ids: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.section as SectionId | undefined;
            if (id) setActive(id);
          }
        }
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );

    const els = ids
      .map((id) => document.querySelector(`[data-section="${id}"]`))
      .filter((el): el is Element => el !== null);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
