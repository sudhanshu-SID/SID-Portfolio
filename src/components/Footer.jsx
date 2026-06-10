import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="py-40 lg:py-56 bg-[#000000] z-30 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        {/* Row 1: Massive CTA */}
        <div className="flex items-end justify-between gap-10">
          <div className="font-syne font-extrabold text-[clamp(3rem,6.5vw,8rem)] leading-[0.95] tracking-tighter3 text-white">
            Got a project in mind? Let&apos;s build it together.
            <span className="inline-block ml-6">
              <motion.span
                whileHover={reducedMotion ? undefined : { x: 10 }}
                className="inline-block text-white/90"
              >
                →
              </motion.span>
            </span>
          </div>
        </div>

        {/* Row 2: Info bar */}
        <div className="mt-14 pt-8 border-t border-[#222] flex items-center justify-between gap-6 flex-col sm:flex-row">
          <div className="text-sm text-[#888888] font-dm">
            © 2025 SID. All rights reserved.
          </div>

          <div className="text-sm text-[#888888] font-dm">- A WANNA BE CREATOR</div>

          <div className="flex items-center gap-4 text-sm">
            <motion.a
              href="https://www.instagram.com/hey_sid____?igsh=MXZmdHpwc2I0ZzVydw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              whileHover={reducedMotion ? undefined : { scale: 1.2, color: '#E84430' }}
              className="text-[#888888] hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ranjan-sudhanshu/"
              target="_blank"
              rel="noreferrer"
              whileHover={reducedMotion ? undefined : { scale: 1.2, color: '#E84430' }}
              className="text-[#888888] hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </motion.a>
            <motion.a
              href="https://github.com/sudhanshu-SID"
              target="_blank"
              rel="noreferrer"
              whileHover={reducedMotion ? undefined : { scale: 1.2, color: '#E84430' }}
              className="text-[#888888] hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </motion.a>

            <a
              href="mailto:sudhanshu7536@gmail.com"
              className="text-[#888888] hover:text-accent transition-colors font-dm"
            >
              ✉ sudhanshu7536@gmail.com
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

