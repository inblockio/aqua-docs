import type { ReactNode } from "react"
import { CodeBlock } from "./code-block"
import { Callout } from "./callout"
import { Accordion, AccordionItem } from "./accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"
import { Image } from "./image"
import { Video } from "./video"
import { Card, CardGrid } from "./card"
import { ImageCard, ImageCardGrid } from "./image-card"
import { Steps, Step } from "./steps"
import { Icon } from "./icon"
import { Mermaid } from "./mermaid"
import { Math } from "./math"
import { Columns, Column } from "./columns"
import { Badge } from "./badge"
import { Banner } from "./banner"
import { Tooltip } from "./tooltip"
import { Frame } from "./frame"

export const mdxComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-bold tracking-tight mb-6 text-foreground">{children}</h1>
  ),
  h2: ({ children, id }: { children: ReactNode; id?: string }) => (
    <h2 id={id} className="text-3xl font-semibold tracking-tight mt-12 mb-4 text-foreground scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children, id }: { children: ReactNode; id?: string }) => (
    <h3 id={id} className="text-2xl font-semibold tracking-tight mt-8 mb-3 text-foreground scroll-mt-24">
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-7 text-muted-foreground mb-4">{children}</p>
  ),
  code: ({ children, className, meta, ...props }: { children: ReactNode; className?: string; meta?: string; [key: string]: any }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-muted/50 text-primary font-mono text-[13px] border border-border/50">
          {children}
        </code>
      )
    }
    
    // Extract language from className
    const language = className?.replace("language-", "") || "text"
    
    // Use meta string as filename if provided
    const filename = meta || undefined
    
    const code = String(children).replace(/\n$/, "")

    return <CodeBlock code={code} language={language} filename={filename} />
  },
  pre: ({ children }: { children: ReactNode }) => <>{children}</>,
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => <li className="leading-7">{children}</li>,
  a: ({ children, href }: { children: ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-primary hover:underline font-medium"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children: ReactNode }) => {
    // Check if this is a GitHub-style alert blockquote
    const childrenArray = Array.isArray(children) ? children : [children]
    const firstChild = childrenArray[0]

    // Extract text content from the blockquote
    let textContent = ""
    if (firstChild && typeof firstChild === "object" && "props" in firstChild) {
      const props = (firstChild as any).props
      if (props.children) {
        const text = Array.isArray(props.children) ? props.children.join("") : String(props.children)
        textContent = text
      }
    }

    // Check for alert patterns like [!INFO], [!WARNING], etc.
    const alertMatch = textContent.match(/^\[!(INFO|TIP|WARNING|SUCCESS|ERROR)\]/)

    if (alertMatch) {
      const type = alertMatch[1].toLowerCase() as "info" | "tip" | "warning" | "success" | "error"

      // Extract the content after the alert marker
      const processChildren = (node: any): any => {
        if (typeof node === "string") {
          return node.replace(/^\[!(INFO|TIP|WARNING|SUCCESS|ERROR)\]\s*\n?/, "")
        }
        if (node && typeof node === "object" && "props" in node) {
          return {
            ...node,
            props: {
              ...node.props,
              children: Array.isArray(node.props.children)
                ? node.props.children.map(processChildren)
                : processChildren(node.props.children),
            },
          }
        }
        return node
      }

      const cleanedChildren = Array.isArray(children) ? children.map(processChildren) : processChildren(children)

      return <Callout type={type}>{cleanedChildren}</Callout>
    }

    // Regular blockquote
    return (
      <blockquote className="border-l-4 border-primary/50 bg-muted/30 pl-4 pr-4 py-3 my-6 rounded-r-lg">
        <div className="text-muted-foreground italic [&>p]:mb-0">{children}</div>
      </blockquote>
    )
  },
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-border">
      <table className="min-w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="border-b border-r border-border bg-muted px-4 py-2 text-left font-semibold text-foreground last:border-r-0">{children}</th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border-b border-r border-border px-4 py-2 text-muted-foreground last:border-r-0">{children}</td>
  ),
  // Custom components
  Callout,
  Accordion,
  AccordionItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Image,
  Video,
  Card,
  CardGrid,
  ImageCard,
  ImageCardGrid,
  Steps,
  Step,
  Icon,
  Mermaid,
  Math,
  Columns,
  Column,
  Badge,
  Banner,
  Tooltip,
  Frame,
}
