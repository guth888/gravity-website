import { useState } from "react";
import { CreativeStudio } from "@/components/campaign/CreativeStudio";
import { SandboxPreview } from "@/components/campaign/SandboxPreview";
import { TargetingBudget } from "@/components/campaign/TargetingBudget";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PHASES = ["Creative Studio", "Sandbox Preview", "Targeting & Budget"];

export const CampaignNew = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gravity-grey/10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div className="h-6 w-px bg-gravity-grey/20" />
            <span className="text-lg font-semibold">New Campaign</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto">
            {PHASES.map((phase, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <div
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                    i === currentPhase
                      ? "bg-gravity-orange/20 text-gravity-orange border border-gravity-orange/30"
                      : i < currentPhase
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {i + 1}. {phase}
                </div>
                {i < PHASES.length - 1 && (
                  <div className="w-8 h-px bg-gravity-grey/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Phase Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {currentPhase === 0 && (
          <CreativeStudio onNext={() => setCurrentPhase(1)} />
        )}
        {currentPhase === 1 && (
          <SandboxPreview
            onBack={() => setCurrentPhase(0)}
            onNext={() => setCurrentPhase(2)}
          />
        )}
        {currentPhase === 2 && (
          <TargetingBudget onBack={() => setCurrentPhase(1)} />
        )}
      </div>
    </div>
  );
};
