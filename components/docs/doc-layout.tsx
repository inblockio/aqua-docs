import { ExternalLink, FileEdit } from "lucide-react"
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import { remarkCodeMeta } from "@/lib/remark-code-meta"
import { mdxComponents } from "./mdx-components"
import type { ComponentPropsWithoutRef } from "react"
import { DocNavigation } from "./doc-navigation"
import { Breadcrumb } from "./breadcrumb"
import { DocMetadata } from "./doc-metadata"
import { DraftBadge } from "./draft-badge"
import { DocTags } from "./doc-tags"
import { SearchHighlight } from "./search-highlight"
import type { DocMeta } from "@/lib/mdx"
import { getConfig, processContentWithEnv } from "@/lib/config"

interface DocLayoutProps {
  meta: DocMeta
  content: string
  previousDoc?: {
    title: string
    slug: string
  }
  nextDoc?: {
    title: string
    slug: string
  }
  version: string
  slug: string
}

export async function DocLayout({ content, meta, previousDoc, nextDoc, version, slug }: DocLayoutProps) {
  const isDevelopment = process.env.NODE_ENV === "development"
  const config = getConfig()

  // Process content with environment variables
  const processedContent = processContentWithEnv(content, config)

  // Build edit URL if configured
  const editUrl = config.features?.editUrl && typeof config.features.editUrl === 'string'
    ? `${config.features.editUrl}/${version}/${slug}.mdx`
    : null

  return (
    <article className="flex-1 min-w-0">
      <SearchHighlight />

      {config.navigation?.showBreadcrumbs && (
        <Breadcrumb version={version} slug={slug} title={meta.title} />
      )}

      {isDevelopment && meta.draft && <DraftBadge />}

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3 text-foreground">{meta.title}</h1>
        {meta.description && <p className="text-lg text-muted-foreground leading-relaxed">{meta.description}</p>}
      </div>

      <DocMetadata meta={meta} />

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-base prose-p:leading-7 prose-p:text-muted-foreground prose-p:mb-4 prose-a:font-normal prose-a:transition-all prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px] prose-code:font-mono prose-code:border prose-code:border-border/50 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0 prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2 prose-ul:mb-4 prose-ol:list-decimal prose-ol:list-inside prose-ol:space-y-2 prose-ol:mb-4 prose-li:leading-7 prose-li:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold">
        <MDXRemote
          source={processedContent}
          options={{
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkCodeMeta],
              rehypePlugins: [rehypeSlug],
              development: false,
            },
          }}
          components={mdxComponents as any}
        />
      </div>

      {config.features?.showTags && meta.tags && meta.tags.length > 0 && <DocTags tags={meta.tags} />}

      {(editUrl || config.social?.github) && (
        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
          {editUrl ? (
            <a
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileEdit className="h-4 w-4" />
              Edit this page
            </a>
          ) : <div />}
          {config.social?.github && (
            <a
              href={`${config.social.github}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Report an issue
            </a>
          )}
        </div>
      )}

      <DocNavigation previousDoc={previousDoc} nextDoc={nextDoc} version={version} />
    </article>
  )
}
