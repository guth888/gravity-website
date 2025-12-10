import { Link } from "react-router-dom";
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

// CTA background image
import ctaBgImage from "@/assets/about/ChatGPT Image Dec 9, 2025, 01_25_11 PM.png";

// Hero team image
import heroTeamImage from "@/assets/about/908bacf6-9f77-487a-be37-eead0775c50f.jpeg";

const About = () => {
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
      description: "Just like search engines and social networks needed ads to become free and globally accessible, AI needs a native monetization layer. Gravity is that layer — the economic infrastructure that will fund the future of free AI."
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
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#0a0a0a] pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-8">
            About Gravity
          </p>
          
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-white leading-[1.1] mb-12 max-w-3xl">
            The infrastructure behind natural suggestions in AI.
          </h1>
          
          {/* Subhead - single column */}
          <p className="text-lg text-white/50 leading-relaxed max-w-2xl mb-20">
            Gravity is the native ad platform for AI conversations, enabling brands to appear as grounded, organic suggestions at the exact moments users are making decisions.
          </p>
          
          {/* Bottom row - two cards side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="border border-white/10 rounded-lg p-6">
              <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">What we do</p>
              <p className="text-white/60 text-sm leading-relaxed">
                We work with leading AI products, LLM apps, and conversational platforms to unlock high-intent monetization without compromising user trust.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="border border-white/10 rounded-lg p-6">
              <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">Who backs us</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Gravity is supported by world-class operators, founders, and investors shaping the future of AI.
              </p>
            </div>
          </div>
          
          {/* Vision statement - full width */}
          <div className="mt-20 pt-12 border-t border-white/10">
            <p className="text-2xl sm:text-3xl text-white leading-snug max-w-3xl">
              We believe AI should be free for the world.
              <br />
              <span className="block mt-2">That requires a new kind of monetization — native, contextual, and built for conversations.</span>
            </p>
          </div>
        </div>
      </section>

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
              alt="Gravity team working together at sunset — disco ball, focused engineers, and the office dog" 
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

      {/* Scrolling Logo Marquee */}
      <section className="bg-[#0a0a0a] border-y border-white/5 overflow-hidden" style={{ height: '60px' }}>
        {/* Marquee container */}
        <div className="relative h-full flex items-center">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling track */}
          <div className="flex animate-marquee items-center">
            {/* First set of logos */}
            {allLogos.map((item, index) => (
              <div 
                key={`first-${index}`} 
                className="flex-shrink-0 mx-12 flex items-center justify-center"
              >
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="h-14 w-auto object-contain brightness-0 invert opacity-60"
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {allLogos.map((item, index) => (
              <div 
                key={`second-${index}`} 
                className="flex-shrink-0 mx-12 flex items-center justify-center"
              >
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="h-14 w-auto object-contain brightness-0 invert opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* CSS Animation */}
        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>

      {/* What Gravity Is Section */}
      <section className="py-24 px-6 bg-[#0a0a0a] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white leading-tight">
                The missing economic layer.
              </h2>
            </div>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Today's AI ecosystem has a missing economic layer. LLM conversations are where decisions now happen — but there is almost no structured way to fund them.
              </p>
              <p>
                Gravity solves this by creating the infrastructure that connects brands with the moments that matter most: when users are actively asking, comparing, and deciding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Gravity Solves Section */}
      <section className="py-24 px-6 bg-[#0a0a0a] text-white border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white mb-16">
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

      {/* Company Stats Section */}
      <section className="py-16 px-6 bg-[#111] text-white border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Funding Raised - Left Side */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-5xl sm:text-6xl font-bold text-white tracking-tight">$5M</p>
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
                <span className="text-white/60 text-sm">Founding year:</span>
                <span className="text-white font-semibold text-sm">2025</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-3">
                <span className="w-2 h-2 bg-white/40 rounded-full" />
                <span className="text-white/60 text-sm">Location:</span>
                <span className="text-white font-semibold text-sm">San Francisco, CA</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-3">
                <span className="w-2 h-2 bg-white/40 rounded-full" />
                <span className="text-white/60 text-sm">Team size:</span>
                <span className="text-white font-semibold text-sm">4 people</span>
              </div>
            </div>
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
            We're a small, sharp team working on one of the biggest problems of the decade. If you want to help build real infrastructure for the AI era — we want to meet you.
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
