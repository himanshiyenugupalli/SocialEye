'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mockIssues } from '@/lib/mock-data'
import { X, MapPin, CheckCircle2 } from 'lucide-react'

interface SelectedPin {
  id: string
  x: number
  y: number
}

export default function MapPage() {
  const [selectedPin, setSelectedPin] = useState<SelectedPin | null>(null)
  const [zoom, setZoom] = useState(1)

  // Normalize coordinates to map area
  const mapWidth = 800
  const mapHeight = 600
  
  // Simple geographic normalization
  const normalizeCoord = (lat: number, lon: number) => {
    const x = ((lon + 74.015) / 0.015) * (mapWidth / 800)
    const y = ((40.715 - lat) / 0.015) * (mapHeight / 600)
    return { x: Math.max(0, Math.min(mapWidth, x)), y: Math.max(0, Math.min(mapHeight, y)) }
  }

  const selectedIssue = selectedPin ? mockIssues.find(i => i.id === selectedPin.id) : null
  const statusColors: Record<string, string> = {
    reported: '#6B7280',
    verified: '#E8A23D',
    assigned: '#0891B2',
    'in-progress': '#FB923C',
    resolved: '#047857',
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Header */}
      <section className="px-4 md:px-8 py-6 md:py-8 border-b border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Issue Map
          </h1>
          <p className="text-muted-foreground">
            Visualize reported issues in your area. Click pins for details.
          </p>
        </motion.div>
      </section>

      {/* Map container */}
      <div className="flex-1 relative px-4 md:px-8 py-6 md:py-8">
        <div className="h-full max-w-6xl mx-auto glass-card rounded-xl border border-border overflow-hidden shadow-lg">
          <svg
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700"
            style={{ background: 'linear-gradient(135deg, rgba(15,46,43,0.1), rgba(232,162,61,0.05))' }}
          >
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d={`M 50 0 L 0 0 0 50`} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect width={mapWidth} height={mapHeight} fill="url(#grid)" />

            {/* Issue pins */}
            {mockIssues.map((issue, index) => {
              const coord = normalizeCoord(issue.latitude, issue.longitude)
              const color = statusColors[issue.status] || '#6B7280'

              return (
                <motion.g
                  key={issue.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  {/* Pin circle */}
                  <motion.circle
                    cx={coord.x}
                    cy={coord.y}
                    r="8"
                    fill={color}
                    opacity="0.9"
                    style={{ cursor: 'pointer' }}
                    whileHover={{ r: 12, opacity: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedPin({ id: issue.id, x: coord.x, y: coord.y })}
                  />
                  {/* Pulse ring for in-progress */}
                  {issue.status === 'in-progress' && (
                    <motion.circle
                      cx={coord.x}
                      cy={coord.y}
                      r="8"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      animate={{ r: [8, 16], opacity: [0.8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  {/* Outer glow */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="14"
                    fill={color}
                    opacity="0.1"
                  />
                </motion.g>
              )
            })}
          </svg>

          {/* Bottom sheet for selected pin */}
          <AnimatePresence>
            {selectedIssue && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 glass-card border-t border-border rounded-t-2xl shadow-2xl"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
              >
                <div className="p-6 space-y-4 max-w-2xl mx-auto">
                  {/* Header with close */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {selectedIssue.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedIssue.address}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setSelectedPin(null)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </motion.button>
                  </div>

                  {/* Status and details */}
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {selectedIssue.status.replace('-', ' ')}
                    </motion.span>
                    <span className="text-xs text-muted-foreground">
                      {selectedIssue.verifyCount} verified • {selectedIssue.upvoteCount} upvotes
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground">
                    {selectedIssue.description}
                  </p>

                  {/* Action button */}
                  <motion.button
                    className="w-full px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <section className="px-4 md:px-8 py-6 border-t border-border glass-card/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-sm font-semibold text-foreground mb-3">Status Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
