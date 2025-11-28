import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        
        {/* Publishers Side - Dark with aurora gradient */}
        <div 
          className={`
            relative flex-1 flex items-center justify-center overflow-hidden
            transition-all duration-700 ease-out
            ${hoveredSide === 'publisher' ? 'lg:flex-[1.08]' : hoveredSide === 'advertiser' ? 'lg:flex-[0.92]' : 'flex-1'}
          `}
          onMouseEnter={() => setHoveredSide('publisher')}
          onMouseLeave={() => setHoveredSide('none')}
          style={{
            background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0a0f 100%)',
          }}
        >
          {/* Animated gradient blob */}
          <div 
            className={`
              absolute w-[800px] h-[800px] rounded-full blur-[120px]
              transition-all duration-1000 ease-out
              ${hoveredSide === 'publisher' ? 'opacity-40 scale-110' : 'opacity-20 scale-100'}
            `}
            style={{
              background: 'radial-gradient(circle, rgba(58,139,255,0.4) 0%, rgba(99,102,241,0.2) 40%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'blob-float 8s ease-in-out infinite',
            }}
          />

          {/* Secondary blob */}
          <div 
            className={`
              absolute w-[400px] h-[400px] rounded-full blur-[80px]
              transition-all duration-1000 ease-out
              ${hoveredSide === 'publisher' ? 'opacity-30' : 'opacity-10'}
            `}
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
              top: '30%',
              right: '20%',
              animation: 'blob-float 6s ease-in-out infinite reverse',
            }}
          />

          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Rings */}
            <div 
              className={`
                absolute w-32 h-32 border border-white/5 rounded-full
                transition-all duration-700
                ${hoveredSide === 'publisher' ? 'border-[#3A8BFF]/20 scale-110' : ''}
              `}
              style={{ top: '15%', left: '10%', animation: 'float-slow 12s ease-in-out infinite' }}
            />
            <div 
              className={`
                absolute w-20 h-20 border border-white/5 rounded-full
                transition-all duration-700
                ${hoveredSide === 'publisher' ? 'border-[#3A8BFF]/15 scale-110' : ''}
              `}
              style={{ bottom: '20%', left: '15%', animation: 'float-slow 10s ease-in-out infinite reverse' }}
            />
            <div 
              className={`
                absolute w-40 h-40 border border-white/[0.03] rounded-full
                transition-all duration-700
                ${hoveredSide === 'publisher' ? 'border-white/10' : ''}
              `}
              style={{ top: '60%', right: '5%', animation: 'float-slow 14s ease-in-out infinite' }}
            />
            
            {/* Small dots */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-1.5 h-1.5 rounded-full bg-white/10
                  transition-all duration-500
                  ${hoveredSide === 'publisher' ? 'bg-[#3A8BFF]/40 scale-150' : ''}
                `}
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${5 + i * 8}%`,
                  animation: `twinkle ${3 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className={`
            relative z-10 text-center px-6 sm:px-10 lg:px-14 py-20 lg:py-0 max-w-xl mx-auto
            transition-all duration-700 ease-out
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            ${hoveredSide === 'advertiser' ? 'lg:opacity-50 lg:scale-[0.97]' : 'opacity-100 scale-100'}
          `}>
            {/* Label */}
            <p className={`
              text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-8
              transition-all duration-500 font-medium
              ${hoveredSide === 'publisher' ? 'text-[#3A8BFF]' : 'text-white/25'}
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
                inline-block transition-all duration-500 relative
                ${hoveredSide === 'publisher' 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] via-[#818cf8] to-[#3A8BFF] bg-[length:200%_auto] animate-gradient-shift' 
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
              ${hoveredSide === 'publisher' ? 'text-white/60' : 'text-white/35'}
            `}>
              You built the space where conversations happen. We built the engine to 
              monetize them—without compromising UX or user trust.
            </p>

            {/* CTA */}
            <Link 
              to="/publishers"
              className={`
                group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full
                bg-white text-[#0a0a0f] font-semibold text-sm
                transition-all duration-500 ease-out
                hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]
                ${hoveredSide === 'publisher' ? 'scale-[1.02]' : 'scale-100'}
              `}
            >
              <span>Become a Publisher</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Stats */}
            <div className={`
              flex items-center justify-center gap-10 mt-12
              transition-all duration-500
              ${hoveredSide === 'publisher' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono tracking-tight">3x</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Higher RPM</div>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono tracking-tight">95%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Fill Rate</div>
              </div>
            </div>
          </div>

          {/* Right edge */}
          <div className={`
            hidden lg:block absolute right-0 top-0 bottom-0 w-px
            transition-all duration-500
            ${hoveredSide === 'publisher' 
              ? 'bg-gradient-to-b from-transparent via-[#3A8BFF]/50 to-transparent' 
              : 'bg-gradient-to-b from-transparent via-white/10 to-transparent'
            }
          `} />
        </div>

        {/* Advertisers Side - Light with soft shapes */}
        <div 
          className={`
            relative flex-1 flex items-center justify-center overflow-hidden
            transition-all duration-700 ease-out
            ${hoveredSide === 'advertiser' ? 'lg:flex-[1.08]' : hoveredSide === 'publisher' ? 'lg:flex-[0.92]' : 'flex-1'}
          `}
          onMouseEnter={() => setHoveredSide('advertiser')}
          onMouseLeave={() => setHoveredSide('none')}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
          }}
        >
          {/* Animated gradient blob */}
          <div 
            className={`
              absolute w-[700px] h-[700px] rounded-full blur-[100px]
              transition-all duration-1000 ease-out
              ${hoveredSide === 'advertiser' ? 'opacity-50 scale-110' : 'opacity-20 scale-100'}
            `}
            style={{
              background: 'radial-gradient(circle, rgba(58,139,255,0.15) 0%, rgba(147,197,253,0.1) 40%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'blob-float 10s ease-in-out infinite',
            }}
          />

          {/* Secondary accent blob */}
          <div 
            className={`
              absolute w-[300px] h-[300px] rounded-full blur-[60px]
              transition-all duration-1000 ease-out
              ${hoveredSide === 'advertiser' ? 'opacity-40' : 'opacity-10'}
            `}
            style={{
              background: 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)',
              bottom: '30%',
              left: '20%',
              animation: 'blob-float 7s ease-in-out infinite reverse',
            }}
          />

          {/* Dot pattern */}
          <div 
            className={`
              absolute inset-0 transition-opacity duration-500
              ${hoveredSide === 'advertiser' ? 'opacity-[0.4]' : 'opacity-[0.2]'}
            `}
            style={{
              backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Soft rectangles */}
            <div 
              className={`
                absolute w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3A8BFF]/5 to-transparent
                border border-[#3A8BFF]/10 backdrop-blur-sm
                transition-all duration-700
                ${hoveredSide === 'advertiser' ? 'border-[#3A8BFF]/20 scale-110' : ''}
              `}
              style={{ top: '20%', right: '15%', animation: 'float-slow 11s ease-in-out infinite', transform: 'rotate(12deg)' }}
            />
            <div 
              className={`
                absolute w-16 h-16 rounded-xl bg-gradient-to-br from-black/[0.02] to-transparent
                border border-black/5
                transition-all duration-700
                ${hoveredSide === 'advertiser' ? 'border-[#3A8BFF]/15 scale-110' : ''}
              `}
              style={{ bottom: '25%', right: '10%', animation: 'float-slow 9s ease-in-out infinite reverse', transform: 'rotate(-8deg)' }}
            />
            <div 
              className={`
                absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#3A8BFF]/[0.03] to-transparent
                border border-[#3A8BFF]/5
                transition-all duration-700
                ${hoveredSide === 'advertiser' ? 'border-[#3A8BFF]/15' : ''}
              `}
              style={{ top: '60%', left: '8%', animation: 'float-slow 13s ease-in-out infinite' }}
            />

            {/* Accent dots */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-2 h-2 rounded-full bg-[#3A8BFF]/10
                  transition-all duration-500
                  ${hoveredSide === 'advertiser' ? 'bg-[#3A8BFF]/30 scale-125' : ''}
                `}
                style={{
                  top: `${25 + i * 18}%`,
                  right: `${8 + i * 6}%`,
                  animation: `twinkle ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className={`
            relative z-10 text-center px-6 sm:px-10 lg:px-14 py-20 lg:py-0 max-w-xl mx-auto
            transition-all duration-700 ease-out delay-100
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            ${hoveredSide === 'publisher' ? 'lg:opacity-50 lg:scale-[0.97]' : 'opacity-100 scale-100'}
          `}>
            {/* Label */}
            <p className={`
              text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-8
              transition-all duration-500 font-medium
              ${hoveredSide === 'advertiser' ? 'text-[#3A8BFF]' : 'text-black/25'}
            `}>
              For Advertisers
            </p>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-[#0a0a0f] leading-[1.15] mb-6">
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
              ${hoveredSide === 'advertiser' ? 'text-black/60' : 'text-black/35'}
            `}>
              High-intent moments happen in LLM chats, not just search. Gravity reaches 
              users at the exact second they're deciding.
            </p>

            {/* CTA */}
            <Link 
              to="/advertisers"
              className={`
                group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full
                bg-[#0a0a0f] text-white font-semibold text-sm
                transition-all duration-500 ease-out
                hover:shadow-[0_0_60px_rgba(0,0,0,0.2)]
                ${hoveredSide === 'advertiser' ? 'scale-[1.02]' : 'scale-100'}
              `}
            >
              <span>Explore Placements</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Stats */}
            <div className={`
              flex items-center justify-center gap-10 mt-12
              transition-all duration-500
              ${hoveredSide === 'advertiser' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0a0a0f] font-mono tracking-tight">12%</div>
                <div className="text-[10px] uppercase tracking-widest text-black/30 mt-1">Avg CTR</div>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-black/15 to-transparent" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0a0a0f] font-mono tracking-tight">$24</div>
                <div className="text-[10px] uppercase tracking-widest text-black/30 mt-1">Avg CPA</div>
              </div>
            </div>
          </div>

          {/* Left edge */}
          <div className={`
            hidden lg:block absolute left-0 top-0 bottom-0 w-px
            transition-all duration-500
            ${hoveredSide === 'advertiser' 
              ? 'bg-gradient-to-b from-transparent via-[#3A8BFF]/30 to-transparent' 
              : 'bg-gradient-to-b from-transparent via-black/10 to-transparent'
            }
          `} />
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob-float {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-48%, -52%) scale(1.02); }
          66% { transform: translate(-52%, -48%) scale(0.98); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
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
