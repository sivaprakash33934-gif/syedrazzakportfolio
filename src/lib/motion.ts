/* ─────────────────────────────────────────────────────────────
   SECTION 4.1 — EASING / DURATION LIBRARY
   ───────────────────────────────────────────────────────────── */

export const E_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const E_CINE: [number, number, number, number] = [0.83, 0, 0.17, 1];

export const SPRING = { stiffness: 260, damping: 26 };

export const T_FAST = 0.2;
export const T_BASE = 0.45;
export const T_SLOW = 0.9;
export const T_EPIC = 1.4;

export const STAGGER = 0.08;
export const LETTER_STAGGER = 0.045;
export const PILL_STAGGER = 0.06;

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;

/* Shared variants — children inherit the parent's "hidden" → "show" label. */
export const popItem = {
  hidden: { opacity: 0, y: 12, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: T_BASE, ease: E_EXPO } },
};

export const fadeItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: T_SLOW, ease: E_EXPO } },
};

export const staggerParent = (stagger: number, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
