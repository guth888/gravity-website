import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { RevenueCalculator } from "@/components/RevenueCalculator";

// Publisher logos
import iaskLogo from "@/assets/Iaskpublisherspage.svg";
import rampLogo from "@/assets/ramppublishers page.svg";
import ampCodeLogo from "@/assets/amppublisherspage.svg";
import deepaiLogo from "@/assets/deepaipublishers page.svg";

type UseCaseTab = "chatbots" | "assistants" | "agents" | "search" | "consumer" | "productivity" | "developer" | "autonomous";

export const Publishers = () => {
  const [activeTab, setActiveTab] = useState<UseCaseTab>("chatbots");
  const [isScrolling, setIsScrolling] = useState(false);
  const [dashboardView, setDashboardView] = useState<"chart" | "table">("chart");
  const [isManualDashboardSwitch, setIsManualDashboardSwitch] = useState(false);
  
  // Scroll-driven "How It Works" animation
  const [hiwProgress, setHiwProgress] = useState(0);
  const [hiwComplete, setHiwComplete] = useState(false);
  const [hiwHoldScroll, setHiwHoldScroll] = useState(false);
  const [hiwHeadlineVisible, setHiwHeadlineVisible] = useState(false);
  const hiwTriggeredRef = useRef(false);
  const hiwContainerRef = useRef<HTMLDivElement>(null);
  
  // Hero headline masking - refs and state for measuring text bounds
  const heroSvgRef = useRef<SVGSVGElement>(null);
  const heroLine1Ref = useRef<HTMLSpanElement>(null);
  const heroLine2Ref = useRef<HTMLSpanElement>(null);
  const [heroTextBounds, setHeroTextBounds] = useState<{ line1: { x: number; y: number; width: number; height: number } | null; line2: { x: number; y: number; width: number; height: number } | null }>({ line1: null, line2: null });
  
  // Fade in headline when section comes into view
  useEffect(() => {
    const container = hiwContainerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHiwHeadlineVisible(true);
        } else {
          setHiwHeadlineVisible(false);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of section is visible
    );
    
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  
  // Measure hero headline text bounds and convert to SVG coordinates
  useEffect(() => {
    const measureTextBounds = () => {
      const svg = heroSvgRef.current;
      const line1 = heroLine1Ref.current;
      const line2 = heroLine2Ref.current;
      
      if (!svg || !line1 || !line2) return;
      
      const svgRect = svg.getBoundingClientRect();
      const line1Rect = line1.getBoundingClientRect();
      const line2Rect = line2.getBoundingClientRect();
      
      // SVG viewBox is 0 0 1000 600, convert screen coords to SVG coords
      const scaleX = 1000 / svgRect.width;
      const scaleY = 600 / svgRect.height;
      
      // Padding for tight exclusion zone
      const padX = 14;
      const padY = 8;
      
      const convertToSvg = (rect: DOMRect) => ({
        x: (rect.left - svgRect.left) * scaleX - padX,
        y: (rect.top - svgRect.top) * scaleY - padY,
        width: rect.width * scaleX + padX * 2,
        height: rect.height * scaleY + padY * 2,
      });
      
      setHeroTextBounds({
        line1: convertToSvg(line1Rect),
        line2: convertToSvg(line2Rect),
      });
    };
    
    // Initial measurement after render
    const timer = setTimeout(measureTextBounds, 100);
    
    // Re-measure on resize
    window.addEventListener('resize', measureTextBounds);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureTextBounds);
    };
  }, []);
  
  // Detect completion and trigger "MONETIZATION ACTIVE" animation
  useEffect(() => {
    // Trigger at 82% - early enough that next section is NOT visible yet
    if (hiwProgress >= 0.82 && !hiwTriggeredRef.current) {
      hiwTriggeredRef.current = true;
      
      // Hold scroll immediately - freeze viewport (no snap-back to avoid header trigger)
      setHiwHoldScroll(true);
      
      // Show "MONETIZATION ACTIVE" after brief pause
      setTimeout(() => setHiwComplete(true), 200);
      
      // Release scroll: 200ms delay + 500ms fade + 800ms to read = 1500ms
      setTimeout(() => setHiwHoldScroll(false), 1500);
      
    } else if (hiwProgress < 0.75) {
      hiwTriggeredRef.current = false;
      setHiwComplete(false);
      setHiwHoldScroll(false);
    }
  }, [hiwProgress]);
  
  // Freeze viewport completely during hold (block only downward scroll)
  useEffect(() => {
    if (!hiwHoldScroll) return;
    
    const handleWheel = (e: WheelEvent) => {
      // Only block downward scrolling
      if (e.deltaY > 0) {
        e.preventDefault();
      }
    };
    const handleTouchMove = (e: TouchEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'Space', 'PageDown'].includes(e.key)) {
        e.preventDefault();
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hiwHoldScroll]);
  
  const sectionRefs = {
    chatbots: useRef<HTMLDivElement>(null),
    assistants: useRef<HTMLDivElement>(null),
    agents: useRef<HTMLDivElement>(null),
    search: useRef<HTMLDivElement>(null),
    consumer: useRef<HTMLDivElement>(null),
    productivity: useRef<HTMLDivElement>(null),
    developer: useRef<HTMLDivElement>(null),
    autonomous: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (tab: UseCaseTab) => {
    setIsScrolling(true);
    const element = sectionRefs[tab].current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as UseCaseTab);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [isScrolling]);

  // Auto-switch dashboard view between chart and table
  useEffect(() => {
    if (isManualDashboardSwitch) return; // Pause auto-switch if user manually clicked
    
    const interval = setInterval(() => {
      setDashboardView((prev) => (prev === "chart" ? "table" : "chart"));
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(interval);
  }, [isManualDashboardSwitch]);

  // Reset manual switch flag after 10 seconds
  useEffect(() => {
    if (isManualDashboardSwitch) {
      const timer = setTimeout(() => {
        setIsManualDashboardSwitch(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isManualDashboardSwitch]);

  // Scroll-driven "How It Works" animation
  useEffect(() => {
    const handleScroll = () => {
      if (!hiwContainerRef.current) return;
      
      const container = hiwContainerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the container we've scrolled
      // Container starts when its top reaches the viewport top
      // Container ends when its bottom leaves the viewport bottom
      const containerHeight = container.offsetHeight;
      const scrollableDistance = containerHeight - windowHeight;
      
      // How far the top of the container is above the viewport top
      const scrolledPast = -rect.top;
      
      // Calculate progress (0 to 1)
      let progress = scrolledPast / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      setHiwProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const useCases = {
    chatbots: {
      title: "Consumer Chatbots",
      description: "AI chatbots that answer customer questions and guide users through decisions.",
      visual: (
        <div className="bg-[#212121] rounded-2xl shadow-lg border border-white/5 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#10a37f] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-white/90 text-sm font-medium">AI Chat</span>
              <span className="text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded">Pro</span>
            </div>
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
          {/* Messages */}
          <div className="p-4 space-y-4">
            {/* User message */}
            <div className="flex gap-3 justify-end">
              <div className="flex-1 pt-1 max-w-[80%]">
                <p className="text-sm text-white/90 text-right">What's a good project management tool for startups?</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">E</div>
            </div>
            {/* AI response */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-[#10a37f] flex-shrink-0 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm text-white/90 leading-relaxed">
                  For startups, I'd recommend <strong>Notion</strong>, <strong>Asana</strong>, or <strong>Monday.com</strong>. Each offers flexible workflows and scales well with growing teams.
                </p>
                <p className="text-sm text-white/90 leading-relaxed mt-2">
                  You might also want to check out <a href="https://linear.app" target="_blank" rel="noopener noreferrer" className="text-[#10a37f] hover:underline font-medium">Linear</a> <span className="text-[10px] text-white/40">(Sponsored)</span> — issue tracking built for modern software teams.
                </p>
              </div>
            </div>
          </div>
          {/* Input bar */}
          <div className="px-4 pb-4">
            <div className="bg-[#2f2f2f] rounded-xl px-4 py-3 flex items-center gap-3">
              <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="text-white/30 text-sm flex-1">Send a message...</span>
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )
    },
    assistants: {
      title: "AI Assistants",
      description: "In-app assistants that help users search, plan, and complete everyday tasks.",
      visual: (
        <div className="bg-[#2D2B28] rounded-2xl shadow-lg border border-[#3d3a37] overflow-hidden">
          {/* Claude-style Header */}
          <div className="px-4 py-2.5 border-b border-[#3d3a37] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#D4A27F] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#2D2B28]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-white/90 text-sm font-medium">Assistant</span>
              <span className="text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded">Pro</span>
            </div>
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          {/* Messages */}
          <div className="p-4 space-y-4">
            {/* User message */}
            <div className="flex gap-3 justify-end">
              <div className="flex-1 pt-1 max-w-[80%]">
                <p className="text-sm text-white/90 text-right">Can you analyze our Q4 financial performance?</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">M</div>
            </div>
            {/* Claude response */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-[#D4A27F] flex-shrink-0 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#2D2B28]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm text-white/80 leading-relaxed mb-3">Your Q4 revenue is up <strong className="text-white">34% YoY</strong> with healthy margins. CAC decreased by 12% while LTV increased, indicating strong unit economics.</p>
                {/* Sponsored inline */}
                <p className="text-sm text-white/80 leading-relaxed">
                  If you're considering an exit, <a href="https://dealmaker.io" target="_blank" rel="noopener noreferrer" className="text-[#D4A27F] hover:underline font-medium">Dealmaker.io</a> <span className="text-[10px] text-white/40">(Sponsored)</span> helps founders navigate M&A with experienced advisors.
                </p>
              </div>
            </div>
          </div>
          {/* Input bar */}
          <div className="px-4 pb-4">
            <div className="bg-[#1f1e1c] rounded-xl px-4 py-3 flex items-center gap-3 border border-[#3d3a37]">
              <span className="text-white/30 text-sm flex-1">Reply...</span>
              <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>
      )
    },
    agents: {
      title: "Knowledge Agents",
      description: "Domain-specific agents that retrieve, summarize, and analyze information.",
      visual: (
        <div className="bg-[#191A1A] rounded-2xl shadow-lg border border-white/5 overflow-hidden">
          {/* Perplexity-style Header */}
          <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#1f2937] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-white/90 text-sm font-medium">Research Agent</span>
              <span className="text-[10px] text-white/60 bg-white/10 px-1.5 py-0.5 rounded">Pro</span>
            </div>
          </div>
          {/* Query */}
          <div className="px-4 pt-3">
            <p className="text-sm text-white/70 mb-3">What are the key GDPR compliance requirements?</p>
          </div>
          {/* Answer section */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-[#059669] flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-white/50">Answer</span>
              <div className="flex gap-1 ml-auto">
                <span className="text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded">3 sources</span>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-3">Key GDPR requirements include <strong className="text-white">Article 17</strong> (right to erasure) and <strong className="text-white">Article 25</strong> (data protection by design). Organizations must implement appropriate technical measures...</p>
            {/* Sponsored */}
            <div className="bg-[#1f2020] border border-white/5 rounded-lg p-3 mt-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium">Sponsored</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                <a href="https://www.onetrust.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium">OneTrust</a> — Automate GDPR compliance and data privacy management for your organization.
              </p>
            </div>
          </div>
        </div>
      )
    },
    search: {
      title: "Search/Chat Hybrids",
      description: "Experiences that blend search results with conversational AI responses.",
      visual: (
        <div className="bg-[#1b1b1d] rounded-2xl shadow-lg border border-white/5 overflow-hidden">
          {/* You.com / Bing-style Header */}
          <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-[#374151] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium">Search AI</span>
          </div>
          {/* Search bar */}
          <div className="px-4 pt-3">
            <div className="bg-[#2a2a2c] rounded-xl px-3 py-2 flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm text-white/70">best e-commerce growth strategies 2024</span>
            </div>
          </div>
          {/* AI Answer */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-[#374151] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs text-white/60 font-medium">AI Summary</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              The most effective strategies include <strong className="text-white">influencer partnerships</strong>, <strong className="text-white">UGC content</strong>, and optimizing your conversion funnel.
            </p>
            <p className="text-sm text-white/80 leading-relaxed mt-2">
              For scaling with data-driven creatives, <a href="https://reachdigital.io" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium">Reach Digital</a> <span className="text-[10px] text-white/40">(Sponsored)</span> offers performance acquisition systems.
            </p>
            {/* Source pills */}
            <div className="flex gap-2 mt-3">
              <span className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-full">Forbes</span>
              <span className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-full">HubSpot</span>
              <span className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-full">+3</span>
            </div>
          </div>
        </div>
      )
    },
    consumer: {
      title: "AI Consumer Apps",
      description: "Standalone AI apps where users ask, explore, and get personalized answers.",
      visual: (
        <div className="bg-[#1a1a1f] rounded-2xl shadow-lg border border-white/5 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#525252] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-white/90 text-sm font-medium">Companion</span>
            </div>
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>
          {/* Conversational style */}
          <div className="p-4 space-y-3">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#5B5FC7] text-white px-3 py-2 rounded-2xl rounded-br-md max-w-[85%]">
                <p className="text-sm">I need help with stress and sleep</p>
              </div>
            </div>
            {/* Pi response */}
            <div className="text-sm text-white/80 leading-relaxed">
              I hear you! Here are some apps I'd recommend for stress and better sleep:
            </div>
            {/* Recommendations */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7c9aff]/20 flex items-center justify-center">
                  <span className="text-base">🧘</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90 font-medium">Calm</p>
                  <p className="text-xs text-white/50">Meditation & Sleep</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#a78bfa]/20 flex items-center justify-center">
                  <span className="text-base">😴</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90 font-medium">Sleep Cycle</p>
                  <p className="text-xs text-white/50">Smart Alarm</p>
                </div>
              </div>
              {/* Sponsored - same style but highlighted */}
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-base">🧡</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-white/90 font-medium">Headspace</p>
                    <span className="text-[9px] text-white/40 bg-white/10 px-1.5 py-0.5 rounded">Sponsored</span>
                  </div>
                  <p className="text-xs text-white/50">Meditation made simple</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    productivity: {
      title: "Productivity Tools & Copilots",
      description: "AI features inside work tools that help users write, plan, code, or organize.",
      visual: (
        <div className="bg-[#191919] rounded-2xl shadow-lg border border-white/5 overflow-hidden">
          {/* Notion-style Header */}
          <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className="text-white/50 text-xs">📄</span>
              <span className="text-white/70 text-xs">Q4 Planning</span>
            </div>
          </div>
          {/* Document content */}
          <div className="p-4">
            {/* Page title */}
            <h3 className="text-lg font-semibold text-white/90 mb-3">Q4 OKRs Draft</h3>
            {/* Some doc content */}
            <div className="text-sm text-white/60 mb-3 leading-relaxed">
              <p className="mb-2">Based on Q3 results, we need to focus on...</p>
            </div>
            {/* Notion AI block */}
            <div className="bg-[#2f2f2f] rounded-lg p-3 border-l-2 border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs text-white/70 font-medium">AI Assistant</span>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                I can help draft your quarterly OKRs. Based on last quarter's 34% revenue growth, I suggest focusing on retention metrics.
              </p>
              <p className="text-sm text-white/80 leading-relaxed mt-2">
                For better planning, try <a href="https://asana.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium">Asana</a> <span className="text-[10px] text-white/40">(Sponsored)</span> to sync your project data.
              </p>
            </div>
          </div>
        </div>
      )
    },
    developer: {
      title: "Developer Tools & IDEs",
      description: "Coding assistants embedded in IDEs that recommend libraries, tools, and best practices.",
      visual: (
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-[#3c3c3c] overflow-hidden font-mono">
          {/* VS Code style title bar */}
          <div className="px-3 py-1.5 bg-[#323233] border-b border-[#3c3c3c] flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
            </div>
            <div className="flex items-center gap-2 ml-3">
              <svg className="w-3.5 h-3.5 text-[#519aba]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3V3zm16.525 13.707c0-.131-.049-.26-.147-.352l-2.196-2.163 2.196-2.163a.503.503 0 00.147-.352.503.503 0 00-.147-.351l-.991-.98a.503.503 0 00-.352-.147.503.503 0 00-.352.147l-3.538 3.494a.503.503 0 00-.147.352c0 .131.049.26.147.352l3.538 3.494a.503.503 0 00.352.147.503.503 0 00.352-.147l.991-.98a.503.503 0 00.147-.351zM11.525 16.707l3.538-3.494a.503.503 0 00.147-.352.503.503 0 00-.147-.352L11.525 9.015a.503.503 0 00-.352-.147.503.503 0 00-.352.147l-.991.98a.503.503 0 00-.147.351c0 .131.049.26.147.352l2.196 2.163-2.196 2.163a.503.503 0 00-.147.352c0 .131.049.26.147.351l.991.98a.503.503 0 00.352.147.503.503 0 00.352-.147z"/>
              </svg>
              <span className="text-white/60 text-xs">api.ts</span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {/* Code editor with line numbers */}
          <div className="flex">
            {/* Line numbers */}
            <div className="px-2 py-3 text-right text-[11px] text-white/20 select-none border-r border-[#3c3c3c] bg-[#1e1e1e]">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
            {/* Code */}
            <div className="p-3 flex-1">
              <div className="space-y-0.5 text-[11px] leading-5">
                <p><span className="text-[#c586c0]">import</span> <span className="text-white/80">{'{ PrismaClient }'}</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'@prisma/client'</span></p>
                <p className="text-[#6A9955]">// Initialize database connection</p>
                <p><span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">prisma</span> <span className="text-white/80">=</span> <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">PrismaClient</span><span className="text-[#ffd700]">()</span></p>
                <p className="text-white/30">|</p>
              </div>
              {/* Copilot suggestion popup */}
              <div className="mt-2 bg-[#252526] border border-[#454545] rounded-md shadow-xl overflow-hidden">
                <div className="px-2 py-1.5 border-b border-[#454545] flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#6e40c9"/>
                    <path d="M12 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10.5 10a.5.5 0 00-.5.5v6a.5.5 0 001 0v-2.5h2v2.5a.5.5 0 001 0v-6a.5.5 0 00-.5-.5h-3z" fill="white"/>
                  </svg>
                  <span className="text-[10px] text-white/60">AI Suggest</span>
                  <span className="text-[10px] text-white/30 ml-auto">· Sponsored</span>
                </div>
                <div className="px-2 py-2">
                  <p className="text-[11px] text-[#9cdcfe] font-medium">PlanetScale</p>
                  <p className="text-[10px] text-white/50 mt-0.5">Serverless MySQL with branching. Free tier available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    autonomous: {
      title: "Autonomous Agents",
      description: "Task-running agents that plan, search, and act on the user's behalf.",
      visual: (
        <div className="bg-[#0d0d0d] rounded-2xl shadow-lg border border-white/5 overflow-hidden">
          {/* Manus/Devin-style Header */}
          <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between bg-[#0d0d0d]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#1f2937] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white/90 text-sm font-medium">Task Agent</span>
              <span className="text-[10px] text-white/60 bg-white/10 px-1.5 py-0.5 rounded">Auto</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[10px] text-white/40">Running</span>
            </div>
          </div>
          {/* Task execution panel */}
          <div className="p-4">
            {/* Current goal */}
            <div className="bg-[#1a1a1a] rounded-lg p-3 mb-3 border border-white/5">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Goal</p>
              <p className="text-sm text-white/80">Book a flight and hotel for NYC → LA trip</p>
            </div>
            {/* Steps */}
            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/60 line-through">Search flights on Google Flights</p>
                  <p className="text-[10px] text-white/30">Found 12 options</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/60 line-through">Compare prices & layovers</p>
                  <p className="text-[10px] text-white/30">Best: Delta $289 nonstop</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs text-white/90">Finding best hotel deals...</p>
                </div>
              </div>
            </div>
            {/* Partner suggestion */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-white/60 font-medium">Suggested</span>
                <span className="text-[10px] text-white/30">· Sponsored</span>
              </div>
              <p className="text-sm font-medium text-white">Booking.com</p>
              <p className="text-xs text-white/50">Best price guarantee. 15% off for first booking.</p>
            </div>
          </div>
        </div>
      )
    }
  };

  const howItWorks = [
    {
      step: "01",
      title: "Integrate SDK",
      description: "Add Gravity with just a few lines of code. Our React SDK, API, or REST endpoints make integration quick, typically under an hour."
    },
    {
      step: "02", 
      title: "Configure Controls",
      description: "Set up category blocklist and custom styling/UI. Choose which queries to send to Gravity."
    },
    {
      step: "03",
      title: "Start Earning",
      description: "Gravity's real-time auction matches the conversational traffic you choose to send with relevant advertisers. Track impressions, clicks, revenue + more in real time."
    }
  ];

  const whyGravity = [
    {
      title: "Monetization Without Breaking UX",
      description: "Native monetization that feels natural. Suggestions blend seamlessly into the conversation, no laggy banners, no pop-ups, no UX disruption.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      number: "01"
    },
    {
      title: "Full Control Panel",
      description: "Complete control over what appears. Manage blocklists, brand-safety settings, and custom styling. You send us the traffic you want.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      number: "02"
    },
    {
      title: "Real-Time Analytics",
      description: "Analytics built for LLM apps. Track impressions, clicks, CTR, CPM, CPC, and revenue in real time.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      number: "03"
    },
    {
      title: "Quick Integration",
      description: "Integrates in under an hour. React SDK, API SDK, and REST API available. Simple setup for any LLM Publisher.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      number: "04"
    }
  ];

  const faqs = [
    {
      question: "What is Gravity?",
      answer: "Gravity is an ad network built specifically for LLM-powered applications. We help AI publishers monetize their platforms with native, contextual suggestions that feel like helpful recommendations, not intrusive ads."
    },
    {
      question: "How does monetization work?",
      answer: "Gravity detects high-intent moments in user conversations, runs a real-time auction among relevant advertisers, and delivers a native suggestion. You earn revenue on every impression and click."
    },
    {
      question: "Will this hurt my user experience?",
      answer: "No. Suggestions are native, clearly labeled as sponsored, and limited to one per response. You control which categories appear and send us only the traffic you want. In testing, user satisfaction scores remained unchanged or improved."
    },
    {
      question: "How long does integration take?",
      answer: "Most integrations complete in under an hour. Our React SDK requires just 3 lines of code. We also offer API SDK and REST endpoints for non-React applications."
    },
    {
      question: "What controls do I have?",
      answer: "Full control: category blocklists and custom styling to match your UI. You send us whatever traffic you want. You decide what appears."
    },
    {
      question: "When are payouts released?",
      answer: "Payouts are released on a monthly basis."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header variant="dark" />
      
      {/* Hero Section - Vertical Supply Flow with Z-Layered Copy */}
      <section className="relative h-screen overflow-hidden bg-[#0a0a0a]">
        
        {/* ANIMATION LAYER - Full viewport, behind everything */}
        <div className="absolute inset-0 z-0 pt-16">
          <svg ref={heroSvgRef} className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Gradient for supply lines - muted blue-gray tone */}
              <linearGradient id="supplyLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6b7280" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6b7280" stopOpacity="0.2" />
              </linearGradient>
              
              {/* Minimal glow - barely perceptible */}
              <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* Clip path to hide dots inside Gravity node */}
              <clipPath id="gravityNodeClip">
                {/* Full viewport minus Gravity circle (at 500, 100 with r=58 to fully cover) */}
                <path d="M 0 0 H 1000 V 600 H 0 Z M 500 42 A 58 58 0 1 0 500 158 A 58 58 0 1 0 500 42" fillRule="evenodd" />
              </clipPath>
              
              {/* Mask to dim line/dots behind headline text - white = full opacity, gray = reduced */}
              {heroTextBounds.line1 && heroTextBounds.line2 && (
                <mask id="heroTextMask">
                  {/* Full viewport at full opacity */}
                  <rect x="0" y="0" width="1000" height="600" fill="white" />
                  {/* Headline line 1 - reduced opacity zone (~20% visible) */}
                  <rect 
                    x={heroTextBounds.line1.x} 
                    y={heroTextBounds.line1.y} 
                    width={heroTextBounds.line1.width} 
                    height={heroTextBounds.line1.height} 
                    fill="rgb(50, 50, 50)" 
                  />
                  {/* Headline line 2 - reduced opacity zone (~20% visible) */}
                  <rect 
                    x={heroTextBounds.line2.x} 
                    y={heroTextBounds.line2.y} 
                    width={heroTextBounds.line2.width} 
                    height={heroTextBounds.line2.height} 
                    fill="rgb(50, 50, 50)" 
                  />
                </mask>
              )}
            </defs>
            
            {/* === MAIN VERTICAL LINE (continuous from top to behind CTA) === */}
            {/* Render as segments to achieve dimming behind headline without mask issues */}
            {heroTextBounds.line1 && heroTextBounds.line2 ? (
              <>
                {/* Segment 1: From below Gravity node to top of headline */}
                <line x1="500" y1="140" x2="500" y2={heroTextBounds.line1.y} stroke="#6b7280" strokeWidth="1" opacity="0.35" />
                {/* Segment 2: Behind headline - dimmed */}
                <line x1="500" y1={heroTextBounds.line1.y} x2="500" y2={heroTextBounds.line2.y + heroTextBounds.line2.height} stroke="#6b7280" strokeWidth="1" opacity="0.08" />
                {/* Segment 3: From bottom of headline to CTA */}
                <line x1="500" y1={heroTextBounds.line2.y + heroTextBounds.line2.height} x2="500" y2="320" stroke="#6b7280" strokeWidth="1" opacity="0.35" />
              </>
            ) : (
              /* Fallback: full line before bounds are measured */
              <line x1="500" y1="140" x2="500" y2="320" stroke="#6b7280" strokeWidth="1" opacity="0.35" />
            )}
            
            {/* === GRAVITY NODE (top area - moved down for visibility) === */}
            <g transform="translate(500, 100)">
              {/* Pulsing outer ring - subtle, muted */}
              <circle r="50" fill="none" stroke="#6b7280" strokeWidth="1" opacity="0.2">
                <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.08;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Main circle - thinner stroke, muted color */}
              <circle r="40" fill="#0a0a0a" stroke="#6b7280" strokeWidth="1" />
              <circle r="35" fill="#111111" />
              <text y="0" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9ca3af" letterSpacing="0.08em">GRAVITY</text>
              <text y="12" textAnchor="middle" fontSize="7" fontWeight="500" fill="#6b7280" letterSpacing="0.05em">AD NETWORK</text>
            </g>
            
            {/* === BRANCHING LINES (fan out from behind CTA button) === */}
            {/* Left branch - more to the left */}
            <path d="M 500 320 Q 280 400 60 485" fill="none" stroke="#6b7280" strokeWidth="1" opacity="0.4" />
            {/* Center continues straight */}
            <path d="M 500 320 L 500 485" fill="none" stroke="#6b7280" strokeWidth="1" opacity="0.4" />
            {/* Right branch - more to the right */}
            <path d="M 500 320 Q 720 400 940 485" fill="none" stroke="#6b7280" strokeWidth="1" opacity="0.4" />
            
            {/* No visible junction dot - CTA button serves as visual junction */}
            
            {/* === ANIMATED DOTS - Data packets, muted and subtle === */}
            
            {/* Main line dots - flow to behind CTA, clipped to hide inside Gravity node, masked behind headline */}
            <g clipPath="url(#gravityNodeClip)" mask={heroTextBounds.line1 ? "url(#heroTextMask)" : undefined}>
              <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 500 50 L 500 320" />
                <animate attributeName="opacity" values="0.5;0.7;0.7;0.5" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 500 50 L 500 320" begin="0.7s" />
                <animate attributeName="opacity" values="0.5;0.7;0.7;0.5" dur="2.2s" repeatCount="indefinite" begin="0.7s" />
              </circle>
              <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 500 50 L 500 320" begin="1.4s" />
                <animate attributeName="opacity" values="0.5;0.7;0.7;0.5" dur="2.2s" repeatCount="indefinite" begin="1.4s" />
              </circle>
            </g>
            
            {/* Left branch dots - emerge from behind CTA */}
            <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 500 320 Q 280 400 60 485" />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 500 320 Q 280 400 60 485" begin="0.8s" />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.6s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            
            {/* Center branch dots */}
            <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
              <animateMotion dur="1.3s" repeatCount="indefinite" path="M 500 320 L 500 485" />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.3s" repeatCount="indefinite" />
            </circle>
            <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
              <animateMotion dur="1.3s" repeatCount="indefinite" path="M 500 320 L 500 485" begin="0.65s" />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.3s" repeatCount="indefinite" begin="0.65s" />
            </circle>
            
            {/* Right branch dots - emerge from behind CTA */}
            <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 500 320 Q 720 400 940 485" />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle r="5" fill="#9ca3af" filter="url(#heroGlow)">
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 500 320 Q 720 400 940 485" begin="0.8s" />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.6s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            
            {/* === SUPPLY SURFACE CARDS (moved up) === */}
            {/* AI Apps - Far Left (x=0) */}
            <g>
              <rect x="0" y="485" width="120" height="45" rx="8" fill="#111111" stroke="#4b5563" strokeWidth="1" />
              <text x="60" y="514" textAnchor="middle" fontSize="14" fill="#9ca3af" fontWeight="500">AI Apps</text>
            </g>
            
            {/* AI Chats - Center */}
            <g>
              <rect x="440" y="485" width="120" height="45" rx="8" fill="#111111" stroke="#4b5563" strokeWidth="1" />
              <text x="500" y="514" textAnchor="middle" fontSize="14" fill="#9ca3af" fontWeight="500">AI Chats</text>
            </g>
            
            {/* Agents - Far Right (x=880) */}
            <g>
              <rect x="880" y="485" width="120" height="45" rx="8" fill="#111111" stroke="#4b5563" strokeWidth="1" />
              <text x="940" y="514" textAnchor="middle" fontSize="14" fill="#9ca3af" fontWeight="500">Agents</text>
            </g>
          </svg>
        </div>
        
        {/* COPY LAYER - Headline centered between GRAVITY node and CTA */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none" style={{ marginTop: '-5vh' }}>
          <div className="text-center px-4 sm:px-6 lg:px-8 pointer-events-auto">
            {/* No background - line shows through at lower opacity behind text */}
            <div className="px-8 sm:px-12 lg:px-16">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.15] max-w-4xl mx-auto"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
              >
                <span ref={heroLine1Ref} className="text-white inline-block">Monetize AI conversations</span>
                <br />
                <span ref={heroLine2Ref} className="text-white inline-block">natively and context-driven.</span>
              </h1>
              
              <Link
                to="/signup"
                className="inline-flex px-8 py-3.5 bg-black text-white font-medium rounded-full border border-white/20 hover:bg-gray-900 transition-colors text-sm sm:text-base"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        
      </section>

      {/* Publishers Using Gravity */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-10">Publishers using Gravity</p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* iAsk */}
            <div className="flex flex-col items-center p-6 rounded-2xl bg-[#111111] border border-white/10">
              <div className="w-full h-20 flex items-center justify-center mb-4">
                <div className="w-36 h-18 flex items-center justify-center">
                  <img 
                    src={iaskLogo} 
                    alt="iAsk" 
                    className="max-w-full max-h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">Search/Chat Hybrid</p>
            </div>
            
            {/* Ramp */}
            <div className="flex flex-col items-center p-6 rounded-2xl bg-[#111111] border border-white/10">
              <div className="w-full h-20 flex items-center justify-center mb-4">
                <div className="w-36 h-18 flex items-center justify-center">
                  <img 
                    src={rampLogo} 
                    alt="Ramp" 
                    className="max-w-full max-h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">Productivity Tools & Copilots</p>
            </div>
            
            {/* Amp Code / Sourcegraph */}
            <div className="flex flex-col items-center p-6 rounded-2xl bg-[#111111] border border-white/10">
              <div className="w-full h-20 flex items-center justify-center mb-4">
                <div className="w-36 h-18 flex items-center justify-center">
                  <img 
                    src={ampCodeLogo} 
                    alt="Amp Code" 
                    className="max-w-full max-h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">Developer Tools & IDEs</p>
            </div>
            
            {/* DeepAI */}
            <div className="flex flex-col items-center p-6 rounded-2xl bg-[#111111] border border-white/10">
              <div className="w-full h-20 flex items-center justify-center mb-4">
                <div className="w-36 h-18 flex items-center justify-center">
                  <img 
                    src={deepaiLogo} 
                    alt="DeepAI" 
                    className="max-w-full max-h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">AI Consumer Apps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Banner */}
      <section className="py-16 bg-[#0a0a0a] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <blockquote className="text-2xl sm:text-3xl font-medium text-white mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                "Gravity allowed us to monetize our AI assistant without compromising the experience our users love. It's hard to imagine running without it now."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                <div>
                  <p className="font-medium text-white">AI Platform Team</p>
                  <p className="text-sm text-gray-100">Early Partner Publisher</p>
                </div>
              </div>
            </div>
            <div className="bg-[#111111] rounded-2xl p-6 text-center min-w-[180px] border border-white/10">
              <div className="text-4xl font-bold text-white mb-1">$3M</div>
              <div className="text-sm text-gray-100">Monthly Revenue</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Paraform Style Tabs */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Label + Headline + Tab Navigation */}
            <div className="lg:w-1/3 lg:sticky lg:top-24 lg:h-fit">
              <p className="text-xs text-gray-100 uppercase tracking-widest mb-4">Use cases</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                <span className="text-white">Perfect for every LLM surface</span>
                <span className="text-gray-100">, from chatbots to autonomous agents</span>
              </h2>
              
              <div className="space-y-1 mt-8">
                {(["chatbots", "assistants", "agents", "search", "consumer", "productivity", "developer", "autonomous"] as UseCaseTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => scrollToSection(tab)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between ${
                      activeTab === tab 
                        ? "bg-white/10 text-white border-l-2 border-white" 
                        : "text-gray-100 hover:text-gray-100 border-l-2 border-transparent"
                    }`}
                  >
                    <span className="font-medium text-sm">
                      {useCases[tab].title}
                    </span>
                    {activeTab === tab && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right: Tab Content Sections */}
            <div className="lg:w-2/3 space-y-16">
              {(["chatbots", "assistants", "agents", "search", "consumer", "productivity", "developer", "autonomous"] as UseCaseTab[]).map((tab) => (
                <div key={tab} id={tab} ref={sectionRefs[tab]} className="scroll-mt-24">
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10 bg-[#111111]">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {useCases[tab].title}
                    </h3>
                    <p className="text-gray-100 mb-6">
                      {useCases[tab].description}
                    </p>
                    
                    {useCases[tab].visual}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Calculator */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-gray-100 uppercase tracking-widest mb-4">Revenue potential</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Calculate your earnings
            </h2>
            <p className="text-gray-100 max-w-xl mx-auto">
              See how much you could earn with Gravity based on your monthly message volume.
            </p>
          </div>
          
          <RevenueCalculator />
        </div>
      </section>

      {/* How It Works - Scroll-Driven System Assembly */}
      {/* Mobile: Simple stacked cards (no scroll lock) */}
      <section className="lg:hidden py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-4">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              In 3 Steps
            </h2>
          </div>
          <div className="space-y-6">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative pl-4">
                <span className="absolute left-0 top-0 text-[10px] font-mono text-gray-500 tracking-wider">{item.step}</span>
                <div className="bg-[#141414] rounded-lg p-5 border border-white/15">
                  <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: Scroll-Driven Animation */}
      <div 
        ref={hiwContainerRef}
        className="hidden lg:block bg-[#0a0a0a] border-t border-white/10"
        style={{ height: '180vh' }} // Tall container for scroll room
      >
        <div 
          className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {/* Progress bar / Monetization Active indicator */}
            <div className="relative flex flex-col items-center mb-8">
              {/* "MONETIZATION ACTIVE" text - fades in on completion */}
              <span 
                className="text-xs text-white uppercase tracking-[0.3em] mb-3 transition-all duration-500"
                style={{ 
                  opacity: hiwComplete ? 1 : 0,
                  transform: hiwComplete ? 'translateY(0)' : 'translateY(4px)'
                }}
              >
                Monetization Active
              </span>
              
              {/* Progress bar / underline */}
              <div 
                className={`h-0.5 bg-white/10 rounded-full overflow-hidden transition-all duration-500 ${
                  hiwComplete ? 'w-44' : 'w-32'
                }`}
              >
                <div 
                  className={`h-full w-full bg-white origin-left ${
                    hiwComplete ? 'rounded-none' : 'rounded-full'
                  }`}
                  style={{ 
                    transform: `scaleX(${hiwComplete ? 1 : hiwProgress})`,
                    willChange: 'transform',
                    transition: hiwComplete ? 'border-radius 0.3s' : 'none'
                  }}
                />
              </div>
            </div>
            
            {/* Headline - fades in automatically when section enters view */}
            <div 
              className="text-center mb-8 transition-all duration-700 ease-out"
              style={{ 
                opacity: hiwHeadlineVisible ? 1 : 0,
                transform: hiwHeadlineVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-3">How it works</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                In 3 Steps
              </h2>
            </div>
            
            {/* SVG Animation - Controlled by scroll progress */}
            <svg 
              viewBox="-50 -50 1500 720" 
              className="w-full max-h-[60vh]"
              style={{ maxWidth: '1600px' }}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* ==================== UNIFIED CONTINUOUS STROKE ==================== */}
              {/* 
                Card 01: x=0, y=0, w=480, h=340 (far left)
                Card 02: x=460, y=380, w=480, h=280 (center bottom)
                Card 03: x=920, y=0, w=480, h=360 (far right)
              */}
              <path
                d={`
                  M 480 170 
                  V 330 Q 480 340 470 340 
                  H 10 Q 0 340 0 330 
                  V 10 Q 0 0 10 0 
                  H 470 Q 480 0 480 10 
                  V 170
                  L 510 170 L 510 420 L 460 420
                  V 390 Q 460 380 470 380 
                  H 930 Q 940 380 940 390 
                  V 650 Q 940 660 930 660 
                  H 470 Q 460 660 460 650 
                  V 420
                  V 390 Q 460 380 470 380 
                  H 930 Q 940 380 940 390 
                  V 520
                  L 970 520 L 970 180 L 920 180
                  V 10 Q 920 0 930 0 
                  H 1390 Q 1400 0 1400 10 
                  V 350 Q 1400 360 1390 360 
                  H 930 Q 920 360 920 350 
                  V 180
                `}
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - hiwProgress}
                style={{ willChange: 'stroke-dashoffset' }}
              />
              
              {/* ==================== CARD BACKGROUNDS ==================== */}
              
              {/* Card 01 Background - far left */}
              <rect
                x="0"
                y="0"
                width="480"
                height="340"
                rx="12"
                fill="#111111"
                opacity={Math.max(0, Math.min(1, (hiwProgress - 0.08) / 0.06))}
              />
              
              {/* Card 02 Background - center bottom */}
              <rect
                x="460"
                y="380"
                width="480"
                height="280"
                rx="12"
                fill="#111111"
                opacity={Math.max(0, Math.min(1, (hiwProgress - 0.35) / 0.06))}
              />
              
              {/* Card 03 Background - far right */}
              <rect
                x="920"
                y="0"
                width="480"
                height="360"
                rx="12"
                fill="#111111"
                opacity={Math.max(0, Math.min(1, (hiwProgress - 0.72) / 0.06))}
              />
              
              {/* ==================== STEP 01 CONTENT ==================== */}
              <text 
                x="0" 
                y="-20" 
                fontSize="16" 
                fontFamily="monospace" 
                fill="#525252"
                opacity={Math.max(0, Math.min(1, (hiwProgress - 0.10) / 0.04))}
              >01</text>
              <foreignObject 
                x="0" 
                y="0" 
                width="480" 
                height="120"
                style={{ opacity: Math.max(0, Math.min(1, (hiwProgress - 0.12) / 0.05)) }}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ padding: '40px 44px 0 44px' }}>
                  <h3 style={{ 
                    fontSize: '42px', 
                    fontWeight: 400, 
                    color: 'white',
                    fontFamily: "'DM Serif Display', Georgia, serif"
                  }}>
                    {howItWorks[0].title}
                  </h3>
                </div>
              </foreignObject>
              <foreignObject 
                x="0" 
                y="105" 
                width="480" 
                height="235"
                style={{ opacity: Math.max(0, Math.min(1, (hiwProgress - 0.14) / 0.05)) }}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ padding: '0 44px 40px 44px' }}>
                  <p style={{ fontSize: '24px', color: '#9ca3af', lineHeight: 1.65 }}>
                    {howItWorks[0].description}
                  </p>
                </div>
              </foreignObject>
              
              {/* ==================== STEP 02 CONTENT ==================== */}
              <text 
                x="460" 
                y="360" 
                fontSize="16" 
                fontFamily="monospace" 
                fill="#525252"
                opacity={Math.max(0, Math.min(1, (hiwProgress - 0.38) / 0.04))}
              >02</text>
              <foreignObject 
                x="460" 
                y="380" 
                width="480" 
                height="120"
                style={{ opacity: Math.max(0, Math.min(1, (hiwProgress - 0.40) / 0.05)) }}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ padding: '40px 48px 0 48px' }}>
                  <h3 style={{ 
                    fontSize: '42px', 
                    fontWeight: 400, 
                    color: 'white',
                    fontFamily: "'DM Serif Display', Georgia, serif"
                  }}>
                    {howItWorks[1].title}
                  </h3>
                </div>
              </foreignObject>
              <foreignObject 
                x="460" 
                y="485" 
                width="480" 
                height="175"
                style={{ opacity: Math.max(0, Math.min(1, (hiwProgress - 0.42) / 0.05)) }}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ padding: '0 48px 40px 48px' }}>
                  <p style={{ fontSize: '24px', color: '#9ca3af', lineHeight: 1.65 }}>
                    {howItWorks[1].description}
                  </p>
                </div>
              </foreignObject>
              
              {/* ==================== STEP 03 CONTENT ==================== */}
              <text 
                x="920" 
                y="-20" 
                fontSize="16" 
                fontFamily="monospace" 
                fill="#525252"
                opacity={Math.max(0, Math.min(1, (hiwProgress - 0.75) / 0.04))}
              >03</text>
              <foreignObject 
                x="920" 
                y="0" 
                width="480" 
                height="120"
                style={{ opacity: Math.max(0, Math.min(1, (hiwProgress - 0.77) / 0.05)) }}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ padding: '40px 44px 0 44px' }}>
                  <h3 style={{ 
                    fontSize: '42px', 
                    fontWeight: 400, 
                    color: 'white',
                    fontFamily: "'DM Serif Display', Georgia, serif"
                  }}>
                    {howItWorks[2].title}
                  </h3>
                </div>
              </foreignObject>
              <foreignObject 
                x="920" 
                y="105" 
                width="480" 
                height="255"
                style={{ opacity: Math.max(0, Math.min(1, (hiwProgress - 0.79) / 0.05)) }}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ padding: '0 44px 40px 44px' }}>
                  <p style={{ fontSize: '24px', color: '#9ca3af', lineHeight: 1.65 }}>
                    {howItWorks[2].description}
                  </p>
                </div>
              </foreignObject>
            </svg>
            
            {/* Scroll indicator - positioned below cards, fades at 70% */}
            <div 
              className="mt-12 flex flex-col items-center gap-2"
              style={{ 
                opacity: hiwProgress >= 0.7 ? 0 : 1,
                transition: 'opacity 0.4s ease-out'
              }}
            >
              <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2.5 bg-white/50 rounded-full animate-bounce" />
              </div>
              <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
            </div>
          </div>
        </div>
      </div>

      {/* SDK Code Preview */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs text-gray-100 uppercase tracking-widest mb-4">Integration</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                Live in under an hour
              </h2>
              <p className="text-gray-100 mb-8 text-lg">
                Our React SDK requires just 3 lines of code. We also offer API SDK and REST endpoints for any platform.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://react-sandbox.trygravity.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors text-sm"
                >
                  Try React Sandbox
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link 
                  to="/docs#publisher-integrations"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-100 font-medium rounded-full hover:border-gray-400 transition-colors text-sm"
                >
                  View Docs
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-6 shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="ml-4 text-gray-100 text-sm font-mono">App.tsx</span>
              </div>
              <pre className="text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-gray-100">// App.tsx</span>
                  {"\n\n"}
                  <span className="text-purple-400">import</span>
                  <span className="text-white"> {"{ GravityProvider }"} </span>
                  <span className="text-purple-400">from</span>
                  <span className="text-blue-400"> '@gravity-ai/react'</span>
                  <span className="text-white">;</span>
                  {"\n\n"}
                  <span className="text-purple-400">function</span>
                  <span className="text-white"> App() {"{"}</span>
                  {"\n"}
                  <span className="text-purple-400">  return</span>
                  <span className="text-white"> (</span>
                  {"\n"}
                  <span className="text-white">    {"<"}GravityProvider apiKey=</span>
                  <span className="text-yellow-400">{"{process.env.NEXT_PUBLIC_GRAVITY_API_KEY}"}</span>
                  <span className="text-white">{">"}</span>
                  {"\n"}
                  <span className="text-gray-100">      {"{/* Your app with native AI ads */}"}</span>
                  {"\n"}
                  <span className="text-white">    {"</GravityProvider>"}</span>
                  {"\n"}
                  <span className="text-white">  );</span>
                  {"\n"}
                  <span className="text-white">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Publisher Dashboard Preview */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-gray-100 uppercase tracking-widest mb-4">Your Dashboard</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Track performance and earnings in real-time
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Monitor your revenue, impressions, clicks, and key metrics all in one place.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="bg-[#111111] rounded-3xl p-6 border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Hi Myles</h3>
              <p className="text-sm text-gray-400">View your daily performance metrics and track your earnings</p>
            </div>

            {/* Earnings Cards */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Earnings</h4>
              <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10">
                  {[
                    { label: "Today", value: "$84,731" },
                    { label: "Yesterday", value: "$102,847" },
                    { label: "Last 7 days", value: "$718,439" },
                    { label: "This month", value: "$3,104,582" },
                    { label: "Last 28 days", value: "$2,887,219" },
                  ].map((card, i) => (
                    <div key={i} className="p-4">
                      <p className="text-xs text-gray-400 mb-1">{card.label}</p>
                      <p className="text-xl font-bold text-white">{card.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-6" />

            {/* Performance Overview / Daily Performance Data */}
            <div>
              {/* Section Title - changes based on view */}
              <h4 className="text-sm font-semibold text-white mb-4">
                {dashboardView === "chart" ? "Performance Overview" : "Daily Performance Data"}
              </h4>
              
              {/* Controls Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex bg-[#1a1a1a] rounded-full border border-white/10 p-0.5">
                  <button 
                    onClick={() => {
                      setDashboardView("chart");
                      setIsManualDashboardSwitch(true);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      dashboardView === "chart" 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Chart
                  </button>
                  <button 
                    onClick={() => {
                      setDashboardView("table");
                      setIsManualDashboardSwitch(true);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      dashboardView === "table" 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Table
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 border border-white/10 rounded-lg text-xs text-gray-300 flex items-center gap-2 bg-[#1a1a1a]">
                    <span>11/5/2025 - 12/4/2025</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  <button className="px-3 py-1.5 border border-white/10 rounded-lg text-xs text-gray-300 flex items-center gap-2 bg-[#1a1a1a] hover:bg-white/5 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Export CSV
                  </button>
                </div>
              </div>
              
              {/* Chart View - with Metrics above */}
              {dashboardView === "chart" && (
                <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
                  {/* Metrics Header */}
                  <div className="px-4 py-3 border-b border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-sm font-semibold text-white">Metrics</h5>
                      <div className="flex items-center gap-3">
                        <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-300">
                          Compare
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </button>
                        <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-300">
                          Hide Chart
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Metrics Row - horizontal layout matching screenshot */}
                    <div className="grid grid-cols-6 gap-4">
                      {[
                        { label: "REVENUE", value: "$2,887,219", active: true },
                        { label: "IMPRESSIONS", value: "444.7M", active: false },
                        { label: "CLICKS", value: "9.34M", active: false },
                        { label: "CPM", value: "$6.49", active: false },
                        { label: "CTR", value: "2.1%", active: false },
                        { label: "CPC", value: "$0.31", active: false },
                      ].map((metric, i) => (
                        <div key={i} className={`${metric.active ? "border-b-2 border-blue-500 pb-2" : "pb-2"}`}>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{metric.label}</p>
                          <p className="text-xl font-bold text-white">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <div className="p-4 h-64 relative">
                    <svg viewBox="0 0 800 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                      {/* Dotted grid lines */}
                      <line x1="45" y1="20" x2="790" y2="20" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="45" y1="55" x2="790" y2="55" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="45" y1="90" x2="790" y2="90" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="45" y1="125" x2="790" y2="125" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="45" y1="160" x2="790" y2="160" stroke="#374151" strokeWidth="0.5" />
                      
                      {/* Y-axis labels */}
                      <text x="5" y="24" fontSize="10" fill="#6b7280">$120K</text>
                      <text x="5" y="59" fontSize="10" fill="#6b7280">$90K</text>
                      <text x="5" y="94" fontSize="10" fill="#6b7280">$60K</text>
                      <text x="5" y="129" fontSize="10" fill="#6b7280">$30K</text>
                      <text x="5" y="164" fontSize="10" fill="#6b7280">$0</text>
                      
                      {/* X-axis date labels */}
                      <text x="55" y="175" fontSize="8" fill="#6b7280">Nov 6</text>
                      <text x="160" y="175" fontSize="8" fill="#6b7280">Nov 9</text>
                      <text x="265" y="175" fontSize="8" fill="#6b7280">Nov 12</text>
                      <text x="370" y="175" fontSize="8" fill="#6b7280">Nov 16</text>
                      <text x="475" y="175" fontSize="8" fill="#6b7280">Nov 20</text>
                      <text x="580" y="175" fontSize="8" fill="#6b7280">Nov 24</text>
                      <text x="685" y="175" fontSize="8" fill="#6b7280">Nov 28</text>
                      <text x="770" y="175" fontSize="8" fill="#6b7280">Dec 2</text>
                      
                      {/* Gradient fill under the line */}
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area fill */}
                      <polygon
                        fill="url(#chartGradient)"
                        points="55,85 107,78 159,92 211,70 263,82 315,65 367,75 419,58 471,68 523,55 575,62 627,48 679,55 731,45 783,42 783,160 55,160"
                      />
                      
                      {/* Chart line */}
                      <polyline
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="55,85 107,78 159,92 211,70 263,82 315,65 367,75 419,58 471,68 523,55 575,62 627,48 679,55 731,45 783,42"
                      />
                      
                      {/* Data point markers */}
                      <circle cx="55" cy="85" r="3" fill="#3b82f6" />
                      <circle cx="315" cy="65" r="3" fill="#3b82f6" />
                      <circle cx="523" cy="55" r="3" fill="#3b82f6" />
                      <circle cx="679" cy="48" r="3" fill="#3b82f6" />
                      <circle cx="783" cy="42" r="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Table View */}
              {dashboardView === "table" && (
                <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
                  {/* Table Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <h5 className="text-sm font-semibold text-white">Daily Performance Data</h5>
                    <button className="px-3 py-1.5 border border-white/10 rounded-lg text-xs text-gray-400 flex items-center gap-2 hover:text-gray-300 hover:bg-white/5 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      Columns
                    </button>
                  </div>
                  
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Date</th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">Revenue</th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">Impressions</th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">Clicks</th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">CPM</th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">CPC</th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">CTR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: "Dec 2, 2025", revenue: "$102,847", impressions: "16.2M", clicks: "340.2K", cpm: "$6.35", cpc: "$0.30", ctr: "2.1%" },
                          { date: "Dec 1, 2025", revenue: "$84,731", impressions: "13.1M", clicks: "275.1K", cpm: "$6.47", cpc: "$0.31", ctr: "2.1%" },
                          { date: "Nov 30, 2025", revenue: "$91,683", impressions: "14.2M", clicks: "298.2K", cpm: "$6.46", cpc: "$0.31", ctr: "2.1%" },
                          { date: "Nov 29, 2025", revenue: "$100,847", impressions: "16.1M", clicks: "338.1K", cpm: "$6.26", cpc: "$0.30", ctr: "2.1%" },
                          { date: "Nov 28, 2025", revenue: "$97,523", impressions: "15.3M", clicks: "321.3K", cpm: "$6.37", cpc: "$0.30", ctr: "2.1%" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-300">{row.date}</td>
                            <td className="px-4 py-3 text-sm text-white font-medium text-center">{row.revenue}</td>
                            <td className="px-4 py-3 text-sm text-gray-300 text-center">{row.impressions}</td>
                            <td className="px-4 py-3 text-sm text-gray-300 text-center">{row.clicks}</td>
                            <td className="px-4 py-3 text-sm text-gray-300 text-center">{row.cpm}</td>
                            <td className="px-4 py-3 text-sm text-gray-300 text-center">{row.cpc}</td>
                            <td className="px-4 py-3 text-sm text-gray-300 text-center">{row.ctr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Auto-switch indicator dots */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => {
                    setDashboardView("chart");
                    setIsManualDashboardSwitch(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
                    dashboardView === "chart" ? "bg-blue-500 w-4" : "bg-gray-600"
                  }`}
                  aria-label="Switch to chart view"
                />
                <button
                  onClick={() => {
                    setDashboardView("table");
                    setIsManualDashboardSwitch(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
                    dashboardView === "table" ? "bg-blue-500 w-4" : "bg-gray-600"
                  }`}
                  aria-label="Switch to table view"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Gravity */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs text-gray-100 uppercase tracking-widest mb-4">Benefits</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Why publishers choose Gravity
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyGravity.map((item, i) => (
              <div 
                key={i} 
                className="group relative bg-gradient-to-b from-[#1a1a1a] to-[#111111] rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Number badge */}
                <div className="absolute top-5 right-5 text-xs font-mono text-white/20 group-hover:text-white/30 transition-colors">
                  {item.number}
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-2">
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-5 leading-tight group-hover:text-white transition-colors pr-10" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>{item.title}</h3>
                  
                  {/* Description */}
                  <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.description}</p>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs text-gray-100 uppercase tracking-widest mb-4">FAQs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Frequently asked questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between bg-[#111111] hover:bg-[#1a1a1a] transition-colors"
                >
                  <span className="font-medium text-white text-base">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-100 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 bg-[#111111]">
                    <p className="text-gray-100 text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
            Monetize your AI instantly
          </h2>
          <p className="text-gray-100 text-lg mb-10 max-w-2xl mx-auto">
            Native suggestions. Zero UX impact. Revenue from day one.
          </p>
          
          <div className="flex items-center justify-center">
            <a
              href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-transparent border border-gray-600 text-white font-medium rounded-full hover:border-gray-400 transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      <Footer dark />
    </div>
  );
};

