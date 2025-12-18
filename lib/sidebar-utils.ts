/**
 * Unified sidebar sorting and structure building utilities
 * This module provides consistent sidebar logic across the application
 * to ensure ordering is handled the same way everywhere.
 */

export interface SidebarGroup {
  label: string
  path: string
  icon?: string
  items: any[]
  position: number
  collapsible: boolean
  defaultCollapsed: boolean
  children: Record<string, SidebarGroup>
}

/**
 * Sort sidebar items by their position.
 * Items with explicit sidebar_position come first (sorted numerically),
 * followed by items without position (sorted by their original order).
 *
 * @param items - Array of items with optional sidebar_position
 * @returns Sorted array of items
 */
export function sortSidebarItems<T extends { sidebar_position?: number; meta?: any }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const posA = a.sidebar_position ?? a.meta?.sidebar_position ?? a.meta?.order ?? 999
    const posB = b.sidebar_position ?? b.meta?.sidebar_position ?? b.meta?.order ?? 999
    return posA - posB
  })
}

/**
 * Sort sidebar groups by their position.
 * Groups with explicit position come first (sorted numerically),
 * followed by groups without position at the end (sorted by their original order).
 *
 * @param groups - Record of group key to group object with position
 * @returns Sorted array of [key, group] tuples
 */
export function sortSidebarGroups<T extends { position: number }>(
  groups: Record<string, T>
): [string, T][] {
  return Object.entries(groups).sort(([, a], [, b]) => {
    const posA = a.position ?? 999
    const posB = b.position ?? 999
    return posA - posB
  })
}

/**
 * Build hierarchical sidebar structure from flat list of documents
 * This is the single source of truth for sidebar structure used by both
 * the sidebar component and navigation (prev/next) links.
 *
 * @param docs - Array of documents with metadata
 * @returns Object containing root groups and standalone items
 */
export function buildSidebarStructure<T extends {
  filePath: string
  slug: string
  categoryLabel?: string
  categoryPosition?: number
  categoryIcon?: string
  categoryCollapsible?: boolean
  categoryCollapsed?: boolean
  meta: any
}>(docs: T[]): {
  rootGroups: Record<string, SidebarGroup>
  standalone: T[]
} {
  const rootGroups: Record<string, SidebarGroup> = {}
  const standalone: T[] = []

  // First pass: collect category metadata from all docs to build complete folder structure
  const categoryMetadata = new Map<string, {
    label?: string
    position?: number
    icon?: string
    collapsible?: boolean
    collapsed?: boolean
  }>()

  docs.forEach((doc) => {
    const pathParts = doc.filePath.split("/")
    const folderPath = pathParts.length > 1 ? pathParts.slice(0, -1).join("/") : ""

    if (folderPath && doc.categoryLabel) {
      categoryMetadata.set(folderPath, {
        label: doc.categoryLabel,
        position: doc.categoryPosition,
        icon: doc.categoryIcon,
        collapsible: doc.categoryCollapsible,
        collapsed: doc.categoryCollapsed
      })
    }
  })

  docs.forEach((doc) => {
    const pathParts = doc.filePath.split("/")
    const isIndexFile = doc.filePath.endsWith("/index") ||
      doc.filePath === "index" ||
      (pathParts.length > 1 && doc.slug === pathParts.slice(0, -1).join("/"))

    const customGroup = doc.meta.sidebar || doc.meta.group

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
        // Use categoryPosition if available (from _category_.json), otherwise sidebar_position from frontmatter
        rootGroups[groupName].position = doc.categoryPosition ?? doc.meta.sidebar_position ?? 999
        rootGroups[groupName].icon = doc.categoryIcon
      } else {
        rootGroups[groupName].items.push(doc)
      }
      return
    }

    if (pathParts.length > 1) {
      const folderParts = pathParts.slice(0, -1)
      let currentLevel = rootGroups
      let currentPath = ""

      for (let i = 0; i < folderParts.length; i++) {
        const folder = folderParts[i]
        currentPath = currentPath ? `${currentPath}/${folder}` : folder
        const folderLabel = folder.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

        // Get metadata for this specific folder path
        const metadata = categoryMetadata.get(currentPath)

        if (!currentLevel[folder]) {
          currentLevel[folder] = {
            label: metadata?.label ?? folderLabel,
            path: currentPath,
            icon: metadata?.icon,
            items: [],
            position: metadata?.position ?? 999,
            collapsible: metadata?.collapsible ?? true,
            defaultCollapsed: metadata?.collapsed ?? false,
            children: {}
          }
        }

        if (i === folderParts.length - 1) {
          if (isIndexFile) {
            // Update position, label, and icon if this is the index file for this folder
            currentLevel[folder].position = doc.categoryPosition ?? doc.meta.sidebar_position ?? currentLevel[folder].position
            if (doc.categoryLabel) {
              currentLevel[folder].label = doc.categoryLabel
            }
            if (doc.categoryIcon) {
              currentLevel[folder].icon = doc.categoryIcon
            }
            if (doc.categoryCollapsible !== undefined) {
              currentLevel[folder].collapsible = doc.categoryCollapsible
            }
            if (doc.categoryCollapsed !== undefined) {
              currentLevel[folder].defaultCollapsed = doc.categoryCollapsed
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

  return { rootGroups, standalone }
}
