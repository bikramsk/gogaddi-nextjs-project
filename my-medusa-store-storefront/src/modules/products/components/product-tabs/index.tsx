"use client"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const specs = [
    { label: "Fuel type", value: meta.fuel_type },
    { label: "Transmission", value: meta.transmission },
    { label: "Year", value: meta.year },
    { label: "KM driven", value: meta.km_driven },
    { label: "City", value: meta.city },
    { label: "Color", value: meta.color },
    { label: "Engine", value: meta.engine },
    { label: "Mileage", value: meta.mileage },
    { label: "Owner", value: meta.owner },
  ].filter((s) => s.value != null && String(s.value).trim() !== "")

  const tabs = [
    {
      label: "Description",
      component: (
        <div className="text-small-regular py-6">
          <p className="whitespace-pre-line text-gray-600">
            {product.description || "No description provided."}
          </p>
        </div>
      ),
    },
    ...(specs.length > 0
      ? [
          {
            label: "Specifications",
            component: (
              <div className="text-small-regular py-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specs.map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-4 py-2 border-b border-gray-100">
                      <dt className="font-medium text-gray-500">{label}</dt>
                      <dd className="text-gray-900">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ),
          },
        ]
      : []),
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export default ProductTabs
