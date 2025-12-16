"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, FileText, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type { SpecraConfig } from "@/lib/config"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

interface SearchResult {
  id: string
  title: string
  content: string
  slug: string
  version: string
  category?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  config: SpecraConfig
}

export function SearchModal({ isOpen, onClose, config }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const searchConfig = config.search

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || !searchConfig?.enabled) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          // filter: 'version = "v1.0.0"',
          distinct: "version",
          limit: 2
        }),
      })


      if (response.ok) {
        const data = await response.json()
        console.log("Search response:", data)
        setResults(data.hits || [])
      } else {
        console.error("Search failed:", response.status, await response.text())
      }
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [searchConfig])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  const handleResultClick = (result: SearchResult) => {
    // Add search query as URL parameter for highlighting
    const url = `/docs/${result.version}/${result.slug}?q=${encodeURIComponent(query)}`
    router.push(url)
    onClose()
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-foreground">{part}</mark>
        : part
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent
        className="max-w-2xl p-0 gap-0 top-[10vh] translate-y-0"
        showCloseButton={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchConfig?.placeholder || "Search documentation..."}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          {isLoading && <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && !isLoading && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-l-2 ${index === selectedIndex
                      ? "bg-muted/50 border-primary"
                      : "border-transparent"
                    }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground mb-1">
                        {highlightText(result.title, query)}
                      </div>
                      {result.content && (
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {highlightText(result.content, query)}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{result.version}</span>
                        {result.category && (
                          <>
                            <span>•</span>
                            <span>{result.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="px-4 py-8 text-center text-muted-foreground text-sm">
              <p>Start typing to search documentation...</p>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                <kbd className="px-2 py-1 bg-muted rounded border border-border">↑↓</kbd>
                <span>Navigate</span>
                <kbd className="px-2 py-1 bg-muted rounded border border-border">Enter</kbd>
                <span>Select</span>
                <kbd className="px-2 py-1 bg-muted rounded border border-border">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
