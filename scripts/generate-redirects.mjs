import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DOCS_DIR = path.join(__dirname, "..", "docs")

/**
 * Recursively find all MDX files
 */
function findMdxFiles(dir, baseDir = dir) {
  const files = []

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        files.push(...findMdxFiles(fullPath, baseDir))
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
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
 * Get all folders (categories) that need redirect pages
 */
function getFolderRedirects(mdxFiles, version) {
  const folders = new Map() // folder path -> first doc in folder

  for (const file of mdxFiles) {
    const normalized = file.replace(/\\/g, '/')
    const parts = normalized.split('/')

    // For each level of nesting, track the folder
    for (let i = 0; i < parts.length - 1; i++) {
      const folderPath = parts.slice(0, i + 1).join('/')

      if (!folders.has(folderPath)) {
        // This is the first doc we've seen in this folder
        const docSlug = normalized.replace(/\.mdx$/, '').replace(/\/index$/, '')
        folders.set(folderPath, `/docs/${version}/${docSlug}`)
      }
    }
  }

  return folders
}

/**
 * Build redirect mappings from frontmatter
 */
async function buildRedirects() {
  const versions = fs.readdirSync(DOCS_DIR).filter((v) => {
    const stat = fs.statSync(path.join(DOCS_DIR, v))
    return stat.isDirectory()
  })

  const redirects = []
  const folderRedirects = []

  for (const version of versions) {
    const versionDir = path.join(DOCS_DIR, version)
    const mdxFiles = findMdxFiles(versionDir)

    // Build folder redirects for static export
    const folders = getFolderRedirects(mdxFiles, version)
    for (const [folderPath, destination] of folders.entries()) {
      const source = `/docs/${version}/${folderPath}`
      folderRedirects.push({
        source,
        destination,
        permanent: false, // Temporary redirect for folder access
      })
    }

    for (const file of mdxFiles) {
      const filePath = path.join(versionDir, file)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)

      if (data.redirect_from && Array.isArray(data.redirect_from)) {
        const slug = file.replace(/\.mdx$/, "").replace(/\\/g, '/')
        const destination = `/docs/${version}/${slug}`

        for (const source of data.redirect_from) {
          redirects.push({
            source,
            destination,
            permanent: true,
          })
        }
      }
    }
  }

  return { redirects, folderRedirects }
}

/**
 * Generate redirects and write to a JSON file
 */
async function main() {
  const { redirects, folderRedirects } = await buildRedirects()

  // Add manual redirects for the /docs/ path and other common paths
  const manualRedirects = [
    {
      source: "/docs",
      destination: "/",
      permanent: false,
    },
    {
      source: "/docs/",
      destination: "/",
      permanent: false,
    }
  ]

  const allRedirects = [...redirects, ...folderRedirects, ...manualRedirects]


  const outputPath = path.join(__dirname, "..", "redirects.json")
  fs.writeFileSync(outputPath, JSON.stringify(allRedirects, null, 2))

  console.log(`✅ Generated ${redirects.length} frontmatter redirects`)
  console.log(`✅ Generated ${folderRedirects.length} folder redirects`)
  console.log(`✅ Generated ${manualRedirects.length} manual redirects`)
  console.log(`📝 Saved to: ${outputPath}`)
}

main().catch(console.error)
