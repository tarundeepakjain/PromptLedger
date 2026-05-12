import Link from "next/link";
import AuditForm from "@/components/audit/audit-form";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4F6EF7]/[0.07] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/60 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F6EF7] animate-pulse" />
            Free AI spend audit — no credit card required
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Stop overpaying for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6EF7] to-[#9B6FFF]">
              AI tools
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
            PromptLedger audits your team&apos;s AI stack and surfaces exact savings opportunities — in under 60 seconds.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-white/40">
            {["No signup required", "Instant results", "Private & secure"].map((item, i) => (
              <span key={item} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/20 mr-4">·</span>}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="#4F6EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Audit form embedded */}
        <div id="audit" className="max-w-4xl mx-auto">
          <AuditForm />
        </div>
      </div>
    </section>
  );
}