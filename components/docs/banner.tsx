import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

interface BannerProps {
  children: React.ReactNode
  type?: "info" | "success" | "warning" | "error"
  title?: string
}

export function Banner({ children, type = "info", title }: BannerProps) {
  const config = {
    info: {
      icon: Info,
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      border: "border-blue-500/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-900 dark:text-blue-300",
    },
    success: {
      icon: CheckCircle,
      bg: "bg-green-500/10 dark:bg-green-500/20",
      border: "border-green-500/30",
      iconColor: "text-green-600 dark:text-green-400",
      titleColor: "text-green-900 dark:text-green-300",
    },
    warning: {
      icon: AlertCircle,
      bg: "bg-yellow-500/10 dark:bg-yellow-500/20",
      border: "border-yellow-500/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      titleColor: "text-yellow-900 dark:text-yellow-300",
    },
    error: {
      icon: XCircle,
      bg: "bg-red-500/10 dark:bg-red-500/20",
      border: "border-red-500/30",
      iconColor: "text-red-600 dark:text-red-400",
      titleColor: "text-red-900 dark:text-red-300",
    },
  }

  const { icon: IconComponent, bg, border, iconColor, titleColor } = config[type]

  return (
    <div className={`my-6 p-4 rounded-xl border ${border} ${bg}`}>
      <div className="flex gap-3">
        <IconComponent className={`h-5 w-5 shrink-0 mt-0.5 ${iconColor}`} />
        <div className="flex-1 min-w-0">
          {title && <div className={`font-semibold mb-1 ${titleColor}`}>{title}</div>}
          <div className="text-sm text-foreground/90 [&>*:last-child]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
