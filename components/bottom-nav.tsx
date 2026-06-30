'use client'

import { motion } from 'framer-motion'
import { MapPin, Eye, Home, User, BarChart3, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BottomNavProps {
  activeNav: string
  onNavigate: (nav: string) => void
}

export default function BottomNav({ activeNav, onNavigate }: BottomNavProps) {
  const router = useRouter()

  const navItems = [
    { id: 'feed', label: 'Feed', icon: Eye, path: '/feed' },
    { id: 'map', label: 'Map', icon: MapPin, path: '/map' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ]

  const handleNavigation = (id: string, path: string) => {
    onNavigate(id)
    router.push(path)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t">
      <div className="flex items-center justify-between h-16 px-2">
        {/* Center action button */}
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-8">
          <motion.button
            onClick={() => handleNavigation('report', '/report')}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center justify-center text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Left nav items */}
        <div className="flex items-center justify-start flex-1 gap-1">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id, item.path)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all relative ${
                  isActive ? 'text-primary font-semibold' : 'text-slate-mid hover:text-slate-text'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Right nav items */}
        <div className="flex items-center justify-end flex-1 gap-1">
          {navItems.slice(2).map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id, item.path)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all relative ${
                  isActive ? 'text-primary font-semibold' : 'text-slate-mid hover:text-slate-text'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator2"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
