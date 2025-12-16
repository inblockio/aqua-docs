import { FileWarning } from "lucide-react"

export function DraftBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-4">
      <FileWarning className="h-4 w-4" />
      <span>Draft - Not visible in production</span>
    </div>
  )
}
