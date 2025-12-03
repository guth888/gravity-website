import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AudienceCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'none' | 'publisher' | 'advertiser'>('none');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      <div className="flex flex-col lg:flex-row min-h-[50vh] sm:min-h-[60vh] lg:min-h-[85vh]">
        
        {/* Publishers Side - Dark */}
        <div 
          className={`
            relative flex-1 flex items-center justify-center overflow-hidden bg-foreground
            transition-all duration-700 ease-out
            ${hoveredSide === 'publisher' ? 'lg:flex-[1.08]' : hoveredSide === 'advertiser' ? 'lg:flex-[0.92]' : 'flex-1'}
          `}
          onMouseEnter={() => !isMobile && setHoveredSide('publisher')}
          onMouseLeave={() => !isMobile && setHoveredSide('none')}
          onClick={() => isMobile && setHoveredSide(hoveredSide === 'publisher' ? 'none' : 'publisher')}
        >
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
              ${hoveredSide === 'publisher' ? 'text-primary' : 'text-white/25'}
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
                ${hoveredSide === 'publisher' ? 'text-primary' : 'text-primary/70'}
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
                bg-white text-foreground font-semibold text-sm
                transition-all duration-500 ease-out
                hover:bg-white/90
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
              ${isMobile || hoveredSide === 'publisher' ? 'opacity-100 translate-y-0' : 'lg:opacity-0 lg:translate-y-6'}
            `}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono tracking-tight">3x</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Higher RPM</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono tracking-tight">95%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Fill Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Advertisers Side - Light */}
        <div 
          className={`
            relative flex-1 flex items-center justify-center overflow-hidden bg-background
            transition-all duration-700 ease-out
            ${hoveredSide === 'advertiser' ? 'lg:flex-[1.08]' : hoveredSide === 'publisher' ? 'lg:flex-[0.92]' : 'flex-1'}
          `}
          onMouseEnter={() => !isMobile && setHoveredSide('advertiser')}
          onMouseLeave={() => !isMobile && setHoveredSide('none')}
          onClick={() => isMobile && setHoveredSide(hoveredSide === 'advertiser' ? 'none' : 'advertiser')}
        >
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
              ${hoveredSide === 'advertiser' ? 'text-primary' : 'text-foreground/25'}
            `}>
              For Advertisers
            </p>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-foreground leading-[1.15] mb-6">
              Your buyers are having
              <br />
              <span className={`
                inline-block transition-all duration-500
                ${hoveredSide === 'advertiser' ? 'text-primary' : 'text-primary/70'}
              `}>
                conversations right now.
              </span>
            </h2>

            {/* Subheadline */}
            <p className={`
              text-sm sm:text-[15px] leading-relaxed mb-10 max-w-md mx-auto
              transition-all duration-500
              ${hoveredSide === 'advertiser' ? 'text-foreground/60' : 'text-foreground/35'}
            `}>
              High-intent moments happen in LLM chats, not just search. Gravity reaches 
              users at the exact second they're deciding.
            </p>

            {/* CTA */}
            <Link 
              to="/advertisers"
              className={`
                group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full
                bg-foreground text-white font-semibold text-sm
                transition-all duration-500 ease-out
                hover:bg-foreground/90
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
              ${isMobile || hoveredSide === 'advertiser' ? 'opacity-100 translate-y-0' : 'lg:opacity-0 lg:translate-y-6'}
            `}>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground font-mono tracking-tight">12%</div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/30 mt-1">Avg CTR</div>
              </div>
              <div className="w-px h-10 bg-foreground/15" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground font-mono tracking-tight">$24</div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/30 mt-1">Avg CPA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
