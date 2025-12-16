"use client"

import { useState, ReactNode, cloneElement, isValidElement } from "react"
import { Footer } from "./footer"
import { SiteBanner } from "./site-banner"
import type { SpecraConfig } from "@/lib/config"

interface MobileDocLayoutProps {
  header: ReactNode
  sidebar: ReactNode
  content: ReactNode
  toc: ReactNode
  config: SpecraConfig
}

export function MobileDocLayout({ header, sidebar, content, toc, config }: MobileDocLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Clone header and pass onMenuClick prop if it's a valid React element
  const headerWithProps = isValidElement(header)
    ? cloneElement(header as React.ReactElement<any>, {
      onMenuClick: toggleSidebar,
    })
    : header

  // Clone sidebar with different keys for mobile and desktop
  const mobileSidebar = isValidElement(sidebar)
    ? cloneElement(sidebar as React.ReactElement<any>, {
      key: "mobile-sidebar",
      onLinkClick: closeSidebar,
    })
    : sidebar

  const desktopSidebar = isValidElement(sidebar)
    ? cloneElement(sidebar as React.ReactElement<any>, {
      key: "desktop-sidebar",
      onLinkClick: closeSidebar,
    })
    : sidebar

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {headerWithProps}

      {/* Site-wide Banner */}
      <SiteBanner config={config} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="pt-20 px-4">
          {mobileSidebar}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            {desktopSidebar}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2 px-2 md:px-8">
              {/* Content */}
              {content}

              
            </div>
          </div>

          {/* ToC */}
          {toc}
        </div>

         {/* Footer */}
              <Footer />

      </main>


     
    </div>
  )
}
