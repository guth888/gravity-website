import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Lazy load the mesh animation (same as Hero)
const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

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
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background py-24 sm:py-32 md:py-40"
    >
      {/* Mesh Animation Background - Same as Hero */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-40">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content - Hero-style centered layout */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1000px] mx-auto">
        
        {/* Label */}
        <p className={`
          text-xs uppercase tracking-[0.2em] text-foreground/40 mb-8
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700
        `}>
          For Publishers
        </p>

        {/* Headline - Hero-style */}
        <h2 className={`
          hero-headline font-headline font-bold antialiased mb-6
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700 delay-100
        `}>
          Turn every AI conversation into <span className="gradient">effortless revenue.</span>
        </h2>

        {/* Subheadline */}
        <p className={`
          text-base sm:text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700 delay-200
        `}>
          You built the space where conversations happen. We built the engine to monetize them—without compromising UX or user trust.
        </p>

        {/* CTA - Metallic button (same as Hero) */}
        <div className={`
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700 delay-300
        `}>
          <Link to="/publishers">
            <button className="metallic-button text-sm sm:text-base" style={{ padding: "14px 28px" }}>
              <span>Become a Publisher</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
