import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

export const AudienceCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'none' | 'publisher' | 'advertiser'>('none');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row min-h-[70vh] lg:min-h-[85vh]">
        
        {/* Publishers Side */}
        <div 
          className={`
            relative flex-1 flex items-center justify-center overflow-hidden
            bg-[#08080a] transition-all duration-700 ease-out
            ${hoveredSide === 'publisher' ? 'lg:flex-[1.08]' : hoveredSide === 'advertiser' ? 'lg:flex-[0.92]' : 'flex-1'}
          `}
          onMouseEnter={() => setHoveredSide('publisher')}
          onMouseLeave={() => setHoveredSide('none')}
        >
          {/* Mesh Background */}
          <Suspense fallback={null}>
            <div className={`
              absolute inset-0 transition-opacity duration-700
              ${hoveredSide === 'publisher' ? 'opacity-30' : 'opacity-15'}
            `}>
              <MeshAnimation className="w-full h-full" />
            </div>
          </Suspense>

          {/* Gradient orb */}
          <div className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[500px] h-[500px] rounded-full
            bg-gradient-to-br from-[#3A8BFF]/10 via-transparent to-transparent
            blur-3xl transition-all duration-700
            ${hoveredSide === 'publisher' ? 'opacity-60 scale-110' : 'opacity-30 scale-100'}
          `} />

          {/* Floating particles */}
          <div className={`
            absolute inset-0 pointer-events-none transition-opacity duration-500
            ${hoveredSide === 'publisher' ? 'opacity-100' : 'opacity-0'}
          `}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#3A8BFF]/50"
                style={{
                  left: `${15 + (i * 10)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animation: `float-particle ${4 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className={`
            relative z-10 text-center px-6 sm:px-10 lg:px-14 py-20 lg:py-0 max-w-xl mx-auto
            transition-all duration-700 ease-out
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            ${hoveredSide === 'advertiser' ? 'lg:opacity-60 lg:scale-[0.98]' : 'opacity-100 scale-100'}
          `}>
            {/* Label */}
            <p className={`
              text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-8
              transition-all duration-500
              ${hoveredSide === 'publisher' ? 'text-[#3A8BFF]' : 'text-white/30'}
            `}>
              For Publishers
            </p>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-white leading-[1.15] mb-6">
              Turn every AI
              <br />
              conversation into
              <br />
              <span className={`
                inline-block transition-all duration-500
                ${hoveredSide === 'publisher' 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] via-[#60a5fa] to-[#3A8BFF] bg-[length:200%_auto] animate-gradient-shift' 
                  : 'text-[#3A8BFF]'
                }
              `}>
                effortless revenue.
              </span>
            </h2>

            {/* Subheadline */}
            <p className={`
              text-sm sm:text-[15px] leading-relaxed mb-10 max-w-md mx-auto
              transition-all duration-500
              ${hoveredSide === 'publisher' ? 'text-white/60' : 'text-white/40'}
            `}>
              You built the space where conversations happen. We built the engine to 
              monetize them—without compromising UX or user trust.
            </p>

            {/* CTA */}
            <Link 
              to="/publishers"
              className={`
                group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                bg-white text-black font-medium text-sm
                transition-all duration-500 ease-out
                hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]
                ${hoveredSide === 'publisher' ? 'scale-105' : 'scale-100'}
              `}
            >
              <span>Become a Publisher</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Stats - visible on hover */}
            <div className={`
              flex items-center justify-center gap-10 mt-12
              transition-all duration-500
              ${hoveredSide === 'publisher' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">3x</div>
                <div className="text-[10px] uppercase tracking-wider text-white/30">Higher RPM</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">95%</div>
                <div className="text-[10px] uppercase tracking-wider text-white/30">Fill Rate</div>
              </div>
            </div>
          </div>

          {/* Right edge glow */}
          <div className={`
            hidden lg:block absolute right-0 top-0 bottom-0 w-[2px]
            transition-all duration-500
            ${hoveredSide === 'publisher' 
              ? 'bg-gradient-to-b from-transparent via-[#3A8BFF]/60 to-transparent shadow-[0_0_20px_rgba(58,139,255,0.4)]' 
              : 'bg-gradient-to-b from-transparent via-white/5 to-transparent'
            }
          `} />
        </div>

        {/* Advertisers Side */}
        <div 
          className={`
            relative flex-1 flex items-center justify-center overflow-hidden
            bg-[#f8f9fa] transition-all duration-700 ease-out
            ${hoveredSide === 'advertiser' ? 'lg:flex-[1.08]' : hoveredSide === 'publisher' ? 'lg:flex-[0.92]' : 'flex-1'}
          `}
          onMouseEnter={() => setHoveredSide('advertiser')}
          onMouseLeave={() => setHoveredSide('none')}
        >
          {/* Mesh Background */}
          <Suspense fallback={null}>
            <div className={`
              absolute inset-0 transition-opacity duration-700
              ${hoveredSide === 'advertiser' ? 'opacity-40' : 'opacity-20'}
            `}>
              <MeshAnimation className="w-full h-full" />
            </div>
          </Suspense>

          {/* Gradient orb */}
          <div className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[500px] h-[500px] rounded-full
            bg-gradient-to-br from-[#3A8BFF]/5 via-transparent to-transparent
            blur-3xl transition-all duration-700
            ${hoveredSide === 'advertiser' ? 'opacity-80 scale-110' : 'opacity-30 scale-100'}
          `} />

          {/* Floating particles */}
          <div className={`
            absolute inset-0 pointer-events-none transition-opacity duration-500
            ${hoveredSide === 'advertiser' ? 'opacity-100' : 'opacity-0'}
          `}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#3A8BFF]/30"
                style={{
                  left: `${15 + (i * 10)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animation: `float-particle ${4 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className={`
            relative z-10 text-center px-6 sm:px-10 lg:px-14 py-20 lg:py-0 max-w-xl mx-auto
            transition-all duration-700 ease-out delay-100
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            ${hoveredSide === 'publisher' ? 'lg:opacity-60 lg:scale-[0.98]' : 'opacity-100 scale-100'}
          `}>
            {/* Label */}
            <p className={`
              text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-8
              transition-all duration-500
              ${hoveredSide === 'advertiser' ? 'text-[#3A8BFF]' : 'text-black/30'}
            `}>
              For Advertisers
            </p>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-black leading-[1.15] mb-6">
              Your buyers are having
              <br />
              <span className={`
                inline-block transition-all duration-500
                ${hoveredSide === 'advertiser' 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] via-[#60a5fa] to-[#3A8BFF] bg-[length:200%_auto] animate-gradient-shift' 
                  : 'text-[#3A8BFF]'
                }
              `}>
                conversations right now.
              </span>
            </h2>

            {/* Subheadline */}
            <p className={`
              text-sm sm:text-[15px] leading-relaxed mb-10 max-w-md mx-auto
              transition-all duration-500
              ${hoveredSide === 'advertiser' ? 'text-black/60' : 'text-black/40'}
            `}>
              High-intent moments happen in LLM chats, not just search. Gravity reaches 
              users at the exact second they're deciding.
            </p>

            {/* CTA */}
            <Link 
              to="/advertisers"
              className={`
                group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                bg-black text-white font-medium text-sm
                transition-all duration-500 ease-out
                hover:shadow-[0_0_50px_rgba(0,0,0,0.25)]
                ${hoveredSide === 'advertiser' ? 'scale-105' : 'scale-100'}
              `}
            >
              <span>Explore Placements</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Stats - visible on hover */}
            <div className={`
              flex items-center justify-center gap-10 mt-12
              transition-all duration-500
              ${hoveredSide === 'advertiser' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <div className="text-center">
                <div className="text-2xl font-bold text-black font-mono">12%</div>
                <div className="text-[10px] uppercase tracking-wider text-black/30">Avg CTR</div>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-black font-mono">$24</div>
                <div className="text-[10px] uppercase tracking-wider text-black/30">Avg CPA</div>
              </div>
            </div>
          </div>

          {/* Left edge glow */}
          <div className={`
            hidden lg:block absolute left-0 top-0 bottom-0 w-[2px]
            transition-all duration-500
            ${hoveredSide === 'advertiser' 
              ? 'bg-gradient-to-b from-transparent via-[#3A8BFF]/40 to-transparent shadow-[0_0_20px_rgba(58,139,255,0.3)]' 
              : 'bg-gradient-to-b from-transparent via-black/5 to-transparent'
            }
          `} />
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
            opacity: 0.4; 
          }
          25% {
            transform: translateY(-15px) translateX(5px) scale(1.2);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-25px) translateX(-5px) scale(1); 
            opacity: 0.6; 
          }
          75% {
            transform: translateY(-10px) translateX(8px) scale(1.3);
            opacity: 1;
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
