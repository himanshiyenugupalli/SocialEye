'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  UploadCloud, 
  MapPin, 
  X, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Camera
} from 'lucide-react'

export default function ReportPage() {
  const router = useRouter()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const categories = [
    'Pothole',
    'Streetlight Broken',
    'Garbage Dump',
    'Water Leak',
    'Fallen Tree',
    'Other'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Auto redirect after success
      setTimeout(() => {
        router.push('/feed')
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-transparent px-4 md:px-8 py-8 relative">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold text-slate-text">Report an Issue</h1>
        </div>

        <div className="glass-card rounded-2xl border border-white/20 p-6 md:p-8 shadow-xl relative overflow-hidden">
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 glass-card flex flex-col items-center justify-center text-center p-8 bg-white/80 dark:bg-black/80 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-24 h-24 text-green-500 mb-4 mx-auto" />
                </motion.div>
                <h2 className="text-3xl font-bold text-slate-text mb-2">Issue Reported!</h2>
                <p className="text-slate-mid mb-6">Your report has been posted to the feed for community verification.</p>
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-mid mt-4">Redirecting to Feed...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-text">Issue Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Huge pothole on Main St"
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary outline-none transition-all placeholder:text-slate-mid"
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-text">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                      category === cat 
                        ? 'bg-primary text-white border-primary shadow-md' 
                        : 'bg-white/30 dark:bg-black/30 border-white/20 text-slate-text hover:bg-white/50 dark:hover:bg-black/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Upload Area */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-text flex items-center gap-2">
                <Camera className="w-4 h-4" /> Add Photos & Videos
              </label>
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary/30 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <p className="mb-1 text-sm text-slate-text font-medium"><span className="text-primary font-bold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-slate-mid">SVG, PNG, JPG or MP4 (MAX. 50MB)</p>
                </div>
                <input type="file" className="hidden" multiple accept="image/*,video/*" />
              </label>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-text">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="text"
                  required
                  placeholder="Fetching current location..."
                  defaultValue="123 Civic Ave, Downtown"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary outline-none transition-all font-medium text-slate-text"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-text">Details / Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide any additional details that might help authorities locate or understand the issue..."
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 focus:border-primary outline-none transition-all placeholder:text-slate-mid h-32 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-xl font-semibold text-slate-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title || !category}
                className="px-8 py-3 rounded-xl font-bold text-white bg-primary hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Post Issue
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  )
}
