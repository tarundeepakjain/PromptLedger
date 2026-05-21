"use client";

import { useState } from "react";
import Image from "next/image";
import { SUPPORTED_TOOLS } from "@/components/audit/tool-selector";
import { ToolAuditResult } from "@/lib/types";

function ToolLogo({ logo, label, emoji, size = "md" }: {
  logo: string; label: string; emoji: string; size?: "sm" | "md";
}) {
  const [failed, setFailed] = useState(false);
  const dim = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  if (failed) return <span className={size === "sm" ? "text-lg" : "text-xl"}>{emoji}</span>;
  return (
    <div className={`${dim} relative shrink-0`}>
      <Image src={logo} alt={label} fill className="object-contain" onError={() => setFailed(true)} />
    </div>
  );
}

function fmtSpend(n?: number): string {
  const v = n ?? 0;
  return Number.isInteger(v) ? `$${v}` : `$${v.toFixed(2)}`;
}

function ToolChip({ toolId, plan, accent }: { toolId?: string; plan?: string; accent?: boolean; }) {
  const meta = SUPPORTED_TOOLS.find((t) => t.id === toolId);
  const displayLabel = meta?.label || toolId || "—";
  return (
    <div className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${
      accent ? "bg-[#4F6EF7]/10 border-[#4F6EF7]/20" : "bg-white/[0.03] border-white/[0.06]"
    }`}>
      {meta && <ToolLogo logo={meta.logo} label={meta.label} emoji={meta.emoji} size="sm" />}
      <div>
        <p className={`text-xs font-semibold leading-none ${accent ? "text-[#7C93FF]" : "text-white/80"}`}>
          {displayLabel}
        </p>
        {plan && <p className="text-[10px] text-white/35 mt-0.5 leading-none">{plan}</p>}
      </div>
    </div>
  );
}

interface Props {
  oldResult: ToolAuditResult;
  newResult: ToolAuditResult;
}

export default function ToolComparisonCard({ oldResult, newResult }: Props) {
  const recommendationChanged =
    oldResult.recommendedTool !== newResult.recommendedTool ||
    oldResult.recommendedPlan !== newResult.recommendedPlan;

  const savingsDelta = newResult.monthlySavings - oldResult.monthlySavings;
  const improved = savingsDelta > 0;
  const worsened = savingsDelta < 0;

  return (
    <div className={`rounded-xl border bg-[#111214] p-6 transition-colors ${
      recommendationChanged
        ? "border-[#4F6EF7]/30 hover:border-[#4F6EF7]/50"
        : "border-white/[0.08] hover:border-white/[0.14]"
    }`}>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          {(() => {
            const meta = SUPPORTED_TOOLS.find((t) => t.id === oldResult.currentTool);
            return meta ? <ToolLogo logo={meta.logo} label={meta.label} emoji={meta.emoji} /> : null;
          })()}
          <div>
            <p className="text-sm font-semibold leading-none text-white">
              {SUPPORTED_TOOLS.find((t) => t.id === oldResult.currentTool)?.label || oldResult.currentTool}
            </p>
            <p className="text-xs text-white/40 mt-1">{oldResult.currentPlan}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {recommendationChanged ? (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#4F6EF7]/15 border border-[#4F6EF7]/30 text-[#7C93FF]">
              Updated Recommendation
            </span>
          ) : (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/30">
              Unchanged
            </span>
          )}
          {savingsDelta !== 0 && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              improved
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {improved ? "+" : ""}{fmtSpend(savingsDelta)}/mo
            </span>
          )}
        </div>
      </div>

      {/* Recommendation comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="rounded-lg bg-[#0A0A0B] border border-white/[0.06] p-3">
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">Previous Recommendation</p>
          <ToolChip toolId={oldResult.recommendedTool} plan={oldResult.recommendedPlan} />
          <div className="flex items-center gap-3 mt-2.5">
            <div>
              <p className="text-[10px] text-white/30 mb-0.5">Savings</p>
              <p className="text-sm font-semibold text-white/60">
                {fmtSpend(oldResult.monthlySavings)}<span className="text-xs text-white/30">/mo</span>
              </p>
            </div>
            <div className="w-px h-6 bg-white/[0.06]" />
            <div>
              <p className="text-[10px] text-white/30 mb-0.5">Annual</p>
              <p className="text-sm font-semibold text-white/60">{fmtSpend(oldResult.annualSavings)}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg border p-3 ${
          recommendationChanged
            ? "bg-[#4F6EF7]/[0.04] border-[#4F6EF7]/20"
            : "bg-[#0A0A0B] border-white/[0.06]"
        }`}>
          <p className={`text-[10px] font-medium uppercase tracking-widest mb-2 ${
            recommendationChanged ? "text-[#7C93FF]/60" : "text-white/30"
          }`}>Updated Recommendation</p>
          <ToolChip toolId={newResult.recommendedTool} plan={newResult.recommendedPlan} accent={recommendationChanged} />
          <div className="flex items-center gap-3 mt-2.5">
            <div>
              <p className="text-[10px] text-white/30 mb-0.5">Savings</p>
              <p className={`text-sm font-semibold ${improved ? "text-emerald-400" : worsened ? "text-red-400" : "text-[#4F6EF7]"}`}>
                {fmtSpend(newResult.monthlySavings)}<span className="text-xs opacity-60">/mo</span>
              </p>
            </div>
            <div className="w-px h-6 bg-white/[0.06]" />
            <div>
              <p className="text-[10px] text-white/30 mb-0.5">Annual</p>
              <p className={`text-sm font-semibold ${improved ? "text-emerald-400" : worsened ? "text-red-400" : "text-[#4F6EF7]"}`}>
                {fmtSpend(newResult.annualSavings)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spend stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-lg bg-[#0A0A0B] border border-white/[0.06] p-3">
          <p className="text-xs text-white/40 mb-1">Current Spend</p>
          <p className="font-semibold text-sm">{fmtSpend(newResult.currentMonthlySpend)}<span className="text-xs text-white/40">/mo</span></p>
        </div>
        <div className="rounded-lg bg-[#0A0A0B] border border-white/[0.06] p-3">
          <p className="text-xs text-white/40 mb-1">Optimized</p>
          <p className="font-semibold text-sm text-[#4F6EF7]">{fmtSpend(newResult.optimizedMonthlySpend)}<span className="text-xs text-[#4F6EF7]/60">/mo</span></p>
        </div>
        <div className={`rounded-lg border p-3 ${worsened ? "bg-red-500/[0.06] border-red-500/20" : "bg-emerald-500/[0.06] border-emerald-500/20"}`}>
          <p className="text-xs text-white/40 mb-1">Annual Save</p>
          <p className={`font-semibold text-sm ${worsened ? "text-red-400" : "text-emerald-400"}`}>{fmtSpend(newResult.annualSavings)}</p>
        </div>
      </div>

      {/* Reason */}
      <p className="text-sm text-white/50 leading-relaxed border-t border-white/[0.06] pt-4">
        {newResult.reason}
      </p>
    </div>
  );
}