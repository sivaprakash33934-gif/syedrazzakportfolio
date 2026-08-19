const NOISE_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/** SECTION 3 — z1 film grain: SVG feTurbulence, opacity .06, steps(2) jitter. */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="animate-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.06]"
      style={{ backgroundImage: NOISE_URI, backgroundSize: "260px 260px" }}
    />
  );
}

/** SECTION 3 — z2 vignette: transparent 55% → rgba(0,0,0,.55). */
export function Vignette() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
    />
  );
}
