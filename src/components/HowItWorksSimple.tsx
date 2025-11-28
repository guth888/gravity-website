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

// Animated Globe with chat nodes for Step 1
const ConversationsVisual = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80">
      {/* Globe outline */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        {/* Globe circles */}
        <ellipse cx="100" cy="100" rx="80" ry="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
        <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
        <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
        
        {/* Latitude lines */}
        <ellipse cx="100" cy="60" rx="65" ry="20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-foreground/5" />
        <ellipse cx="100" cy="140" rx="65" ry="20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-foreground/5" />
      </svg>
      
      {/* Animated chat nodes */}
      {isActive && (
        <>
          {/* Node 1 - Top right */}
          <div className="absolute top-[15%] right-[20%] animate-pulse" style={{ animationDelay: '0s' }}>
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#3A8BFF] shadow-[0_0_20px_rgba(58,139,255,0.6)]" />
              <div className="absolute -top-6 -right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Node 2 - Left */}
          <div className="absolute top-[40%] left-[10%] animate-pulse" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#4BA3FF] shadow-[0_0_15px_rgba(75,163,255,0.5)]" />
              <div className="absolute -top-5 -left-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Node 3 - Bottom */}
          <div className="absolute bottom-[25%] left-[35%] animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[#A9AAAE] shadow-[0_0_12px_rgba(169,170,174,0.5)]" />
              <div className="absolute -bottom-5 -left-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.6s' }} />
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.7s' }} />
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.8s' }} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Node 4 - Right */}
          <div className="absolute top-[60%] right-[15%] animate-pulse" style={{ animationDelay: '1.5s' }}>
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3A8BFF] shadow-[0_0_15px_rgba(58,139,255,0.5)]" />
              <div className="absolute -top-5 -right-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0.9s' }} />
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '1s' }} />
                  <div className="w-1 h-1 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '1.1s' }} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
            <path 
              d="M 140 35 Q 100 80 35 85" 
              fill="none" 
              stroke="url(#lineGradient)" 
              strokeWidth="0.5" 
              strokeDasharray="4 2"
              className="animate-pulse"
            />
            <path 
              d="M 35 85 Q 70 120 75 150" 
              fill="none" 
              stroke="url(#lineGradient)" 
              strokeWidth="0.5" 
              strokeDasharray="4 2"
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
            <path 
              d="M 75 150 Q 120 140 165 125" 
              fill="none" 
              stroke="url(#lineGradient)" 
              strokeWidth="0.5" 
              strokeDasharray="4 2"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3A8BFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#A9AAAE" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </>
      )}
    </div>
  );
};

// Activation spark visual for Step 2
const ActivationVisual = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
      {/* Chat interface mockup */}
      <div className="relative w-48 sm:w-56 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-foreground/5 overflow-hidden">
        {/* Chat header */}
        <div className="px-4 py-3 border-b border-foreground/5 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3A8BFF] to-[#A9AAAE]" />
          <span className="text-xs font-medium text-foreground/60">AI Assistant</span>
        </div>
        
        {/* Messages */}
        <div className="p-3 space-y-2">
          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-foreground/5 rounded-xl rounded-br-sm px-3 py-2 max-w-[80%]">
              <p className="text-[10px] text-foreground/70">Best CRM for startups?</p>
            </div>
          </div>
          
          {/* AI response */}
          <div className="flex justify-start">
            <div className="bg-foreground/[0.02] rounded-xl rounded-bl-sm px-3 py-2 max-w-[85%]">
              <p className="text-[10px] text-foreground/60">I'd recommend looking at...</p>
            </div>
          </div>
          
          {/* Gravity suggestion - The magic moment */}
          {isActive && (
            <div className="relative mt-2 animate-fade-in-up">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#3A8BFF]/20 to-[#A9AAAE]/20 rounded-xl blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-r from-[#3A8BFF]/10 to-[#A9AAAE]/10 border border-[#3A8BFF]/30 rounded-xl px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3A8BFF] animate-pulse" />
                  <span className="text-[8px] font-medium text-[#3A8BFF]">Suggested</span>
                </div>
                <p className="text-[10px] text-foreground/80 font-medium">Try Salesforce Starter</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating sparkles */}
      {isActive && (
        <>
          <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-[#3A8BFF] rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-[#4BA3FF] rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          <div className="absolute bottom-[30%] left-[20%] w-1 h-1 bg-[#A9AAAE] rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          <div className="absolute bottom-[20%] right-[25%] w-1 h-1 bg-[#3A8BFF] rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '1.5s' }} />
        </>
      )}
    </div>
  );
};

// Value unlock visual for Step 3
const ValueVisual = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
      {/* Three value streams converging */}
      <div className="relative w-full h-full">
        {/* Center convergence point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#3A8BFF] to-[#A9AAAE] flex items-center justify-center shadow-[0_0_40px_rgba(58,139,255,0.3)] transition-all duration-700 ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <span className="text-white text-xl font-bold">G</span>
          </div>
        </div>
        
        {/* Publisher stream - Top left */}
        {isActive && (
          <div className="absolute top-[15%] left-[15%] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-foreground/5">
              <p className="text-[9px] text-foreground/40 mb-1">Publisher Revenue</p>
              <p className="text-sm font-bold text-foreground">+$2.4M</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-8 h-1 rounded-full bg-[#3A8BFF]/20">
                  <div className="w-6 h-1 rounded-full bg-[#3A8BFF] animate-pulse" />
                </div>
              </div>
            </div>
            {/* Connecting line */}
            <svg className="absolute top-full left-1/2 w-20 h-20" viewBox="0 0 80 80">
              <path 
                d="M 0 0 Q 40 40 60 70" 
                fill="none" 
                stroke="url(#valueGradient1)" 
                strokeWidth="1.5" 
                strokeDasharray="4 2"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="valueGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3A8BFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3A8BFF" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        
        {/* Advertiser stream - Top right */}
        {isActive && (
          <div className="absolute top-[15%] right-[15%] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-foreground/5">
              <p className="text-[9px] text-foreground/40 mb-1">Advertiser ROAS</p>
              <p className="text-sm font-bold text-foreground">6.4x</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-8 h-1 rounded-full bg-[#4BA3FF]/20">
                  <div className="w-7 h-1 rounded-full bg-[#4BA3FF] animate-pulse" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>
            {/* Connecting line */}
            <svg className="absolute top-full right-1/2 w-20 h-20" viewBox="0 0 80 80">
              <path 
                d="M 80 0 Q 40 40 20 70" 
                fill="none" 
                stroke="url(#valueGradient2)" 
                strokeWidth="1.5" 
                strokeDasharray="4 2"
                className="animate-pulse"
                style={{ animationDelay: '0.3s' }}
              />
              <defs>
                <linearGradient id="valueGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4BA3FF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#4BA3FF" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        
        {/* User stream - Bottom */}
        {isActive && (
          <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-foreground/5">
              <p className="text-[9px] text-foreground/40 mb-1">User Satisfaction</p>
              <p className="text-sm font-bold text-foreground">+68%</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-8 h-1 rounded-full bg-[#A9AAAE]/20">
                  <div className="w-5 h-1 rounded-full bg-[#A9AAAE] animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
            </div>
            {/* Connecting line */}
            <svg className="absolute bottom-full left-1/2 -translate-x-1/2 w-20 h-16" viewBox="0 0 80 60">
              <path 
                d="M 40 60 L 40 0" 
                fill="none" 
                stroke="url(#valueGradient3)" 
                strokeWidth="1.5" 
                strokeDasharray="4 2"
                className="animate-pulse"
                style={{ animationDelay: '0.6s' }}
              />
              <defs>
                <linearGradient id="valueGradient3" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#A9AAAE" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#A9AAAE" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

// Visual components map
const StepVisuals = [ConversationsVisual, ActivationVisual, ValueVisual];

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
      
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      setScrollProgress(progress);
      
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

  const getStepVisibility = (stepIndex: number) => {
    const headerZone = 0.12;
    const contentProgress = Math.max(0, (scrollProgress - headerZone) / (1 - headerZone));
    
    const stepSize = 1 / steps.length;
    const stepStart = stepIndex * stepSize;
    const stepEnd = (stepIndex + 1) * stepSize;
    
    const entryZone = stepSize * 0.15;
    const exitZone = stepSize * 0.15;
    const holdStart = stepStart + entryZone;
    const holdEnd = stepEnd - exitZone;
    
    if (contentProgress < stepStart) return { phase: 'future', progress: 0 };
    if (contentProgress < holdStart) {
      const entryProgress = (contentProgress - stepStart) / entryZone;
      return { phase: 'entering', progress: Math.min(1, entryProgress) };
    }
    if (contentProgress < holdEnd) {
      return { phase: 'active', progress: 1 };
    }
    if (contentProgress < stepEnd) {
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
      style={{ height: `${150 + (steps.length * 120)}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Mesh Animation Background */}
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-40">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[650px] md:max-w-[900px] lg:max-w-[1100px] mx-auto">
          
          {/* Header */}
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
              const VisualComponent = StepVisuals[index];
              
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
                  {/* Card container */}
                  <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 md:p-12 shadow-[0_8px_60px_rgba(0,0,0,0.06)] border border-foreground/5 max-w-3xl">
                    {/* Visual */}
                    <div className="flex justify-center mb-6">
                      <VisualComponent isActive={phase === 'active' || phase === 'entering'} />
                    </div>
                    
                    {/* Step Number */}
                    <div className="mb-4">
                      <span className="text-sm font-medium tracking-[0.3em] text-foreground/30">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-foreground mb-4 leading-[1.1]">
                      {step.title} <span className="gradient">{step.titleAccent}</span>
                    </h3>

                    {/* Step Description */}
                    <p className="text-sm sm:text-base text-foreground/50 leading-relaxed max-w-lg mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            {steps.map((_, index) => {
              const { phase } = getStepVisibility(index);
              const isActive = phase === 'active' || phase === 'entering' || phase === 'exiting';
              const isPast = phase === 'past';
              
              return (
                <div key={index} className="flex items-center gap-4">
                  <button
                    className={`
                      relative w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out
                      ${isActive ? 'scale-125' : 'scale-100'}
                    `}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, #3A8BFF, #A9AAAE)' 
                        : isPast 
                          ? 'rgba(0,0,0,0.2)' 
                          : 'rgba(0,0,0,0.08)',
                    }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#3A8BFF]/40 blur-sm animate-pulse" />
                    )}
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div 
                      className="w-8 sm:w-12 h-px transition-all duration-500"
                      style={{
                        background: isPast 
                          ? 'linear-gradient(90deg, rgba(58,139,255,0.3), rgba(169,170,174,0.2))' 
                          : 'rgba(0,0,0,0.06)',
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
