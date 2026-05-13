"use client";
import { useState } from "react";

interface Props {
  teamSize?: number;
  monthlySavings?: number;
  annualSavings?: number;
}

export default function LeadForm({ teamSize = 5, monthlySavings = 0, annualSavings = 0 }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", companyName: "", role: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.companyName) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          teamSize,
          monthlySavings,
          annualSavings,
          auditUrl: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
          <p className="font-semibold text-white mb-1">Audit confirmation sent</p>
          <p className="text-sm text-white/50">Your audit summary and shareable report link are on the way.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111214] p-6">
      <div className="mb-5">
        <p className="font-semibold text-white mb-1">Get your audit confirmation</p>
        <p className="text-sm text-white/50">We&apos;ll email your audit summary and private shareable report link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Work email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-[#0A0A0B] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4F6EF7]/50"
        />
        <input
          type="text"
          placeholder="Company name"
          required
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className="w-full bg-[#0A0A0B] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4F6EF7]/50"
        />
        <input
          type="text"
          placeholder="Your role (e.g. CTO, Founder)"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full bg-[#0A0A0B] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4F6EF7]/50"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-[#4F6EF7] hover:bg-[#6B87FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          {loading ? "Sending..." : "Email my audit report →"}
        </button>

        <p className="text-xs text-white/30 text-center">No spam. Unsubscribe anytime.</p>
      </form>
    </div>
  );
}