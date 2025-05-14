import AnalyzePageClient from "./analyze-page-client"

type PageProps = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function AnalyzePage(props: PageProps) {
  return <AnalyzePageClient params={props.params} />
}
