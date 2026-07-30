import type { Metadata } from "next"
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google"

/**
 * Fonts are exposed as CSS variables rather than passed down as props, because
 * the page below is a client component and this layout is a server component
 * that only renders {children}. Same typeface pairing as the v4 teaser at
 * /docs/v4.0.0/welcome, so the two pages read as one system.
 */
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-v4-sans" })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-v4-display" })

export const metadata: Metadata = {
  title: "Aqua V4: Trust Infrastructure for AI",
  description:
    "Aqua V4 is an open protocol for trust in AI systems: verifiable identity, granular access control, and portable provenance. In development, built as a proposed open standard.",
}

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dmSans.variable} ${plusJakarta.variable} ${dmSans.className}`}>
      {children}
    </div>
  )
}
