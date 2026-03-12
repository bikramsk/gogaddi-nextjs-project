import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CARS_MODULE } from "../../../../../modules/cars"
import type CarsModuleService from "../../../../../modules/cars/services/car-service"

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId } = req.params
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const specifications = await carsService.getCarSpecifications(productId)
  res.json({
    specifications: (specifications as any[]).map((s) => ({
      id: s.id,
      spec_group: s.spec_group,
      spec_name: s.spec_name,
      spec_value: s.spec_value,
    })),
  })
}
