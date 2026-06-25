import { AuditResult } from "@/lib/types";

interface Props {
  oldAudit: AuditResult;
  newAudit: AuditResult;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
}

export default function DiffHero({ oldAudit, newAudit }: Props) {
  const monthlyDelta = newAudit.totalMonthlySavings - oldAudit.totalMonthlySavings;
  const annualDelta = newAudit.totalAnnualSavings - oldAudit.totalAnnualSavings;
  const isImproved = monthlyDelta > 0;
  const isUnchanged = monthlyDelta === 0;

  const heroMessage = isUnchanged
    ? "Pricing is current. Your recommendations remain optimal."
    : isImproved
    ? `Pricing updated. You can now save ${fmt(monthlyDelta)}/mo more with the latest recommendations.`
    : `Pricing shifted. Savings adjusted by ${fmt(Math.abs(monthlyDelta))}/mo — recommendations still optimized.`;

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#111214] overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#4F6EF7]/[0.07] rounded-full blur-3xl pointer-events-none" />
      {isImproved && (
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      )}
      <div className="relative p-8 md:p-10">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Pricing Update Preview</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Savings Comparison</h1>
            <p className="text-sm text-white/50 mt-2 max-w-lg leading-relaxed">{heroMessage}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
            isUnchanged
              ? "bg-white/[0.04] border-white/[0.08] text-white/40"
              : isImproved
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span className="text-xs font-medium">
              {isUnchanged ? "No change" : isImproved ? "Improved" : "Adjusted"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CompareStatCard label="Previous Monthly Savings" value={fmt(oldAudit.totalMonthlySavings)} sublabel="before update" muted />
          <CompareStatCard label="Updated Monthly Savings" value={fmt(newAudit.totalMonthlySavings)} sublabel="after update" highlight />
          <CompareStatCard
            label="Monthly Savings Delta"
            value={`${monthlyDelta >= 0 ? "+" : ""}${fmt(monthlyDelta)}`}
            sublabel="change in savings"
            positive={monthlyDelta > 0}
            negative={monthlyDelta < 0}
          />
          <CompareStatCard
            label="Annual Savings Delta"
            value={`${annualDelta >= 0 ? "+" : ""}${fmt(annualDelta)}`}
            sublabel="yearly difference"
            positive={annualDelta > 0}
            negative={annualDelta < 0}
            big
          />
        </div>
      </div>
    </div>
  );
}

function CompareStatCard({
  label, value, sublabel, highlight, positive, negative, big,
}: {
  label: string; value: string; sublabel?: string;
  muted?: boolean; highlight?: boolean; positive?: boolean; negative?: boolean; big?: boolean;
}) {
  const bgClass = highlight
    ? "bg-[#4F6EF7]/10 border border-[#4F6EF7]/20"
    : positive
    ? "bg-emerald-500/[0.06] border border-emerald-500/20"
    : negative
    ? "bg-red-500/[0.06] border border-red-500/20"
    : "bg-white/[0.03] border border-white/[0.06]";

  const textClass = highlight
    ? "text-[#4F6EF7]"
    : positive
    ? "text-emerald-400"
    : negative
    ? "text-red-400"
    : "text-white/80";

  return (
    <div className={`rounded-xl p-4 ${bgClass}`}>
      <p className="text-xs text-white/40 mb-2 leading-snug">{label}</p>
      <p className={`font-bold tracking-tight ${big ? "text-2xl md:text-3xl" : "text-xl"} ${textClass}`}>
        {value}
      </p>
      {sublabel && <p className="text-xs text-white/40 mt-1">{sublabel}</p>}
    </div>
  );
}