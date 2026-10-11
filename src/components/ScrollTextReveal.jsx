import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import NameBadge from './NameBadge';

/* ── colour tokens ──────────────────────────────────────────────── */
const RED = '#E84430';
const WHITE = '#FFFFFF';

/* ── text segments ──────────────────────────────────────────────── *
 *  Each segment has: text, revealed colour, and optional styling.
 *  Set `newParagraph: true` on the first segment of a new paragraph
 *  to insert a visual break before it.
 * ───────────────────────────────────────────────────────────────── */
const SEGMENTS = [
  // — Paragraph 1 —
  { text: "I'm a", color: WHITE },
  { text: "full stack developer", color: RED, bold: true },
  { text: "who loves experimenting with good UI designs and interactive experiences. I don't just write code; I", color: WHITE },
  { text: "vibe with it.", color: RED, italic: true },
  { text: "I take an idea, an inspiration, or a blank screen and shape it into polished, living software.", color: WHITE },

  // — Paragraph 2 —
  { text: "I'm always exploring — whether that's a new design trend, an emerging technology, or a completely new destination. That same energy I bring to", color: WHITE, newParagraph: true },
  { text: "travel content creation:", color: RED, bold: true },
  { text: "telling stories through places, people, and perspectives I collect along the way.", color: WHITE },

  // — Paragraph 3 —
  { text: "At the core of it all, I'm a", color: WHITE, newParagraph: true },
  { text: "creator.", color: RED, bold: true },
  { text: "I build robust applications. I craft intuitive UI designs. I create experiences. And I'm", color: WHITE },
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

/* ── single word ────────────────────────────────────────────────── *
 *  Reveal animates OPACITY (+ a small lift), never `color` — opacity
 *  and transform are compositor-friendly, whereas per-frame `color`
 *  changes force a text repaint on every word every frame. The colour
 *  is static; at ~0.14 opacity on black, a dim red and a dim grey are
 *  visually indistinguishable, so the dim→bright look is preserved.
 * ───────────────────────────────────────────────────────────────── */
const Word = React.memo(function Word({
  word,
  targetColor,
  progress,
  rangeStart,
  rangeEnd,
  bold,
  italic,
  breakBefore,
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.14, 1]);
  const y = useTransform(progress, [rangeStart, rangeEnd], [6, 0]);

  return (
    <>
      {/* Paragraph break — renders a full-width spacer */}
      {breakBefore && <span className="block mt-2 sm:mt-3.5 md:mt-5" aria-hidden="true" />}
      <motion.span
        style={{
          opacity,
          y,
          color: targetColor,
          display: 'inline-block',
          fontWeight: bold ? 800 : undefined,
          fontStyle: italic ? 'italic' : undefined,
        }}
        className="mr-[0.22em] sm:mr-[0.3em] font-syne font-bold text-[13px] xs:text-[14px] sm:text-[1.12rem] md:text-[1.3rem] lg:text-[1.5rem] leading-[1.4] sm:leading-[1.3] tracking-tight"
      >
        {word}
      </motion.span>
    </>
  );
});

/* ── section ────────────────────────────────────────────────────── */
export default function ScrollTextReveal({ className = '' }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  /* Spring-smoothed driver: the reveal glides and eases *through* scroll
     micro-stutters instead of tracking raw scroll 1:1, and it absorbs any
     phase mismatch between Lenis and Framer Motion → buttery. Slightly
     overdamped so it never overshoots/jiggles. */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0005,
  });

  const words = useMemo(() => buildWords(SEGMENTS), []);
  const total = words.length;

  const START = 0.08;
  const END = 0.72;
  const step = (END - START) / total; // spacing between consecutive word starts
  const WINDOW = step * 6; // each word reveals over ~6 steps → neighbours overlap → soft wave

  /* CTA fades in right after the last word fills */
  const ctaOpacity = useTransform(smooth, [0.72, 0.86], [0, 1]);
  const ctaY = useTransform(smooth, [0.72, 0.86], [16, 0]);

  return (
    <section
      ref={containerRef}
      id="intro"
      className={`relative z-10 h-[175vh] sm:h-[150vh] bg-black ${className}`}
    >
      {/* Sticky frame — stays pinned for scroll duration */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full h-full flex flex-col justify-center">
          {/* Hanging ID Badge - Hidden on mobile */}
          <div className="hidden sm:block">
            <NameBadge />
          </div>

          {/* ── // Intro label — Strictly pinned to TOP LEFT for ALL screen sizes ── */}
          <div className="absolute top-20 sm:top-24 left-6 sm:left-10 md:left-14 lg:left-16 z-30 pointer-events-auto">
            <span className="intro-label font-dm text-xs sm:text-sm md:text-base tracking-wide select-none cursor-pointer">
              // Intro
            </span>
          </div>

          {/* ── Centered content — shifted right to avoid badge on desktop ── */}
          <div
            className="w-full flex items-center justify-center px-5 sm:px-6 pt-24 sm:pt-0 pb-6 sm:pb-0 md:pl-[250px] lg:pl-[350px] lg:pr-12"
          >
            <div style={{ width: '100%', maxWidth: '52rem' }}>

              {/* Scroll-revealed paragraphs */}
              <div
                className="select-none"
                style={{ lineHeight: 1.35, wordBreak: 'normal', overflowWrap: 'normal' }}
              >
                {words.map((w, i) => {
                  const start = START + i * step;
                  const end = Math.min(start + WINDOW, 1);
                  return (
                    <Word
                      key={`${w.word}-${i}`}
                      word={w.word}
                      targetColor={w.targetColor}
                      progress={smooth}
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
                className="mt-4 sm:mt-7 md:mt-9"
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-3 rounded-full border border-white/15 text-white/60 text-xs sm:text-sm font-dm tracking-wide hover:border-white/40 hover:text-white transition-all duration-300"
                >
                  See my Projects
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
