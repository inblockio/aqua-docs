"use client"

import * as LucideIcons from "lucide-react"

interface IconProps {
  icon: string | React.ReactNode
  iconType?: "regular" | "solid" | "light" | "thin" | "sharp-solid" | "duotone" | "brands"
  color?: string
  size?: number
  className?: string
}

export function Icon({ icon, iconType = "regular", color, size = 20, className = "" }: IconProps) {
  // If icon is a React node (custom SVG), render it directly
  if (typeof icon !== "string") {
    return <span className={`inline-flex items-center ${className}`} style={{ color }}>{icon}</span>
  }

  // Check if it's a URL (external or local file)
  if (icon.startsWith("http") || icon.startsWith("/")) {
    return (
      <img
        src={icon}
        alt=""
        width={size}
        height={size}
        className={`inline-block ${className}`}
        style={{ color }}
      />
    )
  }

  // Check if it's a Font Awesome icon (starts with fa-)
  if (icon.startsWith("fa-")) {
    const faClass = `fa-${iconType} ${icon}`
    return (
      <i
        className={`${faClass} ${className}`}
        style={{ fontSize: size, color }}
        aria-hidden="true"
      />
    )
  }

  // Try to find Lucide icon
  const iconName = icon
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")

  const LucideIcon = (LucideIcons as any)[iconName]

  if (LucideIcon) {
    return (
      <LucideIcon
        size={size}
        className={`inline-block ${className}`}
        style={{ color }}
        aria-hidden="true"
      />
    )
  }

  // Fallback: render the icon name
  return (
    <span className={`inline-flex items-center font-mono text-xs ${className}`} style={{ color }}>
      [{icon}]
    </span>
  )
}
