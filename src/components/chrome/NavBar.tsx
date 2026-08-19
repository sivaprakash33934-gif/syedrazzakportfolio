import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import { CONTENT, type SectionId } from "../../lib/content";
import { E_EXPO } from "../../lib/motion";
import { scrollToId } from "../../lib/lenis";

/** SECTION 3.3 — auto-hide on scroll-down, reveal on scroll-up, blur >40px. */
export default function NavBar({ active }: { active: SectionId }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 160);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (e: ReactMouseEvent) => {
    e.preventDefault();
    scrollToId(`#${id}`);
  };

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-void/75 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
      animate={{ y: hidden ? "-105%" : "0%" }}
      transition={{ duration: 0.35, ease: E_EXPO }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10"
      >
        <a
          href="#top"
          onClick={go("top")}
          className="font-display text-[22px] tracking-[0.06em] text-ink transition-colors hover:text-accent-soft"
        >
          RAZZAK<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {CONTENT.navLinks.map((link, i) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={go(link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`group font-mono text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                <span className="mr-1.5 text-[9px] text-muted/70">0{i + 1}</span>
                {link.label}
                <span
                  className={`mt-1 block h-px origin-left bg-accent transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollToId("#contact")}
          className="rounded-button bg-accent px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.25em] text-void transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft hover:shadow-glow-amber"
        >
          HIRE ME
        </button>
      </nav>
    </motion.header>
  );
}
