import React from 'react';
import { motion } from 'framer-motion';
import useMagneticEffect from '../hooks/useMagneticEffect.js';

export default function MagneticButton({ children, href }) {
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.35);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center gap-3 bg-accent text-white font-medium px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition-colors duration-200 cursor-none"
    >
      {children}
    </motion.a>
  );
}

