import { Metadata } from "next"
import AnalyzePageClient from "./analyze-page-client"

export const metadata: Metadata = {
  title: "Forseti Scan - Token Analysis",
  description: "Detailed analysis of token metrics and security",
}

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AnalyzePage(props: PageProps) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams
  ])
  return <AnalyzePageClient params={params} />
}
