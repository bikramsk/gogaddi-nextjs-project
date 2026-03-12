"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SelectField from "@modules/common/components/select-field"

export type CategoryOption = { value: string; label: string }

export default function CategoryFilterBar({
  categories,
  categoryValue,
  maxPriceOptions,
  maxPriceValue,
}: {
  categories: CategoryOption[]
  categoryValue: string
  maxPriceOptions: CategoryOption[]
  maxPriceValue: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="bg-white border-b border-slate-200 py-4">
      <div className="content-container">
        <div className="flex flex-wrap items-center gap-4">
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 shrink-0">
                Category
              </span>
              <div className="min-w-[200px] max-w-xs">
                <SelectField
                  label=""
                  options={categories}
                  placeholder="--Category--"
                  value={categoryValue}
                  onChange={(e) => updateParam("category", e.target.value)}
                />
              </div>
            </div>
          )}
          {maxPriceOptions.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 shrink-0">
                Price
              </span>
              <div className="min-w-[200px] max-w-xs">
                <SelectField
                  label=""
                  options={maxPriceOptions}
                  placeholder="--Max Price--"
                  value={maxPriceValue}
                  onChange={(e) => updateParam("maxPrice", e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
