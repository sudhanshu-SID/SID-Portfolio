import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// ── Project images ──────────────────────────────────────
import imgArtVault from '../assets/project-artvault.png';
import imgWanderLog from '../assets/project-wanderlog.png';
import imgDataPulse from '../assets/project-datapulse.png';

// ── Project data ────────────────────────────────────────
const projects = [
  {
    id: '01',
    title: 'ArtVault',
    year: '2024',
    category: 'E-commerce · Art Platform',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    href: '#',
    image: imgArtVault,
  },
  {
    id: '02',
    title: 'WanderLog',
    year: '2024',
    category: 'SaaS · Travel · Journaling',
    tech: ['React', 'Supabase', 'Framer Motion', 'MapboxGL'],
    href: '#',
    image: imgWanderLog,
  },
  {
    id: '03',
    title: 'DataPulse',
    year: '2025',
    category: 'Dashboard · Data Viz',
    tech: ['React', 'Zustand', 'WebSocket', 'Recharts'],
    href: '#',
    image: imgDataPulse,
  },
];

// ── Cursor-following image reveal ───────────────────────
function CursorImage({ image, isVisible }) {
  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-delayed values for the "lag" effect
  const springX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.5 });

  // Track the mouse within the parent container
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0"
    >
      <AnimatePresence>
        {isVisible && image && (
          <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none"
            style={{
              x: springX,
              y: springY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 5 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-[320px] md:w-[400px] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Single project row ──────────────────────────────────
function ProjectRow({ project, index, onHoverStart, onHoverEnd, isActive }) {
  return (
    <motion.a
      href={project.href}
      className="group relative block border-b border-white/[0.07] last:border-b-0"
      onMouseEnter={() => onHoverStart(index)}
      onMouseLeave={onHoverEnd}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-8 md:py-10 flex items-center justify-between gap-6 transition-colors duration-300">
        {/* Left: number + title */}
        <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
          <span className="font-syne font-extrabold text-accent/40 text-sm md:text-base tracking-tight transition-colors duration-300 group-hover:text-accent">
            {project.id}
          </span>
          <h3
            className={`font-syne font-bold text-[clamp(1.6rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.03em] transition-all duration-500 ${
              isActive
                ? 'text-white translate-x-2'
                : 'text-white/70 translate-x-0'
            }`}
          >
            {project.title}
          </h3>
        </div>

        {/* Center: category (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-[#555] font-dm transition-colors duration-300 group-hover:text-[#888]">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#444]" />
          <span>{project.year}</span>
        </div>

        {/* Right: arrow */}
        <div className="flex-shrink-0 flex items-center gap-3">
          {/* Tech pills (hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-2 mr-4">
            {project.tech.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-widest text-[#444] border border-[#222] rounded-full px-2.5 py-0.5 transition-colors duration-300 group-hover:text-[#888] group-hover:border-[#333]"
              >
                {t}
              </span>
            ))}
          </div>

          <motion.div
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/5"
            animate={isActive ? { x: 4, scale: 1.1 } : { x: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-4 h-4 text-white/40 transition-colors duration-300 group-hover:text-accent"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/[0.03] via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

// ── Main Projects section ───────────────────────────────
export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  // Raw mouse position (relative to the projects container)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-delayed position for the smooth "lag" effect
  const springConfig = { stiffness: 220, damping: 28, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const currentImage =
    hoveredIndex !== null ? projects[hoveredIndex]?.image : null;

  return (
    <motion.section
      id="work"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-32 lg:py-44"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 md:mb-20">
        <div className="flex items-end justify-between gap-8">
          <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,5rem)] tracking-tighter3 text-white">
            Selected Work.
          </h2>
          <div className="text-sm tracking-[0.12em] uppercase text-[#888888] font-dm">
            [ 2024 — 2025 ]
          </div>
        </div>
      </div>

      {/* Project list with cursor-following image */}
      <div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMouseMove}
      >
        {/* Top border */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-[1px] bg-white/[0.07]" />
        </div>

        {/* Project rows */}
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            onHoverStart={setHoveredIndex}
            onHoverEnd={() => setHoveredIndex(null)}
            isActive={hoveredIndex === index}
          />
        ))}

        {/* Cursor-following reveal image */}
        <AnimatePresence>
          {hoveredIndex !== null && currentImage && (
            <motion.div
              className="absolute top-0 left-0 z-40 pointer-events-none"
              style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 8 }}
              transition={{
                opacity: { duration: 0.25 },
                scale: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                rotate: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            >
              <div className="w-[300px] md:w-[380px] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl shadow-black/70 border border-white/[0.08] ring-1 ring-accent/10">
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* View all projects link */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16">
        <motion.a
          href="#"
          className="group inline-flex items-center gap-4"
          whileHover={{ x: 6 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-dm text-sm tracking-wide text-white/60 group-hover:text-white transition-colors duration-300">
            View all projects
          </span>
          <span className="block h-[1.5px] w-8 bg-accent/40 origin-left transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
        </motion.a>
      </div>
    </motion.section>
  );
}
