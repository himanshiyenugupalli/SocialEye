'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Issue, categoryLabels, statusColors } from '@/lib/mock-data'
import { Heart, CheckCircle2, MapPin } from 'lucide-react'
import Link from 'next/link'

interface IssueCardProps {
  issue: Issue
  onVerify?: () => void
  onUpvote?: () => void
}

export default function IssueCard({ issue, onVerify, onUpvote }: IssueCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(issue.upvoteCount)
  const [verifyCount, setVerifyCount] = useState(issue.verifyCount)

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isUpvoted) {
      setIsUpvoted(true)
      setUpvoteCount(prev => prev + 1)
      onUpvote?.()
    } else {
      setIsUpvoted(false)
      setUpvoteCount(prev => prev - 1)
    }
  }

  const handleVerify = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isVerified) {
      setIsVerified(true)
      setVerifyCount(prev => prev + 1)
      onVerify?.()
    } else {
      setIsVerified(false)
      setVerifyCount(prev => prev - 1)
    }
  }

  const statusColor = statusColors[issue.status] || statusColors.reported

  return (
    <Link href={`/issue/${issue.id}`}>
      <motion.div
        className="glass-card rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
        whileHover={{ y: -2 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image section */}
        <div className="relative w-full h-44 bg-slate-light overflow-hidden flex-shrink-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          />
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 font-size=%2220%22 fill=%22%239ca3af%22%3EIssue Image%3C/text%3E%3C/svg%3E'
            }}
          />

          {/* Status badge */}
          <motion.div
            className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md text-xs font-semibold ${statusColor} shadow-sm`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {issue.status.replace('-', ' ')}
          </motion.div>

          {/* Distance badge */}
          <motion.div
            className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-medium glass-panel text-foreground shadow-sm flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <MapPin className="w-3 h-3" />
            {issue.distanceFromUser.toFixed(1)} km
          </motion.div>
        </div>

        {/* Content section */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          {/* Title */}
          <motion.h3
            className="text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            {issue.title}
          </motion.h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {issue.description}
          </p>

          {/* Category badge */}
          <motion.div
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md">
              {categoryLabels[issue.category]}
            </span>
          </motion.div>

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">{issue.createdBy.name}</span>
              <span className="mx-1">•</span>
              <span>{formatDistance(issue.reportedAt)}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Upvote button */}
              <motion.button
                onClick={handleUpvote}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                  isUpvoted
                    ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30'
                    : 'bg-background text-foreground border-border hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-3.5 h-3.5" fill={isUpvoted ? 'currentColor' : 'none'} />
                <span>{upvoteCount}</span>
              </motion.button>

              {/* Verify button */}
              <motion.button
                onClick={handleVerify}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                  isVerified
                    ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30'
                    : 'bg-background text-foreground border-border hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{verifyCount}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Status pulse for in-progress */}
        {issue.status === 'in-progress' && (
          <motion.div
            className="absolute top-4 left-4 w-3 h-3 rounded-full bg-orange-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </Link>
  )
}

function formatDistance(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}
