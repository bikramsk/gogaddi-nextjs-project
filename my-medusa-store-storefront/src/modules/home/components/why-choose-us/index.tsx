"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Zap, Globe, Heart } from "lucide-react"

// Assuming WHY_US mapping for luxury icons
const WHY_US_ICONS = {
  "Trust & Security": <ShieldCheck className="w-8 h-8 text-blue-400" />,
  "Fastest Booking": <Zap className="w-8 h-8 text-amber-400" />,
  "Pan India Reach": <Globe className="w-8 h-8 text-emerald-400" />,
  "Best Prices": <Heart className="w-8 h-8 text-rose-400" />,
}

export default function WhyChooseUs() {
  // Assuming WHY_US is passed or imported; using a fallback structure
  const WHY_US: { title: string; desc: string; icon?: string }[] = [
    { title: "Trust & Security", desc: "Verified sellers and transparent documentation for every vehicle." },
    { title: "Fastest Booking", desc: "Digital-first approach to ensure you get behind the wheel faster." },
    { title: "Pan India Reach", desc: "Connecting buyers and sellers across 200+ cities in India." },
    { title: "Best Prices", desc: "Competitive market rates with zero hidden commission fees." },
  ]

  return (
    <section className="relative bg-[#050a18] py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="content-container relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4"
          >
            Why Choose <span className="text-blue-500">GoGaddi?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-xl mx-auto text-lg font-light"
          >
            Redefining the car buying experience with trust, speed, and transparency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((w, idx) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 backdrop-blur-md hover:bg-slate-800/60 hover:border-blue-500/50 transition-all duration-500"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl group-hover:bg-blue-500/40 transition-all" />
                  <div className="relative w-16 h-16 flex items-center justify-center bg-slate-900 border border-slate-700 rounded-2xl group-hover:border-blue-400 group-hover:scale-110 transition-all duration-500">
                    {/* Fallback to w.icon if WHY_US_ICONS mapping is missing */}
                    {WHY_US_ICONS[w.title as keyof typeof WHY_US_ICONS] || <span className="text-3xl">{w.icon}</span>}
                  </div>
                </div>

                <h3 className="text-white font-bold text-xl mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                  {w.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {w.desc}
                </p>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
