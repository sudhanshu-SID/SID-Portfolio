import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function TagPill({ children }) {
  return (
    <span className="text-xs uppercase tracking-widest text-[#555555] border border-[#333333] rounded-full px-3 py-1">
      {children}
    </span>
  );
}

export default function ProjectCard({ project }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
          {/* Oversized background project number (depth cue) */}
          <span
            aria-hidden="true"
            className="hidden lg:block absolute -top-10 left-0 font-syne font-extrabold text-[20rem] leading-none text-accent opacity-[0.03] pointer-events-none"
          >
            {project.number}
          </span>

          {/* Sticky left metadata column */}
          <div className="relative lg:sticky lg:top-1/2 lg:-translate-y-1/2">
            <div className="flex items-center gap-4">
              <div className="font-syne font-extrabold text-accent text-[2.25rem] tracking-tighter2">
                {project.number}
              </div>
              <div className="h-[1px] flex-1 bg-[#222222]" />
            </div>

            <h3 className="mt-6 font-syne font-bold text-[2.5rem] leading-[1.05] tracking-tighter3 text-white">
              {project.title}
            </h3>

            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <div className="text-xs uppercase tracking-[0.12em] text-[#888888] font-dm">{project.year}</div>
              <div className="w-[3px] h-[3px] rounded-full bg-[#444444]" />
              <div className="text-xs uppercase tracking-[0.12em] text-[#888888] font-dm">{project.category}</div>
            </div>

            <p className="mt-6 font-dm font-[300] text-[1rem] leading-relaxed text-[#888888]">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TagPill key={t}>{t}</TagPill>
              ))}
            </div>

            <motion.a
              href={project.href}
              className="mt-8 inline-flex items-center gap-3 group"
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -2,
                    }
              }
            >
              <span className="font-dm font-medium text-white/90 text-sm tracking-wide">
                View Case Study →
              </span>
              <span className="block h-[2px] bg-accent w-8 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
          </div>

          {/* Right "mockup image" column */}
          <div className="flex items-center justify-end">
            <motion.div
              className="w-full lg:max-w-[520px] aspect-[4/3] rounded-2xl overflow-hidden border border-[#222222] relative"
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.02,
                    }
              }
              style={{ willChange: 'transform' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: project.background,
                }}
              />

              <div className="absolute inset-0" style={{ backgroundImage: project.accentOverlay }} />
              <motion.div
                className="absolute inset-0 rounded-2xl border border-accent opacity-0 pointer-events-none"
                whileHover={reducedMotion ? undefined : { opacity: 1 }}
                transition={{ duration: 0.25 }}
              />

              <div className="relative w-full h-full p-8 flex flex-col justify-between">
                <div className="text-[#333333] font-syne font-bold text-3xl tracking-tight">
                  {project.placeholderLabel}.
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.12em] text-[#888888] font-dm">
                    {project.mockupLabel}
                  </div>
                  <div className="w-10 h-10 rounded-xl border border-[#222222] bg-[#0F0F0F]/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

