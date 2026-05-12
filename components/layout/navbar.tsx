"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0A0A0B]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#4F6EF7] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L7 3L12 11H2Z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">PromptLedger</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Features", "How it works", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#audit"
            className="text-sm px-4 py-2 rounded-lg bg-[#4F6EF7] hover:bg-[#6B87FF] transition-colors font-medium"
          >
            Start Free Audit
          </Link>
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {open ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0A0A0B] px-6 py-4 space-y-3">
          {["Features", "How it works", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase().replace(/ /g, "-")}`}
              className="block text-sm text-white/50 hover:text-white transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/#audit"
            className="block text-sm px-4 py-2 rounded-lg bg-[#4F6EF7] hover:bg-[#6B87FF] transition-colors font-medium text-center mt-2"
            onClick={() => setOpen(false)}
          >
            Start Free Audit
          </Link>
        </div>
      )}
    </header>
  );
}