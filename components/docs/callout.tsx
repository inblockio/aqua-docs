"use client"

import type { ReactNode } from "react"
import { Info, AlertTriangle, CheckCircle2, XCircle, Lightbulb } from "lucide-react"

interface CalloutProps {
  children: ReactNode
  type?: "info" | "warning" | "success" | "error" | "tip" | "note" | "danger"
}

export function Callout({ children, type = "info" }: CalloutProps) {
  const configs = {
    info: {
      icon: Info,
      className: "bg-blue-500/10 border-blue-500/30 text-blue-900 dark:bg-blue-400/5 dark:border-blue-500/20 dark:text-blue-400",
      iconClassName: "text-blue-600 dark:text-blue-400",
      titleClassName: "text-blue-700 dark:text-blue-300",
      defaultTitle: "Info",
    },
    note: {
      icon: Info,
      className: "bg-blue-500/10 border-blue-500/30 text-blue-900 dark:bg-blue-400/5 dark:border-blue-500/20 dark:text-blue-400",
      iconClassName: "text-blue-600 dark:text-blue-400",
      titleClassName: "text-blue-700 dark:text-blue-300",
      defaultTitle: "Note",
    },
    warning: {
      icon: AlertTriangle,
      className: "bg-yellow-500/10 border-yellow-500/30 text-yellow-900 dark:bg-yellow-400/5 dark:border-yellow-500/20 dark:text-yellow-400",
      iconClassName: "text-yellow-600 dark:text-yellow-400",
      titleClassName: "text-yellow-700 dark:text-yellow-300",
      defaultTitle: "Warning",
    },
    success: {
      icon: CheckCircle2,
      className: "bg-green-500/10 border-green-500/30 text-green-900 dark:bg-green-400/5 dark:border-green-500/20 dark:text-green-400",
      iconClassName: "text-green-600 dark:text-green-400",
      titleClassName: "text-green-700 dark:text-green-300",
      defaultTitle: "Success",
    },
    error: {
      icon: XCircle,
      className: "bg-red-500/10 border-red-500/30 text-red-900 dark:bg-red-400/5 dark:border-red-500/20 dark:text-red-400",
      iconClassName: "text-red-600 dark:text-red-400",
      titleClassName: "text-red-700 dark:text-red-300",
      defaultTitle: "Error",
    },
    danger: {
      icon: XCircle,
      className: "bg-red-500/10 border-red-500/30 text-red-900 dark:bg-red-400/5 dark:border-red-500/20 dark:text-red-400",
      iconClassName: "text-red-600 dark:text-red-400",
      titleClassName: "text-red-700 dark:text-red-300",
      defaultTitle: "Danger",
    },
    tip: {
      icon: Lightbulb,
      className: "bg-purple-500/10 border-purple-500/30 text-purple-900 dark:bg-purple-400/5 dark:border-purple-500/20 dark:text-purple-400",
      iconClassName: "text-purple-600 dark:text-purple-400",
      titleClassName: "text-purple-700 dark:text-purple-300",
      defaultTitle: "Tip",
    },
  }

  const config = configs[type]
  const Icon = config.icon

  // Extract title from strong/bold text if present
  let title = config.defaultTitle
  let content = children

  if (children && typeof children === "object") {
    const childArray = Array.isArray(children) ? children : [children]
    const firstElement = childArray[0]

    // Check if first child is a paragraph with a strong element
    if (firstElement && typeof firstElement === "object" && "props" in firstElement) {
      const props = (firstElement as any).props
      if (props.children && Array.isArray(props.children)) {
        const strongChild = props.children.find(
          (child: any) => child && typeof child === "object" && child.type === "strong",
        )
        if (strongChild) {
          title = strongChild.props.children
          // Remove the title from content
          content = childArray.map((child, idx) => {
            if (idx === 0 && typeof child === "object" && "props" in child) {
              const newChildren = (child as any).props.children.filter((c: any) => c !== strongChild)
              return { ...child, props: { ...(child as any).props, children: newChildren } }
            }
            return child
          })
        }
      }
    }
  }

  return (
    <div className={`flex gap-3 p-4 rounded-xl border my-2 ${config.className}`}>
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`h-5 w-5 ${config.iconClassName}`} />
      </div>
      <div className="flex-1 space-y-0">
        <div className={`font-semibold text-sm ${config.titleClassName}`}>{title}</div>
        <div className="text-sm leading-relaxed [&>p]:mb-0 [&>p]:text-current">{content}</div>
      </div>
    </div>
  )
}
