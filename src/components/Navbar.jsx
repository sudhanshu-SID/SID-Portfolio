import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

export default function Navbar() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']);

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
          open ? 'backdrop-blur-none' : 'backdrop-blur-md'
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
          </div>

          {/* Animated Hamburger/Cross Menu Button */}
          <button
            type="button"
            className="lg:hidden relative z-[120] flex flex-col items-center justify-center w-10 h-10 gap-[5px] focus:outline-none"
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

