import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const MeshAnimation = lazy(() => import("@/components/MeshAnimation").then(m => ({ default: m.MeshAnimation })));

// Animated number counter
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Feature card component
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        group relative p-8 rounded-2xl bg-white border border-black/5
        hover:border-[#3A8BFF]/30 hover:shadow-[0_8px_40px_rgba(58,139,255,0.08)]
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-[#3A8BFF]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#3A8BFF]/20 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-black mb-3">{title}</h3>
      <p className="text-black/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

// Ad format card
const AdFormatCard = ({ 
  title, 
  description, 
  metric,
  metricLabel,
  delay 
}: { 
  title: string; 
  description: string;
  metric: string;
  metricLabel: string;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        group relative p-6 rounded-2xl bg-gradient-to-br from-white to-[#f8fafc] border border-black/5
        hover:border-[#3A8BFF]/30 hover:shadow-[0_12px_48px_rgba(58,139,255,0.1)]
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#3A8BFF]">{metric}</div>
          <div className="text-xs text-black/40">{metricLabel}</div>
        </div>
      </div>
      <p className="text-black/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export const Advertisers = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-30">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        {/* Floating elements for depth */}
        <div 
          className="absolute top-20 right-[10%] w-64 h-64 bg-[#3A8BFF]/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-[#3A8BFF]/3 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-8 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-[#3A8BFF] animate-pulse" />
            <span className="text-xs font-medium text-black/60 uppercase tracking-wider">For Advertisers & Brands</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-[1.1] mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Your buyers are having
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]">
              conversations right now.
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            High-intent moments happen in LLM chats, not just search. 
            Gravity reaches users at the exact second they're deciding—when 
            they're asking, comparing, and ready to act.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link to="/demo?type=advertiser" className="metallic-button">
              <span>Explore Placements</span>
            </Link>
            <Link 
              to="/demo?type=advertiser"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-black/70 hover:text-black transition-colors"
            >
              See Inventory
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div 
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mt-16 pt-16 border-t border-black/10 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-black">
                <AnimatedNumber value={12} suffix="%" />
              </div>
              <div className="text-sm text-black/40 mt-1">Average CTR</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-black">
                <AnimatedNumber value={40} suffix="%" />
              </div>
              <div className="text-sm text-black/40 mt-1">Lower CAC</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-black">
                <AnimatedNumber value={100} suffix="%" />
              </div>
              <div className="text-sm text-black/40 mt-1">Viewability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Problem */}
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-xs font-medium uppercase tracking-wider">
                The Problem
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
                Your buyers are in AI conversations.
                <span className="text-black/30"> You can't reach them there.</span>
              </h2>
              <p className="text-black/50 text-lg leading-relaxed">
                Millions of high-intent conversations happen in LLMs every day. Users asking for recommendations, 
                comparing options, making decisions. This is the new search—and you're invisible.
              </p>
              <ul className="space-y-3">
                {['"What's the best project management tool?"', '"Compare Notion vs Coda for my team"', '"I need a CRM that integrates with Slack"'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/60">
                    <svg className="w-5 h-5 text-red-500/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#3A8BFF]/10 text-[#3A8BFF] text-xs font-medium uppercase tracking-wider">
                The Solution
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
                Be there when they're
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]"> ready to choose.</span>
              </h2>
              <p className="text-black/50 text-lg leading-relaxed">
                Gravity places your brand at the exact moment of high intent—as a native suggestion that feels 
                like the LLM's own recommendation. No banners. No interruptions. Just precision timing.
              </p>
              <ul className="space-y-3">
                {['Appear when users ask about your category', 'Native suggestions, not disruptive ads', 'Full attribution and real-time reporting'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/60">
                    <svg className="w-5 h-5 text-[#3A8BFF] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Formats Section */}
      <section className="relative py-24 sm:py-32 bg-black/[0.02]">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-20">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Native formats that
              <span className="text-black/30"> actually work.</span>
            </h2>
            <p className="text-black/50 text-lg max-w-2xl mx-auto">
              Ad formats designed specifically for conversational AI. High engagement, zero disruption.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdFormatCard
              title="Sponsored Suggestions"
              description="Your product appears as a helpful recommendation within the LLM's response. Feels native, drives action."
              metric="12.4%"
              metricLabel="Avg CTR"
              delay={0}
            />
            <AdFormatCard
              title="Contextual Comparisons"
              description="When users compare options, your product joins the conversation with relevant, timely positioning."
              metric="8.2%"
              metricLabel="Conversion Rate"
              delay={100}
            />
            <AdFormatCard
              title="Intent-Based Recommendations"
              description="Triggered by specific user intents—when they're actively seeking solutions you provide."
              metric="3.2x"
              metricLabel="ROAS"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Precision targeting.
              <span className="text-black/30"> Clean attribution.</span>
            </h2>
            <p className="text-black/50 text-lg max-w-2xl mx-auto">
              Everything you need to reach high-intent users in the AI conversation era.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<svg className="w-6 h-6 text-[#3A8BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              title="Real-Time Bidding"
              description="OpenRTB 2.6 compatible. Plug into our inventory with your existing DSP infrastructure."
              delay={0}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-[#3A8BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Intent Signals"
              description="Target based on real-time conversation context, not stale cookies or demographic proxies."
              delay={100}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-[#3A8BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
              title="Brand Safety"
              description="Full control over placements. Category blocking, keyword exclusions, and publisher allowlists."
              delay={200}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-[#3A8BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
              title="Full Funnel Visibility"
              description="Track from impression to conversion. See exactly which conversations drive revenue."
              delay={300}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-[#3A8BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Flexible Pricing"
              description="CPC, CPM, or CPA models. Optimize for your specific campaign goals and KPIs."
              delay={400}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-[#3A8BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>}
              title="Performance Dashboard"
              description="Real-time reporting on impressions, clicks, conversions, and ROAS across all campaigns."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 sm:py-32 bg-black/[0.02]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-black/5 text-black/60 text-xs font-medium uppercase tracking-wider mb-4">
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              From setup to conversions
              <span className="text-black/30"> in days, not months.</span>
            </h2>
            <p className="text-black/50 text-lg max-w-2xl mx-auto">
              Get your campaigns live fast. Our team handles the heavy lifting.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                number: "1",
                title: "Share your goals",
                description: "Tell us what you want to promote and who you want to reach. We'll map the opportunity."
              },
              {
                number: "2",
                title: "We build your campaigns",
                description: "Our AI generates native ad copy, selects optimal placements, and sets up targeting."
              },
              {
                number: "3",
                title: "Go live and optimize",
                description: "Launch campaigns, monitor performance in real-time, and let our AI continuously optimize."
              }
            ].map((step, index) => (
              <div 
                key={step.number}
                className="flex flex-col md:flex-row gap-8 items-start animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#3A8BFF] text-white flex items-center justify-center text-lg font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black mb-2">{step.title}</h3>
                  <p className="text-black/50">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative">
            <svg className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 text-black/5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl sm:text-3xl font-medium text-black leading-relaxed mb-8">
              "We've tested every channel. Gravity's CTR is 4x higher than our best-performing search campaigns—and the intent quality is unmatched."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3A8BFF] to-[#60a5fa]" />
              <div className="text-left">
                <div className="font-semibold text-black">Marcus Rivera</div>
                <div className="text-sm text-black/50">VP of Growth, B2B SaaS Company</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-30">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight mb-6">
            Ready to reach users when intent is highest?
          </h2>
          <p className="text-lg text-black/50 mb-10 max-w-xl mx-auto">
            Join the brands already winning in the AI conversation channel. 
            See your inventory preview and performance projections.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo?type=advertiser" className="metallic-button">
              <span>Get Your Preview</span>
            </Link>
            <Link 
              to="/demo?type=advertiser"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-black/70 hover:text-black transition-colors"
            >
              Schedule a Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
