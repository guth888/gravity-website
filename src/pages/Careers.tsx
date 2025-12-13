import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import CareersChatDemo from "@/components/CareersChatDemo";

// Hero image (optimized)
import heroCareerImage from "@/assets/careers/optimized/hero.jpg";

// Mission section background texture (optimized)
import missionBgTexture from "@/assets/careers/optimized/mission-texture.jpg";

const Careers = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
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
      title: "Founding Full Stack Engineer",
      department: "Core Team",
      location: "San Francisco, CA",
      type: "Full-time",
      slug: "full-stack-engineer"
    },
    {
      title: "Founding Machine Learning Engineer",
      department: "Core Team",
      location: "San Francisco, CA",
      type: "Full-time",
      slug: "ml-engineer"
    }
  ];

  const values = [
    "Rationality",
    "Productive Achievement",
    "Ownership"
  ];


  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      <Header />

      {/* Hero Section - Full Background Image with Centered Chat */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img 
          src={heroCareerImage}
          alt="Beautiful workspace view - this could be your career"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Centered Chat Demo */}
        <div className="relative z-10 px-6 pt-24 pb-32">
          <CareersChatDemo />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Come Build With Us */}
      <section 
        id="cta"
        ref={(el) => (sectionRefs.current["cta"] = el)}
        className="py-32 px-6 bg-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className={`text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-gray-900 mb-8 leading-tight transition-all duration-700 ${visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Come Build With Us
          </h2>
          
          <p 
            className={`text-xl text-gray-500 leading-relaxed transition-all duration-700 delay-150 ${visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            We're a small, sharp team working on one of the biggest problems of the decade. If you want to help build real infrastructure for the AI era, we want to meet you.
          </p>
        </div>
      </section>

      {/* Why This Work Matters */}
      <section 
        id="matters"
        ref={(el) => (sectionRefs.current["matters"] = el)}
        className="relative py-24 px-6 bg-white"
      >
        {/* Background texture - entire left side */}
        <div className="absolute top-0 bottom-0 left-0 w-1/2 pointer-events-none hidden lg:block overflow-hidden">
          {/* The image */}
          <div 
            className="absolute inset-0 opacity-[0.25]"
            style={{ 
              backgroundImage: `url(${missionBgTexture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Top fade gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
          {/* Right edge fade */}
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className={`flex flex-col lg:flex-row gap-16 transition-all duration-700 ${visibleSections.has("matters") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="lg:w-1/2 lg:sticky lg:top-32 lg:h-fit">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">The mission</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-gray-900 mt-4 leading-tight">
                Why This Work Matters
              </h2>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <p className="text-xl text-gray-600 leading-relaxed">
                AI is reshaping how the world thinks, searches, learns, and decides, but none of it becomes accessible or affordable without a sustainable economic model.
              </p>
              
              <div className="space-y-4 py-6 border-l-2 border-gray-300 pl-6">
                <p className="text-gray-500">Interruptive ads break trust.</p>
                <p className="text-gray-500">Old playbooks don't apply.</p>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Gravity exists because a new interface needs a new monetization layer, one that's native, contextual, and aligned with users, publishers, and advertisers.
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
                    A model that can make AI free for billions of people
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

      {/* What Drives Us */}
      <section 
        id="values"
        ref={(el) => (sectionRefs.current["values"] = el)}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <p className={`text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mb-8 transition-all duration-700 ${visibleSections.has("values") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Our core values
          </p>
          
          {/* Three values in a row */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 transition-all duration-700 delay-100 ${visibleSections.has("values") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {values.map((value, index) => (
              <div key={index} className="flex items-center gap-4 sm:gap-8">
                <span className="text-2xl sm:text-3xl font-headline font-bold text-gray-900">
                  {value}
                </span>
                {index < values.length - 1 && (
                  <span className="hidden sm:block w-1.5 h-1.5 bg-gray-300 rounded-full" />
                )}
              </div>
            ))}
          </div>
          
          {/* One-liner */}
          <p className={`text-lg text-gray-500 transition-all duration-700 delay-150 ${visibleSections.has("values") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            People who thrive at Gravity think long-term, build brilliantly, and move like founders.
          </p>
        </div>
      </section>

      {/* Open Roles */}
      <section 
        id="open-roles"
        ref={(el) => (sectionRefs.current["open-roles"] = el)}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <div className={`mb-12 transition-all duration-700 ${visibleSections.has("open-roles") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 
              className="text-3xl sm:text-4xl text-gray-900"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Open Roles
            </h2>
          </div>

          {/* Job Listings - Synthetic Style */}
          <div className="space-y-4">
            {openPositions.length > 0 ? (
              openPositions.map((position, index) => (
                <Link 
                  key={index}
                  to={`/careers/${position.slug}`}
                  className={`
                    group block bg-white hover:bg-gray-50
                    rounded-2xl p-8 sm:p-10 transition-all duration-300 
                    border border-gray-200/60 hover:border-gray-300 hover:shadow-lg
                    ${visibleSections.has("open-roles") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <h3 
                    className="text-2xl sm:text-3xl text-gray-900 mb-3"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
                  >
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
                    <span>{position.department}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>{position.location}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>{position.type}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 mb-6">No open roles right now, but we're always looking for great people.</p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 pt-12 border-t border-gray-300/50 text-center">
            <p className="text-gray-500 mb-4">Don't see a fit?</p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors font-medium text-lg group"
            >
              Reach out anyway
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
