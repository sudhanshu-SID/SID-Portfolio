import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

/* ── Heading Words & Gradient Tokens ────────────────────────────── */
const LINE_1_WORDS = [
  { text: 'Got', color: '#FFFFFF' },
  { text: 'a', color: '#FFFFFF' },
  { text: 'project', color: '#FFFFFF' },
  { text: 'in', color: '#FFFFFF' },
  { text: 'mind?', color: '#FFFFFF' },
];

const LINE_2_WORDS = [
  { text: "Let's", gradient: 'linear-gradient(to right, #E84430, #ED5E4E)' },
  { text: 'build', gradient: 'linear-gradient(to right, #ED5E4E, #F49285)' },
  { text: 'it', gradient: 'linear-gradient(to right, #F49285, #FBC7C0)' },
  { text: 'together.', gradient: 'linear-gradient(to right, #FBC7C0, #FFFFFF)' },
];

const TOTAL_WORDS = LINE_1_WORDS.length + LINE_2_WORDS.length;
const START_OFFSET = 0.05;
const END_OFFSET = 0.85;
const STEP = (END_OFFSET - START_OFFSET) / TOTAL_WORDS;
const WINDOW = STEP * 2.2;

/* ── Single Revealed Word ───────────────────────────────────────── */
const RevealWord = React.memo(function RevealWord({
  text,
  color,
  gradient,
  progress,
  rangeStart,
  rangeEnd,
  reducedMotion,
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.15, 1]);
  const y = useTransform(progress, [rangeStart, rangeEnd], [12, 0]);

  const style = {
    opacity: reducedMotion ? 1 : opacity,
    y: reducedMotion ? 0 : y,
    display: 'inline-block',
  };

  if (gradient) {
    style.backgroundImage = gradient;
    style.WebkitBackgroundClip = 'text';
    style.WebkitTextFillColor = 'transparent';
    style.color = 'transparent';
  } else {
    style.color = color || '#FFFFFF';
  }

  return (
    <motion.span style={style} className="mr-[0.28em] last:mr-0 inline-block">
      {text}
    </motion.span>
  );
});

export default function Footer() {
  const reducedMotion = useReducedMotion();
  const headingRef = useRef(null);

  /* Scroll progress tracked directly as the headline ascends into the viewport */
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 92%', 'start 28%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.0005,
  });

  const subtextOpacity = useTransform(smoothProgress, [0.75, 0.95], [0.35, 1]);
  const subtextY = useTransform(smoothProgress, [0.75, 0.95], [10, 0]);

  return (
    <footer
      id="contact"
      className="relative z-30 w-full min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-10 sm:pt-16 pb-8 sm:pb-12 bg-[#1e1e24] border-t border-white/10 group select-none shadow-[0_-30px_70px_rgba(0,0,0,0.9)]"
    >
      {/* ═══════ TOP SECTION: Full Headline & CTA ═══════ */}
      <div className="pt-4 sm:pt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
        {/* Left: Full Headline & Description */}
        <div className="max-w-4xl" ref={headingRef}>
          <h2 className="font-syne font-extrabold text-[clamp(2.5rem,5.8vw,5.5rem)] leading-[0.92] tracking-tight">
            {/* Line 1: Crisp White */}
            <span className="block mb-1">
              {LINE_1_WORDS.map((item, idx) => {
                const i = idx;
                const start = START_OFFSET + i * STEP;
                const end = Math.min(start + WINDOW, 1.0);
                return (
                  <RevealWord
                    key={`l1-${item.text}-${idx}`}
                    text={item.text}
                    color={item.color}
                    progress={smoothProgress}
                    rangeStart={start}
                    rangeEnd={end}
                    reducedMotion={reducedMotion}
                  />
                );
              })}
            </span>

            {/* Line 2: Coral-Red to White Gradient */}
            <span className="block not-italic">
              {LINE_2_WORDS.map((item, idx) => {
                const i = LINE_1_WORDS.length + idx;
                const start = START_OFFSET + i * STEP;
                const end = Math.min(start + WINDOW, 1.0);
                return (
                  <RevealWord
                    key={`l2-${item.text}-${idx}`}
                    text={item.text}
                    gradient={item.gradient}
                    progress={smoothProgress}
                    rangeStart={start}
                    rangeEnd={end}
                    reducedMotion={reducedMotion}
                  />
                );
              })}
            </span>
          </h2>

          <motion.p
            style={{
              opacity: reducedMotion ? 1 : subtextOpacity,
              y: reducedMotion ? 0 : subtextY,
            }}
            className="font-dm text-sm sm:text-base text-white/60 max-w-xl leading-relaxed mt-5 sm:mt-7"
          >
            Whether you need a full–stack web application, an experimental interactive UI, or a modern digital redesign — I&apos;m always excited to collaborate.
          </motion.p>
        </div>

        {/* Right: CTA Button */}
        <motion.a
          href="mailto:sudhanshu7536@gmail.com"
          style={{
            opacity: reducedMotion ? 1 : subtextOpacity,
            y: reducedMotion ? 0 : subtextY,
          }}
          whileHover={reducedMotion ? undefined : { scale: 1.05 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-accent text-white font-dm font-semibold text-sm sm:text-base tracking-wide shadow-[0_0_35px_rgba(232,68,48,0.5)] hover:shadow-[0_0_55px_rgba(232,68,48,0.8)] transition-shadow whitespace-nowrap self-start lg:self-auto cursor-pointer"
        >
          Start a Conversation
        </motion.a>
      </div>

      {/* ═══════ BOTTOM SECTION: Copyright & Socials (Always visible) ═══════ */}
      <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 w-full">
        {/* Left: Info Bar */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs sm:text-sm text-[#888888] font-dm">
          <span>© {new Date().getFullYear()} SID.</span>
          <span className="text-white/20">•</span>
          <span className="text-white/75 font-medium">FULL STACK DEVELOPER</span>
          <span className="text-white/20">•</span>
          <span>A WANNA BE CREATOR</span>
        </div>

        {/* Right: Social Icons & Email */}
        <div className="flex items-center gap-5 sm:gap-6 text-sm">
          <motion.a
            href="https://www.instagram.com/hey_sid____?igsh=MXZmdHpwc2I0ZzVydw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            whileHover={reducedMotion ? undefined : { scale: 1.25, color: '#E84430' }}
            className="text-[#888888] hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/ranjan-sudhanshu/"
            target="_blank"
            rel="noreferrer"
            whileHover={reducedMotion ? undefined : { scale: 1.25, color: '#E84430' }}
            className="text-[#888888] hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </motion.a>
          <motion.a
            href="https://github.com/sudhanshu-SID"
            target="_blank"
            rel="noreferrer"
            whileHover={reducedMotion ? undefined : { scale: 1.25, color: '#E84430' }}
            className="text-[#888888] hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </motion.a>

          <a
            href="mailto:sudhanshu7536@gmail.com"
            className="text-[#888888] hover:text-accent transition-colors font-dm text-xs sm:text-sm ml-1 sm:ml-2"
          >
            ✉ sudhanshu7536@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
