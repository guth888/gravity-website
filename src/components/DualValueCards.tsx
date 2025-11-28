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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-24 sm:py-32 md:py-40"
    >
      {/* Mesh Animation Background - Same as Hero */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-50">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] mx-auto">
        {/* Section Header - Hero-style */}
        <div className={`
          text-center mb-20 sm:mb-28 md:mb-36
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700
        `}>
          <h2 className="hero-headline font-headline font-bold antialiased">
            Two audiences. <span className="gradient">One platform.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">
            Same transaction. Opposite sides. Perfectly aligned incentives.
          </p>
        </div>

        {/* Cards Grid - Minimal wireframe style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 max-w-4xl mx-auto">
          
          {/* Publisher Card */}
          <div 
            onClick={() => navigate("/publishers")}
            className={`
              group cursor-pointer text-center
              ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              transition-all duration-700 delay-100
            `}
          >
            {/* Wireframe border */}
            <div className="relative p-8 sm:p-10 md:p-12 border border-foreground/10 rounded-sm hover:border-foreground/20 transition-colors duration-500">
              {/* Label */}
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-8">
                For Publishers
              </p>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl font-headline font-bold text-foreground leading-tight mb-6">
                Your conversations are <span className="gradient">worth something.</span>
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-foreground/50 leading-relaxed mb-8">
                Integrate Gravity once. Suggestions flow naturally. Revenue flows automatically.
              </p>

              {/* Stats - Minimal */}
              <div className="flex justify-center gap-8 text-xs text-foreground/40 mb-8">
                <span>Higher RPM</span>
                <span>Same UX</span>
                <span>No Tech Debt</span>
              </div>

              {/* CTA - Metallic button */}
              <button className="metallic-button text-sm">
                <span>Become a Publisher</span>
              </button>
            </div>
          </div>

          {/* Advertiser Card */}
          <div 
            onClick={() => navigate("/advertisers")}
            className={`
              group cursor-pointer text-center
              ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              transition-all duration-700 delay-200
            `}
          >
            {/* Wireframe border */}
            <div className="relative p-8 sm:p-10 md:p-12 border border-foreground/10 rounded-sm hover:border-foreground/20 transition-colors duration-500">
              {/* Label */}
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-8">
                For Advertisers
              </p>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl font-headline font-bold text-foreground leading-tight mb-6">
                Be there when they're <span className="gradient">deciding.</span>
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-foreground/50 leading-relaxed mb-8">
                High-intent moments happen in LLM chats, not just search. Reach users at the exact second they decide.
              </p>

              {/* Stats - Minimal */}
              <div className="flex justify-center gap-8 text-xs text-foreground/40 mb-8">
                <span>Higher CTR</span>
                <span>Lower CAC</span>
                <span>Clean Attribution</span>
              </div>

              {/* CTA - Metallic button */}
              <button className="metallic-button text-sm">
                <span>Explore Placements</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
