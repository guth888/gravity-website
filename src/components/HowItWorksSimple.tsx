import { useEffect, useRef, useState } from "react";
import { MessageSquare, Sparkles, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Conversations happen",
    description: "Your users are already having high-intent conversations. Asking, comparing, deciding. Every prompt is a data point about what they actually want.",
    visual: "user-asking", // placeholder for future illustration
  },
  {
    icon: Sparkles,
    number: "02", 
    title: "Gravity activates",
    description: "When the moment is right, Gravity surfaces a native, high-intent sponsored suggestion that feels like the LLM's own insight. Not a banner. Not an ad. A suggestion.",
    visual: "suggestion-appearing",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Value unlocks",
    description: "Publishers get revenue. Advertisers get precision. Users get helpful suggestions they actually want. Gravity makes all three things happen simultaneously.",
    visual: "revenue-flowing",
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
      { threshold: 0.15 }
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
        }, index * 400);
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 bg-background overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/[0.03] to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-6 uppercase tracking-[0.12em]">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
            The conversation is the context.
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient-shift_8s_ease-in-out_infinite]">
              Gravity is the engine.
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Three simple steps from conversation to conversion.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);
            
            return (
              <div
                key={step.number}
                className={`
                  relative group
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(255,77,0,0.15)] group-hover:-translate-y-2">
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-primary-foreground text-sm font-bold">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 pt-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500">
                      <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>

                  {/* Connector line (desktop only, between cards) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 lg:-right-5 w-6 lg:w-10 h-[2px]">
                      <div className={`
                        h-full bg-gradient-to-r from-primary/40 to-primary/10
                        ${isVisible ? "scale-x-100" : "scale-x-0"}
                        origin-left transition-transform duration-700 delay-500
                      `} />
                      <div className={`
                        absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60
                        ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                        transition-all duration-300 delay-700
                      `} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom connector visual */}
        <div className={`
          mt-16 sm:mt-20 flex flex-col items-center
          ${visibleSteps.length === steps.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          transition-all duration-700 delay-500
        `}>
          <div className="w-[2px] h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

