import { Clock, Calendar, User } from "lucide-react"
import type { DocMeta } from "@/lib/mdx"
import { getConfig } from "@/lib/config"

interface DocMetadataProps {
  meta: DocMeta
}

export function DocMetadata({ meta }: DocMetadataProps) {
  // Server component - can use getConfig directly
  const config = getConfig()
  
  const showReadingTime = config.features?.showReadingTime && meta.reading_time
  const showLastUpdated = config.features?.showLastUpdated && meta.last_updated
  const showAuthors = config.features?.showAuthors && meta.authors?.length
  
  const hasMetadata = showReadingTime || showLastUpdated || showAuthors

  if (!hasMetadata) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-4 mb-6">
      {showReadingTime && (
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{meta.reading_time} min read</span>
        </div>
      )}
      
      {showLastUpdated && meta.last_updated && (
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>Updated {new Date(meta.last_updated).toLocaleDateString()}</span>
        </div>
      )}
      
      {showAuthors && (
        <div className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          <span>
            {meta.authors!.map((author, idx) => (
              <span key={author.id}>
                {author.name || author.id}
                {idx < meta.authors!.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  )
}
