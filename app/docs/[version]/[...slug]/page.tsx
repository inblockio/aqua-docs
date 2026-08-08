import type { Metadata } from "next"
import { Suspense } from "react"
import {
  extractTableOfContents,
  getAdjacentDocs,
  isCategoryPage,
  getCachedVersions,
  getCachedAllDocs,
  getCachedDocBySlug,
  getConfig,
  SpecraConfig,
} from "specra/lib"
import {
  // DocLayout,
  TableOfContents,
  Header,
  DocLayoutWrapper,
  HotReloadIndicator,
  DevModeBadge,
  MdxHotReload,
  // CategoryIndex,
  NotFoundContent,
  DocLoading,
} from "specra/components"

import specraConfig from "./../../../../specra.config.json"
import { CategoryIndex, DocLayout } from "specra/layouts"
import { mdxComponents } from "specra/mdx-components"

interface PageProps {
  params: Promise<{
    version: string
    slug: string[]
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { version, slug: slugArray } = await params
  const slug = slugArray.join("/")

  const doc = await getCachedDocBySlug(slug, version)

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
  const versions = getCachedVersions()
  const params = []

  for (const version of versions) {
    const docs = await getCachedAllDocs(version)
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

  const allDocs = await getCachedAllDocs(version)
  const versions = getCachedVersions()
  const config = getConfig()
  const isCategory = isCategoryPage(slug, allDocs)

  // Try to get the doc (might be index.mdx or regular .mdx)
  const doc = await getCachedDocBySlug(slug, version)

  // If no doc found and it's a category, show category index
  if (!doc && isCategory) {
    // Find a doc in this category to get the tab group
    const categoryDoc = allDocs.find((d) => d.slug.startsWith(slug + "/"))
    const categoryTabGroup = categoryDoc?.meta?.tab_group || categoryDoc?.categoryTabGroup

    return (
      <>
        <DocLayoutWrapper
          header={<Header currentVersion={version} versions={versions} config={config} />}
          docs={allDocs}
          version={version}
          children={
            <CategoryIndex
              categoryPath={slug}
              version={version}
              allDocs={allDocs}
              title={slug.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Category"}
              description="Browse the documentation in this section."
              config={config}
              mdxComponents={mdxComponents}
            />
          }
          toc={<div />}
          config={config}
          currentPageTabGroup={categoryTabGroup}
        />
        <MdxHotReload />
        <HotReloadIndicator />
        <DevModeBadge />
      </>
    )
  }

  // If no doc found, render 404 content within the layout (keeps sidebar visible)
  if (!doc) {
    return (
      <>
        <Suspense fallback={<DocLoading />}>
          <DocLayoutWrapper
            header={<Header currentVersion={version} versions={versions} config={config} />}
            docs={allDocs}
            version={version}
            children={<NotFoundContent version={version} />}
            toc={<div />}
            config={config}
            currentPageTabGroup={undefined}
          />
          <MdxHotReload />
          <HotReloadIndicator />
          <DevModeBadge />
        </Suspense>
      </>
    )
  }

  const toc = extractTableOfContents(doc.content)
  const { previous, next } = getAdjacentDocs(slug, allDocs)

  // console.log("[v0] Extracted ToC:", toc)

  // If doc exists but is also a category, show both content and children
  const showCategoryIndex = isCategory && doc

  // console.log("showCategoryIndex: ", showCategoryIndex)

  // Get current page's tab group from doc metadata or category
  const currentPageTabGroup = doc.meta?.tab_group || doc.categoryTabGroup

  return (
    <>
      <Suspense fallback={<DocLoading />}>
        <DocLayoutWrapper
          header={<Header currentVersion={version} versions={versions} config={config} />}
          docs={allDocs}
          version={version}
          children={
            showCategoryIndex ? (
              <CategoryIndex
                categoryPath={slug}
                version={version}
                allDocs={allDocs}
                title={doc.meta.title}
                description={doc.meta.description}
                content={doc.content}
                config={config}
                mdxComponents={mdxComponents}
              />
            ) : (
              <DocLayout
                meta={doc.meta}
                content={doc.content}
                previousDoc={previous ? { title: previous.meta.title, slug: previous.slug } : undefined}
                nextDoc={next ? { title: next.meta.title, slug: next.slug } : undefined}
                version={version}
                slug={slug}
                config={config}
                mdxComponents={mdxComponents}
              />
            )
          }
          toc={showCategoryIndex ? <div /> : <TableOfContents key={'full'} items={toc} config={config} />}
          config={config}
          currentPageTabGroup={currentPageTabGroup}
        />
        <MdxHotReload />
        <HotReloadIndicator />
        <DevModeBadge />
      </Suspense>
    </>
  )
}
