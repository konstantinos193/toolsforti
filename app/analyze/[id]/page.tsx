import { Metadata } from "next"
import AnalyzePageClient from "./analyze-page-client"

export const metadata: Metadata = {
  title: "Token Analysis",
  description: "Detailed analysis of token metrics and security",
}

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function AnalyzePage(props: PageProps) {
  const params = await props.params
  return <AnalyzePageClient params={params} />
}
