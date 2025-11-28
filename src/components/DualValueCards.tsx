import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-background py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className={`
          text-center mb-16 sm:mb-20 md:mb-24
          ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          transition-all duration-700
        `}>
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
            Two Sides, One Platform
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.15]">
            Duality that's <span className="gradient">actually unity.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          
          {/* Publisher Card */}
          <div 
            onClick={() => navigate("/publishers")}
            className={`
              group cursor-pointer
              ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              transition-all duration-700 delay-100
            `}
          >
            <div className="border border-border/30 rounded-2xl p-8 sm:p-10 md:p-12 hover:border-border/60 transition-all duration-500 h-full flex flex-col">
              {/* Label */}
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-8">
                For Publishers
              </p>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-foreground leading-tight mb-6">
                Turn every AI conversation into{" "}
                <span className="gradient">effortless, native revenue.</span>
              </h3>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed mb-8 flex-grow">
                Integrate Gravity once to unlock high-intent sponsored suggestions that feel organic, protect UX, and monetize conversations automatically.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["SDK Ready", "Real-time Metrics", "Privacy-First"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 text-xs rounded-full border border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-foreground group-hover:gap-3 transition-all duration-300">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Advertiser Card */}
          <div 
            onClick={() => navigate("/advertisers")}
            className={`
              group cursor-pointer
              ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              transition-all duration-700 delay-200
            `}
          >
            <div className="border border-border/30 rounded-2xl p-8 sm:p-10 md:p-12 hover:border-border/60 transition-all duration-500 h-full flex flex-col">
              {/* Label */}
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-8">
                For Advertisers
              </p>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-foreground leading-tight mb-6">
                Be the suggestion they choose inside{" "}
                <span className="gradient">real AI conversations.</span>
              </h3>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed mb-8 flex-grow">
                Deliver native, high-intent suggestions exactly when users ask, compare, or decide—driving unmatched CTR, conversion lift, and ROI.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["+50% CTR", "OpenRTB Ready", "High-Intent Targeting"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 text-xs rounded-full border border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-foreground group-hover:gap-3 transition-all duration-300">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
