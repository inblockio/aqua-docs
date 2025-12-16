"use client"

import { useEffect, useRef } from "react"

interface MathProps {
  children: string
  block?: boolean
}

export function Math({ children, block = false }: MathProps) {
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null)

  useEffect(() => {
    const renderMath = async () => {
      try {
        // Dynamically import KaTeX
        const katex = (await import("katex")).default

        if (containerRef.current) {
          katex.render(children, containerRef.current, {
            throwOnError: false,
            displayMode: block,
          })
        }
      } catch (err) {
        console.error("KaTeX rendering error:", err)
        if (containerRef.current) {
          containerRef.current.textContent = children
        }
      }
    }

    renderMath()
  }, [children, block])

  if (block) {
    return (
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="my-6 overflow-x-auto text-center"
      />
    )
  }

  return <span ref={containerRef as React.RefObject<HTMLSpanElement>} className="inline-block" />
}
