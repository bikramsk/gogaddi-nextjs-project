import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CARS_MODULE } from "../../../../../modules/cars"
import type CarsModuleService from "../../../../../modules/cars/services/car-service"

export async function POST(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId } = req.params
  const { related_product_id } = req.body as any
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const related = await carsService.addRelatedCar(productId, related_product_id)
  res.status(201).json({ related })
}
