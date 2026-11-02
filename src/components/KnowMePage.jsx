import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import KnowMe from './KnowMe';
import Footer from './Footer';

export default function KnowMePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed back button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[76px] flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 font-dm text-sm tracking-wide text-white/60 hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back Home
          </Link>

          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Stats (Resume)"
              className="group relative w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-accent/60 flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <svg
                className="w-4 h-4 text-white/80 group-hover:text-accent transition-all duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>

              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/10 text-[10px] font-dm font-semibold tracking-wider uppercase text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap shadow-xl">
                View Stats
              </span>
            </a>

            <span className="font-syne font-extrabold text-white tracking-[-0.03em] text-lg">
              SID.
            </span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-[76px] min-h-[50vh] md:min-h-[60vh] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-20 md:py-32">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="intro-label font-dm text-sm sm:text-base md:text-lg tracking-wide select-none cursor-pointer"
          >
            // Know Me
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 font-syne font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.04em] text-white"
          >
            Beyond
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E84430] to-[#ff6b4a]">
              The Code.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 font-dm text-lg md:text-xl text-white/40 max-w-xl leading-relaxed"
          >
            A peek into who I am when the IDE is closed — 
            the places I explore, the trails I chase, and the stories I collect along the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex items-center gap-6 text-xs uppercase tracking-[0.15em] text-[#555] font-dm"
          >
            <span>Traveller</span>
            <span className="w-1 h-1 rounded-full bg-[#444]" />
            <span>Explorer</span>
            <span className="w-1 h-1 rounded-full bg-[#444]" />
            <span>Creator</span>
          </motion.div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-[1px] bg-gradient-to-r from-[#E84430]/40 via-white/10 to-transparent origin-left"
            />
          </div>
        </div>
      </motion.section>

      {/* KnowMe content section */}
      <KnowMe />

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 mb-16 text-center"
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
          <p className="font-dm text-lg text-white/40 mb-8">
            Want to work together on something?
          </p>
          <Link
            to="/"
            onClick={() => {
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white/70 font-dm text-sm tracking-wide hover:border-[#E84430]/50 hover:text-white hover:bg-[#E84430]/5 transition-all duration-300"
          >
            Let's Talk
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
