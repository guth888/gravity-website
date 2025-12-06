import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HelpSDK = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <Link 
            to="/help" 
            className="text-gray-500 hover:text-gray-900 text-sm mb-8 inline-block"
          >
            ← Back to Help Center
          </Link>

          <h1 className="text-3xl font-headline font-bold mb-8">SDK & API Reference</h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Available SDKs</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><a href="https://www.npmjs.com/package/@gravity-ai/react" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@gravity-ai/react</a> — React SDK</li>
                <li><a href="https://www.npmjs.com/package/@gravity-ai/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@gravity-ai/api</a> — API SDK (JS/TS)</li>
                <li><a href="https://docs.trygravity.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">REST API</a> — Direct HTTP access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick start (React)</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`import { GravityProvider } from '@gravity-ai/react';

function App() {
  return (
    <GravityProvider apiKey={process.env.GRAVITY_API_KEY}>
      {/* Your app */}
    </GravityProvider>
  );
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Configuration options</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`gravity.configure({
  categories: ['saas', 'fintech'],  // Allowed categories
  blocklist: ['gambling'],          // Blocked categories
  safeMode: 'strict',               // Brand safety
  maxSuggestionsPerSession: 3       // Frequency cap
});`}
              </pre>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Resources</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><a href="https://docs.trygravity.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Full API documentation</a></li>
                <li><a href="https://react-sandbox.trygravity.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">React playground</a></li>
                <li><a href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Need help? Book a call</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpSDK;
