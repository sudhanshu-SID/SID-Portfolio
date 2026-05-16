import React from "react";
import badgeImg from "../assets/badge.png";
import hoverImg from "../assets/hover image.jpeg";

const NameBadge = () => {
  return (
    // The absolute positioning makes it "hang" from the top of its parent container
    <div className="flex flex-col items-center absolute -left-[10%] sm:left-[10%] top-[-80px] z-50 scale-[0.6] sm:scale-100 origin-top">
      <a href="#" className="badge-swing flex flex-col items-center cursor-pointer group">
        
        {/* 1. Lanyard Strap */}
        <div className="w-[26px] h-[240px] bg-stone-800 relative shadow-sm z-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
            }}
          />
          <span className="absolute bottom-[40%] left-1/2 -translate-x-1/2 -rotate-90 font-mono text-[6px] font-bold text-white/60 tracking-[0.2em] uppercase whitespace-nowrap select-none">
            HEY..
          </span>
        </div>

        {/* 2. Badge Card Wrapper (Perspective creates the 3D depth) */}
        <div className="rounded-xl w-[210px] -mt-8 relative" style={{ perspective: "800px" }}>
          
          {/* Main Card Body */}
          <div
            className="rounded-xl p-[6px] relative"
            style={{
              background: "linear-gradient(170deg, #57534e 0%, #44403c 15%, #292524 60%, #1c1917 100%)",
              borderTop: "1.5px solid rgba(255,255,255,0.15)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              borderRight: "1px solid rgba(0,0,0,0.3)",
              borderBottom: "2px solid rgba(0,0,0,0.4)",
              transform: "rotateX(1deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Glossy reflection sweep overlay */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none z-20"
              style={{
                background: "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 15%, transparent 40%, transparent 85%, rgba(255,255,255,0.03) 100%)",
              }}
            />
            
            {/* Lanyard pass-through behind card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[26px] h-[22px] bg-stone-800 z-0 rounded-b-sm" />
            
            {/* Slot hole cutout */}
            <div className="relative z-10 flex justify-center pt-1 pb-0">
              <div
                className="w-8 h-[6px] rounded-full border border-stone-500/50"
                style={{
                  background: "linear-gradient(180deg, #1c1917, #292524)",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                }}
              />
            </div>

            {/* Inner Card Content Container */}
            <div
              className="rounded-lg overflow-hidden flex flex-col relative z-10"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(0,0,0,0.3)",
              }}
            >
              {/* Top Section: Name and Info */}
              <div
                className="relative px-4 pt-4 pb-4"
                style={{
                  background: "linear-gradient(175deg, #6b6560 0%, #57534e 20%, #44403c 100%)",
                }}
              >
                {/* Dotted Grid Background Pattern */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.12]"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                
                {/* Text Content */}
                <div className="relative z-10">
                  <h3 className="text-white font-extrabold text-[28px] leading-[1.05] tracking-[0.15em]">
                    SID.
                  </h3>
                  <p className="font-sans text-white/50 text-[11px] tracking-[0.05em] mt-2 leading-relaxed">
                    Desiner by craft,
                    <br />
                    Explorer by nature..
                  </p>
                </div>
              </div>

              {/* Bottom Section: Profile Picture & Video */}
              <div
                className="px-4 pt-5 pb-5 flex flex-col items-center"
                style={{
                  background: "linear-gradient(180deg, #1c1917, #0c0a09)",
                }}
              >
                <div
                  className="w-32 h-32 rounded-full overflow-hidden bg-stone-600 relative"
                  style={{ border: "3px solid #57534e" }}
                >
                  {/* Default Profile Image */}
                  <img
                    src={badgeImg}
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                    draggable={false}
                  />
                  
                  {/* Hover Image Effect */}
                  <img
                    src={hoverImg}
                    alt="Hover Profile"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* Embedded CSS Animation for the Swinging Effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes badge-swing {
          0% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
        .badge-swing {
          /* This makes it pivot from the top of the lanyard strap */
          transform-origin: top center;
          animation: badge-swing 3s ease-in-out infinite;
        }
      `
      }} />
    </div>
  );
};

export default NameBadge;
