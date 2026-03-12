import { Metadata } from "next"
import { FileText, Search, Car, ShieldCheck } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "How It Works | GoGaddi",
  description: "Learn how to buy or sell your car on GoGaddi — simple, transparent, and secure.",
}

const STEPS = [
  {
    icon: FileText,
    title: "List your car",
    desc: "Create a free listing with photos, price, and details. It takes a few minutes.",
  },
  {
    icon: Search,
    title: "Buyers find you",
    desc: "Your car appears in search and filters. Interested buyers can view and contact you.",
  },
  {
    icon: Car,
    title: "Meet & finalise",
    desc: "Schedule a viewing, negotiate if needed, and complete the sale with documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & transparent",
    desc: "We help with verification and tips so both buyer and seller are protected.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="content-container relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">
            <LocalizedClientLink href="/" className="hover:text-white transition-colors">
              Home
            </LocalizedClientLink>
            <span className="text-slate-800">/</span>
            <span className="text-slate-400">How it works</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
            How <span className="text-blue-600 italic">It Works.</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
            Whether you are buying or selling, we make the process simple and transparent.
          </p>
        </div>
      </section>

      <section className="content-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-8 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-black flex items-center justify-center">
                {i + 1}
              </span>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                <Icon size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <LocalizedClientLink
            href="/sell-car"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-colors"
          >
            Post your car free
          </LocalizedClientLink>
        </div>
      </section>
    </div>
  )
}
