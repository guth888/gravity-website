// src/components/GravityLiveDemo.tsx
import React from "react";
import { DemoChat } from "@/components/demo/DemoChat";
import { VisitorInsightPanel } from "@/components/VisitorInsightPanel";

export const GravityLiveDemo: React.FC = () => {
  return (
    <section 
      id="live-demo"
      className="relative bg-[#0a0a0a] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} 
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span className="h-[6px] w-[6px] rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            LIVE DEMO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-50">
            Feel Gravity in action.
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-slate-400">
            Talk to the demo assistant and see how sponsored suggestions could be
            injected into your own LLM conversations, without breaking trust.
            This is exactly what your users would experience.
          </p>
        </div>

        {/* Demo Chat */}
        <DemoChat />

        {/* Visitor Insight Panel */}
        <VisitorInsightPanel />

        {/* CTA */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-[0_0_20px_rgba(52,211,153,0.5)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.7)]"
          >
            Ready to add this to your app?
            <span aria-hidden>→</span>
          </a>
          <span className="text-xs text-slate-500">
            Book a demo and see how Gravity fits into your stack.
          </span>
        </div>
      </div>
    </section>
  );
};

export default GravityLiveDemo;

