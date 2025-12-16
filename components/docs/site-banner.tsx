"use client"

import { X, AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"
import { useState, useEffect } from "react"
import type { SpecraConfig } from "@/lib/config"

interface SiteBannerProps {
  config: SpecraConfig
}

export function SiteBanner({ config }: SiteBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const banner = config.banner
  const storageKey = "site-banner-dismissed"
  
  useEffect(() => {
    setMounted(true)
    // Check if banner was previously dismissed
    const isDismissed = localStorage.getItem(storageKey) === "true"
    setDismissed(isDismissed)
  }, [])
  
  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem(storageKey, "true")
  }
  
  // Don't render on server or if no banner configured or if dismissed
  if (!mounted || !banner || !banner.enabled || dismissed) {
    return null
  }

  const typeConfig = {
    info: {
      icon: Info,
      bg: "bg-blue-500/10 dark:bg-blue-400/5",
      border: "border-blue-500/30 dark:border-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      textColor: "text-blue-900 dark:text-blue-300",
    },
    success: {
      icon: CheckCircle,
      bg: "bg-green-500/10 dark:bg-green-400/5",
      border: "border-green-500/30 dark:border-green-500/20",
      iconColor: "text-green-600 dark:text-green-400",
      textColor: "text-green-900 dark:text-green-300",
    },
    warning: {
      icon: AlertCircle,
      bg: "bg-yellow-500/10 dark:bg-yellow-400/5",
      border: "border-yellow-500/30 dark:border-yellow-500/20",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      textColor: "text-yellow-900 dark:text-yellow-300",
    },
    error: {
      icon: XCircle,
      bg: "bg-red-500/10 dark:bg-red-400/5",
      border: "border-red-500/30 dark:border-red-500/20",
      iconColor: "text-red-600 dark:text-red-400",
      textColor: "text-red-900 dark:text-red-300",
    },
  }

  const type = banner.type || "info"
  const { icon: IconComponent, bg, border, iconColor, textColor } = typeConfig[type]

  return (
    <div className={`w-full border-b ${border} ${bg}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center gap-3">
          <IconComponent className={`h-5 w-5 shrink-0 ${iconColor}`} />
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${textColor}`}>
              {banner.message}
            </p>
          </div>
          {banner.dismissible && (
            <button
              onClick={handleDismiss}
              className={`shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${iconColor}`}
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
