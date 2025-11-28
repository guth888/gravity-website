import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MeshAnimation } from "@/components/MeshAnimation";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Join = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleGoogleAuth = () => {
    // Mock OAuth - just navigate to onboarding
    navigate("/onboarding");
  };
  const handleMicrosoftAuth = () => {
    // Mock OAuth - just navigate to onboarding
    navigate("/onboarding");
  };
  const handleMagicLink = () => {
    if (email) {
      // Mock magic link - just navigate to onboarding
      navigate("/onboarding");
    }
  };
  return <div className="relative min-h-screen bg-background overflow-hidden">
      <CursorSpotlight />
      
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-[95%] sm:max-w-md space-y-5 sm:space-y-6">
          {/* Logo - Responsive sizing */}
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="flex flex-col items-center justify-center gap-0.5 mb-2 sm:mb-3">
              <span className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground" style={{
                letterSpacing: "0.06em",
                textShadow: "0 2px 30px rgba(0, 0, 0, 0.4)"
              }}>
                GRAVITY
              </span>
              <span className="font-studio italic text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-medium" style={{
                color: "#F1ECE9",
                letterSpacing: "0.06em",
                transform: "rotate(-1deg)",
                textShadow: "0 2px 15px rgba(0, 0, 0, 0.3)"
              }}>
                Studio
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground/80 tracking-wide" style={{ letterSpacing: "0.02em" }}>
              Enter the agentic advertising era
            </p>
          </div>

          {/* Auth Options - Larger tap targets on mobile */}
          <div className="space-y-3 sm:space-y-3.5">
            <Button onClick={handleGoogleAuth} className="w-full h-12 sm:h-12 text-sm sm:text-base cosmic-glow cosmic-glow-hover" size="lg">
              Continue with Google
            </Button>

            <Button onClick={handleMicrosoftAuth} className="w-full h-12 sm:h-12 text-sm sm:text-base cosmic-glow cosmic-glow-hover" size="lg">
              Continue with Microsoft
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gravity-grey/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or use magic link
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="h-12 bg-gravity-void/50 border-gravity-grey/30 focus:border-gravity-orange/50" onKeyDown={e => e.key === "Enter" && handleMagicLink()} />
              <Button onClick={handleMagicLink} disabled={!email} className="h-12 px-6 cosmic-glow-hover" variant="outline">
                Send
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to Gravity's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>;
};