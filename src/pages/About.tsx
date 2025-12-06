import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Import publisher logos
import iaskLogo from "@/assets/publishers/iask.png";
import rampLogo from "@/assets/publishers/ramp.png";
import deepaiLogo from "@/assets/publishers/deepai.png";
import sourcegraphLogo from "@/assets/publishers/sourcegraph.svg";

const About = () => {
  const problems = [
    {
      title: "Brands can't access high-intent moments inside LLM conversations.",
      description: "Users ask \"What's the best CRM?\" or \"Which hotel in Paris?\", but advertisers have no structured channel to appear in those intent-rich decision points."
    },
    {
      title: "AI apps and agents have no sustainable monetization model.",
      description: "Running LLMs is expensive. Most assistants, bots, and agents don't have a path to profitability. Gravity gives them a clean, native way to generate revenue without breaking UX."
    },
    {
      title: "Free AI isn't economically possible without an ad layer.",
      description: "Just like search engines and social networks needed ads to become free and globally accessible, AI needs a native monetization layer. Gravity is that layer — the economic infrastructure that will fund the future of free AI."
    }
  ];

  const publishers = [
    { name: "iAsk", logo: iaskLogo },
    { name: "Ramp", logo: rampLogo },
    { name: "DeepAI", logo: deepaiLogo },
    { name: "Amp Code", logo: sourcegraphLogo },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-white leading-tight mb-6">
                Gravity is the advertising layer for AI.
              </h1>
              <a 
                href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Book a demo
              </a>
            </div>

            {/* Right: Description */}
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Gravity is an AI-native ad platform that connects advertisers with high-intent moments inside LLM conversations.
              </p>
              <p>
                We insert sponsored suggestions directly into AI answers—designed to preserve trust and feel native to the conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="py-12 px-6 bg-[#111111] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8">
            AI-powered apps use Gravity
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {publishers.map((publisher, index) => (
              <div key={index} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <img 
                  src={publisher.logo} 
                  alt={publisher.name}
                  className="h-8 w-auto object-contain filter brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Gravity Is Section */}
      <section className="py-24 px-6 bg-[#f5f5f5] text-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-headline font-bold text-gray-900 leading-tight">
                The missing economic layer.
              </h2>
            </div>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Today's AI ecosystem has a missing economic layer. LLM conversations are where decisions now happen — but there is almost no structured way to fund them.
              </p>
              <p>
                Gravity solves this by creating the infrastructure that connects brands with the moments that matter most: when users are actively asking, comparing, and deciding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Gravity Solves Section */}
      <section className="py-24 px-6 bg-[#f5f5f5] text-gray-900 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-gray-900 mb-16">
            Three fundamental problems.
          </h2>

          <div className="space-y-12">
            {problems.map((problem, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center mt-1">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="py-16 px-6 bg-[#f5f5f5] text-gray-900 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm mb-1">Founded</p>
              <p className="text-2xl font-semibold text-gray-900">2025</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm mb-1">Location</p>
              <p className="text-2xl font-semibold text-gray-900">San Francisco, CA</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm mb-1">Team</p>
              <p className="text-2xl font-semibold text-gray-900">Small & mighty</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm mb-1">Stage</p>
              <p className="text-2xl font-semibold text-gray-900">Early</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#f5f5f5] text-gray-900 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-gray-900 mb-6">
            Be part of the AI advertising revolution
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Join world-class AI apps monetizing with Gravity. Whether you're a publisher looking for revenue or an advertiser seeking high-intent audiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Book a demo
            </a>
            <Link 
              to="/docs"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-900 px-8 py-4 rounded-full font-medium transition-colors"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
