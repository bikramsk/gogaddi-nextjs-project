import { listCars } from "@lib/data/cars"
import { HttpTypes } from "@medusajs/types"
import CarCard from "@modules/cars/components/car-card"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const { cars } = await listCars(countryCode)

  const collectionTitle =
    (product.collection as any)?.title ??
    (product.collection as any)?.name ??
    (product.categories as any[])?.[0]?.name ??
    null

  const related = cars
    .filter((car) => car.id !== product.id)
    .filter((car) => {
      if (!collectionTitle) return true
      return (car.brand ?? "").toLowerCase() === (collectionTitle ?? "").toLowerCase()
    })
    .slice(0, 8)

  if (related.length === 0) {
    return null
  }

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-base font-semibold text-gray-700 mb-2">
          Related cars
        </span>
        <p className="text-lg text-gray-600 max-w-lg">
          {collectionTitle
            ? `More from ${collectionTitle}`
            : "You might also like these listings."}
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </div>
  )
}
