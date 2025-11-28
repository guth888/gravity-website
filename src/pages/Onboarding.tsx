import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { InputSignalPanel } from "@/components/onboarding/InputSignalPanel";
import { GoalCard } from "@/components/onboarding/GoalCard";
import { IntentSurfaceToggle } from "@/components/onboarding/IntentSurfaceToggle";
import { ToneSlider } from "@/components/onboarding/ToneSlider";
import { FileUploadZone } from "@/components/onboarding/FileUploadZone";
import { MeshIcon } from "@/components/onboarding/MeshIcon";
import { Target, MousePointer, Megaphone, TrendingUp, MessageSquare, Map, ShoppingCart, Scale, GraduationCap, Search, MapPin } from "lucide-react";
type ScanStatus = 'idle' | 'scanning' | 'scanned';

interface OnboardingState {
  currentStep: number;
  completedSteps: number[];
  scanStatus: ScanStatus;
  brandBasics: {
    name: string;
    url: string;
    industry: string;
    description: string;
  };
  audience: {
    segments: string[];
    geo: string[];
    goals: string;
    personas: string[];
  };
  goal: "conversions" | "clicks" | "awareness" | null;
  assets: {
    brand: string[];
    products: string[];
    social: {
      instagram: string;
      twitter: string;
      linkedin: string;
    };
    competitors: string[];
  };
  tone: {
    summary: string;
    sliders: {
      formal: number;
      bold: number;
      technical: number;
      playful: number;
    };
  };
  intentSurfaces: Record<string, boolean>;
}
const INDUSTRIES = ["E-commerce", "SaaS", "Fintech", "Healthcare", "Education", "Real Estate", "Travel & Hospitality", "Media & Entertainment", "Other"];
const AUDIENCE_SEGMENTS = [{
  id: "b2c",
  label: "Consumers (B2C)"
}, {
  id: "smb",
  label: "Small Businesses (SMB)"
}, {
  id: "midmarket",
  label: "Mid-Market"
}, {
  id: "enterprise",
  label: "Enterprise"
}];
const INTENT_SURFACES = [{
  id: "buying",
  name: "Buying now / high-intent moments",
  description: "Users asking for specific product recommendations with high purchase intent."
}, {
  id: "comparison",
  name: "Comparison decision moments",
  description: "Users evaluating alternatives and making purchase decisions."
}, {
  id: "educational",
  name: "Educational contexts",
  description: "Users learning about topics where your brand provides value."
}, {
  id: "alternatives",
  name: "Brand-alternative searches",
  description: "Users explicitly searching for alternatives to competitors."
}, {
  id: "problem",
  name: "Problem-based queries",
  description: "Users describing problems your product or service solves."
}, {
  id: "location",
  name: "Location-based queries",
  description: "Users searching for solutions in specific geographic areas."
}];
export const Onboarding = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<OnboardingState>({
    currentStep: -1,
    completedSteps: [],
    scanStatus: 'idle',
    brandBasics: {
      name: "",
      url: "",
      industry: "",
      description: ""
    },
    audience: {
      segments: [],
      geo: [],
      goals: "",
      personas: []
    },
    goal: null,
    assets: {
      brand: [],
      products: [],
      social: {
        instagram: "",
        twitter: "",
        linkedin: ""
      },
      competitors: []
    },
    tone: {
      summary: "Your brand comes across as modern, confident, slightly bold, and helpful.",
      sliders: {
        formal: 40,
        bold: 60,
        technical: 30,
        playful: 45
      }
    },
    intentSurfaces: Object.fromEntries(INTENT_SURFACES.map(s => [s.id, true]))
  });
  const handleNext = () => {
    if (state.currentStep === 5) {
      navigate("/campaign/new");
      return;
    }
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1,
      completedSteps: [...prev.completedSteps, prev.currentStep].filter((v, i, a) => a.indexOf(v) === i)
    }));
  };
  const handleBack = () => {
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1
    }));
  };

  // URL validation helper
  const isValidUrl = (url: string): boolean => {
    if (!url || url.trim().length === 0) return false;
    const urlPattern = /^https?:\/\/.+\..+/;
    return urlPattern.test(url.trim());
  };

  // Simulate website scanning when valid URL is entered
  useEffect(() => {
    if (state.currentStep === 0) {
      const url = state.brandBasics.url;
      
      if (isValidUrl(url)) {
        // Start scanning
        setState(prev => ({ ...prev, scanStatus: 'scanning' }));
        
        // Simulate scan duration
        const timer = setTimeout(() => {
          setState(prev => ({ ...prev, scanStatus: 'scanned' }));
        }, 2500);
        
        return () => clearTimeout(timer);
      } else {
        // Reset to idle if URL becomes invalid
        setState(prev => ({ ...prev, scanStatus: 'idle' }));
      }
    }
  }, [state.brandBasics.url, state.currentStep]);
  const toggleSegment = (segment: string) => {
    setState(prev => ({
      ...prev,
      audience: {
        ...prev.audience,
        segments: prev.audience.segments.includes(segment) ? prev.audience.segments.filter(s => s !== segment) : [...prev.audience.segments, segment]
      }
    }));
  };
  const getInputSignalData = () => {
    const {
      currentStep,
      scanStatus
    } = state;
    if (currentStep === -1) {
      return {
        activeStages: [],
        updates: [],
        scanStatus: 'idle' as ScanStatus
      };
    }
    const activeStages: string[] = [];
    const updates: string[] = [];

    if (currentStep === 0) {
      activeStages.push("input");
    }
    if (currentStep >= 1) {
      activeStages.push("alignment");
      if (state.audience.segments.length > 0) updates.push("Primary segments detected ✓");
      if (state.audience.geo.length > 0) updates.push("Geo targets set ✓");
      if (state.audience.goals) updates.push("Key customer goals identified ✓");
    }
    if (currentStep >= 2 && state.goal) {
      updates.push("Optimization objective selected ✓");
      updates.push("We'll evaluate every LLM conversation using this goal as the definition of success.");
    }
    if (currentStep >= 3) {
      if (state.assets.brand.length > 0) updates.push("Brand assets uploaded ✓");
      if (state.assets.products.length > 0) updates.push("Product data ingesting ✓");
      if (state.assets.social.instagram || state.assets.social.twitter || state.assets.social.linkedin) {
        updates.push("Social signals connected ✓");
      }
      activeStages.push("generation");
    }
    if (currentStep >= 4) {
      updates.push("Tone vectors calibrated ✓");
      updates.push("We've mapped your tone, personality, and style into a Brand Brain.");
    }
    if (currentStep >= 5) {
      updates.push("Intent surfaces identified ✓");
      updates.push("Your Brand Brain is calibrated and ready.");
      activeStages.push("preview");
    }
    return {
      activeStages,
      updates,
      scanStatus: currentStep === 0 ? scanStatus : 'idle' as ScanStatus
    };
  };
  const {
    activeStages,
    updates,
    scanStatus
  } = getInputSignalData();

  // Intro Screen
  if (state.currentStep === -1) {
    return <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl flex gap-12">
          <div className="flex-1 max-w-[480px] space-y-8">
            <div className="space-y-4">
              
              <h1 className="text-4xl font-semibold text-foreground">
                Let's calibrate Gravity to your brand.
              </h1>
              <p className="text-lg text-muted-foreground">
                You'll answer a few high-leverage questions. Everything else becomes automated.
              </p>
            </div>

            <ul className="space-y-3 pt-8">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 mt-2" />
                <p className="text-sm text-muted-foreground">We'll analyze your site, products, and messaging.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 mt-2" />
                <p className="text-sm text-muted-foreground">We'll understand your audience and goals.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 mt-2" />
                <p className="text-sm text-muted-foreground">We'll identify where you should appear inside AI conversations.</p>
              </li>
            </ul>

            <Button onClick={handleNext} size="lg" className="cosmic-glow cosmic-glow-hover">
              Start Session
            </Button>
          </div>

          <InputSignalPanel currentStep={state.currentStep} updates={updates} activeStages={activeStages} title="System Status" subtext="Gravity is preparing to learn your brand." showDescription={true} scanStatus={scanStatus} />
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-7xl mx-auto flex gap-8">
        <OnboardingStepper currentStep={state.currentStep} completedSteps={state.completedSteps} />

        <div className="flex-1 max-w-3xl space-y-8">
          {/* Step 0: Brand Basics */}
          {state.currentStep === 0 && <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">Tell us who you are.</h1>
                <p className="text-muted-foreground">
                  Gravity will use this to scan your presence and build a first version of your Brand Brain.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Brand Name</label>
                  <Input value={state.brandBasics.name} onChange={e => setState(prev => ({
                ...prev,
                brandBasics: {
                  ...prev.brandBasics,
                  name: e.target.value
                }
              }))} placeholder="Your brand name" className="bg-background/50 border-border/40" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Website URL</label>
                  <Input type="url" value={state.brandBasics.url} onChange={e => setState(prev => ({
                ...prev,
                brandBasics: {
                  ...prev.brandBasics,
                  url: e.target.value
                }
              }))} placeholder="https://yourbrand.com" className="bg-background/50 border-border/40" />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    We'll scan this URL to understand your products, tone, and positioning.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Industry</label>
                  <Select value={state.brandBasics.industry} onValueChange={value => setState(prev => ({
                ...prev,
                brandBasics: {
                  ...prev.brandBasics,
                  industry: value
                }
              }))}>
                    <SelectTrigger className="bg-background/50 border-border/40">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map(industry => <SelectItem key={industry} value={industry}>{industry}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Short Brand Description</label>
                  <Textarea value={state.brandBasics.description} onChange={e => setState(prev => ({
                ...prev,
                brandBasics: {
                  ...prev.brandBasics,
                  description: e.target.value
                }
              }))} placeholder="In one or two sentences, how do you describe your brand?" className="bg-background/50 border-border/40 min-h-[100px]" />
                  <Button variant="outline" size="sm">
                    Generate from my website
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground pt-3">
                  Gravity will use this information, plus what we scan from your site, to generate contextual ad suggestions across LLMs.
                </p>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} disabled={!state.brandBasics.name.trim() || !isValidUrl(state.brandBasics.url) || !state.brandBasics.industry} className="cosmic-glow-hover">
                  Next → Audience
                </Button>
              </div>
            </div>}

          {/* Step 1: Audience */}
          {state.currentStep === 1 && <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">Who are you selling to?</h1>
                <p className="text-muted-foreground">
                  This helps Gravity identify the conversations and contexts where your brand should appear.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Who do you sell to?</h3>
                  <div className="space-y-2">
                    {AUDIENCE_SEGMENTS.map(segment => <button key={segment.id} onClick={() => toggleSegment(segment.id)} className={`w-full px-4 py-2 text-sm rounded-lg border transition-all duration-200 ${state.audience.segments.includes(segment.id) ? "border-primary bg-primary/10 text-foreground" : "border-border/40 bg-background/50 text-muted-foreground hover:border-border"}`}>
                        {segment.label}
                      </button>)}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Where are they?</h3>
                  <Input placeholder="Countries, regions..." className="bg-background/50 border-border/40" onChange={e => setState(prev => ({
                ...prev,
                audience: {
                  ...prev.audience,
                  geo: [e.target.value]
                }
              }))} />
                  <p className="text-xs text-muted-foreground">Based on your site, we detected US & Canada</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">What do they want from you?</h3>
                  <Textarea value={state.audience.goals} onChange={e => setState(prev => ({
                ...prev,
                audience: {
                  ...prev.audience,
                  goals: e.target.value
                }
              }))} placeholder="e.g., pain relief, more sales, better posture, lower churn" className="bg-background/50 border-border/40" />
                  <Button variant="outline" size="sm">Suggest based on my site</Button>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} disabled={state.audience.segments.length === 0} className="cosmic-glow-hover">
                  Next → Goals
                </Button>
              </div>
            </div>}

          {/* Step 2: Goals */}
          {state.currentStep === 2 && <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">What are you optimizing for first?</h1>
                <p className="text-muted-foreground">
                  Gravity will route spend and optimize messaging toward a single primary goal. You can add more later.
                </p>
              </div>

              <div className="space-y-4">
                <GoalCard id="conversions" title="Conversions" subtitle="Sales, signups, booked calls." description="Optimize for actions like purchases, demo bookings, or signups. Gravity will prioritize LLM conversations most likely to convert." icon={Target} isSelected={state.goal === "conversions"} isRecommended={state.brandBasics.industry === "E-commerce"} onClick={() => setState(prev => ({
              ...prev,
              goal: "conversions"
            }))} />

                <GoalCard id="clicks" title="Clicks / Traffic" subtitle="Quality visits to your site." description="Drive high-intent visitors to your landing pages or store. Gravity will focus on answer placements with the highest click-through." icon={MousePointer} isSelected={state.goal === "clicks"} onClick={() => setState(prev => ({
              ...prev,
              goal: "clicks"
            }))} />

                <GoalCard id="awareness" title="Reach / Awareness" subtitle="Visibility across relevant conversations." description="Maximize share of presence across relevant LLM conversations. Ideal for new launches or top-of-funnel campaigns." icon={Megaphone} isSelected={state.goal === "awareness"} onClick={() => setState(prev => ({
              ...prev,
              goal: "awareness"
            }))} />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} disabled={!state.goal} className="cosmic-glow-hover">
                  Use this goal → Assets
                </Button>
              </div>
            </div>}

          {/* Step 3: Assets */}
          {state.currentStep === 3 && <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">Connect your brand assets and signals.</h1>
                <p className="text-muted-foreground">
                  These inputs help Gravity generate sponsored suggestions that are accurate, up-to-date, and on-brand.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Brand Assets</h3>
                  <FileUploadZone label="Upload Logo & Brand Guidelines" accept=".png,.jpg,.pdf" multiple onFilesSelected={files => setState(prev => ({
                ...prev,
                assets: {
                  ...prev.assets,
                  brand: files.map(f => f.name)
                }
              }))} uploadedFiles={state.assets.brand} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Product / Service Catalog</h3>
                  <FileUploadZone label="Upload Product CSV or Feed" accept=".csv,.xml" onFilesSelected={files => setState(prev => ({
                ...prev,
                assets: {
                  ...prev.assets,
                  products: files.map(f => f.name)
                }
              }))} uploadedFiles={state.assets.products} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Social & External Signals</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="Instagram URL" className="bg-background/50 border-border/40" value={state.assets.social.instagram} onChange={e => setState(prev => ({
                  ...prev,
                  assets: {
                    ...prev.assets,
                    social: {
                      ...prev.assets.social,
                      instagram: e.target.value
                    }
                  }
                }))} />
                    <Input placeholder="X (Twitter) URL" className="bg-background/50 border-border/40" value={state.assets.social.twitter} onChange={e => setState(prev => ({
                  ...prev,
                  assets: {
                    ...prev.assets,
                    social: {
                      ...prev.assets.social,
                      twitter: e.target.value
                    }
                  }
                }))} />
                    <Input placeholder="LinkedIn URL" className="bg-background/50 border-border/40" value={state.assets.social.linkedin} onChange={e => setState(prev => ({
                  ...prev,
                  assets: {
                    ...prev.assets,
                    social: {
                      ...prev.assets.social,
                      linkedin: e.target.value
                    }
                  }
                }))} />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="cosmic-glow-hover">
                  Next → Tone & Voice
                </Button>
              </div>
            </div>}

          {/* Step 4: Tone & Voice */}
          {state.currentStep === 4 && <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">We've analyzed your brand's tone. Adjust if needed.</h1>
                <p className="text-muted-foreground">
                  Gravity scanned your website and product content to understand how your brand naturally speaks. This helps us generate sponsored suggestions that feel aligned and trustworthy inside LLM conversations. No work needed — everything is pre-calibrated. You can tweak if you'd like.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Brand tone summary</h3>
                    <p className="text-sm text-muted-foreground">{state.tone.summary}</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-medium text-foreground">Fine-tune (optional)</p>
                    <ToneSlider label="Formality" leftLabel="Formal" rightLabel="Casual" value={state.tone.sliders.formal} onChange={val => setState(prev => ({
                  ...prev,
                  tone: {
                    ...prev.tone,
                    sliders: {
                      ...prev.tone.sliders,
                      formal: val
                    }
                  }
                }))} />
                    <ToneSlider label="Assertiveness" leftLabel="Bold" rightLabel="Neutral" value={state.tone.sliders.bold} onChange={val => setState(prev => ({
                  ...prev,
                  tone: {
                    ...prev.tone,
                    sliders: {
                      ...prev.tone.sliders,
                      bold: val
                    }
                  }
                }))} />
                    <ToneSlider label="Complexity" leftLabel="Technical" rightLabel="Simple" value={state.tone.sliders.technical} onChange={val => setState(prev => ({
                  ...prev,
                  tone: {
                    ...prev.tone,
                    sliders: {
                      ...prev.tone.sliders,
                      technical: val
                    }
                  }
                }))} />
                    <ToneSlider label="Personality" leftLabel="Playful" rightLabel="Serious" value={state.tone.sliders.playful} onChange={val => setState(prev => ({
                  ...prev,
                  tone: {
                    ...prev.tone,
                    sliders: {
                      ...prev.tone.sliders,
                      playful: val
                    }
                  }
                }))} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Preview: How Gravity will speak on your behalf</h3>
                  <div className="p-6 rounded-lg border border-primary/20 bg-primary/5">
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      "If you're exploring options, {state.brandBasics.name || "Acme Pro"} offers a cleaner, faster way to manage your workflow—trusted by thousands and optimized for real results."
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This preview updates instantly as you adjust your tone.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="cosmic-glow-hover">
                  Next → Intent Surfaces
                </Button>
              </div>
            </div>}

          {/* Step 5: Intent Surfaces */}
          {state.currentStep === 5 && <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">
                  We've identified your top Intent Surfaces inside LLM conversations.
                </h1>
                <p className="text-muted-foreground">
                  These are the conversation moments where your brand naturally fits and tends to perform best.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">What are Intent Surfaces?</strong> Intent Surfaces are conversion-rich moments inside LLM answers. These are the places where your brand's presence feels natural, helpful, and high-performing. Gravity identifies them automatically based on your brand and category.
                </p>
              </div>

              <div className="space-y-3">
                {INTENT_SURFACES.map(surface => <IntentSurfaceToggle key={surface.id} id={surface.id} name={surface.name} description={surface.description} enabled={state.intentSurfaces[surface.id]} onToggle={(id, enabled) => setState(prev => ({
              ...prev,
              intentSurfaces: {
                ...prev.intentSurfaces,
                [id]: enabled
              }
            }))} />)}
              </div>

              <p className="text-xs text-muted-foreground">
                These surfaces were selected based on patterns we've seen across thousands of LLM conversations in your category.
              </p>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="cosmic-glow cosmic-glow-hover">
                  Continue → Sandbox Preview
                </Button>
              </div>
            </div>}
        </div>

        <InputSignalPanel currentStep={state.currentStep} updates={updates} activeStages={activeStages} scanStatus={scanStatus} />
      </div>
    </div>;
};