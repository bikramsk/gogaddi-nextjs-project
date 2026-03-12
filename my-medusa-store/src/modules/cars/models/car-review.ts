import { model } from "@medusajs/framework/utils"

const CarReview = model.define("car_review", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  reviewer_name: model.text(),
  rating: model.number(),
  review_text: model.text(),
})

export default CarReview
