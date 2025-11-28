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
      {/* Mesh Animation Background - Same as Hero */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-40">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] mx-auto">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
          
          {/* Publisher Card */}
          <div 
            onClick={() => navigate("/publishers")}
            className={`
              group cursor-pointer relative
              ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              transition-all duration-700 ease-out
            `}
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="
              relative overflow-hidden
              bg-white rounded-2xl
              shadow-[0_4px_20px_rgba(0,0,0,0.04)]
              hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
              hover:-translate-y-1.5
              transition-all duration-500 ease-out
            ">
              {/* Accent Stripe - Left Edge */}
              <div 
                className={`
                  absolute left-0 top-0 bottom-0 w-1.5 
                  bg-gradient-to-b from-orange-400 via-orange-500 to-amber-500
                  ${isInView ? 'scale-y-100' : 'scale-y-0'}
                  origin-top transition-transform duration-700 ease-out
                  group-hover:shadow-[0_0_20px_rgba(251,146,60,0.5)]
                `}
                style={{ 
                  transitionDelay: '0.6s',
                  animation: isInView ? 'stripe-pulse-orange 3s ease-in-out infinite' : 'none',
                  animationDelay: '1.5s'
                }}
              />
              
              {/* Card Content */}
              <div className="p-8 sm:p-10 pl-10 sm:pl-12">
                {/* Eyebrow */}
                <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-medium mb-5">
                  For Publishers
                </p>

                {/* Headline */}
                <h3 className="text-2xl sm:text-3xl font-headline font-bold text-foreground leading-[1.2] mb-4 group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.3)] transition-all duration-300">
                  Your conversations are{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                    worth something.
                  </span>
                </h3>

                {/* Body */}
                <p className="text-[15px] text-foreground/50 leading-relaxed mb-6">
                  Integrate Gravity once. Suggestions flow naturally. Revenue flows automatically.
                </p>

                {/* Benefit Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1.5 text-[11px] font-medium text-foreground/60 bg-foreground/[0.04] rounded-full border border-foreground/[0.06]">
                    Higher RPM
                  </span>
                  <span className="px-3 py-1.5 text-[11px] font-medium text-foreground/60 bg-foreground/[0.04] rounded-full border border-foreground/[0.06]">
                    Same UX
                  </span>
                  <span className="px-3 py-1.5 text-[11px] font-medium text-foreground/60 bg-foreground/[0.04] rounded-full border border-foreground/[0.06]">
                    No Tech Debt
                  </span>
                </div>

                {/* CTA - Ghost button with underline */}
                <button className="
                  group/btn relative inline-flex items-center gap-2
                  text-sm font-medium text-foreground/70
                  hover:text-orange-600 transition-colors duration-300
                ">
                  <span className="relative">
                    Become a Publisher
                    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-current opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                  </span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Advertiser Card */}
          <div 
            onClick={() => navigate("/advertisers")}
            className={`
              group cursor-pointer relative
              ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              transition-all duration-700 ease-out
            `}
            style={{ transitionDelay: '0.6s' }}
          >
            <div className="
              relative overflow-hidden
              bg-white rounded-2xl
              shadow-[0_4px_20px_rgba(0,0,0,0.04)]
              hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
              hover:-translate-y-1.5
              transition-all duration-500 ease-out
            ">
              {/* Accent Stripe - Left Edge */}
              <div 
                className={`
                  absolute left-0 top-0 bottom-0 w-1.5 
                  bg-gradient-to-b from-cyan-400 via-teal-500 to-emerald-500
                  ${isInView ? 'scale-y-100' : 'scale-y-0'}
                  origin-top transition-transform duration-700 ease-out
                  group-hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]
                `}
                style={{ 
                  transitionDelay: '0.8s',
                  animation: isInView ? 'stripe-pulse-teal 3s ease-in-out infinite' : 'none',
                  animationDelay: '1.5s'
                }}
              />
              
              {/* Card Content */}
              <div className="p-8 sm:p-10 pl-10 sm:pl-12">
                {/* Eyebrow */}
                <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-medium mb-5">
                  For Advertisers
                </p>

                {/* Headline */}
                <h3 className="text-2xl sm:text-3xl font-headline font-bold text-foreground leading-[1.2] mb-4 group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.3)] transition-all duration-300">
                  Be there when they're{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                    deciding.
                  </span>
                </h3>

                {/* Body */}
                <p className="text-[15px] text-foreground/50 leading-relaxed mb-6">
                  High-intent moments happen in LLM chats, not just search. Reach users at the exact second they decide.
                </p>

                {/* Benefit Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1.5 text-[11px] font-medium text-foreground/60 bg-foreground/[0.04] rounded-full border border-foreground/[0.06]">
                    Higher CTR
                  </span>
                  <span className="px-3 py-1.5 text-[11px] font-medium text-foreground/60 bg-foreground/[0.04] rounded-full border border-foreground/[0.06]">
                    Lower CAC
                  </span>
                  <span className="px-3 py-1.5 text-[11px] font-medium text-foreground/60 bg-foreground/[0.04] rounded-full border border-foreground/[0.06]">
                    Clean Attribution
                  </span>
                </div>

                {/* CTA - Ghost button with underline */}
                <button className="
                  group/btn relative inline-flex items-center gap-2
                  text-sm font-medium text-foreground/70
                  hover:text-teal-600 transition-colors duration-300
                ">
                  <span className="relative">
                    Explore Placements
                    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-current opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                  </span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes stripe-pulse-orange {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes stripe-pulse-teal {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};
