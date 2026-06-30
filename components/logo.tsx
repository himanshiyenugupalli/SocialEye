'use client'

import { Eye } from 'lucide-react'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-24 h-24'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div 
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]`}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Eye className="w-1/2 h-1/2 text-white" strokeWidth={2.5} />
      </motion.div>
      
      {showText && (
        <span className={`font-bold tracking-tight text-slate-text ${textSizeClasses[size]}`}>
          Social<span className="text-primary">Eye</span>
        </span>
      )}
    </div>
  )
}
