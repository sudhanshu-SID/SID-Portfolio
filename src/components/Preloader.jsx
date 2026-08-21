import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

/* Multilingual greetings. Latin scripts render in the cursive display face
   (Dancing Script); other scripts gracefully fall back to the OS's native
   font — a per-script cursive set for every language would be heavy and would
   fight the site's performance budget. English bookends the sequence so the
   word that zooms into the portfolio is legible to most visitors. */
const GREETINGS = [
  'Hello',       // English
  'नमस्ते',       // Hindi
  'Bonjour',     // French
  'こんにちは',    // Japanese
  'Hola',        // Spanish
  '안녕하세요',     // Korean
  'Ciao',        // Italian
  'Привет',      // Russian
  '你好',         // Chinese
  'Hallo',       // German
  'مرحبا',       // Arabic
  'Hello',       // English (finale — this word zooms in)
];

const HOLD = 190; // ms between greetings while cycling (fast cross-dissolve)
const FINAL_HOLD = 600; // ms to rest on the last greeting before the zoom
const SESSION_KEY = 'sid_preloaded';

const CURSIVE = "'Dancing Script', system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function Preloader() {
  const lenis = useLenis();

  // Decide up-front whether to play: skip for reduced-motion users and for
  // anyone who has already seen it this tab session.
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      return sessionStorage.getItem(SESSION_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const isLast = index === GREETINGS.length - 1;

  // Lock scrolling while the preloader is up; release it otherwise.
  useEffect(() => {
    if (!lenis) return;
    if (visible) lenis.stop();
    else lenis.start();
  }, [visible, lenis]);

  // On mount: pin to top if playing; if skipping, record the flag so it stays skipped.
  useEffect(() => {
    if (visible) {
      window.scrollTo(0, 0);
    } else {
      try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch { /* ignore */ }
    }
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive the greeting cycle, then trigger the zoom finale on the last word.
  useEffect(() => {
    if (!visible || zoom) return;

    if (isLast) {
      const t = setTimeout(() => setZoom(true), FINAL_HOLD);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), HOLD);
    return () => clearTimeout(t);
  }, [index, isLast, visible, zoom]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: zoom ? 0 : 1 }}
          transition={{
            duration: zoom ? 0.85 : 0.3,
            ease: [0.76, 0, 0.24, 1],
            delay: zoom ? 0.2 : 0, // let the word start zooming before the veil lifts
          }}
          onAnimationComplete={() => {
            if (zoom) {
              try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch { /* ignore */ }
              setVisible(false);
            }
          }}
        >
          {/* Greetings cross-dissolve in place (absolute-centered so they overlap) */}
          <div className="relative flex items-center justify-center w-full h-full">
            <AnimatePresence>
              <motion.span
                key={index}
                className="absolute text-6xl sm:text-7xl md:text-8xl font-bold tracking-wide text-center px-6 select-none"
                style={{
                  fontFamily: CURSIVE,
                  color: '#F5F5F5',
                  willChange: 'transform, opacity, filter',
                }}
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                animate={
                  zoom
                    ? { opacity: 0, scale: 15, filter: 'blur(3px)' }
                    : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                }
                exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
                transition={
                  zoom
                    ? { duration: 1.0, ease: [0.7, 0, 0.3, 1] }
                    : { duration: 0.32, ease: 'easeOut' }
                }
              >
                {GREETINGS[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
