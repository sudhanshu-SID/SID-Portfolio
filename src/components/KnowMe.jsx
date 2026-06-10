import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { getCloudinaryUrl } from '../utils/cloudinary';

// Local imports removed

const travelSpots = [
  {
    id: '01',
    destination: 'Kasol, India',
    desc: 'Wandering by the Parvati River, walking under towering pines, and catching conversations around a bonfire in the valley.',
    gradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
    image: getCloudinaryUrl('travel_kasol', 'image'),
    type: 'image',
    height: 'h-[380px]',
    icon: (
      <svg className="w-6 h-6 text-orange-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
  {
    id: '02',
    destination: 'Coorg, India',
    desc: 'Wild treks, mist-covered coffee plantations, and pitch-black nights camping under a canopy of ancient trees.',
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    videoUrl: getCloudinaryUrl('travel_coorg', 'video'),
    type: 'video',
    height: 'h-[300px]',
    icon: (
      <svg className="w-6 h-6 text-emerald-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
  },
  {
    id: '03',
    destination: 'Chicago, USA',
    desc: 'Exploring massive skyscrapers, lakeside winds, and capturing architectural lines framing neon city lights.',
    gradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    videoUrl: getCloudinaryUrl('travel_chicago', 'video'),
    type: 'video',
    height: 'h-[330px]',
    icon: (
      <svg className="w-6 h-6 text-blue-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 16.5h1.5m3 0H15M6.75 21V3m10.5 18V3" />
      </svg>
    ),
  },
  {
    id: '04',
    destination: 'Manali, Himalayas',
    desc: 'Witnessing snow peaks touching the sky, winding passes, and the quiet serenity of high-altitude valleys.',
    gradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    image: getCloudinaryUrl('travel_manali', 'image'),
    type: 'image',
    height: 'h-[410px]',
    icon: (
      <svg className="w-6 h-6 text-purple-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
      </svg>
    ),
  },
];

export default function KnowMe() {
  const [hoveredSpotIndex, setHoveredSpotIndex] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring-smoothed position for custom cursor label
  const springX = useSpring(mouseX, { stiffness: 350, damping: 28, mass: 0.25 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 28, mass: 0.25 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="knowme"
      className="relative pt-8 md:pt-12 pb-24 lg:pb-32 bg-[#000000] z-30"
    >

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 mt-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
      >
        {/* Left Column: Intro text, sticky on desktop */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-40">
          <h2 className="font-syne font-bold text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05] tracking-tighter text-white mb-6">
            my{' '}
            <span className="relative text-accent cursor-pointer group/world inline-block">
              LOVE
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-accent scale-x-0 origin-left transition-transform duration-300 group-hover/world:scale-x-100" />
            </span>{' '}
            for travel.
          </h2>
          <p className="font-dm text-lg md:text-xl text-white/50 leading-relaxed mb-8">
            I believe a good designer is first a good observer. When I’m not sketching layouts or coding interactive experiences, I’m out exploring the world, trekking new trails, and documenting visual stories.
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-dm tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Room for travel memories & journals
          </div>


        </div>

        {/* Right Column: Travel Cards Grid in Pinterest-style Masonry */}
        <div className="w-full lg:w-7/12">
          <div className="columns-1 sm:columns-2 gap-6 [column-fill:balance]">
            {travelSpots.map((spot, idx) => (
              <motion.div
                key={spot.id}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={() => setHoveredSpotIndex(idx)}
                onMouseLeave={() => setHoveredSpotIndex(null)}
                onMouseMove={handleMouseMove}
                className={`group relative rounded-2xl border border-white/[0.05] bg-[#0c0c0e] flex flex-col justify-between overflow-hidden break-inside-avoid mb-6 cursor-pointer ${spot.height}`}
              >
                {/* Background media: looping video or image */}
                {spot.type === 'video' ? (
                  <video
                    src={spot.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${spot.image})` }}
                  />
                )}
                
                {/* Subtle dark gradient overlay by default (always visible at rest to frame the card) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-0" />


                {/* Bottom line accent detail */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.04] group-hover:bg-accent/60 transition-colors duration-300 z-20" />
              </motion.div>
            ))}
          </div>

          {/* Instagram journals link section */}
          <div className="mt-12 p-8 rounded-2xl border border-white/[0.04] bg-gradient-to-r from-white/[0.01] to-transparent flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-syne font-bold text-white text-lg md:text-xl mb-1">
                Want to see my travel journals?
              </h4>
              <p className="font-dm text-sm text-white/40 max-w-md">
                Where the layouts end, the trails begin. I share real-time stories, trekking logs, and raw frames from my travels directly on my Instagram feed.
              </p>
            </div>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              className="flex-shrink-0 inline-flex items-center gap-3 group text-accent hover:text-white transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-300">
                <svg className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <span className="font-dm text-sm tracking-wide font-medium">
                Follow on Instagram
              </span>
              <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Floating magnetic cursor label */}
      <AnimatePresence>
        {hoveredSpotIndex !== null && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50 px-3 py-1.5 rounded-full bg-gradient-to-br from-white to-neutral-100 text-neutral-900 font-syne font-bold text-xs tracking-wide shadow-2xl border border-white/30 flex items-center whitespace-nowrap"
            style={{
              x: springX,
              y: springY,
              translateX: '-50%',
              translateY: '-145%', // Position it slightly above the cursor
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <span>{travelSpots[hoveredSpotIndex]?.destination}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
