"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-foreground">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 border-t border-border bg-background">
          <div className="prose prose-sm dark:prose-invert max-w-none [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface AccordionProps {
  children: React.ReactNode
  type?: "single" | "multiple"
}

export function Accordion({ children, type = "multiple" }: AccordionProps) {
  return (
    <div className="my-6 space-y-2">
      {children}
    </div>
  )
}
