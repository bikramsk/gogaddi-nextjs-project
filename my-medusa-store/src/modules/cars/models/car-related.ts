import { model } from "@medusajs/framework/utils"

const CarRelated = model.define("car_related", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  related_product_id: model.text(),
})

export default CarRelated
