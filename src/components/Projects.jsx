import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

// ── Project images ──────────────────────────────────────
import { getCloudinaryUrl } from '../utils/cloudinary';

// ── Project data ────────────────────────────────────────
const projects = [
  {
    id: '01',
    title: 'YumeCav',
    year: '2025',
    category: 'E-commerce · Posters & Stickers',
    tech: ['React', 'TypeScript', 'Supabase', 'Razorpay'],
    href: '#',
    image: getCloudinaryUrl('Project-yumecav'),
    description: 'Fully customised high-quality posters & stickers e-commerce platform with aesthetic GenZ-targeted design, B2B support, Razorpay payments & Shiprocket logistics.',
  },
  {
    id: '02',
    title: 'The Ideal Firm',
    year: '2025',
    category: 'Corporate · Digital Marketing',
    tech: ['React', 'TypeScript'],
    href: '#',
    image: getCloudinaryUrl('Project-TheidealFirm'),
    description: 'Static corporate site showcasing digital marketing services with WhatsApp & form integration for seamless client inquiries.',
  },
  {
    id: '03',
    title: 'RideWheelz',
    year: '2025',
    category: 'Vehicle Rental · Travel',
    tech: ['WordPress', 'PHP', 'CSS'],
    href: '#',
    image: getCloudinaryUrl('Project-RizeWheelz'),
    description: 'Vehicle rental platform with integrated travel plans, built for a self-drive rental business in Guwahati.',
  },
  {
    id: '04',
    title: 'The Country Wheels',
    year: '2025',
    category: 'Vehicle Rental · Business',
    tech: ['WordPress', 'PHP', 'CSS'],
    href: '#',
    image: getCloudinaryUrl('Project-countryWheels'),
    description: 'Premium bike & car rental website enabling seamless bookings from home with extended rental hour options.',
  },
  {
    id: '05',
    title: 'Tredit',
    year: '2026',
    category: 'Travel · Community · In Progress',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    href: '#',
    image: getCloudinaryUrl('Project-Tredit'),
    description: 'A community-driven platform where travellers become contributors, sharing real-time travel insights and helping fellow explorers.',
    ongoing: true,
  },
  {
    id: '06',
    title: 'NutriTrack',
    year: '2025',
    category: 'Health · Personal Tool',
    tech: ['HTML', 'CSS', 'JavaScript'],
    href: '#',
    image: getCloudinaryUrl('project-nutriplan'),
    description: 'A personal calorie & nutrition tracker — add food items, view their nutritional values, and monitor your daily intake to stay on top of your health goals.',
    minor: true,
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
function ProjectRow({ project, index, onHoverStart, onHoverEnd, isActive, isMobile }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate('/projects')}
      className="group relative block border-b border-white/[0.07] last:border-b-0 cursor-pointer"
      onMouseEnter={() => !isMobile && onHoverStart(index)}
      onMouseLeave={() => !isMobile && onHoverEnd()}
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
        {/* Left: number + title + ongoing badge */}
        <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
          <span className="font-syne font-extrabold text-accent/40 text-sm md:text-base tracking-tight transition-colors duration-300 md:group-hover:text-accent">
            {project.id}
          </span>
          <h3
            className={`font-syne font-bold text-[clamp(1.6rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.03em] transition-all duration-500 ${isActive
                ? 'text-white translate-x-2'
                : 'text-white/70 translate-x-0'
              }`}
          >
            {project.title}
          </h3>
          {project.ongoing && (
            <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-dm font-medium text-emerald-400 border border-emerald-400/30 rounded-full px-3 py-1 bg-emerald-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Progress
            </span>
          )}
        </div>

        {/* Center: category (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-[#555] font-dm transition-colors duration-300 md:group-hover:text-[#888]">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#444]" />
          <span>{project.year}</span>
        </div>

        {/* Right: arrow */}
        <div className="flex-shrink-0 flex items-center gap-3">
          {/* Tech pills (hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-2 mr-4">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-widest text-[#444] border border-[#222] rounded-full px-2.5 py-0.5 transition-colors duration-300 md:group-hover:text-[#888] md:group-hover:border-[#333]"
              >
                {t}
              </span>
            ))}
          </div>

          <motion.div
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors duration-300 md:group-hover:border-accent/50 md:group-hover:bg-accent/5"
            animate={isActive ? { x: 4, scale: 1.1 } : { x: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-4 h-4 text-white/40 transition-colors duration-300 md:group-hover:text-accent"
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
    </motion.div>
  );
}

// ── Main Projects section ───────────────────────────────
export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Raw mouse position (relative to the projects container)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-delayed position for the smooth "lag" effect
  const springConfig = { stiffness: 220, damping: 28, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const currentImage =
    hoveredIndex !== null ? projects[hoveredIndex]?.image : null;

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-32 lg:py-44 bg-[#000000] z-30"
    >
      {/* Sticky section label — like // Intro */}
      <div className="sticky top-[76px] z-20 w-full bg-[#000000] pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-10">
          <span
            className="intro-label font-dm text-sm sm:text-base md:text-lg tracking-wide select-none cursor-pointer pointer-events-auto"
          >
            // Projects
          </span>
        </div>
      </div>

      {/* Year label */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 md:mb-16 mt-8 flex justify-end">
        <div className="text-sm tracking-[0.12em] uppercase text-[#888888] font-dm">
          [ 2025 — 2026 ]
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
            isMobile={isMobile}
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
        <Link to="/projects">
          <motion.div
            className="group inline-flex items-center gap-4"
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-dm text-sm tracking-wide text-white/60 group-hover:text-white transition-colors duration-300">
              View all projects
            </span>
            <span className="block h-[1.5px] w-8 bg-accent/40 origin-left transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
          </motion.div>
        </Link>
      </div>
    </motion.section>
  );
}
