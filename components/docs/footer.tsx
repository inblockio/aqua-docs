import Link from "next/link"
import { getConfig } from "@/lib/config"

export function Footer() {
  // Server component - can use getConfig directly
  const config = getConfig()

  if (!config.footer) {
    return null
  }

  return (
    <footer className="border rounded-xl border-border bg-background mt-24">
      <div className="px-6 py-12">
        {config.footer.links && config.footer.links.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {config.footer.links.map((column, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-foreground mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {config.footer.copyright && (
          <div className="pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              {config.footer.copyright}
            </p>
          </div>
        )}
      </div>
    </footer>
  )
}
