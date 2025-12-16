import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getAllCategoryConfigs } from "./category"

const DOCS_DIR = path.join(process.cwd(), "docs")

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
function calculateReadingTime(content: string): { minutes: number; words: number } {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return { minutes, words }
}

export interface DocMeta {
  title: string
  description?: string
  slug?: string
  section?: string
  group?: string
  sidebar?: string
  order?: number
  sidebar_position?: number
  content?: string
  last_updated?: string
  draft?: boolean
  authors?: Array<{ id: string; name?: string }>
  tags?: string[]
  redirect_from?: string[]
  reading_time?: number
  word_count?: number
  icon?: string  // Icon name for sidebar display (Lucide icon name)
}

export interface Doc {
  slug: string
  filePath: string  // Original file path for sidebar grouping
  title: string
  meta: DocMeta
  content: string
  categoryLabel?: string  // Label from _category_.json
  categoryPosition?: number  // Position from _category_.json
  categoryCollapsible?: boolean  // Collapsible from _category_.json
  categoryCollapsed?: boolean  // Default collapsed state from _category_.json
  categoryIcon?: string  // Icon from _category_.json
}

export interface SidebarGroup {
  label: string
  path: string
  icon?: string
  items: Doc[]
  position: number
  collapsible: boolean
  defaultCollapsed: boolean
  children: Record<string, SidebarGroup>
}

export interface TocItem {
  id: string
  title: string
  level: number
}

export function getVersions(): string[] {
  try {
    const versions = fs.readdirSync(DOCS_DIR)
    return versions.filter((v) => fs.statSync(path.join(DOCS_DIR, v)).isDirectory())
  } catch (error) {
    return ["v1.0.0"]
  }
}

/**
 * Recursively find all MDX files in a directory
 */
function findMdxFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = []

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        files.push(...findMdxFiles(fullPath, baseDir))
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        // Get relative path from base directory
        const relativePath = path.relative(baseDir, fullPath)
        files.push(relativePath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }

  return files
}

/**
 * Internal function to read a doc from file path
 */
function readDocFromFile(filePath: string, originalSlug: string): Doc | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    // Calculate reading time
    const { minutes, words } = calculateReadingTime(content)

    // If custom slug provided, replace only the filename part, keep the folder structure
    let finalSlug = originalSlug
    if (data.slug) {
      const customSlug = data.slug.replace(/^\//, '')
      const parts = originalSlug.split("/")

      if (parts.length > 1) {
        // Keep folder structure, replace only filename
        parts[parts.length - 1] = customSlug
        finalSlug = parts.join("/")
      } else {
        // Root level file, use custom slug as-is
        finalSlug = customSlug
      }
    }

    return {
      slug: finalSlug,
      filePath: originalSlug,  // Keep original file path for sidebar
      title: data.title || originalSlug,
      meta: {
        ...data,
        content,
        reading_time: minutes,
        word_count: words,
      } as DocMeta,
      content,
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return null
  }
}

export async function getDocBySlug(slug: string, version = "v1.0.0"): Promise<Doc | null> {
  try {
    // Try direct file first
    let filePath = path.join(DOCS_DIR, version, `${slug}.mdx`)
    let doc = readDocFromFile(filePath, slug)

    if (doc) return doc

    // If not found, try index.mdx in the folder
    filePath = path.join(DOCS_DIR, version, slug, "index.mdx")
    doc = readDocFromFile(filePath, slug)

    if (doc) return doc

    // If still not found, search all docs for a matching custom slug
    const versionDir = path.join(DOCS_DIR, version)
    if (!fs.existsSync(versionDir)) {
      return null
    }

    const mdxFiles = findMdxFiles(versionDir)

    for (const file of mdxFiles) {
      const fileSlug = file.replace(/\.mdx$/, "")
      const testPath = path.join(versionDir, file.endsWith("index.mdx") ? file : `${fileSlug}.mdx`)
      const testDoc = readDocFromFile(testPath, fileSlug)

      if (testDoc && testDoc.slug === slug) {
        return testDoc
      }
    }

    return null
  } catch (error) {
    console.error(`Error reading doc ${slug}:`, error)
    return null
  }
}

export async function getAllDocs(version = "v1.0.0"): Promise<Doc[]> {
  try {
    const versionDir = path.join(DOCS_DIR, version)

    if (!fs.existsSync(versionDir)) {
      return []
    }

    const mdxFiles = findMdxFiles(versionDir)
    const categoryConfigs = getAllCategoryConfigs(version)

    const docs = await Promise.all(
      mdxFiles.map(async (file) => {
        const originalFilePath = file.replace(/\.mdx$/, "")
        let slug = originalFilePath

        // If this is an index.mdx, use the directory path as the slug
        if (file.endsWith("/index.mdx") || file === "index.mdx") {
          slug = path.dirname(file)
          if (slug === ".") slug = "" // Root index
        }

        const doc = await getDocBySlug(slug, version)

        // Override filePath to preserve the original file structure
        if (doc) {
          doc.filePath = originalFilePath

          // Apply category config if exists
          const folderPath = path.dirname(originalFilePath)
          if (folderPath !== ".") {
            const categoryConfig = categoryConfigs.get(folderPath)
            if (categoryConfig) {
              doc.categoryLabel = categoryConfig.label
              doc.categoryPosition = categoryConfig.position
              doc.categoryCollapsible = categoryConfig.collapsible
              doc.categoryCollapsed = categoryConfig.collapsed
              doc.categoryIcon = categoryConfig.icon
            }
          }
        }

        return doc
      }),
    )

    const isDevelopment = process.env.NODE_ENV === "development"

    // Create a map to track unique slugs and avoid duplicates
    const uniqueDocs = new Map<string, Doc>()

    docs
      .filter((doc): doc is Doc => doc !== null)
      // Filter out drafts in production
      .filter((doc) => isDevelopment || !doc.meta.draft)
      .forEach((doc) => {
        // Use the doc's slug (which may be custom from frontmatter) as the key
        uniqueDocs.set(doc.slug, doc)
      })

    return Array.from(uniqueDocs.values()).sort((a, b) => {
      const orderA = a.meta.sidebar_position ?? a.meta.order ?? 999
      const orderB = b.meta.sidebar_position ?? b.meta.order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    console.error(`Error getting all docs for version ${version}:`, error)
    return []
  }
}

// export function getAdjacentDocs(currentSlug: string, allDocs: Doc[]): { previous?: Doc; next?: Doc } {
//   const currentIndex = allDocs.findIndex((doc) => doc.slug === currentSlug)

//   if (currentIndex === -1) {
//     return {}
//   }

//   return {
//     previous: currentIndex > 0 ? allDocs[currentIndex - 1] : undefined,
//     next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : undefined,
//   }
// }
function buildSidebarStructure(docs: Doc[]): {
  rootGroups: Record<string, SidebarGroup>
  standalone: Doc[]
} {
  const rootGroups: Record<string, SidebarGroup> = {}
  const standalone: Doc[] = []

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
        rootGroups[groupName].position = doc.meta.sidebar_position ?? 999
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

        if (i === folderParts.length - 1) {
          if (isIndexFile) {
            currentLevel[folder].position = doc.categoryPosition ?? doc.meta.sidebar_position ?? 999
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

  return { rootGroups, standalone }
}

// Flatten the sidebar structure into a linear order
function flattenSidebarOrder(
  rootGroups: Record<string, SidebarGroup>,
  standalone: Doc[]
): Doc[] {
  const flatDocs: Doc[] = []

  // Sort items by sidebar_position
  const sortItems = (items: Doc[]) => {
    return [...items].sort((a, b) => (a.meta.sidebar_position ?? 999) - (b.meta.sidebar_position ?? 999))
  }

  // Sort groups by position
  const sortGroups = (groups: Record<string, SidebarGroup>) => {
    return Object.entries(groups).sort(([, a], [, b]) => a.position - b.position)
  }

  // Recursively flatten groups
  const flattenGroup = (group: SidebarGroup) => {
    const sortedChildren = sortGroups(group.children)
    const sortedItems = sortItems(group.items)

    // Add nested child groups first
    sortedChildren.forEach(([, childGroup]) => {
      flattenGroup(childGroup)
    })

    // Then add items in this group
    sortedItems.forEach((doc) => {
      flatDocs.push(doc)
    })
  }

  // Add standalone items first
  sortItems(standalone).forEach((doc) => {
    flatDocs.push(doc)
  })

  // Then add all grouped items
  const sortedRootGroups = sortGroups(rootGroups)
  sortedRootGroups.forEach(([, group]) => {
    flattenGroup(group)
  })

  return flatDocs
}

export function getAdjacentDocs(currentSlug: string, allDocs: Doc[]): { previous?: Doc; next?: Doc } {
  // Build the same sidebar structure
  const { rootGroups, standalone } = buildSidebarStructure(allDocs)
  
  // Flatten into the same order as shown in the sidebar
  const orderedDocs = flattenSidebarOrder(rootGroups, standalone)

  // Find current doc in the ordered list
  const currentIndex = orderedDocs.findIndex((doc) => doc.slug === currentSlug)

  if (currentIndex === -1) {
    return {}
  }

  return {
    previous: currentIndex > 0 ? orderedDocs[currentIndex - 1] : undefined,
    next: currentIndex < orderedDocs.length - 1 ? orderedDocs[currentIndex + 1] : undefined,
  }
}

export function extractTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2]
    // Generate ID the same way rehype-slug does
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens first
      .replace(/[^a-z0-9-]/g, "") // Remove special chars (dots, slashes, etc)
      .replace(/^-|-$/g, "") // Remove leading/trailing hyphens

    toc.push({ id, title: text, level })
  }

  return toc
}

/**
 * Check if a slug represents a category (has child documents)
 */
export function isCategoryPage(slug: string, allDocs: Doc[]): boolean {
  return allDocs.some((doc) => {
    const parts = doc.slug.split("/")
    const docParent = parts.slice(0, -1).join("/")
    return docParent === slug && doc.slug !== slug
  })
}


