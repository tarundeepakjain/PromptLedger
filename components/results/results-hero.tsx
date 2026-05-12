interface Props {
  totalCurrentMonthlySpend: number;
  totalOptimizedMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
}

export default function ResultsHero({
  totalCurrentMonthlySpend,
  totalOptimizedMonthlySpend,
  totalMonthlySavings,
  totalAnnualSavings,
}: Props) {
  const savingsPct = totalCurrentMonthlySpend > 0
    ? Math.round((totalMonthlySavings / totalCurrentMonthlySpend) * 100)
    : 0;

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#111214] overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F6EF7]/[0.08] rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-8 md:p-10">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Audit Complete</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your AI Spend Audit</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">{savingsPct}% saveable</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Current Monthly" value={fmt(totalCurrentMonthlySpend)} muted />
          <StatCard label="Optimized Monthly" value={fmt(totalOptimizedMonthlySpend)} muted />
          <StatCard
            label="Monthly Savings"
            value={fmt(totalMonthlySavings)}
            highlight
            sublabel={`${savingsPct}% reduction`}
          />
          <StatCard
            label="Annual Savings"
            value={fmt(totalAnnualSavings)}
            highlight
            big
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sublabel,
  muted,
  highlight,
  big,
}: {
  label: string;
  value: string;
  sublabel?: string;
  muted?: boolean;
  highlight?: boolean;
  big?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? "bg-[#4F6EF7]/10 border border-[#4F6EF7]/20" : "bg-white/[0.03] border border-white/[0.06]"}`}>
      <p className="text-xs text-white/40 mb-2">{label}</p>
      <p className={`font-bold tracking-tight ${big ? "text-2xl md:text-3xl text-[#6B87FF]" : highlight ? "text-xl text-[#4F6EF7]" : "text-lg text-white/80"}`}>
        {value}
      </p>
      {sublabel && <p className="text-xs text-white/40 mt-1">{sublabel}</p>}
    </div>
  );
}