import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';

const TECHS = [
  { name: 'React', icon: '⚛', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
  { name: 'HTML5', icon: '5', color: '#E34F26' },
  { name: 'CSS3', icon: '3', color: '#1572B6' },
  { name: 'WordPress', icon: 'W', color: '#21759B' },
  { name: 'MySQL', icon: 'DB', color: '#4479A1' },
  { name: 'C', icon: 'C', color: '#A8B9CC' },
  { name: 'C++', icon: 'C++', color: '#00599C' },
  { name: 'Git', icon: 'Git', color: '#F05032' },
  { name: 'GitHub', icon: 'GH', color: '#FFFFFF' },
  { name: 'Framer', icon: 'Fr', color: '#0055FF' },
];

const TechCard = ({ t, reducedMotion }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current || reducedMotion) return;
    const r = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setTransformStyle(`perspective(750px) rotateX(${-dy * 15}deg) rotateY(${dx * 15}deg) scale(1.07) translateZ(10px)`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('');
  };

  return (
    <div
      ref={cardRef}
      className="tech-card relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-[18px] flex flex-col items-center justify-center gap-[8px] overflow-hidden cursor-pointer"
      style={{
        '--c': t.color,
        background: 'rgba(255,255,255,0.028)',
        border: `1px solid ${isHovered ? t.color + '55' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: isHovered ? `0 0 0 1px ${t.color}44, 0 24px 64px rgba(0,0,0,.65), inset 0 0 30px rgba(255,255,255,.02)` : 'none',
        transform: transformStyle,
        transition: isHovered ? 'border-color .3s ease, box-shadow .3s ease' : 'border-color .35s ease, box-shadow .35s ease, transform .45s cubic-bezier(.34,1.4,.64,1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-top-edge absolute top-0 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div
        className={`orb absolute w-[70px] h-[70px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-45' : 'opacity-0'}`}
        style={{ background: `radial-gradient(circle, ${t.color} 0%, transparent 70%)` }}
      />
      <div
        className={`shine absolute inset-0 rounded-[18px] pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(118deg, transparent 30%, rgba(255,255,255,0.055) 50%, transparent 70%)' }}
      />
      <div
        className={`tag absolute bottom-0 left-0 right-0 h-[3px] rounded-b-[18px] transition-opacity duration-300 ${isHovered ? 'opacity-70' : 'opacity-0'}`}
        style={{ background: t.color }}
      />

      <div
        className={`card-icon font-dm font-medium text-[22px] sm:text-[26px] leading-none select-none relative z-10 transition-transform duration-300 ${isHovered ? 'scale-110 -translate-y-[2px]' : ''}`}
        style={{ color: t.color || 'rgba(255,255,255,0.8)' }}
      >
        {t.icon}
      </div>
      <div className={`card-name font-dm text-[9px] tracking-[0.12em] uppercase relative z-10 transition-colors duration-300 ${isHovered ? 'text-white/70' : 'text-white/30'}`}>
        {t.name}
      </div>
    </div>
  );
};

export default function TechStack() {
  const reducedMotion = useReducedMotion();
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (reducedMotion) return;
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Physics simulation refs
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const stateRef = useRef({
    items: TECHS.map(() => ({
      x: 0,
      y: 0,
      vx: (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 0.7),
      vy: (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 0.7),
    })),
    paused: false,
    initialized: false
  });

  useEffect(() => {
    let animationFrameId;

    const loop = () => {
      if (containerRef.current) {
        const box = containerRef.current.getBoundingClientRect();
        const boxW = box.width;
        const boxH = box.height;

        // Initialize random starting positions on first frame
        if (!stateRef.current.initialized && boxW > 0) {
          stateRef.current.items.forEach(item => {
            item.x = Math.random() * Math.max(0, boxW - 120);
            item.y = Math.random() * Math.max(0, boxH - 120);
          });
          stateRef.current.initialized = true;
        }

        if (!stateRef.current.paused && stateRef.current.initialized && !reducedMotion) {
          stateRef.current.items.forEach((item, i) => {
            const el = elementsRef.current[i];
            if (!el) return;

            const elW = el.offsetWidth || 120;
            const elH = el.offsetHeight || 120;

            item.x += item.vx;
            item.y += item.vy;

            // Bounce X against container
            if (item.x <= 0) {
              item.x = 0;
              item.vx *= -1;
            } else if (item.x + elW >= boxW) {
              item.x = boxW - elW;
              item.vx *= -1;
            }

            // Bounce Y against container
            if (item.y <= 0) {
              item.y = 0;
              item.vy *= -1;
            } else if (item.y + elH >= boxH) {
              item.y = boxH - elH;
              item.vy *= -1;
            }

            // High performance transform
            el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
          });
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [reducedMotion]);

  return (
    <section
      id="tech"
      className="relative min-h-screen flex flex-col items-center justify-center py-[100px] px-4 sm:px-12 z-[2] bg-[#000000] overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic ambient mouse glow based on site accent color */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(232, 68, 48, 0.04),
              transparent 80%
            )
          `,
        }}
      />

      {/* Center ambient glow matching the site accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(232, 68, 48, 0.08) 0%, transparent 60%)' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-dm text-[10px] tracking-[0.26em] text-white/30 uppercase mb-[22px] relative z-10"
      >
        
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, delay: 0.22 }}
        className="font-syne text-[clamp(44px,7vw,88px)] font-extrabold tracking-[-.045em] leading-[.92] text-center text-white mb-[48px] relative z-10"
      >
        Tech<br />
        <em className="not-italic inline-block bg-clip-text text-transparent bg-gradient-to-r from-white/20 via-white/80 to-white/20 bg-[length:200%_auto]" style={{ animation: 'gradient 3s linear infinite' }}>
          Stack
        </em>
      </motion.h2>

      {/* Laptop / Screen Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full max-w-[1000px] h-[60vh] min-h-[400px] rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/[0.015] backdrop-blur-md shadow-2xl overflow-hidden z-10"
      >
        {/* Screen Glare */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
        
        {/* Internal Frame */}
        <div className="absolute inset-2 sm:inset-4 rounded-[18px] sm:rounded-[24px] border border-black/50 bg-[#050505] overflow-hidden">
          
          {/* macOS window controls */}
          <div className="absolute top-3 sm:top-4 left-4 sm:left-5 flex items-center gap-2 z-20 pointer-events-none">
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FF5F56] border border-black/20" />
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#27C93F] border border-black/20" />
          </div>

          {/* Simulation Area */}
          <div 
            ref={containerRef}
            className="absolute inset-0"
            onMouseEnter={() => { stateRef.current.paused = true; }}
            onMouseLeave={() => { stateRef.current.paused = false; }}
            onTouchStart={() => { stateRef.current.paused = true; }}
            onTouchEnd={() => { stateRef.current.paused = false; }}
          >
            {TECHS.map((t, i) => (
              <div
                key={t.name}
                ref={el => elementsRef.current[i] = el}
                className="absolute top-0 left-0 will-change-transform"
              >
                <TechCard t={t} reducedMotion={reducedMotion} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Laptop Base Indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150px] sm:w-[200px] h-[4px] sm:h-[6px] bg-white/10 rounded-t-lg" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="flex items-center gap-[14px] mt-[48px] font-dm text-[10px] tracking-[0.2em] text-white/30 uppercase relative z-10"
      >
        <hr className="w-[28px] border-none border-t border-white/15" />
        12 technologies — 1 developer
        <hr className="w-[28px] border-none border-t border-white/15" />
      </motion.div>

      <style jsx="true">{`
        @keyframes gradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      `}</style>
    </section>
  );
}
