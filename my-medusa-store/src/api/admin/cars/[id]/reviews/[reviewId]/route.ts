import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CARS_MODULE } from "../../../../../../modules/cars"
import type CarsModuleService from "../../../../../../modules/cars/services/car-service"

export async function PUT(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId, reviewId } = req.params
  const { reviewer_name, rating, review_text } = req.body as any
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const updated = await (carsService as any).updateCarReviews(
    { id: reviewId },
    {
      ...(reviewer_name !== undefined && { reviewer_name: String(reviewer_name) }),
      ...(rating !== undefined && { rating: Math.min(5, Math.max(1, Number(rating) || 0)) }),
      ...(review_text !== undefined && { review_text: String(review_text) }),
    }
  )
  res.json({ review: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { reviewId } = req.params
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  await (carsService as any).deleteCarReviews({ id: reviewId })
  res.status(204).send()
}
