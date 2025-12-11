import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Sparkles, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AmbientStars } from "@/components/AmbientStars";
import { MeshAnimation } from "@/components/MeshAnimation";
import clsx from "clsx";
type AudienceMode = "publisher" | "advertiser";
export const Demo = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const initialMode: AudienceMode = typeParam === 'publisher' ? 'publisher' : 'advertiser';
  const [mode, setMode] = useState<AudienceMode>(initialMode);
  
  // Update mode if URL param changes
  useEffect(() => {
    if (typeParam === 'publisher') {
      setMode('publisher');
    } else if (typeParam === 'advertiser') {
      setMode('advertiser');
    }
  }, [typeParam]);
  const [formData, setFormData] = useState({
    email: "",
    field1: "",
    volume: "",
    notes: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      mode,
      ...formData
    });
    // Handle form submission
  };
  return <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ease-out ${mode === "publisher" ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Background effects - very subtle */}
      <div className={`fixed inset-0 transition-opacity duration-500 ease-out ${mode === "publisher" ? "opacity-[0.06]" : "opacity-[0.02]"}`}>
        <AmbientStars />
      </div>
      <div className={`fixed inset-0 transition-opacity duration-500 ease-out ${mode === "publisher" ? "opacity-[0.05]" : "opacity-[0.02]"}`}>
        <MeshAnimation />
      </div>

      {/* Back button */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 pt-8">
        <Link to="/" className={`inline-flex items-center gap-2 text-sm transition-all duration-500 ease-out ${mode === "publisher" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}>
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Main content - Device-aware spacing */}
      <div className="relative z-10 w-full max-w-[95%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Form container */}
        <div className="w-full max-w-full sm:max-w-[550px] md:max-w-[650px] lg:max-w-[700px] mx-auto">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Section heading - Mobile: shorter, direct */}
            <div className="space-y-2 text-center">
              {/* Mobile heading (320-639px) */}
              <h2 className={`sm:hidden text-xl font-headline font-semibold transition-colors duration-500 ease-out ${mode === "publisher" ? "text-white" : "text-black"}`}>
                {mode === "publisher" ? "Monetize AI conversations" : "High-intent AI inventory"}
              </h2>
              {/* Tablet+ heading */}
              <h2 className={`hidden sm:block text-2xl md:text-3xl font-headline font-semibold transition-colors duration-500 ease-out ${mode === "publisher" ? "text-white" : "text-black"}`}>
                {mode === "publisher" ? "Monetize your AI conversations, intelligently." : "Access the highest-intent inventory in AI."}
              </h2>
              {/* Description - shortened on mobile */}
              <p className={`text-xs sm:text-sm leading-relaxed max-w-[600px] mx-auto transition-colors duration-500 ease-out ${mode === "publisher" ? "text-[#D4D4D8]" : "text-neutral-600"}`}>
                {mode === "publisher" 
                  ? <><span className="sm:hidden">Get revenue estimates and integration details.</span><span className="hidden sm:inline">Tell Gravity where your conversations run. We'll map your surfaces, estimate revenue impact, and show your integration path.</span></> 
                  : <><span className="sm:hidden">See placement options and performance projections.</span><span className="hidden sm:inline">Tell us what you want to promote. We'll show available surfaces, expected lift, and audience reach.</span></>}
              </p>
            </div>

            {/* Audience toggle - Full width on mobile for easy tapping */}
            <div className={`flex text-[10px] sm:text-xs font-medium rounded-full p-1 w-full sm:max-w-[500px] mx-auto transition-all duration-500 ease-out ${mode === "publisher" ? "bg-white/5" : "bg-black/5"}`}>
              <button 
                onClick={() => setMode("publisher")} 
                className={clsx(
                  "rounded-full transition-all duration-500 ease-out",
                  mode === "publisher" 
                    ? "metallic-button flex-[1.4] scale-105" 
                    : mode === "advertiser"
                    ? "flex-1 scale-95 text-neutral-500 hover:text-black"
                    : "flex-1 scale-95 text-neutral-400 hover:text-white"
                )}
              >
                <span>LLM publishers</span>
              </button>
              <button 
                onClick={() => setMode("advertiser")} 
                className={clsx(
                  "rounded-full transition-all duration-500 ease-out",
                  mode === "advertiser" 
                    ? "metallic-button flex-[1.4] scale-105" 
                    : mode === "publisher"
                    ? "flex-1 scale-95 text-neutral-400 hover:text-white"
                    : "flex-1 scale-95 text-neutral-500 hover:text-black"
                )}
              >
                <span>Advertisers & brands</span>
              </button>
            </div>

            {/* Form - Simplified on mobile, full on tablet+ */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className={`text-sm transition-colors duration-500 ease-out ${mode === "publisher" ? "text-[#D4D4D8]" : "text-neutral-700"}`}>
                  Work email
                </Label>
                <Input id="email" type="email" placeholder="you@company.com" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className={`rounded-full h-11 px-4 text-sm placeholder:text-neutral-500 focus:ring-1 transition-all duration-500 ease-out ${mode === "publisher" ? "bg-black/40 border-white/10 text-white focus:border-white/40 focus:ring-white/40" : "bg-white border-black/10 text-black focus:border-black/40 focus:ring-black/40"}`} required />
              </div>

              {/* Dynamic field 1 */}
              <div className="space-y-2">
                <Label htmlFor="field1" className={`text-sm transition-colors duration-500 ease-out ${mode === "publisher" ? "text-[#D4D4D8]" : "text-neutral-700"}`}>
                  {mode === "publisher" ? "Where do you run AI conversations?" : "What do you want to promote?"}
                </Label>
                <Textarea id="field1" placeholder={mode === "publisher" ? "e.g., Customer support chat, LLM app, sales assistant" : "e.g., Product, service, brand campaign"} value={formData.field1} onChange={e => setFormData({
                ...formData,
                field1: e.target.value
              })} className={`rounded-2xl px-4 py-3 text-sm placeholder:text-neutral-500 focus:ring-1 min-h-[80px] resize-none transition-all duration-500 ease-out ${mode === "publisher" ? "bg-black/40 border-white/10 text-white focus:border-white/40 focus:ring-white/40" : "bg-white border-black/10 text-black focus:border-black/40 focus:ring-black/40"}`} required />
              </div>

              {/* Volume/Budget */}
              <div className="space-y-2">
                <Label htmlFor="volume" className={`text-sm transition-colors duration-500 ease-out ${mode === "publisher" ? "text-[#D4D4D8]" : "text-neutral-700"}`}>
                  {mode === "publisher" ? "Monthly chat volume (estimate)" : "Monthly budget range"}
                </Label>
                <select id="volume" value={formData.volume} onChange={e => setFormData({
                ...formData,
                volume: e.target.value
              })} className={`w-full border rounded-full h-11 px-4 text-sm focus:ring-1 focus:outline-none transition-all duration-500 ease-out ${mode === "publisher" ? "bg-black/40 border-white/10 text-white focus:border-white/40 focus:ring-white/40" : "bg-white border-black/10 text-black focus:border-black/40 focus:ring-black/40"}`} required>
                      <option value="" className="bg-black">Select range...</option>
                      {mode === "publisher" ? <>
                          <option value="<10k" className="bg-black">&lt;10k</option>
                          <option value="10-100k" className="bg-black">10–100k</option>
                          <option value="100k-1M" className="bg-black">100k–1M</option>
                          <option value="1M+" className="bg-black">1M+</option>
                        </> : <>
                          <option value="$25-100k" className="bg-black">$25–100k</option>
                          <option value="$100-250k" className="bg-black">$100–250k</option>
                  <option value="$250k+" className="bg-black">$250k+</option>
                    </>}
                </select>
              </div>

              {/* Optional notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className={`text-sm transition-colors duration-500 ease-out ${mode === "publisher" ? "text-[#D4D4D8]" : "text-neutral-700"}`}>
                  Additional context <span className={`transition-colors duration-500 ease-out ${mode === "publisher" ? "text-neutral-500" : "text-neutral-400"}`}>(optional)</span>
                </Label>
                <Textarea id="notes" value={formData.notes} onChange={e => setFormData({
                ...formData,
                notes: e.target.value
              })} className={`rounded-2xl px-4 py-3 text-sm placeholder:text-neutral-500 focus:ring-1 min-h-[80px] resize-none transition-all duration-500 ease-out ${mode === "publisher" ? "bg-black/40 border-white/10 text-white focus:border-white/40 focus:ring-white/40" : "bg-white border-black/10 text-black focus:border-black/40 focus:ring-black/40"}`} />
              </div>

              {/* Submit - Larger tap target on mobile */}
              <div className="space-y-3 pt-2">
                <button type="submit" className="metallic-button w-full min-h-[52px] sm:h-12 text-sm sm:text-base">
                  <span className="sm:hidden">{mode === "publisher" ? "Get Report →" : "Preview Inventory →"}</span>
                  <span className="hidden sm:inline">{mode === "publisher" ? "Get Your Monetization Report →" : "Get Your Inventory Preview →"}</span>
                </button>
                <p className={`text-xs text-center leading-relaxed transition-colors duration-500 ease-out ${mode === "publisher" ? "text-neutral-500" : "text-neutral-400"}`}>
                  <span className="sm:hidden">{mode === "publisher" ? "No commitment required" : "Performance projections included"}</span>
                  <span className="hidden sm:inline">{mode === "publisher" ? "No SDK commitment. We'll outline formats, lift, and integration effort." : "We'll send placements, audiences, and performance projections."}</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};