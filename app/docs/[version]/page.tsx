import { redirect } from "next/navigation"
import { getAllDocs, getVersions } from "@/lib/mdx"

interface PageProps {
  params: Promise<{
    version: string
  }>
}

export async function generateStaticParams() {
  const versions = getVersions()
  return versions.map((version) => ({
    version,
  }))
}

export default async function VersionIndexPage({ params }: PageProps) {
  const { version } = await params
  const docs = await getAllDocs(version)

  if (docs.length === 0) {
    redirect("/docs/v1.0.0")
  }

  // Redirect to first doc
  redirect(`/docs/${version}/${docs[0].slug}`)
}
