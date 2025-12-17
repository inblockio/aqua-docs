import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DocNavigationProps {
  previousDoc?: {
    title: string
    slug: string
  }
  nextDoc?: {
    title: string
    slug: string
  }
  version: string
}

export function DocNavigation({ previousDoc, nextDoc, version }: DocNavigationProps) {
  if (!previousDoc && !nextDoc) return null

  return (
    <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 gap-4">
      {previousDoc ? (
        <Link
          href={`/docs/${version}/${previousDoc.slug}`}
          className="group flex flex-col gap-2 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
          style={{
            textDecoration: "none !important"
          }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </div>
          <div className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
            {previousDoc.title}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextDoc ? (
        <Link
          href={`/docs/${version}/${nextDoc.slug}`}
          className="group flex flex-col gap-2 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-right"
          style={{
            textDecoration: "none !important"
          }}
        >
          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </div>
          <div className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
            {nextDoc.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
