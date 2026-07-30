"use client"

import Link from "next/link"
import { ArrowRight, Fingerprint, Globe, ShieldCheck } from "lucide-react"

import AquaAnimation from "./aqua-animation"
import { ThemeToggle } from "./theme-toggle-client"

/**
 * V4 teaser page, rendered for every /docs/v4.0.0/* URL by the stealth gate
 * in app/docs/[version]/[...slug]/page.tsx. Reveals nothing about v4 itself:
 * hero (status only), three protocol-level value cards, a dominant CTA to the
 * v3 docs, and the attribution line.
 *
 * Accent family: azure #1a7fe8 (tokens + atmosphere classes in globals.css).
 * Fonts arrive as classNames from the server route (next/font/google).
 */

// Azure-family palette for the hash-chain canvas so the network reads as one
// luminous system in dark mode and as ink-blue etching on paper in light mode.
const AZURE_NODE_COLORS: Partial<
  Record<"genesis" | "revision" | "signature" | "witness", [number, number, number]>
> = {
  genesis: [26, 127, 232], // azure-500
  revision: [76, 155, 239], // azure-400
  signature: [18, 101, 196], // azure-700
  witness: [124, 184, 242], // azure-300
}

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

interface V4TeaserProps {
  sansClass: string
  displayClass: string
}

export default function V4Teaser({ sansClass, displayClass }: V4TeaserProps) {
  return (
    <div
      className={`v4-page v4-bg v4-vignette relative min-h-screen overflow-hidden text-slate-900 dark:text-white ${sansClass}`}
    >
      <div className="relative z-10">
        <header>
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
            <Link
              href="/"
              className={`text-lg font-semibold text-slate-900 dark:text-white ${displayClass}`}
            >
              Aqua Protocol
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero. The atmosphere (glow + hash-chain network) is bounded to this
            section, mirroring the reference: nothing below the hero ever has a
            line drawn over it. Two nested wrappers each carry a single mask
            (reliable intersection without mask-composite): outer = keep the
            network off the copy (horizontal ramp on desktop, edge bands on
            mobile), inner = dissolve before the hero bottom edge. */}
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
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 sm:pt-28 lg:px-8">
            <div className="v4-stagger max-w-[820px]">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 dark:text-white/90 sm:text-base">
                Aqua Protocol ·{" "}
                <span className="text-[var(--v4-accent-text)]">Version 4</span>
              </p>

              <h1
                className={`mt-6 text-balance text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl ${displayClass}`}
              >
                The next generation of verifiable data{" "}
                <span className="text-[var(--v4-azure-700)] dark:text-[var(--v4-azure-500)]">
                  is taking shape.
                </span>
              </h1>

              <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-slate-600 dark:text-white/70 sm:text-xl">
                Aqua is an open protocol for data accountability: portable records of
                provenance, signatures, and time, secured by cryptographic proof instead
                of platform trust. Work on version 4 is underway; the version 3
                documentation is the complete, current reference.
              </p>

              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Link
                  href="/docs/v3.0.2/introduction"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--v4-azure-600)] px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-[color:rgba(22,112,214,0.3)] transition hover:bg-[var(--v4-azure-700)] hover:shadow-lg hover:shadow-[color:rgba(22,112,214,0.4)]"
                >
                  <span>Read the v3 documentation</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="/v4"
                  className="inline-flex items-center gap-1.5 text-base font-medium text-[var(--v4-accent-text)] underline decoration-[#1a7fe8]/35 underline-offset-4 transition-colors hover:decoration-[#1a7fe8]"
                >
                  Learn more
                </Link>
              </div>

              <div id="v4-hero-end" className="mt-10">
                <p className="inline-flex items-center gap-2.5 rounded-full border border-[#1265c4]/40 bg-[#1a7fe8]/[0.08] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-[var(--v4-accent-text)] dark:border-[#1a7fe8]/50 dark:bg-[#1a7fe8]/[0.12] dark:text-[var(--v4-azure-300)]">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-[var(--v4-azure-500)] motion-safe:animate-pulse dark:bg-[var(--v4-azure-400)]"
                  />
                  In development
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Aqua Protocol is */}
        <section className="v4-late mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-white/50">
            What Aqua Protocol is
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {VALUE_CARDS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-900/15 bg-white/75 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#1a7fe8]/50 hover:shadow-[0_12px_40px_-10px_rgba(26,127,232,0.35)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#1a7fe8]/60 dark:hover:shadow-[0_12px_40px_-10px_rgba(26,127,232,0.3)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a7fe8]/10 transition-colors group-hover:bg-[#1a7fe8]/15 dark:bg-[#1a7fe8]/15">
                  <Icon aria-hidden="true" className="h-5 w-5 text-[var(--v4-accent-text)]" />
                </div>
                <h3 className={`mb-2 text-lg font-semibold text-slate-900 dark:text-white ${displayClass}`}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Attribution */}
        <footer className="v4-late v4-late-2 mx-auto max-w-7xl px-6 pb-14 pt-16 lg:px-8">
          <p className="text-center text-sm text-slate-500 dark:text-white/40">
            Built and developed by inblock.io as a proposed open standard.
          </p>
        </footer>
      </div>
    </div>
  )
}
