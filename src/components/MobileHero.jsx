import React from 'react';
import { motion } from 'framer-motion';
import catDance from '../assets/cat-dance.gif';
import earbuds from '../assets/earbuds.png';
import badgeImg from '../assets/badge.png';
import hoverImg from '../assets/hover image.jpeg';

export default function MobileHero() {
  return (
    <>
      <section
        id="mobile-hero"
        className="sm:hidden relative w-full h-[100dvh] overflow-hidden bg-black flex flex-col"
      >
        {/* ═══════ Background Layer ═══════ */}
        <div className="absolute inset-0 z-0">
          {/* Deep dark gradient canvas */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 75% 20%, rgba(232, 68, 48, 0.15) 0%, rgba(30, 30, 30, 0.3) 40%, #000000 100%)'
          }} />

          {/* Animated glow orb */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[40%] left-[-20%] w-[350px] h-[350px] rounded-full blur-[120px] bg-accent/30 pointer-events-none"
          />

          {/* Subtle grid pattern for texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* ═══════ Hanging Badge (Right Side - Restored Original Text & Size) ═══════ */}
        <div className="relative z-40 flex justify-end pr-5 -mt-2">
          {/* Scaled down container so the full original badge fits on mobile */}
          <div className="scale-[0.55] origin-top-right">
            <a href="#" className="mobile-badge-swing flex flex-col items-center cursor-pointer group">
              {/* 1. Lanyard Strap */}
              <div className="w-[26px] h-[240px] bg-stone-800 relative shadow-sm z-0">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
                  }}
                />
                <span className="absolute bottom-[40%] left-1/2 -translate-x-1/2 -rotate-90 font-mono text-[6px] font-bold text-white/60 tracking-[0.2em] uppercase whitespace-nowrap select-none">
                  HEY..
                </span>
              </div>

              {/* 2. Badge Card Wrapper */}
              <div className="rounded-xl w-[210px] -mt-8 relative" style={{ perspective: "800px" }}>
                <div
                  className="rounded-xl p-[6px] relative"
                  style={{
                    background: "linear-gradient(170deg, #57534e 0%, #44403c 15%, #292524 60%, #1c1917 100%)",
                    borderTop: "1.5px solid rgba(255,255,255,0.15)",
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                    borderRight: "1px solid rgba(0,0,0,0.3)",
                    borderBottom: "2px solid rgba(0,0,0,0.4)",
                    transform: "rotateX(1deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none z-20"
                    style={{
                      background: "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 15%, transparent 40%, transparent 85%, rgba(255,255,255,0.03) 100%)",
                    }}
                  />

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[26px] h-[22px] bg-stone-800 z-0 rounded-b-sm" />

                  <div className="relative z-10 flex justify-center pt-1 pb-0">
                    <div
                      className="w-8 h-[6px] rounded-full border border-stone-500/50"
                      style={{
                        background: "linear-gradient(180deg, #1c1917, #292524)",
                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                      }}
                    />
                  </div>

                  <div
                    className="rounded-lg overflow-hidden flex flex-col relative z-10"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      borderBottom: "1px solid rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      className="relative px-4 pt-4 pb-4"
                      style={{
                        background: "linear-gradient(175deg, #6b6560 0%, #57534e 20%, #44403c 100%)",
                      }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.12]"
                        style={{
                          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />

                      <div className="relative z-10">
                        <h3 className="text-white font-extrabold text-[28px] leading-[1.05] tracking-[0.15em]">
                          SID.
                        </h3>
                        <p className="font-sans text-white/50 text-[11px] tracking-[0.05em] mt-2 leading-relaxed">
                          Designer by craft,
                          <br />
                          Explorer by nature..
                        </p>
                      </div>
                    </div>

                    <div
                      className="px-4 pt-5 pb-5 flex flex-col items-center"
                      style={{
                        background: "linear-gradient(180deg, #1c1917, #0c0a09)",
                      }}
                    >
                      <div
                        className="w-32 h-32 rounded-full overflow-hidden bg-stone-600 relative"
                        style={{ border: "3px solid #57534e" }}
                      >
                        <img
                          src={badgeImg}
                          alt="Profile"
                          className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                          draggable={false}
                        />
                        <img
                          src={hoverImg}
                          alt="Hover Profile"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ═══════ Center Left Content: Earbuds + Let's Vibe ═══════ */}
        <div className="relative z-20 flex-1 flex flex-col justify-center px-8 -mt-80">
          <div className="relative inline-block w-fit">

            {/* Floating Earbuds (Over the letter L on the left) */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -25 }}
              animate={{ opacity: 1, x: 0, rotate: -15 }}
              transition={{ duration: 1.2, delay: 0.2, type: 'spring', bounce: 0.4 }}
              className="absolute -top-14 -left-6 z-20"
            >
              <motion.img
                animate={{ y: [0, -10, 0], rotate: [-15, -5, -15] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                src={earbuds}
                alt="Earbuds"
                className="w-[120px] h-[120px] object-contain drop-shadow-[0_15px_25px_rgba(232,68,48,0.5)]"
              />
            </motion.div>

            {/* Let's Vibe Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 pl-4"
            >
              <h2
                className="font-syne font-extrabold text-[64px] leading-[0.85] tracking-tighter text-white"
                style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
              >
                LET'S<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
                  VIBE
                </span>
              </h2>
            </motion.div>

            {/* Dancing Cat GIF (Right Side) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
              className="absolute -bottom-36 -right-[10px] z-10"
            >
              <div className="relative flex items-center justify-center w-[120px] h-[120px]">
                {/* Soft black anchoring shadow to blend away the grid lines underneath */}
                <div className="absolute inset-0 bg-black/60 rounded-full blur-[15px] z-0" />
                
                {/* Feathered edges via mask-image to perfectly dissolve the square bounding box */}
                <img
                  src={catDance}
                  alt="Dancing Cat"
                  className="w-full h-full object-contain relative z-10 opacity-90"
                  style={{ 
                    imageRendering: 'pixelated',
                    filter: 'invert(1) hue-rotate(180deg)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 80%)',
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 80%)'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══════ Bottom Info & Scroll ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-30 mb-8 px-8 w-full flex justify-between items-end"
        >
          {/* Left: Titles */}
          <div className="relative z-10">
            <p className="font-dm text-xs tracking-[0.2em] uppercase text-white/50 mb-2">
              VIBE-CODER
            </p>
            <h1 className="font-syne font-extrabold text-[26px] tracking-tight text-white leading-[1.1]">
              WEB DEVELOPER<br />
              CONTENT CREATOR
            </h1>
          </div>

          {/* Right: Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center gap-2 mt-2"
          >
            <span className="font-dm text-[9px] tracking-[0.2em] uppercase text-white/40">
              Scroll
            </span>
            <motion.div
              className="w-[1px] h-8 bg-white/30 origin-top"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{ boxShadow: 'inset 0 0 120px 40px rgba(0,0,0,0.9)' }}
        />
      </section>

      {/* ═══════ Embedded Styles ═══════ */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ── Badge Swing ── */
        @keyframes mobile-badge-swing {
          0% { transform: rotate(2deg); }
          50% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }
        .mobile-badge-swing {
          transform-origin: top center;
          animation: mobile-badge-swing 4s ease-in-out infinite;
        }

        /* ── Hide on sm+ screens ── */
        @media (min-width: 640px) {
          #mobile-hero {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}
