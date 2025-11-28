import { useState, useRef, useEffect } from "react";
import { ChevronDown, Code, Brain, Plug, DollarSign, Shield, Cpu } from "lucide-react";

const faqCategories = [
  {
    id: "platform",
    title: "Platform Integration",
    icon: Code,
    questions: [
      {
        q: "How easy is it to integrate Gravity's SDK?",
        a: "Our SDK is designed for seamless integration on both web and mobile publishers. With just a few lines of code, you can integrate native ads into your LLM-powered applications. We provide comprehensive documentation, ready-to-use components, and dedicated support to ensure a smooth integration process."
      },
      {
        q: "What publishers does the SDK support?",
        a: "Our SDK supports all major publishers including Web (React, Vue, Angular), iOS (Swift, Objective-C), and Android (Kotlin, Java). We also provide server-side integration options for publishers using Node.js, Python, and other popular frameworks."
      },
    ]
  },
  {
    id: "llm",
    title: "LLM Integration",
    icon: Brain,
    questions: [
      {
        q: "How does Gravity preserve the conversational experience?",
        a: "Our AI-powered system analyzes conversation context and seamlessly injects relevant ads without breaking the flow. The ads appear as natural suggestions within the conversation, maintaining the organic feel of LLM interactions while creating monetization opportunities."
      },
      {
        q: "What types of LLM publishers can integrate with Gravity?",
        a: "Gravity works with any LLM-based platform, including chatbots, AI assistants, search engines, and content generation tools. Our flexible architecture adapts to your specific use case, whether you're using GPT, Claude, or custom models."
      },
    ]
  },
  {
    id: "dsp",
    title: "DSP Integration",
    icon: Plug,
    questions: [
      {
        q: "How do DSPs connect with Gravity?",
        a: "We support standard OpenRTB 2.6 integration, making it easy for DSPs to plug into our platform. This industry-standard protocol ensures compatibility with existing ad tech infrastructure while enabling access to our unique LLM-native ad inventory."
      },
      {
        q: "What targeting capabilities are available for DSPs?",
        a: "DSPs can leverage our advanced contextual targeting based on real-time conversation analysis, user intent signals, and semantic understanding. This enables precise ad targeting without relying on personal data or cookies."
      },
    ]
  },
  {
    id: "monetization",
    title: "Monetization",
    icon: DollarSign,
    questions: [
      {
        q: "How does Gravity's revenue model work?",
        a: "We operate on a revenue-sharing model where LLM publishers earn a significant portion of the ad revenue. Our real-time bidding system ensures optimal pricing for each ad placement, maximizing revenue for both publishers and advertisers."
      },
      {
        q: "What are the typical revenue expectations for LLM publishers?",
        a: "Revenue varies based on factors like user engagement, conversation volume, and ad relevance. Our platform typically delivers higher CPMs than traditional display advertising due to the highly contextual nature of our ad placements and strong user intent signals."
      },
      {
        q: "How does payment and reporting work?",
        a: "We provide transparent, real-time reporting through our dashboard. Payments are processed monthly, with detailed breakdowns of revenue by advertiser, campaign, and placement type. We support multiple payment methods and currencies."
      },
    ]
  },
  {
    id: "ssp",
    title: "Supply Side Platform Features",
    icon: Cpu,
    questions: [
      {
        q: "How does Gravity optimize ad inventory?",
        a: "Our platform uses machine learning to optimize ad placement timing, format, and content. We automatically balance factors like user experience, advertiser ROI, and platform revenue to ensure optimal outcomes for all parties."
      },
      {
        q: "What types of demand sources does Gravity connect to?",
        a: "We connect to major DSPs, agency trading desks, and direct advertisers. Our platform aggregates demand from multiple sources to ensure high fill rates and competitive CPMs for your ad inventory."
      },
      {
        q: "How does yield optimization work?",
        a: "Our yield optimization engine uses real-time bidding data, historical performance, and AI predictions to maximize revenue. We automatically adjust floor prices, optimize demand path selection, and balance direct and programmatic demand."
      },
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Compliance",
    icon: Shield,
    questions: [
      {
        q: "How does Gravity handle data privacy regulations?",
        a: "We're built with privacy-by-design principles and comply with major regulations like GDPR and CCPA. Our contextual targeting approach means we don't need to collect or store personal user data."
      },
      {
        q: "What about brand safety and ad quality?",
        a: "We maintain strict brand safety controls and ad quality standards. Our AI systems screen all ads for appropriateness, and we provide publishers with granular controls over ad categories and advertisers."
      },
      {
        q: "How do you ensure ad relevance without personal data?",
        a: "We use advanced natural language processing to understand conversation context and user intent in real-time. This allows us to deliver highly relevant ads without tracking users or storing personal information."
      },
    ]
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
      border-b border-border/50 last:border-b-0
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      transition-all duration-500
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <button
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left group"
    >
      <span className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300 pr-4">
        {question}
      </span>
      <ChevronDown
        className={`
          w-5 h-5 text-muted-foreground flex-shrink-0
          transition-transform duration-300
          ${isOpen ? "rotate-180 text-primary" : ""}
        `}
      />
    </button>
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-out
        ${isOpen ? "max-h-[500px] pb-5" : "max-h-0"}
      `}
    >
      <p className="text-sm text-muted-foreground leading-relaxed pr-8">
        {answer}
      </p>
    </div>
  </div>
);

export const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("platform");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
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

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const currentCategory = faqCategories.find(c => c.id === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 bg-background overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className={`
          text-center mb-12 sm:mb-16
          ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          transition-all duration-700
        `}>
          <span className="inline-block px-4 py-2 rounded-full bg-muted text-muted-foreground text-xs sm:text-sm font-medium mb-6 uppercase tracking-[0.12em]">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Everything you need to know
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Can't find what you're looking for? <a href="/demo" className="text-primary hover:underline">Book a demo</a> and our team will help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Category Navigation */}
          <div className={`
            lg:col-span-1
            ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
            transition-all duration-700 delay-200
          `}>
            <div className="sticky top-24 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 px-3">
                Categories
              </p>
              {faqCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium
                      transition-all duration-300
                      ${isActive 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Content */}
          <div className={`
            lg:col-span-3
            ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
            transition-all duration-700 delay-300
          `}>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                {currentCategory && (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <currentCategory.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {currentCategory.title}
                    </h3>
                  </>
                )}
              </div>

              {/* Questions */}
              <div>
                {currentCategory?.questions.map((item, idx) => (
                  <FAQItem
                    key={`${activeCategory}-${idx}`}
                    question={item.q}
                    answer={item.a}
                    isOpen={openItems.has(`${activeCategory}-${idx}`)}
                    onClick={() => toggleItem(`${activeCategory}-${idx}`)}
                    delay={100 + idx * 50}
                    isVisible={isInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

