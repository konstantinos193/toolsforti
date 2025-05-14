import { Metadata } from "next"
import AnalyzePageClient from "./analyze-page-client"

export const metadata: Metadata = {
  title: "Token Analysis",
  description: "Detailed analysis of token metrics and security",
}

export default async function AnalyzePage({
  params,
}: {
  params: { id: string }
}) {
  // Ensure params is resolved before passing to client component
  const resolvedParams = await Promise.resolve(params)
  return <AnalyzePageClient params={resolvedParams} />
}
