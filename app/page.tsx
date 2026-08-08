import Link from "next/link"
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google"
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Code2,
  ExternalLink,
  FileText,
  Fingerprint,
  Github,
  GitPullRequest,
  Globe,
  Linkedin,
  ScrollText,
  ShieldCheck,
} from "lucide-react"

import { getConfig, getAssetPath } from "specra/lib"
import { ThemeToggle } from "./components/theme-toggle-client"
import AquaAnimation from "./components/aqua-animation"

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/**
 * Landing page for aqua-protocol.org, the home of the Aqua standardisation
 * effort. Standards-site register: state what the protocol is, its status
 * (proposed standard, not yet ratified), and where the public resources live.
 * No product content; products built on the protocol belong to inblock.io.
 *
 * Design language mirrors the v4 teaser (azure accent family, DM Sans body,
 * Plus Jakarta display, bounded hero atmosphere) so the site reads as one
 * system. Shared constants stay duplicated from v4-teaser.tsx for now because
 * that file is being worked on in parallel; extract once it is open for edits.
 */

const dmSans = DM_Sans({ subsets: ["latin"] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

// Azure-family palette for the hash-chain canvas (same values as the teaser).
const AZURE_NODE_COLORS: Partial<
  Record<"genesis" | "revision" | "signature" | "witness", [number, number, number]>
> = {
  genesis: [26, 127, 232], // azure-500
  revision: [76, 155, 239], // azure-400
  signature: [18, 101, 196], // azure-700
  witness: [124, 184, 242], // azure-300
}

// v4 is stealth-gated (see README), so every entry point stays pinned to the
// newest published version until v4 goes public.
const DOCS_URL = "/docs/v3.0.2/introduction"
const SPEC_URL = "/docs/v3.0.2/schema"
const WHITEPAPER_URL = "/docs/v1.1.0/whitepaper"
const V4_STATUS_URL = "/docs/v4.0.0/welcome"
const GITHUB_ORG_URL = "https://github.com/inblockio"
const AIP_URL = "https://github.com/inblockio/aqua-improvement-proposal"
const EXAMPLES_URL = "https://github.com/inblockio/aqua-examples"
const INBLOCKIO_URL = "https://inblock.io"

const VALUE_CARDS = [
  {
    icon: ShieldCheck,
    title: "Proof, not platforms",
    body: "Records are secured by hash chains and cryptographic signatures. Verification requires no blockchain and no central authority: anyone holding the data can check it independently.",
  },
  {
    icon: Fingerprint,
    title: "Provenance that travels",
    body: "Every revision links to the one before it, forming a portable, gapless history of origin and change. Integrity stays checkable wherever the data goes.",
  },
  {
    icon: Globe,
    title: "Open by design",
    body: "An open standard with open-source implementations. Only hashes ever need to leave your hands, so the data itself stays private and under your control.",
  },
]

const RESOURCES = [
  {
    icon: FileText,
    title: "Specification",
    body: "The data structures, revision schema, and verification rules of version 3, the current published protocol.",
    href: SPEC_URL,
    label: "docs / v3.0.2 / schema",
    external: false,
  },
  {
    icon: BookOpen,
    title: "Documentation",
    body: "Introduction, concepts, and tooling reference for implementers of the current protocol.",
    href: DOCS_URL,
    label: "docs / v3.0.2",
    external: false,
  },
  {
    icon: ScrollText,
    title: "Whitepaper",
    body: "The original whitepaper: motivation, design principles, and the data accounting model.",
    href: WHITEPAPER_URL,
    label: "docs / v1.1.0 / whitepaper",
    external: false,
  },
  {
    icon: GitPullRequest,
    title: "Improvement proposals",
    body: "Protocol changes are proposed, discussed, and tracked in public as Aqua Improvement Proposals.",
    href: AIP_URL,
    label: "inblockio / aqua-improvement-proposal",
    external: true,
  },
  {
    icon: Code2,
    title: "Reference implementations",
    body: "Open-source SDKs, verifiers, and tools that implement the protocol.",
    href: GITHUB_ORG_URL,
    label: "github.com / inblockio",
    external: true,
  },
  {
    icon: Boxes,
    title: "Examples",
    body: "Example projects showing how the protocol is applied in practice.",
    href: EXAMPLES_URL,
    label: "inblockio / aqua-examples",
    external: true,
  },
]

const CARD_CLASS =
  "group rounded-2xl border border-slate-900/15 bg-white/75 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#1a7fe8]/50 hover:shadow-[0_12px_40px_-10px_rgba(26,127,232,0.35)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#1a7fe8]/60 dark:hover:shadow-[0_12px_40px_-10px_rgba(26,127,232,0.3)]"

const ICON_TILE_CLASS =
  "mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a7fe8]/10 transition-colors group-hover:bg-[#1a7fe8]/15 dark:bg-[#1a7fe8]/15"

export default function HomePage() {
  const config = getConfig()

  return (
    <div
      className={`v4-page v4-bg v4-vignette relative min-h-screen overflow-hidden text-slate-900 dark:text-white ${dmSans.className}`}
    >
      <div className="relative z-10">
        <header>
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5">
              {config.site.logo ? (
                <img
                  src={getAssetPath(
                    typeof config.site.logo === "string" ? config.site.logo : config.site.logo.dark ?? ""
                  )}
                  alt={config.site.title}
                  className="h-10 w-auto"
                />
              ) : null}
              <span className={`text-lg font-semibold ${plusJakarta.className}`}>Aqua Protocol</span>
            </Link>
            <div className="flex items-center gap-4">
              {config?.social?.github ? (
                <Link
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-slate-500 transition-colors hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </Link>
              ) : null}
              <ThemeToggle />
              <Link
                href={DOCS_URL}
                className="inline-flex items-center justify-center rounded-full bg-[var(--v4-azure-600)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--v4-azure-700)]"
              >
                Documentation
              </Link>
            </div>
          </div>
        </header>

        {/* Hero. Atmosphere (glow + hash-chain network + veil) is bounded to
            this section; see globals.css for the mask grammar. */}
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="v4-glow absolute inset-0" />
            <div className="v4-net-outer absolute inset-0 motion-reduce:hidden">
              <div className="v4-net-inner absolute inset-0">
                <AquaAnimation
                  laneCount={8}
                  topPadding={16}
                  fadeAboveSelector="#hero-end"
                  nodeColors={AZURE_NODE_COLORS}
                />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="v4-veil pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-24 lg:px-8">
            {/* v4-stagger animates at most five direct children; keep the copy
                block as one child. */}
            <div className="v4-stagger max-w-[820px]">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 dark:text-white/90 sm:text-base">
                Aqua Protocol ·{" "}
                <span className="text-[var(--v4-accent-text)]">Proposed open standard</span>
              </p>

              <h1
                className={`mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl ${plusJakarta.className}`}
              >
                An open protocol for{" "}
                <span className="text-[var(--v4-azure-700)] dark:text-[var(--v4-azure-500)]">
                  data accountability.
                </span>
              </h1>

              <div>
                <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-slate-600 dark:text-white/70 sm:text-xl">
                  Aqua specifies portable, tamper-evident records of provenance, signatures, and
                  time. Verification rests on cryptographic proof rather than platform trust:
                  anyone holding the data can check it independently.
                </p>
                <p className="mt-4 max-w-[640px] text-base leading-relaxed text-slate-500 dark:text-white/55">
                  This site supports the standardisation effort. It documents the protocol and
                  collects the specification and related resources, all publicly available and
                  free to use. Aqua is developed in the open and has not yet been adopted by a
                  standards body.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={DOCS_URL}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--v4-azure-600)] px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-[color:rgba(22,112,214,0.3)] transition hover:bg-[var(--v4-azure-700)] hover:shadow-lg hover:shadow-[color:rgba(22,112,214,0.4)]"
                >
                  <span>Read the documentation</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href={GITHUB_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-900/20 bg-white/60 px-7 py-3.5 text-base font-semibold text-slate-800 backdrop-blur-sm transition hover:border-[#1a7fe8]/60 hover:text-[var(--v4-accent-text)] dark:border-white/25 dark:bg-white/[0.06] dark:text-white dark:hover:border-[#1a7fe8]/70"
                >
                  <span>View on GitHub</span>
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>

              <div id="hero-end" className="mt-10">
                <p className="inline-flex items-center gap-2.5 rounded-full border border-[#1265c4]/40 bg-[#1a7fe8]/[0.08] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-[var(--v4-accent-text)] dark:border-[#1a7fe8]/50 dark:bg-[#1a7fe8]/[0.12] dark:text-[var(--v4-azure-300)]">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-[var(--v4-azure-500)] motion-safe:animate-pulse dark:bg-[var(--v4-azure-400)]"
                  />
                  Proposed standard · not yet ratified
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Aqua Protocol is */}
        <section className="v4-late mx-auto max-w-7xl px-6 pb-4 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-white/50">
            What Aqua Protocol is
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {VALUE_CARDS.map(({ icon: Icon, title, body }) => (
              <div key={title} className={CARD_CLASS}>
                <div className={ICON_TILE_CLASS}>
                  <Icon aria-hidden="true" className="h-5 w-5 text-[var(--v4-accent-text)]" />
                </div>
                <h3 className={`mb-2 text-lg font-semibold ${plusJakarta.className}`}>{title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specification and resources */}
        <section className="v4-late v4-late-2 mx-auto max-w-7xl px-6 pb-4 pt-14 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-white/50">
            Specification and resources
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map(({ icon: Icon, title, body, href, label, external }) => (
              <Link
                key={title}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${CARD_CLASS} flex flex-col`}
              >
                <div className={ICON_TILE_CLASS}>
                  <Icon aria-hidden="true" className="h-5 w-5 text-[var(--v4-accent-text)]" />
                </div>
                <h3 className={`mb-2 text-lg font-semibold ${plusJakarta.className}`}>{title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/60">{body}</p>
                <span className="mt-4 flex items-center gap-1.5 pt-1 font-mono text-xs text-slate-500 transition-colors group-hover:text-[var(--v4-accent-text)] dark:text-white/40 dark:group-hover:text-[var(--v4-azure-300)]">
                  {label}
                  {external ? (
                    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-slate-500 dark:text-white/50">
            <code className="rounded bg-[#1a7fe8]/10 px-1.5 py-0.5 font-mono text-[13px] text-[var(--v4-accent-text)] dark:bg-[#1a7fe8]/15 dark:text-[var(--v4-azure-300)]">
              v3.0.2
            </code>{" "}
            is the current published version of the protocol.{" "}
            <Link
              href={V4_STATUS_URL}
              className="underline decoration-[#1a7fe8]/40 underline-offset-4 transition-colors hover:text-[var(--v4-accent-text)]"
            >
              Version 4
            </Link>{" "}
            is in development.
          </p>
        </section>

        {/* Participate */}
        <section className="v4-late v4-late-2 mx-auto max-w-7xl px-6 pt-14 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-white/50">
            Participate
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-slate-600 dark:text-white/60">
            Aqua is developed in the open. Specification discussion, improvement proposals, and
            implementation work happen on GitHub; review and contributions are welcome.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {config?.social?.github ? (
              <Link
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/20 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#1a7fe8]/60 hover:text-[var(--v4-accent-text)] dark:border-white/20 dark:text-white/80 dark:hover:border-[#1a7fe8]/60 dark:hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            ) : null}
            {config?.social?.twitter ? (
              <Link
                href={config.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/20 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#1a7fe8]/60 hover:text-[var(--v4-accent-text)] dark:border-white/20 dark:text-white/80 dark:hover:border-[#1a7fe8]/60 dark:hover:text-white"
              >
                <XIcon className="h-4 w-4" />
              </Link>
            ) : null}
            {config?.social?.linkedin ? (
              <Link
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/20 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#1a7fe8]/60 hover:text-[var(--v4-accent-text)] dark:border-white/20 dark:text-white/80 dark:hover:border-[#1a7fe8]/60 dark:hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            ) : null}
          </div>
        </section>

        {/* Attribution */}
        <footer className="mt-16 border-t border-slate-900/10 dark:border-white/10">
          <div className="mx-auto max-w-7xl space-y-2 px-6 py-10 text-center lg:px-8">
            <p className="text-sm text-slate-500 dark:text-white/40">
              Aqua Protocol is developed in the open by{" "}
              <a
                href={INBLOCKIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#1a7fe8]/40 underline-offset-4 transition-colors hover:text-[var(--v4-accent-text)] dark:hover:text-[var(--v4-azure-300)]"
              >
                inblock.io
              </a>{" "}
              and published as a proposed open standard.
            </p>
            <p className="text-xs text-slate-400 dark:text-white/25">
              © 2026 inblock.io assets GmbH
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
