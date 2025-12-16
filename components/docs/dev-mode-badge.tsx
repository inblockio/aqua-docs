"use client"

import { useEffect, useState } from "react"
import { Code2, Wifi } from "lucide-react"

export function DevModeBadge() {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    // Check WebSocket connection status
    const checkConnection = () => {
      setIsConnected(navigator.onLine)
    }

    window.addEventListener("online", checkConnection)
    window.addEventListener("offline", checkConnection)

    return () => {
      window.removeEventListener("online", checkConnection)
      window.removeEventListener("offline", checkConnection)
    }
  }, [])

  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed top-20 left-4 z-40 flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 rounded-full text-xs font-medium">
      <Code2 className="h-3 w-3" />
      <span>Dev Mode</span>
      <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
    </div>
  )
}
