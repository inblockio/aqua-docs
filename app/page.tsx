import Link from "next/link"
import { ArrowRight, Shield, Fingerprint, Lock, Github, Twitter, Linkedin, ExternalLink, Upload, PenTool, UserCheck } from "lucide-react"
import { getConfig, getAssetPath } from "specra/lib"
import { Button } from "specra/components"
import AquaAnimation from "./components/aqua-animation"

export default function HomePage() {
  // Server component - can use getConfig directly
  const config = getConfig()
  const activeVersion = config.site.activeVersion || "v4.0.0"
  const docsUrl = `/docs/${activeVersion}/welcome`

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between px-6 mx-auto">
          <Link href="/" className="flex items-center gap-2">
            {config.site.logo ? (
              <img src={getAssetPath(config.site.logo ?? "")} alt={config.site.title} className="h-8 w-auto" />
            ) : (
              <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
            )}
            <span className="font-semibold text-lg text-foreground">Aqua Protocol</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href={docsUrl} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            {
              config?.social?.github ? (
                <Link href={config.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
              ) : null
            }
            <Button asChild>
              <Link href={docsUrl}>Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Animation */}
      <div className="relative overflow-hidden">
        <AquaAnimation reverse={false} laneCount={5} />
        <div className="container px-6 mx-auto relative z-10">
          <div className="mx-auto text-center space-y-6 py-20 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Welcome to<br /><span className="text-primary">Aqua Protocol</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Secure and verify data assets instantly<br />with cryptographic proofs.
          </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              An open, decentralized framework<br /> for data accountability and governance,<br />powered by advanced cryptographic standards.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button asChild size="lg">
                <Link href={docsUrl}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {
                config?.env?.AQUAFIER_URL ? (
                  <Button asChild size="lg" variant="outline">
                    <Link href={config.env.AQUAFIER_URL} target="_blank" rel="noopener noreferrer">
                      Try Aquafier
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null
              }
            </div>
          </div>
        </div>
      </div>

      <main className="container px-6 mx-auto">
        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 py-16 max-w-6xl mx-auto">
          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Privacy-Preserving</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open-source protocol that doesn't require blockchain. Only hashes are stored, keeping your data private and secure.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Fingerprint className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Verifiable Data</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cryptographic hashes ensure tamper-proof records. Any modification is immediately detectable with portable verification.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Digital Sovereignty</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full control over your data. Share and govern it independently of third parties with self-sovereign identity.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 mx-auto">
          <div className="rounded-xl border border-border bg-card p-8 md:p-12 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Try Aquafier</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the power of Aqua Protocol with our own application Aquafier.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
              <div className="p-6 rounded-lg border border-border bg-background hover:shadow-lg transition-all">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload & Verify</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use our cloud storage-style features to upload, verify, and notarize any file in seconds
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-background hover:shadow-lg transition-all">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <PenTool className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Electronic Signature</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sign documents with an electronic signature solution featuring a portable verification trail
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-background hover:shadow-lg transition-all">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Self-Sovereign Identity</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Create and manage a Self-Sovereign-Identity which allows for peer-to-peer attestations and challenge based verification
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" variant="default">
                <Link href="https://aquafier.inblock.io" target="_blank" rel="noopener noreferrer">
                  Aquafier Production
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="https://dev.inblock.io" target="_blank" rel="noopener noreferrer">
                  Development Environment
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="py-16 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Join the Community</h2>
          <p className="text-muted-foreground">
            Aqua Protocol is open source and community-driven. Connect with developers and stay updated.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            {
              config?.social?.github ? (
                <Button asChild variant="outline" size="lg">
                  <Link href={config.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Link>
                </Button>
              ) : null
            }
            {
              config?.social?.twitter ? (
                <Button asChild variant="outline" size="lg">
                  <Link href={config.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-5 w-5" />
                    Twitter
                  </Link>
                </Button>
              ) : null
            }
            {
              config?.social?.linkedin ? (
                <Button asChild variant="outline" size="lg">
                  <Link href={config.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </Link>
                </Button>
              ) : null
            }
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
