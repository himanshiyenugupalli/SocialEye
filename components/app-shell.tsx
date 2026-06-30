'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './sidebar'
import BottomNav from './bottom-nav'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="flex min-h-screen bg-transparent text-foreground relative overflow-hidden">
      {/* Desktop side navigation */}
      <Sidebar activeNav={activeNav} onNavigate={setActiveNav} />

      {/* Main content area */}
      <main className="flex-1 h-screen overflow-y-auto pb-20 md:pb-0 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile bottom navigation */}
      <BottomNav activeNav={activeNav} onNavigate={setActiveNav} />
    </div>
  )
}
