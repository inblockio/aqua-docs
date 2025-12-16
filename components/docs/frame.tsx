interface FrameProps {
  src: string
  title?: string
  height?: number | string
  width?: string
}

export function Frame({ src, title = "Embedded content", height = 500, width = "100%" }: FrameProps) {
  return (
    <div className="my-6 rounded-xl border border-border overflow-hidden bg-muted/30">
      <iframe
        src={src}
        title={title}
        width={width}
        height={height}
        className="w-full"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  )
}
