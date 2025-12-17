"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

interface VersionSwitcherProps {
  currentVersion: string
  versions: string[]
}

export function VersionSwitcher({ currentVersion, versions }: VersionSwitcherProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleVersionChange = (version: string) => {
    router.push(`/docs/${version}`)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground bg-muted rounded-md hover:bg-muted/80 transition-colors"
      >
        <span className="font-medium">{currentVersion}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
            <div className="p-2">
              {versions.map((version) => (
                <button
                  key={version}
                  onClick={() => handleVersionChange(version)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <span>{version}</span>
                  {version === currentVersion && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
