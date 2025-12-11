import { lazy, Suspense, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load the mesh animation (same as Hero)
const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

const faqItems = [
  {
    q: "What is Gravity?",
    a: "Gravity is the native ad network built for AI. We help LLM-powered apps monetize with contextual suggestions that feel like helpful recommendations, not intrusive ads. For advertisers, we surface your brand at the exact moment users are making decisions inside AI conversations."
  },
  {
    q: "How do ads appear inside AI conversations?",
    a: "Gravity supports two formats: Sponsored Blocks (clearly labeled suggestion cards) and Inline Hyperlinks (subtle in-text mentions). Both are contextual, matching what the user is asking about, so they feel native to the conversation, not disruptive."
  },
  {
    q: "How does Gravity generate revenue for publishers?",
    a: "When a user asks a high-intent question, Gravity runs a real-time auction among relevant advertisers and delivers a native suggestion. Publishers earn on a CPM basis, with typical rates ranging from $3–$200 depending on vertical. You control what traffic you send us."
  },
  {
    q: "What platforms can integrate with Gravity?",
    a: "Gravity works with any AI-powered conversational product: chatbots, AI assistants, search engines, copilots, and autonomous agents. If your product has conversations, Gravity can monetize them."
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
  isVisible: boolean;
}

const FAQItem = ({ question, answer, isOpen, onClick, index, isVisible }: FAQItemProps) => (
  <div
    className={`
      border-b border-foreground/10
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      transition-all duration-500
    `}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <button
      onClick={onClick}
      className="w-full py-6 sm:py-8 flex items-start justify-between text-left group"
    >
      <span className="text-base sm:text-lg font-medium text-foreground group-hover:text-foreground/80 transition-colors pr-8 leading-relaxed">
        {question}
      </span>
      <ChevronDown
        className={`
          w-5 h-5 text-foreground/30 flex-shrink-0 mt-1
          transition-transform duration-300
          ${isOpen ? "rotate-180" : ""}
        `}
      />
    </button>
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-out
        ${isOpen ? "max-h-[500px] pb-6 sm:pb-8" : "max-h-0"}
      `}
    >
      <p className="text-sm sm:text-base text-foreground/50 leading-relaxed pr-12">
        {answer}
      </p>
    </div>
  </div>
);

export const FAQSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-24 sm:py-32 md:py-40"
    >
      {/* Mesh Animation Background - Same as Hero */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-30">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] mx-auto">
        
        {/* Header - Hero-style */}
        <div className={`
          text-center mb-16 sm:mb-20 md:mb-24
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700
        `}>
          <h2 className="hero-headline font-headline font-bold antialiased">
            Frequently asked <span className="gradient">questions.</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="border-t border-foreground/10">
          {faqItems.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openItem === idx}
              onClick={() => setOpenItem(openItem === idx ? null : idx)}
              index={idx}
              isVisible={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
