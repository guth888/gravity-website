import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Edit, TrendingUp, Sparkles } from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gravity-grey/10 px-4 sm:px-6 py-4">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">GRAVITY</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Studio</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gravity-orange to-gravity-purple" />
          </div>
        </div>
      </header>

      {/* Win Streak Banner */}
      <div className="border-b border-gravity-grey/10 px-6 py-6 bg-gradient-to-r from-gravity-void/50 to-transparent">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-gravity-orange" />
            <div>
              <div className="text-2xl font-bold">Win Streak</div>
              <div className="text-sm text-muted-foreground">
                47 consecutive helpful wins · 2.4× organic performance
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard - Device-aware grid: mobile=stack, tablet=2col, desktop=3col */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Left Column - Live Campaigns */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Live Campaigns</h2>
            
            <Card className="p-6 bg-gravity-void/30 border-gravity-grey/20 hover:border-gravity-orange/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Cloud Infrastructure Product Launch</h3>
                  <p className="text-sm text-muted-foreground">Running · 3 days left</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost"><Pause className="w-4 h-4" /></Button>
                  <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Spend</span>
                  <span className="font-semibold">$2,847 / $5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Impressions</span>
                  <span className="font-semibold">127.4K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Helpfulness</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-gravity-purple relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gravity-teal to-gravity-purple opacity-30" />
                    </div>
                    <span className="font-semibold text-gravity-purple">94%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gravity-void/30 border-gravity-grey/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Enterprise Security Solution</h3>
                  <p className="text-sm text-muted-foreground">Running · 12 days left</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost"><Pause className="w-4 h-4" /></Button>
                  <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Spend</span>
                  <span className="font-semibold">$4,120 / $10,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Impressions</span>
                  <span className="font-semibold">89.2K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Helpfulness</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-gravity-teal relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gravity-teal to-gravity-purple opacity-20" />
                    </div>
                    <span className="font-semibold text-gravity-teal">87%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Center Column - AI Coach */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">AI Coach</h2>
            
            <div className="space-y-3">
              <Card className="p-4 bg-gravity-void/30 border-gravity-orange/30">
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gravity-orange animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm mb-3">
                      Expert tone is outperforming Conversational by 287% on Claude. 
                      Shift 40% of budget from ChatGPT to Claude?
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="cosmic-glow-hover">Apply Change</Button>
                      <Button size="sm" variant="ghost">Dismiss</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gravity-void/30 border-gravity-grey/20">
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gravity-teal" />
                  <div className="flex-1">
                    <p className="text-sm mb-3">
                      Raise Grok bid by +40%? You're currently underbidding on high-intent developer queries.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Apply Change</Button>
                      <Button size="sm" variant="ghost">Dismiss</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gravity-void/30 border-gravity-grey/20">
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gravity-purple" />
                  <div className="flex-1">
                    <p className="text-sm mb-3">
                      "Cloud migration" queries up 340% this week. Consider launching a targeted campaign.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Create Campaign</Button>
                      <Button size="sm" variant="ghost">Dismiss</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Intent Heatmap - Full width on mobile, 2col span on tablet */}
          <div className="space-y-3 md:space-y-4 sm:col-span-2 md:col-span-1">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Intent Heatmap</h2>
            
            <Card className="p-4 md:p-6 bg-gravity-void/30 border-gravity-grey/20 h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <div className="flex flex-wrap gap-2 justify-center items-center h-full">
                {[
                  { text: "cloud migration", size: 28, color: "text-gravity-purple" },
                  { text: "kubernetes setup", size: 20, color: "text-gravity-orange" },
                  { text: "database scaling", size: 28, color: "text-gravity-teal" },
                  { text: "API security", size: 20, color: "text-gravity-orange/70" },
                  { text: "DevOps automation", size: 26, color: "text-gravity-purple/80" },
                  { text: "microservices", size: 22, color: "text-gravity-teal/70" },
                  { text: "infrastructure cost", size: 30, color: "text-gravity-orange" },
                  { text: "container orchestration", size: 18, color: "text-muted-foreground" },
                  { text: "CI/CD pipeline", size: 24, color: "text-gravity-purple/70" },
                  { text: "serverless functions", size: 20, color: "text-gravity-teal/80" },
                  { text: "monitoring tools", size: 22, color: "text-gravity-orange/60" },
                  { text: "load balancing", size: 19, color: "text-muted-foreground" },
                  { text: "backup solutions", size: 21, color: "text-gravity-teal/60" },
                  { text: "disaster recovery", size: 25, color: "text-gravity-purple/70" },
                  { text: "cloud architecture", size: 27, color: "text-gravity-orange/80" },
                ].map((item, i) => (
                  <span
                    key={i}
                    className={`${item.color} hover:scale-110 transition-transform cursor-pointer text-xs sm:text-sm md:text-base`}
                    style={{ fontSize: `clamp(${item.size * 0.6}px, ${item.size * 0.8}px, ${item.size}px)` }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gravity-grey/10 bg-background/95 backdrop-blur-md px-4 sm:px-6 py-3 md:py-4">
        <div className="max-w-[1800px] mx-auto flex justify-center">
          <Button
            onClick={() => navigate("/campaign/new")}
            size="lg"
            className="h-14 px-12 text-lg cosmic-glow cosmic-glow-hover"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};
