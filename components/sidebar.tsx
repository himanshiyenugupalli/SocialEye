'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Eye, 
  MapPin, 
  Settings, 
  HelpCircle, 
  LogOut,
  User as UserIcon,
  PlusCircle
} from 'lucide-react'
import { useAuth } from '@/providers/auth-context'
import Logo from '@/components/logo'
import ThemeToggle from '@/components/theme-toggle'

interface SidebarProps {
  activeNav: string
  onNavigate: (nav: string) => void
}

export default function Sidebar({ activeNav, onNavigate }: SidebarProps) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'feed', label: 'Feed', icon: Eye, path: '/feed' },
    { id: 'map', label: 'Map', icon: MapPin, path: '/map' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
  ]

  const handleNavigation = (id: string, path: string) => {
    onNavigate(id)
    router.push(path)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-slate-900 dark:glass-nav border-r border-slate-800 dark:border-white/10 flex-shrink-0 z-40 sticky top-0 text-white">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="inline-block">
          <Logo size="md" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <motion.button
          onClick={() => handleNavigation('report', '/report')}
          className="w-full flex items-center gap-3 px-4 py-3 mb-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-blue-600 shadow-md hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PlusCircle className="w-5 h-5" />
          Report Issue
        </motion.button>

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.id || (item.id === 'dashboard' && activeNav === '') 
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.id, item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-primary bg-primary/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
              {item.label}
              
              {isActive && (
                <motion.div
                  layoutId="sidebarActiveIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="p-4 border-t border-white/10 space-y-2 bg-white/5">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-2 py-2 mb-2">
          <span className="text-sm font-medium text-slate-300">Theme</span>
          <ThemeToggle />
        </div>

        {/* Profile Link */}
        <button
          onClick={() => handleNavigation('profile', '/profile')}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user?.name} className="w-10 h-10 rounded-full border-2 border-white/20" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-white/20">
              <UserIcon className="w-5 h-5" />
            </div>
          )}
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'User Profile'}</p>
            <p className="text-xs text-slate-400 truncate">View & Edit Profile</p>
          </div>
        </button>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 transition-colors font-medium mt-2"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
