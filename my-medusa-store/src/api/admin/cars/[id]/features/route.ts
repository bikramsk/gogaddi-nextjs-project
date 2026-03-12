import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CARS_MODULE } from "../../../../../modules/cars"
import type CarsModuleService from "../../../../../modules/cars/services/car-service"

export async function POST(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId } = req.params
  const { feature_name, feature_value } = req.body as any
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const feature = await carsService.addFeature(productId, {
    feature_name: feature_name ?? "",
    feature_value: feature_value ?? "",
  })
  res.status(201).json({ feature })
}
