import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  depth: number;
  color: string;
  alpha: number;
}

/**
 * SECTION 3.1 — 70 warm bokeh particles with pointer parallax by depth.
 * 60fps-capped rAF, pauses on document.hidden, static radial-glow
 * fallback on mobile / reduced-motion.
 */
export default function BokehCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const animateIt = isDesktop && !reduced;

  useEffect(() => {
    if (!animateIt) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let running = true;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const colors = ["245,242,236", "255,184,107", "255,122,26"];
    const parts: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 1.8,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.13,
      depth: 0.25 + Math.random() * 0.75,
      color: colors[Math.random() < 0.6 ? 0 : Math.random() < 0.72 ? 1 : 2],
      alpha: 0.2 + Math.random() * 0.4,
    }));

    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    const onPointer = (e: PointerEvent) => {
      tx = e.clientX / w - 0.5;
      ty = e.clientY / h - 0.5;
    };
    const onVis = () => {
      running = !document.hidden;
      if (running) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (t - last < 16.6) return; // cap 60fps
      last = t;
      px += (tx - px) * 0.045;
      py += (ty - py) * 0.045;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;
        if (p.y < -12) p.y = h + 12;
        if (p.y > h + 12) p.y = -12;
        const x = p.x + px * p.depth * 30;
        const y = p.y + py * p.depth * 30;
        const c = `rgba(${p.color},${p.alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.shadowColor = c;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [animateIt]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      {animateIt ? (
        <canvas ref={canvasRef} className="block h-full w-full" />
      ) : (
        /* static radial-glow fallback */
        <div className="absolute inset-0">
          <div className="absolute left-[10%] top-[16%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,184,107,0.11),transparent_65%)] blur-xl" />
          <div className="absolute right-[6%] top-[28%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(245,242,236,0.07),transparent_65%)] blur-xl" />
          <div className="absolute bottom-[10%] left-[28%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,122,26,0.09),transparent_65%)] blur-xl" />
          <div className="absolute bottom-[22%] right-[20%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,184,107,0.08),transparent_65%)] blur-xl" />
        </div>
      )}
    </motion.div>
  );
}
