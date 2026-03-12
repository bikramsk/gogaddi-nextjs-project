import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { CARS_MODULE } from "../../../../modules/cars"
import type CarsModuleService from "../../../../modules/cars/services/car-service"

function metadataFeatures(meta: any): Array<{ feature_name: string; feature_value: string }> {
  const raw = meta?.features
  if (!raw || typeof raw !== "object") return []
  const out: { feature_name: string; feature_value: string }[] = []
  for (const group of Object.values(raw) as any[]) {
    if (!Array.isArray(group)) continue
    for (const item of group) {
      if (item?.key) out.push({ feature_name: item.key, feature_value: item.value ?? "" })
    }
  }
  return out
}

function metadataSpecs(meta: any): Array<{ spec_group: string; spec_name: string; spec_value: string }> {
  const raw = meta?.specifications
  if (!raw || typeof raw !== "object") return []
  const out: { spec_group: string; spec_name: string; spec_value: string }[] = []
  for (const [group, items] of Object.entries(raw) as [string, any][]) {
    if (!Array.isArray(items)) continue
    for (const item of items) {
      if (item?.key) out.push({ spec_group: group, spec_name: item.key, spec_value: item.value ?? "" })
    }
  }
  return out
}

function extractOption(variants: any[], optionTitle: string): string {
  for (const v of variants ?? []) {
    for (const opt of v.options ?? []) {
      if (opt.option?.title === optionTitle && opt.value) return opt.value
    }
  }
  return ""
}

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { handle } = req.params
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)

  const { data: products = [] } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "subtitle",
      "handle",
      "thumbnail",
      "description",
      "metadata",
      "collection.*",
      "images.*",
      "variants.*",
      "variants.options.*",
      "variants.options.option.*",
      "variants.calculated_price.*",
    ],
    filters: { handle },
  })

  const p = (products as any[])[0]
  if (!p) {
    res.status(404).json({ message: "Car not found" })
    return
  }

  const [moduleFeatures, moduleSpecs, reviews, relatedRows] = await Promise.all([
    carsService.getCarFeatures(p.id),
    carsService.getCarSpecifications(p.id),
    carsService.getCarReviews(p.id),
    carsService.getRelatedCars(p.id),
  ])

  const features = (moduleFeatures as any[]).length > 0
    ? (moduleFeatures as any[]).map((f) => ({ feature_name: f.feature_name, feature_value: f.feature_value }))
    : metadataFeatures(p.metadata)

  const specifications = (moduleSpecs as any[]).length > 0
    ? (moduleSpecs as any[]).map((s) => ({ spec_group: s.spec_group, spec_name: s.spec_name, spec_value: s.spec_value }))
    : metadataSpecs(p.metadata)

  const relatedProductIds = (relatedRows as any[]).map((r) => r.related_product_id)
  const { data: relatedProducts = [] } =
    relatedProductIds.length > 0
      ? await query.graph({
          entity: "product",
          fields: ["id", "title", "handle", "thumbnail", "variants.calculated_price.*"],
          filters: { id: relatedProductIds },
        } as any)
      : { data: [] }

  const firstVariant = p.variants?.[0]
  const price = firstVariant?.calculated_price?.calculated_amount ?? firstVariant?.prices?.[0]?.amount ?? null
  const fuel_type = (p.metadata?.fuel_type as string) || extractOption(p.variants, "Fuel Type")
  const transmission = (p.metadata?.transmission as string) || extractOption(p.variants, "Transmission")

  const body = {
    id: p.id,
    handle: p.handle,
    thumbnail: p.thumbnail ?? null,
    images: (p.images ?? []).map((img: any) => img.url).filter(Boolean),
    name: p.title,
    subtitle: p.subtitle ?? null,
    brand: p.collection?.name ?? null,
    model: (p.metadata?.model as string) ?? p.subtitle ?? null,
    fuel_type: fuel_type || null,
    transmission: transmission || null,
    year: (p.metadata?.year as string) ?? null,
    km_driven: (p.metadata?.km_driven as string) ?? null,
    color: (p.metadata?.color as string) ?? null,
    engine: (p.metadata?.engine as string) ?? null,
    mileage: (p.metadata?.mileage as string) ?? null,
    owner: (p.metadata?.owner as string) ?? null,
    city: (p.metadata?.city as string) ?? null,
    customer_id: (p.metadata?.customer_id as string) ?? null,
    availability: true,
    price,
    description: p.description ?? null,
    features,
    specifications,
    reviews: (reviews as any[]).map((r) => ({
      id: r.id,
      reviewer_name: r.reviewer_name,
      rating: r.rating,
      review_text: r.review_text,
      created_at: r.created_at,
    })),
    versions: (p.variants ?? []).map((v: any) => ({
      id: v.id,
      title: v.title,
      fuel_type: extractOption([v], "Fuel Type") || null,
      transmission: extractOption([v], "Transmission") || null,
      prices: v.calculated_price ?? v.prices,
    })),
    related_cars: relatedProducts,
  }

  res.json(body)
}
