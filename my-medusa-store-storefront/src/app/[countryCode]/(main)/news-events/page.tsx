"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, ChevronRight, Filter, Grid, List, Mail, Search, TrendingUp } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { NEWS_AND_EVENTS } from "data/news-events"
import { PLACEHOLDER_IMAGE_URL } from "@lib/constants/placeholder-image"

const CAR_IMAGES_FROM_PUBLIC = [
  "/cars/peter-broomfield-m3m-lnR90uM-unsplash.jpg",
  "/cars/joshua-koblin-eqW1MPinEV4-unsplash.jpg",
  "/cars/olav-tvedt-6lSBynPRaAQ-unsplash.jpg",
  "/cars/pexels-pixabay-248704.jpg",
  "/cars/pexels-orestsv-2062555.jpg",
  "/cars/pexels-lalesh-168938.jpg",
  "/cars/stephan-louis-mN8H_fe040Y-unsplash.jpg",
  "/cars/pexels-alexgtacar-745150-1592384.jpg",
  "/cars/pexels-bertellifotografia-3007436.jpg",
  "/cars/pexels-vladalex94-1402787.jpg",
]

function getCarImageForIndex(index: number): string {
  return CAR_IMAGES_FROM_PUBLIC[index % CAR_IMAGES_FROM_PUBLIC.length] ?? PLACEHOLDER_IMAGE_URL
}

export default function NewsAndEventsPage() {
  const items = [...NEWS_AND_EVENTS]
  const featuredNews = items[0]
  const recentNews = items.slice(1, 7)
  const featuredImage = getCarImageForIndex(0)
  const itemImages = items.map((_, idx) => getCarImageForIndex(idx))

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="content-container py-4 flex flex-wrap items-center justify-between gap-6">
          <div>
            <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
              Automotive Journal
            </nav>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
              News & <span className="text-slate-400">Events.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-blue-50 text-blue-600"><Grid size={18} /></button>
              <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><List size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container py-10">
        {/* ── Featured Hero Article ── */}
        {featuredNews && (
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative rounded-[2.5rem] overflow-hidden bg-slate-900 mb-16 aspect-[16/9] md:aspect-[21/9]"
          >
            <Image
              src={featuredImage}
              alt={featuredNews.title}
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-0 p-8 md:p-16 max-w-3xl">
              <div className="flex items-center gap-3 text-blue-400 mb-4 font-bold text-xs uppercase tracking-widest">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px]">Hot Topic</span>
                <Calendar size={14} />
                {featuredNews.date}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
                {featuredNews.title}
              </h2>
              <LocalizedClientLink
                href="/cars"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
              >
                Read Featured Story <ChevronRight size={16} />
              </LocalizedClientLink>
            </div>
          </motion.article>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Main Feed ── */}
          <main className="lg:col-span-8 space-y-12">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <TrendingUp size={16} /> Latest Stories
            </h3>
            
            <div className="grid grid-cols-1 gap-12">
{items.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col md:flex-row gap-8"
                >
                  <div className="relative w-full md:w-72 aspect-[4/3] rounded-3xl overflow-hidden shrink-0 shadow-xl shadow-slate-200">
                    <Image
                      src={itemImages[idx] ?? PLACEHOLDER_IMAGE_URL}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Calendar size={12} /> {item.date}
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-slate-500 line-clamp-3 text-sm leading-relaxed mb-6 font-medium">
                      {item.excerpt}
                    </p>
                    <LocalizedClientLink
                      href="/cars"
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-950 flex items-center gap-2 transition-all"
                    >
                      Continue Reading <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </LocalizedClientLink>
                  </div>
                </motion.article>
              ))}
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Newsletter Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
              <Mail className="text-blue-500 mb-6" size={32} />
              <h4 className="text-xl font-black text-white mb-2">Be the first to know.</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Exclusive car launches, reviews, and market trends delivered weekly.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-2xl text-xs uppercase tracking-widest transition-all">
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Trending Section */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Must Read</h4>
              <div className="space-y-8">
                {recentNews.map((n, idx) => (
                  <LocalizedClientLink key={n.id} href="/cars" className="group flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0 relative">
                       <Image src={getCarImageForIndex(idx + 1)} alt={n.title} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{n.date}</span>
                      <h5 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {n.title}
                      </h5>
                    </div>
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}