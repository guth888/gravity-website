import { Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Careers = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const values = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Ship It",
      description: "Perfect is the enemy of done. We iterate fast, learn from users, and improve constantly."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Context Over Control",
      description: "We trust people with information, not micromanagement. Everyone has the context to make great decisions."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Both Sides Win",
      description: "Publishers and advertisers succeed together, or not at all. We build for mutual value."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Default to Open",
      description: "Share context, give direct feedback, assume good intent. Transparency builds trust."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Think in Years",
      description: "We build infrastructure that lasts, not hacks that break. Long-term thinking compounds."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Stay Curious",
      description: "AI moves fast. So do we. We're always learning, questioning, and pushing boundaries."
    }
  ];

  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Full Health Coverage",
      description: "Medical, dental, and vision. We cover 100% of premiums for you and your dependents."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Competitive Compensation",
      description: "Top-of-market salary plus meaningful equity. Everyone at Gravity is an owner."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Remote-Friendly",
      description: "Work from SF, work from home, or mix it up. We care about output, not where you sit."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Unlimited PTO",
      description: "Take the time you need. We actually mean it—rest makes you better at your job."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Learning Budget",
      description: "$1,000 annual budget for books, courses, conferences—whatever helps you grow."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Team Retreats",
      description: "Twice a year we get together in person—think great locations, not conference rooms."
    }
  ];

  const openPositions = [
    {
      title: "Founding Engineer",
      salary: "$150K – $200K",
      type: "Full-time",
      location: "San Francisco / Remote",
      department: "Engineering"
    },
    {
      title: "Growth Lead",
      salary: "$120K – $160K",
      type: "Full-time",
      location: "San Francisco",
      department: "Go to Market"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8">
            <span className="w-5 h-5 bg-gray-900 text-white text-xs font-medium rounded-full flex items-center justify-center">
              {openPositions.length}
            </span>
            <span className="text-sm text-gray-700">Open positions</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-gray-900 mb-6 leading-tight">
            Advertising hasn't evolved in decades. We're changing that.
          </h1>

          {/* Subcopy */}
          <p className="text-xl text-gray-500 mb-10">
            San Francisco · Remote-friendly
          </p>

          {/* CTA */}
          <a 
            href="#positions"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition-colors"
          >
            View open roles
          </a>
        </div>
      </section>

      {/* Team Photos Carousel */}
      <section className="py-16 px-6 bg-[#eaeaea]">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Placeholder for team photos */}
            <div className="flex items-center justify-center gap-6 overflow-hidden">
              {/* Left photo (partial) */}
              <div className="w-64 h-80 bg-gray-300 rounded-2xl flex-shrink-0 -ml-32 opacity-60 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Team photo</span>
              </div>
              
              {/* Center photo (main) */}
              <div className="w-[500px] h-96 bg-gray-200 rounded-2xl flex-shrink-0 shadow-xl flex items-center justify-center border border-gray-300">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-500 font-medium">Growing team</p>
                  <p className="text-gray-400 text-sm mt-1">Photos coming soon</p>
                </div>
              </div>
              
              {/* Right photo (partial) */}
              <div className="w-64 h-80 bg-gray-300 rounded-2xl flex-shrink-0 -mr-32 opacity-60 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Team photo</span>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-3 mt-8">
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-gray-900 mb-16">
            What drives us
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {values.map((value, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-gray-700">{value.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-[#eaeaea]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-gray-900 mb-4">
            Built for builders
          </h2>
          <p className="text-gray-600 text-lg mb-16">
            Everything you need to do your best work.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-[#e0e0e0] rounded-xl p-8">
                <div className="text-gray-700 mb-6">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Story Section (Dark) */}
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Placeholder for founder image */}
          <div className="w-full aspect-video bg-gray-800 rounded-2xl mb-12 flex items-center justify-center border border-white/10">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">Founder photo coming soon</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white">
              Why we started Gravity
            </h2>
            <div className="text-gray-400 space-y-4 leading-relaxed">
              <p>
                We saw the same problem everywhere: LLM-powered apps were transforming how people search, shop, and make decisions—but they had no way to monetize without disrupting the user experience.
              </p>
              <p>
                Banner ads don't work in a chat interface. Pop-ups break the flow. The old playbook doesn't apply.
              </p>
              <p>
                So we built Gravity: the ad network designed specifically for AI applications. Contextual, native, non-intrusive. Revenue for publishers, reach for advertisers, and a better experience for users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section (Dark) */}
      <section id="positions" className="bg-[#0a0a0a] py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-headline text-white mb-4">
              Come build with us
            </h2>
            <p className="text-gray-500 text-lg">
              We're a small team solving a massive problem.
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-12">
            <button className="px-5 py-2.5 bg-gray-800 text-white rounded-lg text-sm flex items-center gap-2">
              Department
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="px-5 py-2.5 bg-gray-800 text-white rounded-lg text-sm flex items-center gap-2">
              Location
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Job Listings */}
          <div className="space-y-0">
            {openPositions.length > 0 ? (
              openPositions.map((position, index) => (
                <a 
                  key={index}
                  href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-6 border-b border-white/10 group hover:bg-white/5 -mx-4 px-4 rounded-lg transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{position.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {position.salary} · {position.type} · {position.location} · {position.department}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-6">No open roles right now, but we're always looking for great people.</p>
                <a 
                  href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                  Get in touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Don't see a role that fits?</p>
            <a 
              href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors font-medium"
            >
              Reach out anyway
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer dark />
    </div>
  );
};

export default Careers;
