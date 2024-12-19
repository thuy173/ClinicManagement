'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LayoutContextProps {
  showHeaderFooter: boolean
  setShowHeaderFooter: (value: boolean) => void
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined)

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true)

  return (
    <LayoutContext.Provider value={{ showHeaderFooter, setShowHeaderFooter }}>
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
