"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Clock, ArrowLeft, Send } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ContactForm from "@modules/contact/components/contact-form"

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Header & Breadcrumb ── */}
      <section className="bg-slate-950 py-16 md:py-24 relative overflow-hidden">
        {/* Abstract Background Detail */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="content-container relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">
            <LocalizedClientLink href="/" className="hover:text-white transition-colors">Home</LocalizedClientLink>
            <span className="text-slate-800">/</span>
            <span className="text-slate-400">Support</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
            Get in <span className="text-blue-600 italic">Touch.</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
            Have questions about a listing or need help selling your car? 
            Our automotive experts are here to assist you.
          </p>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="content-container -mt-12 md:-mt-20 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Sidebar */}
          <aside className="lg:col-span-4 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-[2.5rem] p-10 text-white h-full shadow-2xl shadow-blue-900/20"
            >
              <h2 className="text-2xl font-black tracking-tight mb-10">Corporate Office</h2>
              
              <div className="space-y-10">
                <ContactInfoItem 
                  icon={<MapPin className="text-blue-500" />} 
                  title="Visit Us"
                  detail={["GoGaddi.com", "A-51, 3rd Floor, Sector-57", "Noida, Uttar Pradesh (U.P)"]}
                />
                <ContactInfoItem 
                  icon={<Mail className="text-blue-500" />} 
                  title="Email Support"
                  detail={["support@gogaddi.com", "media@gogaddi.com"]}
                />
                <ContactInfoItem 
                  icon={<Clock className="text-blue-500" />} 
                  title="Business Hours"
                  detail={["Mon - Sat: 10:00 AM - 7:00 PM", "Sunday: Closed"]}
                />
              </div>

              <div className="mt-16 pt-10 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Call Support</p>
                    <p className="text-xl font-bold">+91 120 4XXX XXX</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </aside>

          {/* Contact Form Section */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-14 shadow-xl shadow-slate-200/50 h-full"
            >
              <div className="mb-10">
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-2 block">Inquiry Form</span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Send us a Message</h2>
              </div>
              
              {/* Note: Ensure ContactForm component uses modern Tailwind inputs */}
              <ContactForm />

              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                <LocalizedClientLink
                  href="/"
                  className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-950 transition-colors"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Return to Home
                </LocalizedClientLink>
                <p className="text-[10px] text-slate-400 font-medium max-w-[200px] text-right">
                  Our team typically responds within 24 business hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map: GoGaddi office, Sector-57 Noida ── */}
      <section className="content-container pb-24">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Find us</h2>
            <a
              href="https://www.google.com/maps/search/?api=1&query=A-51,Sector+57,Noida,Uttar+Pradesh,India"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              <MapPin size={16} />
              Open in Google Maps
            </a>
          </div>
          <div className="w-full h-[400px] rounded-[3rem] border border-slate-200 overflow-hidden bg-slate-100">
            <iframe
              title="GoGaddi office – A-51, Sector-57, Noida"
              src="https://www.google.com/maps?q=A-51,+3rd+Floor,+Sector+57,+Noida,+Uttar+Pradesh,+India&output=embed&z=16"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[400px]"
            />
          </div>
          <p className="text-slate-500 text-sm font-medium">
            GoGaddi.com · A-51, 3rd Floor, Sector-57 · Noida, Uttar Pradesh (U.P)
          </p>
        </div>
      </section>
    </div>
  )
}

function ContactInfoItem({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string[] }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{title}</h3>
        {detail.map((line, i) => (
          <p key={i} className="text-slate-300 font-medium text-sm leading-relaxed">{line}</p>
        ))}
      </div>
    </div>
  )
}