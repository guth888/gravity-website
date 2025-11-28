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
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1000px] mx-auto">
        
        {/* Labels Above Cards */}
        <div className={`
          flex justify-between items-center mb-6
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          transition-all duration-700 ease-out
        `}>
          {/* Publisher Label */}
          <div 
            className={`
              metallic-label cursor-pointer select-none
              transition-all duration-500 ease-out
              ${activeCard === 'publisher' ? 'opacity-100 scale-105' : activeCard === 'advertiser' ? 'opacity-40 scale-95' : 'opacity-70'}
            `}
            onClick={() => navigate("/publishers")}
            onMouseEnter={() => setActiveCard('publisher')}
          >
            <span className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase">
              For Publishers
            </span>
          </div>

          {/* Advertiser Label */}
          <div 
            className={`
              metallic-label cursor-pointer select-none
              transition-all duration-500 ease-out
              ${activeCard === 'advertiser' ? 'opacity-100 scale-105' : activeCard === 'publisher' ? 'opacity-40 scale-95' : 'opacity-70'}
            `}
            onClick={() => navigate("/advertisers")}
            onMouseEnter={() => setActiveCard('advertiser')}
          >
            <span className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase">
              For Advertisers
            </span>
          </div>
        </div>

        {/* Unified Card Container */}
        <div 
          className={`
            relative overflow-hidden rounded-2xl
            shadow-[0_8px_40px_rgba(0,0,0,0.08)]
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            transition-all duration-700 ease-out delay-200
          `}
          style={{ minHeight: '420px' }}
          onMouseLeave={() => setActiveCard('none')}
        >
          {/* Background gradient layers */}
          <div className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              background: activeCard === 'publisher' 
                ? 'linear-gradient(90deg, #ffffff 0%, #f8f8f8 100%)'
                : activeCard === 'advertiser'
                ? 'linear-gradient(90deg, #f8f8f8 0%, #ffffff 100%)'
                : 'linear-gradient(90deg, #e8e8e8 0%, #ffffff 35%, #ffffff 65%, #e8e8e8 100%)'
            }}
          />

          {/* Divider line in center */}
          <div 
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-px h-[70%] bg-foreground/10
              transition-all duration-500 ease-out
              ${activeCard !== 'none' ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}
            `}
          />

          {/* Cards wrapper */}
          <div className="relative flex h-full">
            
            {/* Publisher Card */}
            <div 
              onClick={() => navigate("/publishers")}
              onMouseEnter={() => setActiveCard('publisher')}
              className={`
                relative cursor-pointer
                transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${activeCard === 'publisher' ? 'flex-[2] z-20' : activeCard === 'advertiser' ? 'flex-[0.5] z-10' : 'flex-1 z-10'}
              `}
            >
              <div className={`
                h-full p-8 sm:p-10 md:p-12
                transition-all duration-500 ease-out
                ${activeCard === 'advertiser' ? 'opacity-30' : 'opacity-100'}
              `}>
                {/* Content */}
                <div className={`
                  transition-all duration-500 ease-out
                  ${activeCard === 'advertiser' ? 'blur-[2px]' : ''}
                `}>
                  {/* Headline */}
                  <h3 className={`
                    text-2xl sm:text-3xl lg:text-4xl font-headline font-bold leading-[1.15] mb-5
                    transition-all duration-500 ease-out
                    ${activeCard === 'publisher' ? 'text-foreground' : 'text-foreground/80'}
                  `}>
                    Your conversations are{' '}
                    <span className={`
                      transition-all duration-500
                      ${activeCard === 'publisher' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#4BA3FF]' 
                        : 'text-foreground/60'}
                    `}>
                      worth something.
                    </span>
                  </h3>

                  {/* Body */}
                  <p className={`
                    text-sm sm:text-base leading-relaxed mb-6 max-w-sm
                    transition-all duration-500
                    ${activeCard === 'publisher' ? 'text-foreground/60' : 'text-foreground/40'}
                  `}>
                    Integrate Gravity once. Suggestions flow naturally. Revenue flows automatically.
                  </p>

                  {/* Benefit Badges */}
                  <div className={`
                    flex flex-wrap gap-2 mb-8
                    transition-all duration-500 ease-out
                    ${activeCard === 'publisher' ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-1'}
                  `}>
                    {['Higher RPM', 'Same UX', 'No Tech Debt'].map((badge) => (
                      <span 
                        key={badge}
                        className="px-3 py-1.5 text-[11px] font-medium text-foreground/50 bg-foreground/[0.04] rounded-full border border-foreground/[0.08]"
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
                    ${activeCard === 'publisher' ? 'text-[#3A8BFF]' : 'text-foreground/50'}
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
                      w-4 h-4 transition-transform duration-300
                      ${activeCard === 'publisher' ? 'translate-x-1' : ''}
                    `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Publisher hover overlay gradient */}
              <div 
                className={`
                  absolute inset-0 pointer-events-none
                  transition-opacity duration-700 ease-out
                  ${activeCard === 'publisher' ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  background: 'linear-gradient(135deg, rgba(58,139,255,0.03) 0%, rgba(75,163,255,0.08) 100%)'
                }}
              />
            </div>

            {/* Advertiser Card */}
            <div 
              onClick={() => navigate("/advertisers")}
              onMouseEnter={() => setActiveCard('advertiser')}
              className={`
                relative cursor-pointer
                transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${activeCard === 'advertiser' ? 'flex-[2] z-20' : activeCard === 'publisher' ? 'flex-[0.5] z-10' : 'flex-1 z-10'}
              `}
            >
              <div className={`
                h-full p-8 sm:p-10 md:p-12 text-right
                transition-all duration-500 ease-out
                ${activeCard === 'publisher' ? 'opacity-30' : 'opacity-100'}
              `}>
                {/* Content */}
                <div className={`
                  transition-all duration-500 ease-out
                  ${activeCard === 'publisher' ? 'blur-[2px]' : ''}
                `}>
                  {/* Headline */}
                  <h3 className={`
                    text-2xl sm:text-3xl lg:text-4xl font-headline font-bold leading-[1.15] mb-5
                    transition-all duration-500 ease-out
                    ${activeCard === 'advertiser' ? 'text-foreground' : 'text-foreground/80'}
                  `}>
                    Be there when they're{' '}
                    <span className={`
                      transition-all duration-500
                      ${activeCard === 'advertiser' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#4BA3FF]' 
                        : 'text-foreground/60'}
                    `}>
                      deciding.
                    </span>
                  </h3>

                  {/* Body */}
                  <p className={`
                    text-sm sm:text-base leading-relaxed mb-6 ml-auto max-w-sm
                    transition-all duration-500
                    ${activeCard === 'advertiser' ? 'text-foreground/60' : 'text-foreground/40'}
                  `}>
                    High-intent moments happen in LLM chats, not just search. Reach users at the exact second they decide.
                  </p>

                  {/* Benefit Badges */}
                  <div className={`
                    flex flex-wrap justify-end gap-2 mb-8
                    transition-all duration-500 ease-out
                    ${activeCard === 'advertiser' ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-1'}
                  `}>
                    {['Higher CTR', 'Lower CAC', 'Clean Attribution'].map((badge) => (
                      <span 
                        key={badge}
                        className="px-3 py-1.5 text-[11px] font-medium text-foreground/50 bg-foreground/[0.04] rounded-full border border-foreground/[0.08]"
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
                    ${activeCard === 'advertiser' ? 'text-[#3A8BFF]' : 'text-foreground/50'}
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
                      w-4 h-4 transition-transform duration-300
                      ${activeCard === 'advertiser' ? 'translate-x-1' : ''}
                    `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Advertiser hover overlay gradient */}
              <div 
                className={`
                  absolute inset-0 pointer-events-none
                  transition-opacity duration-700 ease-out
                  ${activeCard === 'advertiser' ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  background: 'linear-gradient(225deg, rgba(58,139,255,0.03) 0%, rgba(75,163,255,0.08) 100%)'
                }}
              />
            </div>
          </div>

          {/* Glow effects on edges */}
          <div 
            className={`
              absolute top-0 left-0 bottom-0 w-1 
              transition-all duration-700 ease-out
              ${activeCard === 'publisher' ? 'opacity-100 shadow-[0_0_30px_10px_rgba(58,139,255,0.15)]' : 'opacity-0'}
            `}
            style={{ background: 'linear-gradient(180deg, #3A8BFF 0%, #4BA3FF 100%)' }}
          />
          <div 
            className={`
              absolute top-0 right-0 bottom-0 w-1 
              transition-all duration-700 ease-out
              ${activeCard === 'advertiser' ? 'opacity-100 shadow-[0_0_30px_10px_rgba(58,139,255,0.15)]' : 'opacity-0'}
            `}
            style={{ background: 'linear-gradient(180deg, #4BA3FF 0%, #3A8BFF 100%)' }}
          />
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

      {/* Metallic label styles */}
      <style>{`
        .metallic-label {
          background: linear-gradient(
            135deg,
            #d4d4d8 0%,
            #e4e4e7 25%,
            #f4f4f5 50%,
            #e4e4e7 75%,
            #d4d4d8 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer-label 4s ease-in-out infinite;
        }
        
        .metallic-label:hover {
          background: linear-gradient(
            135deg,
            #3A8BFF 0%,
            #4BA3FF 50%,
            #3A8BFF 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        @keyframes shimmer-label {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};
