"use client";

import Image from "next/image";
import { useState } from "react";

const SUBSCRIPTION_TOOLS = [
  { id: "Cursor", label: "Cursor", logo: "/tools/cursor.svg", emoji: "⚡" },
  { id: "GitHubCopilot", label: "GitHub Copilot", logo: "/tools/githubcopilot.svg", emoji: "🐙" },
  { id: "Claude", label: "Claude", logo: "/tools/claude.svg", emoji: "🤖" },
  { id: "ChatGPT", label: "ChatGPT", logo: "/tools/openai.svg", emoji: "💬" },
  { id: "Gemini", label: "Gemini", logo: "/tools/gemini.svg", emoji: "✨" },
  { id: "Windsurf", label: "Windsurf", logo: "/tools/windsurf.svg", emoji: "🏄" },
];

const API_TOOLS = [
  { id: "AnthropicAPI", label: "Anthropic API", logo: "/tools/claude.svg", emoji: "🔌" },
  { id: "OpenAIAPI", label: "OpenAI API", logo: "/tools/openai.svg", emoji: "🔌" },
  { id: "GeminiAPI", label: "Gemini API", logo: "/tools/gemini.svg", emoji: "🔌" },
];

const SUPPORTED_TOOLS = [...SUBSCRIPTION_TOOLS, ...API_TOOLS];

function ToolLogo({
  logo,
  label,
  emoji,
}: {
  logo: string;
  label: string;
  emoji: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="text-xl leading-none">{emoji}</span>;
  }

  return (
    <div className="w-8 h-8 relative">
      <Image
        src={logo}
        alt={label}
        fill
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

interface Props {
  selected: string[];
  onChange: (tools: string[]) => void;
}

function ToolSection({
  title,
  description,
  tools,
  selected,
  toggle,
}: {
  title: string;
  description: string;
  tools: typeof SUBSCRIPTION_TOOLS;
  selected: string[];
  toggle: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white mb-1">
          {title}
        </h3>

        <p className="text-xs text-white/40">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {tools.map(({ id, label, logo, emoji }) => {
          const active = selected.includes(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                active
                  ? "border-[#4F6EF7] bg-[#4F6EF7]/10 text-white"
                  : "border-white/[0.08] bg-[#0A0A0B] text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              <ToolLogo
                logo={logo}
                label={label}
                emoji={emoji}
              />

              <span className="text-[11px] font-medium leading-tight">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ToolSelector({
  selected,
  onChange,
}: Props) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((t) => t !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="space-y-8">
      
      {/* Subscription tools */}
      <ToolSection
        title="Subscription Tools"
        description="Team subscriptions and SaaS AI products"
        tools={SUBSCRIPTION_TOOLS}
        selected={selected}
        toggle={toggle}
      />

      {/* API tools */}
      <ToolSection
        title="API Providers"
        description="Direct API model usage and token-based billing"
        tools={API_TOOLS}
        selected={selected}
        toggle={toggle}
      />
    </div>
  );
}

export { SUPPORTED_TOOLS };