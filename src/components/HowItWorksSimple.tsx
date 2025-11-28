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
  {
    number: "04",
    title: "Integration",
    titleAccent: "ready",
    description: "Get started in minutes with our production-ready SDKs. Drop-in components, type-safe APIs, and comprehensive documentation.",
  },
];

// Chat bubble component
const ChatBubble = ({ delay, size = 'sm' }: { delay: number; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5',
    md: 'px-2 py-1',
    lg: 'px-2.5 py-1.5',
  };
  const dotSizes = {
    sm: 'w-0.5 h-0.5',
    md: 'w-1 h-1',
    lg: 'w-1 h-1',
  };
  
  return (
    <div 
      className={`bg-white/95 backdrop-blur-sm rounded-full shadow-lg ${sizeClasses[size]} flex gap-0.5 items-center`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`${dotSizes[size]} rounded-full bg-[#3A8BFF] animate-bounce`} style={{ animationDelay: `${delay}s` }} />
      <div className={`${dotSizes[size]} rounded-full bg-[#4BA3FF] animate-bounce`} style={{ animationDelay: `${delay + 0.1}s` }} />
      <div className={`${dotSizes[size]} rounded-full bg-[#A9AAAE] animate-bounce`} style={{ animationDelay: `${delay + 0.2}s` }} />
    </div>
  );
};

// Animated Globe with chat nodes for Step 1
const ConversationsVisual = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-72 h-72 sm:w-96 sm:h-96">
      {/* Rotating globe container */}
      <div 
        className="absolute inset-0"
        style={{ 
          animation: isActive ? 'spin 30s linear infinite' : 'none',
        }}
      >
        {/* Globe SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3A8BFF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#4BA3FF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#A9AAAE" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Globe fill */}
          <circle cx="100" cy="100" r="75" fill="url(#globeGradient)" />
          
          {/* Main circle */}
          <circle cx="100" cy="100" r="75" fill="none" stroke="#3A8BFF" strokeWidth="1" opacity="0.3" />
          
          {/* Equator */}
          <ellipse cx="100" cy="100" rx="75" ry="25" fill="none" stroke="#3A8BFF" strokeWidth="0.5" opacity="0.2" />
          
          {/* Meridians */}
          <ellipse cx="100" cy="100" rx="25" ry="75" fill="none" stroke="#4BA3FF" strokeWidth="0.5" opacity="0.15" />
          <ellipse cx="100" cy="100" rx="50" ry="75" fill="none" stroke="#4BA3FF" strokeWidth="0.5" opacity="0.15" />
          <ellipse cx="100" cy="100" rx="75" ry="75" fill="none" stroke="#4BA3FF" strokeWidth="0.5" opacity="0.1" 
            transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="75" ry="75" fill="none" stroke="#4BA3FF" strokeWidth="0.5" opacity="0.1" 
            transform="rotate(-60 100 100)" />
          
          {/* Latitude lines */}
          <ellipse cx="100" cy="55" rx="60" ry="18" fill="none" stroke="#A9AAAE" strokeWidth="0.3" opacity="0.2" />
          <ellipse cx="100" cy="145" rx="60" ry="18" fill="none" stroke="#A9AAAE" strokeWidth="0.3" opacity="0.2" />
          <ellipse cx="100" cy="75" rx="70" ry="22" fill="none" stroke="#A9AAAE" strokeWidth="0.3" opacity="0.15" />
          <ellipse cx="100" cy="125" rx="70" ry="22" fill="none" stroke="#A9AAAE" strokeWidth="0.3" opacity="0.15" />
        </svg>
      </div>
      
      {/* Chat nodes - These don't rotate */}
      {isActive && (
        <div className="absolute inset-0">
          {/* Ring 1 - Outer nodes */}
          <div className="absolute top-[5%] left-[45%] animate-pulse"><ChatBubble delay={0} size="md" /></div>
          <div className="absolute top-[12%] right-[15%] animate-pulse" style={{ animationDelay: '0.3s' }}><ChatBubble delay={0.3} size="sm" /></div>
          <div className="absolute top-[25%] right-[5%] animate-pulse" style={{ animationDelay: '0.6s' }}><ChatBubble delay={0.6} size="md" /></div>
          <div className="absolute top-[45%] right-[2%] animate-pulse" style={{ animationDelay: '0.9s' }}><ChatBubble delay={0.9} size="lg" /></div>
          <div className="absolute top-[65%] right-[8%] animate-pulse" style={{ animationDelay: '1.2s' }}><ChatBubble delay={1.2} size="sm" /></div>
          <div className="absolute top-[80%] right-[20%] animate-pulse" style={{ animationDelay: '1.5s' }}><ChatBubble delay={1.5} size="md" /></div>
          <div className="absolute bottom-[5%] left-[45%] animate-pulse" style={{ animationDelay: '1.8s' }}><ChatBubble delay={1.8} size="sm" /></div>
          <div className="absolute top-[80%] left-[15%] animate-pulse" style={{ animationDelay: '2.1s' }}><ChatBubble delay={2.1} size="md" /></div>
          <div className="absolute top-[65%] left-[3%] animate-pulse" style={{ animationDelay: '2.4s' }}><ChatBubble delay={2.4} size="lg" /></div>
          <div className="absolute top-[45%] left-[0%] animate-pulse" style={{ animationDelay: '2.7s' }}><ChatBubble delay={2.7} size="sm" /></div>
          <div className="absolute top-[25%] left-[5%] animate-pulse" style={{ animationDelay: '3s' }}><ChatBubble delay={3} size="md" /></div>
          <div className="absolute top-[12%] left-[18%] animate-pulse" style={{ animationDelay: '3.3s' }}><ChatBubble delay={3.3} size="sm" /></div>
          
          {/* Ring 2 - Inner nodes */}
          <div className="absolute top-[20%] left-[35%] animate-pulse" style={{ animationDelay: '0.5s' }}><ChatBubble delay={0.5} size="sm" /></div>
          <div className="absolute top-[30%] right-[25%] animate-pulse" style={{ animationDelay: '1s' }}><ChatBubble delay={1} size="md" /></div>
          <div className="absolute top-[55%] right-[22%] animate-pulse" style={{ animationDelay: '1.5s' }}><ChatBubble delay={1.5} size="sm" /></div>
          <div className="absolute top-[70%] left-[35%] animate-pulse" style={{ animationDelay: '2s' }}><ChatBubble delay={2} size="md" /></div>
          <div className="absolute top-[55%] left-[20%] animate-pulse" style={{ animationDelay: '2.5s' }}><ChatBubble delay={2.5} size="sm" /></div>
          <div className="absolute top-[35%] left-[22%] animate-pulse" style={{ animationDelay: '3s' }}><ChatBubble delay={3} size="md" /></div>
          
          {/* Glowing dots on globe surface */}
          <div className="absolute top-[18%] left-[48%] w-2 h-2 rounded-full bg-[#3A8BFF] shadow-[0_0_10px_rgba(58,139,255,0.8)] animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute top-[35%] right-[28%] w-1.5 h-1.5 rounded-full bg-[#4BA3FF] shadow-[0_0_8px_rgba(75,163,255,0.7)] animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          <div className="absolute top-[50%] right-[18%] w-2 h-2 rounded-full bg-[#3A8BFF] shadow-[0_0_10px_rgba(58,139,255,0.8)] animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          <div className="absolute top-[65%] left-[30%] w-1.5 h-1.5 rounded-full bg-[#A9AAAE] shadow-[0_0_8px_rgba(169,170,174,0.7)] animate-ping" style={{ animationDuration: '2s', animationDelay: '1.5s' }} />
          <div className="absolute top-[50%] left-[25%] w-2 h-2 rounded-full bg-[#4BA3FF] shadow-[0_0_10px_rgba(75,163,255,0.8)] animate-ping" style={{ animationDuration: '2.5s', animationDelay: '2s' }} />
          <div className="absolute top-[30%] left-[32%] w-1.5 h-1.5 rounded-full bg-[#3A8BFF] shadow-[0_0_8px_rgba(58,139,255,0.7)] animate-ping" style={{ animationDuration: '3s', animationDelay: '2.5s' }} />
          
          {/* Connection arcs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="arcGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3A8BFF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#A9AAAE" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            {/* Curved connection lines */}
            <path d="M 50 40 Q 100 20 150 50" fill="none" stroke="url(#arcGradient1)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 160 70 Q 180 100 160 140" fill="none" stroke="url(#arcGradient1)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.5s" repeatCount="indefinite" />
            </path>
            <path d="M 140 160 Q 100 180 60 155" fill="none" stroke="url(#arcGradient1)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M 40 130 Q 20 100 45 60" fill="none" stroke="url(#arcGradient1)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 70 50 Q 100 80 130 55" fill="none" stroke="url(#arcGradient1)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="-15" dur="1.5s" repeatCount="indefinite" />
            </path>
            <path d="M 80 140 Q 100 110 125 145" fill="none" stroke="url(#arcGradient1)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="-15" dur="1.8s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      )}
      
      {/* CSS for rotation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
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

// SDK/Integration visual for Step 4
const IntegrationVisual = ({ isActive }: { isActive: boolean }) => {
  const sdks = [
    {
      name: "TypeScript",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3178C6">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
        </svg>
      ),
      status: "available",
      command: "npm i @iris-technologies/api",
      link: "https://www.npmjs.com/package/@iris-technologies/api",
    },
    {
      name: "React",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#61DAFB">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
        </svg>
      ),
      status: "available",
      command: "npm i @iris-technologies/react",
      link: "https://www.npmjs.com/package/@iris-technologies/react",
    },
  ];
  
  const comingSoon = [
    { name: "Python", icon: "🐍" },
    { name: "iOS", icon: "🍎" },
    { name: "Android", icon: "🤖" },
    { name: "React Native", icon: "📱" },
  ];

  return (
    <div className={`w-full max-w-lg transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
      {/* Available SDKs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {sdks.map((sdk, idx) => (
          <a
            key={sdk.name}
            href={sdk.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-foreground/5 
              hover:border-[#3A8BFF]/30 hover:shadow-[0_8px_30px_rgba(58,139,255,0.12)] 
              transition-all duration-500 cursor-pointer
              ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            {/* Status badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700">
                Available
              </span>
            </div>
            
            {/* Icon and title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
                {sdk.icon}
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{sdk.name} SDK</h4>
              </div>
            </div>
            
            {/* Command */}
            <div className="bg-[#1a1a2e] rounded-lg px-3 py-2 font-mono text-xs text-white/80 group-hover:text-white transition-colors">
              <span className="text-[#3A8BFF]">$</span> {sdk.command}
            </div>
            
            {/* Hover arrow */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-[#3A8BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>
      
      {/* Coming Soon SDKs */}
      <div className="flex flex-wrap justify-center gap-2">
        {comingSoon.map((sdk, idx) => (
          <div
            key={sdk.name}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full 
              bg-foreground/[0.03] border border-foreground/5
              transition-all duration-500
              ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
            style={{ transitionDelay: `${300 + idx * 100}ms` }}
          >
            <span className="text-sm">{sdk.icon}</span>
            <span className="text-xs text-foreground/50">{sdk.name}</span>
            <span className="text-[9px] text-amber-600 font-medium">Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Visual components map
const StepVisuals = [ConversationsVisual, ActivationVisual, ValueVisual, IntegrationVisual];

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
