import NextImage from "next/image"
import Link from "next/link"

interface ImageCardProps {
  src: string
  alt: string
  title?: string
  description?: string
  href?: string
  external?: boolean
  aspectRatio?: "square" | "video" | "portrait"
}

export function ImageCard({
  src,
  alt,
  title,
  description,
  href,
  external = false,
  aspectRatio = "video",
}: ImageCardProps) {
  const aspectRatios = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  }

  const content = (
    <div className="flex flex-col gap-0 p-0">
      <div className={`w-full ${aspectRatios[aspectRatio]} overflow-hidden ${(title || description) ? 'rounded-t-xl' : 'rounded-xl'} bg-muted relative`}>
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {(title || description) && (
        <div className="p-3 flex flex-col gap-1">
          {title && (
            <h3 className={`font-semibold text-foreground mb-0 no-underline ${href ? 'group-hover:text-primary transition-colors' : ''}`}>
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 no-underline mb-0">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )

  if (href) {
    const Component = external ? "a" : Link
    return (
      <Component
        href={href}
        className="image-card-link group block rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden p-0"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </Component>
    )
  }

  return (
    <div className="block rounded-xl border border-border overflow-hidden bg-card p-0">
      {content}
    </div>
  )
}

interface ImageCardGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
}

export function ImageCardGrid({ children, cols = 3 }: ImageCardGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${gridCols[cols]} gap-4 my-6`}>
      {children}
    </div>
  )
}
