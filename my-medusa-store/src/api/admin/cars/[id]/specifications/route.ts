import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CARS_MODULE } from "../../../../../modules/cars"
import type CarsModuleService from "../../../../../modules/cars/services/car-service"

export async function POST(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId } = req.params
  const { spec_group, spec_name, spec_value } = req.body as any
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const specification = await carsService.addSpecification(productId, {
    spec_group: spec_group ?? "",
    spec_name: spec_name ?? "",
    spec_value: spec_value ?? "",
  })
  res.status(201).json({ specification })
}
