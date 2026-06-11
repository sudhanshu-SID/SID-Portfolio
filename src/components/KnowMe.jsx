import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { getCloudinaryUrl } from '../utils/cloudinary';

// Local imports removed

const travelSpots = [
  {
    id: '01',
    destination: 'Mahakali Temple, Jalori pass',
    videoUrl: getCloudinaryUrl('Mahakali Temple, Jalori pass', 'video'),
    type: 'video',
    height: 'h-[380px]',
    customClass: 'w-[85%] sm:w-[45%] -rotate-[2deg] z-10 sm:mt-4',
  },
  {
    id: '02',
    destination: 'Sojha,Himachal',
    image: getCloudinaryUrl('Sojha,Himachal', 'image'),
    type: 'image',
    height: 'h-[300px]',
    customClass: 'w-[90%] sm:w-[55%] rotate-[3deg] z-20 -mt-6 sm:-ml-8 sm:mt-12',
  },
  {
    id: '03',
    destination: 'The Hawa mahal,Jaipur',
    image: getCloudinaryUrl('The Hawa mahal,Jaipur', 'image'),
    type: 'image',
    height: 'h-[330px]',
    customClass: 'w-[75%] sm:w-[40%] -rotate-[4deg] z-10 -mt-4 sm:ml-4 sm:-mt-8',
  },
  {
    id: '04',
    destination: 'Triund top,Himachal',
    image: getCloudinaryUrl('Triund top,Himachal', 'image'),
    type: 'image',
    height: 'h-[410px]',
    customClass: 'w-[85%] sm:w-[50%] rotate-[2deg] z-30 -mt-8 sm:-ml-6 sm:mt-4',
  },
  {
    id: '05',
    destination: 'somewhere in Jibhi',
    image: getCloudinaryUrl('somewhere in Jibhi', 'image'),
    type: 'image',
    height: 'h-[350px]',
    customClass: 'w-[95%] sm:w-[45%] -rotate-[1deg] z-20 -mt-6 sm:-mt-12 sm:ml-8',
  },
  {
    id: '06',
    destination: 'Somewhere between trek',
    image: getCloudinaryUrl('Somewhere between trek', 'image'),
    type: 'image',
    height: 'h-[280px]',
    customClass: 'w-[70%] sm:w-[35%] rotate-[5deg] z-10 -mt-4 sm:-ml-12 sm:mt-2',
  },
  {
    id: '07',
    destination: "We don't have any idea what we are doing",
    image: getCloudinaryUrl("We don't have any idea what we are doing", 'image'),
    type: 'image',
    height: 'h-[320px]',
    customClass: 'w-[85%] sm:w-[60%] -rotate-[3deg] z-40 -mt-10 sm:-mt-6 mx-auto',
  }
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
      className="relative pt-8 md:pt-12 pb-24 lg:pb-32 bg-white z-30"
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
          <h2 className="font-syne font-bold text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05] tracking-tighter text-neutral-900 mb-6">
            my{' '}
            <span className="relative text-accent cursor-pointer group/world inline-block">
              LOVE
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-accent scale-x-0 origin-left transition-transform duration-300 group-hover/world:scale-x-100" />
            </span>{' '}
            for travel.
          </h2>
          <p className="font-dm text-lg md:text-xl text-neutral-600 leading-relaxed mb-8">
            I believe a good designer is first a good observer. When I’m not sketching layouts or coding interactive experiences, I’m out exploring the world, trekking new trails, and documenting visual stories.
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-dm tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Room for travel memories & journals
          </div>


        </div>

        {/* Right Column: Travel Cards Grid in Pinterest-style Masonry */}
        <div className="w-full lg:w-7/12">
          <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center relative w-full gap-y-8 sm:gap-y-0 py-8">
            {travelSpots.map((spot, idx) => (
              <motion.div
                key={spot.id}
                whileHover={{ y: -10, rotate: 0, scale: 1.05, zIndex: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={() => setHoveredSpotIndex(idx)}
                onMouseLeave={() => setHoveredSpotIndex(null)}
                onMouseMove={handleMouseMove}
                className={`group relative rounded-sm border-[8px] sm:border-[12px] border-[#fdfbf7] shadow-xl bg-neutral-100 flex flex-col justify-between overflow-hidden cursor-pointer ${spot.height} ${spot.customClass}`}
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
                    style={{ backgroundImage: `url("${spot.image}")` }}
                  />
                )}
                
                {/* Subtle dark gradient overlay by default (always visible at rest to frame the card) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-0" />


                {/* Bottom line accent detail */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/[0.04] group-hover:bg-accent/60 transition-colors duration-300 z-20" />
              </motion.div>
            ))}
          </div>

          {/* Instagram journals link section */}
          <div className="mt-12 p-8 rounded-2xl border border-black/[0.04] bg-gradient-to-r from-black/[0.02] to-transparent flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-syne font-bold text-neutral-900 text-lg md:text-xl mb-1">
                Want to see my travel journals?
              </h4>
              <p className="font-dm text-sm text-neutral-600 max-w-md">
                Where the layouts end, the trails begin. I share real-time stories, trekking logs, and raw frames from my travels directly on my Instagram feed.
              </p>
            </div>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              className="flex-shrink-0 inline-flex items-center gap-3 group text-accent hover:text-neutral-900 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center group-hover:border-black/10 group-hover:bg-black/5 transition-all duration-300">
                <svg className="w-5 h-5 text-accent group-hover:text-neutral-900 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
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
