'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/providers/auth-context'
import { Award, Zap, Trophy, Heart, CheckCircle2, User, LogOut, Edit2, Save, X } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [newBadge, setNewBadge] = useState<string | null>(null)
  
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || 'Citizen',
    bio: 'Civic tech enthusiast looking to improve our local neighborhood.',
    location: 'Downtown'
  })

  useEffect(() => {
    if (user && editForm.name === 'Citizen') {
      setEditForm(prev => ({ ...prev, name: user.name }))
    }
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [user])

  const badges = [
    { id: 'early-adopter', name: 'Early Adopter', description: 'Joined within the first month', icon: Zap, color: 'from-yellow-500 to-amber-500', unlocked: true },
    { id: 'power-reporter', name: 'Power Reporter', description: 'Submitted 10+ issues', icon: Heart, color: 'from-red-500 to-pink-500', unlocked: true },
    { id: 'community-champion', name: 'Community Champion', description: 'Verified 25+ issues', icon: Trophy, color: 'from-purple-500 to-indigo-500', unlocked: true },
    { id: 'civic-leader', name: 'Civic Leader', description: 'Reach 500 civic points', icon: Award, color: 'from-cyan-500 to-blue-500', unlocked: false },
  ]

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 3240, trend: '↑' },
    { rank: 2, name: 'Marcus Johnson', points: 2950, trend: '↑' },
    { rank: 3, name: editForm.name, points: 2840, trend: '→', highlight: true },
    { rank: 4, name: 'Elena Rodriguez', points: 2620, trend: '↓' },
    { rank: 5, name: 'David Kim', points: 2350, trend: '↑' },
  ]

  const achievements = [
    { icon: Heart, label: 'Reports', value: 12 },
    { icon: CheckCircle2, label: 'Verified', value: 34 },
    { icon: Award, label: 'Badges', value: 3 },
    { icon: Zap, label: 'Points', value: '2.8k' },
  ]

  const handleBadgeClick = (badgeId: string) => {
    if (!badges.find(b => b.id === badgeId)?.unlocked) {
      setNewBadge(badgeId)
      setTimeout(() => setNewBadge(null), 1500)
    }
  }

  const handleSaveProfile = () => {
    // In a real app, send API request
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Profile header */}
      <section className="relative px-4 md:px-8 py-8 border-b border-white/10 dark:border-white/5 bg-gradient-to-r from-primary/10 to-accent/10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto space-y-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* User info */}
            <div className="flex items-start gap-4 flex-1 w-full">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <User className="w-10 h-10" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold text-slate-text truncate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {editForm.name}
                  </motion.h1>
                  {!isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-mid hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <motion.p
                  className="text-slate-mid mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {editForm.location} • Rank #12
                </motion.p>

                <motion.p
                  className="text-sm text-slate-text/80 mb-3 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "{editForm.bio}"
                </motion.p>

                {/* Achievement quick stats */}
                <div className="flex gap-4 flex-wrap">
                  {achievements.map((achievement, i) => {
                    const Icon = achievement.icon
                    return (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 glass-panel rounded-lg px-3 py-1.5 border border-white/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-xs">
                          <span className="font-bold text-slate-text">{achievement.value}</span>
                          <span className="text-slate-mid ml-1">{achievement.label}</span>
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Civic points display */}
            <motion.div
              className="glass-card rounded-xl border border-white/20 p-6 shadow-lg shrink-0 w-full md:w-64"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <p className="text-sm text-slate-mid mb-1 font-medium">Civic Points</p>
              <p className="text-4xl font-bold text-primary mb-3">2840</p>
              <motion.div
                className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: '57%' }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.div>
              <p className="text-xs text-slate-mid mt-2">
                2,840 of 5,000 to next tier
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Main content */}
      <section className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Edit Profile Form (Inline) */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-card rounded-2xl p-6 mb-8 border border-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-primary" /> Edit Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-text">Full Name</label>
                      <input 
                        type="text" 
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-text">Location</label>
                      <input 
                        type="text" 
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-slate-text">Bio</label>
                      <textarea 
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary outline-none resize-none h-20"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl text-slate-text hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      className="px-4 py-2 rounded-xl bg-primary text-white shadow-md hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badges section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-2xl font-bold text-slate-text mb-6">Badges & Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {badges.map((badge, i) => {
                const Icon = badge.icon
                const isNew = badge.id === newBadge

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleBadgeClick(badge.id)}
                    className={`relative rounded-2xl border-2 p-6 text-center transition-all cursor-pointer group ${
                      badge.unlocked
                        ? `glass-card border-white/20 hover:border-primary/50 shadow-md`
                        : `bg-slate-100/50 dark:bg-slate-800/50 border-dashed border-slate-300 dark:border-slate-700 opacity-70`
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    whileHover={badge.unlocked ? { y: -4, scale: 1.02 } : {}}
                  >
                    {/* Badge icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto mb-3 text-white shadow-lg`}
                      animate={isNew ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>

                    <h3 className="font-bold text-slate-text mb-1">{badge.name}</h3>
                    <p className="text-xs text-slate-mid mb-3">
                      {badge.description}
                    </p>

                    {/* Status */}
                    {badge.unlocked ? (
                      <motion.span
                        className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.35 + i * 0.06 }}
                      >
                        ✓ Unlocked
                      </motion.span>
                    ) : (
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                        Locked
                      </span>
                    )}

                    {/* Unlock animation */}
                    {isNew && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-green-500"
                        animate={{ scale: [1, 1.1], opacity: [1, 0] }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="text-2xl font-bold text-slate-text mb-6">Neighborhood Leaderboard</h2>
            <div className="glass-card rounded-2xl border border-white/20 shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 space-y-3">
                {leaderboard.map((entry, i) => {
                  const trendColor =
                    entry.trend === '↑'
                      ? 'text-green-600 dark:text-green-400'
                      : entry.trend === '↓'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-mid'

                  return (
                    <motion.div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                        entry.highlight
                          ? 'bg-primary/10 border border-primary/20'
                          : 'bg-white/30 dark:bg-black/10 hover:bg-white/50 dark:hover:bg-black/20'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <motion.div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            i === 0
                              ? 'bg-gradient-to-br from-yellow-500 to-amber-500'
                              : i === 1
                                ? 'bg-gradient-to-br from-slate-400 to-slate-500'
                                : i === 2
                                  ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                                  : 'bg-slate-300 dark:bg-slate-700 text-slate-text'
                          }`}
                          animate={{ scale: entry.highlight ? [1, 1.05, 1] : 1 }}
                          transition={{ duration: 2, repeat: entry.highlight ? Infinity : 0 }}
                        >
                          {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                        </motion.div>

                        <div>
                          <p className={`font-semibold ${entry.highlight ? 'text-primary' : 'text-slate-text'}`}>
                            {entry.name}
                          </p>
                          <p className="text-xs text-slate-mid">
                            Rank #{entry.rank}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-primary">
                          {entry.points}
                        </span>
                        <span className={`text-lg font-bold ${trendColor}`}>
                          {entry.trend}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Account actions removed because sign out is now in sidebar */}
        </div>
      </section>
    </div>
  )
}
