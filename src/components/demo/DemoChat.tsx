// src/components/demo/DemoChat.tsx
"use client";

import React, { useEffect, useState } from "react";

type Bubble = {
  id: string;
  role: "user" | "assistant";
  type: "text" | "assistant_with_sponsor";
};

const SCRIPT: Bubble[] = [
  {
    id: "u-1",
    role: "user",
    type: "text",
  },
  {
    id: "a-1",
    role: "assistant",
    type: "text",
  },
  {
    id: "a-2",
    role: "assistant",
    type: "assistant_with_sponsor",
  },
];

export const DemoChat: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;
    if (visibleCount < SCRIPT.length) {
      setIsTyping(true);
      timeout = window.setTimeout(() => {
        setVisibleCount((c) => c + 1);
        setIsTyping(false);
      }, visibleCount === 0 ? 600 : 900);
    }
    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [visibleCount]);

  const visibleBubbles = SCRIPT.slice(0, visibleCount);

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950/95 to-slate-900/80 shadow-[0_0_40px_rgba(15,23,42,0.85)]">
      <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.9)]" />
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Gravity Demo · In-Answer Sponsorship
          </span>
        </div>
        <span className="text-[10px] rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-1 text-slate-500">
          Fake conversation · Real pattern
        </span>
      </div>

      <div className="space-y-3 px-4 py-4 sm:px-5 sm:py-5 text-sm">
        {visibleBubbles.map((bubble) => {
          if (bubble.id === "u-1") {
            return (
              <ChatBubble
                key={bubble.id}
                role="user"
              >
                Best email marketing tool for my agency?{" "}
                We're running cold email for ~12 SaaS clients and need something
                reliable that doesn't suck to manage.
              </ChatBubble>
            );
          }

          if (bubble.id === "a-1") {
            return (
              <ChatBubble
                key={bubble.id}
                role="assistant"
              >
                For an agency setup like that, you usually care about:
                {"\n\n"}
                • Deliverability controls you can actually see, not just "trust us."{"\n"}
                • Per-seat visibility across all your clients.{"\n"}
                • Workflows that don't collapse once you pass 5–10 accounts.{"\n\n"}
                You'll see a sponsored suggestion inline below — that's Gravity at work, not a banner ad bolted on the side.
              </ChatBubble>
            );
          }

          if (bubble.id === "a-2") {
            return (
              <AssistantWithSponsor key={bubble.id} />
            );
          }

          return null;
        })}

        {isTyping && visibleCount < SCRIPT.length && (
          <div className="mt-2">
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  );
};

const ChatBubble: React.FC<{
  role: "user" | "assistant";
  children: React.ReactNode;
}> = ({ role, children }) => {
  const isUser = role === "user";
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={[
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-xs sm:text-sm",
          isUser
            ? "bg-emerald-500 text-emerald-950 shadow-[0_0_20px_rgba(16,185,129,0.65)]"
            : "bg-slate-900/85 text-slate-50 border border-slate-700/80",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
};

const AssistantWithSponsor: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl border border-slate-700/80 bg-slate-900/90 px-3 py-3 text-xs sm:text-sm text-slate-50 space-y-3">
        <div>
          If you want something built for agencies specifically, I'd narrow it
          down to a couple of options that handle scale, client separation, and
          warm-up properly.
        </div>

        {/* Sponsored suggestion inline */}
        <div className="rounded-xl border border-emerald-500/60 bg-emerald-500/10 p-3 shadow-[0_0_25px_rgba(52,211,153,0.55)]">
          <div className="mb-1 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/70 bg-slate-950/80 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                MP
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-emerald-100">
                  MailerPilot
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
                  Sponsored · Gravity Placement
                </span>
              </div>
            </div>
            <span className="rounded-full border border-emerald-400/60 bg-emerald-500/20 px-2 py-[2px] text-[10px] font-medium text-emerald-100">
              Recommended for agencies
            </span>
          </div>
          <div className="text-[11px] text-emerald-50/90">
            Built for multi-account cold email at agency scale — per-client
            workspaces, deliverability tooling, and reporting that doesn't fall
            apart once you cross 5+ SaaS accounts.
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-200/90">
            <span className="line-clamp-1">
              Shown here because you asked about scaling campaigns across
              multiple SaaS clients.
            </span>
            <span className="inline-flex items-center gap-1 cursor-pointer hover:underline">
              <span className="underline underline-offset-2">
                Open MailerPilot
              </span>
              <span aria-hidden>↗</span>
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-300">
          Gravity treats this moment as a high-intent decision: you're choosing
          tooling, not just browsing.{" "}
          <span className="text-slate-400">
            The sponsored suggestion appears inside the answer, matched to your
            query — not as a random sidebar ad.
          </span>
        </div>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-[11px] text-slate-300">
        <span className="relative flex h-2 w-6 items-center justify-between">
          <span className="h-1 w-1 rounded-full bg-slate-400 animate-pulse" />
          <span className="h-1 w-1 rounded-full bg-slate-500 animate-pulse delay-75" />
          <span className="h-1 w-1 rounded-full bg-slate-400 animate-pulse delay-150" />
        </span>
        <span>Thinking like a media engine…</span>
      </div>
    </div>
  );
};

export default DemoChat;

