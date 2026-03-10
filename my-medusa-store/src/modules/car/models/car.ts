import { model } from "@medusajs/framework/utils"

const Car = model.define("car", {
  id: model.id().primaryKey(),
  make: model.text(),
  model: model.text(),
  year: model.number(),
  price: model.number().nullable(),
})

export default Car
