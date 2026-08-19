import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

/** Smooth-scroll to an element by selector; falls back to native scroll. */
export function scrollToId(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  (el as HTMLElement).scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
