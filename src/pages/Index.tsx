import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Link } from "react-router-dom";
import { Preloader } from "@/components/Preloader";

// Investor logos
import anthropicLogo from "@/assets/careers/Anthropic.png";
import basisSetLogo from "@/assets/careers/basis set.png";
import caffeinatedLogo from "@/assets/careers/caffeinated (1).png";
import generalAdvanceLogo from "@/assets/careers/general Advance.png";
import logosFundLogo from "@/assets/careers/logos Fund.png";
import nextGenVpLogo from "@/assets/careers/NGVP.png";
import haystackLogo from "@/assets/careers/Haystack.png";

// Team image for Office section
import heroTeamImage from "@/assets/about/optimized/team.jpg";

// Lazy load heavy components for instant initial render
const SocialProofBand = lazy(() => import("@/components/SocialProofBand").then(m => ({
  default: m.SocialProofBand
})));
const HowItWorksSimple = lazy(() => import("@/components/HowItWorksSimple").then(m => ({
  default: m.HowItWorksSimple
})));
const DualAudienceSection = lazy(() => import("@/components/DualAudienceSection").then(m => ({
  default: m.DualAudienceSection
})));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({
  default: m.FAQSection
})));
const Footer = lazy(() => import("@/components/Footer").then(m => ({
  default: m.Footer
})));

// Meet Gravity Transition Component
const MeetGravitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="pb-0 bg-gray-50/50 flex flex-col items-center justify-center"
    >
      <style>
        {`
          @keyframes spinInIndex {
            0% {
              transform: scale(0.2) rotate(-360deg);
              opacity: 0;
            }
            60% {
              transform: scale(1.15) rotate(30deg);
              opacity: 1;
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }
        `}
      </style>
      {/* Bouncing arrow */}
      <div className={`mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <svg 
          className="w-6 h-6 text-gray-400 animate-bounce" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Meet text */}
      <p className={`text-gray-500 text-sm uppercase tracking-[0.3em] mb-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Meet
      </p>

      {/* Animated Logo - SVG with draw effect */}
      <svg 
        className={`w-[400px] h-[100px] transition-opacity duration-500 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        viewBox="0 0 400 100"
      >
        <defs>
          <linearGradient id="gravityGradientIndex" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#4a4a4a" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-headline font-bold"
          style={{
            fontSize: '72px',
            fill: 'none',
            stroke: 'url(#gravityGradientIndex)',
            strokeWidth: '1.5px',
            strokeDasharray: 600,
            strokeDashoffset: isVisible ? 0 : 600,
            transition: 'stroke-dashoffset 4s ease-out 1.5s',
          }}
        >
          Gravity
        </text>
        {/* Fill text that fades in after stroke */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-headline font-bold"
          style={{
            fontSize: '72px',
            fill: '#1a1a1a',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1.5s ease-out 5s',
          }}
        >
          Gravity
        </text>
      </svg>

    </section>
  );
};

const Index = () => {
  // Determine if we should show preloader based on navigation type
  const shouldShowPreloader = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check if already shown in this session
    if (sessionStorage.getItem('gravity_preloader_seen') === 'true') {
      return false;
    }
    
    // Check navigation type using Performance API
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        const navType = navEntries[0].type;
        // 'navigate' = typing URL or clicking external link (show preloader)
        // 'reload' = refresh (don't show preloader)
        // 'back_forward' = browser back/forward (don't show preloader)
        return navType === 'navigate';
      }
    } catch (e) {
      // Fallback: check referrer - empty referrer usually means typing URL
      const referrer = document.referrer;
      const currentHost = window.location.hostname;
      const referrerHost = referrer ? new URL(referrer).hostname : '';
      
      // Show if no referrer (direct navigation) or referrer is from different domain
      return !referrer || referrerHost !== currentHost;
    }
    
    return false;
  };
  
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader());
  const [contentVisible, setContentVisible] = useState(!showPreloader);

  const handlePreloaderComplete = () => {
    // Mark preloader as seen in this session (clears when tab closes)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('gravity_preloader_seen', 'true');
    }
    setShowPreloader(false);
    setContentVisible(true);
  };

  return (
    <ErrorBoundary>
      {/* Preloader */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div className={`min-h-screen bg-background transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Social Proof - Logo Marquee */}
        <Suspense fallback={null}>
          <SocialProofBand className="mt-0" />
        </Suspense>
        
        {/* How It Works - 3 Step Process */}
        <Suspense fallback={null}>
          <HowItWorksSimple />
        </Suspense>
        
        {/* Dual Audience Section - Publishers & Advertisers */}
        <Suspense fallback={null}>
          <DualAudienceSection />
        </Suspense>
        
        {/* Backed By Section */}
        <section className="pt-20 sm:pt-24 pb-8 sm:pb-10 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-headline font-bold text-foreground mb-6 sm:mb-8 text-center">
              Backed by
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 items-center justify-items-center">
              {[
                { name: "Anthropic", logo: anthropicLogo },
                { name: "Basis Set", logo: basisSetLogo },
                { name: "Caffeinated", logo: caffeinatedLogo },
                { name: "General Advance", logo: generalAdvanceLogo },
                { name: "Haystack", logo: haystackLogo },
                { name: "Logos Fund", logo: logosFundLogo },
                { name: "NextGen VP", logo: nextGenVpLogo },
              ].map((backer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-full"
                >
                  <img 
                    src={backer.logo} 
                    alt={backer.name}
                    className="h-32 sm:h-44 lg:h-48 w-auto object-contain invert mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Vision Statement Section */}
        <section className="pt-0 pb-16 sm:pb-20 bg-gray-50/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-2xl sm:text-3xl text-foreground leading-snug">
              We believe AI should be free for everyone.
              <br />
              <span className="block mt-3 text-muted-foreground">But free requires infrastructure, a value layer that funds intelligence without taxing the user.</span>
              <br />
              <span className="block mt-3 text-muted-foreground">That ad layer must be native, contextual, and built for conversations.</span>
            </p>
          </div>
        </section>

        {/* Meet Gravity Transition */}
        <MeetGravitySection />

        {/* Office Section */}
        <section className="relative bg-gray-50/50">
          {/* Office Section Header */}
          <div className="px-6 pt-20 pb-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-foreground mb-3">
                Our Office
              </h2>
              <p className="text-muted-foreground text-lg">
                500 3rd St, San Francisco, CA 94107, USA
              </p>
            </div>
          </div>

          {/* Full image with gradient overlay */}
          <div className="relative max-w-5xl mx-auto px-6 pb-8">
            {/* Gradient overlay at top */}
            <div className="absolute top-0 left-6 right-6 h-32 bg-gradient-to-b from-gray-50/50 to-transparent z-10 pointer-events-none rounded-t-xl" />
            
            {/* Image container with hover zones */}
            <div className="relative">
              {/* Full image */}
              <img 
                src={heroTeamImage} 
                alt="Gravity team working together at sunset, disco ball, focused engineers, and the office dog" 
                className="w-full h-auto rounded-xl"
              />
              
              {/* Hint text */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                <p className="text-gray-900 text-sm flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
                  Hover to meet the team
                </p>
              </div>
              
              {/* Jax the Dog - bottom center */}
              <div className="absolute bottom-[8%] left-[32%] w-[18%] h-[15%] group cursor-pointer">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl whitespace-nowrap">
                    <p className="text-gray-900 font-semibold text-sm">Jax</p>
                    <p className="text-gray-500 text-xs">Gravity Dog</p>
                  </div>
                  <div className="w-px h-2 bg-white/60 mx-auto" />
                </div>
              </div>

              {/* Myles - far right */}
              <div className="absolute top-[48%] right-[20%] w-[12%] h-[30%] group cursor-pointer">
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
                </div>
                <div className="absolute top-[50%] left-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl whitespace-nowrap flex items-center gap-3">
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">Myles</p>
                      <p className="text-gray-500 text-xs">Founding Engineer</p>
                    </div>
                    <a 
                      href="https://x.com/mylesndav" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Josh - guy on left at desk */}
              <div className="absolute top-[48%] left-[22%] w-[12%] h-[30%] group cursor-pointer">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
                </div>
                <div className="absolute top-[50%] right-[100%] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl whitespace-nowrap flex items-center gap-3">
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">Josh</p>
                      <p className="text-gray-500 text-xs">Founding GTM</p>
                    </div>
                    <a 
                      href="https://x.com/1joshhamilton" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Leo - guy with headphones in center */}
              <div className="absolute top-[48%] left-[32%] w-[14%] h-[28%] group cursor-pointer">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl whitespace-nowrap flex items-center gap-3">
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">Leo</p>
                      <p className="text-gray-500 text-xs">Co-founder & CTO</p>
                    </div>
                    <a 
                      href="https://x.com/leojamartinez" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                  <div className="w-px h-2 bg-white/60 mx-auto" />
                </div>
              </div>

              {/* Zach - guy with earbuds at laptop */}
              <div className="absolute top-[48%] left-[62%] w-[14%] h-[28%] group cursor-pointer">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl whitespace-nowrap flex items-center gap-3">
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">Zach</p>
                      <p className="text-gray-500 text-xs">Co-Founder & CEO</p>
                    </div>
                    <a 
                      href="https://x.com/zachtheoldham" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                  <div className="w-px h-2 bg-white/60 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats Section */}
        <section className="pt-0 pb-16 px-6 bg-gray-50/50">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-10">
              {/* Stats Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-5 py-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-muted-foreground text-sm">Founding year:</span>
                  <span className="text-foreground font-medium text-sm">2025</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-5 py-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-muted-foreground text-sm">Location:</span>
                  <span className="text-foreground font-medium text-sm">San Francisco, CA</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-5 py-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-muted-foreground text-sm">Team size:</span>
                  <span className="text-foreground font-medium text-sm">4 people</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                What people are saying
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground mt-3">
                Trusted by industry leaders
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  quote: "Traditional display just doesn't work in conversational interfaces. We needed something native.",
                  company: "AI Platform",
                  author: "Product Lead"
                },
                {
                  quote: "Every question is a buying signal. We just needed a way to be there at the right moment.",
                  company: "E-commerce Brand",
                  author: "Growth Director"
                },
                {
                  quote: "The suggestions feel like a natural part of the conversation. Users actually thank us for them.",
                  company: "SaaS Company",
                  author: "Marketing VP"
                },
                {
                  quote: "This is the first truly new ad format in a decade. We're seeing results we never thought possible.",
                  company: "DTC Brand",
                  author: "CEO"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden"
                >
                  {/* Dotted background pattern */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />
                  
                  <div className="relative z-10">
                    {/* Company */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {testimonial.company.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{testimonial.company}</span>
                    </div>
                    
                    {/* Quote */}
                    <p className="text-sm text-foreground leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    
                    {/* Attribution */}
                    <p className="text-sm text-muted-foreground">
                      — {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Docs CTA Section */}
        <section className="py-16 sm:py-20 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground mb-3">
              Want to learn more?
            </h2>
            <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our comprehensive documentation to understand how Gravity works.
            </p>
            <Link 
              to="/docs"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors text-sm"
            >
              Read the Docs
            </Link>
          </div>
        </section>
        
        {/* FAQ Section */}
        <Suspense fallback={null}>
          <FAQSection />
        </Suspense>
        
        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
