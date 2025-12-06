import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HelpPublishers = () => {
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

          <h1 className="text-3xl font-headline font-bold mb-8">For Publishers</h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">How it works</h2>
              <p>
                Add our SDK to your LLM Surface. When users ask purchase-intent questions, we return a relevant sponsored suggestion. You earn revenue per impression and click.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Integration options</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><a href="https://www.npmjs.com/package/@gravity-ai/react" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">React SDK</a> — Best for React/Next.js apps</li>
                <li><a href="https://www.npmjs.com/package/@gravity-ai/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">API SDK</a> — JavaScript/TypeScript client</li>
                <li><a href="https://docs.trygravity.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">REST API</a> — For any platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">What you control</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Which ad categories to allow or block</li>
                <li>How often suggestions appear (frequency caps)</li>
                <li>Custom styling to match your UI</li>
                <li>Which queries get sent to Gravity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Earnings</h2>
              <p className="mb-2">CPM: $3–$200 (per 1,000 messages)</p>
              <p>Track impressions, clicks, CTR, and revenue in your dashboard</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Get started</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><Link to="/help/sdk" className="text-blue-600 hover:underline">View SDK documentation</Link></li>
                <li><a href="https://react-sandbox.trygravity.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Try the React playground</a></li>
                <li><a href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Book a call with us</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPublishers;
