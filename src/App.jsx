import React, { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MobileHero from './components/MobileHero.jsx';
import ScrollTextReveal from './components/ScrollTextReveal.jsx';
import TechStack from './components/TechStack.jsx';
import Projects from './components/Projects.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';

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
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target instanceof Element ? e.target.closest(hoverSelector) : null;
      setHovering(Boolean(el));
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
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

export default function App() {
  return (
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
      <CursorFX />
      <ScrollProgress />
      <Navbar />
      <main>
        <MobileHero />
        <Hero />
        <ScrollTextReveal />
        <TechStack />
        <Projects />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
}

