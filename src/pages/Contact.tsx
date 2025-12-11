import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Background image (optimized)
import contactBg from "@/assets/Contact/optimized/contact-bg.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen text-gray-900 relative">
      {/* Fixed Full-Page Background - Subtle */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${contactBg})` }}
      />
      {/* Light base color */}
      <div className="fixed inset-0 bg-[#f5f5f5] -z-10" />
      
      {/* Content (scrollable, above background) */}
      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-4 text-gray-900">
                Get in touch
              </h1>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Have a question about Gravity? We'd love to hear from you. Reach out through any of the channels below.
              </p>
            </div>

            {/* Contact Cards - White */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {/* Email Card */}
              <a 
                href="mailto:support@trygravity.ai"
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-7 h-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-500 mb-4">For general inquiries and support</p>
                <span className="text-gray-900 font-medium group-hover:underline">
                  support@trygravity.ai
                </span>
              </a>

              {/* LinkedIn Card */}
              <a 
                href="https://www.linkedin.com/company/aigravity/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-7 h-7 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">LinkedIn</h3>
                <p className="text-gray-500 mb-4">Follow us for updates and news</p>
                <span className="text-gray-900 font-medium group-hover:underline flex items-center gap-2">
                  @aigravity
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>

              {/* X (Twitter) Card */}
              <a 
                href="https://x.com/gravity_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-7 h-7 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">X (Twitter)</h3>
                <p className="text-gray-500 mb-4">Join the conversation</p>
                <span className="text-gray-900 font-medium group-hover:underline flex items-center gap-2">
                  @gravity_ai
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>

              {/* Office Card */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Office</h3>
                <p className="text-gray-500 mb-4">Our headquarters</p>
                <span className="text-gray-900 font-medium">
                  500 3rd St<br />
                  San Francisco, CA 94107
                </span>
              </div>
            </div>

            {/* Book a Demo CTA */}
            <div className="mt-8 pt-12 border-t border-gray-200 text-center">
              <p className="text-gray-500 mb-4">Want to see Gravity in action?</p>
              <a 
                href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors font-medium text-lg group"
              >
                Book a demo
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
