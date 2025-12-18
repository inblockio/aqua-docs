import Link from "next/link"
import { ChevronRight, FileText } from "lucide-react"
import type { Doc } from "@/lib/mdx"
import { ReactNode } from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { remarkCodeMeta } from "@/lib/remark-code-meta"
import rehypeSlug from "rehype-slug"
import { mdxComponents } from "./mdx-components"
import { getConfig, processContentWithEnv } from "@/lib/config"
import { sortSidebarItems } from "@/lib/sidebar-utils"

interface CategoryIndexProps {
  categoryPath: string
  version: string
  allDocs: Doc[]
  title: string
  description?: string
  content?: string
}

export function CategoryIndex({ categoryPath, version, allDocs, title, description, content }: CategoryIndexProps) {
  // Find all docs that are direct children of this category
  const childDocs = allDocs.filter((doc) => {
    // Get the parent path of the doc
    const parts = doc.slug.split("/")
    const docParent = parts.slice(0, -1).join("/")

    // Check if this doc is a direct child of the category
    return docParent === categoryPath && doc.slug !== categoryPath
  })


  const config = getConfig();
  const processedContent = () => {
    if(content){
      return processContentWithEnv(content, config);
    }
    return "";
  };

  // Sort by sidebar_position using unified sorting function
  const sortedDocs = sortSidebarItems(childDocs)

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3 text-foreground">{title}</h1>
        {description && <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>}
        
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-base prose-p:leading-7 prose-p:text-muted-foreground prose-p:mb-4 prose-a:font-normal prose-a:transition-all prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px] prose-code:font-mono prose-code:border prose-code:border-border/50 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0 prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2 prose-ul:mb-4 prose-ol:list-decimal prose-ol:list-inside prose-ol:space-y-2 prose-ol:mb-4 prose-li:leading-7 prose-li:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold">
                <MDXRemote
                  source={processedContent()}
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

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedDocs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${version}/${doc.slug}`}
            className="group block p-5 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all duration-200"
            style={{
              textDecoration: "none !important"
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-6 w-6 text-primary shrink-0" />
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {doc.meta.title || doc.title}
                  </h3>
                </div>
                {doc.meta.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {doc.meta.description}
                  </p>
                )}
                {doc.meta.reading_time && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {doc.meta.reading_time} min read
                  </p>
                )}
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>

      {sortedDocs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No documents found in this category.</p>
        </div>
      )}
    </div>
  )
}
