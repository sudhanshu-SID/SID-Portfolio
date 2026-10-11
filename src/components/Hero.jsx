import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { getCloudinaryUrl } from '../utils/cloudinary';

// The marquee text — repeated enough to fill wide screens
const MARQUEE_TEXT = "FULL-STACK-DEVELOPER";
const REPEAT_COUNT = 12;

// Build the text strip once
function MarqueeStrip() {
  return (
    <>
      {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
        <span
          key={i}
          className="mx-4 md:mx-6 lg:mx-8 font-syne font-extrabold text-[clamp(3rem,10vw,10rem)] leading-none tracking-[-0.04em] uppercase select-none whitespace-nowrap hero-marquee-letter"
        >
          {MARQUEE_TEXT}
          <span className="text-accent/30 mx-4 md:mx-6 text-[0.6em]"></span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const yRaw = useTransform(scrollY, (val) => val * 0.3);
  // Subtle parallax on the whole hero layer; disabled under reduced-motion.
  const y = reducedMotion ? 0 : yRaw;

  // Liquid hover reveal state with physics-based lerp
  const stageRef = useRef(null);
  const [forced, setForced] = useState(false);
  const [hoverMode] = useState('armor'); // defaults to Iron Man armor

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const targetRadius = useRef(0);
  const currentRadius = useRef(0);
  const rafId = useRef(null);

  // Smooth 120fps physics loop for liquid aperture inertia
  useEffect(() => {
    let activeLoop = true;

    const animate = () => {
      if (!activeLoop) return;
      const el = stageRef.current;
      if (el) {
        // Smoothly interpolate position (0.16 easing for organic glide)
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.16;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.16;

        // Smoothly interpolate radius (0.13 easing for organic breath)
        const destR = forced ? 2500 : targetRadius.current;
        currentRadius.current += (destR - currentRadius.current) * 0.13;

        el.style.setProperty('--mx', `${currentPos.current.x.toFixed(2)}px`);
        el.style.setProperty('--my', `${currentPos.current.y.toFixed(2)}px`);
        el.style.setProperty('--r', `${currentRadius.current.toFixed(2)}px`);
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      activeLoop = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [forced]);

  const updateTarget = useCallback((clientX, clientY) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    targetPos.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const onMouseEnter = useCallback((e) => {
    const el = stageRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetPos.current = { x, y };
      if (currentRadius.current < 2) {
        currentPos.current = { x, y };
      }
      const radius = Math.min(Math.max(window.innerWidth * 0.16, 150), 240);
      targetRadius.current = radius;
    }
  }, []);

  const onMouseMove = useCallback((e) => {
    updateTarget(e.clientX, e.clientY);
  }, [updateTarget]);

  const onMouseLeave = useCallback(() => {
    targetRadius.current = 0;
  }, []);

  const onClick = useCallback(() => {
    setForced((f) => !f);
  }, []);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setForced((f) => !f);
    }
  }, []);

  return (
    <section
      id="hero"
      className="sticky top-0 w-full h-screen overflow-hidden bg-black hidden sm:block z-0"
    >
      <motion.div
        ref={stageRef}
        style={{ y }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Interactive Hero Portrait"
        className={`hero-reveal-stage ${forced ? 'is-forced' : ''} absolute inset-0 w-full h-full will-change-transform outline-none select-none`}
      >
        {/* ========== LEVEL 1 (Bottom): Background portrait + gradient ========== */}
        <div className="absolute inset-0 z-0">
          <img
            src={getCloudinaryUrl('hero-full', 'image', { width: 1600 })}
            alt="Portrait"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-top sm:object-center scale-105 pointer-events-none"
          />
          {/* Dark overlay for contrast with marquee text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40 pointer-events-none" />
        </div>

        {/* ========== LEVEL 2 (Middle): Infinite marquee text ========== */}
        <div className="absolute inset-0 z-10 hidden sm:flex items-center pointer-events-none">
          <div className="w-full overflow-hidden">
            <div className="hero-marquee-track items-center whitespace-nowrap">
              <MarqueeStrip />
              <MarqueeStrip />
            </div>
          </div>
        </div>

        {/* ========== LEVEL 3 (Top): Foreground — same portrait with radial mask ========== */}
        {/* Re-use hero image masked to show only central subject */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                'radial-gradient(ellipse 45% 70% at 50% 40%, black 30%, transparent 80%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 45% 70% at 50% 40%, black 30%, transparent 80%)',
            }}
          >
            <img
              src={getCloudinaryUrl('hero-full', 'image', { width: 1600 })}
              alt="Portrait Foreground"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover object-top sm:object-center scale-105"
            />
          </div>
          {/* Bottom fade so the subject blends seamlessly into the page below */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* ========== LEVEL 3.5: Interactive Liquid Hover Reveal (Gargi Dossier Style) ========== */}
        <div className="hero-reveal-top">
          <img
            src={
              hoverMode === 'armor'
                ? (getCloudinaryUrl('hero-armor', 'image', { width: 1600 }) || '/hero-armor.jpg')
                : (getCloudinaryUrl('hero-color', 'image', { width: 1600 }) || '/hero-color.jpg')
            }
            alt={hoverMode === 'armor' ? 'Iron Man Armor Portrait' : 'Vibrant Color Portrait'}
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-top sm:object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* SVG Liquid Amoeba Distortion Mask & Glowing Outline */}
        <svg
          className="hero-reveal-svg"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="heroAmoebaDistort"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="turbulence"
                baseFrequency="0.013"
                numOctaves="2"
                seed="4"
                result="noise"
              >
                {!reducedMotion && (
                  <animate
                    attributeName="baseFrequency"
                    dur="12s"
                    values="0.009;0.018;0.012;0.009"
                    repeatCount="indefinite"
                  />
                )}
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="60"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <mask id="heroRevealMask">
              <g filter="url(#heroAmoebaDistort)">
                <circle className="reveal-mask-shape" fill="#fff" />
              </g>
            </mask>
          </defs>

          {/* glowing jagged border = displaced circle, stroked */}
          <g className="reveal-edge-glow">
            <circle className="reveal-edge" filter="url(#heroAmoebaDistort)" />
          </g>
        </svg>

        {/* ========== Overlay UI elements ========== */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Bottom-left name/title — Showcasing Full Stack Developer who loves experimenting with good UI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-6 md:bottom-8 left-6 md:left-12 pointer-events-auto pb-[env(safe-area-inset-bottom)]"
          >
            <p className="font-dm text-xs md:text-sm tracking-[0.2em] uppercase text-accent font-medium mb-1">
              FULL STACK DEVELOPER
            </p>
            <h1 className="font-syne font-extrabold text-[clamp(1.5rem,3.6vw,2.5rem)] tracking-tight text-white leading-tight">
              EXPERIMENTING WITH<br />
              GOOD DESIGNS
            </h1>
          </motion.div>


          {/* Bottom-right scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2"
          >
            <span className="font-dm text-[10px] tracking-[0.2em] uppercase text-white/40">
              Scroll
            </span>
            <motion.div
              className="w-[1px] h-8 bg-white/20 origin-top"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Vignette edges */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </motion.div>
    </section>
  );
}
