import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function useMagneticEffect(strength = 0.35) {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(media.matches);

    const onChange = () => setEnabled(media.matches);
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, [reducedMotion]);

  const handleMouseMove = (e) => {
    if (!enabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, handleMouseMove, handleMouseLeave, enabled };
}

