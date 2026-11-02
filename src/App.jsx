import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MobileHero from './components/MobileHero.jsx';
import ScrollTextReveal from './components/ScrollTextReveal.jsx';
import TechStack from './components/TechStack.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';
import Preloader from './components/Preloader.jsx';

// Secondary routes are lazy-loaded so they stay out of the initial home bundle.
const ProjectsPage = lazy(() => import('./components/ProjectsPage.jsx'));
const KnowMePage = lazy(() => import('./components/KnowMePage.jsx'));

function CursorFX() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.2 });
  const [hovering, setHovering] = useState(false);

  const hoverSelector = useMemo(() => 'a, button, [role="button"]', []);

  useEffect(() => {
    if (reducedMotion) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!media.matches) return;

    setEnabled(true);

    // Coalesce pointermove into one update per animation frame, so the
    // motion-value writes + `.closest()` hit-test run at most 60×/s.
    let raf = 0;
    let latest = null;
    const process = () => {
      raf = 0;
      if (!latest) return;
      x.set(latest.x);
      y.set(latest.y);
      setHovering(Boolean(latest.hover));
    };
    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target.closest(hoverSelector) : null;
      latest = { x: e.clientX, y: e.clientY, hover: el };
      if (!raf) raf = requestAnimationFrame(process);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hoverSelector, reducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`td-cursor ${hovering ? 'is-hover' : ''}`}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    />
  );
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}

function HomePage() {
  const isMobile = useIsMobile(640);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        {isMobile ? <MobileHero /> : <Hero />}
        <ScrollTextReveal />
        <Projects />

        {/* ═══════ TECH STACK + FOOTER REVEAL SYSTEM ═══════ */}
        <div className="relative">
          {/* Sticky TechStack: pinned to viewport as user scrolls into it */}
          <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
            <TechStack />
          </div>

          {/* Scroll runway: TechStack remains pinned while scrolling through this duration */}
          <div className="h-[40vh] pointer-events-none" />

          {/* Footer: higher stacking order (z-20), slides up naturally over TechStack */}
          <div className="relative z-20 w-full">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ReactLenis
        root
        options={{
          // Frame-rate-independent premium glide on desktop; native 120Hz momentum on touch
          duration: 0.85,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1.0,
          touchMultiplier: 0,
          smoothWheel: true,
          syncTouch: false,
        }}
      >
        <div className="min-h-screen bg-[#000000] text-[#F5F5F5] relative" style={{ overflowX: 'clip' }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(circle at 30% 20%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
            }}
          />
          <Preloader />
          <CursorFX />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/knowme" element={<KnowMePage />} />
            </Routes>
          </Suspense>
        </div>
      </ReactLenis>
    </BrowserRouter>
  );
}
