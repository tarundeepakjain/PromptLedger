"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ToolSelector from "./tool-selector";
import ToolCard from "./tool-card";
import LoadingState from "./loading-state";

import { ToolUsage, FormState, UseCase } from "@/lib/types";

const STORAGE_KEY = "credex-audit-form";

const DEFAULT_PLANS: Record<string, string> = {
  Cursor: "Pro",
  GitHubCopilot: "Business",
  Claude: "Pro",
  ChatGPT: "Plus",
  Gemini: "Pro",
  Windsurf: "Pro",
  AnthropicAPI: "Sonnet4_6",
  OpenAIAPI: "GPT5_4",
  GeminiAPI: "Flash25",
};

const DEFAULT_FORM: FormState = {
  teamSize: 2,
  selectedTools: [],
  toolEntries: [],
};

export default function AuditForm() {
  const router = useRouter();

  const [step, setStep] = useState<"select" | "configure">("select");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const isMounted = useRef(false);

  // Read localStorage once at mount via lazy initializer — no setState in effect
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window === "undefined") return DEFAULT_FORM;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_FORM;
    } catch {
      return DEFAULT_FORM;
    }
  });

  // Persist to localStorage on every change (skip the initial mount write)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const handleToolsChange = (tools: string[]) => {
    const updatedEntries = tools.map((tool) => {
      const existing = form.toolEntries.find((e) => e.tool === tool);

      const isAPI =
        tool === "AnthropicAPI" ||
        tool === "OpenAIAPI" ||
        tool === "GeminiAPI";

      return (
        existing || {
          tool,
          plan: DEFAULT_PLANS[tool] || "Pro",
          monthlySpend: isAPI ? undefined : 0,
          seats: isAPI ? undefined : form.teamSize,
          inputTokens: isAPI ? 1 : undefined,
          outputTokens: isAPI ? 1 : undefined,
          useCase: "mixed" as UseCase,
        }
      );
    });

    setForm({
      ...form,
      selectedTools: tools,
      toolEntries: updatedEntries,
    });
  };

  const updateEntry = (idx: number, updated: ToolUsage) => {
    const entries = [...form.toolEntries];
    entries[idx] = updated;
    setForm({ ...form, toolEntries: entries });
  };

  const removeEntry = (idx: number) => {
    const entries = form.toolEntries.filter((_, i) => i !== idx);
    const tools = entries.map((e) => e.tool);
    setForm({ ...form, toolEntries: entries, selectedTools: tools });
  };

  const handleSubmit = async () => {
    if (form.toolEntries.length === 0) {
      setError("Please add at least one tool.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamSize: form.teamSize,
          email,
          tools: form.toolEntries,
        }),
      });

      if (!res.ok) throw new Error("Audit failed");

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Audit failed");

      localStorage.removeItem(STORAGE_KEY);
      router.push(`/audit/${data.data.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#111214] p-8">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111214] overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-white/[0.06]">
        {(["select", "configure"] as const).map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => form.selectedTools.length > 0 && setStep(s)}
            className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              step === s
                ? "text-white border-b-2 border-[#4F6EF7]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <span className="w-5 h-5 rounded-full border text-xs flex items-center justify-center border-current">
              {i + 1}
            </span>
            {s === "select" ? "Select Tools" : "Configure & Audit"}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {/* Team size */}
        <div className="mb-6">
          <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">
            Team Size
          </label>
          <input
            type="number"
            min={1}
            max={200}
            value={form.teamSize}
            onChange={(e) => setForm({ ...form, teamSize: Number(e.target.value) })}
            className="w-full bg-[#0A0A0B] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4F6EF7]/50"
            placeholder="Enter your team size"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0A0A0B] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4F6EF7]/50"
            placeholder="Enter your email"
          />
        </div>

        {/* Step: select */}
        {step === "select" && (
          <>
            <div className="mb-6">
              <label className="text-xs text-white/50 uppercase tracking-wider mb-3 block" suppressHydrationWarning>
                Select AI Tools ({form.selectedTools.length} selected)
              </label>
              <ToolSelector
                selected={form.selectedTools}
                onChange={handleToolsChange}
              />
            </div>

            <button
              type="button"
              disabled={form.selectedTools.length === 0}
              onClick={() => setStep("configure")}
              className="w-full py-3 rounded-xl bg-[#4F6EF7] hover:bg-[#6B87FF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              {form.selectedTools.length === 0
                ? "Select at least one tool"
                : `Configure ${form.selectedTools.length} tool${form.selectedTools.length > 1 ? "s" : ""} →`}
            </button>
          </>
        )}

        {/* Step: configure */}
        {step === "configure" && (
          <>
            <div className="mb-6 space-y-3">
              {form.toolEntries.map((entry, idx) => (
                <ToolCard
                  key={entry.tool}
                  entry={entry}
                  onChange={(updated) => updateEntry(idx, updated)}
                  onRemove={() => removeEntry(idx)}
                />
              ))}

              <button
                type="button"
                onClick={() => setStep("select")}
                className="w-full py-2.5 rounded-xl border border-dashed border-white/[0.12] text-sm text-white/40 hover:text-white/60 hover:border-white/20 transition-colors"
              >
                + Add more tools
              </button>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-[#4F6EF7] hover:bg-[#6B87FF] transition-colors font-medium text-sm"
            >
              Generate AI Spend Audit
            </button>
          </>
        )}
      </div>
    </div>
  );
}