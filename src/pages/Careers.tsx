import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type BackerFilterType = "all" | "investors" | "angels";

interface Backer {
  name: string;
  role: string;
  type: "investor" | "angel";
  image?: string;
  logoText?: string;
}

const Careers = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [backerFilter, setBackerFilter] = useState<BackerFilterType>("all");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const openPositions = [
    {
      title: "Founding Engineers",
      department: "Engineering",
      location: "San Francisco / Remote",
      type: "Full-time"
    }
  ];

  const values = [
    {
      title: "High Agency Only",
      description: "We hire people who take ownership, make decisions, and move. No hand-holding. No waiting. If something needs to be fixed, you fix it."
    },
    {
      title: "Top 1% Execution",
      description: "We work with people who are both smart and relentless. Gravity isn't a place to coast — it's a place to stretch yourself beyond what you thought was possible."
    },
    {
      title: "Hard Work Wins",
      description: "We move at the speed of possibility, not comfort. This is a 16-hour-a-day environment when the mission demands it. Intensity is normal here — because the opportunity demands it."
    },
    {
      title: "Two Sides, One Network",
      description: "Publishers and advertisers succeed together or not at all. We build with absolute respect for both sides — and obsess over delivering real value to the entire ecosystem."
    },
    {
      title: "Think in Decades",
      description: "We are building infrastructure, not hacks. Our work compounds. Our decisions matter. We optimize for enduring impact, not quick wins."
    },
    {
      title: "Curiosity with Consequence",
      description: "We question everything, pursue truth, and push into the unknown — but we ship. Curiosity only matters if it leads to progress."
    }
  ];

  const backers: Backer[] = [
    // Institutional Investors
    { name: "Felicis", role: "Investor", type: "investor", logoText: "Felicis" },
    { name: "Peter Deng (GP, Felicis)", role: "Investor", type: "investor", image: "person" },
    { name: "A*", role: "Investor", type: "investor", logoText: "A*" },
    { name: "Bennett, Gautam, and Kevin (A*)", role: "Investor", type: "investor", image: "group" },
    { name: "Liquid 2", role: "Investor", type: "investor", logoText: "LIQUID 2" },
    { name: "BOND", role: "Investor", type: "investor", logoText: "BOND" },
    // Angels
    { name: "Shyam Sankar (CTO, Palantir)", role: "Angel", type: "angel", image: "person" },
    { name: "Cliff, Melanie, and Cameron (Co-founders, Canva)", role: "Angel", type: "angel", image: "group" },
    { name: "Max Mullen (Co-founder, Instacart)", role: "Angel", type: "angel", image: "person" },
    { name: "Jawed Karim (Co-founder, YouTube)", role: "Angel", type: "angel", image: "person" },
    { name: "Bob McGrew (Chief Research Officer, OpenAI)", role: "Angel", type: "angel", image: "person" },
    { name: "Claire Hughes Johnson (COO, Stripe)", role: "Angel", type: "angel", image: "person" },
  ];

  const filteredBackers = backers.filter((backer) => {
    if (backerFilter === "all") return true;
    if (backerFilter === "investors") return backer.type === "investor";
    if (backerFilter === "angels") return backer.type === "angel";
    return true;
  });

  const filterTabs: { key: BackerFilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "investors", label: "Investors" },
    { key: "angels", label: "Angels" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/80 to-transparent pointer-events-none" />
        
        {/* Floating accent */}
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-gray-200/50 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600">We're hiring</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
            Help Build the Ad Layer
            <br />
            <span className="text-gray-400">for the AI Era</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-4 leading-relaxed max-w-3xl mx-auto">
            Advertising hasn't changed in decades. AI has.
          </p>
          
          <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">
            We're building the monetization layer that will make AI free for the world — and we're doing it fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#open-roles"
              className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-gray-800 hover:shadow-xl"
            >
              View open roles
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-gray-400 tracking-wide uppercase">
            San Francisco · Remote-friendly
          </p>
        </div>
      </section>

      {/* Tagline Divider */}
      <section className="py-8 px-6 border-y border-gray-200 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 text-center tracking-wide">
            We move fast, think long-term, and operate with standards that match the size of the opportunity.
          </p>
        </div>
      </section>

      {/* What Drives Us */}
      <section 
        id="values"
        ref={(el) => (sectionRefs.current["values"] = el)}
        className="py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`mb-16 transition-all duration-700 ${visibleSections.has("values") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">No corporate vagueness — real values</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-gray-900 mt-4">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`
                  group relative bg-white rounded-2xl p-8 border border-gray-200
                  hover:border-gray-300 hover:shadow-xl transition-all duration-500
                  ${visibleSections.has("values") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-5">
                    <span className="text-white font-bold text-sm">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Work Matters */}
      <section 
        id="matters"
        ref={(el) => (sectionRefs.current["matters"] = el)}
        className="py-24 px-6 bg-white border-y border-gray-200"
      >
        <div className="max-w-5xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${visibleSections.has("matters") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="lg:sticky lg:top-32">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">The mission</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-gray-900 mt-4 leading-tight">
                Why This Work Matters
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-xl text-gray-600 leading-relaxed">
                AI is reshaping how the world thinks, searches, learns, and decides — but none of it becomes accessible or affordable without a sustainable economic model.
              </p>
              
              <div className="space-y-4 py-6 border-l-2 border-gray-300 pl-6">
                <p className="text-gray-500">Banner ads don't work in chat.</p>
                <p className="text-gray-500">Interruptive ads break trust.</p>
                <p className="text-gray-500">Old playbooks don't apply.</p>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Gravity exists because a new interface needs a new monetization layer — one that's native, contextual, and aligned with users, publishers, and advertisers.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">We're building:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    A new class of advertising
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    A two-sided marketplace with powerful network effects
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    A model that can make AI free for billions
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <p className="text-2xl font-semibold text-gray-900">This isn't a feature.</p>
                <p className="text-2xl font-semibold text-gray-400">It's infrastructure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started Gravity */}
      <section 
        id="started"
        ref={(el) => (sectionRefs.current["started"] = el)}
        className="py-24 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${visibleSections.has("started") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">The origin</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-gray-900 mt-4 leading-tight">
                Why We Started Gravity
              </h2>
            </div>

            <div className="space-y-8 text-gray-600 leading-relaxed">
              <p className="text-xl">
                We saw the same gap across every LLM app, agent, and assistant:
              </p>
              
              <div className="bg-gray-900 text-white rounded-2xl p-8">
                <p className="text-xl font-medium leading-relaxed">
                  Huge user value, huge compute cost — and zero sustainable monetization.
                </p>
              </div>
              
              <p className="text-lg">
                At the same time, advertisers had no way to show up when decisions were being made inside AI conversations.
              </p>
              
              <p className="text-lg">
                So we built Gravity: a native, contextual ad layer designed specifically for AI.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <p className="text-gray-900 font-medium">For Advertisers</p>
                  <p className="text-sm text-gray-500 mt-1">Appear inside trusted AI answers</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <p className="text-gray-900 font-medium">For Publishers</p>
                  <p className="text-sm text-gray-500 mt-1">Unlock meaningful revenue</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-lg text-gray-900 font-medium">
                  We're early. The window is open. The market is huge.
                </p>
                <p className="text-lg text-gray-500 mt-2">
                  And the team is some of the best you'll ever work with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backed By Section */}
      <section 
        id="backers"
        ref={(el) => (sectionRefs.current["backers"] = el)}
        className="py-24 px-6 bg-white border-y border-gray-200"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`mb-10 transition-all duration-700 ${visibleSections.has("backers") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-gray-900 leading-tight">
              Backed by Silicon Valley's finest
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className={`flex items-center gap-2 mb-12 transition-all duration-700 delay-100 ${visibleSections.has("backers") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setBackerFilter(tab.key)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${backerFilter === tab.key
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBackers.map((backer, index) => (
              <div
                key={index}
                className={`
                  group transition-all duration-500
                  ${visibleSections.has("backers") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{ transitionDelay: `${(index % 8) * 50 + 150}ms` }}
              >
                {/* Card Image/Logo */}
                <div className="aspect-square bg-gray-100 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-gray-200 group-hover:border-gray-300 group-hover:shadow-lg transition-all">
                  {backer.image === "person" ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  ) : backer.image === "group" ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  ) : backer.logoText ? (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center p-6">
                      <span className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight text-center">
                        {backer.logoText}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Card Info */}
                <h3 className="font-semibold text-gray-900 leading-snug mb-1 text-sm sm:text-base">
                  {backer.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {backer.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Come Build With Us */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-gray-900 mb-6 leading-tight">
            Come Build With Us
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-4 max-w-2xl mx-auto">
            We're a small, sharp team working on one of the biggest problems of the decade.
          </p>
          
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            If you want to help build real infrastructure for the AI era — we want to meet you.
          </p>
        </div>
      </section>

      {/* Open Roles */}
      <section 
        id="open-roles"
        ref={(el) => (sectionRefs.current["open-roles"] = el)}
        className="py-24 px-6 bg-white border-y border-gray-200"
      >
        <div className="max-w-5xl mx-auto">
          <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-700 ${visibleSections.has("open-roles") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">Join us</span>
              <h2 className="text-3xl sm:text-4xl font-headline font-bold text-gray-900 mt-2">
                Open Roles
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              {openPositions.length} position{openPositions.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {openPositions.length > 0 ? (
              openPositions.map((position, index) => (
                <a 
                  key={index}
                  href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group flex flex-col sm:flex-row sm:items-center justify-between 
                    bg-gray-50 hover:bg-gray-100
                    border border-gray-200 hover:border-gray-300
                    rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg
                    ${visibleSections.has("open-roles") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-600 border border-gray-200">
                        {position.department}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-600 border border-gray-200">
                        {position.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-600 border border-gray-200">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                <p className="text-gray-500 mb-6">No open roles right now, but we're always looking for great people.</p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 pt-12 border-t border-gray-200 text-center">
            <p className="text-gray-500 mb-4">Don't see a fit?</p>
            <a 
              href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors font-medium text-lg group"
            >
              Reach out anyway
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
