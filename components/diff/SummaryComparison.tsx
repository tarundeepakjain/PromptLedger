interface Props {
  oldSummary?: string;
  newSummary?: string;
}

export default function SummaryComparison({ oldSummary, newSummary }: Props) {
  if (!oldSummary && !newSummary) return null;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111214] overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-white/[0.06]">
        <div className="w-7 h-7 rounded-lg bg-[#4F6EF7]/20 flex items-center justify-center shrink-0">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 1C3.686 1 1 3.686 1 7C1 10.314 3.686 13 7 13C10.314 13 13 10.314 13 7C13 3.686 10.314 1 7 1Z" stroke="#4F6EF7" strokeWidth="1.2" />
            <path d="M7 5V7.5L8.5 9" stroke="#4F6EF7" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-[#7C93FF]">AI Analysis Comparison</p>
          <p className="text-xs text-white/40 mt-0.5">Previous vs updated optimization summary</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/40">
              Previous
            </span>
          </div>
          <p className="text-[14px] leading-7 text-white/50 tracking-[0.01em]">
            {oldSummary || <span className="italic text-white/25">No summary available</span>}
          </p>
        </div>

        <div className="p-6 bg-[#4F6EF7]/[0.02]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#4F6EF7]/10 border border-[#4F6EF7]/20 text-[#7C93FF]">
              Updated
            </span>
          </div>
          <p className="text-[14px] leading-7 text-white/75 tracking-[0.01em]">
            {newSummary || <span className="italic text-white/25">Summary will appear after refresh</span>}
          </p>
        </div>
      </div>
    </div>
  );
}