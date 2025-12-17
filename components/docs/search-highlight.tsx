"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function SearchHighlight() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  useEffect(() => {
    if (!query) {
      // Remove any existing highlights
      document.querySelectorAll("mark.search-highlight").forEach((mark) => {
        const parent = mark.parentNode
        if (parent) {
          parent.replaceChild(document.createTextNode(mark.textContent || ""), mark)
          parent.normalize()
        }
      })
      return
    }

    // Wait for content to load
    const timeout = setTimeout(() => {
      highlightSearchTerm(query)
    }, 100)

    return () => {
      clearTimeout(timeout)
      // Cleanup highlights on unmount
      document.querySelectorAll("mark.search-highlight").forEach((mark) => {
        const parent = mark.parentNode
        if (parent) {
          parent.replaceChild(document.createTextNode(mark.textContent || ""), mark)
          parent.normalize()
        }
      })
    }
  }, [query])

  return null
}

function highlightSearchTerm(searchTerm: string) {
  // Remove existing highlights first
  document.querySelectorAll("mark.search-highlight").forEach((mark) => {
    const parent = mark.parentNode
    if (parent) {
      parent.replaceChild(document.createTextNode(mark.textContent || ""), mark)
      parent.normalize()
    }
  })

  // Only highlight in the main content area
  const contentArea = document.querySelector("main") || document.body
  
  const walker = document.createTreeWalker(
    contentArea,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Skip if parent is already a mark, script, style, or code element
        const parent = node.parentElement
        if (!parent) return NodeFilter.FILTER_REJECT
        
        const tagName = parent.tagName.toLowerCase()
        if (["mark", "script", "style", "code", "pre"].includes(tagName)) {
          return NodeFilter.FILTER_REJECT
        }
        
        // Check if text contains the search term
        if (node.textContent && node.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
          return NodeFilter.FILTER_ACCEPT
        }
        
        return NodeFilter.FILTER_REJECT
      }
    }
  )

  const nodesToHighlight: { node: Text; text: string }[] = []
  let currentNode: Node | null

  while ((currentNode = walker.nextNode())) {
    if (currentNode.textContent) {
      nodesToHighlight.push({
        node: currentNode as Text,
        text: currentNode.textContent
      })
    }
  }

  // Highlight all found nodes
  nodesToHighlight.forEach(({ node, text }) => {
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, "gi")
    const parts = text.split(regex)
    
    if (parts.length > 1) {
      const fragment = document.createDocumentFragment()
      
      parts.forEach((part) => {
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
          const mark = document.createElement("mark")
          mark.className = "search-highlight bg-yellow-200 dark:bg-yellow-900/50 text-foreground px-1 rounded"
          mark.textContent = part
          fragment.appendChild(mark)
        } else if (part) {
          fragment.appendChild(document.createTextNode(part))
        }
      })
      
      node.parentNode?.replaceChild(fragment, node)
    }
  })

  // Scroll to first highlight
  const firstHighlight = document.querySelector("mark.search-highlight")
  if (firstHighlight) {
    setTimeout(() => {
      firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 200)
  }
}

function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
