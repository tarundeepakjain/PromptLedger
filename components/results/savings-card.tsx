interface Props {
  monthlySavings: number;
  annualSavings: number;
  currentSpend: number;
}

export default function SavingsCard({ monthlySavings, annualSavings, currentSpend }: Props) {
  const pct = currentSpend > 0 ? Math.round((monthlySavings / currentSpend) * 100) : 0;

  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M4 9L7 12L10 9" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-sm font-medium text-emerald-400">Savings Opportunity</span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-white">
            ${monthlySavings.toLocaleString()}<span className="text-sm text-white/40 font-normal">/mo</span>
          </p>
          <p className="text-sm text-white/40 mt-0.5">${annualSavings.toLocaleString()} annually</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-emerald-400">{pct}%</p>
          <p className="text-xs text-white/40">reduction</p>
        </div>
      </div>

      <div className="mt-4 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}