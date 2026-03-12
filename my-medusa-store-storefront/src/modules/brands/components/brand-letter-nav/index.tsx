"use client"

import { useEffect, useMemo, useState } from "react"

export default function BrandLetterNav({ letters }: { letters: string[] }) {
  const ids = useMemo(() => letters.map((l) => `section-${l}`), [letters])
  const [active, setActive] = useState<string>(letters[0] ?? "")

  useEffect(() => {
    if (!ids.length) return

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the top-most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0)
          )[0]

        if (visible?.target?.id) {
          const letter = String(visible.target.id).replace("section-", "")
          if (letter && letter !== active) setActive(letter)
        }
      },
      {
        // trigger a bit before the section hits the top
        root: null,
        threshold: [0.1, 0.25, 0.5],
        rootMargin: "-20% 0px -70% 0px",
      }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")])

  return (
    <aside className="hidden md:block w-12 sticky top-24 h-fit">
      <nav className="flex flex-col gap-1 border-l border-slate-200 pl-4">
        {letters.map((letter) => {
          const isActive = letter === active
          return (
            <a
              key={letter}
              href={`#section-${letter}`}
              className={[
                "text-xs font-bold transition-colors py-1 uppercase tracking-widest",
                isActive
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-blue-600",
              ].join(" ")}
              aria-current={isActive ? "true" : undefined}
            >
              {letter}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}

