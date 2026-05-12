"use client";

import { useState } from "react";
import Image from "next/image";
import { SUPPORTED_TOOLS } from "@/components/audit/tool-selector";
import { ToolAuditResult } from "@/lib/types";

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
    return <span className="text-2xl leading-none">{emoji}</span>;
  }

  return (
    <div className="w-10 h-10 relative">
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

function fmtSpend(n: number): string {
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`
}

export default function RecommendationCard({
  result,
}: {
  result: ToolAuditResult;
}) {
  const toolMeta = SUPPORTED_TOOLS.find(
    (t) => t.id === result.currentTool
  );

  const recommendedToolMeta = SUPPORTED_TOOLS.find(
    (t) => t.id === result.recommendedTool
  );

  const saving = result.monthlySavings > 0;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111214] p-6 hover:border-white/[0.14] transition-colors">
      <div className="flex items-start justify-between gap-4 mb-5">

        {/* Tool transition */}
        <div className="flex items-center gap-5">

          {/* Current tool */}
          <div className="flex flex-col items-center text-center min-w-[72px]">
            {toolMeta && (
              <div className="mb-2">
                <ToolLogo
                  logo={toolMeta.logo}
                  label={toolMeta.label}
                  emoji={toolMeta.emoji}
                />
              </div>
            )}

            <p className="text-sm font-semibold leading-none">
              {toolMeta?.label || result.currentTool}
            </p>

            <p className="text-xs text-white/40 mt-1">
              {result.currentPlan}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white/30"
            >
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Recommended tool */}
          <div className="flex flex-col items-center text-center min-w-[72px]">
            {recommendedToolMeta && (
              <div className="mb-2">
                <ToolLogo
                  logo={recommendedToolMeta.logo}
                  label={recommendedToolMeta.label}
                  emoji={recommendedToolMeta.emoji}
                />
              </div>
            )}

            <p className="text-sm font-semibold leading-none">
              {recommendedToolMeta?.label || result.recommendedTool}
            </p>

            <p className="text-xs text-white/40 mt-1">
              {result.recommendedPlan}
            </p>
          </div>
        </div>

        {/* Savings badge */}
        <div
          className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            saving
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-white/[0.04] text-white/40 border border-white/[0.08]"
          }`}
        >
          {saving ? `Save ${fmtSpend(result.monthlySavings)}/mo` : "Optimal"}
        </div>
      </div>

      {/* Savings stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-lg bg-[#0A0A0B] border border-white/[0.06] p-3">
          <p className="text-xs text-white/40 mb-1">Current</p>

          <p className="font-semibold text-sm">
            {fmtSpend(result.currentMonthlySpend)}
            <span className="text-xs text-white/40">/mo</span>
          </p>
        </div>

        <div className="rounded-lg bg-[#0A0A0B] border border-white/[0.06] p-3">
          <p className="text-xs text-white/40 mb-1">Optimized</p>

          <p className="font-semibold text-sm text-[#4F6EF7]">
            {fmtSpend(result.optimizedMonthlySpend)}
            <span className="text-xs text-[#4F6EF7]/60">/mo</span>
          </p>
        </div>

        <div className="rounded-lg bg-emerald-500/[0.06] border border-emerald-500/20 p-3">
          <p className="text-xs text-white/40 mb-1">Annual save</p>

          <p className="font-semibold text-sm text-emerald-400">
            {fmtSpend(result.annualSavings)}
          </p>
        </div>
      </div>

      {/* Reason */}
      <p className="text-sm text-white/50 leading-relaxed border-t border-white/[0.06] pt-4">
        {result.reason}
      </p>
    </div>
  );
}