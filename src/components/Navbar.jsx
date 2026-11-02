import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

export default function Navbar() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']);

  // Only enable the (expensive) backdrop-blur once scrolled off the top, so it
  // isn't repainting the blurred strip over the hero every frame at rest.
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = useMemo(
    () => [
      { label: 'PROJECTS', id: 'projects', path: '/projects' },
      { label: 'KNOW ME', id: 'knowme', path: '/knowme' },
      { label: 'CONTACT', id: 'contact' },
    ],
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Disable scrolling on body when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const menuVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.15,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
        staggerChildren: 0.03,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: 15,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <motion.nav
        style={{ backgroundColor: open ? 'transparent' : navBg }}
        className={`fixed top-0 left-0 right-0 z-[110] border-b border-transparent transition-all duration-300 ${
          !open && scrolled ? 'backdrop-blur-md' : 'backdrop-blur-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[76px] flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-syne font-extrabold text-white tracking-[-0.03em] text-lg relative z-[120]"
            aria-label="TD Home"
          >
            SID.
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.path) {
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="relative font-dm text-sm tracking-[0.05em] text-white/90 hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.id);
                  }}
                  className="relative font-dm text-sm tracking-[0.05em] text-white/90 hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              );
            })}

            {/* Desktop View Stats (Resume) Icon Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Stats (Resume)"
              className="group relative w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-accent/60 flex items-center justify-center transition-all duration-300 shadow-sm ml-2"
            >
              <svg
                className="w-4 h-4 text-white/80 group-hover:text-accent transition-all duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>

              {/* Floating Tooltip */}
              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/10 text-[10px] font-dm font-semibold tracking-wider uppercase text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap shadow-xl">
                View Stats
              </span>
            </a>
          </div>

          {/* Mobile Right Controls: View Stats Icon Button + Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden relative z-[120]">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Stats (Resume)"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] active:scale-95 flex items-center justify-center transition-all shadow-sm"
            >
              <svg
                className="w-4 h-4 text-white/80 active:text-accent transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </a>

            {/* Animated Hamburger/Cross Menu Button */}
            <button
              type="button"
              className="flex flex-col items-center justify-center w-10 h-10 gap-[5px] focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-6 h-[2px] bg-white rounded-full block origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-6 h-[2px] bg-white rounded-full block origin-center"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-6 h-[2px] bg-white rounded-full block origin-center"
            />
          </button>
        </div>
      </div>
    </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              background: 'linear-gradient(180deg, rgba(28, 28, 30, 0.98) 0%, rgba(12, 12, 14, 0.99) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            className="fixed inset-0 z-[100] flex flex-col justify-between pt-28 pb-10 px-6 md:px-12"
          >
            {/* List Container */}
            <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full gap-4">
              {navItems.map((item, index) => {
                const num = String(index + 1).padStart(2, '0');
                const isActive = hoveredIndex === index;
                const Component = item.path ? MotionLink : motion.a;
                const linkProps = item.path
                  ? { to: item.path, onClick: () => setOpen(false) }
                  : {
                      href: `#${item.id}`,
                      onClick: (e) => {
                        e.preventDefault();
                        setOpen(false);
                        scrollToId(item.id);
                      },
                    };
                return (
                  <Component
                    key={item.id}
                    variants={itemVariants}
                    {...linkProps}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onTouchStart={() => setHoveredIndex(index)}
                    className="group relative block w-full border-b border-white/[0.07] py-5 overflow-hidden transition-all duration-300"
                  >
                    <div className="relative z-10 flex items-center justify-between w-full">
                      {/* Left: Number + Title */}
                      <div className="flex items-baseline gap-4">
                        <span className="font-dm font-bold text-accent/40 text-xs tracking-wider transition-colors duration-300 group-hover:text-accent">
                          {num}
                        </span>
                        <span
                          className={`font-dm font-semibold text-2xl tracking-wide uppercase transition-all duration-300 ${
                            isActive ? 'text-white translate-x-2' : 'text-white/70 translate-x-0'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* Right: Arrow in Circle */}
                      <div
                        className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'border-accent/50 bg-accent/5 text-accent' : 'text-white/30'
                        }`}
                      >
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-300"
                          style={{ transform: isActive ? 'translate(2px, -2px) scale(1.1)' : 'none' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>

                    {/* Underline Hover glow animation */}
                    <div
                      className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-accent to-transparent transition-all duration-500"
                      style={{ width: isActive ? '100%' : '0%' }}
                    />

                    {/* Hover background glow */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-accent/[0.04] via-transparent to-transparent pointer-events-none transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0 }}
                    />
                  </Component>
                );
              })}

              {/* Resume / View Stats card inside mobile drawer */}
              <motion.a
                variants={itemVariants}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group relative block w-full border border-accent/30 bg-accent/[0.06] hover:bg-accent/10 rounded-2xl p-4 overflow-hidden transition-all duration-300 mt-2"
              >
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/80">
                      <svg
                        className="w-4 h-4 text-white/80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <line x1="10" y1="9" x2="8" y2="9" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-dm font-bold text-lg tracking-wide uppercase text-white flex items-center gap-2">
                        VIEW STATS
                      </span>
                      <span className="block text-[10px] text-white/50 font-dm tracking-[0.14em] uppercase mt-0.5">
                        Resume
                      </span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Glowing line & tagline at footer */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-lg mx-auto mt-8 flex flex-col"
            >
              {/* Glowing Line */}
              <div className="glowing-line w-full mb-6" />

              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-dm">
                Minimal. Cinematic. Built for motion.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

