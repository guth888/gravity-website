import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

const LLM_SKINS = ["ChatGPT", "Claude", "Perplexity", "Grok"];

interface SandboxPreviewProps {
  onBack: () => void;
  onNext: () => void;
}

export const SandboxPreview = ({ onBack, onNext }: SandboxPreviewProps) => {
  const [selectedLLM, setSelectedLLM] = useState(0);
  const [stealthMode, setStealthMode] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string; isAd?: boolean }>>([
    {
      role: "assistant",
      content: "Hello! I'm here to help. What would you like to know?",
    },
  ]);

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: prompt },
      {
        role: "assistant",
        content: "Based on your question about cloud infrastructure, here are some key considerations...",
      },
      {
        role: "assistant",
        content: "Looking to scale your cloud infrastructure? We've helped teams just like yours reduce costs by 40% while improving performance.",
        isAd: true,
      },
    ];

    setMessages(newMessages);
    setPrompt("");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Sandbox Preview</h2>
          <p className="text-muted-foreground">
            See how your ads appear in real LLM conversations
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={onNext} className="cosmic-glow cosmic-glow-hover">
            Continue to Launch <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* LLM Selector & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {LLM_SKINS.map((llm, i) => (
            <Button
              key={i}
              variant={selectedLLM === i ? "default" : "outline"}
              onClick={() => setSelectedLLM(i)}
              className={selectedLLM === i ? "cosmic-glow" : ""}
            >
              {llm}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Stealth Mode</label>
          <Switch checked={stealthMode} onCheckedChange={setStealthMode} />
        </div>
      </div>

      {/* Preview Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Prompt Entry */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4 bg-gravity-void/30 border-gravity-grey/20">
            <h3 className="text-sm font-semibold mb-3">Test Prompt</h3>
            <div className="space-y-3">
              <Input
                placeholder="Ask about cloud infrastructure..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
                className="bg-background/50"
              />
              <Button
                onClick={handleSendPrompt}
                className="w-full cosmic-glow-hover"
                disabled={!prompt.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Test Query
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-gravity-void/30 border-gravity-grey/20">
            <h3 className="text-sm font-semibold mb-3">Sample Queries</h3>
            <div className="space-y-2">
              {[
                "How do I reduce cloud costs?",
                "Best practices for Kubernetes scaling",
                "Cloud infrastructure optimization tips",
              ].map((query, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => setPrompt(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: LLM Preview */}
        <div className="lg:col-span-3">
          <Card className="p-6 bg-gravity-void/30 border-gravity-grey/20 h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-lg max-w-[80%] ${
                      message.role === "user"
                        ? "bg-gravity-orange/20 text-foreground"
                        : message.isAd
                        ? "bg-gravity-purple/20 border border-gravity-purple/40 relative shadow-lg shadow-gravity-purple/20"
                        : "bg-background/50 text-foreground"
                    }`}
                  >
                    {message.isAd && !stealthMode && (
                      <div className="text-xs text-gravity-purple mb-2 font-semibold">
                        SPONSORED
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    {message.isAd && (
                      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-gravity-purple/20 to-gravity-teal/20 -z-10 blur-sm animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gravity-grey/10">
              <Input
                placeholder={`Message ${LLM_SKINS[selectedLLM]}...`}
                className="bg-background/50"
                disabled
              />
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} className="cosmic-glow cosmic-glow-hover">
          Looks Perfect - Set Budget <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
