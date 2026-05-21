"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  auditId: string;
}

export default function ReauditButton({ auditId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReaudit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/audit/reaudit/${auditId}`);
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Failed to refresh audit");
      }
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Refresh failed");
      router.push(`/audit/${auditId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleReaudit}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
          loading
            ? "bg-[#4F6EF7]/40 text-white/50 cursor-not-allowed"
            : "bg-[#4F6EF7] hover:bg-[#6B87FF] text-white shadow-[0_0_24px_rgba(79,110,247,0.2)] hover:shadow-[0_0_32px_rgba(79,110,247,0.35)]"
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 10" strokeLinecap="round" />
            </svg>
            Refreshing…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7C2 4.24 4.24 2 7 2C8.52 2 9.88 2.64 10.85 3.65M12 7C12 9.76 9.76 12 7 12C5.48 12 4.12 11.36 3.15 10.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 1.5V4H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 12.5V10H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Apply Updates
          </>
        )}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}