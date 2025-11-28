import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Lock, Unlock, Sparkles } from "lucide-react";

const TONES = ["Conversational", "Expert", "Minimalist"];

const MOCK_CREATIVES = [
  {
    tone: "Conversational",
    variants: [
      "Looking to scale your cloud infrastructure? We've helped teams just like yours reduce costs by 40% while improving performance.",
      "Hey! If you're dealing with cloud scaling challenges, you might find our approach interesting - we focus on cost optimization without compromising speed.",
      "Scaling cloud infrastructure can be tricky. Our platform helps engineering teams optimize costs and performance simultaneously.",
    ],
  },
  {
    tone: "Expert",
    variants: [
      "Enterprise-grade cloud infrastructure optimization. Proven 40% cost reduction with zero performance degradation across Fortune 500 deployments.",
      "Advanced cloud architecture optimization leveraging automated resource allocation and intelligent cost management for enterprise-scale deployments.",
      "Technical cloud optimization platform delivering measurable ROI through intelligent resource management and performance-first architecture.",
    ],
  },
  {
    tone: "Minimalist",
    variants: [
      "Cloud optimization. 40% cost reduction. Zero performance loss.",
      "Better cloud infrastructure. Lower costs. Same performance.",
      "Optimize cloud spend without sacrificing speed.",
    ],
  },
];

interface CreativeStudioProps {
  onNext: () => void;
}

export const CreativeStudio = ({ onNext }: CreativeStudioProps) => {
  const [selectedTone, setSelectedTone] = useState(0);
  const [helpfulness, setHelpfulness] = useState([70]);
  const [lockedCreatives, setLockedCreatives] = useState<Set<number>>(new Set([0]));

  const toggleLock = (index: number) => {
    const newLocked = new Set(lockedCreatives);
    if (newLocked.has(index)) {
      newLocked.delete(index);
    } else {
      newLocked.add(index);
    }
    setLockedCreatives(newLocked);
  };

  const getHelpfulnessColor = (score: number) => {
    if (score >= 90) return "border-gravity-purple text-gravity-purple";
    if (score >= 75) return "border-gravity-teal text-gravity-teal";
    return "border-gravity-orange text-gravity-orange";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Creative Studio</h2>
          <p className="text-muted-foreground">
            AI-generated variants optimized for helpfulness
          </p>
        </div>
        <Button onClick={onNext} className="cosmic-glow cosmic-glow-hover">
          Continue to Preview <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Tone Selector */}
      <div className="flex gap-3">
        {TONES.map((tone, i) => (
          <Button
            key={i}
            variant={selectedTone === i ? "default" : "outline"}
            onClick={() => setSelectedTone(i)}
            className={selectedTone === i ? "cosmic-glow" : ""}
          >
            {tone}
          </Button>
        ))}
      </div>

      {/* Helpfulness Slider */}
      <Card className="p-6 bg-gravity-void/30 border-gravity-grey/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Helpfulness Target</label>
            <span className="text-sm text-muted-foreground">{helpfulness[0]}%</span>
          </div>
          <Slider
            value={helpfulness}
            onValueChange={setHelpfulness}
            min={50}
            max={100}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Higher helpfulness = more contextual relevance, better performance
          </p>
        </div>
      </Card>

      {/* Creative Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_CREATIVES[selectedTone].variants.map((creative, i) => {
          const score = 85 + i * 3;
          const isLocked = lockedCreatives.has(i);
          
          return (
            <Card
              key={i}
              className={`p-6 bg-gravity-void/30 transition-all duration-300 cursor-pointer ${
                isLocked
                  ? "border-gravity-orange/50 shadow-lg shadow-gravity-orange/10"
                  : "border-gravity-grey/20 hover:border-gravity-grey/40"
              }`}
              onClick={() => toggleLock(i)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full border-2 ${getHelpfulnessColor(score)} flex items-center justify-center relative`}>
                  <span className="text-sm font-bold">{score}%</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gravity-teal to-gravity-purple opacity-10" />
                </div>
                {isLocked ? (
                  <Lock className="w-5 h-5 text-gravity-orange" />
                ) : (
                  <Unlock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              
              <p className="text-sm leading-relaxed">{creative}</p>
              
              <div className="mt-4 pt-4 border-t border-gravity-grey/10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-2" />
                  Make More Helpful
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-muted-foreground">
          {lockedCreatives.size} creative{lockedCreatives.size !== 1 ? "s" : ""} selected
        </p>
        <Button
          onClick={onNext}
          disabled={lockedCreatives.size === 0}
          className="cosmic-glow cosmic-glow-hover"
        >
          Continue with Selected <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
