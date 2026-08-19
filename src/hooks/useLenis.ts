import { useEffect } from "react";
import { setLenisInstance } from "../lib/lenis";

/**
 * SECTION 3.5 — Lenis smooth scroll.
 * lerp .09 · duration 1.1 · smoothWheel. Dynamically imported so it
 * never lands in the critical path; disabled by the caller on
 * reduced-motion or small viewports.
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let rafId = 0;
    let lenis: import("lenis").default | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenis = new Lenis({ lerp: 0.09, duration: 1.1, smoothWheel: true });
      setLenisInstance(lenis);
      const loop = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      setLenisInstance(null);
    };
  }, [enabled]);
}
