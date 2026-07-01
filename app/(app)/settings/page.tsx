'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Bell, Lock, Shield, User, Save, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/providers/auth-context'
import { supabase } from '@/lib/supabase'

export default function SettingsPage() {
  const { user } = useAuth()
  const [pushEnabled, setPushEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      // You could also fetch phone from user_metadata if it exists
    }
  }, [user])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name, phone: phone }
      })
      
      if (!error) {
        setShowSaved(true)
        setTimeout(() => setShowSaved(false), 3000)
      } else {
        console.error('Failed to update user', error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const Toggle = ({ enabled, onChange }: { enabled: boolean, onChange: (val: boolean) => void }) => (
    <div 
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${
        enabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
      }`}
    >
      <motion.div 
        className="w-4 h-4 bg-white rounded-full shadow-md" 
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-transparent px-4 md:px-8 py-8">
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-slate-text">Settings</h1>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md transition-colors"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : showSaved ? (
              <><CheckCircle2 className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>

        <div className="space-y-6">
          
          {/* Account Settings */}
          <motion.div className="glass-card rounded-2xl p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold text-slate-text">Account Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-text">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary outline-none transition-all" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-text">Email Address</label>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled
                    className="w-full px-4 py-2 rounded-xl bg-white/30 dark:bg-black/10 border border-white/20 text-slate-500 cursor-not-allowed outline-none transition-all" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-text">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 8900" 
                    className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="pt-2">
                <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                  <Lock className="w-4 h-4" /> Change Password
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div className="glass-card rounded-2xl p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold text-slate-text">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-black/10 rounded-xl border border-white/20">
                <div>
                  <p className="font-semibold text-slate-text">Push Notifications</p>
                  <p className="text-sm text-slate-mid">Receive alerts when issues near you are resolved.</p>
                </div>
                <Toggle enabled={pushEnabled} onChange={setPushEnabled} />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-black/10 rounded-xl border border-white/20">
                <div>
                  <p className="font-semibold text-slate-text">Email Digest</p>
                  <p className="text-sm text-slate-mid">Receive a weekly summary of civic improvements.</p>
                </div>
                <Toggle enabled={emailEnabled} onChange={setEmailEnabled} />
              </div>
            </div>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div className="glass-card rounded-2xl p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold text-slate-text">Privacy & Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-black/10 rounded-xl border border-white/20">
                <div>
                  <p className="font-semibold text-slate-text">Precise Location Sharing</p>
                  <p className="text-sm text-slate-mid">Allow the app to use your exact GPS coordinates when reporting.</p>
                </div>
                <Toggle enabled={locationEnabled} onChange={setLocationEnabled} />
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-white/10">
                <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/50 dark:bg-black/30 border border-white/30 hover:bg-white/70 dark:hover:bg-black/50 transition-colors">
                  Download My Data
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
