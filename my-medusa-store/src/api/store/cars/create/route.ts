import type { AuthenticatedMedusaRequest } from "@medusajs/framework/http"
import { MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules, ProductStatus } from "@medusajs/framework/utils"
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"

export async function POST(req: AuthenticatedMedusaRequest, res: MedusaResponse): Promise<void> {
  const customerId = req.auth_context?.actor_id
  if (!customerId) {
    res.status(401).json({ message: "You must be signed in to list a car." })
    return
  }

  const body = (req.body as any) ?? {}
  const {
    title,
    brand,
    model,
    price,
    car_type,
    fuel_type,
    transmission,
    year,
    km_driven,
    color,
    engine,
    mileage,
    owner,
    city,
    description,
    images,
  } = body

  if (!title || title.toString().trim() === "") {
    res.status(400).json({ message: "Title is required" })
    return
  }
  if (price == null || price === "" || Number(price) < 0) {
    res.status(400).json({ message: "A valid price is required" })
    return
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const salesChannelService = req.scope.resolve(Modules.SALES_CHANNEL)

  const salesChannels = await salesChannelService.listSalesChannels({ name: "Default Sales Channel" })
  const defaultSalesChannelId = salesChannels[0]?.id

  const { data: collections = [] } = brand
    ? await query.graph({ entity: "product_collection", fields: ["id", "title"], filters: { title: brand } } as any)
    : { data: [] }
  const collectionId = (collections as any[])[0]?.id ?? undefined

  const handle = `user-${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`

  const priceAmountINR = Number(price) || 0

  const productInput: any = {
    title,
    handle,
    description: description ?? "",
    status: ProductStatus.PUBLISHED,
    metadata: {
      model: model ?? "",
      car_type: car_type ?? "Used",
      fuel_type: fuel_type ?? "",
      transmission: transmission ?? "",
      year: year ?? "",
      km_driven: km_driven ?? "",
      color: color ?? "",
      engine: engine ?? "",
      mileage: mileage ?? "",
      owner: owner ?? "",
      city: city ?? "",
      customer_id: customerId,
    },
    ...(collectionId && { collection_id: collectionId }),
    ...(defaultSalesChannelId && { sales_channels: [{ id: defaultSalesChannelId }] }),
    images: (Array.isArray(images) ? images : []).map((url: string) => ({ url })),
    options: [
      { title: "Fuel Type", values: [fuel_type || "Petrol"] },
      { title: "Transmission", values: [transmission || "Manual"] },
    ],
    variants: [
      {
        title: `${fuel_type || "Petrol"} / ${transmission || "Manual"}`,
        options: {
          "Fuel Type": fuel_type || "Petrol",
          "Transmission": transmission || "Manual",
        },
        prices: [
          { currency_code: "inr", amount: priceAmountINR },
          { currency_code: "usd", amount: Math.round(priceAmountINR / 84) },
        ],
      },
    ],
  }

  try {
    const result = await createProductsWorkflow(req.scope).run({
      input: { products: [productInput] },
    })
    const created = result?.result?.[0]
    res.status(201).json({ product_id: created?.id, handle: created?.handle ?? handle })
  } catch (err: any) {
    res.status(500).json({ message: err?.message ?? "Failed to create listing" })
  }
}
