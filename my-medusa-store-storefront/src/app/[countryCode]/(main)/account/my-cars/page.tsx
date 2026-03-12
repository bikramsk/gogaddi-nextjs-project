import { Metadata } from "next"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listCars } from "@lib/data/cars"
import CarCard from "@modules/cars/components/car-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "My Listings | GoGaddi",
  description: "Manage your car listings.",
}

export default async function MyCarsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    notFound()
  }

  const { cars } = await listCars(countryCode)
  const myCars = cars.filter((c) => c.customer_id === customer.id)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-500 text-sm mt-1">{myCars.length} {myCars.length === 1 ? "car" : "cars"} listed</p>
        </div>
        <LocalizedClientLink
          href="/sell-car"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          + Add New Car
        </LocalizedClientLink>
      </div>

      {myCars.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <span className="text-5xl block mb-4">🚗</span>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No listings yet</h3>
          <p className="text-gray-500 text-sm mb-6">
            You haven't listed any cars yet. Start selling today!
          </p>
          <LocalizedClientLink
            href="/sell-car"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            + Post Your Car for Free
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {myCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}
