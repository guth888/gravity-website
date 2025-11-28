import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Lazy load the mesh animation (same as Hero)
const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

const steps = [
  {
    number: "01",
    title: "Conversations",
    titleAccent: "happen",
    description: "Your users are already having high-intent conversations. Asking, comparing, deciding. Every prompt is a data point about what they actually want.",
  },
  {
    number: "02", 
    title: "Gravity",
    titleAccent: "activates",
    description: "When the moment is right, Gravity surfaces a native, high-intent sponsored suggestion that feels like the LLM's own insight. Not a banner. Not an ad. A suggestion.",
  },
  {
    number: "03",
    title: "Value",
    titleAccent: "unlocks",
    description: "Publishers get revenue. Advertisers get precision. Users get helpful suggestions they actually want. Gravity makes all three things happen simultaneously.",
  },
];

export const HowItWorksSimple = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      steps.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSteps((prev) => [...prev, index]);
        }, index * 300);
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-24 sm:py-32 md:py-40"
    >
      {/* Mesh Animation Background - Same as Hero */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-60">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] mx-auto">
        {/* Header - Hero-style typography */}
        <div className={`
          text-center mb-20 sm:mb-28 md:mb-36
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700
        `}>
          <h2 className="hero-headline font-headline font-bold antialiased">
            The conversation is the context.
            <br />
            <span className="gradient">Gravity is the engine.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index);
            
            return (
              <div
                key={step.number}
                className={`
                  text-center max-w-3xl mx-auto
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  transition-all duration-700 ease-out
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <span className="inline-block text-sm font-medium text-foreground/30 tracking-widest mb-6">
                  {step.number}
                </span>

                {/* Step Title */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-foreground mb-6 leading-tight">
                  {step.title} <span className="gradient">{step.titleAccent}</span>
                </h3>

                {/* Step Description */}
                <p className="text-base sm:text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
