"use client"

import { useState, useEffect } from "react"

interface TabsProps {
  children: React.ReactNode
  defaultValue?: string
  groupId?: string
}

interface TabsListProps {
  children: React.ReactNode
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
}

const TabsContext = React.createContext<{
  activeTab: string
  setActiveTab: (value: string) => void
  groupId?: string
}>({
  activeTab: "",
  setActiveTab: () => {},
})

import React from "react"

export function Tabs({ children, defaultValue, groupId }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || "")

  // Load from localStorage if groupId is provided
  useEffect(() => {
    if (groupId) {
      const stored = localStorage.getItem(`tabs-${groupId}`)
      if (stored) {
        setActiveTab(stored)
      }
    }
  }, [groupId])

  // Save to localStorage when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (groupId) {
      localStorage.setItem(`tabs-${groupId}`, value)
      // Dispatch custom event to sync across components
      window.dispatchEvent(
        new CustomEvent("tabs-change", {
          detail: { groupId, value },
        })
      )
    }
  }

  // Listen for tab changes from other components
  useEffect(() => {
    if (!groupId) return

    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail.groupId === groupId) {
        setActiveTab(e.detail.value)
      }
    }

    window.addEventListener("tabs-change" as any, handleStorageChange as any)
    return () => {
      window.removeEventListener("tabs-change" as any, handleStorageChange as any)
    }
  }, [groupId])

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, groupId }}>
      <div className="my-6">{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex items-center gap-1 border-b border-border mb-4">
      {children}
    </div>
  )
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
        isActive
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
      }`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { activeTab } = React.useContext(TabsContext)

  if (activeTab !== value) return null

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none [&>*:first-child]:mt-0">
      {children}
    </div>
  )
}
