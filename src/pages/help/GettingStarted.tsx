import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const GettingStarted = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      <Header />

      {/* Back Link */}
      <section className="pt-28 px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/help" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Help Center
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-6 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">Getting Started</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-gray-900 mb-4">
            What is Gravity?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            The advertising layer purpose-built for AI conversations.
          </p>
        </div>
      </section>

      {/* What Gravity Is */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What Gravity Is</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Gravity is an AI-native ad platform that connects advertisers with high-intent moments inside LLM conversations. 
              We insert sponsored suggestions directly into AI answers—designed to preserve trust and feel native to the conversation.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">AI-native advertising</span>
              <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">Native suggestions</span>
              <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">Contextual relevance</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Gravity Solves */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Three Problems We Solve</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Brands can't access high-intent moments</h3>
                  <p className="text-gray-600 text-sm">
                    Users ask "What's the best CRM?" inside AI chats, but advertisers have no structured channel to appear in those intent-rich decision points.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI apps have no sustainable monetization</h3>
                  <p className="text-gray-600 text-sm">
                    Running LLMs is expensive. Most AI assistants don't have a path to profitability. Gravity provides native revenue without breaking UX.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Free AI needs an ad layer</h3>
                  <p className="text-gray-600 text-sm">
                    Just like search and social needed ads to become free, AI needs a native monetization layer. Gravity is that infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Who Gravity Is For</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Publishers</h3>
              <p className="text-gray-600 text-sm">LLM apps, AI assistants, and chatbots looking to monetize conversations.</p>
              <Link to="/help/publishers" className="text-blue-600 text-sm mt-3 inline-block hover:underline">
                Learn more →
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Advertisers</h3>
              <p className="text-gray-600 text-sm">Brands wanting to reach users at the exact moment of decision-making.</p>
              <Link to="/help/advertisers" className="text-blue-600 text-sm mt-3 inline-block hover:underline">
                Learn more →
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Agents</h3>
              <p className="text-gray-600 text-sm">Autonomous AI agents that need a monetization layer while maintaining user trust.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-8">
            Schedule a call with our team to learn how Gravity can work for you.
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
              Read full docs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GettingStarted;

