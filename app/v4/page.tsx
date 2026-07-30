"use client"

import Link from "next/link"
import {
  ArrowRight,
  AlertTriangle,
  Bot,
  Building2,
  CheckCircle,
  Clock,
  Code,
  ExternalLink,
  Eye,
  FileCheck,
  Fingerprint,
  Globe,
  KeyRound,
  Landmark,
  LockKeyhole,
  Quote,
  Scale,
  Shield,
  ShieldCheck,
  Signature,
  Terminal,
  TrendingUp,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

import AquaAnimation from "../components/aqua-animation"
import { ThemeToggle } from "../components/theme-toggle-client"

/**
 * /v4 landing page. Same product, same voice as the v4 teaser rendered at
 * /docs/v4.0.0/welcome: an open standard under active development, presented
 * calmly. Design primitives (--v4-* tokens, .v4-* atmosphere classes) are
 * global and defined in app/globals.css; fonts arrive as CSS variables from
 * app/v4/layout.tsx because this file is a client component.
 *
 * Accent family: azure #1a7fe8. The only second colour is the muted warning
 * register (--v4-warn-*), used for "unresolved", never as an alarm.
 */

// Azure-family palette for the hash-chain canvas, identical to the teaser so
// the two pages read as one system. Module scope keeps the reference stable
// across renders (AquaAnimation lists nodeColors in its effect deps).
const AZURE_NODE_COLORS: Partial<
  Record<"genesis" | "revision" | "signature" | "witness", [number, number, number]>
> = {
  genesis: [26, 127, 232], // azure-500
  revision: [76, 155, 239], // azure-400
  signature: [18, 101, 196], // azure-700
  witness: [124, 184, 242], // azure-300
}

/* Shared class recipes. Written out as literals so Tailwind's scanner sees
   every utility, then composed by reference at the call sites. */
const DISPLAY = "font-[family-name:var(--font-v4-display)]"

const CARD =
  "rounded-2xl border border-slate-900/15 bg-white/75 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]"

const CARD_HOVER =
  "transition-all duration-300 hover:border-[#1a7fe8]/50 hover:shadow-[0_12px_40px_-10px_rgba(26,127,232,0.35)] dark:hover:border-[#1a7fe8]/60 dark:hover:shadow-[0_12px_40px_-10px_rgba(26,127,232,0.3)]"

const WARN_CARD =
  "rounded-2xl border border-[var(--v4-warn-border)] bg-[var(--v4-warn-bg)] backdrop-blur-md"

const INNER_PANEL =
  "rounded-xl border border-slate-900/10 bg-white/60 dark:border-white/10 dark:bg-white/[0.03]"

const PANEL_HEADER =
  "flex items-center gap-2 border-b border-slate-900/10 bg-slate-900/[0.03] px-5 py-3 dark:border-white/10 dark:bg-white/[0.03]"

const SECTION = "relative border-t border-slate-900/10 py-20 dark:border-white/10 sm:py-24"

const EYEBROW =
  "text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-white/50"

const ICON_TILE =
  "flex items-center justify-center rounded-xl bg-[#1a7fe8]/10 dark:bg-[#1a7fe8]/15"

const BODY = "text-slate-600 dark:text-white/70"
const MUTED = "text-slate-500 dark:text-white/50"

const GHOST_BUTTON =
  "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-900/20 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-[#1a7fe8]/50 hover:text-[var(--v4-accent-text)] dark:border-white/20 dark:text-white/80 dark:hover:border-[#1a7fe8]/60 dark:hover:text-[var(--v4-azure-300)]"

const HERO_QUESTIONS = [
  "Who created this AI output?",
  "Can I trust this data source?",
  "Was this model tampered with?",
  "Is this identity verified?",
  "Who authorized this access?",
]

/* Scroll-reveal section. Under prefers-reduced-motion the content is simply
   present: no transition, no dependence on the observer firing. */
function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If the element has already scrolled past the viewport, reveal immediately
    const rect = el.getBoundingClientRect()
    if (rect.bottom < window.innerHeight) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function V4LandingPage() {
  return (
    <div className="v4-page v4-bg v4-vignette relative min-h-screen overflow-x-hidden text-slate-900 dark:text-white">
      <div className="relative z-10">
        {/* Nav */}
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-900/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-[#06080d]/80">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo/aqua-logo.png" alt="Aqua" className="h-8 w-auto" />
              <span className={`text-lg font-semibold text-slate-900 dark:text-white ${DISPLAY}`}>
                Aqua <span className="text-[var(--v4-accent-text)]">V4</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="https://x.com/inblockio"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden min-h-[44px] items-center px-1 text-sm font-medium transition-colors hover:text-[var(--v4-accent-text)] sm:inline-flex ${BODY}`}
              >
                Updates
              </Link>
              <Link
                href="https://github.com/inblockio"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden min-h-[44px] items-center px-1 text-sm font-medium transition-colors hover:text-[var(--v4-accent-text)] sm:inline-flex ${BODY}`}
              >
                GitHub
              </Link>
              <Link
                href="https://calendly.com/tim-bansemer/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full bg-[var(--v4-azure-600)] px-5 text-sm font-semibold text-white shadow-sm shadow-[color:rgba(22,112,214,0.3)] transition hover:bg-[var(--v4-azure-700)]"
              >
                Get in touch
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Hero. The atmosphere (glow + hash-chain network) is bounded to this
            section by two nested wrappers carrying a single mask each: outer
            keeps the network off the copy, inner dissolves it before the hero's
            bottom edge. Nothing below the hero ever has a line drawn over it. */}
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="v4-glow absolute inset-0" />
            <div className="v4-net-outer absolute inset-0 motion-reduce:hidden">
              <div className="v4-net-inner absolute inset-0">
                <AquaAnimation
                  laneCount={8}
                  topPadding={16}
                  fadeAboveSelector="#v4-hero-end"
                  nodeColors={AZURE_NODE_COLORS}
                />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="v4-veil pointer-events-none absolute inset-0" />

          <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40 lg:px-8">
            <div className="v4-stagger max-w-[820px]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 dark:text-white/90 sm:text-base">
                  Aqua Protocol · <span className="text-[var(--v4-accent-text)]">Version 4</span>
                </p>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-[#1265c4]/40 bg-[#1a7fe8]/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--v4-accent-text)] dark:border-[#1a7fe8]/50 dark:bg-[#1a7fe8]/[0.12] dark:text-[var(--v4-azure-300)]">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-[var(--v4-azure-500)] dark:bg-[var(--v4-azure-400)]"
                  />
                  In development
                </p>
              </div>

              <h1
                className={`mt-6 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl ${DISPLAY}`}
              >
                <span className="text-slate-900 dark:text-white">AI is moving fast.</span>
                <br />
                <span className="text-[var(--v4-warn-text)]">Security can&apos;t keep up.</span>
              </h1>

              <ul className={`mt-8 flex max-w-[640px] flex-wrap gap-x-6 gap-y-2 text-base ${BODY}`}>
                {HERO_QUESTIONS.map((question) => (
                  <li key={question} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-[var(--v4-azure-500)]"
                    />
                    {question}
                  </li>
                ))}
              </ul>

              <p className={`mt-8 max-w-[640px] text-lg leading-relaxed sm:text-xl ${BODY}`}>
                Aqua V4 is the{" "}
                <span className="font-semibold text-[var(--v4-accent-text)]">
                  trust infrastructure
                </span>{" "}
                for the AI era: identity, access control, and provenance.{" "}
                <span className={MUTED}>
                  Cryptographic proof that the data you use, produce, and share is real.
                </span>
              </p>

              <div
                id="v4-hero-end"
                className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
              >
                <Link
                  href="https://calendly.com/tim-bansemer/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--v4-azure-600)] px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-[color:rgba(22,112,214,0.3)] transition hover:bg-[var(--v4-azure-700)] hover:shadow-lg hover:shadow-[color:rgba(22,112,214,0.4)]"
                >
                  <span>Get in touch</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="https://agentic.inblock.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-base font-medium text-[var(--v4-accent-text)] underline decoration-[#1a7fe8]/35 underline-offset-4 transition-colors hover:decoration-[#1a7fe8]"
                >
                  Aqua for AI agents
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className={SECTION}>
          <div className="mx-auto max-w-6xl px-6">
            <RevealSection>
              <div className="mb-14 max-w-3xl">
                <h2 className={EYEBROW}>The problem</h2>
                <p
                  className={`mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl ${DISPLAY}`}
                >
                  The AI trust crisis
                </p>
                <p className={`mt-4 text-lg leading-relaxed ${BODY}`}>
                  AI is generating content, making decisions, and accessing systems at
                  unprecedented scale. But there is no infrastructure to verify any of it.
                </p>
              </div>
            </RevealSection>

            {/* Industry signal */}
            <RevealSection delay={200}>
              <div className={`mb-10 overflow-hidden ${CARD}`}>
                <div className={PANEL_HEADER}>
                  <Quote aria-hidden="true" className="h-3.5 w-3.5 text-[var(--v4-accent-text)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">
                    Industry signal · Lex Fridman
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <blockquote
                    className={`mb-6 border-l-2 border-[#1a7fe8]/40 pl-5 text-base leading-relaxed md:text-lg ${BODY}`}
                  >
                    &ldquo;Very soon, if not already,{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      security will become THE bottleneck
                    </span>{" "}
                    for effectiveness and usefulness of AI agents as a whole, since
                    intelligence is still rapidly scaling and is no longer an obvious
                    bottleneck for many use-cases.&rdquo;
                  </blockquote>
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                      <div className={`mb-3 text-sm ${MUTED}`}>
                        Lex identifies three pillars of AI agent power:
                      </div>
                      <div className="grid grid-cols-1 gap-3 text-xs md:grid-cols-3">
                        <div className={`flex items-center gap-2 px-3 py-2 ${INNER_PANEL}`}>
                          <span className="text-slate-400 dark:text-white/40">1.</span>
                          <span className={BODY}>Model intelligence</span>
                          <span className="ml-auto font-semibold uppercase tracking-wider text-[var(--v4-accent-text)]">
                            Scaling
                          </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-[var(--v4-warn-border)] bg-[var(--v4-warn-bg)] px-3 py-2">
                          <span className="text-[var(--v4-warn-text)]">2.</span>
                          <span className={BODY}>Data access</span>
                          <span className="ml-auto font-semibold uppercase tracking-wider text-[var(--v4-warn-text)]">
                            Unsecured
                          </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-[var(--v4-warn-border)] bg-[var(--v4-warn-bg)] px-3 py-2">
                          <span className="text-[var(--v4-warn-text)]">3.</span>
                          <span className={BODY}>Agent autonomy</span>
                          <span className="ml-auto font-semibold uppercase tracking-wider text-[var(--v4-warn-text)]">
                            Unsecured
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="https://x.com/lexfridman/status/2023573186496037044"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-[var(--v4-accent-text)] ${MUTED}`}
                    >
                      Source <ExternalLink aria-hidden="true" className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Regulatory context */}
            <RevealSection delay={300}>
              <div className={`mb-14 overflow-hidden ${CARD}`}>
                <div className={PANEL_HEADER}>
                  <Scale aria-hidden="true" className="h-3.5 w-3.5 text-[var(--v4-accent-text)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">
                    Regulatory context
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <p className={`mb-6 text-sm leading-relaxed ${BODY}`}>
                    It is not just the market.{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Regulators on both sides of the Atlantic are converging
                    </span>{" "}
                    on the same conclusion: AI systems need verifiable provenance, identity,
                    and audit infrastructure. This is becoming law.
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* US: NTIA */}
                    <div className={`p-5 ${INNER_PANEL}`}>
                      <div className="mb-4 flex items-center gap-2">
                        <Landmark
                          aria-hidden="true"
                          className="h-4 w-4 text-[var(--v4-accent-text)]"
                        />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          US: NTIA RFC 2023-07776
                        </span>
                      </div>
                      <p className={`mb-4 text-xs leading-relaxed ${BODY}`}>
                        The National Telecommunications and Information Administration called
                        for public input on AI accountability, receiving 1,400+ comments. The
                        resulting 2024 report explicitly recommends investment in:
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-[var(--v4-azure-500)]"
                          >
                            &gt;
                          </span>
                          <span className={BODY}>
                            <span className="font-semibold text-[var(--v4-accent-text)]">
                              Rec. 5:
                            </span>{" "}
                            &ldquo;Provenance technologies&rdquo; to assess AI training data
                            and usage
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-[var(--v4-azure-500)]"
                          >
                            &gt;
                          </span>
                          <span className={BODY}>
                            <span className="font-semibold text-[var(--v4-accent-text)]">
                              Rec. 2:
                            </span>{" "}
                            Standard disclosures for AI architecture, data, and performance
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-[var(--v4-azure-500)]"
                          >
                            &gt;
                          </span>
                          <span className={BODY}>
                            <span className="font-semibold text-[var(--v4-accent-text)]">
                              Rec. 6:
                            </span>{" "}
                            Independent evaluations of high-risk AI systems
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <Link
                          href="https://www.federalregister.gov/documents/2023/04/13/2023-07776/ai-accountability-policy-request-for-comment"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex min-h-[44px] items-center gap-1 px-2 text-xs font-medium transition-colors hover:text-[var(--v4-accent-text)] ${MUTED}`}
                        >
                          RFC <ExternalLink aria-hidden="true" className="h-3 w-3" />
                        </Link>
                        <Link
                          href="https://www.ntia.gov/issues/artificial-intelligence/ai-accountability-policy-report"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex min-h-[44px] items-center gap-1 px-2 text-xs font-medium transition-colors hover:text-[var(--v4-accent-text)] ${MUTED}`}
                        >
                          Report <ExternalLink aria-hidden="true" className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>

                    {/* EU: AI Act */}
                    <div className={`p-5 ${INNER_PANEL}`}>
                      <div className="mb-4 flex items-center gap-2">
                        <Scale aria-hidden="true" className="h-4 w-4 text-[var(--v4-accent-text)]" />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          EU: AI Act (2024/1689)
                        </span>
                      </div>
                      <p className={`mb-4 text-xs leading-relaxed ${BODY}`}>
                        The world&apos;s first comprehensive AI regulation. Entered into force
                        August 2024, with obligations phasing in through 2026. Non-compliance
                        carries severe penalties.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-[var(--v4-azure-500)]"
                          >
                            &gt;
                          </span>
                          <span className={BODY}>
                            <span className="font-semibold text-[var(--v4-accent-text)]">
                              Art. 10:
                            </span>{" "}
                            Data governance: provenance documentation, source traceability
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-[var(--v4-azure-500)]"
                          >
                            &gt;
                          </span>
                          <span className={BODY}>
                            <span className="font-semibold text-[var(--v4-accent-text)]">
                              Art. 12:
                            </span>{" "}
                            Automatic logging for traceability and post-market monitoring
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-[var(--v4-azure-500)]"
                          >
                            &gt;
                          </span>
                          <span className={BODY}>
                            <span className="font-semibold text-[var(--v4-accent-text)]">
                              Art. 13:
                            </span>{" "}
                            Transparency obligations for AI system providers
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <Link
                          href="https://artificialintelligenceact.eu/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex min-h-[44px] items-center gap-1 px-2 text-xs font-medium transition-colors hover:text-[var(--v4-accent-text)] ${MUTED}`}
                        >
                          Full text <ExternalLink aria-hidden="true" className="h-3 w-3" />
                        </Link>
                        <span className="text-xs font-medium text-[var(--v4-warn-text)]">
                          Penalty: up to 7% of global turnover
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Open gaps */}
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Bot,
                  title: "Identity crisis",
                  body: "AI agents act on behalf of users, but there is no way to verify who they represent. Spoofed identities, unauthorized delegation, zero accountability.",
                  code: "identity.verify() → UNDEFINED",
                  delay: 100,
                },
                {
                  icon: Eye,
                  title: "Access chaos",
                  body: "AI models consume data from everywhere. No granular access control. No audit trail. No way to know what data was used, when, or by whom.",
                  code: "access.log() → NULL",
                  delay: 200,
                },
                {
                  icon: AlertTriangle,
                  title: "Provenance gap",
                  body: "Where did this data come from? Was it tampered with? Is this output real or generated? Without provenance, AI outputs are just noise.",
                  code: "data.origin() → UNKNOWN",
                  delay: 300,
                },
              ].map(({ icon: Icon, title, body, code, delay }) => (
                <RevealSection key={title} delay={delay}>
                  <div className={`h-full p-6 ${WARN_CARD}`}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--v4-warn-bg)] ring-1 ring-[var(--v4-warn-border)]">
                        <Icon aria-hidden="true" className="h-5 w-5 text-[var(--v4-warn-text)]" />
                      </div>
                      <h3
                        className={`text-lg font-semibold text-slate-900 dark:text-white ${DISPLAY}`}
                      >
                        {title}
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${BODY}`}>{body}</p>
                    <div className="mt-4 font-mono text-xs text-[var(--v4-warn-text)]">
                      &gt; {code}
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* The solution */}
        <section className={SECTION}>
          <div className="mx-auto max-w-6xl px-6">
            <RevealSection>
              <div className="mb-14 max-w-3xl">
                <h2 className={EYEBROW}>The solution</h2>
                <p
                  className={`mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl ${DISPLAY}`}
                >
                  Aqua V4:{" "}
                  <span className="text-[var(--v4-azure-700)] dark:text-[var(--v4-azure-500)]">
                    trust infrastructure
                  </span>
                </p>
                <p className={`mt-4 text-lg leading-relaxed ${BODY}`}>
                  A cryptographic protocol that gives AI systems what they are missing:
                  verifiable identity, granular access control, and tamper-proof provenance.
                </p>
              </div>
            </RevealSection>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Fingerprint,
                  title: "Identity",
                  body: "Self-sovereign identity with cryptographic attestation. Every agent, every model, every user, verified and accountable.",
                  points: [
                    "Peer-to-peer attestation",
                    "Challenge-based verification",
                    "No central authority needed",
                  ],
                  delay: 100,
                },
                {
                  icon: KeyRound,
                  title: "Access control",
                  body: "Granular, cryptographic access policies. Control exactly who and what can read, write, or delegate across your data.",
                  points: [
                    "Revision-level permissions",
                    "Auditable access trails",
                    "Zero-trust architecture",
                  ],
                  delay: 200,
                },
                {
                  icon: FileCheck,
                  title: "Provenance",
                  body: "Every piece of data carries its full history. Tamper-proof, portable, and independently verifiable, with no blockchain required.",
                  points: [
                    "Cryptographic hash chains",
                    "Portable verification",
                    "Instant tamper detection",
                  ],
                  delay: 300,
                },
              ].map(({ icon: Icon, title, body, points, delay }) => (
                <RevealSection key={title} delay={delay}>
                  <div className={`group h-full p-8 ${CARD} ${CARD_HOVER}`}>
                    <div
                      className={`mb-6 h-14 w-14 transition-colors group-hover:bg-[#1a7fe8]/15 ${ICON_TILE}`}
                    >
                      <Icon aria-hidden="true" className="h-7 w-7 text-[var(--v4-accent-text)]" />
                    </div>
                    <h3
                      className={`mb-3 text-xl font-semibold text-slate-900 dark:text-white ${DISPLAY}`}
                    >
                      {title}
                    </h3>
                    <p className={`mb-5 leading-relaxed ${BODY}`}>{body}</p>
                    <ul className="space-y-2 text-sm">
                      {points.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <CheckCircle
                            aria-hidden="true"
                            className="h-3.5 w-3.5 shrink-0 text-[var(--v4-accent-text)]"
                          />
                          <span className={BODY}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={SECTION}>
          <div className="mx-auto max-w-6xl px-6">
            <RevealSection>
              <div className="mb-14 max-w-3xl">
                <h2 className={EYEBROW}>How it works</h2>
                <p
                  className={`mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl ${DISPLAY}`}
                >
                  Pillars of{" "}
                  <span className="text-[var(--v4-azure-700)] dark:text-[var(--v4-azure-500)]">
                    verifiable trust
                  </span>
                </p>
                <p className={`mt-4 text-lg leading-relaxed ${BODY}`}>
                  Aqua combines cryptographic hash chains, modular signatures, optional
                  timestamping, and decentralized verification to create trust without central
                  authorities.
                </p>
              </div>
            </RevealSection>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  number: "01",
                  icon: FileCheck,
                  title: "Portable hash-chains",
                  body: (
                    <>
                      Aqua creates{" "}
                      <span className="font-medium text-slate-900 dark:text-white">AquaTrees</span>,
                      portable data structures that record a complete history of revisions with
                      cryptographic precision. Every change is chained, every version is
                      preserved.
                    </>
                  ),
                  note: "Each revision linked by hash to its predecessor",
                  delay: 100,
                },
                {
                  number: "02",
                  icon: Signature,
                  title: "Modular signatures",
                  body: (
                    <>
                      Aqua supports{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        multiple signature schemes
                      </span>
                      : Ethereum wallets, DIDs, X.509 certificates, and more. The signature layer
                      is modular by design: plug in the cryptographic paradigm that fits your
                      security requirements without changing the protocol.
                    </>
                  ),
                  note: "One protocol, any signature scheme",
                  delay: 200,
                },
                {
                  number: "03",
                  icon: Clock,
                  title: "Immutable timestamps",
                  body: (
                    <>
                      Anchor your data to tamper-proof timelines via the{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        Ethereum blockchain
                      </span>
                      ,{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        qualified TSA services
                      </span>{" "}
                      (eIDAS-compliant), or both. Blockchain is optional; Aqua integrates with
                      existing institutional infrastructure and decentralized networks alike.
                    </>
                  ),
                  note: "Blockchain or TSA: choose your trust anchor",
                  delay: 300,
                },
                {
                  number: "04",
                  icon: LockKeyhole,
                  title: "Flexible trust",
                  body: (
                    <>
                      Aqua bridges institutional and decentralized worlds. Use{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        enterprise registries
                      </span>{" "}
                      for regulatory compliance or{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        community-driven decentralized registries
                      </span>{" "}
                      for open verification, or combine both. One protocol, every trust model.
                    </>
                  ),
                  note: "Institutional or decentralized: works with both",
                  delay: 400,
                },
              ].map(({ number, icon: Icon, title, body, note, delay }) => (
                <RevealSection key={number} delay={delay} className="h-full">
                  <div className={`group h-full p-8 ${CARD} ${CARD_HOVER}`}>
                    <span
                      aria-hidden="true"
                      className={`text-4xl font-bold text-slate-900/15 dark:text-white/15 ${DISPLAY}`}
                    >
                      {number}
                    </span>
                    <div
                      className={`mb-5 mt-3 h-12 w-12 transition-colors group-hover:bg-[#1a7fe8]/15 ${ICON_TILE}`}
                    >
                      <Icon aria-hidden="true" className="h-6 w-6 text-[var(--v4-accent-text)]" />
                    </div>
                    <h3
                      className={`mb-3 text-lg font-semibold text-slate-900 dark:text-white ${DISPLAY}`}
                    >
                      {title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${BODY}`}>{body}</p>
                    <div
                      className={`mt-5 border-t border-slate-900/10 pt-4 font-mono text-xs dark:border-white/10 ${MUTED}`}
                    >
                      &gt; {note}
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Open protocol */}
        <section className={SECTION}>
          <div className="mx-auto max-w-4xl px-6">
            <RevealSection>
              <div className="text-center">
                <h2 className={EYEBROW}>Open protocol</h2>
                <p
                  className={`mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl ${DISPLAY}`}
                >
                  The{" "}
                  <span className="text-[var(--v4-azure-700)] dark:text-[var(--v4-azure-500)]">
                    Kubernetes
                  </span>{" "}
                  of AI verification
                </p>
                <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${BODY}`}>
                  Aqua V4 is fully open source. Trust infrastructure cannot depend on a single
                  vendor; it must be auditable, forkable, and verifiable by anyone. Free to build
                  on. Enterprises deploy with production-grade infrastructure, compliance, and
                  SLAs.
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {[
                  {
                    icon: Code,
                    title: "Open spec",
                    body: "Full protocol specification, verification trees, and SDK, all publicly auditable.",
                  },
                  {
                    icon: Globe,
                    title: "Open standard",
                    body: "Interoperable by design. Every implementation strengthens the verification network.",
                  },
                  {
                    icon: Shield,
                    title: "Enterprise ready",
                    body: "Build free. Deploy with production-grade infrastructure, SLAs, and compliance.",
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className={`p-6 text-center ${CARD}`}>
                    <Icon
                      aria-hidden="true"
                      className="mx-auto mb-3 h-6 w-6 text-[var(--v4-accent-text)]"
                    />
                    <div
                      className={`mb-1.5 text-sm font-semibold text-slate-900 dark:text-white ${DISPLAY}`}
                    >
                      {title}
                    </div>
                    <p className={`text-xs leading-relaxed ${MUTED}`}>{body}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Who it is for */}
        <section className={SECTION}>
          <div className="mx-auto max-w-6xl px-6">
            <RevealSection>
              <div className="mb-14 max-w-3xl">
                <h2 className={EYEBROW}>Who it&apos;s for</h2>
                <p
                  className={`mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl ${DISPLAY}`}
                >
                  One protocol.{" "}
                  <span className="text-[var(--v4-azure-700)] dark:text-[var(--v4-azure-500)]">
                    Every stakeholder.
                  </span>
                </p>
              </div>
            </RevealSection>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  title: "Operate",
                  body: (
                    <>
                      Operational trust for AI agents. Identity proves{" "}
                      <span className="font-medium text-slate-900 dark:text-white">who</span> an
                      agent is; authorization defines{" "}
                      <span className="font-medium text-slate-900 dark:text-white">what it may do</span>
                      . Agents cannot exceed their boundaries, and every action leaves verifiable
                      proof of what actually occurred.
                    </>
                  ),
                  cta: "Explore operational trust",
                  href: "https://agentic.inblock.io",
                  delay: 100,
                },
                {
                  icon: TrendingUp,
                  title: "Invest",
                  body: (
                    <>
                      Trust infrastructure for AI:{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        regulatory tailwinds
                      </span>
                      , enterprise monetization, and a massive unmet market. The security layer AI
                      has been missing.
                    </>
                  ),
                  cta: "Book a call",
                  href: "https://calendly.com/tim-bansemer/30min",
                  delay: 200,
                },
                {
                  icon: Building2,
                  title: "License & integrate",
                  body: (
                    <>
                      Enterprise-grade,{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        compliance-ready
                      </span>{" "}
                      deployment. Custom integration, licensing, and production infrastructure for
                      your organization.
                    </>
                  ),
                  cta: "Request a demo",
                  href: "https://calendly.com/tim-bansemer/30min",
                  delay: 300,
                },
                {
                  icon: Terminal,
                  title: "Build",
                  body: (
                    <>
                      Open protocol, open SDK. Ship{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        verified AI applications
                      </span>{" "}
                      with cryptographic trust baked in from day one.
                    </>
                  ),
                  cta: "View on GitHub",
                  href: "https://github.com/inblockio",
                  delay: 400,
                },
              ].map(({ icon: Icon, title, body, cta, href, delay }) => (
                <RevealSection key={title} delay={delay} className="h-full">
                  <div className={`group flex h-full flex-col p-8 ${CARD} ${CARD_HOVER}`}>
                    <div
                      className={`mb-5 h-12 w-12 transition-colors group-hover:bg-[#1a7fe8]/15 ${ICON_TILE}`}
                    >
                      <Icon aria-hidden="true" className="h-6 w-6 text-[var(--v4-accent-text)]" />
                    </div>
                    <h3
                      className={`mb-3 text-lg font-semibold text-slate-900 dark:text-white ${DISPLAY}`}
                    >
                      {title}
                    </h3>
                    <p className={`mb-6 text-sm leading-relaxed ${BODY}`}>{body}</p>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto self-start ${GHOST_BUTTON}`}
                    >
                      {cta}
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* See it in action */}
        <section className={SECTION}>
          <div className="mx-auto max-w-4xl px-6">
            <RevealSection>
              <div className="mb-12 max-w-3xl">
                <h2 className={EYEBROW}>See it in action</h2>
                <p
                  className={`mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl ${DISPLAY}`}
                >
                  From{" "}
                  <span className="text-[var(--v4-warn-text)]">vulnerable</span> to{" "}
                  <span className="text-[var(--v4-azure-700)] dark:text-[var(--v4-azure-500)]">
                    verified
                  </span>
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={100}>
              <div className="overflow-hidden rounded-2xl border border-slate-900/15 bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-[#070b12]/85">
                {/* Terminal chrome */}
                <div className="flex items-center gap-2 border-b border-slate-900/10 bg-slate-900/[0.03] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full bg-slate-900/15 dark:bg-white/15"
                  />
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full bg-slate-900/15 dark:bg-white/15"
                  />
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full bg-[var(--v4-azure-500)]/50"
                  />
                  <span className={`ml-2 font-mono text-xs ${MUTED}`}>
                    aqua-v4 · trust-pipeline
                  </span>
                </div>
                {/* Transcript */}
                <div className="space-y-4 p-6 font-mono text-sm">
                  <div>
                    <span className="text-[var(--v4-accent-text)]">$</span>{" "}
                    <span className="text-slate-800 dark:text-white/90">
                      aqua init --protocol v4
                    </span>
                    <div className={`mt-1 ${MUTED}`}>Initializing Aqua trust chain...</div>
                    <div className="mt-1 text-[var(--v4-accent-text)]">
                      &#10003; Genesis revision created
                    </div>
                  </div>
                  <div>
                    <span className="text-[var(--v4-accent-text)]">$</span>{" "}
                    <span className="text-slate-800 dark:text-white/90">
                      aqua sign --identity did:aqua:0x7f3a...
                    </span>
                    <div className={`mt-1 ${MUTED}`}>Binding cryptographic identity...</div>
                    <div className="mt-1 text-[var(--v4-accent-text)]">
                      &#10003; Identity attested and sealed
                    </div>
                  </div>
                  <div>
                    <span className="text-[var(--v4-accent-text)]">$</span>{" "}
                    <span className="text-slate-800 dark:text-white/90">
                      aqua verify --file ai-output.json
                    </span>
                    <div className={`mt-1 ${MUTED}`}>Verifying provenance chain...</div>
                    <div className={`mt-1 ${MUTED}`}>
                      Checking 14 revisions across 3 witnesses...
                    </div>
                    <div className="mt-1 text-[var(--v4-accent-text)]">
                      &#10003; INTEGRITY VERIFIED: all hashes match
                    </div>
                    <div className="text-[var(--v4-accent-text)]">
                      &#10003; IDENTITY CONFIRMED: signer verified
                    </div>
                    <div className="text-[var(--v4-accent-text)]">
                      &#10003; PROVENANCE VALID: complete chain from origin
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t border-slate-900/10 pt-4 dark:border-white/10">
                    <span className="text-[var(--v4-accent-text)]">$</span>
                    <span
                      aria-hidden="true"
                      className="inline-block h-4 w-2 bg-[var(--v4-accent-text)]/50"
                    />
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* The difference */}
        <section className={SECTION}>
          <div className="mx-auto max-w-6xl px-6">
            <RevealSection>
              <div className="mb-14 max-w-3xl">
                <h2 className={EYEBROW}>The difference</h2>
                <p
                  className={`mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl ${DISPLAY}`}
                >
                  Without vs. with{" "}
                  <span className="text-[var(--v4-azure-700)] dark:text-[var(--v4-azure-500)]">
                    Aqua
                  </span>
                </p>
              </div>
            </RevealSection>

            <div className="grid gap-6 md:grid-cols-2">
              <RevealSection delay={100} className="h-full">
                <div className={`h-full p-8 ${WARN_CARD}`}>
                  <div className="mb-6 flex items-center gap-2">
                    <AlertTriangle
                      aria-hidden="true"
                      className="h-5 w-5 text-[var(--v4-warn-text)]"
                    />
                    <h3
                      className={`text-lg font-semibold text-slate-900 dark:text-white ${DISPLAY}`}
                    >
                      Without Aqua
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "AI outputs with no verifiable origin",
                      "Identities that can be spoofed trivially",
                      "No audit trail for data access",
                      "Tampering is undetectable",
                      "Trust based on faith, not proof",
                      "Central authorities as single points of failure",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 text-lg font-bold leading-none text-[var(--v4-warn-text)]"
                        >
                          &times;
                        </span>
                        <span className={`text-sm ${BODY}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>

              <RevealSection delay={200} className="h-full">
                <div className={`h-full p-8 ${CARD}`}>
                  <div className="mb-6 flex items-center gap-2">
                    <Shield aria-hidden="true" className="h-5 w-5 text-[var(--v4-accent-text)]" />
                    <h3
                      className={`text-lg font-semibold text-slate-900 dark:text-white ${DISPLAY}`}
                    >
                      With Aqua V4
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Every output carries cryptographic provenance",
                      "Self-sovereign identity with peer attestation",
                      "Complete, immutable access audit trail",
                      "Instant tamper detection via hash verification",
                      "Trust based on mathematics, not authority",
                      "Decentralized, with no single point of failure",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--v4-accent-text)]"
                        />
                        <span className={`text-sm ${BODY}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* Close */}
        <section className={SECTION}>
          <div className="mx-auto max-w-4xl px-6">
            <RevealSection>
              <div className={`relative overflow-hidden p-10 text-center md:p-14 ${CARD}`}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a7fe8]/[0.07] to-transparent"
                />
                <div className="relative">
                  <h2
                    className={`text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl ${DISPLAY}`}
                  >
                    Work with us on Aqua V4
                  </h2>
                  <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${BODY}`}>
                    Version 4 is in active development as a proposed open standard. If you are
                    evaluating it, integrating it, or would like a technical walkthrough, we are
                    happy to talk.
                  </p>
                  <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                      href="https://calendly.com/tim-bansemer/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--v4-azure-600)] px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-[color:rgba(22,112,214,0.3)] transition hover:bg-[var(--v4-azure-700)] hover:shadow-lg hover:shadow-[color:rgba(22,112,214,0.4)]"
                    >
                      Book a call
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://x.com/inblockio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={GHOST_BUTTON}
                    >
                      Follow updates
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-slate-900/10 py-10 dark:border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
            <div className="flex items-center gap-2">
              <img src="/logo/aqua-logo.png" alt="Aqua" className="h-6 w-auto" />
              <span className={`text-sm ${MUTED}`}>Aqua Protocol V4</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/inblockio"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-[44px] items-center text-sm font-medium transition-colors hover:text-[var(--v4-accent-text)] ${MUTED}`}
              >
                GitHub
              </Link>
              <Link
                href="https://x.com/inblockio"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-[44px] items-center text-sm font-medium transition-colors hover:text-[var(--v4-accent-text)] ${MUTED}`}
              >
                X
              </Link>
            </div>
            <p className="text-xs text-slate-500 dark:text-white/40">
              &copy; 2026 inBlock.io. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
