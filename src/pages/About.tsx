import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Import publisher logos
import iaskLogo from "@/assets/publishers/iask.png";
import rampLogo from "@/assets/publishers/ramp.png";
import deepaiLogo from "@/assets/publishers/deepai.png";
import sourcegraphLogo from "@/assets/publishers/sourcegraph.png";
import presearchLogo from "@/assets/publishers/presearch.png";

// Import advertiser logos
import doordashLogo from "@/assets/advertisers/doordash.png";
import layersLogo from "@/assets/advertisers/layers.png";
import verveLogo from "@/assets/advertisers/verve.png";
import flaxlabsLogo from "@/assets/advertisers/flaxlabs.png";
import revylLogo from "@/assets/advertisers/revyl.png";

// CTA background image (optimized)
import ctaBgImage from "@/assets/about/optimized/cta-bg.jpg";

// Investor logos
import anthropicLogo from "@/assets/careers/Anthropic.png";
import basisSetLogo from "@/assets/careers/basis set.png";
import caffeinatedLogo from "@/assets/careers/caffeinated (1).png";
import generalAdvanceLogo from "@/assets/careers/general Advance.png";
import logosFundLogo from "@/assets/careers/logos Fund.png";
import nextGenVpLogo from "@/assets/careers/NGVP.png";

// Hero team image (optimized)
import heroTeamImage from "@/assets/about/optimized/team.jpg";

// Hero background texture (optimized)
import heroBgTexture from "@/assets/about/optimized/hero-texture.jpg";

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
      className="pb-24 bg-[#0a0a0a] flex flex-col items-center justify-center"
    >
      {/* Bouncing arrow */}
      <div className={`mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <svg 
          className="w-6 h-6 text-white/40 animate-bounce" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Meet text */}
      <p className={`text-white/50 text-sm uppercase tracking-[0.3em] mb-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Meet
      </p>

      {/* Animated Logo - SVG with draw effect */}
      <svg 
        className={`w-[400px] h-[100px] transition-opacity duration-500 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        viewBox="0 0 400 100"
      >
        <defs>
          <linearGradient id="gravityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a0a0a0" />
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
            stroke: 'url(#gravityGradient)',
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
            fill: '#ffffff',
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

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading and trigger animations
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 900);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const problems = [
    {
      title: "Brands can't access high-intent moments inside LLM conversations.",
      description: "Users ask \"What's the best CRM?\" or \"Which hotel in Paris?\", but advertisers have no structured channel to appear in those intent-rich decision points."
    },
    {
      title: "AI apps and agents have no sustainable monetization model.",
      description: "Running LLMs is expensive. Most assistants, bots, and agents don't have a path to profitability. Gravity gives them a clean, native way to generate revenue without breaking UX."
    },
    {
      title: "Free AI isn't economically possible without an ad layer.",
      description: "Just like search engines and social networks needed ads to become free and globally accessible, AI needs a native monetization layer. Gravity is that layer, the economic infrastructure that will fund the future of free AI."
    }
  ];

  // Different order than main page for variety - start with advertisers
  const allLogos = [
    { name: "DoorDash", logo: doordashLogo },
    { name: "Verve", logo: verveLogo },
    { name: "Layers", logo: layersLogo },
    { name: "Sourcegraph", logo: sourcegraphLogo },
    { name: "Flaxlabs", logo: flaxlabsLogo },
    { name: "Presearch", logo: presearchLogo },
    { name: "Revyl", logo: revylLogo },
    { name: "iAsk", logo: iaskLogo },
    { name: "Ramp", logo: rampLogo },
    { name: "DeepAI", logo: deepaiLogo },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Loading Screen */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center transition-all duration-500 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Animated logo/text */}
          <div className="relative">
            <span className="text-3xl font-headline font-bold text-white">Gravity</span>
            {/* Animated underline */}
            <div className="absolute -bottom-2 left-0 h-[2px] bg-white animate-pulse" 
              style={{ 
                width: '100%',
                animation: 'loadingBar 0.8s ease-in-out'
              }} 
            />
          </div>
          {/* Loading dots */}
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* CSS for loading animation */}
      <style>{`
        @keyframes loadingBar {
          0% { width: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { width: 100%; opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#0a0a0a] pt-32 pb-8 px-6 overflow-hidden">
        {/* Background texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ 
            backgroundImage: `url(${heroBgTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(1.2)'
          }}
        />
        
        <div className="relative max-w-5xl mx-auto">
          {/* Centered top section */}
          <div className="text-center mb-20">
            {/* Label */}
            <p className={`text-white/50 text-sm uppercase tracking-[0.3em] mb-8 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              About Gravity
            </p>
            
            {/* Main headline */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-white leading-[1.1] max-w-4xl mx-auto transition-all duration-700 delay-100 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              The infrastructure behind natural suggestions in AI.
            </h1>
          </div>
          
          {/* Two columns - Advertisers & Publishers */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Advertisers Card */}
            <Link 
              to="/advertisers"
              className="group border border-white/10 hover:border-white/30 rounded-xl p-8 transition-all duration-300 hover:bg-white/5"
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-5">For Advertisers</p>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                Reach users at the moment of decision. Appear as native, grounded suggestions inside AI conversations.
              </p>
              <span className="inline-flex items-center gap-2 text-white/50 text-sm group-hover:text-white/80 transition-colors">
                Learn more
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            {/* Publishers Card */}
            <Link 
              to="/publishers"
              className="group border border-white/10 hover:border-white/30 rounded-xl p-8 transition-all duration-300 hover:bg-white/5"
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-5">For Publishers</p>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                Monetize your AI product without breaking the user experience. Native ads built for conversations.
              </p>
              <span className="inline-flex items-center gap-2 text-white/50 text-sm group-hover:text-white/80 transition-colors">
                Learn more
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Vision statement - centered */}
          <div className="pt-8 pb-4 text-center">
            <p className="text-2xl sm:text-3xl text-white leading-snug max-w-3xl mx-auto">
              We believe AI should be free for everyone.
              <br />
              <span className="block mt-3 text-white/60">But free requires infrastructure, a value layer that funds intelligence without taxing the user.</span>
              <br />
              <span className="block mt-3 text-white/60">That ad layer must be native, contextual, and built for conversations.</span>
            </p>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </section>

      {/* Meet Gravity Transition */}
      <MeetGravitySection />

      {/* Office Section */}
      <section className="relative bg-[#0a0a0a]">
        {/* Office Section Header */}
        <div className="px-6 pt-20 pb-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-white mb-3">
              Our Office
            </h2>
            <p className="text-white/50 text-lg">
              500 3rd St, San Francisco, CA 94107, USA
            </p>
          </div>
        </div>

        {/* Full image - NO cropping, centered, with gradient overlay */}
        <div className="relative max-w-5xl mx-auto px-6">
          {/* Gradient overlay at top - blends dark section into image */}
          <div className="absolute top-0 left-6 right-6 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none rounded-t-xl" />
          
          {/* Image container with hover zones */}
          <div className="relative">
            {/* Full image */}
            <img 
              src={heroTeamImage} 
              alt="Gravity team working together at sunset, disco ball, focused engineers, and the office dog" 
              className="w-full h-auto rounded-xl"
            />
            
            {/* Interactive hover zones */}
            
            {/* Hint text */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <p className="text-white/60 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                Hover to meet the team
              </p>
            </div>
            
            {/* Jax the Dog - bottom center */}
            <div className="absolute bottom-[8%] left-[32%] w-[18%] h-[15%] group cursor-pointer">
              {/* Pulsing indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                {/* Label */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl whitespace-nowrap">
                  <p className="text-gray-900 font-semibold text-sm">Jax</p>
                  <p className="text-gray-500 text-xs">Gravity Dog</p>
                </div>
                {/* Line */}
                <div className="w-px h-2 bg-white/60 mx-auto" />
              </div>
            </div>

            {/* Myles - far right, alone at desk - LIKE JOSH but on RIGHT side */}
            <div className="absolute top-[48%] right-[20%] w-[12%] h-[30%] group cursor-pointer">
              {/* Pulsing indicator - positioned to the right where label appears */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
              </div>
              <div className="absolute top-[50%] left-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2">
                {/* Label on RIGHT side of Myles, close to body */}
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
              {/* Pulsing indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
              </div>
              <div className="absolute top-[50%] right-[100%] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                {/* Label */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl whitespace-nowrap flex items-center gap-3">
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">Josh</p>
                    <p className="text-gray-500 text-xs">Head of Sales</p>
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

            {/* Leo - guy with headphones and glasses in CENTER */}
            <div className="absolute top-[48%] left-[32%] w-[14%] h-[28%] group cursor-pointer">
              {/* Pulsing indicator - positioned above where label appears */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                {/* Label */}
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
                {/* Line */}
                <div className="w-px h-2 bg-white/60 mx-auto" />
              </div>
            </div>

            {/* Zach - guy with earbuds at laptop - LIKE LEO, above head centered */}
            <div className="absolute top-[48%] left-[62%] w-[14%] h-[28%] group cursor-pointer">
              {/* Pulsing indicator - positioned above where label appears */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-white/20 rounded-full animate-ping" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                {/* Label ABOVE Zach's head, centered */}
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
                {/* Line */}
                <div className="w-px h-2 bg-white/60 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="py-16 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Funding Raised - Left Side */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-5xl sm:text-6xl font-bold text-white tracking-tight">$6M</p>
                <p className="text-white/50 mt-1">Funding raised</p>
              </div>
              {/* Mini Chart SVG */}
              <svg className="w-20 h-16 text-sky-400" viewBox="0 0 80 50" fill="none">
                <path
                  d="M5 45 Q 15 42, 25 38 T 45 30 T 60 15 T 75 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Stats Pills - Right Side */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-3">
                <span className="w-2 h-2 bg-white/40 rounded-full" />
                <span className="text-white/50 text-sm">Founding year:</span>
                <span className="text-white font-medium text-sm">2025</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-3">
                <span className="w-2 h-2 bg-white/40 rounded-full" />
                <span className="text-white/50 text-sm">Location:</span>
                <span className="text-white font-medium text-sm">San Francisco, CA</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-3">
                <span className="w-2 h-2 bg-white/40 rounded-full" />
                <span className="text-white/50 text-sm">Team size:</span>
                <span className="text-white font-medium text-sm">4 people</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backed By Section */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-white mb-16">
            Backed by
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 items-center justify-items-center">
            {[
              { name: "Anthropic", logo: anthropicLogo },
              { name: "Basis Set", logo: basisSetLogo },
              { name: "Caffeinated", logo: caffeinatedLogo },
              { name: "General Advance", logo: generalAdvanceLogo },
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
                  className="h-32 sm:h-40 w-auto object-contain mix-blend-lighten"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Gravity Solves Section */}
      <section className="py-24 px-6 bg-[#0a0a0a] text-white">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium">Gravity Solves</span>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white mb-16 mt-4">
            Three fundamental problems.
          </h2>

          <div className="space-y-12">
            {problems.map((problem, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center mt-1">
                  <svg className="w-3.5 h-3.5 text-[#0a0a0a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{problem.title}</h3>
                  <p className="text-white/60 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA Section with Background Image */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${ctaBgImage})` }}
        />
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-white mb-6 drop-shadow-lg">
            Come build with us
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto drop-shadow-md">
            We're a small, sharp team working on one of the biggest problems of the decade. If you want to help build real infrastructure for the AI era, we want to meet you.
          </p>
          <Link 
            to="/careers"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 shadow-lg"
          >
            View open roles
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer dark />
    </div>
  );
};

export default About;
