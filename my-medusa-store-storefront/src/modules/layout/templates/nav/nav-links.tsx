"use client"

import { useParams, usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type NavLink = {
  href: string
  label: string
  exact?: boolean
  className?: string
  activeClassName?: string
}

function normalizePath(p: string): string {
  // remove trailing slashes except root
  if (p.length > 1) return p.replace(/\/+$/, "")
  return p
}

export default function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname() || "/"
  const { countryCode } = useParams() as { countryCode?: string }

  const localizedPathname = normalizePath(pathname)
  const prefix = countryCode ? `/${countryCode}` : ""

  return (
    <>
      {links.map((l) => {
        const target = normalizePath(`${prefix}${l.href}`)
        const isActive = l.exact ? localizedPathname === target : localizedPathname === target || localizedPathname.startsWith(`${target}/`)

        const base =
          l.className ??
          "px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all duration-200"

        const active =
          l.activeClassName ??
          "bg-white text-blue-700 shadow-sm"

        return (
          <LocalizedClientLink
            key={l.href}
            href={l.href}
            className={`${base} ${isActive ? active : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {l.label}
          </LocalizedClientLink>
        )
      })}
    </>
  )
}

