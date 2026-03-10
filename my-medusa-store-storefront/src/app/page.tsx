import { listCars } from "@lib/data/cars"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cars",
  description: "Browse our car inventory.",
}

export default async function HomePage() {
  const { cars, error } = await listCars()
  if (error) {
    return (
      <div className="content-container py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Cars</h1>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
          <p className="font-medium">Unable to load cars</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">
            In the Medusa backend folder run:{" "}
            <code className="bg-amber-100 px-1 rounded">npm run dev</code>
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="content-container py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cars.map((car) => (
          <article
            key={car.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="font-medium text-gray-900">
              {car.make} {car.model}
            </p>
            <p className="text-sm text-gray-500 mt-1">Year: {car.year}</p>
            <p className="text-sm font-medium text-gray-900 mt-2">
              Price: ${car.price.toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
