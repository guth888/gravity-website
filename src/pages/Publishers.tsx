import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Lazy load mesh animation
const MeshAnimation = lazy(() => import("../components/MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

// Animated counter component
const AnimatedNumber = ({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

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
        group relative p-8 rounded-2xl bg-white border border-foreground/5
        hover:border-foreground/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-foreground/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

// Step component for integration
const IntegrationStep = ({ 
  number, 
  title, 
  description, 
  code,
  delay 
}: { 
  number: string; 
  title: string; 
  description: string;
  code: string;
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
        flex flex-col md:flex-row gap-8 items-start
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-foreground text-white flex items-center justify-center text-lg font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-foreground/50 mb-4">{description}</p>
        <div className="bg-[#0a0a0a] rounded-xl p-4 font-mono text-sm text-white/80 overflow-x-auto">
          <code>{code}</code>
        </div>
      </div>
    </div>
  );
};

export const Publishers = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-50">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        {/* Floating elements for depth */}
        <div 
          className="absolute top-20 left-[10%] w-64 h-64 bg-[#3A8BFF]/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-[#3A8BFF]/3 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-foreground/60 uppercase tracking-wider">For LLM Publishers</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Your conversations are
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]">
              already valuable.
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl text-foreground/50 max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            You built the space where high-intent conversations happen.
            We built the engine to turn them into revenue—without compromising 
            your UX or your users' trust.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link to="/demo" className="metallic-button">
              <span>Start Monetizing</span>
            </Link>
            <a 
              href="https://www.npmjs.com/package/@iris-technologies/react" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              View Documentation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div 
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mt-16 pt-16 border-t border-foreground/5 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">
                <AnimatedNumber value={3} suffix="x" />
              </div>
              <div className="text-sm text-foreground/40 mt-1">Higher RPM vs Display</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">
                <AnimatedNumber value={12} suffix="%" />
              </div>
              <div className="text-sm text-foreground/40 mt-1">Average CTR</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">
                <AnimatedNumber value={5} suffix=" min" />
              </div>
              <div className="text-sm text-foreground/40 mt-1">Integration Time</div>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Every conversation is full of intent.
                <span className="text-foreground/30"> You're just not capturing it.</span>
              </h2>
              <p className="text-foreground/50 text-lg leading-relaxed">
                Your users ask questions, compare options, and make decisions—all within your LLM interface. 
                That's commercial intent at its purest. Right now, that value disappears into thin air.
              </p>
              <ul className="space-y-3">
                {['Users asking "Which CRM is best for startups?"', 'Comparing products in real-time', 'Ready-to-buy moments, every session'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/60">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Gravity captures value
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A8BFF] to-[#60a5fa]"> without breaking flow.</span>
              </h2>
              <p className="text-foreground/50 text-lg leading-relaxed">
                We insert native, contextual suggestions that feel like your LLM's own insights—not interruptions. 
                Your users get helpful recommendations. You get revenue. Everyone wins.
              </p>
              <ul className="space-y-3">
                {['Suggestions appear naturally in responses', 'Zero impact on conversation quality', 'Revenue flows automatically'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/60">
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

      {/* Features Grid */}
      <section className="relative py-24 sm:py-32 bg-foreground/[0.02]">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-20">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for LLM platforms.
              <span className="text-foreground/30"> Not retrofitted.</span>
            </h2>
            <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
              Every feature designed specifically for conversational AI monetization.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Real-Time Contextual Matching"
              description="Our AI analyzes conversation context in milliseconds to surface only the most relevant suggestions."
              delay={0}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
              title="Privacy-First Design"
              description="No personal data collection. No tracking. Just contextual relevance based on the conversation itself."
              delay={100}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
              title="Flexible Ad Formats"
              description="Native suggestions, inline recommendations, and sponsored responses—all designed to feel organic."
              delay={200}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              title="Transparent Reporting"
              description="Real-time dashboards showing impressions, clicks, revenue, and user engagement metrics."
              delay={300}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Premium Demand Partners"
              description="Access to top-tier advertisers through our curated marketplace. No remnant inventory."
              delay={400}
            />
            <FeatureCard
              icon={<svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
              title="Full Control"
              description="Block categories, set floor prices, approve creatives. Your platform, your rules."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground/60 text-xs font-medium uppercase tracking-wider mb-4">
              Integration
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Live in 5 minutes.
              <span className="text-foreground/30"> Seriously.</span>
            </h2>
            <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
              Three lines of code. That's all it takes to start monetizing your LLM platform.
            </p>
          </div>

          <div className="space-y-12">
            <IntegrationStep
              number="1"
              title="Install the SDK"
              description="Add our lightweight package to your project."
              code="npm install @iris-technologies/react"
              delay={0}
            />
            <IntegrationStep
              number="2"
              title="Initialize Gravity"
              description="Configure with your publisher ID."
              code={`import { GravityProvider } from '@iris-technologies/react';\n\n<GravityProvider publisherId="your-id">\n  <App />\n</GravityProvider>`}
              delay={150}
            />
            <IntegrationStep
              number="3"
              title="Render suggestions"
              description="Display contextual suggestions in your responses."
              code={`import { GravitySuggestion } from '@iris-technologies/react';\n\n<GravitySuggestion context={conversationContext} />`}
              delay={300}
            />
          </div>

          <div className="text-center mt-16">
            <a 
              href="https://www.npmjs.com/package/@iris-technologies/react" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/70 text-sm font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              View Full Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="relative py-24 sm:py-32 bg-foreground/[0.02]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative">
            <svg className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 text-foreground/5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl sm:text-3xl font-medium text-foreground leading-relaxed mb-8">
              "We integrated Gravity in an afternoon. Within a week, our RPM increased by 280%—without a single user complaint about the experience."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3A8BFF] to-[#60a5fa]" />
              <div className="text-left">
                <div className="font-semibold text-foreground">Sarah Chen</div>
                <div className="text-sm text-foreground/50">Head of Product, AI Search Startup</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-40">
            <MeshAnimation className="w-full h-full" />
          </div>
        </Suspense>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Ready to unlock the value in every conversation?
          </h2>
          <p className="text-lg text-foreground/50 mb-10 max-w-xl mx-auto">
            Join the publishers already monetizing their LLM platforms with Gravity. 
            No risk, no long-term commitments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo" className="metallic-button">
              <span>Get Started Free</span>
            </Link>
            <Link 
              to="/demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
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
