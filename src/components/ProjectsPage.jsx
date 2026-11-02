import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// ── Project images ──────────────────────────────────────
import { getCloudinaryUrl } from '../utils/cloudinary';

const allProjects = [
  {
    id: '01',
    title: 'Get-it-done',
    year: '2026',
    category: 'Productivity',
    tagline: 'Anti-Procrastination Task Manager',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS'],
    video: getCloudinaryUrl('get-it-done_DEMO', 'video'),
    image: getCloudinaryUrl('get-it-done-poster', 'image'),
    href: 'https://github.com/sudhanshu-SID/Get-it-done',
    description:
      'A brutalist, anti-procrastination task manager designed for maximum focus, strict timeboxing, dynamic goals, and severe accountability systems with automated penalty strikes.',
    color: '#E84430',
  },
  {
    id: '02',
    title: 'YumeCav',
    year: '2025',
    category: 'E-commerce',
    tagline: 'Elevate Your Reality',
    tech: ['React', 'TypeScript', 'Supabase', 'Razorpay', 'Shiprocket'],
    video: getCloudinaryUrl('yumecav_demo', 'video'),
    image: getCloudinaryUrl('yumecav-poster', 'image'),
    description:
      'A fully customised e-commerce platform selling high-quality posters and stickers with an aesthetic design targeting GenZ audiences. Features B2B selling capabilities, Razorpay payment integration, and Shiprocket logistics. Deployed on Vercel.',
    color: '#9333ea',
  },
  {
    id: '03',
    title: 'The Ideal Firm',
    year: '2025',
    category: 'Corporate',
    tagline: 'Amplify Your Digital Presence',
    tech: ['React', 'TypeScript'],
    video: getCloudinaryUrl('Ideal_Firm_demo', 'video'),
    image: getCloudinaryUrl('Project-TheidealFirm'),
    description:
      'A clean, professional static site showcasing digital marketing services provided by the company. Integrated with WhatsApp for quick inquiries and a contact form for lead generation.',
    color: '#0ea5e9',
  },
  {
    id: '04',
    title: 'RideWheelz',
    year: '2025',
    category: 'Vehicle Rental',
    tagline: 'Rent. Drive. Discover.',
    tech: ['WordPress', 'PHP', 'CSS'],
    image: getCloudinaryUrl('Project-RizeWheelz'),
    description:
      'A vehicle rental platform with integrated travel plans, built for a self-drive rental business in Guwahati. Includes booking system and travel itinerary features.',
    color: '#f97316',
  },
  {
    id: '05',
    title: 'The Country Wheels',
    year: '2025',
    category: 'Vehicle Rental',
    tagline: 'Book Rides From Home',
    tech: ['WordPress', 'PHP', 'CSS'],
    image: getCloudinaryUrl('Project-countryWheels'),
    description:
      'Premium bike & car rental website enabling seamless bookings with extended rental hour options. Built with WordPress for easy content management by the business.',
    color: '#22c55e',
  },
];

/* ── Project Card ────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768 && window.matchMedia('(hover: hover)').matches && project.video) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && window.matchMedia('(hover: hover)').matches && project.video) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  const handleClick = () => {
    if (project.video) {
      const isMobile = window.innerWidth < 768 || window.matchMedia('(hover: none)').matches;
      if (isMobile) {
        if (isPlaying) {
          videoRef.current?.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
          videoRef.current?.play().catch(() => {});
        }
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, amount: 0.15 }}
      className="group relative"
    >
      {/* Media / Video / Image Container */}
      <div
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a] ${
          project.video ? 'cursor-pointer' : ''
        }`}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ y: imgY, scale: imgScale }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              draggable={false}
            />
          ) : (
            /* Gradient placeholder for projects without images */
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}08 50%, #0a0a0a 100%)`,
              }}
            >
              <div className="text-center">
                <div
                  className="font-syne font-extrabold text-6xl md:text-8xl tracking-tighter"
                  style={{ color: `${project.color}30` }}
                >
                  {project.title}
                </div>
                <div className="mt-4 font-dm text-sm text-white/30 tracking-wide">
                  {project.tagline}
                </div>
              </div>
            </div>
          )}

          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.image}
              loop
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 transition-transform duration-700 group-hover:scale-105 ${
                isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          )}
        </motion.div>

        {/* Center play icon for video projects when not playing */}
        {project.video && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl text-white/90 transition-transform duration-300 group-hover:scale-110">
              <svg className="w-5 h-5 md:w-6 md:h-6 translate-x-0.5 fill-current text-white/90" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Project number — large watermark */}
        <div
          className="absolute top-6 right-8 font-syne font-extrabold text-7xl md:text-9xl leading-none pointer-events-none transition-opacity duration-500 select-none"
          style={{ color: `${project.color}12` }}
        >
          {project.id}
        </div>

        {/* Ongoing badge */}
        {project.ongoing && (
          <div className="absolute top-6 left-6 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-dm font-medium text-emerald-400 border border-emerald-400/30 rounded-full px-3 py-1.5 bg-black/60 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Progress
            </span>
          </div>
        )}

        {/* Minor project badge */}
        {project.minor && (
          <div className="absolute top-6 left-6 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-dm font-medium text-white/50 border border-white/10 rounded-full px-3 py-1.5 bg-black/60 backdrop-blur-md">
              Personal Project
            </span>
          </div>
        )}

        {/* Video indicator badge */}
        {project.video && (
          <div className="absolute top-6 left-6 pointer-events-none">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-dm font-medium text-white/90 border border-white/20 rounded-full px-3.5 py-1.5 bg-black/60 backdrop-blur-md shadow-lg shadow-black/40">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#E84430] animate-pulse' : 'bg-white/40'}`} />
              <span className="hidden sm:inline">
                {isPlaying ? 'Live Demo Preview' : 'Hover for Video'}
              </span>
              <span className="inline sm:hidden">
                {isPlaying ? 'Live Demo Preview' : 'Tap for Video'}
              </span>
            </span>
          </div>
        )}

        {/* Bottom hover info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          <p className="font-dm text-sm text-white/80 leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
      </div>

      {/* Info below the image */}
      <div className="mt-6 flex items-start justify-between gap-6">
        {/* Left: Title, category, tagline */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-syne font-bold text-2xl md:text-3xl tracking-tight text-white group-hover:text-white transition-colors duration-300">
              {project.title}
            </h3>
            <div
              className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150"
              style={{ backgroundColor: project.color }}
            />
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-[#555] font-dm">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-[#444]" />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Right: Tech pills */}
        <div className="hidden md:flex items-center gap-2 flex-wrap justify-end flex-shrink-0">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-widest text-[#555] border border-[#222] rounded-full px-3 py-1 transition-colors duration-300 group-hover:text-[#888] group-hover:border-[#333]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile tech pills */}
      <div className="flex md:hidden items-center gap-2 flex-wrap mt-3">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] uppercase tracking-widest text-[#555] border border-[#222] rounded-full px-2.5 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Projects Page ───────────────────────────────────────── */
export default function ProjectsPage() {
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

          <span className="font-syne font-extrabold text-white tracking-[-0.03em] text-lg">
            SID.
          </span>
        </div>
      </div>

      {/* Hero section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-[76px] min-h-[60vh] md:min-h-[70vh] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-20 md:py-32">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="intro-label font-dm text-sm sm:text-base md:text-lg tracking-wide select-none cursor-pointer"
          >
            // All Projects
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 font-syne font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.04em] text-white"
          >
            Selected
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E84430] to-[#ff6b4a]">
              Projects.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 font-dm text-lg md:text-xl text-white/40 max-w-xl leading-relaxed"
          >
            A collection of websites, platforms, and tools I've designed and built — 
            from e-commerce to community-driven platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex items-center gap-6 text-xs uppercase tracking-[0.15em] text-[#555] font-dm"
          >
            <span>{allProjects.length} Projects</span>
            <span className="w-1 h-1 rounded-full bg-[#444]" />
            <span>2025 — 2026</span>
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

      {/* Projects grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-16 md:gap-24">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-32 mb-16 text-center"
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
