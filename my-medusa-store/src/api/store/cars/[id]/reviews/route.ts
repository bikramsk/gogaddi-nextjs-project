import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CARS_MODULE } from "../../../../../modules/cars"
import type CarsModuleService from "../../../../../modules/cars/services/car-service"

function mapReview(r: any) {
  return {
    id: r.id,
    reviewer_name: r.reviewer_name,
    rating: r.rating,
    review_text: r.review_text,
    created_at: r.created_at,
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId } = req.params
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const reviews = await carsService.getCarReviews(productId)
  res.json({ reviews: (reviews as any[]).map(mapReview) })
}

/** Customer-facing: submit a review. In production consider auth (customer_id) and rate limiting. */
export async function POST(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const { id: productId } = req.params
  const { reviewer_name, rating, review_text } = (req.body as any) ?? {}
  const carsService = req.scope.resolve<CarsModuleService>(CARS_MODULE)
  const review = await carsService.addReview(productId, {
    reviewer_name: reviewer_name ?? "Guest",
    rating: Math.min(5, Math.max(1, Number(rating) || 0)),
    review_text: review_text ?? "",
  })
  res.status(201).json({ review: mapReview(review as any) })
}
