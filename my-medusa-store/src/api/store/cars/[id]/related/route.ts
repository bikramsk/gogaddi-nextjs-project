import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { CARS_MODULE } from "../../../../../modules/cars"
import type CarsModuleService from "../../../../../modules/cars/services/car-service"

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId } = req.params
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const relatedRows = await carsService.getRelatedCars(productId)
  const relatedProductIds = (relatedRows as any[]).map((r) => r.related_product_id)
  if (relatedProductIds.length === 0) {
    res.json({ related_cars: [] })
    return
  }
  const { data: relatedProducts = [] } = await query.graph({
    entity: "product",
    fields: ["id", "title", "handle", "description", "thumbnail", "variants.*", "variants.calculated_price.*"],
    filters: { id: relatedProductIds },
  } as any)
  res.json({ related_cars: relatedProducts })
}
