"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { RefreshCw } from "lucide-react"

export function HotReloadIndicator() {
  const [isReloading, setIsReloading] = useState(false)
  const [lastReload, setLastReload] = useState<Date | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    // Track when content updates
    setIsReloading(true)
    const timer = setTimeout(() => {
      setIsReloading(false)
      setLastReload(new Date())
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setLastReload(null)
      }, 3000)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    // Listen for Next.js Fast Refresh
    const handleBeforeRefresh = () => {
      setIsReloading(true)
    }

    const handleAfterRefresh = () => {
      setIsReloading(false)
      setLastReload(new Date())
      setTimeout(() => setLastReload(null), 3000)
    }

    // @ts-ignore - Next.js internal API
    if (typeof window !== 'undefined' && window.__NEXT_DATA__) {
      window.addEventListener('beforeunload', handleBeforeRefresh)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeRefresh)
    }
  }, [])

  if (process.env.NODE_ENV !== "development") return null

  return (
    <>
      {/* Reloading indicator */}
      {isReloading && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl shadow-lg animate-in slide-in-from-bottom-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Reloading...</span>
        </div>
      )}

      {/* Success indicator */}
      {lastReload && !isReloading && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl shadow-lg animate-in slide-in-from-bottom-2">
          <RefreshCw className="h-4 w-4" />
          <span className="text-sm font-medium">
            Updated at {lastReload.toLocaleTimeString()}
          </span>
        </div>
      )}
    </>
  )
}
