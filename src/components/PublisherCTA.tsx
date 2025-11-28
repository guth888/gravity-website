import { ArrowRight } from "lucide-react";
import { StarParticles } from "./StarParticles";
export const PublisherCTA = () => {
  return <section className="relative py-36 px-6 bg-background overflow-hidden">
      {/* Star Particles */}
      <StarParticles count={8} />
      
      {/* Subtle purple/teal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gravity-purple/[0.02] to-gravity-teal/[0.02] rounded-full blur-[150px]" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Badge with decorative lines */}
        

        {/* Content Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-12 md:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & Description */}
            <div>
              <h2 className="text-5xl md:text-6xl font-semibold bg-gradient-to-r from-gravity-purple via-white to-gravity-teal bg-clip-text text-transparent mb-6 leading-tight">
                Run Your Own LLM?
              </h2>
              
              <p className="text-lg md:text-xl text-[#9EA2B1] leading-relaxed mb-8">
                Integrate Gravity Core and start monetizing your AI platform with native, contextual advertising. 
                Join publishers earning millions from AI-powered conversations.
              </p>

              <button className="group flex items-center gap-3 px-6 py-3 rounded-lg border-2 border-gravity-purple/40 bg-gravity-void/30 text-white font-semibold hover:border-gravity-purple/60 hover:bg-gravity-void/50 transition-all duration-300">
                Explore Publisher Solutions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right: Feature List */}
            <div className="space-y-4">
              {['Easy API integration', 'Real-time bidding engine', 'Revenue share model', 'Full brand safety controls'].map((feature, index) => <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gravity-purple to-gravity-teal flex-shrink-0" />
                  <span className="text-lg text-white font-medium">{feature}</span>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};