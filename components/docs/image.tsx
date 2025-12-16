"use client"

import NextImage from "next/image"
import { useState } from "react"
import { ZoomIn, X } from "lucide-react"

interface ImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  zoom?: boolean
}

export function Image({ src, alt, caption, width, height, zoom = true }: ImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <figure className="my-6">
        <div className="relative group rounded-xl border border-border overflow-hidden bg-muted/30">
          <NextImage
            src={src}
            alt={alt}
            width={width || 1200}
            height={height || 675}
            className="w-full h-auto"
          />
          {zoom && (
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute top-3 right-3 p-2 rounded-md bg-background/80 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Zoom image"
            >
              <ZoomIn className="h-4 w-4 text-foreground" />
            </button>
          )}
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
          <div className="max-w-7xl max-h-[90vh] overflow-auto">
            <NextImage
              src={src}
              alt={alt}
              width={width || 1920}
              height={height || 1080}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  )
}
