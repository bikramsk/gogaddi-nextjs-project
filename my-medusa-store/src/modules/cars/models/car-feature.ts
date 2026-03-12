import { model } from "@medusajs/framework/utils"

const CarFeature = model.define("car_feature", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  feature_name: model.text(),
  feature_value: model.text(),
})

export default CarFeature
