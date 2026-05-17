import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import { RealToolsFolder } from './RealToolsFolder';

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
    setTransformStyle(`perspective(750px) rotateX(${-dy * 15}deg) rotateY(${dx * 15}deg) scale(1.05) translateZ(10px)`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('');
  };

  return (
    <div
      ref={cardRef}
      className="tech-card relative flex flex-col items-center w-[75px] sm:w-[100px] lg:w-[120px] cursor-pointer"
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform .1s ease' : 'transform .45s cubic-bezier(.34,1.4,.64,1)',
        zIndex: isHovered ? 50 : 1, // bring to front on hover
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Folder Container */}
      <div
        className="relative w-full h-[60px] sm:h-[80px] lg:h-[96px]"
        style={{
          filter: isHovered
            ? `drop-shadow(0 12px 24px ${t.color}50)`
            : "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
          perspective: "400px",
        }}
      >
        {/* Layer 1: BACK OF FOLDER (Glassy Dark) */}
        <svg viewBox="0 0 96 80" className="absolute inset-0 w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
          {/* Main back shape with folder tab */}
          <rect x="0" y="12" width="96" height="68" rx="6" fill="rgba(25,30,40,0.8)" />
          <path d="M0 20 C0 14.5, 4.5 10, 10 10 L35 10 Q39 10, 41 6 Q43 2, 47 2 L86 2 Q94 2, 96 10 L96 20 L0 20 Z" fill="rgba(25,30,40,0.8)" />
          {/* Inner dark pocket */}
          <rect x="2" y="18" width="92" height="60" rx="4" fill="rgba(5,10,15,0.6)" />
        </svg>

        {/* Ambient Glow inside folder */}
        <div
          className={`absolute inset-0 top-4 rounded-b-lg opacity-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}
          style={{ background: `radial-gradient(circle at center, ${t.color}40 0%, transparent 70%)` }}
        />

        {/* Layer 2: INNER CONTENT (Tech Icon) */}
        <div className="absolute inset-0 top-5 bottom-2 flex flex-col items-center justify-center pointer-events-none">
          <div
            className={`card-icon font-dm font-bold text-[20px] sm:text-[28px] lg:text-[36px] leading-none transition-transform duration-300 origin-bottom ${isHovered ? '-translate-y-4 sm:-translate-y-6 scale-125' : 'scale-100'}`}
            style={{
              color: t.color || 'rgba(255,255,255,0.8)',
              textShadow: isHovered ? `0 0 20px ${t.color}` : 'none'
            }}
          >
            {t.icon}
          </div>
        </div>

        {/* Layer 3: FRONT COVER (Clear glass flap) */}
        <motion.div
          className="absolute left-[1px] right-[1px] bottom-[1px] h-[75%] rounded-[6px] flex items-end justify-center pb-2.5 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderTop: `1px solid ${isHovered ? t.color : 'rgba(255,255,255,0.2)'}`,
            boxShadow: isHovered ? `0 -2px 20px ${t.color}60, inset 0 1px 0 rgba(255,255,255,0.1)` : "inset 0 1px 0 rgba(255,255,255,0.05)",
            transformOrigin: "bottom center",
          }}
          animate={{ rotateX: isHovered ? -35 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Subtle shine on the folder front */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />

          {/* Desktop-only label inside the flap */}
          <div className={`hidden sm:block card-name font-dm text-[9px] tracking-[0.15em] uppercase relative z-10 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/50'}`}>
            {t.name}
          </div>
        </motion.div>
      </div>

      {/* Mobile-only label below the folder */}
      <div className={`block sm:hidden mt-2 text-center font-dm text-[8px] tracking-[0.1em] uppercase transition-colors duration-300 ${isHovered ? 'text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/40'}`}>
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

  // Fixed layout, no physics needed


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

          {/* Desktop Area - Fixed Grid on the left */}
          <div className="absolute inset-0 p-6 sm:p-8 lg:p-12 pl-4 sm:pl-8 flex justify-start overflow-y-auto pb-56 sm:pb-12">
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 content-start">
              {TECHS.map((t) => (
                <div key={t.name}>
                  <TechCard t={t} reducedMotion={reducedMotion} />
                </div>
              ))}
            </div>
          </div>

          {/* Secret AI Tools Folder — hover to reveal */}
          <RealToolsFolder />
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
