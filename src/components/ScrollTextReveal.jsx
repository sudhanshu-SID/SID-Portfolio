import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NameBadge from './NameBadge';

/* ── colour tokens ──────────────────────────────────────────────── */
const RED = '#E84430';
const WHITE = '#FFFFFF';
const DIMMED = 'rgba(255,255,255,0.12)';

/* ── text segments ──────────────────────────────────────────────── *
 *  Each segment has: text, revealed colour, and optional styling.
 *  Set `newParagraph: true` on the first segment of a new paragraph
 *  to insert a visual break before it.
 * ───────────────────────────────────────────────────────────────── */
const SEGMENTS = [
  // — Paragraph 1 —
  { text: "I'm a", color: WHITE },
  { text: "website designer and developer", color: RED, bold: true },
  { text: "with a deep love for the frontend — the part of the web you feel. I don't just write code; I", color: WHITE },
  { text: "vibe with it.", color: RED, italic: true },
  { text: "I take an idea, an inspiration, or a blank screen and shape it into something real and visual.", color: WHITE },

  // — Paragraph 2 —
  { text: "I'm always exploring — whether that's a new design trend, an emerging technology, or a completely new destination. That same energy I bring to", color: WHITE, newParagraph: true },
  { text: "travel content creation:", color: RED, bold: true },
  { text: "telling stories through places, people, and perspectives I collect along the way.", color: WHITE },

  // — Paragraph 3 —
  { text: "At the core of it all, I'm a", color: WHITE, newParagraph: true },
  { text: "creator.", color: RED, bold: true },
  { text: "I create websites. I create content. I create experiences. And I'm", color: WHITE },
  { text: "just getting started.", color: RED, italic: true },
];

/** Flatten segments → array of word objects with styling metadata */
function buildWords(segments) {
  const words = [];
  segments.forEach((seg) => {
    const segWords = seg.text.split(/\s+/).filter(Boolean);
    segWords.forEach((w, idx) =>
      words.push({
        word: w,
        targetColor: seg.color,
        bold: seg.bold || false,
        italic: seg.italic || false,
        breakBefore: idx === 0 && seg.newParagraph,
      }),
    );
  });
  return words;
}

/* ── single word ────────────────────────────────────────────────── */
function Word({ word, targetColor, scrollYProgress, rangeStart, rangeEnd, bold, italic, breakBefore }) {
  const color = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    [DIMMED, targetColor],
  );

  return (
    <>
      {/* Paragraph break — renders a full-width spacer */}
      {breakBefore && <span className="block mt-4 md:mt-5" aria-hidden="true" />}
      <motion.span
        style={{
          color,
          display: 'inline-block',
          fontWeight: bold ? 800 : undefined,
          fontStyle: italic ? 'italic' : undefined,
        }}
        className="mr-[0.3em] font-syne font-bold text-lg md:text-[1.3rem] lg:text-[1.5rem] leading-[1.3] tracking-tight"
      >
        {word}
      </motion.span>
    </>
  );
}

/* ── section ────────────────────────────────────────────────────── */
export default function ScrollTextReveal({ className = '' }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const words = buildWords(SEGMENTS);
  const total = words.length;

  /*
   * h-[200vh] → 100vh of scroll while pinned.
   * Words fill 0% → 82% (≈ 82vh of scrolling — gives time to read).
   * CTA appears at 84–92%.
   * Section releases at 100% — only ~8vh of dead space after CTA.
   */
  const START = 0.0;
  const END = 0.82;
  const range = END - START;
  const wordSlice = range / total;

  /* CTA fades in right after the last word fills */
  const ctaOpacity = useTransform(scrollYProgress, [0.84, 0.92], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.84, 0.92], [20, 0]);

  return (
    <section
      ref={containerRef}
      id="intro"
      className={`relative z-10 h-[200vh] bg-black ${className}`}
    >
      {/* Sticky frame — stays pinned for 100vh of scroll */}
      <div
        className="sticky top-0 h-screen w-full"
        style={{ overflow: 'clip' }}
      >
        <div className="relative w-full h-full">
        {/* Hanging ID Badge - Hidden on mobile */}
        <div className="hidden sm:block">
          <NameBadge />
        </div>

        {/* ── // Intro label — top left ── */}
        <span
          className="intro-label absolute font-dm text-sm sm:text-base md:text-lg tracking-wide select-none cursor-pointer top-[40px] left-[20px] sm:top-[80px] sm:left-[80px] hidden sm:block"
        >
          // Intro
        </span>

        {/* ── Centered content — shifted right to avoid badge ── */}
        <div
          className="h-full w-full flex items-center justify-center px-6 pt-[120px] sm:pt-0 md:pl-[250px] lg:pl-[350px] lg:pr-12"
        >
          <div style={{ width: '100%', maxWidth: '52rem' }}>

            {/* Scroll-revealed paragraphs */}
            <div
              className="select-none"
              style={{ lineHeight: 1.3, wordBreak: 'normal', overflowWrap: 'normal' }}
            >
              {words.map((w, i) => {
                const start = START + i * wordSlice;
                const end = start + wordSlice;
                return (
                  <Word
                    key={`${w.word}-${i}`}
                    word={w.word}
                    targetColor={w.targetColor}
                    scrollYProgress={scrollYProgress}
                    rangeStart={start}
                    rangeEnd={end}
                    bold={w.bold}
                    italic={w.italic}
                    breakBefore={w.breakBefore}
                  />
                );
              })}
            </div>

            {/* CTA button — fades in after all words are filled */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="mt-10"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/15 text-white/60 text-sm font-dm tracking-wide hover:border-white/40 hover:text-white transition-all duration-300"
              >
                See my Work
                <svg
                  className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
