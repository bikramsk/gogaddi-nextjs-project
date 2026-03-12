import { model } from "@medusajs/framework/utils"

const CarSpecification = model.define("car_specification", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  spec_group: model.text(),
  spec_name: model.text(),
  spec_value: model.text(),
})

export default CarSpecification
