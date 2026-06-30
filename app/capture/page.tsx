'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Upload, CheckCircle2, X } from 'lucide-react'
import { categoryLabels } from '@/lib/mock-data'

type Category = 'pothole' | 'graffiti' | 'lighting' | 'trash' | 'tree' | 'sidewalk'

interface CaptureState {
  step: 'capture' | 'details' | 'confirm'
  image?: string
  category?: Category
  title?: string
  description?: string
}

export default function CapturePage() {
  const [state, setState] = useState<CaptureState>({ step: 'capture' })
  const [isProcessing, setIsProcessing] = useState(false)

  const categories: Category[] = ['pothole', 'graffiti', 'lighting', 'trash', 'tree', 'sidewalk']

  const handleImageCapture = (imageData: string) => {
    setState({ ...state, image: imageData, step: 'details' })
    // Simulate AI detection
    setIsProcessing(true)
    setTimeout(() => {
      setState(prev => ({ ...prev, category: 'pothole' as Category }))
      setIsProcessing(false)
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleImageCapture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    setState({ ...state, step: 'confirm' })
    setTimeout(() => {
      setState({ step: 'capture' })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {state.step === 'capture' && (
          <motion.div
            key="capture"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <div className="max-w-lg w-full space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-foreground">Report an Issue</h1>
                <p className="text-muted-foreground">
                  Help us fix your neighborhood, one issue at a time.
                </p>
              </div>

              <div className="space-y-4">
                {/* Camera input */}
                <motion.label
                  className="block relative cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="bg-card rounded-2xl border-2 border-dashed border-border hover:border-accent transition-colors p-12 text-center">
                    <motion.div
                      className="flex justify-center mb-4"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Camera className="w-12 h-12 text-accent" />
                    </motion.div>
                    <p className="text-lg font-semibold text-foreground mb-1">
                      Take a Photo
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tap to open camera or upload an image
                    </p>
                  </div>
                </motion.label>

                {/* Upload fallback */}
                <motion.label
                  className="block relative cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="bg-muted rounded-xl border border-border p-4 text-center hover:bg-muted/80 transition-colors">
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Upload from Gallery
                      </span>
                    </div>
                  </div>
                </motion.label>
              </div>

              {/* Tips */}
              <div className="bg-accent/10 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-sm text-foreground">Photo Tips</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Take a clear, well-lit photo</li>
                  <li>• Include the full issue area</li>
                  <li>• Avoid blurry or dark images</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {state.step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
          >
            <div className="max-w-lg w-full space-y-6">
              {/* Image preview */}
              <div className="relative rounded-xl overflow-hidden border border-border shadow-lg">
                <img
                  src={state.image}
                  alt="Captured issue"
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* AI detection */}
              {isProcessing && (
                <motion.div
                  className="flex items-center justify-center gap-2 py-3 bg-accent/10 rounded-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium text-accent">
                    Analyzing image...
                  </span>
                </motion.div>
              )}

              {/* Category selection */}
              {state.category && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 bg-accent/10 rounded-lg p-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Detected Category</p>
                      <p className="font-semibold text-foreground">
                        {categoryLabels[state.category]}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      Not sure? Choose correct category:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <motion.button
                          key={cat}
                          onClick={() => setState(prev => ({ ...prev, category: cat }))}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                            state.category === cat
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {categoryLabels[cat]}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Description input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Brief title of the issue"
                  value={state.title || ''}
                  onChange={(e) => setState(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">
                  Description (optional)
                </label>
                <textarea
                  placeholder="Additional details..."
                  value={state.description || ''}
                  onChange={(e) => setState(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none h-24"
                />
              </div>

              {/* Submit button */}
              <motion.button
                onClick={handleSubmit}
                disabled={!state.title || isProcessing}
                className="w-full px-4 py-3 rounded-lg bg-accent text-accent-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Report
              </motion.button>

              <motion.button
                onClick={() => setState({ step: 'capture' })}
                className="w-full px-4 py-2 rounded-lg bg-muted text-muted-foreground font-medium hover:bg-muted/80 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}

        {state.step === 'confirm' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              className="text-center space-y-4 max-w-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto shadow-xl"
                animate={{ scale: [0, 1] }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Report Submitted!
                </h2>
                <p className="text-muted-foreground">
                  Thank you for helping improve your community. Your issue has been reported and will be reviewed shortly.
                </p>
              </div>

              <motion.div
                className="pt-4"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-xs text-muted-foreground">
                  Redirecting to feed...
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
