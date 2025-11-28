import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import advertiserVisual from "@/assets/advertiser-card-visual.png";
import publisherVisual from "@/assets/publisher-card-visual.png";
export const DualValueCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<"publishers" | "advertisers" | null>(null);

  // Parallax scroll effect (unchanged except for null-guards)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll<HTMLElement>(".dual-card");
      const windowHeight = window.innerHeight;
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const clamped = Math.max(0, Math.min(1, scrollProgress));
          const header = card.querySelector<HTMLElement>(".card-header");
          const body = card.querySelector<HTMLElement>(".card-body");
          if (!header || !body) return;
          const headerOffset = (clamped - 0.5) * 14;
          const bodyOffset = (clamped - 0.5) * 20;
          header.style.transform = `translateY(${headerOffset}px)`;
          body.style.transform = `translateY(${bodyOffset}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const publisherHoverActive = hoveredCard === "publishers";
  const advertiserHoverActive = hoveredCard === "advertisers";
  return <section ref={sectionRef} className="bg-background section-spacing px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 relative overflow-hidden" style={{
    perspective: "2000px",
    transformStyle: "preserve-3d"
  }}>

      {/* Device-aware grid: Mobile=stack, Tablet=2col with dynamic sizing */}
      <div className={["content-container grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-10 relative", "transition-all duration-1200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"].join(" ")} style={{
      gridTemplateColumns: window.innerWidth >= 640 ? (hoveredCard === "publishers" ? "2fr 0.8fr" : hoveredCard === "advertisers" ? "0.8fr 2fr" : "1fr 1fr") : "1fr",
      willChange: "grid-template-columns"
    }}>
        {/* Publisher Card - No 3D transforms on mobile for performance */}
        <div onClick={() => navigate("/publishers/overview")} onMouseEnter={() => setHoveredCard("publishers")} onMouseLeave={() => setHoveredCard(null)} className={["dual-card liquid-glass-card rounded-[20px] overflow-hidden min-h-[380px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[520px] xl:min-h-[540px]", "flex flex-col cursor-pointer relative group", "ease-[cubic-bezier(0.34,1.56,0.64,1)]", publisherHoverActive ? "z-[5] sm:scale-[1.15] sm:-translate-y-8 shadow-[0_40px_120px_rgba(20,184,166,0.5),0_0_80px_rgba(20,184,166,0.3)] transition-all duration-1200" : advertiserHoverActive ? "z-[1] sm:scale-[0.75] sm:translate-y-8 sm:translate-x-8 opacity-40 sm:blur-[3px] sm:brightness-60 sm:saturate-40 transition-all duration-1200" : "z-[3] transition-all duration-900"].join(" ")} style={{
        animationDelay: "0.4s",
        transform: window.innerWidth >= 640 ? (publisherHoverActive ? "perspective(1500px) rotateY(-12deg) rotateX(5deg) translate3d(-1rem, -2rem, 100px)" : advertiserHoverActive ? "perspective(1500px) rotateY(10deg) rotateX(-4deg) translate3d(2rem, 2rem, -80px)" : "perspective(1500px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)") : "none",
        transition: "transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1200ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 1200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 1200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        filter: advertiserHoverActive ? "hue-rotate(-20deg) contrast(0.85)" : "hue-rotate(0deg) contrast(1)",
        willChange: "transform, opacity, filter, box-shadow"
      }}>
          {/* Intense teal glow on active hover */}
          <div className={["absolute inset-0 pointer-events-none z-[1] rounded-[20px] transition-all duration-1200 ease-[cubic-bezier(0.34,1.56,0.64,1)]", publisherHoverActive ? "opacity-100 scale-105" : "opacity-0 scale-100"].join(" ")} style={{
          background: "radial-gradient(circle at 50% 50%, rgba(20,184,166,0.25) 0%, rgba(20,184,166,0.1) 40%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(20px)"
        }} />
          
          {/* Bright wash overlay when OTHER card is hovered */}
          <div className={["absolute inset-0 pointer-events-none z-[1] rounded-[20px] transition-all duration-1200 ease-[cubic-bezier(0.34,1.56,0.64,1)]", advertiserHoverActive ? "opacity-100" : "opacity-0"].join(" ")} style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.6) 100%)",
          backdropFilter: "blur(1px)"
        }} />
          
          {/* Animated shimmer sweep on hover */}
          <div className={["absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[20px]", "transition-opacity duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]", publisherHoverActive ? "opacity-100" : "opacity-0"].join(" ")}>
            <div className="shimmer-sweep shimmer-sweep--teal" />
          </div>
          {/* Card Header - Responsive height */}
          <div className={["card-header chrome-header relative h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] flex flex-col justify-between px-5 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6 pt-3 sm:pt-4 md:pt-5 overflow-hidden"].join(" ")} style={{
          opacity: advertiserHoverActive ? 0.15 : 1,
          transform: publisherHoverActive ? "translateY(0)" : advertiserHoverActive ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) 0ms, transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) 0ms",
          willChange: "opacity, transform"
        }}>
            {/* Background Image */}
            <img src={publisherVisual} alt="AI Conversation Monetization" className="absolute inset-0 w-full h-full object-cover opacity-[0.88] scale-[1.25] transition-transform duration-600 ease-out group-hover:scale-[1.32] group-hover:translate-y-1" style={{
            objectPosition: "center 53%"
          }} />
            {/* Dark vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 20% 0%, rgba(0,0,0,0.45) 0%, transparent 40%), radial-gradient(circle at 80% 0%, rgba(0,0,0,0.5) 0%, transparent 45%), linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)"
          }} />
            {/* Chrome / mesh / glow overlays (from CSS below) */}
            <div className="chrome-specular" />
            <div className="neon-grid-overlay neon-grid--teal" />

            <div className="relative z-10 flex flex-col gap-3">
              <span className="inline-flex items-center w-fit rounded-full border border-emerald-200/40 bg-white/40 px-3 py-[4px] text-[11px] uppercase tracking-[0.18em] text-slate-700/90 backdrop-blur-sm">
                <span className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                For LLM publishers
              </span>
              <h3 className="eyebrow-text text-[11px] tracking-[0.18em] uppercase font-medium text-primary-foreground">
                Monetization that actually respects your users.
              </h3>
            </div>
          </div>

          {/* Card Body - Responsive padding */}
          <div className={["card-body px-5 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-7 flex flex-col flex-1 space-y-2 sm:space-y-3 md:space-y-4"].join(" ")} style={{
          opacity: advertiserHoverActive ? 0.1 : 1,
          transform: publisherHoverActive ? "translateY(0)" : advertiserHoverActive ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms, transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms",
          willChange: "opacity, transform"
        }}>
            {/* Headlines - Mobile: shorter, direct */}
            <h4 className="text-base sm:text-lg md:text-[22px] lg:text-[24px] leading-tight font-semibold text-slate-900">
              <span className="sm:hidden">Turn AI conversations into revenue</span>
              <span className="hidden sm:inline">Turn every AI conversation into effortless, native revenue.</span>
            </h4>
            <p className="text-xs sm:text-sm md:text-[0.9rem] text-slate-600 leading-relaxed">
              <span className="sm:hidden">High-intent suggestions that feel organic and protect UX.</span>
              <span className="hidden sm:inline">Integrate Gravity once to unlock high-intent sponsored suggestions that
              feel organic, protect UX, and monetize conversations automatically.</span>
            </p>

            {/* Metric Badges - Responsive sizing */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
              <span className="pill-metric group/pill relative overflow-hidden">
                <span className="relative z-10">SDK Ready</span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-500/20 translate-x-[-100%] group-hover/pill:translate-x-0 transition-transform duration-500 ease-out" />
              </span>
              <span className="pill-metric group/pill relative overflow-hidden">
                <span className="relative z-10">Real-time Metrics</span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-500/20 translate-x-[-100%] group-hover/pill:translate-x-0 transition-transform duration-500 ease-out" style={{ transitionDelay: "50ms" }} />
              </span>
              <span className="pill-metric group/pill relative overflow-hidden">
                <span className="relative z-10">Privacy-First</span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-500/20 translate-x-[-100%] group-hover/pill:translate-x-0 transition-transform duration-500 ease-out" style={{ transitionDelay: "100ms" }} />
              </span>
            </div>

            {/* CTA Link - Simplified on mobile */}
            <button type="button" className="relative text-xs sm:text-sm font-semibold text-teal-600 inline-flex items-center gap-1 sm:gap-1.5 mt-auto group/link w-fit transition-all duration-300">
              <span className="relative">
                <span className="sm:hidden">Learn more</span>
                <span className="hidden sm:inline">For publishers</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-teal-600 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-out" />
              </span>
              <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 transition-all duration-500 ease-out group-hover/link:translate-x-1 group-hover/link:scale-110" />
            </button>

            {/* Circular CTA Button (mirrors paired motion) */}
            <div className="paired-circle-cta group/circle">
              <span className="absolute inset-0 rounded-full bg-teal-500/20 scale-0 group-hover/circle:scale-100 transition-transform duration-500 ease-out" />
              <ArrowRight className="w-4 h-4 relative z-10 transition-all duration-500 ease-out group-hover/circle:translate-x-1 group-hover/circle:scale-110 group-hover/circle:rotate-[-5deg]" />
            </div>
          </div>
        </div>

        {/* Advertiser Card - Matching responsive patterns */}
        <div onClick={() => navigate("/advertisers")} onMouseEnter={() => setHoveredCard("advertisers")} onMouseLeave={() => setHoveredCard(null)} className={["dual-card liquid-glass-card rounded-[20px] overflow-hidden min-h-[380px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[520px] xl:min-h-[540px]", "flex flex-col cursor-pointer relative group", "ease-[cubic-bezier(0.34,1.56,0.64,1)]", advertiserHoverActive ? "z-[5] sm:scale-[1.15] sm:-translate-y-8 shadow-[0_40px_120px_rgba(168,85,247,0.5),0_0_80px_rgba(168,85,247,0.3)] transition-all duration-1200" : publisherHoverActive ? "z-[1] sm:scale-[0.75] sm:translate-y-8 sm:-translate-x-8 opacity-40 sm:blur-[3px] sm:brightness-60 sm:saturate-40 transition-all duration-1200" : "z-[3] transition-all duration-900"].join(" ")} style={{
        animationDelay: "0.6s",
        transform: window.innerWidth >= 640 ? (advertiserHoverActive ? "perspective(1500px) rotateY(12deg) rotateX(5deg) translate3d(1rem, -2rem, 100px)" : publisherHoverActive ? "perspective(1500px) rotateY(-10deg) rotateX(-4deg) translate3d(-2rem, 2rem, -80px)" : "perspective(1500px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)") : "none",
        transition: "transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1200ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 1200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 1200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        filter: publisherHoverActive ? "hue-rotate(20deg) contrast(0.85)" : "hue-rotate(0deg) contrast(1)",
        willChange: "transform, opacity, filter, box-shadow"
      }}>
          {/* Intense purple glow on active hover */}
          <div className={["absolute inset-0 pointer-events-none z-[1] rounded-[20px] transition-all duration-1200 ease-[cubic-bezier(0.34,1.56,0.64,1)]", advertiserHoverActive ? "opacity-100 scale-105" : "opacity-0 scale-100"].join(" ")} style={{
          background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.25) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(20px)"
        }} />
          
          {/* Bright wash overlay when OTHER card is hovered */}
          <div className={["absolute inset-0 pointer-events-none z-[1] rounded-[20px] transition-all duration-1200 ease-[cubic-bezier(0.34,1.56,0.64,1)]", publisherHoverActive ? "opacity-100" : "opacity-0"].join(" ")} style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.6) 100%)",
          backdropFilter: "blur(1px)"
        }} />
          
          {/* Animated shimmer sweep on hover */}
          <div className={["absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[20px]", "transition-opacity duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]", advertiserHoverActive ? "opacity-100" : "opacity-0"].join(" ")}>
            <div className="shimmer-sweep shimmer-sweep--violet" />
          </div>
          {/* Card Header */}
          <div className={["card-header chrome-header relative h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] flex flex-col justify-between px-5 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6 pt-3 sm:pt-4 md:pt-5 overflow-hidden"].join(" ")} style={{
          opacity: publisherHoverActive ? 0.15 : 1,
          transform: advertiserHoverActive ? "translateY(0)" : publisherHoverActive ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) 0ms, transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) 0ms",
          willChange: "opacity, transform"
        }}>
            <img src={advertiserVisual} alt="Precision Targeting Engine" className="absolute inset-0 w-full h-full object-cover opacity-[0.9] scale-[1.3] transition-transform duration-600 ease-out group-hover:scale-[1.37] group-hover:translate-y-1" style={{
            objectPosition: "center 55%"
          }} />
            <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 20% 0%, rgba(0,0,0,0.4) 0%, transparent 38%), radial-gradient(circle at 80% 0%, rgba(0,0,0,0.55) 0%, transparent 42%), linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.78) 100%)"
          }} />
            <div className="chrome-specular" />
            <div className="neon-grid-overlay neon-grid--violet" />

            <div className="relative z-10 flex flex-col gap-3">
              <span className="inline-flex items-center w-fit rounded-full border border-purple-200/40 bg-white/40 px-3 py-[4px] text-[11px] uppercase tracking-[0.18em] text-slate-700/90 backdrop-blur-sm">
                <span className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                For advertisers & brands
              </span>
              <h3 className="eyebrow-text text-[11px] tracking-[0.18em] uppercase font-medium text-primary-foreground">
                Reach users at the exact moment they want you.
              </h3>
            </div>
          </div>

          {/* Card Body */}
          <div className={["card-body px-5 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-7 flex flex-col flex-1 space-y-2 sm:space-y-3 md:space-y-4"].join(" ")} style={{
          opacity: publisherHoverActive ? 0.1 : 1,
          transform: advertiserHoverActive ? "translateY(0)" : publisherHoverActive ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms, transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms",
          willChange: "opacity, transform"
        }}>
            {/* Headlines - Mobile: concise value prop */}
            <h4 className="text-base sm:text-lg md:text-[22px] lg:text-[24px] leading-tight font-semibold text-slate-900">
              <span className="sm:hidden">Be chosen in AI conversations</span>
              <span className="hidden sm:inline">Be the suggestion they choose inside real AI conversations.</span>
            </h4>
            <p className="text-xs sm:text-sm md:text-[0.9rem] text-slate-600 leading-relaxed">
              <span className="sm:hidden">Native suggestions at high-intent moments drive unmatched ROI.</span>
              <span className="hidden sm:inline">Deliver native, high-intent suggestions exactly when users ask, compare,
              or decide—driving unmatched CTR, conversion lift, and ROI.</span>
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
              <span className="pill-metric group/pill relative overflow-hidden">
                <span className="relative z-10">+50% CTR</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-500/20 translate-x-[-100%] group-hover/pill:translate-x-0 transition-transform duration-500 ease-out" />
              </span>
              <span className="pill-metric group/pill relative overflow-hidden">
                <span className="relative z-10">OpenRTB Ready</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-500/20 translate-x-[-100%] group-hover/pill:translate-x-0 transition-transform duration-500 ease-out" style={{ transitionDelay: "50ms" }} />
              </span>
              <span className="pill-metric group/pill relative overflow-hidden">
                <span className="relative z-10">High-Intent Targeting</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-500/20 translate-x-[-100%] group-hover/pill:translate-x-0 transition-transform duration-500 ease-out" style={{ transitionDelay: "100ms" }} />
              </span>
            </div>

            <button type="button" className="relative text-xs sm:text-sm font-semibold text-teal-600 inline-flex items-center gap-1 sm:gap-1.5 mt-auto group/link w-fit transition-all duration-300">
              <span className="relative">
                <span className="sm:hidden">Learn more</span>
                <span className="hidden sm:inline">For advertisers</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-teal-600 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-out" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-all duration-500 ease-out group-hover/link:translate-x-1 group-hover/link:scale-110" />
            </button>

            <div className="paired-circle-cta group/circle">
              <span className="absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover/circle:scale-100 transition-transform duration-500 ease-out" />
              <ArrowRight className="w-4 h-4 relative z-10 transition-all duration-500 ease-out group-hover/circle:translate-x-1 group-hover/circle:scale-110 group-hover/circle:rotate-[-5deg]" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};