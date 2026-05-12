export default function AiSummary({ summary }: { summary: string }) {
  return (
    <div className="rounded-xl border border-[#4F6EF7]/20 bg-[#4F6EF7]/[0.05] p-6">
      
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#4F6EF7]/20 flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1C3.686 1 1 3.686 1 7C1 10.314 3.686 13 7 13C10.314 13 13 10.314 13 7C13 3.686 10.314 1 7 1Z"
              stroke="#4F6EF7"
              strokeWidth="1.2"
            />
            <path
              d="M7 5V7.5L8.5 9"
              stroke="#4F6EF7"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <p className="text-sm font-medium text-[#7C93FF]">
            AI Analysis
          </p>

          <p className="text-xs text-white/40 mt-0.5">
            Personalized optimization summary
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        <p className="text-[15px] leading-7 text-white/75 tracking-[0.01em]">
          {summary}
        </p>
      </div>
    </div>
  );
}