import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const PublisherCTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 overflow-hidden bg-background"
    >
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className={`
          text-center max-w-3xl mx-auto
          ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
          transition-all duration-700
        `}>
          {/* Label */}
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
            For Publishers
          </p>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15] mb-8">
            Your conversations are
            <br />
            <span className="gradient">worth something.</span>
          </h2>

          {/* Body */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
            You built the space where conversations happen. We built the engine to turn them into revenue—without compromising UX or user trust.
          </p>

          {/* Value Props - Minimal */}
          <div className={`
            flex flex-wrap justify-center gap-8 sm:gap-12 mb-12
            ${isInView ? "opacity-100" : "opacity-0"}
            transition-opacity duration-700 delay-300
          `}>
            {["Higher RPM", "Same UX", "No Tech Debt"].map((item, idx) => (
              <div
                key={item}
                className="text-center"
                style={{ transitionDelay: `${400 + idx * 100}ms` }}
              >
                <p className="text-sm font-medium text-foreground">{item}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {idx === 0 ? "Revenue per thousand" : idx === 1 ? "Native integration" : "Simple SDK"}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/publishers"
            className={`
              group inline-flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors
              ${isInView ? "opacity-100" : "opacity-0"}
              transition-opacity duration-700 delay-500
            `}
          >
            <span className="text-base sm:text-lg font-medium border-b border-foreground/30 pb-1 group-hover:border-foreground transition-colors">
              Become a Publisher
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};
