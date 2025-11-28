import { useRef, useState, useEffect } from "react";
import { ArrowRight, MessageSquare, DollarSign, Shield } from "lucide-react";
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
      className="relative py-20 sm:py-28 md:py-32 lg:py-36 px-4 sm:px-6 overflow-hidden bg-background"
    >
      {/* Orange glow background on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-primary/[0.08] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className={`
          grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700
        `}>
          
          {/* Content Side */}
          <div className={`
            space-y-6 sm:space-y-8
            ${isInView ? "translate-x-0" : "-translate-x-12"}
            transition-transform duration-700 delay-100
          `}>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
                For LLM Publishers
              </span>
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Your conversations are
              <span className="block bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                worth something.
              </span>
            </h2>

            {/* Body */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
              You built the space where conversations happen. We built the engine to turn them into revenue—without compromising UX or user trust.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: DollarSign, label: "Higher RPM", sublabel: "Revenue per thousand" },
                { icon: MessageSquare, label: "Same UX", sublabel: "Native integration" },
                { icon: Shield, label: "No Tech Debt", sublabel: "Simple SDK" },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className={`
                    flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50
                    hover:border-primary/30 hover:bg-primary/5 transition-all duration-300
                    ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                to="/publishers"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-orange-500 text-white font-semibold text-base sm:text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                Become a Publisher
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Visual Side - Chat Interface Mockup */}
          <div className={`
            relative
            ${isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}
            transition-all duration-700 delay-300
          `}>
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-3xl blur-2xl" />
            
            {/* Chat Interface Card */}
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Chat Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Powered by your LLM</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-primary/10 rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">What's the best CRM for a small SaaS startup?</p>
                  </div>
                </div>

                {/* AI Response with Gravity suggestion */}
                <div className="flex justify-start">
                  <div className="space-y-3 max-w-[90%]">
                    <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3">
                      <p className="text-sm text-foreground leading-relaxed">
                        For a small SaaS startup, I'd recommend looking at HubSpot CRM or Pipedrive. Both offer great features at startup-friendly pricing...
                      </p>
                    </div>
                    
                    {/* Gravity Suggestion - The money moment */}
                    <div className={`
                      relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-4
                      ${isInView ? "animate-pulse-glow" : ""}
                    `}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary text-xs font-bold">✦</span>
                        </div>
                        <div>
                          <p className="text-xs text-primary font-medium mb-1">Suggested for you</p>
                          <p className="text-sm text-foreground font-medium">Try Salesforce Starter – 30 days free for startups</p>
                          <p className="text-xs text-muted-foreground mt-1">Integrates with your existing stack</p>
                        </div>
                      </div>
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer-slide_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue indicator */}
              <div className={`
                mt-6 pt-4 border-t border-border/50 flex items-center justify-between
                ${isInView ? "opacity-100" : "opacity-0"}
                transition-opacity duration-500 delay-700
              `}>
                <span className="text-xs text-muted-foreground">This suggestion earns you</span>
                <span className="text-lg font-bold text-primary">+$0.42</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

