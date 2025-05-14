import { Metadata } from "next"
import AnalyzePageClient from "./analyze-page-client"

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: "Token Analysis",
  description: "Detailed analysis of token metrics and security",
}

export default function AnalyzePage({ params }: PageProps) {
  return <AnalyzePageClient params={params} />
}
