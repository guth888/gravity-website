import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    q: "How easy is it to integrate Gravity's SDK?",
    a: "Our SDK is designed for seamless integration on both web and mobile publishers. With just a few lines of code, you can integrate native ads into your LLM-powered applications. We provide comprehensive documentation, ready-to-use components, and dedicated support."
  },
  {
    q: "How does Gravity preserve the conversational experience?",
    a: "Our AI-powered system analyzes conversation context and seamlessly injects relevant suggestions without breaking the flow. The ads appear as natural suggestions within the conversation, maintaining the organic feel of LLM interactions."
  },
  {
    q: "What types of LLM platforms can integrate with Gravity?",
    a: "Gravity works with any LLM-based platform, including chatbots, AI assistants, search engines, and content generation tools. Our flexible architecture adapts to your specific use case, whether you're using GPT, Claude, or custom models."
  },
  {
    q: "How does Gravity's revenue model work?",
    a: "We operate on a revenue-sharing model where LLM publishers earn a significant portion of the ad revenue. Our real-time bidding system ensures optimal pricing for each ad placement, maximizing revenue for both publishers and advertisers."
  },
  {
    q: "How does Gravity handle data privacy regulations?",
    a: "We're built with privacy-by-design principles and comply with major regulations like GDPR and CCPA. Our contextual targeting approach means we don't need to collect or store personal user data."
  },
  {
    q: "How do you ensure ad relevance without personal data?",
    a: "We use advanced natural language processing to understand conversation context and user intent in real-time. This allows us to deliver highly relevant suggestions without tracking users or storing personal information."
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
  isVisible: boolean;
}

const FAQItem = ({ question, answer, isOpen, onClick, delay, isVisible }: FAQItemProps) => (
  <div
    className={`
      border-b border-border/30 last:border-b-0
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      transition-all duration-500
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <button
      onClick={onClick}
      className="w-full py-6 sm:py-8 flex items-start justify-between text-left group"
    >
      <span className="text-base sm:text-lg font-normal text-foreground group-hover:text-foreground/80 transition-colors pr-8 leading-relaxed">
        {question}
      </span>
      <ChevronDown
        className={`
          w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-1
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
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pr-12">
        {answer}
      </p>
    </div>
  </div>
);

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // First one open by default
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

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 bg-background overflow-hidden"
    >
      <div className="max-w-[800px] mx-auto relative z-10">
        {/* Header */}
        <div className={`
          text-center mb-16 sm:mb-20
          ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          transition-all duration-700
        `}>
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
            Questions & Answers
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.15]">
            Everything you need
            <br />
            <span className="gradient">to know.</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="border-t border-border/30">
          {faqItems.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openItems.has(idx)}
              onClick={() => toggleItem(idx)}
              delay={100 + idx * 80}
              isVisible={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`
          text-center mt-16 sm:mt-20
          ${isInView ? "opacity-100" : "opacity-0"}
          transition-opacity duration-700 delay-500
        `}>
          <p className="text-sm text-muted-foreground">
            Can't find what you're looking for?{" "}
            <a href="/demo" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors">
              Book a demo
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
