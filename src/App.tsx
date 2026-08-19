import { useState } from "react";
import { MotionConfig } from "framer-motion";

/* chrome — fixed layers */
import BokehCanvas from "./components/chrome/BokehCanvas";
import { Grain, Vignette } from "./components/chrome/Grain";
import Cursor from "./components/chrome/Cursor";
import NavBar from "./components/chrome/NavBar";
import ReelCounter from "./components/chrome/ReelCounter";
import Preloader from "./components/chrome/Preloader";

/* sections — 5.1 → 5.8 */
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Stats from "./components/sections/Stats";
import Work from "./components/sections/Work";
import Contact from "./components/sections/Contact";

import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useLenis } from "./hooks/useLenis";
import { useActiveSection } from "./hooks/useActiveSection";
import { SECTION_IDS } from "./lib/content";

/**
 * THE CINEMATIC REEL — single-page portfolio for Syed Mehaboob Razzak.S
 * z-order: 0 bokeh · 1 grain · 2 vignette · 10 content · 50 nav ·
 * 60 cursor · 70 preloader/letterbox · 80 toast.
 */
export default function App() {
  const reduced = usePrefersReducedMotion();
  const smoothViewport = useMediaQuery("(min-width: 768px)");
  useLenis(smoothViewport && !reduced);

  const active = useActiveSection(SECTION_IDS);
  const [booted, setBooted] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-button focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:tracking-[0.25em] focus:text-void"
      >
        SKIP TO CONTENT
      </a>

      <BokehCanvas />
      <Grain />
      <Vignette />
      <Cursor />
      <NavBar active={active} />
      <ReelCounter active={active} />

      <main id="main" className="relative z-10">
        <Hero ready={booted} />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Stats />
        <Work />
        <Contact />
      </main>

      {/* self-unmounts after the letterbox bars retract */}
      <Preloader onHandoff={() => setBooted(true)} />
    </MotionConfig>
  );
}
