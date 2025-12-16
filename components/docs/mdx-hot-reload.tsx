"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function MdxHotReload() {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    // Use Server-Sent Events to watch for file changes
    const eventSource = new EventSource('/api/mdx-watch')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'change') {
        console.log('[MDX Hot Reload] File changed:', data.file)
        router.refresh()
      } else if (data.type === 'connected') {
        console.log('[MDX Hot Reload] Watching for changes...')
      }
    }

    eventSource.onerror = (error) => {
      console.error('[MDX Hot Reload] Connection error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [router])

  return null
}
