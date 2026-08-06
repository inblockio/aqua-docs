import { redirect } from "next/navigation"
import { getCachedVersions, getCachedAllDocs } from "specra/lib"

interface PageProps {
  params: Promise<{
    version: string
  }>
}

export async function generateStaticParams() {
  const versions = getCachedVersions()
  return versions.map((version) => ({
    version,
  }))
}

export default async function VersionIndexPage({ params }: PageProps) {
  const { version } = await params

  // Every /docs/v4.0.0/* URL renders the teaser and declares /docs/v4.0.0/welcome
  // as its canonical. Send the bare version index straight there instead of
  // falling through to the first MDX doc, so the entry point matches the canonical.
  if (version === "v4.0.0") {
    redirect("/docs/v4.0.0/welcome")
  }

  const docs = await getCachedAllDocs(version)

  if (docs.length === 0) {
    redirect("/docs/v1.0.0")
  }

  // Redirect to first doc
  redirect(`/docs/${version}/${docs[0].slug}`)
}
