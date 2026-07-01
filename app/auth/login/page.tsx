'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/providers/auth-context'
import Logo from '@/components/logo'
import ThemeToggle from '@/components/theme-toggle'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      router.replace('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to login')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Theme Toggle in Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[120px] pointer-events-none" />

      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-mid hover:text-slate-text transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <motion.div 
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden glass-panel z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side: Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-white/10 dark:bg-black/10 border-r border-white/20">
          <img src="/auth-illustration.png" alt="Community Connect" className="w-full max-w-sm drop-shadow-xl" />
          <h2 className="mt-8 text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-slate-mid text-center mt-2">Sign in to continue making a difference in your community.</p>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-12">
          <div className="flex justify-center mb-8 md:hidden">
             <Logo size="lg" showText={false} className="drop-shadow-md" />
          </div>

          <h2 className="text-3xl font-bold text-slate-text mb-6">Sign In</h2>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="p-3 mb-6 text-sm text-red-500 bg-red-100/50 rounded-lg border border-red-200"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-text">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-text flex justify-between">
                Password
                <Link href="#" className="text-primary hover:underline text-xs">Forgot password?</Link>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-mid hover:text-slate-text"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
              />
              <label htmlFor="remember" className="text-sm text-slate-mid cursor-pointer hover:text-slate-text">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 rounded-xl bg-primary text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-primary/30 transition-all flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-mid mt-8">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
              Create one
            </Link>
          </p>

          <motion.div
            className="mt-8 p-4 rounded-xl bg-white/30 dark:bg-black/20 border border-white/20 text-xs text-slate-mid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-medium mb-1 text-slate-text">Demo credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: demo123</p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
