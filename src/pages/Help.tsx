import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Help = () => {
  const helpCategories = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Getting Started",
      description: "Learn what Gravity is, how it works, and how it solves the monetization problem for AI apps.",
      link: "/help/getting-started",
      linkText: "Read overview"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "For Publishers",
      description: "Monetize your LLM app with native ads. SDK setup, configuration, analytics, and best practices.",
      link: "/help/publishers",
      linkText: "Publisher docs"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: "For Advertisers",
      description: "Reach high-intent users inside AI conversations. Campaign setup, targeting, and conversion tracking.",
      link: "/help/advertisers",
      linkText: "Advertiser docs"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "SDK & API Reference",
      description: "Technical documentation for React SDK, API SDK, and REST API. Code examples and integration guides.",
      link: "/help/sdk",
      linkText: "View SDK docs"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "FAQ",
      description: "Frequently asked questions about Gravity for publishers, advertisers, and technical implementation.",
      link: "/help/faq",
      linkText: "View FAQ"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "Contact Support",
      description: "Can't find what you're looking for? Schedule a call with our team and we'll help you get set up.",
      link: "https://calendly.com/zachtheoldham/iris-discovery?month=2025-11",
      linkText: "Schedule a call",
      external: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-gray-900 mb-6 leading-tight">
            How can we help today?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Find answers to common questions and learn how to get the most out of Gravity.
          </p>
        </div>
      </section>

      {/* Help Categories Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {helpCategories.map((category, index) => (
              category.external ? (
                <a
                  key={index}
                  href={category.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#eaeaea] hover:bg-[#e0e0e0] rounded-xl p-8 transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-gray-700">
                      {category.icon}
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{category.description}</p>
                </a>
              ) : (
                <Link
                  key={index}
                  to={category.link}
                  className="group bg-[#eaeaea] hover:bg-[#e0e0e0] rounded-xl p-8 transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-gray-700">
                      {category.icon}
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{category.description}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 px-6 bg-[#f5f5f5] border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-headline font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our documentation covers everything you need to get started with Gravity.
          </p>
          <Link 
            to="/docs"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition-colors"
          >
            Browse all docs
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Help;
