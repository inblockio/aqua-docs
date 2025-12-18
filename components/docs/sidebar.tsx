"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, ChevronDown, FolderOpen } from "lucide-react"
import { useState } from "react"
import type { SpecraConfig } from "@/lib/config"
import { Icon } from "./icon"
import { sortSidebarItems, sortSidebarGroups } from "@/lib/sidebar-utils"

interface DocItem {
  title: string
  slug: string
  filePath: string
  section?: string
  group?: string
  sidebar?: string
  sidebar_position?: number
  categoryLabel?: string
  categoryPosition?: number
  categoryCollapsible?: boolean
  categoryCollapsed?: boolean
  categoryIcon?: string  // Icon from _category_.json
  meta?: {
    icon?: string  // Icon name from frontmatter
    [key: string]: any
  }
}

interface SidebarProps {
  docs: DocItem[]
  version: string
  onLinkClick?: () => void
  config: SpecraConfig
}

interface SidebarGroup {
  label: string
  path: string  // Path for navigation (e.g., "components" for /docs/v1.0.0/components)
  icon?: string  // Icon from _category_.json
  items: DocItem[]
  position: number
  collapsible: boolean
  defaultCollapsed: boolean
  children: Record<string, SidebarGroup>
}

export function Sidebar({ docs, version, onLinkClick, config }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    return initial
  })

  if (!config.navigation?.showSidebar) {
    return null
  }

  // Build a hierarchical tree structure
  const rootGroups: Record<string, SidebarGroup> = {}
  const standalone: DocItem[] = []

  docs.forEach((doc) => {
    const pathParts = doc.filePath.split("/")
    const isIndexFile = doc.filePath.endsWith("/index") ||
      doc.filePath === "index" ||
      (pathParts.length > 1 && doc.slug === pathParts.slice(0, -1).join("/"))

    // Use the sidebar or group from frontmatter if provided
    const customGroup = doc.sidebar || doc.group

    if (customGroup) {
      const groupName = customGroup.charAt(0).toUpperCase() + customGroup.slice(1)
      if (!rootGroups[groupName]) {
        rootGroups[groupName] = {
          label: groupName,
          path: customGroup,
          items: [],
          position: 999,
          collapsible: doc.categoryCollapsible ?? true,
          defaultCollapsed: doc.categoryCollapsed ?? false,
          children: {}
        }
      }
      if (isIndexFile) {
        rootGroups[groupName].position = doc.sidebar_position ?? 999
        rootGroups[groupName].icon = doc.categoryIcon
      } else {
        rootGroups[groupName].items.push(doc)
      }
      return
    }

    // Build nested structure based on folder path
    if (pathParts.length > 1) {
      const folderParts = pathParts.slice(0, -1) // All folders except the file

      // Navigate/create the tree structure
      let currentLevel = rootGroups
      let currentPath = ""

      for (let i = 0; i < folderParts.length; i++) {
        const folder = folderParts[i]
        currentPath = currentPath ? `${currentPath}/${folder}` : folder
        const folderLabel = folder.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

        if (!currentLevel[folder]) {
          currentLevel[folder] = {
            label: doc.categoryLabel && i === folderParts.length - 1 ? doc.categoryLabel : folderLabel,
            path: currentPath,
            icon: doc.categoryIcon,
            items: [],
            position: doc.categoryPosition ?? 999,
            collapsible: doc.categoryCollapsible ?? true,
            defaultCollapsed: doc.categoryCollapsed ?? false,
            children: {}
          }
        }

        // If this is the deepest folder (where the file lives), add the doc
        if (i === folderParts.length - 1) {
          if (isIndexFile) {
            currentLevel[folder].position = doc.categoryPosition ?? doc.sidebar_position ?? 999
            // Update label and icon from category config if available
            if (doc.categoryLabel) {
              currentLevel[folder].label = doc.categoryLabel
            }
            if (doc.categoryIcon) {
              currentLevel[folder].icon = doc.categoryIcon
            }
          } else {
            currentLevel[folder].items.push(doc)
          }
        }

        currentLevel = currentLevel[folder].children
      }
    } else {
      if (!isIndexFile) {
        standalone.push(doc)
      }
    }
  })

  const toggleSection = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // Recursive component to render nested groups
  const renderGroup = (groupKey: string, group: SidebarGroup, depth: number = 0) => {
    const sortedItems = sortSidebarItems(group.items)
    const sortedChildren = sortSidebarGroups(group.children)
    const hasChildren = sortedChildren.length > 0
    const hasItems = sortedItems.length > 0
    const hasContent = hasChildren || hasItems

    // Check if any item in this group (or nested children) is active
    const isActiveInGroup = (g: SidebarGroup): boolean => {
      const hasActiveItem = g.items.some((doc) => pathname === `/docs/${version}/${doc.slug}`)
      if (hasActiveItem) return true
      return Object.values(g.children).some(child => isActiveInGroup(child))
    }

    const hasActiveItem = isActiveInGroup(group)
    const isGroupActive = pathname === `/docs/${version}/${group.path}`
    const isCollapsed = hasActiveItem || isGroupActive ? false : (collapsed[groupKey] ?? group.defaultCollapsed)
    const marginLeft = depth > 0 ? "ml-4" : ""
    const groupHref = `/docs/${version}/${group.path}`

    return (
      <div key={`group-${groupKey}`} className={`space-y-1 ${marginLeft}`}>
        {/* Group header: Docusaurus-style with clickable label and chevron toggle */}
        <div className="flex items-center group">
          {/* Icon + Label (clickable, navigates to index) */}
          <Link
            href={groupHref}
            onClick={onLinkClick}
            className={`flex items-center gap-2 flex-1 px-3 py-2 text-sm font-medium rounded-l-md transition-colors ${isGroupActive
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-muted"
              }`}
          >
            {group.icon ? (
              <Icon icon={group.icon} size={16} className="shrink-0" />
            ) : (
              <FolderOpen size={16} className="shrink-0 text-muted-foreground" />
            )}
            {group.label}
          </Link>

          {/* Chevron toggle (only if has content and is collapsible) */}
          {hasContent && group.collapsible && config.navigation?.collapsibleSidebar && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleSection(groupKey)
              }}
              className="p-2 hover:bg-muted rounded-r-md transition-colors"
              aria-label={isCollapsed ? "Expand section" : "Collapse section"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          )}
        </div>

        {/* Children (shown when not collapsed) */}
        {!isCollapsed && hasContent && (
          <div className="ml-4 space-y-1">
            {/* Merge and sort both child groups and items by position */}
            {(() => {
              // Create a unified list with type indicators
              const merged: Array<{type: 'group', key: string, group: SidebarGroup, position: number} | {type: 'item', doc: DocItem, position: number}> = [
                ...sortedChildren.map(([childKey, childGroup]) => ({
                  type: 'group' as const,
                  key: childKey,
                  group: childGroup,
                  position: childGroup.position
                })),
                ...sortedItems.map((doc) => ({
                  type: 'item' as const,
                  doc,
                  position: doc.sidebar_position ?? doc.meta?.sidebar_position ?? doc.meta?.order ?? 999
                }))
              ]

              // Sort by position
              merged.sort((a, b) => a.position - b.position)

              // Render in sorted order
              return merged.map((item) => {
                if (item.type === 'group') {
                  return renderGroup(`${groupKey}/${item.key}`, item.group, depth + 1)
                } else {
                  const href = `/docs/${version}/${item.doc.slug}`
                  const isActive = pathname === href

                  return (
                    <Link
                      key={`grouped-${item.doc.slug}`}
                      href={href}
                      onClick={onLinkClick}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    >
                      {item.doc.meta?.icon && <Icon icon={item.doc.meta.icon} size={16} className="shrink-0" />}
                      {item.doc.title}
                    </Link>
                  )
                }
              })
            })()}
          </div>
        )}
      </div>
    )
  }

  const sortedRootGroups = sortSidebarGroups(rootGroups)
  const sortedStandalone = sortSidebarItems(standalone)

  return (
    <aside className="w-64 shrink-0 sticky top-24 self-start">
      <div className="max-h-[calc(100vh-7rem)] overflow-y-auto">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Documentation</h2>
        <nav className="space-y-1 pr-4">
          {/* Standalone pages (not in folders) */}
          {sortedStandalone.length > 0 && sortedStandalone.map((doc) => {
            const href = `/docs/${version}/${doc.slug}`
            const isActive = pathname === href

            return (
              <Link
                key={`standalone-${doc.slug}`}
                href={href}
                onClick={onLinkClick}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                {doc.meta?.icon && <Icon icon={doc.meta.icon} size={16} className="shrink-0" />}
                {doc.title}
              </Link>
            )
          })}

          {/* Grouped pages (in folders) - now hierarchical */}
          {sortedRootGroups.map(([groupKey, group]) => renderGroup(groupKey, group, 0))}
        </nav>
      </div>
    </aside>
  )
}
