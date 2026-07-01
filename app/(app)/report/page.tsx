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
import { useAuth } from '@/providers/auth-context'
import { supabase } from '@/lib/supabase'

export default function ReportPage() {
  const router = useRouter()
  const { user } = useAuth()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [location, setLocation] = useState('123 Civic Ave, Downtown')
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !category || !description) return
    setIsSubmitting(true)
    
    try {
      let imageUrl = null

      // 1. Upload image to Supabase Storage if selected
      if (file) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage
          .from('reports')
          .getPublicUrl(fileName)

        imageUrl = publicUrlData.publicUrl
      }

      // 2. Submit to our API for Gemini Analysis and DB Insert
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category,
          location,
          image_url: imageUrl,
          user_id: user?.id
        })
      })

      if (!res.ok) {
        throw new Error('Failed to submit report')
      }

      setIsSuccess(true)
      
      // Auto redirect after success
      setTimeout(() => {
        router.push('/feed')
      }, 2000)

    } catch (error) {
      console.error(error)
      alert('Failed to submit report. Ensure Supabase storage is setup correctly.')
    } finally {
      setIsSubmitting(false)
    }
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
              
              {preview ? (
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/20">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary/30 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <p className="mb-1 text-sm text-slate-text font-medium"><span className="text-primary font-bold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-slate-mid">SVG, PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                </label>
              )}
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
