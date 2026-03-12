import { MedusaService } from "@medusajs/framework/utils"
import CarFeature from "../models/car-feature"
import CarSpecification from "../models/car-specification"
import CarReview from "../models/car-review"
import CarRelated from "../models/car-related"

class CarsModuleService extends MedusaService({
  CarFeature,
  CarSpecification,
  CarReview,
  CarRelated,
}) {
  async addFeature(productId: string, feature: { feature_name: string; feature_value?: string }) {
    return this.createCarFeatures({ product_id: productId, ...feature } as any)
  }

  async addSpecification(
    productId: string,
    spec: { spec_group: string; spec_name: string; spec_value?: string }
  ) {
    return this.createCarSpecifications({ product_id: productId, ...spec } as any)
  }

  async addReview(
    productId: string,
    review: { reviewer_name?: string; rating: number; review_text?: string }
  ) {
    return this.createCarReviews({
      product_id: productId,
      reviewer_name: review.reviewer_name ?? "",
      rating: review.rating,
      review_text: review.review_text ?? "",
    } as any)
  }

  async addRelatedCar(productId: string, relatedProductId: string) {
    return this.createCarRelated({ product_id: productId, related_product_id: relatedProductId } as any)
  }

  async getCarFeatures(productId: string) {
    return this.listCarFeatures({ product_id: productId })
  }

  async getCarSpecifications(productId: string) {
    return this.listCarSpecifications({ product_id: productId })
  }

  async getCarReviews(productId: string) {
    return this.listCarReviews({ product_id: productId })
  }

  async getRelatedCars(productId: string) {
    return this.listCarRelated({ product_id: productId })
  }
}

export default CarsModuleService
