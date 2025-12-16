import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps {
  version: string
  slug: string
  title: string
}

export function Breadcrumb({ version, slug, title }: BreadcrumbProps) {
  const parts = slug.split("/")
  const breadcrumbs = [
    { label: "Docs", href: `/docs/${version}` },
  ]

  // Build breadcrumb path
  let currentPath = ""
  for (let i = 0; i < parts.length - 1; i++) {
    currentPath += (currentPath ? "/" : "") + parts[i]
    breadcrumbs.push({
      label: parts[i].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      href: `/docs/${version}/${currentPath}`,
    })
  }

  // Add current page
  breadcrumbs.push({
    label: title,
    href: `/docs/${version}/${slug}`,
  })

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-foreground transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
