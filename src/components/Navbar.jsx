import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']);

  const [open, setOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: 'WORK', id: 'work' },
      { label: 'SERVICES', id: 'services' },
      { label: 'ABOUT', id: 'about' },
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

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      style={{ backgroundColor: navBg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[76px] flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-syne font-extrabold text-white tracking-[-0.03em] text-lg"
          aria-label="TD Home"
        >
          SID.
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
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
          ))}
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-white transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[100] bg-[#000]/95 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[76px] flex items-center justify-between">
              <div className="font-syne font-extrabold text-white tracking-[-0.03em] text-lg">TD.</div>
              <button
                type="button"
                className="p-2 rounded-md text-white/90 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24">
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      scrollToId(item.id);
                    }}
                    className="font-syne font-bold text-4xl leading-[1.05] text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-14 border-t border-[#222] pt-8 text-sm text-white/60">
                Minimal. Cinematic. Built for motion.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

