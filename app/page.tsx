'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, MapPin, CheckCircle2, Zap, ArrowRight } from 'lucide-react'
import { useAuth } from '@/providers/auth-context'
import Logo from '@/components/logo'
import ThemeToggle from '@/components/theme-toggle'

export default function Page() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // If user is already logged in (remembered), auto-redirect to dashboard
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) return null

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background shapes for glassmorphism */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Theme Toggle in Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Text & CTA */}
        <motion.div
          className="space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Logo size="xl" showText={false} className="drop-shadow-xl" />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-text leading-tight tracking-tight">
              Empower Your <br/>
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Community</span>
            </h1>
            <p className="text-xl text-slate-mid font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Report civic issues, track progress, and collaborate with neighbors to build a better tomorrow, today.
            </p>
          </div>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={() => router.push('/auth/login')}
              className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:bg-blue-700 transition-all flex items-center gap-3 mx-auto lg:mx-0"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Illustration & Feature Cards */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="relative z-10 w-full aspect-square max-w-md mx-auto">
             <img src="/landing-illustration.png" alt="Abstract 3D Glass Objects" className="w-full h-full object-contain drop-shadow-2xl animate-pulse" style={{ animationDuration: '4s' }} />
          </div>
          
          {/* Floating feature cards */}
          <motion.div 
            className="absolute -bottom-8 -left-8 md:bottom-12 md:-left-12 glass-panel p-4 rounded-2xl flex items-center gap-4 animate-bounce"
            style={{ animationDuration: '6s' }}
          >
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-text">Hyperlocal</p>
              <p className="text-xs text-slate-mid">Pinpoint accuracy</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute -top-4 -right-4 md:top-12 md:-right-8 glass-panel p-4 rounded-2xl flex items-center gap-4 animate-bounce"
            style={{ animationDuration: '7s', animationDelay: '1s' }}
          >
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-600 dark:text-indigo-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-text">Verified</p>
              <p className="text-xs text-slate-mid">Community backed</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  )
}
