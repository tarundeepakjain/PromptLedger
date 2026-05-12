"use client";
import { useState } from "react";

export default function ShareButtons({ auditId }: { auditId: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/audit/${auditId}`
    : `/audit/${auditId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleTwitter = () => {
    const text = encodeURIComponent("Just audited our AI stack with @PromptLedger — found significant savings opportunities. Check yours:");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111214] p-5">
      <p className="text-sm font-medium mb-4">Share this audit</p>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-[#0A0A0B] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/40 font-mono truncate">
          {shareUrl}
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
            copied
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
              : "bg-white/[0.06] hover:bg-white/[0.10] text-white/70 border border-white/[0.08]"
          }`}
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 7L5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 4V2.5A1.5 1.5 0 015.5 1h5A1.5 1.5 0 0112 2.5v5A1.5 1.5 0 0110.5 9H9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleTwitter}
          className="flex-1 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-xs text-white/50 hover:text-white/80 transition-colors flex items-center justify-center gap-1.5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </button>
        <button
          onClick={handleLinkedIn}
          className="flex-1 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-xs text-white/50 hover:text-white/80 transition-colors flex items-center justify-center gap-1.5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Share on LinkedIn
        </button>
      </div>
    </div>
  );
}