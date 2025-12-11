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
  const [isManualDashboardSwitch, setIsManualDashboardSwitch] = useState(false);
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
      answer: "Gravity detects high-intent moments in user conversations, runs a real-time auction among relevant advertisers, and delivers a native suggestion. You earn revenue on every impression and click. Typical CPMs range from $2-5 depending on vertical."
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
      answer: "Full control: category blocklists, brand safety modes (strict, moderate, open), and custom styling to match your UI. You send us whatever traffic you want. We don't force anything. You decide what appears."
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

      {/* How It Works */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
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
                        { label: "CLICKS", value: "5.33M", active: false },
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
                      
                      {/* Y-axis labels */}
                      <text x="5" y="24" fontSize="10" fill="#6b7280">$120K</text>
                      <text x="5" y="59" fontSize="10" fill="#6b7280">$90K</text>
                      <text x="5" y="94" fontSize="10" fill="#6b7280">$60K</text>
                      <text x="5" y="129" fontSize="10" fill="#6b7280">$30K</text>
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
                      
                      {/* Chart line */}
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
                          { date: "Dec 2, 2025", revenue: "$102,847", impressions: "16.2M", clicks: "192.4K", cpm: "$6.44", cpc: "$0.54", ctr: "1.5%" },
                          { date: "Dec 1, 2025", revenue: "$84,731", impressions: "13.1M", clicks: "156.8K", cpm: "$6.54", cpc: "$0.54", ctr: "1.5%" },
                          { date: "Nov 30, 2025", revenue: "$91,683", impressions: "14.2M", clicks: "168.3K", cpm: "$6.57", cpc: "$0.55", ctr: "1.5%" },
                          { date: "Nov 29, 2025", revenue: "$100,847", impressions: "16.1M", clicks: "191.7K", cpm: "$6.31", cpc: "$0.53", ctr: "1.5%" },
                          { date: "Nov 28, 2025", revenue: "$97,523", impressions: "15.3M", clicks: "180.6K", cpm: "$6.53", cpc: "$0.54", ctr: "1.5%" },
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

