import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HelpPublishers = () => {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">For Publishers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-gray-900 mb-4">
            Monetize your AI app
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Native suggestions that feel like helpful additions—no banners, no pop-ups.
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Overview</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Integrate in under an hour with a few lines of code</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Full control over what appears in your app</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Real-time analytics and revenue tracking</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SDK Options */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">SDK Options</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a 
              href="https://www.npmjs.com/package/@gravity-ai/react"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">React SDK</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">Best for React/Next.js apps</p>
              <span className="text-blue-600 text-sm group-hover:underline">View on npm →</span>
            </a>
            
            <a 
              href="https://www.npmjs.com/package/@gravity-ai/api"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">API SDK</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">JavaScript/TypeScript client</p>
              <span className="text-blue-600 text-sm group-hover:underline">View on npm →</span>
            </a>
            
            <a 
              href="https://docs.trygravity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">REST API</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">For any platform</p>
              <span className="text-blue-600 text-sm group-hover:underline">View docs →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Control Panel */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Control Panel Features</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Category Controls</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Allowlists for specific categories
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Blocklists for unwanted categories
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Brand safety modes (strict/moderate/open)
                  </li>
                </ul>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">UX Controls</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Frequency capping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Custom styling to match your UI
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Choose which queries to send
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Analytics & Revenue</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">$3-$10</div>
              <div className="text-gray-600 text-sm">Average CPM</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">1.5%</div>
              <div className="text-gray-600 text-sm">Average CTR</div>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Metrics You'll Track</h3>
            <div className="flex flex-wrap gap-2">
              {["Impressions", "Clicks", "CTR", "CPM", "CPC", "Revenue", "Conversions"].map((metric) => (
                <span key={metric} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
                  {metric}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">
            Ready to monetize?
          </h2>
          <p className="text-gray-600 mb-8">
            Start earning from your AI app in under an hour.
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
              to="/help/sdk"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-900 px-8 py-4 rounded-full font-medium transition-colors"
            >
              View SDK docs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpPublishers;

