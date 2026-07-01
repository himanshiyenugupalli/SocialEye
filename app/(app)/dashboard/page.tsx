'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DashboardSkeleton } from '@/components/skeleton'
import { TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [issues, setIssues] = useState<any[]>([])

  useEffect(() => {
    const fetchIssues = async () => {
      const { data } = await supabase.from('reports').select('*')
      if (data) setIssues(data)
      setLoading(false)
    }
    fetchIssues()
  }, [])

  // Calculate stats dynamically from Supabase
  const totalIssues = issues.length
  const resolvedIssues = issues.filter(i => i.status?.toLowerCase() === 'resolved').length
  const inProgressIssues = issues.filter(i => i.status?.toLowerCase() === 'in-progress' || i.status?.toLowerCase() === 'assigned').length
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0

  const kpis = [
    {
      label: 'Total Reports',
      value: totalIssues,
      icon: AlertCircle,
      color: 'from-amber-500 to-amber-600',
      trend: 'Live Data',
    },
    {
      label: 'Resolution Rate',
      value: `${resolutionRate}%`,
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
      trend: 'Live Data',
    },
    {
      label: 'In Progress',
      value: inProgressIssues,
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
      trend: 'Live Data',
    },
  ]

  // Dynamic category data
  const categoryMap = new Map()
  issues.forEach(i => {
    const cat = i.category
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, { name: cat, count: 0, resolved: 0 })
    }
    const data = categoryMap.get(cat)
    data.count++
    if (i.status?.toLowerCase() === 'resolved') {
      data.resolved++
    }
  })
  
  const categoryData = Array.from(categoryMap.values()).sort((a, b) => b.count - a.count)

  const wards = [
    { name: 'Downtown', issues: 4, resolved: 2, improvement: 'Up 15%' },
    { name: 'Midtown', issues: 2, resolved: 1, improvement: 'Up 8%' },
    { name: 'Riverside', issues: 1, resolved: 0, improvement: 'New' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <DashboardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <section className="px-4 md:px-8 py-8 border-b border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track civic issue metrics and community impact across neighborhoods.
          </p>
        </motion.div>
      </section>

      {/* KPI Cards */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* KPI grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpis.map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <motion.div
                  key={i}
                  className="glass-card rounded-xl border border-border p-6 hover:border-accent/50 transition-all shadow-sm hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 font-medium">
                        {kpi.label}
                      </p>
                      <p className="text-3xl md:text-4xl font-bold text-foreground">
                        {kpi.value}
                      </p>
                      <p className="text-xs text-accent mt-2 font-semibold">
                        {kpi.trend}
                      </p>
                    </div>
                    <motion.div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${kpi.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: ['0%', `${30 + i * 25}%`] }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category breakdown */}
            <motion.div
              className="glass-card rounded-xl border border-border p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-foreground mb-6">
                Issues by Category
              </h3>
              <div className="space-y-4">
                {categoryData.map((cat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {cat.name}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {cat.resolved}/{cat.count}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-amber-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.resolved / cat.count) * 100}%` }}
                        transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Ward performance */}
            <motion.div
              className="glass-card rounded-xl border border-border p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-foreground mb-6">
                Best Performing Wards
              </h3>
              <div className="space-y-4">
                {wards.map((ward, i) => (
                  <motion.div
                    key={i}
                    className="p-3 rounded-lg bg-muted/30 border border-border/50 flex items-start justify-between group hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {ward.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {ward.resolved} of {ward.issues} resolved
                      </p>
                    </div>
                    <motion.div
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold whitespace-nowrap"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.45 + i * 0.08 }}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {ward.improvement}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Weekly trend */}
          <motion.div
            className="glass-card rounded-xl border border-border p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-6">
              Weekly Report Trend
            </h3>
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {[28, 32, 35, 31, 38, 42, 45].map((value, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-accent to-amber-400 rounded-t-lg hover:shadow-lg transition-all relative group cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 50) * 100}%` }}
                  transition={{ delay: 0.45 + i * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 glass-card rounded px-2 py-1 text-xs font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border"
                    initial={{ y: 0 }}
                    whileHover={{ y: -4 }}
                  >
                    {value}
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground px-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: 'Avg Response', value: '2.5 days' },
              { label: 'Community Contributors', value: '127' },
              { label: 'Total Verifications', value: '356' },
              { label: 'Civic Points Earned', value: '8,924' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-muted/30 rounded-lg p-4 text-center border border-border/50 hover:border-accent/50 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-accent">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
