'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mockIssues, statusColors, categoryLabels } from '@/lib/mock-data'
import { TimelineSkeleton } from '@/components/skeleton'
import { ArrowLeft, Heart, CheckCircle2, Share2, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function IssuePage() {
  const params = useParams()
  const id = params.id as string
  const [issue] = useState(() => mockIssues.find(i => i.id === id) || mockIssues[0])
  const [loading, setLoading] = useState(true)
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(issue.upvoteCount)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const handleUpvote = () => {
    if (!isUpvoted) {
      setIsUpvoted(true)
      setUpvoteCount(prev => prev + 1)
    } else {
      setIsUpvoted(false)
      setUpvoteCount(prev => prev - 1)
    }
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Issue not found</p>
      </div>
    )
  }

  const statusColor = statusColors[issue.status] || statusColors.reported
  const statusIcon = {
    reported: '📍',
    verified: '✓',
    assigned: '👤',
    'in-progress': '⚙️',
    resolved: '✓✓',
  }[issue.status]

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <div className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
          <Link href="/feed">
            <motion.button
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Feed</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Hero section with image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-xl overflow-hidden border border-border shadow-lg h-96"
        >
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 400%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22800%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 font-size=%2240%22 fill=%22%239ca3af%22%3EIssue Image%3C/text%3E%3C/svg%3E'
            }}
          />
          {/* Status overlay */}
          <motion.div
            className={`absolute top-4 left-4 px-4 py-2 rounded-lg font-semibold text-sm ${statusColor} shadow-lg backdrop-blur-sm`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {issue.status.replace('-', ' ')}
          </motion.div>
        </motion.div>

        {/* Header section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {issue.title}
            </h1>
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {issue.address}
            </p>
          </div>

          {/* Category and reported info */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              {categoryLabels[issue.category]}
            </motion.span>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img
                src={issue.createdBy.avatar}
                alt={issue.createdBy.name}
                className="w-8 h-8 rounded-full bg-muted"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22%3E%3Ccircle fill=%22%23e5e7eb%22 cx=%2220%22 cy=%2220%22 r=%2220%22/%3E%3C/svg%3E'
                }}
              />
              <span>Reported by {issue.createdBy.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDate(issue.reportedAt)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-bold text-foreground">Details</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {issue.description}
          </p>
        </motion.div>

        {/* Agent notes */}
        {issue.agentNotes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-accent/5 border border-accent/20 rounded-xl p-6 space-y-2"
          >
            <h3 className="font-semibold text-accent flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Official Update
            </h3>
            <p className="text-foreground">{issue.agentNotes}</p>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          className="grid grid-cols-3 gap-3 md:flex md:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <motion.button
            onClick={handleUpvote}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isUpvoted
                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5" fill={isUpvoted ? 'currentColor' : 'none'} />
            <span className="text-sm">{upvoteCount}</span>
          </motion.button>

          <motion.button
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm">Share</span>
          </motion.button>

          <motion.button
            className="flex-1 md:flex-initial px-6 py-3 rounded-lg font-semibold bg-accent text-accent-foreground hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Verify
          </motion.button>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 pt-8 border-t border-border"
        >
          <h2 className="text-2xl font-bold text-foreground">Status Timeline</h2>

          {loading ? (
            <TimelineSkeleton />
          ) : issue.timeline ? (
            <div className="space-y-6 relative">
              {/* Timeline line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent to-muted/50 rounded-full" />

              {issue.timeline.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="relative pl-12 space-y-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.08, duration: 0.3 }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-0 top-1 w-8 h-8 rounded-full bg-card border-2 border-accent flex items-center justify-center text-xs font-bold text-accent shadow-md"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Content */}
                  <div className="bg-card rounded-lg border border-border p-4 hover:border-accent/50 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-foreground capitalize">
                          {entry.status.replace('-', ' ')}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(entry.timestamp)}
                        </p>
                      </div>
                      {entry.agentGenerated && (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-accent/10 text-accent whitespace-nowrap">
                          System
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">{entry.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : null}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
        >
          {[
            { label: 'Verified', value: issue.verifyCount },
            { label: 'Upvotes', value: issue.upvoteCount },
            { label: 'Days Active', value: Math.floor((new Date().getTime() - issue.reportedAt.getTime()) / (1000 * 60 * 60 * 24)) },
            { label: 'Distance', value: `${issue.distanceFromUser.toFixed(1)}km` },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-card rounded-lg border border-border p-4 text-center"
              whileHover={{ y: -2 }}
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function formatDate(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
