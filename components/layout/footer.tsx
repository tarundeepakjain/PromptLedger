import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0B] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#4F6EF7] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 11L7 3L12 11H2Z" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <span className="font-semibold text-sm">PromptLedger</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              AI spend intelligence for modern teams. Audit, optimize, and reduce your AI infrastructure costs.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-xs font-medium text-white/60 mb-3 uppercase tracking-wider">Product</p>
              <div className="space-y-2">
                {["Features", "How it Works", "Audit"].map((item) => (
                  <Link key={item} href="#" className="block text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-white/60 mb-3 uppercase tracking-wider">Company</p>
              <div className="space-y-2">
                {["About", "Privacy", "Terms"].map((item) => (
                  <Link key={item} href="#" className="block text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} PromptLedger. All rights reserved.</p>
          <p className="text-xs text-white/30">Built for AI-native teams.</p>
        </div>
      </div>
    </footer>
  );
}