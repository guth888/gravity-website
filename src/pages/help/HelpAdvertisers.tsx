import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HelpAdvertisers = () => {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">For Advertisers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-gray-900 mb-4">
            Reach users in AI conversations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Show up at the exact moment users are asking, comparing, and deciding.
          </p>
        </div>
      </section>

      {/* Campaign Setup */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Campaign Setup</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Campaign Basics</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-700">Campaign Name</div>
                  <div className="text-sm text-gray-500">A descriptive name for your campaign</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-700">Daily Budget</div>
                  <div className="text-sm text-gray-500">Set your daily spend limit</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-700">Landing Page URL</div>
                  <div className="text-sm text-gray-500">Where users go when they click</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-700">Schedule</div>
                  <div className="text-sm text-gray-500">Start date and optional end date</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Campaign Objectives</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Clicks</h3>
              <p className="text-gray-600 text-sm">Drive traffic to your website</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reach</h3>
              <p className="text-gray-600 text-sm">Maximize impressions and brand awareness</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Conversions</h3>
              <p className="text-gray-600 text-sm">Optimize for specific actions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Targeting */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Targeting</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Location Targeting</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Target specific countries and regions for your audience. Select from our list of supported locations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">United States</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">Canada</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">United Kingdom</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">+ more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Formats */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Creative Formats</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Sponsored Block</h3>
              <p className="text-gray-600 text-sm mb-4">
                A dedicated suggestion card with your brand name, value proposition, and "Learn more" CTA.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">Sponsored</p>
                <p className="text-sm font-semibold text-gray-900">Your Brand</p>
                <p className="text-sm text-gray-600">Your value proposition here</p>
                <p className="text-sm text-blue-500 mt-2">Learn more →</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Inline Hyperlink</h3>
              <p className="text-gray-600 text-sm mb-4">
                A subtle inline mention that links directly to your landing page within the AI response.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700">
                  You might also check out <span className="text-blue-600 underline">Your Brand</span> for this.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Tracking */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Conversion Tracking</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Pixel Setup</h3>
              <p className="text-gray-600 text-sm mb-4">Install our tracking pixel on your website. Supports:</p>
              <div className="flex flex-wrap gap-2">
                {["HTML", "Shopify", "React", "Next.js", "Wordpress", "Webflow", "Framer"].map((platform) => (
                  <span key={platform} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Integrations</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">Cal</span>
                  </div>
                  <span className="text-sm text-gray-700">Calendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">S</span>
                  </div>
                  <span className="text-sm text-gray-700">Shopify</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">API</span>
                  </div>
                  <span className="text-sm text-gray-700">Custom API</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">
            Ready to start advertising?
          </h2>
          <p className="text-gray-600 mb-8">
            Reach high-intent users inside AI conversations.
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
              to="/advertisers"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-900 px-8 py-4 rounded-full font-medium transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpAdvertisers;

