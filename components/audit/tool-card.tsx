"use client";

import { useState } from "react";
import Image from "next/image";
import { ToolUsage } from "@/lib/types";
import { SUPPORTED_TOOLS } from "./tool-selector";
import { UseCase } from "@/lib/types";

const PLANS: Record<string, string[]> = {
  Cursor: ["Hobby", "Pro", "Business", "Enterprise"],

  GitHubCopilot: ["Individual", "Business", "Enterprise"],

  Claude: [
    "Free",
    "Pro",
    "Max_5x",
    "Max_20x",
    "Team",
    "Enterprise",
  ],

  ChatGPT: ["Plus", "Team", "Enterprise"],

  Gemini: ["Pro", "Ultra"],

  Windsurf: ["Free", "Pro", "Teams"],

  AnthropicAPI: [
    "Haiku4_5",
    "Sonnet4_6",
    "Opus4_7",
  ],

  OpenAIAPI: [
    "GPT5_4Mini",
    "GPT5_4",
    "GPT5_5",
  ],

  GeminiAPI: [
    "FlashLite25",
    "Flash25",
    "Pro25",
  ],
};

const USE_CASES = [
  "coding",
  "research",
  "writing",
  "support",
  "mixed",
];

interface Props {
  entry: ToolUsage;
  onChange: (entry: ToolUsage) => void;
  onRemove: () => void;
}

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

export default function ToolCard({
  entry,
  onChange,
  onRemove,
}: Props) {
  const toolMeta = SUPPORTED_TOOLS.find(
    (t) => t.id === entry.tool
  );

  const isAPI =
    entry.tool === "AnthropicAPI" ||
    entry.tool === "OpenAIAPI" ||
    entry.tool === "GeminiAPI";

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0A0A0B] p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {toolMeta && (
            <ToolLogo
              logo={toolMeta.logo}
              label={toolMeta.label}
              emoji={toolMeta.emoji}
            />
          )}

          <div>
            <p className="text-sm font-medium text-white">
              {toolMeta?.label || entry.tool}
            </p>

            <p className="text-xs text-white/40">
              {isAPI ? "Token-based billing" : "Subscription plan"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="text-white/30 hover:text-red-400 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] text-white/40 mb-2 block">
            {isAPI ? "Model" : "Plan"}
          </label>

          <select
            value={entry.plan}
            onChange={(e) =>
              onChange({
                ...entry,
                plan: e.target.value,
              })
            }
            className="w-full bg-[#111214] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4F6EF7]/50"
          >
            {(PLANS[entry.tool] || []).map((plan) => (
              <option
                key={plan}
                value={plan}
              >
                {plan}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] text-white/40 mb-2 block">
            Use Case
          </label>

          <select
            value={entry.useCase}
            onChange={(e) =>
              onChange({
                ...entry,
                useCase: e.target.value as UseCase,
              })
            }
            className="w-full bg-[#111214] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4F6EF7]/50"
          >
            {USE_CASES.map((useCase) => (
              <option
                key={useCase}
                value={useCase}
              >
                {useCase}
              </option>
            ))}
          </select>
        </div>

        {isAPI ? (
          <>
            <div>
              <label className="text-[11px] text-white/40 mb-2 block">
                Input Tokens / Month (M)
              </label>

              <input
                type="number"
                min={0.1}
                step={0.1}
                value={entry.inputTokens ?? 1}
                onChange={(e) =>
                  onChange({
                    ...entry,
                    inputTokens: Number(e.target.value),
                  })
                }
                className="w-full bg-[#111214] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4F6EF7]/50"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/40 mb-2 block">
                Output Tokens / Month (M)
              </label>

              <input
                type="number"
                min={0.1}
                step={0.1}
                value={entry.outputTokens ?? 1}
                onChange={(e) =>
                  onChange({
                    ...entry,
                    outputTokens: Number(e.target.value),
                  })
                }
                className="w-full bg-[#111214] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4F6EF7]/50"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-[11px] text-white/40 mb-2 block">
                Monthly Spend ($)
              </label>

              <input
                type="number"
                min={0}
                value={entry.monthlySpend}
                onChange={(e) =>
                  onChange({
                    ...entry,
                    monthlySpend: Number(e.target.value),
                  })
                }
                className="w-full bg-[#111214] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4F6EF7]/50"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/40 mb-2 block">
                Seats
              </label>

              <input
                type="number"
                min={1}
                value={entry.seats}
                onChange={(e) =>
                  onChange({
                    ...entry,
                    seats: Number(e.target.value),
                  })
                }
                className="w-full bg-[#111214] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4F6EF7]/50"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}