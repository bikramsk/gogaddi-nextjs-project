import { Metadata } from "next"
import { notFound } from "next/navigation"
import CarDetailTemplate from "@modules/cars/templates/car-detail-template"
import { getCarByHandle } from "@lib/data/cars"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countryCode, handle } = await params
  const { car } = await getCarByHandle(countryCode, handle)
  if (!car) return { title: "Car not found | GoGaddi" }

  return {
    title: `${car.name} | GoGaddi`,
    description: car.description ?? `View ${car.name} details.`,
    openGraph: {
      title: `${car.name} | GoGaddi`,
      description: car.description ?? undefined,
      images: car.thumbnail ? [car.thumbnail] : undefined,
    },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { countryCode, handle } = await params
  const { car } = await getCarByHandle(countryCode, handle)
  if (!car) notFound()

  return <CarDetailTemplate car={car} />
}

