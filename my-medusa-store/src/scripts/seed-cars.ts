/**
 * Bulk car seeder — idempotent, safe to re-run multiple times.
 *
 * Usage:
 *   npx medusa exec ./src/scripts/seed-cars.ts
 *
 * What it does:
 *  1. Resolves (or creates) the "car" product type
 *  2. Reads all existing product handles to skip already-seeded cars
 *  3. For each brand, resolves the category by name
 *  4. Creates every car product with proper metadata, variants and options
 *
 * Data source: src/data/cars-seed-data.ts
 */

import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules, ProductStatus } from "@medusajs/framework/utils"
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { carsSeedData } from "../data/cars-seed-data"

export default async function seedCars({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productService = container.resolve(Modules.PRODUCT) as any
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL)

  logger.info("=== Starting bulk car seeding ===")

  // ── Sales channel ───────────────────────────────────────────────────────────
  const salesChannels = await salesChannelService.listSalesChannels({
    name: "Default Sales Channel",
  })
  const defaultSalesChannelId = salesChannels[0]?.id
  if (!defaultSalesChannelId) {
    logger.warn("Default Sales Channel not found. Products will be created without a sales channel.")
  }

  // ── Shipping profile ────────────────────────────────────────────────────────
  const fulfillmentService = container.resolve(Modules.FULFILLMENT)
  const shippingProfiles = await fulfillmentService.listShippingProfiles({ type: "default" })
  const shippingProfileId = shippingProfiles[0]?.id ?? undefined

  // ── Product type "car" ──────────────────────────────────────────────────────
  logger.info('Resolving product type "car"...')
  let carTypeId: string
  try {
    const existingTypes = await productService.listProductTypes({ value: "car" })
    if (existingTypes?.length) {
      carTypeId = existingTypes[0].id
      logger.info(`Reusing existing product type "car" (${carTypeId})`)
    } else {
      const created = await productService.createProductTypes([{ value: "car" }])
      carTypeId = created[0].id
      logger.info(`Created product type "car" (${carTypeId})`)
    }
  } catch {
    logger.warn('Could not resolve product type "car". Products will be created without type.')
    carTypeId = ""
  }

  // ── Existing handles (idempotency) ──────────────────────────────────────────
  logger.info("Fetching existing product handles...")
  const { data: existingProducts = [] } = await query.graph({
    entity: "product",
    fields: ["handle"],
  })
  const existingHandles = new Set((existingProducts as any[]).map((p: any) => p.handle))
  logger.info(`Found ${existingHandles.size} existing products.`)

  // ── Category map ─────────────────────────────────────────────────────────────
  logger.info("Fetching product categories...")
  const { data: categories = [] } = await query.graph({
    entity: "product_category",
    fields: ["id", "name"],
  })
  const categoryMap = new Map<string, string>(
    (categories as any[]).map((c: any) => [c.name as string, c.id as string])
  )

  // ── Seed each car ─────────────────────────────────────────────────────────────
  let created = 0
  let skipped = 0
  const errors: string[] = []

  for (const car of carsSeedData) {
    if (existingHandles.has(car.handle)) {
      logger.info(`SKIP  [already exists] ${car.model} (${car.handle})`)
      skipped++
      continue
    }

    const categoryId = categoryMap.get(car.categoryName)
    if (!categoryId) {
      logger.warn(`WARN  Category "${car.categoryName}" not found — seeding ${car.model} without category`)
    }

    // Build product options from the variants
    const fuelTypes = [...new Set(car.variants.map((v) => v.fuelType))]
    const transmissions = [...new Set(car.variants.map((v) => v.transmission))]
    const exShowroomValues = [...new Set(car.variants.map((v) => String(v.exShowroomINR)))]

    const productInput: any = {
      title: car.model,
      subtitle: car.subtitle,
      handle: car.handle,
      description: car.description,
      status: ProductStatus.PUBLISHED,
      metadata: car.metadata,
      images: car.images.map((url) => ({ url })),
      ...(carTypeId && { type_id: carTypeId }),
      ...(categoryId && { category_ids: [categoryId] }),
      ...(shippingProfileId && { shipping_profile_id: shippingProfileId }),
      ...(defaultSalesChannelId && {
        sales_channels: [{ id: defaultSalesChannelId }],
      }),
      options: [
        { title: "Fuel Type", values: fuelTypes },
        { title: "Transmission", values: transmissions },
        { title: "Ex Showroom Price (INR)", values: exShowroomValues },
      ],
      variants: car.variants.map((v) => ({
        title: v.label,
        options: {
          "Fuel Type": v.fuelType,
          "Transmission": v.transmission,
          "Ex Showroom Price (INR)": String(v.exShowroomINR),
        },
        prices: [
          { currency_code: "usd", amount: Math.round(v.exShowroomINR / 84) },
          { currency_code: "eur", amount: Math.round(v.exShowroomINR / 92) },
        ],
      })),
    }

    try {
      await createProductsWorkflow(container).run({
        input: { products: [productInput] },
      })
      logger.info(`OK    ${car.model}`)
      created++
    } catch (err: any) {
      const msg = `FAIL  ${car.model}: ${err?.message ?? String(err)}`
      logger.error(msg)
      errors.push(msg)
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────────────
  logger.info("=== Car seeding complete ===")
  logger.info(`Created : ${created}`)
  logger.info(`Skipped : ${skipped} (already existed)`)
  logger.info(`Errors  : ${errors.length}`)
  if (errors.length) {
    errors.forEach((e) => logger.error(e))
  }
}
