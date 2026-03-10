import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CAR_MODULE } from "../../../modules/car"
import type CarModuleService from "../../../modules/car/service"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const carService = req.scope.resolve(CAR_MODULE) as CarModuleService
  const cars = await carService.listCars()

  const payload = {
    cars: cars.map((car) => ({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price ?? 0,
    })),
  }

  res.json(payload)
}
