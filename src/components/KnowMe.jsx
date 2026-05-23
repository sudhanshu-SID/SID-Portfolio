import React from 'react';
import { motion } from 'framer-motion';

const travelSpots = [
  {
    id: '01',
    destination: 'Kasol, India',
    desc: 'Wandering by the Parvati River, walking under towering pines, and catching conversations around a bonfire in the valley.',
    gradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
    icon: (
      <svg className="w-8 h-8 text-orange-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
    icon: (
      <svg className="w-8 h-8 text-emerald-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
  },
  {
    id: '03',
    destination: 'Chicago, USA',
    desc: 'Exploring massive skyscrapers, lakeside winds, and capturing architectural lines framing neon city lights.',
    gradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    icon: (
      <svg className="w-8 h-8 text-blue-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 16.5h1.5m3 0H15M6.75 21V3m10.5 18V3" />
      </svg>
    ),
  },
  {
    id: '04',
    destination: 'Manali, Himalayas',
    desc: 'Witnessing snow peaks touching the sky, winding passes, and the quiet serenity of high-altitude valleys.',
    gradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    icon: (
      <svg className="w-8 h-8 text-purple-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
      </svg>
    ),
  },
];

export default function KnowMe() {
  return (
    <section
      id="knowme"
      className="relative pt-12 md:pt-16 pb-48 lg:pb-60 bg-[#000000] border-t border-white/[0.04] z-30"
    >
      {/* Sticky section label — top left */}
      <div className="sticky top-[76px] z-20 w-full bg-[#000000] pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-10">
          <span
            className="intro-label font-dm text-sm sm:text-base md:text-lg tracking-wide select-none cursor-pointer pointer-events-auto"
          >
            // Know Me
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 -mt-4"
      >
        {/* Intro text */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-tighter text-white mb-6">
            Beyond the screen.
          </h2>
          <p className="font-dm text-lg md:text-xl text-white/50 leading-relaxed mb-8">
            I believe a good designer is first a good observer. When I’m not sketching layouts or coding interactive experiences, I’m out exploring the world, trekking new trails, and documenting visual stories.
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-dm tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Room for travel memories & journals
          </div>
        </div>

        {/* Interactive Travel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelSpots.map((spot, idx) => (
            <motion.div
              key={spot.id}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl border border-white/[0.05] bg-[#0c0c0e] p-6 flex flex-col justify-between aspect-[3/4] overflow-hidden"
            >
              {/* Card visual gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${spot.gradient} opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />
              
              {/* Corner Watermark */}
              <div className="absolute top-6 right-6 font-syne font-extrabold text-white/5 text-4xl">
                {spot.id}
              </div>

              {/* Top part: Icon / Placeholder visual */}
              <div className="relative z-10 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:scale-110 group-hover:border-white/10 transition-all duration-300">
                {spot.icon}
              </div>

              {/* Bottom part: Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="font-syne font-bold text-xl text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {spot.destination}
                </h3>
                <p className="font-dm text-sm text-white/40 leading-relaxed">
                  {spot.desc}
                </p>
              </div>

              {/* Camera Film slide line detail */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04] group-hover:bg-accent/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Coming soon travel logs section */}
        <div className="mt-20 md:mt-28 p-8 rounded-2xl border border-white/[0.04] bg-gradient-to-r from-white/[0.01] to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-bold text-white text-lg md:text-xl mb-1">
              Want to see the travel journals?
            </h4>
            <p className="font-dm text-sm text-white/40">
              I’m building a custom travel vlog and journaling feed. Soon, you will be able to click on these cards to view my photography and stories.
            </p>
          </div>
          <span className="flex-shrink-0 font-dm text-xs uppercase tracking-widest text-[#555] border border-white/10 rounded-full px-4 py-2 bg-black">
            Coming Soon
          </span>
        </div>
      </motion.div>
    </section>
  );
}
