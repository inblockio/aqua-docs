import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Icon } from "./icon"

interface CardProps {
  title: string
  description?: string
  href?: string
  icon?: string | React.ReactNode
  children?: React.ReactNode
  external?: boolean
}

export function Card({ title, description, href, icon, children, external = false }: CardProps) {
  const content = (
    <>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            {typeof icon === "string" ? <Icon icon={icon} size={20} /> : icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-foreground mb-1 no-underline ${href ? 'group-hover:text-primary transition-colors' : ''}`}>
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 no-underline">{description}</p>
          )}
          {children && (
            <div className="mt-2 text-sm text-muted-foreground no-underline">{children}</div>
          )}
        </div>
        {href && (
          <div className="shrink-0 self-start mt-1">
            {external ? (
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            )}
          </div>
        )}
      </div>
    </>
  )

  if (href) {
    const Component = external ? "a" : Link
    return (
      <Component
        href={href}
        className="card-link group block p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </Component>
    )
  }

  return (
    <div className="p-4 rounded-xl border border-border bg-muted/30 no-underline">
      {content}
    </div>
  )
}

interface CardGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3
}

export function CardGrid({ children, cols = 2 }: CardGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }

  return (
    <div className={`grid ${gridCols[cols]} gap-4 my-6`}>
      {children}
    </div>
  )
}
