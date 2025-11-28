import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TestimonialCard } from "@/components/TestimonialCard";

type AudienceMode = "publisher" | "advertiser";

export const Demo = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const initialMode: AudienceMode = typeParam === 'publisher' ? 'publisher' : typeParam === 'advertiser' ? 'advertiser' : 'publisher';
  const [mode, setMode] = useState<AudienceMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Update mode if URL param changes
  useEffect(() => {
    if (typeParam === 'publisher') {
      setMode('publisher');
    } else if (typeParam === 'advertiser') {
      setMode('advertiser');
    }
  }, [typeParam]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    details: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", { mode, ...formData });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Thanks for your interest!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We'll be in touch within 24 hours to schedule your demo.
            </p>
            <Link to="/" className="btn-primary">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Form */}
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>

              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Get a Demo
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                See how Gravity can work for your business. We'll walk you through the platform and answer any questions.
              </p>

              {/* Audience Toggle */}
              <div className="mb-8">
                <Label className="text-sm font-medium text-foreground block mb-3">
                  I'm a...
                </Label>
                <div className="inline-flex bg-muted rounded-full p-1">
                  <button 
                    type="button"
                    onClick={() => setMode("publisher")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      mode === "publisher" 
                        ? "bg-white text-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Publisher
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMode("advertiser")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      mode === "advertiser" 
                        ? "bg-white text-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Advertiser
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      type="text"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input 
                      id="role" 
                      type="text"
                      placeholder="Your role"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">
                    {mode === "publisher" 
                      ? "Tell us about your AI product" 
                      : "What are you looking to promote?"
                    }
                  </Label>
                  <Textarea 
                    id="details"
                    placeholder={mode === "publisher" 
                      ? "e.g., We have an AI chatbot with 100K monthly users..." 
                      : "e.g., We're launching a new SaaS product targeting developers..."
                    }
                    value={formData.details}
                    onChange={e => setFormData({ ...formData, details: e.target.value })}
                    className="min-h-[120px]"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request Demo"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We typically respond within 24 hours.
                </p>
              </form>
            </div>

            {/* Right: Value Props & Testimonial */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                {/* Value Props */}
                <div className="bg-muted/30 rounded-2xl p-8 mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-6">
                    What you'll learn
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-muted-foreground">
                        {mode === "publisher" 
                          ? "How to monetize your AI conversations without disrupting UX"
                          : "How to reach high-intent users inside AI conversations"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-muted-foreground">
                        {mode === "publisher" 
                          ? "Revenue estimates based on your traffic and vertical"
                          : "Performance benchmarks for your industry"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-muted-foreground">
                        {mode === "publisher" 
                          ? "Integration options and timeline"
                          : "Campaign setup and targeting options"
                        }
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Testimonial */}
                <TestimonialCard
                  variant="compact"
                  quote={mode === "publisher" 
                    ? "We integrated Gravity in an afternoon and saw our first revenue within 24 hours."
                    : "Gravity delivers 4x the CTR of search. The intent is just unmatched."
                  }
                  name={mode === "publisher" ? "Alex Kim" : "Sarah Chen"}
                  title={mode === "publisher" ? "CTO" : "VP of Growth"}
                  company={mode === "publisher" ? "AI Startup" : "E-commerce Brand"}
                />

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">500+</div>
                      <div className="text-xs text-muted-foreground">Publishers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">12%</div>
                      <div className="text-xs text-muted-foreground">Avg CTR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">24hr</div>
                      <div className="text-xs text-muted-foreground">Response</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
