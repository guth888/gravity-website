import { useRef, useState, useEffect } from "react";
import { ArrowRight, Target, Zap, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const AdvertiserCTASection = () => {
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
      {/* Teal glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-accent/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className={`
          grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700
        `}>
          
          {/* Visual Side - Targeting Dashboard */}
          <div className={`
            relative order-2 lg:order-1
            ${isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}
            transition-all duration-700 delay-100
          `}>
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/20 via-accent/5 to-transparent rounded-3xl blur-2xl" />
            
            {/* Targeting Interface Card */}
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Precision Targeting</p>
                    <p className="text-xs text-muted-foreground">Real-time intent matching</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-accent font-medium">Live</span>
                </div>
              </div>

              {/* Intent Signals */}
              <div className="space-y-4 mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Intent Signals</p>
                <div className="flex flex-wrap gap-2">
                  {["Comparing products", "High purchase intent", "B2B SaaS", "Budget $50k+", "Decision maker"].map((tag, idx) => (
                    <span
                      key={tag}
                      className={`
                        px-3 py-1.5 rounded-full text-xs font-medium
                        bg-accent/10 text-accent border border-accent/20
                        ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                        transition-all duration-300
                      `}
                      style={{ transitionDelay: `${400 + idx * 80}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "CTR", value: "4.2%", change: "+127%", icon: Zap },
                  { label: "Conv Rate", value: "12.8%", change: "+89%", icon: Target },
                  { label: "ROAS", value: "6.4x", change: "+215%", icon: BarChart3 },
                ].map((metric, idx) => (
                  <div
                    key={metric.label}
                    className={`
                      p-4 rounded-xl bg-accent/5 border border-accent/10
                      ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                      transition-all duration-500
                    `}
                    style={{ transitionDelay: `${600 + idx * 100}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className="w-4 h-4 text-accent" />
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-accent font-medium">{metric.change} vs search</p>
                  </div>
                ))}
              </div>

              {/* Audience Reach */}
              <div className={`
                p-4 rounded-xl bg-gradient-to-r from-accent/10 to-transparent border border-accent/20
                flex items-center justify-between
                ${isInView ? "opacity-100" : "opacity-0"}
                transition-opacity duration-500 delay-700
              `}>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Active Audience Reach</p>
                    <p className="text-xs text-muted-foreground">High-intent LLM users</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-accent">2.4M</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`
            space-y-6 sm:space-y-8 order-1 lg:order-2
            ${isInView ? "translate-x-0" : "translate-x-12"}
            transition-transform duration-700 delay-200
          `}>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs sm:text-sm font-medium uppercase tracking-wider">
                For Advertisers & Brands
              </span>
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Your buyers are having
              <span className="block bg-gradient-to-r from-accent to-teal-400 bg-clip-text text-transparent">
                conversations right now.
              </span>
            </h2>

            {/* Body */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
              High-intent moments happen in LLM chats, not just search. Be there. Gravity reaches users at the exact second they're deciding.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Higher CTR", sublabel: "+127% vs display" },
                { label: "Lower CAC", sublabel: "Intent-based pricing" },
                { label: "Clean Attribution", sublabel: "Conversation-level" },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className={`
                    p-4 rounded-xl bg-card/50 border border-border/50
                    hover:border-accent/30 hover:bg-accent/5 transition-all duration-300
                    ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                  style={{ transitionDelay: `${400 + idx * 100}ms` }}
                >
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sublabel}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                to="/advertisers"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent to-teal-400 text-accent-foreground font-semibold text-base sm:text-lg shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                Explore Advertiser Placements
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

