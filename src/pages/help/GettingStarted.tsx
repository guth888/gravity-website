import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const GettingStarted = () => {
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

          <h1 className="text-3xl font-headline font-bold mb-8">Getting Started</h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">What is Gravity?</h2>
              <p>
                Gravity is the ad layer for LLM's. We place sponsored suggestions inside LLM conversations at moments when users are making decisions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">What problem does it solve?</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>AI apps need revenue but can't use traditional ads</li>
                <li>Brands want to reach users inside AI conversations</li>
                <li>Gravity connects both without breaking the user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Who is it for?</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>LLM Publishers</strong>: Consumer Chatbots, Search/Chat hybrids, AI Consumer Apps and many more. (Any LLM Surface)</li>
                <li><strong>Advertisers</strong>: Brands that want to reach users in these LLM Surfaces</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Next steps</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><Link to="/help/publishers" className="text-blue-600 hover:underline">I'm a publisher → Learn how to integrate</Link></li>
                <li><Link to="/help/advertisers" className="text-blue-600 hover:underline">I'm an advertiser → Learn how to run campaigns</Link></li>
                <li><a href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Talk to us → Book a call</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GettingStarted;
