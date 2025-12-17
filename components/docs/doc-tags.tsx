import { Tag } from "lucide-react"

interface DocTagsProps {
  tags: string[]
}

export function DocTags({ tags }: DocTagsProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-border">
      <Tag className="h-4 w-4 text-muted-foreground" />
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
