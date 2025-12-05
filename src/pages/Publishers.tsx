import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { RevenueCalculator } from "@/components/RevenueCalculator";

// Publisher logos
import iaskLogo from "@/assets/publishers/iask.png";
import rampLogo from "@/assets/publishers/ramp.png";
import ampCodeLogo from "@/assets/publishers/sourcegraph.svg";
import deepaiLogo from "@/assets/publishers/deepai.png";

type UseCaseTab = "chatbots" | "assistants" | "agents" | "search" | "consumer" | "productivity" | "developer" | "autonomous";

export const Publishers = () => {
  const [activeTab, setActiveTab] = useState<UseCaseTab>("chatbots");
  const [isScrolling, setIsScrolling] = useState(false);
  const [dashboardView, setDashboardView] = useState<"chart" | "table">("chart");
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
    const interval = setInterval(() => {
      setDashboardView((prev) => (prev === "chart" ? "table" : "chart"));
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const useCases = {
    chatbots: {
      title: "Consumer Chatbots",
      description: "AI chatbots that answer customer questions and guide users through decisions.",
      visual: (
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#2a2a2a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium">Consumer Chatbot</span>
          </div>
          {/* Messages */}
          <div className="p-4 space-y-4">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#2f2f2f] text-white px-4 py-2.5 rounded-2xl max-w-[85%]">
                <p className="text-sm">What's a good project management tool for startups?</p>
              </div>
            </div>
            {/* AI response */}
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#2a2a2a] flex-shrink-0 flex items-center justify-center mt-1">
                <svg className="w-3.5 h-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/90 mb-3 leading-relaxed">For startups, I'd recommend looking at Notion, Asana, or Monday.com. Each offers flexible workflows and scales well with growing teams.</p>
                {/* Sponsored suggestion */}
                <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-3">
                  <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1.5">Sponsored</p>
                  <p className="text-sm font-medium text-white">Linear</p>
                  <p className="text-sm text-white/70">Issue tracking built for modern software teams.</p>
                </div>
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
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium">AI Assistant</span>
            <span className="text-white/40 text-xs ml-auto">Enterprise</span>
          </div>
          {/* Assistant response */}
          <div className="p-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded bg-[#2a2a2a] flex-shrink-0 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium text-sm">AI Assistant</span>
                  <span className="text-white/40 text-xs">2:34 PM</span>
                </div>
                <p className="text-sm text-white/80 mb-3">Your Q4 revenue is up 34% YoY with healthy margins. Customer acquisition cost decreased by 12% while LTV increased...</p>
                {/* Sponsored */}
                <div className="bg-[#2a2a2a] border border-white/10 rounded-lg p-3">
                  <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1.5">Sponsored</p>
                  <p className="text-sm font-medium text-white">Dealmaker.io</p>
                  <p className="text-xs text-white/60">Do you want to sell your company? We are here to make it easier for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    agents: {
      title: "Knowledge Agents",
      description: "Domain-specific agents that retrieve, summarize, and analyze information.",
      visual: (
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#2a2a2a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium">Knowledge Agent</span>
            <span className="text-white/40 text-xs ml-auto">Research</span>
          </div>
          {/* Content */}
          <div className="p-4">
            <div className="bg-[#252525] rounded-lg p-3 mb-3">
              <p className="text-xs text-white/50 mb-2">Analysis Result</p>
              <p className="text-sm text-white/80 leading-relaxed">Found 3 relevant sources on GDPR compliance requirements. Article 17 covers the right to erasure, while Article 25 addresses data protection by design...</p>
            </div>
            {/* Sponsored */}
            <div className="bg-[#2a2a2a] border border-white/10 rounded-lg p-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1.5">Sponsored</p>
              <p className="text-sm font-medium text-white">Presearch</p>
              <p className="text-xs text-white/60">Search freely, without being tracked, profiled, or manipulated.</p>
            </div>
          </div>
        </div>
      )
    },
    search: {
      title: "Search/Chat Hybrids",
      description: "Experiences that blend search results with conversational AI responses.",
      visual: (
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#2a2a2a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium">Search Agent</span>
          </div>
          {/* Content */}
          <div className="p-4 space-y-3">
            {/* AI Summary */}
            <div className="bg-[#252525] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#3a3a3a]" />
                <span className="text-xs text-white/50">Answer</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">The most effective e-commerce growth strategies in 2024 include influencer partnerships, UGC content, and optimizing your conversion funnel...</p>
            </div>
            {/* Sponsored result */}
            <div className="bg-[#2a2a2a] border border-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-white/50 border border-white/20 px-1.5 py-0.5 rounded">Sponsored</span>
                <span className="text-xs text-white/50">reachdigital.co</span>
              </div>
              <p className="text-sm font-medium text-[#58a6ff]">Reach Digital</p>
              <p className="text-xs text-white/60">Scale your brand with data-driven creatives and performance acquisition systems.</p>
            </div>
          </div>
        </div>
      )
    },
    consumer: {
      title: "AI Consumer Apps",
      description: "Standalone AI apps where users ask, explore, and get personalized answers.",
      visual: (
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-[#2a2a2a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium">Consumer App</span>
          </div>
          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-white/80 mb-3 leading-relaxed">Based on your wellness goals, here are some apps that might help with stress management and better sleep...</p>
            {/* Recommendations */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-3 bg-[#252525] rounded-lg p-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#fa8072]/20 flex items-center justify-center">
                  <span className="text-sm">🧘</span>
                </div>
                <div>
                  <p className="text-sm text-white/90 font-medium">Calm</p>
                  <p className="text-xs text-white/50">Meditation & Sleep</p>
                </div>
              </div>
            </div>
            {/* Sponsored */}
            <div className="bg-[#2a2a2a] border border-white/10 rounded-lg p-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1.5">Sponsored</p>
              <p className="text-sm font-medium text-white">Headspace</p>
              <p className="text-xs text-white/60">Meditation made simple. Start your free trial.</p>
            </div>
          </div>
        </div>
      )
    },
    productivity: {
      title: "Productivity Tools & Copilots",
      description: "AI features inside work tools that help users write, plan, code, or organize.",
      visual: (
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#2a2a2a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium">Writing Copilot</span>
            <span className="text-white/40 text-xs ml-auto">Document</span>
          </div>
          {/* Document with AI */}
          <div className="p-4">
            <div className="bg-[#252525] rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-[#9333ea] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs text-white/50">AI Suggestion</span>
              </div>
              <p className="text-sm text-white/80">I can help draft your quarterly OKRs. Would you like me to suggest some based on last quarter's results?</p>
            </div>
            {/* Sponsored tool */}
            <div className="bg-[#2a2a2a] border border-white/10 rounded-lg p-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1.5">Suggested Tool</p>
              <p className="text-sm font-medium text-white">Asana</p>
              <p className="text-xs text-white/60">Connect your project management for better planning</p>
            </div>
          </div>
        </div>
      )
    },
    developer: {
      title: "Developer Tools & IDEs",
      description: "Coding assistants embedded in IDEs that recommend libraries, tools, and best practices.",
      visual: (
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-white/10 overflow-hidden font-mono">
          {/* VS Code style title bar */}
          <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
            </div>
            <span className="ml-3 text-white/60 text-xs">api.ts — project</span>
          </div>
          {/* Code editor */}
          <div className="p-4">
            <div className="space-y-1 text-sm mb-3">
              <p><span className="text-[#569cd6]">import</span> <span className="text-white/80">{'{ PrismaClient }'}</span> <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">'@prisma/client'</span></p>
              <p className="text-white/40">// Initialize database connection</p>
              <p><span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">prisma</span> <span className="text-white/80">=</span> <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">PrismaClient</span><span className="text-white/80">()</span></p>
            </div>
            {/* Inline suggestion */}
            <div className="bg-[#252525] border-l-2 border-[#007acc] rounded-r p-3">
              <p className="text-xs text-white/50 mb-1.5">💡 Suggestion</p>
              <p className="text-sm text-[#58a6ff]">PlanetScale</p>
              <p className="text-xs text-white/60">Serverless MySQL with branching. Free tier available.</p>
            </div>
          </div>
        </div>
      )
    },
    autonomous: {
      title: "Autonomous Agents",
      description: "Task-running agents that plan, search, and act on the user's behalf.",
      visual: (
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium">Task Agent</span>
            <span className="text-white/40 text-xs ml-auto">3 tasks</span>
          </div>
          {/* Task list */}
          <div className="p-4 space-y-2">
            {/* Completed tasks */}
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded border border-white/20 bg-[#10a37f] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/60 line-through">Search flights NYC → LAX</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded border border-white/20 bg-[#10a37f] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/60 line-through">Compare prices</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
              </div>
              <span className="text-white/80">Finding best hotel deals...</span>
            </div>
            {/* Partner offer */}
            <div className="bg-[#2a2a2a] border border-white/10 rounded-lg p-3 mt-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1.5">Partner Offer</p>
              <p className="text-sm font-medium text-white">Booking.com</p>
              <p className="text-xs text-white/60">Best price guarantee on hotels</p>
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
      description: "Add Gravity with just a few lines of code. Our React SDK, API, or REST endpoints make integration quick—typically under an hour."
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
      description: "Native monetization that feels natural. Suggestions blend seamlessly into the conversation — no banners, no pop-ups, no UX disruption.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      number: "01"
    },
    {
      title: "Full Control Panel",
      description: "Complete control over what appears. Manage allowlists, blocklists, frequency caps, brand-safety settings, and custom styling.",
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
      answer: "Gravity is an ad network built specifically for LLM-powered applications. We help AI publishers monetize their platforms with native, contextual suggestions that feel like helpful recommendations—not intrusive ads."
    },
    {
      question: "How does monetization work?",
      answer: "Gravity detects high-intent moments in user conversations, runs a real-time auction among relevant advertisers, and delivers a native suggestion. You earn revenue on every impression and click. Typical CPMs range from $2-5 depending on vertical."
    },
    {
      question: "Will this hurt my user experience?",
      answer: "No. Suggestions are native, clearly labeled as sponsored, and limited to one per response. Frequency caps prevent fatigue, and you control which categories appear. In testing, user satisfaction scores remained unchanged or improved."
    },
    {
      question: "How long does integration take?",
      answer: "Most integrations complete in under an hour. Our React SDK requires just 3 lines of code. We also offer API SDK and REST endpoints for non-React applications."
    },
    {
      question: "What controls do I have?",
      answer: "Full control: category allowlists/blocklists, frequency capping, brand safety modes (strict, moderate, open), and custom styling to match your UI. You decide what appears and how often."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      {/* Hero Section - Centered with Logos on Sides */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between gap-8">
            
            {/* Left Side - 2 Publisher Cards */}
            <div className="hidden lg:flex flex-col gap-8">
              {/* iAsk */}
              <div className="flex flex-col items-center p-6 rounded-2xl bg-[#111111] border border-white/10 w-48">
                <div className="w-32 h-24 flex items-center justify-center mb-3">
                  <img src={iaskLogo} alt="iAsk" className="w-full h-full object-contain brightness-0 invert scale-[2]" />
                </div>
                <p className="text-xs text-white/50 text-center">Search/Chat Hybrid</p>
              </div>
              
              {/* Ramp */}
              <div className="flex flex-col items-center p-6 rounded-2xl bg-[#111111] border border-white/10 w-48">
                <div className="w-32 h-24 flex items-center justify-center mb-3">
                  <img src={rampLogo} alt="Ramp" className="w-full h-full object-contain brightness-0 invert scale-[2]" />
                </div>
                <p className="text-xs text-white/50 text-center">Productivity Tools & Copilots</p>
              </div>
            </div>

            {/* Center - Headline, Subcopy, CTA */}
            <div className="flex-1 max-w-2xl mx-auto text-center">
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.1]"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
              >
                <span className="text-white">Turn conversational traffic into revenue.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto mb-10">
                Add Gravity to any AI conversational surface and start earning from contextual sponsored suggestions.
              </p>
              
              <a
                href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Book a Demo
              </a>
            </div>

            {/* Right Side - 2 Publisher Cards */}
            <div className="hidden lg:flex flex-col gap-8">
              {/* Amp Code */}
              <div className="flex flex-col items-center p-6 rounded-2xl bg-[#111111] border border-white/10 w-48">
                <div className="w-32 h-24 flex items-center justify-center mb-3">
                  <img src={ampCodeLogo} alt="Amp Code" className="w-full h-full object-contain brightness-0 invert scale-[0.85]" />
                </div>
                <p className="text-xs text-white/50 text-center">Developer Tools & IDEs</p>
              </div>
              
              {/* DeepAI */}
              <div className="flex flex-col items-center p-6 rounded-2xl bg-[#111111] border border-white/10 w-48">
                <div className="w-32 h-24 flex items-center justify-center mb-3">
                  <img src={deepaiLogo} alt="DeepAI" className="w-full h-full object-contain brightness-0 invert scale-[2.3]" />
                </div>
                <p className="text-xs text-white/50 text-center">AI Consumer Apps</p>
              </div>
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
              <div className="text-4xl font-bold text-white mb-1">$128K</div>
              <div className="text-sm text-gray-100">Monthly Revenue</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#0a0a0a]">
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .how-it-works-card {
            animation: fadeInUp 0.5s ease-out forwards;
            opacity: 0;
          }
          .how-it-works-card:nth-child(1) { animation-delay: 0.1s; }
          .how-it-works-card:nth-child(2) { animation-delay: 0.25s; }
          .how-it-works-card:nth-child(3) { animation-delay: 0.4s; }
        `}</style>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs text-gray-100 uppercase tracking-widest mb-4">How it works</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              In 3 Steps
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {howItWorks.map((item, i) => (
              <div key={i} className="how-it-works-card">
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10 shadow-sm h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm font-bold mb-5 group-hover:bg-gray-800 transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-100 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
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
                <span className="text-gray-100"> — from chatbots to autonomous agents</span>
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
                    { label: "Today", value: "$8,500" },
                    { label: "Yesterday", value: "$10,300" },
                    { label: "Last 7 days", value: "$72,000" },
                    { label: "This month", value: "$310,000" },
                    { label: "Last 28 days", value: "$288,521" },
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
                    onClick={() => setDashboardView("chart")}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      dashboardView === "chart" 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Chart
                  </button>
                  <button 
                    onClick={() => setDashboardView("table")}
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
                        { label: "REVENUE", value: "$288,521", active: true },
                        { label: "IMPRESSIONS", value: "44.4M", active: false },
                        { label: "CLICKS", value: "532.8K", active: false },
                        { label: "CPM", value: "$3-$10", active: false },
                        { label: "CTR", value: "1.5%", active: false },
                        { label: "CPC", value: "$0.54", active: false },
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
                    <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                      {/* Dotted grid lines */}
                      <line x1="35" y1="20" x2="390" y2="20" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="35" y1="55" x2="390" y2="55" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="35" y1="90" x2="390" y2="90" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="35" y1="125" x2="390" y2="125" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="35" y1="160" x2="390" y2="160" stroke="#374151" strokeWidth="0.5" />
                      
                      {/* Y-axis labels - showing revenue in thousands ($0 to $12K) */}
                      <text x="5" y="24" fontSize="10" fill="#6b7280">$12K</text>
                      <text x="5" y="59" fontSize="10" fill="#6b7280">$9K</text>
                      <text x="5" y="94" fontSize="10" fill="#6b7280">$6K</text>
                      <text x="5" y="129" fontSize="10" fill="#6b7280">$3K</text>
                      <text x="5" y="164" fontSize="10" fill="#6b7280">$0</text>
                      
                      {/* X-axis date labels */}
                      <text x="40" y="175" fontSize="8" fill="#6b7280">Nov 6</text>
                      <text x="85" y="175" fontSize="8" fill="#6b7280">Nov 9</text>
                      <text x="130" y="175" fontSize="8" fill="#6b7280">Nov 12</text>
                      <text x="175" y="175" fontSize="8" fill="#6b7280">Nov 16</text>
                      <text x="220" y="175" fontSize="8" fill="#6b7280">Nov 20</text>
                      <text x="265" y="175" fontSize="8" fill="#6b7280">Nov 24</text>
                      <text x="310" y="175" fontSize="8" fill="#6b7280">Nov 28</text>
                      <text x="355" y="175" fontSize="8" fill="#6b7280">Dec 2</text>
                      
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
                        points="45,85 65,78 85,92 105,70 125,82 145,65 165,75 185,58 205,68 225,55 245,62 265,48 285,55 305,45 325,52 345,38 365,45 385,42 385,160 45,160"
                      />
                      
                      {/* Chart line - realistic revenue data fluctuating around $8K-$11K daily */}
                      {/* Y scale: 160 = $0, 20 = $12K, so each $1K = ~11.67px */}
                      {/* Daily values: ~$8.5K, $9.2K, $7.8K, $10.3K, $9.0K, $10.8K, $9.5K, $11.2K, $10.0K, $11.5K, $10.5K, $12.0K, $11.3K, $12.2K, $11.0K, $12.8K, $11.8K, $12.3K */}
                      <polyline
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="45,85 65,78 85,92 105,70 125,82 145,65 165,75 185,58 205,68 225,55 245,62 265,48 285,55 305,45 325,52 345,38 365,45 385,42"
                      />
                      
                      {/* Data point markers */}
                      <circle cx="45" cy="85" r="3" fill="#3b82f6" />
                      <circle cx="145" cy="65" r="3" fill="#3b82f6" />
                      <circle cx="225" cy="55" r="3" fill="#3b82f6" />
                      <circle cx="305" cy="45" r="3" fill="#3b82f6" />
                      <circle cx="385" cy="42" r="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
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
                          <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">
                            <div className="flex items-center gap-1">
                              Date
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">
                            <div className="flex items-center justify-center gap-1">
                              Revenue
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">
                            <div className="flex items-center justify-center gap-1">
                              Impressions
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">
                            <div className="flex items-center justify-center gap-1">
                              Clicks
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">
                            <div className="flex items-center justify-center gap-1">
                              CPM
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">
                            <div className="flex items-center justify-center gap-1">
                              CPC
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-center text-xs text-gray-400 font-medium">
                            <div className="flex items-center justify-center gap-1">
                              CTR
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: "Dec 2, 2025", revenue: "$10,300", impressions: "1.6M", clicks: "19.2K", cpm: "$6.44", cpc: "$0.54", ctr: "1.5%" },
                          { date: "Dec 1, 2025", revenue: "$8,500", impressions: "1.3M", clicks: "15.6K", cpm: "$6.54", cpc: "$0.54", ctr: "1.5%" },
                          { date: "Nov 30, 2025", revenue: "$9,200", impressions: "1.4M", clicks: "16.8K", cpm: "$6.57", cpc: "$0.55", ctr: "1.5%" },
                          { date: "Nov 29, 2025", revenue: "$10,100", impressions: "1.6M", clicks: "19.2K", cpm: "$6.31", cpc: "$0.53", ctr: "1.5%" },
                          { date: "Nov 28, 2025", revenue: "$9,800", impressions: "1.5M", clicks: "18.0K", cpm: "$6.53", cpc: "$0.54", ctr: "1.5%" },
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
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${dashboardView === "chart" ? "bg-blue-500 w-4" : "bg-gray-600"}`} />
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${dashboardView === "table" ? "bg-blue-500 w-4" : "bg-gray-600"}`} />
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
                  <span className="text-blue-400"> '@iris-technologies/react'</span>
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
                  <span className="font-medium text-white">{faq.question}</span>
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
                    <p className="text-gray-100">{faq.answer}</p>
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
