import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { getCloudinaryUrl } from '../utils/cloudinary';

// The marquee text — repeated enough to fill wide screens
const MARQUEE_TEXT = "VIBE-CODER";
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
  const y = useTransform(scrollY, (val) => val * 0.5);

  // Enough shift for one full strip to scroll off, creating a seamless loop
  const marqueeShift = -3200;

  return (
    <section
      id="hero"
      className="sticky top-0 w-full h-screen overflow-hidden bg-black hidden sm:block z-0"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full will-change-transform">
      {/* ========== LEVEL 1 (Bottom): Background portrait + gradient ========== */}
      <div className="absolute inset-0 z-0">
        <img
          src={getCloudinaryUrl('hero-full')}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-top sm:object-center scale-105"
        />
        {/* Dark overlay for contrast with marquee text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40" />
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* ========== LEVEL 2 (Middle): Infinite marquee text ========== */}
      <div className="absolute inset-0 z-10 hidden sm:flex items-center pointer-events-none">
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex items-center whitespace-nowrap will-change-transform"
            animate={
              reducedMotion
                ? {}
                : { x: [0, marqueeShift] }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                duration: 25,
              },
            }}
          >
            {/* Duplicate the strip for seamless loop (ticker approach) */}
            <MarqueeStrip />
            <MarqueeStrip />
          </motion.div>
        </div>
      </div>

      {/* ========== LEVEL 3 (Top): Foreground — same portrait with radial mask ========== */}
      {/* We re-use the same hero image but mask it to show only the central subject */}
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
            src={getCloudinaryUrl('hero-full')}
            alt="Portrait"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-top sm:object-center scale-105"
          />
        </div>
        {/* Bottom fade so the subject blends seamlessly into the page below */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ========== Overlay UI elements ========== */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Bottom-left name/title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 left-6 md:left-12"
        >
          <p className="font-dm text-xs md:text-sm tracking-[0.2em] uppercase text-white/50 mb-1">
            VIBE-CODER
          </p>
          <h1 className="font-syne font-extrabold text-2xl md:text-4xl tracking-tight text-white">
            WEB DEVELOPER<br/>
            CONTENT CREATOR
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
          boxShadow: 'inset 0 0 150px 60px rgba(0,0,0,0.6)',
        }}
      />
      </motion.div>
    </section>
  );
}
