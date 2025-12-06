import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HelpFAQ = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqSections = [
    {
      title: "Publisher Questions",
      id: "publisher",
      faqs: [
        {
          q: "How does Gravity affect my app's latency?",
          a: "Gravity adds less than 400ms to response time. Our SDK is optimized for minimal overhead, and suggestions are fetched in parallel with your AI response generation."
        },
        {
          q: "Can I control which ad categories appear?",
          a: "Yes. You have full control over category allowlists, blocklists, and brand safety modes (strict, moderate, or open). You can also choose which queries to send to Gravity."
        },
        {
          q: "What if users don't like seeing suggestions?",
          a: "Our UX research shows 78% of users find relevant suggestions helpful. Suggestions are clearly labeled as 'Sponsored' and designed to feel native. You can also offer ad-free premium tiers."
        },
        {
          q: "How much can I earn?",
          a: "Earnings depend on your traffic and engagement. Publishers typically see CPMs of $3-$10 and CTRs around 1.5%. Use our revenue calculator to estimate your potential earnings."
        },
        {
          q: "How do I get started?",
          a: "Integration takes under an hour. Install our React SDK or API SDK, configure your preferences, and you're live. We also offer onboarding support for new publishers."
        }
      ]
    },
    {
      title: "Advertiser Questions",
      id: "advertiser",
      faqs: [
        {
          q: "How do I ensure brand safety?",
          a: "Gravity offers multiple brand safety modes and publisher-level targeting. You control where your brand appears, and all content goes through our safety filters."
        },
        {
          q: "What's the minimum spend?",
          a: "There's no minimum spend requirement. Start with any daily budget and scale as you see results. You only pay when users engage with your ads."
        },
        {
          q: "How is attribution handled?",
          a: "We support click-through attribution with automatic UTM parameters. You can also install our tracking pixel for conversion tracking, or integrate with Calendly and Shopify."
        },
        {
          q: "What ad formats are available?",
          a: "Two native formats: Sponsored Block (a dedicated card with your brand, value prop, and CTA) and Inline Hyperlink (a subtle mention within the AI response)."
        },
        {
          q: "How do I track conversions?",
          a: "Use our Events Manager to set up pixel tracking. We support HTML, Shopify, React, Next.js, WordPress, Webflow, and Framer. You can also use our API for custom tracking."
        }
      ]
    },
    {
      title: "Technical Questions",
      id: "technical",
      faqs: [
        {
          q: "Which LLM frameworks do you support?",
          a: "We support all major frameworks including LangChain, OpenAI, Anthropic, and custom implementations. Our SDK is framework-agnostic."
        },
        {
          q: "Is there a rate limit?",
          a: "Standard plans include 10K requests/day. Enterprise plans have custom limits. Contact us if you need higher throughput."
        },
        {
          q: "Do you support streaming responses?",
          a: "Yes. Our SDK handles streaming responses with suggestions appearing at the appropriate moment after the AI response completes."
        },
        {
          q: "What data do you collect?",
          a: "Gravity only processes metadata: intent signals, category classifications, and anonymized session identifiers. We never see, store, or transmit raw user conversations."
        },
        {
          q: "Is Gravity GDPR compliant?",
          a: "Yes. We're GDPR and CCPA compliant. We offer on-device intent classification so conversation content never leaves your servers."
        }
      ]
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">FAQ</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Quick answers to common questions about Gravity.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      {faqSections.map((section) => (
        <section key={section.id} className="pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
              {section.faqs.map((faq, index) => {
                const faqId = `${section.id}-${index}`;
                const isOpen = openFaq === faqId;
                
                return (
                  <div key={faqId}>
                    <button
                      onClick={() => toggleFaq(faqId)}
                      className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                      <svg 
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our team is happy to help you get started with Gravity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Schedule a call
            </a>
            <Link 
              to="/docs"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-900 px-8 py-4 rounded-full font-medium transition-colors"
            >
              Browse all docs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpFAQ;

