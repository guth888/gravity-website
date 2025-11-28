import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

export const AudienceCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      className="relative w-full overflow-hidden"
    >
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row">
        
        {/* Publishers Side */}
        <div className="relative flex-1 min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0b]">
          {/* Mesh Background */}
          <Suspense fallback={null}>
            <div className="absolute inset-0 opacity-20">
              <MeshAnimation className="w-full h-full" />
            </div>
          </Suspense>

          {/* Content */}
          <div className={`
            relative z-10 text-center px-6 sm:px-10 lg:px-12 py-16 lg:py-0 max-w-lg mx-auto
            transition-all duration-700 ease-out
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            {/* Label */}
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              For Publishers
            </p>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-5">
              Turn every AI conversation into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]">
                effortless revenue.
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-white/50 mb-8 leading-relaxed">
              You built the space where conversations happen. We built the engine to 
              monetize them—without compromising UX or user trust.
            </p>

            {/* CTA */}
            <Link 
              to="/publishers"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
            >
              Become a Publisher
            </Link>
          </div>

          {/* Edge accent */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        {/* Advertisers Side */}
        <div className="relative flex-1 min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#fafafa]">
          {/* Mesh Background */}
          <Suspense fallback={null}>
            <div className="absolute inset-0 opacity-30">
              <MeshAnimation className="w-full h-full" />
            </div>
          </Suspense>

          {/* Content */}
          <div className={`
            relative z-10 text-center px-6 sm:px-10 lg:px-12 py-16 lg:py-0 max-w-lg mx-auto
            transition-all duration-700 ease-out delay-150
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            {/* Label */}
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-6">
              For Advertisers
            </p>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">
              Your buyers are having{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]">
                conversations right now.
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-black/50 mb-8 leading-relaxed">
              High-intent moments happen in LLM chats, not just search. Gravity reaches 
              users at the exact second they're deciding.
            </p>

            {/* CTA */}
            <Link 
              to="/advertisers"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-black text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:scale-[1.02]"
            >
              Explore Placements
            </Link>
          </div>

          {/* Edge accent */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
        </div>
      </div>
    </section>
  );
};

