import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const FullStackEngineer = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Job Detail Content */}
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link 
            to="/careers#open-roles" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all roles
          </Link>

          {/* Job Header */}
          <h1 
            className="text-4xl sm:text-5xl text-gray-900 mb-4"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
          >
            Founding Full Stack Engineer
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-gray-500 mb-12">
            <span>Core Team</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>San Francisco, CA</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>Full-time</span>
          </div>

          {/* Company Description */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-16">
            <p>
              Gravity is brand new. We're a small, focused team building in San Francisco. We work intensely, ship daily, and move with founder-level urgency. We're looking for exceptional engineers who want to build real infrastructure for the AI era.
            </p>
            <p>
              We're looking for people of exceptional competence to join our team. If this is you, and you want to work on the future of AI monetization, apply.
            </p>
          </div>

          {/* How You'll Move the Needle */}
          <section className="mb-16">
            <h2 
              className="text-2xl sm:text-3xl text-gray-900 mb-8"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              How You'll Move the Needle
            </h2>
            <ul className="space-y-4">
              {[
                "Build and own our frontend and backend codebase end-to-end.",
                "Implement performant AI-powered features across the stack.",
                "Design and scale infrastructure that handles real-time ad serving and bidding.",
                "Create intuitive dashboards and tools for advertisers and publishers.",
                "Ship new features and iterate rapidly based on user feedback.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Your Edge */}
          <section className="mb-16">
            <h2 
              className="text-2xl sm:text-3xl text-gray-900 mb-8"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Your Edge
            </h2>
            <ul className="space-y-4">
              {[
                "Exceptional proficiency building products full stack. (Note: we care about proficiency, not years of experience)",
                "Strong experience with Python, Next.js, and React.",
                "Familiarity with PostgreSQL, Redis, and vector embeddings.",
                "Experience with cloud infrastructure (AWS, GCP).",
                "A pragmatic approach to building fast at the early stages of a company.",
                "You default to action, move with intention",
                "You value signal over noise.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Apply Now Button */}
          <div className="border-t border-gray-300/50 pt-12">
            <a
              href="mailto:careers@trygravity.ai?subject=Application: Founding Full Stack Engineer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#2a2a2a] text-[#faf9f7] font-medium rounded-lg hover:bg-[#1a1a1a] transition-colors text-lg"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Apply Now
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FullStackEngineer;

