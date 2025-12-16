import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getDocBySlug, getAllDocs, extractTableOfContents, getAdjacentDocs, isCategoryPage } from "@/lib/mdx"
import { DocLayout } from "@/components/docs/doc-layout"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { Header } from "@/components/docs/header"
import { Sidebar } from "@/components/docs/sidebar"
import { getVersions } from "@/lib/mdx"
import { MobileDocLayout } from "@/components/docs/mobile-doc-layout"
import { HotReloadIndicator } from "@/components/docs/hot-reload-indicator"
import { DevModeBadge } from "@/components/docs/dev-mode-badge"
import { MdxHotReload } from "@/components/docs/mdx-hot-reload"
import { CategoryIndex } from "@/components/docs/category-index"
import { getConfig } from "@/lib/config"
import { Suspense } from "react"
import { DocLoading } from "@/components/docs/doc-loading"
interface PageProps {
  params: Promise<{
    version: string
    slug: string[]
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { version, slug: slugArray } = await params
  const slug = slugArray.join("/")

  const doc = await getDocBySlug(slug, version)

  if (!doc) {
    return {
      title: "Page Not Found",
      description: "The requested documentation page could not be found.",
    }
  }

  const title = doc.meta.title || doc.title
  const description = doc.meta.description || `Documentation for ${title}`
  const url = `/docs/${version}/${slug}`

  return {
    title: `${title}`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Documentation Platform",
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

export async function generateStaticParams() {
  const versions = getVersions()
  const params = []

  for (const version of versions) {
    const docs = await getAllDocs(version)
    for (const doc of docs) {
      // Add the custom slug path
      params.push({
        version,
        slug: doc.slug.split("/").filter(Boolean),
      })
    }
  }

  return params
}

export default async function DocPage({ params }: PageProps) {
  const { version, slug: slugArray } = await params
  const slug = slugArray.join("/")

  const allDocs = await getAllDocs(version)
  const versions = getVersions()
  const config = getConfig()
  const isCategory = isCategoryPage(slug, allDocs)

  // Try to get the doc (might be index.mdx or regular .mdx)
  const doc = await getDocBySlug(slug, version)

  // If no doc found and it's a category, show category index
  if (!doc && isCategory) {
    return (
      <>
        <MobileDocLayout
          header={<Header currentVersion={version} versions={versions} config={config} />}
          sidebar={<Sidebar docs={allDocs} version={version} config={config} />}
          content={
            <CategoryIndex
              categoryPath={slug}
              version={version}
              allDocs={allDocs}
              title={slug.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Category"}
              description="Browse the documentation in this section."
            />
          }
          toc={<div />}
          config={config}
        />
        <MdxHotReload />
        <HotReloadIndicator />
        <DevModeBadge />
      </>
    )
  }

  if (!doc) {
    notFound()
  }

  const toc = extractTableOfContents(doc.content)
  const { previous, next } = getAdjacentDocs(slug, allDocs)

  console.log("[v0] Extracted ToC:", toc)

  // If doc exists but is also a category, show both content and children
  const showCategoryIndex = isCategory && doc

  console.log("showCategoryIndex: ", showCategoryIndex)

  return (
    <>
      <Suspense fallback={<DocLoading />}>
        <MobileDocLayout
          header={<Header currentVersion={version} versions={versions} config={config} />}
          sidebar={<Sidebar docs={allDocs} version={version} config={config} />}
          content={
            showCategoryIndex ? (
              <CategoryIndex
                categoryPath={slug}
                version={version}
                allDocs={allDocs}
                title={doc.meta.title}
                description={doc.meta.description}
                content={doc.content}
              />
            ) : (
              <DocLayout
                meta={doc.meta}
                content={doc.content}
                previousDoc={previous ? { title: previous.meta.title, slug: previous.slug } : undefined}
                nextDoc={next ? { title: next.meta.title, slug: next.slug } : undefined}
                version={version}
                slug={slug}
              />
            )
          }
          toc={showCategoryIndex ? <div /> : <TableOfContents items={toc} config={config} />}
          config={config}
        />
        <MdxHotReload />
        <HotReloadIndicator />
        <DevModeBadge />
      </Suspense>
    </>
  )
}
