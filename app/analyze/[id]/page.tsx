import AnalyzePageClient from "./analyze-page-client"

type Props = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function AnalyzePage({ params }: Props) {
  return <AnalyzePageClient params={params} />
}
