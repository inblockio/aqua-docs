import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { getConfig } from "@/lib/config"
import "./globals.css"
import { getAssetPath } from "@/lib/utils"
 
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const config = getConfig()

export const metadata: Metadata = {
  title: {
    default: config.site.title,
    template: `%s | ${config.site.title}`,
  },
  description: config.site.description || "Modern documentation platform",
  generator: "v0.app",
  metadataBase: config.site.url ? new URL(config.site.url) : undefined,
  icons: {
    icon: getAssetPath(config.site.favicon ?? "") ? [
      {
        url: getAssetPath(config.site.favicon ?? ""),
      },
    ] : [],
    apple: getAssetPath("/apple-icon.png"),
  },
  openGraph: {
    title: config.site.title,
    description: config.site.description,
    url: config.site.url,
    siteName: config.site.title,
    locale: config.site.language || "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.title,
    description: config.site.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={config.site.language || "en"} suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
