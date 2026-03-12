"use client"

import React from "react"
import { motion } from "framer-motion"
import { Scale, ShieldAlert, Globe, Copyright, HelpCircle, ArrowLeft, Info } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// export const metadata = {
//   title: "Terms & Conditions | GoGaddi",
//   description: "Operating terms and user agreement for GoGaddi.com. Please review before usage.",
// }

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Page Header ── */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
        <div className="content-container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <Scale size={14} /> Legal Agreement
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
              Terms of <span className="text-slate-400">Service.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              By using GoGaddi.com, you agree to follow the rules outlined below. 
              These terms protect both you and our platform to ensure a fair 
              automotive marketplace.
            </p>
          </div>
        </div>
      </section>

      <div className="content-container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* ── "In a Nutshell" Sidebar ── */}
          <aside className="lg:col-span-4 order-last lg:order-first">
            <div className="sticky top-24 p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl shadow-blue-900/20">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <Info className="text-blue-500" /> Key Highlights
              </h3>
              <ul className="space-y-6">
                <HighlightItem 
                  title="Indian Residents Only" 
                  text="Our services and vehicle listings are intended exclusively for the Indian market." 
                />
                <HighlightItem 
                  title="Temporary Access" 
                  text="We reserve the right to modify or withdraw services without prior notice." 
                />
                <HighlightItem 
                  title="Confidentiality" 
                  text="You are responsible for keeping your account credentials secure." 
                />
                <HighlightItem 
                  title="Copyright" 
                  text="All content is protected. Reproduction without consent is strictly prohibited." 
                />
              </ul>
            </div>
          </aside>

          {/* ── Main Legal Content ── */}
          <main className="lg:col-span-8">
            <div className="space-y-16">
              
              <Section 
                icon={<Globe className="text-blue-600" />}
                title="Accessing our site"
              >
                <p>
                  Access to our site is permitted on a temporary basis. We reserve the right
                  to withdraw or amend the service we provide without notice. We will not be 
                  liable if for any reason our site is unavailable at any time.
                </p>
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 text-sm italic font-medium">
                  Note: This website is intended for residents of India only. All information 
                  contained herein is specifically tailored for the Indian automotive market.
                </div>
                <p>
                  If you are provided with security information (passwords, IDs), you must 
                  treat such information as confidential. We reserve the right to disable 
                  any account if we believe you have failed to comply with these terms.
                </p>
              </Section>

              <Section 
                icon={<ShieldAlert className="text-blue-600" />}
                title="Dealer Confirmations & Pricing"
              >
                <p>
                  Prices shown are &quot;turnkey&quot; lists including taxes and registration fees, 
                  net of IPT (provincial tax). However, we strongly encourage you to 
                  <strong> ask your dealer to confirm final prices</strong> before purchase.
                </p>
                <p>
                  Fuel consumption data relates to urban and extra-urban cycles. Please note 
                  that monitor settings may cause car colors to appear differently than in 
                  reality; visit a dealer for first-hand color range learning.
                </p>
              </Section>

              <Section 
                icon={<Copyright className="text-blue-600" />}
                title="Intellectual Property"
              >
                <p>
                  All data, images, and texts on GoGaddi.com are protected by copyright. 
                  Access is granted for personal use only. No part of this site may be 
                  reproduced, modified, or published for any other reason without 
                  express written consent.
                </p>
                <p className="text-sm font-bold text-slate-900">
                  Any infringement of trademarks or logos constitutes a violation 
                  punishable by law.
                </p>
              </Section>

              <Section 
                icon={<HelpCircle className="text-blue-600" />}
                title="Your concerns"
              >
                <p>
                  If you have any concerns regarding the material appearing on our site, 
                  please reach out to our legal team directly at:
                </p>
                <a 
                  href="mailto:info@gogaddi.com" 
                  className="inline-block px-6 py-3 rounded-xl bg-slate-100 text-slate-900 font-black text-sm hover:bg-blue-600 hover:text-white transition-all"
                >
                  info@gogaddi.com
                </a>
              </Section>

              <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                <LocalizedClientLink
                  href="/"
                  className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft size={16} /> Return to Home
                </LocalizedClientLink>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  GoGaddi © 2026
                </p>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function Section({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
          {icon}
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
      </div>
      <div className="text-slate-600 leading-relaxed space-y-4 pl-16">
        {children}
      </div>
    </motion.section>
  )
}

function HighlightItem({ title, text }: { title: string, text: string }) {
  return (
    <li className="space-y-1">
      <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">{title}</p>
      <p className="text-slate-400 text-sm leading-snug">{text}</p>
    </li>
  )
}