import ResultsPage from "@/components/results/results-page";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AuditResultPage({ params }: Props) {
  const { id } = await params;
  return <ResultsPage auditId={id} />;
}