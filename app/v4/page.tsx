"use client"

import Link from "next/link"
import { Shield, Fingerprint, Lock, ArrowRight, ExternalLink, Eye, KeyRound, FileCheck, Bot, AlertTriangle, CheckCircle, Globe, Code } from "lucide-react"
import HackerAnimation from "./hacker-animation"
import { useEffect, useState, useRef } from "react"

/* ─── Typewriter component ─── */
function Typewriter({ texts, className }: { texts: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentIndex]
    const speed = isDeleting ? 30 : 70

    if (!isDeleting && displayText === text) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting ? text.substring(0, displayText.length - 1) : text.substring(0, displayText.length + 1)
      )
    }, speed)
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, texts])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  )
}

/* ─── Scroll-reveal section ─── */
function RevealSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Main Page ─── */
export default function V4LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 overflow-x-hidden">
      <HackerAnimation />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-900/30 bg-[#050508]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo/aqua-logo.png" alt="Aqua" className="h-8 w-auto" />
            <span className="font-bold text-lg text-white">
              AQUA<span className="text-green-400 font-mono ml-1">V4</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/docs/v4.0.0/en/welcome"
              className="text-sm text-gray-400 hover:text-green-400 transition-colors font-mono"
            >
              DOCS
            </Link>
            <Link
              href="https://github.com/inblockio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-green-400 transition-colors font-mono"
            >
              GITHUB
            </Link>
            <Link
              href="/docs/v4.0.0/en/welcome"
              className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-mono rounded hover:bg-green-500/20 transition-all"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Alert badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5 mb-8">
              <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="text-sm font-mono text-red-400">CRITICAL: AI Security Gap Detected</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              <span className="text-white">AI is moving fast.</span>
              <br />
              <span className="text-red-500">Security can&apos;t keep up.</span>
            </h1>

            <div className="h-12 mb-8">
              <p className="text-xl md:text-2xl text-gray-400 font-mono">
                <span className="text-green-400">&gt;</span>{" "}
                <Typewriter
                  texts={[
                    "Who created this AI output?",
                    "Can I trust this data source?",
                    "Was this model tampered with?",
                    "Is this identity verified?",
                    "Who authorized this access?",
                  ]}
                  className="text-gray-300"
                />
              </p>
            </div>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Aqua V4 is the <span className="text-green-400 font-semibold">trust infrastructure</span> for the AI era.
              <br />
              Identity. Access Control. Provenance.
              <br />
              <span className="text-gray-500">Cryptographic proof that the data you use, produce, and share is real.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/v4.0.0/en/welcome"
                className="group px-8 py-4 bg-green-500 text-black font-bold font-mono rounded-lg hover:bg-green-400 transition-all flex items-center gap-2 text-lg"
              >
                INITIALIZE AQUA
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="https://aquafier.inblock.io"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-gray-600 text-gray-300 font-mono rounded-lg hover:border-green-500/50 hover:text-green-400 transition-all flex items-center gap-2 text-lg"
              >
                LIVE DEMO
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-green-500/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="relative z-10 py-24 border-t border-red-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="text-red-500 font-mono text-sm tracking-widest uppercase">// The Problem</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
                The AI Trust Crisis
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                AI is generating content, making decisions, and accessing systems at unprecedented scale.
                But there&apos;s no infrastructure to verify any of it.
              </p>
            </div>
          </RevealSection>

          {/* Lex Fridman Signal */}
          <RevealSection delay={200}>
            <div className="mb-16 rounded-xl border border-red-500/15 bg-[#0a0a0f]/90 overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-red-500/10 bg-red-500/[0.03]">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono text-red-400/70 tracking-wider">SIGNAL DETECTED // SOURCE: @lexfridman</span>
              </div>
              {/* Quote body */}
              <div className="p-6 md:p-8">
                <blockquote className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 border-l-2 border-red-500/40 pl-5">
                  &ldquo;Very soon, if not already, <span className="text-red-400 font-semibold">security will become THE bottleneck</span> for
                  effectiveness and usefulness of AI agents as a whole, since intelligence is still rapidly scaling
                  and is no longer an obvious bottleneck for many use-cases.&rdquo;
                </blockquote>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-3">Lex identifies three pillars of AI agent power:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                      <div className="flex items-center gap-2 px-3 py-2 rounded border border-gray-700/50 bg-[#0a0a0f]">
                        <span className="text-gray-500">1.</span>
                        <span className="text-gray-400">Model intelligence</span>
                        <span className="text-green-500/50 ml-auto">SCALING</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded border border-red-500/20 bg-red-500/[0.03]">
                        <span className="text-red-400">2.</span>
                        <span className="text-red-300">Data access</span>
                        <span className="text-red-500 ml-auto">UNSECURED</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded border border-red-500/20 bg-red-500/[0.03]">
                        <span className="text-red-400">3.</span>
                        <span className="text-red-300">Agent autonomy</span>
                        <span className="text-red-500 ml-auto">UNSECURED</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="https://x.com/lexfridman/status/2023573186496037044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1 shrink-0"
                  >
                    Source <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Threat cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <RevealSection delay={100}>
              <div className="p-6 rounded-xl border border-red-500/20 bg-[#0a0a0f]/80 hover:border-red-500/40 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-red-400 font-mono">IDENTITY CRISIS</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  AI agents act on behalf of users, but there&apos;s no way to verify who they represent.
                  Spoofed identities, unauthorized delegation, zero accountability.
                </p>
                <div className="mt-4 font-mono text-xs text-red-500/60">
                  &gt; identity.verify() → UNDEFINED
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="p-6 rounded-xl border border-red-500/20 bg-[#0a0a0f]/80 hover:border-red-500/40 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-red-400 font-mono">ACCESS CHAOS</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  AI models consume data from everywhere. No granular access control.
                  No audit trail. No way to know what data was used, when, or by whom.
                </p>
                <div className="mt-4 font-mono text-xs text-red-500/60">
                  &gt; access.log() → NULL
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={300}>
              <div className="p-6 rounded-xl border border-red-500/20 bg-[#0a0a0f]/80 hover:border-red-500/40 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-red-400 font-mono">PROVENANCE GAP</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Where did this data come from? Was it tampered with? Is this output real or generated?
                  Without provenance, AI outputs are just noise.
                </p>
                <div className="mt-4 font-mono text-xs text-red-500/60">
                  &gt; data.origin() → UNKNOWN
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── THE SOLUTION ── */}
      <section className="relative z-10 py-24 border-t border-green-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="text-green-400 font-mono text-sm tracking-widest uppercase">// The Solution</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
                Aqua V4: <span className="text-green-400">Trust Infrastructure</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                A cryptographic protocol that gives AI systems what they&apos;re missing:
                verifiable identity, granular access control, and tamper-proof provenance.
              </p>
            </div>
          </RevealSection>

          {/* Solution pillars */}
          <div className="grid md:grid-cols-3 gap-8">
            <RevealSection delay={100}>
              <div className="p-8 rounded-xl border border-green-500/20 bg-[#0a0f0a]/80 hover:border-green-500/40 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                    <Fingerprint className="h-7 w-7 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400 font-mono mb-3">IDENTITY</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Self-sovereign identity with cryptographic attestation. Every agent, every model, every user — verified and accountable.
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">Peer-to-peer attestation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">Challenge-based verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">No central authority needed</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="p-8 rounded-xl border border-green-500/20 bg-[#0a0f0a]/80 hover:border-green-500/40 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                    <KeyRound className="h-7 w-7 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400 font-mono mb-3">ACCESS CONTROL</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Granular, cryptographic access policies. Control exactly who and what can read, write, or delegate across your data.
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">Revision-level permissions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">Auditable access trails</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">Zero-trust architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={300}>
              <div className="p-8 rounded-xl border border-green-500/20 bg-[#0a0f0a]/80 hover:border-green-500/40 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                    <FileCheck className="h-7 w-7 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400 font-mono mb-3">PROVENANCE</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Every piece of data carries its full history. Tamper-proof, portable, and independently verifiable — no blockchain required.
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">Cryptographic hash chains</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">Portable verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-400/80">Instant tamper detection</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── OPEN PROTOCOL ── */}
      <section className="relative z-10 py-24 border-t border-green-900/20">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <div className="text-center">
              <span className="text-green-400 font-mono text-sm tracking-widest uppercase">// Open Protocol</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
                Trust requires <span className="text-green-400">transparency</span>
              </h2>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                Aqua V4 is fully open source. Trust infrastructure cannot depend on a single vendor — it must be
                auditable, forkable, and verifiable by anyone. Like TLS secures the web and PGP secures communication,
                Aqua secures data provenance as an open standard.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-xl border border-green-500/10 bg-[#0a0f0a]/60 text-center">
                <Code className="h-6 w-6 text-green-400 mx-auto mb-3" />
                <div className="font-mono text-sm text-green-400 font-bold mb-1">OPEN SPEC</div>
                <p className="text-xs text-gray-500">Full protocol specification, verification trees, and SDK — publicly auditable.</p>
              </div>
              <div className="p-6 rounded-xl border border-green-500/10 bg-[#0a0f0a]/60 text-center">
                <Globe className="h-6 w-6 text-green-400 mx-auto mb-3" />
                <div className="font-mono text-sm text-green-400 font-bold mb-1">OPEN STANDARD</div>
                <p className="text-xs text-gray-500">Interoperable by design. Every implementation strengthens the verification network.</p>
              </div>
              <div className="p-6 rounded-xl border border-green-500/10 bg-[#0a0f0a]/60 text-center">
                <Shield className="h-6 w-6 text-green-400 mx-auto mb-3" />
                <div className="font-mono text-sm text-green-400 font-bold mb-1">ENTERPRISE READY</div>
                <p className="text-xs text-gray-500">Build free. Deploy with production-grade infrastructure, SLAs, and compliance.</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── HOW IT WORKS — Terminal Style ── */}
      <section className="relative z-10 py-24 border-t border-green-900/20">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="text-green-400 font-mono text-sm tracking-widest uppercase">// How It Works</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
                From <span className="text-red-500">Vulnerable</span> to <span className="text-green-400">Verified</span>
              </h2>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="rounded-xl border border-green-500/20 bg-[#0a0a0f]/90 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/10 bg-[#0a0f0a]/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-gray-500">aqua-v4 — trust-pipeline</span>
              </div>
              {/* Terminal body */}
              <div className="p-6 font-mono text-sm space-y-4">
                <div>
                  <span className="text-green-400">$</span> <span className="text-gray-300">aqua init --protocol v4</span>
                  <div className="text-gray-500 mt-1">Initializing Aqua trust chain...</div>
                  <div className="text-green-400 mt-1">&#10003; Genesis revision created</div>
                </div>
                <div>
                  <span className="text-green-400">$</span> <span className="text-gray-300">aqua sign --identity did:aqua:0x7f3a...</span>
                  <div className="text-gray-500 mt-1">Binding cryptographic identity...</div>
                  <div className="text-green-400 mt-1">&#10003; Identity attested and sealed</div>
                </div>
                <div>
                  <span className="text-green-400">$</span> <span className="text-gray-300">aqua verify --file ai-output.json</span>
                  <div className="text-gray-500 mt-1">Verifying provenance chain...</div>
                  <div className="text-gray-500 mt-1">Checking 14 revisions across 3 witnesses...</div>
                  <div className="text-green-400 mt-1">&#10003; INTEGRITY VERIFIED — All hashes match</div>
                  <div className="text-green-400">&#10003; IDENTITY CONFIRMED — Signer: verified</div>
                  <div className="text-green-400">&#10003; PROVENANCE VALID — Complete chain from origin</div>
                </div>
                <div className="border-t border-green-500/10 pt-4">
                  <span className="text-green-400">$</span> <span className="text-gray-300 animate-pulse">_</span>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="relative z-10 py-24 border-t border-green-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="text-green-400 font-mono text-sm tracking-widest uppercase">// The Difference</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
                Without vs. With <span className="text-green-400">Aqua</span>
              </h2>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Without Aqua */}
            <RevealSection delay={100}>
              <div className="p-8 rounded-xl border border-red-500/20 bg-red-500/[0.02] h-full">
                <div className="flex items-center gap-2 mb-6">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-bold text-red-400 font-mono">WITHOUT AQUA</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "AI outputs with no verifiable origin",
                    "Identities that can be spoofed trivially",
                    "No audit trail for data access",
                    "Tampering is undetectable",
                    "Trust based on faith, not proof",
                    "Central authorities as single points of failure",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500 mt-0.5 font-mono font-bold text-lg leading-none">&times;</span>
                      <span className="text-gray-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>

            {/* With Aqua */}
            <RevealSection delay={200}>
              <div className="p-8 rounded-xl border border-green-500/20 bg-green-500/[0.02] h-full">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-bold text-green-400 font-mono">WITH AQUA V4</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Every output carries cryptographic provenance",
                    "Self-sovereign identity with peer attestation",
                    "Complete, immutable access audit trail",
                    "Instant tamper detection via hash verification",
                    "Trust based on mathematics, not authority",
                    "Decentralized — no single point of failure",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-24 border-t border-green-900/20">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <div className="text-center rounded-2xl border border-green-500/20 bg-[#0a0f0a]/80 p-12 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 mb-8">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-mono text-green-400">STATUS: READY TO DEPLOY</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Secure the AI era.<br />
                  <span className="text-green-400">Start with Aqua.</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                  Open-source. Decentralized. Cryptographically sound.
                  <br />
                  <span className="text-green-400/80 font-mono">Build free. Deploy enterprise.</span>
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/docs/v4.0.0/en/welcome"
                    className="group px-8 py-4 bg-green-500 text-black font-bold font-mono rounded-lg hover:bg-green-400 transition-all flex items-center gap-2 text-lg"
                  >
                    READ THE DOCS
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="https://aquafier.inblock.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-gray-600 text-gray-300 font-mono rounded-lg hover:border-green-500/50 hover:text-green-400 transition-all flex items-center gap-2 text-lg"
                  >
                    TRY AQUAFIRE
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-green-900/20 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo/aqua-logo.png" alt="Aqua" className="h-6 w-auto" />
            <span className="text-sm text-gray-500 font-mono">AQUA PROTOCOL V4</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="https://github.com/inblockio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors text-sm font-mono">
              GITHUB
            </Link>
            <Link href="https://twitter.com/inblockio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors text-sm font-mono">
              X/TWITTER
            </Link>
            <Link href="/docs/v4.0.0/en/welcome" className="text-gray-500 hover:text-green-400 transition-colors text-sm font-mono">
              DOCS
            </Link>
          </div>
          <div className="text-xs text-gray-600 font-mono">
            &copy; 2024 inBlock.io — All rights reserved
          </div>
        </div>
      </footer>
    </div>
  )
}
