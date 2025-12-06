import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HelpSDK = () => {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">SDK & API Reference</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-gray-900 mb-4">
            Developer Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Integrate Gravity into your app with just a few lines of code.
          </p>
        </div>
      </section>

      {/* Available SDKs */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Available SDKs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://www.npmjs.com/package/@gravity-ai/react"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">React SDK</h3>
                    <p className="text-sm text-gray-500">@gravity-ai/react</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Best for React and Next.js applications. Includes hooks and components.
              </p>
              <span className="text-blue-600 text-sm group-hover:underline">View on npm →</span>
            </a>
            
            <a 
              href="https://www.npmjs.com/package/@gravity-ai/api"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">API SDK</h3>
                    <p className="text-sm text-gray-500">@gravity-ai/api</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                JavaScript/TypeScript client for any framework or Node.js backend.
              </p>
              <span className="text-blue-600 text-sm group-hover:underline">View on npm →</span>
            </a>
            
            <a 
              href="https://docs.trygravity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">REST API</h3>
                    <p className="text-sm text-gray-500">HTTP endpoints</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Direct HTTP access for any programming language or platform.
              </p>
              <span className="text-blue-600 text-sm group-hover:underline">View docs →</span>
            </a>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 opacity-60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-500">Python SDK</h3>
                    <p className="text-sm text-gray-400">Coming soon</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Soon</span>
              </div>
              <p className="text-gray-400 text-sm">
                Python client for backend integrations and data pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Quick Start</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-mono text-gray-500 uppercase">React Example</span>
              <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Copy</button>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-gray-800">{`// App.tsx
import { GravityProvider } from '@gravity-ai/react';

function App() {
  return (
    <GravityProvider apiKey={process.env.GRAVITY_API_KEY}>
      {/* Your app with native AI ads */}
    </GravityProvider>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Configuration Options</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-mono text-gray-500 uppercase">Configuration</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-gray-800">{`gravity.configure({
  categories: ['saas', 'fintech', 'travel'],
  blocklist: ['gambling', 'adult'],
  safeMode: 'strict',
  maxSuggestionsPerSession: 3,
  styling: {
    accentColor: '#3D3D3D',
    borderRadius: '12px'
  }
});`}</code>
            </pre>
          </div>
          
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">categories</h3>
              <p className="text-gray-600 text-sm">Allowlist of ad categories to show</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">blocklist</h3>
              <p className="text-gray-600 text-sm">Categories to exclude from your app</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">safeMode</h3>
              <p className="text-gray-600 text-sm">Brand safety level (strict, moderate, open)</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">styling</h3>
              <p className="text-gray-600 text-sm">Customize colors and borders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://docs.trygravity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-colors group flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">API Documentation</h3>
                <p className="text-gray-600 text-sm">Full API reference and guides</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a 
              href="https://react-sandbox.trygravity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-colors group flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">React Playground</h3>
                <p className="text-gray-600 text-sm">Try the SDK in your browser</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a 
              href="https://www.npmjs.com/package/@gravity-ai/api"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-colors group flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">API SDK on npm</h3>
                <p className="text-gray-600 text-sm">@gravity-ai/api package</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a 
              href="https://www.npmjs.com/package/@gravity-ai/react"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-colors group flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">React SDK on npm</h3>
                <p className="text-gray-600 text-sm">@gravity-ai/react package</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">
            Need help integrating?
          </h2>
          <p className="text-gray-600 mb-8">
            Our team can walk you through the integration process.
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
            <a 
              href="https://docs.trygravity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-900 px-8 py-4 rounded-full font-medium transition-colors"
            >
              Full documentation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpSDK;

