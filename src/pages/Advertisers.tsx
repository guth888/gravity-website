import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { FloatingBrandCards } from "@/components/FloatingBrandCards";

// Import preview images
import desktopPreviewInline from "@/assets/advertisers/desktopPreviewInline.png";
import desktopPreviewSponsored from "@/assets/advertisers/DesktopPreviewSponsored.png";
import phonePreviewInline from "@/assets/advertisers/phonepreviewInline.png";
import phonePreviewSponsored from "@/assets/advertisers/phonePreviewSponsored.png";

// Use Case Tab Type
type UseCaseTab = "create" | "target" | "launch" | "track";
type PreviewTab = "sponsored" | "inline";
type TrackingTab = "pixel" | "analytics";
type ObjectiveTab = "clicks" | "reach" | "conversions";

export const Advertisers = () => {
  const [activeTab, setActiveTab] = useState<UseCaseTab>("create");
  const [isScrolling, setIsScrolling] = useState(false);
  const [previewTab, setPreviewTab] = useState<PreviewTab>("sponsored");
  const [trackingTab, setTrackingTab] = useState<TrackingTab>("pixel");
  const [objectiveTab, setObjectiveTab] = useState<ObjectiveTab>("conversions");
  const createRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const launchRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect which section is in view
  useEffect(() => {
    const refs = [
      { ref: createRef, tab: "create" as UseCaseTab },
      { ref: targetRef, tab: "target" as UseCaseTab },
      { ref: launchRef, tab: "launch" as UseCaseTab },
      { ref: trackRef, tab: "track" as UseCaseTab },
    ];

    let timeoutId: NodeJS.Timeout;

    const observers = refs.map(({ ref, tab }) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3 && !isScrolling) {
              // Debounce to prevent rapid switching
              clearTimeout(timeoutId);
              timeoutId = setTimeout(() => {
                setActiveTab(tab);
              }, 100);
            }
          });
        },
        {
          threshold: [0.3, 0.5, 0.7],
          rootMargin: "-30% 0px -30% 0px",
        }
      );

      observer.observe(ref.current);
      return observer;
    });

    return () => {
      clearTimeout(timeoutId);
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [isScrolling]);

  // Auto-switch preview tab every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewTab((prev) => (prev === "sponsored" ? "inline" : "sponsored"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-switch tracking tab every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingTab((prev) => (prev === "pixel" ? "analytics" : "pixel"));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle tab click - scroll to section
  const handleTabClick = (tab: UseCaseTab) => {
    setIsScrolling(true);
    setActiveTab(tab);
    
    const refMap = {
      create: createRef,
      target: targetRef,
      launch: launchRef,
      track: trackRef,
    };

    const targetRefElement = refMap[tab].current;
    if (targetRefElement) {
      const elementTop = targetRefElement.getBoundingClientRect().top + window.pageYOffset;
      const offset = window.innerHeight * 0.3; // Center in viewport with offset
      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth"
      });
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const useCases = {
    create: {
      title: "Campaign Setup",
      description: "Set up your campaign in minutes. Define your budget, landing page, and schedule. No minimum spend or long-term contracts required.",
      features: [
        "Campaign name and daily budget",
        "Landing page URL with UTM tracking",
        "Flexible start and end dates",
        "Real-time spend tracking"
      ],
      visual: (
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="text-xs text-gray-900 font-medium mb-3">Campaign Basics</div>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-gray-900 block mb-1">Campaign Name</label>
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                <span className="text-xs text-gray-900">Late-Night Hunger Trigger</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-gray-900 block mb-1">Daily Budget</label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                  <span className="text-xs text-gray-400">$</span>
                  <span className="text-xs text-gray-900">10000</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-gray-900 block mb-1">Start Date</label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-xs text-gray-900">Dec 4, 2025</span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-gray-900 block mb-1">Landing Page URL</label>
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                <span className="text-xs text-gray-900">https://www.doordash.com/</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    target: {
      title: "Campaign Objectives",
      description: "Select the primary goal for your campaign. Choose from clicks, reach, or conversions based on what matters most to your business.",
      features: [
        "Clicks: Drive traffic to your website",
        "Reach: Maximize impressions and brand awareness",
        "Conversions: Optimize for specific conversion actions",
        "Location filtering: Filter by country and region"
      ],
      visual: (
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="text-xs text-gray-900 font-medium mb-3">Campaign Objective</div>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => setObjectiveTab("clicks")}
              className={`p-3 rounded-lg text-left transition-all ${
                objectiveTab === "clicks" 
                  ? "border-2 border-blue-500 bg-blue-50/30" 
                  : "border border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  objectiveTab === "clicks" ? "border-blue-500" : "border-gray-300"
                }`}>
                  {objectiveTab === "clicks" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </div>
                <span className="text-gray-900 text-sm font-medium">Clicks</span>
              </div>
              <p className="text-xs text-gray-900">Drive traffic to your website</p>
            </button>
            <button 
              onClick={() => setObjectiveTab("reach")}
              className={`p-3 rounded-lg text-left transition-all ${
                objectiveTab === "reach" 
                  ? "border-2 border-blue-500 bg-blue-50/30" 
                  : "border border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  objectiveTab === "reach" ? "border-blue-500" : "border-gray-300"
                }`}>
                  {objectiveTab === "reach" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </div>
                <span className="text-gray-900 text-sm font-medium">Reach</span>
              </div>
              <p className="text-xs text-gray-900">Maximize impressions</p>
            </button>
            <button 
              onClick={() => setObjectiveTab("conversions")}
              className={`p-3 rounded-lg text-left transition-all ${
                objectiveTab === "conversions" 
                  ? "border-2 border-blue-500 bg-blue-50/30" 
                  : "border border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  objectiveTab === "conversions" ? "border-blue-500" : "border-gray-300"
                }`}>
                  {objectiveTab === "conversions" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </div>
                <span className="text-gray-900 text-sm font-medium">Conversions</span>
              </div>
              <p className="text-xs text-gray-900">Optimize for actions</p>
            </button>
          </div>
        </div>
      )
    },
    launch: {
      title: "Preview & Launch Your Ads",
      description: "See exactly how your ad will appear on mobile and desktop before launching. Choose between Sponsored Block or Inline Hyperlink formats.",
      features: [
        "Sponsored Block format with brand, value prop, CTA",
        "Inline Hyperlink for subtle in-context mentions",
        "Mobile and Desktop previews",
        "Ads generated contextually based on user questions"
      ],
      visual: (
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-4">
            <button 
              onClick={() => setPreviewTab("sponsored")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                previewTab === "sponsored" 
                  ? "bg-gray-100 text-gray-900 border-b-2 border-gray-900" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sponsored Block
            </button>
            <button 
              onClick={() => setPreviewTab("inline")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                previewTab === "inline" 
                  ? "bg-gray-100 text-gray-900 border-b-2 border-gray-900" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Inline Hyperlink
            </button>
          </div>
          
          {/* Preview Images */}
          <div className="flex gap-4 items-start justify-center">
            {/* Mobile Preview */}
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ maxWidth: '140px', height: '290px' }}>
                <img 
                  src={previewTab === "sponsored" ? phonePreviewSponsored : phonePreviewInline}
                  alt={`Mobile ${previewTab === "sponsored" ? "Sponsored Block" : "Inline Hyperlink"} Preview`}
                  className="w-full transition-opacity duration-500"
                  style={{ marginTop: '-5px', height: 'calc(100% + 15px)', objectFit: 'cover' }}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-2 text-center">Mobile</p>
            </div>
            
            {/* Desktop Preview */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative overflow-hidden rounded-lg w-full" style={{ maxWidth: '420px', height: '280px' }}>
                <img 
                  src={previewTab === "sponsored" ? desktopPreviewSponsored : desktopPreviewInline}
                  alt={`Desktop ${previewTab === "sponsored" ? "Sponsored Block" : "Inline Hyperlink"} Preview`}
                  className="w-full h-full object-contain transition-opacity duration-500"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-2 text-center">Desktop</p>
            </div>
          </div>
          
          {/* Auto-switch indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${previewTab === "sponsored" ? "bg-gray-900 w-4" : "bg-gray-300"}`} />
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${previewTab === "inline" ? "bg-gray-900 w-4" : "bg-gray-300"}`} />
          </div>
        </div>
      )
    },
    track: {
      title: "Events Manager",
      description: "Track conversions with our pixel and integrations. Set up in minutes with support for all major platforms. Gravity's engine continuously optimizes your ads for maximum performance.",
      features: [
        "Pixel setup for HTML, Shopify, React, Next.js, Wordpress, Webflow, Framer + more",
        "Test your pixel with live event verification",
        "Connect Calendly, Shopify, or use API for service-side tracking",
        "Continuous optimization powered by Gravity's AI engine"
      ],
      visual: (
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-4">
            <button 
              onClick={() => setTrackingTab("pixel")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                trackingTab === "pixel" 
                  ? "bg-gray-100 text-gray-900 border-b-2 border-gray-900" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Pixel & Conversions
            </button>
            <button 
              onClick={() => setTrackingTab("analytics")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                trackingTab === "analytics" 
                  ? "bg-gray-100 text-gray-900 border-b-2 border-gray-900" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Event Analytics
            </button>
          </div>
          
          {/* Content */}
          <div className="min-h-[200px]">
            {trackingTab === "pixel" ? (
              /* Pixel & Conversions View */
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">1</div>
                    <span className="text-xs font-medium text-gray-900">Setup Your Pixel</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["HTML", "Shopify", "React", "Next.js"].map((p) => (
                      <span key={p} className={`px-2 py-0.5 rounded text-[9px] ${p === "HTML" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}>{p}</span>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">2</div>
                    <span className="text-xs font-medium text-gray-900">Conversion Tracking</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded text-[9px]">
                      <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-[8px] font-bold">C</div>
                      <span>Calendly</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded text-[9px]">
                      <div className="w-4 h-4 rounded bg-green-100 flex items-center justify-center text-green-600 text-[8px] font-bold">S</div>
                      <span>Shopify</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Event Analytics View */
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Event Activity</h4>
                    <p className="text-[10px] text-gray-900">Events received from your website</p>
                  </div>
                  <div className="px-2 py-1 border border-gray-200 rounded text-[9px] text-gray-600 flex items-center gap-1">
                    <span>Nov 28 - Dec 4</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                
                {/* Mini Chart */}
                <div className="h-32 border border-gray-200 rounded-lg p-3 bg-white">
                  <svg viewBox="0 0 240 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="240" y2="20" stroke="#e5e7eb" strokeWidth="0.5" />
                    <line x1="0" y1="40" x2="240" y2="40" stroke="#e5e7eb" strokeWidth="0.5" />
                    <line x1="0" y1="60" x2="240" y2="60" stroke="#e5e7eb" strokeWidth="0.5" />
                    
                    {/* Y-axis labels */}
                    <text x="5" y="22" fontSize="8" fill="#9ca3af">800K</text>
                    <text x="5" y="42" fontSize="8" fill="#9ca3af">400K</text>
                    <text x="5" y="62" fontSize="8" fill="#9ca3af">0</text>
                    
                    {/* X-axis date labels */}
                    <text x="20" y="75" fontSize="7" fill="#9ca3af">28</text>
                    <text x="60" y="75" fontSize="7" fill="#9ca3af">30</text>
                    <text x="100" y="75" fontSize="7" fill="#9ca3af">1</text>
                    <text x="140" y="75" fontSize="7" fill="#9ca3af">3</text>
                    <text x="180" y="75" fontSize="7" fill="#9ca3af">4</text>
                    
                    {/* Chart line - smoother curve with more points */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="20,58 40,56 60,54 80,52 100,18 120,25 140,48 160,55 180,58 200,56 220,54"
                    />
                    
                    {/* Data point markers */}
                    <circle cx="20" cy="58" r="2" fill="#3b82f6" />
                    <circle cx="40" cy="56" r="2" fill="#3b82f6" />
                    <circle cx="60" cy="54" r="2" fill="#3b82f6" />
                    <circle cx="80" cy="52" r="2" fill="#3b82f6" />
                    <circle cx="100" cy="18" r="3.5" fill="#3b82f6" />
                    <circle cx="120" cy="25" r="2" fill="#3b82f6" />
                    <circle cx="140" cy="48" r="2" fill="#3b82f6" />
                    <circle cx="160" cy="55" r="2" fill="#3b82f6" />
                    <circle cx="180" cy="58" r="2" fill="#3b82f6" />
                    <circle cx="200" cy="56" r="2" fill="#3b82f6" />
                    <circle cx="220" cy="54" r="2" fill="#3b82f6" />
                    
                    {/* Peak highlight */}
                    <circle cx="100" cy="18" r="5" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
                
                {/* Events Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 gap-2 px-3 py-2 bg-gray-50 text-[9px] text-gray-900 font-medium">
                    <span>Event</span>
                    <span>Source</span>
                    <span className="text-right">Total</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 px-3 py-2 border-t border-gray-100 text-[10px]">
                    <span className="text-gray-900 font-medium">page_view</span>
                    <span className="text-gray-900">Pixel</span>
                    <span className="text-right text-gray-900 font-semibold">910,782</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 px-3 py-2 border-t border-gray-100 text-[10px]">
                    <span className="text-gray-900 font-medium">click</span>
                    <span className="text-gray-900">Pixel</span>
                    <span className="text-right text-gray-900 font-semibold">304,517</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 px-3 py-2 border-t border-gray-100 text-[10px]">
                    <span className="text-gray-900 font-medium">add_to_cart</span>
                    <span className="text-gray-900">Pixel</span>
                    <span className="text-right text-gray-900 font-semibold">87,341</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 px-3 py-2 border-t border-gray-100 text-[10px]">
                    <span className="text-gray-900 font-medium">purchase</span>
                    <span className="text-gray-900">Pixel</span>
                    <span className="text-right text-gray-900 font-semibold">23,892</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 px-3 py-2 border-t border-gray-100 text-[10px]">
                    <span className="text-gray-900 font-medium">lead</span>
                    <span className="text-gray-900">Pixel</span>
                    <span className="text-right text-gray-900 font-semibold">12,463</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Auto-switch indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${trackingTab === "pixel" ? "bg-gray-900 w-4" : "bg-gray-300"}`} />
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${trackingTab === "analytics" ? "bg-gray-900 w-4" : "bg-gray-300"}`} />
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - Paraform Style */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent" />
        
        <FloatingBrandCards />
        
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
          >
            <span className="text-gray-900">Advertise inside AI answers exactly when users need you.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto mb-6 leading-relaxed">
            Reach users at the exact moment they ask, compare, and decide inside AI conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors text-sm"
            >
              Start Advertising
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Paraform Style Tabs */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Label + Headline + Sticky Navigation */}
            <div className="lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Campaign Workflow</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                <span className="text-gray-900">Run AI-native campaigns end to end on Gravity.</span>
                <span className="text-gray-500"> Built for speed, context, and results.</span>
              </h2>
              
              {/* Tab Navigation */}
              <div className="space-y-2 mt-8">
                {(["create", "target", "launch", "track"] as UseCaseTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                      activeTab === tab 
                        ? "bg-gray-100 text-gray-900 border-l-2 border-gray-900" 
                        : "text-gray-500 hover:text-gray-700 border-l-2 border-transparent"
                    }`}
                  >
                    <span className="capitalize font-medium">{tab}</span>
                    {activeTab === tab && (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right: All Tab Contents - Stacked Vertically */}
            <div className="lg:w-2/3 space-y-24">
              {/* Create Section */}
              <div ref={createRef} className="scroll-mt-24">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {useCases.create.title}
                  </h3>
                  <p className="text-gray-900 mb-6">
                    {useCases.create.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {useCases.create.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-900 text-sm">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {useCases.create.visual}
                </div>
              </div>

              {/* Target Section */}
              <div ref={targetRef} className="scroll-mt-24">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {useCases.target.title}
                  </h3>
                  <p className="text-gray-900 mb-6">
                    {useCases.target.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {useCases.target.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-900 text-sm">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {useCases.target.visual}
                </div>
              </div>

              {/* Launch Section */}
              <div ref={launchRef} className="scroll-mt-24">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {useCases.launch.title}
                  </h3>
                  <p className="text-gray-900 mb-6">
                    {useCases.launch.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {useCases.launch.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-900 text-sm">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {useCases.launch.visual}
                </div>
              </div>

              {/* Track Section */}
              <div ref={trackRef} className="scroll-mt-24">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {useCases.track.title}
                  </h3>
                  <p className="text-gray-900 mb-6">
                    {useCases.track.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {useCases.track.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-900 text-sm">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {useCases.track.visual}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Chat Mockup */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">How it works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                Right message, right moment, right inside the answer.
              </h2>
              <p className="text-gray-500 mb-8 text-lg">
                Gravity places your offer inside AI conversations. Whether your goal is awareness, clicks, or conversions, your message appears in moments where attention is highest and relevance is real.
              </p>
              
              <div className="flex items-center gap-4">
                <Link 
                  to="/docs#advertisers"
                  className="text-gray-900 font-medium hover:underline flex items-center gap-2"
                >
                  Learn more in Docs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Chat Mockup - Realistic LLM Interface */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1a1a1a]" />
                <span className="text-sm text-gray-800 font-medium">Assistant</span>
              </div>
              
              {/* Chat area */}
              <div className="bg-white min-h-[300px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 px-5 py-5 space-y-6">
                  {/* User message - right aligned */}
                  <div className="flex justify-end">
                    <div className="bg-gray-100 rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                      <p className="text-[14px] text-gray-900">How can I get food delivered quickly?</p>
                    </div>
                  </div>
                  
                  {/* AI response - plain text, left aligned */}
                  <div className="space-y-4">
                    <p className="text-[14px] text-gray-700 leading-relaxed">For quick food delivery, look for services with real-time tracking and a wide restaurant selection.</p>
                    
                    {/* Sponsored Block */}
                    <div className="bg-[#fafafa] border border-gray-200 rounded-lg p-3">
                      <p className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mb-1.5">Sponsored</p>
                      <p className="text-[14px] font-semibold text-gray-900">DoorDash</p>
                      <p className="text-[13px] text-gray-500 mt-0.5">Get food delivered fast from local restaurants.</p>
                      <p className="text-[13px] text-gray-700 mt-2 font-medium">Learn more →</p>
                    </div>
                  </div>
                </div>
                
                {/* Input bar */}
                <div className="px-5 pb-5">
                  <div className="bg-[#f7f7f8] rounded-xl px-4 py-3 flex items-center gap-3 border border-gray-200">
                    <span className="text-[14px] text-gray-400 flex-1">Ask anything...</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Targeting Features */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Targeting</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              Target by what matters
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Choose your targeting strategy: clicks, reach, conversions, and filter by geography.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                ),
                title: "Clicks", 
                desc: "Optimize for click performance and engagement" 
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: "Reach", 
                desc: "Maximize brand awareness and impression volume" 
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Conversions", 
                desc: "Focus on high-converting audiences" 
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Geo-Specific", 
                desc: "Filter by country and region" 
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-200 group hover:border-gray-300 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-700 mb-5 group-hover:from-gray-200 group-hover:to-gray-100 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
            Ready to reach high-intent users?
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
            Step into the new era of advertising, where brands appear inside AI conversations at the moments that spark intent and drive results.
          </p>
          
          <div className="flex items-center justify-center">
            <a
              href="/signup"
              className="px-8 py-3.5 bg-transparent border border-gray-300 text-gray-900 font-medium rounded-full hover:border-gray-400 transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>
      </section>

      <Footer className="border-t border-gray-200" />
    </div>
  );
};
