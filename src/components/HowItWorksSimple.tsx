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
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the container
      // Container starts when its top hits viewport top
      // Container ends when its bottom leaves viewport bottom
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      setScrollProgress(progress);
      
      // Determine active step based on progress
      const stepProgress = progress * steps.length;
      const newActiveStep = Math.min(Math.floor(stepProgress), steps.length - 1);
      setActiveStep(newActiveStep);
      
      // Check if in view
      if (rect.top < viewportHeight && rect.bottom > 0) {
        setIsInView(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate individual step progress (0-1 for each step)
  const getStepProgress = (stepIndex: number) => {
    const stepSize = 1 / steps.length;
    const stepStart = stepIndex * stepSize;
    const stepEnd = (stepIndex + 1) * stepSize;
    
    if (scrollProgress < stepStart) return 0;
    if (scrollProgress > stepEnd) return 1;
    return (scrollProgress - stepStart) / stepSize;
  };

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative bg-background"
      style={{ height: `${100 + (steps.length * 100)}vh` }} // Extra scroll room
    >
      {/* Sticky container - stays fixed while scrolling */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Mesh Animation Background */}
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-60">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] mx-auto">
          
          {/* Header - Fades out as scrolling starts */}
          <div 
            className="text-center mb-20 sm:mb-28 md:mb-36 transition-all duration-500"
            style={{
              opacity: scrollProgress < 0.05 ? 1 : Math.max(0, 1 - scrollProgress * 3),
              transform: `translateY(${scrollProgress * -50}px)`,
            }}
          >
            <h2 className="hero-headline font-headline font-bold antialiased">
              The conversation is the context.
              <br />
              <span className="gradient">Gravity is the engine.</span>
            </h2>
          </div>

          {/* Steps - Stacked and animated */}
          <div className="relative h-[400px] sm:h-[450px] md:h-[500px]">
            {steps.map((step, index) => {
              const stepProgress = getStepProgress(index);
              const isActive = activeStep === index;
              const isPast = activeStep > index;
              const isFuture = activeStep < index;
              
              // Calculate transforms
              let opacity = 0;
              let translateY = 100;
              let scale = 0.8;
              let blur = 10;
              
              if (isActive) {
                // Active step: fade in from bottom, scale up
                const enterProgress = Math.min(stepProgress * 2, 1); // First half: enter
                const exitProgress = Math.max((stepProgress - 0.5) * 2, 0); // Second half: exit
                
                opacity = enterProgress - exitProgress * 0.8;
                translateY = (1 - enterProgress) * 80 - exitProgress * 80;
                scale = 0.85 + enterProgress * 0.15 - exitProgress * 0.1;
                blur = (1 - enterProgress) * 8;
              } else if (isPast) {
                // Past steps: faded out above
                opacity = 0;
                translateY = -150;
                scale = 0.7;
                blur = 15;
              } else {
                // Future steps: waiting below
                opacity = 0;
                translateY = 150;
                scale = 0.8;
                blur = 15;
              }

              return (
                <div
                  key={step.number}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    filter: `blur(${blur}px)`,
                    transition: 'opacity 0.1s ease-out, transform 0.1s ease-out, filter 0.1s ease-out',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  {/* Step Number - Animated ring */}
                  <div className="relative mb-8">
                    <span className="text-7xl sm:text-8xl md:text-9xl font-extralight text-foreground/10 leading-none">
                      {step.number}
                    </span>
                    {/* Animated progress ring */}
                    <svg 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40"
                      style={{ transform: 'translate(-50%, -50%) rotate(-90deg)' }}
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-foreground/5"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="url(#stepGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={`${stepProgress * 283} 283`}
                        className="transition-all duration-100"
                      />
                      <defs>
                        <linearGradient id="stepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3A8BFF" />
                          <stop offset="100%" stopColor="#A9AAAE" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground mb-6 leading-tight">
                    {step.title} <span className="gradient">{step.titleAccent}</span>
                  </h3>

                  {/* Step Description */}
                  <p className="text-base sm:text-lg md:text-xl text-foreground/50 leading-relaxed max-w-2xl mx-auto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Progress Dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {steps.map((_, index) => {
              const isActive = activeStep === index;
              const isPast = activeStep > index;
              
              return (
                <div
                  key={index}
                  className="relative"
                >
                  {/* Dot */}
                  <div
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${isActive ? 'bg-gradient-to-r from-[#3A8BFF] to-[#A9AAAE] scale-150' : ''}
                      ${isPast ? 'bg-foreground/30' : ''}
                      ${!isActive && !isPast ? 'bg-foreground/10' : ''}
                    `}
                  />
                  {/* Active glow */}
                  {isActive && (
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#3A8BFF] blur-md animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Scroll hint - shows at beginning */}
          <div 
            className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
            style={{ opacity: scrollProgress < 0.1 ? 0.5 : 0 }}
          >
            <span className="text-xs uppercase tracking-widest text-foreground/30">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-foreground/20 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
