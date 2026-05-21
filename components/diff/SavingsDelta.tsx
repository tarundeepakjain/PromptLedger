interface Props {
  oldValue: number;
  newValue: number;
  label?: string;
  showAnnual?: boolean;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
}

export default function SavingsDelta({ oldValue, newValue, label, showAnnual }: Props) {
  const delta = newValue - oldValue;
  const isPositive = delta > 0;
  const isNeutral = delta === 0;

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-white/40">{label}</span>}
      <span className="text-sm font-semibold text-white/70">
        {fmt(newValue)}{showAnnual ? "/yr" : "/mo"}
      </span>
      {!isNeutral && (
        <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full ${
          isPositive
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}>
          {isPositive ? (
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M5 8V2M2 5L5 2L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M5 2V8M2 5L5 8L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {fmt(Math.abs(delta))}
        </span>
      )}
    </div>
  );
}