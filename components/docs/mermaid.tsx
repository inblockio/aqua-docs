"use client"

import { useEffect, useRef, useState } from "react"

interface MermaidProps {
  chart: string
  caption?: string
}

export function Mermaid({ chart, caption }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const renderChart = async () => {
      try {
        // Dynamically import mermaid
        const mermaid = (await import("mermaid")).default

        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "inherit",
        })

        if (containerRef.current) {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
          const { svg } = await mermaid.render(id, chart)
          containerRef.current.innerHTML = svg
        }
      } catch (err) {
        console.error("Mermaid rendering error:", err)
        setError(err instanceof Error ? err.message : "Failed to render diagram")
      }
    }

    renderChart()

    // Re-render on theme change
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          renderChart()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [chart])

  if (error) {
    return (
      <div className="my-6 p-4 rounded-xl border border-red-500/50 bg-red-500/10">
        <p className="text-sm text-red-600 dark:text-red-400 font-mono">
          Mermaid Error: {error}
        </p>
      </div>
    )
  }

  return (
    <figure className="my-6">
      <div
        ref={containerRef}
        className="flex justify-center items-center p-6 rounded-xl border border-border bg-muted/30 overflow-x-auto"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
