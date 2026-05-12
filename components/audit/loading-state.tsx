export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#4F6EF7] animate-spin" />
      </div>
      <div className="text-center">
        <p className="font-medium text-white/80 mb-1">Analyzing your stack...</p>
        <p className="text-sm text-white/40">This takes just a moment</p>
      </div>
      <div className="flex gap-2 mt-2">
        {["Fetching pricing data", "Comparing plans", "Calculating savings"].map((step, i) => (
          <div
            key={step}
            className="flex items-center gap-1.5 text-xs text-white/30 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <div className="w-1 h-1 rounded-full bg-[#4F6EF7] animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}