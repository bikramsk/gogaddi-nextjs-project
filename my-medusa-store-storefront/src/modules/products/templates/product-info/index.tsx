import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPrice } from "@lib/util/get-product-price"
import { formatCarPrice } from "@lib/util/format-car-price"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

function SpecBadge({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
      {label}: {value}
    </span>
  )
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const fuel_type = (meta.fuel_type as string) ?? null
  const transmission = (meta.transmission as string) ?? null
  const year = (meta.year as string) ?? null
  const km_driven = (meta.km_driven as string) ?? null
  const city = (meta.city as string) ?? null
  const color = (meta.color as string) ?? null

  const { cheapestPrice } = getProductPrice({ product })
  const priceNum = (cheapestPrice as any)?.calculated_price_number ?? null
  const priceDisplay = formatCarPrice(priceNum)

  return (
    <div id="product-info" className="flex flex-col gap-y-4">
      {product.collection && (
        <LocalizedClientLink
          href={`/cars?brand=${encodeURIComponent((product.collection as any).title ?? "")}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {(product.collection as any).title}
        </LocalizedClientLink>
      )}
      <Heading
        level="h1"
        className="text-2xl md:text-3xl font-bold text-gray-900"
        data-testid="product-title"
      >
        {product.title}
      </Heading>

      <p className="text-xl font-semibold text-blue-700">{priceDisplay}</p>

      <div className="flex flex-wrap gap-2">
        <SpecBadge label="Fuel" value={fuel_type ?? ""} />
        <SpecBadge label="Transmission" value={transmission ?? ""} />
        <SpecBadge label="Year" value={year ?? ""} />
        <SpecBadge label="KM" value={km_driven ?? ""} />
        <SpecBadge label="City" value={city ?? ""} />
        <SpecBadge label="Color" value={color ?? ""} />
      </div>

      {product.description && (
        <Text
          className="text-gray-600 whitespace-pre-line text-sm leading-relaxed"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      )}

      <LocalizedClientLink
        href={`/cars/${product.handle}`}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        View full car listing →
      </LocalizedClientLink>
    </div>
  )
}

export default ProductInfo
