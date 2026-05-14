import { useScroll, useTransform } from 'framer-motion';

export default function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 1], [0, 1]);
}

