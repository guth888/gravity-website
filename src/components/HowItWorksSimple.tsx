import { useEffect, useRef, useState } from "react";
import { MessageSquare, Sparkles, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Conversations",
    titleAccent: "happen",
    description: "Your users are already having high-intent conversations. Asking, comparing, deciding. Every prompt is a data point about what they actually want.",
  },
  {
    icon: Sparkles,
    number: "02", 
    title: "Gravity",
    titleAccent: "activates",
    description: "When the moment is right, Gravity surfaces a native, high-intent sponsored suggestion that feels like the LLM's own insight. Not a banner. Not an ad. A suggestion.",
  },
  {
    icon: TrendingUp,
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
      className="relative py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 bg-background overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header - Clean, minimal */}
        <div className="text-center mb-20 sm:mb-24 md:mb-32">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15]">
            The conversation is the context.
            <br />
            <span className="gradient">Gravity is the engine.</span>
          </h2>
        </div>

        {/* Steps - Clean vertical layout */}
        <div className="space-y-20 sm:space-y-24 md:space-y-32">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);
            
            return (
              <div
                key={step.number}
                className={`
                  relative
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  transition-all duration-700 ease-out
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                  {/* Number */}
                  <div className="md:col-span-2 flex items-center gap-4 md:justify-end">
                    <span className="text-6xl sm:text-7xl md:text-8xl font-extralight text-muted-foreground/20 leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-8 md:pl-8 md:border-l border-border/30">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-foreground mb-4 leading-tight">
                      {step.title} <span className="gradient">{step.titleAccent}</span>
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
