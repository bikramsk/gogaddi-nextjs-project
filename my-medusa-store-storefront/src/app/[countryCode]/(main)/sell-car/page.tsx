import { Metadata } from "next"
import { redirect } from "next/navigation"
import SellCarForm from "@modules/cars/components/sell-car-form"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Sell Your Car | GoGaddi",
  description: "List your car for free and reach thousands of buyers.",
}

const STEPS = [
  { step: "1", title: "Fill Details", desc: "Enter car info below" },
  { step: "2", title: "Get Listed", desc: "Live in minutes" },
  { step: "3", title: "Sell Fast", desc: "Buyers contact you" },
]

export default async function SellCarPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await retrieveCustomer().catch(() => null)
  if (!customer) {
    redirect(`/${countryCode}/account?from=sell-car`)
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero */}
      <section className="relative bg-slate-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
        </div>
        <div className="content-container relative z-10">
          <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">
            <LocalizedClientLink href="/" className="hover:text-blue-300 transition-colors">
              Home
            </LocalizedClientLink>
            <span className="text-slate-500 mx-2">/</span>
            <span className="text-slate-400">Sell Your Car</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-3">
            Sell Your <span className="text-blue-400">Car</span>
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-xl">
            List for free and connect with thousands of buyers. No hidden fees.
          </p>
        </div>
      </section>

      {/* Steps */}
      <div className="content-container py-10">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="flex items-center gap-4 bg-white rounded-2xl border border-slate-200/80 px-6 py-5 flex-1 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                {s.step}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{s.title}</p>
                <p className="text-slate-500 text-xs font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[1.5rem] border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 md:p-10">
            <SellCarForm />
          </div>
        </div>
      </div>
    </div>
  )
}
