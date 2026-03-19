import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aqua V4 — Trust Infrastructure for AI",
  description:
    "Aqua V4 is the trust infrastructure for the AI era — identity, access control, and provenance. Something big is building.",
}

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
