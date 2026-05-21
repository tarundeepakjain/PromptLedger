"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AuditResult } from "@/lib/types";
import DiffHero from "@/components/diff/DiffHero";
import SummaryComparison from "@/components/diff/SummaryComparison";
import ToolComparisonCard from "@/components/diff/ToolComparisonCard";
import ReauditButton from "@/components/diff/ReauditButton";

interface DiffData {
  oldAudit: AuditResult;
  newAudit: AuditResult;
}

export default function DiffViewPage() {
  const params = useParams()
  const id = params.id as string
  const [data, setData] = useState<DiffData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiff = async () => {
      try {
        const res = await fetch(`/api/audit/rerun/${id}`);
        if (!res.ok) throw new Error("Failed to load comparison");
        const json = await res.json();
        if (!json.success) throw new Error(json.error || "Failed to load comparison");
        setData({ oldAudit: json.oldAudit, newAudit: json.newAudit });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load comparison");
      } finally {
        setLoading(false);
      }
    };
    fetchDiff();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-t-[#4F6EF7] border-white/10 animate-spin" />
          <p className="text-white/40 text-sm">Comparing pricing data…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 6V10M10 14H10.01"
                stroke="#f87171"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="8" stroke="#f87171" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="font-semibold text-white mb-2">Could not load comparison</p>
          <p className="text-sm text-white/50 mb-6">
            {error || "This audit may not exist or the link is invalid."}
          </p>
          <Link
            href={`/audit/${id}`}
            className="inline-flex px-5 py-2.5 rounded-xl bg-[#4F6EF7] hover:bg-[#6B87FF] transition-colors text-sm font-medium"
          >
            Back to audit
          </Link>
        </div>
      </div>
    );
  }

  const { oldAudit, newAudit } = data;

  const pairedResults = newAudit.toolResults.map((newResult) => {
    const oldResult = oldAudit.toolResults.find(
      (o) => o.currentTool === newResult.currentTool
    );
    return { oldResult: oldResult ?? newResult, newResult };
  });

  const changedCount = pairedResults.filter(
    ({ oldResult, newResult }) =>
      oldResult.recommendedTool !== newResult.recommendedTool ||
      oldResult.recommendedPlan !== newResult.recommendedPlan
  ).length;

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb + action bar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link href={`/audit/${id}`} className="hover:text-white/70 transition-colors">
              Audit
            </Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4 2L8 6L4 10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white/60">Pricing Update Preview</span>
          </div>
          <ReauditButton auditId={id} />
        </div>

        {/* Hero */}
        <div className="mb-6">
          <DiffHero oldAudit={oldAudit} newAudit={newAudit} />
        </div>

        {/* Change summary banner */}
        {changedCount > 0 && (
          <div className="mb-8 rounded-2xl border border-[#4F6EF7]/20 bg-[#4F6EF7]/5 p-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#4F6EF7]/20 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L13 12H1L7 1Z" stroke="#4F6EF7" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M7 5.5V8" stroke="#4F6EF7" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="7" cy="10" r="0.5" fill="#4F6EF7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#7C93FF]">
                  {changedCount} tool recommendation{changedCount !== 1 ? "s" : ""} updated
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  Pricing changes have improved the recommended stack. Click{" "}
                  <span className="text-white/60">Apply Updates</span> to save.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <SummaryComparison
              oldSummary={oldAudit.summary}
              newSummary={newAudit.summary}
            />
            <div>
              <h2 className="text-lg font-semibold mb-4">Tool-by-tool comparison</h2>
              <div className="space-y-4">
                {pairedResults.map(({ oldResult, newResult }, i) => (
                  <ToolComparisonCard
                    key={i}
                    oldResult={oldResult}
                    newResult={newResult}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <DeltaSummaryCard oldAudit={oldAudit} newAudit={newAudit} />
            <div className="rounded-xl border border-[#4F6EF7]/20 bg-[#4F6EF7]/[0.05] p-5">
              <p className="text-sm font-semibold text-[#7C93FF] mb-1.5">Ready to update?</p>
              <p className="text-xs text-white/50 leading-relaxed mb-4">
                Applying updates will save the latest recommendations to your audit and
                redirect you to the updated results.
              </p>
              <ReauditButton auditId={id} />
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#111214] p-5">
              <p className="text-sm font-medium text-white/70 mb-3">Previous audit</p>
              <p className="text-xs text-white/40 leading-relaxed mb-4">
                Return to your original audit results without applying any changes.
              </p>
              <Link
                href={`/audit/${id}`}
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to original audit
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function DeltaSummaryCard({
  oldAudit,
  newAudit,
}: {
  oldAudit: AuditResult;
  newAudit: AuditResult;
}) {
  const monthlyDelta = newAudit.totalMonthlySavings - oldAudit.totalMonthlySavings;
  const annualDelta = newAudit.totalAnnualSavings - oldAudit.totalAnnualSavings;
  const isPositive = monthlyDelta >= 0;

  function fmt(n: number) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  }

  return (
    <div className={`rounded-xl border p-5 ${isPositive ? "border-emerald-500/20 bg-emerald-500/[0.06]" : "border-red-500/20 bg-red-500/[0.06]"}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPositive ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            {isPositive ? (
              <path d="M7 11V3M4 6L7 3L10 6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M7 3V11M4 8L7 11L10 8" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </div>
        <span className={`text-sm font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
          Savings {isPositive ? "Increased" : "Decreased"}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">Monthly delta</span>
          <span className={`text-sm font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
            {monthlyDelta >= 0 ? "+" : ""}{fmt(monthlyDelta)}/mo
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">Annual delta</span>
          <span className={`text-sm font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
            {annualDelta >= 0 ? "+" : ""}{fmt(annualDelta)}/yr
          </span>
        </div>
        <div className="pt-2 border-t border-white/[0.06]">
          <p className="text-xs text-white/40 mb-1">Updated monthly savings</p>
          <p className="text-xl font-bold text-white">
            {fmt(newAudit.totalMonthlySavings)}
            <span className="text-sm text-white/40 font-normal">/mo</span>
          </p>
          <p className="text-xs text-white/40 mt-0.5">{fmt(newAudit.totalAnnualSavings)} annually</p>
        </div>
      </div>
    </div>
  );
}