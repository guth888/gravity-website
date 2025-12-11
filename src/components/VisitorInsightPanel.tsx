// src/components/VisitorInsightPanel.tsx
"use client";

import React, { useEffect, useState } from "react";
import type { VisitorFingerprint } from "@/lib/visitorFingerprint";
import { useVisitorFingerprint } from "@/hooks/useVisitorFingerprint";

interface Line {
  id: string;
  text: string;
}

// Helper: Classify company as enterprise vs ISP based on keywords
function classifyCompany(companyName: string | undefined): 'enterprise' | 'isp' | 'unknown' {
  if (!companyName) return 'unknown';
  const lower = companyName.toLowerCase();
  
  // Enterprise indicators
  const enterpriseKeywords = [
    'inc', 'inc.', 'incorporated',
    'llc', 'l.l.c.',
    'corp', 'corp.', 'corporation',
    'ltd', 'ltd.', 'limited',
    'gmbh', 'ag', 'sa', 'bv', 'nv',
    'plc', 'pty',
    'co.', 'company',
    'group', 'holdings',
    'technologies', 'solutions', 'systems', 'software',
    'ventures', 'capital', 'partners',
    'google', 'microsoft', 'apple', 'amazon', 'meta', 'netflix',
    'salesforce', 'adobe', 'oracle', 'ibm', 'cisco', 'intel',
  ];
  
  // ISP indicators
  const ispKeywords = [
    'comcast', 'verizon', 'at&t', 'att', 'spectrum', 'cox',
    't-mobile', 'tmobile', 'sprint', 'vodafone', 'telefonica',
    'isp', 'telecom', 'telecommunications', 'broadband',
    'mobile', 'wireless', 'cellular',
    'communications', 'network services',
  ];
  
  for (const kw of ispKeywords) {
    if (lower.includes(kw)) return 'isp';
  }
  
  for (const kw of enterpriseKeywords) {
    if (lower.includes(kw)) return 'enterprise';
  }
  
  return 'unknown';
}

// Helper: Get current hour in visitor's timezone
function getLocalHour(timezone: string | undefined): number | null {
  if (!timezone) return null;
  try {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      hour: 'numeric', 
      hour12: false, 
      timeZone: timezone 
    };
    const hourStr = new Intl.DateTimeFormat('en-US', options).format(now);
    return parseInt(hourStr, 10);
  } catch {
    return null;
  }
}

// Helper: Analyze device from userAgent
function analyzeDevice(userAgent: string | undefined): { 
  isMobile: boolean; 
  platform: 'mac' | 'windows' | 'linux' | 'ios' | 'android' | 'unknown';
} {
  if (!userAgent) return { isMobile: false, platform: 'unknown' };
  const ua = userAgent.toLowerCase();
  
  const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  
  let platform: 'mac' | 'windows' | 'linux' | 'ios' | 'android' | 'unknown' = 'unknown';
  if (ua.includes('iphone') || ua.includes('ipad')) platform = 'ios';
  else if (ua.includes('android')) platform = 'android';
  else if (ua.includes('mac')) platform = 'mac';
  else if (ua.includes('windows')) platform = 'windows';
  else if (ua.includes('linux')) platform = 'linux';
  
  return { isMobile, platform };
}

// Helper: Check if repeat visitor
function checkRepeatVisitor(): boolean {
  if (typeof localStorage === 'undefined') return false;
  const key = 'gravity_seen_before';
  const seen = localStorage.getItem(key);
  if (!seen) {
    localStorage.setItem(key, new Date().toISOString());
    return false;
  }
  return true;
}

export const VisitorInsightPanel: React.FC = () => {
  const { fingerprint, loading, error } = useVisitorFingerprint();
  const [visibleCount, setVisibleCount] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);

  // Build insight lines from fingerprint - narrative psycho-read style
  useEffect(() => {
    if (!fingerprint) return;

    const l: Line[] = [];

    const {
      personaGuess,
      trafficSource,
      landingPath,
      city,
      region,
      country,
      companyName,
      timezone,
      userAgent,
    } = fingerprint;

    // Check repeat visitor
    const isRepeat = checkRepeatVisitor();

    // 0) Repeat visitor callout (if applicable)
    if (isRepeat) {
      l.push({
        id: "repeat",
        text: "This isn't your first time here. You came back, which means something stuck.",
      });
    }

    // 1) Persona / role
    const persona = personaGuess || "Operator evaluating AI monetization / performance.";
    l.push({
      id: "persona",
      text: `You don't feel like a casual visitor. You read as: ${persona}`,
    });

    // 2) Device / platform analysis
    const device = analyzeDevice(userAgent);
    if (device.platform !== 'unknown') {
      let deviceLine = "";
      if (device.isMobile) {
        deviceLine = device.platform === 'ios'
          ? "You're on an iPhone, checking this between meetings or on the move. That's not casual browsing behavior."
          : device.platform === 'android'
          ? "You're on Android, mobile research usually means this is top of mind, not a backlog item."
          : "You're on mobile, quick scan mode. You're qualifying, not deep-diving yet.";
      } else {
        deviceLine = device.platform === 'mac'
          ? "You're on a Mac, product-led environment, probably a startup or scale-up."
          : device.platform === 'windows'
          ? "You're on Windows, enterprise-leaning setup. Probably navigating procurement or internal buy-in."
          : device.platform === 'linux'
          ? "You're on Linux, developer or infra background. You care about how this actually works under the hood."
          : "Desktop session. You're in work mode, not scrolling on the couch.";
      }
      l.push({
        id: "device",
        text: deviceLine,
      });
    }

    // 3) Time-of-day analysis
    const localHour = getLocalHour(timezone);
    if (localHour !== null) {
      let timeLine = "";
      if (localHour >= 9 && localHour < 12) {
        timeLine = "You're here during prime morning hours, when people tackle their most important work.";
      } else if (localHour >= 12 && localHour < 14) {
        timeLine = "Lunchtime browsing, you're squeezing this in between calls. That's a priority signal.";
      } else if (localHour >= 14 && localHour < 18) {
        timeLine = "Afternoon session, deep work hours. You're not just killing time; you're evaluating.";
      } else if (localHour >= 18 && localHour < 21) {
        timeLine = "You're checking this after hours. That's either dedication or a side project that matters.";
      } else if (localHour >= 21 || localHour < 6) {
        timeLine = "Late night visit. Either you're in a different timezone, or this problem is keeping you up.";
      } else {
        timeLine = "Early morning, you're the type who gets ahead before the inbox explodes.";
      }
      l.push({
        id: "time",
        text: timeLine,
      });
    }

    // 4) Location – make it feel intentional
    const locParts = [city, region, country].filter(Boolean);
    const locLabel = locParts.length
      ? locParts.join(", ")
      : country || null;

    if (locLabel) {
      l.push({
        id: "location",
        text: `You're checking this from somewhere around ${locLabel}, not exactly a random corner of the internet.`,
      });
    }

    // 5) Traffic source – interpret intent
    let sourceSentence = "";
    switch (trafficSource) {
      case "paid_search":
        sourceSentence =
          "You came in through paid search, which usually means this is an active project, not a curiosity tab.";
        break;
      case "organic_search":
        sourceSentence =
          "You found Gravity via organic search, after already digging into this problem on your own.";
        break;
      case "social":
        sourceSentence =
          "You dropped in from social, likely off a post or thread that lives in your \"interesting but important\" bucket.";
        break;
      case "referral":
        sourceSentence =
          "You arrived via a referral link, which usually means someone in your circle thought this was worth your attention.";
        break;
      case "email":
        sourceSentence =
          "You came in from an email, you're already on a list that cares about this topic.";
        break;
      case "direct":
      default:
        sourceSentence =
          "You landed here directly, which usually means this wasn't an accident. You already had Gravity or this problem in mind.";
        break;
    }

    l.push({
      id: "source",
      text: sourceSentence,
    });

    // 6) Path – interpret what "/" or a subpage means
    if (landingPath) {
      const prettyPath =
        landingPath === "/" ? "the front door" : `"${landingPath}"`;

      l.push({
        id: "path",
        text: `You came in through ${prettyPath}, exactly where people land when they're trying to understand how this would plug into their stack.`,
      });
    }

    // 7) Environment / org – use companyName with enterprise vs ISP classification
    const companyType = classifyCompany(companyName);
    
    if (companyName) {
      if (companyType === 'enterprise') {
        l.push({
          id: "environment",
          text: `Your network resolves to ${companyName}. That's not a coffee shop, that's a real company with infrastructure decisions to make.`,
        });
      } else if (companyType === 'isp') {
        l.push({
          id: "environment",
          text: `You're coming through ${companyName}, probably working remote or from a home office. But the browsing pattern says this isn't personal time.`,
        });
      } else {
        l.push({
          id: "environment",
          text: `And you're not testing this off a random coffee-shop Wi-Fi. Your network smells like: ${companyName}.`,
        });
      }
    } else {
      l.push({
        id: "environment",
        text:
          "Your setup doesn't look like a student laptop, more like the environment of someone who actually owns a piece of the stack.",
      });
    }

    // 8) Summary – tie it back to Gravity's value
    l.push({
      id: "summary",
      text:
        "All of that is inferred from a single anonymous visit. Gravity does the same at scale for your users, not to expose who they are, but to understand what decision they're trying to make right now.",
    });

    setLines(l);
    setVisibleCount(0);
  }, [fingerprint]);

  // Reveal lines one-by-one for drama
  useEffect(() => {
    if (!lines.length || visibleCount >= lines.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, 650);
    return () => clearTimeout(timer);
  }, [lines, visibleCount]);

  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-900/80 p-5 sm:p-7 lg:p-8 shadow-[0_0_35px_rgba(15,23,42,0.9)]">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          SIGNAL DECODE
          <span className="h-[6px] w-[6px] rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-50">
          We already know enough to serve you better.
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
          This is the kind of real-time profiling Gravity does for your users:
          not creepy data brokerage, just sharp inference from context and
          behavior inside AI conversations.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 sm:px-5 sm:py-5 font-mono text-[11px] sm:text-xs text-slate-200">
        {loading && !error && (
          <div className="flex items-center gap-2 text-slate-500">
            <span className="relative flex h-2 w-6 items-center justify-between">
              <span className="h-1 w-1 rounded-full bg-slate-500 animate-pulse" />
              <span className="h-1 w-1 rounded-full bg-slate-500 animate-pulse" style={{ animationDelay: '75ms' }} />
              <span className="h-1 w-1 rounded-full bg-slate-500 animate-pulse" style={{ animationDelay: '150ms' }} />
            </span>
            <span>Analyzing your signal…</span>
          </div>
        )}

        {error && (
          <div className="text-slate-500">
            We couldn't decode your signal for this demo. In production,
            this is where Gravity would build a real-time profile from your
            traffic.
          </div>
        )}

        {!loading && !error && fingerprint && (
          <div className="space-y-2">
            {lines.slice(0, visibleCount).map((line, index) => (
              <div
                key={line.id}
                className="border-l border-emerald-500/50 pl-3 text-slate-200"
                style={{
                  animation: 'fadeSlideIn 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {line.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-3 text-[10px] text-slate-500">
        Demo mode. Real integrations respect consent and regional privacy
        laws. We optimize for relevance, not creepiness.
      </p>

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default VisitorInsightPanel;

