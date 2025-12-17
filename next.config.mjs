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
const isProd = process.env.NODE_ENV === 'production'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProd ? "export" : "standalone", // Exporting to static html
  // basePath: isProd ? "/mint-test" : "",
  // assetPrefix: isProd ? "/mint-test/" : "",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Empty turbopack config to silence the warning
  // Turbopack handles file watching automatically
  turbopack: {},
  async redirects() {
    return redirects
  },
}

export default nextConfig
