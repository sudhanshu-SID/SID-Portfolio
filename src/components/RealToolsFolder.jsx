import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import coffeeImg from "../assets/ice coffee.png";

/* ──────────────────────────────────────────────
   The Real Stack definition
   ────────────────────────────────────────────── */
const realStack = [
  { name: "Coffee",       icon: <img src={coffeeImg} alt="Coffee" className="w-10 h-10 object-contain drop-shadow-xl" /> },
  { name: "Cursor",       icon: <img src="/images/cursor.png" alt="Cursor" className="w-8 h-8 object-contain" /> },
  { name: "Claude",       icon: <img src="/images/claude.png" alt="Claude" className="w-8 h-8 object-contain" /> },
  { name: "ChatGPT",      icon: <img src="/images/chat_gpt.png" alt="ChatGPT" className="w-8 h-8 object-contain" /> },
  { name: "Gemini",       icon: <img src="/images/Geminii.png" alt="Gemini" className="w-8 h-8 object-contain" /> },
  { name: "AI Studio",    icon: <img src="/images/ai studio.png" alt="AI Studio" className="w-8 h-8 object-contain" /> },
  { name: "Perplexity",   icon: <img src="/images/perplexity.png" alt="Perplexity" className="w-8 h-8 object-contain" /> },
  { name: "Antigravity",  icon: <img src="/images/Antigravity.png" alt="Antigravity" className="w-8 h-8 object-contain" /> },
  { name: "Emergent",     icon: <img src="/images/emergent.png" alt="Emergent" className="w-8 h-8 object-contain" /> },
  { name: "Stitch",       icon: <img src="/images/stitch.jpeg" alt="Stitch" className="w-8 h-8 object-cover rounded-md" /> },
];


/* ──────────────────────────────────────────────
   RealToolsFolder Component
   ────────────────────────────────────────────── */
export function RealToolsFolder() {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {hovered && (
        <div 
          className="absolute sm:hidden z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-none" 
          style={{ width: '200vw', height: '200vh', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      )}
      
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 scale-[0.45] sm:scale-100 origin-bottom-right">
        <motion.div
          onMouseEnter={() => { if (typeof window !== "undefined" && window.innerWidth >= 640) setHovered(true); }}
          onMouseLeave={() => { if (typeof window !== "undefined" && window.innerWidth >= 640) setHovered(false); }}
          onClick={() => { if (typeof window !== "undefined" && window.innerWidth < 640) setHovered(!hovered); }}
          className="flex flex-col items-center gap-2 group cursor-pointer w-[140px]"
          whileTap={{ scale: 0.95 }}
        >
          {/* Extended hover area so mouse doesn't leave when hovering top/left icons */}
          {hovered && (
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-auto z-[-1]" />
          )}

      {/* 3D Container */}
      <div
        className="relative w-[130px] h-[100px]"
        style={{
          filter: hovered
            ? "drop-shadow(0 8px 24px rgba(232,68,48,0.25))"
            : "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          perspective: "300px",
        }}
      >
        {/* Layer 1: BACK OF FOLDER — classic yellow folder */}
        <svg
          viewBox="0 0 96 80"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="12" width="96" height="68" rx="8" fill="#eab308" />
          <path
            d="M0 20 C0 14.5, 4.5 10, 10 10 L32 10 Q36 10, 38 6 Q40 2, 44 2 L86 2 Q94 2, 96 10 L96 20 L0 20 Z"
            fill="#eab308"
          />
          {/* Subtle inner gradient */}
          <rect x="2" y="20" width="92" height="58" rx="6" fill="#ca8a04" opacity="0.4" />
        </svg>

        {/* Layer 2: INNER CONTENT — AI Agents + Coffee popping out */}
        <motion.div 
          className="absolute left-0 right-0 bottom-4 flex justify-center items-center pointer-events-none z-10 origin-bottom"
          animate={{ scale: hovered ? (isMobile ? 1.75 : 1) : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {realStack.map((tool, i) => {
            const isCoffee = tool.name === "Coffee";
            
            let radius, arcIndex, arcCount;
            if (isCoffee) {
              // Coffee placed exactly at the center of the outer spread, but popping slightly further
              radius = 290;
              arcIndex = 2; // Middle of 5 items
              arcCount = 5;
            } else if (i <= 5) {
              // Inner ring: 5 items (i = 1 to 5)
              radius = 130;
              arcIndex = i - 1;
              arcCount = 5;
            } else {
              // Outer ring: 4 items (i = 6 to 9)
              radius = 230;
              let position = i - 6; // 0, 1, 2, 3
              if (position >= 2) position++; // skip index 2 for Coffee: 0, 1, 3, 4
              arcIndex = position;
              arcCount = 5;
            }
            
            // Angle from 180 deg (left) to 270 deg (up)
            const startAngle = Math.PI + 0.1; 
            const endAngle = 1.5 * Math.PI - 0.1;
            const angle = startAngle + (arcIndex / Math.max(1, arcCount - 1)) * (endAngle - startAngle);
            
            const targetX = Math.cos(angle) * radius;
            const targetY = Math.sin(angle) * radius;

            return (
              <motion.span
                key={tool.name}
                title={tool.name}
                className="absolute p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl pointer-events-auto cursor-pointer flex items-center justify-center"
                style={{
                   zIndex: isCoffee ? 110 : 100,
                   boxShadow: isCoffee && hovered ? "0 0 40px rgba(234, 179, 8, 0.8), inset 0 0 10px rgba(255,255,255,0.5)" : "",
                   borderColor: isCoffee && hovered ? "rgba(234, 179, 8, 0.5)" : "rgba(255,255,255,0.2)"
                }}
                initial={{ opacity: 0, x: 0, y: 10, scale: 0.2 }}
                animate={{
                  opacity: hovered ? 1 : 0,
                  x: hovered ? targetX + 40 : 0, // offset slightly to align with folder center
                  y: hovered ? targetY - 20 : 10,
                  scale: hovered ? (isCoffee ? 1.6 : 1) : 0.2,
                }}
                transition={{
                  delay: hovered ? i * 0.03 : 0,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{ scale: 1.2, zIndex: 120, backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                {isCoffee ? (
                  <motion.div
                    animate={hovered ? { 
                      rotate: [-8, 8, -6, 6, -8],
                      y: [0, -5, 0, 3, 0],
                      x: [-2, 3, -2, 2, -2] 
                    } : {}}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    {tool.icon}
                  </motion.div>
                ) : (
                  tool.icon
                )}
              </motion.span>
            );
          })}
        </motion.div>

        {/* Layer 3: FRONT COVER (Tilts open) */}
        <motion.div
          className="absolute left-[1px] right-[1px] bottom-[1px] h-[72px] rounded-[7px] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #fde047, #facc15)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.6), 0 -1px 2px rgba(0,0,0,0.1)",
            transformOrigin: "bottom center",
          }}
          animate={{ rotateX: hovered ? -35 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="text-[9px] font-bold text-yellow-800/60 tracking-[0.15em] uppercase flex items-center gap-1.5">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secret
          </span>
        </motion.div>
      </div>

      {/* Label Text */}
      <span
        className={`text-[9px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 ${
          hovered ? "text-yellow-400" : "text-white/25"
        }`}
      >
        My Real Stack
      </span>
    </motion.div>
    </div>
    </>
  );
}
