"use client"

import { useEffect, useState } from "react"
import type { SpecraConfig } from "@/lib/config"

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
  config: SpecraConfig
}

export function TableOfContents({ items, config }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  
  // Check if TOC should be shown
  if (!config.navigation?.showTableOfContents) {
    return null
  }
  
  // Filter items by max depth
  const maxDepth = config.navigation?.tocMaxDepth || 3
  const filteredItems = items.filter(item => item.level <= maxDepth)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -80% 0px" },
    )

    filteredItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [filteredItems])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      
      // Update URL without jumping
      window.history.replaceState(null, "", `#${id}`)
      
      // Manually set active ID after scroll
      setActiveId(id)
    }
  }

  return (
    <aside className="w-64 hidden xl:block shrink-0 sticky top-24 self-start">
      {filteredItems.length > 0 && (
        <div className="max-h-[calc(100vh-7rem)] overflow-y-auto">
          <h3 className="text-sm font-semibold text-foreground mb-4">On this page</h3>
          <nav className="space-y-2">
            {filteredItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block text-sm transition-colors cursor-pointer ${item.level === 3 ? "pl-4" : ""} ${
                  activeId === item.id
                    ? "text-primary font-medium border-l-2 border-primary pl-3"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </aside>
  )
}
