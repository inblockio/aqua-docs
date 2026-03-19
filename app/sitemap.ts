import type { MetadataRoute } from "next"
import { getCachedVersions, getCachedAllDocs } from "specra/lib"

export const dynamic = "force-static"

const BASE_URL = "https://aqua-protocol.org"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  ]

  const versions = getCachedVersions()
  for (const version of versions) {
    if (version === "v4.0.0") continue
    const docs = await getCachedAllDocs(version)
    for (const doc of docs) {
      entries.push({
        url: `${BASE_URL}/docs/${version}/${doc.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      })
    }
  }

  return entries
}
