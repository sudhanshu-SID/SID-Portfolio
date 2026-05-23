import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    text: 'Delivered a full-stack marketplace in 6 weeks. Attention to design detail and clean code made our launch seamless.',
    name: 'Arjun Mehta',
    role: 'CTO @ Stickrr',
  },
  {
    text: "Not just a developer — a thought partner. Helped us rethink our user flow entirely before writing a single line.",
    name: 'Priya Nair',
    role: 'Product Manager @ TravelHive',
  },
  {
    text: 'The dashboard exceeded every expectation. Real-time updates, zero lag, pixel-perfect UI.',
    name: 'Marcus Lee',
    role: 'Co-founder @ DataPulse',
  },
];

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(t);
  }, [reducedMotion]);

  return (
    <section
      id="about"
      className="py-40 lg:py-56 bg-[#000000] z-30 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        <div className="mt-14 flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="font-syne font-bold text-[1.7rem] leading-[1.3] tracking-tighter2 text-white">
                  &ldquo;{testimonials[index].text}&rdquo;
                </div>

                <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                  <div className="font-dm text-white/90 text-sm">
                    <span className="font-[500]">{testimonials[index].name}</span> <span className="text-[#888888]">— {testimonials[index].role}</span>
                  </div>
                  <div className="text-[#888888] tracking-[0.2em]">★★★★★</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

