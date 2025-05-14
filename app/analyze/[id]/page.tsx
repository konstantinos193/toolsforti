import { Metadata } from "next"
import AnalyzePageClient from "./analyze-page-client"

export const metadata: Metadata = {
  title: "Token Analysis",
  description: "Detailed analysis of token metrics and security",
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function AnalyzePage({ params }: Props) {
  return <AnalyzePageClient params={params} />
}
