import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Note: Redirects from frontmatter are handled at build time via next.config.js
// This middleware can be extended for dynamic redirects if needed

export function middleware(request: NextRequest) {
  // Add any runtime middleware logic here
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
