'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import IssueCard from '@/components/issue-card'
import { IssueSkeleton } from '@/components/skeleton'
import { mockIssues } from '@/lib/mock-data'
import { Filter } from 'lucide-react'

type FilterCategory = 'all' | 'reported' | 'verified' | 'assigned' | 'in-progress' | 'resolved'

export default function FeedPage() {
  const [loading, setLoading] = useState(true)
  const [issues, setIssues] = useState(mockIssues)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredIssues = activeFilter === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === activeFilter)

  const filters: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'reported', label: 'Reported' },
    { id: 'verified', label: 'Verified' },
    { id: 'assigned', label: 'Assigned' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
  ]

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero section */}
      <section className="relative py-10 md:py-14 px-4 md:px-8 border-b border-border">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
            Community Feed
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Real-time civic issues from your neighborhood. Report, verify, and resolve together.
          </p>
        </motion.div>
      </section>

      {/* Filter section */}
      <section className="sticky top-16 md:top-0 z-30 bg-transparent/95 backdrop-blur-sm border-b border-border px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 md:gap-3 overflow-x-auto">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-2 md:gap-2.5">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-md font-medium text-xs md:text-sm whitespace-nowrap transition-all border ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-foreground border-border hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Issues grid */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <IssueSkeleton key={i} />
              ))}
            </div>
          ) : filteredIssues.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <IssueCard issue={issue} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg text-muted-foreground mb-2">
                No issues found in this category
              </p>
              <p className="text-sm text-muted-foreground">
                Try selecting a different filter or check back later
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
