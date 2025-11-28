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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the container
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      setScrollProgress(progress);
      
      // Determine active step - give each step more "hold" time
      // First 15% is header, then each step gets equal share of remaining 85%
      const headerZone = 0.12;
      if (progress < headerZone) {
        setActiveStep(0);
      } else {
        const stepProgress = (progress - headerZone) / (1 - headerZone);
        const newActiveStep = Math.min(Math.floor(stepProgress * steps.length), steps.length - 1);
        setActiveStep(newActiveStep);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate individual step visibility (0-1 for each step)
  const getStepVisibility = (stepIndex: number) => {
    const headerZone = 0.12;
    const contentProgress = Math.max(0, (scrollProgress - headerZone) / (1 - headerZone));
    
    const stepSize = 1 / steps.length;
    const stepStart = stepIndex * stepSize;
    const stepEnd = (stepIndex + 1) * stepSize;
    
    // Smooth entry and exit zones (20% of step for transitions)
    const entryZone = stepSize * 0.15;
    const exitZone = stepSize * 0.15;
    const holdStart = stepStart + entryZone;
    const holdEnd = stepEnd - exitZone;
    
    if (contentProgress < stepStart) return { phase: 'future', progress: 0 };
    if (contentProgress < holdStart) {
      // Entering
      const entryProgress = (contentProgress - stepStart) / entryZone;
      return { phase: 'entering', progress: Math.min(1, entryProgress) };
    }
    if (contentProgress < holdEnd) {
      // Holding - fully visible
      return { phase: 'active', progress: 1 };
    }
    if (contentProgress < stepEnd) {
      // Exiting
      const exitProgress = (contentProgress - holdEnd) / exitZone;
      return { phase: 'exiting', progress: Math.max(0, 1 - exitProgress) };
    }
    return { phase: 'past', progress: 0 };
  };

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative bg-background"
      style={{ height: `${150 + (steps.length * 120)}vh` }} // More scroll room per step
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Mesh Animation Background */}
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-50">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[650px] md:max-w-[800px] lg:max-w-[900px] mx-auto">
          
          {/* Header - Fades out gently */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out"
            style={{
              opacity: scrollProgress < 0.08 ? 1 : Math.max(0, 1 - (scrollProgress - 0.08) * 8),
              transform: `translateY(${Math.min(scrollProgress * 60, 30)}px)`,
              filter: `blur(${Math.min(scrollProgress * 20, 6)}px)`,
              pointerEvents: scrollProgress < 0.1 ? 'auto' : 'none',
            }}
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/40 mb-6">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold antialiased leading-tight">
              The conversation is the context.
              <br />
              <span className="gradient">Gravity is the engine.</span>
            </h2>
          </div>

          {/* Steps Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {steps.map((step, index) => {
              const { phase, progress } = getStepVisibility(index);
              const isVisible = phase === 'entering' || phase === 'active' || phase === 'exiting';
              
              // Calculate transforms based on phase
              let opacity = 0;
              let translateY = 60;
              let scale = 0.95;
              let blur = 0;
              
              if (phase === 'entering') {
                opacity = progress;
                translateY = (1 - progress) * 40;
                scale = 0.96 + progress * 0.04;
                blur = (1 - progress) * 4;
              } else if (phase === 'active') {
                opacity = 1;
                translateY = 0;
                scale = 1;
                blur = 0;
              } else if (phase === 'exiting') {
                opacity = progress;
                translateY = (1 - progress) * -30;
                scale = 1 - (1 - progress) * 0.04;
                blur = (1 - progress) * 4;
              } else if (phase === 'past') {
                opacity = 0;
                translateY = -40;
                scale = 0.96;
                blur = 6;
              } else {
                // future
                opacity = 0;
                translateY = 50;
                scale = 0.95;
                blur = 6;
              }

              return (
                <div
                  key={step.number}
                  className="absolute inset-x-0 flex flex-col items-center justify-center text-center px-4"
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out, filter 0.4s ease-out',
                    pointerEvents: phase === 'active' ? 'auto' : 'none',
                    willChange: isVisible ? 'opacity, transform, filter' : 'auto',
                  }}
                >
                  {/* Step Number */}
                  <div className="mb-8 sm:mb-10">
                    <span className="text-sm sm:text-base font-medium tracking-[0.3em] text-foreground/40">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-6 sm:mb-8 leading-[1.1]">
                    {step.title} <span className="gradient">{step.titleAccent}</span>
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm sm:text-base md:text-lg text-foreground/50 leading-relaxed max-w-xl mx-auto px-4">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            {steps.map((step, index) => {
              const { phase } = getStepVisibility(index);
              const isActive = phase === 'active' || phase === 'entering' || phase === 'exiting';
              const isPast = phase === 'past';
              
              return (
                <div key={index} className="flex items-center gap-4">
                  {/* Dot */}
                  <button
                    className={`
                      relative w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out
                      ${isActive ? 'scale-125' : 'scale-100'}
                    `}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, #3A8BFF, #A9AAAE)' 
                        : isPast 
                          ? 'rgba(var(--foreground), 0.25)' 
                          : 'rgba(var(--foreground), 0.08)',
                    }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#3A8BFF]/40 blur-sm animate-pulse" />
                    )}
                  </button>
                  
                  {/* Connector line (not after last) */}
                  {index < steps.length - 1 && (
                    <div 
                      className="w-8 sm:w-12 h-px transition-all duration-500"
                      style={{
                        background: isPast 
                          ? 'linear-gradient(90deg, rgba(58,139,255,0.3), rgba(169,170,174,0.2))' 
                          : 'rgba(var(--foreground), 0.06)',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Scroll hint */}
          <div 
            className="fixed bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 z-10"
            style={{ 
              opacity: scrollProgress < 0.05 ? 0.6 : 0,
              transform: `translateY(${scrollProgress > 0.05 ? 20 : 0}px)`,
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-foreground/20 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-foreground/30 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
