import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

/**
 * GET /admin/products/:id/metadata
 * Returns only metadata (for widgets that need features/specifications).
 */
export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id } = req.params
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: products = [] } = await query.graph({
    entity: "product",
    fields: ["id", "metadata"],
    filters: { id },
  })
  const product = (products as any[])[0]
  if (!product) {
    res.status(404).json({ message: "Product not found" })
    return
  }
  res.json({ metadata: product.metadata ?? {} })
}

/**
 * POST /admin/products/:id/metadata
 * Body: { metadata: Record<string, any> } — merged with existing metadata.
 * Used by the Features & Specifications widget to save two tables.
 */
export async function POST(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id } = req.params
  const { metadata } = req.body as { metadata?: Record<string, unknown> }
  if (!metadata || typeof metadata !== "object") {
    res.status(400).json({ message: "Body must include metadata object" })
    return
  }
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: products = [] } = await query.graph({
    entity: "product",
    fields: ["id", "metadata"],
    filters: { id },
  })
  const product = (products as any[])[0]
  if (!product) {
    res.status(404).json({ message: "Product not found" })
    return
  }
  const existing = (product.metadata ?? {}) as Record<string, unknown>
  const merged = { ...existing, ...metadata }

  const productModuleService = req.scope.resolve(Modules.PRODUCT) as any
  if (typeof productModuleService?.updateProducts === "function") {
    await productModuleService.updateProducts({ id }, { metadata: merged })
  } else {
    res.status(500).json({ message: "Product service update not available" })
    return
  }
  res.json({ metadata: merged })
}
