const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L13 8H19L14 12L16 18L10 14L4 18L6 12L1 8H7L10 2Z" stroke="#4F6EF7" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Instant AI Audit",
    description: "Input your tools and spend. Get a full breakdown of waste and savings opportunities in seconds.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="#4F6EF7" strokeWidth="1.5" />
        <path d="M6 10H14M6 13H11" stroke="#4F6EF7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Plan Recommendations",
    description: "See exactly which plan tier each tool should be on — and why. Backed by real pricing data.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10C3 6.13 6.13 3 10 3C13.87 3 17 6.13 17 10C17 13.87 13.87 17 10 17C6.13 17 3 13.87 3 10Z" stroke="#4F6EF7" strokeWidth="1.5" />
        <path d="M10 7V10L12 12" stroke="#4F6EF7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Annual Savings Forecast",
    description: "Project what you'll save over 12 months by optimizing now. Share the number with your CFO.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 10H15M10 5L15 10L10 15" stroke="#4F6EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Shareable Reports",
    description: "Every audit gets a unique URL. Share it with your team or finance partner instantly.",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[#4F6EF7] mb-4">Why PromptLedger</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Your AI stack deserves<br />a real audit
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Most teams are on the wrong plan, paying for unused seats, or duplicating tools. We fix that.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-[#111214] p-8 hover:border-white/[0.14] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#4F6EF7]/10 flex items-center justify-center mb-5">
                {icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}