import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load redirects from generated file
let redirects = []
try {
  const redirectsPath = path.join(__dirname, "redirects.json")
  if (fs.existsSync(redirectsPath)) {
    redirects = JSON.parse(fs.readFileSync(redirectsPath, "utf8"))
  }
} catch (error) {
  console.warn("Could not load redirects.json:", error.message)
}

// Load deployment config from specra.config.json
let basePath = ""
try {
  const configPath = path.join(__dirname, "specra.config.json")
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
    const deployment = config.deployment || {}

    // Only apply basePath for GitHub Pages without custom domain
    if (deployment.target === "github-pages" && !deployment.customDomain && deployment.basePath) {
      basePath = deployment.basePath.startsWith("/")
        ? deployment.basePath
        : `/${deployment.basePath}`
    }

    console.log(`\n📦 Building for static export with deployment target: ${deployment.target || 'not specified'}`)
    if (basePath) {
      console.log(`🔗 Using basePath: ${basePath}`)
    } else {
      console.log(`🔗 No basePath applied (custom domain or root deployment)`)
    }
  }
} catch (error) {
  console.warn("Could not load deployment config from specra.config.json:", error.message)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Always export for static hosting
  basePath: basePath || undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Empty turbopack config to silence the warning
  turbopack: {},
  async redirects() {
    return redirects
  },
}

export default nextConfig
