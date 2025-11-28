import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";

const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({ default: m.MeshAnimation })));

export const DualAudienceSplit = () => {
  const [hoveredSide, setHoveredSide] = useState<'none' | 'publisher' | 'advertiser'>('none');

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex">
      {/* Publisher Side - Dark */}
      <div 
        className={`
          relative flex-1 flex items-center justify-center overflow-hidden
          bg-[#0a0a0b] transition-all duration-700 ease-out cursor-pointer
          ${hoveredSide === 'publisher' ? 'flex-[1.3]' : hoveredSide === 'advertiser' ? 'flex-[0.7]' : 'flex-1'}
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

        {/* Gradient overlay on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-[#3A8BFF]/0 to-[#3A8BFF]/10
          transition-opacity duration-700
          ${hoveredSide === 'publisher' ? 'opacity-100' : 'opacity-0'}
        `} />

        {/* Edge glow */}
        <div className={`
          absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#3A8BFF]/50 to-transparent
          transition-opacity duration-500
          ${hoveredSide === 'publisher' ? 'opacity-100' : 'opacity-30'}
        `} />

        {/* Content */}
        <div className={`
          relative z-10 px-8 sm:px-12 lg:px-16 max-w-xl text-center
          transition-all duration-700 ease-out
          ${hoveredSide === 'advertiser' ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}
        `}>
          {/* Eyebrow */}
          <div className={`
            text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6
            transition-all duration-500
            ${hoveredSide === 'publisher' ? 'text-[#3A8BFF]/80' : ''}
          `}>
            For Publishers
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-4">
            Turn every AI conversation into{' '}
            <span className={`
              transition-all duration-500 bg-clip-text
              ${hoveredSide === 'publisher' 
                ? 'text-transparent bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]' 
                : 'text-[#3A8BFF]/70'
              }
            `}>
              effortless revenue.
            </span>
          </h2>

          {/* Description */}
          <p className={`
            text-white/50 text-sm sm:text-base mb-8 leading-relaxed
            transition-all duration-500
            ${hoveredSide === 'publisher' ? 'text-white/60' : ''}
          `}>
            You built the space where conversations happen. We built the engine to 
            monetize them—without compromising UX or user trust.
          </p>

          {/* CTA */}
          <Link 
            to="/demo?type=publisher"
            className={`
              inline-flex items-center justify-center px-8 py-4 rounded-full
              bg-white text-black font-medium text-sm
              transition-all duration-500 ease-out
              hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]
              ${hoveredSide === 'publisher' 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-70 translate-y-1'
              }
            `}
          >
            Become a Publisher
          </Link>

          {/* Stats on hover */}
          <div className={`
            flex items-center justify-center gap-8 mt-10
            transition-all duration-500 ease-out
            ${hoveredSide === 'publisher' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4 pointer-events-none'
            }
          `}>
            {[
              { value: "3x", label: "Higher RPM" },
              { value: "95%", label: "Fill Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated particles */}
        <div className={`
          absolute inset-0 pointer-events-none overflow-hidden
          transition-opacity duration-700
          ${hoveredSide === 'publisher' ? 'opacity-100' : 'opacity-0'}
        `}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#3A8BFF]/60"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Center Divider */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className={`
          w-16 h-16 rounded-full bg-gradient-to-br from-[#0a0a0b] to-[#fafafa] 
          flex items-center justify-center
          shadow-[0_0_60px_rgba(0,0,0,0.3)]
          transition-all duration-500
          ${hoveredSide !== 'none' ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}
        `}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L12 22M2 12L22 12" stroke="url(#dividerGradient)" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#3A8BFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Advertiser Side - Light */}
      <div 
        className={`
          relative flex-1 flex items-center justify-center overflow-hidden
          bg-[#fafafa] transition-all duration-700 ease-out cursor-pointer
          ${hoveredSide === 'advertiser' ? 'flex-[1.3]' : hoveredSide === 'publisher' ? 'flex-[0.7]' : 'flex-1'}
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

        {/* Gradient overlay on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-l from-[#3A8BFF]/0 to-[#3A8BFF]/5
          transition-opacity duration-700
          ${hoveredSide === 'advertiser' ? 'opacity-100' : 'opacity-0'}
        `} />

        {/* Edge glow */}
        <div className={`
          absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#3A8BFF]/30 to-transparent
          transition-opacity duration-500
          ${hoveredSide === 'advertiser' ? 'opacity-100' : 'opacity-30'}
        `} />

        {/* Content */}
        <div className={`
          relative z-10 px-8 sm:px-12 lg:px-16 max-w-xl text-center
          transition-all duration-700 ease-out
          ${hoveredSide === 'publisher' ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}
        `}>
          {/* Eyebrow */}
          <div className={`
            text-xs font-medium uppercase tracking-[0.2em] text-black/40 mb-6
            transition-all duration-500
            ${hoveredSide === 'advertiser' ? 'text-[#3A8BFF]' : ''}
          `}>
            For Advertisers
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-[1.1] mb-4">
            Your buyers are having{' '}
            <span className={`
              transition-all duration-500 bg-clip-text
              ${hoveredSide === 'advertiser' 
                ? 'text-transparent bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]' 
                : 'text-[#3A8BFF]/70'
              }
            `}>
              conversations right now.
            </span>
          </h2>

          {/* Description */}
          <p className={`
            text-black/50 text-sm sm:text-base mb-8 leading-relaxed
            transition-all duration-500
            ${hoveredSide === 'advertiser' ? 'text-black/60' : ''}
          `}>
            High-intent moments happen in LLM chats, not just search. Gravity reaches 
            users at the exact second they're deciding.
          </p>

          {/* CTA */}
          <Link 
            to="/demo?type=advertiser"
            className={`
              inline-flex items-center justify-center px-8 py-4 rounded-full
              bg-black text-white font-medium text-sm
              transition-all duration-500 ease-out
              hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]
              ${hoveredSide === 'advertiser' 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-70 translate-y-1'
              }
            `}
          >
            Explore Placements
          </Link>

          {/* Stats on hover */}
          <div className={`
            flex items-center justify-center gap-8 mt-10
            transition-all duration-500 ease-out
            ${hoveredSide === 'advertiser' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4 pointer-events-none'
            }
          `}>
            {[
              { value: "12%", label: "Avg CTR" },
              { value: "$24", label: "Avg CPA" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold text-black font-mono">{stat.value}</div>
                <div className="text-xs text-black/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated particles */}
        <div className={`
          absolute inset-0 pointer-events-none overflow-hidden
          transition-opacity duration-700
          ${hoveredSide === 'advertiser' ? 'opacity-100' : 'opacity-0'}
        `}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#3A8BFF]/40"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

