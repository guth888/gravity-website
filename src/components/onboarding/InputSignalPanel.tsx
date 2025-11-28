import { Brain, Sparkles, Eye, Rocket, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { MeshIcon } from "./MeshIcon";

const PIPELINE_STAGES = [
  { id: "input", label: "Input Signal", icon: Brain },
  { id: "alignment", label: "Model Alignment", icon: Brain },
  { id: "generation", label: "Native Generation", icon: Sparkles },
  { id: "preview", label: "Sandbox Previews", icon: Eye },
  { id: "launch", label: "Multi-Model Launch", icon: Rocket },
  { id: "telemetry", label: "Telemetry & Optimization", icon: LineChart }
];

type ScanStatus = 'idle' | 'scanning' | 'scanned';

interface InputSignalPanelProps {
  currentStep: number;
  updates: string[];
  activeStages: string[];
  title?: string;
  subtext?: string;
  showDescription?: boolean;
  scanStatus?: ScanStatus;
}

export const InputSignalPanel = ({ 
  currentStep, 
  updates, 
  activeStages, 
  title = "Input Signal",
  subtext = "System status & learning progress",
  showDescription = false,
  scanStatus = 'idle'
}: InputSignalPanelProps) => {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="sticky top-8 space-y-6 p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 transition-all duration-500 hover:border-primary/30"
        style={{
          boxShadow: "0 0 50px rgba(255, 77, 0, 0.12), inset 0 0 70px rgba(255, 77, 0, 0.04)"
        }}
      >
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
              <MeshIcon size={20} className="opacity-90" />
              {title}
            </h3>
            <p className="text-xs text-foreground/70">
              {subtext}
            </p>
          </div>
          
          {showDescription && (
            <p className="text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-700 delay-300">
              Gravity will continuously scan your brand's public presence – website, product pages, social content, competition, industry signals – to build a living model of what you sell, who you serve, and what success looks like.
            </p>
          )}

          {/* Three-state body text for Brand Basics step */}
          {currentStep === 0 && (
            <div className="pt-5 animate-in fade-in duration-500">
              {scanStatus === 'idle' && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once you add your website, Gravity will scan your public presence to understand your products, tone, and positioning. We use this as the primary input signal for your Brand Brain.
                </p>
              )}
              
              {scanStatus === 'scanning' && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary animate-pulse" />
                    Scanning your website...
                  </p>
                </div>
              )}
              
              {scanStatus === 'scanned' && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    Website scanned ✓
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We're extracting your tone, personality, writing style, level of formality, industry norms, and key competitors so we can build an accurate first version of your Brand Brain.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pipeline Stages */}
        <div className="space-y-2 pt-2">
          {PIPELINE_STAGES.map((stage) => {
            const isActive = activeStages.includes(stage.id);
            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg transition-all duration-300",
                  isActive && "bg-primary/10 border border-primary/30"
                )}
                style={isActive ? {
                  boxShadow: "0 0 20px rgba(255, 77, 0, 0.15)"
                } : {}}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                    isActive ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground/40"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground/50"
                  )}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Updates */}
        {updates.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border/50">
            {updates.map((update, index) => (
              <div
                key={index}
                className="flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{update}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
