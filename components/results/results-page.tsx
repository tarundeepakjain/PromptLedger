"use client";
import { useEffect, useState } from "react";
import { AuditResult } from "@/lib/types";
import ResultsHero from "./results-hero";
import AiSummary from "./ai-summary";
import RecommendationCard from "./recommendation-card";
import SavingsCard from "./savings-card";
import LeadForm from "./lead-form";
import ShareButtons from "./share-buttons";


export default function ResultsPage({ auditId }: { auditId: string }) {
  const [data, setData] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const res = await fetch(`/api/audit/${auditId}`);
        if (!res.ok) throw new Error("Audit not found");
        const json = await res.json();
        if (!json.success) throw new Error(json.error || "Failed to load audit");
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load audit");
      } finally {
        setLoading(false);
      }
    };
    fetchAudit();
  }, [auditId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-t-[#4F6EF7] border-white/10 animate-spin" />
          <p className="text-white/40 text-sm">Loading your audit...</p>
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
              <path d="M10 6V10M10 14H10.01" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="10" r="8" stroke="#f87171" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="font-semibold text-white mb-2">Audit not found</p>
          <p className="text-sm text-white/50 mb-6">{error || "This audit may have expired or the link is invalid."}</p>
          <a href="/" className="inline-flex px-5 py-2.5 rounded-xl bg-[#4F6EF7] hover:bg-[#6B87FF] transition-colors text-sm font-medium">
            Start a new audit
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero stats */}
        <div className="mb-6">
          <ResultsHero
            totalCurrentMonthlySpend={data.totalCurrentMonthlySpend}
            totalOptimizedMonthlySpend={data.totalOptimizedMonthlySpend}
            totalMonthlySavings={data.totalMonthlySavings}
            totalAnnualSavings={data.totalAnnualSavings}
          />
        </div>
        {data.totalMonthlySavings >= 500 && (
          <div className="mb-8 rounded-2xl border border-[#4F6EF7]/20 bg-[#4F6EF7]/5 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#7C93FF] mb-1">
                  High Savings Opportunity
                </p>

                <h3 className="text-xl font-semibold mb-2">
                  Unlock deeper savings with Credex
                </h3>

                <p className="text-sm text-white/50 max-w-2xl leading-relaxed">
                  Your stack shows over ${data.totalMonthlySavings}/month in potential
                  savings. Credex can help reduce infrastructure costs further through
                  discounted AI credits and ongoing spend optimization.
                </p>
              </div>

              <a
                href="https://credex.rocks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#4F6EF7] hover:bg-[#6B87FF] transition-colors text-sm font-medium whitespace-nowrap"
              >
                Explore Credex
              </a>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main results */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            {data.summary && <AiSummary summary={data.summary} />}

            {/* Recommendations */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Tool-by-tool breakdown</h2>
              <div className="space-y-4">
                {data.toolResults.map((result, i) => (
                  <RecommendationCard key={i} result={result} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <SavingsCard
              monthlySavings={data.totalMonthlySavings}
              annualSavings={data.totalAnnualSavings}
              currentSpend={data.totalCurrentMonthlySpend}
            />
            <LeadForm
              monthlySavings={data.totalMonthlySavings}
              annualSavings={data.totalAnnualSavings}
            />
            <ShareButtons auditId={auditId} />
          </div>
        </div>
      </div>
    </div>
  );
}