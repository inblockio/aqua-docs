import { getAllDocs, getVersions } from "./mdx"

export interface RedirectMapping {
  from: string
  to: string
}

/**
 * Build redirect mappings from all docs' redirect_from frontmatter
 */
export async function buildRedirectMappings(): Promise<RedirectMapping[]> {
  const versions = getVersions()
  const redirects: RedirectMapping[] = []

  for (const version of versions) {
    const docs = await getAllDocs(version)
    
    for (const doc of docs) {
      if (doc.meta.redirect_from && Array.isArray(doc.meta.redirect_from)) {
        for (const oldPath of doc.meta.redirect_from) {
          redirects.push({
            from: oldPath,
            to: `/docs/${version}/${doc.slug}`,
          })
        }
      }
    }
  }

  return redirects
}

/**
 * Find redirect destination for a given path
 */
export async function findRedirect(path: string): Promise<string | null> {
  const redirects = await buildRedirectMappings()
  const redirect = redirects.find((r) => r.from === path)
  return redirect ? redirect.to : null
}
