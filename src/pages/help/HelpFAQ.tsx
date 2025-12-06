import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HelpFAQ = () => {
  const [open, setOpen] = useState<string | null>(null);

  const faqs = [
    {
      q: "How does Gravity affect my app's latency?",
      a: "Less than 400ms. Suggestions are fetched in parallel with your AI response."
    },
    {
      q: "Can I control which ads appear?",
      a: "Yes. Set allowlists, blocklists, and brand safety levels in your dashboard."
    },
    {
      q: "How much can publishers earn?",
      a: "CPMs range from $3–$10. Average CTR is 1.5%. Use our calculator to estimate."
    },
    {
      q: "What's the minimum ad spend?",
      a: "No minimum. Start with any daily budget."
    },
    {
      q: "How is attribution handled?",
      a: "Click-through attribution with automatic UTM parameters. Pixel tracking available."
    },
    {
      q: "What ad formats are available?",
      a: "Sponsored Block (card with brand + CTA) and Inline Hyperlink (text mention)."
    },
    {
      q: "Is Gravity GDPR compliant?",
      a: "Yes. We only process metadata, never raw conversations. On-device classification available."
    },
    {
      q: "Which LLM frameworks do you support?",
      a: "All major frameworks: LangChain, OpenAI, Anthropic, and custom implementations."
    },
    {
      q: "Is there a rate limit?",
      a: "Standard: 10K requests/day. Enterprise: custom limits."
    }
  ];

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

          <h1 className="text-3xl font-headline font-bold mb-8">FAQ</h1>

          <div className="divide-y divide-gray-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpen(open === `${i}` ? null : `${i}`)}
                  className="w-full text-left flex justify-between items-start gap-4"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <span className="text-gray-400 text-xl leading-none flex-shrink-0">
                    {open === `${i}` ? '−' : '+'}
                  </span>
                </button>
                {open === `${i}` && (
                  <p className="mt-2 text-gray-600">{faq.a}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              Still have questions?{' '}
              <a 
                href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Book a call with us
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpFAQ;
