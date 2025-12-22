import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Generate an HTML redirect page
 */
function generateRedirectHTML(destination, basePath = "") {
  const fullDestination = basePath + destination

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=${fullDestination}">
  <link rel="canonical" href="${fullDestination}">
  <title>Redirecting...</title>
  <script>
    window.location.href = "${fullDestination}";
  </script>
</head>
<body>
  <p>Redirecting to <a href="${fullDestination}">${fullDestination}</a>...</p>
</body>
</html>`
}

/**
 * Create redirect HTML files in the out directory
 */
async function createStaticRedirects() {
  const outDir = path.join(__dirname, "..", "out")
  const redirectsPath = path.join(__dirname, "..", "redirects.json")

  // Load basePath from specra.config.json
  let basePath = ""
  try {
    const configPath = path.join(__dirname, "..", "specra.config.json")
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
      const deployment = config.deployment || {}

      // Only apply basePath for GitHub Pages without custom domain
      if (deployment.target === "github-pages" && !deployment.customDomain && deployment.basePath) {
        basePath = deployment.basePath.startsWith("/")
          ? deployment.basePath
          : `/${deployment.basePath}`
      }
    }
  } catch (error) {
    console.warn("Could not load deployment config:", error.message)
  }

  // Check if out directory exists
  if (!fs.existsSync(outDir)) {
    console.warn("⚠️  Output directory 'out' not found. Run 'npm run build:export' first.")
    return
  }

  // Load redirects
  let redirects = []
  try {
    if (fs.existsSync(redirectsPath)) {
      redirects = JSON.parse(fs.readFileSync(redirectsPath, "utf8"))
    }
  } catch (error) {
    console.error("Could not load redirects.json:", error.message)
    return
  }

  let created = 0

  for (const redirect of redirects) {
    const { source, destination } = redirect

    // Remove basePath from source if present (for file system path)
    let sourcePath = source
    if (basePath && sourcePath.startsWith(basePath)) {
      sourcePath = sourcePath.substring(basePath.length)
    }

    // Ensure source starts with /
    if (!sourcePath.startsWith('/')) {
      sourcePath = '/' + sourcePath
    }

    // Convert URL path to file system path
    const targetDir = path.join(outDir, sourcePath.substring(1))
    const indexPath = path.join(targetDir, "index.html")

    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Don't overwrite if index.html already exists (real content page)
    if (!fs.existsSync(indexPath)) {
      // Generate and write redirect HTML
      const html = generateRedirectHTML(destination, basePath)
      fs.writeFileSync(indexPath, html)
      created++
    }
  }

  console.log(`✅ Created ${created} static redirect HTML files`)
  if (basePath) {
    console.log(`🔗 Using basePath: ${basePath}`)
  }
}

createStaticRedirects().catch(console.error)
