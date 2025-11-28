import { lazy, Suspense } from "react";
import gravityLogo from '@/assets/gravity-logo.png';
import { PrefetchLink } from "./PrefetchLink";

// Lazy load heavy canvas animations
const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));
const BlackHoleParticles = lazy(() => import("./BlackHoleParticles").then(m => ({
  default: m.BlackHoleParticles
})));
export const Hero = () => {
  return <section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] xl:min-h-[70vh] flex items-center justify-center overflow-hidden bg-background pb-0">
      {/* Mesh Animation Background */}
      <Suspense fallback={null}>
        <div className="absolute inset-0">
          <MeshAnimation className="w-full h-full py-0" />
        </div>
      </Suspense>

      {/* Focus Halo Overlay - adapts to theme */}
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" style={{
      background: 'radial-gradient(circle at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.00) 75%)'
    }} />

      {/* Black Hole Particles (Stars) */}
      <Suspense fallback={null}>
        <BlackHoleParticles />
      </Suspense>

      {/* Content - Device-aware spacing and sizing */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-0 max-w-[95%] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1400px] mx-auto">
        {/* Liquid Glass Badge - Hidden on mobile for cleaner hero */}
        <a href="#how-it-works" className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl animate-fade-in-up antialiased transition-all duration-200 hover:scale-[1.02] mb-3 md:mb-4 bg-muted/50 border border-border/40 text-foreground/90 hover:bg-muted/70" style={{
        boxShadow: '0 8px 32px hsl(var(--background) / 0.1)',
        animationDuration: "0.4s",
        animationFillMode: "both"
      }}>
          
          <span className="text-xs font-medium">​</span>
        </a>

        {/* H1 Headline - Mobile: shorter, punchier. Desktop: full version */}
        <h1 className="hero-headline font-headline font-bold antialiased mb-4 sm:mb-5 md:mb-6">
          {/* Mobile version (320-639px): Shorter, direct */}
          <span className="sm:hidden">
            AI conversations become <span className="gradient">valuable ads</span>
          </span>
          {/* Tablet+ version: Full headline */}
          <span className="hidden sm:inline">
            Where AI <span className="gradient">conversations</span> become the most <span className="gradient">valuable</span> <span className="gradient">ad channel.</span>
          </span>
        </h1>
        
        {/* Subheadline - Mobile: shorter. Tablet+: full description */}
        <p className="font-body font-normal body-text max-w-[100%] sm:max-w-[520px] md:max-w-[700px] lg:max-w-[850px] xl:max-w-[950px] mx-auto mb-5 sm:mb-6 md:mb-8 animate-fade-in-up antialiased text-foreground/70" style={{
        animationDelay: "0.15s",
        animationDuration: "0.4s",
        animationFillMode: "both"
      }}>
          {/* Mobile version: Essential message only */}
          <span className="sm:hidden">
            High-intent ads inside AI conversations that users actually want.
          </span>
          {/* Tablet+ version: Full description */}
          <span className="hidden sm:inline">
            Native, high-intent sponsored suggestions that feel natural to users and unlock revenue for LLM platforms.
          </span>
        </p>
        
        {/* CTA Button - Larger touch target on mobile */}
        <div style={{
        animationDelay: "0.25s",
        animationDuration: "0.4s",
        animationFillMode: "both"
      }} className="animate-fade-in-up py-0">
          <PrefetchLink to="/demo">
            <button className="metallic-button w-full sm:w-auto text-sm sm:text-base" style={{
              padding: "16px 32px",
              minHeight: "48px"
            }}>
              <span>Get a Demo</span>
            </button>
          </PrefetchLink>
        </div>
      </div>
    </section>;
};