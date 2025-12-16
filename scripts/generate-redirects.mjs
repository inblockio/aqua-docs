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
 * Build redirect mappings from frontmatter
 */
async function buildRedirects() {
  const versions = fs.readdirSync(DOCS_DIR).filter((v) => {
    const stat = fs.statSync(path.join(DOCS_DIR, v))
    return stat.isDirectory()
  })

  const redirects = []

  for (const version of versions) {
    const versionDir = path.join(DOCS_DIR, version)
    const mdxFiles = findMdxFiles(versionDir)

    for (const file of mdxFiles) {
      const filePath = path.join(versionDir, file)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)

      if (data.redirect_from && Array.isArray(data.redirect_from)) {
        const slug = file.replace(/\.mdx$/, "")
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

  return redirects
}

/**
 * Generate redirects and write to a JSON file
 */
async function main() {
  const redirects = await buildRedirects()
  
  const outputPath = path.join(__dirname, "..", "redirects.json")
  fs.writeFileSync(outputPath, JSON.stringify(redirects, null, 2))
  
  console.log(`✅ Generated ${redirects.length} redirects`)
  console.log(`📝 Saved to: ${outputPath}`)
}

main().catch(console.error)
