import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-[#4F6EF7]/[0.06] rounded-3xl blur-3xl" />
        <div className="relative rounded-3xl border border-white/[0.08] bg-[#111214] px-8 py-16">
          <p className="text-xs uppercase tracking-widest text-[#4F6EF7] mb-5">Get started</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Ready to cut your<br />AI bill?
          </h2>
          <p className="text-white/50 mb-8 text-lg max-w-md mx-auto">
            Free audit. No account. No credit card. Just answers in under 60 seconds.
          </p>
          <Link
            href="/#audit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#4F6EF7] hover:bg-[#6B87FF] transition-colors font-semibold text-sm"
          >
            Start your free audit
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}