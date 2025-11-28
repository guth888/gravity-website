import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface NetworkBudget {
  network: string;
  budget: number;
  maxBid: number;
  intentBoost: number;
}

interface TargetingBudgetProps {
  onBack: () => void;
}

export const TargetingBudget = ({ onBack }: TargetingBudgetProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [budgets, setBudgets] = useState<NetworkBudget[]>([
    { network: "ChatGPT", budget: 3000, maxBid: 2.5, intentBoost: 15 },
    { network: "Claude", budget: 2000, maxBid: 2.0, intentBoost: 10 },
    { network: "Grok", budget: 1500, maxBid: 1.8, intentBoost: 8 },
    { network: "Perplexity", budget: 1500, maxBid: 1.5, intentBoost: 12 },
  ]);

  const updateBudget = (index: number, field: keyof NetworkBudget, value: number) => {
    const newBudgets = [...budgets];
    newBudgets[index] = { ...newBudgets[index], [field]: value };
    setBudgets(newBudgets);
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);

  const handleLaunch = () => {
    toast({
      title: "Campaign Launched! 🚀",
      description: `Your campaign is now live across ${budgets.length} LLM networks with a total budget of $${totalBudget.toLocaleString()}.`,
    });
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Targeting & Budget</h2>
          <p className="text-muted-foreground">
            Allocate budget across LLM networks and set bid controls
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Preview
        </Button>
      </div>

      {/* Budget Table */}
      <Card className="p-6 bg-gravity-void/30 border-gravity-grey/20">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gravity-grey/20 text-sm font-semibold text-muted-foreground">
            <div>Network</div>
            <div>Monthly Budget</div>
            <div>Max Bid</div>
            <div>Intent Boost</div>
          </div>

          {budgets.map((item, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 items-center">
              <div className="font-semibold">{item.network}</div>
              
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={item.budget}
                  onChange={(e) => updateBudget(i, "budget", Number(e.target.value))}
                  className="pl-7 bg-background/50"
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  step="0.1"
                  value={item.maxBid}
                  onChange={(e) => updateBudget(i, "maxBid", Number(e.target.value))}
                  className="pl-7 bg-background/50"
                />
              </div>

              <div className="relative">
                <Input
                  type="number"
                  value={item.intentBoost}
                  onChange={(e) => updateBudget(i, "intentBoost", Number(e.target.value))}
                  className="bg-background/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-gravity-grey/20">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Monthly Budget</span>
              <span className="text-gravity-orange">${totalBudget.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Smart Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-gravity-purple/10 to-gravity-teal/10 border-gravity-purple/30">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-6 h-6 text-gravity-purple flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">AI Optimization Recommendations</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• ChatGPT shows highest intent for your category - good budget allocation</li>
              <li>• Consider +25% Claude bid for developer-focused queries</li>
              <li>• Perplexity has 40% lower competition in your vertical</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Launch Controls */}
      <div className="flex items-center justify-between pt-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Campaign Duration</p>
          <p className="font-semibold">30 days (recommended)</p>
        </div>

        <Button
          onClick={handleLaunch}
          size="lg"
          className="h-14 px-12 text-lg cosmic-glow cosmic-glow-hover animate-pulse"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Launch Campaign
        </Button>
      </div>
    </div>
  );
};
