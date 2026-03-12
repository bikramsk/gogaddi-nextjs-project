import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getRootCategoriesForSitemap } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"

export const metadata: Metadata = {
  title: "Site Map | GoGaddi",
  description: "Browse all car brands, models, and site pages.",
}

/** Car category links go to /cars?category={handle} so the cars page shows only that category. */
function CategoryList({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) {
  return (
    <ul className="space-y-4">
      {categories.map((cat, index) => (
        <li
          key={cat.id}
          className="group/item opacity-0 animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-forwards"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <LocalizedClientLink
            href={cat.handle ? `/cars?category=${encodeURIComponent(cat.handle)}` : "/cars"}
            className="flex items-center text-slate-700 hover:text-blue-600 font-semibold transition-all duration-300 group-hover/item:translate-x-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3 group-hover/item:scale-150 transition-transform" />
            {cat.name}
          </LocalizedClientLink>

          {cat.category_children && (cat.category_children as any[]).length > 0 && (
            <ul className="ml-4 mt-3 pl-4 border-l border-slate-200 space-y-2.5">
              {(cat.category_children as any[]).map((child: { id: string; handle?: string; name?: string }) => (
                <li key={child.id}>
                  <LocalizedClientLink
                    href={child.handle ? `/cars?category=${encodeURIComponent(child.handle)}` : "/cars"}
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors block"
                  >
                    {child.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

function SiteLinksColumn() {
  const linkStyle = "flex items-center text-sm text-slate-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
  const headerStyle = "text-xs uppercase tracking-[0.2em] font-black text-slate-400 mb-6"

  return (
    <div className="space-y-12">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <LocalizedClientLink href="/cars" className="text-blue-600 hover:text-blue-700 font-bold tracking-tight text-lg italic">
          Special Offers %
        </LocalizedClientLink>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <p className={headerStyle}>My Account</p>
        <ul className="space-y-4">
          {["Account Information", "Password", "Address Book", "Order History", "Downloads"].map((item) => (
            <li key={item}>
              <LocalizedClientLink href="/account" className={linkStyle}>
                <span className="w-4 h-[1px] bg-slate-300 mr-3" />
                {item}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
        <LocalizedClientLink href="/cars" className={linkStyle}>Booking Details</LocalizedClientLink>
        <LocalizedClientLink href="/cars" className={linkStyle}>Checkout</LocalizedClientLink>
        <LocalizedClientLink href="/cars" className={linkStyle}>Search</LocalizedClientLink>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <p className={headerStyle}>Information</p>
        <ul className="space-y-4">
          {[
            { name: "About Us", href: "/about-us" },
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms & Conditions", href: "/terms" },
            { name: "Contact Us", href: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <LocalizedClientLink href={item.href} className={linkStyle}>
                <span className="w-4 h-[1px] bg-slate-300 mr-3" />
                {item.name}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default async function SitemapPage() {
  const rootCategories = await getRootCategoriesForSitemap()

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100">
      {/* Dynamic Header Section */}
      <div className="relative overflow-hidden bg-slate-900 pt-20 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="content-container relative z-10">
          <nav className="mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <ol className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-500">
              <li><LocalizedClientLink href="/" className="hover:text-white transition-colors">Home</LocalizedClientLink></li>
              <li className="text-slate-700">/</li>
              <li className="text-blue-400">Sitemap</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Directory<span className="text-blue-500">.</span>
          </h1>
          <p className="text-slate-400 mt-4 max-w-md font-light">
            Navigate through our comprehensive collection of automotive categories and essential platform links.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Categories Section - Taking more space */}
          <section className="lg:col-span-7">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                Car Categories
                <div className="h-[1px] flex-1 bg-slate-200" />
              </h2>
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
                {rootCategories.length > 0 ? (
                  <CategoryList categories={rootCategories} />
                ) : (
                  <p className="text-slate-400 italic">Exploring the inventory...</p>
                )}
              </div>
            </div>
          </section>

          {/* Site Links Section */}
          <section className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-4">
              Platform
              <div className="h-[1px] flex-1 bg-slate-200" />
            </h2>
            <div className="bg-slate-50/50 p-8 md:p-12 rounded-3xl border border-dashed border-slate-200">
              <SiteLinksColumn />
            </div>
          </section>
        </div>

        {/* Premium Back Button */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex justify-center">
          <LocalizedClientLink
            href="/"
            className="group flex items-center gap-4 text-slate-400 hover:text-slate-900 transition-all duration-300"
          >
            <span className="text-xs font-black uppercase tracking-[0.3em]">Return Home</span>
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}