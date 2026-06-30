'use client'

import { motion } from 'framer-motion'
import { HelpCircle, Mail, MessageSquare, FileText } from 'lucide-react'

export default function HelpPage() {
  const faqs = [
    { q: "How do I report an issue?", a: "Go to the Map or Feed and click the 'Report Issue' or '+' button. Fill in the details and attach an image!" },
    { q: "How does verification work?", a: "Other community members can physically verify the issue you reported by upvoting or clicking verify when nearby." },
    { q: "Who fixes the problems?", a: "Issues that gain enough verification are forwarded to local authorities and civic bodies automatically." }
  ]

  return (
    <div className="min-h-screen bg-transparent px-4 md:px-8 py-8">
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-slate-text">Help & Support</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-6 rounded-xl text-center space-y-3 cursor-pointer hover:bg-white/40">
            <MessageSquare className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Live Chat</h3>
            <p className="text-sm text-slate-mid">Chat with our support team instantly.</p>
          </div>
          <div className="glass-card p-6 rounded-xl text-center space-y-3 cursor-pointer hover:bg-white/40">
            <Mail className="w-8 h-8 text-accent mx-auto" />
            <h3 className="font-semibold">Email Us</h3>
            <p className="text-sm text-slate-mid">Send us a detailed message.</p>
          </div>
          <div className="glass-card p-6 rounded-xl text-center space-y-3 cursor-pointer hover:bg-white/40">
            <FileText className="w-8 h-8 text-green-500 mx-auto" />
            <h3 className="font-semibold">Documentation</h3>
            <p className="text-sm text-slate-mid">Read our detailed user guides.</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <h4 className="font-bold text-lg text-slate-text">{faq.q}</h4>
                <p className="text-slate-mid mt-2">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  )
}
