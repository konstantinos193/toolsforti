import { Metadata } from "next"
import AnalyzePageClient from "./analyze-page-client"

export const metadata: Metadata = {
  title: "Token Analysis",
  description: "Detailed analysis of token metrics and security",
}

export default function AnalyzePage({
  params,
}: {
  params: { id: string }
}) {
  return <AnalyzePageClient params={params} />
}
