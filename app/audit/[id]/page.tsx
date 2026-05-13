import type { Metadata } from "next";
import ResultsPage from "@/components/results/results-page";
import { buildAuditMetadata } from "@/lib/Metadata";
import { getAuditResult } from "@/lib/audits";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const audit = await getAuditResult(id);
    const toolNames = audit.toolResults.map((t) => t.currentTool);
    return buildAuditMetadata(id, audit.totalAnnualSavings, toolNames);
  } catch {
    // Audit not found or DB unavailable — fall back to graceful defaults
    return buildAuditMetadata(id, null, null);
  }
}

export default async function AuditResultPage({ params }: Props) {
  const { id } = await params;
  return <ResultsPage auditId={id} />;
}