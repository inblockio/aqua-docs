import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aqua V4 — Trust Infrastructure for AI",
  description:
    "AI is moving fast. Security can't keep up. Aqua V4 provides the trust infrastructure — identity, access control, and provenance — to secure the AI era.",
}

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
