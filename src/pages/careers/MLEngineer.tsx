import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const MLEngineer = () => {
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
            Founding Machine Learning Engineer
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
              Gravity is brand new. We're a small, focused team building in San Francisco. We work intensely, ship daily, and move with founder-level urgency. We're looking for exceptional ML engineers who want to build the intelligence layer for AI-native advertising.
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
                "Develop algorithms and models for traffic conversion prediction and consumer behavior analysis.",
                "Research and build systems for understanding user intent from conversational context.",
                "Design matching algorithms that connect users to relevant advertisers.",
                "Own the full data pipeline: collection, model training, testing, and continuous improvement.",
                "Architect scalable ML infrastructure from the ground up.",
                "Ship ML features daily and iterate rapidly based on real-world performance.",
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
                "Exceptional proficiency in ML/AI, with hands-on experience building production systems. (Note: we care about proficiency, not years of experience)",
                "Deep understanding of NLP, embeddings, and modern language models.",
                "Experience with predictive modeling, user behavior analysis, or recommendation systems.",
                "A pragmatic approach to ML: shipping fast, iterating quickly, avoiding over-engineering.",
                "Familiarity with Python, PyTorch/TensorFlow, and ML infrastructure.",
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
              href="mailto:careers@trygravity.ai?subject=Application: Founding Machine Learning Engineer"
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

export default MLEngineer;

