import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CARS_MODULE } from "../../../../../modules/cars"
import type CarsModuleService from "../../../../../modules/cars/services/car-service"

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId } = req.params
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const features = await carsService.getCarFeatures(productId)
  res.json({
    features: (features as any[]).map((f) => ({
      id: f.id,
      feature_name: f.feature_name,
      feature_value: f.feature_value,
    })),
  })
}
