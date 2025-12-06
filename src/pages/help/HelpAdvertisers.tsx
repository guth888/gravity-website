import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HelpAdvertisers = () => {
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

          <h1 className="text-3xl font-headline font-bold mb-8">For Advertisers</h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">How it works</h2>
              <p>
                Your ads appear as sponsored suggestions inside AI conversations 
                when users ask questions relevant to your product. You pay per click or impression.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Campaign setup</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Set a campaign name and daily budget</li>
                <li>Add your landing page URL</li>
                <li>Choose start/end dates</li>
                <li>Select your objective: Clicks, Reach, or Conversions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Targeting</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Location targeting (countries/regions)</li>
                <li>Ads match user intent automatically based on their questions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Ad formats</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Sponsored Block</strong> — A card with your brand name, description, and "Learn more" link</li>
                <li><strong>Inline Hyperlink</strong> — A subtle mention within the AI response</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Conversion tracking</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Install our tracking pixel (HTML, Shopify, React, WordPress, etc.)</li>
                <li>Automatic UTM parameters on all clicks</li>
                <li>Integrations with Calendly and Shopify</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Get started</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><Link to="/advertisers" className="text-blue-600 hover:underline">Learn more about advertising</Link></li>
                <li><a href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Book a demo</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpAdvertisers;
