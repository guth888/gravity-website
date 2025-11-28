import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Lazy load the mesh animation (same as Hero)
const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

export const DualValueCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isInView, setIsInView] = useState(false);
  const [activeCard, setActiveCard] = useState<'none' | 'publisher' | 'advertiser'>('none');

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Mesh Animation Background */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-40">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] mx-auto">
        
        {/* Labels Above Cards */}
        <div className={`
          flex justify-between items-center mb-8
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          transition-all duration-700 ease-out
        `}>
          {/* Publisher Label - matches dark card */}
          <div 
            className={`
              cursor-pointer select-none px-1
              transition-all duration-500 ease-out
            `}
            onClick={() => navigate("/publishers")}
            onMouseEnter={() => setActiveCard('publisher')}
          >
            <span className={`
              text-sm sm:text-base font-semibold tracking-[0.1em] uppercase
              transition-all duration-500
              ${activeCard === 'publisher' 
                ? 'text-foreground' 
                : activeCard === 'advertiser' 
                  ? 'text-foreground/15' 
                  : 'text-foreground/40'}
            `}>
              For Publishers
            </span>
          </div>

          {/* Advertiser Label - matches white card */}
          <div 
            className={`
              cursor-pointer select-none px-1
              transition-all duration-500 ease-out
            `}
            onClick={() => navigate("/advertisers")}
            onMouseEnter={() => setActiveCard('advertiser')}
          >
            <span className={`
              text-sm sm:text-base font-semibold tracking-[0.1em] uppercase
              transition-all duration-500
              ${activeCard === 'advertiser' 
                ? 'text-[#3A8BFF]' 
                : activeCard === 'publisher' 
                  ? 'text-foreground/15' 
                  : 'text-foreground/40'}
            `}>
              For Advertisers
            </span>
          </div>
        </div>

        {/* Unified Card Container - Fixed Height */}
        <div 
          className={`
            relative overflow-hidden rounded-2xl h-[420px] sm:h-[380px]
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            transition-all duration-700 ease-out delay-200
          `}
          onMouseLeave={() => setActiveCard('none')}
        >
          {/* Cards wrapper - Horizontal flex */}
          <div className="relative flex h-full w-full">
            
            {/* Publisher Card - DARK when active */}
            <div 
              onClick={() => navigate("/publishers")}
              onMouseEnter={() => setActiveCard('publisher')}
              className={`
                relative h-full overflow-hidden cursor-pointer
                transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${activeCard === 'publisher' 
                  ? 'flex-[3] z-20' 
                  : activeCard === 'advertiser' 
                    ? 'flex-[0.8] z-10' 
                    : 'flex-1 z-10'}
              `}
            >
              {/* Background - Dark when active */}
              <div 
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  background: activeCard === 'publisher'
                    ? 'linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #1a1a1a 100%)'
                    : activeCard === 'advertiser'
                      ? 'linear-gradient(90deg, #b8b8b8 0%, #d0d0d0 100%)'
                      : 'linear-gradient(90deg, #d0d0d0 0%, #e8e8e8 40%, #ffffff 100%)'
                }}
              />
              
              {/* Content */}
              <div className={`
                relative h-full p-6 sm:p-8 md:p-10 flex flex-col justify-center
                transition-all duration-500 ease-out
                ${activeCard === 'advertiser' ? 'opacity-20' : 'opacity-100'}
              `}>
                <div className={`
                  transition-all duration-500 ease-out
                  ${activeCard === 'advertiser' ? 'blur-[3px] scale-95' : 'blur-0 scale-100'}
                `}>
                  {/* Headline */}
                  <h3 className={`
                    text-xl sm:text-2xl lg:text-3xl font-headline font-bold leading-[1.2] mb-4
                    transition-all duration-500 ease-out
                  `}>
                    <span className={`transition-colors duration-500 ${activeCard === 'publisher' ? 'text-white' : 'text-foreground/70'}`}>
                      Your conversations are{' '}
                    </span>
                    <span className={`
                      transition-all duration-500
                      ${activeCard === 'publisher' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#93c5fd]' 
                        : 'text-foreground/50'}
                    `}>
                      worth something.
                    </span>
                  </h3>

                  {/* Body */}
                  <p className={`
                    text-sm sm:text-base leading-relaxed mb-5 max-w-md
                    transition-all duration-500
                    ${activeCard === 'publisher' ? 'text-white/60' : 'text-foreground/40'}
                  `}>
                    Integrate Gravity once. Suggestions flow naturally. Revenue flows automatically.
                  </p>

                  {/* Benefit Badges */}
                  <div className={`
                    flex flex-wrap gap-2 mb-6
                    transition-all duration-500 ease-out
                    ${activeCard === 'publisher' ? 'opacity-100' : 'opacity-50'}
                  `}>
                    {['Higher RPM', 'Same UX', 'No Tech Debt'].map((badge) => (
                      <span 
                        key={badge}
                        className={`
                          px-3 py-1.5 text-[10px] sm:text-[11px] font-medium rounded-full
                          border transition-all duration-500
                          ${activeCard === 'publisher' 
                            ? 'text-white/70 bg-white/10 border-white/20' 
                            : 'text-foreground/40 bg-foreground/[0.03] border-foreground/[0.08]'}
                        `}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className={`
                    group inline-flex items-center gap-2
                    text-sm font-semibold
                    transition-all duration-300
                    ${activeCard === 'publisher' ? 'text-[#60a5fa]' : 'text-foreground/40'}
                  `}>
                    <span className="relative">
                      Become a Publisher
                      <span className={`
                        absolute left-0 -bottom-0.5 h-px bg-current
                        transition-all duration-300 ease-out
                        ${activeCard === 'publisher' ? 'w-full' : 'w-0'}
                      `} />
                    </span>
                    <svg className={`
                      w-4 h-4 transition-all duration-300
                      ${activeCard === 'publisher' ? 'translate-x-1 opacity-100' : 'opacity-50'}
                    `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Subtle glow overlay */}
              <div 
                className={`
                  absolute inset-0 pointer-events-none
                  transition-opacity duration-500 ease-out
                  ${activeCard === 'publisher' ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  background: 'radial-gradient(ellipse at 30% 50%, rgba(96,165,250,0.1) 0%, transparent 60%)'
                }}
              />
            </div>

            {/* Center Divider */}
            <div 
              className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-px h-[60%] bg-foreground/10
                transition-all duration-500 ease-out z-30
                ${activeCard !== 'none' ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}
              `}
            />

            {/* Advertiser Card - WHITE when active */}
            <div 
              onClick={() => navigate("/advertisers")}
              onMouseEnter={() => setActiveCard('advertiser')}
              className={`
                relative h-full overflow-hidden cursor-pointer
                transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${activeCard === 'advertiser' 
                  ? 'flex-[3] z-20' 
                  : activeCard === 'publisher' 
                    ? 'flex-[0.8] z-10' 
                    : 'flex-1 z-10'}
              `}
            >
              {/* Background - Bright white when active */}
              <div 
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  background: activeCard === 'advertiser'
                    ? 'linear-gradient(225deg, #ffffff 0%, #fafafa 50%, #f5f5f5 100%)'
                    : activeCard === 'publisher'
                      ? 'linear-gradient(270deg, #b8b8b8 0%, #d0d0d0 100%)'
                      : 'linear-gradient(270deg, #d0d0d0 0%, #e8e8e8 40%, #ffffff 100%)'
                }}
              />
              
              {/* Content */}
              <div className={`
                relative h-full p-6 sm:p-8 md:p-10 flex flex-col justify-center text-right
                transition-all duration-500 ease-out
                ${activeCard === 'publisher' ? 'opacity-20' : 'opacity-100'}
              `}>
                <div className={`
                  transition-all duration-500 ease-out
                  ${activeCard === 'publisher' ? 'blur-[3px] scale-95' : 'blur-0 scale-100'}
                `}>
                  {/* Headline */}
                  <h3 className={`
                    text-xl sm:text-2xl lg:text-3xl font-headline font-bold leading-[1.2] mb-4
                    transition-all duration-500 ease-out
                  `}>
                    <span className={`transition-colors duration-500 ${activeCard === 'advertiser' ? 'text-foreground' : 'text-foreground/70'}`}>
                      Be there when they're{' '}
                    </span>
                    <span className={`
                      transition-all duration-500
                      ${activeCard === 'advertiser' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#2563eb]' 
                        : 'text-foreground/50'}
                    `}>
                      deciding.
                    </span>
                  </h3>

                  {/* Body */}
                  <p className={`
                    text-sm sm:text-base leading-relaxed mb-5 ml-auto max-w-md
                    transition-all duration-500
                    ${activeCard === 'advertiser' ? 'text-foreground/70' : 'text-foreground/40'}
                  `}>
                    High-intent moments happen in LLM chats, not just search. Reach users at the exact second they decide.
                  </p>

                  {/* Benefit Badges */}
                  <div className={`
                    flex flex-wrap justify-end gap-2 mb-6
                    transition-all duration-500 ease-out
                    ${activeCard === 'advertiser' ? 'opacity-100' : 'opacity-50'}
                  `}>
                    {['Higher CTR', 'Lower CAC', 'Clean Attribution'].map((badge) => (
                      <span 
                        key={badge}
                        className={`
                          px-3 py-1.5 text-[10px] sm:text-[11px] font-medium rounded-full
                          border transition-all duration-500
                          ${activeCard === 'advertiser' 
                            ? 'text-[#3A8BFF] bg-[#3A8BFF]/10 border-[#3A8BFF]/30' 
                            : 'text-foreground/40 bg-foreground/[0.03] border-foreground/[0.08]'}
                        `}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className={`
                    group inline-flex items-center justify-end gap-2 w-full
                    text-sm font-semibold
                    transition-all duration-300
                    ${activeCard === 'advertiser' ? 'text-[#3A8BFF]' : 'text-foreground/40'}
                  `}>
                    <span className="relative">
                      Explore Placements
                      <span className={`
                        absolute left-0 -bottom-0.5 h-px bg-current
                        transition-all duration-300 ease-out
                        ${activeCard === 'advertiser' ? 'w-full' : 'w-0'}
                      `} />
                    </span>
                    <svg className={`
                      w-4 h-4 transition-all duration-300
                      ${activeCard === 'advertiser' ? 'translate-x-1 opacity-100' : 'opacity-50'}
                    `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Subtle shadow overlay for depth */}
              <div 
                className={`
                  absolute inset-0 pointer-events-none
                  transition-opacity duration-500 ease-out
                  ${activeCard === 'advertiser' ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  boxShadow: 'inset 0 0 60px rgba(58,139,255,0.05)'
                }}
              />
            </div>
          </div>

          {/* Edge glow when active - Dark for Publisher */}
          <div 
            className={`
              absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl
              transition-all duration-500 ease-out
              ${activeCard === 'publisher' ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ 
              background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%)',
              boxShadow: activeCard === 'publisher' ? '0 0 25px 8px rgba(96,165,250,0.4)' : 'none'
            }}
          />
          {/* Edge glow when active - Light for Advertiser */}
          <div 
            className={`
              absolute top-0 right-0 bottom-0 w-1 rounded-r-2xl
              transition-all duration-500 ease-out
              ${activeCard === 'advertiser' ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ 
              background: 'linear-gradient(180deg, #3A8BFF 0%, #2563eb 100%)',
              boxShadow: activeCard === 'advertiser' ? '0 0 25px 8px rgba(58,139,255,0.3)' : 'none'
            }}
          />

          {/* Outer shadow/border */}
          <div className="absolute inset-0 rounded-2xl border border-foreground/5 pointer-events-none" />
        </div>

        {/* Hint text */}
        <p className={`
          text-center text-xs text-foreground/30 mt-6
          transition-all duration-500
          ${activeCard === 'none' ? 'opacity-100' : 'opacity-0'}
        `}>
          Hover to explore each side
        </p>
      </div>
    </section>
  );
};
