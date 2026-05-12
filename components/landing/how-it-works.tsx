const steps = [
  {
    step: "01",
    title: "Add your team size",
    description: "Tell us how many people are using AI tools across your organization.",
  },
  {
    step: "02",
    title: "Select your tools",
    description: "Pick from supported AI tools and add your current plan, spend, and seats.",
  },
  {
    step: "03",
    title: "Get your audit",
    description: "Our AI engine analyzes your stack and returns savings recommendations instantly.",
  },
  {
    step: "04",
    title: "Share the report",
    description: "Every audit has a unique link. Share with your team or finance stakeholders.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#111214]/40 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[#4F6EF7] mb-4">Process</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How it works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ step, title, description }, i) => (
            <div key={step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
              )}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0B] p-6 h-full">
                <div className="font-mono text-[#4F6EF7]/60 text-sm mb-4">{step}</div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}