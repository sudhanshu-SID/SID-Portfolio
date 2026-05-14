import { motion } from 'framer-motion';
import useScrollProgress from '../hooks/useScrollProgress.js';

export default function ScrollProgress() {
  const scaleX = useScrollProgress();

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[4px] bg-accent z-[9999]"
      aria-hidden="true"
    />
  );
}

