import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Logo imports
import cladlabsLogo from "@/assets/publishers/cladlabs.png";
import deepaiLogo from "@/assets/publishers/deepai.png";
import iaskLogo from "@/assets/publishers/iask.png";
import presearchLogo from "@/assets/publishers/presearch.png";
import doordashLogo from "@/assets/advertisers/doordash.png";
import flaxlabsLogo from "@/assets/advertisers/flaxlabs.png";

const logos = [
  { src: cladlabsLogo, alt: "CladLabs" },
  { src: deepaiLogo, alt: "DeepAI" },
  { src: iaskLogo, alt: "iAsk" },
  { src: presearchLogo, alt: "Presearch" },
  { src: doordashLogo, alt: "DoorDash" },
  { src: flaxlabsLogo, alt: "FlaxLabs" },
];

// Customer stories
const stories = [
  {
    logo: deepaiLogo,
    title: "How DeepAI increased RPM by 3x with native suggestions",
    date: "November 2024",
    category: "Publisher",
    featured: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
  },
  {
    logo: presearchLogo,
    title: "Presearch: Monetizing search without compromising UX",
    date: "October 2024",
    category: "Publisher",
    featured: false,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80"
  },
  {
    logo: doordashLogo,
    title: "E-commerce brand achieves 14% CTR with intent-based ads",
    date: "October 2024",
    category: "Advertiser",
    featured: false,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
  },
  {
    logo: cladlabsLogo,
    title: "CladLabs: From zero to $50K monthly revenue",
    date: "September 2024",
    category: "Publisher",
    featured: false,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80"
  },
  {
    logo: flaxlabsLogo,
    title: "SaaS company cuts CAC by 45% with conversational ads",
    date: "September 2024",
    category: "Advertiser",
    featured: false,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80"
  },
  {
    logo: iaskLogo,
    title: "iAsk: 95% fill rate with premium demand partners",
    date: "August 2024",
    category: "Publisher",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
  },
];

// Testimonials
const testimonials = [
  {
    logo: deepaiLogo,
    quote: "Gravity transformed how we think about monetization. The suggestions feel so natural that users actually thank us.",
    name: "Michael Torres",
    title: "VP of Product @ DeepAI"
  },
  {
    logo: presearchLogo,
    quote: "We've tried countless ad solutions. Gravity is the only one that improves UX while generating revenue.",
    name: "Sarah Kim",
    title: "Head of Growth @ Presearch"
  },
  {
    logo: doordashLogo,
    quote: "The intent signals are unmatched. We shifted 30% of our search budget to Gravity.",
    name: "Jordan Lee",
    title: "Performance Marketing @ E-commerce"
  },
];

const Customers = () => {
  const [filter, setFilter] = useState<'all' | 'Publisher' | 'Advertiser'>('all');

  const filteredStories = stories.filter(story => {
    if (filter === 'all') return true;
    return story.category === filter;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Headline */}
          <h1 className="font-sans text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em] mb-6">
            World-class teams are built{" "}
            <span className="block">with <span className="text-[#9CA3AF]">Gravity</span></span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-[#1A1A1A]/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            See how publishers and advertisers are transforming AI conversations into business results.
          </p>
          
          {/* CTA */}
          <Link 
            to="/demo" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-medium bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors"
          >
            Book A Demo
          </Link>
          
          {/* Logo Bar */}
          <div className="mt-16">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {logos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 sm:h-8 w-auto object-contain grayscale opacity-50"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CUSTOMER STORIES GRID
          ============================================ */}
      <section className="py-16 sm:py-20 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <h2 className="font-sans text-[#1A1A1A] text-3xl sm:text-4xl leading-[1.1] tracking-[-0.02em]">
              All stories
            </h2>
            
            {/* Filters */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`text-sm font-medium transition-colors ${
                  filter === 'all' ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('Publisher')}
                className={`text-sm font-medium transition-colors ${
                  filter === 'Publisher' ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60'
                }`}
              >
                Publishers
              </button>
              <button
                onClick={() => setFilter('Advertiser')}
                className={`text-sm font-medium transition-colors ${
                  filter === 'Advertiser' ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60'
                }`}
              >
                Advertisers
              </button>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <Link
                key={index}
                to="#"
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <img 
                    src={story.logo} 
                    alt="" 
                    className="h-5 mb-4 grayscale opacity-60"
                  />
                  <h3 className="font-medium text-[#1A1A1A] mb-2 group-hover:text-[#1A1A1A]/70 transition-colors">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <span>{story.category}</span>
                    <span>•</span>
                    <span>{story.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS SECTION
          ============================================ */}
      <section className="py-20 sm:py-24 bg-[#F5F5F0] border-t border-[#1A1A1A]/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-sans text-[#1A1A1A] text-3xl sm:text-4xl leading-[1.1] tracking-[-0.02em] mb-4">
            Performance that speaks for itself
          </h2>
          <Link 
            to="/customers" 
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors mb-12"
          >
            All company stories
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border-l-2 border-[#1A1A1A]/10 pl-6">
                <img 
                  src={testimonial.logo} 
                  alt="" 
                  className="h-5 mb-6 grayscale opacity-60"
                />
                <p className="font-sans text-[#1A1A1A] text-lg leading-[1.4] mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-sm text-[#1A1A1A]">{testimonial.name}</p>
                  <p className="text-sm text-[#9CA3AF]">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION
          ============================================ */}
      <section className="py-20 sm:py-24 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-sans text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] text-center mb-16">
            High-growth teams trust Gravity to{" "}
            <span className="block">deliver exceptional talent, fast</span>
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative bg-[#2A2A2A] rounded-2xl p-6 sm:p-8">
              <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/30" />
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">3x</p>
              <p className="text-sm text-white/60">Higher RPM</p>
            </div>
            <div className="relative bg-[#2A2A2A] rounded-2xl p-6 sm:p-8">
              <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/30" />
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">12%</p>
              <p className="text-sm text-white/60">Average CTR</p>
            </div>
            <div className="relative bg-[#2A2A2A] rounded-2xl p-6 sm:p-8">
              <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/30" />
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">500+</p>
              <p className="text-sm text-white/60">Publishers</p>
            </div>
            <div className="relative bg-[#2A2A2A] rounded-2xl p-6 sm:p-8">
              <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/30" />
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">50+</p>
              <p className="text-sm text-white/60">Demand Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="py-24 sm:py-32 lg:py-40 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-sans text-[#1A1A1A] text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] mb-6">
            Ready to join them?
          </h2>
          <p className="text-[#1A1A1A]/70 text-lg mb-10 max-w-xl mx-auto">
            See how Gravity can transform your AI conversations into business results.
          </p>
          <Link 
            to="/demo" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-medium bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors"
          >
            Book A Demo
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Customers;
