import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Zap, Shield } from "lucide-react"
import { getConfig } from "@/lib/config"
import { Footer } from "@/components/docs/footer"

export default function HomePage() {
  // Server component - can use getConfig directly
  const config = getConfig()
  const activeVersion = config.site.activeVersion || "v1.0.0"
  const docsUrl = `/docs/${activeVersion}`

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between px-6 mx-auto">
          <Link href="/" className="flex items-center gap-2">
            {config.site.logo ? (
              <img src={config.site.logo} alt={config.site.title} className="h-8 w-auto" />
            ) : (
              <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  {config.site.title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="font-semibold text-lg text-foreground">{config.site.title}</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={docsUrl} className="text-sm text-muted-foreground hover:text-foreground">
              Docs
            </Link>
            <Button asChild>
              <Link href={docsUrl}>Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-6 py-24 mx-auto">
        <div className="mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight text-foreground">{config.site.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {config.site.description || "A modern, fast, and beautiful documentation platform built with Next.js, MDX, and Tailwind CSS."}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href={docsUrl}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={docsUrl}>View Docs</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">MDX-Powered</h3>
            <p className="text-muted-foreground leading-relaxed">
              Write documentation in MDX with custom components, syntax highlighting, and interactive examples.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built on Next.js with static generation for instant page loads and optimal performance.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Version Control</h3>
            <p className="text-muted-foreground leading-relaxed">
              Support multiple documentation versions with automatic routing and version switching.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
