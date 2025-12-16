interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "error" | "info"
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-muted text-foreground border-border",
    success: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    error: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
